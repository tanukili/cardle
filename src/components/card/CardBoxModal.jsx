import { useRef, useState, useEffect } from "react";
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

export default function CardBoxModal({
  cardBox,
  isCreateMode = true,
  modalId = "cardBoxModal",
  onSuccess,
}) {
  const [newCardBox, setNewCardBox] = useState(defaultCardBox);
  const [isLoading, setIsLoading] = useState(false);
  const modalAction = isCreateMode ? "新增" : "更新";

  useEffect(() => {
    if (isCreateMode) {
      setNewCardBox(defaultCardBox);
    } else {
      setNewCardBox(cardBox);
    }
  }, [cardBox, isCreateMode]);

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
      setNewCardBox((prev) => ({ ...prev, cover_url: blobUrl }));

      const url = await uploadImage(file, "covers");
      setNewCardBox((prev) => ({ ...prev, cover_url: url }));
      showSwalToast({ title: "圖片上傳成功" });
    } catch (error) {
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
        setNewCardBox((prev) => ({ ...prev, cover_url: "" }));
      }
      showSwalToast({ title: "圖片上傳失敗", variant: "error" });
      console.error("Error - Cloudinary Upload :", error);
    } finally {
      if (blobUrl) URL.revokeObjectURL(blobUrl);
      setIsImgUploading(false);
    }
  };

  const handleCardBoxSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
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
    setNewCardBox(defaultCardBox);
  };

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
            <h2 className="modal-title fs-xl">
              {isCreateMode ? "新增卡片盒" : "編輯卡片盒"}
            </h2>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <form onSubmit={handleCardBoxSubmit}>
            <div className="modal-body">
              <div className="container-fluid">
                <div className="mb-5">
                  <label htmlFor="cardBoxTitle" className="form-label">
                    卡片盒名稱
                  </label>
                  <div className="form-control-container">
                    <input
                      id="cardBoxTitle"
                      className="form-control"
                      type="text"
                      placeholder="請輸入卡片盒名稱"
                      value={newCardBox.title}
                      onChange={(e) =>
                        setNewCardBox((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      required
                    />
                    <a
                      href="#"
                      className="input-clearup"
                      onClick={(e) => {
                        e.preventDefault();
                        setNewCardBox((prev) => ({ ...prev, title: "" }));
                      }}
                    >
                      <span className="material-symbols-outlined">close</span>
                    </a>
                  </div>
                </div>
                <div className="row gx-2">
                  <label
                    htmlFor="cardBoxCoverUrl"
                    className="col-12 form-label"
                  >
                    封面圖片
                  </label>
                  <div className="col-6">
                    <div
                      className="bg-gray-100 flex-shrink-0 rounded overflow-hidden d-flex align-items-center justify-content-center"
                      style={{ height: 120 }}
                    >
                      {newCardBox.cover_url ? (
                        <img
                          src={newCardBox.cover_url}
                          alt="封面預覽"
                          className="w-100 h-100 object-fit-cover"
                        />
                      ) : (
                        <span className="material-symbols-outlined text-gray-400 fs-1">
                          image
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col-6 d-flex">
                    <label
                      htmlFor={`inputCardBoxCover-${modalId}`}
                      className="btn btn-outline-primary mt-auto"
                    >
                      {isImgUploading ? "上傳中" : "上傳圖片"}
                      {isImgUploading && (
                        <span
                          className="spinner-border spinner-border-sm ms-1"
                          role="status"
                          aria-hidden="true"
                        />
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
                      value={newCardBox.cover_url}
                      onChange={(e) =>
                        setNewCardBox((prev) => ({
                          ...prev,
                          cover_url: e.target.value,
                        }))
                      }
                    />
                    <a
                      href="#"
                      className="input-clearup"
                      onClick={(e) => {
                        e.preventDefault();
                        setNewCardBox((prev) => ({ ...prev, cover_url: "" }));
                      }}
                    >
                      <span className="material-symbols-outlined">close</span>
                    </a>
                  </div>
                </div>
                <div className="mt-6 d-flex justify-content-end">
                  <div className="form-check">
                    <input
                      id="cardBoxIsFavorite"
                      className="form-check-input"
                      type="checkbox"
                      checked={newCardBox.is_favorite}
                      onChange={(e) =>
                        setNewCardBox((prev) => ({
                          ...prev,
                          is_favorite: e.target.checked,
                        }))
                      }
                    />
                    <label
                      className="form-check-label"
                      htmlFor="cardBoxIsFavorite"
                    >
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
                {modalAction}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
