import Header from "./Header";

import { TaskManagementCurrentUser } from "../utils/validations";
import "react-toastify/dist/ReactToastify.css";
import { Box, Typography } from "@mui/material";

const MainContainer = ({ children }) => {
  const { localStorageToken } = TaskManagementCurrentUser();

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
      {localStorageToken && <Header />}

      {children}

      {TaskManagementCurrentUser() && (
        <Box
          position="fixed"
          bottom={0}
          p={1}
          right={0}
          left="auto"
          width="100%"
          bgcolor="skyblue"
          textAlign="center"
        >
          <Typography variant="subtitle2" color="red">
            {"Footer"}
          </Typography>
        </Box>
      )}
    </>
  );
};

export default MainContainer;
