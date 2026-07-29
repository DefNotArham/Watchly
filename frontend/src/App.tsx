import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import RoomPage from "./pages/RoomPage";
import ErrorPage from "./pages/Error";

import useUserStore from "./stores/user.store";

import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    useUserStore.getState().initializeUser();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/room/:id" element={<RoomPage />} />
      <Route path="/error" element={<ErrorPage />} />
    </Routes>
  );
};

export default App;
