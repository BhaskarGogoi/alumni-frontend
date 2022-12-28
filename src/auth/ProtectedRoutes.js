import { Navigate, Outlet } from "react-router-dom";
import DashboardNav from "../components/DashboardNav";
import Login from "../pages/Login";

const useAuth = () => {
    if (localStorage.getItem("token") === null) {
        const user = {loggedIn:false}
        return user && user.loggedIn;
    } else {
        const user = {loggedIn:true};
        return user && user.loggedIn;
    }
};

const ProtectedRoutes = () => {
    const isAuth = useAuth();
    if(isAuth){
        return (
            <>  
            <div className="container">
                <div style={{display: 'flex'}}>
                    <DashboardNav/>
                    <Outlet/> 
                </div>
            </div>
                
            </>  
        )
    } else {
        return(
            <Login/>
        )
    }

}

export default ProtectedRoutes;