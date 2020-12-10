import React from 'react';
import "semantic-ui-css/semantic.min.css";
import { Form, Button, Grid, Message } from 'semantic-ui-react';
import { postTask } from '../../actions/tasks.js';

import './CreateTasks.css';

class CreateTask extends React.Component {


    constructor(props) {
        super(props);
        this.updateField = this.updateField.bind(this);
        this.addJob = this.addJob.bind(this);
        this.postTask = postTask.bind(this);
        this.state = {
            title: undefined,
            description: undefined,
            price: undefined,
            hours: undefined,
            volunteerNum: undefined,
            image: undefined,
            errorMsg: "You must fill out all fields.",
            formError: false,
            missingTitle: false,
            missingDescription: false,
            missingPrice: false,
            missingHours: false,
            missingVolunteers: false,
            missingImage: false
        }
    }

    updateField = event => {
        // display user input to the screen in the correct text box
        const target = event.target;
        const value = target.value;
        const name = target.name;

        if (this.state.formError) {
            const formError = !this.state.formError;
            this.setState({formError: formError});

            const errorMsg = "You must fill out all the fields.";
            this.setState({errorMsg: errorMsg});
        }
        if (name === 'title' && this.state.missingTitle) {
            this.setState({missingTitle: false});
        }
        if (name === 'description' && this.state.missingDescription) {
            this.setState({missingDescription: false});
        }
        if (name === 'price' && this.state.missingPrice) {
            this.setState({missingPrice: false});
        }
        if (name === 'hours' && this.state.missingHours) {
            this.setState({missingHours: false});
        }
        if (name === 'volunteerNum' && this.state.missingVolunteers) {
            this.setState({missingVolunteers: false});
        }
        if (name === 'image') {
            this.setState({image: target.files[0]});
            if (this.statemissingImage) {
                this.setState({missingImage: false});
            }
            return;
        }


        this.setState({[name]: value});
    }

    async addJob() {
        if (this.state.price !== undefined && (isNaN(this.state.price) || !Number.isInteger(parseFloat(this.state.price)))) {
            const errorMsg = "Price must be an integer value.";

            const formError = !this.state.formError;
            this.setState({formError: formError});

            this.setState({errorMsg: errorMsg});
            this.setState({missingPrice: true});
            return;
        }
        if (this.state.hours !== undefined && (isNaN(this.state.hours) || !Number.isInteger(parseFloat(this.state.hours)))) {
            const errorMsg = "Hours must be an integer value.";

            const formError = !this.state.formError;
            this.setState({formError: formError});

            this.setState({errorMsg: errorMsg});
            this.setState({missingHours: true});
            return;
        }
        if (this.state.volunteerNum !== undefined && (isNaN(this.state.volunteerNum) || !Number.isInteger(parseFloat(this.state.volunteerNum)))) {
            const errorMsg = "Number of Volunteers must be an integer value.";

            const formError = !this.state.formError;
            this.setState({formError: formError});

            this.setState({errorMsg: errorMsg});
            this.setState({missingVolunteers: true});
            return;
        } else if (this.state.title && this.state.description && this.state.price && this.state.hours && this.state.volunteerNum) {
            const newJob = {

                title: this.state.title,
                description: this.state.description,
                numHours: this.state.hours,
                numVolunteers: this.state.volunteerNum,
                price: this.state.price,
                location: "toronto"
            }
            if (this.state.image) {
                newJob.image = this.state.image
            }
            //FUTURE TODO: add a POST call to add the new job to the db
            const newJobSaved = await this.postTask(newJob);
            this.props.addJob(newJobSaved);
        } else {
            const formError = !this.state.formError;
            this.setState({formError: formError});
            if (this.state.title === undefined) {
                this.setState({missingTitle: true});
            }
            if (this.state.description === undefined) {
                this.setState({missingDescription: true});
            }
            if (this.state.price === undefined) {
                this.setState({missingPrice: true});
            }
            if (this.state.hours === undefined) {
                this.setState({missingHours: true});
            }
            if (this.state.volunteerNum === undefined) {
                this.setState({missingVolunteers: true});
            }
            if (this.state.image === undefined) {
                this.setState({missingImage: true});
            }
        }
    }

    render() {
        return (
            <div>
                <Button id='buttons' onClick={this.props.closeModal}>
                    <Button.Content visible> X</Button.Content>
                </Button>

                <header>
                    <h1 className='Header'>ADD JOB</h1>
                </header>

                <Form className='form-padding' error={this.state.formError}>
                {this.state.formError ? 
                <Message
                    error
                    className='error-msg'
                    header="One or more fields had errors."
                    content={this.state.errorMsg}
                /> 
                : null}

                    <Form.Group>
                        <Form.Input
                            name="title"
                            label='JOB TITLE:'
                            placholder="Job Title"
                            width={6}
                            onChange={this.updateField}
                            error={this.state.missingTitle} />

                        <Form.Input
                            name="description"
                            label='DESCRIPTION:'
                            placholder='Description'
                            width={10}
                            onChange={this.updateField}
                            error={this.state.missingDescription} />
                    </Form.Group>


                    <Form.Group>
                    <Form.Input
                        name="price"
                        label='PRICE:'
                        placholder='Price'
                        width={5}
                        onChange={this.updateField}
                        error={this.state.missingPrice} />

                    <Form.Input
                        name="hours"
                        label='HOURS:'
                        placholder='Hours'
                        width={5}
                        onChange={this.updateField}
                        error={this.state.missingHours} />

                    <Form.Input
                        name="volunteerNum"
                        label='NUMBER OF VOLUNTEERS NEEDED:'
                        placholder='Number of Volunteers'
                        width={6}
                        onChange={this.updateField}
                        error={this.state.missingVolunteers} />
                    </Form.Group>

                    {/* FUTURE TODO: allow for users to upload images that are not URLs, since they will be able to be stored to the db
                        instead of just using the image URLs instead */}
                    <Form.Input
                        name="image"
                        label='IMAGE (ONLY URL ACCEPTED):'
                        placholder='Image'
                        type="file"
                        onChange={this.updateField}
                        error={this.state.missingImage} >
                    </Form.Input>

                </Form>

                <Grid>
                    <Grid.Row centered>
                        <Button className='add-job' onClick={this.addJob}>
                            Add Job
                        </Button>
                    </Grid.Row>
                </Grid>

            </div>
        )
    }
}

export default CreateTask;