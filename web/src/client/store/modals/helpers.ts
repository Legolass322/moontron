import {useCallback, useMemo} from 'react'
// import {isPromiseLike} from 'utils'

import {store, useStoreon} from '../configure-store'

// import {ALERT_MODAL_ID, CONFIRM_MODAL_ID, TOAST_ID} from './constants'
import {ModalsEvents, getVisibleModals} from './module'
import type {
  // AlertModalOpenProps,
  // ConfirmModalCloseResult,
  // ConfirmModalOpenProps,
  ModalsCloseResult,
  ModalsStateItem,
  // ToastModalOpenProps,
} from './types'

export const modals = {
  openModal: function <T = ModalsCloseResult>(key: string, item: ModalsStateItem) {
    store.dispatch(ModalsEvents.OPEN, {key, item})
    return store.get().defers[key]?.promise as Promise<T | undefined>
  },

  // openAlert: (props: AlertModalOpenProps) => {
  //   return modals.openModal(ALERT_MODAL_ID, {props})
  // },

  // openConfirm: async (props: ConfirmModalOpenProps) => {
  //   const result = await modals.openModal<ConfirmModalCloseResult>(CONFIRM_MODAL_ID, {props})
  //   return Boolean(result?.isConfirm)
  // },

  // openToast: async (props: ToastModalOpenProps) => {
  //   store.dispatch(ModalsEvents.CLOSE_TOAST)
  //   const {closeResults} = store.get()

  //   // Если до этого был открыт тост, то в closeResults лежит промис,
  //   // который должен резолвнуться по закрытии
  //   if (!closeResults[TOAST_ID]) {
  //     return modals.openModal<ConfirmModalCloseResult>(TOAST_ID, {props})
  //   }

  //   if (isPromiseLike(closeResults[TOAST_ID])) {
  //     await closeResults[TOAST_ID]
  //   }

  //   return modals.openModal<ConfirmModalCloseResult>(TOAST_ID, {props})
  // },

  closeModal: (key: string) => {
    store.dispatch(ModalsEvents.CLOSE, {key, closeResult: {}})
  },

  closeToast: () => {
    store.dispatch(ModalsEvents.CLOSE_TOAST)
  },

  updateModalProps: (key: string, item: ModalsStateItem) => {
    store.dispatch(ModalsEvents.UPDATE_PROPS, {key, item})
  },
}

export function useTopOpenedModalId() {
  const {openedStack} = useStoreon('openedStack')
  return openedStack[openedStack.length - 1]
}

export function useHasOpenedModals() {
  const {state} = useStoreon('state')
  return Object.entries(state).length > 0
}

export function useHasModal() {
  const {state} = useStoreon('state')
  return useCallback((key: string) => Boolean(state[key]), [state])
}

export function useVisibleModals() {
  const {storage, state} = useStoreon('storage', 'state')
  return useMemo(() => getVisibleModals({storage, state}), [storage, state])
}

export function useHasVisibleModals() {
  const visibleModals = useVisibleModals()
  return visibleModals.length > 0
}

export function useVisibleModal(id?: string | string[]) {
  const visibleModals = useVisibleModals()
  if (id) {
    const ids = Array.isArray(id) ? id : [id]
    return visibleModals.find(id => ids.includes(id))
  }
  return visibleModals[0]
}
