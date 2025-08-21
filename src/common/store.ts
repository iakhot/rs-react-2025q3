import { setupListeners } from '@reduxjs/toolkit/query'
import { api } from './dataApi'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
})

setupListeners(store.dispatch)