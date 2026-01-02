import { useSelector, useDispatch } from "react-redux";
import { login } from "@/store/slices/userSlice";

export default function Login() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const userInfo = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();

  const fakeUserInfo = {
    name: "fakeName",
    avatarUrl: "./user.png",
  };

  return (
    <>
      <h1>3. 登入</h1>
      <button
        onClick={() => dispatch(login(fakeUserInfo))}
        className="btn btn-primary"
        type="button"
      >
        登入
      </button>
      {isLoggedIn.toString()}
      {JSON.stringify(fakeUserInfo)}
    </>
  );
}
