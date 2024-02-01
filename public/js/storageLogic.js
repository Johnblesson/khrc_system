function submitForms() {
    // Get form data
    var storageFormData = new FormData(document.getElementById("storageForm"));
    var receptionFormData = new FormData(document.getElementById("receptionForm"));

    // Combine form data
    var combinedFormData = new FormData();
    for (var pair of storageFormData.entries()) {
        combinedFormData.append(pair[0], pair[1]);
    }
    for (var pair of receptionFormData.entries()) {
        combinedFormData.append(pair[0], pair[1]);
    }

    // Send combined form data to the server using fetch API
    fetch('http://localhost:3000/storage', {
        method: 'POST',
        body: combinedFormData
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response from the server if needed
        console.log(data);
    })
    .catch(error => {
        // Handle errors
        console.error('Error:', error);
    });
}