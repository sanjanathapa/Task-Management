import React, { useReducer } from "react";
import { Button, TextField, Typography, Paper, Container } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { useLoginMutation } from "../../Api/Login";
import { handleError } from "../../utils/handleError";
import { useNavigate } from "react-router-dom";
import { loginStore } from "../../slices/loginSlice";
import { useDispatch } from "react-redux";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginUser, result] = useLoginMutation();
  const [localState, setLocalState] = useReducer(
    (prevState, newState) => {
      return { ...prevState, ...newState };
    },
    { email: "", password: "" }
  );

  const { email, password } = localState;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      toast.error("Please enter email and password");
    } else {
      const data = {
        email,
        password,
      };
      loginUser(data)
        .unwrap()
        .then((response) => {
          const token = response.token;
          const user = response.user;
          console.log("tokennnnnnnnnnnnnnnnnnnnn>>>>>>>>>>>>>>>>>", response.user);

          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));

          dispatch(loginStore({ token, user }));
          toast.success("Successfully logged in");
          navigate("/tasklists");
        })
        .catch((error) => {
          console.log("this is error>>>>>>>>");
          handleError(error);
        });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalState({ [name]: value });
  };

  return (
    <Container maxWidth="xs" style={{ marginTop: "50px" }}>
      <Paper elevation={3} sx={{ padding: "50px", boxShadow: "10px 10px 30px -10px rgba(0,0,0,0.3)" }}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
            margin="normal"
            variant="standard"
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
            margin="normal"
            variant="standard"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: "20px" }}>
            Login
          </Button>
        </form>
        <ToastContainer />
      </Paper>
    </Container>
  );
};

export default LoginForm;
