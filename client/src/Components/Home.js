import React, { Component } from 'react';
import '../App.css';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';
import { withRouter } from "react-router-dom";

class Home extends Component {


    render() {
        return (
            <div>
                <AppNavbar/>
                <Container className="Container" fluid>
                    <Button className="home-button" tag={Link} to="/user">Users</Button>
                    <Button className="home-button" tag={Link} to="/card">Bank cards</Button>
                    <Button className="home-button" tag={Link} to="/transaction">Transactions</Button>
                </Container>
            </div>
        );
    }
}
export default withRouter(Home);