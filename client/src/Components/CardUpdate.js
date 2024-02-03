import {Component} from "react";
import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import { withRouter } from "react-router-dom";
import AppNavbar from "./AppNavbar";
import {Link} from "react-router-dom";



class CardUpdate extends Component{
    emptyCard = {
        cardNumber: 0,
        cvv: 0,
        currency: "",
        balance: 0,
        active: false,
        expirationDate: ""
    }
    constructor(props) {
        super(props);
        this.state = {item: this.emptyCard};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async componentDidMount() {
        const {item} = this.state;
        console.log(item.login);
        const card = await (await fetch(`http://localhost:8080/card/number/${this.props.match.params.number}`)).json();
        this.setState({item: card});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;
        console.log("/card/number/" + item.cardNumber + "/update");
        console.log(JSON.stringify(item));
        await fetch("http://localhost:8080/card/number/" + item.cardNumber + "/update", {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        });
        this.props.history.push("/card");
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
        const title = <h2>Add bank card</h2>;

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
                               placeholder="Enter unique card number (4 digits)"
                               autoComplete="number"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="cvv">CVV</Label>
                        <Input type="number" name="cvv" id="cvv"
                               value={item.cvv}
                               onChange={this.handleChange}
                               placeholder="CVV must be exacty 3 digits (0xx, 00x and 000 are forbidden)"
                               autoComplete="surname"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="balance">Balance</Label>
                        <Input type="number" name="balance" id="balance"
                               value={item.balance}
                               onChange={this.handleChange}
                               placeholder="Enter your balance"
                               autoComplete="balace"/>
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
                        <Label for="expirationDate">Expiration date</Label>
                        <Input type="date" name="expirationDate" id="expirationDate"
                               value={item.expirationDate}
                               onChange={this.handleChange}
                               placeholder="YYYY-MM-DD"
                               autoComplete="expirationDate"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="active">Active</Label>
                        <Input type="checkbox" name="active" id="active"
                               value={item.active}
                               onChange={this.handleChange}
                               placeholder="true or false"
                               autoComplete="active"/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/card">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }

}

export default withRouter(CardUpdate);