import React, { Component } from 'react'
import { Menu, Button } from 'semantic-ui-react'
import { Link } from "react-router-dom";

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isAdmin: this.props.isAdmin
        };
    }

    state = {}

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

    return (
        <Menu color={"green"} inverted widths={5}>
            {this.state.isAdmin ? 
                <Menu.Item as={Link} to={{pathname:'/AdminUserPage', state:{isAdmin:this.state.isAdmin}}}
                name='Users'
                active={activeItem === 'Users'}
                onClick={this.handleItemClick}
                />
                : 
                <Menu.Item as={Link} to={{pathname:'/UserPage', state:{isAdmin:this.state.isAdmin}}}
                name='Users'
                active={activeItem === 'Users'}
                onClick={this.handleItemClick}
                />
            }
            <Menu.Item as={Link} to={{pathname:'/alltasks', state:{isAdmin:this.state.isAdmin}}}
            name='Job Board'
            active={activeItem === 'JobBoard'}
            onClick={this.handleItemClick}
            />
            <Menu.Item as={Link} to={{pathname:'/UserProfile', state:{isAdmin:this.state.isAdmin}}}
            name='Profile'
            active={activeItem === 'Profile'}
            onClick={this.handleItemClick}
            />
            <Menu.Item name='Logout' as={Link} to={{pathname:'/authentication'}}
            active={activeItem === 'Logout'}
            onClick={this.handleItemClick}>
                <Button primary>
                    Logout
                </Button>
            </Menu.Item>
            
        </Menu>
    )
  }
}

export default Dashboard 