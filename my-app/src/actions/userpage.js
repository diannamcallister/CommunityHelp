export async function getAllUsers(location) {
    // the URL for the request
    const url = `/api/users/${location}`;

    // Since this is a GET request, simply call fetch on the URL
    try {
        const res = await fetch(url);
        const returning = res.json();
        return returning;
    } catch (e) {
        console.log("there was an error!")
    }
    
    
}

export async function deleteUser(user) {
    
    const url = `/UserProfile/${user._id}`;
    const request = new Request(url, {
        method: 'delete', 
        body: JSON.stringify(user),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });

    fetch(request)
    .then(function(res) {
        if (res.status === 200) {
            // If we successfuly deleted user, we will log that the user was deleted
            console.log('Deleted user')
           
        } else {
            console.log('Could not delete user')
        } 
    }).catch((error) => {
        console.log(error)
    })
}