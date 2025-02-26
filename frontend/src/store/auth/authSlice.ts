import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  status: string;
  user: Record<string, any>;
  errorMessage?: string;
}

const initialState: AuthState = {
  status: "checking",
  user: {},
  errorMessage: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onChecking: (state) => {
      state.status = "checking";
      state.user = {};
      state.errorMessage = undefined;
    },
    onLogin: (state, action: PayloadAction<any>) => {
      state.status = "authenticated";
      state.user = action.payload;
      state.errorMessage = undefined;
    },
    onLogout: (state, action: PayloadAction<string | undefined>) => {
        console.log("onLogout triggered", action.payload);
        state.status = "not-authenticated";
        state.user = {};
        state.errorMessage = action.payload || "Token no encontrado";
    },
  },
});

export const { onChecking, onLogin, onLogout } = authSlice.actions;
