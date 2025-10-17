import {configureStore} from '@reduxjs/toolkit';
import BannerSlice from "./banner/bannerSlice";
import shopSlice from "./shop/shopSlice";

const store = configureStore({
    reducer: {
        banner: BannerSlice,
        shop: shopSlice,
    }
})
export default store;