import React from 'react';
import "semantic-ui-css/semantic.min.css";
import { Icon, Button, Grid, Divider, TextArea } from 'semantic-ui-react';
import { Link, Redirect } from "react-router-dom";

import './TaskDescription.css';
import Dashboard from '../Dashboard/Dashboard';
import TaskCardDescription from './TaskCardDescription';
import TaskCardEditDescription from './TaskCardEditDescription';
import '../../basics-stylesheet.css';

class TaskDescription extends React.Component {

    constructor(props) {
        super(props);

        // FUTURE TODO: all of the hardcoded comments (comment# = {}) will be removed when db is created, as they will be fetched from the db instead.
        const comment1 = {
            user: 'Dianna McAllister',
            comment: 'I can help!!'
        };

        const comment2 = {
            user: 'Qasim Ali',
            comment: 'I can help too'
        };
;
        this.state = {
            task: this.props.location.state === undefined ? <Redirect push to={{pathname:'/alltasks'}} />  : this.props.location.state.task,
            comments: [comment1, comment2], // FUTURE TODO: this will be initialized as an empty array, and populated from GET call to backend -> db
            newComment: '',
            isAdmin: this.props.location.state === undefined ? false : this.props.location.state.isAdmin,
            username: this.props.location.state === undefined ? '' : this.props.location.state.username,
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
    }

    componentDidMount() {
        //FUTURE TODO: make a GET call to the backend to get all comments associated to the current task
    }

    addComment() {
        const newComment = {
            user: this.state.username,
            comment: this.state.newComment
        };
        //FUTURE TODO: make a POST call to the backend to add a new comment associated with the current task

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

    changeEditTaskMode() {
        const editMode = !this.state.editMode;
        this.setState({editMode: editMode});
    }

    doneEditingTask(task) {
        // FUTURE TODO: perform a PUT call to update the information of this job in the db
        this.setState({task: task});
        this.changeEditTaskMode();
    }


    render() {

        return (
            <div>
                <Dashboard 
                    isAdmin = {this.state.isAdmin}
                    username = {this.state.username}
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

                <Link to={{pathname:'/alltasks', state:{isAdmin:this.state.isAdmin, username:this.state.username}}}>
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
                            isAdmin = {this.state.isAdmin}
                            username = {this.state.username}
                            doneEditingTask = {this.doneEditingTask}
                        />
                        :
                        <TaskCardDescription 
                            task = {this.state.task}
                            isAdmin = {this.state.isAdmin}
                            username = {this.state.username}
                            changeEditTaskMode = {this.changeEditTaskMode}
                        />
                        }

                    </Grid.Column>

                    <Grid.Column width={8}>
                        <h1 className='comment-title'>COMMENTS</h1>
                        <Divider className='divider' />
                        {/* FUTURE TODOS: 
                                1. this will be updated to use the comments's IDs so if there are users with the same
                                    name and comment, their comment won't get the same key - every comment will have a unique ID instead
                                2. send the commented user's name to the UserProfile page so that the correct user's information can be displayed */}
                        { this.state.comments.map(comment => (
                            <p key={comment.user + comment.comment}> <b className='subtitles'><Link className='link-color' to={{pathname:'/UserProfile', state:{isAdmin:this.state.isAdmin, username:this.state.username}}}>{comment.user}</Link>: </b>{comment.comment}</p>
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