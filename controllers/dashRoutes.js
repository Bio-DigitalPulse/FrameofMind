const router = require('express').Router();
const {
    Blog
} = require('../models/');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            where: {
                user_id: req.session.user_id,
            },
        });

        const blogs = blogData.map((blog) => blog.get({
            plain: true
        }));

        res.render('allblogsAdmin', {
            layout: 'dashboard',
            blogs,
        });
    } catch (err) {
        res.redirect('login');
    }
});

router.get('/new', withAuth, (req, res) => {
    res.render('newblog', {
        layout: 'dashboard',
    });
});

router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id);

        if (blogData) {
            const post = blogData.get({
                plain: true
            });

            res.render('editblog', {
                layout: 'dashboard',
                post,
            });
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.redirect('login');
    }
});

module.exports = router;
