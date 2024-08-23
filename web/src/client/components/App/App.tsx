import { FC, memo } from "react"
import { ErrorBoundary } from "../ErrorBoundary"

import * as styles from './App.scss'
import { Route, Routes } from "react-router-dom"
import Dashboard from "client/pages/Dashboard"
import { Hero } from "client/pages/Hero"
import { NavigationBar } from "../NavigationBar"

const AppRoutesComponent: FC = () => {
  return <div className={styles.root}>
    <Routes>
      <Route path="/dashboard" element={<Dashboard />}/>
      {/* <Route path="/trade" element={<Trade />}/> */}
      <Route path="/" element={<Hero />}/>
    </Routes>
  </div>
}

const AppRoutes = memo(AppRoutesComponent)

export const App: FC = () => {
  return <ErrorBoundary>
    <NavigationBar />
    <AppRoutes />
  </ErrorBoundary>
}