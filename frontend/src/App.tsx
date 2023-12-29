import "./App.css";
import AuthRouter from "./routers/authRouter";
import { useState } from "react";
import AppRouter from "./routers/appRouter";
import { useUserStore } from "./stores/userStore";

function App() {
  // This should be a global state (zustand)
  const [loggedIn] = useUserStore((state) => [state.loggedIn]);
  console.log(loggedIn);
  if (loggedIn) {
    return <AppRouter />;
  } else {
    return <AuthRouter />;
  }
}

export default App;
