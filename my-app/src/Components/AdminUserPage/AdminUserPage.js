import React, { Component } from 'react';
import { List, Header , Icon , Button, Image, Rating} from 'semantic-ui-react';
import Dashboard from '../Dashboard/Dashboard';
import "./AdminUserPage.css";

class AdminUserPage extends Component {


  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    // const { activeItem } = this.state

    return (
        <div>
        <Dashboard
            isAdmin = {this.props.location.state === undefined ? true : this.props.location.state.isAdmin}
        />
        <h1 id='header'> Users </h1>
        <List selection divided verticalAlign='middle'>
            <List.Item >
            <List.Content id="listContentButton">
                <Button circular inverted id='remove' >x</Button>
            </List.Content>
            <Image avatar src={require('../../Images/GreenUserLogo.png')} />
            <List.Content>1.  Lena</List.Content>
            <Rating defaultRating={5} maxRating={5} disabled  icon='star' id='rating'/>
            </List.Item>
            <List.Item>
            <List.Content id="listContentButton">
                <Button circular inverted id='remove'>x</Button>
            </List.Content>
            <Image avatar src={require('../../Images/PinkUserLogo.png')} />
            <List.Content>2.  Lindsay</List.Content>
            <Rating defaultRating={4} maxRating={5} disabled  icon='star' id='rating'/>
            </List.Item>
            <List.Item>
            <List.Content id="listContentButton">
                <Button circular inverted id='remove'>x</Button>
            </List.Content>
            <Image avatar src={require('../../Images/OrangeUserLogo.png')}/>
            <List.Content>3. Mark</List.Content>
            <Rating defaultRating={3} maxRating={5} disabled  icon='star' id='rating'/>
            </List.Item>
            <List.Item>
            <List.Content id="listContentButton">
                <Button circular inverted id='remove'>x</Button>
            </List.Content>
            <Image avatar src={require('../../Images/GreenUserLogo.png')} />
            <List.Content>4.  Molly</List.Content>
            <Rating defaultRating={1} maxRating={5} disabled  icon='star' id='rating'/>
            </List.Item>
        </List>
        </div>
    )
  }
}

export default AdminUserPage;