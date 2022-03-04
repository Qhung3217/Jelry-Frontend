import clsx from "clsx"
import styles from "./Page.module.css"

function DeliveryAndCheckout() {
  return (
    <div className={clsx(styles.pageWrapper)}>
      <div className={clsx(styles.headingPage)}>
        <h1>Thanh toán &amp; giao hàng</h1>
      </div>
      <div className={clsx(styles.wrapboxContentPage)}>
        <div className={clsx(styles.contentPage)}>
          <p>&nbsp;</p>
          <h2>
            <span style={{'fontSize': '15pt'}}>
              <strong>Thanh toán</strong>
            </span>
          </h2>
          <p>
            Tất cả đơn hàng&nbsp;đều được ưu tiên
            <strong> thu tiền khi nhận hàng (COD - Cash on Delivery)</strong>.
            Khách hàng&nbsp;vẫn có thể thanh toán đơn hàng bằng cách
            <strong> chuyển khoản đến tài khoản ngân hàng,&nbsp;ví Momo</strong>{" "}
            của Juz Style hoặc
            <strong> thanh toán trực tuyến&nbsp;tại Ngân Lượng</strong>. Ngoài
            ra, Juz Style có nhận thanh toán USD qua cổng thanh toán
            <strong> Paypal</strong> cho khách hàng nước ngoài không sử dụng thẻ
            tại Việt Nam.
          </p>
          <h2>
            <strong>
              <span style={{'fontSize': '15pt'}}>Giao hàng</span>
            </strong>
          </h2>
          <p>
            Sau khi nhận được đơn hàng, Juz Style sẽ gọi điện xác nhận đơn hàng
            trong vòng 24 giờ làm việc các ngày làm việc trong tuần trừ Thứ 7,
            Chủ nhật.&nbsp;
            <span>
              <span>
                Đơn hàng sẽ được giao bởi Đối tác{" "}
                <strong>
                  Giao Hàng Nhanh (
                  <a target="_blank" href="https://ghn.vn/" rel="noreferrer">
                    https://ghn.vn/
                  </a>
                  )
                </strong>
              </span>
            </span>
          </p>
          <p>
            <span>
              <span>
                Với các đơn hàng dưới 500.000đ, phí giao hàng khác nhau tại mỗi
                khu vực:
              </span>
            </span>
          </p>
          <p>
            <strong>+&nbsp;tại TP. Hồ Chí Minh:</strong>
            <span>
              <span>
                &nbsp;<strong>2</strong>
                <span>
                  <strong>0.000đ</strong>/ đơn hàng. Thời gian nhận hàng từ 2-3
                  ngày tuỳ thuộc quận huyện.
                </span>
              </span>
            </span>
          </p>
          <p>
            <strong>+ tại các tỉnh thành khác:</strong>&nbsp;
            <span>
              <span>
                <span>
                  <strong>30.000đ</strong>/ đơn hàng. T
                </span>
              </span>
            </span>
            hời gian nhận hàng từ 3-6 ngày&nbsp;tuỳ theo vùng miền.
          </p>
          <p>
            <span>
              <span>
                <span>
                  Với các đơn hàng trên 500.000đ,{" "}
                  <strong>miễn phí vận chuyển</strong>.
                </span>
              </span>
            </span>
          </p>
          <p>&nbsp;</p>
        </div>
      </div>
    </div>
  );
}

export default DeliveryAndCheckout;
