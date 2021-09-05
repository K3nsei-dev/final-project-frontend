const id = window.localStorage;

function getID() {
  fetch(
    "https://lca-pointofsales.herokuapp.com//user-data/" +
      `${localStorage.getItem("userID")}`,
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .then((data) => {
      // console.log(data)
      // id.setItem()

      let userID = data.data;

      console.log(userID);

      id.setItem("id", userID);
    });
}

getID();
userInfo();

function userInfo() {
  fetch(
    "https://lca-pointofsales.herokuapp.com//user-profile/" +
      `${id.getItem("id")}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `jwt ${localStorage.getItem("jwt-token")}`,
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      let users = data.data;

      console.log(users);

      let container = document.querySelector("#user-container");

      container.innerHTML = "";

      container.innerHTML += `<div class="user-info>
                <div class="image"><img src="./Images/Lifechoices-300x91.jpg" alt="LCA Logo"></div>
                <div class="userID"><h3>User ID:</h3>  ${users[0]}  </div>
                <div class="firstName"><h3>First Name:</h3> ${users[1]}</div>
                <div class="lastName"><h3>Last Name:</h3> ${users[2]}</div>
                <div class="email"><h3>Email:</h3> ${users[3]}</div>
                <div><h3>Phone Number:</h3> ${users[4]}</div>
                <div><h3>Password:</h3> ${users[5]}</div>
                </div>`;
    });
}

userInfo();
