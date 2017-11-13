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

// https://apidocs.mendix.com/7/client/mendix_lib_MxObject.html

var mxObject = new mendix.lib.MxObject();

mxObject.addReference("MyFirstModule.Ent_RefEnt", "12345");

mxObject.addReferences("MyFirstModule.Ent_RefEnt", ["12345", "12346"]);

mxObject.compare(mxObject); // true

mxObject.fetch("Name", function(value) {
    alert("Person's name is " + value);
});

mxObject.fetch("MyFirstModule.Friend/MyFirstModule.Person", function(value) {
    alert("Name of person's friend is " + value.get("Name"));
});

mxObject.fetch("MyFirstModule.Owns/MyFirstModule.Pet", function(value) {
    alert("Person owns the following pets: " + value);
});

mxObject.fetch("MyFirstModule.Friend/MyFirstModule.Person/" +
"MyFirstModule.Father/MyFirstModule.Person/" +
"Age", function(value) {
alert("Name of the father of this person's friend is " + value);
});

mxObject.get("IsActive");   // true
mxObject.get("Name");       // "John Doe"
var numericValue = mxObject.get("LoginCount");
numericValue instanceof Big // true
numericValue.toString()     // "315"

var attrs = mxObject.getAttributes(); // ["Name", "Age"];

mxObject.getChildren("attribute");

mxObject.getEntity(); // "System.User"

mxObject.getEnumCaption("Color", "red"); // "Rouge"

mxObject.getEnumMap("Color"); // [ { key : "red",   caption : "Red" },
//   { key : "green", caption : "Green" },
//   { key : "blue",  caption : "Blue" } ]

mxObject.getGuid(); // "1234567890131"

mxObject.getOptions("Color"); // [ "red", "green", "blue" ]

mxObject.getReferences("MyFirstModule.Ref");            // [ "12345", "12346" ]
mxObject.set("MyFirstModule.Ref", [ "12347" ]);         // [ "12347" ]
mxObject.getReferences("MyFirstModule.Ref");            // [ "12347" ]
mxObject.getOriginalReferences("MyFirstModule.Ref");    // [ "12345", "12346" ]

mxObject.get("Name");               // "Fred"
mxObject.set("Name", "Henry");
mxObject.get("Name");               // "Henry"
mxObject.getOriginalValue("Name")   // "Fred"

// Get GUID of object over association MyFirstModule.Ref.
var ref = mxObject.getReference("MyFirstModule.Ref"); // "12345"

var refs = mxObject.getReferenceAttributes(); // [ "Mod.Person_Parent",
//   "Mod.Person_Company" ]

// Get GUIDs of objects over association MyFirstModule.Ref.
mxObject.getReferences("MyFirstModule.Ref");    // [ "12345", "12346" ]

mxObject.getSelectorEntity("Order_OrderLine"); // "CRM.OrderLine"

mxObject.getSubEntities(); // [ "MyModule.EntityA", "MyModule.EntityB" ]

mxObject.getSuperEntities(); // [ "MyModule.EntityC",
//   "MyModule.EntityD",
//   "System.User" ]

mx.data.get({
    guid: "12345",
    callback: function(obj) {
        // Object is fresh from the runtime; next line prints 'false'.
        console.log(obj.hasChanges());

        obj.set("Name", "foo");

        // Object has a changed attribute; next line prints 'true'.
        console.log(obj.hasChanges());
    }
});

mxObject.getSubEntities(); // [ "MyModule.EntityA", "MyModule.EntityB" ]

if (mxObject.hasSuperEntities()) {
    alert("This object inherits from another Entity");
} else {
    alert("This object does not inherit from another Entity");
}

if (mxObject.inheritsFrom("System.User")) {
    alert("This object inherits from System.User");
} else {
    alert("This object does not inherit from System.User");
}

if (mxObject.isA("System.User")) {
    alert("This object is a System.User");
} else {
    alert("This object is not a System.User");
}

if (mxObject.isBoolean("Checked")) {
    alert("Attribute 'Checked' is a Boolean");
} else {
    alert("Attribute 'Checked' is not a Boolean");
}

if (mxObject.isDate("DoB")) {
    alert("Attribute 'DoB' is a Date");
} else {
    alert("Attribute 'DoB' is not a Date");
}

if (mxObject.isEnum("Colors")) {
    alert("Attribute 'Colors' is an Enumeration");
} else {
    alert("Attribute 'Colors' is not an Enumeration");
}

if (mxObject.isLocalizedDate("DoB")) {
    alert("Attribute 'DoB' is a Localized Date");
} else {
    alert("Attribute 'DoB' is not a Localized Date");
}

if (mxObject.isNumeric("Count")) {
    alert("Attribute 'Count' is numeric");
} else {
    alert("Attribute 'Count' is not numeric");
}

if (mxObject.isObjectReference("Mother")) {
    alert("Attribute Parent is a reference");
} else {
    alert("Attribute Parent is not a reference");
}

if (mxObject.isObjectReferenceSet("Children")) {
    alert("Attribute Children is a reference set");
} else {
    alert("Attribute Children is not a reference set");
}

if (mxObject.isPassword("Password")) {
    alert("Attribute 'Password' is a Password");
} else {
    alert("Attribute 'Password' is not a Password");
}

if (mxObject.isReference("Children")) {
    alert("Attribute Children is a reference set");
} else {
    alert("Attribute Children is not a reference set");
}

mxObject.removeReferences("MyFirstModule.Ent_RefEnt", ["12345", "12346"]);

mxObject.set("Name", "John Smith");
mxObject.set("IsActive", true);


