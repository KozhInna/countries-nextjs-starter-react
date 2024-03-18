import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  Button,
  Card,
  Col,
  Container,
  Image,
  Row,
  Spinner,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { addFavorite, removeFavorite } from "../store/favoritesSlice";
import GetMap from "../components/Map";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";
import AirOutlinedIcon from "@mui/icons-material/AirOutlined";

const CountriesSingle = () => {
  const dispatch = useDispatch();
  const countriesList = useSelector((state) => state.countries.countries);
  const location = useLocation();
  const navigate = useNavigate();
  const country = location.state.country;
  const borders = country.borders;
  console.log("country", country);

  const [weather, setWeather] = useState("");

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [borderCountries, setBorderCountries] = useState([]);
  const favorites = useSelector((state) => state.favorites.favorites);

  //create current date and day of the week
  const date = new Date();
  const dayMonth = date.toLocaleString("default", {
    day: "numeric",
    month: "long",
  });
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const curDayOfWeek = daysOfWeek[date.getDay()];
  console.log(weather);

  const apiKey = import.meta.env.VITE_WEATHER_API;

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${apiKey}`
      )
      .catch((error) => {
        console.log(error);
        setError(true);
      })
      .then((res) => {
        setWeather(res.data);
        setLoading(false);
      });
  }, [country.capital]);

  //create weather description with capital letter
  let weatherDescription = "";
  if (weather) {
    const textWeather = weather.weather[0].description;
    console.log(textWeather);
    weatherDescription =
      textWeather.charAt(0).toUpperCase() + textWeather.slice(1);
  }

  useEffect(() => {
    if (borders) {
      setBorderCountries([]);
      countriesList.forEach((c) => {
        for (let i = 0; i < borders.length; i++) {
          if (borders[i] === c.fifa) {
            setBorderCountries((prevState) => [...prevState, c]);
          }
        }
      });
    }
  }, [country.capital]);

  if (loading) {
    return (
      <Col className="text-center m-5">
        <Spinner
          animation="border"
          role="status"
          className="center"
          variant="info"
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Col>
    );
  }
  return (
    <Container className=" ">
      <div className="d-lg-flex mt-2  ">
        <div className="d-flex flex-column me-2 justify-content-between">
          <Card className="img-thumbnail shadow">
            <div className="pt-1">
              {favorites.some(
                (favorite) => favorite === country.name.common
              ) ? (
                <FavoriteIcon
                  sx={{ color: "red" }}
                  onClick={() => dispatch(removeFavorite(country.name.common))}
                />
              ) : (
                <FavoriteBorderIcon
                  sx={{ color: "red" }}
                  onClick={() => dispatch(addFavorite(country.name.common))}
                />
              )}
            </div>

            <Image
              className="img-fluid mt-2"
              style={{ maxHeight: "300px" }}
              src={`https://source.unsplash.com/featured/1600x900?${country.name.common}`}
              alt={`picture of ${country.name.common}`}
            />
          </Card>

          <Card className="p-2 weatherBox mt-2  shadow">
            <div className="d-flex justify-content-between">
              <div>
                {" "}
                <i className="bi bi-geo-alt me-2 h4"></i>
                <h4 className="d-inline-block">
                  {country.capital}, {country.altSpellings[0]} {country.flag}
                </h4>
              </div>

              <h6>
                {curDayOfWeek}, {dayMonth}
              </h6>
            </div>

            {!error && weather && (
              <div className="d-lg-flex justify-content-between">
                <div className=" align-self-center">
                  <h2>{weather.main.temp} ℃</h2>
                  <div>
                    <p>
                      Feels like: {weather.main.feels_like}℃.{" "}
                      {weatherDescription}.
                    </p>
                  </div>
                </div>
                <div className=" ">
                  <div>
                    <div className=" d-flex flex-column align-items-center">
                      <img
                        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                        alt={weatherDescription}
                        style={{ maxHeight: "70px" }}
                        className=" "
                      />
                    </div>

                    <div className="d-flex">
                      <div className=" p-2 d-flex flex-column align-items-center">
                        <WaterDropOutlinedIcon />

                        <div className="">{weather.main.humidity}％</div>
                      </div>
                      <div className=" p-2 d-flex flex-column align-items-center">
                        <AirOutlinedIcon />
                        <div className="">{weather.wind.speed}km/h</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>

        <Col>
          <Card className="img-thumbnail shadow">
            {borders && (
              <div>
                <i className="bi bi-pin-map-fill me-2 h6"></i>
                <p className="d-inline-block h6">Neighboring countries: </p>
                {borderCountries.map((country, index) => (
                  <Link
                    to={`/countries/${country.name.common}`}
                    state={{ country: country }}
                    key={index}
                  >
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm m-1 rounded" /* className="d-inline-block m-1 p-1 bg-secondary text-white rounded" */
                    >
                      {country.name.common}
                    </button>
                  </Link>
                ))}
              </div>
            )}
            <GetMap />
          </Card>
        </Col>
      </div>

      <Button
        className="mb-3 mt-4 shadow border"
        variant="light"
        onClick={() => navigate("/countries")}
      >
        Back to Countries
      </Button>
    </Container>
  );
};

export default CountriesSingle;
