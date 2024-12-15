"use client";
import { useEffect, useState } from "react";

const App = () => {
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState("karachi");
  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=f7ea5c9eeb557102fa954c3b547d5230`;
        const response = await fetch(url);
        const resJson = await response.json();
        setCity(resJson.main);
      } catch (error) {
        setCity(null);
        console.error("Error fetching data from API: ", error);
      }
    };
    fetchAPI();
  }, [search]);
  let date = new Date();
  let year = date.getFullYear();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let curDate = date.getDate();

  let period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours === 0 ? 12 : hours;
  hours = hours < 10 ? `0${hours}` : hours;
  let day = [];
  day[0] = "Sunday";
  day[1] = "Monday";
  day[2] = "Tuesday";
  day[3] = "Wednesday";
  day[4] = "Thursday";
  day[5] = "Friday";
  day[6] = "Saturday";

  let curDay = day[date.getDay()];
  let month = [];
  month[0] = "Jan";
  month[1] = "Feb";
  month[2] = "Mar";
  month[3] = "Apr";
  month[4] = "May";
  month[5] = "Jun";
  month[6] = "Jul";
  month[7] = "Aug";
  month[8] = "Sep";
  month[9] = "Oct";
  month[10] = "Nov";
  month[11] = "Dec";
  let currentMonth = month[date.getMonth()];

  return (
    <>
      <div className="box">
        <h1> Weather APP</h1>
        <div className="inputData">
          <input
            type="search"
            placeholder="Enter City Name"
            className="inputFeild"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          ></input>
        </div>
        <>
          {!city ? (
            <p className="errorMessage">
              <strong>No Data Found</strong> <br /> {search} is not a city
            </p>
          ) : (
            <div className="info">
              <h2 className="location">
                <i>
                  <span className="fa-solid fa-street-view"> </span>

                  <a
                    href={`https://www.${search}.com/`}
                    target="_blank"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    {search}
                  </a>
                </i>
              </h2>
              <h3 className="temp">{city.temp}°Cel</h3>
              <h4 className="tempmin_max">
                Min : {city.temp_min}°Cel | Max : {city.temp_max}°Cel
              </h4>

              <h6>
                {currentMonth} {curDate} {year} | {curDay} {hours}:{minutes}{" "}
                {period}
              </h6>
              <p className="copyRight">
                &copy; 2024 Hamza Shabir. All rights reserved.
              </p>
            </div>
          )}
        </>
      </div>
    </>
  );
};

export default App;
