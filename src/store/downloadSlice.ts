import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DownloadState {
  progress: Record<string, number>;
  status: Record<
    string,
    'downloading' | 'completed' | 'failed' | 'deleted'
  >;
}

const initialState: DownloadState = {
  progress: {},
  status: {},
};

const downloadSlice = createSlice({
  name: 'download',
  initialState,
  reducers: {
    updateProgress: (
      state,
      action: PayloadAction<{ id: string; progress: number }>,
    ) => {
      state.progress[action.payload.id] = action.payload.progress;
    },
    updateStatus: (
      state,
      action: PayloadAction<{
        id: string;
        status: DownloadState['status'][string];
      }>,
    ) => {
      state.status[action.payload.id] = action.payload.status;
    },
  },
});

export const { updateProgress, updateStatus } = downloadSlice.actions;
export default downloadSlice.reducer;
