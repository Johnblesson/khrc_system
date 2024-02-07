document.addEventListener('DOMContentLoaded', function () {
  const passwordInput = document.getElementById('password');
  const showPasswordToggle = document.getElementById('showPasswordToggle');

  showPasswordToggle.addEventListener('click', function () {
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      showPasswordToggle.innerHTML = '<i class="fa fa-eye-slash" aria-hidden="true"></i>';
    } else {
      passwordInput.type = 'password';
      showPasswordToggle.innerHTML = '<i class="fa fa-eye" aria-hidden="true"></i>';
    }
  });
});

