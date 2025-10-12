import { createSlice } from "@reduxjs/toolkit";
import { CommentData } from "./commentModel";
import { getComments, addComment, getMoreComments } from "./commentThunk";

interface CommentsState {
    data: CommentData[];
    offset: number;
    hasMore: boolean;
    isLoading: boolean;
    isLoadingMore: boolean;
    error: string | null;
}
const initialState: CommentsState = {
    data: [],
    offset: 0,
    hasMore: true,
    isLoading: false,
    isLoadingMore: false,
    error: null,
};


const commentSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        resetError(state) {
            state.error = null;
        },
        clearCommentsData(state) {
            state.data = [];
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getComments.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getComments.fulfilled, (state, action) => {
                state.isLoading = false;
      state.data = action.payload.items;
      state.offset = action.payload.offset;
      state.hasMore = action.payload.hasMore;
            })
            .addCase(getComments.rejected, (state, action) => {
                state.isLoading = false;
      state.error = action.payload as string;
            })
            .addCase(addComment.fulfilled, (state, action) => {
                state.data.push(action.payload);
            })
             .addCase(getMoreComments.pending, (state) => {
      state.isLoadingMore = true;
    })
    .addCase(getMoreComments.fulfilled, (state, action) => {
      state.isLoadingMore = false;
      state.data = [...state.data, ...action.payload.items];
      state.offset = action.payload.offset;
      state.hasMore = action.payload.hasMore;
    })
    .addCase(getMoreComments.rejected, (state, action) => {
      state.isLoadingMore = false;
      state.error = action.payload as string;
    });
    },
});
export const { resetError, clearCommentsData } = commentSlice.actions;

export default commentSlice.reducer;