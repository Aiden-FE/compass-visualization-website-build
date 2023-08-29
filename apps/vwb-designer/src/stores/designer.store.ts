import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MaterialConfig } from '@/interfaces';

export interface DesignerState {
  defaultCreateLayoutItem: { i: string } & MaterialConfig;
}

const designerSlice = createSlice({
  name: 'designer',
  initialState: {} as DesignerState,
  reducers: {
    updateDefaultLayoutItem(state, action: PayloadAction<Omit<DesignerState['defaultCreateLayoutItem'], 'i'>>) {
      // eslint-disable-next-line no-param-reassign
      state.defaultCreateLayoutItem = {
        url: '',
        ...action.payload,
        i: 'dragElement',
      };
    },
  },
});

export const designerActions = designerSlice.actions;

export default designerSlice.reducer;
