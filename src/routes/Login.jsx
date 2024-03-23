import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword } from "../auth/firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [useDemo, setUseDemo] = useState(true);
  const [user, loading] = useAuthState(auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/countries");
  }, [user, loading, navigate]);

  function handleDemo() {
    if (useDemo) {
      setEmail("guest@test.com");
      setPassword("test123");
      setUseDemo(false);
    } else {
      setUseDemo(true);
      setEmail("");
      setPassword("");
    }
  }

  return (
    <div className="back-img">
      <div className="main-box shadow">
        <div className="blur-box">
          <div
            className="d-flex flex-column gap-2"
            style={{ maxWidth: "250px" }}
          >
            <h1 style={{ textAlign: "center" }}>Login</h1>
            <div className="border border-white border-2 rounded p-1">
              <span
                style={{
                  color: "#606060",
                  fontStyle: "italic",
                  marginRight: "10px",
                }}
              >
                Enter your login credentials or use Demo account
              </span>
              <Button
                variant="contained"
                className="d-inline-block rounded-pill btn-outline-secondary btn-sm"
                onClick={handleDemo}
              >
                Use demo
              </Button>
            </div>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="rounded-pill p-2"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="rounded-pill p-2"
            />

            <Button
              className="rounded-pill mt-3"
              onClick={() => logInWithEmailAndPassword(email, password)}
            >
              Login
            </Button>

            <div>
              Need to register for an account?{" "}
              <Link to="/register">
                <strong>Register</strong>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
