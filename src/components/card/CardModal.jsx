import { forwardRef, useImperativeHandle, useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "bootstrap";
import { createCard, updateCard } from "@/services/cardService";
import { showSwalToast } from "@/utils/swalSetting";

const defaultCard = {
  title: "",
  content: "",
};

// forwardRef 提供父元件取得子元件的 ref
export default forwardRef(function CardModal({ editCard, cardBox, modalId = "cardModal", onSuccess }, ref) {
  const modalRef = useRef(null);
  const isEditMode = Boolean(editCard?.id);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    resetField,
    watch,
  } = useForm({
    mode: "onTouched",
  });

  // TO DO:表單元素封裝
  const rules = {
    title: {
      required: "標題為必填",
      maxLength: { value: 50, message: "標題最多 50 個字" },
    },
    content: {
      required: "內容為必填",
      maxLength: { value: 1000, message: "內容最多 1000 個字" },
    },
  };

  // 暴露方法給父元件
  useImperativeHandle(ref, () => ({
    show: () => {
      if (modalRef.current) {
        Modal.getOrCreateInstance(modalRef.current).show();
      }
    },
  }));

  useEffect(() => {
    if (isEditMode) {
      reset(editCard);
    } else {
      reset(defaultCard);
    }
  }, [watch, editCard]);

  useEffect(() => {
    const el = modalRef.current;
    if (!el) return;

    const onHidden = () => reset(defaultCard);
    el.addEventListener("hidden.bs.modal", onHidden);

    return () => el.removeEventListener("hidden.bs.modal", onHidden);
  }, [reset]);

  const handleCardSubmit = async (formData) => {
    if (isLoading) return;
    setIsLoading(true);
    const cardContent = {
      title: formData.title.trim(),
      content: formData.content.trim(),
      tags: [`${cardBox.title}`],
    };

    try {
      if (isEditMode) {
        await updateCard(cardContent, editCard.id);
      } else {
        await createCard(cardContent, cardBox.id);
      }
      showSwalToast({ title: `${isEditMode ? "編輯" : "新增"}成功` });
      if (modalRef.current) {
        Modal.getOrCreateInstance(modalRef.current).hide();
      }
      reset(defaultCard);
      onSuccess?.();
    } catch (error) {
      const errorMsg = `${error.response.status} ${error.response.statusText}`;
      showSwalToast({
        title: `${isEditMode ? "編輯" : "新增"}失敗，${errorMsg}`,
        variant: "error",
      });
    } finally {
      setIsLoading(false);
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
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </div>
          <form onSubmit={handleSubmit(handleCardSubmit)}>
            <div className="modal-body">
              <div className="container-fluid">
                <p className="mb-4 d-flex align-items-center">
                  所屬卡片盒
                  <span className={`badge badge-${cardBox.color ?? "secondary"} lh-base ms-2`}>{cardBox.title}</span>
                </p>
                <div className="row gx-3 mb-4 d-flex align-items-center">
                  <label htmlFor="cardTitle" className="form-label fs-m mb-2 d-flex text-nowrap">
                    卡片標題
                    {errors.title && (
                      <span className="invalid-feedback d-block ms-2 mt-auto">{errors.title.message}</span>
                    )}
                  </label>
                  <div className="form-control-container">
                    <input
                      id="cardTitle"
                      className="form-control"
                      type="text"
                      placeholder="請輸入卡片標題"
                      {...register("title", rules.title)}
                    />
                    <a
                      href="#"
                      className="input-clearup"
                      onClick={(e) => {
                        e.preventDefault();
                        resetField("title");
                      }}
                    >
                      <span className="material-symbols-outlined">{isEditMode ? "undo" : "close"}</span>
                    </a>
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="cardContent" className="form-label fs-m d-flex text-nowrap">
                    卡片內容
                    {errors.content && (
                      <span className="invalid-feedback d-block ms-2 mt-auto">{errors.content.message}</span>
                    )}
                  </label>
                  <div className="border rounded overflow-hidden">
                    <textarea
                      id="cardContent"
                      className="form-control"
                      placeholder="請輸入卡片內容"
                      rows={10}
                      style={{ minHeight: 200, resize: "none" }}
                      {...register("content", rules.content)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-primary" data-bs-dismiss="modal" disabled={isLoading}>
                取消
              </button>
              <button type="submit" className="btn btn-primary" disabled={isLoading}>
                {isLoading && (
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
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
