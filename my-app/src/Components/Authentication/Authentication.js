import React from 'react';
import './Authentication.css';
import { Button, Input, Icon } from 'semantic-ui-react'
import { Redirect, Link } from "react-router-dom";

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLogin: true,
            username: '',
            password: '',
            location: '',
            name: '',
            errorMsg: 'One or more fields has an error.',
            validUsername: false,
            validPasswork: false,
            validName: false,
            validLocation: false,
            loginWorked: false,
            registerWorked: false,
            formError: false,
            isAdmin: false,
            
        };
        this.switchPage = this.switchPage.bind(this);
        this.showLogin = this.showLogin.bind(this);
        this.showRegister = this.showRegister.bind(this);
        this.updateUserEntry = this.updateUserEntry.bind(this);
        this.checkLogin = this.checkLogin.bind(this);
    }

    //sets isLogin value to true of Login form should show and false if Register form should be shown.
    switchPage(isLogin) {
        if (!isLogin) {
            const login = document.querySelector('#RegisterButton');
            login.style.color = 'salmon';
            const reg = document.querySelector('#LoginButton');
            reg.style.color = '#32BD32';
        } else {
            const reg = document.querySelector('#LoginButton');
            reg.style.color = 'salmon';
            const login = document.querySelector('#RegisterButton');
            login.style.color = '#32BD32';
        }
        const curr = isLogin;
        // const name = bar.className;
        this.setState({isLogin: curr});
    }

    //hardcoded username and password for either admin login or regular login
    checkLogin() {
        // if (this.state.username === 'user' && this.state.password === 'user') {
        //     this.setState({loginWorked: true});
        // } else if (this.state.username === "admin" && this.state.password === "admin") {
        //     this.setState({isAdmin: true, loginWorked: true});
        // }

        //get user with email, if error -> FormError: true, errorMsg: email or password is invalid, loginWorked: false
        // no error -> loginWorked: true, formError: false
    }

    checkRegister() {
        //call to create register here, might need to get a 'get' from db to check if email is already in use
        // check if all fields are valid to register and email doesnt exist
        // if email exists 
    }

    updateUserEntry = e => {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({[name]: value})
    }

    //returns login form
    showLogin() {
        return (
            <div className="Login-Box">
                <Button id="LoginButton" onClick= {() => this.switchPage(true)} primary>LOG IN</Button>
                <Button id= "RegisterButton" onClick= {() => this.switchPage(false)} secondary>REGISTER</Button>
                <span><strong className="FormLabel">EMAIL: </strong><input className="emailWidth" name='username' onChange={this.updateUserEntry} /></span><br></br>
                <span><strong className="FormLabel">PASSWORD: </strong><input className="passwordWidth" type='password' name='password' focus onChange={this.updateUserEntry} /></span>
                <Button className="Submit1" animated onClick={this.checkLogin}>
                    <Button.Content visible>LOGIN</Button.Content>
                    <Button.Content hidden>
                     <Icon name='arrow right' />
                    </Button.Content>
                </Button>
            </div>
        )
    }

    //returns register form (when isLogin is false)
    showRegister() {
        return (
            <div className="Register-Box">
                <Button id="LoginButton" onClick= {() => this.switchPage(true)} primary>LOG IN</Button>
                <Button id= "RegisterButton" onClick= {() => this.switchPage(false)} secondary>REGISTER</Button>
                <strong className="FormLabel">NAME: </strong>
                <input className="nameInput" focus/>
                <strong className="FormLabel">EMAIL: </strong>
                <input className="emailInput" focus/>
                <strong className="FormLabel">PASSWORD: </strong>
                <input className="passwordInput" focus/>
                <strong className="FormLabel">LOCATION: </strong>
                <input className="locationInput" focus/>
                <strong className="FormLabel">PROFESSION: </strong>
                <input className="professionInput" focus/>
                <Button className="Submit2" animated >
                    <Button.Content visible>REGISTER</Button.Content>
                    <Button.Content hidden>
                     <Icon name='arrow right' />
                    </Button.Content>
                </Button>
            </div>
        )

    }

    componentDidMount() {
        this.switchPage(true);
    }

    render() {
        return (
            <div>
                {this.state.loginWorked || this.state.registerWorked ? <Redirect push to={{pathname:'/alltasks', state:{isAdmin:this.state.isAdmin, username:this.state.username}}} /> : null}
                <div className="block1"/><div className="block2"/>
                <div className="header">
                    <div className='logoContainer'>
                        <h1 className="CHTitle">COMMUNITY<span className='diff'>HELP</span></h1>
                    </div>
                </div>
                <div className="AboutUs">
                    <h1 className="AboutUsTitle">ABOUT US:
                        {/* <br/> */}
                        {/* <h1 className="AboutUsTitle">ABOUT US:</h1> */}
                        <div className="rectangle"/>
                        <p className="AboutUsP">
                        This is a site for the community! If you have a task you need extra assistance with
                        put up a job post! If you are looking to help people out in your neighbourhood, 
                        take a look at the posted jobs.
                        </p>
                    </h1>
                </div>
                {this.state.isLogin ? this.showLogin() : this.showRegister()}
                {/* <div className="Login-Box">
                    <Button id="LoginButton" onClick= {() => this.switchPage(true)} primary>LOG IN</Button>
                    <Button id= "RegisterButton" onClick= {() => this.switchPage(false)} secondary>REGISTER</Button>
                    {this.state.isLogin ? this.showLogin() : this.showRegister()}
                </div> */}
        
            </div>
        )
    }
}

export default Login;