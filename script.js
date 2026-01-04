const market = document.getElementById("market");
const search = document.getElementById("search");

/* ================= AUTH ================= */
const loginModal = document.getElementById("loginModal");
const loginBtn = document.getElementById("loginBtn");
const userBox = document.getElementById("userBox");
const userNameSpan = document.getElementById("userName");
const sellModal = document.getElementById("sellModal");

let currentUser = null;

function openLogin() { loginModal.style.display = "flex"; }
function closeLogin() { loginModal.style.display = "none"; }

function login() {
  currentUser = loginName.value || "Student";
  userNameSpan.innerText = currentUser;
  loginBtn.classList.add("hidden");
  userBox.classList.remove("hidden");
  closeLogin();
}

function logout() {
  currentUser = null;
  userBox.classList.add("hidden");
  loginBtn.classList.remove("hidden");
}

function openSell() {
  if (!currentUser) {
    openLogin();
    return;
  }
  sellModal.style.display = "flex";
}

function closeSell() {
  sellModal.style.display = "none";
}

/* ================= ITEMS (10 EACH) ================= */
const items = [

/* -------- BOOKS -------- */
{cat:"books",name:"Engineering Mathematics",price:450,tag:"Book",info:"B.S. Grewal",img:"engineering mathematics book"},
{cat:"books",name:"Advanced Engineering Mathematics",price:500,tag:"Book",info:"Erwin Kreyszig",img:"advanced engineering mathematics book"},
{cat:"books",name:"Engineering Physics",price:400,tag:"Book",info:"Avadhanulu",img:"engineering physics book"},
{cat:"books",name:"Engineering Chemistry",price:350,tag:"Book",info:"Jain & Jain",img:"engineering chemistry book"},
{cat:"books",name:"Engineering Mechanics",price:380,tag:"Book",info:"Timoshenko",img:"engineering mechanics book"},
{cat:"books",name:"Engineering Drawing",price:500,tag:"Book",info:"N.D. Bhatt",img:"engineering drawing book"},
{cat:"books",name:"Let Us C",price:300,tag:"Book",info:"Y. Kanetkar",img:"c programming book"},
{cat:"books",name:"Data Structures",price:480,tag:"Book",info:"Reema Thareja",img:"data structures book"},
{cat:"books",name:"Operating Systems",price:520,tag:"Book",info:"Silberschatz",img:"operating systems book"},
{cat:"books",name:"Digital Electronics",price:420,tag:"Book",info:"Morris Mano",img:"digital electronics book"},

/* -------- ELECTRONICS -------- */
{cat:"electronics",name:"Laptop",price:38000,tag:"Used",info:"Online classes",img:"student laptop"},
{cat:"electronics",name:"Smartphone",price:12000,tag:"Used",info:"Communication",img:"smartphone"},
{cat:"electronics",name:"Bluetooth Earbuds",price:2200,tag:"Used",info:"Lectures",img:"bluetooth earbuds"},
{cat:"electronics",name:"Noise Cancelling Headphones",price:4500,tag:"Like New",info:"Focus",img:"noise cancelling headphones"},
{cat:"electronics",name:"Power Bank",price:1200,tag:"Used",info:"Charging",img:"power bank"},
{cat:"electronics",name:"Smartwatch",price:3500,tag:"Used",info:"Fitness",img:"smartwatch"},
{cat:"electronics",name:"Tablet",price:9500,tag:"Like New",info:"Notes",img:"tablet device"},
{cat:"electronics",name:"External SSD",price:2600,tag:"Used",info:"Backup",img:"external ssd"},
{cat:"electronics",name:"Desk Lamp",price:1500,tag:"Used",info:"Study light",img:"study desk lamp"},
{cat:"electronics",name:"Scientific Calculator",price:900,tag:"Used",info:"Exams",img:"scientific calculator"},

/* -------- SPORTS -------- */
{cat:"sports",name:"Cricket Bat",price:1800,tag:"Used",info:"Practice",img:"cricket bat"},
{cat:"sports",name:"Football",price:600,tag:"Used",info:"Ground play",img:"football"},
{cat:"sports",name:"Badminton Racket",price:900,tag:"Like New",info:"Indoor",img:"badminton racket"},
{cat:"sports",name:"Skipping Rope",price:250,tag:"Used",info:"Cardio",img:"skipping rope"},
{cat:"sports",name:"Gym Gloves",price:400,tag:"Used",info:"Workout",img:"gym gloves"},
{cat:"sports",name:"Yoga Mat",price:700,tag:"Used",info:"Yoga",img:"yoga mat"},
{cat:"sports",name:"Volleyball",price:500,tag:"Used",info:"Court play",img:"volleyball"},
{cat:"sports",name:"Basketball",price:650,tag:"Used",info:"Practice",img:"basketball"},
{cat:"sports",name:"Tennis Racket",price:1100,tag:"Used",info:"Outdoor",img:"tennis racket"},
{cat:"sports",name:"Sports Shoes",price:1800,tag:"Used",info:"Running",img:"sports shoes"},

/* -------- ESSENTIALS -------- */
{cat:"essentials",name:"Backpack",price:1200,tag:"Used",info:"Books & laptop",img:"college backpack"},
{cat:"essentials",name:"Water Bottle",price:300,tag:"Used",info:"Hydration",img:"water bottle"},
{cat:"essentials",name:"Lunch Box",price:350,tag:"Used",info:"Meals",img:"lunch box"},
{cat:"essentials",name:"Umbrella",price:400,tag:"Used",info:"Rain",img:"umbrella"},
{cat:"essentials",name:"Bedsheet Set",price:700,tag:"Used",info:"Hostel",img:"bedsheet pillow"},
{cat:"essentials",name:"Trolley Bag",price:2500,tag:"Used",info:"Travel",img:"trolley bag"},
{cat:"essentials",name:"Extension Box",price:450,tag:"Used",info:"Sockets",img:"extension box"},
{cat:"essentials",name:"Room Heater",price:1800,tag:"Used",info:"Winter",img:"room heater"},
{cat:"essentials",name:"Curtains",price:600,tag:"Used",info:"Room decor",img:"curtains"},
{cat:"essentials",name:"Table Fan",price:1200,tag:"Used",info:"Cooling",img:"table fan"},

/* -------- OTHERS -------- */
{cat:"others",name:"Study Table",price:2200,tag:"Used",info:"Hostel furniture",img:"study table"},
{cat:"others",name:"Chair",price:900,tag:"Used",info:"Seating",img:"study chair"},
{cat:"others",name:"Wall Clock",price:350,tag:"Used",info:"Time",img:"wall clock"},
{cat:"others",name:"Whiteboard",price:800,tag:"Like New",info:"Planning",img:"whiteboard"},
{cat:"others",name:"Mirror",price:400,tag:"Used",info:"Room use",img:"mirror"},
{cat:"others",name:"Shoe Rack",price:900,tag:"Used",info:"Storage",img:"shoe rack"},
{cat:"others",name:"Dustbin",price:300,tag:"Used",info:"Waste",img:"dustbin"},
{cat:"others",name:"Hangers Set",price:250,tag:"Used",info:"Clothes",img:"clothes hangers"},
{cat:"others",name:"Lamp Shade",price:500,tag:"Used",info:"Lighting",img:"lamp shade"},
{cat:"others",name:"Notice Board",price:700,tag:"Used",info:"Notes",img:"notice board"}
];

/* ================= RENDER ================= */
function render() {
  market.innerHTML = "";
  items.forEach(i => {
    market.innerHTML += `
      <div class="item" data-category="${i.cat}">
        <img src="https://source.unsplash.com/400x300/?${encodeURIComponent(i.img)}">
        <h3>${i.name}</h3>
        <p class="price">₹${i.price}</p>
        <span class="tag ${i.tag === "Book" ? "blue" : "pink"}">${i.tag}</span>
        <p>${i.info}</p>
        <p>Seller: ${i.seller || "Campus Student"}</p>
      </div>
    `;
  });
}
render();

/* ================= SEARCH ================= */
search.addEventListener("keyup", () => {
  const v = search.value.toLowerCase();
  document.querySelectorAll(".item").forEach(i => {
    i.style.display = i.innerText.toLowerCase().includes(v) ? "block" : "none";
  });
});

/* ================= FILTER ================= */
function filterItems(cat) {
  document.querySelectorAll(".item").forEach(i => {
    i.style.display = cat === "all" || i.dataset.category === cat ? "block" : "none";
  });
}

/* ================= SORT ================= */
function sortPrice(asc) {
  items.sort((a,b) => asc ? a.price - b.price : b.price - a.price);
  render();
}

/* ================= SELL ITEM ================= */
function sellItem() {
  items.unshift({
    cat: sellCategory.value,
    name: sellName.value,
    price: Number(sellPrice.value),
    tag: sellCategory.value === "books" ? "Book" : sellCondition.value,
    info: sellInfo.value || "User listed item",
    img: sellImage.value || sellCategory.value,
    seller: currentUser
  });
  closeSell();
  render();
}

/* ================= THEME TOGGLE ================= */
const themeBtn = document.getElementById("themeToggle");
if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light");
  themeBtn.innerText = "☀️";
}
function toggleTheme() {
  document.body.classList.toggle("light");
  const isLight = document.body.classList.contains("light");
  themeBtn.innerText = isLight ? "☀️" : "🌙";
  localStorage.setItem("theme", isLight ? "light" : "dark");
}
