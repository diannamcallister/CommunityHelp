//GET request
export async function getUserProfile(profile_id) {
    // the URL for the request
const url = `/UserProfile/${profile_id}`;

// Since this is a GET request, simply call fetch on the URL
const res = await fetch(url);
const returning = res.json();
return returning;
}

//Delete User request
export async function deleteUser(user) {
    const url = `/UserProfile/${user._id}`;
    const request = new Request(url, {
        method: 'delete', 
        body: JSON.stringify(user),
        
    });

    fetch(request)
    .then(function(res) {
        // Handle response we get from the API.
        // Usually check the error codes to see what happened.
        if (res.status === 200) {
            // If student was added successfully, tell the user.
            console.log('Deleted User')
           
        } else {
            // If server couldn't add the student, tell the user.
            // Here we are adding a generic message, but you could be more specific in your app.
     
        }

                          //  users are not expected to see this.
    }).catch((error) => {
        console.log(error)
    })
}
//Edit User
export async function EditUser(user) {
    const url = `/UserEditProfile`;

    const reqBody = {email:user.email, name: user.name, location: user.location, profession: user.profession};

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
            // If user was added successfully, tell the user.
            console.log('Edited User')
           
        } else {
            // If server couldn't add the student, tell the user.
            // Here we are adding a generic message, but you could be more specific in your app.
     
        }

                          //  users are not expected to see this.
    }).catch((error) => {
        console.log(error)
    })
}

export async function Addreview(id,review) {
    const url = `/api/users/${id}`;

    const reqBody = {reviewer: review.reviewer,
        reviewee: review.reviewee,
        comment: review.comment,
        rating: Number(review.rating),
        time: review.time};

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
            console.log('Added Review')
           
        } else {
            // If server couldn't add the student, tell the user.
            // Here we are adding a generic message, but you could be more specific in your app.
     
        }
                          //  users are not expected to see this.
    }).catch((error) => {
        console.log(error)
    })
}

export async function patchImage(id,image) {

    // the URL for the request
    const url = `/UserImage/${id}`;

    const formData = new FormData();

    formData.append("image", image);


    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: 'PATCH', 
        body: formData
    });

    const res = await fetch(request);
    const returning = res.json();
    return returning;
}

