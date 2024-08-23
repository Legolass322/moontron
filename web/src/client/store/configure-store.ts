import { createContext } from "react"
import { createStoreon } from "storeon"
import {customContext} from 'storeon/react'
import { modalsModule, ModalsModuleEvents, ModalsModuleState } from "./modals"

export type InitState = Partial<{
  modals: Partial<ModalsModuleState>
}>

export type StoreState = ModalsModuleState 

export type StoreEvents = ModalsModuleEvents

function configureStore(initState?: InitState) {
  return createStoreon<StoreState, StoreEvents>([
    modalsModule(initState?.modals),
  ])
}

export const store = configureStore({})

export const StoreContext = createContext(store)

export const useStoreon = customContext(StoreContext)