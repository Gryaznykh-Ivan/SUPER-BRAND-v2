import { api } from "../store/api";
import { OrderConfirmPaymentUpdateRequest, OrderConfirmPaymentUpdateResponse, OrderCreateRequest, OrderCreateResponse, OrderFulfillmentCreateRequest, OrderFulfillmentCreateResponse, OrderFulfillmentDeleteRequest, OrderFulfillmentDeleteResponse, OrderFulfillmentGetByIdRequest, OrderFulfillmentGetByIdResponse, OrderFulfillmentUpdateRequest, OrderFulfillmentUpdateResponse, OrderGetByIdRequest, OrderGetByIdResponse, OrderReturnCreateRequest, OrderReturnCreateResponse, OrderReturnDeleteRequest, OrderReturnDeleteResponse, OrderReturnGetByIdRequest, OrderReturnGetByIdResponse, OrderReturnUpdateRequest, OrderReturnUpdateResponse, OrderSearchRequest, OrderSearchResponse, OrderTimelineSearchRequest, OrderTimelineSearchResponse, OrderUpdateRequest, OrderUpdateResponse } from "../types/api";

export const orderService = api.injectEndpoints({
    endpoints: builder => ({
        getOrdersBySearch: builder.query<OrderSearchResponse, OrderSearchRequest>({
            query: (credentials) => ({
                url: "admin/orders/search",
                method: "GET",
                params: credentials
            }),
            providesTags: ["ORDERS"]
        }),
        getOrderTimelineBySearch: builder.query<OrderTimelineSearchResponse, OrderTimelineSearchRequest>({
            query: ({ orderId, ...data }) => ({
                url: `admin/orders/${orderId}/timeline`,
                method: "GET",
                params: data
            }),
            providesTags: ["ORDER"]
        }),
        getOrderById: builder.query<OrderGetByIdResponse, OrderGetByIdRequest>({
            query: ({ orderId }) => ({
                url: `admin/orders/${orderId}`,
                method: "GET",
            }),
            providesTags: ["ORDER"]
        }),
        getFulfillmentById: builder.query<OrderFulfillmentGetByIdResponse, OrderFulfillmentGetByIdRequest>({
            query: ({ orderId, fulfillmentId }) => ({
                url: `admin/orders/${orderId}/fulfillment/${fulfillmentId}`,
                method: "GET",
            }),
            providesTags: ["ORDER"]
        }),
        getReturnById: builder.query<OrderReturnGetByIdResponse, OrderReturnGetByIdRequest>({
            query: ({ orderId, returnId }) => ({
                url: `admin/orders/${orderId}/return/${returnId}`,
                method: "GET",
            }),
            providesTags: ["ORDER"]
        }),
        createOrder: builder.mutation<OrderCreateResponse, OrderCreateRequest>({
            query: (credentials) => ({
                url: "admin/orders/create",
                method: "POST",
                body: credentials
            }),
            invalidatesTags: ["OFFERS", "OFFER"]
        }),
        updateOrder: builder.mutation<OrderUpdateResponse, OrderUpdateRequest>({
            query: ({ orderId, ...rest }) => ({
                url: `admin/orders/${orderId}`,
                method: "PUT",
                body: rest
            }),
            invalidatesTags: ["ORDER", "OFFERS", "OFFER"]
        }),
        confirmPayment: builder.mutation<OrderConfirmPaymentUpdateResponse, OrderConfirmPaymentUpdateRequest>({
            query: ({ orderId }) => ({
                url: `admin/orders/${orderId}/confirmPayment`,
                method: "PUT"
            }),
            invalidatesTags: ["ORDER"]
        }),
        createFulfillment: builder.mutation<OrderFulfillmentCreateResponse, OrderFulfillmentCreateRequest>({
            query: ({ orderId, ...rest }) => ({
                url: `admin/orders/${orderId}/createFulfillment`,
                method: "POST",
                body: rest
            }),
            invalidatesTags: ["ORDER"]
        }),
        updateFulfillment: builder.mutation<OrderFulfillmentUpdateResponse, OrderFulfillmentUpdateRequest>({
            query: ({ orderId, fulfillmentId, ...rest }) => ({
                url: `admin/orders/${orderId}/fulfillment/${fulfillmentId}`,
                method: "PUT",
                body: rest
            }),
            invalidatesTags: ["ORDER"]
        }),
        deleteFulfillment: builder.mutation<OrderFulfillmentDeleteResponse, OrderFulfillmentDeleteRequest>({
            query: ({ orderId, fulfillmentId }) => ({
                url: `admin/orders/${orderId}/fulfillment/${fulfillmentId}`,
                method: "DELETE"
            }),
            invalidatesTags: ["ORDER"]
        }),
        createReturn: builder.mutation<OrderReturnCreateResponse, OrderReturnCreateRequest>({
            query: ({ orderId, ...rest }) => ({
                url: `admin/orders/${orderId}/createReturn`,
                method: "POST",
                body: rest
            }),
            invalidatesTags: ["ORDER", "OFFERS", "OFFER"]
        }),
        updateReturn: builder.mutation<OrderReturnUpdateResponse, OrderReturnUpdateRequest>({
            query: ({ orderId, returnId, ...rest }) => ({
                url: `admin/orders/${orderId}/return/${returnId}`,
                method: "PUT",
                body: rest
            }),
            invalidatesTags: ["ORDER"]
        }),
        deleteReturn: builder.mutation<OrderReturnDeleteResponse, OrderReturnDeleteRequest>({
            query: ({ orderId, returnId }) => ({
                url: `admin/orders/${orderId}/return/${returnId}`,
                method: "DELETE"
            }),
            invalidatesTags: ["ORDER", "OFFERS", "OFFER"]
        })
    })
})

export const {
    useLazyGetOrdersBySearchQuery,
    useLazyGetOrderTimelineBySearchQuery,
    useGetOrderByIdQuery,
    useGetFulfillmentByIdQuery,
    useGetReturnByIdQuery,
    useCreateOrderMutation,
    useUpdateOrderMutation,
    useCreateFulfillmentMutation,
    useUpdateFulfillmentMutation,
    useDeleteFulfillmentMutation,
    useCreateReturnMutation,
    useUpdateReturnMutation,
    useDeleteReturnMutation,
    useConfirmPaymentMutation
} = orderService
