import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

function Logo() {
  return (
    <Link to="/">
      <img src="/eco-logo.png" alt="Ecolife logo" className={styles.logo} />
    </Link>
  );
}

export default Logo;
