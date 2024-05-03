import { useRef, useCallback, MouseEventHandler, ReactElement } from "react";

export const useWithDialog = ({
  children,
  onClose,
  className,
}: {
  onClose: () => void;
  children: ReactElement;
  className: string;
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const onClickWithoutModal: MouseEventHandler = useCallback((e) => {
    if (e.target === dialogRef.current) {
      dialogRef.current?.close();
    }
  }, []);
  const dialogElement = (
    <dialog
      onClose={onClose}
      onClick={onClickWithoutModal}
      ref={dialogRef}
      className={className}
    >
      {children}
    </dialog>
  );
  const open = useCallback(() => {
    dialogRef.current?.showModal();
  }, []);
  return { dialogElement, open };
};
