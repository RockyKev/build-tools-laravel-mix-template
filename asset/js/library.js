!function(){"use strict";var e,t={442:function(){const e={printDimension:!0},t=e=>{console.log(`Width = ${e.originalWidth}px, Height = ${e.originalHeight}px`)},n=(e,t,n=1)=>({originalWidth:e,originalHeight:t,width:e*n,height:t*n,scale:n,string:"+",style:"font-size: 1px; padding: "+Math.floor(t*n/2)+"px "+Math.floor(e*n/2)+"px; line-height: "+t*n+"px;"}),i=(e,t)=>{console.log("%c"+t.string,t.style+"background-image: url("+e+"); background-size: "+t.width+"px "+t.height+"px; background-size: 100% 100%; background-repeat: norepeat; color: transparent;")},r=e=>{let t;return"undefined"==typeof window||void 0!==window.OffscreenCanvas?t=new OffscreenCanvas(e.w,e.h):(t=document.createElement("canvas"),t.style.display="none"),t.width=e.w,t.height=e.h,t},o=(e,t)=>{const n=document.createElement("canvas");return null!=t&&n.setAttribute("id",`${t}`),n.width=e.w,n.height=e.h,n.style.position="absolute",n.style.top="0",n.style.left="0",n.style.width=`${e.w}px`,n.style.height=`${e.h}px`,n};((a=e)=>{console.img=(e,t=1,n=a.printDimension,...i)=>{if(e instanceof OffscreenCanvas||e instanceof CanvasRenderingContext2D)c(e,t,n,...i);else if(e instanceof ImageBitmap)l(e,t,n,...i);else if("string"==typeof e)s(e,t,n,...i);else if(e instanceof HTMLImageElement)h(e,t,n,...i);else{if(!(e instanceof HTMLCanvasElement))throw new Error("unsupported source type, valid types are: string, Canvas or ImageBitmap");c(e,t,n,i)}};const s=(e,r=1,o=a.printDimension,...s)=>{const c=new Image;c.onload=()=>{const a=n(c.width,c.height,r);o&&t(a),s.length>0&&console.log(...s),i(e,a)},c.src=e,c.style.background="url("+e+")"},c=(e,s=1,c=a.printDimension,...l)=>{const h=e instanceof CanvasRenderingContext2D?e.canvas:e,g=h.width*s,p=h.width*s;let f;if(h instanceof OffscreenCanvas){const e=r({w:g,h:p});e.getContext("2d").drawImage(h,0,0,h.width,h.height,0,0,g,p),f=new Promise((t=>e.convertToBlob().then((e=>{const n=new FileReader;n.readAsDataURL(e),n.addEventListener("load",(()=>{t(n.result)}),!1)}))))}else{const e=o({w:g,h:p});e.getContext("2d").drawImage(h,0,0,h.width,h.height,0,0,g,p),f=Promise.resolve(e.toDataURL())}f.then((e=>{const r=h.width,o=h.height,a=n(r,o,s);c&&t(a),l.length>0&&console.log(...l),i(e,a)}))},l=async(e,t=1,n=a.printDimension,...i)=>{const r=o({w:e.width,h:e.height}).getContext("bitmaprenderer"),s=await createImageBitmap(e);r.transferFromImageBitmap(s),c(r.canvas,t,n,...i)},h=async(e,t=1,n=a.printDimension,...i)=>{const r=await createImageBitmap(e);l(r,t,n,...i)}})({printDimensions:!0});var a="/asset/img/happy-cat.png";console.img(a),console.log("im here in library");var s=document.querySelector("#lib"),c=s.querySelector("img"),l=(s.querySelector("h2"),s.querySelector("p"));c.src=a,l.innerText="Everything is working!"},69:function(){}},n={};function i(e){var r=n[e];if(void 0!==r)return r.exports;var o=n[e]={exports:{}};return t[e](o,o.exports,i),o.exports}i.m=t,e=[],i.O=function(t,n,r,o){if(!n){var a=1/0;for(h=0;h<e.length;h++){n=e[h][0],r=e[h][1],o=e[h][2];for(var s=!0,c=0;c<n.length;c++)(!1&o||a>=o)&&Object.keys(i.O).every((function(e){return i.O[e](n[c])}))?n.splice(c--,1):(s=!1,o<a&&(a=o));if(s){e.splice(h--,1);var l=r();void 0!==l&&(t=l)}}return t}o=o||0;for(var h=e.length;h>0&&e[h-1][2]>o;h--)e[h]=e[h-1];e[h]=[n,r,o]},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e={66:0,634:0};i.O.j=function(t){return 0===e[t]};var t=function(t,n){var r,o,a=n[0],s=n[1],c=n[2],l=0;if(a.some((function(t){return 0!==e[t]}))){for(r in s)i.o(s,r)&&(i.m[r]=s[r]);if(c)var h=c(i)}for(t&&t(n);l<a.length;l++)o=a[l],i.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return i.O(h)},n=self.webpackChunkwebpack_starter_template=self.webpackChunkwebpack_starter_template||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}(),i.O(void 0,[634],(function(){return i(442)}));var r=i.O(void 0,[634],(function(){return i(69)}));r=i.O(r)}();
//# sourceMappingURL=library.js.map