import { api } from "../store/api";
import { FulfillmentCreateRequest, FulfillmentCreateResponse, FulfillmentDeleteRequest, FulfillmentDeleteResponse, FulfillmentGetByIdRequest, FulfillmentGetByIdResponse, FulfillmentUpdateRequest, FulfillmentUpdateResponse, OrderCreateRequest, OrderCreateResponse, OrderGetByIdRequest, OrderGetByIdResponse, OrderSearchRequest, OrderSearchResponse,  OrderUpdateRequest, OrderUpdateResponse } from "../types/api";

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
        getFulfillmentById: builder.query<FulfillmentGetByIdResponse, FulfillmentGetByIdRequest>({
            query: ({ orderId, fulfillmentId }) => ({
                url: `orders/${orderId}/${ fulfillmentId }`,
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
        }),
        createFulfillment: builder.mutation<FulfillmentCreateResponse, FulfillmentCreateRequest>({
            query: ({ orderId, ...rest }) => ({
                url: `orders/${orderId}`,
                method: "POST",
                body: rest
            }),
        }),
        updateFulfillment: builder.mutation<FulfillmentUpdateResponse, FulfillmentUpdateRequest>({
            query: ({ orderId, ...rest }) => ({
                url: `orders/${orderId}`,
                method: "PUT",
                body: rest
            }),
            invalidatesTags: ["ORDER"]
        }),
        deleteFulfillment: builder.mutation<FulfillmentDeleteResponse, FulfillmentDeleteRequest>({
            query: ({ orderId, fulfillmentId }) => ({
                url: `orders/${orderId}/${fulfillmentId}`,
                method: "DELETE"
            }),
            invalidatesTags: ["ORDER"]
        })
    })
})

export const {
    useLazyGetOrdersBySearchQuery,
    useGetOrderByIdQuery,
    useGetFulfillmentByIdQuery,
    useCreateOrderMutation,
    useUpdateOrderMutation,
    useCreateFulfillmentMutation,
    useUpdateFulfillmentMutation,
    useDeleteFulfillmentMutation,
} = orderService
