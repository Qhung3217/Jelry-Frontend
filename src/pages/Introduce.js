import clsx from "clsx"
import { Link } from 'react-router-dom'
import styles from "./Page.module.css"

function Introduce() {
  return (
    <div className={clsx(styles.pageWrapper)}>
      <div className={clsx(styles.headingPage)}>
        <h1>Giới thiệu</h1>
      </div>
      <div className={clsx(styles.wrapboxContentPage)}>
        <div className={clsx(styles.contentPage)}>
          <p>
            <span style={{'textAlign': 'justify', 'fontSize': '10pt'}}>
              Năm 2011, khi trang sức bạc thời trang vẫn còn là một khái nhiệm
              mới mẻ với các bạn trẻ Việt, Juz Style được sinh ra trên một căn
              gác nhỏ nằm trong con hẻm không tên giữa Sài Gòn. Người sáng lập
              Juz Style tin rằng, trang sức không dừng lại ở thời trang mà nó
              còn mang ý nghĩa và dấu ấn quan trọng của chủ nhân. Và đó cũng là
              khởi đầu của hành trình sáng tạo Juz Style đến tận bây giờ.
            </span>
          </p>
          <p>
            <span style={{'fontSize': '10pt'}}>
              Mỗi một món trang sức Juz Style tạo ra đều được truyền cảm hứng từ
              những câu chuyện về tình yêu, tình bạn, tình cảm gia đình, những
              cảm xúc vui vẻ, những cột mốc đáng nhớ… Nếu là người yêu phong
              cách sống đơn giản, hiện đại, tinh tế và trẻ trung của người Nhật,
              chắc hẳn bạn sẽ tìm thấy niềm si mê ở từng món trang sức dù nhỏ
              nhất của Juz Style.
            </span>
          </p>
          <p>
            <span style={{'fontSize': '10pt'}}>
              Được xây dựng từ tình yêu và sự tử tế với trang sức, sản phẩm của
              Juz Style là sự kết tinh của hàng giờ tỉ mỉ chế tác thủ công của
              người thợ bạc Việt Nam. Juz Style mong rằng sẽ mang đến cho bạn
              những món quà ý nghĩa nhất không chỉ để làm đẹp cho bản thân mà
              còn làm đẹp cho tâm hồn.
            </span>
          </p>
          <p>
            <span style={{'fontSize': '10pt'}}>
              Cám ơn bạn đã dành thời gian để hiểu về Juz Style. Mời bạn tiếp
              tục khám phá Juz Style thông qua những sáng tạo mới nhất của Juz
              Style{" "}
              <Link style={{'color': '#000000'}} to="/pages/gioi-thieu">
                tại đây
              </Link>
              .
            </span>
          </p>
          <h4>
            <strong style={{'fontSize': '10pt'}}>
              <span>Juz Style - Just be your style.</span>
            </strong>
          </h4>
          <p>&nbsp;</p>
          <p>&nbsp;</p>
        </div>
      </div>
    </div>
  );
}

export default Introduce;
