import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '../api/posts';
import styles from './PostList.module.css';

const CATEGORIES = ['', 'General', 'Tech', 'Design', 'Business', 'Lifestyle'];

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({ status: '', category: '' });

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (filters.status) params.status = filters.status;
    if (filters.category) params.category = filters.category;

    getPosts(params)
      .then(res => setPosts(res.data))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [filters]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>All Posts <span className={styles.count}>{posts.length}</span></h1>
        <Link to="/create" className={styles.btn}>+ New Post</Link>
      </div>

      <div className={styles.filters}>
        <select value={filters.status} onChange={e => setFilters(f => ({ ...f, status: e.target.value }))}>
          <option value="">All Statuses</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
        <select value={filters.category} onChange={e => setFilters(f => ({ ...f, category: e.target.value }))}>
          {CATEGORIES.map(c => <option key={c} value={c}>{c || 'All Categories'}</option>)}
        </select>
      </div>

      {error && <p className={styles.error}>{error}</p>}
      {loading ? (
        <p className={styles.loading}>Loading...</p>
      ) : posts.length === 0 ? (
        <div className={styles.empty}>
          <p>No posts found.</p>
          <Link to="/create">Create your first post</Link>
        </div>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map(post => (
                <tr key={post.id}>
                  <td>{post.id}</td>
                  <td className={styles.title}>{post.title}</td>
                  <td>{post.author}</td>
                  <td><span className={styles.category}>{post.category}</span></td>
                  <td>
                    <span className={`${styles.badge} ${styles[post.status]}`}>
                      {post.status}
                    </span>
                  </td>
                  <td className={styles.date}>{new Date(post.created_at).toLocaleDateString()}</td>
                  <td>
                    <Link to={`/posts/${post.id}`} className={styles.viewBtn}>View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
