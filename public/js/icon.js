document.addEventListener('DOMContentLoaded', () => {
    const userIcon = document.getElementById('userIcon');
    const userDropdown = document.getElementById('userDropdown');

    // Example: Fetch user information from the server (replace with your actual implementation)
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users'); // Replace with your actual API endpoint
        const usersData = await response.json();
        return usersData;
      } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
      }
    };

    // Update the dropdown content when the user clicks the icon
    userIcon.addEventListener('click', async () => {
      // Fetch user data
      const usersData = await fetchUserData();

      if (usersData && usersData.length > 0) {
        // Assume you want to show details for the first user in the array
        const firstUser = usersData[0];

        // Update dropdown content
        userDropdown.innerHTML = `
          <p><strong>Username:</strong> ${firstUser.username}</p>
          <p><strong>Role:</strong> ${firstUser.role}</p>
          <!-- Add more user-related information as needed -->
        `;

        // Show the dropdown
        userDropdown.style.display = 'block';
      }
    });

    // Close the dropdown when clicking outside of it
    document.addEventListener('click', (event) => {
      if (!event.target.matches('#userIcon')) {
        userDropdown.style.display = 'none';
      }
    });
  });


