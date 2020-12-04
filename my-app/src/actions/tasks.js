export function postTask(task) {
    // the URL for the request
    const url = `/api/tasks`;

    task.owner = {
        "_id": "5fc3e5a1bd841ef02aeebc34",
        "email": "test@gmail.com",
        "password": "$2a$10$xmcUYTiAmpo4uqtSa1MyJucY.qqkkXt1sXPg65RaHO4xQeLlKKbWy",
        "firstName": "dianna",
        "lastName": "mcallister",
        "location": "toronto",
        "isAdmin": true,
        "reviews": [],
        "__v": 0
    };

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: 'post', 
        body: JSON.stringify(task),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });

    // Send the request with fetch()
    fetch(request)
    .then(function(res) {
        // Handle response we get from the API.
        // Usually check the error codes to see what happened.
        if (res.status === 200) {
            // If student was added successfully, tell the user.
            console.log('Added student')
           
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
    console.log("in allTasks");
    location = "toronto";
    const url = `/api/tasks/${location}`;

    // Since this is a GET request, simply call fetch on the URL
    const res = await fetch(url);
    const returning = res.json();
    return returning;
    // fetch(url)
    // .then((res) => { 
    //     if (res.status === 200) {
    //         // return a promise that resolves with the JSON body
    //         return res.json();
    //     } else {
    //         alert('Could not get tasks')
    //     }                
    // }).then((returning) => {
    //     console.log(returning);
    //     return returning
    // }).catch((error) => {
    //     console.log(error)
    // })
}