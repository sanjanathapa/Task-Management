import { Routes, Route, Navigate, Outlet } from "react-router-dom";

import LoginForm from "../components/LoginForm/index.js";
import TaskLists from "../components/TaskLists.js";
import ProfilePhotoUpload from "../components/ProfilePhotoUpload/index.js";
import { TaskManagementCurrentUser } from "../utils/validations.js";

const MainRoute = () => {
  const defaultPath = "/login";

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to={defaultPath} />} />
        <Route path={defaultPath} element={<LoginForm />} />

        <Route element={<AuthGuard />}>
          <Route path="/tasklists" element={<TaskLists />} />
          <Route path="/profile" element={<ProfilePhotoUpload />} />
        </Route>

        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
    </>
  );
};

export default MainRoute;

const AuthGuard = () => {
  const { localStorageToken } = TaskManagementCurrentUser();

  if (!localStorageToken) return <Navigate to="/login" />;

  return <Outlet />;
};
