//created by Dimitrios Panourgias, June 2021

function main() {
  Logger.log("MCC Campaign Tracking Template checker");
  Logger.log("=========================");
  campaignTrackingTemplateChecker();
}

function campaignTrackingTemplateChecker() {
  var accountSelector = AdsManagerApp.accounts().withCondition("Impressions > 0")
     .forDateRange("LAST_30_DAYS")
  var accountIterator = accountSelector.get();
  
  var i = 0;
  Logger.log("These campaigns have a wrong tracking template");
  
  while (accountIterator.hasNext()) {
    var account = accountIterator.next();
    AdsManagerApp.select(account);
    
    var accountName = account.getName();
    var campaignIterator = AdsApp.campaigns()
      .get();

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
  }
  
  if (i > 0) {
    MailApp.sendEmail('dimitrios.panourgias@virail.com',
        'Campaign tracking template checker',
        'At least one campaign in your MCC has a wrong tracking template');
  }
}