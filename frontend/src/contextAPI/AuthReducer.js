const Reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS": {
            return {
                token: action.payload.token,
                id: action.payload.data.id,
                phone: action.payload.data.phone,
                role: action.payload.data.role,
                fullName: action.payload.data.fullName,
                error: null
            }
        }
        case "LOGIN_FAILURE": {
            return {
                token: null,
                error: action.payload
            }
        }
        case "LOGOUT" : {
            return {
                token: null,
                error: null
            }
        }
        default:
            return state;
    }
}
export default Reducer;