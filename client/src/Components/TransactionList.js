import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

import {Component} from "react";
import {Button, Container, Table} from "reactstrap";
import {Link} from "react-router-dom";
import { withRouter } from "react-router-dom";
import AppNavbar from "./AppNavbar";
class TransactionList extends Component {
    state = {transactions: []}
    async componentDidMount(){
        const response = await fetch("http://localhost:8080/transaction");
        const body = await response.json();
        this.setState({transactions: body});
    }


    render() {
        const {transactions, isLoading} = this.state;
        if (isLoading) {
            return <p>Loading...</p>
        }
        const transactionList = transactions.map(transaction => {
            return <tr key={transaction.date}>
                <td style={{whiteSpace: 'nowrap'}}>{transaction.date}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.currency}</td>
                <td>{transaction.senderLogin}</td>
                <td>{transaction.receiverLogin}</td>
                <td>{transaction.successful ? "Success" : "Fail"}</td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/transaction/create">Make transaction</Button>
                    </div>
                    <h3>Transactions</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="30%">Date</th>
                            <th width="30%">Amount</th>
                            <th width="30%">Currency</th>
                            <th width="30%">Sender</th>
                            <th width="30%">Receiver</th>
                            <th width="40%">Successful</th>

                        </tr>
                        </thead>
                        <tbody>
                        {transactionList}
                        </tbody>
                    </Table>
                </Container>
            </div>

        );
    }

}
export default withRouter(TransactionList);