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

const imageMap = {
  /* BOOKS */
  "Engineering Mathematics": "https://images.unsplash.com/photo-1581092334651-ddf26d9c1d38",
  "Advanced Engineering Mathematics": "https://images.unsplash.com/photo-1512820790803-83ca734da794",
  "Engineering Physics": "https://images.unsplash.com/photo-1532012197267-da84d127e765",
  "Engineering Chemistry": "https://images.unsplash.com/photo-1601972599720-b0c42a4c4fba",
  "Engineering Mechanics": "https://images.unsplash.com/photo-1507842217343-583bb7270b66",
  "Engineering Drawing": "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
  "Let Us C": "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
  "Data Structures": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
  "Operating Systems": "https://images.unsplash.com/photo-1518770660439-4636190af475",
  "Digital Electronics": "https://images.unsplash.com/photo-1581093588401-22c8f1a63f91",

  /* ELECTRONICS */
  "Laptop": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
  "Smartphone": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
  "Bluetooth Earbuds": "https://images.unsplash.com/photo-1590658268037-6bf12165a8df",
  "Noise Cancelling Headphones": "https://images.unsplash.com/photo-1583394838336-acd977736f90",
  "Power Bank": "https://images.unsplash.com/photo-1585386959984-a41552231692",
  "Smartwatch": "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b",
  "Tablet": "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04",
  "External SSD": "https://images.unsplash.com/photo-1587202372775-e229f172b9d1",
  "Desk Lamp": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c",
  "Scientific Calculator": "https://images.unsplash.com/photo-1581091012184-5c8ecdf9d1cf",

  /* SPORTS */
  "Cricket Bat": "https://images.unsplash.com/photo-1593766827228-8737b4534aa6",
  "Football": "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d",
  "Badminton Racket": "https://images.unsplash.com/photo-1602526216033-8f12a4a5cb9b",
  "Skipping Rope": "https://images.unsplash.com/photo-1599058917212-d750089bc07b",
  "Gym Gloves": "https://images.unsplash.com/photo-1605296867304-46d5465a13f1",
  "Yoga Mat": "https://images.unsplash.com/photo-1600880292203-757bb62b4baf",

  /* ESSENTIALS */
  "Backpack": "https://images.unsplash.com/photo-1509762774605-f07235a08f1f",
  "Water Bottle": "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
  "Lunch Box": "https://images.unsplash.com/photo-1589302168068-964664d93dc0",
  "Umbrella": "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a",
  "Study Table": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7",
  "Chair": "https://images.unsplash.com/photo-1582582429416-8b5eeb8df98d"
};


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

    const imgSrc = imageMap[i.name] || "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f";

    market.innerHTML += `
      <div class="item" data-category="${i.cat}">
        <img src="${imgSrc}">
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
