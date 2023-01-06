import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SessionState {
  accessToken?: string;
  isLoading: boolean;
}

const initialState: SessionState = {
  accessToken: undefined,
  isLoading: true,
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        accessToken: string;
      }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.isLoading = false;
      window.localStorage.setItem("accessToken", action.payload.accessToken);
    },
    logout: (state) => {
      state.accessToken = undefined;
      window.localStorage.removeItem("accessToken");
    },
    setSessionLoading: (
      state,
      action: PayloadAction<{
        isLoading: boolean;
      }>
    ) => {
      state.isLoading = action.payload.isLoading;
    },
  },
});

export const { login, logout, setSessionLoading } = sessionSlice.actions;

export default sessionSlice.reducer;
