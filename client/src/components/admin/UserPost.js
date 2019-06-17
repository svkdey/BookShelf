import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserPosts } from '../../actions';
import moment from 'moment-js';
import { Link } from 'react-router-dom';

class UserPost extends Component {

    componentWillMount(){
        this.props.dispatch(getUserPosts(this.props.user.login.id))
    }

    showUserPosts = (user) => (
        user.userBook ? 
            user.userBook.map(item => (
                <tr key={item._id}>
                    <td><Link to={
                        `/user/edit-post/${item._id}`
                    }>
                        {item.name}
                    </Link></td>
                    <td><Link to={
                        `/user/edit-post/${item._id}`
                    }>
                        {item.author}
                    </Link></td>
                    <td>
                    <Link to={
                        `/user/edit-post/${item._id}`
                    }>
                        {moment(item.createAt).format("MM/DD/YY")}
                    </Link>
                        
                    </td>
                </tr>
            ))
        :null
    )

    render() {
        // console.log(this.props.user)
        let user = this.props.user;
        return (
            <div className="user_posts">
                <h4>Your reviews:</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Author</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.showUserPosts(user)}
                    </tbody>
                </table>
            </div>
        );
    }
}
function mapStateToProps(state){
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(UserPost)