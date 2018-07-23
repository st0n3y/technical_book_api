const validator = (book) => {
    let valid = true;
    
    // Checks the ISBN does not contain any letters
    if(book.ISBN.search(/[a-zA-Z]/) !== -1) valid = false;

    return valid;
};

module.exports = validator;
