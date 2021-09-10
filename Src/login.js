// assigning variable to local storage
const myStorage = window.localStorage;
const userID = window.localStorage;

// login function
function login() {
    const username = document.getElementById('email-input').value;
    const password = document.getElementById('password-input').value;
    console.log(username, password)
    fetch('https://bigbirdonline.herokuapp.com/user-login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: username,
            password: password
        })
}).then(res => res.json())
    .then(res => {
        console.log(res);
        console.log(res['access_token'])
        
        if (res['message'] == 'You have logged in') {
            userID.setItem('userID', username)
            console.log('Successful')
            console.log(userID)
            alert('You have successfully logged in')
            window.location.href = "./timeline.html"
        } else {
            alert('Incorrect username/password')
        }
    })
}