let map = L.map("map").setView([28.6139, 77.209], 5); // Default Delhi

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

let marker = L.marker([28.6139, 77.209]).addTo(map);

async function searchCity() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) return;

  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${city}`
  );
  const data = await res.json();

  if (data && data.length > 0) {
    const lat = parseFloat(data[0].lat);
    const lon = parseFloat(data[0].lon);

    map.flyTo([lat, lon], 10, { duration: 2 });
    marker.setLatLng([lat, lon]);
    marker.bindPopup(`📍 ${data[0].display_name}`).openPopup();
  } else {
    alert("City not found 😢");
  }
}
