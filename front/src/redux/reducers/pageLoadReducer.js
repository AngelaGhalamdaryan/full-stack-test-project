import pageLoadState from "../states/pageLoad";

const pageLoadReducer = (state = pageLoadState, action) => {
    let temp = { ...state };

    if (action.type === "getUserStart") {
        temp.isFetching = true;
    }

    if (action.type === "getUserSuccess" || action.type === "getUserError" ) {
        temp.isFetching = false;
    }
    return temp;
};

export default pageLoadReducer;