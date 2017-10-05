# Mendix Client API Type definition

This type definition is based on the Mendix client API documentation

https://apidocs.mendix.com/7/client/

## Installation
 > npm install --save-dev mendix-client

 * Add to your tsconfig.json
```json
{
    "compilerOptions": {
        "types": [ "mendix-client" ]
    }
}
```

## Usage
Typescript sample works as a Mendix Dojo widget

```ts
import * as dojoDeclare from "dojo/_base/declare";
import * as WidgetBase from "mxui/widget/_WidgetBase";

export class MyWidget extends WidgetBase {
    // Properties from Mendix modeler
    private message: string; 
    // Don`t assign default values, as the constructor will never be executed
    // alternative set them in the postCreate
    // private info: "Hello World"; 
    
    postCreate() {
        console.log("We have a widget ", this.message);
    }

    update(object: mendix.lib.MxObject, callback?: Function) {
        console.log("We have a context", object);

        if (callback) {
            callback();
        }
    }
}

dojoDeclare("com.mendix.widget.mywidget.MyWidget", [ WidgetBase ], (function(Source: any) {
    const result: any = {};
    for (const i in Source.prototype) {
        if (i !== "constructor" && Source.prototype.hasOwnProperty(i)) {
            result[i] = Source.prototype[i];
        }
    }
    return result;
}(MyWidget)));
```
More info about the Dojo declare hack for TypesScript: https://github.com/DefinitelyTyped/DefinitelyTyped/tree/types-2.0/dojo/README.md 

## Dependency
 * Mendix 7 Modeler - https://appstore.home.mendix.com
