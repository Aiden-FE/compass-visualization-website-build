import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MaterialConfig } from '@/interfaces';

export interface DesignerState {
  defaultCreateLayoutItem: MaterialConfig<{ i: string }>;
}

const designerSlice = createSlice({
  name: 'designer',
  initialState: {} as DesignerState,
  reducers: {
    updateDefaultLayoutItem(state, action: PayloadAction<MaterialConfig>) {
      // eslint-disable-next-line no-param-reassign
      state.defaultCreateLayoutItem = {
        material: action.payload.material,
        layout: { ...action.payload.layout, i: 'dragElement' },
        getDefaultConfig: action.payload.getDefaultConfig,
      };
    },
  },
});

export const designerActions = designerSlice.actions;

export default designerSlice.reducer;
