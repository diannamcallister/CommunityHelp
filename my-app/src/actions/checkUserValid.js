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
            console.log('user is found');
            return user;
        } else if (res.status === 400) {
            return {};
        }
    } catch(error) {
    console.log(error);
    }   
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
    try {
        const res = await fetch(request);
        if (res.status === 200) {
            const user = res.json();
            console.log('call to backend api worked');
            return user;
        } 
    } catch(error) {
        console.log('also reached in registerUser');
        console.log(error);
    }
}