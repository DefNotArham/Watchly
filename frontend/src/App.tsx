import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import RoomPage from "./pages/RoomPage";

import useUserStore from "./stores/user.store";

import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    useUserStore.getState().initializeUser();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/room" element={<RoomPage />} />
    </Routes>
  );
};

export default App;
