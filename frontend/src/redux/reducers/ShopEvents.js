import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER_SHOP_EVENTS_URL_API } from "../../constants/data";
import toast from "react-hot-toast";

const initialState = {
  loading: false,
  events: [],
  error: "",
};

export const getShopAllEvents = createAsyncThunk(
  "shopEvents/getShopAllEvents",
  async () => {
    return axios
      .get(`${SERVER_SHOP_EVENTS_URL_API}/get-all-events`)
      .then((res) => res.data.events);
  }
);

export const deleteShopEvents = createAsyncThunk(
  "shopEvents/deleteShopEvents",
  async (id) => {
    return axios
      .delete(`${SERVER_SHOP_EVENTS_URL_API}/delete-shop-events/${id}`)
      .then((res) => res.data);
  }
);

export const getShopEvents = createAsyncThunk(
  "shopEvents/getShopEvents",
  async (id) => {
    return axios
      .get(`${SERVER_SHOP_EVENTS_URL_API}/get-shop-events/${id}`)
      .then((res) => res.data);
  }
);

const ShopEventsSlice = createSlice({
  name: "Shop Events",
  initialState,
  reducers: () => {},
  extraReducers: (builder) => {
    builder
      .addCase(getShopAllEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(getShopAllEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
        state.error = "";
      })
      .addCase(getShopAllEvents.rejected, (state, action) => {
        state.loading = false;
        state.events = [];
        toast.error("Failed to events!");
        state.error = action.error.message;
      })
      .addCase(deleteShopEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteShopEvents.fulfilled, (state) => {
        state.loading = false;
        toast.success("Event deleted successfully!");
      })
      .addCase(deleteShopEvents.rejected, (state) => {
        state.loading = false;
        state.events = [];
        toast.error("Failed to delete event!");
      })
      .addCase(getShopEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(getShopEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
        state.error = "";
      })
      .addCase(getShopEvents.rejected, (state, action) => {
        state.loading = false;
        state.events = [];
        toast.error("Failed to fetch events for shop!");
        state.error = action.error.message;
      });
  },
});

export default ShopEventsSlice.reducer;
