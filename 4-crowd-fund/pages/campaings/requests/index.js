import { Component } from "react";
import { Button, Table } from "semantic-ui-react";
import { Link } from "../../../routes";
import Layout from "../../../components/layout";
import Campaign from "../../../ethereum/campaign";
import RequestRow from "../../../components/requestRow";

class RequestIndex extends Component {
    static async getInitialProps(props) {
        const campaign = Campaign(props.query.address);
        const requestsCount = await campaign.methods.getRequestsCount().call();
        const summary = await campaign.methods.getSummary().call();

        const requests = await Promise.all(
            Array(parseInt(requestsCount)).fill().map((element, index) => {
                return campaign.methods.requests(index).call();
            })
        );

        return {
          address: props.query.address,
          requests: requests,
          approversCount: summary[3],
          requestsCount: requestsCount
        }
    }

    renderRow() {
        return this.props.requests.map((request, index) => {
            return <RequestRow
                id={index}
                key={index} 
                request={request}
                address={this.props.address}
                approversCount={this.props.approversCount}
            />
        });
    }

    render() {
        const { Header, Row, HeaderCell, Body } = Table;

        return (
            <Layout>
                <h1>Requests</h1>
                <Link route={`/campaings/${this.props.address}/requests/new`}>
                    <a>
                        <Button primary floated="right" style={{marginBottom: "10px"}}>Add Request</Button>
                    </a>
                </Link>
                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>ID</HeaderCell>
                            <HeaderCell>Description</HeaderCell>
                            <HeaderCell>Amount</HeaderCell>
                            <HeaderCell>Recipient</HeaderCell>
                            <HeaderCell>Approval Count</HeaderCell>
                            <HeaderCell>Approve</HeaderCell>
                            <HeaderCell>Finalize</HeaderCell>
                        </Row>
                    </Header>
                    <Body>
                        {this.renderRow()}
                    </Body>
                </Table>
                <div>Found {this.props.requestsCount} requests</div>
            </Layout>
        )
    }
}

export default RequestIndex;