const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        currentUser: null,
        isFetching: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        currentUser: action.payload,
        isFetching: false,
        error: false,
      };
    case "LOGIN_FAILURE":
      return {
        currentUser: null,
        isFetching: false,
        error: action.payload,
      };
    case "REGISTER_START":
      return {
        currentUser: null,
        isFetching: true,
        error: false,
      };
    case "REGISTER_SUCCESS":
      return {
        currentUser: action.payload,
        isFetching: false,
        error: false,
      };
    case "REGISTER_FAILURE":
      return {
        currentUser: null,
        isFetching: false,
        error: action.payload,
      };
    case "LOGOUT_SUCCESS":
      return {
        currentUser: null,
        isFetching: false,
        error: false,
      };
    case "FOLLOW":
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          followings: [...state.currentUser.followings, action.payload],
        },
      };
    case "UNFOLLOW":
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          followings: state.currentUser.followings.filter(
            (id) => id !== action.payload
          ),
        },
      };
    case "EDIT_PROFILE":
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

export default AuthReducer;
