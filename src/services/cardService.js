import { apiClient } from "@/services/apiClient";

export const getCards = async (cardBoxId) => {
  const response = await apiClient.get(`/cards/`, {
    params: { card_box_id: cardBoxId },
  });
  return response;
};

export const createCard = async (card, cardBoxId) => {
  const ts = Math.floor(Date.now() / 1000);
  const payload = {
    ...card,
    id: `card_${ts}`,
    created_at: ts,
    updated_at: ts,
    card_box_id: cardBoxId,
    content_format: "markdown",
    status: "active",
  };

  const response = await apiClient.post("/cards", payload);

  return response;
};

export const deleteCards = async (cardIdSet = new Set()) => {
  const ids = Array.from(cardIdSet);
  if (ids.length === 0) return;
  const deletePromises = ids.map((id) => apiClient.delete(`/cards/${id}`));
  const response = await Promise.all(deletePromises);

  return response;
};
