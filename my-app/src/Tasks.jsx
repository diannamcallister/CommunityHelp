import React from 'react';
import "semantic-ui-css/semantic.min.css";
import { Grid, Button } from 'semantic-ui-react';
import Modal from 'react-modal';
// import { uid } from "react-uid";

import './Tasks.css';
import Task from './Task.jsx';
import CreateTask from './CreateTask.jsx';

class Tasks extends React.Component {

    constructor(props) {
        super(props);

        let job1 = {
            image: 'https://static.vecteezy.com/system/resources/previews/000/093/698/non_2x/vector-gardening-icon-set.jpg',
            title: 'Plant New Flowers',
            description: 'Come help me plant new flowers!'
        };

        let job2 = {
            image: 'https://www.geico.com/living/wp-content/uploads/flat-tire-post.jpg',
            title: 'Change Tires',
            description: 'I could use help changing my tires.'
        };

        let job3 = {
            image: 'https://stormguardrc.com/wp-content/uploads/2015/04/Factors-to-Consider-When-Painting-Your-House-Featured-Image.png',
            title: 'Help Paint House',
            description: 'Come paint my house with me!'
        };

        let job4 = {
            image: 'https://q3p9g6n2.rocketcdn.me/wp-content/ml-loads/2015/12/email_ss_1920.png',
            title: 'Sending Emails',
            description: 'Please teach me to send emails.'
        };

        this.state = {
            modal_is_open: false,
            showReportedOnly: false,
            reportedButton: 'See Reported',
            jobs: [job1, job2, job3, job4],
            reportedJobs: [job2, job3]
        };

        this.changeModalPosition = this.changeModalPosition.bind(this);
        this.addJob = this.addJob.bind(this);
        this.showReportedJobs = this.showReportedJobs.bind(this);
        this.deleteReported = this.deleteReported.bind(this);
    }

    changeModalPosition() {
        let newState = !this.state.modal_is_open;
        this.setState({modal_is_open: newState});
    }

    addJob(job) {
        const curJobs = this.state.jobs;
        curJobs.push(job);
        this.setState({jobs: curJobs});

        this.changeModalPosition();
    }

    showReportedJobs() {
        // change the label on the button
        let newButtonTitle = '';
        if (this.state.reportedButton === 'See Reported') {
            newButtonTitle = 'See All Jobs';
        } else if (this.state.reportedButton === 'See All Jobs') {
            newButtonTitle = 'See Reported';
        }
        
        this.setState({reportedButton: newButtonTitle});

        // only show the reported jobs
        const isReported = !this.state.showReportedOnly;
        this.setState({showReportedOnly: isReported});
    }

    deleteReported(job) {
        const jobIndex = this.state.jobs.indexOf(job);
        const reportedIndex = this.state.reportedJobs.indexOf(job);

        const jobs = this.state.jobs;
        jobs.splice(jobIndex, 1);
        this.setState({jobs: jobs});

        const reportedJobs = this.state.reportedJobs;
        reportedJobs.splice(reportedIndex, 1);
        this.setState({reportedJobs: reportedJobs});
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
                                    seeReported = {this.state.showReportedOnly}
                                    deleteReported = {this.deleteReported}
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
                <header>
                    <h1 className='header'>JOB BOARD</h1>
                </header>

                <Button className='reported' onClick={() => this.showReportedJobs()}>
                        {this.state.reportedButton}
                </Button>

                <Button className='new-job' onClick={() => this.changeModalPosition()}>
                        Add New Job
                </Button>

                <Grid columns='four'>
                    {this.state.showReportedOnly ? this.buildGrid(this.state.reportedJobs) : this.buildGrid(this.state.jobs)}
                </Grid>

                <Modal isOpen={this.state.modal_is_open} style={{overlay:{zIndex:1000}}} disableAutoFocus={true}>
                     <CreateTask closeModal={this.changeModalPosition} addJob={this.addJob}/>
                </Modal>

            </div>
        )
    }

}

export default Tasks;