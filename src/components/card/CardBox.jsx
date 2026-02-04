import { useNavigate } from "react-router-dom";

export default function CardBox({ cardBox, isSelectMode = false, isSelected = false, onSelect, isFavorite = false, onToggleFavorite }) {
  const navigate = useNavigate();

  const cardBoxClass = ["card", "card-box", isSelectMode && "select-mode", isSelected && "is-selected", isFavorite && "is-favorite"].filter(Boolean).join(" ");

  return (
    <div className={cardBoxClass}
      onClick={isSelectMode ? () => onSelect?.(cardBox.id) : (e) => {
        e.stopPropagation();
        navigate(`/user/card-box/${cardBox.id}`);
      }}
    >
      <div className="position-relative">
        {cardBox.cover_url ? (
          <img
            className="card-img-top"
            src={cardBox.cover_url}
            alt={`${cardBox.title }-封面`}
          />
        ) : (
          <div className="card-img-top bg-primary-100 d-flex"
          >
            <h3 className="text-primary m-auto">{cardBox.title}</h3>
          </div>
        )}
        {/* 最愛按鈕 */}
        <button
          className="card-box-favorite"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite?.(cardBox.id, cardBox.is_favorite);
          }}
          >
          <span className="material-symbols-outlined">
            star
          </span>
        </button>
          {/* 選擇標示 */}
        <div className="card-box-select">
          <span className="material-symbols-outlined">
            check
          </span>
        </div>
      </div>
      <div className="card-body">
        <h3 className="card-title">
          {cardBox.title}
        </h3>
        {/* {!cardBox.cover_url && (
          <div
            className="position-absolute w-100 h-100 d-flex align-items-center justify-content-center"
            style={{
              fontFamily: "monospace",
              fontSize: "12px",
              color: "#4a9eff",
              opacity: 0.6,
              lineHeight: "1.6",
              padding: "20px",
            }}
          >
            <pre style={{ margin: 0, color: "#4a9eff" }}>
              {`class ${cardBox.title?.replace(/\s/g, "")} {
  constructor() {
    this.data = [];
  }
}`}
            </pre>
          </div>
        )} */}
      </div>
    </div>
  );
}
