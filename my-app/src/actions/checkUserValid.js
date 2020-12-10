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
            let user = res.json();
            user.then(resolved => {
                user = resolved;
            }, rejected => {
                console.log(rejected);
            });
            console.log('user is found');
            return user;
        } else if (res.status === 400) {
            return {};
        }
    })
    .catch((error) => {
        console.log(error);
        console.log('error in fetch');
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
        } //duplicate email?
    })
    .catch((error) => {
        console.log(error);
    })
}