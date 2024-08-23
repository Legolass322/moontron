import { FC, memo } from "react"
import { Route, Routes } from "react-router-dom"
import { Dashboard } from "./components/Dashboard"

const DasboardRouterComponent: FC = () => {
  return <Routes>
    <Route path="/" element={<Dashboard />} />
  </Routes>
}

export const DasboardRouter = memo(DasboardRouterComponent)
