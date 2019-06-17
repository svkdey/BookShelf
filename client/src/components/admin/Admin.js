import React from 'react'

function Admin(props) {
    var user=props.user.login;
    // console.log(user)
    return (
        <div className="user_container">
        <div className="avatar">
            <img alt="avatar" src="/images/avatar.png"/>
        </div>
        <div className="nfo">
            <div>
                <div><span>Name:</span> {user.name}</div>
                <div><span>LastName:</span> {user.lastname}</div>
                <div><span>Email:</span> {user.email}</div>
            </div>
        </div>
            
        </div>
    )
}

export default Admin;

