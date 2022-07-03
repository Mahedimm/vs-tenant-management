import AppLayout from "./components/AppLayout";
// import Landlord from './routes/landlord';

import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { Dashboard, Flats, Tenants,Login,Users, Role} from "./pages";
import ProtectRoute from "./components/utilities/ProtectRoute";
import { useSelector } from "react-redux";

  


function App() {
  const auth = true;
  const { isLoggedIn} = useSelector(state => {
    return {
        isLoggedIn: state.auth.login,
    };
});

if (!isLoggedIn) {
  return (
    <Login />
  );
}
console.log(isLoggedIn);

  return (
    <>

    <BrowserRouter>
      <AppLayout >
        <Routes>
        { !isLoggedIn ? <Route path="/" element={<Login />} /> : <Route path="/" element={<Dashboard />} />}
          <Route path="/landlord/tenant" element={<ProtectRoute auth={isLoggedIn}>
              <Tenants />
            </ProtectRoute>} />
          <Route path="/dashboard" element={<ProtectRoute auth={isLoggedIn}>
              <Dashboard />
            </ProtectRoute>} />
          <Route path="/landlord/flat" element={<ProtectRoute auth={isLoggedIn}>
              <Flats />
            </ProtectRoute>} />
          <Route path="/user" element={<ProtectRoute auth={isLoggedIn}>
              <Users />
            </ProtectRoute>} />
          <Route path="/role" element={<ProtectRoute auth={isLoggedIn}>
              <Role />
            </ProtectRoute>} />
            <Route
              path="*"
              element={<Navigate to="/"  />}
              />
         </Routes>
        
      </AppLayout>
      </BrowserRouter>
      </>
  );
};

export default App;


// {
//   auth &&
// <Route
// path="/"
// element={<Navigate to="/landlord" replace />}
// />}