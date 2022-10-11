// runs .find() on accounts to return the account object with the given ID
const findAccountById = (accounts = [], id = "") => accounts.find((acc) => acc.id === id);

// sorts all accounts in given account object by last name using .sort()
const sortAccountsByLastName = (accounts = []) => {
  return accounts.sort((accA, accB) => accA.name.last.toLowerCase() > accB.name.last.toLowerCase() ? 1 : -1);
}

// returns a number representing the total number of borrows for a given account
const getTotalNumberOfBorrows = (account = {}, books = []) => {  

  const { id } = account; // object destructuring to place the given account's id in a variable

  // uses .reduce() to get the number of borrows in each book object within the books array, initialized at 0
  return books.reduce((total, book) => {
    
    /* iterates over each book's borrows array, checks if any of the borrows' id matches the given account's id
      then places that boolean into a variable */
    let borrowedByAcc = book.borrows.some((borrowObj) => {
      return borrowObj.id === id;
    })

    // if the boolean above is true, the total gets incremented and returned
    if(borrowedByAcc) total++
    return total
  
  }, 0)

}

// HELPER FUNCTION: put author object into book object in place of authorId

const fillAuthorInfo = (books = [], authors = []) => {

  /* using a .map() to iterate over each book and replace the value of the author key 
    with the author object from the authors dataset, then returning the result */

  books.map((book) => {
    book.author = (authors.find((author) => author.id === book.authorId)) 
  })
  
  return books;

}

// gets all the books currently checked out by a given account

const getBooksPossessedByAccount = (account = {}, books = [], authors = []) => {

  // initialize a variable to place each relevant book into
  let resultBooks = [];

  /* uses .filter() to find books where the most recent borrow's id matches the account's id
    and the book has not been returned, then stores them into the above result variable */
  resultBooks = books.filter((book) =>{
    return book.borrows[0].id === account.id && !(book.borrows[0].returned)
  })

  // uses the helper function to replace the author info of each book then returns the result
  resultBooks = fillAuthorInfo(resultBooks, authors);
  return resultBooks;

}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
