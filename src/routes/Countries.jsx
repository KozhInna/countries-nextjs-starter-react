import { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Form, Spinner } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { initializeCountries } from "../store/countriesSlice";
import { addFavorite } from "../store/favoritesSlice";

const Countries = () => {
  const dispatch = useDispatch();

  const countriesList = useSelector((state) => state.countries.countries);
  const loading = useSelector((state) => state.countries.isLoading);
  const [search, setSearch] = useState("");

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
      <Row>
        <Col className="text-center m-5">
          <Form>
            <Form.Control
              style={{ width: "18rem" }}
              type="search"
              className="me-2 "
              placeholder="Search for countries"
              aria-label="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form>
        </Col>
      </Row>
      <Row xs={2} md={3} lg={4} className=" g-3">
        {countriesList
          .filter((c) => {
            return c.name.common.toLowerCase().includes(search.toLowerCase());
          })
          .map((country) => (
            <Col className="mt-5" key={country.name.common}>
              <Link
                to={`/countries/${country.name.common}`}
                state={{ country: country }}
              >
                <Card className="h-100">
                  <i
                    className="bi bi-heart-fill text-danger m-1 p-1"
                    onClick={() => dispatch(addFavorite(country.name.common))}
                  ></i>
                  <Card.Img
                    variant="top"
                    src={country.flags.svg}
                    className="rounded h-50"
                    style={{
                      objectFit: "cover",
                      minHeight: "200px",
                      maxHeight: "200px",
                    }}
                  />
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
              </Link>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default Countries;
