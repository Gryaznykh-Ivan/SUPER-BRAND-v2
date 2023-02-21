import { api } from "../store/api";
import { OrderCreateRequest, OrderCreateResponse, OrderGetByIdRequest, OrderGetByIdResponse, OrderSearchRequest, OrderSearchResponse,  OrderUpdateRequest, OrderUpdateResponse } from "../types/api";

export const orderService = api.injectEndpoints({
    endpoints: builder => ({
        getOrdersBySearch: builder.query<OrderSearchResponse, OrderSearchRequest>({
            query: (credentials) => ({
                url: "orders/search",
                method: "GET",
                params: credentials
            }),
            providesTags: ["ORDERS"]
        }),
        getOrderById: builder.query<OrderGetByIdResponse, OrderGetByIdRequest>({
            query: ({ orderId }) => ({
                url: `orders/${orderId}`,
                method: "GET",
            }),
            providesTags: ["ORDER"]
        }),
        createOrder: builder.mutation<OrderCreateResponse, OrderCreateRequest>({
            query: (credentials) => ({
                url: "orders/create",
                method: "POST",
                body: credentials
            }),
        }),
        updateOrder: builder.mutation<OrderUpdateResponse, OrderUpdateRequest>({
            query: ({ orderId, ...rest }) => ({
                url: `orders/${orderId}`,
                method: "PUT",
                body: rest
            }),
            invalidatesTags: ["ORDER"]
        })
    })
})

export const {
    useLazyGetOrdersBySearchQuery,
    useGetOrderByIdQuery,
    useCreateOrderMutation,
    useUpdateOrderMutation
} = orderService
