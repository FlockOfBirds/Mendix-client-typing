/* tslint:disable */
import * as lang from "mendix/lang";
import * as validator from "mendix/validator"

logger.error("Message", "More info");
logger.debug("Message", "More info");
logger.info("Message", "More info");
logger.warn("Message", "More info");
logger.exception("Message", "More info");
logger.scream("Message", "More info");

// https://apidocs.mendix.com/6/client/module-mendix_lang.html
lang.collect([
    function (callback) {
        setTimeout(callback, 100); // async
    },
    function (callback) {
        setTimeout(callback, 100); // async
    },
    function (callback) {
        setTimeout(callback, 100); // async
    }
], function () {
    console.log("Completed");
}, this);

lang.map([1, 2, 3], function (x) {
    return Number(x) * 2;
}, this); // [2, 4, 6]

lang.sequence([
    function (callback) {
        callback(); // sync
    },
    function (callback) {
        setTimeout(callback, 100); // async
    }
], function () {
    console.log("Completed");
}, this);

// https://apidocs.mendix.com/6/client/module-mendix_validator.html

// Should return true
validator.validate("100.12", "Integer") === validator.validation.NOT_INTEGER

var domainModel = mx.meta.getMap();
for (let key in domainModel) {
    console.log(key);
}
