import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Toast {
  open: boolean;
  message: string;
  severity: 'info' | 'error' | 'success' | 'warning';
}
interface LayoutState {
  openDrawer: boolean;
  newNotify: number;
  toast: Toast;
}

const initialState: LayoutState = {
  openDrawer: false,
  newNotify: 0,
  toast: {
    open: false, message: '', severity: 'success'
  }
};

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setOpenDrawer: (state, data: PayloadAction<boolean>) => {
      const { payload } = data;
      state.openDrawer = payload;
    },
    setToast: (state, data: PayloadAction<Toast>) => {
      state.toast = { ...state.toast, ...data.payload}
    }
  },
});

export const { setOpenDrawer, setToast } = layoutSlice.actions;
export default layoutSlice.reducer;