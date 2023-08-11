import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DesignerState {
  defaultCreateLayoutItem: { i: string; w: number; h: number };
}

const designerSlice = createSlice({
  name: 'designer',
  initialState: {
    defaultCreateLayoutItem: {
      i: 'dragElement',
      w: 2,
      h: 1,
    },
  } as DesignerState,
  reducers: {
    updateDefaultLayoutItem(state, action: PayloadAction<Omit<DesignerState['defaultCreateLayoutItem'], 'i'>>) {
      // eslint-disable-next-line no-param-reassign
      state.defaultCreateLayoutItem = {
        ...action.payload,
        i: 'dragElement',
      };
    },
  },
});

export const designerActions = designerSlice.actions;

export default designerSlice.reducer;
