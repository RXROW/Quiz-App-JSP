// @ts-ignore
// @ts-nocheck
import { Modal, ModalBody } from "flowbite-react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { ReactNode } from "react";

// interface AddUpdateModalProps {
//   children: ReactNode;
//   closeModal: () => void;
//   openModal: boolean;
//   header: string;
//   onsubmit: (event: FormEvent<HTMLButtonElement>) => void;
// }

interface AddUpdateModalProps {
  children: ReactNode;
  closeModal: () => void;
  openModal: boolean;
  header: string;
  onSubmit: () => void; 
}

export default function AddUpdateModal({
  children,
  closeModal,
  openModal,
  header,
  onSubmit,
}: AddUpdateModalProps) {
  return (
    <>
      <Modal show={openModal} size="5xl" popup className="max-w-[70rem] w-full mx-auto ">
        <div className="ModalHeader border-custom-black flex items-center justify-between border-b-2">
          <h2 className="pl-6 text-xl font-bold">{header}</h2>
          <div className="action flex cursor-pointer">
            <button
              type="submit"
              // onClick={onSubmit}
                          onClick={() => document.getElementById("modal-form")?.requestSubmit()}

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
