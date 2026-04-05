import { Outlet } from 'react-router-dom';
import BaseHeader from '@/layouts/base/BaseHeader';
import BaseFooter from '@/layouts/base/BaseFooter';

export default function HomeLayout() {
  return (
    <>
      <BaseHeader />
      <Outlet />
      <BaseFooter />
    </>
  );
}
