import { useState } from "react";
import useAuthState from "react-firebase-hooks/auth";
import { auth } from "../auth/firebase";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);

  return <div></div>;
}

export default Register;
