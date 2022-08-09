const initialState = {
    userInfo: {},
    contactsInfo:[]
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        
        case "SET_INFO": {
            return {
                ...state,
                userInfo: action.payload
            }
        }

        default:
            return state;
    }
    
}

export default reducer;