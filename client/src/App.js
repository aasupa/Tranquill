import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import ToDO from "scenes/todo/ToDo";
import { Box } from "@mui/material";
// import GameSelection from "scenes/GameSelection.jsx/GameSelection";
import WhackAMole from "./scenes/Whackamole/WhackAMole";
//import WhackAMole from "components/Whackamole/WhackAMole";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import Navbar from "scenes/navbar";
//import '@fortawesome/fontawesome-free/css/all.min.css';
function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {isAuth && <Navbar />}
          <Box sx={{ paddingTop: isAuth ? '60px' : '0' }}></Box>
           <Box sx={{ paddingTop: '60px' }}> 
          <Routes>
            <Route path="/" element={<LoginPage />} />
            
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
            <Route
              path="/todo"
              element={isAuth ? <ToDO /> : <Navigate to="/" />}
            />
            {/* <Route
                path="/games"
                element={isAuth ? <GameSelection /> : <Navigate to="/" />}
              /> */}
            <Route
              path="/whackAMole"
              element={isAuth ? <WhackAMole /> : <Navigate to="/" />}
            />
          </Routes>
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
