import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { pathname } = useLocation();
  return (
    <nav className={styles.nav}>
      <span className={styles.brand}>Blog Admin</span>
      <div className={styles.links}>
        <Link to="/" className={pathname === '/' ? styles.active : ''}>All Posts</Link>
        <Link to="/create" className={pathname === '/create' ? styles.active : ''}>New Post</Link>
      </div>
    </nav>
  );
}
