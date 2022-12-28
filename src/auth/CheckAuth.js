import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
    if (localStorage.getItem("token") === null) {
        const user = {loggedIn:false}
        return user && user.loggedIn;
    } else {
        const user = {loggedIn:true};
        return user && user.loggedIn;
    }
};

const CheckAuth = () => {
    const isAuth = useAuth();
    return isAuth ? <Navigate to="/user/dashboard"/> : <Outlet/> ;
}

export default CheckAuth;