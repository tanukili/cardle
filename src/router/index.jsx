import { createHashRouter } from "react-router-dom";
import Home from "@/pages/Home";
import SignUp from "@/pages/SignUp";
import Login from "@/pages/Login";
import Features from "@/pages/Features";

import Subscription from "@/pages/subscription/Detail";
import SubscriptionCheckout from "@/pages/subscription/Checkout";
import SubscriptionSuccess from "@/pages/subscription/Success";

import AccountCenter from "@/pages/account/Center";
import AccountProfile from "@/pages/account/Profile";
import AccountPlan from "@/pages/account/Plan";
import AccountPlanDetail from "@/pages/account/PlanDetail";
import AccountPlanUpgrade from "@/pages/account/PlanUpgrade";

import UserDashboard from "@/pages/user/Dashboard";
import UserBookshelf from "@/pages/user/bookshelf/BookshelfIndex";
import UserCalendar from "@/pages/user/bookshelf/Calendar";
import UserPomodoroTimer from "@/pages/user/bookshelf/PomodoroTimer";
import UserLearningTopics from "@/pages/user/bookshelf/LearningTopics";
import UserCardBoxes from "@/pages/user/CardBoxes";
import UserBoardList from "@/pages/user/board/BoardList";
import UserBoard from "@/pages/user/board/Board";
import UserArticleList from "@/pages/user/article/ArticleList";
import UserArticleDetail from "@/pages/user/article/ArticleDetail";

import HomeLayout from "@/layouts/HomeLayout";
import AccountLayout from "@/layouts/account/AccountLayout";
import UserLayout from "@/layouts/user/UserLayout";

const router = createHashRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true, // 預設首頁
        element: <Home />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "features",
        element: <Features />,
      },
      {
        path: "subscription",
        children: [
          {
            index: true,
            element: <Subscription />,
          },
          {
            path: "checkout/:id",
            element: <SubscriptionCheckout />,
          },
          {
            path: "success/:orderId",
            element: <SubscriptionSuccess />,
          },
        ],
      },
    ],
  },
  // 6-2 相關
  {
    path: "/account",
    element: <AccountLayout />,
    children: [
      {
        index: true,
        element: <AccountCenter />,
      },
      {
        path: "profile",
        element: <AccountProfile />,
      },
      {
        path: "plan",
        children: [
          {
            index: true,
            element: <AccountPlan />,
          },
          {
            path: "detail",
            element: <AccountPlanDetail />,
          },
          {
            path: "upgrade",
            element: <AccountPlanUpgrade />,
          },
        ],
      },
    ],
  },
  {
    path: "user",
    element: <UserLayout />,
    children: [
      {
        index: true,
        element: <UserDashboard />,
      },
      {
        path: "bookshelf",
        element: <UserBookshelf />,
        children: [
          {
            index: true,
            element: <UserCalendar />,
          },
          {
            path: "pomodoro",
            element: <UserPomodoroTimer />,
          },
          {
            path: "topics",
            element: <UserLearningTopics />,
          },
        ],
      },
      {
        path: "card-boxes",
        element: <UserCardBoxes />,
      },
      {
        path: "boards",
        children: [
          {
            index: true,
            element: <UserBoardList />,
          },
          {
            path: ":boardId",
            element: <UserBoard />,
          },
        ],
      },
      {
        path: "articles",
        children: [
          {
            index: true,
            element: <UserArticleList />,
          },
          {
            path: ":articleId",
            element: <UserArticleDetail />,
          },
        ],
      },
    ],
  },
  { basename: "/cardle" },
]);

export default router;
