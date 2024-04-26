import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: undefined,
  offers: [],
  lead: {},
};

const stateSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
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

export const { login, setLead, setOffers } = stateSlice.actions;
export default stateSlice.reducer;
