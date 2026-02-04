import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { Modal } from "bootstrap";
import CardBox from "@/components/card/CardBox";

export default function CardBoxs() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [cardBoxes, setCardBoxes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const createCardBoxModalRef = useRef(null);

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

  const [newCardBox, setNewCardBox] = useState(defaultCardBox);
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState("");

  const getCardBoxes = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${baseUrl}cardBoxes`);
      const data = response.data;
      console.log(data);
      setCardBoxes(data);
    } catch (error) {
      console.error("Error fetching card boxes:", error);
      setCardBoxes([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCardBoxes();
  }, [baseUrl]);

  const handleCreateCardBox = async (e) => {
    e.preventDefault();
    if (isCreating) return;

    setCreateError("");

    const title = newCardBox.title.trim();
    if (!title) {
      setCreateError("請輸入卡片盒名稱");
      return;
    }

    setIsCreating(true);
    try {
      const ts = Math.floor(Date.now() / 1000);
      const payload = {
        ...newCardBox,
        id: `card_box_${ts}`,
        created_at: ts,
        updated_at: ts,
      };

      const response = await axios.post(`${baseUrl}cardBoxes`, payload);
      const created = response.data ?? payload;
      setCardBoxes((prev) => [...prev, created]);

      // 關閉 Bootstrap Modal
      if (createCardBoxModalRef.current) {
        Modal.getOrCreateInstance(createCardBoxModalRef.current).hide();
      }

      setNewCardBox(defaultCardBox);
    } catch (error) {
      console.error("Error creating card box:", error);
      setCreateError("新增失敗，請稍後再試");
    } finally {
      setIsCreating(false);
    }
  };

  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const switchShowFavoritesOnly = (e) => {
    const { checked: isToShowFavorites } = e.target;
    setShowFavoritesOnly(isToShowFavorites);

    setSelectedIds((prev) => {
      if (prev.size === 0 || !isToShowFavorites) return prev;

      const filteredSelectedIds = [...prev].filter((id) => {
        const targetCard = cardBoxes.find((cb) => cb.id === id);
        return targetCard && targetCard.is_favorite;
      });

      return new Set(filteredSelectedIds);
    });
  };

  const filteredCardBoxes = showFavoritesOnly
    ? cardBoxes.filter((cb) => cb.is_favorite)
    : cardBoxes;

  const handleToggleFavorite = async (id, isFavorite) => {
    try {
      const { statusText } = await axios.patch(`${baseUrl}cardBoxes/${id}`, {
        is_favorite: !isFavorite,
        updated_at: Math.floor(Date.now() / 1000),
      });
      if (statusText === "OK") {
        getCardBoxes();
      }
    } catch (error) {
      console.error(
        "Error toggling favorite:",
        error.response?.data?.message || error.message
      );
    }
  };

  const [searchValue, setSearchValue] = useState("");

  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState(new Set()); // Set（集合，不重複）

  const handleSelect = (id) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const toggleSelectMode = () => {
    setIsSelectMode(!isSelectMode);
    setSelectedIds(new Set());
  };

  const deleteSelectedCardBoxes = async () => {
    try {
      const ids = Array.from(selectedIds);
      // Promise 請求陣列
      const deletePromises = ids.map((id) =>
        axios.delete(`${baseUrl}cardBoxes/${id}`)
      );
      await Promise.all(deletePromises);

      setSelectedIds(new Set());
      getCardBoxes();
    } catch (error) {
      console.error("Error deleting card boxes:", error);
    }
  };

  return (
    <>
      <section
        className="container pt-6 position-sticky bg-white z-2 mb-10"
        style={{ top: "74px" }}
      >
        <Link
          to="/user"
          className="mb-4 py-1 pe-2 fs-s text-gray-600 d-inline-flex align-items-center mb-lg-10 fs-lg-m px-lg-4 py-lg-2"
        >
          <span className="material-symbols-outlined icon-sm me-2_5 me-lg-3 ">
            arrow_back_ios_new
          </span>
          返回個人儀表板
        </Link>
        <div className="d-flex justify-content-between align-items-center mb-6 ">
          <h1 className="fs-2xl fs-lg-3xl">卡片盒</h1>
          <div className="form-check form-switch d-flex align-items-center">
            <input
              className="form-check-input me-3"
              type="checkbox"
              role="switch"
              id="favoriteSwitch"
              checked={showFavoritesOnly}
              onChange={switchShowFavoritesOnly}
            />
            <label
              className="form-check-label text-primary"
              htmlFor="favoriteSwitch"
            >
              僅顯示最愛卡片盒
            </label>
          </div>
        </div>
        <div className="row g-3 gx-4 gx-lg-3">
          <div className="col-lg-5 me-n4">
            <div className="d-md-flex">
              <div
                className="form-control-container with-icon flex-grow-1"
                style={{ maxWidth: "320px" }}
              >
                <input
                  id="searchCardBox"
                  type="text"
                  className="form-control"
                  aria-describedby="searchCardBox"
                  placeholder="輸入要搜尋的卡片盒"
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
              <p className="text-gray-700 mt-6 text-nowrap my-md-auto ms-md-4 ms-xl-8">
                共
                <span className="mx-1 fw-bold tracking-2">
                  {filteredCardBoxes.length}
                </span>
                個卡片盒
              </p>
            </div>
          </div>
          {isSelectMode ? (
            // 選取刪除
            <div className="col-lg-auto mt-6 mt-lg-3 ms-lg-auto">
              <div className="d-flex align-items-center justify-content-between">
                <p className="text-gray-700 me-6">
                  已選取
                  <span className="fw-bold mx-1 tracking-2">
                    {selectedIds.size}
                  </span>
                  個卡片盒
                </p>
                <button
                  className="btn btn-primary d-flex align-items-center"
                  type="button"
                  onClick={deleteSelectedCardBoxes}
                  disabled={selectedIds.size === 0}
                >
                  <span className="material-icons-outlined me-3">delete</span>
                  刪除
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="col-6 col-lg-auto mt-6 mt-lg-3 order-lg-1">
                <button
                  className="btn btn-outline-primary w-100"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#createCardBoxModal"
                  onClick={() => {
                    setNewCardBox(defaultCardBox);
                  }}
                >
                  新增卡片盒
                </button>
              </div>
              <div className="col-6 col-lg-auto mt-6 mt-lg-3 order-lg-2">
                <button className="btn btn-outline-primary w-100" type="button">
                  新增卡片
                </button>
              </div>
            </>
          )}
          <div className={`col-lg-auto  ${isSelectMode ? "" : "ms-auto"}`}>
            <button
              className="btn btn-outline-primary w-100"
              type="button"
              onClick={toggleSelectMode}
            >
              {isSelectMode ? "取消選取" : "選取"}
            </button>
          </div>
          <div
            className={`col-lg-auto order-lg-3 ${
              isSelectMode ? "d-lg-none" : ""
            }`}
          >
            <div className="form-select-container">
              <a
                className="position-absolute top-50 translate-middle text-primary lh-1"
                style={{ left: "calc(50% - 56px)" }}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <span className="material-symbols-outlined">sort</span>
              </a>
              <select
                className="form-select text-center py-2 px-13"
                aria-label="排序選單"
                defaultValue="created_at"
                id="sortSelect"
              >
                <option value="created_at">建立時間</option>
                <option value="updated_at">更新時間</option>
                <option value="card_count">卡片數量</option>
              </select>
            </div>
          </div>
        </div>
        <span className="d-block border-bottom border-gray-200 mt-6"></span>
      </section>
      {/* 卡片盒列表 */}
      <div className="container pb-14 pb-lg-20">
        {filteredCardBoxes.length ? (
          <div className="row gy-6">
            {filteredCardBoxes.map((cardBox) => (
              <div key={cardBox.id} className="col-md-6 col-lg-4 col-xl-3">
                <CardBox
                  cardBox={cardBox}
                  isSelectMode={isSelectMode}
                  isSelected={selectedIds.has(cardBox.id)}
                  onSelect={handleSelect}
                  isFavorite={cardBox.is_favorite}
                  onToggleFavorite={handleToggleFavorite}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="alert alert-light mb-4 text-center" role="alert">
            { cardBoxes.length ? '沒有符合條件的卡片盒' : '目前沒有任何卡片盒'}
          </div>
        )}
      </div>

      {/* 新增卡片盒 Modal */}
      <div
        className="modal fade"
        id="createCardBoxModal"
        tabIndex="-1"
        aria-labelledby="createCardBoxModalLabel"
        aria-hidden="true"
        ref={createCardBoxModalRef}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title fs-lg-l" id="createCardBoxModalLabel">
                新增卡片盒
              </h2>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <form onSubmit={handleCreateCardBox}>
              <div className="modal-body">
                {createError && (
                  <div className="alert alert-danger py-2 mb-4" role="alert">
                    {createError}
                  </div>
                )}

                <div className="mb-4">
                  <label htmlFor="cardBoxTitle" className="form-label">
                    卡片盒名稱
                  </label>
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
                </div>
                <div className="mb-4">
                  <label htmlFor="cardBoxCoverUrl" className="form-label">
                    封面圖片
                  </label>
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
                </div>
                <div className="mt-4">
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
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  data-bs-dismiss="modal"
                  disabled={isCreating}
                >
                  關閉
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isCreating}
                >
                  {isCreating ? "新增中..." : "新增"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
