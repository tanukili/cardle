import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <footer className="bg-gray-0 py-16">
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-md-between align-items-md-center mb-8">
            {/* 標題 */}
            <div className="text-center text-md-start mb-8 mb-md-0">
              <Link to="/" className="mb-4 mb-md-2">
                <img src="icons/logo-with-text.svg" alt="logo" />
              </Link>
              <p className="text-primary fw-bold fs-s">
                把靈感放進卡片盒，慢慢長成知識的森林。
              </p>
            </div>
            {/* 導覽連結 */}
            <ul className="nav nav-pills flex-column flex-md-row align-items-center gap-3">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  首頁
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/features">
                  產品介紹
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/subscription">
                  訂閱方案
                </Link>
              </li>
            </ul>
          </div>
          {/* 社群連結, copyright */}
          <div className="d-flex flex-column flex-md-row justify-content-md-between align-items-center gap-6">
            <ul className="community-list list-unstyled d-flex gap-8 mb-0">
              <li>
                <a href="#" className="community-link">
                  <img src="icons/facebook.svg" alt="facebook" />
                </a>
              </li>
              <li>
                <a href="#" className="community-link">
                  <img src="icons/Instagram.svg" alt="Instagram" />
                </a>
              </li>
              <li>
                <a href="#" className="community-link">
                  <img src="icons/twitter.svg" alt="twitter" />
                </a>
              </li>
              <li>
                <a href="#" className="community-link">
                  <img src="icons/email.svg" alt="email" />
                </a>
              </li>
            </ul>
            <p className="text-gray-500">©2025 Cardle All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
