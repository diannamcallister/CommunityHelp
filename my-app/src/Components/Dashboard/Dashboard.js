import React, { Component } from 'react'
import { Menu, Button } from 'semantic-ui-react'
import "./Dashboard.css"

class Dashboard extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
        <Menu id='menu' inverted widths={5}>
            <Menu.Item
            name='Users'
            active={activeItem === 'Users'}
            onClick={this.handleItemClick}
            />
            <Menu.Item
            name='Job Board'
            active={activeItem === 'JobBoard'}
            onClick={this.handleItemClick}
            />
            <Menu.Item
            name='Profile'
            active={activeItem === 'Profile'}
            onClick={this.handleItemClick}
            />
            <Menu.Item name='Logout'
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