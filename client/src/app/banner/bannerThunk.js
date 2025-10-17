import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createBanner = createAsyncThunk(
    "banner/createBanner",
    async (formData, { rejectWithValue, getState }) => {
        try {
            const shopDomain = getState().shop.shop;
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/ads/create`, formData, {
                headers: {
                    "x-shopify-shop-domain": shopDomain,
                },
            });
            return response.data;
        } catch (error) {
            console.error("createBanner error:", error);
            return rejectWithValue(error.response?.data?.message || "Server Error");
        }
    }
);

export const getBanners = createAsyncThunk(
    "banner/getBanners",
    async (_, { rejectWithValue, getState }) => {
        try {
            const shopDomain = getState().shop.shop;
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/ads`, {
                headers: {
                    "x-shopify-shop-domain": shopDomain,
                },
            });
            return response.data;
        } catch (error) {
            console.error("getBanners error:", error);
            return rejectWithValue(error.response?.data?.message || "Server Error");
        }
    }
);
