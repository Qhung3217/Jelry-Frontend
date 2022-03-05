import clsx from 'clsx'
import { Link } from 'react-router-dom'
import styles from './LandingPage.module.css'
function LandingPage() {
  return(
    <div className="grid wide">
      <div className="row">

        <div className="col l-3">
          <div className={clsx(styles.banner)}>
            <div className={clsx(styles.bannerImg)}>
              <Link to="/">
                <img src="/assets/images/LandingPage/home_category_1_banner.jpg" alt="banner1" />
              </Link>
            </div>
            
            <div className={clsx(styles.bannerBtn, 'btn')}>Silver Jewelry</div>
          </div>
        </div>

        <div className="col l-3">
          <div className={clsx(styles.banner)}>
              <div className={clsx(styles.bannerImg)}>
                  <Link to="/">
                    <img src="/assets/images/LandingPage/home_category_2_banner.jpg" alt="banner2" />
                  </Link>
              </div>
              <div className={clsx(styles.bannerBtn, 'btn')}>Gemstone Bracelets</div>
            </div>
        </div>

        <div className="col l-3">
          <div className={clsx(styles.banner)}>
            <div className={clsx(styles.bannerImg)}>
                <Link to="/">
                  <img src="/assets/images/LandingPage/home_category_3_banner.jpg" alt="banner3" />
                </Link>
            </div>
            <div className={clsx(styles.bannerBtn, 'btn')}>Gold Jewelry</div>
          </div>
        </div>

        <div className="col l-3">
          <div className={clsx(styles.banner)}>
            <div className={clsx(styles.bannerImg)}>
              <Link to="/">
                <img src="/assets/images/LandingPage/home_category_5_banner.jpg" alt="banner5" />
              </Link>
            </div>
            <div className={clsx(styles.bannerBtn, 'btn')}>Lifestyle Goods</div>

          </div>
        </div>
        
      </div>
    </div>
  )
}

export default LandingPage