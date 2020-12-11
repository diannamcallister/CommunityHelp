import React from 'react';
import "semantic-ui-css/semantic.min.css";
import { Grid, Button } from 'semantic-ui-react';
import { Redirect, Link } from "react-router-dom";
import Modal from 'react-modal';
import Dashboard from '../Dashboard/Dashboard';

import { getAllTasks, deleteTask } from '../../actions/tasks.js';

import './Tasks.css';
import Task from './Task.jsx';
import CreateTask from '../CreateTask/CreateTask.jsx';

class Tasks extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            noSession: this.props.location.state === undefined ? true : false,
            modal_is_open: false,
            showReportedOnly: false,
            showPersonalJobs: false,
            user: this.props.location.state === undefined ? {} : this.props.location.state.user,
            reportedButtonText: 'See Reported',
            personalJobsButtonText: 'See Your Postings',
            jobs: [], // FUTURE TODO: this will be initialized as an empty array, and populated from GET call to backend -> db
            reportedJobs: [], // FUTURE TODO: this will be initiaalized as an empty array, and populated from GET call to backend -> db
            personalJobs: []
        };
        this.changeModalPosition = this.changeModalPosition.bind(this);
        this.addJob = this.addJob.bind(this);
        this.showReportedJobs = this.showReportedJobs.bind(this);
        this.deleteJob = this.deleteJob.bind(this);
        this.getAllTasks = getAllTasks.bind(this);
        this.deleteTask = deleteTask.bind(this);
    }

    async componentDidMount() {
        // FUTURE TODOS:
            // 1. fetch all tasks from db, save them in this.state.jobs so that they are displayed 
            // 2. fetch all REPORTED tasks from db, save them in this.state.reportedJobs so that they are displayed (if the user is an admin)
        let jobs = await this.getAllTasks(this.state.user.location); //TODO: don't hardcode TO
        console.log(jobs);
        this.setState({jobs: jobs});
        let reportedJobs = jobs.filter((job) => job.isReported === true);
        this.setState({reportedJobs: reportedJobs});
        if (this.props.location.state && this.props.location.state.deletedTask) {
            this.deleteJob(this.props.location.state.deletedTask)
        }
    }

    changeModalPosition() {
        // open or close the modal (whichever it currently is not doing)
        let newState = !this.state.modal_is_open;
        this.setState({modal_is_open: newState});
    }

    seePersonalPostedJobs() {
        if (this.state.personalJobs) { // if the user has already looked at their personal jobs, no reason to loop through & filter all jobs again
            // get all jobs for the certain users
            //  this can be done this way, or by performing a call to backend where only tasks from a specific user are returned
            let personalJobs = []
            this.state.jobs.forEach(job => {
                console.log("user")
                console.log(this.state.user);
                console.log("job");
                console.log(job);
                if (job.owner._id === this.state.user._id) {
                    personalJobs.push(job);
                }
            })
            this.setState({personalJobs: personalJobs});

            // update the text of the button
            let newButtonTitle = this.state.personalJobsButtonText;
            if (this.state.personalJobsButtonText === 'See Your Postings') {
                newButtonTitle = 'See All Postings';
            } else if (this.state.personalJobsButtonText === 'See All Postings') {
                newButtonTitle = 'See Your Postings';
            }
            this.setState({personalJobsButtonText: newButtonTitle});

            // update which job postings are being displayed 
            let showPersonalJobs = !this.state.showPersonalJobs;
            this.setState({showPersonalJobs: showPersonalJobs});
        }
    }

    addJob(job) {
        // FUTURE TODO: add a POST call to the backend to add the new job to the db
        const curJobs = this.state.jobs;
        curJobs.push(job);
        this.setState({jobs: curJobs});

        // hide the modal since the new job has finished being created
        this.changeModalPosition();
    }

    showReportedJobs() {
        // change the label on the button
        let newButtonTitle = this.state.reportedButtonText;
        if (this.state.reportedButtonText === 'See Reported') {
            newButtonTitle = 'See All Jobs';
        } else if (this.state.reportedButtonText === 'See All Jobs') {
            newButtonTitle = 'See Reported';
        }
        this.setState({reportedButtonText: newButtonTitle});

        // only show the reported jobs
        const isReported = !this.state.showReportedOnly;
        this.setState({showReportedOnly: isReported});
    }

    async deleteJob(job) {
        //FUTURE TODOS:
            // 1. add a DELETE call to the backend to delete the job from the db
            // 2. compare jobs by IDs instead of titles, since each job will have a unique ID and this will avoid the issue of tasks with
            //      identical titles being removed
        await deleteTask(job);
        const nonDeletedJobs = this.state.jobs.filter(cur_job => cur_job.title !== job.title);
        this.setState({jobs: nonDeletedJobs});

        //FUTURE TODOS:
            // 1. add a DELETE call to the backend to delete the job from all the reported jobs in the db
            // 2. compare jobs by IDs instead of titles, since each job will have a unique ID and this will avoid the issue of tasks with
            //      identical titles being removed
        // check to see if the job is in the reported jobs, and if it is, delete it from that list as well
        const nonDeletedReportedJobs = this.state.reportedJobs.filter(cur_job => cur_job.title !== job.title);
        if (nonDeletedReportedJobs !== this.state.reportedJobs) {
            this.setState({reportedJobs: nonDeletedReportedJobs});
        }
    }

    buildGrid = (jobs) => {
        if (jobs) {

            // build the grid array
            let gridArray = [];
            let gridRow = [];
            for (let i=0; i<jobs.length; i++) {
                if (i % 4 === 0 && i !== 0) {
                    gridArray.push(gridRow);
                    gridRow = [];
                }
                gridRow.push(jobs[i]);

            }
            //append the last row to the gridArray
            gridArray.push(gridRow);

            // create the DOM elements
            return gridArray.map((row, idx) => {
                return (
                    <Grid.Row key={idx}>
                        {row.map(task => 
                            <Grid.Column key={task.image}>
                                <Task 
                                    task = {task}
                                    user = {this.state.user}
                                    seeReported = {this.state.showReportedOnly}
                                    deleteReported = {this.deleteJob}
                                />
                            </Grid.Column>)}
                    </Grid.Row>
                )
            });
        }
    }

    render() {
        return (
            <div className='overall-padding'>
                { this.state.noSession ? <Redirect to={{pathname:'/'}} /> : null}
                <Dashboard
                    user = {this.state.user}
                />
                <header>
                    <h1 className='Header'>JOB BOARD</h1>
                </header>

                {this.state.user.isAdmin ? 
                    <Button className='reported' onClick={() => this.showReportedJobs()}>
                            {this.state.reportedButtonText}
                    </Button>
                    : null
                }

                <Button className='new-job' onClick={() => this.changeModalPosition()}>
                        Add New Job
                </Button>

                <Button className='your-jobs' onClick={() => this.seePersonalPostedJobs()}>
                        {this.state.personalJobsButtonText}
                </Button>

                <Grid columns='four'>
                    {this.state.showReportedOnly ? this.buildGrid(this.state.reportedJobs) : this.state.showPersonalJobs ? this.buildGrid(this.state.personalJobs) : this.buildGrid(this.state.jobs)}
                </Grid>

                <Modal isOpen={this.state.modal_is_open} style={{overlay:{zIndex:1000}}} ariaHideApp={false} disableAutoFocus={true}>
                     <CreateTask closeModal={this.changeModalPosition} addJob={this.addJob} user={this.state.user}/>
                </Modal>

            </div>
        )
    }

}

export default Tasks;