(()=>{"use strict";function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},t(e)}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function o(e,t){return o=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},o(e,t)}function i(e,n){if(n&&("object"===t(n)||"function"==typeof n))return n;if(void 0!==n)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function a(e){return a=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},a(e)}new(function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&o(e,t)}(f,e);var t,u,c,l,s=(c=f,l=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=a(c);if(l){var n=a(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return i(this,e)});function f(){return n(this,f),s.apply(this,arguments)}return t=f,(u=[{key:"onReady",value:function(){this.initiateForm(),app.anime(".thanks-item",{translateX:[20,0]}),salla.cart.event.clearCartSummary()}},{key:"registerEvents",value:function(){salla.document.event.onClick(".copy-btn",(function(e){var t=e.target.dataset.selector;return app.copyToClipboard(t)})),salla.document.event.onClick("#btn-open-order",this.btnActionOpenOrder)}},{key:"initiateForm",value:function(){var e=this,t=document.getElementById("resend_invoice-email");if(t){var n=document.getElementById("resend_invoice-submit");t.addEventListener("keyup",(function(){return e.isValidEmail(t.value)&&t.parentElement.classList.remove("error")})),window.beforeSubmit=this.verifyBeforeSubmit(t,n),window.onFail=window.onSuccess=function(){return n.classList.remove("btn--has-loading")}}}},{key:"verifyBeforeSubmit",value:function(e,t){var n=this;return function(r,o,i){if(!n.isValidEmail(e.value))throw e.parentElement.classList.add("error"),"Not Valid";return e&&e.parentElement.classList.remove("error"),t.classList.add("btn--has-loading"),t.setAttribute("disabled",!0),r}}},{key:"btnActionOpenOrder",value:function(e){salla.event.dispatch("mobile::order.placed",{order_id:e.target.dataset.orderId}),location.href=e.target.dataset.orderUrl}}])&&r(t.prototype,u),f}(function(){function t(){var e=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),window.page=this,document.addEventListener("DOMContentLoaded",(function(){return e.loadApp().then((function(){return e.onReady()||e.registerEvents()||app.log("Page Class Loaded🎉")}))}))}var n,r;return n=t,(r=[{key:"loadApp",value:function(){var e,t=0;return new Promise((function(n,r){return e=setInterval((function(){window.app&&window.app.isThemeApp&&(app.log("Loading Page Class..."),n(!0),clearInterval(e)),t>10&&(r("Failed to Find `window.app`😢"),clearInterval(e)),t++}),100)}))}},{key:"onReady",value:function(){}},{key:"registerEvents",value:function(){}}])&&e(n.prototype,r),t}()))})();