import {Routes, Route} from 'react-router-dom'
import Login from "../pages/Login"
import SignUp from "../pages/Signup"
import NotFound from "../pages/NotFound"
type Props = {}

const AuthRouter = ({}: Props) => {
  return (
    <Routes>
      <Route element={<Login />} path="/" />
      <Route element={<SignUp />} path="/signup" />
      <Route element={<Login />} path="*" />
    </Routes>
  )
}

export default AuthRouter