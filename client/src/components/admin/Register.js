import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getUsers,userRegister} from '../../actions/index' 
class Register extends Component {
    state={
        name:'',
        lastname:'',
        email:'',
        password:'',
        error:''
    }
    componentWillMount(){
        this.props.dispatch(getUsers())
    }
    handleInput=(event)=>{
       this.setState({
           [event.target.name]: event.target.value,
          
       })
    }
    submitForm=(e)=>{
        e.preventDefault();
        this.setState({error:''});
        this.props.dispatch(userRegister({
            name:this.state.name,
            lastname: this.state.lastname,
            email: this.state.email,
            password: this.state.password,
        },this.props.user.users))
        // console.log(this.state)
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.user.register===false){
            this.setState({error:'Error.Try again'})
        }else{
            this.setState({
                name:'',
                lastname:'',
                email:'',
                password:'',
            })
        }
    }
    showUsers=(user)=>{
        return user.users?user.users.map(item=>(
            <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.lastname}</td>
                <td>{item.email}</td>
            </tr>
        )

        ):null;
    }
  render() {
      let user=this.props.user
    return (
      <div className="rl_container"> 
    <form onSubmit={this.submitForm}>
        <h2> Add User</h2>
        <div className="form_element">
            <input type="text"
            name="name" placeholder="Enter Name"
            value={this.state.name}
            onChange={this.handleInput}/>
        </div>
        <div className="form_element">
            <input type="text"
            name="lastname" placeholder="Enter LastName"
            value={this.state.lastname}
            onChange={this.handleInput}/></div>
            <div className="form_element">
            <input type="email"
            name = "email"
            placeholder = "Enter Email"
            value={this.state.email}
            onChange={this.handleInput}/></div>

            <div className="form_element">
            <input type="password"
            name = "password"
            placeholder = "Enter password"
            value={this.state.password}
            onChange={this.handleInput}/></div> 
            <button type="submit">Submit</button>
            <div className="error">
                {this.state.error}
            </div>
    </form>
    <div className="current_users">
        <h4>Current Users:</h4>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                     <th>LastName</th>
                     <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {this.showUsers(user)}
            </tbody>
        </table>
    </div>
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
export default connect(mapStateToProps)(Register);
