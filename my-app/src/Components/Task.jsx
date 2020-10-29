import React from 'react';
import "semantic-ui-css/semantic.min.css";
import { Image, Button } from 'semantic-ui-react';
import { Redirect } from "react-router-dom";

import '../Styling/Tasks.css';

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
            isAdmin
        } = this.props;

        return (
            <div>
                {this.state.showTaskDetails ? <Redirect push to={{pathname:'/task', state:{task:task, isAdmin:isAdmin}}} /> : null}
                    <Button animated className='button-center' onClick={() => this.openTaskDetails()}>
                        {seeReported ? 
                        <div>
                            <h1 className='reported-text'>REPORTED</h1>
                            <Button className='reported-button' onClick={() => this.props.deleteReported(task)}>X</Button>
                        </div>
                        :
                        <Image className='status' src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Ski_trail_rating_symbol-green_circle.svg/768px-Ski_trail_rating_symbol-green_circle.svg.png' />
                        }
                        
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