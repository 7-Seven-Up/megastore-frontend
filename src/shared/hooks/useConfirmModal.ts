import { create } from "zustand";

export type ConfirmModalProps = {
  description: string;
  onConfirm: () => Promise<void>;
  title: string;
  cancelLabel?: string;
  okLabel?: string;
};

type ConfirmModalStore = {
  description: string;
  isLoading: boolean;
  modalVisible: boolean;
  onConfirm: () => Promise<void>;
  title: string;
  hideConfirmModal: () => void;
  setIsLoading?: (value: boolean) => void;
  showConfirmModal: (props: ConfirmModalProps) => void;
  cancelLabel?: string;
  okLabel?: string;
};

const INITIAL_STATE = {
  description: "",
  isLoading: false,
  modalVisible: false,
  onConfirm: async () => {},
  title: "",
  cancelLabel: "Cancel",
  okLabel: "Delete",
};

export const useConfirmModal = create<ConfirmModalStore>((set) => ({
  ...INITIAL_STATE,
  showConfirmModal: (props) => {
    set({
      ...props,
      modalVisible: true,
      onConfirm: async () => {
        set({ isLoading: true });
        props
          .onConfirm()
          .then()
          .finally(() => {
            set({ isLoading: false, modalVisible: false });
          });
      },
    });
  },

  hideConfirmModal: () => {
    set({
      ...INITIAL_STATE,
    });
  },
}));
