
// document.addEventListener("DOMContentLoaded", function () {
//     let tbody = document.getElementById("tbody");
//     let searchInput = document.getElementById("search");
//     let typeSelect = document.getElementById("storageSearch");
//     let allData; // Variable to store all fetched data
  
//     // Fetch data from the server for Reception
//     fetch("http://localhost:5000/api/reception")
//         .then(res => res.json())
//         .then(json => {
//             allData = json;
//             renderTable(allData);
  
//             // Extract unique "sampleType" values and populate the dropdown
//             const uniqueSampleTypes = [...new Set(allData.map(data => data.sampleType))];
//             populateTypeDropdown(uniqueSampleTypes);
  
//             // Add event listeners for filtering
//             searchInput.addEventListener("input", filterData);
//             typeSelect.addEventListener("change", filterData);
//         });
  
//     // Function to render the initial table
//     function renderTable(data) {
//         tbody.innerHTML = "";
//         data.forEach(dataItem => {
//             tbody.appendChild(createTableRow(dataItem));
//         });
//     }
  
//     // Function to create a table row (tr) for Reception
//     function createTableRow(receptions) {
//         let tr = document.createElement('tr');
//         tr.innerHTML = `
//       <td class="px-6 py-4 whitespace-nowrap">
//       <div class="flex items-center">
//       <div class="flex-shrink-0 h-10 w-10">
//                     <img src="images/lab.jpg" class="h-8 w-8 rounded-full" alt="">
//                 </div>
//               <div class="ml-4">
//                   <div class="text-sm font-medium text-gray-900">
//                       ${receptions.studyName}
//                   </div>
//                   <div class="text-sm text-gray-500">
//                       ${receptions.subject}
//                   </div>
//               </div>
//           </div>
//   </td>
//   <td class="px-6 py-4 whitespace-nowrap">
//       <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
//          ${receptions.sampleType}
//       </span>
//   </td>
//   <td class="px-6 py-4 whitespace-nowrap">
//       <span class="text-sm text-gray-500">${receptions.visitName}</span>
//   </td>
//   <td class="px-6 py-4 whitespace-nowrap">
//       <span class="text-sm text-gray-500">${receptions.visitDate}</span>
//   </td>
//   <td class="px-6 py-4 whitespace-nowrap">
//       <span class="text-sm text-gray-500">${receptions.ageAtVisit}</span>
//   </td>
//   <td class="px-6 py-4 whitespace-nowrap">
//       <span class="text-sm text-gray-500">${receptions.dateSampleCollection}</span>
//   </td>
//    <td class="px-6 py-4 whitespace-nowrap">
//        <span class="text-sm text-gray-500">${receptions.timeOfSampleCollection}</span>
//    </td>
//    <td class="px-6 py-4 whitespace-nowrap">
//        <span class="text-sm text-gray-500">${receptions.dateOfSampleReceipt}</span>
//    </td>
//    <td class="px-6 py-4 whitespace-nowrap">
//        <span class="text-sm text-gray-500">${receptions.timeOfSampleReceipt}</span>
//    </td>
//    <td class="px-6 py-4 whitespace-nowrap">
//        <span class="text-sm text-gray-500">${receptions.comments}</span>
//    </td>

//    <td class="px-6 py-4 whitespace-nowrap">
//    <div class="ml-4">
//    <div class="text-sm font-medium text-gray-900">
//        ${receptions.entryDoneBy}
//    </div>
//    <div class="text-sm text-gray-500">
//        ${receptions.dateOfEntry}
//    </div>
//  </div>  
//    </td>

//    <!-- Add other td elements here based on your needs -->
//    <td class="px-6 py-4 whitespace-nowrap">
//        <button class="btn btn-link" onclick="updateStorage('${type}')" title="Update">
//            <i class="fas fa-edit"></i>
//       </button>
//       <button class="btn btn-link text-danger" onclick="deleteStorage('${type}')" title="Delete">
//           <i class="fas fa-trash-alt"></i>
//       </button>
//   </td>
//       `;
//         return tr;
//     }
  
//     // Function to populate the Type dropdown
//   function populateTypeDropdown(sampleTypes) {
//     // Clear existing options
//     typeSelect.innerHTML = "";

//     // Add "All" option
//     const allOption = document.createElement("option");
//     allOption.value = "";
//     allOption.textContent = "All";
//     typeSelect.appendChild(allOption);

//     // Add other options
//     sampleTypes.forEach(sampleType => {
//         const option = document.createElement("option");
//         option.value = sampleType;
//         option.textContent = sampleType;
//         typeSelect.appendChild(option);
//     });
// }

// // Function to filter data based on user input
// function filterData() {
//     const searchTerm = searchInput.value.toLowerCase();
//     const selectedType = typeSelect.value.toLowerCase();

//     const filteredData = allData.filter(receptions => (
//         (selectedType === "" || receptions.sampleType.toLowerCase() === selectedType) &&
//         (receptions.studyName.toLowerCase().includes(searchTerm) ||
//         receptions.visitName.toLowerCase().includes(searchTerm))
//     ));

//     renderTable(filteredData);
// }
// });