import './App.css';
import React, {Component} from "react";
import {BrowserRouter as Router, Redirect, Route} from "react-router-dom";
import Header from '../Header/header';
import Categories from '../Categories/categories';
import LibraryRepository from "../../repository/libraryRepository";
import BookAdd from "../Books/BookAdd/bookAdd";
import categories from "../Categories/categories";
import BookEdit from "../Books/BookEdit/bookEdit";
import Books from "../Books/BookList/books";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
        categories: [],
        books: [],
        authors: [],
        selectedBook: []
    }
  }

  render() {
    return (
        <Router>
            <Header/>
            <main>
                <div className="container">
                    <Route path={"/categories"} exact render={() => <Categories categories={this.state.categories}/>}/>

                    <Route path={"/books/add"} exact render={() =>
                        <BookAdd categories={this.state.categories}
                                 authors={this.state.authors}
                                 onAddBook={this.addBook}/>}/>

                    <Route path={"/books/edit/:id"} exact render={() =>
                        <BookEdit categories={this.state.categories}
                                  authors={this.state.authors}
                                  onEditBook={this.editBook}
                                  book={this.state.selectedBook}/>}/>

                    <Route path={"/books"} exact render={() =>
                        <Books books={this.state.books}
                               onDelete={this.deleteBook}
                               onEdit={this.getBook}
                               onMark={this.markTaken}/>}/>
                    <Redirect to={"/books"}/>
                </div>
            </main>
        </Router>
    );
  }

  componentDidMount() {
    this.loadCategories();
    this.loadBooks();
  }

  loadCategories = () => {
    LibraryRepository.fetchCategories()
        .then((data) => {
          this.setState({
            books: data.data
          })
        });
  }

  loadBooks = () => {
      LibraryRepository.fetchBooks()
          .then((data) => {
              this.state({
                  books: data.data
              })
          });
  }

  deleteBook = (id) => {
      LibraryRepository.deleteBook(id)
          .then(() => {
              this.loadBooks();
          });
  }

  addBook = (name, category, author, availableCopies) => {
      LibraryRepository.addBook(name, category, author, availableCopies)
          .then(() => {
              this.loadBooks();
          });
  }

  getBook = (id) => {
      LibraryRepository.getBook(id)
          .then((data) => {
              this.state({
                  selectedBook: data.data
              });
          });
  }

  editBook = (id, name, category, author, availableCopies) => {
      LibraryRepository.editBook(id, name, category, author, availableCopies)
          .then(() => {
              this.loadBooks();
          });
  }

  markTaken = (id) => {
      LibraryRepository.markAsTaken(id)
          .then(() => {
              this.loadBooks();
          })
  }
}

export default App;
