import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: undefined,
  personalDetails: {},
  offers: [],
  lead: {},
};

const stateSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setPersonalDetails: (state, action) => {
      state.personalDetails = action.payload;
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

export const { login, setLead, setOffers, setPersonalDetails } = stateSlice.actions;
export default stateSlice.reducer;
