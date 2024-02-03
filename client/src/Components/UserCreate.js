import {Component} from "react";
import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import { withRouter } from "react-router-dom";
import AppNavbar from "./AppNavbar";
import {Link} from "react-router-dom";



class UserCreate extends Component{
    emptyUser = {
        name: "",
        surname: "",
        login: "",
        email: "",
        password: ""
    }
    constructor(props) {
        super(props);
        this.state = {item: this.emptyUser};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;
        await fetch("http://localhost:8080/user/create", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        });
        this.props.history.push("/user");
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState(prevState => ({
            item: {
                ...prevState.item,
                [name]: value
            }
        }));
    }

    render() {
        const {item} = this.state;
        const title = <h2>Create user</h2>;

        return <div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text" name="name" id="name"
                               value={item.name}
                               onChange={this.handleChange}
                               placeholder="Enter your name (at least two symbols)"
                               autoComplete="name"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="surname">Surname</Label>
                        <Input type="text" name="surname" id="surname"
                               value={item.surname}
                               onChange={this.handleChange}
                               placeholder="Enter your surname (at least two symbols)"
                               autoComplete="surname"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="text" name="email" id="email"
                               value={item.email}
                               onChange={this.handleChange}
                               placeholder="Enter a valid email"
                               autoComplete="email"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="login">Login</Label>
                        <Input type="text" name="login" id="login"
                               value={item.login}
                               onChange={this.handleChange}
                               placeholder="Choose a unique login that is at least 2 symbols long"
                               autoComplete="login"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type="text" name="password" id="password"
                               value={item.password}
                               onChange={this.handleChange}
                               placeholder="Password must contain at least 7 symbols, one uppercase letter and one digit"
                               autoComplete="password"/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/user">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }

}

export default withRouter(UserCreate);