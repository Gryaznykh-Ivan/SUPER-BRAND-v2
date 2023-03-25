import { api } from "../store/api";
import { ProductGetBySearchRequest, ProductGetBySearchResponse, SettingGetByIdRequest, SettingGetByIdResponse, SettingUpdateRequest, SettingUpdateResponse } from "../types/api";

export const settingsService = api.injectEndpoints({
    endpoints: builder => ({
        getSettingsById: builder.query<SettingGetByIdResponse, SettingGetByIdRequest>({
            query: ({ settingId }) => ({
                url: "settings/" + settingId,
                method: "GET"
            }),
            providesTags: ["SETTINGS"]
        }),
        updateSettings: builder.mutation<SettingUpdateResponse, SettingUpdateRequest>({
            query: ({ settingId, ...credentials }) => ({
                url: "settings/" + settingId,
                method: "PUT",
                body: credentials
            }),
            invalidatesTags: ["SETTINGS"]
        }),
    })
})

export const {
    useGetSettingsByIdQuery,
    useUpdateSettingsMutation
} = settingsService

