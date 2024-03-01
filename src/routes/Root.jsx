import { Outlet } from "react-router-dom";
import Header from "../components/Header";

function Root({ user }) {
  return (
    <div>
      <Header user={user} />
      <Outlet />
    </div>
  );
}

export default Root;
