import { Link, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { formatDate } from "../../utils/filter";
import {
  switchPaidToFree,
  switchYearToMonth,
  upgradeMonthToYear,
} from "../../store/slices/subscriptionSlice";
import PlanActionModal from "../account/PlanActionModal";
import { showSwalToast } from "../../utils/swalSetting";

const BASE_URL = import.meta.env.VITE_BASE_URL;

/**
 * - view: 目前方案
 * - change: 變更/降級
 * - upgrade: 升級
 */
const computePlanAction = (currentPlanId, targetPlanId) => {
  const fromId = currentPlanId || "plan_free";
  const toId = targetPlanId;

  // 前往方案明細
  if (fromId === toId) {
    return { type: "view", policy: "detail" };
  }

  // Free -> Paid：需要導付款頁
  if (fromId === "plan_free" && toId !== "plan_free") {
    return {
      type: "upgrade",
      policy: "requires_payment",
      reason: "free_to_paid",
    };
  }

  // Paid -> Free：到期降級(不立即失效)
  if (fromId !== "plan_free" && toId === "plan_free") {
    return { type: "change", policy: "scheduled", reason: "paid_to_free" };
  }

  // Month -> Year：立即升級
  if (fromId === "plan_pro_month" && toId === "plan_pro_year") {
    return { type: "upgrade", policy: "instant", reason: "month_to_year" };
  }

  // Year -> Month：立即變更
  if (fromId === "plan_pro_year" && toId === "plan_pro_month") {
    return { type: "change", policy: "instant", reason: "year_to_month" };
  }

  return { type: "change", policy: "detail", reason: "unknown" };
};

const getCtaText = (action) => {
  if (!action) return "選取方案";
  if (action.type === "view") return "目前方案";
  if (action.type === "change") return "選取方案";
  if (action.type === "upgrade") return "升級方案";
  return "選取方案";
};

const getModalCopy = (
  action,
  currentPlan,
  targetPlan,
  activeOrderNextBillingDateText,
) => {
  if (!action) return;

  // 目前方案
  if (action.type === "view") {
    return {
      title: "查看方案明細？",
      description: (
        <>
          你目前正在使用{" "}
          <span className="text-primary">
            {currentPlan?.title ?? "Free"} {currentPlan?.subtitle ?? "免費方案"}
          </span>
          。
          <br />
          點擊 <span className="text-primary">查看方案明細</span>{" "}
          前往方案明細頁。
        </>
      ),
      confirmText: "查看方案明細",
      cancelText: "關閉",
    };
  }

  //  Free -> Paid：前往付款
  if (action.policy === "requires_payment") {
    return {
      title: "確認升級方案",
      description: (
        <>
          你即將從{" "}
          <span className="text-primary">
            {currentPlan?.title ?? "Free"} {currentPlan?.subtitle ?? "免費方案"}
          </span>{" "}
          升級為{" "}
          <span className="text-primary">
            {targetPlan?.title ?? "Pro"} {targetPlan?.subtitle ?? ""}
          </span>
          。<br />
          確認後將前往付款流程完成訂閱。
        </>
      ),
      confirmText: "前往付款",
      cancelText: "取消",
    };
  }

  // Paid -> Free：到期後變更
  if (action.type === "change" && action.policy === "scheduled") {
    return {
      title: "確認變更方案",
      description: (
        <>
          你即將從{" "}
          <span className="text-primary">
            {currentPlan?.title ?? ""} {currentPlan?.subtitle ?? ""}
          </span>{" "}
          變更為{" "}
          <span className="text-primary">
            {targetPlan?.title ?? "Free"} {targetPlan?.subtitle ?? "免費方案"}
          </span>
          。<br />
          目前方案仍可使用至到期日，不會再進行下一期扣款。
        </>
      ),
      confirmText: "確認變更",
      cancelText: "取消",
    };
  }

  // 年 -> 月：立即變更
  if (action.reason === "year_to_month") {
    return {
      title: "確認變更方案",
      description: (
        <>
          你即將從{" "}
          <span className="text-primary">
            {currentPlan?.title ?? ""} {currentPlan?.subtitle ?? ""}
          </span>{" "}
          變更為{" "}
          <span className="text-primary">
            {targetPlan?.title ?? ""} {targetPlan?.subtitle ?? ""}
          </span>
          。<br />
          變更將立即生效，未使用的金額將退回。
        </>
      ),
      confirmText: "確認變更",
      cancelText: "取消",
    };
  }

  // 月 -> 年：立即升級
  if (action.reason === "month_to_year") {
    return {
      title: "確認升級方案",
      description: (
        <>
          你即將從{" "}
          <span className="text-primary">
            {currentPlan?.title ?? ""} {currentPlan?.subtitle ?? ""}
          </span>{" "}
          升級為{" "}
          <span className="text-primary">
            {targetPlan?.title ?? ""} {targetPlan?.subtitle ?? ""}
          </span>
          。<br />
          升級將立即生效，未使用的金額將退回。
        </>
      ),
      confirmText: "確認升級",
      cancelText: "取消",
    };
  }

  return null;
};

export default function PersonalPlanSwiper() {
  const userPlan = useSelector((state) => state.subscription.plan);
  const activeOrder = useSelector((state) => state.subscription.activeOrder);

  const [plans, setPlans] = useState([]);
  const [currentPlanId, setCurrentPlanId] = useState(
    userPlan?.id || "plan_free",
  );
  const [btnText, setBtnText] = useState([]);

  const [targetPlanId, setTargetPlanId] = useState(null);
  const [action, setAction] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [afterClose, setAfterClose] = useState(null);
  const closeModal = () => setIsModalOpen(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getPlans = useCallback(async () => {
    try {
      const res = await axios.get(`${BASE_URL}plans`);
      setPlans(res.data);
    } catch (error) {
      alert(error.response?.data.message || "無法取得訂閱方案");
    }
  }, []);

  useEffect(() => {
    getPlans();
  }, [getPlans]);

  useEffect(() => {
    setCurrentPlanId(userPlan?.id || "plan_free");
  }, [userPlan]);

  const handleCtaClick = (planId) => {
    const planAction = computePlanAction(currentPlanId, planId);
    setTargetPlanId(planId);
    setAction(planAction);
    setIsModalOpen(true);
  };

  const activeOrderNextBillingDateText = useMemo(() => {
    if (!activeOrder?.nextBillingDate) return "";
    return formatDate(activeOrder?.nextBillingDate, "slash");
  }, [activeOrder?.nextBillingDate]);

  const targetPlan = useMemo(
    () => plans.find((p) => p.id === targetPlanId) || null,
    [plans, targetPlanId],
  );

  const modalCopy = useMemo(() => {
    return getModalCopy(
      action,
      userPlan,
      targetPlan,
      activeOrderNextBillingDateText,
    );
  }, [action, userPlan, targetPlan, activeOrderNextBillingDateText]);

  const onConfirm = async () => {
    if (!action) return;

    try {
      setSubmitting(true);

      if (action.type === "view") {
        setAfterClose(() => () => navigate("/account/plan/detail"));
        closeModal();
        return;
      }

      if (action.type === "change" && action.policy === "scheduled") {
        await dispatch(switchPaidToFree());
        closeModal();
        showSwalToast({
          title: "成功停止續訂",
        });
        return;
      }

      if (action.reason === "year_to_month") {
        await dispatch(switchYearToMonth());
        closeModal();
        showSwalToast({ title: "成功變更方案" });
        return;
      }

      if (action.reason === "month_to_year") {
        await dispatch(upgradeMonthToYear());
        closeModal();
        showSwalToast({ title: "成功升級方案" });
        return;
      }

      if (action.policy === "requires_payment") {
        setAfterClose(() => () => navigate(`/checkout/${targetPlanId}`));
        closeModal();
        return;
      }
    } catch (error) {
      showSwalToast({ title: "操作失敗，請稍後再試", variant: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Swiper 主容器 */}
      <Swiper
        className="personal-plan-swiper h-100"
        // initialSlide={1}
        // centeredSlides={true}
        slidesPerView={"auto"}
        spaceBetween={24}
        centerInsufficientSlides={true}
        centeredSlidesBounds={true}
        resistanceRatio={0}
        watchOverflow={true}
        breakpoints={{ 992: { spaceBetween: 40 } }}
      >
        {/* 多個 Slides */}
        {plans.map((plan, index) => {
          const planAction = computePlanAction(currentPlanId, plan.id);
          const isCurrent = plan.id === currentPlanId;

          return (
            <SwiperSlide key={plan.id} className="swiper-slide h-auto">
              <div
                className={`bg-gray-0 p-6 border ${isCurrent ? "border-2 border-primary" : "border-gray-100"} rounded-4 d-flex flex-column h-100`}
              >
                <div>
                  {/* 方案名稱 */}
                  <div className="pb-6 border-bottom border-gray-400 mb-8">
                    <div className="d-flex justify-content-between mb-6">
                      <span
                        className={`badge ${plan.title === "Free" ? "text-gray-700" : "bg-secondary text-gray-0"} border border-gray-500 px-md-4 fs-s fs-md-l`}
                      >
                        {plan.title}
                      </span>
                      <span className="fs-s fs-md-l fw-bold text-gray-500">
                        {plan.subtitle}
                      </span>
                    </div>
                    <h3>
                      <span className="text-gray-1000 fs-4xl fs-md-5xl">
                        NT$ {plan.price}
                      </span>
                      <span className="text-gray-500 lh-base fw-normal fs-m fs-md-xl">
                        / {plan.billing?.unit}
                      </span>
                    </h3>
                  </div>
                  {/* 方案內容 */}
                  <ul className="list-unstyled mb-8">
                    {plan.featuresShort.map((feature, index) => (
                      <li key={index} className="mb-3">
                        <span
                          className={`material-symbols-outlined align-bottom ${plan.title === "Free" ? "text-gray-500" : "text-secondary"} me-4`}
                        >
                          check
                        </span>
                        <span className="text-gray-1000">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* CTA 按鈕 */}
                <button
                  type="button"
                  className={`btn btn-outline-gray-400 fs-m fs-md-xl py-md-4 mt-auto w-100`}
                  onClick={() => handleCtaClick(plan.id)}
                >
                  {getCtaText(planAction)}
                </button>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <PlanActionModal
        title={modalCopy?.title}
        description={modalCopy?.description}
        confirmText={modalCopy?.confirmText}
        cancelText={modalCopy?.cancelText}
        submitting={submitting}
        onConfirm={onConfirm}
        open={isModalOpen}
        onClosed={() => {
          closeModal();
        }}
        afterClose={afterClose}
      />
    </>
  );
}
