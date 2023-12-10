import {Route, Routes} from 'react-router-dom'
import Dashboard from "../pages/Dashboard"

type Props = {}

const AppRouter = ({}: Props) => {
  return (
    <Routes>
      <Route element={<Dashboard />} path="/" />
    </Routes>
  )
}

export default AppRouter