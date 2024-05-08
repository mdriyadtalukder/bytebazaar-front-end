import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    processor_Type: [],
    processor_Generation: [],
    ram_Options: [],
    ssd_Options: [],
    graphicsMemory_Options: [],
    laptopSeries_Options: [],
}
const allProductSlice = createSlice({
    name: 'allProduct',
    initialState,
    reducers: {
        getType: (state, action) => {
            if (state.processor_Type.includes(action.payload)) {
                state.processor_Type = state.processor_Type.filter(f => f !== action.payload)
            }
            else if (action.payload === '') {
                state.processor_Type = [];
            }
            else {
                state.processor_Type.push(action.payload);
            }


        },
        getGeneration: (state, action) => {

            if (state.processor_Generation.includes(action.payload)) {
                state.processor_Generation = state.processor_Generation.filter(f => f !== action.payload)
            }
            else if (action.payload === '') {
                state.processor_Generation = [];
            }
            else {
                state.processor_Generation.push(action.payload);
            }

        },
        getRam: (state, action) => {

            if (state.ram_Options.includes(action.payload)) {
                state.ram_Options = state.ram_Options.filter(f => f !== action.payload)
            }
            else if (action.payload === '') {
                state.ram_Options = [];
            }
            else {
                state.ram_Options.push(action.payload);
            }


        },
        getSSD: (state, action) => {

            if (state.ssd_Options.includes(action.payload)) {
                state.ssd_Options = state.ssd_Options.filter(f => f !== action.payload)
            }
            else if (action.payload === '') {
                state.ssd_Options = [];
            }
            else {
                state.ssd_Options.push(action.payload);
            }


        },
        getMemory: (state, action) => {

            if (state.graphicsMemory_Options.includes(action.payload)) {
                state.graphicsMemory_Options = state.graphicsMemory_Options.filter(f => f !== action.payload)
            }
            else if (action.payload === '') {
                state.graphicsMemory_Options = [];
            }
            else {
                state.graphicsMemory_Options.push(action.payload);
            }

        },
        getSeries: (state, action) => {

            if (state.laptopSeries_Options.includes(action.payload)) {
                state.laptopSeries_Options = state.laptopSeries_Options.filter(f => f !== action.payload)
            }
            else if (action.payload === '') {
                state.laptopSeries_Options = [];
            }
            else {
                state.laptopSeries_Options.push(action.payload);
            }

        }
    }

})
export default allProductSlice.reducer;
export const { getGeneration, getMemory, getRam, getSSD, getSeries, getType } = allProductSlice.actions;