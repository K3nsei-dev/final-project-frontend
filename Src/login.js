// assigning variable to local storage
const myStorage = window.localStorage;
const userID = window.localStorage;

// login function
function login() {
    const username = document.getElementById('email-input').value;
    const password = document.getElementById('password-input').value;
    console.log(username, password)
fetch('https://bigbirdonline.herokuapp.com/auth', {
    method: 'post',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        username: username,
        password: password
    })
}).then(res => res.json())
    .then(res => {
        console.log(res);
        console.log(res['access_token'])
        
        if (res['description'] == 'Invalid credentials') {
            alert('Incorrect username/password')
        } else {
            myStorage.setItem('jwt-token', res['access_token'])
            userID.setItem('userID', username)
            console.log('Successful')
            console.log(userID)
            alert('You have successfully logged in')
            window.location.href = "./timeline.html"
        }
    })
}