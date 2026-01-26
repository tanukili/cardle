import { Link } from "react-router-dom";
import { useState } from "react";
import CardBox from "@/components/card/CardBox";

export default function CardBoxs() {
  const [cardBoxes] = useState([
    {
      id: "1",
      title: "CSS 基礎",
      cover_url: "user/card-box-cover-1.png",
      ui: {
        color: "success",
      },
      is_favorite: false,
    },
    {
      id: "2",
      title: "JavaScript",
      cover_url: "user/card-box-cover-2.png",
      ui: {
        color: "orange",
      },
      is_favorite: true,
    },
    {
      id: "3",
      title: "TypeScript",
      cover_url: "user/card-box-cover-3.png",
      ui: {
        color: "secondary",
      },
      is_favorite: false,
    },
    {
      id: "4",
      title: "React 框架",
      cover_url: "user/card-box-cover-4.jpg",
      ui: {
        color: "secondary",
      },
      is_favorite: true,
    },
    {
      id: "5",
      title: "料理基礎",
      cover_url: "user/card-box-cover-5.jpg",
      ui: {
        color: "secondary",
      },
      is_favorite: false,
    },
  ]);

  const [selectedCount, setSelectedCount] = useState(0);
  const [isSelectMode, setIsSelectMode] = useState(false);
  // Set（集合，不重複）
  const [selectedIds, setSelectedIds] = useState(new Set());
  // Lazy Initialization
  const [favorites, setFavorites] = useState(
    () => new Set(cardBoxes.filter((cb) => cb.is_favorite).map((cb) => cb.id))
  );
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleSelect = (id) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
    setSelectedCount(newSelected.size);
  };

  const handleToggleFavorite = (id) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const handleDeselect = () => {
    setSelectedIds(new Set());
    setSelectedCount(0);
    setIsSelectMode(false);
  };

  const filteredCardBoxes = showFavoritesOnly
    ? cardBoxes.filter((cb) => favorites.has(cb.id))
    : cardBoxes;

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
              onChange={(e) => setShowFavoritesOnly(e.target.checked)}
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
                  <span className="material-symbols-outlined">
                    close
                  </span>
                </a> 
              </div>
              <p className="text-gray-700 mt-6 my-md-auto ms-md-3 ms-xl-8">
                共<span className="mx-1 fw-bold tracking-2">{filteredCardBoxes.length}</span>
                個卡片盒
              </p>
            </div>
          </div>
          {/* <div className="col-md-4 col-lg-3">
            <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center gap-3 gap-md-4">
              <div className="d-flex flex-column flex-md-row gap-2 gap-md-3">

                {isSelectMode && selectedCount > 0 && (
                  <span className="text-gray-700">已選取 {selectedCount} 個卡片盒</span>
                )}
              </div>
              {isSelectMode && selectedCount > 0 && (
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-outline-danger btn-sm"
                    type="button"
                    onClick={handleDeselect}
                  >
                    取消選取
                  </button>
                  <button className="btn btn-danger btn-sm" type="button">
                    <span className="material-symbols-outlined me-1" style={{ fontSize: "18px" }}>
                      delete
                    </span>
                    刪除
                  </button>
                </div>
              )}
            </div>
          </div> */}
          <div className="col-6 col-lg-auto mt-6 mt-lg-3 order-lg-1">
            <button className="btn btn-outline-primary w-100" type="button">
              新增卡片盒
            </button>
          </div>
          <div className="col-6 col-lg-auto mt-6 mt-lg-3 order-lg-2">
            <button className="btn btn-outline-primary w-100" type="button">
              新增卡片
            </button>
          </div>
          <div className="col-lg-auto ms-auto">
            <button
              className="btn btn-outline-primary w-100"
              type="button"
              onClick={() => setIsSelectMode(!isSelectMode)}
            >
              選取
            </button>
          </div>
          <div className="col-lg-auto order-lg-3">
            <div className="form-select-container">
              <a 
                className="position-absolute top-50 translate-middle text-primary lh-1"
                style={{ left: "calc(50% - 56px)" }}
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <span className="material-symbols-outlined">
                    sort
                  </span>
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
        <span className="d-block border-bottom border-gray-200 mt-6">
        </span>
      </section>
      {/* 卡片盒列表 */}
      <div className="container">
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
      </div>
    </>
  );
}
