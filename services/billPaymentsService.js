'use strict';

var Util = require('../util')
var UrlService = require('../services/urlService')

var BillPaymentService = function(that) {
    this.util = new Util(that);
    this.urlService = new UrlService(that);
};



BillPaymentService.prototype.getBillPrice = function(barcode, vendorid, serviceid, token) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    var baseurl = this.urlService.getFullUrlPrincipalApi();    
    
    return this.util.getUrl(baseurl, this.util.getTokenHeader(token),'/v1/billPayments/validatebarcode/'+ barcode + '?vendorId=' + vendorid + '&serviceId=' + serviceid);
};

BillPaymentService.prototype.getServiceByVendor = function(token, vendor) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    var baseurl = this.urlService.getFullUrlPrincipalApi();    
    
    return this.util.getUrl(baseurl, this.util.getTokenHeader(token),'/v1/billPayments/services/'+ vendor);
};

BillPaymentService.prototype.GetVendors = function(token) {
    this.util.timeout(config.util.DEFAULT_SECONDS);
    var baseurl = this.urlService.getFullUrlPrincipalApi();
    
    return this.util.getUrl(baseurl, this.util.getTokenHeader(token),'/v1/billPayments/getAvailabilityVendor');
};

module.exports = BillPaymentService;