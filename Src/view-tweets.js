let base_URL = "https://bigbirdonline.herokuapp.com/user-posts/" + `${ localStorage.getItem('id') }`;

// view product function
function getPosts(url) {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
  
        // console.log(cartProduct);
  
        tweets = data.results;
  
        renderPosts(tweets);
      });
  }
  
  getPosts(base_URL);

  function renderPosts(tweets) {
      let container = document.querySelector('.user-posts');

      container.innerHTML = "";

      let tweetID = tweets.tweetID;

      console.log(tweetID)

      tweets.forEach((tweet) => {
          container.innerHTML += `<div class="tweet-container">
          <div> Tweet ID ${ tweet.tweet_id } </div>
          <div><p> ${ tweet.description } </p></div>
          <div><img src="${ tweet.image }"class="image"></div>
          <div><img src="${ tweet.image_two }" class="image"></div>
          <div><img src="${ tweet.image_three }" class="image"></div>
          <div><img src="${ tweet.image_four }" class="image"></div>
          <button onclick="editModal()" id="edit-button">EDIT<button>
          <button onclick="deleteModal()" id="delete-btn">DELETE</button>
          <div><div><p> ${ tweet.date } </p></div><div>
          <hr>
          </div>`
      });
  }

  function editModal() {
    // Get the modal
    let modal = document.getElementById("editModal");

    // Get the button that opens the modal
    let btn = document.getElementById("edit-button");

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

  function editPost() {
      const postDescription = document.getElementById('').value;
      const imageOne = document.getElementById('').value;
      const imageTwo = document.getElementById('').value;
      const imageThree = document.getElementById('').value;
      const imageFour = document.getElementById('').value;

      fetch('`${ base_URL }`/edit-post/' + `${localStorage.getItem('id')}` + '/' + ``, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
            description: postDescription,
            image: imageOne,
            image_two: imageTwo,
            image_three: imageThree,
            image_four: imageFour
          })
      }).then(res => res.json()).then(data => {
          console.log(data)
          console.log("Successfull")
      })
  }
  
  function deleteModal() {
    // Get the modal
    let modal = document.getElementById("deleteModal");

    // Get the button that opens the modal
    let btn = document.getElementById("delete-btn");

    // Get the <span> element that closes the modal
    let span = document.getElementsByClassName("exit")[0];

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

  function deleteModal() {
    const tweetID = document.getElementById('').value;

    fetch('`${ base_URL }`/edit-post/' + `${localStorage.getItem('id')}` + '/' + ``, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            tweet_id: tweetID
        })
    }).then(res => res.json()).then(data => {
        console.log(data)
        console.log("Successfull")
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
}}