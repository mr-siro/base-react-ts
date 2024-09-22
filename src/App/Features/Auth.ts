import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DATE_FORMAT_1 } from "@src/Common/Constants";
import { LoginResponse } from "@src/Types/Auth";
import jscookie from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import dayjs from 'dayjs';

const initialState: LoginResponse = {
  accessToken: null,
  name: null,
  role: null,
  email: null,
  status: null,
  avatar: '',
};

interface TokenInfo {
  email: string;
  exp: number;
  iat: number;
  id: number;
  name: string;
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, data: PayloadAction<LoginResponse>) => {
      const payload = data.payload;
      state.accessToken = payload.access_token;
      state.name = payload.name;
      state.role = payload.role;
      state.status = payload.status;
      if (payload.access_token) {
        const decoded: TokenInfo = jwtDecode(`${payload.access_token}`);
        state.email = decoded.email;
        const dateNow = new Date().toJSON().slice(0, 10).replace(/-/g, '-');
        const dateDuration = dayjs.unix(decoded?.exp || 0).format(DATE_FORMAT_1);
        jscookie.set('token', payload.access_token as string, {
          expires: Math.floor((Date.parse(dateDuration) - Date.parse(dateNow)) / 86400000),
        });
      }
    },
    logout: (state) => {
      state = { ...initialState };
      jscookie.remove('token');
      return state;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;