import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SessionState {
  accessToken?: string;
  role?: "admin" | "student";
  isLoading: boolean;
}

const initialState: SessionState = {
  accessToken: undefined,
  role: undefined,
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
        role: "admin" | "student";
      }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.role = action.payload.role;
      state.isLoading = false;
      window.localStorage.setItem("accessToken", action.payload.accessToken);
      window.localStorage.setItem("role", action.payload.role);
    },
    logout: (state) => {
      state.accessToken = undefined;
      window.localStorage.removeItem("accessToken");
      window.localStorage.removeItem("role");
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
