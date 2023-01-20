"use strict"

const templateHTML = `
<div id="release-page-content">
    <div>
        <label for="pageId">Page ID: </label>
    </div>
    <div>
        <input id="pageId" readonly value="{{pageId}}" />
        <button id="pageIdCopy">Copy</button>
    </div>
    
    <div>
        <label for="releaseType">Release Type: </label>
    </div>
    <div>
        <input id="releaseType" readonly value="{{releaseType}}" />
        <button id="releaseTypeCopy">Copy</button>
    </div>
    <div>
        <label for="branchName">Branch Name: </label>
    </div>
    <div>
        <input id="branchName" readonly value="{{branchName}}" />
        <button id="branchNameCopy">Copy</button>
    </div>
    <div>
        <label for="implAnnouncementStart">IMPL Announcement Start: </label>
    </div>
    <div>
        <textarea id="implAnnouncementStart" cols="100">{{implAnnouncementStart}}</textarea>
        <button id="implAnnouncementStartCopy">Copy</button>
    </div>

    <div>
        <label for="implAnnouncementProdVerification">IMPL Announcement PROD Verificiation: </label>
    </div>
    <div>
        <textarea id="implAnnouncementProdVerification" cols="100">{{implAnnouncementProdVerification}}</textarea>
        <button id="implAnnouncementProdVerificationCopy">Copy</button>
    </div>

    <div>
        <label for="implAnnouncementProdComplete">IMPL Announcement PROD Complete: </label>
    </div>
    <div>
        <textarea id="implAnnouncementProdComplete" rows="5" cols="100">{{implAnnouncementProdComplete}}</textarea>
        <button id="implAnnouncementProdCompleteCopy">Copy</button>
    </div>

    <div>
        <label for="prodAnnouncement">PROD Announcement: </label>
    </div>
    <div>
        <textarea id="prodAnnouncement" rows="5" cols="100">{{prodAnnouncement}}</textarea>
        <button id="prodAnnouncementCopy">Copy</button>
    </div>

    <div>
        <label for="prodAnnouncementComplete">PROD Announcement Complete: </label>
    </div>
    <div>
        <textarea id="prodAnnouncementComplete" rows="5" cols="100">{{prodAnnouncementComplete}}</textarea>
        <button id="prodAnnouncementCompleteCopy">Copy</button>
    </div>
</div>`

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    let responseHTML = parseTemplate(message, templateHTML);
    sendResponse(responseHTML);
});


function parseTemplate(model, html) {
    let keys = Object.keys(model);
    let parsedHTML = html;

    for (let key of keys) {
        parsedHTML = parsedHTML.replace(`\{\{${key}\}\}`, model[key]);
    }

    return parsedHTML;
}
