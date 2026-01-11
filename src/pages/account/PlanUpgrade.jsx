export default function PlanUpgrade() {
  return (
    <>
      <h1 className="mb-16">升級方案</h1>
      <section>
        <div className="d-flex justify-content-center gap-4 mb-16">
          <input
            type="radio"
            className="btn-check"
            name="upgrade-plan"
            id="plan1"
            autoComplete="off"
          />
          <label className="card card-label px-5 py-8" htmlFor="plan1">
            <div className="card-body d-flex flex-column">
              <div>
                <h2 className="fs-xl mb-6">Free 免費方案</h2>
                <ul className="list-unstyled mb-8">
                  <li className="mb-2">
                    <span className="material-symbols-outlined align-bottom text-gray-500 me-2">
                      check
                    </span>
                    <span className="text-gray-1000">建立筆記卡片</span>
                  </li>
                  <li className="mb-2">
                    <span className="material-symbols-outlined align-bottom text-gray-500 me-2">
                      check
                    </span>
                    <span className="text-gray-1000">建立書單</span>
                  </li>
                  <li className="mb-2">
                    <span className="material-symbols-outlined align-bottom text-gray-500 me-2">
                      check
                    </span>
                    <span className="text-gray-1000">標籤分類</span>
                  </li>
                </ul>
              </div>
              <h3 className="fs-l mt-auto text-center">NT$ 0</h3>
            </div>

            <p className="fs-s current-plan"></p>
          </label>

          <input
            type="radio"
            className="btn-check"
            name="upgrade-plan"
            id="plan2"
            autoComplete="off"
          />
          <label className="card card-label px-5 py-8" htmlFor="plan2">
            <div className="card-body d-flex flex-column">
              <div>
                <h2 className="fs-xl mb-6">Pro 月繳方案</h2>
                <ul className="list-unstyled mb-8">
                  <li className="mb-2">
                    <span className="material-symbols-outlined align-bottom text-gray-500 me-2">
                      check
                    </span>
                    <span className="text-gray-1000">建立筆記卡片</span>
                  </li>
                  <li className="mb-2">
                    <span className="material-symbols-outlined align-bottom text-gray-500 me-2">
                      check
                    </span>
                    <span className="text-gray-1000">建立書單</span>
                  </li>
                  <li className="mb-2">
                    <span className="material-symbols-outlined align-bottom text-gray-500 me-2">
                      check
                    </span>
                    <span className="text-gray-1000">標籤分類</span>
                  </li>
                  <li className="mb-2">
                    <span className="material-symbols-outlined align-bottom text-gray-500 me-2">
                      check
                    </span>
                    <span className="text-gray-1000">視覺化關聯地圖</span>
                  </li>
                  <li className="mb-2">
                    <span className="material-symbols-outlined align-bottom text-gray-500 me-2">
                      check
                    </span>
                    <span className="text-gray-1000">進度追蹤與提醒</span>
                  </li>
                </ul>
              </div>
              <h3 className="fs-l mt-auto text-center">NT$ 120 / 月</h3>
            </div>

            <p className="fs-s current-plan">目前方案</p>
          </label>

          <input
            type="radio"
            className="btn-check"
            name="upgrade-plan"
            id="plan3"
            autoComplete="off"
            defaultChecked
          />
          <label className="card card-label px-5 py-8" htmlFor="plan3">
            <div className="card-body d-flex flex-column">
              <div>
                <h2 className="fs-xl mb-6">Pro 年繳方案</h2>
                <ul className="list-unstyled mb-8">
                  <li className="mb-2">
                    <span className="material-symbols-outlined align-bottom text-gray-500 me-2">
                      check
                    </span>
                    <span className="text-gray-1000">建立筆記卡片</span>
                  </li>
                  <li className="mb-2">
                    <span className="material-symbols-outlined align-bottom text-gray-500 me-2">
                      check
                    </span>
                    <span className="text-gray-1000">建立書單</span>
                  </li>
                  <li className="mb-2">
                    <span className="material-symbols-outlined align-bottom text-gray-500 me-2">
                      check
                    </span>
                    <span className="text-gray-1000">標籤分類</span>
                  </li>
                  <li className="mb-2">
                    <span className="material-symbols-outlined align-bottom text-gray-500 me-2">
                      check
                    </span>
                    <span className="text-gray-1000">視覺化關聯地圖</span>
                  </li>
                  <li className="mb-2">
                    <span className="material-symbols-outlined align-bottom text-gray-500 me-2">
                      check
                    </span>
                    <span className="text-gray-1000">進度追蹤與提醒</span>
                  </li>
                </ul>
              </div>
              <h3 className="fs-l mt-auto text-center">NT$ 1,200 / 年</h3>
            </div>

            <p className="fs-s current-plan"></p>
          </label>
        </div>

        <div className="d-flex justify-content-center gap-4">
          <button type="button" className="btn btn-outline-primary">
            返回
          </button>
          <button type="button" className="btn btn-primary">
            升級方案
          </button>
        </div>
      </section>
    </>
  );
}
