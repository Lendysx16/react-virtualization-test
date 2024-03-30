import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "../../types/userDTO";
import { queryParams } from "../../types/queryParams";

export const usersAPI = createApi({
    reducerPath: "usersAPI",
    tagTypes: ["users"],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3001/",
    }),
    endpoints: (build) => ({
        getUsers: build.query<IUser[], queryParams>({
            query: ({ limit = 20, start = 0 }) => ({
                url: "users",
                params: {
                    _limit: limit,
                    _start: start,
                },
            }),
            providesTags: (result) => {
                return result
                    ? [
                          ...result.map(
                              ({ id }) => ({ type: "users", id } as const)
                          ),
                          { type: "users", id: "LIST" },
                      ]
                    : [{ type: "users", id: "LIST" }];
            },
        }),
        getOneUser: build.query<IUser, number>({
            query: (id) => `users/${id}`,
            providesTags: (result) => [{ type: "users", id: result?.id }],
        }),
        updateUser: build.mutation<IUser, IUser>({
            query: (user) => ({
                url: `users/${user.id}`,
                method: "PUT",
                body: user,
            }),
            invalidatesTags: (result) => [{ type: "users", id: result?.id }],
        }),
    }),
});

export const { useGetUsersQuery, useUpdateUserMutation, useGetOneUserQuery } =
    usersAPI;
