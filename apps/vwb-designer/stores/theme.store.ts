import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ThemeState {
  theme?: string;
  themeData?: Record<string, string | number> | null;
}

const themeSlice = createSlice({
  name: 'theme',
  initialState: {} as ThemeState,
  reducers: {
    setTheme(state, action: PayloadAction<ThemeState>) {
      // eslint-disable-next-line no-param-reassign
      state.theme = action.payload.theme;
      // eslint-disable-next-line no-param-reassign
      state.themeData = action.payload.themeData;
    },
  },
});

export const themeActions = themeSlice.actions;

export default themeSlice.reducer;
