import { daftarLagu } from './app.js';
import { fetchNews } from './api.js'; 

const container = document.querySelector(".galeri");
const pesanKosong = document.querySelector("#pesan-kosong");

const terjemahanAPI = [
  { judul: "Rekomendasi Lagu Populer Minggu Ini", body: "Daftar lagu pilihan dengan aransemen musik yang sedang hits di berbagai platform digital." },
  { judul: "Profil Musisi dan Penyanyi Favorit", body: "Mengenal lebih dekat perjalanan karier dan karya-karya dari musisi papan atas." },
  { judul: "Ulasan Album Musik Terbaru", body: "Bedah album dan lirik lagu mendalam dari musisi indie hingga pop mainstream." },
  { judul: "Konser Musik dan Festival Digital", body: "Informasi jadwal panggung live streaming dan pertunjukan musik interaktif." },
  { judul: "Tips Menikmati Audio Berkualitas Tinggi", body: "Panduan memilih perangkat pemutar musik dan format audio terbaik untuk pengalaman mendengarkan." }
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
    
    const limitedData = apiData.slice(0, 5);

    render(limitedData); 
  } catch (error) {
    container.style.display = "block";
    container.textContent = `Gagal memuat data: ${error.message}`;
  }
}

loadAPIData();

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
