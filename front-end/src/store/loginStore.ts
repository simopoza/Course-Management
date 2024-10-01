import { create } from 'zustand';

interface LoginState {
  email: string;
  password: string;
  errorMessage: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setErrorMessage: (message: string) => void;
}

const useLoginStore = create<LoginState>((set) => ({
  email: '',
  password: '',
  errorMessage: '',
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setErrorMessage: (message) => set({ errorMessage: message }),
}));

export default useLoginStore;
