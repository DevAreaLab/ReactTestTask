"use strict";
/** @typedef {'Ok'|'Blacklisted'|'NeedSync'|'Error'} */
export var SyncRpkiRecordResultStatus;
(function (SyncRpkiRecordResultStatus) {
    SyncRpkiRecordResultStatus["Ok"] = "Ok"
    SyncRpkiRecordResultStatus["Blacklisted"] = "Blacklisted"
    SyncRpkiRecordResultStatus["NeedSync"] = "NeedSync"
    SyncRpkiRecordResultStatus["Error"] = "Error"
})(SyncRpkiRecordResultStatus || (SyncRpkiRecordResultStatus = {}));
export class SyncRpkiRecordResult {
    /** @param {{prefix?:string,roas?:string[],rpki?:string[],status?:SyncRpkiRecordResultStatus,message?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    prefix;
    /** @type {string[]} */
    roas;
    /** @type {string[]} */
    rpki;
    /** @type {SyncRpkiRecordResultStatus} */
    status;
    /** @type {string} */
    message;
}
export class ResponseError {
    /** @param {{errorCode?:string,fieldName?:string,message?:string,meta?:{ [index: string]: string; }}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    errorCode;
    /** @type {string} */
    fieldName;
    /** @type {string} */
    message;
    /** @type {{ [index: string]: string; }} */
    meta;
}
export class ResponseStatus {
    /** @param {{errorCode?:string,message?:string,stackTrace?:string,errors?:ResponseError[],meta?:{ [index: string]: string; }}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    errorCode;
    /** @type {string} */
    message;
    /** @type {string} */
    stackTrace;
    /** @type {ResponseError[]} */
    errors;
    /** @type {{ [index: string]: string; }} */
    meta;
}
export class SyncRpkiRecordsResponse {
    /** @param {{result?:SyncRpkiRecordResult[],responseStatus?:ResponseStatus}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {SyncRpkiRecordResult[]} */
    result;
    /** @type {ResponseStatus} */
    responseStatus;
}
export class SyncRpkiRecords {
    /** @param {{bearerToken?:string,prefixList?:string,prefixes?:string[],processSync?:boolean}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {?string} */
    bearerToken;
    /** @type {string} */
    prefixList;
    /** @type {string[]} */
    prefixes;
    /** @type {boolean} */
    processSync;
    getTypeName() { return 'SyncRpkiRecords' }
    getMethod() { return 'POST' }
    createResponse() { return new SyncRpkiRecordsResponse() }
}