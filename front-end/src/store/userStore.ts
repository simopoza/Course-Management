import { create } from 'zustand';

type UserStoreState = {
  email: string;
  fullName: string;
  password: string;
  errorMessage: string;
  setEmail: (email: string) => void;
  setFullName: (fullName: string) => void;
  setPassword: (password: string) => void;
  setErrorMessage: (errorMessage: string) => void;
};

const useUserStore = create<UserStoreState>((set) => ({
  email: '',
  fullName: '',
  password: '',
  errorMessage: '',
  setEmail: (email) => set((state) => ({ ...state, email })),
  setFullName: (fullName) => set((state) => ({ ...state, fullName })),
  setPassword: (password) => set((state) => ({ ...state, password })),
  setErrorMessage: (errorMessage) => set((state) => ({ ...state, errorMessage })),
}));

export default useUserStore;
