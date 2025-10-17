import { createSlice } from "@reduxjs/toolkit";

const initialShop = localStorage.getItem("shop") || "";

const shopSlice = createSlice({
    name: "shop",
    initialState: {
        shop: initialShop,
    },
    reducers: {
        setShop: (state, action) => {
            state.shop = action.payload;
            localStorage.setItem("shop", action.payload);
        },
    },
});

export const { setShop } = shopSlice.actions;
export default shopSlice.reducer;
