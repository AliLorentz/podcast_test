import './App.css';
import NavBar from './components/NavBar';
import { BrowserRouter } from "react-router-dom";
import Router from './routes';
import { Provider as ReduxProvider } from "react-redux";
import { store} from "./redux/store";

function App() {
  return (
    <>
    <ReduxProvider store={store}>
      <BrowserRouter>
        <NavBar />
        <Router/>
      </BrowserRouter>
      </ReduxProvider>
    </>
  );
}

export default App;
