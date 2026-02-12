import { useState, useEffect } from "react";

const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
};

// 根據斷點設定欄數（去抖動）
// config: { xl: 3 } 表示 xl 起為 3 欄
export const useColumnConfig = (config = {}) => {
  const [columns, setColumns] = useState(1);
  const defaultConfig = { xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 4 };
  const mergedConfig = { ...defaultConfig, ...config };

  useEffect(() => {
    // 更新欄數
    const updateColumns = () => {
      const width = window.innerWidth;
      let current = "xs";
      for (const name of Object.keys(breakpoints)) {
        if (width >= breakpoints[name]) current = name;
      }
      setColumns(mergedConfig[current] || 1);
    };

    let timeoutId = null;
    const handleResize = () => {
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        updateColumns();
      }, 200);
    };

    // 初始化
    updateColumns();

    window.addEventListener("resize", handleResize);

    // 清除事件監聽
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, [config]);

  return columns;
};
