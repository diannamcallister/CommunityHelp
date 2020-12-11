import React from 'react';
import profile_picture from '../../Images/usr_profile_pic.jpg';
import "semantic-ui-css/semantic.min.css";
import {Button, Form, Rating} from 'semantic-ui-react';
import './UserProfile.css'
import './UserEditProfile.css'
import './UserRatingsProfile.css'
import { Redirect, Link } from "react-router-dom";
import { getUserProfile, EditUser, Addreview, patchImage} from '../../actions/UserProfile.js';

import Dashboard from '../Dashboard/Dashboard.js';

class UserProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {UserPage: 0,
            user: this.props.location.state === undefined ? '': this.props.location.state.user,
            userToView : this.props.location.state === undefined ? '': this.props.location.state.userToView,
            noSession: this.props.location.state === undefined ? true : false};
        this.showProfile = this.showProfile.bind(this);
        this.showEditProfile = this.showEditProfile.bind(this);
        this.getUserProfile = getUserProfile.bind(this);
        this.EditUser = EditUser.bind(this);
        this.editProfile = this.editProfile.bind(this);
        this.postreview = this.postreview.bind(this)
        this.Addreview = Addreview.bind(this)
        this.getAllReviews =this.getAllReviews.bind(this)
        this.patchImage = patchImage.bind(this)
        // this.editProfile = this.editProfile.bind(this)
        // this.switchProfile = this.switchProfile.bind(this)
    }
    
    switchProfile(val){
        this.setState({UserPage: val});
    
    }

    async componentDidMount() {
        // FUTURE TODOS:
            // 1. fetch all tasks from db, save them in this.state.jobs so that they are displayed 
            // 2. fetch all REPORTED tasks from db, save them in this.state.reportedJobs so that they are displayed (if the user is an admin)
        // let user = await this.getUserProfile("a123@gmail.com"); //TODO: don't hardcode TO
        console.log(this.state.user)
        console.log(this.state.userToView)
        let user = await this.getUserProfile(this.state.userToView.email); //TODO: don't hardcode TO
        user = user[0]
        this.setState({email:user.email})
        this.setState({name:user.name})
        this.setState({location: user.location})
        this.setState({profession:user.profession})
        this.setState({image: user.image});
        console.log(this.state.userToView)
        
    }
    async getAllReviews() {
        
        let user = await this.getUserProfile(this.state.userToView.email); //TODO: don't hardcode TO
        user = user[0]
        if (user.reviews.length >= 1){
            let comment1 = user.reviews[user.reviews.length -1]
            comment1 = comment1.comment
            let reviewer1 = user.reviews[user.reviews.length -1]
            reviewer1 = reviewer1.reviewer

            let rating1 = user.reviews[user.reviews.length -1]
            rating1 = rating1.rating
            this.setState({comment1: comment1})
            this.setState({reviewer1: reviewer1})
            this.setState({rating1: rating1})
            
        
        }
        if (user.reviews.length >= 2){
            let comment2 = user.reviews[user.reviews.length -2]
            comment2 = comment2.comment
            let reviewer2 = user.reviews[user.reviews.length -2]
            reviewer2 = reviewer2.reviewer

            let rating2 = user.reviews[user.reviews.length -2]
            rating2 = rating2.rating

            this.setState({comment2: comment2})
            this.setState({reviewer2: reviewer2})
            this.setState({rating2: rating2})
            
        }
        if (user.reviews.length >= 3){
            let comment3 = user.reviews[user.reviews.length -3]
            comment3 = comment3.comment
            let reviewer3 = user.reviews[user.reviews.length -3]
            reviewer3 = reviewer3.reviewer
            let rating3 = user.reviews[user.reviews.length -3]
            rating3 = rating3.rating

            this.setState({comment3: comment3})
            this.setState({reviewer3: reviewer3})
            this.setState({rating3: rating3})
            
        }
    this.switchProfile(2)
    }

    updateField = event => {
        // display user input to the screen in the correct text box
        const target = event.target;
        const value = target.value;
        const name = target.name;
        if (name === 'name') {
            this.setState({name: value});

        }
        if (name === 'location') {
            this.setState({location: value});
        }
        if (name === 'profession') {
            this.setState({profession: value});
        }
        
    }

    updateField_review = event => {
        // display user input to the screen in the correct text box
        const target = event.target;
        const value = target.value;
        const name = target.name;
 
        if (name == 'comment') {
            this.setState({new_comment: value});
        }
        
    }
    updateField_rating = (event,{rating}) =>{
        this.setState({new_rating:rating})

    }

    update_Image = (event) => {
        const target = event.target;
        this.setState({new_image: target.files[0]});

    }

    async editProfile() {
        
        const new_user = {email: this.state.email, name: this.state.name, location: this.state.location, profession: this.state.profession}
        const res = await this.EditUser(new_user);
        if (this.state.new_image != null){
    
            const res2 = await patchImage(this.state.user._id, this.state.new_image)
        }
        this.setState({new_image:null})
        let user = await this.getUserProfile(this.state.user.email);
        user =user[0]
        this.setState({image: user.image});
        this.switchProfile(0)

    }

    async postreview(){
        //fix reviewee
        
        const review = {"reviewer": this.state.user.name, "rating": this.state.new_rating, "comment": this.state.new_comment, "time":"12:30"}

        const res = await Addreview(this.state.userToView._id, review)
        this.setState({new_comment: ''})
        this.setState({new_rating: null})
        const res_update = await this.getAllReviews()
        
    }



    editPermission(){
        console.log(this.state.user._id)
        console.log(this.state.userToView._id)
        if (this.state.user._id === this.state.userToView._id){
            return (<div id="Edit_b"><Button id="b2" onClick= {() => this.switchProfile(1)}>Edit Profile</Button></div>)
        }
        return;
    }

    showProfile(){
        return(
        <div>
        <div id='ProfilePicture'><img src={this.state.image} alt='DP'></img></div>
        <div id="UserInfo"> 
        <div className="Heading"> USER PROFILE </div>
        <div className="UserHeadings"> NAME: <span className="UserHeadingContent"> {this.state.name} </span> </div>
        <div className="UserHeadings">  LOCATION: <span className="UserHeadingContent"> {this.state.location} </span></div>
        <div className="UserHeadings">  WHO ARE YOU: <span className="UserHeadingContent">{this.state.profession}</span></div>
        <div id="links">
        {this.editPermission()}
        <div id="SeeRatings"><Button id="b3" onClick= {this.getAllReviews}> See Ratings</Button></div>
            
            
        </div>
    </div> 
    </div> 
        )
    }

    showEditProfile(){
        return (
        <div>
        <div id='ProfilePicture'><img src={this.state.image} alt='DP'></img> 
        <Form.Input
                        id="image_input"
                        name="image"
                        placholder='Image'
                        type="file"
                        onChange={this.update_Image}
                         >
        </Form.Input></div>

                   
        <div id="UserContent">
                  
       <div id="UserInfo"> 
           <div className="Heading"> USER PROFILE </div>
           <form>
               <div className="UserHeadings_name"> NAME:
                   <input name='name' type='text'className="small_text" onChange={this.updateField}></input>
               </div>
               <div className="UserHeadings_location"> LOCATION:
                   <input type='text' name='location' className="small_text" onChange={this.updateField}></input>
               </div>
               <div className="UserHeadings_who"> WHO ARE YOU: 
                   <input className="small_text" name='profession'type='text' onChange={this.updateField}></input>
               </div>
           </form>
           <div id="links">
           
           <div id="Save"><Button id="b1" onClick= {this.editProfile}>Save Changes</Button></div>
           
           </div>
       </div>
   </div>
   </div>
        )
    }
    getStars(number){
        if (number ===1){
            return  (<span>&#11088;</span>)
        }
        if (number ===2){
            return  (<span>&#11088;&#11088;</span>)
        }
        if (number ===3){
            return  (<span>&#11088;&#11088;&#11088;</span>)
        }
        if (number===4){
            return  (<span>&#11088;&#11088;&#11088;&#11088;</span>)
        }
        if (number===5){
            return  (<span>&#11088;&#11088;&#11088;&#11088;&#11088;</span>)
        }
        
    }
    showRatings(){
        return (
            <div>
            <div id='ProfilePicture'><img src={this.state.image} alt='DP'></img></div> 
            <div id="r_UserContent">
                 
                <div id="r_UserInfo"> 
                    <div className="r_Heading">RATINGS</div>
                    <div id="star_input"><Rating maxRating={5} icon='star' id='rating' name="rating" onRate={this.updateField_rating} size='massive'/></div>
                    <div><textarea name="comment" cols="40" rows="5" className="r_small_text" placeholder="Write a comment" onChange={this.updateField_review} value={this.state.new_comment}></textarea></div>
                    <div id="Post"><Button id="r_b2" onClick= {this.postreview} >Post</Button></div>
                    <div className="r_UserPost"> {this.state.reviewer1}: {this.state.comment1} {this.getStars(this.state.rating1)} </div>
                    <div className="r_UserPost"> {this.state.reviewer2}: {this.state.comment2} {this.getStars(this.state.rating2)} </div>
                    <div className="r_UserPost">{this.state.reviewer3}: {this.state.comment3} {this.getStars(this.state.rating3)}</div>
                    <div id="r_links">
                    <div id="r_Edit"><Button id="b2" onClick= {()=>this.switchProfile(0)} >Back</Button></div>
                    
                    </div>
                </div>
            </div>
            </div>
            
    
            
        )


    }
    render() {
        
        

        return (
        <div>
            { this.state.noSession ? <Redirect to={{pathname:'/'}} /> : null}
            <Dashboard 
                isAdmin = {this.props.location.state === undefined ? false : this.props.location.state.isAdmin}
                username = {this.props.location.state === undefined ? '' : this.props.location.state.username}
                user = {this.state.user}
            />
            <div id="UserContent">
                  
                 
             {this.state.UserPage===0 ? this.showProfile(): null}
             {this.state.UserPage===1 ? this.showEditProfile(): null}
             {this.state.UserPage===2 ? this.showRatings(): null}         
            </div>
        </div>
            
        )
    }

}

export default UserProfile;