const booksController = require('../controllers').books;

module.exports = (app) => {
    app.get('/catalogue', booksController.list);

    app.get('/catalogue/categories', booksController.listCategories);
    
    app.get('/catalogue/authors', booksController.listAuthors);

    // Assuming search URL is something like:
    // /catalogue/search?author=robin+nixon
    // or:
    // /catalogue/search?category=linux
    app.get('/catalogue/search', booksController.search);

    app.post('/catalogue', booksController.create);
};
