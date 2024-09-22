import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LayoutState {
  openDrawer: boolean;
  newNotify: number
}

const initialState: LayoutState = {
  openDrawer: false,
  newNotify: 0,
};

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setOpenDrawer: (state, data: PayloadAction<boolean>) => {
      const { payload } = data;
      state.openDrawer = payload;
    },
  },
});

export const { setOpenDrawer } = layoutSlice.actions;
export default layoutSlice.reducer;