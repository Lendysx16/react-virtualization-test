import { configureStore } from "@reduxjs/toolkit";

import { usersAPI } from "./query/usersAPI";
import selectedUser from "./slices/selectedUser";
export const store = configureStore({
    reducer: {
        [usersAPI.reducerPath]: usersAPI.reducer,
        selectedUser: selectedUser,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(usersAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
