import React from 'react';
import profile_picture from './usr_profile_pic.jpg';
import "semantic-ui-css/semantic.min.css";
import {Button} from 'semantic-ui-react';
import './UserProfile.css'
import './UserEditProfile.css'
import './UserRatingsProfile.css'
import Dashboard from './Components/Dashboard';
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
        <div class="Heading"> USER PROFILE </div>
        <div class="UserHeadings"> NAME: <span class="UserHeadingContent">EMILY SMITH</span> </div>
        <div class="UserHeadings">  LOCATION: <span class="UserHeadingContent">NEW YORK</span></div>
        <div class="UserHeadings">  WHO ARE YOU: <span class="UserHeadingContent">ARTIST </span></div>
        <div id="links">
        <div id="Edit"><Button id="b1" onClick= {() => this.switchProfile(1)}>Edit Profile</Button></div>
        <div id="SeeRatings"><Button id="b2" onClick= {() => this.switchProfile(2)}> See Ratings</Button></div>
        </div>
    </div>  
        )
    }
    showEditProfile(){
        return (
        <div id="UserContent">
                  
       <div id="UserInfo"> 
           <div class="Heading"> USER PROFILE </div>
           <form>
               <div class="UserHeadings"> NAME:
                   <input type='text'class="small_text"></input>
               </div>
               <div class="UserHeadings"> LOCATION:
                   <input type='text'class="small_text"></input>
               </div>
               <div class="UserHeadings"> WHO ARE YOU: 
                   <input class="small_text" type='text'></input>
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
                    <div class="r_Heading">RATINGS</div>
                    
                    <div class="r_UserPost"> "Hey! Emily did a great job painting my house! Great kid!" </div>
                    <div class="r_UserPost"> Jordan rates you &#9733; &#9733; &#9733; &#9733; &#9733; </div>
                    <div class="r_UserPost">  Mary rates you &#9733; &#9733;&#9733; &#9733;&#9734;</div>
                    <div id="r_links">
                    <div id="r_Edit"><Button id="b1" onClick= {() => this.switchProfile(0)} >Back</Button></div>
                    
                    </div>
                </div>
            </div>
    
            
        )


    }
    render() {
        
        let {isProfile} = false

        return (
        <div>
            <Dashboard 
                isAdmin = {typeof(this.props.location.state) != undefined ? this.props.location.state.isAdmin : false}
            />
            <div id="UserContent">
             <div id='ProfilePicture'><img src={profile_picture}></img></div>      
                 
             {this.state.UserPage===0 ? this.showProfile(): console.log("notshow")}
             {this.state.UserPage===1 ? this.showEditProfile(): console.log("notshow")}
             {this.state.UserPage===2 ? this.showRatings(): console.log("notshow")}         
            </div>
        </div>
            
        )
    }

}

export default UserProfile;