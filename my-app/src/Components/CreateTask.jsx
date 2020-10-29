import React from 'react';
import "semantic-ui-css/semantic.min.css";
import { Form, Button, Grid } from 'semantic-ui-react';

import '../Styling/CreateTasks.css';

class CreateTask extends React.Component {


    constructor(props) {
        super(props);
        this.updateField = this.updateField.bind(this);
        this.addJob = this.addJob.bind(this);
        this.state = {
            title: '',
            description: '',
            price: 0,
            hours: 0,
            volunteerNum: 0,
            image: ''
        }
    }

    updateField = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({[name]: value})
    }

    addJob = () => {
        const newJob = {
            title: this.state.title,
            description: this.state.description,
            image: this.state.image,
            hours: this.state.hours,
            volunteerNum: this.state.volunteerNum,
            price: this.state.price
        }
        this.props.addJob(newJob);
    }

    render() {
        return (
            <div>
                <Button className='exit-button' onClick={this.props.closeModal}>
                    <Button.Content visible> X</Button.Content>
                </Button>

                <header>
                    <h1 className='header'>ADD JOB</h1>
                </header>

                <Form className='form-padding'>

                    <Form.Group>
                        <Form.Input
                            name="title"
                            label='JOB TITLE:'
                            placholder="Job Title"
                            width={6}
                            onChange={this.updateField} />

                        <Form.Input
                            name="description"
                            label='DESCRIPTION:'
                            placholder='Description'
                            width={10}
                            onChange={this.updateField}/>
                    </Form.Group>


                    <Form.Group>
                    <Form.Input
                        name="price"
                        label='PRICE:'
                        placholder='Price'
                        width={5}
                        onChange={this.updateField}/>

                    <Form.Input
                        name="hours"
                        label='HOURS:'
                        placholder='Hours'
                        width={5}
                        onChange={this.updateField}/>

                    <Form.Input
                        name="volunteerNum"
                        label='NUMBER OF VOLUNTEERS NEEDED:'
                        placholder='Number of Volunteers'
                        width={6}
                        onChange={this.updateField}/>
                    </Form.Group>

                    <Form.Input
                        name="image"
                        label='IMAGE (ONLY URL ACCEPTED):'
                        placholder='Image'
                        onChange={this.updateField}>
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