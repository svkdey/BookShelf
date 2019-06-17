import React, { Component } from 'react';
import {connect} from 'react-redux';
import {loginUser} from './../actions/index';
class Login extends Component {
    state={
        email:'',
        password:'',
        errorMsg:'',
        success:false

    }

    handleInput=(event)=>{
        this.setState({
            [event.target.name]:event.target.value
        })
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.user.login.isAuth){
            this.props.history.push('/')
        }else{

        }
    }
    submitForm=(e)=>{
        e.preventDefault();
        // console.log(this.state);
        this.props.dispatch(loginUser(this.state))
    }
  render() {
      let user=this.props.user;
    return (
      <div className="rl_container"> 
        <form onSubmit={this.submitForm}>
            <h2> Log in Here</h2>
            <div className="form_element">
            <input
                type="email"
                name="email"
                placeholder="Enter your name"
                value={this.state.email}
                onChange={this.handleInput}
            />

            </div>
             <div className="form_element">
            <input
                type="password"
                name = "password"
                placeholder = "Enter your password"
                 value={this.state.password}
                onChange={this.handleInput}
            />

            </div>
            <button type="submit">Login</button>
            <div className="error">
                {user.login?<div>
                {user.login.msg}
            </div>:null}
            </div>
            
        </form>
       </div>
    );
  }
}
const mapStateToProps = (state) => {
    // console.log(state)
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Login);
