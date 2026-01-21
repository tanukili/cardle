import { Link } from "react-router-dom";

export default function CardBoxs() {
  return (
    <>
      <section className="container py-14 py-lg-6 border-bottom border-gray-200">
        <Link to="/user" className="fs-m fw-normal fs-xl-m_r mb-14">
          <span className="material-symbols-outlined align-bottom me-1">
            arrow_back_ios
          </span>
          返回個人儀表板
        </Link>
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="fs-xl mb-2 pb-6 fs-md-3xl lh-md-sm mb-md-3">卡片盒</h1>

          {/* 使用 div 而不是 switch */}
          <div className="form-check form-switch">
            {/* input 必須是自閉合，文字要放在 label 裡 */}
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
            />
            <label
              className="form-check-label link-primary"
              htmlFor="flexSwitchCheckDefault"
            >
              僅顯示最愛卡片盒
            </label>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          {/* 這裡是一個整體，父層不會拆散裡面的內容 */}
          <div className="d-flex align-items-center mb-0">
            {/* 搜尋框容器 */}
            <div className="input-group" style={{ width: "300px" }}>
              <span className="input-group-text bg-white border-end-0 text-muted">
                <span className="material-symbols-outlined fs-4">search</span>
              </span>
              <input
                type="search"
                className="form-control border-start-0 ps-0"
                placeholder="輸入要搜尋的卡片盒"
              />
            </div>

            {/* 緊跟在後的文字，使用 ms-6 增加間距 */}
            <span className="text-muted ms-6 flex-shrink-0">
              共 30 個卡片盒
            </span>
          </div>
          {/* 父層的其他元素（例如之前的按鈕） */}
          {/* 關鍵：使用 d-flex flex-column，並在 md 尺寸以上改回 flex-row */}
          <nav className="nav nav-pills d-flex gap-3 gap-md-6">
            <button
              className="nav-link border border-primary"
              aria-current="page"
              type="button"
            >
              選取
            </button>
            <button
              className="nav-link border border-primary d-flex align-items-center justify-content-center justify-content-md-start"
              type="button"
            >
              新增卡片盒
            </button>
            <button
              className="nav-link border border-primary d-flex align-items-center justify-content-center justify-content-md-start"
              type="button"
            >
              新增卡片
            </button>
            <button
              className="nav-link border border-primary d-flex align-items-center justify-content-center justify-content-md-start"
              type="button"
            >
              <span class="material-symbols-outlined me-3">sort</span>
              建立時間
              <span class="material-symbols-outlined ms-3">
                keyboard_arrow_down
              </span>
            </button>
          </nav>
        </div>
      </section>
      <section className="container py-14 py-lg-6">CARDS</section>
    </>
  );
}
