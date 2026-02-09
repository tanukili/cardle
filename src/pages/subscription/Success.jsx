import axios from 'axios';
import { useEffect, useState } from 'react';
import {useParams, useLocation} from 'react-router-dom';
const BASE_URL = import.meta.env.VITE_BASE_URL;
export default function Success() {
  const location = useLocation();
  const { order, payment } = location.state || {};
  const { orderId } = useParams(); 
  console.log(order.userId);
  
  const [orders, setOrders] = useState(null);
  const [Unfo, setUnfo] = useState(null);
  // getOrder()
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
    // http://localhost:4000/users/iI8fDrM
    getUserInfo()
    getOrder()
},[])
    //   console.log(`訂單編號：${order.id}`);
    // console.log(`方案：${order.planId}`);
    // console.log(`支付卡片：${payment.brand} **** ${payment.last4}`)
    if (!order) return <div>找不到訂單資訊......</div>;
  return (
    <div className="container text-center py-16">
      {/* {JSON.stringify(order)} */}
      <span className="material-symbols-outlined display-1">
        check_circle
      </span>
      <div className="d-flex flex-column align-items-center">
        <h2 className="mb-2">付款成功！</h2>
        <p className="mb-2">感謝您訂閱{order.planId}方案，我們已成功處理您的付款。<br />確認信件將寄送至{Unfo?.email}！</p>
        <button type="button" className="btn btn-dark py-3 fw-bold">前往儀錶板</button>
      </div>
    </div>

  )
  
}
