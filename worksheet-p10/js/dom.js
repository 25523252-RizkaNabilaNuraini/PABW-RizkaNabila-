import { daftarLagu } from './app.js';
import { fetchNews } from './api.js'; 

const container = document.querySelector(".galeri");
const pesanKosong = document.querySelector("#pesan-kosong");

const terjemahanAPI = [
  { judul: "Pengantar Pemrograman Web Modern", body: "Mempelajari dasar-dasar pengembangan antarmuka menggunakan HTML, CSS, dan JavaScript." },
  { judul: "Manajemen Struktur Data dan Array", body: "Memahami cara mengolah data array dan objek secara efektif dalam aplikasi web." },
  { judul: "Integrasi Asynchronous API", body: "Mengambil data eksternal secara asinkron menggunakan fetch, promise, async, dan await." },
  { judul: "Pemisahan Layer Data dan Tampilan", body: "Menerapkan prinsip modular dengan memisahkan fungsi logika API dan perenderan DOM." },
  { judul: "Penanganan Status Antarmuka Web", body: "Mengelola status loading, success, failure, dan empty state dengan baik pada halaman." }
];

function buildCard(item, index) {
  const article = document.createElement("article");
  article.className = "kartu";

  const h3 = document.createElement("h3");
  h3.textContent = (item.userId && terjemahanAPI[index]) 
    ? terjemahanAPI[index].judul 
    : (item.judul || item.title); 

  const p = document.createElement("p");
  p.textContent = (item.userId && terjemahanAPI[index])
    ? terjemahanAPI[index].body
    : (item.penyanyi ? `Penyanyi: ${item.penyanyi}` : (item.body || ''));

  const footerDiv = document.createElement("div");
  footerDiv.className = "kartu__kaki";

  const span = document.createElement("span");
  span.textContent = item.rating ? `Rating: ${item.rating}` : `ID: ${item.id || (index + 1)}`;

  const button = document.createElement("button");
  button.type = "button";
  button.textContent = "Putar";

  footerDiv.append(span, button);
  article.append(h3, p, footerDiv);

  return article;
}

function render(list) {
  container.textContent = "";

  if (!list || list.length === 0) {
    if (pesanKosong) {
      pesanKosong.hidden = false;
    }
    container.style.display = "none";
    return;
  }

  if (pesanKosong) {
    pesanKosong.hidden = true;
  }
  container.style.display = "grid";

  list.forEach((item, index) => {
    container.append(buildCard(item, index));
  });
}

async function loadAPIData() {
  try {
    container.style.display = "block";
    container.textContent = "Memuat data dari API...";

    const apiData = await fetchNews();
    
    // Batasi data API hanya 5 item saja
    const limitedData = apiData.slice(0, 5);
    
    render(limitedData); 
  } catch (error) {
    container.style.display = "block";
    container.textContent = `Gagal memuat data: ${error.message}`;
  }
}

// Memuat data API saat halaman pertama kali dibuka
loadAPIData();

// Logika filter kategori lagu Anda tetap aman dan tidak berubah
const filterRow = document.querySelector("#filter");

if (filterRow) {
  filterRow.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;

    filterRow.querySelectorAll("button").forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    const category = button.dataset.category;

    if (category === "semua") {
      loadAPIData(); 
    } else {
      const filtered = daftarLagu.filter((lagu) => lagu.kategori === category);
      render(filtered);
    }
  });
}
