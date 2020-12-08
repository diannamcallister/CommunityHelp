export async function postTask(task) {

    // the URL for the request
    const url = `/api/tasks`;

    const formData = new FormData();

    const owner = {
        "_id": "5fc3e5a1bd841ef02aeebc34",
        "email": "test@gmail.com",
        "password": "$2a$10$xmcUYTiAmpo4uqtSa1MyJucY.qqkkXt1sXPg65RaHO4xQeLlKKbWy",
        "firstName": "dianna",
        "lastName": "mcallister",
        "location": "toronto",
        "isAdmin": true,
        "reviews": [],
        "__v": 0
    }

    formData.append("owner", JSON.stringify(owner));
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

    const res = await fetch(request);
    const returning = res.json();
    return returning;
}

export async function updateTask(task) {

    const url = `/api/tasks/${task._id}`;

    const request = new Request(url, {
        method: 'put', 
        body: JSON.stringify(task),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });

    fetch(request)
    .then(function(res) {
        // Handle response we get from the API.
        // Usually check the error codes to see what happened.
        if (res.status === 200) {
            // If student was added successfully, tell the user.
            console.log('updated task')
           
        } else {
            // If server couldn't add the student, tell the user.
            // Here we are adding a generic message, but you could be more specific in your app.
     
        }
        console.log(res)  // log the result in the console for development purposes,
                          //  users are not expected to see this.
    }).catch((error) => {
        console.log(error)
    })
}

export async function getAllTasks(location) {
        // the URL for the request
    location = "toronto";
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
        // Handle response we get from the API.
        // Usually check the error codes to see what happened.
        if (res.status === 200) {
            // If student was added successfully, tell the user.
            console.log('Deleted task')
           
        } else {
            // If server couldn't add the student, tell the user.
            // Here we are adding a generic message, but you could be more specific in your app.
     
        }
        console.log(res)  // log the result in the console for development purposes,
                          //  users are not expected to see this.
    }).catch((error) => {
        console.log(error)
    })
}

// [{ "op": "replace", "path": "/isReported", "value": true}]
export async function reportTask(task, newReportedVal) {
    const url = `/api/tasks/${task._id}`;

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
        // Handle response we get from the API.
        // Usually check the error codes to see what happened.
        if (res.status === 200) {
            // If student was added successfully, tell the user.
            console.log('Reported task')
           
        } else {
            // If server couldn't add the student, tell the user.
            // Here we are adding a generic message, but you could be more specific in your app.
     
        }
        console.log(res)  // log the result in the console for development purposes,
                          //  users are not expected to see this.
    }).catch((error) => {
        console.log(error)
    })
}

export async function addCommentDB(task, comment) {
    const url = `/api/tasks/${task._id}/comments`;

    const commenter = {
        "_id": "5fc3e5a1bd841ef02aeebc34",
        "email": "test@gmail.com",
        "password": "$2a$10$xmcUYTiAmpo4uqtSa1MyJucY.qqkkXt1sXPg65RaHO4xQeLlKKbWy",
        "firstName": "dianna",
        "lastName": "mcallister",
        "location": "toronto",
        "isAdmin": true,
        "reviews": [],
        "__v": 0
    }

    comment.commenter = commenter; //TODO: have comment get retrieved from actual UI

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
        // Handle response we get from the API.
        // Usually check the error codes to see what happened.
        if (res.status === 200) {
            // If student was added successfully, tell the user.
            console.log('Added comment to task')
           
        } else {
            // If server couldn't add the student, tell the user.
            // Here we are adding a generic message, but you could be more specific in your app.
     
        }
        console.log(res)  // log the result in the console for development purposes,
                          //  users are not expected to see this.
    }).catch((error) => {
        console.log(error)
    })
}