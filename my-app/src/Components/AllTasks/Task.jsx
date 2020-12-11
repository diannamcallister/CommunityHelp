import React from 'react';
import "semantic-ui-css/semantic.min.css";
import { Image, Button } from 'semantic-ui-react';
import { Redirect } from "react-router-dom";

import './Tasks.css';

class Task extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showTaskDetails: false
        };
        this.openTaskDetails = this.openTaskDetails.bind(this);
    }

    openTaskDetails() {
        const showTaskDetails = !this.state.showTaskDetails;
        this.setState({showTaskDetails: showTaskDetails});
    }


    render() {

        const {
            task,
            seeReported,
            user,
            addReportedJob
        } = this.props;

        return (
            <div>
                {this.state.showTaskDetails ? <Redirect push to={{pathname:'/task', state:{ task:task, user:user, addReportedJob:addReportedJob}}} /> : null}
                    <Button animated className='button-center' onClick={(e) => e.target.className !== "ui button reported-button" ?
                        this.openTaskDetails() : null}>
                        {seeReported ? 
                        <div>
                            <h1 className='reported-text'>REPORTED</h1>
                            <Button className='reported-button' onClick={() => this.props.deleteReported(task)}>X</Button>
                        </div>
                        : null }
                        
                        <Image className='image-stuff' src={task.image} />

                        <div className='center'>
                            <h1>{task.title}</h1>
                            <b className='description'>{task.description}</b>
                        </div>
                    </Button>
            </div>
        )
    }
}

export default Task;