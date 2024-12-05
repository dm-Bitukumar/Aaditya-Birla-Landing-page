import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: undefined,
  panDetails: {},
  personalDetails: {},
  workDetails: {},
  offers: [],
  lead: {},
};

const stateSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setpanDetails: (state, action) => {
      state.panDetails = action.payload;
    },
    setPersonalDetails: (state, action) => {
      state.personalDetails = { ...state.personalDetails, ...action.payload }; 
    },
    setWorkDetails: (state, action) => {
      state.workDetails = { ...state.workDetails, ...action.payload }; 
    },
    login(state, action) {
      state.user = action.payload;
    },
    setLead(state, action) {
      state.lead = { ...state.lead, ...action.payload };
    },
    setOffers(state, action) {
      state.offers = action.payload;
    },
  },
});

export const { login, setLead, setOffers, setpanDetails, setWorkDetails, setPersonalDetails } = stateSlice.actions;
export default stateSlice.reducer;
