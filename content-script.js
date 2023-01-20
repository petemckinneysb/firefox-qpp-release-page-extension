class ReleasePage {
    pageId;
    releaseType;
    version;
    branchName;
    releasePageLink;
    implAnnouncementStart;
    implAnnouncementProdVerification;
    implAnnouncementProdComplete;
    prodAnnouncement;
    prodAnnouncementComplete;

    constructor(pageId, releaseType, branchName, releasePageLink, version) {
        this.pageId = pageId;
        this.releaseType = this.mapReleaseTypes(releaseType);
        this.branchName = this.mapBranchNames(branchName, version);
        this.releasePageLink = releasePageLink;
        this.version = version;

        this.implAnnouncementStart = `@here Deploying Submissions & Feedback UI \`${this.branchName}\` to IMPL ${this.releasePageLink}`;

        this.implAnnouncementProdVerification = `@ui-devs Merged ${this.branchName} into master and deploying to IMPL, webhook to master has been enabled.`;

        this.implAnnouncementProdComplete = `@here \`${this.branchName}\` has been successfully deployed to IMPL. (your emoji here)
@Chaitanya Kodali @Lok Shrestha`

        this.prodAnnouncement = `@here Deploying Submissions & Feedback UI \`${this.branchName}\` to PROD ${this.releasePageLink}`;

        this.prodAnnouncementComplete = `@here \`${this.branchName}\` has been successfully deployed to PROD. (your emoji here)
@Chaitanya Kodali @Lok Shrestha`;
    }

    mapReleaseTypes(releaseTypeText) {
        switch (releaseTypeText) {
            case 'standard release':
                return 'standard';
            default:
                return releaseTypeText;
        }
    }

    mapBranchNames(branchNameText, version) {
        let branchName = '';
        switch (branchNameText) {
            case 'standard release':
                branchName = 'release';
                break;
            default:
                branchName = branchNameText;
        }

        return `${branchName}/v${version}`;
    }
}

let releasePage = collectReleasePageInformation();

let response = browser.runtime.sendMessage(releasePage);

response.then(function(html) {
    if (!document.getElementById('releasePageExtensionRoot')) {
        let rootElement = document.createElement("div");
        rootElement.id = "releasePageExtensionRoot";
        rootElement.innerHTML = html;
        document.body.prepend(rootElement);

        addCopyEventListeners();
    }
});

function addCopyEventListeners() {
    let buttons = document.querySelectorAll('[id$=Copy]');

    for (const button of buttons) {
        button.addEventListener("click", function() {
            let copyText = document.querySelector(`#${button.id.replace('Copy', '')}`);
            copyText.select();
            document.execCommand("copy");
        });
    }
}

function collectReleasePageInformation() {
    let releaseType = document.getElementById('i_sel_fldRelCanType')?.innerText?.toLowerCase();
    let version = document.querySelectorAll('td.confluenceTd > p')[1].innerText;
    let branchName = `${releaseType}`;
    let releasePageLink = document.URL;
    let pageId = document.URL.split('=')[1];

    return new ReleasePage(pageId, releaseType, branchName, releasePageLink, version);
}
