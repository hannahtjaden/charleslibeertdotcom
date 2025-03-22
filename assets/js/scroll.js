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

