import { api } from "../store/api";
import { BotCompleteRequest, BotCompleteResponse, BotGetByIdRequest, BotGetByIdResponse, BotStartRequest, BotStartResponse } from "../types/api";

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
            query: () => ({
                url: "parser/start",
                method: "POST"
            }),
            invalidatesTags: ["BOT"]
        }),
        botComplete: builder.mutation<BotCompleteResponse, BotCompleteRequest>({
            query: (credentials) => ({
                url: "parser/complete",
                method: "POST",
                body: credentials
            }),
            invalidatesTags: ["BOT"]
        }),
    })
})

export const {
    useGetBotByIdQuery,
    useBotStartMutation,
    useBotCompleteMutation
} = botService

