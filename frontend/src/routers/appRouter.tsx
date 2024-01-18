import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import DashboardLayout from "../components/layout/dashboardLayout";
import Profile from "../pages/Profile";
import Connections from "../pages/Connections";
import Messages from "../pages/Messages";
import Settings from "../pages/Settings";

type Props = {};

const AppRouter = ({}: Props) => {
  return (
    <DashboardLayout>
      <Routes>
        <Route element={<Dashboard />} path="/" />
        <Route element={<Profile />} path="/profile/:id" />
        <Route element={<Profile />} path="/profile" />
        <Route element={<Connections />} path="/connections" />
        <Route element={<Settings />} path="/settings" />
        <Route element={<Messages />} path="/messages" />
      </Routes>
    </DashboardLayout>
  );
};

export default AppRouter;
