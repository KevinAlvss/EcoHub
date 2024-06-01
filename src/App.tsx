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
import {
  AuthContextProvider,
  LocationContextProvider,
  MaterialContextProvider,
} from "./contexts";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <LocationContextProvider>
          <MaterialContextProvider>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/search" element={<SearchEcoHub />} />
              <Route path="/view-hubs" element={<ExploreMap />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/view-hubs/inspect/:hubId"
                element={<InspectHub />}
              />
              <Route path="/my-hubs" element={<MyHubs />} />
              <Route path="/create-hub" element={<CreateHub />} />
              <Route path="/edit-hub/:hubId" element={<UpdateHub />} />
              <Route path="/components" element={<Home />} />
            </Routes>
          </MaterialContextProvider>
        </LocationContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
