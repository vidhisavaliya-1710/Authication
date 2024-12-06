import { configureStore } from '@reduxjs/toolkit'
import AuthSlice from './Components/Slice/AuthSlice'

export const store = configureStore({
  reducer: {
    counter:AuthSlice
  },
})