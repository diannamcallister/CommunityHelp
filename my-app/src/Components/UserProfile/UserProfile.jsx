import React from 'react';
import profile_picture from '../../Images/usr_profile_pic.jpg';
import "semantic-ui-css/semantic.min.css";
import {Button} from 'semantic-ui-react';
import './UserProfile.css'
import './UserEditProfile.css'
import './UserRatingsProfile.css'

import Dashboard from '../Dashboard/Dashboard.js';

class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {UserPage: 0};
        this.showProfile = this.showProfile.bind(this);
        this.showEditProfile = this.showEditProfile.bind(this);
    }
    switchProfile(val){
        this.setState({UserPage: val});
    
    }

    showProfile(){
        return(
        <div id="UserInfo"> 
        <div className="Heading"> USER PROFILE </div>
        <div className="UserHeadings"> NAME: <span class="UserHeadingContent">EMILY SMITH</span> </div>
        <div className="UserHeadings">  LOCATION: <span class="UserHeadingContent">NEW YORK</span></div>
        <div className="UserHeadings">  WHO ARE YOU: <span class="UserHeadingContent">ARTIST </span></div>
        <div id="links">
        <div id="Edit_b"><Button id="b2" onClick= {() => this.switchProfile(1)}>Edit Profile</Button></div>
        <div id="SeeRatings"><Button id="b3" onClick= {() => this.switchProfile(2)}> See Ratings</Button></div>
            
            
        </div>
    </div>  
        )
    }
    showEditProfile(){
        return (
        <div id="UserContent">
                  
       <div id="UserInfo"> 
           <div className="Heading"> USER PROFILE </div>
           <form>
               <div className="UserHeadings_name"> NAME:
                   <input type='text'className="small_text"></input>
               </div>
               <div className="UserHeadings_location"> LOCATION:
                   <input type='text'className="small_text"></input>
               </div>
               <div className="UserHeadings_who"> WHO ARE YOU: 
                   <input className="small_text" type='text'></input>
               </div>
           </form>
           <div id="links">
           
           <div id="Save"><Button id="b1"  onClick= {() => this.switchProfile(0)}>Save Changes</Button></div>
           
           </div>
       </div>
   </div>
        )
    }
    showRatings(){
        return (
            <div id="r_UserContent">
                 
                <div id="r_UserInfo"> 
                    <div className="r_Heading">RATINGS</div>
                    
                    <div className="r_UserPost"> "Hey! Emily did a great job painting my house! Great kid!" </div>
                    <div className="r_UserPost"> Jordan rates you &#9733; &#9733; &#9733; &#9733; &#9733; </div>
                    <div className="r_UserPost">  Mary rates you &#9733; &#9733;&#9733; &#9733;&#9734;</div>
                    <div id="r_links">
                    <div id="r_Edit"><Button id="b1" onClick= {() => this.switchProfile(0)} >Back</Button></div>
                    
                    </div>
                </div>
            </div>
    
            
        )


    }
    render() {
        
        

        return (
        <div>
            <Dashboard 
                isAdmin = {this.props.location.state === undefined ? false : this.props.location.state.isAdmin}
                username = {this.props.location.state === undefined ? '' : this.props.location.state.username}
            />
            <div id="UserContent">
             <div id='ProfilePicture'><img src={profile_picture} alt='DP'></img></div>      
                 
             {this.state.UserPage===0 ? this.showProfile(): null}
             {this.state.UserPage===1 ? this.showEditProfile(): null}
             {this.state.UserPage===2 ? this.showRatings(): null}         
            </div>
        </div>
            
        )
    }

}

export default UserProfile;