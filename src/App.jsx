import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import CountryDetails from "./components/CountryDetails";
import AllCountries from "./components/AllCountries";
function App() {
  const [isDark, setIsDark] = useState(false);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <>
      <div className="bg-[#FAFAFA] dark:bg-[#202C36] font-nunito pb-16 min-h-screen">
        <header className="flex items-center justify-between h-20 px-4 bg-white shadow dark:bg-[#2B3844] md:px-20">
          <Link to="/">
            <h1 className="text-[#111517] font-extrabold text-[14px] leading-5 dark:text-[white]">
              Where in the world?
            </h1>
          </Link>
          <button
            onClick={() => {
              toggleDarkMode();
            }}
            className="flex items-center gap-2 dark:text-[white]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none">
              <path
                className="dark:stroke-none"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10.8426 11.052C7.73486 11.052 5.21543 8.74226 5.21543 5.89457C5.21543 4.82024 5.57343 3.82526 6.18514 3C3.75229 3.75612 2 5.86498 2 8.35045C2 11.4708 4.75943 14 8.16286 14C10.8743 14 13.1757 12.3945 14 10.1636C13.1 10.7238 12.0129 11.052 10.8426 11.052Z"
                fill="white"
                stroke="#111517"
              />
            </svg>
            Dark Mode
          </button>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<AllCountries />} />
            <Route path="/country/:ccn3" element={<CountryDetails />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
