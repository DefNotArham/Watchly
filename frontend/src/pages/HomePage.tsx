import React from "react";

import Fonts from "../styles/Fonts";

import Navbar from "../components/Homepage/Navbar";
import RoomCard from "../components/Homepage/RoomCard";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-slate-950">
      <Fonts />

      <Navbar />

      {/* Hero */}
      <section className="flex flex-col items-center px-6 py-24 text-center">
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
          <button className="cursor-pointer rounded-full bg-blue-500 px-7 py-3 font-semibold text-white hover:bg-blue-400">
            Create Room
          </button>

          <button className="cursor-pointer rounded-full border border-slate-700 px-7 py-3 text-slate-100 hover:bg-slate-900">
            Join Room
          </button>
        </div>
      </section>

      {/* Public Rooms */}
      <section className="px-6 py-12 md:px-12">
        <div className="flex items-center justify-between">
          <h2 className="font-title text-4xl text-slate-100">Public Rooms</h2>

          <button className="cursor-pointer text-sm text-blue-500 hover:text-blue-400">
            View all
          </button>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          <RoomCard title="Late Night Lo-fi" host="mira" viewers={12} />

          <RoomCard title="F1 Highlights" host="dez" viewers={8} />

          <RoomCard title="Coding Session" host="arham" viewers={4} />
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-10 md:px-12">
        <div className="flex justify-between border-t border-slate-800 pt-6 text-slate-500">
          <span className="font-title text-xl text-slate-300">
            Watch Together
          </span>

          <span className="text-sm">React + Socket.IO</span>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
