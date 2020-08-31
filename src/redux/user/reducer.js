
export const initialState = {
    isLoading_Auth: false,
    isAuthenticated: false,
    isAuthChecking: false,
    user: {},
    error_auth: ""
};

export default function appReducer(state = initialState, action) {
    switch (action.type) {
        case "AUTH_IS_LOADING":
            return {
                ...state,
                isLoading_Auth: action.isLoading,
                error_auth: action.error ? action.error : "",
            };
        case "AUTH_SET_USER":
            return {
                ...state,
                user: action.user,
                isAuthenticated: true
            };
            case "AUTH_LOGOUT":
                return {
                    ...state,
                    isAuthenticated: false,
                    user: {},
                };
        default:
            return state;
    }
}
