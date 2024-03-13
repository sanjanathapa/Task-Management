import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { BrowserRouter as Router } from "react-router-dom";
import history from "./providers/history";
import { PersistGate } from "redux-persist/integration/react";
import MainContainer from "./components/MainContainer";
import MainRoute from "./router";

function App() {
  return (
    <div className="App">
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

