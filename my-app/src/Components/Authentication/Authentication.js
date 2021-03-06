import React from 'react';
import './Authentication.css';
import { Button, Icon } from 'semantic-ui-react'
import { Redirect, Link } from "react-router-dom";

import { checkUser, registerUser } from '../../actions/checkUserValid.js';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLogin: true,
            email: '',
            password: '',
            location: '',
            name: '',
            profession: '',
            errorMsgLogin: 'One or more fields has an error',
            errorMsgRegister: 'One or more fields has an error',
            validEmail: true,
            validPassword: true,
            validName: true,
            validLocation: true, 
            validProfession: true,
            loginWorked: false,
            registerWorked: false,
            formErrorLogin: false,
            formErrorRegister: false,
            isAdmin: false,
            user: {} 
            
        };
        this.switchPage = this.switchPage.bind(this);
        this.showLogin = this.showLogin.bind(this);
        this.showRegister = this.showRegister.bind(this);
        this.updateUserEntry = this.updateUserEntry.bind(this);
        this.checkLogin = this.checkLogin.bind(this);
        this.checkRegister = this.checkRegister.bind(this);
        this.checkUser = checkUser.bind(this);
        this.registerUser = registerUser.bind(this);
        this.checkCredentials = this.checkCredentials.bind(this);
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
        this.setState({isLogin: curr});
    }

    //hardcoded username and password for either admin login or regular login
    async checkLogin() {
        this.setState({formErrorLogin: false});
        const creds = {
            email: this.state.email,
            password: this.state.password
        }
        try {
            let user = await checkUser(creds);
            if (Object.keys(user).length !== 0) {
                this.setState({user: user});
                this.setState({loginWorked: true});
                this.setState({formErrorLogin: false});
            } else {
                this.setState({errorMsgLogin: 'Email or Password is incorrect'});
                this.setState({formErrorLogin: true});
            }
        } catch(error) {
            this.setState({errorMsgLogin: 'There is a problem with our server. Please try again'});
            this.setState({formErrorLogin: true});
        }
    }

    //check to see if user can register with their entered credentials
    async checkCredentials() {
        this.setState({formErrorRegister: false});
        const simpleEmailRegex = /^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/i;
        if (!simpleEmailRegex.test(this.state.email)) {
            this.setState({validEmail: false});
        } else {
            this.setState({validEmail: true});
        }
        if (this.state.password.length < 6) {
            this.setState({validPassword: false});
        } else {
            this.setState({validPassword: true});
        }
        if (this.state.location.length < 1) {
            this.setState({validLocation: false});
        } else {
            this.setState({validLocation: true});
        }
        if (this.state.name.length < 1) {
            this.setState({validName: false});
        } else {
            this.setState({validName: true});
        }
        if (this.state.profession.length < 1) {
            this.setState({validProfession: false});
        } else {
            this.setState({validProfession: true});
        }
    }

    // register user if their credentials are valid, show error if not valid or backend call fails
    async checkRegister() {
        await this.checkCredentials();
        if (this.state.validEmail && this.state.validName && this.state.validPassword && this.state.validLocation && this.state.validProfession) {
            try {
                let newUser = {
                    email: this.state.email,
                    password: this.state.password,
                    name: this.state.name,
                    location: this.state.location,
                    profession: this.state.profession,
                    isAdmin: this.state.isAdmin,
                }
                const user = await registerUser(newUser);
                if (Object.keys(user).length !== 0) {
                    this.setState({user: user});
                    this.setState({registerWorked: true});
                    this.setState({formErrorLogin: false});
                } else {
                    this.setState({errorMsgRegister: 'One or more fields has an error'});
                    this.setState({formErrorRegister: true});
                }  
            } catch(error) {
                this.setState({formErrorRegister: true});
                this.setState({errorMsgRegister: 'Something is wrong with our server. Please try again'});
            }
        } else {
            this.setState({formErrorRegister: true});
            this.setState({errorMsgRegister: 'One or more fields has an error'});
        }
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
                {this.state.formErrorLogin ? <div className='formError'>{this.state.errorMsgLogin}</div> : null}
                <span><strong className="FormLabel">EMAIL: </strong><input className="emailWidth" name='email' onChange={this.updateUserEntry} /></span><br></br>
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
                {this.state.formErrorRegister ? <div className='formError'>{this.state.errorMsgRegister}</div> : null}
                <strong className="FormLabel">NAME: </strong>
                <input className="nameInput" focus name ='name' onChange={this.updateUserEntry}/>
                <strong className="FormLabel">EMAIL: </strong>
                <input className="emailInput" focus name ='email' onChange={this.updateUserEntry}/>
                <strong className="FormLabel">PASSWORD: </strong>
                <input className="passwordInput" focus type= 'password' name ='password' onChange={this.updateUserEntry}/>
                <strong className="FormLabel">LOCATION: </strong>
                <input className="locationInput" focus name ='location' onChange={this.updateUserEntry}/>
                <strong className="FormLabel">PROFESSION: </strong>
                <input className="professionInput" focus name ='profession' onChange={this.updateUserEntry}/>
                <Button className="Submit2" animated onClick={this.checkRegister}>
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
                {this.state.loginWorked ? <Redirect push to={{pathname:'/alltasks', state: {user:this.state.user}}} /> : null}
                {this.state.registerWorked ? <Redirect push to={{pathname:'/alltasks', state: {user:this.state.user}}} /> : null}
                <div className="block1"/><div className="block2"/>
                <div className="header">
                    <div className='logoContainer'>
                        <h1 className="CHTitle">COMMUNITY<span className='diff'>HELP</span></h1>
                    </div>
                </div>
                <div className="AboutUs">
                    <h1 className="AboutUsTitle">ABOUT US:
                        <div className="rectangle"/>
                        <p className="AboutUsP">
                        This is a site for the community! If you have a task you need extra assistance with
                        put up a job post! If you are looking to help people out in your neighbourhood, 
                        take a look at the posted jobs.
                        </p>
                    </h1>
                </div>
                {this.state.isLogin ? this.showLogin() : this.showRegister()}
            </div>
        )
    }
}

export default Login;