import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {getTopSharedArticles, getTopViewedArcticles} from "../API/api";

const initialState = {
  topViewedArticles: [],
  isFetching: false,
  topSharedArticles: [],
  // isRequestStatus: false
}

export const getTopViewedArticlesThunk = createAsyncThunk(
  'articles/getTopViewedArticles',
  async () => {
    const response = await getTopViewedArcticles();
    return response.data;
  }
)

export const getTopSharedArticlesThunk = createAsyncThunk(
  'articles/getTopSharedArticles',
  async () => {
    const response = await getTopSharedArticles()
    return response.data;
  }
)

const rootReducer = createSlice({
  name: 'rootReducer',
  initialState,
  reducers: {
    setTopNews(state, action) {
      state.topViewedArticles = action.payload
    },
    setTopSharedArticles(state, action) {
      state.topSharedArticles = action.payload
    },
    toggleIsFetchingTopNews(state, action) {
      state.isFetching = action.payload
    }
  },
  extraReducers: {
    // Top viewed articles reducers
    [getTopViewedArticlesThunk.fulfilled]: (state, action) => {
      if (state.isFetching) {
        state.topViewedArticles = action.payload
        state.isFetching = false
      }
    },
    [getTopViewedArticlesThunk.pending]: (state, action) => {
      if (!state.isFetching) {
        state.isFetching = true
      }
    },
    [getTopViewedArticlesThunk.rejected]: (state, action) => {
      if (state.isFetching) {
        state.isFetching = true
      }
    },

    // Top viewed articles reducers
    [getTopSharedArticlesThunk.fulfilled]: (state, action) => {
      if (state.isFetching) {
        state.topSharedArticles = action.payload
        state.isFetching = false
      }
    },
    [getTopSharedArticlesThunk.pending]: (state, action) => {
      if (!state.isFetching) {
        state.isFetching = true
      }
    },
    [getTopSharedArticlesThunk.rejected]: (state, action) => {
      if (state.isFetching) {
        state.isFetching = true
      }
    },
  }
})

export default rootReducer.reducer;
export const { setTopNews,setTopSharedArticles,  toggleIsFetchingTopNews } = rootReducer.actions
