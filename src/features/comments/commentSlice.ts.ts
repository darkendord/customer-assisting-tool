import { createSlice } from "@reduxjs/toolkit";
import { CommentData } from "./commentModel";
import { getComments, addComment } from "./commentThunk";

interface CommentsState {
    data: CommentData[];
    isLoading: boolean;
    error: string | null;
}

const initialState: CommentsState = {
    data: [],
    isLoading: false,
    error: null,
};

const commentSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getComments.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getComments.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getComments.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string || "Failed to fetch comments";
            })
            .addCase(addComment.fulfilled, (state, action) => {
                state.data.push(action.payload);
            });
    },
});

export default commentSlice.reducer;