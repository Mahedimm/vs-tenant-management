import AppLayout from "./components/AppLayout";

import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { Dashboard, Tenant } from "./pages";
  

function App() {
 
  return (
    
    <BrowserRouter>
      <AppLayout >
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tenant" element={<Tenant />} />
         </Routes>
      </AppLayout>
      </BrowserRouter>
  );
};

export default App;
