import React from "react";

import Fonts from "../styles/Fonts";
import Navbar from "../components/Homepage/Navbar";

const HomePage = () => {
  return (
    <>
      <title>Watchly</title>

      <div className="flex min-h-screen flex-col bg-slate-950">
        <Fonts />

        <Navbar />

        {/* Hero */}
        <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
          <p className="text-sm tracking-[0.3em] text-blue-500">Watchly</p>

          <h1 className="font-title mt-5 text-7xl text-slate-100 md:text-8xl">
            Watch Youtube
            <br />
            <span className="text-blue-500">Together.</span>
          </h1>

          <p className="mt-6 max-w-xl text-slate-400">
            A shared space for watching, chatting, and enjoying videos together.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="cursor-pointer rounded-full bg-blue-500 px-7 py-3 font-semibold text-white transition hover:bg-blue-400">
              Create Room
            </button>

            <button className="cursor-pointer rounded-full border border-slate-700 px-7 py-3 text-slate-100 transition hover:bg-slate-900">
              Join Room
            </button>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-800 bg-slate-950 px-6 py-5 md:px-12">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <img className="w-10" src="./logo.png" alt="" />
              <h2 className="font-title text-2xl text-slate-200">Watchly</h2>
            </div>

            <div className="flex gap-6 text-sm text-slate-500">
              <span className="hover:text-slate-300 cursor-pointer">About</span>

              <span className="hover:text-slate-300 cursor-pointer">
                GitHub
              </span>

              <span className="hover:text-slate-300 cursor-pointer">
                Contact
              </span>
            </div>

            <p className="text-sm text-slate-600">© 2026 Watchly</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default HomePage;
