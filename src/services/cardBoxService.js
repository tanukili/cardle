import { apiClient } from '@/services/apiClient';

// 後續優化：使用 defer、data shaping
const defaultCardBox = {
  title: '',
  description: '',
  cover_url: '',
  type: 'normal',
  is_inbox: false,
  is_archived: false,
  is_favorite: false,
  ui: {
    color: 'secondary',
  },
};

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

// 取得預設
export const getDefaultCardBox = async (userId) => {
  const response = await apiClient.get('/cardBoxes', {
    params: { user_id: userId, type: 'default' },
  });
  return response;
};

// 取得最新
export const getLastestCardBoxes = async (userId, limit = 5) => {
  const response = await apiClient.get('/cardBoxes', {
    params: {
      user_id: userId,
      _limit: limit,
      // _sort: 'updated_at',
      _order: 'desc',
    },
  });
  return response;
};

// 取得所有
export const getCardBoxes = async (userId) => {
  const response = await apiClient.get('/cardBoxes', {
    params: { user_id: userId, is_archived: false },
  });
  return response;
};

// 新增卡片盒
export const createCardBox = async (cardBox) => {
  const ts = Math.floor(Date.now() / 1000);
  const payload = {
    id: `card_box_${ts}`,
    ...defaultCardBox,
    ...cardBox,
    created_at: ts,
    updated_at: ts,
  };

  const response = await apiClient.post('/cardBoxes', payload);
  return response;
};

// 更新卡片盒
export const updateCardBox = async (id, cardBox) => {
  const ts = Math.floor(Date.now() / 1000);
  const payload = {
    ...cardBox,
    updated_at: ts,
  };
  const response = await apiClient.patch(`/cardBoxes/${id}`, payload);
  return response;
};

// 軟刪除多個
export const deleteCardBoxes = async (cardBoxIdSet = new Set()) => {
  const ids = Array.from(cardBoxIdSet);
  if (ids.length === 0) return;
  const deletePromises = ids.map((id) => apiClient.patch(`/cardBoxes/${id}`, { is_archived: true }));
  const responses = await Promise.all(deletePromises);
  console.log(responses, 'responses');

  return responses;
};
