const router = require('express').Router();
const { Comment, Post, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      where: {
        post_id: req.params.postid,
      },
    });
    console.log('params:', req.params);

    const comments = commentData.get({ plain: true });
    // res.status(200).json(commentData);

    res.render('post', {
      ...comments,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/', async (req, res) => {
  try {
    const commentData = await Comment.findAll();
    console.log('params:', req.params);

    // const comment = commentData.get({ plain: true });

    // res.render('comment', {
    //   ...comment,
    //   logged_in: req.session.logged_in,
    // });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
    console.log('error:', err);
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    console.log(req.body);
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
