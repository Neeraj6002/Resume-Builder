import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import logo from '@/assets/logo.png';


const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted p-6">
      {/* Logo */}
<div className="mb-10 animate-fadeIn">

        <img
          src={logo}
          alt="Logo"
          className="h-20 w-20 rounded-2xl shadow-lg"
        />
      </div>

      {/* Card */}
<div className="mb-10 animate-fadeIn">

        <h1 className="mb-4 text-6xl font-extrabold text-primary drop-shadow">
          404
        </h1>
        <p className="mb-6 text-xl text-muted-foreground">
          Oops! The page you're looking for doesn't exist.
        </p>

        <a
          href="/"
          className="inline-block rounded-2xl bg-primary px-6 py-3 text-white text-lg shadow-lg transition hover:bg-primary/90 hover:shadow-xl"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;

