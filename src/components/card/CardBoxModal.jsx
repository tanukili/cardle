import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "bootstrap";
import { createCardBox, updateCardBox } from "@/services/cardBoxService";
import { showSwalToast } from "@/utils/swalSetting";
import { uploadImage } from "@/utils/uploadImage";

const maxFileMB = 2 * 1024 * 1024; // 2MB

const defaultCardBox = {
  title: "",
  description: "",
  cover_url: "",
  type: "normal",
  is_inbox: false,
  is_archived: false,
  is_favorite: false,
  ui: { color: "secondary" },
};

export default function CardBoxModal({ cardBox, isCreateMode = true, modalId = "cardBoxModal", onSuccess }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
    setValue,
    watch,
    control,
    reset,
  } = useForm({
    defaultValues: cardBox ?? defaultCardBox,
    mode: "onTouched",
  });

  const [imgBlobUrl, setImgBlobUrl] = useState(cardBox?.cover_url);
  const [isLoading, setIsLoading] = useState(false);
  const modalAction = isCreateMode ? "新增" : "更新";

  const rules = {
    title: {
      required: "名稱為必填",
      maxLength: { value: 20, message: "名稱最多 20 個字" },
    },
    cover_url: {
      validate: (value) => {
        if (!value) return true;
        try {
          new URL(value);
          return true;
        } catch {
          return "請輸入有效的圖片網址";
        }
      },
    },
  };

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name === "cover_url") {
        setImgBlobUrl(value[name]);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, cardBox, isCreateMode]);

  const [isImgUploading, setIsImgUploading] = useState(false);

  const handleCoverImageChange = async (e) => {
    setIsImgUploading(true);
    let blobUrl = null;
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > maxFileMB) {
      showSwalToast({ title: "圖片大小不可超過 2MB", variant: "error" });
      return;
    }

    try {
      blobUrl = URL.createObjectURL(file);
      setImgBlobUrl(blobUrl);

      const url = await uploadImage(file, "covers");
      setValue("cover_url", url);
      showSwalToast({ title: "圖片上傳成功" });
    } catch (error) {
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
        setValue("cover_url", "");
      }
      showSwalToast({ title: "圖片上傳失敗", variant: "error" });
      console.error("Error - Cloudinary Upload :", error);
    } finally {
      if (blobUrl) URL.revokeObjectURL(blobUrl);
      setIsImgUploading(false);
    }
  };

  const handleCardBoxSubmit = async (formData) => {
    if (isLoading) return;
    setIsLoading(true);

    const newCardBox = {
      ...(cardBox ?? defaultCardBox),
      title: formData.title,
      cover_url: formData.cover_url,
      is_favorite: formData.is_favorite,
    };

    try {
      // 新增或更新卡片盒
      if (isCreateMode) {
        await createCardBox(newCardBox);
      } else {
        await updateCardBox(cardBox.id, newCardBox);
      }

      showSwalToast({ title: `${modalAction}成功` });
      onSuccess?.();
      closeModal();
    } catch (error) {
      const errorMsg = `${error.response.status} ${error.response.statusText}`;
      showSwalToast({
        title: `${modalAction}失敗，${errorMsg}`,
        variant: "error",
      });
      console.error("Error - Card Box :", error);
    } finally {
      setIsLoading(false);
    }
  };

  const cardBoxModalRef = useRef(null);

  const closeModal = () => {
    if (cardBoxModalRef.current) {
      Modal.getOrCreateInstance(cardBoxModalRef.current).hide();
    }
  };

  useEffect(() => {
    const el = cardBoxModalRef.current;
    if (!el) return;

    const onHidden = () => reset(defaultCardBox);
    el.addEventListener("hidden.bs.modal", onHidden);

    return () => el.removeEventListener("hidden.bs.modal", onHidden);
  }, [reset]);

  return (
    <div
      className="modal-reset modal fade"
      id={modalId}
      tabIndex="-1"
      aria-labelledby={`${modalId}Label`}
      aria-hidden="true"
      ref={cardBoxModalRef}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title fs-xl">{isCreateMode ? "新增卡片盒" : "編輯卡片盒"}</h2>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </div>
          <form onSubmit={handleSubmit(handleCardBoxSubmit)}>
            <div className="modal-body">
              <div className="container-fluid">
                <div className="mb-5">
                  <label htmlFor="cardBoxTitle" className="form-label d-flex text-nowrap">
                    卡片盒名稱
                    {errors.title && (
                      <span className="invalid-feedback fs-s d-block ms-2 mt-auto">{errors.title.message}</span>
                    )}
                  </label>
                  <div className="form-control-container">
                    <input
                      id="cardBoxTitle"
                      className="form-control"
                      type="text"
                      placeholder="請輸入卡片盒名稱"
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
                      <span className="material-symbols-outlined">{isCreateMode ? "close" : "undo"}</span>
                    </a>
                  </div>
                </div>
                <div className="row gx-2">
                  <label htmlFor="cardBoxCoverUrl" className="col-12 form-label d-flex text-nowrap">
                    封面圖片
                    {errors.cover_url && (
                      <span className="invalid-feedback fs-s d-block ms-2 mt-auto">{errors.cover_url.message}</span>
                    )}
                  </label>
                  <div className="col-6">
                    <div
                      className="bg-gray-100 flex-shrink-0 rounded overflow-hidden d-flex align-items-center justify-content-center"
                      style={{ height: 120 }}
                    >
                      {imgBlobUrl ? (
                        <img src={imgBlobUrl} alt="封面預覽" className="w-100 h-100 object-fit-cover" />
                      ) : (
                        <span className="material-symbols-outlined text-gray-400 fs-1">image</span>
                      )}
                    </div>
                  </div>
                  <div className="col-6 d-flex">
                    <label htmlFor={`inputCardBoxCover-${modalId}`} className="btn btn-outline-primary mt-auto">
                      {isImgUploading ? "上傳中" : "上傳圖片"}
                      {isImgUploading && (
                        <span className="spinner-border spinner-border-sm ms-1" role="status" aria-hidden="true" />
                      )}
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      className="d-none"
                      id={`inputCardBoxCover-${modalId}`}
                      onChange={handleCoverImageChange}
                    />
                  </div>
                  <div className="form-control-container mt-3">
                    <input
                      id="cardBoxCoverUrl"
                      className="form-control"
                      type="text"
                      placeholder="請輸入封面圖片網址"
                      {...register("cover_url", rules.cover_url)}
                    />
                    <a
                      href="#"
                      className="input-clearup"
                      onClick={(e) => {
                        e.preventDefault();
                        resetField("cover_url");
                        setImgBlobUrl("");
                      }}
                    >
                      <span className="material-symbols-outlined">{isCreateMode ? "close" : "undo"}</span>
                    </a>
                  </div>
                </div>
                <div className="mt-6 d-flex justify-content-end">
                  <div className="form-check">
                    <input
                      id="cardBoxIsFavorite"
                      className="form-check-input"
                      type="checkbox"
                      {...register("is_favorite")}
                    />
                    <label className="form-check-label" htmlFor="cardBoxIsFavorite">
                      加入最愛
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-primary"
                data-bs-dismiss="modal"
                onClick={closeModal}
                disabled={isLoading}
              >
                關閉
              </button>
              <button type="submit" className="btn btn-primary" disabled={isLoading}>
                {isLoading && (
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                )}
                {modalAction}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
