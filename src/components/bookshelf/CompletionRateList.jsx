export default function CompletionRateList({ cycles }) {

  const countProgress = (completedUnit, totalUnit) =>
    parseInt((completedUnit / totalUnit) * 100, 10);

  return (
    <ul className="list-unstyled mb-0 d-flex flex-column gap-6">
      {cycles.map(
        ({ type, title, completedUnit, totalUnit }, index) => (
          <li key={index}>
            <div className="card rounded-4 bg-gray-0 border-gray-200">
              <div className="card-body p-lg-6 d-lg-flex align-items-center gap-lg-10" >
                <h3 className="fs-m fw-normal lh-base text-dark text-truncate mb-4 fs-xl-xl mb-lg-0 overflow-hidden">
                    {title}
                </h3>
                <div className="d-flex align-items-center flex-grow-1">
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
                  <small className="text-gray-700 text-end" style={{width: '48px'}}>
                    {`${completedUnit}/${totalUnit}`}
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
