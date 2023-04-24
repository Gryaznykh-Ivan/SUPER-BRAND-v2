import { api } from "../store/api";
import { SettingSearchRequest, SettingSearchResponse, SettingUpdateRequest, SettingUpdateResponse } from "../types/api";

export const settingService = api.injectEndpoints({
    endpoints: builder => ({
        getSettingsBySearch: builder.query<SettingSearchResponse, SettingSearchRequest>({
            query: (credentials) => ({
                url: "admin/settings/search",
                method: "GET",
                params: credentials
            }),
            providesTags: ["SETTING"]
        }),
        updateSetting: builder.mutation<SettingUpdateResponse, SettingUpdateRequest>({
            query: (credentials) => ({
                url: "admin/settings/update",
                method: "PUT",
                body: credentials
            }),
            invalidatesTags: ["SETTING"]
        })
    })
})

export const {
    useGetSettingsBySearchQuery,
    useUpdateSettingMutation
} = settingService
