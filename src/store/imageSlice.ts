// // store/imageSlice.ts
// import { IImage } from '@/types';
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface ImageState {
//   images: IImage[];
//   currentIndex: number;
// }

// const initialState: ImageState = {
//   images: [],
//   currentIndex: 0,
// };

// export const imageSlice = createSlice({
//   name: 'images',
//   initialState,
//   reducers: {
//     setImages: (state, action: PayloadAction<IImage[]>) => {
//       state.images = action.payload;
//     },
//     nextImage: (state, action: PayloadAction<IImage>) => {
//       // if (state.currentIndex < state.images.length - 1) {
//       //   state.currentIndex++;
//       // } else {
//         state.images.push(action.payload);
//         state.currentIndex = state.images.length - 1;
//       // }
//     },
//     prevImage: (state) => {
//       if (state.currentIndex > 0) {
//         state.currentIndex--;
//       }
//     },
//   },
// });

// export const { setImages, nextImage, prevImage } = imageSlice.actions;
// export default imageSlice.reducer;
