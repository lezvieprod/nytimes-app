import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTopViewedArcticles } from "../API/api";


const initialState = {
  topNews: [],
  isFetchingTopNews: false,
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
    },
    toggleIsFetchingTopNews(state, action) {
      state.isFetchingTopNews = action.payload
    }
  }
})

export default rootReducer.reducer;
export const { getTopNews, toggleIsFetchingTopNews } = rootReducer.actions


export const getTopNewsThunk = () => async dispatch => {
  dispatch(toggleIsFetchingTopNews(true))
  try {
    let response = await getTopViewedArcticles();
    dispatch(getTopNews(response.data))
    dispatch(toggleIsFetchingTopNews(false))
  }
  catch(err) {
    console.error('LOG', err);
  }
}