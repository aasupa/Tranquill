import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import LoginPage from "scenes/loginPage";
import Users from "scenes/users";
import AddBlog from "scenes/addBlog";
import UsersBlog from "scenes/usersblog";
import DataComponent from "components/DataComponent";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const isLoggedIn = useSelector((state) => state.global.isLoggedIn);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            {isLoggedIn ? (
              <Route element={<Layout />}>
                <Route
                  path="/"
                  element={<Navigate to="/dashboard" replace />}
                />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/users" element={<Users />} />
                <Route path="/usersblog" element={<UsersBlog />} />
                <Route path="/addblog" element={<AddBlog />} />
                <Route path="/datacomponent" element={<DataComponent />} />
              </Route>
            ) : (
              <>
                <Route path="/login" element={<LoginPage />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
              </>
            )}
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
