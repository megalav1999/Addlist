const itemListDiv = document.getElementById('itemList');
const addItemForm = document.getElementById('addItemForm');

// Function to fetch items from the server
function fetchItems() {
  fetch('/api/items')
    .then(response => response.json())
    .then(data => displayItems(data))
    .catch(error => console.error('Error fetching items:', error));
}

// Function to display items on the page
function displayItems(items) {
  itemListDiv.innerHTML = '';

  items.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.innerHTML = `<strong>${item.title}</strong><br>${item.description}<br><br>`;
    itemListDiv.appendChild(itemDiv);
  });
}

// Event listener for form submission to add a new item
addItemForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;

  // Make POST request to add a new item
  fetch('/api/items', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, description }),
  })
    .then(response => {
      if (response.status === 201) {
        // If item added successfully, fetch and display updated items
        fetchItems();
        // Clear the form fields after adding
        document.getElementById('title').value = '';
        document.getElementById('description').value = '';
      } else {
        console.error('Failed to add item');
      }
    })
    .catch(error => console.error('Error adding item:', error));
});

// Fetch items when the page loads
fetchItems();