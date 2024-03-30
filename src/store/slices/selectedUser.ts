import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: -1,
};

const selectedUserSlice = createSlice({
    name: "selectedUser",
    initialState,
    reducers: {
        setSelectedUser(state, action: { payload: typeof initialState }) {
            if (action.payload.id < 0) {
                state.id = 0;
                return;
            }
            state.id = action.payload.id;
        },
    },
});

export default selectedUserSlice.reducer;
export const { setSelectedUser } = selectedUserSlice.actions;
