import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { getCardBoxes as fetchCardBoxesByUser, deleteCardBoxes } from '@/services/cardBoxService';
import CardBox from '@/components/card/CardBox';
import CardBoxModal from '@/components/card/CardBoxModal';
import CardModal from '@/components/card/CardModal';
import { showSwalToast } from '@/utils/swalSetting';

export default function CardBoxs() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [cardBoxes, setCardBoxes] = useState([]);
  const [defaultCardBox, setDefaultCardBox] = useState(null);
  const userInfo = useSelector((state) => state.user.userInfo);

  const getCardBoxes = async () => {
    try {
      const response = await fetchCardBoxesByUser(userInfo?.id);
      setCardBoxes(response);
      setDefaultCardBox(response.find((cb) => cb.type === 'default'));
    } catch (error) {
      console.error('Fetching card boxes:', error);
    }
  };

  
  useEffect(() => {
    if (!userInfo?.id) return;
    getCardBoxes();
  }, [userInfo?.id]);

  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const switchShowFavoritesOnly = (e) => {
    const { checked: isToShowFavorites } = e.target;
    setShowFavoritesOnly(isToShowFavorites);

    setSelectedIds((prev) => {
      if (prev.size === 0 || !isToShowFavorites) return prev;

      const filteredSelectedIds = [...prev].filter((id) => {
        const targetCard = cardBoxes.find((cb) => cb.id === id);
        return targetCard && targetCard.is_favorite;
      });

      return new Set(filteredSelectedIds);
    });
  };

  const filteredCardBoxes = showFavoritesOnly ? cardBoxes.filter((cb) => cb.is_favorite) : cardBoxes;

  const [searchValue, setSearchValue] = useState('');

  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState(new Set()); // Set（集合，不重複）

  const handleSelect = (id, type) => {
    if (type === 'default') {
      showSwalToast({ title: '預設卡片盒無法刪除', variant: 'error' });
      return;
    }
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const toggleSelectMode = () => {
    setIsSelectMode(!isSelectMode);
    setSelectedIds(new Set());
  };

  const deleteSelectedCardBoxes = async () => {
    try {
      const response = await deleteCardBoxes(selectedIds);
      showSwalToast({ title: '刪除成功' });
      setSelectedIds(new Set());
      getCardBoxes();
    } catch (err) {
      const errorMsg = `${err.response.status} ${err.response.statusText}`;
      showSwalToast({ title: `刪除失敗，${errorMsg}`, variant: 'error' });
    }
  };

  const cardModalRef = useRef(null);
  const openCardModal = () => {
    cardModalRef.current?.show();
  };

  return (
    <>
      <section className="container pt-6 position-sticky bg-white z-2 mb-10" style={{ top: '-28px' }}>
        <Link
          to="/user"
          className="mb-4 py-1 pe-2 fs-s text-gray-600 d-inline-flex align-items-center mb-lg-10 fs-lg-m px-lg-4 py-lg-2"
        >
          <span className="material-symbols-outlined icon-sm me-2_5 me-lg-3 ">arrow_back_ios_new</span>
          返回個人儀表板
        </Link>
        <div className="d-flex justify-content-between align-items-center mb-6 ">
          <h1 className="fs-2xl fs-lg-3xl">卡片盒</h1>
          <div className="form-check form-switch d-flex align-items-center">
            <input
              className="form-check-input me-3"
              type="checkbox"
              role="switch"
              id="favoriteSwitch"
              checked={showFavoritesOnly}
              onChange={switchShowFavoritesOnly}
            />
            <label className="form-check-label text-primary" htmlFor="favoriteSwitch">
              僅顯示最愛卡片盒
            </label>
          </div>
        </div>
        <div className="row g-3 gx-4 gx-lg-3">
          <div className="col-lg-5 me-n4">
            <div className="d-md-flex">
              <div className="form-control-container with-icon flex-grow-1" style={{ maxWidth: '320px' }}>
                <input
                  id="searchCardBox"
                  type="text"
                  className="form-control"
                  aria-describedby="searchCardBox"
                  placeholder="輸入要搜尋的卡片盒"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <a
                  href="#"
                  className="input-clearup"
                  onClick={(e) => {
                    e.preventDefault();
                    setSearchValue('');
                  }}
                >
                  <span className="material-symbols-outlined">close</span>
                </a>
              </div>
              <p className="text-gray-700 mt-6 text-nowrap my-md-auto ms-md-4 ms-xl-8">
                共<span className="mx-1 fw-bold tracking-2">{filteredCardBoxes.length}</span>
                個卡片盒
              </p>
            </div>
          </div>
          {isSelectMode ? (
            // 選取刪除
            <div className="col-lg-auto mt-6 mt-lg-3 ms-lg-auto">
              <div className="d-flex align-items-center justify-content-between">
                <p className="text-gray-700 me-6">
                  已選取
                  <span className="fw-bold mx-1 tracking-2">{selectedIds.size}</span>
                  個卡片盒
                </p>
                <button
                  className="btn btn-primary d-flex align-items-center"
                  type="button"
                  onClick={deleteSelectedCardBoxes}
                  disabled={selectedIds.size === 0}
                >
                  <span className="material-icons-outlined me-3">delete</span>
                  刪除
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="col-6 col-lg-auto mt-6 mt-lg-3 order-lg-1">
                <button
                  className="btn btn-outline-primary w-100"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#createCardBoxModal"
                >
                  新增卡片盒
                </button>
              </div>
              <div className="col-6 col-lg-auto mt-6 mt-lg-3 order-lg-2">
                <button className="btn btn-outline-primary w-100" type="button" onClick={openCardModal}>
                  新增卡片
                </button>
              </div>
            </>
          )}
          <div className={`col-lg-auto  ${isSelectMode ? '' : 'ms-auto'}`}>
            <button className="btn btn-outline-primary w-100" type="button" onClick={toggleSelectMode}>
              {isSelectMode ? '取消選取' : '選取'}
            </button>
          </div>
          <div className={`col-lg-auto order-lg-3 ${isSelectMode ? 'd-lg-none' : ''}`}>
            <div className="form-select-container">
              <a
                className="position-absolute top-50 translate-middle text-primary lh-1"
                style={{ left: 'calc(50% - 56px)' }}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <span className="material-symbols-outlined">sort</span>
              </a>
              <select
                className="form-select text-center py-2 px-13"
                aria-label="排序選單"
                defaultValue="created_at"
                id="sortSelect"
              >
                <option value="created_at">建立時間</option>
                <option value="updated_at">更新時間</option>
                <option value="card_count">卡片數量</option>
              </select>
            </div>
          </div>
        </div>
        <span className="d-block border-bottom border-gray-200 mt-6"></span>
      </section>
      {/* 卡片盒列表 */}
      <div className="container pb-14 pb-lg-20">
        {filteredCardBoxes.length ? (
          <div className="row gy-6">
            {filteredCardBoxes.map((cardBox) => (
              <div key={cardBox.id} className="col-md-6 col-lg-4 col-xl-3">
                <CardBox
                  cardBox={cardBox}
                  isSelectMode={isSelectMode}
                  isSelected={selectedIds.has(cardBox.id)}
                  onSelect={handleSelect}
                  isFavorite={cardBox.is_favorite}
                  onUpdateSuccess={getCardBoxes}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="alert alert-light mb-4 text-center" role="alert">
            {cardBoxes.length ? '沒有符合條件的卡片盒' : '目前沒有任何卡片盒'}
          </div>
        )}
      </div>

      <CardBoxModal isCreateMode modalId="createCardBoxModal" onSuccess={getCardBoxes} />

      {/* 卡片 Modal */}
      <CardModal ref={cardModalRef} cardBox={defaultCardBox} onSuccess={getCardBoxes} />
    </>
  );
}
