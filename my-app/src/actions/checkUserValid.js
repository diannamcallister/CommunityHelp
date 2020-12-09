export async function checkUser(credentials) {
    const url = `/users/login`;
    const request = new Request(url, {
        method: 'post',
        body: JSON.stringify(credentials),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    });

    fetch(request)
    .then(res => {
        if (res.status === 200) {
            //user is valid, want to return user object
            const user = res.json();
            return user;
        }
    })
    .catch((error) => {
        console.log(error);
    })
}

export async function registerUser(newUser) {
    const url = `/api/users`;
    const request = new Request(url, {
        method: 'post',
        body: JSON.stringify(newUser),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    });

    fetch(request)
    .then(res => {
        if (res.status === 200) {
            //new user was created
            const user = res.json();
            return user;
        } else
        {
            return {};
        }
    })
    .catch((error) => {
        return error;
    })
}