import type {ComponentType, ReactElement} from 'react'

// import type {AlertModalProps} from 'client/components/modals/AlertModal/AlertModal'
// import type {ConfirmModalProps} from 'client/components/modals/ConfirmModal/ConfirmModal'
// import type {ToastProps} from 'client/components/modals/Toast/Toast.types'

export type UnknownObject = Record<string, unknown>

export type ModalsCloseResult = unknown

export type ModalCommonProps = {
  useParams?: boolean
  closableOnBackdrop?: boolean
}

export type ModalComponentProps<T = ModalsCloseResult> = {
  close: (result?: T) => void
  forceClose: (result?: T) => void
  zIndex?: number
  markAsClosed?: boolean
  children?: ReactElement
} & ModalCommonProps

// export type AlertModalOpenProps = Omit<AlertModalProps, keyof ModalComponentProps> & ModalCommonProps

// export interface ConfirmModalCloseResult {
//   isConfirm?: boolean
// }

// export type ConfirmModalOpenProps = Omit<ConfirmModalProps, keyof ModalComponentProps> & ModalCommonProps

// export type ToastModalOpenProps = Omit<ToastProps, keyof ModalComponentProps>

export type ModalType = 'modal' | 'toast'

export interface ModalsStorageItem<M extends ModalComponentProps = ModalComponentProps, T = UnknownObject> {
  id: string
  type: ModalType
  ModalComponent: ComponentType<M>
  props: T
}

export interface ModalsStateItem<T = UnknownObject> {
  props?: T
}

export interface ModalHocOptions {
  id: string
  type?: ModalType
}
