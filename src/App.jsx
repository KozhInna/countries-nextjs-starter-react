import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { Provider } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { auth, getUserData } from "./auth/firebase";
import ProtectedRoute from "./auth/ProtectedRoute";
import Countries from "./routes/Countries";
import CountriesSingle from "./routes/CountriesSingle";
import Favorites from "./routes/Favorites";
import Home from "./routes/Home";
import Login from "./routes/Login";
import { Register } from "./routes/Register";
import Root from "./routes/Root";
import store from "./store/store";
import { useEffect, useState } from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

function App() {
  const [user] = useAuthState(auth);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    setUserName("");
    const getUserName = async () => {
      if (user) {
        const uid = user.uid;
        const userData = await getUserData(uid);
        return setUserName(userData);
      }
    };
    getUserName();
  }, [user]);

  return (
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={theme}>
          <Router>
            <Routes>
              <Route
                path="/"
                element={<Root user={user} userName={userName} />}
              >
                <Route index element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="logout" element={<Login />} />
                <Route
                  path="/countries"
                  element={
                    <ProtectedRoute>
                      <Countries />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/favorites"
                  element={
                    <ProtectedRoute>
                      <Favorites />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/countries/:single"
                  element={
                    <ProtectedRoute>
                      <CountriesSingle />
                    </ProtectedRoute>
                  }
                />
              </Route>
            </Routes>
          </Router>
        </ThemeProvider>
      </LocalizationProvider>
    </Provider>
  );
}

export default App;
