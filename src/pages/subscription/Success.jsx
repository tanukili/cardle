import axios from 'axios';
import { useEffect, useState } from 'react';
import {useParams, useLocation} from 'react-router-dom';
const BASE_URL = import.meta.env.VITE_BASE_URL;
export default function Success() {
  const location = useLocation();
  const { order, payment } = location.state || {};
  const { orderId } = useParams(); 
  const isFree = order?.price === 0;
  
  const [orders, setOrders] = useState(null);
  const [Unfo, setUnfo] = useState(null);

  useEffect(()=>{
    const getOrder = async()=>{
      try {
        const res = await axios.get(`${BASE_URL}orders/${orderId}`)
        setOrders(res.data);
      } catch (err) {
       alert("找不到訂單", err);
      }
    }
    const getUserInfo = async()=>{
      try {
        const res = await axios.get(`${BASE_URL}users/${order.userId}`)
        setUnfo(res.data);
      } catch (err) {
       alert("找不到user", err);
      }
    }
    getUserInfo()
    getOrder()
},[])
    if (!order) return <div>找不到訂單資訊......</div>;
  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="flex-grow-1 d-flex align-items-center">
        <div className="container text-center py-16">
          {/* {JSON.stringify(order)} */}
          <span className="material-symbols-outlined display-1">
            check_circle
          </span>
          <div className="d-flex flex-column align-items-center">
            <>
            {!isFree ?(
              <>
              <p className="mb-2">感謝您訂閱{order.planId}方案，我們已成功處理您的付款。<br />確認信件將寄送至{Unfo?.email}！</p>
              <button type="button" className="btn btn-dark py-3 fw-bold">前往儀錶板</button>
              </>
          ):(<><h2 className="mb-2">免費方案已啟用</h2>
            <p>您現在使用的是免費方案，隨時可以升級。</p>
          </>)}
            </>
          </div>
        </div>
      </main>
    </div>

  )
  
}
