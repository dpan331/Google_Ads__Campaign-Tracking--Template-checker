//created by Dimitrios Panourgias, July 2021

function main() {
  Logger.log("MCC Campaign Tracking Template applier");
  Logger.log("=========================");
  campaignTrackingTemplateApplier();
}

function campaignTrackingTemplateApplier() {
  var accountSelector = AdsManagerApp.accounts().withCondition("Impressions > 0").forDateRange("LAST_30_DAYS");
  var accountIterator = accountSelector.get();
  
  while (accountIterator.hasNext()) {
    var account = accountIterator.next();
    AdsManagerApp.select(account);
    var accountName = account.getName();
    
    Logger.log(accountName);
    
    var campaignIterator = AdsApp.campaigns().get();
    while (campaignIterator.hasNext()) {
      var campaign = campaignIterator.next();
      var campaignName = campaign.getName();
      var campaignURLs = campaign.urls();
      var patternTemplate = "{lpurl}?utm_source=google&utm_medium=cpc&utm_campaignid={campaignid}&utm_adgroupid={adgroupid}&utm_campaign="
      var setTemplate = patternTemplate + campaignName.replace(/\s/g,'%20');
      campaignURLs.setTrackingTemplate(setTemplate);
      var trackingTemplate = campaignURLs.getTrackingTemplate();

      Logger.log("...........................");
      Logger.log(campaignName);
      Logger.log(trackingTemplate);
    }
  }
}