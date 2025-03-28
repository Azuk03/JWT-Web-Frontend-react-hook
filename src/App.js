import NavHeader from "./components/Navigation/NavHeader";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState, useContext } from "react";
import AppRoutes from "./routes/AppRoutes";
import { Rings } from "react-loader-spinner";
import { UserContext } from "./context/UserContext";
import { Scrollbars } from "react-custom-scrollbars";
import "./App.scss";

function App() {
  const { user } = useContext(UserContext);
  const [scrollHeight, setScrollHeight] = useState(0);

  useEffect(() => {
    let windowHeight = window.innerHeight;
    setScrollHeight(windowHeight);
  }, [user]);

  return (
    <Scrollbars autoHide style={{ height: scrollHeight }}>
      <Router>
        {user && user.isLoading ? (
          <div className="loading-container">
            <Rings
              height="80"
              width="80"
              color="green"
              ariaLabel="loading..."
            />
            <div className="loading-text">Loading...</div>
          </div>
        ) : (
          <>
            <div className="app-header">
              <NavHeader />
            </div>
            <div className="app-container">
              <AppRoutes />
            </div>
          </>
        )}

        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          // theme="light"
          // transition={Bounce}
        />
      </Router>
    </Scrollbars>
  );
}

export default App;
