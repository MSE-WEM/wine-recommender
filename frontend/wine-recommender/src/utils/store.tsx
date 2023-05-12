import { configureStore } from '@reduxjs/toolkit';
import { NotificationReducer } from './reducers/notificationSlice';
import colorModeReducer from './reducers/colorModeSlice';

export default configureStore({
    reducer: {
        notification: NotificationReducer,
        colorMode: colorModeReducer
    },
})
