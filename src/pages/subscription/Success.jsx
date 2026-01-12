export default function Success() {
  return (
    <div className="container text-center py-16">
      <span className="material-symbols-outlined display-1">
        check_circle
      </span>
      <div className="d-flex flex-column align-items-center">
        <h2 className="mb-2">付款成功！</h2>
        <p className="mb-2">感謝您訂閱Pro月繳方案，我們已成功處理您的付款。<br />確認信件將寄送至 User's Email Address！</p>
        <button type="button" class="btn btn-dark py-3 fw-bold">前往儀錶板</button>
      </div>
    </div>

  )
  
}
