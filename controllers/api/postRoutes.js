const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatedPost = await Post.update(
      { post_text: req.body.post_text },
      { where: { id: req.params.id } }
    );
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    console.log(req.body);
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name', 'id'],
        },
        {
          model: Comment,
          attributes: [
            'id',
            'comment_text',
            'user_id',
            'post_id',
            'date_created',
          ],
          include: {
            model: User,
            attributes: ['name', 'id'],
          },
        },
      ],
    });

    const post = postData.get({ plain: true });
    res.render('post', {
      ...post,
      id: req.params.id,
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
