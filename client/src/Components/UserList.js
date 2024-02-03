import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

import {Component} from "react";
import {Button, ButtonGroup, Container, Table} from "reactstrap";
import {Link} from "react-router-dom";
import { withRouter } from "react-router-dom";
import AppNavbar from "./AppNavbar";
class UserList extends Component {
    state = {users: []}
    async componentDidMount(){
        console.log("User list");
        const response = await fetch("http://localhost:8080/user");
        console.log(response);
        console.log(response.body);
        const body = await response.json();
        this.setState({users: body});
    }

    async remove(login) {
        await fetch(`http://localhost:8080/user/login/${login}/delete`,
            {
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json"
                }
            }
        ).then(() => {
            let updateUsers = [...this.state.users].filter((u => u.login !== login));
            this.setState({users: updateUsers})

        })
    }



    render() {
        const {users, isLoading} = this.state;
        if (isLoading) {
            return <p>Loading...</p>
        }
        const userList = users.map(user => {
            return <tr key={user.login}>
                <td style={{whiteSpace: 'nowrap'}}>{user.name}</td>
                <td>{user.surname}</td>
                <td>{user.login}</td>
                <td>{user.preferredCardNumber}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="dark" tag = {Link} to={"/user/login/" + user.login + "/assign"}>Assign</Button>
                        <Button size="sm" color="secondary" tag = {Link} to={"/user/login/" + user.login + "/prefer"}>Prefer</Button>
                        <Button size="sm" color="primary" tag={Link} to={"/user/login/" + user.login + "/update"}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(user.login)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/user/create">Add User</Button>
                    </div>
                    <h3>Users</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="30%">Name</th>
                            <th width="30%">Surname</th>
                            <th width="30%">Login</th>
                            <th width="30%">Card</th>
                            <th width="40%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {userList}
                        </tbody>
                    </Table>
                </Container>
            </div>

        );
    }

}
export default withRouter(UserList);