import { createSlice } from "@reduxjs/toolkit";
import { getBanners, createBanner } from "./bannerThunk";

const bannerSlice = createSlice({
    name: "banner",
    initialState: {
        loading: false,
        error: null,
        banners: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBanners.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getBanners.fulfilled, (state, action) => {
                state.loading = false;
                state.banners = action.payload;
            })
            .addCase(getBanners.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to load banners";
            })

            .addCase(createBanner.pending, (state) => {
                state.loading = true;
            })
            .addCase(createBanner.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload) {
                    state.banners.push(action.payload);
                }
            })
            .addCase(createBanner.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to create banner";
            });
    },
});

export default bannerSlice.reducer;
