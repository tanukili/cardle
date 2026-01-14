import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import ProgressList from "@/components/bookshelf/ProgressList";

export default function BookshelfIndex() {
  const MOCK_EVENTS = [
    { date: "2025-10-01", status: "done" },
    { date: "2025-10-02", status: "done" },
    { date: "2025-10-04", status: "done" },
    { date: "2025-10-05", status: "done" },
    { date: "2025-10-06", status: "done" },
    { date: "2025-10-07", status: "done" },
    { date: "2025-10-08", status: "done" },
    { date: "2025-10-09", status: "done" },
    { date: "2025-10-10", status: "rest" },
    { date: "2025-10-11", status: "rest" },
    { date: "2025-10-12", status: "rest" },
    { date: "2025-10-13", status: "done" },
    { date: "2025-10-30", status: "highlight" }, // 範例：當天高亮背景
  ];

  const learningResources = [
    {
      id: "res_css_book_001",
      title: "金魚都能懂的 CSS 必學屬性",
      type: "book", // book、video、podcast、network
      status: "completed", // not_started、learning、paused、completed
      is_favorite: false,
      link: {
        url: "https://www.books.com.tw/...",
        text: "",
      },
      note: "切版基礎必讀",

      // 進度呈現
      progress: {
        current: 12,
        total: 12,
        unit: "chapter", // chapter(章), page(頁), minute(分)
      },

      // 日期追蹤
      dates: {
        start_at: 1701388800,
        target_end_at: 1706832000,
        actual_end_at: 1707264000,
      },

      tag_ids: ["tag_frontend", "tag_layout"],

      created_at: 1701388000,
      updated_at: 1707264000,
    },
    {
      id: "res_ts_course_002",
      title: "TypeScript 中文基礎課程",
      type: "video",
      status: "learning",
      is_favorite: true,
      link: {
        url: "https://www.tenlong.com.tw/products/9786263332973",
        text: "天瓏書店",
      },
      note: "",

      progress: {
        current: 360, // 單位為「分鐘」
        total: 720,
        unit: "minute",
      },

      dates: {
        start_at: 1703635200,
        target_end_at: 1706659200,
        actual_end_at: null,
      },

      tag_ids: ["tag_js"],

      created_at: 1703635000,
      updated_at: 1704000000,
    },
  ];

  const progressResources = learningResources.map((resource) => ({
    id: resource.id,
    type: resource.type,
    title: resource.title,
    completedUnit: resource.progress.current,
    totalUnit: resource.progress.total,
  }));

  const resourceTypes = [
    {
      type: "book",
      text: "讀書筆記",
      iconName: "book",
    },
    {
      type: "video",
      text: "線上課程",
      iconName: "live_tv",
    },
    {
      type: "podcast",
      text: "Podcast",
      iconName: "music_video",
    },
  ];

  const resourceColMap = [
    {
      correspondingKey: "is_favorite",
      text: "最愛",
      icon: "",
    },
    {
      correspondingKey: "title",
      text: "標題",
      icon: "",
    },
    {
      correspondingKey: "type",
      text: "類型",
      icon: "",
    },
    {
      correspondingKey: "status",
      text: "狀態",
      icon: "",
    },
    {
      correspondingKey: "tags",
      text: "資源標籤",
      icon: "",
    },
    {
      correspondingKey: "progress_total",
      text: "所有單元 / 時長",
      icon: "",
    },
    {
      correspondingKey: "progress_current",
      text: "完成單元 / 時長",
      icon: "",
    },
    {
      correspondingKey: "progress_rate",
      text: "完成率",
      icon: "",
    },
    {
      correspondingKey: "start_at",
      text: "開始日期",
      icon: "",
    },
    {
      correspondingKey: "target_end_at",
      text: "預計完成",
      icon: "",
    },
    {
      correspondingKey: "actual_end_at",
      text: "完成日期",
      icon: "",
    },
    {
      correspondingKey: "link",
      text: "連結",
      icon: "",
    },
    {
      correspondingKey: "note",
      text: "備註",
      icon: "",
    },
  ];

  const displayResources = learningResources.map((resource) => {
    const {
      id,
      title,
      type,
      status,
      is_favorite,
      link,
      note,
      progress,
      dates,
      tag_ids,
    } = resource;

    return {
      id,
      title,
      type,
      status,
      is_favorite,
      link,
      note,
      progress_total: progress.total,
      progress_current: progress.current,
      progress_rate: `${(progress.current / progress.total) * 100} %`,
      start_at: dates.start_at,
      target_end_at: dates.target_end_at,
      actual_end_at: dates.actual_end_at,
      tags: [],
    };
  });

  const typeMap = {
    book: "書籍",
    video: "影音",
    podcast: "Podcast",
    network: "網路資源",
  };
  const statusMap = {
    completed: "完成",
    learning: "學習中",
    not_started: "未開始",
    paused: "已暫停",
  };

  const formatDate = (unix) => {
    const date = new Date(unix * 1000);

    const formattedDate = date.toLocaleDateString("zh-TW", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    return formattedDate;
  };

  const todoList = [
    {
      isCompleted: true,
      content: "JS 課前影音",
      pomoNum: 2,
    },
    {
      isCompleted: true,
      content: "Leetcode 刷題",
      pomoNum: 0,
    },
    {
      isCompleted: false,
      content: "duolingo 英文三個單元",
      pomoNum: 0,
    },
  ];

  return (
    <main>
      <section className="container mt-6">
        <h2 className="fs-xl mb-8 pb-6 border-bottom border-gray-200 fs-md-3xl lh-md-sm mb-md-10">
          我的書單
        </h2>
        <ul className="nav nav-pills mb-10">
          <li className="nav-item">
            <Link className="nav-link" to="/user/bookshelf">
              學習日曆
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/user/bookshelf/pomodoro">
              番茄鐘
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/user/bookshelf/topics">
              學習主題
            </Link>
          </li>
        </ul>
        <div className="row">
          <div className="col-lg-9">
            <Outlet />
          </div>
          <div className="col-lg-3">
            <div className="card">
              <div className="card-body pb-10">
                <h3 className="mb-6">今日任務</h3>
                <ul className="list-group row-gap-6 mb-6">
                  {todoList.map((todo, index) => (
                    <li key={index} className="form-check d-flex items-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`checkDefault-${index}`}
                        checked={todo.isCompleted}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`checkDefault-${index}`}
                      >
                        {todo.content}
                      </label>
                      {Array.from({ length: todo.pomoNum }, (_, i) => (
                        <span key={i} className="material-symbols-outlined">
                          timer
                        </span>
                      ))}
                    </li>
                  ))}
                </ul>
                <button className="btn btn-outline-primary w-100" type="button">
                  新增
                </button>
              </div>
              <div className="card-footer pt-10">
                <ul className="list-group row-gap-6">
                  <li className="d-flex justify-content-between">
                    <span>待完成任務：</span>
                    <span>
                      {todoList.filter((todo) => !todo.isCompleted).length}
                    </span>
                  </li>
                  <li className="d-flex justify-content-between">
                    <span>已專注時間：</span>
                    <span>
                      {todoList.reduce(
                        (acc, todo) => acc + todo.pomoNum * 25,
                        0
                      )}
                      分鐘
                    </span>
                  </li>
                  <li className="d-flex justify-content-between">
                    <span>已完成任務：</span>
                    <span>
                      {todoList.filter((todo) => todo.isCompleted).length}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container py-14 py-lg-20">
        <h2 className="fs-xl mb-8 pb-6 border-bottom border-gray-200 fs-md-3xl lh-md-sm mb-md-10">
          學習進度追蹤
        </h2>
        <div className="scrollbar-none w-100 overflow-scroll mb-8 mb-md-10">
          <nav
            className="nav nav-pills nav-fill gap-6"
            style={{ width: "max-content" }}
          >
            <button
              className="nav-link border border-primary active"
              aria-current="page"
              type="button"
            >
              顯示全部
            </button>
            {resourceTypes.map(({ type, text, iconName }) => (
              <button
                className="nav-link border border-primary d-flex align-items-center"
                type="button"
                key={type}
              >
                <span className="material-symbols-outlined me-3">
                  {iconName}
                </span>
                {text}
              </button>
            ))}
          </nav>
        </div>
        <ul className="list-unstyled mb-0 d-flex flex-column gap-6">
          <ProgressList learningResources={progressResources} />
        </ul>
      </section>
      <section className="container py-14 py-lg-20">
        <h2 className="fs-xl mb-8 pb-6 border-bottom border-gray-200 fs-md-3xl lh-md-sm mb-md-10">
          書單一覽
        </h2>
        <div className="d-flex justify-content-end gap-3 mb-2">
          <button className="btn btn-primary w-100 w-md-auto" type="submit">
            新增書單
          </button>
          <button
            className="btn btn-outline-primary align-items-center p-2 px-xl-4 ms-4 ms-lg-0"
            type="button"
          >
            <span>多選刪除</span>
          </button>
        </div>
        <div className="table-responsive">
          <table className="table">
            <thead className="table-primary">
              <tr>
                <th scope="col" className="text-nowrap"></th>
                {resourceColMap.map((col) => (
                  <th
                    scope="col"
                    key={col.correspondingKey}
                    className="text-nowrap"
                  >
                    {col.text}
                  </th>
                ))}
                <th scope="col" className="text-nowrap"></th>
              </tr>
            </thead>
            <tbody>
              {displayResources.map((resources) => (
                <tr key={resources.id}>
                  <th scope="row">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={resources.id}
                      value=""
                      aria-label="selected"
                    />
                  </th>
                  {resourceColMap.map(({ correspondingKey }) => {
                    if (correspondingKey === "is_favorite") {
                      return (
                        <td>
                          <input
                            type="checkbox"
                            className="btn-check"
                            id={`btn-check-${resources.id}`}
                            autoComplete="off"
                            checked={resources.is_favorite}
                          />
                          <label
                            className="btn"
                            htmlFor={`btn-check-${resources.id}`}
                            style={{
                              border: "none",
                            }}
                          >
                            <span
                              className="material-symbols-outlined text-warning"
                              style={{
                                fontVariationSettings: `'FILL' ${Number(
                                  resources.is_favorite
                                )}`,
                              }}
                            >
                              star
                            </span>
                          </label>
                        </td>
                      );
                    }
                    if (correspondingKey === "link") {
                      return (
                        <td key={correspondingKey}>
                          <a
                            href={resources[correspondingKey].url}
                            className="link-secondary"
                            target="_blank"
                          >
                            {resources[correspondingKey]?.text
                              ? resources[correspondingKey].text
                              : resources[correspondingKey].url}
                          </a>
                        </td>
                      );
                    }
                    if (correspondingKey === "type") {
                      return <td>{typeMap[resources[correspondingKey]]}</td>;
                    }
                    if (correspondingKey === "status") {
                      return <td>{statusMap[resources[correspondingKey]]}</td>;
                    }
                    if (correspondingKey.includes("_at")) {
                      return <td>{formatDate(resources[correspondingKey])}</td>;
                    }
                    return (
                      <td key={correspondingKey}>
                        {resources[correspondingKey]}
                      </td>
                    );
                  })}
                  <td>
                    <span className="material-symbols-outlined me-3">
                      delete
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
