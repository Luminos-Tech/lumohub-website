"use client";
import { create } from "zustand";

type UiState = {
  eventModalOpen: boolean;
  setEventModalOpen: (value: boolean) => void;
};

export const useUiStore = create<UiState>((set) => ({
  eventModalOpen: false,
  setEventModalOpen: (eventModalOpen) => set({ eventModalOpen })
}));
