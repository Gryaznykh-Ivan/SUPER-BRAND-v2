import { api } from "../store/api";

export const testService = api.injectEndpoints({
    endpoints: builder => ({
        test: builder.query<any,any>({
            query: () => `api/revalidate`
        })
    })
})

export const {
    useTestQuery
} = testService