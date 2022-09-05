import axios from "axios";
import { SIGN_IN } from "../../constants/routes";
// sign user
const signInStart = () => {
    return {
        type: "signInStart"
    };
};

const signInError = (error) => {
    return {
        type: "signInError",
        error,
    };
};

const signInSuccess = () => {
    return {
        type: "signInSuccess"
    };
};

export const signIn = (data, history) => {
    return function (dispatch) {
        dispatch(signInStart());
        axios.post("http://localhost:8000/user/sign-in", {...data}, {
            withCredentials: true
        })
        .then((response) => {
            if (response.status === 200) {
                dispatch(signInSuccess())
                history.push('/');
            }
            else {
                dispatch(signInError({error: "Incorrect Email or Password"}));
            }
        })
        .catch(() => dispatch(signInError({error: "Incorrect Email or Password"})));
    }
};

// get user 
const getUserStart = () => {
    return {
        type: "getUserStart"
    };
};

const getUserError = (error) => {
    return {
        type: "getUserError",
        error,
    };
};

const getUserSuccess = (user) => {
    return {
        type: "getUserSuccess",
        user,
    };
};

export const getUser = () => {
    return function (dispatch) {
        dispatch(getUserStart());
        axios.get("http://localhost:8000/user", {
            withCredentials: true,
        })
        .then((response) => {
            if (response.data.user) {
                dispatch(getUserSuccess(response.data.user))
            }
            else {
                dispatch(getUserError({error: "Not Access"}));
            }
        })
        .catch(() => dispatch(getUserError({error: "Not Access"})));
    }
};

const startUserLogOut = () => {
    return {
        type: "startUserLogOut"
    }
};

const errorUserLogOut = (error) => {
    return {
        type: "errorUserLogOut",
        error,
    }
};

const successUserLogOut = (payload) => {
    return {
        type: "successUserLogOut",
        payload,
    }
};

export const userLogOut = (history) => {
    return function (dispatch) {
        dispatch(startUserLogOut());
        axios.get("http://localhost:8000/user/log-out", {
            withCredentials: true,
        })
        .then((response) => {
            if(response.data.success) {
                dispatch(successUserLogOut(response.data))
            }
            else {
                dispatch(errorUserLogOut(response.data.error))
            }
        })
        .catch((err) => dispatch(errorUserLogOut(err)))
    };
};

const startUpdateUser = () => {
    return {
        type: "startUpdateUser"
    };
};

const errorUpdateUser = (error) => {
    return {
        type: "errorUpdateUser"
    };
};

const successUpdateUser = (user) => {
    return {
        type: "successUpdateUser",
        user,
    };
};

export const updateUser = (column, value) => {
    return function (dispatch) {
        dispatch(startUpdateUser());
        axios.put("http://localhost:8000/user/update", { column, value }, {
            withCredentials: true,
        })
        .then((res) => {
            if(!res.data.error) {
                dispatch(successUpdateUser(res.data.user))
            }
            else {
                dispatch(errorUpdateUser(res.data.error))
            }
        })
        .catch((error) => dispatch(errorUpdateUser(error)))
    }
}

