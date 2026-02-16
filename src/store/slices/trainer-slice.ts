import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TrainerCapturedState {
  trainerIds: number[];
}

const initialState: TrainerCapturedState = {
  trainerIds: [],
};

const trainerSlice = createSlice({
  name: "trainer",
  initialState,
  reducers: {
    // Pas besoin de return dans les reducers (On peut faire des "mutations" grâce à 'immer')
    addCapturedPokemon: (state, action: PayloadAction<number>) => {
      state.trainerIds.push(action.payload);
    },
    removeCapturedPokemon: (state, action: PayloadAction<number>) => {
      state.trainerIds = state.trainerIds.filter((id) => id !== action.payload);
    },
  },
});

export const { addCapturedPokemon, removeCapturedPokemon } =
  trainerSlice.actions;
export default trainerSlice.reducer;
