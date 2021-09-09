let userSearch = []
let addFollowers = []

function allUsers() {
    fetch('https://bigbirdonline.herokuapp.com/all-users/' + `${ localStorage.getItem('id') }`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json()).then(data => {
        console.log(data)
        console.log("Successfully got users")

        let users = data.results;

        console.log(users   )

        addFollowers = data.results.following;

        console.log(addFollowers)

        renderUsers(users, addFollowers)
        userSearch = users
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
        <button type="button" id="followBtn-${ user.user_id }" onclick="followUser(${ user.user_id }, ${ user.follower })">FOLLOW</button></div>`
    });
}

allUsers();

function followUser(user_id, follower) {
    let newFollowing = localStorage.getItem('following')
    
    let userFollower = follower

    let arrayOfFollowing
    let arrayOfFollower
    if (newFollowing.length >= 1) {
        arrayOfFollowing = Array.from(newFollowing)
        arrayOfFollower = Array.from(userFollower)
    } else {
        arrayOfFollowing = newFollowing.split(",")
        arrayOfFollower = arrayOfFollower.split(",")
    }

    console.log(arrayOfFollowing)
    // let newFollow
    if (arrayOfFollowing == null || arrayOfFollower == null) {
        arrayOfFollowing = {
            following: user_id.toString(),
            follower: localStorage.getItem('id').toString()
        }
    } else {
        arrayOfFollowing = {
            following: arrayOfFollowing.push(user_id).toString(),
            follower: arrayOfFollower.push(localStorage.getItem('id')).toString()
        }
    }

    console.log(arrayOfFollowing)

    fetch('https://bigbirdonline.herokuapp.com/user-profile/' + `${ localStorage.getItem('id') }` + "/follow", {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(arrayOfFollowing)
    }).then(res => res.json()).then(data => {
        console.log(data)
        console.log("Successfully")

        if (data['message'] == "successfully added user to followers") {
            alert('You Successfully Followed Someone')
            // window.location.reload()
            renderFollowedUsers(user_id)
        }
    })
}

function searchUsers() {
    let searchTerm = document.querySelector("#searchInput").value;

    console.log(searchTerm)

    let searchedTerms = userSearch.filter(user => {
        return user.username.toLowerCase().includes(searchTerm.toLowerCase())
    })
    console.log(searchedTerms);
    if (searchedTerms.length == 0) {
        document.querySelector('#timeline').innerHTML = "<h2>No Users Fitting that Description</h2>"
    } else {
        renderSearchedUsers(searchTerm)
    }
}

function renderSearchedUsers(username) {
    fetch('https://bigbirdonline.herokuapp.com/search-profile/' + `${ username }`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json()).then(data => {
        console.log(data)
        console.log("Successfully got profile")

        let profile = data.results;

        renderUserInfo(profile.user_id)

        console.log(profile)

        let container = document.getElementById('timeline');

        console.log(container)

        container.innerHTML = '';

        container.innerHTML += `
        <div class="new-container"><div class="follow-image"><img src="${ profile.profile_pic }"></div>
        <div class="follow-content"><div class="follow-name"><div class="firstName"> ${profile.first_name}</div>
        <div class="lastName"> ${profile.last_name}</div></div>
        <div class="username">@${profile.username}  </div>
        <a href="./view-user.html">PROFILE</a></div>
        `
    })
}

function renderUserInfo(user_id) {
    fetch(
      "https://bigbirdonline.herokuapp.com/user-profile/" + `${ user_id }`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
  
        let users = data.results;

        let following = data.results.following

        let newFollowing = following.split(",")

        let followers = data.results.follower
  
        console.log(users);
  
        let container = document.querySelector("#view-user");
  
        container.innerHTML = "";
  
        container.innerHTML += `<div class="container">
        <img src="${ users.profile_pic }">
        <div class="username"><h3>username</h3> @${users.username}  </div>
        <div class="firstName"><h3>First Name:</h3> ${users.first_name}</div>
        <div class="lastName"><h3>Last Name:</h3> ${users.last_name}</div>
        <div><h3>Bio</h3> ${ users.bio }</div>
        ${
          (newFollowing.length == 0) ? `<div><h3>Following</h3>0</div>` : `<div><h3>Following</h3> ${ newFollowing.length }</div>`
        }
        ${
          (users.follower === 'null') ? `<div><h3>Followers</h3> ${ users.follower }</div>` : `<div><h3>Followers</h3>0</div>`
        }
        <button id="userBtn" id="profileSettings" onclick="editUserModal()">Edit Profile</button>
        <button onclick="deleteUser()">Delete Profile</button>
        <button id="addBtn" onclick="addPostModal()">Add Post</button>
        <hr>
        </div>
        <div id="deleteUser" class="modal">
        <!-- Modal content -->
        <div class="modalContent">
            <span class="done"></span>
            <form onsubmit="event.preventDefault(); editUser(); addImage(); ">
                <h3>Edit Profile</h3>
               <div class="form-group">
                   <label for="first_name">First Name</label>
                   <input type="text" class="form-input" name="first_name" id="firstName" placeholder="John">
               </div>
               <div class="form-group">
                   <label for="last_name">Last Name</label>
                   <input type="text" class="form-input" name="last_name" id="lastName" placeholder="Doe">
               </div>
               <div class="form-group">
                   <label for="email">email</label>
                   <input type="text" class="form-input" name="email" id="userEmail" placeholder="example@mail.com">
               </div>
               <div class="form-group">
                   <label for="cell_num">cell number</label>
                   <input type="text" class="form-input" name="cell_num" id="number" placeholder="083 555 1676">
               </div>
               <div class="form-group">
                   <label for="password">password</label>
                   <input type="text" class="form-input" name="password" id="userPass" placeholder="************">
               </div>
               <div class="form-group">
                   <label for="profile_pic">Profile Picture</label>
                   <input type="file" class="form-input imgurl" name="profile_pic" id="pp" onchange="addImagePP()">
                   <img src="" alt="Image Preview" class="ppURL">
               </div>
               <div class="form-group">
                   <label for="bio">Bio</label>
                   <input type="text" class="form-input" name="bio" id="bio" placeholder="Your Bio">
               </div>
               <div class="form-group">
                   <label for="username">Username</label>
                   <input type="text" name="username" id="userUsername" placeholder="@getwrecked" class="form-input">
               </div>
               <button type="submit">EDIT</button>
            </form>
        </div>
        </div>
    </div>
        `;
      });
  }

  function getUserFollowing() {
      fetch('https://bigbirdonline.herokuapp.com/get-following/' + `${ localStorage.getItem('id') }`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json"
          }
      })
      .then(res => res.json())
      .then(data => {
          console.log(data)
          console.log("Successfully got user followers")
          let followingList = data.results.following;
          localStorage.setItem('following', followingList)
      })
  }

  getUserFollowing()

  function renderFollowedUsers(user_id) {
    fetch('https://bigbirdonline.herokuapp.com/all-posts/' + `${ user_id }`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        console.log("Successfull")

        let followingUser = data;

        let container = document.getElementById('timeline')

        container.innerHTML += container.innerHTML += `
        <div class="tweet-container">
        <div class="tweet-user">
        <div class="user-picture"><img src="${ followingUser.profile_pic }"></div>
        <div class="user-name"><p>${ tweet.first_name } ${ followingUser.last_name }</p>
        <p>@${ followingUser.username }</p></div>
        </div>
        <div class="tweet-images"> 
        ${
          followingUser.description ? `<p> ${ followingUser.description } </p>` : ''
      }
      <div class="image-container-one">${
        followingUser.image ? `<img src="${ followingUser.image }"class="image">` : ''
      }
      ${
        followingUser.image_two ? `<img src="${ followingUser.image_two }"class="image">` : ''
      }</div>
      <div class="image-container-two">${
        followingUser.image_three ? `<img src="${ followingUser.image_three }"class="image">` : ''
      }
      ${
        followingUser.image_four ? `<img src="${ followingUser.image_four }"class="image">` : ''
      }</div>
      </div>
      <div class="comments-date">
      <button onclick="getComments(${ followingUser.user_id }, ${ followingUser.tweet_id   }), event.preventDefault()"><i class="fas fa-comments"></i></button>
      <p> ${ followingUser.date } </p>
      </div>
        </div>`

        console.log(followingUser);
    });
  }