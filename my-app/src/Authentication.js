import React from 'react';
import './Authentication.css';
import { Button, Input, Icon } from 'semantic-ui-react'

// create login and register component, figure out how onclicks will work

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {isLogin: true};
        this.switchPage = this.switchPage.bind(this);
        this.showLogin = this.showLogin.bind(this);
        this.showRegister = this.showRegister.bind(this);
    }

    switchPage(isLogin) {
        const curr = isLogin;
        this.setState({isLogin: curr});
    }

    showLogin() {

        return (
            <div className="page">
                <strong className="Login-Label">EMAIL: </strong>
                <Input className="LoginInput" focus placeholder='Email' />
                <strong className="Login-Label">PASSWORD: </strong>
                <Input className="LoginInput" focus placeholder='Password' />
                <Button className="Submit1" animated >
                    <Button.Content visible>LOGIN</Button.Content>
                    <Button.Content hidden>
                     <Icon name='arrow right' />
                    </Button.Content>
                </Button>
            </div>
        )
    }

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
            {/* <div id="selector"/>  finish later*/}
            {this.state.isLogin ? this.showLogin() : this.showRegister()}
        </div>
        
        </div>
        )
    }
}

export default Login;