import { useEffect, useMemo, useRef } from "react";
import { Modal } from "bootstrap";

export default function PlanActionModal({
  title,
  description,
  confirmText,
  cancelText,

  submitting,
  onConfirm,

  open,
  onClosed,
  afterClose,
}) {
  const modalRef = useRef(null);
  const modalInstanceRef = useRef(null);

  const onClosedRef = useRef(onClosed);
  const afterCloseRef = useRef(afterClose);

  useEffect(() => {
    onClosedRef.current = onClosed;
  }, [onClosed]);

  useEffect(() => {
    afterCloseRef.current = afterClose;
  }, [afterClose]);

  useEffect(() => {
    modalInstanceRef.current = new Modal(modalRef.current, {
      backdrop: "static",
      keyboard: false,
    });

    const modalHandler = () => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }

      onClosedRef.current?.(); // 通知父層已經關完
      afterCloseRef.current?.(); // 關完後執行外層指定動作(navigate)
    };
    modalRef.current.addEventListener("hidden.bs.modal", modalHandler);

    return () => {
      modalRef.current?.removeEventListener("hidden.bs.modal", modalHandler);
      modalInstanceRef.current.dispose();
      modalInstanceRef.current = null;
    };
  }, []);

  // modal 開關
  useEffect(() => {
    const modalInstance = modalInstanceRef.current;
    if (!modalInstance) return;

    open ? modalInstance.show() : modalInstance.hide();
  }, [open]);

  const closeModal = () => {
    modalInstanceRef.current.hide();
  };

  const handleConfirm = async () => {
    if (submitting) return;
    await onConfirm?.();
  };

  return (
    <>
      <div
        ref={modalRef}
        className="modal fade"
        tabIndex="-1"
        aria-labelledby="planActionModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header border-0">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {title}
              </h1>
              <button
                type="button"
                className="btn-close"
                onClick={closeModal}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body" style={{ whiteSpace: "pre-line" }}>
              {description}
            </div>
            <div className="modal-footer border-0">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={closeModal}
              >
                {cancelText}
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleConfirm}
              >
                {confirmText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
