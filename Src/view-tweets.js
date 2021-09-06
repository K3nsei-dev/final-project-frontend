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
        ${
            tweet.description ? `<div><p> ${ tweet.description } </p></div>` : ''
        }
        ${
          tweet.image ? `<div><img src="${ tweet.image }"class="image"></div>` : ''
        }
        ${
          tweet.image_two ? `<div><img src="${ tweet.image_two }"class="image"></div>` : ''
        }
        ${
          tweet.image_three ? `<div><img src="${ tweet.image_three }"class="image"></div>` : ''
        }
        ${
          tweet.image_four ? `<div><img src="${ tweet.image_four }"class="image"></div>` : ''
        }
          <button onclick="editModal(${ tweet.tweet_id }), addImage()" id="edit-button-${ tweet.tweet_id }">EDIT<button>
          <button onclick="deletePost(${ tweet.tweet_id })" id="delete-btn-${ tweet.tweet_id }">DELETE</button>
          <div><div><p> ${ tweet.date } </p></div><div>
          <hr>
          </div>
          <!-- The Modal -->
          <div id="editModal-${ tweet.tweet_id }" class="modal">
          <!-- Modal content -->
          <div class="modal-content">
              <span class="close-${ tweet.tweet_id }"></span>
              <form onsubmit="event.preventDefault(), editPost(${ tweet.tweet_id })">
                  <div class="form-group">
                      <label for="description">Description</label>
                      <input type="text" name="description" id="userDescription-${ tweet.tweet_id }" placeholder="Write your bio here">
                  </div>
                  <div class="form-group">
                      <label for="image">Image</label>
                      <input type="file" name="image" id="imageOne-${ tweet.tweet_id }" onchange="addImage()">
                       <img src="" alt="Image Preview" class="imgurl" height="200">
                  </div>
                  <div class="form-group">
                      <label for="image_two">Image</label>
                      <input type="file" name="image_two" id="imageTwo-${ tweet.tweet_id }" onchange="addImageTwo()">
                      <img src="" alt="Image Preview" class="imgurl-two" height="200">
                  </div>
                  <div class="form-group">
                      <label for="image_three">Image</label>
                      <input type="file" name="image_three" id="imageThree-${ tweet.tweet_id }" onchange="addImageThree()">
                       <img src="" alt="Image Preview" class="imgurl-three" height="200">
                  </div>
                  <div class="form-group">
                      <label for="image_four">Image</label>
                      <input type="file" name="image_four" id="imageFour-${ tweet.tweet_id }" onchange="addImageFour()">
                       <img src="" alt="Image Preview" class="imgurl-four" height="200">
                  </div>
                  <button type="submit" id="editBtn-${ tweet.tweet_id }">EDIT</button>
              </form>
          </div>
      </div>`
      });
  }

  function editModal(tweet_id) {
    // Get the modal
    let modal = document.getElementById(`editModal-${ tweet_id }`);

    // Get the button that opens the modal
    let btn = document.getElementById(`edit-button-${ tweet_id }`);

    // Get the <span> element that closes the modal
    let span = document.getElementsByClassName(`close-${ tweet_id }`)[0];

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

  function editPost(tweet_id) {
      const postDescription = document.getElementById(`userDescription-${ tweet_id }`).value;
      const imageOne = document.querySelector(".imgurl").src;
      const imageTwo = document.querySelector(".imgurl-two").src;
      const imageThree = document.querySelector(".imgurl-three").src;
      const imageFour = document.querySelector(".imgurl-four").src;

       post = {
        tweet_id: tweet_id,
        description: postDescription,
        image: imageOne,
        image_two: imageTwo,
        image_three: imageThree,
        image_four: imageFour
       }

      console.log(post)

      fetch('https://bigbirdonline.herokuapp.com/edit-post/' + `${localStorage.getItem('id')}` + '/' + `${ tweet_id }`, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              tweet_id: tweet_id,
              description: postDescription,
              image: imageOne,
              image_two: imageTwo,
              image_three: imageThree,
              image_four: imageFour
          })
      }).then(res => res.json()).then(data => {
          console.log(data)
          console.log("Successfull")

          if (data['message'] == "You updated the post successfully") {
              alert('You Successfully Edited Your Post!')
            //   window.location.reload()   
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
  const preview = document.querySelector('.imgurl-two');
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
  const preview = document.querySelector('.imgurl-three');
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
  const preview = document.querySelector('.imgurl-four');
  const file = document.querySelector('input[type=file]').files[0];
  const reader = new FileReader();

  reader.addEventListener("load", function () {
      preview.src = reader.result;
  }, false);

  if (file) {
      reader.readAsDataURL(file);
  }
}

function deletePost(tweet_id) {
    let confirmed = confirm("Do you want to delete this post?")
    if(confirmed){
        fetch('https://bigbirdonline.herokuapp.com/delete-post/' + `${localStorage.getItem('id')}` + '/' + `${tweet_id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                tweet_id: tweet_id
            })
        }).then(res => res.json()).then(data => {
            console.log(data)
            console.log("Successfull")

            if (data['message'] == "You successfully deleted the post") {
                window.location.reload()
            }

        })
    }
}