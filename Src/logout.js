let button = document.getElementById('logout');

button.addEventListener("click", function() {
    alert('You have logged out!')
    localStorage.clear();
    window.location.href = '/login.html'
}, true)