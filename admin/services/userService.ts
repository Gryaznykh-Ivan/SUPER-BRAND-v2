import { api } from "../store/api";
import { UserAddAddressRequest, UserAddAddressResponse, UserAddPermissionRequest, UserAddPermissionResponse, UserCreateRequest, UserCreateResponse, UserDeleteRequest, UserDeleteResponse, UserGetAddressesRequest, UserGetAddressesResponse, UserGetByIdRequest, UserGetByIdResponse, UserRemoveAddressRequest, UserRemoveAddressResponse, UserRemovePermissionRequest, UserRemovePermissionResponse, UserSearchRequest, UserSearchResponse, UserUpdateRequest, UserUpdateResponse } from "../types/api";

export const userService = api.injectEndpoints({
    endpoints: builder => ({
        getUsersBySearch: builder.query<UserSearchResponse, UserSearchRequest>({
            query: (credentials) => ({
                url: "users/search",
                method: "GET",
                params: credentials
            }),
            providesTags: ["USERS"]
        }),
        getUserById: builder.query<UserGetByIdResponse, UserGetByIdRequest>({
            query: ({ userId }) => ({
                url: `users/${ userId }`,
                method: "GET",
            }),
            providesTags: ["USER"]
        }),
        getUserAddresses: builder.query<UserGetAddressesResponse, UserGetAddressesRequest>({
            query: ({ userId }) => ({
                url: `users/${ userId }/addresses`,
                method: "GET",
            }),
            providesTags: ["USER"]
        }),
        createUser: builder.mutation<UserCreateResponse, UserCreateRequest>({
            query: (credentials) => ({
                url: "users/create",
                method: "POST",
                body: credentials
            })
        }),
        updateUser: builder.mutation<UserUpdateResponse, UserUpdateRequest>({
            query: ({ userId, ...rest }) => ({
                url: `users/${ userId }`,
                method: "PUT",
                body: rest
            }),
            invalidatesTags: ["USER"]
        }),
        deleteUser: builder.mutation<UserDeleteResponse, UserDeleteRequest>({
            query: ({ userId }) => ({
                url: `users/${ userId }`,
                method: "DELETE"
            }),
        }),
    })
})

export const {
    useLazyGetUsersBySearchQuery,
    useLazyGetUserByIdQuery,
    useLazyGetUserAddressesQuery,
    useGetUserByIdQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = userService
