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
          <div class="tweet-user">
          <div class="user-picture"><img src="${ tweet.profile_pic }"></div>
          <div class="user-name"><p>${ tweet.first_name } ${ tweet.last_name }</p>
          <p>@${ tweet.username }</p></div>
          </div>
        ${
            tweet.description ? `<div class="text"><p> ${ tweet.description } </p></div>` : ''
        }
        <div class="image-container"><div class="tweet-image-container-one">${
          tweet.image ? `<div class="image"><img src="${ tweet.image }"></div>` : ''
        }
        ${
          tweet.image_two ? `<div class="image"><img src="${ tweet.image_two }"></div>` : ''
        }</div>
        <div class="tweet-image-container-two">${
          tweet.image_three ? `<div class="image"><img src="${ tweet.image_three }"></div>` : ''
        }
        ${
          tweet.image_four ? `<div class="image"><img src="${ tweet.image_four }"></div>` : ''
        }</div></div>
          <div class="view-btn-container"><div class="view-btn"><button onclick="editModal(${ tweet.tweet_id })" id="edit-button-${ tweet.tweet_id }">EDIT</button></div>
          <div class="view-btn-two"><button onclick="deletePost(${ tweet.tweet_id })" id="delete-btn-${ tweet.tweet_id }">DELETE</button></div></div>
          <div><p> ${ tweet.date } </p></div>
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
                      <input type="file" name="image" id="imageOne-${ tweet.tweet_id }" class="imgurl-${ tweet.tweet_id }" onchange="addImage(${ tweet.tweet_id })">
                  </div>
                  <div class="form-group">
                      <label for="image_two">Image</label>
                      <input type="file" name="image_two" id="imageTwo-${ tweet.tweet_id }" class="imgurl-${ tweet.tweet_id }" onchange="addImage(${ tweet.tweet_id })">
                  </div>
                  <div class="form-group">
                      <label for="image_three">Image</label>
                      <input type="file" name="image_three" id="imageThree-${ tweet.tweet_id }" class="imgurl-${ tweet.tweet_id }" onchange="addImage(${ tweet.tweet_id })">
                  </div>
                  <div class="form-group">
                      <label for="image_four">Image</label>
                      <input type="file" name="image_four" id="imageFour-${ tweet.tweet_id }" class="imgurl-${ tweet.tweet_id }" onchange="addImage(${ tweet.tweet_id })">
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
      const imageOne = document.querySelector(`#imageOne-${ tweet_id }`).src;
      const imageTwo = document.querySelector(`#imageTwo-${ tweet_id }`).src;
      const imageThree = document.querySelector(`#imageThree-${ tweet_id }`).src;
      const imageFour = document.querySelector(`#imageFour-${ tweet_id }`).src;

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