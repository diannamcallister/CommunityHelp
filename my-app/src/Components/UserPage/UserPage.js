import React, { Component } from 'react';
import { List, Image, Rating, Card , Button} from 'semantic-ui-react';
import Dashboard from '../Dashboard/Dashboard.js';
import firstPlaceImage from '../../Images/firstPlace.png';
import secondPlaceImage from '../../Images/secondPlace.png';
import thirdPlaceImage from '../../Images/thirdPlace.png';
import { Redirect, Link } from "react-router-dom";
import './UserPage.css';
import '../../basics-stylesheet.css'
import { getAllUsers, deleteUser } from '../../actions/userpage.js';


class UserPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
        //is populated through the backend in componentDidMount()
        topThree : [],
        //is poulated through the backend in componentDidMount()
        allPlayers : [],
        user: this.props.location.state === undefined ? '': this.props.location.state.user,
        isAdmin: this.props.location.state === undefined ? '': this.props.location.state.user.isAdmin,
    }
    this.getAllUsers = getAllUsers.bind(this);
    this.deleteUser = this.deleteUser.bind(this);

  }

  async componentDidMount() {
    let users = await this.getAllUsers(this.state.user.location); 
    let topThreeArr = []
    let allPlayersArr = []
    await users.map((curr, index) => {
      if (!curr.isAdmin) {
        if (index < 3){
          let top_image = null
          if (index === 0) {
            top_image = firstPlaceImage
          } else if (index === 1) {
            top_image = secondPlaceImage
          } else {
            top_image = thirdPlaceImage
          }
          let temp_obj = {id: curr.user._id, image: top_image, name: curr.user.name, rating: curr.avgRating, user: curr.user}
          topThreeArr.push(temp_obj)
        } else {
          let temp_obj = {id: curr.user._id, image: curr.user.image, name: curr.user.name, rating: curr.avgRating, user: curr.user}
          allPlayersArr.push(temp_obj)
        }
  
        this.setState({topThree: topThreeArr});
        this.setState({allPlayers: allPlayersArr});
      }
      })
  }

  async deleteUser(user) {
    //deleting user from the backend
    await deleteUser(user);
  }

  handleClick(e) {

      // Finding user to delete in allPlayers array in this.state.allPlayers
      let user_to_delete = null
      this.state.allPlayers.map((item) => {
        if (item.id === e.target.id) {
          user_to_delete = item.user
        }
      })
      
      // reseting allPlayers array
      this.setState({allPlayers: this.state.allPlayers.filter(function(person) { 
          return person.id !== e.target.id
      })});

      this.deleteUser(user_to_delete)

  }

  handleCardClick(e) {
      
      // Finding user to delete in topThree array in this.state.topThree
      let user_to_delete = null
      this.state.topThree.map((item) => {
        if (item.id === e.target.id) {
          user_to_delete = item.user
        }
      })
      
      // reseting topThree array
      this.setState({topThree: this.state.topThree.filter(function(person) { 
          return person.id !== e.target.id
      })});

      this.deleteUser(user_to_delete)

  }

  render() {
    return (
        <div>
        <Dashboard
          user = {this.state.user}
        />
        <h1 className='Header'> Users </h1>
        <Card.Group className='card_group' itemsPerRow={3} centered>
          {this.state.topThree.map(item => 
            <Card className='topThree' fluid raised key={item.name} >
            <Image src={item.image} wrapped ui={false} className='topThreeImage' />
            <Card.Content>
              <Card.Header id='subtitles'>{item.name}</Card.Header>
            </Card.Content>
            <Card.Content extra>
            <Rating defaultRating={item.rating} maxRating={5} disabled  icon='star' id='rating'/> 
            </Card.Content>
            <Card.Content extra> 
                  <Button id='buttons' basic as={Link} to={{pathname:'/UserProfile', state:{user:this.state.user, userToView: item.user}}}>Learn More</Button>
                  {this.state.isAdmin ? 
                      <Button circular className='remove' id={item.id} onClick={(e) => this.handleCardClick(e)}>x</Button> 
                    : null
                  } 
            </Card.Content>
            </Card>
          )}
        </Card.Group>
        <List selection divided id='list'>

            {this.state.allPlayers.map(item =>
              <List.Item key={item.name}>
                {this.state.isAdmin ? 
                    <List.Content>
                    <Button circular className='remove' id={item.id} onClick={(e) => this.handleClick(e)}>x</Button>
                  </List.Content>
                  : null
                }
              <List.Content as={Link} to={{pathname:'/UserProfile', state:{user:this.state.user, userToView: item.user}}}>
              <Image avatar src={item.image} />
              </List.Content>
              <List.Content as={Link} to={{pathname:'/UserProfile', state:{user:this.state.user, userToView: item.user}}}>{item.name}</List.Content>
              <Rating defaultRating={item.rating} maxRating={5} disabled  icon='star' id='rating' as={Link} to={{pathname:'/UserProfile', state:{user:this.state.user, userToView: item.user}}}/>
              </List.Item>

            )}
        </List>
        </div>
    )
  }
}

export default UserPage;