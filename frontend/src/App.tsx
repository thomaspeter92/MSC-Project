import "./App.css";
import AuthRouter from "./routers/authRouter";
import { useState } from "react";
import AppRouter from "./routers/appRouter";


function App() {
  // This should be a global state (zustand)
  const [loggedIn, setLoggedIn] = useState<boolean>()

  if(loggedIn) {
    <AppRouter />
  } else {
    return (
      <AuthRouter />
    )
  }
}

export default App;
