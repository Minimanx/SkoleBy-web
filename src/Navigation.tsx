import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import { RootState } from "./redux/store";
import DashboardScreen from "./screens/DashboardScreen";
import BankScreen from "./screens/BankScreen";
import MailScreen from "./screens/MailScreen";
import JobPortalScreen from "./screens/JobPortalScreen";
import ExploreScreen from "./screens/ExploreScreen";
import NewspaperScreen from "./screens/NewspaperScreen";
import ProfileScreen from "./screens/ProfileScreen";
import Header from "./containers/Header";
import AdminDashboardScreen from "./screens/AdminDashboardScreen";

export const AuthLayoutRoute = () => {
  const session = useSelector((state: RootState) => state.session);

  if (session.accessToken) {
    return <Navigate replace to="/app" />;
  }

  return <LoginScreen />;
};

export const Dashboard = () => {
  const session = useSelector((state: RootState) => state.session);
  console.log(session);

  if (!session.accessToken) {
    return <Navigate to="/" replace />;
  }

  if (session.role === "admin") {
    return (
      <Routes>
        <Route element={<Header />}>
          <Route index element={<AdminDashboardScreen />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Route>
      </Routes>
    );
  }

  return (
    <Routes>
      <Route element={<Header />}>
        <Route index element={<DashboardScreen />} />
        <Route path="bank" element={<BankScreen />} />
        <Route path="mail" element={<MailScreen />} />
        <Route path="jobportal" element={<JobPortalScreen />} />
        <Route path="explore" element={<ExploreScreen />} />
        <Route path="newspaper" element={<NewspaperScreen />} />
        <Route path="profile" element={<ProfileScreen />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Route>
    </Routes>
  );
};
