let ads = JSON.parse(localStorage.getItem("ads")) || [
  /* ---------------- MOBILES ---------------- */
  {
    id: 1,
    title: "iPhone 13",
    category: "Mobile",
    price: "45,000",
    images: ["https://via.placeholder.com/400x300?text=iPhone+13"]
  },
  {
    id: 2,
    title: "Samsung Galaxy S21",
    category: "Mobile",
    price: "38,000",
    images: ["https://via.placeholder.com/400x300?text=Samsung+S21"]
  },
  {
    id: 3,
    title: "OnePlus 9",
    category: "Mobile",
    price: "32,000",
    images: ["https://via.placeholder.com/400x300?text=OnePlus+9"]
  },

  /* ---------------- LAPTOPS ---------------- */
  {
    id: 4,
    title: "MacBook Air M1",
    category: "Laptop",
    price: "75,000",
    images: ["https://via.placeholder.com/400x300?text=MacBook+Air"]
  },
  {
    id: 5,
    title: "Dell XPS 13",
    category: "Laptop",
    price: "68,000",
    images: ["https://via.placeholder.com/400x300?text=Dell+XPS"]
  },
  {
    id: 6,
    title: "HP Pavilion",
    category: "Laptop",
    price: "55,000",
    images: ["https://via.placeholder.com/400x300?text=HP+Pavilion"]
  },

  /* ---------------- BIKES ---------------- */
  {
    id: 7,
    title: "Yamaha R15",
    category: "Bike",
    price: "1,45,000",
    images: ["https://via.placeholder.com/400x300?text=Yamaha+R15"]
  },
  {
    id: 8,
    title: "Royal Enfield Classic 350",
    category: "Bike",
    price: "1,80,000",
    images: ["https://via.placeholder.com/400x300?text=RE+Classic"]
  },
  {
    id: 9,
    title: "KTM Duke 200",
    category: "Bike",
    price: "1,60,000",
    images: ["https://via.placeholder.com/400x300?text=KTM+Duke"]
  },

  /* ---------------- BOOKS ---------------- */
  {
    id: 10,
    title: "Atomic Habits",
    category: "Book",
    price: "350",
    images: ["https://via.placeholder.com/400x300?text=Atomic+Habits"]
  },
  {
    id: 11,
    title: "Rich Dad Poor Dad",
    category: "Book",
    price: "299",
    images: ["https://via.placeholder.com/400x300?text=Rich+Dad"]
  },
  {
    id: 12,
    title: "Think Like a Monk",
    category: "Book",
    price: "399",
    images: ["https://via.placeholder.com/400x300?text=Think+Like+a+Monk"]
  }
];

localStorage.setItem("ads", JSON.stringify(ads));

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
let currentCategory = "All";
let currentUser = localStorage.getItem("user") || null;


/* THEME */
function toggleTheme() {
  document.body.classList.toggle("dark");

  const btn = document.getElementById("themeToggle");
  const isDark = document.body.classList.contains("dark");

  btn.textContent = isDark ? "🌙" : "☀";
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

/* LOAD SAVED THEME */
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark");
  document.getElementById("themeToggle").textContent = "🌙";
}


/* CATEGORY */
function setCategory(cat) {
  currentCategory = cat;

  document.querySelectorAll(".categories button")
    .forEach(btn => btn.classList.remove("active"));

  event.target.classList.add("active");

  loadAds();
}


/* ADS */
function loadAds() {
  let search = searchBox.value.toLowerCase();
  adList.innerHTML = "";

  ads
    .filter(ad =>
      (currentCategory === "All" || ad.category === currentCategory) &&
      ad.title.toLowerCase().includes(search)
    )
    .forEach(ad => {
      let liked = wishlist.includes(ad.id);

      adList.innerHTML += `
        <div class="card">
          <div class="heart ${liked ? "active" : ""}" onclick="toggleWish(${ad.id})">❤</div>
          <img src="${ad.images[0]}">
          <div class="card-content">
            <div class="price">₹ ${ad.price}</div>
            <div class="title">${ad.title}</div>
            <div class="meta">India · Today</div>
          </div>
        </div>
      `;
    });
}


/* WISHLIST */
function toggleWish(id) {
  wishlist.includes(id)
    ? wishlist = wishlist.filter(i => i !== id)
    : wishlist.push(id);

  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  loadAds();
}

loadAds();

/* ---------------- LOGIN ---------------- */
function openLogin() {
  document.getElementById("loginModal").style.display = "flex";
}

function loginUser() {
  const name = document.getElementById("usernameInput").value;
  if (!name) return alert("Enter username");

  currentUser = name;
  localStorage.setItem("user", name);

  document.getElementById("loginModal").style.display = "none";
  updateUserUI();
}

function updateUserUI() {
  const loginBtn = document.getElementById("loginBtn");
  if (currentUser) {
    loginBtn.textContent = currentUser;
    loginBtn.onclick = logoutUser;
  }
}

function logoutUser() {
  localStorage.removeItem("user");
  currentUser = null;
  location.reload();
}

/* ---------------- SELL ---------------- */
function openSell() {
  if (!currentUser) {
    alert("Please login to post an ad");
    return;
  }
  document.getElementById("sellModal").style.display = "flex";
}

function postAd() {
  const file = document.getElementById("adImage").files[0];
  if (!file) return alert("Upload image");

  const reader = new FileReader();
  reader.onload = () => {
    ads.push({
      id: Date.now(),
      title: adTitle.value,
      price: adPrice.value,
      category: adCategory.value,
      images: [reader.result]
    });

    localStorage.setItem("ads", JSON.stringify(ads));
    document.getElementById("sellModal").style.display = "none";
    loadAds();
  };
  reader.readAsDataURL(file);
}

/* INIT */
updateUserUI();

window.onclick = e => {
  if (e.target.classList.contains("modal")) {
    e.target.style.display = "none";
  }
};
