;/*FB_PKG_DELIM*/

__d("passiveEventListenerUtil",[],(function(a,b,c,d,e,f){"use strict";b=!1;try{c=Object.defineProperty({},"passive",{get:function(){b=!0}});window.addEventListener("test",null,c)}catch(a){}var g=b;function a(a){return g?a:typeof a==="boolean"?a:a.capture||!1}f.isPassiveEventListenerSupported=g;f.makeEventOptions=a}),66);
__d("isBulletinDotComURI",[],(function(a,b,c,d,e,f){var g=new RegExp("(^|\\.)bulletin\\.com$","i"),h=["https"];function a(a){if(a.isEmpty()&&a.toString()!=="#")return!1;return!a.getDomain()&&!a.getProtocol()?!1:h.indexOf(a.getProtocol())!==-1&&g.test(a.getDomain())}f["default"]=a}),66);
__d("uriIsRelativePath",[],(function(a,b,c,d,e,f){"use strict";function a(a){return!a.getProtocol()&&!a.getDomain()&&!a.getPort()&&a.toString()!==""}f["default"]=a}),66);/*FB_PKG_DELIM*/
/**
 * License: https://www.facebook.com/legal/license/V9vdYColc4k/
 */
__d("react-0.0.0",["React"],(function(a,b,c,d,e,f){"use strict";function a(a){return a&&typeof a==="object"&&"default"in a?a["default"]:a}var g=a(b("React"));d={};var h={exports:d};function i(){h.exports=g}var j=!1;function k(){j||(j=!0,i());return h.exports}function c(a){switch(a){case void 0:return k()}}e.exports=c}),null);
__d("react",["react-0.0.0"],(function(a,b,c,d,e,f){e.exports=b("react-0.0.0")()}),null);