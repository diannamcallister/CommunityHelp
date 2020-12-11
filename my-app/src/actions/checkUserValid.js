//call to backend to check if user is a valid user for login
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
    try {
        const res = await fetch(request);
        if (res.status === 200) {
            let user = res.json();
            return user;
        } else if (res.status === 400) {
            return {};
        }
    } catch(error) {
        console.log(error);
    }   
}

//backend call to register user
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
    try {
        const res = await fetch(request);
        if (res.status === 200) {
            const user = res.json();
            return user;
        } else {
            return {};
        }
    } catch(error) {
        console.log("regUser reached");
        console.log(error);
    }
}