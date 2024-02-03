import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

import {Component} from "react";
import {Button, ButtonGroup, Container, Table} from "reactstrap";
import {Link} from "react-router-dom";
import { withRouter } from "react-router-dom";
import AppNavbar from "./AppNavbar";


class CardList extends Component{
    state = {cards: []}
    async componentDidMount(){
        console.log("Bank card list mounted");
        const response = await fetch("http://localhost:8080/card");
        const body = await response.json();
        this.setState({cards: body});
    }

    async remove(number) {
        await fetch(`http://localhost:8080/card/number/${number}/delete`,
            {
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json"
                }
            }
        ).then(() => {
            let updateCards = [...this.state.cards].filter((u => u.cardNumber !== number));
            this.setState({cards: updateCards})

        })
    }
    async activate(number) {
        await fetch(`http://localhost:8080/card/number/${number}/activate`,
            {
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json"
                }
            }).then(() => {
            let updateCards = [...this.state.cards];
            for (let card of updateCards) {
                if (card.cardNumber === number) {
                    card.active = true;
                    break;
                }
            }
            this.setState({cards: updateCards});
            }

        );
    }
    async deactivate(number) {
        await fetch(`http://localhost:8080/card/number/${number}/deactivate`,
            {
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json"
                }
            }).then(() => {
                let updateCards = [...this.state.cards];
                for (let card of updateCards) {
                    if (card.cardNumber === number) {
                        card.active = false;
                        break;
                    }
                }
                this.setState({cards: updateCards});
            }

        );
    }



    render() {
        const {cards, isLoading} = this.state;
        if (isLoading) {
            return <p>Loading...</p>
        }
        const cardList = cards.map(card => {
            return <tr key={card.cardNumber}>
                <td style={{whiteSpace: 'nowrap'}}>{card.cardNumber}</td>
                <td>{card.currency}</td>
                <td>{card.balance}</td>
                <td>{card.active ? "Active" : "Inactive"}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/card/number/" + card.cardNumber + "/update"}>Edit</Button>
                        <Button size="sm" color="secondary" onClick={() => card.active ? this.deactivate(card.cardNumber) : this.activate(card.cardNumber)}>{card.active ? "Deactivate": "Activate"}</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(card.cardNumber)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/card/create">Add bank card</Button>
                    </div>
                    <h3>Bank cards</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="30%">Card number</th>
                            <th width="30%">Currency</th>
                            <th width="30%">Balance</th>
                            <th width="30%">Active</th>
                            <th width="40%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {cardList}
                        </tbody>
                    </Table>
                </Container>
            </div>

        );
    }
}


export default withRouter(CardList)