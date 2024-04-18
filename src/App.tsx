import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/global.css";
import { Home, SearchEcoHub } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchEcoHub />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
