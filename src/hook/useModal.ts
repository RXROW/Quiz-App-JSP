import { useState } from "react";

type ModalId = string | null;

interface UseModalReturn {
  isOpen: (modalId?: string) => boolean;
  openModal: (modalId?: string) => void;
  closeModal: () => void;
  toggleModal: (modalId?: string) => void;
  currentModal: ModalId;
}

const useModal = (initialModalId: ModalId = null): UseModalReturn => {
  const [openModalId, setOpenModalId] = useState<ModalId>(initialModalId);

  const isOpen = (modalId: string = "default"): boolean =>
    modalId === openModalId;

  const openModal = (modalId: string = "default"): void => {
    setOpenModalId(modalId);
  };

  const closeModal = (): void => {
    setOpenModalId(null);
  };

  const toggleModal = (modalId: string = "default"): void => {
    setOpenModalId((current) => (current === modalId ? null : modalId));
  };

  return {
    isOpen,
    openModal,
    closeModal,
    toggleModal,
    currentModal: openModalId,
  };
};

export default useModal;
