
const timeline = document.querySelector('.timeline');
if(timeline){
    let isDown = false;
    let startX;
    let scrollLeft;
    timeline.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - timeline.offsetLeft;
        scrollLeft = timeline.scrollLeft;
    });
    timeline.addEventListener('mouseleave', () => {
        isDown = false;
    });
    timeline.addEventListener('mouseup', () => {
        isDown = false;
    });
    timeline.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - timeline.offsetLeft;
        const walk = (x - startX) * 1.5; //scroll-fast
        const maxScroll = timeline.scrollWidth - timeline.clientWidth; // Maximum scroll position
        let newScrollLeft = scrollLeft - walk;
        
        // Limit the scroll position within the valid range
        if (newScrollLeft < 0) {
            newScrollLeft = 0;
        } 
        else if(newScrollLeft > maxScroll) {
            newScrollLeft = maxScroll;
        }

        // Use requestAnimationFrame for smooth scrolling
        requestAnimationFrame(() => {
            timeline.scrollLeft = newScrollLeft;
        });
    });
    }