import React from 'react';
import './Authentication.css';

// create login and register component, figure out how onclicks will work

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
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
            
        </div>
        
        </div>
        )
    }
}

export default Login;