import { Link } from 'react-router-dom';
import PersonalPlanSwiper from '@/components/swiper/PersonalPlanSwiper';

export default function PlanUpgrade() {
  return (
    <>
      <div className="px-1 px-xl-6 pt-6 pb-10">
        <div className="mb-10">
          <Link to="/user" className="link-gray-600 fs-s fs-md-m py-1 py-md-2 ps-0 pe-2 px-md-4 mb-4 mb-md-10">
            <span className="material-symbols-outlined align-bottom fs-m fs-md-2xl me-2_5 me-md-3">arrow_back_ios</span>
            返回個人儀表板
          </Link>
          <div className="d-flex align-items-center pb-6 border-bottom border-gray-200">
            <h1 className="fs-2xl fs-md-3xl me-2 me-md-6">升級方案</h1>
          </div>
        </div>

        <PersonalPlanSwiper />
      </div>
    </>
  );
}
