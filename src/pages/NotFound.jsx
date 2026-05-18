import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center text-center flex-grow-1">
        <div className="d-flex flex-column flex-lg-row justify-content-center align-items-center py-10">
          {/* 插圖 */}
          <img src="404-notfound.png" className="mb-6 mb-lg-0 w-100 w-md-75" style={{ maxWidth: '650px' }} />

          <div>
            {/* 404 */}
            <h1 className="fw-bold mb-4">404</h1>
            {/* 文案 */}
            <p className="text-gray-700 mb-3">今天，好像什麼都沒釣到。</p>

            <p className="text-gray-700">這個頁面，可能還在來的路上。</p>

            <p className="text-gray-700 mb-8">我們去別的地方看看吧。</p>

            {/* 按鈕 */}
            <div className="d-flex gap-3">
              <Link to="/" className="btn btn-primary">
                回首頁
              </Link>
              <Link to="/subscription" className="btn btn-outline-primary">
                查看訂閱方案
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
