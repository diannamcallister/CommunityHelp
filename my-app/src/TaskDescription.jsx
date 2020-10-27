import React from 'react';
import "semantic-ui-css/semantic.min.css";
import { Icon, Button, Grid, Image, Card, Divider, TextArea } from 'semantic-ui-react';
import { Link } from "react-router-dom";

import './TaskDescription.css'

class TaskDescription extends React.Component {

    constructor(props) {
        super(props);

        const comment1 = {
            user: 'Dianna McAllister',
            comment: 'I can help!!'
        };

        const comment2 = {
            user: 'Qasim Ali',
            comment: 'I can help too'
        };

        this.state = {
            task: this.props.location.state.task,
            comments: [comment1, comment2],
            newComment: ''
        };

        this.addComment = this.addComment.bind(this);
        this.updateComment = this.updateComment.bind(this);
        this.addReportedJob = this.addReportedJob.bind(this);
    }

    addComment() {
        const newComment = {
            user: 'Current User',
            comment: this.state.newComment
        };

        const allComments = this.state.comments;
        allComments.push(newComment);

        this.setState({comments: allComments});
    }

    updateComment = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({[name]: value})
    }

    addReportedJob(job) {
        // here, we will add the job to the list of reported jobs in the database
    }


    render() {

        return (
            <div>
                <header>
                    <h1 className='header-new'>{this.state.task.title}</h1>
                </header>

                <Link to={'/'}>
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

                        <Card className='card' style={{backgroundColor:'blue'}}>
                            <Image className='task-image' src={this.state.task.image} />
                            <h2 className='text-center description'>{this.state.task.description}</h2>

                            <p className='text-center'><b className='subtitles'>Hours: </b>6</p>
                            <p className='text-center'><b className='subtitles'>Num Volunteers Needed:</b> 2</p>
                            <p className='text-center'><b className='subtitles'>Price: </b>$15/hour</p>

                            <Button className='report-task' onClick={() => this.addReportedJob(this.state.task)}>Report</Button>
                        </Card>


                    </Grid.Column>

                    <Grid.Column width={8}>
                        <h1>COMMENTS</h1>
                        <Divider className='divider' />
                        { this.state.comments.map(comment => (
                            <p key={comment.user + comment.comment}> <b className='subtitles'>{comment.user}: </b>{comment.comment}</p>
                        ))

                        }

                        <div class="ui focus input bottom-right">
                            <TextArea name='newComment' className='input-box' plalceholder='tell us more' onChange={this.updateComment}/>
                            <Button className='comment' onClick={() => this.addComment()}>Comment</Button>
                        </div>
                    </Grid.Column>

                </Grid>

            </div>
        )
    }

}

export default TaskDescription;