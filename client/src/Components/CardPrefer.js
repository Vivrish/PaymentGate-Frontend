import {Component} from "react";
import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import { withRouter } from "react-router-dom";
import AppNavbar from "./AppNavbar";
import {Link} from "react-router-dom";



class CardPrefer extends Component{
    emptyCard = {
        cardNumber: 0
    }
    constructor(props) {
        super(props);
        this.state = {item: this.emptyCard};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;
        console.log(JSON.stringify(item));
        await fetch(`http://localhost:8080/user/login/${this.props.match.params.login}/prefer/` + item.cardNumber, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        this.props.history.push("/user");
    }

    handleChange(event) {
        const { name, value, type } = event.target;
        let val = type === 'checkbox' ? event.target.checked : value;

        if (type === 'number') {
            val = parseFloat(value);
        }

        this.setState(prevState => ({
            item: {
                ...prevState.item,
                [name]: val
            }
        }));
    }

    render() {
        const {item} = this.state;
        const title = <h2>Prefer bank card</h2>;

        return <div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="cardNumber">Card number</Label>
                        <Input type="number" name="cardNumber" id="cardNumber"
                               value={item.cardNumber}
                               onChange={this.handleChange}
                               placeholder="Enter number of one of your cards. It will be used for all operations"
                               autoComplete="number"/>
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

export default withRouter(CardPrefer);