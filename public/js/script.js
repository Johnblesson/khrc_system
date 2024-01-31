document.addEventListener("DOMContentLoaded", function () {
  let tbody = document.getElementById("tbody");
  let searchInput = document.getElementById("search");
  let typeSelect = document.getElementById("storageSearch");
  let allData; // Variable to store all fetched data

  // Fetch data from the server
  // fetch("http://localhost:3000/storage") 
  fetch("http://localhost:5000/api/storages")
      .then(res => res.json())
      .then(json => {
          allData = json;
          renderTable(allData);

          // Extract unique "type" values and populate the dropdown
          const uniqueTypes = [...new Set(allData.map(data => data.type))];
          populateTypeDropdown(uniqueTypes);

          // Add event listeners for filtering
          searchInput.addEventListener("input", filterData);
          typeSelect.addEventListener("change", filterData);
      });

  // Function to render the initial table
  function renderTable(data) {
      tbody.innerHTML = "";
      data.forEach(dataItem => {
          tbody.appendChild(createTableRow(dataItem));
      });
  }

  // Function to create a table row (tr)
  function createTableRow({ type, studyName, subject, visitName, visitDate, ageAtVisit, dateSampleCollection, timeOfSampleCollection, dateOfSampleReceipt, timeOfSampleReceipt, comments, dateOfEntry, entryDoneBy }) {
      let tr = document.createElement('tr');
      tr.innerHTML = `
      <td class="px-6 py-4 whitespace-nowrap">
      <div class="flex items-center">
      <div class="flex-shrink-0 h-10 w-10">
                    <img src="images/lab.jpg" class="h-8 w-8 rounded-full" alt="">
                </div>
              <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900">
                      ${studyName}
                  </div>
                  <div class="text-sm text-gray-500">
                      ${subject}
                  </div>
              </div>
          </div>
  </td>
  <td class="px-6 py-4 whitespace-nowrap">
      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
         ${type}
      </span>
  </td>
  <td class="px-6 py-4 whitespace-nowrap">
      <span class="text-sm text-gray-500">${visitName}</span>
  </td>
  <td class="px-6 py-4 whitespace-nowrap">
      <span class="text-sm text-gray-500">${visitDate}</span>
  </td>
  <td class="px-6 py-4 whitespace-nowrap">
      <span class="text-sm text-gray-500">${ageAtVisit}</span>
  </td>
  <td class="px-6 py-4 whitespace-nowrap">
      <span class="text-sm text-gray-500">${dateSampleCollection}</span>
  </td>
  <td class="px-6 py-4 whitespace-nowrap">
      <span class="text-sm text-gray-500">${timeOfSampleCollection}</span>
  </td>
  <td class="px-6 py-4 whitespace-nowrap">
      <span class="text-sm text-gray-500">${dateOfSampleReceipt}</span>
  </td>
  <td class="px-6 py-4 whitespace-nowrap">
      <span class="text-sm text-gray-500">${timeOfSampleReceipt}</span>
  </td>
  <td class="px-6 py-4 whitespace-nowrap">
      <span class="text-sm text-gray-500">${comments}</span>
  </td>

  <td class="px-6 py-4 whitespace-nowrap">
  <div class="ml-4">
  <div class="text-sm font-medium text-gray-900">
      ${entryDoneBy}
  </div>
  <div class="text-sm text-gray-500">
      ${dateOfEntry}
  </div>
</div>  
  </td>

  <!-- Add other td elements here based on your needs -->
  <td class="px-6 py-4 whitespace-nowrap">
      <button class="btn btn-link" onclick="updateStorage('${type}')" title="Update">
          <i class="fas fa-edit"></i>
      </button>
      <button class="btn btn-link text-danger" onclick="deleteStorage('${type}')" title="Delete">
          <i class="fas fa-trash-alt"></i>
      </button>
  </td>
      `;
      return tr;
  }

  // Function to populate the Type dropdown
  function populateTypeDropdown(types) {
      // Clear existing options
      typeSelect.innerHTML = "";

      // Add "All" option
      const allOption = document.createElement("option");
      allOption.value = "";
      allOption.textContent = "All";
      typeSelect.appendChild(allOption);

      // Add other options
      types.forEach(type => {
          const option = document.createElement("option");
          option.value = type;
          option.textContent = type;
          typeSelect.appendChild(option);
      });
  }

  // Function to filter data based on user input
  function filterData() {
      const searchTerm = searchInput.value.toLowerCase();
      const selectedType = typeSelect.value.toLowerCase();

      const filteredData = allData.filter(data => (
          (selectedType === "" || data.type.toLowerCase() === selectedType) &&
          (data.studyName.toLowerCase().includes(searchTerm) ||
          data.visitName.toLowerCase().includes(searchTerm) ||
          data.visitDate.toLowerCase().includes(searchTerm) ||
          data.ageAtVisit.toLowerCase().includes(searchTerm))
      ));

      renderTable(filteredData);
  }
});

