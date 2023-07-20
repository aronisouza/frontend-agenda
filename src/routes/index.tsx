import { Routes, Route } from "react-router-dom"
import { Login } from "../page/Login"
import { Register } from "../page/Register"
import { Dashboard } from "../page/Dashboard"

export const RouteApp = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/registro" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  )
}