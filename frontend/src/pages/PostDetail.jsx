import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getPost, deletePost } from '../api/posts';
import styles from './PostDetail.module.css';

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    getPost(id).then(setPost).catch(e => setError(e.message));
  }, [id]);

  async function handleDelete() {
    setDeleting(true);
    try {
      await deletePost(id);
      navigate('/');
    } catch (e) {
      setError(e.message);
      setDeleting(false);
      setShowConfirm(false);
    }
  }

  if (error) return <div className={styles.container}><p className={styles.error}>{error}</p></div>;
  if (!post) return <div className={styles.container}><p className={styles.loading}>Loading...</p></div>;

  return (
    <div className={styles.container}>
      {showConfirm && (
        <div className={styles.overlay}>
          <div className={styles.dialog}>
            <p className={styles.dialogText}>Delete <strong>{post.title}</strong>? This cannot be undone.</p>
            <div className={styles.dialogActions}>
              <button className={styles.cancelBtn} onClick={() => setShowConfirm(false)} disabled={deleting}>Cancel</button>
              <button className={styles.confirmDeleteBtn} onClick={handleDelete} disabled={deleting}>
                {deleting ? 'Deleting…' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
      <div className={styles.topBar}>
        <Link to="/" className={styles.back}>← Back to posts</Link>
        <div className={styles.actions}>
          <Link to={`/posts/${id}/edit`} className={styles.editBtn}>Edit</Link>
          <button className={styles.deleteBtn} onClick={() => setShowConfirm(true)}>Delete</button>
        </div>
      </div>
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
