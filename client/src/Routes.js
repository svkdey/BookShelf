import React from 'react'
import {Switch,Route} from 'react-router-dom';
import Home from './components/home/Home';
import Book from './components/book/Book'
import Layout from './HOC/Layout';
import Login from './containers/login';
import Auth from './HOC/auth';
import Admin from './components/admin/Admin';
import AddReview from './components/admin/AddBook';
import UserPost from './components/admin/UserPost';
import EditReview from './components/admin/Edit';
import Logout from './components/admin/Logout';
import Register from './components/admin/Register'
function Routes() {
  return (
      <Layout>
          <Switch>
            <Route path="/" exact component={Auth(Home,null)}/>
            <Route path="/login" exact component={Auth(Login,false)}/>
            <Route path="/user" exact component={Auth(Admin,true)}/>
            <Route path="/user/logout" exact component={Auth(Logout,true)}/>
            <Route path="/user/add" exact component={Auth(AddReview,true)}/>
             <Route path="/user/register" exact component={Auth(Register,true)}/>
            <Route path="/user/user-reviews" exact component={Auth(UserPost,true)}/>
             <Route path="/user/edit-post/:id" exact component={Auth(EditReview,true)}/>
             <Route path="/books/:id" exact component={Auth(Book,null)}/>
          </Switch>
        </Layout>
  )
}

export default Routes;
