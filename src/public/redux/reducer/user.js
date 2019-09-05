const initialState = {
    userList: [],
    isLoading: false,
    isFulfilled: false,
    isRejected: false,
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case 'POST_REGIST_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulfilled: false,
                isRejected: false,
            }
        case 'POST_REGIST_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            }
        case 'POST_REGIST_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                userList: action.payload.data.result,
            }
        case 'POST_LOGIN_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulfilled: false,
                isRejected: false,
            }
        case 'POST_LOGIN_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            }
        case 'POST_LOGIN_FULFILLED':
            localStorage.setItem('idUser', action.payload.data.result.id_user)
            localStorage.setItem('token', action.payload.data.result.token)
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                userList: action.payload.data.result,
            }
        case 'LOGOUT_USER_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulfilled: false,
                isRejected: false,
            }
        case 'LOGOUT_USER_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            }
        case 'LOGOUT_USER_FULFILLED':
            localStorage.clear()
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                userList: action.payload.data.result,
            }
        default:
            return state
    }
};

export default user