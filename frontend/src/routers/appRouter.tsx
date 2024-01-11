import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import DashboardLayout from "../components/layout/dashboardLayout";
import Profile from "../pages/Profile";
import Connections from "../pages/Connections";

type Props = {};

const AppRouter = ({}: Props) => {

  return (
    <DashboardLayout>
      <Routes>
        <Route element={<Dashboard />} path="/" />
        <Route element={<Profile />} path="/profile/:id" />
        <Route element={<Profile />} path="/profile" />
        <Route element={<Connections />} path="/connections" />

      </Routes>
    </DashboardLayout>
  );
};

export default AppRouter;
