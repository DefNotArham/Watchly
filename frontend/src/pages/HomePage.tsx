import React from "react";

import Fonts from "../styles/Fonts";

import Navbar from "../components/Homepage/Navbar";
import Hero from "../components/Homepage/Hero";
import Footer from "../components/Homepage/Footer";

const HomePage = () => {
  return (
    <>
      <title>Watchly</title>

      <div className="flex min-h-screen flex-col bg-slate-950">
        <Fonts />

        <Navbar />

        {/* Hero */}
        <Hero />

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
