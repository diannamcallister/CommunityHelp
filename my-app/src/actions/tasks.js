export async function postTask(task) {

    // the URL for the request
    const url = `/api/tasks`;

    // create a form data object w all task fields to be sent to the db
    const formData = new FormData();

    formData.append("owner", JSON.stringify(task.owner));
    formData.append("image", task.image);
    formData.append("location", task.location);
    formData.append("title", task.title);
    formData.append("description", task.description);
    formData.append("numVolunteers", task.numVolunteers);
    formData.append("numHours", task.numHours);
    formData.append("price", task.price);
    formData.append("isReported", false);
    formData.append("comments", []);

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: 'post', 
        body: formData
    });

    // perform call to backend and get response
    const res = await fetch(request);
    const returning = res.json();
    return returning;
}

export async function updateTask(task) {

    const url = `/api/tasks/${task._id}`;

    const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

    if (task.image === undefined || pattern.test(task.image)) {
        // a new image was not added, so can do an easier request body
        // instead of the more complex one in the else
        const request = new Request(url, {
            method: 'put', 
            body: JSON.stringify(task),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        });

        const res = await fetch(request);
        const returning = res.json();
        return returning;

    } else {
        // the image was changed was a FormData object is required to send
        // information to the backend / db correctly
        const formData = new FormData();
        formData.append("owner", JSON.stringify(task.owner));
        if (task.image !== undefined) {
            formData.append("image", task.image);
        }
        formData.append("location", task.location);
        formData.append("title", task.title);
        formData.append("description", task.description);
        formData.append("numVolunteers", task.numVolunteers);
        formData.append("numHours", task.numHours);
        formData.append("price", task.price);
        formData.append("isReported", task.isReported);
        formData.append("comments", JSON.stringify(task.comments));

        const request = new Request(url, {
            method: 'put', 
            body: formData
        });

        const res = await fetch(request);
        const returning = res.json();
        return returning;
    }
}

export async function getAllTasks(location) {
        // the URL for the request
    const url = `/api/tasks/${location}`;

    // Since this is a GET request, simply call fetch on the URL
    const res = await fetch(url);
    const returning = res.json();
    return returning;
}

export async function deleteTask(task) {
    const url = `/api/tasks/${task._id}`;
    const request = new Request(url, {
        method: 'delete', 
        body: JSON.stringify(task),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });

    fetch(request)
    .then(function(res) {
        if (res.status === 200) {
            // If task was deleted successfully, tell the user.
            console.log('Deleted task')
        } else {
            console.log("Issue adding task");     
        }
    }).catch((error) => {
        console.log(error)
    })
}

export async function reportTask(task, newReportedVal) {
    const url = `/api/tasks/${task._id}`;

    // format for the request body of this PATCH is very specific
    const reqBody = [{"op":"replace", "path":"/isReported", "value": newReportedVal}];

    const request = new Request(url, {
        method: 'PATCH', 
        body: JSON.stringify(reqBody),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });

    fetch(request)
    .then(function(res) {
        if (res.status === 200) {
            console.log('Reported task')
        } else {
            console.log("Unable to change the report status of a task");
        }
    }).catch((error) => {
        console.log(error)
    })
}

export async function addCommentDB(task, comment) {
    const url = `/api/tasks/${task._id}/comments`;

    const request = new Request(url, {
        method: 'put', 
        body: JSON.stringify(comment),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });

    fetch(request)
    .then(function(res) {
        if (res.status === 200) {
            console.log('Added comment to task')
        } else {
            console.log("Unable to add a comment to a task");
        }
    }).catch((error) => {
        console.log(error)
    })
}