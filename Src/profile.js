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
      // console.log(data)
      // id.setItem()

      let userID = data.data;

      console.log(userID);
      console.log("Successfully got User ID")

      id.setItem("id", userID);
    });
}

getID()

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

        // let following = users.following;

        // following.split()

        // console.log(following)
        // userInfo(following)
  
        console.log(users);
  
        let container = document.querySelector(".user-container");
  
        container.innerHTML = "";
  
        container.innerHTML += `<div class="container">
        <img src="${ users.profile_pic }">
        <div class="username"><h3>username</h3> @${users.username}  </div>
        <div class="firstName"><h3>First Name:</h3> ${users.first_name}</div>
        <div class="lastName"><h3>Last Name:</h3> ${users.last_name}</div>
        <div><h3>Bio</h3> ${ users.bio }</div>
        <div><h3>Following</h3> ${ users.following }</div>
        <div><h3>Followers</h3> ${ users.followers }</div>
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
                   <input type="file" class="form-input imgurl" name="profile_pic" id="pp">
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
        <!-- The Modal -->
        <div id="addModal" class="modal">
        <!-- Modal content -->
        <div class="modal-content">
            <span class="close"></span>
            <form onsubmit="event.preventDefault(), addImage(), addPost()">
                <div class="form-group">
                    <label for="description">Description</label>
                    <input type="text" name="description" id="userDescription" placeholder="Write your bio here">
                </div>
                <div class="form-group">
                    <label for="image">Image</label>
                    <input type="file" name="image" id="imageOne" onchange="addImage()">
                    <img src="" alt="Image Preview" class="imgurl">
                </div>
                <div class="form-group">
                    <label for="image_two">Image</label>
                    <input type="file" name="image_two" id="imageTwo" onchange="addImageTwo()">
                    <img src="" alt="Image Preview" class="imgurlTwo">
                </div>
                <div class="form-group">
                    <label for="image_three">Image</label>
                    <input type="file" name="image_three" id="imageThree" onchange="addImageThree()">
                    <img src="" alt="Image Preview" class="imgurlThree">
                </div>
                <div class="form-group">
                    <label for="image_four">Image</label>
                    <input type="file" name="image_four" id="imageFour" onchange="addImageFour()">
                    <img src="" alt="Image Preview" class="imgurlFour">
                </div>
                <button type="submit">Add Post</button>
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
    const pp = document.getElementById('pp').value;
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

  function addImage() {
    const preview = document.querySelector('.imgurl');
    const file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();

    reader.addEventListener("load", function () {
        preview.src = reader.result;
    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }
}

function addImageTwo() {
  const preview = document.querySelector('.imgurlTwo');
  const file = document.querySelector('input[type=file]').files[0];
  const reader = new FileReader();

  reader.addEventListener("load", function () {
      preview.src = reader.result;
  }, false);

  if (file) {
      reader.readAsDataURL(file);
  }
}

function addImageThree() {
  const preview = document.querySelector('.imgurlThree');
  const file = document.querySelector('input[type=file]').files[0];
  const reader = new FileReader();

  reader.addEventListener("load", function () {
      preview.src = reader.result;
  }, false);

  if (file) {
      reader.readAsDataURL(file);
  }
}

function addImageFour() {
  const preview = document.querySelector('.imgurlFour');
  const file = document.querySelector('input[type=file]').files[0];
  const reader = new FileReader();

  reader.addEventListener("load", function () {
      preview.src = reader.result;
  }, false);

  if (file) {
      reader.readAsDataURL(file);
  }
}

function addPost() {
  const postDescription = document.getElementById("userDescription").value;
  const imageOne = document.querySelector(".imgurl").src;
  const imageTwo = document.querySelector(".imgurlTwo").src;
  const imageThree = document.querySelector(".imgurlThree").src;
  const imageFour = document.querySelector(".imgurlFour").src;

  let post = {
    user_id: localStorage.getItem('id'),
    description: postDescription,
    image: imageOne,
    image_two: imageTwo,
    image_three: imageThree,
    image_four: imageFour
}

  console.log(post)

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

      if (data['message'] == "You successfully added a post") {
          alert('You Successfully Added A Post!')
          window.location.reload()
      }
  })
}