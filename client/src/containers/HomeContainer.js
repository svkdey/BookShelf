import React, { Component } from 'react'
import {connect} from 'react-redux';
import {getBooks} from '../actions/index';
import BookItem from '../components/widgets/book_item'
class HomeContainer extends Component {
    componentWillMount(){
        this.props.dispatch(getBooks(7,0,'desc'))
    }
    callBookitem=(item,i)=>{
        return <BookItem item={item} key={i}/>
    }
    renderBooks=(books)=>{
        // console.log(books)
        return books.list ? books.list.map((item,i) => {
            return (
                <div>{this.callBookitem(item,i)}</div>
            )
        }
            
        ) :null;
    }
    loadMore=()=>{
        let count=this.props.books.list.length;
         this.props.dispatch(getBooks(3, count, 'desc', this.props.books.list))
    }
    render() {
    
          
        
        return (
            <div>
                {this.renderBooks(this.props.books)}
                <div className="loadmore"
                onClick={()=>{
                    this.loadMore();
                }}>Load More</div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        books: state.books
    }
}
export default connect(mapStateToProps)(HomeContainer);