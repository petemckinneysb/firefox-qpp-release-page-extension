let releaseType = document.getElementById('i_sel_fldRelCanType')?.innerText?.toLowerCase();

let version = document.querySelectorAll('td.confluenceTd > p')[1].innerText;
let branchName = `${releaseType}/v${version}`;
let releasePageLink = document.URL;
let pageId = document.URL.split('=')[1];

console.group('Code Build');
console.log(pageId);
console.log(releaseType);
console.log(branchName);
console.groupEnd('Code Build');

console.group('IMPL Announcements');
console.log(`@here Deploying Submissions & Feedback UI \`${branchName}\` to IMPL ${releasePageLink}`)
console.log(`@ui-devs Merged ${branchName} into master and deploying to IMPL, webhook to master has been enabled.`);
console.log(`
    @here \`${branchName}\` has been successfully deployed to IMPL. (your emoji here)

    @Chaitanya Kodali @Lok Shrestha
`);
console.groupEnd('IMPL Announcements');

console.group('PROD Announcements');
console.log(`@here Deploying Submissions & Feedback UI \`${branchName}\` to PROD ${releasePageLink}`);
console.log(`
    @here \`${branchName}\` has been successfully deployed to PROD. (your emoji here)
    @Chaitanya Kodali @Lok Shrestha
`);
console.groupEnd('PROD Announcements');

let scrape = {
    pageId: pageId
};

window.wrappedJSObject.scrapedReleasePage = cloneInto(
    scrape,
    window,
    { cloneFunctions: true });
