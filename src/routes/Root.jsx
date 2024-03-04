import { Outlet } from "react-router-dom";
import Header from "../components/Header";

function Root({ user, userName }) {
  return (
    <div>
      <Header user={user} userName={userName} />
      <Outlet />
    </div>
  );
}

export default Root;
