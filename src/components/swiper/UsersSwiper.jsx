import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const users = [
  {
    img: "features/student.png",
    title: "學生",
    desc: "整理課堂筆記與讀書重點",
  },
  {
    img: "features/researcher.png",
    title: "研究者",
    desc: "管理文獻與研究資料",
  },
  {
    img: "features/professional.png",
    title: "專業人士",
    desc: "建立知識庫與工作紀錄",
  },
  {
    img: "features/team.png",
    title: "團隊",
    desc: "協作與共享知識",
  },
];

export default function UsersSwiper() {
  return (
    <Swiper
      className="users-swiper h-100"
      slidesPerView={"auto"}
      spaceBetween={24}
      centeredSlides={true}
      centerInsufficientSlides={true}
      centeredSlidesBounds={true}
      resistanceRatio={0}
      watchOverflow={true}
      breakpoints={{ 992: { spaceBetween: 40 } }}
    >
      {users.map((user) => (
        <SwiperSlide
          key={user.title}
          className="swiper-slide h-auto text-center"
        >
          <div className="border border-gray-400 rounded-4 h-md-300 mb-4 mb-md-8 users-img d-flex align-items-center justify-content-center">
            <img src={user.img} alt={user.title} />
          </div>
          <h4 className="fs-l fs-md-3xl fw-bold mb-1 mb-md-4">{user.title}</h4>
          <p className="fs-m fs-md-xl text-gray-600">{user.desc}</p>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
