import { createSlice } from "@reduxjs/toolkit";
import { IModalState } from "../types/interfaces";

const initialState: IModalState = {
  modalEditIsOpen: false,
  modalDeleteIsOpen: false,
};


// slice
const modalSlice = createSlice({
  name: "modal",
  initialState: initialState,
  reducers: {
    openModalEdit: (state) => {
      state.modalEditIsOpen = true;
    },
    closeModalEdit: (state) => {
      state.modalEditIsOpen = false;
    },
    openModalDelete: (state) => {
      state.modalDeleteIsOpen = true;
    },
    closeModalDelete: (state) => {
      state.modalDeleteIsOpen = false;
    },
  },
});

const { actions, reducer } = modalSlice;

export const {
  openModalEdit,
  closeModalEdit,
  openModalDelete,
  closeModalDelete,
} = actions;

export default reducer;
