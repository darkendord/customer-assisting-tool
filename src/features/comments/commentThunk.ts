import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CommentData } from "./commentModel";

const API_URI = import.meta.env.VITE_CTM_BASE_API;

// Fetch comments for a customer
export const getComments = createAsyncThunk<
    { items: CommentData[]; offset: number; hasMore: boolean },
    number, // customer_id
    { rejectValue: string }
>("comments/getComments", async (customer_id, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${API_URI}/get_comments?limit=100`, { params: { customer_id } });
        return {
            items: response.data.items,
            offset: response.data.offset,
            hasMore: response.data.hasMore,
        };
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.error || error.message || "Failed to fetch comments");
    }
});

// Add a comment
export const addComment = createAsyncThunk<
    CommentData,
    CommentData, // Now expects type in the payload
    { rejectValue: string }
>("comments/addComment", async (comment, { rejectWithValue, dispatch }) => {
    try {
        console.log("Adding comment:", comment);
        
        const response = await axios.post(`${API_URI}/get_comments/`, comment);
        console.log("Comment added successfully:", response);
        dispatch(getComments(comment.customer_id));
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.error || error.message || "Failed to add comment");
    }
});

export const getMoreComments = createAsyncThunk<
  { items: CommentData[]; offset: number; hasMore: boolean },
  { customer_id: number; offset: number },
  { rejectValue: string }
>("comments/getMoreComments", async ({ customer_id, offset }, { rejectWithValue }) => {
  try {
    const limit = 25;
    const response = await axios.get(`${API_URI}/get_comments`, {
      params: { customer_id, limit, offset },
    });
    return {
      items: response.data.items,
      offset: response.data.offset + response.data.count,
      hasMore: response.data.hasMore,
    };
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.error || error.message || "Failed to fetch more comments");
  }
});