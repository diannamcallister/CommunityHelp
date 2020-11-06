import React from 'react';
import "semantic-ui-css/semantic.min.css";
import { Button, Image, Card } from 'semantic-ui-react';
import { Redirect } from "react-router-dom";

import '../Styling/TaskDescription.css'

class TaskCardDescription extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            task: this.props.task,
            isAdmin: this.props.isAdmin,
            username: this.props.username,
            isDeleted: false,
            isReported: false
        };
        this.addReportedJob = this.addReportedJob.bind(this);
        this.deleteJob = this.deleteJob.bind(this);
    }

    addReportedJob(job) {
        // FUTURE TODO: perform a POST call to add this job to the reported jobs table, or a PATCH call to update this job as reported -
        //  whichever is used is dependant on how the database is set up

        // change the color of the button to indicate that it has been clicked
        const isReported = !this.state.isReported;
        this.setState({isReported: isReported});
    }

    deleteJob(job) {
        // FUTURE TODO: perform a DELETE call to delete this job from the database
        const isDeleted = !this.state.isDeleted;
        this.setState({isDeleted: isDeleted});
    }


    render() {

        return (
            <div>
                <Card className='card'>
                    {this.state.isDeleted ? 
                    <Redirect push to={{pathname:'/alltasks', state:{isAdmin:this.state.isAdmin, username:this.state.username, deletedTask:this.state.task}}} /> 
                    : null}
                    <Image className='task-image' src={this.state.task.image} />
                    <h2 className='text-center description'>{this.state.task.description}</h2>

                    <p className='text-center'><b className='subtitles'>Hours: </b>{this.state.task.hours}</p>
                    <p className='text-center'><b className='subtitles'>Num Volunteers Needed: </b>{this.state.task.volunteerNum}</p>
                    <p className='text-center'><b className='subtitles'>Price: </b>{this.state.task.price}</p>
                    <p className='text-center'><b className='subtitles'>Posted By: </b>{this.state.username}</p>

                    <div>
                    {this.state.isReported ?
                    <Button className='clicked-report-task' onClick={() => this.addReportedJob(this.state.task)}>Reported</Button>
                    :
                    <Button className='report-task' onClick={() => this.addReportedJob(this.state.task)}>Report</Button>
                    }
                    {/* FUTURE TODO: this will be updated to compare the user's IDs so that users with the same name
                            won't be confused as being the same user - every user will have a unique ID instead */}
                    { this.state.task.username === this.state.username ?
                    <Button className='edit-task' onClick={() => this.props.changeEditTaskMode()}>Edit Task</Button>
                    : null}
                    { this.state.task.username === this.state.username ?
                    <Button className='delete-task' onClick={() => this.deleteJob(this.state.task)}>Delete Job</Button>
                    : null}
                    </div>
                </Card>
            </div>
        )
    }
}

export default TaskCardDescription;