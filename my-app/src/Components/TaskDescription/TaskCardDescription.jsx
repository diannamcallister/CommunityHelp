import React from 'react';
import "semantic-ui-css/semantic.min.css";
import { Button, Image, Card } from 'semantic-ui-react';
import { Link, Redirect } from "react-router-dom";

import './TaskDescription.css';
import { reportTask, deleteTask } from '../../actions/tasks.js'

class TaskCardDescription extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            noSession: this.props.task.owner === undefined ? true : false,
            task: this.props.task,
            user: this.props.user,
            isDeleted: false,
            isReported: this.props.task.isReported
        };
        this.addReportedJob = this.addReportedJob.bind(this);
        this.deleteJob = this.deleteJob.bind(this);
        this.reportTask = reportTask.bind(this);
        this.deleteTask = deleteTask.bind(this);
    }

    async addReportedJob(job) {
        // a PATCH call to update this job as reported
        const isReported = !this.state.isReported;
        await this.reportTask(job, isReported);
        this.setState({isReported: isReported});
    }

    async deleteJob(job) {
        // a DELETE call to delete this job from the database
        await this.deleteTask(job);
        const isDeleted = !this.state.isDeleted;
        this.setState({isDeleted: isDeleted});
    }


    render() {

        return (
            <div>
                { this.state.noSession ? <Redirect to={{pathname:'/'}} /> :
                <Card className='task-card'>
                    {this.state.isDeleted ? 
                    <Redirect push to={{pathname:'/alltasks', state:{user:this.state.user, deletedTask:this.state.task}}} /> 
                    : null}
                    <Image className='task-image' src={this.state.task.image} />
                    <h2 className='text-center description'>{this.state.task.description}</h2>

                    <p className='text-center'><b className='subtitles'>Hours: </b>{this.state.task.numHours}</p>
                    <p className='text-center'><b className='subtitles'>Num Volunteers Needed: </b>{this.state.task.numVolunteers}</p>
                    <p className='text-center'><b className='subtitles'>Price: </b>{this.state.task.price}</p>
                    <p className='text-center'><b className='subtitles'>Posted By: <Link className='link-color description' to={{pathname:'/UserProfile', state:{user:this.state.user, userToView: this.state.task.owner}}}>{this.state.task.owner.name}</Link></b></p>

                    <div>
                    {this.state.isReported ?
                    <Button className='clicked-report-task' onClick={() => this.addReportedJob(this.state.task)}>Reported</Button>
                    :
                    <Button className='report-task' onClick={() => this.addReportedJob(this.state.task)}>Report</Button>
                    }
                    { this.state.task.owner._id === this.state.user._id ?
                    <Button className='edit-task' onClick={() => this.props.changeEditTaskMode()}>Edit Task</Button>
                    : null}
                    { this.state.task.owner._id === this.state.user._id ?
                    <Button className='delete-task' onClick={() => this.deleteJob(this.state.task)}>Delete Job</Button>
                    : null}
                    </div>
                </Card>
                }
            </div>
        )
    }
}

export default TaskCardDescription;