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
        <button id="userBtn" id="profileSettings" onclick="deleteUserModal()"><i class="fas fa-cog"></i></button>
        <hr>
        </div>
        `;
      });
  }

  function deleteUserModal() {
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
  
  userInfo();

  function deleteUser() {
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

  function editUser() {
    const name = document.getElementById('firstName').value;
    const surname = document.getElementById('lastName').value;
    const userEmail =document.getElementById('userEmail').value;
    const number = document.getElementById('number').value;
    const userPass = document.getElementById('userPass').value;
    const pp = document.getElementById('pp').value;
    const userBio = document.getElementById('bio').value;
    const userUsername = document.getElementById('userUsername').value;

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
        alert("You Successfully Deleted Your Profile")
        window.location.href = "./profile.html"
      }
    })
  }