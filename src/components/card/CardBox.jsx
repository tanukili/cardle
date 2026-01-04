export default function CardBox({ cardBox }) {
  return (
    <div
      className={`card rounded-4 bg-gray-0 border-2 border-tag-${cardBox.ui.color}-bg`}
    >
      <div className="card-body p-xl-6">
        <img
          className="cover-img mb-4 rounded-1"
          src={cardBox.cover_url}
          alt={`${cardBox.title}-封面`}
        />
        <h3 className="fs-m lh-base tracking-2 text-center fs-lg-xl">
          {cardBox.title}
        </h3>
      </div>
    </div>
  );
}
