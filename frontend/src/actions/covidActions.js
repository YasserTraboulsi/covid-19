import Axios from "axios";
import { USER_COVID_FAIL, USER_COVID_REQUEST, USER_COVID_SUCCESS } from "../constants/covidConstants"


export const getCovidData = () => async(dispatch,getState) => {
    dispatch({type: USER_COVID_REQUEST});
    const {userSignin: {userInfo}} = getState()

    try {
        const {data} = await Axios.get('/api/covid',
        { 
            headers: { Authorization: `Bearer ${userInfo.token}` },
        }
        );
        dispatch({type: USER_COVID_SUCCESS, payload: data})
    } catch (error) {
        dispatch({type: USER_COVID_FAIL,
            payload: 
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message
            });
    }
}