import { configureStore, MiddlewareArray } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import logger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import themeStore from './theme.store';
import exampleStore from './designer.store';

export const store = configureStore({
  reducer: {
    theme: themeStore,
    designer: exampleStore,
  },
  middleware: new MiddlewareArray().concat(logger).concat(thunkMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
