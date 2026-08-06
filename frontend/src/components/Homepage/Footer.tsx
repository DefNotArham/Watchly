const Footer = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 px-6 py-5 md:px-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <div>
          <h2 className="font-title text-2xl text-slate-200">Watchly</h2>
          <p className="text-sm text-slate-500">
            A real-time YouTube watch party project.
          </p>
        </div>

        <a
          href="https://github.com/DefNotArham"
          target="_blank"
          rel="noreferrer"
          className="cursor-pointer text-sm text-slate-500 hover:text-slate-300"
        >
          GitHub
        </a>

        <p className="text-sm text-slate-600">© 2026 Watchly</p>
      </div>
    </footer>
  );
};

export default Footer;
