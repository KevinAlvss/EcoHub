import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/global.css";
import {
  Home,
  SearchEcoHub,
  ExploreMap,
  LandingPage,
  Login,
  Register,
  InspectHub,
  MyHubs,
  CreateHub,
  UpdateHub,
} from "./pages";
import { LocationContextProvider } from "./contexts/locationContext";
import { AuthContextProvider } from "./contexts/authContext";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <LocationContextProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/search" element={<SearchEcoHub />} />
            <Route path="/view-hubs" element={<ExploreMap />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/view-hubs/inspect/:hubId" element={<InspectHub />} />
            <Route path="/my-hubs" element={<MyHubs />} />
            <Route path="/create-hub" element={<CreateHub />} />
            <Route path="/edit-hub/:hubId" element={<UpdateHub />} />
            <Route path="/components" element={<Home />} />
          </Routes>
        </LocationContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
