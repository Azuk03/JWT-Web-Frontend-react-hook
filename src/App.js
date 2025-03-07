import Nav from "./components/Navigation/Nav";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const [account, setAccount] = useState({});

  useEffect(() => {
    let session = sessionStorage.getItem('account');
    if(session) {
      setAccount(JSON.parse(session));
    }
  }, []);
  return (
    <Router>
      <div className="app-header">  
        <Nav />
      </div>
      <div className="app-container">
        <AppRoutes />
      </div>
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
  );
}

export default App;
