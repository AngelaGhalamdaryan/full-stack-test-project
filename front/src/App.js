import React, { useEffect } from "react";
import Routes from "./pages/Routes";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from './redux/actions/user';
import './App.scss';

function App() {
  const { auth, user } = useSelector((state) => state.user);
  const { isFetching } = useSelector((state) => state.pageLoad);
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(getUser());
  }, [auth, dispatch]);

  return (
    <div id="app--container" className={!auth ? "app-container" : `app-container ${user.theme}`}>
      {/* {
        user.theme === "dark" && (
        <div className="blured--container">
          <div className="redBlured" />
          <div className="blueBlured" />
          <div className="orangeBlured" />
        </div>
      )} */}
      {!isFetching && <Routes authUser={auth} />}
      {isFetching && <div>loading</div>}
    </div>
  );
}

export default App;
