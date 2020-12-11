import React from 'react';
import "semantic-ui-css/semantic.min.css";
import { Icon, Button, Grid, Divider, TextArea } from 'semantic-ui-react';
import { Link, Redirect } from "react-router-dom";

import './TaskDescription.css';
import Dashboard from '../Dashboard/Dashboard';
import TaskCardDescription from './TaskCardDescription';
import TaskCardEditDescription from './TaskCardEditDescription';
import '../../basics-stylesheet.css';
import { addCommentDB, updateTask } from '../../actions/tasks.js';

class TaskDescription extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            noSession: this.props.location.state === undefined ? true : false,
            task: this.props.location.state === undefined ? {}  : this.props.location.state.task,
            comments: this.props.location.state === undefined ? [] : this.props.location.state.task.comments,
            newComment: '',
            user: this.props.location.state === undefined ? {} : this.props.location.state.user,
            isDeleted: false,
            isReported: false,
            editMode: false
        };
        this.addComment = this.addComment.bind(this);
        this.updateComment = this.updateComment.bind(this);
        this.addReportedJob = this.addReportedJob.bind(this);
        this.deleteJob = this.deleteJob.bind(this);
        this.changeEditTaskMode = this.changeEditTaskMode.bind(this);
        this.doneEditingTask = this.doneEditingTask.bind(this);
        this.addCommentDB = addCommentDB.bind(this);
        this.updateTask = updateTask.bind(this);
    }

    async addComment() {
        const newComment = {
            commenter: this.state.user,
            comment: this.state.newComment
        };
        
        await this.addCommentDB(this.state.task, newComment);

        const allComments = this.state.comments;
        allComments.push(newComment);
        this.setState({comments: allComments});
    }

    updateComment = event => {
        // udpate the text in the comment box
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({[name]: value})
    }

    addReportedJob(job) {
        // change the color of the button to indicate that it has been clicked
        const isReported = !this.state.isReported;
        this.setState({isReported: isReported});
    }

    deleteJob(job) {
        const isDeleted = !this.state.isDeleted;
        this.setState({isDeleted: isDeleted});
    }

    changeEditTaskMode() {
        const editMode = !this.state.editMode;
        this.setState({editMode: editMode});
    }

    async doneEditingTask(task) {
        // a PUT call to update the information of this job in the db
        const newTask = await this.updateTask(task);
        newTask.owner = task.owner;
        this.setState({task: newTask});
        this.changeEditTaskMode();
    }


    render() {

        return (
            <div>
                { this.state.noSession ? <Redirect to={{pathname:'/'}} /> : null }
                <Dashboard 
                    user = {this.state.user}
                />
                {this.state.editMode ? 
                    <header>
                        <h1 className='Header'>Editing Task</h1>
                    </header>
                    :
                    <header>
                        <h1 className='Header'>{this.state.task.title}</h1>
                    </header>
                }

                <Link to={{pathname:'/alltasks', state:{user:this.state.user}}}>
                    <Button animated className='all-jobs'>
                        <Button.Content visible>
                            All Jobs
                        </Button.Content>
                        <Button.Content hidden>
                            <Icon name='arrow left' />
                        </Button.Content>
                    </Button>
                </Link>

                <Grid columns='two'>
                    <Grid.Column width={7}>

                        {this.state.editMode ?                         
                        <TaskCardEditDescription 
                            task = {this.state.task}
                            user = {this.state.user}
                            doneEditingTask = {this.doneEditingTask}
                        />
                        :
                        <TaskCardDescription 
                            task = {this.state.task}
                            user = {this.state.user}
                            changeEditTaskMode = {this.changeEditTaskMode}
                        />
                        }

                    </Grid.Column>

                    <Grid.Column width={8}>
                        <h1 className='comment-title'>COMMENTS</h1>
                        <Divider className='divider' />
                        { this.state.comments.map(comment => (
                            <p key={comment._id}> <b className='subtitles'><Link className='link-color' to={{pathname:'/UserProfile', state:{user: this.state.user, userToView:comment.commenter}}}>{comment.commenter.name}</Link>: </b>{comment.comment}</p>
                        ))
                        }
                        <div className='extra-middle-spacing'></div>
                        <div className="ui focus input bottom-right">
                            <TextArea name='newComment' className='input-box' placeholder='Comment' onChange={this.updateComment}/>
                            <Button className='comment' onClick={() => this.addComment()}>Comment</Button>
                        </div>
                    </Grid.Column>

                </Grid>

            </div>
        )
    }

}

export default TaskDescription;