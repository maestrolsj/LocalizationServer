import React, { useContext, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { UserContext } from "./context/UserContext";
import PublicFrame from "./pages/Public";
import Home from "./pages/Private/Home";
import Settings from "./pages/Private/Settings";
import Screen from "./pages/Private/Screen";
import Translate from "./pages/Private/Translate";
import Loading from "./Loading";

const RedirectRoute = (to: string) => {
  return () => <Redirect to={to} />;
};

function PublicRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={PublicFrame} />
      </Switch>
    </Router>
  );
}
function PrivateRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={RedirectRoute("/home")} />
        <Route path="/home" component={Home} />
        <Route path="/settings" component={Settings} />
        <Route path="/project/:id/screens" component={Screen} />
        <Route
          path="/project/:projectId/screen/:screenId/translate"
          component={Translate}
        />
        <Redirect to="/home" />
      </Switch>
    </Router>
  );
}

function App() {
  const { user } = useContext(UserContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user?.accessToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    setIsLoading(false);
  }, [user]);

  if (isLoading) {
    return <Loading />;
  }
  return isLoggedIn ? <PrivateRouter /> : <PublicRouter />;
}

export default App;
