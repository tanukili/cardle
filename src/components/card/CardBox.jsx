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
          <div className="card-img-top bg-primary-0 d-flex"
          >
            <h3 className="text-primary-500 m-auto">{cardBox.title}</h3>
          </div>
        )}
        {/* 最愛按鈕 */}
        <button
          className={`btn btn-gray-0 btn-icon-star card-box-favorite ${cardBox.is_favorite ? " active" : ""}`}
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
      </div>
    </div>
  );
}
