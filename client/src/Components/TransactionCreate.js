import {Component} from "react";
import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import { withRouter } from "react-router-dom";
import AppNavbar from "./AppNavbar";
import {Link} from "react-router-dom";



class TransactionCreate extends Component{
    emptyTransaction = {
        date: "",
        amount: 0,
        currency: "",
        senderLogin: "",
        receiverLogin: ""
    }
    constructor(props) {
        super(props);
        this.state = {item: this.emptyTransaction};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;
        console.log(JSON.stringify(item));
        await fetch("http://localhost:8080/user/login/" + item.senderLogin + "/create/transaction/" + item.receiverLogin, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        });
        this.props.history.push("/transaction");
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
        const title = <h2>Make transaction</h2>;

        return <div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="date">Date</Label>
                        <Input type="date" name="date" id="date"
                               value={item.date}
                               onChange={this.handleChange}
                               autoComplete="date"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="amount">Amount</Label>
                        <Input type="number" name="amount" id="amount"
                               value={item.amount}
                               onChange={this.handleChange}
                               placeholder="Enter, how much money you want to transfer"
                               autoComplete="amount"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="currency">Currency</Label>
                        <Input type="text" name="currency" id="currency"
                               value={item.currency}
                               onChange={this.handleChange}
                               placeholder="Choose a currency from [CZK, USD, EUR]"
                               autoComplete="currency"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="senderLogin">Sender</Label>
                        <Input type="text" name="senderLogin" id="senderLogin"
                               value={item.senderLogin}
                               onChange={this.handleChange}
                               placeholder="Enter a sender login (Check if you have enough money)"
                               autoComplete="senderLogin"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="receiverLogin">Receiver</Label>
                        <Input type="text" name="receiverLogin" id="receiverLogin"
                               value={item.receiverLogin}
                               onChange={this.handleChange}
                               placeholder="Enter a receiver login"
                               autoComplete="receiverLogin"/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/transaction">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }

}

export default withRouter(TransactionCreate);