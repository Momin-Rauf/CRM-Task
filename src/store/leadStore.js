import { create } from 'zustand';

export const useLeadStore = create((set) => ({
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