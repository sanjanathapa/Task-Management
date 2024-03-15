// import { ToastContainer, Zoom } from "react-toastify";
import Header from "./Header";

import { TaskManagementCurrentUser } from "../utils/validations";
import "react-toastify/dist/ReactToastify.css";
import { Box, Typography } from "@mui/material";
// import { useEffect, useState } from "react";

const MainContainer = ({ children }) => {
  const { localStorageToken } = TaskManagementCurrentUser();
  console.log("local>>>>>>>>>>>>>>>>>>>>", localStorageToken)
  // useEffect(() => {
  //   console.log("localStorageToken>>>>>>>>>>>>>", localStorageToken);
  // }, [localStorageToken]);
  // const [isUserLoggedIn, setIsUserLoggedIn] = useState(localStorage.getItem("token"));

  // useEffect(() => {
  //   const onStorage = () => {
  //     setIsUserLoggedIn(localStorage.getItem("token"));
  //   };

  //   window.addEventListener("storage", onStorage);

  //   return () => {
  //     window.removeEventListener("storage", onStorage);
  //   };
  // }, []);

  return (
    <>
      {console.log("-------------------------------------------------", localStorageToken)}

      {localStorageToken && <Header />}
      {console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", localStorageToken)}
      {children}
      {/* <ToastContainer
        position="top-center"
        hideProgressBar
        newestOnTop
        // closeOnClick={false}
        // rtl={false}
        pauseOnFocusLoss
        // draggable={false}
        // pauseOnHover={false}
        transition={Zoom}
        theme="colored"
      /> */}
      {TaskManagementCurrentUser() && (
        <Box position="fixed" bottom={0} p={1} right={0} left="auto" width="100%" bgcolor="skyblue" textAlign="center">
          <Typography variant="subtitle2" color="red">
            {"Footer"}
          </Typography>
        </Box>
      )}
    </>
  );
};

export default MainContainer;
