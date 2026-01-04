export default function ProgressList({ learningResources }) {
  const typeIconMap = {
    book: "book",
    podcast: "music_video",
    video: "live_tv",
  };

  const countProgress = (completedUnit, totalUnit) =>
    (completedUnit / totalUnit) * 100;

  return (
    <ul className="list-unstyled mb-0 d-flex flex-column gap-6">
      {learningResources.map(
        ({ id, type, title, completedUnit, totalUnit }) => (
          <li key={id}>
            <div className="progress-card card rounded-4 bg-gray-0 border-gray-200">
              <div className="card-body p-lg-6">
                <h3 className="fs-m fw-normal d-flex align-items-center mb-4 fs-xl-xl mb-lg-0 overflow-hidden">
                  <span className="material-symbols-outlined text-gray-600 me-3">
                    {typeIconMap[type]}
                  </span>
                  <span className="lh-base text-dark text-truncate">
                    {title}
                  </span>
                </h3>
                <div className="d-flex align-items-center">
                  <div
                    className="progress flex-grow-1"
                    role="progressbar"
                    aria-label="learning-progress"
                    aria-valuenow={countProgress(completedUnit, totalUnit)}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    <div
                      className="progress-bar rounded-2"
                      style={{
                        width: `${countProgress(completedUnit, totalUnit)}%`,
                      }}
                    ></div>
                  </div>
                  <small className="progress-num text-gray-700 text-end">
                    {countProgress(completedUnit, totalUnit)}%
                  </small>
                  <button
                    className="btn btn-outline-primary d-flex align-items-center p-2 ms-4 d-lg-none"
                    type="button"
                  >
                    <span className="material-symbols-outlined">
                      edit_square
                    </span>
                  </button>
                </div>
                <button
                  className="d-none btn btn-outline-primary d-lg-flex align-items-center p-2 px-xl-4 ms-4 ms-lg-0"
                  type="button"
                >
                  <span className="material-symbols-outlined d-xl-none">
                    edit_square
                  </span>
                  <span className="d-none d-xl-inline">進度更新</span>
                </button>
              </div>
            </div>
          </li>
        )
      )}
    </ul>
  );
}
