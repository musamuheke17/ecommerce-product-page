// ===== USER STORAGE =====
let users = JSON.parse(localStorage.getItem('users')) || [];


// ===== SIGN UP =====
function handleSignUp(e) {
  e.preventDefault();

  const inputs = document.querySelectorAll('#sign-up-tab input');
  const email = inputs[0].value.trim();
  const password = inputs[1].value;
  const confirm = inputs[2].value;

  if (password !== confirm) {
    return alert('Passwords do not match');
  }

  const exists = users.find(u => u.email === email);
  if (exists) {
    return alert('User already exists');
  }

  users.push({ email, password });
  localStorage.setItem('users', JSON.stringify(users));

  alert('Account created successfully!');
  switchTab('sign-in');
}


// ===== SIGN IN =====
function handleSignIn(e) {
  e.preventDefault();

  const email = document.querySelector('#sign-in-tab input[type="email"]').value.trim();
  const password = document.querySelector('#sign-in-tab input[type="password"]').value;

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return alert('Invalid email or password');
  }

  localStorage.setItem('currentUser', email);
  alert('Welcome back ' + email);

  toggleAuthModal();
}


// ===== EVENT LISTENERS =====
document.querySelector('#sign-in-form')?.addEventListener('submit', handleSignIn);
document.querySelector('#sign-up-form')?.addEventListener('submit', handleSignUp);


// ===== CLOSE MODAL WHEN CLICKING OUTSIDE =====
document.querySelector('#auth-modal')?.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay')) {
    toggleAuthModal();
  }
});


// ===== MENU TOGGLE =====
function toggleMenu() {
  document.querySelector('.nav-menu')?.classList.toggle('open');
}


// ===== CHECK LOGIN STATUS =====
const currentUser = localStorage.getItem('currentUser');

if (currentUser) {
  console.log('Logged in as:', currentUser);

  // OPTIONAL: change UI
  const btn = document.querySelector('.auth-btn');
  if (btn) {
    btn.textContent = currentUser;
  }
}
