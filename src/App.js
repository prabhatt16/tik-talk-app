import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import GoogleSignIn from "./components/GoogleSignIn";
import Header from "./components/Header";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "./firebase";
import Sidebar from "./components/Sidebar";
import Chat from "./screens/Chat";
import welcome from "./welcome.png";
import SearchPage from "./screens/searchPage";
function App() {
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user && auth) {
      db.collection("Users").doc(user?.id).set({
        accoutType: "normal",
        userId: user?.uid,
        name: user?.displayName,
        email: user?.email,
        profilePic: user?.photoURL,
        phone: user?.phoneNumber,
      });
    }
  });
  return (
    <div className="App">
      <Router>
        {!user ? (
          <GoogleSignIn />
        ) : (
          <div className="mainOfMain">
            <Header />
            <div className="app_body">
              <Sidebar />
              <Switch>
                <Route path="/room/:roomId">
                  <Chat />
                </Route>
                <Route path="/searchPage/:searchId">
                  <SearchPage />
                </Route>
                <Route path="/">
                  <div className="welcomePage">
                    <h1>
                      Welcome!!{" "}
                      <span style={{ color: "blueviolet" }}>
                        {user?.displayName}
                      </span>
                      😃
                    </h1>
                    <h4>Create Chennals, Explore & Enjoy!</h4>
                    <img src={welcome} alt="welcomePic" />
                  </div>
                </Route>
              </Switch>
            </div>
          </div>
        )}
      </Router>
    </div>
  );
}

export default App;
