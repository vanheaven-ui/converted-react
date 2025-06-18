// script.js - Main JavaScript for the multi-page application

// DOMContentLoaded ensures the script runs after the HTML is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Get references to HTML elements
    const pageContent = document.getElementById('page-content');
    const homeBtn = document.getElementById('home-btn');
    const counterBtn = document.getElementById('counter-btn');
    const listBtn = document.getElementById('list-btn');
    const navButtons = document.querySelectorAll('.nav-bar .btn');

    // Page content templates (HTML strings)
    const homePageHtml = `
        <div class="home-page">
            <h2>Welcome!</h2>
            <p>This is a demonstration of a multi-page vanilla JavaScript application built with <strong>separate CSS files</strong>.</p>
            <p>Navigate through the pages using the buttons above to see different functionalities.</p>
        </div>
    `;

    const counterPageHtml = `
        <div class="counter-section">
            <h2>Counter</h2>
            <div class="counter-controls">
                <button id="decrement-btn" class="btn btn-decrement">Decrement</button>
                <span id="count-display">0</span>
                <button id="increment-btn" class="btn btn-increment">Increment</button>
            </div>
        </div>
    `;

    const listPageHtml = `
        <div class="list-section">
            <h2>Dynamic List</h2>
            <div class="add-item-controls">
                <input type="text" id="new-item-input" placeholder="Add a new item...">
                <button id="add-item-btn" class="btn btn-add-item">Add Item</button>
            </div>
            <ul id="item-list">
                <!-- List items will be injected here by JavaScript -->
            </ul>
        </div>
    `;

    // State variables
    let count = 0; // Counter state for Counter Page
    let items = ['Apple', 'Banana', 'Cherry']; // List state for List Page

    /**
     * Renders the specified page content and activates its associated CSS.
     * @param {string} pageName - The name of the page to render ('home', 'counter', 'list').
     */
    const renderPage = (pageName) => {
        // Deactivate all page-specific stylesheets
        document.getElementById('home-css').disabled = true;
        document.getElementById('counter-css').disabled = true;
        document.getElementById('list-css').disabled = true;

        // Reset active button class
        navButtons.forEach(button => button.classList.remove('active'));

        // Load content and activate CSS based on pageName
        switch (pageName) {
            case 'home':
                pageContent.innerHTML = homePageHtml;
                document.getElementById('home-css').disabled = false;
                homeBtn.classList.add('active');
                break;
            case 'counter':
                pageContent.innerHTML = counterPageHtml;
                document.getElementById('counter-css').disabled = false;
                counterBtn.classList.add('active');
                // Re-attach event listeners and update display for Counter Page
                setTimeout(() => { // Ensure elements are in DOM
                    const countDisplay = document.getElementById('count-display');
                    const incrementBtn = document.getElementById('increment-btn');
                    const decrementBtn = document.getElementById('decrement-btn');

                    const updateCountDisplay = () => {
                        countDisplay.textContent = count;
                    };

                    incrementBtn.addEventListener('click', () => {
                        count++;
                        updateCountDisplay();
                    });

                    decrementBtn.addEventListener('click', () => {
                        count--;
                        updateCountDisplay();
                    });
                    updateCountDisplay(); // Initial display
                }, 0);
                break;
            case 'list':
                pageContent.innerHTML = listPageHtml;
                document.getElementById('list-css').disabled = false;
                listBtn.classList.add('active');
                // Re-attach event listeners and render list for List Page
                setTimeout(() => { // Ensure elements are in DOM
                    const newItemInput = document.getElementById('new-item-input');
                    const addItemBtn = document.getElementById('add-item-btn');
                    const itemList = document.getElementById('item-list');

                    const renderList = () => {
                        itemList.innerHTML = ''; // Clear existing list items

                        if (items.length === 0) {
                            const message = document.createElement('p');
                            message.classList.add('empty-list-message');
                            message.textContent = 'No items in the list yet.';
                            itemList.appendChild(message);
                            return;
                        }

                        items.forEach(itemText => {
                            const listItem = document.createElement('li');
                            listItem.textContent = itemText;
                            // Apply styles to list item
                            listItem.classList.add(
                                'p-2', 'bg-gray-100', 'rounded-md', 'shadow-sm',
                                'transition-all', 'duration-150', 'hover:bg-gray-200'
                            );
                            itemList.appendChild(listItem);
                        });
                    };

                    addItemBtn.addEventListener('click', () => {
                        const itemToAdd = newItemInput.value.trim();
                        if (itemToAdd !== '') {
                            items.push(itemToAdd);
                            newItemInput.value = '';
                            renderList();
                        }
                    });
                    renderList(); // Initial render
                }, 0);
                break;
            default:
                pageContent.innerHTML = homePageHtml;
                document.getElementById('home-css').disabled = false;
                homeBtn.classList.add('active');
        }
        currentPage = pageName;
    };

    // Add event listeners for navigation buttons
    homeBtn.addEventListener('click', () => renderPage('home'));
    counterBtn.addEventListener('click', () => renderPage('counter'));
    listBtn.addEventListener('click', () => renderPage('list'));

    // Initial page render
    renderPage('home');
});
