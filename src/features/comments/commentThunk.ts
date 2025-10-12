import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CommentData } from "./commentModel";

const API_URI = import.meta.env.VITE_SUPABASE_URL;

// Fetch comments for a customer
export const getComments = createAsyncThunk<
  { items: CommentData[]; offset: number; hasMore: boolean },
  number, // customer_id
  { rejectValue: string }
>("comments/getComments", async (customer_id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URI}/comments?customer_id=${customer_id}`);

    console.log(response);

    return {
      items: response.data || [],
      offset: response.data.offset ?? 0,
      hasMore: response.data.hasMore ?? false,
    };
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.error || error.message || "Failed to fetch comments");
  }
});

// Add a comment
export const addComment = createAsyncThunk<
  CommentData,
  CommentData,
  { rejectValue: string }
>("comments/addComment", async (comment, { rejectWithValue, dispatch }) => {
  try {
    const response = await axios.post(`${API_URI}/get_comments/`, comment);
    dispatch(getComments(comment.customer_id));
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.error || error.message || "Failed to add comment");
  }
});

// Fetch more comments for infinite scroll
export const getMoreComments = createAsyncThunk<
  { items: CommentData[]; offset: number; hasMore: boolean },
  { customer_id: number; offset: number },
  { rejectValue: string }
>("comments/getMoreComments", async ({ customer_id }, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URI}/comments?customer_id=${customer_id}`);
    return {
      items: response.data.items || [],
      offset: response.data.offset ?? 0,
      hasMore: response.data.hasMore ?? false,
    };
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.error || error.message || "Failed to fetch more comments");
  }
});