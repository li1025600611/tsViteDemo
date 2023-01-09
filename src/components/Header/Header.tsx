/*
 * Author  Vincy.Li
 * Date  2023-01-09 11:25:23
 * LastEditors  Vincy.Li
 * LastEditTime  2023-01-09 11:32:20
 * Description
 */
import styles from "./Header.module.less";
function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img src="/juejinLogo.svg" />
      </div>
    </div>
  );
}

export default Header;
