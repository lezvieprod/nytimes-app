import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {getTopSharedArticles, getTopViewedArcticles} from "../API/api";
import {logDOM} from "@testing-library/react";

const initialState = {
  topViewedArticles: [],
  topSharedArticles: [],
  isFetching: false,
  isRequestFailed: false,
  requestFailedData: [],
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
    try {
      const response = await getTopSharedArticles()
      return response.data;
    } catch(err) {
      throw err
    }
  }
)

const rootReducer = createSlice({
  name: 'rootReducer',
  initialState,
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
        state.isFetching = false;
        state.isRequestFailed = true;
        state.requestFailedData = action.error;
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
        state.isFetching = false;
        state.isRequestFailed = true;
        state.requestFailedData = action.error;
      }
    },
  }
})

export default rootReducer.reducer;
export const { setTopNews,setTopSharedArticles,  toggleIsFetchingTopNews } = rootReducer.actions
