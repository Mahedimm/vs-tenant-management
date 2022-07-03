import { Navigate,useLocation} from "react-router-dom"
function ProtectRoute({auth, children }) {   
    return auth ? children : <Navigate to="/login" />;
   
}
export default ProtectRoute;