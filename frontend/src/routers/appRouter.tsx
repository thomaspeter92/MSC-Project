import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import DashboardLayout from "../components/layout/dashboardLayout";
import Profile from "../pages/Profile";

type Props = {};

const AppRouter = ({}: Props) => {
  console.log("hi");
  return (
    <DashboardLayout>
      <Routes>
        <Route element={<Dashboard />} path="/" />
        <Route element={<Profile />} path="/profile" />

      </Routes>
    </DashboardLayout>
  );
};

export default AppRouter;
