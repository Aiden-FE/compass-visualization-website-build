import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThemeConfig } from 'antd';

export interface ThemeState {
  antdTheme: ThemeConfig;
  theme?: string;
  themeData?: Record<string, string | number> | null;
}

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    antdTheme: {
      token: {
        colorPrimary: '#00c0c9',
      },
    },
  } as ThemeState,
  reducers: {
    setTheme(state, action: PayloadAction<Pick<ThemeState, 'theme' | 'themeData'>>) {
      // eslint-disable-next-line no-param-reassign
      state.theme = action.payload.theme;
      // eslint-disable-next-line no-param-reassign
      state.themeData = action.payload.themeData;
      if (state.antdTheme?.token) {
        // eslint-disable-next-line no-param-reassign
        state.antdTheme.token.colorPrimary = (action.payload.themeData?.['--vwb-primary-color'] as string) || '#00c0c9';
      }
    },
  },
});

export const themeActions = themeSlice.actions;

export default themeSlice.reducer;
