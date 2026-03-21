import { useLoaderData, Link, useRevalidator } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { showSwalToast } from '@/utils/swalSetting';
import { deleteCards } from '@/services/cardService';
import BaseCard from '@/components/card/BaseCard';
import MasonryCards from '@/components/card/MasonryCards';
import CardBoxModal from '@/components/card/CardBoxModal';
import CardModal from '@/components/card/CardModal';

export default function CardBoxDetail() {
  const { cardBox, cards } = useLoaderData();
  const revalidator = useRevalidator();
  const [searchValue, setSearchValue] = useState('');
  const [isBaseCardMode, setIsBaseCardMode] = useState(false);

  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState(new Set());

  const toggleSelectMode = () => {
    setIsSelectMode(!isSelectMode);
    setSelectedIds(new Set());
  };

  const handleSelectCard = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteCards = async () => {
    setIsDeleting(true);
    try {
      await deleteCards(selectedIds);
      showSwalToast({ title: '刪除成功' });
      setSelectedIds(new Set());
      revalidator.revalidate();
    } catch (err) {
      const errorMsg = `${err.response.status} ${err.response.statusText}`;
      showSwalToast({ title: `刪除失敗，${errorMsg}`, variant: 'error' });
    } finally {
      setIsDeleting(false);
    }
  };

  // 卡片封面伸縮
  const [isCoverSmall, setIsCoverSmall] = useState(false);
  const coverSentinelRef = useRef(null);
  const isTransitioningRef = useRef(false);
  const coverImageRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (isTransitioningRef.current) return;

        const shouldBeSmall = !entry.isIntersecting;
        setIsCoverSmall(shouldBeSmall);
        isTransitioningRef.current = true;

        // 冷卻時間 (大於等於 CSS transition)
        setTimeout(() => {
          isTransitioningRef.current = false;
        }, 500);
      },
      {
        rootMargin: '-10px 0px 0px 0px',
      },
    );

    if (coverSentinelRef.current) {
      observer.observe(coverSentinelRef.current);
    }

    return () => observer.disconnect();
  }, [isCoverSmall]);

  // to do：統一使用 Spinner 元件
  const Spinner = (showSpinner, extraClass = '') => {
    return showSpinner ? (
      <span className={`spinner-border spinner-border-sm me-2 ${extraClass}`} role="status" aria-hidden="true" />
    ) : null;
  };

  const cardModalRef = useRef(null);
  const [editCard, setEditCard] = useState(null);
  const openCardModal = (card = null) => {
    setEditCard(card);
    cardModalRef.current?.show();
  };

  return (
    <>
      <div ref={coverSentinelRef} className="w-100" style={{ height: '1px' }} />
      <section className="card-box-detail container position-sticky pt-6 bg-white z-2 mb-6 mb-lg-8">
        <Link
          to="/user/card-boxes"
          className="mb-4 py-1 pe-2 fs-s text-gray-600 d-inline-flex align-items-center mb-lg-10 fs-lg-m px-lg-4 py-lg-2"
        >
          <span className="material-symbols-outlined icon-sm me-2_5 me-lg-3 ">arrow_back_ios_new</span>
          返回卡片盒列表
        </Link>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="fs-2xl fs-lg-3xl">{cardBox.title}</h1>
          {!cardBox.cover_url && (
            <button
              className="btn btn-icon-primary btn-gray-0 p-2 rounded-circle border-primary-200"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#updateCardBoxModal"
            >
              <span className="material-icons-outlined d-block">edit</span>
            </button>
          )}
        </div>
        {cardBox.cover_url && (
          <div
            className={`card-box-detail-cover position-relative rounded-1 overflow-hidden ${
              isCoverSmall ? 'cover-small' : 'mb-6 mb-lg-8'
            }`}
          >
            <img
              className="w-100 h-100 object-fit-cover"
              ref={coverImageRef}
              loading="lazy"
              src={cardBox.cover_url}
              alt={cardBox.title}
            />
            <button
              className="btn btn-icon-primary btn-gray-0 p-2 rounded-circle position-absolute top-0 end-0 m-3 m-lg-6 "
              data-bs-toggle="modal"
              data-bs-target="#updateCardBoxModal"
            >
              <span className="material-icons-outlined d-block">edit</span>
            </button>
          </div>
        )}
        <div className="row g-4 gx-md-3">
          <div className="col-md-auto order-md-2">
            <div className="form-check form-switch my-auto h-100 d-flex align-items-center ms-md-5">
              <input
                className="form-check-input ms-auto me-3"
                type="checkbox"
                role="switch"
                id="cardModeSwitch"
                checked={isBaseCardMode}
                onChange={() => setIsBaseCardMode(!isBaseCardMode)}
              />
              <label className="form-check-label text-primary" htmlFor="cardModeSwitch">
                詳細模式
              </label>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="d-sm-flex">
              <div className="form-control-container with-icon flex-grow-1" style={{ maxWidth: '320px' }}>
                <input
                  id="searchCardBox"
                  type="text"
                  className="form-control"
                  aria-describedby="searchCardBox"
                  placeholder="輸入要搜尋的卡片"
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
              <p className="text-gray-700 mt-4 text-nowrap my-sm-auto ms-sm-4 ms-xl-8">
                共<span className="mx-1 fw-bold tracking-2">{cards.length}</span>
                個卡片
              </p>
            </div>
          </div>
          {isSelectMode && (
            // 選取刪除
            <div className="col-6 col-md-auto ms-auto text-end ">
              <p className="text-gray-700 d-flex align-items-center h-100">
                已選取
                <span className="fw-bold mx-1 tracking-2">{selectedIds.size}</span>
                個卡片
              </p>
            </div>
          )}
          {isSelectMode ? (
            // 選取刪除
            <div className="col-6 col-md-auto text-end order-md-1">
              <button
                className="btn btn-primary"
                type="button"
                onClick={handleDeleteCards}
                disabled={selectedIds.size === 0 || isDeleting}
              >
                {Spinner(isDeleting, 'me-2')}
                刪除卡片
              </button>
            </div>
          ) : (
            <div className="col-md-auto order-md-1">
              <button className="btn btn-outline-primary w-100" type="button" onClick={() => openCardModal()}>
                新增卡片
              </button>
            </div>
          )}
          <div className={`col-md-auto  ${isSelectMode ? '' : 'ms-auto'}`}>
            <button className="btn btn-outline-primary w-100" type="button" onClick={toggleSelectMode}>
              {isSelectMode ? '取消選取' : '選取'}
            </button>
          </div>
        </div>
        <span className="d-block border-bottom border-gray-200 mt-6 mt-lg-8"></span>
      </section>
      {/* 卡片列表 */}
      <section className="container pb-10">
        {cards.length === 0 && (
          <div className="alert alert-light mb-4 text-center" role="alert">
            {cards.length ? '沒有符合條件的卡片' : '目前沒有任何卡片'}
          </div>
        )}
        {isBaseCardMode ? (
          <MasonryCards
            data={cards}
            columnConfig={{ lg: 3, xl: 4 }}
            renderCard={(card) => (
              <BaseCard
                card={card}
                badges={cardBox.badges}
                mode="base"
                isSelectMode={isSelectMode}
                isSelected={selectedIds.has(card.id)}
                onSelect={handleSelectCard}
                onCardClick={() => openCardModal({ id: card.id, title: card.title, content: card.content })}
              />
            )}
          />
        ) : (
          <div className="row g-6">
            {cards.map((card) => (
              <div className="col-md-6 col-lg-4 col-xl-3" key={card.id}>
                <BaseCard
                  mode="titleOnly"
                  card={card}
                  isSelectMode={isSelectMode}
                  isSelected={selectedIds.has(card.id)}
                  onSelect={handleSelectCard}
                  onCardClick={() => openCardModal({ id: card.id, title: card.title, content: card.content })}
                />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 更新卡片盒 Modal */}
      <CardBoxModal
        cardBox={cardBox}
        isCreateMode={false}
        modalId="updateCardBoxModal"
        onSuccess={revalidator.revalidate}
      />
      {/* 卡片 Modal */}
      <CardModal ref={cardModalRef} editCard={editCard} cardBox={cardBox} onSuccess={revalidator.revalidate} />
    </>
  );
}
