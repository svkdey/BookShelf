import React, { Component } from 'react'
import {
    getBookWithReviewer,clearState
} from './../../actions/index';
import {connect} from 'react-redux'
class Book extends Component {
    componentWillMount(){
        // console.log(this.props.match.params.id)
        this.props.dispatch(getBookWithReviewer(this.props.match.params.id))
    }
    componentWillUnmount(){
          this.props.dispatch(clearState())
    }
    renderBook=(books)=>(
        books.book?(
            <div className="br_container">
                <div className="br_header">
                    <h2>{books.book.name}</h2>
                    <h5>{books.book.author}</h5>
                    <div className="br_reviewer">
                        <span > Review by </span>{books.reviewer.name} {books.reviewer.lastname}
                    </div>
                </div>
                <div className="br_review">
                    {books.book.review}
                </div>
                <div className="br_box">
                    <div className="left">
                        <div>
                        <span>Pages:</span> {books.book.pages}</div>
                        <div> <span>Price:</span> {books.book.price}</div>
                        
                    </div>
                     <div className="right">
                          <span>Rating:</span> <div>{books.book.rating}/5</div>
                     </div>
                </div>
            </div>
        ):null
    )

    
    render() {
        let books=this.props.books;

        return (
            <div>
               {this.renderBook(books)}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    // console.log(state)
    return {
        books: state.books
    }
}
export default connect(mapStateToProps)(Book);
