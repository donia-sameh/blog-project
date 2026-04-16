import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPost } from '../api/posts';
import styles from './PostDetail.module.css';

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getPost(id).then(setPost).catch(e => setError(e.message));
  }, [id]);

  if (error) return <div className={styles.container}><p className={styles.error}>{error}</p></div>;
  if (!post) return <div className={styles.container}><p className={styles.loading}>Loading...</p></div>;

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.back}>← Back to posts</Link>
      <article className={styles.article}>
        <div className={styles.meta}>
          <span className={`${styles.badge} ${styles[post.status]}`}>{post.status}</span>
          <span className={styles.category}>{post.category}</span>
          <span className={styles.date}>{new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.author}>By {post.author}</p>
        <div className={styles.content}>{post.content}</div>
      </article>
    </div>
  );
}
