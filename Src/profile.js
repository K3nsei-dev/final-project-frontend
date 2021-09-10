const id = window.localStorage;

function getID() {
  fetch(
    "https://bigbirdonline.herokuapp.com/user-data/" + `${localStorage.getItem("userID")}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data)

      let userID = data.results;

      console.log(userID);
      console.log("Successfully got User ID")

      id.setItem("id", userID);
    });
}

function userInfo() {
    fetch(
      "https://bigbirdonline.herokuapp.com/user-profile/" + `${id.getItem("id")}`,{
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

        let newFollowing;

        if (users.following == null) {
          newFollowing.length == 0
        } else {
          newFollowing = following.split(",")
        } 

        let followers = data.results.follower
  
        console.log(users);
  
        let container = document.querySelector(".user-container");
  
        container.innerHTML = "";
  
        container.innerHTML += `<div class="JScontainer">
        <div class="bigContainer">
        <div class="profile-image"><img src="${ users.profile_pic }"></div>
        <div class="userNamesContainer">
        <div class="userNames">${users.first_name} ${users.last_name}</div>
        @${users.username}</div>
        </div>
        <div class="bio"><h2>${ users.bio }</h2></div>
        <div class="following">${
          (newFollowing.length == 0) ? `<div class="followCount"><h3>Following</h3>0</div>` : `<div class="followCount"><h3>Following</h3> ${ newFollowing.length }</div>`
        }
        ${
          (followers === 'null') ? `<div class="followCount"><h3>Followers</h3> ${ followers }</div>` : `<div class="followCount"><h3>Followers</h3>0</div>`
        }</div>
        <button id="userBtn" id="profileSettings" onclick="editUserModal()">Edit Profile</button>
        <button onclick="deleteUser()">Delete Profile</button>
        </div>
    </div>
        `;
      });
  }

  function editUserModal() {
    // Get the modal
    let modal = document.getElementById("deleteUser");

    // Get the button that opens the modal
    let btn = document.getElementById("userBtn");

    // Get the <span> element that closes the modal
    let span = document.getElementsByClassName("done")[0];

    // When the user clicks on the button, open the modal
    btn.onclick = function() {
    modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
    modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
  }
}
  }

  function addPostModal() {
    // Get the modal
    let modal = document.getElementById("addModal");

    // Get the button that opens the modal
    let btn = document.getElementById("addBtn");

    // Get the <span> element that closes the modal
    let span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal
    btn.onclick = function() {
    modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
    modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
  }
}
  }
  
  userInfo();

  function deleteUser() {
    confirmed = confirm('Are you sure you want to delete your profile?')

    if (confirmed) {
      fetch("https://bigbirdonline.herokuapp.com/delete-user/" + `${ id.getItem('id') }`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id: id.getItem('id')
        })
      }).then(res => res.json).then(data => {
        console.log(data)
        console.log("Successfull")
  
        if (data['message'] = "You successfully deleted the user") {
          alert("You Successfully Deleted Your Profile")
          window.location.href = "./home.html"
        }
      })
    }
  }

  function editUser() {
    const name = document.getElementById('firstName').value;
    const surname = document.getElementById('lastName').value;
    const userEmail =document.getElementById('userEmail').value;
    const number = document.getElementById('number').value;
    const userPass = document.getElementById('userPass').value;
    let editForm = document.getElementById('newPostForm');
    const pp = editForm.querySelector('img').src;
    const userBio = document.getElementById('bio').value;
    const userUsername = document.getElementById('userUsername').value;

    console.log(name, surname, userEmail)

    fetch('https://bigbirdonline.herokuapp.com/edit-user/' + `${ id.getItem('id') }`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: id.getItem('id'),
        first_name: name,
        last_name: surname,
        email: userEmail,
        cell_num: number,
        password: userPass,
        profile_pic: pp,
        bio: userBio,
        username: userUsername
      })
    }).then(res => res.json).then(data => {
      console.log(data)
      console.log("Successfull")

      if (data['message'] = "You successfully updated the user") {
        alert("You Successfully Edited Your Profile")
        window.location.reload()
      }
    })
  }

function addPost() {
  const postDescription = document.getElementById("userDescription").value;
  let postForm = document.querySelector('#newPostForm')
  const imgs = postForm.querySelectorAll('img')
  console.log(imgs)
  const imageOne = imgs[0].src;
  const imageTwo = imgs[1].src;
  const imageThree = imgs[2].src;
  const imageFour = imgs[3].src;

  let post = {
    user_id: localStorage.getItem('id'),
    description: postDescription,
    image: imageOne,
    image_two: imageTwo,
    image_three: imageThree,
    image_four: imageFour
}

  console.log(post, imageOne)

  fetch('https://bigbirdonline.herokuapp.com/add-post/' + `${localStorage.getItem('id')}`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
          user_id: localStorage.getItem('id'),
          description: postDescription,
          image: imageOne,
          image_two: imageTwo,
          image_three: imageThree,
          image_four: imageFour
      })
  }).then(res => res.json()).then(data => {
      console.log(data)
      console.log("Successfull")

      if (data['message'] == "Successfully added a post") {
          alert('You Successfully Added A Post!')
          window.location.reload()
      }
  })
}

function addImage(option) {
  const preview = document.querySelector('img');
  const file = document.querySelector(`#image${option}`).files[0];
  console.log(file)
  console.log(preview)

  const reader = new FileReader();

  reader.addEventListener("load", function () {
      preview.src = reader.result;
  }, false);

  if (file) {
      reader.readAsDataURL(file);
  }
}