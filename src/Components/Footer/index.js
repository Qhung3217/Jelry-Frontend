import clsx from 'clsx'
import { Link } from 'react-router-dom'
import styles from './Footer.module.css'


function Footer(){
  return (
    <footer className={clsx(styles.footer)}>
      <ul className={clsx(styles.footerList)}>
        <li className={clsx(styles.footerItem)}>
          <Link to="pages/gioi-thieu">Giới thiệu</Link>
        </li>
        <li className={clsx(styles.footerItem)}>
          <Link to="pages/chinh-sach-bao-mat-thong-tin">Chính sách bảo mật thông tin</Link>
        </li>
        <li className={clsx(styles.footerItem)}>
          <Link to="pages/chinh-sach-bao-hanh">Chính sách bảo hành</Link>
        </li>
        <li className={clsx(styles.footerItem)}>
          <Link to="pages/thanh-toan-va-giao-hang">Thanh toán &amp; Giao hàng</Link>
        </li>
      </ul>
    </footer>
  )
}

export default Footer