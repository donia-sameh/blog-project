const express = require('express');
const router = express.Router();
const { getDb } = require('../database');

router.get('/', async (req, res) => {
  try {
    const db = await getDb();
    const { status, category } = req.query;
    let query = 'SELECT * FROM posts';
    const params = [];
    const filters = [];

    if (status) { filters.push('status = ?'); params.push(status); }
    if (category) { filters.push('category = ?'); params.push(category); }
    if (filters.length) query += ' WHERE ' + filters.join(' AND ');
    query += ' ORDER BY created_at DESC';

    const posts = await db.all(query, params);
    res.json({ data: posts, total: posts.length });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const db = await getDb();
    const post = await db.get('SELECT * FROM posts WHERE id = ?', req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, content, author, category = 'General', status = 'draft' } = req.body;

    if (!title || !content || !author) {
      return res.status(400).json({ error: 'title, content, and author are required' });
    }
    if (!['draft', 'published'].includes(status)) {
      return res.status(400).json({ error: 'status must be draft or published' });
    }

    const db = await getDb();
    const result = await db.run(
      'INSERT INTO posts (title, content, author, category, status) VALUES (?, ?, ?, ?, ?)',
      [title, content, author, category, status]
    );
    const post = await db.get('SELECT * FROM posts WHERE id = ?', result.lastID);
    res.status(201).json(post);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const db = await getDb();
    const existing = await db.get('SELECT id FROM posts WHERE id = ?', req.params.id);
    if (!existing) return res.status(404).json({ error: 'Post not found' });

    const { title, content, author, category = 'General', status } = req.body;
    if (!title || !content || !author) {
      return res.status(400).json({ error: 'title, content, and author are required' });
    }
    if (!['draft', 'published'].includes(status)) {
      return res.status(400).json({ error: 'status must be draft or published' });
    }

    await db.run(
      'UPDATE posts SET title = ?, content = ?, author = ?, category = ?, status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [title, content, author, category, status, req.params.id]
    );
    const post = await db.get('SELECT * FROM posts WHERE id = ?', req.params.id);
    res.json(post);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const db = await getDb();
    const existing = await db.get('SELECT id FROM posts WHERE id = ?', req.params.id);
    if (!existing) return res.status(404).json({ error: 'Post not found' });
    await db.run('DELETE FROM posts WHERE id = ?', req.params.id);
    res.status(204).end();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
