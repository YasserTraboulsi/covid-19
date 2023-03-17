import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCovidData } from '../actions/covidActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Nav from '../components/Nav';
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";

export default function Home() {
  const dispatch = useDispatch();
  const CovidData = useSelector(state => state.CovidData);
  const { loading, CovData, error } = CovidData;


  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);
  let country = [];

  useEffect(() => {
    dispatch(getCovidData())
  }, [dispatch]);

  if (!loading) {
    console.log(CovData)
    CovData?.map(cov => country.push(cov.country))

  }

  let Alldata = []
  selected.length > 0 && (Alldata = CovData?.filter(cov => cov.country === selected))
  console.log(Alldata)


  return (
    <div>
      <Nav />
      <div className="bg-teal-500 flex flex-col justify-center h-screen pt-20 overflow-auto rounded-lg shadow">
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant='danger'>{error}</MessageBox>}

        {/* Start select box */}
        <div className="w-72 font-medium h-auto items-center self-center">
          <div
            onClick={() => setOpen(!open)}
            className={`bg-white w-full p-2 flex items-center justify-between rounded ${!selected && "text-gray-700 mb-8"
              }`}
          >
            {selected
              ? selected?.length > 25
                ? selected?.substring(0, 25) + "..."
                : selected.slice(0, 10)
              : "Choose Country"}
            <BiChevronDown size={20} className={`${open && "rotate-180"}`} />
          </div>
          <ul
            className={`bg-white mb-8 mt-2 overflow-y-auto ${open ? "max-h-60" : "max-h-0"
              } `}
          >
            <div className="flex items-center px-2 sticky top-0 bg-white">
              <AiOutlineSearch size={18} className="text-gray-700" />
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value.toLowerCase())}
                placeholder="Enter date"
                className="placeholder:text-gray-700 p-2 outline-none  "
              />
            </div>
            {country?.map((data, index) => (
              <li
                key={index}
                className={`p-2 text-sm hover:bg-sky-600 hover:text-white
            ${data?.toLowerCase() === selected?.toLowerCase() &&
                  "bg-sky-600 text-white"
                  }
            ${data?.toLowerCase().startsWith(inputValue)
                    ? "block"
                    : "hidden"
                  }`}
                onClick={() => {
                  if (data?.toLowerCase() !== selected.toLowerCase()) {
                    setSelected(data);
                    setOpen(false);
                    setInputValue("");
                  }
                }}
              >
                {data}
              </li>
            ))}
          </ul>
        </div>
        {/* end my select box */}

        <table className='shadow-2x1 font-[Poppins] border-4 border-cyan-100 w-11/12 mx-auto'>
          <thead className='text-white'>
            <tr>
              <th className='py-3 bg-white text-teal-500'>Number of cases</th>
              <th className='py-3 bg-white text-teal-500'>Today cases</th>
              <th className='py-3 bg-white text-teal-500'>Number of death</th>
              <th className='py-3 bg-white text-teal-500'>Today Deaths</th>
              <th className='py-3 bg-white text-teal-500'>Recovered</th>
              <th className='py-3 bg-white text-teal-500'>Today Recovered</th>
            </tr>
          </thead>
          <tbody>
            {Alldata?.map((row, index) =>
              <tr key={index} className='hover:bg-cyan-100 bg-cyan-300 cursor-pointer duration-300'>
                <td className='py-3 px-6 text-center text-slate-900'>{row.cases}</td>
                <td className='py-3 px-6 text-center text-slate-900'>{row.todayCases}</td>
                <td className='py-3 px-6 text-center text-slate-900'>{row.deaths}</td>
                <td className='py-3 px-6 text-center text-slate-900'>{row.todayDeaths}</td>
                <td className='py-3 px-6 text-center text-slate-900'>{row.recovered}</td>
                <td className='py-3 px-6 text-center text-slate-900'>{row.todayRecovered}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
