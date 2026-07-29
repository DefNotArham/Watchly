import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 px-6 py-5 md:px-12">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-2">
          <img className="w-10" src="./logo.png" alt="" />
          <h2 className="font-title text-2xl text-slate-200">Watchly</h2>
        </div>

        <div className="flex gap-6 text-sm text-slate-500">
          <span className="hover:text-slate-300 cursor-pointer">About</span>

          <span className="hover:text-slate-300 cursor-pointer">GitHub</span>

          <span className="hover:text-slate-300 cursor-pointer">Contact</span>
        </div>

        <p className="text-sm text-slate-600">© 2026 Watchly</p>
      </div>
    </footer>
  );
};

export default Footer;
