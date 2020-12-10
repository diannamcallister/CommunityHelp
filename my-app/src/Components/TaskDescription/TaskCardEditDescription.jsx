import React from 'react';
import "semantic-ui-css/semantic.min.css";
import { Button, Card, TextArea, Input } from 'semantic-ui-react';

import './TaskDescription.css';

class TaskCardEditDescription extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            task: this.props.task,
            isAdmin: this.props.isAdmin,
            username: this.props.username,
        };
        this.updateUserEntry = this.updateUserEntry.bind(this);
    }

    updateUserEntry = e => {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        const task = this.state.task;

        if (name === 'image') {
            task[name] = target.files[0];
            this.setState({task: task});
            return;
        }

        task[name] = value;
        this.setState({task: task})
    }


    render() {

        return (
            <div>
                <Card className='task-card'>
                    <span className='bottom-spacing'><b className='subtitles'>Title: </b><Input name='title' className='input-title-sizing' focus onChange={this.updateUserEntry} defaultValue={this.props.task.title}/></span>
                    <span className='bottom-spacing'><b className='subtitles'>Image: </b><Input name='image' className='input-image-sizing' focus type="file" onChange={this.updateUserEntry}/></span>
                    <span className='bottom-spacing'><b className='subtitles'>Description: </b><TextArea name='description' className='input-description-sizing' onChange={this.updateUserEntry} defaultValue={this.props.task.description}/></span>
                    <span className='bottom-spacing'><b className='subtitles'>Hours: </b><Input name='hours' className='input-hours-sizing' focus onChange={this.updateUserEntry} defaultValue={this.props.task.numHours}/></span>
                    <span className='bottom-spacing'><b className='subtitles'>Num Volunteers Needed: </b><Input name='volunteerNum' className='input-volunteers-sizing' focus onChange={this.updateUserEntry} defaultValue={this.props.task.numVolunteers}/></span>
                    <span className='bottom-spacing'><b className='subtitles'>Price: </b><Input name='price' className='input-price-sizing' focus onChange={this.updateUserEntry} defaultValue={this.props.task.price}/></span>

                    {/* FUTURE TODO: this will be updated to compare the user's IDs so that users with the same name
                            won't be confused as being the same user - every user will have a unique ID instead */}
                    <Button className='done-editing' onClick={() => this.props.doneEditingTask(this.state.task)}>Done Editing Task</Button>
                </Card>
            </div>
        )
    }
}

export default TaskCardEditDescription;