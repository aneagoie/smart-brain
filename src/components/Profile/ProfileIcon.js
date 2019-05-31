import React from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

class ProfileIcon extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
    };
  }

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  };

  signoutHandler = () => {
    window.sessionStorage.removeItem('token');
    this.props.onRouteChange('signout');
  }

  render() {
    return (
      <div className="pa4 tc">
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle
            tag="span"
            data-toggle="dropdown"
            aria-expanded={this.state.dropdownOpen}
          >
            <img
              src={this.props.profileIconUrl}
              className="br-100 ba h3 w3 dib"
              alt="avatar"
            />
          </DropdownToggle>
          <DropdownMenu
            className="b--transparent shadow-5"
            style={{backgroundColor:'rgba(255, 255, 255, 0.5)'}}>
            <DropdownItem onClick={this.props.toggleModal}>View Profile</DropdownItem>
            <DropdownItem onClick={this.signoutHandler}>Sign Out</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }
}

export default ProfileIcon;
