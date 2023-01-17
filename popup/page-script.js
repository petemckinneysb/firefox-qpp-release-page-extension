window.scrape = {};

let pageIdElement = document.getElementById('page-id-copy');

pageIdElement.addEventListener('click', function() {
    console.log('clicked...');
    console.log(window.scrape.pageId);
});
