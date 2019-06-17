import axios from 'axios';

export function getBooks(limit = 10,
    start = 0,
    order = 'asc',
    list = '') {
//    console.log(`/api/getBooks?limit=${limit}&skip=${start}&order=${order}`)
    const request = axios.get(`/api/getBooks?skip=${start}&limit=${limit}&order=${order}`)
                        .then(res=>{
                            if(list){
                                return [...list,...res.data]
                            }else return res.data;
                        }).catch(e=>console.log(e))
    return {
        type:'GET_BOOKS',
        payload: request
    }
}
export function getUserPosts(userId){
    const request = axios.get(`/api/user_post?id=${userId}`)
                    .then(res=>res.data)
    return {
        type:'GET_USER_POST',
        payload: request
    }
}
export function getBookbyId(id){
    const request = axios.get(`/api/getBook?id=${id}`)
    .then(res=>res.data)
    return {
        type:'GET_BOOK',
        payload:request
    }


}

export function getBookWithReviewer(id){
    const request = axios.get(`/api/getBook?id=${id}`)

    //using react thunk;
    return (dispatch)=>{
        request.then(({data})=>{
            let book=data;
            // console.log(book)
            axios.get(`/api/getReviewer?id=${book.ownerId}`)
            .then((({data})=>{
                let response={
                    book,
                    reviewer:data
                }
                 dispatch({
                     type: 'GET_BOOK_W_REVIEWER',
                     payload: response
                 })
            }))
            // console.log(book)
           
        })
    }
                    
}
export function clearState(){
    return {
        type:'CLEAR_STATE',
        payload: {
            book:{},
            reviewer: {}
        }
    }
}

export function loginUser({email,password}){
    const request=axios.post('/api/login',{email,password})
                        .then(res=>res.data)
    return {
        type:'USER_LOGIN',
        payload:request
    }
}

export function auth(){
    const request=axios.get('/api/auth')
                        .then(res=>res.data)
    return {
        type:'USER_AUTH',
        payload:request
    }
}

export function addBook(data){
    const request=axios.post('/api/book',data)
                        .then(res=>res.data)
    return {
        type:'ADD_BOOK',
        payload:request
    }
}
export function UpdateBook(data) {
    const request = axios.post(`/api/book_update`, data)
        .then(res => res.data)
    return {
        type: 'Update_BOOK',
        payload: request
    }
}
export function clearNewBook(){
    return {
        type:"CLEAR_NEWBOOK",
        payload:{}
    }
}

export function clearUpdateBook() {
    return {
        type: "CLEAR_UPDATEBOOK",
        payload: null
    }
}

export function deleteBook(id){
    const request = axios.delete(`/api/delete_book?_id=${id}`)
        .then(res=>res.data)
      return {
          type: "DELETE_BOOK",
          payload: request,
      }
}

export function clearDeletedBook(){
    return {
        type:'CLEAR_DEL_BOOK',
        payload:{
            book:null,
            updatedBook:false,
            postDeleted:false
        }
    }
}

export function getUsers(){
    const request=axios.get(`/api/users`)
    .then(res=>res.data)
    return {
        type:'GET_USERS',
        payload:request
    }
}

export function userRegister(user,userList){
    const request = axios.post(`/api/register`, user)
    return (dispatch)=>{
        request.then(({data})=>{
            let users = data.success ? [...userList, data.user] :userList
            let response={
                success:data.success,
                users: users
            }
            dispatch({
                type:'USER_REGISTER',
                payload:response
            })
        })
    }
}