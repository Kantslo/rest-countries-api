import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function AllCountries() {
  const [country, setCountry] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [open, setOpen] = useState(false);
  const [region, setRegion] = useState("Filter By Region");

  const handleDropdown = () => {
    setOpen(!open);
  };

  const instance = axios.create({
    baseURL: "https://restcountries.com/v3.1",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const getData = async () => {
    try {
      const response = await instance.get("/all");
      setCountry(response.data);
      console.log(country);
    } catch (error) {
      console.log("error");
    }
  };

  const getCountryByRegion = async () => {
    try {
      const response = await instance.get(`/region/${region}`);
      setCountry(response.data);
    } catch (error) {
      console.error("Error fetching data by region", error);
    }
  };

  useEffect(() => {
    if (region !== "Filter By Region") {
      getCountryByRegion();
    } else {
      getData();
    }
  }, [region]);

  const handleRegionClick = (region) => {
    setRegion(region);
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    filterCountries(value);
  };

  const filterCountries = (value) => {
    const filtered = country.filter((c) =>
      c.name.common.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredCountries(filtered);
  };

  const countriesToDisplay = inputValue ? filteredCountries : country;

  return (
    <>
      <section className="flex flex-col justify-center gap-10 mx-4 my-8 items-left xl:flex-row xl:items-center xl:justify-between xl:mx-20 xl:my-12">
        <div className="flex items-center justify-left xl:w-[480px] max-w-[480px] h-12 bg-white rounded-lg shadow overflow-hidden dark:bg-[#2B3844]">
          <svg
            className="mx-8"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M11.1111 9.77778H10.4L10.1333 9.51111C11.0222 8.53333 11.5556 7.2 11.5556 5.77778C11.5556 2.57778 8.97778 0 5.77778 0C2.57778 0 0 2.57778 0 5.77778C0 8.97778 2.57778 11.5556 5.77778 11.5556C7.2 11.5556 8.53333 11.0222 9.51111 10.1333L9.77778 10.4V11.1111L14.2222 15.5556L15.5556 14.2222L11.1111 9.77778ZM5.77778 9.77778C3.55556 9.77778 1.77778 8 1.77778 5.77778C1.77778 3.55556 3.55556 1.77778 5.77778 1.77778C8 1.77778 9.77778 3.55556 9.77778 5.77778C9.77778 8 8 9.77778 5.77778 9.77778Z"
              fill="#B2B2B2"
            />
          </svg>
          <input
            className="min-w-[70%] md:min-w-[80%] h-12 font-normal border-none outline-none dark:bg-[#2B3844] dark:text-white"
            placeholder="Search for a country…"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button
            className=" flex items-center justify-between xl:m-0 h-12 pl-6 pr-5 rounded-md bg-white leading-5 text-[12px] text-[#111517] font-normal shadow-sm dark:bg-[#2B3844] dark:text-white w-[200px]"
            onClick={handleDropdown}>
            {region}
            <svg
              className={`dark:fill-white transition-transform transform ${
                open ? "rotate-180" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="#000">
              <path
                className="dark:fill-white"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.875 2.875L5 5.75L2.125 2.875L1.25 3.75L5 7.5L8.75 3.75L7.875 2.875Z"
                fill="black"
              />
            </svg>
          </button>
          <div className={`mt-1 ${open ? "absolute" : "hidden"}`}>
            <ul
              onClick={getCountryByRegion}
              className="flex flex-col gap-y-2 text-[12px] font-normal dark:text-white leading-5 w-[200px] py-4 pl-6 rounded-md shadow bg-white dark:bg-[#2B3844]">
              <li
                className="cursor-pointer"
                onClick={() => {
                  getData();
                  setRegion("Filter By Region");
                  setOpen(false);
                }}>
                Filter By Region
              </li>
              <li
                className="cursor-pointer"
                onClick={() => {
                  handleRegionClick("Africa");
                }}>
                Africa
              </li>
              <li
                className="cursor-pointer"
                onClick={() => {
                  handleRegionClick("Americas");
                }}>
                America
              </li>
              <li
                className="cursor-pointer"
                onClick={() => handleRegionClick("Asia")}>
                Asia
              </li>
              <li
                className="cursor-pointer"
                onClick={() => handleRegionClick("Europe")}>
                Europe
              </li>
              <li
                className="cursor-pointer"
                onClick={() => handleRegionClick("Oceania")}>
                Oceania
              </li>
            </ul>
          </div>
        </div>
      </section>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-10 x:grid-cols-3 xl:grid-cols-4 xl:gap-x-[74px] xl:gap-y-[72px] mx-[54px] dark:bg-[#202C36]">
        {countriesToDisplay.map((c, idx) => (
          <Link to={`/country/${c.cca2}`}>
            <li
              className="bg-white max-w-[267px] h-[336px] mx-auto rounded-md overflow-hidden list-none shadow dark:bg-[#2B3844] dark:text-white"
              key={idx}>
              <img
                key={idx}
                className="w-full max-w-[267px] h-[160px]"
                src={c.flags.png}
                alt={c.name.common}
              />
              <div className="flex flex-col gap-2 p-6">
                <h3 className="pb-2 font-extrabold text-[#111517] text-[18px] leading-[26px] dark:text-white">
                  {c.name.common}
                </h3>
                <h4 className="flex items-center gap-1 font-semibold leading-4">
                  Population:
                  <span className="font-light">
                    {Number(c.population).toLocaleString()}
                  </span>
                </h4>
                <h4 className="flex items-center gap-1 font-semibold leading-4">
                  Region:<span className="font-light">{c.region}</span>
                </h4>
                <h4 className="flex items-center gap-1 font-semibold leading-4">
                  Capital:
                  <span className="font-light">
                    {c.capital && c.capital[0]}
                  </span>
                </h4>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </>
  );
}
