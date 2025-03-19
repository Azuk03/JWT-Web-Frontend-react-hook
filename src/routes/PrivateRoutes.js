import { Route } from "react-router-dom";
import { useEffect, useContext } from "react";
import { useHistory, Redirect } from "react-router-dom/cjs/react-router-dom";
import { UserContext } from "../context/UserContext";

const PrivateRoutes = (props) => {
  let {user} = useContext(UserContext);

 
    if(user && user.isAuthenticated === true) {
      return (
        <>
          <Route path={props.path} component={props.component} />
        </>
      );
    } else {
      return <Redirect to={{pathname: "/login"}} />
    }

};

export default PrivateRoutes;
