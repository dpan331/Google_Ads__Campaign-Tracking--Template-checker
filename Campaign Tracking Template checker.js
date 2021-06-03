//created by Dimitrios Panourgias, May 2021

function main() {
  Logger.log("Campaign Tracking Template checker");
  Logger.log("=========================");
  campaignTrackingTemplateChecker();
}

function campaignTrackingTemplateChecker() {
  var campaignIterator = AdsApp.campaigns()
    .get();
  Logger.log("These campaigns have a wrong tracking template");
  
  var i = 0;
  while (campaignIterator.hasNext()) {
    var campaign = campaignIterator.next();
    var campaignName = campaign.getName();
    var campaignURLs = campaign.urls();
    var trackingTemplate = campaignURLs.getTrackingTemplate();
    if (trackingTemplate !== "{lpurl}?utm_source=google&utm_medium=cpc&utm_campaignid={campaignid}&utm_adgroupid={adgroupid}") {
      Logger.log("...........................");
      Logger.log(campaignName);
      Logger.log(trackingTemplate);
      i = i + 1;
    }
  }
  
  if (i > 0) {
    MailApp.sendEmail('your.email@here.com',
        'Campaign tracking template checker',
        'At least one campaign in your MCC has a wrong tracking template');
  }
}
