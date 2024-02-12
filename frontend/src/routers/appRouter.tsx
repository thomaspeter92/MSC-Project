import { Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import DashboardLayout from '../components/layout/dashboardLayout';
import Profile from '../pages/Profile';
import Connections from '../pages/Connections';
import Messages from '../pages/Messages';
import Settings from '../pages/Settings';
import { useQuery } from '@tanstack/react-query';
import { getUser } from '../services/userService';
import { useUserStore } from '../stores/userStore';
import FullMessage from "../pages/Messages/FullMessage";
import { useEffect } from "react";
import SocketEventManager from "../services/socketsService";

type Props = {};

const AppRouter = ({ }: Props) => {
  const [user] = useUserStore((state) => [state.user]);

  useQuery({
    queryKey: ['user', user.email],
    queryFn: () => getUser(user.email),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const initChat = async () => {
      const socketEventManager = new SocketEventManager();
      await socketEventManager.initSocket()
    }
    initChat()
  }, [])

  return (
    <DashboardLayout>
      <Routes>
        <Route element={<Dashboard />} path="/" />
        <Route element={<Profile />} path="/profile/:id" />
        <Route element={<Profile />} path="/profile" />
        <Route element={<Connections />} path="/connections" />
        <Route element={<Settings />} path="/settings" />
        <Route element={<FullMessage />} path="/messages/:id" />
        <Route element={<Messages />} path="/messages" />
      </Routes>
    </DashboardLayout>
  );
};

export default AppRouter;
