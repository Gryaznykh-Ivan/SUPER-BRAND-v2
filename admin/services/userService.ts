import { api } from "../store/api";
import { UserAddAddressRequest, UserAddAddressResponse, UserAddPermissionRequest, UserAddPermissionResponse, UserCreateRequest, UserCreateResponse, UserDeleteRequest, UserDeleteResponse, UserGetByIdRequest, UserGetByIdResponse, UserRemoveAddressRequest, UserRemoveAddressResponse, UserRemovePermissionRequest, UserRemovePermissionResponse, UserSearchRequest, UserSearchResponse, UserUpdateRequest, UserUpdateResponse } from "../types/api";

export const userService = api.injectEndpoints({
    endpoints: builder => ({
        getUserBySearch: builder.query<UserSearchResponse, UserSearchRequest>({
            query: (credentials) => ({
                url: "users/search",
                method: "GET",
                params: credentials
            })
        }),
        getUserById: builder.query<UserGetByIdResponse, UserGetByIdRequest>({
            query: ({ userId }) => ({
                url: `users/${ userId }`,
                method: "GET",
            })
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
            })
        }),
        addAddress: builder.mutation<UserAddAddressResponse, UserAddAddressRequest>({
            query: ({ userId, data }) => ({
                url: `users/${ userId }/addAddress`,
                method: "POST",
                body: data
            })
        }),
        removeAddress: builder.mutation<UserRemoveAddressResponse, UserRemoveAddressRequest>({
            query: ({ userId, addressId }) => ({
                url: `users/${ userId }/removeAddress/${ addressId }`,
                method: "DELETE"
            })
        }),
        addPermission: builder.mutation<UserAddPermissionResponse, UserAddPermissionRequest>({
            query: ({ userId, data }) => ({
                url: `users/${ userId }/addPermission`,
                method: "POST",
                body: data
            })
        }),
        removePermission: builder.mutation<UserRemovePermissionResponse, UserRemovePermissionRequest>({
            query: ({ userId, permissionId }) => ({
                url: `users/${ userId }/addPermission/${ permissionId }`,
                method: "DELETE",
            })
        }),
        deleteUser: builder.mutation<UserDeleteResponse, UserDeleteRequest>({
            query: ({ userId }) => ({
                url: `users/${ userId }`,
                method: "DELETE"
            })
        }),
    })
})

export const {
    useLazyGetUserBySearchQuery,
    useGetUserBySearchQuery,
    useGetUserByIdQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useAddAddressMutation,
    useRemoveAddressMutation,
    useAddPermissionMutation,
    useRemovePermissionMutation
} = userService
