import React from 'react';
import './Authentication.css';
import { Button, Input, Icon } from 'semantic-ui-react'
import { Redirect } from "react-router-dom";

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLogin: true,
            username: '',
            password: '',
            loginWorked: false,
            isAdmin: false,
            barClass: 'selector'
        };
        this.switchPage = this.switchPage.bind(this);
        this.showLogin = this.showLogin.bind(this);
        this.showRegister = this.showRegister.bind(this);
        this.updateUserEntry = this.updateUserEntry.bind(this);
        this.checkLogin = this.checkLogin.bind(this);
    }

    //sets isLogin value to true of Login form should show and false if Register form should be shown.
    switchPage(isLogin) {
        // let bar = document.getElementsByClassName(this.state.barClass);
        // finish for phase2*
        //if (!isLogin) {
        //     bar.className = 'selector-reg';
        // } else {
        //     bar.className = 'selector';
        // }
        const curr = isLogin;
        // const name = bar.className;
        this.setState({isLogin: curr});
    }

    //hardcoded username and password for either admin login or regular login
    checkLogin() {
        if (this.state.username === 'user' && this.state.password === 'user') {
            this.setState({loginWorked: true});
        } else if (this.state.username === "admin" && this.state.password === "admin") {
            this.setState({isAdmin: true, loginWorked: true});
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
            <div className="page">
                <strong className="Login-Label">EMAIL: </strong>
                <Input className="LoginInput" focus placeholder='Email' name='username' onChange={this.updateUserEntry} />
                <strong className="Login-Label">PASSWORD: </strong>
                <Input className="LoginInput" focus placeholder='Password' name='password' onChange={this.updateUserEntry} />
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
            <div className="page">
                <strong className="Login-Label">NAME: </strong>
                <Input className="RegisterInput" focus placeholder='Name' />
                <strong className="Login-Label">EMAIL: </strong>
                <Input className="RegisterInput" focus placeholder='Email' />
                <strong className="Login-Label">PASSWORD: </strong>
                <Input className="RegisterInput" focus placeholder='Password' />
                <strong className="Login-Label">LOCATION: </strong>
                <Input className="RegisterInput" focus placeholder='Location' />
                <Button className="Submit2" animated >
                    <Button.Content visible>REGISTER</Button.Content>
                    <Button.Content hidden>
                     <Icon name='arrow right' />
                    </Button.Content>
                </Button>
            </div>
        )

    }

    render() {
        return (
            <div>
                {this.state.loginWorked ? <Redirect push to={{pathname:'/alltasks', state:{isAdmin:this.state.isAdmin, username:this.state.username}}} /> : null}
                <div className="block1"/>
                <div className="block2"/>
        <div className="AboutUs">
            <h1 className="AboutUsTitle">
                ABOUT US:
                <div className="rectangle"/>
                <p className="AboutUsP">
                    This is a site for the community! If you have a task you need extra assistance with
                    put up a job post! If you are looking to help people out in your neighbourhood, 
                    take a look at the posted jobs.
                </p>
            </h1>
        </div>
        <div className="Login-Box">
            <Button id="LoginButton" onClick= {() => this.switchPage(true)} primary>LOG IN</Button>
            <Button id= "RegisterButton" onClick= {() => this.switchPage(false)} secondary>REGISTER</Button>
            {/* finish for phase 2 <div className="selector"/> */}
            {this.state.isLogin ? this.showLogin() : this.showRegister()}
        </div>
        
        </div>
        )
    }
}

export default Login;