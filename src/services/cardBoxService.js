import { apiClient } from "@/services/apiClient";

// 後續優化：使用 defer、data shaping

// 取得單一卡片盒與其卡片
export const getCardBoxDetail = async (cardBoxId) => {
  const [cardBox, cards] = await Promise.all([
    apiClient.get(`/cardBoxes/${cardBoxId}`),
    apiClient.get(`/cards/`, { params: { card_box_id: cardBoxId } }),
  ]);

  return {
    cardBox,
    cards,
  };
};
