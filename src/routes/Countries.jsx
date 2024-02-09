import { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Spinner } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import { initializeCountries } from "../store/countriesSlice";
import { addFavorite } from "../store/favoritesSlice";
import { Link } from "@mui/material";

const Countries = () => {
  const countriesList = useSelector((state) => state.countries.countries);
  const [filteredCountries, setFilteredCountries] = useState(countriesList);
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.countries.isLoading);

  const filtered = (e) => {
    let inputValue = e.target.value;
    const filtered = countriesList.filter((country) =>
      country.name.common.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  useEffect(() => {
    dispatch(initializeCountries());
  }, [dispatch]);

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
    <Container fluid>
      <div>
        <input
          type="text"
          placeholder="Search for countries"
          onChange={filtered}
        />
      </div>
      <Row xs={2} md={3} lg={4} className=" g-3">
        {filteredCountries.map((country) => (
          <Col key={country.name.official} className="mt-5">
            <Card className="h-100">
              <FavoriteIcon
                color="red"
                onClick={() => dispatch(addFavorite(country))}
              />
              <Link href={`/countries/${country.name.common}`}>
                <Card.Img
                  variant="top"
                  className="rounded h-50"
                  src={`${country.flags.svg}`}
                  style={{
                    objectFit: "cover",
                    minHeight: "200px",
                    maxHeight: "200px",
                  }}
                />{" "}
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
                    {/*  {Object.values(country.languages ?? {}).join(", ")} */}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <i className="bi bi-cash-coin me-2"></i>

                    {Object.values(country.currencies || {})
                      .map((currency) => currency.name)
                      .join(", ")}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    {country.population.toLocaleString()}
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Countries;
