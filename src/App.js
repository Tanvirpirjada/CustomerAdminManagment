// import rootReducer from "./reducers";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginComponent from "./component/LoginComponent";
import UserComponent from "./component/CustomerComponent";

// const store = configureStore(rootReducer);

const App = () => {
  return (
    <>
    <Router>
      <Routes>
     <Route path='/' Component={LoginComponent}></Route> 
     <Route path='/customer' Component={UserComponent}></Route> 
     </Routes>
      </Router>
      </>
  );
};

export default App;
