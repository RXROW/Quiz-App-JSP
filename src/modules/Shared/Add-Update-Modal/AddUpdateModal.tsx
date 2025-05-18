import { Modal, ModalBody } from "flowbite-react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { ReactNode, FormEvent } from "react";

interface AddUpdateModalProps {
  children: ReactNode;
  closeModal: () => void;
  openModal: boolean;
  header: string;
  onsubmit: (event: FormEvent<HTMLButtonElement>) => void;
}

export default function AddUpdateModal({
  children,
  closeModal,
  openModal,
  header,
  onsubmit,
}: AddUpdateModalProps) {
  return (
    <>
      <Modal show={openModal} size="xl" popup>
        <div className="ModalHeader border-custom-black flex items-center justify-between border-b-2">
          <h2 className="pl-6 text-xl font-bold">{header}</h2>
          <div className="action flex cursor-pointer">
            <button
              type="submit"
              onClick={onsubmit}
              className="border-var border-l-2 p-6 text-xl"
            >
              <FaCheck />
            </button>
            <span
              onClick={closeModal}
              className="border-custom-black border-l-2 p-6 text-xl"
            >
              <FaTimes />
            </span>
          </div>
        </div>
        <ModalBody>{children}</ModalBody>
      </Modal>
    </>
  );
}
