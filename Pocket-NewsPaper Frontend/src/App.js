import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Welcome from "./components/Welcome";

import React, { useState } from "react";

import SearchResults from "./components/SearchResults";
import Navbar from "./components/Navbar";
import News from "./components/News";
import LoadingBar from "react-top-loading-bar";
import NotesPage from "./components/NotesPage";
import SavedArticles from "./components/SavedArticles";
import ProtectedRoute from "./components/ProtectedRoute";
import Alert from "./components/Alert";
import Last7Days from "./components/Last7Days";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

function AppContent() {
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/signup";

  const [progress, setProgress] = useState(0);

  const handleSetProgress = (progressValue) => {
    setProgress(progressValue);
  };

  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });

    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  return (
    <>
      <LoadingBar
        height={3}
        color="#f11946"
        progress={progress}
      />

      {!hideNavbar && <Navbar showAlert={showAlert} />}

      <Alert alert={alert} />

      <Routes>

        
        <Route
          path="/"
          element={<Welcome />}
        />

       
        <Route
          path="/login"
          element={<Login showAlert={showAlert} />}
        />

        
        <Route
          path="/signup"
          element={<Signup showAlert={showAlert} />}
        />

       
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <News
                setProgress={handleSetProgress}
                key="general"
                country="in"
                category="top"
                showAlert={showAlert}
              />
            </ProtectedRoute>
          }
        />

       
        <Route
          path="/health"
          element={
            <ProtectedRoute>
              <News
                setProgress={handleSetProgress}
                key="health"
                country="in"
                category="health"
                showAlert={showAlert}
              />
            </ProtectedRoute>
          }
        />

       
        <Route
          path="/science"
          element={
            <ProtectedRoute>
              <News
                setProgress={handleSetProgress}
                key="science"
                country="in"
                category="science"
                showAlert={showAlert}
              />
            </ProtectedRoute>
          }
        />

      
        <Route
          path="/sports"
          element={
            <ProtectedRoute>
              <News
                setProgress={handleSetProgress}
                key="sports"
                country="in"
                category="sports"
                showAlert={showAlert}
              />
            </ProtectedRoute>
          }
        />

      
        <Route
          path="/technology"
          element={
            <ProtectedRoute>
              <News
                setProgress={handleSetProgress}
                key="technology"
                country="in"
                category="technology"
                showAlert={showAlert}
              />
            </ProtectedRoute>
          }
        />

       
        <Route
          path="/business"
          element={
            <ProtectedRoute>
              <News
                setProgress={handleSetProgress}
                key="business"
                country="in"
                category="business"
                showAlert={showAlert}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/entertainment"
          element={
            <ProtectedRoute>
              <News
                setProgress={handleSetProgress}
                key="entertainment"
                country="in"
                category="entertainment"
                showAlert={showAlert}
              />
            </ProtectedRoute>
          }
        />

 
        <Route
          path="/Notes"
          element={
            <ProtectedRoute>
              <NotesPage showAlert={showAlert} />
            </ProtectedRoute>
          }
        />

       
        <Route
          path="/SavedArticles"
          element={
            <ProtectedRoute>
              <SavedArticles showAlert={showAlert} />
            </ProtectedRoute>
          }
        />

       
        <Route
          path="/last7days"
          element={
            <ProtectedRoute>
              <Last7Days showAlert={showAlert} />
            </ProtectedRoute>
          }
        />

       
        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <SearchResults showAlert={showAlert} />
            </ProtectedRoute>
          }
        />

     
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;