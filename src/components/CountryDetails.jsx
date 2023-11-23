import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Country() {
  const [country, setCountry] = useState([]);
  const { cca2 } = useParams();
  const navigate = useNavigate();

  const getCountryByCode = async () => {
    try {
      const res = await axios.get(
        `https://restcountries.com/v3.1/alpha/${cca2}`
      );
      setCountry(res.data);
      console.log(country);
    } catch (error) {
      console.log("ERROR");
    }
  };

  const getBorderCountry = (cca3) => {
    navigate(`/country/${cca3}`);
  };

  useEffect(() => {
    getCountryByCode();
  }, [cca2]);

  return (
    <div className="dark:bg-[#202C36] md:mx-20 flex flex-col justify-start mx-7">
      <Link to="/">
        <button className="flex items-center justify-center gap-2 w-[104px] h-[32px] rounded-md shadow mt-10 mb-16 font-light text-[#111517] bg-white dark:bg-[#2B3844] dark:text-[white]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none">
            <path
              className="dark:fill-[white]"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M5.81802 3.6967L6.87868 4.75736L3.3785 8.25754H16.7428L16.7428 9.74246H3.3785L6.87868 13.2426L5.81802 14.3033L0.514719 9L5.81802 3.6967Z"
              fill="#111517"
            />
          </svg>
          Back
        </button>
      </Link>
      {country?.map((c) => {
        const curr = Object.keys(c.currencies);
        const lang = Object.keys(c.languages);
        const native = Object.keys(c.name.nativeName);
        console.log("native name", native);
        console.log(c);

        return (
          <div className="flex flex-col items-left xl:justify-center xl:flex-row xl:gap-x-[144px] sm:m-auto">
            <div>
              <img
                className="overflow-hidden rounded-md xl:min-w-[560px] w-[320px] xl:min-h-[400px] h-[230px] xl:row-span-1"
                src={c.flags.png}
                alt={c.flags.alt}
              />
            </div>
            <div className="xl:grid xl:grid-cols-2 xl:grid-rows-2 xl:mx-auto">
              <div>
                <h3 className="text-[#111517] w-max dark:text-white text-[22px] font-extrabold mt-11 xl:m-0 md:text-[32px]">
                  {c.name.common}
                </h3>
                <h4 className="text-[#111517] dark:text-white md:text-[16px] font-semibold text-[14px] leading-8 flex w-max gap-1 mt-4">
                  Native Name:
                  <span className="font-light">
                    {native.length > 0 && c.name.nativeName[native[0]].official}
                  </span>
                </h4>
                <h4 className="text-[#111517] dark:text-white font-semibold text-[14px] md:text-[16px] leading-8 flex flex-wrap gap-1">
                  Population:
                  <span className="font-light">
                    {Number(c.population).toLocaleString()}
                  </span>
                </h4>
                <h4 className="text-[#111517] dark:text-white font-semibold text-[14px] md:text-[16px] leading-8 flex flex-wrap gap-1">
                  Region:
                  <span className="font-light">{c.region}</span>
                </h4>
                <h4 className="text-[#111517] dark:text-white font-semibold text-[14px] md:text-[16px] leading-8 flex flex-wrap gap-1">
                  Sub Region:
                  <span className="font-light">{c.subregion}</span>
                </h4>
                <h4 className="text-[#111517] dark:text-white font-semibold text-[14px] md:text-[16px] leading-8 flex flex-wrap gap-1">
                  Capital:
                  <span className="font-light">
                    {c.capital && c.capital[0]}
                  </span>
                </h4>
              </div>
              <div className="xl:ml-[100px]">
                <h4 className="text-[#111517] dark:text-white font-semibold text-[14px] md:text-[16px] leading-8 flex flex-wrap gap-1 xl:mt-[60px]">
                  Top Level Domain:
                  <span className="font-light">{c.tld && c.tld[0]}</span>
                </h4>
                <h4 className="text-[#111517] dark:text-white font-semibold text-[14px] md:text-[16px] leading-8 flex flex-wrap gap-1">
                  Currencies:
                  <span className="font-light">
                    {curr.length > 0 && c.currencies[curr[0]].name}
                  </span>
                </h4>
                <h4 className="text-[#111517] dark:text-white font-semibold text-[14px] md:text-[16px] leading-8 flex flex-wrap gap-1">
                  Languages:
                  <span className="font-light">
                    {lang.length > 0 && c.languages[lang[0]]}
                  </span>
                </h4>
              </div>
              {c.borders && (
                <div className="xl:col-span-2 xl:mt-10">
                  <h4 className="text-4 dark:text-white text-[#111517] font-semibold leading-6 mt-8 mb-4">
                    Border Countries
                  </h4>

                  <ul className="flex flex-wrap items-center gap-[10px]">
                    {c.borders.map((border, idx) => (
                      <li
                        onClick={() => getBorderCountry(border)}
                        className="bg-white shadow dark:bg-[#2B3844] text-[#111517] dark:text-white text-[12px] font-light rounded-md px-[30px] py-[6px] cursor-pointer"
                        key={idx}>
                        {border}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
