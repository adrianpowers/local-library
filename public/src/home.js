

// returns the length of the books array to get total count
const getTotalBooksCount = (books = []) => books.length;

// returns the length of the accounts array to get total count
const getTotalAccountsCount = (accounts = []) => accounts.length;

// returns a number, amount of books that are checked out
const getBooksBorrowedCount = (books = []) => {

  /* uses .reduce() to loop over each book and increment total by 1
    if the book's most recent returned value is false (if the book hasn't been returned)
    then places that total into a variable and returns it */
  let borrowed = books.reduce((total, book) => {
    if(!(book.borrows[0].returned)){
      total++;
    }
    return total;
  }, 0)

  return borrowed;

}

// returns an array of the most common genres, with specific formatting for each genre object
const getMostCommonGenres = (books = []) => {
  
  // maps the genre of each book to a variable using .map()
  let genres = books.map((book) => book.genre);

  // initializes an empty array to store results
  let results = [];

  // initializes an empty object to place "genre: count" key/value pairs in
  let genreObj = {};

  /* iterates through each genre.
    if the genre exists as a key in the above genreObj already, it gets that value + 1
    if the genre doesn't exist, it gets assigned 1 (technically 0 + 1).
    */
  genres.forEach((genre) => { 
    genreObj[genre] = (genreObj[genre] || 0) + 1;
  });

  /* uses a for/in loop to iterate over each key of the genre object,
   then pushes a new object to the results array, where the name value is assigned the key,
   and the count value is assigned the original key's value */
  for(let genre in genreObj){
    results.push({
      name: genre,
      count: genreObj[genre]
    });
  }

  // sorts results descending, splices the top five, then returns the results
  results
    .sort((genreA, genreB) => (genreB.count > genreA.count ? 1 : -1))
    .splice(5)
  return results;
}

// returns the most popular books - that is, an array of book objects with the most borrows
const getMostPopularBooks = (books = []) => {

  // uses .map() to map each book's title and borrows length to a new array
  let results = books.map((book) => {
    return { "name": book.title, "count": book.borrows.length }
  })

  // sorts the results descending and splices the top five, then returns the results
  results
    .sort((bookA, bookB) => (bookB.count > bookA.count ? 1 : -1))
    .splice(5)
  return results;

}
 
// returns the most popular authors - that is, an array of the author with the most borrows
const getMostPopularAuthors = (books = [], authors = []) => {

  // initializes an empty array to hold results
  let results = [];

  /* iterates through each author,
    creates an object that contains the current author's name in a key called name,
    and initializes a count of that author's total borrows at the library to zero;*/
  authors.forEach((author) => {

    let authorObj = {
      name: `${author.name.first} ${author.name.last}`,
      count: 0
    };

    /* while still looping through the authors, loop through the books:
      for each book, if the book's author is the same as the current author's id,
      the author's count gets incremented by the length of the borrows array of the current book;
      that is, if the current book was written by the current author, 
      the number of borrows gets added to their count */

    books.forEach((book) => {
      if(book.authorId === author.id){
        authorObj.count += book.borrows.length;
      }
    })

    /* once every book has been iterated through for the current author,
    push the author object to the results array */

    results.push(authorObj);

  })

  // sorts the results descending and splices the top five, then returns the results

  results
    .sort((authorA, authorB) => authorB.count > authorA.count? 1 : -1)
    .splice(5);
  return results;

}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
