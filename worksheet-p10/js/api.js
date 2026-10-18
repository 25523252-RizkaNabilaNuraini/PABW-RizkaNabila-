const URL = 'https://jsonplaceholder.typicode.com/posts';

export async function fetchNews() {
  try {
    const response = await fetch(URL);
    if (!response.ok) throw new Error('status ' + response.status);
    const data = await response.json();
    console.log("Data Asli (Object & Array):", data);
    const titlesOnly = data.map(item => item.title);
    console.log("Hasil Mapping Judul:", titlesOnly);
    return data;
  } catch (error) {
    console.error('failed to load', error.message);
    throw error;
  }
}

window.fetchNews = fetchNews;