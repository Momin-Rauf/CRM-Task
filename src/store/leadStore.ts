import { create } from 'zustand';

interface LeadStore {
  isModalOpen: boolean;
  selectedLeadId: number | null;
  showToast: boolean;
  toastMessage: string;
  setModalOpen: (isOpen: boolean) => void;
  setSelectedLeadId: (id: number | null) => void;
  showSuccessToast: (message: string) => void;
  showErrorToast: (message: string) => void;
  hideToast: () => void;
}

export const useLeadStore = create<LeadStore>((set) => ({
  isModalOpen: false,
  selectedLeadId: null,
  showToast: false,
  toastMessage: '',
  setModalOpen: (isOpen) => set({ isModalOpen: isOpen }),
  setSelectedLeadId: (id) => set({ selectedLeadId: id }),
  showSuccessToast: (message) => set({ showToast: true, toastMessage: message }),
  showErrorToast: (message) => set({ showToast: true, toastMessage: message }),
  hideToast: () => set({ showToast: false, toastMessage: '' }),
})); 