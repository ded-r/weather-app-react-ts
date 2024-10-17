import { FETCH_WEATHER_FAILURE, FETCH_WEATHER_REQUEST, FETCH_WEATHER_SUCCESS, WeatherData, WeatherDispatchTypes } from "../../types/types";

interface WeatherState {
    loading: boolean;
    data: WeatherData | null;
    error: string | null;
}

const initialState: WeatherState = {
    loading: false,
    data: null,
    error: null,
};

export const weatherReducer = (state = initialState, action: WeatherDispatchTypes): WeatherState => {
    switch (action.type) {
        case FETCH_WEATHER_REQUEST:
            return { ...state, loading: true };
        case FETCH_WEATHER_SUCCESS:
            return { ...state, loading: false, data: action.payload };
        case FETCH_WEATHER_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
