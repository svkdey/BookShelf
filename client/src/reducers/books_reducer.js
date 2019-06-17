export default function (state = {}, action) {
    switch (action.type) {
        // case value:
        case 'GET_BOOKS':
            return {...state,list:action.payload}
        case 'GET_BOOK':
            return {...state,book:action.payload}
        case 'Update_BOOK':
            return {...state,
                    updateBook:action.payload,
                    // book: action.payload.doc
            }
        case 'GET_BOOK_W_REVIEWER':
            return {
                ...state,
                book: action.payload.book,
                reviewer: action.payload.reviewer
            }
        case 'CLEAR_STATE':
              return {
                  ...state,
                  book: action.payload.book,
                reviewer: action.payload.reviewer
              }
        case 'ADD_BOOK':
               return {
                   ...state,newBook:action.payload
               }
        case 'CLEAR_NEWBOOK':
             return {
                 ...state,
                 newBook: action.payload
             }
        case 'CLEAR_UPDATEBOOK':
             return {
                 ...state,
                 updateBook: action.payload
             }
        case 'DELETE_BOOK':
            return {
                ...state,
                postDeleted:action.payload
            }
        case 'CLEAR_DEL_BOOK':
           return {
                 ...state,
                 book: action.payload.book,
                 updateBook: action.payload.updateBook,
                 postDeleted: action.payload.postDeleted,
            }
       
        default:
            return state;
    }


}