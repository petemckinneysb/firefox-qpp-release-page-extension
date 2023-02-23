class ReleasePage {
  pageId;
  releaseType;
  version;
  branchName;
  capitalizedBranchName;
  releasePageLink;
  implAnnouncementStart;
  implAnnouncementProdVerification;
  implAnnouncementProdComplete;
  prodAnnouncement;
  prodAnnouncementComplete;
  mergeToMasterPRName;
  tagVersionReleaseTitle;

  constructor(pageId, releaseType, branchName, releasePageLink, version, qualityAssurance) {
    this.pageId = pageId;
    this.releaseType = this.mapReleaseTypes(releaseType);
    this.version = this.translateVersion(version);
    this.tagVersion = `v${this.version}`;
    this.branchName = this.mapBranchNames(branchName, this.tagVersion);
    this.releasePageLink = releasePageLink;
    this.capitalizedBranchName = this.capitalizeBranchName(branchName);

    this.implAnnouncementStart = `@here Deploying Submissions & Feedback UI \`${this.branchName}\` to IMPL ${this.releasePageLink}`;

    this.implAnnouncementProdVerification = `@ui-devs Merged ${this.branchName} into master and deploying to IMPL, webhook to master has been enabled.`;

    this.implAnnouncementProdComplete = `@here \`${this.branchName}\` has been successfully deployed to IMPL. (your emoji here)
@${qualityAssurance}`;

    this.prodAnnouncement = `@here Deploying Submissions & Feedback UI \`${this.branchName}\` to PROD ${this.releasePageLink}`;

    this.prodAnnouncementComplete = `@here \`${this.branchName}\` has been successfully deployed to PROD. (your emoji here)
@${qualityAssurance}`;

    this.mergeToMasterPRName = `GitFlow: ${this.capitalizedBranchName}/${this.tagVersion} - Merge to Master`

    this.tagVersionReleaseTitle = this.tagVersion;
  }

  translateVersion(version) {
    if (!version.startsWith("0.")) {
      return `0.${version}`;
    }

    return version;
  }

  mapReleaseTypes(releaseTypeText) {
    switch (releaseTypeText) {
      case "standard release":
        return "standard";
      default:
        return releaseTypeText;
    }
  }

  mapBranchNames(branchNameText, version) {
    let branchName = "";
    switch (branchNameText) {
      case "standard release":
        branchName = "release";
        break;
      default:
        branchName = branchNameText;
    }

    return `${branchName}/${version}`;
  }

  capitalizeBranchName(branchNameText) {
    return branchNameText.charAt(0).toUpperCase() + branchNameText.slice(1);
  }
}

let releasePage = collectReleasePageInformation();

let response = browser.runtime.sendMessage(releasePage);

response.then(function (html) {
  if (!document.getElementById("releasePageExtensionRoot")) {
    let rootElement = document.createElement("div");
    rootElement.id = "releasePageExtensionRoot";
    rootElement.innerHTML = html;
    document.body.prepend(rootElement);

    addCopyEventListeners();
  }
});

function addCopyEventListeners() {
  let buttons = document.querySelectorAll("[id$=Copy]");

  for (const button of buttons) {
    button.addEventListener("click", function () {
      let copyText = document.querySelector(
        `#${button.id.replace("Copy", "")}`
      );
      copyText.select();
      document.execCommand("copy");
    });
  }
}

function collectQAName() {
  const qualityAssuranceTitleTd = Array.from(document.querySelectorAll('td')).find((td) => {
    return td.textContent === 'Quality Assurance';
  });

  return qualityAssuranceTitleTd.parentNode && qualityAssuranceTitleTd.parentNode.children[1].textContent;
}

function collectReleasePageInformation() {
  let releaseType = document
    .getElementById("i_sel_fldRelCanType")
    ?.innerText?.toLowerCase();
  let version = document.querySelectorAll("td.confluenceTd > p")[1].innerText;
  let branchName = `${releaseType}`;
  let releasePageLink = document.URL;
  let pageId = document.URL.split("=")[1];
  let qualityAssurance = collectQAName();

  return new ReleasePage(
    pageId,
    releaseType,
    branchName,
    releasePageLink,
    version,
    qualityAssurance
  );
}
