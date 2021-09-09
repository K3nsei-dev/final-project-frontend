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

      tweets.forEach((tweet) => {
          container.innerHTML += `
          <div class="tweet-container">
          <div class="tweet-user">
          <img src="${ tweet.profile_pic }">
          <div class="info">
          <div>${ tweet.first_name } ${ tweet.last_name }</div>
          <div>@${ tweet.username }</div></div>
          </div>
          <div class="tweet-images"> 
          ${
            tweet.description ? `<p> ${ tweet.description } </p>` : ''
        }
        <div>${
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
        }</div>
        <p> ${ tweet.date } </p>
        </div>
        <div class="comments-date">
        <button onclick="getComments(${ tweet.user_id }, ${ tweet.tweet_id   }), event.preventDefault()"><i class="fas fa-comments"></i></button>
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

  function addPostModalTimeline() {
    // Get the modal
    let modal = document.getElementById("addModalTimeline");

    // Get the button that opens the modal
    let btn = document.getElementById("addBtnTimeline");

    // Get the <span> element that closes the modal
    let span = document.getElementsByClassName("close-timeline")[0];

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

  function addPostTimeline() {
    const postDescription = document.getElementById("userDescriptionTimeline").value;
    let postForm = document.querySelector('#newPostFormTimeline')
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
  
  function addImageTimeline(option) {
    // console.log(1)
    // let option = e.target.id[4]
    const preview = document.querySelector(`.timeline-imgurl${ option }`);
    const file = document.querySelector(`#timeline-image${option}`).files[0];
    console.log(file)
    console.log(preview)
  
    const reader = new FileReader();
  
    // console.log(preview, file)
  
    reader.addEventListener("load", function () {
        preview.src = reader.result;
    }, false);
  
    if (file) {
        reader.readAsDataURL(file);
    }
  }

  function getComments(user_id, tweet_id) {
    fetch('https://bigbirdonline.herokuapp.com/get-comment/'+ `${ localStorage.getItem('id') }` + '/post/' + `${ user_id }` + '/comment/' + `${ tweet_id }`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json()).then(data => {
      console.log(data)
      console.log("Successfull")
    })
  }