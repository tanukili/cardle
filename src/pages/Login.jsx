import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/store/slices/userSlice";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const userInfo = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 表單狀態
  const [email, setEmail] = useState("demo2@example.com");
  const [password, setPassword] = useState("123456a");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}login`, {
        email,
        password,
      });

      const { accessToken, user } = res.data; // { accessToken, user }

      // Step A：存 token

      document.cookie = `userToken=${accessToken}; path=/; max-age=86400;`;

      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      // Step B：整理 userInfo（配合 slice）
      const userInfo = {
        id: user.id,
        username: user.username,
        email: user.email,
        avatarUrl: user.avatarImage || "default-avatar.png",
        phone: user.phone || "",
        address: user.address || "",
        newsletterSubscribed: user.newsletterSubscribed || false,
      };

      // Step C：Redux 登入
      dispatch(login(userInfo));
      localStorage.setItem("user", JSON.stringify(userInfo));

      // Step D：導頁
      navigate("/user");
    } catch (err) {
      const errorMsg = err.response?.data?.message || "帳號或密碼錯誤";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="d-md-flex">
      {/* login banner */}
      <section className="login-banner w-md-40">
        <img src="login-banner.png" alt="login-banner" />
      </section>

      {/* login form container */}
      <div className="container-fluid w-md-60">
        <div className="row">
          <section className="col-9 col-md-10 col-xl-8 mx-auto py-16 px-3 px-md-15">
            <h1 className="fs-3xl fs-md-4xl mb-4">登入</h1>
            <p className="fw-medium mb-6 mb-md-10">
              歡迎回來，請輸入您的帳號及密碼。
            </p>

            {/* 錯誤提示 */}
            {error && <div className="alert alert-danger">{error}</div>}

            {/* 表單 */}
            <form className="was-validated" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="form-label">
                  帳號
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="請輸入帳號"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div className="invalid-feedback">請輸入註冊時使用的信箱</div>
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="form-label">
                  密碼
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="請輸入密碼"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="invalid-feedback">請輸入密碼</div>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 mt-10 mb-4"
                disabled={loading}
              >
                {loading ? "登入中..." : "登入"}
              </button>

              <p>
                新會員？
                <Link
                  to="/sign-up"
                  className="link-primary ms-2 text-decoration-underline"
                >
                  註冊
                </Link>
              </p>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}
