import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 定义state类型 // FIXME: 请根据实际业务修改state名称
export interface ExampleState {
  text: string;
}

// FIXME: 请根据实际业务修改slice名称
const exampleSlice = createSlice({
  name: 'example', // FIXME: 请根据实际业务修改名称
  initialState: {
    text: 'example',
  } as ExampleState,
  reducers: {
    update(state, action: PayloadAction<ExampleState>) {
      // eslint-disable-next-line no-console
      console.log(state, action);
    },
  },
});

// FIXME: 请根据实际业务修改actions名称
export const exampleActions = exampleSlice.actions;

export default exampleSlice.reducer;
