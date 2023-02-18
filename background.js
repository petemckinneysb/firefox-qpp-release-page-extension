"use strict";

//do not modifiy this variable value in this file.
//templateHTML is modified from template/template.html when 'npm run replace:template' script is run
const templateHTML = `<!DOCTYPE>
<html>

<head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
</head>

<body>
    <div id="release-page-content">

        <label for="pageId">Page ID: </label>
        <div class="input-group col-3">
            <input id="pageId" readonly value="{{pageId}}" />
            <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button" id="pageIdCopy">
                    Copy
                </button>
            </div>
        </div>

        <label for="releaseType">Release Type: </label>
        <div class="input-group col-3">
            <input id="releaseType" readonly value="{{releaseType}}" />
            <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button" id="releaseTypeCopy">
                    Copy
                </button>
            </div>
        </div>

        <label for="branchName">Branch Name: </label>
        <div class="input-group col-3">
            <input id="branchName" readonly value="{{branchName}}" />
            <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button" id="branchNameCopy">
                    Copy
                </button>
            </div>
        </div>

        <label for="branchName">Tag Version & Release Title</label>
        <div class="input-group col-3">
            <input id="tagVersionReleaseTitle" readonly value="{{tagVersionReleaseTitle}}" />
            <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button" id="tagVersionReleaseTitleCopy">
                    Copy
                </button>
            </div>
        </div>


        <label for="branchName">Merge to Master PR Name</label>
        <div class="input-group">
            <textarea id="mergeToMasterPRName" rows="5" cols="50">{{mergeToMasterPRName}}</textarea>
            <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button" id="mergeToMasterPRNameCopy">
                    Copy
                </button>
            </div>
        </div>

        <label for="implAnnouncementStart">
            IMPL Announcement Start(
            <a href="https://cmsgov.slack.com/archives/qpp-deployments" target="_blank">
                cmsgov#qpp-deployments
            </a>
            ):
        </label>
        <div class="input-group">
            <textarea id="implAnnouncementStart" rows="5" cols="50">{{implAnnouncementStart}}</textarea>
            <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button" id="implAnnouncementStartCopy">
                    Copy
                </button>
            </div>
        </div>

        <label for="implAnnouncementProdVerification">
            IMPL Announcement PROD Verification(
            <a href="https://semanticbits.slack.com/archives/p-qpp-sfui-wi" target="_blank">
                semanticbits#p-qpp-sfui-wi
            </a>
            ):
        </label>
        <div class="input-group">
            <textarea id="implAnnouncementProdVerification" rows="5"
                cols="50">{{implAnnouncementProdVerification}}</textarea>
            <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button" id="implAnnouncementProdVerificationCopy">
                    Copy
                </button>
            </div>
        </div>

        <label for="implAnnouncementProdComplete">
            IMPL Announcement PROD Verification Complete(
            <a href="https://semanticbits.slack.com/archives/p-qpp-sfui-wi" target="_blank">
                semanticbits#p-qpp-sfui-wi
            </a>
            ):
        </label>
        <div class="input-group">
            <textarea id="implAnnouncementProdComplete" rows="5" cols="50">{{implAnnouncementProdComplete}}</textarea>
            <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button" id="implAnnouncementProdCompleteCopy">
                    Copy
                </button>
            </div>
        </div>

        <label for="prodAnnouncement">
            PROD Announcement(
            <a href="https://cmsgov.slack.com/archives/qpp-deployments" target="_blank">
                cmsgov#qpp-deployments
            </a>
            ):
        </label>
        <div class="input-group">
            <textarea id="prodAnnouncement" rows="5" cols="50">{{prodAnnouncement}}</textarea>
            <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button" id="prodAnnouncementCopy">
                    Copy
                </button>
            </div>
        </div>

        <label for="prodAnnouncementComplete">
            PROD Announcement Complete(
            <a href="https://semanticbits.slack.com/archives/p-qpp-sfui-wi" target="_blank">
                semanticbits#p-qpp-sfui-wi
            </a>
            ):
        </label>
        <div class="input-group">
            <textarea id="prodAnnouncementComplete" rows="5" cols="50">{{prodAnnouncementComplete}}</textarea>
            <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button" id="prodAnnouncementCompleteCopy">
                    Copy
                </button>
            </div>
        </div>

    </div>
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
        integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
        crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.7/dist/umd/popper.min.js"
        integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
        crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js"
        integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
        crossorigin="anonymous"></script>

</body>

</html>
`;

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
