import clsx from 'clsx'
import { Link } from 'react-router-dom'
import {Helmet} from 'react-helmet-async'
import styles from './LandingPage.module.css'
function LandingPage() {
  return(
    <div className="grid wide">
      <Helmet>
          <title>
            Jelry - Home
          </title>
      </Helmet>
      <div className="row">

        <div className="col l-3 m-6 s-12">
          <div className={clsx(styles.banner)}>
            <div className={clsx(styles.bannerImg)}>
              <Link to="/collections/trang-suc-bac">
                <img src="/assets/images/LandingPage/home_category_1_banner.jpg" alt="banner1" />
              </Link>
            </div>
            
            <Link to="/collections/trang-suc-bac" className={clsx(styles.bannerBtn, 'btn')}>Silver Jewelry</Link>
          </div>
        </div>

        <div className="col l-3 m-6 s-12">
          <div className={clsx(styles.banner)}>
              <div className={clsx(styles.bannerImg)}>
                  <Link to="/collections/da-tu-nhien">
                    <img src="/assets/images/LandingPage/home_category_2_banner.jpg" alt="banner2" />
                  </Link>
              </div>
              <Link to="/collections/da-tu-nhien" className={clsx(styles.bannerBtn, 'btn')}>Gemstone Bracelets</Link>
            </div>
        </div>

        <div className="col l-3 m-6 s-12">
          <div className={clsx(styles.banner)}>
            <div className={clsx(styles.bannerImg)}>
                <Link to="/collections/trang-suc-vang">
                  <img src="/assets/images/LandingPage/home_category_3_banner.jpg" alt="banner3" />
                </Link>
            </div>
            <Link to="/collections/trang-suc-vang" className={clsx(styles.bannerBtn, 'btn')}>Gold Jewelry</Link>
          </div>
        </div>

        <div className="col l-3 m-6 s-12">
          <div className={clsx(styles.banner)}>
            <div className={clsx(styles.bannerImg)}>
              <Link to="/collections/goods">
                <img src="/assets/images/LandingPage/home_category_5_banner.jpg" alt="banner5" />
              </Link>
            </div>
            <Link to="/collections/goods" className={clsx(styles.bannerBtn, 'btn')}>Lifestyle Goods</Link>

          </div>
        </div>
        
      </div>
    </div>
  )
}

export default LandingPage