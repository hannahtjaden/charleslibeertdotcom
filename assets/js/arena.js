let perPage = 100; // Number of entries per page
let channel = "cl-bi8j5zkrytm"; // Your channel slug

// Function to create the URL for fetching entries
function makeURL(per, page) {
    return `https://api.are.na/v2/channels/${channel}?per=${per}&page=${page}`;
}

// Function to process each entry
// Function to safely parse and insert HTML while preserving mailto links
function parseHTMLString(htmlString) {
    const parser = new DOMParser();
    const parsedDoc = parser.parseFromString(htmlString, 'text/html');
    return parsedDoc.body; // Return the entire parsed body
}

// Function to process each entry
function makeEntry(entry) {
    // console.log("Creating entry for:", entry); // Debug output

    let entryEl;
    let entryClass = entry.class;

    if (entryClass === "Image") {
        entryEl = document.createElement("figure");
        entryEl.classList.add("image-entry");
        entryEl.innerHTML = `
            <img class="image" src="${entry.image.display.url}" />
            <figcaption class="title">${entry.title}</figcaption>
        `;
    } else if (entryClass === "Text") {
        // console.log("Text entry found:", entry); // Debug output
        entryEl = document.createElement("div");
        entryEl.classList.add("text-entry");

        const titleEl = document.createElement("h1");
        titleEl.classList.add("text-title");
        titleEl.textContent = entry.title;

        const contentHTML = entry.content_html || entry.content;
        const parsedContent = parseHTMLString(contentHTML);

        const contentContainer = document.createElement("div");
        contentContainer.classList.add("text-content");

        // Append all parsed elements manually
        while (parsedContent.firstChild) {
            contentContainer.appendChild(parsedContent.firstChild);
        }

        entryEl.appendChild(titleEl);
        entryEl.appendChild(contentContainer);
    } else {
        console.warn("Unknown entry class:", entryClass);
        return;
    }

    // Insert the new entry into the HTML
    let entriesEl = document.getElementById("entries");
    entriesEl.insertBefore(entryEl, entriesEl.firstChild);
}


// Function to fetch all entries
function fetchAllEntries(page = 1) {
    fetch(makeURL(perPage, page))
        .then(res => res.json())
        .then(json => {
            // console.log("Fetched entries:", json); // Log the entire response
            if (json.contents) {
                json.contents.forEach(entry => {
                    // console.log("Entry:", entry); // Log each entry
                    // console.log("Entry class:", entry.class); // Log the class of each entry
                    makeEntry(entry); // Process each entry
                });
                // If there are more entries, fetch the next page
                if (json.contents.length === perPage) {
                    fetchAllEntries(page + 1); // Fetch the next page
                }
            } else {
                console.warn("No contents found in the response."); // Warn if no contents
            }
        })
        .catch(error => {
            console.error("Error fetching entries:", error); // Log any errors
        });
}

// Start fetching all entries
fetchAllEntries();