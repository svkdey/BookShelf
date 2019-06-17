import React, { PureComponent } from 'react'
import {connect} from "react-redux";
import {getBookbyId,UpdateBook,clearDeletedBook,deleteBook} from './../../actions/index';
import {Link} from 'react-router-dom'
class EditBook extends PureComponent {
    state={
            _id: this.props.match.params.id,
           name:'',
            author:'',
            review:'',
            pages:'',
            rating:'',
            price:'',
            ownerId:''
    }
     componentWillMount() {
         this.props.dispatch(getBookbyId(this.props.match.params.id))
     }
     componentWillReceiveProps(nextProps){
         let book = nextProps.books.updateBook ? nextProps.books.updateBook : nextProps.books.book;
        //  console.log(book)
         this.setState({
            name: book.name,
            author: book.author,
            review: book.review,
            pages: book.pages,
            rating: book.rating,
            price: book.price,
            // name:'',
            // author:'',
            // review:'',
            // pages:'',
            // rating:'',
            // price:'',
         })
     }
    componentWillUnmount(){
        this.props.dispatch(clearDeletedBook())
    }
  handelInput = (event) => {
      this.setState({
          [event.target.name]: event.target.value,
          ownerId: this.props.user.login.id
      })
  }
  deletePost=()=>{
    //   console.log("deletePost")
      this.props.dispatch(deleteBook(this.props.match.params.id))
  }
  resetInput=()=>{
    // console.log("resetInput")
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
  redirectUser=()=>{
      setTimeout(()=>{this.props.history.push('/user/user-reviews')},2000)
  }
//   showNewBook=(book)=>{
//       console.log(book)
//       return book.post?
//       <div className="conf_link">
//           cool!<Link to={`/books/${book.bookId}`}>
//               Click the Link to see the post
//           </Link>
//       </div>:null
//   }
    submitForm=(e)=>{
        e.preventDefault();
        // console.log(this.state)
        this.props.dispatch(UpdateBook(this.state))
        this.resetInput();
    }
    render() {
        // console.log(this.props)
        let books=this.props.books
        return (
            <div className="rl_container articles">
            {
                books.updateBook?<div className="edit_confirm">
                    post updated
                    <Link to={`/books/${books.book._id}`}>
                        click to see!!
                    </Link>
                </div>:null
            }
            {
                books.postDeleted ? < div className = "red_tag" >
                    Post Deleted
                    {this.redirectUser()}
                </div>:null
            }
            <form onSubmit={this.submitForm}>
            <h2>Edit a review</h2>
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
            <button type="submit"> Submit   Review</button>
            </form>
                 <div>
                <div className="delete_post"
                onClick={()=>{this.deletePost()}}
                >
                       <div className="button"> Delete Review</div>
                </div>
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
export default connect(mapStateToProps)(EditBook)
