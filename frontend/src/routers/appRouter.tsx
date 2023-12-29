import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import DashboardLayout from "../components/layout/dashboardLayout";

type Props = {};

const AppRouter = ({}: Props) => {
  console.log("hi");
  return (
    <DashboardLayout>
      <Routes>
        <Route element={<Dashboard />} path="/" />
      </Routes>
    </DashboardLayout>
  );
};

export default AppRouter;
