import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from "./Components/Home";
import UserList from "./Components/UserList";
import UserCreate from "./Components/UserCreate";
import UserUpdate from "./Components/UserUpdate";
import CardList from "./Components/CardList";
import CardCreate from "./Components/CardCreate";
import CardUpdate from "./Components/CardUpdate";
import TransactionList from "./Components/TransactionList";
import TransactionCreate from "./Components/TransactionCreate";
import CardAssign from "./Components/CardAssign";
import CardPrefer from "./Components/CardPrefer";

const App = () => {
    return (
        <div>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/user" exact component={UserList}/>
                <Route path="/user/create" exact component={UserCreate}/>
                <Route path="/user/login/:login/update" component={UserUpdate}/>
                <Route path="/user/login/:login/assign" component={CardAssign}/>
                <Route path="/user/login/:login/prefer" component={CardPrefer}/>
                <Route path="/card" exact component={CardList}/>
                <Route path="/card/create" exact component={CardCreate}/>
                <Route path="/card/number/:number/update" exact component={CardUpdate}/>
                <Route path="/transaction" exact component={TransactionList}/>
                <Route path="/transaction/create" exact component={TransactionCreate}/>
            </Switch>
        </div>
    );
};

export default App;
