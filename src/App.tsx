import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import { Index } from "./pages/index";
import './styles/global.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/inicio" element={<Index />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
