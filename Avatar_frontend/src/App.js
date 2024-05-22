import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import UserLogin from "./pages/UserLogin";
import UserHome from "./pages/UserHome";
import Avatars from "./pages/AvatarsPage";
import audio from "./sample-15s.mp3";
import ViewButtons from "./pages/ViewButtons";
import Dashboard from "./pages/Dashboard";
import "./App.css";
import ModifyButton from "./pages/ModifyButton";
import DeleteButton from "./pages/DeleteButton";
import AddButton from "./pages/AddButton";
import ModifyForm from "./pages/ModifyForm";
import { Provider } from "react-redux";
import store from "./store/store";
import LoginProtected from "./ProtectedRoute/LoginProtected";
import ProtectedRoute from "./ProtectedRoute/protectRoute";
import AdminProtectedRoute from "./ProtectedRoute/AdminProtected";
import Register from "./pages/Register";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Routes>
          {/* Landing Page Route */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <LandingPage />
              </ProtectedRoute>
            }
          />

          {/* User Login Route */}
          <Route
            path="login"
            element={
              <LoginProtected>
                <UserLogin />
              </LoginProtected>
            }
          />

          {/* Admin Dashboard Route */}
          {/* <Route
            path="avatars"
            element={
              <ProtectedRoute>
                <Avatars />
              </ProtectedRoute>
            }
          /> */}

          {/* Dashboard Route */}
          <Route
            path="dashboard"
            element={
              <AdminProtectedRoute>
                <Dashboard />
              </AdminProtectedRoute>
            }
          ></Route>

          {/* ViewButtons */}
          <Route
            path="view"
            element={
              <ProtectedRoute>
                <ViewButtons />
              </ProtectedRoute>
            }
          ></Route>

          {/* Modify Buttons */}
          <Route
            path="modify"
            element={
              <AdminProtectedRoute>
                <ModifyButton />
              </AdminProtectedRoute>
            }
          ></Route>

          {/* Delete Button */}
          <Route
            path="delete"
            element={
              <AdminProtectedRoute>
                <DeleteButton />
              </AdminProtectedRoute>
            }
          ></Route>

          {/* Add Button */}
          <Route
            path="add"
            element={
              <AdminProtectedRoute>
                <AddButton />
              </AdminProtectedRoute>
            }
          ></Route>

          {/* Modify Form */}
          <Route
            path="update/:buttonId"
            element={
              <AdminProtectedRoute>
                <ModifyForm />
              </AdminProtectedRoute>
            }
          ></Route>

          {/* Register Route */}
          <Route
            path="register"
            element={
              <AdminProtectedRoute>
                <Register />
              </AdminProtectedRoute>
            }
          ></Route>

          {/* 404 */}
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </Provider>
    </Router>
  );
}

export default App;
