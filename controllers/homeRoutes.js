const router = require('express').Router();
const {
  Blog,
  Comment,
  User
} = require('../models');
const withAuth = require('../utils/auth');


// get all blogs for homepage
router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [User],
    });

    const blogs = blogData.map((blog) => blog.get({
      plain: true
    }));

    res.render('allblogs', {
      blogs
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/blog/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    if (blogData) {
      const blog = blogData.get({
        plain: true
      });

      res.render('singleblog', {
        blog
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// // Use withAuth middleware to prevent access to route
// router.get('/profile', withAuth, async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.logged_in, {
//       attributes: {
//         exclude: ['password']
//       },
//       include: [{
//         model: Blog
//       }],
//     });

//     const user = userData.get({
//       plain: true
//     });

//     res.render('main', {
//       ...user,
//       logged_in: true
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get('/login', (req, res) => {
  console.log(req.session)
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  console.log(req.session)
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;