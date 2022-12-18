import './App.css';
import NavBar from './components/NavBar';
import { BrowserRouter } from "react-router-dom";
import Router from './routes';

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Router/>
      </BrowserRouter>
    </>
  );
}

export default App;
