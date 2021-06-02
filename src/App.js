import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './App.css';
import Home from './components/Home'
import ShowInfo from './components/ShowInfo'


function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/tv/:id" component={ShowInfo}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
