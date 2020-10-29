import React, { Component } from 'react';
import { List, Header , Icon , Button, Image, Rating} from 'semantic-ui-react';
import Dashboard from '../Dashboard/Dashboard.js';
import './UserPage.css'

class UserPage extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
        <div>
        <Dashboard>
        </Dashboard>
        <h1 id='header'> Users </h1>
        <List selection divided id='list'>
            <List.Item >
            <Image avatar src={require('../../Images/PinkUserLogo.png')} />
            <List.Content>1.  Lena</List.Content>
            <Rating defaultRating={5} maxRating={5} disabled  icon='star' id='rating'/>
            </List.Item>
            <List.Item>
            <Image avatar src={require('../../Images/GreenUserLogo.png')} />
            <List.Content>2.  Lindsay</List.Content>
            <Rating defaultRating={4} maxRating={5} disabled  icon='star' id='rating'/>
            </List.Item>
            <List.Item>
            <Image avatar src={require('../../Images/OrangeUserLogo.png')}/>
            <List.Content>3. Mark</List.Content>
            <Rating defaultRating={3} maxRating={5} disabled  icon='star' id='rating'/>
            </List.Item>
            <List.Item>
            <Image avatar src={require('../../Images/PinkUserLogo.png')} />
            <List.Content>4.  Molly</List.Content>
            <Rating defaultRating={1} maxRating={5} disabled  icon='star' id='rating'/>
            </List.Item>
        </List>
        </div>
    )
  }
}

export default UserPage;