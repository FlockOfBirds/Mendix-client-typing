/* tslint:disable */
import * as dom from "mxui/dom"

// https://apidocs.mendix.com/6/client/module-mxui_dom.html

dom.addCss("my/custom.css");

var $ = dom.create;
var table = $("table", {
    "class": "bordered-table",
    style: "font-weight:bold"
},
    $("tbody",
        $("tr",
            $("td", "content")
        )
    )
);
var node = $("div", {
    style: {
        color: "red",
        cursor: "pointer",
        fontWeight: "bold"
    },
},
    $("span", "text")
);

dom.disableNode(node); // disabling a node
dom.enableNode(node); // enabling it again

var escaped = dom.escapeString("<script src='evil.example.com/nasty.js'></script>");
// escaped:  "&lt;script src='evil.example.com/script.js'&gt;&lt;/script&gt;"
document.body.innerHTML = escaped;  // No script injection.

var cssNode = dom.getCss("css/theme.css"); // Node referencing the theme stylesheet.
cssNode.href = "css/theme2.css"; // Replace stylesheet.

var inputNode = document.createElement("INPUT") as HTMLInputElement;
dom.getCursorPosition(inputNode);

var selectNode = document.createElement("SELECT") as HTMLSelectElement;
dom.setSelectOptions(selectNode, {
    "red": "Cherry red",
    "blue": "Sea blue"
}, "blue");
dom.getSelectedText(selectNode); // "Sea blue"

dom.getSelection(inputNode); // { start: 1, end: 3 }

dom.removeCss("css/theme.css");

// select 3rd character in inputNode
inputNode.focus();
dom.selectTextRange(inputNode, 2, 3);

// TODO https://apidocs.mendix.com/6/client/module-mxui_html_parser.html

let button = new mxui.widget._Button();
