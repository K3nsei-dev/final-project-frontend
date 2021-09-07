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
        <div><p> ${ tweet.date } </p><div>
          <button onclick="getComments(), event.preventDefault()"><i class="fas fa-comments"></i></button>
          </div>`
      });
  }

  function getComments() {
      fetch('https://bigbirdonline.herokuapp.com/get-comments/' + "1" + "/post/" + "2" + "/comment/" + "1", {
          method: "GET",
          headers: {
              "Content-Type": "application/json"
          }
      }).then(res => res.json()).then(data => {
          console.log(data)
          console.log("Successfull")
      })
  }