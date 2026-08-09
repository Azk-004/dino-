var uu=Object.defineProperty;var du=(n,t,e)=>t in n?uu(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var Lt=(n,t,e)=>du(n,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();var tl="1.3.26";function Mc(n,t,e){return Math.max(n,Math.min(t,e))}function hu(n,t,e){return(1-e)*n+e*t}function fu(n,t,e,i){return hu(n,t,1-Math.exp(-e*i))}function pu(n,t){return(n%t+t)%t}var mu=class{constructor(){Lt(this,"isRunning",!1);Lt(this,"value",0);Lt(this,"from",0);Lt(this,"to",0);Lt(this,"currentTime",0);Lt(this,"lerp");Lt(this,"duration");Lt(this,"easing");Lt(this,"onUpdate")}advance(n){var e;if(!this.isRunning)return;let t=!1;if(this.duration&&this.easing){this.currentTime+=n;const i=Mc(0,this.currentTime/this.duration,1);t=i>=1;const s=t?1:this.easing(i);this.value=this.from+(this.to-this.from)*s}else this.lerp?(this.value=fu(this.value,this.to,this.lerp*60,n),Math.round(this.value)===Math.round(this.to)&&(this.value=this.to,t=!0)):(this.value=this.to,t=!0);t&&this.stop(),(e=this.onUpdate)==null||e.call(this,this.value,t)}stop(){this.isRunning=!1}fromTo(n,t,{lerp:e,duration:i,easing:s,onStart:r,onUpdate:o}){this.from=this.value=n,this.to=t,this.lerp=e,this.duration=i,this.easing=s,this.currentTime=0,this.isRunning=!0,r==null||r(),this.onUpdate=o}};function gu(n,t){let e;return function(...i){clearTimeout(e),e=setTimeout(()=>{e=void 0,n.apply(this,i)},t)}}var _u=class{constructor(n,t,{autoResize:e=!0,debounce:i=250}={}){Lt(this,"width",0);Lt(this,"height",0);Lt(this,"scrollHeight",0);Lt(this,"scrollWidth",0);Lt(this,"debouncedResize");Lt(this,"wrapperResizeObserver");Lt(this,"contentResizeObserver");Lt(this,"resize",()=>{this.onWrapperResize(),this.onContentResize()});Lt(this,"onWrapperResize",()=>{this.wrapper instanceof Window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)});Lt(this,"onContentResize",()=>{this.wrapper instanceof Window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)});this.wrapper=n,this.content=t,e&&(this.debouncedResize=gu(this.resize,i),this.wrapper instanceof Window?window.addEventListener("resize",this.debouncedResize):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){var n,t;(n=this.wrapperResizeObserver)==null||n.disconnect(),(t=this.contentResizeObserver)==null||t.disconnect(),this.wrapper===window&&this.debouncedResize&&window.removeEventListener("resize",this.debouncedResize)}get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},yc=class{constructor(){Lt(this,"events",{})}emit(n,...t){var i;const e=this.events[n]||[];for(let s=0,r=e.length;s<r;s++)(i=e[s])==null||i.call(e,...t)}on(n,t){return this.events[n]?this.events[n].push(t):this.events[n]=[t],()=>{var e;this.events[n]=(e=this.events[n])==null?void 0:e.filter(i=>t!==i)}}off(n,t){var e;this.events[n]=(e=this.events[n])==null?void 0:e.filter(i=>t!==i)}destroy(){this.events={}}};const vu=100/6,Jn={passive:!1};function el(n,t){return n===1?vu:n===2?t:1}var Mu=class{constructor(n,t={wheelMultiplier:1,touchMultiplier:1}){Lt(this,"touchStart",{x:0,y:0});Lt(this,"lastDelta",{x:0,y:0});Lt(this,"window",{width:0,height:0});Lt(this,"emitter",new yc);Lt(this,"onTouchStart",n=>{const{clientX:t,clientY:e}=n.targetTouches?n.targetTouches[0]:n;this.touchStart.x=t,this.touchStart.y=e,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:n})});Lt(this,"onTouchMove",n=>{const{clientX:t,clientY:e}=n.targetTouches?n.targetTouches[0]:n,i=-(t-this.touchStart.x)*this.options.touchMultiplier,s=-(e-this.touchStart.y)*this.options.touchMultiplier;this.touchStart.x=t,this.touchStart.y=e,this.lastDelta={x:i,y:s},this.emitter.emit("scroll",{deltaX:i,deltaY:s,event:n})});Lt(this,"onTouchEnd",n=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:n})});Lt(this,"onWheel",n=>{let{deltaX:t,deltaY:e,deltaMode:i}=n;const s=el(i,this.window.width),r=el(i,this.window.height);t*=s,e*=r,t*=this.options.wheelMultiplier,e*=this.options.wheelMultiplier,this.emitter.emit("scroll",{deltaX:t,deltaY:e,event:n})});Lt(this,"onWindowResize",()=>{this.window={width:window.innerWidth,height:window.innerHeight}});this.element=n,this.options=t,window.addEventListener("resize",this.onWindowResize),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,Jn),this.element.addEventListener("touchstart",this.onTouchStart,Jn),this.element.addEventListener("touchmove",this.onTouchMove,Jn),this.element.addEventListener("touchend",this.onTouchEnd,Jn)}on(n,t){return this.emitter.on(n,t)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize),this.element.removeEventListener("wheel",this.onWheel,Jn),this.element.removeEventListener("touchstart",this.onTouchStart,Jn),this.element.removeEventListener("touchmove",this.onTouchMove,Jn),this.element.removeEventListener("touchend",this.onTouchEnd,Jn)}};const nl=n=>Math.min(1,1.001-2**(-10*n));var il=class{constructor({wrapper:n=window,content:t=document.documentElement,eventsTarget:e=n,smoothWheel:i=!0,syncTouch:s=!1,syncTouchLerp:r=.075,touchInertiaExponent:o=1.7,duration:a,easing:l,lerp:c=.1,infinite:u=!1,orientation:d="vertical",gestureOrientation:h=d==="horizontal"?"both":"vertical",touchMultiplier:p=1,wheelMultiplier:f=1,autoResize:v=!0,prevent:g,virtualScroll:m,overscroll:S=!0,autoRaf:x=!1,anchors:y=!1,autoToggle:U=!1,allowNestedScroll:P=!1,__experimental__naiveDimensions:R=!1,naiveDimensions:L=R,stopInertiaOnNavigate:_=!1,respectReducedMotion:M=!0}={}){Lt(this,"_isScrolling",!1);Lt(this,"_isStopped",!1);Lt(this,"_isLocked",!1);Lt(this,"_preventNextNativeScrollEvent",!1);Lt(this,"_resetVelocityTimeout",null);Lt(this,"_rafId",null);Lt(this,"_isDraggingSelection",!1);Lt(this,"reducedMotionMediaQuery",window.matchMedia("(prefers-reduced-motion: reduce)"));Lt(this,"isTouching");Lt(this,"isIos");Lt(this,"time",0);Lt(this,"userData",{});Lt(this,"lastVelocity",0);Lt(this,"velocity",0);Lt(this,"direction",0);Lt(this,"options");Lt(this,"targetScroll");Lt(this,"animatedScroll");Lt(this,"animate",new mu);Lt(this,"emitter",new yc);Lt(this,"dimensions");Lt(this,"virtualScroll");Lt(this,"onScrollEnd",n=>{n instanceof CustomEvent||(this.isScrolling==="smooth"||this.isScrolling===!1)&&n.stopPropagation()});Lt(this,"dispatchScrollendEvent",()=>{this.options.wrapper.dispatchEvent(new CustomEvent("scrollend",{bubbles:this.options.wrapper===window,detail:{lenisScrollEnd:!0}}))});Lt(this,"onTransitionEnd",n=>{var t;(t=n.propertyName)!=null&&t.includes("overflow")&&n.target===this.rootElement&&this.checkOverflow()});Lt(this,"onClick",n=>{const t=n.composedPath().filter(i=>i instanceof HTMLAnchorElement&&i.href).map(i=>new URL(i.href)),e=new URL(window.location.href);if(this.options.anchors){const i=t.find(s=>e.host===s.host&&e.pathname===s.pathname&&s.hash);if(i){const s=typeof this.options.anchors=="object"&&this.options.anchors?this.options.anchors:void 0,r=decodeURIComponent(i.hash);this.scrollTo(r,s);return}}if(this.options.stopInertiaOnNavigate&&t.some(i=>e.host===i.host&&e.pathname!==i.pathname)){this.reset();return}});Lt(this,"onPointerDown",n=>{n.button===1&&this.reset()});Lt(this,"onVirtualScroll",n=>{if(typeof this.options.virtualScroll=="function"&&this.options.virtualScroll(n)===!1)return;const{deltaX:t,deltaY:e,event:i}=n;if(this.emitter.emit("virtual-scroll",{deltaX:t,deltaY:e,event:i}),i.ctrlKey||i.lenisStopPropagation)return;const s=i.type.includes("touch"),r=i.type.includes("wheel");if(s&&this.isIos&&(i.type==="touchstart"&&(this._isDraggingSelection=this.isTouchOnSelectionHandle(i)),this._isDraggingSelection)){i.type==="touchend"&&(this._isDraggingSelection=!1);return}this.isTouching=i.type==="touchstart"||i.type==="touchmove";const o=t===0&&e===0;if(this.options.syncTouch&&s&&i.type==="touchstart"&&o&&!this.isStopped&&!this.isLocked){this.reset();return}const a=this.options.gestureOrientation==="vertical"&&e===0||this.options.gestureOrientation==="horizontal"&&t===0;if(o||a)return;let l=i.composedPath();l=l.slice(0,l.indexOf(this.rootElement));const c=this.options.prevent,u=Math.abs(t)>=Math.abs(e)?"horizontal":"vertical";if(l.find(f=>{var v,g,m,S,x;return f instanceof HTMLElement&&(typeof c=="function"&&(c==null?void 0:c(f))||((v=f.hasAttribute)==null?void 0:v.call(f,"data-lenis-prevent"))||u==="vertical"&&((g=f.hasAttribute)==null?void 0:g.call(f,"data-lenis-prevent-vertical"))||u==="horizontal"&&((m=f.hasAttribute)==null?void 0:m.call(f,"data-lenis-prevent-horizontal"))||s&&((S=f.hasAttribute)==null?void 0:S.call(f,"data-lenis-prevent-touch"))||r&&((x=f.hasAttribute)==null?void 0:x.call(f,"data-lenis-prevent-wheel"))||this.options.allowNestedScroll&&this.hasNestedScroll(f,{deltaX:t,deltaY:e}))}))return;if(this.isStopped||this.isLocked){i.cancelable&&i.preventDefault();return}if(!(this.options.syncTouch&&s||this.options.smoothWheel&&r)){this.isScrolling="native",this.animate.stop(),i.lenisStopPropagation=!0;return}let d=e;this.options.gestureOrientation==="both"?d=Math.abs(e)>Math.abs(t)?e:t:this.options.gestureOrientation==="horizontal"&&(d=t),(!this.options.overscroll||this.options.infinite||this.options.wrapper!==window&&this.limit>0&&(this.animatedScroll>0&&this.animatedScroll<this.limit||this.animatedScroll===0&&e>0||this.animatedScroll===this.limit&&e<0))&&(i.lenisStopPropagation=!0),i.cancelable&&i.preventDefault();const h=s&&this.options.syncTouch,p=s&&i.type==="touchend";p&&(d=Math.sign(d)*Math.abs(this.velocity)**this.options.touchInertiaExponent),this.scrollTo(this.targetScroll+d,{programmatic:!1,...h?{lerp:p?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}})});Lt(this,"onNativeScroll",()=>{if(this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this._preventNextNativeScrollEvent){this._preventNextNativeScrollEvent=!1;return}if(this.isScrolling===!1||this.isScrolling==="native"){const n=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-n,this.direction=Math.sign(this.animatedScroll-n),this.isStopped||(this.isScrolling="native"),this.emit(),this.velocity!==0&&(this._resetVelocityTimeout=setTimeout(()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()},400))}});Lt(this,"raf",n=>{const t=n-(this.time||n);this.time=n,this.animate.advance(t*.001),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))});window.lenisVersion=tl,window.lenis||(window.lenis={}),window.lenis.version=tl,d==="horizontal"&&(window.lenis.horizontal=!0),s===!0&&(window.lenis.touch=!0),this.isIos=/(iPad|iPhone|iPod)/g.test(navigator.userAgent),(!n||n===document.documentElement)&&(n=window),typeof a=="number"&&typeof l!="function"?l=nl:typeof l=="function"&&typeof a!="number"&&(a=1),this.options={wrapper:n,content:t,eventsTarget:e,smoothWheel:i,syncTouch:s,syncTouchLerp:r,touchInertiaExponent:o,duration:a,easing:l,lerp:c,infinite:u,gestureOrientation:h,orientation:d,touchMultiplier:p,wheelMultiplier:f,autoResize:v,prevent:g,virtualScroll:m,overscroll:S,autoRaf:x,anchors:y,autoToggle:U,allowNestedScroll:P,naiveDimensions:L,stopInertiaOnNavigate:_,respectReducedMotion:M},this.dimensions=new _u(n,t,{autoResize:v}),this.updateClassName(),this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll),this.options.wrapper.addEventListener("scrollend",this.onScrollEnd,{capture:!0}),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.addEventListener("click",this.onClick),this.options.wrapper.addEventListener("pointerdown",this.onPointerDown),this.virtualScroll=new Mu(e,{touchMultiplier:p,wheelMultiplier:f}),this.virtualScroll.on("scroll",this.onVirtualScroll),this.options.autoToggle&&(this.checkOverflow(),this.rootElement.addEventListener("transitionend",this.onTransitionEnd)),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll),this.options.wrapper.removeEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.wrapper.removeEventListener("pointerdown",this.onPointerDown),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.removeEventListener("click",this.onClick),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName(),this._rafId&&cancelAnimationFrame(this._rafId)}on(n,t){return this.emitter.on(n,t)}off(n,t){return this.emitter.off(n,t)}get overflow(){const n=this.isHorizontal?"overflow-x":"overflow-y";return getComputedStyle(this.rootElement)[n]}checkOverflow(){["hidden","clip"].includes(this.overflow)?this.internalStop():this.internalStart()}setScroll(n){this.isHorizontal?this.options.wrapper.scrollTo({left:n,behavior:"instant"}):this.options.wrapper.scrollTo({top:n,behavior:"instant"})}isTouchOnSelectionHandle(n){const t=window.getSelection();if(!t||t.isCollapsed||t.rangeCount===0)return!1;const e=n.targetTouches[0]??n.changedTouches[0];if(!e)return!1;const i=t.getRangeAt(0).getClientRects();if(i.length===0)return!1;const s=i[0],r=i[i.length-1],o=40,a=Math.hypot(e.clientX-s.left,e.clientY-s.top)<=o,l=Math.hypot(e.clientX-r.right,e.clientY-r.bottom)<=o;return a||l}resize(){this.dimensions.resize(),this.animatedScroll=this.targetScroll=this.actualScroll,this.emit()}emit(){this.emitter.emit("scroll",this)}reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){if(this.isStopped){if(this.options.autoToggle){this.rootElement.style.removeProperty("overflow");return}this.internalStart()}}internalStart(){this.isStopped&&(this.reset(),this.isStopped=!1,this.emit())}stop(){if(!this.isStopped){if(this.options.autoToggle){this.rootElement.style.setProperty("overflow","clip");return}this.internalStop()}}internalStop(){this.isStopped||(this.reset(),this.isStopped=!0,this.emit())}scrollTo(n,{offset:t=0,immediate:e=!1,lock:i=!1,programmatic:s=!0,lerp:r=s?this.options.lerp:void 0,duration:o=s?this.options.duration:void 0,easing:a=s?this.options.easing:void 0,onStart:l,onComplete:c,force:u=!1,userData:d}={}){if(this.prefersReducedMotion&&(s?e=!0:(r=1,o=void 0,a=void 0)),(this.isStopped||this.isLocked)&&!u)return;let h=n,p=t;if(typeof h=="string"&&["top","left","start","#"].includes(h))h=0;else if(typeof h=="string"&&["bottom","right","end"].includes(h))h=this.limit;else{let f=null;if(typeof h=="string"?(f=h.startsWith("#")?document.getElementById(h.slice(1)):document.querySelector(h),f||(h==="#top"?h=0:console.warn("Lenis: Target not found",h))):h instanceof HTMLElement&&(h!=null&&h.nodeType)&&(f=h),f){if(this.options.wrapper!==window){const y=this.rootElement.getBoundingClientRect();p-=this.isHorizontal?y.left:y.top}const v=f.getBoundingClientRect(),g=getComputedStyle(f),m=this.isHorizontal?Number.parseFloat(g.scrollMarginLeft):Number.parseFloat(g.scrollMarginTop),S=getComputedStyle(this.rootElement),x=this.isHorizontal?Number.parseFloat(S.scrollPaddingLeft):Number.parseFloat(S.scrollPaddingTop);h=(this.isHorizontal?v.left:v.top)+this.animatedScroll-(Number.isNaN(m)?0:m)-(Number.isNaN(x)?0:x)}}if(typeof h=="number"){if(h+=p,this.options.infinite){if(s){this.targetScroll=this.animatedScroll=this.scroll;const f=h-this.animatedScroll;f>this.limit/2?h-=this.limit:f<-this.limit/2&&(h+=this.limit)}}else h=Mc(0,h,this.limit);if(h===this.targetScroll){l==null||l(this),c==null||c(this);return}if(this.userData=d??{},e){this.animatedScroll=this.targetScroll=h,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),c==null||c(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()});return}s||(this.targetScroll=h),typeof o=="number"&&typeof a!="function"?a=nl:typeof a=="function"&&typeof o!="number"&&(o=1),this.animate.fromTo(this.animatedScroll,h,{duration:o,easing:a,lerp:r,onStart:()=>{i&&(this.isLocked=!0),this.isScrolling="smooth",l==null||l(this)},onUpdate:(f,v)=>{this.isScrolling="smooth",this.lastVelocity=this.velocity,this.velocity=f-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=f,this.setScroll(this.scroll),s&&(this.targetScroll=f),v||this.emit(),v&&(this.reset(),this.emit(),c==null||c(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()}),this.preventNextNativeScrollEvent())}})}}preventNextNativeScrollEvent(){this._preventNextNativeScrollEvent=!0,requestAnimationFrame(()=>{this._preventNextNativeScrollEvent=!1})}hasNestedScroll(n,{deltaX:t,deltaY:e}){const i=Date.now();n._lenis||(n._lenis={});const s=n._lenis;let r,o,a,l,c,u,d,h,p,f;if(i-(s.time??0)>2e3){s.time=Date.now();const P=window.getComputedStyle(n);if(s.computedStyle=P,r=["auto","overlay","scroll"].includes(P.overflowX),o=["auto","overlay","scroll"].includes(P.overflowY),c=["auto"].includes(P.overscrollBehaviorX),u=["auto"].includes(P.overscrollBehaviorY),s.hasOverflowX=r,s.hasOverflowY=o,!(r||o))return!1;d=n.scrollWidth,h=n.scrollHeight,p=n.clientWidth,f=n.clientHeight,a=d>p,l=h>f,s.isScrollableX=a,s.isScrollableY=l,s.scrollWidth=d,s.scrollHeight=h,s.clientWidth=p,s.clientHeight=f,s.hasOverscrollBehaviorX=c,s.hasOverscrollBehaviorY=u}else a=s.isScrollableX,l=s.isScrollableY,r=s.hasOverflowX,o=s.hasOverflowY,d=s.scrollWidth,h=s.scrollHeight,p=s.clientWidth,f=s.clientHeight,c=s.hasOverscrollBehaviorX,u=s.hasOverscrollBehaviorY;if(!(r&&a||o&&l))return!1;const v=Math.abs(t)>=Math.abs(e)?"horizontal":"vertical";let g,m,S,x,y,U;if(v==="horizontal")g=Math.round(n.scrollLeft),m=d-p,S=t,x=r,y=a,U=c;else if(v==="vertical")g=Math.round(n.scrollTop),m=h-f,S=e,x=o,y=l,U=u;else return!1;return!U&&(g>=m||g<=0)?!0:(S>0?g<m:g>0)&&x&&y}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return this.options.orientation==="horizontal"}get actualScroll(){const n=this.options.wrapper;return this.isHorizontal?n.scrollX??n.scrollLeft:n.scrollY??n.scrollTop}get scroll(){return this.options.infinite?pu(this.animatedScroll,this.limit):this.animatedScroll}get progress(){return this.limit===0?1:this.scroll/this.limit}get isScrolling(){return this._isScrolling}set isScrolling(n){this._isScrolling!==n&&(this._isScrolling=n,this.updateClassName())}get isStopped(){return this._isStopped}set isStopped(n){this._isStopped!==n&&(this._isStopped=n,this.updateClassName())}get isLocked(){return this._isLocked}set isLocked(n){this._isLocked!==n&&(this._isLocked=n,this.updateClassName())}get isSmooth(){return this.isScrolling==="smooth"}get prefersReducedMotion(){return this.options.respectReducedMotion&&this.reducedMotionMediaQuery.matches}get className(){let n="lenis";return this.options.autoToggle&&(n+=" lenis-autoToggle"),this.isStopped&&(n+=" lenis-stopped"),this.isLocked&&(n+=" lenis-locked"),this.isScrolling&&(n+=" lenis-scrolling"),this.isScrolling==="smooth"&&(n+=" lenis-smooth"),n}updateClassName(){this.cleanUpClassName(),this.className.split(" ").forEach(n=>{this.rootElement.classList.add(n)})}cleanUpClassName(){for(const n of Array.from(this.rootElement.classList))(n==="lenis"||n.startsWith("lenis-"))&&this.rootElement.classList.remove(n)}};/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const La="170",yu=0,sl=1,Su=2,Sc=1,Br=2,Nn=3,ui=0,Xe=1,Ke=2,li=0,Ri=1,tn=2,rl=3,ol=4,xu=5,Ei=100,wu=101,bu=102,Eu=103,Tu=104,Au=200,Cu=201,Ru=202,Pu=203,ko=204,Go=205,Lu=206,Iu=207,Du=208,Uu=209,Nu=210,Fu=211,Ou=212,zu=213,Bu=214,Ho=0,Vo=1,Wo=2,os=3,Xo=4,qo=5,Yo=6,$o=7,Ia=0,ku=1,Gu=2,ci=0,Hu=1,Vu=2,Wu=3,kr=4,Xu=5,qu=6,Yu=7,xc=300,as=301,ls=302,Zo=303,Ko=304,Gr=306,di=1e3,Ai=1001,Jo=1002,yn=1003,$u=1004,$s=1005,Tn=1006,Zr=1007,Ci=1008,Wn=1009,wc=1010,bc=1011,Os=1012,Da=1013,Pi=1014,zn=1015,ks=1016,Ua=1017,Na=1018,cs=1020,Ec=35902,Tc=1021,Ac=1022,Mn=1023,Cc=1024,Rc=1025,ns=1026,us=1027,Pc=1028,Fa=1029,Lc=1030,Oa=1031,za=1033,br=33776,Er=33777,Tr=33778,Ar=33779,jo=35840,Qo=35841,ta=35842,ea=35843,na=36196,ia=37492,sa=37496,ra=37808,oa=37809,aa=37810,la=37811,ca=37812,ua=37813,da=37814,ha=37815,fa=37816,pa=37817,ma=37818,ga=37819,_a=37820,va=37821,Cr=36492,Ma=36494,ya=36495,Ic=36283,Sa=36284,xa=36285,wa=36286,Zu=3200,Ku=3201,Ba=0,Ju=1,ri="",me="srgb",hs="srgb-linear",Hr="linear",pe="srgb",Fi=7680,al=519,ju=512,Qu=513,td=514,Dc=515,ed=516,nd=517,id=518,sd=519,ba=35044,ll="300 es",Bn=2e3,Lr=2001;class fs{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const i=this._listeners[t.type];if(i!==void 0){t.target=this;const s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const Ve=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let cl=1234567;const Ls=Math.PI/180,zs=180/Math.PI;function kn(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Ve[n&255]+Ve[n>>8&255]+Ve[n>>16&255]+Ve[n>>24&255]+"-"+Ve[t&255]+Ve[t>>8&255]+"-"+Ve[t>>16&15|64]+Ve[t>>24&255]+"-"+Ve[e&63|128]+Ve[e>>8&255]+"-"+Ve[e>>16&255]+Ve[e>>24&255]+Ve[i&255]+Ve[i>>8&255]+Ve[i>>16&255]+Ve[i>>24&255]).toLowerCase()}function Ge(n,t,e){return Math.max(t,Math.min(e,n))}function ka(n,t){return(n%t+t)%t}function rd(n,t,e,i,s){return i+(n-t)*(s-i)/(e-t)}function od(n,t,e){return n!==t?(e-n)/(t-n):0}function Is(n,t,e){return(1-e)*n+e*t}function ad(n,t,e,i){return Is(n,t,1-Math.exp(-e*i))}function ld(n,t=1){return t-Math.abs(ka(n,t*2)-t)}function cd(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function ud(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function dd(n,t){return n+Math.floor(Math.random()*(t-n+1))}function hd(n,t){return n+Math.random()*(t-n)}function fd(n){return n*(.5-Math.random())}function pd(n){n!==void 0&&(cl=n);let t=cl+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function md(n){return n*Ls}function gd(n){return n*zs}function _d(n){return(n&n-1)===0&&n!==0}function vd(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Md(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function yd(n,t,e,i,s){const r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),c=r((t+i)/2),u=o((t+i)/2),d=r((t-i)/2),h=o((t-i)/2),p=r((i-t)/2),f=o((i-t)/2);switch(s){case"XYX":n.set(a*u,l*d,l*h,a*c);break;case"YZY":n.set(l*h,a*u,l*d,a*c);break;case"ZXZ":n.set(l*d,l*h,a*u,a*c);break;case"XZX":n.set(a*u,l*f,l*p,a*c);break;case"YXY":n.set(l*p,a*u,l*f,a*c);break;case"ZYZ":n.set(l*f,l*p,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function vn(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function de(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const an={DEG2RAD:Ls,RAD2DEG:zs,generateUUID:kn,clamp:Ge,euclideanModulo:ka,mapLinear:rd,inverseLerp:od,lerp:Is,damp:ad,pingpong:ld,smoothstep:cd,smootherstep:ud,randInt:dd,randFloat:hd,randFloatSpread:fd,seededRandom:pd,degToRad:md,radToDeg:gd,isPowerOfTwo:_d,ceilPowerOfTwo:vd,floorPowerOfTwo:Md,setQuaternionFromProperEuler:yd,normalize:de,denormalize:vn};class Ct{constructor(t=0,e=0){Ct.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Ge(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*i-o*s+t.x,this.y=r*s+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Zt{constructor(t,e,i,s,r,o,a,l,c){Zt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,l,c)}set(t,e,i,s,r,o,a,l,c){const u=this.elements;return u[0]=t,u[1]=s,u[2]=a,u[3]=e,u[4]=r,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],u=i[4],d=i[7],h=i[2],p=i[5],f=i[8],v=s[0],g=s[3],m=s[6],S=s[1],x=s[4],y=s[7],U=s[2],P=s[5],R=s[8];return r[0]=o*v+a*S+l*U,r[3]=o*g+a*x+l*P,r[6]=o*m+a*y+l*R,r[1]=c*v+u*S+d*U,r[4]=c*g+u*x+d*P,r[7]=c*m+u*y+d*R,r[2]=h*v+p*S+f*U,r[5]=h*g+p*x+f*P,r[8]=h*m+p*y+f*R,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8];return e*o*u-e*a*c-i*r*u+i*a*l+s*r*c-s*o*l}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],d=u*o-a*c,h=a*l-u*r,p=c*r-o*l,f=e*d+i*h+s*p;if(f===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/f;return t[0]=d*v,t[1]=(s*c-u*i)*v,t[2]=(a*i-s*o)*v,t[3]=h*v,t[4]=(u*e-s*l)*v,t[5]=(s*r-a*e)*v,t[6]=p*v,t[7]=(i*l-c*e)*v,t[8]=(o*e-i*r)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Kr.makeScale(t,e)),this}rotate(t){return this.premultiply(Kr.makeRotation(-t)),this}translate(t,e){return this.premultiply(Kr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Kr=new Zt;function Uc(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function Ir(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Sd(){const n=Ir("canvas");return n.style.display="block",n}const ul={};function As(n){n in ul||(ul[n]=!0,console.warn(n))}function xd(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}function wd(n){const t=n.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function bd(n){const t=n.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const re={enabled:!0,workingColorSpace:hs,spaces:{},convert:function(n,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===pe&&(n.r=Gn(n.r),n.g=Gn(n.g),n.b=Gn(n.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(n.applyMatrix3(this.spaces[t].toXYZ),n.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===pe&&(n.r=is(n.r),n.g=is(n.g),n.b=is(n.b))),n},fromWorkingColorSpace:function(n,t){return this.convert(n,this.workingColorSpace,t)},toWorkingColorSpace:function(n,t){return this.convert(n,t,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===ri?Hr:this.spaces[n].transfer},getLuminanceCoefficients:function(n,t=this.workingColorSpace){return n.fromArray(this.spaces[t].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,t,e){return n.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace}};function Gn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function is(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}const dl=[.64,.33,.3,.6,.15,.06],hl=[.2126,.7152,.0722],fl=[.3127,.329],pl=new Zt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ml=new Zt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);re.define({[hs]:{primaries:dl,whitePoint:fl,transfer:Hr,toXYZ:pl,fromXYZ:ml,luminanceCoefficients:hl,workingColorSpaceConfig:{unpackColorSpace:me},outputColorSpaceConfig:{drawingBufferColorSpace:me}},[me]:{primaries:dl,whitePoint:fl,transfer:pe,toXYZ:pl,fromXYZ:ml,luminanceCoefficients:hl,outputColorSpaceConfig:{drawingBufferColorSpace:me}}});let Oi;class Ed{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Oi===void 0&&(Oi=Ir("canvas")),Oi.width=t.width,Oi.height=t.height;const i=Oi.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=Oi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Ir("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Gn(r[o]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Gn(e[i]/255)*255):e[i]=Gn(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Td=0;class Nc{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Td++}),this.uuid=kn(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Jr(s[o].image)):r.push(Jr(s[o]))}else r=Jr(s);i.url=r}return e||(t.images[this.uuid]=i),i}}function Jr(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Ed.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Ad=0;class je extends fs{constructor(t=je.DEFAULT_IMAGE,e=je.DEFAULT_MAPPING,i=Ai,s=Ai,r=Tn,o=Ci,a=Mn,l=Wn,c=je.DEFAULT_ANISOTROPY,u=ri){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ad++}),this.uuid=kn(),this.name="",this.source=new Nc(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Ct(0,0),this.repeat=new Ct(1,1),this.center=new Ct(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Zt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==xc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case di:t.x=t.x-Math.floor(t.x);break;case Ai:t.x=t.x<0?0:1;break;case Jo:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case di:t.y=t.y-Math.floor(t.y);break;case Ai:t.y=t.y<0?0:1;break;case Jo:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}je.DEFAULT_IMAGE=null;je.DEFAULT_MAPPING=xc;je.DEFAULT_ANISOTROPY=1;class ge{constructor(t=0,e=0,i=0,s=1){ge.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*i+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r;const l=t.elements,c=l[0],u=l[4],d=l[8],h=l[1],p=l[5],f=l[9],v=l[2],g=l[6],m=l[10];if(Math.abs(u-h)<.01&&Math.abs(d-v)<.01&&Math.abs(f-g)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+v)<.1&&Math.abs(f+g)<.1&&Math.abs(c+p+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const x=(c+1)/2,y=(p+1)/2,U=(m+1)/2,P=(u+h)/4,R=(d+v)/4,L=(f+g)/4;return x>y&&x>U?x<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(x),s=P/i,r=R/i):y>U?y<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),i=P/s,r=L/s):U<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(U),i=R/r,s=L/r),this.set(i,s,r,e),this}let S=Math.sqrt((g-f)*(g-f)+(d-v)*(d-v)+(h-u)*(h-u));return Math.abs(S)<.001&&(S=1),this.x=(g-f)/S,this.y=(d-v)/S,this.z=(h-u)/S,this.w=Math.acos((c+p+m-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Cd extends fs{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new ge(0,0,t,e),this.scissorTest=!1,this.viewport=new ge(0,0,t,e);const s={width:t,height:e,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Tn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const r=new je(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);r.flipY=!1,r.generateMipmaps=i.generateMipmaps,r.internalFormat=i.internalFormat,this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,s=t.textures.length;i<s;i++)this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Nc(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Li extends Cd{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class Fc extends je{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=yn,this.minFilter=yn,this.wrapR=Ai,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Rd extends je{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=yn,this.minFilter=yn,this.wrapR=Ai,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Gs{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,o,a){let l=i[s+0],c=i[s+1],u=i[s+2],d=i[s+3];const h=r[o+0],p=r[o+1],f=r[o+2],v=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=u,t[e+3]=d;return}if(a===1){t[e+0]=h,t[e+1]=p,t[e+2]=f,t[e+3]=v;return}if(d!==v||l!==h||c!==p||u!==f){let g=1-a;const m=l*h+c*p+u*f+d*v,S=m>=0?1:-1,x=1-m*m;if(x>Number.EPSILON){const U=Math.sqrt(x),P=Math.atan2(U,m*S);g=Math.sin(g*P)/U,a=Math.sin(a*P)/U}const y=a*S;if(l=l*g+h*y,c=c*g+p*y,u=u*g+f*y,d=d*g+v*y,g===1-a){const U=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=U,c*=U,u*=U,d*=U}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=d}static multiplyQuaternionsFlat(t,e,i,s,r,o){const a=i[s],l=i[s+1],c=i[s+2],u=i[s+3],d=r[o],h=r[o+1],p=r[o+2],f=r[o+3];return t[e]=a*f+u*d+l*p-c*h,t[e+1]=l*f+u*h+c*d-a*p,t[e+2]=c*f+u*p+a*h-l*d,t[e+3]=u*f-a*d-l*h-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(s/2),d=a(r/2),h=l(i/2),p=l(s/2),f=l(r/2);switch(o){case"XYZ":this._x=h*u*d+c*p*f,this._y=c*p*d-h*u*f,this._z=c*u*f+h*p*d,this._w=c*u*d-h*p*f;break;case"YXZ":this._x=h*u*d+c*p*f,this._y=c*p*d-h*u*f,this._z=c*u*f-h*p*d,this._w=c*u*d+h*p*f;break;case"ZXY":this._x=h*u*d-c*p*f,this._y=c*p*d+h*u*f,this._z=c*u*f+h*p*d,this._w=c*u*d-h*p*f;break;case"ZYX":this._x=h*u*d-c*p*f,this._y=c*p*d+h*u*f,this._z=c*u*f-h*p*d,this._w=c*u*d+h*p*f;break;case"YZX":this._x=h*u*d+c*p*f,this._y=c*p*d+h*u*f,this._z=c*u*f-h*p*d,this._w=c*u*d-h*p*f;break;case"XZY":this._x=h*u*d-c*p*f,this._y=c*p*d-h*u*f,this._z=c*u*f+h*p*d,this._w=c*u*d+h*p*f;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],u=e[6],d=e[10],h=i+a+d;if(h>0){const p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(u-l)*p,this._y=(r-c)*p,this._z=(o-s)*p}else if(i>a&&i>d){const p=2*Math.sqrt(1+i-a-d);this._w=(u-l)/p,this._x=.25*p,this._y=(s+o)/p,this._z=(r+c)/p}else if(a>d){const p=2*Math.sqrt(1+a-i-d);this._w=(r-c)/p,this._x=(s+o)/p,this._y=.25*p,this._z=(l+u)/p}else{const p=2*Math.sqrt(1+d-i-a);this._w=(o-s)/p,this._x=(r+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ge(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,u=e._w;return this._x=i*u+o*a+s*c-r*l,this._y=s*u+o*l+r*a-i*c,this._z=r*u+o*c+i*l-s*a,this._w=o*u-i*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,s=this._y,r=this._z,o=this._w;let a=o*t._w+i*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=i,this._y=s,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const p=1-e;return this._w=p*o+e*this._w,this._x=p*i+e*this._x,this._y=p*s+e*this._y,this._z=p*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),d=Math.sin((1-e)*u)/c,h=Math.sin(e*u)/c;return this._w=o*d+this._w*h,this._x=i*d+this._x*h,this._y=s*d+this._y*h,this._z=r*d+this._z*h,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class b{constructor(t=0,e=0,i=0){b.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(gl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(gl.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,i=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*i),u=2*(a*e-r*s),d=2*(r*i-o*e);return this.x=e+l*c+o*d-a*u,this.y=i+l*u+a*c-r*d,this.z=s+l*d+r*u-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-i*l,this.z=i*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return jr.copy(this).projectOnVector(t),this.sub(jr)}reflect(t){return this.sub(jr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Ge(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const jr=new b,gl=new Gs;class Hs{constructor(t=new b(1/0,1/0,1/0),e=new b(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(mn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(mn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=mn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,mn):mn.fromBufferAttribute(r,o),mn.applyMatrix4(t.matrixWorld),this.expandByPoint(mn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Zs.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Zs.copy(i.boundingBox)),Zs.applyMatrix4(t.matrixWorld),this.union(Zs)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,mn),mn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(_s),Ks.subVectors(this.max,_s),zi.subVectors(t.a,_s),Bi.subVectors(t.b,_s),ki.subVectors(t.c,_s),jn.subVectors(Bi,zi),Qn.subVectors(ki,Bi),fi.subVectors(zi,ki);let e=[0,-jn.z,jn.y,0,-Qn.z,Qn.y,0,-fi.z,fi.y,jn.z,0,-jn.x,Qn.z,0,-Qn.x,fi.z,0,-fi.x,-jn.y,jn.x,0,-Qn.y,Qn.x,0,-fi.y,fi.x,0];return!Qr(e,zi,Bi,ki,Ks)||(e=[1,0,0,0,1,0,0,0,1],!Qr(e,zi,Bi,ki,Ks))?!1:(Js.crossVectors(jn,Qn),e=[Js.x,Js.y,Js.z],Qr(e,zi,Bi,ki,Ks))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,mn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(mn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Pn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Pn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Pn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Pn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Pn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Pn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Pn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Pn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Pn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Pn=[new b,new b,new b,new b,new b,new b,new b,new b],mn=new b,Zs=new Hs,zi=new b,Bi=new b,ki=new b,jn=new b,Qn=new b,fi=new b,_s=new b,Ks=new b,Js=new b,pi=new b;function Qr(n,t,e,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){pi.fromArray(n,r);const a=s.x*Math.abs(pi.x)+s.y*Math.abs(pi.y)+s.z*Math.abs(pi.z),l=t.dot(pi),c=e.dot(pi),u=i.dot(pi);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const Pd=new Hs,vs=new b,to=new b;class Vs{constructor(t=new b,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):Pd.setFromPoints(t).getCenter(i);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;vs.subVectors(t,this.center);const e=vs.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(vs,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(to.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(vs.copy(t.center).add(to)),this.expandByPoint(vs.copy(t.center).sub(to))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Ln=new b,eo=new b,js=new b,ti=new b,no=new b,Qs=new b,io=new b;class Vr{constructor(t=new b,e=new b(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Ln)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Ln.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Ln.copy(this.origin).addScaledVector(this.direction,e),Ln.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){eo.copy(t).add(e).multiplyScalar(.5),js.copy(e).sub(t).normalize(),ti.copy(this.origin).sub(eo);const r=t.distanceTo(e)*.5,o=-this.direction.dot(js),a=ti.dot(this.direction),l=-ti.dot(js),c=ti.lengthSq(),u=Math.abs(1-o*o);let d,h,p,f;if(u>0)if(d=o*l-a,h=o*a-l,f=r*u,d>=0)if(h>=-f)if(h<=f){const v=1/u;d*=v,h*=v,p=d*(d+o*h+2*a)+h*(o*d+h+2*l)+c}else h=r,d=Math.max(0,-(o*h+a)),p=-d*d+h*(h+2*l)+c;else h=-r,d=Math.max(0,-(o*h+a)),p=-d*d+h*(h+2*l)+c;else h<=-f?(d=Math.max(0,-(-o*r+a)),h=d>0?-r:Math.min(Math.max(-r,-l),r),p=-d*d+h*(h+2*l)+c):h<=f?(d=0,h=Math.min(Math.max(-r,-l),r),p=h*(h+2*l)+c):(d=Math.max(0,-(o*r+a)),h=d>0?r:Math.min(Math.max(-r,-l),r),p=-d*d+h*(h+2*l)+c);else h=o>0?-r:r,d=Math.max(0,-(o*h+a)),p=-d*d+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(eo).addScaledVector(js,h),p}intersectSphere(t,e){Ln.subVectors(t.center,this.origin);const i=Ln.dot(this.direction),s=Ln.dot(Ln)-i*i,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return c>=0?(i=(t.min.x-h.x)*c,s=(t.max.x-h.x)*c):(i=(t.max.x-h.x)*c,s=(t.min.x-h.x)*c),u>=0?(r=(t.min.y-h.y)*u,o=(t.max.y-h.y)*u):(r=(t.max.y-h.y)*u,o=(t.min.y-h.y)*u),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),d>=0?(a=(t.min.z-h.z)*d,l=(t.max.z-h.z)*d):(a=(t.max.z-h.z)*d,l=(t.min.z-h.z)*d),i>l||a>s)||((a>i||i!==i)&&(i=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,Ln)!==null}intersectTriangle(t,e,i,s,r){no.subVectors(e,t),Qs.subVectors(i,t),io.crossVectors(no,Qs);let o=this.direction.dot(io),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ti.subVectors(this.origin,t);const l=a*this.direction.dot(Qs.crossVectors(ti,Qs));if(l<0)return null;const c=a*this.direction.dot(no.cross(ti));if(c<0||l+c>o)return null;const u=-a*ti.dot(io);return u<0?null:this.at(u/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ve{constructor(t,e,i,s,r,o,a,l,c,u,d,h,p,f,v,g){ve.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,l,c,u,d,h,p,f,v,g)}set(t,e,i,s,r,o,a,l,c,u,d,h,p,f,v,g){const m=this.elements;return m[0]=t,m[4]=e,m[8]=i,m[12]=s,m[1]=r,m[5]=o,m[9]=a,m[13]=l,m[2]=c,m[6]=u,m[10]=d,m[14]=h,m[3]=p,m[7]=f,m[11]=v,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ve().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,s=1/Gi.setFromMatrixColumn(t,0).length(),r=1/Gi.setFromMatrixColumn(t,1).length(),o=1/Gi.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*o,e[9]=i[9]*o,e[10]=i[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,s=t.y,r=t.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){const h=o*u,p=o*d,f=a*u,v=a*d;e[0]=l*u,e[4]=-l*d,e[8]=c,e[1]=p+f*c,e[5]=h-v*c,e[9]=-a*l,e[2]=v-h*c,e[6]=f+p*c,e[10]=o*l}else if(t.order==="YXZ"){const h=l*u,p=l*d,f=c*u,v=c*d;e[0]=h+v*a,e[4]=f*a-p,e[8]=o*c,e[1]=o*d,e[5]=o*u,e[9]=-a,e[2]=p*a-f,e[6]=v+h*a,e[10]=o*l}else if(t.order==="ZXY"){const h=l*u,p=l*d,f=c*u,v=c*d;e[0]=h-v*a,e[4]=-o*d,e[8]=f+p*a,e[1]=p+f*a,e[5]=o*u,e[9]=v-h*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const h=o*u,p=o*d,f=a*u,v=a*d;e[0]=l*u,e[4]=f*c-p,e[8]=h*c+v,e[1]=l*d,e[5]=v*c+h,e[9]=p*c-f,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const h=o*l,p=o*c,f=a*l,v=a*c;e[0]=l*u,e[4]=v-h*d,e[8]=f*d+p,e[1]=d,e[5]=o*u,e[9]=-a*u,e[2]=-c*u,e[6]=p*d+f,e[10]=h-v*d}else if(t.order==="XZY"){const h=o*l,p=o*c,f=a*l,v=a*c;e[0]=l*u,e[4]=-d,e[8]=c*u,e[1]=h*d+v,e[5]=o*u,e[9]=p*d-f,e[2]=f*d-p,e[6]=a*u,e[10]=v*d+h}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Ld,t,Id)}lookAt(t,e,i){const s=this.elements;return sn.subVectors(t,e),sn.lengthSq()===0&&(sn.z=1),sn.normalize(),ei.crossVectors(i,sn),ei.lengthSq()===0&&(Math.abs(i.z)===1?sn.x+=1e-4:sn.z+=1e-4,sn.normalize(),ei.crossVectors(i,sn)),ei.normalize(),tr.crossVectors(sn,ei),s[0]=ei.x,s[4]=tr.x,s[8]=sn.x,s[1]=ei.y,s[5]=tr.y,s[9]=sn.y,s[2]=ei.z,s[6]=tr.z,s[10]=sn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],u=i[1],d=i[5],h=i[9],p=i[13],f=i[2],v=i[6],g=i[10],m=i[14],S=i[3],x=i[7],y=i[11],U=i[15],P=s[0],R=s[4],L=s[8],_=s[12],M=s[1],T=s[5],I=s[9],B=s[13],Z=s[2],nt=s[6],K=s[10],rt=s[14],Y=s[3],dt=s[7],pt=s[11],Rt=s[15];return r[0]=o*P+a*M+l*Z+c*Y,r[4]=o*R+a*T+l*nt+c*dt,r[8]=o*L+a*I+l*K+c*pt,r[12]=o*_+a*B+l*rt+c*Rt,r[1]=u*P+d*M+h*Z+p*Y,r[5]=u*R+d*T+h*nt+p*dt,r[9]=u*L+d*I+h*K+p*pt,r[13]=u*_+d*B+h*rt+p*Rt,r[2]=f*P+v*M+g*Z+m*Y,r[6]=f*R+v*T+g*nt+m*dt,r[10]=f*L+v*I+g*K+m*pt,r[14]=f*_+v*B+g*rt+m*Rt,r[3]=S*P+x*M+y*Z+U*Y,r[7]=S*R+x*T+y*nt+U*dt,r[11]=S*L+x*I+y*K+U*pt,r[15]=S*_+x*B+y*rt+U*Rt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],u=t[2],d=t[6],h=t[10],p=t[14],f=t[3],v=t[7],g=t[11],m=t[15];return f*(+r*l*d-s*c*d-r*a*h+i*c*h+s*a*p-i*l*p)+v*(+e*l*p-e*c*h+r*o*h-s*o*p+s*c*u-r*l*u)+g*(+e*c*d-e*a*p-r*o*d+i*o*p+r*a*u-i*c*u)+m*(-s*a*u-e*l*d+e*a*h+s*o*d-i*o*h+i*l*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],d=t[9],h=t[10],p=t[11],f=t[12],v=t[13],g=t[14],m=t[15],S=d*g*c-v*h*c+v*l*p-a*g*p-d*l*m+a*h*m,x=f*h*c-u*g*c-f*l*p+o*g*p+u*l*m-o*h*m,y=u*v*c-f*d*c+f*a*p-o*v*p-u*a*m+o*d*m,U=f*d*l-u*v*l-f*a*h+o*v*h+u*a*g-o*d*g,P=e*S+i*x+s*y+r*U;if(P===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/P;return t[0]=S*R,t[1]=(v*h*r-d*g*r-v*s*p+i*g*p+d*s*m-i*h*m)*R,t[2]=(a*g*r-v*l*r+v*s*c-i*g*c-a*s*m+i*l*m)*R,t[3]=(d*l*r-a*h*r-d*s*c+i*h*c+a*s*p-i*l*p)*R,t[4]=x*R,t[5]=(u*g*r-f*h*r+f*s*p-e*g*p-u*s*m+e*h*m)*R,t[6]=(f*l*r-o*g*r-f*s*c+e*g*c+o*s*m-e*l*m)*R,t[7]=(o*h*r-u*l*r+u*s*c-e*h*c-o*s*p+e*l*p)*R,t[8]=y*R,t[9]=(f*d*r-u*v*r-f*i*p+e*v*p+u*i*m-e*d*m)*R,t[10]=(o*v*r-f*a*r+f*i*c-e*v*c-o*i*m+e*a*m)*R,t[11]=(u*a*r-o*d*r-u*i*c+e*d*c+o*i*p-e*a*p)*R,t[12]=U*R,t[13]=(u*v*s-f*d*s+f*i*h-e*v*h-u*i*g+e*d*g)*R,t[14]=(f*a*s-o*v*s-f*i*l+e*v*l+o*i*g-e*a*g)*R,t[15]=(o*d*s-u*a*s+u*i*l-e*d*l-o*i*h+e*a*h)*R,this}scale(t){const e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),s=Math.sin(e),r=1-i,o=t.x,a=t.y,l=t.z,c=r*o,u=r*a;return this.set(c*o+i,c*a-s*l,c*l+s*a,0,c*a+s*l,u*a+i,u*l-s*o,0,c*l-s*a,u*l+s*o,r*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,o){return this.set(1,i,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){const s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,u=o+o,d=a+a,h=r*c,p=r*u,f=r*d,v=o*u,g=o*d,m=a*d,S=l*c,x=l*u,y=l*d,U=i.x,P=i.y,R=i.z;return s[0]=(1-(v+m))*U,s[1]=(p+y)*U,s[2]=(f-x)*U,s[3]=0,s[4]=(p-y)*P,s[5]=(1-(h+m))*P,s[6]=(g+S)*P,s[7]=0,s[8]=(f+x)*R,s[9]=(g-S)*R,s[10]=(1-(h+v))*R,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){const s=this.elements;let r=Gi.set(s[0],s[1],s[2]).length();const o=Gi.set(s[4],s[5],s[6]).length(),a=Gi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],gn.copy(this);const c=1/r,u=1/o,d=1/a;return gn.elements[0]*=c,gn.elements[1]*=c,gn.elements[2]*=c,gn.elements[4]*=u,gn.elements[5]*=u,gn.elements[6]*=u,gn.elements[8]*=d,gn.elements[9]*=d,gn.elements[10]*=d,e.setFromRotationMatrix(gn),i.x=r,i.y=o,i.z=a,this}makePerspective(t,e,i,s,r,o,a=Bn){const l=this.elements,c=2*r/(e-t),u=2*r/(i-s),d=(e+t)/(e-t),h=(i+s)/(i-s);let p,f;if(a===Bn)p=-(o+r)/(o-r),f=-2*o*r/(o-r);else if(a===Lr)p=-o/(o-r),f=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=f,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,s,r,o,a=Bn){const l=this.elements,c=1/(e-t),u=1/(i-s),d=1/(o-r),h=(e+t)*c,p=(i+s)*u;let f,v;if(a===Bn)f=(o+r)*d,v=-2*d;else if(a===Lr)f=r*d,v=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-h,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=v,l[14]=-f,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const Gi=new b,gn=new ve,Ld=new b(0,0,0),Id=new b(1,1,1),ei=new b,tr=new b,sn=new b,_l=new ve,vl=new Gs;class xn{constructor(t=0,e=0,i=0,s=xn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],u=s[9],d=s[2],h=s[6],p=s[10];switch(e){case"XYZ":this._y=Math.asin(Ge(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ge(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ge(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ge(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Ge(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Ge(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return _l.makeRotationFromQuaternion(t),this.setFromRotationMatrix(_l,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return vl.setFromEuler(this),this.setFromQuaternion(vl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}xn.DEFAULT_ORDER="XYZ";class Ga{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Dd=0;const Ml=new b,Hi=new Gs,In=new ve,er=new b,Ms=new b,Ud=new b,Nd=new Gs,yl=new b(1,0,0),Sl=new b(0,1,0),xl=new b(0,0,1),wl={type:"added"},Fd={type:"removed"},Vi={type:"childadded",child:null},so={type:"childremoved",child:null};class Ie extends fs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Dd++}),this.uuid=kn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ie.DEFAULT_UP.clone();const t=new b,e=new xn,i=new Gs,s=new b(1,1,1);function r(){i.setFromEuler(e,!1)}function o(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ve},normalMatrix:{value:new Zt}}),this.matrix=new ve,this.matrixWorld=new ve,this.matrixAutoUpdate=Ie.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ie.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ga,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Hi.setFromAxisAngle(t,e),this.quaternion.multiply(Hi),this}rotateOnWorldAxis(t,e){return Hi.setFromAxisAngle(t,e),this.quaternion.premultiply(Hi),this}rotateX(t){return this.rotateOnAxis(yl,t)}rotateY(t){return this.rotateOnAxis(Sl,t)}rotateZ(t){return this.rotateOnAxis(xl,t)}translateOnAxis(t,e){return Ml.copy(t).applyQuaternion(this.quaternion),this.position.add(Ml.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(yl,t)}translateY(t){return this.translateOnAxis(Sl,t)}translateZ(t){return this.translateOnAxis(xl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(In.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?er.copy(t):er.set(t,e,i);const s=this.parent;this.updateWorldMatrix(!0,!1),Ms.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?In.lookAt(Ms,er,this.up):In.lookAt(er,Ms,this.up),this.quaternion.setFromRotationMatrix(In),s&&(In.extractRotation(s.matrixWorld),Hi.setFromRotationMatrix(In),this.quaternion.premultiply(Hi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(wl),Vi.child=t,this.dispatchEvent(Vi),Vi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Fd),so.child=t,this.dispatchEvent(so),so.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),In.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),In.multiply(t.parent.matrixWorld)),t.applyMatrix4(In),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(wl),Vi.child=t,this.dispatchEvent(Vi),Vi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ms,t,Ud),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ms,Nd,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];r(t.shapes,d)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),u=o(t.images),d=o(t.shapes),h=o(t.skeletons),p=o(t.animations),f=o(t.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),d.length>0&&(i.shapes=d),h.length>0&&(i.skeletons=h),p.length>0&&(i.animations=p),f.length>0&&(i.nodes=f)}return i.object=s,i;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const s=t.children[i];this.add(s.clone())}return this}}Ie.DEFAULT_UP=new b(0,1,0);Ie.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ie.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const _n=new b,Dn=new b,ro=new b,Un=new b,Wi=new b,Xi=new b,bl=new b,oo=new b,ao=new b,lo=new b,co=new ge,uo=new ge,ho=new ge;class hn{constructor(t=new b,e=new b,i=new b){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),_n.subVectors(t,e),s.cross(_n);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){_n.subVectors(s,e),Dn.subVectors(i,e),ro.subVectors(t,e);const o=_n.dot(_n),a=_n.dot(Dn),l=_n.dot(ro),c=Dn.dot(Dn),u=Dn.dot(ro),d=o*c-a*a;if(d===0)return r.set(0,0,0),null;const h=1/d,p=(c*l-a*u)*h,f=(o*u-a*l)*h;return r.set(1-p-f,f,p)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,Un)===null?!1:Un.x>=0&&Un.y>=0&&Un.x+Un.y<=1}static getInterpolation(t,e,i,s,r,o,a,l){return this.getBarycoord(t,e,i,s,Un)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Un.x),l.addScaledVector(o,Un.y),l.addScaledVector(a,Un.z),l)}static getInterpolatedAttribute(t,e,i,s,r,o){return co.setScalar(0),uo.setScalar(0),ho.setScalar(0),co.fromBufferAttribute(t,e),uo.fromBufferAttribute(t,i),ho.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(co,r.x),o.addScaledVector(uo,r.y),o.addScaledVector(ho,r.z),o}static isFrontFacing(t,e,i,s){return _n.subVectors(i,e),Dn.subVectors(t,e),_n.cross(Dn).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return _n.subVectors(this.c,this.b),Dn.subVectors(this.a,this.b),_n.cross(Dn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return hn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return hn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return hn.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return hn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return hn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,s=this.b,r=this.c;let o,a;Wi.subVectors(s,i),Xi.subVectors(r,i),oo.subVectors(t,i);const l=Wi.dot(oo),c=Xi.dot(oo);if(l<=0&&c<=0)return e.copy(i);ao.subVectors(t,s);const u=Wi.dot(ao),d=Xi.dot(ao);if(u>=0&&d<=u)return e.copy(s);const h=l*d-u*c;if(h<=0&&l>=0&&u<=0)return o=l/(l-u),e.copy(i).addScaledVector(Wi,o);lo.subVectors(t,r);const p=Wi.dot(lo),f=Xi.dot(lo);if(f>=0&&p<=f)return e.copy(r);const v=p*c-l*f;if(v<=0&&c>=0&&f<=0)return a=c/(c-f),e.copy(i).addScaledVector(Xi,a);const g=u*f-p*d;if(g<=0&&d-u>=0&&p-f>=0)return bl.subVectors(r,s),a=(d-u)/(d-u+(p-f)),e.copy(s).addScaledVector(bl,a);const m=1/(g+v+h);return o=v*m,a=h*m,e.copy(i).addScaledVector(Wi,o).addScaledVector(Xi,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Oc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ni={h:0,s:0,l:0},nr={h:0,s:0,l:0};function fo(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class Tt{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=me){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,re.toWorkingColorSpace(this,e),this}setRGB(t,e,i,s=re.workingColorSpace){return this.r=t,this.g=e,this.b=i,re.toWorkingColorSpace(this,s),this}setHSL(t,e,i,s=re.workingColorSpace){if(t=ka(t,1),e=Ge(e,0,1),i=Ge(i,0,1),e===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+e):i+e-i*e,o=2*i-r;this.r=fo(o,r,t+1/3),this.g=fo(o,r,t),this.b=fo(o,r,t-1/3)}return re.toWorkingColorSpace(this,s),this}setStyle(t,e=me){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=me){const i=Oc[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Gn(t.r),this.g=Gn(t.g),this.b=Gn(t.b),this}copyLinearToSRGB(t){return this.r=is(t.r),this.g=is(t.g),this.b=is(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=me){return re.fromWorkingColorSpace(We.copy(this),t),Math.round(Ge(We.r*255,0,255))*65536+Math.round(Ge(We.g*255,0,255))*256+Math.round(Ge(We.b*255,0,255))}getHexString(t=me){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=re.workingColorSpace){re.fromWorkingColorSpace(We.copy(this),e);const i=We.r,s=We.g,r=We.b,o=Math.max(i,s,r),a=Math.min(i,s,r);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const d=o-a;switch(c=u<=.5?d/(o+a):d/(2-o-a),o){case i:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-i)/d+2;break;case r:l=(i-s)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=re.workingColorSpace){return re.fromWorkingColorSpace(We.copy(this),e),t.r=We.r,t.g=We.g,t.b=We.b,t}getStyle(t=me){re.fromWorkingColorSpace(We.copy(this),t);const e=We.r,i=We.g,s=We.b;return t!==me?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(ni),this.setHSL(ni.h+t,ni.s+e,ni.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(ni),t.getHSL(nr);const i=Is(ni.h,nr.h,e),s=Is(ni.s,nr.s,e),r=Is(ni.l,nr.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const We=new Tt;Tt.NAMES=Oc;let Od=0;class qn extends fs{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Od++}),this.uuid=kn(),this.name="",this.blending=Ri,this.side=ui,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ko,this.blendDst=Go,this.blendEquation=Ei,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Tt(0,0,0),this.blendAlpha=0,this.depthFunc=os,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=al,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Fi,this.stencilZFail=Fi,this.stencilZPass=Fi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Ri&&(i.blending=this.blending),this.side!==ui&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==ko&&(i.blendSrc=this.blendSrc),this.blendDst!==Go&&(i.blendDst=this.blendDst),this.blendEquation!==Ei&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==os&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==al&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Fi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Fi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Fi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Je extends qn{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Tt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new xn,this.combine=Ia,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Pe=new b,ir=new Ct;class ze{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=ba,this.updateRanges=[],this.gpuType=zn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)ir.fromBufferAttribute(this,e),ir.applyMatrix3(t),this.setXY(e,ir.x,ir.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Pe.fromBufferAttribute(this,e),Pe.applyMatrix3(t),this.setXYZ(e,Pe.x,Pe.y,Pe.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Pe.fromBufferAttribute(this,e),Pe.applyMatrix4(t),this.setXYZ(e,Pe.x,Pe.y,Pe.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Pe.fromBufferAttribute(this,e),Pe.applyNormalMatrix(t),this.setXYZ(e,Pe.x,Pe.y,Pe.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Pe.fromBufferAttribute(this,e),Pe.transformDirection(t),this.setXYZ(e,Pe.x,Pe.y,Pe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=vn(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=de(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=vn(e,this.array)),e}setX(t,e){return this.normalized&&(e=de(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=vn(e,this.array)),e}setY(t,e){return this.normalized&&(e=de(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=vn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=de(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=vn(e,this.array)),e}setW(t,e){return this.normalized&&(e=de(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=de(e,this.array),i=de(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=de(e,this.array),i=de(i,this.array),s=de(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=de(e,this.array),i=de(i,this.array),s=de(s,this.array),r=de(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==ba&&(t.usage=this.usage),t}}class zc extends ze{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class Bc extends ze{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class we extends ze{constructor(t,e,i){super(new Float32Array(t),e,i)}}let zd=0;const dn=new ve,po=new Ie,qi=new b,rn=new Hs,ys=new Hs,Oe=new b;class Ce extends fs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:zd++}),this.uuid=kn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Uc(t)?Bc:zc)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Zt().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return dn.makeRotationFromQuaternion(t),this.applyMatrix4(dn),this}rotateX(t){return dn.makeRotationX(t),this.applyMatrix4(dn),this}rotateY(t){return dn.makeRotationY(t),this.applyMatrix4(dn),this}rotateZ(t){return dn.makeRotationZ(t),this.applyMatrix4(dn),this}translate(t,e,i){return dn.makeTranslation(t,e,i),this.applyMatrix4(dn),this}scale(t,e,i){return dn.makeScale(t,e,i),this.applyMatrix4(dn),this}lookAt(t){return po.lookAt(t),po.updateMatrix(),this.applyMatrix4(po.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(qi).negate(),this.translate(qi.x,qi.y,qi.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new we(i,3))}else{for(let i=0,s=e.count;i<s;i++){const r=t[i];e.setXYZ(i,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Hs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new b(-1/0,-1/0,-1/0),new b(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){const r=e[i];rn.setFromBufferAttribute(r),this.morphTargetsRelative?(Oe.addVectors(this.boundingBox.min,rn.min),this.boundingBox.expandByPoint(Oe),Oe.addVectors(this.boundingBox.max,rn.max),this.boundingBox.expandByPoint(Oe)):(this.boundingBox.expandByPoint(rn.min),this.boundingBox.expandByPoint(rn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Vs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new b,1/0);return}if(t){const i=this.boundingSphere.center;if(rn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];ys.setFromBufferAttribute(a),this.morphTargetsRelative?(Oe.addVectors(rn.min,ys.min),rn.expandByPoint(Oe),Oe.addVectors(rn.max,ys.max),rn.expandByPoint(Oe)):(rn.expandByPoint(ys.min),rn.expandByPoint(ys.max))}rn.getCenter(i);let s=0;for(let r=0,o=t.count;r<o;r++)Oe.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(Oe));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Oe.fromBufferAttribute(a,c),l&&(qi.fromBufferAttribute(t,c),Oe.add(qi)),s=Math.max(s,i.distanceToSquared(Oe))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ze(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let L=0;L<i.count;L++)a[L]=new b,l[L]=new b;const c=new b,u=new b,d=new b,h=new Ct,p=new Ct,f=new Ct,v=new b,g=new b;function m(L,_,M){c.fromBufferAttribute(i,L),u.fromBufferAttribute(i,_),d.fromBufferAttribute(i,M),h.fromBufferAttribute(r,L),p.fromBufferAttribute(r,_),f.fromBufferAttribute(r,M),u.sub(c),d.sub(c),p.sub(h),f.sub(h);const T=1/(p.x*f.y-f.x*p.y);isFinite(T)&&(v.copy(u).multiplyScalar(f.y).addScaledVector(d,-p.y).multiplyScalar(T),g.copy(d).multiplyScalar(p.x).addScaledVector(u,-f.x).multiplyScalar(T),a[L].add(v),a[_].add(v),a[M].add(v),l[L].add(g),l[_].add(g),l[M].add(g))}let S=this.groups;S.length===0&&(S=[{start:0,count:t.count}]);for(let L=0,_=S.length;L<_;++L){const M=S[L],T=M.start,I=M.count;for(let B=T,Z=T+I;B<Z;B+=3)m(t.getX(B+0),t.getX(B+1),t.getX(B+2))}const x=new b,y=new b,U=new b,P=new b;function R(L){U.fromBufferAttribute(s,L),P.copy(U);const _=a[L];x.copy(_),x.sub(U.multiplyScalar(U.dot(_))).normalize(),y.crossVectors(P,_);const T=y.dot(l[L])<0?-1:1;o.setXYZW(L,x.x,x.y,x.z,T)}for(let L=0,_=S.length;L<_;++L){const M=S[L],T=M.start,I=M.count;for(let B=T,Z=T+I;B<Z;B+=3)R(t.getX(B+0)),R(t.getX(B+1)),R(t.getX(B+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new ze(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let h=0,p=i.count;h<p;h++)i.setXYZ(h,0,0,0);const s=new b,r=new b,o=new b,a=new b,l=new b,c=new b,u=new b,d=new b;if(t)for(let h=0,p=t.count;h<p;h+=3){const f=t.getX(h+0),v=t.getX(h+1),g=t.getX(h+2);s.fromBufferAttribute(e,f),r.fromBufferAttribute(e,v),o.fromBufferAttribute(e,g),u.subVectors(o,r),d.subVectors(s,r),u.cross(d),a.fromBufferAttribute(i,f),l.fromBufferAttribute(i,v),c.fromBufferAttribute(i,g),a.add(u),l.add(u),c.add(u),i.setXYZ(f,a.x,a.y,a.z),i.setXYZ(v,l.x,l.y,l.z),i.setXYZ(g,c.x,c.y,c.z)}else for(let h=0,p=e.count;h<p;h+=3)s.fromBufferAttribute(e,h+0),r.fromBufferAttribute(e,h+1),o.fromBufferAttribute(e,h+2),u.subVectors(o,r),d.subVectors(s,r),u.cross(d),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Oe.fromBufferAttribute(t,e),Oe.normalize(),t.setXYZ(e,Oe.x,Oe.y,Oe.z)}toNonIndexed(){function t(a,l){const c=a.array,u=a.itemSize,d=a.normalized,h=new c.constructor(l.length*u);let p=0,f=0;for(let v=0,g=l.length;v<g;v++){a.isInterleavedBufferAttribute?p=l[v]*a.data.stride+a.offset:p=l[v]*u;for(let m=0;m<u;m++)h[f++]=c[p++]}return new ze(h,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Ce,i=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=t(l,i);e.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let u=0,d=c.length;u<d;u++){const h=c[u],p=t(h,i);l.push(p)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const l in i){const c=i[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,h=c.length;d<h;d++){const p=c[d];u.push(p.toJSON(t.data))}u.length>0&&(s[l]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone(e));const s=t.attributes;for(const c in s){const u=s[c];this.setAttribute(c,u.clone(e))}const r=t.morphAttributes;for(const c in r){const u=[],d=r[c];for(let h=0,p=d.length;h<p;h++)u.push(d[h].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,u=o.length;c<u;c++){const d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const El=new ve,mi=new Vr,sr=new Vs,Tl=new b,rr=new b,or=new b,ar=new b,mo=new b,lr=new b,Al=new b,cr=new b;class D extends Ie{constructor(t=new Ce,e=new Je){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){lr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const u=a[l],d=r[l];u!==0&&(mo.fromBufferAttribute(d,t),o?lr.addScaledVector(mo,u):lr.addScaledVector(mo.sub(e),u))}e.add(lr)}return e}raycast(t,e){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),sr.copy(i.boundingSphere),sr.applyMatrix4(r),mi.copy(t.ray).recast(t.near),!(sr.containsPoint(mi.origin)===!1&&(mi.intersectSphere(sr,Tl)===null||mi.origin.distanceToSquared(Tl)>(t.far-t.near)**2))&&(El.copy(r).invert(),mi.copy(t.ray).applyMatrix4(El),!(i.boundingBox!==null&&mi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,mi)))}_computeIntersections(t,e,i){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,d=r.attributes.normal,h=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let f=0,v=h.length;f<v;f++){const g=h[f],m=o[g.materialIndex],S=Math.max(g.start,p.start),x=Math.min(a.count,Math.min(g.start+g.count,p.start+p.count));for(let y=S,U=x;y<U;y+=3){const P=a.getX(y),R=a.getX(y+1),L=a.getX(y+2);s=ur(this,m,t,i,c,u,d,P,R,L),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const f=Math.max(0,p.start),v=Math.min(a.count,p.start+p.count);for(let g=f,m=v;g<m;g+=3){const S=a.getX(g),x=a.getX(g+1),y=a.getX(g+2);s=ur(this,o,t,i,c,u,d,S,x,y),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let f=0,v=h.length;f<v;f++){const g=h[f],m=o[g.materialIndex],S=Math.max(g.start,p.start),x=Math.min(l.count,Math.min(g.start+g.count,p.start+p.count));for(let y=S,U=x;y<U;y+=3){const P=y,R=y+1,L=y+2;s=ur(this,m,t,i,c,u,d,P,R,L),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const f=Math.max(0,p.start),v=Math.min(l.count,p.start+p.count);for(let g=f,m=v;g<m;g+=3){const S=g,x=g+1,y=g+2;s=ur(this,o,t,i,c,u,d,S,x,y),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}}}function Bd(n,t,e,i,s,r,o,a){let l;if(t.side===Xe?l=i.intersectTriangle(o,r,s,!0,a):l=i.intersectTriangle(s,r,o,t.side===ui,a),l===null)return null;cr.copy(a),cr.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(cr);return c<e.near||c>e.far?null:{distance:c,point:cr.clone(),object:n}}function ur(n,t,e,i,s,r,o,a,l,c){n.getVertexPosition(a,rr),n.getVertexPosition(l,or),n.getVertexPosition(c,ar);const u=Bd(n,t,e,i,rr,or,ar,Al);if(u){const d=new b;hn.getBarycoord(Al,rr,or,ar,d),s&&(u.uv=hn.getInterpolatedAttribute(s,a,l,c,d,new Ct)),r&&(u.uv1=hn.getInterpolatedAttribute(r,a,l,c,d,new Ct)),o&&(u.normal=hn.getInterpolatedAttribute(o,a,l,c,d,new b),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const h={a,b:l,c,normal:new b,materialIndex:0};hn.getNormal(rr,or,ar,h.normal),u.face=h,u.barycoord=d}return u}class ht extends Ce{constructor(t=1,e=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],u=[],d=[];let h=0,p=0;f("z","y","x",-1,-1,i,e,t,o,r,0),f("z","y","x",1,-1,i,e,-t,o,r,1),f("x","z","y",1,1,t,i,e,s,o,2),f("x","z","y",1,-1,t,i,-e,s,o,3),f("x","y","z",1,-1,t,e,i,s,r,4),f("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new we(c,3)),this.setAttribute("normal",new we(u,3)),this.setAttribute("uv",new we(d,2));function f(v,g,m,S,x,y,U,P,R,L,_){const M=y/R,T=U/L,I=y/2,B=U/2,Z=P/2,nt=R+1,K=L+1;let rt=0,Y=0;const dt=new b;for(let pt=0;pt<K;pt++){const Rt=pt*T-B;for(let Xt=0;Xt<nt;Xt++){const se=Xt*M-I;dt[v]=se*S,dt[g]=Rt*x,dt[m]=Z,c.push(dt.x,dt.y,dt.z),dt[v]=0,dt[g]=0,dt[m]=P>0?1:-1,u.push(dt.x,dt.y,dt.z),d.push(Xt/R),d.push(1-pt/L),rt+=1}}for(let pt=0;pt<L;pt++)for(let Rt=0;Rt<R;Rt++){const Xt=h+Rt+nt*pt,se=h+Rt+nt*(pt+1),j=h+(Rt+1)+nt*(pt+1),ut=h+(Rt+1)+nt*pt;l.push(Xt,se,ut),l.push(se,j,ut),Y+=6}a.addGroup(p,Y,_),p+=Y,h+=rt}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ht(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function ds(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const s=n[e][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone():Array.isArray(s)?t[e][i]=s.slice():t[e][i]=s}}return t}function Ze(n){const t={};for(let e=0;e<n.length;e++){const i=ds(n[e]);for(const s in i)t[s]=i[s]}return t}function kd(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function kc(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:re.workingColorSpace}const Gd={clone:ds,merge:Ze};var Hd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Vd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Xn extends qn{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Hd,this.fragmentShader=Vd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ds(t.uniforms),this.uniformsGroups=kd(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class Gc extends Ie{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ve,this.projectionMatrix=new ve,this.projectionMatrixInverse=new ve,this.coordinateSystem=Bn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ii=new b,Cl=new Ct,Rl=new Ct;class xe extends Gc{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=zs*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Ls*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return zs*2*Math.atan(Math.tan(Ls*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){ii.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(ii.x,ii.y).multiplyScalar(-t/ii.z),ii.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ii.x,ii.y).multiplyScalar(-t/ii.z)}getViewSize(t,e){return this.getViewBounds(t,Cl,Rl),e.subVectors(Rl,Cl)}setViewOffset(t,e,i,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Ls*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*i/c,s*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Yi=-90,$i=1;class Wd extends Ie{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new xe(Yi,$i,t,e);s.layers=this.layers,this.add(s);const r=new xe(Yi,$i,t,e);r.layers=this.layers,this.add(r);const o=new xe(Yi,$i,t,e);o.layers=this.layers,this.add(o);const a=new xe(Yi,$i,t,e);a.layers=this.layers,this.add(a);const l=new xe(Yi,$i,t,e);l.layers=this.layers,this.add(l);const c=new xe(Yi,$i,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,s,r,o,a,l]=e;for(const c of e)this.remove(c);if(t===Bn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Lr)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,u]=this.children,d=t.getRenderTarget(),h=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),f=t.xr.enabled;t.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,s),t.render(e,r),t.setRenderTarget(i,1,s),t.render(e,o),t.setRenderTarget(i,2,s),t.render(e,a),t.setRenderTarget(i,3,s),t.render(e,l),t.setRenderTarget(i,4,s),t.render(e,c),i.texture.generateMipmaps=v,t.setRenderTarget(i,5,s),t.render(e,u),t.setRenderTarget(d,h,p),t.xr.enabled=f,i.texture.needsPMREMUpdate=!0}}class Hc extends je{constructor(t,e,i,s,r,o,a,l,c,u){t=t!==void 0?t:[],e=e!==void 0?e:as,super(t,e,i,s,r,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Xd extends Li{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new Hc(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Tn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new ht(5,5,5),r=new Xn({name:"CubemapFromEquirect",uniforms:ds(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Xe,blending:li});r.uniforms.tEquirect.value=e;const o=new D(s,r),a=e.minFilter;return e.minFilter===Ci&&(e.minFilter=Tn),new Wd(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,i,s){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,i,s);t.setRenderTarget(r)}}const go=new b,qd=new b,Yd=new Zt;class wi{constructor(t=new b(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const s=go.subVectors(i,e).cross(qd.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(go),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(i,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||Yd.getNormalMatrix(t),s=this.coplanarPoint(go).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const gi=new Vs,dr=new b;class Ha{constructor(t=new wi,e=new wi,i=new wi,s=new wi,r=new wi,o=new wi){this.planes=[t,e,i,s,r,o]}set(t,e,i,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=Bn){const i=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],l=s[3],c=s[4],u=s[5],d=s[6],h=s[7],p=s[8],f=s[9],v=s[10],g=s[11],m=s[12],S=s[13],x=s[14],y=s[15];if(i[0].setComponents(l-r,h-c,g-p,y-m).normalize(),i[1].setComponents(l+r,h+c,g+p,y+m).normalize(),i[2].setComponents(l+o,h+u,g+f,y+S).normalize(),i[3].setComponents(l-o,h-u,g-f,y-S).normalize(),i[4].setComponents(l-a,h-d,g-v,y-x).normalize(),e===Bn)i[5].setComponents(l+a,h+d,g+v,y+x).normalize();else if(e===Lr)i[5].setComponents(a,d,v,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),gi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),gi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(gi)}intersectsSprite(t){return gi.center.set(0,0,0),gi.radius=.7071067811865476,gi.applyMatrix4(t.matrixWorld),this.intersectsSphere(gi)}intersectsSphere(t){const e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const s=e[i];if(dr.x=s.normal.x>0?t.max.x:t.min.x,dr.y=s.normal.y>0?t.max.y:t.min.y,dr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(dr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Vc(){let n=null,t=!1,e=null,i=null;function s(r,o){e(r,o),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function $d(n){const t=new WeakMap;function e(a,l){const c=a.array,u=a.usage,d=c.byteLength,h=n.createBuffer();n.bindBuffer(l,h),n.bufferData(l,c,u),a.onUploadCallback();let p;if(c instanceof Float32Array)p=n.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=n.SHORT;else if(c instanceof Uint32Array)p=n.UNSIGNED_INT;else if(c instanceof Int32Array)p=n.INT;else if(c instanceof Int8Array)p=n.BYTE;else if(c instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function i(a,l,c){const u=l.array,d=l.updateRanges;if(n.bindBuffer(c,a),d.length===0)n.bufferSubData(c,0,u);else{d.sort((p,f)=>p.start-f.start);let h=0;for(let p=1;p<d.length;p++){const f=d[h],v=d[p];v.start<=f.start+f.count+1?f.count=Math.max(f.count,v.start+v.count-f.start):(++h,d[h]=v)}d.length=h+1;for(let p=0,f=d.length;p<f;p++){const v=d[p];n.bufferSubData(c,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(n.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}class Yt extends Ce{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(i),l=Math.floor(s),c=a+1,u=l+1,d=t/a,h=e/l,p=[],f=[],v=[],g=[];for(let m=0;m<u;m++){const S=m*h-o;for(let x=0;x<c;x++){const y=x*d-r;f.push(y,-S,0),v.push(0,0,1),g.push(x/a),g.push(1-m/l)}}for(let m=0;m<l;m++)for(let S=0;S<a;S++){const x=S+c*m,y=S+c*(m+1),U=S+1+c*(m+1),P=S+1+c*m;p.push(x,y,P),p.push(y,U,P)}this.setIndex(p),this.setAttribute("position",new we(f,3)),this.setAttribute("normal",new we(v,3)),this.setAttribute("uv",new we(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Yt(t.width,t.height,t.widthSegments,t.heightSegments)}}var Zd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Kd=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Jd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,jd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Qd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,th=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,eh=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,nh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ih=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,sh=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,rh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,oh=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,ah=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,lh=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,ch=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,uh=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,dh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,hh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,fh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ph=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,mh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,gh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,_h=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,vh=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Mh=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,yh=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Sh=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,xh=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,wh=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,bh=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Eh="gl_FragColor = linearToOutputTexel( gl_FragColor );",Th=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Ah=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Ch=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Rh=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Ph=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Lh=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Ih=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Dh=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Uh=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Nh=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Fh=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Oh=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,zh=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Bh=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,kh=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Gh=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Hh=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Vh=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Wh=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Xh=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,qh=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Yh=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,$h=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Zh=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Kh=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Jh=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,jh=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Qh=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,tf=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,ef=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,nf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,sf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,rf=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,of=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,af=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,lf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,cf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,uf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,df=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,hf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ff=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,pf=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,mf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,gf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,_f=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,vf=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Mf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,yf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Sf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,xf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,wf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,bf=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Ef=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Tf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Af=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Cf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Rf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Pf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Lf=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,If=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Df=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Uf=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Nf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Ff=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Of=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,zf=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Bf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,kf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Gf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Hf=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Vf=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Wf=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Xf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,qf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Yf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,$f=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Zf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Kf=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Jf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,jf=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Qf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,tp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ep=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,np=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,ip=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,sp=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,rp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,op=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ap=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,lp=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,cp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,up=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,dp=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,hp=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,fp=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,pp=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,mp=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,gp=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,_p=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,vp=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Mp=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,yp=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Sp=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,xp=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,wp=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,bp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Ep=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Tp=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ap=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Cp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Kt={alphahash_fragment:Zd,alphahash_pars_fragment:Kd,alphamap_fragment:Jd,alphamap_pars_fragment:jd,alphatest_fragment:Qd,alphatest_pars_fragment:th,aomap_fragment:eh,aomap_pars_fragment:nh,batching_pars_vertex:ih,batching_vertex:sh,begin_vertex:rh,beginnormal_vertex:oh,bsdfs:ah,iridescence_fragment:lh,bumpmap_pars_fragment:ch,clipping_planes_fragment:uh,clipping_planes_pars_fragment:dh,clipping_planes_pars_vertex:hh,clipping_planes_vertex:fh,color_fragment:ph,color_pars_fragment:mh,color_pars_vertex:gh,color_vertex:_h,common:vh,cube_uv_reflection_fragment:Mh,defaultnormal_vertex:yh,displacementmap_pars_vertex:Sh,displacementmap_vertex:xh,emissivemap_fragment:wh,emissivemap_pars_fragment:bh,colorspace_fragment:Eh,colorspace_pars_fragment:Th,envmap_fragment:Ah,envmap_common_pars_fragment:Ch,envmap_pars_fragment:Rh,envmap_pars_vertex:Ph,envmap_physical_pars_fragment:Gh,envmap_vertex:Lh,fog_vertex:Ih,fog_pars_vertex:Dh,fog_fragment:Uh,fog_pars_fragment:Nh,gradientmap_pars_fragment:Fh,lightmap_pars_fragment:Oh,lights_lambert_fragment:zh,lights_lambert_pars_fragment:Bh,lights_pars_begin:kh,lights_toon_fragment:Hh,lights_toon_pars_fragment:Vh,lights_phong_fragment:Wh,lights_phong_pars_fragment:Xh,lights_physical_fragment:qh,lights_physical_pars_fragment:Yh,lights_fragment_begin:$h,lights_fragment_maps:Zh,lights_fragment_end:Kh,logdepthbuf_fragment:Jh,logdepthbuf_pars_fragment:jh,logdepthbuf_pars_vertex:Qh,logdepthbuf_vertex:tf,map_fragment:ef,map_pars_fragment:nf,map_particle_fragment:sf,map_particle_pars_fragment:rf,metalnessmap_fragment:of,metalnessmap_pars_fragment:af,morphinstance_vertex:lf,morphcolor_vertex:cf,morphnormal_vertex:uf,morphtarget_pars_vertex:df,morphtarget_vertex:hf,normal_fragment_begin:ff,normal_fragment_maps:pf,normal_pars_fragment:mf,normal_pars_vertex:gf,normal_vertex:_f,normalmap_pars_fragment:vf,clearcoat_normal_fragment_begin:Mf,clearcoat_normal_fragment_maps:yf,clearcoat_pars_fragment:Sf,iridescence_pars_fragment:xf,opaque_fragment:wf,packing:bf,premultiplied_alpha_fragment:Ef,project_vertex:Tf,dithering_fragment:Af,dithering_pars_fragment:Cf,roughnessmap_fragment:Rf,roughnessmap_pars_fragment:Pf,shadowmap_pars_fragment:Lf,shadowmap_pars_vertex:If,shadowmap_vertex:Df,shadowmask_pars_fragment:Uf,skinbase_vertex:Nf,skinning_pars_vertex:Ff,skinning_vertex:Of,skinnormal_vertex:zf,specularmap_fragment:Bf,specularmap_pars_fragment:kf,tonemapping_fragment:Gf,tonemapping_pars_fragment:Hf,transmission_fragment:Vf,transmission_pars_fragment:Wf,uv_pars_fragment:Xf,uv_pars_vertex:qf,uv_vertex:Yf,worldpos_vertex:$f,background_vert:Zf,background_frag:Kf,backgroundCube_vert:Jf,backgroundCube_frag:jf,cube_vert:Qf,cube_frag:tp,depth_vert:ep,depth_frag:np,distanceRGBA_vert:ip,distanceRGBA_frag:sp,equirect_vert:rp,equirect_frag:op,linedashed_vert:ap,linedashed_frag:lp,meshbasic_vert:cp,meshbasic_frag:up,meshlambert_vert:dp,meshlambert_frag:hp,meshmatcap_vert:fp,meshmatcap_frag:pp,meshnormal_vert:mp,meshnormal_frag:gp,meshphong_vert:_p,meshphong_frag:vp,meshphysical_vert:Mp,meshphysical_frag:yp,meshtoon_vert:Sp,meshtoon_frag:xp,points_vert:wp,points_frag:bp,shadow_vert:Ep,shadow_frag:Tp,sprite_vert:Ap,sprite_frag:Cp},vt={common:{diffuse:{value:new Tt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Zt},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Zt}},envmap:{envMap:{value:null},envMapRotation:{value:new Zt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Zt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Zt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Zt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Zt},normalScale:{value:new Ct(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Zt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Zt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Zt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Zt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Tt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Tt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0},uvTransform:{value:new Zt}},sprite:{diffuse:{value:new Tt(16777215)},opacity:{value:1},center:{value:new Ct(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Zt},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0}}},En={basic:{uniforms:Ze([vt.common,vt.specularmap,vt.envmap,vt.aomap,vt.lightmap,vt.fog]),vertexShader:Kt.meshbasic_vert,fragmentShader:Kt.meshbasic_frag},lambert:{uniforms:Ze([vt.common,vt.specularmap,vt.envmap,vt.aomap,vt.lightmap,vt.emissivemap,vt.bumpmap,vt.normalmap,vt.displacementmap,vt.fog,vt.lights,{emissive:{value:new Tt(0)}}]),vertexShader:Kt.meshlambert_vert,fragmentShader:Kt.meshlambert_frag},phong:{uniforms:Ze([vt.common,vt.specularmap,vt.envmap,vt.aomap,vt.lightmap,vt.emissivemap,vt.bumpmap,vt.normalmap,vt.displacementmap,vt.fog,vt.lights,{emissive:{value:new Tt(0)},specular:{value:new Tt(1118481)},shininess:{value:30}}]),vertexShader:Kt.meshphong_vert,fragmentShader:Kt.meshphong_frag},standard:{uniforms:Ze([vt.common,vt.envmap,vt.aomap,vt.lightmap,vt.emissivemap,vt.bumpmap,vt.normalmap,vt.displacementmap,vt.roughnessmap,vt.metalnessmap,vt.fog,vt.lights,{emissive:{value:new Tt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Kt.meshphysical_vert,fragmentShader:Kt.meshphysical_frag},toon:{uniforms:Ze([vt.common,vt.aomap,vt.lightmap,vt.emissivemap,vt.bumpmap,vt.normalmap,vt.displacementmap,vt.gradientmap,vt.fog,vt.lights,{emissive:{value:new Tt(0)}}]),vertexShader:Kt.meshtoon_vert,fragmentShader:Kt.meshtoon_frag},matcap:{uniforms:Ze([vt.common,vt.bumpmap,vt.normalmap,vt.displacementmap,vt.fog,{matcap:{value:null}}]),vertexShader:Kt.meshmatcap_vert,fragmentShader:Kt.meshmatcap_frag},points:{uniforms:Ze([vt.points,vt.fog]),vertexShader:Kt.points_vert,fragmentShader:Kt.points_frag},dashed:{uniforms:Ze([vt.common,vt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Kt.linedashed_vert,fragmentShader:Kt.linedashed_frag},depth:{uniforms:Ze([vt.common,vt.displacementmap]),vertexShader:Kt.depth_vert,fragmentShader:Kt.depth_frag},normal:{uniforms:Ze([vt.common,vt.bumpmap,vt.normalmap,vt.displacementmap,{opacity:{value:1}}]),vertexShader:Kt.meshnormal_vert,fragmentShader:Kt.meshnormal_frag},sprite:{uniforms:Ze([vt.sprite,vt.fog]),vertexShader:Kt.sprite_vert,fragmentShader:Kt.sprite_frag},background:{uniforms:{uvTransform:{value:new Zt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Kt.background_vert,fragmentShader:Kt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Zt}},vertexShader:Kt.backgroundCube_vert,fragmentShader:Kt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Kt.cube_vert,fragmentShader:Kt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Kt.equirect_vert,fragmentShader:Kt.equirect_frag},distanceRGBA:{uniforms:Ze([vt.common,vt.displacementmap,{referencePosition:{value:new b},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Kt.distanceRGBA_vert,fragmentShader:Kt.distanceRGBA_frag},shadow:{uniforms:Ze([vt.lights,vt.fog,{color:{value:new Tt(0)},opacity:{value:1}}]),vertexShader:Kt.shadow_vert,fragmentShader:Kt.shadow_frag}};En.physical={uniforms:Ze([En.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Zt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Zt},clearcoatNormalScale:{value:new Ct(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Zt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Zt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Zt},sheen:{value:0},sheenColor:{value:new Tt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Zt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Zt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Zt},transmissionSamplerSize:{value:new Ct},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Zt},attenuationDistance:{value:0},attenuationColor:{value:new Tt(0)},specularColor:{value:new Tt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Zt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Zt},anisotropyVector:{value:new Ct},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Zt}}]),vertexShader:Kt.meshphysical_vert,fragmentShader:Kt.meshphysical_frag};const hr={r:0,b:0,g:0},_i=new xn,Rp=new ve;function Pp(n,t,e,i,s,r,o){const a=new Tt(0);let l=r===!0?0:1,c,u,d=null,h=0,p=null;function f(S){let x=S.isScene===!0?S.background:null;return x&&x.isTexture&&(x=(S.backgroundBlurriness>0?e:t).get(x)),x}function v(S){let x=!1;const y=f(S);y===null?m(a,l):y&&y.isColor&&(m(y,1),x=!0);const U=n.xr.getEnvironmentBlendMode();U==="additive"?i.buffers.color.setClear(0,0,0,1,o):U==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||x)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function g(S,x){const y=f(x);y&&(y.isCubeTexture||y.mapping===Gr)?(u===void 0&&(u=new D(new ht(1,1,1),new Xn({name:"BackgroundCubeMaterial",uniforms:ds(En.backgroundCube.uniforms),vertexShader:En.backgroundCube.vertexShader,fragmentShader:En.backgroundCube.fragmentShader,side:Xe,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(U,P,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),_i.copy(x.backgroundRotation),_i.x*=-1,_i.y*=-1,_i.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(_i.y*=-1,_i.z*=-1),u.material.uniforms.envMap.value=y,u.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Rp.makeRotationFromEuler(_i)),u.material.toneMapped=re.getTransfer(y.colorSpace)!==pe,(d!==y||h!==y.version||p!==n.toneMapping)&&(u.material.needsUpdate=!0,d=y,h=y.version,p=n.toneMapping),u.layers.enableAll(),S.unshift(u,u.geometry,u.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new D(new Yt(2,2),new Xn({name:"BackgroundMaterial",uniforms:ds(En.background.uniforms),vertexShader:En.background.vertexShader,fragmentShader:En.background.fragmentShader,side:ui,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=re.getTransfer(y.colorSpace)!==pe,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(d!==y||h!==y.version||p!==n.toneMapping)&&(c.material.needsUpdate=!0,d=y,h=y.version,p=n.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null))}function m(S,x){S.getRGB(hr,kc(n)),i.buffers.color.setClear(hr.r,hr.g,hr.b,x,o)}return{getClearColor:function(){return a},setClearColor:function(S,x=1){a.set(S),l=x,m(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(S){l=S,m(a,l)},render:v,addToRenderList:g}}function Lp(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=h(null);let r=s,o=!1;function a(M,T,I,B,Z){let nt=!1;const K=d(B,I,T);r!==K&&(r=K,c(r.object)),nt=p(M,B,I,Z),nt&&f(M,B,I,Z),Z!==null&&t.update(Z,n.ELEMENT_ARRAY_BUFFER),(nt||o)&&(o=!1,y(M,T,I,B),Z!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(Z).buffer))}function l(){return n.createVertexArray()}function c(M){return n.bindVertexArray(M)}function u(M){return n.deleteVertexArray(M)}function d(M,T,I){const B=I.wireframe===!0;let Z=i[M.id];Z===void 0&&(Z={},i[M.id]=Z);let nt=Z[T.id];nt===void 0&&(nt={},Z[T.id]=nt);let K=nt[B];return K===void 0&&(K=h(l()),nt[B]=K),K}function h(M){const T=[],I=[],B=[];for(let Z=0;Z<e;Z++)T[Z]=0,I[Z]=0,B[Z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:T,enabledAttributes:I,attributeDivisors:B,object:M,attributes:{},index:null}}function p(M,T,I,B){const Z=r.attributes,nt=T.attributes;let K=0;const rt=I.getAttributes();for(const Y in rt)if(rt[Y].location>=0){const pt=Z[Y];let Rt=nt[Y];if(Rt===void 0&&(Y==="instanceMatrix"&&M.instanceMatrix&&(Rt=M.instanceMatrix),Y==="instanceColor"&&M.instanceColor&&(Rt=M.instanceColor)),pt===void 0||pt.attribute!==Rt||Rt&&pt.data!==Rt.data)return!0;K++}return r.attributesNum!==K||r.index!==B}function f(M,T,I,B){const Z={},nt=T.attributes;let K=0;const rt=I.getAttributes();for(const Y in rt)if(rt[Y].location>=0){let pt=nt[Y];pt===void 0&&(Y==="instanceMatrix"&&M.instanceMatrix&&(pt=M.instanceMatrix),Y==="instanceColor"&&M.instanceColor&&(pt=M.instanceColor));const Rt={};Rt.attribute=pt,pt&&pt.data&&(Rt.data=pt.data),Z[Y]=Rt,K++}r.attributes=Z,r.attributesNum=K,r.index=B}function v(){const M=r.newAttributes;for(let T=0,I=M.length;T<I;T++)M[T]=0}function g(M){m(M,0)}function m(M,T){const I=r.newAttributes,B=r.enabledAttributes,Z=r.attributeDivisors;I[M]=1,B[M]===0&&(n.enableVertexAttribArray(M),B[M]=1),Z[M]!==T&&(n.vertexAttribDivisor(M,T),Z[M]=T)}function S(){const M=r.newAttributes,T=r.enabledAttributes;for(let I=0,B=T.length;I<B;I++)T[I]!==M[I]&&(n.disableVertexAttribArray(I),T[I]=0)}function x(M,T,I,B,Z,nt,K){K===!0?n.vertexAttribIPointer(M,T,I,Z,nt):n.vertexAttribPointer(M,T,I,B,Z,nt)}function y(M,T,I,B){v();const Z=B.attributes,nt=I.getAttributes(),K=T.defaultAttributeValues;for(const rt in nt){const Y=nt[rt];if(Y.location>=0){let dt=Z[rt];if(dt===void 0&&(rt==="instanceMatrix"&&M.instanceMatrix&&(dt=M.instanceMatrix),rt==="instanceColor"&&M.instanceColor&&(dt=M.instanceColor)),dt!==void 0){const pt=dt.normalized,Rt=dt.itemSize,Xt=t.get(dt);if(Xt===void 0)continue;const se=Xt.buffer,j=Xt.type,ut=Xt.bytesPerElement,Pt=j===n.INT||j===n.UNSIGNED_INT||dt.gpuType===Da;if(dt.isInterleavedBufferAttribute){const mt=dt.data,Ot=mt.stride,Vt=dt.offset;if(mt.isInstancedInterleavedBuffer){for(let $t=0;$t<Y.locationSize;$t++)m(Y.location+$t,mt.meshPerAttribute);M.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=mt.meshPerAttribute*mt.count)}else for(let $t=0;$t<Y.locationSize;$t++)g(Y.location+$t);n.bindBuffer(n.ARRAY_BUFFER,se);for(let $t=0;$t<Y.locationSize;$t++)x(Y.location+$t,Rt/Y.locationSize,j,pt,Ot*ut,(Vt+Rt/Y.locationSize*$t)*ut,Pt)}else{if(dt.isInstancedBufferAttribute){for(let mt=0;mt<Y.locationSize;mt++)m(Y.location+mt,dt.meshPerAttribute);M.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=dt.meshPerAttribute*dt.count)}else for(let mt=0;mt<Y.locationSize;mt++)g(Y.location+mt);n.bindBuffer(n.ARRAY_BUFFER,se);for(let mt=0;mt<Y.locationSize;mt++)x(Y.location+mt,Rt/Y.locationSize,j,pt,Rt*ut,Rt/Y.locationSize*mt*ut,Pt)}}else if(K!==void 0){const pt=K[rt];if(pt!==void 0)switch(pt.length){case 2:n.vertexAttrib2fv(Y.location,pt);break;case 3:n.vertexAttrib3fv(Y.location,pt);break;case 4:n.vertexAttrib4fv(Y.location,pt);break;default:n.vertexAttrib1fv(Y.location,pt)}}}}S()}function U(){L();for(const M in i){const T=i[M];for(const I in T){const B=T[I];for(const Z in B)u(B[Z].object),delete B[Z];delete T[I]}delete i[M]}}function P(M){if(i[M.id]===void 0)return;const T=i[M.id];for(const I in T){const B=T[I];for(const Z in B)u(B[Z].object),delete B[Z];delete T[I]}delete i[M.id]}function R(M){for(const T in i){const I=i[T];if(I[M.id]===void 0)continue;const B=I[M.id];for(const Z in B)u(B[Z].object),delete B[Z];delete I[M.id]}}function L(){_(),o=!0,r!==s&&(r=s,c(r.object))}function _(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:L,resetDefaultState:_,dispose:U,releaseStatesOfGeometry:P,releaseStatesOfProgram:R,initAttributes:v,enableAttribute:g,disableUnusedAttributes:S}}function Ip(n,t,e){let i;function s(c){i=c}function r(c,u){n.drawArrays(i,c,u),e.update(u,i,1)}function o(c,u,d){d!==0&&(n.drawArraysInstanced(i,c,u,d),e.update(u,i,d))}function a(c,u,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,d);let p=0;for(let f=0;f<d;f++)p+=u[f];e.update(p,i,1)}function l(c,u,d,h){if(d===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let f=0;f<c.length;f++)o(c[f],u[f],h[f]);else{p.multiDrawArraysInstancedWEBGL(i,c,0,u,0,h,0,d);let f=0;for(let v=0;v<d;v++)f+=u[v]*h[v];e.update(f,i,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Dp(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const R=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(R){return!(R!==Mn&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(R){const L=R===ks&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(R!==Wn&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==zn&&!L)}function l(R){if(R==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const d=e.logarithmicDepthBuffer===!0,h=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),f=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),m=n.getParameter(n.MAX_VERTEX_ATTRIBS),S=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),x=n.getParameter(n.MAX_VARYING_VECTORS),y=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),U=f>0,P=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reverseDepthBuffer:h,maxTextures:p,maxVertexTextures:f,maxTextureSize:v,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:S,maxVaryings:x,maxFragmentUniforms:y,vertexTextures:U,maxSamples:P}}function Up(n){const t=this;let e=null,i=0,s=!1,r=!1;const o=new wi,a=new Zt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){const p=d.length!==0||h||i!==0||s;return s=h,i=d.length,p},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,h){e=u(d,h,0)},this.setState=function(d,h,p){const f=d.clippingPlanes,v=d.clipIntersection,g=d.clipShadows,m=n.get(d);if(!s||f===null||f.length===0||r&&!g)r?u(null):c();else{const S=r?0:i,x=S*4;let y=m.clippingState||null;l.value=y,y=u(f,h,x,p);for(let U=0;U!==x;++U)y[U]=e[U];m.clippingState=y,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function u(d,h,p,f){const v=d!==null?d.length:0;let g=null;if(v!==0){if(g=l.value,f!==!0||g===null){const m=p+v*4,S=h.matrixWorldInverse;a.getNormalMatrix(S),(g===null||g.length<m)&&(g=new Float32Array(m));for(let x=0,y=p;x!==v;++x,y+=4)o.copy(d[x]).applyMatrix4(S,a),o.normal.toArray(g,y),g[y+3]=o.constant}l.value=g,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,g}}function Np(n){let t=new WeakMap;function e(o,a){return a===Zo?o.mapping=as:a===Ko&&(o.mapping=ls),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===Zo||a===Ko)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Xd(l.height);return c.fromEquirectangularTexture(n,o),t.set(o,c),o.addEventListener("dispose",s),e(c.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:i,dispose:r}}class Wc extends Gc{constructor(t=-1,e=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-t,o=i+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const es=4,Pl=[.125,.215,.35,.446,.526,.582],Ti=20,_o=new Wc,Ll=new Tt;let vo=null,Mo=0,yo=0,So=!1;const bi=(1+Math.sqrt(5))/2,Zi=1/bi,Il=[new b(-bi,Zi,0),new b(bi,Zi,0),new b(-Zi,0,bi),new b(Zi,0,bi),new b(0,bi,-Zi),new b(0,bi,Zi),new b(-1,1,-1),new b(1,1,-1),new b(-1,1,1),new b(1,1,1)];class Dl{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,s=100){vo=this._renderer.getRenderTarget(),Mo=this._renderer.getActiveCubeFace(),yo=this._renderer.getActiveMipmapLevel(),So=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,i,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Fl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Nl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(vo,Mo,yo),this._renderer.xr.enabled=So,t.scissorTest=!1,fr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===as||t.mapping===ls?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),vo=this._renderer.getRenderTarget(),Mo=this._renderer.getActiveCubeFace(),yo=this._renderer.getActiveMipmapLevel(),So=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:Tn,minFilter:Tn,generateMipmaps:!1,type:ks,format:Mn,colorSpace:hs,depthBuffer:!1},s=Ul(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ul(t,e,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Fp(r)),this._blurMaterial=Op(r,t,e)}return s}_compileMaterial(t){const e=new D(this._lodPlanes[0],t);this._renderer.compile(e,_o)}_sceneToCubeUV(t,e,i,s){const a=new xe(90,1,e,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,h=u.toneMapping;u.getClearColor(Ll),u.toneMapping=ci,u.autoClear=!1;const p=new Je({name:"PMREM.Background",side:Xe,depthWrite:!1,depthTest:!1}),f=new D(new ht,p);let v=!1;const g=t.background;g?g.isColor&&(p.color.copy(g),t.background=null,v=!0):(p.color.copy(Ll),v=!0);for(let m=0;m<6;m++){const S=m%3;S===0?(a.up.set(0,l[m],0),a.lookAt(c[m],0,0)):S===1?(a.up.set(0,0,l[m]),a.lookAt(0,c[m],0)):(a.up.set(0,l[m],0),a.lookAt(0,0,c[m]));const x=this._cubeSize;fr(s,S*x,m>2?x:0,x,x),u.setRenderTarget(s),v&&u.render(f,a),u.render(t,a)}f.geometry.dispose(),f.material.dispose(),u.toneMapping=h,u.autoClear=d,t.background=g}_textureToCubeUV(t,e){const i=this._renderer,s=t.mapping===as||t.mapping===ls;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Fl()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Nl());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new D(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const l=this._cubeSize;fr(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(o,_o)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Il[(s-r-1)%Il.length];this._blur(t,r-1,r,o,a)}e.autoClear=i}_blur(t,e,i,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,i,s,"latitudinal",r),this._halfBlur(o,t,i,i,s,"longitudinal",r)}_halfBlur(t,e,i,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,d=new D(this._lodPlanes[s],c),h=c.uniforms,p=this._sizeLods[i]-1,f=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*Ti-1),v=r/f,g=isFinite(r)?1+Math.floor(u*v):Ti;g>Ti&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Ti}`);const m=[];let S=0;for(let R=0;R<Ti;++R){const L=R/v,_=Math.exp(-L*L/2);m.push(_),R===0?S+=_:R<g&&(S+=2*_)}for(let R=0;R<m.length;R++)m[R]=m[R]/S;h.envMap.value=t.texture,h.samples.value=g,h.weights.value=m,h.latitudinal.value=o==="latitudinal",a&&(h.poleAxis.value=a);const{_lodMax:x}=this;h.dTheta.value=f,h.mipInt.value=x-i;const y=this._sizeLods[s],U=3*y*(s>x-es?s-x+es:0),P=4*(this._cubeSize-y);fr(e,U,P,3*y,2*y),l.setRenderTarget(e),l.render(d,_o)}}function Fp(n){const t=[],e=[],i=[];let s=n;const r=n-es+1+Pl.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let l=1/a;o>n-es?l=Pl[o-n+es-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),u=-c,d=1+c,h=[u,u,d,u,d,d,u,u,d,d,u,d],p=6,f=6,v=3,g=2,m=1,S=new Float32Array(v*f*p),x=new Float32Array(g*f*p),y=new Float32Array(m*f*p);for(let P=0;P<p;P++){const R=P%3*2/3-1,L=P>2?0:-1,_=[R,L,0,R+2/3,L,0,R+2/3,L+1,0,R,L,0,R+2/3,L+1,0,R,L+1,0];S.set(_,v*f*P),x.set(h,g*f*P);const M=[P,P,P,P,P,P];y.set(M,m*f*P)}const U=new Ce;U.setAttribute("position",new ze(S,v)),U.setAttribute("uv",new ze(x,g)),U.setAttribute("faceIndex",new ze(y,m)),t.push(U),s>es&&s--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function Ul(n,t,e){const i=new Li(n,t,e);return i.texture.mapping=Gr,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function fr(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function Op(n,t,e){const i=new Float32Array(Ti),s=new b(0,1,0);return new Xn({name:"SphericalGaussianBlur",defines:{n:Ti,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Va(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:li,depthTest:!1,depthWrite:!1})}function Nl(){return new Xn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Va(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:li,depthTest:!1,depthWrite:!1})}function Fl(){return new Xn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Va(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:li,depthTest:!1,depthWrite:!1})}function Va(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function zp(n){let t=new WeakMap,e=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===Zo||l===Ko,u=l===as||l===ls;if(c||u){let d=t.get(a);const h=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==h)return e===null&&(e=new Dl(n)),d=c?e.fromEquirectangular(a,d):e.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,t.set(a,d),d.texture;if(d!==void 0)return d.texture;{const p=a.image;return c&&p&&p.height>0||u&&p&&s(p)?(e===null&&(e=new Dl(n)),d=c?e.fromEquirectangular(a):e.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,t.set(a,d),a.addEventListener("dispose",r),d.texture):null}}}return a}function s(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:o}}function Bp(n){const t={};function e(i){if(t[i]!==void 0)return t[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const s=e(i);return s===null&&As("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function kp(n,t,e,i){const s={},r=new WeakMap;function o(d){const h=d.target;h.index!==null&&t.remove(h.index);for(const f in h.attributes)t.remove(h.attributes[f]);for(const f in h.morphAttributes){const v=h.morphAttributes[f];for(let g=0,m=v.length;g<m;g++)t.remove(v[g])}h.removeEventListener("dispose",o),delete s[h.id];const p=r.get(h);p&&(t.remove(p),r.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,e.memory.geometries--}function a(d,h){return s[h.id]===!0||(h.addEventListener("dispose",o),s[h.id]=!0,e.memory.geometries++),h}function l(d){const h=d.attributes;for(const f in h)t.update(h[f],n.ARRAY_BUFFER);const p=d.morphAttributes;for(const f in p){const v=p[f];for(let g=0,m=v.length;g<m;g++)t.update(v[g],n.ARRAY_BUFFER)}}function c(d){const h=[],p=d.index,f=d.attributes.position;let v=0;if(p!==null){const S=p.array;v=p.version;for(let x=0,y=S.length;x<y;x+=3){const U=S[x+0],P=S[x+1],R=S[x+2];h.push(U,P,P,R,R,U)}}else if(f!==void 0){const S=f.array;v=f.version;for(let x=0,y=S.length/3-1;x<y;x+=3){const U=x+0,P=x+1,R=x+2;h.push(U,P,P,R,R,U)}}else return;const g=new(Uc(h)?Bc:zc)(h,1);g.version=v;const m=r.get(d);m&&t.remove(m),r.set(d,g)}function u(d){const h=r.get(d);if(h){const p=d.index;p!==null&&h.version<p.version&&c(d)}else c(d);return r.get(d)}return{get:a,update:l,getWireframeAttribute:u}}function Gp(n,t,e){let i;function s(h){i=h}let r,o;function a(h){r=h.type,o=h.bytesPerElement}function l(h,p){n.drawElements(i,p,r,h*o),e.update(p,i,1)}function c(h,p,f){f!==0&&(n.drawElementsInstanced(i,p,r,h*o,f),e.update(p,i,f))}function u(h,p,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,r,h,0,f);let g=0;for(let m=0;m<f;m++)g+=p[m];e.update(g,i,1)}function d(h,p,f,v){if(f===0)return;const g=t.get("WEBGL_multi_draw");if(g===null)for(let m=0;m<h.length;m++)c(h[m]/o,p[m],v[m]);else{g.multiDrawElementsInstancedWEBGL(i,p,0,r,h,0,v,0,f);let m=0;for(let S=0;S<f;S++)m+=p[S]*v[S];e.update(m,i,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function Hp(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(e.calls++,o){case n.TRIANGLES:e.triangles+=a*(r/3);break;case n.LINES:e.lines+=a*(r/2);break;case n.LINE_STRIP:e.lines+=a*(r-1);break;case n.LINE_LOOP:e.lines+=a*r;break;case n.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function Vp(n,t,e){const i=new WeakMap,s=new ge;function r(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0;let h=i.get(a);if(h===void 0||h.count!==d){let M=function(){L.dispose(),i.delete(a),a.removeEventListener("dispose",M)};var p=M;h!==void 0&&h.texture.dispose();const f=a.morphAttributes.position!==void 0,v=a.morphAttributes.normal!==void 0,g=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],S=a.morphAttributes.normal||[],x=a.morphAttributes.color||[];let y=0;f===!0&&(y=1),v===!0&&(y=2),g===!0&&(y=3);let U=a.attributes.position.count*y,P=1;U>t.maxTextureSize&&(P=Math.ceil(U/t.maxTextureSize),U=t.maxTextureSize);const R=new Float32Array(U*P*4*d),L=new Fc(R,U,P,d);L.type=zn,L.needsUpdate=!0;const _=y*4;for(let T=0;T<d;T++){const I=m[T],B=S[T],Z=x[T],nt=U*P*4*T;for(let K=0;K<I.count;K++){const rt=K*_;f===!0&&(s.fromBufferAttribute(I,K),R[nt+rt+0]=s.x,R[nt+rt+1]=s.y,R[nt+rt+2]=s.z,R[nt+rt+3]=0),v===!0&&(s.fromBufferAttribute(B,K),R[nt+rt+4]=s.x,R[nt+rt+5]=s.y,R[nt+rt+6]=s.z,R[nt+rt+7]=0),g===!0&&(s.fromBufferAttribute(Z,K),R[nt+rt+8]=s.x,R[nt+rt+9]=s.y,R[nt+rt+10]=s.z,R[nt+rt+11]=Z.itemSize===4?s.w:1)}}h={count:d,texture:L,size:new Ct(U,P)},i.set(a,h),a.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,e);else{let f=0;for(let g=0;g<c.length;g++)f+=c[g];const v=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(n,"morphTargetBaseInfluence",v),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",h.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:r}}function Wp(n,t,e,i){let s=new WeakMap;function r(l){const c=i.render.frame,u=l.geometry,d=t.get(l,u);if(s.get(d)!==c&&(t.update(d),s.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const h=l.skeleton;s.get(h)!==c&&(h.update(),s.set(h,c))}return d}function o(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}class Xc extends je{constructor(t,e,i,s,r,o,a,l,c,u=ns){if(u!==ns&&u!==us)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===ns&&(i=Pi),i===void 0&&u===us&&(i=cs),super(null,s,r,o,a,l,u,i,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:yn,this.minFilter=l!==void 0?l:yn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const qc=new je,Ol=new Xc(1,1),Yc=new Fc,$c=new Rd,Zc=new Hc,zl=[],Bl=[],kl=new Float32Array(16),Gl=new Float32Array(9),Hl=new Float32Array(4);function ps(n,t,e){const i=n[0];if(i<=0||i>0)return n;const s=t*e;let r=zl[s];if(r===void 0&&(r=new Float32Array(s),zl[s]=r),t!==0){i.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,n[o].toArray(r,a)}return r}function Ne(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function Fe(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function Wr(n,t){let e=Bl[t];e===void 0&&(e=new Int32Array(t),Bl[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function Xp(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function qp(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ne(e,t))return;n.uniform2fv(this.addr,t),Fe(e,t)}}function Yp(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ne(e,t))return;n.uniform3fv(this.addr,t),Fe(e,t)}}function $p(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ne(e,t))return;n.uniform4fv(this.addr,t),Fe(e,t)}}function Zp(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Ne(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),Fe(e,t)}else{if(Ne(e,i))return;Hl.set(i),n.uniformMatrix2fv(this.addr,!1,Hl),Fe(e,i)}}function Kp(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Ne(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),Fe(e,t)}else{if(Ne(e,i))return;Gl.set(i),n.uniformMatrix3fv(this.addr,!1,Gl),Fe(e,i)}}function Jp(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Ne(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),Fe(e,t)}else{if(Ne(e,i))return;kl.set(i),n.uniformMatrix4fv(this.addr,!1,kl),Fe(e,i)}}function jp(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function Qp(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ne(e,t))return;n.uniform2iv(this.addr,t),Fe(e,t)}}function t0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ne(e,t))return;n.uniform3iv(this.addr,t),Fe(e,t)}}function e0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ne(e,t))return;n.uniform4iv(this.addr,t),Fe(e,t)}}function n0(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function i0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ne(e,t))return;n.uniform2uiv(this.addr,t),Fe(e,t)}}function s0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ne(e,t))return;n.uniform3uiv(this.addr,t),Fe(e,t)}}function r0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ne(e,t))return;n.uniform4uiv(this.addr,t),Fe(e,t)}}function o0(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Ol.compareFunction=Dc,r=Ol):r=qc,e.setTexture2D(t||r,s)}function a0(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||$c,s)}function l0(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||Zc,s)}function c0(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||Yc,s)}function u0(n){switch(n){case 5126:return Xp;case 35664:return qp;case 35665:return Yp;case 35666:return $p;case 35674:return Zp;case 35675:return Kp;case 35676:return Jp;case 5124:case 35670:return jp;case 35667:case 35671:return Qp;case 35668:case 35672:return t0;case 35669:case 35673:return e0;case 5125:return n0;case 36294:return i0;case 36295:return s0;case 36296:return r0;case 35678:case 36198:case 36298:case 36306:case 35682:return o0;case 35679:case 36299:case 36307:return a0;case 35680:case 36300:case 36308:case 36293:return l0;case 36289:case 36303:case 36311:case 36292:return c0}}function d0(n,t){n.uniform1fv(this.addr,t)}function h0(n,t){const e=ps(t,this.size,2);n.uniform2fv(this.addr,e)}function f0(n,t){const e=ps(t,this.size,3);n.uniform3fv(this.addr,e)}function p0(n,t){const e=ps(t,this.size,4);n.uniform4fv(this.addr,e)}function m0(n,t){const e=ps(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function g0(n,t){const e=ps(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function _0(n,t){const e=ps(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function v0(n,t){n.uniform1iv(this.addr,t)}function M0(n,t){n.uniform2iv(this.addr,t)}function y0(n,t){n.uniform3iv(this.addr,t)}function S0(n,t){n.uniform4iv(this.addr,t)}function x0(n,t){n.uniform1uiv(this.addr,t)}function w0(n,t){n.uniform2uiv(this.addr,t)}function b0(n,t){n.uniform3uiv(this.addr,t)}function E0(n,t){n.uniform4uiv(this.addr,t)}function T0(n,t,e){const i=this.cache,s=t.length,r=Wr(e,s);Ne(i,r)||(n.uniform1iv(this.addr,r),Fe(i,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||qc,r[o])}function A0(n,t,e){const i=this.cache,s=t.length,r=Wr(e,s);Ne(i,r)||(n.uniform1iv(this.addr,r),Fe(i,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||$c,r[o])}function C0(n,t,e){const i=this.cache,s=t.length,r=Wr(e,s);Ne(i,r)||(n.uniform1iv(this.addr,r),Fe(i,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||Zc,r[o])}function R0(n,t,e){const i=this.cache,s=t.length,r=Wr(e,s);Ne(i,r)||(n.uniform1iv(this.addr,r),Fe(i,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Yc,r[o])}function P0(n){switch(n){case 5126:return d0;case 35664:return h0;case 35665:return f0;case 35666:return p0;case 35674:return m0;case 35675:return g0;case 35676:return _0;case 5124:case 35670:return v0;case 35667:case 35671:return M0;case 35668:case 35672:return y0;case 35669:case 35673:return S0;case 5125:return x0;case 36294:return w0;case 36295:return b0;case 36296:return E0;case 35678:case 36198:case 36298:case 36306:case 35682:return T0;case 35679:case 36299:case 36307:return A0;case 35680:case 36300:case 36308:case 36293:return C0;case 36289:case 36303:case 36311:case 36292:return R0}}class L0{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=u0(e.type)}}class I0{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=P0(e.type)}}class D0{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],i)}}}const xo=/(\w+)(\])?(\[|\.)?/g;function Vl(n,t){n.seq.push(t),n.map[t.id]=t}function U0(n,t,e){const i=n.name,s=i.length;for(xo.lastIndex=0;;){const r=xo.exec(i),o=xo.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){Vl(e,c===void 0?new L0(a,n,t):new I0(a,n,t));break}else{let d=e.map[a];d===void 0&&(d=new D0(a),Vl(e,d)),e=d}}}class Rr{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);U0(r,o,this)}}setValue(t,e,i,s){const r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){const s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],l=i[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){const i=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&i.push(o)}return i}}function Wl(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const N0=37297;let F0=0;function O0(n,t){const e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;i.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return i.join(`
`)}const Xl=new Zt;function z0(n){re._getMatrix(Xl,re.workingColorSpace,n);const t=`mat3( ${Xl.elements.map(e=>e.toFixed(4))} )`;switch(re.getTransfer(n)){case Hr:return[t,"LinearTransferOETF"];case pe:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function ql(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),s=n.getShaderInfoLog(t).trim();if(i&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+O0(n.getShaderSource(t),o)}else return s}function B0(n,t){const e=z0(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function k0(n,t){let e;switch(t){case Hu:e="Linear";break;case Vu:e="Reinhard";break;case Wu:e="Cineon";break;case kr:e="ACESFilmic";break;case qu:e="AgX";break;case Yu:e="Neutral";break;case Xu:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const pr=new b;function G0(){re.getLuminanceCoefficients(pr);const n=pr.x.toFixed(4),t=pr.y.toFixed(4),e=pr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function H0(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Cs).join(`
`)}function V0(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function W0(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(t,s),o=r.name;let a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:n.getAttribLocation(t,o),locationSize:a}}return e}function Cs(n){return n!==""}function Yl(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function $l(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const X0=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ea(n){return n.replace(X0,Y0)}const q0=new Map;function Y0(n,t){let e=Kt[t];if(e===void 0){const i=q0.get(t);if(i!==void 0)e=Kt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return Ea(e)}const $0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Zl(n){return n.replace($0,Z0)}function Z0(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Kl(n){let t=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function K0(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Sc?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===Br?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Nn&&(t="SHADOWMAP_TYPE_VSM"),t}function J0(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case as:case ls:t="ENVMAP_TYPE_CUBE";break;case Gr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function j0(n){let t="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case ls:t="ENVMAP_MODE_REFRACTION";break}return t}function Q0(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Ia:t="ENVMAP_BLENDING_MULTIPLY";break;case ku:t="ENVMAP_BLENDING_MIX";break;case Gu:t="ENVMAP_BLENDING_ADD";break}return t}function tm(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:i,maxMip:e}}function em(n,t,e,i){const s=n.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=K0(e),c=J0(e),u=j0(e),d=Q0(e),h=tm(e),p=H0(e),f=V0(r),v=s.createProgram();let g,m,S=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f].filter(Cs).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f].filter(Cs).join(`
`),m.length>0&&(m+=`
`)):(g=[Kl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Cs).join(`
`),m=[Kl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==ci?"#define TONE_MAPPING":"",e.toneMapping!==ci?Kt.tonemapping_pars_fragment:"",e.toneMapping!==ci?k0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Kt.colorspace_pars_fragment,B0("linearToOutputTexel",e.outputColorSpace),G0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Cs).join(`
`)),o=Ea(o),o=Yl(o,e),o=$l(o,e),a=Ea(a),a=Yl(a,e),a=$l(a,e),o=Zl(o),a=Zl(a),e.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,g=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",e.glslVersion===ll?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===ll?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const x=S+g+o,y=S+m+a,U=Wl(s,s.VERTEX_SHADER,x),P=Wl(s,s.FRAGMENT_SHADER,y);s.attachShader(v,U),s.attachShader(v,P),e.index0AttributeName!==void 0?s.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function R(T){if(n.debug.checkShaderErrors){const I=s.getProgramInfoLog(v).trim(),B=s.getShaderInfoLog(U).trim(),Z=s.getShaderInfoLog(P).trim();let nt=!0,K=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(nt=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,v,U,P);else{const rt=ql(s,U,"vertex"),Y=ql(s,P,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+T.name+`
Material Type: `+T.type+`

Program Info Log: `+I+`
`+rt+`
`+Y)}else I!==""?console.warn("THREE.WebGLProgram: Program Info Log:",I):(B===""||Z==="")&&(K=!1);K&&(T.diagnostics={runnable:nt,programLog:I,vertexShader:{log:B,prefix:g},fragmentShader:{log:Z,prefix:m}})}s.deleteShader(U),s.deleteShader(P),L=new Rr(s,v),_=W0(s,v)}let L;this.getUniforms=function(){return L===void 0&&R(this),L};let _;this.getAttributes=function(){return _===void 0&&R(this),_};let M=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=s.getProgramParameter(v,N0)),M},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=F0++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=U,this.fragmentShader=P,this}let nm=0;class im{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(i),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new sm(t),e.set(t,i)),i}}class sm{constructor(t){this.id=nm++,this.code=t,this.usedTimes=0}}function rm(n,t,e,i,s,r,o){const a=new Ga,l=new im,c=new Set,u=[],d=s.logarithmicDepthBuffer,h=s.vertexTextures;let p=s.precision;const f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(_){return c.add(_),_===0?"uv":`uv${_}`}function g(_,M,T,I,B){const Z=I.fog,nt=B.geometry,K=_.isMeshStandardMaterial?I.environment:null,rt=(_.isMeshStandardMaterial?e:t).get(_.envMap||K),Y=rt&&rt.mapping===Gr?rt.image.height:null,dt=f[_.type];_.precision!==null&&(p=s.getMaxPrecision(_.precision),p!==_.precision&&console.warn("THREE.WebGLProgram.getParameters:",_.precision,"not supported, using",p,"instead."));const pt=nt.morphAttributes.position||nt.morphAttributes.normal||nt.morphAttributes.color,Rt=pt!==void 0?pt.length:0;let Xt=0;nt.morphAttributes.position!==void 0&&(Xt=1),nt.morphAttributes.normal!==void 0&&(Xt=2),nt.morphAttributes.color!==void 0&&(Xt=3);let se,j,ut,Pt;if(dt){const oe=En[dt];se=oe.vertexShader,j=oe.fragmentShader}else se=_.vertexShader,j=_.fragmentShader,l.update(_),ut=l.getVertexShaderID(_),Pt=l.getFragmentShaderID(_);const mt=n.getRenderTarget(),Ot=n.state.buffers.depth.getReversed(),Vt=B.isInstancedMesh===!0,$t=B.isBatchedMesh===!0,Me=!!_.map,te=!!_.matcap,Te=!!rt,z=!!_.aoMap,Ye=!!_.lightMap,ee=!!_.bumpMap,ne=!!_.normalMap,Bt=!!_.displacementMap,Se=!!_.emissiveMap,Ft=!!_.metalnessMap,C=!!_.roughnessMap,w=_.anisotropy>0,k=_.clearcoat>0,it=_.dispersion>0,ot=_.iridescence>0,et=_.sheen>0,It=_.transmission>0,Mt=w&&!!_.anisotropyMap,bt=k&&!!_.clearcoatMap,jt=k&&!!_.clearcoatNormalMap,ct=k&&!!_.clearcoatRoughnessMap,wt=ot&&!!_.iridescenceMap,zt=ot&&!!_.iridescenceThicknessMap,Gt=et&&!!_.sheenColorMap,Et=et&&!!_.sheenRoughnessMap,Qt=!!_.specularMap,Wt=!!_.specularColorMap,le=!!_.specularIntensityMap,N=It&&!!_.transmissionMap,_t=It&&!!_.thicknessMap,$=!!_.gradientMap,Q=!!_.alphaMap,yt=_.alphaTest>0,St=!!_.alphaHash,qt=!!_.extensions;let Ae=ci;_.toneMapped&&(mt===null||mt.isXRRenderTarget===!0)&&(Ae=n.toneMapping);const Ue={shaderID:dt,shaderType:_.type,shaderName:_.name,vertexShader:se,fragmentShader:j,defines:_.defines,customVertexShaderID:ut,customFragmentShaderID:Pt,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:p,batching:$t,batchingColor:$t&&B._colorsTexture!==null,instancing:Vt,instancingColor:Vt&&B.instanceColor!==null,instancingMorph:Vt&&B.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:mt===null?n.outputColorSpace:mt.isXRRenderTarget===!0?mt.texture.colorSpace:hs,alphaToCoverage:!!_.alphaToCoverage,map:Me,matcap:te,envMap:Te,envMapMode:Te&&rt.mapping,envMapCubeUVHeight:Y,aoMap:z,lightMap:Ye,bumpMap:ee,normalMap:ne,displacementMap:h&&Bt,emissiveMap:Se,normalMapObjectSpace:ne&&_.normalMapType===Ju,normalMapTangentSpace:ne&&_.normalMapType===Ba,metalnessMap:Ft,roughnessMap:C,anisotropy:w,anisotropyMap:Mt,clearcoat:k,clearcoatMap:bt,clearcoatNormalMap:jt,clearcoatRoughnessMap:ct,dispersion:it,iridescence:ot,iridescenceMap:wt,iridescenceThicknessMap:zt,sheen:et,sheenColorMap:Gt,sheenRoughnessMap:Et,specularMap:Qt,specularColorMap:Wt,specularIntensityMap:le,transmission:It,transmissionMap:N,thicknessMap:_t,gradientMap:$,opaque:_.transparent===!1&&_.blending===Ri&&_.alphaToCoverage===!1,alphaMap:Q,alphaTest:yt,alphaHash:St,combine:_.combine,mapUv:Me&&v(_.map.channel),aoMapUv:z&&v(_.aoMap.channel),lightMapUv:Ye&&v(_.lightMap.channel),bumpMapUv:ee&&v(_.bumpMap.channel),normalMapUv:ne&&v(_.normalMap.channel),displacementMapUv:Bt&&v(_.displacementMap.channel),emissiveMapUv:Se&&v(_.emissiveMap.channel),metalnessMapUv:Ft&&v(_.metalnessMap.channel),roughnessMapUv:C&&v(_.roughnessMap.channel),anisotropyMapUv:Mt&&v(_.anisotropyMap.channel),clearcoatMapUv:bt&&v(_.clearcoatMap.channel),clearcoatNormalMapUv:jt&&v(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ct&&v(_.clearcoatRoughnessMap.channel),iridescenceMapUv:wt&&v(_.iridescenceMap.channel),iridescenceThicknessMapUv:zt&&v(_.iridescenceThicknessMap.channel),sheenColorMapUv:Gt&&v(_.sheenColorMap.channel),sheenRoughnessMapUv:Et&&v(_.sheenRoughnessMap.channel),specularMapUv:Qt&&v(_.specularMap.channel),specularColorMapUv:Wt&&v(_.specularColorMap.channel),specularIntensityMapUv:le&&v(_.specularIntensityMap.channel),transmissionMapUv:N&&v(_.transmissionMap.channel),thicknessMapUv:_t&&v(_.thicknessMap.channel),alphaMapUv:Q&&v(_.alphaMap.channel),vertexTangents:!!nt.attributes.tangent&&(ne||w),vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!nt.attributes.color&&nt.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!nt.attributes.uv&&(Me||Q),fog:!!Z,useFog:_.fog===!0,fogExp2:!!Z&&Z.isFogExp2,flatShading:_.flatShading===!0,sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:Ot,skinning:B.isSkinnedMesh===!0,morphTargets:nt.morphAttributes.position!==void 0,morphNormals:nt.morphAttributes.normal!==void 0,morphColors:nt.morphAttributes.color!==void 0,morphTargetsCount:Rt,morphTextureStride:Xt,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:_.dithering,shadowMapEnabled:n.shadowMap.enabled&&T.length>0,shadowMapType:n.shadowMap.type,toneMapping:Ae,decodeVideoTexture:Me&&_.map.isVideoTexture===!0&&re.getTransfer(_.map.colorSpace)===pe,decodeVideoTextureEmissive:Se&&_.emissiveMap.isVideoTexture===!0&&re.getTransfer(_.emissiveMap.colorSpace)===pe,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===Ke,flipSided:_.side===Xe,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:qt&&_.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(qt&&_.extensions.multiDraw===!0||$t)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return Ue.vertexUv1s=c.has(1),Ue.vertexUv2s=c.has(2),Ue.vertexUv3s=c.has(3),c.clear(),Ue}function m(_){const M=[];if(_.shaderID?M.push(_.shaderID):(M.push(_.customVertexShaderID),M.push(_.customFragmentShaderID)),_.defines!==void 0)for(const T in _.defines)M.push(T),M.push(_.defines[T]);return _.isRawShaderMaterial===!1&&(S(M,_),x(M,_),M.push(n.outputColorSpace)),M.push(_.customProgramCacheKey),M.join()}function S(_,M){_.push(M.precision),_.push(M.outputColorSpace),_.push(M.envMapMode),_.push(M.envMapCubeUVHeight),_.push(M.mapUv),_.push(M.alphaMapUv),_.push(M.lightMapUv),_.push(M.aoMapUv),_.push(M.bumpMapUv),_.push(M.normalMapUv),_.push(M.displacementMapUv),_.push(M.emissiveMapUv),_.push(M.metalnessMapUv),_.push(M.roughnessMapUv),_.push(M.anisotropyMapUv),_.push(M.clearcoatMapUv),_.push(M.clearcoatNormalMapUv),_.push(M.clearcoatRoughnessMapUv),_.push(M.iridescenceMapUv),_.push(M.iridescenceThicknessMapUv),_.push(M.sheenColorMapUv),_.push(M.sheenRoughnessMapUv),_.push(M.specularMapUv),_.push(M.specularColorMapUv),_.push(M.specularIntensityMapUv),_.push(M.transmissionMapUv),_.push(M.thicknessMapUv),_.push(M.combine),_.push(M.fogExp2),_.push(M.sizeAttenuation),_.push(M.morphTargetsCount),_.push(M.morphAttributeCount),_.push(M.numDirLights),_.push(M.numPointLights),_.push(M.numSpotLights),_.push(M.numSpotLightMaps),_.push(M.numHemiLights),_.push(M.numRectAreaLights),_.push(M.numDirLightShadows),_.push(M.numPointLightShadows),_.push(M.numSpotLightShadows),_.push(M.numSpotLightShadowsWithMaps),_.push(M.numLightProbes),_.push(M.shadowMapType),_.push(M.toneMapping),_.push(M.numClippingPlanes),_.push(M.numClipIntersection),_.push(M.depthPacking)}function x(_,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),_.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reverseDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),_.push(a.mask)}function y(_){const M=f[_.type];let T;if(M){const I=En[M];T=Gd.clone(I.uniforms)}else T=_.uniforms;return T}function U(_,M){let T;for(let I=0,B=u.length;I<B;I++){const Z=u[I];if(Z.cacheKey===M){T=Z,++T.usedTimes;break}}return T===void 0&&(T=new em(n,M,_,r),u.push(T)),T}function P(_){if(--_.usedTimes===0){const M=u.indexOf(_);u[M]=u[u.length-1],u.pop(),_.destroy()}}function R(_){l.remove(_)}function L(){l.dispose()}return{getParameters:g,getProgramCacheKey:m,getUniforms:y,acquireProgram:U,releaseProgram:P,releaseShaderCache:R,programs:u,dispose:L}}function om(){let n=new WeakMap;function t(o){return n.has(o)}function e(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function s(o,a,l){n.get(o)[a]=l}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function am(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function Jl(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function jl(){const n=[];let t=0;const e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function o(d,h,p,f,v,g){let m=n[t];return m===void 0?(m={id:d.id,object:d,geometry:h,material:p,groupOrder:f,renderOrder:d.renderOrder,z:v,group:g},n[t]=m):(m.id=d.id,m.object=d,m.geometry=h,m.material=p,m.groupOrder=f,m.renderOrder=d.renderOrder,m.z=v,m.group=g),t++,m}function a(d,h,p,f,v,g){const m=o(d,h,p,f,v,g);p.transmission>0?i.push(m):p.transparent===!0?s.push(m):e.push(m)}function l(d,h,p,f,v,g){const m=o(d,h,p,f,v,g);p.transmission>0?i.unshift(m):p.transparent===!0?s.unshift(m):e.unshift(m)}function c(d,h){e.length>1&&e.sort(d||am),i.length>1&&i.sort(h||Jl),s.length>1&&s.sort(h||Jl)}function u(){for(let d=t,h=n.length;d<h;d++){const p=n[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:a,unshift:l,finish:u,sort:c}}function lm(){let n=new WeakMap;function t(i,s){const r=n.get(i);let o;return r===void 0?(o=new jl,n.set(i,[o])):s>=r.length?(o=new jl,r.push(o)):o=r[s],o}function e(){n=new WeakMap}return{get:t,dispose:e}}function cm(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new b,color:new Tt};break;case"SpotLight":e={position:new b,direction:new b,color:new Tt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new b,color:new Tt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new b,skyColor:new Tt,groundColor:new Tt};break;case"RectAreaLight":e={color:new Tt,position:new b,halfWidth:new b,halfHeight:new b};break}return n[t.id]=e,e}}}function um(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ct};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ct};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ct,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let dm=0;function hm(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function fm(n){const t=new cm,e=um(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new b);const s=new b,r=new ve,o=new ve;function a(c){let u=0,d=0,h=0;for(let _=0;_<9;_++)i.probe[_].set(0,0,0);let p=0,f=0,v=0,g=0,m=0,S=0,x=0,y=0,U=0,P=0,R=0;c.sort(hm);for(let _=0,M=c.length;_<M;_++){const T=c[_],I=T.color,B=T.intensity,Z=T.distance,nt=T.shadow&&T.shadow.map?T.shadow.map.texture:null;if(T.isAmbientLight)u+=I.r*B,d+=I.g*B,h+=I.b*B;else if(T.isLightProbe){for(let K=0;K<9;K++)i.probe[K].addScaledVector(T.sh.coefficients[K],B);R++}else if(T.isDirectionalLight){const K=t.get(T);if(K.color.copy(T.color).multiplyScalar(T.intensity),T.castShadow){const rt=T.shadow,Y=e.get(T);Y.shadowIntensity=rt.intensity,Y.shadowBias=rt.bias,Y.shadowNormalBias=rt.normalBias,Y.shadowRadius=rt.radius,Y.shadowMapSize=rt.mapSize,i.directionalShadow[p]=Y,i.directionalShadowMap[p]=nt,i.directionalShadowMatrix[p]=T.shadow.matrix,S++}i.directional[p]=K,p++}else if(T.isSpotLight){const K=t.get(T);K.position.setFromMatrixPosition(T.matrixWorld),K.color.copy(I).multiplyScalar(B),K.distance=Z,K.coneCos=Math.cos(T.angle),K.penumbraCos=Math.cos(T.angle*(1-T.penumbra)),K.decay=T.decay,i.spot[v]=K;const rt=T.shadow;if(T.map&&(i.spotLightMap[U]=T.map,U++,rt.updateMatrices(T),T.castShadow&&P++),i.spotLightMatrix[v]=rt.matrix,T.castShadow){const Y=e.get(T);Y.shadowIntensity=rt.intensity,Y.shadowBias=rt.bias,Y.shadowNormalBias=rt.normalBias,Y.shadowRadius=rt.radius,Y.shadowMapSize=rt.mapSize,i.spotShadow[v]=Y,i.spotShadowMap[v]=nt,y++}v++}else if(T.isRectAreaLight){const K=t.get(T);K.color.copy(I).multiplyScalar(B),K.halfWidth.set(T.width*.5,0,0),K.halfHeight.set(0,T.height*.5,0),i.rectArea[g]=K,g++}else if(T.isPointLight){const K=t.get(T);if(K.color.copy(T.color).multiplyScalar(T.intensity),K.distance=T.distance,K.decay=T.decay,T.castShadow){const rt=T.shadow,Y=e.get(T);Y.shadowIntensity=rt.intensity,Y.shadowBias=rt.bias,Y.shadowNormalBias=rt.normalBias,Y.shadowRadius=rt.radius,Y.shadowMapSize=rt.mapSize,Y.shadowCameraNear=rt.camera.near,Y.shadowCameraFar=rt.camera.far,i.pointShadow[f]=Y,i.pointShadowMap[f]=nt,i.pointShadowMatrix[f]=T.shadow.matrix,x++}i.point[f]=K,f++}else if(T.isHemisphereLight){const K=t.get(T);K.skyColor.copy(T.color).multiplyScalar(B),K.groundColor.copy(T.groundColor).multiplyScalar(B),i.hemi[m]=K,m++}}g>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=vt.LTC_FLOAT_1,i.rectAreaLTC2=vt.LTC_FLOAT_2):(i.rectAreaLTC1=vt.LTC_HALF_1,i.rectAreaLTC2=vt.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=h;const L=i.hash;(L.directionalLength!==p||L.pointLength!==f||L.spotLength!==v||L.rectAreaLength!==g||L.hemiLength!==m||L.numDirectionalShadows!==S||L.numPointShadows!==x||L.numSpotShadows!==y||L.numSpotMaps!==U||L.numLightProbes!==R)&&(i.directional.length=p,i.spot.length=v,i.rectArea.length=g,i.point.length=f,i.hemi.length=m,i.directionalShadow.length=S,i.directionalShadowMap.length=S,i.pointShadow.length=x,i.pointShadowMap.length=x,i.spotShadow.length=y,i.spotShadowMap.length=y,i.directionalShadowMatrix.length=S,i.pointShadowMatrix.length=x,i.spotLightMatrix.length=y+U-P,i.spotLightMap.length=U,i.numSpotLightShadowsWithMaps=P,i.numLightProbes=R,L.directionalLength=p,L.pointLength=f,L.spotLength=v,L.rectAreaLength=g,L.hemiLength=m,L.numDirectionalShadows=S,L.numPointShadows=x,L.numSpotShadows=y,L.numSpotMaps=U,L.numLightProbes=R,i.version=dm++)}function l(c,u){let d=0,h=0,p=0,f=0,v=0;const g=u.matrixWorldInverse;for(let m=0,S=c.length;m<S;m++){const x=c[m];if(x.isDirectionalLight){const y=i.directional[d];y.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(g),d++}else if(x.isSpotLight){const y=i.spot[p];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(g),y.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(g),p++}else if(x.isRectAreaLight){const y=i.rectArea[f];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(g),o.identity(),r.copy(x.matrixWorld),r.premultiply(g),o.extractRotation(r),y.halfWidth.set(x.width*.5,0,0),y.halfHeight.set(0,x.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),f++}else if(x.isPointLight){const y=i.point[h];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(g),h++}else if(x.isHemisphereLight){const y=i.hemi[v];y.direction.setFromMatrixPosition(x.matrixWorld),y.direction.transformDirection(g),v++}}}return{setup:a,setupView:l,state:i}}function Ql(n){const t=new fm(n),e=[],i=[];function s(u){c.camera=u,e.length=0,i.length=0}function r(u){e.push(u)}function o(u){i.push(u)}function a(){t.setup(e)}function l(u){t.setupView(e,u)}const c={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function pm(n){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new Ql(n),t.set(s,[a])):r>=o.length?(a=new Ql(n),o.push(a)):a=o[r],a}function i(){t=new WeakMap}return{get:e,dispose:i}}class mm extends qn{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Zu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class gm extends qn{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const _m=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,vm=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Mm(n,t,e){let i=new Ha;const s=new Ct,r=new Ct,o=new ge,a=new mm({depthPacking:Ku}),l=new gm,c={},u=e.maxTextureSize,d={[ui]:Xe,[Xe]:ui,[Ke]:Ke},h=new Xn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ct},radius:{value:4}},vertexShader:_m,fragmentShader:vm}),p=h.clone();p.defines.HORIZONTAL_PASS=1;const f=new Ce;f.setAttribute("position",new ze(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new D(f,h),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Sc;let m=this.type;this.render=function(P,R,L){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||P.length===0)return;const _=n.getRenderTarget(),M=n.getActiveCubeFace(),T=n.getActiveMipmapLevel(),I=n.state;I.setBlending(li),I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);const B=m!==Nn&&this.type===Nn,Z=m===Nn&&this.type!==Nn;for(let nt=0,K=P.length;nt<K;nt++){const rt=P[nt],Y=rt.shadow;if(Y===void 0){console.warn("THREE.WebGLShadowMap:",rt,"has no shadow.");continue}if(Y.autoUpdate===!1&&Y.needsUpdate===!1)continue;s.copy(Y.mapSize);const dt=Y.getFrameExtents();if(s.multiply(dt),r.copy(Y.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/dt.x),s.x=r.x*dt.x,Y.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/dt.y),s.y=r.y*dt.y,Y.mapSize.y=r.y)),Y.map===null||B===!0||Z===!0){const Rt=this.type!==Nn?{minFilter:yn,magFilter:yn}:{};Y.map!==null&&Y.map.dispose(),Y.map=new Li(s.x,s.y,Rt),Y.map.texture.name=rt.name+".shadowMap",Y.camera.updateProjectionMatrix()}n.setRenderTarget(Y.map),n.clear();const pt=Y.getViewportCount();for(let Rt=0;Rt<pt;Rt++){const Xt=Y.getViewport(Rt);o.set(r.x*Xt.x,r.y*Xt.y,r.x*Xt.z,r.y*Xt.w),I.viewport(o),Y.updateMatrices(rt,Rt),i=Y.getFrustum(),y(R,L,Y.camera,rt,this.type)}Y.isPointLightShadow!==!0&&this.type===Nn&&S(Y,L),Y.needsUpdate=!1}m=this.type,g.needsUpdate=!1,n.setRenderTarget(_,M,T)};function S(P,R){const L=t.update(v);h.defines.VSM_SAMPLES!==P.blurSamples&&(h.defines.VSM_SAMPLES=P.blurSamples,p.defines.VSM_SAMPLES=P.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),P.mapPass===null&&(P.mapPass=new Li(s.x,s.y)),h.uniforms.shadow_pass.value=P.map.texture,h.uniforms.resolution.value=P.mapSize,h.uniforms.radius.value=P.radius,n.setRenderTarget(P.mapPass),n.clear(),n.renderBufferDirect(R,null,L,h,v,null),p.uniforms.shadow_pass.value=P.mapPass.texture,p.uniforms.resolution.value=P.mapSize,p.uniforms.radius.value=P.radius,n.setRenderTarget(P.map),n.clear(),n.renderBufferDirect(R,null,L,p,v,null)}function x(P,R,L,_){let M=null;const T=L.isPointLight===!0?P.customDistanceMaterial:P.customDepthMaterial;if(T!==void 0)M=T;else if(M=L.isPointLight===!0?l:a,n.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){const I=M.uuid,B=R.uuid;let Z=c[I];Z===void 0&&(Z={},c[I]=Z);let nt=Z[B];nt===void 0&&(nt=M.clone(),Z[B]=nt,R.addEventListener("dispose",U)),M=nt}if(M.visible=R.visible,M.wireframe=R.wireframe,_===Nn?M.side=R.shadowSide!==null?R.shadowSide:R.side:M.side=R.shadowSide!==null?R.shadowSide:d[R.side],M.alphaMap=R.alphaMap,M.alphaTest=R.alphaTest,M.map=R.map,M.clipShadows=R.clipShadows,M.clippingPlanes=R.clippingPlanes,M.clipIntersection=R.clipIntersection,M.displacementMap=R.displacementMap,M.displacementScale=R.displacementScale,M.displacementBias=R.displacementBias,M.wireframeLinewidth=R.wireframeLinewidth,M.linewidth=R.linewidth,L.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const I=n.properties.get(M);I.light=L}return M}function y(P,R,L,_,M){if(P.visible===!1)return;if(P.layers.test(R.layers)&&(P.isMesh||P.isLine||P.isPoints)&&(P.castShadow||P.receiveShadow&&M===Nn)&&(!P.frustumCulled||i.intersectsObject(P))){P.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,P.matrixWorld);const B=t.update(P),Z=P.material;if(Array.isArray(Z)){const nt=B.groups;for(let K=0,rt=nt.length;K<rt;K++){const Y=nt[K],dt=Z[Y.materialIndex];if(dt&&dt.visible){const pt=x(P,dt,_,M);P.onBeforeShadow(n,P,R,L,B,pt,Y),n.renderBufferDirect(L,null,B,pt,P,Y),P.onAfterShadow(n,P,R,L,B,pt,Y)}}}else if(Z.visible){const nt=x(P,Z,_,M);P.onBeforeShadow(n,P,R,L,B,nt,null),n.renderBufferDirect(L,null,B,nt,P,null),P.onAfterShadow(n,P,R,L,B,nt,null)}}const I=P.children;for(let B=0,Z=I.length;B<Z;B++)y(I[B],R,L,_,M)}function U(P){P.target.removeEventListener("dispose",U);for(const L in c){const _=c[L],M=P.target.uuid;M in _&&(_[M].dispose(),delete _[M])}}}const ym={[Ho]:Vo,[Wo]:Yo,[Xo]:$o,[os]:qo,[Vo]:Ho,[Yo]:Wo,[$o]:Xo,[qo]:os};function Sm(n,t){function e(){let N=!1;const _t=new ge;let $=null;const Q=new ge(0,0,0,0);return{setMask:function(yt){$!==yt&&!N&&(n.colorMask(yt,yt,yt,yt),$=yt)},setLocked:function(yt){N=yt},setClear:function(yt,St,qt,Ae,Ue){Ue===!0&&(yt*=Ae,St*=Ae,qt*=Ae),_t.set(yt,St,qt,Ae),Q.equals(_t)===!1&&(n.clearColor(yt,St,qt,Ae),Q.copy(_t))},reset:function(){N=!1,$=null,Q.set(-1,0,0,0)}}}function i(){let N=!1,_t=!1,$=null,Q=null,yt=null;return{setReversed:function(St){if(_t!==St){const qt=t.get("EXT_clip_control");_t?qt.clipControlEXT(qt.LOWER_LEFT_EXT,qt.ZERO_TO_ONE_EXT):qt.clipControlEXT(qt.LOWER_LEFT_EXT,qt.NEGATIVE_ONE_TO_ONE_EXT);const Ae=yt;yt=null,this.setClear(Ae)}_t=St},getReversed:function(){return _t},setTest:function(St){St?mt(n.DEPTH_TEST):Ot(n.DEPTH_TEST)},setMask:function(St){$!==St&&!N&&(n.depthMask(St),$=St)},setFunc:function(St){if(_t&&(St=ym[St]),Q!==St){switch(St){case Ho:n.depthFunc(n.NEVER);break;case Vo:n.depthFunc(n.ALWAYS);break;case Wo:n.depthFunc(n.LESS);break;case os:n.depthFunc(n.LEQUAL);break;case Xo:n.depthFunc(n.EQUAL);break;case qo:n.depthFunc(n.GEQUAL);break;case Yo:n.depthFunc(n.GREATER);break;case $o:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Q=St}},setLocked:function(St){N=St},setClear:function(St){yt!==St&&(_t&&(St=1-St),n.clearDepth(St),yt=St)},reset:function(){N=!1,$=null,Q=null,yt=null,_t=!1}}}function s(){let N=!1,_t=null,$=null,Q=null,yt=null,St=null,qt=null,Ae=null,Ue=null;return{setTest:function(oe){N||(oe?mt(n.STENCIL_TEST):Ot(n.STENCIL_TEST))},setMask:function(oe){_t!==oe&&!N&&(n.stencilMask(oe),_t=oe)},setFunc:function(oe,en,fn){($!==oe||Q!==en||yt!==fn)&&(n.stencilFunc(oe,en,fn),$=oe,Q=en,yt=fn)},setOp:function(oe,en,fn){(St!==oe||qt!==en||Ae!==fn)&&(n.stencilOp(oe,en,fn),St=oe,qt=en,Ae=fn)},setLocked:function(oe){N=oe},setClear:function(oe){Ue!==oe&&(n.clearStencil(oe),Ue=oe)},reset:function(){N=!1,_t=null,$=null,Q=null,yt=null,St=null,qt=null,Ae=null,Ue=null}}}const r=new e,o=new i,a=new s,l=new WeakMap,c=new WeakMap;let u={},d={},h=new WeakMap,p=[],f=null,v=!1,g=null,m=null,S=null,x=null,y=null,U=null,P=null,R=new Tt(0,0,0),L=0,_=!1,M=null,T=null,I=null,B=null,Z=null;const nt=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let K=!1,rt=0;const Y=n.getParameter(n.VERSION);Y.indexOf("WebGL")!==-1?(rt=parseFloat(/^WebGL (\d)/.exec(Y)[1]),K=rt>=1):Y.indexOf("OpenGL ES")!==-1&&(rt=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),K=rt>=2);let dt=null,pt={};const Rt=n.getParameter(n.SCISSOR_BOX),Xt=n.getParameter(n.VIEWPORT),se=new ge().fromArray(Rt),j=new ge().fromArray(Xt);function ut(N,_t,$,Q){const yt=new Uint8Array(4),St=n.createTexture();n.bindTexture(N,St),n.texParameteri(N,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(N,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let qt=0;qt<$;qt++)N===n.TEXTURE_3D||N===n.TEXTURE_2D_ARRAY?n.texImage3D(_t,0,n.RGBA,1,1,Q,0,n.RGBA,n.UNSIGNED_BYTE,yt):n.texImage2D(_t+qt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,yt);return St}const Pt={};Pt[n.TEXTURE_2D]=ut(n.TEXTURE_2D,n.TEXTURE_2D,1),Pt[n.TEXTURE_CUBE_MAP]=ut(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),Pt[n.TEXTURE_2D_ARRAY]=ut(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Pt[n.TEXTURE_3D]=ut(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),mt(n.DEPTH_TEST),o.setFunc(os),ee(!1),ne(sl),mt(n.CULL_FACE),z(li);function mt(N){u[N]!==!0&&(n.enable(N),u[N]=!0)}function Ot(N){u[N]!==!1&&(n.disable(N),u[N]=!1)}function Vt(N,_t){return d[N]!==_t?(n.bindFramebuffer(N,_t),d[N]=_t,N===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=_t),N===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=_t),!0):!1}function $t(N,_t){let $=p,Q=!1;if(N){$=h.get(_t),$===void 0&&($=[],h.set(_t,$));const yt=N.textures;if($.length!==yt.length||$[0]!==n.COLOR_ATTACHMENT0){for(let St=0,qt=yt.length;St<qt;St++)$[St]=n.COLOR_ATTACHMENT0+St;$.length=yt.length,Q=!0}}else $[0]!==n.BACK&&($[0]=n.BACK,Q=!0);Q&&n.drawBuffers($)}function Me(N){return f!==N?(n.useProgram(N),f=N,!0):!1}const te={[Ei]:n.FUNC_ADD,[wu]:n.FUNC_SUBTRACT,[bu]:n.FUNC_REVERSE_SUBTRACT};te[Eu]=n.MIN,te[Tu]=n.MAX;const Te={[Au]:n.ZERO,[Cu]:n.ONE,[Ru]:n.SRC_COLOR,[ko]:n.SRC_ALPHA,[Nu]:n.SRC_ALPHA_SATURATE,[Du]:n.DST_COLOR,[Lu]:n.DST_ALPHA,[Pu]:n.ONE_MINUS_SRC_COLOR,[Go]:n.ONE_MINUS_SRC_ALPHA,[Uu]:n.ONE_MINUS_DST_COLOR,[Iu]:n.ONE_MINUS_DST_ALPHA,[Fu]:n.CONSTANT_COLOR,[Ou]:n.ONE_MINUS_CONSTANT_COLOR,[zu]:n.CONSTANT_ALPHA,[Bu]:n.ONE_MINUS_CONSTANT_ALPHA};function z(N,_t,$,Q,yt,St,qt,Ae,Ue,oe){if(N===li){v===!0&&(Ot(n.BLEND),v=!1);return}if(v===!1&&(mt(n.BLEND),v=!0),N!==xu){if(N!==g||oe!==_){if((m!==Ei||y!==Ei)&&(n.blendEquation(n.FUNC_ADD),m=Ei,y=Ei),oe)switch(N){case Ri:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case tn:n.blendFunc(n.ONE,n.ONE);break;case rl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case ol:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case Ri:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case tn:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case rl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case ol:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}S=null,x=null,U=null,P=null,R.set(0,0,0),L=0,g=N,_=oe}return}yt=yt||_t,St=St||$,qt=qt||Q,(_t!==m||yt!==y)&&(n.blendEquationSeparate(te[_t],te[yt]),m=_t,y=yt),($!==S||Q!==x||St!==U||qt!==P)&&(n.blendFuncSeparate(Te[$],Te[Q],Te[St],Te[qt]),S=$,x=Q,U=St,P=qt),(Ae.equals(R)===!1||Ue!==L)&&(n.blendColor(Ae.r,Ae.g,Ae.b,Ue),R.copy(Ae),L=Ue),g=N,_=!1}function Ye(N,_t){N.side===Ke?Ot(n.CULL_FACE):mt(n.CULL_FACE);let $=N.side===Xe;_t&&($=!$),ee($),N.blending===Ri&&N.transparent===!1?z(li):z(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),o.setFunc(N.depthFunc),o.setTest(N.depthTest),o.setMask(N.depthWrite),r.setMask(N.colorWrite);const Q=N.stencilWrite;a.setTest(Q),Q&&(a.setMask(N.stencilWriteMask),a.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),a.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),Se(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?mt(n.SAMPLE_ALPHA_TO_COVERAGE):Ot(n.SAMPLE_ALPHA_TO_COVERAGE)}function ee(N){M!==N&&(N?n.frontFace(n.CW):n.frontFace(n.CCW),M=N)}function ne(N){N!==yu?(mt(n.CULL_FACE),N!==T&&(N===sl?n.cullFace(n.BACK):N===Su?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Ot(n.CULL_FACE),T=N}function Bt(N){N!==I&&(K&&n.lineWidth(N),I=N)}function Se(N,_t,$){N?(mt(n.POLYGON_OFFSET_FILL),(B!==_t||Z!==$)&&(n.polygonOffset(_t,$),B=_t,Z=$)):Ot(n.POLYGON_OFFSET_FILL)}function Ft(N){N?mt(n.SCISSOR_TEST):Ot(n.SCISSOR_TEST)}function C(N){N===void 0&&(N=n.TEXTURE0+nt-1),dt!==N&&(n.activeTexture(N),dt=N)}function w(N,_t,$){$===void 0&&(dt===null?$=n.TEXTURE0+nt-1:$=dt);let Q=pt[$];Q===void 0&&(Q={type:void 0,texture:void 0},pt[$]=Q),(Q.type!==N||Q.texture!==_t)&&(dt!==$&&(n.activeTexture($),dt=$),n.bindTexture(N,_t||Pt[N]),Q.type=N,Q.texture=_t)}function k(){const N=pt[dt];N!==void 0&&N.type!==void 0&&(n.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function it(){try{n.compressedTexImage2D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ot(){try{n.compressedTexImage3D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function et(){try{n.texSubImage2D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function It(){try{n.texSubImage3D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Mt(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function bt(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function jt(){try{n.texStorage2D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ct(){try{n.texStorage3D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function wt(){try{n.texImage2D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function zt(){try{n.texImage3D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Gt(N){se.equals(N)===!1&&(n.scissor(N.x,N.y,N.z,N.w),se.copy(N))}function Et(N){j.equals(N)===!1&&(n.viewport(N.x,N.y,N.z,N.w),j.copy(N))}function Qt(N,_t){let $=c.get(_t);$===void 0&&($=new WeakMap,c.set(_t,$));let Q=$.get(N);Q===void 0&&(Q=n.getUniformBlockIndex(_t,N.name),$.set(N,Q))}function Wt(N,_t){const Q=c.get(_t).get(N);l.get(_t)!==Q&&(n.uniformBlockBinding(_t,Q,N.__bindingPointIndex),l.set(_t,Q))}function le(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},dt=null,pt={},d={},h=new WeakMap,p=[],f=null,v=!1,g=null,m=null,S=null,x=null,y=null,U=null,P=null,R=new Tt(0,0,0),L=0,_=!1,M=null,T=null,I=null,B=null,Z=null,se.set(0,0,n.canvas.width,n.canvas.height),j.set(0,0,n.canvas.width,n.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:mt,disable:Ot,bindFramebuffer:Vt,drawBuffers:$t,useProgram:Me,setBlending:z,setMaterial:Ye,setFlipSided:ee,setCullFace:ne,setLineWidth:Bt,setPolygonOffset:Se,setScissorTest:Ft,activeTexture:C,bindTexture:w,unbindTexture:k,compressedTexImage2D:it,compressedTexImage3D:ot,texImage2D:wt,texImage3D:zt,updateUBOMapping:Qt,uniformBlockBinding:Wt,texStorage2D:jt,texStorage3D:ct,texSubImage2D:et,texSubImage3D:It,compressedTexSubImage2D:Mt,compressedTexSubImage3D:bt,scissor:Gt,viewport:Et,reset:le}}function tc(n,t,e,i){const s=xm(i);switch(e){case Tc:return n*t;case Cc:return n*t;case Rc:return n*t*2;case Pc:return n*t/s.components*s.byteLength;case Fa:return n*t/s.components*s.byteLength;case Lc:return n*t*2/s.components*s.byteLength;case Oa:return n*t*2/s.components*s.byteLength;case Ac:return n*t*3/s.components*s.byteLength;case Mn:return n*t*4/s.components*s.byteLength;case za:return n*t*4/s.components*s.byteLength;case br:case Er:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Tr:case Ar:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Qo:case ea:return Math.max(n,16)*Math.max(t,8)/4;case jo:case ta:return Math.max(n,8)*Math.max(t,8)/2;case na:case ia:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case sa:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case ra:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case oa:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case aa:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case la:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case ca:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case ua:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case da:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case ha:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case fa:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case pa:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case ma:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case ga:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case _a:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case va:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case Cr:case Ma:case ya:return Math.ceil(n/4)*Math.ceil(t/4)*16;case Ic:case Sa:return Math.ceil(n/4)*Math.ceil(t/4)*8;case xa:case wa:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function xm(n){switch(n){case Wn:case wc:return{byteLength:1,components:1};case Os:case bc:case ks:return{byteLength:2,components:1};case Ua:case Na:return{byteLength:2,components:4};case Pi:case Da:case zn:return{byteLength:4,components:1};case Ec:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function wm(n,t,e,i,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ct,u=new WeakMap;let d;const h=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function f(C,w){return p?new OffscreenCanvas(C,w):Ir("canvas")}function v(C,w,k){let it=1;const ot=Ft(C);if((ot.width>k||ot.height>k)&&(it=k/Math.max(ot.width,ot.height)),it<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const et=Math.floor(it*ot.width),It=Math.floor(it*ot.height);d===void 0&&(d=f(et,It));const Mt=w?f(et,It):d;return Mt.width=et,Mt.height=It,Mt.getContext("2d").drawImage(C,0,0,et,It),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ot.width+"x"+ot.height+") to ("+et+"x"+It+")."),Mt}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ot.width+"x"+ot.height+")."),C;return C}function g(C){return C.generateMipmaps}function m(C){n.generateMipmap(C)}function S(C){return C.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?n.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function x(C,w,k,it,ot=!1){if(C!==null){if(n[C]!==void 0)return n[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let et=w;if(w===n.RED&&(k===n.FLOAT&&(et=n.R32F),k===n.HALF_FLOAT&&(et=n.R16F),k===n.UNSIGNED_BYTE&&(et=n.R8)),w===n.RED_INTEGER&&(k===n.UNSIGNED_BYTE&&(et=n.R8UI),k===n.UNSIGNED_SHORT&&(et=n.R16UI),k===n.UNSIGNED_INT&&(et=n.R32UI),k===n.BYTE&&(et=n.R8I),k===n.SHORT&&(et=n.R16I),k===n.INT&&(et=n.R32I)),w===n.RG&&(k===n.FLOAT&&(et=n.RG32F),k===n.HALF_FLOAT&&(et=n.RG16F),k===n.UNSIGNED_BYTE&&(et=n.RG8)),w===n.RG_INTEGER&&(k===n.UNSIGNED_BYTE&&(et=n.RG8UI),k===n.UNSIGNED_SHORT&&(et=n.RG16UI),k===n.UNSIGNED_INT&&(et=n.RG32UI),k===n.BYTE&&(et=n.RG8I),k===n.SHORT&&(et=n.RG16I),k===n.INT&&(et=n.RG32I)),w===n.RGB_INTEGER&&(k===n.UNSIGNED_BYTE&&(et=n.RGB8UI),k===n.UNSIGNED_SHORT&&(et=n.RGB16UI),k===n.UNSIGNED_INT&&(et=n.RGB32UI),k===n.BYTE&&(et=n.RGB8I),k===n.SHORT&&(et=n.RGB16I),k===n.INT&&(et=n.RGB32I)),w===n.RGBA_INTEGER&&(k===n.UNSIGNED_BYTE&&(et=n.RGBA8UI),k===n.UNSIGNED_SHORT&&(et=n.RGBA16UI),k===n.UNSIGNED_INT&&(et=n.RGBA32UI),k===n.BYTE&&(et=n.RGBA8I),k===n.SHORT&&(et=n.RGBA16I),k===n.INT&&(et=n.RGBA32I)),w===n.RGB&&k===n.UNSIGNED_INT_5_9_9_9_REV&&(et=n.RGB9_E5),w===n.RGBA){const It=ot?Hr:re.getTransfer(it);k===n.FLOAT&&(et=n.RGBA32F),k===n.HALF_FLOAT&&(et=n.RGBA16F),k===n.UNSIGNED_BYTE&&(et=It===pe?n.SRGB8_ALPHA8:n.RGBA8),k===n.UNSIGNED_SHORT_4_4_4_4&&(et=n.RGBA4),k===n.UNSIGNED_SHORT_5_5_5_1&&(et=n.RGB5_A1)}return(et===n.R16F||et===n.R32F||et===n.RG16F||et===n.RG32F||et===n.RGBA16F||et===n.RGBA32F)&&t.get("EXT_color_buffer_float"),et}function y(C,w){let k;return C?w===null||w===Pi||w===cs?k=n.DEPTH24_STENCIL8:w===zn?k=n.DEPTH32F_STENCIL8:w===Os&&(k=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===Pi||w===cs?k=n.DEPTH_COMPONENT24:w===zn?k=n.DEPTH_COMPONENT32F:w===Os&&(k=n.DEPTH_COMPONENT16),k}function U(C,w){return g(C)===!0||C.isFramebufferTexture&&C.minFilter!==yn&&C.minFilter!==Tn?Math.log2(Math.max(w.width,w.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?w.mipmaps.length:1}function P(C){const w=C.target;w.removeEventListener("dispose",P),L(w),w.isVideoTexture&&u.delete(w)}function R(C){const w=C.target;w.removeEventListener("dispose",R),M(w)}function L(C){const w=i.get(C);if(w.__webglInit===void 0)return;const k=C.source,it=h.get(k);if(it){const ot=it[w.__cacheKey];ot.usedTimes--,ot.usedTimes===0&&_(C),Object.keys(it).length===0&&h.delete(k)}i.remove(C)}function _(C){const w=i.get(C);n.deleteTexture(w.__webglTexture);const k=C.source,it=h.get(k);delete it[w.__cacheKey],o.memory.textures--}function M(C){const w=i.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),i.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let it=0;it<6;it++){if(Array.isArray(w.__webglFramebuffer[it]))for(let ot=0;ot<w.__webglFramebuffer[it].length;ot++)n.deleteFramebuffer(w.__webglFramebuffer[it][ot]);else n.deleteFramebuffer(w.__webglFramebuffer[it]);w.__webglDepthbuffer&&n.deleteRenderbuffer(w.__webglDepthbuffer[it])}else{if(Array.isArray(w.__webglFramebuffer))for(let it=0;it<w.__webglFramebuffer.length;it++)n.deleteFramebuffer(w.__webglFramebuffer[it]);else n.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&n.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&n.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let it=0;it<w.__webglColorRenderbuffer.length;it++)w.__webglColorRenderbuffer[it]&&n.deleteRenderbuffer(w.__webglColorRenderbuffer[it]);w.__webglDepthRenderbuffer&&n.deleteRenderbuffer(w.__webglDepthRenderbuffer)}const k=C.textures;for(let it=0,ot=k.length;it<ot;it++){const et=i.get(k[it]);et.__webglTexture&&(n.deleteTexture(et.__webglTexture),o.memory.textures--),i.remove(k[it])}i.remove(C)}let T=0;function I(){T=0}function B(){const C=T;return C>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+s.maxTextures),T+=1,C}function Z(C){const w=[];return w.push(C.wrapS),w.push(C.wrapT),w.push(C.wrapR||0),w.push(C.magFilter),w.push(C.minFilter),w.push(C.anisotropy),w.push(C.internalFormat),w.push(C.format),w.push(C.type),w.push(C.generateMipmaps),w.push(C.premultiplyAlpha),w.push(C.flipY),w.push(C.unpackAlignment),w.push(C.colorSpace),w.join()}function nt(C,w){const k=i.get(C);if(C.isVideoTexture&&Bt(C),C.isRenderTargetTexture===!1&&C.version>0&&k.__version!==C.version){const it=C.image;if(it===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(it.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{j(k,C,w);return}}e.bindTexture(n.TEXTURE_2D,k.__webglTexture,n.TEXTURE0+w)}function K(C,w){const k=i.get(C);if(C.version>0&&k.__version!==C.version){j(k,C,w);return}e.bindTexture(n.TEXTURE_2D_ARRAY,k.__webglTexture,n.TEXTURE0+w)}function rt(C,w){const k=i.get(C);if(C.version>0&&k.__version!==C.version){j(k,C,w);return}e.bindTexture(n.TEXTURE_3D,k.__webglTexture,n.TEXTURE0+w)}function Y(C,w){const k=i.get(C);if(C.version>0&&k.__version!==C.version){ut(k,C,w);return}e.bindTexture(n.TEXTURE_CUBE_MAP,k.__webglTexture,n.TEXTURE0+w)}const dt={[di]:n.REPEAT,[Ai]:n.CLAMP_TO_EDGE,[Jo]:n.MIRRORED_REPEAT},pt={[yn]:n.NEAREST,[$u]:n.NEAREST_MIPMAP_NEAREST,[$s]:n.NEAREST_MIPMAP_LINEAR,[Tn]:n.LINEAR,[Zr]:n.LINEAR_MIPMAP_NEAREST,[Ci]:n.LINEAR_MIPMAP_LINEAR},Rt={[ju]:n.NEVER,[sd]:n.ALWAYS,[Qu]:n.LESS,[Dc]:n.LEQUAL,[td]:n.EQUAL,[id]:n.GEQUAL,[ed]:n.GREATER,[nd]:n.NOTEQUAL};function Xt(C,w){if(w.type===zn&&t.has("OES_texture_float_linear")===!1&&(w.magFilter===Tn||w.magFilter===Zr||w.magFilter===$s||w.magFilter===Ci||w.minFilter===Tn||w.minFilter===Zr||w.minFilter===$s||w.minFilter===Ci)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(C,n.TEXTURE_WRAP_S,dt[w.wrapS]),n.texParameteri(C,n.TEXTURE_WRAP_T,dt[w.wrapT]),(C===n.TEXTURE_3D||C===n.TEXTURE_2D_ARRAY)&&n.texParameteri(C,n.TEXTURE_WRAP_R,dt[w.wrapR]),n.texParameteri(C,n.TEXTURE_MAG_FILTER,pt[w.magFilter]),n.texParameteri(C,n.TEXTURE_MIN_FILTER,pt[w.minFilter]),w.compareFunction&&(n.texParameteri(C,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(C,n.TEXTURE_COMPARE_FUNC,Rt[w.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===yn||w.minFilter!==$s&&w.minFilter!==Ci||w.type===zn&&t.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||i.get(w).__currentAnisotropy){const k=t.get("EXT_texture_filter_anisotropic");n.texParameterf(C,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,s.getMaxAnisotropy())),i.get(w).__currentAnisotropy=w.anisotropy}}}function se(C,w){let k=!1;C.__webglInit===void 0&&(C.__webglInit=!0,w.addEventListener("dispose",P));const it=w.source;let ot=h.get(it);ot===void 0&&(ot={},h.set(it,ot));const et=Z(w);if(et!==C.__cacheKey){ot[et]===void 0&&(ot[et]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,k=!0),ot[et].usedTimes++;const It=ot[C.__cacheKey];It!==void 0&&(ot[C.__cacheKey].usedTimes--,It.usedTimes===0&&_(w)),C.__cacheKey=et,C.__webglTexture=ot[et].texture}return k}function j(C,w,k){let it=n.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(it=n.TEXTURE_2D_ARRAY),w.isData3DTexture&&(it=n.TEXTURE_3D);const ot=se(C,w),et=w.source;e.bindTexture(it,C.__webglTexture,n.TEXTURE0+k);const It=i.get(et);if(et.version!==It.__version||ot===!0){e.activeTexture(n.TEXTURE0+k);const Mt=re.getPrimaries(re.workingColorSpace),bt=w.colorSpace===ri?null:re.getPrimaries(w.colorSpace),jt=w.colorSpace===ri||Mt===bt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,w.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,w.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,jt);let ct=v(w.image,!1,s.maxTextureSize);ct=Se(w,ct);const wt=r.convert(w.format,w.colorSpace),zt=r.convert(w.type);let Gt=x(w.internalFormat,wt,zt,w.colorSpace,w.isVideoTexture);Xt(it,w);let Et;const Qt=w.mipmaps,Wt=w.isVideoTexture!==!0,le=It.__version===void 0||ot===!0,N=et.dataReady,_t=U(w,ct);if(w.isDepthTexture)Gt=y(w.format===us,w.type),le&&(Wt?e.texStorage2D(n.TEXTURE_2D,1,Gt,ct.width,ct.height):e.texImage2D(n.TEXTURE_2D,0,Gt,ct.width,ct.height,0,wt,zt,null));else if(w.isDataTexture)if(Qt.length>0){Wt&&le&&e.texStorage2D(n.TEXTURE_2D,_t,Gt,Qt[0].width,Qt[0].height);for(let $=0,Q=Qt.length;$<Q;$++)Et=Qt[$],Wt?N&&e.texSubImage2D(n.TEXTURE_2D,$,0,0,Et.width,Et.height,wt,zt,Et.data):e.texImage2D(n.TEXTURE_2D,$,Gt,Et.width,Et.height,0,wt,zt,Et.data);w.generateMipmaps=!1}else Wt?(le&&e.texStorage2D(n.TEXTURE_2D,_t,Gt,ct.width,ct.height),N&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,ct.width,ct.height,wt,zt,ct.data)):e.texImage2D(n.TEXTURE_2D,0,Gt,ct.width,ct.height,0,wt,zt,ct.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){Wt&&le&&e.texStorage3D(n.TEXTURE_2D_ARRAY,_t,Gt,Qt[0].width,Qt[0].height,ct.depth);for(let $=0,Q=Qt.length;$<Q;$++)if(Et=Qt[$],w.format!==Mn)if(wt!==null)if(Wt){if(N)if(w.layerUpdates.size>0){const yt=tc(Et.width,Et.height,w.format,w.type);for(const St of w.layerUpdates){const qt=Et.data.subarray(St*yt/Et.data.BYTES_PER_ELEMENT,(St+1)*yt/Et.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,$,0,0,St,Et.width,Et.height,1,wt,qt)}w.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,$,0,0,0,Et.width,Et.height,ct.depth,wt,Et.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,$,Gt,Et.width,Et.height,ct.depth,0,Et.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Wt?N&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,$,0,0,0,Et.width,Et.height,ct.depth,wt,zt,Et.data):e.texImage3D(n.TEXTURE_2D_ARRAY,$,Gt,Et.width,Et.height,ct.depth,0,wt,zt,Et.data)}else{Wt&&le&&e.texStorage2D(n.TEXTURE_2D,_t,Gt,Qt[0].width,Qt[0].height);for(let $=0,Q=Qt.length;$<Q;$++)Et=Qt[$],w.format!==Mn?wt!==null?Wt?N&&e.compressedTexSubImage2D(n.TEXTURE_2D,$,0,0,Et.width,Et.height,wt,Et.data):e.compressedTexImage2D(n.TEXTURE_2D,$,Gt,Et.width,Et.height,0,Et.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Wt?N&&e.texSubImage2D(n.TEXTURE_2D,$,0,0,Et.width,Et.height,wt,zt,Et.data):e.texImage2D(n.TEXTURE_2D,$,Gt,Et.width,Et.height,0,wt,zt,Et.data)}else if(w.isDataArrayTexture)if(Wt){if(le&&e.texStorage3D(n.TEXTURE_2D_ARRAY,_t,Gt,ct.width,ct.height,ct.depth),N)if(w.layerUpdates.size>0){const $=tc(ct.width,ct.height,w.format,w.type);for(const Q of w.layerUpdates){const yt=ct.data.subarray(Q*$/ct.data.BYTES_PER_ELEMENT,(Q+1)*$/ct.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Q,ct.width,ct.height,1,wt,zt,yt)}w.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ct.width,ct.height,ct.depth,wt,zt,ct.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,Gt,ct.width,ct.height,ct.depth,0,wt,zt,ct.data);else if(w.isData3DTexture)Wt?(le&&e.texStorage3D(n.TEXTURE_3D,_t,Gt,ct.width,ct.height,ct.depth),N&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ct.width,ct.height,ct.depth,wt,zt,ct.data)):e.texImage3D(n.TEXTURE_3D,0,Gt,ct.width,ct.height,ct.depth,0,wt,zt,ct.data);else if(w.isFramebufferTexture){if(le)if(Wt)e.texStorage2D(n.TEXTURE_2D,_t,Gt,ct.width,ct.height);else{let $=ct.width,Q=ct.height;for(let yt=0;yt<_t;yt++)e.texImage2D(n.TEXTURE_2D,yt,Gt,$,Q,0,wt,zt,null),$>>=1,Q>>=1}}else if(Qt.length>0){if(Wt&&le){const $=Ft(Qt[0]);e.texStorage2D(n.TEXTURE_2D,_t,Gt,$.width,$.height)}for(let $=0,Q=Qt.length;$<Q;$++)Et=Qt[$],Wt?N&&e.texSubImage2D(n.TEXTURE_2D,$,0,0,wt,zt,Et):e.texImage2D(n.TEXTURE_2D,$,Gt,wt,zt,Et);w.generateMipmaps=!1}else if(Wt){if(le){const $=Ft(ct);e.texStorage2D(n.TEXTURE_2D,_t,Gt,$.width,$.height)}N&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,wt,zt,ct)}else e.texImage2D(n.TEXTURE_2D,0,Gt,wt,zt,ct);g(w)&&m(it),It.__version=et.version,w.onUpdate&&w.onUpdate(w)}C.__version=w.version}function ut(C,w,k){if(w.image.length!==6)return;const it=se(C,w),ot=w.source;e.bindTexture(n.TEXTURE_CUBE_MAP,C.__webglTexture,n.TEXTURE0+k);const et=i.get(ot);if(ot.version!==et.__version||it===!0){e.activeTexture(n.TEXTURE0+k);const It=re.getPrimaries(re.workingColorSpace),Mt=w.colorSpace===ri?null:re.getPrimaries(w.colorSpace),bt=w.colorSpace===ri||It===Mt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,w.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,w.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,bt);const jt=w.isCompressedTexture||w.image[0].isCompressedTexture,ct=w.image[0]&&w.image[0].isDataTexture,wt=[];for(let Q=0;Q<6;Q++)!jt&&!ct?wt[Q]=v(w.image[Q],!0,s.maxCubemapSize):wt[Q]=ct?w.image[Q].image:w.image[Q],wt[Q]=Se(w,wt[Q]);const zt=wt[0],Gt=r.convert(w.format,w.colorSpace),Et=r.convert(w.type),Qt=x(w.internalFormat,Gt,Et,w.colorSpace),Wt=w.isVideoTexture!==!0,le=et.__version===void 0||it===!0,N=ot.dataReady;let _t=U(w,zt);Xt(n.TEXTURE_CUBE_MAP,w);let $;if(jt){Wt&&le&&e.texStorage2D(n.TEXTURE_CUBE_MAP,_t,Qt,zt.width,zt.height);for(let Q=0;Q<6;Q++){$=wt[Q].mipmaps;for(let yt=0;yt<$.length;yt++){const St=$[yt];w.format!==Mn?Gt!==null?Wt?N&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,yt,0,0,St.width,St.height,Gt,St.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,yt,Qt,St.width,St.height,0,St.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Wt?N&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,yt,0,0,St.width,St.height,Gt,Et,St.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,yt,Qt,St.width,St.height,0,Gt,Et,St.data)}}}else{if($=w.mipmaps,Wt&&le){$.length>0&&_t++;const Q=Ft(wt[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,_t,Qt,Q.width,Q.height)}for(let Q=0;Q<6;Q++)if(ct){Wt?N&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,wt[Q].width,wt[Q].height,Gt,Et,wt[Q].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Qt,wt[Q].width,wt[Q].height,0,Gt,Et,wt[Q].data);for(let yt=0;yt<$.length;yt++){const qt=$[yt].image[Q].image;Wt?N&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,yt+1,0,0,qt.width,qt.height,Gt,Et,qt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,yt+1,Qt,qt.width,qt.height,0,Gt,Et,qt.data)}}else{Wt?N&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,Gt,Et,wt[Q]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Qt,Gt,Et,wt[Q]);for(let yt=0;yt<$.length;yt++){const St=$[yt];Wt?N&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,yt+1,0,0,Gt,Et,St.image[Q]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,yt+1,Qt,Gt,Et,St.image[Q])}}}g(w)&&m(n.TEXTURE_CUBE_MAP),et.__version=ot.version,w.onUpdate&&w.onUpdate(w)}C.__version=w.version}function Pt(C,w,k,it,ot,et){const It=r.convert(k.format,k.colorSpace),Mt=r.convert(k.type),bt=x(k.internalFormat,It,Mt,k.colorSpace),jt=i.get(w),ct=i.get(k);if(ct.__renderTarget=w,!jt.__hasExternalTextures){const wt=Math.max(1,w.width>>et),zt=Math.max(1,w.height>>et);ot===n.TEXTURE_3D||ot===n.TEXTURE_2D_ARRAY?e.texImage3D(ot,et,bt,wt,zt,w.depth,0,It,Mt,null):e.texImage2D(ot,et,bt,wt,zt,0,It,Mt,null)}e.bindFramebuffer(n.FRAMEBUFFER,C),ne(w)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,it,ot,ct.__webglTexture,0,ee(w)):(ot===n.TEXTURE_2D||ot>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ot<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,it,ot,ct.__webglTexture,et),e.bindFramebuffer(n.FRAMEBUFFER,null)}function mt(C,w,k){if(n.bindRenderbuffer(n.RENDERBUFFER,C),w.depthBuffer){const it=w.depthTexture,ot=it&&it.isDepthTexture?it.type:null,et=y(w.stencilBuffer,ot),It=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Mt=ee(w);ne(w)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Mt,et,w.width,w.height):k?n.renderbufferStorageMultisample(n.RENDERBUFFER,Mt,et,w.width,w.height):n.renderbufferStorage(n.RENDERBUFFER,et,w.width,w.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,It,n.RENDERBUFFER,C)}else{const it=w.textures;for(let ot=0;ot<it.length;ot++){const et=it[ot],It=r.convert(et.format,et.colorSpace),Mt=r.convert(et.type),bt=x(et.internalFormat,It,Mt,et.colorSpace),jt=ee(w);k&&ne(w)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,jt,bt,w.width,w.height):ne(w)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,jt,bt,w.width,w.height):n.renderbufferStorage(n.RENDERBUFFER,bt,w.width,w.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Ot(C,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,C),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const it=i.get(w.depthTexture);it.__renderTarget=w,(!it.__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),nt(w.depthTexture,0);const ot=it.__webglTexture,et=ee(w);if(w.depthTexture.format===ns)ne(w)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ot,0,et):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ot,0);else if(w.depthTexture.format===us)ne(w)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ot,0,et):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ot,0);else throw new Error("Unknown depthTexture format")}function Vt(C){const w=i.get(C),k=C.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==C.depthTexture){const it=C.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),it){const ot=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,it.removeEventListener("dispose",ot)};it.addEventListener("dispose",ot),w.__depthDisposeCallback=ot}w.__boundDepthTexture=it}if(C.depthTexture&&!w.__autoAllocateDepthBuffer){if(k)throw new Error("target.depthTexture not supported in Cube render targets");Ot(w.__webglFramebuffer,C)}else if(k){w.__webglDepthbuffer=[];for(let it=0;it<6;it++)if(e.bindFramebuffer(n.FRAMEBUFFER,w.__webglFramebuffer[it]),w.__webglDepthbuffer[it]===void 0)w.__webglDepthbuffer[it]=n.createRenderbuffer(),mt(w.__webglDepthbuffer[it],C,!1);else{const ot=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,et=w.__webglDepthbuffer[it];n.bindRenderbuffer(n.RENDERBUFFER,et),n.framebufferRenderbuffer(n.FRAMEBUFFER,ot,n.RENDERBUFFER,et)}}else if(e.bindFramebuffer(n.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=n.createRenderbuffer(),mt(w.__webglDepthbuffer,C,!1);else{const it=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ot=w.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,ot),n.framebufferRenderbuffer(n.FRAMEBUFFER,it,n.RENDERBUFFER,ot)}e.bindFramebuffer(n.FRAMEBUFFER,null)}function $t(C,w,k){const it=i.get(C);w!==void 0&&Pt(it.__webglFramebuffer,C,C.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),k!==void 0&&Vt(C)}function Me(C){const w=C.texture,k=i.get(C),it=i.get(w);C.addEventListener("dispose",R);const ot=C.textures,et=C.isWebGLCubeRenderTarget===!0,It=ot.length>1;if(It||(it.__webglTexture===void 0&&(it.__webglTexture=n.createTexture()),it.__version=w.version,o.memory.textures++),et){k.__webglFramebuffer=[];for(let Mt=0;Mt<6;Mt++)if(w.mipmaps&&w.mipmaps.length>0){k.__webglFramebuffer[Mt]=[];for(let bt=0;bt<w.mipmaps.length;bt++)k.__webglFramebuffer[Mt][bt]=n.createFramebuffer()}else k.__webglFramebuffer[Mt]=n.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){k.__webglFramebuffer=[];for(let Mt=0;Mt<w.mipmaps.length;Mt++)k.__webglFramebuffer[Mt]=n.createFramebuffer()}else k.__webglFramebuffer=n.createFramebuffer();if(It)for(let Mt=0,bt=ot.length;Mt<bt;Mt++){const jt=i.get(ot[Mt]);jt.__webglTexture===void 0&&(jt.__webglTexture=n.createTexture(),o.memory.textures++)}if(C.samples>0&&ne(C)===!1){k.__webglMultisampledFramebuffer=n.createFramebuffer(),k.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let Mt=0;Mt<ot.length;Mt++){const bt=ot[Mt];k.__webglColorRenderbuffer[Mt]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,k.__webglColorRenderbuffer[Mt]);const jt=r.convert(bt.format,bt.colorSpace),ct=r.convert(bt.type),wt=x(bt.internalFormat,jt,ct,bt.colorSpace,C.isXRRenderTarget===!0),zt=ee(C);n.renderbufferStorageMultisample(n.RENDERBUFFER,zt,wt,C.width,C.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Mt,n.RENDERBUFFER,k.__webglColorRenderbuffer[Mt])}n.bindRenderbuffer(n.RENDERBUFFER,null),C.depthBuffer&&(k.__webglDepthRenderbuffer=n.createRenderbuffer(),mt(k.__webglDepthRenderbuffer,C,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(et){e.bindTexture(n.TEXTURE_CUBE_MAP,it.__webglTexture),Xt(n.TEXTURE_CUBE_MAP,w);for(let Mt=0;Mt<6;Mt++)if(w.mipmaps&&w.mipmaps.length>0)for(let bt=0;bt<w.mipmaps.length;bt++)Pt(k.__webglFramebuffer[Mt][bt],C,w,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,bt);else Pt(k.__webglFramebuffer[Mt],C,w,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,0);g(w)&&m(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(It){for(let Mt=0,bt=ot.length;Mt<bt;Mt++){const jt=ot[Mt],ct=i.get(jt);e.bindTexture(n.TEXTURE_2D,ct.__webglTexture),Xt(n.TEXTURE_2D,jt),Pt(k.__webglFramebuffer,C,jt,n.COLOR_ATTACHMENT0+Mt,n.TEXTURE_2D,0),g(jt)&&m(n.TEXTURE_2D)}e.unbindTexture()}else{let Mt=n.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(Mt=C.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(Mt,it.__webglTexture),Xt(Mt,w),w.mipmaps&&w.mipmaps.length>0)for(let bt=0;bt<w.mipmaps.length;bt++)Pt(k.__webglFramebuffer[bt],C,w,n.COLOR_ATTACHMENT0,Mt,bt);else Pt(k.__webglFramebuffer,C,w,n.COLOR_ATTACHMENT0,Mt,0);g(w)&&m(Mt),e.unbindTexture()}C.depthBuffer&&Vt(C)}function te(C){const w=C.textures;for(let k=0,it=w.length;k<it;k++){const ot=w[k];if(g(ot)){const et=S(C),It=i.get(ot).__webglTexture;e.bindTexture(et,It),m(et),e.unbindTexture()}}}const Te=[],z=[];function Ye(C){if(C.samples>0){if(ne(C)===!1){const w=C.textures,k=C.width,it=C.height;let ot=n.COLOR_BUFFER_BIT;const et=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,It=i.get(C),Mt=w.length>1;if(Mt)for(let bt=0;bt<w.length;bt++)e.bindFramebuffer(n.FRAMEBUFFER,It.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+bt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,It.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+bt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,It.__webglMultisampledFramebuffer),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,It.__webglFramebuffer);for(let bt=0;bt<w.length;bt++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(ot|=n.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(ot|=n.STENCIL_BUFFER_BIT)),Mt){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,It.__webglColorRenderbuffer[bt]);const jt=i.get(w[bt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,jt,0)}n.blitFramebuffer(0,0,k,it,0,0,k,it,ot,n.NEAREST),l===!0&&(Te.length=0,z.length=0,Te.push(n.COLOR_ATTACHMENT0+bt),C.depthBuffer&&C.resolveDepthBuffer===!1&&(Te.push(et),z.push(et),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,z)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Te))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),Mt)for(let bt=0;bt<w.length;bt++){e.bindFramebuffer(n.FRAMEBUFFER,It.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+bt,n.RENDERBUFFER,It.__webglColorRenderbuffer[bt]);const jt=i.get(w[bt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,It.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+bt,n.TEXTURE_2D,jt,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,It.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&l){const w=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[w])}}}function ee(C){return Math.min(s.maxSamples,C.samples)}function ne(C){const w=i.get(C);return C.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function Bt(C){const w=o.render.frame;u.get(C)!==w&&(u.set(C,w),C.update())}function Se(C,w){const k=C.colorSpace,it=C.format,ot=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||k!==hs&&k!==ri&&(re.getTransfer(k)===pe?(it!==Mn||ot!==Wn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",k)),w}function Ft(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=B,this.resetTextureUnits=I,this.setTexture2D=nt,this.setTexture2DArray=K,this.setTexture3D=rt,this.setTextureCube=Y,this.rebindTextures=$t,this.setupRenderTarget=Me,this.updateRenderTargetMipmap=te,this.updateMultisampleRenderTarget=Ye,this.setupDepthRenderbuffer=Vt,this.setupFrameBufferTexture=Pt,this.useMultisampledRTT=ne}function bm(n,t){function e(i,s=ri){let r;const o=re.getTransfer(s);if(i===Wn)return n.UNSIGNED_BYTE;if(i===Ua)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Na)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Ec)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===wc)return n.BYTE;if(i===bc)return n.SHORT;if(i===Os)return n.UNSIGNED_SHORT;if(i===Da)return n.INT;if(i===Pi)return n.UNSIGNED_INT;if(i===zn)return n.FLOAT;if(i===ks)return n.HALF_FLOAT;if(i===Tc)return n.ALPHA;if(i===Ac)return n.RGB;if(i===Mn)return n.RGBA;if(i===Cc)return n.LUMINANCE;if(i===Rc)return n.LUMINANCE_ALPHA;if(i===ns)return n.DEPTH_COMPONENT;if(i===us)return n.DEPTH_STENCIL;if(i===Pc)return n.RED;if(i===Fa)return n.RED_INTEGER;if(i===Lc)return n.RG;if(i===Oa)return n.RG_INTEGER;if(i===za)return n.RGBA_INTEGER;if(i===br||i===Er||i===Tr||i===Ar)if(o===pe)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===br)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Er)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Tr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Ar)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===br)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Er)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Tr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Ar)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===jo||i===Qo||i===ta||i===ea)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===jo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Qo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===ta)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===ea)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===na||i===ia||i===sa)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===na||i===ia)return o===pe?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===sa)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===ra||i===oa||i===aa||i===la||i===ca||i===ua||i===da||i===ha||i===fa||i===pa||i===ma||i===ga||i===_a||i===va)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===ra)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===oa)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===aa)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===la)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===ca)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===ua)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===da)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===ha)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===fa)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===pa)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===ma)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===ga)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===_a)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===va)return o===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Cr||i===Ma||i===ya)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===Cr)return o===pe?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Ma)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===ya)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Ic||i===Sa||i===xa||i===wa)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===Cr)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Sa)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===xa)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===wa)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===cs?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}class Em extends xe{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Dt extends Ie{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Tm={type:"move"};class wo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Dt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Dt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new b,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new b),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Dt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new b,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new b),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const v of t.hand.values()){const g=e.getJointPose(v,i),m=this._getHandJoint(c,v);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],h=u.position.distanceTo(d.position),p=.02,f=.005;c.inputState.pinching&&h>p+f?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&h<=p-f&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Tm)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new Dt;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}const Am=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Cm=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Rm{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){const s=new je,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=i.depthNear||e.depthFar!=i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new Xn({vertexShader:Am,fragmentShader:Cm,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new D(new Yt(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Pm extends fs{constructor(t,e){super();const i=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,u=null,d=null,h=null,p=null,f=null;const v=new Rm,g=e.getContextAttributes();let m=null,S=null;const x=[],y=[],U=new Ct;let P=null;const R=new xe;R.viewport=new ge;const L=new xe;L.viewport=new ge;const _=[R,L],M=new Em;let T=null,I=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let ut=x[j];return ut===void 0&&(ut=new wo,x[j]=ut),ut.getTargetRaySpace()},this.getControllerGrip=function(j){let ut=x[j];return ut===void 0&&(ut=new wo,x[j]=ut),ut.getGripSpace()},this.getHand=function(j){let ut=x[j];return ut===void 0&&(ut=new wo,x[j]=ut),ut.getHandSpace()};function B(j){const ut=y.indexOf(j.inputSource);if(ut===-1)return;const Pt=x[ut];Pt!==void 0&&(Pt.update(j.inputSource,j.frame,c||o),Pt.dispatchEvent({type:j.type,data:j.inputSource}))}function Z(){s.removeEventListener("select",B),s.removeEventListener("selectstart",B),s.removeEventListener("selectend",B),s.removeEventListener("squeeze",B),s.removeEventListener("squeezestart",B),s.removeEventListener("squeezeend",B),s.removeEventListener("end",Z),s.removeEventListener("inputsourceschange",nt);for(let j=0;j<x.length;j++){const ut=y[j];ut!==null&&(y[j]=null,x[j].disconnect(ut))}T=null,I=null,v.reset(),t.setRenderTarget(m),p=null,h=null,d=null,s=null,S=null,se.stop(),i.isPresenting=!1,t.setPixelRatio(P),t.setSize(U.width,U.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){r=j,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){a=j,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(j){c=j},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return d},this.getFrame=function(){return f},this.getSession=function(){return s},this.setSession=async function(j){if(s=j,s!==null){if(m=t.getRenderTarget(),s.addEventListener("select",B),s.addEventListener("selectstart",B),s.addEventListener("selectend",B),s.addEventListener("squeeze",B),s.addEventListener("squeezestart",B),s.addEventListener("squeezeend",B),s.addEventListener("end",Z),s.addEventListener("inputsourceschange",nt),g.xrCompatible!==!0&&await e.makeXRCompatible(),P=t.getPixelRatio(),t.getSize(U),s.renderState.layers===void 0){const ut={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,e,ut),s.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),S=new Li(p.framebufferWidth,p.framebufferHeight,{format:Mn,type:Wn,colorSpace:t.outputColorSpace,stencilBuffer:g.stencil})}else{let ut=null,Pt=null,mt=null;g.depth&&(mt=g.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,ut=g.stencil?us:ns,Pt=g.stencil?cs:Pi);const Ot={colorFormat:e.RGBA8,depthFormat:mt,scaleFactor:r};d=new XRWebGLBinding(s,e),h=d.createProjectionLayer(Ot),s.updateRenderState({layers:[h]}),t.setPixelRatio(1),t.setSize(h.textureWidth,h.textureHeight,!1),S=new Li(h.textureWidth,h.textureHeight,{format:Mn,type:Wn,depthTexture:new Xc(h.textureWidth,h.textureHeight,Pt,void 0,void 0,void 0,void 0,void 0,void 0,ut),stencilBuffer:g.stencil,colorSpace:t.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),se.setContext(s),se.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function nt(j){for(let ut=0;ut<j.removed.length;ut++){const Pt=j.removed[ut],mt=y.indexOf(Pt);mt>=0&&(y[mt]=null,x[mt].disconnect(Pt))}for(let ut=0;ut<j.added.length;ut++){const Pt=j.added[ut];let mt=y.indexOf(Pt);if(mt===-1){for(let Vt=0;Vt<x.length;Vt++)if(Vt>=y.length){y.push(Pt),mt=Vt;break}else if(y[Vt]===null){y[Vt]=Pt,mt=Vt;break}if(mt===-1)break}const Ot=x[mt];Ot&&Ot.connect(Pt)}}const K=new b,rt=new b;function Y(j,ut,Pt){K.setFromMatrixPosition(ut.matrixWorld),rt.setFromMatrixPosition(Pt.matrixWorld);const mt=K.distanceTo(rt),Ot=ut.projectionMatrix.elements,Vt=Pt.projectionMatrix.elements,$t=Ot[14]/(Ot[10]-1),Me=Ot[14]/(Ot[10]+1),te=(Ot[9]+1)/Ot[5],Te=(Ot[9]-1)/Ot[5],z=(Ot[8]-1)/Ot[0],Ye=(Vt[8]+1)/Vt[0],ee=$t*z,ne=$t*Ye,Bt=mt/(-z+Ye),Se=Bt*-z;if(ut.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(Se),j.translateZ(Bt),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),Ot[10]===-1)j.projectionMatrix.copy(ut.projectionMatrix),j.projectionMatrixInverse.copy(ut.projectionMatrixInverse);else{const Ft=$t+Bt,C=Me+Bt,w=ee-Se,k=ne+(mt-Se),it=te*Me/C*Ft,ot=Te*Me/C*Ft;j.projectionMatrix.makePerspective(w,k,it,ot,Ft,C),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function dt(j,ut){ut===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(ut.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(s===null)return;let ut=j.near,Pt=j.far;v.texture!==null&&(v.depthNear>0&&(ut=v.depthNear),v.depthFar>0&&(Pt=v.depthFar)),M.near=L.near=R.near=ut,M.far=L.far=R.far=Pt,(T!==M.near||I!==M.far)&&(s.updateRenderState({depthNear:M.near,depthFar:M.far}),T=M.near,I=M.far),R.layers.mask=j.layers.mask|2,L.layers.mask=j.layers.mask|4,M.layers.mask=R.layers.mask|L.layers.mask;const mt=j.parent,Ot=M.cameras;dt(M,mt);for(let Vt=0;Vt<Ot.length;Vt++)dt(Ot[Vt],mt);Ot.length===2?Y(M,R,L):M.projectionMatrix.copy(R.projectionMatrix),pt(j,M,mt)};function pt(j,ut,Pt){Pt===null?j.matrix.copy(ut.matrixWorld):(j.matrix.copy(Pt.matrixWorld),j.matrix.invert(),j.matrix.multiply(ut.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(ut.projectionMatrix),j.projectionMatrixInverse.copy(ut.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=zs*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(h===null&&p===null))return l},this.setFoveation=function(j){l=j,h!==null&&(h.fixedFoveation=j),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=j)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(M)};let Rt=null;function Xt(j,ut){if(u=ut.getViewerPose(c||o),f=ut,u!==null){const Pt=u.views;p!==null&&(t.setRenderTargetFramebuffer(S,p.framebuffer),t.setRenderTarget(S));let mt=!1;Pt.length!==M.cameras.length&&(M.cameras.length=0,mt=!0);for(let Vt=0;Vt<Pt.length;Vt++){const $t=Pt[Vt];let Me=null;if(p!==null)Me=p.getViewport($t);else{const Te=d.getViewSubImage(h,$t);Me=Te.viewport,Vt===0&&(t.setRenderTargetTextures(S,Te.colorTexture,h.ignoreDepthValues?void 0:Te.depthStencilTexture),t.setRenderTarget(S))}let te=_[Vt];te===void 0&&(te=new xe,te.layers.enable(Vt),te.viewport=new ge,_[Vt]=te),te.matrix.fromArray($t.transform.matrix),te.matrix.decompose(te.position,te.quaternion,te.scale),te.projectionMatrix.fromArray($t.projectionMatrix),te.projectionMatrixInverse.copy(te.projectionMatrix).invert(),te.viewport.set(Me.x,Me.y,Me.width,Me.height),Vt===0&&(M.matrix.copy(te.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),mt===!0&&M.cameras.push(te)}const Ot=s.enabledFeatures;if(Ot&&Ot.includes("depth-sensing")){const Vt=d.getDepthInformation(Pt[0]);Vt&&Vt.isValid&&Vt.texture&&v.init(t,Vt,s.renderState)}}for(let Pt=0;Pt<x.length;Pt++){const mt=y[Pt],Ot=x[Pt];mt!==null&&Ot!==void 0&&Ot.update(mt,ut,c||o)}Rt&&Rt(j,ut),ut.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ut}),f=null}const se=new Vc;se.setAnimationLoop(Xt),this.setAnimationLoop=function(j){Rt=j},this.dispose=function(){}}}const vi=new xn,Lm=new ve;function Im(n,t){function e(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function i(g,m){m.color.getRGB(g.fogColor.value,kc(n)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function s(g,m,S,x,y){m.isMeshBasicMaterial||m.isMeshLambertMaterial?r(g,m):m.isMeshToonMaterial?(r(g,m),d(g,m)):m.isMeshPhongMaterial?(r(g,m),u(g,m)):m.isMeshStandardMaterial?(r(g,m),h(g,m),m.isMeshPhysicalMaterial&&p(g,m,y)):m.isMeshMatcapMaterial?(r(g,m),f(g,m)):m.isMeshDepthMaterial?r(g,m):m.isMeshDistanceMaterial?(r(g,m),v(g,m)):m.isMeshNormalMaterial?r(g,m):m.isLineBasicMaterial?(o(g,m),m.isLineDashedMaterial&&a(g,m)):m.isPointsMaterial?l(g,m,S,x):m.isSpriteMaterial?c(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,e(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,e(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===Xe&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,e(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===Xe&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,e(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,e(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);const S=t.get(m),x=S.envMap,y=S.envMapRotation;x&&(g.envMap.value=x,vi.copy(y),vi.x*=-1,vi.y*=-1,vi.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(vi.y*=-1,vi.z*=-1),g.envMapRotation.value.setFromMatrix4(Lm.makeRotationFromEuler(vi)),g.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,g.aoMapTransform))}function o(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,e(m.map,g.mapTransform))}function a(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function l(g,m,S,x){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*S,g.scale.value=x*.5,m.map&&(g.map.value=m.map,e(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function c(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,e(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function u(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function d(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function h(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function p(g,m,S){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Xe&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=S.texture,g.transmissionSamplerSize.value.set(S.width,S.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,g.specularIntensityMapTransform))}function f(g,m){m.matcap&&(g.matcap.value=m.matcap)}function v(g,m){const S=t.get(m).light;g.referencePosition.value.setFromMatrixPosition(S.matrixWorld),g.nearDistance.value=S.shadow.camera.near,g.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function Dm(n,t,e,i){let s={},r={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,x){const y=x.program;i.uniformBlockBinding(S,y)}function c(S,x){let y=s[S.id];y===void 0&&(f(S),y=u(S),s[S.id]=y,S.addEventListener("dispose",g));const U=x.program;i.updateUBOMapping(S,U);const P=t.render.frame;r[S.id]!==P&&(h(S),r[S.id]=P)}function u(S){const x=d();S.__bindingPointIndex=x;const y=n.createBuffer(),U=S.__size,P=S.usage;return n.bindBuffer(n.UNIFORM_BUFFER,y),n.bufferData(n.UNIFORM_BUFFER,U,P),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,x,y),y}function d(){for(let S=0;S<a;S++)if(o.indexOf(S)===-1)return o.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(S){const x=s[S.id],y=S.uniforms,U=S.__cache;n.bindBuffer(n.UNIFORM_BUFFER,x);for(let P=0,R=y.length;P<R;P++){const L=Array.isArray(y[P])?y[P]:[y[P]];for(let _=0,M=L.length;_<M;_++){const T=L[_];if(p(T,P,_,U)===!0){const I=T.__offset,B=Array.isArray(T.value)?T.value:[T.value];let Z=0;for(let nt=0;nt<B.length;nt++){const K=B[nt],rt=v(K);typeof K=="number"||typeof K=="boolean"?(T.__data[0]=K,n.bufferSubData(n.UNIFORM_BUFFER,I+Z,T.__data)):K.isMatrix3?(T.__data[0]=K.elements[0],T.__data[1]=K.elements[1],T.__data[2]=K.elements[2],T.__data[3]=0,T.__data[4]=K.elements[3],T.__data[5]=K.elements[4],T.__data[6]=K.elements[5],T.__data[7]=0,T.__data[8]=K.elements[6],T.__data[9]=K.elements[7],T.__data[10]=K.elements[8],T.__data[11]=0):(K.toArray(T.__data,Z),Z+=rt.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,I,T.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(S,x,y,U){const P=S.value,R=x+"_"+y;if(U[R]===void 0)return typeof P=="number"||typeof P=="boolean"?U[R]=P:U[R]=P.clone(),!0;{const L=U[R];if(typeof P=="number"||typeof P=="boolean"){if(L!==P)return U[R]=P,!0}else if(L.equals(P)===!1)return L.copy(P),!0}return!1}function f(S){const x=S.uniforms;let y=0;const U=16;for(let R=0,L=x.length;R<L;R++){const _=Array.isArray(x[R])?x[R]:[x[R]];for(let M=0,T=_.length;M<T;M++){const I=_[M],B=Array.isArray(I.value)?I.value:[I.value];for(let Z=0,nt=B.length;Z<nt;Z++){const K=B[Z],rt=v(K),Y=y%U,dt=Y%rt.boundary,pt=Y+dt;y+=dt,pt!==0&&U-pt<rt.storage&&(y+=U-pt),I.__data=new Float32Array(rt.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=y,y+=rt.storage}}}const P=y%U;return P>0&&(y+=U-P),S.__size=y,S.__cache={},this}function v(S){const x={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(x.boundary=4,x.storage=4):S.isVector2?(x.boundary=8,x.storage=8):S.isVector3||S.isColor?(x.boundary=16,x.storage=12):S.isVector4?(x.boundary=16,x.storage=16):S.isMatrix3?(x.boundary=48,x.storage=48):S.isMatrix4?(x.boundary=64,x.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),x}function g(S){const x=S.target;x.removeEventListener("dispose",g);const y=o.indexOf(x.__bindingPointIndex);o.splice(y,1),n.deleteBuffer(s[x.id]),delete s[x.id],delete r[x.id]}function m(){for(const S in s)n.deleteBuffer(s[S]);o=[],s={},r={}}return{bind:l,update:c,dispose:m}}class Wa{constructor(t={}){const{canvas:e=Sd(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:h=!1}=t;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=o;const f=new Uint32Array(4),v=new Int32Array(4);let g=null,m=null;const S=[],x=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=me,this.toneMapping=ci,this.toneMappingExposure=1;const y=this;let U=!1,P=0,R=0,L=null,_=-1,M=null;const T=new ge,I=new ge;let B=null;const Z=new Tt(0);let nt=0,K=e.width,rt=e.height,Y=1,dt=null,pt=null;const Rt=new ge(0,0,K,rt),Xt=new ge(0,0,K,rt);let se=!1;const j=new Ha;let ut=!1,Pt=!1;const mt=new ve,Ot=new ve,Vt=new b,$t=new ge,Me={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let te=!1;function Te(){return L===null?Y:1}let z=i;function Ye(E,O){return e.getContext(E,O)}try{const E={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${La}`),e.addEventListener("webglcontextlost",Q,!1),e.addEventListener("webglcontextrestored",yt,!1),e.addEventListener("webglcontextcreationerror",St,!1),z===null){const O="webgl2";if(z=Ye(O,E),z===null)throw Ye(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let ee,ne,Bt,Se,Ft,C,w,k,it,ot,et,It,Mt,bt,jt,ct,wt,zt,Gt,Et,Qt,Wt,le,N;function _t(){ee=new Bp(z),ee.init(),Wt=new bm(z,ee),ne=new Dp(z,ee,t,Wt),Bt=new Sm(z,ee),ne.reverseDepthBuffer&&h&&Bt.buffers.depth.setReversed(!0),Se=new Hp(z),Ft=new om,C=new wm(z,ee,Bt,Ft,ne,Wt,Se),w=new Np(y),k=new zp(y),it=new $d(z),le=new Lp(z,it),ot=new kp(z,it,Se,le),et=new Wp(z,ot,it,Se),Gt=new Vp(z,ne,C),ct=new Up(Ft),It=new rm(y,w,k,ee,ne,le,ct),Mt=new Im(y,Ft),bt=new lm,jt=new pm(ee),zt=new Pp(y,w,k,Bt,et,p,l),wt=new Mm(y,et,ne),N=new Dm(z,Se,ne,Bt),Et=new Ip(z,ee,Se),Qt=new Gp(z,ee,Se),Se.programs=It.programs,y.capabilities=ne,y.extensions=ee,y.properties=Ft,y.renderLists=bt,y.shadowMap=wt,y.state=Bt,y.info=Se}_t();const $=new Pm(y,z);this.xr=$,this.getContext=function(){return z},this.getContextAttributes=function(){return z.getContextAttributes()},this.forceContextLoss=function(){const E=ee.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=ee.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return Y},this.setPixelRatio=function(E){E!==void 0&&(Y=E,this.setSize(K,rt,!1))},this.getSize=function(E){return E.set(K,rt)},this.setSize=function(E,O,V=!0){if($.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}K=E,rt=O,e.width=Math.floor(E*Y),e.height=Math.floor(O*Y),V===!0&&(e.style.width=E+"px",e.style.height=O+"px"),this.setViewport(0,0,E,O)},this.getDrawingBufferSize=function(E){return E.set(K*Y,rt*Y).floor()},this.setDrawingBufferSize=function(E,O,V){K=E,rt=O,Y=V,e.width=Math.floor(E*V),e.height=Math.floor(O*V),this.setViewport(0,0,E,O)},this.getCurrentViewport=function(E){return E.copy(T)},this.getViewport=function(E){return E.copy(Rt)},this.setViewport=function(E,O,V,W){E.isVector4?Rt.set(E.x,E.y,E.z,E.w):Rt.set(E,O,V,W),Bt.viewport(T.copy(Rt).multiplyScalar(Y).round())},this.getScissor=function(E){return E.copy(Xt)},this.setScissor=function(E,O,V,W){E.isVector4?Xt.set(E.x,E.y,E.z,E.w):Xt.set(E,O,V,W),Bt.scissor(I.copy(Xt).multiplyScalar(Y).round())},this.getScissorTest=function(){return se},this.setScissorTest=function(E){Bt.setScissorTest(se=E)},this.setOpaqueSort=function(E){dt=E},this.setTransparentSort=function(E){pt=E},this.getClearColor=function(E){return E.copy(zt.getClearColor())},this.setClearColor=function(){zt.setClearColor.apply(zt,arguments)},this.getClearAlpha=function(){return zt.getClearAlpha()},this.setClearAlpha=function(){zt.setClearAlpha.apply(zt,arguments)},this.clear=function(E=!0,O=!0,V=!0){let W=0;if(E){let F=!1;if(L!==null){const A=L.texture.format;F=A===za||A===Oa||A===Fa}if(F){const A=L.texture.type,tt=A===Wn||A===Pi||A===Os||A===cs||A===Ua||A===Na,lt=zt.getClearColor(),gt=zt.getClearAlpha(),xt=lt.r,kt=lt.g,At=lt.b;tt?(f[0]=xt,f[1]=kt,f[2]=At,f[3]=gt,z.clearBufferuiv(z.COLOR,0,f)):(v[0]=xt,v[1]=kt,v[2]=At,v[3]=gt,z.clearBufferiv(z.COLOR,0,v))}else W|=z.COLOR_BUFFER_BIT}O&&(W|=z.DEPTH_BUFFER_BIT),V&&(W|=z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Q,!1),e.removeEventListener("webglcontextrestored",yt,!1),e.removeEventListener("webglcontextcreationerror",St,!1),bt.dispose(),jt.dispose(),Ft.dispose(),w.dispose(),k.dispose(),et.dispose(),le.dispose(),N.dispose(),It.dispose(),$.dispose(),$.removeEventListener("sessionstart",Xs),$.removeEventListener("sessionend",qs),G.stop()};function Q(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),U=!0}function yt(){console.log("THREE.WebGLRenderer: Context Restored."),U=!1;const E=Se.autoReset,O=wt.enabled,V=wt.autoUpdate,W=wt.needsUpdate,F=wt.type;_t(),Se.autoReset=E,wt.enabled=O,wt.autoUpdate=V,wt.needsUpdate=W,wt.type=F}function St(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function qt(E){const O=E.target;O.removeEventListener("dispose",qt),Ae(O)}function Ae(E){Ue(E),Ft.remove(E)}function Ue(E){const O=Ft.get(E).programs;O!==void 0&&(O.forEach(function(V){It.releaseProgram(V)}),E.isShaderMaterial&&It.releaseShaderCache(E))}this.renderBufferDirect=function(E,O,V,W,F,A){O===null&&(O=Me);const tt=F.isMesh&&F.matrixWorld.determinant()<0,lt=Qe(E,O,V,W,F);Bt.setMaterial(W,tt);let gt=V.index,xt=1;if(W.wireframe===!0){if(gt=ot.getWireframeAttribute(V),gt===void 0)return;xt=2}const kt=V.drawRange,At=V.attributes.position;let ie=kt.start*xt,ue=(kt.start+kt.count)*xt;A!==null&&(ie=Math.max(ie,A.start*xt),ue=Math.min(ue,(A.start+A.count)*xt)),gt!==null?(ie=Math.max(ie,0),ue=Math.min(ue,gt.count)):At!=null&&(ie=Math.max(ie,0),ue=Math.min(ue,At.count));const he=ue-ie;if(he<0||he===1/0)return;le.setup(F,W,lt,V,gt);let He,ae=Et;if(gt!==null&&(He=it.get(gt),ae=Qt,ae.setIndex(He)),F.isMesh)W.wireframe===!0?(Bt.setLineWidth(W.wireframeLinewidth*Te()),ae.setMode(z.LINES)):ae.setMode(z.TRIANGLES);else if(F.isLine){let Ut=W.linewidth;Ut===void 0&&(Ut=1),Bt.setLineWidth(Ut*Te()),F.isLineSegments?ae.setMode(z.LINES):F.isLineLoop?ae.setMode(z.LINE_LOOP):ae.setMode(z.LINE_STRIP)}else F.isPoints?ae.setMode(z.POINTS):F.isSprite&&ae.setMode(z.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)ae.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(ee.get("WEBGL_multi_draw"))ae.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{const Ut=F._multiDrawStarts,Rn=F._multiDrawCounts,ce=F._multiDrawCount,pn=gt?it.get(gt).bytesPerElement:1,Ni=Ft.get(W).currentProgram.getUniforms();for(let nn=0;nn<ce;nn++)Ni.setValue(z,"_gl_DrawID",nn),ae.render(Ut[nn]/pn,Rn[nn])}else if(F.isInstancedMesh)ae.renderInstances(ie,he,F.count);else if(V.isInstancedBufferGeometry){const Ut=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,Rn=Math.min(V.instanceCount,Ut);ae.renderInstances(ie,he,Rn)}else ae.render(ie,he)};function oe(E,O,V){E.transparent===!0&&E.side===Ke&&E.forceSinglePass===!1?(E.side=Xe,E.needsUpdate=!0,ft(E,O,V),E.side=ui,E.needsUpdate=!0,ft(E,O,V),E.side=Ke):ft(E,O,V)}this.compile=function(E,O,V=null){V===null&&(V=E),m=jt.get(V),m.init(O),x.push(m),V.traverseVisible(function(F){F.isLight&&F.layers.test(O.layers)&&(m.pushLight(F),F.castShadow&&m.pushShadow(F))}),E!==V&&E.traverseVisible(function(F){F.isLight&&F.layers.test(O.layers)&&(m.pushLight(F),F.castShadow&&m.pushShadow(F))}),m.setupLights();const W=new Set;return E.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;const A=F.material;if(A)if(Array.isArray(A))for(let tt=0;tt<A.length;tt++){const lt=A[tt];oe(lt,V,F),W.add(lt)}else oe(A,V,F),W.add(A)}),x.pop(),m=null,W},this.compileAsync=function(E,O,V=null){const W=this.compile(E,O,V);return new Promise(F=>{function A(){if(W.forEach(function(tt){Ft.get(tt).currentProgram.isReady()&&W.delete(tt)}),W.size===0){F(E);return}setTimeout(A,10)}ee.get("KHR_parallel_shader_compile")!==null?A():setTimeout(A,10)})};let en=null;function fn(E){en&&en(E)}function Xs(){G.stop()}function qs(){G.start()}const G=new Vc;G.setAnimationLoop(fn),typeof self<"u"&&G.setContext(self),this.setAnimationLoop=function(E){en=E,$.setAnimationLoop(E),E===null?G.stop():G.start()},$.addEventListener("sessionstart",Xs),$.addEventListener("sessionend",qs),this.render=function(E,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(U===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),$.enabled===!0&&$.isPresenting===!0&&($.cameraAutoUpdate===!0&&$.updateCamera(O),O=$.getCamera()),E.isScene===!0&&E.onBeforeRender(y,E,O,L),m=jt.get(E,x.length),m.init(O),x.push(m),Ot.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),j.setFromProjectionMatrix(Ot),Pt=this.localClippingEnabled,ut=ct.init(this.clippingPlanes,Pt),g=bt.get(E,S.length),g.init(),S.push(g),$.enabled===!0&&$.isPresenting===!0){const A=y.xr.getDepthSensingMesh();A!==null&&X(A,O,-1/0,y.sortObjects)}X(E,O,0,y.sortObjects),g.finish(),y.sortObjects===!0&&g.sort(dt,pt),te=$.enabled===!1||$.isPresenting===!1||$.hasDepthSensing()===!1,te&&zt.addToRenderList(g,E),this.info.render.frame++,ut===!0&&ct.beginShadows();const V=m.state.shadowsArray;wt.render(V,E,O),ut===!0&&ct.endShadows(),this.info.autoReset===!0&&this.info.reset();const W=g.opaque,F=g.transmissive;if(m.setupLights(),O.isArrayCamera){const A=O.cameras;if(F.length>0)for(let tt=0,lt=A.length;tt<lt;tt++){const gt=A[tt];J(W,F,E,gt)}te&&zt.render(E);for(let tt=0,lt=A.length;tt<lt;tt++){const gt=A[tt];H(g,E,gt,gt.viewport)}}else F.length>0&&J(W,F,E,O),te&&zt.render(E),H(g,E,O);L!==null&&(C.updateMultisampleRenderTarget(L),C.updateRenderTargetMipmap(L)),E.isScene===!0&&E.onAfterRender(y,E,O),le.resetDefaultState(),_=-1,M=null,x.pop(),x.length>0?(m=x[x.length-1],ut===!0&&ct.setGlobalState(y.clippingPlanes,m.state.camera)):m=null,S.pop(),S.length>0?g=S[S.length-1]:g=null};function X(E,O,V,W){if(E.visible===!1)return;if(E.layers.test(O.layers)){if(E.isGroup)V=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(O);else if(E.isLight)m.pushLight(E),E.castShadow&&m.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||j.intersectsSprite(E)){W&&$t.setFromMatrixPosition(E.matrixWorld).applyMatrix4(Ot);const tt=et.update(E),lt=E.material;lt.visible&&g.push(E,tt,lt,V,$t.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||j.intersectsObject(E))){const tt=et.update(E),lt=E.material;if(W&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),$t.copy(E.boundingSphere.center)):(tt.boundingSphere===null&&tt.computeBoundingSphere(),$t.copy(tt.boundingSphere.center)),$t.applyMatrix4(E.matrixWorld).applyMatrix4(Ot)),Array.isArray(lt)){const gt=tt.groups;for(let xt=0,kt=gt.length;xt<kt;xt++){const At=gt[xt],ie=lt[At.materialIndex];ie&&ie.visible&&g.push(E,tt,ie,V,$t.z,At)}}else lt.visible&&g.push(E,tt,lt,V,$t.z,null)}}const A=E.children;for(let tt=0,lt=A.length;tt<lt;tt++)X(A[tt],O,V,W)}function H(E,O,V,W){const F=E.opaque,A=E.transmissive,tt=E.transparent;m.setupLightsView(V),ut===!0&&ct.setGlobalState(y.clippingPlanes,V),W&&Bt.viewport(T.copy(W)),F.length>0&&st(F,O,V),A.length>0&&st(A,O,V),tt.length>0&&st(tt,O,V),Bt.buffers.depth.setTest(!0),Bt.buffers.depth.setMask(!0),Bt.buffers.color.setMask(!0),Bt.setPolygonOffset(!1)}function J(E,O,V,W){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[W.id]===void 0&&(m.state.transmissionRenderTarget[W.id]=new Li(1,1,{generateMipmaps:!0,type:ee.has("EXT_color_buffer_half_float")||ee.has("EXT_color_buffer_float")?ks:Wn,minFilter:Ci,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:re.workingColorSpace}));const A=m.state.transmissionRenderTarget[W.id],tt=W.viewport||T;A.setSize(tt.z,tt.w);const lt=y.getRenderTarget();y.setRenderTarget(A),y.getClearColor(Z),nt=y.getClearAlpha(),nt<1&&y.setClearColor(16777215,.5),y.clear(),te&&zt.render(V);const gt=y.toneMapping;y.toneMapping=ci;const xt=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),m.setupLightsView(W),ut===!0&&ct.setGlobalState(y.clippingPlanes,W),st(E,V,W),C.updateMultisampleRenderTarget(A),C.updateRenderTargetMipmap(A),ee.has("WEBGL_multisampled_render_to_texture")===!1){let kt=!1;for(let At=0,ie=O.length;At<ie;At++){const ue=O[At],he=ue.object,He=ue.geometry,ae=ue.material,Ut=ue.group;if(ae.side===Ke&&he.layers.test(W.layers)){const Rn=ae.side;ae.side=Xe,ae.needsUpdate=!0,at(he,V,W,He,ae,Ut),ae.side=Rn,ae.needsUpdate=!0,kt=!0}}kt===!0&&(C.updateMultisampleRenderTarget(A),C.updateRenderTargetMipmap(A))}y.setRenderTarget(lt),y.setClearColor(Z,nt),xt!==void 0&&(W.viewport=xt),y.toneMapping=gt}function st(E,O,V){const W=O.isScene===!0?O.overrideMaterial:null;for(let F=0,A=E.length;F<A;F++){const tt=E[F],lt=tt.object,gt=tt.geometry,xt=W===null?tt.material:W,kt=tt.group;lt.layers.test(V.layers)&&at(lt,O,V,gt,xt,kt)}}function at(E,O,V,W,F,A){E.onBeforeRender(y,O,V,W,F,A),E.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),F.onBeforeRender(y,O,V,W,E,A),F.transparent===!0&&F.side===Ke&&F.forceSinglePass===!1?(F.side=Xe,F.needsUpdate=!0,y.renderBufferDirect(V,O,W,F,E,A),F.side=ui,F.needsUpdate=!0,y.renderBufferDirect(V,O,W,F,E,A),F.side=Ke):y.renderBufferDirect(V,O,W,F,E,A),E.onAfterRender(y,O,V,W,F,A)}function ft(E,O,V){O.isScene!==!0&&(O=Me);const W=Ft.get(E),F=m.state.lights,A=m.state.shadowsArray,tt=F.state.version,lt=It.getParameters(E,F.state,A,O,V),gt=It.getProgramCacheKey(lt);let xt=W.programs;W.environment=E.isMeshStandardMaterial?O.environment:null,W.fog=O.fog,W.envMap=(E.isMeshStandardMaterial?k:w).get(E.envMap||W.environment),W.envMapRotation=W.environment!==null&&E.envMap===null?O.environmentRotation:E.envMapRotation,xt===void 0&&(E.addEventListener("dispose",qt),xt=new Map,W.programs=xt);let kt=xt.get(gt);if(kt!==void 0){if(W.currentProgram===kt&&W.lightsStateVersion===tt)return Re(E,lt),kt}else lt.uniforms=It.getUniforms(E),E.onBeforeCompile(lt,y),kt=It.acquireProgram(lt,gt),xt.set(gt,kt),W.uniforms=lt.uniforms;const At=W.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(At.clippingPlanes=ct.uniform),Re(E,lt),W.needsLights=Ys(E),W.lightsStateVersion=tt,W.needsLights&&(At.ambientLightColor.value=F.state.ambient,At.lightProbe.value=F.state.probe,At.directionalLights.value=F.state.directional,At.directionalLightShadows.value=F.state.directionalShadow,At.spotLights.value=F.state.spot,At.spotLightShadows.value=F.state.spotShadow,At.rectAreaLights.value=F.state.rectArea,At.ltc_1.value=F.state.rectAreaLTC1,At.ltc_2.value=F.state.rectAreaLTC2,At.pointLights.value=F.state.point,At.pointLightShadows.value=F.state.pointShadow,At.hemisphereLights.value=F.state.hemi,At.directionalShadowMap.value=F.state.directionalShadowMap,At.directionalShadowMatrix.value=F.state.directionalShadowMatrix,At.spotShadowMap.value=F.state.spotShadowMap,At.spotLightMatrix.value=F.state.spotLightMatrix,At.spotLightMap.value=F.state.spotLightMap,At.pointShadowMap.value=F.state.pointShadowMap,At.pointShadowMatrix.value=F.state.pointShadowMatrix),W.currentProgram=kt,W.uniformsList=null,kt}function Ht(E){if(E.uniformsList===null){const O=E.currentProgram.getUniforms();E.uniformsList=Rr.seqWithValue(O.seq,E.uniforms)}return E.uniformsList}function Re(E,O){const V=Ft.get(E);V.outputColorSpace=O.outputColorSpace,V.batching=O.batching,V.batchingColor=O.batchingColor,V.instancing=O.instancing,V.instancingColor=O.instancingColor,V.instancingMorph=O.instancingMorph,V.skinning=O.skinning,V.morphTargets=O.morphTargets,V.morphNormals=O.morphNormals,V.morphColors=O.morphColors,V.morphTargetsCount=O.morphTargetsCount,V.numClippingPlanes=O.numClippingPlanes,V.numIntersection=O.numClipIntersection,V.vertexAlphas=O.vertexAlphas,V.vertexTangents=O.vertexTangents,V.toneMapping=O.toneMapping}function Qe(E,O,V,W,F){O.isScene!==!0&&(O=Me),C.resetTextureUnits();const A=O.fog,tt=W.isMeshStandardMaterial?O.environment:null,lt=L===null?y.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:hs,gt=(W.isMeshStandardMaterial?k:w).get(W.envMap||tt),xt=W.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,kt=!!V.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),At=!!V.morphAttributes.position,ie=!!V.morphAttributes.normal,ue=!!V.morphAttributes.color;let he=ci;W.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(he=y.toneMapping);const He=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,ae=He!==void 0?He.length:0,Ut=Ft.get(W),Rn=m.state.lights;if(ut===!0&&(Pt===!0||E!==M)){const un=E===M&&W.id===_;ct.setState(W,E,un)}let ce=!1;W.version===Ut.__version?(Ut.needsLights&&Ut.lightsStateVersion!==Rn.state.version||Ut.outputColorSpace!==lt||F.isBatchedMesh&&Ut.batching===!1||!F.isBatchedMesh&&Ut.batching===!0||F.isBatchedMesh&&Ut.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&Ut.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&Ut.instancing===!1||!F.isInstancedMesh&&Ut.instancing===!0||F.isSkinnedMesh&&Ut.skinning===!1||!F.isSkinnedMesh&&Ut.skinning===!0||F.isInstancedMesh&&Ut.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&Ut.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&Ut.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&Ut.instancingMorph===!1&&F.morphTexture!==null||Ut.envMap!==gt||W.fog===!0&&Ut.fog!==A||Ut.numClippingPlanes!==void 0&&(Ut.numClippingPlanes!==ct.numPlanes||Ut.numIntersection!==ct.numIntersection)||Ut.vertexAlphas!==xt||Ut.vertexTangents!==kt||Ut.morphTargets!==At||Ut.morphNormals!==ie||Ut.morphColors!==ue||Ut.toneMapping!==he||Ut.morphTargetsCount!==ae)&&(ce=!0):(ce=!0,Ut.__version=W.version);let pn=Ut.currentProgram;ce===!0&&(pn=ft(W,O,F));let Ni=!1,nn=!1,ms=!1;const Ee=pn.getUniforms(),wn=Ut.uniforms;if(Bt.useProgram(pn.program)&&(Ni=!0,nn=!0,ms=!0),W.id!==_&&(_=W.id,nn=!0),Ni||M!==E){Bt.buffers.depth.getReversed()?(mt.copy(E.projectionMatrix),wd(mt),bd(mt),Ee.setValue(z,"projectionMatrix",mt)):Ee.setValue(z,"projectionMatrix",E.projectionMatrix),Ee.setValue(z,"viewMatrix",E.matrixWorldInverse);const Zn=Ee.map.cameraPosition;Zn!==void 0&&Zn.setValue(z,Vt.setFromMatrixPosition(E.matrixWorld)),ne.logarithmicDepthBuffer&&Ee.setValue(z,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&Ee.setValue(z,"isOrthographic",E.isOrthographicCamera===!0),M!==E&&(M=E,nn=!0,ms=!0)}if(F.isSkinnedMesh){Ee.setOptional(z,F,"bindMatrix"),Ee.setOptional(z,F,"bindMatrixInverse");const un=F.skeleton;un&&(un.boneTexture===null&&un.computeBoneTexture(),Ee.setValue(z,"boneTexture",un.boneTexture,C))}F.isBatchedMesh&&(Ee.setOptional(z,F,"batchingTexture"),Ee.setValue(z,"batchingTexture",F._matricesTexture,C),Ee.setOptional(z,F,"batchingIdTexture"),Ee.setValue(z,"batchingIdTexture",F._indirectTexture,C),Ee.setOptional(z,F,"batchingColorTexture"),F._colorsTexture!==null&&Ee.setValue(z,"batchingColorTexture",F._colorsTexture,C));const gs=V.morphAttributes;if((gs.position!==void 0||gs.normal!==void 0||gs.color!==void 0)&&Gt.update(F,V,pn),(nn||Ut.receiveShadow!==F.receiveShadow)&&(Ut.receiveShadow=F.receiveShadow,Ee.setValue(z,"receiveShadow",F.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(wn.envMap.value=gt,wn.flipEnvMap.value=gt.isCubeTexture&&gt.isRenderTargetTexture===!1?-1:1),W.isMeshStandardMaterial&&W.envMap===null&&O.environment!==null&&(wn.envMapIntensity.value=O.environmentIntensity),nn&&(Ee.setValue(z,"toneMappingExposure",y.toneMappingExposure),Ut.needsLights&&hi(wn,ms),A&&W.fog===!0&&Mt.refreshFogUniforms(wn,A),Mt.refreshMaterialUniforms(wn,W,Y,rt,m.state.transmissionRenderTarget[E.id]),Rr.upload(z,Ht(Ut),wn,C)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(Rr.upload(z,Ht(Ut),wn,C),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&Ee.setValue(z,"center",F.center),Ee.setValue(z,"modelViewMatrix",F.modelViewMatrix),Ee.setValue(z,"normalMatrix",F.normalMatrix),Ee.setValue(z,"modelMatrix",F.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){const un=W.uniformsGroups;for(let Zn=0,Kn=un.length;Zn<Kn;Zn++){const Qa=un[Zn];N.update(Qa,pn),N.bind(Qa,pn)}}return pn}function hi(E,O){E.ambientLightColor.needsUpdate=O,E.lightProbe.needsUpdate=O,E.directionalLights.needsUpdate=O,E.directionalLightShadows.needsUpdate=O,E.pointLights.needsUpdate=O,E.pointLightShadows.needsUpdate=O,E.spotLights.needsUpdate=O,E.spotLightShadows.needsUpdate=O,E.rectAreaLights.needsUpdate=O,E.hemisphereLights.needsUpdate=O}function Ys(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(E,O,V){Ft.get(E.texture).__webglTexture=O,Ft.get(E.depthTexture).__webglTexture=V;const W=Ft.get(E);W.__hasExternalTextures=!0,W.__autoAllocateDepthBuffer=V===void 0,W.__autoAllocateDepthBuffer||ee.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),W.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(E,O){const V=Ft.get(E);V.__webglFramebuffer=O,V.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(E,O=0,V=0){L=E,P=O,R=V;let W=!0,F=null,A=!1,tt=!1;if(E){const gt=Ft.get(E);if(gt.__useDefaultFramebuffer!==void 0)Bt.bindFramebuffer(z.FRAMEBUFFER,null),W=!1;else if(gt.__webglFramebuffer===void 0)C.setupRenderTarget(E);else if(gt.__hasExternalTextures)C.rebindTextures(E,Ft.get(E.texture).__webglTexture,Ft.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const At=E.depthTexture;if(gt.__boundDepthTexture!==At){if(At!==null&&Ft.has(At)&&(E.width!==At.image.width||E.height!==At.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");C.setupDepthRenderbuffer(E)}}const xt=E.texture;(xt.isData3DTexture||xt.isDataArrayTexture||xt.isCompressedArrayTexture)&&(tt=!0);const kt=Ft.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(kt[O])?F=kt[O][V]:F=kt[O],A=!0):E.samples>0&&C.useMultisampledRTT(E)===!1?F=Ft.get(E).__webglMultisampledFramebuffer:Array.isArray(kt)?F=kt[V]:F=kt,T.copy(E.viewport),I.copy(E.scissor),B=E.scissorTest}else T.copy(Rt).multiplyScalar(Y).floor(),I.copy(Xt).multiplyScalar(Y).floor(),B=se;if(Bt.bindFramebuffer(z.FRAMEBUFFER,F)&&W&&Bt.drawBuffers(E,F),Bt.viewport(T),Bt.scissor(I),Bt.setScissorTest(B),A){const gt=Ft.get(E.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_CUBE_MAP_POSITIVE_X+O,gt.__webglTexture,V)}else if(tt){const gt=Ft.get(E.texture),xt=O||0;z.framebufferTextureLayer(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,gt.__webglTexture,V||0,xt)}_=-1},this.readRenderTargetPixels=function(E,O,V,W,F,A,tt){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let lt=Ft.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&tt!==void 0&&(lt=lt[tt]),lt){Bt.bindFramebuffer(z.FRAMEBUFFER,lt);try{const gt=E.texture,xt=gt.format,kt=gt.type;if(!ne.textureFormatReadable(xt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ne.textureTypeReadable(kt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=E.width-W&&V>=0&&V<=E.height-F&&z.readPixels(O,V,W,F,Wt.convert(xt),Wt.convert(kt),A)}finally{const gt=L!==null?Ft.get(L).__webglFramebuffer:null;Bt.bindFramebuffer(z.FRAMEBUFFER,gt)}}},this.readRenderTargetPixelsAsync=async function(E,O,V,W,F,A,tt){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let lt=Ft.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&tt!==void 0&&(lt=lt[tt]),lt){const gt=E.texture,xt=gt.format,kt=gt.type;if(!ne.textureFormatReadable(xt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ne.textureTypeReadable(kt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(O>=0&&O<=E.width-W&&V>=0&&V<=E.height-F){Bt.bindFramebuffer(z.FRAMEBUFFER,lt);const At=z.createBuffer();z.bindBuffer(z.PIXEL_PACK_BUFFER,At),z.bufferData(z.PIXEL_PACK_BUFFER,A.byteLength,z.STREAM_READ),z.readPixels(O,V,W,F,Wt.convert(xt),Wt.convert(kt),0);const ie=L!==null?Ft.get(L).__webglFramebuffer:null;Bt.bindFramebuffer(z.FRAMEBUFFER,ie);const ue=z.fenceSync(z.SYNC_GPU_COMMANDS_COMPLETE,0);return z.flush(),await xd(z,ue,4),z.bindBuffer(z.PIXEL_PACK_BUFFER,At),z.getBufferSubData(z.PIXEL_PACK_BUFFER,0,A),z.deleteBuffer(At),z.deleteSync(ue),A}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(E,O=null,V=0){E.isTexture!==!0&&(As("WebGLRenderer: copyFramebufferToTexture function signature has changed."),O=arguments[0]||null,E=arguments[1]);const W=Math.pow(2,-V),F=Math.floor(E.image.width*W),A=Math.floor(E.image.height*W),tt=O!==null?O.x:0,lt=O!==null?O.y:0;C.setTexture2D(E,0),z.copyTexSubImage2D(z.TEXTURE_2D,V,0,0,tt,lt,F,A),Bt.unbindTexture()},this.copyTextureToTexture=function(E,O,V=null,W=null,F=0){E.isTexture!==!0&&(As("WebGLRenderer: copyTextureToTexture function signature has changed."),W=arguments[0]||null,E=arguments[1],O=arguments[2],F=arguments[3]||0,V=null);let A,tt,lt,gt,xt,kt,At,ie,ue;const he=E.isCompressedTexture?E.mipmaps[F]:E.image;V!==null?(A=V.max.x-V.min.x,tt=V.max.y-V.min.y,lt=V.isBox3?V.max.z-V.min.z:1,gt=V.min.x,xt=V.min.y,kt=V.isBox3?V.min.z:0):(A=he.width,tt=he.height,lt=he.depth||1,gt=0,xt=0,kt=0),W!==null?(At=W.x,ie=W.y,ue=W.z):(At=0,ie=0,ue=0);const He=Wt.convert(O.format),ae=Wt.convert(O.type);let Ut;O.isData3DTexture?(C.setTexture3D(O,0),Ut=z.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(C.setTexture2DArray(O,0),Ut=z.TEXTURE_2D_ARRAY):(C.setTexture2D(O,0),Ut=z.TEXTURE_2D),z.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,O.flipY),z.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),z.pixelStorei(z.UNPACK_ALIGNMENT,O.unpackAlignment);const Rn=z.getParameter(z.UNPACK_ROW_LENGTH),ce=z.getParameter(z.UNPACK_IMAGE_HEIGHT),pn=z.getParameter(z.UNPACK_SKIP_PIXELS),Ni=z.getParameter(z.UNPACK_SKIP_ROWS),nn=z.getParameter(z.UNPACK_SKIP_IMAGES);z.pixelStorei(z.UNPACK_ROW_LENGTH,he.width),z.pixelStorei(z.UNPACK_IMAGE_HEIGHT,he.height),z.pixelStorei(z.UNPACK_SKIP_PIXELS,gt),z.pixelStorei(z.UNPACK_SKIP_ROWS,xt),z.pixelStorei(z.UNPACK_SKIP_IMAGES,kt);const ms=E.isDataArrayTexture||E.isData3DTexture,Ee=O.isDataArrayTexture||O.isData3DTexture;if(E.isRenderTargetTexture||E.isDepthTexture){const wn=Ft.get(E),gs=Ft.get(O),un=Ft.get(wn.__renderTarget),Zn=Ft.get(gs.__renderTarget);Bt.bindFramebuffer(z.READ_FRAMEBUFFER,un.__webglFramebuffer),Bt.bindFramebuffer(z.DRAW_FRAMEBUFFER,Zn.__webglFramebuffer);for(let Kn=0;Kn<lt;Kn++)ms&&z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Ft.get(E).__webglTexture,F,kt+Kn),E.isDepthTexture?(Ee&&z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Ft.get(O).__webglTexture,F,ue+Kn),z.blitFramebuffer(gt,xt,A,tt,At,ie,A,tt,z.DEPTH_BUFFER_BIT,z.NEAREST)):Ee?z.copyTexSubImage3D(Ut,F,At,ie,ue+Kn,gt,xt,A,tt):z.copyTexSubImage2D(Ut,F,At,ie,ue+Kn,gt,xt,A,tt);Bt.bindFramebuffer(z.READ_FRAMEBUFFER,null),Bt.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else Ee?E.isDataTexture||E.isData3DTexture?z.texSubImage3D(Ut,F,At,ie,ue,A,tt,lt,He,ae,he.data):O.isCompressedArrayTexture?z.compressedTexSubImage3D(Ut,F,At,ie,ue,A,tt,lt,He,he.data):z.texSubImage3D(Ut,F,At,ie,ue,A,tt,lt,He,ae,he):E.isDataTexture?z.texSubImage2D(z.TEXTURE_2D,F,At,ie,A,tt,He,ae,he.data):E.isCompressedTexture?z.compressedTexSubImage2D(z.TEXTURE_2D,F,At,ie,he.width,he.height,He,he.data):z.texSubImage2D(z.TEXTURE_2D,F,At,ie,A,tt,He,ae,he);z.pixelStorei(z.UNPACK_ROW_LENGTH,Rn),z.pixelStorei(z.UNPACK_IMAGE_HEIGHT,ce),z.pixelStorei(z.UNPACK_SKIP_PIXELS,pn),z.pixelStorei(z.UNPACK_SKIP_ROWS,Ni),z.pixelStorei(z.UNPACK_SKIP_IMAGES,nn),F===0&&O.generateMipmaps&&z.generateMipmap(Ut),Bt.unbindTexture()},this.copyTextureToTexture3D=function(E,O,V=null,W=null,F=0){return E.isTexture!==!0&&(As("WebGLRenderer: copyTextureToTexture3D function signature has changed."),V=arguments[0]||null,W=arguments[1]||null,E=arguments[2],O=arguments[3],F=arguments[4]||0),As('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(E,O,V,W,F)},this.initRenderTarget=function(E){Ft.get(E).__webglFramebuffer===void 0&&C.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?C.setTextureCube(E,0):E.isData3DTexture?C.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?C.setTexture2DArray(E,0):C.setTexture2D(E,0),Bt.unbindTexture()},this.resetState=function(){P=0,R=0,L=null,Bt.reset(),le.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Bn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=re._getDrawingBufferColorSpace(t),e.unpackColorSpace=re._getUnpackColorSpace()}}class oi{constructor(t,e=1,i=1e3){this.isFog=!0,this.name="",this.color=new Tt(t),this.near=e,this.far=i}clone(){return new oi(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Xa extends Ie{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new xn,this.environmentIntensity=1,this.environmentRotation=new xn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Um{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=ba,this.updateRanges=[],this.version=0,this.uuid=kn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,i){t*=this.stride,i*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[i+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=kn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(e,this.stride);return i.setUsage(this.usage),i}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=kn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const $e=new b;class Dr{constructor(t,e,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,i=this.data.count;e<i;e++)$e.fromBufferAttribute(this,e),$e.applyMatrix4(t),this.setXYZ(e,$e.x,$e.y,$e.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)$e.fromBufferAttribute(this,e),$e.applyNormalMatrix(t),this.setXYZ(e,$e.x,$e.y,$e.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)$e.fromBufferAttribute(this,e),$e.transformDirection(t),this.setXYZ(e,$e.x,$e.y,$e.z);return this}getComponent(t,e){let i=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(i=vn(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=de(i,this.array)),this.data.array[t*this.data.stride+this.offset+e]=i,this}setX(t,e){return this.normalized&&(e=de(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=de(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=de(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=de(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=vn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=vn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=vn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=vn(e,this.array)),e}setXY(t,e,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=de(e,this.array),i=de(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this}setXYZ(t,e,i,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=de(e,this.array),i=de(i,this.array),s=de(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=de(e,this.array),i=de(i,this.array),s=de(s,this.array),r=de(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new ze(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Dr(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class An extends qn{static get type(){return"SpriteMaterial"}constructor(t){super(),this.isSpriteMaterial=!0,this.color=new Tt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let Ki;const Ss=new b,Ji=new b,ji=new b,Qi=new Ct,xs=new Ct,Kc=new ve,mr=new b,ws=new b,gr=new b,ec=new Ct,bo=new Ct,nc=new Ct;class Hn extends Ie{constructor(t=new An){if(super(),this.isSprite=!0,this.type="Sprite",Ki===void 0){Ki=new Ce;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new Um(e,5);Ki.setIndex([0,1,2,0,2,3]),Ki.setAttribute("position",new Dr(i,3,0,!1)),Ki.setAttribute("uv",new Dr(i,2,3,!1))}this.geometry=Ki,this.material=t,this.center=new Ct(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Ji.setFromMatrixScale(this.matrixWorld),Kc.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),ji.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Ji.multiplyScalar(-ji.z);const i=this.material.rotation;let s,r;i!==0&&(r=Math.cos(i),s=Math.sin(i));const o=this.center;_r(mr.set(-.5,-.5,0),ji,o,Ji,s,r),_r(ws.set(.5,-.5,0),ji,o,Ji,s,r),_r(gr.set(.5,.5,0),ji,o,Ji,s,r),ec.set(0,0),bo.set(1,0),nc.set(1,1);let a=t.ray.intersectTriangle(mr,ws,gr,!1,Ss);if(a===null&&(_r(ws.set(-.5,.5,0),ji,o,Ji,s,r),bo.set(0,1),a=t.ray.intersectTriangle(mr,gr,ws,!1,Ss),a===null))return;const l=t.ray.origin.distanceTo(Ss);l<t.near||l>t.far||e.push({distance:l,point:Ss.clone(),uv:hn.getInterpolation(Ss,mr,ws,gr,ec,bo,nc,new Ct),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function _r(n,t,e,i,s,r){Qi.subVectors(n,e).addScalar(.5).multiply(i),s!==void 0?(xs.x=r*Qi.x-s*Qi.y,xs.y=s*Qi.x+r*Qi.y):xs.copy(Qi),n.copy(t),n.x+=xs.x,n.y+=xs.y,n.applyMatrix4(Kc)}class Xr extends qn{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new Tt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Ur=new b,Nr=new b,ic=new ve,bs=new Vr,vr=new Vs,Eo=new b,sc=new b;class qa extends Ie{constructor(t=new Ce,e=new Xr){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[0];for(let s=1,r=e.count;s<r;s++)Ur.fromBufferAttribute(e,s-1),Nr.fromBufferAttribute(e,s),i[s]=i[s-1],i[s]+=Ur.distanceTo(Nr);t.setAttribute("lineDistance",new we(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const i=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),vr.copy(i.boundingSphere),vr.applyMatrix4(s),vr.radius+=r,t.ray.intersectsSphere(vr)===!1)return;ic.copy(s).invert(),bs.copy(t.ray).applyMatrix4(ic);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=i.index,h=i.attributes.position;if(u!==null){const p=Math.max(0,o.start),f=Math.min(u.count,o.start+o.count);for(let v=p,g=f-1;v<g;v+=c){const m=u.getX(v),S=u.getX(v+1),x=Mr(this,t,bs,l,m,S);x&&e.push(x)}if(this.isLineLoop){const v=u.getX(f-1),g=u.getX(p),m=Mr(this,t,bs,l,v,g);m&&e.push(m)}}else{const p=Math.max(0,o.start),f=Math.min(h.count,o.start+o.count);for(let v=p,g=f-1;v<g;v+=c){const m=Mr(this,t,bs,l,v,v+1);m&&e.push(m)}if(this.isLineLoop){const v=Mr(this,t,bs,l,f-1,p);v&&e.push(v)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Mr(n,t,e,i,s,r){const o=n.geometry.attributes.position;if(Ur.fromBufferAttribute(o,s),Nr.fromBufferAttribute(o,r),e.distanceSqToSegment(Ur,Nr,Eo,sc)>i)return;Eo.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(Eo);if(!(l<t.near||l>t.far))return{distance:l,point:sc.clone().applyMatrix4(n.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:n}}class qr extends qn{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new Tt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const rc=new ve,Ta=new Vr,yr=new Vs,Sr=new b;class Ya extends Ie{constructor(t=new Ce,e=new qr){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const i=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),yr.copy(i.boundingSphere),yr.applyMatrix4(s),yr.radius+=r,t.ray.intersectsSphere(yr)===!1)return;rc.copy(s).invert(),Ta.copy(t.ray).applyMatrix4(rc);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=i.index,d=i.attributes.position;if(c!==null){const h=Math.max(0,o.start),p=Math.min(c.count,o.start+o.count);for(let f=h,v=p;f<v;f++){const g=c.getX(f);Sr.fromBufferAttribute(d,g),oc(Sr,g,l,s,t,e,this)}}else{const h=Math.max(0,o.start),p=Math.min(d.count,o.start+o.count);for(let f=h,v=p;f<v;f++)Sr.fromBufferAttribute(d,f),oc(Sr,f,l,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function oc(n,t,e,i,s,r,o){const a=Ta.distanceSqToPoint(n);if(a<e){const l=new b;Ta.closestPointToPoint(n,l),l.applyMatrix4(i);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class qe extends je{constructor(t,e,i,s,r,o,a,l,c){super(t,e,i,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Yn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let i,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)i=this.getPoint(o/t),r+=i.distanceTo(s),e.push(r),s=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const i=this.getLengths();let s=0;const r=i.length;let o;e?o=e:o=t*i[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=i[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,i[s]===o)return s/(r-1);const u=i[s],h=i[s+1]-u,p=(o-u)/h;return(s+p)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),l=e||(o.isVector2?new Ct:new b);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){const i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e){const i=new b,s=[],r=[],o=[],a=new b,l=new ve;for(let p=0;p<=t;p++){const f=p/t;s[p]=this.getTangentAt(f,new b)}r[0]=new b,o[0]=new b;let c=Number.MAX_VALUE;const u=Math.abs(s[0].x),d=Math.abs(s[0].y),h=Math.abs(s[0].z);u<=c&&(c=u,i.set(1,0,0)),d<=c&&(c=d,i.set(0,1,0)),h<=c&&i.set(0,0,1),a.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let p=1;p<=t;p++){if(r[p]=r[p-1].clone(),o[p]=o[p-1].clone(),a.crossVectors(s[p-1],s[p]),a.length()>Number.EPSILON){a.normalize();const f=Math.acos(Ge(s[p-1].dot(s[p]),-1,1));r[p].applyMatrix4(l.makeRotationAxis(a,f))}o[p].crossVectors(s[p],r[p])}if(e===!0){let p=Math.acos(Ge(r[0].dot(r[t]),-1,1));p/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(p=-p);for(let f=1;f<=t;f++)r[f].applyMatrix4(l.makeRotationAxis(s[f],p*f)),o[f].crossVectors(s[f],r[f])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Jc extends Yn{constructor(t=0,e=0,i=1,s=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=i,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new Ct){const i=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const u=Math.cos(this.aRotation),d=Math.sin(this.aRotation),h=l-this.aX,p=c-this.aY;l=h*u-p*d+this.aX,c=h*d+p*u+this.aY}return i.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Nm extends Jc{constructor(t,e,i,s,r,o){super(t,e,i,i,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function $a(){let n=0,t=0,e=0,i=0;function s(r,o,a,l){n=r,t=a,e=-3*r+3*o-2*a-l,i=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,u,d){let h=(o-r)/c-(a-r)/(c+u)+(a-o)/u,p=(a-o)/u-(l-o)/(u+d)+(l-a)/d;h*=u,p*=u,s(o,a,h,p)},calc:function(r){const o=r*r,a=o*r;return n+t*r+e*o+i*a}}}const xr=new b,To=new $a,Ao=new $a,Co=new $a;class ln extends Yn{constructor(t=[],e=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=s}getPoint(t,e=new b){const i=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,u;this.closed||a>0?c=s[(a-1)%r]:(xr.subVectors(s[0],s[1]).add(s[0]),c=xr);const d=s[a%r],h=s[(a+1)%r];if(this.closed||a+2<r?u=s[(a+2)%r]:(xr.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=xr),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let f=Math.pow(c.distanceToSquared(d),p),v=Math.pow(d.distanceToSquared(h),p),g=Math.pow(h.distanceToSquared(u),p);v<1e-4&&(v=1),f<1e-4&&(f=v),g<1e-4&&(g=v),To.initNonuniformCatmullRom(c.x,d.x,h.x,u.x,f,v,g),Ao.initNonuniformCatmullRom(c.y,d.y,h.y,u.y,f,v,g),Co.initNonuniformCatmullRom(c.z,d.z,h.z,u.z,f,v,g)}else this.curveType==="catmullrom"&&(To.initCatmullRom(c.x,d.x,h.x,u.x,this.tension),Ao.initCatmullRom(c.y,d.y,h.y,u.y,this.tension),Co.initCatmullRom(c.z,d.z,h.z,u.z,this.tension));return i.set(To.calc(l),Ao.calc(l),Co.calc(l)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(new b().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function ac(n,t,e,i,s){const r=(i-t)*.5,o=(s-e)*.5,a=n*n,l=n*a;return(2*e-2*i+r+o)*l+(-3*e+3*i-2*r-o)*a+r*n+e}function Fm(n,t){const e=1-n;return e*e*t}function Om(n,t){return 2*(1-n)*n*t}function zm(n,t){return n*n*t}function Ds(n,t,e,i){return Fm(n,t)+Om(n,e)+zm(n,i)}function Bm(n,t){const e=1-n;return e*e*e*t}function km(n,t){const e=1-n;return 3*e*e*n*t}function Gm(n,t){return 3*(1-n)*n*n*t}function Hm(n,t){return n*n*n*t}function Us(n,t,e,i,s){return Bm(n,t)+km(n,e)+Gm(n,i)+Hm(n,s)}class Vm extends Yn{constructor(t=new Ct,e=new Ct,i=new Ct,s=new Ct){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new Ct){const i=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(Us(t,s.x,r.x,o.x,a.x),Us(t,s.y,r.y,o.y,a.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Wm extends Yn{constructor(t=new b,e=new b,i=new b,s=new b){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new b){const i=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(Us(t,s.x,r.x,o.x,a.x),Us(t,s.y,r.y,o.y,a.y),Us(t,s.z,r.z,o.z,a.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Xm extends Yn{constructor(t=new Ct,e=new Ct){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new Ct){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new Ct){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class qm extends Yn{constructor(t=new b,e=new b){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new b){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new b){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Ym extends Yn{constructor(t=new Ct,e=new Ct,i=new Ct){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new Ct){const i=e,s=this.v0,r=this.v1,o=this.v2;return i.set(Ds(t,s.x,r.x,o.x),Ds(t,s.y,r.y,o.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class jc extends Yn{constructor(t=new b,e=new b,i=new b){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new b){const i=e,s=this.v0,r=this.v1,o=this.v2;return i.set(Ds(t,s.x,r.x,o.x),Ds(t,s.y,r.y,o.y),Ds(t,s.z,r.z,o.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class $m extends Yn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new Ct){const i=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,l=s[o===0?o:o-1],c=s[o],u=s[o>s.length-2?s.length-1:o+1],d=s[o>s.length-3?s.length-1:o+2];return i.set(ac(a,l.x,c.x,u.x,d.x),ac(a,l.y,c.y,u.y,d.y)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(new Ct().fromArray(s))}return this}}var Zm=Object.freeze({__proto__:null,ArcCurve:Nm,CatmullRomCurve3:ln,CubicBezierCurve:Vm,CubicBezierCurve3:Wm,EllipseCurve:Jc,LineCurve:Xm,LineCurve3:qm,QuadraticBezierCurve:Ym,QuadraticBezierCurve3:jc,SplineCurve:$m});class Ii extends Ce{constructor(t=1,e=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:i,thetaLength:s},e=Math.max(3,e);const r=[],o=[],a=[],l=[],c=new b,u=new Ct;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let d=0,h=3;d<=e;d++,h+=3){const p=i+d/e*s;c.x=t*Math.cos(p),c.y=t*Math.sin(p),o.push(c.x,c.y,c.z),a.push(0,0,1),u.x=(o[h]/t+1)/2,u.y=(o[h+1]/t+1)/2,l.push(u.x,u.y)}for(let d=1;d<=e;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new we(o,3)),this.setAttribute("normal",new we(a,3)),this.setAttribute("uv",new we(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ii(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Nt extends Ce{constructor(t=1,e=1,i=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const u=[],d=[],h=[],p=[];let f=0;const v=[],g=i/2;let m=0;S(),o===!1&&(t>0&&x(!0),e>0&&x(!1)),this.setIndex(u),this.setAttribute("position",new we(d,3)),this.setAttribute("normal",new we(h,3)),this.setAttribute("uv",new we(p,2));function S(){const y=new b,U=new b;let P=0;const R=(e-t)/i;for(let L=0;L<=r;L++){const _=[],M=L/r,T=M*(e-t)+t;for(let I=0;I<=s;I++){const B=I/s,Z=B*l+a,nt=Math.sin(Z),K=Math.cos(Z);U.x=T*nt,U.y=-M*i+g,U.z=T*K,d.push(U.x,U.y,U.z),y.set(nt,R,K).normalize(),h.push(y.x,y.y,y.z),p.push(B,1-M),_.push(f++)}v.push(_)}for(let L=0;L<s;L++)for(let _=0;_<r;_++){const M=v[_][L],T=v[_+1][L],I=v[_+1][L+1],B=v[_][L+1];(t>0||_!==0)&&(u.push(M,T,B),P+=3),(e>0||_!==r-1)&&(u.push(T,I,B),P+=3)}c.addGroup(m,P,0),m+=P}function x(y){const U=f,P=new Ct,R=new b;let L=0;const _=y===!0?t:e,M=y===!0?1:-1;for(let I=1;I<=s;I++)d.push(0,g*M,0),h.push(0,M,0),p.push(.5,.5),f++;const T=f;for(let I=0;I<=s;I++){const Z=I/s*l+a,nt=Math.cos(Z),K=Math.sin(Z);R.x=_*K,R.y=g*M,R.z=_*nt,d.push(R.x,R.y,R.z),h.push(0,M,0),P.x=nt*.5+.5,P.y=K*.5*M+.5,p.push(P.x,P.y),f++}for(let I=0;I<s;I++){const B=U+I,Z=T+I;y===!0?u.push(Z,Z+1,B):u.push(Z+1,Z,B),L+=3}c.addGroup(m,L,y===!0?1:2),m+=L}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Nt(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class $n extends Nt{constructor(t=1,e=1,i=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,i,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new $n(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Yr extends Ce{constructor(t=[],e=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:i,detail:s};const r=[],o=[];a(s),c(i),u(),this.setAttribute("position",new we(r,3)),this.setAttribute("normal",new we(r.slice(),3)),this.setAttribute("uv",new we(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(S){const x=new b,y=new b,U=new b;for(let P=0;P<e.length;P+=3)p(e[P+0],x),p(e[P+1],y),p(e[P+2],U),l(x,y,U,S)}function l(S,x,y,U){const P=U+1,R=[];for(let L=0;L<=P;L++){R[L]=[];const _=S.clone().lerp(y,L/P),M=x.clone().lerp(y,L/P),T=P-L;for(let I=0;I<=T;I++)I===0&&L===P?R[L][I]=_:R[L][I]=_.clone().lerp(M,I/T)}for(let L=0;L<P;L++)for(let _=0;_<2*(P-L)-1;_++){const M=Math.floor(_/2);_%2===0?(h(R[L][M+1]),h(R[L+1][M]),h(R[L][M])):(h(R[L][M+1]),h(R[L+1][M+1]),h(R[L+1][M]))}}function c(S){const x=new b;for(let y=0;y<r.length;y+=3)x.x=r[y+0],x.y=r[y+1],x.z=r[y+2],x.normalize().multiplyScalar(S),r[y+0]=x.x,r[y+1]=x.y,r[y+2]=x.z}function u(){const S=new b;for(let x=0;x<r.length;x+=3){S.x=r[x+0],S.y=r[x+1],S.z=r[x+2];const y=g(S)/2/Math.PI+.5,U=m(S)/Math.PI+.5;o.push(y,1-U)}f(),d()}function d(){for(let S=0;S<o.length;S+=6){const x=o[S+0],y=o[S+2],U=o[S+4],P=Math.max(x,y,U),R=Math.min(x,y,U);P>.9&&R<.1&&(x<.2&&(o[S+0]+=1),y<.2&&(o[S+2]+=1),U<.2&&(o[S+4]+=1))}}function h(S){r.push(S.x,S.y,S.z)}function p(S,x){const y=S*3;x.x=t[y+0],x.y=t[y+1],x.z=t[y+2]}function f(){const S=new b,x=new b,y=new b,U=new b,P=new Ct,R=new Ct,L=new Ct;for(let _=0,M=0;_<r.length;_+=9,M+=6){S.set(r[_+0],r[_+1],r[_+2]),x.set(r[_+3],r[_+4],r[_+5]),y.set(r[_+6],r[_+7],r[_+8]),P.set(o[M+0],o[M+1]),R.set(o[M+2],o[M+3]),L.set(o[M+4],o[M+5]),U.copy(S).add(x).add(y).divideScalar(3);const T=g(U);v(P,M+0,S,T),v(R,M+2,x,T),v(L,M+4,y,T)}}function v(S,x,y,U){U<0&&S.x===1&&(o[x]=S.x-1),y.x===0&&y.z===0&&(o[x]=U/2/Math.PI+.5)}function g(S){return Math.atan2(S.z,-S.x)}function m(S){return Math.atan2(-S.y,Math.sqrt(S.x*S.x+S.z*S.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Yr(t.vertices,t.indices,t.radius,t.details)}}class Za extends Yr{constructor(t=1,e=0){const i=(1+Math.sqrt(5))/2,s=1/i,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-i,0,-s,i,0,s,-i,0,s,i,-s,-i,0,-s,i,0,s,-i,0,s,i,0,-i,0,-s,i,0,-s,-i,0,s,i,0,s],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,o,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Za(t.radius,t.detail)}}class Di extends Yr{constructor(t=1,e=0){const i=(1+Math.sqrt(5))/2,s=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Di(t.radius,t.detail)}}class _e extends Ce{constructor(t=1,e=32,i=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));const l=Math.min(o+a,Math.PI);let c=0;const u=[],d=new b,h=new b,p=[],f=[],v=[],g=[];for(let m=0;m<=i;m++){const S=[],x=m/i;let y=0;m===0&&o===0?y=.5/e:m===i&&l===Math.PI&&(y=-.5/e);for(let U=0;U<=e;U++){const P=U/e;d.x=-t*Math.cos(s+P*r)*Math.sin(o+x*a),d.y=t*Math.cos(o+x*a),d.z=t*Math.sin(s+P*r)*Math.sin(o+x*a),f.push(d.x,d.y,d.z),h.copy(d).normalize(),v.push(h.x,h.y,h.z),g.push(P+y,1-x),S.push(c++)}u.push(S)}for(let m=0;m<i;m++)for(let S=0;S<e;S++){const x=u[m][S+1],y=u[m][S],U=u[m+1][S],P=u[m+1][S+1];(m!==0||o>0)&&p.push(x,y,P),(m!==i-1||l<Math.PI)&&p.push(y,U,P)}this.setIndex(p),this.setAttribute("position",new we(f,3)),this.setAttribute("normal",new we(v,3)),this.setAttribute("uv",new we(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new _e(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Vn extends Ce{constructor(t=1,e=.4,i=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:s,arc:r},i=Math.floor(i),s=Math.floor(s);const o=[],a=[],l=[],c=[],u=new b,d=new b,h=new b;for(let p=0;p<=i;p++)for(let f=0;f<=s;f++){const v=f/s*r,g=p/i*Math.PI*2;d.x=(t+e*Math.cos(g))*Math.cos(v),d.y=(t+e*Math.cos(g))*Math.sin(v),d.z=e*Math.sin(g),a.push(d.x,d.y,d.z),u.x=t*Math.cos(v),u.y=t*Math.sin(v),h.subVectors(d,u).normalize(),l.push(h.x,h.y,h.z),c.push(f/s),c.push(p/i)}for(let p=1;p<=i;p++)for(let f=1;f<=s;f++){const v=(s+1)*p+f-1,g=(s+1)*(p-1)+f-1,m=(s+1)*(p-1)+f,S=(s+1)*p+f;o.push(v,g,S),o.push(g,m,S)}this.setIndex(o),this.setAttribute("position",new we(a,3)),this.setAttribute("normal",new we(l,3)),this.setAttribute("uv",new we(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Vn(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class Bs extends Ce{constructor(t=new jc(new b(-1,-1,0),new b(-1,1,0),new b(1,1,0)),e=64,i=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:i,radialSegments:s,closed:r};const o=t.computeFrenetFrames(e,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new b,l=new b,c=new Ct;let u=new b;const d=[],h=[],p=[],f=[];v(),this.setIndex(f),this.setAttribute("position",new we(d,3)),this.setAttribute("normal",new we(h,3)),this.setAttribute("uv",new we(p,2));function v(){for(let x=0;x<e;x++)g(x);g(r===!1?e:0),S(),m()}function g(x){u=t.getPointAt(x/e,u);const y=o.normals[x],U=o.binormals[x];for(let P=0;P<=s;P++){const R=P/s*Math.PI*2,L=Math.sin(R),_=-Math.cos(R);l.x=_*y.x+L*U.x,l.y=_*y.y+L*U.y,l.z=_*y.z+L*U.z,l.normalize(),h.push(l.x,l.y,l.z),a.x=u.x+i*l.x,a.y=u.y+i*l.y,a.z=u.z+i*l.z,d.push(a.x,a.y,a.z)}}function m(){for(let x=1;x<=e;x++)for(let y=1;y<=s;y++){const U=(s+1)*(x-1)+(y-1),P=(s+1)*x+(y-1),R=(s+1)*x+y,L=(s+1)*(x-1)+y;f.push(U,P,L),f.push(P,R,L)}}function S(){for(let x=0;x<=e;x++)for(let y=0;y<=s;y++)c.x=x/e,c.y=y/s,p.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new Bs(new Zm[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}class q extends qn{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Tt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Tt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ba,this.normalScale=new Ct(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new xn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Be extends qn{static get type(){return"MeshLambertMaterial"}constructor(t){super(),this.isMeshLambertMaterial=!0,this.color=new Tt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Tt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ba,this.normalScale=new Ct(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new xn,this.combine=Ia,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class $r extends Ie{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Tt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class Qc extends $r{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ie.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Tt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Ro=new ve,lc=new b,cc=new b;class tu{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ct(512,512),this.map=null,this.mapPass=null,this.matrix=new ve,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ha,this._frameExtents=new Ct(1,1),this._viewportCount=1,this._viewports=[new ge(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;lc.setFromMatrixPosition(t.matrixWorld),e.position.copy(lc),cc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(cc),e.updateMatrixWorld(),Ro.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ro),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Ro)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const uc=new ve,Es=new b,Po=new b;class Km extends tu{constructor(){super(new xe(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Ct(4,2),this._viewportCount=6,this._viewports=[new ge(2,1,1,1),new ge(0,1,1,1),new ge(3,1,1,1),new ge(1,1,1,1),new ge(3,0,1,1),new ge(1,0,1,1)],this._cubeDirections=[new b(1,0,0),new b(-1,0,0),new b(0,0,1),new b(0,0,-1),new b(0,1,0),new b(0,-1,0)],this._cubeUps=[new b(0,1,0),new b(0,1,0),new b(0,1,0),new b(0,1,0),new b(0,0,1),new b(0,0,-1)]}updateMatrices(t,e=0){const i=this.camera,s=this.matrix,r=t.distance||i.far;r!==i.far&&(i.far=r,i.updateProjectionMatrix()),Es.setFromMatrixPosition(t.matrixWorld),i.position.copy(Es),Po.copy(i.position),Po.add(this._cubeDirections[e]),i.up.copy(this._cubeUps[e]),i.lookAt(Po),i.updateMatrixWorld(),s.makeTranslation(-Es.x,-Es.y,-Es.z),uc.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(uc)}}class Ka extends $r{constructor(t,e,i=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new Km}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class Jm extends tu{constructor(){super(new Wc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class eu extends $r{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ie.DEFAULT_UP),this.updateMatrix(),this.target=new Ie,this.shadow=new Jm}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class nu extends $r{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}const dc=new ve;class jm{constructor(t,e,i=0,s=1/0){this.ray=new Vr(t,e),this.near=i,this.far=s,this.camera=null,this.layers=new Ga,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return dc.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(dc),this}intersectObject(t,e=!0,i=[]){return Aa(t,this,i,e),i.sort(hc),i}intersectObjects(t,e=!0,i=[]){for(let s=0,r=t.length;s<r;s++)Aa(t[s],this,i,e);return i.sort(hc),i}}function hc(n,t){return n.distance-t.distance}function Aa(n,t,e,i){let s=!0;if(n.layers.test(t.layers)&&n.raycast(t,e)===!1&&(s=!1),s===!0&&i===!0){const r=n.children;for(let o=0,a=r.length;o<a;o++)Aa(r[o],t,e,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:La}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=La);let ye=!1;function Qm(n){ye=n}function Ns(){return ye}const Jt={skyTop:15391936,skyMid:15786952,skyHorizon:16116950,sun:15317355,ground:14008723,groundDark:12823420,path:12625527,pathEdge:13875851,walnut:5917238,walnutDark:4338986,bronze:10125655,terracotta:12618344,amber:13608308,hill:13023379};function Sn(n,t){const e=document.createElement("canvas");e.width=128,e.height=128;const i=e.getContext("2d"),s=i.createRadialGradient(64,64,64*n,64,64,64);s.addColorStop(0,t),s.addColorStop(1,"rgba(0,0,0,0)"),i.fillStyle=s,i.fillRect(0,0,128,128);const r=new qe(e);return r.colorSpace=me,r}function fc(n,t,e){const i=t.split(" "),s=[];let r="";for(const o of i){const a=r?r+" "+o:o;n.measureText(a).width>e&&r?(s.push(r),r=o):r=a}return r&&s.push(r),s}function iu(){const n=document.createElement("canvas");n.width=256,n.height=256;const t=n.getContext("2d");t.fillStyle="#cdb98c",t.fillRect(0,0,256,256);for(let i=0;i<2600;i++){const s=168+Math.random()*42;t.fillStyle=`rgba(${s|0},${s*.92|0},${s*.72|0},${(Math.random()*.2).toFixed(3)})`,t.fillRect(Math.random()*256,Math.random()*256,2+Math.random()*4,2+Math.random()*4)}for(let i=0;i<150;i++)t.fillStyle="rgba(110,86,52,"+(.14+Math.random()*.26).toFixed(3)+")",t.beginPath(),t.arc(Math.random()*256,Math.random()*256,1+Math.random()*2,0,Math.PI*2),t.fill();const e=new qe(n);return e.colorSpace=me,e.wrapS=e.wrapT=di,e.repeat.set(ye?48:90,ye?48:90),e.anisotropy=ye?2:8,e}function ts(){const n=document.createElement("canvas");n.width=256,n.height=256;const t=n.getContext("2d");t.fillStyle="#c2a878",t.fillRect(0,0,256,256);for(let s=0;s<3200;s++)t.fillStyle=`rgba(90,68,40,${(Math.random()*.16).toFixed(3)})`,t.fillRect(Math.random()*256,Math.random()*256,1+Math.random()*3,1+Math.random()*3);for(let s=0;s<500;s++)t.fillStyle=`rgba(255,252,244,${(Math.random()*.12).toFixed(3)})`,t.fillRect(Math.random()*256,Math.random()*256,1+Math.random()*2,1+Math.random()*2);const e=t.createLinearGradient(112,0,144,256);e.addColorStop(0,"rgba(255,255,255,0)"),e.addColorStop(.5,"rgba(255,255,255,0.07)"),e.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=e,t.fillRect(0,0,256,256);const i=new qe(n);return i.colorSpace=me,i.wrapS=i.wrapT=di,i.repeat.set(1,60),i.anisotropy=ye?2:8,i}function Fn(n,t,e,i,s=500){const r=n.getSpacedPoints(s),o=new Float32Array((s+1)*6),a=new Float32Array((s+1)*4),l=new Uint32Array(s*6);for(let d=0;d<=s;d++){const h=r[Math.min(d,s-1)],p=r[Math.min(d+1,s-1)],f=new b().subVectors(p,h).normalize(),v=new b(-f.z,0,f.x).normalize(),g=h.clone().add(v.clone().multiplyScalar(-t/2)),m=h.clone().add(v.clone().multiplyScalar(t/2)),S=d*6;if(o[S]=g.x,o[S+1]=g.y,o[S+2]=g.z,o[S+3]=m.x,o[S+4]=m.y,o[S+5]=m.z,a[d*4]=0,a[d*4+1]=d/s,a[d*4+2]=1,a[d*4+3]=d/s,d<s){const x=d*2,y=d*2+1,U=d*2+2,P=d*2+3,R=d*6;l[R]=x,l[R+1]=U,l[R+2]=y,l[R+3]=y,l[R+4]=U,l[R+5]=P}}const c=new Ce;c.setAttribute("position",new ze(o,3)),c.setAttribute("uv",new ze(a,2)),c.setIndex(new ze(l,1)),c.computeVertexNormals();const u=new D(c,new q({color:e,roughness:.95,metalness:.02,map:i||null}));return u.receiveShadow=!0,u}function su(n,t,e,i,s){const r=new Dt,o=t.getPointAt(e),a=t.getTangentAt(e),c=new b(-a.z,0,a.x).normalize().clone().multiplyScalar(i*5.4),u=s%3-1;r.position.set(o.x+c.x+u*.9,0,o.z+c.z+u*.9);const d=t.getPointAt(Math.max(0,e-.035)),h=new b().subVectors(d,r.position).normalize(),p=Math.atan2(h.x,h.z);r.rotation.y=p;const f=new q({color:Jt.walnut,roughness:.8,metalness:.05}),v=new D(new ht(6.6,4.4,.22),f);v.position.y=3,v.castShadow=!0,r.add(v);const g=new q({color:12035198,roughness:.92}),m=new D(new ht(5.6,.4,.8),g);m.position.y=.2,m.castShadow=!0,r.add(m);const S=new q({color:10125655,roughness:.9}),x=new q({color:4338986,roughness:1}),y=new q({color:6257226,roughness:1,flatShading:!0});for(const dt of[-2.9,2.9]){const pt=new D(new ht(.5,.34,.5),S);pt.position.set(dt,.17,.55),r.add(pt);const Rt=new D(new ht(.42,.1,.42),x);Rt.position.set(dt,.34,.55),r.add(Rt);for(const Xt of[-.1,.12]){const se=new D(new Di(.14,1),y);se.position.set(dt+Xt,.42,.55),r.add(se);const j=new D(new _e(.05,6,5),new q({color:dt<0?12618344:13608308,roughness:.9}));j.position.set(dt+Xt,.52,.55),r.add(j)}}const U=new q({color:Jt.bronze,roughness:.75,metalness:.12}),P=new D(new ht(7,.26,.3),U);P.position.y=5.32,r.add(P);const R=new D(new ht(7,.26,.3),U);R.position.y=.72,r.add(R);for(const dt of[-3.5,3.5]){const pt=new D(new ht(.26,4.8,.3),U);pt.position.set(dt,3,0),r.add(pt)}const L=new q({color:Jt.walnutDark,roughness:.7,metalness:.1});for(const dt of[-2.5,2.5]){const pt=new D(new ht(.32,.8,.32),L);pt.position.set(dt,.4,0),pt.castShadow=!0,r.add(pt)}const _=ye?640:1024,M=ye?480:768,T=document.createElement("canvas");T.width=_,T.height=M,tg(T.getContext("2d"),n,s,_,M);const I=new qe(T);I.colorSpace=me,I.anisotropy=ye?2:8;const B=new Be({map:I});B.emissive=new Tt(16777215),B.emissiveIntensity=0;const Z=new D(new Yt(6.2,4),B);Z.position.set(0,3,.125),r.add(Z);const nt=new D(new Yt(6.2,4),new q({color:Jt.walnutDark,roughness:.9}));nt.position.set(0,3,-.125),nt.rotation.y=Math.PI,r.add(nt);const K=ye?null:new Ka(15246172,0,26,2);K&&(K.position.set(0,3.3,2.4),r.add(K));const rt=new q({color:Jt.amber,emissive:Jt.amber,emissiveIntensity:.22}),Y=new D(new _e(.09,12,12),rt);return Y.position.set(0,5.52,0),r.add(Y),{group:r,frontMat:B,light:K,beaconMat:rt,front:Z}}function tg(n,t,e,i=1024,s=768){const r=i,o=s;n.scale(i/1024,s/768);const a=n.createLinearGradient(0,0,0,o);a.addColorStop(0,"#fdf8ec"),a.addColorStop(1,"#f1e6cb"),n.fillStyle=a,n.fillRect(0,0,r,o),n.globalAlpha=.045;for(let d=0;d<900;d++)n.fillStyle=Math.random()>.5?"#7a5f38":"#ffffff",n.fillRect(Math.random()*r,Math.random()*o,2,2);n.globalAlpha=1,n.strokeStyle="rgba(122,95,56,0.3)",n.lineWidth=3,n.strokeRect(34,34,r-68,o-68),n.fillStyle="#c08a68";for(const[d,h,p,f]of[[34,34,1,1],[r-34,34,-1,1],[34,o-34,1,-1],[r-34,o-34,-1,-1]])n.fillRect(d+p*8,h+f*8,26*p,4*f),n.fillRect(d+p*8,h+f*8,4*p,26*f);n.fillStyle="#7a5f38",n.font="500 26px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",n.textAlign="left",n.letterSpacing="6px",n.fillText(t.kicker.toUpperCase(),70,96),n.letterSpacing="0px",n.fillStyle="rgba(207,165,116,0.18)",n.font="600 300px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",n.textAlign="right",n.fillText(t.num,r-60,360),n.fillStyle="#c08a68",n.fillRect(70,132,90,4),n.fillStyle="#3a2e1f",n.font="600 62px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",n.textAlign="left";const l=fc(n,t.title,860);let c=210;if(l.slice(0,4).forEach(d=>{n.fillText(d,70,c),c+=70}),c+=18,t.id!=="quiz"&&t.bullets.length){n.fillStyle="rgba(122,95,56,0.45)",n.fillRect(70,c-6,60,2),c+=26,n.font="400 30px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif";const d=[];t.bullets.slice(0,4).forEach(h=>d.push(...fc(n,h,840))),d.slice(0,5).forEach(h=>{n.fillStyle="#c08a68",n.beginPath(),n.arc(78,c-10,4,0,Math.PI*2),n.fill(),n.fillStyle="#4c3d28",n.fillText(h,100,c),c+=40})}n.fillStyle="rgba(122,95,56,0.7)",n.font="400 22px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",n.textAlign="left",n.letterSpacing="3px",n.fillText("MODULE 1 · DOMAINE PUBLIC",70,o-62),n.fillStyle="rgba(170,120,85,0.8)",n.textAlign="right",n.fillText(String(e+1).padStart(2,"0")+" / 13",r-70,o-62),n.letterSpacing="0px";const u=n.createRadialGradient(r/2,o/2,r*.3,r/2,o/2,r*.62);u.addColorStop(0,"rgba(0,0,0,0)"),u.addColorStop(.6,"rgba(0,0,0,0)"),u.addColorStop(1,"rgba(150,120,75,0.22)"),n.fillStyle=u,n.fillRect(0,0,r,o)}function Ca(n,t,e,i,s){const r=document.createElement("canvas");r.width=64,r.height=128;const o=r.getContext("2d");o.fillStyle="#dccda8",o.fillRect(0,0,64,128);for(let u=0;u<9;u++)for(let d=0;d<4;d++){const h=Math.random();h<.3?(o.fillStyle=Math.random()<.3?"#c08a68":"#c9a25f",o.globalAlpha=.35+Math.random()*.35,o.fillRect(4+d*14+Math.random()*4,6+u*13+Math.random()*3,5,7),o.globalAlpha=1):h<.42&&(o.fillStyle="#6a5a38",o.globalAlpha=.35,o.fillRect(4+d*14,6+u*13,5,7),o.globalAlpha=1)}const a=new qe(r);a.colorSpace=me,a.repeat.set(1,Math.max(1,Math.round(t/6))),a.wrapS=di,a.wrapT=di,a.anisotropy=ye?1:4;const l=new q({map:a,roughness:.9,metalness:0});l.emissive=new Tt(16763274),l.emissiveMap=a,l.emissiveIntensity=0;const c=new D(new ht(n,t,e),l);return c.position.set(s,t/2-.3,i),c.rotation.y=(Math.random()-.5)*.5,c.castShadow=!0,c}function Rs(n,t){const e=new Dt;e.position.copy(n);const i=new q({color:Jt.walnutDark,roughness:.6,metalness:.3}),s=new D(new Nt(.07,.1,5.6,8),i);s.position.y=2.8,e.add(s);const r=new D(new ht(1.7,.1,.1),i);r.position.set(t*.85,5.5,0),e.add(r);const o=new q({color:Jt.amber,emissive:Jt.amber,emissiveIntensity:.25}),a=new D(new _e(.16,12,12),o);return a.position.set(t*1.7,5.5,0),e.add(a),e}function eg(n,t){const e=new q({color:new Tt(Jt.groundDark).lerp(new Tt(Jt.ground),Math.random()),roughness:1,flatShading:!0}),i=new D(new Di(t,1),e);return i.position.set(n.x,-.15,n.z),i.scale.set(1,.32,1),i.rotation.y=Math.random()*Math.PI,i}function ng(n,t){const e=new q({color:10127976,roughness:.95,flatShading:!0}),i=new D(new Za(t,0),e);return i.position.set(n.x,t*.4,n.z),i.rotation.set(Math.random(),Math.random()*Math.PI,Math.random()),i}function ig(n=420){const t=n,e=new Float32Array(t*3),i=new ln([new b(0,0,0),new b(0,0,120),new b(0,0,240),new b(0,0,360),new b(0,0,468)],!1,"centripetal");for(let o=0;o<t;o++){const a=Math.random(),l=i.getPointAt(a);e[o*3]=l.x+(Math.random()-.5)*24,e[o*3+1]=.4+Math.random()*6,e[o*3+2]=l.z+(Math.random()-.5)*24}const s=new Ce;s.setAttribute("position",new ze(e,3));const r=new qr({color:Jt.amber,transparent:!0,opacity:.5,blending:tn,depthWrite:!1,size:.35,sizeAttenuation:!0});return new Ya(s,r)}function sg(){const n=new Dt,t=new Je({color:4864550,transparent:!0,opacity:.9,side:Ke}),e=new Yt(.55,.18),i=new D(e,t);i.position.x=-.3;const s=new D(e,t);s.position.x=.3;const r=new D(new Yt(.34,.07),t);return r.rotation.z=Math.PI/2,n.add(i,s,r),n.scale.setScalar(1.3),{g:n,l:i,r:s}}function ru(n,t=1){const e=new Dt,i=new q({color:9071429,roughness:.95,flatShading:!0}),s=new D(new Nt(.09,.18,3.2,6),i);s.position.y=1.6,s.rotation.z=(Math.random()-.5)*.22,s.castShadow=!0,e.add(s);const r=new q({color:6257226,roughness:1,flatShading:!0}),o=7;for(let l=0;l<o;l++){const c=l/o*Math.PI*2,u=new D(new _e(1,7,5),r);u.position.set(Math.cos(c)*1.15,3.05,Math.sin(c)*1.15),u.scale.set(1.15,.28,.55),u.rotation.y=c,e.add(u)}const a=new D(new _e(.28,8,6),r);return a.position.y=3.15,e.add(a),e.position.copy(n),e.scale.setScalar(t),e}function rg(n,t=1){const e=new Dt,i=new q({color:7045971,roughness:1,flatShading:!0});for(let s=0;s<5;s++){const r=new D(new Di(.3+Math.random()*.24,1),i);r.position.set((Math.random()-.5)*.7,.22+Math.random()*.3,(Math.random()-.5)*.7),e.add(r)}return e.position.copy(n),e.scale.setScalar(t),e}function og(n,t=1){const e=new Dt,i=new q({color:16183261,roughness:1,flatShading:!0,transparent:!0,opacity:.92});for(let s=0;s<6;s++){const r=new D(new _e(1.1+Math.random()*1.4,9,7),i);r.position.set(s*1.6-4,Math.random()*.9,(Math.random()-.5)*2),r.scale.y=.5,e.add(r)}return e.position.copy(n),e.scale.setScalar(t),e}function ag(n,t,e){const i=new Dt;i.position.copy(n);const s=new q({color:Jt.walnutDark,roughness:.7,metalness:.2}),r=new D(new Nt(.1,.14,2.1,8),s);r.position.y=1.05,r.castShadow=!0,i.add(r);const o=new D(new ht(.9,.08,.14),s);o.position.set(0,1.85,0),o.rotation.z=Math.PI/2,i.add(o);const a=ye?256:512,l=ye?160:320,c=document.createElement("canvas");c.width=a,c.height=l;const u=c.getContext("2d");u.scale(a/512,l/320),u.fillStyle="#f7eeda",u.fillRect(0,0,512,320),u.strokeStyle="rgba(138,111,69,0.6)",u.lineWidth=8,u.strokeRect(12,12,488,296);const d=u.createLinearGradient(0,0,512,0);d.addColorStop(0,"#c08a68"),d.addColorStop(1,"#cfa574"),u.fillStyle=d,u.fillRect(0,52,512,10),u.textAlign="center",u.fillStyle="#3a2e1f",u.font="700 42px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",e.forEach((g,m)=>u.fillText(g,256,122+m*50));const h=new qe(c);h.colorSpace=me,h.anisotropy=ye?2:8;const p=new Be({map:h}),f=new D(new Yt(1.7,1.06),p);f.position.y=2.28;const v=new Dt;return v.add(f),v.rotation.y=t,i.add(v),{group:i,sign:f}}function lg(n,t,e,i){const s=new q({color:Jt.hill,roughness:1,flatShading:!0}),r=new D(new Di(1,2),s);return r.scale.set(t,e,i),r.position.set(n.x,n.y,n.z),r.rotation.y=Math.random()*Math.PI,r.castShadow=!0,r}function Ps(n,t){const e=new Dt;e.position.copy(n);const i=new Hn(new An({map:Sn(0,"rgba(255,190,120,0.3)"),transparent:!0,blending:tn,depthWrite:!1,depthTest:!1}));i.scale.setScalar(3.6),i.position.set(t*1.7,5.5,0),e.add(i);const s=new D(new Ii(3.8,24),new Je({map:Sn(.12,"rgba(255,180,110,0.32)"),transparent:!0,blending:tn,depthWrite:!1}));return s.rotation.x=-Math.PI/2,s.position.y=.03,e.add(s),{group:e,glow:i,pool:s}}function Ra(){const n=new Dt,t=Math.random()<.5?12618344:Math.random()<.5?13805688:7035458,e=new q({color:t,roughness:.45,metalness:.35}),i=new q({color:3813154,roughness:.5,metalness:.4}),s=new D(new ht(1.5,.5,3.2),e);s.position.y=.5,s.castShadow=!0,n.add(s);const r=new D(new ht(1.3,.24,1),i);r.position.set(0,.72,1.15),n.add(r);const o=new D(new ht(1.12,.46,1.5),i);o.position.set(0,.95,-.2),o.castShadow=!0,n.add(o);const a=new q({color:8364973,roughness:.15,metalness:.6});for(const[h,p]of[[0,-.95],[0,.5]]){const f=new D(new ht(1.14,.38,.05),a);f.position.set(h,.96,p),n.add(f)}const l=new q({color:3023896,roughness:.9});for(const[h,p]of[[-.78,1.05],[.78,1.05],[-.78,-1.05],[.78,-1.05]]){const f=new D(new Nt(.32,.32,.22,14),l);f.rotation.x=Math.PI/2,f.rotation.z=Math.PI/2,f.position.set(h,.32,p),n.add(f)}const c=new q({color:16773839,emissive:16769184,emissiveIntensity:.5});for(const h of[-.55,.55]){const p=new D(new _e(.09,8,8),c);p.position.set(h,.55,1.6),n.add(p)}const u=new q({color:9051670,emissive:9051670,emissiveIntensity:.3});for(const h of[-.55,.55]){const p=new D(new ht(.16,.1,.04),u);p.position.set(h,.55,-1.6),n.add(p)}const d=new Hn(new An({map:Sn(0,"rgba(255,226,175,0.4)"),transparent:!0,blending:tn,depthWrite:!1,depthTest:!1}));return d.scale.set(3.4,3.4,1),d.position.set(0,.55,2.8),n.add(d),{group:n,cone:d}}function Pa(n,t){const e=new Dt;e.position.copy(n),e.rotation.y=t>0?Math.PI:0;const i=new q({color:9071429,roughness:.85}),s=new q({color:4864550,roughness:.7,metalness:.4}),r=new D(new ht(1.4,.08,.42),i);r.position.y=.42,e.add(r);const o=new D(new ht(1.4,.08,.4),i);o.position.set(0,.72,.18),e.add(o);for(const a of[-.6,.6]){const l=new D(new ht(.08,.42,.5),s);l.position.set(a,.21,0),e.add(l)}return e}function cg(){const n=document.createElement("canvas");n.width=256,n.height=256;const t=n.getContext("2d");t.fillStyle="#d3c096",t.fillRect(0,0,256,256),t.strokeStyle="rgba(122,95,56,0.35)",t.lineWidth=2,t.strokeRect(2,2,252,252);for(let i=64;i<256;i+=64)t.beginPath(),t.moveTo(i,2),t.lineTo(i,254),t.stroke(),t.beginPath(),t.moveTo(2,i),t.lineTo(254,i),t.stroke();for(let i=0;i<900;i++){const s=180+Math.random()*36;t.fillStyle=`rgba(${s|0},${s*.9|0},${s*.72|0},${(Math.random()*.16).toFixed(3)})`,t.fillRect(Math.random()*256,Math.random()*256,1+Math.random()*3,1+Math.random()*3)}const e=new qe(n);return e.colorSpace=me,e.wrapS=e.wrapT=di,e.repeat.set(ye?1:2,90),e.anisotropy=ye?2:8,e}function Lo(n,t=1){const e=new Dt,i=new q({color:7031340,roughness:.95,flatShading:!0}),s=new D(new Nt(.1,.16,2.6,7),i);s.position.y=1.3,s.castShadow=!0,e.add(s);const r=new q({color:5599295,roughness:1,flatShading:!0});for(let o=0;o<3;o++){const a=new D(new _e(1.05-o*.18,8,6),r);a.position.set((Math.random()-.5)*.5,2.6+o*.65,(Math.random()-.5)*.5),a.scale.y=.85,a.castShadow=!0,e.add(a)}return e.position.copy(n),e.scale.setScalar(t),e}function ug(n,t=1,e=0){const i=new Dt,s=[5599295,6585414],r=[12618344,13608308,10336383,14731680],o=a=>{const l=Math.sin(e*127.1+a*311.7)*43758.5453;return l-Math.floor(l)};for(let a=0;a<6;a++){const l=new D(new Nt(.015,.02,.32,4),new q({color:s[a%2],roughness:1}));l.position.set((o(a)-.5)*.5,.16,(o(a+13)-.5)*.5),i.add(l);const c=new D(new _e(.05,5,4),new q({color:r[(a+e)%r.length],roughness:.9}));c.position.set(l.position.x,.34,l.position.z),i.add(c)}return i.position.copy(n),i.scale.setScalar(t),i}function dg(n){const t=new Dt;t.position.copy(n);const e=new q({color:4864550,roughness:.6,metalness:.5}),i=new D(new Nt(.24,.2,.72,10),e);i.position.y=.36,i.castShadow=!0,t.add(i);const s=new D(new Nt(.27,.27,.05,10),e);return s.position.y=.75,t.add(s),t}function hg(){const n=new Dt,t=new q({color:10127994,roughness:.95,flatShading:!0}),e=new D(new _e(.11,8,6),t);e.scale.set(1,.8,1.4),e.position.y=.12,n.add(e);const i=new D(new _e(.055,8,6),t);i.position.set(0,.22,.1),n.add(i);const s=new D(new $n(.02,.05,4),t);return s.rotation.x=Math.PI/2,s.position.set(0,.22,.16),n.add(s),n.rotation.y=Math.random()*Math.PI*2,n}function si(n,t=4.6,e=3.2){const i=new D(new Yt(t,e),new Je({map:Sn(.35,"rgba(90,70,42,0.34)"),transparent:!0,depthWrite:!1}));return i.rotation.x=-Math.PI/2,i.position.set(n.x,.02,n.z),i}function fg(n,t=0,e=["PUBLICITÉ","URBAINE"]){const i=new Dt;i.position.copy(n),i.rotation.y=t;const s=new q({color:15392706,roughness:.85}),r=new q({color:10850152,roughness:.7,metalness:.15}),o=new D(new Nt(.62,.68,2.5,18),s);o.position.y=1.25,o.castShadow=!0,i.add(o);const a=new D(new Nt(.72,.8,.22,18),r);a.position.y=.11,i.add(a);const l=new D(new Nt(.66,.72,.16,18),r);l.position.y=2.58,i.add(l);const c=new D(new _e(.2,10,8),r);c.position.y=2.75,i.add(c);const u=256,d=640,h=document.createElement("canvas");h.width=u,h.height=d;const p=h.getContext("2d"),f=p.createLinearGradient(0,0,0,d);f.addColorStop(0,"#f5ecd6"),f.addColorStop(1,"#ead9b4"),p.fillStyle=f,p.fillRect(0,0,u,d),p.strokeStyle="rgba(138,111,69,0.5)",p.lineWidth=10,p.strokeRect(10,10,u-20,d-20),p.fillStyle="#c08a68",p.fillRect(0,d*.14,u,14),p.textAlign="center",p.fillStyle="#3a2e1f",p.font="700 34px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",e.forEach((m,S)=>p.fillText(m,u/2,d*.3+S*56)),p.fillStyle="#8a6a4e",p.font="400 26px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",p.fillText("DOMAINE PUBLIC",u/2,d*.78);const v=new qe(h);v.colorSpace=me,v.anisotropy=ye?2:8;const g=new D(new Yt(.92,2.5),new Be({map:v}));return g.position.set(0,1.25,.55),i.add(g),i}function pg(n,t=1){const e=new Dt;e.position.copy(n),e.rotation.y=t>0?0:Math.PI;const i=new q({color:4864550,roughness:.6,metalness:.45}),s=new q({color:12100725,roughness:.7,metalness:.2});for(const m of[-1.7,1.7]){const S=new D(new ht(.12,2.3,.12),i);S.position.set(m,1.15,.4),S.castShadow=!0,e.add(S)}const r=new D(new ht(4.2,.1,1.7),s);r.position.y=2.4,r.castShadow=!0,e.add(r);const o=new q({color:11060425,roughness:.1,metalness:.2,transparent:!0,opacity:.35}),a=new D(new Yt(3.4,1.5),o);a.position.set(0,1.5,-.42),e.add(a);const l=new D(new Yt(1.3,1.5),o);l.position.set(1.9,1.5,0),l.rotation.y=Math.PI/2,e.add(l);const c=320,u=200,d=document.createElement("canvas");d.width=c,d.height=u;const h=d.getContext("2d");h.fillStyle="#f2e7cd",h.fillRect(0,0,c,u),h.fillStyle="#cfa574",h.fillRect(0,0,c,40),h.textAlign="center",h.fillStyle="#3a2e1f",h.font="700 30px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",h.fillText("VOTRE ESPACE PUBLICITAIRE",c/2,105),h.font="400 20px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",h.fillStyle="#7a5f38",h.fillText("MODULE 1 · PANNEAUTIQUE",c/2,150);const p=new qe(d);p.colorSpace=me,p.anisotropy=ye?2:8;const f=new D(new Yt(3.4,1.4),new Be({map:p}));f.position.set(0,1.45,.42),e.add(f);const v=new q({color:9071429,roughness:.85}),g=new D(new ht(2.6,.07,.35),v);return g.position.set(0,.42,-.1),e.add(g),e}function mg(n,t=13215868,e=0){const i=new Dt;i.position.copy(n),i.rotation.y=e;const s=new q({color:5916210,roughness:.6,metalness:.4}),r=new q({color:9071429,roughness:.8}),o=new D(new Nt(.04,.06,.75,8),s);o.position.y=.38,i.add(o);const a=new D(new Nt(.42,.42,.06,14),r);a.position.y=.76,i.add(a);const l=new D(new Nt(.03,.03,1.5,8),s);l.position.y=1.1,i.add(l);const c=new D(new $n(1.1,.28,10),new Be({color:t}));c.position.y=1.95,i.add(c);for(const[u,d]of[[-.5,.5],[.5,.5],[-.5,-.5],[.5,-.5]]){const h=new D(new ht(.4,.1,.4),r);h.position.set(u,.42,d),i.add(h);const p=new D(new Nt(.025,.025,.42,6),s);p.position.set(u,.21,d),i.add(p)}return i.userData={parasol:c},i}function gg(n,t=0){const e=new Dt;e.position.copy(n),e.rotation.y=t;const i=new q({color:9071182,roughness:.6,metalness:.2}),s=new q({color:3813154,roughness:.95}),r=.34;for(const u of[-.35,.35]){const d=new D(new Vn(r,.035,8,20),s);d.position.set(0,r,u),e.add(d)}const o=new D(new ht(.03,.03,.72),i);o.position.set(0,.66,0),e.add(o);const a=new D(new Nt(.02,.02,.62,6),i);a.position.set(0,.82,0),a.rotation.x=Math.PI/2,e.add(a);const l=new D(new Nt(.02,.02,.34,6),i);l.position.set(0,.98,.35),e.add(l);const c=new D(new ht(.14,.03,.08),i);return c.position.set(0,.84,-.32),e.add(c),e}function _g(n,t=0,e="D"){const i=new Dt;i.position.copy(n),i.rotation.y=t;const s=new q({color:4864550,roughness:.6,metalness:.4}),r=new D(new Nt(.03,.05,1.8,8),s);r.position.y=.9,r.castShadow=!0,i.add(r);const o=document.createElement("canvas");o.width=128,o.height=64;const a=o.getContext("2d");a.fillStyle="#e3d6b4",a.fillRect(0,0,128,64),a.fillStyle=e==="D"?"#c08a68":"#7d9a68",a.fillRect(0,0,26,64),a.strokeStyle="rgba(138,111,69,0.6)",a.lineWidth=4,a.strokeRect(2,2,124,60),a.textAlign="center",a.fillStyle="#3a2e1f",a.font="700 26px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",a.fillText(e,76,42);const l=new qe(o);l.colorSpace=me,l.anisotropy=ye?2:8;const c=new D(new Yt(.7,.35),new Be({map:l}));return c.position.y=1.9,i.add(c),i}function Io(n,t=1.8,e=.6){const i=new Dt;i.position.copy(n);const s=new q({color:6257226,roughness:1,flatShading:!0}),r=new D(new ht(t,e,.5),s);r.position.y=e/2,r.castShadow=!0,i.add(r);const o=Math.max(2,Math.round(t/.7));for(let a=0;a<o;a++){const l=new D(new Di(.3,1),s);l.position.set(-t/2+.3+a*(t-.6)/(o-1),e+.18,0),i.add(l)}return i}const vg=[14266508,13146738,11567964,9068616,14727320].map(n=>new q({color:n,roughness:.85})),Mg=[3023896,4863524,8215604,13215864,2236446].map(n=>new q({color:n,roughness:.9})),yg=[13215868,9415293,13608308,11052232,10336447,13805176,14726304,12108960].map(n=>new q({color:n,roughness:.85})),Sg=[4865070,6048314,4146772,6969924,5588028].map(n=>new q({color:n,roughness:.9})),xg=new q({color:3023896,roughness:.8}),pc=new q({color:13610612,roughness:.9}),wr=n=>n[Math.random()*n.length|0];function wg(){const n=new Dt,t=.92+Math.random()*.18,e=.85+Math.random()*.32,i=wr(vg),s=wr(Mg),r=wr(yg),o=wr(Sg),a=xg,l=Math.random()<.22,c=Math.random()<.14,u=Math.random()<.16,d=.9*t,h=.105*e,p=_=>{const M=new Dt;M.position.set(_,d,0);const T=new D(new Nt(.064,.05,.46*t,8),o);T.position.y=-.23*t,T.castShadow=!0,M.add(T);const I=new Dt;I.position.y=-.46*t;const B=new D(new Nt(.05,.04,.44*t,8),o);B.position.y=-.22*t,I.add(B);const Z=new D(new ht(.09,.07,.17),a);return Z.position.set(0,-.44*t,.045),I.add(Z),M.add(I),{leg:M,knee:I}},f=p(-h),v=p(h);n.add(f.leg,v.leg);const g=new Dt;if(n.add(g),l){const _=new D(new $n(.21*e,.34,12),r);_.position.y=.78*t,_.castShadow=!0,g.add(_)}const m=new D(new Nt(.175*e,.215*e,.54*t,12),r);m.position.y=1.2*t,m.castShadow=!0,g.add(m);const S=r;for(const _ of[-.19*e,.19*e]){const M=new D(new _e(.075*e,8,6),S);M.position.set(_,1.42*t,0),g.add(M)}if(u){const _=new D(new ht(.15,.17,.06),o);_.position.set(.3*e,1.16*t,0),_.rotation.z=.18,g.add(_);const M=new D(new ht(.02,.3,.02),o);M.position.set(.26*e,1.32*t,0),M.rotation.z=.4,g.add(M)}const x=new D(new Nt(.045,.055,.12,8),i);x.position.y=1.5*t,g.add(x);const y=new D(new _e(.135,12,10),i);y.position.y=1.64*t,y.castShadow=!0,g.add(y);const U=new D(new _e(.15,10,8),s);if(U.position.set(0,1.66*t,-.02),U.scale.set(1,.78,1.06),g.add(U),c){const _=new D(new Nt(.19,.2,.03,12),pc);_.position.y=1.74*t,g.add(_);const M=new D(new _e(.1,10,8),pc);M.position.y=1.78*t,M.scale.set(1,.85,1),g.add(M)}const P=_=>{const M=new Dt;M.position.set(_,1.4*t,0);const T=new D(new Nt(.055,.062,.26,8),r);T.position.y=-.13,T.castShadow=!0,M.add(T);const I=new Dt;I.position.y=-.26;const B=new D(new Nt(.042,.05,.24,8),i);B.position.y=-.12,I.add(B);const Z=new D(new _e(.05,8,6),i);return Z.position.y=-.24,I.add(Z),M.add(I),{arm:M,elbow:I}},R=P(-.235*e),L=P(.235*e);return g.add(R.arm,L.arm),{g:n,legL:f.leg,legR:v.leg,kneeL:f.knee,kneeR:v.knee,armL:R.arm,armR:L.arm,elbowL:R.elbow,elbowR:L.elbow,lean:g,phase:Math.random()*Math.PI*2}}function bg(){const n=new Dt,t=new q({color:13219985,roughness:.9}),e=new q({color:11048556,roughness:.9}),i=new q({color:11060425,roughness:.1,metalness:.2,transparent:!0,opacity:.75}),s=new D(new Nt(1.7,1.9,.5,20),t);s.position.y=.25,s.castShadow=!0,n.add(s);const r=new D(new Vn(1.8,.14,8,24),e);r.rotation.x=Math.PI/2,r.position.y=.5,n.add(r);const o=new D(new Ii(1.62,20),i);o.rotation.x=-Math.PI/2,o.position.y=.31,n.add(o);const a=new D(new Nt(.16,.22,.8,10),e);a.position.y=.9,n.add(a);const l=new D(new Nt(.55,.35,.14,12),e);l.position.y=1.25,n.add(l);const c=new D(new Nt(.05,.05,.55,8),i);return c.position.y=1.6,n.add(c),n.userData={jet:c,pool:o,dish:l},n}function Eg(n,t=0,e=["ESPACE","PUBLICITAIRE"]){const i=new Dt;i.position.copy(n),i.rotation.y=t;const s=new q({color:7035458,roughness:.7,metalness:.2}),r=new q({color:15260864,roughness:.85});for(const f of[-2.6,2.6]){const v=new D(new ht(.22,3.4,.22),s);v.position.set(f,1.7,0),v.castShadow=!0,i.add(v);const g=new D(new ht(.6,.12,.6),s);g.position.set(f,.06,0),i.add(g)}const o=new D(new ht(5.6,3.1,.14),r);o.position.y=3.6,o.castShadow=!0,i.add(o);const a=ye?320:640,l=ye?180:360,c=document.createElement("canvas");c.width=a,c.height=l;const u=c.getContext("2d"),d=u.createLinearGradient(0,0,0,l);d.addColorStop(0,"#f3e8cd"),d.addColorStop(1,"#e6d3a9"),u.fillStyle=d,u.fillRect(0,0,a,l),u.fillStyle="#c08a68",u.fillRect(0,0,a,l*.22),u.textAlign="center",u.fillStyle="#3a2e1f",u.font="700 "+l*.11+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",e.forEach((f,v)=>u.fillText(f,a/2,l*.42+v*(l*.16))),u.fillStyle="#7a5f38",u.font="400 "+l*.06+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",u.fillText("PANNEAUTIQUE · DOMAINE PUBLIC",a/2,l*.86);const h=new qe(c);h.colorSpace=me,h.anisotropy=ye?2:8;const p=new D(new Yt(5.3,2.8),new q({map:h,emissive:16767392,emissiveMap:h,emissiveIntensity:0}));return p.position.set(0,3.6,.09),i.add(p),i.userData={face:p},i}function Tg(n,t=0){const e=new Dt;e.position.copy(n),e.rotation.y=t;const i=new q({color:9071429,roughness:.85}),s=new q({color:6048304,roughness:.5,metalness:.4}),r=new D(new ht(1.9,2.2,1.5),i);r.position.y=1.1,r.castShadow=!0,e.add(r);const o=new D(new ht(2.4,.14,2),s);o.position.y=2.27,e.add(o);const a=new D(new Yt(.34,.2),new Be({color:13608308,side:Ke}));a.position.set(1.05,2.42,.55),a.rotation.y=Math.PI/2,e.add(a);const l=new D(new ht(1.9,.5,.25),s);l.position.set(0,.9,.82),e.add(l);const c=new D(new ht(2.2,.06,.7),new q({color:12618344,roughness:.9}));c.position.set(0,1.65,.85),e.add(c);const u=document.createElement("canvas");u.width=128,u.height=96;const d=u.getContext("2d");d.fillStyle="#f2e7cd",d.fillRect(0,0,128,96),d.strokeStyle="rgba(138,111,69,0.6)",d.lineWidth=4,d.strokeRect(4,4,120,88),d.textAlign="center",d.fillStyle="#3a2e1f",d.font="700 20px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",d.fillText("LE QUOTIDIEN",64,40),d.font="400 15px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",d.fillStyle="#7a5f38",d.fillText("0,50 €",64,66);const h=new qe(u);h.colorSpace=me,h.anisotropy=ye?2:8;const p=new D(new Yt(.7,.5),new q({map:h,emissive:16767392,emissiveMap:h,emissiveIntensity:0}));return p.position.set(0,1.35,.82),e.add(p),e.userData={flag:a,sign:p},e}function Ag(n,t=0,e=13209450){const i=new Dt;i.position.copy(n),i.rotation.y=t;const s=new q({color:9071429,roughness:.85});for(const p of[-1,1]){const f=new D(new ht(.08,1,.08),s);f.position.set(p,.5,0),f.castShadow=!0,i.add(f)}const r=new D(new ht(2,.12,.8),s);r.position.y=.97,i.add(r);const o=new D(new ht(2.2,.06,.9),s);o.position.y=1.03,i.add(o);const a=[12606026,13608308,8231528,9083576,13805176];for(let p=0;p<5;p++){const f=new D(new _e(.09,8,6),new q({color:a[p%a.length],roughness:.7}));f.position.set(-.8+p*.4,1.12,0),f.scale.y=.85,i.add(f)}const l=ou(2.4,.9,e);l.position.set(0,2.1,.3),i.add(l);const c=document.createElement("canvas");c.width=256,c.height=96;const u=c.getContext("2d");u.fillStyle="#f7eeda",u.fillRect(0,0,256,96),u.strokeStyle="rgba(138,111,69,0.6)",u.lineWidth=6,u.strokeRect(4,4,248,88),u.fillStyle="#3a2e1f",u.textAlign="center",u.font="700 34px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",u.fillText("MARCHÉ",128,60);const d=new qe(c);d.colorSpace=me;const h=new D(new Yt(1.3,.5),new q({map:d,emissive:16767392,emissiveMap:d,emissiveIntensity:0}));return h.position.set(0,2.32,.05),i.add(h),i.userData={sign:h},i}function Cg(){const n=[9415293,7045971,13215868,13805176],t=new Dt,e=new D(new Yt(.16,.1),new Be({color:n[Math.random()*n.length|0],side:Ke,transparent:!0,opacity:.72}));return t.add(e),t}function Rg(n,t,e=[12618344,13608308,10336383,9083576,13805176],i=10,s=.7){const r=new Dt,o=new b().addVectors(n,t).multiplyScalar(.5);r.position.copy(o);const a=new b().subVectors(t,n),l=e.map(f=>new Be({color:f,side:Ke})),c=new Yt(.42,.3),u=Math.atan2(a.x,a.z),d=[],h=i*2;for(let f=0;f<=h;f++){const v=f/h,g=an.lerp(n.x,t.x,v)-o.x,m=an.lerp(n.y,t.y,v)-s*Math.sin(Math.PI*v)-o.y,S=an.lerp(n.z,t.z,v)-o.z;if(d.push(new b(g,m,S)),f%2===0){const x=new D(c,l[f/2%l.length]);x.position.set(g,m-.15,S),x.rotation.y=u,r.add(x)}}const p=new qa(new Ce().setFromPoints(d),new Xr({color:9071182}));return r.add(p),r}function ou(n,t,e){const r=document.createElement("canvas");r.width=256,r.height=128;const o=r.getContext("2d"),a="#"+e.toString(16).padStart(6,"0"),l=8;for(let f=0;f<l;f++)o.fillStyle=f%2===0?a:"#f7eeda",o.fillRect(f*(256/l),0,256/l,128);const c=new qe(r);c.colorSpace=me,c.anisotropy=ye?1:4;const u=new Be({map:c,side:Ke}),d=new Dt,h=new D(new Yt(n,t),u);h.rotation.x=-.5,h.position.set(0,.15,.45),d.add(h);const p=new D(new Yt(n,.2),u);return p.position.set(0,.1,t*.85),p.rotation.x=-.15,d.add(p),d}function Pg(n,t=0,e=13209450,i="BOUTIQUE"){const s=new Dt;s.position.copy(n),s.rotation.y=t;const r=5,o=3.3,a=2.8,l=new Be({color:15129019}),c=new D(new ht(r,o,a),l);c.position.y=o/2,c.castShadow=!0,s.add(c);const u=new D(new ht(r+.24,.2,a+.24),l);u.position.y=o+.1,s.add(u);const d=ye?256:512,h=ye?160:320,p=document.createElement("canvas");p.width=d,p.height=h;const f=p.getContext("2d");f.scale(d/512,h/320);const v=f.createLinearGradient(0,0,0,320);v.addColorStop(0,"#f2e6c9"),v.addColorStop(1,"#dccaa3"),f.fillStyle=v,f.fillRect(0,0,512,320);const g=["#c08a68","#7d9a68","#cfa574"];for(let U=0;U<3;U++){const P=30+U*160;f.fillStyle="rgba(122,95,56,0.5)",f.fillRect(P,192,120,10),f.fillStyle=g[U];for(let R=0;R<4;R++)f.beginPath(),f.arc(P+22+R*26,178,9,0,Math.PI*2),f.fill()}f.fillStyle="rgba(255,255,255,0.2)",f.beginPath(),f.moveTo(300,0),f.lineTo(430,0),f.lineTo(230,320),f.lineTo(100,320),f.closePath(),f.fill(),f.strokeStyle="#8a6a4e",f.lineWidth=12,f.strokeRect(6,6,500,308),f.fillStyle="#3a2e1f",f.font="700 36px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",f.textAlign="center",f.fillText(i,256,52);const m=new qe(p);m.colorSpace=me,m.anisotropy=ye?2:8;const S=new q({map:m,emissive:16767392,emissiveMap:m,emissiveIntensity:0}),x=new D(new Yt(r*.8,o*.6),S);x.position.set(0,o*.52,a/2+.03),s.add(x);const y=ou(r*.84,.9,e);return y.position.set(0,o-.55,a/2-.2),s.add(y),s.userData={window:x},s}function Lg(){const n=new Dt,t=new q({color:12618344,roughness:.5,metalness:.25});new q({color:4864550,roughness:.5,metalness:.3});const e=new q({color:9416888,roughness:.15,metalness:.5}),i=new D(new ht(2,1.3,5.6),t);i.position.y=1.15,i.castShadow=!0,n.add(i);const s=new D(new ht(1.8,.16,5.4),t);s.position.y=1.9,n.add(s);const r=new D(new ht(1.72,.52,5.2),e);r.position.y=1.56,n.add(r);const o=new D(new ht(1.8,.5,.06),e);o.position.set(0,1.5,2.8),n.add(o);const a=new q({color:3023896,roughness:.9});for(const[u,d]of[[-.95,1.7],[.95,1.7],[-.95,-1.7],[.95,-1.7]]){const h=new D(new Nt(.36,.36,.26,14),a);h.rotation.x=Math.PI/2,h.rotation.z=Math.PI/2,h.position.set(u,.36,d),n.add(h)}const l=new q({color:16773839,emissive:16769184,emissiveIntensity:.5});for(const u of[-.7,.7]){const d=new D(new _e(.1,8,8),l);d.position.set(u,1.05,2.82),n.add(d)}const c=new Hn(new An({map:Sn(0,"rgba(255,226,175,0.4)"),transparent:!0,blending:tn,depthWrite:!1,depthTest:!1}));return c.scale.set(4.2,4.2,1),c.position.set(0,1.1,4.6),n.add(c),{group:n,cone:c}}function Ig(){const n=new Dt,t=new Be({color:12159582,roughness:.9}),e=new Be({color:9069120,roughness:.9}),i=new D(new ht(.3,.22,.55),t);i.position.y=.24,i.castShadow=!0,n.add(i);const s=new D(new ht(.16,.15,.18),t);s.position.set(0,.36,.33),n.add(s);const r=new D(new ht(.04,.09,.11),e);r.position.set(0,.45,.34),n.add(r);const o=new D(new ht(.05,.05,.2),t);o.position.set(0,.36,-.37),n.add(o);for(const[a,l]of[[-.11,.18],[.11,.18],[-.11,-.18],[.11,-.18]]){const c=new D(new ht(.06,.18,.06),t);c.position.set(a,.09,l),n.add(c)}return n.userData={tail:o},n}function Dg(n){const t=new Dt;t.position.copy(n);const e=new D(new Nt(.025,.025,1.1,6),new q({color:9071182,roughness:.8}));e.position.y=.55,t.add(e);const i=[12606026,13608308,8231528],s=[];for(let r=0;r<3;r++){const o=new D(new _e(.21,10,8),new Be({color:i[r],emissive:i[r],emissiveIntensity:.08}));o.position.set((r-1)*.22,1.2+Math.sin(r*2.1)*.05,r%2*.12-.06),o.scale.set(1,1.2,1),t.add(o),s.push(o)}return t.userData={balloons:s},t}function Ug(n,t){const e=window.innerWidth<=760;Qm(e);const i=G=>e?Math.max(2,Math.round(G*.45)):G,s=new Wa({canvas:n,antialias:!e,alpha:!1});s.setPixelRatio(Math.min(window.devicePixelRatio,e?1.5:2)),s.setSize(window.innerWidth,window.innerHeight),s.toneMapping=kr,s.toneMappingExposure=1.25,s.shadowMap.enabled=!e,s.shadowMap.type=Br;const r=new Xa;r.fog=new oi(Jt.skyHorizon,60,760);const o=new xe(e?62:52,window.innerWidth/window.innerHeight,.1,900),a={ambient:new Tt(11772544),hemiSky:new Tt(15918796),hemiGround:new Tt(12101246),sun:new Tt(16772552),fog:new Tt(16116950)},l={ambient:new Tt(6253452),hemiSky:new Tt(4412282),hemiGround:new Tt(2305088),sun:new Tt(10335448),fog:new Tt(3227998)},c=new Xn({side:Xe,depthWrite:!1,uniforms:{top:{value:new Tt(Jt.skyTop)},mid:{value:new Tt(Jt.skyMid)},horizon:{value:new Tt(Jt.skyHorizon)},sunDir:{value:new b(0,.16,-1).normalize()},sunColor:{value:new Tt(Jt.sun)},night:{value:0},topN:{value:new Tt(725536)},midN:{value:new Tt(1385016)},horN:{value:new Tt(3227998)},moonDir:{value:new b(.22,.52,-.83).normalize()},moonColor:{value:new Tt(14082804)}},vertexShader:`
      varying vec3 vPos;
      void main() { vPos = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
    `,fragmentShader:`
      varying vec3 vPos;
      uniform vec3 top, mid, horizon, sunColor, sunDir, topN, midN, horN, moonDir, moonColor;
      uniform float night;
      float hash(vec3 p) {
        p = fract(p * 0.3183099 + 0.1);
        p *= 17.0;
        return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
      }
      void main() {
        vec3 dir = normalize(vPos);
        float h = clamp(dir.y, 0.0, 1.0);
        vec3 col = mix(horizon, mid, smoothstep(0.0, 0.12, h));
        col = mix(col, top, smoothstep(0.12, 0.5, h));
        vec3 colN = mix(horN, midN, smoothstep(0.0, 0.12, h));
        colN = mix(colN, topN, smoothstep(0.12, 0.5, h));
        col = mix(col, colN, night);
        float sun = pow(max(dot(dir, sunDir), 0.0), 42.0) * 1.5;
        float halo = pow(max(dot(dir, sunDir), 0.0), 7.0) * 0.4;
        col += sunColor * (sun + halo) * (1.0 - night);
        float moon = pow(max(dot(dir, moonDir), 0.0), 300.0) * 1.4;
        float mHalo = pow(max(dot(dir, moonDir), 0.0), 9.0) * 0.4;
        col += moonColor * (moon + mHalo) * night;
        // Étoiles visibles uniquement la nuit
        float starMask = smoothstep(0.16, 0.32, h);
        float s = step(0.9991, hash(dir));
        col += vec3(1.0) * s * starMask * night * 0.85;
        gl_FragColor = vec4(col, 1.0);
      }
    `});r.add(new D(new _e(700,e?24:40,e?12:20),c));const u=new Hn(new An({map:Sn(0,"rgba(244,200,150,0.5)"),transparent:!0,blending:tn,depthWrite:!1,depthTest:!1}));u.position.set(42,56,-560),u.scale.setScalar(42),o.add(u);const d=new Hn(new An({map:Sn(0,"rgba(214,226,244,0.5)"),transparent:!0,blending:tn,depthWrite:!1,depthTest:!1,opacity:0}));d.position.set(-34,54,-545),d.scale.setScalar(30),o.add(d),r.add(o);const h=new D(new Ii(1600,e?32:48),new q({map:iu(),roughness:1,metalness:0}));h.rotation.x=-Math.PI/2,h.position.y=-.02,h.receiveShadow=!0,r.add(h);const p=[new b(0,0,0),new b(7,0,30),new b(-8,0,62),new b(9,0,96),new b(-9,0,132),new b(8,0,168),new b(-7,0,202),new b(6,0,236),new b(-8,0,270),new b(7,0,304),new b(-6,0,338),new b(8,0,372),new b(-8,0,406),new b(6,0,440),new b(0,0,468)],f=new ln(p,!1,"centripetal",.6);f.arcLengthDivisions=1e3;const v=e?240:500,g=Fn(f,4.2,Jt.path,ts(),v);g.position.y=.012,r.add(g);for(const G of[-1.5,1.5]){const X=Fn(f,.14,Jt.pathEdge,null,v);X.position.set(G,.025,0),r.add(X)}for(let G=0;G<=i(84);G++){const X=G/84*.96+.02,H=f.getPointAt(X),J=f.getTangentAt(X),st=new D(new ht(.14,.03,1.1),new Je({color:14270604}));st.position.set(H.x,.045,H.z),st.rotation.y=Math.atan2(J.x,J.z),r.add(st)}const m=new Je({color:15919826});for(const G of[.22,.58,.86]){const X=f.getPointAt(G),H=f.getTangentAt(G),J=new b(-H.z,0,H.x).normalize();for(let st=-3;st<=3;st++){const at=X.clone().add(H.clone().multiplyScalar(st*.55)),ft=new D(new ht(.42,.03,3.3),m);ft.position.set(at.x,.05,at.z),ft.rotation.y=Math.atan2(J.x,J.z),r.add(ft)}}const S=[3.55,-3.55].map(G=>{const X=[],H=e?60:120;for(let J=0;J<=H;J++){const st=J/H,at=f.getPointAt(st),ft=f.getTangentAt(st),Ht=new b(-ft.z,0,ft.x).normalize();X.push(new b(at.x+Ht.x*G,0,at.z+Ht.z*G))}return new ln(X,!1,"centripetal",.6)}),x=[2.42,-2.42].map(G=>{const X=[],H=e?60:120;for(let J=0;J<=H;J++){const st=J/H,at=f.getPointAt(st),ft=f.getTangentAt(st),Ht=new b(-ft.z,0,ft.x).normalize();X.push(new b(at.x+Ht.x*G,0,at.z+Ht.z*G))}return new ln(X,!1,"centripetal",.6)}),y=cg();for(const G of S){const X=Fn(G,2.2,13877398,y,v);X.position.y=.015,r.add(X)}for(const G of x){const X=Fn(G,.24,12100725,null,v);X.position.y=.035,r.add(X)}const U=new D(new Bs(f,e?200:400,.05,8,!1),new Je({color:13015654,transparent:!0,opacity:.7,blending:Ri,depthWrite:!1}));U.position.y=.055,r.add(U);const P=U.geometry.index.count,R=new nu(11772544,.75);r.add(R);const L=new Qc(15918796,12101246,.5);r.add(L);const _=new eu(16772552,2.2);_.position.set(-40,60,-120),_.castShadow=!0,_.shadow.mapSize.set(2048,2048),_.shadow.camera.left=-160,_.shadow.camera.right=160,_.shadow.camera.top=200,_.shadow.camera.bottom=-60,_.shadow.camera.near=10,_.shadow.camera.far=700,r.add(_),r.add(_.target);const M=[],T=[],I=t.length,B=[],Z=[],nt=[],K=[],rt=[],Y=[],dt=[],pt=[],Rt=[],Xt=[],se=[],j=[];let ut=0,Pt=0;function mt(G,X){const H=rg(G,X);return K.push({g:H,phase:Math.random()*Math.PI*2}),r.add(H),H}function Ot(G,X,H){const J=ug(G,X,H);return rt.push({g:J,phase:Math.random()*Math.PI*2}),r.add(J),J}t.forEach((G,X)=>{const H=.02+(X+.5)/I*.94,J=X%2===0?1:-1,st=su(G,f,H,J,X);if(M.push(st),T.push({mesh:st.front,kind:"panel",index:X}),r.add(st.group),r.add(si(st.group.position,6.4,4.2)),X%3===0){const at=new b(Math.cos(st.group.rotation.y),0,-Math.sin(st.group.rotation.y)).normalize(),ft=st.group.position.clone().add(at.clone().multiplyScalar(3.4));ft.y=0,Ot(ft,.9+Math.random()*.5,X),mt(st.group.position.clone().add(at.clone().multiplyScalar(-3.2)),.7+Math.random()*.5)}});for(let G=0;G<i(40);G++){const X=G*13+Math.random()*7,H=7+Math.random()*27,J=4+Math.random()*3.5,st=4+Math.random()*3.5,at=Ca(J,H,st,X,-78-Math.random()*34),ft=Ca(J,H*(.7+Math.random()*.6),st,X,78+Math.random()*34);Rt.push(at,ft),r.add(at,ft)}for(let G=0;G<i(14);G++){const X=30+Math.random()*450,H=Math.random()>.5?1:-1,J=28+Math.random()*55,st=42+Math.random()*50;r.add(lg(new b(H*(210+Math.random()*150),J*.4-3,X),st,J,38+Math.random()*30))}const Vt=new q({color:Jt.hill,roughness:1,flatShading:!0}),$t=new D(new _e(120,24,12),Vt);$t.scale.set(1,.5,4),$t.position.set(-230,-2,240),r.add($t);const Me=new D(new _e(150,24,12),Vt);Me.scale.set(1,.55,4.5),Me.position.set(280,0,330),r.add(Me);const te=[];for(let G=0;G<=i(14);G++){const X=G/14*.96+.02,H=f.getPointAt(X),J=f.getTangentAt(X),st=G%2===0?1:-1,at=new b(-J.z,0,J.x).normalize(),ft=H.clone().add(at.clone().multiplyScalar(st*4.8));r.add(Rs(ft,st));const Ht=Ps(ft,st);te.push({glow:Ht.glow,pool:Ht.pool,i:G}),r.add(Ht.group)}for(let G=0;G<=i(13);G++){const X=G/13*.96+.02+.035;if(X>.98)continue;const H=f.getPointAt(X),J=f.getTangentAt(X),st=G%2===0?-1:1,at=new b(-J.z,0,J.x).normalize(),ft=H.clone().add(at.clone().multiplyScalar(st*5.3));r.add(Pa(ft,st));const Ht=H.clone().add(at.clone().multiplyScalar(st*4.6));if(Ot(Ht,.8+Math.random()*.5,G*3+1),G%3===1){const Re=H.clone().add(at.clone().multiplyScalar(st*6.1));r.add(dg(Re))}}const Te=[],z=t.map((G,X)=>.02+(X+.5)/I*.94);for(let G=0;G<i(30);G++){let X=Math.random();for(let Re=0;Re<8&&(X=Math.random(),!!z.some(Qe=>Math.abs(Qe-X)<.018));Re++);const H=f.getPointAt(X),J=f.getTangentAt(X),st=new b(-J.z,0,J.x).normalize(),at=Math.random()>.5?1:-1,ft=H.clone().add(st.clone().multiplyScalar(at*(8.5+Math.random()*7.5))),Ht=Lo(ft,.9+Math.random()*.8);Te.push({g:Ht,phase:Math.random()*Math.PI*2}),r.add(Ht)}const Ye=[];for(let G=0;G<i(9);G++){const X=.04+Math.random()*.92,H=f.getPointAt(X),J=f.getTangentAt(X),st=new b(-J.z,0,J.x).normalize(),at=Math.random()>.5?1:-1,ft=H.clone().add(st.clone().multiplyScalar(at*(3.1+Math.random()*1.8))),Ht=hg();Ht.position.set(ft.x,0,ft.z),Ye.push({g:Ht,phase:Math.random()*Math.PI*2,x0:ft.x,z0:ft.z}),r.add(Ht)}(e?[.14,.46]:[.14,.46,.82]).forEach((G,X)=>{const H=f.getPointAt(G),J=f.getTangentAt(G),st=new b(-J.z,0,J.x).normalize(),at=X%2===0?1:-1,ft=H.clone().add(st.clone().multiplyScalar(at*5.15)),Ht=Math.atan2(st.x,st.z)+(at>0?0:Math.PI);r.add(fg(ft,Ht,X===1?["RÈGLES","D'AFFICHAGE"]:void 0)),r.add(si(ft,2,2)),r.add(Io(ft.clone().add(st.clone().multiplyScalar(at*-1.6)),2.2,.55))}),(e?[.24]:[.24,.62]).forEach((G,X)=>{const H=f.getPointAt(G),J=f.getTangentAt(G),st=new b(-J.z,0,J.x).normalize(),at=X%2===0?-1:1,ft=H.clone().add(st.clone().multiplyScalar(at*5.5));r.add(pg(ft,at)),r.add(si(ft,4.6,2.6))}),(e?[.19,.85]:[.19,.52,.85]).forEach((G,X)=>{const H=f.getPointAt(G),J=f.getTangentAt(G),st=new b(-J.z,0,J.x).normalize(),at=X%2===0?1:-1,ft=H.clone().add(st.clone().multiplyScalar(at*6.4)),Ht=Math.atan2(J.x,J.z)+(at>0?Math.PI:0),Re=[13215868,9415293,13805176],Qe=mg(ft,Re[X%Re.length],Ht);Z.push({g:Qe,phase:Math.random()*Math.PI*2}),r.add(Qe)});for(let G=0;G<i(5);G++){const X=.06+Math.random()*.88,H=f.getPointAt(X),J=f.getTangentAt(X),st=new b(-J.z,0,J.x).normalize(),at=Math.random()>.5?1:-1,ft=H.clone().add(st.clone().multiplyScalar(at*(5.9+Math.random()*1.4)));r.add(gg(ft,Math.random()*Math.PI*2))}(e?[.28,.72]:[.18,.5,.8]).forEach(G=>{const X=f.getPointAt(G),H=f.getTangentAt(G),J=new b(-H.z,0,H.x).normalize(),st=X.clone().add(J.clone().multiplyScalar(3.9)),at=X.clone().add(J.clone().multiplyScalar(-3.9));st.y=5.3,at.y=5.3;const ft=Rg(st,at);Y.push({g:ft,phase:Math.random()*Math.PI*2}),r.add(ft)});const Ft=[{color:13209450,label:"BOULANGERIE"},{color:8231528,label:"PHARMACIE"},{color:9083576,label:"LIBRAIRIE"},{color:13608308,label:"CAFÉ DU PARC"}];(e?[.15,.7]:[.15,.38,.6,.84]).forEach((G,X)=>{const H=f.getPointAt(G),J=f.getTangentAt(G),st=new b(-J.z,0,J.x).normalize(),at=H.clone().add(st.clone().multiplyScalar(-1*(11+X%2*2.4))),ft=Math.atan2(st.x,st.z),Ht=Pg(at,ft,Ft[X%Ft.length].color,Ft[X%Ft.length].label);Xt.push(Ht),r.add(Ht),r.add(si(at,5.4,3.2))}),[.32,.7].forEach((G,X)=>{const H=f.getPointAt(G),J=f.getTangentAt(G),st=new b(-J.z,0,J.x).normalize(),at=X%2===0?1:-1,ft=H.clone().add(st.clone().multiplyScalar(at*2.8));r.add(_g(ft,Math.atan2(J.x,J.z),X===0?"D":"A"))});for(let G=0;G<i(8);G++){const X=.08+Math.random()*.84,H=f.getPointAt(X),J=f.getTangentAt(X),st=new b(-J.z,0,J.x).normalize(),at=Math.random()>.5?1:-1,ft=H.clone().add(st.clone().multiplyScalar(at*(4.55+Math.random()*.4)));r.add(Io(ft,1.5+Math.random()*1.2,.5+Math.random()*.3))}[{t:.09,side:-1,lines:["RÉCLAMEZ","VOTRE VILLE"]},{t:.36,side:1,lines:["ESPACE","PUBLICITAIRE"]},{t:.62,side:-1,lines:["MOBILIER","URBAIN"]},{t:.88,side:1,lines:["ZONAGE","RÉGULÉ"]}].forEach(G=>{const X=f.getPointAt(G.t),H=f.getTangentAt(G.t),J=new b(-H.z,0,H.x).normalize(),st=X.clone().add(J.clone().multiplyScalar(G.side*7.6)),at=Math.atan2(-J.x*G.side,-J.z*G.side),ft=Eg(st,at,G.lines);se.push(ft),r.add(ft),r.add(si(st,6.4,4)),mt(st.clone().add(J.clone().multiplyScalar(G.side*2.3)),.8),mt(st.clone().add(J.clone().multiplyScalar(G.side*2.8)),.7)});{const X=f.getPointAt(.33),H=f.getTangentAt(.33),J=new b(-H.z,0,H.x).normalize(),st=X.clone().add(J.clone().multiplyScalar(-11)),at=bg();at.position.copy(st),B.push({g:at,phase:0}),r.add(at),r.add(si(st,4.6,4.6));for(let Re=0;Re<4;Re++){const Qe=Re/4*Math.PI*2+.4,hi=st.clone().add(new b(Math.cos(Qe)*2.7,0,Math.sin(Qe)*2.7));r.add(Pa(hi,1)),Ot(hi.clone().add(new b(.6,0,0)),.8,Re)}r.add(Lo(st.clone().add(new b(-3.4,0,1.4)),1.3)),r.add(Lo(st.clone().add(new b(3.2,0,-1.2)),1.2));const ft=st.clone().add(new b(3.9,0,-3.4)),Ht=Ag(ft,Math.atan2(H.x,H.z)+Math.PI);j.push(Ht),r.add(Ht),r.add(si(ft,2.6,1.4))}{const X=f.getPointAt(.585),H=f.getTangentAt(.585),J=new b(-H.z,0,H.x).normalize(),st=X.clone().add(J.clone().multiplyScalar(-6.2)),at=Math.atan2(J.x,J.z),ft=Tg(st,at);nt.push({g:ft,phase:0}),r.add(ft),r.add(si(st,3,2.6)),r.add(Io(st.clone().add(new b(2.4,0,0)),1.6,.5));const Ht=Dg(st.clone().add(new b(1.5,0,1)));pt.push({g:Ht,phase:Math.random()*Math.PI*2}),r.add(Ht)}const it=[],ot=e?7:14,et=e?1:3;for(let G=0;G<ot;G++){const X=G<et,H=wg();X&&H.g.scale.setScalar(.72);const J=Math.random()>.5?1:-1,st=Math.random()>.5?1:-1;it.push({g:H.g,legL:H.legL,legR:H.legR,kneeL:H.kneeL,kneeR:H.kneeR,armL:H.armL,armR:H.armR,elbowL:H.elbowL,elbowR:H.elbowR,lean:H.lean,t:.02+Math.random()*.96,speed:(X?.009:.004+Math.random()*.005)*J,side:st,off:3+Math.random()*1.3,phase:H.phase,step:0}),r.add(H.g)}for(let G=0;G<(e?1:2);G++){const X=Ig(),H=Math.random()>.5?1:-1,J=Math.random()>.5?1:-1;dt.push({g:X,t:.08+Math.random()*.84,speed:(.006+Math.random()*.004)*H,side:J,off:3.4+Math.random()*.9,phase:Math.random()*Math.PI*2,step:0}),r.add(X)}for(let G=0;G<i(34);G++){const X=Math.random(),H=f.getPointAt(X),J=f.getTangentAt(X),st=new b(-J.z,0,J.x).normalize(),at=Math.random()>.5?1:-1,ft=H.clone().add(st.clone().multiplyScalar(at*(9+Math.random()*22)));Math.random()<.5?r.add(eg(ft,1+Math.random()*2.4)):r.add(ng(ft,.3+Math.random()*.9))}const It=[];for(let G=0;G<i(26);G++){const X=Math.random(),H=f.getPointAt(X),J=f.getTangentAt(X),st=new b(-J.z,0,J.x).normalize(),at=Math.random()>.5?1:-1,ft=H.clone().add(st.clone().multiplyScalar(at*(9+Math.random()*8))),Ht=ru(ft,.8+Math.random()*.8);It.push({g:Ht,phase:Math.random()*Math.PI*2}),r.add(Ht)}for(let G=0;G<i(60);G++){const X=Math.random(),H=f.getPointAt(X),J=f.getTangentAt(X),st=new b(-J.z,0,J.x).normalize(),at=Math.random()>.5?1:-1,ft=H.clone().add(st.clone().multiplyScalar(at*(5.8+Math.random()*3.4)));if(mt(ft,.5+Math.random()*.8),Math.random()<.35){const Ht=H.clone().add(st.clone().multiplyScalar(at*(6.2+Math.random()*1.6)));Ot(Ht,.7+Math.random()*.5,G*7%9)}}const Mt=[];for(let G=0;G<i(12);G++){const X=og(new b((Math.random()-.5)*130,30+Math.random()*20,Math.random()*440),1.4+Math.random()*2.6);Mt.push({g:X,speed:.5+Math.random()*.8,phase:Math.random()*Math.PI*2,y0:X.position.y,s0:X.scale.x}),r.add(X)}[{t:.12,side:1,lines:["Audit","d'abord"],tip:"Toute réorganisation commence par l'audit des acteurs du secteur."},{t:.5,side:-1,lines:["Zonage","du territoire"],tip:"Le zonage délimite les espaces publicitaires selon des normes."},{t:.88,side:1,lines:["Mise à jour","continue"],tip:"Un secteur en phase avec l'urbanisation se pérennise."}].forEach(G=>{const X=f.getPointAt(G.t),H=f.getTangentAt(G.t),J=new b(-H.z,0,H.x).normalize(),st=X.clone().add(J.clone().multiplyScalar(G.side*5.5)),at=new b().subVectors(X,st).normalize(),ft=ag(st,Math.atan2(at.x,at.z),G.lines);T.push({mesh:ft.sign,kind:"sign",tip:G.tip}),r.add(ft.group)});const jt=ig(e?180:420);r.add(jt);const ct=[];for(let G=0;G<i(26);G++){const X=Cg(),H=Math.random(),J=f.getPointAt(H),st=f.getTangentAt(H),at=new b(-st.z,0,st.x).normalize(),ft=Math.random()>.5?1:-1,Ht=J.x+at.x*ft*(2+Math.random()*7),Re=.4+Math.random()*4,Qe=J.z+at.z*ft*(2+Math.random()*7);X.position.set(Ht,Re,Qe),ct.push({g:X,x:Ht,y:Re,z:Qe,vx:(Math.random()-.5)*2.2,vz:-(.8+Math.random()*1.4),vy:-(.3+Math.random()*.4),spin:(Math.random()-.5)*4,phase:Math.random()*Math.PI*2}),r.add(X)}const wt=[];for(let G=0;G<i(8);G++){const X=sg();X.g.position.set(-60+Math.random()*120,9+Math.random()*8,40+Math.random()*120),wt.push({g:X.g,l:X.l,r:X.r,phase:Math.random()*Math.PI*2,speed:4+Math.random()*3,y0:X.g.position.y,z0:X.g.position.z}),r.add(X.g)}const zt=[];for(let G=0;G<i(7);G++){const X=Ra();zt.push({g:X.group,cone:X.cone,t:G/7,speed:.02+Math.random()*.014,phase:Math.random()*Math.PI*2}),r.add(X.group)}const Gt=[];for(let G=0;G<(e?1:2);G++){const X=Lg();Gt.push({g:X.group,cone:X.cone,t:.2+G*.5,speed:.014+Math.random()*.004,phase:Math.random()*Math.PI*2}),r.add(X.group)}const Et=zt.concat(Gt),Qt=new b,Wt=new b,le=new b,N=new b;let _t=performance.now()*.001,$=-1,Q=null,yt=1/0,St=0;function qt(G){$=G}function Ae(G,X){const H=performance.now()*.001,J=Math.min(.05,Math.max(.001,H-_t));_t=H;const st=.005+G*.98;ut+=(Pt-ut)*Math.min(1,J*2.2);const at=ut;c.uniforms.night.value=at,s.toneMappingExposure=an.lerp(s.toneMappingExposure,1.25+.32*at,Math.min(1,J*2)),R.color.copy(a.ambient).lerp(l.ambient,at),R.intensity=.75*(1-at)+.4*at,L.color.copy(a.hemiSky).lerp(l.hemiSky,at),L.groundColor.copy(a.hemiGround).lerp(l.hemiGround,at),L.intensity=.5*(1-at)+.45*at,_.color.copy(a.sun).lerp(l.sun,at),_.intensity=2.2*(1-at)+.3*at,at<.5!==_.castShadow&&(_.castShadow=at<.5),r.fog.color.copy(a.fog).lerp(l.fog,at),u.material.opacity=1-at,d.material.opacity=at;const ft=f.getPointAt(st),Ht=f.getTangentAt(st),Re=f.getPointAt(Math.min(st+.045,.999));le.set(-Ht.z,0,Ht.x).normalize();const Qe=Math.sin(H*.7)*.07,hi=Math.sin(H*.25)*.18;Qt.set(ft.x+le.x*hi,ft.y+3.45+Qe,ft.z+le.z*hi),Wt.set(Re.x,Re.y+2.7,Re.z);{let A=0,tt=1/0;const lt=st+.03;for(let xt=0;xt<I;xt++){const kt=.02+(xt+.5)/I*.94,At=Math.abs(kt-lt);At<tt&&(tt=At,A=xt)}const gt=an.clamp(1-tt/.08,0,1);if(gt>0){const xt=M[A].group.position,kt=gt*gt*(3-2*gt);Wt.lerp(new b(xt.x,xt.y+2.8,xt.z),kt*.85)}}o.up.set(0,1,0),o.lookAt(Wt);const Ys=Math.atan2(Ht.x,Ht.z),E=Ys-St;St=Ys;const O=an.clamp(E/Math.max(J,.001)*.09,-.08,.08);o.rotation.z=an.lerp(o.rotation.z,O,.06);const V=55,W=15.2;N.addScaledVector(Qt,V*J),N.addScaledVector(o.position,-V*J),N.multiplyScalar(Math.max(0,1-W*J)),o.position.addScaledVector(N,J),U.geometry.setDrawRange(0,Math.floor(P*G)),M.forEach((A,tt)=>{const lt=tt===X,gt=tt===$,xt=Math.abs(G-(.02+(tt+.5)/I*.94))<.06,kt=lt?1:gt?1.09:.86,At=gt?.22:lt?.15:xt?.05:0,ie=gt?.12:.08;A.group.scale.setScalar(an.lerp(A.group.scale.x,kt,ie)),A.light&&(A.light.intensity=an.lerp(A.light.intensity,At+at*.55,ie)),A.group.position.y=an.lerp(A.group.position.y,lt?.22:0,.06),A.beaconMat.emissiveIntensity=(.22+Math.sin(H*2.4+tt)*.1)*(1-at)+(1.3+Math.sin(H*2.4+tt)*.3)*at,A.frontMat.emissiveIntensity=an.lerp(A.frontMat.emissiveIntensity,at*.3,.06);const ue=o.position.x-A.group.position.x,he=o.position.z-A.group.position.z,He=Math.hypot(ue,he),ae=an.clamp(1-He/34,0,1),Ut=Math.atan2(ue,he);A.group.rotation.y=an.lerp(A.group.rotation.y,Ut,ae*.16)});for(const A of Et){A.t=(A.t+A.speed*J)%1;const tt=f.getPointAt(A.t),lt=f.getTangentAt(A.t);A.g.position.set(tt.x,.06+Math.sin(H*3+A.t*44)*.02,tt.z),A.g.rotation.y=Math.atan2(lt.x,lt.z),A.cone.material.opacity=.45+Math.sin(H*11+A.phase)*.15}for(const A of It)A.g.rotation.z=Math.sin(H*.9+A.phase)*.05,A.g.rotation.y+=3e-4;for(const A of Te)A.g.rotation.z=Math.sin(H*.6+A.phase)*.03;for(const A of Ye){const tt=Math.abs(Math.sin(H*2.2+A.phase))*.05;A.g.position.y=tt,A.g.rotation.z=Math.sin(H*2.2+A.phase)*.08,A.g.position.x=A.x0+Math.sin(H*.35+A.phase)*.4,A.g.position.z=A.z0+Math.cos(H*.3+A.phase)*.3}for(const A of it){A.t=(A.t+A.speed*J)%1,A.t<0&&(A.t+=1);const tt=f.getPointAt(A.t),lt=f.getTangentAt(A.t),gt=new b(-lt.z,0,lt.x).normalize();A.g.position.set(tt.x+gt.x*A.side*A.off,0,tt.z+gt.z*A.side*A.off),A.g.rotation.y=Math.atan2(lt.x,lt.z)+(A.side>0?0:Math.PI),A.step+=J*(6+Math.abs(A.speed)*90);const xt=Math.sin(A.step)*.5;A.legL.rotation.x=xt,A.legR.rotation.x=-xt,A.kneeL.rotation.x=Math.max(0,-xt)*.95,A.kneeR.rotation.x=Math.max(0,xt)*.95,A.armL.rotation.x=-xt*.8,A.armR.rotation.x=xt*.8,A.elbowL.rotation.x=Math.max(0,xt)*.9,A.elbowR.rotation.x=Math.max(0,-xt)*.9,A.lean.rotation.z=Math.sin(A.step)*.025,A.lean.rotation.x=.045+Math.abs(Math.sin(A.step))*.025,A.g.position.y=Math.abs(Math.sin(A.step))*.04}for(const A of te){const tt=.9+Math.sin(H*9+A.i*1.7)*.09;A.glow.material.opacity=(.08*(1-at)+.85*at)*tt,A.pool.material.opacity=(.1*(1-at)+.55*at)*tt}if(Q){const A=(H-Q.t0)/1.05;Q.sp.position.lerpVectors(Q.from,Q.to,Math.min(1,A)),Q.sp.material.opacity=Math.sin(Math.min(1,A)*Math.PI),A>=1&&(r.remove(Q.sp),Q.sp.material.dispose(),Q=null,yt=8+Math.random()*10)}else if(yt-=J,yt<=0){const A=new Hn(new An({map:Sn(0,"rgba(255,242,214,1)"),transparent:!0,blending:tn,depthWrite:!1,opacity:0}));A.scale.setScalar(2.4);const tt=new b(120+Math.random()*60,92+Math.random()*36,-330-Math.random()*130);A.position.copy(tt),r.add(A),Q={sp:A,t0:H,from:tt,to:tt.clone().add(new b(-78,-30,16))}}for(const A of wt){A.g.position.x+=A.speed*.02,A.g.position.y=A.y0+Math.sin(H*1.3+A.phase)*.8,A.g.position.z=A.z0+Math.sin(H*.6+A.phase)*3.5;const tt=Math.sin(H*9+A.phase)*.7;A.l.rotation.z=tt,A.r.rotation.z=-tt,A.g.rotation.z=.25+Math.sin(H*1.3+A.phase)*.12+Math.cos(H*.6+A.phase)*.08,A.g.position.x>80&&(A.g.position.x=-80,A.y0=8+Math.random()*9,A.z0=30+Math.random()*90,A.g.position.z=A.z0,A.g.position.y=A.y0)}jt.rotation.y=H*.05,jt.material.opacity=(.5+Math.sin(H*3)*.12)*(1-at*.7),jt.position.x=Math.sin(H*.12)*2.4,jt.position.z=Math.cos(H*.09)*1.6;for(const A of Mt){A.g.position.x+=A.speed*.02,A.g.position.y=A.y0+Math.sin(H*.22+A.phase)*.7;const tt=1+Math.sin(H*.3+A.phase)*.05;A.g.scale.set(A.s0*tt,A.s0*tt,A.s0*tt),A.g.position.x>150&&(A.g.position.x=-150)}for(const A of B){const tt=Math.sin(H*2.6+A.phase)*.5+1;A.g.userData.jet.scale.set(1,.7+.3*tt,1),A.g.userData.jet.rotation.z=Math.sin(H*3.1)*.06,A.g.userData.jet.rotation.x=Math.cos(H*2.7)*.05,A.g.userData.pool.rotation.z=H*.25;const lt=1+Math.sin(H*1.8+A.phase)*.03;A.g.userData.pool.scale.set(lt,lt,lt),A.g.userData.dish.rotation.z=Math.sin(H*1.4)*.03}for(const A of Z)A.g.userData.parasol.rotation.z=Math.sin(H*.9+A.phase)*.06,A.g.userData.parasol.rotation.x=Math.sin(H*.7+A.phase*1.3)*.05;for(const A of nt){const tt=A.g.userData.flag;tt.rotation.z=Math.sin(H*2.4+A.phase)*.28,tt.position.y=2.42+Math.sin(H*2.4+A.phase)*.04,A.g.userData.sign.material.emissiveIntensity=at*.75}for(let A=0;A<Rt.length;A++)Rt[A].material.emissiveIntensity=at*(.8+Math.sin(H*1.6+A*1.7)*.18);const F=at*.85;for(const A of Xt)A.userData.window.material.emissiveIntensity=F;for(const A of se)A.userData.face.material.emissiveIntensity=F;for(const A of j)A.userData.sign.material.emissiveIntensity=F;for(const A of Y)A.g.rotation.z=Math.sin(H*.7+A.phase)*.05;for(const A of dt){A.t=(A.t+A.speed*J)%1,A.t<0&&(A.t+=1);const tt=f.getPointAt(A.t),lt=f.getTangentAt(A.t),gt=new b(-lt.z,0,lt.x).normalize();A.g.position.set(tt.x+gt.x*A.side*A.off,Math.abs(Math.sin(A.step))*.03,tt.z+gt.z*A.side*A.off),A.g.rotation.y=Math.atan2(lt.x,lt.z)+(A.side>0?0:Math.PI),A.step+=J*14,A.g.userData.tail.rotation.z=Math.sin(H*7+A.phase)*.55}for(const A of pt){const tt=A.g.userData.balloons;for(let lt=0;lt<tt.length;lt++)tt[lt].position.y=1.2+Math.sin(lt*2.1)*.05+Math.sin(H*1.1+A.phase+lt*1.7)*.12,tt[lt].position.x=(lt-1)*.22+Math.sin(H*.8+lt*2.3)*.04}for(const A of K)A.g.rotation.z=Math.sin(H*.7+A.phase)*.03;for(const A of rt)A.g.rotation.z=Math.sin(H*.9+A.phase)*.06;for(const A of ct)if(A.x+=(Math.sin(H*.5+A.phase)*.6+A.vx)*J,A.z+=A.vz*J,A.y+=A.vy*J,A.g.rotation.x+=A.spin*J,A.g.rotation.z+=A.spin*.6*J,A.g.position.set(A.x,A.y,A.z),A.y<.18){const tt=Math.min(.97,Math.max(.02,st+(Math.random()-.35)*.12)),lt=f.getPointAt(tt),gt=f.getTangentAt(tt),xt=new b(-gt.z,0,gt.x).normalize(),kt=Math.random()>.5?1:-1;A.x=lt.x+xt.x*kt*(2+Math.random()*7),A.z=lt.z+xt.z*kt*(2+Math.random()*7),A.y=1.5+Math.random()*3,A.phase=Math.random()*Math.PI*2}}const Ue=new jm,oe=new Ct;function en(G,X){oe.set(G,X),Ue.setFromCamera(oe,o);const H=Ue.intersectObjects(T.map(st=>st.mesh),!1);if(!H.length)return null;const J=H[0];return J.distance>45?null:T[T.findIndex(st=>st.mesh===J.object)]}function fn(){const G=window.innerWidth,X=window.innerHeight;o.aspect=G/X,o.updateProjectionMatrix(),s.setSize(G,X)}function Xs(){return o.position.clone()}function qs(){s.render(r,o)}return{render:qs,resize:fn,update:Ae,pick:en,getCameraPos:Xs,setHover:qt,setNight:G=>{Pt=G?1:0}}}const Do={module:"Module 1",title:"Formation sur la panneautique.",subtitle:"Domaine public :"},Pr=[{name:"Chapitre 1",label:"Introduction :"},{name:"Chapitre 2",label:"Réorganisation & Réaménagement du secteur :"},{name:"Chapitre 3",label:"Évaluation du système d'exploitation :"},{name:"Chapitre 4",label:"Mise à jour :"},{name:"Questionnaire",label:"Module 1 :"}],ke=[{id:"presentation",chapter:0,num:"01",kicker:"Chapitre 1 · Présentation :",title:"La panneautique, un véritable corps de métier.",bullets:["Ensemble des moyens et techniques d'installation et de gestion des panneaux publicitaires","Une étude pluridisciplinaire"],content:[{t:"Un métier à part entière :",b:"La panneautique, en tant qu'ensemble des moyens et techniques d'installation et de gestion des panneaux publicitaires, est un véritable corps de métier dont l'étude est pluridisciplinaire."},{t:"Ce que vous allez parcourir :",b:"L'importance du panneau publicitaire, le constat général du secteur, puis la réorganisation complète en sept étapes, l'évaluation du système et sa mise à jour. Un questionnaire de douze questions clôture le module."}]},{id:"lecon1-importance",chapter:0,num:"02",kicker:"Chapitre 1 · Leçon 1 :",title:"Le panneau publicitaire et son importance socio-économique.",bullets:["Booste la concurrence entre les entreprises","Propulse l'économie : compétitivité des acteurs","Vecteur de publicité : stimule la consommation","Participe à l'embellissement des villes"],content:[{t:"Un moteur pour la concurrence :",b:"L'exploitation des panneaux publicitaires est une activité qui booste la concurrence entre les entreprises. Elle propulse l'économie grâce à l'accroissement et à l'amélioration de la compétitivité des différents acteurs de la vie économique d'un pays."},{t:"Le support de publicité par excellence :",b:"Vecteur de publicité, le panneau stimule et encourage la consommation. Lorsque l'activité est bien réglementée et bien encadrée, les normes d'exercice garantissent l'équité dans la gestion du secteur. On ne paie pas pour regarder un panneau : c'est le support publicitaire par excellence."},{t:"Une part du décor urbain :",b:"Par leurs aménagements, les panneaux publicitaires contribuent à l'embellissement des villes. Le choix des supports ne doit donc plus être motivé seulement par leur design, mais aussi par un besoin d'esthétique, pour un environnement et un cadre de vie plus agréables à la vue."}]},{id:"lecon2-constat",chapter:0,num:"03",kicker:"Chapitre 1 · Leçon 2 :",title:"Constat général.",bullets:["Pléthore de panneaux, parfois dans les capitales","Pollution visuelle, insalubrité, insécurité","Secteur mal organisé, ou pas encadré du tout","Supports délabrés, absence de normes"],content:[{t:"Des villes saturées :",b:"Dans beaucoup de villes à travers le monde — l'Afrique en est un bel exemple —, il est fréquent de constater, parfois dans des capitales, des cas de pléthore de panneaux publicitaires, cause de pollution visuelle, d'insalubrité et d'insécurité pour les personnes et les biens."},{t:"Une source : l'anarchie",b:"Un secteur d'exploitation mal organisé, mal encadré, ou pas encadré du tout, où règnent l'anarchie et le désordre, en est la source. L'état délabré et obsolète des supports, l'absence de normes et de réglementations rendent le secteur contre-productif et dégradent l'environnement."},{t:"Des mesures nécessaires :",b:"Il importe donc, pour le rayonnement du secteur et pour sa contribution effective au développement socio-économique des villes, que des mesures adéquates soient prises."}]},{id:"audit",chapter:1,num:"04",kicker:"Chapitre 2 · Étape 1 · Audit :",title:"Audit de la gestion en cours.",bullets:["Liste exhaustive de tous les acteurs du secteur","Examen du mécanisme d'attribution des supports","Examen du cahier des charges"],content:[{t:"Étape 3.1 :",b:"Pour que l'activité d'exploitation des panneaux publicitaires participe au rayonnement d'une ville (ou d'un pays), il faut faire un audit de la gestion en cours."},{t:"En quoi consiste-t-il ?",b:"En l'établissement de la liste exhaustive de tous les acteurs — entreprise ou personne exploitant des panneaux à des fins publicitaires — et en l'examen du mécanisme d'attribution des supports et du cahier des charges."}]},{id:"etat-lieux",chapter:1,num:"05",kicker:"Chapitre 2 · Étape 2 · État des lieux :",title:"État des lieux du parc existant.",bullets:["Relevé GPS détaillé et précis de tous les panneaux","Plan piqué géolocalisable des supports"],content:[{t:"Étape 3.2 :",b:"Faire le relevé (GPS) détaillé et précis de l'ensemble des panneaux publicitaires présents."},{t:"Un plan géolocalisable :",b:"Établir le plan piqué géolocalisable de ces supports : chaque panneau est localisé avec précision sur le territoire."}]},{id:"zonage",chapter:1,num:"06",kicker:"Chapitre 2 · Étape 3 · Zonage :",title:"Zonage du territoire.",bullets:["Délimitation selon des normes spécifiques du territoire","Des supports facteurs d'embellissement et de modernité","Paysage publicitaire harmonieux et équilibré","Grilles tarifaires adaptées aux réalités locales"],content:[{t:"Étape 3.3 :",b:"Pour un réaménagement optimal du plan d'implantation des panneaux publicitaires, il faut effectuer des délimitations suivant des normes spécifiques du territoire et proposer des supports facteurs d'embellissement et symboles de modernité."},{t:"Le but du zonage :",b:"Créer les conditions d'un développement harmonieux et équilibré du paysage de l'affichage publicitaire, ainsi que l'établissement de grilles tarifaires en adéquation avec les réalités économiques des villes. Il consiste donc à délimiter des espaces à cette fin."}]},{id:"constitution-lots",chapter:1,num:"07",kicker:"Chapitre 2 · Étape 4 · Constitution des lots :",title:"Constitution des lots.",bullets:["Le « Mobilier Urbain de Publicité » : des objets d'embellissement","Des lots pour les appels d'offres","Équilibre des espaces et des types de supports"],content:[{t:"Étape 4 :",b:"Le terme « Mobilier Urbain de Publicité » s'inscrit dans un contexte où les panneaux publicitaires ne sont plus seulement des supports publicitaires, mais de véritables objets (ou meubles) d'embellissement et de décoration des villes."},{t:"Vers les appels d'offres :",b:"Après études et validation des supports devant être pris en compte dans le cadre du réaménagement, on procède à la constitution des lots devant faire l'objet d'appels d'offres pour la mise en concession des différents espaces publicitaires."},{t:"Un équilibre garanti :",b:"La constitution des lots est faite de manière à garantir l'équilibre des espaces et celui en matière de type de support des différentes régies publicitaires."}]},{id:"mise-concession",chapter:1,num:"08",kicker:"Chapitre 2 · Étape 5 · Mise en concession :",title:"Mise en concession des espaces.",bullets:["Une technique variable selon les pays","Fonction des réalités économiques et législatives","À traiter au cas par cas"],content:[{t:"Étape 5 :",b:"La technique de mise en concession des espaces publicitaires est variable. Elle est fonction des réalités économiques, politico-administratives et de la législation en vigueur dans chaque pays."},{t:"À retenir :",b:"NB : il faut partir d'exemples précis et traiter le sujet au cas par cas."}]},{id:"attribution",chapter:1,num:"09",kicker:"Chapitre 2 · Étape 6 · Attribution :",title:"Attribution des espaces.",bullets:["Sur la base du cahier des charges","Contenu dans le dossier d'appel d'offres"],content:[{t:"Étape 6 :",b:"L'attribution des espaces aux régies publicitaires est faite sur la base du cahier des charges contenu dans le dossier d'appel d'offres."}]},{id:"gestion",chapter:1,num:"10",kicker:"Chapitre 2 · Étape 7 · Gestion :",title:"Gestion des régies publicitaires.",bullets:["Collectivités locales ou Gouvernement","Selon les textes en vigueur dans chaque pays","Transparence, professionnalisme, efficience"],content:[{t:"Étape 7 :",b:"La gestion des régies publicitaires est faite, dans certains pays, par les collectivités locales. Dans d'autres, elle est du ressort du Gouvernement par l'intermédiaire du Ministère de la Communication, etc."},{t:"L'essentiel :",b:"Plus généralement, c'est selon les textes et dispositions en vigueur dans chaque pays. L'essentiel est que la transparence, le professionnalisme et l'efficience soient rigoureusement observés."}]},{id:"evaluation",chapter:2,num:"11",kicker:"Chapitre 3 · Évaluation :",title:"Évaluer le système d'exploitation du Mobilier Urbain de Publicité.",bullets:["Évaluer tout le processus, de l'audit à la gestion","Un mécanisme scientifiquement soutenable et autonome","Prévenir les dérapages, sécuriser sur le long terme"],content:[{t:"Chapitre 3 :",b:"Pour garantir un développement harmonieux du secteur d'exploitation des panneaux publicitaires / Mobilier Urbain de Publicité, il faut prévoir, dans les réformes, un mécanisme d'évaluation de l'ensemble du processus, depuis l'audit jusqu'à la gestion des régies publicitaires."},{t:"Un pilotage autonome :",b:"Le mécanisme d'évaluation doit être scientifiquement soutenable, avec une autonomie certaine dans son pilotage. L'évaluation permet de prévenir les risques de dérapage et de sécuriser les intérêts des différents acteurs du secteur et des populations, à travers leur cadre de vie, sur le long terme."}]},{id:"mise-a-jour",chapter:3,num:"12",kicker:"Chapitre 4 · Mise à jour :",title:"Pérenniser et faire évoluer le secteur.",bullets:["Pérenniser les acquis de développement","Le rayonnement des villes par les supports","Une évolution en phase avec l'urbanisation"],content:[{t:"Chapitre 4 :",b:"La mise à jour du secteur d'exploitation des panneaux publicitaires / Mobilier Urbain de Publicité est importante pour pérenniser les acquis de développement de l'activité."},{t:"Pourquoi ?",b:"Elle est importante pour le rayonnement des villes par l'exploitation des supports de publicité et favorisera l'essor de l'activité en adéquation avec l'urbanisation."},{t:"Concrètement :",b:"Elle consiste à s'assurer que le secteur, dans son évolution, soit en phase avec l'évolution démographique et le développement infrastructurel des villes."}]},{id:"quiz",chapter:4,num:"13",kicker:"Questionnaire · Module 1 :",title:"Douze questions pour valider le module.",bullets:["5 définitions","7 questions de compréhension","Testez vos acquis en fin de parcours"],content:[]}],ss=[{q:"Que désigne la panneautique ?",options:["L'ensemble des moyens et techniques d'installation et de gestion des panneaux publicitaires","La seule vente d'espaces publicitaires","La fabrication du mobilier urbain","La régulation des réseaux sociaux"],correct:0,explain:"La panneautique est l'ensemble des moyens et techniques d'installation et de gestion des panneaux publicitaires — un corps de métier pluridisciplinaire."},{q:"Quel est le but du zonage ?",options:["Multiplier les panneaux pour maximiser les recettes","Créer les conditions d'un développement harmonieux et équilibré du paysage de l'affichage publicitaire","Supprimer toute publicité des villes","Uniformiser tous les panneaux du pays"],correct:1,explain:"Le zonage délimite des espaces pour un paysage publicitaire harmonieux et équilibré, et établit des grilles tarifaires adaptées aux réalités économiques."},{q:"Que désigne le « Mobilier Urbain de Publicité » ?",options:["Les panneaux posés sur le mobilier des cafés","La publicité diffusée à la télévision urbaine","Des panneaux devenus de véritables objets d'embellissement et de décoration des villes","Les panneaux strictement destinés à la location"],correct:2,explain:"Le Mobilier Urbain de Publicité : des panneaux qui ne sont plus de simples supports, mais de véritables meubles d'embellissement et de décoration des villes."},{q:"Qu'est-ce qu'une régie publicitaire ?",options:["L'organisme autorisé à gérer et exploiter des espaces publicitaires","L'autorité qui interdit la publicité","L'entreprise qui imprime les affiches","L'organisme de contrôle des réseaux sociaux"],correct:0,explain:"Les régies publicitaires sont les exploitants auxquels les espaces sont attribués sur la base du cahier des charges contenu dans le dossier d'appel d'offres."},{q:"Qu'est-ce que la pollution visuelle, dans le cadre de l'exploitation des panneaux ?",options:["Les panneaux trop colorés","La publicité lumineuse la nuit","Le bruit produit par les panneaux numériques","Une pléthore de panneaux mal organisés qui dégrade le cadre de vie"],correct:3,explain:"Une pléthore de panneaux issus d'un secteur mal organisé ou non encadré est cause de pollution visuelle, d'insalubrité et d'insécurité."},{q:"En quoi consiste une réorganisation du secteur d'exploitation des panneaux publicitaires ?",options:["À augmenter le nombre d'exploitants","À privatiser tous les supports","À remettre de l'ordre : audit, état des lieux, zonage, lots, concession, attribution, gestion","À supprimer le cahier des charges"],correct:2,explain:"La réorganisation suit sept étapes : audit, état des lieux, zonage, constitution des lots, mise en concession, attribution des espaces et gestion des régies."},{q:"En quoi consiste le réaménagement de l'espace publicitaire d'une ville ?",options:["Délimiter des zones et proposer des supports facteurs d'embellissement et de modernité","Remplacer tous les panneaux par des écrans numériques","Retirer les panneaux des centres-villes","Uniformiser les tarifs à l'échelle nationale"],correct:0,explain:"Le réaménagement repose sur le zonage : délimiter des espaces selon des normes et proposer des supports qui embellissent et modernisent le cadre de vie."},{q:"Comment prévenir la pollution visuelle due à l'exploitation des panneaux ?",options:["En interdisant toute nouvelle publicité","En augmentant le nombre de panneaux","En confiant le secteur à une seule régie","En réglementant, auditant et zonant le secteur d'exploitation"],correct:3,explain:"Un secteur réglementé et encadré (audit, état des lieux, zonage, normes) prévient la pléthore de panneaux à l'origine de la pollution visuelle."},{q:"Comment s'assurer d'une bonne rentabilité et de la pérennité du secteur ?",options:["En baissant tous les tarifs","Par la transparence, le professionnalisme, l'efficience et une mise à jour régulière","En vendant les panneaux aux enchères chaque année","En supprimant l'évaluation"],correct:1,explain:"Transparence, professionnalisme et efficience sont essentiels ; l'évaluation et la mise à jour régulière pérennisent les acquis du secteur."},{q:"Peut-on installer un panneau publicitaire n'importe où ? Pourquoi ?",options:["Oui, la liberté d'entreprendre le permet","Oui, sauf dans les capitales","Non, l'implantation suit des normes, un zonage et des délimitations","Non, uniquement sur les autoroutes"],correct:2,explain:"L'implantation suit un zonage et des délimitations selon des normes spécifiques du territoire, pour un développement harmonieux et un cadre de vie agréable."},{q:"Quelle est l'importance du panneau publicitaire dans une ville ?",options:["Il booste la concurrence, l'économie et embellit le cadre de vie","Il ne sert qu'à décorer","Il remplace les marchés publics","Il est surtout un obstacle à la circulation"],correct:0,explain:"Il booste la concurrence entre entreprises, propulse l'économie et, bien aménagé, contribue à l'embellissement des villes."},{q:"N'importe qui peut-il exercer l'activité d'exploitation de panneaux publicitaires ?",options:["Oui, c'est totalement libre","Oui, moyennant une simple taxe","Non, seuls les ministères peuvent exploiter","Non : acteurs identifiés, appels d'offres et gestion encadrée"],correct:3,explain:"Le secteur est encadré : audit des acteurs, appels d'offres, cahier des charges, concession et gestion selon les textes en vigueur."}],fe=n=>document.querySelector(n);function Ng(){const n={topbar:fe("#ui-topbar"),chapter:fe("#ui-chapter"),progressFill:fe("#ui-progress-fill"),dots:fe("#ui-dots"),hint:fe("#ui-hint"),clickHint:fe("#ui-click-hint"),title:fe("#ui-title"),card:fe("#ui-card"),cardKicker:fe("#ui-card .card-kicker"),cardTitle:fe("#ui-card .card-title"),cardBody:fe("#ui-card .card-body"),quiz:fe("#ui-quiz"),quizScore:fe("#quiz-score"),quizList:fe("#quiz-list"),quizFill:fe("#quiz-progress-fill"),quizResult:fe("#quiz-result"),resultTitle:fe("#quiz-result .result-title"),resultText:fe("#quiz-result .result-text"),reader:fe("#ui-reader"),readerKicker:fe("#ui-reader .reader-kicker"),readerTitle:fe("#ui-reader .reader-title"),readerBody:fe("#ui-reader .reader-body"),readerCount:fe("#reader-count"),readerPrev:fe("#reader-prev"),readerNext:fe("#reader-next"),readerClose:fe("#reader-close"),toast:fe("#ui-toast"),cardOpen:fe("#card-open")};ke.forEach((S,x)=>{const y=document.createElement("span");y.className="dot"+(x===0?" active":""),y.dataset.index=x,n.dots.appendChild(y)});const t={activeIndex:-1,quizAnswered:new Set,score:0,started:!1,readerOpen:!1,readerIndex:-1};let e=null,i=null;function s(S){n.progressFill.style.width=(S*100).toFixed(2)+"%"}function r(S){const x=Pr[S];n.chapter.textContent=x?`${x.name} — ${x.label}`:""}function o(S,x){if(S===t.activeIndex)return;t.activeIndex=S;const y=ke[S];document.querySelectorAll(".dot").forEach((P,R)=>{P.classList.toggle("active",R===S)});const U=y.id==="quiz";n.card.classList.toggle("show",!U&&S!==-1),n.quiz.classList.toggle("show",U),U||(n.cardKicker.textContent=y.kicker,n.cardTitle.textContent=y.title,n.cardBody.innerHTML=`<p class="card-note">Leçon prête à lire : ouvrez la fenêtre dédiée pour parcourir l'étape en entier.</p>`),r(y.chapter)}function a(S){S>.015&&(t.started=!0),n.title.classList.toggle("hide",t.started)}function l(S,x){s(S),o(x),a(S);const y=n.quiz.classList.contains("show");n.clickHint.classList.toggle("visible",x>=0&&!y&&!t.readerOpen)}function c(S){t.readerIndex=S,t.readerOpen=!0;const x=ke[S];if(n.readerKicker.textContent=x.kicker,n.readerTitle.textContent=x.title,n.readerBody.innerHTML="",x.id==="quiz"){const y=document.createElement("ul");y.className="reader-bullets",x.bullets.forEach(P=>{const R=document.createElement("li");R.textContent=P,y.appendChild(R)}),n.readerBody.appendChild(y);const U=document.createElement("button");U.className="reader-quiz-btn",U.textContent="Lancer le questionnaire",U.addEventListener("click",u),n.readerBody.appendChild(U)}else x.content.forEach(y=>{const U=document.createElement("p"),P=document.createElement("span");P.className="body-t",P.textContent=y.t,U.appendChild(P),U.appendChild(document.createTextNode(y.b)),n.readerBody.appendChild(U)});n.readerCount.textContent=`${String(S+1).padStart(2,"0")} / ${String(ke.length).padStart(2,"0")}`,n.title.classList.add("hide"),n.reader.classList.add("show"),e&&e(!0)}function u(){t.readerOpen&&(t.readerOpen=!1,n.reader.classList.remove("show"),e&&e(!1))}function d(S){if(!t.readerOpen)return;const x=Math.max(0,Math.min(ke.length-1,t.readerIndex+S));x!==t.readerIndex&&c(x)}n.readerClose.addEventListener("click",u),n.readerPrev.addEventListener("click",()=>d(-1)),n.readerNext.addEventListener("click",()=>d(1)),n.reader.addEventListener("click",S=>{S.target===n.reader&&u()}),n.cardOpen.addEventListener("click",()=>{t.activeIndex>=0&&c(t.activeIndex)});function h(S){n.toast.textContent=S,n.toast.classList.add("show"),clearTimeout(i),i=setTimeout(()=>n.toast.classList.remove("show"),4600)}au(t,n);function p(){return n.quiz.classList.contains("show")}function f(S){if(!p())return;const x=n.quizList.querySelectorAll(".quiz-card");for(const y of x){if(y.classList.contains("done"))continue;const U=y.querySelectorAll(".quiz-opt");S<U.length&&U[S].click();return}}const v=document.querySelectorAll(".tsize-btn");function g(S){const x=document.documentElement;x.classList.toggle("ts-sm",S===0),x.classList.toggle("ts-lg",S===2),v.forEach(y=>{const U=Number(y.dataset.tsize)===S;y.classList.toggle("active",U),y.setAttribute("aria-pressed",String(U))});try{localStorage.setItem("panneau-tsize",String(S))}catch{}}let m=1;try{const S=Number(localStorage.getItem("panneau-tsize"));S>=0&&S<=2&&(m=S)}catch{}return g(m),v.forEach(S=>S.addEventListener("click",()=>g(Number(S.dataset.tsize)))),{updateGlobal:l,el:n,openReader:c,closeReader:u,readerNav:d,showToast:h,isReaderOpen:()=>t.readerOpen,quizOpen:p,answerQuiz:f,setReaderListener:S=>{e=S}}}function au(n,t){const e=t.quizList;e.innerHTML="",ss.forEach((i,s)=>{const r=document.createElement("div");r.className="quiz-card",r.innerHTML=`
      <div class="quiz-num">Question ${String(s+1).padStart(2,"0")}</div>
      <div class="quiz-q"></div>
      <div class="quiz-opts"></div>
      <div class="quiz-explain"></div>
    `,r.querySelector(".quiz-q").textContent=i.q;const o=r.querySelector(".quiz-opts");i.options.forEach((a,l)=>{const c=document.createElement("button");c.className="quiz-opt",c.innerHTML=`<span class="opt-letter">${String.fromCharCode(65+l)}.</span> <span class="opt-text"></span>`,c.querySelector(".opt-text").textContent=a,c.addEventListener("click",()=>{if(n.quizAnswered.has(s))return;n.quizAnswered.add(s);const u=l===i.correct;o.querySelectorAll(".quiz-opt").forEach((h,p)=>{p===i.correct?h.classList.add("correct"):p===l?h.classList.add("wrong"):h.classList.add("dim")}),u&&(n.score++,document.querySelector("#quiz-score").textContent=n.score);const d=r.querySelector(".quiz-explain");d.textContent=i.explain,d.classList.add("show"),r.classList.add("done",u?"correct-q":"wrong-q"),t.quizFill.style.width=(n.quizAnswered.size/ss.length*100).toFixed(2)+"%",n.quizAnswered.size===ss.length&&Fg(n,t)}),o.appendChild(c)}),e.appendChild(r)})}function Fg(n,t){const e=Math.round(n.score/ss.length*100);let i;e>=90?i="Excellent ! Vous maîtrisez le module sur le bout des doigts.":e>=70?i="Très bien ! Quelques points à consolider, mais la base est solide.":e>=50?i="Bien. Relisez les leçons indiquées pour consolider vos acquis.":i="Le module mérite une seconde lecture : remontez le parcours et revivez les étapes.",t.resultTitle.textContent=e>=70?"Formation validée.":"Formation à revoir.";const s=ss.length-n.score;t.resultText.innerHTML=`Score : <strong>${n.score} / ${ss.length}</strong> — ${i}<br><span class="result-breakdown">${n.score} bonne${n.score>1?"s":""} réponse${n.score>1?"s":""} · ${s} à revoir</span>`,t.quizResult.classList.remove("hide"),document.querySelector("#quiz-retry").addEventListener("click",()=>{n.quizAnswered.clear(),n.score=0,document.querySelector("#quiz-score").textContent=0,t.quizFill.style.width="0%",t.quizResult.classList.add("hide"),au(n,t)}),document.querySelector("#quiz-restart").addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})})}const Le={sky0:"#f6edd8",sky1:"#f2e6ca",sky2:"#eee0bf",sky3:"#eadab4",sky4:"#e6d3a6",sky5:"#e2cc9a",asphalt0:"#b39a6e",asphalt1:"#c4ab7e",asphalt2:"#d0b98c",bronze:"#9a8157",terracotta:"#c08a68",amber:"#cfa574"},Cn=Math.PI*2;function De(n,t,e,i,s,r){n.beginPath(),n.moveTo(t+r,e),n.arcTo(t+i,e,t+i,e+s,r),n.arcTo(t+i,e+s,t,e+s,r),n.arcTo(t,e+s,t,e,r),n.arcTo(t,e,t+i,e,r),n.closePath()}function be(n,t,e,i,s,r){n.font=s,n.textAlign="center",n.fillStyle=r,n.fillText(t,e,i)}function Og(n,t,e){const i=n.createLinearGradient(0,0,0,e);i.addColorStop(0,Le.sky0),i.addColorStop(.3,Le.sky1),i.addColorStop(.58,Le.sky2),i.addColorStop(.78,Le.sky3),i.addColorStop(.9,Le.sky4),i.addColorStop(1,Le.sky5),n.fillStyle=i,n.fillRect(0,0,t,e);const s=n.createRadialGradient(t/2,e*.6,10,t/2,e*.6,t*.72);s.addColorStop(0,"rgba(240,196,126,0.5)"),s.addColorStop(.5,"rgba(238,184,118,0.18)"),s.addColorStop(1,"rgba(238,184,118,0)"),n.fillStyle=s,n.fillRect(0,0,t,e)}function Uo(n,t,e,{minH:i,maxH:s,alpha:r,body:o,win:a,density:l,tall:c=.14}){let u=-12;for(;u<t+12;){const d=22+Math.random()*52,h=i+Math.random()*(s-i);n.fillStyle=o,n.globalAlpha=r,n.fillRect(u,e-h,d,h),Math.random()<c&&(n.fillRect(u+d/2-1,e-h-12,2,12),Math.random()<.5&&(n.fillStyle="rgba(196,138,104,0.85)"),n.fillRect(u+d/2-1,e-h-12,2,2));const p=Math.floor(d/14);for(let f=0;f<p;f++)for(let v=0;v<Math.floor(h/17);v++)if(Math.random()<l){const g=u+5+f*14,m=e-h+7+v*17;n.fillStyle=a,n.globalAlpha=r*(.4+Math.random()*.6),n.fillRect(g,m,4.5,6.5),Math.random()<.28&&(n.fillStyle="rgba(170,130,80,0.45)",n.fillRect(g-1.5,m-1.5,7.5,9.5))}n.globalAlpha=1,u+=d+4+Math.random()*9}}function Ui(n,t,e){const i=e*.6;return Og(n,t,e),Uo(n,t,i,{minH:34,maxH:92,alpha:.45,body:"#d6c095",win:"#8f7a4e",density:.3}),Uo(n,t,i,{minH:20,maxH:62,alpha:.6,body:"#c9b184",win:"#7a663c",density:.5}),Uo(n,t,i,{minH:13,maxH:44,alpha:.85,body:"#bda375",win:"#665430",density:.68}),zg(n,t,i),i}function zg(n,t,e){const i=n.canvas.height,s=t/2,r=n.createLinearGradient(0,e,0,i);r.addColorStop(0,Le.asphalt0),r.addColorStop(.5,Le.asphalt1),r.addColorStop(1,Le.asphalt2),n.fillStyle=r,n.beginPath(),n.moveTo(s-1,e),n.lineTo(-40,i+20),n.lineTo(t+40,i+20),n.lineTo(s+1,e),n.closePath(),n.fill();const o=n.createRadialGradient(t/2,e+(i-e)*.38,6,t/2,e+(i-e)*.38,t*.24);o.addColorStop(0,"rgba(160,120,60,0.18)"),o.addColorStop(1,"rgba(160,120,60,0)"),n.fillStyle=o,n.fillRect(0,e,t,i-e),n.strokeStyle="rgba(90,70,40,0.55)",n.lineWidth=2,n.setLineDash([16,30]),n.beginPath(),n.moveTo(s,e+2),n.lineTo(s,i+20),n.stroke(),n.setLineDash([]),n.strokeStyle="rgba(90,70,40,0.25)",n.lineWidth=3;for(const a of[-1,1])n.beginPath(),n.moveTo(s+a*1.2,e+2),n.lineTo(t/2+a*t*.48,i+10),n.stroke()}function ai(n,t,e,i,s){n.save(),n.translate(t,e),n.rotate(s||0),n.globalAlpha=.34,n.fillStyle="#000",n.beginPath(),n.ellipse(0,0,62*i,10*i,0,0,Cn),n.fill(),n.globalAlpha=1;const r=n.createLinearGradient(-46*i,0,-38*i,0);r.addColorStop(0,"#6b5230"),r.addColorStop(1,"#8a6f45"),n.fillStyle=r,n.fillRect(-46*i,-80*i,9*i,80*i),n.fillRect(37*i,-80*i,9*i,80*i);const o=134*i,a=98*i,l=-o/2,c=-186*i;De(n,l,c,o,a,7*i),n.fillStyle="#f7eeda",n.fill(),n.lineWidth=5*i,n.strokeStyle=Le.bronze,n.stroke();const u=n.createLinearGradient(0,c,0,c+a);u.addColorStop(0,"#fdf8ec"),u.addColorStop(1,"#f1e6cb"),De(n,l+7*i,c+7*i,o-14*i,a-14*i,5*i),n.fillStyle=u,n.fill(),n.fillStyle=Le.terracotta,n.fillRect(l+7*i,c+7*i,o-14*i,5*i),n.strokeStyle="rgba(90,70,40,0.3)",n.lineWidth=1.5*i,De(n,l+13*i,c+15*i,o-26*i,a-26*i,4*i),n.stroke(),be(n,"PANNEAUTIQUE · DOMAINE PUBLIC",0,c+34*i,`600 ${Math.max(7,9*i)}px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif`,"#7a5f38"),be(n,"PUBLICITÉ & AFFICHAGE",0,c+60*i,`700 ${Math.max(10,15*i)}px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif`,"#3a2e1f"),be(n,"RÈGLES · ZONES · CONCESSIONS",0,c+80*i,`700 ${Math.max(6,8*i)}px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif`,"#b3825e"),n.fillStyle=Le.amber,n.shadowColor=Le.amber,n.shadowBlur=16*i,n.beginPath(),n.arc(0,c-6*i,3*i,0,Cn),n.fill(),n.shadowBlur=0;const d=n.createRadialGradient(0,-70*i,4,0,-70*i,48*i);d.addColorStop(0,"rgba(232,163,92,0.2)"),d.addColorStop(1,"rgba(232,163,92,0)"),n.fillStyle=d,n.fillRect(-64*i,-124*i,128*i,64*i),n.restore()}function Bg(n,t,e,i,s){n.save(),n.translate(t,e),n.strokeStyle="#6b5230",n.lineCap="round",n.lineWidth=Math.max(3,i*.035),n.beginPath(),n.moveTo(0,0),n.quadraticCurveTo(10,-i*.5,5,-i*.94),n.stroke(),n.fillStyle="#5f7a4a";for(let r=0;r<6;r++){const o=-Math.PI*.95+r/5*Math.PI*.62;n.beginPath(),n.ellipse(Math.cos(o)*i*.34,-i*.97+Math.sin(o)*i*.1,i*.3,i*.05,o-Math.PI/2,0,Cn),n.fill()}n.restore()}function Ws(n,t,e,i){const s=n.canvas.width,r=n.canvas.height;n.fillStyle="rgba(253,250,242,0.9)",n.fillRect(0,e,s,r-e),n.fillStyle="rgba(138,111,69,0.35)",n.fillRect(0,e,s,2),be(n,t,s/2,e+i*1.45,`700 ${i}px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif`,"#7a5f38")}function cn(n,t,e,i){const s=n.createRadialGradient(t/2,i,4,t/2,i,e*.6);s.addColorStop(0,"rgba(240,200,140,0.2)"),s.addColorStop(1,"rgba(240,200,140,0)"),n.fillStyle=s,n.fillRect(0,0,t,e);const r=n.createRadialGradient(t/2,e*.45,t*.2,t/2,e*.5,t*.74);r.addColorStop(0,"rgba(0,0,0,0)"),r.addColorStop(1,"rgba(140,115,75,0.3)"),n.fillStyle=r,n.fillRect(0,0,t,e);const o=n.createLinearGradient(0,0,0,e*.42);o.addColorStop(0,"rgba(120,95,55,0.14)"),o.addColorStop(1,"rgba(120,95,55,0)"),n.fillStyle=o,n.fillRect(0,0,t,e*.42),n.globalAlpha=.055;for(let a=0;a<420;a++)n.fillStyle=Math.random()>.5?"#fff":"#000",n.fillRect(Math.random()*t,Math.random()*e,1,1);n.globalAlpha=1}function Ja(n,t,e){const i=n.createLinearGradient(0,0,0,e);i.addColorStop(0,"#f3ead4"),i.addColorStop(.7,"#e6d8ba"),i.addColorStop(1,"#d9c8a2"),n.fillStyle=i,n.fillRect(0,0,t,e),n.fillStyle="rgba(120,95,55,0.18)";for(let c=0;c<5;c++)n.fillRect(t*(.04+c*.2),e*.05,t*.14,e*.44);const s=t*.6,r=e*.1,o=t*.26,a=e*.36;De(n,s,r,o,a,8);const l=n.createLinearGradient(0,r,0,r+a);l.addColorStop(0,"#cfe0e2"),l.addColorStop(1,"#f0e2c0"),n.fillStyle=l,n.fill(),n.strokeStyle="#7a5f38",n.lineWidth=6,De(n,s,r,o,a,8),n.stroke(),n.strokeStyle="rgba(90,70,40,0.4)",n.lineWidth=3,n.beginPath(),n.moveTo(s+o/2,r),n.lineTo(s+o/2,r+a),n.moveTo(s,r+a/2),n.lineTo(s+o,r+a/2),n.stroke()}function ja(n,t,e){const i=e*.64,s=n.createLinearGradient(0,i,0,e);s.addColorStop(0,"#b08a5c"),s.addColorStop(.2,"#96714a"),s.addColorStop(1,"#6b4f30"),n.fillStyle=s,n.beginPath(),n.moveTo(t*.05,i),n.lineTo(t*.95,i),n.lineTo(t*.85,e),n.lineTo(t*.15,e),n.fill(),n.fillStyle="#7a5f3c",n.beginPath(),n.moveTo(t*.12,e*.8),n.lineTo(t*.88,e*.8),n.lineTo(t*.85,e),n.lineTo(t*.15,e),n.fill(),n.fillStyle="rgba(255,240,210,0.35)",n.beginPath(),n.moveTo(t*.05,i),n.lineTo(t*.95,i),n.lineTo(t*.93,i+10),n.lineTo(t*.07,i+10),n.fill()}function Fr(n,t,e,i,s,r,o){if(n.save(),n.translate(t,e),n.rotate(r||0),n.shadowColor="rgba(0,0,0,0.4)",n.shadowBlur=18,n.shadowOffsetY=10,De(n,-i/2,-s/2,i,s,4),n.fillStyle="#f4ead0",n.fill(),n.shadowBlur=0,n.strokeStyle="rgba(120,100,70,0.5)",n.lineWidth=2,n.stroke(),n.fillStyle=Le.terracotta,n.fillRect(-i/2,-s/2,i,s*.06),o){const a=typeof o=="number"?o:o.length;n.fillStyle="rgba(60,50,34,0.5)";for(let l=0;l<a;l++)n.fillRect(-i*.36,-s*.26+l*s*.09,i*.72,s*.02)}n.restore()}function lu(n,t,e){const i=n.createLinearGradient(0,0,0,e);i.addColorStop(0,"#efe7d3"),i.addColorStop(1,"#e0d3b6"),n.fillStyle=i,n.fillRect(0,0,t,e);for(let s=0;s<80;s++){const r=22+Math.random()*64,o=14+Math.random()*42;n.fillStyle=`rgba(178,166,138,${(.12+Math.random()*.2).toFixed(3)})`,n.fillRect(Math.random()*(t-r),Math.random()*(e-o),r,o)}n.fillStyle="rgba(120,162,184,0.4)",n.beginPath(),n.moveTo(0,e*.06),n.bezierCurveTo(t*.3,e*0,t*.62,e*.12,t*.8,e*.05),n.lineTo(t*.88,0),n.lineTo(0,0),n.fill(),n.strokeStyle="rgba(120,104,80,0.55)",n.lineWidth=2.5;for(let s=0;s<7;s++){const r=e*(.13+s*.13);n.beginPath(),n.moveTo(0,r),n.bezierCurveTo(t*.3,r+20,t*.6,r-20,t,r+8),n.stroke()}for(let s=0;s<9;s++){const r=t*(.1+s*.1);n.beginPath(),n.moveTo(r,0),n.bezierCurveTo(r+16,e*.3,r-16,e*.62,r+10,e),n.stroke()}n.lineWidth=5,n.strokeStyle="rgba(193,104,63,0.4)",n.beginPath(),n.moveTo(0,e*.2),n.bezierCurveTo(t*.35,e*.26,t*.55,e*.55,t*.84,e*.72),n.stroke(),n.save(),n.translate(t*.06,e*.09),n.fillStyle="rgba(255,255,255,0.65)",n.beginPath(),n.arc(0,0,26,0,Cn),n.fill(),n.strokeStyle="rgba(90,74,52,0.6)",n.lineWidth=2,n.stroke(),n.fillStyle=Le.terracotta,n.beginPath(),n.moveTo(0,-18),n.lineTo(5,0),n.lineTo(-5,0),n.closePath(),n.fill(),be(n,"N",0,-32,"700 15px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","rgba(90,74,52,0.9)"),n.restore()}function Ts(n,t,e,i,s){n.save(),n.shadowColor="rgba(0,0,0,0.4)",n.shadowBlur=8,n.shadowOffsetY=4,n.fillStyle=i,n.beginPath(),n.moveTo(t,e-34),n.quadraticCurveTo(t+16,e-4,t+12,e-2),n.lineTo(t,e+6),n.lineTo(t-12,e-2),n.quadraticCurveTo(t-16,e-4,t,e-34),n.fill(),n.shadowBlur=0,n.fillStyle="#fff",n.beginPath(),n.arc(t,e-30,7.5,0,Cn),n.fill(),n.fillStyle=i,n.beginPath(),n.arc(t,e-30,3.5,0,Cn),n.fill(),s&&(n.font="800 19px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",n.lineWidth=4,n.strokeStyle="rgba(240,236,220,0.9)",n.strokeText(s,t+17,e-22),n.fillStyle="#2a2118",n.fillText(s,t+17,e-22)),n.restore()}function No(n,t,e,i,s,r,o,a){const l=Math.PI*.75,c=Math.PI*1.5;n.lineCap="round",n.beginPath(),n.arc(t,e,i,l,l+c),n.strokeStyle="rgba(110,90,55,0.22)",n.lineWidth=14,n.stroke();const u=n.createLinearGradient(t-i,0,t+i,0);u.addColorStop(0,Le.terracotta),u.addColorStop(1,s),n.beginPath(),n.arc(t,e,i,l,l+c*r),n.strokeStyle=u,n.lineWidth=14,n.stroke(),be(n,String(Math.round(r*100))+"%",t,e+8,"800 34px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#3a2e1f"),be(n,o,t,e+i*.78+8,"700 18px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","rgba(90,74,52,0.75)")}function cu(n,t,e){const i=Ui(n,t,e);Bg(n,t*.1,i+20,e*.5),ai(n,t*.5,i+2,1.12,0),Ws(n,"LE PARCOURS DE LA PANNEAUTIQUE SUR LE DOMAINE PUBLIC",e*.86,e*.03),cn(n,t,e,i)}function kg(n,t,e){const i=Ui(n,t,e),s=5;for(let r=0;r<s;r++){const o=r===2,a=t*(.14+r*.18),l=i+(e-i)*.82*Math.pow(1-r/(s-1),.7)*.85+i*.12,c=.5+.18*r+(o?.12:0);ai(n,a,Math.min(l,e-10),c,o?0:(r-2)*.05)}be(n,"LA PANNEAUTIQUE, LEVIER ÉCONOMIQUE DU DOMAINE PUBLIC",t/2,e*.3,"700 34px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#3a2e1f"),n.shadowColor="rgba(255,255,255,0.75)",n.shadowBlur=12,be(n,"CHAQUE SUPPORT EST UNE RESSOURCE",t/2,e*.34,"600 20px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#b3825e"),n.shadowBlur=0,cn(n,t,e,i)}function Gg(n,t,e){const i=Ui(n,t,e);ai(n,t*.2,i+2,1,-.1),ai(n,t*.46,i-6,.9,.12),ai(n,t*.68,i+2,.75,-.26),ai(n,t*.3,i+(e-i)*.7,.55,.38);const s=i+(e-i)*.92;n.fillStyle="rgba(253,250,242,0.92)",De(n,t*.05,s,t*.34,e*.05,4),n.fill();for(let r=0;r<12;r++)r%2===0?n.fillStyle="#cfa574":n.fillStyle="#7a5f38",n.fillRect(t*.055+r*t*.027,s+e*.008,t*.027,e*.034);be(n,"PANNEAUX ANARCHIQUES — LE CONSTAT",t/2,s-e*.02,"700 28px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#3a2e1f"),cn(n,t,e,i)}function Hg(n,t,e){Ja(n,t,e),ja(n,t,e),Fr(n,t*.3,e*.56,t*.3,e*.3,-.04,8),Fr(n,t*.48,e*.6,t*.26,e*.26,.03,6);const i=t*.74,s=e*.56;n.save(),n.translate(i,s),n.shadowColor="rgba(0,0,0,0.45)",n.shadowBlur=16,n.shadowOffsetY=8,De(n,-t*.14,-e*.14,t*.28,e*.28,6),n.fillStyle="#e8d9b8",n.fill(),n.shadowBlur=0,n.strokeStyle="rgba(150,120,70,0.5)",n.stroke(),n.fillStyle=Le.terracotta,n.fillRect(-t*.14,-e*.14,t*.28,e*.035),n.fillStyle="#3a2a18";for(let r=0;r<6;r++)n.fillRect(-t*.11,-e*.08+r*e*.045,t*.22,e*.012);n.fillStyle="#57a05f";for(let r=0;r<4;r++)n.beginPath(),n.arc(-t*.11,-e*.08+r*e*.045,e*.014,0,Cn),n.fill();be(n,"LISTE DE CONTRÔLE",0,e*.11,"700 "+e*.028+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#2a2118"),n.restore(),n.save(),n.translate(t*.5,e*.42),n.rotate(.05),n.shadowColor="rgba(0,0,0,0.4)",n.shadowBlur=14,n.fillStyle="#4a3a26",De(n,-t*.11,-e*.02,t*.09,e*.05,6),n.fill(),n.shadowBlur=0,n.fillStyle="#f4ead0",De(n,-t*.1,-e*.016,t*.012,e*.044,3),n.fill(),n.restore(),Ws(n,"AUDIT : COMPRENDRE AVANT D'AGIR",e*.9,e*.032),cn(n,t,e,e*.5)}function Vg(n,t,e){lu(n,t,e),n.strokeStyle="rgba(193,104,63,0.85)",n.lineWidth=4,n.setLineDash([12,9]),n.beginPath(),n.moveTo(t*.16,e*.2),n.bezierCurveTo(t*.38,e*.34,t*.55,e*.5,t*.84,e*.74),n.stroke(),n.setLineDash([]),Ts(n,t*.16,e*.2,"#c97a62","P1"),Ts(n,t*.32,e*.42,"#7d9ec2","P2"),Ts(n,t*.5,e*.58,"#d2a878","P3"),Ts(n,t*.7,e*.72,"#8fae8a","P4"),Ts(n,t*.85,e*.8,"#c97a62","P5"),n.fillStyle="rgba(240,236,220,0.92)",De(n,t*.62,e*.07,t*.3,e*.22,6),n.fill(),n.strokeStyle="rgba(150,120,70,0.5)",n.stroke(),be(n,"ÉTAT DES LIEUX — GPS",t*.77,e*.12,"700 "+e*.03+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#2a2118"),[["#c97a62","Support signalé"],["#7d9ec2","À vérifier"],["#8fae8a","Conforme"]].forEach(([s,r],o)=>{n.fillStyle=s,n.beginPath(),n.arc(t*.66,e*.16+o*e*.038,e*.013,0,Cn),n.fill(),n.fillStyle="#4a3a28",n.font="500 "+e*.02+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",n.textAlign="left",n.fillText(r,t*.69,e*.166+o*e*.038)}),Ws(n,"RELEVÉ GPS DE TOUS LES SUPPORTS",e*.88,e*.032),cn(n,t,e,e*.8)}function Wg(n,t,e){lu(n,t,e),[[.05,.1,.3,.34,"rgba(125,158,194,0.38)","ZONE A"],[.39,.06,.32,.3,"rgba(192,138,104,0.4)","ZONE B"],[.11,.5,.34,.34,"rgba(143,174,138,0.38)","ZONE C"],[.5,.44,.36,.42,"rgba(207,165,116,0.4)","ZONE D"]].forEach(([s,r,o,a,l,c])=>{n.fillStyle=l,n.fillRect(t*s,e*r,t*o,e*a),n.strokeStyle="rgba(50,40,28,0.55)",n.lineWidth=2.5,n.setLineDash([9,6]),n.strokeRect(t*s,e*r,t*o,e*a),n.setLineDash([]),n.fillStyle="rgba(20,14,8,0.65)",De(n,t*s+t*.012,e*r+e*.02,t*.09,e*.045,4),n.fill(),be(n,c,t*s+t*.057,e*r+e*.052,"800 "+e*.026+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#fff")}),n.fillStyle="rgba(240,236,220,0.94)",De(n,t*.05,e*.86,t*.9,e*.11,6),n.fill(),n.strokeStyle="rgba(150,120,70,0.5)",n.stroke(),be(n,"ZONAGE : LE TERRITOIRE DÉCOUPÉ EN ZONES RÉGLEMENTÉES",t*.5,e*.925,"700 "+e*.035+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#2a2118"),cn(n,t,e,e*.85)}function Xg(n,t,e){const i=Ui(n,t,e),s=i+(e-i)*.72;ai(n,t*.74,s,.72,-.04);const r=t*.3,o=i+(e-i)*.6;n.fillStyle="#f7eeda",De(n,r-t*.16,o-e*.06,t*.32,e*.06,4),n.fill(),n.strokeStyle=Le.bronze,n.lineWidth=4,n.stroke(),n.fillStyle="rgba(90,70,40,0.35)";for(let a=0;a<5;a++)n.fillRect(r-t*.14+a*t*.06,o-e*.052,t*.045,e*.044);be(n,"MOBILIER URBAIN DE PUBLICITÉ — LOT N° 01",r,o-e*.09,"700 "+e*.034+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#3a2e1f"),be(n,"DES LOTS COHÉRENTS POUR UN FINANCEMENT MAÎTRISÉ",t/2,e*.24,"700 26px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#3a2e1f"),cn(n,t,e,i)}function qg(n,t,e){Ja(n,t,e),ja(n,t,e),Fr(n,t*.42,e*.55,t*.46,e*.4,-.02,10),be(n,"CONVENTION DE CONCESSION",t*.42,e*.34,"700 "+e*.036+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#2a2118");const i=t*.62,s=e*.66;n.save(),n.translate(i,s),n.rotate(-.14),n.fillStyle="#b03a30",De(n,-t*.07,-e*.028,t*.14,e*.056,6),n.fill(),n.strokeStyle="#7c241c",n.lineWidth=3,De(n,-t*.07,-e*.028,t*.14,e*.056,6),n.stroke(),be(n,"CONCÉDÉ",0,e*.012,"800 "+e*.03+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#f4ead0"),n.restore(),n.save(),n.translate(t*.26,e*.62),n.rotate(.12),n.strokeStyle="#2a2118",n.lineWidth=3,n.lineCap="round",n.beginPath(),n.moveTo(-t*.02,e*.05),n.lineTo(0,0),n.lineTo(t*.012,-e*.06),n.moveTo(0,0),n.lineTo(-t*.02,-e*.02),n.stroke(),n.restore(),Ws(n,"MISE EN CONCESSION DES ESPACES PUBLICITAIRES",e*.9,e*.032),cn(n,t,e,e*.5)}function Yg(n,t,e){Ja(n,t,e),ja(n,t,e),Fr(n,t*.34,e*.56,t*.42,e*.36,-.02,8),be(n,"CAHIER DES CHARGES",t*.34,e*.36,"700 "+e*.034+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#2a2118");const i=t*.55,s=e*.62;n.save(),n.translate(i,s),n.rotate(-.2),n.fillStyle="#57a05f",De(n,-t*.1,-e*.042,t*.2,e*.084,8),n.fill(),n.strokeStyle="#3a703f",n.lineWidth=4,De(n,-t*.1,-e*.042,t*.2,e*.084,8),n.stroke(),be(n,"ADMIS",0,e*.012,"800 "+e*.055+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#f4f0d8"),n.restore(),Ws(n,"ATTRIBUTION DES LOTS PAR APPEL D'OFFRES",e*.9,e*.032),cn(n,t,e,e*.5)}function $g(n,t,e){const i=Ui(n,t,e),s=t/2,r=t*.42,o=e*.46;n.fillStyle="#d3bd92",n.fillRect(s-r/2,i-o,r,o),n.fillStyle="#c9b184";for(let u=0;u<5;u++)n.fillRect(s-r/2+u*r/5+4,i-o,r/5-8,o);n.fillStyle="rgba(160,120,60,0.55)";for(let u=0;u<6;u++)for(let d=0;d<2;d++)Math.random()<.7&&n.fillRect(s-r/2+d*r/2+r*.08,i-o+o*.1+u*o*.13,r*.18,o*.06);const a=i-o*.18;n.fillStyle="#6b5230",n.fillRect(s-t*.03,a-e*.045,t*.06,e*.045),be(n,"RÉGIE PUBLICITAIRE",s,a-e*.055,"700 "+e*.026+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#3a2e1f");const l=s,c=i-o-e*.08;n.strokeStyle="#4a3a26",n.lineWidth=4,n.beginPath(),n.moveTo(l,c+e*.14),n.lineTo(l,c),n.stroke(),n.fillStyle="#c08a68",n.beginPath(),n.moveTo(l,c-e*.03),n.lineTo(l-t*.012,c),n.lineTo(l+t*.012,c),n.fill(),be(n,"GESTION DES RÉGIES : UN SERVICE EN RÈGIE DIRECTE",t/2,e*.22,"700 26px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#3a2e1f"),cn(n,t,e,i)}function Zg(n,t,e){const i=n.createLinearGradient(0,0,0,e);i.addColorStop(0,"#efe5cd"),i.addColorStop(1,"#e4d5b4"),n.fillStyle=i,n.fillRect(0,0,t,e),n.fillStyle="#faf3e2",De(n,t*.05,e*.08,t*.9,e*.84,10),n.fill(),n.strokeStyle="rgba(138,111,69,0.5)",n.lineWidth=3,n.stroke(),No(n,t*.25,e*.38,e*.14,Le.amber,.9,"AUDIT"),No(n,t*.5,e*.38,e*.14,Le.terracotta,.78,"CONCESSION"),No(n,t*.75,e*.38,e*.14,"#7da878",.86,"GESTION"),n.strokeStyle="#7da878",n.lineWidth=4,n.beginPath(),n.moveTo(t*.12,e*.68),n.bezierCurveTo(t*.24,e*.6,t*.3,e*.66,t*.42,e*.55),n.bezierCurveTo(t*.55,e*.62,t*.6,e*.5,t*.72,e*.5),n.bezierCurveTo(t*.8,e*.48,t*.86,e*.42,t*.9,e*.4),n.stroke(),n.fillStyle="#7da878",n.beginPath(),n.arc(t*.9,e*.4,7,0,Cn),n.fill(),be(n,"ÉVALUATION DU SYSTÈME",t/2,e*.93,"700 "+e*.036+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#7a5f38"),cn(n,t,e,e*.5)}function Kg(n,t,e){const i=Ui(n,t,e);[[t*.24,e*.4],[t*.62,e*.5],[t*.84,e*.34]].forEach(([r,o])=>{const a=i-o;n.strokeStyle="#5c4a30",n.lineWidth=6,n.lineCap="butt",n.beginPath(),n.moveTo(r-18,i),n.lineTo(r+12,a),n.lineTo(r+46,a+16),n.moveTo(r+12,a),n.lineTo(r+12,a+60),n.moveTo(r+12,a+14),n.lineTo(r+58,a+26),n.stroke(),n.lineWidth=3,n.strokeStyle="#4a3a26",n.beginPath(),n.moveTo(r-8,a+26),n.lineTo(r+58,a+32),n.stroke()}),ai(n,t*.5,i+(e-i)*.78,.62,-.1),be(n,"LE SECTEUR SE MODERNISE, LE PARC S'ADAPTE",t/2,e*.24,"700 28px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#3a2e1f"),cn(n,t,e,i)}function Jg(n,t,e){const i=Ui(n,t,e);n.fillStyle="rgba(253,250,242,0.93)",De(n,t*.2,e*.12,t*.6,e*.72,18),n.fill(),n.strokeStyle="rgba(138,111,69,0.5)",n.lineWidth=3,n.stroke(),n.fillStyle="rgba(201,143,78,0.16)",n.beginPath(),n.arc(t*.5,e*.42,e*.22,0,Cn),n.fill(),n.strokeStyle="rgba(201,143,78,0.4)",n.lineWidth=3,n.stroke(),n.fillStyle="#7a5f38",n.font="800 "+e*.26+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",n.textAlign="center",n.fillText("?",t*.5,e*.52),be(n,"12 QUESTIONS — VALIDEZ VOS ACQUIS",t*.5,e*.72,"700 "+e*.034+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#3a2e1f"),be(n,"DÉFINITIONS · ZONES · CONCESSIONS · RÈGIES",t*.5,e*.79,"500 "+e*.02+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#b3825e"),cn(n,t,e,i)}const jg={presentation:cu,"lecon1-importance":kg,"lecon2-constat":Gg,audit:Hg,"etat-lieux":Vg,zonage:Wg,"constitution-lots":Xg,"mise-concession":qg,attribution:Yg,gestion:$g,evaluation:Zg,"mise-a-jour":Kg,quiz:Jg};function Qg(n,t,e,i){n.width=e,n.height=i;const s=n.getContext("2d");(jg[t]||cu)(s,e,i)}const rs=Math.PI*2;let Mi=null,Or=!1;function t_(){if(Or)return null;if(!Mi)try{const n=document.createElement("canvas");Mi=new Wa({canvas:n,antialias:!0,alpha:!1,preserveDrawingBuffer:!0}),Mi.toneMapping=kr,Mi.toneMappingExposure=1.2,Mi.shadowMap.enabled=!0,Mi.shadowMap.type=Br}catch(n){return Or=!0,console.warn("Illustrations 3D indisponibles (WebGL) — fallback 2D.",n),null}return Mi}function On(n,t=1024,e=1024){const i=document.createElement("canvas");i.width=t,i.height=e;const s=i.getContext("2d");n(s,t,e);const r=new qe(i);return r.colorSpace=me,r.anisotropy=4,r}function Fs(n,t,e,i,s,r){n.beginPath(),n.moveTo(t+r,e),n.arcTo(t+i,e,t+i,e+s,r),n.arcTo(t+i,e+s,t,e+s,r),n.arcTo(t,e+s,t,e,r),n.arcTo(t,e,t+i,e,r),n.closePath()}function bn(n=0){const t=["sunset","waves","dune","rings","prism","ember"],e=t[n%t.length];return On((i,s,r)=>{const o=i.createLinearGradient(0,0,s*(n%2?1:-1),r);if(o.addColorStop(0,["#8a6a4e","#96745a","#7d6350"][n%3]),o.addColorStop(1,["#c29a78","#c9a280","#b08c6e"][(n+1)%3]),i.fillStyle=o,i.fillRect(0,0,s,r),i.fillStyle="rgba(242,232,212,0.9)",i.beginPath(),i.arc(s*.5,r*.38,r*.2,0,rs),i.fill(),i.fillStyle="rgba(232,163,92,0.95)",i.beginPath(),i.arc(s*.5,r*.38,r*.13,0,rs),i.fill(),i.strokeStyle="rgba(242,232,212,0.5)",i.lineWidth=8,e==="waves"||e==="rings")for(let a=0;a<4;a++)i.beginPath(),i.arc(s*.5,r*.4,r*(.24+a*.08),0,rs),i.stroke();else for(let a=0;a<3;a++)i.beginPath(),i.moveTo(s*.2,r*(.72-a*.14)),i.quadraticCurveTo(s*.5,r*(.6-a*.14),s*.8,r*(.72-a*.14)),i.stroke();i.fillStyle="rgba(242,232,212,0.28)",i.fillRect(s*.16,r*.84,s*.68,3)},512,384)}function Fo(n,t){const e=new ln([new b(0,0,-20),new b(0,0,140)]);return su(n,e,.5,1,t).group}function yi(n,t={}){const e=new Dt,i=new q({color:Jt.walnut,roughness:.8,metalness:.05}),s=new q({color:Jt.bronze,roughness:.55,metalness:.35}),r=t.w??6.6,o=t.h??4.4,a=new D(new ht(r,o,.22),i);a.position.y=3,a.castShadow=!0,e.add(a);const l=new D(new ht(r+.4,.26,.3),s);l.position.y=o+.92,e.add(l);const c=new D(new ht(r+.4,.26,.3),s);c.position.y=.72,e.add(c);const u=new Be({map:n}),d=new D(new Yt(r-.4,o-.4),u);return d.position.set(0,3,.13),e.add(d),e}function e_(n){const t=new Dt,e=new q({color:Jt.walnutDark,roughness:.7,metalness:.2}),i=new D(new Nt(.09,.12,3.4,8),e);i.position.y=1.7,i.castShadow=!0,t.add(i);const s=new Be({map:n}),r=new D(new Yt(1.5,2.1),s);r.position.y=3.9,t.add(r);const o=new D(new Nt(.14,.1,.24,8),e);return o.position.y=5.15,t.add(o),t}function n_(n){const t=new Dt,e=new q({color:4864550,roughness:.5,metalness:.5}),i=new q({color:10336447,roughness:.15,metalness:.4,transparent:!0,opacity:.5}),s=new q({color:Jt.bronze,roughness:.5,metalness:.45});for(const u of[-2.2,2.2]){const d=new D(new Nt(.08,.1,2.8,8),e);d.position.set(u,1.4,0),t.add(d)}const r=new D(new ht(5.4,.16,2.6),s);r.position.y=2.9,r.rotation.x=.06,t.add(r);const o=new D(new ht(5.4,2.1,.1),i);o.position.set(0,1.75,-1.15),t.add(o);const a=new D(new ht(4.4,.08,.4),new q({color:7031340}));a.position.set(0,.5,-.3),t.add(a);const l=new Be({map:n}),c=new D(new Yt(3.4,2),l);return c.position.set(0,1.9,.14),t.add(c),t}function i_(n){const t=new Dt,e=new D(new ht(2.6,2.6,.5),new q({color:Jt.walnut,roughness:.7}));e.position.y=1.3,t.add(e);const i=new Be({map:n}),s=new D(new Yt(2.2,2),i);s.position.set(0,1.35,.27),t.add(s);const r=new D(new ht(3,.12,1),new q({color:Jt.bronze,roughness:.5,metalness:.4}));return r.position.y=2.72,t.add(r),t}function mc(n=!1){return On((t,e,i)=>{const s=t.createLinearGradient(0,0,0,i);s.addColorStop(0,"#efe7d3"),s.addColorStop(1,"#dcc9a6"),t.fillStyle=s,t.fillRect(0,0,e,i);for(let r=0;r<70;r++){const o=24+Math.random()*90,a=14+Math.random()*60;t.fillStyle=`rgba(178,166,138,${(.1+Math.random()*.22).toFixed(3)})`,t.fillRect(Math.random()*(e-o),Math.random()*(i-a),o,a)}t.fillStyle="rgba(120,162,184,0.35)",t.fillRect(0,0,e*.16,i*.12),t.fillRect(e*.82,i*.72,e*.18,i*.28),t.fillStyle="rgba(109,168,124,0.35)",t.fillRect(e*.6,i*.08,e*.28,i*.18),t.strokeStyle="rgba(120,104,80,0.5)",t.lineWidth=3;for(let r=0;r<6;r++){const o=i*(.1+r*.16);t.beginPath(),t.moveTo(0,o),t.bezierCurveTo(e*.3,o+16,e*.6,o-14,e,o+8),t.stroke()}for(let r=0;r<7;r++){const o=e*(.08+r*.14);t.beginPath(),t.moveTo(o,0),t.bezierCurveTo(o+14,i*.3,o-12,i*.62,o+8,i),t.stroke()}n&&[[.08,.12,.3,.34,"rgba(125,158,194,0.36)"],[.44,.1,.3,.3,"rgba(192,138,104,0.38)"],[.12,.52,.32,.32,"rgba(143,174,138,0.36)"],[.5,.5,.36,.38,"rgba(207,165,116,0.38)"]].forEach(([o,a,l,c,u])=>{t.fillStyle=u,t.fillRect(e*o,i*a,e*l,i*c),t.strokeStyle="rgba(50,40,28,0.6)",t.lineWidth=4,t.setLineDash([12,8]),t.strokeRect(e*o,i*a,e*l,i*c),t.setLineDash([])})},1024,1024)}function gc(n){const t=new Dt,e=new q({color:n,roughness:.5,metalness:.2,emissive:n,emissiveIntensity:.5}),i=new D(new $n(.28,.7,12),e);i.position.y=.7,t.add(i);const s=new D(new _e(.16,10,8),e);return s.position.y=1.15,t.add(s),t}function Oo(){const n=new Dt,t=new q({color:9071429,roughness:.6,metalness:.05}),e=new q({color:4864550,roughness:.8}),i=new D(new ht(3.4,.14,1.5),t);i.position.y=1,i.castShadow=!0,n.add(i);for(const[s,r]of[[-1.5,-.6],[1.5,-.6],[-1.5,.6],[1.5,.6]]){const o=new D(new ht(.12,1,.12),e);o.position.set(s,.5,r),n.add(o)}return n}function s_(n=.85,t=1.15,e=0){const i=new Dt,s=new D(new ht(n,.02,t),new q({color:16050896,roughness:.85}));i.add(s);const r=new Je({color:7034424});for(let o=0;o<5;o++){const a=new D(new ht(n*.72,.005,.02),r);a.position.set(0,.012,t*.32-o*t*.14),i.add(a)}return i.rotation.y=e,i}function r_(){const n=new Dt,t=new D(new ht(.72,.03,.98),new q({color:13215850,roughness:.6}));n.add(t);const e=new D(new Yt(.62,.86),new q({color:16050896,roughness:.9}));e.position.set(0,.02,.02),n.add(e);const i=new D(new ht(.2,.06,.3),new q({color:6048304,metalness:.6,roughness:.3}));return i.position.set(0,.05,.42),n.add(i),n}function o_(n=.2){const t=new Dt,e=new D(new Vn(.34,.05,12,28),new q({color:Jt.bronze,roughness:.3,metalness:.7}));t.add(e);const i=new D(new Ii(.33,28),new q({color:12574950,transparent:!0,opacity:.35,roughness:.05,metalness:.4}));t.add(i);const s=new D(new Nt(.035,.05,.5,10),new q({color:4864550,roughness:.7}));return s.position.set(-.4,-.15,0),s.rotation.z=.9,t.add(s),t.rotation.x=n,t}function zo(n=16758896){const t=new Dt,e=new q({color:4864550,roughness:.4,metalness:.6}),i=new D(new Nt(.28,.34,.1,16),e);i.position.y=.05,t.add(i);const s=new D(new Nt(.05,.05,1.1,10),e);s.position.y=.65,t.add(s);const r=new D(new ht(.9,.05,.05),e);r.position.set(.42,1.25,0),t.add(r);const o=new D(new $n(.16,.22,14),e);o.position.set(.85,1.28,0),o.rotation.z=-Math.PI/2,t.add(o);const a=new D(new _e(.07,10,8),new q({color:n,emissive:n,emissiveIntensity:2.2}));a.position.set(.9,1.18,0),t.add(a);const l=new Ka(n,1.6,9,2);return l.position.set(.9,1.1,0),t.add(l),{g:t,light:l}}function a_(){const n=new Dt,t=new D(new Nt(.05,.05,.8,12),new q({color:3813154,roughness:.4,metalness:.5}));t.position.y=.4,n.add(t);const e=new D(new $n(.05,.16,12),new q({color:Jt.bronze,metalness:.8,roughness:.3}));e.position.y=-.02,e.rotation.x=Math.PI,n.add(e);const i=new D(new Nt(.055,.055,.18,12),new q({color:12151365,roughness:.5}));return i.position.y=.92,n.add(i),n}function _c(n=11549232,t="CONCÉDÉ"){const e=new Dt,i=new D(new Nt(.42,.42,.24,20),new q({color:n,roughness:.5}));e.add(i);const s=new D(new Nt(.12,.14,.3,12),new q({color:4864550,roughness:.6}));s.position.y=.27,e.add(s);const r=new D(new Vn(.42,.03,8,24),new q({color:16050896,roughness:.6}));return r.rotation.x=Math.PI/2,r.position.y=.121,e.add(r),e}function l_(){const n=new Dt,t=new q({color:9071165,roughness:.5}),e=new D(new Nt(.05,.06,.9,12),t);e.rotation.z=Math.PI/2,n.add(e);const i=new D(new Nt(.14,.14,.34,12),t);return i.position.set(.55,.12,0),i.rotation.z=Math.PI/2,n.add(i),n}function c_(n=0){const t=new Dt,e=new D(new ht(.6,.05,.42),new q({color:16050896,roughness:.85}));t.add(e);const i=new D(new Nt(.09,.09,.02,12),new q({color:11549232,roughness:.4}));return i.position.y=.035,t.add(i),t.rotation.y=n,t}function u_(n,t,e){return On((i,s,r)=>{i.fillStyle="#f7f0de",Fs(i,6,6,s-12,r-12,20),i.fill(),i.strokeStyle="rgba(138,111,69,0.55)",i.lineWidth=4,Fs(i,6,6,s-12,r-12,20),i.stroke();const o=s/2,a=r*.56,l=r*.32,c=Math.PI*.75,u=Math.PI*1.5;i.lineCap="round",i.lineWidth=26,i.strokeStyle="rgba(110,90,55,0.22)",i.beginPath(),i.arc(o,a,l,c,c+u),i.stroke(),i.strokeStyle=t,i.beginPath(),i.arc(o,a,l,c,c+u*n),i.stroke(),i.fillStyle="#3a2e1f",i.font="800 90px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",i.textAlign="center",i.fillText(Math.round(n*100)+"%",o,a+22),i.fillStyle="rgba(90,74,52,0.75)",i.font="600 30px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",i.fillText(e,o,a+l+44)},512,512)}function vc(n=1){const t=new Dt,e=new q({color:4864550,roughness:.5,metalness:.4}),i=new q({color:Jt.terracotta,roughness:.6}),s=17*n,r=new D(new ht(.5,s,.5),e);r.position.y=s/2,r.castShadow=!0,t.add(r);const o=new D(new ht(.35,.35,15*n),e);o.position.set(0,s+.6,5*n),t.add(o);const a=new D(new ht(1,1,1),i);a.position.set(0,s,-1.6*n),t.add(a);for(const h of[-.2,.2]){const p=new D(new Nt(.03,.03,8*n,6),e);p.position.set(h,s+.4,6.6*n),p.rotation.x=-.35,t.add(p)}const l=new Xr({color:6048304}),c=[new b(0,s+.5,8*n),new b(0,s-3*n,8*n)],u=new Ce().setFromPoints(c);t.add(new qa(u,l));const d=new D(new ht(.3,.3,.3),e);return d.position.set(0,s-3.4*n,8*n),t.add(d),t}function d_(n,t=60){const e=new Float32Array(t*3),i=new Float32Array(t*3),s=[12618344,13805688,16050896,9416330,10521188];for(let l=0;l<t;l++){e[l*3]=(Math.random()-.5)*14,e[l*3+1]=Math.random()*9,e[l*3+2]=(Math.random()-.5)*14;const c=new Tt(s[l%s.length]);i[l*3]=c.r,i[l*3+1]=c.g,i[l*3+2]=c.b}const r=new Ce;r.setAttribute("position",new ze(e,3)),r.setAttribute("color",new ze(i,3));const o=new qr({size:.16,vertexColors:!0,transparent:!0,opacity:.85}),a=new Ya(r,o);return n.add(a),a}function on(n,t={}){const e=On((f,v,g)=>{const m=f.createLinearGradient(0,0,0,g);m.addColorStop(0,"#f8f1de"),m.addColorStop(.34,"#f4e9cf"),m.addColorStop(.6,"#efe1bf"),m.addColorStop(.82,"#e9d7ab"),m.addColorStop(1,"#e1cc95"),f.fillStyle=m,f.fillRect(0,0,v,g);const S=f.createLinearGradient(0,g*.58,0,g);S.addColorStop(0,"rgba(255,238,205,0)"),S.addColorStop(1,"rgba(255,241,212,0.9)"),f.fillStyle=S,f.fillRect(0,g*.58,v,g*.42),f.fillStyle="rgba(255,252,244,0.5)";for(let x=0;x<12;x++){const y=Math.random()*v,U=Math.random()*g*.55,P=26+Math.random()*48;for(let R=0;R<4;R++)f.beginPath(),f.ellipse(y+(Math.random()-.5)*P*.6,U+(Math.random()-.5)*10,P*(.3+Math.random()*.25),4+Math.random()*5,0,0,rs),f.fill()}},256,1024),i=new Je({map:e,side:Xe,fog:!1,depthWrite:!1}),s=new D(new _e(820,24,14),i);n.add(s);const r=new Hn(new An({map:Sn(0,"rgba(240,180,110,0.95)"),transparent:!0,blending:tn,depthWrite:!1,depthTest:!1}));r.position.set(t.sunX??-180,t.sunY??90,-520),r.scale.setScalar(t.sunS??130),n.add(r);const o=new Hn(new An({map:Sn(.25,"rgba(235,165,95,0.35)"),transparent:!0,blending:tn,depthWrite:!1,depthTest:!1}));o.position.set(t.sunX??-180,t.sunY??90,-520),o.scale.setScalar(460),n.add(o),n.userData.sun={sprite:r,halo:o};const a=new D(new Ii(1400,40),new q({map:iu(),roughness:1,metalness:0}));a.rotation.x=-Math.PI/2,a.position.y=-.03,a.receiveShadow=!0,n.add(a),n.add(new nu(11772544,t.ambient??.75)),n.add(new Qc(15918796,12101246,t.hemi??.5));const l=new eu(16772552,t.sunI??2.6);l.position.set(-120,140,-220),l.castShadow=!0,l.shadow.mapSize.set(1024,1024),l.shadow.camera.left=-60,l.shadow.camera.right=60,l.shadow.camera.top=60,l.shadow.camera.bottom=-60,l.shadow.camera.near=10,l.shadow.camera.far=600,n.add(l),n.add(l.target),n.fog=new oi(t.fogColor??Jt.skyHorizon,t.fogNear??40,t.fogFar??480);const c=Ns()?70:140,u=new Float32Array(c*3);for(let f=0;f<c;f++)u[f*3]=(Math.random()-.5)*90,u[f*3+1]=.4+Math.random()*9,u[f*3+2]=-20+Math.random()*160;const d=new Ce;d.setAttribute("position",new ze(u,3));const h=new qr({color:16050896,transparent:!0,opacity:.3,blending:tn,depthWrite:!1,size:.09,sizeAttenuation:!0}),p=new Ya(d,h);n.add(p),n.userData.dust=p}function Si(n,t=12,e=30,i=170,s=70){for(let r=0;r<t;r++){const o=e+Math.random()*(i-e),a=9+Math.random()*22,l=5+Math.random()*4,c=5+Math.random()*4,u=Math.random()>.5?1:-1;n.add(Ca(l,a,c,o,u*(s*.55+Math.random()*s*.45)))}}function xi(n,t){n.userData.palms=n.userData.palms||[];for(const[e,i,s]of t){const r=ru(new b(e,0,i),s??1);n.userData.palms.push(r),n.add(r)}}const zr={presentation(n,t,e){on(n);const i=new ln([new b(0,0,-30),new b(0,0,140)]),s=Fn(i,4.4,Jt.path,ts(),400);s.position.y=.01,n.add(s);const r=Fo(t,e);r.position.set(-5.2,0,46),r.rotation.y=.42,n.add(r);const o=yi(bn(1));o.position.set(6.4,0,70),o.rotation.y=-.55,n.add(o),Si(n,16),xi(n,[[-9,18,1.2],[9,22,1],[-10,62,1.3],[10,92,1.1],[-11,120,1.25]]);for(let l=0;l<=4;l++){const c=8+l*26,u=l%2===0?1:-1,d=Rs(new b(u*6,0,c),u);n.add(d);const h=Ps(new b(u*6,0,c),u);n.add(h.group)}for(const l of[30,78]){const c=Ra();c.group.position.set(0,0,l),c.group.rotation.y=Math.PI,c.group.userData.x0=0,(n.userData.cars=n.userData.cars||[]).push(c.group),n.add(c.group)}const a=new xe(46,1280/760,.1,2e3);return a.position.set(6.5,3.1,14),a.lookAt(-1.5,3.4,52),a},"lecon1-importance"(n,t,e){on(n,{sunX:60,sunY:120,sunI:2.4});const i=new ln([new b(0,0,-20),new b(0,0,150)]),s=Fn(i,4.4,Jt.path,ts(),400);s.position.y=.01,n.add(s),[{x:-5.6,z:40,ry:.5},{x:5.8,z:62,ry:-.6},{x:-5.9,z:86,ry:.55},{x:5.9,z:108,ry:-.55},{x:-5.8,z:130,ry:.5}].forEach((a,l)=>{const c=l===0?Fo(t,e):yi(bn(l+2));c.position.set(a.x,0,a.z),c.rotation.y=a.ry,n.add(c)}),Si(n,14,30,190,80),xi(n,[[-9,16,1],[9,50,1.1],[-10,96,1.05],[10,132,1.15]]);for(let a=0;a<=5;a++){const l=12+a*24,c=a%2===0?1:-1,u=Rs(new b(c*6,0,l),c);n.add(u);const d=Ps(new b(c*6,0,l),c);n.add(d.group)}for(const a of[28,74,118]){const l=Ra();l.group.position.set(0,0,a),l.group.rotation.y=Math.PI,l.group.userData.x0=0,(n.userData.cars=n.userData.cars||[]).push(l.group),n.add(l.group)}const o=new xe(48,1280/760,.1,2e3);return o.position.set(8,5.4,6),o.lookAt(0,3.2,80),o},"lecon2-constat"(n,t,e){on(n,{sunI:1.3,ambient:.5,fogColor:15524036,fogNear:24,fogFar:220}),[[0,20,.1,1.15],[-7,34,-.35,1],[6,42,.55,.9],[-3,52,-.2,1.25],[8,60,-.7,.85],[-8,66,.3,1.1],[3,74,.65,.95],[-5,84,-.5,1.05],[7,90,.15,.8],[-9,96,-.8,1.2]].forEach(([o,a,l,c],u)=>{const d=u===0?Fo(t,e):yi(bn(u+1));d.position.set(o,0,a),d.scale.setScalar(c),d.rotation.y=l,d.rotation.z=u%3*.06-.06,u%4===3&&(d.rotation.x=-.08),n.add(d)});const s=yi(bn(5));s.position.set(2,0,102),s.rotation.set(1.35,.4,.3),n.add(s),Si(n,10,20,150,60),xi(n,[[-9,30,.9],[9,55,.85],[-10,88,.95]]);const r=new xe(52,1280/760,.1,2e3);return r.position.set(11,5.2,-8),r.lookAt(-1,2.6,55),r},audit(n){on(n,{sunI:1.1,ambient:.65,fogNear:30,fogFar:200}),n.fog=new oi(15524036,30,200);const t=new D(new Yt(90,40),new q({color:15985364}));t.position.set(0,14,-16),t.rotation.y=Math.PI,n.add(t);const e=On((h,p,f)=>{const v=h.createLinearGradient(0,0,0,f);v.addColorStop(0,"#d9e4e6"),v.addColorStop(1,"#f2e4c6"),h.fillStyle=v,h.fillRect(0,0,p,f),h.fillStyle="#c3ab7c",h.fillRect(0,f*.72,p,f*.28),h.fillStyle="rgba(180,140,90,0.6)";for(let g=0;g<14;g++){const m=16+Math.random()*40,S=20+Math.random()*60;h.fillRect(10+Math.random()*(p-50),f*.76,m,S)}},512,320),i=new D(new Yt(13,7),new q({map:e,emissiveMap:e,emissive:new Tt(16773336),emissiveIntensity:.12}));i.position.set(0,7.5,-15.6),n.add(i);const s=new q({color:8019768}),r=new D(new ht(.4,7,.3),s);r.position.set(0,7.5,-15.2),n.add(r);const o=new D(new ht(13,.4,.3),s);o.position.set(0,7.5,-15.2),n.add(o);const a=Oo();n.add(a);for(const[h,p,f]of[[.7,.3,.35],[-.6,.4,-.4],[.2,-.5,.1]]){const v=s_(.9,1.2,f);v.position.set(h,1.1,p),n.add(v)}const l=r_();l.position.set(-.9,1.09,.25),l.rotation.y=.3,n.add(l);const c=o_(.25);c.position.set(.55,1.12,.5),c.rotation.y=.4,c.userData.y0=1.12,c.userData.rz0=0,(n.userData.floaters=n.userData.floaters||[]).push(c),n.add(c);const u=zo();u.g.position.set(-1.6,0,-.5),n.add(u.g),n.add(u.light);const d=new xe(44,1280/760,.1,2e3);return d.position.set(4.2,3.4,7.5),d.lookAt(0,1.6,-1),d},"etat-lieux"(n){on(n,{sunI:2.2,fogNear:60,fogFar:700});const t=new D(new Yt(24,24),new q({map:mc(),roughness:.9}));t.rotation.x=-Math.PI/2,t.position.y=.01,n.add(t);const e=[new b(-7,.5,6),new b(-3.5,.6,1),new b(1,.7,-4),new b(5.5,.8,-7),new b(9,.9,-10)],i=new D(new Bs(new ln(e),64,.12,8,!1),new Je({color:12618344,transparent:!0,opacity:.8}));i.position.y=-.01,n.add(i),[[-7,6,13204066],[-3.5,1,8232642],[1,-4,13805688],[5.5,-7,9416330],[9,-10,13204066]].forEach(([l,c,u])=>{const d=gc(u);d.position.set(l,0,c),n.add(d)});const r=On((l,c,u)=>{l.fillStyle="rgba(255,255,255,0.75)",l.beginPath(),l.arc(c/2,u/2,c/2-8,0,rs),l.fill(),l.strokeStyle="rgba(90,74,52,0.8)",l.lineWidth=5,l.stroke(),l.fillStyle="#c08a68",l.beginPath(),l.moveTo(c/2,u*.16),l.lineTo(c*.58,u*.6),l.lineTo(c*.42,u*.6),l.closePath(),l.fill(),l.fillStyle="#5a4a34",l.font="800 34px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",l.textAlign="center",l.fillText("N",c/2,u*.2)},160,160),o=new D(new Yt(2.2,2.2),new Je({map:r,transparent:!0}));o.position.set(-9.5,.05,9.5),o.rotation.x=-Math.PI/2,n.userData.compass=o,n.add(o);const a=new xe(40,1280/760,.1,2e3);return a.position.set(13,20,11),a.lookAt(0,0,0),a},zonage(n){on(n,{sunI:2,fogNear:60,fogFar:700});const t=new D(new Yt(24,24),new q({map:mc(!0),roughness:.9}));t.rotation.x=-Math.PI/2,t.position.y=.01,n.add(t),[[0,0,8232642],[6,0,12618344],[0,-6,9416330],[6,-6,13805688]].forEach(([o,a,l])=>{const c=gc(l);c.position.set(o,0,a),n.add(c)});const i=On((o,a,l)=>{o.fillStyle="rgba(240,236,220,0.95)",Fs(o,0,0,a,l,16),o.fill();const c=[["#7d9ec2","Zone A"],["#c08a68","Zone B"],["#8fae8a","Zone C"],["#d2a878","Zone D"]];o.font="700 30px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",o.textAlign="left",c.forEach(([u,d],h)=>{o.fillStyle=u,o.beginPath(),o.arc(46,60+h*70,16,0,rs),o.fill(),o.fillStyle="#3a2a18",o.fillText(d,78,72+h*70)})},360,320),s=new D(new Yt(3.4,3),new Je({map:i,transparent:!0}));s.position.set(-8.8,.05,-8),s.rotation.x=-Math.PI/2,n.add(s);const r=new xe(40,1280/760,.1,2e3);return r.position.set(-10,21,14),r.lookAt(0,0,-1),r},"constitution-lots"(n,t,e){on(n,{sunX:40,sunY:130,sunI:2.4});const i=new ln([new b(0,0,-20),new b(0,0,150)]),s=Fn(i,4.4,Jt.path,ts(),400);s.position.y=.01,n.add(s);const r=n_(bn(0));r.position.set(-6.4,0,42),r.rotation.y=.35,n.add(r);const o=yi(bn(3));o.position.set(6.6,0,64),o.rotation.y=-.5,n.add(o);const a=i_(bn(2));a.position.set(-6.2,0,88),a.rotation.y=.4,n.add(a);const l=e_(bn(1));l.position.set(6.4,0,108),l.rotation.y=-.45,n.add(l),Si(n,12,30,180,80),xi(n,[[-9,22,1.1],[9,34,1],[-10,78,1.15],[10,122,1.05]]);for(let u=0;u<=4;u++){const d=20+u*24,h=u%2===0?1:-1,p=Rs(new b(h*6,0,d),h);n.add(p);const f=Ps(new b(h*6,0,d),h);n.add(f.group)}for(const u of[58,100]){const d=Pa(new b(4.6,0,u),1);n.add(d)}const c=new xe(46,1280/760,.1,2e3);return c.position.set(8.5,4.6,4),c.lookAt(-1,3,62),c},"mise-concession"(n){on(n,{sunI:1.2,ambient:.7,fogNear:30,fogFar:200}),n.fog=new oi(15524036,30,200);const t=new D(new Yt(90,40),new q({color:15985364}));t.position.set(0,14,-16),t.rotation.y=Math.PI,n.add(t);const e=Oo();n.add(e);const i=new D(new Yt(2.3,1.6),new q({color:16050896,roughness:.85}));i.position.set(.1,1.08,.15),i.rotation.x=-.18,n.add(i);const s=a_();s.position.set(1.05,1.1,.5),s.rotation.y=-.5,s.rotation.z=-.12,s.userData.y0=1.1,s.userData.rz0=-.12,(n.userData.floaters=n.userData.floaters||[]).push(s),n.add(s);const r=_c();r.position.set(-1.15,1.05,-.1),r.rotation.y=.3,r.userData.y0=1.05,r.userData.rz0=0,(n.userData.floaters=n.userData.floaters||[]).push(r),n.add(r);const o=new D(new Vn(.22,.04,10,24),new q({color:Jt.bronze,metalness:.8,roughness:.3}));o.position.set(-.7,1.12,.6),o.rotation.x=Math.PI/2.2,o.rotation.z=.3,n.add(o);const a=zo();a.g.position.set(-1.7,0,-.6),n.add(a.g),n.add(a.light);const l=new xe(42,1280/760,.1,2e3);return l.position.set(3.9,3.6,6.8),l.lookAt(-.1,1.7,-.4),l},attribution(n){on(n,{sunI:1.2,ambient:.7,fogNear:30,fogFar:200}),n.fog=new oi(15524036,30,200);const t=new D(new Yt(90,40),new q({color:15985364}));t.position.set(0,14,-16),t.rotation.y=Math.PI,n.add(t);const e=Oo();n.add(e);const i=l_();i.position.set(.9,1.12,.2),i.rotation.y=.7,i.userData.y0=1.12,i.userData.rz0=0,(n.userData.floaters=n.userData.floaters||[]).push(i),n.add(i);for(const[l,c,u]of[[-1.2,.4,.5],[-.5,-.4,-.6],[.4,.6,.1]]){const d=c_(u);d.position.set(l,1.06,c),n.add(d)}const s=_c(3829823,"ADMIS");s.position.set(-1.4,1.05,-.5),s.rotation.y=-.4,n.add(s);const r=new D(new Vn(.24,.06,12,28),new q({color:13805688,metalness:.9,roughness:.25}));r.position.set(.1,1.15,-.6),r.rotation.x=Math.PI/2.4,r.userData.y0=1.15,r.userData.rz0=0,(n.userData.floaters=n.userData.floaters||[]).push(r),n.add(r);const o=zo();o.g.position.set(-1.7,0,-.6),n.add(o.g),n.add(o.light);const a=new xe(42,1280/760,.1,2e3);return a.position.set(4.1,3.5,7.2),a.lookAt(0,1.6,-.2),a},gestion(n){on(n,{sunX:20,sunY:150,sunI:2.5});const t=new ln([new b(0,0,-20),new b(0,0,150)]),e=Fn(t,4.4,Jt.path,ts(),400);e.position.y=.01,n.add(e);const i=new Dt,s=new q({color:15195071,roughness:.85}),r=new D(new ht(14,10,8),s);r.position.y=5,r.castShadow=!0,i.add(r);const o=new D(new Nt(8,8.6,1.6,4),s);o.position.y=11,o.rotation.y=Math.PI/4,i.add(o);const a=new q({color:13614751,roughness:.6});for(const p of[-5,-3.3,-1.6,0,1.6,3.3,5]){const f=new D(new Nt(.28,.34,4.6,10),a);f.position.set(p,2.3,4.05),i.add(f)}const l=On((p,f,v)=>{p.fillStyle="#d8c9a6",p.fillRect(0,0,f,v);for(let g=0;g<3;g++)for(let m=0;m<6;m++)Math.random()<.75&&(p.fillStyle=Math.random()<.4?"#b98a5a":"#c9a25f",p.globalAlpha=.6,p.fillRect(10+m*(f/6),10+g*(v/3.4),f/8,v/4.4),p.globalAlpha=1)},512,256),c=new D(new Yt(10,4.4),new q({map:l,emissiveMap:l,emissive:new Tt(16114365),emissiveIntensity:.15}));c.position.set(0,6.2,4.06),i.add(c),i.position.set(0,0,58),i.rotation.y=Math.PI,n.add(i);const u=new D(new Nt(.08,.12,8,8),new q({color:6048304}));u.position.set(-8,4,56),n.add(u);const d=new D(new Yt(2.6,1.5),new q({color:Jt.terracotta,side:Ke,roughness:.8}));d.position.set(-6.6,7.4,56),d.rotation.y=.2,n.userData.flag=d,n.add(d);for(let p=0;p<3;p++){const f=yi(bn(p+1));f.position.set(-6.4,0,30+p*22),f.rotation.y=.45,n.add(f)}Si(n,10,80,200,90),xi(n,[[-9,20,1],[9,44,1.1],[9.5,92,1]]);for(let p=0;p<=4;p++){const f=14+p*26,v=p%2===0?1:-1,g=Rs(new b(v*6,0,f),v);n.add(g);const m=Ps(new b(v*6,0,f),v);n.add(m.group)}const h=new xe(44,1280/760,.1,2e3);return h.position.set(10,3.6,18),h.lookAt(0,4.5,58),h},evaluation(n){on(n,{sunI:1,ambient:.55,fogNear:30,fogFar:300}),n.fog=new oi(15524036,30,300),[{pct:.9,color:"#d2a878",label:"AUDIT",x:-4},{pct:.78,color:"#c08a68",label:"CONCESSION",x:0},{pct:.86,color:"#7da878",label:"GESTION",x:4}].forEach(({pct:o,color:a,label:l,x:c})=>{const u=new D(new Nt(1.5,1.8,.3,20),new q({color:6048304,roughness:.7}));u.position.set(c,.15,0),n.add(u);const d=new D(new Nt(.14,.16,3.4,10),new q({color:Jt.walnut,roughness:.6}));d.position.set(c,1.85,0),n.add(d);const h=u_(o,a,l),p=new D(new Yt(3.6,3.6),new q({map:h,emissiveMap:h,emissive:new Tt(16777215),emissiveIntensity:.08}));p.position.set(c,3.9,0),p.rotation.x=.25,n.add(p);const f=new Ka(15246172,.2,8,2);f.position.set(c,3.2,2),n.add(f)});const e=[new b(-6,.8,2.5),new b(-3,1.6,1.4),new b(0,2.6,0),new b(3,3.8,-1.2),new b(6,5.2,-2.4)],i=new D(new Bs(new ln(e),64,.1,8,!1),new Je({color:5742687,transparent:!0,opacity:.9}));n.add(i);const s=new D(new $n(.3,.8,12),new q({color:5742687,emissive:5742687,emissiveIntensity:.6}));s.position.set(6.4,5.6,-2.7),s.rotation.z=-.6,n.add(s);const r=new xe(46,1280/760,.1,2e3);return r.position.set(7,3.4,11),r.lookAt(0,3.2,-1),r},"mise-a-jour"(n){on(n,{sunX:-80,sunY:110,sunI:2.2});const t=new ln([new b(0,0,-20),new b(0,0,150)]),e=Fn(t,4.4,Jt.path,ts(),400);e.position.y=.01,n.add(e);const i=vc(1);i.position.set(-8,0,52),n.userData.cranes=[i],n.add(i);const s=vc(.7);s.position.set(8,0,84),n.userData.cranes.push(s),n.add(s);const r=new D(new ht(7,9,7),new q({color:2760726,roughness:.9}));r.position.set(0,4.5,62),r.castShadow=!0,n.add(r);const o=new q({color:7034424,roughness:.8});for(let h=0;h<4;h++){const p=new D(new ht(8,.14,.14),o);p.position.set(0,1.5+h*2.3,3.6),n.add(p)}const a=yi(bn(4));a.position.set(0,14,66),a.rotation.x=.15,a.userData.y0=14,n.userData.hoisted=a,n.add(a);const l=new Xr({color:6048304}),c=[new b(-8,18,52),new b(0,15,65)],u=new Ce().setFromPoints(c);n.add(new qa(u,l)),Si(n,10,90,220,85),xi(n,[[-9,30,.9],[9,110,1]]);const d=new xe(48,1280/760,.1,2e3);return d.position.set(11,5.5,6),d.lookAt(0,8,62),d},quiz(n){on(n,{sunX:0,sunY:130,sunI:2});const t=On((u,d,h)=>{u.clearRect(0,0,d,h),u.fillStyle="rgba(253,250,242,0.92)",Fs(u,0,0,d,h,40),u.fill(),u.strokeStyle="rgba(138,111,69,0.5)",u.lineWidth=8,Fs(u,8,8,d-16,h-16,36),u.stroke(),u.shadowColor="rgba(122,95,56,0.55)",u.shadowBlur=40,u.fillStyle="#7a5f38",u.font="800 620px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",u.textAlign="center",u.textBaseline="middle",u.fillText("?",d/2,h*.52),u.shadowBlur=0},640,640),e=new D(new Yt(7,7),new Je({map:t,transparent:!0}));e.position.set(0,8.5,30),n.add(e);const i=new Hn(new An({map:Sn(.3,"rgba(232,163,92,0.28)"),transparent:!0,blending:tn,depthWrite:!1}));i.position.set(0,8.5,28.5),i.scale.setScalar(18),n.add(i);const s=new Dt,r=new q({color:13805688,metalness:.85,roughness:.28}),o=new D(new Nt(.9,1,.3,16),r);s.add(o);const a=new D(new Nt(.28,.3,1.2,12),r);a.position.y=.75,s.add(a);const l=new D(new Nt(.9,.45,1.1,18),r);l.position.y=1.7,s.add(l);for(const u of[-1,1]){const d=new D(new Vn(.4,.07,10,20,Math.PI),r);d.position.set(u*.78,1.5,0),d.rotation.z=u*Math.PI/2,s.add(d)}s.position.set(-3.6,0,40),n.userData.trophy=s,n.add(s),Si(n,12,60,200,90),xi(n,[[-9,60,1],[9,90,1.1]]),n.userData.confetti=d_(n,70);const c=new xe(46,1280/760,.1,2e3);return c.position.set(6,3.6,8),c.lookAt(0,6.5,34),c}};function h_(n,t,e,i=1280,s=760){if(Or)return null;let r;try{r=new Wa({canvas:e,antialias:!Ns(),alpha:!1}),r.toneMapping=kr,r.toneMappingExposure=1.2,r.shadowMap.enabled=!Ns(),r.shadowMap.enabled&&(r.shadowMap.type=Br),r.setPixelRatio(Math.min(window.devicePixelRatio||1,Ns()?1:1.25)),r.setSize(i,s,!1)}catch{return Or=!0,null}let o=null,a=null;try{o=new Xa,a=(zr[n.id]||zr.presentation)(o,n,t),a.aspect=i/s,a.updateProjectionMatrix()}catch(L){return console.warn("Illustration 3D en direct indisponible pour",n.id,L),r.dispose(),null}const l=a.position.clone(),c=new b;a.getWorldDirection(c);const u=l.clone().addScaledVector(c,40),d=Math.min(3,Math.max(.6,l.length()/14)),h=o.userData.dust||null,p=o.userData.sun||null,f=o.userData.palms||[],v=o.userData.cars||[],g=o.userData.cranes||[],m=o.userData.hoisted||null,S=o.userData.trophy||null,x=o.userData.flag||null,y=o.userData.compass||null,U=o.userData.confetti||null,P=o.userData.floaters||[];function R(L,_,M){h&&(h.rotation.y+=_*.02,h.position.y=Math.sin(L*.4)*.3,h.material.opacity=.26+Math.sin(L*.8)*.08),p&&(p.sprite.material.opacity=.82+Math.sin(L*.5)*.1,p.halo.material.opacity=.28+Math.sin(L*.4+1)*.06);for(let T=0;T<f.length;T++)f[T].rotation.z=Math.sin(L*.8+T*1.7)*.05;for(let T=0;T<v.length;T++){const I=v[T];I.position.z-=_*.9,I.position.x=(I.userData.x0||0)+Math.sin(L*.5+T*2.1)*.4,I.position.z<-14&&(I.position.z=132,I.position.x=(Math.random()-.5)*6,I.userData.x0=I.position.x)}if(U){const T=U.geometry.attributes.position,I=T.array;for(let B=0;B<T.count;B++)I[B*3+1]-=_*.7,I[B*3+1]<.2&&(I[B*3+1]=6+Math.random()*3,I[B*3]=(Math.random()-.5)*14,I[B*3+2]=(Math.random()-.5)*14);T.needsUpdate=!0}S&&(S.rotation.y=Math.sin(L*.6)*.12);for(let T=0;T<g.length;T++){const I=g[T];I.rotation.y=(I.userData.baseY||0)+Math.sin(L*.15+T*2.4)*.12}m&&(m.rotation.z=Math.sin(L*1.1)*.03,m.position.y=(m.userData.y0||14)+Math.sin(L*.7)*.25),x&&(x.rotation.z=Math.sin(L*1.8)*.16+Math.sin(L*3.1)*.05),y&&(y.rotation.z=L*.15);for(let T=0;T<P.length;T++){const I=P[T];I.position.y=(I.userData.y0||I.position.y)+Math.sin(L*1.2+T*1.3)*.03,I.rotation.z=(I.userData.rz0||0)+Math.sin(L*.9+T)*.02}a.position.set(l.x+Math.sin(M*Math.PI)*.5*d+Math.sin(L*.3)*.06*d,l.y+Math.cos(M*Math.PI)*.25*d+Math.sin(L*.24)*.05*d,l.z+(M-.5)*1.2*d+Math.cos(L*.21)*.07*d),a.lookAt(u),r.render(o,a)}return{canvas:r.domElement,render:R,dispose(){r.dispose(),o.traverse(L=>{if(L.geometry&&L.geometry.dispose(),L.material){const _=Array.isArray(L.material)?L.material:[L.material];for(const M of _)M.map&&M.map.dispose(),M.dispose()}})}}}const Bo=new Map;function f_(n,t,e=1280,i=760){if(Bo.has(n.id))return Bo.get(n.id);const s=t_();if(!s)return null;try{s.setPixelRatio(Ns()?1:1.5),s.setSize(e,i);const r=new Xa,a=(zr[n.id]||zr.presentation)(r,n,t);a.aspect=e/i,a.updateProjectionMatrix(),s.render(r,a);const l=s.domElement.toDataURL("image/jpeg",.85);return p_(r),Bo.set(n.id,l),l}catch(r){return console.warn("Illustration 3D indisponible pour",n.id,r),null}}function p_(n){const t=new Set,e=new Set;n.traverse(i=>{i.geometry&&i.geometry.dispose();const s=Array.isArray(i.material)?i.material:i.material?[i.material]:[];for(const r of s)if(!e.has(r)){e.add(r);for(const o of[r.map,r.emissiveMap])o&&!t.has(o)&&(t.add(o),o.dispose());r.dispose()}})}function m_({onExit:n,onScrollTo:t,onQuiz:e}){const i=document.getElementById("ui-course"),s=i.querySelector("#course-toc"),r=i.querySelector("#course-toc-select"),o=i.querySelector("#course-sections"),a=i.querySelector("#course-cover"),l=i.querySelector("#course-close"),c=i.querySelector("#course-quiz-btn"),u=i.querySelector(".course-main"),d=t||(_=>u.scrollTo({top:_,behavior:"smooth"}));let h=!1;a.innerHTML=`
    <div class="course-cover-kicker">${Do.module} — Formation :</div>
    <h1 class="course-cover-title">${Do.title}</h1>
    <div class="course-cover-sub">${Do.subtitle}</div>
    <div class="course-cover-rule"></div>
    <p class="course-cover-desc">Lecture complète et illustrée du cours. Avancez section par section, chaque étape est accompagnée d'une illustration de son contexte.</p>
    <div class="course-cover-meta"><span>${ke.length} étapes</span><span>12 questions finales</span></div>
  `;const p=[],f=[];Pr.forEach((_,M)=>{const T=ke.filter(I=>I.chapter===M);T.length&&(p.push(`<div class="toc-chapter"><div class="toc-chapter-name">${_.name}</div><div class="toc-chapter-label">${_.label}</div></div>`),T.forEach(I=>{p.push(`<a href="#course-sec-${I.id}" class="toc-item" data-id="${I.id}"><span class="toc-num">${I.num}</span><span>${I.title}</span></a>`)}))}),ke.forEach(_=>{const M=Pr[_.chapter],T=_.id==="quiz";let I="";T?I=`<ul class="course-bullets">${_.bullets.map(B=>`<li>${B}</li>`).join("")}</ul>`:I=_.content.map(B=>`<p><span class="course-body-t">${B.t}</span>${B.b}</p>`).join(""),f.push(`
      <section class="course-section" id="course-sec-${_.id}">
        <canvas class="course-illus" role="img" aria-label="Illustration — ${_.title}"></canvas>
        <div class="course-sec-meta">
          <span class="course-sec-chapter">${M?`${M.name} · ${M.label}`:""}</span>
          <span class="course-sec-num">${_.num} / ${String(ke.length).padStart(2,"0")}</span>
        </div>
        <h2 class="course-sec-title">${_.title}</h2>
        <div class="course-sec-rule"></div>
        <div class="course-sec-content">${I}</div>
      </section>
    `)}),s.innerHTML=p.join(""),o.innerHTML=f.join("");const v=[];Pr.forEach((_,M)=>{const T=ke.filter(I=>I.chapter===M);T.length&&(v.push(`<optgroup label="${_.name}">`),T.forEach(I=>v.push(`<option value="${I.id}">${I.num} · ${I.title}</option>`)),v.push("</optgroup>"))}),r.innerHTML=v.join("");const g=[];o.querySelectorAll(".course-illus").forEach(_=>{const M=_.closest(".course-section").id.replace("course-sec-",""),T=document.createElement("canvas");Qg(T,M,1280,760),_.style.backgroundImage=`url(${T.toDataURL("image/jpeg",.86)})`,_.style.backgroundSize="cover",_.style.backgroundPosition="center",g.push({canvas:_,id:M,live:null,raf:0,p:0,running:!1})});const m=window.matchMedia("(prefers-reduced-motion: reduce)").matches;function S(_){const M=_.getBoundingClientRect(),T=u.getBoundingClientRect(),I=M.height+T.height||1;return Math.min(1,Math.max(0,(T.bottom-M.top)/I))}function x(_){if(!_.live||_.running)return;_.running=!0,_.p=S(_.canvas);let M=performance.now();const T=I=>{if(!_.running)return;const B=Math.min(.05,Math.max(.001,(I-M)/1e3));M=I,_.p=S(_.canvas),_.live.render(I*.001,B,_.p),_.raf=requestAnimationFrame(T)};_.raf=requestAnimationFrame(T)}function y(_){_.running&&(_.running=!1,cancelAnimationFrame(_.raf))}const U=new IntersectionObserver(_=>{for(const M of _){const T=g.find(I=>I.canvas===M.target);if(T)if(M.isIntersecting){if(!T.live){const I=ke.find(B=>B.id===T.id);if(I&&(m||(T.live=h_(I,ke.indexOf(I),T.canvas,1280,760)),!T.live)){const B=f_(I,ke.indexOf(I));B&&(T.canvas.style.backgroundImage=`url(${B})`)}}x(T)}else y(T)}},{root:u,rootMargin:"420px 0px 420px 0px",threshold:0});g.forEach(_=>U.observe(_.canvas)),s.addEventListener("click",_=>{const M=_.target.closest(".toc-item");if(!M)return;const T=document.getElementById("course-sec-"+M.dataset.id);T&&(d(T.offsetTop-90),s.querySelectorAll(".toc-item").forEach(I=>I.classList.toggle("active",I===M)))});function P(){let _=ke[0].id;for(const M of ke){const T=document.getElementById("course-sec-"+M.id);T&&T.offsetTop-120<=u.scrollTop&&(_=M.id)}s.querySelectorAll(".toc-item").forEach(M=>M.classList.toggle("active",M.dataset.id===_)),r.value!==_&&(r.value=_)}u.addEventListener("scroll",P,{passive:!0}),r.addEventListener("change",()=>{const _=document.getElementById("course-sec-"+r.value);_&&d(_.offsetTop-90)}),l.addEventListener("click",n),c.addEventListener("click",e);function R(){h=!0,document.body.classList.add("mode-course"),setTimeout(()=>P(),80)}function L(){h=!1,document.body.classList.remove("mode-course"),g.forEach(_=>y(_))}return{open:R,close:L,isOpen:()=>h}}async function g_(){await Promise.allSettled([document.fonts.load("400 26px 'Century Gothic'"),document.fonts.load("700 26px 'Century Gothic'"),document.fonts.load("italic 400 26px 'Century Gothic'"),document.fonts.load("italic 700 26px 'Century Gothic'")]);const n=document.getElementById("scene"),t=ke.length,e=Ug(n,ke),i=Ng();let s=null;function r(_,M="smooth"){s?s.scrollTo(_,{duration:M==="smooth"?1.2:0,easing:T=>1-Math.pow(1-T,3)}):document.querySelector("#ui-course .course-main").scrollTo({top:_,behavior:M})}function o(_){const M=_==="course";a.isOpen()&&a.close(),M&&a.open(),document.getElementById("mode-journey").classList.toggle("active",!M),document.getElementById("mode-course-btn").classList.toggle("active",M),M?(g.stop(),s==null||s.start()):(s==null||s.stop(),g.start())}const a=m_({onExit:()=>o("journey"),onScrollTo:r,onQuiz:()=>{o("journey"),setTimeout(()=>{const _=Math.max(1,f.offsetHeight-window.innerHeight);g.scrollTo(_,{duration:1.6})},120)}});document.getElementById("mode-journey").addEventListener("click",()=>o("journey")),document.getElementById("mode-course-btn").addEventListener("click",()=>o("course"));const l='<svg class="dn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4.5"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.2 5.2l1.6 1.6M17.2 17.2l1.6 1.6M18.8 5.2l-1.6 1.6M6.8 17.2l-1.6 1.6"/></svg>',c='<svg class="dn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>',u=document.getElementById("ui-daynight");function d(_){e.setNight(_),u.classList.toggle("night",_),u.setAttribute("aria-pressed",String(_)),u.innerHTML=(_?c:l)+(_?" Nuit":" Jour");try{localStorage.setItem("panneau-night",_?"1":"0")}catch{}}u.addEventListener("click",()=>d(!u.classList.contains("night")));let h=!1;try{h=localStorage.getItem("panneau-night")==="1"}catch{}d(h);const p=t+2,f=document.getElementById("scroll");function v(){const _=p*window.innerHeight;f.style.height=_+"px"}v();const g=new il({duration:1.12,smoothWheel:!0,touchMultiplier:1.5,wheelMultiplier:1}),m=document.querySelector("#ui-course .course-main");s=new il({wrapper:m,content:m,duration:1.15,smoothWheel:!0,touchMultiplier:1.6,wheelMultiplier:1});function S(_){g.raf(_),s&&s.raf(_),requestAnimationFrame(S)}requestAnimationFrame(S);let x=0,y=0;function U(_){const M=Math.max(1,f.offsetHeight-window.innerHeight),T=Math.min(1,Math.max(0,_/M));x=T;const I=Math.floor(T*p)-1;y=Math.max(0,Math.min(t-1,I))}g.on("scroll",({scroll:_})=>{U(_)}),U(window.scrollY||0),e.update(x,y);function P(){e.update(x,y),i.updateGlobal(x,y),e.render(),requestAnimationFrame(P)}requestAnimationFrame(P),window.addEventListener("resize",()=>{v(),e.resize(),U(window.scrollY||0)}),window.addEventListener("keydown",_=>{if(a.isOpen()){_.key==="Escape"?o("journey"):_.key==="ArrowDown"||_.key==="PageDown"?(_.preventDefault(),r(m.scrollTop+window.innerHeight*.8)):(_.key==="ArrowUp"||_.key==="PageUp")&&(_.preventDefault(),r(m.scrollTop-window.innerHeight*.8));return}if(i.isReaderOpen()){_.key==="Escape"?i.closeReader():_.key==="ArrowLeft"?i.readerNav(-1):_.key==="ArrowRight"&&i.readerNav(1);return}if(_.key==="Enter"&&y>=0&&!i.quizOpen()){i.openReader(y);return}if(["1","2","3","4"].includes(_.key)&&i.quizOpen()){_.preventDefault(),i.answerQuiz(Number(_.key)-1);return}const T=window.innerHeight;_.key==="ArrowDown"||_.key==="PageDown"?(_.preventDefault(),g.scrollTo(window.scrollY+T,{duration:1.1})):(_.key==="ArrowUp"||_.key==="PageUp")&&(_.preventDefault(),g.scrollTo(Math.max(0,window.scrollY-T),{duration:1.1}))}),i.setReaderListener(_=>{_?g.stop():g.start()});function R(_){return{nx:_.clientX/window.innerWidth*2-1,ny:-(_.clientY/window.innerHeight)*2+1}}window.addEventListener("click",_=>{if(a.isOpen()||i.isReaderOpen()||_.target.closest&&_.target.closest("#ui"))return;const{nx:M,ny:T}=R(_),I=e.pick(M,T);I&&(I.kind==="panel"?i.openReader(I.index):I.kind==="sign"&&i.showToast(I.tip))});let L=!1;window.addEventListener("mousemove",_=>{L||(L=!0,requestAnimationFrame(()=>{if(L=!1,a.isOpen()||i.isReaderOpen())return;const{nx:M,ny:T}=R(_),I=e.pick(M,T);document.body.classList.toggle("hover-pick",!!I),e.setHover(I&&I.kind==="panel"?I.index:-1)}))}),window.__panneautique={openReader:i.openReader,closeReader:i.closeReader,openCourse:()=>o("course"),closeCourse:()=>o("journey"),pickAt:(_,M)=>{const T=e.pick(_/window.innerWidth*2-1,-(M/window.innerHeight)*2+1);return T?{kind:T.kind,index:T.index,tip:T.tip}:null},getState:()=>{const _=e.getCameraPos();return{progress:x,activeIndex:y,cam:{x:_.x,y:_.y,z:_.z}}},settle:(_,M)=>{for(let I=0;I<2400;I++)e.update(_,M);const T=e.getCameraPos();return{cam:{x:T.x,y:T.y,z:T.z},progress:_,activeIndex:M}}},setTimeout(()=>{document.getElementById("ui-topbar").classList.add("visible"),document.getElementById("ui-dots").classList.add("visible"),document.getElementById("ui-hint").classList.add("visible")},1200),document.querySelectorAll(".dot").forEach((_,M)=>{_.addEventListener("click",()=>{const T=(M+1.5)/p,I=Math.max(1,f.offsetHeight-window.innerHeight);g.scrollTo(Math.round(T*I),{duration:1.4})})})}g_();
