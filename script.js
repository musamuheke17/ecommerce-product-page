/**
 * NovaCartel - First Prompt Core + Improvements
 * Dynamic array, mega-menu, config, Observer, responsive
 */

const products = [
  {
    id: 'kayoola-sv',
    name: 'Kayoola SV',
    brand: 'Kira Motors',
    price: '$450,000',
    image: 'https://kiiramotors.com/wp-content/uploads/2023/07/Kayoola-Solar-Bus-2-scaled.jpg',
    specs: 'Electric Bus | 70 passengers | 250km range',
    colors: ['#fff', '#000', '#c0c0c0']
  },
  {
    id: 'tesla-s',
    name: 'Model S Plaid',
    brand: 'Tesla',
    price: '$94,990',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    specs: '1020 hp | 1.99s 0-60 | 396 mi range',
    colors: ['#fff', '#000', '#e31a2d']
  },
  {
    id: 'mercedes-gle',
    name: 'GLE 63 S',
    brand: 'Mercedes-Benz',
    price: '$135,000',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    specs: 'V8 Biturbo | 603 hp | Luxury SUV',
    colors: ['#000', '#fff', '#ff6b35']
  },
  {
    id: 'toyota-lc',
    name: 'Land Cruiser',
    brand: 'Toyota',
    price: '$85,000',
    image: 'https://images.unsplash.com/photo-1606216794075-b5bd09dbc6aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    specs: 'V8 | Full-time 4WD | Offroad Legend',
    colors: ['#fff', '#2c3e50']
  },
  {
    id: 'ford-mustang',
    name: 'Mustang GT',
    brand: 'Ford',
    price: '$42,000',
    image: 'https://images.unsplash.com/photo-1552517034-6533479cbfe8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    specs: '5.0L V8 | 480 hp | Sports Car',
    colors: ['#ff0000', '#000', '#fff']
  },
  {
    id: 'nova-solar',
    name: 'Solar Pro Kit',
    brand: 'NovaEnergy',
    price: '$12,500',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    specs: 'Roof Solar | 10kW | Sustainable',
    colors: ['#4a90e2']
  },
  {
    id: 'nova-hoodie',
    name: 'Elite Hoodie',
    brand: 'NovaWear',
    price: '$250',
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    specs: 'Streetwear | Premium Cotton',
    colors: ['#000', '#d4af37']
  }
];

let currentProduct = products[0];

document.addEventListener('DOMContentLoaded', () => {
  initPage();
  setupScrollObserver();
  setupNavScroll();
});

function initPage() {
  renderHero();
  renderConfigurator();
  renderProducts();
}

function renderHero() {
  const img = document.getElementById('hero-image');
  img.src = currentProduct.image;
  img.alt = currentProduct.name;
  document.getElementById('config-title').textContent = currentProduct.name;
  document.querySelector('.tagline').textContent = currentProduct.specs;
}

function renderConfigurator() {
  const colors = document.getElementById('color-options');
  colors.innerHTML = currentProduct.colors.map((color, i) => 
    `<button class="color-dot" style="background-color: ${color}" data-index="${i}" ${i===0 ? 'class="active"' : ''}></button>`
  ).join('');

  // Event listeners
  colors.querySelectorAll('.color-dot').forEach((btn, i) => {
    btn.addEventListener('click', () => {
      document.querySelector('.color-dot.active')?.classList.remove('active');
      btn.classList.add('active');
      document.getElementById('hero-image').style.filter = `hue-rotate(${i * 30}deg) saturate(1.1)`;
    });
  });
  
  // Add wheel section if data available
  const wheels = document.getElementById('wheel-options');
  wheels.innerHTML = '<button class="wheel-dot active">Standard</button><button class="wheel-dot">Sport</button>';
}


function renderProducts() {
  const container = document.getElementById('content-sections');
  container.innerHTML = products.map(product => `
    <section class="product-section">
      <div class="product-card" data-product="${product.id}">
        <img src="${product.image}" alt="${product.name}" class="product-img">
        <div class="product-info">
          <h3>${product.name}</h3>
          <p class="source-brand">${product.brand}</p>
          <p class="specs">${product.specs}</p>
          <p class="price">${product.price}</p>
        </div>
      </div>
    </section>
  `).join('');

  // Product click
  container.addEventListener('click', e => {
    const card = e.target.closest('.product-card');
    if (card) {
      const id = card.dataset.product;
      currentProduct = products.find(p => p.id === id);
      renderHero();
      renderConfigurator();
      // Smooth scroll to top to show hero change
      document.querySelector('.visual-stage').scrollIntoView({ behavior: 'smooth' });
    }
  });

}

function setupScrollObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.product-section').forEach(section => observer.observe(section));
}

function setupNavScroll() {
  window.addEventListener('scroll', () => {
    document.querySelector('.navbar').classList.toggle('solid', window.scrollY > 100);
  });
  
  // Mega-menu hover
  const discover = document.querySelector('.discover');
  discover.addEventListener('mouseenter', () => discover.classList.add('active'));
  discover.addEventListener('mouseleave', () => discover.classList.remove('active'));
}

// Auth System - Local Storage Users
let currentTab = 'sign-in';
let users = JSON.parse(localStorage.getItem('novaUsers')) || [];

function toggleAuthModal() {
  const modal = document.getElementById('auth-modal');
  modal.classList.toggle('active');
}

function switchTab(tab) {
  currentTab = tab;
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
  event.target.classList.add('active');
  document.getElementById(tab + '-tab').classList.add('active');
}

// Password validation
function isValidPassword(password) {
  return password.length >= 6 && 
         /[A-Z]/.test(password) && 
         /[a-z]/.test(password) && 
         /[@#$?]/.test(password);
}

// Sign Up
function handleSignUp() {
  const email = document.querySelector('#sign-up-tab input[type="email"]').value;
  const password = document.querySelector('#sign-up-tab input[placeholder="Password"]').value;
  const confirmPassword = document.querySelector('#sign-up-tab input[placeholder="Confirm Password"]').value;

  if (password !== confirmPassword) {
    alert('Passwords do not match!');
    return;
  }

  if (!isValidPassword(password)) {
    alert('Password must be 6+ chars with uppercase, lowercase, and @#$?');
    return;
  }

  if (users.find(u => u.email === email)) {
    alert('User already exists!');
    return;
  }

  users.push({ email, password });
  localStorage.setItem('novaUsers', JSON.stringify(users));
  localStorage.setItem('currentUser', email);
  alert('Sign up successful! Welcome ' + email);
  toggleAuthModal();
}

// Sign In
function handleSignIn() {
  const email = document.querySelector('#sign-in-tab input[type="email"]').value;
  const password = document.querySelector('#sign-in-tab input[type="password"]').value;

  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    localStorage.setItem('currentUser', email);
    alert('Welcome back, ' + email + '!');
    toggleAuthModal();
  } else {
    alert('User not found or incorrect password!');
  }
}

// Event listeners
document.getElementById('auth-modal').addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay')) toggleAuthModal();
});

// Sign buttons
document.querySelector('#sign-in-tab .cta-button').addEventListener('click', handleSignIn);
document.querySelector('#sign-up-tab .cta-button').addEventListener('click', handleSignUp);

// Mobile hamburger
function toggleMenu() {
  document.querySelector('.nav-menu').classList.toggle('open');
}

// Check login status on load
if (localStorage.getItem('currentUser')) {
  console.log('Logged in as:', localStorage.getItem('currentUser'));
}

