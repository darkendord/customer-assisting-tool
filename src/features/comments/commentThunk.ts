import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CommentData } from "./commentModel";

const API_URI = import.meta.env.VITE_CTM_BASE_API;

// Fetch comments for a customer
export const getComments = createAsyncThunk<
    CommentData[],
    number, // customer_id
    { rejectValue: string }
>("comments/getComments", async (customer_id, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${API_URI}/get_comments/`, { params: { customer_id } });
        return response.data.items;
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
        const response = await axios.post(`${API_URI}/get_comments/`, comment);
        dispatch(getComments(comment.customer_id));
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.error || error.message || "Failed to add comment");
    }
});