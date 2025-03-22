// document.addEventListener("DOMContentLoaded", function () {
//     document.body.addEventListener("click", function () {
//         let images = document.querySelectorAll("figure img");
//         let headings = document.querySelectorAll("h1");
//         let textContents = document.querySelectorAll(".text-entry .text-content");
//         let allHidden = Array.from(images).every(img => img.style.opacity === "0");
//         let allHiddenh1 = Array.from(headings).every(h1 => h1.style.opacity === "0");

//         images.forEach(img => {
//             img.style.opacity = allHidden ? "1" : "0";
//         });

//         headings.forEach(h1 => {
//             h1.style.opacity = allHiddenh1 ? "1" : "0";
//         });

//         textContents.forEach(content => {
//             content.style.opacity = allHidden ? "0" : "1";
//         });
//     });
// });





document.addEventListener("DOMContentLoaded", function () {
    const entries = document.querySelector("#entries");

    document.body.addEventListener("mousemove", function (event) {
        let viewportWidth = window.innerWidth;

        if (event.clientX > viewportWidth / 2) {
            document.body.style.cursor = "e-resize"; // Right arrow cursor
        } else {
            document.body.style.cursor = "w-resize"; // Left arrow cursor
        }
    });

    document.body.addEventListener("click", function (event) {
        let images = document.querySelectorAll("figure img");
        let headings = document.querySelectorAll("h1");
        let textContents = document.querySelectorAll(".text-entry .text-content");

        let target = event.target;
        let isFigureOrTextEntry = target.closest("figure, .text-entry");

        if (isFigureOrTextEntry) {
            // Toggle visibility
            let allHidden = Array.from(images).every(img => img.style.opacity === "0");
            let allHiddenh1 = Array.from(headings).every(h1 => h1.style.opacity === "0");

            images.forEach(img => {
                img.style.opacity = allHidden ? "1" : "0";
            });

            headings.forEach(h1 => {
                h1.style.opacity = allHiddenh1 ? "1" : "0";
            });

            textContents.forEach(content => {
                content.style.opacity = allHidden ? "0" : "1";
            });
        } else {
            // Scroll behavior
            let entriesArray = Array.from(entries.children);
            let currentScroll = entries.scrollLeft;
            let viewportWidth = window.innerWidth;

            let closestEntry = entriesArray.reduce((closest, entry) => {
                let offset = entry.offsetLeft - currentScroll;
                return Math.abs(offset) < Math.abs(closest.offset) ? { entry, offset } : closest;
            }, { entry: null, offset: Infinity }).entry;

            if (!closestEntry) return;

            let nextEntry = closestEntry.nextElementSibling;
            let prevEntry = closestEntry.previousElementSibling;

            if (event.clientX > viewportWidth / 2 && nextEntry) {
                entries.scrollTo({ left: nextEntry.offsetLeft, behavior: "smooth" });
            } else if (event.clientX <= viewportWidth / 2 && prevEntry) {
                entries.scrollTo({ left: prevEntry.offsetLeft, behavior: "smooth" });
            }
        }
    });
});





// window.addEventListener('wheel', function (event) {
//     // Check if the screen is in landscape mode
//     if (window.matchMedia('(orientation: landscape)').matches) {
//         const container = document.querySelector('#entries');

//         // Check if the container exists
//         if (container) {
//             // If the vertical scroll is greater than the horizontal scroll
//             if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
//                 // Prevent default vertical scroll behavior
//                 event.preventDefault();

//                 // Scroll the container horizontally
//                 container.scrollLeft += event.deltaY;
//             }

//             // Disable vertical bounce in Safari
//             const currentScroll = window.scrollY;
//             if (currentScroll !== 0) {
//                 window.scrollTo(0, 0);
//             }
//         }
//     }
// }, { passive: false });