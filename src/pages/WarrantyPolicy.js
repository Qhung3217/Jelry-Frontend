import clsx from "clsx"
import styles from "./Page.module.css"

function WarrantyPolicy() {
  return (
    <div className={clsx(styles.pageWrapper)}>
      <div className={clsx(styles.headingPage)}>
        <h1>Chính sách bảo hành</h1>
      </div>
      <div className={clsx(styles.wrapboxContentPage)}>
        <div className={clsx(styles.contentPage)}>
          <p>
            <strong>1. Trang sức bạc:</strong>
          </p>
          <ul>
            <li>
              Bảo hành vệ sinh &amp;&nbsp;đánh sáng miễn phí vô thời hạn đối với
              sản phẩm bạc nguyên chất 92.5% không xi mạ.
            </li>
            <li>
              Bảo hành nước mạ cho các sản phẩm bạc nguyên chất 92.5% mạ
              Rhodium, Platinum, Vàng vàng&nbsp;và Vàng hồng&nbsp;trong vòng
              3&nbsp;tháng và không quá 3 lần trong thời gian bảo hành. Qua thời
              gian bảo hành, phí mạ tuỳ thuộc từng sản phẩm và thời điểm (Từ
              40.000đ đến 200.000đ)
            </li>
            <li>
              Bảo hành khoá&nbsp;(khoá tròn) sản phẩm trong vòng 3 tháng đối với
              tất cả sản phẩm. Quá thời hạn bảo hành, phí thay khoá&nbsp;là
              20.000đ/ lần/ sản phẩm.
            </li>
            <li>
              Không bảo hành đối với trường hợp đứt, gãy dây và nhẫn.&nbsp;Phí
              sửa chữa từ 20.000đ - 80.000đ/ lần/ sản phẩm. Đối với dây chuyền
              bị đứt giữa dây không sửa được, nếu quý khách muốn, Juz Style sẽ
              thay lại dây mới với mức phí từ 70.000đ - 100.000đ/ lần/ sản phẩm.
            </li>
            <li>
              Không bảo hành với sản phẩm có đính đá,&nbsp;phí&nbsp;gắn
              lại&nbsp;tuỳ theo kích thước viên đá và số lượng đá sẽ được báo
              khi Juz nhận sửa chửa.
            </li>
          </ul>
          <p>
            <strong>2. Trang sức vàng:</strong>
          </p>
          <ul>
            <li>Bảo hành vệ sinh &amp; đánh sáng miễn phí.</li>
            <li>
              Không bảo hành đối với trường hợp đứt, gãy, rớt đá. Phí sửa chữa
              và thời gian sửa chữa&nbsp;sẽ được thông báo khi khách hàng mang
              đến gửi bảo hành.
            </li>
          </ul>
          <p>
            <strong>3. Đá tự nhiên:</strong>
          </p>
          <ul>
            <li>
              Không bảo hành đá bị vỡ, trầy trong quá trình khách sử dụng.&nbsp;
            </li>
            <li>
              Hỗ trợ thay vài viên đá nhỏ miễn phí nếu khách lỡ có vỡ hoặc đứt
              mất vài viên (chiều dài các viên được thay miễn phí ngắn&nbsp;hơn
              1cm). Nếu cần thay dài 1cm, khách hàng cần thanh toán thêm chí phí
              cho phần còn lại cần thêm (trung bình cộng của giá 1 sản phẩm mới)
            </li>
            <li>
              Bảo hành vệ sinh các phụ kiện bạc của sản phẩm, thay dây cước miễn
              phí.&nbsp;
            </li>
            <li>
              Nếu sản phẩm có dùng bi bạc bấm chốt sẽ có phí 8.000đ/ lần/ sản
              phẩm.
            </li>
          </ul>
          <p>
            <strong>4. Thép không gỉ:</strong> Không bảo hành.
          </p>
          <p>&nbsp;</p>
          <p>&nbsp;</p>
          <p>&nbsp;</p>
        </div>
      </div>
    </div>
  );
}

export default WarrantyPolicy;
