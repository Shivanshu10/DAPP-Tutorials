import { Menu } from "semantic-ui-react";
import { Link } from "../routes";

export default () => {
  return (
    <Menu style={{ marginTop: "10px" }}>
      <Link route="/">
        <a className="item">CrowdCoin</a>
      </Link>

      <Menu.Menu position="right">
        <Link route="/">
          <a className="item">Campagins</a>
        </Link>
      </Menu.Menu>

      <Link route="/campaings/new">
        <a className="item">+</a>
      </Link>
    </Menu>
  );
};
