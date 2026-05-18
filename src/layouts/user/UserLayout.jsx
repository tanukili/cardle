import { Outlet } from 'react-router-dom';
import UserHeader from '@/layouts/user/UserHeader';

export default function userLayout() {
  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <UserHeader />
        <Outlet />
      </div>
    </>
  );
}
