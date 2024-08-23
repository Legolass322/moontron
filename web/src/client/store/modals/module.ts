import type {StoreonModule} from 'storeon'

import {Defer} from 'utils'

import {TOAST_ID} from './constants'
import type {ModalComponentProps, ModalsCloseResult, ModalsStateItem, ModalsStorageItem} from './types'

const CLOSE_TOAST_ANIMATION_TIMEOUT = 400

export interface ModalsModuleState {
  storage: Record<string, ModalsStorageItem<ModalComponentProps, ModalComponentProps>>
  state: Record<string, ModalsStateItem>
  defers: Record<string, Defer<ModalsCloseResult | undefined>>

  closeResults: Record<string, ModalsCloseResult | undefined>

  /**
   * Стек открытых модалок. Нужен, чтобы закрывать их в правильном порядке при нажатии на Esc
   */
  openedStack: string[]
}

export enum ModalsEvents {
  REGISTER = 'modals/register',
  UNREGISTER = 'modals/unregister',
  OPEN = 'modals/open',
  FORCE_CLOSE = 'modals/force-close',
  CLOSE = 'modals/close',
  CLOSE_TOAST = 'modals/close-toast',
  CLOSE_ALL = 'modals/close-all',
  UPDATE_PROPS = 'modals/update-props',
}

export interface ModalsModuleEvents {
  [ModalsEvents.REGISTER]: ModalsStorageItem
  [ModalsEvents.UNREGISTER]: string
  [ModalsEvents.OPEN]: {
    key: string
    item: ModalsStateItem
  }
  [ModalsEvents.CLOSE]: {
    key: string
    closeResult: ModalsCloseResult
  }
  [ModalsEvents.FORCE_CLOSE]: {
    key: string
    closeResult: ModalsCloseResult
  }
  [ModalsEvents.CLOSE_TOAST]: undefined
  [ModalsEvents.CLOSE_ALL]: {
    force?: boolean
    ignores?: string[]
  }
  [ModalsEvents.UPDATE_PROPS]: {
    key: string
    item: ModalsStateItem
  }
}

type Module = StoreonModule<ModalsModuleState, ModalsModuleEvents>

export const modalsModule: (initState?: Partial<ModalsModuleState>) => Module = initState => store => {
  store.on('@init', () => ({
    storage: {},
    state: {},
    defers: {},
    closeResults: {},
    openedStack: [],
    ...initState,
  }))

  function onDocumentKeyUp(event: KeyboardEvent) {
    const {openedStack} = store.get()
    if ((event.key === 'Escape' || event.key === 'Esc') && openedStack.length) {
      store.dispatch(ModalsEvents.CLOSE, {
        key: openedStack[openedStack.length - 1],
        closeResult: {},
      })
    }
  }

  function setModalMode() {
    document.addEventListener('keyup', onDocumentKeyUp)
    document.getElementById('root')?.setAttribute('aria-hidden', 'true')
  }

  function unsetModalMode() {
    document.removeEventListener('keyup', onDocumentKeyUp)
    document.getElementById('root')?.removeAttribute('aria-hidden')
  }

  store.on(ModalsEvents.REGISTER, ({storage}, item) => {
    const storageItem: ModalsStorageItem<ModalComponentProps, ModalComponentProps> = {
      id: item.id,
      type: item.type,
      ModalComponent: item.ModalComponent,
      props: {
        close: (closeResult?: ModalsCloseResult) =>
          store.dispatch(ModalsEvents.CLOSE, {
            key: item.id,
            closeResult,
          }),
        forceClose: (closeResult?: ModalsCloseResult) =>
          store.dispatch(ModalsEvents.FORCE_CLOSE, {
            key: item.id,
            closeResult,
          }),
        ...item.props,
      },
    }

    storage[item.id] = storageItem

    return {
      storage: {...storage},
    }
  })

  store.on(ModalsEvents.UNREGISTER, ({storage}, key) => {
    delete storage[key]
    return {storage: {...storage}}
  })

  store.on(ModalsEvents.FORCE_CLOSE, (state, {key, closeResult}) => {
    if (!state.defers[key]) {
      return
    }

    const defer = state.defers[key]
    const modalCloseResult = state.closeResults[key]

    delete state.closeResults[key]

    const finalResult = closeResult ?? modalCloseResult

    defer?.resolve?.(finalResult as ModalsCloseResult)

    delete state.state[key]
    delete state.defers[key]

    const stackIndex = state.openedStack.lastIndexOf(key)

    if (stackIndex >= 0) {
      state.openedStack.splice(stackIndex, 1)
    }

    if (!state.openedStack.length) {
      unsetModalMode()
    }

    return {
      closeResults: {...state.closeResults},
      state: {...state.state},
      defers: {...state.defers},
      openedStack: [...state.openedStack],
    }
  })

  /**
   * запускает анимацию закрытия модалки через передачу в модалку markAsClosed
   * модалка должна вызвать forceClose после окончания анимации
   */
  store.on(ModalsEvents.CLOSE, ({defers, state, closeResults}, {key, closeResult}) => {
    if (!defers[key]) {
      return
    }

    const stateItem = state[key]
    if (!stateItem) {
      return
    }

    closeResults[key] = closeResult as ModalsCloseResult
    state[key] = {
      ...stateItem,
      props: {
        ...stateItem.props,
        markAsClosed: true,
      },
    }

    return {
      closeResults: {...closeResults},
      state: {...state},
    }
  })

  store.on(ModalsEvents.CLOSE_TOAST, state => {
    if (!getVisibleModals(state).includes(TOAST_ID)) {
      return
    }

    const delayedForceClose = new Promise<void>(resolve => {
      setTimeout(() => {
        store.dispatch(ModalsEvents.FORCE_CLOSE, {key: TOAST_ID, closeResult: {}})
        resolve()
      }, CLOSE_TOAST_ANIMATION_TIMEOUT)
    })
    store.dispatch(ModalsEvents.CLOSE, {key: TOAST_ID, closeResult: delayedForceClose})
  })

  store.on(ModalsEvents.CLOSE_ALL, (state, {force, ignores}) => {
    return Array.from(Object.keys(state.defers))
      .filter(key => (ignores ? !ignores.includes(key) : true))
      .forEach(key => {
        if (force) {
          store.dispatch(ModalsEvents.FORCE_CLOSE, {key, closeResult: {}})
        } else {
          store.dispatch(ModalsEvents.CLOSE, {key, closeResult: {}})
        }
      })
  })

  store.on(ModalsEvents.OPEN, (state, {key, item}) => {
    if (state.defers[key]) {
      return
    }

    const defer = new Defer<ModalsCloseResult | undefined>()

    state.state[key] = item
    state.defers[key] = defer

    if (key !== TOAST_ID) {
      state.openedStack.push(key)

      if (state.openedStack.length === 1) {
        setModalMode()
      }
    }

    return {
      state: {...state.state},
      defers: {...state.defers},
      openedStack: [...state.openedStack],
    }
  })

  store.on(ModalsEvents.UPDATE_PROPS, (state, {key, item}) => {
    const itemState = state.state[key]
    if (!itemState) return

    state.state[key] = {
      props: {
        ...state.state[key].props,
        ...item.props,
      },
    }

    return {
      state: {...state.state},
    }
  })
}

export function getVisibleModals({state, storage}: Pick<ModalsModuleState, 'state' | 'storage'>) {
  return Array.from(Object.keys(state)).filter(id => storage[id])
}
