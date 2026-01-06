import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { login } from "@/store/slices/userSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  // 對應原始 HTML 的 input value
  const [email, setEmail] = useState("fakemail@mail.com");
  const [password, setPassword] = useState("123456");

  // 提交表單
  const handleSubmit = (e) => {
    e.preventDefault();

    // 假設登入成功，建立 userInfo
    // const userInfo = {
    //   name: email.split("@")[0], // 假資料，可自行改
    //   avatarUrl: "./user.png",
    // };

    // Redux dispatch
    // dispatch(login(userInfo));

    // 暫時只做 alert 或直接導向
    console.log("暫時 login:", { email, password });
    // 導向 user dashboard
    navigate("/user/dashboard");
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
              >
                登入
              </button>

              <p>
                新會員？
                <a
                  className="link-primary ms-2 text-decoration-underline"
                  href="/sign-up"
                >
                  註冊
                </a>
              </p>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}
