import { NOT_INITIALIZED } from "../../constants/authEnums";

const initialState = {
  user: undefined,
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default AppReducer;
