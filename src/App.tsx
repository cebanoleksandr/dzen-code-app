import { Outlet } from "react-router-dom"
import Alert from "./components/UI/Alert"

const App = () => {
  return (
    <>
      <Outlet />
      <Alert />
    </>
  )
}

export default App
