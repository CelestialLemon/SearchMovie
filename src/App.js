import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './App.css';
import Home from './components/Home'
import Temp from './components/Temp'
import ShowInfo from './components/ShowInfo'
import SeasonInfoCard from './components/layout/SeasonList/SeasonInfoCard'


function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/temp" component={Temp}></Route>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/tv/:id" component={ShowInfo}></Route>
          <Route exact path="tv/:id/seasons" component={SeasonInfoCard}></Route>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
