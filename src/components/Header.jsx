import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import { auth, getUserData, logout } from "../auth/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

const Header = () => {
  const [user] = useAuthState(auth);
  console.log("user", user);
  const [userName, setUserName] = useState("");
  console.log("name", userName);

  useEffect(() => {
    setUserName("");
    const getUserName = async () => {
      if (user) {
        const uid = user.uid;
        const userData = await getUserData(uid);
        console.log("userData", userData);
        if (userData) {
          setUserName(userData);
        } else {
          setUserName("guest");
        }
      }
    };
    getUserName();
  }, [user]);

  return !user ? (
    <Container fluid>
      <Row>
        <Navbar bg="light" variant="light">
          <Container className="justify-content-end">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav>
                <Link to="/">
                  <Button variant="contained">Home</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Register</Button>
                </Link>
                <Link to="/login">
                  <Button variant="contained">Login</Button>
                </Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Row>
    </Container>
  ) : (
    <Container fluid>
      <Row>
        <Navbar bg="light" variant="light">
          <Container className="justify-content-end">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav>
                <Link to="/">
                  <Button variant="contained">Home</Button>
                </Link>
                <Link to="/countries">
                  <Button variant="contained">Countries</Button>
                </Link>
                <Link to="/favorites">
                  <Button variant="contained">Favorites</Button>
                </Link>
                <Button onClick={logout}>Logout</Button>
              </Nav>
            </Navbar.Collapse>
            {userName && `Welcome, ${userName}!`}
          </Container>
        </Navbar>
      </Row>
    </Container>
  );
};

export default Header;
