import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
  email:'',
   otp:''
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setEmail:(state, action)=>{
        state.email = action.payload;
    },
    setOtp:(state,action)=>{
        state.otp=action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setEmail, setOtp } = counterSlice.actions

export default counterSlice.reducer