import { USER_COVID_FAIL, USER_COVID_REQUEST, USER_COVID_SUCCESS } from "../constants/covidConstants";



export const CovidDataReducer = (state =[], action) =>{
    switch(action.type){
        case USER_COVID_REQUEST :
            return {loading: true};
        case USER_COVID_SUCCESS :
            return {loading: false, CovData: action.payload};
        case USER_COVID_FAIL :
            return {loading: false, error: action.payload};
        default: 
            return state;
    }
}