import { useLoaderData, Link, useRevalidator } from "react-router-dom";
import { useState, useRef } from "react";
import { Modal } from "bootstrap";
import { showSwalToast } from "@/utils/swalToast";
import BaseCard from "@/components/card/BaseCard";
import { deleteCards, createCard } from "@/services/cardService";

export default function CardBoxDetail() {
  const { cardBox, cards } = useLoaderData();
  const revalidator = useRevalidator();
  const [searchValue, setSearchValue] = useState("");
  const [isBaseCardMode, setIsBaseCardMode] = useState(false);

  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState(new Set());

  const toggleSelectMode = () => {
    setIsSelectMode(!isSelectMode);
    setSelectedIds(new Set());
  };

  const handleSelectCard = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteCards = async () => {
    setIsDeleting(true);
    try {
      await deleteCards(selectedIds);
      showSwalToast({ title: "刪除成功" });
      setSelectedIds(new Set());
      revalidator.revalidate();
    } catch (err) {
      const errorMsg = `${err.response.status} ${err.response.statusText}`;
      showSwalToast({ title: `刪除失敗，${errorMsg}`, variant: "error" });
    } finally {
      setIsDeleting(false);
    }
  };

  const [newCard, setNewCard] = useState({ title: "", content: "" });
  const createCardModalRef = useRef(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateCard = async (e) => {
    e.preventDefault();
    setIsCreating(true);

    const cardContent = {
      title: newCard.title.trim(),
      content: newCard.content,
      tags: [`${cardBox.title}`],
    };

    try {
      await createCard(cardContent, cardBox.id);
      showSwalToast({ title: "新增成功" });
      setNewCard({ title: "", content: "" });

      if (createCardModalRef.current) {
        Modal.getOrCreateInstance(createCardModalRef.current).hide();
      }
      revalidator.revalidate();
    } catch (err) {
      const errorMsg = err?.response
        ? `${err.response.status} ${err.response.statusText}`
        : "請稍後再試";
      showSwalToast({ title: `新增失敗，${errorMsg}`, variant: "error" });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <>
      <section className="card-box-detail container position-sticky pt-6 bg-white z-2 mb-6 mb-lg-8">
        <Link
          to="/user/card-boxes"
          className="mb-4 py-1 pe-2 fs-s text-gray-600 d-inline-flex align-items-center mb-lg-10 fs-lg-m px-lg-4 py-lg-2"
        >
          <span className="material-symbols-outlined icon-sm me-2_5 me-lg-3 ">
            arrow_back_ios_new
          </span>
          返回卡片盒列表
        </Link>
        <h1 className="fs-2xl fs-lg-3xl mb-4">{cardBox.title}</h1>
        <div className="position-relative mb-6 rounded-1 overflow-hidden mb-lg-8">
          {cardBox.cover_url ? (
            <img
              className="card-box-detail-cover"
              src={cardBox.cover_url}
              alt={cardBox.title}
            />
          ) : null}
          <button className="btn btn-icon-primary btn-gray-0 p-2 rounded-circle position-absolute top-0 end-0 m-3 m-lg-6 ">
            <span className="material-icons-outlined d-block">edit</span>
          </button>
        </div>
        <div className="row g-4 gx-md-3">
          <div className="col-md-auto order-md-2">
            <div className="form-check form-switch my-auto h-100 d-flex align-items-center ms-md-5">
              <input
                className="form-check-input ms-auto me-3"
                type="checkbox"
                role="switch"
                id="cardModeSwitch"
                checked={isBaseCardMode}
                onChange={() => setIsBaseCardMode(!isBaseCardMode)}
              />
              <label
                className="form-check-label text-primary"
                htmlFor="cardModeSwitch"
              >
                詳細模式
              </label>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="d-sm-flex">
              <div
                className="form-control-container with-icon flex-grow-1"
                style={{ maxWidth: "320px" }}
              >
                <input
                  id="searchCardBox"
                  type="text"
                  className="form-control"
                  aria-describedby="searchCardBox"
                  placeholder="輸入要搜尋的卡片"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <a
                  href="#"
                  className="input-clearup"
                  onClick={(e) => {
                    e.preventDefault();
                    setSearchValue("");
                  }}
                >
                  <span className="material-symbols-outlined">close</span>
                </a>
              </div>
              <p className="text-gray-700 mt-4 text-nowrap my-sm-auto ms-sm-4 ms-xl-8">
                共
                <span className="mx-1 fw-bold tracking-2">{cards.length}</span>
                個卡片
              </p>
            </div>
          </div>
          {isSelectMode && (
            // 選取刪除
            <div className="col-6 col-md-auto ms-auto text-end ">
              <p className="text-gray-700 d-flex align-items-center h-100">
                已選取
                <span className="fw-bold mx-1 tracking-2">
                  {selectedIds.size}
                </span>
                個卡片
              </p>
            </div>
          )}
          {isSelectMode ? (
            // 選取刪除
            <div className="col-6 col-md-auto text-end order-md-1">
              <button
                className="btn btn-primary"
                type="button"
                onClick={handleDeleteCards}
                disabled={selectedIds.size === 0 || isDeleting}
              >
                {isDeleting && (
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  />
                )}
                刪除卡片
              </button>
            </div>
          ) : (
            <div className="col-md-auto order-md-1">
              <button
                className="btn btn-outline-primary w-100"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#createCardModal"
              >
                新增卡片
              </button>
            </div>
          )}
          <div className={`col-md-auto  ${isSelectMode ? "" : "ms-auto"}`}>
            <button
              className="btn btn-outline-primary w-100"
              type="button"
              onClick={toggleSelectMode}
            >
              {isSelectMode ? "取消選取" : "選取"}
            </button>
          </div>
        </div>
        <span className="d-block border-bottom border-gray-200 mt-6 mt-lg-8"></span>
      </section>
      <section className="container pb-10">
        <div className="row g-6">
          {cards.map((card) => (
            <div className="col-md-6 col-lg-4 col-xl-3" key={card.id}>
              <BaseCard
                card={card}
                badges={cardBox.badges}
                mode={isBaseCardMode ? "base" : "titleOnly"}
                isSelectMode={isSelectMode}
                isSelected={selectedIds.has(card.id)}
                onSelect={handleSelectCard}
              />
            </div>
          ))}
        </div>
      </section>

      {/* 新增卡片 Modal */}
      <div
        className="modal-reset modal fade"
        id="createCardModal"
        tabIndex="-1"
        aria-labelledby="createCardModalLabel"
        aria-hidden="true"
        ref={createCardModalRef}
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h2
                className="modal-title fs-l fs-lg-2xl"
                id="createCardModalLabel"
              >
                新增卡片
              </h2>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <form onSubmit={handleCreateCard}>
              <div className="modal-body">
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
                <div className="mb-4">
                  <label htmlFor="cardTitle" className="form-label fs-m">
                    卡片標題
                  </label>
                  <div className="form-control-container">
                    <input
                      id="cardTitle"
                      className="form-control"
                      type="text"
                      placeholder="請輸入卡片標題"
                      value={newCard.title}
                      onChange={(e) =>
                        setNewCard((prev) => ({
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
                        setNewCard((prev) => ({ ...prev, title: "" }));
                      }}
                    >
                      <span className="material-symbols-outlined">close</span>
                    </a>
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="cardContent" className="form-label fs-m">
                    卡片內容
                  </label>
                  <div className="border rounded overflow-hidden">
                    <textarea
                      id="cardContent"
                      className="form-control border-0 rounded-0"
                      placeholder="請輸入內容..."
                      rows={10}
                      style={{ minHeight: 200, resize: "none" }}
                      value={newCard.content}
                      onChange={(e) =>
                        setNewCard((prev) => ({
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
                  disabled={isCreating}
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isCreating}
                >
                  {isCreating && (
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    />
                  )}
                  新增
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
