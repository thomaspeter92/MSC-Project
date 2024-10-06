import { Route, Routes } from 'react-router-dom';
import DashboardLayout from '../components/layout/dashboardLayout';
import Profile from '../pages/Profile';
import Connections from '../pages/Connections';
import Messages from '../pages/Messages';
import Settings from '../pages/Settings';
import { useQuery } from '@tanstack/react-query';
import { getUser } from '../services/userService';
import { useUserStore } from '../stores/userStore';
import FullMessage from '../pages/Messages/FullMessage';
import { useEffect } from 'react';
import socketEventManager from '../services/socketsService';
import AllConnections from '../pages/AllConnections';
type Props = {};

const AppRouter = ({}: Props) => {
  const [user] = useUserStore((state) => [state.user]);

  useQuery({
    queryKey: ['user', user.email],
    queryFn: () => getUser(user.email),
    refetchOnWindowFocus: false,
  });

  // Example component or application initialization logic
  useEffect(() => {
    const initializeSockets = async () => {
      const token = '';
      if (token) {
        await socketEventManager.initSocket(token);
        // Optionally, listen for messages globally, manage state, notifications, etc.
      }
    };

    initializeSockets();
  }, []); // Run once on app/component load

  return (
    <DashboardLayout>
      <Routes>
        <Route element={<Connections />} path="/*" />
        <Route element={<Profile />} path="/profile/:id" />
        <Route element={<Profile />} path="/profile" />
        <Route element={<AllConnections />} path="/connections/all" />
        <Route element={<Connections />} path="/connections" />
        <Route element={<Settings />} path="/settings" />
        <Route element={<FullMessage />} path="/messages/:id" />
        <Route element={<Messages />} path="/messages" />
      </Routes>
    </DashboardLayout>
  );
};

export default AppRouter;
