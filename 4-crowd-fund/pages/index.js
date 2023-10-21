import { Component } from "react";
import { Card, Button } from "semantic-ui-react";
import factory from "../ethereum/factory";
import Layout from "../components/layout";
import { Link } from "../routes";

class CampaignIndex extends Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedContracts().call();

    return { campaigns: campaigns };
  }

  renderCampaings() {
    const items = this.props.campaigns.map((address) => {
      return {
        header: address,
        description: <Link route={`/campaings/${address}`}><a>View Campagin</a></Link>,
        fluid: true,
      };
    });

    return <Card.Group items={items} />;
  }
  render() {
    return (
      <Layout>
        <div>
          <h3>Open Campagins</h3>

          <Link route="/campaings/new">
            <a>
              <Button
                content="Create Campaing"
                floated="right"
                icon="add"
                primary
              />
            </a>
          </Link>
          {this.renderCampaings()}
        </div>
      </Layout>
    );
  }
}

export default CampaignIndex;
