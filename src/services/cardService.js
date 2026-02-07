import { apiClient } from "@/services/apiClient";

export const getCards = async (cardBoxId) => {
  const response = await apiClient.get(`/cards/`, {
    params: { card_box_id: cardBoxId },
  });
  return response;
};

export const deleteCards = async (cardIdSet = new Set()) => {
  const ids = Array.from(cardIdSet);
  if (ids.length === 0) return;
  const deletePromises = ids.map((id) => apiClient.delete(`/cards/${id}`));
  const response = await Promise.all(deletePromises);

  return response;
};
