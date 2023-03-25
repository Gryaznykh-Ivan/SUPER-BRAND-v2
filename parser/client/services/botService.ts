import { api } from "../store/api";
import { BotAddProductToParseRequest, BotAddProductToParseResponse, BotGetByIdRequest, BotGetByIdResponse, BotStartRequest, BotStartResponse } from "../types/api";

export const botService = api.injectEndpoints({
    endpoints: builder => ({
        getBotById: builder.query<BotGetByIdResponse, BotGetByIdRequest>({
            query: ({ botId }) => ({
                url: "parser/" + botId,
                method: "GET"
            }),
            providesTags: ["BOT"]
        }),
        botStart: builder.mutation<BotStartResponse, BotStartRequest>({
            query: (credentials) => ({
                url: "parser/start",
                method: "POST",
                params: credentials
            }),
            invalidatesTags: ["BOT"]
        }),
        botAddProductToParse: builder.mutation<BotAddProductToParseResponse, BotAddProductToParseRequest>({
            query: (credentials) => ({
                url: "parser/addProductToParse",
                method: "POST",
                body: credentials
            })
        }),
    })
})

export const {
    useGetBotByIdQuery,
    useBotStartMutation,
    useBotAddProductToParseMutation
} = botService

