const Navbar = () => (
  <header className="flex items-center justify-between px-6 py-5 md:px-12">
    <div className="flex items-center gap-2">
      <img className="w-10" src="./logo.png" alt="Watch Together logo" />

      <span className="font-title text-2xl text-slate-100">Watchly</span>
    </div>

    <button className="rounded-full bg-blue-500 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-400">
      Create Room
    </button>
  </header>
);

export default Navbar;
