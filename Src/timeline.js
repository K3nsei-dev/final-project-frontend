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
      let container = document.querySelector('#timeline');

      container.innerHTML = "";

      let tweetID = tweets.tweetID;

      console.log(tweetID)

      tweets.forEach((tweet) => {
          container.innerHTML += `
          <div class="tweet-container">
          <div class="tweet-user">
          <img src="${ tweet.profile_pic }">
          ${ tweet.first_name } ${ tweet.last_name }
          @${ tweet.username }
          </div>
          <div class="tweet-images"> 
          ${
            tweet.description ? `<p> ${ tweet.description } </p>` : ''
        }
        ${
          tweet.image ? `<img src="${ tweet.image }"class="image">` : ''
        }
        ${
          tweet.image_two ? `<img src="${ tweet.image_two }"class="image">` : ''
        }
        ${
          tweet.image_three ? `<img src="${ tweet.image_three }"class="image">` : ''
        }
        ${
          tweet.image_four ? `<img src="${ tweet.image_four }"class="image">` : ''
        }
        </div>
        <div class="comments-date">
        <button onclick="getComments(), event.preventDefault()"><i class="fas fa-comments"></i></button>
        <p> ${ tweet.date } </p>
        </div>
          </div>`
      });
  }

  // function getComments() {
  //     fetch('https://bigbirdonline.herokuapp.com/get-comments/' + "1" + "/post/" + "2" + "/comment/" + "1", {
  //         method: "GET",
  //         headers: {
  //             "Content-Type": "application/json"
  //         }
  //     }).then(res => res.json()).then(data => {
  //         console.log(data)
  //         console.log("Successfull")
  //     })
  // }