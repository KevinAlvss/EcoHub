import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import './styles/global.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
