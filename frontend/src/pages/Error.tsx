import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-slate-100">
      <div className="w-full max-w-md text-center">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <img className="w-20" src="./logo.png" alt="" />
        </div>

        {/* Error */}
        <h1 className="font-title text-6xl text-slate-100">404</h1>

        <h2 className="mt-4 text-2xl font-semibold">Room not found</h2>

        <p className="mt-3 text-slate-400">
          This room does not exist, or you don't have access to join it.
        </p>

        {/* Actions */}
        <div className="mt-8 flex justify-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="cursor-pointer rounded-lg bg-blue-500 px-6 py-3 font-medium text-white transition hover:bg-blue-400"
          >
            Back Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
