import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTopViewedArcticles } from "../API/api";


const initialState = {
  topNews: [],
  // isRequestStatus: false
}

// export const getTopNewsThunk = createAsyncThunk(
//   'getTopNewsThunk',
//   async () => {
//     let response = await getTopViewedArcticles();
//     return console.log(response.data);
//   }
// )

const rootReducer = createSlice({
  name: 'rootReducer',
  initialState,
  reducers: {
    getTopNews(state, action) {
      state.topNews = action.payload
    }
  }
})

export default rootReducer.reducer;
export const { getTopNews } = rootReducer.actions


export const getTopNewsThunk = () => async dispatch => {
  let response = await getTopViewedArcticles();
  try {
    console.log(response.data);
    dispatch(getTopNews(response.data))
  }
  catch {
    console.log('CRITICAL ERROR');
  }

}