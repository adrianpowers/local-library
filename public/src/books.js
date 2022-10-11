// uses a .find() to return the author with the specified id
const findAuthorById = (authors = [], id = "") => authors.find((author) => author.id === id);

// uses a .find() to return the book with the specified id
const findBookById = (books = [], id = "") => books.find((book) => book.id === id);

// creates an array of two arrays: books that are checked out, and books that are checked in
const partitionBooksByBorrowedStatus = (books = []) => {
  // initialize two empty arrays: one to hold the books that are checked out...
  let notReturned = [];
  // ... and one that holds the books that are checked in and available
  let returned = [];

  /* uses a .forEach() to push the books to their corresponding arrays
    based on the return status of the most recent return. 
    note: this could have been done with a .filter() for each array,
    but I wanted to demonstrate use of the ternary operator */
  books.forEach((book) => (book.borrows[0].returned) ? returned.push(book) : notReturned.push(book));

  // returns both arrays within another array, as specified
  return [notReturned, returned];

}

// HELPER FX: addReturnedToAccount adds a given returned value to a given account object
const addReturnedToAccount = (account = {}, returned = []) => account.returned = returned;

// returns an array of account objects (for each borrower of the given book)
const getBorrowersForBook = (book = {}, accounts = []) => {

  // uses object destructuring to give the variable "borrows" the book.borrows array
  let {borrows} = book; 

  /* uses .map() and .find() to find an account with the same id
    as the current account in the borrows array, 
    then maps that account's object to a results array */
  let result = borrows.map((currentAcc) => {
    let foundAcc = accounts.find((account) => {
      return account.id === currentAcc.id;
    })
    return foundAcc;
  })

  /* for each account in the results array and for each borrow in the borrows array,
    if the IDs for each match, invoke the helper function to add the returned key:value pair
    to the current account object in result */
  result.forEach((acc) => {
    borrows.forEach((borrow) => {
      if(borrow.id === acc.id) {
        return addReturnedToAccount(acc, borrow.returned) // call helper function
      }
    })
  });

  // splice the result to show the most recent ten borrowers, then return
  result.splice(10);
  return result;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
