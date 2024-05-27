async function fetchData() {
    const keyword = document.getElementById('search').value.toLowerCase();
    const url = `https://api.kampusmerdeka.kemdikbud.go.id/magang/browse/opportunities?opportunity_type=&keyword=&location_key=&mitra_key=&sector_id=&activity_type=&limit=9000`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const filteredResults = data.data.filter(item => 
            item.name.toLowerCase().includes(keyword) || item.mitra_name.toLowerCase().includes(keyword)
        );
        displayResults(filteredResults);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayResults(results) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    if (results.length === 0) {
        resultsContainer.innerHTML = '<p>No results found.</p>';
        return;
    }

    results.forEach(item => {
        const div = document.createElement('div');
        div.className = 'result-item';
        const linkUrl = `https://kampusmerdeka.kemdikbud.go.id/program/magang/browse/${item.mitra_id}/${item.id}`;
        div.innerHTML = `
            <h3><a href="${linkUrl}" target="_blank">${item.name || 'N/A'}</a></h3>
            <p><strong>Mitra:</strong> ${item.mitra_name || 'N/A'}</p>
            <p><strong>Lokasi:</strong> ${item.location || 'N/A'}</p>
            <p><strong>Durasi (bulan):</strong> ${item.months_duration || 'N/A'}</p>
            <p><strong>Jenis Aktivitas:</strong> ${item.activity_type || 'N/A'}</p>
        `;
        resultsContainer.appendChild(div);
    });
}