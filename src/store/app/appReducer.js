import {NOT_INITIALIZED} from "../../constants/authEnums";

const initialState = {
    authState: NOT_INITIALIZED,
};

const AppReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default AppReducer;
