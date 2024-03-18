import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { BrowserRouter as Router } from "react-router-dom";
import history from "./providers/history";
import { PersistGate } from "redux-persist/integration/react";
import MainContainer from "./components/MainContainer";
import MainRoute from "./router";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <ToastContainer />

      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Router history={history}>
            <MainContainer>
              <MainRoute />
            </MainContainer>
          </Router>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
