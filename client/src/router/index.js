import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import TaskLists from "../components/TaskLists.js";
import ProfilePhotoUpload from "../components/ProfilePhotoUpload/index.js";

const MainRoute = () => {
  const defaultPath = "/login";

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to={defaultPath} />}></Route>
        <Route path={defaultPath} element={<LoginForm></LoginForm>}></Route>
        <Route path="/tasklists" element={<TaskLists />}></Route>
        <Route path="/profile" element={<ProfilePhotoUpload />}></Route>
      </Routes>
    </>
  );
};

export default MainRoute;
