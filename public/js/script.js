let tbody = document.getElementById("tbody");
let searchInput = document.getElementById("search");
let storageSelect = document.getElementById("storageSearch");

const STORAGE_API = 'http://localhost:5000/api/storages';
fetch(STORAGE_API)
.then(res => res.json())
.then(json => {
    const allData = json;
    renderTable(allData);

    const uniqueLocations = [...new Set(allData.map(data => data.storage))];
    uniqueStorage.sort(); // Sort locations alphabetically

    uniqueStorage.forEach(storage => {
        const option = document.createElement("option");
        option.value = storage;
        option.textContent = storage;
        storageSelect.appendChild(option);
    });

    searchInput.addEventListener("input", filterData);
    locationSelect.addEventListener("change", filterData);

    function filterData() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedLocation = locationSelect.value.toLowerCase();
        let filteredData;

        if (selectedStorage === "") {
            filteredData = allData.filter(data => (
                data.type.toLowerCase().includes(searchTerm) ||
                data.studyName.toLowerCase().includes(searchTerm) ||
                data.subject.toLowerCase().includes(searchTerm) ||
                data.visitDate.toLowerCase().includes(searchTerm) ||
                data.ageAtVisit.toLowerCase().includes(searchTerm) // Add location to input search
            ));
        } else {
            filteredData = allData.filter(data => (
                (data.type.toLowerCase().includes(searchTerm) ||
                data.studyName.toLowerCase().includes(searchTerm) ||
                data.subject.toLowerCase().includes(searchTerm) ||
                data.visitDate.toLowerCase().includes(searchTerm)) &&
                (data.ageAtVisit.toLowerCase() === selectedStorage || selectedStorage === "all")
            ));
        }

        renderTable(filteredData);
    }
});

// Render table rows
// function renderTable(data) {
//   tbody.innerHTML = ""; // Clear existing rows
//   data.forEach(dataItem => {
//       tbody.appendChild(td_fun(dataItem));
//   });
// }
// Render table rows
function renderTable(data) {
  tbody.innerHTML = ""; // Clear existing rows

  if (Array.isArray(data)) {
    data.forEach(dataItem => {
      tbody.appendChild(td_fun(dataItem));
    });
  } else {
    console.error('Data is not an array:', data);
  }
}

// Create table row
function td_fun({ type, studyName, subject, visitName, visitDate, ageAtVisit, dateSampleCollection, timeOfSampleCollection, dateOfSampleReceipt, timeOfSampleReceipt, comments, dateOfEntry, entryDoneBy }) {
  let td = document.createElement("tr");
  td.innerHTML =`
      <td>${type}</td>
      <td>${studyName}</td>
      <td>${subject}</td>
      <td>${visitName}</td>
      <td>${visitDate}</td>
      <td>${ageAtVisit}</td>
      <td>${dateSampleCollection}</td>
      <td>${timeOfSampleCollection}</td>
      <td>${dateOfSampleReceipt}</td>
      <td>${timeOfSampleReceipt}</td>
      <td>${comments}</td>
      <td>${dateOfEntry}</td>
      <td>${entryDoneBy}</td>
      <td>
        <a href="/update-storage/${storage._id}" class="btn btn-primary">Edit</a>
        <a href="/delete-storage/${storage._id}" class="btn btn-danger">Delete</a>
      </td>
    `;
    return td;
}