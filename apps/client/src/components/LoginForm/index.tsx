import { useReducer, ChangeEvent, FormEvent } from "react";
import {
  Button,
  TextField,
  Typography,
  Paper,
  Container,
  CircularProgress,
} from "@mui/material";
import { useLoginMutation } from "../../Api/Login";
import { handleError } from "../../utils/handleError";
import { useNavigate } from "react-router-dom";
import { loginStore } from "../../slices/loginSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginUser, { isLoading }] = useLoginMutation();

  const [localState, setLocalState] = useReducer(
    (prevState: StateType, newState: ActionType) => {
      return { ...prevState, ...newState };
    },
    { email: "", password: "" },
  );

  const { email, password } = localState;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalState({ [name]: value });
  };

  return (
    <Container maxWidth="xs" style={{ marginTop: "50px" }}>
      <Paper
        elevation={3}
        sx={{
          padding: "50px",
          boxShadow: "10px 10px 30px -10px rgba(0,0,0,0.3)",
        }}
      >
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className="d-flex"
            sx={{ marginTop: "20px" }}
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size={25} sx={{ scale: 0.2 }} />
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginForm;

interface StateType {
  email: string;
  password: string;
}

type ActionType = Partial<StateType>;
