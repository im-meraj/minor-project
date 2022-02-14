import Home from "./pages/home/Home";
import TopBar from "./components/topbar/TopBar";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import {Signup} from "./pages/register/Signup";
import {Login} from "./pages/login/Login";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { Context } from "./context/Context";
import Messenger from "./pages/messenger/Messenger";

axios.defaults.baseURL = "http://localhost:4000/api";
axios.defaults.params = {};



function App() {
  const {user} = useContext(Context);
  return (
    <div>
      <Router>
        <TopBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            exact
            path="/register"
            element={user ? <Home /> : <Signup />}
          />
          <Route exact path="/login" element={user ? <Home /> : <Login />} />
          <Route
            exact
            path="/settings"
            element={user ? <Settings /> : <Signup />}
          />
          <Route exact path="/write" element={user ? <Write /> : <Signup />} />
          <Route exact path="/messenger" element={user ? <Messenger /> : <Login />} />
          <Route exact path="/post/:id" element={<Single />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
