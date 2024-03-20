import { useEffect } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import { initializeCountries } from "../store/countriesSlice";
import {
  addFavorite,
  clearFavorites,
  removeFavorite,
} from "../store/favoritesSlice";
import { Button } from "react-bootstrap";
import { getFavoritesFromSource } from "../auth/firebase";
import { Link } from "react-router-dom";

const Favorites = () => {
  const dispatch = useDispatch();

  const favorites = useSelector((state) => state.favorites.favorites);
  let countriesList = useSelector((state) => state.countries.countries);

  if (favorites.length > 0) {
    countriesList = countriesList.filter((country) =>
      favorites.includes(country.name.common)
    );
  } else {
    countriesList = [];
  }

  // TODO: Implement logic to retrieve favourites later.
  useEffect(() => {
    dispatch(initializeCountries());
    dispatch(getFavoritesFromSource());
  }, [dispatch]);

  return (
    <Container fluid>
      <div className="bigbox">
        <Button
          type="button"
          className="mt-4 shadow border rounded-pill"
          variant="light"
          onClick={() => dispatch(clearFavorites())}
        >
          Delete all
        </Button>
        <Row xs={2} md={3} lg={5} className=" g-3">
          {countriesList.map((country) => (
            <Col key={country.name.official} className="mt-5">
              <Card className="h-100">
                {favorites.some(
                  (favorite) => favorite === country.name?.common
                ) ? (
                  <FavoriteIcon
                    className="m-1"
                    sx={{ color: "red" }}
                    onClick={() =>
                      dispatch(removeFavorite(country.name.common))
                    }
                  />
                ) : (
                  <FavoriteBorderIcon
                    className="m-1"
                    sx={{ color: "red" }}
                    onClick={() => dispatch(addFavorite(country.name.common))}
                  />
                )}
                <Link
                  to={`/countries/${country.name.common}`}
                  state={{ country: country }}
                >
                  <Card.Img
                    variant="top"
                    className="rounded h-50"
                    src={country.flags.svg}
                    style={{
                      objectFit: "cover",
                      minHeight: "200px",
                      maxHeight: "200px",
                    }}
                  />
                </Link>

                <Card.Body className="d-flex flex-column">
                  <Card.Title>{country.name.common}</Card.Title>
                  <Card.Subtitle className="mb-5 text-muted">
                    {country.name.official}
                  </Card.Subtitle>
                  <ListGroup
                    variant="flush"
                    className="flex-grow-1 justify-content-end"
                  >
                    <ListGroup.Item>
                      <i className="bi bi-translate me-2"></i>
                      {Object.values(country.languages ?? {}).join(", ")}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <i className="bi bi-cash-coin me-2"></i>
                      {Object.values(country.currencies || {})
                        .map((currency) => currency.name)
                        .join(", ")}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <i className="bi bi-people me-2"></i>
                      {country.population.toLocaleString()}
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
};

export default Favorites;
