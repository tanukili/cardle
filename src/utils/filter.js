/**
 * 格式化時間戳 (秒)
 * @param {number} timestamp unix timestamp (秒)
 * @param {'zh' | 'slash'} format 輸出格式
 * @returns {string}
 */
export const formatDate = (timestamp, format = "zh") => {
  if (!timestamp) return "";

  const date = new Date(timestamp * 1000);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  switch (format) {
    case "slash":
      return `${year}/${month}/${day}`;
    case "zh":
    default:
      return `${year} 年 ${month} 月 ${day} 日`;
  }
};

// nextBillingDate(秒) 往前一天
const calcPeriodEnd = (nextBillingDate) => {
  return Number(nextBillingDate) - 86400; // 60*60*24
};

/**
 * 訂單付款內容文字
 * @param {object} order 訂單
 * @returns {string}
 */
export const getOrderPeriodText = (order) => {
  const start = formatDate(order.subscribeDate, "slash");
  const endStamp = calcPeriodEnd(order.nextBillingDate);
  const end = formatDate(endStamp, "slash");

  const subtitle = order.plan.subtitle.replace("方案", "").trim();
  const planText = `${order.plan.title} ${subtitle}`;

  return `${start} - ${end} ${planText}`.trim();
};
