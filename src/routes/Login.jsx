import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword } from "../auth/firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  user && console.log("user", user.uid);

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/countries");
  }, [user, loading, navigate]);

  return (
    <div className="back-img">
      <div className="main-box shadow">
        <div className="blur-box">
          <div
            className="d-flex flex-column gap-2"
            style={{ maxWidth: "200px" }}
          >
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
            <div>
              For test purposes you can use e-mail: guest@test.com password:
              test123
            </div>
            <Button
              className="rounded-pill"
              onClick={() => logInWithEmailAndPassword(email, password)}
            >
              Login
            </Button>

            <div>
              Need to register for an account?{" "}
              <Link to="/register">Register</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
