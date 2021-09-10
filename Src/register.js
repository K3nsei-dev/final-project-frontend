async function registerUser() {
    const name = document.getElementById("first_name").value;
    const surname = document.getElementById("last_name").value;
    const email = document.getElementById("email").value;
    const cell = document.getElementById("cell_num").value;
    const password = document.getElementById("password").value;
    const id = document.getElementById("id").value;
    const postForm = document.getElementById('register')
    const pic = postForm.querySelector("img").src;
    const usernameInput = document.getElementById("username").value;
    const bioInput = document.getElementById("bio-input").value;

  
    // if (
    //   typeof(name) === "number" ||
    //   typeof(surname) === "number"){
    //   return alert(`Please use the correct values for each section!`);
    // }
      
    // console.log(name, surname, email, cell, password)
    try {
      const res = await fetch(
        "https://bigbirdonline.herokuapp.com/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name: name,
            last_name: surname,
            email: email,
            cell_num: cell,
            id_num: id,
            password: password,
            profile_pic: pic,
            bio: bioInput,
            username: usernameInput
          }),
        }
      );
      const json = await res.json();
      console.log("You have succesfully registered");
      if (json["message"] == "You Have Successfully Registered"){
        alert("Please Sign In On Next Page");
        window.location.href = "./home.html";
      } else {
        alert("Please Fill In The Required Fields Correctly");
      }
    } catch (err) {
      console.error(err);
    }
  }

  function addImage() {
    const postForm = document.getElementById('register')
    const preview = postForm.querySelector('img');
    const file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();

    reader.addEventListener("load", function () {
        preview.src = reader.result;
    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }
}