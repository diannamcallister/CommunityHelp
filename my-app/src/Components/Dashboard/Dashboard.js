import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from "react-router-dom";

import "./Dashboard.css";

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user
        };
    }

    state = {}

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

    return (
        <Menu id='menu' inverted widths={5}>
            
            <Menu.Item as={Link} to={{pathname:'/UserPage', state:{user:this.props.user}}}
            name='Users'
            active={activeItem === 'Users'}
            onClick={this.handleItemClick}
            />
            <Menu.Item as={Link} to={{pathname:'/alltasks', state:{user:this.props.user}}}
            name='Job Board'
            active={activeItem === 'JobBoard'}
            onClick={this.handleItemClick}
            />
            <Menu.Item as={Link} to={{pathname:'/UserProfile', state:{user:this.props.user, userToView:this.props.user}}}
            name='Profile'
            active={activeItem === 'Profile'}
            onClick={this.handleItemClick}
            />
            <Menu.Item name='Logout' as={Link} to={{pathname:'/'}}
            active={activeItem === 'Logout'}
            onClick={this.handleItemClick}>
            </Menu.Item>
            
        </Menu>
    )
  }
}

export default Dashboard 