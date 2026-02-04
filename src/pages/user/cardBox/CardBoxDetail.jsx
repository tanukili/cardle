import { useLoaderData, Link } from "react-router-dom";
import { useState } from "react";
import BaseCard from "@/components/card/BaseCard";

export default function CardBoxDetail() {
  const { cardBox, cards } = useLoaderData();
  const [searchValue, setSearchValue] = useState("");
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [isBaseMode, setIsBaseMode] = useState(false);

  const toggleSelectMode = () => {
    setIsSelectMode(!isSelectMode);
    setSelectedIds(new Set());
  };

  return (
    <>
      <section
        style={{ top: "73px" }}
        className="container position- pt-6 bg-white z-2 mb-6 "
      >
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
        <div className="position-relative mb-6 rounded-1 overflow-hidden">
          {cardBox.cover_url ? (
            <img
              className="w-100 object-fit-cover"
              src={cardBox.cover_url}
              alt={cardBox.title}
              style={{ height: "120px" }}
            />
          ) : null}
          <button className="btn btn-light p-2 rounded-circle position-absolute top-0 end-0 m-3">
            <span className="material-symbols-outlined d-block">edit</span>
          </button>
        </div>
        <div className="row g-4 gx-lg-3">
          <div className="col-lg-auto mt-lg-3 order-lg-">
            <div className="form-check form-switch d-flex align-items-center ">
              <input
                className="form-check-input ms-auto me-3"
                type="checkbox"
                role="switch"
                id="cardModeSwitch"
                checked={isBaseMode}
                onChange={() => setIsBaseMode(!isBaseMode)}
              />
              <label
                className="form-check-label text-primary"
                htmlFor="cardModeSwitch"
              >
                詳細模式
              </label>
            </div>
          </div>
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
              <p className="text-gray-700 mt-4 text-nowrap my-md-auto ms-md-4 ms-xl-8">
                共
                <span className="mx-1 fw-bold tracking-2">{cards.length}</span>
                個卡片
              </p>
            </div>
          </div>
          {isSelectMode ? (
            // 選取刪除
            <div className="col-lg-auto mt-lg-3 ms-lg-auto">
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
              <div className="col-lg-auto mt-lg-3 order-lg-2">
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
        </div>
        <span className="d-block border-bottom border-gray-200 mt-6"></span>
      </section>
      <section className="container pb-10">
        <div className="row g-6">
          {cards.map((card) => (
            <div className="col-lg-4" key={card.id}>
              <BaseCard
                card={card}
                badges={cardBox.badges}
                mode={isBaseMode ? "base" : "titleOnly"}
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
