function allUsers() {
    fetch('https://bigbirdonline.herokuapp.com/all-users', {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json()).then(data => {
        console.log(data)
        console.log("Successfully got users")

        let users = data.results;

        // let following = data.results.following
        

        // let follower = data.results.follower

        renderUsers(users)
    })
}

function renderUsers(users) {
    let container = document.getElementById('follow-users')

    container.innerHTML = '';

    users.forEach(user => {
        container.innerHTML += `<div class="new-container"><div class="follow-image"><img src="${ user.profile_pic }"></div>
        <div class="follow-content"><div class="follow-name"><div class="firstName"> ${user.first_name}</div>
        <div class="lastName"> ${user.last_name}</div></div>
        <div class="username">@${user.username}  </div>
        <button type="submit" id="followBtn-${ user.user_id }" onclick="followUser(${ user.user_id })">FOLLOW</button></div>`
    });
}

allUsers();

function followUser(user_id) {
    // let newFollowing = following.split()

    fetch('https://bigbirdonline.herokuapp.com/' + `${ localStorage.getItem('id') }` + "/follow", {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            following: user_id,
            follower: localStorage.getItem('id')
        })
    }).then(res => res.json()).then(data => {
        console.log(data)
        console.log("Successfully")
    })
}