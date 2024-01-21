// your-script.js

document.addEventListener('DOMContentLoaded', function() {
    fetchDataAndDisplay();
});

async function fetchDataAndDisplay() {
    try {
        // Fetch data from your API or server
        const response = await fetch('http://localhost:5000/api/storages');
        const data = await response.json();

        // Display data in the HTML container
        displayData(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayData(data) {
    const dataContainer = document.getElementById('data-container');

    // Create HTML elements to display the data
    const dataHtml = `
        <h2>${data.studyName}</h2>
        <p><strong>Type:</strong> ${data.type}</p>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <p><strong>Visit Name:</strong> ${data.visitName}</p>
        <p><strong>Visit Date:</strong> ${new Date(data.visitDate).toLocaleDateString()}</p>
        <p><strong>Age at Visit:</strong> ${data.ageAtVisit}</p>
        <p><strong>Date of Sample Collection:</strong> ${new Date(data.dateSampleCollection).toLocaleDateString()}</p>
        <p><strong>Time of Sample Collection:</strong> ${data.timeOfSampleCollection}</p>
        <p><strong>Date of Sample Receipt:</strong> ${new Date(data.dateOfSampleReceipt).toLocaleDateString()}</p>
        <p><strong>Time of Sample Receipt:</strong> ${data.timeOfSampleReceipt}</p>
        <p><strong>Comments:</strong> ${data.comments}</p>
        <p><strong>Date of Entry:</strong> ${new Date(data.dateOfEntry).toLocaleDateString()}</p>
        <p><strong>Entry Done By:</strong> ${data.entryDoneBy}</p>
    `;

    // Insert HTML into the container
    dataContainer.innerHTML = dataHtml;
}
