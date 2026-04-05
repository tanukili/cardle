import { Outlet } from 'react-router-dom';
import BaseHeader from '@/layouts/base/BaseHeader';
import BaseFooter from '@/layouts/base/BaseFooter';

export default function HomeLayout() {
  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <BaseHeader />
        <Outlet />
        <BaseFooter />
      </div>
    </>
  );
}
