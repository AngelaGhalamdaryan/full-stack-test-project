import userState from '../states/user';

const userReducer = (state = userState, action) => {
    let temp = { ...state };
    
    if (action.type === "signInSuccess") {
        temp.auth = true;
    }

    if(action.type === "getUserError") {
        temp.auth = false;
    }

    if (action.type === "getUserSuccess") {
        temp.auth = true;
        temp.user = action.user;
    }
    if (action.type === "successUserLogOut") {
        temp.auth = false;
    }
    if (action.type === "successUpdateUser") {
        temp.user = action.user;
    }
    return temp;
};

export default userReducer;