import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CommentData } from "./commentModel";

const API_URI = import.meta.env.VITE_SUPABASE_URL
// ======================
// Fetch comments
// ======================
export const getComments = createAsyncThunk<
  CommentData[],
  number, // customer_id
  { rejectValue: string }
>("comments/getComments", async (customer_id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URI}/comments`, {
      params: { customer_id },
    });

    return response.data || [];
  } catch (error: any) {
    console.error("getComments error:", error.response?.data || error.message);
    return rejectWithValue(
      error.response?.data?.error || error.message || "Failed to fetch comments"
    );
  }
});

// ======================
// Add a comment
// ======================
export const addComment = createAsyncThunk<
  CommentData,
  CommentData,
  { rejectValue: string }
>("comments/addComment", async (comment, { rejectWithValue, dispatch }) => {
  try {
    const response = await axios.post(`${API_URI}/comments`, comment);

    const addedComment = response.data;

    // ✅ Immediately add the new comment to Redux state instead of waiting for refetch
    dispatch({
      type: "comments/addLocalComment",
      payload: addedComment,
    });

    // ✅ Optionally refetch in the background (not blocking UI)
    dispatch(getComments(comment.customer_id));

    return addedComment;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.error || error.message || "Failed to add comment"
    );
  }
});


// ======================
// Fetch more comments (pagination / infinite scroll)
// ======================
export const getMoreComments = createAsyncThunk<
  CommentData[],
  { customer_id: number; offset: number },
  { rejectValue: string }
>("comments/getMoreComments", async ({ customer_id, offset }, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URI}/comments`, {
      params: { customer_id, offset },
    });

    return response.data || [];
  } catch (error: any) {
    console.error("getMoreComments error:", error.response?.data || error.message);
    return rejectWithValue(
      error.response?.data?.error || error.message || "Failed to fetch more comments"
    );
  }
});
