import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL, API_KEY } from "../../api/api";

interface WeatherState {
    data: any;
    loading: boolean;
    error: string | null;
}

const initialState: WeatherState = {
    data: null,
    loading: false,
    error: null,
};

export const fetchWeatherByCity = createAsyncThunk("weather/fetchWeatherByCity", async (city: string) => {
    const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
    if (!response.ok) {
        throw new Error("Failed to fetch weather data");
    }
    const data = await response.json();
    return data;
});

export const fetchWeatherByCoords = createAsyncThunk("weather/fetchWeatherByCoords", async ({ latitude, longitude }: { latitude: number; longitude: number }) => {
    const response = await fetch(`${BASE_URL}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
    if (!response.ok) {
        throw new Error("Failed to fetch weather data");
    }
    const data = await response.json();
    return data;
});

const weatherSlice = createSlice({
    name: "weather",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWeatherByCity.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(fetchWeatherByCity.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWeatherByCity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Error fetching weather data";
            })
            .addCase(fetchWeatherByCoords.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(fetchWeatherByCoords.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWeatherByCoords.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Error fetching weather data";
            });
    },
});

export default weatherSlice.reducer;
