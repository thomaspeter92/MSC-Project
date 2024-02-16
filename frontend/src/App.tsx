import './App.css';
import AuthRouter from './routers/authRouter';
import AppRouter from './routers/appRouter';
import { useUserStore } from './stores/userStore';
import LoadingSpinner from './components/loadingSpinner';

function App() {
  // This should be a global state (zustand)
  const [loggedIn, loading] = useUserStore((state) => [
    state.loggedIn,
    state.loading,
  ]);

  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  } else if (loggedIn) {
    return <AppRouter />;
  } else {
    return <AuthRouter />;
  }
}

export default App;
