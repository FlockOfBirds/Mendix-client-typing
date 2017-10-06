/* tslint:disable */
import * as Big from "big.js";

var form = new mxui.lib.form._FormBase()

// https://apidocs.mendix.com/6/client/mx.data.html

// Calling a simple Microflow, not expecting any entities
mx.data.action({
    params: {
        actionname: "MyFirstModule.PetCat",
    },
    origin: form,
    callback: function (obj) {
        // no MxObject expected
        alert("Just petted the cat a little");
    },
    error: function (error) {
        alert(error.message);
    },
    onValidation: function (validations) {
        alert("There were " + validations.length + " validation errors");
    }
})
// Calling a Microflow expecting a list of entities, using an XPath query
mx.data.action({
    params: {
        applyto: "set",
        actionname: "MyFirstModule.GetFavoriteFood",
        xpath: "//MyFirstModule.Cat",
        constraints: "[id=281530811285515 or id=281530811285506]",
    },
    origin: form,
    callback: function (obj: mendix.lib.MxObject) {
        // expect single MxObject
        alert(obj.get("manufacturer"));
    },
    error: function (error) {
        alert(error.message);
    }
}, this);

// Performing the same request, but now using a list of `GUIDs`
mx.data.action({
    params: {
        applyto: "selection",
        actionname: "MyFirstModule.GetFavoriteFood",
        guids: ["281530811285515", "281530811285506"],
    },
    origin: form,
    callback: function (obj: mendix.lib.MxObject) {
        // expect single MxObject
        alert(obj.get("manufacturer"));
    },
    error: function (error) {
        alert(error.message);
    }
}, this);

var obj = new mendix.lib.MxObject();
mx.data.commit({
    mxobj: obj,
    callback: function () {
        console.log("Object committed");
    },
    error: function (e) {
        console.log("Error occurred attempting to commit: " + e);
    }
});

mx.data.create({
    entity: "MyFirstModule.Cat",
    callback: function (obj) {
        console.log("Object created on server");
    },
    error: function (e) {
        console.log("an error occurred: " + e);
    }
});

var someContext = new mendix.lib.MxContext();

mx.data.createXPathString({
    entity: "System.User",
    context: someContext,
    callback: function (xpath, allMatched) {
        if (allMatched) {
            console.log("All backtracking constraints were met, xpath is: " + xpath);
        } else {
            console.log("Some backtracking constraints could not be met");
        }
    }
});

mx.data.get({
    guids: ["123456", "456789"],
    callback: function (objects) {
        console.log("Received " + objects.length + " MxObjects");
    }
});
mx.data.get({
    guid: "123456",
    callback: function (object) {
        console.log("Received MxObject with GUID " + object.getGuid());
    }
});
mx.data.get({
    xpath: "//System.User",
    callback: function (objects) {
        console.log("Received " + objects.length + " MxObjects");
    }
});
mx.data.get({
    xpath: "//System.User",
    filter: {
        sort: [["Name", "asc"]],
        offset: 0,
        amount: 10
    },
    callback: function (objects) {
        console.log("Received " + objects.length + " MxObjects");
    }
});
// Deprecated
// mx.data.getBacktrackConstraints(null, someContext, function (xpath, allMatched) {
//     if (allMatched) {
//         console.log("All backtracking constraints were met, xpath is: " + xpath);
//     } else {
//         console.log("Some backtracking constraints could not be met");
//     }
// });

mx.data.getOffline("MyFirstModule.Pet", null, null, function(mxobjs, count) {
    console.log("There are " + count + " pets");
});

mx.data.getOffline("MyFirstModule.Pet", [ {
        attribute: "MyFirstModule.Pet_Person",
        operator: "equals",
        value: "1234" // the guid of the owner, which is a Person entity
    } ], null, function (mxobjs, count) {
        console.log("There are " + count + " pets referring to owner 1234");
    }
);

mx.data.getOffline("MyFirstModule.Pet", [{
            attribute: "Name",
            operator: "contains",
            value: "ed"
        }, {
            attribute: "Age",
            operator: "greaterThan",
            value: 2
        }], {
        offset: 15,
        limit: 5,
        sort: [["Name", "asc"], ["Age", "desc"]]
    }, function (mxobjs, count) {
        console.log("Pets that matched your filter: " + mxobjs.length);
        console.log("Pets that matched your query: " + count);
    }, function (e) {
        console.error("Could not retrieve slice:", e);
});

mx.data.remove({
    guid: "123456",
    callback: function () {
        console.log("Object removed");
    },
    error: function (e) {
        console.log("Error occurred attempting to remove object " + e);
    }
});

mx.data.remove({
    guids: ["123456", "45678"],
    callback: function () {
        console.log("Objects removed");
    },
    error: function (e) {
        console.log("Error occurred attempting to remove objects " + e);
    }
});

mx.data.rollback({
    mxobj: obj,
    callback: function () {
        console.log("The object was rollbacked");
    },
    error: function (e) {
        console.log("Error occured attempting to rollback: " + e);
    }
});

// Deprecated
// mx.data.save({
//     mxobj: obj,
//     callback: function () {
//         console.log("ok");
//     }
// });

var fileBlob = new Blob();
mx.data.saveDocument("123456", "Bunnies.jpg", { width: 180, height: 180 }, fileBlob, function () {
    // success
}, function (e) {
    console.error(e);
});

// Subscribe to all changes in an MxObject
var subscription = mx.data.subscribe({
    guid: "123213",
    callback: function (guid) {
        console.log("Object with guid " + guid + " changed");
    }
});

mx.data.unsubscribe(subscription);
// Subscribe to changes in a specific attribute of an MxObject
var subscription = mx.data.subscribe({
    guid: "123213",
    attr: "Name",
    callback: function (guid, attr, value) {
        console.log("Object with guid " + guid + " had its attribute " +
            attr + " change to " + value);
    }
});

mx.data.unsubscribe(subscription);
// Subscribe to validations of an MxObject
var subscription = mx.data.subscribe({
    guid: "123213",
    val: true,
    callback: function (validations) {
        var reason = validations[0].getErrorReason("MyAttribute");
        console.log("Reason for validation error on attribute MyAttribute: " + reason);
    }
});

mx.data.unsubscribe(subscription);
// Subscribe to changes in a class
var subscription = mx.data.subscribe({
    entity: "System.User",
    callback: function (entity) {
        console.log("Update on entity " + entity);
    }
});

// Trigger object subscriptions
mx.data.update({
    guid: "123213"
});
// Trigger attribute subscriptions
mx.data.update({
    guid: "123213",
    attr: "Name"
});
// Trigger entity subscriptions
mx.data.update({
    entity: "System.User",
});

mx.data.unsubscribe(subscription);

// https://apidocs.mendix.com/6/client/mx.ui.html

mx.ui.action("MyFirstModule.StartEngine", {
    context: someContext,
    progress: "modal",
    callback: function (result) {
        console.log("Engine started: ", result);
    }
});

mx.ui.confirmation({
    content: "Do you really want to eat a burger?",
    proceed: "I really do",
    cancel: "I'll pass",
    handler: function () {
        console.log("eating burger");
    }
});

mx.ui.error("Some Error", true);
mx.ui.exception("Some exception");
mx.ui.error("Some Info", true);

mx.ui.getTemplate("12", "content"); // Template 'content' for widget with mxid '12'
// Based on https://apidocs.mendix.com/7/client/mxui_lib_form__FormBase.html
// Disable all child widgets of the form (you would normally use .enable() for this).
form.callRecursive("set", form.disable, true);

form.close();

mx.ui.openForm("MyFirstModule/Puppies.page.xml", {
    location: "popup",
    callback: function(form) {
        // List all direct child widgets in the popup.
        console.log(form.getChildren());

        // List all child widgets in the popup.
        console.log(form.getChildren(true));
    }
});

form.listen("commit", function(callback, error) {
    callback();
});

this.connect(this.mxform, form.onNavigation, function() {
   // custom logic
});

mx.ui.openForm("MyFirstModule/Puppies.page.xml", {
    location: "popup",
    callback: function (form) {
        console.log(form.id);
    }
});

mx.ui.showLogin(401); // show login screen with indication that session has expired.

var pid = mx.ui.showProgress(); // show progress dialog
mx.ui.hideProgress(pid); // hide it again

mx.login("user", "password", () => console.log("Logged in"), () => console.log("Failed login"));

// Window
window.mx.ui.error("Some Error", true);
window.logger.debug("Window debug");

// https://apidocs.mendix.com/6/client/mx.parser.html

var mxobj = new mendix.lib.MxObject();
mxobj.set("createdDate", +new Date(1980, 7, 23));
mx.parser.formatAttribute(mxobj, "createdDate", { datePattern: "dd-MM-yyyy" }); // 23-08-1980

mx.parser.formatValue(Big(3000), "currency"); // "3000.00"
mx.parser.formatValue(+new Date(1980, 7, 23), "datetime", { datePattern: "dd-MM-yyyy" }); // "23-08-1980"

mx.parser.parseValue("3,000.00", "currency"); // 3000
mx.parser.parseValue("23-8-1980", "datetime", { datePattern: "dd-M-yyyy" }); // Date(1980, 7, 23)

// https://apidocs.mendix.com/6/client/mx.meta.html
mx.meta.getEntity("System.Image") // returns the MxMetaObject for System.Image

// ---------------
// Sample from https://apidocs.mendix.com/7/client/mx.server.html
mx.server.getCacheBust(); 

mx.server.get({
    url: "/data/files/dogs.txt",
    handleAs: "text",
    load: function(response) {
        console.log("dogs", response);
    },
    error: function(e) {
        console.log("failed to retrieve resource");
    }
});

