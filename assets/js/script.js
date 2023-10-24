document.addEventListener("DOMContentLoaded", function () {
  const submitButton = document.getElementById("btnSearch");
  submitButton.addEventListener("click", function (event) {
    event.preventDefault(); // Mencegah form dari mengirimkan permintaan POST

    // Mengambil nilai yang dimasukkan oleh pengguna
    const searchInput = document
      .getElementById("inputSearch")
      .value.toLowerCase();

    if (searchInput.trim() === "") {
      alert("Input tidak boleh kosong. Silakan masukkan nama negara.");
      return; // Jangan lanjutkan pemrosesan
    }

    // Memanggil fungsi untuk mengambil data COVID-19 berdasarkan input
    fetchDataByCountry(searchInput);
  });

  function clearDataElement() {
    // Clear the data elements
    document.getElementById("active").textContent = "";
    document.getElementById("cases").textContent = "";
    document.getElementById("new").textContent = "";
    document.getElementById("death").textContent = "";
    document.getElementById("recovered").textContent = "";
    document.getElementById("test").textContent = "";
  }

  async function fetchDataByCountry(country) {
    clearDataElement();

    const url = `https://covid-193.p.rapidapi.com/statistics?country=${country}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "de47b83f3amsh29a66ddf621b969p199f19jsn71732fa6bdbf",
        "X-RapidAPI-Host": "covid-193.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      if (data.response && data.response.length > 0) {
        const covidData = data.response[0];
        // Mengambil data yang sesuai dari respons

        // Memperbarui elemen HTML dengan data yang diterima dari API
        document.getElementById("active").textContent =
          covidData.cases.active ?? "-";
        document.getElementById("cases").textContent =
          covidData.cases.total ?? "-";
        document.getElementById("new").textContent = covidData.cases.new ?? "-";
        document.getElementById("death").textContent =
          covidData.deaths.total ?? "-";
        document.getElementById("recovered").textContent =
          covidData.cases.recovered ?? "-";
        document.getElementById("test").textContent =
          covidData.tests.total ?? "-";
      } else {
        // Data tidak ditemukan, tampilkan pesan error
        alert("Negara tidak ditemukan dalam data COVID-19.");
      }
    } catch (error) {
      console.error(error);
    }
  }
});
