import { forwardRef, useImperativeHandle, useRef, useState, useEffect } from "react";
import { Modal } from "bootstrap";
import { createCard, updateCard } from "@/services/cardService";
import { showSwalToast } from "@/utils/swalSetting";

export default forwardRef(function CardModal(
  { editCard, cardBox, modalId = "cardModal", onSuccess },
  ref
) {
  const modalRef = useRef(null);
  const [card, setCard] = useState({ title: "", content: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // 暴露方法給父元件使用
  useImperativeHandle(ref, () => ({
    show: () => {
      if (modalRef.current) {
        Modal.getOrCreateInstance(modalRef.current).show();
      }
    },
  }));

  useEffect(() => {
    if (editCard) {
      setCard(editCard);
      setIsEditMode(true);
    }
    return () => {
      setCard({ title: "", content: "" });
      setIsEditMode(false);
    };
  }, [editCard]);

  const handleCardSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const cardContent = {
      title: card.title.trim(),
      content: card.content,
      tags: [`${cardBox.title}`],
    };

    try {
      if (isEditMode) {
        await updateCard(cardContent, card.id);
      } else {
        await createCard(cardContent, cardBox.id);
      }
      showSwalToast({ title: `${isEditMode ? "編輯" : "新增"}成功` });
      if (modalRef.current) {
        Modal.getOrCreateInstance(modalRef.current).hide();
      }
      onSuccess?.();
    } catch (error) {
      const errorMsg = `${error.response.status} ${error.response.statusText}`;
      showSwalToast({
        title: `${isEditMode ? "編輯" : "新增"}失敗，${errorMsg}`,
        variant: "error",
      });
    } finally {
      setIsLoading(false);
      setCard({ title: "", content: "" });
    }
  };

  return (
    <div
      ref={modalRef}
      className="modal-reset modal fade"
      id={modalId}
      tabIndex="-1"
      aria-labelledby={`${modalId}Label`}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title fs-2xl" id={`${modalId}Label`}>
              {isEditMode ? "編輯卡片" : "新增卡片"}
            </h2>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <form onSubmit={handleCardSubmit}>
            <div className="modal-body">
              <div className="container-fluid">
                <p className="mb-4 d-flex align-items-center">
                  所屬卡片盒
                  <span
                    className={`badge badge-${
                      cardBox.color ?? "secondary"
                    } lh-base ms-2`}
                  >
                    {cardBox.title}
                  </span>
                </p>
                <div className="row gx-3 mb-4 d-flex align-items-center">
                  <label
                    htmlFor="cardTitle"
                    className="col-auto form-label fs-m mb-0"
                  >
                    卡片標題
                  </label>
                  <div className="col form-control-container">
                    <input
                      id="cardTitle"
                      className="form-control"
                      type="text"
                      placeholder="請輸入卡片標題"
                      value={card.title}
                      onChange={(e) =>
                        setCard((prev) => ({ ...prev, title: e.target.value }))
                      }
                      required
                    />
                    <a
                      href="#"
                      className="input-clearup"
                      onClick={(e) => {
                        e.preventDefault();
                        setCard((prev) => ({ ...prev, title: "" }));
                      }}
                    >
                      <span className="material-symbols-outlined">close</span>
                    </a>
                  </div>
                </div>
                <div className="">
                    <textarea
                      id="cardContent"
                      className="form-control"
                      placeholder="請輸入卡片內容"
                      rows={10}
                      style={{ minHeight: 200, resize: "none" }}
                      value={card.content}
                      onChange={(e) =>
                        setCard((prev) => ({
                          ...prev,
                          content: e.target.value,
                        }))
                      }
                    />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-primary"
                data-bs-dismiss="modal"
                disabled={isLoading}
              >
                取消
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isLoading}
              >
                {isLoading && (
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  />
                )}
                {isEditMode ? "完成編輯" : "新增卡片"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
});
