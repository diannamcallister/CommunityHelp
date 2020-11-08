import React, { Component } from 'react';
import { List, Button, Image, Rating, Card } from 'semantic-ui-react';
import Dashboard from '../Dashboard/Dashboard';
import firstPlaceImage from '../../Images/firstPlace.png';
import secondPlaceImage from '../../Images/secondPlace.png';
import thirdPlaceImage from '../../Images/thirdPlace.png';
import PinkUserLogo from '../../Images/PinkUserLogo.png';
import GreenUserLogo from '../../Images/GreenUserLogo.png';
import OrangeUserLogo from '../../Images/OrangeUserLogo.png';
import { Link } from "react-router-dom";
import "./AdminUserPage.css";

class AdminUserPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            //Will need to populate the topTree array with users from the backend
            topThree : [
              {id: 1, image: firstPlaceImage, name: 'Mathew'},
              {id: 2, image: secondPlaceImage, name: 'Lin'},
              {id: 3, image: thirdPlaceImage, name: 'Shannon'}
            ],
            //Will need to populate the allPlayers array with users from the backend
            allPlayers : [
              {id: 4, image: PinkUserLogo, name: 'Molly', rating: 4},
              {id: 5, image: GreenUserLogo, name: 'Mark', rating: 3},
              {id: 6, image: OrangeUserLogo, name: 'Lui', rating: 2},
              {id: 7, image: PinkUserLogo, name: 'Hannah', rating: 1}
            ],

            isAdmin: this.props.location.state === undefined ? true : this.props.location.state.isAdmin,
            username: this.props.location.state === undefined ? '' : this.props.location.state.username
        }
    
    }

    handleClick(e) {
        console.log(e.target.parentElement.id)
        this.setState({allPlayers: this.state.allPlayers.filter(function(person) { 
            return person.name !== e.target.id
        })});

    }

    handleCardClick(e) {
        this.setState({topThree: this.state.topThree.filter(function(person) { 
            return person.name !== e.target.id
        })});

    }

      render() {
        return (
            <div>
            <Dashboard
                isAdmin = {this.state.isAdmin}
                username = {this.state.username}
            />
            <h1 id='header'> Users </h1>
            <Card.Group className='card_group' itemsPerRow={3} centered>
              {this.state.topThree.map(item => 
                <Card className='topThree' fluid raised key={item.name} id={item.name}>
                <Image src={item.image} wrapped ui={false} className='topThreeImage' />
                <Card.Content>
                  <Card.Header>{item.name} </Card.Header>
                </Card.Content>
                <Card.Content extra>
                <Rating defaultRating={5} maxRating={5} disabled  icon='star' id='rating'/> 
                </Card.Content>
                <Card.Content extra> <Button basic as={Link} to={{pathname:'/UserProfile', state:{isAdmin:this.state.isAdmin, username:this.state.username}}}>Learn More</Button> <Button circular className='remove' id={item.name} onClick={(e) => this.handleCardClick(e)}>x</Button> </Card.Content>
                </Card>
                
              )}
            </Card.Group>
            <List selection divided id='list'>
    
                {this.state.allPlayers.map(item =>
                  <List.Item id={item.name} key={item.name}>
                  <List.Content>
                    <Button circular className='remove' id={item.name} onClick={(e) => this.handleClick(e)}>x</Button>
                  </List.Content >
                  <List.Content as={Link} to={{pathname:'/UserProfile', state:{isAdmin:this.state.isAdmin, username:this.state.username}}}>
                  <Image avatar src={item.image} />
                  </List.Content>
                  <List.Content as={Link} to={{pathname:'/UserProfile', state:{isAdmin:this.state.isAdmin, username:this.state.username}}} >{item.name}</List.Content>
                  <Rating defaultRating={item.rating} maxRating={5} disabled  icon='star' id='rating' as={Link} to={{pathname:'/UserProfile', state:{isAdmin:this.state.isAdmin, username:this.state.username}}} />
                  </List.Item>
    
                )}
            </List>
            </div>
        )
    }
}
    

export default AdminUserPage;