const Book = require('../models').Book;
const Sequelize = require('sequelize');
const validator = require('../../helpers/validator');
const Op = Sequelize.Op;

module.exports = {
  create(req, res) {
    if(validator(req.body.book)) {
        return Book
        // Assuming the request body looks like this:
        // {
        //     ...,
        //     book: {
        //         ISBN: '978-1491905012',
        //         title: 'Modern​ ​PHP:​ ​New​ ​Features​ ​and​ ​Good​ ​Practices',
        //         author: 'Josh​ ​Lockhart',
        //         category: 'PHP',
        //         price: 18.99
        //     }
        // }
        .create({
            ISBN: req.body.ISBN,
            title: req.body.title,
            author: req.body.author,
            category: req.body.category,
            price: req.body.price,
        })
        .then(book => res.status(201).send(book))
        .catch(err => res.status(400).send(err));
    } else {
        res.status(400).json({
            body: "Invalid ISBN"
        });
    }
  },
  list(req, res) {
    return Book
        .all()
        .then(books => res.status(200).send(books))
        .catch(err => res.status(400).send(err));
  },
  listCategories(req, res) {
    return Book
        .all()
        .then(books => {
            const categories = books.map(book => {
                return book.category;            
            });
            res.status(200).send(categories);
        })
        .catch(err => res.status(400).send(err));
  },
  listAuthors(req, res) {
    return Book
        .all()
        .then(books => {
            const authors = books.map(book => {
                return book.author;            
            });
            res.status(200).send(authors);
        })
        .catch(err => res.status(400).send(err));
  },
  search(req, res) {
    return Book
        .findAll({
            where: {
                [Op.or]: [
                  {
                    author: {
                      [Op.like]: `%${req.query.author}%`
                    }
                  },
                  {
                    category: {
                      [Op.like]: `%${req.query.category}%`
                    }
                  }
                ]
            }
        })
        .then(books => {
            const ISBNs = books.map(book => {
                return book.ISBN;            
            });
            res.status(200).send(ISBNs);
        })
        .catch(err => res.status(400).send(err));
  }
};
