import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './App.css';
import Home from './components/Home'
import Temp from './components/Temp'
import ShowInfo from './components/ShowInfo'
import Login from './components/layout/Login/Login'
import Signup from './components/layout/Login/Signup'
import MyLists from './components/layout/Home/MyLists/MyLists';


function App() {
  return (
    <div> 
     <Router>
        <Switch>
          <Route exact path="/temp" component={Temp}></Route>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/signup" component={Signup}></Route>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/tv/:id" component={ShowInfo}></Route>
          <Route exact path="/mylists" component={MyLists}></Route>
         </Switch>
      </Router>
    </div>
  );
}

export default App;
