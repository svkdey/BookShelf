import React, { Component } from 'react'
import {connect} from "react-redux";
import {addBook,clearNewBook} from './../../actions/index';
import {Link} from 'react-router-dom'
class AddBook extends Component {
    state={
           name:'',
            author:'',
            review:'',
            pages:'',
            rating:'',
            price:'',
            ownerId:''
    }
    componentWillUnmount(){
        this.props.dispatch(clearNewBook())
    }
  handelInput = (event) => {
      this.setState({
          [event.target.name]: event.target.value,
          ownerId: this.props.user.login.id
      })
  }
  resetInput=()=>{
   this.setState({
            name: '',
            author: '',
            review: '',
            pages: '',
            rating: '',
            price: '',
            ownerId: ''
   })
  }
  showNewBook=(book)=>{
    //   console.log(book)
      return book.post?
      <div className="conf_link">
          cool!<Link to={`/books/${book.bookId}`}>
              Click the Link to see the post
          </Link>
      </div>:null
  }
    submitForm=(e)=>{
        e.preventDefault();
        
        this.props.dispatch(addBook(this.state))
        this.resetInput()

    }
    render() {
        // console.log()
        return (
            <div className="rl_container articles">
            <form onSubmit={this.submitForm}>
            <h2>Add a review</h2>
            <div className="form_element">
                <input type="text"
                name = "name"
                placeholder = "Enter Name"
                 value={this.state.name}
                onChange={this.handelInput}
                    />
            </div>
            <div className="form_element">
                <input type="text" placeholder="Enter author"
                    
                    name = "author"
                    value={this.state.author}
                    onChange={this.handelInput}
                    />
            </div>
             <div className="form_element">
                <input type="textarea" placeholder="Enter review"
                    name = "review"
                    value = {this.state.review}
                    
                        onChange = {
                            this.handelInput
                        }
                    />
            </div>
            <div className="form_element">
                <input type="number" placeholder="Enter pages"
                name = "pages"
                    value = {this.state.pages}
                    
                        onChange={this.handelInput}
                    />
            </div>
            <div className="form_element">
                <select type="rating"
                    name = "rating"
                    value = {this.state.rating}
                    
                    onChange={this.handelInput} >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option></select>
            </div>
                  <div className="form_element">
                <input type="number" placeholder="Enter price"
                    name = "price"
                    value = {this.state.price}
                   
                        onChange={this.handelInput}
                    />
            </div>
            <button type="submit"> Add Review</button>
            </form>
                 <div>
                {
                        this.props.books.newBook ?
                        this.showNewBook(this.props.books.newBook)
                        : null
                    } 
            </div>
            </div>
           
           
        )
    }
}
const mapStateToProps = (state, ) => {
    //  console.log(state)
    return {
        books: state.books
    }
}
export default connect(mapStateToProps)(AddBook)
