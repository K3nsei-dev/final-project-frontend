let button = document.getElementById('logout');

button.addEventListener("click", function() {
    alert('You have logged out!')
    localStorage.removeItem('id');
    window.location.href = './home.html'
}, true)