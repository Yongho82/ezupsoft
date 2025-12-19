(function(){const p=document.createElement("link").relList;if(p&&p.supports&&p.supports("modulepreload"))return;for(const v of document.querySelectorAll('link[rel="modulepreload"]'))r(v);new MutationObserver(v=>{for(const h of v)if(h.type==="childList")for(const b of h.addedNodes)b.tagName==="LINK"&&b.rel==="modulepreload"&&r(b)}).observe(document,{childList:!0,subtree:!0});function u(v){const h={};return v.integrity&&(h.integrity=v.integrity),v.referrerPolicy&&(h.referrerPolicy=v.referrerPolicy),v.crossOrigin==="use-credentials"?h.credentials="include":v.crossOrigin==="anonymous"?h.credentials="omit":h.credentials="same-origin",h}function r(v){if(v.ep)return;v.ep=!0;const h=u(v);fetch(v.href,h)}})();function lh(c){return c&&c.__esModule&&Object.prototype.hasOwnProperty.call(c,"default")?c.default:c}var qr={exports:{}},pi={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var qf;function mm(){if(qf)return pi;qf=1;var c=Symbol.for("react.transitional.element"),p=Symbol.for("react.fragment");function u(r,v,h){var b=null;if(h!==void 0&&(b=""+h),v.key!==void 0&&(b=""+v.key),"key"in v){h={};for(var M in v)M!=="key"&&(h[M]=v[M])}else h=v;return v=h.ref,{$$typeof:c,type:r,key:b,ref:v!==void 0?v:null,props:h}}return pi.Fragment=p,pi.jsx=u,pi.jsxs=u,pi}var Yf;function gm(){return Yf||(Yf=1,qr.exports=mm()),qr.exports}var o=gm(),Yr={exports:{}},Ce={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Xf;function bm(){if(Xf)return Ce;Xf=1;var c=Symbol.for("react.transitional.element"),p=Symbol.for("react.portal"),u=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),v=Symbol.for("react.profiler"),h=Symbol.for("react.consumer"),b=Symbol.for("react.context"),M=Symbol.for("react.forward_ref"),x=Symbol.for("react.suspense"),m=Symbol.for("react.memo"),T=Symbol.for("react.lazy"),g=Symbol.for("react.activity"),E=Symbol.iterator;function C(f){return f===null||typeof f!="object"?null:(f=E&&f[E]||f["@@iterator"],typeof f=="function"?f:null)}var A={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},L=Object.assign,K={};function J(f,S,z){this.props=f,this.context=S,this.refs=K,this.updater=z||A}J.prototype.isReactComponent={},J.prototype.setState=function(f,S){if(typeof f!="object"&&typeof f!="function"&&f!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,f,S,"setState")},J.prototype.forceUpdate=function(f){this.updater.enqueueForceUpdate(this,f,"forceUpdate")};function ee(){}ee.prototype=J.prototype;function $(f,S,z){this.props=f,this.context=S,this.refs=K,this.updater=z||A}var _=$.prototype=new ee;_.constructor=$,L(_,J.prototype),_.isPureReactComponent=!0;var oe=Array.isArray;function G(){}var k={H:null,A:null,T:null,S:null},te=Object.prototype.hasOwnProperty;function q(f,S,z){var U=z.ref;return{$$typeof:c,type:f,key:S,ref:U!==void 0?U:null,props:z}}function ce(f,S){return q(f.type,S,f.props)}function Se(f){return typeof f=="object"&&f!==null&&f.$$typeof===c}function we(f){var S={"=":"=0",":":"=2"};return"$"+f.replace(/[=:]/g,function(z){return S[z]})}var Y=/\/+/g;function Q(f,S){return typeof f=="object"&&f!==null&&f.key!=null?we(""+f.key):S.toString(36)}function Me(f){switch(f.status){case"fulfilled":return f.value;case"rejected":throw f.reason;default:switch(typeof f.status=="string"?f.then(G,G):(f.status="pending",f.then(function(S){f.status==="pending"&&(f.status="fulfilled",f.value=S)},function(S){f.status==="pending"&&(f.status="rejected",f.reason=S)})),f.status){case"fulfilled":return f.value;case"rejected":throw f.reason}}throw f}function y(f,S,z,U,Z){var ne=typeof f;(ne==="undefined"||ne==="boolean")&&(f=null);var ae=!1;if(f===null)ae=!0;else switch(ne){case"bigint":case"string":case"number":ae=!0;break;case"object":switch(f.$$typeof){case c:case p:ae=!0;break;case T:return ae=f._init,y(ae(f._payload),S,z,U,Z)}}if(ae)return Z=Z(f),ae=U===""?"."+Q(f,0):U,oe(Z)?(z="",ae!=null&&(z=ae.replace(Y,"$&/")+"/"),y(Z,S,z,"",function(ze){return ze})):Z!=null&&(Se(Z)&&(Z=ce(Z,z+(Z.key==null||f&&f.key===Z.key?"":(""+Z.key).replace(Y,"$&/")+"/")+ae)),S.push(Z)),1;ae=0;var he=U===""?".":U+":";if(oe(f))for(var ue=0;ue<f.length;ue++)U=f[ue],ne=he+Q(U,ue),ae+=y(U,S,z,ne,Z);else if(ue=C(f),typeof ue=="function")for(f=ue.call(f),ue=0;!(U=f.next()).done;)U=U.value,ne=he+Q(U,ue++),ae+=y(U,S,z,ne,Z);else if(ne==="object"){if(typeof f.then=="function")return y(Me(f),S,z,U,Z);throw S=String(f),Error("Objects are not valid as a React child (found: "+(S==="[object Object]"?"object with keys {"+Object.keys(f).join(", ")+"}":S)+"). If you meant to render a collection of children, use an array instead.")}return ae}function le(f,S,z){if(f==null)return f;var U=[],Z=0;return y(f,U,"","",function(ne){return S.call(z,ne,Z++)}),U}function de(f){if(f._status===-1){var S=f._result;S=S(),S.then(function(z){(f._status===0||f._status===-1)&&(f._status=1,f._result=z)},function(z){(f._status===0||f._status===-1)&&(f._status=2,f._result=z)}),f._status===-1&&(f._status=0,f._result=S)}if(f._status===1)return f._result.default;throw f._result}var V=typeof reportError=="function"?reportError:function(f){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var S=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof f=="object"&&f!==null&&typeof f.message=="string"?String(f.message):String(f),error:f});if(!window.dispatchEvent(S))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",f);return}console.error(f)},B={map:le,forEach:function(f,S,z){le(f,function(){S.apply(this,arguments)},z)},count:function(f){var S=0;return le(f,function(){S++}),S},toArray:function(f){return le(f,function(S){return S})||[]},only:function(f){if(!Se(f))throw Error("React.Children.only expected to receive a single React element child.");return f}};return Ce.Activity=g,Ce.Children=B,Ce.Component=J,Ce.Fragment=u,Ce.Profiler=v,Ce.PureComponent=$,Ce.StrictMode=r,Ce.Suspense=x,Ce.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=k,Ce.__COMPILER_RUNTIME={__proto__:null,c:function(f){return k.H.useMemoCache(f)}},Ce.cache=function(f){return function(){return f.apply(null,arguments)}},Ce.cacheSignal=function(){return null},Ce.cloneElement=function(f,S,z){if(f==null)throw Error("The argument must be a React element, but you passed "+f+".");var U=L({},f.props),Z=f.key;if(S!=null)for(ne in S.key!==void 0&&(Z=""+S.key),S)!te.call(S,ne)||ne==="key"||ne==="__self"||ne==="__source"||ne==="ref"&&S.ref===void 0||(U[ne]=S[ne]);var ne=arguments.length-2;if(ne===1)U.children=z;else if(1<ne){for(var ae=Array(ne),he=0;he<ne;he++)ae[he]=arguments[he+2];U.children=ae}return q(f.type,Z,U)},Ce.createContext=function(f){return f={$$typeof:b,_currentValue:f,_currentValue2:f,_threadCount:0,Provider:null,Consumer:null},f.Provider=f,f.Consumer={$$typeof:h,_context:f},f},Ce.createElement=function(f,S,z){var U,Z={},ne=null;if(S!=null)for(U in S.key!==void 0&&(ne=""+S.key),S)te.call(S,U)&&U!=="key"&&U!=="__self"&&U!=="__source"&&(Z[U]=S[U]);var ae=arguments.length-2;if(ae===1)Z.children=z;else if(1<ae){for(var he=Array(ae),ue=0;ue<ae;ue++)he[ue]=arguments[ue+2];Z.children=he}if(f&&f.defaultProps)for(U in ae=f.defaultProps,ae)Z[U]===void 0&&(Z[U]=ae[U]);return q(f,ne,Z)},Ce.createRef=function(){return{current:null}},Ce.forwardRef=function(f){return{$$typeof:M,render:f}},Ce.isValidElement=Se,Ce.lazy=function(f){return{$$typeof:T,_payload:{_status:-1,_result:f},_init:de}},Ce.memo=function(f,S){return{$$typeof:m,type:f,compare:S===void 0?null:S}},Ce.startTransition=function(f){var S=k.T,z={};k.T=z;try{var U=f(),Z=k.S;Z!==null&&Z(z,U),typeof U=="object"&&U!==null&&typeof U.then=="function"&&U.then(G,V)}catch(ne){V(ne)}finally{S!==null&&z.types!==null&&(S.types=z.types),k.T=S}},Ce.unstable_useCacheRefresh=function(){return k.H.useCacheRefresh()},Ce.use=function(f){return k.H.use(f)},Ce.useActionState=function(f,S,z){return k.H.useActionState(f,S,z)},Ce.useCallback=function(f,S){return k.H.useCallback(f,S)},Ce.useContext=function(f){return k.H.useContext(f)},Ce.useDebugValue=function(){},Ce.useDeferredValue=function(f,S){return k.H.useDeferredValue(f,S)},Ce.useEffect=function(f,S){return k.H.useEffect(f,S)},Ce.useEffectEvent=function(f){return k.H.useEffectEvent(f)},Ce.useId=function(){return k.H.useId()},Ce.useImperativeHandle=function(f,S,z){return k.H.useImperativeHandle(f,S,z)},Ce.useInsertionEffect=function(f,S){return k.H.useInsertionEffect(f,S)},Ce.useLayoutEffect=function(f,S){return k.H.useLayoutEffect(f,S)},Ce.useMemo=function(f,S){return k.H.useMemo(f,S)},Ce.useOptimistic=function(f,S){return k.H.useOptimistic(f,S)},Ce.useReducer=function(f,S,z){return k.H.useReducer(f,S,z)},Ce.useRef=function(f){return k.H.useRef(f)},Ce.useState=function(f){return k.H.useState(f)},Ce.useSyncExternalStore=function(f,S,z){return k.H.useSyncExternalStore(f,S,z)},Ce.useTransition=function(){return k.H.useTransition()},Ce.version="19.2.0",Ce}var Ff;function Kr(){return Ff||(Ff=1,Yr.exports=bm()),Yr.exports}var N=Kr();const ym=lh(N);var Xr={exports:{}},mi={},Fr={exports:{}},Gr={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Gf;function xm(){return Gf||(Gf=1,(function(c){function p(y,le){var de=y.length;y.push(le);e:for(;0<de;){var V=de-1>>>1,B=y[V];if(0<v(B,le))y[V]=le,y[de]=B,de=V;else break e}}function u(y){return y.length===0?null:y[0]}function r(y){if(y.length===0)return null;var le=y[0],de=y.pop();if(de!==le){y[0]=de;e:for(var V=0,B=y.length,f=B>>>1;V<f;){var S=2*(V+1)-1,z=y[S],U=S+1,Z=y[U];if(0>v(z,de))U<B&&0>v(Z,z)?(y[V]=Z,y[U]=de,V=U):(y[V]=z,y[S]=de,V=S);else if(U<B&&0>v(Z,de))y[V]=Z,y[U]=de,V=U;else break e}}return le}function v(y,le){var de=y.sortIndex-le.sortIndex;return de!==0?de:y.id-le.id}if(c.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var h=performance;c.unstable_now=function(){return h.now()}}else{var b=Date,M=b.now();c.unstable_now=function(){return b.now()-M}}var x=[],m=[],T=1,g=null,E=3,C=!1,A=!1,L=!1,K=!1,J=typeof setTimeout=="function"?setTimeout:null,ee=typeof clearTimeout=="function"?clearTimeout:null,$=typeof setImmediate<"u"?setImmediate:null;function _(y){for(var le=u(m);le!==null;){if(le.callback===null)r(m);else if(le.startTime<=y)r(m),le.sortIndex=le.expirationTime,p(x,le);else break;le=u(m)}}function oe(y){if(L=!1,_(y),!A)if(u(x)!==null)A=!0,G||(G=!0,we());else{var le=u(m);le!==null&&Me(oe,le.startTime-y)}}var G=!1,k=-1,te=5,q=-1;function ce(){return K?!0:!(c.unstable_now()-q<te)}function Se(){if(K=!1,G){var y=c.unstable_now();q=y;var le=!0;try{e:{A=!1,L&&(L=!1,ee(k),k=-1),C=!0;var de=E;try{t:{for(_(y),g=u(x);g!==null&&!(g.expirationTime>y&&ce());){var V=g.callback;if(typeof V=="function"){g.callback=null,E=g.priorityLevel;var B=V(g.expirationTime<=y);if(y=c.unstable_now(),typeof B=="function"){g.callback=B,_(y),le=!0;break t}g===u(x)&&r(x),_(y)}else r(x);g=u(x)}if(g!==null)le=!0;else{var f=u(m);f!==null&&Me(oe,f.startTime-y),le=!1}}break e}finally{g=null,E=de,C=!1}le=void 0}}finally{le?we():G=!1}}}var we;if(typeof $=="function")we=function(){$(Se)};else if(typeof MessageChannel<"u"){var Y=new MessageChannel,Q=Y.port2;Y.port1.onmessage=Se,we=function(){Q.postMessage(null)}}else we=function(){J(Se,0)};function Me(y,le){k=J(function(){y(c.unstable_now())},le)}c.unstable_IdlePriority=5,c.unstable_ImmediatePriority=1,c.unstable_LowPriority=4,c.unstable_NormalPriority=3,c.unstable_Profiling=null,c.unstable_UserBlockingPriority=2,c.unstable_cancelCallback=function(y){y.callback=null},c.unstable_forceFrameRate=function(y){0>y||125<y?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):te=0<y?Math.floor(1e3/y):5},c.unstable_getCurrentPriorityLevel=function(){return E},c.unstable_next=function(y){switch(E){case 1:case 2:case 3:var le=3;break;default:le=E}var de=E;E=le;try{return y()}finally{E=de}},c.unstable_requestPaint=function(){K=!0},c.unstable_runWithPriority=function(y,le){switch(y){case 1:case 2:case 3:case 4:case 5:break;default:y=3}var de=E;E=y;try{return le()}finally{E=de}},c.unstable_scheduleCallback=function(y,le,de){var V=c.unstable_now();switch(typeof de=="object"&&de!==null?(de=de.delay,de=typeof de=="number"&&0<de?V+de:V):de=V,y){case 1:var B=-1;break;case 2:B=250;break;case 5:B=1073741823;break;case 4:B=1e4;break;default:B=5e3}return B=de+B,y={id:T++,callback:le,priorityLevel:y,startTime:de,expirationTime:B,sortIndex:-1},de>V?(y.sortIndex=de,p(m,y),u(x)===null&&y===u(m)&&(L?(ee(k),k=-1):L=!0,Me(oe,de-V))):(y.sortIndex=B,p(x,y),A||C||(A=!0,G||(G=!0,we()))),y},c.unstable_shouldYield=ce,c.unstable_wrapCallback=function(y){var le=E;return function(){var de=E;E=le;try{return y.apply(this,arguments)}finally{E=de}}}})(Gr)),Gr}var Vf;function vm(){return Vf||(Vf=1,Fr.exports=xm()),Fr.exports}var Vr={exports:{}},zt={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Qf;function wm(){if(Qf)return zt;Qf=1;var c=Kr();function p(x){var m="https://react.dev/errors/"+x;if(1<arguments.length){m+="?args[]="+encodeURIComponent(arguments[1]);for(var T=2;T<arguments.length;T++)m+="&args[]="+encodeURIComponent(arguments[T])}return"Minified React error #"+x+"; visit "+m+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function u(){}var r={d:{f:u,r:function(){throw Error(p(522))},D:u,C:u,L:u,m:u,X:u,S:u,M:u},p:0,findDOMNode:null},v=Symbol.for("react.portal");function h(x,m,T){var g=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:v,key:g==null?null:""+g,children:x,containerInfo:m,implementation:T}}var b=c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function M(x,m){if(x==="font")return"";if(typeof m=="string")return m==="use-credentials"?m:""}return zt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=r,zt.createPortal=function(x,m){var T=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!m||m.nodeType!==1&&m.nodeType!==9&&m.nodeType!==11)throw Error(p(299));return h(x,m,null,T)},zt.flushSync=function(x){var m=b.T,T=r.p;try{if(b.T=null,r.p=2,x)return x()}finally{b.T=m,r.p=T,r.d.f()}},zt.preconnect=function(x,m){typeof x=="string"&&(m?(m=m.crossOrigin,m=typeof m=="string"?m==="use-credentials"?m:"":void 0):m=null,r.d.C(x,m))},zt.prefetchDNS=function(x){typeof x=="string"&&r.d.D(x)},zt.preinit=function(x,m){if(typeof x=="string"&&m&&typeof m.as=="string"){var T=m.as,g=M(T,m.crossOrigin),E=typeof m.integrity=="string"?m.integrity:void 0,C=typeof m.fetchPriority=="string"?m.fetchPriority:void 0;T==="style"?r.d.S(x,typeof m.precedence=="string"?m.precedence:void 0,{crossOrigin:g,integrity:E,fetchPriority:C}):T==="script"&&r.d.X(x,{crossOrigin:g,integrity:E,fetchPriority:C,nonce:typeof m.nonce=="string"?m.nonce:void 0})}},zt.preinitModule=function(x,m){if(typeof x=="string")if(typeof m=="object"&&m!==null){if(m.as==null||m.as==="script"){var T=M(m.as,m.crossOrigin);r.d.M(x,{crossOrigin:T,integrity:typeof m.integrity=="string"?m.integrity:void 0,nonce:typeof m.nonce=="string"?m.nonce:void 0})}}else m==null&&r.d.M(x)},zt.preload=function(x,m){if(typeof x=="string"&&typeof m=="object"&&m!==null&&typeof m.as=="string"){var T=m.as,g=M(T,m.crossOrigin);r.d.L(x,T,{crossOrigin:g,integrity:typeof m.integrity=="string"?m.integrity:void 0,nonce:typeof m.nonce=="string"?m.nonce:void 0,type:typeof m.type=="string"?m.type:void 0,fetchPriority:typeof m.fetchPriority=="string"?m.fetchPriority:void 0,referrerPolicy:typeof m.referrerPolicy=="string"?m.referrerPolicy:void 0,imageSrcSet:typeof m.imageSrcSet=="string"?m.imageSrcSet:void 0,imageSizes:typeof m.imageSizes=="string"?m.imageSizes:void 0,media:typeof m.media=="string"?m.media:void 0})}},zt.preloadModule=function(x,m){if(typeof x=="string")if(m){var T=M(m.as,m.crossOrigin);r.d.m(x,{as:typeof m.as=="string"&&m.as!=="script"?m.as:void 0,crossOrigin:T,integrity:typeof m.integrity=="string"?m.integrity:void 0})}else r.d.m(x)},zt.requestFormReset=function(x){r.d.r(x)},zt.unstable_batchedUpdates=function(x,m){return x(m)},zt.useFormState=function(x,m,T){return b.H.useFormState(x,m,T)},zt.useFormStatus=function(){return b.H.useHostTransitionStatus()},zt.version="19.2.0",zt}var Zf;function Sm(){if(Zf)return Vr.exports;Zf=1;function c(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c)}catch(p){console.error(p)}}return c(),Vr.exports=wm(),Vr.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Pf;function Cm(){if(Pf)return mi;Pf=1;var c=vm(),p=Kr(),u=Sm();function r(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var l=2;l<arguments.length;l++)t+="&args[]="+encodeURIComponent(arguments[l])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function v(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function h(e){var t=e,l=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(l=t.return),e=t.return;while(e)}return t.tag===3?l:null}function b(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function M(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function x(e){if(h(e)!==e)throw Error(r(188))}function m(e){var t=e.alternate;if(!t){if(t=h(e),t===null)throw Error(r(188));return t!==e?null:e}for(var l=e,n=t;;){var a=l.return;if(a===null)break;var i=a.alternate;if(i===null){if(n=a.return,n!==null){l=n;continue}break}if(a.child===i.child){for(i=a.child;i;){if(i===l)return x(a),e;if(i===n)return x(a),t;i=i.sibling}throw Error(r(188))}if(l.return!==n.return)l=a,n=i;else{for(var s=!1,d=a.child;d;){if(d===l){s=!0,l=a,n=i;break}if(d===n){s=!0,n=a,l=i;break}d=d.sibling}if(!s){for(d=i.child;d;){if(d===l){s=!0,l=i,n=a;break}if(d===n){s=!0,n=i,l=a;break}d=d.sibling}if(!s)throw Error(r(189))}}if(l.alternate!==n)throw Error(r(190))}if(l.tag!==3)throw Error(r(188));return l.stateNode.current===l?e:t}function T(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=T(e),t!==null)return t;e=e.sibling}return null}var g=Object.assign,E=Symbol.for("react.element"),C=Symbol.for("react.transitional.element"),A=Symbol.for("react.portal"),L=Symbol.for("react.fragment"),K=Symbol.for("react.strict_mode"),J=Symbol.for("react.profiler"),ee=Symbol.for("react.consumer"),$=Symbol.for("react.context"),_=Symbol.for("react.forward_ref"),oe=Symbol.for("react.suspense"),G=Symbol.for("react.suspense_list"),k=Symbol.for("react.memo"),te=Symbol.for("react.lazy"),q=Symbol.for("react.activity"),ce=Symbol.for("react.memo_cache_sentinel"),Se=Symbol.iterator;function we(e){return e===null||typeof e!="object"?null:(e=Se&&e[Se]||e["@@iterator"],typeof e=="function"?e:null)}var Y=Symbol.for("react.client.reference");function Q(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===Y?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case L:return"Fragment";case J:return"Profiler";case K:return"StrictMode";case oe:return"Suspense";case G:return"SuspenseList";case q:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case A:return"Portal";case $:return e.displayName||"Context";case ee:return(e._context.displayName||"Context")+".Consumer";case _:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case k:return t=e.displayName||null,t!==null?t:Q(e.type)||"Memo";case te:t=e._payload,e=e._init;try{return Q(e(t))}catch{}}return null}var Me=Array.isArray,y=p.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,le=u.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,de={pending:!1,data:null,method:null,action:null},V=[],B=-1;function f(e){return{current:e}}function S(e){0>B||(e.current=V[B],V[B]=null,B--)}function z(e,t){B++,V[B]=e.current,e.current=t}var U=f(null),Z=f(null),ne=f(null),ae=f(null);function he(e,t){switch(z(ne,t),z(Z,e),z(U,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?cf(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=cf(t),e=df(t,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}S(U),z(U,e)}function ue(){S(U),S(Z),S(ne)}function ze(e){e.memoizedState!==null&&z(ae,e);var t=U.current,l=df(t,e.type);t!==l&&(z(Z,e),z(U,l))}function pe(e){Z.current===e&&(S(U),S(Z)),ae.current===e&&(S(ae),di._currentValue=de)}var Te,ie;function re(e){if(Te===void 0)try{throw Error()}catch(l){var t=l.stack.trim().match(/\n( *(at )?)/);Te=t&&t[1]||"",ie=-1<l.stack.indexOf(`
    at`)?" (<anonymous>)":-1<l.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Te+e+ie}var be=!1;function se(e,t){if(!e||be)return"";be=!0;var l=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var n={DetermineComponentFrameRoot:function(){try{if(t){var I=function(){throw Error()};if(Object.defineProperty(I.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(I,[])}catch(F){var O=F}Reflect.construct(e,[],I)}else{try{I.call()}catch(F){O=F}e.call(I.prototype)}}else{try{throw Error()}catch(F){O=F}(I=e())&&typeof I.catch=="function"&&I.catch(function(){})}}catch(F){if(F&&O&&typeof F.stack=="string")return[F.stack,O.stack]}return[null,null]}};n.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var a=Object.getOwnPropertyDescriptor(n.DetermineComponentFrameRoot,"name");a&&a.configurable&&Object.defineProperty(n.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var i=n.DetermineComponentFrameRoot(),s=i[0],d=i[1];if(s&&d){var w=s.split(`
`),H=d.split(`
`);for(a=n=0;n<w.length&&!w[n].includes("DetermineComponentFrameRoot");)n++;for(;a<H.length&&!H[a].includes("DetermineComponentFrameRoot");)a++;if(n===w.length||a===H.length)for(n=w.length-1,a=H.length-1;1<=n&&0<=a&&w[n]!==H[a];)a--;for(;1<=n&&0<=a;n--,a--)if(w[n]!==H[a]){if(n!==1||a!==1)do if(n--,a--,0>a||w[n]!==H[a]){var P=`
`+w[n].replace(" at new "," at ");return e.displayName&&P.includes("<anonymous>")&&(P=P.replace("<anonymous>",e.displayName)),P}while(1<=n&&0<=a);break}}}finally{be=!1,Error.prepareStackTrace=l}return(l=e?e.displayName||e.name:"")?re(l):""}function je(e,t){switch(e.tag){case 26:case 27:case 5:return re(e.type);case 16:return re("Lazy");case 13:return e.child!==t&&t!==null?re("Suspense Fallback"):re("Suspense");case 19:return re("SuspenseList");case 0:case 15:return se(e.type,!1);case 11:return se(e.type.render,!1);case 1:return se(e.type,!0);case 31:return re("Activity");default:return""}}function Ge(e){try{var t="",l=null;do t+=je(e,l),l=e,e=e.return;while(e);return t}catch(n){return`
Error generating stack: `+n.message+`
`+n.stack}}var Ue=Object.prototype.hasOwnProperty,Ke=c.unstable_scheduleCallback,at=c.unstable_cancelCallback,bt=c.unstable_shouldYield,Je=c.unstable_requestPaint,Oe=c.unstable_now,Ve=c.unstable_getCurrentPriorityLevel,tt=c.unstable_ImmediatePriority,it=c.unstable_UserBlockingPriority,ut=c.unstable_NormalPriority,fl=c.unstable_LowPriority,kt=c.unstable_IdlePriority,hl=c.log,vt=c.unstable_setDisableYieldValue,Ft=null,ot=null;function Mt(e){if(typeof hl=="function"&&vt(e),ot&&typeof ot.setStrictMode=="function")try{ot.setStrictMode(Ft,e)}catch{}}var Le=Math.clz32?Math.clz32:yl,Ct=Math.log,Rt=Math.LN2;function yl(e){return e>>>=0,e===0?32:31-(Ct(e)/Rt|0)|0}var At=256,el=262144,Gt=4194304;function Vt(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function jl(e,t,l){var n=e.pendingLanes;if(n===0)return 0;var a=0,i=e.suspendedLanes,s=e.pingedLanes;e=e.warmLanes;var d=n&134217727;return d!==0?(n=d&~i,n!==0?a=Vt(n):(s&=d,s!==0?a=Vt(s):l||(l=d&~e,l!==0&&(a=Vt(l))))):(d=n&~i,d!==0?a=Vt(d):s!==0?a=Vt(s):l||(l=n&~e,l!==0&&(a=Vt(l)))),a===0?0:t!==0&&t!==a&&(t&i)===0&&(i=a&-a,l=t&-t,i>=l||i===32&&(l&4194048)!==0)?t:a}function xl(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function xn(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function vn(){var e=Gt;return Gt<<=1,(Gt&62914560)===0&&(Gt=4194304),e}function We(e){for(var t=[],l=0;31>l;l++)t.push(e);return t}function Dt(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function yt(e,t,l,n,a,i){var s=e.pendingLanes;e.pendingLanes=l,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=l,e.entangledLanes&=l,e.errorRecoveryDisabledLanes&=l,e.shellSuspendCounter=0;var d=e.entanglements,w=e.expirationTimes,H=e.hiddenUpdates;for(l=s&~l;0<l;){var P=31-Le(l),I=1<<P;d[P]=0,w[P]=-1;var O=H[P];if(O!==null)for(H[P]=null,P=0;P<O.length;P++){var F=O[P];F!==null&&(F.lane&=-536870913)}l&=~I}n!==0&&qn(e,n,0),i!==0&&a===0&&e.tag!==0&&(e.suspendedLanes|=i&~(s&~t))}function qn(e,t,l){e.pendingLanes|=t,e.suspendedLanes&=~t;var n=31-Le(t);e.entangledLanes|=t,e.entanglements[n]=e.entanglements[n]|1073741824|l&261930}function Yn(e,t){var l=e.entangledLanes|=t;for(e=e.entanglements;l;){var n=31-Le(l),a=1<<n;a&t|e[n]&t&&(e[n]|=t),l&=~a}}function Xn(e,t){var l=t&-t;return l=(l&42)!==0?1:Nl(l),(l&(e.suspendedLanes|t))!==0?0:l}function Nl(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function X(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function ve(){var e=le.p;return e!==0?e:(e=window.event,e===void 0?32:kf(e.type))}function Ht(e,t){var l=le.p;try{return le.p=e,t()}finally{le.p=l}}var Qt=Math.random().toString(36).slice(2),nt="__reactFiber$"+Qt,ft="__reactProps$"+Qt,tl="__reactContainer$"+Qt,xe="__reactEvents$"+Qt,Ye="__reactListeners$"+Qt,Ot="__reactHandles$"+Qt,Ql="__reactResources$"+Qt,vl="__reactMarker$"+Qt;function Na(e){delete e[nt],delete e[ft],delete e[xe],delete e[Ye],delete e[Ot]}function El(e){var t=e[nt];if(t)return t;for(var l=e.parentNode;l;){if(t=l[tl]||l[nt]){if(l=t.alternate,t.child!==null||l!==null&&l.child!==null)for(e=bf(e);e!==null;){if(l=e[nt])return l;e=bf(e)}return t}e=l,l=e.parentNode}return null}function Zl(e){if(e=e[nt]||e[tl]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function wn(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(r(33))}function Fn(e){var t=e[Ql];return t||(t=e[Ql]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function wt(e){e[vl]=!0}var $r=new Set,Wr={};function Sn(e,t){Gn(e,t),Gn(e+"Capture",t)}function Gn(e,t){for(Wr[e]=t,e=0;e<t.length;e++)$r.add(t[e])}var oh=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Jr={},Ir={};function sh(e){return Ue.call(Ir,e)?!0:Ue.call(Jr,e)?!1:oh.test(e)?Ir[e]=!0:(Jr[e]=!0,!1)}function gi(e,t,l){if(sh(t))if(l===null)e.removeAttribute(t);else{switch(typeof l){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var n=t.toLowerCase().slice(0,5);if(n!=="data-"&&n!=="aria-"){e.removeAttribute(t);return}}e.setAttribute(t,""+l)}}function bi(e,t,l){if(l===null)e.removeAttribute(t);else{switch(typeof l){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttribute(t,""+l)}}function zl(e,t,l,n){if(n===null)e.removeAttribute(l);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(l);return}e.setAttributeNS(t,l,""+n)}}function ll(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function ec(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function rh(e,t,l){var n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var a=n.get,i=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return a.call(this)},set:function(s){l=""+s,i.call(this,s)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return l},setValue:function(s){l=""+s},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function ko(e){if(!e._valueTracker){var t=ec(e)?"checked":"value";e._valueTracker=rh(e,t,""+e[t])}}function tc(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var l=t.getValue(),n="";return e&&(n=ec(e)?e.checked?"true":"false":e.value),e=n,e!==l?(t.setValue(e),!0):!1}function yi(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var ch=/[\n"\\]/g;function nl(e){return e.replace(ch,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function Ro(e,t,l,n,a,i,s,d){e.name="",s!=null&&typeof s!="function"&&typeof s!="symbol"&&typeof s!="boolean"?e.type=s:e.removeAttribute("type"),t!=null?s==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+ll(t)):e.value!==""+ll(t)&&(e.value=""+ll(t)):s!=="submit"&&s!=="reset"||e.removeAttribute("value"),t!=null?Ho(e,s,ll(t)):l!=null?Ho(e,s,ll(l)):n!=null&&e.removeAttribute("value"),a==null&&i!=null&&(e.defaultChecked=!!i),a!=null&&(e.checked=a&&typeof a!="function"&&typeof a!="symbol"),d!=null&&typeof d!="function"&&typeof d!="symbol"&&typeof d!="boolean"?e.name=""+ll(d):e.removeAttribute("name")}function lc(e,t,l,n,a,i,s,d){if(i!=null&&typeof i!="function"&&typeof i!="symbol"&&typeof i!="boolean"&&(e.type=i),t!=null||l!=null){if(!(i!=="submit"&&i!=="reset"||t!=null)){ko(e);return}l=l!=null?""+ll(l):"",t=t!=null?""+ll(t):l,d||t===e.value||(e.value=t),e.defaultValue=t}n=n??a,n=typeof n!="function"&&typeof n!="symbol"&&!!n,e.checked=d?e.checked:!!n,e.defaultChecked=!!n,s!=null&&typeof s!="function"&&typeof s!="symbol"&&typeof s!="boolean"&&(e.name=s),ko(e)}function Ho(e,t,l){t==="number"&&yi(e.ownerDocument)===e||e.defaultValue===""+l||(e.defaultValue=""+l)}function Vn(e,t,l,n){if(e=e.options,t){t={};for(var a=0;a<l.length;a++)t["$"+l[a]]=!0;for(l=0;l<e.length;l++)a=t.hasOwnProperty("$"+e[l].value),e[l].selected!==a&&(e[l].selected=a),a&&n&&(e[l].defaultSelected=!0)}else{for(l=""+ll(l),t=null,a=0;a<e.length;a++){if(e[a].value===l){e[a].selected=!0,n&&(e[a].defaultSelected=!0);return}t!==null||e[a].disabled||(t=e[a])}t!==null&&(t.selected=!0)}}function nc(e,t,l){if(t!=null&&(t=""+ll(t),t!==e.value&&(e.value=t),l==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=l!=null?""+ll(l):""}function ac(e,t,l,n){if(t==null){if(n!=null){if(l!=null)throw Error(r(92));if(Me(n)){if(1<n.length)throw Error(r(93));n=n[0]}l=n}l==null&&(l=""),t=l}l=ll(t),e.defaultValue=l,n=e.textContent,n===l&&n!==""&&n!==null&&(e.value=n),ko(e)}function Qn(e,t){if(t){var l=e.firstChild;if(l&&l===e.lastChild&&l.nodeType===3){l.nodeValue=t;return}}e.textContent=t}var dh=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function ic(e,t,l){var n=t.indexOf("--")===0;l==null||typeof l=="boolean"||l===""?n?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":n?e.setProperty(t,l):typeof l!="number"||l===0||dh.has(t)?t==="float"?e.cssFloat=l:e[t]=(""+l).trim():e[t]=l+"px"}function oc(e,t,l){if(t!=null&&typeof t!="object")throw Error(r(62));if(e=e.style,l!=null){for(var n in l)!l.hasOwnProperty(n)||t!=null&&t.hasOwnProperty(n)||(n.indexOf("--")===0?e.setProperty(n,""):n==="float"?e.cssFloat="":e[n]="");for(var a in t)n=t[a],t.hasOwnProperty(a)&&l[a]!==n&&ic(e,a,n)}else for(var i in t)t.hasOwnProperty(i)&&ic(e,i,t[i])}function Oo(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var uh=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),fh=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function xi(e){return fh.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function Ml(){}var Bo=null;function _o(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Zn=null,Pn=null;function sc(e){var t=Zl(e);if(t&&(e=t.stateNode)){var l=e[ft]||null;e:switch(e=t.stateNode,t.type){case"input":if(Ro(e,l.value,l.defaultValue,l.defaultValue,l.checked,l.defaultChecked,l.type,l.name),t=l.name,l.type==="radio"&&t!=null){for(l=e;l.parentNode;)l=l.parentNode;for(l=l.querySelectorAll('input[name="'+nl(""+t)+'"][type="radio"]'),t=0;t<l.length;t++){var n=l[t];if(n!==e&&n.form===e.form){var a=n[ft]||null;if(!a)throw Error(r(90));Ro(n,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(t=0;t<l.length;t++)n=l[t],n.form===e.form&&tc(n)}break e;case"textarea":nc(e,l.value,l.defaultValue);break e;case"select":t=l.value,t!=null&&Vn(e,!!l.multiple,t,!1)}}}var Uo=!1;function rc(e,t,l){if(Uo)return e(t,l);Uo=!0;try{var n=e(t);return n}finally{if(Uo=!1,(Zn!==null||Pn!==null)&&(oo(),Zn&&(t=Zn,e=Pn,Pn=Zn=null,sc(t),e)))for(t=0;t<e.length;t++)sc(e[t])}}function Ea(e,t){var l=e.stateNode;if(l===null)return null;var n=l[ft]||null;if(n===null)return null;l=n[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(n=!n.disabled)||(e=e.type,n=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!n;break e;default:e=!1}if(e)return null;if(l&&typeof l!="function")throw Error(r(231,t,typeof l));return l}var Al=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),qo=!1;if(Al)try{var za={};Object.defineProperty(za,"passive",{get:function(){qo=!0}}),window.addEventListener("test",za,za),window.removeEventListener("test",za,za)}catch{qo=!1}var Pl=null,Yo=null,vi=null;function cc(){if(vi)return vi;var e,t=Yo,l=t.length,n,a="value"in Pl?Pl.value:Pl.textContent,i=a.length;for(e=0;e<l&&t[e]===a[e];e++);var s=l-e;for(n=1;n<=s&&t[l-n]===a[i-n];n++);return vi=a.slice(e,1<n?1-n:void 0)}function wi(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Si(){return!0}function dc(){return!1}function Bt(e){function t(l,n,a,i,s){this._reactName=l,this._targetInst=a,this.type=n,this.nativeEvent=i,this.target=s,this.currentTarget=null;for(var d in e)e.hasOwnProperty(d)&&(l=e[d],this[d]=l?l(i):i[d]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?Si:dc,this.isPropagationStopped=dc,this}return g(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var l=this.nativeEvent;l&&(l.preventDefault?l.preventDefault():typeof l.returnValue!="unknown"&&(l.returnValue=!1),this.isDefaultPrevented=Si)},stopPropagation:function(){var l=this.nativeEvent;l&&(l.stopPropagation?l.stopPropagation():typeof l.cancelBubble!="unknown"&&(l.cancelBubble=!0),this.isPropagationStopped=Si)},persist:function(){},isPersistent:Si}),t}var Cn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Ci=Bt(Cn),Ma=g({},Cn,{view:0,detail:0}),hh=Bt(Ma),Xo,Fo,Aa,Ti=g({},Ma,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Vo,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Aa&&(Aa&&e.type==="mousemove"?(Xo=e.screenX-Aa.screenX,Fo=e.screenY-Aa.screenY):Fo=Xo=0,Aa=e),Xo)},movementY:function(e){return"movementY"in e?e.movementY:Fo}}),uc=Bt(Ti),ph=g({},Ti,{dataTransfer:0}),mh=Bt(ph),gh=g({},Ma,{relatedTarget:0}),Go=Bt(gh),bh=g({},Cn,{animationName:0,elapsedTime:0,pseudoElement:0}),yh=Bt(bh),xh=g({},Cn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),vh=Bt(xh),wh=g({},Cn,{data:0}),fc=Bt(wh),Sh={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Ch={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Th={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function jh(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Th[e])?!!t[e]:!1}function Vo(){return jh}var Nh=g({},Ma,{key:function(e){if(e.key){var t=Sh[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=wi(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Ch[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Vo,charCode:function(e){return e.type==="keypress"?wi(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?wi(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Eh=Bt(Nh),zh=g({},Ti,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),hc=Bt(zh),Mh=g({},Ma,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Vo}),Ah=Bt(Mh),Dh=g({},Cn,{propertyName:0,elapsedTime:0,pseudoElement:0}),Lh=Bt(Dh),kh=g({},Ti,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Rh=Bt(kh),Hh=g({},Cn,{newState:0,oldState:0}),Oh=Bt(Hh),Bh=[9,13,27,32],Qo=Al&&"CompositionEvent"in window,Da=null;Al&&"documentMode"in document&&(Da=document.documentMode);var _h=Al&&"TextEvent"in window&&!Da,pc=Al&&(!Qo||Da&&8<Da&&11>=Da),mc=" ",gc=!1;function bc(e,t){switch(e){case"keyup":return Bh.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function yc(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Kn=!1;function Uh(e,t){switch(e){case"compositionend":return yc(t);case"keypress":return t.which!==32?null:(gc=!0,mc);case"textInput":return e=t.data,e===mc&&gc?null:e;default:return null}}function qh(e,t){if(Kn)return e==="compositionend"||!Qo&&bc(e,t)?(e=cc(),vi=Yo=Pl=null,Kn=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return pc&&t.locale!=="ko"?null:t.data;default:return null}}var Yh={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function xc(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Yh[e.type]:t==="textarea"}function vc(e,t,l,n){Zn?Pn?Pn.push(n):Pn=[n]:Zn=n,t=po(t,"onChange"),0<t.length&&(l=new Ci("onChange","change",null,l,n),e.push({event:l,listeners:t}))}var La=null,ka=null;function Xh(e){lf(e,0)}function ji(e){var t=wn(e);if(tc(t))return e}function wc(e,t){if(e==="change")return t}var Sc=!1;if(Al){var Zo;if(Al){var Po="oninput"in document;if(!Po){var Cc=document.createElement("div");Cc.setAttribute("oninput","return;"),Po=typeof Cc.oninput=="function"}Zo=Po}else Zo=!1;Sc=Zo&&(!document.documentMode||9<document.documentMode)}function Tc(){La&&(La.detachEvent("onpropertychange",jc),ka=La=null)}function jc(e){if(e.propertyName==="value"&&ji(ka)){var t=[];vc(t,ka,e,_o(e)),rc(Xh,t)}}function Fh(e,t,l){e==="focusin"?(Tc(),La=t,ka=l,La.attachEvent("onpropertychange",jc)):e==="focusout"&&Tc()}function Gh(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return ji(ka)}function Vh(e,t){if(e==="click")return ji(t)}function Qh(e,t){if(e==="input"||e==="change")return ji(t)}function Zh(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Zt=typeof Object.is=="function"?Object.is:Zh;function Ra(e,t){if(Zt(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var l=Object.keys(e),n=Object.keys(t);if(l.length!==n.length)return!1;for(n=0;n<l.length;n++){var a=l[n];if(!Ue.call(t,a)||!Zt(e[a],t[a]))return!1}return!0}function Nc(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Ec(e,t){var l=Nc(e);e=0;for(var n;l;){if(l.nodeType===3){if(n=e+l.textContent.length,e<=t&&n>=t)return{node:l,offset:t-e};e=n}e:{for(;l;){if(l.nextSibling){l=l.nextSibling;break e}l=l.parentNode}l=void 0}l=Nc(l)}}function zc(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?zc(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Mc(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=yi(e.document);t instanceof e.HTMLIFrameElement;){try{var l=typeof t.contentWindow.location.href=="string"}catch{l=!1}if(l)e=t.contentWindow;else break;t=yi(e.document)}return t}function Ko(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}var Ph=Al&&"documentMode"in document&&11>=document.documentMode,$n=null,$o=null,Ha=null,Wo=!1;function Ac(e,t,l){var n=l.window===l?l.document:l.nodeType===9?l:l.ownerDocument;Wo||$n==null||$n!==yi(n)||(n=$n,"selectionStart"in n&&Ko(n)?n={start:n.selectionStart,end:n.selectionEnd}:(n=(n.ownerDocument&&n.ownerDocument.defaultView||window).getSelection(),n={anchorNode:n.anchorNode,anchorOffset:n.anchorOffset,focusNode:n.focusNode,focusOffset:n.focusOffset}),Ha&&Ra(Ha,n)||(Ha=n,n=po($o,"onSelect"),0<n.length&&(t=new Ci("onSelect","select",null,t,l),e.push({event:t,listeners:n}),t.target=$n)))}function Tn(e,t){var l={};return l[e.toLowerCase()]=t.toLowerCase(),l["Webkit"+e]="webkit"+t,l["Moz"+e]="moz"+t,l}var Wn={animationend:Tn("Animation","AnimationEnd"),animationiteration:Tn("Animation","AnimationIteration"),animationstart:Tn("Animation","AnimationStart"),transitionrun:Tn("Transition","TransitionRun"),transitionstart:Tn("Transition","TransitionStart"),transitioncancel:Tn("Transition","TransitionCancel"),transitionend:Tn("Transition","TransitionEnd")},Jo={},Dc={};Al&&(Dc=document.createElement("div").style,"AnimationEvent"in window||(delete Wn.animationend.animation,delete Wn.animationiteration.animation,delete Wn.animationstart.animation),"TransitionEvent"in window||delete Wn.transitionend.transition);function jn(e){if(Jo[e])return Jo[e];if(!Wn[e])return e;var t=Wn[e],l;for(l in t)if(t.hasOwnProperty(l)&&l in Dc)return Jo[e]=t[l];return e}var Lc=jn("animationend"),kc=jn("animationiteration"),Rc=jn("animationstart"),Kh=jn("transitionrun"),$h=jn("transitionstart"),Wh=jn("transitioncancel"),Hc=jn("transitionend"),Oc=new Map,Io="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Io.push("scrollEnd");function pl(e,t){Oc.set(e,t),Sn(t,[e])}var Ni=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},al=[],Jn=0,es=0;function Ei(){for(var e=Jn,t=es=Jn=0;t<e;){var l=al[t];al[t++]=null;var n=al[t];al[t++]=null;var a=al[t];al[t++]=null;var i=al[t];if(al[t++]=null,n!==null&&a!==null){var s=n.pending;s===null?a.next=a:(a.next=s.next,s.next=a),n.pending=a}i!==0&&Bc(l,a,i)}}function zi(e,t,l,n){al[Jn++]=e,al[Jn++]=t,al[Jn++]=l,al[Jn++]=n,es|=n,e.lanes|=n,e=e.alternate,e!==null&&(e.lanes|=n)}function ts(e,t,l,n){return zi(e,t,l,n),Mi(e)}function Nn(e,t){return zi(e,null,null,t),Mi(e)}function Bc(e,t,l){e.lanes|=l;var n=e.alternate;n!==null&&(n.lanes|=l);for(var a=!1,i=e.return;i!==null;)i.childLanes|=l,n=i.alternate,n!==null&&(n.childLanes|=l),i.tag===22&&(e=i.stateNode,e===null||e._visibility&1||(a=!0)),e=i,i=i.return;return e.tag===3?(i=e.stateNode,a&&t!==null&&(a=31-Le(l),e=i.hiddenUpdates,n=e[a],n===null?e[a]=[t]:n.push(t),t.lane=l|536870912),i):null}function Mi(e){if(50<ni)throw ni=0,dr=null,Error(r(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var In={};function Jh(e,t,l,n){this.tag=e,this.key=l,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=n,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Pt(e,t,l,n){return new Jh(e,t,l,n)}function ls(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Dl(e,t){var l=e.alternate;return l===null?(l=Pt(e.tag,t,e.key,e.mode),l.elementType=e.elementType,l.type=e.type,l.stateNode=e.stateNode,l.alternate=e,e.alternate=l):(l.pendingProps=t,l.type=e.type,l.flags=0,l.subtreeFlags=0,l.deletions=null),l.flags=e.flags&65011712,l.childLanes=e.childLanes,l.lanes=e.lanes,l.child=e.child,l.memoizedProps=e.memoizedProps,l.memoizedState=e.memoizedState,l.updateQueue=e.updateQueue,t=e.dependencies,l.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},l.sibling=e.sibling,l.index=e.index,l.ref=e.ref,l.refCleanup=e.refCleanup,l}function _c(e,t){e.flags&=65011714;var l=e.alternate;return l===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=l.childLanes,e.lanes=l.lanes,e.child=l.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=l.memoizedProps,e.memoizedState=l.memoizedState,e.updateQueue=l.updateQueue,e.type=l.type,t=l.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function Ai(e,t,l,n,a,i){var s=0;if(n=e,typeof e=="function")ls(e)&&(s=1);else if(typeof e=="string")s=nm(e,l,U.current)?26:e==="html"||e==="head"||e==="body"?27:5;else e:switch(e){case q:return e=Pt(31,l,t,a),e.elementType=q,e.lanes=i,e;case L:return En(l.children,a,i,t);case K:s=8,a|=24;break;case J:return e=Pt(12,l,t,a|2),e.elementType=J,e.lanes=i,e;case oe:return e=Pt(13,l,t,a),e.elementType=oe,e.lanes=i,e;case G:return e=Pt(19,l,t,a),e.elementType=G,e.lanes=i,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case $:s=10;break e;case ee:s=9;break e;case _:s=11;break e;case k:s=14;break e;case te:s=16,n=null;break e}s=29,l=Error(r(130,e===null?"null":typeof e,"")),n=null}return t=Pt(s,l,t,a),t.elementType=e,t.type=n,t.lanes=i,t}function En(e,t,l,n){return e=Pt(7,e,n,t),e.lanes=l,e}function ns(e,t,l){return e=Pt(6,e,null,t),e.lanes=l,e}function Uc(e){var t=Pt(18,null,null,0);return t.stateNode=e,t}function as(e,t,l){return t=Pt(4,e.children!==null?e.children:[],e.key,t),t.lanes=l,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var qc=new WeakMap;function il(e,t){if(typeof e=="object"&&e!==null){var l=qc.get(e);return l!==void 0?l:(t={value:e,source:t,stack:Ge(t)},qc.set(e,t),t)}return{value:e,source:t,stack:Ge(t)}}var ea=[],ta=0,Di=null,Oa=0,ol=[],sl=0,Kl=null,wl=1,Sl="";function Ll(e,t){ea[ta++]=Oa,ea[ta++]=Di,Di=e,Oa=t}function Yc(e,t,l){ol[sl++]=wl,ol[sl++]=Sl,ol[sl++]=Kl,Kl=e;var n=wl;e=Sl;var a=32-Le(n)-1;n&=~(1<<a),l+=1;var i=32-Le(t)+a;if(30<i){var s=a-a%5;i=(n&(1<<s)-1).toString(32),n>>=s,a-=s,wl=1<<32-Le(t)+a|l<<a|n,Sl=i+e}else wl=1<<i|l<<a|n,Sl=e}function is(e){e.return!==null&&(Ll(e,1),Yc(e,1,0))}function os(e){for(;e===Di;)Di=ea[--ta],ea[ta]=null,Oa=ea[--ta],ea[ta]=null;for(;e===Kl;)Kl=ol[--sl],ol[sl]=null,Sl=ol[--sl],ol[sl]=null,wl=ol[--sl],ol[sl]=null}function Xc(e,t){ol[sl++]=wl,ol[sl++]=Sl,ol[sl++]=Kl,wl=t.id,Sl=t.overflow,Kl=e}var Tt=null,Ie=null,He=!1,$l=null,rl=!1,ss=Error(r(519));function Wl(e){var t=Error(r(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Ba(il(t,e)),ss}function Fc(e){var t=e.stateNode,l=e.type,n=e.memoizedProps;switch(t[nt]=e,t[ft]=n,l){case"dialog":De("cancel",t),De("close",t);break;case"iframe":case"object":case"embed":De("load",t);break;case"video":case"audio":for(l=0;l<ii.length;l++)De(ii[l],t);break;case"source":De("error",t);break;case"img":case"image":case"link":De("error",t),De("load",t);break;case"details":De("toggle",t);break;case"input":De("invalid",t),lc(t,n.value,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name,!0);break;case"select":De("invalid",t);break;case"textarea":De("invalid",t),ac(t,n.value,n.defaultValue,n.children)}l=n.children,typeof l!="string"&&typeof l!="number"&&typeof l!="bigint"||t.textContent===""+l||n.suppressHydrationWarning===!0||sf(t.textContent,l)?(n.popover!=null&&(De("beforetoggle",t),De("toggle",t)),n.onScroll!=null&&De("scroll",t),n.onScrollEnd!=null&&De("scrollend",t),n.onClick!=null&&(t.onclick=Ml),t=!0):t=!1,t||Wl(e,!0)}function Gc(e){for(Tt=e.return;Tt;)switch(Tt.tag){case 5:case 31:case 13:rl=!1;return;case 27:case 3:rl=!0;return;default:Tt=Tt.return}}function la(e){if(e!==Tt)return!1;if(!He)return Gc(e),He=!0,!1;var t=e.tag,l;if((l=t!==3&&t!==27)&&((l=t===5)&&(l=e.type,l=!(l!=="form"&&l!=="button")||jr(e.type,e.memoizedProps)),l=!l),l&&Ie&&Wl(e),Gc(e),t===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(r(317));Ie=gf(e)}else if(t===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(r(317));Ie=gf(e)}else t===27?(t=Ie,fn(e.type)?(e=Ar,Ar=null,Ie=e):Ie=t):Ie=Tt?dl(e.stateNode.nextSibling):null;return!0}function zn(){Ie=Tt=null,He=!1}function rs(){var e=$l;return e!==null&&(Yt===null?Yt=e:Yt.push.apply(Yt,e),$l=null),e}function Ba(e){$l===null?$l=[e]:$l.push(e)}var cs=f(null),Mn=null,kl=null;function Jl(e,t,l){z(cs,t._currentValue),t._currentValue=l}function Rl(e){e._currentValue=cs.current,S(cs)}function ds(e,t,l){for(;e!==null;){var n=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,n!==null&&(n.childLanes|=t)):n!==null&&(n.childLanes&t)!==t&&(n.childLanes|=t),e===l)break;e=e.return}}function us(e,t,l,n){var a=e.child;for(a!==null&&(a.return=e);a!==null;){var i=a.dependencies;if(i!==null){var s=a.child;i=i.firstContext;e:for(;i!==null;){var d=i;i=a;for(var w=0;w<t.length;w++)if(d.context===t[w]){i.lanes|=l,d=i.alternate,d!==null&&(d.lanes|=l),ds(i.return,l,e),n||(s=null);break e}i=d.next}}else if(a.tag===18){if(s=a.return,s===null)throw Error(r(341));s.lanes|=l,i=s.alternate,i!==null&&(i.lanes|=l),ds(s,l,e),s=null}else s=a.child;if(s!==null)s.return=a;else for(s=a;s!==null;){if(s===e){s=null;break}if(a=s.sibling,a!==null){a.return=s.return,s=a;break}s=s.return}a=s}}function na(e,t,l,n){e=null;for(var a=t,i=!1;a!==null;){if(!i){if((a.flags&524288)!==0)i=!0;else if((a.flags&262144)!==0)break}if(a.tag===10){var s=a.alternate;if(s===null)throw Error(r(387));if(s=s.memoizedProps,s!==null){var d=a.type;Zt(a.pendingProps.value,s.value)||(e!==null?e.push(d):e=[d])}}else if(a===ae.current){if(s=a.alternate,s===null)throw Error(r(387));s.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(e!==null?e.push(di):e=[di])}a=a.return}e!==null&&us(t,e,l,n),t.flags|=262144}function Li(e){for(e=e.firstContext;e!==null;){if(!Zt(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function An(e){Mn=e,kl=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function jt(e){return Vc(Mn,e)}function ki(e,t){return Mn===null&&An(e),Vc(e,t)}function Vc(e,t){var l=t._currentValue;if(t={context:t,memoizedValue:l,next:null},kl===null){if(e===null)throw Error(r(308));kl=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else kl=kl.next=t;return l}var Ih=typeof AbortController<"u"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(l,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(l){return l()})}},ep=c.unstable_scheduleCallback,tp=c.unstable_NormalPriority,ht={$$typeof:$,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function fs(){return{controller:new Ih,data:new Map,refCount:0}}function _a(e){e.refCount--,e.refCount===0&&ep(tp,function(){e.controller.abort()})}var Ua=null,hs=0,aa=0,ia=null;function lp(e,t){if(Ua===null){var l=Ua=[];hs=0,aa=gr(),ia={status:"pending",value:void 0,then:function(n){l.push(n)}}}return hs++,t.then(Qc,Qc),t}function Qc(){if(--hs===0&&Ua!==null){ia!==null&&(ia.status="fulfilled");var e=Ua;Ua=null,aa=0,ia=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function np(e,t){var l=[],n={status:"pending",value:null,reason:null,then:function(a){l.push(a)}};return e.then(function(){n.status="fulfilled",n.value=t;for(var a=0;a<l.length;a++)(0,l[a])(t)},function(a){for(n.status="rejected",n.reason=a,a=0;a<l.length;a++)(0,l[a])(void 0)}),n}var Zc=y.S;y.S=function(e,t){Au=Oe(),typeof t=="object"&&t!==null&&typeof t.then=="function"&&lp(e,t),Zc!==null&&Zc(e,t)};var Dn=f(null);function ps(){var e=Dn.current;return e!==null?e:$e.pooledCache}function Ri(e,t){t===null?z(Dn,Dn.current):z(Dn,t.pool)}function Pc(){var e=ps();return e===null?null:{parent:ht._currentValue,pool:e}}var oa=Error(r(460)),ms=Error(r(474)),Hi=Error(r(542)),Oi={then:function(){}};function Kc(e){return e=e.status,e==="fulfilled"||e==="rejected"}function $c(e,t,l){switch(l=e[l],l===void 0?e.push(t):l!==t&&(t.then(Ml,Ml),t=l),t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,Jc(e),e;default:if(typeof t.status=="string")t.then(Ml,Ml);else{if(e=$e,e!==null&&100<e.shellSuspendCounter)throw Error(r(482));e=t,e.status="pending",e.then(function(n){if(t.status==="pending"){var a=t;a.status="fulfilled",a.value=n}},function(n){if(t.status==="pending"){var a=t;a.status="rejected",a.reason=n}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,Jc(e),e}throw kn=t,oa}}function Ln(e){try{var t=e._init;return t(e._payload)}catch(l){throw l!==null&&typeof l=="object"&&typeof l.then=="function"?(kn=l,oa):l}}var kn=null;function Wc(){if(kn===null)throw Error(r(459));var e=kn;return kn=null,e}function Jc(e){if(e===oa||e===Hi)throw Error(r(483))}var sa=null,qa=0;function Bi(e){var t=qa;return qa+=1,sa===null&&(sa=[]),$c(sa,e,t)}function Ya(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function _i(e,t){throw t.$$typeof===E?Error(r(525)):(e=Object.prototype.toString.call(t),Error(r(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)))}function Ic(e){function t(D,j){if(e){var R=D.deletions;R===null?(D.deletions=[j],D.flags|=16):R.push(j)}}function l(D,j){if(!e)return null;for(;j!==null;)t(D,j),j=j.sibling;return null}function n(D){for(var j=new Map;D!==null;)D.key!==null?j.set(D.key,D):j.set(D.index,D),D=D.sibling;return j}function a(D,j){return D=Dl(D,j),D.index=0,D.sibling=null,D}function i(D,j,R){return D.index=R,e?(R=D.alternate,R!==null?(R=R.index,R<j?(D.flags|=67108866,j):R):(D.flags|=67108866,j)):(D.flags|=1048576,j)}function s(D){return e&&D.alternate===null&&(D.flags|=67108866),D}function d(D,j,R,W){return j===null||j.tag!==6?(j=ns(R,D.mode,W),j.return=D,j):(j=a(j,R),j.return=D,j)}function w(D,j,R,W){var ge=R.type;return ge===L?P(D,j,R.props.children,W,R.key):j!==null&&(j.elementType===ge||typeof ge=="object"&&ge!==null&&ge.$$typeof===te&&Ln(ge)===j.type)?(j=a(j,R.props),Ya(j,R),j.return=D,j):(j=Ai(R.type,R.key,R.props,null,D.mode,W),Ya(j,R),j.return=D,j)}function H(D,j,R,W){return j===null||j.tag!==4||j.stateNode.containerInfo!==R.containerInfo||j.stateNode.implementation!==R.implementation?(j=as(R,D.mode,W),j.return=D,j):(j=a(j,R.children||[]),j.return=D,j)}function P(D,j,R,W,ge){return j===null||j.tag!==7?(j=En(R,D.mode,W,ge),j.return=D,j):(j=a(j,R),j.return=D,j)}function I(D,j,R){if(typeof j=="string"&&j!==""||typeof j=="number"||typeof j=="bigint")return j=ns(""+j,D.mode,R),j.return=D,j;if(typeof j=="object"&&j!==null){switch(j.$$typeof){case C:return R=Ai(j.type,j.key,j.props,null,D.mode,R),Ya(R,j),R.return=D,R;case A:return j=as(j,D.mode,R),j.return=D,j;case te:return j=Ln(j),I(D,j,R)}if(Me(j)||we(j))return j=En(j,D.mode,R,null),j.return=D,j;if(typeof j.then=="function")return I(D,Bi(j),R);if(j.$$typeof===$)return I(D,ki(D,j),R);_i(D,j)}return null}function O(D,j,R,W){var ge=j!==null?j.key:null;if(typeof R=="string"&&R!==""||typeof R=="number"||typeof R=="bigint")return ge!==null?null:d(D,j,""+R,W);if(typeof R=="object"&&R!==null){switch(R.$$typeof){case C:return R.key===ge?w(D,j,R,W):null;case A:return R.key===ge?H(D,j,R,W):null;case te:return R=Ln(R),O(D,j,R,W)}if(Me(R)||we(R))return ge!==null?null:P(D,j,R,W,null);if(typeof R.then=="function")return O(D,j,Bi(R),W);if(R.$$typeof===$)return O(D,j,ki(D,R),W);_i(D,R)}return null}function F(D,j,R,W,ge){if(typeof W=="string"&&W!==""||typeof W=="number"||typeof W=="bigint")return D=D.get(R)||null,d(j,D,""+W,ge);if(typeof W=="object"&&W!==null){switch(W.$$typeof){case C:return D=D.get(W.key===null?R:W.key)||null,w(j,D,W,ge);case A:return D=D.get(W.key===null?R:W.key)||null,H(j,D,W,ge);case te:return W=Ln(W),F(D,j,R,W,ge)}if(Me(W)||we(W))return D=D.get(R)||null,P(j,D,W,ge,null);if(typeof W.then=="function")return F(D,j,R,Bi(W),ge);if(W.$$typeof===$)return F(D,j,R,ki(j,W),ge);_i(j,W)}return null}function fe(D,j,R,W){for(var ge=null,Be=null,me=j,Ee=j=0,Re=null;me!==null&&Ee<R.length;Ee++){me.index>Ee?(Re=me,me=null):Re=me.sibling;var _e=O(D,me,R[Ee],W);if(_e===null){me===null&&(me=Re);break}e&&me&&_e.alternate===null&&t(D,me),j=i(_e,j,Ee),Be===null?ge=_e:Be.sibling=_e,Be=_e,me=Re}if(Ee===R.length)return l(D,me),He&&Ll(D,Ee),ge;if(me===null){for(;Ee<R.length;Ee++)me=I(D,R[Ee],W),me!==null&&(j=i(me,j,Ee),Be===null?ge=me:Be.sibling=me,Be=me);return He&&Ll(D,Ee),ge}for(me=n(me);Ee<R.length;Ee++)Re=F(me,D,Ee,R[Ee],W),Re!==null&&(e&&Re.alternate!==null&&me.delete(Re.key===null?Ee:Re.key),j=i(Re,j,Ee),Be===null?ge=Re:Be.sibling=Re,Be=Re);return e&&me.forEach(function(bn){return t(D,bn)}),He&&Ll(D,Ee),ge}function ye(D,j,R,W){if(R==null)throw Error(r(151));for(var ge=null,Be=null,me=j,Ee=j=0,Re=null,_e=R.next();me!==null&&!_e.done;Ee++,_e=R.next()){me.index>Ee?(Re=me,me=null):Re=me.sibling;var bn=O(D,me,_e.value,W);if(bn===null){me===null&&(me=Re);break}e&&me&&bn.alternate===null&&t(D,me),j=i(bn,j,Ee),Be===null?ge=bn:Be.sibling=bn,Be=bn,me=Re}if(_e.done)return l(D,me),He&&Ll(D,Ee),ge;if(me===null){for(;!_e.done;Ee++,_e=R.next())_e=I(D,_e.value,W),_e!==null&&(j=i(_e,j,Ee),Be===null?ge=_e:Be.sibling=_e,Be=_e);return He&&Ll(D,Ee),ge}for(me=n(me);!_e.done;Ee++,_e=R.next())_e=F(me,D,Ee,_e.value,W),_e!==null&&(e&&_e.alternate!==null&&me.delete(_e.key===null?Ee:_e.key),j=i(_e,j,Ee),Be===null?ge=_e:Be.sibling=_e,Be=_e);return e&&me.forEach(function(pm){return t(D,pm)}),He&&Ll(D,Ee),ge}function Pe(D,j,R,W){if(typeof R=="object"&&R!==null&&R.type===L&&R.key===null&&(R=R.props.children),typeof R=="object"&&R!==null){switch(R.$$typeof){case C:e:{for(var ge=R.key;j!==null;){if(j.key===ge){if(ge=R.type,ge===L){if(j.tag===7){l(D,j.sibling),W=a(j,R.props.children),W.return=D,D=W;break e}}else if(j.elementType===ge||typeof ge=="object"&&ge!==null&&ge.$$typeof===te&&Ln(ge)===j.type){l(D,j.sibling),W=a(j,R.props),Ya(W,R),W.return=D,D=W;break e}l(D,j);break}else t(D,j);j=j.sibling}R.type===L?(W=En(R.props.children,D.mode,W,R.key),W.return=D,D=W):(W=Ai(R.type,R.key,R.props,null,D.mode,W),Ya(W,R),W.return=D,D=W)}return s(D);case A:e:{for(ge=R.key;j!==null;){if(j.key===ge)if(j.tag===4&&j.stateNode.containerInfo===R.containerInfo&&j.stateNode.implementation===R.implementation){l(D,j.sibling),W=a(j,R.children||[]),W.return=D,D=W;break e}else{l(D,j);break}else t(D,j);j=j.sibling}W=as(R,D.mode,W),W.return=D,D=W}return s(D);case te:return R=Ln(R),Pe(D,j,R,W)}if(Me(R))return fe(D,j,R,W);if(we(R)){if(ge=we(R),typeof ge!="function")throw Error(r(150));return R=ge.call(R),ye(D,j,R,W)}if(typeof R.then=="function")return Pe(D,j,Bi(R),W);if(R.$$typeof===$)return Pe(D,j,ki(D,R),W);_i(D,R)}return typeof R=="string"&&R!==""||typeof R=="number"||typeof R=="bigint"?(R=""+R,j!==null&&j.tag===6?(l(D,j.sibling),W=a(j,R),W.return=D,D=W):(l(D,j),W=ns(R,D.mode,W),W.return=D,D=W),s(D)):l(D,j)}return function(D,j,R,W){try{qa=0;var ge=Pe(D,j,R,W);return sa=null,ge}catch(me){if(me===oa||me===Hi)throw me;var Be=Pt(29,me,null,D.mode);return Be.lanes=W,Be.return=D,Be}finally{}}}var Rn=Ic(!0),ed=Ic(!1),Il=!1;function gs(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function bs(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function en(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function tn(e,t,l){var n=e.updateQueue;if(n===null)return null;if(n=n.shared,(qe&2)!==0){var a=n.pending;return a===null?t.next=t:(t.next=a.next,a.next=t),n.pending=t,t=Mi(e),Bc(e,null,l),t}return zi(e,n,t,l),Mi(e)}function Xa(e,t,l){if(t=t.updateQueue,t!==null&&(t=t.shared,(l&4194048)!==0)){var n=t.lanes;n&=e.pendingLanes,l|=n,t.lanes=l,Yn(e,l)}}function ys(e,t){var l=e.updateQueue,n=e.alternate;if(n!==null&&(n=n.updateQueue,l===n)){var a=null,i=null;if(l=l.firstBaseUpdate,l!==null){do{var s={lane:l.lane,tag:l.tag,payload:l.payload,callback:null,next:null};i===null?a=i=s:i=i.next=s,l=l.next}while(l!==null);i===null?a=i=t:i=i.next=t}else a=i=t;l={baseState:n.baseState,firstBaseUpdate:a,lastBaseUpdate:i,shared:n.shared,callbacks:n.callbacks},e.updateQueue=l;return}e=l.lastBaseUpdate,e===null?l.firstBaseUpdate=t:e.next=t,l.lastBaseUpdate=t}var xs=!1;function Fa(){if(xs){var e=ia;if(e!==null)throw e}}function Ga(e,t,l,n){xs=!1;var a=e.updateQueue;Il=!1;var i=a.firstBaseUpdate,s=a.lastBaseUpdate,d=a.shared.pending;if(d!==null){a.shared.pending=null;var w=d,H=w.next;w.next=null,s===null?i=H:s.next=H,s=w;var P=e.alternate;P!==null&&(P=P.updateQueue,d=P.lastBaseUpdate,d!==s&&(d===null?P.firstBaseUpdate=H:d.next=H,P.lastBaseUpdate=w))}if(i!==null){var I=a.baseState;s=0,P=H=w=null,d=i;do{var O=d.lane&-536870913,F=O!==d.lane;if(F?(ke&O)===O:(n&O)===O){O!==0&&O===aa&&(xs=!0),P!==null&&(P=P.next={lane:0,tag:d.tag,payload:d.payload,callback:null,next:null});e:{var fe=e,ye=d;O=t;var Pe=l;switch(ye.tag){case 1:if(fe=ye.payload,typeof fe=="function"){I=fe.call(Pe,I,O);break e}I=fe;break e;case 3:fe.flags=fe.flags&-65537|128;case 0:if(fe=ye.payload,O=typeof fe=="function"?fe.call(Pe,I,O):fe,O==null)break e;I=g({},I,O);break e;case 2:Il=!0}}O=d.callback,O!==null&&(e.flags|=64,F&&(e.flags|=8192),F=a.callbacks,F===null?a.callbacks=[O]:F.push(O))}else F={lane:O,tag:d.tag,payload:d.payload,callback:d.callback,next:null},P===null?(H=P=F,w=I):P=P.next=F,s|=O;if(d=d.next,d===null){if(d=a.shared.pending,d===null)break;F=d,d=F.next,F.next=null,a.lastBaseUpdate=F,a.shared.pending=null}}while(!0);P===null&&(w=I),a.baseState=w,a.firstBaseUpdate=H,a.lastBaseUpdate=P,i===null&&(a.shared.lanes=0),sn|=s,e.lanes=s,e.memoizedState=I}}function td(e,t){if(typeof e!="function")throw Error(r(191,e));e.call(t)}function ld(e,t){var l=e.callbacks;if(l!==null)for(e.callbacks=null,e=0;e<l.length;e++)td(l[e],t)}var ra=f(null),Ui=f(0);function nd(e,t){e=Fl,z(Ui,e),z(ra,t),Fl=e|t.baseLanes}function vs(){z(Ui,Fl),z(ra,ra.current)}function ws(){Fl=Ui.current,S(ra),S(Ui)}var Kt=f(null),cl=null;function ln(e){var t=e.alternate;z(ct,ct.current&1),z(Kt,e),cl===null&&(t===null||ra.current!==null||t.memoizedState!==null)&&(cl=e)}function Ss(e){z(ct,ct.current),z(Kt,e),cl===null&&(cl=e)}function ad(e){e.tag===22?(z(ct,ct.current),z(Kt,e),cl===null&&(cl=e)):nn()}function nn(){z(ct,ct.current),z(Kt,Kt.current)}function $t(e){S(Kt),cl===e&&(cl=null),S(ct)}var ct=f(0);function qi(e){for(var t=e;t!==null;){if(t.tag===13){var l=t.memoizedState;if(l!==null&&(l=l.dehydrated,l===null||zr(l)||Mr(l)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder==="forwards"||t.memoizedProps.revealOrder==="backwards"||t.memoizedProps.revealOrder==="unstable_legacy-backwards"||t.memoizedProps.revealOrder==="together")){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Hl=0,Ne=null,Qe=null,pt=null,Yi=!1,ca=!1,Hn=!1,Xi=0,Va=0,da=null,ap=0;function st(){throw Error(r(321))}function Cs(e,t){if(t===null)return!1;for(var l=0;l<t.length&&l<e.length;l++)if(!Zt(e[l],t[l]))return!1;return!0}function Ts(e,t,l,n,a,i){return Hl=i,Ne=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,y.H=e===null||e.memoizedState===null?Yd:Us,Hn=!1,i=l(n,a),Hn=!1,ca&&(i=od(t,l,n,a)),id(e),i}function id(e){y.H=Pa;var t=Qe!==null&&Qe.next!==null;if(Hl=0,pt=Qe=Ne=null,Yi=!1,Va=0,da=null,t)throw Error(r(300));e===null||mt||(e=e.dependencies,e!==null&&Li(e)&&(mt=!0))}function od(e,t,l,n){Ne=e;var a=0;do{if(ca&&(da=null),Va=0,ca=!1,25<=a)throw Error(r(301));if(a+=1,pt=Qe=null,e.updateQueue!=null){var i=e.updateQueue;i.lastEffect=null,i.events=null,i.stores=null,i.memoCache!=null&&(i.memoCache.index=0)}y.H=Xd,i=t(l,n)}while(ca);return i}function ip(){var e=y.H,t=e.useState()[0];return t=typeof t.then=="function"?Qa(t):t,e=e.useState()[0],(Qe!==null?Qe.memoizedState:null)!==e&&(Ne.flags|=1024),t}function js(){var e=Xi!==0;return Xi=0,e}function Ns(e,t,l){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~l}function Es(e){if(Yi){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}Yi=!1}Hl=0,pt=Qe=Ne=null,ca=!1,Va=Xi=0,da=null}function Lt(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return pt===null?Ne.memoizedState=pt=e:pt=pt.next=e,pt}function dt(){if(Qe===null){var e=Ne.alternate;e=e!==null?e.memoizedState:null}else e=Qe.next;var t=pt===null?Ne.memoizedState:pt.next;if(t!==null)pt=t,Qe=e;else{if(e===null)throw Ne.alternate===null?Error(r(467)):Error(r(310));Qe=e,e={memoizedState:Qe.memoizedState,baseState:Qe.baseState,baseQueue:Qe.baseQueue,queue:Qe.queue,next:null},pt===null?Ne.memoizedState=pt=e:pt=pt.next=e}return pt}function Fi(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Qa(e){var t=Va;return Va+=1,da===null&&(da=[]),e=$c(da,e,t),t=Ne,(pt===null?t.memoizedState:pt.next)===null&&(t=t.alternate,y.H=t===null||t.memoizedState===null?Yd:Us),e}function Gi(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return Qa(e);if(e.$$typeof===$)return jt(e)}throw Error(r(438,String(e)))}function zs(e){var t=null,l=Ne.updateQueue;if(l!==null&&(t=l.memoCache),t==null){var n=Ne.alternate;n!==null&&(n=n.updateQueue,n!==null&&(n=n.memoCache,n!=null&&(t={data:n.data.map(function(a){return a.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),l===null&&(l=Fi(),Ne.updateQueue=l),l.memoCache=t,l=t.data[t.index],l===void 0)for(l=t.data[t.index]=Array(e),n=0;n<e;n++)l[n]=ce;return t.index++,l}function Ol(e,t){return typeof t=="function"?t(e):t}function Vi(e){var t=dt();return Ms(t,Qe,e)}function Ms(e,t,l){var n=e.queue;if(n===null)throw Error(r(311));n.lastRenderedReducer=l;var a=e.baseQueue,i=n.pending;if(i!==null){if(a!==null){var s=a.next;a.next=i.next,i.next=s}t.baseQueue=a=i,n.pending=null}if(i=e.baseState,a===null)e.memoizedState=i;else{t=a.next;var d=s=null,w=null,H=t,P=!1;do{var I=H.lane&-536870913;if(I!==H.lane?(ke&I)===I:(Hl&I)===I){var O=H.revertLane;if(O===0)w!==null&&(w=w.next={lane:0,revertLane:0,gesture:null,action:H.action,hasEagerState:H.hasEagerState,eagerState:H.eagerState,next:null}),I===aa&&(P=!0);else if((Hl&O)===O){H=H.next,O===aa&&(P=!0);continue}else I={lane:0,revertLane:H.revertLane,gesture:null,action:H.action,hasEagerState:H.hasEagerState,eagerState:H.eagerState,next:null},w===null?(d=w=I,s=i):w=w.next=I,Ne.lanes|=O,sn|=O;I=H.action,Hn&&l(i,I),i=H.hasEagerState?H.eagerState:l(i,I)}else O={lane:I,revertLane:H.revertLane,gesture:H.gesture,action:H.action,hasEagerState:H.hasEagerState,eagerState:H.eagerState,next:null},w===null?(d=w=O,s=i):w=w.next=O,Ne.lanes|=I,sn|=I;H=H.next}while(H!==null&&H!==t);if(w===null?s=i:w.next=d,!Zt(i,e.memoizedState)&&(mt=!0,P&&(l=ia,l!==null)))throw l;e.memoizedState=i,e.baseState=s,e.baseQueue=w,n.lastRenderedState=i}return a===null&&(n.lanes=0),[e.memoizedState,n.dispatch]}function As(e){var t=dt(),l=t.queue;if(l===null)throw Error(r(311));l.lastRenderedReducer=e;var n=l.dispatch,a=l.pending,i=t.memoizedState;if(a!==null){l.pending=null;var s=a=a.next;do i=e(i,s.action),s=s.next;while(s!==a);Zt(i,t.memoizedState)||(mt=!0),t.memoizedState=i,t.baseQueue===null&&(t.baseState=i),l.lastRenderedState=i}return[i,n]}function sd(e,t,l){var n=Ne,a=dt(),i=He;if(i){if(l===void 0)throw Error(r(407));l=l()}else l=t();var s=!Zt((Qe||a).memoizedState,l);if(s&&(a.memoizedState=l,mt=!0),a=a.queue,ks(dd.bind(null,n,a,e),[e]),a.getSnapshot!==t||s||pt!==null&&pt.memoizedState.tag&1){if(n.flags|=2048,ua(9,{destroy:void 0},cd.bind(null,n,a,l,t),null),$e===null)throw Error(r(349));i||(Hl&127)!==0||rd(n,t,l)}return l}function rd(e,t,l){e.flags|=16384,e={getSnapshot:t,value:l},t=Ne.updateQueue,t===null?(t=Fi(),Ne.updateQueue=t,t.stores=[e]):(l=t.stores,l===null?t.stores=[e]:l.push(e))}function cd(e,t,l,n){t.value=l,t.getSnapshot=n,ud(t)&&fd(e)}function dd(e,t,l){return l(function(){ud(t)&&fd(e)})}function ud(e){var t=e.getSnapshot;e=e.value;try{var l=t();return!Zt(e,l)}catch{return!0}}function fd(e){var t=Nn(e,2);t!==null&&Xt(t,e,2)}function Ds(e){var t=Lt();if(typeof e=="function"){var l=e;if(e=l(),Hn){Mt(!0);try{l()}finally{Mt(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ol,lastRenderedState:e},t}function hd(e,t,l,n){return e.baseState=l,Ms(e,Qe,typeof n=="function"?n:Ol)}function op(e,t,l,n,a){if(Pi(e))throw Error(r(485));if(e=t.action,e!==null){var i={payload:a,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(s){i.listeners.push(s)}};y.T!==null?l(!0):i.isTransition=!1,n(i),l=t.pending,l===null?(i.next=t.pending=i,pd(t,i)):(i.next=l.next,t.pending=l.next=i)}}function pd(e,t){var l=t.action,n=t.payload,a=e.state;if(t.isTransition){var i=y.T,s={};y.T=s;try{var d=l(a,n),w=y.S;w!==null&&w(s,d),md(e,t,d)}catch(H){Ls(e,t,H)}finally{i!==null&&s.types!==null&&(i.types=s.types),y.T=i}}else try{i=l(a,n),md(e,t,i)}catch(H){Ls(e,t,H)}}function md(e,t,l){l!==null&&typeof l=="object"&&typeof l.then=="function"?l.then(function(n){gd(e,t,n)},function(n){return Ls(e,t,n)}):gd(e,t,l)}function gd(e,t,l){t.status="fulfilled",t.value=l,bd(t),e.state=l,t=e.pending,t!==null&&(l=t.next,l===t?e.pending=null:(l=l.next,t.next=l,pd(e,l)))}function Ls(e,t,l){var n=e.pending;if(e.pending=null,n!==null){n=n.next;do t.status="rejected",t.reason=l,bd(t),t=t.next;while(t!==n)}e.action=null}function bd(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function yd(e,t){return t}function xd(e,t){if(He){var l=$e.formState;if(l!==null){e:{var n=Ne;if(He){if(Ie){t:{for(var a=Ie,i=rl;a.nodeType!==8;){if(!i){a=null;break t}if(a=dl(a.nextSibling),a===null){a=null;break t}}i=a.data,a=i==="F!"||i==="F"?a:null}if(a){Ie=dl(a.nextSibling),n=a.data==="F!";break e}}Wl(n)}n=!1}n&&(t=l[0])}}return l=Lt(),l.memoizedState=l.baseState=t,n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:yd,lastRenderedState:t},l.queue=n,l=_d.bind(null,Ne,n),n.dispatch=l,n=Ds(!1),i=_s.bind(null,Ne,!1,n.queue),n=Lt(),a={state:t,dispatch:null,action:e,pending:null},n.queue=a,l=op.bind(null,Ne,a,i,l),a.dispatch=l,n.memoizedState=e,[t,l,!1]}function vd(e){var t=dt();return wd(t,Qe,e)}function wd(e,t,l){if(t=Ms(e,t,yd)[0],e=Vi(Ol)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var n=Qa(t)}catch(s){throw s===oa?Hi:s}else n=t;t=dt();var a=t.queue,i=a.dispatch;return l!==t.memoizedState&&(Ne.flags|=2048,ua(9,{destroy:void 0},sp.bind(null,a,l),null)),[n,i,e]}function sp(e,t){e.action=t}function Sd(e){var t=dt(),l=Qe;if(l!==null)return wd(t,l,e);dt(),t=t.memoizedState,l=dt();var n=l.queue.dispatch;return l.memoizedState=e,[t,n,!1]}function ua(e,t,l,n){return e={tag:e,create:l,deps:n,inst:t,next:null},t=Ne.updateQueue,t===null&&(t=Fi(),Ne.updateQueue=t),l=t.lastEffect,l===null?t.lastEffect=e.next=e:(n=l.next,l.next=e,e.next=n,t.lastEffect=e),e}function Cd(){return dt().memoizedState}function Qi(e,t,l,n){var a=Lt();Ne.flags|=e,a.memoizedState=ua(1|t,{destroy:void 0},l,n===void 0?null:n)}function Zi(e,t,l,n){var a=dt();n=n===void 0?null:n;var i=a.memoizedState.inst;Qe!==null&&n!==null&&Cs(n,Qe.memoizedState.deps)?a.memoizedState=ua(t,i,l,n):(Ne.flags|=e,a.memoizedState=ua(1|t,i,l,n))}function Td(e,t){Qi(8390656,8,e,t)}function ks(e,t){Zi(2048,8,e,t)}function rp(e){Ne.flags|=4;var t=Ne.updateQueue;if(t===null)t=Fi(),Ne.updateQueue=t,t.events=[e];else{var l=t.events;l===null?t.events=[e]:l.push(e)}}function jd(e){var t=dt().memoizedState;return rp({ref:t,nextImpl:e}),function(){if((qe&2)!==0)throw Error(r(440));return t.impl.apply(void 0,arguments)}}function Nd(e,t){return Zi(4,2,e,t)}function Ed(e,t){return Zi(4,4,e,t)}function zd(e,t){if(typeof t=="function"){e=e();var l=t(e);return function(){typeof l=="function"?l():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Md(e,t,l){l=l!=null?l.concat([e]):null,Zi(4,4,zd.bind(null,t,e),l)}function Rs(){}function Ad(e,t){var l=dt();t=t===void 0?null:t;var n=l.memoizedState;return t!==null&&Cs(t,n[1])?n[0]:(l.memoizedState=[e,t],e)}function Dd(e,t){var l=dt();t=t===void 0?null:t;var n=l.memoizedState;if(t!==null&&Cs(t,n[1]))return n[0];if(n=e(),Hn){Mt(!0);try{e()}finally{Mt(!1)}}return l.memoizedState=[n,t],n}function Hs(e,t,l){return l===void 0||(Hl&1073741824)!==0&&(ke&261930)===0?e.memoizedState=t:(e.memoizedState=l,e=Lu(),Ne.lanes|=e,sn|=e,l)}function Ld(e,t,l,n){return Zt(l,t)?l:ra.current!==null?(e=Hs(e,l,n),Zt(e,t)||(mt=!0),e):(Hl&42)===0||(Hl&1073741824)!==0&&(ke&261930)===0?(mt=!0,e.memoizedState=l):(e=Lu(),Ne.lanes|=e,sn|=e,t)}function kd(e,t,l,n,a){var i=le.p;le.p=i!==0&&8>i?i:8;var s=y.T,d={};y.T=d,_s(e,!1,t,l);try{var w=a(),H=y.S;if(H!==null&&H(d,w),w!==null&&typeof w=="object"&&typeof w.then=="function"){var P=np(w,n);Za(e,t,P,It(e))}else Za(e,t,n,It(e))}catch(I){Za(e,t,{then:function(){},status:"rejected",reason:I},It())}finally{le.p=i,s!==null&&d.types!==null&&(s.types=d.types),y.T=s}}function cp(){}function Os(e,t,l,n){if(e.tag!==5)throw Error(r(476));var a=Rd(e).queue;kd(e,a,t,de,l===null?cp:function(){return Hd(e),l(n)})}function Rd(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:de,baseState:de,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ol,lastRenderedState:de},next:null};var l={};return t.next={memoizedState:l,baseState:l,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ol,lastRenderedState:l},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function Hd(e){var t=Rd(e);t.next===null&&(t=e.alternate.memoizedState),Za(e,t.next.queue,{},It())}function Bs(){return jt(di)}function Od(){return dt().memoizedState}function Bd(){return dt().memoizedState}function dp(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var l=It();e=en(l);var n=tn(t,e,l);n!==null&&(Xt(n,t,l),Xa(n,t,l)),t={cache:fs()},e.payload=t;return}t=t.return}}function up(e,t,l){var n=It();l={lane:n,revertLane:0,gesture:null,action:l,hasEagerState:!1,eagerState:null,next:null},Pi(e)?Ud(t,l):(l=ts(e,t,l,n),l!==null&&(Xt(l,e,n),qd(l,t,n)))}function _d(e,t,l){var n=It();Za(e,t,l,n)}function Za(e,t,l,n){var a={lane:n,revertLane:0,gesture:null,action:l,hasEagerState:!1,eagerState:null,next:null};if(Pi(e))Ud(t,a);else{var i=e.alternate;if(e.lanes===0&&(i===null||i.lanes===0)&&(i=t.lastRenderedReducer,i!==null))try{var s=t.lastRenderedState,d=i(s,l);if(a.hasEagerState=!0,a.eagerState=d,Zt(d,s))return zi(e,t,a,0),$e===null&&Ei(),!1}catch{}finally{}if(l=ts(e,t,a,n),l!==null)return Xt(l,e,n),qd(l,t,n),!0}return!1}function _s(e,t,l,n){if(n={lane:2,revertLane:gr(),gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},Pi(e)){if(t)throw Error(r(479))}else t=ts(e,l,n,2),t!==null&&Xt(t,e,2)}function Pi(e){var t=e.alternate;return e===Ne||t!==null&&t===Ne}function Ud(e,t){ca=Yi=!0;var l=e.pending;l===null?t.next=t:(t.next=l.next,l.next=t),e.pending=t}function qd(e,t,l){if((l&4194048)!==0){var n=t.lanes;n&=e.pendingLanes,l|=n,t.lanes=l,Yn(e,l)}}var Pa={readContext:jt,use:Gi,useCallback:st,useContext:st,useEffect:st,useImperativeHandle:st,useLayoutEffect:st,useInsertionEffect:st,useMemo:st,useReducer:st,useRef:st,useState:st,useDebugValue:st,useDeferredValue:st,useTransition:st,useSyncExternalStore:st,useId:st,useHostTransitionStatus:st,useFormState:st,useActionState:st,useOptimistic:st,useMemoCache:st,useCacheRefresh:st};Pa.useEffectEvent=st;var Yd={readContext:jt,use:Gi,useCallback:function(e,t){return Lt().memoizedState=[e,t===void 0?null:t],e},useContext:jt,useEffect:Td,useImperativeHandle:function(e,t,l){l=l!=null?l.concat([e]):null,Qi(4194308,4,zd.bind(null,t,e),l)},useLayoutEffect:function(e,t){return Qi(4194308,4,e,t)},useInsertionEffect:function(e,t){Qi(4,2,e,t)},useMemo:function(e,t){var l=Lt();t=t===void 0?null:t;var n=e();if(Hn){Mt(!0);try{e()}finally{Mt(!1)}}return l.memoizedState=[n,t],n},useReducer:function(e,t,l){var n=Lt();if(l!==void 0){var a=l(t);if(Hn){Mt(!0);try{l(t)}finally{Mt(!1)}}}else a=t;return n.memoizedState=n.baseState=a,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:a},n.queue=e,e=e.dispatch=up.bind(null,Ne,e),[n.memoizedState,e]},useRef:function(e){var t=Lt();return e={current:e},t.memoizedState=e},useState:function(e){e=Ds(e);var t=e.queue,l=_d.bind(null,Ne,t);return t.dispatch=l,[e.memoizedState,l]},useDebugValue:Rs,useDeferredValue:function(e,t){var l=Lt();return Hs(l,e,t)},useTransition:function(){var e=Ds(!1);return e=kd.bind(null,Ne,e.queue,!0,!1),Lt().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,l){var n=Ne,a=Lt();if(He){if(l===void 0)throw Error(r(407));l=l()}else{if(l=t(),$e===null)throw Error(r(349));(ke&127)!==0||rd(n,t,l)}a.memoizedState=l;var i={value:l,getSnapshot:t};return a.queue=i,Td(dd.bind(null,n,i,e),[e]),n.flags|=2048,ua(9,{destroy:void 0},cd.bind(null,n,i,l,t),null),l},useId:function(){var e=Lt(),t=$e.identifierPrefix;if(He){var l=Sl,n=wl;l=(n&~(1<<32-Le(n)-1)).toString(32)+l,t="_"+t+"R_"+l,l=Xi++,0<l&&(t+="H"+l.toString(32)),t+="_"}else l=ap++,t="_"+t+"r_"+l.toString(32)+"_";return e.memoizedState=t},useHostTransitionStatus:Bs,useFormState:xd,useActionState:xd,useOptimistic:function(e){var t=Lt();t.memoizedState=t.baseState=e;var l={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=l,t=_s.bind(null,Ne,!0,l),l.dispatch=t,[e,t]},useMemoCache:zs,useCacheRefresh:function(){return Lt().memoizedState=dp.bind(null,Ne)},useEffectEvent:function(e){var t=Lt(),l={impl:e};return t.memoizedState=l,function(){if((qe&2)!==0)throw Error(r(440));return l.impl.apply(void 0,arguments)}}},Us={readContext:jt,use:Gi,useCallback:Ad,useContext:jt,useEffect:ks,useImperativeHandle:Md,useInsertionEffect:Nd,useLayoutEffect:Ed,useMemo:Dd,useReducer:Vi,useRef:Cd,useState:function(){return Vi(Ol)},useDebugValue:Rs,useDeferredValue:function(e,t){var l=dt();return Ld(l,Qe.memoizedState,e,t)},useTransition:function(){var e=Vi(Ol)[0],t=dt().memoizedState;return[typeof e=="boolean"?e:Qa(e),t]},useSyncExternalStore:sd,useId:Od,useHostTransitionStatus:Bs,useFormState:vd,useActionState:vd,useOptimistic:function(e,t){var l=dt();return hd(l,Qe,e,t)},useMemoCache:zs,useCacheRefresh:Bd};Us.useEffectEvent=jd;var Xd={readContext:jt,use:Gi,useCallback:Ad,useContext:jt,useEffect:ks,useImperativeHandle:Md,useInsertionEffect:Nd,useLayoutEffect:Ed,useMemo:Dd,useReducer:As,useRef:Cd,useState:function(){return As(Ol)},useDebugValue:Rs,useDeferredValue:function(e,t){var l=dt();return Qe===null?Hs(l,e,t):Ld(l,Qe.memoizedState,e,t)},useTransition:function(){var e=As(Ol)[0],t=dt().memoizedState;return[typeof e=="boolean"?e:Qa(e),t]},useSyncExternalStore:sd,useId:Od,useHostTransitionStatus:Bs,useFormState:Sd,useActionState:Sd,useOptimistic:function(e,t){var l=dt();return Qe!==null?hd(l,Qe,e,t):(l.baseState=e,[e,l.queue.dispatch])},useMemoCache:zs,useCacheRefresh:Bd};Xd.useEffectEvent=jd;function qs(e,t,l,n){t=e.memoizedState,l=l(n,t),l=l==null?t:g({},t,l),e.memoizedState=l,e.lanes===0&&(e.updateQueue.baseState=l)}var Ys={enqueueSetState:function(e,t,l){e=e._reactInternals;var n=It(),a=en(n);a.payload=t,l!=null&&(a.callback=l),t=tn(e,a,n),t!==null&&(Xt(t,e,n),Xa(t,e,n))},enqueueReplaceState:function(e,t,l){e=e._reactInternals;var n=It(),a=en(n);a.tag=1,a.payload=t,l!=null&&(a.callback=l),t=tn(e,a,n),t!==null&&(Xt(t,e,n),Xa(t,e,n))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var l=It(),n=en(l);n.tag=2,t!=null&&(n.callback=t),t=tn(e,n,l),t!==null&&(Xt(t,e,l),Xa(t,e,l))}};function Fd(e,t,l,n,a,i,s){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(n,i,s):t.prototype&&t.prototype.isPureReactComponent?!Ra(l,n)||!Ra(a,i):!0}function Gd(e,t,l,n){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(l,n),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(l,n),t.state!==e&&Ys.enqueueReplaceState(t,t.state,null)}function On(e,t){var l=t;if("ref"in t){l={};for(var n in t)n!=="ref"&&(l[n]=t[n])}if(e=e.defaultProps){l===t&&(l=g({},l));for(var a in e)l[a]===void 0&&(l[a]=e[a])}return l}function Vd(e){Ni(e)}function Qd(e){console.error(e)}function Zd(e){Ni(e)}function Ki(e,t){try{var l=e.onUncaughtError;l(t.value,{componentStack:t.stack})}catch(n){setTimeout(function(){throw n})}}function Pd(e,t,l){try{var n=e.onCaughtError;n(l.value,{componentStack:l.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(a){setTimeout(function(){throw a})}}function Xs(e,t,l){return l=en(l),l.tag=3,l.payload={element:null},l.callback=function(){Ki(e,t)},l}function Kd(e){return e=en(e),e.tag=3,e}function $d(e,t,l,n){var a=l.type.getDerivedStateFromError;if(typeof a=="function"){var i=n.value;e.payload=function(){return a(i)},e.callback=function(){Pd(t,l,n)}}var s=l.stateNode;s!==null&&typeof s.componentDidCatch=="function"&&(e.callback=function(){Pd(t,l,n),typeof a!="function"&&(rn===null?rn=new Set([this]):rn.add(this));var d=n.stack;this.componentDidCatch(n.value,{componentStack:d!==null?d:""})})}function fp(e,t,l,n,a){if(l.flags|=32768,n!==null&&typeof n=="object"&&typeof n.then=="function"){if(t=l.alternate,t!==null&&na(t,l,a,!0),l=Kt.current,l!==null){switch(l.tag){case 31:case 13:return cl===null?so():l.alternate===null&&rt===0&&(rt=3),l.flags&=-257,l.flags|=65536,l.lanes=a,n===Oi?l.flags|=16384:(t=l.updateQueue,t===null?l.updateQueue=new Set([n]):t.add(n),hr(e,n,a)),!1;case 22:return l.flags|=65536,n===Oi?l.flags|=16384:(t=l.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([n])},l.updateQueue=t):(l=t.retryQueue,l===null?t.retryQueue=new Set([n]):l.add(n)),hr(e,n,a)),!1}throw Error(r(435,l.tag))}return hr(e,n,a),so(),!1}if(He)return t=Kt.current,t!==null?((t.flags&65536)===0&&(t.flags|=256),t.flags|=65536,t.lanes=a,n!==ss&&(e=Error(r(422),{cause:n}),Ba(il(e,l)))):(n!==ss&&(t=Error(r(423),{cause:n}),Ba(il(t,l))),e=e.current.alternate,e.flags|=65536,a&=-a,e.lanes|=a,n=il(n,l),a=Xs(e.stateNode,n,a),ys(e,a),rt!==4&&(rt=2)),!1;var i=Error(r(520),{cause:n});if(i=il(i,l),li===null?li=[i]:li.push(i),rt!==4&&(rt=2),t===null)return!0;n=il(n,l),l=t;do{switch(l.tag){case 3:return l.flags|=65536,e=a&-a,l.lanes|=e,e=Xs(l.stateNode,n,e),ys(l,e),!1;case 1:if(t=l.type,i=l.stateNode,(l.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||i!==null&&typeof i.componentDidCatch=="function"&&(rn===null||!rn.has(i))))return l.flags|=65536,a&=-a,l.lanes|=a,a=Kd(a),$d(a,e,l,n),ys(l,a),!1}l=l.return}while(l!==null);return!1}var Fs=Error(r(461)),mt=!1;function Nt(e,t,l,n){t.child=e===null?ed(t,null,l,n):Rn(t,e.child,l,n)}function Wd(e,t,l,n,a){l=l.render;var i=t.ref;if("ref"in n){var s={};for(var d in n)d!=="ref"&&(s[d]=n[d])}else s=n;return An(t),n=Ts(e,t,l,s,i,a),d=js(),e!==null&&!mt?(Ns(e,t,a),Bl(e,t,a)):(He&&d&&is(t),t.flags|=1,Nt(e,t,n,a),t.child)}function Jd(e,t,l,n,a){if(e===null){var i=l.type;return typeof i=="function"&&!ls(i)&&i.defaultProps===void 0&&l.compare===null?(t.tag=15,t.type=i,Id(e,t,i,n,a)):(e=Ai(l.type,null,n,t,t.mode,a),e.ref=t.ref,e.return=t,t.child=e)}if(i=e.child,!Ws(e,a)){var s=i.memoizedProps;if(l=l.compare,l=l!==null?l:Ra,l(s,n)&&e.ref===t.ref)return Bl(e,t,a)}return t.flags|=1,e=Dl(i,n),e.ref=t.ref,e.return=t,t.child=e}function Id(e,t,l,n,a){if(e!==null){var i=e.memoizedProps;if(Ra(i,n)&&e.ref===t.ref)if(mt=!1,t.pendingProps=n=i,Ws(e,a))(e.flags&131072)!==0&&(mt=!0);else return t.lanes=e.lanes,Bl(e,t,a)}return Gs(e,t,l,n,a)}function eu(e,t,l,n){var a=n.children,i=e!==null?e.memoizedState:null;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),n.mode==="hidden"){if((t.flags&128)!==0){if(i=i!==null?i.baseLanes|l:l,e!==null){for(n=t.child=e.child,a=0;n!==null;)a=a|n.lanes|n.childLanes,n=n.sibling;n=a&~i}else n=0,t.child=null;return tu(e,t,i,l,n)}if((l&536870912)!==0)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&Ri(t,i!==null?i.cachePool:null),i!==null?nd(t,i):vs(),ad(t);else return n=t.lanes=536870912,tu(e,t,i!==null?i.baseLanes|l:l,l,n)}else i!==null?(Ri(t,i.cachePool),nd(t,i),nn(),t.memoizedState=null):(e!==null&&Ri(t,null),vs(),nn());return Nt(e,t,a,l),t.child}function Ka(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function tu(e,t,l,n,a){var i=ps();return i=i===null?null:{parent:ht._currentValue,pool:i},t.memoizedState={baseLanes:l,cachePool:i},e!==null&&Ri(t,null),vs(),ad(t),e!==null&&na(e,t,n,!0),t.childLanes=a,null}function $i(e,t){return t=Ji({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function lu(e,t,l){return Rn(t,e.child,null,l),e=$i(t,t.pendingProps),e.flags|=2,$t(t),t.memoizedState=null,e}function hp(e,t,l){var n=t.pendingProps,a=(t.flags&128)!==0;if(t.flags&=-129,e===null){if(He){if(n.mode==="hidden")return e=$i(t,n),t.lanes=536870912,Ka(null,e);if(Ss(t),(e=Ie)?(e=mf(e,rl),e=e!==null&&e.data==="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Kl!==null?{id:wl,overflow:Sl}:null,retryLane:536870912,hydrationErrors:null},l=Uc(e),l.return=t,t.child=l,Tt=t,Ie=null)):e=null,e===null)throw Wl(t);return t.lanes=536870912,null}return $i(t,n)}var i=e.memoizedState;if(i!==null){var s=i.dehydrated;if(Ss(t),a)if(t.flags&256)t.flags&=-257,t=lu(e,t,l);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(r(558));else if(mt||na(e,t,l,!1),a=(l&e.childLanes)!==0,mt||a){if(n=$e,n!==null&&(s=Xn(n,l),s!==0&&s!==i.retryLane))throw i.retryLane=s,Nn(e,s),Xt(n,e,s),Fs;so(),t=lu(e,t,l)}else e=i.treeContext,Ie=dl(s.nextSibling),Tt=t,He=!0,$l=null,rl=!1,e!==null&&Xc(t,e),t=$i(t,n),t.flags|=4096;return t}return e=Dl(e.child,{mode:n.mode,children:n.children}),e.ref=t.ref,t.child=e,e.return=t,e}function Wi(e,t){var l=t.ref;if(l===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof l!="function"&&typeof l!="object")throw Error(r(284));(e===null||e.ref!==l)&&(t.flags|=4194816)}}function Gs(e,t,l,n,a){return An(t),l=Ts(e,t,l,n,void 0,a),n=js(),e!==null&&!mt?(Ns(e,t,a),Bl(e,t,a)):(He&&n&&is(t),t.flags|=1,Nt(e,t,l,a),t.child)}function nu(e,t,l,n,a,i){return An(t),t.updateQueue=null,l=od(t,n,l,a),id(e),n=js(),e!==null&&!mt?(Ns(e,t,i),Bl(e,t,i)):(He&&n&&is(t),t.flags|=1,Nt(e,t,l,i),t.child)}function au(e,t,l,n,a){if(An(t),t.stateNode===null){var i=In,s=l.contextType;typeof s=="object"&&s!==null&&(i=jt(s)),i=new l(n,i),t.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,i.updater=Ys,t.stateNode=i,i._reactInternals=t,i=t.stateNode,i.props=n,i.state=t.memoizedState,i.refs={},gs(t),s=l.contextType,i.context=typeof s=="object"&&s!==null?jt(s):In,i.state=t.memoizedState,s=l.getDerivedStateFromProps,typeof s=="function"&&(qs(t,l,s,n),i.state=t.memoizedState),typeof l.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(s=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),s!==i.state&&Ys.enqueueReplaceState(i,i.state,null),Ga(t,n,i,a),Fa(),i.state=t.memoizedState),typeof i.componentDidMount=="function"&&(t.flags|=4194308),n=!0}else if(e===null){i=t.stateNode;var d=t.memoizedProps,w=On(l,d);i.props=w;var H=i.context,P=l.contextType;s=In,typeof P=="object"&&P!==null&&(s=jt(P));var I=l.getDerivedStateFromProps;P=typeof I=="function"||typeof i.getSnapshotBeforeUpdate=="function",d=t.pendingProps!==d,P||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(d||H!==s)&&Gd(t,i,n,s),Il=!1;var O=t.memoizedState;i.state=O,Ga(t,n,i,a),Fa(),H=t.memoizedState,d||O!==H||Il?(typeof I=="function"&&(qs(t,l,I,n),H=t.memoizedState),(w=Il||Fd(t,l,w,n,O,H,s))?(P||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(t.flags|=4194308)):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=n,t.memoizedState=H),i.props=n,i.state=H,i.context=s,n=w):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),n=!1)}else{i=t.stateNode,bs(e,t),s=t.memoizedProps,P=On(l,s),i.props=P,I=t.pendingProps,O=i.context,H=l.contextType,w=In,typeof H=="object"&&H!==null&&(w=jt(H)),d=l.getDerivedStateFromProps,(H=typeof d=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(s!==I||O!==w)&&Gd(t,i,n,w),Il=!1,O=t.memoizedState,i.state=O,Ga(t,n,i,a),Fa();var F=t.memoizedState;s!==I||O!==F||Il||e!==null&&e.dependencies!==null&&Li(e.dependencies)?(typeof d=="function"&&(qs(t,l,d,n),F=t.memoizedState),(P=Il||Fd(t,l,P,n,O,F,w)||e!==null&&e.dependencies!==null&&Li(e.dependencies))?(H||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(n,F,w),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(n,F,w)),typeof i.componentDidUpdate=="function"&&(t.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof i.componentDidUpdate!="function"||s===e.memoizedProps&&O===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&O===e.memoizedState||(t.flags|=1024),t.memoizedProps=n,t.memoizedState=F),i.props=n,i.state=F,i.context=w,n=P):(typeof i.componentDidUpdate!="function"||s===e.memoizedProps&&O===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&O===e.memoizedState||(t.flags|=1024),n=!1)}return i=n,Wi(e,t),n=(t.flags&128)!==0,i||n?(i=t.stateNode,l=n&&typeof l.getDerivedStateFromError!="function"?null:i.render(),t.flags|=1,e!==null&&n?(t.child=Rn(t,e.child,null,a),t.child=Rn(t,null,l,a)):Nt(e,t,l,a),t.memoizedState=i.state,e=t.child):e=Bl(e,t,a),e}function iu(e,t,l,n){return zn(),t.flags|=256,Nt(e,t,l,n),t.child}var Vs={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Qs(e){return{baseLanes:e,cachePool:Pc()}}function Zs(e,t,l){return e=e!==null?e.childLanes&~l:0,t&&(e|=Jt),e}function ou(e,t,l){var n=t.pendingProps,a=!1,i=(t.flags&128)!==0,s;if((s=i)||(s=e!==null&&e.memoizedState===null?!1:(ct.current&2)!==0),s&&(a=!0,t.flags&=-129),s=(t.flags&32)!==0,t.flags&=-33,e===null){if(He){if(a?ln(t):nn(),(e=Ie)?(e=mf(e,rl),e=e!==null&&e.data!=="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Kl!==null?{id:wl,overflow:Sl}:null,retryLane:536870912,hydrationErrors:null},l=Uc(e),l.return=t,t.child=l,Tt=t,Ie=null)):e=null,e===null)throw Wl(t);return Mr(e)?t.lanes=32:t.lanes=536870912,null}var d=n.children;return n=n.fallback,a?(nn(),a=t.mode,d=Ji({mode:"hidden",children:d},a),n=En(n,a,l,null),d.return=t,n.return=t,d.sibling=n,t.child=d,n=t.child,n.memoizedState=Qs(l),n.childLanes=Zs(e,s,l),t.memoizedState=Vs,Ka(null,n)):(ln(t),Ps(t,d))}var w=e.memoizedState;if(w!==null&&(d=w.dehydrated,d!==null)){if(i)t.flags&256?(ln(t),t.flags&=-257,t=Ks(e,t,l)):t.memoizedState!==null?(nn(),t.child=e.child,t.flags|=128,t=null):(nn(),d=n.fallback,a=t.mode,n=Ji({mode:"visible",children:n.children},a),d=En(d,a,l,null),d.flags|=2,n.return=t,d.return=t,n.sibling=d,t.child=n,Rn(t,e.child,null,l),n=t.child,n.memoizedState=Qs(l),n.childLanes=Zs(e,s,l),t.memoizedState=Vs,t=Ka(null,n));else if(ln(t),Mr(d)){if(s=d.nextSibling&&d.nextSibling.dataset,s)var H=s.dgst;s=H,n=Error(r(419)),n.stack="",n.digest=s,Ba({value:n,source:null,stack:null}),t=Ks(e,t,l)}else if(mt||na(e,t,l,!1),s=(l&e.childLanes)!==0,mt||s){if(s=$e,s!==null&&(n=Xn(s,l),n!==0&&n!==w.retryLane))throw w.retryLane=n,Nn(e,n),Xt(s,e,n),Fs;zr(d)||so(),t=Ks(e,t,l)}else zr(d)?(t.flags|=192,t.child=e.child,t=null):(e=w.treeContext,Ie=dl(d.nextSibling),Tt=t,He=!0,$l=null,rl=!1,e!==null&&Xc(t,e),t=Ps(t,n.children),t.flags|=4096);return t}return a?(nn(),d=n.fallback,a=t.mode,w=e.child,H=w.sibling,n=Dl(w,{mode:"hidden",children:n.children}),n.subtreeFlags=w.subtreeFlags&65011712,H!==null?d=Dl(H,d):(d=En(d,a,l,null),d.flags|=2),d.return=t,n.return=t,n.sibling=d,t.child=n,Ka(null,n),n=t.child,d=e.child.memoizedState,d===null?d=Qs(l):(a=d.cachePool,a!==null?(w=ht._currentValue,a=a.parent!==w?{parent:w,pool:w}:a):a=Pc(),d={baseLanes:d.baseLanes|l,cachePool:a}),n.memoizedState=d,n.childLanes=Zs(e,s,l),t.memoizedState=Vs,Ka(e.child,n)):(ln(t),l=e.child,e=l.sibling,l=Dl(l,{mode:"visible",children:n.children}),l.return=t,l.sibling=null,e!==null&&(s=t.deletions,s===null?(t.deletions=[e],t.flags|=16):s.push(e)),t.child=l,t.memoizedState=null,l)}function Ps(e,t){return t=Ji({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function Ji(e,t){return e=Pt(22,e,null,t),e.lanes=0,e}function Ks(e,t,l){return Rn(t,e.child,null,l),e=Ps(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function su(e,t,l){e.lanes|=t;var n=e.alternate;n!==null&&(n.lanes|=t),ds(e.return,t,l)}function $s(e,t,l,n,a,i){var s=e.memoizedState;s===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:n,tail:l,tailMode:a,treeForkCount:i}:(s.isBackwards=t,s.rendering=null,s.renderingStartTime=0,s.last=n,s.tail=l,s.tailMode=a,s.treeForkCount=i)}function ru(e,t,l){var n=t.pendingProps,a=n.revealOrder,i=n.tail;n=n.children;var s=ct.current,d=(s&2)!==0;if(d?(s=s&1|2,t.flags|=128):s&=1,z(ct,s),Nt(e,t,n,l),n=He?Oa:0,!d&&e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&su(e,l,t);else if(e.tag===19)su(e,l,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(a){case"forwards":for(l=t.child,a=null;l!==null;)e=l.alternate,e!==null&&qi(e)===null&&(a=l),l=l.sibling;l=a,l===null?(a=t.child,t.child=null):(a=l.sibling,l.sibling=null),$s(t,!1,a,l,i,n);break;case"backwards":case"unstable_legacy-backwards":for(l=null,a=t.child,t.child=null;a!==null;){if(e=a.alternate,e!==null&&qi(e)===null){t.child=a;break}e=a.sibling,a.sibling=l,l=a,a=e}$s(t,!0,l,null,i,n);break;case"together":$s(t,!1,null,null,void 0,n);break;default:t.memoizedState=null}return t.child}function Bl(e,t,l){if(e!==null&&(t.dependencies=e.dependencies),sn|=t.lanes,(l&t.childLanes)===0)if(e!==null){if(na(e,t,l,!1),(l&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(r(153));if(t.child!==null){for(e=t.child,l=Dl(e,e.pendingProps),t.child=l,l.return=t;e.sibling!==null;)e=e.sibling,l=l.sibling=Dl(e,e.pendingProps),l.return=t;l.sibling=null}return t.child}function Ws(e,t){return(e.lanes&t)!==0?!0:(e=e.dependencies,!!(e!==null&&Li(e)))}function pp(e,t,l){switch(t.tag){case 3:he(t,t.stateNode.containerInfo),Jl(t,ht,e.memoizedState.cache),zn();break;case 27:case 5:ze(t);break;case 4:he(t,t.stateNode.containerInfo);break;case 10:Jl(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,Ss(t),null;break;case 13:var n=t.memoizedState;if(n!==null)return n.dehydrated!==null?(ln(t),t.flags|=128,null):(l&t.child.childLanes)!==0?ou(e,t,l):(ln(t),e=Bl(e,t,l),e!==null?e.sibling:null);ln(t);break;case 19:var a=(e.flags&128)!==0;if(n=(l&t.childLanes)!==0,n||(na(e,t,l,!1),n=(l&t.childLanes)!==0),a){if(n)return ru(e,t,l);t.flags|=128}if(a=t.memoizedState,a!==null&&(a.rendering=null,a.tail=null,a.lastEffect=null),z(ct,ct.current),n)break;return null;case 22:return t.lanes=0,eu(e,t,l,t.pendingProps);case 24:Jl(t,ht,e.memoizedState.cache)}return Bl(e,t,l)}function cu(e,t,l){if(e!==null)if(e.memoizedProps!==t.pendingProps)mt=!0;else{if(!Ws(e,l)&&(t.flags&128)===0)return mt=!1,pp(e,t,l);mt=(e.flags&131072)!==0}else mt=!1,He&&(t.flags&1048576)!==0&&Yc(t,Oa,t.index);switch(t.lanes=0,t.tag){case 16:e:{var n=t.pendingProps;if(e=Ln(t.elementType),t.type=e,typeof e=="function")ls(e)?(n=On(e,n),t.tag=1,t=au(null,t,e,n,l)):(t.tag=0,t=Gs(null,t,e,n,l));else{if(e!=null){var a=e.$$typeof;if(a===_){t.tag=11,t=Wd(null,t,e,n,l);break e}else if(a===k){t.tag=14,t=Jd(null,t,e,n,l);break e}}throw t=Q(e)||e,Error(r(306,t,""))}}return t;case 0:return Gs(e,t,t.type,t.pendingProps,l);case 1:return n=t.type,a=On(n,t.pendingProps),au(e,t,n,a,l);case 3:e:{if(he(t,t.stateNode.containerInfo),e===null)throw Error(r(387));n=t.pendingProps;var i=t.memoizedState;a=i.element,bs(e,t),Ga(t,n,null,l);var s=t.memoizedState;if(n=s.cache,Jl(t,ht,n),n!==i.cache&&us(t,[ht],l,!0),Fa(),n=s.element,i.isDehydrated)if(i={element:n,isDehydrated:!1,cache:s.cache},t.updateQueue.baseState=i,t.memoizedState=i,t.flags&256){t=iu(e,t,n,l);break e}else if(n!==a){a=il(Error(r(424)),t),Ba(a),t=iu(e,t,n,l);break e}else{switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(Ie=dl(e.firstChild),Tt=t,He=!0,$l=null,rl=!0,l=ed(t,null,n,l),t.child=l;l;)l.flags=l.flags&-3|4096,l=l.sibling}else{if(zn(),n===a){t=Bl(e,t,l);break e}Nt(e,t,n,l)}t=t.child}return t;case 26:return Wi(e,t),e===null?(l=wf(t.type,null,t.pendingProps,null))?t.memoizedState=l:He||(l=t.type,e=t.pendingProps,n=mo(ne.current).createElement(l),n[nt]=t,n[ft]=e,Et(n,l,e),wt(n),t.stateNode=n):t.memoizedState=wf(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return ze(t),e===null&&He&&(n=t.stateNode=yf(t.type,t.pendingProps,ne.current),Tt=t,rl=!0,a=Ie,fn(t.type)?(Ar=a,Ie=dl(n.firstChild)):Ie=a),Nt(e,t,t.pendingProps.children,l),Wi(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&He&&((a=n=Ie)&&(n=Gp(n,t.type,t.pendingProps,rl),n!==null?(t.stateNode=n,Tt=t,Ie=dl(n.firstChild),rl=!1,a=!0):a=!1),a||Wl(t)),ze(t),a=t.type,i=t.pendingProps,s=e!==null?e.memoizedProps:null,n=i.children,jr(a,i)?n=null:s!==null&&jr(a,s)&&(t.flags|=32),t.memoizedState!==null&&(a=Ts(e,t,ip,null,null,l),di._currentValue=a),Wi(e,t),Nt(e,t,n,l),t.child;case 6:return e===null&&He&&((e=l=Ie)&&(l=Vp(l,t.pendingProps,rl),l!==null?(t.stateNode=l,Tt=t,Ie=null,e=!0):e=!1),e||Wl(t)),null;case 13:return ou(e,t,l);case 4:return he(t,t.stateNode.containerInfo),n=t.pendingProps,e===null?t.child=Rn(t,null,n,l):Nt(e,t,n,l),t.child;case 11:return Wd(e,t,t.type,t.pendingProps,l);case 7:return Nt(e,t,t.pendingProps,l),t.child;case 8:return Nt(e,t,t.pendingProps.children,l),t.child;case 12:return Nt(e,t,t.pendingProps.children,l),t.child;case 10:return n=t.pendingProps,Jl(t,t.type,n.value),Nt(e,t,n.children,l),t.child;case 9:return a=t.type._context,n=t.pendingProps.children,An(t),a=jt(a),n=n(a),t.flags|=1,Nt(e,t,n,l),t.child;case 14:return Jd(e,t,t.type,t.pendingProps,l);case 15:return Id(e,t,t.type,t.pendingProps,l);case 19:return ru(e,t,l);case 31:return hp(e,t,l);case 22:return eu(e,t,l,t.pendingProps);case 24:return An(t),n=jt(ht),e===null?(a=ps(),a===null&&(a=$e,i=fs(),a.pooledCache=i,i.refCount++,i!==null&&(a.pooledCacheLanes|=l),a=i),t.memoizedState={parent:n,cache:a},gs(t),Jl(t,ht,a)):((e.lanes&l)!==0&&(bs(e,t),Ga(t,null,null,l),Fa()),a=e.memoizedState,i=t.memoizedState,a.parent!==n?(a={parent:n,cache:n},t.memoizedState=a,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=a),Jl(t,ht,n)):(n=i.cache,Jl(t,ht,n),n!==a.cache&&us(t,[ht],l,!0))),Nt(e,t,t.pendingProps.children,l),t.child;case 29:throw t.pendingProps}throw Error(r(156,t.tag))}function _l(e){e.flags|=4}function Js(e,t,l,n,a){if((t=(e.mode&32)!==0)&&(t=!1),t){if(e.flags|=16777216,(a&335544128)===a)if(e.stateNode.complete)e.flags|=8192;else if(Ou())e.flags|=8192;else throw kn=Oi,ms}else e.flags&=-16777217}function du(e,t){if(t.type!=="stylesheet"||(t.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!Nf(t))if(Ou())e.flags|=8192;else throw kn=Oi,ms}function Ii(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?vn():536870912,e.lanes|=t,ma|=t)}function $a(e,t){if(!He)switch(e.tailMode){case"hidden":t=e.tail;for(var l=null;t!==null;)t.alternate!==null&&(l=t),t=t.sibling;l===null?e.tail=null:l.sibling=null;break;case"collapsed":l=e.tail;for(var n=null;l!==null;)l.alternate!==null&&(n=l),l=l.sibling;n===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:n.sibling=null}}function et(e){var t=e.alternate!==null&&e.alternate.child===e.child,l=0,n=0;if(t)for(var a=e.child;a!==null;)l|=a.lanes|a.childLanes,n|=a.subtreeFlags&65011712,n|=a.flags&65011712,a.return=e,a=a.sibling;else for(a=e.child;a!==null;)l|=a.lanes|a.childLanes,n|=a.subtreeFlags,n|=a.flags,a.return=e,a=a.sibling;return e.subtreeFlags|=n,e.childLanes=l,t}function mp(e,t,l){var n=t.pendingProps;switch(os(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return et(t),null;case 1:return et(t),null;case 3:return l=t.stateNode,n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),Rl(ht),ue(),l.pendingContext&&(l.context=l.pendingContext,l.pendingContext=null),(e===null||e.child===null)&&(la(t)?_l(t):e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,rs())),et(t),null;case 26:var a=t.type,i=t.memoizedState;return e===null?(_l(t),i!==null?(et(t),du(t,i)):(et(t),Js(t,a,null,n,l))):i?i!==e.memoizedState?(_l(t),et(t),du(t,i)):(et(t),t.flags&=-16777217):(e=e.memoizedProps,e!==n&&_l(t),et(t),Js(t,a,e,n,l)),null;case 27:if(pe(t),l=ne.current,a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==n&&_l(t);else{if(!n){if(t.stateNode===null)throw Error(r(166));return et(t),null}e=U.current,la(t)?Fc(t):(e=yf(a,n,l),t.stateNode=e,_l(t))}return et(t),null;case 5:if(pe(t),a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==n&&_l(t);else{if(!n){if(t.stateNode===null)throw Error(r(166));return et(t),null}if(i=U.current,la(t))Fc(t);else{var s=mo(ne.current);switch(i){case 1:i=s.createElementNS("http://www.w3.org/2000/svg",a);break;case 2:i=s.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;default:switch(a){case"svg":i=s.createElementNS("http://www.w3.org/2000/svg",a);break;case"math":i=s.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;case"script":i=s.createElement("div"),i.innerHTML="<script><\/script>",i=i.removeChild(i.firstChild);break;case"select":i=typeof n.is=="string"?s.createElement("select",{is:n.is}):s.createElement("select"),n.multiple?i.multiple=!0:n.size&&(i.size=n.size);break;default:i=typeof n.is=="string"?s.createElement(a,{is:n.is}):s.createElement(a)}}i[nt]=t,i[ft]=n;e:for(s=t.child;s!==null;){if(s.tag===5||s.tag===6)i.appendChild(s.stateNode);else if(s.tag!==4&&s.tag!==27&&s.child!==null){s.child.return=s,s=s.child;continue}if(s===t)break e;for(;s.sibling===null;){if(s.return===null||s.return===t)break e;s=s.return}s.sibling.return=s.return,s=s.sibling}t.stateNode=i;e:switch(Et(i,a,n),a){case"button":case"input":case"select":case"textarea":n=!!n.autoFocus;break e;case"img":n=!0;break e;default:n=!1}n&&_l(t)}}return et(t),Js(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,l),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==n&&_l(t);else{if(typeof n!="string"&&t.stateNode===null)throw Error(r(166));if(e=ne.current,la(t)){if(e=t.stateNode,l=t.memoizedProps,n=null,a=Tt,a!==null)switch(a.tag){case 27:case 5:n=a.memoizedProps}e[nt]=t,e=!!(e.nodeValue===l||n!==null&&n.suppressHydrationWarning===!0||sf(e.nodeValue,l)),e||Wl(t,!0)}else e=mo(e).createTextNode(n),e[nt]=t,t.stateNode=e}return et(t),null;case 31:if(l=t.memoizedState,e===null||e.memoizedState!==null){if(n=la(t),l!==null){if(e===null){if(!n)throw Error(r(318));if(e=t.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(r(557));e[nt]=t}else zn(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;et(t),e=!1}else l=rs(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=l),e=!0;if(!e)return t.flags&256?($t(t),t):($t(t),null);if((t.flags&128)!==0)throw Error(r(558))}return et(t),null;case 13:if(n=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(a=la(t),n!==null&&n.dehydrated!==null){if(e===null){if(!a)throw Error(r(318));if(a=t.memoizedState,a=a!==null?a.dehydrated:null,!a)throw Error(r(317));a[nt]=t}else zn(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;et(t),a=!1}else a=rs(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),a=!0;if(!a)return t.flags&256?($t(t),t):($t(t),null)}return $t(t),(t.flags&128)!==0?(t.lanes=l,t):(l=n!==null,e=e!==null&&e.memoizedState!==null,l&&(n=t.child,a=null,n.alternate!==null&&n.alternate.memoizedState!==null&&n.alternate.memoizedState.cachePool!==null&&(a=n.alternate.memoizedState.cachePool.pool),i=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(i=n.memoizedState.cachePool.pool),i!==a&&(n.flags|=2048)),l!==e&&l&&(t.child.flags|=8192),Ii(t,t.updateQueue),et(t),null);case 4:return ue(),e===null&&vr(t.stateNode.containerInfo),et(t),null;case 10:return Rl(t.type),et(t),null;case 19:if(S(ct),n=t.memoizedState,n===null)return et(t),null;if(a=(t.flags&128)!==0,i=n.rendering,i===null)if(a)$a(n,!1);else{if(rt!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(i=qi(e),i!==null){for(t.flags|=128,$a(n,!1),e=i.updateQueue,t.updateQueue=e,Ii(t,e),t.subtreeFlags=0,e=l,l=t.child;l!==null;)_c(l,e),l=l.sibling;return z(ct,ct.current&1|2),He&&Ll(t,n.treeForkCount),t.child}e=e.sibling}n.tail!==null&&Oe()>ao&&(t.flags|=128,a=!0,$a(n,!1),t.lanes=4194304)}else{if(!a)if(e=qi(i),e!==null){if(t.flags|=128,a=!0,e=e.updateQueue,t.updateQueue=e,Ii(t,e),$a(n,!0),n.tail===null&&n.tailMode==="hidden"&&!i.alternate&&!He)return et(t),null}else 2*Oe()-n.renderingStartTime>ao&&l!==536870912&&(t.flags|=128,a=!0,$a(n,!1),t.lanes=4194304);n.isBackwards?(i.sibling=t.child,t.child=i):(e=n.last,e!==null?e.sibling=i:t.child=i,n.last=i)}return n.tail!==null?(e=n.tail,n.rendering=e,n.tail=e.sibling,n.renderingStartTime=Oe(),e.sibling=null,l=ct.current,z(ct,a?l&1|2:l&1),He&&Ll(t,n.treeForkCount),e):(et(t),null);case 22:case 23:return $t(t),ws(),n=t.memoizedState!==null,e!==null?e.memoizedState!==null!==n&&(t.flags|=8192):n&&(t.flags|=8192),n?(l&536870912)!==0&&(t.flags&128)===0&&(et(t),t.subtreeFlags&6&&(t.flags|=8192)):et(t),l=t.updateQueue,l!==null&&Ii(t,l.retryQueue),l=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(l=e.memoizedState.cachePool.pool),n=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),n!==l&&(t.flags|=2048),e!==null&&S(Dn),null;case 24:return l=null,e!==null&&(l=e.memoizedState.cache),t.memoizedState.cache!==l&&(t.flags|=2048),Rl(ht),et(t),null;case 25:return null;case 30:return null}throw Error(r(156,t.tag))}function gp(e,t){switch(os(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Rl(ht),ue(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return pe(t),null;case 31:if(t.memoizedState!==null){if($t(t),t.alternate===null)throw Error(r(340));zn()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if($t(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(r(340));zn()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return S(ct),null;case 4:return ue(),null;case 10:return Rl(t.type),null;case 22:case 23:return $t(t),ws(),e!==null&&S(Dn),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return Rl(ht),null;case 25:return null;default:return null}}function uu(e,t){switch(os(t),t.tag){case 3:Rl(ht),ue();break;case 26:case 27:case 5:pe(t);break;case 4:ue();break;case 31:t.memoizedState!==null&&$t(t);break;case 13:$t(t);break;case 19:S(ct);break;case 10:Rl(t.type);break;case 22:case 23:$t(t),ws(),e!==null&&S(Dn);break;case 24:Rl(ht)}}function Wa(e,t){try{var l=t.updateQueue,n=l!==null?l.lastEffect:null;if(n!==null){var a=n.next;l=a;do{if((l.tag&e)===e){n=void 0;var i=l.create,s=l.inst;n=i(),s.destroy=n}l=l.next}while(l!==a)}}catch(d){Fe(t,t.return,d)}}function an(e,t,l){try{var n=t.updateQueue,a=n!==null?n.lastEffect:null;if(a!==null){var i=a.next;n=i;do{if((n.tag&e)===e){var s=n.inst,d=s.destroy;if(d!==void 0){s.destroy=void 0,a=t;var w=l,H=d;try{H()}catch(P){Fe(a,w,P)}}}n=n.next}while(n!==i)}}catch(P){Fe(t,t.return,P)}}function fu(e){var t=e.updateQueue;if(t!==null){var l=e.stateNode;try{ld(t,l)}catch(n){Fe(e,e.return,n)}}}function hu(e,t,l){l.props=On(e.type,e.memoizedProps),l.state=e.memoizedState;try{l.componentWillUnmount()}catch(n){Fe(e,t,n)}}function Ja(e,t){try{var l=e.ref;if(l!==null){switch(e.tag){case 26:case 27:case 5:var n=e.stateNode;break;case 30:n=e.stateNode;break;default:n=e.stateNode}typeof l=="function"?e.refCleanup=l(n):l.current=n}}catch(a){Fe(e,t,a)}}function Cl(e,t){var l=e.ref,n=e.refCleanup;if(l!==null)if(typeof n=="function")try{n()}catch(a){Fe(e,t,a)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof l=="function")try{l(null)}catch(a){Fe(e,t,a)}else l.current=null}function pu(e){var t=e.type,l=e.memoizedProps,n=e.stateNode;try{e:switch(t){case"button":case"input":case"select":case"textarea":l.autoFocus&&n.focus();break e;case"img":l.src?n.src=l.src:l.srcSet&&(n.srcset=l.srcSet)}}catch(a){Fe(e,e.return,a)}}function Is(e,t,l){try{var n=e.stateNode;_p(n,e.type,l,t),n[ft]=t}catch(a){Fe(e,e.return,a)}}function mu(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&fn(e.type)||e.tag===4}function er(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||mu(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&fn(e.type)||e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function tr(e,t,l){var n=e.tag;if(n===5||n===6)e=e.stateNode,t?(l.nodeType===9?l.body:l.nodeName==="HTML"?l.ownerDocument.body:l).insertBefore(e,t):(t=l.nodeType===9?l.body:l.nodeName==="HTML"?l.ownerDocument.body:l,t.appendChild(e),l=l._reactRootContainer,l!=null||t.onclick!==null||(t.onclick=Ml));else if(n!==4&&(n===27&&fn(e.type)&&(l=e.stateNode,t=null),e=e.child,e!==null))for(tr(e,t,l),e=e.sibling;e!==null;)tr(e,t,l),e=e.sibling}function eo(e,t,l){var n=e.tag;if(n===5||n===6)e=e.stateNode,t?l.insertBefore(e,t):l.appendChild(e);else if(n!==4&&(n===27&&fn(e.type)&&(l=e.stateNode),e=e.child,e!==null))for(eo(e,t,l),e=e.sibling;e!==null;)eo(e,t,l),e=e.sibling}function gu(e){var t=e.stateNode,l=e.memoizedProps;try{for(var n=e.type,a=t.attributes;a.length;)t.removeAttributeNode(a[0]);Et(t,n,l),t[nt]=e,t[ft]=l}catch(i){Fe(e,e.return,i)}}var Ul=!1,gt=!1,lr=!1,bu=typeof WeakSet=="function"?WeakSet:Set,St=null;function bp(e,t){if(e=e.containerInfo,Cr=So,e=Mc(e),Ko(e)){if("selectionStart"in e)var l={start:e.selectionStart,end:e.selectionEnd};else e:{l=(l=e.ownerDocument)&&l.defaultView||window;var n=l.getSelection&&l.getSelection();if(n&&n.rangeCount!==0){l=n.anchorNode;var a=n.anchorOffset,i=n.focusNode;n=n.focusOffset;try{l.nodeType,i.nodeType}catch{l=null;break e}var s=0,d=-1,w=-1,H=0,P=0,I=e,O=null;t:for(;;){for(var F;I!==l||a!==0&&I.nodeType!==3||(d=s+a),I!==i||n!==0&&I.nodeType!==3||(w=s+n),I.nodeType===3&&(s+=I.nodeValue.length),(F=I.firstChild)!==null;)O=I,I=F;for(;;){if(I===e)break t;if(O===l&&++H===a&&(d=s),O===i&&++P===n&&(w=s),(F=I.nextSibling)!==null)break;I=O,O=I.parentNode}I=F}l=d===-1||w===-1?null:{start:d,end:w}}else l=null}l=l||{start:0,end:0}}else l=null;for(Tr={focusedElem:e,selectionRange:l},So=!1,St=t;St!==null;)if(t=St,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,St=e;else for(;St!==null;){switch(t=St,i=t.alternate,e=t.flags,t.tag){case 0:if((e&4)!==0&&(e=t.updateQueue,e=e!==null?e.events:null,e!==null))for(l=0;l<e.length;l++)a=e[l],a.ref.impl=a.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&i!==null){e=void 0,l=t,a=i.memoizedProps,i=i.memoizedState,n=l.stateNode;try{var fe=On(l.type,a);e=n.getSnapshotBeforeUpdate(fe,i),n.__reactInternalSnapshotBeforeUpdate=e}catch(ye){Fe(l,l.return,ye)}}break;case 3:if((e&1024)!==0){if(e=t.stateNode.containerInfo,l=e.nodeType,l===9)Er(e);else if(l===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":Er(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(r(163))}if(e=t.sibling,e!==null){e.return=t.return,St=e;break}St=t.return}}function yu(e,t,l){var n=l.flags;switch(l.tag){case 0:case 11:case 15:Yl(e,l),n&4&&Wa(5,l);break;case 1:if(Yl(e,l),n&4)if(e=l.stateNode,t===null)try{e.componentDidMount()}catch(s){Fe(l,l.return,s)}else{var a=On(l.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(a,t,e.__reactInternalSnapshotBeforeUpdate)}catch(s){Fe(l,l.return,s)}}n&64&&fu(l),n&512&&Ja(l,l.return);break;case 3:if(Yl(e,l),n&64&&(e=l.updateQueue,e!==null)){if(t=null,l.child!==null)switch(l.child.tag){case 27:case 5:t=l.child.stateNode;break;case 1:t=l.child.stateNode}try{ld(e,t)}catch(s){Fe(l,l.return,s)}}break;case 27:t===null&&n&4&&gu(l);case 26:case 5:Yl(e,l),t===null&&n&4&&pu(l),n&512&&Ja(l,l.return);break;case 12:Yl(e,l);break;case 31:Yl(e,l),n&4&&wu(e,l);break;case 13:Yl(e,l),n&4&&Su(e,l),n&64&&(e=l.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(l=Np.bind(null,l),Qp(e,l))));break;case 22:if(n=l.memoizedState!==null||Ul,!n){t=t!==null&&t.memoizedState!==null||gt,a=Ul;var i=gt;Ul=n,(gt=t)&&!i?Xl(e,l,(l.subtreeFlags&8772)!==0):Yl(e,l),Ul=a,gt=i}break;case 30:break;default:Yl(e,l)}}function xu(e){var t=e.alternate;t!==null&&(e.alternate=null,xu(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&Na(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var lt=null,_t=!1;function ql(e,t,l){for(l=l.child;l!==null;)vu(e,t,l),l=l.sibling}function vu(e,t,l){if(ot&&typeof ot.onCommitFiberUnmount=="function")try{ot.onCommitFiberUnmount(Ft,l)}catch{}switch(l.tag){case 26:gt||Cl(l,t),ql(e,t,l),l.memoizedState?l.memoizedState.count--:l.stateNode&&(l=l.stateNode,l.parentNode.removeChild(l));break;case 27:gt||Cl(l,t);var n=lt,a=_t;fn(l.type)&&(lt=l.stateNode,_t=!1),ql(e,t,l),si(l.stateNode),lt=n,_t=a;break;case 5:gt||Cl(l,t);case 6:if(n=lt,a=_t,lt=null,ql(e,t,l),lt=n,_t=a,lt!==null)if(_t)try{(lt.nodeType===9?lt.body:lt.nodeName==="HTML"?lt.ownerDocument.body:lt).removeChild(l.stateNode)}catch(i){Fe(l,t,i)}else try{lt.removeChild(l.stateNode)}catch(i){Fe(l,t,i)}break;case 18:lt!==null&&(_t?(e=lt,hf(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,l.stateNode),Ca(e)):hf(lt,l.stateNode));break;case 4:n=lt,a=_t,lt=l.stateNode.containerInfo,_t=!0,ql(e,t,l),lt=n,_t=a;break;case 0:case 11:case 14:case 15:an(2,l,t),gt||an(4,l,t),ql(e,t,l);break;case 1:gt||(Cl(l,t),n=l.stateNode,typeof n.componentWillUnmount=="function"&&hu(l,t,n)),ql(e,t,l);break;case 21:ql(e,t,l);break;case 22:gt=(n=gt)||l.memoizedState!==null,ql(e,t,l),gt=n;break;default:ql(e,t,l)}}function wu(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Ca(e)}catch(l){Fe(t,t.return,l)}}}function Su(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Ca(e)}catch(l){Fe(t,t.return,l)}}function yp(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new bu),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new bu),t;default:throw Error(r(435,e.tag))}}function to(e,t){var l=yp(e);t.forEach(function(n){if(!l.has(n)){l.add(n);var a=Ep.bind(null,e,n);n.then(a,a)}})}function Ut(e,t){var l=t.deletions;if(l!==null)for(var n=0;n<l.length;n++){var a=l[n],i=e,s=t,d=s;e:for(;d!==null;){switch(d.tag){case 27:if(fn(d.type)){lt=d.stateNode,_t=!1;break e}break;case 5:lt=d.stateNode,_t=!1;break e;case 3:case 4:lt=d.stateNode.containerInfo,_t=!0;break e}d=d.return}if(lt===null)throw Error(r(160));vu(i,s,a),lt=null,_t=!1,i=a.alternate,i!==null&&(i.return=null),a.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)Cu(t,e),t=t.sibling}var ml=null;function Cu(e,t){var l=e.alternate,n=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:Ut(t,e),qt(e),n&4&&(an(3,e,e.return),Wa(3,e),an(5,e,e.return));break;case 1:Ut(t,e),qt(e),n&512&&(gt||l===null||Cl(l,l.return)),n&64&&Ul&&(e=e.updateQueue,e!==null&&(n=e.callbacks,n!==null&&(l=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=l===null?n:l.concat(n))));break;case 26:var a=ml;if(Ut(t,e),qt(e),n&512&&(gt||l===null||Cl(l,l.return)),n&4){var i=l!==null?l.memoizedState:null;if(n=e.memoizedState,l===null)if(n===null)if(e.stateNode===null){e:{n=e.type,l=e.memoizedProps,a=a.ownerDocument||a;t:switch(n){case"title":i=a.getElementsByTagName("title")[0],(!i||i[vl]||i[nt]||i.namespaceURI==="http://www.w3.org/2000/svg"||i.hasAttribute("itemprop"))&&(i=a.createElement(n),a.head.insertBefore(i,a.querySelector("head > title"))),Et(i,n,l),i[nt]=e,wt(i),n=i;break e;case"link":var s=Tf("link","href",a).get(n+(l.href||""));if(s){for(var d=0;d<s.length;d++)if(i=s[d],i.getAttribute("href")===(l.href==null||l.href===""?null:l.href)&&i.getAttribute("rel")===(l.rel==null?null:l.rel)&&i.getAttribute("title")===(l.title==null?null:l.title)&&i.getAttribute("crossorigin")===(l.crossOrigin==null?null:l.crossOrigin)){s.splice(d,1);break t}}i=a.createElement(n),Et(i,n,l),a.head.appendChild(i);break;case"meta":if(s=Tf("meta","content",a).get(n+(l.content||""))){for(d=0;d<s.length;d++)if(i=s[d],i.getAttribute("content")===(l.content==null?null:""+l.content)&&i.getAttribute("name")===(l.name==null?null:l.name)&&i.getAttribute("property")===(l.property==null?null:l.property)&&i.getAttribute("http-equiv")===(l.httpEquiv==null?null:l.httpEquiv)&&i.getAttribute("charset")===(l.charSet==null?null:l.charSet)){s.splice(d,1);break t}}i=a.createElement(n),Et(i,n,l),a.head.appendChild(i);break;default:throw Error(r(468,n))}i[nt]=e,wt(i),n=i}e.stateNode=n}else jf(a,e.type,e.stateNode);else e.stateNode=Cf(a,n,e.memoizedProps);else i!==n?(i===null?l.stateNode!==null&&(l=l.stateNode,l.parentNode.removeChild(l)):i.count--,n===null?jf(a,e.type,e.stateNode):Cf(a,n,e.memoizedProps)):n===null&&e.stateNode!==null&&Is(e,e.memoizedProps,l.memoizedProps)}break;case 27:Ut(t,e),qt(e),n&512&&(gt||l===null||Cl(l,l.return)),l!==null&&n&4&&Is(e,e.memoizedProps,l.memoizedProps);break;case 5:if(Ut(t,e),qt(e),n&512&&(gt||l===null||Cl(l,l.return)),e.flags&32){a=e.stateNode;try{Qn(a,"")}catch(fe){Fe(e,e.return,fe)}}n&4&&e.stateNode!=null&&(a=e.memoizedProps,Is(e,a,l!==null?l.memoizedProps:a)),n&1024&&(lr=!0);break;case 6:if(Ut(t,e),qt(e),n&4){if(e.stateNode===null)throw Error(r(162));n=e.memoizedProps,l=e.stateNode;try{l.nodeValue=n}catch(fe){Fe(e,e.return,fe)}}break;case 3:if(yo=null,a=ml,ml=go(t.containerInfo),Ut(t,e),ml=a,qt(e),n&4&&l!==null&&l.memoizedState.isDehydrated)try{Ca(t.containerInfo)}catch(fe){Fe(e,e.return,fe)}lr&&(lr=!1,Tu(e));break;case 4:n=ml,ml=go(e.stateNode.containerInfo),Ut(t,e),qt(e),ml=n;break;case 12:Ut(t,e),qt(e);break;case 31:Ut(t,e),qt(e),n&4&&(n=e.updateQueue,n!==null&&(e.updateQueue=null,to(e,n)));break;case 13:Ut(t,e),qt(e),e.child.flags&8192&&e.memoizedState!==null!=(l!==null&&l.memoizedState!==null)&&(no=Oe()),n&4&&(n=e.updateQueue,n!==null&&(e.updateQueue=null,to(e,n)));break;case 22:a=e.memoizedState!==null;var w=l!==null&&l.memoizedState!==null,H=Ul,P=gt;if(Ul=H||a,gt=P||w,Ut(t,e),gt=P,Ul=H,qt(e),n&8192)e:for(t=e.stateNode,t._visibility=a?t._visibility&-2:t._visibility|1,a&&(l===null||w||Ul||gt||Bn(e)),l=null,t=e;;){if(t.tag===5||t.tag===26){if(l===null){w=l=t;try{if(i=w.stateNode,a)s=i.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none";else{d=w.stateNode;var I=w.memoizedProps.style,O=I!=null&&I.hasOwnProperty("display")?I.display:null;d.style.display=O==null||typeof O=="boolean"?"":(""+O).trim()}}catch(fe){Fe(w,w.return,fe)}}}else if(t.tag===6){if(l===null){w=t;try{w.stateNode.nodeValue=a?"":w.memoizedProps}catch(fe){Fe(w,w.return,fe)}}}else if(t.tag===18){if(l===null){w=t;try{var F=w.stateNode;a?pf(F,!0):pf(w.stateNode,!1)}catch(fe){Fe(w,w.return,fe)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;l===t&&(l=null),t=t.return}l===t&&(l=null),t.sibling.return=t.return,t=t.sibling}n&4&&(n=e.updateQueue,n!==null&&(l=n.retryQueue,l!==null&&(n.retryQueue=null,to(e,l))));break;case 19:Ut(t,e),qt(e),n&4&&(n=e.updateQueue,n!==null&&(e.updateQueue=null,to(e,n)));break;case 30:break;case 21:break;default:Ut(t,e),qt(e)}}function qt(e){var t=e.flags;if(t&2){try{for(var l,n=e.return;n!==null;){if(mu(n)){l=n;break}n=n.return}if(l==null)throw Error(r(160));switch(l.tag){case 27:var a=l.stateNode,i=er(e);eo(e,i,a);break;case 5:var s=l.stateNode;l.flags&32&&(Qn(s,""),l.flags&=-33);var d=er(e);eo(e,d,s);break;case 3:case 4:var w=l.stateNode.containerInfo,H=er(e);tr(e,H,w);break;default:throw Error(r(161))}}catch(P){Fe(e,e.return,P)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Tu(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;Tu(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function Yl(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)yu(e,t.alternate,t),t=t.sibling}function Bn(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:an(4,t,t.return),Bn(t);break;case 1:Cl(t,t.return);var l=t.stateNode;typeof l.componentWillUnmount=="function"&&hu(t,t.return,l),Bn(t);break;case 27:si(t.stateNode);case 26:case 5:Cl(t,t.return),Bn(t);break;case 22:t.memoizedState===null&&Bn(t);break;case 30:Bn(t);break;default:Bn(t)}e=e.sibling}}function Xl(e,t,l){for(l=l&&(t.subtreeFlags&8772)!==0,t=t.child;t!==null;){var n=t.alternate,a=e,i=t,s=i.flags;switch(i.tag){case 0:case 11:case 15:Xl(a,i,l),Wa(4,i);break;case 1:if(Xl(a,i,l),n=i,a=n.stateNode,typeof a.componentDidMount=="function")try{a.componentDidMount()}catch(H){Fe(n,n.return,H)}if(n=i,a=n.updateQueue,a!==null){var d=n.stateNode;try{var w=a.shared.hiddenCallbacks;if(w!==null)for(a.shared.hiddenCallbacks=null,a=0;a<w.length;a++)td(w[a],d)}catch(H){Fe(n,n.return,H)}}l&&s&64&&fu(i),Ja(i,i.return);break;case 27:gu(i);case 26:case 5:Xl(a,i,l),l&&n===null&&s&4&&pu(i),Ja(i,i.return);break;case 12:Xl(a,i,l);break;case 31:Xl(a,i,l),l&&s&4&&wu(a,i);break;case 13:Xl(a,i,l),l&&s&4&&Su(a,i);break;case 22:i.memoizedState===null&&Xl(a,i,l),Ja(i,i.return);break;case 30:break;default:Xl(a,i,l)}t=t.sibling}}function nr(e,t){var l=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(l=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==l&&(e!=null&&e.refCount++,l!=null&&_a(l))}function ar(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&_a(e))}function gl(e,t,l,n){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)ju(e,t,l,n),t=t.sibling}function ju(e,t,l,n){var a=t.flags;switch(t.tag){case 0:case 11:case 15:gl(e,t,l,n),a&2048&&Wa(9,t);break;case 1:gl(e,t,l,n);break;case 3:gl(e,t,l,n),a&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&_a(e)));break;case 12:if(a&2048){gl(e,t,l,n),e=t.stateNode;try{var i=t.memoizedProps,s=i.id,d=i.onPostCommit;typeof d=="function"&&d(s,t.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(w){Fe(t,t.return,w)}}else gl(e,t,l,n);break;case 31:gl(e,t,l,n);break;case 13:gl(e,t,l,n);break;case 23:break;case 22:i=t.stateNode,s=t.alternate,t.memoizedState!==null?i._visibility&2?gl(e,t,l,n):Ia(e,t):i._visibility&2?gl(e,t,l,n):(i._visibility|=2,fa(e,t,l,n,(t.subtreeFlags&10256)!==0||!1)),a&2048&&nr(s,t);break;case 24:gl(e,t,l,n),a&2048&&ar(t.alternate,t);break;default:gl(e,t,l,n)}}function fa(e,t,l,n,a){for(a=a&&((t.subtreeFlags&10256)!==0||!1),t=t.child;t!==null;){var i=e,s=t,d=l,w=n,H=s.flags;switch(s.tag){case 0:case 11:case 15:fa(i,s,d,w,a),Wa(8,s);break;case 23:break;case 22:var P=s.stateNode;s.memoizedState!==null?P._visibility&2?fa(i,s,d,w,a):Ia(i,s):(P._visibility|=2,fa(i,s,d,w,a)),a&&H&2048&&nr(s.alternate,s);break;case 24:fa(i,s,d,w,a),a&&H&2048&&ar(s.alternate,s);break;default:fa(i,s,d,w,a)}t=t.sibling}}function Ia(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var l=e,n=t,a=n.flags;switch(n.tag){case 22:Ia(l,n),a&2048&&nr(n.alternate,n);break;case 24:Ia(l,n),a&2048&&ar(n.alternate,n);break;default:Ia(l,n)}t=t.sibling}}var ei=8192;function ha(e,t,l){if(e.subtreeFlags&ei)for(e=e.child;e!==null;)Nu(e,t,l),e=e.sibling}function Nu(e,t,l){switch(e.tag){case 26:ha(e,t,l),e.flags&ei&&e.memoizedState!==null&&am(l,ml,e.memoizedState,e.memoizedProps);break;case 5:ha(e,t,l);break;case 3:case 4:var n=ml;ml=go(e.stateNode.containerInfo),ha(e,t,l),ml=n;break;case 22:e.memoizedState===null&&(n=e.alternate,n!==null&&n.memoizedState!==null?(n=ei,ei=16777216,ha(e,t,l),ei=n):ha(e,t,l));break;default:ha(e,t,l)}}function Eu(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function ti(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var l=0;l<t.length;l++){var n=t[l];St=n,Mu(n,e)}Eu(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)zu(e),e=e.sibling}function zu(e){switch(e.tag){case 0:case 11:case 15:ti(e),e.flags&2048&&an(9,e,e.return);break;case 3:ti(e);break;case 12:ti(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,lo(e)):ti(e);break;default:ti(e)}}function lo(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var l=0;l<t.length;l++){var n=t[l];St=n,Mu(n,e)}Eu(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:an(8,t,t.return),lo(t);break;case 22:l=t.stateNode,l._visibility&2&&(l._visibility&=-3,lo(t));break;default:lo(t)}e=e.sibling}}function Mu(e,t){for(;St!==null;){var l=St;switch(l.tag){case 0:case 11:case 15:an(8,l,t);break;case 23:case 22:if(l.memoizedState!==null&&l.memoizedState.cachePool!==null){var n=l.memoizedState.cachePool.pool;n!=null&&n.refCount++}break;case 24:_a(l.memoizedState.cache)}if(n=l.child,n!==null)n.return=l,St=n;else e:for(l=e;St!==null;){n=St;var a=n.sibling,i=n.return;if(xu(n),n===l){St=null;break e}if(a!==null){a.return=i,St=a;break e}St=i}}}var xp={getCacheForType:function(e){var t=jt(ht),l=t.data.get(e);return l===void 0&&(l=e(),t.data.set(e,l)),l},cacheSignal:function(){return jt(ht).controller.signal}},vp=typeof WeakMap=="function"?WeakMap:Map,qe=0,$e=null,Ae=null,ke=0,Xe=0,Wt=null,on=!1,pa=!1,ir=!1,Fl=0,rt=0,sn=0,_n=0,or=0,Jt=0,ma=0,li=null,Yt=null,sr=!1,no=0,Au=0,ao=1/0,io=null,rn=null,xt=0,cn=null,ga=null,Gl=0,rr=0,cr=null,Du=null,ni=0,dr=null;function It(){return(qe&2)!==0&&ke!==0?ke&-ke:y.T!==null?gr():ve()}function Lu(){if(Jt===0)if((ke&536870912)===0||He){var e=el;el<<=1,(el&3932160)===0&&(el=262144),Jt=e}else Jt=536870912;return e=Kt.current,e!==null&&(e.flags|=32),Jt}function Xt(e,t,l){(e===$e&&(Xe===2||Xe===9)||e.cancelPendingCommit!==null)&&(ba(e,0),dn(e,ke,Jt,!1)),Dt(e,l),((qe&2)===0||e!==$e)&&(e===$e&&((qe&2)===0&&(_n|=l),rt===4&&dn(e,ke,Jt,!1)),Tl(e))}function ku(e,t,l){if((qe&6)!==0)throw Error(r(327));var n=!l&&(t&127)===0&&(t&e.expiredLanes)===0||xl(e,t),a=n?Cp(e,t):fr(e,t,!0),i=n;do{if(a===0){pa&&!n&&dn(e,t,0,!1);break}else{if(l=e.current.alternate,i&&!wp(l)){a=fr(e,t,!1),i=!1;continue}if(a===2){if(i=t,e.errorRecoveryDisabledLanes&i)var s=0;else s=e.pendingLanes&-536870913,s=s!==0?s:s&536870912?536870912:0;if(s!==0){t=s;e:{var d=e;a=li;var w=d.current.memoizedState.isDehydrated;if(w&&(ba(d,s).flags|=256),s=fr(d,s,!1),s!==2){if(ir&&!w){d.errorRecoveryDisabledLanes|=i,_n|=i,a=4;break e}i=Yt,Yt=a,i!==null&&(Yt===null?Yt=i:Yt.push.apply(Yt,i))}a=s}if(i=!1,a!==2)continue}}if(a===1){ba(e,0),dn(e,t,0,!0);break}e:{switch(n=e,i=a,i){case 0:case 1:throw Error(r(345));case 4:if((t&4194048)!==t)break;case 6:dn(n,t,Jt,!on);break e;case 2:Yt=null;break;case 3:case 5:break;default:throw Error(r(329))}if((t&62914560)===t&&(a=no+300-Oe(),10<a)){if(dn(n,t,Jt,!on),jl(n,0,!0)!==0)break e;Gl=t,n.timeoutHandle=uf(Ru.bind(null,n,l,Yt,io,sr,t,Jt,_n,ma,on,i,"Throttled",-0,0),a);break e}Ru(n,l,Yt,io,sr,t,Jt,_n,ma,on,i,null,-0,0)}}break}while(!0);Tl(e)}function Ru(e,t,l,n,a,i,s,d,w,H,P,I,O,F){if(e.timeoutHandle=-1,I=t.subtreeFlags,I&8192||(I&16785408)===16785408){I={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Ml},Nu(t,i,I);var fe=(i&62914560)===i?no-Oe():(i&4194048)===i?Au-Oe():0;if(fe=im(I,fe),fe!==null){Gl=i,e.cancelPendingCommit=fe(Xu.bind(null,e,t,i,l,n,a,s,d,w,P,I,null,O,F)),dn(e,i,s,!H);return}}Xu(e,t,i,l,n,a,s,d,w)}function wp(e){for(var t=e;;){var l=t.tag;if((l===0||l===11||l===15)&&t.flags&16384&&(l=t.updateQueue,l!==null&&(l=l.stores,l!==null)))for(var n=0;n<l.length;n++){var a=l[n],i=a.getSnapshot;a=a.value;try{if(!Zt(i(),a))return!1}catch{return!1}}if(l=t.child,t.subtreeFlags&16384&&l!==null)l.return=t,t=l;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function dn(e,t,l,n){t&=~or,t&=~_n,e.suspendedLanes|=t,e.pingedLanes&=~t,n&&(e.warmLanes|=t),n=e.expirationTimes;for(var a=t;0<a;){var i=31-Le(a),s=1<<i;n[i]=-1,a&=~s}l!==0&&qn(e,l,t)}function oo(){return(qe&6)===0?(ai(0),!1):!0}function ur(){if(Ae!==null){if(Xe===0)var e=Ae.return;else e=Ae,kl=Mn=null,Es(e),sa=null,qa=0,e=Ae;for(;e!==null;)uu(e.alternate,e),e=e.return;Ae=null}}function ba(e,t){var l=e.timeoutHandle;l!==-1&&(e.timeoutHandle=-1,Yp(l)),l=e.cancelPendingCommit,l!==null&&(e.cancelPendingCommit=null,l()),Gl=0,ur(),$e=e,Ae=l=Dl(e.current,null),ke=t,Xe=0,Wt=null,on=!1,pa=xl(e,t),ir=!1,ma=Jt=or=_n=sn=rt=0,Yt=li=null,sr=!1,(t&8)!==0&&(t|=t&32);var n=e.entangledLanes;if(n!==0)for(e=e.entanglements,n&=t;0<n;){var a=31-Le(n),i=1<<a;t|=e[a],n&=~i}return Fl=t,Ei(),l}function Hu(e,t){Ne=null,y.H=Pa,t===oa||t===Hi?(t=Wc(),Xe=3):t===ms?(t=Wc(),Xe=4):Xe=t===Fs?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,Wt=t,Ae===null&&(rt=1,Ki(e,il(t,e.current)))}function Ou(){var e=Kt.current;return e===null?!0:(ke&4194048)===ke?cl===null:(ke&62914560)===ke||(ke&536870912)!==0?e===cl:!1}function Bu(){var e=y.H;return y.H=Pa,e===null?Pa:e}function _u(){var e=y.A;return y.A=xp,e}function so(){rt=4,on||(ke&4194048)!==ke&&Kt.current!==null||(pa=!0),(sn&134217727)===0&&(_n&134217727)===0||$e===null||dn($e,ke,Jt,!1)}function fr(e,t,l){var n=qe;qe|=2;var a=Bu(),i=_u();($e!==e||ke!==t)&&(io=null,ba(e,t)),t=!1;var s=rt;e:do try{if(Xe!==0&&Ae!==null){var d=Ae,w=Wt;switch(Xe){case 8:ur(),s=6;break e;case 3:case 2:case 9:case 6:Kt.current===null&&(t=!0);var H=Xe;if(Xe=0,Wt=null,ya(e,d,w,H),l&&pa){s=0;break e}break;default:H=Xe,Xe=0,Wt=null,ya(e,d,w,H)}}Sp(),s=rt;break}catch(P){Hu(e,P)}while(!0);return t&&e.shellSuspendCounter++,kl=Mn=null,qe=n,y.H=a,y.A=i,Ae===null&&($e=null,ke=0,Ei()),s}function Sp(){for(;Ae!==null;)Uu(Ae)}function Cp(e,t){var l=qe;qe|=2;var n=Bu(),a=_u();$e!==e||ke!==t?(io=null,ao=Oe()+500,ba(e,t)):pa=xl(e,t);e:do try{if(Xe!==0&&Ae!==null){t=Ae;var i=Wt;t:switch(Xe){case 1:Xe=0,Wt=null,ya(e,t,i,1);break;case 2:case 9:if(Kc(i)){Xe=0,Wt=null,qu(t);break}t=function(){Xe!==2&&Xe!==9||$e!==e||(Xe=7),Tl(e)},i.then(t,t);break e;case 3:Xe=7;break e;case 4:Xe=5;break e;case 7:Kc(i)?(Xe=0,Wt=null,qu(t)):(Xe=0,Wt=null,ya(e,t,i,7));break;case 5:var s=null;switch(Ae.tag){case 26:s=Ae.memoizedState;case 5:case 27:var d=Ae;if(s?Nf(s):d.stateNode.complete){Xe=0,Wt=null;var w=d.sibling;if(w!==null)Ae=w;else{var H=d.return;H!==null?(Ae=H,ro(H)):Ae=null}break t}}Xe=0,Wt=null,ya(e,t,i,5);break;case 6:Xe=0,Wt=null,ya(e,t,i,6);break;case 8:ur(),rt=6;break e;default:throw Error(r(462))}}Tp();break}catch(P){Hu(e,P)}while(!0);return kl=Mn=null,y.H=n,y.A=a,qe=l,Ae!==null?0:($e=null,ke=0,Ei(),rt)}function Tp(){for(;Ae!==null&&!bt();)Uu(Ae)}function Uu(e){var t=cu(e.alternate,e,Fl);e.memoizedProps=e.pendingProps,t===null?ro(e):Ae=t}function qu(e){var t=e,l=t.alternate;switch(t.tag){case 15:case 0:t=nu(l,t,t.pendingProps,t.type,void 0,ke);break;case 11:t=nu(l,t,t.pendingProps,t.type.render,t.ref,ke);break;case 5:Es(t);default:uu(l,t),t=Ae=_c(t,Fl),t=cu(l,t,Fl)}e.memoizedProps=e.pendingProps,t===null?ro(e):Ae=t}function ya(e,t,l,n){kl=Mn=null,Es(t),sa=null,qa=0;var a=t.return;try{if(fp(e,a,t,l,ke)){rt=1,Ki(e,il(l,e.current)),Ae=null;return}}catch(i){if(a!==null)throw Ae=a,i;rt=1,Ki(e,il(l,e.current)),Ae=null;return}t.flags&32768?(He||n===1?e=!0:pa||(ke&536870912)!==0?e=!1:(on=e=!0,(n===2||n===9||n===3||n===6)&&(n=Kt.current,n!==null&&n.tag===13&&(n.flags|=16384))),Yu(t,e)):ro(t)}function ro(e){var t=e;do{if((t.flags&32768)!==0){Yu(t,on);return}e=t.return;var l=mp(t.alternate,t,Fl);if(l!==null){Ae=l;return}if(t=t.sibling,t!==null){Ae=t;return}Ae=t=e}while(t!==null);rt===0&&(rt=5)}function Yu(e,t){do{var l=gp(e.alternate,e);if(l!==null){l.flags&=32767,Ae=l;return}if(l=e.return,l!==null&&(l.flags|=32768,l.subtreeFlags=0,l.deletions=null),!t&&(e=e.sibling,e!==null)){Ae=e;return}Ae=e=l}while(e!==null);rt=6,Ae=null}function Xu(e,t,l,n,a,i,s,d,w){e.cancelPendingCommit=null;do co();while(xt!==0);if((qe&6)!==0)throw Error(r(327));if(t!==null){if(t===e.current)throw Error(r(177));if(i=t.lanes|t.childLanes,i|=es,yt(e,l,i,s,d,w),e===$e&&(Ae=$e=null,ke=0),ga=t,cn=e,Gl=l,rr=i,cr=a,Du=n,(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,zp(ut,function(){return Zu(),null})):(e.callbackNode=null,e.callbackPriority=0),n=(t.flags&13878)!==0,(t.subtreeFlags&13878)!==0||n){n=y.T,y.T=null,a=le.p,le.p=2,s=qe,qe|=4;try{bp(e,t,l)}finally{qe=s,le.p=a,y.T=n}}xt=1,Fu(),Gu(),Vu()}}function Fu(){if(xt===1){xt=0;var e=cn,t=ga,l=(t.flags&13878)!==0;if((t.subtreeFlags&13878)!==0||l){l=y.T,y.T=null;var n=le.p;le.p=2;var a=qe;qe|=4;try{Cu(t,e);var i=Tr,s=Mc(e.containerInfo),d=i.focusedElem,w=i.selectionRange;if(s!==d&&d&&d.ownerDocument&&zc(d.ownerDocument.documentElement,d)){if(w!==null&&Ko(d)){var H=w.start,P=w.end;if(P===void 0&&(P=H),"selectionStart"in d)d.selectionStart=H,d.selectionEnd=Math.min(P,d.value.length);else{var I=d.ownerDocument||document,O=I&&I.defaultView||window;if(O.getSelection){var F=O.getSelection(),fe=d.textContent.length,ye=Math.min(w.start,fe),Pe=w.end===void 0?ye:Math.min(w.end,fe);!F.extend&&ye>Pe&&(s=Pe,Pe=ye,ye=s);var D=Ec(d,ye),j=Ec(d,Pe);if(D&&j&&(F.rangeCount!==1||F.anchorNode!==D.node||F.anchorOffset!==D.offset||F.focusNode!==j.node||F.focusOffset!==j.offset)){var R=I.createRange();R.setStart(D.node,D.offset),F.removeAllRanges(),ye>Pe?(F.addRange(R),F.extend(j.node,j.offset)):(R.setEnd(j.node,j.offset),F.addRange(R))}}}}for(I=[],F=d;F=F.parentNode;)F.nodeType===1&&I.push({element:F,left:F.scrollLeft,top:F.scrollTop});for(typeof d.focus=="function"&&d.focus(),d=0;d<I.length;d++){var W=I[d];W.element.scrollLeft=W.left,W.element.scrollTop=W.top}}So=!!Cr,Tr=Cr=null}finally{qe=a,le.p=n,y.T=l}}e.current=t,xt=2}}function Gu(){if(xt===2){xt=0;var e=cn,t=ga,l=(t.flags&8772)!==0;if((t.subtreeFlags&8772)!==0||l){l=y.T,y.T=null;var n=le.p;le.p=2;var a=qe;qe|=4;try{yu(e,t.alternate,t)}finally{qe=a,le.p=n,y.T=l}}xt=3}}function Vu(){if(xt===4||xt===3){xt=0,Je();var e=cn,t=ga,l=Gl,n=Du;(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?xt=5:(xt=0,ga=cn=null,Qu(e,e.pendingLanes));var a=e.pendingLanes;if(a===0&&(rn=null),X(l),t=t.stateNode,ot&&typeof ot.onCommitFiberRoot=="function")try{ot.onCommitFiberRoot(Ft,t,void 0,(t.current.flags&128)===128)}catch{}if(n!==null){t=y.T,a=le.p,le.p=2,y.T=null;try{for(var i=e.onRecoverableError,s=0;s<n.length;s++){var d=n[s];i(d.value,{componentStack:d.stack})}}finally{y.T=t,le.p=a}}(Gl&3)!==0&&co(),Tl(e),a=e.pendingLanes,(l&261930)!==0&&(a&42)!==0?e===dr?ni++:(ni=0,dr=e):ni=0,ai(0)}}function Qu(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,_a(t)))}function co(){return Fu(),Gu(),Vu(),Zu()}function Zu(){if(xt!==5)return!1;var e=cn,t=rr;rr=0;var l=X(Gl),n=y.T,a=le.p;try{le.p=32>l?32:l,y.T=null,l=cr,cr=null;var i=cn,s=Gl;if(xt=0,ga=cn=null,Gl=0,(qe&6)!==0)throw Error(r(331));var d=qe;if(qe|=4,zu(i.current),ju(i,i.current,s,l),qe=d,ai(0,!1),ot&&typeof ot.onPostCommitFiberRoot=="function")try{ot.onPostCommitFiberRoot(Ft,i)}catch{}return!0}finally{le.p=a,y.T=n,Qu(e,t)}}function Pu(e,t,l){t=il(l,t),t=Xs(e.stateNode,t,2),e=tn(e,t,2),e!==null&&(Dt(e,2),Tl(e))}function Fe(e,t,l){if(e.tag===3)Pu(e,e,l);else for(;t!==null;){if(t.tag===3){Pu(t,e,l);break}else if(t.tag===1){var n=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof n.componentDidCatch=="function"&&(rn===null||!rn.has(n))){e=il(l,e),l=Kd(2),n=tn(t,l,2),n!==null&&($d(l,n,t,e),Dt(n,2),Tl(n));break}}t=t.return}}function hr(e,t,l){var n=e.pingCache;if(n===null){n=e.pingCache=new vp;var a=new Set;n.set(t,a)}else a=n.get(t),a===void 0&&(a=new Set,n.set(t,a));a.has(l)||(ir=!0,a.add(l),e=jp.bind(null,e,t,l),t.then(e,e))}function jp(e,t,l){var n=e.pingCache;n!==null&&n.delete(t),e.pingedLanes|=e.suspendedLanes&l,e.warmLanes&=~l,$e===e&&(ke&l)===l&&(rt===4||rt===3&&(ke&62914560)===ke&&300>Oe()-no?(qe&2)===0&&ba(e,0):or|=l,ma===ke&&(ma=0)),Tl(e)}function Ku(e,t){t===0&&(t=vn()),e=Nn(e,t),e!==null&&(Dt(e,t),Tl(e))}function Np(e){var t=e.memoizedState,l=0;t!==null&&(l=t.retryLane),Ku(e,l)}function Ep(e,t){var l=0;switch(e.tag){case 31:case 13:var n=e.stateNode,a=e.memoizedState;a!==null&&(l=a.retryLane);break;case 19:n=e.stateNode;break;case 22:n=e.stateNode._retryCache;break;default:throw Error(r(314))}n!==null&&n.delete(t),Ku(e,l)}function zp(e,t){return Ke(e,t)}var uo=null,xa=null,pr=!1,fo=!1,mr=!1,un=0;function Tl(e){e!==xa&&e.next===null&&(xa===null?uo=xa=e:xa=xa.next=e),fo=!0,pr||(pr=!0,Ap())}function ai(e,t){if(!mr&&fo){mr=!0;do for(var l=!1,n=uo;n!==null;){if(e!==0){var a=n.pendingLanes;if(a===0)var i=0;else{var s=n.suspendedLanes,d=n.pingedLanes;i=(1<<31-Le(42|e)+1)-1,i&=a&~(s&~d),i=i&201326741?i&201326741|1:i?i|2:0}i!==0&&(l=!0,Iu(n,i))}else i=ke,i=jl(n,n===$e?i:0,n.cancelPendingCommit!==null||n.timeoutHandle!==-1),(i&3)===0||xl(n,i)||(l=!0,Iu(n,i));n=n.next}while(l);mr=!1}}function Mp(){$u()}function $u(){fo=pr=!1;var e=0;un!==0&&qp()&&(e=un);for(var t=Oe(),l=null,n=uo;n!==null;){var a=n.next,i=Wu(n,t);i===0?(n.next=null,l===null?uo=a:l.next=a,a===null&&(xa=l)):(l=n,(e!==0||(i&3)!==0)&&(fo=!0)),n=a}xt!==0&&xt!==5||ai(e),un!==0&&(un=0)}function Wu(e,t){for(var l=e.suspendedLanes,n=e.pingedLanes,a=e.expirationTimes,i=e.pendingLanes&-62914561;0<i;){var s=31-Le(i),d=1<<s,w=a[s];w===-1?((d&l)===0||(d&n)!==0)&&(a[s]=xn(d,t)):w<=t&&(e.expiredLanes|=d),i&=~d}if(t=$e,l=ke,l=jl(e,e===t?l:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),n=e.callbackNode,l===0||e===t&&(Xe===2||Xe===9)||e.cancelPendingCommit!==null)return n!==null&&n!==null&&at(n),e.callbackNode=null,e.callbackPriority=0;if((l&3)===0||xl(e,l)){if(t=l&-l,t===e.callbackPriority)return t;switch(n!==null&&at(n),X(l)){case 2:case 8:l=it;break;case 32:l=ut;break;case 268435456:l=kt;break;default:l=ut}return n=Ju.bind(null,e),l=Ke(l,n),e.callbackPriority=t,e.callbackNode=l,t}return n!==null&&n!==null&&at(n),e.callbackPriority=2,e.callbackNode=null,2}function Ju(e,t){if(xt!==0&&xt!==5)return e.callbackNode=null,e.callbackPriority=0,null;var l=e.callbackNode;if(co()&&e.callbackNode!==l)return null;var n=ke;return n=jl(e,e===$e?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),n===0?null:(ku(e,n,t),Wu(e,Oe()),e.callbackNode!=null&&e.callbackNode===l?Ju.bind(null,e):null)}function Iu(e,t){if(co())return null;ku(e,t,!0)}function Ap(){Xp(function(){(qe&6)!==0?Ke(tt,Mp):$u()})}function gr(){if(un===0){var e=aa;e===0&&(e=At,At<<=1,(At&261888)===0&&(At=256)),un=e}return un}function ef(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:xi(""+e)}function tf(e,t){var l=t.ownerDocument.createElement("input");return l.name=t.name,l.value=t.value,e.id&&l.setAttribute("form",e.id),t.parentNode.insertBefore(l,t),e=new FormData(e),l.parentNode.removeChild(l),e}function Dp(e,t,l,n,a){if(t==="submit"&&l&&l.stateNode===a){var i=ef((a[ft]||null).action),s=n.submitter;s&&(t=(t=s[ft]||null)?ef(t.formAction):s.getAttribute("formAction"),t!==null&&(i=t,s=null));var d=new Ci("action","action",null,n,a);e.push({event:d,listeners:[{instance:null,listener:function(){if(n.defaultPrevented){if(un!==0){var w=s?tf(a,s):new FormData(a);Os(l,{pending:!0,data:w,method:a.method,action:i},null,w)}}else typeof i=="function"&&(d.preventDefault(),w=s?tf(a,s):new FormData(a),Os(l,{pending:!0,data:w,method:a.method,action:i},i,w))},currentTarget:a}]})}}for(var br=0;br<Io.length;br++){var yr=Io[br],Lp=yr.toLowerCase(),kp=yr[0].toUpperCase()+yr.slice(1);pl(Lp,"on"+kp)}pl(Lc,"onAnimationEnd"),pl(kc,"onAnimationIteration"),pl(Rc,"onAnimationStart"),pl("dblclick","onDoubleClick"),pl("focusin","onFocus"),pl("focusout","onBlur"),pl(Kh,"onTransitionRun"),pl($h,"onTransitionStart"),pl(Wh,"onTransitionCancel"),pl(Hc,"onTransitionEnd"),Gn("onMouseEnter",["mouseout","mouseover"]),Gn("onMouseLeave",["mouseout","mouseover"]),Gn("onPointerEnter",["pointerout","pointerover"]),Gn("onPointerLeave",["pointerout","pointerover"]),Sn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),Sn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),Sn("onBeforeInput",["compositionend","keypress","textInput","paste"]),Sn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),Sn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),Sn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var ii="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Rp=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(ii));function lf(e,t){t=(t&4)!==0;for(var l=0;l<e.length;l++){var n=e[l],a=n.event;n=n.listeners;e:{var i=void 0;if(t)for(var s=n.length-1;0<=s;s--){var d=n[s],w=d.instance,H=d.currentTarget;if(d=d.listener,w!==i&&a.isPropagationStopped())break e;i=d,a.currentTarget=H;try{i(a)}catch(P){Ni(P)}a.currentTarget=null,i=w}else for(s=0;s<n.length;s++){if(d=n[s],w=d.instance,H=d.currentTarget,d=d.listener,w!==i&&a.isPropagationStopped())break e;i=d,a.currentTarget=H;try{i(a)}catch(P){Ni(P)}a.currentTarget=null,i=w}}}}function De(e,t){var l=t[xe];l===void 0&&(l=t[xe]=new Set);var n=e+"__bubble";l.has(n)||(nf(t,e,2,!1),l.add(n))}function xr(e,t,l){var n=0;t&&(n|=4),nf(l,e,n,t)}var ho="_reactListening"+Math.random().toString(36).slice(2);function vr(e){if(!e[ho]){e[ho]=!0,$r.forEach(function(l){l!=="selectionchange"&&(Rp.has(l)||xr(l,!1,e),xr(l,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[ho]||(t[ho]=!0,xr("selectionchange",!1,t))}}function nf(e,t,l,n){switch(kf(t)){case 2:var a=rm;break;case 8:a=cm;break;default:a=Hr}l=a.bind(null,t,l,e),a=void 0,!qo||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(a=!0),n?a!==void 0?e.addEventListener(t,l,{capture:!0,passive:a}):e.addEventListener(t,l,!0):a!==void 0?e.addEventListener(t,l,{passive:a}):e.addEventListener(t,l,!1)}function wr(e,t,l,n,a){var i=n;if((t&1)===0&&(t&2)===0&&n!==null)e:for(;;){if(n===null)return;var s=n.tag;if(s===3||s===4){var d=n.stateNode.containerInfo;if(d===a)break;if(s===4)for(s=n.return;s!==null;){var w=s.tag;if((w===3||w===4)&&s.stateNode.containerInfo===a)return;s=s.return}for(;d!==null;){if(s=El(d),s===null)return;if(w=s.tag,w===5||w===6||w===26||w===27){n=i=s;continue e}d=d.parentNode}}n=n.return}rc(function(){var H=i,P=_o(l),I=[];e:{var O=Oc.get(e);if(O!==void 0){var F=Ci,fe=e;switch(e){case"keypress":if(wi(l)===0)break e;case"keydown":case"keyup":F=Eh;break;case"focusin":fe="focus",F=Go;break;case"focusout":fe="blur",F=Go;break;case"beforeblur":case"afterblur":F=Go;break;case"click":if(l.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":F=uc;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":F=mh;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":F=Ah;break;case Lc:case kc:case Rc:F=yh;break;case Hc:F=Lh;break;case"scroll":case"scrollend":F=hh;break;case"wheel":F=Rh;break;case"copy":case"cut":case"paste":F=vh;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":F=hc;break;case"toggle":case"beforetoggle":F=Oh}var ye=(t&4)!==0,Pe=!ye&&(e==="scroll"||e==="scrollend"),D=ye?O!==null?O+"Capture":null:O;ye=[];for(var j=H,R;j!==null;){var W=j;if(R=W.stateNode,W=W.tag,W!==5&&W!==26&&W!==27||R===null||D===null||(W=Ea(j,D),W!=null&&ye.push(oi(j,W,R))),Pe)break;j=j.return}0<ye.length&&(O=new F(O,fe,null,l,P),I.push({event:O,listeners:ye}))}}if((t&7)===0){e:{if(O=e==="mouseover"||e==="pointerover",F=e==="mouseout"||e==="pointerout",O&&l!==Bo&&(fe=l.relatedTarget||l.fromElement)&&(El(fe)||fe[tl]))break e;if((F||O)&&(O=P.window===P?P:(O=P.ownerDocument)?O.defaultView||O.parentWindow:window,F?(fe=l.relatedTarget||l.toElement,F=H,fe=fe?El(fe):null,fe!==null&&(Pe=h(fe),ye=fe.tag,fe!==Pe||ye!==5&&ye!==27&&ye!==6)&&(fe=null)):(F=null,fe=H),F!==fe)){if(ye=uc,W="onMouseLeave",D="onMouseEnter",j="mouse",(e==="pointerout"||e==="pointerover")&&(ye=hc,W="onPointerLeave",D="onPointerEnter",j="pointer"),Pe=F==null?O:wn(F),R=fe==null?O:wn(fe),O=new ye(W,j+"leave",F,l,P),O.target=Pe,O.relatedTarget=R,W=null,El(P)===H&&(ye=new ye(D,j+"enter",fe,l,P),ye.target=R,ye.relatedTarget=Pe,W=ye),Pe=W,F&&fe)t:{for(ye=Hp,D=F,j=fe,R=0,W=D;W;W=ye(W))R++;W=0;for(var ge=j;ge;ge=ye(ge))W++;for(;0<R-W;)D=ye(D),R--;for(;0<W-R;)j=ye(j),W--;for(;R--;){if(D===j||j!==null&&D===j.alternate){ye=D;break t}D=ye(D),j=ye(j)}ye=null}else ye=null;F!==null&&af(I,O,F,ye,!1),fe!==null&&Pe!==null&&af(I,Pe,fe,ye,!0)}}e:{if(O=H?wn(H):window,F=O.nodeName&&O.nodeName.toLowerCase(),F==="select"||F==="input"&&O.type==="file")var Be=wc;else if(xc(O))if(Sc)Be=Qh;else{Be=Gh;var me=Fh}else F=O.nodeName,!F||F.toLowerCase()!=="input"||O.type!=="checkbox"&&O.type!=="radio"?H&&Oo(H.elementType)&&(Be=wc):Be=Vh;if(Be&&(Be=Be(e,H))){vc(I,Be,l,P);break e}me&&me(e,O,H),e==="focusout"&&H&&O.type==="number"&&H.memoizedProps.value!=null&&Ho(O,"number",O.value)}switch(me=H?wn(H):window,e){case"focusin":(xc(me)||me.contentEditable==="true")&&($n=me,$o=H,Ha=null);break;case"focusout":Ha=$o=$n=null;break;case"mousedown":Wo=!0;break;case"contextmenu":case"mouseup":case"dragend":Wo=!1,Ac(I,l,P);break;case"selectionchange":if(Ph)break;case"keydown":case"keyup":Ac(I,l,P)}var Ee;if(Qo)e:{switch(e){case"compositionstart":var Re="onCompositionStart";break e;case"compositionend":Re="onCompositionEnd";break e;case"compositionupdate":Re="onCompositionUpdate";break e}Re=void 0}else Kn?bc(e,l)&&(Re="onCompositionEnd"):e==="keydown"&&l.keyCode===229&&(Re="onCompositionStart");Re&&(pc&&l.locale!=="ko"&&(Kn||Re!=="onCompositionStart"?Re==="onCompositionEnd"&&Kn&&(Ee=cc()):(Pl=P,Yo="value"in Pl?Pl.value:Pl.textContent,Kn=!0)),me=po(H,Re),0<me.length&&(Re=new fc(Re,e,null,l,P),I.push({event:Re,listeners:me}),Ee?Re.data=Ee:(Ee=yc(l),Ee!==null&&(Re.data=Ee)))),(Ee=_h?Uh(e,l):qh(e,l))&&(Re=po(H,"onBeforeInput"),0<Re.length&&(me=new fc("onBeforeInput","beforeinput",null,l,P),I.push({event:me,listeners:Re}),me.data=Ee)),Dp(I,e,H,l,P)}lf(I,t)})}function oi(e,t,l){return{instance:e,listener:t,currentTarget:l}}function po(e,t){for(var l=t+"Capture",n=[];e!==null;){var a=e,i=a.stateNode;if(a=a.tag,a!==5&&a!==26&&a!==27||i===null||(a=Ea(e,l),a!=null&&n.unshift(oi(e,a,i)),a=Ea(e,t),a!=null&&n.push(oi(e,a,i))),e.tag===3)return n;e=e.return}return[]}function Hp(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function af(e,t,l,n,a){for(var i=t._reactName,s=[];l!==null&&l!==n;){var d=l,w=d.alternate,H=d.stateNode;if(d=d.tag,w!==null&&w===n)break;d!==5&&d!==26&&d!==27||H===null||(w=H,a?(H=Ea(l,i),H!=null&&s.unshift(oi(l,H,w))):a||(H=Ea(l,i),H!=null&&s.push(oi(l,H,w)))),l=l.return}s.length!==0&&e.push({event:t,listeners:s})}var Op=/\r\n?/g,Bp=/\u0000|\uFFFD/g;function of(e){return(typeof e=="string"?e:""+e).replace(Op,`
`).replace(Bp,"")}function sf(e,t){return t=of(t),of(e)===t}function Ze(e,t,l,n,a,i){switch(l){case"children":typeof n=="string"?t==="body"||t==="textarea"&&n===""||Qn(e,n):(typeof n=="number"||typeof n=="bigint")&&t!=="body"&&Qn(e,""+n);break;case"className":bi(e,"class",n);break;case"tabIndex":bi(e,"tabindex",n);break;case"dir":case"role":case"viewBox":case"width":case"height":bi(e,l,n);break;case"style":oc(e,n,i);break;case"data":if(t!=="object"){bi(e,"data",n);break}case"src":case"href":if(n===""&&(t!=="a"||l!=="href")){e.removeAttribute(l);break}if(n==null||typeof n=="function"||typeof n=="symbol"||typeof n=="boolean"){e.removeAttribute(l);break}n=xi(""+n),e.setAttribute(l,n);break;case"action":case"formAction":if(typeof n=="function"){e.setAttribute(l,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof i=="function"&&(l==="formAction"?(t!=="input"&&Ze(e,t,"name",a.name,a,null),Ze(e,t,"formEncType",a.formEncType,a,null),Ze(e,t,"formMethod",a.formMethod,a,null),Ze(e,t,"formTarget",a.formTarget,a,null)):(Ze(e,t,"encType",a.encType,a,null),Ze(e,t,"method",a.method,a,null),Ze(e,t,"target",a.target,a,null)));if(n==null||typeof n=="symbol"||typeof n=="boolean"){e.removeAttribute(l);break}n=xi(""+n),e.setAttribute(l,n);break;case"onClick":n!=null&&(e.onclick=Ml);break;case"onScroll":n!=null&&De("scroll",e);break;case"onScrollEnd":n!=null&&De("scrollend",e);break;case"dangerouslySetInnerHTML":if(n!=null){if(typeof n!="object"||!("__html"in n))throw Error(r(61));if(l=n.__html,l!=null){if(a.children!=null)throw Error(r(60));e.innerHTML=l}}break;case"multiple":e.multiple=n&&typeof n!="function"&&typeof n!="symbol";break;case"muted":e.muted=n&&typeof n!="function"&&typeof n!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(n==null||typeof n=="function"||typeof n=="boolean"||typeof n=="symbol"){e.removeAttribute("xlink:href");break}l=xi(""+n),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",l);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":n!=null&&typeof n!="function"&&typeof n!="symbol"?e.setAttribute(l,""+n):e.removeAttribute(l);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":n&&typeof n!="function"&&typeof n!="symbol"?e.setAttribute(l,""):e.removeAttribute(l);break;case"capture":case"download":n===!0?e.setAttribute(l,""):n!==!1&&n!=null&&typeof n!="function"&&typeof n!="symbol"?e.setAttribute(l,n):e.removeAttribute(l);break;case"cols":case"rows":case"size":case"span":n!=null&&typeof n!="function"&&typeof n!="symbol"&&!isNaN(n)&&1<=n?e.setAttribute(l,n):e.removeAttribute(l);break;case"rowSpan":case"start":n==null||typeof n=="function"||typeof n=="symbol"||isNaN(n)?e.removeAttribute(l):e.setAttribute(l,n);break;case"popover":De("beforetoggle",e),De("toggle",e),gi(e,"popover",n);break;case"xlinkActuate":zl(e,"http://www.w3.org/1999/xlink","xlink:actuate",n);break;case"xlinkArcrole":zl(e,"http://www.w3.org/1999/xlink","xlink:arcrole",n);break;case"xlinkRole":zl(e,"http://www.w3.org/1999/xlink","xlink:role",n);break;case"xlinkShow":zl(e,"http://www.w3.org/1999/xlink","xlink:show",n);break;case"xlinkTitle":zl(e,"http://www.w3.org/1999/xlink","xlink:title",n);break;case"xlinkType":zl(e,"http://www.w3.org/1999/xlink","xlink:type",n);break;case"xmlBase":zl(e,"http://www.w3.org/XML/1998/namespace","xml:base",n);break;case"xmlLang":zl(e,"http://www.w3.org/XML/1998/namespace","xml:lang",n);break;case"xmlSpace":zl(e,"http://www.w3.org/XML/1998/namespace","xml:space",n);break;case"is":gi(e,"is",n);break;case"innerText":case"textContent":break;default:(!(2<l.length)||l[0]!=="o"&&l[0]!=="O"||l[1]!=="n"&&l[1]!=="N")&&(l=uh.get(l)||l,gi(e,l,n))}}function Sr(e,t,l,n,a,i){switch(l){case"style":oc(e,n,i);break;case"dangerouslySetInnerHTML":if(n!=null){if(typeof n!="object"||!("__html"in n))throw Error(r(61));if(l=n.__html,l!=null){if(a.children!=null)throw Error(r(60));e.innerHTML=l}}break;case"children":typeof n=="string"?Qn(e,n):(typeof n=="number"||typeof n=="bigint")&&Qn(e,""+n);break;case"onScroll":n!=null&&De("scroll",e);break;case"onScrollEnd":n!=null&&De("scrollend",e);break;case"onClick":n!=null&&(e.onclick=Ml);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!Wr.hasOwnProperty(l))e:{if(l[0]==="o"&&l[1]==="n"&&(a=l.endsWith("Capture"),t=l.slice(2,a?l.length-7:void 0),i=e[ft]||null,i=i!=null?i[l]:null,typeof i=="function"&&e.removeEventListener(t,i,a),typeof n=="function")){typeof i!="function"&&i!==null&&(l in e?e[l]=null:e.hasAttribute(l)&&e.removeAttribute(l)),e.addEventListener(t,n,a);break e}l in e?e[l]=n:n===!0?e.setAttribute(l,""):gi(e,l,n)}}}function Et(e,t,l){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":De("error",e),De("load",e);var n=!1,a=!1,i;for(i in l)if(l.hasOwnProperty(i)){var s=l[i];if(s!=null)switch(i){case"src":n=!0;break;case"srcSet":a=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(r(137,t));default:Ze(e,t,i,s,l,null)}}a&&Ze(e,t,"srcSet",l.srcSet,l,null),n&&Ze(e,t,"src",l.src,l,null);return;case"input":De("invalid",e);var d=i=s=a=null,w=null,H=null;for(n in l)if(l.hasOwnProperty(n)){var P=l[n];if(P!=null)switch(n){case"name":a=P;break;case"type":s=P;break;case"checked":w=P;break;case"defaultChecked":H=P;break;case"value":i=P;break;case"defaultValue":d=P;break;case"children":case"dangerouslySetInnerHTML":if(P!=null)throw Error(r(137,t));break;default:Ze(e,t,n,P,l,null)}}lc(e,i,d,w,H,s,a,!1);return;case"select":De("invalid",e),n=s=i=null;for(a in l)if(l.hasOwnProperty(a)&&(d=l[a],d!=null))switch(a){case"value":i=d;break;case"defaultValue":s=d;break;case"multiple":n=d;default:Ze(e,t,a,d,l,null)}t=i,l=s,e.multiple=!!n,t!=null?Vn(e,!!n,t,!1):l!=null&&Vn(e,!!n,l,!0);return;case"textarea":De("invalid",e),i=a=n=null;for(s in l)if(l.hasOwnProperty(s)&&(d=l[s],d!=null))switch(s){case"value":n=d;break;case"defaultValue":a=d;break;case"children":i=d;break;case"dangerouslySetInnerHTML":if(d!=null)throw Error(r(91));break;default:Ze(e,t,s,d,l,null)}ac(e,n,a,i);return;case"option":for(w in l)if(l.hasOwnProperty(w)&&(n=l[w],n!=null))switch(w){case"selected":e.selected=n&&typeof n!="function"&&typeof n!="symbol";break;default:Ze(e,t,w,n,l,null)}return;case"dialog":De("beforetoggle",e),De("toggle",e),De("cancel",e),De("close",e);break;case"iframe":case"object":De("load",e);break;case"video":case"audio":for(n=0;n<ii.length;n++)De(ii[n],e);break;case"image":De("error",e),De("load",e);break;case"details":De("toggle",e);break;case"embed":case"source":case"link":De("error",e),De("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(H in l)if(l.hasOwnProperty(H)&&(n=l[H],n!=null))switch(H){case"children":case"dangerouslySetInnerHTML":throw Error(r(137,t));default:Ze(e,t,H,n,l,null)}return;default:if(Oo(t)){for(P in l)l.hasOwnProperty(P)&&(n=l[P],n!==void 0&&Sr(e,t,P,n,l,void 0));return}}for(d in l)l.hasOwnProperty(d)&&(n=l[d],n!=null&&Ze(e,t,d,n,l,null))}function _p(e,t,l,n){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var a=null,i=null,s=null,d=null,w=null,H=null,P=null;for(F in l){var I=l[F];if(l.hasOwnProperty(F)&&I!=null)switch(F){case"checked":break;case"value":break;case"defaultValue":w=I;default:n.hasOwnProperty(F)||Ze(e,t,F,null,n,I)}}for(var O in n){var F=n[O];if(I=l[O],n.hasOwnProperty(O)&&(F!=null||I!=null))switch(O){case"type":i=F;break;case"name":a=F;break;case"checked":H=F;break;case"defaultChecked":P=F;break;case"value":s=F;break;case"defaultValue":d=F;break;case"children":case"dangerouslySetInnerHTML":if(F!=null)throw Error(r(137,t));break;default:F!==I&&Ze(e,t,O,F,n,I)}}Ro(e,s,d,w,H,P,i,a);return;case"select":F=s=d=O=null;for(i in l)if(w=l[i],l.hasOwnProperty(i)&&w!=null)switch(i){case"value":break;case"multiple":F=w;default:n.hasOwnProperty(i)||Ze(e,t,i,null,n,w)}for(a in n)if(i=n[a],w=l[a],n.hasOwnProperty(a)&&(i!=null||w!=null))switch(a){case"value":O=i;break;case"defaultValue":d=i;break;case"multiple":s=i;default:i!==w&&Ze(e,t,a,i,n,w)}t=d,l=s,n=F,O!=null?Vn(e,!!l,O,!1):!!n!=!!l&&(t!=null?Vn(e,!!l,t,!0):Vn(e,!!l,l?[]:"",!1));return;case"textarea":F=O=null;for(d in l)if(a=l[d],l.hasOwnProperty(d)&&a!=null&&!n.hasOwnProperty(d))switch(d){case"value":break;case"children":break;default:Ze(e,t,d,null,n,a)}for(s in n)if(a=n[s],i=l[s],n.hasOwnProperty(s)&&(a!=null||i!=null))switch(s){case"value":O=a;break;case"defaultValue":F=a;break;case"children":break;case"dangerouslySetInnerHTML":if(a!=null)throw Error(r(91));break;default:a!==i&&Ze(e,t,s,a,n,i)}nc(e,O,F);return;case"option":for(var fe in l)if(O=l[fe],l.hasOwnProperty(fe)&&O!=null&&!n.hasOwnProperty(fe))switch(fe){case"selected":e.selected=!1;break;default:Ze(e,t,fe,null,n,O)}for(w in n)if(O=n[w],F=l[w],n.hasOwnProperty(w)&&O!==F&&(O!=null||F!=null))switch(w){case"selected":e.selected=O&&typeof O!="function"&&typeof O!="symbol";break;default:Ze(e,t,w,O,n,F)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var ye in l)O=l[ye],l.hasOwnProperty(ye)&&O!=null&&!n.hasOwnProperty(ye)&&Ze(e,t,ye,null,n,O);for(H in n)if(O=n[H],F=l[H],n.hasOwnProperty(H)&&O!==F&&(O!=null||F!=null))switch(H){case"children":case"dangerouslySetInnerHTML":if(O!=null)throw Error(r(137,t));break;default:Ze(e,t,H,O,n,F)}return;default:if(Oo(t)){for(var Pe in l)O=l[Pe],l.hasOwnProperty(Pe)&&O!==void 0&&!n.hasOwnProperty(Pe)&&Sr(e,t,Pe,void 0,n,O);for(P in n)O=n[P],F=l[P],!n.hasOwnProperty(P)||O===F||O===void 0&&F===void 0||Sr(e,t,P,O,n,F);return}}for(var D in l)O=l[D],l.hasOwnProperty(D)&&O!=null&&!n.hasOwnProperty(D)&&Ze(e,t,D,null,n,O);for(I in n)O=n[I],F=l[I],!n.hasOwnProperty(I)||O===F||O==null&&F==null||Ze(e,t,I,O,n,F)}function rf(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function Up(){if(typeof performance.getEntriesByType=="function"){for(var e=0,t=0,l=performance.getEntriesByType("resource"),n=0;n<l.length;n++){var a=l[n],i=a.transferSize,s=a.initiatorType,d=a.duration;if(i&&d&&rf(s)){for(s=0,d=a.responseEnd,n+=1;n<l.length;n++){var w=l[n],H=w.startTime;if(H>d)break;var P=w.transferSize,I=w.initiatorType;P&&rf(I)&&(w=w.responseEnd,s+=P*(w<d?1:(d-H)/(w-H)))}if(--n,t+=8*(i+s)/(a.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var Cr=null,Tr=null;function mo(e){return e.nodeType===9?e:e.ownerDocument}function cf(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function df(e,t){if(e===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&t==="foreignObject"?0:e}function jr(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Nr=null;function qp(){var e=window.event;return e&&e.type==="popstate"?e===Nr?!1:(Nr=e,!0):(Nr=null,!1)}var uf=typeof setTimeout=="function"?setTimeout:void 0,Yp=typeof clearTimeout=="function"?clearTimeout:void 0,ff=typeof Promise=="function"?Promise:void 0,Xp=typeof queueMicrotask=="function"?queueMicrotask:typeof ff<"u"?function(e){return ff.resolve(null).then(e).catch(Fp)}:uf;function Fp(e){setTimeout(function(){throw e})}function fn(e){return e==="head"}function hf(e,t){var l=t,n=0;do{var a=l.nextSibling;if(e.removeChild(l),a&&a.nodeType===8)if(l=a.data,l==="/$"||l==="/&"){if(n===0){e.removeChild(a),Ca(t);return}n--}else if(l==="$"||l==="$?"||l==="$~"||l==="$!"||l==="&")n++;else if(l==="html")si(e.ownerDocument.documentElement);else if(l==="head"){l=e.ownerDocument.head,si(l);for(var i=l.firstChild;i;){var s=i.nextSibling,d=i.nodeName;i[vl]||d==="SCRIPT"||d==="STYLE"||d==="LINK"&&i.rel.toLowerCase()==="stylesheet"||l.removeChild(i),i=s}}else l==="body"&&si(e.ownerDocument.body);l=a}while(l);Ca(t)}function pf(e,t){var l=e;e=0;do{var n=l.nextSibling;if(l.nodeType===1?t?(l._stashedDisplay=l.style.display,l.style.display="none"):(l.style.display=l._stashedDisplay||"",l.getAttribute("style")===""&&l.removeAttribute("style")):l.nodeType===3&&(t?(l._stashedText=l.nodeValue,l.nodeValue=""):l.nodeValue=l._stashedText||""),n&&n.nodeType===8)if(l=n.data,l==="/$"){if(e===0)break;e--}else l!=="$"&&l!=="$?"&&l!=="$~"&&l!=="$!"||e++;l=n}while(l)}function Er(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var l=t;switch(t=t.nextSibling,l.nodeName){case"HTML":case"HEAD":case"BODY":Er(l),Na(l);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(l.rel.toLowerCase()==="stylesheet")continue}e.removeChild(l)}}function Gp(e,t,l,n){for(;e.nodeType===1;){var a=l;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!n&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(n){if(!e[vl])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(i=e.getAttribute("rel"),i==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(i!==a.rel||e.getAttribute("href")!==(a.href==null||a.href===""?null:a.href)||e.getAttribute("crossorigin")!==(a.crossOrigin==null?null:a.crossOrigin)||e.getAttribute("title")!==(a.title==null?null:a.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(i=e.getAttribute("src"),(i!==(a.src==null?null:a.src)||e.getAttribute("type")!==(a.type==null?null:a.type)||e.getAttribute("crossorigin")!==(a.crossOrigin==null?null:a.crossOrigin))&&i&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){var i=a.name==null?null:""+a.name;if(a.type==="hidden"&&e.getAttribute("name")===i)return e}else return e;if(e=dl(e.nextSibling),e===null)break}return null}function Vp(e,t,l){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!l||(e=dl(e.nextSibling),e===null))return null;return e}function mf(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!t||(e=dl(e.nextSibling),e===null))return null;return e}function zr(e){return e.data==="$?"||e.data==="$~"}function Mr(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function Qp(e,t){var l=e.ownerDocument;if(e.data==="$~")e._reactRetry=t;else if(e.data!=="$?"||l.readyState!=="loading")t();else{var n=function(){t(),l.removeEventListener("DOMContentLoaded",n)};l.addEventListener("DOMContentLoaded",n),e._reactRetry=n}}function dl(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?"||t==="$~"||t==="&"||t==="F!"||t==="F")break;if(t==="/$"||t==="/&")return null}}return e}var Ar=null;function gf(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var l=e.data;if(l==="/$"||l==="/&"){if(t===0)return dl(e.nextSibling);t--}else l!=="$"&&l!=="$!"&&l!=="$?"&&l!=="$~"&&l!=="&"||t++}e=e.nextSibling}return null}function bf(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var l=e.data;if(l==="$"||l==="$!"||l==="$?"||l==="$~"||l==="&"){if(t===0)return e;t--}else l!=="/$"&&l!=="/&"||t++}e=e.previousSibling}return null}function yf(e,t,l){switch(t=mo(l),e){case"html":if(e=t.documentElement,!e)throw Error(r(452));return e;case"head":if(e=t.head,!e)throw Error(r(453));return e;case"body":if(e=t.body,!e)throw Error(r(454));return e;default:throw Error(r(451))}}function si(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);Na(e)}var ul=new Map,xf=new Set;function go(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var Vl=le.d;le.d={f:Zp,r:Pp,D:Kp,C:$p,L:Wp,m:Jp,X:em,S:Ip,M:tm};function Zp(){var e=Vl.f(),t=oo();return e||t}function Pp(e){var t=Zl(e);t!==null&&t.tag===5&&t.type==="form"?Hd(t):Vl.r(e)}var va=typeof document>"u"?null:document;function vf(e,t,l){var n=va;if(n&&typeof t=="string"&&t){var a=nl(t);a='link[rel="'+e+'"][href="'+a+'"]',typeof l=="string"&&(a+='[crossorigin="'+l+'"]'),xf.has(a)||(xf.add(a),e={rel:e,crossOrigin:l,href:t},n.querySelector(a)===null&&(t=n.createElement("link"),Et(t,"link",e),wt(t),n.head.appendChild(t)))}}function Kp(e){Vl.D(e),vf("dns-prefetch",e,null)}function $p(e,t){Vl.C(e,t),vf("preconnect",e,t)}function Wp(e,t,l){Vl.L(e,t,l);var n=va;if(n&&e&&t){var a='link[rel="preload"][as="'+nl(t)+'"]';t==="image"&&l&&l.imageSrcSet?(a+='[imagesrcset="'+nl(l.imageSrcSet)+'"]',typeof l.imageSizes=="string"&&(a+='[imagesizes="'+nl(l.imageSizes)+'"]')):a+='[href="'+nl(e)+'"]';var i=a;switch(t){case"style":i=wa(e);break;case"script":i=Sa(e)}ul.has(i)||(e=g({rel:"preload",href:t==="image"&&l&&l.imageSrcSet?void 0:e,as:t},l),ul.set(i,e),n.querySelector(a)!==null||t==="style"&&n.querySelector(ri(i))||t==="script"&&n.querySelector(ci(i))||(t=n.createElement("link"),Et(t,"link",e),wt(t),n.head.appendChild(t)))}}function Jp(e,t){Vl.m(e,t);var l=va;if(l&&e){var n=t&&typeof t.as=="string"?t.as:"script",a='link[rel="modulepreload"][as="'+nl(n)+'"][href="'+nl(e)+'"]',i=a;switch(n){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":i=Sa(e)}if(!ul.has(i)&&(e=g({rel:"modulepreload",href:e},t),ul.set(i,e),l.querySelector(a)===null)){switch(n){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(l.querySelector(ci(i)))return}n=l.createElement("link"),Et(n,"link",e),wt(n),l.head.appendChild(n)}}}function Ip(e,t,l){Vl.S(e,t,l);var n=va;if(n&&e){var a=Fn(n).hoistableStyles,i=wa(e);t=t||"default";var s=a.get(i);if(!s){var d={loading:0,preload:null};if(s=n.querySelector(ri(i)))d.loading=5;else{e=g({rel:"stylesheet",href:e,"data-precedence":t},l),(l=ul.get(i))&&Dr(e,l);var w=s=n.createElement("link");wt(w),Et(w,"link",e),w._p=new Promise(function(H,P){w.onload=H,w.onerror=P}),w.addEventListener("load",function(){d.loading|=1}),w.addEventListener("error",function(){d.loading|=2}),d.loading|=4,bo(s,t,n)}s={type:"stylesheet",instance:s,count:1,state:d},a.set(i,s)}}}function em(e,t){Vl.X(e,t);var l=va;if(l&&e){var n=Fn(l).hoistableScripts,a=Sa(e),i=n.get(a);i||(i=l.querySelector(ci(a)),i||(e=g({src:e,async:!0},t),(t=ul.get(a))&&Lr(e,t),i=l.createElement("script"),wt(i),Et(i,"link",e),l.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},n.set(a,i))}}function tm(e,t){Vl.M(e,t);var l=va;if(l&&e){var n=Fn(l).hoistableScripts,a=Sa(e),i=n.get(a);i||(i=l.querySelector(ci(a)),i||(e=g({src:e,async:!0,type:"module"},t),(t=ul.get(a))&&Lr(e,t),i=l.createElement("script"),wt(i),Et(i,"link",e),l.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},n.set(a,i))}}function wf(e,t,l,n){var a=(a=ne.current)?go(a):null;if(!a)throw Error(r(446));switch(e){case"meta":case"title":return null;case"style":return typeof l.precedence=="string"&&typeof l.href=="string"?(t=wa(l.href),l=Fn(a).hoistableStyles,n=l.get(t),n||(n={type:"style",instance:null,count:0,state:null},l.set(t,n)),n):{type:"void",instance:null,count:0,state:null};case"link":if(l.rel==="stylesheet"&&typeof l.href=="string"&&typeof l.precedence=="string"){e=wa(l.href);var i=Fn(a).hoistableStyles,s=i.get(e);if(s||(a=a.ownerDocument||a,s={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},i.set(e,s),(i=a.querySelector(ri(e)))&&!i._p&&(s.instance=i,s.state.loading=5),ul.has(e)||(l={rel:"preload",as:"style",href:l.href,crossOrigin:l.crossOrigin,integrity:l.integrity,media:l.media,hrefLang:l.hrefLang,referrerPolicy:l.referrerPolicy},ul.set(e,l),i||lm(a,e,l,s.state))),t&&n===null)throw Error(r(528,""));return s}if(t&&n!==null)throw Error(r(529,""));return null;case"script":return t=l.async,l=l.src,typeof l=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(t=Sa(l),l=Fn(a).hoistableScripts,n=l.get(t),n||(n={type:"script",instance:null,count:0,state:null},l.set(t,n)),n):{type:"void",instance:null,count:0,state:null};default:throw Error(r(444,e))}}function wa(e){return'href="'+nl(e)+'"'}function ri(e){return'link[rel="stylesheet"]['+e+"]"}function Sf(e){return g({},e,{"data-precedence":e.precedence,precedence:null})}function lm(e,t,l,n){e.querySelector('link[rel="preload"][as="style"]['+t+"]")?n.loading=1:(t=e.createElement("link"),n.preload=t,t.addEventListener("load",function(){return n.loading|=1}),t.addEventListener("error",function(){return n.loading|=2}),Et(t,"link",l),wt(t),e.head.appendChild(t))}function Sa(e){return'[src="'+nl(e)+'"]'}function ci(e){return"script[async]"+e}function Cf(e,t,l){if(t.count++,t.instance===null)switch(t.type){case"style":var n=e.querySelector('style[data-href~="'+nl(l.href)+'"]');if(n)return t.instance=n,wt(n),n;var a=g({},l,{"data-href":l.href,"data-precedence":l.precedence,href:null,precedence:null});return n=(e.ownerDocument||e).createElement("style"),wt(n),Et(n,"style",a),bo(n,l.precedence,e),t.instance=n;case"stylesheet":a=wa(l.href);var i=e.querySelector(ri(a));if(i)return t.state.loading|=4,t.instance=i,wt(i),i;n=Sf(l),(a=ul.get(a))&&Dr(n,a),i=(e.ownerDocument||e).createElement("link"),wt(i);var s=i;return s._p=new Promise(function(d,w){s.onload=d,s.onerror=w}),Et(i,"link",n),t.state.loading|=4,bo(i,l.precedence,e),t.instance=i;case"script":return i=Sa(l.src),(a=e.querySelector(ci(i)))?(t.instance=a,wt(a),a):(n=l,(a=ul.get(i))&&(n=g({},l),Lr(n,a)),e=e.ownerDocument||e,a=e.createElement("script"),wt(a),Et(a,"link",n),e.head.appendChild(a),t.instance=a);case"void":return null;default:throw Error(r(443,t.type))}else t.type==="stylesheet"&&(t.state.loading&4)===0&&(n=t.instance,t.state.loading|=4,bo(n,l.precedence,e));return t.instance}function bo(e,t,l){for(var n=l.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),a=n.length?n[n.length-1]:null,i=a,s=0;s<n.length;s++){var d=n[s];if(d.dataset.precedence===t)i=d;else if(i!==a)break}i?i.parentNode.insertBefore(e,i.nextSibling):(t=l.nodeType===9?l.head:l,t.insertBefore(e,t.firstChild))}function Dr(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function Lr(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}var yo=null;function Tf(e,t,l){if(yo===null){var n=new Map,a=yo=new Map;a.set(l,n)}else a=yo,n=a.get(l),n||(n=new Map,a.set(l,n));if(n.has(e))return n;for(n.set(e,null),l=l.getElementsByTagName(e),a=0;a<l.length;a++){var i=l[a];if(!(i[vl]||i[nt]||e==="link"&&i.getAttribute("rel")==="stylesheet")&&i.namespaceURI!=="http://www.w3.org/2000/svg"){var s=i.getAttribute(t)||"";s=e+s;var d=n.get(s);d?d.push(i):n.set(s,[i])}}return n}function jf(e,t,l){e=e.ownerDocument||e,e.head.insertBefore(l,t==="title"?e.querySelector("head > title"):null)}function nm(e,t,l){if(l===1||t.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;switch(t.rel){case"stylesheet":return e=t.disabled,typeof t.precedence=="string"&&e==null;default:return!0}case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function Nf(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function am(e,t,l,n){if(l.type==="stylesheet"&&(typeof n.media!="string"||matchMedia(n.media).matches!==!1)&&(l.state.loading&4)===0){if(l.instance===null){var a=wa(n.href),i=t.querySelector(ri(a));if(i){t=i._p,t!==null&&typeof t=="object"&&typeof t.then=="function"&&(e.count++,e=xo.bind(e),t.then(e,e)),l.state.loading|=4,l.instance=i,wt(i);return}i=t.ownerDocument||t,n=Sf(n),(a=ul.get(a))&&Dr(n,a),i=i.createElement("link"),wt(i);var s=i;s._p=new Promise(function(d,w){s.onload=d,s.onerror=w}),Et(i,"link",n),l.instance=i}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(l,t),(t=l.state.preload)&&(l.state.loading&3)===0&&(e.count++,l=xo.bind(e),t.addEventListener("load",l),t.addEventListener("error",l))}}var kr=0;function im(e,t){return e.stylesheets&&e.count===0&&wo(e,e.stylesheets),0<e.count||0<e.imgCount?function(l){var n=setTimeout(function(){if(e.stylesheets&&wo(e,e.stylesheets),e.unsuspend){var i=e.unsuspend;e.unsuspend=null,i()}},6e4+t);0<e.imgBytes&&kr===0&&(kr=62500*Up());var a=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&wo(e,e.stylesheets),e.unsuspend)){var i=e.unsuspend;e.unsuspend=null,i()}},(e.imgBytes>kr?50:800)+t);return e.unsuspend=l,function(){e.unsuspend=null,clearTimeout(n),clearTimeout(a)}}:null}function xo(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)wo(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var vo=null;function wo(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,vo=new Map,t.forEach(om,e),vo=null,xo.call(e))}function om(e,t){if(!(t.state.loading&4)){var l=vo.get(e);if(l)var n=l.get(null);else{l=new Map,vo.set(e,l);for(var a=e.querySelectorAll("link[data-precedence],style[data-precedence]"),i=0;i<a.length;i++){var s=a[i];(s.nodeName==="LINK"||s.getAttribute("media")!=="not all")&&(l.set(s.dataset.precedence,s),n=s)}n&&l.set(null,n)}a=t.instance,s=a.getAttribute("data-precedence"),i=l.get(s)||n,i===n&&l.set(null,a),l.set(s,a),this.count++,n=xo.bind(this),a.addEventListener("load",n),a.addEventListener("error",n),i?i.parentNode.insertBefore(a,i.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(a,e.firstChild)),t.state.loading|=4}}var di={$$typeof:$,Provider:null,Consumer:null,_currentValue:de,_currentValue2:de,_threadCount:0};function sm(e,t,l,n,a,i,s,d,w){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=We(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=We(0),this.hiddenUpdates=We(null),this.identifierPrefix=n,this.onUncaughtError=a,this.onCaughtError=i,this.onRecoverableError=s,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=w,this.incompleteTransitions=new Map}function Ef(e,t,l,n,a,i,s,d,w,H,P,I){return e=new sm(e,t,l,s,w,H,P,I,d),t=1,i===!0&&(t|=24),i=Pt(3,null,null,t),e.current=i,i.stateNode=e,t=fs(),t.refCount++,e.pooledCache=t,t.refCount++,i.memoizedState={element:n,isDehydrated:l,cache:t},gs(i),e}function zf(e){return e?(e=In,e):In}function Mf(e,t,l,n,a,i){a=zf(a),n.context===null?n.context=a:n.pendingContext=a,n=en(t),n.payload={element:l},i=i===void 0?null:i,i!==null&&(n.callback=i),l=tn(e,n,t),l!==null&&(Xt(l,e,t),Xa(l,e,t))}function Af(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var l=e.retryLane;e.retryLane=l!==0&&l<t?l:t}}function Rr(e,t){Af(e,t),(e=e.alternate)&&Af(e,t)}function Df(e){if(e.tag===13||e.tag===31){var t=Nn(e,67108864);t!==null&&Xt(t,e,67108864),Rr(e,67108864)}}function Lf(e){if(e.tag===13||e.tag===31){var t=It();t=Nl(t);var l=Nn(e,t);l!==null&&Xt(l,e,t),Rr(e,t)}}var So=!0;function rm(e,t,l,n){var a=y.T;y.T=null;var i=le.p;try{le.p=2,Hr(e,t,l,n)}finally{le.p=i,y.T=a}}function cm(e,t,l,n){var a=y.T;y.T=null;var i=le.p;try{le.p=8,Hr(e,t,l,n)}finally{le.p=i,y.T=a}}function Hr(e,t,l,n){if(So){var a=Or(n);if(a===null)wr(e,t,n,Co,l),Rf(e,n);else if(um(a,e,t,l,n))n.stopPropagation();else if(Rf(e,n),t&4&&-1<dm.indexOf(e)){for(;a!==null;){var i=Zl(a);if(i!==null)switch(i.tag){case 3:if(i=i.stateNode,i.current.memoizedState.isDehydrated){var s=Vt(i.pendingLanes);if(s!==0){var d=i;for(d.pendingLanes|=2,d.entangledLanes|=2;s;){var w=1<<31-Le(s);d.entanglements[1]|=w,s&=~w}Tl(i),(qe&6)===0&&(ao=Oe()+500,ai(0))}}break;case 31:case 13:d=Nn(i,2),d!==null&&Xt(d,i,2),oo(),Rr(i,2)}if(i=Or(n),i===null&&wr(e,t,n,Co,l),i===a)break;a=i}a!==null&&n.stopPropagation()}else wr(e,t,n,null,l)}}function Or(e){return e=_o(e),Br(e)}var Co=null;function Br(e){if(Co=null,e=El(e),e!==null){var t=h(e);if(t===null)e=null;else{var l=t.tag;if(l===13){if(e=b(t),e!==null)return e;e=null}else if(l===31){if(e=M(t),e!==null)return e;e=null}else if(l===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return Co=e,null}function kf(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Ve()){case tt:return 2;case it:return 8;case ut:case fl:return 32;case kt:return 268435456;default:return 32}default:return 32}}var _r=!1,hn=null,pn=null,mn=null,ui=new Map,fi=new Map,gn=[],dm="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Rf(e,t){switch(e){case"focusin":case"focusout":hn=null;break;case"dragenter":case"dragleave":pn=null;break;case"mouseover":case"mouseout":mn=null;break;case"pointerover":case"pointerout":ui.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":fi.delete(t.pointerId)}}function hi(e,t,l,n,a,i){return e===null||e.nativeEvent!==i?(e={blockedOn:t,domEventName:l,eventSystemFlags:n,nativeEvent:i,targetContainers:[a]},t!==null&&(t=Zl(t),t!==null&&Df(t)),e):(e.eventSystemFlags|=n,t=e.targetContainers,a!==null&&t.indexOf(a)===-1&&t.push(a),e)}function um(e,t,l,n,a){switch(t){case"focusin":return hn=hi(hn,e,t,l,n,a),!0;case"dragenter":return pn=hi(pn,e,t,l,n,a),!0;case"mouseover":return mn=hi(mn,e,t,l,n,a),!0;case"pointerover":var i=a.pointerId;return ui.set(i,hi(ui.get(i)||null,e,t,l,n,a)),!0;case"gotpointercapture":return i=a.pointerId,fi.set(i,hi(fi.get(i)||null,e,t,l,n,a)),!0}return!1}function Hf(e){var t=El(e.target);if(t!==null){var l=h(t);if(l!==null){if(t=l.tag,t===13){if(t=b(l),t!==null){e.blockedOn=t,Ht(e.priority,function(){Lf(l)});return}}else if(t===31){if(t=M(l),t!==null){e.blockedOn=t,Ht(e.priority,function(){Lf(l)});return}}else if(t===3&&l.stateNode.current.memoizedState.isDehydrated){e.blockedOn=l.tag===3?l.stateNode.containerInfo:null;return}}}e.blockedOn=null}function To(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var l=Or(e.nativeEvent);if(l===null){l=e.nativeEvent;var n=new l.constructor(l.type,l);Bo=n,l.target.dispatchEvent(n),Bo=null}else return t=Zl(l),t!==null&&Df(t),e.blockedOn=l,!1;t.shift()}return!0}function Of(e,t,l){To(e)&&l.delete(t)}function fm(){_r=!1,hn!==null&&To(hn)&&(hn=null),pn!==null&&To(pn)&&(pn=null),mn!==null&&To(mn)&&(mn=null),ui.forEach(Of),fi.forEach(Of)}function jo(e,t){e.blockedOn===t&&(e.blockedOn=null,_r||(_r=!0,c.unstable_scheduleCallback(c.unstable_NormalPriority,fm)))}var No=null;function Bf(e){No!==e&&(No=e,c.unstable_scheduleCallback(c.unstable_NormalPriority,function(){No===e&&(No=null);for(var t=0;t<e.length;t+=3){var l=e[t],n=e[t+1],a=e[t+2];if(typeof n!="function"){if(Br(n||l)===null)continue;break}var i=Zl(l);i!==null&&(e.splice(t,3),t-=3,Os(i,{pending:!0,data:a,method:l.method,action:n},n,a))}}))}function Ca(e){function t(w){return jo(w,e)}hn!==null&&jo(hn,e),pn!==null&&jo(pn,e),mn!==null&&jo(mn,e),ui.forEach(t),fi.forEach(t);for(var l=0;l<gn.length;l++){var n=gn[l];n.blockedOn===e&&(n.blockedOn=null)}for(;0<gn.length&&(l=gn[0],l.blockedOn===null);)Hf(l),l.blockedOn===null&&gn.shift();if(l=(e.ownerDocument||e).$$reactFormReplay,l!=null)for(n=0;n<l.length;n+=3){var a=l[n],i=l[n+1],s=a[ft]||null;if(typeof i=="function")s||Bf(l);else if(s){var d=null;if(i&&i.hasAttribute("formAction")){if(a=i,s=i[ft]||null)d=s.formAction;else if(Br(a)!==null)continue}else d=s.action;typeof d=="function"?l[n+1]=d:(l.splice(n,3),n-=3),Bf(l)}}}function _f(){function e(i){i.canIntercept&&i.info==="react-transition"&&i.intercept({handler:function(){return new Promise(function(s){return a=s})},focusReset:"manual",scroll:"manual"})}function t(){a!==null&&(a(),a=null),n||setTimeout(l,20)}function l(){if(!n&&!navigation.transition){var i=navigation.currentEntry;i&&i.url!=null&&navigation.navigate(i.url,{state:i.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var n=!1,a=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",t),navigation.addEventListener("navigateerror",t),setTimeout(l,100),function(){n=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",t),navigation.removeEventListener("navigateerror",t),a!==null&&(a(),a=null)}}}function Ur(e){this._internalRoot=e}Eo.prototype.render=Ur.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(r(409));var l=t.current,n=It();Mf(l,n,e,t,null,null)},Eo.prototype.unmount=Ur.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Mf(e.current,2,null,e,null,null),oo(),t[tl]=null}};function Eo(e){this._internalRoot=e}Eo.prototype.unstable_scheduleHydration=function(e){if(e){var t=ve();e={blockedOn:null,target:e,priority:t};for(var l=0;l<gn.length&&t!==0&&t<gn[l].priority;l++);gn.splice(l,0,e),l===0&&Hf(e)}};var Uf=p.version;if(Uf!=="19.2.0")throw Error(r(527,Uf,"19.2.0"));le.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(r(188)):(e=Object.keys(e).join(","),Error(r(268,e)));return e=m(t),e=e!==null?T(e):null,e=e===null?null:e.stateNode,e};var hm={bundleType:0,version:"19.2.0",rendererPackageName:"react-dom",currentDispatcherRef:y,reconcilerVersion:"19.2.0"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var zo=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!zo.isDisabled&&zo.supportsFiber)try{Ft=zo.inject(hm),ot=zo}catch{}}return mi.createRoot=function(e,t){if(!v(e))throw Error(r(299));var l=!1,n="",a=Vd,i=Qd,s=Zd;return t!=null&&(t.unstable_strictMode===!0&&(l=!0),t.identifierPrefix!==void 0&&(n=t.identifierPrefix),t.onUncaughtError!==void 0&&(a=t.onUncaughtError),t.onCaughtError!==void 0&&(i=t.onCaughtError),t.onRecoverableError!==void 0&&(s=t.onRecoverableError)),t=Ef(e,1,!1,null,null,l,n,null,a,i,s,_f),e[tl]=t.current,vr(e),new Ur(t)},mi.hydrateRoot=function(e,t,l){if(!v(e))throw Error(r(299));var n=!1,a="",i=Vd,s=Qd,d=Zd,w=null;return l!=null&&(l.unstable_strictMode===!0&&(n=!0),l.identifierPrefix!==void 0&&(a=l.identifierPrefix),l.onUncaughtError!==void 0&&(i=l.onUncaughtError),l.onCaughtError!==void 0&&(s=l.onCaughtError),l.onRecoverableError!==void 0&&(d=l.onRecoverableError),l.formState!==void 0&&(w=l.formState)),t=Ef(e,1,!0,t,l??null,n,a,w,i,s,d,_f),t.context=zf(null),l=t.current,n=It(),n=Nl(n),a=en(n),a.callback=null,tn(l,a,n),l=n,t.current.lanes=l,Dt(t,l),Tl(t),e[tl]=t.current,vr(e),new Eo(t)},mi.version="19.2.0",mi}var Kf;function Tm(){if(Kf)return Xr.exports;Kf=1;function c(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c)}catch(p){console.error(p)}}return c(),Xr.exports=Cm(),Xr.exports}var jm=Tm();const Nm=lh(jm),Em=({htmlCode:c,cssCode:p,jsCode:u,onHtmlChange:r,onCssChange:v,onJsChange:h,onClearCode:b,scrollToLine:M,onScrollComplete:x,t:m})=>{const T=N.useRef(null),g=N.useRef(null),E=N.useRef(!1),[C,A]=N.useState("html"),L={html:c,css:p,js:u},K={html:"htmlmixed",css:"css",js:"javascript"};N.useEffect(()=>{if(!T.current)return;let ee;const $=setInterval(()=>{typeof CodeMirror<"u"&&(clearInterval($),ee=CodeMirror(T.current,{lineNumbers:!0,theme:"material-darker",mode:K[C],value:L[C],lineWrapping:!1}),g.current=ee,ee.on("change",_=>{if(E.current)return;const oe=_.getValue();(C==="html"?r:C==="css"?v:h)(oe)}))},100);return()=>{if(clearInterval($),g.current){const _=g.current.getWrapperElement();_!=null&&_.parentNode&&_.parentNode.removeChild(_),g.current=null}}},[]),N.useEffect(()=>{const ee=g.current;if(!ee)return;const $=L[C],_=K[C];if(ee.getOption("mode")!==_&&ee.setOption("mode",_),ee.getValue()!==$){E.current=!0;const oe=ee.getCursor();ee.setValue($),ee.setCursor(oe),setTimeout(()=>{E.current=!1},20)}},[C,c,p,u,L,K]),N.useEffect(()=>{const ee=g.current;if(ee&&M&&C==="html"){const $=M-1;ee.scrollIntoView({line:$,ch:0},100),ee.addLineClass($,"background","cm-line-highlight"),setTimeout(()=>{ee.getLineHandle($)&&ee.removeLineClass($,"background","cm-line-highlight")},1500),x()}},[M,C,x]);const J=({tab:ee,label:$})=>o.jsx("button",{onClick:()=>A(ee),className:`px-4 py-2 text-sm font-medium transition-colors ${C===ee?"text-white bg-[#282c34]":"text-gray-400 hover:text-white"}`,children:$});return o.jsxs(o.Fragment,{children:[o.jsx("style",{children:`
        /* CodeMirror custom styles */
        .CodeMirror {
          height: 100%;
          font-family: 'JetBrains Mono', monospace;
          font-size: 14px;
        }
        .CodeMirror-gutters {
          background-color: #21252b !important;
          border-right: 1px solid #3a3f4c;
        }
        .cm-line-highlight {
          background-color: rgba(255, 255, 0, 0.15);
        }
        /* Scrollbar styles for CodeMirror */
        .CodeMirror-scrollbar-filler, .CodeMirror-gutter-filler {
          background-color: #282c34;
        }
        .CodeMirror-vscrollbar::-webkit-scrollbar,
        .CodeMirror-hscrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .CodeMirror-vscrollbar::-webkit-scrollbar-track,
        .CodeMirror-hscrollbar::-webkit-scrollbar-track {
          background: #282c34;
        }
        .CodeMirror-vscrollbar::-webkit-scrollbar-thumb,
        .CodeMirror-hscrollbar::-webkit-scrollbar-thumb {
          background-color: #555;
          border-radius: 4px;
          border: 2px solid #282c34;
        }
        .CodeMirror-vscrollbar::-webkit-scrollbar-thumb:hover,
        .CodeMirror-hscrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #777;
        }
      `}),o.jsxs("div",{className:"flex flex-col h-full bg-[#282c34] rounded-lg shadow-inner",children:[o.jsxs("div",{className:"bg-gray-700 text-white px-2 rounded-t-lg font-medium flex items-center justify-between",children:[o.jsxs("div",{className:"flex items-center",children:[o.jsx(J,{tab:"html",label:"HTML"}),o.jsx(J,{tab:"css",label:"CSS"}),o.jsx(J,{tab:"js",label:"JavaScript"})]}),o.jsxs("button",{onClick:()=>b(C),title:m("editor.clearCode",{tab:C.toUpperCase()}),className:"text-gray-400 hover:text-white text-xs px-2 py-1 rounded-md flex items-center gap-1 transition-colors",children:[o.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-4 w-4",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:o.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"})}),m("editor.clearCodeShort")]})]}),o.jsx("div",{ref:T,className:"flex-grow w-full rounded-b-lg overflow-hidden relative"})]})]})},zm=`
    .selected-element-highlight {
      outline: 2px solid #3b82f6 !important;
      outline-offset: 2px;
      box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
    }
    *:hover {
      outline: 1px dashed #a0aec0;
    }
    .selected-element-highlight:hover {
       outline: 2px solid #3b82f6 !important;
    }
    [contenteditable="true"] {
      outline: 2px solid #dc2626 !important; /* Changed from green to red for editing state */
      cursor: text;
    }
    .is-dragging, .is-dragging * {
        user-select: none !important;
        -webkit-user-select: none !important;
        cursor: move !important;
    }
    #mini-toolbar {
        position: absolute;
        background-color: white;
        border-radius: 6px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        display: flex;
        gap: 4px;
        padding: 4px;
        z-index: 10000;
        transform: translateY(-100%) translateY(-8px);
        transition: opacity 0.1s ease-in-out;
    }
    #mini-toolbar button {
        background: none;
        border: none;
        cursor: pointer;
        padding: 6px;
        border-radius: 4px;
        color: #4a5568;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    #mini-toolbar button:hover {
        background-color: #f1f3f5;
        color: #1a202c;
    }
    .drag-ghost {
      position: absolute;
      pointer-events: none;
      opacity: 0.7;
      z-index: 10001;
    }
    .drop-zone-highlight {
        outline: 2px dashed #3b82f6 !important;
        outline-offset: 2px;
        background-color: rgba(59, 130, 246, 0.1);
    }
    .drop-placeholder {
        background-color: rgba(59, 130, 246, 0.3);
        flex-shrink: 0;
    }
    /* Animation Keyframes */
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    @keyframes slideUp {
        from { opacity: 0; transform: translateY(var(--anim-distance, 20px)); }
        to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideDown {
        from { opacity: 0; transform: translateY(calc(var(--anim-distance, 20px) * -1)); }
        to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideInLeft {
        from { opacity: 0; transform: translateX(calc(var(--anim-distance, 20px) * -1)); }
        to { opacity: 1; transform: translateX(0); }
    }
    @keyframes slideInRight {
        from { opacity: 0; transform: translateX(var(--anim-distance, 20px)); }
        to { opacity: 1; transform: translateX(0); }
    }
    /* Animation Classes */
    .anim-fade-in {
        animation-name: fadeIn;
        animation-fill-mode: forwards;
        animation-timing-function: ease-out;
    }
    .anim-slide-up {
        animation-name: slideUp;
        animation-fill-mode: forwards;
        animation-timing-function: ease-out;
    }
    .anim-slide-down {
        animation-name: slideDown;
        animation-fill-mode: forwards;
        animation-timing-function: ease-out;
    }
    .anim-slide-in-left {
        animation-name: slideInLeft;
        animation-fill-mode: forwards;
        animation-timing-function: ease-out;
    }
    .anim-slide-in-right {
        animation-name: slideInRight;
        animation-fill-mode: forwards;
        animation-timing-function: ease-out;
    }
  `,Mm=`
    // Wrap script in a DOMContentLoaded listener to ensure everything is ready.
    document.addEventListener('DOMContentLoaded', () => {
      let currentSelectedSelectors = [];
      let resizerDiv = null;
      let miniToolbar = null;
      let ignoreNextClick = false;
      let selectionBox = null;
      let isSelecting = false;
      let startX = 0;
      let startY = 0;
      let isMultiSelectModeEnabled = false;

      function getCssPath(el) {
        if (!(el instanceof Element) || el.id?.startsWith('resizer-handle') || el.id === 'page-resize-handle' || el.closest('#mini-toolbar')) return null;
        const path = [];
        while (el && el.nodeType === Node.ELEMENT_NODE) {
            let selector = el.nodeName.toLowerCase();
            // FIX for Font Awesome SVG replacement: treat FA SVGs as <i> tags for path generation.
            if (selector === 'svg' && el.classList.contains('svg-inline--fa')) {
                selector = 'i';
            }

            if (el.id) {
                selector = '#' + el.id;
                path.unshift(selector);
                break;
            } else {
                let sib = el, nth = 1;
                while (sib = sib.previousElementSibling) {
                    let sibSelector = sib.nodeName.toLowerCase();
                    if (sibSelector === 'svg' && sib.classList.contains('svg-inline--fa')) {
                        sibSelector = 'i';
                    }
                    if (sibSelector === selector) nth++;
                }
                if (nth !== 1) selector += ":nth-of-type(" + nth + ")";
            }
            path.unshift(selector);
            if (el.parentNode && el.parentNode.nodeType !== Node.ELEMENT_NODE) break;
            el = el.parentNode;
        }
        return path.join(" > ");
      }
      
      const findTargetElement = (startEl) => {
          let finalTarget = startEl;
          const imageWrapper = finalTarget.closest('.image-wrapper');
          const chartContainer = finalTarget.closest('.chart-container');
          const table = finalTarget.closest('table');
          
          if (imageWrapper && imageWrapper.contains(finalTarget)) {
              finalTarget = imageWrapper;
          } else if (chartContainer && chartContainer.contains(finalTarget)) {
              finalTarget = chartContainer;
          } else if (table && table.contains(finalTarget) && finalTarget.tagName !== 'TABLE') {
              finalTarget = table;
          }
          return finalTarget;
      };

      function createOrUpdateMiniToolbar(element) {
          if (!miniToolbar) {
              miniToolbar = document.createElement('div');
              miniToolbar.id = 'mini-toolbar';
              miniToolbar.style.opacity = '0';

              const duplicateButton = document.createElement('button');
              duplicateButton.title = '요소 복제';
              duplicateButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2 2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
              duplicateButton.onclick = (e) => {
                  e.stopPropagation();
                  if (currentSelectedSelectors.length === 1) {
                      const elToDupe = document.querySelector(currentSelectedSelectors[0]);
                      if (elToDupe) {
                          const rect = elToDupe.getBoundingClientRect();
                          const serializableRect = { top: rect.top, left: rect.left };
                          window.parent.postMessage({ type: 'duplicate-element', payload: { selector: currentSelectedSelectors[0], rect: serializableRect } }, '*');
                      }
                  }
              };
              miniToolbar.appendChild(duplicateButton);

              const deleteButton = document.createElement('button');
              deleteButton.title = '요소 삭제';
              deleteButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>';
              deleteButton.onclick = (e) => {
                  e.stopPropagation();
                  if (currentSelectedSelectors.length > 0) {
                      window.parent.postMessage({ type: 'delete-element' }, '*');
                  }
              };
              miniToolbar.appendChild(deleteButton);
              document.body.appendChild(miniToolbar);
          }

          if (element) {
              const rect = element.getBoundingClientRect();
              miniToolbar.style.left = (rect.left + window.scrollX) + 'px';
              miniToolbar.style.top = (rect.top + window.scrollY) + 'px';
              miniToolbar.style.opacity = '1';
          } else {
              miniToolbar.style.opacity = '0';
          }
      }
      
      function buildElementInfo(element) {
        const computedStyle = getComputedStyle(element);
        const link = element.closest('a');
        const lineHeightStr = computedStyle.lineHeight;
        let lineHeight = 1.5; // default for 'normal'
        if (lineHeightStr !== 'normal') {
            const lhPx = parseFloat(lineHeightStr);
            const fsPx = parseFloat(computedStyle.fontSize);
            if (fsPx > 0 && !isNaN(lhPx)) {
                lineHeight = parseFloat((lhPx / fsPx).toFixed(2));
            }
        }

        return {
          id: getCssPath(element),
          tagName: element.tagName,
          text: element.innerHTML,
          currentFontSize: Math.round(parseFloat(computedStyle.fontSize)),
          currentWidth: Math.round(element.offsetWidth),
          currentHeight: Math.round(element.offsetHeight),
          currentTop: element.offsetTop,
          currentLeft: element.offsetLeft,
          color: computedStyle.color,
          backgroundColor: computedStyle.backgroundColor,
          fontWeight: computedStyle.fontWeight,
          fontStyle: computedStyle.fontStyle,
          textDecoration: computedStyle.textDecorationLine,
          textAlign: computedStyle.textAlign,
          fontFamily: computedStyle.fontFamily,
          isLink: !!link,
          linkHref: link ? link.getAttribute('href') || '' : '',
          linkTarget: link ? link.getAttribute('target') || '' : '',
          paddingTop: Math.round(parseFloat(computedStyle.paddingTop)),
          paddingRight: Math.round(parseFloat(computedStyle.paddingRight)),
          paddingBottom: Math.round(parseFloat(computedStyle.paddingBottom)),
          paddingLeft: Math.round(parseFloat(computedStyle.paddingLeft)),
          marginTop: Math.round(parseFloat(computedStyle.marginTop)),
          marginRight: Math.round(parseFloat(computedStyle.marginRight)),
          marginBottom: Math.round(parseFloat(computedStyle.marginBottom)),
          marginLeft: Math.round(parseFloat(computedStyle.marginLeft)),
          borderWidth: Math.round(parseFloat(computedStyle.borderTopWidth)),
          borderStyle: computedStyle.borderTopStyle,
          borderColor: computedStyle.borderTopColor,
          borderRadius: Math.round(parseFloat(computedStyle.borderRadius)),
          boxShadow: computedStyle.boxShadow,
          opacity: parseFloat(computedStyle.opacity),
          zIndex: computedStyle.zIndex === 'auto' ? 0 : parseInt(computedStyle.zIndex, 10),
          position: computedStyle.position,
          display: computedStyle.display,
          flexDirection: computedStyle.flexDirection,
          alignItems: computedStyle.alignItems,
          justifyContent: computedStyle.justifyContent,
          lineNumber: element.dataset.lineNumber ? parseInt(element.dataset.lineNumber, 10) : 0,
          animationDuration: computedStyle.animationDuration,
          lineHeight: lineHeight,
        };
      }

      document.addEventListener('click', (e) => {
          if (ignoreNextClick) {
              ignoreNextClick = false;
              e.preventDefault();
              e.stopPropagation();
              return;
          }

          const target = e.target;
          if (!target || target.id?.startsWith('resizer-handle') || target.id === 'page-resize-handle' || target.isContentEditable || target.closest('#mini-toolbar')) {
              return;
          }
          
          e.preventDefault();
          e.stopPropagation();

          const bodyBg = getComputedStyle(document.body).backgroundColor;
          const isShiftPressed = e.shiftKey;
          
          // Find containing slide for context
          const containingSlide = target.closest('.slide-item, [class*="slide-"]');
          const slideSelector = containingSlide ? getCssPath(containingSlide) : null;

          if (target === document.body || target === document.documentElement) {
              if(!isMultiSelectModeEnabled && !isShiftPressed) window.parent.postMessage({ type: 'element-select', payload: { info: null, bodyBg, slideSelector: null } }, '*');
              return;
          }
          
          const finalTarget = findTargetElement(target);
          const selector = getCssPath(finalTarget);

          if (!selector) {
              if(!isMultiSelectModeEnabled && !isShiftPressed) window.parent.postMessage({ type: 'element-select', payload: { info: null, bodyBg, slideSelector } }, '*');
              return;
          }

          const info = buildElementInfo(finalTarget);
          
          if (isMultiSelectModeEnabled || isShiftPressed) {
              window.parent.postMessage({ type: 'element-toggle-select', payload: { info, slideSelector } }, '*');
          } else {
              window.parent.postMessage({ type: 'element-select', payload: { info, bodyBg, slideSelector } }, '*');
          }
      }, true);
      
      document.addEventListener('dblclick', (e) => {
          const target = e.target;
          if (!target || target.id?.startsWith('resizer-handle') || target.id === 'page-resize-handle') return;

          e.preventDefault();
          e.stopPropagation();

          const finalTarget = findTargetElement(target);

          finalTarget.contentEditable = true;
          finalTarget.focus();
          
          const selection = window.getSelection();
          const range = document.createRange();
          range.selectNodeContents(finalTarget);
          range.collapse(false);
          selection.removeAllRanges();
          selection.addRange(range);

          const originalHtml = finalTarget.innerHTML;

          const cleanup = () => {
              finalTarget.contentEditable = false;
              finalTarget.removeEventListener('blur', onBlur);
              finalTarget.removeEventListener('keydown', onKeydown);
          };

          const onBlur = () => {
              cleanup();
              const newHtml = finalTarget.innerHTML;
              if (newHtml !== originalHtml) {
                const selector = getCssPath(finalTarget);
                if(selector) {
                    window.parent.postMessage({
                        type: 'element-text-update',
                        payload: { selector: selector, newHtml: newHtml }
                    }, '*');
                }
              }
          };
          
          const onKeydown = (ev) => {
            if (ev.key === 'Enter' && !ev.shiftKey) {
              ev.preventDefault();
              finalTarget.blur();
            } else if (ev.key === 'Escape') {
              finalTarget.innerHTML = originalHtml;
              finalTarget.blur();
            }
          };

          finalTarget.addEventListener('blur', onBlur);
          finalTarget.addEventListener('keydown', onKeydown);
      });

      function createOrUpdateResizer(element) {
          if (resizerDiv) resizerDiv.remove();
          if (!element) return;

          resizerDiv = document.createElement('div');
          resizerDiv.style.position = 'absolute';
          resizerDiv.style.pointerEvents = 'none';
          resizerDiv.style.zIndex = '9998';
          resizerDiv.style.border = '1px solid #3b82f6';

          const rect = element.getBoundingClientRect();
          resizerDiv.style.left = (rect.left + window.scrollX) + 'px';
          resizerDiv.style.top = (rect.top + window.scrollY) + 'px';
          resizerDiv.style.width = rect.width + 'px';
          resizerDiv.style.height = rect.height + 'px';
          document.body.appendChild(resizerDiv);
          
          const updateResizerPosition = (el) => {
              if (!resizerDiv) return;
              const currentRect = el.getBoundingClientRect();
              resizerDiv.style.left = (currentRect.left + window.scrollX) + 'px';
              resizerDiv.style.top = (currentRect.top + window.scrollY) + 'px';
              resizerDiv.style.width = currentRect.width + 'px';
              resizerDiv.style.height = currentRect.height + 'px';
          };

          const handles = [
              { name: 'tl', cursor: 'nwse-resize', top: '-4px', left: '-4px' },
              { name: 'tc', cursor: 'ns-resize', top: '-4px', left: '50%', transform: 'translateX(-50%)' },
              { name: 'tr', cursor: 'nesw-resize', top: '-4px', right: '-4px' },
              { name: 'ml', cursor: 'ew-resize', top: '50%', left: '-4px', transform: 'translateY(-50%)' },
              { name: 'mr', cursor: 'ew-resize', top: '50%', right: '-4px', transform: 'translateY(-50%)' },
              { name: 'bl', cursor: 'nesw-resize', bottom: '-4px', left: '-4px' },
              { name: 'bc', cursor: 'ns-resize', bottom: '-4px', left: '50%', transform: 'translateX(-50%)' },
              { name: 'br', cursor: 'nwse-resize', bottom: '-4px', right: '-4px' },
          ];
          
          handles.forEach(handleInfo => {
              const handle = document.createElement('div');
              handle.id = 'resizer-handle-' + handleInfo.name;
              Object.assign(handle.style, {
                  position: 'absolute', width: '8px', height: '8px',
                  backgroundColor: '#3b82f6', border: '1px solid white',
                  cursor: handleInfo.cursor, pointerEvents: 'all', zIndex: '9999',
                  top: handleInfo.top, bottom: handleInfo.bottom,
                  left: handleInfo.left, right: handleInfo.right,
                  transform: handleInfo.transform || ''
              });
              
              handle.addEventListener('mousedown', (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  
                  const computedStyle = getComputedStyle(element);
                  const isAbsolute = computedStyle.position === 'absolute';

                  const startX = e.clientX;
                  const startY = e.clientY;
                  const startWidth = element.offsetWidth;
                  const startHeight = element.offsetHeight;
                  const startTop = element.offsetTop;
                  const startLeft = element.offsetLeft;
                  const cs = window.getComputedStyle(element);
                  const startMarginLeft = parseFloat(cs.marginLeft);
                  const startMarginTop = parseFloat(cs.marginTop);
                  let needsPositionUpdate = false;

                  if (isAbsolute) {
                      if (cs.transform !== 'none') {
                          needsPositionUpdate = true;
                          const parent = element.offsetParent || document.body;
                          const parentRect = parent.getBoundingClientRect();
                          const rect = element.getBoundingClientRect();
                          const newTop = rect.top - parentRect.top;
                          const newLeft = rect.left - parentRect.left;
                          element.style.top = newTop + 'px';
                          element.style.left = newLeft + 'px';
                          element.style.transform = 'none';
                          element.style.margin = '0px';
                      }
                  }

                  const onMouseMove = (moveEvent) => {
                      const dx = moveEvent.clientX - startX;
                      const dy = moveEvent.clientY - startY;

                      if (isAbsolute) {
                          let newWidth = startWidth, newHeight = startHeight, newTop = startTop, newLeft = startLeft;
                          
                          const isCornerHandle = ['tl', 'tr', 'bl', 'br'].includes(handleInfo.name);
                          const maintainAspectRatio = isCornerHandle && (element.tagName === 'IMG' || element.classList.contains('image-wrapper'));

                          if (element.classList.contains('image-wrapper')) {
                              const img = element.querySelector('img');
                              if (img) img.style.objectFit = maintainAspectRatio ? 'cover' : 'fill';
                          }

                          if (maintainAspectRatio) {
                              const aspectRatio = startWidth / startHeight;
                              let widthChange = 0;
                              if (handleInfo.name.includes('r')) widthChange = dx;
                              if (handleInfo.name.includes('l')) widthChange = -dx;
                              let heightChange = 0;
                              if (handleInfo.name.includes('b')) heightChange = dy;
                              if (handleInfo.name.includes('t')) heightChange = -dy;
                              
                              if (Math.abs(widthChange) / startWidth > Math.abs(heightChange) / startHeight) {
                                  newWidth = startWidth + widthChange;
                                  newHeight = newWidth / aspectRatio;
                              } else {
                                  newHeight = startHeight + heightChange;
                                  newWidth = newHeight * aspectRatio;
                              }
                              if (handleInfo.name.includes('l')) newLeft = startLeft + (startWidth - newWidth);
                              if (handleInfo.name.includes('t')) newTop = startTop + (startHeight - newHeight);
                          } else {
                              if (handleInfo.name.includes('r')) newWidth = startWidth + dx;
                              if (handleInfo.name.includes('l')) { newWidth = startWidth - dx; newLeft = startLeft + dx; }
                              if (handleInfo.name.includes('b')) newHeight = startHeight + dy;
                              if (handleInfo.name.includes('t')) { newHeight = startHeight - dy; newTop = startTop + dy; }
                          }

                          if (newWidth > 10) { element.style.width = newWidth + 'px'; element.style.left = newLeft + 'px'; }
                          if (newHeight > 10) { element.style.height = newHeight + 'px'; element.style.top = newTop + 'px'; }
                      } else {
                          const parent = element.parentElement;
                          const isFlexChild = parent && getComputedStyle(parent).display === 'flex';
                          let newWidth = startWidth, newHeight = startHeight, newMarginLeft = startMarginLeft, newMarginTop = startMarginTop;
                          
                          if (handleInfo.name.includes('r')) newWidth = startWidth + dx;
                          if (handleInfo.name.includes('l')) { newWidth = startWidth - dx; newMarginLeft = startMarginLeft + dx; }
                          if (handleInfo.name.includes('b')) newHeight = startHeight + dy;
                          if (handleInfo.name.includes('t')) { newHeight = startHeight - dy; newMarginTop = startMarginTop + dy; }

                          if (newWidth > 10) {
                              if (isFlexChild) {
                                  element.style.flexBasis = newWidth + 'px';
                                  element.style.flexGrow = '0';
                                  element.style.flexShrink = '0';
                              } else {
                                  element.style.width = newWidth + 'px';
                              }
                              element.style.marginLeft = newMarginLeft + 'px';
                          }
                          if (newHeight > 10) {
                              element.style.height = newHeight + 'px';
                              element.style.marginTop = newMarginTop + 'px';
                          }
                      }
                      updateResizerPosition(element);
                  };
                  
                  const onMouseUp = () => {
                      document.removeEventListener('mousemove', onMouseMove);
                      document.removeEventListener('mouseup', onMouseUp);

                      const elementSelector = getCssPath(element);
                      let stylesToUpdate = {};
                      const updates = [];
                      
                      if (isAbsolute) {
                          stylesToUpdate = { 
                              width: element.style.width, height: element.style.height,
                              top: element.style.top, left: element.style.left
                          };
                          if (needsPositionUpdate) {
                              stylesToUpdate.transform = 'none';
                              stylesToUpdate.margin = '0px';
                          }
                          updates.push({ selector: elementSelector, styles: stylesToUpdate });
                          if (element.classList.contains('image-wrapper')) {
                              const img = element.querySelector('img');
                              if (img) {
                                  const isCornerHandle = ['tl', 'tr', 'bl', 'br'].includes(handleInfo.name);
                                  updates.push({
                                      selector: getCssPath(img),
                                      styles: { objectFit: isCornerHandle ? 'cover' : 'fill' }
                                  });
                              }
                          }
                      } else {
                          const parent = element.parentElement;
                          const isFlexChild = parent && getComputedStyle(parent).display === 'flex';
                          stylesToUpdate = { 
                              height: element.style.height,
                              marginLeft: element.style.marginLeft,
                              marginTop: element.style.marginTop
                          };
                          if (isFlexChild) {
                              stylesToUpdate.flexBasis = element.style.flexBasis;
                              stylesToUpdate.flexGrow = '0';
                              stylesToUpdate.flexShrink = '0';
                          } else {
                              stylesToUpdate.width = element.style.width;
                          }
                          updates.push({ selector: elementSelector, styles: stylesToUpdate });
                      }
                      
                      Object.keys(stylesToUpdate).forEach(key => {
                          if (stylesToUpdate[key] === '') delete stylesToUpdate[key];
                      });

                      if (updates.length > 1) {
                          window.parent.postMessage({ type: 'elements-styles-update', payload: { updates } }, '*');
                      } else if (updates.length === 1 && updates[0].selector) {
                          window.parent.postMessage({ type: 'element-styles-update', payload: updates[0] }, '*');
                      }
                  };

                  document.addEventListener('mousemove', onMouseMove);
                  document.addEventListener('mouseup', onMouseUp, { once: true });
              });
              resizerDiv.appendChild(handle);
          });
      }

      function onDragStart(e) {
          const element = e.currentTarget;
          if (e.button !== 0 || e.target.isContentEditable || e.target.id.startsWith('resizer-handle-')) return;
      
          e.preventDefault();
          e.stopPropagation();
      
          let isDragging = false;
          const isAbsolute = getComputedStyle(element).position === 'absolute';
          const startX = e.clientX;
          const startY = e.clientY;
      
          const rect = element.getBoundingClientRect();
          const docInitialTop = rect.top + window.scrollY;
          const docInitialLeft = rect.left + window.scrollX;
      
          let ghost, placeholder, dropTargets, currentDropTarget;
          let accumulatedX = 0;
          let accumulatedY = 0;
      
          function onDragMove(moveEvent) {
              if (!isDragging) {
                  if (Math.abs(moveEvent.clientX - startX) < 5 && Math.abs(moveEvent.clientY - startY) < 5) {
                      return;
                  }
                  isDragging = true;
                  document.body.classList.add('is-dragging');
      
                  ghost = element.cloneNode(true);
                  ghost.classList.add('drag-ghost');
                  ghost.style.border = '2px dashed #3b82f6';
                  Object.assign(ghost.style, {
                      boxSizing: 'border-box',
                      width: rect.width + 'px',
                      height: rect.height + 'px',
                      left: docInitialLeft + 'px',
                      top: docInitialTop + 'px',
                  });
                  document.body.appendChild(ghost);
      
                  if (!isAbsolute) {
                      element.style.opacity = '0.4';
                      dropTargets = Array.from(document.querySelectorAll('div, section, header, footer, main, article, aside')).filter(dz => {
                          const style = getComputedStyle(dz);
                          return dz !== element && !element.contains(dz) && (style.display === 'flex' || style.display === 'grid' || style.display === 'block');
                      });
                  }
              }
      
              moveEvent.preventDefault();
              accumulatedX += moveEvent.movementX;
              accumulatedY += moveEvent.movementY;
      
              ghost.style.left = (docInitialLeft + accumulatedX) + 'px';
              ghost.style.top = (docInitialTop + accumulatedY) + 'px';
      
              if (!isAbsolute) {
                  ghost.style.display = 'none';
                  const elUnder = document.elementFromPoint(moveEvent.clientX, moveEvent.clientY);
                  ghost.style.display = '';
      
                  let foundTarget = null;
                  let parent = elUnder;
                  while (parent) {
                      if (dropTargets && dropTargets.includes(parent)) {
                          foundTarget = parent;
                          break;
                      }
                      parent = parent.parentElement;
                  }
      
                  if (currentDropTarget && currentDropTarget !== foundTarget) {
                      currentDropTarget.classList.remove('drop-zone-highlight');
                      if (placeholder) placeholder.remove();
                      placeholder = null;
                  }
      
                  currentDropTarget = foundTarget;
      
                  if (currentDropTarget) {
                      currentDropTarget.classList.add('drop-zone-highlight');
      
                      if (!placeholder) {
                          placeholder = document.createElement('div');
                          placeholder.classList.add('drop-placeholder');
                          Object.assign(placeholder.style, { width: rect.width + 'px', height: rect.height + 'px' });
                      }
      
                      const children = [...currentDropTarget.children].filter(c => c !== ghost && c !== placeholder);
                      let nextEl = null;
                      for (const child of children) {
                          const childRect = child.getBoundingClientRect();
                          if (moveEvent.clientY < childRect.top + childRect.height / 2) {
                              nextEl = child;
                              break;
                          }
                      }
                      currentDropTarget.insertBefore(placeholder, nextEl);
                  }
              }
          }
      
          function onDragEnd(upEvent) {
              document.removeEventListener('mousemove', onDragMove);
              document.removeEventListener('mouseup', onDragEnd);
              if (!isAbsolute) element.style.opacity = '';
      
              if (isDragging) {
                  ignoreNextClick = true;
                  document.body.classList.remove('is-dragging');
      
                  if (isAbsolute && !currentDropTarget) {
                      const offsetParent = element.offsetParent || document.body;
                      const parentRect = offsetParent.getBoundingClientRect();
                      const finalViewportTop = rect.top + accumulatedY;
                      const finalViewportLeft = rect.left + accumulatedX;
                      
                      const newTop = finalViewportTop - parentRect.top - (parseFloat(getComputedStyle(offsetParent).borderTopWidth) || 0);
                      const newLeft = finalViewportLeft - parentRect.left - (parseFloat(getComputedStyle(offsetParent).borderLeftWidth) || 0);
      
                      element.style.top = newTop + 'px';
                      element.style.left = newLeft + 'px';
                      element.style.transform = 'none';
                      element.style.margin = '0';
                      
                      const selector = getCssPath(element);
                      if (selector) {
                          window.parent.postMessage({
                              type: 'element-styles-update',
                              payload: { 
                                  selector, 
                                  styles: { 
                                      position: 'absolute', 
                                      top: element.style.top, 
                                      left: element.style.left,
                                      transform: 'none',
                                      margin: '0',
                                  }
                              }
                          }, '*');
                      }
                  } else if (currentDropTarget && placeholder) {
                      if (isAbsolute && getComputedStyle(currentDropTarget).position === 'static') {
                          const confirmed = confirm('자유형 요소를 일반 레이아웃에 추가하면 위치가 초기화되고 기본 요소로 변경됩니다. 계속하시겠습니까?');
                          if (!confirmed) {
                              if (ghost) ghost.remove();
                              if (placeholder) placeholder.remove();
                              if (currentDropTarget) currentDropTarget.classList.remove('drop-zone-highlight');
                              return;
                          }
                      }
                      
                      const children = [...currentDropTarget.children];
                      const dropIndex = children.indexOf(placeholder);
                      window.parent.postMessage({
                          type: 'element-drop',
                          payload: {
                              draggedSelector: getCssPath(element),
                              targetContainerSelector: getCssPath(currentDropTarget),
                              dropIndex
                          }
                      }, '*');
                  }
              }
      
              if (ghost) ghost.remove();
              if (placeholder) placeholder.remove();
              if (currentDropTarget) currentDropTarget.classList.remove('drop-zone-highlight');
          }
      
          document.addEventListener('mousemove', onDragMove);
          document.addEventListener('mouseup', onDragEnd, { once: true });
      }

      let globalTextStyleTag = null;
      function updateGlobalTextStyle(isHidden) {
        if (!globalTextStyleTag) {
            globalTextStyleTag = document.createElement('style');
            globalTextStyleTag.id = 'global-text-visibility-style';
            document.head.appendChild(globalTextStyleTag);
        }
        globalTextStyleTag.textContent = isHidden ? 'body, body * { color: transparent !important; text-shadow: none !important; }' : '';
      }
      
      const slideContainer = document.querySelector('.slide-container');
      if (slideContainer) {
          const pageResizeHandle = document.createElement('div');
          pageResizeHandle.id = 'page-resize-handle';
          pageResizeHandle.style.position = 'fixed';
          pageResizeHandle.style.width = '15px';
          pageResizeHandle.style.height = '15px';
          pageResizeHandle.style.borderRight = '4px solid #3b82f6';
          pageResizeHandle.style.borderBottom = '4px solid #3b82f6';
          pageResizeHandle.style.cursor = 'se-resize';
          pageResizeHandle.style.zIndex = '10001';
          pageResizeHandle.style.borderRadius = '2px';

          document.body.appendChild(pageResizeHandle);

          const positionHandle = () => {
              const rect = slideContainer.getBoundingClientRect();
              pageResizeHandle.style.left = (rect.right - 10) + 'px';
              pageResizeHandle.style.top = (rect.bottom - 10) + 'px';
          };
          
          positionHandle();
          
          new ResizeObserver(positionHandle).observe(slideContainer);
          window.addEventListener('scroll', positionHandle, { passive: true, capture: true });

          pageResizeHandle.addEventListener('mousedown', (e) => {
              e.preventDefault();
              e.stopPropagation();

              const startX = e.clientX;
              const startY = e.clientY;
              const startWidth = slideContainer.offsetWidth;
              const startHeight = slideContainer.offsetHeight;

              const onMouseMove = (e) => {
                  const newWidth = Math.max(200, startWidth + (e.clientX - startX));
                  const newHeight = Math.max(100, startHeight + (e.clientY - startY));
                  slideContainer.style.width = newWidth + 'px';
                  slideContainer.style.height = newHeight + 'px';
              };

              const onMouseUp = () => {
                  document.removeEventListener('mousemove', onMouseMove);
                  document.removeEventListener('mouseup', onMouseUp);
                  const newWidth = parseInt(slideContainer.style.width, 10);
                  const newHeight = parseInt(slideContainer.style.height, 10);
                  window.parent.postMessage({
                      type: 'page-resize-end',
                      payload: { width: newWidth, height: newHeight }
                  }, '*');
              };

              document.addEventListener('mousemove', onMouseMove);
              document.addEventListener('mouseup', onMouseUp, { once: true });
          });
      }
      
      document.addEventListener('keydown', (event) => {
        if (document.activeElement && ['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName) && document.activeElement.isContentEditable === false) {
            return;
        }
        const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
        const modKey = isMac ? event.metaKey : event.ctrlKey;

        if (modKey && event.key.toLowerCase() === 'z') {
          event.preventDefault();
          if (event.shiftKey) {
            window.parent.postMessage({ type: 'redo' }, '*');
          } else {
            window.parent.postMessage({ type: 'undo' }, '*');
          }
          return;
        }
        
        if (!isMac && modKey && event.key.toLowerCase() === 'y') {
          event.preventDefault();
          window.parent.postMessage({ type: 'redo' }, '*');
        }
        
        if (event.key === 'Delete' && currentSelectedSelectors.length > 0) {
          const activeEl = document.activeElement;
          if (activeEl && (activeEl.isContentEditable || activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA')) {
            return;
          }
          event.preventDefault();
          window.parent.postMessage({ type: 'delete-element' }, '*');
        }

        if (event.key === 'Escape' && currentSelectedSelectors.length > 0) {
          event.preventDefault();
          const bodyBg = getComputedStyle(document.body).backgroundColor;
          window.parent.postMessage({ type: 'element-select', payload: { info: null, bodyBg } }, '*');
        }
      });
      
      const onSelectionMove = (e) => {
        if (!isSelecting || !selectionBox) return;
        const currentX = e.clientX;
        const currentY = e.clientY;
        
        const left = Math.min(startX, currentX) + window.scrollX;
        const top = Math.min(startY, currentY) + window.scrollY;
        const width = Math.abs(currentX - startX);
        const height = Math.abs(currentY - startY);

        selectionBox.style.left = left + 'px';
        selectionBox.style.top = top + 'px';
        selectionBox.style.width = width + 'px';
        selectionBox.style.height = height + 'px';
      }

      const onSelectionUp = () => {
        isSelecting = false;
        document.removeEventListener('mousemove', onSelectionMove);
        document.removeEventListener('mouseup', onSelectionUp);
        
        if (selectionBox) {
            const selectionRect = selectionBox.getBoundingClientRect();
            selectionBox.remove();
            selectionBox = null;

            if (selectionRect.width > 5 || selectionRect.height > 5) {
                const selectedInfos = [];
                const slideContainer = document.querySelector('.slide-container');
                if (slideContainer) {
                    const elements = slideContainer.querySelectorAll('*:not(script):not(style)');
                    elements.forEach(el => {
                        if (el.id === 'resizer-handle' || el.closest('#mini-toolbar') || el.closest('#page-resize-handle')) return;
                        const elRect = el.getBoundingClientRect();
                        if (
                            selectionRect.left < elRect.right &&
                            selectionRect.right > elRect.left &&
                            selectionRect.top < elRect.bottom &&
                            selectionRect.bottom > elRect.top
                        ) {
                            const finalTarget = findTargetElement(el);
                            if(finalTarget && !selectedInfos.some(info => info.id === getCssPath(finalTarget))) {
                                selectedInfos.push(buildElementInfo(finalTarget));
                            }
                        }
                    });
                }
                window.parent.postMessage({ type: 'elements-multiselect', payload: { infos: selectedInfos } }, '*');
            }
        }
      }

      document.body.addEventListener('mousedown', (e) => {
          if (isMultiSelectModeEnabled && e.button === 0 && !e.target.isContentEditable) {
            let isClickOnSelected = false;
            let target = e.target;
            while(target && target !== document.body) {
                if (target.classList.contains('selected-element-highlight')) {
                    isClickOnSelected = true;
                    break;
                }
                target = target.parentElement;
            }

            if (isClickOnSelected) {
                // Multi-drag logic would go here
                return;
            }

              isSelecting = true;
              startX = e.clientX;
              startY = e.clientY;

              selectionBox = document.createElement('div');
              selectionBox.style.position = 'absolute';
              selectionBox.style.border = '1px solid #3b82f6';
              selectionBox.style.backgroundColor = 'rgba(59, 130, 246, 0.2)';
              selectionBox.style.zIndex = '10000';
              selectionBox.style.pointerEvents = 'none';
              selectionBox.style.left = (startX + window.scrollX) + 'px';
              selectionBox.style.top = (startY + window.scrollY) + 'px';
              selectionBox.style.width = '0px';
              selectionBox.style.height = '0px';
              document.body.appendChild(selectionBox);

              document.addEventListener('mousemove', onSelectionMove);
              document.addEventListener('mouseup', onSelectionUp, { once: true });
          }
      });

      window.addEventListener('message', (event) => {
        const { type, payload } = event.data;
        if (type === 'highlight-element') {
          const { ids } = payload;
          
          document.querySelectorAll('.selected-element-highlight').forEach(el => {
            el.classList.remove('selected-element-highlight');
          });

          document.querySelectorAll('[data-drag-listener="true"]').forEach(el => {
              el.removeEventListener('mousedown', onDragStart);
              el.removeAttribute('data-drag-listener');
              el.style.cursor = '';
          });
          
          createOrUpdateResizer(null); 
          createOrUpdateMiniToolbar(null);

          if (ids && ids.length > 0) {
            const elements = ids.map(selector => {
                try {
                    return document.querySelector(selector);
                } catch(e) { console.error('Invalid selector for highlight:', selector); return null; }
            }).filter(Boolean);

            elements.forEach(el => el.classList.add('selected-element-highlight'));
            
            if (ids.length === 1) {
                const el = elements[0];
                if (el) {
                   createOrUpdateResizer(el);
                   createOrUpdateMiniToolbar(el);
                   el.setAttribute('data-drag-listener', 'true');
                   el.addEventListener('mousedown', onDragStart);
                   el.style.cursor = 'move';
                }
            } else if (ids.length > 1) {
                // Multi-select drag logic would attach listeners here
            }
          }
          currentSelectedSelectors = ids || [];
        } else if (type === 'apply-style') {
            const { selector, property, value } = payload;
            try {
                const el = document.querySelector(selector);
                if (el) {
                    el.style[property] = value;
                    if(currentSelectedSelectors.length === 1 && currentSelectedSelectors[0] === selector) {
                        createOrUpdateResizer(el);
                        createOrUpdateMiniToolbar(el);
                    }
                }
            } catch (e) {
                console.error('Failed to apply style', e);
            }
        } else if (type === 'toggle-global-text') {
          updateGlobalTextStyle(payload.isHidden);
        } else if (type === 'set-multi-select-mode') {
            isMultiSelectModeEnabled = payload.enabled;
            document.body.style.setProperty('user-select', isMultiSelectModeEnabled ? 'none' : '', 'important');
        } else if (type === 'page-size-update') {
            const { width, height } = payload;
            const container = document.querySelector('.slide-container');
            if (container) {
                container.style.width = width + 'px';
                container.style.height = height + 'px';
            }
        } else if (type === 'select-element-by-selector') {
            const { selector } = payload;
            try {
                const element = document.querySelector(selector);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    const info = buildElementInfo(element);
                    const bodyBg = getComputedStyle(document.body).backgroundColor;
                    window.parent.postMessage({ type: 'element-select', payload: { info, bodyBg } }, '*');
                }
            } catch (e) {
                console.error('Failed to select element by selector', selector, e);
            }
        } else if (type === 'get-content-size') {
            let width = 0;
            let height = 0;
            const PADDING = 32; // 16px on each side

            const contentBox = document.querySelector('.slide-container') || document.querySelector('main');
            
            if (contentBox) {
                const rect = contentBox.getBoundingClientRect();
                width = Math.ceil(rect.width);
                height = Math.ceil(rect.height);
            } else {
                let minX = Infinity, minY = Infinity, maxX = 0, maxY = 0;
                const children = Array.from(document.body.children).filter(el => 
                    el.tagName.toLowerCase() !== 'script' && !el.id.startsWith('editor-') && !el.id.startsWith('resizer-') && el.id !== 'page-resize-handle' && el.id !== 'mini-toolbar'
                );
                if (children.length > 0) {
                    children.forEach(child => {
                        const rect = child.getBoundingClientRect();
                        if (rect.width > 0 || rect.height > 0) { // Check if element is visible
                            minX = Math.min(minX, rect.left);
                            minY = Math.min(minY, rect.top);
                            maxX = Math.max(maxX, rect.right);
                            maxY = Math.max(maxY, rect.bottom);
                        }
                    });

                    if (isFinite(minX)) {
                        width = Math.ceil(maxX - minX);
                        height = Math.ceil(maxY - minY);
                    }
                }
            }

            if (width === 0 || height === 0) {
                width = document.body.scrollWidth;
                height = document.body.scrollHeight;
            }
            
            window.parent.postMessage({
                type: 'content-size-response',
                payload: { 
                    width: width + PADDING,
                    height: height + PADDING
                }
            }, '*');
        }
      });

      // Auto-sizing logic to ensure the parent iframe container is correctly sized
      let lastKnownWidth = 0;
      let lastKnownHeight = 0;
      
      const updateParentDimensions = () => {
          const docEl = document.documentElement;
          const bodyEl = document.body;

          requestAnimationFrame(() => {
              const slideContainer = document.querySelector('.slide-container');
              
              const messagePayload = {};
              let hasUpdates = false;

              // To get accurate scroll dimensions, temporarily override overflow and height styles
              const originalDocOverflow = docEl.style.overflow;
              const originalBodyOverflow = bodyEl.style.overflow;
              const originalBodyHeight = bodyEl.style.height;
              
              docEl.style.overflow = 'visible';
              bodyEl.style.overflow = 'visible';
              bodyEl.style.height = 'auto'; 

              const newHeight = bodyEl.scrollHeight;

              // Restore original styles
              docEl.style.overflow = originalDocOverflow;
              bodyEl.style.overflow = originalBodyOverflow;
              bodyEl.style.height = originalBodyHeight;

              if (newHeight > 0 && newHeight !== lastKnownHeight) {
                  lastKnownHeight = newHeight;
                  messagePayload.height = newHeight;
                  hasUpdates = true;
              }

              // Only measure and report width IF a slide-container with fixed size exists.
              // Otherwise, the parent container dictates the width for responsive content.
              if (slideContainer) {
                  const newWidth = slideContainer.scrollWidth;
                  if (newWidth > 0 && newWidth !== lastKnownWidth) {
                      lastKnownWidth = newWidth;
                      messagePayload.width = newWidth;
                      hasUpdates = true;
                  }
              } else {
                  // If no slide container, reset our known width. This ensures that if the user
                  // later adds a slide-container, its width will be reported correctly.
                  lastKnownWidth = 0;
              }

              if (hasUpdates) {
                  window.parent.postMessage({
                      type: 'page-dimensions-init',
                      payload: messagePayload
                  }, '*');
              }
          });
      };
      
      // A ResizeObserver is the most reliable way to catch size changes from any source
      // (CSS changes, content changes, image loading, etc.)
      const observer = new ResizeObserver(updateParentDimensions);
      observer.observe(document.documentElement);

      // We also add a 'load' listener as a fallback for slow-loading resources like images
      // that might not trigger the observer immediately.
      window.addEventListener('load', () => {
        // A small timeout after load allows for final rendering paints.
        setTimeout(updateParentDimensions, 150);
      });
      
      // An initial call to set the size as soon as possible.
      requestAnimationFrame(updateParentDimensions);

      // Report if page size is defined by a template structure
      const initialSlideContainer = document.querySelector('.slide-container');
      window.parent.postMessage({
          type: 'page-info',
          payload: { isSizeDefined: !!initialSlideContainer }
      }, '*');
    });
`,Am=c=>{let p=c.querySelector('meta[charset="UTF-8"]');p||(p=c.createElement("meta"),p.setAttribute("charset","UTF-8"),c.head.prepend(p))},Dm=c=>c.split(`
`).map((r,v)=>{const h=v+1;return r.replace(/(^\s*<([a-zA-Z1-6]+))/g,(b,M,x)=>["!DOCTYPE","html","head","body","script","style","meta","link","title"].includes(x.toLowerCase())?b:`${M} data-line-number="${h}"`)}).join(`
`),Lm=(c,p,u)=>{const r=Dm(c),h=new DOMParser().parseFromString(r,"text/html");Am(h);const b=h.createElement("link");b.rel="preconnect",b.href="https://fonts.googleapis.com",h.head.appendChild(b);const M=h.createElement("link");M.rel="preconnect",M.href="https://fonts.gstatic.com",M.setAttribute("crossorigin",""),h.head.appendChild(M);const x=h.createElement("link");x.rel="stylesheet",x.href="https://fonts.googleapis.com/css2?family=Gowun+Dodum&family=Google+Sans:wght@400;500;700&family=JetBrains+Mono:wght@400;500&family=Lato:wght@400;700&family=Merriweather:wght@400;700&family=Montserrat:wght@400;500;700&family=Nanum+Gothic&family=Nanum+Myeongjo&family=Noto+Sans+KR:wght@400;500;700&family=Open+Sans:wght@400;700&family=Oswald:wght@400;500;700&family=Playfair+Display:wght@400;700&family=Poppins:wght@400;500;700&family=Roboto:wght@400;500;700&family=Source+Sans+Pro:wght@400;700&display=swap",h.head.appendChild(x);const m=h.createElement("style");m.id="editor-style",m.textContent=zm,h.head.appendChild(m);const T=h.createElement("style");T.id="user-styles",T.textContent=p,h.head.appendChild(T);const g=h.createElement("script");g.id="editor-script",g.textContent=Mm,h.body.appendChild(g);const E=h.createElement("script");return E.id="user-script",E.textContent=u,h.body.appendChild(E),`<!DOCTYPE html>
${h.documentElement.outerHTML}`},km=N.forwardRef(({htmlCode:c,cssCode:p,jsCode:u,selectedElementIds:r},v)=>{const h=N.useRef(null);N.useImperativeHandle(v,()=>h.current);const b=N.useRef({x:0,y:0}),M=N.useRef(!0),x=N.useCallback(()=>{const m=h.current;m&&m.contentWindow&&(M.current||setTimeout(()=>{var T;(T=m.contentWindow)==null||T.scrollTo({top:b.current.y,left:b.current.x,behavior:"instant"})},50),M.current=!1)},[]);return N.useEffect(()=>{const m=h.current;if(m){m.contentWindow&&(b.current={x:m.contentWindow.scrollX,y:m.contentWindow.scrollY});const T=Lm(c,p,u);m.srcdoc=T}},[c,p,u]),N.useEffect(()=>{const m=h.current;m!=null&&m.contentWindow&&m.contentWindow.postMessage({type:"highlight-element",payload:{ids:r}},"*")},[r]),o.jsx("iframe",{ref:h,title:"HTML Preview",className:"w-full h-full bg-white shadow-lg border-none",sandbox:"allow-scripts allow-same-origin",onLoad:x})}),Rm=["transparent","#000000","#495057","#ced4da","#f1f3f5","#ffffff","#fa5252","#e64980","#be4bdb","#7950f2","#4c6ef5","#228be6","#15aabf","#12b886","#40c057","#82c91e","#f59f00","#f76707"],$f=({color:c})=>c==="transparent"?o.jsx("div",{title:"Transparent",className:"w-full h-full bg-white relative",children:o.jsx("div",{className:"absolute w-[150%] h-[1.5px] bg-red-500 top-1/2 left-1/2",style:{transform:"translate(-50%, -50%) rotate(-45deg)"}})}):o.jsx("div",{style:{backgroundColor:c},className:"w-full h-full"}),ja=({value:c,onChange:p,disabled:u,title:r,t:v})=>{const[h,b]=N.useState(!1),M=N.useRef(null),x=N.useRef(null),[m,T]=N.useState(c||"#000000");return N.useEffect(()=>{const g=E=>{M.current&&!M.current.contains(E.target)&&b(!1)};return document.addEventListener("click",g),()=>{document.removeEventListener("click",g)}},[]),N.useEffect(()=>{h&&T(c||"#000000")},[h,c]),o.jsxs("div",{ref:M,className:"relative",children:[o.jsx("button",{type:"button",onClick:()=>b(g=>!g),disabled:u,title:r,className:"w-7 h-7 p-0.5 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed",children:o.jsx("div",{className:"w-full h-full rounded-[3px] border border-gray-200 overflow-hidden",children:o.jsx($f,{color:c})})}),h&&o.jsxs("div",{className:"absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white rounded-md shadow-lg z-50 ring-1 ring-black ring-opacity-5",onMouseDown:g=>g.stopPropagation(),children:[o.jsx("div",{className:"grid grid-cols-5 gap-2 p-2",children:Rm.map(g=>o.jsx("button",{type:"button",onClick:()=>{T(g)},className:`w-full h-7 rounded border hover:scale-110 transition-transform overflow-hidden ${m===g?"border-blue-500 ring-2 ring-blue-300":"border-gray-200"}`,title:g,children:o.jsx($f,{color:g})},g))}),o.jsxs("div",{className:"border-t border-gray-200 p-2 space-y-2",children:[o.jsx("button",{type:"button",onClick:()=>{var g;return(g=x.current)==null?void 0:g.click()},className:"w-full text-sm text-center px-2 py-1.5 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500",children:v("colorPicker.custom")}),o.jsx("input",{ref:x,type:"color",value:m==="transparent"?"#ffffff":m,onChange:g=>T(g.target.value),className:"opacity-0 w-0 h-0 absolute"}),o.jsx("button",{type:"button",onClick:()=>{p(m),b(!1)},className:"w-full text-sm text-center px-2 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500",children:v("colorPicker.confirm")})]})]})]})},Wf=(c,p)=>{let u=null;return(...r)=>{u&&clearTimeout(u),u=setTimeout(()=>c(...r),p)}},Ta=c=>new Promise((p,u)=>{const r=v=>{if(v>=c.length){u(new Error("Failed to load script from all provided sources."));return}const h=c[v],b=document.createElement("script");b.src=h,b.async=!0,b.crossOrigin="anonymous",b.onload=()=>p(!0),b.onerror=M=>{console.warn(`Failed to load script from ${h}, trying next fallback. Error:`,M),b.remove(),r(v+1)},document.body.appendChild(b)};r(0)}),Lo=async c=>{var M;if(!((M=c==null?void 0:c.contentWindow)!=null&&M.document))return;const p=c.contentWindow.document,u=c.contentWindow,r=[];if(Array.from(p.getElementsByTagName("img")).forEach(x=>{x.complete||r.push(new Promise(m=>{x.onload=m,x.onerror=()=>{console.warn(`Failed to load image: ${x.src}`),m(null)}}))}),Array.from(p.scripts).find(x=>x.src.includes("fontawesome"))&&r.push(new Promise(x=>{let g=0;const E=setInterval(()=>{p.documentElement.dataset.faI2svg!==void 0?(clearInterval(E),setTimeout(()=>x(null),250)):g>=5e3&&(clearInterval(E),console.warn("Font Awesome SVG replacement timed out."),x(null)),g+=100},100)})),c.contentWindow.document.fonts)try{r.push(c.contentWindow.document.fonts.ready)}catch(x){console.warn("Error waiting for iframe fonts to be ready:",x)}const b=Array.from(p.getElementsByTagName("canvas")).filter(x=>{var m;return(m=x.parentElement)==null?void 0:m.classList.contains("chart-container")});b.length>0&&u.Chart&&b.forEach(x=>{r.push(new Promise(m=>{let E=0;const C=setInterval(()=>{const A=u.Chart.getChart(x);A&&!A.animating?(clearInterval(C),m(null)):E>=3e3&&(clearInterval(C),console.warn("Chart rendering timed out for canvas:",x.id),m(null)),E+=100},100)}))}),await Promise.all(r),await new Promise(x=>setTimeout(x,300))},Un=c=>{if(typeof c!="string")if(Array.isArray(c)&&c.length>0&&typeof c[0]=="string")c=c[0];else return"000000";if(!c||c==="transparent")return"000000";if(c.startsWith("#"))return c.substring(1);const p=document.createElement("div");p.style.color=c,document.body.appendChild(p);const u=window.getComputedStyle(p).color;document.body.removeChild(p);const r=u.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);if(r){const v=h=>("0"+parseInt(h,10).toString(16)).slice(-2);return`${v(r[1])}${v(r[2])}${v(r[3])}`}return"000000"},Do=c=>{if(!c||c==="transparent")return"transparent";const p=c.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);if(!p)return"#ffffff";if((p[4]?parseFloat(p[4]):1)<.1)return"transparent";const r=v=>("0"+parseInt(v,10).toString(16)).slice(-2);return`#${r(p[1])}${r(p[2])}${r(p[3])}`},nh=(c,p=1280,u=.85)=>new Promise((r,v)=>{const h=new Image,b=URL.createObjectURL(c);h.onload=()=>{URL.revokeObjectURL(b);const M=document.createElement("canvas");let{width:x,height:m}=h;x>m?x>p&&(m*=p/x,x=p):m>p&&(x*=p/m,m=p),M.width=Math.round(x),M.height=Math.round(m);const T=M.getContext("2d");if(!T)return v(new Error("Could not get canvas context"));T.drawImage(h,0,0,M.width,M.height);const g=c.type==="image/png"?"image/png":"image/jpeg";r(M.toDataURL(g,u))},h.onerror=M=>{URL.revokeObjectURL(b),v(M)},h.src=b});function Hm(c){if(!(c instanceof Element))return"";const p=[];for(;c&&c.nodeType===Node.ELEMENT_NODE;){let u=c.nodeName.toLowerCase();if(c.id){u="#"+c.id,p.unshift(u);break}else{let r=c,v=1;for(;r=r.previousElementSibling;)r.nodeName.toLowerCase()===u&&v++;v!==1&&(u+=`:nth-of-type(${v})`)}if(p.unshift(u),!c.parentNode||c.parentNode.nodeType!==Node.ELEMENT_NODE)break;c=c.parentNode}return p.join(" > ")}const Om=({onInsert:c,onClose:p,setBlobUrlMap:u,t:r})=>{const[v,h]=N.useState(""),b=N.useRef(null),M=N.useRef(null);N.useEffect(()=>{const T=g=>{b.current&&!b.current.contains(g.target)&&p()};return document.addEventListener("mousedown",T),()=>document.removeEventListener("mousedown",T)},[p]);const x=()=>{v.trim()&&(c(`<div class="image-wrapper" style="width: 300px; height: 200px; overflow: hidden;"><img src="${v}" alt="사용자 이미지" style="display: block; width: 100%; height: 100%; object-fit: cover;" /></div>`),p())},m=async T=>{var E;const g=(E=T.target.files)==null?void 0:E[0];if(g)try{const C=URL.createObjectURL(g),A=await nh(g);u(L=>({...L,[C]:A})),c(`<div class="image-wrapper" style="width: 300px; height: 200px; overflow: hidden;"><img src="${C}" alt="${g.name}" style="display: block; width: 100%; height: 100%; object-fit: cover;" /></div>`),p()}catch(C){console.error("Image processing failed:",C),alert("이미지 처리 중 오류가 발생했습니다. 다른 파일을 시도해주세요.")}};return o.jsxs("div",{ref:b,className:"absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-white rounded-md shadow-lg z-30 ring-1 ring-black ring-opacity-5 p-4",children:[o.jsx("p",{className:"text-sm font-medium text-gray-800 mb-2",children:r("imagePopover.title")}),o.jsxs("div",{className:"flex gap-2",children:[o.jsx("input",{type:"text",value:v,onChange:T=>h(T.target.value),placeholder:"https://...",className:"flex-grow text-sm p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",onKeyDown:T=>T.key==="Enter"&&x()}),o.jsx("button",{onClick:x,className:"text-sm bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex-shrink-0",children:r("imagePopover.insert")})]}),o.jsxs("div",{className:"relative my-3 flex items-center",children:[o.jsx("div",{className:"flex-grow border-t border-gray-200"}),o.jsx("span",{className:"flex-shrink mx-2 text-xs text-gray-400",children:r("imagePopover.or")}),o.jsx("div",{className:"flex-grow border-t border-gray-200"})]}),o.jsx("input",{type:"file",ref:M,onChange:m,accept:"image/*",className:"hidden"}),o.jsxs("button",{onClick:()=>{var T;return(T=M.current)==null?void 0:T.click()},className:"w-full text-sm bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center gap-2",children:[o.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-4 w-4",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:o.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"})}),r("imagePopover.upload")]})]})},Bm=({onInsert:c,onClose:p,t:u})=>{const[r,v]=N.useState(""),h=N.useRef(null),b=N.useRef(null),M=T=>{let g,E=T.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);return E&&E[1]?(g=E[1],{type:"iframe",url:`https://www.youtube.com/embed/${g}`}):(E=T.match(/(?:https?:\/\/)?(?:www\.)?vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|)(\d+)/),E&&E[1]?(g=E[1],{type:"iframe",url:`https://player.vimeo.com/video/${g}`}):T.match(/\.(mp4|webm|ogv)$/i)?{type:"video",url:T}:null)};N.useEffect(()=>{const T=g=>{h.current&&!h.current.contains(g.target)&&p()};return document.addEventListener("mousedown",T),()=>document.removeEventListener("mousedown",T)},[p]);const x=()=>{if(!r.trim())return;const T=M(r);T&&(T.type==="iframe"?c(`<div class="video-wrapper" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 560px; background: #000; border-radius: 8px;">
                            <iframe src="${T.url}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen style="position: absolute; top: 2%; left: 2%; width: 96%; height: 96%; border-radius: 6px;"></iframe>
                          </div>`):c(`<div class="video-wrapper" style="width: 560px; height: 315px; background: #000; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                            <video controls src="${T.url}" style="width: calc(100% - 20px); height: calc(100% - 20px); border-radius: 6px;"></video>
                          </div>`),p())},m=T=>{var E;const g=(E=T.target.files)==null?void 0:E[0];if(g&&g.type.startsWith("video/")){const C=new FileReader;C.onload=A=>{var K;const L=(K=A.target)==null?void 0:K.result;L&&(c(`<div class="video-wrapper" style="width: 560px; height: 315px; background: #000; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                                <video controls src="${L}" style="width: calc(100% - 20px); height: calc(100% - 20px); border-radius: 6px;"></video>
                              </div>`),p())},C.readAsDataURL(g)}};return o.jsxs("div",{ref:h,className:"absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-white rounded-md shadow-lg z-30 ring-1 ring-black ring-opacity-5 p-4",children:[o.jsx("p",{className:"text-sm font-medium text-gray-800 mb-2",children:u("videoPopover.title")}),o.jsxs("div",{className:"flex gap-2",children:[o.jsx("input",{type:"text",value:r,onChange:T=>v(T.target.value),placeholder:u("videoPopover.placeholder"),className:"flex-grow text-sm p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",onKeyDown:T=>T.key==="Enter"&&x()}),o.jsx("button",{onClick:x,className:"text-sm bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex-shrink-0",children:u("videoPopover.insert")})]}),o.jsxs("div",{className:"relative my-3 flex items-center",children:[o.jsx("div",{className:"flex-grow border-t border-gray-200"}),o.jsx("span",{className:"flex-shrink mx-2 text-xs text-gray-400",children:u("videoPopover.or")}),o.jsx("div",{className:"flex-grow border-t border-gray-200"})]}),o.jsx("input",{type:"file",ref:b,onChange:m,accept:"video/*",className:"hidden"}),o.jsxs("button",{onClick:()=>{var T;return(T=b.current)==null?void 0:T.click()},className:"w-full text-sm bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center gap-2",children:[o.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-4 w-4",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:o.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"})}),u("videoPopover.upload")]})]})},_m=["fas fa-star","fas fa-heart","fas fa-user","fas fa-check","fas fa-times","fas fa-cog","fas fa-home","fas fa-envelope","fas fa-phone","fas fa-search","fas fa-link","fas fa-cloud","fas fa-arrow-right","fas fa-arrow-left","fas fa-arrow-up","fas fa-arrow-down","fas fa-play","fas fa-pause","fas fa-stop","fas fa-edit","fas fa-trash","fas fa-plus","fas fa-minus","fas fa-info-circle","fas fa-question-circle","fas fa-exclamation-triangle","fas fa-calendar-alt","fas fa-clock","fas fa-camera","fas fa-image","fas fa-video","fas fa-music","fas fa-file","fas fa-folder","fas fa-map-marker-alt","fas fa-lightbulb","fas fa-comment","fas fa-thumbs-up","fas fa-thumbs-down","fas fa-gift","fas fa-shopping-cart","fas fa-credit-card","fas fa-globe"],Um=({onInsert:c,onClose:p,t:u})=>{const[r,v]=N.useState(""),h=N.useRef(null);N.useEffect(()=>{const x=m=>{h.current&&!h.current.contains(m.target)&&p()};return document.addEventListener("mousedown",x),()=>document.removeEventListener("mousedown",x)},[p]);const b=_m.filter(x=>x.includes(r.toLowerCase())),M=x=>{c(`<i class="${x}" style="font-size: 24px;"></i>`),p()};return o.jsxs("div",{ref:h,className:"absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-white rounded-md shadow-lg z-30 ring-1 ring-black ring-opacity-5 p-3",children:[o.jsx("input",{type:"text",value:r,onChange:x=>v(x.target.value),placeholder:u("iconPopover.search"),className:"w-full text-sm p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"}),o.jsx("div",{className:"max-h-48 overflow-y-auto grid grid-cols-6 gap-2",children:b.map(x=>o.jsx("button",{title:x.replace("fas fa-",""),onClick:()=>M(x),className:"flex items-center justify-center p-2 rounded-md hover:bg-gray-100 text-black",children:o.jsx("i",{className:x,style:{fontSize:"20px"}})},x))})]})},qm=({onInsert:c,onClose:p,t:u})=>{const[r,v]=N.useState(3),[h,b]=N.useState(3),M=N.useRef(null);N.useEffect(()=>{const T=g=>{M.current&&!M.current.contains(g.target)&&p()};return document.addEventListener("mousedown",T),()=>document.removeEventListener("mousedown",T)},[p]);const x=(T,g)=>{let E='<table style="width: 400px; border-collapse: collapse; border: 1px solid #dee2e6;">';if(T>0){E+="<thead><tr>";for(let C=0;C<g;C++)E+=`<th style="border: 1px solid #dee2e6; padding: 12px; text-align: left; background-color: #f8f9fa;">헤더 ${C+1}</th>`;E+="</tr></thead>"}if(T>1){E+="<tbody>";for(let C=0;C<T-1;C++){E+="<tr>";for(let A=0;A<g;A++)E+='<td style="border: 1px solid #dee2e6; padding: 12px;">내용</td>';E+="</tr>"}E+="</tbody>"}return E+="</table>",E},m=()=>{const T=x(r,h);c(T),p()};return o.jsxs("div",{ref:M,className:"absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white rounded-md shadow-lg z-30 ring-1 ring-black ring-opacity-5 p-4",children:[o.jsx("p",{className:"text-sm font-medium text-gray-800 mb-3",children:u("tablePopover.title")}),o.jsxs("div",{className:"flex items-center justify-between gap-4 mb-4",children:[o.jsxs("div",{className:"flex-1",children:[o.jsx("label",{className:"block text-xs text-gray-600 mb-1",children:u("tablePopover.rows")}),o.jsx("input",{type:"number",value:r,onChange:T=>v(Math.max(1,parseInt(T.target.value,10)||1)),className:"w-full text-sm p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",min:"1"})]}),o.jsxs("div",{className:"flex-1",children:[o.jsx("label",{className:"block text-xs text-gray-600 mb-1",children:u("tablePopover.cols")}),o.jsx("input",{type:"number",value:h,onChange:T=>b(Math.max(1,parseInt(T.target.value,10)||1)),className:"w-full text-sm p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",min:"1"})]})]}),o.jsx("button",{onClick:m,className:"w-full text-sm bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",children:u("tablePopover.insert")})]})},Ym=({onInsert:c,onClose:p,t:u})=>{const r=N.useRef(null);N.useEffect(()=>{const b=M=>{r.current&&!r.current.contains(M.target)&&p()};return document.addEventListener("mousedown",b),()=>document.removeEventListener("mousedown",b)},[p]);const v={rectangle:{name:u("shapePopover.rectangle"),html:'<div data-shape-type="rectangle" style="width: 150px; height: 100px; background-color: #4c6ef5; border-radius: 8px;"></div>',preview:o.jsx("div",{className:"w-10 h-7 bg-blue-500 rounded"})},circle:{name:u("shapePopover.circle"),html:'<div data-shape-type="circle" style="width: 100px; height: 100px; background-color: #12b886; border-radius: 50%;"></div>',preview:o.jsx("div",{className:"w-8 h-8 bg-green-500 rounded-full"})},oval:{name:u("shapePopover.oval"),html:'<div data-shape-type="oval" style="width: 150px; height: 80px; background-color: #be4bdb; border-radius: 50%;"></div>',preview:o.jsx("div",{className:"w-12 h-8 bg-purple-500 rounded-full"})},triangle:{name:u("shapePopover.triangle"),html:'<div data-shape-type="triangle" style="width: 0; height: 0; border-left: 50px solid transparent; border-right: 50px solid transparent; border-bottom: 100px solid #f76707;"></div>',preview:o.jsx("div",{style:{width:0,height:0,borderLeft:"16px solid transparent",borderRight:"16px solid transparent",borderBottom:"28px solid #f76707"}})},line:{name:u("shapePopover.line"),html:'<div data-shape-type="line" style="width: 150px; height: 4px; background-color: #495057; border-radius: 2px;"></div>',preview:o.jsx("div",{className:"w-10 h-1 bg-gray-700 rounded-full"})}},h=b=>{c(b),p()};return o.jsxs("div",{ref:r,className:"absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white rounded-md shadow-lg z-30 ring-1 ring-black ring-opacity-5 p-3",children:[o.jsx("p",{className:"text-sm font-medium text-gray-800 mb-2 px-1",children:u("shapePopover.title")}),o.jsx("div",{className:"grid grid-cols-3 gap-2",children:Object.values(v).map(b=>o.jsxs("button",{title:b.name,onClick:()=>h(b.html),className:"flex flex-col items-center justify-center p-2 rounded-md hover:bg-gray-100 text-black gap-2 h-20",children:[b.preview,o.jsx("span",{className:"text-xs text-gray-600",children:b.name})]},b.name))})]})},Xm=c=>[{value:"bar",label:c("chartPopover.bar")},{value:"line",label:c("chartPopover.line")},{value:"pie",label:c("chartPopover.pie")},{value:"doughnut",label:c("chartPopover.doughnut")}],Jf={vivid:{background:["#FF6384","#36A2EB","#FFCE56","#4BC0C0","#9966FF","#FF9F40"],border:["#FF6384","#36A2EB","#FFCE56","#4BC0C0","#9966FF","#FF9F40"]},pastel:{background:["#FFB6C1","#ADD8E6","#FFFFE0","#98FB98","#E6E6FA","#FFDAB9"],border:["#FFB6C1","#ADD8E6","#FFFFE0","#98FB98","#E6E6FA","#FFDAB9"]},office:{background:["#4A698A","#8A9A8A","#C3996B","#666666","#9985A8","#7794AD"],border:["#4A698A","#8A9A8A","#C3996B","#666666","#9985A8","#7794AD"]},black:{background:["#00FFFF","#FF00FF","#FFFF00","#00FF00","#FFA500","#BF00FF"],border:["#00FFFF","#FF00FF","#FFFF00","#00FF00","#FFA500","#BF00FF"]},primary:{background:["#FF0000","#0000FF","#FFFF00","#008000","#FFA500","#800080"],border:["#FF0000","#0000FF","#FFFF00","#008000","#FFA500","#800080"]},simple:{background:["#696969","#708090","#778899","#A9A9A9","#C0C0C0","#D3D3D3"],border:["#696969","#708090","#778899","#A9A9A9","#C0C0C0","#D3D3D3"]}},If=c=>({vivid:c("chartPopover.themes.vivid"),pastel:c("chartPopover.themes.pastel"),office:c("chartPopover.themes.office"),black:c("chartPopover.themes.black"),primary:c("chartPopover.themes.primary"),simple:c("chartPopover.themes.simple"),custom:c("chartPopover.themes.custom")}),Fm=({onInsert:c,onClose:p,t:u})=>{const r=N.useRef(null),[v,h]=N.useState("bar"),[b,M]=N.useState(u("chartPopover.chartTitlePlaceholder")),[x,m]=N.useState("1월, 2월, 3월, 4월, 5월, 6월"),[T,g]=N.useState([{seriesLabel:"매출액 (백만원)",data:"65, 59, 80, 81, 56, 55"}]),[E,C]=N.useState("vivid"),[A,L]=N.useState(Jf.vivid.background);N.useEffect(()=>{const G=k=>{r.current&&!r.current.contains(k.target)&&p()};return document.addEventListener("mousedown",G),()=>document.removeEventListener("mousedown",G)},[p]);const K=(G,k)=>{L(te=>{const q=[...te];return q[G]=k,q})},J=(G,k,te)=>{g(q=>{const ce=[...q];return ce[G]={...ce[G],[k]:te},ce})},ee=()=>{g(G=>[...G,{seriesLabel:`데이터 ${G.length+1}`,data:""}])},$=G=>{g(k=>k.filter((te,q)=>q!==G))},_=()=>{const G=`chart-canvas-${Date.now()}-${Math.random().toString(36).substring(2,7)}`,k=`<div class="chart-container" style="width: 450px; height: 300px;"><canvas id="${G}"></canvas></div>`,te=x.split(",").map(Q=>Q.trim()),q=E==="custom"?{background:A,border:A}:Jf[E],ce=v==="pie"||v==="doughnut",Se={type:v,data:{labels:te,datasets:T.map((Q,Me)=>({label:Q.seriesLabel,data:Q.data.split(",").map(y=>parseFloat(y.trim())||0),backgroundColor:ce?q.background:q.background[Me%q.background.length],borderColor:ce?q.border:q.border[Me%q.border.length],borderWidth:1}))},options:{responsive:!0,maintainAspectRatio:!1,plugins:{title:{display:!!b.trim(),text:b.trim()},legend:{position:"top"}}}},we=`chartInstance_${G.replace(/-/g,"_")}`,Y=`
document.addEventListener('DOMContentLoaded', function() {
    const canvasEl = document.getElementById('${G}');
    if (canvasEl) {
        const ctx = canvasEl.getContext('2d');
        const ${we} = new Chart(ctx, ${JSON.stringify(Se,null,2)});
    }
});
`;c(k,Y),p()},oe=({label:G,value:k,onChange:te,placeholder:q})=>o.jsxs("div",{children:[o.jsx("label",{className:"block text-xs text-gray-600 mb-1",children:G}),o.jsx("input",{type:"text",value:k,onChange:ce=>te(ce.target.value),placeholder:q,className:"w-full text-sm p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"})]});return o.jsxs("div",{ref:r,className:"absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 bg-white rounded-md shadow-lg z-30 ring-1 ring-black ring-opacity-5 p-4 max-h-[80vh] flex flex-col",children:[o.jsx("p",{className:"text-sm font-medium text-gray-800 mb-3 flex-shrink-0",children:u("chartPopover.title")}),o.jsxs("div",{className:"space-y-3 overflow-y-auto pr-2 flex-grow",children:[o.jsx("div",{className:"flex items-center justify-between gap-2",children:Xm(u).map(G=>o.jsx("button",{onClick:()=>h(G.value),className:`flex-1 text-sm py-1 rounded ${v===G.value?"bg-blue-600 text-white":"bg-gray-200 text-gray-700 hover:bg-gray-300"}`,children:G.label},G.value))}),o.jsx(oe,{label:u("chartPopover.chartTitle"),value:b,onChange:M,placeholder:u("chartPopover.chartTitlePlaceholder")}),o.jsx(oe,{label:u("chartPopover.dataLabels"),value:x,onChange:m,placeholder:u("chartPopover.dataLabelsPlaceholder")}),o.jsxs("div",{className:"space-y-2 border-t border-gray-200 pt-3 mt-3",children:[o.jsx("label",{className:"block text-xs text-gray-600",children:u("chartPopover.datasets")}),T.map((G,k)=>o.jsxs("div",{className:"p-2 border border-gray-200 rounded-md space-y-2 relative",children:[o.jsx(oe,{label:u("chartPopover.seriesName",{index:k+1}),value:G.seriesLabel,onChange:te=>J(k,"seriesLabel",te)}),o.jsx(oe,{label:u("chartPopover.dataValues"),value:G.data,onChange:te=>J(k,"data",te)}),T.length>1&&o.jsx("button",{onClick:()=>$(k),className:"absolute top-1 right-1 text-gray-400 hover:text-red-500 p-1",title:u("chartPopover.removeSeries"),children:o.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-4 w-4",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:o.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})})})]},k)),o.jsx("button",{onClick:ee,className:"w-full text-xs text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-md",children:u("chartPopover.addSeries")})]}),o.jsxs("div",{children:[o.jsx("label",{className:"block text-xs text-gray-600 mb-1",children:u("chartPopover.colorTheme")}),o.jsx("div",{className:"grid grid-cols-3 gap-2",children:Object.keys(If(u)).map(G=>o.jsx("button",{onClick:()=>C(G),className:`text-sm py-1 rounded ${E===G?"bg-blue-600 text-white":"bg-gray-200 text-gray-700 hover:bg-gray-300"}`,children:If(u)[G]},G))})]}),E==="custom"&&o.jsxs("div",{className:"mt-3",children:[o.jsx("label",{className:"block text-xs text-gray-600 mb-1",children:u("chartPopover.customColors")}),o.jsx("div",{className:"grid grid-cols-6 gap-2 bg-gray-50 p-2 rounded-md",children:A.map((G,k)=>o.jsx(ja,{value:G,onChange:te=>K(k,te),title:u("chartPopover.colorN",{index:k+1}),t:u},k))})]})]}),o.jsx("button",{onClick:_,className:"mt-4 w-full text-sm bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex-shrink-0",children:u("chartPopover.insert")})]})},Gm=({selectedElement:c,onClose:p,onNumericStyleChange:u,onGenericStyleChange:r,triggerRef:v})=>{const h=N.useRef(null),[b,M]=N.useState({marginTop:c.marginTop,marginRight:c.marginRight,marginBottom:c.marginBottom,marginLeft:c.marginLeft,paddingTop:c.paddingTop,paddingRight:c.paddingRight,paddingBottom:c.paddingBottom,paddingLeft:c.paddingLeft});N.useEffect(()=>{M({marginTop:c.marginTop,marginRight:c.marginRight,marginBottom:c.marginBottom,marginLeft:c.marginLeft,paddingTop:c.paddingTop,paddingRight:c.paddingRight,paddingBottom:c.paddingBottom,paddingLeft:c.paddingLeft})},[c]);const x=(C,A)=>{M(L=>({...L,[C]:A})),u(C,A)};N.useEffect(()=>{const C=A=>{h.current&&!h.current.contains(A.target)&&v.current&&!v.current.contains(A.target)&&p()};return document.addEventListener("mousedown",C),()=>document.removeEventListener("mousedown",C)},[p,v]);const m=()=>{x("marginTop",0),x("marginRight",0),x("marginBottom",0),x("marginLeft",0)},T=()=>{x("paddingTop",0),x("paddingRight",0),x("paddingBottom",0),x("paddingLeft",0)},g=({label1:C,value1:A,onChange1:L,label2:K,value2:J,onChange2:ee})=>{const $=({label:_,value:oe,onChange:G})=>o.jsxs("div",{className:"flex items-center gap-2",children:[o.jsx("span",{className:"text-sm text-gray-600 w-12",children:_}),o.jsx("input",{type:"range",min:-50,max:150,value:oe,onChange:k=>G(parseInt(k.target.value,10)),className:"w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"}),o.jsx("div",{className:"relative w-16",children:o.jsx("input",{type:"number",value:oe,onChange:k=>G(parseInt(k.target.value,10)||0),className:"w-full text-center text-sm p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"})})]});return o.jsxs("div",{className:"grid grid-cols-2 gap-x-6 gap-y-2",children:[o.jsx($,{label:C,value:A,onChange:L}),o.jsx($,{label:K,value:J,onChange:ee})]})},E=c.id.length>40?`...${c.id.slice(-37)}`:c.id;return o.jsxs("div",{ref:h,className:"absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[480px] bg-white rounded-lg shadow-2xl z-40 ring-1 ring-black ring-opacity-5 p-4 animate-fade-in-down",children:[o.jsx("div",{className:"flex justify-between items-center mb-4",children:o.jsx("p",{className:"text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded",title:c.id,children:E})}),o.jsxs("div",{className:"space-y-4",children:[o.jsxs("div",{children:[o.jsx("p",{className:"text-sm font-semibold text-gray-800 mb-2",children:"Margin"}),o.jsxs("div",{className:"space-y-3 bg-gray-50 p-3 rounded-md",children:[o.jsx(g,{label1:"Top",value1:b.marginTop,onChange1:C=>x("marginTop",C),label2:"Right",value2:b.marginRight,onChange2:C=>x("marginRight",C)}),o.jsx(g,{label1:"Bottom",value1:b.marginBottom,onChange1:C=>x("marginBottom",C),label2:"Left",value2:b.marginLeft,onChange2:C=>x("marginLeft",C)})]})]}),o.jsxs("div",{children:[o.jsx("p",{className:"text-sm font-semibold text-gray-800 mb-2",children:"Padding"}),o.jsxs("div",{className:"space-y-3 bg-gray-50 p-3 rounded-md",children:[o.jsx(g,{label1:"Top",value1:b.paddingTop,onChange1:C=>x("paddingTop",C),label2:"Right",value2:b.paddingRight,onChange2:C=>x("paddingRight",C)}),o.jsx(g,{label1:"Bottom",value1:b.paddingBottom,onChange1:C=>x("paddingBottom",C),label2:"Left",value2:b.paddingLeft,onChange2:C=>x("paddingLeft",C)})]})]})]}),o.jsxs("div",{className:"flex justify-end gap-2 mt-4 pt-4 border-t border-gray-200",children:[o.jsx("button",{onClick:m,className:"text-xs bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500",children:"Reset Margin"}),o.jsx("button",{onClick:T,className:"text-xs bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500",children:"Reset Padding"})]})]})},Vm=({selectedElement:c,onClose:p,onNumericStyleChange:u,onGenericStyleChange:r,triggerRef:v,t:h})=>{const b=N.useRef(null),[M,x]=N.useState({currentWidth:c.currentWidth,currentHeight:c.currentHeight,opacity:c.opacity});N.useEffect(()=>{x({currentWidth:c.currentWidth,currentHeight:c.currentHeight,opacity:c.opacity})},[c]);const m=(A,L)=>{x(K=>({...K,[A]:L})),u(A,L)},T=A=>{const L=A/100;x(K=>({...K,opacity:L})),r("opacity",L)};N.useEffect(()=>{const A=L=>{b.current&&!b.current.contains(L.target)&&v.current&&!v.current.contains(L.target)&&p()};return document.addEventListener("mousedown",A),()=>document.removeEventListener("mousedown",A)},[p,v]);const g=()=>{T(100)},E=({label:A,value:L,onChange:K,min:J,max:ee,unit:$})=>o.jsxs("div",{className:"flex items-center gap-2",children:[o.jsx("span",{className:"text-sm text-gray-600 w-12",children:A}),o.jsx("input",{type:"range",min:J,max:ee,value:L,onChange:_=>K(parseInt(_.target.value,10)),className:"w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"}),o.jsxs("div",{className:"relative w-20",children:[o.jsx("input",{type:"number",value:L,onChange:_=>K(parseInt(_.target.value,10)||0),className:"w-full text-center text-sm p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"}),o.jsx("span",{className:"absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-400",children:$})]})]}),C=c.id.length>40?`...${c.id.slice(-37)}`:c.id;return o.jsxs("div",{ref:b,className:"absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[400px] bg-white rounded-lg shadow-2xl z-40 ring-1 ring-black ring-opacity-5 p-4 animate-fade-in-down",children:[o.jsx("div",{className:"flex justify-between items-center mb-4",children:o.jsx("p",{className:"text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded",title:c.id,children:C})}),o.jsxs("div",{className:"space-y-4",children:[o.jsxs("div",{children:[o.jsx("p",{className:"text-sm font-semibold text-gray-800 mb-2",children:h("effectsPopover.size")}),o.jsxs("div",{className:"space-y-3 bg-gray-50 p-3 rounded-md",children:[o.jsx(E,{label:h("effectsPopover.width"),value:M.currentWidth,onChange:A=>m("currentWidth",A),min:10,max:1280,unit:"px"}),o.jsx(E,{label:h("effectsPopover.height"),value:M.currentHeight,onChange:A=>m("currentHeight",A),min:10,max:1080,unit:"px"})]})]}),o.jsxs("div",{children:[o.jsx("p",{className:"text-sm font-semibold text-gray-800 mb-2",children:h("effectsPopover.effects")}),o.jsx("div",{className:"space-y-3 bg-gray-50 p-3 rounded-md",children:o.jsx(E,{label:h("effectsPopover.opacity"),value:Math.round(M.opacity*100),onChange:T,min:0,max:100,unit:"%"})})]})]}),o.jsx("div",{className:"flex justify-end gap-2 mt-4 pt-4 border-t border-gray-200",children:o.jsx("button",{onClick:g,className:"text-xs bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500",children:h("effectsPopover.reset")})})]})},Qm=({selectedElement:c,onClose:p,onUpdate:u,triggerRef:r,t:v})=>{const h=N.useRef(null),[b,M]=N.useState(""),[x,m]=N.useState("_self");N.useEffect(()=>{c!=null&&c.isLink?(M(c.linkHref),m(c.linkTarget||"_self")):(M(""),m("_self"))},[c]),N.useEffect(()=>{const E=C=>{h.current&&!h.current.contains(C.target)&&r.current&&!r.current.contains(C.target)&&p()};return document.addEventListener("mousedown",E),()=>document.removeEventListener("mousedown",E)},[p,r]);const T=()=>{let E=b.trim();E&&(/^(https?:\/\/|mailto:|tel:)/i.test(E)||(E=`http://${E}`),u(E,x),p())},g=()=>{u("","",!0),p()};return o.jsxs("div",{ref:h,className:"absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 bg-white rounded-lg shadow-2xl z-40 ring-1 ring-black ring-opacity-5 p-4 animate-fade-in-down",children:[o.jsx("p",{className:"text-sm font-semibold text-gray-800 mb-3",children:v("linkPopover.title")}),o.jsxs("div",{className:"space-y-3",children:[o.jsxs("div",{children:[o.jsx("label",{htmlFor:"link-url",className:"block text-xs text-gray-600 mb-1",children:v("linkPopover.urlLabel")}),o.jsx("input",{id:"link-url",type:"text",value:b,onChange:E=>M(E.target.value),placeholder:"https://example.com",className:"w-full text-sm p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"})]}),o.jsxs("div",{children:[o.jsx("label",{htmlFor:"link-target",className:"block text-xs text-gray-600 mb-1",children:v("linkPopover.targetLabel")}),o.jsxs("select",{id:"link-target",value:x,onChange:E=>m(E.target.value),className:"w-full text-sm p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white",children:[o.jsx("option",{value:"_self",children:v("linkPopover.currentTab")}),o.jsx("option",{value:"_blank",children:v("linkPopover.newTab")}),o.jsx("option",{value:"_parent",children:v("linkPopover.parentFrame")}),o.jsx("option",{value:"_top",children:v("linkPopover.topFrame")})]})]})]}),o.jsxs("div",{className:"flex justify-between items-center mt-4 pt-4 border-t border-gray-200",children:[o.jsx("button",{onClick:g,disabled:!(c!=null&&c.isLink),className:"text-sm text-red-600 hover:text-red-800 disabled:opacity-50 disabled:cursor-not-allowed",children:v("linkPopover.remove")}),o.jsx("button",{onClick:T,className:"text-sm bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500",children:v("linkPopover.apply")})]})]})},Zm=c=>[{name:c("layoutPresetPopover.singleBox"),html:'<div style="width: 300px; padding: 20px; border: 1px dashed #ccc; min-height: 100px; background-color: #f9f9f9; border-radius: 8px;">새로운 레이아웃 박스</div>',preview:o.jsx("div",{className:"w-full h-full bg-gray-200 border border-dashed border-gray-400 rounded-sm"})},{name:c("layoutPresetPopover.twoCol"),html:`<div style="display: flex; gap: 20px; width: 500px; padding: 20px; border: 1px dashed #ccc; min-height: 200px; background-color: #f9f9f9; border-radius: 8px;">
    <div style="flex: 1; min-height: 50px; border: 1px dashed #aaa; border-radius: 4px;"></div>
    <div style="flex: 1; min-height: 50px; border: 1px dashed #aaa; border-radius: 4px;"></div>
</div>`,preview:o.jsxs("div",{className:"w-full h-full flex gap-1 p-0.5",children:[o.jsx("div",{className:"flex-1 bg-gray-200 border border-dashed border-gray-400 rounded-sm"}),o.jsx("div",{className:"flex-1 bg-gray-200 border border-dashed border-gray-400 rounded-sm"})]})},{name:c("layoutPresetPopover.threeCol"),html:`<div style="display: flex; gap: 20px; width: 600px; padding: 20px; border: 1px dashed #ccc; min-height: 150px; background-color: #f9f9f9; border-radius: 8px;">
    <div style="flex: 1; min-height: 50px; border: 1px dashed #aaa; border-radius: 4px;"></div>
    <div style="flex: 1; min-height: 50px; border: 1px dashed #aaa; border-radius: 4px;"></div>
    <div style="flex: 1; min-height: 50px; border: 1px dashed #aaa; border-radius: 4px;"></div>
</div>`,preview:o.jsxs("div",{className:"w-full h-full flex gap-1 p-0.5",children:[o.jsx("div",{className:"flex-1 bg-gray-200 border border-dashed border-gray-400 rounded-sm"}),o.jsx("div",{className:"flex-1 bg-gray-200 border border-dashed border-gray-400 rounded-sm"}),o.jsx("div",{className:"flex-1 bg-gray-200 border border-dashed border-gray-400 rounded-sm"})]})},{name:c("layoutPresetPopover.contentSidebar"),html:`<div style="display: flex; gap: 20px; width: 500px; padding: 20px; border: 1px dashed #ccc; min-height: 250px; background-color: #f9f9f9; border-radius: 8px;">
    <div style="flex: 3; min-height: 50px; border: 1px dashed #aaa; border-radius: 4px;"></div>
    <div style="flex: 1; min-height: 50px; border: 1px dashed #aaa; border-radius: 4px;"></div>
</div>`,preview:o.jsxs("div",{className:"w-full h-full flex gap-1 p-0.5",children:[o.jsx("div",{className:"w-[66%] bg-gray-200 border border-dashed border-gray-400 rounded-sm"}),o.jsx("div",{className:"flex-1 bg-gray-200 border border-dashed border-gray-400 rounded-sm"})]})},{name:c("layoutPresetPopover.headerFooter"),html:`<div style="display: flex; flex-direction: column; gap: 15px; width: 400px; padding: 20px; border: 1px dashed #ccc; min-height: 300px; background-color: #f9f9f9; border-radius: 8px;">
    <div style="min-height: 50px; border: 1px dashed #aaa; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 12px; color: #666;">Header</div>
    <div style="flex-grow: 1; min-height: 100px; border: 1px dashed #aaa; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 12px; color: #666;">Content</div>
    <div style="min-height: 40px; border: 1px dashed #aaa; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 12px; color: #666;">Footer</div>
</div>`,preview:o.jsxs("div",{className:"w-full h-full flex flex-col gap-1 p-0.5",children:[o.jsx("div",{className:"h-2 bg-gray-200 border border-dashed border-gray-400 rounded-sm"}),o.jsx("div",{className:"flex-1 bg-gray-200 border border-dashed border-gray-400 rounded-sm"}),o.jsx("div",{className:"h-2 bg-gray-200 border border-dashed border-gray-400 rounded-sm"})]})},{name:c("layoutPresetPopover.imageText"),html:`<div style="display: flex; align-items: center; gap: 20px; width: 500px; padding: 20px; border: 1px dashed #ccc; min-height: 180px; background-color: #f9f9f9; border-radius: 8px;">
    <div style="flex: 1; min-height: 120px; border: 1px dashed #aaa; border-radius: 4px; display: flex; align-items: center; justify-content: center; background: #eee; font-size: 12px; color: #666;">Image</div>
    <div style="flex: 1; min-height: 50px;">
        <h3 style="margin: 0 0 10px 0; font-family: sans-serif; font-size: 18px;">제목</h3>
        <p style="margin: 0; font-family: sans-serif; font-size: 14px; color: #555;">여기에 설명을 입력하세요.</p>
    </div>
</div>`,preview:o.jsxs("div",{className:"w-full h-full flex items-center gap-1 p-0.5",children:[o.jsx("div",{className:"w-1/2 h-full bg-gray-200 border border-dashed border-gray-400 rounded-sm"}),o.jsxs("div",{className:"w-1/2 h-full flex flex-col gap-1",children:[o.jsx("div",{className:"h-2 w-3/4 bg-gray-200 rounded-sm"}),o.jsx("div",{className:"h-1 w-full bg-gray-200 rounded-sm"}),o.jsx("div",{className:"h-1 w-full bg-gray-200 rounded-sm"})]})]})}],Pm=({onInsert:c,onClose:p,triggerRef:u,t:r})=>{const v=N.useRef(null),[h,b]=N.useState(1),[M,x]=N.useState(2),[m,T]=N.useState(20);N.useEffect(()=>{const C=A=>{v.current&&!v.current.contains(A.target)&&u.current&&!u.current.contains(A.target)&&p()};return document.addEventListener("mousedown",C),()=>document.removeEventListener("mousedown",C)},[p,u]);const g=C=>{c(C),p()},E=()=>{const C=Math.max(1,Math.min(12,h)),A=Math.max(1,Math.min(12,M)),L=Math.max(0,m),K='<div style="flex: 1; min-height: 50px; border: 1px dashed #aaa; border-radius: 4px;"></div>',J=`<div style="display: flex; flex: 1; gap: ${L}px;">
            ${Array.from({length:A},()=>K).join(`
            `)}
        </div>`,ee=Array.from({length:C},()=>J).join(`
    `),$=`<div style="display: flex; flex-direction: column; gap: ${L}px; width: 600px; padding: 20px; border: 1px dashed #ccc; min-height: 200px; background-color: #f9f9f9; border-radius: 8px;">
    ${ee}
</div>`;g($)};return o.jsxs("div",{ref:v,className:"absolute top-full left-0 mt-2 w-80 bg-white rounded-md shadow-lg z-30 ring-1 ring-black ring-opacity-5 p-3",children:[o.jsx("p",{className:"text-sm font-medium text-gray-800 mb-2 px-1",children:r("layoutPresetPopover.title")}),o.jsx("div",{className:"grid grid-cols-3 gap-2",children:Zm(r).map(C=>o.jsxs("button",{title:C.name,onClick:()=>g(C.html),className:"flex flex-col items-center justify-center p-2 rounded-md hover:bg-gray-100 text-black gap-2 h-20 group",children:[o.jsx("div",{className:"h-8 w-12",children:C.preview}),o.jsx("span",{className:"text-xs text-gray-600 group-hover:text-gray-800",children:C.name})]},C.name))}),o.jsxs("div",{className:"border-t border-gray-200 mt-3 pt-3",children:[o.jsx("p",{className:"text-sm font-medium text-gray-800 mb-2 px-1",children:r("layoutPresetPopover.custom")}),o.jsxs("div",{className:"grid grid-cols-3 gap-3 px-1 mb-3",children:[o.jsxs("div",{children:[o.jsx("label",{className:"block text-xs text-gray-600 mb-1",children:r("layoutPresetPopover.rows")}),o.jsx("input",{type:"number",value:h,onChange:C=>b(parseInt(C.target.value,10)||1),min:"1",max:"12",className:"w-full text-sm p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"})]}),o.jsxs("div",{children:[o.jsx("label",{className:"block text-xs text-gray-600 mb-1",children:r("layoutPresetPopover.cols")}),o.jsx("input",{type:"number",value:M,onChange:C=>x(parseInt(C.target.value,10)||1),min:"1",max:"12",className:"w-full text-sm p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"})]}),o.jsxs("div",{children:[o.jsx("label",{className:"block text-xs text-gray-600 mb-1",children:r("layoutPresetPopover.gap")}),o.jsx("input",{type:"number",value:m,onChange:C=>T(parseInt(C.target.value,10)||0),min:"0",step:"5",className:"w-full text-sm p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"})]})]}),o.jsx("button",{onClick:E,className:"w-full text-sm bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",children:r("layoutPresetPopover.create")})]})]})},Km=({onClose:c,onHoverStyleChange:p,triggerRef:u,initialColor:r,initialBackgroundColor:v,t:h})=>{const b=N.useRef(null),[M,x]=N.useState(r||"transparent"),[m,T]=N.useState(v||"transparent");N.useEffect(()=>{x(r||"transparent"),T(v||"transparent")},[r,v]),N.useEffect(()=>{const C=A=>{b.current&&!b.current.contains(A.target)&&u.current&&!u.current.contains(A.target)&&c()};return document.addEventListener("mousedown",C),()=>document.removeEventListener("mousedown",C)},[c,u]);const g=C=>{x(C),p("color",C)},E=C=>{T(C),p("backgroundColor",C)};return o.jsxs("div",{ref:b,className:"absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-white rounded-lg shadow-2xl z-40 ring-1 ring-black ring-opacity-5 p-4 animate-fade-in-down",children:[o.jsx("p",{className:"text-sm font-semibold text-gray-800 mb-3",children:h("interactionPopover.title")}),o.jsxs("div",{className:"space-y-3",children:[o.jsxs("div",{className:"flex items-center justify-between",children:[o.jsx("label",{className:"text-sm text-gray-600",children:h("interactionPopover.hoverTextColor")}),o.jsx(ja,{value:M,onChange:g,title:h("interactionPopover.hoverTextColor"),t:h})]}),o.jsxs("div",{className:"flex items-center justify-between",children:[o.jsx("label",{className:"text-sm text-gray-600",children:h("interactionPopover.hoverBgColor")}),o.jsx(ja,{value:m,onChange:E,title:h("interactionPopover.hoverBgColor"),t:h})]})]})]})},$m=[1,1.5,2,3],Wm=({selectedElement:c,onClose:p,onGenericStyleChange:u,triggerRef:r,t:v})=>{const h=N.useRef(null),[b,M]=N.useState(c.lineHeight||1.5);N.useEffect(()=>{M(c.lineHeight||1.5)},[c.lineHeight]),N.useEffect(()=>{const E=C=>{h.current&&!h.current.contains(C.target)&&r.current&&!r.current.contains(C.target)&&p()};return document.addEventListener("mousedown",E),()=>document.removeEventListener("mousedown",E)},[p,r]);const x=E=>{const C=Math.max(.5,Math.round(E*10)/10);M(C),u("lineHeight",C)},m=()=>{x(1.5)},T=E=>{x(E)},g=E=>{const C="flex-1 px-2 py-1 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400";return Math.abs(b-E)<.05?`${C} bg-blue-600 text-white`:`${C} bg-gray-200 hover:bg-gray-300 text-gray-800`};return o.jsxs("div",{ref:h,className:"absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-white rounded-lg shadow-2xl z-40 ring-1 ring-black ring-opacity-5 p-4 animate-fade-in-down",children:[o.jsx("div",{className:"mb-4",children:o.jsx("p",{className:"text-sm font-semibold text-gray-800",children:v("lineHeightPopover.title")})}),o.jsx("div",{className:"flex items-center justify-between gap-2 mb-4",children:$m.map(E=>o.jsx("button",{onClick:()=>T(E),className:g(E),children:E.toFixed(1)},E))}),o.jsxs("div",{className:"flex items-center gap-2",children:[o.jsx("input",{type:"range",min:"0.5",max:"3",step:"0.1",value:b,onChange:E=>x(parseFloat(E.target.value)),className:"w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"}),o.jsx("div",{className:"relative w-20",children:o.jsx("input",{type:"number",step:"0.1",value:b.toFixed(1),onChange:E=>x(parseFloat(E.target.value)||1.5),className:"w-full text-center text-sm p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"})})]}),o.jsx("div",{className:"flex justify-end mt-4 pt-4 border-t border-gray-200",children:o.jsx("button",{onClick:m,className:"text-xs bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500",children:v("lineHeightPopover.default")})})]})},Jm=c=>({[c("controls.shadow.presets.none")]:"none",[c("controls.shadow.presets.sm")]:"0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",[c("controls.shadow.presets.md")]:"0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",[c("controls.shadow.presets.lg")]:"0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)"}),Im=c=>({[c("controls.buttonStyle.presets.basic")]:{backgroundColor:"#3b82f6",color:"#ffffff",border:"1px solid transparent",padding:"8px 16px",borderRadius:"6px",cursor:"pointer"},[c("controls.buttonStyle.presets.outline")]:{backgroundColor:"transparent",color:"#3b82f6",border:"1px solid #3b82f6",padding:"8px 16px",borderRadius:"6px",cursor:"pointer"},[c("controls.buttonStyle.presets.text")]:{backgroundColor:"transparent",color:"#3b82f6",border:"none",padding:"8px 16px",borderRadius:"6px",cursor:"pointer"}}),eg=c=>[{value:"solid",label:c("controls.style.borderStyles.solid")},{value:"dashed",label:c("controls.style.borderStyles.dashed")},{value:"dotted",label:c("controls.style.borderStyles.dotted")},{value:"double",label:c("controls.style.borderStyles.double")},{value:"groove",label:c("controls.style.borderStyles.groove")},{value:"ridge",label:c("controls.style.borderStyles.ridge")},{value:"inset",label:c("controls.style.borderStyles.inset")},{value:"outset",label:c("controls.style.borderStyles.outset")},{value:"none",label:c("controls.style.borderStyles.none")}],tg=["Noto Sans KR","Nanum Gothic","Nanum Myeongjo","Gowun Dodum","Google Sans","Roboto","Poppins","Montserrat","Open Sans","Lato","Source Sans Pro","Merriweather","Oswald","Playfair Display","JetBrains Mono","Courier New","Arial","Helvetica","Verdana","Tahoma","Trebuchet MS","Times New Roman","Georgia","Garamond","Brush Script MT"],lg=[8,9,10,11,12,14,16,18,20,24,30,36,48,60,72],ng=`
<div style="width: 320px; padding: 24px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.05); font-family: sans-serif;">
    <h2 style="font-size: 22px; margin-top: 0; margin-bottom: 20px; text-align: center;">로그인</h2>
    <div style="margin-bottom: 16px;">
        <label for="email" style="display: block; font-size: 14px; margin-bottom: 6px; color: #555;">이메일</label>
        <input type="email" id="email" style="width: 100%; padding: 10px; font-size: 14px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;">
    </div>
    <div style="margin-bottom: 20px;">
        <label for="password" style="display: block; font-size: 14px; margin-bottom: 6px; color: #555;">비밀번호</label>
        <input type="password" id="password" style="width: 100%; padding: 10px; font-size: 14px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;">
    </div>
    <button style="width: 100%; padding: 12px; font-size: 16px; border: none; border-radius: 4px; background-color: #007bff; color: white; cursor: pointer;">로그인</button>
</div>
`,ag=({selectedElements:c,setSelectedElements:p,onNumericStyleChange:u,onGenericStyleChange:r,onTextAlignChange:v,onVerticalAlignChange:h,onTextStyleToggle:b,onTextColorChange:M,onBgChange:x,onUndo:m,onRedo:T,canUndo:g,canRedo:E,onInsertElement:C,bodyBgColor:A,pageWidth:L,pageHeight:K,onPageSizeChange:J,isMultiSelectMode:ee,setIsMultiSelectMode:$,setBlobUrlMap:_,onLinkUpdate:oe,onApplyStylePreset:G,onAlignmentChange:k,onApplyAnimation:te,onAutoResize:q,isPageSizeDefined:ce,onHoverStyleChange:Se,cssCode:we,t:Y})=>{const Q=c.length===0,Me=c.length>1,y=c[0]||null,le=N.useMemo(()=>{if(!y||!we)return{color:"",backgroundColor:""};const ve=y.id.replace(/([.*+?^${}()|[\]\/\\])/g,"\\$1"),Ht=new RegExp(`${ve}\\s*:\\s*hover\\b[^\\{]*\\{([\\s\\S]*?)\\}`,"i"),Qt=we.match(Ht);if(!Qt)return{color:"",backgroundColor:""};const nt=Qt[1],ft=nt.match(/(?:^|;)\s*color\s*:\s*([^;]+)/i),tl=nt.match(/(?:^|;)\s*background-color\s*:\s*([^;]+)/i)||nt.match(/(?:^|;)\s*background\s*:\s*([^;]+)/i),xe=Ye=>Ye?Ye.replace(/!important/i,"").trim():"";return{color:xe(ft==null?void 0:ft[1]),backgroundColor:xe(tl==null?void 0:tl[1])}},[we,y]),[de,V]=N.useState(!1),[B,f]=N.useState(!1),[S,z]=N.useState(!1),[U,Z]=N.useState(!1),[ne,ae]=N.useState(!1),[he,ue]=N.useState(!1),[ze,pe]=N.useState(!1),[Te,ie]=N.useState(!1),[re,be]=N.useState(!1),[se,je]=N.useState(!1),[Ge,Ue]=N.useState(!1),[Ke,at]=N.useState(!1),[bt,Je]=N.useState(!1),Oe=N.useRef(null),Ve=N.useRef(null),tt=N.useRef(null),it=N.useRef(null),ut=N.useRef(null),fl=N.useRef(null),kt=N.useRef(null),[hl,vt]=N.useState(L),[Ft,ot]=N.useState(K),[Mt,Le]=N.useState(""),[Ct,Rt]=N.useState(""),[yl,At]=N.useState("");N.useEffect(()=>{if(c.length===1){Le(c[0].currentFontSize);const X=parseFloat(c[0].animationDuration);!isNaN(X)&&X>0?Rt(X.toFixed(1)):Rt("");const ve=c[0].animDistance;if(ve&&typeof ve=="string"){const Ht=parseFloat(ve);At(isNaN(Ht)?"":Ht)}else At("")}else Le(""),Rt(""),At("")},[c]);const el=X=>{if(Q||!(y!=null&&y.animationDuration))return;const ve=Math.max(.1,X),Ht=`${ve.toFixed(1)}s`;Rt(ve.toFixed(1)),r("animationDuration",Ht)},Gt=X=>{if(Q)return;const ve=Math.max(0,X);At(ve),r("animDistance",`${ve}px`)};N.useEffect(()=>{const X=ve=>{it.current&&!it.current.contains(ve.target)&&je(!1)};return document.addEventListener("click",X),()=>document.removeEventListener("click",X)},[]);const Vt=X=>{Le(X),u("currentFontSize",X),je(!1)},jl=()=>{const X=parseInt(String(Mt),10);!isNaN(X)&&X>0?u("currentFontSize",X):c.length===1?Le(c[0].currentFontSize):Le("")};N.useEffect(()=>{vt(L)},[L]),N.useEffect(()=>{ot(K)},[K]);const xl=(X,ve)=>{(X==="width"?vt:ot)(ve)},xn=()=>{const X=parseInt(String(hl),10);!isNaN(X)&&X>0&&X!==L&&J("width",X);const ve=parseInt(String(Ft),10);!isNaN(ve)&&ve>0&&ve!==K&&J("height",ve)},vn=()=>{if(Q)return;const X=parseFloat(String(Ct));if(!isNaN(X)&&X>0)el(X);else if(y){const ve=parseFloat(y.animationDuration);Rt(isNaN(ve)?"":ve.toFixed(1))}else Rt("")},We=X=>{const ve="p-1.5 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed";return X?`${ve} bg-blue-100 text-blue-700`:`${ve} hover:bg-gray-200`},Dt=X=>{const ve="px-2 py-1 text-xs rounded focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed";return X?`${ve} bg-blue-100 text-blue-700`:`${ve} bg-gray-200 hover:bg-gray-300`},yt=({title:X,children:ve,className:Ht})=>o.jsxs("div",{className:`flex items-center gap-1 ${Ht}`,children:[X&&o.jsx("label",{className:"text-xs whitespace-nowrap break-keep font-medium text-gray-700 w-16 text-right flex-shrink-0",children:X}),o.jsx("div",{className:"flex items-center gap-1 flex-wrap",children:ve})]}),qn=[{value:"static",label:Y("controls.layout.positions.static")},{value:"relative",label:Y("controls.layout.positions.relative")},{value:"absolute",label:Y("controls.layout.positions.absolute")},{value:"fixed",label:Y("controls.layout.positions.fixed")},{value:"sticky",label:Y("controls.layout.positions.sticky")}],Yn=()=>{const X=!ee;$(X),!X&&c.length>1&&p([])},Xn=()=>y?y.backgroundColor:A??"#ffffff",Nl=X=>y?y.flexDirection==="column"?y.justifyContent===X:y.alignItems===X:!1;return o.jsxs(o.Fragment,{children:[o.jsx("style",{children:`
        @keyframes fade-in-down { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-down { animation: fade-in-down 0.2s ease-out forwards; }
        .control-separator { height: auto; align-self: stretch; width: 1px; background-color: #e5e7eb; margin: 0 0.5rem; }
        .control-separator-sm { height: 1.5rem; width: 1px; background-color: #d1d5db; margin: 0 0.25rem; }
      `}),o.jsx("div",{className:"bg-white/95 p-2 shadow-md z-10 border-b border-gray-200 animate-fade-in-down flex-shrink-0",children:o.jsxs("div",{className:"max-w-full mx-auto flex flex-col gap-y-2 px-2",children:[o.jsxs("div",{className:"flex flex-wrap items-center gap-x-1.5 gap-y-1",children:[o.jsx(yt,{title:Y("controls.history.title"),children:o.jsxs("div",{className:"flex items-center rounded-md bg-gray-100 p-0.5",children:[o.jsx("button",{title:Y("controls.history.undo"),onClick:m,className:"p-1.5 rounded hover:bg-gray-200 disabled:opacity-50",disabled:!g,children:o.jsx("i",{className:"fas fa-undo-alt"})}),o.jsx("button",{title:Y("controls.history.redo"),onClick:T,className:"p-1.5 rounded hover:bg-gray-200 disabled:opacity-50",disabled:!E,children:o.jsx("i",{className:"fas fa-redo-alt"})})]})}),o.jsxs(yt,{title:Y("controls.pageSize.title"),children:[o.jsxs("div",{className:"relative",children:[o.jsx("input",{type:"number",value:hl,onChange:X=>xl("width",X.target.value),onKeyDown:X=>X.key==="Enter"&&xn(),className:"w-20 text-center text-sm p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"}),o.jsx("label",{className:"absolute -top-2 left-2 bg-white px-1 text-xs text-gray-500",children:Y("controls.pageSize.width")})]}),o.jsxs("div",{className:"relative",children:[o.jsx("input",{type:"number",value:Ft,onChange:X=>xl("height",X.target.value),onKeyDown:X=>X.key==="Enter"&&xn(),className:"w-20 text-center text-sm p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"}),o.jsx("label",{className:"absolute -top-2 left-2 bg-white px-1 text-xs text-gray-500",children:Y("controls.pageSize.height")})]}),o.jsx("button",{onClick:xn,className:"text-sm bg-gray-200 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500",title:Y("controls.pageSize.title")+" "+Y("controls.pageSize.apply"),children:Y("controls.pageSize.apply")})]}),o.jsx(yt,{title:Y("controls.insert.title"),children:o.jsxs("div",{className:"flex items-center rounded-md bg-gray-100 p-0.5",children:[o.jsxs("div",{className:"relative",children:[o.jsx("button",{ref:ut,title:Y("controls.insert.layoutBox"),onClick:()=>Ue(X=>!X),className:"p-1.5 rounded hover:bg-gray-200",children:o.jsx("i",{className:"fas fa-th-large text-blue-500"})}),Ge&&o.jsx(Pm,{onInsert:C,onClose:()=>Ue(!1),triggerRef:ut,t:Y})]}),o.jsx("button",{title:Y("controls.insert.text"),onClick:()=>C('<p style="width: 250px; padding: 10px; font-size: 16px; border: 1px dashed #ccc; cursor: text;">새로운 텍스트 박스</p>'),className:"p-1.5 rounded hover:bg-gray-200",children:o.jsx("i",{className:"fas fa-font text-gray-700"})}),o.jsx("button",{title:Y("controls.insert.button"),onClick:()=>C('<button style="padding: 10px 20px; font-size: 16px; border-radius: 5px; border: 1px solid #ccc; background-color: #f0f0f0; cursor: pointer;">클릭하세요</button>'),className:"p-1.5 rounded hover:bg-gray-200",children:o.jsx("i",{className:"far fa-square-check text-gray-700"})}),o.jsx("button",{title:Y("controls.insert.loginForm"),onClick:()=>C(ng),className:"p-1.5 rounded hover:bg-gray-200",children:o.jsx("i",{className:"fas fa-right-to-bracket text-gray-700"})}),o.jsx("div",{className:"control-separator-sm"}),o.jsxs("div",{className:"relative",children:[o.jsx("button",{title:Y("controls.insert.table"),onClick:()=>Z(X=>!X),className:"p-1.5 rounded hover:bg-gray-200",children:o.jsx("i",{className:"fas fa-table text-green-600"})}),U&&o.jsx(qm,{onInsert:C,onClose:()=>Z(!1),t:Y})]}),o.jsxs("div",{className:"relative",children:[o.jsx("button",{title:Y("controls.insert.chart"),onClick:()=>ue(X=>!X),className:"p-1.5 rounded hover:bg-gray-200",children:o.jsx("i",{className:"fas fa-chart-pie text-purple-600"})}),he&&o.jsx(Fm,{onInsert:C,onClose:()=>ue(!1),t:Y})]}),o.jsx("div",{className:"control-separator-sm"}),o.jsxs("div",{className:"relative",children:[o.jsx("button",{title:Y("controls.insert.image"),onClick:()=>V(X=>!X),className:"p-1.5 rounded hover:bg-gray-200",children:o.jsx("i",{className:"fas fa-image text-orange-500"})}),de&&o.jsx(Om,{onInsert:C,onClose:()=>V(!1),setBlobUrlMap:_,t:Y})]}),o.jsxs("div",{className:"relative",children:[o.jsx("button",{title:Y("controls.insert.video"),onClick:()=>f(X=>!X),className:"p-1.5 rounded hover:bg-gray-200",children:o.jsx("i",{className:"fas fa-video text-red-600"})}),B&&o.jsx(Bm,{onInsert:C,onClose:()=>f(!1),t:Y})]}),o.jsx("div",{className:"control-separator-sm"}),o.jsxs("div",{className:"relative",children:[o.jsx("button",{title:Y("controls.insert.icon"),onClick:()=>z(X=>!X),className:"p-1.5 rounded hover:bg-gray-200",children:o.jsx("i",{className:"fas fa-star text-yellow-500"})}),S&&o.jsx(Um,{onInsert:C,onClose:()=>z(!1),t:Y})]}),o.jsxs("div",{className:"relative",children:[o.jsx("button",{title:Y("controls.insert.shape"),onClick:()=>ae(X=>!X),className:"p-1.5 rounded hover:bg-gray-200",children:o.jsx("i",{className:"fas fa-shapes text-indigo-500"})}),ne&&o.jsx(Ym,{onInsert:C,onClose:()=>ae(!1),t:Y})]})]})}),o.jsx(yt,{title:Y("controls.alignment.title"),children:o.jsxs("div",{className:"flex items-center rounded-md bg-gray-100 p-0.5",children:[o.jsx("button",{title:Y("controls.alignment.left"),onClick:()=>k("left"),disabled:Q,className:We(!1),children:o.jsx("i",{className:"fas fa-align-left"})}),o.jsx("button",{title:Y("controls.alignment.center"),onClick:()=>k("center"),disabled:Q,className:We(!1),children:o.jsx("i",{className:"fas fa-align-center"})}),o.jsx("button",{title:Y("controls.alignment.right"),onClick:()=>k("right"),disabled:Q,className:We(!1),children:o.jsx("i",{className:"fas fa-align-right"})})]})}),o.jsxs(yt,{title:Y("controls.layout.title"),children:[o.jsxs("div",{className:"relative",children:[o.jsx("input",{type:"number",title:Y("controls.layout.zIndex"),value:(y==null?void 0:y.zIndex)??0,onChange:X=>r("zIndex",parseInt(X.target.value,10)||0),disabled:Q,className:"w-16 text-center text-sm p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"}),o.jsx("label",{className:"absolute -top-2 left-2 bg-white px-1 text-xs text-gray-500",children:Y("controls.layout.zIndex")})]}),o.jsxs("div",{className:"relative",children:[o.jsx("select",{title:Y("controls.layout.position"),value:(y==null?void 0:y.position)??"static",onChange:X=>r("position",X.target.value),disabled:Q,className:"w-28 text-sm p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 bg-white",children:qn.map(X=>o.jsx("option",{value:X.value,children:X.label},X.value))}),o.jsx("label",{className:"absolute -top-2 left-2 bg-white px-1 text-xs text-gray-500",children:Y("controls.layout.position")})]})]}),o.jsxs(yt,{title:Y("controls.format.title"),children:[o.jsx("select",{value:(y==null?void 0:y.fontFamily)??"Arial",onChange:X=>r("fontFamily",X.target.value),disabled:Q,title:Y("controls.format.font"),className:"w-32 text-sm p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 bg-white",children:tg.map(X=>o.jsx("option",{value:X,children:X},X))}),o.jsxs("div",{ref:it,className:"relative",onMouseDown:X=>X.stopPropagation(),children:[o.jsxs("div",{className:"flex items-center border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500 bg-white",children:[o.jsx("input",{type:"number",value:Mt,onChange:X=>{Le(X.target.value);const ve=parseInt(X.target.value,10);!isNaN(ve)&&ve>0&&u("currentFontSize",ve)},onBlur:jl,onKeyDown:X=>{X.key==="Enter"&&(jl(),X.target.blur())},disabled:Q,title:Y("controls.format.fontSize"),placeholder:Me?"...":"",className:"w-16 text-sm p-1 border-none rounded-l-md focus:outline-none disabled:bg-gray-100 text-center"}),o.jsx("span",{className:"text-xs text-gray-400 pr-1 select-none",children:"px"}),o.jsx("button",{onClick:()=>je(X=>!X),disabled:Q,className:"p-1 border-l border-gray-300 text-gray-500 hover:bg-gray-100 focus:outline-none disabled:opacity-50 border-r-0 border-t-0 border-b-0",style:{height:"14px"},title:Y("controls.format.selectFontSize"),children:o.jsx("i",{className:"fas fa-chevron-down text-xs"})})]}),se&&o.jsx("ul",{className:"absolute top-full mt-1 w-full bg-white rounded-md shadow-lg z-50 max-h-48 overflow-y-auto ring-1 ring-black ring-opacity-5",children:lg.map(X=>o.jsx("li",{onClick:()=>Vt(X),className:"px-3 py-1.5 text-sm text-center hover:bg-blue-100 cursor-pointer",children:X},X))})]}),o.jsxs("div",{className:"flex items-center rounded-md bg-gray-100 p-0.5 gap-0.5",children:[o.jsx(ja,{value:(y==null?void 0:y.color)??"#000000",onChange:M,disabled:Q,title:Y("controls.format.color"),t:Y}),o.jsx("button",{title:Y("controls.format.bold"),onClick:()=>b("fontWeight","bold"),className:We((y==null?void 0:y.fontWeight)==="bold"||parseInt((y==null?void 0:y.fontWeight)??"400")>=700),disabled:Q,children:o.jsx("i",{className:"fas fa-bold"})}),o.jsx("button",{title:Y("controls.format.italic"),onClick:()=>b("fontStyle","italic"),className:We((y==null?void 0:y.fontStyle)==="italic"),disabled:Q,children:o.jsx("i",{className:"fas fa-italic"})}),o.jsx("button",{title:Y("controls.format.underline"),onClick:()=>b("textDecoration","underline"),className:We((y==null?void 0:y.textDecoration.includes("underline"))??!1),disabled:Q,children:o.jsx("i",{className:"fas fa-underline"})}),o.jsx("button",{title:Y("controls.format.strikethrough"),onClick:()=>b("textDecoration","line-through"),className:We((y==null?void 0:y.textDecoration.includes("line-through"))??!1),disabled:Q,children:o.jsx("i",{className:"fas fa-strikethrough"})}),o.jsxs("div",{className:"relative",children:[o.jsx("button",{ref:tt,title:Y("controls.format.link"),onClick:()=>be(X=>!X),className:We((y==null?void 0:y.isLink)??!1),disabled:Q||Me,children:o.jsx("i",{className:"fas fa-link"})}),re&&o.jsx(Qm,{selectedElement:y,onClose:()=>be(!1),onUpdate:oe,triggerRef:tt,t:Y})]}),o.jsx("button",{title:Y("controls.format.alignLeft"),onClick:()=>v("left"),className:We((y==null?void 0:y.textAlign)==="left"),disabled:Q,children:o.jsx("i",{className:"fas fa-align-left"})}),o.jsx("button",{title:Y("controls.format.alignCenter"),onClick:()=>v("center"),className:We((y==null?void 0:y.textAlign)==="center"),disabled:Q,children:o.jsx("i",{className:"fas fa-align-center"})}),o.jsx("button",{title:Y("controls.format.alignRight"),onClick:()=>v("right"),className:We((y==null?void 0:y.textAlign)==="right"),disabled:Q,children:o.jsx("i",{className:"fas fa-align-right"})}),o.jsx("div",{className:"control-separator-sm"}),o.jsx("button",{title:Y("controls.format.alignTop"),onClick:()=>h("flex-start"),className:We(Nl("flex-start")),disabled:Q,children:o.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:"w-4 h-4",children:[o.jsx("path",{d:"M2 2.6665H14",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"}),o.jsx("path",{d:"M5.33333 6.6665H10.6667",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"}),o.jsx("path",{d:"M5.33333 10.6665H10.6667",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})]})}),o.jsx("button",{title:Y("controls.format.alignMiddle"),onClick:()=>h("center"),className:We(Nl("center")),disabled:Q,children:o.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:"w-4 h-4",children:[o.jsx("path",{d:"M2 8H14",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"}),o.jsx("path",{d:"M5.33333 4H10.6667",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"}),o.jsx("path",{d:"M5.33333 12H10.6667",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})]})}),o.jsx("button",{title:Y("controls.format.alignBottom"),onClick:()=>h("flex-end"),className:We(Nl("flex-end")),disabled:Q,children:o.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:"w-4 h-4",children:[o.jsx("path",{d:"M2 13.3335H14",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"}),o.jsx("path",{d:"M5.33333 5.3335H10.6667",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"}),o.jsx("path",{d:"M5.33333 9.3335H10.6667",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})]})}),o.jsx("div",{className:"control-separator-sm"}),o.jsxs("div",{className:"relative",children:[o.jsxs("button",{ref:kt,title:Y("controls.format.lineHeight"),onClick:()=>Je(X=>!X),className:`${We(bt)} flex items-center gap-1 px-2`,disabled:Q||Me,children:[o.jsx("i",{className:"fas fa-mouse-pointer"}),o.jsx("span",{className:"text-sm",children:Y("controls.format.lineHeight")})]}),bt&&o.jsx(Wm,{selectedElement:y,onClose:()=>Je(!1),onGenericStyleChange:r,triggerRef:kt,t:Y})]})]})]}),o.jsx(yt,{title:Y("controls.background.title"),children:o.jsx(ja,{value:Xn(),onChange:x,disabled:Q,title:Y(y?"controls.background.elementBg":"controls.background.pageBg"),t:Y})}),o.jsx(yt,{title:Y("controls.multiSelect.title"),children:o.jsx("button",{title:Y("controls.multiSelect.mode"),onClick:Yn,className:We(ee),children:o.jsx("i",{className:"far fa-square"})})})]}),o.jsx("div",{className:"w-full h-px bg-gray-200"}),o.jsxs("div",{className:`flex items-center flex-wrap gap-x-3 gap-y-2 w-full transition-opacity duration-200 ${Q?"opacity-40 pointer-events-none":""}`,children:[o.jsxs(yt,{title:Y("controls.spacing.title"),children:[o.jsxs("div",{className:"relative",children:[o.jsx("button",{ref:Oe,title:Y("controls.spacing.marginPadding"),onClick:()=>pe(X=>!X),className:We(ze),disabled:Q||Me,children:o.jsx("i",{className:"fas fa-ruler-combined"})}),ze&&y&&o.jsx(Gm,{selectedElement:y,onClose:()=>pe(!1),onNumericStyleChange:u,onGenericStyleChange:r,triggerRef:Oe})]}),o.jsxs("div",{className:"relative",children:[o.jsx("button",{ref:Ve,title:Y("controls.effects.title"),onClick:()=>ie(X=>!X),className:We(Te),disabled:Q||Me,children:o.jsx("i",{className:"fas fa-vector-square"})}),Te&&y&&o.jsx(Vm,{selectedElement:y,onClose:()=>ie(!1),onNumericStyleChange:u,onGenericStyleChange:r,triggerRef:Ve,t:Y})]})]}),o.jsxs(yt,{title:Y("controls.style.title"),children:[o.jsx("span",{className:"text-xs font-medium text-gray-500",children:Y("controls.style.border")}),o.jsx("input",{type:"number",value:(y==null?void 0:y.borderWidth)??0,onChange:X=>u("borderWidth",parseInt(X.target.value,10)),disabled:Q,className:"w-14 text-center text-sm p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"}),o.jsx("select",{value:(y==null?void 0:y.borderStyle)??"none",onChange:X=>r("borderStyle",X.target.value),disabled:Q,className:"text-sm p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100",children:eg(Y).map(X=>o.jsx("option",{value:X.value,children:X.label},X.value))}),o.jsx(ja,{value:(y==null?void 0:y.borderColor)??"#000000",onChange:X=>r("borderColor",X),disabled:Q,title:Y("controls.style.borderColor"),t:Y}),o.jsx("div",{className:"control-separator-sm"}),o.jsx("span",{className:"text-xs font-medium text-gray-500",children:Y("controls.style.corner")}),o.jsx("input",{type:"range",min:"0",max:"100",value:(y==null?void 0:y.borderRadius)??0,onChange:X=>u("borderRadius",parseInt(X.target.value,10)),className:"w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer",disabled:Q}),o.jsxs("span",{className:"text-sm text-gray-600 w-12 text-left",children:[(y==null?void 0:y.borderRadius)??0,"px"]}),o.jsx("div",{className:"control-separator-sm"}),o.jsxs("div",{className:"relative",children:[o.jsxs("button",{ref:fl,title:Y("controls.interaction.hoverEdit"),onClick:()=>at(X=>!X),className:`${We(Ke)} flex items-center gap-1 px-2`,disabled:Q||Me,children:[o.jsx("i",{className:"fas fa-mouse-pointer"}),o.jsx("span",{className:"text-sm",children:Y("controls.interaction.hoverEdit")})]}),Ke&&o.jsx(Km,{onClose:()=>at(!1),onHoverStyleChange:Se,triggerRef:fl,initialColor:le.color,initialBackgroundColor:le.backgroundColor,t:Y})]})]}),o.jsx(yt,{title:Y("controls.buttonStyle.title"),children:o.jsx("div",{className:"flex items-center rounded-md bg-gray-100 p-0.5 gap-0.5",children:Object.entries(Im(Y)).map(([X,ve])=>o.jsx("button",{title:X,onClick:()=>G(ve),className:Dt(!1),disabled:Q,children:X},X))})}),o.jsx(yt,{title:Y("controls.shadow.title"),children:o.jsx("div",{className:"flex items-center rounded-md bg-gray-100 p-0.5 gap-0.5",children:Object.entries(Jm(Y)).map(([X,ve])=>o.jsx("button",{title:X,onClick:()=>r("boxShadow",ve),className:Dt((y==null?void 0:y.boxShadow)===ve),disabled:Q,children:X},X))})}),o.jsx(yt,{title:Y("controls.animation.title"),children:o.jsxs("div",{className:"flex items-center rounded-md bg-gray-100 p-0.5 gap-0.5",children:[o.jsx("button",{title:Y("controls.animation.presets.fadeIn"),onClick:()=>te("anim-fade-in"),className:Dt(!1),disabled:Q,children:Y("controls.animation.presets.fadeIn")}),o.jsx("button",{title:Y("controls.animation.presets.slideUp"),onClick:()=>te("anim-slide-up"),className:Dt(!1),disabled:Q,children:Y("controls.animation.presets.slideUp")}),o.jsx("button",{title:Y("controls.animation.presets.slideInLeft"),onClick:()=>te("anim-slide-in-left"),className:Dt(!1),disabled:Q,children:Y("controls.animation.presets.slideInLeft")}),o.jsx("button",{title:Y("controls.animation.presets.slideDown"),onClick:()=>te("anim-slide-down"),className:Dt(!1),disabled:Q,children:Y("controls.animation.presets.slideDown")}),o.jsx("button",{title:Y("controls.animation.presets.slideInRight"),onClick:()=>te("anim-slide-in-right"),className:Dt(!1),disabled:Q,children:Y("controls.animation.presets.slideInRight")}),o.jsx("button",{title:Y("controls.animation.presets.remove"),onClick:()=>te(""),className:We(!1),disabled:Q,children:o.jsx("i",{className:"fas fa-ban"})})]})}),o.jsx(yt,{title:Y("controls.speed.title"),children:o.jsxs("div",{className:"flex items-center",children:[o.jsxs("div",{className:"relative",children:[o.jsx("input",{type:"number",step:"0.1",value:Ct,onChange:X=>Rt(X.target.value),onBlur:vn,onKeyDown:X=>{X.key==="Enter"&&(vn(),X.target.blur())},disabled:Q||!(y!=null&&y.animationDuration),title:Y("controls.speed.duration"),placeholder:"...",className:"w-16 h-8 text-sm p-1 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 text-center pr-5"}),o.jsx("span",{className:"absolute right-1.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 select-none pointer-events-none",children:"s"})]}),o.jsxs("div",{className:"flex flex-col -ml-px",children:[o.jsx("button",{onClick:()=>el(Number(Ct||"0.7")+.1),disabled:Q||!(y!=null&&y.animationDuration),className:"px-1.5 text-gray-600 hover:bg-gray-100 focus:outline-none disabled:opacity-50 border border-gray-300 rounded-tr-md border-b-0 border-l-0",style:{height:"16px",lineHeight:"14px"},title:Y("controls.speed.slower"),children:o.jsx("i",{className:"fas fa-chevron-up text-xs"})}),o.jsx("button",{onClick:()=>el(Number(Ct||"0.7")-.1),disabled:Q||!(y!=null&&y.animationDuration),className:"px-1.5 text-gray-600 hover:bg-gray-100 focus:outline-none disabled:opacity-50 border border-gray-300 rounded-br-md border-l-0",style:{height:"16px",lineHeight:"14px"},title:Y("controls.speed.faster"),children:o.jsx("i",{className:"fas fa-chevron-down text-xs"})})]})]})}),o.jsx(yt,{title:Y("controls.distance.title"),children:o.jsxs("div",{className:"flex items-center",children:[o.jsxs("div",{className:"relative",children:[o.jsx("input",{type:"number",value:yl,onChange:X=>At(X.target.value),onBlur:()=>{const X=parseFloat(String(yl));isNaN(X)||Gt(X)},onKeyDown:X=>{if(X.key==="Enter"){const ve=parseFloat(String(yl));isNaN(ve)||(Gt(ve),X.target.blur())}},disabled:Q,title:Y("controls.distance.pixels"),placeholder:"...",className:"w-16 h-8 text-sm p-1 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 text-center pr-5"}),o.jsx("span",{className:"absolute right-1.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 select-none pointer-events-none",children:"px"})]}),o.jsxs("div",{className:"flex flex-col -ml-px",children:[o.jsx("button",{onClick:()=>Gt(Number(yl||"20")+5),disabled:Q,className:"px-1.5 text-gray-600 hover:bg-gray-100 focus:outline-none disabled:opacity-50 border border-gray-300 rounded-tr-md border-b-0 border-l-0",style:{height:"16px",lineHeight:"14px"},title:Y("controls.distance.more"),children:o.jsx("i",{className:"fas fa-chevron-up text-xs"})}),o.jsx("button",{onClick:()=>Gt(Math.max(0,Number(yl||"20")-5)),disabled:Q,className:"px-1.5 text-gray-600 hover:bg-gray-100 focus:outline-none disabled:opacity-50 border border-gray-300 rounded-br-md border-l-0",style:{height:"16px",lineHeight:"14px"},title:Y("controls.distance.less"),children:o.jsx("i",{className:"fas fa-chevron-down text-xs"})})]})]})})]})]})})]})},yn=(c,p,u)=>`
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>새 문서</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"><\/script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <style>
        /* Mimics the structure and essential styles from initialHtml.ts */
        html, body {
            overflow: hidden; /* Prevent scrollbars from resizer handles overflowing the body */
        }
        body {
            margin: 0;
            background-color: #e5e7eb; /* Match the editor's preview pane background */
        }
        .slide-container {
            /* This is a wrapper for one or more slides. */
            display: flex;
            flex-direction: column;
            align-items: center; /* Center slides */
            padding: 32px 0; /* Padding for single slide view */
            margin: 0 auto;
        }
        .slide-item {
            /* This is the actual slide content area */
            width: ${c}px;
            height: ${p}px;
            background-color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            overflow: hidden; /* Important for the slide itself */
        }
        /* Basic reset for content inside */
        .slide-item > * { margin: 0; }
    </style>
</head>
<body>
    <div class="slide-container">
        <div class="slide-item">
            ${u}
        </div>
    </div>
</body>
</html>
`.trim(),ig=c=>[{name:c("templates.blankCanvas.name"),description:c("templates.blankCanvas.description"),icon:"fas fa-file",width:1280,height:720,html:yn(1280,720,c("templates.blankCanvas.content"))},{name:c("templates.presentation.name"),description:c("templates.presentation.description"),icon:"fas fa-desktop",width:1280,height:720,html:yn(1280,720,c("templates.presentation.content"))},{name:c("templates.a4.name"),description:c("templates.a4.description"),icon:"fas fa-file-alt",width:794,height:1123,html:yn(794,1123,c("templates.a4.content"))},{name:c("templates.mobile.name"),description:c("templates.mobile.description"),icon:"fas fa-mobile-alt",width:375,height:667,html:yn(375,667,c("templates.mobile.content"))},{name:c("templates.social.name"),description:c("templates.social.description"),icon:"fab fa-instagram",width:1080,height:1080,html:yn(1080,1080,c("templates.social.content"))},{name:c("templates.banner.name"),description:c("templates.banner.description"),icon:"fas fa-ad",width:728,height:90,html:yn(728,90,c("templates.banner.content"))}],og=({onSelect:c,onClose:p,triggerRef:u,t:r})=>{const v=N.useRef(null),[h,b]=N.useState(1280),[M,x]=N.useState(720),m=ig(r);N.useEffect(()=>{const g=E=>{v.current&&!v.current.contains(E.target)&&u.current&&!u.current.contains(E.target)&&p()};return document.addEventListener("mousedown",g),()=>document.removeEventListener("mousedown",g)},[p,u]);const T=()=>{console.log(`[Debug] Creating custom template with size: ${h}x${M}`);const g={name:r("templates.custom.name"),description:r("templates.custom.description",{width:h,height:M}),icon:"fas fa-ruler-combined",width:h,height:M,html:yn(h,M,r("templates.custom.content"))};c(g)};return o.jsxs("div",{ref:v,className:"absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 bg-white rounded-md shadow-lg z-30 ring-1 ring-black ring-opacity-5 p-2 animate-fade-in-down",children:[o.jsx("p",{className:"text-sm font-semibold text-gray-800 mb-2 px-2 pt-1",children:r("newFilePopover.title")}),o.jsx("div",{className:"grid grid-cols-2 gap-2",children:m.map(g=>o.jsxs("button",{onClick:()=>c(g),className:"flex flex-col items-center justify-center text-center p-3 rounded-lg hover:bg-gray-100 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500",children:[o.jsx("i",{className:`${g.icon} fa-2x text-gray-600 mb-2`}),o.jsx("span",{className:"text-sm font-medium text-gray-800",children:g.name}),o.jsx("span",{className:"text-xs text-gray-500",children:g.description})]},g.name))}),o.jsxs("div",{className:"border-t border-gray-200 mt-2 pt-2 px-2",children:[o.jsx("p",{className:"text-sm font-semibold text-gray-800 mb-2",children:r("newFilePopover.customSize")}),o.jsxs("div",{className:"flex items-center gap-2 mb-2",children:[o.jsxs("div",{className:"relative flex-1",children:[o.jsx("input",{type:"number",value:h,onChange:g=>b(parseInt(g.target.value,10)||0),className:"w-full text-center text-sm p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"}),o.jsx("label",{className:"absolute -top-2 left-2 bg-white px-1 text-xs text-gray-500",children:"W"})]}),o.jsxs("div",{className:"relative flex-1",children:[o.jsx("input",{type:"number",value:M,onChange:g=>x(parseInt(g.target.value,10)||0),className:"w-full text-center text-sm p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"}),o.jsx("label",{className:"absolute -top-2 left-2 bg-white px-1 text-xs text-gray-500",children:"H"})]})]}),o.jsx("button",{onClick:T,className:"w-full text-sm bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",children:r("newFilePopover.create")})]})]})},sg=({view:c,setView:p,isPreviewSizerOpen:u,setIsPreviewSizerOpen:r,previewSizerRef:v,previewScale:h,setPreviewScale:b,isControlsVisible:M,setIsControlsVisible:x,isGlobalTextHidden:m,setIsGlobalTextHidden:T,fileInputRef:g,handleFileOpen:E,handleOpenClick:C,isDownloading:A,libsLoadingState:L,handleDownloadHTML:K,handleDownloadPPTX:J,handleDownloadPDF:ee,handleDownloadImage:$,handleOpenInNewTab:_,setSelectedElements:oe,setIsManualOpen:G,isLayersPanelOpen:k,onToggleLayersPanel:te,onNewFile:q,onExtractText:ce,isOcrLoading:Se,language:we,setLanguage:Y,t:Q})=>{const[Me,y]=N.useState(!1),le=N.useRef(null),de=Z=>{const ne="px-3 py-1 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150";return c===Z?`${ne} bg-blue-600 text-white`:`${ne} bg-white text-gray-700 hover:bg-gray-100`},V="px-3 py-1.5 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150 bg-white text-gray-700 hover:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed disabled:bg-gray-50",B="flex flex-col items-center justify-center w-12 py-2 text-gray-700 hover:bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-colors duration-150",f=()=>{if(A)return Q("header.downloadPptx");switch(L){case"loading":return Q("header.downloadPptxLoading");case"error":return Q("header.downloadPptxError");case"loaded":default:return Q("header.downloadPptx")}},S=()=>{if(A)return Q("header.downloadPdf");switch(L){case"loading":return Q("header.downloadPdfLoading");case"error":return Q("header.downloadPdfError");case"loaded":default:return Q("header.downloadPdf")}},z=async Z=>{oe([]),await new Promise(ne=>setTimeout(ne,100)),Z()},U=()=>{Y(Z=>Z==="ko"?"en":"ko")};return o.jsxs("header",{className:"bg-white shadow-sm px-4 py-2 flex justify-between items-center flex-shrink-0 z-20",children:[o.jsxs("h1",{className:"text-2xl font-bold text-gray-700 flex items-center",children:[o.jsx("img",{src:"/assets/icons/editor-title.jpg",alt:"",width:50,height:30,className:"mr-2 rounded","aria-hidden":"true"}),Q("header.title")]}),o.jsxs("div",{className:"flex items-center gap-2",children:[o.jsxs("div",{className:"flex items-center gap-2",children:[o.jsx("span",{className:"text-sm font-medium text-gray-700",children:Q("header.languageChange")}),o.jsx("button",{onClick:U,title:Q("header.languageToggleTooltip"),className:V,children:we==="ko"?"EN":"KO"})]}),o.jsx("div",{className:"h-6 w-px bg-gray-300 mx-1"})," ",o.jsxs("button",{onClick:()=>G(!0),className:"flex flex-col items-center justify-center w-16 py-1 text-gray-700 bg-white hover:bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 transition-colors duration-150",title:Q("header.manual"),children:[o.jsx("div",{className:"h-6 flex items-center",children:o.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5 text-gray-600",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:o.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"})})}),o.jsx("span",{className:"text-xs font-medium",children:Q("header.manual")})]}),o.jsxs("button",{title:Q("header.layers"),onClick:te,className:`flex flex-col items-center justify-center w-16 py-1 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 transition-colors duration-150 ${k?"bg-blue-100 text-blue-700":"bg-white hover:bg-gray-100"}`,children:[o.jsx("div",{className:"h-6 flex items-center",children:o.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5 text-gray-600",viewBox:"0 0 20 20",fill:"currentColor",children:o.jsx("path",{fillRule:"evenodd",d:"M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm2-1a1 1 0 00-1 1v2h12V5a1 1 0 00-1-1H5zM4 9v6a1 1 0 001 1h10a1 1 0 001-1V9H4z",clipRule:"evenodd"})})}),o.jsx("span",{className:"text-xs font-medium",children:Q("header.layers")})]}),o.jsxs("button",{title:Q("header.extractText"),onClick:ce,disabled:Se||L!=="loaded",className:"flex flex-col items-center justify-center w-16 py-1 text-gray-700 bg-white hover:bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 transition-colors duration-150 disabled:cursor-wait disabled:bg-gray-50",children:[o.jsx("div",{className:"h-6 flex items-center",children:Se?o.jsxs("svg",{className:"animate-spin h-5 w-5 text-blue-600",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",children:[o.jsx("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),o.jsx("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})]}):o.jsx("i",{className:"fas fa-spell-check fa-lg text-teal-600"})}),o.jsx("span",{className:"text-xs font-medium",children:Q("header.extractText")})]}),o.jsxs("div",{className:"flex items-center gap-2 border-l border-gray-300 pl-2",children:[o.jsxs("div",{className:"relative",children:[o.jsxs("button",{ref:le,onClick:()=>y(Z=>!Z),title:Q("header.newFile"),className:"flex flex-col items-center justify-center w-16 py-1 text-gray-700 bg-white hover:bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 transition-colors duration-150",children:[o.jsx("div",{className:"h-6 flex items-center",children:o.jsx("i",{className:"fas fa-file-circle-plus fa-lg text-green-600"})}),o.jsx("span",{className:"text-xs font-medium",children:Q("header.newFile")})]}),Me&&o.jsx(og,{onSelect:Z=>{q(Z),y(!1)},onClose:()=>y(!1),triggerRef:le,t:Q})]}),o.jsx("span",{className:"text-sm font-medium text-gray-700",children:Q("header.import")}),o.jsxs("div",{className:"flex items-center gap-0",children:[o.jsx("input",{type:"file",ref:g,onChange:E,accept:".html,.htm,.pdf,.pptx,image/*",style:{display:"none"}}),o.jsxs("button",{onClick:()=>C(".html,.htm"),title:Q("header.import")+" HTML",className:B,children:[o.jsx("div",{className:"h-6 flex items-center",children:o.jsx("i",{className:"fas fa-file-code fa-xl text-blue-600"})}),o.jsx("span",{className:"text-xs font-medium",children:Q("header.importHtml")})]}),o.jsxs("button",{onClick:()=>C(".pdf"),title:Q("header.import")+" PDF",className:B,children:[o.jsx("div",{className:"h-6 flex items-center",children:o.jsx("i",{className:"fas fa-file-pdf fa-xl text-red-600"})}),o.jsx("span",{className:"text-xs font-medium",children:Q("header.importPdf")})]}),o.jsxs("button",{onClick:()=>C(".pptx"),title:Q("header.import")+" PPTX",className:B,children:[o.jsx("div",{className:"h-6 flex items-center",children:o.jsx("i",{className:"fas fa-file-powerpoint fa-xl text-orange-600"})}),o.jsx("span",{className:"text-xs font-medium",children:Q("header.importPptx")})]}),o.jsxs("button",{onClick:()=>C("image/*"),title:Q("header.import")+" IMG",className:B,children:[o.jsx("div",{className:"h-6 flex items-center",children:o.jsx("i",{className:"fas fa-file-image fa-xl text-green-600"})}),o.jsx("span",{className:"text-xs font-medium",children:Q("header.importImg")})]})]})]}),o.jsxs("div",{className:"relative",ref:v,children:[o.jsx("button",{onClick:()=>r(Z=>!Z),className:V,title:Q("header.previewSize"),children:o.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5 text-gray-600",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:o.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"})})}),u&&o.jsxs("div",{className:"absolute left-1/2 -translate-x-1/2 mt-2 w-64 bg-white rounded-md shadow-lg z-30 ring-1 ring-black ring-opacity-5 p-4 origin-top",children:[o.jsx("label",{htmlFor:"preview-scale",className:"block text-sm font-medium text-gray-700 mb-2",children:Q("header.previewScale")}),o.jsxs("div",{className:"flex items-center gap-2",children:[o.jsx("input",{id:"preview-scale",type:"range",min:"25",max:"200",step:"5",value:h,onChange:Z=>b(parseInt(Z.target.value,10)),className:"w-full"}),o.jsxs("span",{className:"text-sm text-gray-600 w-12 text-right",children:[h,"%"]})]})]})]}),o.jsx("button",{onClick:()=>x(Z=>!Z),className:V,children:Q("header.editControls")}),o.jsx("button",{onClick:()=>T(Z=>!Z),className:V,children:Q(m?"header.showAllText":"header.hideAllText")}),o.jsxs("div",{className:"flex items-center gap-2 border-l border-gray-300 pl-2",children:[o.jsx("button",{onClick:()=>p("split"),className:de("split"),children:Q("header.splitView")}),o.jsx("button",{onClick:()=>p("editor"),className:de("editor"),children:Q("header.editorView")}),o.jsx("button",{onClick:()=>p("preview"),className:de("preview"),children:Q("header.previewView")}),o.jsx("button",{onClick:_,title:"새 탭에서 미리보기 열기",className:V,children:Q("header.newTabView")})]}),o.jsxs("div",{className:"flex items-center gap-2 border-l border-gray-300 pl-2",children:[o.jsx("span",{className:"text-sm font-medium text-gray-700",children:Q("header.download")}),o.jsxs("div",{className:"flex items-center gap-0",children:[o.jsxs("button",{onClick:()=>z(K),disabled:A,title:Q("header.download")+" HTML",className:B,children:[o.jsx("div",{className:"h-6 flex items-center",children:o.jsx("i",{className:"fas fa-file-code fa-xl text-blue-600"})}),o.jsx("span",{className:"text-xs font-medium",children:Q("header.downloadHtml")})]}),o.jsxs("button",{onClick:()=>z(ee),title:S(),disabled:A||L!=="loaded",className:B,children:[o.jsx("div",{className:"h-6 flex items-center",children:o.jsx("i",{className:"fas fa-file-pdf fa-xl text-red-600"})}),o.jsx("span",{className:"text-xs font-medium",children:Q("header.downloadPdf")})]}),o.jsxs("button",{onClick:()=>z(J),title:f(),disabled:A||L!=="loaded",className:B,children:[o.jsx("div",{className:"h-6 flex items-center",children:o.jsx("i",{className:"fas fa-file-powerpoint fa-xl text-orange-600"})}),o.jsx("span",{className:"text-xs font-medium",children:Q("header.downloadPptx")})]}),o.jsxs("button",{onClick:()=>z($),disabled:A,title:Q("header.download")+" "+Q("header.downloadImage"),className:B,children:[o.jsx("div",{className:"h-6 flex items-center",children:o.jsx("i",{className:"fas fa-file-image fa-xl text-green-600"})}),o.jsx("span",{className:"text-xs font-medium",children:Q("header.downloadImage")})]})]})]})]})]})},rg=({view:c,editorPane:p,previewPane:u,previewScale:r,pageWidth:v,pageHeight:h})=>{const[b,M]=N.useState(30),[x,m]=N.useState(!1),T=N.useRef(null),g=L=>{L.preventDefault(),m(!0)},E=N.useCallback(()=>{m(!1)},[]),C=N.useCallback(L=>{if(!x)return;const K=L.clientX/window.innerWidth*100;K>10&&K<90&&M(K)},[x]);N.useEffect(()=>(x&&(window.addEventListener("mousemove",C),window.addEventListener("mouseup",E)),()=>{window.removeEventListener("mousemove",C),window.removeEventListener("mouseup",E)}),[x,C,E]);const A=o.jsx("div",{style:{width:`${v*(r/100)}px`,height:`${h*(r/100)}px`,flexShrink:0},children:o.jsx("div",{style:{width:`${v}px`,height:`${h}px`,transform:`scale(${r/100})`,transformOrigin:"top left"},children:u})});return o.jsxs("main",{className:"flex-grow flex flex-row p-4 overflow-hidden min-h-0",children:[c==="editor"&&o.jsx("div",{className:"w-full h-full",children:p}),c==="preview"&&o.jsx("div",{ref:T,className:"w-full h-full overflow-auto bg-gray-200 flex items-start justify-center p-8",children:A}),c==="split"&&o.jsxs(o.Fragment,{children:[o.jsx("div",{className:`h-full ${x?"pointer-events-none":""}`,style:{width:`calc(${b}% - 4px)`},children:p}),o.jsx("div",{className:"w-2 cursor-col-resize bg-gray-300 hover:bg-blue-500 transition-colors rounded-full",onMouseDown:g}),o.jsx("div",{ref:T,className:`h-full overflow-auto bg-gray-200 flex items-start justify-center p-8 ${x?"pointer-events-none":""}`,style:{width:`calc(${100-b}% - 4px)`},children:A})]})]})},cg=({isOpen:c,onClose:p,t:u})=>{const r=N.useRef(null);N.useEffect(()=>{const M=x=>{x.key==="Escape"&&p()};return c&&document.addEventListener("keydown",M),()=>{document.removeEventListener("keydown",M)}},[c,p]);const v=M=>{r.current&&!r.current.contains(M.target)&&p()};if(!c)return null;const h=({title:M,children:x})=>o.jsxs("div",{className:"mb-6",children:[o.jsx("h3",{className:"text-xl font-semibold text-gray-800 border-b-2 border-blue-200 pb-2 mb-3",children:M}),o.jsx("div",{className:"text-gray-600 space-y-2 text-base leading-relaxed",children:x})]}),b=({children:M})=>o.jsx("kbd",{className:"px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-md",children:M});return o.jsxs("div",{className:"fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4",onClick:v,children:[o.jsxs("div",{ref:r,className:"bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col animate-fade-in-down",style:{animation:"fade-in-down 0.3s ease-out forwards"},children:[o.jsxs("header",{className:"flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white rounded-t-lg z-10",children:[o.jsxs("h2",{className:"text-2xl font-bold text-gray-800",children:[o.jsx("i",{className:"fas fa-book-open text-blue-500 mr-3"}),u("manual.title")]}),o.jsx("button",{onClick:p,className:"text-gray-400 hover:text-gray-600 transition-colors",children:o.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-7 w-7",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:o.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})})})]}),o.jsxs("main",{className:"p-6 overflow-y-auto",children:[o.jsx(h,{title:u("manual.intro"),children:o.jsx("p",{children:"라이브 HTML 편집기에 오신 것을 환영합니다! 이 강력한 도구는 코딩과 디자인의 경계를 허물어줍니다. 코드를 직접 편집하고, 실시간 미리보기에서 요소를 시각적으로 조작하며, 다양한 스타일을 적용하여 웹 페이지, 프레젠테이션, 문서 등을 손쉽게 제작할 수 있습니다. 또한, PDF나 PPTX 파일을 불러와 편집 가능한 웹 콘텐츠로 변환하는 혁신적인 기능도 제공합니다."})}),o.jsxs(h,{title:u("manual.layout"),children:[o.jsxs("p",{children:[o.jsx("strong",{children:"1. 헤더:"})," 화면 상단에는 파일 관리(새 파일, 불러오기, 내보내기), 보기 모드 변경, 미리보기 제어, 레이어 패널 열기 등 핵심 기능 버튼들이 위치합니다."]}),o.jsxs("p",{children:[o.jsx("strong",{children:"2. 코드 편집기:"})," 좌측(분할 모드 시)에는 HTML, CSS, JavaScript 코드를 작성할 수 있는 탭 기반 편집기가 있습니다."]}),o.jsxs("p",{children:[o.jsx("strong",{children:"3. 실시간 미리보기:"})," 우측(분할 모드 시)에는 코드 변경 사항이 즉시 반영되는 미리보기 화면이 표시됩니다. 이 화면에서 직접 요소를 클릭하여 선택하고 편집할 수 있습니다."]}),o.jsxs("p",{children:[o.jsx("strong",{children:"4. 컨트롤 패널:"})," '편집' 버튼을 클릭하면 나타나는 패널로, 선택된 요소의 스타일(글꼴, 색상, 레이아웃 등)을 상세하게 조정할 수 있습니다."]}),o.jsxs("p",{children:[o.jsx("strong",{children:"5. 레이어 패널:"})," 문서의 전체 구조를 트리 형태로 확인하고, 복잡한 요소들을 쉽게 선택하고 관리할 수 있습니다."]})]}),o.jsxs(h,{title:u("manual.gettingStarted"),children:[o.jsxs("p",{children:[o.jsx("strong",{children:"새 파일 만들기:"})," 헤더의 '새 파일' 버튼을 클릭하세요. '빈 캔버스', '프레젠테이션' 등 다양한 템플릿을 선택하거나, '사용자 지정 크기'에 너비와 높이를 직접 입력하여 새 작업을 시작할 수 있습니다."]}),o.jsxs("p",{children:[o.jsx("strong",{children:"파일 불러오기:"})," 헤더의 '불러오기' 섹션에서 원하는 파일 형식 버튼을 클릭하여 기존 파일을 가져올 수 있습니다.",o.jsxs("ul",{className:"list-disc list-inside mt-2 ml-4",children:[o.jsxs("li",{children:[o.jsx("strong",{children:"HTML:"})," 기존 웹 페이지를 그대로 불러와 편집을 계속할 수 있습니다."]}),o.jsxs("li",{children:[o.jsx("strong",{children:"PDF:"})," 정적인 PDF를 분석하여 배경과 텍스트, 이미지가 분리된 편집 가능한 HTML로 변환합니다."]}),o.jsxs("li",{children:[o.jsx("strong",{children:"PPTX:"})," 파워포인트 파일을 분석하여 각 슬라이드를 HTML 요소로 변환하여 웹 콘텐츠로 재활용할 수 있습니다."]})]})]})]}),o.jsxs(h,{title:u("manual.coreFeatures"),children:[o.jsxs("p",{children:[o.jsx("strong",{children:"미리보기 화면 조작:"}),o.jsxs("ul",{className:"list-disc list-inside mt-2 ml-4 space-y-1",children:[o.jsxs("li",{children:[o.jsx("strong",{children:"선택:"})," 편집할 요소를 클릭하여 선택합니다."]}),o.jsxs("li",{children:[o.jsx("strong",{children:"다중 선택:"})," ",o.jsx(b,{children:"Shift"})," 키를 누른 채 여러 요소를 클릭하거나, 컨트롤 패널의 '다중 선택' 모드를 활성화한 후 드래그하여 여러 요소를 한 번에 선택할 수 있습니다."]}),o.jsxs("li",{children:[o.jsx("strong",{children:"텍스트 수정:"})," 텍스트 요소를 더블 클릭하면 내용을 직접 수정할 수 있습니다."]}),o.jsxs("li",{children:[o.jsx("strong",{children:"이동 & 크기 조절:"})," `position: absolute` 스타일이 적용된 요소는 드래그하여 위치를 자유롭게 옮길 수 있습니다. 요소를 선택하면 나타나는 핸들을 드래그하여 크기를 조절할 수 있습니다."]}),o.jsxs("li",{children:[o.jsx("strong",{children:"요소 복제 & 삭제:"})," 요소를 선택하면 좌측 상단에 나타나는 미니 툴바의 아이콘을 클릭하여 복제하거나 삭제할 수 있습니다."]}),o.jsxs("li",{children:[o.jsx("strong",{children:"드래그 앤 드롭:"})," 일반적인 요소(absolute가 아닌)를 드래그하여 다른 컨테이너 박스로 옮기거나 순서를 변경할 수 있습니다."]})]})]}),o.jsxs("p",{children:[o.jsx("strong",{children:"코드 에디터 사용:"})," 좌측의 에디터에서 HTML, CSS, JavaScript 코드를 직접 수정할 수 있습니다. 변경사항은 즉시 우측 미리보기 화면에 반영됩니다."]})]}),o.jsxs(h,{title:u("manual.controlsGuide"),children:[o.jsx("p",{children:"컨트롤 패널은 선택된 요소에 따라 활성화되며, 다음과 같은 다양한 스타일을 시각적으로 제어할 수 있습니다."}),o.jsxs("ul",{className:"list-disc list-inside mt-2 ml-4 space-y-1",children:[o.jsxs("li",{children:[o.jsx("strong",{children:"작업 내역:"})," 실행 취소(",o.jsx(b,{children:"Ctrl+Z"}),") 및 다시 실행(",o.jsx(b,{children:"Ctrl+Y"}),")."]}),o.jsxs("li",{children:[o.jsx("strong",{children:"페이지 크기:"})," 전체 문서/슬라이드의 크기 조절 및 배경색 지정."]}),o.jsxs("li",{children:[o.jsx("strong",{children:"삽입:"})," 텍스트, 버튼, 레이아웃 박스부터 표, 차트, 이미지, 비디오, 아이콘, 도형 등 다양한 요소를 페이지에 추가합니다."]}),o.jsxs("li",{children:[o.jsx("strong",{children:"인터랙션:"})," 요소에 마우스를 올렸을 때(Hover)의 글자색, 배경색 등 동적인 효과를 설정합니다."]}),o.jsxs("li",{children:[o.jsx("strong",{children:"정렬 & 레이아웃:"})," 선택된 요소의 정렬, 위치 기준(`position`), 쌓임 순서(`z-index`) 등을 제어합니다."]}),o.jsxs("li",{children:[o.jsx("strong",{children:"서식:"})," 글꼴, 크기, 색상, 굵기/기울임 등의 텍스트 스타일과 링크를 설정합니다."]}),o.jsxs("li",{children:[o.jsx("strong",{children:"간격 & 효과:"})," Margin, Padding 등 외부/내부 여백과 요소의 크기, 투명도를 조절합니다."]}),o.jsxs("li",{children:[o.jsx("strong",{children:"꾸미기:"})," 테두리, 모서리 둥글기, 그림자 효과, 미리 정의된 버튼 스타일을 적용합니다."]}),o.jsxs("li",{children:[o.jsx("strong",{children:"애니메이션:"})," 나타나기, 올라오기 등 간단한 CSS 애니메이션 효과와 속도를 조절합니다."]})]})]}),o.jsxs(h,{title:u("manual.advanced"),children:[o.jsxs("p",{children:[o.jsx("strong",{children:"레이어 패널:"})," 복잡하게 겹쳐있거나 찾기 힘든 요소를 트리 구조에서 쉽게 찾아 선택하거나 숨김/표시 처리할 수 있습니다. 패널 자체를 드래그하여 원하는 위치로 이동시킬 수 있습니다."]}),o.jsxs("p",{children:[o.jsx("strong",{children:"내보내기:"})," 작업물을 웹 표준 ",o.jsx("strong",{children:"HTML"})," 파일, 인쇄용 ",o.jsx("strong",{children:"PDF"}),", 발표용 ",o.jsx("strong",{children:"PPTX"}),", 그리고 ",o.jsx("strong",{children:"이미지(PNG)"})," 파일로 저장할 수 있습니다."]}),o.jsxs("p",{children:[o.jsx("strong",{children:"새 탭에서 미리보기:"})," 실제 웹 환경과 유사한 새 탭에서 결과물을 확인합니다. 슬라이드 구조가 있을 경우 프레젠테이션 컨트롤러가 함께 제공되어 발표 모드로 활용할 수 있습니다."]})]}),o.jsx(h,{title:u("manual.shortcuts"),children:o.jsxs("ul",{className:"list-disc list-inside space-y-1",children:[o.jsxs("li",{children:[o.jsx(b,{children:"Ctrl"})," / ",o.jsx(b,{children:"Cmd"})," + ",o.jsx(b,{children:"Z"})," : 실행 취소"]}),o.jsxs("li",{children:[o.jsx(b,{children:"Ctrl"})," / ",o.jsx(b,{children:"Cmd"})," + ",o.jsx(b,{children:"Shift"})," + ",o.jsx(b,{children:"Z"})," (또는 ",o.jsx(b,{children:"Ctrl"})," + ",o.jsx(b,{children:"Y"}),") : 다시 실행"]}),o.jsxs("li",{children:[o.jsx(b,{children:"Delete"})," / ",o.jsx(b,{children:"Backspace"})," : 선택된 요소 삭제"]}),o.jsxs("li",{children:[o.jsx(b,{children:"Escape"})," : 요소 선택 해제"]}),o.jsxs("li",{children:[o.jsx(b,{children:"Shift"})," + 클릭 : 다중 요소 선택/해제"]})]})})]})]}),o.jsx("style",{children:`
        @keyframes fade-in-down { 
          from { opacity: 0; transform: translateY(-20px) scale(0.98); } 
          to { opacity: 1; transform: translateY(0) scale(1); } 
        }
      `})]})},dg=({isOpen:c,onClose:p,extractedText:u,isLoading:r,t:v})=>{const[h,b]=N.useState(v("ocr.copy")),M=N.useRef(null);N.useEffect(()=>{c&&b(v("ocr.copy"))},[c,v]);const x=()=>{u&&navigator.clipboard.writeText(u).then(()=>{b(v("ocr.copied")),setTimeout(()=>b(v("ocr.copy")),2e3)}).catch(T=>{console.error("Failed to copy text: ",T),alert("Failed to copy text.")})},m=T=>{M.current&&!M.current.contains(T.target)&&p()};return c?o.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4",onClick:m,children:o.jsxs("div",{ref:M,className:"bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col",children:[o.jsxs("header",{className:"flex items-center justify-between p-4 border-b border-gray-200",children:[o.jsx("h2",{className:"text-xl font-bold text-gray-800",children:v("ocr.title")}),o.jsx("button",{onClick:p,className:"text-gray-400 hover:text-gray-600",children:o.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:o.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})})})]}),o.jsx("main",{className:"p-6 overflow-y-auto bg-gray-50 flex-grow min-h-[200px]",children:r?o.jsxs("div",{className:"flex flex-col items-center justify-center h-full text-center",children:[o.jsxs("svg",{className:"animate-spin h-8 w-8 text-blue-500 mb-4",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",children:[o.jsx("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),o.jsx("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})]}),o.jsx("p",{className:"text-md font-medium text-gray-700",children:v("ocr.loading")})]}):o.jsx("pre",{className:"whitespace-pre-wrap font-sans text-sm text-gray-800 p-2 bg-white border border-gray-200 rounded-md",children:u})}),o.jsx("footer",{className:"p-4 border-t border-gray-200 bg-white rounded-b-lg flex justify-end",children:o.jsx("button",{onClick:x,disabled:r||!u||u===v("ocr.noTextFound"),className:"px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",children:h})})]})}):null},ug=c=>{const u=new DOMParser().parseFromString(c,"text/html"),r=h=>{var m;const b=h.tagName.toLowerCase();if(["script","style","head","meta","link","title"].includes(b))return null;const M=Hm(h);if(!M)return null;const x=Array.from(h.children).map(T=>r(T)).filter(T=>T!==null);return{tagName:b,selector:M,children:x,contentSample:((m=h.textContent)==null?void 0:m.trim().substring(0,30))||"",isHidden:h.style.display==="none"}};return Array.from(u.body.children).map(h=>r(h)).filter(Boolean)},ah=({node:c,selectedElementIds:p,onSelect:u,onToggleVisibility:r,level:v,t:h})=>{const b=p.includes(c.selector);return o.jsxs("div",{children:[o.jsxs("div",{onClick:M=>{M.stopPropagation(),u(c.selector)},className:`flex items-center justify-between py-1.5 pr-2 rounded cursor-pointer transition-colors ${b?"bg-blue-100":"hover:bg-gray-100"}`,style:{paddingLeft:`${v*16+8}px`},children:[o.jsxs("div",{className:"flex items-center gap-2 overflow-hidden",children:[o.jsx("span",{className:"font-mono text-xs text-blue-600 flex-shrink-0",children:c.tagName}),c.contentSample&&o.jsx("span",{className:"text-xs text-gray-500 truncate",children:c.contentSample})]}),o.jsx("div",{className:"flex items-center gap-2 flex-shrink-0",children:o.jsx("button",{onClick:M=>{M.stopPropagation(),r(c.selector)},className:`p-1 rounded-full text-xs ${c.isHidden?"text-gray-400":"text-gray-700"} hover:bg-gray-200`,title:c.isHidden?h("layers.show"):h("layers.hide"),children:o.jsx("i",{className:`fas ${c.isHidden?"fa-eye-slash":"fa-eye"}`})})})]}),c.children.length>0&&o.jsx("div",{className:"border-l border-gray-200",children:c.children.map(M=>o.jsx(ah,{node:M,selectedElementIds:p,onSelect:u,onToggleVisibility:r,level:v+1,t:h},M.selector))})]})},fg=({isOpen:c,onClose:p,htmlCode:u,selectedElementIds:r,onSelectElement:v,onToggleVisibility:h,t:b})=>{const M=N.useRef(null),[x,m]=N.useState({x:window.innerWidth-420,y:150}),[T,g]=N.useState(!1),E=N.useRef({x:0,y:0}),C=N.useMemo(()=>ug(u),[u]),A=J=>{g(!0),E.current={x:J.clientX-x.x,y:J.clientY-x.y}},L=J=>{T&&m({x:J.clientX-E.current.x,y:J.clientY-E.current.y})},K=()=>{g(!1)};return N.useEffect(()=>(T&&(document.addEventListener("mousemove",L),document.addEventListener("mouseup",K)),()=>{document.removeEventListener("mousemove",L),document.removeEventListener("mouseup",K)}),[T]),c?o.jsxs("div",{ref:M,className:"fixed bg-white rounded-lg shadow-2xl w-[400px] h-[600px] flex flex-col z-40 border border-gray-200",style:{top:`${x.y}px`,left:`${x.x}px`},onMouseDown:J=>J.stopPropagation(),children:[o.jsxs("header",{onMouseDown:A,className:"flex items-center justify-between p-3 border-b border-gray-200 cursor-move bg-gray-50 rounded-t-lg",children:[o.jsxs("h3",{className:"text-base font-semibold text-gray-800",children:[o.jsx("i",{className:"fas fa-layer-group text-blue-500 mr-2"}),b("layers.title")]}),o.jsx("button",{onClick:p,className:"text-gray-400 hover:text-gray-600 transition-colors",children:o.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:o.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})})})]}),o.jsx("main",{className:"p-1 overflow-y-auto flex-grow",children:C.length>0?C.map(J=>o.jsx(ah,{node:J,selectedElementIds:r,onSelect:v,onToggleVisibility:h,level:0,t:b},J.selector)):o.jsx("div",{className:"flex items-center justify-center h-full text-sm text-gray-400",children:b("layers.empty")})})]}):null},Qr=`<!DOCTYPE html>
<html lang="ko"><head>
<meta charset="utf-8">
<meta content="width=device-width, initial-scale=1.0" name="viewport">
<title>라이브 HTML 편집기 프레젠테이션</title>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700;900&amp;display=swap" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/chart.js"><\/script>
<style>
    /* Global Styles */
    html, body {
        overflow: hidden !important; /* Prevent internal scrollbars; scrolling is handled by the parent frame */
    }
    body {
        margin: 0;
        background-color: #e5e7eb; /* Match the editor's preview pane background */
    }
    .slide-container {
        /* width is now controlled by individual slides */
        display: flex;
        flex-direction: column;
        align-items: center; /* Center the slides horizontally */
        gap: 32px; /* Add space BETWEEN slides */
        padding: 32px 0; /* Add space at the top and bottom of the whole set */
        margin: 0 auto;
    }

    /* --- SLIDE 1 STYLES --- */
    .slide-1 {
        font-family: 'Noto Sans KR', sans-serif;
        background-color: #FFFFFF;
        color: #333333;
        width: 1280px;
        height: 720px;
        position: relative;
        display: flex;
        flex-direction: column;
        box-shadow: 0 8px 24px rgba(0,0,0,0.1);
        overflow: hidden;
    }
    .slide-1 * { margin: 0; padding: 0; box-sizing: border-box; }
    .slide-1 .header { background-color: #FF6B35; color: white; padding: 15px 30px; display: flex; justify-content: space-between; align-items: center; height: 60px; }
    .slide-1 .header-title { font-size: 25px; font-weight: 700; }
    .slide-1 .header-subtitle { font-size: 16px; font-weight: 500; }
    .slide-1 .main-content { display: flex; flex: 1; height: calc(100% - 60px); position: relative; }
    .slide-1 .left-column { width: 50%; height: 100%; padding: 30px; position: absolute; left: 0; top: 0; }
    .slide-1 .right-column { width: 50%; height: 100%; background-color: #F8F8F8; padding: 30px; position: absolute; left: 50%; top: 0; }
    .slide-1 .title { font-size: 26px; font-weight: 600; color: #333; line-height: 1.2; position: absolute; top: 40px; left: 40px; width: 90%; }
    .slide-1 .title span { color: #FF6B35; }
    .slide-1 .subtitle { font-size: 18px; color: #555; line-height: 1.5; position: absolute; top: 130px; left: 40px; width: 90%; }
    .slide-1 .problem-list { position: absolute; top: 280px; left: 40px; width: 90%; }
    .slide-1 .problem-item { display: flex; margin-bottom: 20px; align-items: center; }
    .slide-1 .problem-icon { background-color: #FF6B35; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px; flex-shrink: 0; }
    .slide-1 .problem-text { font-size: 16px; line-height: 1.5; }
    .slide-1 .problem-title { font-weight: 700; margin-bottom: 5px; color: #444; }
    .slide-1 .comparison-table { width: 90%; border-collapse: collapse; box-shadow: 0 4px 8px rgba(0,0,0,0.1); border-radius: 8px; overflow: hidden; position: absolute; top: 60px; left: 40px; }
    .slide-1 .comparison-table th { background-color: #FF6B35; color: white; text-align: left; padding: 12px 15px; font-weight: 500; }
    .slide-1 .comparison-table td { padding: 10px 15px; border-bottom: 1px solid #e0e0e0; }
    .slide-1 .comparison-table tr:last-child td { border-bottom: none; }
    .slide-1 .comparison-table tr:nth-child(even) { background-color: #f2f2f2; }
    .slide-1 .highlight { color: #FF6B35; font-weight: 700; }
    .slide-1 .chart-container { height: 200px; position: absolute; top: 380px; left: 40px; width: 90%; }
    .slide-1 .divider { height: 4px; width: 80px; background-color: #FF6B35; position: absolute; top: 100px; left: 40px; }
    
    /* --- SLIDE 2 STYLES --- */
    .slide-2 { font-family: 'Noto Sans KR', sans-serif; background-color: #121212; color: #ffffff; width: 1280px; height: 720px; position: relative; display: flex; flex-direction: column; box-shadow: 0 8px 24px rgba(0,0,0,0.1); overflow: hidden; }
    .slide-2 * { margin: 0; padding: 0; box-sizing: border-box; }
    .slide-2 .header { background-color: #000000; padding: 20px 40px; color: white; display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #00d4ff; }
    .slide-2 .header-title { font-size: 24px; font-weight: 700; color: #00d4ff; }
    .slide-2 .header-subtitle { font-size: 16px; font-weight: 400; color: #888888; }
    .slide-2 .content { display: flex; flex: 1; padding: 30px; background-color: #121212; position: relative; }
    .slide-2 .left-column { flex: 1; padding-right: 30px; position: absolute; left: 30px; top: 30px; width: 50%; height: 90%; }
    .slide-2 .right-column { flex: 1; display: flex; flex-direction: column; justify-content: space-between; position: absolute; left: 50%; top: 30px; width: 50%; padding-left: 30px; height: 90%; }
    .slide-2 .title { font-size: 26px; font-weight: 700; color: #00d4ff; line-height: 1.2; position: absolute; top: 20px; left: 0px; }
    .slide-2 .feature-section { margin-bottom: 25px; position: absolute; width: 90%; }
    .slide-2 .feature-section.fs1 { top: 100px; left: 0px; }
    .slide-2 .feature-section.fs2 { top: 320px; left: 0px; }
    .slide-2 .feature-title { font-size: 22px; font-weight: 700; color: #00ff88; margin-bottom: 15px; }
    .slide-2 .feature-item { display: flex; align-items: flex-start; margin-bottom: 15px; }
    .slide-2 .feature-icon { color: #00d4ff; margin-right: 15px; font-size: 20px; padding-top: 3px; }
    .slide-2 .feature-text { flex: 1; font-size: 16px; line-height: 1.5; }
    .slide-2 .feature-text strong { color: #00ff88; }
    .slide-2 .comparison-table { width: 90%; border-collapse: collapse; border: 1px solid #333333; position: absolute; top: 100px; left: 0; }
    .slide-2 .comparison-table th { background-color: #000000; color: #00d4ff; padding: 12px; text-align: left; font-size: 16px; font-weight: 500; border: 1px solid #333333; }
    .slide-2 .comparison-table td { padding: 10px 12px; border: 1px solid #333333; font-size: 15px; background-color: #1a1a1a; }
    .slide-2 .comparison-table tr:nth-child(even) td { background-color: #222222; }
    .slide-2 .chart-container { width: 90%; height: 250px; border-radius: 8px; padding: 15px; position: absolute; bottom: 0px; left: 0; }
    .slide-2 .section-title { font-size: 20px; font-weight: 700; color: #00d4ff; margin-bottom: 15px; text-align: center; }
    .slide-2 .highlight { color: #00ff88; }

    /* --- SLIDE 3 STYLES --- */
    .slide-3 { font-family: 'Noto Sans KR', sans-serif; background-color: #ffffff; color: #333333; width: 1280px; height: 720px; position: relative; display: flex; flex-direction: column; box-shadow: 0 8px 24px rgba(0,0,0,0.1); overflow: hidden; }
    .slide-3 * { margin: 0; padding: 0; box-sizing: border-box; }
    .slide-3 .header { background-color: #9B59B6; padding: 20px 40px; color: white; display: flex; justify-content: space-between; align-items: center; }
    .slide-3 .header-title { font-size: 24px; font-weight: 700; }
    .slide-3 .header-subtitle { font-size: 16px; font-weight: 400; }
    .slide-3 .content { display: flex; flex: 1; padding: 30px; position: relative; }
    .slide-3 .left-column { flex: 1; padding-right: 30px; position: absolute; left: 30px; top: 30px; width: 50%; height: 90%; }
    .slide-3 .right-column { flex: 1; display: flex; flex-direction: column; justify-content: space-between; position: absolute; left: 50%; top: 30px; width: 50%; padding-left: 30px; height: 90%; }
    .slide-3 .title { font-size: 26px; font-weight: 700; color: #4A90E2; line-height: 1.2; position: absolute; top: 20px; left: 0px; }
    .slide-3 .subtitle { font-size: 20px; font-weight: 600; color: #E91E63; position: absolute; top: 130px; left: 0px; }
    .slide-3 .value-items { margin-top: 20px; position: absolute; top: 200px; left: 0px; width: 90%; }
    .slide-3 .value-item { display: flex; align-items: flex-start; margin-bottom: 20px; }
    .slide-3 .value-icon { margin-right: 15px; font-size: 28px; }
    .slide-3 .value-content { flex: 1; }
    .slide-3 .value-title { font-size: 18px; font-weight: 700; margin-bottom: 5px; line-height: 1.4; }
    .slide-3 .value-description { font-size: 15px; line-height: 1.5; }
    .slide-3 .comparison-table { width: 90%; border-collapse: collapse; border: 1px solid #e0e0e0; position: absolute; top: 60px; left: 0px; }
    .slide-3 .comparison-table th { padding: 12px; text-align: left; font-size: 15px; font-weight: 500; border: 1px solid #e0e0e0; }
    .slide-3 .comparison-table td { padding: 10px 12px; border: 1px solid #e0e0e0; font-size: 14px; }
    .slide-3 .chart-container { width: 90%; height: 260px; position: absolute; bottom: 0px; left: 0px; }
    .slide-3 .section-title { font-size: 18px; font-weight: 700; margin-bottom: 12px; text-align: center; }
    .slide-3 .icon-blue { color: #4A90E2; }
    .slide-3 .icon-purple { color: #9B59B6; }
    .slide-3 .icon-pink { color: #E91E63; }
    .slide-3 .th-blue { background-color: #4A90E2; color: white; }
    .slide-3 .th-purple { background-color: #9B59B6; color: white; }
    .slide-3 .th-green { background-color: #4CAF50; color: white; }
    .slide-3 .tr-blue { background-color: #EBF5FF; }
    .slide-3 .tr-purple { background-color: #F6EFFE; }
    .slide-3 .tr-green { background-color: #EEFBEE; }
</style>
</head>
<body>
<div class="slide-container">
    <!-- SLIDE 1: 무엇을, 왜 만들었는가? -->
    <div class="slide-1">
        <div class="header">
            <div class="header-title">라이브 HTML 편집기</div>
            <div class="header-subtitle">코딩과 디자인의 경계를 허물다</div>
        </div>
        <div class="main-content">
            <div class="left-column">
                <h1 class="title">무엇을 왜 만들었는가?</h1>
                <div class="divider"></div>
                <p class="subtitle">코드 편집기의 강력함과 디자인 툴의 직관성을 하나로 합쳐, 아이디어가 결과물이 되는 시간을 획기적으로 단축시키는 솔루션입니다.</p>
                <div class="problem-list">
                    <div class="problem-item">
                        <div class="problem-icon"><i class="fas fa-code-branch"></i></div>
                        <div class="problem-text">
                            <div class="problem-title">분리된 작업 환경</div>
                            <div>개발자는 코드를, 디자이너는 시안을, 기획자는 문서를 보며 발생하는 비효율과 반복적인 수정 작업.</div>
                        </div>
                    </div>
                    <div class="problem-item">
                        <div class="problem-icon"><i class="fas fa-user-slash"></i></div>
                        <div class="problem-text">
                            <div class="problem-title">높은 진입 장벽</div>
                            <div>코딩 지식이 없으면 간단한 웹 콘텐츠 수정조차 어려웠던 문제.</div>
                        </div>
                    </div>
                    <div class="problem-item">
                        <div class="problem-icon"><i class="fas fa-file-export"></i></div>
                        <div class="problem-text">
                            <div class="problem-title">변환 문제</div>
                            <div>HTML TO PPTX 정확도 높은 변환이 가능해 몇번의 수정으로 프리젠테이션 가능.</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right-column">
                <table class="comparison-table">
                    <thead><tr><th>비교항목</th><th>기존 워크플로우</th><th>라이브 HTML 편집기</th></tr></thead>
                    <tbody>
                        <tr><td>제작 시간</td><td>평균 3시간</td><td><span class="highlight">평균 1시간</span></td></tr>
                        <tr><td>팀 협업</td><td>개별 툴 사용</td><td><span class="highlight">단일 플랫폼</span></td></tr>
                        <tr><td>수정 용이성</td><td>개발자 필요</td><td><span class="highlight">누구나 가능</span></td></tr>
                        <tr><td>내보내기</td><td>단일 포맷</td><td><span class="highlight">다중 포맷</span></td></tr>
                        <tr><td>학습 곡선</td><td>가파름</td><td><span class="highlight">완만함</span></td></tr>
                    </tbody>
                </table>
                <div class="chart-container"><canvas id="efficiencyChart"></canvas></div>
            </div>
        </div>
    </div>

    <!-- SLIDE 2: 어떻게 가능한가? -->
    <div class="slide-2">
        <div class="header">
            <div class="header-title">어떻게 가능한가? - 핵심 기능</div>
            <div class="header-subtitle">라이브 HTML 편집기 피치 덱</div>
        </div>
        <div class="content">
            <div class="left-column">
                <h1 class="title">직관적인 편집, 혁신적인 재활용</h1>
                <div class="feature-section fs1">
                    <h2 class="feature-title">1. 실시간 시각적 편집 (WYSIWYG, 그 이상)</h2>
                    <div class="feature-item">
                        <div class="feature-icon"><i class="fas fa-hand-pointer"></i></div>
                        <div class="feature-text"><strong>다이렉트 핸들링:</strong> <br>미리보기 화면에서 마치 파워포인트처럼 요소를 클릭하여 선택하고, 드래그하여 옮기고, 더블클릭하여 텍스트를 바로 수정합니다.</div>
                    </div>
                    <div class="feature-item">
                        <div class="feature-icon"><i class="fas fa-sliders-h"></i></div>
                        <div class="feature-text"><strong>상세 컨트롤 패널:</strong> <br>코드를 전혀 몰라도, 선택한 요소의 글꼴, 색상, 여백, 그림자 등 모든 디자인 속성을 전문가처럼 제어할 수 있습니다.</div>
                    </div>
                </div>
                <div class="feature-section fs2">
                    <h2 class="feature-title">2. 콘텐츠의 무한한 확장성 (One Source, Multi-Use)</h2>
                    <div class="feature-item">
                        <div class="feature-icon"><i class="fas fa-file-pdf"></i></div>
                        <div class="feature-text"><strong>PDF의 재탄생:</strong> <br>정적인 PDF 문서를 불러오면, AI가 배경과 텍스트를 자동으로 분리하여 편집 가능한 동적 HTML 콘텐츠로 완벽하게 변환합니다.</div>
                    </div>
                    <div class="feature-item">
                        <div class="feature-icon"><i class="fas fa-file-powerpoint"></i></div>
                        <div class="feature-text"><strong>지능형 내보내기:</strong> <br>작업물을 단순 이미지가 아닌, 텍스트와 차트가 살아있는 네이티브 파워포인트(PPTX) 파일로 내보내 즉시 발표 자료로 활용할 수 있습니다. (PDF, 이미지, HTML은 기본)</div>
                    </div>
                </div>
            </div>
            <div class="right-column">
                <div>
                    <h3 class="section-title">기능 비교: 일반 편집기 vs <span class="highlight">라이브 HTML 편집기</span></h3>
                    <table class="comparison-table" style="position: absolute; top: 58px; left: 25px;">
                        <thead><tr><th>기능</th><th>일반 HTML 편집기</th><th>라이브 HTML 편집기</th></tr></thead>
                        <tbody>
                            <tr><td><strong>시각적 편집</strong></td><td>제한적</td><td>완전 통합</td></tr>
                            <tr><td><strong>코드 자동 생성</strong></td><td>부분적</td><td>지능형 생성</td></tr>
                            <tr><td><strong>PDF 변환</strong></td><td>불가능</td><td>AI 기반 변환</td></tr>
                            <tr><td><strong>PPTX 내보내기</strong></td><td>불가능</td><td>네이티브 지원</td></tr>
                            <tr><td><strong>비개발자 접근성</strong></td><td>낮음</td><td>매우 높음</td></tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <h3 class="section-title">사용자 만족도 향상</h3>
                    <div class="chart-container" style="position: absolute; top: 333px; left: 20px;"><canvas id="satisfactionChart"></canvas></div>
                </div>
            </div>
        </div>
    </div>

    <!-- SLIDE 3: 기대효과 및 비전 -->
    <div class="slide-3">
        <div class="header">
            <div class="header-title">우리에게 어떤 의미가 있는가? - 기대효과 및 비전</div>
            <div class="header-subtitle">라이브 HTML 편집기 피치 덱</div>
        </div>
        <div class="content">
            <div class="left-column">
                <h1 class="title">콘텐츠 제작의<br>패러다임을 바꾸다</h1>
                <h2 class="subtitle">고객 가치</h2>
                <div class="value-items">
                    <div class="value-item">
                        <div class="value-icon icon-blue"><i class="fas fa-chart-line"></i></div>
                        <div class="value-content">
                            <div class="value-title">생산성 50% 향상</div>
                            <div class="value-description">웹 페이지, 보고서, 프레젠테이션 제작 워크플로우를 하나로 통합하여 작업 시간을 획기적으로 단축합니다.</div>
                        </div>
                    </div>
                    <div class="value-item">
                        <div class="value-icon icon-purple"><i class="fas fa-users"></i></div>
                        <div class="value-content">
                            <div class="value-title">역할의 확장</div>
                            <div class="value-description">비개발 직군(기획자, 디자이너, 마케터)도 직접 고품질의 디지털 콘텐츠를 제작하고 수정할 수 있습니다.</div>
                        </div>
                    </div>
                    <div class="value-item">
                        <div class="value-icon icon-pink"><i class="fas fa-coins"></i></div>
                        <div class="value-content">
                            <div class="value-title">비용 절감</div>
                            <div class="value-description">외주 개발이나 디자이너의 추가 작업 없이, 내부에서 신속하게 콘텐츠를 제작하고 배포할 수 있습니다.</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right-column">
                <div>
                    <h3 class="section-title" style="color: #4A90E2;">ROI 비교 분석</h3>
                    <table class="comparison-table" style="position: absolute; top: 43px; left: 35px; width: 556px; height: 231px;">
                        <thead><tr><th class="th-blue">항목</th><th class="th-purple">기존 방식</th><th class="th-green">라이브 HTML 편집기</th></tr></thead>
                        <tbody>
                            <tr class="tr-blue"><td><strong>초기 투자 비용</strong></td><td>중간</td><td>낮음</td></tr>
                            <tr class="tr-purple"><td><strong>유지보수 비용</strong></td><td>높음</td><td>매우 낮음</td></tr>
                            <tr class="tr-green"><td><strong>작업자 교육 비용</strong></td><td>높음</td><td>낮음</td></tr>
                            <tr class="tr-blue"><td><strong>콘텐츠 생산량</strong></td><td>월 10건</td><td>월 25건</td></tr>
                            <tr class="tr-purple"><td><strong>투자 회수 기간</strong></td><td>12개월</td><td>4개월</td></tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <h3 class="section-title" style="color: #9B59B6;">시장 성장 예측</h3>
                    <div class="chart-container" style="position: absolute; top: 307px; left: 35px; width: 554px; height: 223px;"><canvas id="marketGrowthChart"></canvas></div>
                </div>
            </div>
        </div>
    </div>
</div>
<script>
document.addEventListener('DOMContentLoaded', function() {
    // Chart for Slide 1
    if (document.getElementById('efficiencyChart')) {
        const ctx1 = document.getElementById('efficiencyChart').getContext('2d');
        new Chart(ctx1, {
            type: 'bar',
            data: {
                labels: ['편집 속도', '배포 시간', '작업 효율성', '협업 용이성', '유지보수성'],
                datasets: [{
                    label: '기존 방식', data: [35, 40, 30, 25, 20], backgroundColor: '#AAAAAA',
                }, {
                    label: '라이브 HTML 편집기', data: [85, 90, 75, 80, 85], backgroundColor: '#FF6B35',
                }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                scales: { y: { beginAtZero: true, max: 100, ticks: { callback: (v) => v + '%' } }, x: { grid: { display: false } } },
                plugins: { legend: { position: 'bottom' } }
            }
        });
    }

    // Chart for Slide 2
    if (document.getElementById('satisfactionChart')) {
        const ctx2 = document.getElementById('satisfactionChart').getContext('2d');
        new Chart(ctx2, {
            type: 'radar',
            data: {
                labels: ['사용 편의성', '작업 속도', '결과물 품질', '기능 다양성', '확장성'],
                datasets: [{
                    label: '일반 HTML 편집기', data: [40, 35, 60, 50, 30], backgroundColor: 'rgba(136, 136, 136, 0.2)',
                    borderColor: '#888888', borderWidth: 2, pointBackgroundColor: '#888888'
                }, {
                    label: '라이브 HTML 편집기', data: [85, 90, 85, 80, 95], backgroundColor: 'rgba(0, 212, 255, 0.2)',
                    borderColor: '#00d4ff', borderWidth: 2, pointBackgroundColor: '#00ff88'
                }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: { color: 'rgba(255, 255, 255, 0.2)' },
                        grid: { color: 'rgba(255, 255, 255, 0.2)' },
                        pointLabels: { color: '#ffffff', font: { family: "'Noto Sans KR', sans-serif", size: 12 } },
                        ticks: { backdropColor: 'transparent', color: '#888888' }
                    }
                },
                plugins: { legend: { position: 'bottom', labels: { color: '#ffffff', font: { family: "'Noto Sans KR', sans-serif" } } } }
            }
        });
    }

    // Chart for Slide 3
    if (document.getElementById('marketGrowthChart')) {
        const ctx3 = document.getElementById('marketGrowthChart').getContext('2d');
        new Chart(ctx3, {
            type: 'line',
            data: {
                labels: ['2025', '2026', '2027', '2028', '2029', '2030'],
                datasets: [
                    { label: '전통적 도구 시장', data: [100, 105, 110, 112, 115, 117], backgroundColor: 'rgba(153, 102, 255, 0.2)', borderColor: '#9B59B6', borderWidth: 3, tension: 0.3 },
                    { label: '통합 편집기 시장', data: [40, 80, 130, 190, 260, 350], backgroundColor: 'rgba(75, 192, 192, 0.2)', borderColor: '#4CAF50', borderWidth: 3, tension: 0.3 },
                    { label: '라이브 HTML 편집기 점유율', data: [5, 15, 30, 50, 75, 110], backgroundColor: 'rgba(255, 159, 64, 0.2)', borderColor: '#FF9800', borderWidth: 3, tension: 0.3 }
                ]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom', labels: { font: { family: "'Noto Sans KR', sans-serif", size: 12 } } } },
                scales: {
                    y: { beginAtZero: true, title: { display: true, text: '시장 규모 (단위: 억원)', font: { family: "'Noto Sans KR', sans-serif" } }, ticks: { font: { family: "'Noto Sans KR', sans-serif" } } },
                    x: { ticks: { font: { family: "'Noto Sans KR', sans-serif" } } }
                }
            }
        });
    }
});
<\/script>



</body></html>
`,Zr=`<!DOCTYPE html>
<html lang="en"><head>
<meta charset="utf-8">
<meta content="width=device-width, initial-scale=1.0" name="viewport">
<title>Live HTML Editor Presentation</title>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700;900&amp;display=swap" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/chart.js"><\/script>
<style>
    /* Global Styles */
    html, body {
        overflow: hidden !important; /* Prevent internal scrollbars; scrolling is handled by the parent frame */
    }
    body {
        margin: 0;
        background-color: #e5e7eb; /* Match the editor's preview pane background */
    }
    .slide-container {
        /* width is now controlled by individual slides */
        display: flex;
        flex-direction: column;
        align-items: center; /* Center the slides horizontally */
        gap: 32px; /* Add space BETWEEN slides */
        padding: 32px 0; /* Add space at the top and bottom of the whole set */
        margin: 0 auto;
    }

    /* --- SLIDE 1 STYLES --- */
    .slide-1 {
        font-family: 'Noto Sans KR', sans-serif;
        background-color: #FFFFFF;
        color: #333333;
        width: 1280px;
        height: 720px;
        position: relative;
        display: flex;
        flex-direction: column;
        box-shadow: 0 8px 24px rgba(0,0,0,0.1);
        overflow: hidden;
    }
    .slide-1 * { margin: 0; padding: 0; box-sizing: border-box; }
    .slide-1 .header { background-color: #FF6B35; color: white; padding: 15px 30px; display: flex; justify-content: space-between; align-items: center; height: 60px; }
    .slide-1 .header-title { font-size: 25px; font-weight: 700; }
    .slide-1 .header-subtitle { font-size: 16px; font-weight: 500; }
    .slide-1 .main-content { display: flex; flex: 1; height: calc(100% - 60px); position: relative; }
    .slide-1 .left-column { width: 50%; height: 100%; padding: 30px; position: absolute; left: 0; top: 0; }
    .slide-1 .right-column { width: 50%; height: 100%; background-color: #F8F8F8; padding: 30px; position: absolute; left: 50%; top: 0; }
    .slide-1 .title { font-size: 26px; font-weight: 600; color: #333; line-height: 1.2; position: absolute; top: 40px; left: 40px; width: 90%; }
    .slide-1 .title span { color: #FF6B35; }
    .slide-1 .subtitle { font-size: 18px; color: #555; line-height: 1.5; position: absolute; top: 130px; left: 40px; width: 90%; }
    .slide-1 .problem-list { position: absolute; top: 280px; left: 40px; width: 90%; }
    .slide-1 .problem-item { display: flex; margin-bottom: 20px; align-items: center; }
    .slide-1 .problem-icon { background-color: #FF6B35; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px; flex-shrink: 0; }
    .slide-1 .problem-text { font-size: 16px; line-height: 1.5; }
    .slide-1 .problem-title { font-weight: 700; margin-bottom: 5px; color: #444; }
    .slide-1 .comparison-table { width: 90%; border-collapse: collapse; box-shadow: 0 4px 8px rgba(0,0,0,0.1); border-radius: 8px; overflow: hidden; position: absolute; top: 60px; left: 40px; }
    .slide-1 .comparison-table th { background-color: #FF6B35; color: white; text-align: left; padding: 12px 15px; font-weight: 500; }
    .slide-1 .comparison-table td { padding: 10px 15px; border-bottom: 1px solid #e0e0e0; }
    .slide-1 .comparison-table tr:last-child td { border-bottom: none; }
    .slide-1 .comparison-table tr:nth-child(even) { background-color: #f2f2f2; }
    .slide-1 .highlight { color: #FF6B35; font-weight: 700; }
    .slide-1 .chart-container { height: 200px; position: absolute; top: 380px; left: 40px; width: 90%; }
    .slide-1 .divider { height: 4px; width: 80px; background-color: #FF6B35; position: absolute; top: 100px; left: 40px; }
    
    /* --- SLIDE 2 STYLES --- */
    .slide-2 { font-family: 'Noto Sans KR', sans-serif; background-color: #121212; color: #ffffff; width: 1280px; height: 720px; position: relative; display: flex; flex-direction: column; box-shadow: 0 8px 24px rgba(0,0,0,0.1); overflow: hidden; }
    .slide-2 * { margin: 0; padding: 0; box-sizing: border-box; }
    .slide-2 .header { background-color: #000000; padding: 20px 40px; color: white; display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #00d4ff; }
    .slide-2 .header-title { font-size: 24px; font-weight: 700; color: #00d4ff; }
    .slide-2 .header-subtitle { font-size: 16px; font-weight: 400; color: #888888; }
    .slide-2 .content { display: flex; flex: 1; padding: 30px; background-color: #121212; position: relative; }
    .slide-2 .left-column { flex: 1; padding-right: 30px; position: absolute; left: 30px; top: 30px; width: 50%; height: 90%; }
    .slide-2 .right-column { flex: 1; display: flex; flex-direction: column; justify-content: space-between; position: absolute; left: 50%; top: 30px; width: 50%; padding-left: 30px; height: 90%; }
    .slide-2 .title { font-size: 26px; font-weight: 700; color: #00d4ff; line-height: 1.2; position: absolute; top: 20px; left: 0px; }
    .slide-2 .feature-section { margin-bottom: 25px; position: absolute; width: 90%; }
    .slide-2 .feature-section.fs1 { top: 100px; left: 0px; }
    .slide-2 .feature-section.fs2 { top: 320px; left: 0px; }
    .slide-2 .feature-title { font-size: 22px; font-weight: 700; color: #00ff88; margin-bottom: 15px; }
    .slide-2 .feature-item { display: flex; align-items: flex-start; margin-bottom: 15px; }
    .slide-2 .feature-icon { color: #00d4ff; margin-right: 15px; font-size: 20px; padding-top: 3px; }
    .slide-2 .feature-text { flex: 1; font-size: 16px; line-height: 1.5; }
    .slide-2 .feature-text strong { color: #00ff88; }
    .slide-2 .comparison-table { width: 90%; border-collapse: collapse; border: 1px solid #333333; position: absolute; top: 100px; left: 0; }
    .slide-2 .comparison-table th { background-color: #000000; color: #00d4ff; padding: 12px; text-align: left; font-size: 16px; font-weight: 500; border: 1px solid #333333; }
    .slide-2 .comparison-table td { padding: 10px 12px; border: 1px solid #333333; font-size: 15px; background-color: #1a1a1a; }
    .slide-2 .comparison-table tr:nth-child(even) td { background-color: #222222; }
    .slide-2 .chart-container { width: 90%; height: 250px; border-radius: 8px; padding: 15px; position: absolute; bottom: 0px; left: 0; }
    .slide-2 .section-title { font-size: 20px; font-weight: 700; color: #00d4ff; margin-bottom: 15px; text-align: center; }
    .slide-2 .highlight { color: #00ff88; }

    /* --- SLIDE 3 STYLES --- */
    .slide-3 { font-family: 'Noto Sans KR', sans-serif; background-color: #ffffff; color: #333333; width: 1280px; height: 720px; position: relative; display: flex; flex-direction: column; box-shadow: 0 8px 24px rgba(0,0,0,0.1); overflow: hidden; }
    .slide-3 * { margin: 0; padding: 0; box-sizing: border-box; }
    .slide-3 .header { background-color: #9B59B6; padding: 20px 40px; color: white; display: flex; justify-content: space-between; align-items: center; }
    .slide-3 .header-title { font-size: 24px; font-weight: 700; }
    .slide-3 .header-subtitle { font-size: 16px; font-weight: 400; }
    .slide-3 .content { display: flex; flex: 1; padding: 30px; position: relative; }
    .slide-3 .left-column { flex: 1; padding-right: 30px; position: absolute; left: 30px; top: 30px; width: 50%; height: 90%; }
    .slide-3 .right-column { flex: 1; display: flex; flex-direction: column; justify-content: space-between; position: absolute; left: 50%; top: 30px; width: 50%; padding-left: 30px; height: 90%; }
    .slide-3 .title { font-size: 26px; font-weight: 700; color: #4A90E2; line-height: 1.2; position: absolute; top: 20px; left: 0px; }
    .slide-3 .subtitle { font-size: 20px; font-weight: 600; color: #E91E63; position: absolute; top: 130px; left: 0px; }
    .slide-3 .value-items { margin-top: 20px; position: absolute; top: 200px; left: 0px; width: 90%; }
    .slide-3 .value-item { display: flex; align-items: flex-start; margin-bottom: 20px; }
    .slide-3 .value-icon { margin-right: 15px; font-size: 28px; }
    .slide-3 .value-content { flex: 1; }
    .slide-3 .value-title { font-size: 18px; font-weight: 700; margin-bottom: 5px; line-height: 1.4; }
    .slide-3 .value-description { font-size: 15px; line-height: 1.5; }
    .slide-3 .comparison-table { width: 90%; border-collapse: collapse; border: 1px solid #e0e0e0; position: absolute; top: 60px; left: 0px; }
    .slide-3 .comparison-table th { padding: 12px; text-align: left; font-size: 15px; font-weight: 500; border: 1px solid #e0e0e0; }
    .slide-3 .comparison-table td { padding: 10px 12px; border: 1px solid #e0e0e0; font-size: 14px; }
    .slide-3 .chart-container { width: 90%; height: 260px; position: absolute; bottom: 0px; left: 0px; }
    .slide-3 .section-title { font-size: 18px; font-weight: 700; margin-bottom: 12px; text-align: center; }
    .slide-3 .icon-blue { color: #4A90E2; }
    .slide-3 .icon-purple { color: #9B59B6; }
    .slide-3 .icon-pink { color: #E91E63; }
    .slide-3 .th-blue { background-color: #4A90E2; color: white; }
    .slide-3 .th-purple { background-color: #9B59B6; color: white; }
    .slide-3 .th-green { background-color: #4CAF50; color: white; }
    .slide-3 .tr-blue { background-color: #EBF5FF; }
    .slide-3 .tr-purple { background-color: #F6EFFE; }
    .slide-3 .tr-green { background-color: #EEFBEE; }
</style>
</head>
<body>
<div class="slide-container">
    <!-- SLIDE 1: What and Why -->
    <div class="slide-1">
        <div class="header">
            <div class="header-title">Live HTML Editor</div>
            <div class="header-subtitle">Breaking the Boundary Between Code and Design</div>
        </div>
        <div class="main-content">
            <div class="left-column">
                <h1 class="title">What & Why?</h1>
                <div class="divider"></div>
                <p class="subtitle">A solution that dramatically reduces the time from idea to result by combining the power of a code editor with the intuitiveness of a design tool.</p>
                <div class="problem-list">
                    <div class="problem-item">
                        <div class="problem-icon"><i class="fas fa-code-branch"></i></div>
                        <div class="problem-text">
                            <div class="problem-title">Separated Work Environments</div>
                            <div>Inefficiencies and repetitive revisions arising from developers viewing code, designers viewing mockups, and planners viewing documents.</div>
                        </div>
                    </div>
                    <div class="problem-item">
                        <div class="problem-icon"><i class="fas fa-user-slash"></i></div>
                        <div class="problem-text">
                            <div class="problem-title">High Entry Barrier</div>
                            <div>The difficulty of making even simple web content modifications without coding knowledge.</div>
                        </div>
                    </div>
                    <div class="problem-item">
                        <div class="problem-icon"><i class="fas fa-file-export"></i></div>
                        <div class="problem-text">
                            <div class="problem-title">Conversion Issues</div>
                            <div>High-accuracy conversion from HTML to PPTX allows for presentations with just a few edits.</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right-column">
                <table class="comparison-table">
                    <thead><tr><th>Comparison</th><th>Traditional Workflow</th><th>Live HTML Editor</th></tr></thead>
                    <tbody>
                        <tr><td>Production Time</td><td>Avg. 3 hours</td><td><span class="highlight">Avg. 1 hour</span></td></tr>
                        <tr><td>Team Collaboration</td><td>Separate Tools</td><td><span class="highlight">Single Platform</span></td></tr>
                        <tr><td>Ease of Modification</td><td>Developer Needed</td><td><span class="highlight">Anyone Can Do It</span></td></tr>
                        <tr><td>Export</td><td>Single Format</td><td><span class="highlight">Multiple Formats</span></td></tr>
                        <tr><td>Learning Curve</td><td>Steep</td><td><span class="highlight">Gentle</span></td></tr>
                    </tbody>
                </table>
                <div class="chart-container"><canvas id="efficiencyChart"></canvas></div>
            </div>
        </div>
    </div>

    <!-- SLIDE 2: How is it possible? -->
    <div class="slide-2">
        <div class="header">
            <div class="header-title">How It's Possible - Core Features</div>
            <div class="header-subtitle">Live HTML Editor Pitch Deck</div>
        </div>
        <div class="content">
            <div class="left-column">
                <h1 class="title">Intuitive Editing, Innovative Reusability</h1>
                <div class="feature-section fs1">
                    <h2 class="feature-title">1. Real-time Visual Editing (Beyond WYSIWYG)</h2>
                    <div class="feature-item">
                        <div class="feature-icon"><i class="fas fa-hand-pointer"></i></div>
                        <div class="feature-text"><strong>Direct Manipulation:</strong> <br>Select elements by clicking, move them by dragging, and edit text directly by double-clicking on the preview screen, just like in PowerPoint.</div>
                    </div>
                    <div class="feature-item">
                        <div class="feature-icon"><i class="fas fa-sliders-h"></i></div>
                        <div class="feature-text"><strong>Detailed Control Panel:</strong> <br>Control all design properties of a selected element like font, color, margins, and shadows like a pro, without any coding knowledge.</div>
                    </div>
                </div>
                <div class="feature-section fs2">
                    <h2 class="feature-title">2. Infinite Content Scalability (One Source, Multi-Use)</h2>
                    <div class="feature-item">
                        <div class="feature-icon"><i class="fas fa-file-pdf"></i></div>
                        <div class="feature-text"><strong>Rebirth of PDFs:</strong> <br>When you import a static PDF document, AI automatically separates the background and text, perfectly converting it into editable, dynamic HTML content.</div>
                    </div>
                    <div class="feature-item">
                        <div class="feature-icon"><i class="fas fa-file-powerpoint"></i></div>
                        <div class="feature-text"><strong>Intelligent Exporting:</strong> <br>Export your work not just as an image, but as a native PowerPoint (PPTX) file with live text and charts, ready for immediate presentation. (PDF, image, HTML are standard).</div>
                    </div>
                </div>
            </div>
            <div class="right-column">
                <div>
                    <h3 class="section-title">Feature Comparison: Standard vs <span class="highlight">Live Editor</span></h3>
                    <table class="comparison-table" style="position: absolute; top: 58px; left: 25px;">
                        <thead><tr><th>Feature</th><th>Standard HTML Editor</th><th>Live HTML Editor</th></tr></thead>
                        <tbody>
                            <tr><td><strong>Visual Editing</strong></td><td>Limited</td><td>Fully Integrated</td></tr>
                            <tr><td><strong>Code Generation</strong></td><td>Partial</td><td>Intelligent</td></tr>
                            <tr><td><strong>PDF Conversion</strong></td><td>Impossible</td><td>AI-Based</td></tr>
                            <tr><td><strong>PPTX Export</strong></td><td>Impossible</td><td>Native Support</td></tr>
                            <tr><td><strong>Non-developer Access</strong></td><td>Low</td><td>Very High</td></tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <h3 class="section-title">User Satisfaction Improvement</h3>
                    <div class="chart-container" style="position: absolute; top: 333px; left: 20px;"><canvas id="satisfactionChart"></canvas></div>
                </div>
            </div>
        </div>
    </div>

    <!-- SLIDE 3: Expected Effects & Vision -->
    <div class="slide-3">
        <div class="header">
            <div class="header-title">What It Means for Us - Expected Effects & Vision</div>
            <div class="header-subtitle">Live HTML Editor Pitch Deck</div>
        </div>
        <div class="content">
            <div class="left-column">
                <h1 class="title">Changing the Paradigm<br>of Content Creation</h1>
                <h2 class="subtitle">Customer Value</h2>
                <div class="value-items">
                    <div class="value-item">
                        <div class="value-icon icon-blue"><i class="fas fa-chart-line"></i></div>
                        <div class="value-content">
                            <div class="value-title">50% Productivity Increase</div>
                            <div class="value-description">Drastically reduces production time by integrating web page, report, and presentation creation workflows into one.</div>
                        </div>
                    </div>
                    <div class="value-item">
                        <div class="value-icon icon-purple"><i class="fas fa-users"></i></div>
                        <div class="value-content">
                            <div class="value-title">Role Expansion</div>
                            <div class="value-description">Non-developers (planners, designers, marketers) can directly create and modify high-quality digital content.</div>
                        </div>
                    </div>
                    <div class="value-item">
                        <div class="value-icon icon-pink"><i class="fas fa-coins"></i></div>
                        <div class="value-content">
                            <div class="value-title">Cost Reduction</div>
                            <div class="value-description">Rapidly produce and deploy content in-house without the need for outsourcing development or additional designer work.</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right-column">
                <div>
                    <h3 class="section-title" style="color: #4A90E2;">ROI Comparative Analysis</h3>
                    <table class="comparison-table" style="position: absolute; top: 43px; left: 35px; width: 556px; height: 231px;">
                        <thead><tr><th class="th-blue">Item</th><th class="th-purple">Traditional</th><th class="th-green">Live HTML Editor</th></tr></thead>
                        <tbody>
                            <tr class="tr-blue"><td><strong>Initial Investment</strong></td><td>Medium</td><td>Low</td></tr>
                            <tr class="tr-purple"><td><strong>Maintenance Cost</strong></td><td>High</td><td>Very Low</td></tr>
                            <tr class="tr-green"><td><strong>Training Cost</strong></td><td>High</td><td>Low</td></tr>
                            <tr class="tr-blue"><td><strong>Content Output</strong></td><td>10/month</td><td>25/month</td></tr>
                            <tr class="tr-purple"><td><strong>Payback Period</strong></td><td>12 months</td><td>4 months</td></tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <h3 class="section-title" style="color: #9B59B6;">Market Growth Forecast</h3>
                    <div class="chart-container" style="position: absolute; top: 307px; left: 35px; width: 554px; height: 223px;"><canvas id="marketGrowthChart"></canvas></div>
                </div>
            </div>
        </div>
    </div>
</div>
<script>
document.addEventListener('DOMContentLoaded', function() {
    // Chart for Slide 1
    if (document.getElementById('efficiencyChart')) {
        const ctx1 = document.getElementById('efficiencyChart').getContext('2d');
        new Chart(ctx1, {
            type: 'bar',
            data: {
                labels: ['Editing Speed', 'Deployment Time', 'Efficiency', 'Collaboration', 'Maintenance'],
                datasets: [{
                    label: 'Traditional', data: [35, 40, 30, 25, 20], backgroundColor: '#AAAAAA',
                }, {
                    label: 'Live HTML Editor', data: [85, 90, 75, 80, 85], backgroundColor: '#FF6B35',
                }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                scales: { y: { beginAtZero: true, max: 100, ticks: { callback: (v) => v + '%' } }, x: { grid: { display: false } } },
                plugins: { legend: { position: 'bottom' } }
            }
        });
    }

    // Chart for Slide 2
    if (document.getElementById('satisfactionChart')) {
        const ctx2 = document.getElementById('satisfactionChart').getContext('2d');
        new Chart(ctx2, {
            type: 'radar',
            data: {
                labels: ['Usability', 'Speed', 'Quality', 'Features', 'Scalability'],
                datasets: [{
                    label: 'Standard HTML Editor', data: [40, 35, 60, 50, 30], backgroundColor: 'rgba(136, 136, 136, 0.2)',
                    borderColor: '#888888', borderWidth: 2, pointBackgroundColor: '#888888'
                }, {
                    label: 'Live HTML Editor', data: [85, 90, 85, 80, 95], backgroundColor: 'rgba(0, 212, 255, 0.2)',
                    borderColor: '#00d4ff', borderWidth: 2, pointBackgroundColor: '#00ff88'
                }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: { color: 'rgba(255, 255, 255, 0.2)' },
                        grid: { color: 'rgba(255, 255, 255, 0.2)' },
                        pointLabels: { color: '#ffffff', font: { family: "'Noto Sans KR', sans-serif", size: 12 } },
                        ticks: { backdropColor: 'transparent', color: '#888888' }
                    }
                },
                plugins: { legend: { position: 'bottom', labels: { color: '#ffffff', font: { family: "'Noto Sans KR', sans-serif" } } } }
            }
        });
    }

    // Chart for Slide 3
    if (document.getElementById('marketGrowthChart')) {
        const ctx3 = document.getElementById('marketGrowthChart').getContext('2d');
        new Chart(ctx3, {
            type: 'line',
            data: {
                labels: ['2025', '2026', '2027', '2028', '2029', '2030'],
                datasets: [
                    { label: 'Traditional Tool Market', data: [100, 105, 110, 112, 115, 117], backgroundColor: 'rgba(153, 102, 255, 0.2)', borderColor: '#9B59B6', borderWidth: 3, tension: 0.3 },
                    { label: 'Integrated Editor Market', data: [40, 80, 130, 190, 260, 350], backgroundColor: 'rgba(75, 192, 192, 0.2)', borderColor: '#4CAF50', borderWidth: 3, tension: 0.3 },
                    { label: 'Live HTML Editor Share', data: [5, 15, 30, 50, 75, 110], backgroundColor: 'rgba(255, 159, 64, 0.2)', borderColor: '#FF9800', borderWidth: 3, tension: 0.3 }
                ]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom', labels: { font: { family: "'Noto Sans KR', sans-serif", size: 12 } } } },
                scales: {
                    y: { beginAtZero: true, title: { display: true, text: 'Market Size (in millions)', font: { family: "'Noto Sans KR', sans-serif" } }, ticks: { font: { family: "'Noto Sans KR', sans-serif" } } },
                    x: { ticks: { font: { family: "'Noto Sans KR', sans-serif" } } }
                }
            }
        });
    }
});
<\/script>



</body></html>
`,hg=c=>{const[p,u]=N.useState({past:[],present:{html:c==="ko"?Qr:Zr,css:"",js:""},future:[]});N.useEffect(()=>{u(L=>{const K=L.present.html.trim(),J=Qr.trim(),ee=Zr.trim();if(K===J&&c==="en"){const $={...L.present,html:Zr};return{...L,present:$}}if(K===ee&&c==="ko"){const $={...L.present,html:Qr};return{...L,present:$}}return L})},[c]);const{past:r,present:v,future:h}=p,b=N.useCallback((L,K=!0)=>{u(J=>{const{past:ee,present:$}=J,_={...$,...L};return _.html===$.html&&_.css===$.css&&_.js===$.js?J:K?{past:[...ee,$],present:_,future:[]}:{...J,present:_}})},[]),M=L=>b({html:L}),x=L=>b({css:L}),m=L=>b({js:L}),T=L=>{switch(L){case"html":M("<!DOCTYPE html><html><head></head><body></body></html>");break;case"css":x("");break;case"js":m("");break}},g=r.length>0,E=h.length>0,C=N.useCallback(()=>{u(L=>{if(L.past.length===0)return L;const K=L.past[L.past.length-1];return{past:L.past.slice(0,L.past.length-1),present:K,future:[L.present,...L.future]}})},[]),A=N.useCallback(()=>{u(L=>{if(L.future.length===0)return L;const K=L.future[0],J=L.future.slice(1);return{past:[...L.past,L.present],present:K,future:J}})},[]);return{history:p,setHistory:u,present:v,setHtmlCode:M,setCssCode:x,setJsCode:m,handleClearCode:T,canUndo:g,canRedo:E,handleUndo:C,handleRedo:A}},pg=({setHistory:c,present:p,selectedElements:u,setSelectedElements:r,setBodyBgColor:v,previewIframeRef:h,pageWidth:b,pageHeight:M,setPageWidth:x,setPageHeight:m,lastActiveSlideSelector:T})=>{const g=N.useCallback((V,B=!0)=>{c(f=>{const z=new DOMParser().parseFromString(f.present.html,"text/html");V(z);const U=`<!DOCTYPE html>
${z.documentElement.outerHTML}`;if(U===f.present.html)return f;const Z={...f.present,html:U};return B?{past:[...f.past,f.present],present:Z,future:[]}:{...f,present:Z}})},[c]),E=N.useCallback(()=>{if(u.length===0)return;const V=u.map(B=>B.id);g(B=>{V.forEach(f=>{const S=B.querySelector(f);if(S&&S.parentNode&&S.tagName.toLowerCase()!=="body"&&!S.classList.contains("slide-container")){const z=S.dataset.liveEditorId;if(z){const U=B.querySelector(`[data-placeholder-for="${z}"]`);U==null||U.remove()}S.parentNode.removeChild(S)}})}),r([])},[u,g,r]),C=N.useCallback((V,B)=>{V&&(g(f=>{var ze;const S=f.querySelector(V);if(!S||!S.parentNode)return;const z=S.cloneNode(!0);z.removeAttribute("id");let U=0,Z=0;if((ze=h.current)!=null&&ze.contentWindow){const pe=h.current.contentWindow;U=pe.scrollY,Z=pe.scrollX}const ne=B.top+U+20,ae=B.left+Z+20;z.style.position="absolute",z.style.top=`${ne}px`,z.style.left=`${ae}px`;const he=parseInt(z.style.zIndex||"0");z.style.zIndex=isNaN(he)?"100":String(Math.max(he,100)+1);const ue=f.querySelector(".slide-container");if(ue){const pe=ue.style.position;(!pe||pe==="static")&&(ue.style.position="relative"),ue.appendChild(z)}else f.body.appendChild(z)}),r([]))},[g,h,r]),A=N.useCallback((V,B)=>{c(f=>{const z=new DOMParser().parseFromString(f.present.html,"text/html"),U=z.createElement("div");U.innerHTML=V.trim();const Z=U.firstChild;if(!Z)return f;Z.style.position="absolute",Z.style.top="50%",Z.style.left="50%",Z.style.transform="translate(-50%, -50%)",Z.style.zIndex="100";let ne=null;if(T)try{ne=z.querySelector(T)}catch(ze){console.error("Invalid selector for last active slide:",T,ze),ne=null}if(!ne){const ze=z.querySelectorAll('.slide-item, [class*="slide-"]');ne=Array.from(ze).find(pe=>!pe.classList.contains("slide-container"))}ne||(ne=z.querySelector(".slide-container")||z.body);const ae=ne.style.position;if((!ae||ae==="static")&&(ne.style.position="relative"),ne.appendChild(Z),B){const ze=z.createElement("script");ze.textContent=B,z.body.appendChild(ze)}const he=`<!DOCTYPE html>
${z.documentElement.outerHTML}`,ue={...f.present,html:he};return ue.html===f.present.html?f:{past:[...f.past,f.present],present:ue,future:[]}})},[c,T]),L=N.useCallback((V,B)=>{V&&(g(f=>{const S=f.querySelector(V);S&&(S.innerHTML=B)}),r([]))},[g,r]),K=N.useCallback((V,B)=>{g(f=>{const S=f.querySelector(V);if(S){Object.assign(S.style,B);const z=S.dataset.liveEditorId;if(z){const U=f.querySelector(`[data-placeholder-for="${z}"]`);U&&(B.width&&(U.style.width=B.width),B.height&&(U.style.height=B.height))}}}),r(f=>f.map(S=>{if(S.id!==V)return S;const z={...S};return B.width&&(z.currentWidth=parseInt(B.width,10)),B.height&&(z.currentHeight=parseInt(B.height,10)),B.marginLeft&&(z.marginLeft=parseInt(B.marginLeft,10)),B.marginTop&&(z.marginTop=parseInt(B.marginTop,10)),z}))},[g,r]),J=N.useCallback(V=>{V.length!==0&&g(B=>{V.forEach(({selector:f,styles:S})=>{if(f)try{const z=B.querySelector(f);z&&Object.keys(S).forEach(U=>{z.style[U]=S[U]})}catch(z){console.error(`Failed to apply styles to selector: ${f}`,z)}})})},[g]),ee=N.useCallback(Wf((V,B)=>{g(f=>{V.forEach(S=>{const z=f.querySelector(S);if(z){Object.entries(B).forEach(([Z,ne])=>{z.style[Z]=ne});const U=z.dataset.liveEditorId;if(U){const Z=f.querySelector(`[data-placeholder-for="${U}"]`);Z&&(B.width&&(Z.style.width=B.width),B.height&&(Z.style.height=B.height))}}})})},300),[g]),$=N.useCallback((V,B)=>{if(u.length===0)return;const f=V==="position"&&B==="absolute",S=V==="position"&&B!=="absolute",z=V==="animDistance",U=ne=>{const ae={},ue=typeof B=="number"&&!["opacity","zIndex","lineHeight"].includes(V)?`${B}px`:String(B);return z||(ae[V]=ue),V==="zIndex"&&ne.position==="static"&&(ae.position="relative"),f&&(ae.width=`${ne.currentWidth}px`,ae.height=`${ne.currentHeight}px`,ae.top=`${ne.currentTop}px`,ae.left=`${ne.currentLeft}px`,ae.transform="none",ae.margin="0"),ae},Z=u.map(ne=>({selector:ne.id,styles:U(ne)}));r(ne=>ne.map(ae=>{const he={[V]:B};return V==="zIndex"&&ae.position==="static"&&(he.position="relative"),{...ae,...he}})),z||Z.forEach(({selector:ne,styles:ae})=>{Object.entries(ae).forEach(([he,ue])=>{var ze,pe;(pe=(ze=h.current)==null?void 0:ze.contentWindow)==null||pe.postMessage({type:"apply-style",payload:{selector:ne,property:he,value:ue}},"*")})}),g(ne=>{if(u.forEach(ae=>{var ze;const he=ne.querySelector(ae.id);if(!he)return;if(f){const pe=he.dataset.liveEditorId||`le-${Date.now()}-${Math.random().toString(36).substr(2,9)}`;if(he.dataset.liveEditorId=pe,!ne.querySelector(`[data-placeholder-for="${pe}"]`)){const Te=ne.createElement("div");Te.dataset.placeholderFor=pe,Te.setAttribute("aria-hidden","true"),Te.style.cssText=`
                            width: ${ae.currentWidth}px;
                            height: ${ae.currentHeight}px;
                            margin-top: ${ae.marginTop}px;
                            margin-right: ${ae.marginRight}px;
                            margin-bottom: ${ae.marginBottom}px;
                            margin-left: ${ae.marginLeft}px;
                            flex-shrink: 0;
                            visibility: hidden;
                            pointer-events: none;
                        `,(ze=he.parentNode)==null||ze.insertBefore(Te,he)}}if(S){const pe=he.dataset.liveEditorId;if(pe){const Te=ne.querySelector(`[data-placeholder-for="${pe}"]`);Te==null||Te.remove()}}const ue=U(ae);if(ue&&Object.assign(he.style,ue),z){const Te=typeof B=="number"?`${B}px`:String(B);he.style.setProperty("--anim-distance",Te)}}),f){const ae=ne.querySelector(".slide-container");if(ae){const he=ae.style.position;(!he||he==="static")&&(ae.style.position="relative")}}})},[u,g,h,r]),_=N.useCallback((V,B,f="px")=>{if(u.length===0)return;const z={currentFontSize:"fontSize",currentWidth:"width",currentHeight:"height"}[V]||V,U=`${B}${f}`,Z=u.map(he=>{const ue={[V]:B};return V==="borderWidth"&&B>0&&he.borderStyle==="none"&&(ue.borderStyle="solid"),{...he,...ue}});r(Z);const ne=u.map(he=>he.id);ne.forEach((he,ue)=>{const ze={[z]:U};V==="borderWidth"&&B>0&&u[ue].borderStyle==="none"&&(ze.borderStyle="solid"),Object.entries(ze).forEach(([pe,Te])=>{var ie,re;(re=(ie=h.current)==null?void 0:ie.contentWindow)==null||re.postMessage({type:"apply-style",payload:{selector:he,property:pe,value:Te}},"*")})});const ae={[z]:U};V==="borderWidth"&&B>0&&u.some(he=>he.borderStyle==="none")&&(ae.borderStyle="solid"),ee(ne,ae)},[u,r,h,ee]),oe=N.useCallback(V=>{$("textAlign",V)},[$]),G=N.useCallback(V=>{if(u.length!==1)return;const B=u.map(S=>{const z={display:"flex"};return S.flexDirection==="column"?z.justifyContent=V:z.alignItems=V,{selector:S.id,styles:z}}),f=u.map(S=>{const z={display:"flex"};return S.flexDirection==="column"?z.justifyContent=V:z.alignItems=V,{...S,...z}});r(f),g(S=>{B.forEach(({selector:z,styles:U})=>{const Z=S.querySelector(z);Z&&Object.assign(Z.style,U)})}),B.forEach(({selector:S,styles:z})=>{Object.entries(z).forEach(([U,Z])=>{var ne,ae;(ae=(ne=h.current)==null?void 0:ne.contentWindow)==null||ae.postMessage({type:"apply-style",payload:{selector:S,property:U,value:Z}},"*")})})},[u,g,h,r]),k=N.useCallback((V,B)=>{if(u.length===0)return;const f=u[0];let S;if(V==="fontWeight")S=f.fontWeight==="bold"||parseInt(f.fontWeight)>=700?"normal":"bold";else if(V==="fontStyle")S=f.fontStyle==="italic"?"normal":"italic";else{const z=f.textDecoration.split(" ").filter(Z=>Z&&Z!=="none"),U=String(B);z.includes(U)?S=z.filter(Z=>Z!==U).join(" ")||"none":S=[...z,U].join(" ")}$(V,S)},[u,$]),te=N.useCallback(V=>{$("color",V)},[$]),q=N.useCallback(V=>{var f,S;if(u.length>0)$("backgroundColor",V);else{const z=V==="transparent"?"#ffffff":V;v(z),(S=(f=h.current)==null?void 0:f.contentWindow)==null||S.postMessage({type:"apply-style",payload:{selector:"body",property:"backgroundColor",value:z}},"*"),g(U=>{const Z=U.querySelector("body");Z&&(Z.style.backgroundColor=z)})}},[u,$,v,g,h]),ce=N.useCallback((V,B)=>{if(u.length!==1)return;const f=u[0].id;if(!f)return;const S=V==="backgroundColor"?"background-color":V;c(z=>{let U=z.present.css;const Z=f.replace(/([.*+?^${}()|[\]\/\\])/g,"\\$1"),ne=new RegExp(`${Z}\\s*:\\s*hover\\s*\\{([^}]*)\\}`,"im"),ae=U.match(ne);let he;if(ae){const ze=ae[1],pe=new Map;if(ze.split(";").forEach(ie=>{if(ie.trim()){const re=ie.indexOf(":");if(re>-1){const be=ie.substring(0,re).trim(),se=ie.substring(re+1).trim();be&&pe.set(be,se)}}}),B==="transparent"||B===""?pe.delete(S):pe.set(S,`${B} !important`),Array.from(pe.keys()).filter(ie=>ie!=="transition").length===0)he=U.replace(ne,"");else{pe.has("transition")||pe.set("transition","background-color 0.3s ease, color 0.3s ease");const ie=Array.from(pe.entries()).map(([be,se])=>`  ${be}: ${se};`).join(`
`),re=`${f}:hover {
${ie}
}`;he=U.replace(ne,re)}}else if(B!=="transparent"&&B!==""){const ze=`
${f}:hover {
  ${S}: ${B} !important;
  transition: background-color 0.3s ease, color 0.3s ease;
}
`;he=U+ze}else return z;if(he.trim()===U.trim())return z;const ue={...z.present,css:he};return{past:[...z.past,z.present],present:ue,future:[]}}),r(z=>z.map(U=>U.id!==f?U:V==="color"?{...U,hoverColor:B==="transparent"?"":B}:{...U,hoverBackgroundColor:B==="transparent"?"":B}))},[u,c]),Se=N.useCallback(Wf((V,B)=>{g(f=>{const S=f.querySelector(".slide-container");S&&(S.style[V]=`${B}px`)})},300),[g]),we=N.useCallback((V,B)=>{var z,U;const f=V==="width"?B:b,S=V==="height"?B:M;V==="width"&&x(B),V==="height"&&m(B),(U=(z=h.current)==null?void 0:z.contentWindow)==null||U.postMessage({type:"page-size-update",payload:{width:f,height:S}},"*"),Se(V,B)},[b,M,x,m,h,Se]),Y=N.useCallback((V,B,f=!1)=>{if(u.length===0)return;const S=u[0].id;g(z=>{var ne;const U=z.querySelector(S);if(!U)return;const Z=U.closest("a");if(f){if(Z&&Z.parentNode){for(;Z.firstChild;)Z.parentNode.insertBefore(Z.firstChild,Z);Z.parentNode.removeChild(Z)}}else if(Z)Z.href=V,Z.target=B;else{const ae=z.createElement("a");ae.href=V,ae.target=B,(ne=U.parentNode)==null||ne.insertBefore(ae,U),ae.appendChild(U)}})},[u,g]),Q=N.useCallback(V=>{u.length!==0&&g(B=>{u.forEach(f=>{const S=B.querySelector(f.id);S&&(S.style.border="",S.style.backgroundColor="",S.style.color="",S.style.padding="",S.style.borderRadius="",Object.entries(V).forEach(([z,U])=>{S.style[z]=U}))})})},[u,g]),Me=N.useCallback(V=>{if(u.length!==1)return;const B=u[0],f=B.id,S={};if(B.position==="absolute"){switch(V){case"left":S.left="0px",S.transform="translateX(0%)";break;case"center":S.left="50%",S.transform="translateX(-50%)";break;case"right":S.left="100%",S.transform="translateX(-100%)";break}S.marginLeft="",S.marginRight=""}else{switch(V){case"left":S.marginLeft="0",S.marginRight="auto";break;case"center":S.marginLeft="auto",S.marginRight="auto";break;case"right":S.marginLeft="auto",S.marginRight="0";break}S.left="",S.transform=""}g(z=>{const U=z.querySelector(f);U&&Object.assign(U.style,S)})},[u,g]),y=N.useCallback(V=>{g(B=>{const f=B.querySelector(V);if(!f)return;f.style.display==="none"?(f.style.display="",f.style.length===0&&f.removeAttribute("style")):f.style.display="none"})},[g]),le=N.useCallback(V=>{u.length!==0&&g(B=>{u.forEach(f=>{const S=B.querySelector(f.id);if(S){const z=Array.from(S.classList).filter(U=>U.startsWith("anim-"));S.classList.remove(...z),V?(S.classList.add(V),(!S.style.animationDuration||S.style.animationDuration==="0s")&&(S.style.animationDuration="0.7s")):S.style.animationDuration=""}})})},[u,g]),de=N.useCallback((V,B,f)=>{g(S=>{const z=S.querySelector(V),U=S.querySelector(B);if(!z||!U){console.error("Drop failed: element or container not found.");return}z.style.position="",z.style.top="",z.style.left="",z.style.transform="";const Z=["width","height","color","background-color","font-size","font-family"];for(const ue of Z)if(z.style.getPropertyValue(ue))break;z.style.cssText.split(";").map(ue=>ue.trim()).filter(ue=>ue&&!ue.startsWith("position")&&!ue.startsWith("top")&&!ue.startsWith("left")&&!ue.startsWith("transform")).length===0&&z.removeAttribute("style");const ae=z.dataset.liveEditorId;if(ae){const ue=S.querySelector(`[data-placeholder-for="${ae}"]`);ue==null||ue.remove(),delete z.dataset.liveEditorId}const he=U.children[f];U.insertBefore(z,he||null)}),r([])},[g,r]);return{updateHtmlDOM:g,handleDeleteElement:E,handleDuplicateElement:C,handleInsertElement:A,handleUpdateText:L,handleStylesUpdate:K,handleMultipleStylesUpdate:J,handleNumericStyleChange:_,handleGenericStyleChange:$,handleTextAlignChange:oe,handleVerticalAlignChange:G,handleTextStyleToggle:k,handleTextColorChange:te,handleBgChange:q,handlePageSizeChange:we,handleLinkUpdate:Y,handleApplyStylePreset:Q,handleAlignmentChange:Me,handleToggleElementVisibility:y,handleApplyAnimation:le,handleElementDrop:de,handleHoverStyleChange:ce}},mg=()=>{const[c,p]=N.useState("split"),[u,r]=N.useState(!0),[v,h]=N.useState(!1),[b,M]=N.useState(100),[x,m]=N.useState(!1),[T,g]=N.useState(!1),E=N.useRef(null);return N.useEffect(()=>{const C=A=>{E.current&&!E.current.contains(A.target)&&h(!1)};return document.addEventListener("mousedown",C),()=>document.removeEventListener("mousedown",C)},[]),{view:c,setView:p,isControlsVisible:u,setIsControlsVisible:r,isPreviewSizerOpen:v,setIsPreviewSizerOpen:h,previewScale:b,setPreviewScale:M,isGlobalTextHidden:x,setIsGlobalTextHidden:m,isMultiSelectMode:T,setIsMultiSelectMode:g,previewSizerRef:E}},gg=9525,bl=c=>Math.round(c/gg);function bg(c){var p=`
`,u="  ",r="";return c.split(/(<[^>]*>)/).filter(Boolean).forEach(function(v){const h=v.trim();h&&(h.match(/^<\//)&&(p=p.slice(0,-u.length)),r+=p+h,h.match(/^<[^\/]/)&&!h.match(/\/$/)&&!h.match(/<(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)/)&&(p+=u))}),r.replace(/^\n+/,"")}class yg{constructor(p,u,r){this.themeColors={},this.chartScripts=[],this.chartCount=0,this.blobMap={},this.NS={p:"http://schemas.openxmlformats.org/presentationml/2006/main",a:"http://schemas.openxmlformats.org/drawingml/2006/main",r:"http://schemas.openxmlformats.org/officeDocument/2006/relationships",c:"http://schemas.openxmlformats.org/drawingml/2006/chart"},this.zip=p,this.updateMessage=u,this.t=r}_get(p,u,r){if(!p)return null;const v=p.getElementsByTagNameNS(r,u);return v.length>0?v[0]:null}_getAll(p,u,r){return p?Array.from(p.getElementsByTagNameNS(r,u)):[]}async getXml(p){const u=this.zip.file(p);if(!u)throw new Error(`${p} not found in zip`);const r=await u.async("string"),v=new DOMParser().parseFromString(r,"application/xml"),h=v.querySelector("parsererror");if(h)throw console.error(`Error parsing XML for ${p}:`,h.textContent),new Error(`XML parsing error in ${p}`);return v}_resolveRelPath(p){return p?p.startsWith("/")||p.startsWith("ppt/")?p.replace(/^\//,""):p.startsWith("../")?`ppt/${p.substring(3)}`:p.startsWith("slides/")?`ppt/${p}`:`ppt/slides/${p}`:""}async parseTheme(){try{const p=await this.getXml("ppt/theme/theme1.xml"),u=this._get(p.documentElement,"clrScheme",this.NS.a);if(!u)return;const r={};for(const v of Array.from(u.children)){if(v.namespaceURI!==this.NS.a)continue;const h=v.localName,b=this._get(v,"srgbClr",this.NS.a);b&&(r[h]=`#${b.getAttribute("val")}`)}this.themeColors=r}catch(p){console.warn("Could not parse theme file. Using default colors.",p)}}parseColor(p,u="transparent"){if(!p)return u;const r=this._get(p,"srgbClr",this.NS.a);if(r)return`#${r.getAttribute("val")}`;const v=this._get(p,"schemeClr",this.NS.a);if(v){const h=v.getAttribute("val"),b=this.themeColors[h];if(b)return b}return u}parseFill(p){if(!p)return"";const u=this._get(p,"solidFill",this.NS.a);return u?`background-color: ${this.parseColor(u,"transparent")};`:this._get(p,"noFill",this.NS.a)?"background-color: transparent;":""}parseTxBody(p){var v;if(!p)return"";let u="";const r=this._getAll(p,"p",this.NS.a);for(const h of r){const b=this._get(h,"pPr",this.NS.a),M=(b==null?void 0:b.getAttribute("algn"))||"left";u+=`<div style="text-align: ${M};">`;const x=this._getAll(h,"r",this.NS.a);for(const m of x){const T=this._get(m,"rPr",this.NS.a),g=((v=this._get(m,"t",this.NS.a))==null?void 0:v.textContent)||"";let E="";if(T){const C=T.getAttribute("sz");C&&(E+=`font-size: ${Math.round(parseInt(C,10)/100)+2}px;`),T.getAttribute("b")==="1"&&(E+="font-weight: bold;"),T.getAttribute("i")==="1"&&(E+="font-style: italic;");const A=this._get(T,"solidFill",this.NS.a);A&&(E+=`color: ${this.parseColor(A,"#000000")};`)}u+=`<span style="${E}">${g.replace(/ /g,"&nbsp;")}</span>`}u+="</div>"}return u}async parseShape(p,u){const r=this._get(p,"spPr",this.NS.p)||this._get(p,"picPr",this.NS.p);if(!r)return"";const v=this._get(r,"xfrm",this.NS.a);if(!v)return"";const h=this._get(v,"off",this.NS.a),b=this._get(v,"ext",this.NS.a);if(!h||!b)return"";const M=bl(parseInt(h.getAttribute("x")||"0",10)),x=bl(parseInt(h.getAttribute("y")||"0",10)),m=bl(parseInt(b.getAttribute("cx")||"0",10)),T=bl(parseInt(b.getAttribute("cy")||"0",10));let g=`position: absolute; left: ${M}px; top: ${x}px; width: ${m}px; height: ${T}px;`;g+=this.parseFill(r);const E=this._get(r,"ln",this.NS.a);if(E){const J=bl(parseInt(E.getAttribute("w")||"0",10));if(J>0){const ee=this._get(E,"solidFill",this.NS.a);g+=`border: ${J}px solid ${this.parseColor(ee,"#000000")};`}}const C=this._get(r,"prstGeom",this.NS.a);if(C){const J=C.getAttribute("prst");J==="roundRect"&&(g+="border-radius: 8px;"),J==="oval"&&(g+="border-radius: 50%;")}let A="";const L=this._get(p,"blipFill",this.NS.p);if(L){const J=this._get(L,"blip",this.NS.a),ee=J==null?void 0:J.getAttribute("r:embed");if(ee&&u){const $=u.querySelector(`Relationship[Id="${ee}"]`);if($){const _=this._resolveRelPath($.getAttribute("Target")),oe=this.zip.file(_);if(oe){const G=await this._createImageAssets(oe,_);G&&(A=`<img src="${G}" style="width: 100%; height: 100%; object-fit: cover;" />`,g+="overflow: hidden;")}}}}const K=this._get(p,"txBody",this.NS.p);if(K){const J=this._get(K,"bodyPr",this.NS.a);let ee="";if(J){const _=J.getAttribute("anchor");_==="ctr"&&(ee="display: flex; flex-direction: column; justify-content: center;"),_==="b"&&(ee="display: flex; flex-direction: column; justify-content: flex-end;")}const $=this.parseTxBody(K);A+=`<div style="height: 100%; ${ee}">${$}</div>`}return`<div style="${g}">${A}</div>`}async parseGraphicFrame(p,u){const r=this._get(p,"xfrm",this.NS.p);if(!r)return"";const v=this._get(r,"off",this.NS.a),h=this._get(r,"ext",this.NS.a),b=bl(parseInt((v==null?void 0:v.getAttribute("x"))||"0",10)),M=bl(parseInt((v==null?void 0:v.getAttribute("y"))||"0",10)),x=bl(parseInt((h==null?void 0:h.getAttribute("cx"))||"0",10)),m=bl(parseInt((h==null?void 0:h.getAttribute("cy"))||"0",10));let T=`position: absolute; left: ${b}px; top: ${M}px; width: ${x}px; height: ${m}px;`;const g=this._get(p,"graphic",this.NS.a),E=this._get(g,"graphicData",this.NS.a);if((E==null?void 0:E.getAttribute("uri"))==="http://schemas.openxmlformats.org/drawingml/2006/chart")return this._parseChart(E,T,u);const C=this._get(E,"tbl",this.NS.a);return C?this.parseTable(C,T):`<div style="${T} border: 1px dashed grey;"><p style="text-align: center; color: grey; font-size: 12px; padding-top: 45%;">지원되지 않는 차트/다이어그램 레이아웃입니다.</p></div>`}async _parseChart(p,u,r){this.chartCount++;const v=`chart-canvas-${this.chartCount}`,h=this._get(p,"chart",this.NS.c),b=h==null?void 0:h.getAttribute("r:id");if(!b||!r)return`<div style="${u}">[차트 데이터를 찾을 수 없습니다]</div>`;const M=r.querySelector(`Relationship[Id="${b}"]`);if(!M)return`<div style="${u}">[차트 관계를 찾을 수 없습니다]</div>`;const x=this._resolveRelPath(M.getAttribute("Target")),m=await this.getXml(x),T=this._get(m,"plotArea",this.NS.c);if(!T)return`<div style="${u}">[차트 영역을 찾을 수 없습니다]</div>`;const g={barChart:"bar",bar3DChart:"bar",lineChart:"line",line3DChart:"line",pieChart:"pie",pie3DChart:"pie",doughnutChart:"doughnut",areaChart:"line"};let E=null,C=null;for(const _ of Array.from(T.children))if(_.namespaceURI===this.NS.c&&g[_.localName]){E=_,C=g[_.localName];break}if(!E)return`<div style="${u} border: 1px dashed grey;"><p style="text-align: center; color: grey; font-size: 12px; padding-top: 45%;">지원되지 않는 차트 종류입니다.</p></div>`;const A={labels:[],datasets:[]},L=this._getAll(E,"ser",this.NS.c);if(L.length===0)return`<div style="${u}">[차트 시리즈 데이터 없음]</div>`;const K=this._get(L[0],"cat",this.NS.c),J=this._get(K,"strRef",this.NS.c)||this._get(K,"numRef",this.NS.c);if(J){const _=this._getAll(J,"pt",this.NS.c);A.labels=_.map(oe=>{var G;return((G=this._get(oe,"v",this.NS.c))==null?void 0:G.textContent)||""})}L.forEach(_=>{var te;const oe=((te=this._get(this._get(_,"tx",this.NS.c),"v",this.NS.c))==null?void 0:te.textContent)||"Series",G=this._get(_,"val",this.NS.c),k=this._get(G,"numRef",this.NS.c);if(k){const ce=this._getAll(k,"pt",this.NS.c).map(Q=>{var Me;return parseFloat(((Me=this._get(Q,"v",this.NS.c))==null?void 0:Me.textContent)||"0")}),Se=this._get(_,"spPr",this.NS.c),we=this._get(Se,"solidFill",this.NS.a),Y=this.parseColor(we,"#4c6ef5");A.datasets.push({label:oe,data:ce,backgroundColor:Y})}}),C==="line"&&E.localName==="areaChart"&&A.datasets.forEach(_=>{_.fill="start"});const ee={responsive:!0,maintainAspectRatio:!1},$=`new Chart(document.getElementById('${v}'), { type: '${C}', data: ${JSON.stringify(A)}, options: ${JSON.stringify(ee)} });`;return this.chartScripts.push($),`<div class="chart-container" style="${u}"><canvas id="${v}"></canvas></div>`}parseTable(p,u){let r='<table style="width: 100%; height: 100%; border-collapse: collapse;">';const v=this._getAll(p,"tr",this.NS.a);for(const h of v){r+="<tr>";const b=this._getAll(h,"tc",this.NS.a);for(const M of b){const x=this._get(M,"txBody",this.NS.a),m=this._get(M,"tcPr",this.NS.a);let T="padding: 8px; border: 1px solid #ccc;";m&&(T+=this.parseFill(m));const g=this.parseTxBody(x);r+=`<td style="${T}">${g}</td>`}r+="</tr>"}return r+="</table>",`<div style="${u}">${r}</div>`}async parseBackground(p,u){const r=this._get(p.documentElement,"cSld",this.NS.p),v=this._get(r,"bg",this.NS.p);if(!v)return"";const h=this._get(v,"bgPr",this.NS.p);if(!h)return"";const b=this._get(h,"solidFill",this.NS.a);if(b)return`background-color: ${this.parseColor(b,"transparent")};`;const M=this._get(h,"blipFill",this.NS.a);if(M){const x=this._get(M,"blip",this.NS.a),m=x==null?void 0:x.getAttribute("r:embed");if(m&&u){const T=u.querySelector(`Relationship[Id="${m}"]`);if(T){const g=this._resolveRelPath(T.getAttribute("Target")),E=this.zip.file(g);if(E){const C=await this._createImageAssets(E,g);if(C)return`background-image: url(${C}); background-size: cover;`}}}}return""}async _createImageAssets(p,u){try{const r=this.getMimeType(u),v=await p.async("blob"),h=new File([v],p.name,{type:r}),b=URL.createObjectURL(h),M=await nh(h);return this.blobMap[b]=M,b}catch(r){return console.error("Failed to process image from PPTX",r),""}}getMimeType(p){switch(p.split(".").pop().toLowerCase()){case"png":return"image/png";case"jpg":case"jpeg":return"image/jpeg";case"gif":return"image/gif";case"svg":return"image/svg+xml";default:return"application/octet-stream"}}async convert(){await this.parseTheme();const p=await this.getXml("ppt/presentation.xml"),u=this._get(p.documentElement,"sldSz",this.NS.p),r=bl(parseInt((u==null?void 0:u.getAttribute("cx"))||"12192000",10)),v=bl(parseInt((u==null?void 0:u.getAttribute("cy"))||"6858000",10)),h=this._get(p.documentElement,"sldIdLst",this.NS.p),b=this._getAll(h,"sldId",this.NS.p).map(T=>T.getAttribute("r:id")),M=await this.getXml("ppt/_rels/presentation.xml.rels");let x="";for(const[T,g]of b.entries())try{this.updateMessage(this.t("pptxConverter.slideProcess",{current:T+1,total:b.length}));const E=M.querySelector(`Relationship[Id="${g}"]`);if(!E)continue;const C=this._resolveRelPath(E.getAttribute("Target")),A=await this.getXml(C),L=`ppt/slides/_rels/${C.split("/").pop()}.rels`;let K=null;this.zip.file(L)&&(K=await this.getXml(L));const J=await this.parseBackground(A,K);let ee="";const $=this._get(A.documentElement,"spTree",this.NS.p);if($)for(const _ of Array.from($.children)){const oe=_.localName;oe==="sp"||oe==="pic"?ee+=await this.parseShape(_,K):oe==="graphicFrame"&&(ee+=await this.parseGraphicFrame(_,K))}x+=`<div class="slide-item" style="width: ${r}px; height: ${v}px; ${J}">${ee}</div>`}catch(E){console.error(`슬라이드 rId=${g} 처리 중 오류 발생:`,E),x+=`<div class="slide-item" style="width: ${r}px; height: ${v}px; background-color: #FFF0F0; border: 2px solid #D9534F;"><p style="text-align:center; padding-top: 45%; color: #D9534F; font-weight: bold;">슬라이드 ${T+1} 변환에 실패했습니다.</p></div>`}let m=`<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8" />
    <script src="https://cdn.jsdelivr.net/npm/chart.js"><\/script>
    <style>
        body { 
            margin: 0; 
        }
        .slide-container {
            /* This is now the main wrapper for all slides */
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 2rem;
            padding: 2rem 0;
        }
        .slide-item {
            /* This is for each individual slide */
            position: relative;
            overflow: hidden;
            background-color: white;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            flex-shrink: 0;
        }
    </style>
</head>
<body>
    <div class="slide-container">
        ${x}
    </div>`;if(this.chartScripts.length>0){const T=`
                <script>
                    document.addEventListener('DOMContentLoaded', function() {
                        ${this.chartScripts.join(`
`)}
                    });
                <\/script>
            `;m+=T}return m+="</body></html>",m}}async function xg(c,p,u){const r=window.JSZip;if(!r)throw new Error("JSZip 라이브러리가 로드되지 않았습니다.");const v=await r.loadAsync(c),h=new yg(v,p,u),b=await h.convert();return{html:bg(b),blobMap:h.blobMap}}const vg=({setHistory:c,setSelectedElements:p,setAdLoadingState:u,setPreviewScale:r,setBlobUrlMap:v,t:h})=>{const b=N.useRef(null),M=(C,A)=>async()=>{const K=Date.now();u({isLoading:!0,progress:0,message:h("adLoading.preparing"),operationType:"Import",fileType:A});let J=!1,ee=null,$=null,_=null,oe=0;C((te,q)=>{u(ce=>({...ce,message:te,progress:q?Math.min(90,q):ce.progress}))}).then(te=>{ee=te}).catch(te=>{_=te}).finally(()=>{J=!0,oe=Date.now(),u(te=>({...te,progress:Math.max(te.progress,90),message:h("adLoading.finalizing")}))});const k=new Promise(te=>setTimeout(te,1e4));$=window.setInterval(()=>{if(J){const te=K+1e4-oe;if(te>0){const q=Date.now()-oe,Se=90+Math.min(1,q/te)*9;u(we=>({...we,progress:Math.min(99,Se)}))}else u(q=>({...q,progress:99}))}else{const te=Date.now()-K,q=Math.min(90,te/1e4*100);u(ce=>({...ce,progress:Math.max(ce.progress,q)}))}},100);try{if(await k,await new Promise(te=>{const q=()=>{J?te():setTimeout(q,100)};q()}),$&&clearInterval($),_)throw console.error(`${A} import failed:`,_),alert(_.message),_;return u(te=>({...te,progress:100,message:h("importLoading.complete")})),setTimeout(()=>{u({isLoading:!1,progress:0,message:"",operationType:null,fileType:null})},2e3),ee}catch{return $&&clearInterval($),u({isLoading:!1,progress:0,message:"",operationType:null,fileType:null}),null}},x=async C=>{const K=await M(J=>new Promise(async(ee,$)=>{const _=window.pdfjsLib;if(!_)return $(new Error(h("errors.pdfLibrary")));J(h("loading.pdfAnalysis"));const oe=new FileReader;oe.onload=async G=>{var k;try{const te=new Uint8Array((k=G.target)==null?void 0:k.result),q=await _.getDocument({data:te}).promise,ce=96/72;let Se="";for(let Y=1;Y<=q.numPages;Y++){const Q=Y/q.numPages*90;J(h("loading.pdfPage",{current:Y,total:q.numPages}),Q);const Me=await q.getPage(Y),y=2,le=Me.getViewport({scale:y}),de=Me.getViewport({scale:1}),V=document.createElement("canvas"),B=V.getContext("2d");V.height=le.height,V.width=le.width,await Me.render({canvasContext:B,viewport:le}).promise;const f=await Me.getTextContent();B.globalCompositeOperation="destination-out",f.items.forEach(pe=>{if(!pe.str.trim())return;const Te=pe.transform,ie=Te[4]*y,re=le.height-Te[5]*y,be=pe.width*y,se=pe.height*y,je=1*y;B.fillRect(ie-je,re-se-je,be+je*2,se+je*2)}),B.globalCompositeOperation="source-over";const S=V.toDataURL("image/png"),z=f.styles;let U="";const Z=new Map,ne=2;f.items.forEach(pe=>{if(!pe.str.trim())return;const Te=Math.round(pe.transform[5]/ne)*ne;Z.has(Te)||Z.set(Te,[]),Z.get(Te).push(pe)}),Array.from(Z.values()).sort((pe,Te)=>Te[0].transform[5]-pe[0].transform[5]).forEach(pe=>{if(pe.length===0)return;pe.sort((se,je)=>se.transform[4]-je.transform[4]);const ie=pe.map(se=>se.height).reduce((se,je)=>{const Ge=Math.round(je);return se[Ge]=(se[Ge]||0)+1,se},{}),re=parseFloat(Object.keys(ie).reduce((se,je)=>ie[parseInt(se)]>ie[parseInt(je)]?se:je,"10")),be=[];if(pe.length>0){let se={...pe[0]};for(let je=1;je<pe.length;je++){const Ge=pe[je-1],Ue=pe[je],Ke=Ge.transform[4]+Ge.width,at=Ue.transform[4]-Ke,bt=Ge.fontName===Ue.fontName,Je=re*.3,Oe=re*1;if(bt&&at>-5&&at<Oe){const Ve=at>Je?" ":"";se.str+=Ve+Ue.str,se.width=Ue.transform[4]+Ue.width-se.transform[4]}else be.push(se),se={...Ue}}be.push(se)}be.forEach(se=>{const je=z[se.fontName],Ge=se.transform,Ue=Ge[4]*ce,Ke=(de.height-Ge[5]-se.height)*ce,at=se.height*ce,bt=se.width*ce,Je=`position: absolute; background-color: transparent; left: ${Ue}px; top: ${Ke}px; width: ${bt}px; font-size: ${at}px; font-family: "${(je==null?void 0:je.fontFamily)||"sans-serif"}", sans-serif; line-height: 1.0;`,Oe=se.str.replace(/ /g,"&nbsp;");U+=`<div style="${Je}">${Oe}</div>`})});const he=de.width*ce,ue=de.height*ce,ze=`
                            <div class="slide-item" style="position: relative; width: ${he}px; height: ${ue}px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); background-color: white; overflow: hidden; flex-shrink: 0;">
                                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: url(${S}); background-size: cover;"></div>
                                ${U}
                            </div>`;Se+=ze}const we=`<!DOCTYPE html><html><head><meta charset="UTF-8" /><style>body { margin: 0; }.slide-container {display: flex; flex-direction: column; align-items: center; gap: 2rem; padding: 2rem 0; margin: 0 auto; width: fit-content;}</style></head><body><div class="slide-container">${Se}</div></body></html>`;ee(we)}catch(te){const q=te instanceof Error?te.message:h("errors.unknown");$(new Error(h("errors.pdfProcess",{message:q})))}},oe.readAsArrayBuffer(C)}),"PDF")();K&&(c({past:[],present:{html:K,css:"",js:""},future:[]}),p([]),r(100))},m=async C=>{const K=await M(J=>xg(C,J,h),"PPTX")();if(K){const{html:J,blobMap:ee}=K;c({past:[],present:{html:J,css:"",js:""},future:[]}),v($=>({...$,...ee})),p([]),r(100)}},T=async C=>{const K=await M(J=>new Promise(async(ee,$)=>{J(h("loading.imageImport"),20);try{const _=new Image,oe=URL.createObjectURL(C);_.onload=async()=>{J(h("loading.imageImport"),50);const{naturalWidth:G,naturalHeight:k}=_,te=await new Promise((we,Y)=>{const Q=new FileReader;Q.onload=()=>we(Q.result),Q.onerror=Y,Q.readAsDataURL(C)}),q={[oe]:te},ce=`<img src="${oe}" alt="${C.name}" style="display: block; max-width: 100%; max-height: 100%; box-shadow: 0 10px 30px rgba(0,0,0,0.15); border-radius: 8px;" />`,Se=yn(G,k,ce);J(h("loading.imageImport"),90),ee({html:Se,blobMap:q})},_.onerror=G=>{URL.revokeObjectURL(oe),$(new Error(h("errors.imageProcessError")))},_.src=oe}catch(_){$(_)}}),"Image")();if(K){const{html:J,blobMap:ee}=K;c({past:[],present:{html:J,css:"",js:""},future:[]}),v($=>({...$,...ee})),p([]),r(100)}};return{fileInputRef:b,handleFileOpen:C=>{var L;const A=(L=C.target.files)==null?void 0:L[0];A&&(A.type.startsWith("text/html")?M(ee=>new Promise(($,_)=>{try{ee(h("loading.htmlImport"),30);const oe=new FileReader;oe.onload=G=>{var te;const k=(te=G.target)==null?void 0:te.result;typeof k=="string"?(c({past:[],present:{html:k,css:"",js:""},future:[]}),p([]),ee(h("loading.htmlImport"),90),$()):_(new Error("파일 내용을 읽을 수 없습니다."))},oe.onerror=()=>_(new Error("파일을 읽는 중 오류가 발생했습니다.")),oe.readAsText(A)}catch(oe){_(oe)}}),"PDF")():A.type==="application/pdf"?x(A):A.name.endsWith(".pptx")?m(A):A.type.startsWith("image/")?T(A):console.error("지원하지 않는 파일 형식입니다."),C.target.value="")},handleOpenClick:C=>{b.current&&(b.current.accept=C,b.current.click())}}},wg=c=>new Promise(p=>{const u=()=>{console.warn(`Direct image load failed for ${c}. Trying a CORS proxy fallback.`);const v=`https://corsproxy.io/?${encodeURIComponent(c)}`,h=new Image;h.crossOrigin="Anonymous",h.onload=()=>{const b=document.createElement("canvas");b.width=h.naturalWidth,b.height=h.naturalHeight;const M=b.getContext("2d");if(!M){console.error("Could not get canvas context for proxied image."),p("");return}M.drawImage(h,0,0);try{const x=b.toDataURL("image/png");p(x)}catch(x){console.error(`Canvas tainted for proxied URL ${v}.`,x),p("")}},h.onerror=()=>{console.error(`CORS proxy also failed for ${c}. The image will be captured from the screen, which may have lower quality.`),p("")},h.src=v},r=new Image;r.crossOrigin="Anonymous",r.onload=()=>{const v=document.createElement("canvas");v.width=r.naturalWidth,v.height=r.naturalHeight;const h=v.getContext("2d");if(!h){console.error("Could not get canvas context for image conversion."),p("");return}h.drawImage(r,0,0);try{const b=v.toDataURL("image/png");p(b)}catch(b){console.warn(`Canvas may be tainted for ${c} despite crossOrigin attribute. This usually means the server does not send correct CORS headers.`,b),u()}},r.onerror=()=>{u()},r.src=c}),Sg=async(c,p,u)=>{var m,T,g;if(!((T=(m=c.current)==null?void 0:m.contentDocument)!=null&&T.body))throw new Error("미리보기를 분석할 수 없습니다.");const r=1.13,v=96,h=c.current.contentDocument,b=c.current.contentWindow,M=h.createElement("style");M.textContent=`
    *:hover { outline: none !important; }
    .selected-element-highlight { outline: none !important; box-shadow: none !important; }
    i[class*="fa-"], svg.svg-inline--fa {
      transform: translateY(-9px);
    }
  `,h.head.appendChild(M);const x=E=>{const C=["Noto Sans KR","Nanum Gothic","Nanum Myeongjo","Gowun Dodum","Malgun Gothic"],A=E.split(",").map(K=>K.trim().replace(/['"]/g,"")),L=A.find(K=>C.some(J=>K.toLowerCase()===J.toLowerCase()));return L||A[0]||"Arial"};try{await Lo(c.current);const E=window.html2canvas,C=window.PptxGenJS;if(!E||!C)throw new Error("PPTX 생성에 필요한 라이브러리가 로드되지 않았습니다.");const A=new C;let L=[];const K=G=>{const k=Array.from(G.classList).find(te=>/^slide-\d+$/.test(te));return k?parseInt(k.split("-")[1],10):1/0},J=Array.from(h.querySelectorAll('.slide-item, div[class*="slide-"]')).filter(G=>Array.from(G.classList).some(k=>k==="slide-item"||/^slide-\d+$/.test(k)));if(J.length>0)L=J.sort((G,k)=>K(G)-K(k));else{const G=h.querySelector(".slide-container");G&&G.offsetWidth>0&&G.offsetHeight>0&&(L=[G])}if(L.length===0&&(L=Array.from(h.body.children).filter(G=>G instanceof HTMLElement&&G.tagName.toLowerCase()!=="script"&&G.tagName.toLowerCase()!=="style"&&!["mini-toolbar","resizer-handle","page-resize-handle"].includes(G.id)&&!G.querySelector("parsererror"))),L.length===0&&h.body.innerHTML.trim()!==""){const G=h.body.cloneNode(!0);G.querySelectorAll("script, style, #mini-toolbar, #resizer-handle, #page-resize-handle").forEach(k=>k.remove()),G.innerHTML.trim()!==""&&(L=[h.body])}if(L.length===0)throw new Error(u("errors.slideElementNotFound"));const ee=L.find(G=>G.offsetWidth>0&&G.offsetHeight>0),$="AISTUDIO_CUSTOM_LAYOUT";if(ee){const G=ee.offsetWidth,k=ee.offsetHeight;A.defineLayout({name:$,width:G*r/96,height:k*r/96})}else console.warn("No visible slides found, using default 1280x720 presentation size."),A.defineLayout({name:$,width:1280*r/96,height:720*r/96});A.layout=$;const _=G=>{if(!G)return!1;let k=G;for(;k&&k.nodeName.toLowerCase()!=="body";){const te=b.getComputedStyle(k);if(te.display==="none"||te.visibility==="hidden"||parseFloat(te.opacity)<.1)return!1;k=k.parentElement}return!0},oe=G=>["left","right","center","justify"].includes(G)?G:G==="start"?"left":G==="end"?"right":"left";for(let G=0;G<L.length;G++){const k=L[G],te=10+G/L.length*70;if(p(u("pptxConverter.slideProcess",{current:G+1,total:L.length}),te),k.offsetWidth<=0||k.offsetHeight<=0)continue;const q=k.getBoundingClientRect(),ce=[],Se=[],we=[],Y=[],Q=[],Me=[],y=[],le=[],de=[],V=new Set;try{const f=Array.from(k.querySelectorAll("img")).map(async ie=>{if(_(ie)){const re=ie.getBoundingClientRect();if(re.width>0&&re.height>0&&ie.src&&!ie.src.startsWith("data:image/gif")){const be=ie.src.startsWith("data:")?ie.src:await wg(ie.src);if(be){Y.push({data:be,x:`${(re.left-q.left)/q.width*100}%`,y:`${(re.top-q.top)/q.height*100}%`,w:`${re.width/q.width*100}%`,h:`${re.height/q.height*100}%`});const se=ie.style.visibility;ie.style.visibility="hidden",de.push({element:ie,visibility:se}),V.add(ie)}}}});await Promise.all(f);const S=[],z=h.createTreeWalker(k,NodeFilter.SHOW_TEXT,null);let U;for(;U=z.nextNode();){if(!((g=U.nodeValue)!=null&&g.trim()))continue;const ie=U.parentElement;if(!ie||["SCRIPT","STYLE"].includes(ie.tagName)||ie.closest("svg, table, canvas")||!_(ie))continue;const re=h.createRange();re.selectNode(U);const be=re.getBoundingClientRect();if(be.width<1||be.height<1)continue;const se=b.getComputedStyle(ie);S.push({text:U.nodeValue.trim(),rect:be,style:se,node:U})}S.forEach(ie=>{const re=h.createElement("span");re.style.visibility="hidden",ie.node.parentNode.insertBefore(re,ie.node),re.appendChild(ie.node),ce.push(re)});const Z=b.Chart;Z&&Array.from(k.querySelectorAll("canvas")).forEach(re=>{var se,je,Ge,Ue,Ke,at,bt;const be=Z.getChart(re);if(be&&_(re)){const Je=re.getBoundingClientRect(),Oe=be.config,tt={bar:A.ChartType.bar,line:A.ChartType.line,pie:A.ChartType.pie,doughnut:A.ChartType.doughnut,radar:A.ChartType.radar}[Oe.type];if(tt){const it=Oe.data.datasets.map(vt=>({name:vt.label||"Series",labels:Oe.data.labels,values:vt.data}));let ut;const fl=Oe.type;if(fl==="pie"||fl==="doughnut"){const vt=(se=Oe.data.datasets[0])==null?void 0:se.backgroundColor;Array.isArray(vt)&&(ut=vt.map(Ft=>Un(Ft)))}else ut=Oe.data.datasets.map(vt=>Un(vt.backgroundColor||"#4A90E2"));const kt={x:(Je.left-q.left)*r/v,y:(Je.top-q.top)*r/v,w:Je.width*r/v,h:Je.height*r/v,chartColors:ut,showLegend:((Ue=(Ge=(je=Oe.options)==null?void 0:je.plugins)==null?void 0:Ge.legend)==null?void 0:Ue.display)!==!1,title:(bt=(at=(Ke=Oe.options)==null?void 0:Ke.plugins)==null?void 0:at.title)==null?void 0:bt.text};Se.push({type:tt,data:it,options:kt});const hl=re.style.display;re.style.display="none",le.push({element:re,display:hl})}}});const ne=Array.from(k.querySelectorAll("table"));for(const ie of ne){if(!_(ie))continue;const re=ie.getBoundingClientRect(),be=[],se=Array.from(ie.querySelectorAll("tr"));for(const Ue of se){const Ke=[],at=Array.from(Ue.querySelectorAll("th, td"));for(const bt of at){const Je=bt,Ve=Array.from(Je.querySelectorAll('i[class*="fa-"], svg.svg-inline--fa')).map(async Le=>{if(V.has(Le)||!_(Le))return;const Ct=Le.getBoundingClientRect();if(!(Ct.width<1||Ct.height<1))try{const At=(await E(Le,{backgroundColor:null,useCORS:!0,scale:2,logging:!1,width:Ct.width,height:Ct.height+22,x:0,y:-11,scrollX:0,scrollY:0})).toDataURL("image/png");if(At){const el=Ct.height+22,Gt=Ct.top-11;y.push({data:At,x:`${(Ct.left-q.left)/q.width*100}%`,y:`${(Gt-q.top)/q.height*100}%`,w:`${Ct.width/q.width*100}%`,h:`${el/q.height*100}%`});const Vt=Le.style.visibility;Le.style.visibility="hidden",de.push({element:Le,visibility:Vt}),V.add(Le)}}catch(Rt){console.warn("테이블 셀의 아이콘을 이미지로 캡처하지 못했습니다:",Le,Rt)}});await Promise.all(Ve);const tt=Je.cloneNode(!0);tt.querySelectorAll('i[class*="fa-"], svg.svg-inline--fa').forEach(Le=>Le.remove());const it=b.getComputedStyle(Je),ut=parseFloat(it.fontSize),fl=isNaN(ut)?Math.round(12*r):Math.max(1,Math.round(ut*.75*r)+1),kt=it.backgroundColor;let hl;const vt=kt.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);!vt||vt[4]&&parseFloat(vt[4])<.1||kt==="transparent"||kt==="rgba(0, 0, 0, 0)"||(hl={color:Un(kt)});const ot=tt.innerText.trim().split(`
`).map(Le=>({text:Le||" ",options:{paraSpaceBefore:0,paraSpaceAfter:0}}));ot.length===0&&ot.push({text:" ",options:{paraSpaceBefore:0,paraSpaceAfter:0}});const Mt={margin:[4,0,4,0],align:oe(it.textAlign),valign:it.verticalAlign||"middle",bold:parseInt(it.fontWeight,10)>=600,italic:it.fontStyle==="italic",fontFace:x(it.fontFamily),fontSize:fl,color:Un(it.color),fill:hl,colspan:Je.colSpan>1?Je.colSpan:void 0,rowspan:Je.rowSpan>1?Je.rowSpan:void 0};Ke.push({text:ot,options:Mt})}be.push(Ke)}const je={x:`${(re.left-q.left)/q.width*100}%`,y:`${(re.top-q.top)/q.height*100}%`,w:`${re.width/q.width*100}%`};we.push({rows:be,options:je});const Ge=ie.style.visibility;ie.style.visibility="hidden",de.push({element:ie,visibility:Ge}),V.add(ie)}const he=Array.from(k.querySelectorAll('i[class*="fa-"], svg.svg-inline--fa')).map(async ie=>{if(V.has(ie)||!_(ie)||ie.closest("table"))return;const re=ie.getBoundingClientRect();if(!(re.width<1||re.height<1))try{const je=(await E(ie,{backgroundColor:null,useCORS:!0,scale:2,logging:!1,width:re.width,height:re.height+22,x:0,y:-11,scrollX:0,scrollY:0})).toDataURL("image/png");if(je){const Ge=re.height+22,Ue=re.top-11;y.push({data:je,x:`${(re.left-q.left)/q.width*100}%`,y:`${(Ue-q.top)/q.height*100}%`,w:`${re.width/q.width*100}%`,h:`${Ge/q.height*100}%`});const Ke=ie.style.visibility;ie.style.visibility="hidden",de.push({element:ie,visibility:Ke}),V.add(ie)}}catch(be){console.warn("Failed to capture icon as image:",ie,be)}});await Promise.all(he);const ue=Array.from(k.querySelectorAll("div, span, section, header, footer, main, article"));for(const ie of ue){if(V.has(ie)||!_(ie)||ie.closest("table, canvas, img"))continue;const re=ie,be=b.getComputedStyle(re),se=re.getBoundingClientRect();if(se.width<1||se.height<1)continue;const je=q.width*q.height;if(se.width*se.height>je*.25)continue;const Ue=be.backgroundColor&&be.backgroundColor!=="rgba(0, 0, 0, 0)"&&be.backgroundColor!=="transparent",Ke=be.borderWidth&&parseFloat(be.borderWidth)>0;if(!Ue&&!Ke)continue;const at=Ve=>{const tt=Ve.style.visibility;Ve.style.visibility="hidden",de.push({element:Ve,visibility:tt}),V.add(Ve)},bt=Array.from(re.children).some(Ve=>{const tt=Ve;return tt.style.visibility!=="hidden"&&getComputedStyle(tt).display!=="none"}),Je=Array.from(re.childNodes).some(Ve=>Ve.nodeType===3&&Ve.textContent.trim().length>0);if(!bt&&!Je){const Ve={x:`${(se.left-q.left)/q.width*100}%`,y:`${(se.top-q.top)/q.height*100}%`,w:`${se.width/q.width*100}%`,h:`${se.height/q.height*100}%`,fill:Ue?{color:Un(be.backgroundColor)}:void 0};Ke&&(Ve.line={color:Un(be.borderColor),width:Math.max(.75,parseFloat(be.borderWidth)*.75)});const tt=parseFloat(be.borderRadius);let ut=be.borderRadius==="50%"||tt>=Math.min(se.width,se.height)/2-1?A.shapes.OVAL:A.shapes.RECTANGLE;ut===A.shapes.RECTANGLE&&tt>0&&(ut=A.shapes.ROUNDED_RECTANGLE,Ve.rectRadius=Math.min(.5,tt/Math.min(se.width,se.height))),Me.push({type:ut,options:Ve}),at(re)}else try{const tt=(await E(re,{backgroundColor:null,useCORS:!0,allowTaint:!0,logging:!1,scale:2})).toDataURL("image/png");Q.push({data:tt,x:`${(se.left-q.left)/q.width*100}%`,y:`${(se.top-q.top)/q.height*100}%`,w:`${se.width/q.width*100}%`,h:`${se.height/q.height*100}%`}),at(re),re.querySelectorAll("*").forEach(it=>V.add(it))}catch(Ve){console.error("복합 도형 캡처 실패:",ie,Ve)}}const pe=(await E(k,{useCORS:!0,allowTaint:!0,logging:!1,letterRendering:!0,backgroundColor:null,scale:2,width:q.width,height:q.height,x:0,y:0,scrollX:0,scrollY:0})).toDataURL("image/jpeg",.92),Te=A.addSlide();Te.addImage({data:pe,x:0,y:0,w:"100%",h:"100%"}),Me.forEach(ie=>Te.addShape(ie.type,ie.options)),Q.forEach(ie=>Te.addImage(ie)),Y.forEach(ie=>Te.addImage(ie)),y.forEach(ie=>Te.addImage(ie)),we.forEach(ie=>Te.addTable(ie.rows,ie.options)),Se.forEach(ie=>Te.addChart(ie.type,ie.data,ie.options)),S.forEach(ie=>{const{text:re,rect:be,style:se}=ie;if(be.width<=1||be.height<=1)return;const je=parseFloat(se.fontSize);if(isNaN(je)||je<=0)return;const Ge=parseInt(se.fontWeight,10)>=600;let Ue=be.width*1.05;Ge&&(Ue*=1.4);const Ke=be.height*1.4;Te.addText(re,{x:`${(be.left-q.left)/q.width*100}%`,y:`${(be.top-q.top)/q.height*100}%`,w:`${Ue/q.width*100}%`,h:`${Ke/q.height*100}%`,fontSize:Math.max(1,Math.round(je*.75*r)),fontFace:x(se.fontFamily),color:Un(se.color),align:oe(se.textAlign),valign:"middle",bold:Ge,italic:se.fontStyle==="italic"})})}finally{ce.forEach(B=>{var f;B.firstChild&&((f=B.parentNode)==null||f.insertBefore(B.firstChild,B)),B.remove()}),le.forEach(B=>{B.element.style.display=B.display}),de.forEach(B=>{B.element.style.visibility=B.visibility})}}return A.write("blob")}finally{M.parentNode&&h.head.removeChild(M)}},Cg=async(c,p,u)=>{var h,b;if(!((b=(h=c.current)==null?void 0:h.contentDocument)!=null&&b.body))throw new Error("미리보기를 분석할 수 없습니다.");const r=c.current.contentDocument,v=r.createElement("style");v.textContent=`
      *:hover { outline: none !important; }
      .selected-element-highlight { outline: none !important; box-shadow: none !important; }
      i[class*="fa-"], svg.svg-inline--fa {
        transform: translateY(-6px);
      }
    `,r.head.appendChild(v);try{await Lo(c.current);const{jsPDF:M}=window.jspdf,x=window.html2canvas;if(!M||!x)throw new Error("PDF 생성에 필요한 라이브러리가 로드되지 않았습니다.");const m=g=>{const E=Array.from(g.classList).find(C=>/^slide-\d+$/.test(C));return E?parseInt(E.split("-")[1],10):1/0},T=Array.from(r.querySelectorAll('.slide-item, div[class*="slide-"]')).filter(g=>Array.from(g.classList).some(E=>E==="slide-item"||/^slide-\d+$/.test(E))).sort((g,E)=>m(g)-m(E));if(T.length>1){const g=T[0],E=g.offsetWidth,C=g.offsetHeight,A=new M({orientation:E>C?"l":"p",unit:"px",format:[E,C],hotfixes:["px_scaling"]});for(let L=0;L<T.length;L++){const K=T[L],J=10+L/T.length*70;p(u("pptxConverter.slideProcess",{current:L+1,total:T.length}),J);const $=(await x(K,{scale:3,useCORS:!0,allowTaint:!0,logging:!1,letterRendering:!0,width:K.offsetWidth,height:K.offsetHeight})).toDataURL("image/jpeg",.9);L>0&&A.addPage([K.offsetWidth,K.offsetHeight],K.offsetWidth>K.offsetHeight?"l":"p"),A.addImage($,"JPEG",0,0,K.offsetWidth,K.offsetHeight)}return A.output("blob")}else{p(u("adLoading.generating",{fileType:"PDF"}),30);const g=r.body,E=await x(g,{scale:3,useCORS:!0,allowTaint:!0,logging:!1,letterRendering:!0,width:g.scrollWidth,height:g.scrollHeight});p(u("adLoading.generating",{fileType:"PDF"}),70);const C=E.toDataURL("image/jpeg",.9),A=g.scrollWidth,L=g.scrollHeight,K=new M({orientation:A>L?"l":"p",unit:"px",format:[A,L],hotfixes:["px_scaling"]});return K.addImage(C,"JPEG",0,0,A,L),K.output("blob")}}finally{v.parentNode&&r.head.removeChild(v)}},Tg=()=>{try{return localStorage.getItem("editor-language")==="en"?"en":"ko"}catch{return"ko"}},jg=()=>Tg()==="en"?"EzupEditor":"이지업에디터",Mo=c=>String(c).padStart(2,"0"),Ng=()=>{const c=new Date;return`${c.getFullYear()}${Mo(c.getMonth()+1)}${Mo(c.getDate())}_${Mo(c.getHours())}${Mo(c.getMinutes())}`},Ao=c=>`${jg()}_${Ng()}.${c}`,Eg=(c,p)=>{const u=c instanceof Blob?URL.createObjectURL(c):c,r=document.createElement("a");r.href=u,r.download=p,document.body.appendChild(r),r.click(),document.body.removeChild(r),c instanceof Blob&&URL.revokeObjectURL(u)},zg=({htmlCode:c,cssCode:p,jsCode:u,previewIframeRef:r,setAdLoadingState:v,blobUrlMap:h,t:b})=>{const M=(C,A,L)=>async()=>{const J=Date.now();v({isLoading:!0,progress:0,message:b("adLoading.preparing"),operationType:"Download",fileType:A});let ee=!1,$=null,_=null,oe=null,G=0;C((q,ce)=>{v(Se=>({...Se,message:q,progress:ce?Math.min(90,ce):Se.progress}))}).then(q=>{$=q}).catch(q=>{oe=q}).finally(()=>{ee=!0,G=Date.now(),v(q=>({...q,progress:Math.max(q.progress,90),message:b("adLoading.finalizing")}))});const te=new Promise(q=>setTimeout(q,1e4));_=window.setInterval(()=>{if(ee){const q=J+1e4-G;if(q>0){const ce=Date.now()-G,we=90+Math.min(1,ce/q)*9;v(Y=>({...Y,progress:Math.min(99,we)}))}else v(ce=>({...ce,progress:99}))}else{const q=Date.now()-J,ce=Math.min(90,q/1e4*100);v(Se=>({...Se,progress:Math.max(Se.progress,ce)}))}},100);try{if(await te,await new Promise(q=>{const ce=()=>{ee?q():setTimeout(ce,100)};ce()}),_&&clearInterval(_),oe)throw console.error(`${A} generation failed:`,oe),alert(oe.message),oe;$&&Eg($,L),v(q=>({...q,progress:100,message:b("adLoading.downloadComplete")})),setTimeout(()=>{v({isLoading:!1,progress:0,message:"",operationType:null,fileType:null})},2e3)}catch{_&&clearInterval(_),v({isLoading:!1,progress:0,message:"",operationType:null,fileType:null})}},x=()=>{var $,_,oe,G,k;const A=new DOMParser().parseFromString(c,"text/html");A.querySelectorAll('img[src^="blob:"]').forEach(te=>{const q=te,ce=h[q.src];ce?q.src=ce:console.warn(`Could not find a base64 replacement for blob URL: ${q.src}`)}),A.querySelectorAll('[style*="blob:"]').forEach(te=>{const q=te;let ce=q.getAttribute("style");ce&&((ce.match(/blob:[^"';)]+/g)||[]).forEach(we=>{const Y=h[we];Y&&(ce=ce.replace(we,Y))}),q.setAttribute("style",ce))});let L=A.querySelector('meta[name="viewport"]');L||(L=document.createElement("meta"),L.setAttribute("name","viewport"),L.setAttribute("content","width=device-width, initial-scale=1.0"),A.head.prepend(L));let K=A.querySelector("meta[charset]");K||(K=document.createElement("meta"),K.setAttribute("charset","UTF-8"),A.head.prepend(K));const ee=`${p}


        /* Animation Keyframes */
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
            from { opacity: 0; transform: translateX(-20px); }
            to { opacity: 1; transform: translateX(0); }
        }
        /* Animation Classes */
        .anim-fade-in {
            animation-name: fadeIn;
            animation-fill-mode: forwards;
            animation-timing-function: ease-out;
        }
        .anim-slide-up {
            animation-name: slideUp;
            animation-fill-mode: forwards;
            animation-timing-function: ease-out;
        }
        .anim-slide-in-left {
            animation-name: slideInLeft;
            animation-fill-mode: forwards;
            animation-timing-function: ease-out;
        }
    `;if(ee.trim()){const te=document.createElement("style");te.textContent=ee,A.head.appendChild(te)}if(u.trim()){const te=document.createElement("script");te.textContent=u,A.body.appendChild(te)}return A.querySelectorAll(".selected-element-highlight").forEach(te=>te.classList.remove("selected-element-highlight")),($=A.getElementById("editor-script"))==null||$.remove(),(_=A.getElementById("editor-style"))==null||_.remove(),(oe=A.getElementById("global-text-visibility-style"))==null||oe.remove(),(G=A.getElementById("user-styles"))==null||G.remove(),(k=A.getElementById("user-script"))==null||k.remove(),`<!DOCTYPE html>
${A.documentElement.outerHTML}`},m=M(async C=>{C(b("adLoading.generating",{fileType:"HTML"}),30);const A=x(),L=new Blob([A],{type:"text/html;charset=utf-8"});return C(b("adLoading.generating",{fileType:"HTML"}),80),L},"HTML",Ao("html")),T=M(async C=>await Sg(r,(A,L)=>C(A,L),b),"PPTX",Ao("pptx")),g=M(async C=>await Cg(r,(A,L)=>C(A,L),b),"PDF",Ao("pdf")),E=M(async C=>{var K,J;if(!((J=(K=r.current)==null?void 0:K.contentDocument)!=null&&J.body))throw new Error("미리보기를 분석할 수 없습니다.");C(b("adLoading.generating",{fileType:"Image"}),20);const A=r.current.contentDocument,L=A.createElement("style");L.textContent=`
      *:hover { outline: none !important; }
      .selected-element-highlight { outline: none !important; box-shadow: none !important; }
      i[class*="fa-"], svg.svg-inline--fa {
        transform: translateY(-7px);
      }
    `;try{A.head.appendChild(L),await Lo(r.current);const ee=window.html2canvas;if(!ee)throw new Error(b("errors.imageLibrary"));C(b("adLoading.generating",{fileType:"Image"}),50);const $=r.current.contentDocument.body,_=await ee($,{useCORS:!0,allowTaint:!0,logging:!1,letterRendering:!0,width:$.scrollWidth,height:$.scrollHeight});return C(b("adLoading.generating",{fileType:"Image"}),80),_.toDataURL("image/png")}finally{L.parentNode&&A.head.removeChild(L)}},"Image",Ao("png"));return{handleDownloadHTML:m,handleDownloadPPTX:T,handleDownloadPDF:g,handleDownloadImage:E}},Pr=c=>{if(!c)return null;const p={...c};return p.backgroundColor=Do(c.backgroundColor),p.color=Do(c.color),p.borderColor=Do(c.borderColor),c.fontFamily&&(p.fontFamily=c.fontFamily.split(",")[0].replace(/['"]/g,"").trim()),p},Mg=({handleUpdateText:c,handleStylesUpdate:p,handleMultipleStylesUpdate:u,updateHtmlDOM:r,handleDuplicateElement:v,handleDeleteElement:h,handleUndo:b,handleRedo:M,setSelectedElements:x,setBodyBgColor:m,setIsControlsVisible:T,setPageWidth:g,setPageHeight:E,setScrollToLine:C,setLastActiveSlideSelector:A,handleElementDrop:L,setIsPageSizeDefined:K})=>{N.useEffect(()=>{const J=ee=>{const{type:$,payload:_}=ee.data;switch($){case"element-select":{const k=Pr(_.info);x(k?[k]:[]),_.slideSelector&&A(_.slideSelector),k!=null&&k.lineNumber?C(k.lineNumber):C(null),k&&T(!0),_.bodyBg&&m(Do(_.bodyBg));break}case"elements-multiselect":{const k=_.infos.map(Pr).filter(Boolean);x(k),k.length>0&&T(!0);break}case"element-toggle-select":{const k=Pr(_.info);if(!k)break;_.slideSelector&&A(_.slideSelector),x(te=>{const q=te.findIndex(ce=>ce.id===k.id);return q>-1?[...te.slice(0,q),...te.slice(q+1)]:[...te,k]});break}case"element-text-update":c(_.selector,_.newHtml);break;case"element-styles-update":p(_.selector,_.styles);break;case"elements-styles-update":u(_.updates);break;case"page-dimensions-init":typeof _.width=="number"&&g(_.width),typeof _.height=="number"&&E(_.height);break;case"page-resize-end":const{width:oe,height:G}=_;g(oe),E(G),r(k=>{const te=k.querySelector(".slide-container");te&&(te.style.width=`${oe}px`,te.style.height=`${G}px`)});break;case"duplicate-element":v(_.selector,_.rect);break;case"delete-element":h();break;case"element-drop":L(_.draggedSelector,_.targetContainerSelector,_.dropIndex);break;case"undo":b();break;case"redo":M();break;case"force-deselect":x([]);break;case"page-info":K(_.isSizeDefined);break;case"content-size-response":typeof _.width=="number"&&_.width>0&&g(_.width),typeof _.height=="number"&&_.height>0&&E(_.height);break}};return window.addEventListener("message",J),()=>window.removeEventListener("message",J)},[c,p,u,r,v,h,b,M,x,m,T,g,E,C,A,L,K])},Ag=`
<div id="pc-top-bar">
    <div class="pc-group">
      <span class="pc-label">뷰포트</span>
      <button id="pc-desktop-btn" title="데스크탑 (1440x900)">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
      </button>
      <button id="pc-tablet-btn" title="태블릿 (768x1024)">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
      </button>
      <button id="pc-mobile-btn" title="모바일 (375x812)">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
      </button>
    </div>
    <div class="pc-separator"></div>
    <div class="pc-group">
      <span class="pc-label">보기</span>
      <button id="pc-fullscreen-btn" title="전체 화면">
        <svg id="pc-fullscreen-enter-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>
        <svg id="pc-fullscreen-exit-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: none;"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path></svg>
      </button>
      <button id="pc-print-btn" title="인쇄 미리보기">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
      </button>
    </div>
    <div class="pc-separator" id="pc-slide-controls-separator" style="display: none;"></div>
    <div class="pc-group" id="pc-slide-nav-group" style="display: none;">
      <button id="pc-prev-slide-nav-btn" title="이전 슬라이드">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
      </button>
      <span id="pc-slide-counter"></span>
      <button id="pc-next-slide-nav-btn" title="다음 슬라이드">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </button>
    </div>
    <div class="pc-group pc-presentation-group" id="pc-presentation-group" style="display: none;">
       <button id="pc-presentation-btn" title="프레젠테이션 시작">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
        <span>발표 시작</span>
      </button>
    </div>
</div>
<div id="pc-on-screen-nav" class="pc-on-screen-nav">
  <button id="pc-prev-slide" title="이전 슬라이드 (←)">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
  </button>
  <button id="pc-exit-presentation" title="프레젠테이션 종료 (Esc)">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"></path></svg>
  </button>
  <button id="pc-next-slide" title="다음 슬라이드 (→)">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
  </button>
</div>
`,Dg=`
:root {
  --pc-bg-color: rgba(255, 255, 255, 0.9);
  --pc-text-color: #374151;
  --pc-border-color: #e5e7eb;
  --pc-shadow: 0 4px 12px rgba(0,0,0,0.1);
  --pc-accent-color: #3b82f6;
}
@supports (backdrop-filter: blur(10px)) {
  :root {
    --pc-bg-color: rgba(255, 255, 255, 0.8);
  }
}

body {
  padding-top: 60px; /* Make space for the top bar */
}
body .slide-container {
  padding-top: 0;
}

#pc-top-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: var(--pc-bg-color);
  border-bottom: 1px solid var(--pc-border-color);
  box-shadow: var(--pc-shadow);
  z-index: 9999;
  display: flex;
  align-items: center;
  padding: 0 24px;
  gap: 16px;
  backdrop-filter: blur(10px);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  color: var(--pc-text-color);
}

.pc-group {
  display: flex;
  align-items: center;
  gap: 4px;
}

.pc-group .pc-label {
  font-size: 12px;
  font-weight: 500;
  margin-right: 8px;
  color: #6b7280;
  white-space: nowrap;
}

.pc-group button {
  width: 38px;
  height: 38px;
  background-color: transparent;
  border: none;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
  color: var(--pc-text-color);
}
.pc-group button:hover {
  background-color: rgba(0,0,0,0.05);
}
.pc-group button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  background-color: transparent;
}


.pc-separator {
  width: 1px;
  height: 28px;
  background-color: var(--pc-border-color);
}

#pc-slide-counter {
  font-size: 14px;
  font-weight: 500;
  color: #4b5563;
  padding: 0 4px;
  min-width: 50px;
  text-align: center;
}

.pc-presentation-group button {
  width: auto;
  padding: 0 12px;
  gap: 6px;
  background-color: #f3f4f6;
  border: 1px solid #e5e7eb;
}
.pc-presentation-group button:hover {
  background-color: #e5e7eb;
}
.pc-presentation-group button span {
  font-size: 13px;
  font-weight: 500;
}

/* Slide-by-slide view */
body.pc-slide-view-active {
    display: flex;
    min-height: 100vh;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
body.pc-slide-view-active .slide-container {
    padding: 0 !important;
    width: auto !important; /* Allow container to shrink-wrap the slide */
}
body.pc-slide-view-active .slide-item, body.pc-slide-view-active [class*="slide-"] {
    display: none;
}
body.pc-slide-view-active .pc-active-slide {
    display: block !important;
}

/* Presentation Mode Styles */
html.pc-presentation-active, body.pc-presentation-active {
    height: 100% !important;
    width: 100% !important;
    overflow: hidden !important;
    margin: 0;
    padding: 0 !important;
    background-color: #222;
}
body.pc-presentation-active #pc-top-bar {
    display: none !important;
}
body.pc-presentation-active .slide-container {
    width: 100% !important;
    height: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
    gap: 0 !important;
    position: relative;
    display: block; /* Override flex */
}
/* Hide all slides by default, but keep them in the layout tree for size calculations */
body.pc-presentation-active .slide-container > * {
    visibility: hidden;
}
/* Show and style only the active slide */
body.pc-presentation-active .pc-active-presentation-slide {
    visibility: visible !important;
    display: block !important;
    position: absolute !important;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%) scale(var(--slide-scale, 1));
    transform-origin: center center;
    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
}

.pc-on-screen-nav {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10001;
  display: none;
  align-items: center;
  gap: 8px;
  background-color: var(--pc-bg-color);
  border: 1px solid var(--pc-border-color);
  border-radius: 24px;
  padding: 8px;
  box-shadow: var(--pc-shadow);
  backdrop-filter: blur(10px);
}
body.pc-presentation-active .pc-on-screen-nav {
  display: flex;
}
.pc-on-screen-nav button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
  color: var(--pc-text-color);
}
.pc-on-screen-nav button:hover {
  background-color: rgba(0,0,0,0.05);
}


/* Print styles */
@media print {
  body {
    padding-top: 0 !important;
    background-color: #fff !important;
  }
  #pc-top-bar, #pc-on-screen-nav {
    display: none !important;
  }
  @page {
    size: auto;
    margin: 0mm;
  }
  html, body {
      width: 100%;
      height: auto;
      overflow: visible !important;
  }
  .slide-container {
    display: block !important;
    padding: 0 !important;
    margin: 0 !important;
    width: auto !important;
    height: auto !important;
    gap: 0 !important;
  }
  .slide-item, [class*="slide-"] {
    page-break-after: always;
    page-break-inside: avoid;
    box-shadow: none !important;
    border: none !important;
    display: block !important;
    overflow: hidden !important;
    /* We don't force width/height, let the browser scale to fit the page */
  }
  .slide-item:last-child, [class*="slide-"]:last-child {
    page-break-after: avoid;
  }
}
`,Lg=`
document.addEventListener('DOMContentLoaded', () => {
    // Top Bar Controls
    const topBar = document.getElementById('pc-top-bar');
    const desktopBtn = document.getElementById('pc-desktop-btn');
    const tabletBtn = document.getElementById('pc-tablet-btn');
    const mobileBtn = document.getElementById('pc-mobile-btn');
    
    const fullscreenBtn = document.getElementById('pc-fullscreen-btn');
    const fullscreenEnterIcon = document.getElementById('pc-fullscreen-enter-icon');
    const fullscreenExitIcon = document.getElementById('pc-fullscreen-exit-icon');
    const printBtn = document.getElementById('pc-print-btn');

    // Slide Navigation (One-by-one view)
    const slideControlsSeparator = document.getElementById('pc-slide-controls-separator');
    const slideNavGroup = document.getElementById('pc-slide-nav-group');
    const prevSlideNavBtn = document.getElementById('pc-prev-slide-nav-btn');
    const nextSlideNavBtn = document.getElementById('pc-next-slide-nav-btn');
    const slideCounter = document.getElementById('pc-slide-counter');

    // Immersive Presentation Mode
    const presentationGroup = document.getElementById('pc-presentation-group');
    const presentationBtn = document.getElementById('pc-presentation-btn');
    const onScreenNav = document.getElementById('pc-on-screen-nav');
    const prevSlideBtn = document.getElementById('pc-prev-slide');
    const nextSlideBtn = document.getElementById('pc-next-slide');
    const exitPresentationBtn = document.getElementById('pc-exit-presentation');

    let isPresentationMode = false;
    let isSlideViewMode = false;
    let slides = [];
    let currentSlideIndex = 0;

    // --- FUNCTION DEFINITIONS ---

    const resizeWindow = (width, height) => window.resizeTo(width, height);
    
    const getSlides = () => {
        return Array.from(document.querySelectorAll('.slide-item, [class*="slide-"]'))
                    .filter(el => !el.classList.contains('slide-container'));
    };

    const updateSlideCounter = () => {
        if (slides.length > 0) {
            slideCounter.textContent = \`\${currentSlideIndex + 1} / \${slides.length}\`;
            prevSlideNavBtn.disabled = currentSlideIndex === 0;
            nextSlideNavBtn.disabled = currentSlideIndex === slides.length - 1;
        }
    };
    
    const changeSlide = (newIndex) => {
        if (newIndex < 0 || newIndex >= slides.length) return;

        if (!isSlideViewMode) {
            isSlideViewMode = true;
            document.body.classList.add('pc-slide-view-active');
        }

        slides.forEach((slide, idx) => {
            slide.classList.toggle('pc-active-slide', idx === newIndex);
        });

        currentSlideIndex = newIndex;
        updateSlideCounter();
    };
    
    const scrollToSlideForPresentation = (index) => {
        if (index >= 0 && index < slides.length) {
            slides.forEach((slide, idx) => {
                const isActive = idx === index;
                slide.classList.toggle('pc-active-presentation-slide', isActive);
                if (isActive) {
                    const slideWidth = slide.offsetWidth;
                    const slideHeight = slide.offsetHeight;
                    const viewportWidth = window.innerWidth;
                    const viewportHeight = window.innerHeight;
                    
                    const scaleX = viewportWidth / slideWidth;
                    const scaleY = viewportHeight / slideHeight;
                    const scale = Math.min(scaleX, scaleY) * 0.95; 

                    slide.style.setProperty('--slide-scale', scale);
                }
            });
            currentSlideIndex = index;
        }
    };
    
    const exitPresentationMode = () => {
        isPresentationMode = false;
        document.documentElement.classList.remove('pc-presentation-active');
        document.body.classList.remove('pc-presentation-active');
        slides.forEach(slide => {
            slide.classList.remove('pc-active-presentation-slide');
            slide.style.removeProperty('--slide-scale');
        });
        window.removeEventListener('keydown', handlePresentationKeys);
    };

    const handlePresentationKeys = (e) => {
        if (e.key === 'ArrowRight' || e.key === ' ') {
            e.preventDefault();
            scrollToSlideForPresentation(currentSlideIndex + 1);
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            scrollToSlideForPresentation(currentSlideIndex - 1);
        } else if (e.key === 'Escape') {
            e.preventDefault();
            exitPresentationMode();
        }
    };
    
    const enterPresentationMode = () => {
        if (slides.length < 1) return;

        if (isSlideViewMode) {
            isSlideViewMode = false;
            document.body.classList.remove('pc-slide-view-active');
            slides.forEach(s => s.classList.remove('pc-active-slide'));
        }

        isPresentationMode = true;
        document.documentElement.classList.add('pc-presentation-active');
        document.body.classList.add('pc-presentation-active');
        
        let startingSlideIndex = currentSlideIndex;
        if (!document.body.classList.contains('pc-slide-view-active')) {
            let maxVisibility = -1;
            slides.forEach((slide, index) => {
                const rect = slide.getBoundingClientRect();
                const visibleHeight = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0));
                if (visibleHeight > maxVisibility) {
                    maxVisibility = visibleHeight;
                    startingSlideIndex = index;
                }
            });
        }
        
        scrollToSlideForPresentation(startingSlideIndex);
        window.addEventListener('keydown', handlePresentationKeys);
    };

    const setupSlideControls = () => {
        slides = getSlides();
        if (slides.length > 1) {
            presentationGroup.style.display = 'flex';
            slideNavGroup.style.display = 'flex';
            slideControlsSeparator.style.display = 'block';
            updateSlideCounter();
        } else {
            presentationGroup.style.display = 'none';
            slideNavGroup.style.display = 'none';
            slideControlsSeparator.style.display = 'none';
        }
    };

    // --- EVENT LISTENERS ---
    desktopBtn.addEventListener('click', () => resizeWindow(1440, 900));
    tabletBtn.addEventListener('click', () => resizeWindow(768, 1024));
    mobileBtn.addEventListener('click', () => resizeWindow(375, 812));

    fullscreenBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => console.error('Fullscreen request failed:', err));
        } else {
            document.exitFullscreen();
        }
    });

    document.addEventListener('fullscreenchange', () => {
        const isFullscreen = !!document.fullscreenElement;
        fullscreenEnterIcon.style.display = isFullscreen ? 'none' : 'block';
        fullscreenExitIcon.style.display = isFullscreen ? 'block' : 'none';
    });

    printBtn.addEventListener('click', () => window.print());

    prevSlideNavBtn.addEventListener('click', () => changeSlide(currentSlideIndex - 1));
    nextSlideNavBtn.addEventListener('click', () => changeSlide(currentSlideIndex + 1));

    presentationBtn.addEventListener('click', enterPresentationMode);
    exitPresentationBtn.addEventListener('click', exitPresentationMode);
    prevSlideBtn.addEventListener('click', () => scrollToSlideForPresentation(currentSlideIndex - 1));
    nextSlideBtn.addEventListener('click', () => scrollToSlideForPresentation(currentSlideIndex + 1));
    
    // --- INITIAL SETUP ---
    setupSlideControls();
    
    const observer = new MutationObserver(setupSlideControls);
    observer.observe(document.body, { childList: true, subtree: true });
});
`,kg=({htmlCode:c,cssCode:p,jsCode:u,blobUrlMap:r,pageWidth:v,pageHeight:h})=>{const b=()=>{var K,J,ee,$,_;const m=new DOMParser().parseFromString(c,"text/html");m.querySelectorAll('img[src^="blob:"]').forEach(oe=>{const G=oe,k=r[G.src];k?G.src=k:console.warn(`Could not find a base64 replacement for blob URL: ${G.src}`)}),m.querySelectorAll('[style*="blob:"]').forEach(oe=>{const G=oe;let k=G.getAttribute("style");k&&((k.match(/blob:[^"';)]+/g)||[]).forEach(q=>{const ce=r[q];ce&&(k=k.replace(q,ce))}),G.setAttribute("style",k))});let T=m.querySelector('meta[name="viewport"]');T||(T=document.createElement("meta"),T.setAttribute("name","viewport"),T.setAttribute("content","width=device-width, initial-scale=1.0"),m.head.prepend(T));let g=m.querySelector("meta[charset]");g||(g=document.createElement("meta"),g.setAttribute("charset","UTF-8"),m.head.prepend(g));const C=`${p}


        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideInLeft { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
        .anim-fade-in { animation-name: fadeIn; animation-fill-mode: forwards; animation-timing-function: ease-out; }
        .anim-slide-up { animation-name: slideUp; animation-fill-mode: forwards; animation-timing-function: ease-out; }
        .anim-slide-in-left { animation-name: slideInLeft; animation-fill-mode: forwards; animation-timing-function: ease-out; }
    `;if(C.trim()){const oe=document.createElement("style");oe.textContent=C,m.head.appendChild(oe)}if(u.trim()){const oe=document.createElement("script");oe.textContent=u,m.body.appendChild(oe)}m.querySelectorAll(".selected-element-highlight").forEach(oe=>oe.classList.remove("selected-element-highlight")),(K=m.getElementById("editor-script"))==null||K.remove(),(J=m.getElementById("editor-style"))==null||J.remove(),(ee=m.getElementById("global-text-visibility-style"))==null||ee.remove(),($=m.getElementById("user-styles"))==null||$.remove(),(_=m.getElementById("user-script"))==null||_.remove();const A=m.createElement("style");A.id="preview-controls-style",A.textContent=Dg,m.head.appendChild(A),m.body.insertAdjacentHTML("beforeend",Ag);const L=m.createElement("script");return L.id="preview-controls-script",L.textContent=Lg,m.body.appendChild(L),`<!DOCTYPE html>
${m.documentElement.outerHTML}`};return{handleOpenInNewWindow:()=>{const x=b(),T=new DOMParser().parseFromString(x,"text/html"),g=T.createElement("style");g.textContent=`
      /* Enable scrolling for new tab preview */
      html, body {
        overflow: auto !important;
        height: auto !important;
      }
    `,T.head.appendChild(g);const E=`<!DOCTYPE html>
${T.documentElement.outerHTML}`,C=new Blob([E],{type:"text/html;charset=utf-8"}),A=URL.createObjectURL(C),L=v,K=h,J=(window.screen.width-L)/2,ee=(window.screen.height-K)/2,$=`width=${L},height=${K},top=${ee},left=${J},scrollbars=yes,resizable=yes`;window.open(A,"_blank",$)}}},Rg=["https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js","https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js"],Hg=["https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js","https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"],Og=["https://cdn.jsdelivr.net/npm/pptxgenjs@3.12.0/dist/pptxgen.bundle.min.js","https://cdn.jsdelivr.net/npm/pptxgenjs@3.12.0/dist/pptxgen.min.js"],Bg=["https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js","https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js"],_g=["https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js","https://cdn.jsdelivr.net/npm/pdfjs-dist@2.16.105/build/pdf.min.js"],Ug=["https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js"],eh={ko:{header:{title:"라이브 HTML 스튜디오",languageChange:"언어 변경",languageToggleTooltip:"영어/한국어 전환",manual:"설명서",layers:"레이어",extractText:"문자추출",newFile:"새 파일",import:"불러오기",importHtml:"html",importPdf:"pdf",importPptx:"pptx",importImg:"img",previewSize:"미리보기 크기 조정",previewScale:"미리보기 확대/축소",editControls:"편집",showAllText:"모든 텍스트 표시",hideAllText:"모든 텍스트 숨기기",splitView:"HTML + 미리보기",editorView:"HTML",previewView:"미리보기",newTabView:"새탭미리보기",download:"다운로드",downloadHtml:"html",downloadPdf:"pdf",downloadPptx:"pptx",downloadImage:"img",downloadPptxLoading:"PPTX 다운로드 (로딩 중...)",downloadPptxError:"PPTX 다운로드 (오류)",downloadPdfLoading:"PDF 다운로드 (로딩 중...)",downloadPdfError:"PDF 다운로드 (오류)"},controls:{history:{title:"작업 내역",undo:"실행 취소",redo:"다시 실행"},pageSize:{title:"페이지 크기",width:"W",height:"H",apply:"적용"},insert:{title:"삽입",layoutBox:"레이아웃 박스",text:"텍스트",button:"기본 버튼",loginForm:"로그인 폼",table:"표",chart:"차트",image:"이미지",video:"동영상",icon:"아이콘",shape:"도형"},interaction:{title:"인터랙션",hoverEdit:"호버 효과 편집"},alignment:{title:"정렬",left:"왼쪽 맞춤",center:"가운데 맞춤",right:"오른쪽 맞춤"},layout:{title:"레이아웃",zIndex:"Z-Index",position:"위치 기준",positions:{static:"기본",relative:"맞춤",absolute:"자유형",fixed:"고정",sticky:"스티키"}},format:{title:"서식",font:"글꼴",fontSize:"글꼴 크기",selectFontSize:"글꼴 크기 선택",color:"글자 색",bold:"굵게",italic:"기울임꼴",underline:"밑줄",strikethrough:"취소선",link:"링크 삽입/편집",alignLeft:"왼쪽 정렬",alignCenter:"가운데 정렬",alignRight:"오른쪽 정렬",alignTop:"위쪽 정렬",alignMiddle:"중간 정렬",alignBottom:"아래쪽 정렬",lineHeight:"줄 간격"},background:{title:"배경",elementBg:"요소 배경색",pageBg:"페이지 배경색"},multiSelect:{title:"다중 선택",mode:"다중 선택 모드"},spacing:{title:"간격",marginPadding:"여백 편집"},effects:{title:"크기 및 효과"},style:{title:"꾸미기",border:"테두리:",corner:"모서리:",borderColor:"테두리 색",borderStyles:{solid:"실선",dashed:"파선",dotted:"점선",double:"이중선",groove:"홈 파인",ridge:"융기",inset:"안쪽",outset:"바깥쪽",none:"없음"}},buttonStyle:{title:"버튼 스타일",presets:{basic:"기본",outline:"외곽선",text:"텍스트"}},shadow:{title:"그림자",presets:{none:"없음",sm:"작게",md:"중간",lg:"크게"}},animation:{title:"애니메이션",presets:{fadeIn:"나타나기",slideUp:"올라오기",slideInLeft:"왼쪽에서",slideDown:"위쪽에서",slideInRight:"오른쪽에서",remove:"애니메이션 제거"}},speed:{title:"속도",duration:"애니메이션 속도 (초)",slower:"더 느리게",faster:"더 빠르게"},distance:{title:"진입 거리",pixels:"픽셀",more:"더 멀리",less:"더 가깝게"}},editor:{clearCode:"전체 {{tab}} 코드 삭제",clearCodeShort:"전체코드삭제"},layers:{title:"레이어",show:"보이기",hide:"숨기기",empty:"표시할 레이어가 없습니다."},adLoading:{titleDownload:"작업 처리 중",titleImport:"파일 변환 중",preparing:"다운로드 준비 중...",generating:"{{fileType}} 파일 생성 중...",finalizing:"최종 확인 중... 잠시만 기다려 주세요.",almostDone:"거의 완료되었습니다!",downloadComplete:"변환 완료되어 다운로드완료 되었습니다.",footerDownload:"광고가 표시되는 동안 다운로드가 백그라운드에서 준비됩니다.",footerImport:"광고가 표시되는 동안 파일 변환이 백그라운드에서 준비됩니다."},importLoading:{complete:"변환이 완료 되었습니다."},loading:{pdf:"PDF 파일 변환 중...",pptx:"PPTX 파일 변환 중...",imageImport:"이미지 파일 불러오는 중...",pdfAnalysis:"PDF 파일을 분석하는 중...",pdfPage:"페이지 {{current}}/{{total}} 변환 중...",pptxAnalysis:"PPTX 파일 분석 중...",pptxGenerate:"PPTX 파일 생성 중...",pdfGenerate:"PDF 파일 생성 중...",imageGenerate:"이미지 생성 중..."},errors:{unknown:"알 수 없는 오류가 발생했습니다.",pdfLibrary:"PDF 라이브러리를 로드할 수 없습니다. 잠시 후 다시 시도해주세요.",pdfProcess:"PDF 처리 실패: {{message}}",pptxProcess:"PPTX 처리 실패: {{message}}",pptxGenerate:`PPTX 생성에 실패했습니다:
{{message}}`,pdfGenerate:`PDF 생성에 실패했습니다:
{{message}}`,imageLibrary:"Image generation library not loaded.",imageDownload:"이미지 다운로드에 실패했습니다.",imageProcessError:"이미지 파일 처리 중 오류가 발생했습니다.",slideElementNotFound:"PPTX로 변환할 슬라이드 요소를 찾을 수 없습니다. (예: <div class='slide-1'>, <div class='slide-item'>, 또는 <div class='slide-container'>)",ocrPreviewError:"미리보기 내용을 찾을 수 없어 텍스트를 추출할 수 없습니다.",ocrLibraryError:"텍스트 추출 라이브러리(Tesseract, Canvas)를 로드하지 못했습니다.",ocrProcessError:"텍스트 추출 과정에서 오류가 발생했습니다."},ocr:{title:"텍스트 추출 결과",loading:"이미지에서 텍스트를 추출하는 중입니다...",copy:"클립보드로 복사",copied:"복사됨!",noTextFound:"추출할 수 있는 텍스트를 찾지 못했습니다."},pptxConverter:{slideProcess:"슬라이드 {{current}}/{{total}} 변환 중..."},manual:{title:"라이브 HTML 편집기 사용 설명서",intro:"소개",layout:"화면 구성",gettingStarted:"시작하기",coreFeatures:"핵심 편집 기능",controlsGuide:"컨트롤 패널 상세 가이드",advanced:"고급 기능",shortcuts:"단축키"},newFilePopover:{title:"템플릿으로 시작하기",customSize:"사용자 지정 크기",create:"생성"},templates:{blankCanvas:{name:"빈 캔버스",description:"1280x720px",content:'<h1 style="font-family: sans-serif; color: #333;">여기에 콘텐츠를 추가하세요</h1>'},presentation:{name:"프레젠테이션 (16:9)",description:"1280x720px",content:'<div style="width: 90%; text-align: center;"><h1 style="font-family: sans-serif; font-size: 48px; color: #333;">제목 슬라이드</h1><p style="font-family: sans-serif; font-size: 24px; color: #666;">부제목을 입력하세요</p></div>'},a4:{name:"A4 문서 (세로)",description:"794x1123px",content:'<div style="width: 90%; padding: 40px; box-sizing: border-box; text-align: left; font-family: serif;"><h1 style="font-size: 28px;">문서 제목</h1><p style="line-height: 1.6;">문서 내용을 여기에 작성하세요.</p></div>'},mobile:{name:"모바일 화면 (세로)",description:"375x667px",content:'<div style="width: 100%; height: 100%; display: flex; flex-direction: column; font-family: sans-serif; background: #f8f9fa;"><div style="padding: 16px; background: white; box-shadow: 0 2px 4px rgba(0,0,0,0.1); text-align: center; font-weight: 500;">헤더</div><div style="flex-grow: 1; padding: 16px;">콘텐츠 영역</div></div>'},social:{name:"소셜 미디어 (1:1)",description:"1080x1080px",content:'<div style="text-align: center;"><h2 style="font-family: sans-serif; font-size: 80px; color: #333;">주목받는 콘텐츠</h2><p style="font-family: sans-serif; font-size: 32px; color: #666;">#해시태그 #라이브에디터</p></div>'},banner:{name:"웹 배너 (가로)",description:"728x90px",content:'<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: space-around; font-family: sans-serif; background: #e9ecef;"><strong style="font-size: 20px;">놀라운 제품!</strong><button style="padding: 8px 16px; font-size: 14px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">더 알아보기</button></div>'},custom:{name:"사용자 지정",description:"{{width}}x{{height}}px",content:'<h1 style="font-family: sans-serif; color: #333;">사용자 지정 캔버스</h1>'}},colorPicker:{custom:"사용자 지정..."},interactionPopover:{title:"호버 (Hover) 스타일",hoverTextColor:"Hover 글자 색",hoverBgColor:"Hover 배경 색"},linkPopover:{title:"링크 편집",urlLabel:"URL",targetLabel:"열기 방식",currentTab:"현재 탭",newTab:"새 탭",parentFrame:"부모 프레임",topFrame:"최상위 프레임",remove:"링크 제거",apply:"적용"},effectsPopover:{size:"크기",width:"너비",height:"높이",effects:"효과",opacity:"투명도",reset:"효과 초기화"},iconPopover:{search:"아이콘 검색..."},imagePopover:{title:"이미지 URL로 삽입",insert:"삽입",or:"또는",upload:"로컬 파일에서 업로드"},videoPopover:{title:"동영상 URL로 삽입",placeholder:"Youtube, Vimeo, .mp4 URL",insert:"삽입",or:"또는",upload:"로컬 파일에서 업로드"},tablePopover:{title:"표 크기 설정",rows:"행 (Rows)",cols:"열 (Columns)",insert:"삽입"},shapePopover:{title:"도형 삽입",rectangle:"사각형",circle:"원",oval:"타원",triangle:"삼각형",line:"선"},layoutPresetPopover:{title:"레이아웃 프리셋",singleBox:"단일 박스",twoCol:"2단 (50/50)",threeCol:"3단",contentSidebar:"콘텐츠+사이드바",headerFooter:"헤더/푸터",imageText:"이미지+텍스트",custom:"사용자 지정",rows:"행",cols:"열",gap:"간격",create:"생성"},chartPopover:{title:"차트 삽입",bar:"막대",line:"선",pie:"파이",doughnut:"도넛",chartTitle:"차트 제목",chartTitlePlaceholder:"예: 월별 매출",dataLabels:"데이터 라벨 (쉼표로 구분)",dataLabelsPlaceholder:"예: 1월, 2월, 3월",datasets:"데이터 계열",seriesName:"계열 {{index}} 이름",dataValues:"데이터 값",addSeries:"+ 데이터 계열 추가",removeSeries:"계열 삭제",colorTheme:"색상 테마",customColors:"사용자 지정 색상",insert:"삽입",themes:{vivid:"선명하게",pastel:"파스텔",office:"오피스",black:"블랙",primary:"원색",simple:"심플",custom:"사용자 지정"},colorN:"색상 {{index}}"},lineHeightPopover:{title:"줄 간격",default:"기본값으로"}},en:{header:{title:"Live HTML Studio",languageChange:"Language",languageToggleTooltip:"Switch to English/Korean",manual:"Manual",layers:"Layers",extractText:"OCR",newFile:"New File",import:"Import",importHtml:"html",importPdf:"pdf",importPptx:"pptx",importImg:"img",previewSize:"Adjust Preview Size",previewScale:"Preview Zoom",editControls:"Edit",showAllText:"Show All Text",hideAllText:"Hide All Text",splitView:"HTML + Preview",editorView:"HTML",previewView:"Preview",newTabView:"Preview in New Tab",download:"Download",downloadHtml:"html",downloadPdf:"pdf",downloadPptx:"pptx",downloadImage:"img",downloadPptxLoading:"Download PPTX (Loading...)",downloadPptxError:"Download PPTX (Error)",downloadPdfLoading:"Download PDF (Loading...)",downloadPdfError:"Download PDF (Error)"},controls:{history:{title:"History",undo:"Undo",redo:"Redo"},pageSize:{title:"Page Size",width:"W",height:"H",apply:"Apply"},insert:{title:"Insert",layoutBox:"Layout Box",text:"Text",button:"Button",loginForm:"Login Form",table:"Table",chart:"Chart",image:"Image",video:"Video",icon:"Icon",shape:"Shape"},interaction:{title:"Interaction",hoverEdit:"Edit Hover Effects"},alignment:{title:"Alignment",left:"Align Left",center:"Align Center",right:"Align Right"},layout:{title:"Layout",zIndex:"Z-Index",position:"Position",positions:{static:"Static",relative:"Relative",absolute:"Absolute",fixed:"Fixed",sticky:"Sticky"}},format:{title:"Format",font:"Font",fontSize:"Font Size",selectFontSize:"Select Font Size",color:"Text Color",bold:"Bold",italic:"Italic",underline:"Underline",strikethrough:"Strikethrough",link:"Insert/Edit Link",alignLeft:"Align Left",alignCenter:"Align Center",alignRight:"Align Right",alignTop:"Align Top",alignMiddle:"Align Middle",alignBottom:"Align Bottom",lineHeight:"Line Height"},background:{title:"Background",elementBg:"Element Background",pageBg:"Page Background"},multiSelect:{title:"Multi-Select",mode:"Multi-Select Mode"},spacing:{title:"Spacing",marginPadding:"Edit Spacing"},effects:{title:"Size & Effects"},style:{title:"Style",border:"Border:",corner:"Corner:",borderColor:"Border Color",borderStyles:{solid:"Solid",dashed:"Dashed",dotted:"Dotted",double:"Double",groove:"Groove",ridge:"Ridge",inset:"Inset",outset:"Outset",none:"None"}},buttonStyle:{title:"Button Style",presets:{basic:"Basic",outline:"Outline",text:"Text"}},shadow:{title:"Shadow",presets:{none:"None",sm:"Small",md:"Medium",lg:"Large"}},animation:{title:"Animation",presets:{fadeIn:"Fade In",slideUp:"Slide Up",slideInLeft:"Slide In Left",slideDown:"Slide Down",slideInRight:"Slide In Right",remove:"Remove Animation"}},speed:{title:"Speed",duration:"Animation Duration (s)",slower:"Slower",faster:"Faster"},distance:{title:"Entry Distance",pixels:"pixels",more:"More",less:"Less"}},editor:{clearCode:"Clear all {{tab}} code",clearCodeShort:"Clear All"},layers:{title:"Layers",show:"Show",hide:"Hide",empty:"No layers to display."},adLoading:{titleDownload:"Processing Task",titleImport:"Converting File",preparing:"Preparing download...",generating:"Generating {{fileType}} file...",finalizing:"Finalizing... please wait.",almostDone:"Almost done!",downloadComplete:"Conversion and download complete.",footerDownload:"Download is being prepared in the background while the ad is displayed.",footerImport:"File conversion is being prepared in the background while the ad is displayed."},importLoading:{complete:"Conversion is complete."},loading:{pdf:"Converting PDF file...",pptx:"Converting PPTX file...",imageImport:"Importing image file...",pdfAnalysis:"Analyzing PDF file...",pdfPage:"Converting page {{current}}/{{total}}...",pptxAnalysis:"Analyzing PPTX file...",pptxGenerate:"Generating PPTX file...",pdfGenerate:"Generating PDF file...",imageGenerate:"Generating image..."},errors:{unknown:"An unknown error occurred.",pdfLibrary:"Could not load the PDF library. Please try again later.",pdfProcess:"PDF processing failed: {{message}}",pptxProcess:"PPTX processing failed: {{message}}",pptxGenerate:`Failed to generate PPTX:
{{message}}`,pdfGenerate:`Failed to generate PDF:
{{message}}`,imageLibrary:"Image generation library not loaded.",imageDownload:"Failed to download image.",imageProcessError:"An error occurred while processing the image file.",slideElementNotFound:"Could not find slide elements to convert to PPTX. (e.g., <div class='slide-1'>, <div class='slide-item'>, or <div class='slide-container'>)",ocrPreviewError:"Cannot extract text because the preview content could not be found.",ocrLibraryError:"Failed to load text extraction libraries (Tesseract, Canvas).",ocrProcessError:"An error occurred during the text extraction process."},ocr:{title:"Text Extraction Result",loading:"Extracting text from image...",copy:"Copy to Clipboard",copied:"Copied!",noTextFound:"Could not find any text to extract."},pptxConverter:{slideProcess:"Converting slide {{current}}/{{total}}..."},manual:{title:"Live HTML Editor Manual",intro:"Introduction",layout:"Screen Layout",gettingStarted:"Getting Started",coreFeatures:"Core Editing Features",controlsGuide:"Controls Panel Guide",advanced:"Advanced Features",shortcuts:"Keyboard Shortcuts"},newFilePopover:{title:"Start with a Template",customSize:"Custom Size",create:"Create"},templates:{blankCanvas:{name:"Blank Canvas",description:"1280x720px",content:'<h1 style="font-family: sans-serif; color: #333;">Add your content here</h1>'},presentation:{name:"Presentation (16:9)",description:"1280x720px",content:'<div style="width: 90%; text-align: center;"><h1 style="font-family: sans-serif; font-size: 48px; color: #333;">Title Slide</h1><p style="font-family: sans-serif; font-size: 24px; color: #666;">Enter your subtitle</p></div>'},a4:{name:"A4 Document (Portrait)",description:"794x1123px",content:'<div style="width: 90%; padding: 40px; box-sizing: border-box; text-align: left; font-family: serif;"><h1 style="font-size: 28px;">Document Title</h1><p style="line-height: 1.6;">Start writing your document here.</p></div>'},mobile:{name:"Mobile Screen (Portrait)",description:"375x667px",content:'<div style="width: 100%; height: 100%; display: flex; flex-direction: column; font-family: sans-serif; background: #f8f9fa;"><div style="padding: 16px; background: white; box-shadow: 0 2px 4px rgba(0,0,0,0.1); text-align: center; font-weight: 500;">Header</div><div style="flex-grow: 1; padding: 16px;">Content Area</div></div>'},social:{name:"Social Media (1:1)",description:"1080x1080px",content:'<div style="text-align: center;"><h2 style="font-family: sans-serif; font-size: 80px; color: #333;">Engaging Content</h2><p style="font-family: sans-serif; font-size: 32px; color: #666;">#hashtag #liveeditor</p></div>'},banner:{name:"Web Banner (Landscape)",description:"728x90px",content:'<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: space-around; font-family: sans-serif; background: #e9ecef;"><strong style="font-size: 20px;">Amazing Product!</strong><button style="padding: 8px 16px; font-size: 14px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">Learn More</button></div>'},custom:{name:"Custom Size",description:"{{width}}x{{height}}px",content:'<h1 style="font-family: sans-serif; color: #333;">Custom Canvas</h1>'}},colorPicker:{custom:"Custom..."},interactionPopover:{title:"Hover Styles",hoverTextColor:"Hover Text Color",hoverBgColor:"Hover Background Color"},linkPopover:{title:"Edit Link",urlLabel:"URL",targetLabel:"Target",currentTab:"Current Tab",newTab:"New Tab",parentFrame:"Parent Frame",topFrame:"Top Frame",remove:"Remove Link",apply:"Apply"},effectsPopover:{size:"Size",width:"Width",height:"Height",effects:"Effects",opacity:"Opacity",reset:"Reset Effects"},iconPopover:{search:"Search icons..."},imagePopover:{title:"Insert Image by URL",insert:"Insert",or:"or",upload:"Upload from local file"},videoPopover:{title:"Insert Video by URL",placeholder:"Youtube, Vimeo, .mp4 URL",insert:"Insert",or:"or",upload:"Upload from local file"},tablePopover:{title:"Set Table Size",rows:"Rows",cols:"Columns",insert:"Insert"},shapePopover:{title:"Insert Shape",rectangle:"Rectangle",circle:"Circle",oval:"Oval",triangle:"Triangle",line:"Line"},layoutPresetPopover:{title:"Layout Presets",singleBox:"Single Box",twoCol:"2-Col (50/50)",threeCol:"3-Col",contentSidebar:"Content+Sidebar",headerFooter:"Header/Footer",imageText:"Image+Text",custom:"Custom Grid",rows:"Rows",cols:"Cols",gap:"Gap",create:"Create"},chartPopover:{title:"Insert Chart",bar:"Bar",line:"Line",pie:"Pie",doughnut:"Doughnut",chartTitle:"Chart Title",chartTitlePlaceholder:"e.g., Monthly Sales",dataLabels:"Data Labels (comma-separated)",dataLabelsPlaceholder:"e.g., Jan, Feb, Mar",datasets:"Data Series",seriesName:"Series {{index}} Name",dataValues:"Data Values",addSeries:"+ Add Data Series",removeSeries:"Remove Series",colorTheme:"Color Theme",customColors:"Custom Colors",insert:"Insert",themes:{vivid:"Vivid",pastel:"Pastel",office:"Office",black:"Black",primary:"Primary",simple:"Simple",custom:"Custom"},colorN:"Color {{index}}"},lineHeightPopover:{title:"Line Height",default:"Reset to Default"}}},th=(c,p)=>p.split(".").reduce((u,r)=>u&&u[r],c),qg=()=>{const[c,p]=N.useState(()=>{const r=localStorage.getItem("editor-language");return r==="en"||r==="ko"?r:"ko"});N.useEffect(()=>{localStorage.setItem("editor-language",c)},[c]);const u=N.useCallback((r,v)=>{const h=eh[c],b=eh.en;let M=th(h,r);return M||(M=th(b,r)),M?(v&&Object.keys(v).forEach(x=>{const m=new RegExp(`{{${x}}}`,"g");M=M.replace(m,String(v[x]))}),M):(console.warn(`Translation not found for key: ${r}`),r)},[c]);return{language:c,setLanguage:p,t:u}},Yg=({progress:c})=>{const p=Math.min(100,Math.max(0,c));return o.jsx("div",{className:"w-full bg-gray-200 rounded-full h-2.5",children:o.jsx("div",{className:"bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out",style:{width:`${p}%`}})})},Xg=({isLoading:c,progress:p,message:u,onClose:r,operationType:v,t:h})=>{const[b]=N.useState({w:300,h:250});N.useEffect(()=>{if(!c)return;const ee="https://t1.daumcdn.net/kas/static/ba.min.js";if(!document.querySelector(`script[src="${ee}"]`)){const _=document.createElement("script");_.async=!0,_.src=ee,document.body.appendChild(_)}},[c]);const[M,x]=N.useState(0);N.useEffect(()=>{c&&x(ee=>ee+1)},[c]);const m=N.useMemo(()=>`${M}-${b.w}x${b.h}`,[M,b]),T=N.useRef(null);if(N.useEffect(()=>{var G;const ee=()=>{try{return window.kakaoadfit=window.kakaoadfit||{},window.kakaoadfit.cmd=window.kakaoadfit.cmd||[],window.kakaoadfit.cmd}catch{return[]}},$=()=>{try{if(T.current)for(;T.current.firstChild;)T.current.removeChild(T.current.firstChild)}catch{}};if(!c){$();return}$();try{const k=document.createElement("ins");k.className="kakao_ad_area",k.style.display="block",k.style.width=`${b.w}px`,k.style.height=`${b.h}px`,k.setAttribute("data-ad-unit","DAN-vp72ZOLWoPvVx4NP"),k.setAttribute("data-ad-width",String(b.w)),k.setAttribute("data-ad-height",String(b.h)),(G=T.current)==null||G.appendChild(k)}catch{}const _=ee(),oe=setTimeout(()=>{try{console.info("[AdFit] display request",{adSize:b}),_.push(function(){try{const k=window.kakaoadfit||window.adfit;k&&k.display&&k.display()}catch(k){console.warn("[AdFit] display error",k)}})}catch{}},0);return()=>clearTimeout(oe)},[c,b,M]),!c)return null;const g=32,E=24,C=Math.max(420,b.w+g*2),A=140,L=b.h+8,J=A+L+18+E*2;return o.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 backdrop-blur-sm",children:o.jsxs("div",{className:"bg-white rounded-lg p-6 flex flex-col items-center shadow-2xl text-center justify-between",style:{width:`${C}px`,height:`${J}px`},children:[o.jsxs("div",{children:[o.jsx("h3",{className:"text-xl font-semibold text-gray-800 mb-2",children:h(v==="Import"?"adLoading.titleImport":"adLoading.titleDownload")}),o.jsx("p",{className:"text-md font-medium text-gray-600 mb-4 min-h-[24px]",children:u}),o.jsxs("div",{className:"w-full flex items-center gap-2",children:[o.jsx("div",{className:"flex-grow",children:o.jsx(Yg,{progress:p})}),o.jsx("span",{className:"text-sm font-semibold text-gray-700 w-10 text-right",children:`${Math.round(p)}%`})]})]}),o.jsx("div",{className:"w-full rounded-md flex items-center justify-center overflow-hidden",style:{height:b.h+8},children:o.jsx("div",{ref:T,style:{width:b.w,height:b.h}})},m),p<100&&o.jsx("p",{className:"text-xs text-gray-400",children:h(v==="Import"?"adLoading.footerImport":"adLoading.footerDownload")})]})})},Fg=()=>{const[c,p]=N.useState({}),[u,r]=N.useState([]),[v,h]=N.useState("loading"),[b,M]=N.useState("#f9f9f9"),[x,m]=N.useState(1280),[T,g]=N.useState(720),[E,C]=N.useState(!1),[A,L]=N.useState(!1),[K,J]=N.useState(null),[ee,$]=N.useState(null),[_,oe]=N.useState(!0),[G,k]=N.useState(!1),[te,q]=N.useState(""),[ce,Se]=N.useState(!1),[we,Y]=N.useState({isLoading:!1,progress:0,message:"",operationType:null,fileType:null}),{language:Q,setLanguage:Me,t:y}=qg(),le=N.useRef(null),{setHistory:de,present:V,setHtmlCode:B,setCssCode:f,setJsCode:S,handleClearCode:z,canUndo:U,canRedo:Z,handleUndo:ne,handleRedo:ae}=hg(Q),he=N.useCallback(xe=>{z(xe),(xe==="html"||xe==="css")&&(g(150),m(1280))},[z,g,m]),{html:ue,css:ze,js:pe}=V,{view:Te,setView:ie,isControlsVisible:re,setIsControlsVisible:be,isPreviewSizerOpen:se,setIsPreviewSizerOpen:je,previewScale:Ge,setPreviewScale:Ue,isGlobalTextHidden:Ke,setIsGlobalTextHidden:at,isMultiSelectMode:bt,setIsMultiSelectMode:Je,previewSizerRef:Oe}=mg(),{updateHtmlDOM:Ve,handleDeleteElement:tt,handleDuplicateElement:it,handleInsertElement:ut,handleUpdateText:fl,handleStylesUpdate:kt,handleMultipleStylesUpdate:hl,handleNumericStyleChange:vt,handleGenericStyleChange:Ft,handleTextAlignChange:ot,handleVerticalAlignChange:Mt,handleTextStyleToggle:Le,handleTextColorChange:Ct,handleBgChange:Rt,handlePageSizeChange:yl,handleLinkUpdate:At,handleApplyStylePreset:el,handleAlignmentChange:Gt,handleToggleElementVisibility:Vt,handleApplyAnimation:jl,handleElementDrop:xl,handleHoverStyleChange:xn}=pg({setHistory:de,present:V,selectedElements:u,setSelectedElements:r,setBodyBgColor:M,previewIframeRef:le,pageWidth:x,pageHeight:T,setPageWidth:m,setPageHeight:g,lastActiveSlideSelector:ee}),{fileInputRef:vn,handleFileOpen:We,handleOpenClick:Dt}=vg({setHistory:de,setSelectedElements:r,setAdLoadingState:Y,setPreviewScale:Ue,setBlobUrlMap:p,t:y}),{handleDownloadHTML:yt,handleDownloadPPTX:qn,handleDownloadPDF:Yn,handleDownloadImage:Xn}=zg({htmlCode:ue,cssCode:ze,jsCode:pe,previewIframeRef:le,setAdLoadingState:Y,blobUrlMap:c,t:y}),{handleOpenInNewWindow:Nl}=kg({htmlCode:ue,cssCode:ze,jsCode:pe,blobUrlMap:c,pageWidth:x,pageHeight:T});Mg({handleUpdateText:fl,handleStylesUpdate:kt,handleMultipleStylesUpdate:hl,updateHtmlDOM:Ve,handleDuplicateElement:it,handleDeleteElement:tt,handleUndo:ne,handleRedo:ae,setSelectedElements:r,setBodyBgColor:M,setIsControlsVisible:be,setPageWidth:m,setPageHeight:g,setScrollToLine:J,setLastActiveSlideSelector:$,handleElementDrop:xl,setIsPageSizeDefined:oe}),N.useEffect(()=>{var xe,Ye;(Ye=(xe=le.current)==null?void 0:xe.contentWindow)==null||Ye.postMessage({type:"toggle-global-text",payload:{isHidden:Ke}},"*")},[Ke]),N.useEffect(()=>{var xe,Ye;(Ye=(xe=le.current)==null?void 0:xe.contentWindow)==null||Ye.postMessage({type:"set-multi-select-mode",payload:{enabled:bt}},"*")},[bt]),N.useEffect(()=>{Promise.all([Ta(Rg),Ta(Hg),Ta(Bg),Ta(_g),Ta(Ug)]).then(()=>Ta(Og)).then(()=>{const xe=window.pdfjsLib;xe&&(xe.GlobalWorkerOptions.workerSrc="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js"),h("loaded")}).catch(xe=>{console.error("외부 라이브러리 로딩 최종 실패:",xe),h("error")})},[]),N.useEffect(()=>()=>{Object.keys(c).forEach(xe=>URL.revokeObjectURL(xe))},[c]),N.useEffect(()=>{const xe=Ye=>{const Ot=Ye.target;if(Ot.tagName==="INPUT"||Ot.tagName==="TEXTAREA")return;const Ql=navigator.platform.toUpperCase().includes("MAC"),vl=Ql?Ye.metaKey:Ye.ctrlKey;if(vl&&Ye.key.toLowerCase()==="z"){Ye.preventDefault(),Ye.shiftKey?ae():ne();return}!Ql&&vl&&Ye.key.toLowerCase()==="y"&&(Ye.preventDefault(),ae()),Ye.key==="Escape"&&u.length>0&&(Ye.preventDefault(),r([]))};return document.addEventListener("keydown",xe),()=>{document.removeEventListener("keydown",xe)}},[ne,ae,u]);const X=xe=>{var Ye,Ot;(Ot=(Ye=le.current)==null?void 0:Ye.contentWindow)==null||Ot.postMessage({type:"select-element-by-selector",payload:{selector:xe}},"*")},ve=N.useCallback(()=>{J(null)},[]),Ht=xe=>{console.log("Creating new file from template:",xe.name,`(${xe.width}x${xe.height})`),de({past:[],present:{html:xe.html,css:xe.css||"",js:""},future:[]}),r([]),m(xe.width),g(xe.height)},Qt=N.useCallback(()=>{var xe,Ye;(Ye=(xe=le.current)==null?void 0:xe.contentWindow)==null||Ye.postMessage({type:"get-content-size"},"*")},[le]),nt=async()=>{var xe,Ye;if(!ce){if(k(!0),Se(!0),q(""),!((Ye=(xe=le.current)==null?void 0:xe.contentDocument)!=null&&Ye.body)){q(y("errors.ocrPreviewError")),Se(!1);return}try{await Lo(le.current);const Ot=window.html2canvas,Ql=window.Tesseract;if(!Ot||!Ql)throw new Error(y("errors.ocrLibraryError"));const vl=le.current.contentDocument.body,Na=await Ot(vl,{scale:2,useCORS:!0,allowTaint:!0,logging:!1}),El=await Ql.createWorker("kor+eng",1,{logger:wn=>{wn.status}}),{data:{text:Zl}}=await El.recognize(Na);await El.terminate(),q(Zl||y("ocr.noTextFound"))}catch(Ot){console.error("OCR process failed:",Ot),q(Ot instanceof Error?Ot.message:y("errors.ocrProcessError"))}finally{Se(!1)}}},ft=o.jsx("div",{className:"h-full flex flex-col",children:o.jsx(Em,{htmlCode:ue,cssCode:ze,jsCode:pe,onHtmlChange:B,onCssChange:f,onJsChange:S,onClearCode:he,scrollToLine:K,onScrollComplete:ve,t:y})}),tl=o.jsx("div",{className:"w-full h-full flex flex-col",children:o.jsx(km,{ref:le,htmlCode:ue,cssCode:ze,jsCode:pe,selectedElementIds:u.map(xe=>xe.id)})});return o.jsxs("div",{className:"bg-gray-100 min-h-screen text-gray-800 flex flex-col h-screen overflow-hidden",children:[o.jsx(Xg,{isLoading:we.isLoading,progress:we.progress,message:we.message,onClose:()=>Y(xe=>({...xe,isLoading:!1})),operationType:we.operationType,t:y}),o.jsx(cg,{isOpen:E,onClose:()=>C(!1),t:y}),o.jsx(dg,{isOpen:G,onClose:()=>k(!1),extractedText:te,isLoading:ce,t:y}),o.jsx(sg,{view:Te,setView:ie,isPreviewSizerOpen:se,setIsPreviewSizerOpen:je,previewSizerRef:Oe,previewScale:Ge,setPreviewScale:Ue,isControlsVisible:re,setIsControlsVisible:be,isGlobalTextHidden:Ke,setIsGlobalTextHidden:at,fileInputRef:vn,handleFileOpen:We,handleOpenClick:Dt,isDownloading:we.isLoading,libsLoadingState:v,handleDownloadHTML:yt,handleDownloadPPTX:qn,handleDownloadPDF:Yn,handleDownloadImage:Xn,handleOpenInNewTab:Nl,setSelectedElements:r,setIsManualOpen:C,isLayersPanelOpen:A,onToggleLayersPanel:()=>L(xe=>!xe),onNewFile:Ht,onExtractText:nt,isOcrLoading:ce,language:Q,setLanguage:Me,t:y}),re&&o.jsx(ag,{selectedElements:u,setSelectedElements:r,onNumericStyleChange:vt,onGenericStyleChange:Ft,onTextAlignChange:ot,onVerticalAlignChange:Mt,onTextStyleToggle:Le,onTextColorChange:Ct,onBgChange:Rt,onUndo:ne,onRedo:ae,canUndo:U,canRedo:Z,onInsertElement:ut,bodyBgColor:b,pageWidth:x,pageHeight:T,onPageSizeChange:yl,isMultiSelectMode:bt,setIsMultiSelectMode:Je,setBlobUrlMap:p,onLinkUpdate:At,onApplyStylePreset:el,onAlignmentChange:Gt,onApplyAnimation:jl,onAutoResize:Qt,isPageSizeDefined:_,onHoverStyleChange:xn,cssCode:ze,t:y}),o.jsx(rg,{view:Te,editorPane:ft,previewPane:tl,previewScale:Ge,pageWidth:x,pageHeight:T}),o.jsx(fg,{isOpen:A,onClose:()=>L(!1),htmlCode:ue,selectedElementIds:u.map(xe=>xe.id),onSelectElement:X,onToggleVisibility:Vt,t:y})]})},ih=document.getElementById("root");if(!ih)throw new Error("Could not find root element to mount to");const Gg=Nm.createRoot(ih);Gg.render(o.jsx(ym.StrictMode,{children:o.jsx(Fg,{})}));
