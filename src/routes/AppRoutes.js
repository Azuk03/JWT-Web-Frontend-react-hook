import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import Users from "../components/ManageUsers/Users";
import PrivateRoutes from "./PrivateRoutes";
import Role from "../components/Role/Role";
import GroupRole from "../components/Group-Role/GroupRole";
import Home from "../components/Home";

const AppRoutes = (props) => {
  return (
    <>
      <Switch>
        <PrivateRoutes path="/users" component = {Users} />
        {/* <PrivateRoutes path="/projects" component = {} /> */}
        <PrivateRoutes path="/roles" component = {Role} />
        <PrivateRoutes path="/group-role" component = {GroupRole} />
        
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="*">404 not found</Route>
      </Switch>
    </>
  );
};

export default AppRoutes;
