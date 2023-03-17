import { useSelector } from 'react-redux';
// import { Redirect, Route } from 'react-router'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) =>{

    const userSignin = useSelector((state) => state.userSignin);

    const {userInfo} = userSignin;
    return userInfo ? children : <Navigate to="/signin"/>
}

export default PrivateRoute;

