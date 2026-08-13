var Sd=Object.defineProperty;var wd=(n,t,e)=>t in n?Sd(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var kt=(n,t,e)=>wd(n,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function e(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(s){if(s.ep)return;s.ep=!0;const o=e(s);fetch(s.href,o)}})();var Xl="1.3.26";function yu(n,t,e){return Math.max(n,Math.min(t,e))}function bd(n,t,e){return(1-e)*n+e*t}function Ed(n,t,e,i){return bd(n,t,1-Math.exp(-e*i))}function Td(n,t){return(n%t+t)%t}var Ad=class{constructor(){kt(this,"isRunning",!1);kt(this,"value",0);kt(this,"from",0);kt(this,"to",0);kt(this,"currentTime",0);kt(this,"lerp");kt(this,"duration");kt(this,"easing");kt(this,"onUpdate")}advance(n){var e;if(!this.isRunning)return;let t=!1;if(this.duration&&this.easing){this.currentTime+=n;const i=yu(0,this.currentTime/this.duration,1);t=i>=1;const s=t?1:this.easing(i);this.value=this.from+(this.to-this.from)*s}else this.lerp?(this.value=Ed(this.value,this.to,this.lerp*60,n),Math.round(this.value)===Math.round(this.to)&&(this.value=this.to,t=!0)):(this.value=this.to,t=!0);t&&this.stop(),(e=this.onUpdate)==null||e.call(this,this.value,t)}stop(){this.isRunning=!1}fromTo(n,t,{lerp:e,duration:i,easing:s,onStart:o,onUpdate:r}){this.from=this.value=n,this.to=t,this.lerp=e,this.duration=i,this.easing=s,this.currentTime=0,this.isRunning=!0,o==null||o(),this.onUpdate=r}};function Cd(n,t){let e;return function(...i){clearTimeout(e),e=setTimeout(()=>{e=void 0,n.apply(this,i)},t)}}var Rd=class{constructor(n,t,{autoResize:e=!0,debounce:i=250}={}){kt(this,"width",0);kt(this,"height",0);kt(this,"scrollHeight",0);kt(this,"scrollWidth",0);kt(this,"debouncedResize");kt(this,"wrapperResizeObserver");kt(this,"contentResizeObserver");kt(this,"resize",()=>{this.onWrapperResize(),this.onContentResize()});kt(this,"onWrapperResize",()=>{this.wrapper instanceof Window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)});kt(this,"onContentResize",()=>{this.wrapper instanceof Window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)});this.wrapper=n,this.content=t,e&&(this.debouncedResize=Cd(this.resize,i),this.wrapper instanceof Window?window.addEventListener("resize",this.debouncedResize):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){var n,t;(n=this.wrapperResizeObserver)==null||n.disconnect(),(t=this.contentResizeObserver)==null||t.disconnect(),this.wrapper===window&&this.debouncedResize&&window.removeEventListener("resize",this.debouncedResize)}get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},xu=class{constructor(){kt(this,"events",{})}emit(n,...t){var i;const e=this.events[n]||[];for(let s=0,o=e.length;s<o;s++)(i=e[s])==null||i.call(e,...t)}on(n,t){return this.events[n]?this.events[n].push(t):this.events[n]=[t],()=>{var e;this.events[n]=(e=this.events[n])==null?void 0:e.filter(i=>t!==i)}}off(n,t){var e;this.events[n]=(e=this.events[n])==null?void 0:e.filter(i=>t!==i)}destroy(){this.events={}}};const Pd=100/6,Si={passive:!1};function Yl(n,t){return n===1?Pd:n===2?t:1}var Ld=class{constructor(n,t={wheelMultiplier:1,touchMultiplier:1}){kt(this,"touchStart",{x:0,y:0});kt(this,"lastDelta",{x:0,y:0});kt(this,"window",{width:0,height:0});kt(this,"emitter",new xu);kt(this,"onTouchStart",n=>{const{clientX:t,clientY:e}=n.targetTouches?n.targetTouches[0]:n;this.touchStart.x=t,this.touchStart.y=e,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:n})});kt(this,"onTouchMove",n=>{const{clientX:t,clientY:e}=n.targetTouches?n.targetTouches[0]:n,i=-(t-this.touchStart.x)*this.options.touchMultiplier,s=-(e-this.touchStart.y)*this.options.touchMultiplier;this.touchStart.x=t,this.touchStart.y=e,this.lastDelta={x:i,y:s},this.emitter.emit("scroll",{deltaX:i,deltaY:s,event:n})});kt(this,"onTouchEnd",n=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:n})});kt(this,"onWheel",n=>{let{deltaX:t,deltaY:e,deltaMode:i}=n;const s=Yl(i,this.window.width),o=Yl(i,this.window.height);t*=s,e*=o,t*=this.options.wheelMultiplier,e*=this.options.wheelMultiplier,this.emitter.emit("scroll",{deltaX:t,deltaY:e,event:n})});kt(this,"onWindowResize",()=>{this.window={width:window.innerWidth,height:window.innerHeight}});this.element=n,this.options=t,window.addEventListener("resize",this.onWindowResize),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,Si),this.element.addEventListener("touchstart",this.onTouchStart,Si),this.element.addEventListener("touchmove",this.onTouchMove,Si),this.element.addEventListener("touchend",this.onTouchEnd,Si)}on(n,t){return this.emitter.on(n,t)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize),this.element.removeEventListener("wheel",this.onWheel,Si),this.element.removeEventListener("touchstart",this.onTouchStart,Si),this.element.removeEventListener("touchmove",this.onTouchMove,Si),this.element.removeEventListener("touchend",this.onTouchEnd,Si)}};const $l=n=>Math.min(1,1.001-2**(-10*n));var Ca=class{constructor({wrapper:n=window,content:t=document.documentElement,eventsTarget:e=n,smoothWheel:i=!0,syncTouch:s=!1,syncTouchLerp:o=.075,touchInertiaExponent:r=1.7,duration:a,easing:l,lerp:c=.1,infinite:u=!1,orientation:d="vertical",gestureOrientation:h=d==="horizontal"?"both":"vertical",touchMultiplier:f=1,wheelMultiplier:m=1,autoResize:v=!0,prevent:g,virtualScroll:p,overscroll:S=!0,autoRaf:w=!1,anchors:M=!1,autoToggle:E=!1,allowNestedScroll:P=!1,__experimental__naiveDimensions:I=!1,naiveDimensions:N=I,stopInertiaOnNavigate:y=!1,respectReducedMotion:x=!0}={}){kt(this,"_isScrolling",!1);kt(this,"_isStopped",!1);kt(this,"_isLocked",!1);kt(this,"_preventNextNativeScrollEvent",!1);kt(this,"_resetVelocityTimeout",null);kt(this,"_rafId",null);kt(this,"_isDraggingSelection",!1);kt(this,"reducedMotionMediaQuery",window.matchMedia("(prefers-reduced-motion: reduce)"));kt(this,"isTouching");kt(this,"isIos");kt(this,"time",0);kt(this,"userData",{});kt(this,"lastVelocity",0);kt(this,"velocity",0);kt(this,"direction",0);kt(this,"options");kt(this,"targetScroll");kt(this,"animatedScroll");kt(this,"animate",new Ad);kt(this,"emitter",new xu);kt(this,"dimensions");kt(this,"virtualScroll");kt(this,"onScrollEnd",n=>{n instanceof CustomEvent||(this.isScrolling==="smooth"||this.isScrolling===!1)&&n.stopPropagation()});kt(this,"dispatchScrollendEvent",()=>{this.options.wrapper.dispatchEvent(new CustomEvent("scrollend",{bubbles:this.options.wrapper===window,detail:{lenisScrollEnd:!0}}))});kt(this,"onTransitionEnd",n=>{var t;(t=n.propertyName)!=null&&t.includes("overflow")&&n.target===this.rootElement&&this.checkOverflow()});kt(this,"onClick",n=>{const t=n.composedPath().filter(i=>i instanceof HTMLAnchorElement&&i.href).map(i=>new URL(i.href)),e=new URL(window.location.href);if(this.options.anchors){const i=t.find(s=>e.host===s.host&&e.pathname===s.pathname&&s.hash);if(i){const s=typeof this.options.anchors=="object"&&this.options.anchors?this.options.anchors:void 0,o=decodeURIComponent(i.hash);this.scrollTo(o,s);return}}if(this.options.stopInertiaOnNavigate&&t.some(i=>e.host===i.host&&e.pathname!==i.pathname)){this.reset();return}});kt(this,"onPointerDown",n=>{n.button===1&&this.reset()});kt(this,"onVirtualScroll",n=>{if(typeof this.options.virtualScroll=="function"&&this.options.virtualScroll(n)===!1)return;const{deltaX:t,deltaY:e,event:i}=n;if(this.emitter.emit("virtual-scroll",{deltaX:t,deltaY:e,event:i}),i.ctrlKey||i.lenisStopPropagation)return;const s=i.type.includes("touch"),o=i.type.includes("wheel");if(s&&this.isIos&&(i.type==="touchstart"&&(this._isDraggingSelection=this.isTouchOnSelectionHandle(i)),this._isDraggingSelection)){i.type==="touchend"&&(this._isDraggingSelection=!1);return}this.isTouching=i.type==="touchstart"||i.type==="touchmove";const r=t===0&&e===0;if(this.options.syncTouch&&s&&i.type==="touchstart"&&r&&!this.isStopped&&!this.isLocked){this.reset();return}const a=this.options.gestureOrientation==="vertical"&&e===0||this.options.gestureOrientation==="horizontal"&&t===0;if(r||a)return;let l=i.composedPath();l=l.slice(0,l.indexOf(this.rootElement));const c=this.options.prevent,u=Math.abs(t)>=Math.abs(e)?"horizontal":"vertical";if(l.find(m=>{var v,g,p,S,w;return m instanceof HTMLElement&&(typeof c=="function"&&(c==null?void 0:c(m))||((v=m.hasAttribute)==null?void 0:v.call(m,"data-lenis-prevent"))||u==="vertical"&&((g=m.hasAttribute)==null?void 0:g.call(m,"data-lenis-prevent-vertical"))||u==="horizontal"&&((p=m.hasAttribute)==null?void 0:p.call(m,"data-lenis-prevent-horizontal"))||s&&((S=m.hasAttribute)==null?void 0:S.call(m,"data-lenis-prevent-touch"))||o&&((w=m.hasAttribute)==null?void 0:w.call(m,"data-lenis-prevent-wheel"))||this.options.allowNestedScroll&&this.hasNestedScroll(m,{deltaX:t,deltaY:e}))}))return;if(this.isStopped||this.isLocked){i.cancelable&&i.preventDefault();return}if(!(this.options.syncTouch&&s||this.options.smoothWheel&&o)){this.isScrolling="native",this.animate.stop(),i.lenisStopPropagation=!0;return}let d=e;this.options.gestureOrientation==="both"?d=Math.abs(e)>Math.abs(t)?e:t:this.options.gestureOrientation==="horizontal"&&(d=t),(!this.options.overscroll||this.options.infinite||this.options.wrapper!==window&&this.limit>0&&(this.animatedScroll>0&&this.animatedScroll<this.limit||this.animatedScroll===0&&e>0||this.animatedScroll===this.limit&&e<0))&&(i.lenisStopPropagation=!0),i.cancelable&&i.preventDefault();const h=s&&this.options.syncTouch,f=s&&i.type==="touchend";f&&(d=Math.sign(d)*Math.abs(this.velocity)**this.options.touchInertiaExponent),this.scrollTo(this.targetScroll+d,{programmatic:!1,...h?{lerp:f?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}})});kt(this,"onNativeScroll",()=>{if(this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this._preventNextNativeScrollEvent){this._preventNextNativeScrollEvent=!1;return}if(this.isScrolling===!1||this.isScrolling==="native"){const n=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-n,this.direction=Math.sign(this.animatedScroll-n),this.isStopped||(this.isScrolling="native"),this.emit(),this.velocity!==0&&(this._resetVelocityTimeout=setTimeout(()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()},400))}});kt(this,"raf",n=>{const t=n-(this.time||n);this.time=n,this.animate.advance(t*.001),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))});window.lenisVersion=Xl,window.lenis||(window.lenis={}),window.lenis.version=Xl,d==="horizontal"&&(window.lenis.horizontal=!0),s===!0&&(window.lenis.touch=!0),this.isIos=/(iPad|iPhone|iPod)/g.test(navigator.userAgent),(!n||n===document.documentElement)&&(n=window),typeof a=="number"&&typeof l!="function"?l=$l:typeof l=="function"&&typeof a!="number"&&(a=1),this.options={wrapper:n,content:t,eventsTarget:e,smoothWheel:i,syncTouch:s,syncTouchLerp:o,touchInertiaExponent:r,duration:a,easing:l,lerp:c,infinite:u,gestureOrientation:h,orientation:d,touchMultiplier:f,wheelMultiplier:m,autoResize:v,prevent:g,virtualScroll:p,overscroll:S,autoRaf:w,anchors:M,autoToggle:E,allowNestedScroll:P,naiveDimensions:N,stopInertiaOnNavigate:y,respectReducedMotion:x},this.dimensions=new Rd(n,t,{autoResize:v}),this.updateClassName(),this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll),this.options.wrapper.addEventListener("scrollend",this.onScrollEnd,{capture:!0}),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.addEventListener("click",this.onClick),this.options.wrapper.addEventListener("pointerdown",this.onPointerDown),this.virtualScroll=new Ld(e,{touchMultiplier:f,wheelMultiplier:m}),this.virtualScroll.on("scroll",this.onVirtualScroll),this.options.autoToggle&&(this.checkOverflow(),this.rootElement.addEventListener("transitionend",this.onTransitionEnd)),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll),this.options.wrapper.removeEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.wrapper.removeEventListener("pointerdown",this.onPointerDown),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.removeEventListener("click",this.onClick),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName(),this._rafId&&cancelAnimationFrame(this._rafId)}on(n,t){return this.emitter.on(n,t)}off(n,t){return this.emitter.off(n,t)}get overflow(){const n=this.isHorizontal?"overflow-x":"overflow-y";return getComputedStyle(this.rootElement)[n]}checkOverflow(){["hidden","clip"].includes(this.overflow)?this.internalStop():this.internalStart()}setScroll(n){this.isHorizontal?this.options.wrapper.scrollTo({left:n,behavior:"instant"}):this.options.wrapper.scrollTo({top:n,behavior:"instant"})}isTouchOnSelectionHandle(n){const t=window.getSelection();if(!t||t.isCollapsed||t.rangeCount===0)return!1;const e=n.targetTouches[0]??n.changedTouches[0];if(!e)return!1;const i=t.getRangeAt(0).getClientRects();if(i.length===0)return!1;const s=i[0],o=i[i.length-1],r=40,a=Math.hypot(e.clientX-s.left,e.clientY-s.top)<=r,l=Math.hypot(e.clientX-o.right,e.clientY-o.bottom)<=r;return a||l}resize(){this.dimensions.resize(),this.animatedScroll=this.targetScroll=this.actualScroll,this.emit()}emit(){this.emitter.emit("scroll",this)}reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){if(this.isStopped){if(this.options.autoToggle){this.rootElement.style.removeProperty("overflow");return}this.internalStart()}}internalStart(){this.isStopped&&(this.reset(),this.isStopped=!1,this.emit())}stop(){if(!this.isStopped){if(this.options.autoToggle){this.rootElement.style.setProperty("overflow","clip");return}this.internalStop()}}internalStop(){this.isStopped||(this.reset(),this.isStopped=!0,this.emit())}scrollTo(n,{offset:t=0,immediate:e=!1,lock:i=!1,programmatic:s=!0,lerp:o=s?this.options.lerp:void 0,duration:r=s?this.options.duration:void 0,easing:a=s?this.options.easing:void 0,onStart:l,onComplete:c,force:u=!1,userData:d}={}){if(this.prefersReducedMotion&&(s?e=!0:(o=1,r=void 0,a=void 0)),(this.isStopped||this.isLocked)&&!u)return;let h=n,f=t;if(typeof h=="string"&&["top","left","start","#"].includes(h))h=0;else if(typeof h=="string"&&["bottom","right","end"].includes(h))h=this.limit;else{let m=null;if(typeof h=="string"?(m=h.startsWith("#")?document.getElementById(h.slice(1)):document.querySelector(h),m||(h==="#top"?h=0:console.warn("Lenis: Target not found",h))):h instanceof HTMLElement&&(h!=null&&h.nodeType)&&(m=h),m){if(this.options.wrapper!==window){const M=this.rootElement.getBoundingClientRect();f-=this.isHorizontal?M.left:M.top}const v=m.getBoundingClientRect(),g=getComputedStyle(m),p=this.isHorizontal?Number.parseFloat(g.scrollMarginLeft):Number.parseFloat(g.scrollMarginTop),S=getComputedStyle(this.rootElement),w=this.isHorizontal?Number.parseFloat(S.scrollPaddingLeft):Number.parseFloat(S.scrollPaddingTop);h=(this.isHorizontal?v.left:v.top)+this.animatedScroll-(Number.isNaN(p)?0:p)-(Number.isNaN(w)?0:w)}}if(typeof h=="number"){if(h+=f,this.options.infinite){if(s){this.targetScroll=this.animatedScroll=this.scroll;const m=h-this.animatedScroll;m>this.limit/2?h-=this.limit:m<-this.limit/2&&(h+=this.limit)}}else h=yu(0,h,this.limit);if(h===this.targetScroll){l==null||l(this),c==null||c(this);return}if(this.userData=d??{},e){this.animatedScroll=this.targetScroll=h,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),c==null||c(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()});return}s||(this.targetScroll=h),typeof r=="number"&&typeof a!="function"?a=$l:typeof a=="function"&&typeof r!="number"&&(r=1),this.animate.fromTo(this.animatedScroll,h,{duration:r,easing:a,lerp:o,onStart:()=>{i&&(this.isLocked=!0),this.isScrolling="smooth",l==null||l(this)},onUpdate:(m,v)=>{this.isScrolling="smooth",this.lastVelocity=this.velocity,this.velocity=m-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=m,this.setScroll(this.scroll),s&&(this.targetScroll=m),v||this.emit(),v&&(this.reset(),this.emit(),c==null||c(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()}),this.preventNextNativeScrollEvent())}})}}preventNextNativeScrollEvent(){this._preventNextNativeScrollEvent=!0,requestAnimationFrame(()=>{this._preventNextNativeScrollEvent=!1})}hasNestedScroll(n,{deltaX:t,deltaY:e}){const i=Date.now();n._lenis||(n._lenis={});const s=n._lenis;let o,r,a,l,c,u,d,h,f,m;if(i-(s.time??0)>2e3){s.time=Date.now();const P=window.getComputedStyle(n);if(s.computedStyle=P,o=["auto","overlay","scroll"].includes(P.overflowX),r=["auto","overlay","scroll"].includes(P.overflowY),c=["auto"].includes(P.overscrollBehaviorX),u=["auto"].includes(P.overscrollBehaviorY),s.hasOverflowX=o,s.hasOverflowY=r,!(o||r))return!1;d=n.scrollWidth,h=n.scrollHeight,f=n.clientWidth,m=n.clientHeight,a=d>f,l=h>m,s.isScrollableX=a,s.isScrollableY=l,s.scrollWidth=d,s.scrollHeight=h,s.clientWidth=f,s.clientHeight=m,s.hasOverscrollBehaviorX=c,s.hasOverscrollBehaviorY=u}else a=s.isScrollableX,l=s.isScrollableY,o=s.hasOverflowX,r=s.hasOverflowY,d=s.scrollWidth,h=s.scrollHeight,f=s.clientWidth,m=s.clientHeight,c=s.hasOverscrollBehaviorX,u=s.hasOverscrollBehaviorY;if(!(o&&a||r&&l))return!1;const v=Math.abs(t)>=Math.abs(e)?"horizontal":"vertical";let g,p,S,w,M,E;if(v==="horizontal")g=Math.round(n.scrollLeft),p=d-f,S=t,w=o,M=a,E=c;else if(v==="vertical")g=Math.round(n.scrollTop),p=h-m,S=e,w=r,M=l,E=u;else return!1;return!E&&(g>=p||g<=0)?!0:(S>0?g<p:g>0)&&w&&M}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return this.options.orientation==="horizontal"}get actualScroll(){const n=this.options.wrapper;return this.isHorizontal?n.scrollX??n.scrollLeft:n.scrollY??n.scrollTop}get scroll(){return this.options.infinite?Td(this.animatedScroll,this.limit):this.animatedScroll}get progress(){return this.limit===0?1:this.scroll/this.limit}get isScrolling(){return this._isScrolling}set isScrolling(n){this._isScrolling!==n&&(this._isScrolling=n,this.updateClassName())}get isStopped(){return this._isStopped}set isStopped(n){this._isStopped!==n&&(this._isStopped=n,this.updateClassName())}get isLocked(){return this._isLocked}set isLocked(n){this._isLocked!==n&&(this._isLocked=n,this.updateClassName())}get isSmooth(){return this.isScrolling==="smooth"}get prefersReducedMotion(){return this.options.respectReducedMotion&&this.reducedMotionMediaQuery.matches}get className(){let n="lenis";return this.options.autoToggle&&(n+=" lenis-autoToggle"),this.isStopped&&(n+=" lenis-stopped"),this.isLocked&&(n+=" lenis-locked"),this.isScrolling&&(n+=" lenis-scrolling"),this.isScrolling==="smooth"&&(n+=" lenis-smooth"),n}updateClassName(){this.cleanUpClassName(),this.className.split(" ").forEach(n=>{this.rootElement.classList.add(n)})}cleanUpClassName(){for(const n of Array.from(this.rootElement.classList))(n==="lenis"||n.startsWith("lenis-"))&&this.rootElement.classList.remove(n)}};/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const _l="170",Id=0,Zl=1,Dd=2,Ml=1,yl=2,ai=3,Ui=0,rn=1,Oe=2,hi=0,es=1,He=2,Kl=3,jl=4,Ud=5,ji=100,Nd=101,zd=102,Fd=103,Od=104,Bd=200,kd=201,Gd=202,Hd=203,Ra=204,Pa=205,Vd=206,Wd=207,qd=208,Xd=209,Yd=210,$d=211,Zd=212,Kd=213,jd=214,La=0,Ia=1,Da=2,Ds=3,Ua=4,Na=5,za=6,Fa=7,xl=0,Jd=1,Qd=2,Di=0,Su=1,wu=2,bu=3,wo=4,th=5,Eu=6,Tu=7,Au=300,Us=301,Ns=302,Oa=303,Ba=304,Cr=306,Ni=1e3,Qi=1001,ka=1002,Bn=1003,eh=1004,Io=1005,qn=1006,zr=1007,ts=1008,gi=1009,Cu=1010,Ru=1011,Mo=1012,Sl=1013,is=1014,ui=1015,fi=1016,wl=1017,bl=1018,zs=1020,Pu=35902,Lu=1021,Iu=1022,Fn=1023,Du=1024,Uu=1025,Rs=1026,Fs=1027,Nu=1028,El=1029,zu=1030,Tl=1031,Al=1033,ur=33776,dr=33777,hr=33778,fr=33779,Ga=35840,Ha=35841,Va=35842,Wa=35843,qa=36196,Xa=37492,Ya=37496,$a=37808,Za=37809,Ka=37810,ja=37811,Ja=37812,Qa=37813,tl=37814,el=37815,nl=37816,il=37817,sl=37818,ol=37819,rl=37820,al=37821,pr=36492,ll=36494,cl=36495,Fu=36283,ul=36284,dl=36285,hl=36286,nh=3200,ih=3201,Cl=0,sh=1,Pi="",ye="srgb",Hs="srgb-linear",Rr="linear",_e="srgb",ls=7680,Jl=519,oh=512,rh=513,ah=514,Ou=515,lh=516,ch=517,uh=518,dh=519,fl=35044,Ql="300 es",di=2e3,_r=2001;class Vs{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const o=s.indexOf(e);o!==-1&&s.splice(o,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const i=this._listeners[t.type];if(i!==void 0){t.target=this;const s=i.slice(0);for(let o=0,r=s.length;o<r;o++)s[o].call(this,t);t.target=null}}}const nn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let tc=1234567;const po=Math.PI/180,yo=180/Math.PI;function pi(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(nn[n&255]+nn[n>>8&255]+nn[n>>16&255]+nn[n>>24&255]+"-"+nn[t&255]+nn[t>>8&255]+"-"+nn[t>>16&15|64]+nn[t>>24&255]+"-"+nn[e&63|128]+nn[e>>8&255]+"-"+nn[e>>16&255]+nn[e>>24&255]+nn[i&255]+nn[i>>8&255]+nn[i>>16&255]+nn[i>>24&255]).toLowerCase()}function Qe(n,t,e){return Math.max(t,Math.min(e,n))}function Rl(n,t){return(n%t+t)%t}function hh(n,t,e,i,s){return i+(n-t)*(s-i)/(e-t)}function fh(n,t,e){return n!==t?(e-n)/(t-n):0}function mo(n,t,e){return(1-e)*n+e*t}function ph(n,t,e,i){return mo(n,t,1-Math.exp(-e*i))}function mh(n,t=1){return t-Math.abs(Rl(n,t*2)-t)}function gh(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function vh(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function _h(n,t){return n+Math.floor(Math.random()*(t-n+1))}function Mh(n,t){return n+Math.random()*(t-n)}function yh(n){return n*(.5-Math.random())}function xh(n){n!==void 0&&(tc=n);let t=tc+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Sh(n){return n*po}function wh(n){return n*yo}function bh(n){return(n&n-1)===0&&n!==0}function Eh(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Th(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Ah(n,t,e,i,s){const o=Math.cos,r=Math.sin,a=o(e/2),l=r(e/2),c=o((t+i)/2),u=r((t+i)/2),d=o((t-i)/2),h=r((t-i)/2),f=o((i-t)/2),m=r((i-t)/2);switch(s){case"XYX":n.set(a*u,l*d,l*h,a*c);break;case"YZY":n.set(l*h,a*u,l*d,a*c);break;case"ZXZ":n.set(l*d,l*h,a*u,a*c);break;case"XZX":n.set(a*u,l*m,l*f,a*c);break;case"YXY":n.set(l*f,a*u,l*m,a*c);break;case"ZYZ":n.set(l*m,l*f,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function zn(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Me(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const Ke={DEG2RAD:po,RAD2DEG:yo,generateUUID:pi,clamp:Qe,euclideanModulo:Rl,mapLinear:hh,inverseLerp:fh,lerp:mo,damp:ph,pingpong:mh,smoothstep:gh,smootherstep:vh,randInt:_h,randFloat:Mh,randFloatSpread:yh,seededRandom:xh,degToRad:Sh,radToDeg:wh,isPowerOfTwo:bh,ceilPowerOfTwo:Eh,floorPowerOfTwo:Th,setQuaternionFromProperEuler:Ah,normalize:Me,denormalize:zn};class Et{constructor(t=0,e=0){Et.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Qe(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),s=Math.sin(e),o=this.x-t.x,r=this.y-t.y;return this.x=o*i-r*s+t.x,this.y=o*s+r*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ee{constructor(t,e,i,s,o,r,a,l,c){ee.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,o,r,a,l,c)}set(t,e,i,s,o,r,a,l,c){const u=this.elements;return u[0]=t,u[1]=s,u[2]=a,u[3]=e,u[4]=o,u[5]=l,u[6]=i,u[7]=r,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,o=this.elements,r=i[0],a=i[3],l=i[6],c=i[1],u=i[4],d=i[7],h=i[2],f=i[5],m=i[8],v=s[0],g=s[3],p=s[6],S=s[1],w=s[4],M=s[7],E=s[2],P=s[5],I=s[8];return o[0]=r*v+a*S+l*E,o[3]=r*g+a*w+l*P,o[6]=r*p+a*M+l*I,o[1]=c*v+u*S+d*E,o[4]=c*g+u*w+d*P,o[7]=c*p+u*M+d*I,o[2]=h*v+f*S+m*E,o[5]=h*g+f*w+m*P,o[8]=h*p+f*M+m*I,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],s=t[2],o=t[3],r=t[4],a=t[5],l=t[6],c=t[7],u=t[8];return e*r*u-e*a*c-i*o*u+i*a*l+s*o*c-s*r*l}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],o=t[3],r=t[4],a=t[5],l=t[6],c=t[7],u=t[8],d=u*r-a*c,h=a*l-u*o,f=c*o-r*l,m=e*d+i*h+s*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/m;return t[0]=d*v,t[1]=(s*c-u*i)*v,t[2]=(a*i-s*r)*v,t[3]=h*v,t[4]=(u*e-s*l)*v,t[5]=(s*o-a*e)*v,t[6]=f*v,t[7]=(i*l-c*e)*v,t[8]=(r*e-i*o)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,o,r,a){const l=Math.cos(o),c=Math.sin(o);return this.set(i*l,i*c,-i*(l*r+c*a)+r+t,-s*c,s*l,-s*(-c*r+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Fr.makeScale(t,e)),this}rotate(t){return this.premultiply(Fr.makeRotation(-t)),this}translate(t,e){return this.premultiply(Fr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Fr=new ee;function Bu(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function Mr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Ch(){const n=Mr("canvas");return n.style.display="block",n}const ec={};function lo(n){n in ec||(ec[n]=!0,console.warn(n))}function Rh(n,t,e){return new Promise(function(i,s){function o(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(o,e);break;default:i()}}setTimeout(o,e)})}function Ph(n){const t=n.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Lh(n){const t=n.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const fe={enabled:!0,workingColorSpace:Hs,spaces:{},convert:function(n,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===_e&&(n.r=mi(n.r),n.g=mi(n.g),n.b=mi(n.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(n.applyMatrix3(this.spaces[t].toXYZ),n.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===_e&&(n.r=Ps(n.r),n.g=Ps(n.g),n.b=Ps(n.b))),n},fromWorkingColorSpace:function(n,t){return this.convert(n,this.workingColorSpace,t)},toWorkingColorSpace:function(n,t){return this.convert(n,t,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===Pi?Rr:this.spaces[n].transfer},getLuminanceCoefficients:function(n,t=this.workingColorSpace){return n.fromArray(this.spaces[t].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,t,e){return n.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace}};function mi(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Ps(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}const nc=[.64,.33,.3,.6,.15,.06],ic=[.2126,.7152,.0722],sc=[.3127,.329],oc=new ee().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),rc=new ee().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);fe.define({[Hs]:{primaries:nc,whitePoint:sc,transfer:Rr,toXYZ:oc,fromXYZ:rc,luminanceCoefficients:ic,workingColorSpaceConfig:{unpackColorSpace:ye},outputColorSpaceConfig:{drawingBufferColorSpace:ye}},[ye]:{primaries:nc,whitePoint:sc,transfer:_e,toXYZ:oc,fromXYZ:rc,luminanceCoefficients:ic,outputColorSpaceConfig:{drawingBufferColorSpace:ye}}});let cs;class Ih{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{cs===void 0&&(cs=Mr("canvas")),cs.width=t.width,cs.height=t.height;const i=cs.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=cs}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Mr("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const s=i.getImageData(0,0,t.width,t.height),o=s.data;for(let r=0;r<o.length;r++)o[r]=mi(o[r]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(mi(e[i]/255)*255):e[i]=mi(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Dh=0;class ku{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Dh++}),this.uuid=pi(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let o;if(Array.isArray(s)){o=[];for(let r=0,a=s.length;r<a;r++)s[r].isDataTexture?o.push(Or(s[r].image)):o.push(Or(s[r]))}else o=Or(s);i.url=o}return e||(t.images[this.uuid]=i),i}}function Or(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Ih.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Uh=0;class mn extends Vs{constructor(t=mn.DEFAULT_IMAGE,e=mn.DEFAULT_MAPPING,i=Qi,s=Qi,o=qn,r=ts,a=Fn,l=gi,c=mn.DEFAULT_ANISOTROPY,u=Pi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Uh++}),this.uuid=pi(),this.name="",this.source=new ku(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=o,this.minFilter=r,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Et(0,0),this.repeat=new Et(1,1),this.center=new Et(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ee,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Au)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ni:t.x=t.x-Math.floor(t.x);break;case Qi:t.x=t.x<0?0:1;break;case ka:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ni:t.y=t.y-Math.floor(t.y);break;case Qi:t.y=t.y<0?0:1;break;case ka:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}mn.DEFAULT_IMAGE=null;mn.DEFAULT_MAPPING=Au;mn.DEFAULT_ANISOTROPY=1;class be{constructor(t=0,e=0,i=0,s=1){be.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,o=this.w,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s+r[12]*o,this.y=r[1]*e+r[5]*i+r[9]*s+r[13]*o,this.z=r[2]*e+r[6]*i+r[10]*s+r[14]*o,this.w=r[3]*e+r[7]*i+r[11]*s+r[15]*o,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,o;const l=t.elements,c=l[0],u=l[4],d=l[8],h=l[1],f=l[5],m=l[9],v=l[2],g=l[6],p=l[10];if(Math.abs(u-h)<.01&&Math.abs(d-v)<.01&&Math.abs(m-g)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+v)<.1&&Math.abs(m+g)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const w=(c+1)/2,M=(f+1)/2,E=(p+1)/2,P=(u+h)/4,I=(d+v)/4,N=(m+g)/4;return w>M&&w>E?w<.01?(i=0,s=.707106781,o=.707106781):(i=Math.sqrt(w),s=P/i,o=I/i):M>E?M<.01?(i=.707106781,s=0,o=.707106781):(s=Math.sqrt(M),i=P/s,o=N/s):E<.01?(i=.707106781,s=.707106781,o=0):(o=Math.sqrt(E),i=I/o,s=N/o),this.set(i,s,o,e),this}let S=Math.sqrt((g-m)*(g-m)+(d-v)*(d-v)+(h-u)*(h-u));return Math.abs(S)<.001&&(S=1),this.x=(g-m)/S,this.y=(d-v)/S,this.z=(h-u)/S,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Nh extends Vs{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new be(0,0,t,e),this.scissorTest=!1,this.viewport=new be(0,0,t,e);const s={width:t,height:e,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:qn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const o=new mn(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);o.flipY=!1,o.generateMipmaps=i.generateMipmaps,o.internalFormat=i.internalFormat,this.textures=[];const r=i.count;for(let a=0;a<r;a++)this.textures[a]=o.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,o=this.textures.length;s<o;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,s=t.textures.length;i<s;i++)this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new ku(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class kn extends Nh{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class Gu extends mn{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Bn,this.minFilter=Bn,this.wrapR=Qi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class zh extends mn{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Bn,this.minFilter=Bn,this.wrapR=Qi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class bo{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,o,r,a){let l=i[s+0],c=i[s+1],u=i[s+2],d=i[s+3];const h=o[r+0],f=o[r+1],m=o[r+2],v=o[r+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=u,t[e+3]=d;return}if(a===1){t[e+0]=h,t[e+1]=f,t[e+2]=m,t[e+3]=v;return}if(d!==v||l!==h||c!==f||u!==m){let g=1-a;const p=l*h+c*f+u*m+d*v,S=p>=0?1:-1,w=1-p*p;if(w>Number.EPSILON){const E=Math.sqrt(w),P=Math.atan2(E,p*S);g=Math.sin(g*P)/E,a=Math.sin(a*P)/E}const M=a*S;if(l=l*g+h*M,c=c*g+f*M,u=u*g+m*M,d=d*g+v*M,g===1-a){const E=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=E,c*=E,u*=E,d*=E}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=d}static multiplyQuaternionsFlat(t,e,i,s,o,r){const a=i[s],l=i[s+1],c=i[s+2],u=i[s+3],d=o[r],h=o[r+1],f=o[r+2],m=o[r+3];return t[e]=a*m+u*d+l*f-c*h,t[e+1]=l*m+u*h+c*d-a*f,t[e+2]=c*m+u*f+a*h-l*d,t[e+3]=u*m-a*d-l*h-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,s=t._y,o=t._z,r=t._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(s/2),d=a(o/2),h=l(i/2),f=l(s/2),m=l(o/2);switch(r){case"XYZ":this._x=h*u*d+c*f*m,this._y=c*f*d-h*u*m,this._z=c*u*m+h*f*d,this._w=c*u*d-h*f*m;break;case"YXZ":this._x=h*u*d+c*f*m,this._y=c*f*d-h*u*m,this._z=c*u*m-h*f*d,this._w=c*u*d+h*f*m;break;case"ZXY":this._x=h*u*d-c*f*m,this._y=c*f*d+h*u*m,this._z=c*u*m+h*f*d,this._w=c*u*d-h*f*m;break;case"ZYX":this._x=h*u*d-c*f*m,this._y=c*f*d+h*u*m,this._z=c*u*m-h*f*d,this._w=c*u*d+h*f*m;break;case"YZX":this._x=h*u*d+c*f*m,this._y=c*f*d+h*u*m,this._z=c*u*m-h*f*d,this._w=c*u*d-h*f*m;break;case"XZY":this._x=h*u*d-c*f*m,this._y=c*f*d-h*u*m,this._z=c*u*m+h*f*d,this._w=c*u*d+h*f*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+r)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],s=e[4],o=e[8],r=e[1],a=e[5],l=e[9],c=e[2],u=e[6],d=e[10],h=i+a+d;if(h>0){const f=.5/Math.sqrt(h+1);this._w=.25/f,this._x=(u-l)*f,this._y=(o-c)*f,this._z=(r-s)*f}else if(i>a&&i>d){const f=2*Math.sqrt(1+i-a-d);this._w=(u-l)/f,this._x=.25*f,this._y=(s+r)/f,this._z=(o+c)/f}else if(a>d){const f=2*Math.sqrt(1+a-i-d);this._w=(o-c)/f,this._x=(s+r)/f,this._y=.25*f,this._z=(l+u)/f}else{const f=2*Math.sqrt(1+d-i-a);this._w=(r-s)/f,this._x=(o+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Qe(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,s=t._y,o=t._z,r=t._w,a=e._x,l=e._y,c=e._z,u=e._w;return this._x=i*u+r*a+s*c-o*l,this._y=s*u+r*l+o*a-i*c,this._z=o*u+r*c+i*l-s*a,this._w=r*u-i*a-s*l-o*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,s=this._y,o=this._z,r=this._w;let a=r*t._w+i*t._x+s*t._y+o*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=r,this._x=i,this._y=s,this._z=o,this;const l=1-a*a;if(l<=Number.EPSILON){const f=1-e;return this._w=f*r+e*this._w,this._x=f*i+e*this._x,this._y=f*s+e*this._y,this._z=f*o+e*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),d=Math.sin((1-e)*u)/c,h=Math.sin(e*u)/c;return this._w=r*d+this._w*h,this._x=i*d+this._x*h,this._y=s*d+this._y*h,this._z=o*d+this._z*h,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),o=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),o*Math.sin(e),o*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class b{constructor(t=0,e=0,i=0){b.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(ac.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(ac.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,s=this.z,o=t.elements;return this.x=o[0]*e+o[3]*i+o[6]*s,this.y=o[1]*e+o[4]*i+o[7]*s,this.z=o[2]*e+o[5]*i+o[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,o=t.elements,r=1/(o[3]*e+o[7]*i+o[11]*s+o[15]);return this.x=(o[0]*e+o[4]*i+o[8]*s+o[12])*r,this.y=(o[1]*e+o[5]*i+o[9]*s+o[13])*r,this.z=(o[2]*e+o[6]*i+o[10]*s+o[14])*r,this}applyQuaternion(t){const e=this.x,i=this.y,s=this.z,o=t.x,r=t.y,a=t.z,l=t.w,c=2*(r*s-a*i),u=2*(a*e-o*s),d=2*(o*i-r*e);return this.x=e+l*c+r*d-a*u,this.y=i+l*u+a*c-o*d,this.z=s+l*d+o*u-r*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,s=this.z,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*s,this.y=o[1]*e+o[5]*i+o[9]*s,this.z=o[2]*e+o[6]*i+o[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,s=t.y,o=t.z,r=e.x,a=e.y,l=e.z;return this.x=s*l-o*a,this.y=o*r-i*l,this.z=i*a-s*r,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Br.copy(this).projectOnVector(t),this.sub(Br)}reflect(t){return this.sub(Br.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Qe(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Br=new b,ac=new bo;class Eo{constructor(t=new b(1/0,1/0,1/0),e=new b(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(In.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(In.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=In.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const o=i.getAttribute("position");if(e===!0&&o!==void 0&&t.isInstancedMesh!==!0)for(let r=0,a=o.count;r<a;r++)t.isMesh===!0?t.getVertexPosition(r,In):In.fromBufferAttribute(o,r),In.applyMatrix4(t.matrixWorld),this.expandByPoint(In);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Do.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Do.copy(i.boundingBox)),Do.applyMatrix4(t.matrixWorld),this.union(Do)}const s=t.children;for(let o=0,r=s.length;o<r;o++)this.expandByObject(s[o],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,In),In.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Js),Uo.subVectors(this.max,Js),us.subVectors(t.a,Js),ds.subVectors(t.b,Js),hs.subVectors(t.c,Js),wi.subVectors(ds,us),bi.subVectors(hs,ds),Bi.subVectors(us,hs);let e=[0,-wi.z,wi.y,0,-bi.z,bi.y,0,-Bi.z,Bi.y,wi.z,0,-wi.x,bi.z,0,-bi.x,Bi.z,0,-Bi.x,-wi.y,wi.x,0,-bi.y,bi.x,0,-Bi.y,Bi.x,0];return!kr(e,us,ds,hs,Uo)||(e=[1,0,0,0,1,0,0,0,1],!kr(e,us,ds,hs,Uo))?!1:(No.crossVectors(wi,bi),e=[No.x,No.y,No.z],kr(e,us,ds,hs,Uo))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,In).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(In).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(ei[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),ei[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),ei[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),ei[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),ei[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),ei[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),ei[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),ei[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(ei),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const ei=[new b,new b,new b,new b,new b,new b,new b,new b],In=new b,Do=new Eo,us=new b,ds=new b,hs=new b,wi=new b,bi=new b,Bi=new b,Js=new b,Uo=new b,No=new b,ki=new b;function kr(n,t,e,i,s){for(let o=0,r=n.length-3;o<=r;o+=3){ki.fromArray(n,o);const a=s.x*Math.abs(ki.x)+s.y*Math.abs(ki.y)+s.z*Math.abs(ki.z),l=t.dot(ki),c=e.dot(ki),u=i.dot(ki);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const Fh=new Eo,Qs=new b,Gr=new b;class To{constructor(t=new b,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):Fh.setFromPoints(t).getCenter(i);let s=0;for(let o=0,r=t.length;o<r;o++)s=Math.max(s,i.distanceToSquared(t[o]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Qs.subVectors(t,this.center);const e=Qs.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(Qs,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Gr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Qs.copy(t.center).add(Gr)),this.expandByPoint(Qs.copy(t.center).sub(Gr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const ni=new b,Hr=new b,zo=new b,Ei=new b,Vr=new b,Fo=new b,Wr=new b;class Pr{constructor(t=new b,e=new b(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,ni)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=ni.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(ni.copy(this.origin).addScaledVector(this.direction,e),ni.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){Hr.copy(t).add(e).multiplyScalar(.5),zo.copy(e).sub(t).normalize(),Ei.copy(this.origin).sub(Hr);const o=t.distanceTo(e)*.5,r=-this.direction.dot(zo),a=Ei.dot(this.direction),l=-Ei.dot(zo),c=Ei.lengthSq(),u=Math.abs(1-r*r);let d,h,f,m;if(u>0)if(d=r*l-a,h=r*a-l,m=o*u,d>=0)if(h>=-m)if(h<=m){const v=1/u;d*=v,h*=v,f=d*(d+r*h+2*a)+h*(r*d+h+2*l)+c}else h=o,d=Math.max(0,-(r*h+a)),f=-d*d+h*(h+2*l)+c;else h=-o,d=Math.max(0,-(r*h+a)),f=-d*d+h*(h+2*l)+c;else h<=-m?(d=Math.max(0,-(-r*o+a)),h=d>0?-o:Math.min(Math.max(-o,-l),o),f=-d*d+h*(h+2*l)+c):h<=m?(d=0,h=Math.min(Math.max(-o,-l),o),f=h*(h+2*l)+c):(d=Math.max(0,-(r*o+a)),h=d>0?o:Math.min(Math.max(-o,-l),o),f=-d*d+h*(h+2*l)+c);else h=r>0?-o:o,d=Math.max(0,-(r*h+a)),f=-d*d+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(Hr).addScaledVector(zo,h),f}intersectSphere(t,e){ni.subVectors(t.center,this.origin);const i=ni.dot(this.direction),s=ni.dot(ni)-i*i,o=t.radius*t.radius;if(s>o)return null;const r=Math.sqrt(o-s),a=i-r,l=i+r;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,o,r,a,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return c>=0?(i=(t.min.x-h.x)*c,s=(t.max.x-h.x)*c):(i=(t.max.x-h.x)*c,s=(t.min.x-h.x)*c),u>=0?(o=(t.min.y-h.y)*u,r=(t.max.y-h.y)*u):(o=(t.max.y-h.y)*u,r=(t.min.y-h.y)*u),i>r||o>s||((o>i||isNaN(i))&&(i=o),(r<s||isNaN(s))&&(s=r),d>=0?(a=(t.min.z-h.z)*d,l=(t.max.z-h.z)*d):(a=(t.max.z-h.z)*d,l=(t.min.z-h.z)*d),i>l||a>s)||((a>i||i!==i)&&(i=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,ni)!==null}intersectTriangle(t,e,i,s,o){Vr.subVectors(e,t),Fo.subVectors(i,t),Wr.crossVectors(Vr,Fo);let r=this.direction.dot(Wr),a;if(r>0){if(s)return null;a=1}else if(r<0)a=-1,r=-r;else return null;Ei.subVectors(this.origin,t);const l=a*this.direction.dot(Fo.crossVectors(Ei,Fo));if(l<0)return null;const c=a*this.direction.dot(Vr.cross(Ei));if(c<0||l+c>r)return null;const u=-a*Ei.dot(Wr);return u<0?null:this.at(u/r,o)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ee{constructor(t,e,i,s,o,r,a,l,c,u,d,h,f,m,v,g){Ee.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,o,r,a,l,c,u,d,h,f,m,v,g)}set(t,e,i,s,o,r,a,l,c,u,d,h,f,m,v,g){const p=this.elements;return p[0]=t,p[4]=e,p[8]=i,p[12]=s,p[1]=o,p[5]=r,p[9]=a,p[13]=l,p[2]=c,p[6]=u,p[10]=d,p[14]=h,p[3]=f,p[7]=m,p[11]=v,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ee().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,s=1/fs.setFromMatrixColumn(t,0).length(),o=1/fs.setFromMatrixColumn(t,1).length(),r=1/fs.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*o,e[5]=i[5]*o,e[6]=i[6]*o,e[7]=0,e[8]=i[8]*r,e[9]=i[9]*r,e[10]=i[10]*r,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,s=t.y,o=t.z,r=Math.cos(i),a=Math.sin(i),l=Math.cos(s),c=Math.sin(s),u=Math.cos(o),d=Math.sin(o);if(t.order==="XYZ"){const h=r*u,f=r*d,m=a*u,v=a*d;e[0]=l*u,e[4]=-l*d,e[8]=c,e[1]=f+m*c,e[5]=h-v*c,e[9]=-a*l,e[2]=v-h*c,e[6]=m+f*c,e[10]=r*l}else if(t.order==="YXZ"){const h=l*u,f=l*d,m=c*u,v=c*d;e[0]=h+v*a,e[4]=m*a-f,e[8]=r*c,e[1]=r*d,e[5]=r*u,e[9]=-a,e[2]=f*a-m,e[6]=v+h*a,e[10]=r*l}else if(t.order==="ZXY"){const h=l*u,f=l*d,m=c*u,v=c*d;e[0]=h-v*a,e[4]=-r*d,e[8]=m+f*a,e[1]=f+m*a,e[5]=r*u,e[9]=v-h*a,e[2]=-r*c,e[6]=a,e[10]=r*l}else if(t.order==="ZYX"){const h=r*u,f=r*d,m=a*u,v=a*d;e[0]=l*u,e[4]=m*c-f,e[8]=h*c+v,e[1]=l*d,e[5]=v*c+h,e[9]=f*c-m,e[2]=-c,e[6]=a*l,e[10]=r*l}else if(t.order==="YZX"){const h=r*l,f=r*c,m=a*l,v=a*c;e[0]=l*u,e[4]=v-h*d,e[8]=m*d+f,e[1]=d,e[5]=r*u,e[9]=-a*u,e[2]=-c*u,e[6]=f*d+m,e[10]=h-v*d}else if(t.order==="XZY"){const h=r*l,f=r*c,m=a*l,v=a*c;e[0]=l*u,e[4]=-d,e[8]=c*u,e[1]=h*d+v,e[5]=r*u,e[9]=f*d-m,e[2]=m*d-f,e[6]=a*u,e[10]=v*d+h}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Oh,t,Bh)}lookAt(t,e,i){const s=this.elements;return xn.subVectors(t,e),xn.lengthSq()===0&&(xn.z=1),xn.normalize(),Ti.crossVectors(i,xn),Ti.lengthSq()===0&&(Math.abs(i.z)===1?xn.x+=1e-4:xn.z+=1e-4,xn.normalize(),Ti.crossVectors(i,xn)),Ti.normalize(),Oo.crossVectors(xn,Ti),s[0]=Ti.x,s[4]=Oo.x,s[8]=xn.x,s[1]=Ti.y,s[5]=Oo.y,s[9]=xn.y,s[2]=Ti.z,s[6]=Oo.z,s[10]=xn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,o=this.elements,r=i[0],a=i[4],l=i[8],c=i[12],u=i[1],d=i[5],h=i[9],f=i[13],m=i[2],v=i[6],g=i[10],p=i[14],S=i[3],w=i[7],M=i[11],E=i[15],P=s[0],I=s[4],N=s[8],y=s[12],x=s[1],L=s[5],B=s[9],k=s[13],nt=s[2],rt=s[6],st=s[10],ot=s[14],et=s[3],dt=s[7],G=s[11],U=s[15];return o[0]=r*P+a*x+l*nt+c*et,o[4]=r*I+a*L+l*rt+c*dt,o[8]=r*N+a*B+l*st+c*G,o[12]=r*y+a*k+l*ot+c*U,o[1]=u*P+d*x+h*nt+f*et,o[5]=u*I+d*L+h*rt+f*dt,o[9]=u*N+d*B+h*st+f*G,o[13]=u*y+d*k+h*ot+f*U,o[2]=m*P+v*x+g*nt+p*et,o[6]=m*I+v*L+g*rt+p*dt,o[10]=m*N+v*B+g*st+p*G,o[14]=m*y+v*k+g*ot+p*U,o[3]=S*P+w*x+M*nt+E*et,o[7]=S*I+w*L+M*rt+E*dt,o[11]=S*N+w*B+M*st+E*G,o[15]=S*y+w*k+M*ot+E*U,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],s=t[8],o=t[12],r=t[1],a=t[5],l=t[9],c=t[13],u=t[2],d=t[6],h=t[10],f=t[14],m=t[3],v=t[7],g=t[11],p=t[15];return m*(+o*l*d-s*c*d-o*a*h+i*c*h+s*a*f-i*l*f)+v*(+e*l*f-e*c*h+o*r*h-s*r*f+s*c*u-o*l*u)+g*(+e*c*d-e*a*f-o*r*d+i*r*f+o*a*u-i*c*u)+p*(-s*a*u-e*l*d+e*a*h+s*r*d-i*r*h+i*l*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],o=t[3],r=t[4],a=t[5],l=t[6],c=t[7],u=t[8],d=t[9],h=t[10],f=t[11],m=t[12],v=t[13],g=t[14],p=t[15],S=d*g*c-v*h*c+v*l*f-a*g*f-d*l*p+a*h*p,w=m*h*c-u*g*c-m*l*f+r*g*f+u*l*p-r*h*p,M=u*v*c-m*d*c+m*a*f-r*v*f-u*a*p+r*d*p,E=m*d*l-u*v*l-m*a*h+r*v*h+u*a*g-r*d*g,P=e*S+i*w+s*M+o*E;if(P===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const I=1/P;return t[0]=S*I,t[1]=(v*h*o-d*g*o-v*s*f+i*g*f+d*s*p-i*h*p)*I,t[2]=(a*g*o-v*l*o+v*s*c-i*g*c-a*s*p+i*l*p)*I,t[3]=(d*l*o-a*h*o-d*s*c+i*h*c+a*s*f-i*l*f)*I,t[4]=w*I,t[5]=(u*g*o-m*h*o+m*s*f-e*g*f-u*s*p+e*h*p)*I,t[6]=(m*l*o-r*g*o-m*s*c+e*g*c+r*s*p-e*l*p)*I,t[7]=(r*h*o-u*l*o+u*s*c-e*h*c-r*s*f+e*l*f)*I,t[8]=M*I,t[9]=(m*d*o-u*v*o-m*i*f+e*v*f+u*i*p-e*d*p)*I,t[10]=(r*v*o-m*a*o+m*i*c-e*v*c-r*i*p+e*a*p)*I,t[11]=(u*a*o-r*d*o-u*i*c+e*d*c+r*i*f-e*a*f)*I,t[12]=E*I,t[13]=(u*v*s-m*d*s+m*i*h-e*v*h-u*i*g+e*d*g)*I,t[14]=(m*a*s-r*v*s-m*i*l+e*v*l+r*i*g-e*a*g)*I,t[15]=(r*d*s-u*a*s+u*i*l-e*d*l-r*i*h+e*a*h)*I,this}scale(t){const e=this.elements,i=t.x,s=t.y,o=t.z;return e[0]*=i,e[4]*=s,e[8]*=o,e[1]*=i,e[5]*=s,e[9]*=o,e[2]*=i,e[6]*=s,e[10]*=o,e[3]*=i,e[7]*=s,e[11]*=o,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),s=Math.sin(e),o=1-i,r=t.x,a=t.y,l=t.z,c=o*r,u=o*a;return this.set(c*r+i,c*a-s*l,c*l+s*a,0,c*a+s*l,u*a+i,u*l-s*r,0,c*l-s*a,u*l+s*r,o*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,o,r){return this.set(1,i,o,0,t,1,r,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){const s=this.elements,o=e._x,r=e._y,a=e._z,l=e._w,c=o+o,u=r+r,d=a+a,h=o*c,f=o*u,m=o*d,v=r*u,g=r*d,p=a*d,S=l*c,w=l*u,M=l*d,E=i.x,P=i.y,I=i.z;return s[0]=(1-(v+p))*E,s[1]=(f+M)*E,s[2]=(m-w)*E,s[3]=0,s[4]=(f-M)*P,s[5]=(1-(h+p))*P,s[6]=(g+S)*P,s[7]=0,s[8]=(m+w)*I,s[9]=(g-S)*I,s[10]=(1-(h+v))*I,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){const s=this.elements;let o=fs.set(s[0],s[1],s[2]).length();const r=fs.set(s[4],s[5],s[6]).length(),a=fs.set(s[8],s[9],s[10]).length();this.determinant()<0&&(o=-o),t.x=s[12],t.y=s[13],t.z=s[14],Dn.copy(this);const c=1/o,u=1/r,d=1/a;return Dn.elements[0]*=c,Dn.elements[1]*=c,Dn.elements[2]*=c,Dn.elements[4]*=u,Dn.elements[5]*=u,Dn.elements[6]*=u,Dn.elements[8]*=d,Dn.elements[9]*=d,Dn.elements[10]*=d,e.setFromRotationMatrix(Dn),i.x=o,i.y=r,i.z=a,this}makePerspective(t,e,i,s,o,r,a=di){const l=this.elements,c=2*o/(e-t),u=2*o/(i-s),d=(e+t)/(e-t),h=(i+s)/(i-s);let f,m;if(a===di)f=-(r+o)/(r-o),m=-2*r*o/(r-o);else if(a===_r)f=-r/(r-o),m=-r*o/(r-o);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=m,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,s,o,r,a=di){const l=this.elements,c=1/(e-t),u=1/(i-s),d=1/(r-o),h=(e+t)*c,f=(i+s)*u;let m,v;if(a===di)m=(r+o)*d,v=-2*d;else if(a===_r)m=o*d,v=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-h,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=v,l[14]=-m,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const fs=new b,Dn=new Ee,Oh=new b(0,0,0),Bh=new b(1,1,1),Ti=new b,Oo=new b,xn=new b,lc=new Ee,cc=new bo;class Gn{constructor(t=0,e=0,i=0,s=Gn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const s=t.elements,o=s[0],r=s[4],a=s[8],l=s[1],c=s[5],u=s[9],d=s[2],h=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(Qe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-r,o)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Qe(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,o),this._z=0);break;case"ZXY":this._x=Math.asin(Qe(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-r,c)):(this._y=0,this._z=Math.atan2(l,o));break;case"ZYX":this._y=Math.asin(-Qe(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,f),this._z=Math.atan2(l,o)):(this._x=0,this._z=Math.atan2(-r,c));break;case"YZX":this._z=Math.asin(Qe(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,o)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Qe(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(a,o)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return lc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(lc,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return cc.setFromEuler(this),this.setFromQuaternion(cc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Gn.DEFAULT_ORDER="XYZ";class Pl{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let kh=0;const uc=new b,ps=new bo,ii=new Ee,Bo=new b,to=new b,Gh=new b,Hh=new bo,dc=new b(1,0,0),hc=new b(0,1,0),fc=new b(0,0,1),pc={type:"added"},Vh={type:"removed"},ms={type:"childadded",child:null},qr={type:"childremoved",child:null};class We extends Vs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:kh++}),this.uuid=pi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=We.DEFAULT_UP.clone();const t=new b,e=new Gn,i=new bo,s=new b(1,1,1);function o(){i.setFromEuler(e,!1)}function r(){e.setFromQuaternion(i,void 0,!1)}e._onChange(o),i._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ee},normalMatrix:{value:new ee}}),this.matrix=new Ee,this.matrixWorld=new Ee,this.matrixAutoUpdate=We.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=We.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Pl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ps.setFromAxisAngle(t,e),this.quaternion.multiply(ps),this}rotateOnWorldAxis(t,e){return ps.setFromAxisAngle(t,e),this.quaternion.premultiply(ps),this}rotateX(t){return this.rotateOnAxis(dc,t)}rotateY(t){return this.rotateOnAxis(hc,t)}rotateZ(t){return this.rotateOnAxis(fc,t)}translateOnAxis(t,e){return uc.copy(t).applyQuaternion(this.quaternion),this.position.add(uc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(dc,t)}translateY(t){return this.translateOnAxis(hc,t)}translateZ(t){return this.translateOnAxis(fc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(ii.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Bo.copy(t):Bo.set(t,e,i);const s=this.parent;this.updateWorldMatrix(!0,!1),to.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ii.lookAt(to,Bo,this.up):ii.lookAt(Bo,to,this.up),this.quaternion.setFromRotationMatrix(ii),s&&(ii.extractRotation(s.matrixWorld),ps.setFromRotationMatrix(ii),this.quaternion.premultiply(ps.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(pc),ms.child=t,this.dispatchEvent(ms),ms.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Vh),qr.child=t,this.dispatchEvent(qr),qr.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),ii.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),ii.multiply(t.parent.matrixWorld)),t.applyMatrix4(ii),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(pc),ms.child=t,this.dispatchEvent(ms),ms.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){const r=this.children[i].getObjectByProperty(t,e);if(r!==void 0)return r}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const s=this.children;for(let o=0,r=s.length;o<r;o++)s[o].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(to,t,Gh),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(to,Hh,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let o=0,r=s.length;o<r;o++)s[o].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function o(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=o(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];o(t.shapes,d)}else o(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(o(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(o(t.materials,this.material[l]));s.material=a}else s.material=o(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(o(t.animations,l))}}if(e){const a=r(t.geometries),l=r(t.materials),c=r(t.textures),u=r(t.images),d=r(t.shapes),h=r(t.skeletons),f=r(t.animations),m=r(t.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),d.length>0&&(i.shapes=d),h.length>0&&(i.skeletons=h),f.length>0&&(i.animations=f),m.length>0&&(i.nodes=m)}return i.object=s,i;function r(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const s=t.children[i];this.add(s.clone())}return this}}We.DEFAULT_UP=new b(0,1,0);We.DEFAULT_MATRIX_AUTO_UPDATE=!0;We.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Un=new b,si=new b,Xr=new b,oi=new b,gs=new b,vs=new b,mc=new b,Yr=new b,$r=new b,Zr=new b,Kr=new be,jr=new be,Jr=new be;class An{constructor(t=new b,e=new b,i=new b){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),Un.subVectors(t,e),s.cross(Un);const o=s.lengthSq();return o>0?s.multiplyScalar(1/Math.sqrt(o)):s.set(0,0,0)}static getBarycoord(t,e,i,s,o){Un.subVectors(s,e),si.subVectors(i,e),Xr.subVectors(t,e);const r=Un.dot(Un),a=Un.dot(si),l=Un.dot(Xr),c=si.dot(si),u=si.dot(Xr),d=r*c-a*a;if(d===0)return o.set(0,0,0),null;const h=1/d,f=(c*l-a*u)*h,m=(r*u-a*l)*h;return o.set(1-f-m,m,f)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,oi)===null?!1:oi.x>=0&&oi.y>=0&&oi.x+oi.y<=1}static getInterpolation(t,e,i,s,o,r,a,l){return this.getBarycoord(t,e,i,s,oi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(o,oi.x),l.addScaledVector(r,oi.y),l.addScaledVector(a,oi.z),l)}static getInterpolatedAttribute(t,e,i,s,o,r){return Kr.setScalar(0),jr.setScalar(0),Jr.setScalar(0),Kr.fromBufferAttribute(t,e),jr.fromBufferAttribute(t,i),Jr.fromBufferAttribute(t,s),r.setScalar(0),r.addScaledVector(Kr,o.x),r.addScaledVector(jr,o.y),r.addScaledVector(Jr,o.z),r}static isFrontFacing(t,e,i,s){return Un.subVectors(i,e),si.subVectors(t,e),Un.cross(si).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Un.subVectors(this.c,this.b),si.subVectors(this.a,this.b),Un.cross(si).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return An.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return An.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,o){return An.getInterpolation(t,this.a,this.b,this.c,e,i,s,o)}containsPoint(t){return An.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return An.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,s=this.b,o=this.c;let r,a;gs.subVectors(s,i),vs.subVectors(o,i),Yr.subVectors(t,i);const l=gs.dot(Yr),c=vs.dot(Yr);if(l<=0&&c<=0)return e.copy(i);$r.subVectors(t,s);const u=gs.dot($r),d=vs.dot($r);if(u>=0&&d<=u)return e.copy(s);const h=l*d-u*c;if(h<=0&&l>=0&&u<=0)return r=l/(l-u),e.copy(i).addScaledVector(gs,r);Zr.subVectors(t,o);const f=gs.dot(Zr),m=vs.dot(Zr);if(m>=0&&f<=m)return e.copy(o);const v=f*c-l*m;if(v<=0&&c>=0&&m<=0)return a=c/(c-m),e.copy(i).addScaledVector(vs,a);const g=u*m-f*d;if(g<=0&&d-u>=0&&f-m>=0)return mc.subVectors(o,s),a=(d-u)/(d-u+(f-m)),e.copy(s).addScaledVector(mc,a);const p=1/(g+v+h);return r=v*p,a=h*p,e.copy(i).addScaledVector(gs,r).addScaledVector(vs,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Hu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ai={h:0,s:0,l:0},ko={h:0,s:0,l:0};function Qr(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class _t{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=ye){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,fe.toWorkingColorSpace(this,e),this}setRGB(t,e,i,s=fe.workingColorSpace){return this.r=t,this.g=e,this.b=i,fe.toWorkingColorSpace(this,s),this}setHSL(t,e,i,s=fe.workingColorSpace){if(t=Rl(t,1),e=Qe(e,0,1),i=Qe(i,0,1),e===0)this.r=this.g=this.b=i;else{const o=i<=.5?i*(1+e):i+e-i*e,r=2*i-o;this.r=Qr(r,o,t+1/3),this.g=Qr(r,o,t),this.b=Qr(r,o,t-1/3)}return fe.toWorkingColorSpace(this,s),this}setStyle(t,e=ye){function i(o){o!==void 0&&parseFloat(o)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let o;const r=s[1],a=s[2];switch(r){case"rgb":case"rgba":if(o=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(o[4]),this.setRGB(Math.min(255,parseInt(o[1],10))/255,Math.min(255,parseInt(o[2],10))/255,Math.min(255,parseInt(o[3],10))/255,e);if(o=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(o[4]),this.setRGB(Math.min(100,parseInt(o[1],10))/100,Math.min(100,parseInt(o[2],10))/100,Math.min(100,parseInt(o[3],10))/100,e);break;case"hsl":case"hsla":if(o=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(o[4]),this.setHSL(parseFloat(o[1])/360,parseFloat(o[2])/100,parseFloat(o[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const o=s[1],r=o.length;if(r===3)return this.setRGB(parseInt(o.charAt(0),16)/15,parseInt(o.charAt(1),16)/15,parseInt(o.charAt(2),16)/15,e);if(r===6)return this.setHex(parseInt(o,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=ye){const i=Hu[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=mi(t.r),this.g=mi(t.g),this.b=mi(t.b),this}copyLinearToSRGB(t){return this.r=Ps(t.r),this.g=Ps(t.g),this.b=Ps(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ye){return fe.fromWorkingColorSpace(sn.copy(this),t),Math.round(Qe(sn.r*255,0,255))*65536+Math.round(Qe(sn.g*255,0,255))*256+Math.round(Qe(sn.b*255,0,255))}getHexString(t=ye){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=fe.workingColorSpace){fe.fromWorkingColorSpace(sn.copy(this),e);const i=sn.r,s=sn.g,o=sn.b,r=Math.max(i,s,o),a=Math.min(i,s,o);let l,c;const u=(a+r)/2;if(a===r)l=0,c=0;else{const d=r-a;switch(c=u<=.5?d/(r+a):d/(2-r-a),r){case i:l=(s-o)/d+(s<o?6:0);break;case s:l=(o-i)/d+2;break;case o:l=(i-s)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=fe.workingColorSpace){return fe.fromWorkingColorSpace(sn.copy(this),e),t.r=sn.r,t.g=sn.g,t.b=sn.b,t}getStyle(t=ye){fe.fromWorkingColorSpace(sn.copy(this),t);const e=sn.r,i=sn.g,s=sn.b;return t!==ye?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(Ai),this.setHSL(Ai.h+t,Ai.s+e,Ai.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Ai),t.getHSL(ko);const i=mo(Ai.h,ko.h,e),s=mo(Ai.s,ko.s,e),o=mo(Ai.l,ko.l,e);return this.setHSL(i,s,o),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,s=this.b,o=t.elements;return this.r=o[0]*e+o[3]*i+o[6]*s,this.g=o[1]*e+o[4]*i+o[7]*s,this.b=o[2]*e+o[5]*i+o[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const sn=new _t;_t.NAMES=Hu;let Wh=0;class vi extends Vs{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Wh++}),this.uuid=pi(),this.name="",this.blending=es,this.side=Ui,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ra,this.blendDst=Pa,this.blendEquation=ji,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new _t(0,0,0),this.blendAlpha=0,this.depthFunc=Ds,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Jl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ls,this.stencilZFail=ls,this.stencilZPass=ls,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==es&&(i.blending=this.blending),this.side!==Ui&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Ra&&(i.blendSrc=this.blendSrc),this.blendDst!==Pa&&(i.blendDst=this.blendDst),this.blendEquation!==ji&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Ds&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Jl&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ls&&(i.stencilFail=this.stencilFail),this.stencilZFail!==ls&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==ls&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(o){const r=[];for(const a in o){const l=o[a];delete l.metadata,r.push(l)}return r}if(e){const o=s(t.textures),r=s(t.images);o.length>0&&(i.textures=o),r.length>0&&(i.images=r)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const s=e.length;i=new Array(s);for(let o=0;o!==s;++o)i[o]=e[o].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Fe extends vi{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new _t(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Gn,this.combine=xl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const ke=new b,Go=new Et;class Be{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=fl,this.updateRanges=[],this.gpuType=ui,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,o=this.itemSize;s<o;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Go.fromBufferAttribute(this,e),Go.applyMatrix3(t),this.setXY(e,Go.x,Go.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)ke.fromBufferAttribute(this,e),ke.applyMatrix3(t),this.setXYZ(e,ke.x,ke.y,ke.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)ke.fromBufferAttribute(this,e),ke.applyMatrix4(t),this.setXYZ(e,ke.x,ke.y,ke.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)ke.fromBufferAttribute(this,e),ke.applyNormalMatrix(t),this.setXYZ(e,ke.x,ke.y,ke.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)ke.fromBufferAttribute(this,e),ke.transformDirection(t),this.setXYZ(e,ke.x,ke.y,ke.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=zn(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=Me(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=zn(e,this.array)),e}setX(t,e){return this.normalized&&(e=Me(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=zn(e,this.array)),e}setY(t,e){return this.normalized&&(e=Me(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=zn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Me(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=zn(e,this.array)),e}setW(t,e){return this.normalized&&(e=Me(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=Me(e,this.array),i=Me(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=Me(e,this.array),i=Me(i,this.array),s=Me(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,o){return t*=this.itemSize,this.normalized&&(e=Me(e,this.array),i=Me(i,this.array),s=Me(s,this.array),o=Me(o,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=o,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==fl&&(t.usage=this.usage),t}}class Vu extends Be{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class Wu extends Be{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class Te extends Be{constructor(t,e,i){super(new Float32Array(t),e,i)}}let qh=0;const Tn=new Ee,ta=new We,_s=new b,Sn=new Eo,eo=new Eo,Ze=new b;class Pe extends Vs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:qh++}),this.uuid=pi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Bu(t)?Wu:Vu)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const o=new ee().getNormalMatrix(t);i.applyNormalMatrix(o),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Tn.makeRotationFromQuaternion(t),this.applyMatrix4(Tn),this}rotateX(t){return Tn.makeRotationX(t),this.applyMatrix4(Tn),this}rotateY(t){return Tn.makeRotationY(t),this.applyMatrix4(Tn),this}rotateZ(t){return Tn.makeRotationZ(t),this.applyMatrix4(Tn),this}translate(t,e,i){return Tn.makeTranslation(t,e,i),this.applyMatrix4(Tn),this}scale(t,e,i){return Tn.makeScale(t,e,i),this.applyMatrix4(Tn),this}lookAt(t){return ta.lookAt(t),ta.updateMatrix(),this.applyMatrix4(ta.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(_s).negate(),this.translate(_s.x,_s.y,_s.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let s=0,o=t.length;s<o;s++){const r=t[s];i.push(r.x,r.y,r.z||0)}this.setAttribute("position",new Te(i,3))}else{for(let i=0,s=e.count;i<s;i++){const o=t[i];e.setXYZ(i,o.x,o.y,o.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Eo);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new b(-1/0,-1/0,-1/0),new b(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){const o=e[i];Sn.setFromBufferAttribute(o),this.morphTargetsRelative?(Ze.addVectors(this.boundingBox.min,Sn.min),this.boundingBox.expandByPoint(Ze),Ze.addVectors(this.boundingBox.max,Sn.max),this.boundingBox.expandByPoint(Ze)):(this.boundingBox.expandByPoint(Sn.min),this.boundingBox.expandByPoint(Sn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new To);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new b,1/0);return}if(t){const i=this.boundingSphere.center;if(Sn.setFromBufferAttribute(t),e)for(let o=0,r=e.length;o<r;o++){const a=e[o];eo.setFromBufferAttribute(a),this.morphTargetsRelative?(Ze.addVectors(Sn.min,eo.min),Sn.expandByPoint(Ze),Ze.addVectors(Sn.max,eo.max),Sn.expandByPoint(Ze)):(Sn.expandByPoint(eo.min),Sn.expandByPoint(eo.max))}Sn.getCenter(i);let s=0;for(let o=0,r=t.count;o<r;o++)Ze.fromBufferAttribute(t,o),s=Math.max(s,i.distanceToSquared(Ze));if(e)for(let o=0,r=e.length;o<r;o++){const a=e[o],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Ze.fromBufferAttribute(a,c),l&&(_s.fromBufferAttribute(t,c),Ze.add(_s)),s=Math.max(s,i.distanceToSquared(Ze))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,s=e.normal,o=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Be(new Float32Array(4*i.count),4));const r=this.getAttribute("tangent"),a=[],l=[];for(let N=0;N<i.count;N++)a[N]=new b,l[N]=new b;const c=new b,u=new b,d=new b,h=new Et,f=new Et,m=new Et,v=new b,g=new b;function p(N,y,x){c.fromBufferAttribute(i,N),u.fromBufferAttribute(i,y),d.fromBufferAttribute(i,x),h.fromBufferAttribute(o,N),f.fromBufferAttribute(o,y),m.fromBufferAttribute(o,x),u.sub(c),d.sub(c),f.sub(h),m.sub(h);const L=1/(f.x*m.y-m.x*f.y);isFinite(L)&&(v.copy(u).multiplyScalar(m.y).addScaledVector(d,-f.y).multiplyScalar(L),g.copy(d).multiplyScalar(f.x).addScaledVector(u,-m.x).multiplyScalar(L),a[N].add(v),a[y].add(v),a[x].add(v),l[N].add(g),l[y].add(g),l[x].add(g))}let S=this.groups;S.length===0&&(S=[{start:0,count:t.count}]);for(let N=0,y=S.length;N<y;++N){const x=S[N],L=x.start,B=x.count;for(let k=L,nt=L+B;k<nt;k+=3)p(t.getX(k+0),t.getX(k+1),t.getX(k+2))}const w=new b,M=new b,E=new b,P=new b;function I(N){E.fromBufferAttribute(s,N),P.copy(E);const y=a[N];w.copy(y),w.sub(E.multiplyScalar(E.dot(y))).normalize(),M.crossVectors(P,y);const L=M.dot(l[N])<0?-1:1;r.setXYZW(N,w.x,w.y,w.z,L)}for(let N=0,y=S.length;N<y;++N){const x=S[N],L=x.start,B=x.count;for(let k=L,nt=L+B;k<nt;k+=3)I(t.getX(k+0)),I(t.getX(k+1)),I(t.getX(k+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Be(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let h=0,f=i.count;h<f;h++)i.setXYZ(h,0,0,0);const s=new b,o=new b,r=new b,a=new b,l=new b,c=new b,u=new b,d=new b;if(t)for(let h=0,f=t.count;h<f;h+=3){const m=t.getX(h+0),v=t.getX(h+1),g=t.getX(h+2);s.fromBufferAttribute(e,m),o.fromBufferAttribute(e,v),r.fromBufferAttribute(e,g),u.subVectors(r,o),d.subVectors(s,o),u.cross(d),a.fromBufferAttribute(i,m),l.fromBufferAttribute(i,v),c.fromBufferAttribute(i,g),a.add(u),l.add(u),c.add(u),i.setXYZ(m,a.x,a.y,a.z),i.setXYZ(v,l.x,l.y,l.z),i.setXYZ(g,c.x,c.y,c.z)}else for(let h=0,f=e.count;h<f;h+=3)s.fromBufferAttribute(e,h+0),o.fromBufferAttribute(e,h+1),r.fromBufferAttribute(e,h+2),u.subVectors(r,o),d.subVectors(s,o),u.cross(d),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Ze.fromBufferAttribute(t,e),Ze.normalize(),t.setXYZ(e,Ze.x,Ze.y,Ze.z)}toNonIndexed(){function t(a,l){const c=a.array,u=a.itemSize,d=a.normalized,h=new c.constructor(l.length*u);let f=0,m=0;for(let v=0,g=l.length;v<g;v++){a.isInterleavedBufferAttribute?f=l[v]*a.data.stride+a.offset:f=l[v]*u;for(let p=0;p<u;p++)h[m++]=c[f++]}return new Be(h,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Pe,i=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=t(l,i);e.setAttribute(a,c)}const o=this.morphAttributes;for(const a in o){const l=[],c=o[a];for(let u=0,d=c.length;u<d;u++){const h=c[u],f=t(h,i);l.push(f)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const r=this.groups;for(let a=0,l=r.length;a<l;a++){const c=r[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const l in i){const c=i[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let o=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,h=c.length;d<h;d++){const f=c[d];u.push(f.toJSON(t.data))}u.length>0&&(s[l]=u,o=!0)}o&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const r=this.groups;r.length>0&&(t.data.groups=JSON.parse(JSON.stringify(r)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone(e));const s=t.attributes;for(const c in s){const u=s[c];this.setAttribute(c,u.clone(e))}const o=t.morphAttributes;for(const c in o){const u=[],d=o[c];for(let h=0,f=d.length;h<f;h++)u.push(d[h].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;const r=t.groups;for(let c=0,u=r.length;c<u;c++){const d=r[c];this.addGroup(d.start,d.count,d.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const gc=new Ee,Gi=new Pr,Ho=new To,vc=new b,Vo=new b,Wo=new b,qo=new b,ea=new b,Xo=new b,_c=new b,Yo=new b;class R extends We{constructor(t=new Pe,e=new Fe){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,r=s.length;o<r;o++){const a=s[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=o}}}}getVertexPosition(t,e){const i=this.geometry,s=i.attributes.position,o=i.morphAttributes.position,r=i.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(o&&a){Xo.set(0,0,0);for(let l=0,c=o.length;l<c;l++){const u=a[l],d=o[l];u!==0&&(ea.fromBufferAttribute(d,t),r?Xo.addScaledVector(ea,u):Xo.addScaledVector(ea.sub(e),u))}e.add(Xo)}return e}raycast(t,e){const i=this.geometry,s=this.material,o=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Ho.copy(i.boundingSphere),Ho.applyMatrix4(o),Gi.copy(t.ray).recast(t.near),!(Ho.containsPoint(Gi.origin)===!1&&(Gi.intersectSphere(Ho,vc)===null||Gi.origin.distanceToSquared(vc)>(t.far-t.near)**2))&&(gc.copy(o).invert(),Gi.copy(t.ray).applyMatrix4(gc),!(i.boundingBox!==null&&Gi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Gi)))}_computeIntersections(t,e,i){let s;const o=this.geometry,r=this.material,a=o.index,l=o.attributes.position,c=o.attributes.uv,u=o.attributes.uv1,d=o.attributes.normal,h=o.groups,f=o.drawRange;if(a!==null)if(Array.isArray(r))for(let m=0,v=h.length;m<v;m++){const g=h[m],p=r[g.materialIndex],S=Math.max(g.start,f.start),w=Math.min(a.count,Math.min(g.start+g.count,f.start+f.count));for(let M=S,E=w;M<E;M+=3){const P=a.getX(M),I=a.getX(M+1),N=a.getX(M+2);s=$o(this,p,t,i,c,u,d,P,I,N),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const m=Math.max(0,f.start),v=Math.min(a.count,f.start+f.count);for(let g=m,p=v;g<p;g+=3){const S=a.getX(g),w=a.getX(g+1),M=a.getX(g+2);s=$o(this,r,t,i,c,u,d,S,w,M),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(r))for(let m=0,v=h.length;m<v;m++){const g=h[m],p=r[g.materialIndex],S=Math.max(g.start,f.start),w=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let M=S,E=w;M<E;M+=3){const P=M,I=M+1,N=M+2;s=$o(this,p,t,i,c,u,d,P,I,N),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const m=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let g=m,p=v;g<p;g+=3){const S=g,w=g+1,M=g+2;s=$o(this,r,t,i,c,u,d,S,w,M),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}}}function Xh(n,t,e,i,s,o,r,a){let l;if(t.side===rn?l=i.intersectTriangle(r,o,s,!0,a):l=i.intersectTriangle(s,o,r,t.side===Ui,a),l===null)return null;Yo.copy(a),Yo.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(Yo);return c<e.near||c>e.far?null:{distance:c,point:Yo.clone(),object:n}}function $o(n,t,e,i,s,o,r,a,l,c){n.getVertexPosition(a,Vo),n.getVertexPosition(l,Wo),n.getVertexPosition(c,qo);const u=Xh(n,t,e,i,Vo,Wo,qo,_c);if(u){const d=new b;An.getBarycoord(_c,Vo,Wo,qo,d),s&&(u.uv=An.getInterpolatedAttribute(s,a,l,c,d,new Et)),o&&(u.uv1=An.getInterpolatedAttribute(o,a,l,c,d,new Et)),r&&(u.normal=An.getInterpolatedAttribute(r,a,l,c,d,new b),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const h={a,b:l,c,normal:new b,materialIndex:0};An.getNormal(Vo,Wo,qo,h.normal),u.face=h,u.barycoord=d}return u}class ft extends Pe{constructor(t=1,e=1,i=1,s=1,o=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:o,depthSegments:r};const a=this;s=Math.floor(s),o=Math.floor(o),r=Math.floor(r);const l=[],c=[],u=[],d=[];let h=0,f=0;m("z","y","x",-1,-1,i,e,t,r,o,0),m("z","y","x",1,-1,i,e,-t,r,o,1),m("x","z","y",1,1,t,i,e,s,r,2),m("x","z","y",1,-1,t,i,-e,s,r,3),m("x","y","z",1,-1,t,e,i,s,o,4),m("x","y","z",-1,-1,t,e,-i,s,o,5),this.setIndex(l),this.setAttribute("position",new Te(c,3)),this.setAttribute("normal",new Te(u,3)),this.setAttribute("uv",new Te(d,2));function m(v,g,p,S,w,M,E,P,I,N,y){const x=M/I,L=E/N,B=M/2,k=E/2,nt=P/2,rt=I+1,st=N+1;let ot=0,et=0;const dt=new b;for(let G=0;G<st;G++){const U=G*L-k;for(let tt=0;tt<rt;tt++){const at=tt*x-B;dt[v]=at*S,dt[g]=U*w,dt[p]=nt,c.push(dt.x,dt.y,dt.z),dt[v]=0,dt[g]=0,dt[p]=P>0?1:-1,u.push(dt.x,dt.y,dt.z),d.push(tt/I),d.push(1-G/N),ot+=1}}for(let G=0;G<N;G++)for(let U=0;U<I;U++){const tt=h+U+rt*G,at=h+U+rt*(G+1),q=h+(U+1)+rt*(G+1),pt=h+(U+1)+rt*G;l.push(tt,at,pt),l.push(at,q,pt),et+=6}a.addGroup(f,et,y),f+=et,h+=ot}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ft(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Os(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const s=n[e][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone():Array.isArray(s)?t[e][i]=s.slice():t[e][i]=s}}return t}function fn(n){const t={};for(let e=0;e<n.length;e++){const i=Os(n[e]);for(const s in i)t[s]=i[s]}return t}function Yh(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function qu(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:fe.workingColorSpace}const xo={clone:Os,merge:fn};var $h=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Zh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class on extends vi{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=$h,this.fragmentShader=Zh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Os(t.uniforms),this.uniformsGroups=Yh(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const r=this.uniforms[s].value;r&&r.isTexture?e.uniforms[s]={type:"t",value:r.toJSON(t).uuid}:r&&r.isColor?e.uniforms[s]={type:"c",value:r.getHex()}:r&&r.isVector2?e.uniforms[s]={type:"v2",value:r.toArray()}:r&&r.isVector3?e.uniforms[s]={type:"v3",value:r.toArray()}:r&&r.isVector4?e.uniforms[s]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?e.uniforms[s]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?e.uniforms[s]={type:"m4",value:r.toArray()}:e.uniforms[s]={value:r}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class Xu extends We{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ee,this.projectionMatrix=new Ee,this.projectionMatrixInverse=new Ee,this.coordinateSystem=di}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Ci=new b,Mc=new Et,yc=new Et;class Ie extends Xu{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=yo*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(po*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return yo*2*Math.atan(Math.tan(po*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){Ci.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Ci.x,Ci.y).multiplyScalar(-t/Ci.z),Ci.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Ci.x,Ci.y).multiplyScalar(-t/Ci.z)}getViewSize(t,e){return this.getViewBounds(t,Mc,yc),e.subVectors(yc,Mc)}setViewOffset(t,e,i,s,o,r){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=o,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(po*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,o=-.5*s;const r=this.view;if(this.view!==null&&this.view.enabled){const l=r.fullWidth,c=r.fullHeight;o+=r.offsetX*s/l,e-=r.offsetY*i/c,s*=r.width/l,i*=r.height/c}const a=this.filmOffset;a!==0&&(o+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(o,o+s,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Ms=-90,ys=1;class Kh extends We{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Ie(Ms,ys,t,e);s.layers=this.layers,this.add(s);const o=new Ie(Ms,ys,t,e);o.layers=this.layers,this.add(o);const r=new Ie(Ms,ys,t,e);r.layers=this.layers,this.add(r);const a=new Ie(Ms,ys,t,e);a.layers=this.layers,this.add(a);const l=new Ie(Ms,ys,t,e);l.layers=this.layers,this.add(l);const c=new Ie(Ms,ys,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,s,o,r,a,l]=e;for(const c of e)this.remove(c);if(t===di)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),o.up.set(0,0,-1),o.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===_r)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),o.up.set(0,0,1),o.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[o,r,a,l,c,u]=this.children,d=t.getRenderTarget(),h=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,s),t.render(e,o),t.setRenderTarget(i,1,s),t.render(e,r),t.setRenderTarget(i,2,s),t.render(e,a),t.setRenderTarget(i,3,s),t.render(e,l),t.setRenderTarget(i,4,s),t.render(e,c),i.texture.generateMipmaps=v,t.setRenderTarget(i,5,s),t.render(e,u),t.setRenderTarget(d,h,f),t.xr.enabled=m,i.texture.needsPMREMUpdate=!0}}class Yu extends mn{constructor(t,e,i,s,o,r,a,l,c,u){t=t!==void 0?t:[],e=e!==void 0?e:Us,super(t,e,i,s,o,r,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class jh extends kn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new Yu(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:qn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new ft(5,5,5),o=new on({name:"CubemapFromEquirect",uniforms:Os(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:rn,blending:hi});o.uniforms.tEquirect.value=e;const r=new R(s,o),a=e.minFilter;return e.minFilter===ts&&(e.minFilter=qn),new Kh(1,10,this).update(t,r),e.minFilter=a,r.geometry.dispose(),r.material.dispose(),this}clear(t,e,i,s){const o=t.getRenderTarget();for(let r=0;r<6;r++)t.setRenderTarget(this,r),t.clear(e,i,s);t.setRenderTarget(o)}}const na=new b,Jh=new b,Qh=new ee;class Zi{constructor(t=new b(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const s=na.subVectors(i,e).cross(Jh.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(na),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const o=-(t.start.dot(this.normal)+this.constant)/s;return o<0||o>1?null:e.copy(t.start).addScaledVector(i,o)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||Qh.getNormalMatrix(t),s=this.coplanarPoint(na).applyMatrix4(t),o=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(o),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Hi=new To,Zo=new b;class Ll{constructor(t=new Zi,e=new Zi,i=new Zi,s=new Zi,o=new Zi,r=new Zi){this.planes=[t,e,i,s,o,r]}set(t,e,i,s,o,r){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(s),a[4].copy(o),a[5].copy(r),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=di){const i=this.planes,s=t.elements,o=s[0],r=s[1],a=s[2],l=s[3],c=s[4],u=s[5],d=s[6],h=s[7],f=s[8],m=s[9],v=s[10],g=s[11],p=s[12],S=s[13],w=s[14],M=s[15];if(i[0].setComponents(l-o,h-c,g-f,M-p).normalize(),i[1].setComponents(l+o,h+c,g+f,M+p).normalize(),i[2].setComponents(l+r,h+u,g+m,M+S).normalize(),i[3].setComponents(l-r,h-u,g-m,M-S).normalize(),i[4].setComponents(l-a,h-d,g-v,M-w).normalize(),e===di)i[5].setComponents(l+a,h+d,g+v,M+w).normalize();else if(e===_r)i[5].setComponents(a,d,v,w).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Hi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Hi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Hi)}intersectsSprite(t){return Hi.center.set(0,0,0),Hi.radius=.7071067811865476,Hi.applyMatrix4(t.matrixWorld),this.intersectsSphere(Hi)}intersectsSphere(t){const e=this.planes,i=t.center,s=-t.radius;for(let o=0;o<6;o++)if(e[o].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const s=e[i];if(Zo.x=s.normal.x>0?t.max.x:t.min.x,Zo.y=s.normal.y>0?t.max.y:t.min.y,Zo.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Zo)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function $u(){let n=null,t=!1,e=null,i=null;function s(o,r){e(o,r),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(o){e=o},setContext:function(o){n=o}}}function tf(n){const t=new WeakMap;function e(a,l){const c=a.array,u=a.usage,d=c.byteLength,h=n.createBuffer();n.bindBuffer(l,h),n.bufferData(l,c,u),a.onUploadCallback();let f;if(c instanceof Float32Array)f=n.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=n.HALF_FLOAT:f=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=n.SHORT;else if(c instanceof Uint32Array)f=n.UNSIGNED_INT;else if(c instanceof Int32Array)f=n.INT;else if(c instanceof Int8Array)f=n.BYTE;else if(c instanceof Uint8Array)f=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function i(a,l,c){const u=l.array,d=l.updateRanges;if(n.bindBuffer(c,a),d.length===0)n.bufferSubData(c,0,u);else{d.sort((f,m)=>f.start-m.start);let h=0;for(let f=1;f<d.length;f++){const m=d[h],v=d[f];v.start<=m.start+m.count+1?m.count=Math.max(m.count,v.start+v.count-m.start):(++h,d[h]=v)}d.length=h+1;for(let f=0,m=d.length;f<m;f++){const v=d[f];n.bufferSubData(c,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function o(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(n.deleteBuffer(l.buffer),t.delete(a))}function r(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:s,remove:o,update:r}}class Jt extends Pe{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};const o=t/2,r=e/2,a=Math.floor(i),l=Math.floor(s),c=a+1,u=l+1,d=t/a,h=e/l,f=[],m=[],v=[],g=[];for(let p=0;p<u;p++){const S=p*h-r;for(let w=0;w<c;w++){const M=w*d-o;m.push(M,-S,0),v.push(0,0,1),g.push(w/a),g.push(1-p/l)}}for(let p=0;p<l;p++)for(let S=0;S<a;S++){const w=S+c*p,M=S+c*(p+1),E=S+1+c*(p+1),P=S+1+c*p;f.push(w,M,P),f.push(M,E,P)}this.setIndex(f),this.setAttribute("position",new Te(m,3)),this.setAttribute("normal",new Te(v,3)),this.setAttribute("uv",new Te(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Jt(t.width,t.height,t.widthSegments,t.heightSegments)}}var ef=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,nf=`#ifdef USE_ALPHAHASH
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
#endif`,sf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,of=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,rf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,af=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,lf=`#ifdef USE_AOMAP
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
#endif`,cf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,uf=`#ifdef USE_BATCHING
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
#endif`,df=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,hf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ff=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,pf=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,mf=`#ifdef USE_IRIDESCENCE
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
#endif`,gf=`#ifdef USE_BUMPMAP
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
#endif`,vf=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,_f=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Mf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,yf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,xf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Sf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,wf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,bf=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Ef=`#define PI 3.141592653589793
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
} // validated`,Tf=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Af=`vec3 transformedNormal = objectNormal;
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
#endif`,Cf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Rf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Pf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Lf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,If="gl_FragColor = linearToOutputTexel( gl_FragColor );",Df=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Uf=`#ifdef USE_ENVMAP
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
#endif`,Nf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,zf=`#ifdef USE_ENVMAP
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
#endif`,Ff=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Of=`#ifdef USE_ENVMAP
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
#endif`,Bf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,kf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Gf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Hf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Vf=`#ifdef USE_GRADIENTMAP
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
}`,Wf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,qf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Xf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Yf=`uniform bool receiveShadow;
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
#endif`,$f=`#ifdef USE_ENVMAP
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
#endif`,Zf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Kf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,jf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Jf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Qf=`PhysicalMaterial material;
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
#endif`,tp=`struct PhysicalMaterial {
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
}`,ep=`
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
#endif`,np=`#if defined( RE_IndirectDiffuse )
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
#endif`,ip=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,sp=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,op=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,rp=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ap=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,lp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,cp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,up=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,dp=`#if defined( USE_POINTS_UV )
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
#endif`,hp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,fp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,pp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,mp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,gp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,vp=`#ifdef USE_MORPHTARGETS
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
#endif`,_p=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Mp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,yp=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,xp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Sp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,wp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,bp=`#ifdef USE_NORMALMAP
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
#endif`,Ep=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Tp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Ap=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Cp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Rp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Pp=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Lp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Ip=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Dp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Up=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Np=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,zp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Fp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Op=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Bp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,kp=`float getShadowMask() {
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
}`,Gp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Hp=`#ifdef USE_SKINNING
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
#endif`,Vp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Wp=`#ifdef USE_SKINNING
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
#endif`,qp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Xp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Yp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,$p=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Zp=`#ifdef USE_TRANSMISSION
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
#endif`,Kp=`#ifdef USE_TRANSMISSION
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
#endif`,jp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Jp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Qp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,t0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const e0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,n0=`uniform sampler2D t2D;
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
}`,i0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,s0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,o0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,r0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,a0=`#include <common>
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
}`,l0=`#if DEPTH_PACKING == 3200
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
}`,c0=`#define DISTANCE
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
}`,u0=`#define DISTANCE
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
}`,d0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,h0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,f0=`uniform float scale;
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
}`,p0=`uniform vec3 diffuse;
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
}`,m0=`#include <common>
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
}`,g0=`uniform vec3 diffuse;
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
}`,v0=`#define LAMBERT
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
}`,_0=`#define LAMBERT
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
}`,M0=`#define MATCAP
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
}`,y0=`#define MATCAP
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
}`,x0=`#define NORMAL
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
}`,S0=`#define NORMAL
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
}`,w0=`#define PHONG
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
}`,b0=`#define PHONG
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
}`,E0=`#define STANDARD
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
}`,T0=`#define STANDARD
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
}`,A0=`#define TOON
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
}`,C0=`#define TOON
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
}`,R0=`uniform float size;
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
}`,P0=`uniform vec3 diffuse;
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
}`,L0=`#include <common>
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
}`,I0=`uniform vec3 color;
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
}`,D0=`uniform float rotation;
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
}`,U0=`uniform vec3 diffuse;
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
}`,ne={alphahash_fragment:ef,alphahash_pars_fragment:nf,alphamap_fragment:sf,alphamap_pars_fragment:of,alphatest_fragment:rf,alphatest_pars_fragment:af,aomap_fragment:lf,aomap_pars_fragment:cf,batching_pars_vertex:uf,batching_vertex:df,begin_vertex:hf,beginnormal_vertex:ff,bsdfs:pf,iridescence_fragment:mf,bumpmap_pars_fragment:gf,clipping_planes_fragment:vf,clipping_planes_pars_fragment:_f,clipping_planes_pars_vertex:Mf,clipping_planes_vertex:yf,color_fragment:xf,color_pars_fragment:Sf,color_pars_vertex:wf,color_vertex:bf,common:Ef,cube_uv_reflection_fragment:Tf,defaultnormal_vertex:Af,displacementmap_pars_vertex:Cf,displacementmap_vertex:Rf,emissivemap_fragment:Pf,emissivemap_pars_fragment:Lf,colorspace_fragment:If,colorspace_pars_fragment:Df,envmap_fragment:Uf,envmap_common_pars_fragment:Nf,envmap_pars_fragment:zf,envmap_pars_vertex:Ff,envmap_physical_pars_fragment:$f,envmap_vertex:Of,fog_vertex:Bf,fog_pars_vertex:kf,fog_fragment:Gf,fog_pars_fragment:Hf,gradientmap_pars_fragment:Vf,lightmap_pars_fragment:Wf,lights_lambert_fragment:qf,lights_lambert_pars_fragment:Xf,lights_pars_begin:Yf,lights_toon_fragment:Zf,lights_toon_pars_fragment:Kf,lights_phong_fragment:jf,lights_phong_pars_fragment:Jf,lights_physical_fragment:Qf,lights_physical_pars_fragment:tp,lights_fragment_begin:ep,lights_fragment_maps:np,lights_fragment_end:ip,logdepthbuf_fragment:sp,logdepthbuf_pars_fragment:op,logdepthbuf_pars_vertex:rp,logdepthbuf_vertex:ap,map_fragment:lp,map_pars_fragment:cp,map_particle_fragment:up,map_particle_pars_fragment:dp,metalnessmap_fragment:hp,metalnessmap_pars_fragment:fp,morphinstance_vertex:pp,morphcolor_vertex:mp,morphnormal_vertex:gp,morphtarget_pars_vertex:vp,morphtarget_vertex:_p,normal_fragment_begin:Mp,normal_fragment_maps:yp,normal_pars_fragment:xp,normal_pars_vertex:Sp,normal_vertex:wp,normalmap_pars_fragment:bp,clearcoat_normal_fragment_begin:Ep,clearcoat_normal_fragment_maps:Tp,clearcoat_pars_fragment:Ap,iridescence_pars_fragment:Cp,opaque_fragment:Rp,packing:Pp,premultiplied_alpha_fragment:Lp,project_vertex:Ip,dithering_fragment:Dp,dithering_pars_fragment:Up,roughnessmap_fragment:Np,roughnessmap_pars_fragment:zp,shadowmap_pars_fragment:Fp,shadowmap_pars_vertex:Op,shadowmap_vertex:Bp,shadowmask_pars_fragment:kp,skinbase_vertex:Gp,skinning_pars_vertex:Hp,skinning_vertex:Vp,skinnormal_vertex:Wp,specularmap_fragment:qp,specularmap_pars_fragment:Xp,tonemapping_fragment:Yp,tonemapping_pars_fragment:$p,transmission_fragment:Zp,transmission_pars_fragment:Kp,uv_pars_fragment:jp,uv_pars_vertex:Jp,uv_vertex:Qp,worldpos_vertex:t0,background_vert:e0,background_frag:n0,backgroundCube_vert:i0,backgroundCube_frag:s0,cube_vert:o0,cube_frag:r0,depth_vert:a0,depth_frag:l0,distanceRGBA_vert:c0,distanceRGBA_frag:u0,equirect_vert:d0,equirect_frag:h0,linedashed_vert:f0,linedashed_frag:p0,meshbasic_vert:m0,meshbasic_frag:g0,meshlambert_vert:v0,meshlambert_frag:_0,meshmatcap_vert:M0,meshmatcap_frag:y0,meshnormal_vert:x0,meshnormal_frag:S0,meshphong_vert:w0,meshphong_frag:b0,meshphysical_vert:E0,meshphysical_frag:T0,meshtoon_vert:A0,meshtoon_frag:C0,points_vert:R0,points_frag:P0,shadow_vert:L0,shadow_frag:I0,sprite_vert:D0,sprite_frag:U0},bt={common:{diffuse:{value:new _t(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ee},alphaMap:{value:null},alphaMapTransform:{value:new ee},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ee}},envmap:{envMap:{value:null},envMapRotation:{value:new ee},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ee}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ee}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ee},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ee},normalScale:{value:new Et(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ee},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ee}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ee}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ee}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new _t(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new _t(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ee},alphaTest:{value:0},uvTransform:{value:new ee}},sprite:{diffuse:{value:new _t(16777215)},opacity:{value:1},center:{value:new Et(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ee},alphaMap:{value:null},alphaMapTransform:{value:new ee},alphaTest:{value:0}}},Wn={basic:{uniforms:fn([bt.common,bt.specularmap,bt.envmap,bt.aomap,bt.lightmap,bt.fog]),vertexShader:ne.meshbasic_vert,fragmentShader:ne.meshbasic_frag},lambert:{uniforms:fn([bt.common,bt.specularmap,bt.envmap,bt.aomap,bt.lightmap,bt.emissivemap,bt.bumpmap,bt.normalmap,bt.displacementmap,bt.fog,bt.lights,{emissive:{value:new _t(0)}}]),vertexShader:ne.meshlambert_vert,fragmentShader:ne.meshlambert_frag},phong:{uniforms:fn([bt.common,bt.specularmap,bt.envmap,bt.aomap,bt.lightmap,bt.emissivemap,bt.bumpmap,bt.normalmap,bt.displacementmap,bt.fog,bt.lights,{emissive:{value:new _t(0)},specular:{value:new _t(1118481)},shininess:{value:30}}]),vertexShader:ne.meshphong_vert,fragmentShader:ne.meshphong_frag},standard:{uniforms:fn([bt.common,bt.envmap,bt.aomap,bt.lightmap,bt.emissivemap,bt.bumpmap,bt.normalmap,bt.displacementmap,bt.roughnessmap,bt.metalnessmap,bt.fog,bt.lights,{emissive:{value:new _t(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ne.meshphysical_vert,fragmentShader:ne.meshphysical_frag},toon:{uniforms:fn([bt.common,bt.aomap,bt.lightmap,bt.emissivemap,bt.bumpmap,bt.normalmap,bt.displacementmap,bt.gradientmap,bt.fog,bt.lights,{emissive:{value:new _t(0)}}]),vertexShader:ne.meshtoon_vert,fragmentShader:ne.meshtoon_frag},matcap:{uniforms:fn([bt.common,bt.bumpmap,bt.normalmap,bt.displacementmap,bt.fog,{matcap:{value:null}}]),vertexShader:ne.meshmatcap_vert,fragmentShader:ne.meshmatcap_frag},points:{uniforms:fn([bt.points,bt.fog]),vertexShader:ne.points_vert,fragmentShader:ne.points_frag},dashed:{uniforms:fn([bt.common,bt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ne.linedashed_vert,fragmentShader:ne.linedashed_frag},depth:{uniforms:fn([bt.common,bt.displacementmap]),vertexShader:ne.depth_vert,fragmentShader:ne.depth_frag},normal:{uniforms:fn([bt.common,bt.bumpmap,bt.normalmap,bt.displacementmap,{opacity:{value:1}}]),vertexShader:ne.meshnormal_vert,fragmentShader:ne.meshnormal_frag},sprite:{uniforms:fn([bt.sprite,bt.fog]),vertexShader:ne.sprite_vert,fragmentShader:ne.sprite_frag},background:{uniforms:{uvTransform:{value:new ee},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ne.background_vert,fragmentShader:ne.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ee}},vertexShader:ne.backgroundCube_vert,fragmentShader:ne.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ne.cube_vert,fragmentShader:ne.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ne.equirect_vert,fragmentShader:ne.equirect_frag},distanceRGBA:{uniforms:fn([bt.common,bt.displacementmap,{referencePosition:{value:new b},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ne.distanceRGBA_vert,fragmentShader:ne.distanceRGBA_frag},shadow:{uniforms:fn([bt.lights,bt.fog,{color:{value:new _t(0)},opacity:{value:1}}]),vertexShader:ne.shadow_vert,fragmentShader:ne.shadow_frag}};Wn.physical={uniforms:fn([Wn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ee},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ee},clearcoatNormalScale:{value:new Et(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ee},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ee},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ee},sheen:{value:0},sheenColor:{value:new _t(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ee},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ee},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ee},transmissionSamplerSize:{value:new Et},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ee},attenuationDistance:{value:0},attenuationColor:{value:new _t(0)},specularColor:{value:new _t(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ee},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ee},anisotropyVector:{value:new Et},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ee}}]),vertexShader:ne.meshphysical_vert,fragmentShader:ne.meshphysical_frag};const Ko={r:0,b:0,g:0},Vi=new Gn,N0=new Ee;function z0(n,t,e,i,s,o,r){const a=new _t(0);let l=o===!0?0:1,c,u,d=null,h=0,f=null;function m(S){let w=S.isScene===!0?S.background:null;return w&&w.isTexture&&(w=(S.backgroundBlurriness>0?e:t).get(w)),w}function v(S){let w=!1;const M=m(S);M===null?p(a,l):M&&M.isColor&&(p(M,1),w=!0);const E=n.xr.getEnvironmentBlendMode();E==="additive"?i.buffers.color.setClear(0,0,0,1,r):E==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,r),(n.autoClear||w)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function g(S,w){const M=m(w);M&&(M.isCubeTexture||M.mapping===Cr)?(u===void 0&&(u=new R(new ft(1,1,1),new on({name:"BackgroundCubeMaterial",uniforms:Os(Wn.backgroundCube.uniforms),vertexShader:Wn.backgroundCube.vertexShader,fragmentShader:Wn.backgroundCube.fragmentShader,side:rn,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(E,P,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),Vi.copy(w.backgroundRotation),Vi.x*=-1,Vi.y*=-1,Vi.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Vi.y*=-1,Vi.z*=-1),u.material.uniforms.envMap.value=M,u.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(N0.makeRotationFromEuler(Vi)),u.material.toneMapped=fe.getTransfer(M.colorSpace)!==_e,(d!==M||h!==M.version||f!==n.toneMapping)&&(u.material.needsUpdate=!0,d=M,h=M.version,f=n.toneMapping),u.layers.enableAll(),S.unshift(u,u.geometry,u.material,0,0,null)):M&&M.isTexture&&(c===void 0&&(c=new R(new Jt(2,2),new on({name:"BackgroundMaterial",uniforms:Os(Wn.background.uniforms),vertexShader:Wn.background.vertexShader,fragmentShader:Wn.background.fragmentShader,side:Ui,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=M,c.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,c.material.toneMapped=fe.getTransfer(M.colorSpace)!==_e,M.matrixAutoUpdate===!0&&M.updateMatrix(),c.material.uniforms.uvTransform.value.copy(M.matrix),(d!==M||h!==M.version||f!==n.toneMapping)&&(c.material.needsUpdate=!0,d=M,h=M.version,f=n.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null))}function p(S,w){S.getRGB(Ko,qu(n)),i.buffers.color.setClear(Ko.r,Ko.g,Ko.b,w,r)}return{getClearColor:function(){return a},setClearColor:function(S,w=1){a.set(S),l=w,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(S){l=S,p(a,l)},render:v,addToRenderList:g}}function F0(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=h(null);let o=s,r=!1;function a(x,L,B,k,nt){let rt=!1;const st=d(k,B,L);o!==st&&(o=st,c(o.object)),rt=f(x,k,B,nt),rt&&m(x,k,B,nt),nt!==null&&t.update(nt,n.ELEMENT_ARRAY_BUFFER),(rt||r)&&(r=!1,M(x,L,B,k),nt!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(nt).buffer))}function l(){return n.createVertexArray()}function c(x){return n.bindVertexArray(x)}function u(x){return n.deleteVertexArray(x)}function d(x,L,B){const k=B.wireframe===!0;let nt=i[x.id];nt===void 0&&(nt={},i[x.id]=nt);let rt=nt[L.id];rt===void 0&&(rt={},nt[L.id]=rt);let st=rt[k];return st===void 0&&(st=h(l()),rt[k]=st),st}function h(x){const L=[],B=[],k=[];for(let nt=0;nt<e;nt++)L[nt]=0,B[nt]=0,k[nt]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:B,attributeDivisors:k,object:x,attributes:{},index:null}}function f(x,L,B,k){const nt=o.attributes,rt=L.attributes;let st=0;const ot=B.getAttributes();for(const et in ot)if(ot[et].location>=0){const G=nt[et];let U=rt[et];if(U===void 0&&(et==="instanceMatrix"&&x.instanceMatrix&&(U=x.instanceMatrix),et==="instanceColor"&&x.instanceColor&&(U=x.instanceColor)),G===void 0||G.attribute!==U||U&&G.data!==U.data)return!0;st++}return o.attributesNum!==st||o.index!==k}function m(x,L,B,k){const nt={},rt=L.attributes;let st=0;const ot=B.getAttributes();for(const et in ot)if(ot[et].location>=0){let G=rt[et];G===void 0&&(et==="instanceMatrix"&&x.instanceMatrix&&(G=x.instanceMatrix),et==="instanceColor"&&x.instanceColor&&(G=x.instanceColor));const U={};U.attribute=G,G&&G.data&&(U.data=G.data),nt[et]=U,st++}o.attributes=nt,o.attributesNum=st,o.index=k}function v(){const x=o.newAttributes;for(let L=0,B=x.length;L<B;L++)x[L]=0}function g(x){p(x,0)}function p(x,L){const B=o.newAttributes,k=o.enabledAttributes,nt=o.attributeDivisors;B[x]=1,k[x]===0&&(n.enableVertexAttribArray(x),k[x]=1),nt[x]!==L&&(n.vertexAttribDivisor(x,L),nt[x]=L)}function S(){const x=o.newAttributes,L=o.enabledAttributes;for(let B=0,k=L.length;B<k;B++)L[B]!==x[B]&&(n.disableVertexAttribArray(B),L[B]=0)}function w(x,L,B,k,nt,rt,st){st===!0?n.vertexAttribIPointer(x,L,B,nt,rt):n.vertexAttribPointer(x,L,B,k,nt,rt)}function M(x,L,B,k){v();const nt=k.attributes,rt=B.getAttributes(),st=L.defaultAttributeValues;for(const ot in rt){const et=rt[ot];if(et.location>=0){let dt=nt[ot];if(dt===void 0&&(ot==="instanceMatrix"&&x.instanceMatrix&&(dt=x.instanceMatrix),ot==="instanceColor"&&x.instanceColor&&(dt=x.instanceColor)),dt!==void 0){const G=dt.normalized,U=dt.itemSize,tt=t.get(dt);if(tt===void 0)continue;const at=tt.buffer,q=tt.type,pt=tt.bytesPerElement,Ut=q===n.INT||q===n.UNSIGNED_INT||dt.gpuType===Sl;if(dt.isInterleavedBufferAttribute){const Mt=dt.data,Vt=Mt.stride,$t=dt.offset;if(Mt.isInstancedInterleavedBuffer){for(let Qt=0;Qt<et.locationSize;Qt++)p(et.location+Qt,Mt.meshPerAttribute);x.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=Mt.meshPerAttribute*Mt.count)}else for(let Qt=0;Qt<et.locationSize;Qt++)g(et.location+Qt);n.bindBuffer(n.ARRAY_BUFFER,at);for(let Qt=0;Qt<et.locationSize;Qt++)w(et.location+Qt,U/et.locationSize,q,G,Vt*pt,($t+U/et.locationSize*Qt)*pt,Ut)}else{if(dt.isInstancedBufferAttribute){for(let Mt=0;Mt<et.locationSize;Mt++)p(et.location+Mt,dt.meshPerAttribute);x.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=dt.meshPerAttribute*dt.count)}else for(let Mt=0;Mt<et.locationSize;Mt++)g(et.location+Mt);n.bindBuffer(n.ARRAY_BUFFER,at);for(let Mt=0;Mt<et.locationSize;Mt++)w(et.location+Mt,U/et.locationSize,q,G,U*pt,U/et.locationSize*Mt*pt,Ut)}}else if(st!==void 0){const G=st[ot];if(G!==void 0)switch(G.length){case 2:n.vertexAttrib2fv(et.location,G);break;case 3:n.vertexAttrib3fv(et.location,G);break;case 4:n.vertexAttrib4fv(et.location,G);break;default:n.vertexAttrib1fv(et.location,G)}}}}S()}function E(){N();for(const x in i){const L=i[x];for(const B in L){const k=L[B];for(const nt in k)u(k[nt].object),delete k[nt];delete L[B]}delete i[x]}}function P(x){if(i[x.id]===void 0)return;const L=i[x.id];for(const B in L){const k=L[B];for(const nt in k)u(k[nt].object),delete k[nt];delete L[B]}delete i[x.id]}function I(x){for(const L in i){const B=i[L];if(B[x.id]===void 0)continue;const k=B[x.id];for(const nt in k)u(k[nt].object),delete k[nt];delete B[x.id]}}function N(){y(),r=!0,o!==s&&(o=s,c(o.object))}function y(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:N,resetDefaultState:y,dispose:E,releaseStatesOfGeometry:P,releaseStatesOfProgram:I,initAttributes:v,enableAttribute:g,disableUnusedAttributes:S}}function O0(n,t,e){let i;function s(c){i=c}function o(c,u){n.drawArrays(i,c,u),e.update(u,i,1)}function r(c,u,d){d!==0&&(n.drawArraysInstanced(i,c,u,d),e.update(u,i,d))}function a(c,u,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,d);let f=0;for(let m=0;m<d;m++)f+=u[m];e.update(f,i,1)}function l(c,u,d,h){if(d===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let m=0;m<c.length;m++)r(c[m],u[m],h[m]);else{f.multiDrawArraysInstancedWEBGL(i,c,0,u,0,h,0,d);let m=0;for(let v=0;v<d;v++)m+=u[v]*h[v];e.update(m,i,1)}}this.setMode=s,this.render=o,this.renderInstances=r,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function B0(n,t,e,i){let s;function o(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const I=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(I.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function r(I){return!(I!==Fn&&i.convert(I)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(I){const N=I===fi&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(I!==gi&&i.convert(I)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&I!==ui&&!N)}function l(I){if(I==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";I="mediump"}return I==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const d=e.logarithmicDepthBuffer===!0,h=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),m=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),S=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),w=n.getParameter(n.MAX_VARYING_VECTORS),M=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),E=m>0,P=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:o,getMaxPrecision:l,textureFormatReadable:r,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reverseDepthBuffer:h,maxTextures:f,maxVertexTextures:m,maxTextureSize:v,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:S,maxVaryings:w,maxFragmentUniforms:M,vertexTextures:E,maxSamples:P}}function k0(n){const t=this;let e=null,i=0,s=!1,o=!1;const r=new Zi,a=new ee,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){const f=d.length!==0||h||i!==0||s;return s=h,i=d.length,f},this.beginShadows=function(){o=!0,u(null)},this.endShadows=function(){o=!1},this.setGlobalState=function(d,h){e=u(d,h,0)},this.setState=function(d,h,f){const m=d.clippingPlanes,v=d.clipIntersection,g=d.clipShadows,p=n.get(d);if(!s||m===null||m.length===0||o&&!g)o?u(null):c();else{const S=o?0:i,w=S*4;let M=p.clippingState||null;l.value=M,M=u(m,h,w,f);for(let E=0;E!==w;++E)M[E]=e[E];p.clippingState=M,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function u(d,h,f,m){const v=d!==null?d.length:0;let g=null;if(v!==0){if(g=l.value,m!==!0||g===null){const p=f+v*4,S=h.matrixWorldInverse;a.getNormalMatrix(S),(g===null||g.length<p)&&(g=new Float32Array(p));for(let w=0,M=f;w!==v;++w,M+=4)r.copy(d[w]).applyMatrix4(S,a),r.normal.toArray(g,M),g[M+3]=r.constant}l.value=g,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,g}}function G0(n){let t=new WeakMap;function e(r,a){return a===Oa?r.mapping=Us:a===Ba&&(r.mapping=Ns),r}function i(r){if(r&&r.isTexture){const a=r.mapping;if(a===Oa||a===Ba)if(t.has(r)){const l=t.get(r).texture;return e(l,r.mapping)}else{const l=r.image;if(l&&l.height>0){const c=new jh(l.height);return c.fromEquirectangularTexture(n,r),t.set(r,c),r.addEventListener("dispose",s),e(c.texture,r.mapping)}else return null}}return r}function s(r){const a=r.target;a.removeEventListener("dispose",s);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function o(){t=new WeakMap}return{get:i,dispose:o}}class Il extends Xu{constructor(t=-1,e=1,i=1,s=-1,o=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=o,this.far=r,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,o,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=o,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let o=i-t,r=i+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;o+=c*this.view.offsetX,r=o+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(o,r,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Cs=4,xc=[.125,.215,.35,.446,.526,.582],Ji=20,ia=new Il,Sc=new _t;let sa=null,oa=0,ra=0,aa=!1;const Ki=(1+Math.sqrt(5))/2,xs=1/Ki,wc=[new b(-Ki,xs,0),new b(Ki,xs,0),new b(-xs,0,Ki),new b(xs,0,Ki),new b(0,Ki,-xs),new b(0,Ki,xs),new b(-1,1,-1),new b(1,1,-1),new b(-1,1,1),new b(1,1,1)];class bc{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,s=100){sa=this._renderer.getRenderTarget(),oa=this._renderer.getActiveCubeFace(),ra=this._renderer.getActiveMipmapLevel(),aa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const o=this._allocateTargets();return o.depthBuffer=!0,this._sceneToCubeUV(t,i,s,o),e>0&&this._blur(o,0,0,e),this._applyPMREM(o),this._cleanup(o),o}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ac(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Tc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(sa,oa,ra),this._renderer.xr.enabled=aa,t.scissorTest=!1,jo(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Us||t.mapping===Ns?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),sa=this._renderer.getRenderTarget(),oa=this._renderer.getActiveCubeFace(),ra=this._renderer.getActiveMipmapLevel(),aa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:qn,minFilter:qn,generateMipmaps:!1,type:fi,format:Fn,colorSpace:Hs,depthBuffer:!1},s=Ec(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ec(t,e,i);const{_lodMax:o}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=H0(o)),this._blurMaterial=V0(o,t,e)}return s}_compileMaterial(t){const e=new R(this._lodPlanes[0],t);this._renderer.compile(e,ia)}_sceneToCubeUV(t,e,i,s){const a=new Ie(90,1,e,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,h=u.toneMapping;u.getClearColor(Sc),u.toneMapping=Di,u.autoClear=!1;const f=new Fe({name:"PMREM.Background",side:rn,depthWrite:!1,depthTest:!1}),m=new R(new ft,f);let v=!1;const g=t.background;g?g.isColor&&(f.color.copy(g),t.background=null,v=!0):(f.color.copy(Sc),v=!0);for(let p=0;p<6;p++){const S=p%3;S===0?(a.up.set(0,l[p],0),a.lookAt(c[p],0,0)):S===1?(a.up.set(0,0,l[p]),a.lookAt(0,c[p],0)):(a.up.set(0,l[p],0),a.lookAt(0,0,c[p]));const w=this._cubeSize;jo(s,S*w,p>2?w:0,w,w),u.setRenderTarget(s),v&&u.render(m,a),u.render(t,a)}m.geometry.dispose(),m.material.dispose(),u.toneMapping=h,u.autoClear=d,t.background=g}_textureToCubeUV(t,e){const i=this._renderer,s=t.mapping===Us||t.mapping===Ns;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ac()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Tc());const o=s?this._cubemapMaterial:this._equirectMaterial,r=new R(this._lodPlanes[0],o),a=o.uniforms;a.envMap.value=t;const l=this._cubeSize;jo(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(r,ia)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let o=1;o<s;o++){const r=Math.sqrt(this._sigmas[o]*this._sigmas[o]-this._sigmas[o-1]*this._sigmas[o-1]),a=wc[(s-o-1)%wc.length];this._blur(t,o-1,o,r,a)}e.autoClear=i}_blur(t,e,i,s,o){const r=this._pingPongRenderTarget;this._halfBlur(t,r,e,i,s,"latitudinal",o),this._halfBlur(r,t,i,i,s,"longitudinal",o)}_halfBlur(t,e,i,s,o,r,a){const l=this._renderer,c=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,d=new R(this._lodPlanes[s],c),h=c.uniforms,f=this._sizeLods[i]-1,m=isFinite(o)?Math.PI/(2*f):2*Math.PI/(2*Ji-1),v=o/m,g=isFinite(o)?1+Math.floor(u*v):Ji;g>Ji&&console.warn(`sigmaRadians, ${o}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Ji}`);const p=[];let S=0;for(let I=0;I<Ji;++I){const N=I/v,y=Math.exp(-N*N/2);p.push(y),I===0?S+=y:I<g&&(S+=2*y)}for(let I=0;I<p.length;I++)p[I]=p[I]/S;h.envMap.value=t.texture,h.samples.value=g,h.weights.value=p,h.latitudinal.value=r==="latitudinal",a&&(h.poleAxis.value=a);const{_lodMax:w}=this;h.dTheta.value=m,h.mipInt.value=w-i;const M=this._sizeLods[s],E=3*M*(s>w-Cs?s-w+Cs:0),P=4*(this._cubeSize-M);jo(e,E,P,3*M,2*M),l.setRenderTarget(e),l.render(d,ia)}}function H0(n){const t=[],e=[],i=[];let s=n;const o=n-Cs+1+xc.length;for(let r=0;r<o;r++){const a=Math.pow(2,s);e.push(a);let l=1/a;r>n-Cs?l=xc[r-n+Cs-1]:r===0&&(l=0),i.push(l);const c=1/(a-2),u=-c,d=1+c,h=[u,u,d,u,d,d,u,u,d,d,u,d],f=6,m=6,v=3,g=2,p=1,S=new Float32Array(v*m*f),w=new Float32Array(g*m*f),M=new Float32Array(p*m*f);for(let P=0;P<f;P++){const I=P%3*2/3-1,N=P>2?0:-1,y=[I,N,0,I+2/3,N,0,I+2/3,N+1,0,I,N,0,I+2/3,N+1,0,I,N+1,0];S.set(y,v*m*P),w.set(h,g*m*P);const x=[P,P,P,P,P,P];M.set(x,p*m*P)}const E=new Pe;E.setAttribute("position",new Be(S,v)),E.setAttribute("uv",new Be(w,g)),E.setAttribute("faceIndex",new Be(M,p)),t.push(E),s>Cs&&s--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function Ec(n,t,e){const i=new kn(n,t,e);return i.texture.mapping=Cr,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function jo(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function V0(n,t,e){const i=new Float32Array(Ji),s=new b(0,1,0);return new on({name:"SphericalGaussianBlur",defines:{n:Ji,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Dl(),fragmentShader:`

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
		`,blending:hi,depthTest:!1,depthWrite:!1})}function Tc(){return new on({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Dl(),fragmentShader:`

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
		`,blending:hi,depthTest:!1,depthWrite:!1})}function Ac(){return new on({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Dl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:hi,depthTest:!1,depthWrite:!1})}function Dl(){return`

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
	`}function W0(n){let t=new WeakMap,e=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===Oa||l===Ba,u=l===Us||l===Ns;if(c||u){let d=t.get(a);const h=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==h)return e===null&&(e=new bc(n)),d=c?e.fromEquirectangular(a,d):e.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,t.set(a,d),d.texture;if(d!==void 0)return d.texture;{const f=a.image;return c&&f&&f.height>0||u&&f&&s(f)?(e===null&&(e=new bc(n)),d=c?e.fromEquirectangular(a):e.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,t.set(a,d),a.addEventListener("dispose",o),d.texture):null}}}return a}function s(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function o(a){const l=a.target;l.removeEventListener("dispose",o);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function r(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:r}}function q0(n){const t={};function e(i){if(t[i]!==void 0)return t[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const s=e(i);return s===null&&lo("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function X0(n,t,e,i){const s={},o=new WeakMap;function r(d){const h=d.target;h.index!==null&&t.remove(h.index);for(const m in h.attributes)t.remove(h.attributes[m]);for(const m in h.morphAttributes){const v=h.morphAttributes[m];for(let g=0,p=v.length;g<p;g++)t.remove(v[g])}h.removeEventListener("dispose",r),delete s[h.id];const f=o.get(h);f&&(t.remove(f),o.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,e.memory.geometries--}function a(d,h){return s[h.id]===!0||(h.addEventListener("dispose",r),s[h.id]=!0,e.memory.geometries++),h}function l(d){const h=d.attributes;for(const m in h)t.update(h[m],n.ARRAY_BUFFER);const f=d.morphAttributes;for(const m in f){const v=f[m];for(let g=0,p=v.length;g<p;g++)t.update(v[g],n.ARRAY_BUFFER)}}function c(d){const h=[],f=d.index,m=d.attributes.position;let v=0;if(f!==null){const S=f.array;v=f.version;for(let w=0,M=S.length;w<M;w+=3){const E=S[w+0],P=S[w+1],I=S[w+2];h.push(E,P,P,I,I,E)}}else if(m!==void 0){const S=m.array;v=m.version;for(let w=0,M=S.length/3-1;w<M;w+=3){const E=w+0,P=w+1,I=w+2;h.push(E,P,P,I,I,E)}}else return;const g=new(Bu(h)?Wu:Vu)(h,1);g.version=v;const p=o.get(d);p&&t.remove(p),o.set(d,g)}function u(d){const h=o.get(d);if(h){const f=d.index;f!==null&&h.version<f.version&&c(d)}else c(d);return o.get(d)}return{get:a,update:l,getWireframeAttribute:u}}function Y0(n,t,e){let i;function s(h){i=h}let o,r;function a(h){o=h.type,r=h.bytesPerElement}function l(h,f){n.drawElements(i,f,o,h*r),e.update(f,i,1)}function c(h,f,m){m!==0&&(n.drawElementsInstanced(i,f,o,h*r,m),e.update(f,i,m))}function u(h,f,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,o,h,0,m);let g=0;for(let p=0;p<m;p++)g+=f[p];e.update(g,i,1)}function d(h,f,m,v){if(m===0)return;const g=t.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<h.length;p++)c(h[p]/r,f[p],v[p]);else{g.multiDrawElementsInstancedWEBGL(i,f,0,o,h,0,v,0,m);let p=0;for(let S=0;S<m;S++)p+=f[S]*v[S];e.update(p,i,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function $0(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(o,r,a){switch(e.calls++,r){case n.TRIANGLES:e.triangles+=a*(o/3);break;case n.LINES:e.lines+=a*(o/2);break;case n.LINE_STRIP:e.lines+=a*(o-1);break;case n.LINE_LOOP:e.lines+=a*o;break;case n.POINTS:e.points+=a*o;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",r);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function Z0(n,t,e){const i=new WeakMap,s=new be;function o(r,a,l){const c=r.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0;let h=i.get(a);if(h===void 0||h.count!==d){let x=function(){N.dispose(),i.delete(a),a.removeEventListener("dispose",x)};var f=x;h!==void 0&&h.texture.dispose();const m=a.morphAttributes.position!==void 0,v=a.morphAttributes.normal!==void 0,g=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],S=a.morphAttributes.normal||[],w=a.morphAttributes.color||[];let M=0;m===!0&&(M=1),v===!0&&(M=2),g===!0&&(M=3);let E=a.attributes.position.count*M,P=1;E>t.maxTextureSize&&(P=Math.ceil(E/t.maxTextureSize),E=t.maxTextureSize);const I=new Float32Array(E*P*4*d),N=new Gu(I,E,P,d);N.type=ui,N.needsUpdate=!0;const y=M*4;for(let L=0;L<d;L++){const B=p[L],k=S[L],nt=w[L],rt=E*P*4*L;for(let st=0;st<B.count;st++){const ot=st*y;m===!0&&(s.fromBufferAttribute(B,st),I[rt+ot+0]=s.x,I[rt+ot+1]=s.y,I[rt+ot+2]=s.z,I[rt+ot+3]=0),v===!0&&(s.fromBufferAttribute(k,st),I[rt+ot+4]=s.x,I[rt+ot+5]=s.y,I[rt+ot+6]=s.z,I[rt+ot+7]=0),g===!0&&(s.fromBufferAttribute(nt,st),I[rt+ot+8]=s.x,I[rt+ot+9]=s.y,I[rt+ot+10]=s.z,I[rt+ot+11]=nt.itemSize===4?s.w:1)}}h={count:d,texture:N,size:new Et(E,P)},i.set(a,h),a.addEventListener("dispose",x)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",r.morphTexture,e);else{let m=0;for(let g=0;g<c.length;g++)m+=c[g];const v=a.morphTargetsRelative?1:1-m;l.getUniforms().setValue(n,"morphTargetBaseInfluence",v),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",h.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:o}}function K0(n,t,e,i){let s=new WeakMap;function o(l){const c=i.render.frame,u=l.geometry,d=t.get(l,u);if(s.get(d)!==c&&(t.update(d),s.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const h=l.skeleton;s.get(h)!==c&&(h.update(),s.set(h,c))}return d}function r(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:o,dispose:r}}class Zu extends mn{constructor(t,e,i,s,o,r,a,l,c,u=Rs){if(u!==Rs&&u!==Fs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===Rs&&(i=is),i===void 0&&u===Fs&&(i=zs),super(null,s,o,r,a,l,u,i,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:Bn,this.minFilter=l!==void 0?l:Bn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Ku=new mn,Cc=new Zu(1,1),ju=new Gu,Ju=new zh,Qu=new Yu,Rc=[],Pc=[],Lc=new Float32Array(16),Ic=new Float32Array(9),Dc=new Float32Array(4);function Ws(n,t,e){const i=n[0];if(i<=0||i>0)return n;const s=t*e;let o=Rc[s];if(o===void 0&&(o=new Float32Array(s),Rc[s]=o),t!==0){i.toArray(o,0);for(let r=1,a=0;r!==t;++r)a+=e,n[r].toArray(o,a)}return o}function Xe(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function Ye(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function Lr(n,t){let e=Pc[t];e===void 0&&(e=new Int32Array(t),Pc[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function j0(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function J0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Xe(e,t))return;n.uniform2fv(this.addr,t),Ye(e,t)}}function Q0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Xe(e,t))return;n.uniform3fv(this.addr,t),Ye(e,t)}}function tm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Xe(e,t))return;n.uniform4fv(this.addr,t),Ye(e,t)}}function em(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Xe(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),Ye(e,t)}else{if(Xe(e,i))return;Dc.set(i),n.uniformMatrix2fv(this.addr,!1,Dc),Ye(e,i)}}function nm(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Xe(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),Ye(e,t)}else{if(Xe(e,i))return;Ic.set(i),n.uniformMatrix3fv(this.addr,!1,Ic),Ye(e,i)}}function im(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Xe(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),Ye(e,t)}else{if(Xe(e,i))return;Lc.set(i),n.uniformMatrix4fv(this.addr,!1,Lc),Ye(e,i)}}function sm(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function om(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Xe(e,t))return;n.uniform2iv(this.addr,t),Ye(e,t)}}function rm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Xe(e,t))return;n.uniform3iv(this.addr,t),Ye(e,t)}}function am(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Xe(e,t))return;n.uniform4iv(this.addr,t),Ye(e,t)}}function lm(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function cm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Xe(e,t))return;n.uniform2uiv(this.addr,t),Ye(e,t)}}function um(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Xe(e,t))return;n.uniform3uiv(this.addr,t),Ye(e,t)}}function dm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Xe(e,t))return;n.uniform4uiv(this.addr,t),Ye(e,t)}}function hm(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let o;this.type===n.SAMPLER_2D_SHADOW?(Cc.compareFunction=Ou,o=Cc):o=Ku,e.setTexture2D(t||o,s)}function fm(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||Ju,s)}function pm(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||Qu,s)}function mm(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||ju,s)}function gm(n){switch(n){case 5126:return j0;case 35664:return J0;case 35665:return Q0;case 35666:return tm;case 35674:return em;case 35675:return nm;case 35676:return im;case 5124:case 35670:return sm;case 35667:case 35671:return om;case 35668:case 35672:return rm;case 35669:case 35673:return am;case 5125:return lm;case 36294:return cm;case 36295:return um;case 36296:return dm;case 35678:case 36198:case 36298:case 36306:case 35682:return hm;case 35679:case 36299:case 36307:return fm;case 35680:case 36300:case 36308:case 36293:return pm;case 36289:case 36303:case 36311:case 36292:return mm}}function vm(n,t){n.uniform1fv(this.addr,t)}function _m(n,t){const e=Ws(t,this.size,2);n.uniform2fv(this.addr,e)}function Mm(n,t){const e=Ws(t,this.size,3);n.uniform3fv(this.addr,e)}function ym(n,t){const e=Ws(t,this.size,4);n.uniform4fv(this.addr,e)}function xm(n,t){const e=Ws(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function Sm(n,t){const e=Ws(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function wm(n,t){const e=Ws(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function bm(n,t){n.uniform1iv(this.addr,t)}function Em(n,t){n.uniform2iv(this.addr,t)}function Tm(n,t){n.uniform3iv(this.addr,t)}function Am(n,t){n.uniform4iv(this.addr,t)}function Cm(n,t){n.uniform1uiv(this.addr,t)}function Rm(n,t){n.uniform2uiv(this.addr,t)}function Pm(n,t){n.uniform3uiv(this.addr,t)}function Lm(n,t){n.uniform4uiv(this.addr,t)}function Im(n,t,e){const i=this.cache,s=t.length,o=Lr(e,s);Xe(i,o)||(n.uniform1iv(this.addr,o),Ye(i,o));for(let r=0;r!==s;++r)e.setTexture2D(t[r]||Ku,o[r])}function Dm(n,t,e){const i=this.cache,s=t.length,o=Lr(e,s);Xe(i,o)||(n.uniform1iv(this.addr,o),Ye(i,o));for(let r=0;r!==s;++r)e.setTexture3D(t[r]||Ju,o[r])}function Um(n,t,e){const i=this.cache,s=t.length,o=Lr(e,s);Xe(i,o)||(n.uniform1iv(this.addr,o),Ye(i,o));for(let r=0;r!==s;++r)e.setTextureCube(t[r]||Qu,o[r])}function Nm(n,t,e){const i=this.cache,s=t.length,o=Lr(e,s);Xe(i,o)||(n.uniform1iv(this.addr,o),Ye(i,o));for(let r=0;r!==s;++r)e.setTexture2DArray(t[r]||ju,o[r])}function zm(n){switch(n){case 5126:return vm;case 35664:return _m;case 35665:return Mm;case 35666:return ym;case 35674:return xm;case 35675:return Sm;case 35676:return wm;case 5124:case 35670:return bm;case 35667:case 35671:return Em;case 35668:case 35672:return Tm;case 35669:case 35673:return Am;case 5125:return Cm;case 36294:return Rm;case 36295:return Pm;case 36296:return Lm;case 35678:case 36198:case 36298:case 36306:case 35682:return Im;case 35679:case 36299:case 36307:return Dm;case 35680:case 36300:case 36308:case 36293:return Um;case 36289:case 36303:case 36311:case 36292:return Nm}}class Fm{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=gm(e.type)}}class Om{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=zm(e.type)}}class Bm{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const s=this.seq;for(let o=0,r=s.length;o!==r;++o){const a=s[o];a.setValue(t,e[a.id],i)}}}const la=/(\w+)(\])?(\[|\.)?/g;function Uc(n,t){n.seq.push(t),n.map[t.id]=t}function km(n,t,e){const i=n.name,s=i.length;for(la.lastIndex=0;;){const o=la.exec(i),r=la.lastIndex;let a=o[1];const l=o[2]==="]",c=o[3];if(l&&(a=a|0),c===void 0||c==="["&&r+2===s){Uc(e,c===void 0?new Fm(a,n,t):new Om(a,n,t));break}else{let d=e.map[a];d===void 0&&(d=new Bm(a),Uc(e,d)),e=d}}}class mr{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const o=t.getActiveUniform(e,s),r=t.getUniformLocation(e,o.name);km(o,r,this)}}setValue(t,e,i,s){const o=this.map[e];o!==void 0&&o.setValue(t,i,s)}setOptional(t,e,i){const s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let o=0,r=e.length;o!==r;++o){const a=e[o],l=i[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){const i=[];for(let s=0,o=t.length;s!==o;++s){const r=t[s];r.id in e&&i.push(r)}return i}}function Nc(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const Gm=37297;let Hm=0;function Vm(n,t){const e=n.split(`
`),i=[],s=Math.max(t-6,0),o=Math.min(t+6,e.length);for(let r=s;r<o;r++){const a=r+1;i.push(`${a===t?">":" "} ${a}: ${e[r]}`)}return i.join(`
`)}const zc=new ee;function Wm(n){fe._getMatrix(zc,fe.workingColorSpace,n);const t=`mat3( ${zc.elements.map(e=>e.toFixed(4))} )`;switch(fe.getTransfer(n)){case Rr:return[t,"LinearTransferOETF"];case _e:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function Fc(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),s=n.getShaderInfoLog(t).trim();if(i&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const r=parseInt(o[1]);return e.toUpperCase()+`

`+s+`

`+Vm(n.getShaderSource(t),r)}else return s}function qm(n,t){const e=Wm(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Xm(n,t){let e;switch(t){case Su:e="Linear";break;case wu:e="Reinhard";break;case bu:e="Cineon";break;case wo:e="ACESFilmic";break;case Eu:e="AgX";break;case Tu:e="Neutral";break;case th:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Jo=new b;function Ym(){fe.getLuminanceCoefficients(Jo);const n=Jo.x.toFixed(4),t=Jo.y.toFixed(4),e=Jo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function $m(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(co).join(`
`)}function Zm(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function Km(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const o=n.getActiveAttrib(t,s),r=o.name;let a=1;o.type===n.FLOAT_MAT2&&(a=2),o.type===n.FLOAT_MAT3&&(a=3),o.type===n.FLOAT_MAT4&&(a=4),e[r]={type:o.type,location:n.getAttribLocation(t,r),locationSize:a}}return e}function co(n){return n!==""}function Oc(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Bc(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const jm=/^[ \t]*#include +<([\w\d./]+)>/gm;function pl(n){return n.replace(jm,Qm)}const Jm=new Map;function Qm(n,t){let e=ne[t];if(e===void 0){const i=Jm.get(t);if(i!==void 0)e=ne[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return pl(e)}const tg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function kc(n){return n.replace(tg,eg)}function eg(n,t,e,i){let s="";for(let o=parseInt(t);o<parseInt(e);o++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+o+" ]").replace(/UNROLLED_LOOP_INDEX/g,o);return s}function Gc(n){let t=`precision ${n.precision} float;
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
#define LOW_PRECISION`),t}function ng(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Ml?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===yl?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===ai&&(t="SHADOWMAP_TYPE_VSM"),t}function ig(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Us:case Ns:t="ENVMAP_TYPE_CUBE";break;case Cr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function sg(n){let t="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Ns:t="ENVMAP_MODE_REFRACTION";break}return t}function og(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case xl:t="ENVMAP_BLENDING_MULTIPLY";break;case Jd:t="ENVMAP_BLENDING_MIX";break;case Qd:t="ENVMAP_BLENDING_ADD";break}return t}function rg(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:i,maxMip:e}}function ag(n,t,e,i){const s=n.getContext(),o=e.defines;let r=e.vertexShader,a=e.fragmentShader;const l=ng(e),c=ig(e),u=sg(e),d=og(e),h=rg(e),f=$m(e),m=Zm(o),v=s.createProgram();let g,p,S=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(co).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(co).join(`
`),p.length>0&&(p+=`
`)):(g=[Gc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(co).join(`
`),p=[Gc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Di?"#define TONE_MAPPING":"",e.toneMapping!==Di?ne.tonemapping_pars_fragment:"",e.toneMapping!==Di?Xm("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",ne.colorspace_pars_fragment,qm("linearToOutputTexel",e.outputColorSpace),Ym(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(co).join(`
`)),r=pl(r),r=Oc(r,e),r=Bc(r,e),a=pl(a),a=Oc(a,e),a=Bc(a,e),r=kc(r),a=kc(a),e.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",e.glslVersion===Ql?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Ql?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const w=S+g+r,M=S+p+a,E=Nc(s,s.VERTEX_SHADER,w),P=Nc(s,s.FRAGMENT_SHADER,M);s.attachShader(v,E),s.attachShader(v,P),e.index0AttributeName!==void 0?s.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function I(L){if(n.debug.checkShaderErrors){const B=s.getProgramInfoLog(v).trim(),k=s.getShaderInfoLog(E).trim(),nt=s.getShaderInfoLog(P).trim();let rt=!0,st=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(rt=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,v,E,P);else{const ot=Fc(s,E,"vertex"),et=Fc(s,P,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+B+`
`+ot+`
`+et)}else B!==""?console.warn("THREE.WebGLProgram: Program Info Log:",B):(k===""||nt==="")&&(st=!1);st&&(L.diagnostics={runnable:rt,programLog:B,vertexShader:{log:k,prefix:g},fragmentShader:{log:nt,prefix:p}})}s.deleteShader(E),s.deleteShader(P),N=new mr(s,v),y=Km(s,v)}let N;this.getUniforms=function(){return N===void 0&&I(this),N};let y;this.getAttributes=function(){return y===void 0&&I(this),y};let x=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=s.getProgramParameter(v,Gm)),x},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Hm++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=E,this.fragmentShader=P,this}let lg=0;class cg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(e),o=this._getShaderStage(i),r=this._getShaderCacheForMaterial(t);return r.has(s)===!1&&(r.add(s),s.usedTimes++),r.has(o)===!1&&(r.add(o),o.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new ug(t),e.set(t,i)),i}}class ug{constructor(t){this.id=lg++,this.code=t,this.usedTimes=0}}function dg(n,t,e,i,s,o,r){const a=new Pl,l=new cg,c=new Set,u=[],d=s.logarithmicDepthBuffer,h=s.vertexTextures;let f=s.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(y){return c.add(y),y===0?"uv":`uv${y}`}function g(y,x,L,B,k){const nt=B.fog,rt=k.geometry,st=y.isMeshStandardMaterial?B.environment:null,ot=(y.isMeshStandardMaterial?e:t).get(y.envMap||st),et=ot&&ot.mapping===Cr?ot.image.height:null,dt=m[y.type];y.precision!==null&&(f=s.getMaxPrecision(y.precision),f!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",f,"instead."));const G=rt.morphAttributes.position||rt.morphAttributes.normal||rt.morphAttributes.color,U=G!==void 0?G.length:0;let tt=0;rt.morphAttributes.position!==void 0&&(tt=1),rt.morphAttributes.normal!==void 0&&(tt=2),rt.morphAttributes.color!==void 0&&(tt=3);let at,q,pt,Ut;if(dt){const me=Wn[dt];at=me.vertexShader,q=me.fragmentShader}else at=y.vertexShader,q=y.fragmentShader,l.update(y),pt=l.getVertexShaderID(y),Ut=l.getFragmentShaderID(y);const Mt=n.getRenderTarget(),Vt=n.state.buffers.depth.getReversed(),$t=k.isInstancedMesh===!0,Qt=k.isBatchedMesh===!0,Le=!!y.map,re=!!y.matcap,Ne=!!ot,Y=!!y.aoMap,ln=!!y.lightMap,ae=!!y.bumpMap,le=!!y.normalMap,qt=!!y.displacementMap,xe=!!y.emissiveMap,Wt=!!y.metalnessMap,z=!!y.roughnessMap,T=y.anisotropy>0,K=y.clearcoat>0,ct=y.dispersion>0,ht=y.iridescence>0,lt=y.sheen>0,Bt=y.transmission>0,xt=T&&!!y.anisotropyMap,Nt=K&&!!y.clearcoatMap,se=K&&!!y.clearcoatNormalMap,mt=K&&!!y.clearcoatRoughnessMap,It=ht&&!!y.iridescenceMap,Yt=ht&&!!y.iridescenceThicknessMap,Zt=lt&&!!y.sheenColorMap,zt=lt&&!!y.sheenRoughnessMap,he=!!y.specularMap,Kt=!!y.specularColorMap,Ae=!!y.specularIntensityMap,H=Bt&&!!y.transmissionMap,At=Bt&&!!y.thicknessMap,Q=!!y.gradientMap,ut=!!y.alphaMap,Pt=y.alphaTest>0,Lt=!!y.alphaHash,te=!!y.extensions;let ze=Di;y.toneMapped&&(Mt===null||Mt.isXRRenderTarget===!0)&&(ze=n.toneMapping);const je={shaderID:dt,shaderType:y.type,shaderName:y.name,vertexShader:at,fragmentShader:q,defines:y.defines,customVertexShaderID:pt,customFragmentShaderID:Ut,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:f,batching:Qt,batchingColor:Qt&&k._colorsTexture!==null,instancing:$t,instancingColor:$t&&k.instanceColor!==null,instancingMorph:$t&&k.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:Mt===null?n.outputColorSpace:Mt.isXRRenderTarget===!0?Mt.texture.colorSpace:Hs,alphaToCoverage:!!y.alphaToCoverage,map:Le,matcap:re,envMap:Ne,envMapMode:Ne&&ot.mapping,envMapCubeUVHeight:et,aoMap:Y,lightMap:ln,bumpMap:ae,normalMap:le,displacementMap:h&&qt,emissiveMap:xe,normalMapObjectSpace:le&&y.normalMapType===sh,normalMapTangentSpace:le&&y.normalMapType===Cl,metalnessMap:Wt,roughnessMap:z,anisotropy:T,anisotropyMap:xt,clearcoat:K,clearcoatMap:Nt,clearcoatNormalMap:se,clearcoatRoughnessMap:mt,dispersion:ct,iridescence:ht,iridescenceMap:It,iridescenceThicknessMap:Yt,sheen:lt,sheenColorMap:Zt,sheenRoughnessMap:zt,specularMap:he,specularColorMap:Kt,specularIntensityMap:Ae,transmission:Bt,transmissionMap:H,thicknessMap:At,gradientMap:Q,opaque:y.transparent===!1&&y.blending===es&&y.alphaToCoverage===!1,alphaMap:ut,alphaTest:Pt,alphaHash:Lt,combine:y.combine,mapUv:Le&&v(y.map.channel),aoMapUv:Y&&v(y.aoMap.channel),lightMapUv:ln&&v(y.lightMap.channel),bumpMapUv:ae&&v(y.bumpMap.channel),normalMapUv:le&&v(y.normalMap.channel),displacementMapUv:qt&&v(y.displacementMap.channel),emissiveMapUv:xe&&v(y.emissiveMap.channel),metalnessMapUv:Wt&&v(y.metalnessMap.channel),roughnessMapUv:z&&v(y.roughnessMap.channel),anisotropyMapUv:xt&&v(y.anisotropyMap.channel),clearcoatMapUv:Nt&&v(y.clearcoatMap.channel),clearcoatNormalMapUv:se&&v(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:mt&&v(y.clearcoatRoughnessMap.channel),iridescenceMapUv:It&&v(y.iridescenceMap.channel),iridescenceThicknessMapUv:Yt&&v(y.iridescenceThicknessMap.channel),sheenColorMapUv:Zt&&v(y.sheenColorMap.channel),sheenRoughnessMapUv:zt&&v(y.sheenRoughnessMap.channel),specularMapUv:he&&v(y.specularMap.channel),specularColorMapUv:Kt&&v(y.specularColorMap.channel),specularIntensityMapUv:Ae&&v(y.specularIntensityMap.channel),transmissionMapUv:H&&v(y.transmissionMap.channel),thicknessMapUv:At&&v(y.thicknessMap.channel),alphaMapUv:ut&&v(y.alphaMap.channel),vertexTangents:!!rt.attributes.tangent&&(le||T),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!rt.attributes.color&&rt.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!rt.attributes.uv&&(Le||ut),fog:!!nt,useFog:y.fog===!0,fogExp2:!!nt&&nt.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:Vt,skinning:k.isSkinnedMesh===!0,morphTargets:rt.morphAttributes.position!==void 0,morphNormals:rt.morphAttributes.normal!==void 0,morphColors:rt.morphAttributes.color!==void 0,morphTargetsCount:U,morphTextureStride:tt,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:y.dithering,shadowMapEnabled:n.shadowMap.enabled&&L.length>0,shadowMapType:n.shadowMap.type,toneMapping:ze,decodeVideoTexture:Le&&y.map.isVideoTexture===!0&&fe.getTransfer(y.map.colorSpace)===_e,decodeVideoTextureEmissive:xe&&y.emissiveMap.isVideoTexture===!0&&fe.getTransfer(y.emissiveMap.colorSpace)===_e,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Oe,flipSided:y.side===rn,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:te&&y.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(te&&y.extensions.multiDraw===!0||Qt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return je.vertexUv1s=c.has(1),je.vertexUv2s=c.has(2),je.vertexUv3s=c.has(3),c.clear(),je}function p(y){const x=[];if(y.shaderID?x.push(y.shaderID):(x.push(y.customVertexShaderID),x.push(y.customFragmentShaderID)),y.defines!==void 0)for(const L in y.defines)x.push(L),x.push(y.defines[L]);return y.isRawShaderMaterial===!1&&(S(x,y),w(x,y),x.push(n.outputColorSpace)),x.push(y.customProgramCacheKey),x.join()}function S(y,x){y.push(x.precision),y.push(x.outputColorSpace),y.push(x.envMapMode),y.push(x.envMapCubeUVHeight),y.push(x.mapUv),y.push(x.alphaMapUv),y.push(x.lightMapUv),y.push(x.aoMapUv),y.push(x.bumpMapUv),y.push(x.normalMapUv),y.push(x.displacementMapUv),y.push(x.emissiveMapUv),y.push(x.metalnessMapUv),y.push(x.roughnessMapUv),y.push(x.anisotropyMapUv),y.push(x.clearcoatMapUv),y.push(x.clearcoatNormalMapUv),y.push(x.clearcoatRoughnessMapUv),y.push(x.iridescenceMapUv),y.push(x.iridescenceThicknessMapUv),y.push(x.sheenColorMapUv),y.push(x.sheenRoughnessMapUv),y.push(x.specularMapUv),y.push(x.specularColorMapUv),y.push(x.specularIntensityMapUv),y.push(x.transmissionMapUv),y.push(x.thicknessMapUv),y.push(x.combine),y.push(x.fogExp2),y.push(x.sizeAttenuation),y.push(x.morphTargetsCount),y.push(x.morphAttributeCount),y.push(x.numDirLights),y.push(x.numPointLights),y.push(x.numSpotLights),y.push(x.numSpotLightMaps),y.push(x.numHemiLights),y.push(x.numRectAreaLights),y.push(x.numDirLightShadows),y.push(x.numPointLightShadows),y.push(x.numSpotLightShadows),y.push(x.numSpotLightShadowsWithMaps),y.push(x.numLightProbes),y.push(x.shadowMapType),y.push(x.toneMapping),y.push(x.numClippingPlanes),y.push(x.numClipIntersection),y.push(x.depthPacking)}function w(y,x){a.disableAll(),x.supportsVertexTextures&&a.enable(0),x.instancing&&a.enable(1),x.instancingColor&&a.enable(2),x.instancingMorph&&a.enable(3),x.matcap&&a.enable(4),x.envMap&&a.enable(5),x.normalMapObjectSpace&&a.enable(6),x.normalMapTangentSpace&&a.enable(7),x.clearcoat&&a.enable(8),x.iridescence&&a.enable(9),x.alphaTest&&a.enable(10),x.vertexColors&&a.enable(11),x.vertexAlphas&&a.enable(12),x.vertexUv1s&&a.enable(13),x.vertexUv2s&&a.enable(14),x.vertexUv3s&&a.enable(15),x.vertexTangents&&a.enable(16),x.anisotropy&&a.enable(17),x.alphaHash&&a.enable(18),x.batching&&a.enable(19),x.dispersion&&a.enable(20),x.batchingColor&&a.enable(21),y.push(a.mask),a.disableAll(),x.fog&&a.enable(0),x.useFog&&a.enable(1),x.flatShading&&a.enable(2),x.logarithmicDepthBuffer&&a.enable(3),x.reverseDepthBuffer&&a.enable(4),x.skinning&&a.enable(5),x.morphTargets&&a.enable(6),x.morphNormals&&a.enable(7),x.morphColors&&a.enable(8),x.premultipliedAlpha&&a.enable(9),x.shadowMapEnabled&&a.enable(10),x.doubleSided&&a.enable(11),x.flipSided&&a.enable(12),x.useDepthPacking&&a.enable(13),x.dithering&&a.enable(14),x.transmission&&a.enable(15),x.sheen&&a.enable(16),x.opaque&&a.enable(17),x.pointsUvs&&a.enable(18),x.decodeVideoTexture&&a.enable(19),x.decodeVideoTextureEmissive&&a.enable(20),x.alphaToCoverage&&a.enable(21),y.push(a.mask)}function M(y){const x=m[y.type];let L;if(x){const B=Wn[x];L=xo.clone(B.uniforms)}else L=y.uniforms;return L}function E(y,x){let L;for(let B=0,k=u.length;B<k;B++){const nt=u[B];if(nt.cacheKey===x){L=nt,++L.usedTimes;break}}return L===void 0&&(L=new ag(n,x,y,o),u.push(L)),L}function P(y){if(--y.usedTimes===0){const x=u.indexOf(y);u[x]=u[u.length-1],u.pop(),y.destroy()}}function I(y){l.remove(y)}function N(){l.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:M,acquireProgram:E,releaseProgram:P,releaseShaderCache:I,programs:u,dispose:N}}function hg(){let n=new WeakMap;function t(r){return n.has(r)}function e(r){let a=n.get(r);return a===void 0&&(a={},n.set(r,a)),a}function i(r){n.delete(r)}function s(r,a,l){n.get(r)[a]=l}function o(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:o}}function fg(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function Hc(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function Vc(){const n=[];let t=0;const e=[],i=[],s=[];function o(){t=0,e.length=0,i.length=0,s.length=0}function r(d,h,f,m,v,g){let p=n[t];return p===void 0?(p={id:d.id,object:d,geometry:h,material:f,groupOrder:m,renderOrder:d.renderOrder,z:v,group:g},n[t]=p):(p.id=d.id,p.object=d,p.geometry=h,p.material=f,p.groupOrder=m,p.renderOrder=d.renderOrder,p.z=v,p.group=g),t++,p}function a(d,h,f,m,v,g){const p=r(d,h,f,m,v,g);f.transmission>0?i.push(p):f.transparent===!0?s.push(p):e.push(p)}function l(d,h,f,m,v,g){const p=r(d,h,f,m,v,g);f.transmission>0?i.unshift(p):f.transparent===!0?s.unshift(p):e.unshift(p)}function c(d,h){e.length>1&&e.sort(d||fg),i.length>1&&i.sort(h||Hc),s.length>1&&s.sort(h||Hc)}function u(){for(let d=t,h=n.length;d<h;d++){const f=n[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:i,transparent:s,init:o,push:a,unshift:l,finish:u,sort:c}}function pg(){let n=new WeakMap;function t(i,s){const o=n.get(i);let r;return o===void 0?(r=new Vc,n.set(i,[r])):s>=o.length?(r=new Vc,o.push(r)):r=o[s],r}function e(){n=new WeakMap}return{get:t,dispose:e}}function mg(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new b,color:new _t};break;case"SpotLight":e={position:new b,direction:new b,color:new _t,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new b,color:new _t,distance:0,decay:0};break;case"HemisphereLight":e={direction:new b,skyColor:new _t,groundColor:new _t};break;case"RectAreaLight":e={color:new _t,position:new b,halfWidth:new b,halfHeight:new b};break}return n[t.id]=e,e}}}function gg(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Et};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Et};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Et,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let vg=0;function _g(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function Mg(n){const t=new mg,e=gg(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new b);const s=new b,o=new Ee,r=new Ee;function a(c){let u=0,d=0,h=0;for(let y=0;y<9;y++)i.probe[y].set(0,0,0);let f=0,m=0,v=0,g=0,p=0,S=0,w=0,M=0,E=0,P=0,I=0;c.sort(_g);for(let y=0,x=c.length;y<x;y++){const L=c[y],B=L.color,k=L.intensity,nt=L.distance,rt=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)u+=B.r*k,d+=B.g*k,h+=B.b*k;else if(L.isLightProbe){for(let st=0;st<9;st++)i.probe[st].addScaledVector(L.sh.coefficients[st],k);I++}else if(L.isDirectionalLight){const st=t.get(L);if(st.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const ot=L.shadow,et=e.get(L);et.shadowIntensity=ot.intensity,et.shadowBias=ot.bias,et.shadowNormalBias=ot.normalBias,et.shadowRadius=ot.radius,et.shadowMapSize=ot.mapSize,i.directionalShadow[f]=et,i.directionalShadowMap[f]=rt,i.directionalShadowMatrix[f]=L.shadow.matrix,S++}i.directional[f]=st,f++}else if(L.isSpotLight){const st=t.get(L);st.position.setFromMatrixPosition(L.matrixWorld),st.color.copy(B).multiplyScalar(k),st.distance=nt,st.coneCos=Math.cos(L.angle),st.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),st.decay=L.decay,i.spot[v]=st;const ot=L.shadow;if(L.map&&(i.spotLightMap[E]=L.map,E++,ot.updateMatrices(L),L.castShadow&&P++),i.spotLightMatrix[v]=ot.matrix,L.castShadow){const et=e.get(L);et.shadowIntensity=ot.intensity,et.shadowBias=ot.bias,et.shadowNormalBias=ot.normalBias,et.shadowRadius=ot.radius,et.shadowMapSize=ot.mapSize,i.spotShadow[v]=et,i.spotShadowMap[v]=rt,M++}v++}else if(L.isRectAreaLight){const st=t.get(L);st.color.copy(B).multiplyScalar(k),st.halfWidth.set(L.width*.5,0,0),st.halfHeight.set(0,L.height*.5,0),i.rectArea[g]=st,g++}else if(L.isPointLight){const st=t.get(L);if(st.color.copy(L.color).multiplyScalar(L.intensity),st.distance=L.distance,st.decay=L.decay,L.castShadow){const ot=L.shadow,et=e.get(L);et.shadowIntensity=ot.intensity,et.shadowBias=ot.bias,et.shadowNormalBias=ot.normalBias,et.shadowRadius=ot.radius,et.shadowMapSize=ot.mapSize,et.shadowCameraNear=ot.camera.near,et.shadowCameraFar=ot.camera.far,i.pointShadow[m]=et,i.pointShadowMap[m]=rt,i.pointShadowMatrix[m]=L.shadow.matrix,w++}i.point[m]=st,m++}else if(L.isHemisphereLight){const st=t.get(L);st.skyColor.copy(L.color).multiplyScalar(k),st.groundColor.copy(L.groundColor).multiplyScalar(k),i.hemi[p]=st,p++}}g>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=bt.LTC_FLOAT_1,i.rectAreaLTC2=bt.LTC_FLOAT_2):(i.rectAreaLTC1=bt.LTC_HALF_1,i.rectAreaLTC2=bt.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=h;const N=i.hash;(N.directionalLength!==f||N.pointLength!==m||N.spotLength!==v||N.rectAreaLength!==g||N.hemiLength!==p||N.numDirectionalShadows!==S||N.numPointShadows!==w||N.numSpotShadows!==M||N.numSpotMaps!==E||N.numLightProbes!==I)&&(i.directional.length=f,i.spot.length=v,i.rectArea.length=g,i.point.length=m,i.hemi.length=p,i.directionalShadow.length=S,i.directionalShadowMap.length=S,i.pointShadow.length=w,i.pointShadowMap.length=w,i.spotShadow.length=M,i.spotShadowMap.length=M,i.directionalShadowMatrix.length=S,i.pointShadowMatrix.length=w,i.spotLightMatrix.length=M+E-P,i.spotLightMap.length=E,i.numSpotLightShadowsWithMaps=P,i.numLightProbes=I,N.directionalLength=f,N.pointLength=m,N.spotLength=v,N.rectAreaLength=g,N.hemiLength=p,N.numDirectionalShadows=S,N.numPointShadows=w,N.numSpotShadows=M,N.numSpotMaps=E,N.numLightProbes=I,i.version=vg++)}function l(c,u){let d=0,h=0,f=0,m=0,v=0;const g=u.matrixWorldInverse;for(let p=0,S=c.length;p<S;p++){const w=c[p];if(w.isDirectionalLight){const M=i.directional[d];M.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(g),d++}else if(w.isSpotLight){const M=i.spot[f];M.position.setFromMatrixPosition(w.matrixWorld),M.position.applyMatrix4(g),M.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(g),f++}else if(w.isRectAreaLight){const M=i.rectArea[m];M.position.setFromMatrixPosition(w.matrixWorld),M.position.applyMatrix4(g),r.identity(),o.copy(w.matrixWorld),o.premultiply(g),r.extractRotation(o),M.halfWidth.set(w.width*.5,0,0),M.halfHeight.set(0,w.height*.5,0),M.halfWidth.applyMatrix4(r),M.halfHeight.applyMatrix4(r),m++}else if(w.isPointLight){const M=i.point[h];M.position.setFromMatrixPosition(w.matrixWorld),M.position.applyMatrix4(g),h++}else if(w.isHemisphereLight){const M=i.hemi[v];M.direction.setFromMatrixPosition(w.matrixWorld),M.direction.transformDirection(g),v++}}}return{setup:a,setupView:l,state:i}}function Wc(n){const t=new Mg(n),e=[],i=[];function s(u){c.camera=u,e.length=0,i.length=0}function o(u){e.push(u)}function r(u){i.push(u)}function a(){t.setup(e)}function l(u){t.setupView(e,u)}const c={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:o,pushShadow:r}}function yg(n){let t=new WeakMap;function e(s,o=0){const r=t.get(s);let a;return r===void 0?(a=new Wc(n),t.set(s,[a])):o>=r.length?(a=new Wc(n),r.push(a)):a=r[o],a}function i(){t=new WeakMap}return{get:e,dispose:i}}class xg extends vi{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=nh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Sg extends vi{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const wg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,bg=`uniform sampler2D shadow_pass;
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
}`;function Eg(n,t,e){let i=new Ll;const s=new Et,o=new Et,r=new be,a=new xg({depthPacking:ih}),l=new Sg,c={},u=e.maxTextureSize,d={[Ui]:rn,[rn]:Ui,[Oe]:Oe},h=new on({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Et},radius:{value:4}},vertexShader:wg,fragmentShader:bg}),f=h.clone();f.defines.HORIZONTAL_PASS=1;const m=new Pe;m.setAttribute("position",new Be(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new R(m,h),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ml;let p=this.type;this.render=function(P,I,N){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||P.length===0)return;const y=n.getRenderTarget(),x=n.getActiveCubeFace(),L=n.getActiveMipmapLevel(),B=n.state;B.setBlending(hi),B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const k=p!==ai&&this.type===ai,nt=p===ai&&this.type!==ai;for(let rt=0,st=P.length;rt<st;rt++){const ot=P[rt],et=ot.shadow;if(et===void 0){console.warn("THREE.WebGLShadowMap:",ot,"has no shadow.");continue}if(et.autoUpdate===!1&&et.needsUpdate===!1)continue;s.copy(et.mapSize);const dt=et.getFrameExtents();if(s.multiply(dt),o.copy(et.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(o.x=Math.floor(u/dt.x),s.x=o.x*dt.x,et.mapSize.x=o.x),s.y>u&&(o.y=Math.floor(u/dt.y),s.y=o.y*dt.y,et.mapSize.y=o.y)),et.map===null||k===!0||nt===!0){const U=this.type!==ai?{minFilter:Bn,magFilter:Bn}:{};et.map!==null&&et.map.dispose(),et.map=new kn(s.x,s.y,U),et.map.texture.name=ot.name+".shadowMap",et.camera.updateProjectionMatrix()}n.setRenderTarget(et.map),n.clear();const G=et.getViewportCount();for(let U=0;U<G;U++){const tt=et.getViewport(U);r.set(o.x*tt.x,o.y*tt.y,o.x*tt.z,o.y*tt.w),B.viewport(r),et.updateMatrices(ot,U),i=et.getFrustum(),M(I,N,et.camera,ot,this.type)}et.isPointLightShadow!==!0&&this.type===ai&&S(et,N),et.needsUpdate=!1}p=this.type,g.needsUpdate=!1,n.setRenderTarget(y,x,L)};function S(P,I){const N=t.update(v);h.defines.VSM_SAMPLES!==P.blurSamples&&(h.defines.VSM_SAMPLES=P.blurSamples,f.defines.VSM_SAMPLES=P.blurSamples,h.needsUpdate=!0,f.needsUpdate=!0),P.mapPass===null&&(P.mapPass=new kn(s.x,s.y)),h.uniforms.shadow_pass.value=P.map.texture,h.uniforms.resolution.value=P.mapSize,h.uniforms.radius.value=P.radius,n.setRenderTarget(P.mapPass),n.clear(),n.renderBufferDirect(I,null,N,h,v,null),f.uniforms.shadow_pass.value=P.mapPass.texture,f.uniforms.resolution.value=P.mapSize,f.uniforms.radius.value=P.radius,n.setRenderTarget(P.map),n.clear(),n.renderBufferDirect(I,null,N,f,v,null)}function w(P,I,N,y){let x=null;const L=N.isPointLight===!0?P.customDistanceMaterial:P.customDepthMaterial;if(L!==void 0)x=L;else if(x=N.isPointLight===!0?l:a,n.localClippingEnabled&&I.clipShadows===!0&&Array.isArray(I.clippingPlanes)&&I.clippingPlanes.length!==0||I.displacementMap&&I.displacementScale!==0||I.alphaMap&&I.alphaTest>0||I.map&&I.alphaTest>0){const B=x.uuid,k=I.uuid;let nt=c[B];nt===void 0&&(nt={},c[B]=nt);let rt=nt[k];rt===void 0&&(rt=x.clone(),nt[k]=rt,I.addEventListener("dispose",E)),x=rt}if(x.visible=I.visible,x.wireframe=I.wireframe,y===ai?x.side=I.shadowSide!==null?I.shadowSide:I.side:x.side=I.shadowSide!==null?I.shadowSide:d[I.side],x.alphaMap=I.alphaMap,x.alphaTest=I.alphaTest,x.map=I.map,x.clipShadows=I.clipShadows,x.clippingPlanes=I.clippingPlanes,x.clipIntersection=I.clipIntersection,x.displacementMap=I.displacementMap,x.displacementScale=I.displacementScale,x.displacementBias=I.displacementBias,x.wireframeLinewidth=I.wireframeLinewidth,x.linewidth=I.linewidth,N.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const B=n.properties.get(x);B.light=N}return x}function M(P,I,N,y,x){if(P.visible===!1)return;if(P.layers.test(I.layers)&&(P.isMesh||P.isLine||P.isPoints)&&(P.castShadow||P.receiveShadow&&x===ai)&&(!P.frustumCulled||i.intersectsObject(P))){P.modelViewMatrix.multiplyMatrices(N.matrixWorldInverse,P.matrixWorld);const k=t.update(P),nt=P.material;if(Array.isArray(nt)){const rt=k.groups;for(let st=0,ot=rt.length;st<ot;st++){const et=rt[st],dt=nt[et.materialIndex];if(dt&&dt.visible){const G=w(P,dt,y,x);P.onBeforeShadow(n,P,I,N,k,G,et),n.renderBufferDirect(N,null,k,G,P,et),P.onAfterShadow(n,P,I,N,k,G,et)}}}else if(nt.visible){const rt=w(P,nt,y,x);P.onBeforeShadow(n,P,I,N,k,rt,null),n.renderBufferDirect(N,null,k,rt,P,null),P.onAfterShadow(n,P,I,N,k,rt,null)}}const B=P.children;for(let k=0,nt=B.length;k<nt;k++)M(B[k],I,N,y,x)}function E(P){P.target.removeEventListener("dispose",E);for(const N in c){const y=c[N],x=P.target.uuid;x in y&&(y[x].dispose(),delete y[x])}}}const Tg={[La]:Ia,[Da]:za,[Ua]:Fa,[Ds]:Na,[Ia]:La,[za]:Da,[Fa]:Ua,[Na]:Ds};function Ag(n,t){function e(){let H=!1;const At=new be;let Q=null;const ut=new be(0,0,0,0);return{setMask:function(Pt){Q!==Pt&&!H&&(n.colorMask(Pt,Pt,Pt,Pt),Q=Pt)},setLocked:function(Pt){H=Pt},setClear:function(Pt,Lt,te,ze,je){je===!0&&(Pt*=ze,Lt*=ze,te*=ze),At.set(Pt,Lt,te,ze),ut.equals(At)===!1&&(n.clearColor(Pt,Lt,te,ze),ut.copy(At))},reset:function(){H=!1,Q=null,ut.set(-1,0,0,0)}}}function i(){let H=!1,At=!1,Q=null,ut=null,Pt=null;return{setReversed:function(Lt){if(At!==Lt){const te=t.get("EXT_clip_control");At?te.clipControlEXT(te.LOWER_LEFT_EXT,te.ZERO_TO_ONE_EXT):te.clipControlEXT(te.LOWER_LEFT_EXT,te.NEGATIVE_ONE_TO_ONE_EXT);const ze=Pt;Pt=null,this.setClear(ze)}At=Lt},getReversed:function(){return At},setTest:function(Lt){Lt?Mt(n.DEPTH_TEST):Vt(n.DEPTH_TEST)},setMask:function(Lt){Q!==Lt&&!H&&(n.depthMask(Lt),Q=Lt)},setFunc:function(Lt){if(At&&(Lt=Tg[Lt]),ut!==Lt){switch(Lt){case La:n.depthFunc(n.NEVER);break;case Ia:n.depthFunc(n.ALWAYS);break;case Da:n.depthFunc(n.LESS);break;case Ds:n.depthFunc(n.LEQUAL);break;case Ua:n.depthFunc(n.EQUAL);break;case Na:n.depthFunc(n.GEQUAL);break;case za:n.depthFunc(n.GREATER);break;case Fa:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ut=Lt}},setLocked:function(Lt){H=Lt},setClear:function(Lt){Pt!==Lt&&(At&&(Lt=1-Lt),n.clearDepth(Lt),Pt=Lt)},reset:function(){H=!1,Q=null,ut=null,Pt=null,At=!1}}}function s(){let H=!1,At=null,Q=null,ut=null,Pt=null,Lt=null,te=null,ze=null,je=null;return{setTest:function(me){H||(me?Mt(n.STENCIL_TEST):Vt(n.STENCIL_TEST))},setMask:function(me){At!==me&&!H&&(n.stencilMask(me),At=me)},setFunc:function(me,gn,Rn){(Q!==me||ut!==gn||Pt!==Rn)&&(n.stencilFunc(me,gn,Rn),Q=me,ut=gn,Pt=Rn)},setOp:function(me,gn,Rn){(Lt!==me||te!==gn||ze!==Rn)&&(n.stencilOp(me,gn,Rn),Lt=me,te=gn,ze=Rn)},setLocked:function(me){H=me},setClear:function(me){je!==me&&(n.clearStencil(me),je=me)},reset:function(){H=!1,At=null,Q=null,ut=null,Pt=null,Lt=null,te=null,ze=null,je=null}}}const o=new e,r=new i,a=new s,l=new WeakMap,c=new WeakMap;let u={},d={},h=new WeakMap,f=[],m=null,v=!1,g=null,p=null,S=null,w=null,M=null,E=null,P=null,I=new _t(0,0,0),N=0,y=!1,x=null,L=null,B=null,k=null,nt=null;const rt=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let st=!1,ot=0;const et=n.getParameter(n.VERSION);et.indexOf("WebGL")!==-1?(ot=parseFloat(/^WebGL (\d)/.exec(et)[1]),st=ot>=1):et.indexOf("OpenGL ES")!==-1&&(ot=parseFloat(/^OpenGL ES (\d)/.exec(et)[1]),st=ot>=2);let dt=null,G={};const U=n.getParameter(n.SCISSOR_BOX),tt=n.getParameter(n.VIEWPORT),at=new be().fromArray(U),q=new be().fromArray(tt);function pt(H,At,Q,ut){const Pt=new Uint8Array(4),Lt=n.createTexture();n.bindTexture(H,Lt),n.texParameteri(H,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(H,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let te=0;te<Q;te++)H===n.TEXTURE_3D||H===n.TEXTURE_2D_ARRAY?n.texImage3D(At,0,n.RGBA,1,1,ut,0,n.RGBA,n.UNSIGNED_BYTE,Pt):n.texImage2D(At+te,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Pt);return Lt}const Ut={};Ut[n.TEXTURE_2D]=pt(n.TEXTURE_2D,n.TEXTURE_2D,1),Ut[n.TEXTURE_CUBE_MAP]=pt(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),Ut[n.TEXTURE_2D_ARRAY]=pt(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Ut[n.TEXTURE_3D]=pt(n.TEXTURE_3D,n.TEXTURE_3D,1,1),o.setClear(0,0,0,1),r.setClear(1),a.setClear(0),Mt(n.DEPTH_TEST),r.setFunc(Ds),ae(!1),le(Zl),Mt(n.CULL_FACE),Y(hi);function Mt(H){u[H]!==!0&&(n.enable(H),u[H]=!0)}function Vt(H){u[H]!==!1&&(n.disable(H),u[H]=!1)}function $t(H,At){return d[H]!==At?(n.bindFramebuffer(H,At),d[H]=At,H===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=At),H===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=At),!0):!1}function Qt(H,At){let Q=f,ut=!1;if(H){Q=h.get(At),Q===void 0&&(Q=[],h.set(At,Q));const Pt=H.textures;if(Q.length!==Pt.length||Q[0]!==n.COLOR_ATTACHMENT0){for(let Lt=0,te=Pt.length;Lt<te;Lt++)Q[Lt]=n.COLOR_ATTACHMENT0+Lt;Q.length=Pt.length,ut=!0}}else Q[0]!==n.BACK&&(Q[0]=n.BACK,ut=!0);ut&&n.drawBuffers(Q)}function Le(H){return m!==H?(n.useProgram(H),m=H,!0):!1}const re={[ji]:n.FUNC_ADD,[Nd]:n.FUNC_SUBTRACT,[zd]:n.FUNC_REVERSE_SUBTRACT};re[Fd]=n.MIN,re[Od]=n.MAX;const Ne={[Bd]:n.ZERO,[kd]:n.ONE,[Gd]:n.SRC_COLOR,[Ra]:n.SRC_ALPHA,[Yd]:n.SRC_ALPHA_SATURATE,[qd]:n.DST_COLOR,[Vd]:n.DST_ALPHA,[Hd]:n.ONE_MINUS_SRC_COLOR,[Pa]:n.ONE_MINUS_SRC_ALPHA,[Xd]:n.ONE_MINUS_DST_COLOR,[Wd]:n.ONE_MINUS_DST_ALPHA,[$d]:n.CONSTANT_COLOR,[Zd]:n.ONE_MINUS_CONSTANT_COLOR,[Kd]:n.CONSTANT_ALPHA,[jd]:n.ONE_MINUS_CONSTANT_ALPHA};function Y(H,At,Q,ut,Pt,Lt,te,ze,je,me){if(H===hi){v===!0&&(Vt(n.BLEND),v=!1);return}if(v===!1&&(Mt(n.BLEND),v=!0),H!==Ud){if(H!==g||me!==y){if((p!==ji||M!==ji)&&(n.blendEquation(n.FUNC_ADD),p=ji,M=ji),me)switch(H){case es:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case He:n.blendFunc(n.ONE,n.ONE);break;case Kl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case jl:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",H);break}else switch(H){case es:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case He:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Kl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case jl:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",H);break}S=null,w=null,E=null,P=null,I.set(0,0,0),N=0,g=H,y=me}return}Pt=Pt||At,Lt=Lt||Q,te=te||ut,(At!==p||Pt!==M)&&(n.blendEquationSeparate(re[At],re[Pt]),p=At,M=Pt),(Q!==S||ut!==w||Lt!==E||te!==P)&&(n.blendFuncSeparate(Ne[Q],Ne[ut],Ne[Lt],Ne[te]),S=Q,w=ut,E=Lt,P=te),(ze.equals(I)===!1||je!==N)&&(n.blendColor(ze.r,ze.g,ze.b,je),I.copy(ze),N=je),g=H,y=!1}function ln(H,At){H.side===Oe?Vt(n.CULL_FACE):Mt(n.CULL_FACE);let Q=H.side===rn;At&&(Q=!Q),ae(Q),H.blending===es&&H.transparent===!1?Y(hi):Y(H.blending,H.blendEquation,H.blendSrc,H.blendDst,H.blendEquationAlpha,H.blendSrcAlpha,H.blendDstAlpha,H.blendColor,H.blendAlpha,H.premultipliedAlpha),r.setFunc(H.depthFunc),r.setTest(H.depthTest),r.setMask(H.depthWrite),o.setMask(H.colorWrite);const ut=H.stencilWrite;a.setTest(ut),ut&&(a.setMask(H.stencilWriteMask),a.setFunc(H.stencilFunc,H.stencilRef,H.stencilFuncMask),a.setOp(H.stencilFail,H.stencilZFail,H.stencilZPass)),xe(H.polygonOffset,H.polygonOffsetFactor,H.polygonOffsetUnits),H.alphaToCoverage===!0?Mt(n.SAMPLE_ALPHA_TO_COVERAGE):Vt(n.SAMPLE_ALPHA_TO_COVERAGE)}function ae(H){x!==H&&(H?n.frontFace(n.CW):n.frontFace(n.CCW),x=H)}function le(H){H!==Id?(Mt(n.CULL_FACE),H!==L&&(H===Zl?n.cullFace(n.BACK):H===Dd?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Vt(n.CULL_FACE),L=H}function qt(H){H!==B&&(st&&n.lineWidth(H),B=H)}function xe(H,At,Q){H?(Mt(n.POLYGON_OFFSET_FILL),(k!==At||nt!==Q)&&(n.polygonOffset(At,Q),k=At,nt=Q)):Vt(n.POLYGON_OFFSET_FILL)}function Wt(H){H?Mt(n.SCISSOR_TEST):Vt(n.SCISSOR_TEST)}function z(H){H===void 0&&(H=n.TEXTURE0+rt-1),dt!==H&&(n.activeTexture(H),dt=H)}function T(H,At,Q){Q===void 0&&(dt===null?Q=n.TEXTURE0+rt-1:Q=dt);let ut=G[Q];ut===void 0&&(ut={type:void 0,texture:void 0},G[Q]=ut),(ut.type!==H||ut.texture!==At)&&(dt!==Q&&(n.activeTexture(Q),dt=Q),n.bindTexture(H,At||Ut[H]),ut.type=H,ut.texture=At)}function K(){const H=G[dt];H!==void 0&&H.type!==void 0&&(n.bindTexture(H.type,null),H.type=void 0,H.texture=void 0)}function ct(){try{n.compressedTexImage2D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function ht(){try{n.compressedTexImage3D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function lt(){try{n.texSubImage2D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Bt(){try{n.texSubImage3D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function xt(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Nt(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function se(){try{n.texStorage2D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function mt(){try{n.texStorage3D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function It(){try{n.texImage2D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Yt(){try{n.texImage3D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Zt(H){at.equals(H)===!1&&(n.scissor(H.x,H.y,H.z,H.w),at.copy(H))}function zt(H){q.equals(H)===!1&&(n.viewport(H.x,H.y,H.z,H.w),q.copy(H))}function he(H,At){let Q=c.get(At);Q===void 0&&(Q=new WeakMap,c.set(At,Q));let ut=Q.get(H);ut===void 0&&(ut=n.getUniformBlockIndex(At,H.name),Q.set(H,ut))}function Kt(H,At){const ut=c.get(At).get(H);l.get(At)!==ut&&(n.uniformBlockBinding(At,ut,H.__bindingPointIndex),l.set(At,ut))}function Ae(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),r.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},dt=null,G={},d={},h=new WeakMap,f=[],m=null,v=!1,g=null,p=null,S=null,w=null,M=null,E=null,P=null,I=new _t(0,0,0),N=0,y=!1,x=null,L=null,B=null,k=null,nt=null,at.set(0,0,n.canvas.width,n.canvas.height),q.set(0,0,n.canvas.width,n.canvas.height),o.reset(),r.reset(),a.reset()}return{buffers:{color:o,depth:r,stencil:a},enable:Mt,disable:Vt,bindFramebuffer:$t,drawBuffers:Qt,useProgram:Le,setBlending:Y,setMaterial:ln,setFlipSided:ae,setCullFace:le,setLineWidth:qt,setPolygonOffset:xe,setScissorTest:Wt,activeTexture:z,bindTexture:T,unbindTexture:K,compressedTexImage2D:ct,compressedTexImage3D:ht,texImage2D:It,texImage3D:Yt,updateUBOMapping:he,uniformBlockBinding:Kt,texStorage2D:se,texStorage3D:mt,texSubImage2D:lt,texSubImage3D:Bt,compressedTexSubImage2D:xt,compressedTexSubImage3D:Nt,scissor:Zt,viewport:zt,reset:Ae}}function qc(n,t,e,i){const s=Cg(i);switch(e){case Lu:return n*t;case Du:return n*t;case Uu:return n*t*2;case Nu:return n*t/s.components*s.byteLength;case El:return n*t/s.components*s.byteLength;case zu:return n*t*2/s.components*s.byteLength;case Tl:return n*t*2/s.components*s.byteLength;case Iu:return n*t*3/s.components*s.byteLength;case Fn:return n*t*4/s.components*s.byteLength;case Al:return n*t*4/s.components*s.byteLength;case ur:case dr:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case hr:case fr:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Ha:case Wa:return Math.max(n,16)*Math.max(t,8)/4;case Ga:case Va:return Math.max(n,8)*Math.max(t,8)/2;case qa:case Xa:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Ya:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case $a:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Za:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case Ka:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case ja:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case Ja:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case Qa:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case tl:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case el:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case nl:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case il:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case sl:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case ol:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case rl:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case al:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case pr:case ll:case cl:return Math.ceil(n/4)*Math.ceil(t/4)*16;case Fu:case ul:return Math.ceil(n/4)*Math.ceil(t/4)*8;case dl:case hl:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Cg(n){switch(n){case gi:case Cu:return{byteLength:1,components:1};case Mo:case Ru:case fi:return{byteLength:2,components:1};case wl:case bl:return{byteLength:2,components:4};case is:case Sl:case ui:return{byteLength:4,components:1};case Pu:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function Rg(n,t,e,i,s,o,r){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Et,u=new WeakMap;let d;const h=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(z,T){return f?new OffscreenCanvas(z,T):Mr("canvas")}function v(z,T,K){let ct=1;const ht=Wt(z);if((ht.width>K||ht.height>K)&&(ct=K/Math.max(ht.width,ht.height)),ct<1)if(typeof HTMLImageElement<"u"&&z instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&z instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&z instanceof ImageBitmap||typeof VideoFrame<"u"&&z instanceof VideoFrame){const lt=Math.floor(ct*ht.width),Bt=Math.floor(ct*ht.height);d===void 0&&(d=m(lt,Bt));const xt=T?m(lt,Bt):d;return xt.width=lt,xt.height=Bt,xt.getContext("2d").drawImage(z,0,0,lt,Bt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ht.width+"x"+ht.height+") to ("+lt+"x"+Bt+")."),xt}else return"data"in z&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ht.width+"x"+ht.height+")."),z;return z}function g(z){return z.generateMipmaps}function p(z){n.generateMipmap(z)}function S(z){return z.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:z.isWebGL3DRenderTarget?n.TEXTURE_3D:z.isWebGLArrayRenderTarget||z.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function w(z,T,K,ct,ht=!1){if(z!==null){if(n[z]!==void 0)return n[z];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+z+"'")}let lt=T;if(T===n.RED&&(K===n.FLOAT&&(lt=n.R32F),K===n.HALF_FLOAT&&(lt=n.R16F),K===n.UNSIGNED_BYTE&&(lt=n.R8)),T===n.RED_INTEGER&&(K===n.UNSIGNED_BYTE&&(lt=n.R8UI),K===n.UNSIGNED_SHORT&&(lt=n.R16UI),K===n.UNSIGNED_INT&&(lt=n.R32UI),K===n.BYTE&&(lt=n.R8I),K===n.SHORT&&(lt=n.R16I),K===n.INT&&(lt=n.R32I)),T===n.RG&&(K===n.FLOAT&&(lt=n.RG32F),K===n.HALF_FLOAT&&(lt=n.RG16F),K===n.UNSIGNED_BYTE&&(lt=n.RG8)),T===n.RG_INTEGER&&(K===n.UNSIGNED_BYTE&&(lt=n.RG8UI),K===n.UNSIGNED_SHORT&&(lt=n.RG16UI),K===n.UNSIGNED_INT&&(lt=n.RG32UI),K===n.BYTE&&(lt=n.RG8I),K===n.SHORT&&(lt=n.RG16I),K===n.INT&&(lt=n.RG32I)),T===n.RGB_INTEGER&&(K===n.UNSIGNED_BYTE&&(lt=n.RGB8UI),K===n.UNSIGNED_SHORT&&(lt=n.RGB16UI),K===n.UNSIGNED_INT&&(lt=n.RGB32UI),K===n.BYTE&&(lt=n.RGB8I),K===n.SHORT&&(lt=n.RGB16I),K===n.INT&&(lt=n.RGB32I)),T===n.RGBA_INTEGER&&(K===n.UNSIGNED_BYTE&&(lt=n.RGBA8UI),K===n.UNSIGNED_SHORT&&(lt=n.RGBA16UI),K===n.UNSIGNED_INT&&(lt=n.RGBA32UI),K===n.BYTE&&(lt=n.RGBA8I),K===n.SHORT&&(lt=n.RGBA16I),K===n.INT&&(lt=n.RGBA32I)),T===n.RGB&&K===n.UNSIGNED_INT_5_9_9_9_REV&&(lt=n.RGB9_E5),T===n.RGBA){const Bt=ht?Rr:fe.getTransfer(ct);K===n.FLOAT&&(lt=n.RGBA32F),K===n.HALF_FLOAT&&(lt=n.RGBA16F),K===n.UNSIGNED_BYTE&&(lt=Bt===_e?n.SRGB8_ALPHA8:n.RGBA8),K===n.UNSIGNED_SHORT_4_4_4_4&&(lt=n.RGBA4),K===n.UNSIGNED_SHORT_5_5_5_1&&(lt=n.RGB5_A1)}return(lt===n.R16F||lt===n.R32F||lt===n.RG16F||lt===n.RG32F||lt===n.RGBA16F||lt===n.RGBA32F)&&t.get("EXT_color_buffer_float"),lt}function M(z,T){let K;return z?T===null||T===is||T===zs?K=n.DEPTH24_STENCIL8:T===ui?K=n.DEPTH32F_STENCIL8:T===Mo&&(K=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):T===null||T===is||T===zs?K=n.DEPTH_COMPONENT24:T===ui?K=n.DEPTH_COMPONENT32F:T===Mo&&(K=n.DEPTH_COMPONENT16),K}function E(z,T){return g(z)===!0||z.isFramebufferTexture&&z.minFilter!==Bn&&z.minFilter!==qn?Math.log2(Math.max(T.width,T.height))+1:z.mipmaps!==void 0&&z.mipmaps.length>0?z.mipmaps.length:z.isCompressedTexture&&Array.isArray(z.image)?T.mipmaps.length:1}function P(z){const T=z.target;T.removeEventListener("dispose",P),N(T),T.isVideoTexture&&u.delete(T)}function I(z){const T=z.target;T.removeEventListener("dispose",I),x(T)}function N(z){const T=i.get(z);if(T.__webglInit===void 0)return;const K=z.source,ct=h.get(K);if(ct){const ht=ct[T.__cacheKey];ht.usedTimes--,ht.usedTimes===0&&y(z),Object.keys(ct).length===0&&h.delete(K)}i.remove(z)}function y(z){const T=i.get(z);n.deleteTexture(T.__webglTexture);const K=z.source,ct=h.get(K);delete ct[T.__cacheKey],r.memory.textures--}function x(z){const T=i.get(z);if(z.depthTexture&&(z.depthTexture.dispose(),i.remove(z.depthTexture)),z.isWebGLCubeRenderTarget)for(let ct=0;ct<6;ct++){if(Array.isArray(T.__webglFramebuffer[ct]))for(let ht=0;ht<T.__webglFramebuffer[ct].length;ht++)n.deleteFramebuffer(T.__webglFramebuffer[ct][ht]);else n.deleteFramebuffer(T.__webglFramebuffer[ct]);T.__webglDepthbuffer&&n.deleteRenderbuffer(T.__webglDepthbuffer[ct])}else{if(Array.isArray(T.__webglFramebuffer))for(let ct=0;ct<T.__webglFramebuffer.length;ct++)n.deleteFramebuffer(T.__webglFramebuffer[ct]);else n.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&n.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&n.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let ct=0;ct<T.__webglColorRenderbuffer.length;ct++)T.__webglColorRenderbuffer[ct]&&n.deleteRenderbuffer(T.__webglColorRenderbuffer[ct]);T.__webglDepthRenderbuffer&&n.deleteRenderbuffer(T.__webglDepthRenderbuffer)}const K=z.textures;for(let ct=0,ht=K.length;ct<ht;ct++){const lt=i.get(K[ct]);lt.__webglTexture&&(n.deleteTexture(lt.__webglTexture),r.memory.textures--),i.remove(K[ct])}i.remove(z)}let L=0;function B(){L=0}function k(){const z=L;return z>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+z+" texture units while this GPU supports only "+s.maxTextures),L+=1,z}function nt(z){const T=[];return T.push(z.wrapS),T.push(z.wrapT),T.push(z.wrapR||0),T.push(z.magFilter),T.push(z.minFilter),T.push(z.anisotropy),T.push(z.internalFormat),T.push(z.format),T.push(z.type),T.push(z.generateMipmaps),T.push(z.premultiplyAlpha),T.push(z.flipY),T.push(z.unpackAlignment),T.push(z.colorSpace),T.join()}function rt(z,T){const K=i.get(z);if(z.isVideoTexture&&qt(z),z.isRenderTargetTexture===!1&&z.version>0&&K.__version!==z.version){const ct=z.image;if(ct===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ct.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{q(K,z,T);return}}e.bindTexture(n.TEXTURE_2D,K.__webglTexture,n.TEXTURE0+T)}function st(z,T){const K=i.get(z);if(z.version>0&&K.__version!==z.version){q(K,z,T);return}e.bindTexture(n.TEXTURE_2D_ARRAY,K.__webglTexture,n.TEXTURE0+T)}function ot(z,T){const K=i.get(z);if(z.version>0&&K.__version!==z.version){q(K,z,T);return}e.bindTexture(n.TEXTURE_3D,K.__webglTexture,n.TEXTURE0+T)}function et(z,T){const K=i.get(z);if(z.version>0&&K.__version!==z.version){pt(K,z,T);return}e.bindTexture(n.TEXTURE_CUBE_MAP,K.__webglTexture,n.TEXTURE0+T)}const dt={[Ni]:n.REPEAT,[Qi]:n.CLAMP_TO_EDGE,[ka]:n.MIRRORED_REPEAT},G={[Bn]:n.NEAREST,[eh]:n.NEAREST_MIPMAP_NEAREST,[Io]:n.NEAREST_MIPMAP_LINEAR,[qn]:n.LINEAR,[zr]:n.LINEAR_MIPMAP_NEAREST,[ts]:n.LINEAR_MIPMAP_LINEAR},U={[oh]:n.NEVER,[dh]:n.ALWAYS,[rh]:n.LESS,[Ou]:n.LEQUAL,[ah]:n.EQUAL,[uh]:n.GEQUAL,[lh]:n.GREATER,[ch]:n.NOTEQUAL};function tt(z,T){if(T.type===ui&&t.has("OES_texture_float_linear")===!1&&(T.magFilter===qn||T.magFilter===zr||T.magFilter===Io||T.magFilter===ts||T.minFilter===qn||T.minFilter===zr||T.minFilter===Io||T.minFilter===ts)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(z,n.TEXTURE_WRAP_S,dt[T.wrapS]),n.texParameteri(z,n.TEXTURE_WRAP_T,dt[T.wrapT]),(z===n.TEXTURE_3D||z===n.TEXTURE_2D_ARRAY)&&n.texParameteri(z,n.TEXTURE_WRAP_R,dt[T.wrapR]),n.texParameteri(z,n.TEXTURE_MAG_FILTER,G[T.magFilter]),n.texParameteri(z,n.TEXTURE_MIN_FILTER,G[T.minFilter]),T.compareFunction&&(n.texParameteri(z,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(z,n.TEXTURE_COMPARE_FUNC,U[T.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===Bn||T.minFilter!==Io&&T.minFilter!==ts||T.type===ui&&t.has("OES_texture_float_linear")===!1)return;if(T.anisotropy>1||i.get(T).__currentAnisotropy){const K=t.get("EXT_texture_filter_anisotropic");n.texParameterf(z,K.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,s.getMaxAnisotropy())),i.get(T).__currentAnisotropy=T.anisotropy}}}function at(z,T){let K=!1;z.__webglInit===void 0&&(z.__webglInit=!0,T.addEventListener("dispose",P));const ct=T.source;let ht=h.get(ct);ht===void 0&&(ht={},h.set(ct,ht));const lt=nt(T);if(lt!==z.__cacheKey){ht[lt]===void 0&&(ht[lt]={texture:n.createTexture(),usedTimes:0},r.memory.textures++,K=!0),ht[lt].usedTimes++;const Bt=ht[z.__cacheKey];Bt!==void 0&&(ht[z.__cacheKey].usedTimes--,Bt.usedTimes===0&&y(T)),z.__cacheKey=lt,z.__webglTexture=ht[lt].texture}return K}function q(z,T,K){let ct=n.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(ct=n.TEXTURE_2D_ARRAY),T.isData3DTexture&&(ct=n.TEXTURE_3D);const ht=at(z,T),lt=T.source;e.bindTexture(ct,z.__webglTexture,n.TEXTURE0+K);const Bt=i.get(lt);if(lt.version!==Bt.__version||ht===!0){e.activeTexture(n.TEXTURE0+K);const xt=fe.getPrimaries(fe.workingColorSpace),Nt=T.colorSpace===Pi?null:fe.getPrimaries(T.colorSpace),se=T.colorSpace===Pi||xt===Nt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,T.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,T.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,se);let mt=v(T.image,!1,s.maxTextureSize);mt=xe(T,mt);const It=o.convert(T.format,T.colorSpace),Yt=o.convert(T.type);let Zt=w(T.internalFormat,It,Yt,T.colorSpace,T.isVideoTexture);tt(ct,T);let zt;const he=T.mipmaps,Kt=T.isVideoTexture!==!0,Ae=Bt.__version===void 0||ht===!0,H=lt.dataReady,At=E(T,mt);if(T.isDepthTexture)Zt=M(T.format===Fs,T.type),Ae&&(Kt?e.texStorage2D(n.TEXTURE_2D,1,Zt,mt.width,mt.height):e.texImage2D(n.TEXTURE_2D,0,Zt,mt.width,mt.height,0,It,Yt,null));else if(T.isDataTexture)if(he.length>0){Kt&&Ae&&e.texStorage2D(n.TEXTURE_2D,At,Zt,he[0].width,he[0].height);for(let Q=0,ut=he.length;Q<ut;Q++)zt=he[Q],Kt?H&&e.texSubImage2D(n.TEXTURE_2D,Q,0,0,zt.width,zt.height,It,Yt,zt.data):e.texImage2D(n.TEXTURE_2D,Q,Zt,zt.width,zt.height,0,It,Yt,zt.data);T.generateMipmaps=!1}else Kt?(Ae&&e.texStorage2D(n.TEXTURE_2D,At,Zt,mt.width,mt.height),H&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,mt.width,mt.height,It,Yt,mt.data)):e.texImage2D(n.TEXTURE_2D,0,Zt,mt.width,mt.height,0,It,Yt,mt.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){Kt&&Ae&&e.texStorage3D(n.TEXTURE_2D_ARRAY,At,Zt,he[0].width,he[0].height,mt.depth);for(let Q=0,ut=he.length;Q<ut;Q++)if(zt=he[Q],T.format!==Fn)if(It!==null)if(Kt){if(H)if(T.layerUpdates.size>0){const Pt=qc(zt.width,zt.height,T.format,T.type);for(const Lt of T.layerUpdates){const te=zt.data.subarray(Lt*Pt/zt.data.BYTES_PER_ELEMENT,(Lt+1)*Pt/zt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,Q,0,0,Lt,zt.width,zt.height,1,It,te)}T.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,Q,0,0,0,zt.width,zt.height,mt.depth,It,zt.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,Q,Zt,zt.width,zt.height,mt.depth,0,zt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Kt?H&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,Q,0,0,0,zt.width,zt.height,mt.depth,It,Yt,zt.data):e.texImage3D(n.TEXTURE_2D_ARRAY,Q,Zt,zt.width,zt.height,mt.depth,0,It,Yt,zt.data)}else{Kt&&Ae&&e.texStorage2D(n.TEXTURE_2D,At,Zt,he[0].width,he[0].height);for(let Q=0,ut=he.length;Q<ut;Q++)zt=he[Q],T.format!==Fn?It!==null?Kt?H&&e.compressedTexSubImage2D(n.TEXTURE_2D,Q,0,0,zt.width,zt.height,It,zt.data):e.compressedTexImage2D(n.TEXTURE_2D,Q,Zt,zt.width,zt.height,0,zt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Kt?H&&e.texSubImage2D(n.TEXTURE_2D,Q,0,0,zt.width,zt.height,It,Yt,zt.data):e.texImage2D(n.TEXTURE_2D,Q,Zt,zt.width,zt.height,0,It,Yt,zt.data)}else if(T.isDataArrayTexture)if(Kt){if(Ae&&e.texStorage3D(n.TEXTURE_2D_ARRAY,At,Zt,mt.width,mt.height,mt.depth),H)if(T.layerUpdates.size>0){const Q=qc(mt.width,mt.height,T.format,T.type);for(const ut of T.layerUpdates){const Pt=mt.data.subarray(ut*Q/mt.data.BYTES_PER_ELEMENT,(ut+1)*Q/mt.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,ut,mt.width,mt.height,1,It,Yt,Pt)}T.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,mt.width,mt.height,mt.depth,It,Yt,mt.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,Zt,mt.width,mt.height,mt.depth,0,It,Yt,mt.data);else if(T.isData3DTexture)Kt?(Ae&&e.texStorage3D(n.TEXTURE_3D,At,Zt,mt.width,mt.height,mt.depth),H&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,mt.width,mt.height,mt.depth,It,Yt,mt.data)):e.texImage3D(n.TEXTURE_3D,0,Zt,mt.width,mt.height,mt.depth,0,It,Yt,mt.data);else if(T.isFramebufferTexture){if(Ae)if(Kt)e.texStorage2D(n.TEXTURE_2D,At,Zt,mt.width,mt.height);else{let Q=mt.width,ut=mt.height;for(let Pt=0;Pt<At;Pt++)e.texImage2D(n.TEXTURE_2D,Pt,Zt,Q,ut,0,It,Yt,null),Q>>=1,ut>>=1}}else if(he.length>0){if(Kt&&Ae){const Q=Wt(he[0]);e.texStorage2D(n.TEXTURE_2D,At,Zt,Q.width,Q.height)}for(let Q=0,ut=he.length;Q<ut;Q++)zt=he[Q],Kt?H&&e.texSubImage2D(n.TEXTURE_2D,Q,0,0,It,Yt,zt):e.texImage2D(n.TEXTURE_2D,Q,Zt,It,Yt,zt);T.generateMipmaps=!1}else if(Kt){if(Ae){const Q=Wt(mt);e.texStorage2D(n.TEXTURE_2D,At,Zt,Q.width,Q.height)}H&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,It,Yt,mt)}else e.texImage2D(n.TEXTURE_2D,0,Zt,It,Yt,mt);g(T)&&p(ct),Bt.__version=lt.version,T.onUpdate&&T.onUpdate(T)}z.__version=T.version}function pt(z,T,K){if(T.image.length!==6)return;const ct=at(z,T),ht=T.source;e.bindTexture(n.TEXTURE_CUBE_MAP,z.__webglTexture,n.TEXTURE0+K);const lt=i.get(ht);if(ht.version!==lt.__version||ct===!0){e.activeTexture(n.TEXTURE0+K);const Bt=fe.getPrimaries(fe.workingColorSpace),xt=T.colorSpace===Pi?null:fe.getPrimaries(T.colorSpace),Nt=T.colorSpace===Pi||Bt===xt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,T.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,T.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Nt);const se=T.isCompressedTexture||T.image[0].isCompressedTexture,mt=T.image[0]&&T.image[0].isDataTexture,It=[];for(let ut=0;ut<6;ut++)!se&&!mt?It[ut]=v(T.image[ut],!0,s.maxCubemapSize):It[ut]=mt?T.image[ut].image:T.image[ut],It[ut]=xe(T,It[ut]);const Yt=It[0],Zt=o.convert(T.format,T.colorSpace),zt=o.convert(T.type),he=w(T.internalFormat,Zt,zt,T.colorSpace),Kt=T.isVideoTexture!==!0,Ae=lt.__version===void 0||ct===!0,H=ht.dataReady;let At=E(T,Yt);tt(n.TEXTURE_CUBE_MAP,T);let Q;if(se){Kt&&Ae&&e.texStorage2D(n.TEXTURE_CUBE_MAP,At,he,Yt.width,Yt.height);for(let ut=0;ut<6;ut++){Q=It[ut].mipmaps;for(let Pt=0;Pt<Q.length;Pt++){const Lt=Q[Pt];T.format!==Fn?Zt!==null?Kt?H&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Pt,0,0,Lt.width,Lt.height,Zt,Lt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Pt,he,Lt.width,Lt.height,0,Lt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Kt?H&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Pt,0,0,Lt.width,Lt.height,Zt,zt,Lt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Pt,he,Lt.width,Lt.height,0,Zt,zt,Lt.data)}}}else{if(Q=T.mipmaps,Kt&&Ae){Q.length>0&&At++;const ut=Wt(It[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,At,he,ut.width,ut.height)}for(let ut=0;ut<6;ut++)if(mt){Kt?H&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0,0,0,It[ut].width,It[ut].height,Zt,zt,It[ut].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0,he,It[ut].width,It[ut].height,0,Zt,zt,It[ut].data);for(let Pt=0;Pt<Q.length;Pt++){const te=Q[Pt].image[ut].image;Kt?H&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Pt+1,0,0,te.width,te.height,Zt,zt,te.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Pt+1,he,te.width,te.height,0,Zt,zt,te.data)}}else{Kt?H&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0,0,0,Zt,zt,It[ut]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0,he,Zt,zt,It[ut]);for(let Pt=0;Pt<Q.length;Pt++){const Lt=Q[Pt];Kt?H&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Pt+1,0,0,Zt,zt,Lt.image[ut]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Pt+1,he,Zt,zt,Lt.image[ut])}}}g(T)&&p(n.TEXTURE_CUBE_MAP),lt.__version=ht.version,T.onUpdate&&T.onUpdate(T)}z.__version=T.version}function Ut(z,T,K,ct,ht,lt){const Bt=o.convert(K.format,K.colorSpace),xt=o.convert(K.type),Nt=w(K.internalFormat,Bt,xt,K.colorSpace),se=i.get(T),mt=i.get(K);if(mt.__renderTarget=T,!se.__hasExternalTextures){const It=Math.max(1,T.width>>lt),Yt=Math.max(1,T.height>>lt);ht===n.TEXTURE_3D||ht===n.TEXTURE_2D_ARRAY?e.texImage3D(ht,lt,Nt,It,Yt,T.depth,0,Bt,xt,null):e.texImage2D(ht,lt,Nt,It,Yt,0,Bt,xt,null)}e.bindFramebuffer(n.FRAMEBUFFER,z),le(T)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ct,ht,mt.__webglTexture,0,ae(T)):(ht===n.TEXTURE_2D||ht>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ht<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,ct,ht,mt.__webglTexture,lt),e.bindFramebuffer(n.FRAMEBUFFER,null)}function Mt(z,T,K){if(n.bindRenderbuffer(n.RENDERBUFFER,z),T.depthBuffer){const ct=T.depthTexture,ht=ct&&ct.isDepthTexture?ct.type:null,lt=M(T.stencilBuffer,ht),Bt=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,xt=ae(T);le(T)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,xt,lt,T.width,T.height):K?n.renderbufferStorageMultisample(n.RENDERBUFFER,xt,lt,T.width,T.height):n.renderbufferStorage(n.RENDERBUFFER,lt,T.width,T.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Bt,n.RENDERBUFFER,z)}else{const ct=T.textures;for(let ht=0;ht<ct.length;ht++){const lt=ct[ht],Bt=o.convert(lt.format,lt.colorSpace),xt=o.convert(lt.type),Nt=w(lt.internalFormat,Bt,xt,lt.colorSpace),se=ae(T);K&&le(T)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,se,Nt,T.width,T.height):le(T)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,se,Nt,T.width,T.height):n.renderbufferStorage(n.RENDERBUFFER,Nt,T.width,T.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Vt(z,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,z),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const ct=i.get(T.depthTexture);ct.__renderTarget=T,(!ct.__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),rt(T.depthTexture,0);const ht=ct.__webglTexture,lt=ae(T);if(T.depthTexture.format===Rs)le(T)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ht,0,lt):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ht,0);else if(T.depthTexture.format===Fs)le(T)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ht,0,lt):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ht,0);else throw new Error("Unknown depthTexture format")}function $t(z){const T=i.get(z),K=z.isWebGLCubeRenderTarget===!0;if(T.__boundDepthTexture!==z.depthTexture){const ct=z.depthTexture;if(T.__depthDisposeCallback&&T.__depthDisposeCallback(),ct){const ht=()=>{delete T.__boundDepthTexture,delete T.__depthDisposeCallback,ct.removeEventListener("dispose",ht)};ct.addEventListener("dispose",ht),T.__depthDisposeCallback=ht}T.__boundDepthTexture=ct}if(z.depthTexture&&!T.__autoAllocateDepthBuffer){if(K)throw new Error("target.depthTexture not supported in Cube render targets");Vt(T.__webglFramebuffer,z)}else if(K){T.__webglDepthbuffer=[];for(let ct=0;ct<6;ct++)if(e.bindFramebuffer(n.FRAMEBUFFER,T.__webglFramebuffer[ct]),T.__webglDepthbuffer[ct]===void 0)T.__webglDepthbuffer[ct]=n.createRenderbuffer(),Mt(T.__webglDepthbuffer[ct],z,!1);else{const ht=z.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,lt=T.__webglDepthbuffer[ct];n.bindRenderbuffer(n.RENDERBUFFER,lt),n.framebufferRenderbuffer(n.FRAMEBUFFER,ht,n.RENDERBUFFER,lt)}}else if(e.bindFramebuffer(n.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer===void 0)T.__webglDepthbuffer=n.createRenderbuffer(),Mt(T.__webglDepthbuffer,z,!1);else{const ct=z.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ht=T.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,ht),n.framebufferRenderbuffer(n.FRAMEBUFFER,ct,n.RENDERBUFFER,ht)}e.bindFramebuffer(n.FRAMEBUFFER,null)}function Qt(z,T,K){const ct=i.get(z);T!==void 0&&Ut(ct.__webglFramebuffer,z,z.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),K!==void 0&&$t(z)}function Le(z){const T=z.texture,K=i.get(z),ct=i.get(T);z.addEventListener("dispose",I);const ht=z.textures,lt=z.isWebGLCubeRenderTarget===!0,Bt=ht.length>1;if(Bt||(ct.__webglTexture===void 0&&(ct.__webglTexture=n.createTexture()),ct.__version=T.version,r.memory.textures++),lt){K.__webglFramebuffer=[];for(let xt=0;xt<6;xt++)if(T.mipmaps&&T.mipmaps.length>0){K.__webglFramebuffer[xt]=[];for(let Nt=0;Nt<T.mipmaps.length;Nt++)K.__webglFramebuffer[xt][Nt]=n.createFramebuffer()}else K.__webglFramebuffer[xt]=n.createFramebuffer()}else{if(T.mipmaps&&T.mipmaps.length>0){K.__webglFramebuffer=[];for(let xt=0;xt<T.mipmaps.length;xt++)K.__webglFramebuffer[xt]=n.createFramebuffer()}else K.__webglFramebuffer=n.createFramebuffer();if(Bt)for(let xt=0,Nt=ht.length;xt<Nt;xt++){const se=i.get(ht[xt]);se.__webglTexture===void 0&&(se.__webglTexture=n.createTexture(),r.memory.textures++)}if(z.samples>0&&le(z)===!1){K.__webglMultisampledFramebuffer=n.createFramebuffer(),K.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,K.__webglMultisampledFramebuffer);for(let xt=0;xt<ht.length;xt++){const Nt=ht[xt];K.__webglColorRenderbuffer[xt]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,K.__webglColorRenderbuffer[xt]);const se=o.convert(Nt.format,Nt.colorSpace),mt=o.convert(Nt.type),It=w(Nt.internalFormat,se,mt,Nt.colorSpace,z.isXRRenderTarget===!0),Yt=ae(z);n.renderbufferStorageMultisample(n.RENDERBUFFER,Yt,It,z.width,z.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+xt,n.RENDERBUFFER,K.__webglColorRenderbuffer[xt])}n.bindRenderbuffer(n.RENDERBUFFER,null),z.depthBuffer&&(K.__webglDepthRenderbuffer=n.createRenderbuffer(),Mt(K.__webglDepthRenderbuffer,z,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(lt){e.bindTexture(n.TEXTURE_CUBE_MAP,ct.__webglTexture),tt(n.TEXTURE_CUBE_MAP,T);for(let xt=0;xt<6;xt++)if(T.mipmaps&&T.mipmaps.length>0)for(let Nt=0;Nt<T.mipmaps.length;Nt++)Ut(K.__webglFramebuffer[xt][Nt],z,T,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+xt,Nt);else Ut(K.__webglFramebuffer[xt],z,T,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+xt,0);g(T)&&p(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Bt){for(let xt=0,Nt=ht.length;xt<Nt;xt++){const se=ht[xt],mt=i.get(se);e.bindTexture(n.TEXTURE_2D,mt.__webglTexture),tt(n.TEXTURE_2D,se),Ut(K.__webglFramebuffer,z,se,n.COLOR_ATTACHMENT0+xt,n.TEXTURE_2D,0),g(se)&&p(n.TEXTURE_2D)}e.unbindTexture()}else{let xt=n.TEXTURE_2D;if((z.isWebGL3DRenderTarget||z.isWebGLArrayRenderTarget)&&(xt=z.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(xt,ct.__webglTexture),tt(xt,T),T.mipmaps&&T.mipmaps.length>0)for(let Nt=0;Nt<T.mipmaps.length;Nt++)Ut(K.__webglFramebuffer[Nt],z,T,n.COLOR_ATTACHMENT0,xt,Nt);else Ut(K.__webglFramebuffer,z,T,n.COLOR_ATTACHMENT0,xt,0);g(T)&&p(xt),e.unbindTexture()}z.depthBuffer&&$t(z)}function re(z){const T=z.textures;for(let K=0,ct=T.length;K<ct;K++){const ht=T[K];if(g(ht)){const lt=S(z),Bt=i.get(ht).__webglTexture;e.bindTexture(lt,Bt),p(lt),e.unbindTexture()}}}const Ne=[],Y=[];function ln(z){if(z.samples>0){if(le(z)===!1){const T=z.textures,K=z.width,ct=z.height;let ht=n.COLOR_BUFFER_BIT;const lt=z.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Bt=i.get(z),xt=T.length>1;if(xt)for(let Nt=0;Nt<T.length;Nt++)e.bindFramebuffer(n.FRAMEBUFFER,Bt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Nt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,Bt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Nt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,Bt.__webglMultisampledFramebuffer),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,Bt.__webglFramebuffer);for(let Nt=0;Nt<T.length;Nt++){if(z.resolveDepthBuffer&&(z.depthBuffer&&(ht|=n.DEPTH_BUFFER_BIT),z.stencilBuffer&&z.resolveStencilBuffer&&(ht|=n.STENCIL_BUFFER_BIT)),xt){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Bt.__webglColorRenderbuffer[Nt]);const se=i.get(T[Nt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,se,0)}n.blitFramebuffer(0,0,K,ct,0,0,K,ct,ht,n.NEAREST),l===!0&&(Ne.length=0,Y.length=0,Ne.push(n.COLOR_ATTACHMENT0+Nt),z.depthBuffer&&z.resolveDepthBuffer===!1&&(Ne.push(lt),Y.push(lt),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Y)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Ne))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),xt)for(let Nt=0;Nt<T.length;Nt++){e.bindFramebuffer(n.FRAMEBUFFER,Bt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Nt,n.RENDERBUFFER,Bt.__webglColorRenderbuffer[Nt]);const se=i.get(T[Nt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,Bt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Nt,n.TEXTURE_2D,se,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,Bt.__webglMultisampledFramebuffer)}else if(z.depthBuffer&&z.resolveDepthBuffer===!1&&l){const T=z.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[T])}}}function ae(z){return Math.min(s.maxSamples,z.samples)}function le(z){const T=i.get(z);return z.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function qt(z){const T=r.render.frame;u.get(z)!==T&&(u.set(z,T),z.update())}function xe(z,T){const K=z.colorSpace,ct=z.format,ht=z.type;return z.isCompressedTexture===!0||z.isVideoTexture===!0||K!==Hs&&K!==Pi&&(fe.getTransfer(K)===_e?(ct!==Fn||ht!==gi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",K)),T}function Wt(z){return typeof HTMLImageElement<"u"&&z instanceof HTMLImageElement?(c.width=z.naturalWidth||z.width,c.height=z.naturalHeight||z.height):typeof VideoFrame<"u"&&z instanceof VideoFrame?(c.width=z.displayWidth,c.height=z.displayHeight):(c.width=z.width,c.height=z.height),c}this.allocateTextureUnit=k,this.resetTextureUnits=B,this.setTexture2D=rt,this.setTexture2DArray=st,this.setTexture3D=ot,this.setTextureCube=et,this.rebindTextures=Qt,this.setupRenderTarget=Le,this.updateRenderTargetMipmap=re,this.updateMultisampleRenderTarget=ln,this.setupDepthRenderbuffer=$t,this.setupFrameBufferTexture=Ut,this.useMultisampledRTT=le}function Pg(n,t){function e(i,s=Pi){let o;const r=fe.getTransfer(s);if(i===gi)return n.UNSIGNED_BYTE;if(i===wl)return n.UNSIGNED_SHORT_4_4_4_4;if(i===bl)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Pu)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Cu)return n.BYTE;if(i===Ru)return n.SHORT;if(i===Mo)return n.UNSIGNED_SHORT;if(i===Sl)return n.INT;if(i===is)return n.UNSIGNED_INT;if(i===ui)return n.FLOAT;if(i===fi)return n.HALF_FLOAT;if(i===Lu)return n.ALPHA;if(i===Iu)return n.RGB;if(i===Fn)return n.RGBA;if(i===Du)return n.LUMINANCE;if(i===Uu)return n.LUMINANCE_ALPHA;if(i===Rs)return n.DEPTH_COMPONENT;if(i===Fs)return n.DEPTH_STENCIL;if(i===Nu)return n.RED;if(i===El)return n.RED_INTEGER;if(i===zu)return n.RG;if(i===Tl)return n.RG_INTEGER;if(i===Al)return n.RGBA_INTEGER;if(i===ur||i===dr||i===hr||i===fr)if(r===_e)if(o=t.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(i===ur)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===dr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===hr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===fr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=t.get("WEBGL_compressed_texture_s3tc"),o!==null){if(i===ur)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===dr)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===hr)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===fr)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Ga||i===Ha||i===Va||i===Wa)if(o=t.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(i===Ga)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Ha)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Va)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Wa)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===qa||i===Xa||i===Ya)if(o=t.get("WEBGL_compressed_texture_etc"),o!==null){if(i===qa||i===Xa)return r===_e?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(i===Ya)return r===_e?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===$a||i===Za||i===Ka||i===ja||i===Ja||i===Qa||i===tl||i===el||i===nl||i===il||i===sl||i===ol||i===rl||i===al)if(o=t.get("WEBGL_compressed_texture_astc"),o!==null){if(i===$a)return r===_e?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Za)return r===_e?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Ka)return r===_e?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===ja)return r===_e?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Ja)return r===_e?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Qa)return r===_e?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===tl)return r===_e?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===el)return r===_e?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===nl)return r===_e?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===il)return r===_e?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===sl)return r===_e?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===ol)return r===_e?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===rl)return r===_e?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===al)return r===_e?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===pr||i===ll||i===cl)if(o=t.get("EXT_texture_compression_bptc"),o!==null){if(i===pr)return r===_e?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===ll)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===cl)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Fu||i===ul||i===dl||i===hl)if(o=t.get("EXT_texture_compression_rgtc"),o!==null){if(i===pr)return o.COMPRESSED_RED_RGTC1_EXT;if(i===ul)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===dl)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===hl)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===zs?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}class Lg extends Ie{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Tt extends We{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Ig={type:"move"};class ca{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Tt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Tt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new b,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new b),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Tt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new b,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new b),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,o=null,r=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){r=!0;for(const v of t.hand.values()){const g=e.getJointPose(v,i),p=this._getHandJoint(c,v);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],h=u.position.distanceTo(d.position),f=.02,m=.005;c.inputState.pinching&&h>f+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&h<=f-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(o=e.getPose(t.gripSpace,i),o!==null&&(l.matrix.fromArray(o.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,o.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(o.linearVelocity)):l.hasLinearVelocity=!1,o.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(o.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&o!==null&&(s=o),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Ig)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=o!==null),c!==null&&(c.visible=r!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new Tt;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}const Dg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Ug=`
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

}`;class Ng{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){const s=new mn,o=t.properties.get(s);o.__webglTexture=e.texture,(e.depthNear!=i.depthNear||e.depthFar!=i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new on({vertexShader:Dg,fragmentShader:Ug,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new R(new Jt(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class zg extends Vs{constructor(t,e){super();const i=this;let s=null,o=1,r=null,a="local-floor",l=1,c=null,u=null,d=null,h=null,f=null,m=null;const v=new Ng,g=e.getContextAttributes();let p=null,S=null;const w=[],M=[],E=new Et;let P=null;const I=new Ie;I.viewport=new be;const N=new Ie;N.viewport=new be;const y=[I,N],x=new Lg;let L=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let pt=w[q];return pt===void 0&&(pt=new ca,w[q]=pt),pt.getTargetRaySpace()},this.getControllerGrip=function(q){let pt=w[q];return pt===void 0&&(pt=new ca,w[q]=pt),pt.getGripSpace()},this.getHand=function(q){let pt=w[q];return pt===void 0&&(pt=new ca,w[q]=pt),pt.getHandSpace()};function k(q){const pt=M.indexOf(q.inputSource);if(pt===-1)return;const Ut=w[pt];Ut!==void 0&&(Ut.update(q.inputSource,q.frame,c||r),Ut.dispatchEvent({type:q.type,data:q.inputSource}))}function nt(){s.removeEventListener("select",k),s.removeEventListener("selectstart",k),s.removeEventListener("selectend",k),s.removeEventListener("squeeze",k),s.removeEventListener("squeezestart",k),s.removeEventListener("squeezeend",k),s.removeEventListener("end",nt),s.removeEventListener("inputsourceschange",rt);for(let q=0;q<w.length;q++){const pt=M[q];pt!==null&&(M[q]=null,w[q].disconnect(pt))}L=null,B=null,v.reset(),t.setRenderTarget(p),f=null,h=null,d=null,s=null,S=null,at.stop(),i.isPresenting=!1,t.setPixelRatio(P),t.setSize(E.width,E.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){o=q,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){a=q,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||r},this.setReferenceSpace=function(q){c=q},this.getBaseLayer=function(){return h!==null?h:f},this.getBinding=function(){return d},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(q){if(s=q,s!==null){if(p=t.getRenderTarget(),s.addEventListener("select",k),s.addEventListener("selectstart",k),s.addEventListener("selectend",k),s.addEventListener("squeeze",k),s.addEventListener("squeezestart",k),s.addEventListener("squeezeend",k),s.addEventListener("end",nt),s.addEventListener("inputsourceschange",rt),g.xrCompatible!==!0&&await e.makeXRCompatible(),P=t.getPixelRatio(),t.getSize(E),s.renderState.layers===void 0){const pt={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:o};f=new XRWebGLLayer(s,e,pt),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),S=new kn(f.framebufferWidth,f.framebufferHeight,{format:Fn,type:gi,colorSpace:t.outputColorSpace,stencilBuffer:g.stencil})}else{let pt=null,Ut=null,Mt=null;g.depth&&(Mt=g.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,pt=g.stencil?Fs:Rs,Ut=g.stencil?zs:is);const Vt={colorFormat:e.RGBA8,depthFormat:Mt,scaleFactor:o};d=new XRWebGLBinding(s,e),h=d.createProjectionLayer(Vt),s.updateRenderState({layers:[h]}),t.setPixelRatio(1),t.setSize(h.textureWidth,h.textureHeight,!1),S=new kn(h.textureWidth,h.textureHeight,{format:Fn,type:gi,depthTexture:new Zu(h.textureWidth,h.textureHeight,Ut,void 0,void 0,void 0,void 0,void 0,void 0,pt),stencilBuffer:g.stencil,colorSpace:t.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,r=await s.requestReferenceSpace(a),at.setContext(s),at.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function rt(q){for(let pt=0;pt<q.removed.length;pt++){const Ut=q.removed[pt],Mt=M.indexOf(Ut);Mt>=0&&(M[Mt]=null,w[Mt].disconnect(Ut))}for(let pt=0;pt<q.added.length;pt++){const Ut=q.added[pt];let Mt=M.indexOf(Ut);if(Mt===-1){for(let $t=0;$t<w.length;$t++)if($t>=M.length){M.push(Ut),Mt=$t;break}else if(M[$t]===null){M[$t]=Ut,Mt=$t;break}if(Mt===-1)break}const Vt=w[Mt];Vt&&Vt.connect(Ut)}}const st=new b,ot=new b;function et(q,pt,Ut){st.setFromMatrixPosition(pt.matrixWorld),ot.setFromMatrixPosition(Ut.matrixWorld);const Mt=st.distanceTo(ot),Vt=pt.projectionMatrix.elements,$t=Ut.projectionMatrix.elements,Qt=Vt[14]/(Vt[10]-1),Le=Vt[14]/(Vt[10]+1),re=(Vt[9]+1)/Vt[5],Ne=(Vt[9]-1)/Vt[5],Y=(Vt[8]-1)/Vt[0],ln=($t[8]+1)/$t[0],ae=Qt*Y,le=Qt*ln,qt=Mt/(-Y+ln),xe=qt*-Y;if(pt.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(xe),q.translateZ(qt),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),Vt[10]===-1)q.projectionMatrix.copy(pt.projectionMatrix),q.projectionMatrixInverse.copy(pt.projectionMatrixInverse);else{const Wt=Qt+qt,z=Le+qt,T=ae-xe,K=le+(Mt-xe),ct=re*Le/z*Wt,ht=Ne*Le/z*Wt;q.projectionMatrix.makePerspective(T,K,ct,ht,Wt,z),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function dt(q,pt){pt===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(pt.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(s===null)return;let pt=q.near,Ut=q.far;v.texture!==null&&(v.depthNear>0&&(pt=v.depthNear),v.depthFar>0&&(Ut=v.depthFar)),x.near=N.near=I.near=pt,x.far=N.far=I.far=Ut,(L!==x.near||B!==x.far)&&(s.updateRenderState({depthNear:x.near,depthFar:x.far}),L=x.near,B=x.far),I.layers.mask=q.layers.mask|2,N.layers.mask=q.layers.mask|4,x.layers.mask=I.layers.mask|N.layers.mask;const Mt=q.parent,Vt=x.cameras;dt(x,Mt);for(let $t=0;$t<Vt.length;$t++)dt(Vt[$t],Mt);Vt.length===2?et(x,I,N):x.projectionMatrix.copy(I.projectionMatrix),G(q,x,Mt)};function G(q,pt,Ut){Ut===null?q.matrix.copy(pt.matrixWorld):(q.matrix.copy(Ut.matrixWorld),q.matrix.invert(),q.matrix.multiply(pt.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(pt.projectionMatrix),q.projectionMatrixInverse.copy(pt.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=yo*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(h===null&&f===null))return l},this.setFoveation=function(q){l=q,h!==null&&(h.fixedFoveation=q),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=q)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(x)};let U=null;function tt(q,pt){if(u=pt.getViewerPose(c||r),m=pt,u!==null){const Ut=u.views;f!==null&&(t.setRenderTargetFramebuffer(S,f.framebuffer),t.setRenderTarget(S));let Mt=!1;Ut.length!==x.cameras.length&&(x.cameras.length=0,Mt=!0);for(let $t=0;$t<Ut.length;$t++){const Qt=Ut[$t];let Le=null;if(f!==null)Le=f.getViewport(Qt);else{const Ne=d.getViewSubImage(h,Qt);Le=Ne.viewport,$t===0&&(t.setRenderTargetTextures(S,Ne.colorTexture,h.ignoreDepthValues?void 0:Ne.depthStencilTexture),t.setRenderTarget(S))}let re=y[$t];re===void 0&&(re=new Ie,re.layers.enable($t),re.viewport=new be,y[$t]=re),re.matrix.fromArray(Qt.transform.matrix),re.matrix.decompose(re.position,re.quaternion,re.scale),re.projectionMatrix.fromArray(Qt.projectionMatrix),re.projectionMatrixInverse.copy(re.projectionMatrix).invert(),re.viewport.set(Le.x,Le.y,Le.width,Le.height),$t===0&&(x.matrix.copy(re.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),Mt===!0&&x.cameras.push(re)}const Vt=s.enabledFeatures;if(Vt&&Vt.includes("depth-sensing")){const $t=d.getDepthInformation(Ut[0]);$t&&$t.isValid&&$t.texture&&v.init(t,$t,s.renderState)}}for(let Ut=0;Ut<w.length;Ut++){const Mt=M[Ut],Vt=w[Ut];Mt!==null&&Vt!==void 0&&Vt.update(Mt,pt,c||r)}U&&U(q,pt),pt.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:pt}),m=null}const at=new $u;at.setAnimationLoop(tt),this.setAnimationLoop=function(q){U=q},this.dispose=function(){}}}const Wi=new Gn,Fg=new Ee;function Og(n,t){function e(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function i(g,p){p.color.getRGB(g.fogColor.value,qu(n)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function s(g,p,S,w,M){p.isMeshBasicMaterial||p.isMeshLambertMaterial?o(g,p):p.isMeshToonMaterial?(o(g,p),d(g,p)):p.isMeshPhongMaterial?(o(g,p),u(g,p)):p.isMeshStandardMaterial?(o(g,p),h(g,p),p.isMeshPhysicalMaterial&&f(g,p,M)):p.isMeshMatcapMaterial?(o(g,p),m(g,p)):p.isMeshDepthMaterial?o(g,p):p.isMeshDistanceMaterial?(o(g,p),v(g,p)):p.isMeshNormalMaterial?o(g,p):p.isLineBasicMaterial?(r(g,p),p.isLineDashedMaterial&&a(g,p)):p.isPointsMaterial?l(g,p,S,w):p.isSpriteMaterial?c(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function o(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,e(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===rn&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,e(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===rn&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,e(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,e(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);const S=t.get(p),w=S.envMap,M=S.envMapRotation;w&&(g.envMap.value=w,Wi.copy(M),Wi.x*=-1,Wi.y*=-1,Wi.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(Wi.y*=-1,Wi.z*=-1),g.envMapRotation.value.setFromMatrix4(Fg.makeRotationFromEuler(Wi)),g.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,g.aoMapTransform))}function r(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform))}function a(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function l(g,p,S,w){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*S,g.scale.value=w*.5,p.map&&(g.map.value=p.map,e(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function c(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function u(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function d(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function h(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function f(g,p,S){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===rn&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=S.texture,g.transmissionSamplerSize.value.set(S.width,S.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function v(g,p){const S=t.get(p).light;g.referencePosition.value.setFromMatrixPosition(S.matrixWorld),g.nearDistance.value=S.shadow.camera.near,g.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function Bg(n,t,e,i){let s={},o={},r=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,w){const M=w.program;i.uniformBlockBinding(S,M)}function c(S,w){let M=s[S.id];M===void 0&&(m(S),M=u(S),s[S.id]=M,S.addEventListener("dispose",g));const E=w.program;i.updateUBOMapping(S,E);const P=t.render.frame;o[S.id]!==P&&(h(S),o[S.id]=P)}function u(S){const w=d();S.__bindingPointIndex=w;const M=n.createBuffer(),E=S.__size,P=S.usage;return n.bindBuffer(n.UNIFORM_BUFFER,M),n.bufferData(n.UNIFORM_BUFFER,E,P),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,w,M),M}function d(){for(let S=0;S<a;S++)if(r.indexOf(S)===-1)return r.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(S){const w=s[S.id],M=S.uniforms,E=S.__cache;n.bindBuffer(n.UNIFORM_BUFFER,w);for(let P=0,I=M.length;P<I;P++){const N=Array.isArray(M[P])?M[P]:[M[P]];for(let y=0,x=N.length;y<x;y++){const L=N[y];if(f(L,P,y,E)===!0){const B=L.__offset,k=Array.isArray(L.value)?L.value:[L.value];let nt=0;for(let rt=0;rt<k.length;rt++){const st=k[rt],ot=v(st);typeof st=="number"||typeof st=="boolean"?(L.__data[0]=st,n.bufferSubData(n.UNIFORM_BUFFER,B+nt,L.__data)):st.isMatrix3?(L.__data[0]=st.elements[0],L.__data[1]=st.elements[1],L.__data[2]=st.elements[2],L.__data[3]=0,L.__data[4]=st.elements[3],L.__data[5]=st.elements[4],L.__data[6]=st.elements[5],L.__data[7]=0,L.__data[8]=st.elements[6],L.__data[9]=st.elements[7],L.__data[10]=st.elements[8],L.__data[11]=0):(st.toArray(L.__data,nt),nt+=ot.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,B,L.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(S,w,M,E){const P=S.value,I=w+"_"+M;if(E[I]===void 0)return typeof P=="number"||typeof P=="boolean"?E[I]=P:E[I]=P.clone(),!0;{const N=E[I];if(typeof P=="number"||typeof P=="boolean"){if(N!==P)return E[I]=P,!0}else if(N.equals(P)===!1)return N.copy(P),!0}return!1}function m(S){const w=S.uniforms;let M=0;const E=16;for(let I=0,N=w.length;I<N;I++){const y=Array.isArray(w[I])?w[I]:[w[I]];for(let x=0,L=y.length;x<L;x++){const B=y[x],k=Array.isArray(B.value)?B.value:[B.value];for(let nt=0,rt=k.length;nt<rt;nt++){const st=k[nt],ot=v(st),et=M%E,dt=et%ot.boundary,G=et+dt;M+=dt,G!==0&&E-G<ot.storage&&(M+=E-G),B.__data=new Float32Array(ot.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=M,M+=ot.storage}}}const P=M%E;return P>0&&(M+=E-P),S.__size=M,S.__cache={},this}function v(S){const w={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(w.boundary=4,w.storage=4):S.isVector2?(w.boundary=8,w.storage=8):S.isVector3||S.isColor?(w.boundary=16,w.storage=12):S.isVector4?(w.boundary=16,w.storage=16):S.isMatrix3?(w.boundary=48,w.storage=48):S.isMatrix4?(w.boundary=64,w.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),w}function g(S){const w=S.target;w.removeEventListener("dispose",g);const M=r.indexOf(w.__bindingPointIndex);r.splice(M,1),n.deleteBuffer(s[w.id]),delete s[w.id],delete o[w.id]}function p(){for(const S in s)n.deleteBuffer(s[S]);r=[],s={},o={}}return{bind:l,update:c,dispose:p}}class Ul{constructor(t={}){const{canvas:e=Ch(),context:i=null,depth:s=!0,stencil:o=!1,alpha:r=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:h=!1}=t;this.isWebGLRenderer=!0;let f;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=i.getContextAttributes().alpha}else f=r;const m=new Uint32Array(4),v=new Int32Array(4);let g=null,p=null;const S=[],w=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ye,this.toneMapping=Di,this.toneMappingExposure=1;const M=this;let E=!1,P=0,I=0,N=null,y=-1,x=null;const L=new be,B=new be;let k=null;const nt=new _t(0);let rt=0,st=e.width,ot=e.height,et=1,dt=null,G=null;const U=new be(0,0,st,ot),tt=new be(0,0,st,ot);let at=!1;const q=new Ll;let pt=!1,Ut=!1;const Mt=new Ee,Vt=new Ee,$t=new b,Qt=new be,Le={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let re=!1;function Ne(){return N===null?et:1}let Y=i;function ln(A,V){return e.getContext(A,V)}try{const A={alpha:!0,depth:s,stencil:o,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${_l}`),e.addEventListener("webglcontextlost",ut,!1),e.addEventListener("webglcontextrestored",Pt,!1),e.addEventListener("webglcontextcreationerror",Lt,!1),Y===null){const V="webgl2";if(Y=ln(V,A),Y===null)throw ln(V)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let ae,le,qt,xe,Wt,z,T,K,ct,ht,lt,Bt,xt,Nt,se,mt,It,Yt,Zt,zt,he,Kt,Ae,H;function At(){ae=new q0(Y),ae.init(),Kt=new Pg(Y,ae),le=new B0(Y,ae,t,Kt),qt=new Ag(Y,ae),le.reverseDepthBuffer&&h&&qt.buffers.depth.setReversed(!0),xe=new $0(Y),Wt=new hg,z=new Rg(Y,ae,qt,Wt,le,Kt,xe),T=new G0(M),K=new W0(M),ct=new tf(Y),Ae=new F0(Y,ct),ht=new X0(Y,ct,xe,Ae),lt=new K0(Y,ht,ct,xe),Zt=new Z0(Y,le,z),mt=new k0(Wt),Bt=new dg(M,T,K,ae,le,Ae,mt),xt=new Og(M,Wt),Nt=new pg,se=new yg(ae),Yt=new z0(M,T,K,qt,lt,f,l),It=new Eg(M,lt,le),H=new Bg(Y,xe,le,qt),zt=new O0(Y,ae,xe),he=new Y0(Y,ae,xe),xe.programs=Bt.programs,M.capabilities=le,M.extensions=ae,M.properties=Wt,M.renderLists=Nt,M.shadowMap=It,M.state=qt,M.info=xe}At();const Q=new zg(M,Y);this.xr=Q,this.getContext=function(){return Y},this.getContextAttributes=function(){return Y.getContextAttributes()},this.forceContextLoss=function(){const A=ae.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=ae.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return et},this.setPixelRatio=function(A){A!==void 0&&(et=A,this.setSize(st,ot,!1))},this.getSize=function(A){return A.set(st,ot)},this.setSize=function(A,V,j=!0){if(Q.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}st=A,ot=V,e.width=Math.floor(A*et),e.height=Math.floor(V*et),j===!0&&(e.style.width=A+"px",e.style.height=V+"px"),this.setViewport(0,0,A,V)},this.getDrawingBufferSize=function(A){return A.set(st*et,ot*et).floor()},this.setDrawingBufferSize=function(A,V,j){st=A,ot=V,et=j,e.width=Math.floor(A*j),e.height=Math.floor(V*j),this.setViewport(0,0,A,V)},this.getCurrentViewport=function(A){return A.copy(L)},this.getViewport=function(A){return A.copy(U)},this.setViewport=function(A,V,j,J){A.isVector4?U.set(A.x,A.y,A.z,A.w):U.set(A,V,j,J),qt.viewport(L.copy(U).multiplyScalar(et).round())},this.getScissor=function(A){return A.copy(tt)},this.setScissor=function(A,V,j,J){A.isVector4?tt.set(A.x,A.y,A.z,A.w):tt.set(A,V,j,J),qt.scissor(B.copy(tt).multiplyScalar(et).round())},this.getScissorTest=function(){return at},this.setScissorTest=function(A){qt.setScissorTest(at=A)},this.setOpaqueSort=function(A){dt=A},this.setTransparentSort=function(A){G=A},this.getClearColor=function(A){return A.copy(Yt.getClearColor())},this.setClearColor=function(){Yt.setClearColor.apply(Yt,arguments)},this.getClearAlpha=function(){return Yt.getClearAlpha()},this.setClearAlpha=function(){Yt.setClearAlpha.apply(Yt,arguments)},this.clear=function(A=!0,V=!0,j=!0){let J=0;if(A){let X=!1;if(N!==null){const vt=N.texture.format;X=vt===Al||vt===Tl||vt===El}if(X){const vt=N.texture.type,St=vt===gi||vt===is||vt===Mo||vt===zs||vt===wl||vt===bl,Ft=Yt.getClearColor(),yt=Yt.getClearAlpha(),Ht=Ft.r,jt=Ft.g,Ot=Ft.b;St?(m[0]=Ht,m[1]=jt,m[2]=Ot,m[3]=yt,Y.clearBufferuiv(Y.COLOR,0,m)):(v[0]=Ht,v[1]=jt,v[2]=Ot,v[3]=yt,Y.clearBufferiv(Y.COLOR,0,v))}else J|=Y.COLOR_BUFFER_BIT}V&&(J|=Y.DEPTH_BUFFER_BIT),j&&(J|=Y.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),Y.clear(J)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",ut,!1),e.removeEventListener("webglcontextrestored",Pt,!1),e.removeEventListener("webglcontextcreationerror",Lt,!1),Nt.dispose(),se.dispose(),Wt.dispose(),T.dispose(),K.dispose(),lt.dispose(),Ae.dispose(),H.dispose(),Bt.dispose(),Q.dispose(),Q.removeEventListener("sessionstart",Xs),Q.removeEventListener("sessionend",Ys),Mi.stop()};function ut(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),E=!0}function Pt(){console.log("THREE.WebGLRenderer: Context Restored."),E=!1;const A=xe.autoReset,V=It.enabled,j=It.autoUpdate,J=It.needsUpdate,X=It.type;At(),xe.autoReset=A,It.enabled=V,It.autoUpdate=j,It.needsUpdate=J,It.type=X}function Lt(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function te(A){const V=A.target;V.removeEventListener("dispose",te),ze(V)}function ze(A){je(A),Wt.remove(A)}function je(A){const V=Wt.get(A).programs;V!==void 0&&(V.forEach(function(j){Bt.releaseProgram(j)}),A.isShaderMaterial&&Bt.releaseShaderCache(A))}this.renderBufferDirect=function(A,V,j,J,X,vt){V===null&&(V=Le);const St=X.isMesh&&X.matrixWorld.determinant()<0,Ft=Ro(A,V,j,J,X);qt.setMaterial(J,St);let yt=j.index,Ht=1;if(J.wireframe===!0){if(yt=ht.getWireframeAttribute(j),yt===void 0)return;Ht=2}const jt=j.drawRange,Ot=j.attributes.position;let de=jt.start*Ht,Se=(jt.start+jt.count)*Ht;vt!==null&&(de=Math.max(de,vt.start*Ht),Se=Math.min(Se,(vt.start+vt.count)*Ht)),yt!==null?(de=Math.max(de,0),Se=Math.min(Se,yt.count)):Ot!=null&&(de=Math.max(de,0),Se=Math.min(Se,Ot.count));const Ce=Se-de;if(Ce<0||Ce===1/0)return;Ae.setup(X,J,Ft,j,yt);let en,pe=zt;if(yt!==null&&(en=ct.get(yt),pe=he,pe.setIndex(en)),X.isMesh)J.wireframe===!0?(qt.setLineWidth(J.wireframeLinewidth*Ne()),pe.setMode(Y.LINES)):pe.setMode(Y.TRIANGLES);else if(X.isLine){let Gt=J.linewidth;Gt===void 0&&(Gt=1),qt.setLineWidth(Gt*Ne()),X.isLineSegments?pe.setMode(Y.LINES):X.isLineLoop?pe.setMode(Y.LINE_LOOP):pe.setMode(Y.LINE_STRIP)}else X.isPoints?pe.setMode(Y.POINTS):X.isSprite&&pe.setMode(Y.TRIANGLES);if(X.isBatchedMesh)if(X._multiDrawInstances!==null)pe.renderMultiDrawInstances(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount,X._multiDrawInstances);else if(ae.get("WEBGL_multi_draw"))pe.renderMultiDraw(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount);else{const Gt=X._multiDrawStarts,Pn=X._multiDrawCounts,ge=X._multiDrawCount,vn=yt?ct.get(yt).bytesPerElement:1,yi=Wt.get(J).currentProgram.getUniforms();for(let cn=0;cn<ge;cn++)yi.setValue(Y,"_gl_DrawID",cn),pe.render(Gt[cn]/vn,Pn[cn])}else if(X.isInstancedMesh)pe.renderInstances(de,Ce,X.count);else if(j.isInstancedBufferGeometry){const Gt=j._maxInstanceCount!==void 0?j._maxInstanceCount:1/0,Pn=Math.min(j.instanceCount,Gt);pe.renderInstances(de,Ce,Pn)}else pe.render(de,Ce)};function me(A,V,j){A.transparent===!0&&A.side===Oe&&A.forceSinglePass===!1?(A.side=rn,A.needsUpdate=!0,zi(A,V,j),A.side=Ui,A.needsUpdate=!0,zi(A,V,j),A.side=Oe):zi(A,V,j)}this.compile=function(A,V,j=null){j===null&&(j=A),p=se.get(j),p.init(V),w.push(p),j.traverseVisible(function(X){X.isLight&&X.layers.test(V.layers)&&(p.pushLight(X),X.castShadow&&p.pushShadow(X))}),A!==j&&A.traverseVisible(function(X){X.isLight&&X.layers.test(V.layers)&&(p.pushLight(X),X.castShadow&&p.pushShadow(X))}),p.setupLights();const J=new Set;return A.traverse(function(X){if(!(X.isMesh||X.isPoints||X.isLine||X.isSprite))return;const vt=X.material;if(vt)if(Array.isArray(vt))for(let St=0;St<vt.length;St++){const Ft=vt[St];me(Ft,j,X),J.add(Ft)}else me(vt,j,X),J.add(vt)}),w.pop(),p=null,J},this.compileAsync=function(A,V,j=null){const J=this.compile(A,V,j);return new Promise(X=>{function vt(){if(J.forEach(function(St){Wt.get(St).currentProgram.isReady()&&J.delete(St)}),J.size===0){X(A);return}setTimeout(vt,10)}ae.get("KHR_parallel_shader_compile")!==null?vt():setTimeout(vt,10)})};let gn=null;function Rn(A){gn&&gn(A)}function Xs(){Mi.stop()}function Ys(){Mi.start()}const Mi=new $u;Mi.setAnimationLoop(Rn),typeof self<"u"&&Mi.setContext(self),this.setAnimationLoop=function(A){gn=A,Q.setAnimationLoop(A),A===null?Mi.stop():Mi.start()},Q.addEventListener("sessionstart",Xs),Q.addEventListener("sessionend",Ys),this.render=function(A,V){if(V!==void 0&&V.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),V.parent===null&&V.matrixWorldAutoUpdate===!0&&V.updateMatrixWorld(),Q.enabled===!0&&Q.isPresenting===!0&&(Q.cameraAutoUpdate===!0&&Q.updateCamera(V),V=Q.getCamera()),A.isScene===!0&&A.onBeforeRender(M,A,V,N),p=se.get(A,w.length),p.init(V),w.push(p),Vt.multiplyMatrices(V.projectionMatrix,V.matrixWorldInverse),q.setFromProjectionMatrix(Vt),Ut=this.localClippingEnabled,pt=mt.init(this.clippingPlanes,Ut),g=Nt.get(A,S.length),g.init(),S.push(g),Q.enabled===!0&&Q.isPresenting===!0){const vt=M.xr.getDepthSensingMesh();vt!==null&&Kn(vt,V,-1/0,M.sortObjects)}Kn(A,V,0,M.sortObjects),g.finish(),M.sortObjects===!0&&g.sort(dt,G),re=Q.enabled===!1||Q.isPresenting===!1||Q.hasDepthSensing()===!1,re&&Yt.addToRenderList(g,A),this.info.render.frame++,pt===!0&&mt.beginShadows();const j=p.state.shadowsArray;It.render(j,A,V),pt===!0&&mt.endShadows(),this.info.autoReset===!0&&this.info.reset();const J=g.opaque,X=g.transmissive;if(p.setupLights(),V.isArrayCamera){const vt=V.cameras;if(X.length>0)for(let St=0,Ft=vt.length;St<Ft;St++){const yt=vt[St];$s(J,X,A,yt)}re&&Yt.render(A);for(let St=0,Ft=vt.length;St<Ft;St++){const yt=vt[St];Co(g,A,yt,yt.viewport)}}else X.length>0&&$s(J,X,A,V),re&&Yt.render(A),Co(g,A,V);N!==null&&(z.updateMultisampleRenderTarget(N),z.updateRenderTargetMipmap(N)),A.isScene===!0&&A.onAfterRender(M,A,V),Ae.resetDefaultState(),y=-1,x=null,w.pop(),w.length>0?(p=w[w.length-1],pt===!0&&mt.setGlobalState(M.clippingPlanes,p.state.camera)):p=null,S.pop(),S.length>0?g=S[S.length-1]:g=null};function Kn(A,V,j,J){if(A.visible===!1)return;if(A.layers.test(V.layers)){if(A.isGroup)j=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(V);else if(A.isLight)p.pushLight(A),A.castShadow&&p.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||q.intersectsSprite(A)){J&&Qt.setFromMatrixPosition(A.matrixWorld).applyMatrix4(Vt);const St=lt.update(A),Ft=A.material;Ft.visible&&g.push(A,St,Ft,j,Qt.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||q.intersectsObject(A))){const St=lt.update(A),Ft=A.material;if(J&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),Qt.copy(A.boundingSphere.center)):(St.boundingSphere===null&&St.computeBoundingSphere(),Qt.copy(St.boundingSphere.center)),Qt.applyMatrix4(A.matrixWorld).applyMatrix4(Vt)),Array.isArray(Ft)){const yt=St.groups;for(let Ht=0,jt=yt.length;Ht<jt;Ht++){const Ot=yt[Ht],de=Ft[Ot.materialIndex];de&&de.visible&&g.push(A,St,de,j,Qt.z,Ot)}}else Ft.visible&&g.push(A,St,Ft,j,Qt.z,null)}}const vt=A.children;for(let St=0,Ft=vt.length;St<Ft;St++)Kn(vt[St],V,j,J)}function Co(A,V,j,J){const X=A.opaque,vt=A.transmissive,St=A.transparent;p.setupLightsView(j),pt===!0&&mt.setGlobalState(M.clippingPlanes,j),J&&qt.viewport(L.copy(J)),X.length>0&&jn(X,V,j),vt.length>0&&jn(vt,V,j),St.length>0&&jn(St,V,j),qt.buffers.depth.setTest(!0),qt.buffers.depth.setMask(!0),qt.buffers.color.setMask(!0),qt.setPolygonOffset(!1)}function $s(A,V,j,J){if((j.isScene===!0?j.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[J.id]===void 0&&(p.state.transmissionRenderTarget[J.id]=new kn(1,1,{generateMipmaps:!0,type:ae.has("EXT_color_buffer_half_float")||ae.has("EXT_color_buffer_float")?fi:gi,minFilter:ts,samples:4,stencilBuffer:o,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:fe.workingColorSpace}));const vt=p.state.transmissionRenderTarget[J.id],St=J.viewport||L;vt.setSize(St.z,St.w);const Ft=M.getRenderTarget();M.setRenderTarget(vt),M.getClearColor(nt),rt=M.getClearAlpha(),rt<1&&M.setClearColor(16777215,.5),M.clear(),re&&Yt.render(j);const yt=M.toneMapping;M.toneMapping=Di;const Ht=J.viewport;if(J.viewport!==void 0&&(J.viewport=void 0),p.setupLightsView(J),pt===!0&&mt.setGlobalState(M.clippingPlanes,J),jn(A,j,J),z.updateMultisampleRenderTarget(vt),z.updateRenderTargetMipmap(vt),ae.has("WEBGL_multisampled_render_to_texture")===!1){let jt=!1;for(let Ot=0,de=V.length;Ot<de;Ot++){const Se=V[Ot],Ce=Se.object,en=Se.geometry,pe=Se.material,Gt=Se.group;if(pe.side===Oe&&Ce.layers.test(J.layers)){const Pn=pe.side;pe.side=rn,pe.needsUpdate=!0,Zs(Ce,j,J,en,pe,Gt),pe.side=Pn,pe.needsUpdate=!0,jt=!0}}jt===!0&&(z.updateMultisampleRenderTarget(vt),z.updateRenderTargetMipmap(vt))}M.setRenderTarget(Ft),M.setClearColor(nt,rt),Ht!==void 0&&(J.viewport=Ht),M.toneMapping=yt}function jn(A,V,j){const J=V.isScene===!0?V.overrideMaterial:null;for(let X=0,vt=A.length;X<vt;X++){const St=A[X],Ft=St.object,yt=St.geometry,Ht=J===null?St.material:J,jt=St.group;Ft.layers.test(j.layers)&&Zs(Ft,V,j,yt,Ht,jt)}}function Zs(A,V,j,J,X,vt){A.onBeforeRender(M,V,j,J,X,vt),A.modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),X.onBeforeRender(M,V,j,J,A,vt),X.transparent===!0&&X.side===Oe&&X.forceSinglePass===!1?(X.side=rn,X.needsUpdate=!0,M.renderBufferDirect(j,V,J,X,A,vt),X.side=Ui,X.needsUpdate=!0,M.renderBufferDirect(j,V,J,X,A,vt),X.side=Oe):M.renderBufferDirect(j,V,J,X,A,vt),A.onAfterRender(M,V,j,J,X,vt)}function zi(A,V,j){V.isScene!==!0&&(V=Le);const J=Wt.get(A),X=p.state.lights,vt=p.state.shadowsArray,St=X.state.version,Ft=Bt.getParameters(A,X.state,vt,V,j),yt=Bt.getProgramCacheKey(Ft);let Ht=J.programs;J.environment=A.isMeshStandardMaterial?V.environment:null,J.fog=V.fog,J.envMap=(A.isMeshStandardMaterial?K:T).get(A.envMap||J.environment),J.envMapRotation=J.environment!==null&&A.envMap===null?V.environmentRotation:A.envMapRotation,Ht===void 0&&(A.addEventListener("dispose",te),Ht=new Map,J.programs=Ht);let jt=Ht.get(yt);if(jt!==void 0){if(J.currentProgram===jt&&J.lightsStateVersion===St)return Ks(A,Ft),jt}else Ft.uniforms=Bt.getUniforms(A),A.onBeforeCompile(Ft,M),jt=Bt.acquireProgram(Ft,yt),Ht.set(yt,jt),J.uniforms=Ft.uniforms;const Ot=J.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Ot.clippingPlanes=mt.uniform),Ks(A,Ft),J.needsLights=Lo(A),J.lightsStateVersion=St,J.needsLights&&(Ot.ambientLightColor.value=X.state.ambient,Ot.lightProbe.value=X.state.probe,Ot.directionalLights.value=X.state.directional,Ot.directionalLightShadows.value=X.state.directionalShadow,Ot.spotLights.value=X.state.spot,Ot.spotLightShadows.value=X.state.spotShadow,Ot.rectAreaLights.value=X.state.rectArea,Ot.ltc_1.value=X.state.rectAreaLTC1,Ot.ltc_2.value=X.state.rectAreaLTC2,Ot.pointLights.value=X.state.point,Ot.pointLightShadows.value=X.state.pointShadow,Ot.hemisphereLights.value=X.state.hemi,Ot.directionalShadowMap.value=X.state.directionalShadowMap,Ot.directionalShadowMatrix.value=X.state.directionalShadowMatrix,Ot.spotShadowMap.value=X.state.spotShadowMap,Ot.spotLightMatrix.value=X.state.spotLightMatrix,Ot.spotLightMap.value=X.state.spotLightMap,Ot.pointShadowMap.value=X.state.pointShadowMap,Ot.pointShadowMatrix.value=X.state.pointShadowMatrix),J.currentProgram=jt,J.uniformsList=null,jt}function Fi(A){if(A.uniformsList===null){const V=A.currentProgram.getUniforms();A.uniformsList=mr.seqWithValue(V.seq,A.uniforms)}return A.uniformsList}function Ks(A,V){const j=Wt.get(A);j.outputColorSpace=V.outputColorSpace,j.batching=V.batching,j.batchingColor=V.batchingColor,j.instancing=V.instancing,j.instancingColor=V.instancingColor,j.instancingMorph=V.instancingMorph,j.skinning=V.skinning,j.morphTargets=V.morphTargets,j.morphNormals=V.morphNormals,j.morphColors=V.morphColors,j.morphTargetsCount=V.morphTargetsCount,j.numClippingPlanes=V.numClippingPlanes,j.numIntersection=V.numClipIntersection,j.vertexAlphas=V.vertexAlphas,j.vertexTangents=V.vertexTangents,j.toneMapping=V.toneMapping}function Ro(A,V,j,J,X){V.isScene!==!0&&(V=Le),z.resetTextureUnits();const vt=V.fog,St=J.isMeshStandardMaterial?V.environment:null,Ft=N===null?M.outputColorSpace:N.isXRRenderTarget===!0?N.texture.colorSpace:Hs,yt=(J.isMeshStandardMaterial?K:T).get(J.envMap||St),Ht=J.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,jt=!!j.attributes.tangent&&(!!J.normalMap||J.anisotropy>0),Ot=!!j.morphAttributes.position,de=!!j.morphAttributes.normal,Se=!!j.morphAttributes.color;let Ce=Di;J.toneMapped&&(N===null||N.isXRRenderTarget===!0)&&(Ce=M.toneMapping);const en=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,pe=en!==void 0?en.length:0,Gt=Wt.get(J),Pn=p.state.lights;if(pt===!0&&(Ut===!0||A!==x)){const O=A===x&&J.id===y;mt.setState(J,A,O)}let ge=!1;J.version===Gt.__version?(Gt.needsLights&&Gt.lightsStateVersion!==Pn.state.version||Gt.outputColorSpace!==Ft||X.isBatchedMesh&&Gt.batching===!1||!X.isBatchedMesh&&Gt.batching===!0||X.isBatchedMesh&&Gt.batchingColor===!0&&X.colorTexture===null||X.isBatchedMesh&&Gt.batchingColor===!1&&X.colorTexture!==null||X.isInstancedMesh&&Gt.instancing===!1||!X.isInstancedMesh&&Gt.instancing===!0||X.isSkinnedMesh&&Gt.skinning===!1||!X.isSkinnedMesh&&Gt.skinning===!0||X.isInstancedMesh&&Gt.instancingColor===!0&&X.instanceColor===null||X.isInstancedMesh&&Gt.instancingColor===!1&&X.instanceColor!==null||X.isInstancedMesh&&Gt.instancingMorph===!0&&X.morphTexture===null||X.isInstancedMesh&&Gt.instancingMorph===!1&&X.morphTexture!==null||Gt.envMap!==yt||J.fog===!0&&Gt.fog!==vt||Gt.numClippingPlanes!==void 0&&(Gt.numClippingPlanes!==mt.numPlanes||Gt.numIntersection!==mt.numIntersection)||Gt.vertexAlphas!==Ht||Gt.vertexTangents!==jt||Gt.morphTargets!==Ot||Gt.morphNormals!==de||Gt.morphColors!==Se||Gt.toneMapping!==Ce||Gt.morphTargetsCount!==pe)&&(ge=!0):(ge=!0,Gt.__version=J.version);let vn=Gt.currentProgram;ge===!0&&(vn=zi(J,V,X));let yi=!1,cn=!1,Oi=!1;const C=vn.getUniforms(),F=Gt.uniforms;if(qt.useProgram(vn.program)&&(yi=!0,cn=!0,Oi=!0),J.id!==y&&(y=J.id,cn=!0),yi||x!==A){qt.buffers.depth.getReversed()?(Mt.copy(A.projectionMatrix),Ph(Mt),Lh(Mt),C.setValue(Y,"projectionMatrix",Mt)):C.setValue(Y,"projectionMatrix",A.projectionMatrix),C.setValue(Y,"viewMatrix",A.matrixWorldInverse);const W=C.map.cameraPosition;W!==void 0&&W.setValue(Y,$t.setFromMatrixPosition(A.matrixWorld)),le.logarithmicDepthBuffer&&C.setValue(Y,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(J.isMeshPhongMaterial||J.isMeshToonMaterial||J.isMeshLambertMaterial||J.isMeshBasicMaterial||J.isMeshStandardMaterial||J.isShaderMaterial)&&C.setValue(Y,"isOrthographic",A.isOrthographicCamera===!0),x!==A&&(x=A,cn=!0,Oi=!0)}if(X.isSkinnedMesh){C.setOptional(Y,X,"bindMatrix"),C.setOptional(Y,X,"bindMatrixInverse");const O=X.skeleton;O&&(O.boneTexture===null&&O.computeBoneTexture(),C.setValue(Y,"boneTexture",O.boneTexture,z))}X.isBatchedMesh&&(C.setOptional(Y,X,"batchingTexture"),C.setValue(Y,"batchingTexture",X._matricesTexture,z),C.setOptional(Y,X,"batchingIdTexture"),C.setValue(Y,"batchingIdTexture",X._indirectTexture,z),C.setOptional(Y,X,"batchingColorTexture"),X._colorsTexture!==null&&C.setValue(Y,"batchingColorTexture",X._colorsTexture,z));const D=j.morphAttributes;if((D.position!==void 0||D.normal!==void 0||D.color!==void 0)&&Zt.update(X,j,vn),(cn||Gt.receiveShadow!==X.receiveShadow)&&(Gt.receiveShadow=X.receiveShadow,C.setValue(Y,"receiveShadow",X.receiveShadow)),J.isMeshGouraudMaterial&&J.envMap!==null&&(F.envMap.value=yt,F.flipEnvMap.value=yt.isCubeTexture&&yt.isRenderTargetTexture===!1?-1:1),J.isMeshStandardMaterial&&J.envMap===null&&V.environment!==null&&(F.envMapIntensity.value=V.environmentIntensity),cn&&(C.setValue(Y,"toneMappingExposure",M.toneMappingExposure),Gt.needsLights&&Po(F,Oi),vt&&J.fog===!0&&xt.refreshFogUniforms(F,vt),xt.refreshMaterialUniforms(F,J,et,ot,p.state.transmissionRenderTarget[A.id]),mr.upload(Y,Fi(Gt),F,z)),J.isShaderMaterial&&J.uniformsNeedUpdate===!0&&(mr.upload(Y,Fi(Gt),F,z),J.uniformsNeedUpdate=!1),J.isSpriteMaterial&&C.setValue(Y,"center",X.center),C.setValue(Y,"modelViewMatrix",X.modelViewMatrix),C.setValue(Y,"normalMatrix",X.normalMatrix),C.setValue(Y,"modelMatrix",X.matrixWorld),J.isShaderMaterial||J.isRawShaderMaterial){const O=J.uniformsGroups;for(let W=0,Z=O.length;W<Z;W++){const it=O[W];H.update(it,vn),H.bind(it,vn)}}return vn}function Po(A,V){A.ambientLightColor.needsUpdate=V,A.lightProbe.needsUpdate=V,A.directionalLights.needsUpdate=V,A.directionalLightShadows.needsUpdate=V,A.pointLights.needsUpdate=V,A.pointLightShadows.needsUpdate=V,A.spotLights.needsUpdate=V,A.spotLightShadows.needsUpdate=V,A.rectAreaLights.needsUpdate=V,A.hemisphereLights.needsUpdate=V}function Lo(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return I},this.getRenderTarget=function(){return N},this.setRenderTargetTextures=function(A,V,j){Wt.get(A.texture).__webglTexture=V,Wt.get(A.depthTexture).__webglTexture=j;const J=Wt.get(A);J.__hasExternalTextures=!0,J.__autoAllocateDepthBuffer=j===void 0,J.__autoAllocateDepthBuffer||ae.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),J.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(A,V){const j=Wt.get(A);j.__webglFramebuffer=V,j.__useDefaultFramebuffer=V===void 0},this.setRenderTarget=function(A,V=0,j=0){N=A,P=V,I=j;let J=!0,X=null,vt=!1,St=!1;if(A){const yt=Wt.get(A);if(yt.__useDefaultFramebuffer!==void 0)qt.bindFramebuffer(Y.FRAMEBUFFER,null),J=!1;else if(yt.__webglFramebuffer===void 0)z.setupRenderTarget(A);else if(yt.__hasExternalTextures)z.rebindTextures(A,Wt.get(A.texture).__webglTexture,Wt.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const Ot=A.depthTexture;if(yt.__boundDepthTexture!==Ot){if(Ot!==null&&Wt.has(Ot)&&(A.width!==Ot.image.width||A.height!==Ot.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");z.setupDepthRenderbuffer(A)}}const Ht=A.texture;(Ht.isData3DTexture||Ht.isDataArrayTexture||Ht.isCompressedArrayTexture)&&(St=!0);const jt=Wt.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(jt[V])?X=jt[V][j]:X=jt[V],vt=!0):A.samples>0&&z.useMultisampledRTT(A)===!1?X=Wt.get(A).__webglMultisampledFramebuffer:Array.isArray(jt)?X=jt[j]:X=jt,L.copy(A.viewport),B.copy(A.scissor),k=A.scissorTest}else L.copy(U).multiplyScalar(et).floor(),B.copy(tt).multiplyScalar(et).floor(),k=at;if(qt.bindFramebuffer(Y.FRAMEBUFFER,X)&&J&&qt.drawBuffers(A,X),qt.viewport(L),qt.scissor(B),qt.setScissorTest(k),vt){const yt=Wt.get(A.texture);Y.framebufferTexture2D(Y.FRAMEBUFFER,Y.COLOR_ATTACHMENT0,Y.TEXTURE_CUBE_MAP_POSITIVE_X+V,yt.__webglTexture,j)}else if(St){const yt=Wt.get(A.texture),Ht=V||0;Y.framebufferTextureLayer(Y.FRAMEBUFFER,Y.COLOR_ATTACHMENT0,yt.__webglTexture,j||0,Ht)}y=-1},this.readRenderTargetPixels=function(A,V,j,J,X,vt,St){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ft=Wt.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&St!==void 0&&(Ft=Ft[St]),Ft){qt.bindFramebuffer(Y.FRAMEBUFFER,Ft);try{const yt=A.texture,Ht=yt.format,jt=yt.type;if(!le.textureFormatReadable(Ht)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!le.textureTypeReadable(jt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}V>=0&&V<=A.width-J&&j>=0&&j<=A.height-X&&Y.readPixels(V,j,J,X,Kt.convert(Ht),Kt.convert(jt),vt)}finally{const yt=N!==null?Wt.get(N).__webglFramebuffer:null;qt.bindFramebuffer(Y.FRAMEBUFFER,yt)}}},this.readRenderTargetPixelsAsync=async function(A,V,j,J,X,vt,St){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ft=Wt.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&St!==void 0&&(Ft=Ft[St]),Ft){const yt=A.texture,Ht=yt.format,jt=yt.type;if(!le.textureFormatReadable(Ht))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!le.textureTypeReadable(jt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(V>=0&&V<=A.width-J&&j>=0&&j<=A.height-X){qt.bindFramebuffer(Y.FRAMEBUFFER,Ft);const Ot=Y.createBuffer();Y.bindBuffer(Y.PIXEL_PACK_BUFFER,Ot),Y.bufferData(Y.PIXEL_PACK_BUFFER,vt.byteLength,Y.STREAM_READ),Y.readPixels(V,j,J,X,Kt.convert(Ht),Kt.convert(jt),0);const de=N!==null?Wt.get(N).__webglFramebuffer:null;qt.bindFramebuffer(Y.FRAMEBUFFER,de);const Se=Y.fenceSync(Y.SYNC_GPU_COMMANDS_COMPLETE,0);return Y.flush(),await Rh(Y,Se,4),Y.bindBuffer(Y.PIXEL_PACK_BUFFER,Ot),Y.getBufferSubData(Y.PIXEL_PACK_BUFFER,0,vt),Y.deleteBuffer(Ot),Y.deleteSync(Se),vt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(A,V=null,j=0){A.isTexture!==!0&&(lo("WebGLRenderer: copyFramebufferToTexture function signature has changed."),V=arguments[0]||null,A=arguments[1]);const J=Math.pow(2,-j),X=Math.floor(A.image.width*J),vt=Math.floor(A.image.height*J),St=V!==null?V.x:0,Ft=V!==null?V.y:0;z.setTexture2D(A,0),Y.copyTexSubImage2D(Y.TEXTURE_2D,j,0,0,St,Ft,X,vt),qt.unbindTexture()},this.copyTextureToTexture=function(A,V,j=null,J=null,X=0){A.isTexture!==!0&&(lo("WebGLRenderer: copyTextureToTexture function signature has changed."),J=arguments[0]||null,A=arguments[1],V=arguments[2],X=arguments[3]||0,j=null);let vt,St,Ft,yt,Ht,jt,Ot,de,Se;const Ce=A.isCompressedTexture?A.mipmaps[X]:A.image;j!==null?(vt=j.max.x-j.min.x,St=j.max.y-j.min.y,Ft=j.isBox3?j.max.z-j.min.z:1,yt=j.min.x,Ht=j.min.y,jt=j.isBox3?j.min.z:0):(vt=Ce.width,St=Ce.height,Ft=Ce.depth||1,yt=0,Ht=0,jt=0),J!==null?(Ot=J.x,de=J.y,Se=J.z):(Ot=0,de=0,Se=0);const en=Kt.convert(V.format),pe=Kt.convert(V.type);let Gt;V.isData3DTexture?(z.setTexture3D(V,0),Gt=Y.TEXTURE_3D):V.isDataArrayTexture||V.isCompressedArrayTexture?(z.setTexture2DArray(V,0),Gt=Y.TEXTURE_2D_ARRAY):(z.setTexture2D(V,0),Gt=Y.TEXTURE_2D),Y.pixelStorei(Y.UNPACK_FLIP_Y_WEBGL,V.flipY),Y.pixelStorei(Y.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),Y.pixelStorei(Y.UNPACK_ALIGNMENT,V.unpackAlignment);const Pn=Y.getParameter(Y.UNPACK_ROW_LENGTH),ge=Y.getParameter(Y.UNPACK_IMAGE_HEIGHT),vn=Y.getParameter(Y.UNPACK_SKIP_PIXELS),yi=Y.getParameter(Y.UNPACK_SKIP_ROWS),cn=Y.getParameter(Y.UNPACK_SKIP_IMAGES);Y.pixelStorei(Y.UNPACK_ROW_LENGTH,Ce.width),Y.pixelStorei(Y.UNPACK_IMAGE_HEIGHT,Ce.height),Y.pixelStorei(Y.UNPACK_SKIP_PIXELS,yt),Y.pixelStorei(Y.UNPACK_SKIP_ROWS,Ht),Y.pixelStorei(Y.UNPACK_SKIP_IMAGES,jt);const Oi=A.isDataArrayTexture||A.isData3DTexture,C=V.isDataArrayTexture||V.isData3DTexture;if(A.isRenderTargetTexture||A.isDepthTexture){const F=Wt.get(A),D=Wt.get(V),O=Wt.get(F.__renderTarget),W=Wt.get(D.__renderTarget);qt.bindFramebuffer(Y.READ_FRAMEBUFFER,O.__webglFramebuffer),qt.bindFramebuffer(Y.DRAW_FRAMEBUFFER,W.__webglFramebuffer);for(let Z=0;Z<Ft;Z++)Oi&&Y.framebufferTextureLayer(Y.READ_FRAMEBUFFER,Y.COLOR_ATTACHMENT0,Wt.get(A).__webglTexture,X,jt+Z),A.isDepthTexture?(C&&Y.framebufferTextureLayer(Y.DRAW_FRAMEBUFFER,Y.COLOR_ATTACHMENT0,Wt.get(V).__webglTexture,X,Se+Z),Y.blitFramebuffer(yt,Ht,vt,St,Ot,de,vt,St,Y.DEPTH_BUFFER_BIT,Y.NEAREST)):C?Y.copyTexSubImage3D(Gt,X,Ot,de,Se+Z,yt,Ht,vt,St):Y.copyTexSubImage2D(Gt,X,Ot,de,Se+Z,yt,Ht,vt,St);qt.bindFramebuffer(Y.READ_FRAMEBUFFER,null),qt.bindFramebuffer(Y.DRAW_FRAMEBUFFER,null)}else C?A.isDataTexture||A.isData3DTexture?Y.texSubImage3D(Gt,X,Ot,de,Se,vt,St,Ft,en,pe,Ce.data):V.isCompressedArrayTexture?Y.compressedTexSubImage3D(Gt,X,Ot,de,Se,vt,St,Ft,en,Ce.data):Y.texSubImage3D(Gt,X,Ot,de,Se,vt,St,Ft,en,pe,Ce):A.isDataTexture?Y.texSubImage2D(Y.TEXTURE_2D,X,Ot,de,vt,St,en,pe,Ce.data):A.isCompressedTexture?Y.compressedTexSubImage2D(Y.TEXTURE_2D,X,Ot,de,Ce.width,Ce.height,en,Ce.data):Y.texSubImage2D(Y.TEXTURE_2D,X,Ot,de,vt,St,en,pe,Ce);Y.pixelStorei(Y.UNPACK_ROW_LENGTH,Pn),Y.pixelStorei(Y.UNPACK_IMAGE_HEIGHT,ge),Y.pixelStorei(Y.UNPACK_SKIP_PIXELS,vn),Y.pixelStorei(Y.UNPACK_SKIP_ROWS,yi),Y.pixelStorei(Y.UNPACK_SKIP_IMAGES,cn),X===0&&V.generateMipmaps&&Y.generateMipmap(Gt),qt.unbindTexture()},this.copyTextureToTexture3D=function(A,V,j=null,J=null,X=0){return A.isTexture!==!0&&(lo("WebGLRenderer: copyTextureToTexture3D function signature has changed."),j=arguments[0]||null,J=arguments[1]||null,A=arguments[2],V=arguments[3],X=arguments[4]||0),lo('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(A,V,j,J,X)},this.initRenderTarget=function(A){Wt.get(A).__webglFramebuffer===void 0&&z.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?z.setTextureCube(A,0):A.isData3DTexture?z.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?z.setTexture2DArray(A,0):z.setTexture2D(A,0),qt.unbindTexture()},this.resetState=function(){P=0,I=0,N=null,qt.reset(),Ae.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return di}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=fe._getDrawingBufferColorSpace(t),e.unpackColorSpace=fe._getUnpackColorSpace()}}class Li{constructor(t,e=1,i=1e3){this.isFog=!0,this.name="",this.color=new _t(t),this.near=e,this.far=i}clone(){return new Li(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Nl extends We{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Gn,this.environmentIntensity=1,this.environmentRotation=new Gn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class kg{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=fl,this.updateRanges=[],this.version=0,this.uuid=pi()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,i){t*=this.stride,i*=e.stride;for(let s=0,o=this.stride;s<o;s++)this.array[t+s]=e.array[i+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=pi()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(e,this.stride);return i.setUsage(this.usage),i}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=pi()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const dn=new b;class yr{constructor(t,e,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,i=this.data.count;e<i;e++)dn.fromBufferAttribute(this,e),dn.applyMatrix4(t),this.setXYZ(e,dn.x,dn.y,dn.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)dn.fromBufferAttribute(this,e),dn.applyNormalMatrix(t),this.setXYZ(e,dn.x,dn.y,dn.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)dn.fromBufferAttribute(this,e),dn.transformDirection(t),this.setXYZ(e,dn.x,dn.y,dn.z);return this}getComponent(t,e){let i=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(i=zn(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=Me(i,this.array)),this.data.array[t*this.data.stride+this.offset+e]=i,this}setX(t,e){return this.normalized&&(e=Me(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=Me(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=Me(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=Me(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=zn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=zn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=zn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=zn(e,this.array)),e}setXY(t,e,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=Me(e,this.array),i=Me(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this}setXYZ(t,e,i,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=Me(e,this.array),i=Me(i,this.array),s=Me(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=s,this}setXYZW(t,e,i,s,o){return t=t*this.data.stride+this.offset,this.normalized&&(e=Me(e,this.array),i=Me(i,this.array),s=Me(s,this.array),o=Me(o,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=s,this.data.array[t+3]=o,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let o=0;o<this.itemSize;o++)e.push(this.data.array[s+o])}return new Be(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new yr(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let o=0;o<this.itemSize;o++)e.push(this.data.array[s+o])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class On extends vi{static get type(){return"SpriteMaterial"}constructor(t){super(),this.isSpriteMaterial=!0,this.color=new _t(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let Ss;const no=new b,ws=new b,bs=new b,Es=new Et,io=new Et,td=new Ee,Qo=new b,so=new b,tr=new b,Xc=new Et,ua=new Et,Yc=new Et;class Xn extends We{constructor(t=new On){if(super(),this.isSprite=!0,this.type="Sprite",Ss===void 0){Ss=new Pe;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new kg(e,5);Ss.setIndex([0,1,2,0,2,3]),Ss.setAttribute("position",new yr(i,3,0,!1)),Ss.setAttribute("uv",new yr(i,2,3,!1))}this.geometry=Ss,this.material=t,this.center=new Et(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),ws.setFromMatrixScale(this.matrixWorld),td.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),bs.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&ws.multiplyScalar(-bs.z);const i=this.material.rotation;let s,o;i!==0&&(o=Math.cos(i),s=Math.sin(i));const r=this.center;er(Qo.set(-.5,-.5,0),bs,r,ws,s,o),er(so.set(.5,-.5,0),bs,r,ws,s,o),er(tr.set(.5,.5,0),bs,r,ws,s,o),Xc.set(0,0),ua.set(1,0),Yc.set(1,1);let a=t.ray.intersectTriangle(Qo,so,tr,!1,no);if(a===null&&(er(so.set(-.5,.5,0),bs,r,ws,s,o),ua.set(0,1),a=t.ray.intersectTriangle(Qo,tr,so,!1,no),a===null))return;const l=t.ray.origin.distanceTo(no);l<t.near||l>t.far||e.push({distance:l,point:no.clone(),uv:An.getInterpolation(no,Qo,so,tr,Xc,ua,Yc,new Et),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function er(n,t,e,i,s,o){Es.subVectors(n,e).addScalar(.5).multiply(i),s!==void 0?(io.x=o*Es.x-s*Es.y,io.y=s*Es.x+o*Es.y):io.copy(Es),n.copy(t),n.x+=io.x,n.y+=io.y,n.applyMatrix4(td)}class Ir extends vi{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new _t(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const xr=new b,Sr=new b,$c=new Ee,oo=new Pr,nr=new To,da=new b,Zc=new b;class zl extends We{constructor(t=new Pe,e=new Ir){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[0];for(let s=1,o=e.count;s<o;s++)xr.fromBufferAttribute(e,s-1),Sr.fromBufferAttribute(e,s),i[s]=i[s-1],i[s]+=xr.distanceTo(Sr);t.setAttribute("lineDistance",new Te(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const i=this.geometry,s=this.matrixWorld,o=t.params.Line.threshold,r=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),nr.copy(i.boundingSphere),nr.applyMatrix4(s),nr.radius+=o,t.ray.intersectsSphere(nr)===!1)return;$c.copy(s).invert(),oo.copy(t.ray).applyMatrix4($c);const a=o/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=i.index,h=i.attributes.position;if(u!==null){const f=Math.max(0,r.start),m=Math.min(u.count,r.start+r.count);for(let v=f,g=m-1;v<g;v+=c){const p=u.getX(v),S=u.getX(v+1),w=ir(this,t,oo,l,p,S);w&&e.push(w)}if(this.isLineLoop){const v=u.getX(m-1),g=u.getX(f),p=ir(this,t,oo,l,v,g);p&&e.push(p)}}else{const f=Math.max(0,r.start),m=Math.min(h.count,r.start+r.count);for(let v=f,g=m-1;v<g;v+=c){const p=ir(this,t,oo,l,v,v+1);p&&e.push(p)}if(this.isLineLoop){const v=ir(this,t,oo,l,m-1,f);v&&e.push(v)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,r=s.length;o<r;o++){const a=s[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=o}}}}}function ir(n,t,e,i,s,o){const r=n.geometry.attributes.position;if(xr.fromBufferAttribute(r,s),Sr.fromBufferAttribute(r,o),e.distanceSqToSegment(xr,Sr,da,Zc)>i)return;da.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(da);if(!(l<t.near||l>t.far))return{distance:l,point:Zc.clone().applyMatrix4(n.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:n}}class Bs extends vi{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new _t(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Kc=new Ee,ml=new Pr,sr=new To,or=new b;class So extends We{constructor(t=new Pe,e=new Bs){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const i=this.geometry,s=this.matrixWorld,o=t.params.Points.threshold,r=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),sr.copy(i.boundingSphere),sr.applyMatrix4(s),sr.radius+=o,t.ray.intersectsSphere(sr)===!1)return;Kc.copy(s).invert(),ml.copy(t.ray).applyMatrix4(Kc);const a=o/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=i.index,d=i.attributes.position;if(c!==null){const h=Math.max(0,r.start),f=Math.min(c.count,r.start+r.count);for(let m=h,v=f;m<v;m++){const g=c.getX(m);or.fromBufferAttribute(d,g),jc(or,g,l,s,t,e,this)}}else{const h=Math.max(0,r.start),f=Math.min(d.count,r.start+r.count);for(let m=h,v=f;m<v;m++)or.fromBufferAttribute(d,m),jc(or,m,l,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,r=s.length;o<r;o++){const a=s[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=o}}}}}function jc(n,t,e,i,s,o,r){const a=ml.distanceSqToPoint(n);if(a<e){const l=new b;ml.closestPointToPoint(n,l),l.applyMatrix4(i);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;o.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:r})}}class tn extends mn{constructor(t,e,i,s,o,r,a,l,c){super(t,e,i,s,o,r,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class _i{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let i,s=this.getPoint(0),o=0;e.push(0);for(let r=1;r<=t;r++)i=this.getPoint(r/t),o+=i.distanceTo(s),e.push(o),s=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const i=this.getLengths();let s=0;const o=i.length;let r;e?r=e:r=t*i[o-1];let a=0,l=o-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=i[s]-r,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,i[s]===r)return s/(o-1);const u=i[s],h=i[s+1]-u,f=(r-u)/h;return(s+f)/(o-1)}getTangent(t,e){let s=t-1e-4,o=t+1e-4;s<0&&(s=0),o>1&&(o=1);const r=this.getPoint(s),a=this.getPoint(o),l=e||(r.isVector2?new Et:new b);return l.copy(a).sub(r).normalize(),l}getTangentAt(t,e){const i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e){const i=new b,s=[],o=[],r=[],a=new b,l=new Ee;for(let f=0;f<=t;f++){const m=f/t;s[f]=this.getTangentAt(m,new b)}o[0]=new b,r[0]=new b;let c=Number.MAX_VALUE;const u=Math.abs(s[0].x),d=Math.abs(s[0].y),h=Math.abs(s[0].z);u<=c&&(c=u,i.set(1,0,0)),d<=c&&(c=d,i.set(0,1,0)),h<=c&&i.set(0,0,1),a.crossVectors(s[0],i).normalize(),o[0].crossVectors(s[0],a),r[0].crossVectors(s[0],o[0]);for(let f=1;f<=t;f++){if(o[f]=o[f-1].clone(),r[f]=r[f-1].clone(),a.crossVectors(s[f-1],s[f]),a.length()>Number.EPSILON){a.normalize();const m=Math.acos(Qe(s[f-1].dot(s[f]),-1,1));o[f].applyMatrix4(l.makeRotationAxis(a,m))}r[f].crossVectors(s[f],o[f])}if(e===!0){let f=Math.acos(Qe(o[0].dot(o[t]),-1,1));f/=t,s[0].dot(a.crossVectors(o[0],o[t]))>0&&(f=-f);for(let m=1;m<=t;m++)o[m].applyMatrix4(l.makeRotationAxis(s[m],f*m)),r[m].crossVectors(s[m],o[m])}return{tangents:s,normals:o,binormals:r}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class ed extends _i{constructor(t=0,e=0,i=1,s=1,o=0,r=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=i,this.yRadius=s,this.aStartAngle=o,this.aEndAngle=r,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new Et){const i=e,s=Math.PI*2;let o=this.aEndAngle-this.aStartAngle;const r=Math.abs(o)<Number.EPSILON;for(;o<0;)o+=s;for(;o>s;)o-=s;o<Number.EPSILON&&(r?o=0:o=s),this.aClockwise===!0&&!r&&(o===s?o=-s:o=o-s);const a=this.aStartAngle+t*o;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const u=Math.cos(this.aRotation),d=Math.sin(this.aRotation),h=l-this.aX,f=c-this.aY;l=h*u-f*d+this.aX,c=h*d+f*u+this.aY}return i.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Gg extends ed{constructor(t,e,i,s,o,r){super(t,e,i,i,s,o,r),this.isArcCurve=!0,this.type="ArcCurve"}}function Fl(){let n=0,t=0,e=0,i=0;function s(o,r,a,l){n=o,t=a,e=-3*o+3*r-2*a-l,i=2*o-2*r+a+l}return{initCatmullRom:function(o,r,a,l,c){s(r,a,c*(a-o),c*(l-r))},initNonuniformCatmullRom:function(o,r,a,l,c,u,d){let h=(r-o)/c-(a-o)/(c+u)+(a-r)/u,f=(a-r)/u-(l-r)/(u+d)+(l-a)/d;h*=u,f*=u,s(r,a,h,f)},calc:function(o){const r=o*o,a=r*o;return n+t*o+e*r+i*a}}}const rr=new b,ha=new Fl,fa=new Fl,pa=new Fl;class pn extends _i{constructor(t=[],e=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=s}getPoint(t,e=new b){const i=e,s=this.points,o=s.length,r=(o-(this.closed?0:1))*t;let a=Math.floor(r),l=r-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/o)+1)*o:l===0&&a===o-1&&(a=o-2,l=1);let c,u;this.closed||a>0?c=s[(a-1)%o]:(rr.subVectors(s[0],s[1]).add(s[0]),c=rr);const d=s[a%o],h=s[(a+1)%o];if(this.closed||a+2<o?u=s[(a+2)%o]:(rr.subVectors(s[o-1],s[o-2]).add(s[o-1]),u=rr),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let m=Math.pow(c.distanceToSquared(d),f),v=Math.pow(d.distanceToSquared(h),f),g=Math.pow(h.distanceToSquared(u),f);v<1e-4&&(v=1),m<1e-4&&(m=v),g<1e-4&&(g=v),ha.initNonuniformCatmullRom(c.x,d.x,h.x,u.x,m,v,g),fa.initNonuniformCatmullRom(c.y,d.y,h.y,u.y,m,v,g),pa.initNonuniformCatmullRom(c.z,d.z,h.z,u.z,m,v,g)}else this.curveType==="catmullrom"&&(ha.initCatmullRom(c.x,d.x,h.x,u.x,this.tension),fa.initCatmullRom(c.y,d.y,h.y,u.y,this.tension),pa.initCatmullRom(c.z,d.z,h.z,u.z,this.tension));return i.set(ha.calc(l),fa.calc(l),pa.calc(l)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(new b().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Jc(n,t,e,i,s){const o=(i-t)*.5,r=(s-e)*.5,a=n*n,l=n*a;return(2*e-2*i+o+r)*l+(-3*e+3*i-2*o-r)*a+o*n+e}function Hg(n,t){const e=1-n;return e*e*t}function Vg(n,t){return 2*(1-n)*n*t}function Wg(n,t){return n*n*t}function go(n,t,e,i){return Hg(n,t)+Vg(n,e)+Wg(n,i)}function qg(n,t){const e=1-n;return e*e*e*t}function Xg(n,t){const e=1-n;return 3*e*e*n*t}function Yg(n,t){return 3*(1-n)*n*n*t}function $g(n,t){return n*n*n*t}function vo(n,t,e,i,s){return qg(n,t)+Xg(n,e)+Yg(n,i)+$g(n,s)}class Zg extends _i{constructor(t=new Et,e=new Et,i=new Et,s=new Et){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new Et){const i=e,s=this.v0,o=this.v1,r=this.v2,a=this.v3;return i.set(vo(t,s.x,o.x,r.x,a.x),vo(t,s.y,o.y,r.y,a.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Kg extends _i{constructor(t=new b,e=new b,i=new b,s=new b){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new b){const i=e,s=this.v0,o=this.v1,r=this.v2,a=this.v3;return i.set(vo(t,s.x,o.x,r.x,a.x),vo(t,s.y,o.y,r.y,a.y),vo(t,s.z,o.z,r.z,a.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class jg extends _i{constructor(t=new Et,e=new Et){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new Et){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new Et){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Jg extends _i{constructor(t=new b,e=new b){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new b){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new b){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Qg extends _i{constructor(t=new Et,e=new Et,i=new Et){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new Et){const i=e,s=this.v0,o=this.v1,r=this.v2;return i.set(go(t,s.x,o.x,r.x),go(t,s.y,o.y,r.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class nd extends _i{constructor(t=new b,e=new b,i=new b){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new b){const i=e,s=this.v0,o=this.v1,r=this.v2;return i.set(go(t,s.x,o.x,r.x),go(t,s.y,o.y,r.y),go(t,s.z,o.z,r.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class tv extends _i{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new Et){const i=e,s=this.points,o=(s.length-1)*t,r=Math.floor(o),a=o-r,l=s[r===0?r:r-1],c=s[r],u=s[r>s.length-2?s.length-1:r+1],d=s[r>s.length-3?s.length-1:r+2];return i.set(Jc(a,l.x,c.x,u.x,d.x),Jc(a,l.y,c.y,u.y,d.y)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(new Et().fromArray(s))}return this}}var ev=Object.freeze({__proto__:null,ArcCurve:Gg,CatmullRomCurve3:pn,CubicBezierCurve:Zg,CubicBezierCurve3:Kg,EllipseCurve:ed,LineCurve:jg,LineCurve3:Jg,QuadraticBezierCurve:Qg,QuadraticBezierCurve3:nd,SplineCurve:tv});class $n extends Pe{constructor(t=1,e=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:i,thetaLength:s},e=Math.max(3,e);const o=[],r=[],a=[],l=[],c=new b,u=new Et;r.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let d=0,h=3;d<=e;d++,h+=3){const f=i+d/e*s;c.x=t*Math.cos(f),c.y=t*Math.sin(f),r.push(c.x,c.y,c.z),a.push(0,0,1),u.x=(r[h]/t+1)/2,u.y=(r[h+1]/t+1)/2,l.push(u.x,u.y)}for(let d=1;d<=e;d++)o.push(d,d+1,0);this.setIndex(o),this.setAttribute("position",new Te(r,3)),this.setAttribute("normal",new Te(a,3)),this.setAttribute("uv",new Te(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new $n(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Rt extends Pe{constructor(t=1,e=1,i=1,s=32,o=1,r=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:s,heightSegments:o,openEnded:r,thetaStart:a,thetaLength:l};const c=this;s=Math.floor(s),o=Math.floor(o);const u=[],d=[],h=[],f=[];let m=0;const v=[],g=i/2;let p=0;S(),r===!1&&(t>0&&w(!0),e>0&&w(!1)),this.setIndex(u),this.setAttribute("position",new Te(d,3)),this.setAttribute("normal",new Te(h,3)),this.setAttribute("uv",new Te(f,2));function S(){const M=new b,E=new b;let P=0;const I=(e-t)/i;for(let N=0;N<=o;N++){const y=[],x=N/o,L=x*(e-t)+t;for(let B=0;B<=s;B++){const k=B/s,nt=k*l+a,rt=Math.sin(nt),st=Math.cos(nt);E.x=L*rt,E.y=-x*i+g,E.z=L*st,d.push(E.x,E.y,E.z),M.set(rt,I,st).normalize(),h.push(M.x,M.y,M.z),f.push(k,1-x),y.push(m++)}v.push(y)}for(let N=0;N<s;N++)for(let y=0;y<o;y++){const x=v[y][N],L=v[y+1][N],B=v[y+1][N+1],k=v[y][N+1];(t>0||y!==0)&&(u.push(x,L,k),P+=3),(e>0||y!==o-1)&&(u.push(L,B,k),P+=3)}c.addGroup(p,P,0),p+=P}function w(M){const E=m,P=new Et,I=new b;let N=0;const y=M===!0?t:e,x=M===!0?1:-1;for(let B=1;B<=s;B++)d.push(0,g*x,0),h.push(0,x,0),f.push(.5,.5),m++;const L=m;for(let B=0;B<=s;B++){const nt=B/s*l+a,rt=Math.cos(nt),st=Math.sin(nt);I.x=y*st,I.y=g*x,I.z=y*rt,d.push(I.x,I.y,I.z),h.push(0,x,0),P.x=rt*.5+.5,P.y=st*.5*x+.5,f.push(P.x,P.y),m++}for(let B=0;B<s;B++){const k=E+B,nt=L+B;M===!0?u.push(nt,nt+1,k):u.push(nt+1,nt,k),N+=3}c.addGroup(p,N,M===!0?1:2),p+=N}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Rt(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class an extends Rt{constructor(t=1,e=1,i=32,s=1,o=!1,r=0,a=Math.PI*2){super(0,t,e,i,s,o,r,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:i,heightSegments:s,openEnded:o,thetaStart:r,thetaLength:a}}static fromJSON(t){return new an(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Dr extends Pe{constructor(t=[],e=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:i,detail:s};const o=[],r=[];a(s),c(i),u(),this.setAttribute("position",new Te(o,3)),this.setAttribute("normal",new Te(o.slice(),3)),this.setAttribute("uv",new Te(r,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(S){const w=new b,M=new b,E=new b;for(let P=0;P<e.length;P+=3)f(e[P+0],w),f(e[P+1],M),f(e[P+2],E),l(w,M,E,S)}function l(S,w,M,E){const P=E+1,I=[];for(let N=0;N<=P;N++){I[N]=[];const y=S.clone().lerp(M,N/P),x=w.clone().lerp(M,N/P),L=P-N;for(let B=0;B<=L;B++)B===0&&N===P?I[N][B]=y:I[N][B]=y.clone().lerp(x,B/L)}for(let N=0;N<P;N++)for(let y=0;y<2*(P-N)-1;y++){const x=Math.floor(y/2);y%2===0?(h(I[N][x+1]),h(I[N+1][x]),h(I[N][x])):(h(I[N][x+1]),h(I[N+1][x+1]),h(I[N+1][x]))}}function c(S){const w=new b;for(let M=0;M<o.length;M+=3)w.x=o[M+0],w.y=o[M+1],w.z=o[M+2],w.normalize().multiplyScalar(S),o[M+0]=w.x,o[M+1]=w.y,o[M+2]=w.z}function u(){const S=new b;for(let w=0;w<o.length;w+=3){S.x=o[w+0],S.y=o[w+1],S.z=o[w+2];const M=g(S)/2/Math.PI+.5,E=p(S)/Math.PI+.5;r.push(M,1-E)}m(),d()}function d(){for(let S=0;S<r.length;S+=6){const w=r[S+0],M=r[S+2],E=r[S+4],P=Math.max(w,M,E),I=Math.min(w,M,E);P>.9&&I<.1&&(w<.2&&(r[S+0]+=1),M<.2&&(r[S+2]+=1),E<.2&&(r[S+4]+=1))}}function h(S){o.push(S.x,S.y,S.z)}function f(S,w){const M=S*3;w.x=t[M+0],w.y=t[M+1],w.z=t[M+2]}function m(){const S=new b,w=new b,M=new b,E=new b,P=new Et,I=new Et,N=new Et;for(let y=0,x=0;y<o.length;y+=9,x+=6){S.set(o[y+0],o[y+1],o[y+2]),w.set(o[y+3],o[y+4],o[y+5]),M.set(o[y+6],o[y+7],o[y+8]),P.set(r[x+0],r[x+1]),I.set(r[x+2],r[x+3]),N.set(r[x+4],r[x+5]),E.copy(S).add(w).add(M).divideScalar(3);const L=g(E);v(P,x+0,S,L),v(I,x+2,w,L),v(N,x+4,M,L)}}function v(S,w,M,E){E<0&&S.x===1&&(r[w]=S.x-1),M.x===0&&M.z===0&&(r[w]=E/2/Math.PI+.5)}function g(S){return Math.atan2(S.z,-S.x)}function p(S){return Math.atan2(-S.y,Math.sqrt(S.x*S.x+S.z*S.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Dr(t.vertices,t.indices,t.radius,t.details)}}class Ol extends Dr{constructor(t=1,e=0){const i=(1+Math.sqrt(5))/2,s=1/i,o=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-i,0,-s,i,0,s,-i,0,s,i,-s,-i,0,-s,i,0,s,-i,0,s,i,0,-i,0,-s,i,0,-s,-i,0,s,i,0,s],r=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(o,r,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Ol(t.radius,t.detail)}}class ss extends Dr{constructor(t=1,e=0){const i=(1+Math.sqrt(5))/2,s=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],o=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,o,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new ss(t.radius,t.detail)}}class oe extends Pe{constructor(t=1,e=32,i=16,s=0,o=Math.PI*2,r=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:s,phiLength:o,thetaStart:r,thetaLength:a},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));const l=Math.min(r+a,Math.PI);let c=0;const u=[],d=new b,h=new b,f=[],m=[],v=[],g=[];for(let p=0;p<=i;p++){const S=[],w=p/i;let M=0;p===0&&r===0?M=.5/e:p===i&&l===Math.PI&&(M=-.5/e);for(let E=0;E<=e;E++){const P=E/e;d.x=-t*Math.cos(s+P*o)*Math.sin(r+w*a),d.y=t*Math.cos(r+w*a),d.z=t*Math.sin(s+P*o)*Math.sin(r+w*a),m.push(d.x,d.y,d.z),h.copy(d).normalize(),v.push(h.x,h.y,h.z),g.push(P+M,1-w),S.push(c++)}u.push(S)}for(let p=0;p<i;p++)for(let S=0;S<e;S++){const w=u[p][S+1],M=u[p][S],E=u[p+1][S],P=u[p+1][S+1];(p!==0||r>0)&&f.push(w,M,P),(p!==i-1||l<Math.PI)&&f.push(M,E,P)}this.setIndex(f),this.setAttribute("position",new Te(m,3)),this.setAttribute("normal",new Te(v,3)),this.setAttribute("uv",new Te(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new oe(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Yn extends Pe{constructor(t=1,e=.4,i=12,s=48,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:s,arc:o},i=Math.floor(i),s=Math.floor(s);const r=[],a=[],l=[],c=[],u=new b,d=new b,h=new b;for(let f=0;f<=i;f++)for(let m=0;m<=s;m++){const v=m/s*o,g=f/i*Math.PI*2;d.x=(t+e*Math.cos(g))*Math.cos(v),d.y=(t+e*Math.cos(g))*Math.sin(v),d.z=e*Math.sin(g),a.push(d.x,d.y,d.z),u.x=t*Math.cos(v),u.y=t*Math.sin(v),h.subVectors(d,u).normalize(),l.push(h.x,h.y,h.z),c.push(m/s),c.push(f/i)}for(let f=1;f<=i;f++)for(let m=1;m<=s;m++){const v=(s+1)*f+m-1,g=(s+1)*(f-1)+m-1,p=(s+1)*(f-1)+m,S=(s+1)*f+m;r.push(v,g,S),r.push(g,p,S)}this.setIndex(r),this.setAttribute("position",new Te(a,3)),this.setAttribute("normal",new Te(l,3)),this.setAttribute("uv",new Te(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Yn(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class ks extends Pe{constructor(t=new nd(new b(-1,-1,0),new b(-1,1,0),new b(1,1,0)),e=64,i=1,s=8,o=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:i,radialSegments:s,closed:o};const r=t.computeFrenetFrames(e,o);this.tangents=r.tangents,this.normals=r.normals,this.binormals=r.binormals;const a=new b,l=new b,c=new Et;let u=new b;const d=[],h=[],f=[],m=[];v(),this.setIndex(m),this.setAttribute("position",new Te(d,3)),this.setAttribute("normal",new Te(h,3)),this.setAttribute("uv",new Te(f,2));function v(){for(let w=0;w<e;w++)g(w);g(o===!1?e:0),S(),p()}function g(w){u=t.getPointAt(w/e,u);const M=r.normals[w],E=r.binormals[w];for(let P=0;P<=s;P++){const I=P/s*Math.PI*2,N=Math.sin(I),y=-Math.cos(I);l.x=y*M.x+N*E.x,l.y=y*M.y+N*E.y,l.z=y*M.z+N*E.z,l.normalize(),h.push(l.x,l.y,l.z),a.x=u.x+i*l.x,a.y=u.y+i*l.y,a.z=u.z+i*l.z,d.push(a.x,a.y,a.z)}}function p(){for(let w=1;w<=e;w++)for(let M=1;M<=s;M++){const E=(s+1)*(w-1)+(M-1),P=(s+1)*w+(M-1),I=(s+1)*w+M,N=(s+1)*(w-1)+M;m.push(E,P,N),m.push(P,I,N)}}function S(){for(let w=0;w<=e;w++)for(let M=0;M<=s;M++)c.x=w/e,c.y=M/s,f.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new ks(new ev[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}class nv extends on{static get type(){return"RawShaderMaterial"}constructor(t){super(t),this.isRawShaderMaterial=!0}}class $ extends vi{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new _t(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new _t(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Cl,this.normalScale=new Et(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Gn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class $e extends vi{static get type(){return"MeshLambertMaterial"}constructor(t){super(),this.isMeshLambertMaterial=!0,this.color=new _t(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new _t(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Cl,this.normalScale=new Et(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Gn,this.combine=xl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Ur extends We{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new _t(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class id extends Ur{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(We.DEFAULT_UP),this.updateMatrix(),this.groundColor=new _t(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const ma=new Ee,Qc=new b,tu=new b;class sd{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Et(512,512),this.map=null,this.mapPass=null,this.matrix=new Ee,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ll,this._frameExtents=new Et(1,1),this._viewportCount=1,this._viewports=[new be(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;Qc.setFromMatrixPosition(t.matrixWorld),e.position.copy(Qc),tu.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(tu),e.updateMatrixWorld(),ma.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ma),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(ma)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const eu=new Ee,ro=new b,ga=new b;class iv extends sd{constructor(){super(new Ie(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Et(4,2),this._viewportCount=6,this._viewports=[new be(2,1,1,1),new be(0,1,1,1),new be(3,1,1,1),new be(1,1,1,1),new be(3,0,1,1),new be(1,0,1,1)],this._cubeDirections=[new b(1,0,0),new b(-1,0,0),new b(0,0,1),new b(0,0,-1),new b(0,1,0),new b(0,-1,0)],this._cubeUps=[new b(0,1,0),new b(0,1,0),new b(0,1,0),new b(0,1,0),new b(0,0,1),new b(0,0,-1)]}updateMatrices(t,e=0){const i=this.camera,s=this.matrix,o=t.distance||i.far;o!==i.far&&(i.far=o,i.updateProjectionMatrix()),ro.setFromMatrixPosition(t.matrixWorld),i.position.copy(ro),ga.copy(i.position),ga.add(this._cubeDirections[e]),i.up.copy(this._cubeUps[e]),i.lookAt(ga),i.updateMatrixWorld(),s.makeTranslation(-ro.x,-ro.y,-ro.z),eu.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(eu)}}class Bl extends Ur{constructor(t,e,i=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new iv}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class sv extends sd{constructor(){super(new Il(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class od extends Ur{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(We.DEFAULT_UP),this.updateMatrix(),this.target=new We,this.shadow=new sv}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class rd extends Ur{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class ov{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=nu(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=nu();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function nu(){return performance.now()}const iu=new Ee;class rv{constructor(t,e,i=0,s=1/0){this.ray=new Pr(t,e),this.near=i,this.far=s,this.camera=null,this.layers=new Pl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return iu.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(iu),this}intersectObject(t,e=!0,i=[]){return gl(t,this,i,e),i.sort(su),i}intersectObjects(t,e=!0,i=[]){for(let s=0,o=t.length;s<o;s++)gl(t[s],this,i,e);return i.sort(su),i}}function su(n,t){return n.distance-t.distance}function gl(n,t,e,i){let s=!0;if(n.layers.test(t.layers)&&n.raycast(t,e)===!1&&(s=!1),s===!0&&i===!0){const o=n.children;for(let r=0,a=o.length;r<a;r++)gl(o[r],t,e,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:_l}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=_l);const ad={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class qs{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const av=new Il(-1,1,1,-1,0,1);class lv extends Pe{constructor(){super(),this.setAttribute("position",new Te([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Te([0,2,0,0,2,0],2))}}const cv=new lv;class kl{constructor(t){this._mesh=new R(cv,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,av)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class uv extends qs{constructor(t,e){super(),this.textureID=e!==void 0?e:"tDiffuse",t instanceof on?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=xo.clone(t.uniforms),this.material=new on({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this.fsQuad=new kl(this.material)}render(t,e,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this.fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class ou extends qs{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,i){const s=t.getContext(),o=t.state;o.buffers.color.setMask(!1),o.buffers.depth.setMask(!1),o.buffers.color.setLocked(!0),o.buffers.depth.setLocked(!0);let r,a;this.inverse?(r=0,a=1):(r=1,a=0),o.buffers.stencil.setTest(!0),o.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),o.buffers.stencil.setFunc(s.ALWAYS,r,4294967295),o.buffers.stencil.setClear(a),o.buffers.stencil.setLocked(!0),t.setRenderTarget(i),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),o.buffers.color.setLocked(!1),o.buffers.depth.setLocked(!1),o.buffers.color.setMask(!0),o.buffers.depth.setMask(!0),o.buffers.stencil.setLocked(!1),o.buffers.stencil.setFunc(s.EQUAL,1,4294967295),o.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),o.buffers.stencil.setLocked(!0)}}class dv extends qs{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class hv{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){const i=t.getSize(new Et);this._width=i.width,this._height=i.height,e=new kn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:fi}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new uv(ad),this.copyPass.material.blending=hi,this.clock=new ov}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());const e=this.renderer.getRenderTarget();let i=!1;for(let s=0,o=this.passes.length;s<o;s++){const r=this.passes[s];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),r.render(this.renderer,this.writeBuffer,this.readBuffer,t,i),r.needsSwap){if(i){const a=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}ou!==void 0&&(r instanceof ou?i=!0:r instanceof dv&&(i=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){const e=this.renderer.getSize(new Et);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const i=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(i,s),this.renderTarget2.setSize(i,s);for(let o=0;o<this.passes.length;o++)this.passes[o].setSize(i,s)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class fv extends qs{constructor(t,e,i=null,s=null,o=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=i,this.clearColor=s,this.clearAlpha=o,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new _t}render(t,e,i){const s=t.autoClear;t.autoClear=!1;let o,r;this.overrideMaterial!==null&&(r=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(o=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(o),this.overrideMaterial!==null&&(this.scene.overrideMaterial=r),t.autoClear=s}}const pv={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new _t(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class Gs extends qs{constructor(t,e,i,s){super(),this.strength=e!==void 0?e:1,this.radius=i,this.threshold=s,this.resolution=t!==void 0?new Et(t.x,t.y):new Et(256,256),this.clearColor=new _t(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let o=Math.round(this.resolution.x/2),r=Math.round(this.resolution.y/2);this.renderTargetBright=new kn(o,r,{type:fi}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let d=0;d<this.nMips;d++){const h=new kn(o,r,{type:fi});h.texture.name="UnrealBloomPass.h"+d,h.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(h);const f=new kn(o,r,{type:fi});f.texture.name="UnrealBloomPass.v"+d,f.texture.generateMipmaps=!1,this.renderTargetsVertical.push(f),o=Math.round(o/2),r=Math.round(r/2)}const a=pv;this.highPassUniforms=xo.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new on({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];o=Math.round(this.resolution.x/2),r=Math.round(this.resolution.y/2);for(let d=0;d<this.nMips;d++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[d])),this.separableBlurMaterials[d].uniforms.invSize.value=new Et(1/o,1/r),o=Math.round(o/2),r=Math.round(r/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new b(1,1,1),new b(1,1,1),new b(1,1,1),new b(1,1,1),new b(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const u=ad;this.copyUniforms=xo.clone(u.uniforms),this.blendMaterial=new on({uniforms:this.copyUniforms,vertexShader:u.vertexShader,fragmentShader:u.fragmentShader,blending:He,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new _t,this.oldClearAlpha=1,this.basic=new Fe,this.fsQuad=new kl(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(t,e){let i=Math.round(t/2),s=Math.round(e/2);this.renderTargetBright.setSize(i,s);for(let o=0;o<this.nMips;o++)this.renderTargetsHorizontal[o].setSize(i,s),this.renderTargetsVertical[o].setSize(i,s),this.separableBlurMaterials[o].uniforms.invSize.value=new Et(1/i,1/s),i=Math.round(i/2),s=Math.round(s/2)}render(t,e,i,s,o){t.getClearColor(this._oldClearColor),this.oldClearAlpha=t.getClearAlpha();const r=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),o&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=i.texture,t.setRenderTarget(null),t.clear(),this.fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this.fsQuad.render(t);let a=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[l].uniforms.direction.value=Gs.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[l]),t.clear(),this.fsQuad.render(t),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=Gs.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[l]),t.clear(),this.fsQuad.render(t),a=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this.fsQuad.render(t),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,o&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(i),this.fsQuad.render(t)),t.setClearColor(this._oldClearColor,this.oldClearAlpha),t.autoClear=r}getSeperableBlurMaterial(t){const e=[];for(let i=0;i<t;i++)e.push(.39894*Math.exp(-.5*i*i/(t*t))/t);return new on({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new Et(.5,.5)},direction:{value:new Et(.5,.5)},gaussianCoefficients:{value:e}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(t){return new on({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}Gs.BlurDirectionX=new Et(1,0);Gs.BlurDirectionY=new Et(0,1);const mv={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
	
		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class gv extends qs{constructor(){super();const t=mv;this.uniforms=xo.clone(t.uniforms),this.material=new nv({name:t.name,uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader}),this.fsQuad=new kl(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},fe.getTransfer(this._outputColorSpace)===_e&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Su?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===wu?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===bu?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===wo?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Eu?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Tu&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}let Ue=!1;function vv(n){Ue=n}function ns(){return Ue}const ie={skyTop:14930610,skyMid:15524034,skyHorizon:16116950,sun:15317355,ground:13811085,groundDark:12559992,walnut:5917238,walnutDark:4338986,bronze:10125655,terracotta:12618344,amber:13608308,hill:12759693,path:16777215,pathEdge:15789280};function Cn(n,t){const e=document.createElement("canvas");e.width=128,e.height=128;const i=e.getContext("2d"),s=i.createRadialGradient(64,64,64*n,64,64,64);s.addColorStop(0,t),s.addColorStop(1,"rgba(0,0,0,0)"),i.fillStyle=s,i.fillRect(0,0,128,128);const o=new tn(e);return o.colorSpace=ye,o}function wr(n,t,e){const i=t.split(" "),s=[];let o="";for(const r of i){const a=o?o+" "+r:r;n.measureText(a).width>e&&o?(s.push(o),o=r):o=a}return o&&s.push(o),s}function ru(n,t,e,i,s,o){let r=i;n.font=`600 ${r}px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif`;let a=wr(n,t,e);for(;a.length>o&&r>s;)r-=4,n.font=`600 ${r}px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif`,a=wr(n,t,e);return{lines:a,size:r}}function ld(){const n=document.createElement("canvas");n.width=256,n.height=256;const t=n.getContext("2d");t.fillStyle="#cdb98c",t.fillRect(0,0,256,256);for(let i=0;i<26;i++){const s=172+Math.random()*34;t.fillStyle=`rgba(${s|0},${s*.93|0},${s*.74|0},${(.05+Math.random()*.1).toFixed(3)})`,t.beginPath(),t.ellipse(Math.random()*256,Math.random()*256,14+Math.random()*30,10+Math.random()*22,Math.random()*Math.PI,0,Math.PI*2),t.fill()}for(let i=0;i<2200;i++){const s=168+Math.random()*42;t.fillStyle=`rgba(${s|0},${s*.92|0},${s*.72|0},${(Math.random()*.16).toFixed(3)})`,t.fillRect(Math.random()*256,Math.random()*256,2+Math.random()*4,2+Math.random()*4)}for(let i=0;i<120;i++)t.fillStyle="rgba(110,86,52,"+(.12+Math.random()*.2).toFixed(3)+")",t.beginPath(),t.arc(Math.random()*256,Math.random()*256,1+Math.random()*2,0,Math.PI*2),t.fill();const e=new tn(n);return e.colorSpace=ye,e.wrapS=e.wrapT=Ni,e.repeat.set(Ue?48:90,Ue?48:90),e.anisotropy=Ue?2:8,e}function Ts(){const n=document.createElement("canvas");n.width=256,n.height=256;const t=n.getContext("2d");t.fillStyle="#212429",t.fillRect(0,0,256,256);for(let i=0;i<4600;i++){const s=26+Math.random()*40;t.fillStyle=`rgba(${s|0},${s*.98|0},${s*1.04|0},${(Math.random()*.28).toFixed(3)})`,t.fillRect(Math.random()*256,Math.random()*256,1+Math.random()*2,1+Math.random()*2)}for(let i=0;i<700;i++)t.fillStyle=`rgba(118,124,134,${(Math.random()*.1).toFixed(3)})`,t.fillRect(Math.random()*256,Math.random()*256,1+Math.random()*2,1+Math.random()*2);for(const i of[42,178]){const s=t.createLinearGradient(i,0,i+34,256);s.addColorStop(0,"rgba(8,10,12,0)"),s.addColorStop(.5,"rgba(8,10,12,0.5)"),s.addColorStop(1,"rgba(8,10,12,0)"),t.fillStyle=s,t.fillRect(i,0,34,256)}t.fillStyle="rgba(6,8,11,0.38)",t.fillRect(127,0,2,256);const e=new tn(n);return e.colorSpace=ye,e.wrapS=e.wrapT=Ni,e.repeat.set(1,60),e.anisotropy=Ue?2:8,e}function li(n,t,e,i,s=500,o=!1){const r=n.getSpacedPoints(s),a=new Float32Array((s+1)*6),l=new Float32Array((s+1)*4),c=new Uint32Array(s*6);for(let h=0;h<=s;h++){const f=r[Math.min(h,s-1)],m=r[Math.min(h+1,s-1)],v=new b().subVectors(m,f).normalize(),g=new b(-v.z,0,v.x).normalize(),p=f.clone().add(g.clone().multiplyScalar(-t/2)),S=f.clone().add(g.clone().multiplyScalar(t/2)),w=h*6;if(a[w]=p.x,a[w+1]=p.y,a[w+2]=p.z,a[w+3]=S.x,a[w+4]=S.y,a[w+5]=S.z,l[h*4]=0,l[h*4+1]=h/s,l[h*4+2]=1,l[h*4+3]=h/s,h<s){const M=h*2,E=h*2+1,P=h*2+2,I=h*2+3,N=h*6;c[N]=M,c[N+1]=P,c[N+2]=E,c[N+3]=E,c[N+4]=P,c[N+5]=I}}const u=new Pe;u.setAttribute("position",new Be(a,3)),u.setAttribute("uv",new Be(l,2)),u.setIndex(new Be(c,1)),u.computeVertexNormals();const d=new R(u,o?new Fe({color:e,side:Oe}):new $({color:e,roughness:.85,metalness:.02,map:i||null,side:Oe}));return d.receiveShadow=!0,d}function cd(n,t,e,i,s){const o=new Tt,r=t.getPointAt(e),a=t.getTangentAt(e),c=new b(-a.z,0,a.x).normalize().clone().multiplyScalar(i*7.4),u=s%3-1;o.position.set(r.x+c.x+u*.5,0,r.z+c.z+u*.5);const d=t.getPointAt(Math.max(0,e-.035)),h=new b().subVectors(d,o.position).normalize(),f=Math.atan2(h.x,h.z);o.rotation.y=f;const m=new $({color:ie.walnut,roughness:.8,metalness:.05});m.emissive=new _t(3817293),m.emissiveIntensity=0;const v=new R(new ft(6.6,4.4,.22),m);v.position.y=3,v.castShadow=!0,o.add(v);const g=new $({color:12035198,roughness:.92}),p=new R(new ft(5.6,.4,.8),g);p.position.y=.2,p.castShadow=!0,o.add(p);const S=new $({color:10125655,roughness:.9}),w=new $({color:4338986,roughness:1}),M=new $({color:6257226,roughness:1,flatShading:!0});for(const dt of[-2.9,2.9]){const G=new R(new ft(.5,.34,.5),S);G.position.set(dt,.17,.55),o.add(G);const U=new R(new ft(.42,.1,.42),w);U.position.set(dt,.34,.55),o.add(U);for(const tt of[-.1,.12]){const at=new R(new ss(.14,1),M);at.position.set(dt+tt,.42,.55),o.add(at);const q=new R(new oe(.05,6,5),new $({color:dt<0?12618344:13608308,roughness:.9}));q.position.set(dt+tt,.52,.55),o.add(q)}}const E=new $({color:ie.bronze,roughness:.75,metalness:.12}),P=new R(new ft(7,.26,.3),E);P.position.y=5.32,o.add(P);const I=new R(new ft(7,.26,.3),E);I.position.y=.72,o.add(I);for(const dt of[-3.5,3.5]){const G=new R(new ft(.26,4.8,.3),E);G.position.set(dt,3,0),o.add(G)}const N=new $({color:ie.walnutDark,roughness:.7,metalness:.1});for(const dt of[-2.5,2.5]){const G=new R(new ft(.32,.8,.32),N);G.position.set(dt,.4,0),G.castShadow=!0,o.add(G)}const y=Ue?768:1280,x=Math.round(y*(660/1024)),L=au(n,s,y,x,!1),B=au(n,s,y,x,!0),k=new $e({map:L});k.emissive=new _t(15781776),k.emissiveIntensity=0;const nt=new R(new Jt(6.2,4),k);nt.position.set(0,3,.125),o.add(nt);const rt=new R(new Jt(6.2,4),new $({color:ie.walnutDark,roughness:.9}));rt.position.set(0,3,-.125),rt.rotation.y=Math.PI,o.add(rt);const st=Ue?null:new Bl(15246172,0,26,2);st&&(st.position.set(0,3.3,2.4),o.add(st));const ot=new $({color:ie.amber,emissive:ie.amber,emissiveIntensity:.22}),et=new R(new oe(.09,12,12),ot);return et.position.set(0,5.52,0),o.add(et),{group:o,frontMat:k,light:st,beaconMat:ot,front:nt,restRot:f,frameMat:m,dayTex:L,nightTex:B}}function au(n,t,e,i,s){const o=document.createElement("canvas");o.width=e,o.height=i,_v(o.getContext("2d"),n,t,e,i,s);const r=new tn(o);return r.colorSpace=ye,r.anisotropy=Ue?2:8,r}function _v(n,t,e,i=1024,s=660,o=!1){n.scale(i/1024,s/660);const r=1024,a=660;if(o){const g=n.createLinearGradient(0,0,0,a);g.addColorStop(0,"#2c3347"),g.addColorStop(.55,"#252c3d"),g.addColorStop(1,"#1a2130"),n.fillStyle=g,n.fillRect(0,0,r,a);const p=n.createRadialGradient(r/2,a*.42,40,r/2,a*.42,r*.55);p.addColorStop(0,"rgba(140,160,210,0.10)"),p.addColorStop(1,"rgba(140,160,210,0)"),n.fillStyle=p,n.fillRect(0,0,r,a),n.strokeStyle="rgba(150,165,200,0.22)",n.lineWidth=3,n.strokeRect(30,30,r-60,a-60),n.strokeStyle="rgba(150,165,200,0.14)",n.lineWidth=1.5,n.strokeRect(45,45,r-90,a-90),n.fillStyle="rgba(210,170,110,0.16)",n.fillRect(64,48,r-128,46),n.fillStyle="rgba(220,180,120,0.4)",n.fillRect(64,92,r-128,2),n.fillStyle="#d8c9a3",n.font="500 22px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",n.textAlign="left",n.letterSpacing="5px",n.fillText(t.kicker.toUpperCase(),64,78),n.letterSpacing="0px",n.fillStyle="rgba(220,205,170,0.10)",n.font="600 220px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",n.textAlign="right",n.fillText(t.num,r-56,270),n.fillStyle="rgba(220,180,120,0.35)",n.font="600 40px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",n.fillText(t.num,r-56,298),n.fillStyle="#c9a25f",n.fillRect(64,108,90,4),n.save(),n.shadowColor="rgba(255,205,120,0.55)",n.shadowBlur=14,n.fillStyle="#f6e7c0",n.textAlign="left";const S=ru(n,t.title,850,56,38,4);let w=176;const M=Math.round(S.size*1.1);if(S.lines.forEach(E=>{n.fillText(E,64,w),w+=M}),n.restore(),w+=14,t.id!=="quiz"&&t.bullets.length){n.fillStyle="rgba(200,170,120,0.35)",n.fillRect(64,w-4,60,2),w+=22;const E=a-104;let P=26;const I=x=>{n.font=`400 ${x}px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif`;const L=[];return t.bullets.forEach(B=>L.push(...wr(n,B,830))),L};let N=I(P);for(;N.length*Math.round(P*1.38)>E-w&&P>19;)P-=1,N=I(P);const y=Math.round(P*1.38);N.forEach(x=>{n.fillStyle="#c9a25f",n.beginPath(),n.arc(74,w-9,3.5,0,Math.PI*2),n.fill(),n.save(),n.shadowColor="rgba(255,205,120,0.4)",n.shadowBlur=8,n.fillStyle="#e8dab4",n.fillText(x,98,w),n.restore(),w+=y})}n.fillStyle="rgba(200,170,120,0.25)",n.fillRect(64,a-90,r-128,2),n.fillStyle="rgba(200,190,215,0.55)",n.font="400 19px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",n.textAlign="left",n.letterSpacing="3px",n.fillText("MODULE 1 · DOMAINE PUBLIC",64,a-60),n.fillStyle="rgba(210,170,110,0.6)",n.textAlign="right",n.fillText(String(e+1).padStart(2,"0")+" / "+String(13).padStart(2,"0"),r-64,a-60),n.letterSpacing="0px";return}const l=n.createLinearGradient(0,0,0,a);l.addColorStop(0,"#fdf8ec"),l.addColorStop(.55,"#f7eed7"),l.addColorStop(1,"#efe1c2"),n.fillStyle=l,n.fillRect(0,0,r,a);const c=n.createRadialGradient(r/2,a*.42,40,r/2,a*.42,r*.55);c.addColorStop(0,"rgba(255,244,216,0.55)"),c.addColorStop(1,"rgba(255,244,216,0)"),n.fillStyle=c,n.fillRect(0,0,r,a),n.globalAlpha=.05;for(let g=0;g<900;g++)n.fillStyle=Math.random()>.5?"#7a5f38":"#ffffff",n.fillRect(Math.random()*r,Math.random()*a,2,2);n.globalAlpha=1,n.strokeStyle="rgba(122,95,56,0.28)",n.lineWidth=3,n.strokeRect(30,30,r-60,a-60),n.strokeStyle="rgba(192,138,104,0.22)",n.lineWidth=1.5,n.strokeRect(45,45,r-90,a-90),n.fillStyle="#c08a68";for(const[g,p,S,w]of[[30,30,1,1],[r-30,30,-1,1],[30,a-30,1,-1],[r-30,a-30,-1,-1]])n.fillRect(g+S*8,p+w*8,26*S,4*w),n.fillRect(g+S*8,p+w*8,4*S,26*w);n.fillStyle="rgba(192,138,104,0.14)",n.fillRect(64,48,r-128,46),n.fillStyle="rgba(207,165,116,0.55)",n.fillRect(64,92,r-128,2),n.fillStyle="#8a6a4e",n.font="500 22px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",n.textAlign="left",n.letterSpacing="5px",n.fillText(t.kicker.toUpperCase(),64,78),n.letterSpacing="0px",n.fillStyle="rgba(207,165,116,0.16)",n.font="600 220px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",n.textAlign="right",n.fillText(t.num,r-56,270),n.fillStyle="rgba(192,138,104,0.5)",n.font="600 40px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",n.fillText(t.num,r-56,298),n.fillStyle="#c08a68",n.fillRect(64,108,90,4);const u=()=>{n.save(),n.shadowColor="rgba(255,246,220,0.72)",n.shadowBlur=5},d=()=>n.restore();u(),n.fillStyle="#241a0e",n.textAlign="left";const h=ru(n,t.title,850,56,38,4);let f=176;const m=Math.round(h.size*1.1);if(h.lines.forEach(g=>{n.fillText(g,64,f),f+=m}),d(),f+=14,t.id!=="quiz"&&t.bullets.length){n.fillStyle="rgba(122,95,56,0.45)",n.fillRect(64,f-4,60,2),f+=22;const g=a-104;let p=26;const S=E=>{n.font=`400 ${E}px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif`;const P=[];return t.bullets.forEach(I=>P.push(...wr(n,I,830))),P};let w=S(p);for(;w.length*Math.round(p*1.38)>g-f&&p>19;)p-=1,w=S(p);const M=Math.round(p*1.38);w.forEach(E=>{n.fillStyle="#c08a68",n.beginPath(),n.arc(74,f-9,3.5,0,Math.PI*2),n.fill(),u(),n.fillStyle="#2e2314",n.fillText(E,98,f),d(),f+=M})}n.fillStyle="rgba(207,165,116,0.35)",n.fillRect(64,a-90,r-128,2),n.fillStyle="rgba(122,95,56,0.7)",n.font="400 19px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",n.textAlign="left",n.letterSpacing="3px",n.fillText("MODULE 1 · DOMAINE PUBLIC",64,a-60),n.fillStyle="rgba(170,120,85,0.8)",n.textAlign="right",n.fillText(String(e+1).padStart(2,"0")+" / "+String(13).padStart(2,"0"),r-64,a-60),n.letterSpacing="0px";const v=n.createRadialGradient(r/2,a/2,r*.3,r/2,a/2,r*.62);v.addColorStop(0,"rgba(0,0,0,0)"),v.addColorStop(.6,"rgba(0,0,0,0)"),v.addColorStop(1,"rgba(150,120,75,0.24)"),n.fillStyle=v,n.fillRect(0,0,r,a)}function vl(n,t,e,i,s){const o=document.createElement("canvas");o.width=64,o.height=128;const r=o.getContext("2d");r.fillStyle="#dccda8",r.fillRect(0,0,64,128);for(let m=0;m<9;m++)for(let v=0;v<4;v++){const g=Math.random();g<.3?(r.fillStyle=Math.random()<.3?"#c08a68":"#c9a25f",r.globalAlpha=.35+Math.random()*.35,r.fillRect(4+v*14+Math.random()*4,6+m*13+Math.random()*3,5,7),r.globalAlpha=1):g<.42&&(r.fillStyle="#6a5a38",r.globalAlpha=.35,r.fillRect(4+v*14,6+m*13,5,7),r.globalAlpha=1)}const a=new tn(o);a.colorSpace=ye,a.repeat.set(1,Math.max(1,Math.round(t/6))),a.wrapS=Ni,a.wrapT=Ni,a.anisotropy=Ue?1:4;const l=new $({map:a,roughness:.9,metalness:0});l.emissive=new _t(16763274),l.emissiveMap=a,l.emissiveIntensity=0;const c=new R(new ft(n,t,e),l);c.position.set(s,t/2-.3,i),c.rotation.y=(Math.random()-.5)*.5,c.castShadow=!0;const u=t/2,d=new $({color:12035198,roughness:.85}),h=new $({color:6969912,roughness:.8}),f=Math.random();if(f<.34&&t>8){const m=new R(new Rt(Math.min(1.1,n*.24),Math.min(1.1,n*.24),t*.12+.7,10),d);m.position.y=u+(t*.06+.55),c.add(m);const v=new R(new an(Math.min(1.1,n*.24),.55,10),h);v.position.y=u+(t*.06+.55)+(t*.06+.35)+.27,c.add(v);for(const[g,p]of[[-.5,-.5],[.5,-.5],[-.5,.5],[.5,.5]]){const S=new R(new Rt(.05,.05,.7,6),h);S.position.set(g*Math.min(.7,n*.16),u+.35,p*Math.min(.7,e*.16)),c.add(S)}}else if(f<.6){const m=new R(new Rt(.04,.07,t*.22+2.2,6),h);m.position.y=u+(t*.11+1.1),c.add(m);for(let g=0;g<3;g++){const p=new R(new ft(.5,.04,.04),h);p.position.y=u+(t*.11+.5+g*.55),c.add(p)}const v=new R(new oe(.09,8,8),new $({color:12597547,emissive:12597547,emissiveIntensity:.4}));v.position.y=u+t*.11+2.25,c.add(v)}else if(f<.78&&t>6){const m=new R(new ft(n*.3,.9,e*.3),d);m.position.y=u+.45,c.add(m);const v=new R(new ft(n*.16,.1,e*.16),h);v.position.y=u+.95,c.add(v)}else{const m=new R(new Rt(.22,.26,1.3,8),d);m.position.y=u+.65,c.add(m)}return c}function Mv(n){const t=new Tt,e=new $({color:15261896,roughness:.75}),i=new $({color:3038778,roughness:.7,metalness:.1}),s=new $({color:14256698,roughness:.6}),o=new R(new oe(.16,10,8),e);o.scale.set(1,.78,1.35),o.position.y=.14,t.add(o);const r=new R(new oe(.09,10,8),i);r.position.set(0,.3,.14),t.add(r);const a=new R(new an(.035,.1,6),s);a.rotation.x=Math.PI/2,a.position.set(0,.29,.25),t.add(a);const l=new R(new oe(.05,8,6),e);return l.position.set(0,.2,-.18),l.scale.set(1,.7,1.4),t.add(l),t.position.copy(n),{g:t,head:r,tail:l}}function yv(n){const t=new Tt;t.position.copy(n);const e=new R(new $n(4.4,28),new $({color:8366256,roughness:.08,metalness:.25,transparent:!0,opacity:.82}));e.rotation.x=-Math.PI/2,e.position.y=.05,t.add(e);const i=new R(new Yn(4.4,.28,8,32),new $({color:12035198,roughness:.9}));i.rotation.x=Math.PI/2,i.position.y=.02,t.add(i);const s=new $({color:5143114,roughness:.9,side:Oe}),o=new $({color:15255720,roughness:.8,side:Oe});for(let r=0;r<6;r++){const a=r/6*Math.PI*2+Math.random()*.5,l=1.2+Math.random()*2.2,c=new R(new $n(.3+Math.random()*.18,8),s);if(c.rotation.x=-Math.PI/2,c.position.set(Math.cos(a)*l,.1,Math.sin(a)*l),t.add(c),r%2===0){const u=new R(new oe(.1,6,5),o);u.position.set(Math.cos(a)*l+.12,.2,Math.sin(a)*l),u.scale.y=.6,t.add(u)}}return{g:t,water:e}}function xv(n){const t=new Tt,e=[12618344,13608308,10336383,9083576,14256746,12100808],i=e[Math.random()*e.length|0],s=new Fe({color:i,side:Oe,transparent:!0,opacity:.92}),o=new Jt(.16,.11),r=new R(o,s);r.position.x=-.09;const a=new R(o,s);a.position.x=.09;const l=new R(new ft(.02,.04,.08),new Fe({color:3812895}));return t.add(r,a,l),t.position.copy(n),{g:t,lw:r,rw:a}}function uo(n,t){const e=new Tt;e.position.copy(n);const i=new $({color:ie.walnutDark,roughness:.6,metalness:.3}),s=new R(new Rt(.07,.1,5.6,8),i);s.position.y=2.8,e.add(s);const o=new R(new ft(1.7,.1,.1),i);o.position.set(t*.85,5.5,0),e.add(o);const r=new $({color:ie.amber,emissive:ie.amber,emissiveIntensity:.25}),a=new R(new oe(.16,12,12),r);return a.position.set(t*1.7,5.5,0),e.add(a),e}function Sv(n,t){const e=new $({color:new _t(ie.groundDark).lerp(new _t(ie.ground),Math.random()),roughness:1,flatShading:!0}),i=new R(new ss(t,1),e);return i.position.set(n.x,-.15,n.z),i.scale.set(1,.32,1),i.rotation.y=Math.random()*Math.PI,i}function wv(n,t){const e=new $({color:10127976,roughness:.95,flatShading:!0}),i=new R(new Ol(t,0),e);return i.position.set(n.x,t*.4,n.z),i.rotation.set(Math.random(),Math.random()*Math.PI,Math.random()),i}function bv(n=420){const t=n,e=new Float32Array(t*3),i=new pn([new b(0,0,0),new b(0,0,120),new b(0,0,240),new b(0,0,360),new b(0,0,468)],!1,"centripetal");for(let r=0;r<t;r++){const a=Math.random(),l=i.getPointAt(a);e[r*3]=l.x+(Math.random()-.5)*24,e[r*3+1]=.4+Math.random()*6,e[r*3+2]=l.z+(Math.random()-.5)*24}const s=new Pe;s.setAttribute("position",new Be(e,3));const o=new Bs({color:ie.amber,transparent:!0,opacity:.5,blending:He,depthWrite:!1,size:.35,sizeAttenuation:!0});return new So(s,o)}function Ev(){const n=new Tt,t=new Fe({color:4864550,transparent:!0,opacity:.9,side:Oe}),e=new Jt(.55,.18),i=new R(e,t);i.position.x=-.3;const s=new R(e,t);s.position.x=.3;const o=new R(new Jt(.34,.07),t);return o.rotation.z=Math.PI/2,n.add(i,s,o),n.scale.setScalar(1.3),{g:n,l:i,r:s}}function ud(n,t=1){const e=new Tt,i=new $({color:9071429,roughness:.95,flatShading:!0}),s=new R(new Rt(.09,.18,3.2,6),i);s.position.y=1.6,s.rotation.z=(Math.random()-.5)*.22,s.castShadow=!0,e.add(s);const o=new $({color:6257226,roughness:1,flatShading:!0}),r=7;for(let l=0;l<r;l++){const c=l/r*Math.PI*2,u=new R(new oe(1,7,5),o);u.position.set(Math.cos(c)*1.15,3.05,Math.sin(c)*1.15),u.scale.set(1.15,.28,.55),u.rotation.y=c,e.add(u)}const a=new R(new oe(.28,8,6),o);return a.position.y=3.15,e.add(a),e.position.copy(n),e.scale.setScalar(t),e}function Tv(n,t=1){const e=new Tt,i=new $({color:7045971,roughness:1,flatShading:!0});for(let s=0;s<5;s++){const o=new R(new ss(.3+Math.random()*.24,1),i);o.position.set((Math.random()-.5)*.7,.22+Math.random()*.3,(Math.random()-.5)*.7),e.add(o)}return e.position.copy(n),e.scale.setScalar(t),e}function Av(n,t=1){const e=new Tt,i=new $({color:16183261,roughness:1,flatShading:!0,transparent:!0,opacity:.92});for(let s=0;s<6;s++){const o=new R(new oe(1.1+Math.random()*1.4,9,7),i);o.position.set(s*1.6-4,Math.random()*.9,(Math.random()-.5)*2),o.scale.y=.5,e.add(o)}return e.position.copy(n),e.scale.setScalar(t),e}function Cv(n,t,e){const i=new Tt;i.position.copy(n);const s=new $({color:ie.walnutDark,roughness:.7,metalness:.2}),o=new R(new Rt(.1,.14,2.1,8),s);o.position.y=1.05,o.castShadow=!0,i.add(o);const r=new R(new ft(.9,.08,.14),s);r.position.set(0,1.85,0),r.rotation.z=Math.PI/2,i.add(r);const a=Ue?256:512,l=Ue?160:320,c=document.createElement("canvas");c.width=a,c.height=l;const u=c.getContext("2d");u.scale(a/512,l/320),u.fillStyle="#f7eeda",u.fillRect(0,0,512,320),u.strokeStyle="rgba(138,111,69,0.6)",u.lineWidth=8,u.strokeRect(12,12,488,296);const d=u.createLinearGradient(0,0,512,0);d.addColorStop(0,"#c08a68"),d.addColorStop(1,"#cfa574"),u.fillStyle=d,u.fillRect(0,52,512,10),u.textAlign="center",u.fillStyle="#3a2e1f",u.font="700 42px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",e.forEach((g,p)=>u.fillText(g,256,122+p*50));const h=new tn(c);h.colorSpace=ye,h.anisotropy=Ue?2:8;const f=new $e({map:h}),m=new R(new Jt(1.7,1.06),f);m.position.y=2.28;const v=new Tt;return v.add(m),v.rotation.y=t,i.add(v),{group:i,sign:m}}function Rv(n,t,e,i){const s=new $({color:ie.hill,roughness:1,flatShading:!0}),o=new R(new ss(1,2),s);return o.scale.set(t,e,i),o.position.set(n.x,n.y,n.z),o.rotation.y=Math.random()*Math.PI,o.castShadow=!0,o}function ho(n,t){const e=new Tt;e.position.copy(n);const i=new Xn(new On({map:Cn(0,"rgba(255,190,120,0.3)"),transparent:!0,blending:He,depthWrite:!1,depthTest:!1}));i.scale.setScalar(3.6),i.position.set(t*1.7,5.5,0),e.add(i);const s=new R(new $n(3.8,24),new Fe({map:Cn(.12,"rgba(255,180,110,0.32)"),transparent:!0,blending:He,depthWrite:!1}));return s.rotation.x=-Math.PI/2,s.position.y=.03,e.add(s),{group:e,glow:i,pool:s}}function br(){const n=new Tt,t=Math.random()<.5?12618344:Math.random()<.5?13805688:7035458,e=new $({color:t,roughness:.45,metalness:.35}),i=new $({color:3813154,roughness:.5,metalness:.4}),s=new R(new ft(1.5,.5,3.2),e);s.position.y=.5,s.castShadow=!0,n.add(s);const o=new R(new ft(1.3,.24,1),i);o.position.set(0,.72,1.15),n.add(o);const r=new R(new ft(1.12,.46,1.5),i);r.position.set(0,.95,-.2),r.castShadow=!0,n.add(r);const a=new $({color:8364973,roughness:.15,metalness:.6});for(const[h,f]of[[0,-.95],[0,.5]]){const m=new R(new ft(1.14,.38,.05),a);m.position.set(h,.96,f),n.add(m)}const l=new $({color:3023896,roughness:.9});for(const[h,f]of[[-.78,1.05],[.78,1.05],[-.78,-1.05],[.78,-1.05]]){const m=new R(new Rt(.32,.32,.22,14),l);m.rotation.x=Math.PI/2,m.rotation.z=Math.PI/2,m.position.set(h,.32,f),n.add(m)}const c=new $({color:16773839,emissive:16769184,emissiveIntensity:.5});for(const h of[-.55,.55]){const f=new R(new oe(.09,8,8),c);f.position.set(h,.55,1.6),n.add(f)}const u=new $({color:9051670,emissive:9051670,emissiveIntensity:.3});for(const h of[-.55,.55]){const f=new R(new ft(.16,.1,.04),u);f.position.set(h,.55,-1.6),n.add(f)}const d=new Xn(new On({map:Cn(0,"rgba(255,226,175,0.4)"),transparent:!0,blending:He,depthWrite:!1,depthTest:!1}));return d.scale.set(3.4,3.4,1),d.position.set(0,.55,2.8),n.add(d),{group:n,cone:d,body:s}}function As(n,t){const e=new Tt;e.position.copy(n),e.rotation.y=t>0?Math.PI:0;const i=new $({color:9071429,roughness:.85}),s=new $({color:4864550,roughness:.7,metalness:.4}),o=new R(new ft(1.4,.08,.42),i);o.position.y=.42,e.add(o);const r=new R(new ft(1.4,.08,.4),i);r.position.set(0,.72,.18),e.add(r);for(const a of[-.6,.6]){const l=new R(new ft(.08,.42,.5),s);l.position.set(a,.21,0),e.add(l)}return e}function Pv(){const n=document.createElement("canvas");n.width=256,n.height=256;const t=n.getContext("2d");t.fillStyle="#d3c096",t.fillRect(0,0,256,256),t.strokeStyle="rgba(122,95,56,0.35)",t.lineWidth=2,t.strokeRect(2,2,252,252);for(let i=64;i<256;i+=64)t.beginPath(),t.moveTo(i,2),t.lineTo(i,254),t.stroke(),t.beginPath(),t.moveTo(2,i),t.lineTo(254,i),t.stroke();for(let i=0;i<900;i++){const s=180+Math.random()*36;t.fillStyle=`rgba(${s|0},${s*.9|0},${s*.72|0},${(Math.random()*.16).toFixed(3)})`,t.fillRect(Math.random()*256,Math.random()*256,1+Math.random()*3,1+Math.random()*3)}const e=new tn(n);return e.colorSpace=ye,e.wrapS=e.wrapT=Ni,e.repeat.set(Ue?1:2,90),e.anisotropy=Ue?2:8,e}function ar(n,t=1){const e=new Tt,i=new $({color:7031340,roughness:.95,flatShading:!0}),s=new R(new Rt(.1,.16,2.6,7),i);s.position.y=1.3,s.castShadow=!0,e.add(s);const o=new $({color:5599295,roughness:1,flatShading:!0});for(let r=0;r<3;r++){const a=new R(new oe(1.05-r*.18,8,6),o);a.position.set((Math.random()-.5)*.5,2.6+r*.65,(Math.random()-.5)*.5),a.scale.y=.85,a.castShadow=!0,e.add(a)}return e.position.copy(n),e.scale.setScalar(t),e}function Lv(n,t=1,e=0){const i=new Tt,s=[5599295,6585414],o=[12618344,13608308,10336383,14731680,14256746,9083576,12100808,13808780],r=a=>{const l=Math.sin(e*127.1+a*311.7)*43758.5453;return l-Math.floor(l)};for(let a=0;a<6;a++){const l=new R(new Rt(.015,.02,.32,4),new $({color:s[a%2],roughness:1}));l.position.set((r(a)-.5)*.5,.16,(r(a+13)-.5)*.5),i.add(l);const c=new R(new oe(.05,5,4),new $({color:o[(a+e)%o.length],roughness:.9}));c.position.set(l.position.x,.34,l.position.z),i.add(c)}return i.position.copy(n),i.scale.setScalar(t),i}function Iv(n){const t=new Tt;t.position.copy(n);const e=new $({color:4864550,roughness:.6,metalness:.5}),i=new R(new Rt(.24,.2,.72,10),e);i.position.y=.36,i.castShadow=!0,t.add(i);const s=new R(new Rt(.27,.27,.05,10),e);return s.position.y=.75,t.add(s),t}function Dv(){const n=new Tt,t=new $({color:10127994,roughness:.95,flatShading:!0}),e=new R(new oe(.11,8,6),t);e.scale.set(1,.8,1.4),e.position.y=.12,n.add(e);const i=new R(new oe(.055,8,6),t);i.position.set(0,.22,.1),n.add(i);const s=new R(new an(.02,.05,4),t);return s.rotation.x=Math.PI/2,s.position.set(0,.22,.16),n.add(s),n.rotation.y=Math.random()*Math.PI*2,n.userData={body:e},n}function Hn(n,t=4.6,e=3.2){const i=new R(new Jt(t,e),new Fe({map:Cn(.35,"rgba(90,70,42,0.34)"),transparent:!0,depthWrite:!1}));return i.rotation.x=-Math.PI/2,i.position.set(n.x,.02,n.z),i}function Uv(n,t=0,e=["PUBLICITÉ","URBAINE"]){const i=new Tt;i.position.copy(n),i.rotation.y=t;const s=new $({color:15392706,roughness:.85}),o=new $({color:10850152,roughness:.7,metalness:.15}),r=new R(new Rt(.62,.68,2.5,18),s);r.position.y=1.25,r.castShadow=!0,i.add(r);const a=new R(new Rt(.72,.8,.22,18),o);a.position.y=.11,i.add(a);const l=new R(new Rt(.66,.72,.16,18),o);l.position.y=2.58,i.add(l);const c=new R(new oe(.2,10,8),o);c.position.y=2.75,i.add(c);const u=236,d=640,h=document.createElement("canvas");h.width=u,h.height=d;const f=h.getContext("2d"),m=f.createLinearGradient(0,0,0,d);m.addColorStop(0,"#f5ecd6"),m.addColorStop(1,"#ead9b4"),f.fillStyle=m,f.fillRect(0,0,u,d),f.strokeStyle="rgba(138,111,69,0.5)",f.lineWidth=10,f.strokeRect(10,10,u-20,d-20),f.fillStyle="#c08a68",f.fillRect(0,d*.14,u,14),f.textAlign="center",f.fillStyle="#3a2e1f",f.font="700 34px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",e.forEach((p,S)=>f.fillText(p,u/2,d*.3+S*56)),f.fillStyle="#8a6a4e",f.font="400 26px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",f.fillText("DOMAINE PUBLIC",u/2,d*.78);const v=new tn(h);v.colorSpace=ye,v.anisotropy=Ue?2:8;const g=new R(new Jt(.92,2.5),new $e({map:v}));return g.material.emissive=new _t(15524552),g.material.emissiveIntensity=0,g.position.set(0,1.25,.55),i.add(g),i.userData={body:r,poster:g},i}function Nv(n,t=1){const e=new Tt;e.position.copy(n),e.rotation.y=t>0?0:Math.PI;const i=new $({color:4864550,roughness:.6,metalness:.45}),s=new $({color:12100725,roughness:.7,metalness:.2});for(const p of[-1.7,1.7]){const S=new R(new ft(.12,2.3,.12),i);S.position.set(p,1.15,.4),S.castShadow=!0,e.add(S)}const o=new R(new ft(4.2,.1,1.7),s);o.position.y=2.4,o.castShadow=!0,e.add(o);const r=new $({color:11060425,roughness:.1,metalness:.2,transparent:!0,opacity:.35}),a=new R(new Jt(3.4,1.5),r);a.position.set(0,1.5,-.42),e.add(a);const l=new R(new Jt(1.3,1.5),r);l.position.set(1.9,1.5,0),l.rotation.y=Math.PI/2,e.add(l);const c=340,u=140,d=document.createElement("canvas");d.width=c,d.height=u;const h=d.getContext("2d");h.fillStyle="#f2e7cd",h.fillRect(0,0,c,u),h.fillStyle="#cfa574",h.fillRect(0,0,c,30),h.textAlign="center",h.fillStyle="#3a2e1f",h.font="700 24px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",h.fillText("VOTRE ESPACE PUBLICITAIRE",c/2,72),h.font="400 15px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",h.fillStyle="#7a5f38",h.fillText("MODULE 1 · PANNEAUTIQUE",c/2,104);const f=new tn(d);f.colorSpace=ye,f.anisotropy=Ue?2:8;const m=new R(new Jt(3.4,1.4),new $e({map:f}));m.material.emissive=new _t(15524552),m.material.emissiveIntensity=0,m.position.set(0,1.45,.42),e.add(m),e.userData={poster:m};const v=new $({color:9071429,roughness:.85}),g=new R(new ft(2.6,.07,.35),v);return g.position.set(0,.42,-.1),e.add(g),e}function zv(n,t=13215868,e=0){const i=new Tt;i.position.copy(n),i.rotation.y=e;const s=new $({color:5916210,roughness:.6,metalness:.4}),o=new $({color:9071429,roughness:.8}),r=new R(new Rt(.04,.06,.75,8),s);r.position.y=.38,i.add(r);const a=new R(new Rt(.42,.42,.06,14),o);a.position.y=.76,i.add(a);const l=new R(new Rt(.03,.03,1.5,8),s);l.position.y=1.1,i.add(l);const c=new R(new an(1.1,.28,10),new $e({color:t}));c.position.y=1.95,i.add(c);for(const[u,d]of[[-.5,.5],[.5,.5],[-.5,-.5],[.5,-.5]]){const h=new R(new ft(.4,.1,.4),o);h.position.set(u,.42,d),i.add(h);const f=new R(new Rt(.025,.025,.42,6),s);f.position.set(u,.21,d),i.add(f)}return i.userData={parasol:c},i}function Fv(n,t=0){const e=new Tt;e.position.copy(n),e.rotation.y=t;const i=new $({color:9071182,roughness:.6,metalness:.2}),s=new $({color:3813154,roughness:.95}),o=.34;for(const u of[-.35,.35]){const d=new R(new Yn(o,.035,8,20),s);d.position.set(0,o,u),e.add(d)}const r=new R(new ft(.03,.03,.72),i);r.position.set(0,.66,0),e.add(r);const a=new R(new Rt(.02,.02,.62,6),i);a.position.set(0,.82,0),a.rotation.x=Math.PI/2,e.add(a);const l=new R(new Rt(.02,.02,.34,6),i);l.position.set(0,.98,.35),e.add(l);const c=new R(new ft(.14,.03,.08),i);return c.position.set(0,.84,-.32),e.add(c),e}function Ov(n,t=0,e="D"){const i=new Tt;i.position.copy(n),i.rotation.y=t;const s=new $({color:4864550,roughness:.6,metalness:.4}),o=new R(new Rt(.03,.05,1.8,8),s);o.position.y=.9,o.castShadow=!0,i.add(o);const r=document.createElement("canvas");r.width=128,r.height=64;const a=r.getContext("2d");a.fillStyle="#e3d6b4",a.fillRect(0,0,128,64),a.fillStyle=e==="D"?"#c08a68":"#7d9a68",a.fillRect(0,0,26,64),a.strokeStyle="rgba(138,111,69,0.6)",a.lineWidth=4,a.strokeRect(2,2,124,60),a.textAlign="center",a.fillStyle="#3a2e1f",a.font="700 26px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",a.fillText(e,76,42);const l=new tn(r);l.colorSpace=ye,l.anisotropy=Ue?2:8;const c=new R(new Jt(.7,.35),new $e({map:l}));return c.position.y=1.9,i.add(c),i}function Bv(n,t=1.8,e=.6){const i=new Tt;i.position.copy(n);const s=new $({color:6257226,roughness:1,flatShading:!0}),o=new R(new ft(t,e,.5),s);o.position.y=e/2,o.castShadow=!0,i.add(o);const r=Math.max(2,Math.round(t/.7));for(let a=0;a<r;a++){const l=new R(new ss(.3,1),s);l.position.set(-t/2+.3+a*(t-.6)/(r-1),e+.18,0),i.add(l)}return i}const kv=[14266508,13146738,11567964,9068616,14727320].map(n=>new $({color:n,roughness:.85})),Gv=[3023896,4863524,8215604,13215864,2236446].map(n=>new $({color:n,roughness:.9})),Hv=[13215868,9415293,13608308,11052232,10336447,13805176,14726304,12108960].map(n=>new $({color:n,roughness:.85})),Vv=[4865070,6048314,4146772,6969924,5588028].map(n=>new $({color:n,roughness:.9})),Wv=new $({color:3023896,roughness:.8}),lu=new $({color:13610612,roughness:.9}),lr=n=>n[Math.random()*n.length|0];function qv(){const n=new Tt,t=.92+Math.random()*.18,e=.85+Math.random()*.32,i=lr(kv),s=lr(Gv),o=lr(Hv),r=lr(Vv),a=Wv,l=Math.random()<.22,c=Math.random()<.14,u=Math.random()<.16,d=.9*t,h=.105*e,f=y=>{const x=new Tt;x.position.set(y,d,0);const L=new R(new Rt(.064,.05,.46*t,8),r);L.position.y=-.23*t,L.castShadow=!0,x.add(L);const B=new Tt;B.position.y=-.46*t;const k=new R(new Rt(.05,.04,.44*t,8),r);k.position.y=-.22*t,B.add(k);const nt=new R(new ft(.09,.07,.17),a);return nt.position.set(0,-.44*t,.045),B.add(nt),x.add(B),{leg:x,knee:B}},m=f(-h),v=f(h);n.add(m.leg,v.leg);const g=new Tt;if(n.add(g),l){const y=new R(new an(.21*e,.34,12),o);y.position.y=.78*t,y.castShadow=!0,g.add(y)}const p=new R(new Rt(.175*e,.215*e,.54*t,12),o);p.position.y=1.2*t,p.castShadow=!0,g.add(p);const S=o;for(const y of[-.19*e,.19*e]){const x=new R(new oe(.075*e,8,6),S);x.position.set(y,1.42*t,0),g.add(x)}if(u){const y=new R(new ft(.15,.17,.06),r);y.position.set(.3*e,1.16*t,0),y.rotation.z=.18,g.add(y);const x=new R(new ft(.02,.3,.02),r);x.position.set(.26*e,1.32*t,0),x.rotation.z=.4,g.add(x)}const w=new R(new Rt(.045,.055,.12,8),i);w.position.y=1.5*t,g.add(w);const M=new R(new oe(.135,12,10),i);M.position.y=1.64*t,M.castShadow=!0,g.add(M);const E=new R(new oe(.15,10,8),s);if(E.position.set(0,1.66*t,-.02),E.scale.set(1,.78,1.06),g.add(E),c){const y=new R(new Rt(.19,.2,.03,12),lu);y.position.y=1.74*t,g.add(y);const x=new R(new oe(.1,10,8),lu);x.position.y=1.78*t,x.scale.set(1,.85,1),g.add(x)}const P=y=>{const x=new Tt;x.position.set(y,1.4*t,0);const L=new R(new Rt(.055,.062,.26,8),o);L.position.y=-.13,L.castShadow=!0,x.add(L);const B=new Tt;B.position.y=-.26;const k=new R(new Rt(.042,.05,.24,8),i);k.position.y=-.12,B.add(k);const nt=new R(new oe(.05,8,6),i);return nt.position.y=-.24,B.add(nt),x.add(B),{arm:x,elbow:B}},I=P(-.235*e),N=P(.235*e);return g.add(I.arm,N.arm),{g:n,legL:m.leg,legR:v.leg,kneeL:m.knee,kneeR:v.knee,armL:I.arm,armR:N.arm,elbowL:I.elbow,elbowR:N.elbow,lean:g,phase:Math.random()*Math.PI*2}}function Xv(){const n=new Tt,t=new $({color:13219985,roughness:.9}),e=new $({color:11048556,roughness:.9}),i=new $({color:11060425,roughness:.1,metalness:.2,transparent:!0,opacity:.75}),s=new R(new Rt(1.7,1.9,.5,20),t);s.position.y=.25,s.castShadow=!0,n.add(s);const o=new R(new Yn(1.8,.14,8,24),e);o.rotation.x=Math.PI/2,o.position.y=.5,n.add(o);const r=new R(new $n(1.62,20),i);r.rotation.x=-Math.PI/2,r.position.y=.31,n.add(r);const a=new R(new Rt(.16,.22,.8,10),e);a.position.y=.9,n.add(a);const l=new R(new Rt(.55,.35,.14,12),e);l.position.y=1.25,n.add(l);const c=new R(new Rt(.05,.05,.55,8),i);return c.position.y=1.6,n.add(c),n.userData={jet:c,pool:r,dish:l},n}function Yv(n,t=0,e=["ESPACE","PUBLICITAIRE"]){const i=new Tt;i.position.copy(n),i.rotation.y=t;const s=new $({color:7035458,roughness:.7,metalness:.2}),o=new $({color:15260864,roughness:.85});for(const m of[-2.6,2.6]){const v=new R(new ft(.22,3.4,.22),s);v.position.set(m,1.7,0),v.castShadow=!0,i.add(v);const g=new R(new ft(.6,.12,.6),s);g.position.set(m,.06,0),i.add(g)}const r=new R(new ft(5.6,3.1,.14),o);r.position.y=3.6,r.castShadow=!0,i.add(r);const a=Ue?320:640,l=Math.round(a*(2.8/5.3)),c=document.createElement("canvas");c.width=a,c.height=l;const u=c.getContext("2d"),d=u.createLinearGradient(0,0,0,l);d.addColorStop(0,"#f3e8cd"),d.addColorStop(1,"#e6d3a9"),u.fillStyle=d,u.fillRect(0,0,a,l),u.fillStyle="#c08a68",u.fillRect(0,0,a,l*.22),u.textAlign="center",u.fillStyle="#3a2e1f",u.font="700 "+l*.11+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",e.forEach((m,v)=>u.fillText(m,a/2,l*.42+v*(l*.16))),u.fillStyle="#7a5f38",u.font="400 "+l*.06+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",u.fillText("PANNEAUTIQUE · DOMAINE PUBLIC",a/2,l*.86);const h=new tn(c);h.colorSpace=ye,h.anisotropy=Ue?2:8;const f=new R(new Jt(5.3,2.8),new $({map:h,emissive:16767392,emissiveMap:h,emissiveIntensity:0}));return f.position.set(0,3.6,.09),i.add(f),i.userData={face:f},i}function $v(n,t=0){const e=new Tt;e.position.copy(n),e.rotation.y=t;const i=new $({color:9071429,roughness:.85}),s=new $({color:6048304,roughness:.5,metalness:.4}),o=new R(new ft(1.9,2.2,1.5),i);o.position.y=1.1,o.castShadow=!0,e.add(o);const r=new R(new ft(2.4,.14,2),s);r.position.y=2.27,e.add(r);const a=new R(new Jt(.34,.2),new $e({color:13608308,side:Oe}));a.position.set(1.05,2.42,.55),a.rotation.y=Math.PI/2,e.add(a);const l=new R(new ft(1.9,.5,.25),s);l.position.set(0,.9,.82),e.add(l);const c=new R(new ft(2.2,.06,.7),new $({color:12618344,roughness:.9}));c.position.set(0,1.65,.85),e.add(c);const u=document.createElement("canvas");u.width=128,u.height=91;const d=u.getContext("2d");d.fillStyle="#f2e7cd",d.fillRect(0,0,128,91),d.strokeStyle="rgba(138,111,69,0.6)",d.lineWidth=4,d.strokeRect(4,4,120,83),d.textAlign="center",d.fillStyle="#3a2e1f",d.font="700 18px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",d.fillText("LE QUOTIDIEN",64,40),d.font="400 14px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",d.fillStyle="#7a5f38",d.fillText("0,50 €",64,64);const h=new tn(u);h.colorSpace=ye,h.anisotropy=Ue?2:8;const f=new R(new Jt(.7,.5),new $({map:h,emissive:16767392,emissiveMap:h,emissiveIntensity:0}));return f.position.set(0,1.35,.82),e.add(f),e.userData={flag:a,sign:f},e}function cu(n,t=0,e=13209450){const i=new Tt;i.position.copy(n),i.rotation.y=t;const s=new $({color:9071429,roughness:.85});for(const f of[-1,1]){const m=new R(new ft(.08,1,.08),s);m.position.set(f,.5,0),m.castShadow=!0,i.add(m)}const o=new R(new ft(2,.12,.8),s);o.position.y=.97,i.add(o);const r=new R(new ft(2.2,.06,.9),s);r.position.y=1.03,i.add(r);const a=[12606026,13608308,8231528,9083576,13805176];for(let f=0;f<5;f++){const m=new R(new oe(.09,8,6),new $({color:a[f%a.length],roughness:.7}));m.position.set(-.8+f*.4,1.12,0),m.scale.y=.85,i.add(m)}const l=dd(2.4,.9,e);l.position.set(0,2.1,.3),i.add(l);const c=document.createElement("canvas");c.width=256,c.height=98;const u=c.getContext("2d");u.fillStyle="#f7eeda",u.fillRect(0,0,256,98),u.strokeStyle="rgba(138,111,69,0.6)",u.lineWidth=6,u.strokeRect(4,4,248,90),u.fillStyle="#3a2e1f",u.textAlign="center",u.font="700 34px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",u.fillText("MARCHÉ",128,60);const d=new tn(c);d.colorSpace=ye;const h=new R(new Jt(1.3,.5),new $({map:d,emissive:16767392,emissiveMap:d,emissiveIntensity:0}));return h.position.set(0,2.32,.05),i.add(h),i.userData={sign:h,awning:l},i}function Zv(){const n=[9415293,7045971,13215868,13805176],t=new Tt,e=new R(new Jt(.16,.1),new $e({color:n[Math.random()*n.length|0],side:Oe,transparent:!0,opacity:.72}));return t.add(e),t}function Kv(n,t,e=[12618344,13608308,10336383,9083576,13805176],i=10,s=.7){const o=new Tt,r=new b().addVectors(n,t).multiplyScalar(.5);o.position.copy(r);const a=new b().subVectors(t,n),l=e.map(m=>new $e({color:m,side:Oe})),c=new Jt(.42,.3),u=Math.atan2(a.x,a.z),d=[],h=i*2;for(let m=0;m<=h;m++){const v=m/h,g=Ke.lerp(n.x,t.x,v)-r.x,p=Ke.lerp(n.y,t.y,v)-s*Math.sin(Math.PI*v)-r.y,S=Ke.lerp(n.z,t.z,v)-r.z;if(d.push(new b(g,p,S)),m%2===0){const w=new R(c,l[m/2%l.length]);w.position.set(g,p-.15,S),w.rotation.y=u,o.add(w)}}const f=new zl(new Pe().setFromPoints(d),new Ir({color:9071182}));return o.add(f),o}function dd(n,t,e){const o=document.createElement("canvas");o.width=256,o.height=128;const r=o.getContext("2d"),a="#"+e.toString(16).padStart(6,"0"),l=8;for(let m=0;m<l;m++)r.fillStyle=m%2===0?a:"#f7eeda",r.fillRect(m*(256/l),0,256/l,128);const c=new tn(o);c.colorSpace=ye,c.anisotropy=Ue?1:4;const u=new $e({map:c,side:Oe}),d=new Tt,h=new R(new Jt(n,t),u);h.rotation.x=-.5,h.position.set(0,.15,.45),d.add(h);const f=new R(new Jt(n,.2),u);return f.position.set(0,.1,t*.85),f.rotation.x=-.15,d.add(f),d}function jv(n,t=0,e=13209450,i="BOUTIQUE"){const s=new Tt;s.position.copy(n),s.rotation.y=t;const o=5,r=3.3,a=2.8,l=new $e({color:15129019}),c=new R(new ft(o,r,a),l);c.position.y=r/2,c.castShadow=!0,s.add(c);const u=new R(new ft(o+.24,.2,a+.24),l);u.position.y=r+.1,s.add(u);const d=Ue?256:512,h=Math.round(d*(r*.6)/(o*.8)),f=document.createElement("canvas");f.width=d,f.height=h;const m=f.getContext("2d");m.scale(d/512,h/253);const v=m.createLinearGradient(0,0,0,253);v.addColorStop(0,"#f2e6c9"),v.addColorStop(1,"#dccaa3"),m.fillStyle=v,m.fillRect(0,0,512,253);const g=["#c08a68","#7d9a68","#cfa574"];for(let E=0;E<3;E++){const P=30+E*160;m.fillStyle="rgba(122,95,56,0.5)",m.fillRect(P,152,120,8),m.fillStyle=g[E];for(let I=0;I<4;I++)m.beginPath(),m.arc(P+22+I*26,141,9,0,Math.PI*2),m.fill()}m.fillStyle="rgba(255,255,255,0.2)",m.beginPath(),m.moveTo(300,0),m.lineTo(430,0),m.lineTo(230,253),m.lineTo(100,253),m.closePath(),m.fill(),m.strokeStyle="#8a6a4e",m.lineWidth=12,m.strokeRect(6,6,500,241),m.fillStyle="#3a2e1f",m.font="700 36px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",m.textAlign="center",m.fillText(i,256,44);const p=new tn(f);p.colorSpace=ye,p.anisotropy=Ue?2:8;const S=new $({map:p,emissive:16767392,emissiveMap:p,emissiveIntensity:0}),w=new R(new Jt(o*.8,r*.6),S);w.position.set(0,r*.52,a/2+.03),s.add(w);const M=dd(o*.84,.9,e);return M.position.set(0,r-.55,a/2-.2),s.add(M),s.userData={window:w,awning:M},s}function Jv(){const n=new Tt,t=new $({color:12618344,roughness:.5,metalness:.25});new $({color:4864550,roughness:.5,metalness:.3});const e=new $({color:9416888,roughness:.15,metalness:.5}),i=new R(new ft(2,1.3,5.6),t);i.position.y=1.15,i.castShadow=!0,n.add(i);const s=new R(new ft(1.8,.16,5.4),t);s.position.y=1.9,n.add(s);const o=new R(new ft(1.72,.52,5.2),e);o.position.y=1.56,n.add(o);const r=new R(new ft(1.8,.5,.06),e);r.position.set(0,1.5,2.8),n.add(r);const a=new $({color:3023896,roughness:.9});for(const[u,d]of[[-.95,1.7],[.95,1.7],[-.95,-1.7],[.95,-1.7]]){const h=new R(new Rt(.36,.36,.26,14),a);h.rotation.x=Math.PI/2,h.rotation.z=Math.PI/2,h.position.set(u,.36,d),n.add(h)}const l=new $({color:16773839,emissive:16769184,emissiveIntensity:.5});for(const u of[-.7,.7]){const d=new R(new oe(.1,8,8),l);d.position.set(u,1.05,2.82),n.add(d)}const c=new Xn(new On({map:Cn(0,"rgba(255,226,175,0.4)"),transparent:!0,blending:He,depthWrite:!1,depthTest:!1}));return c.scale.set(4.2,4.2,1),c.position.set(0,1.1,4.6),n.add(c),{group:n,cone:c,body:i}}function Qv(){const n=new Tt,t=new $e({color:12159582}),e=new $e({color:9069120}),i=new R(new ft(.3,.22,.55),t);i.position.y=.24,i.castShadow=!0,n.add(i);const s=new R(new ft(.16,.15,.18),t);s.position.set(0,.36,.33),n.add(s);const o=new R(new ft(.04,.09,.11),e);o.position.set(0,.45,.34),n.add(o);const r=new R(new ft(.05,.05,.2),t);r.position.set(0,.36,-.37),n.add(r);for(const[a,l]of[[-.11,.18],[.11,.18],[-.11,-.18],[.11,-.18]]){const c=new R(new ft(.06,.18,.06),t);c.position.set(a,.09,l),n.add(c)}return n.userData={tail:r},n}function t_(n){const t=new Tt;t.position.copy(n);const e=new R(new Rt(.025,.025,1.1,6),new $({color:9071182,roughness:.8}));e.position.y=.55,t.add(e);const i=[12606026,13608308,8231528],s=[];for(let o=0;o<3;o++){const r=new R(new oe(.21,10,8),new $e({color:i[o],emissive:i[o],emissiveIntensity:.08}));r.position.set((o-1)*.22,1.2+Math.sin(o*2.1)*.05,o%2*.12-.06),r.scale.set(1,1.2,1),t.add(r),s.push(r)}return t.userData={balloons:s},t}function e_(n,t=0){const e=new Tt;e.position.copy(n),e.rotation.y=t;const i=new $({color:3025446,roughness:.5,metalness:.5}),s=new R(new Rt(.045,.07,3.4,8),i);s.position.y=1.7,s.castShadow=!0,e.add(s);const o=new $({color:3816770,roughness:.6,metalness:.3}),r=new R(new ft(.32,.9,.26),o);r.position.y=2.9,e.add(r);const a=[{c:13193026,y:3.24,on:.9},{c:14723130,y:2.9,on:.2},{c:6265944,y:2.56,on:.2}],l=[];a.forEach(d=>{const h=new R(new oe(.095,10,8),new $({color:1711136,emissive:d.c,emissiveIntensity:d.on,roughness:.4}));h.position.set(0,d.y,.14),e.add(h),l.push(h)});const c=new R(new ft(.17,.55,.14),o);c.position.set(0,1.15,0),e.add(c);const u=[];for(const[d,h]of[[13193026,1.32],[6265944,1.05]]){const f=new R(new oe(.05,8,6),new $({color:1711136,emissive:d,emissiveIntensity:.7,roughness:.4}));f.position.set(0,h,.08),e.add(f),u.push(f)}return e.userData={bulbs:l,peds:u},e}function n_(n){const t=new Tt;t.position.copy(n);const e=new $({color:14932410,roughness:.7,metalness:.2}),i=new R(new Rt(.09,.11,.5,8),e);i.position.y=.25,i.castShadow=!0,t.add(i);const s=new R(new oe(.09,8,6),e);return s.position.y=.51,t.add(s),t}function i_(n){const t=new Tt;t.position.copy(n);const e=new $({color:11882556,roughness:.6,metalness:.35}),i=new R(new Rt(.1,.13,.52,10),e);i.position.y=.26,i.castShadow=!0,t.add(i);const s=new R(new oe(.1,10,8),e);s.position.y=.55,t.add(s);for(const o of[0,Math.PI/2,Math.PI,3*Math.PI/2]){const r=new R(new Rt(.055,.055,.07,8),e);r.position.set(Math.cos(o)*.13,.38,Math.sin(o)*.13),r.rotation.z=Math.PI/2,r.rotation.y=o,t.add(r)}return t}function s_(n){const t=new Tt;t.position.copy(n);const e=new $({color:6978964,roughness:.6,metalness:.4}),i=new R(new Rt(.03,.045,1.15,8),e);i.position.y=.58,i.castShadow=!0,t.add(i);const s=new R(new ft(.32,.42,.17),e);s.position.y=1.02,s.castShadow=!0,t.add(s);const o=new R(new ft(.22,.045,.02),new $({color:1711136,roughness:.7}));return o.position.set(0,1.2,.095),t.add(o),t}function o_(n,t=0,e=["ESPACE","PUBLICITAIRE"]){const i=new Tt;i.position.copy(n),i.rotation.y=t;const s=new $({color:3814187,roughness:.55,metalness:.5}),o=new R(new Rt(.42,.5,.1,10),s);o.position.y=.05,i.add(o);const r=new R(new Rt(.06,.08,1,8),s);r.position.y=.6,r.castShadow=!0,i.add(r);const a=270,l=400,c=document.createElement("canvas");c.width=a,c.height=l;const u=c.getContext("2d"),d=u.createLinearGradient(0,0,0,l);d.addColorStop(0,"#fbf4e0"),d.addColorStop(1,"#efdfba"),u.fillStyle=d,u.fillRect(0,0,a,l),u.strokeStyle="rgba(138,111,69,0.55)",u.lineWidth=10,u.strokeRect(10,10,a-20,l-20),u.fillStyle="#c08a68",u.fillRect(0,0,a,36),u.textAlign="center",u.fillStyle="#3a2e1f",u.font="700 40px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",e.forEach((g,p)=>u.fillText(g,a/2,172+p*58)),u.fillStyle="#8a6a4e",u.font="400 22px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",u.fillText("DOMAINE PUBLIC",a/2,l-34);const h=new tn(c);h.colorSpace=ye,h.anisotropy=Ue?2:8;const f=new $e({map:h});f.emissive=new _t(15524552),f.emissiveIntensity=0;const m=new R(new Jt(1.35,2),f);m.position.set(0,1.95,.02),i.add(m);const v=m.clone();return v.position.z=-.02,v.rotation.y=Math.PI,i.add(v),i.userData={front:m},i}function r_(n,t=1){const e=new Tt;e.position.copy(n),e.scale.setScalar(t);const i=new $({color:12035198,roughness:.9}),s=new R(new ft(1,.48,1),i);s.position.y=.24,s.castShadow=!0,e.add(s);const o=new R(new ft(1.08,.08,1.08),i);o.position.y=.48,e.add(o);const r=new R(new ft(.92,.06,.92),new $({color:4338986,roughness:1}));r.position.y=.51,e.add(r);const a=new $({color:7031340,roughness:.95,flatShading:!0}),l=new R(new Rt(.09,.13,2.2,7),a);l.position.y=1.55,l.castShadow=!0,e.add(l);const c=new $({color:5599295,roughness:1,flatShading:!0});for(let u=0;u<3;u++){const d=new R(new oe(1-u*.16,8,6),c);d.position.set((Math.random()-.5)*.4,2.55+u*.55,(Math.random()-.5)*.4),d.scale.y=.85,d.castShadow=!0,e.add(d)}return e}function a_(n,t=0){const e=new Pe,i=new Float32Array([0,-1,0,-.55,-.35,0,.55,-.35,0,0,-1,0,.55,-.35,0,.26,.9,0,0,-1,0,.26,.9,0,-.26,.9,0,0,-1,0,-.26,.9,0,-.55,-.35,0]);e.setAttribute("position",new Be(i,3)),e.computeVertexNormals();const s=new R(e,new Fe({color:15789280,side:Oe}));s.rotation.x=-Math.PI/2;const o=new Tt;return o.add(s),o.rotation.y=t,o.position.set(n.x,.05,n.z),o}function l_(n,t=1){const e=new Tt,i=new $({color:5913892,roughness:.95,flatShading:!0}),s=new R(new Rt(.09,.14,1.3,7),i);s.position.y=.65,s.castShadow=!0,e.add(s);const o=new $({color:4151862,roughness:1,flatShading:!0}),r=4;for(let l=0;l<r;l++){const c=new R(new an(1.05-l*.18,.85,8),o);c.position.y=1.1+l*.62,c.castShadow=!0,e.add(c)}const a=new R(new an(.14,.42,6),o);return a.position.y=3.7,e.add(a),e.position.copy(n),e.scale.setScalar(t),e}function uu(n,t=0,e=0){const i=new Tt;if(i.position.copy(n),i.rotation.y=e,t===0){const s=new $({color:3948356,roughness:.85,metalness:.35}),o=new R(new Rt(.42,.42,.05,20),s);o.position.y=.06,i.add(o);const r=new R(new $n(.3,20),new $({color:2895411,roughness:.9}));r.rotation.x=-Math.PI/2,r.position.y=.09,i.add(r);for(let a=0;a<3;a++){const l=new R(new ft(.52,.02,.035),s);l.position.set(0,.105,-.2+a*.2),i.add(l)}}else{const s=new $({color:3093046,roughness:.8,metalness:.4}),o=new R(new ft(.9,.04,.5),s);o.position.y=.06,i.add(o);for(let r=0;r<5;r++){const a=new R(new ft(.7,.03,.05),s);a.position.set(0,.075,-.17+r*.085),i.add(a)}}return i}function du(n){const t=new Tt;t.position.copy(n);const e=new $({color:5916210,roughness:.9,flatShading:!0}),i=new R(new Rt(.09,.13,7.2,8),e);i.position.y=3.6,i.castShadow=!0,t.add(i);const s=new R(new ft(2.6,.09,.09),e);s.position.y=6.3,t.add(s);const o=new $({color:9083498,roughness:.6,metalness:.2});for(const a of[-1.15,1.15]){const l=new R(new Rt(.05,.07,.14,6),o);l.position.set(a,6.4,0),t.add(l)}const r=new R(new an(.12,.3,6),e);return r.position.y=7.32,t.add(r),t}function hu(n,t,e=.8){const i=[];for(let r=0;r<=24;r++){const a=r/24;i.push(new b(n.x+(t.x-n.x)*a,n.y+(t.y-n.y)*a+Math.sin(a*Math.PI)*-e,n.z+(t.z-n.z)*a))}const o=new pn(i);return new R(new ks(o,24,.015,5,!1),new Fe({color:2893344}))}function c_(n){const t=new Tt;t.position.copy(n);const e=new $({color:14248509,roughness:.8}),i=new R(new an(.16,.5,10),e);i.position.y=.25,i.castShadow=!0,t.add(i);const s=new $({color:15920352,roughness:.7}),o=new R(new Rt(.105,.115,.09,10),s);o.position.y=.2,t.add(o);const r=new R(new ft(.3,.04,.3),e);return r.position.y=.02,t.add(r),t}function u_(n,t){const e=window.innerWidth<=760;vv(e);const i=C=>e?Math.max(2,Math.round(C*.55)):C,s=new Ul({canvas:n,antialias:!e,alpha:!1});s.setPixelRatio(Math.min(window.devicePixelRatio,e?1.75:1.5)),s.setSize(window.innerWidth,window.innerHeight),s.toneMapping=wo,s.toneMappingExposure=1.25,s.shadowMap.enabled=!e,s.shadowMap.type=Ml;const o=new Nl;o.fog=new Li(ie.skyHorizon,60,760);const r=new Ie(e?62:52,window.innerWidth/window.innerHeight,.1,900);let a=null,l=null;ns()||(a=new hv(s),a.addPass(new fv(o,r)),l=new Gs(new Et(Math.max(2,Math.floor(window.innerWidth/2)),Math.max(2,Math.floor(window.innerHeight/2))),.35,.6,.8),a.addPass(l),a.addPass(new gv));const c=[{h:4,night:1,top:725536,mid:1385016,hor:3227998,amb:6253452,hs:4412282,hg:2305088,sun:10335448,fog:3227998,sunI:.3,exp:1.5,warm:0},{h:5.2,night:.85,top:1713208,mid:2766160,hor:4868702,amb:6975116,hs:4740218,hg:2501694,sun:11056336,fog:3818848,sunI:.5,exp:1.45,warm:.15},{h:6.2,night:.25,top:9084096,mid:14266506,hor:15909e3,amb:10127986,hs:15255712,hg:9071184,sun:16763e3,fog:14201994,sunI:1.4,exp:1.2,warm:.9},{h:7.5,night:.05,top:10466512,mid:14866104,hor:15919312,amb:11313280,hs:15787212,hg:11049592,sun:16769712,fog:15787216,sunI:1.9,exp:1.18,warm:.45},{h:10,night:0,top:10532562,mid:15261120,hor:16182998,amb:11772544,hs:15918796,hg:12101246,sun:16772552,fog:16116950,sunI:2.2,exp:1.15,warm:0},{h:14,night:0,top:10467023,mid:15261120,hor:16182998,amb:11772544,hs:15918796,hg:12101246,sun:16772294,fog:16116950,sunI:2.2,exp:1.12,warm:0},{h:17,night:0,top:9676488,mid:14996140,hor:15785916,amb:11050112,hs:15654850,hg:11575420,sun:16768424,fog:15260864,sunI:1.9,exp:1.18,warm:.2},{h:18.4,night:.1,top:8030900,mid:14262378,hor:15769690,amb:9337448,hs:14723704,hg:8019014,sun:16756320,fog:14195816,sunI:1.3,exp:1.25,warm:1},{h:19.4,night:.55,top:3817568,mid:8017e3,hor:10512474,amb:6970488,hs:6968436,hg:3420234,sun:14196848,fog:7623784,sunI:.6,exp:1.35,warm:.7},{h:20.5,night:.85,top:1317936,mid:2371658,hor:3818592,amb:5923966,hs:3950704,hg:1975348,sun:10335448,fog:3424348,sunI:.35,exp:1.45,warm:.15},{h:22,night:1,top:725536,mid:1385016,hor:3227998,amb:6253452,hs:4412282,hg:2305088,sun:10335448,fog:3227998,sunI:.3,exp:1.5,warm:0},{h:24,night:1,top:725536,mid:1385016,hor:3227998,amb:6253452,hs:4412282,hg:2305088,sun:10335448,fog:3227998,sunI:.3,exp:1.5,warm:0}].map(C=>({...C,top:new _t(C.top),mid:new _t(C.mid),hor:new _t(C.hor),amb:new _t(C.amb),hs:new _t(C.hs),hg:new _t(C.hg),sun:new _t(C.sun),fog:new _t(C.fog)}));let u="auto",d=null;function h(){if(d!==null)return d;if(u==="day")return 13;if(u==="night")return 1.5;const C=new Date;return C.getHours()+C.getMinutes()/60+C.getSeconds()/3600}const f={top:new _t,mid:new _t,hor:new _t,amb:new _t,hs:new _t,hg:new _t,sun:new _t,fog:new _t,night:0,warm:0,sunI:1,exp:1.25},m={top:new _t,mid:new _t,hor:new _t,amb:new _t,hs:new _t,hg:new _t,sun:new _t,fog:new _t,night:0,warm:0,sunI:1,exp:1.25};function v(C){let F=c[c.length-2],D=c[c.length-1],O=!1;for(let it=0;it<c.length-1;it++)if(C>=c[it].h&&C<c[it+1].h){F=c[it],D=c[it+1],O=!1;break}C<c[0].h&&(F=c[c.length-1],D=c[0],O=!0);let W=O?(C+24-F.h)/(D.h+24-F.h):(C-F.h)/Math.max(1e-6,D.h-F.h);W=W<0?0:W>1?1:W;const Z=W*W*(3-2*W);f.night=F.night+(D.night-F.night)*Z,f.warm=F.warm+(D.warm-F.warm)*Z,f.sunI=F.sunI+(D.sunI-F.sunI)*Z,f.exp=F.exp+(D.exp-F.exp)*Z,f.top.copy(F.top).lerp(D.top,Z),f.mid.copy(F.mid).lerp(D.mid,Z),f.hor.copy(F.hor).lerp(D.hor,Z),f.amb.copy(F.amb).lerp(D.amb,Z),f.hs.copy(F.hs).lerp(D.hs,Z),f.hg.copy(F.hg).lerp(D.hg,Z),f.sun.copy(F.sun).lerp(D.sun,Z),f.fog.copy(F.fog).lerp(D.fog,Z)}v(h()),m.top.copy(f.top),m.mid.copy(f.mid),m.hor.copy(f.hor),m.amb.copy(f.amb),m.hs.copy(f.hs),m.hg.copy(f.hg),m.sun.copy(f.sun),m.fog.copy(f.fog),m.night=f.night,m.warm=f.warm,m.sunI=f.sunI,m.exp=f.exp;const g=new on({side:rn,depthWrite:!1,uniforms:{top:{value:new _t(ie.skyTop)},mid:{value:new _t(ie.skyMid)},horizon:{value:new _t(ie.skyHorizon)},sunDir:{value:new b(0,.16,-1).normalize()},sunColor:{value:new _t(ie.sun)},night:{value:0},topN:{value:new _t(725536)},midN:{value:new _t(1385016)},horN:{value:new _t(3227998)},moonDir:{value:new b(.22,.52,-.83).normalize()},moonColor:{value:new _t(14082804)},warm:{value:0}},vertexShader:`
      varying vec3 vPos;
      void main() { vPos = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
    `,fragmentShader:`
      varying vec3 vPos;
      uniform vec3 top, mid, horizon, sunColor, sunDir, topN, midN, horN, moonDir, moonColor;
      uniform float night;
      uniform float warm;
      float hash(vec3 p) {
        p = fract(p * 0.3183099 + 0.1);
        p *= 17.0;
        return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
      }
      void main() {
        vec3 dir = normalize(vPos);
        float h = clamp(dir.y, 0.0, 1.0);
        // Jour : base dégradée + bande chaude juste au-dessus de l'horizon
        vec3 col = mix(horizon, mid, smoothstep(0.0, 0.12, h));
        col = mix(col, top, smoothstep(0.12, 0.5, h));
        // Aube / crépuscule : la bande chaude s'intensifie près du soleil bas
        float sunset = smoothstep(0.0, 0.05, h) * (1.0 - smoothstep(0.05, 0.16, h));
        col += vec3(0.98, 0.72, 0.42) * sunset * (0.22 + warm * 0.85);
        // Halo doré autour du soleil couchant
        float warmGlow = pow(max(dot(dir, sunDir), 0.0), 5.0);
        col += vec3(1.0, 0.55, 0.25) * warmGlow * warm * 0.28;
        // Nuit : base dégradée bleutée + voile de voie lactée discret
        vec3 colN = mix(horN, midN, smoothstep(0.0, 0.12, h));
        colN = mix(colN, topN, smoothstep(0.12, 0.5, h));
        colN += vec3(0.28, 0.34, 0.5) * smoothstep(0.1, 0.4, h) * 0.05;
        col = mix(col, colN, night);
        float sun = pow(max(dot(dir, sunDir), 0.0), 42.0) * 1.5;
        float halo = pow(max(dot(dir, sunDir), 0.0), 7.0) * 0.4;
        col += sunColor * (sun + halo) * (1.0 - night);
        float moon = pow(max(dot(dir, moonDir), 0.0), 300.0) * 1.4;
        float mHalo = pow(max(dot(dir, moonDir), 0.0), 9.0) * 0.4;
        col += moonColor * (moon + mHalo) * night;
        // Étoiles visibles uniquement la nuit : deux couches (blanches + dorées), scintillement
        float starMask = smoothstep(0.14, 0.3, h);
        float s1 = step(0.9982, hash(dir * 1.7));
        float s2 = step(0.9993, hash(dir * 3.1));
        col += vec3(1.0) * s1 * starMask * night * 0.9;
        col += vec3(1.0, 0.9, 0.72) * s2 * starMask * night * 0.7;
        gl_FragColor = vec4(col, 1.0);
      }
    `});o.add(new R(new oe(700,e?24:40,e?12:20),g));const p=new Xn(new On({map:Cn(0,"rgba(244,200,150,0.5)"),transparent:!0,blending:He,depthWrite:!1,depthTest:!1}));p.position.set(42,56,-560),p.scale.setScalar(42),r.add(p);const S=new Xn(new On({map:Cn(0,"rgba(214,226,244,0.5)"),transparent:!0,blending:He,depthWrite:!1,depthTest:!1,opacity:0}));S.position.set(-34,54,-545),S.scale.setScalar(30),r.add(S),o.add(r);const w=new R(new $n(1600,e?32:48),new $({map:ld(),roughness:1,metalness:0}));w.rotation.x=-Math.PI/2,w.position.y=-.02,w.receiveShadow=!0,o.add(w);const M=[new b(0,0,0),new b(7,0,30),new b(-8,0,62),new b(9,0,96),new b(-9,0,132),new b(8,0,168),new b(-7,0,202),new b(6,0,236),new b(-8,0,270),new b(7,0,304),new b(-6,0,338),new b(8,0,372),new b(-8,0,406),new b(6,0,440),new b(0,0,468)],E=new pn(M,!1,"centripetal",.6);E.arcLengthDivisions=1e3;const P=e?240:500,I=li(E,4.2,ie.path,Ts(),P);I.position.y=.012,o.add(I);const N=[1.85,-1.85].map(C=>{const F=[],D=e?60:120;for(let O=0;O<=D;O++){const W=O/D,Z=E.getPointAt(W),it=E.getTangentAt(W),gt=new b(-it.z,0,it.x).normalize();F.push(new b(Z.x+gt.x*C,0,Z.z+gt.z*C))}return new pn(F,!1,"centripetal",.6)});for(const C of N){const F=li(C,.14,ie.pathEdge,null,P,!0);F.position.y=.032,o.add(F)}for(let C=0;C<=i(84);C++){const F=C/84*.96+.02,D=E.getPointAt(F),O=E.getTangentAt(F),W=new b(-O.z,0,O.x).normalize();for(const Z of[-1.25,1.25]){const it=new R(new ft(.16,.03,1.3),new Fe({color:14859594}));it.position.set(D.x+W.x*Z,.05,D.z+W.z*Z),it.rotation.y=Math.atan2(O.x,O.z),o.add(it)}}const y=new Fe({color:15919826});for(const C of[.22,.58,.86]){const F=E.getPointAt(C),D=E.getTangentAt(C),O=new b(-D.z,0,D.x).normalize();for(let W=-3;W<=3;W++){const Z=F.clone().add(D.clone().multiplyScalar(W*.55)),it=new R(new ft(.42,.03,3.3),y);it.position.set(Z.x,.05,Z.z),it.rotation.y=Math.atan2(O.x,O.z),o.add(it)}}for(const C of[.3,.55,.78]){const F=E.getPointAt(C),D=E.getTangentAt(C),O=new b(-D.z,0,D.x).normalize();for(const W of[-1.1,1.1]){const Z=F.clone().add(O.clone().multiplyScalar(W));o.add(a_(Z,Math.atan2(D.x,D.z)))}}const x=[3.55,-3.55].map(C=>{const F=[],D=e?60:120;for(let O=0;O<=D;O++){const W=O/D,Z=E.getPointAt(W),it=E.getTangentAt(W),gt=new b(-it.z,0,it.x).normalize();F.push(new b(Z.x+gt.x*C,0,Z.z+gt.z*C))}return new pn(F,!1,"centripetal",.6)}),L=[2.42,-2.42].map(C=>{const F=[],D=e?60:120;for(let O=0;O<=D;O++){const W=O/D,Z=E.getPointAt(W),it=E.getTangentAt(W),gt=new b(-it.z,0,it.x).normalize();F.push(new b(Z.x+gt.x*C,0,Z.z+gt.z*C))}return new pn(F,!1,"centripetal",.6)}),B=Pv();for(const C of x){const F=li(C,2.2,13877398,B,P);F.position.y=.015,o.add(F)}for(const C of L){const F=li(C,.24,12100725,null,P);F.position.y=.035,o.add(F)}const k=new R(new ks(E,e?200:400,.05,8,!1),new Fe({color:13015654,transparent:!0,opacity:.7,blending:es,depthWrite:!1}));k.position.y=.055,o.add(k);const nt=k.geometry.index.count,rt=new rd(11772544,.75);o.add(rt);const st=new id(15918796,12101246,.5);o.add(st);const ot=new od(16772552,2.2);ot.position.set(-40,60,-120),ot.castShadow=!0,ot.shadow.mapSize.set(2048,2048),ot.shadow.camera.left=-160,ot.shadow.camera.right=160,ot.shadow.camera.top=200,ot.shadow.camera.bottom=-60,ot.shadow.camera.near=10,ot.shadow.camera.far=700,o.add(ot),o.add(ot.target);const et=[],dt=[],G=t.length,U=[],tt=[],at=[],q=[],pt=[],Ut=[],Mt=[],Vt=[],$t=[],Qt=[],Le=[],re=[],Ne=[],Y=[],ln=[],ae=[],le=[],qt=[],xe=[],Wt=[],z=new b(.5,.3,-.5),T=new b(.5,.3,-.5).normalize();function K(C,F){const D=Tv(C,F);return q.push({g:D,phase:Math.random()*Math.PI*2}),o.add(D),D}function ct(C,F,D){const O=Lv(C,F,D);return pt.push({g:O,phase:Math.random()*Math.PI*2}),o.add(O),O}function ht(C,F,D){const O=Bv(C,F,D);return le.push({g:O,phase:Math.random()*Math.PI*2}),o.add(O),O}t.forEach((C,F)=>{const D=.02+(F+.5)/G*.94,O=F%2===0?1:-1,W=cd(C,E,D,O,F);if(et.push(W),dt.push({mesh:W.front,kind:"panel",index:F}),o.add(W.group),o.add(Hn(W.group.position,6.4,4.2)),F%3===0){const Z=new b(Math.cos(W.group.rotation.y),0,-Math.sin(W.group.rotation.y)).normalize(),it=W.group.position.clone().add(Z.clone().multiplyScalar(3.4));it.y=0,ct(it,.9+Math.random()*.5,F),K(W.group.position.clone().add(Z.clone().multiplyScalar(-3.2)),.7+Math.random()*.5)}});for(let C=0;C<i(48);C++){const F=C*13+Math.random()*7,D=7+Math.random()*27,O=4+Math.random()*3.5,W=4+Math.random()*3.5,Z=vl(O,D,W,F,-78-Math.random()*34),it=vl(O,D*(.7+Math.random()*.6),W,F,78+Math.random()*34);$t.push(Z,it),o.add(Z,it)}for(let C=0;C<i(14);C++){const F=30+Math.random()*450,D=Math.random()>.5?1:-1,O=28+Math.random()*55,W=42+Math.random()*50;o.add(Rv(new b(D*(210+Math.random()*150),O*.4-3,F),W,O,38+Math.random()*30))}const lt=new $({color:ie.hill,roughness:1,flatShading:!0}),Bt=new R(new oe(120,24,12),lt);Bt.scale.set(1,.5,4),Bt.position.set(-230,-2,240),o.add(Bt);const xt=new R(new oe(150,24,12),lt);xt.scale.set(1,.55,4.5),xt.position.set(280,0,330),o.add(xt);const Nt=[];for(let C=0;C<=i(14);C++){const F=C/14*.96+.02,D=E.getPointAt(F),O=E.getTangentAt(F),W=C%2===0?1:-1,Z=new b(-O.z,0,O.x).normalize(),it=D.clone().add(Z.clone().multiplyScalar(W*4.8));o.add(uo(it,W));const gt=ho(it,W);Nt.push({glow:gt.glow,pool:gt.pool,i:C}),o.add(gt.group)}for(let C=0;C<=i(13);C++){const F=C/13*.96+.02+.035;if(F>.98)continue;const D=E.getPointAt(F),O=E.getTangentAt(F),W=C%2===0?-1:1,Z=new b(-O.z,0,O.x).normalize(),it=D.clone().add(Z.clone().multiplyScalar(W*5.3));o.add(As(it,W));const gt=D.clone().add(Z.clone().multiplyScalar(W*4.6));if(ct(gt,.8+Math.random()*.5,C*3+1),C%3===1){const Dt=D.clone().add(Z.clone().multiplyScalar(W*6.1));o.add(Iv(Dt))}}const se=[],mt=t.map((C,F)=>.02+(F+.5)/G*.94);for(let C=0;C<i(36);C++){let F=Math.random();for(let Dt=0;Dt<8&&(F=Math.random(),!!mt.some(Re=>Math.abs(Re-F)<.018));Dt++);const D=E.getPointAt(F),O=E.getTangentAt(F),W=new b(-O.z,0,O.x).normalize(),Z=Math.random()>.5?1:-1,it=D.clone().add(W.clone().multiplyScalar(Z*(8.5+Math.random()*7.5))),gt=ar(it,.9+Math.random()*.8);se.push({g:gt,phase:Math.random()*Math.PI*2}),o.add(gt)}for(let C=0;C<i(14);C++){let F=Math.random();for(let Dt=0;Dt<8&&(F=Math.random(),!!mt.some(Re=>Math.abs(Re-F)<.02));Dt++);const D=E.getPointAt(F),O=E.getTangentAt(F),W=new b(-O.z,0,O.x).normalize(),Z=Math.random()>.5?1:-1,it=D.clone().add(W.clone().multiplyScalar(Z*(10+Math.random()*9))),gt=l_(it,.9+Math.random()*.9);se.push({g:gt,phase:Math.random()*Math.PI*2}),o.add(gt)}for(let C=0;C<i(7);C++){const F=.05+Math.random()*.9;if(mt.some(gt=>Math.abs(gt-F)<.015))continue;const D=E.getPointAt(F),O=E.getTangentAt(F),W=new b(-O.z,0,O.x).normalize(),Z=C%2===0?1:-1,it=D.clone().add(W.clone().multiplyScalar(Z*(5.1+Math.random()*.5)));o.add(As(it,Z))}const It=[];for(let C=0;C<i(12);C++){const F=.04+Math.random()*.92,D=E.getPointAt(F),O=E.getTangentAt(F),W=new b(-O.z,0,O.x).normalize(),Z=Math.random()>.5?1:-1,it=D.clone().add(W.clone().multiplyScalar(Z*(3.1+Math.random()*.9))),gt=Dv();gt.position.set(it.x,0,it.z),It.push({g:gt,phase:Math.random()*Math.PI*2,x0:it.x,z0:it.z,fx:W.x*Z,fz:W.z*Z,state:0,timer:0,idx:C}),dt.push({mesh:gt.userData.body,kind:"pigeon",index:C}),o.add(gt)}(e?[.14,.46]:[.14,.46,.82]).forEach((C,F)=>{const D=E.getPointAt(C),O=E.getTangentAt(C),W=new b(-O.z,0,O.x).normalize(),Z=F%2===0?1:-1,it=D.clone().add(W.clone().multiplyScalar(Z*5.15)),gt=Math.atan2(W.x,W.z)+(Z>0?0:Math.PI),Dt=Uv(it,gt,F===1?["RÈGLES","D'AFFICHAGE"]:void 0);dt.push({mesh:Dt.userData.body,kind:"morris",tip:"Colonne Morris — l'affichage classique du mobilier urbain publicitaire."}),qt.push(Dt),o.add(Dt),o.add(Hn(it,2,2)),ht(it.clone().add(W.clone().multiplyScalar(Z*-1.6)),2.2,.55)}),(e?[.24]:[.24,.62]).forEach((C,F)=>{const D=E.getPointAt(C),O=E.getTangentAt(C),W=new b(-O.z,0,O.x).normalize(),Z=F%2===0?-1:1,it=D.clone().add(W.clone().multiplyScalar(Z*5.5)),gt=Nv(it,Z);dt.push({mesh:gt.userData.poster,kind:"shelter",tip:"Abribus — le mobilier qui allie transport et communication."}),xe.push(gt),o.add(gt),o.add(Hn(it,4.6,2.6))}),(e?[.19,.85]:[.12,.28,.45,.6,.76,.9]).forEach((C,F)=>{const D=E.getPointAt(C),O=E.getTangentAt(C),W=new b(-O.z,0,O.x).normalize(),Z=F%2===0?1:-1,it=D.clone().add(W.clone().multiplyScalar(Z*6.4)),gt=Math.atan2(O.x,O.z)+(Z>0?Math.PI:0),Dt=[13215868,9415293,13805176],Re=zv(it,Dt[F%Dt.length],gt);tt.push({g:Re,phase:Math.random()*Math.PI*2}),o.add(Re)});for(let C=0;C<i(8);C++){const F=.06+Math.random()*.88,D=E.getPointAt(F),O=E.getTangentAt(F),W=new b(-O.z,0,O.x).normalize(),Z=Math.random()>.5?1:-1,it=D.clone().add(W.clone().multiplyScalar(Z*(5.9+Math.random()*1.4)));o.add(Fv(it,Math.random()*Math.PI*2))}(e?[.28,.72]:[.18,.5,.8]).forEach(C=>{const F=E.getPointAt(C),D=E.getTangentAt(C),O=new b(-D.z,0,D.x).normalize(),W=F.clone().add(O.clone().multiplyScalar(3.9)),Z=F.clone().add(O.clone().multiplyScalar(-3.9));W.y=5.3,Z.y=5.3;const it=Kv(W,Z);Ut.push({g:it,phase:Math.random()*Math.PI*2}),o.add(it)});const Kt=[{color:13209450,label:"BOULANGERIE"},{color:8231528,label:"PHARMACIE"},{color:9083576,label:"LIBRAIRIE"},{color:13608308,label:"CAFÉ DU PARC"}];(e?[.15,.42,.72]:[.15,.38,.6,.84]).forEach((C,F)=>{const D=E.getPointAt(C),O=E.getTangentAt(C),W=new b(-O.z,0,O.x).normalize(),Z=D.clone().add(W.clone().multiplyScalar(-1*(11+F%2*2.4))),it=Math.atan2(W.x,W.z),gt=jv(Z,it,Kt[F%Kt.length].color,Kt[F%Kt.length].label);Qt.push(gt),o.add(gt),o.add(Hn(Z,5.4,3.2))}),[.32,.7].forEach((C,F)=>{const D=E.getPointAt(C),O=E.getTangentAt(C),W=new b(-O.z,0,O.x).normalize(),Z=F%2===0?1:-1,it=D.clone().add(W.clone().multiplyScalar(Z*2.8));o.add(Ov(it,Math.atan2(O.x,O.z),F===0?"D":"A"))});for(let C=0;C<i(8);C++){const F=.08+Math.random()*.84,D=E.getPointAt(F),O=E.getTangentAt(F),W=new b(-O.z,0,O.x).normalize(),Z=Math.random()>.5?1:-1,it=D.clone().add(W.clone().multiplyScalar(Z*(4.55+Math.random()*.4)));ht(it,1.5+Math.random()*1.2,.5+Math.random()*.3)}[{t:.09,side:-1,lines:["RÉCLAMEZ","VOTRE VILLE"]},{t:.36,side:1,lines:["ESPACE","PUBLICITAIRE"]},{t:.62,side:-1,lines:["MOBILIER","URBAIN"]},{t:.88,side:1,lines:["ZONAGE","RÉGULÉ"]}].forEach(C=>{const F=E.getPointAt(C.t),D=E.getTangentAt(C.t),O=new b(-D.z,0,D.x).normalize(),W=F.clone().add(O.clone().multiplyScalar(C.side*7.6)),Z=Math.atan2(-O.x*C.side,-O.z*C.side),it=Yv(W,Z,C.lines);Le.push(it),dt.push({mesh:it.userData.face,kind:"billboard",tip:"Grand format 4×3 — un panneau publicitaire soumis au zonage."}),o.add(it),o.add(Hn(W,6.4,4)),K(W.clone().add(O.clone().multiplyScalar(C.side*2.3)),.8),K(W.clone().add(O.clone().multiplyScalar(C.side*2.8)),.7)});{const F=E.getPointAt(.33),D=E.getTangentAt(.33),O=new b(-D.z,0,D.x).normalize(),W=F.clone().add(O.clone().multiplyScalar(-11)),Z=Xv();Z.position.copy(W);const it=e?26:60,gt=new Float32Array(it*3),Dt=new Bs({color:13625580,size:.09,transparent:!0,opacity:.6,blending:He,depthWrite:!1,sizeAttenuation:!0}),Re=new Pe;Re.setAttribute("position",new Be(gt,3));const Jn=new So(Re,Dt);Z.add(Jn),U.push({g:Z,phase:0,splash:0,drops:Jn,nDrops:it,life:new Float32Array(it).fill(0),vx:new Float32Array(it),vy:new Float32Array(it),vz:new Float32Array(it)}),dt.push({mesh:Z.userData.pool,kind:"fountain",index:0,tip:"Fontaine publique — l'embellissement du cadre de vie."}),o.add(Z),o.add(Hn(W,4.6,4.6));for(let _n=0;_n<4;_n++){const ti=_n/4*Math.PI*2+.4,js=W.clone().add(new b(Math.cos(ti)*2.7,0,Math.sin(ti)*2.7));o.add(As(js,1)),ct(js.clone().add(new b(.6,0,0)),.8,_n)}o.add(ar(W.clone().add(new b(-3.4,0,1.4)),1.3)),o.add(ar(W.clone().add(new b(3.2,0,-1.2)),1.2));const Qn=W.clone().add(new b(3.9,0,-3.4)),un=cu(Qn,Math.atan2(D.x,D.z)+Math.PI);re.push(un),dt.push({mesh:un.userData.sign,kind:"stall",tip:"Étal de marché — un commerce de proximité sur la place."}),o.add(un),o.add(Hn(Qn,2.6,1.4))}{const F=E.getPointAt(.33),D=E.getTangentAt(.33),O=new b(-D.z,0,D.x).normalize(),W=F.clone().add(O.clone().multiplyScalar(11.6)).add(D.clone().multiplyScalar(3)),Z=yv(W);Ne.push(Z),o.add(Z.g);for(let it=0;it<i(3);it++){const gt=Mv(W);Y.push({g:gt.g,head:gt.head,tail:gt.tail,a:it/3*Math.PI*2+Math.random(),r:.6+Math.random()*2.4,sp:.35+Math.random()*.4,ph:Math.random()*Math.PI*2}),o.add(gt.g)}for(let it=0;it<5;it++){const gt=it/5*Math.PI*2+.4,Dt=W.clone().add(new b(Math.cos(gt)*5.4,0,Math.sin(gt)*5.4)),Re=ar(Dt,.9+Math.random()*.7);se.push({g:Re,phase:Math.random()*Math.PI*2}),o.add(Re)}o.add(As(W.clone().add(new b(4.6,0,1.4)),1)),o.add(As(W.clone().add(new b(-4.4,0,-1.6)),-1))}{const C=[{t:.06,off:4.8,side:1},{t:.18,off:5.2,side:-1},{t:.33,off:-11,side:-1},{t:.46,off:6,side:1},{t:.62,off:5.6,side:-1},{t:.78,off:6.2,side:1}];(e?C.slice(0,3):C).forEach((D,O)=>{const W=E.getPointAt(D.t),Z=E.getTangentAt(D.t),it=new b(-Z.z,0,Z.x).normalize(),gt=W.clone().add(it.clone().multiplyScalar(D.side*D.off));for(let Dt=0;Dt<2;Dt++){const Re=xv(gt.clone().add(new b((Math.random()-.5)*2,1.4+Math.random()*.8,(Math.random()-.5)*2)));ln.push({g:Re.g,lw:Re.lw,rw:Re.rw,base:gt.clone(),ph:Math.random()*Math.PI*2,amp:.7+Math.random()*.9}),o.add(Re.g)}})}{const F=E.getPointAt(.585),D=E.getTangentAt(.585),O=new b(-D.z,0,D.x).normalize(),W=F.clone().add(O.clone().multiplyScalar(-6.2)),Z=Math.atan2(O.x,O.z),it=$v(W,Z);at.push({g:it,phase:0}),dt.push({mesh:it.userData.sign,kind:"kiosk",tip:"Kiosque — un point de vente au cœur de la ville."}),o.add(it),o.add(Hn(W,3,2.6)),ht(W.clone().add(new b(2.4,0,0)),1.6,.5);const gt=t_(W.clone().add(new b(1.5,0,1)));Vt.push({g:gt,phase:Math.random()*Math.PI*2,state:0,timer:0}),gt.userData.balloons.forEach(Dt=>dt.push({mesh:Dt,kind:"balloon",tip:"Les ballons s'envolent vers le ciel !"})),o.add(gt)}const Q=(C,F)=>.5*(mt[C]+mt[F]);for(const C of[.22,.58,.86]){const F=E.getPointAt(C),D=E.getTangentAt(C),O=new b(-D.z,0,D.x).normalize(),W=Math.random()>.5?1:-1,Z=F.clone().add(O.clone().multiplyScalar(W*2.9)),it=new b().subVectors(F,Z).normalize(),gt=e_(Z,Math.atan2(it.x,it.z));o.add(gt),ae.push({g:gt,phase:Math.random()*10})}const ut=e?4:8;for(let C=0;C<ut;C++){const F=.05+C/ut*.9,D=E.getPointAt(F),O=E.getTangentAt(F),W=new b(-O.z,0,O.x).normalize(),Z=C%2===0?1:-1;o.add(n_(D.clone().add(W.clone().multiplyScalar(Z*2.6))))}const Pt=e?1:3;for(let C=0;C<Pt;C++){const F=.14+C/Pt*.6,D=E.getPointAt(F),O=E.getTangentAt(F),W=new b(-O.z,0,O.x).normalize(),Z=C%2===0?1:-1;o.add(i_(D.clone().add(W.clone().multiplyScalar(Z*2.85))))}const Lt=e?1:2;for(let C=0;C<Lt;C++){const F=.24+C*.3,D=E.getPointAt(F),O=E.getTangentAt(F),W=new b(-O.z,0,O.x).normalize(),Z=C%2===0?-1:1;o.add(s_(D.clone().add(W.clone().multiplyScalar(Z*2.95))))}(e?[.32,.74]:[.08,.32,.55,.78]).forEach((C,F)=>{const D=E.getPointAt(C),O=E.getTangentAt(C),W=new b(-O.z,0,O.x).normalize(),Z=F%2===0?1:-1,it=D.clone().add(W.clone().multiplyScalar(Z*6.9)),gt=F%2===0?["ESPACE","PUBLICITAIRE"]:["MOBILIER","URBAIN"],Dt=o_(it,Math.atan2(W.x,W.z)+(Z>0?0:Math.PI),gt);dt.push({mesh:Dt.userData.front,kind:"sucette",tip:"Sucette d'affichage — un petit format encadré par la réglementation."}),Wt.push(Dt),o.add(Dt),o.add(Hn(it,1.6,2.2))}),(e?[Q(1,2),Q(8,9)]:[Q(1,2),Q(3,4),Q(6,7),Q(9,10)]).forEach((C,F)=>{const D=E.getPointAt(C),O=E.getTangentAt(C),W=new b(-O.z,0,O.x).normalize(),Z=F%2===0?1:-1,it=D.clone().add(W.clone().multiplyScalar(Z*4.55)),gt=r_(it,.9+F%3*.15);se.push({g:gt,phase:Math.random()*Math.PI*2}),o.add(gt)}),(e?[Q(7,8)]:[Q(1,2),Q(3,4),Q(5,6),Q(7,8),Q(9,10),Q(11,12)]).forEach((C,F)=>{const D=E.getPointAt(C),O=E.getTangentAt(C),W=new b(-O.z,0,O.x).normalize(),Z=F%2===0?1:-1,it=br();it.cone.material.opacity=0,it.group.position.set(D.x+W.x*Z*1.7,0,D.z+W.z*Z*1.7),it.group.rotation.y=Math.atan2(O.x,O.z),o.add(it.group)});for(const C of[.13,.45,.75]){const F=E.getPointAt(C),D=E.getTangentAt(C),O=new b(-D.z,0,D.x).normalize(),W=F.clone().add(O.clone().multiplyScalar(4.9)),Z=F.clone().add(O.clone().multiplyScalar(-4.9));o.add(du(W)),o.add(du(Z)),W.y=6.35,Z.y=6.35,o.add(hu(W,Z,.55)),o.add(hu(W.clone().add(new b(.14,-.22,0)),Z.clone().add(new b(-.14,-.22,0)),.45))}for(const[C,F,D]of[[.1,.6,0],[.33,-.6,0],[.49,.6,1],[.65,-.6,0],[.8,.6,1],[.93,-.6,0]]){const O=E.getPointAt(C),W=E.getTangentAt(C),Z=new b(-W.z,0,W.x).normalize();o.add(uu(O.clone().add(Z.clone().multiplyScalar(F)),D,Math.atan2(W.x,W.z)))}for(const C of[.31,.71]){const F=E.getPointAt(C),D=E.getTangentAt(C),O=new b(-D.z,0,D.x).normalize(),W=Math.random()>.5?1:-1;o.add(uu(F.clone().add(O.clone().multiplyScalar(W*3.1)),1,Math.atan2(D.x,D.z)))}{const F=E.getPointAt(.24),D=E.getTangentAt(.24),O=new b(-D.z,0,D.x).normalize();[1.6,2,-1.6].forEach((W,Z)=>{const it=F.clone().add(O.clone().multiplyScalar(W)).add(D.clone().multiplyScalar(Z===2?-.5:.6));o.add(c_(it))})}{const F=E.getPointAt(.82),D=E.getTangentAt(.82),O=new b(-D.z,0,D.x).normalize(),W=F.clone().add(O.clone().multiplyScalar(11.6)),Z=cu(W,Math.atan2(-O.x,-O.z),9415293);re.push(Z),dt.push({mesh:Z.userData.sign,kind:"stall",tip:"Étal de marché — un commerce de proximité sur la place."}),o.add(Z),o.add(Hn(W,2.6,1.4))}const me=[],gn=e?10:20,Rn=e?1:3;for(let C=0;C<gn;C++){const F=C<Rn,D=qv();F&&D.g.scale.setScalar(.72);const O=Math.random()>.5?1:-1,W=Math.random()>.5?1:-1;me.push({g:D.g,legL:D.legL,legR:D.legR,kneeL:D.kneeL,kneeR:D.kneeR,armL:D.armL,armR:D.armR,elbowL:D.elbowL,elbowR:D.elbowR,lean:D.lean,t:.02+Math.random()*.96,speed:(F?.009:.004+Math.random()*.005)*O,side:W,off:3+Math.random()*.9,phase:D.phase,step:0}),o.add(D.g)}for(let C=0;C<(e?1:3);C++){const F=Qv(),D=Math.random()>.5?1:-1,O=Math.random()>.5?1:-1;Mt.push({g:F,t:.08+Math.random()*.84,speed:(.006+Math.random()*.004)*D,side:O,off:3.4+Math.random()*.9,phase:Math.random()*Math.PI*2,step:0}),o.add(F)}for(let C=0;C<i(38);C++){const F=Math.random(),D=E.getPointAt(F),O=E.getTangentAt(F),W=new b(-O.z,0,O.x).normalize(),Z=Math.random()>.5?1:-1,it=D.clone().add(W.clone().multiplyScalar(Z*(9+Math.random()*22)));Math.random()<.5?o.add(Sv(it,1+Math.random()*2.4)):o.add(wv(it,.3+Math.random()*.9))}const Xs=[];for(let C=0;C<i(30);C++){const F=Math.random(),D=E.getPointAt(F),O=E.getTangentAt(F),W=new b(-O.z,0,O.x).normalize(),Z=Math.random()>.5?1:-1,it=D.clone().add(W.clone().multiplyScalar(Z*(9+Math.random()*8))),gt=ud(it,.8+Math.random()*.8);Xs.push({g:gt,phase:Math.random()*Math.PI*2}),o.add(gt)}for(let C=0;C<i(66);C++){let F=Math.random();for(let gt=0;gt<8&&(F=Math.random(),!!mt.some(Dt=>Math.abs(Dt-F)<.012));gt++);const D=E.getPointAt(F),O=E.getTangentAt(F),W=new b(-O.z,0,O.x).normalize(),Z=Math.random()>.5?1:-1,it=D.clone().add(W.clone().multiplyScalar(Z*(5.8+Math.random()*3.4)));if(K(it,.5+Math.random()*.8),Math.random()<.35){const gt=D.clone().add(W.clone().multiplyScalar(Z*(6.2+Math.random()*1.6)));ct(gt,.7+Math.random()*.5,C*7%9)}}const Ys=[];for(let C=0;C<i(17);C++){const F=Av(new b((Math.random()-.5)*130,30+Math.random()*20,Math.random()*440),1.4+Math.random()*2.6);Ys.push({g:F,speed:.5+Math.random()*.8,phase:Math.random()*Math.PI*2,y0:F.position.y,s0:F.scale.x}),o.add(F)}[{t:.12,side:1,lines:["Audit","d'abord"],tip:"Toute réorganisation commence par l'audit des acteurs du secteur."},{t:.5,side:-1,lines:["Zonage"],tip:"Le zonage délimite les espaces publicitaires selon des normes."},{t:.88,side:1,lines:["Mise à jour","continue"],tip:"Un secteur en phase avec l'urbanisation se pérennise."}].forEach(C=>{const F=E.getPointAt(C.t),D=E.getTangentAt(C.t),O=new b(-D.z,0,D.x).normalize(),W=F.clone().add(O.clone().multiplyScalar(C.side*5.5)),Z=new b().subVectors(F,W).normalize(),it=Cv(W,Math.atan2(Z.x,Z.z),C.lines);dt.push({mesh:it.sign,kind:"sign",tip:C.tip}),o.add(it.group)});const Kn=bv(e?180:420);o.add(Kn);const Co=Math.random()*Math.PI*2,$s=e?60:130,jn=new Float32Array($s*3);for(let C=0;C<$s;C++){const F=Math.random(),D=E.getPointAt(F),O=E.getTangentAt(F),W=new b(-O.z,0,O.x).normalize(),Z=Math.random()>.5?1:-1,it=2.6+Math.random()*8;jn[C*3]=D.x+W.x*Z*it,jn[C*3+1]=.35+Math.random()*2.6,jn[C*3+2]=D.z+W.z*Z*it}const Zs=new Pe;Zs.setAttribute("position",new Be(jn,3));const zi=new Bs({color:16180136,size:ns()?.1:.13,transparent:!0,opacity:0,blending:He,depthWrite:!1,sizeAttenuation:!0}),Fi=new So(Zs,zi);o.add(Fi);const Ks=[];for(let C=0;C<i(30);C++){const F=Zv(),D=Math.random(),O=E.getPointAt(D),W=E.getTangentAt(D),Z=new b(-W.z,0,W.x).normalize(),it=Math.random()>.5?1:-1,gt=O.x+Z.x*it*(2+Math.random()*7),Dt=.4+Math.random()*4,Re=O.z+Z.z*it*(2+Math.random()*7);F.position.set(gt,Dt,Re),Ks.push({g:F,x:gt,y:Dt,z:Re,vx:(Math.random()-.5)*2.2,vz:-(.8+Math.random()*1.4),vy:-(.3+Math.random()*.4),spin:(Math.random()-.5)*4,phase:Math.random()*Math.PI*2}),o.add(F)}const Ro=[];for(let C=0;C<i(9);C++){const F=Ev();F.g.position.set(-60+Math.random()*120,9+Math.random()*8,40+Math.random()*120),Ro.push({g:F.g,l:F.l,r:F.r,phase:Math.random()*Math.PI*2,speed:4+Math.random()*3,y0:F.g.position.y,z0:F.g.position.z}),o.add(F.g)}const Po=[];for(let C=0;C<i(7);C++){const F=br();Po.push({g:F.group,cone:F.cone,body:F.body,beamY:.55,t:C/7,speed:.02+Math.random()*.014,phase:Math.random()*Math.PI*2}),o.add(F.group)}const Lo=[];for(let C=0;C<(e?1:2);C++){const F=Jv();Lo.push({g:F.group,cone:F.cone,body:F.body,beamY:1.05,t:.2+C*.5,speed:.014+Math.random()*.004,phase:Math.random()*Math.PI*2}),o.add(F.group)}const A=Po.concat(Lo);for(const C of A){const F=new an(1.15,5.4,14,1,!0),D=new Fe({color:16773320,transparent:!0,opacity:0,blending:He,depthWrite:!1,side:Oe});C.beam=new R(F,D),C.beam.rotation.x=-Math.PI/2,C.beam.position.set(0,C.beamY,3.6),C.g.add(C.beam),C.flash=0}A.forEach((C,F)=>dt.push({mesh:C.body,kind:"car",index:F}));const V=[];{const C=e?18:38,F=new oe(.17,20,16),D=Cn(0,"rgba(255,216,150,0.9)");for(let O=0;O<C;O++){const W=.03+Math.random()*.94,Z=E.getPointAt(W),it=E.getTangentAt(W),gt=new b(-it.z,0,it.x).normalize(),Dt=Math.random()>.5?1:-1,Re=new b(Z.x+gt.x*Dt*(3.4+Math.random()*4.8),1.6+Math.random()*2.2,Z.z+gt.z*Dt*(3.4+Math.random()*4.8)),Jn=new Fe({color:16767392,transparent:!0,opacity:.85,blending:He,depthWrite:!1}),Qn=new On({map:D,transparent:!0,opacity:.7,blending:He,depthWrite:!1,depthTest:!1}),un=new R(F,Jn),_n=new Xn(Qn);_n.scale.setScalar(1.25);const ti=new Tt;ti.add(un,_n),ti.position.copy(Re),o.add(ti),V.push({g:ti,mesh:un,halo:_n,mat:Jn,haloMat:Qn,base:Re.clone(),i:O,phase:Math.random()*Math.PI*2,scale:.8+Math.random()*.5,state:0,timer:0}),dt.push({mesh:_n,kind:"bille",index:O,tip:"Bille d'or — l'étincelle du domaine public."})}}const j=new b,J=new b,X=new b,vt=new b,St=new b;let Ft=performance.now()*.001,yt=null,Ht=null,jt=1/0,Ot=0,de=.005;function Se(C){yt=C&&C.kind?C:null}function Ce(C){if(!(!C||!C.kind)){if(C.kind==="pigeon"){const F=It[C.index];F&&F.state===0&&(F.state=1,F.timer=0)}else if(C.kind==="balloon")for(const F of Vt)F.state===0&&(F.state=1,F.timer=0);else if(C.kind==="fountain"){const F=U[C.index];F&&(F.splash=1)}else if(C.kind==="car"){const F=A[C.index];F&&(F.flash=1)}else if(C.kind==="bille"){const F=V[C.index];F&&F.state===0&&(F.state=1,F.timer=0)}}}function en(C,F){const D=performance.now()*.001,O=Math.min(.05,Math.max(.001,D-Ft));Ft=D;const W=.005+C*.98;de+=(W-de)*Math.min(1,O*5);const Z=de,it=h();v(it);const gt=Math.min(1,O*1.6);m.top.lerp(f.top,gt),m.mid.lerp(f.mid,gt),m.hor.lerp(f.hor,gt),m.amb.lerp(f.amb,gt),m.hs.lerp(f.hs,gt),m.hg.lerp(f.hg,gt),m.sun.lerp(f.sun,gt),m.fog.lerp(f.fog,gt),m.night+=(f.night-m.night)*gt,m.warm+=(f.warm-m.warm)*gt,m.sunI+=(f.sunI-m.sunI)*gt,m.exp+=(f.exp-m.exp)*gt;const Dt=m.night;g.uniforms.night.value=Dt,g.uniforms.warm.value=m.warm,g.uniforms.top.value.copy(m.top),g.uniforms.mid.value.copy(m.mid),g.uniforms.horizon.value.copy(m.hor),g.uniforms.sunColor.value.copy(m.sun);const Re=(it-6.2)/13.8*Math.PI,Jn=Math.max(0,Math.sin(Re));z.set(Math.sin(Re)*.55,Jn*.95+.08,-Math.cos(Re)*.55),T.lerp(z,gt).normalize(),g.uniforms.sunDir.value.copy(T),s.toneMappingExposure=Ke.lerp(s.toneMappingExposure,m.exp,Math.min(1,O*2)),rt.color.copy(m.amb),rt.intensity=.75*(1-Dt)+.45*Dt,st.color.copy(m.hs),st.groundColor.copy(m.hg),st.intensity=.5*(1-Dt)+.45*Dt,ot.color.copy(m.sun),ot.intensity=2.2*m.sunI*(1-Dt)+.3*Dt,Dt<.5!==ot.castShadow&&(ot.castShadow=Dt<.5),o.fog.color.copy(m.fog),p.position.copy(T).multiplyScalar(560),p.scale.setScalar(26+Jn*26),S.position.copy(T).multiplyScalar(-560),p.material.opacity=(1-Dt)*(.35+Jn*.65),S.material.opacity=Dt;const Qn=E.getPointAt(Z),un=E.getTangentAt(Z),_n=E.getPointAt(Math.min(Z+.045,.999));vt.set(-un.z,0,un.x).normalize();const ti=Math.sin(D*.7)*.07,js=Math.sin(D*.25)*.18;j.set(Qn.x+vt.x*js,Qn.y+3.45+ti,Qn.z+vt.z*js),J.set(_n.x,_n.y+2.7,_n.z);{let _=0,wt=1/0;const Xt=Z+.03;for(let ce=0;ce<G;ce++){const we=.02+(ce+.5)/G*.94,ue=Math.abs(we-Xt);ue<wt&&(wt=ue,_=ce)}const Ct=Ke.clamp(1-wt/.06,0,1);if(Ct>0){const ce=et[_].group.position,we=ce.x-r.position.x,ue=ce.z-r.position.z,Ln=we*un.x+ue*un.z>0,Mn=Math.hypot(we,ue),En=Ke.clamp((Mn-4.5)/12,0,1),yn=Ct*Ct*(3-2*Ct)*(Ln?1:0)*En;yn>0&&(X.set(ce.x,ce.y+2.8,ce.z),J.lerp(X,yn*.38))}}r.up.set(0,1,0),r.lookAt(J);const Vl=Math.atan2(un.x,un.z),pd=Vl-Ot;Ot=Vl;const md=Ke.clamp(pd/Math.max(O,.001)*.09,-.08,.08);r.rotation.z=Ke.lerp(r.rotation.z,md,.06);const Wl=55,gd=15.2;St.addScaledVector(j,Wl*O),St.addScaledVector(r.position,-Wl*O),St.multiplyScalar(Math.max(0,1-gd*O)),r.position.addScaledVector(St,O),k.geometry.setDrawRange(0,Math.floor(nt*C)),et.forEach((_,wt)=>{const Xt=wt===F,Ct=yt&&yt.kind==="panel"&&yt.index===wt,ce=Math.abs(C-(.02+(wt+.5)/G*.94))<.06,we=1+Math.sin(D*1.15+wt*1.9)*.012,ue=Ke.clamp(window.innerWidth/window.innerHeight/(16/9),.82,1.18),Ln=we*(Xt?1.04*ue:Ct?1.08*ue:.82),Mn=Ct?.18:Xt?.12:ce?.04:0,En=Ct?.12:.08;_.group.scale.setScalar(Ke.lerp(_.group.scale.x,Ln,En)),_.light&&(_.light.intensity=Ke.lerp(_.light.intensity,Mn+Dt*.9,En)),_.group.position.y=Ke.lerp(_.group.position.y,Xt?.22:0,.06),_.beaconMat.emissiveIntensity=(.22+Math.sin(D*2.4+wt)*.1)*(1-Dt)+(1.3+Math.sin(D*2.4+wt)*.3)*Dt;const yn=Dt>.45;if(yn!==_.nightMode){_.nightMode=yn;const ql=yn?_.nightTex:_.dayTex;_.frontMat.map=ql,_.frontMat.emissiveMap=ql,_.frontMat.needsUpdate=!0}_.frontMat.emissiveIntensity=Ke.lerp(_.frontMat.emissiveIntensity,_.nightMode?Dt*(.8+(Xt?.12:Ct?.16:ce?.06:0)):0,.1),_.frameMat.emissiveIntensity=Ke.lerp(_.frameMat.emissiveIntensity,Dt*.3,.05);const xi=r.position.x-_.group.position.x,as=r.position.z-_.group.position.z,_d=Math.hypot(xi,as),Nr=xi*un.x+as*un.z<0,Md=Ke.clamp(1-_d/32,0,1)*(Nr?1:0),yd=Nr?Math.atan2(xi,as):_.restRot,xd=Nr?Md*.14:.02;_.group.rotation.y=Ke.lerp(_.group.rotation.y,yd,xd)}),A.forEach((_,wt)=>{_.t=(_.t+_.speed*O)%1;const Xt=E.getPointAt(_.t),Ct=E.getTangentAt(_.t);_.g.position.set(Xt.x,.06+Math.sin(D*3+_.t*44)*.02,Xt.z),_.g.rotation.y=Math.atan2(Ct.x,Ct.z),_.cone.material.opacity=.45+Math.sin(D*11+_.phase)*.15;const ce=yt&&yt.kind==="car"&&yt.index===wt;_.flash=Math.max(0,_.flash-O*1.4);const we=ce?.24+.4*Dt+_.flash*.5:_.flash*.5;_.beam.material.opacity=Ke.lerp(_.beam.material.opacity,we,.09);const ue=1+(ce?.18:0)+_.flash*.25;_.beam.scale.set(ue,ue,ue)});for(const _ of Xs)_.g.rotation.z=Math.sin(D*.9+_.phase)*.05,_.g.rotation.y+=3e-4;for(const _ of se){const wt=.5+.5*Math.sin(D*.31+_.phase*1.7);_.g.rotation.z=Math.sin(D*.6+_.phase)*.026+Math.sin(D*1.9+_.phase*2.3)*.018*wt,_.g.rotation.x=Math.sin(D*.83+_.phase*.7)*.016,_.g.rotation.y=Math.sin(D*.47+_.phase)*.024}for(const _ of It){yt&&yt.kind==="pigeon"&&yt.index===_.idx&&_.state===0&&(_.state=1,_.timer=0);const Xt=Math.sin(D*26+_.phase);if(_.state===1){_.timer+=O;const Ct=Math.min(1,_.timer/1.1);_.g.position.y=Ct*2.4,_.g.position.x=_.x0+_.fx*Ct*5.5+Math.sin(D*3)*.06,_.g.position.z=_.z0+_.fz*Ct*5.5,_.g.rotation.z=(1-Ct)*Math.sin(D*2.2+_.phase)*.08-Ct*.22,_.g.rotation.x=-Ct*.45,_.g.scale.y=1+Math.abs(Xt)*.24,_.g.scale.x=1-Math.abs(Xt)*.13,Ct>=1&&(_.state=2,_.timer=0)}else if(_.state===2)_.timer+=O,_.g.position.y=2.4+Math.sin(D*2)*.15,_.g.position.x=_.x0+_.fx*5.5,_.g.position.z=_.z0+_.fz*5.5,_.timer>2.6&&(_.state=3,_.timer=0);else if(_.state===3){_.timer+=O;const Ct=Math.min(1,_.timer/1.4);_.g.position.y=2.4*(1-Ct),_.g.position.x=_.x0+_.fx*5.5*(1-Ct),_.g.position.z=_.z0+_.fz*5.5*(1-Ct),_.g.rotation.z=Ct*Math.sin(D*2.2+_.phase)*.08,_.g.rotation.x=0,_.g.scale.set(1,1,1),Ct>=1&&(_.state=0,_.timer=0)}else{const Ct=Math.abs(Math.sin(D*2.2+_.phase))*.05;_.g.position.y=Ct,_.g.rotation.z=Math.sin(D*2.2+_.phase)*.08,_.g.position.x=_.x0+Math.sin(D*.35+_.phase)*.4,_.g.position.z=_.z0+Math.cos(D*.3+_.phase)*.3}}for(const _ of me){_.t=(_.t+_.speed*O)%1,_.t<0&&(_.t+=1);const wt=E.getPointAt(_.t),Xt=E.getTangentAt(_.t),Ct=new b(-Xt.z,0,Xt.x).normalize();_.g.position.set(wt.x+Ct.x*_.side*_.off,0,wt.z+Ct.z*_.side*_.off),_.g.rotation.y=Math.atan2(Xt.x,Xt.z)+(_.side>0?0:Math.PI),_.step+=O*(6+Math.abs(_.speed)*90);const ce=Math.sin(_.step)*.5;_.legL.rotation.x=ce,_.legR.rotation.x=-ce,_.kneeL.rotation.x=Math.max(0,-ce)*.95,_.kneeR.rotation.x=Math.max(0,ce)*.95,_.armL.rotation.x=-ce*.8,_.armR.rotation.x=ce*.8,_.elbowL.rotation.x=Math.max(0,ce)*.9,_.elbowR.rotation.x=Math.max(0,-ce)*.9,_.lean.rotation.z=Math.sin(_.step)*.025,_.lean.rotation.x=.045+Math.abs(Math.sin(_.step))*.025,_.g.position.y=Math.abs(Math.sin(_.step))*.04}for(const _ of Nt){const wt=.9+Math.sin(D*9+_.i*1.7)*.09;_.glow.material.opacity=(.08*(1-Dt)+.85*Dt)*wt,_.pool.material.opacity=(.1*(1-Dt)+.55*Dt)*wt}if(Ht){const _=(D-Ht.t0)/1.05;Ht.sp.position.lerpVectors(Ht.from,Ht.to,Math.min(1,_)),Ht.sp.material.opacity=Math.sin(Math.min(1,_)*Math.PI),_>=1&&(o.remove(Ht.sp),Ht.sp.material.dispose(),Ht=null,jt=8+Math.random()*10)}else if(jt-=O,jt<=0){const _=new Xn(new On({map:Cn(0,"rgba(255,242,214,1)"),transparent:!0,blending:He,depthWrite:!1,opacity:0}));_.scale.setScalar(2.4);const wt=new b(120+Math.random()*60,92+Math.random()*36,-330-Math.random()*130);_.position.copy(wt),o.add(_),Ht={sp:_,t0:D,from:wt,to:wt.clone().add(new b(-78,-30,16))}}for(const _ of ae){const wt=(D+_.phase)%12/12,Xt=wt<.4,Ct=wt>=.4&&wt<.78,ce=wt>=.78,[we,ue,Ln]=_.g.userData.bulbs,[Mn,En]=_.g.userData.peds,yn=(xi,as)=>xi?as+Dt*.6:as*.12;we.material.emissiveIntensity=yn(Xt,1),ue.material.emissiveIntensity=yn(ce,.95),Ln.material.emissiveIntensity=yn(Ct,.9),Mn.material.emissiveIntensity=Ct?.75+Dt*.4:.08,En.material.emissiveIntensity=Ct?.08:.75+Dt*.4}for(const _ of Ro){_.g.position.x+=_.speed*.02*(.75+.25*Math.sin(D*.8+_.phase)),_.g.position.y=_.y0+Math.sin(D*1.3+_.phase)*.8+Math.sin(D*.4+_.phase*2)*.35,_.g.position.z=_.z0+Math.sin(D*.6+_.phase)*3.5;const wt=Math.cos(D*.6+_.phase)*.6,Xt=Math.cos(D*1.3+_.phase)*.4,Ct=Math.sin(D*(9+Math.abs(Math.sin(D*.8+_.phase))*3)+_.phase)*.75;_.l.rotation.z=Ct,_.r.rotation.z=-Ct,_.g.rotation.z=.25+Math.sin(D*1.3+_.phase)*.12+Math.cos(D*.6+_.phase)*.08+wt*.22,_.g.rotation.x=-Xt*.3-Math.cos(D*1.3+_.phase)*.08,_.g.rotation.y=-wt*.35,_.g.position.x>80&&(_.g.position.x=-80,_.y0=8+Math.random()*9,_.z0=30+Math.random()*90,_.g.position.z=_.z0,_.g.position.y=_.y0)}Kn.rotation.y=D*.05,Kn.material.opacity=(.5+Math.sin(D*3)*.12)*(1-Dt*.7),Kn.position.x=Math.sin(D*.12)*2.4,Kn.position.z=Math.cos(D*.09)*1.6;const vd=.35+Math.sin(D*2.1+Co)*.15;zi.opacity=Dt*vd,Fi.position.x=Math.sin(D*.08)*1.8,Fi.position.z=Math.cos(D*.06)*1.2,Fi.rotation.y=D*.02;for(const _ of Ys){_.g.position.x+=_.speed*.02,_.g.position.y=_.y0+Math.sin(D*.22+_.phase)*.7;const wt=1+Math.sin(D*.3+_.phase)*.05;_.g.scale.set(_.s0*wt,_.s0*wt,_.s0*wt),_.g.position.x>150&&(_.g.position.x=-150)}for(const _ of U){_.splash=Math.max(0,_.splash-O*1.2);const wt=yt&&yt.kind==="fountain",Xt=1+_.splash*.9+(wt?.5:0),Ct=(Math.sin(D*2.6+_.phase)*.5+1)*Xt;_.g.userData.jet.scale.set(1,.7+.3*Ct,1),_.g.userData.jet.rotation.z=Math.sin(D*3.1)*.06*Xt,_.g.userData.jet.rotation.x=Math.cos(D*2.7)*.05*Xt,_.g.userData.pool.rotation.z=D*.25;const ce=(1+Math.sin(D*1.8+_.phase)*.03)*(1+_.splash*.12);if(_.g.userData.pool.scale.set(ce,ce,ce),_.g.userData.dish.rotation.z=Math.sin(D*1.4)*.03,_.drops){const we=_.drops.geometry.attributes.position;for(let ue=0;ue<_.nDrops;ue++){let Ln=_.life[ue];if(Ln-=O*(2.2+_.splash*2.4),Ln<0){_.life[ue]=1;const Mn=Math.random()*Math.PI*2,En=.12+Math.random()*.3;_.vx[ue]=Math.cos(Mn)*En,_.vz[ue]=Math.sin(Mn)*En,_.vy[ue]=.55+Math.random()*.4*Xt,we.array[ue*3]=Math.cos(Mn)*.3,we.array[ue*3+1]=1.25,we.array[ue*3+2]=Math.sin(Mn)*.3}else _.vy[ue]-=1.5*O,we.array[ue*3]+=_.vx[ue]*O,we.array[ue*3+1]+=_.vy[ue]*O,we.array[ue*3+2]+=_.vz[ue]*O,we.array[ue*3+1]<.35&&(_.life[ue]=0,we.array[ue*3+1]=.35)}we.needsUpdate=!0,_.drops.material.opacity=(.55+.3*Ct)*(.35+.65*(1-Dt))}}for(const _ of tt)_.g.userData.parasol.rotation.z=Math.sin(D*.9+_.phase)*.06,_.g.userData.parasol.rotation.x=Math.sin(D*.7+_.phase*1.3)*.05;for(const _ of Ne){const wt=_.water.material;wt.roughness=.08+(Math.sin(D*1.1)*.5+.5)*.05,_.water.rotation.z=Math.sin(D*.3)*.01}for(const _ of Y){_.a+=_.sp*O;const wt=_.g.userData.ox??(_.g.userData.ox=_.g.position.x),Xt=_.g.userData.oz??(_.g.userData.oz=_.g.position.z);_.g.position.x=wt+Math.cos(_.a)*_.r,_.g.position.z=Xt+Math.sin(_.a)*_.r,_.g.rotation.y=-_.a+Math.PI/2,_.g.position.y=.1+Math.sin(D*2.2+_.ph)*.02,_.head.rotation.z=Math.sin(D*3.1+_.ph)*.14,_.tail.rotation.z=Math.sin(D*2.6+_.ph)*.1}for(const _ of ln){const wt=Math.sin(D*24+_.ph);_.lw.rotation.z=-.55+wt*.85,_.rw.rotation.z=.55-wt*.85,_.g.position.x=_.base.x+Math.sin(D*.9+_.ph)*_.amp,_.g.position.z=_.base.z+Math.cos(D*1.3+_.ph*1.7)*_.amp*.7,_.g.position.y=_.base.y+Math.sin(D*2.4+_.ph*2)*.5,_.g.rotation.y=Math.sin(D*1.1+_.ph)*.9}for(const _ of at){const wt=_.g.userData.flag;wt.rotation.z=Math.sin(D*2.4+_.phase)*.28,wt.position.y=2.42+Math.sin(D*2.4+_.phase)*.04,_.g.userData.sign.material.emissiveIntensity=Dt*.75}for(let _=0;_<$t.length;_++)$t[_].material.emissiveIntensity=Dt*(.8+Math.sin(D*1.6+_*1.7)*.18);const rs=Dt*.4;for(const _ of Qt){_.userData.window.material.emissiveIntensity=rs;const wt=_.position.x*1.7+_.position.z*3.1;_.userData.awning.rotation.z=Math.sin(D*.55+wt)*.03,_.userData.awning.rotation.x=Math.sin(D*.4+wt*1.3)*.025}for(const _ of Le)_.userData.face.material.emissiveIntensity=rs;for(const _ of re){_.userData.sign.material.emissiveIntensity=rs;const wt=_.position.x*1.9+_.position.z*2.7;_.userData.awning.rotation.z=Math.sin(D*.6+wt)*.035,_.userData.awning.rotation.x=Math.sin(D*.45+wt*1.2)*.028}for(const _ of qt)_.userData.poster.material.emissiveIntensity=rs;for(const _ of Wt)_.userData.front.material.emissiveIntensity=rs;for(const _ of xe)_.userData.poster.material.emissiveIntensity=rs;for(const _ of Ut)_.g.rotation.z=Math.sin(D*.7+_.phase)*.05;for(const _ of Mt){_.t=(_.t+_.speed*O)%1,_.t<0&&(_.t+=1);const wt=E.getPointAt(_.t),Xt=E.getTangentAt(_.t),Ct=new b(-Xt.z,0,Xt.x).normalize();_.g.position.set(wt.x+Ct.x*_.side*_.off,Math.abs(Math.sin(_.step))*.03,wt.z+Ct.z*_.side*_.off),_.g.rotation.y=Math.atan2(Xt.x,Xt.z)+(_.side>0?0:Math.PI),_.step+=O*14,_.g.userData.tail.rotation.z=Math.sin(D*7+_.phase)*.55}for(const _ of Vt){const wt=_.g.userData.balloons;if(_.state===1){_.timer+=O;const Xt=Math.min(1,_.timer/2.2);for(let Ct=0;Ct<wt.length;Ct++)wt[Ct].position.y=1.2+Xt*5.6+Math.sin(Ct*2.1)*.05,wt[Ct].position.x=(Ct-1)*.22+Math.sin(Xt*6+Ct*2.3)*Xt*.9;Xt>=1&&(_.state=2,_.timer=0)}else if(_.state===2)_.timer+=O,_.timer>3.6&&(_.state=3,_.timer=0);else if(_.state===3){_.timer+=O;const Xt=Math.min(1,_.timer/1.6);for(let Ct=0;Ct<wt.length;Ct++)wt[Ct].position.y=1.2+5.6-Xt*5.6+Math.sin(Ct*2.1)*.05,wt[Ct].position.x=(Ct-1)*.22;Xt>=1&&(_.state=0,_.timer=0)}else{const Xt=yt&&yt.kind==="balloon";for(let Ct=0;Ct<wt.length;Ct++)wt[Ct].position.y=1.2+Math.sin(Ct*2.1)*.05+Math.sin(D*(Xt?2.6:1.1)+_.phase+Ct*1.7)*(Xt?.22:.12),wt[Ct].position.x=(Ct-1)*.22+Math.sin(D*.8+Ct*2.3)*.04}}for(const _ of q)_.g.rotation.z=Math.sin(D*.7+_.phase)*.03,_.g.rotation.x=Math.sin(D*.55+_.phase*1.2)*.02;for(const _ of pt)_.g.rotation.z=Math.sin(D*.9+_.phase)*.06,_.g.rotation.x=Math.sin(D*1.1+_.phase*1.4)*.045;for(const _ of le)_.g.rotation.z=Math.sin(D*.8+_.phase)*.022,_.g.rotation.x=Math.sin(D*.6+_.phase*1.3)*.014;for(const _ of Ks)if(_.x+=(Math.sin(D*.5+_.phase)*.6+_.vx)*O,_.z+=_.vz*O,_.y+=_.vy*O,_.g.rotation.x+=_.spin*O,_.g.rotation.z+=_.spin*.6*O,_.g.position.set(_.x,_.y,_.z),_.y<.18){const wt=Math.min(.97,Math.max(.02,Z+(Math.random()-.35)*.12)),Xt=E.getPointAt(wt),Ct=E.getTangentAt(wt),ce=new b(-Ct.z,0,Ct.x).normalize(),we=Math.random()>.5?1:-1;_.x=Xt.x+ce.x*we*(2+Math.random()*7),_.z=Xt.z+ce.z*we*(2+Math.random()*7),_.y=1.5+Math.random()*3,_.phase=Math.random()*Math.PI*2}for(const _ of V){if(_.state===1){_.timer+=O;const we=Math.min(1,_.timer/.55),ue=_.scale*(1+we*2.4);if(_.g.scale.setScalar(ue),_.mat.opacity=.85*(1-we),_.haloMat.opacity=.7*(1-we),we>=1){const Ln=Ke.clamp(Z+(Math.random()-.35)*.18,.02,.98),Mn=E.getPointAt(Ln),En=E.getTangentAt(Ln),yn=new b(-En.z,0,En.x).normalize(),xi=Math.random()>.5?1:-1;_.base.set(Mn.x+yn.x*xi*(3.4+Math.random()*4.8),1.6+Math.random()*2.2,Mn.z+yn.z*xi*(3.4+Math.random()*4.8)),_.g.position.copy(_.base),_.state=0,_.phase=Math.random()*Math.PI*2,_.mat.opacity=.85,_.haloMat.opacity=.7}continue}const wt=yt&&yt.kind==="bille"&&yt.index===_.i;_.g.position.x=_.base.x+Math.sin(D*.6+_.phase)*.5,_.g.position.z=_.base.z+Math.cos(D*.52+_.phase*1.3)*.5,_.g.position.y=_.base.y+Math.sin(D*.9+_.phase*2)*.38;const Xt=.82+Math.sin(D*2.6+_.phase)*.18,Ct=_.scale*(wt?2:1)*Xt;_.g.scale.setScalar(Ct);const ce=(wt?1:.5)*(.65+.35*(1-Dt));_.mat.opacity=ce,_.haloMat.opacity=ce*.85,_.halo.scale.setScalar((wt?1.7:1.25)*Xt)}}const pe=new rv,Gt=new Et;function Pn(C,F){Gt.set(C,F),pe.setFromCamera(Gt,r);const D=pe.intersectObjects(dt.map(W=>W.mesh),!1);if(!D.length)return null;const O=D[0];return O.distance>45?null:dt[dt.findIndex(W=>W.mesh===O.object)]}function ge(){const C=window.innerWidth,F=window.innerHeight;r.aspect=C/F,r.updateProjectionMatrix(),s.setSize(C,F),a&&(a.setSize(C,F),l&&l.setSize(Math.max(2,Math.floor(C/2)),Math.max(2,Math.floor(F/2))))}function vn(C,F){const D=dt.find(W=>W.kind===C&&(F===void 0||W.index===F));if(!D)return null;const O=new b;if(D.mesh.getWorldPosition(O),O.distanceTo(r.position)>42)return null;if(C==="fountain"){const W=O.clone().sub(r.position).normalize();O.addScaledVector(W,1.25)}return O.project(r),O.z>1||O.z<-1?null:{x:O.x,y:O.y}}function yi(){return{pigeons:It.map(C=>C.state),balloons:Vt.map(C=>C.state),beams:A.map(C=>Math.round(C.beam.material.opacity*100)/100),fountain:U.map(C=>Math.round(C.splash*100)/100)}}function cn(){return r.position.clone()}function Oi(){a?a.render():s.render(o,r)}return{render:Oi,resize:ge,update:en,pick:Pn,interact:Ce,projectPickable:vn,getReactiveState:yi,getCameraPos:cn,setHover:Se,setTimeMode:C=>{u=C==="day"||C==="night"?C:"auto"},setHour:C=>{d=C},setNight:C=>{u=C?"night":"day"},getTimeInfo:()=>({hour:h(),mode:u,night:m.night}),getPanelCanvas:(C,F)=>{const D=et[C];return D?(F?D.nightTex:D.dayTex).image:null}}}const va={module:"Module 1",title:"Formation sur la panneautique.",subtitle:"Domaine public :"},gr=[{name:"Chapitre 1",label:"Introduction :"},{name:"Chapitre 2",label:"Réorganisation & Réaménagement du secteur :"},{name:"Chapitre 3",label:"Évaluation du système d'exploitation :"},{name:"Chapitre 4",label:"Mise à jour :"},{name:"Questionnaire",label:"Module 1 :"}],Je=[{id:"presentation",chapter:0,num:"01",kicker:"Chapitre 1 · Présentation :",title:"La panneautique, un véritable corps de métier.",bullets:["Ensemble des moyens et techniques d'installation et de gestion des panneaux publicitaires","Une étude pluridisciplinaire"],content:[{t:"Un métier à part entière :",b:"La panneautique, en tant qu'ensemble des moyens et techniques d'installation et de gestion des panneaux publicitaires, est un véritable corps de métier dont l'étude est pluridisciplinaire."},{t:"Ce que vous allez parcourir :",b:"De l'importance du panneau publicitaire au constat général dans le secteur, de la réorganisation complète (en sept étapes) du domaine d'activité aux techniques d'évaluation et de mise à jour de l'ensemble du processus ; le module 1 est conçu pour un embellissement durable du cadre de vie des populations, un rayonnement de l'économie grâce à l'exploitation du mobilier urbain de publicité et à la pérennité des acquis de développement dans ce corps de métier. Un questionnaire en douze points achève le module."}]},{id:"lecon1-importance",chapter:0,num:"02",kicker:"Chapitre 1 · Leçon 1 :",title:"Le panneau publicitaire et son importance socio-économique.",bullets:["Booste la concurrence entre les entreprises","Propulse l'économie : compétitivité des acteurs","Vecteur de publicité : stimule la consommation","Participe à l'embellissement des villes"],content:[{t:"Un moteur pour la concurrence :",b:"L'exploitation des panneaux publicitaires est une activité qui booste la concurrence entre les entreprises. Elle propulse l'économie grâce à l'accroissement et à l'amélioration de la compétitivité des différents acteurs de la vie économique d'un pays."},{t:"Le support de publicité par excellence :",b:"Vecteur de publicité, le panneau stimule et encourage la consommation. Lorsque l'activité est bien réglementée et bien encadrée, les normes d'exercice garantissent l'équité dans la gestion du secteur. On ne paie pas pour regarder un panneau : c'est le support publicitaire par excellence."},{t:"Une part du décor urbain :",b:"Par leurs aménagements, les panneaux publicitaires contribuent à l'embellissement des villes. Le choix des supports ne doit donc plus être motivé seulement par leur design, mais aussi par un besoin d'esthétique, pour un environnement et un cadre de vie plus agréables à la vue."}]},{id:"lecon2-constat",chapter:0,num:"03",kicker:"Chapitre 1 · Leçon 2 :",title:"Constat général.",bullets:["Pléthore de panneaux, parfois dans les capitales","Pollution visuelle, insalubrité, insécurité","Secteur mal organisé, ou pas encadré du tout","Supports délabrés, absence de normes"],content:[{t:"Des villes saturées :",b:"Dans beaucoup de villes à travers le monde — l'Afrique en est un bel exemple —, il est fréquent de constater, parfois dans des capitales, des cas de pléthore de panneaux publicitaires, cause de pollution visuelle, d'insalubrité et d'insécurité pour les personnes et les biens."},{t:"Une source : l'anarchie",b:"Un secteur d'exploitation mal organisé, mal encadré, ou pas encadré du tout, où règnent l'anarchie et le désordre, en est la source. L'état délabré et obsolète des supports, l'absence de normes et de réglementations rendent le secteur contre-productif et dégradent l'environnement."},{t:"Des mesures nécessaires :",b:"Il importe donc, pour le rayonnement du secteur et pour sa contribution effective au développement socio-économique des villes, que des mesures adéquates soient prises."}]},{id:"audit",chapter:1,num:"04",kicker:"Chapitre 2 · Étape 1 · Audit :",title:"Audit de la gestion en cours.",bullets:["Liste exhaustive de tous les acteurs du secteur","Examen du mécanisme d'attribution des supports","Examen du cahier des charges"],content:[{t:"Étape 3.1 :",b:"Pour que l'activité d'exploitation des panneaux publicitaires participe au rayonnement d'une ville (ou d'un pays), il faut faire un audit de la gestion en cours."},{t:"En quoi consiste-t-il ?",b:"En l'établissement de la liste exhaustive de tous les acteurs — entreprise ou personne exploitant des panneaux à des fins publicitaires — et en l'examen du mécanisme d'attribution des supports et du cahier des charges."}]},{id:"etat-lieux",chapter:1,num:"05",kicker:"Chapitre 2 · Étape 2 · État des lieux :",title:"État des lieux du parc existant.",bullets:["Relevé GPS détaillé et précis de tous les panneaux","Plan piqué géolocalisable des supports"],content:[{t:"Étape 3.2 :",b:"Faire le relevé (GPS) détaillé et précis de l'ensemble des panneaux publicitaires présents."},{t:"Un plan géolocalisable :",b:"Établir le plan piqué géolocalisable de ces supports : chaque panneau est localisé avec précision sur le territoire."}]},{id:"zonage",chapter:1,num:"06",kicker:"Chapitre 2 · Étape 3 · Zonage :",title:"Zonage.",bullets:["Délimitation selon des normes spécifiques du territoire","Des supports facteurs d'embellissement et de modernité","Paysage publicitaire harmonieux et équilibré","Grilles tarifaires adaptées aux réalités locales"],content:[{t:"Étape 3.3 :",b:"Pour un réaménagement optimal du plan d'implantation des panneaux publicitaires, il faut effectuer des délimitations suivant des normes spécifiques du territoire et proposer des supports facteurs d'embellissement et symboles de modernité."},{t:"Le but du zonage :",b:"Créer les conditions d'un développement harmonieux et équilibré du paysage de l'affichage publicitaire, ainsi que l'établissement de grilles tarifaires en adéquation avec les réalités économiques des villes. Il consiste donc à délimiter des espaces à cette fin."}]},{id:"constitution-lots",chapter:1,num:"07",kicker:"Chapitre 2 · Étape 4 · Constitution des lots :",title:"Constitution des lots.",bullets:["Le « Mobilier Urbain de Publicité » : des objets d'embellissement","Des lots pour les appels d'offres","Équilibre des espaces et des types de supports"],content:[{t:"Étape 4 :",b:"Le terme « Mobilier Urbain de Publicité » s'inscrit dans un contexte où les panneaux publicitaires ne sont plus seulement des supports publicitaires, mais de véritables objets (ou meubles) d'embellissement et de décoration des villes."},{t:"Vers les appels d'offres :",b:"Après études et validation des supports devant être pris en compte dans le cadre du réaménagement, on procède à la constitution des lots devant faire l'objet d'appels d'offres pour la mise en concession des différents espaces publicitaires."},{t:"Garantir un équilibre :",b:"La constitution des lots est faite de manière à garantir l'équilibre des espaces et celui en matière de type de support des différentes régies publicitaires."}]},{id:"mise-concession",chapter:1,num:"08",kicker:"Chapitre 2 · Étape 5 · Mise en concession :",title:"Mise en concession des espaces.",bullets:["Une technique variable selon les pays","Fonction des réalités économiques et législatives","À traiter au cas par cas"],content:[{t:"Étape 5 :",b:"La technique de mise en concession des espaces publicitaires est variable. Elle est fonction des réalités économiques, politico-administratives et de la législation en vigueur dans chaque pays."},{t:"À retenir :",b:"NB : il faut partir d'exemples précis et traiter le sujet au cas par cas."}]},{id:"attribution",chapter:1,num:"09",kicker:"Chapitre 2 · Étape 6 · Attribution :",title:"Attribution des espaces.",bullets:["Sur la base du cahier des charges","Contenu dans le dossier d'appel d'offres"],content:[{t:"Étape 6 :",b:"L'attribution des espaces aux régies publicitaires est faite sur la base du cahier des charges contenu dans le dossier d'appel d'offres."}]},{id:"gestion",chapter:1,num:"10",kicker:"Chapitre 2 · Étape 7 · Gestion :",title:"Gestion par les régies publicitaires.",bullets:["Collectivités locales ou Gouvernement","Selon les textes en vigueur dans chaque pays","Transparence, professionnalisme, efficience"],content:[{t:"Étape 7 :",b:"La gestion par les régies publicitaires est encadrée, dans certains pays, par les collectivités locales. Dans d'autres, elle est du ressort du Gouvernement par l'intermédiaire du Ministère de la Communication, etc."},{t:"L'essentiel :",b:"Plus généralement, c'est selon les textes et dispositions en vigueur dans chaque pays. L'essentiel est que la transparence, le professionnalisme et l'efficience soient rigoureusement observés."}]},{id:"evaluation",chapter:2,num:"11",kicker:"Chapitre 3 · Évaluation :",title:"Évaluer le système d'exploitation du Mobilier Urbain de Publicité.",bullets:["Évaluer tout le processus, de l'audit à la gestion","Un mécanisme scientifiquement soutenable et autonome","Prévenir les dérapages, sécuriser sur le long terme"],content:[{t:"Chapitre 3 :",b:"Pour garantir un développement harmonieux du secteur d'exploitation des panneaux publicitaires / Mobilier Urbain de Publicité, il faut prévoir, dans les réformes, un mécanisme d'évaluation de l'ensemble du processus, depuis l'audit jusqu'à la gestion par les régies publicitaires."},{t:"Un pilotage autonome :",b:"Le mécanisme d'évaluation doit être scientifiquement soutenable, avec une autonomie certaine dans son pilotage. L'évaluation permet de prévenir les risques de dérapage et de sécuriser les intérêts des différents acteurs du secteur et des populations, à travers leur cadre de vie, sur le long terme."}]},{id:"mise-a-jour",chapter:3,num:"12",kicker:"Chapitre 4 · Mise à jour :",title:"Pérenniser les acquis de développement du secteur.",bullets:["Pérenniser les acquis de développement","Le rayonnement des villes par les supports","Une évolution en phase avec l'urbanisation"],content:[{t:"Chapitre 4 :",b:"La mise à jour du secteur d'exploitation des panneaux publicitaires / Mobilier Urbain de Publicité est importante pour pérenniser les acquis de développement de l'activité."},{t:"Pourquoi ?",b:"Elle est importante pour le rayonnement des villes par l'exploitation des supports de publicité et favorisera l'essor de l'activité en adéquation avec l'urbanisation."},{t:"Concrètement :",b:"Elle consiste à s'assurer que le secteur, dans son évolution, soit en phase avec l'évolution démographique et le développement infrastructurel des villes."}]},{id:"quiz",chapter:4,num:"13",kicker:"Questionnaire · Module 1 :",title:"Douze questions pour valider le module.",bullets:["5 définitions","7 questions de compréhension","Testez vos acquis en fin de parcours"],content:[]}],Ls=[{q:"Que désigne la panneautique ?",options:["L'ensemble des moyens et techniques d'installation et de gestion des panneaux publicitaires","La seule vente d'espaces publicitaires","La fabrication du mobilier urbain","La régulation des réseaux sociaux"],correct:0,explain:"La panneautique est l'ensemble des moyens et techniques d'installation et de gestion des panneaux publicitaires — un corps de métier pluridisciplinaire."},{q:"Quel est le but du zonage ?",options:["Multiplier les panneaux pour maximiser les recettes","Créer les conditions d'un développement harmonieux et équilibré du paysage de l'affichage publicitaire","Supprimer toute publicité des villes","Uniformiser tous les panneaux du pays"],correct:1,explain:"Le zonage délimite des espaces pour un paysage publicitaire harmonieux et équilibré, et établit des grilles tarifaires adaptées aux réalités économiques."},{q:"Que désigne le « Mobilier Urbain de Publicité » ?",options:["Les panneaux posés sur le mobilier des cafés","La publicité diffusée à la télévision urbaine","Des panneaux devenus de véritables objets d'embellissement et de décoration des villes","Les panneaux strictement destinés à la location"],correct:2,explain:"Le Mobilier Urbain de Publicité : des panneaux qui ne sont plus de simples supports, mais de véritables meubles d'embellissement et de décoration des villes."},{q:"Qu'est-ce qu'une régie publicitaire ?",options:["L'organisme autorisé à gérer et exploiter des espaces publicitaires","L'autorité qui interdit la publicité","L'entreprise qui imprime les affiches","L'organisme de contrôle des réseaux sociaux"],correct:0,explain:"Les régies publicitaires sont les exploitants auxquels les espaces sont attribués sur la base du cahier des charges contenu dans le dossier d'appel d'offres."},{q:"Qu'est-ce que la pollution visuelle, dans le cadre de l'exploitation des panneaux ?",options:["Les panneaux trop colorés","La publicité lumineuse la nuit","Le bruit produit par les panneaux numériques","Une pléthore de panneaux mal organisés qui dégrade le cadre de vie"],correct:3,explain:"Une pléthore de panneaux issus d'un secteur mal organisé ou non encadré est cause de pollution visuelle, d'insalubrité et d'insécurité."},{q:"En quoi consiste une réorganisation du secteur d'exploitation des panneaux publicitaires ?",options:["À augmenter le nombre d'exploitants","À privatiser tous les supports","À remettre de l'ordre : audit, état des lieux, zonage, lots, concession, attribution, gestion","À supprimer le cahier des charges"],correct:2,explain:"La réorganisation suit sept étapes : audit, état des lieux, zonage, constitution des lots, mise en concession, attribution des espaces et gestion par les régies."},{q:"En quoi consiste le réaménagement de l'espace publicitaire d'une ville ?",options:["Délimiter des zones et proposer des supports facteurs d'embellissement et de modernité","Remplacer tous les panneaux par des écrans numériques","Retirer les panneaux des centres-villes","Uniformiser les tarifs à l'échelle nationale"],correct:0,explain:"Le réaménagement repose sur le zonage : délimiter des espaces selon des normes et proposer des supports qui embellissent et modernisent le cadre de vie."},{q:"Comment prévenir la pollution visuelle due à l'exploitation des panneaux ?",options:["En interdisant toute nouvelle publicité","En augmentant le nombre de panneaux","En confiant le secteur à une seule régie","En réglementant, auditant et zonant le secteur d'exploitation"],correct:3,explain:"Un secteur réglementé et encadré (audit, état des lieux, zonage, normes) prévient la pléthore de panneaux à l'origine de la pollution visuelle."},{q:"Comment s'assurer d'une bonne rentabilité et de la pérennité du secteur ?",options:["En baissant tous les tarifs","Par la transparence, le professionnalisme, l'efficience et une mise à jour régulière","En vendant les panneaux aux enchères chaque année","En supprimant l'évaluation"],correct:1,explain:"Transparence, professionnalisme et efficience sont essentiels ; l'évaluation et la mise à jour régulière pérennisent les acquis du secteur."},{q:"Peut-on installer un panneau publicitaire n'importe où ? Pourquoi ?",options:["Oui, la liberté d'entreprendre le permet","Oui, sauf dans les capitales","Non, l'implantation suit des normes, un zonage et des délimitations","Non, uniquement sur les autoroutes"],correct:2,explain:"L'implantation suit un zonage et des délimitations selon des normes spécifiques du territoire, pour un développement harmonieux et un cadre de vie agréable."},{q:"Quelle est l'importance du panneau publicitaire dans une ville ?",options:["Il booste la concurrence, l'économie et embellit le cadre de vie","Il ne sert qu'à décorer","Il remplace les marchés publics","Il est surtout un obstacle à la circulation"],correct:0,explain:"Il booste la concurrence entre entreprises, propulse l'économie et, bien aménagé, contribue à l'embellissement des villes."},{q:"N'importe qui peut-il exercer l'activité d'exploitation de panneaux publicitaires ?",options:["Oui, c'est totalement libre","Oui, moyennant une simple taxe","Non, seuls les ministères peuvent exploiter","Non : acteurs identifiés, appels d'offres et gestion encadrée"],correct:3,explain:"Le secteur est encadré : audit des acteurs, appels d'offres, cahier des charges, concession et gestion selon les textes en vigueur."}],ve=n=>document.querySelector(n);function d_(){const n={topbar:ve("#ui-topbar"),chapter:ve("#ui-chapter"),progressFill:ve("#ui-progress-fill"),dots:ve("#ui-dots"),hint:ve("#ui-hint"),clickHint:ve("#ui-click-hint"),title:ve("#ui-title"),card:ve("#ui-card"),cardKicker:ve("#ui-card .card-kicker"),cardTitle:ve("#ui-card .card-title"),cardBody:ve("#ui-card .card-body"),quiz:ve("#ui-quiz"),quizScore:ve("#quiz-score"),quizList:ve("#quiz-list"),quizFill:ve("#quiz-progress-fill"),quizResult:ve("#quiz-result"),resultTitle:ve("#quiz-result .result-title"),resultText:ve("#quiz-result .result-text"),reader:ve("#ui-reader"),readerPanel:ve(".reader-panel"),readerProg:ve("#reader-progress-fill"),readerKicker:ve("#ui-reader .reader-kicker"),readerTitle:ve("#ui-reader .reader-title"),readerBody:ve("#ui-reader .reader-body"),readerCount:ve("#reader-count"),readerPrev:ve("#reader-prev"),readerNext:ve("#reader-next"),readerClose:ve("#reader-close"),toast:ve("#ui-toast"),cardOpen:ve("#card-open")};Je.forEach((M,E)=>{const P=document.createElement("span");P.className="dot"+(E===0?" active":""),P.dataset.index=E,n.dots.appendChild(P)});const t={activeIndex:-1,quizAnswered:new Set,score:0,started:!1,readerOpen:!1,readerIndex:-1};let e=null,i=null,s=null;function o(M){n.progressFill.style.width=(M*100).toFixed(2)+"%"}function r(M){const E=gr[M];n.chapter.textContent=E?`${E.name} — ${E.label}`:""}function a(M,E){if(M===t.activeIndex)return;t.activeIndex=M;const P=Je[M];document.querySelectorAll(".dot").forEach((N,y)=>{N.classList.toggle("active",y===M)});const I=P.id==="quiz";n.card.classList.toggle("show",!I&&M!==-1),n.quiz.classList.toggle("show",I),i&&i(I),I||(n.cardKicker.textContent=P.kicker,n.cardTitle.textContent=P.title,n.cardBody.innerHTML=`<p class="card-note">Leçon prête à lire : ouvrez la fenêtre dédiée pour parcourir l'étape en entier.</p>`),r(P.chapter)}function l(M){M>.015&&(t.started=!0),n.title.classList.toggle("hide",t.started)}function c(M,E){o(M),a(E),l(M);const P=n.quiz.classList.contains("show");n.clickHint.classList.toggle("visible",E>=0&&!P&&!t.readerOpen)}function u(M){t.readerIndex=M,t.readerOpen=!0;const E=Je[M];if(n.readerKicker.textContent=E.kicker,n.readerTitle.textContent=E.title,n.readerBody.innerHTML="",E.id==="quiz"){const P=document.createElement("ul");P.className="reader-bullets",E.bullets.forEach(N=>{const y=document.createElement("li");y.textContent=N,P.appendChild(y)}),n.readerBody.appendChild(P);const I=document.createElement("button");I.className="reader-quiz-btn",I.textContent="Lancer le questionnaire",I.addEventListener("click",d),n.readerBody.appendChild(I)}else E.content.forEach(P=>{const I=document.createElement("p"),N=document.createElement("span");N.className="body-t",N.textContent=P.t,I.appendChild(N),I.appendChild(document.createTextNode(P.b)),n.readerBody.appendChild(I)});n.readerCount.textContent=`${String(M+1).padStart(2,"0")} / ${String(Je.length).padStart(2,"0")}`,n.readerPanel.scrollTop=0,f(),n.title.classList.add("hide"),n.reader.classList.add("show"),e&&e(!0)}function d(){t.readerOpen&&(t.readerOpen=!1,n.reader.classList.remove("show"),e&&e(!1))}function h(M){if(!t.readerOpen)return;const E=Math.max(0,Math.min(Je.length-1,t.readerIndex+M));E!==t.readerIndex&&u(E)}function f(){if(!n.readerProg)return;const M=n.readerPanel.scrollHeight-n.readerPanel.clientHeight;n.readerProg.style.width=(M>0?n.readerPanel.scrollTop/M*100:100)+"%"}n.readerPanel.addEventListener("scroll",f,{passive:!0}),n.readerClose.addEventListener("click",d),n.readerPrev.addEventListener("click",()=>h(-1)),n.readerNext.addEventListener("click",()=>h(1)),n.reader.addEventListener("click",M=>{M.target===n.reader&&d()}),n.cardOpen.addEventListener("click",()=>{t.activeIndex>=0&&u(t.activeIndex)}),document.querySelector("#quiz-retry").addEventListener("click",()=>{t.quizAnswered.clear(),t.score=0,document.querySelector("#quiz-score").textContent=0,n.quizFill.style.width="0%",n.quizResult.classList.add("hide"),fu(t,n)}),document.querySelector("#quiz-restart").addEventListener("click",()=>{i&&i(!1),window.scrollTo({top:0,behavior:"smooth"})});function m(M){n.toast.textContent=M,n.toast.classList.add("show"),clearTimeout(s),s=setTimeout(()=>n.toast.classList.remove("show"),4600)}fu(t,n);function v(){return n.quiz.classList.contains("show")}function g(M){if(!v())return;const E=n.quizList.querySelectorAll(".quiz-card");for(const P of E){if(P.classList.contains("done"))continue;const I=P.querySelectorAll(".quiz-opt");M<I.length&&I[M].click();return}}const p=document.querySelectorAll(".tsize-btn");function S(M){const E=document.documentElement;E.classList.toggle("ts-sm",M===0),E.classList.toggle("ts-lg",M===2),p.forEach(P=>{const I=Number(P.dataset.tsize)===M;P.classList.toggle("active",I),P.setAttribute("aria-pressed",String(I))});try{localStorage.setItem("panneau-tsize",String(M))}catch{}}let w=1;try{const M=Number(localStorage.getItem("panneau-tsize"));M>=0&&M<=2&&(w=M)}catch{}return S(w),p.forEach(M=>M.addEventListener("click",()=>S(Number(M.dataset.tsize)))),{updateGlobal:c,el:n,openReader:u,closeReader:d,readerNav:h,showToast:m,isReaderOpen:()=>t.readerOpen,quizOpen:v,answerQuiz:g,setReaderListener:M=>{e=M},setQuizListener:M=>{i=M},setQuizShown:M=>{i&&i(M)}}}function fu(n,t){const e=t.quizList;e.innerHTML="",Ls.forEach((i,s)=>{const o=document.createElement("div");o.className="quiz-card",o.innerHTML=`
      <div class="quiz-num">Question ${String(s+1).padStart(2,"0")}</div>
      <div class="quiz-q"></div>
      <div class="quiz-opts"></div>
      <div class="quiz-explain"></div>
    `,o.querySelector(".quiz-q").textContent=i.q;const r=o.querySelector(".quiz-opts");i.options.forEach((a,l)=>{const c=document.createElement("button");c.className="quiz-opt",c.innerHTML=`<span class="opt-letter">${String.fromCharCode(65+l)}.</span> <span class="opt-text"></span>`,c.querySelector(".opt-text").textContent=a,c.addEventListener("click",()=>{if(n.quizAnswered.has(s))return;n.quizAnswered.add(s);const u=l===i.correct;r.querySelectorAll(".quiz-opt").forEach((h,f)=>{f===i.correct?h.classList.add("correct"):f===l?h.classList.add("wrong"):h.classList.add("dim")}),u&&(n.score++,document.querySelector("#quiz-score").textContent=n.score);const d=o.querySelector(".quiz-explain");d.textContent=i.explain,d.classList.add("show"),o.classList.add("done",u?"correct-q":"wrong-q"),t.quizFill.style.width=(n.quizAnswered.size/Ls.length*100).toFixed(2)+"%",n.quizAnswered.size===Ls.length&&h_(n,t)}),r.appendChild(c)}),e.appendChild(o)})}function h_(n,t){const e=Math.round(n.score/Ls.length*100);let i;e>=90?i="Excellent ! Vous maîtrisez le module sur le bout des doigts.":e>=70?i="Très bien ! Quelques points à consolider, mais la base est solide.":e>=50?i="Bien. Relisez les leçons indiquées pour consolider vos acquis.":i="Le module mérite une seconde lecture : remontez le parcours et revivez les étapes.",t.resultTitle.textContent=e>=70?"Formation validée.":"Formation à revoir.";const s=Ls.length-n.score;t.resultText.innerHTML=`Score : <strong>${n.score} / ${Ls.length}</strong> — ${i}<br><span class="result-breakdown">${n.score} bonne${n.score>1?"s":""} réponse${n.score>1?"s":""} · ${s} à revoir</span>`,t.quizResult.classList.remove("hide"),e>=70&&f_()}const pu=["#c08a68","#cfa574","#9db87f","#8a9ab8","#d2a678","#e0c9a0"];let Ri=null;function f_(){Ri||(Ri=document.createElement("div"),Ri.id="confetti-layer",document.body.appendChild(Ri));const n=110;for(let t=0;t<n;t++){const e=document.createElement("span");e.className="confetti-piece"+(Math.random()<.3?" circle":""),e.style.left=Math.random()*100+"vw",e.style.background=pu[Math.random()*pu.length|0],e.style.opacity=(.55+Math.random()*.45).toFixed(2);const i=2.4+Math.random()*2.2,s=Math.random()*.9;e.style.animation=`confettiFall ${i}s cubic-bezier(0.2, 0.6, 0.4, 1) ${s}s forwards`,Ri.appendChild(e),setTimeout(()=>e.remove(),(i+s+.2)*1e3)}setTimeout(()=>{Ri&&!Ri.childElementCount&&Ri.remove()},6200)}const Ve={sky0:"#f6edd8",sky1:"#f2e6ca",sky2:"#eee0bf",sky3:"#eadab4",sky4:"#e6d3a6",sky5:"#e2cc9a",asphalt0:"#b39a6e",asphalt1:"#c4ab7e",asphalt2:"#d0b98c",bronze:"#9a8157",terracotta:"#c08a68",amber:"#cfa574"},Zn=Math.PI*2;function qe(n,t,e,i,s,o){n.beginPath(),n.moveTo(t+o,e),n.arcTo(t+i,e,t+i,e+s,o),n.arcTo(t+i,e+s,t,e+s,o),n.arcTo(t,e+s,t,e,o),n.arcTo(t,e,t+i,e,o),n.closePath()}function De(n,t,e,i,s,o){n.font=s,n.textAlign="center",n.fillStyle=o,n.fillText(t,e,i)}function p_(n,t,e){const i=n.createLinearGradient(0,0,0,e);i.addColorStop(0,Ve.sky0),i.addColorStop(.3,Ve.sky1),i.addColorStop(.58,Ve.sky2),i.addColorStop(.78,Ve.sky3),i.addColorStop(.9,Ve.sky4),i.addColorStop(1,Ve.sky5),n.fillStyle=i,n.fillRect(0,0,t,e);const s=n.createRadialGradient(t/2,e*.6,10,t/2,e*.6,t*.72);s.addColorStop(0,"rgba(240,196,126,0.5)"),s.addColorStop(.5,"rgba(238,184,118,0.18)"),s.addColorStop(1,"rgba(238,184,118,0)"),n.fillStyle=s,n.fillRect(0,0,t,e)}function _a(n,t,e,{minH:i,maxH:s,alpha:o,body:r,win:a,density:l,tall:c=.14}){let u=-12;for(;u<t+12;){const d=22+Math.random()*52,h=i+Math.random()*(s-i);n.fillStyle=r,n.globalAlpha=o,n.fillRect(u,e-h,d,h),Math.random()<c&&(n.fillRect(u+d/2-1,e-h-12,2,12),Math.random()<.5&&(n.fillStyle="rgba(196,138,104,0.85)"),n.fillRect(u+d/2-1,e-h-12,2,2));const f=Math.floor(d/14);for(let m=0;m<f;m++)for(let v=0;v<Math.floor(h/17);v++)if(Math.random()<l){const g=u+5+m*14,p=e-h+7+v*17;n.fillStyle=a,n.globalAlpha=o*(.4+Math.random()*.6),n.fillRect(g,p,4.5,6.5),Math.random()<.28&&(n.fillStyle="rgba(170,130,80,0.45)",n.fillRect(g-1.5,p-1.5,7.5,9.5))}n.globalAlpha=1,u+=d+4+Math.random()*9}}function os(n,t,e){const i=e*.6;return p_(n,t,e),_a(n,t,i,{minH:34,maxH:92,alpha:.45,body:"#d6c095",win:"#8f7a4e",density:.3}),_a(n,t,i,{minH:20,maxH:62,alpha:.6,body:"#c9b184",win:"#7a663c",density:.5}),_a(n,t,i,{minH:13,maxH:44,alpha:.85,body:"#bda375",win:"#665430",density:.68}),m_(n,t,i),i}function m_(n,t,e){const i=n.canvas.height,s=t/2,o=n.createLinearGradient(0,e,0,i);o.addColorStop(0,Ve.asphalt0),o.addColorStop(.5,Ve.asphalt1),o.addColorStop(1,Ve.asphalt2),n.fillStyle=o,n.beginPath(),n.moveTo(s-1,e),n.lineTo(-40,i+20),n.lineTo(t+40,i+20),n.lineTo(s+1,e),n.closePath(),n.fill();const r=n.createRadialGradient(t/2,e+(i-e)*.38,6,t/2,e+(i-e)*.38,t*.24);r.addColorStop(0,"rgba(160,120,60,0.18)"),r.addColorStop(1,"rgba(160,120,60,0)"),n.fillStyle=r,n.fillRect(0,e,t,i-e),n.strokeStyle="rgba(90,70,40,0.55)",n.lineWidth=2,n.setLineDash([16,30]),n.beginPath(),n.moveTo(s,e+2),n.lineTo(s,i+20),n.stroke(),n.setLineDash([]),n.strokeStyle="rgba(90,70,40,0.25)",n.lineWidth=3;for(const a of[-1,1])n.beginPath(),n.moveTo(s+a*1.2,e+2),n.lineTo(t/2+a*t*.48,i+10),n.stroke()}function Ii(n,t,e,i,s){n.save(),n.translate(t,e),n.rotate(s||0),n.globalAlpha=.34,n.fillStyle="#000",n.beginPath(),n.ellipse(0,0,62*i,10*i,0,0,Zn),n.fill(),n.globalAlpha=1;const o=n.createLinearGradient(-46*i,0,-38*i,0);o.addColorStop(0,"#6b5230"),o.addColorStop(1,"#8a6f45"),n.fillStyle=o,n.fillRect(-46*i,-80*i,9*i,80*i),n.fillRect(37*i,-80*i,9*i,80*i);const r=134*i,a=98*i,l=-r/2,c=-186*i;qe(n,l,c,r,a,7*i),n.fillStyle="#f7eeda",n.fill(),n.lineWidth=5*i,n.strokeStyle=Ve.bronze,n.stroke();const u=n.createLinearGradient(0,c,0,c+a);u.addColorStop(0,"#fdf8ec"),u.addColorStop(1,"#f1e6cb"),qe(n,l+7*i,c+7*i,r-14*i,a-14*i,5*i),n.fillStyle=u,n.fill(),n.fillStyle=Ve.terracotta,n.fillRect(l+7*i,c+7*i,r-14*i,5*i),n.strokeStyle="rgba(90,70,40,0.3)",n.lineWidth=1.5*i,qe(n,l+13*i,c+15*i,r-26*i,a-26*i,4*i),n.stroke(),De(n,"PANNEAUTIQUE · DOMAINE PUBLIC",0,c+34*i,`600 ${Math.max(7,9*i)}px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif`,"#7a5f38"),De(n,"PUBLICITÉ & AFFICHAGE",0,c+60*i,`700 ${Math.max(10,15*i)}px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif`,"#3a2e1f"),De(n,"RÈGLES · ZONES · CONCESSIONS",0,c+80*i,`700 ${Math.max(6,8*i)}px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif`,"#b3825e"),n.fillStyle=Ve.amber,n.shadowColor=Ve.amber,n.shadowBlur=16*i,n.beginPath(),n.arc(0,c-6*i,3*i,0,Zn),n.fill(),n.shadowBlur=0;const d=n.createRadialGradient(0,-70*i,4,0,-70*i,48*i);d.addColorStop(0,"rgba(232,163,92,0.2)"),d.addColorStop(1,"rgba(232,163,92,0)"),n.fillStyle=d,n.fillRect(-64*i,-124*i,128*i,64*i),n.restore()}function g_(n,t,e,i,s){n.save(),n.translate(t,e),n.strokeStyle="#6b5230",n.lineCap="round",n.lineWidth=Math.max(3,i*.035),n.beginPath(),n.moveTo(0,0),n.quadraticCurveTo(10,-i*.5,5,-i*.94),n.stroke(),n.fillStyle="#5f7a4a";for(let o=0;o<6;o++){const r=-Math.PI*.95+o/5*Math.PI*.62;n.beginPath(),n.ellipse(Math.cos(r)*i*.34,-i*.97+Math.sin(r)*i*.1,i*.3,i*.05,r-Math.PI/2,0,Zn),n.fill()}n.restore()}function Ao(n,t,e,i){const s=n.canvas.width,o=n.canvas.height;n.fillStyle="rgba(253,250,242,0.9)",n.fillRect(0,e,s,o-e),n.fillStyle="rgba(138,111,69,0.35)",n.fillRect(0,e,s,2),De(n,t,s/2,e+i*1.45,`700 ${i}px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif`,"#7a5f38")}function bn(n,t,e,i){const s=n.createRadialGradient(t/2,i,4,t/2,i,e*.6);s.addColorStop(0,"rgba(240,200,140,0.2)"),s.addColorStop(1,"rgba(240,200,140,0)"),n.fillStyle=s,n.fillRect(0,0,t,e);const o=n.createRadialGradient(t/2,e*.45,t*.2,t/2,e*.5,t*.74);o.addColorStop(0,"rgba(0,0,0,0)"),o.addColorStop(1,"rgba(140,115,75,0.3)"),n.fillStyle=o,n.fillRect(0,0,t,e);const r=n.createLinearGradient(0,0,0,e*.42);r.addColorStop(0,"rgba(120,95,55,0.14)"),r.addColorStop(1,"rgba(120,95,55,0)"),n.fillStyle=r,n.fillRect(0,0,t,e*.42),n.globalAlpha=.055;for(let a=0;a<420;a++)n.fillStyle=Math.random()>.5?"#fff":"#000",n.fillRect(Math.random()*t,Math.random()*e,1,1);n.globalAlpha=1}function Gl(n,t,e){const i=n.createLinearGradient(0,0,0,e);i.addColorStop(0,"#f3ead4"),i.addColorStop(.7,"#e6d8ba"),i.addColorStop(1,"#d9c8a2"),n.fillStyle=i,n.fillRect(0,0,t,e),n.fillStyle="rgba(120,95,55,0.18)";for(let c=0;c<5;c++)n.fillRect(t*(.04+c*.2),e*.05,t*.14,e*.44);const s=t*.6,o=e*.1,r=t*.26,a=e*.36;qe(n,s,o,r,a,8);const l=n.createLinearGradient(0,o,0,o+a);l.addColorStop(0,"#cfe0e2"),l.addColorStop(1,"#f0e2c0"),n.fillStyle=l,n.fill(),n.strokeStyle="#7a5f38",n.lineWidth=6,qe(n,s,o,r,a,8),n.stroke(),n.strokeStyle="rgba(90,70,40,0.4)",n.lineWidth=3,n.beginPath(),n.moveTo(s+r/2,o),n.lineTo(s+r/2,o+a),n.moveTo(s,o+a/2),n.lineTo(s+r,o+a/2),n.stroke()}function Hl(n,t,e){const i=e*.64,s=n.createLinearGradient(0,i,0,e);s.addColorStop(0,"#b08a5c"),s.addColorStop(.2,"#96714a"),s.addColorStop(1,"#6b4f30"),n.fillStyle=s,n.beginPath(),n.moveTo(t*.05,i),n.lineTo(t*.95,i),n.lineTo(t*.85,e),n.lineTo(t*.15,e),n.fill(),n.fillStyle="#7a5f3c",n.beginPath(),n.moveTo(t*.12,e*.8),n.lineTo(t*.88,e*.8),n.lineTo(t*.85,e),n.lineTo(t*.15,e),n.fill(),n.fillStyle="rgba(255,240,210,0.35)",n.beginPath(),n.moveTo(t*.05,i),n.lineTo(t*.95,i),n.lineTo(t*.93,i+10),n.lineTo(t*.07,i+10),n.fill()}function Er(n,t,e,i,s,o,r){if(n.save(),n.translate(t,e),n.rotate(o||0),n.shadowColor="rgba(0,0,0,0.4)",n.shadowBlur=18,n.shadowOffsetY=10,qe(n,-i/2,-s/2,i,s,4),n.fillStyle="#f4ead0",n.fill(),n.shadowBlur=0,n.strokeStyle="rgba(120,100,70,0.5)",n.lineWidth=2,n.stroke(),n.fillStyle=Ve.terracotta,n.fillRect(-i/2,-s/2,i,s*.06),r){const a=typeof r=="number"?r:r.length;n.fillStyle="rgba(60,50,34,0.5)";for(let l=0;l<a;l++)n.fillRect(-i*.36,-s*.26+l*s*.09,i*.72,s*.02)}n.restore()}function hd(n,t,e){const i=n.createLinearGradient(0,0,0,e);i.addColorStop(0,"#efe7d3"),i.addColorStop(1,"#e0d3b6"),n.fillStyle=i,n.fillRect(0,0,t,e);for(let s=0;s<80;s++){const o=22+Math.random()*64,r=14+Math.random()*42;n.fillStyle=`rgba(178,166,138,${(.12+Math.random()*.2).toFixed(3)})`,n.fillRect(Math.random()*(t-o),Math.random()*(e-r),o,r)}n.fillStyle="rgba(120,162,184,0.4)",n.beginPath(),n.moveTo(0,e*.06),n.bezierCurveTo(t*.3,e*0,t*.62,e*.12,t*.8,e*.05),n.lineTo(t*.88,0),n.lineTo(0,0),n.fill(),n.strokeStyle="rgba(120,104,80,0.55)",n.lineWidth=2.5;for(let s=0;s<7;s++){const o=e*(.13+s*.13);n.beginPath(),n.moveTo(0,o),n.bezierCurveTo(t*.3,o+20,t*.6,o-20,t,o+8),n.stroke()}for(let s=0;s<9;s++){const o=t*(.1+s*.1);n.beginPath(),n.moveTo(o,0),n.bezierCurveTo(o+16,e*.3,o-16,e*.62,o+10,e),n.stroke()}n.lineWidth=5,n.strokeStyle="rgba(193,104,63,0.4)",n.beginPath(),n.moveTo(0,e*.2),n.bezierCurveTo(t*.35,e*.26,t*.55,e*.55,t*.84,e*.72),n.stroke(),n.save(),n.translate(t*.06,e*.09),n.fillStyle="rgba(255,255,255,0.65)",n.beginPath(),n.arc(0,0,26,0,Zn),n.fill(),n.strokeStyle="rgba(90,74,52,0.6)",n.lineWidth=2,n.stroke(),n.fillStyle=Ve.terracotta,n.beginPath(),n.moveTo(0,-18),n.lineTo(5,0),n.lineTo(-5,0),n.closePath(),n.fill(),De(n,"N",0,-32,"700 15px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","rgba(90,74,52,0.9)"),n.restore()}function ao(n,t,e,i,s){n.save(),n.shadowColor="rgba(0,0,0,0.4)",n.shadowBlur=8,n.shadowOffsetY=4,n.fillStyle=i,n.beginPath(),n.moveTo(t,e-34),n.quadraticCurveTo(t+16,e-4,t+12,e-2),n.lineTo(t,e+6),n.lineTo(t-12,e-2),n.quadraticCurveTo(t-16,e-4,t,e-34),n.fill(),n.shadowBlur=0,n.fillStyle="#fff",n.beginPath(),n.arc(t,e-30,7.5,0,Zn),n.fill(),n.fillStyle=i,n.beginPath(),n.arc(t,e-30,3.5,0,Zn),n.fill(),s&&(n.font="800 19px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",n.lineWidth=4,n.strokeStyle="rgba(240,236,220,0.9)",n.strokeText(s,t+17,e-22),n.fillStyle="#2a2118",n.fillText(s,t+17,e-22)),n.restore()}function Ma(n,t,e,i,s,o,r,a){const l=Math.PI*.75,c=Math.PI*1.5;n.lineCap="round",n.beginPath(),n.arc(t,e,i,l,l+c),n.strokeStyle="rgba(110,90,55,0.22)",n.lineWidth=14,n.stroke();const u=n.createLinearGradient(t-i,0,t+i,0);u.addColorStop(0,Ve.terracotta),u.addColorStop(1,s),n.beginPath(),n.arc(t,e,i,l,l+c*o),n.strokeStyle=u,n.lineWidth=14,n.stroke(),De(n,String(Math.round(o*100))+"%",t,e+8,"800 34px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#3a2e1f"),De(n,r,t,e+i*.78+8,"700 18px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","rgba(90,74,52,0.75)")}function fd(n,t,e){const i=os(n,t,e);g_(n,t*.1,i+20,e*.5),Ii(n,t*.5,i+2,1.12,0),Ao(n,"LE PARCOURS DE LA PANNEAUTIQUE SUR LE DOMAINE PUBLIC",e*.86,e*.03),bn(n,t,e,i)}function v_(n,t,e){const i=os(n,t,e),s=5;for(let o=0;o<s;o++){const r=o===2,a=t*(.14+o*.18),l=i+(e-i)*.82*Math.pow(1-o/(s-1),.7)*.85+i*.12,c=.5+.18*o+(r?.12:0);Ii(n,a,Math.min(l,e-10),c,r?0:(o-2)*.05)}De(n,"LA PANNEAUTIQUE, LEVIER ÉCONOMIQUE DU DOMAINE PUBLIC",t/2,e*.3,"700 34px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#3a2e1f"),n.shadowColor="rgba(255,255,255,0.75)",n.shadowBlur=12,De(n,"CHAQUE SUPPORT EST UNE RESSOURCE",t/2,e*.34,"600 20px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#b3825e"),n.shadowBlur=0,bn(n,t,e,i)}function __(n,t,e){const i=os(n,t,e);Ii(n,t*.2,i+2,1,-.1),Ii(n,t*.46,i-6,.9,.12),Ii(n,t*.68,i+2,.75,-.26),Ii(n,t*.3,i+(e-i)*.7,.55,.38);const s=i+(e-i)*.92;n.fillStyle="rgba(253,250,242,0.92)",qe(n,t*.05,s,t*.34,e*.05,4),n.fill();for(let o=0;o<12;o++)o%2===0?n.fillStyle="#cfa574":n.fillStyle="#7a5f38",n.fillRect(t*.055+o*t*.027,s+e*.008,t*.027,e*.034);De(n,"PANNEAUX ANARCHIQUES — LE CONSTAT",t/2,s-e*.02,"700 28px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#3a2e1f"),bn(n,t,e,i)}function M_(n,t,e){Gl(n,t,e),Hl(n,t,e),Er(n,t*.3,e*.56,t*.3,e*.3,-.04,8),Er(n,t*.48,e*.6,t*.26,e*.26,.03,6);const i=t*.74,s=e*.56;n.save(),n.translate(i,s),n.shadowColor="rgba(0,0,0,0.45)",n.shadowBlur=16,n.shadowOffsetY=8,qe(n,-t*.14,-e*.14,t*.28,e*.28,6),n.fillStyle="#e8d9b8",n.fill(),n.shadowBlur=0,n.strokeStyle="rgba(150,120,70,0.5)",n.stroke(),n.fillStyle=Ve.terracotta,n.fillRect(-t*.14,-e*.14,t*.28,e*.035),n.fillStyle="#3a2a18";for(let o=0;o<6;o++)n.fillRect(-t*.11,-e*.08+o*e*.045,t*.22,e*.012);n.fillStyle="#57a05f";for(let o=0;o<4;o++)n.beginPath(),n.arc(-t*.11,-e*.08+o*e*.045,e*.014,0,Zn),n.fill();De(n,"LISTE DE CONTRÔLE",0,e*.11,"700 "+e*.028+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#2a2118"),n.restore(),n.save(),n.translate(t*.5,e*.42),n.rotate(.05),n.shadowColor="rgba(0,0,0,0.4)",n.shadowBlur=14,n.fillStyle="#4a3a26",qe(n,-t*.11,-e*.02,t*.09,e*.05,6),n.fill(),n.shadowBlur=0,n.fillStyle="#f4ead0",qe(n,-t*.1,-e*.016,t*.012,e*.044,3),n.fill(),n.restore(),Ao(n,"AUDIT : COMPRENDRE AVANT D'AGIR",e*.9,e*.032),bn(n,t,e,e*.5)}function y_(n,t,e){hd(n,t,e),n.strokeStyle="rgba(193,104,63,0.85)",n.lineWidth=4,n.setLineDash([12,9]),n.beginPath(),n.moveTo(t*.16,e*.2),n.bezierCurveTo(t*.38,e*.34,t*.55,e*.5,t*.84,e*.74),n.stroke(),n.setLineDash([]),ao(n,t*.16,e*.2,"#c97a62","P1"),ao(n,t*.32,e*.42,"#7d9ec2","P2"),ao(n,t*.5,e*.58,"#d2a878","P3"),ao(n,t*.7,e*.72,"#8fae8a","P4"),ao(n,t*.85,e*.8,"#c97a62","P5"),n.fillStyle="rgba(240,236,220,0.92)",qe(n,t*.62,e*.07,t*.3,e*.22,6),n.fill(),n.strokeStyle="rgba(150,120,70,0.5)",n.stroke(),De(n,"ÉTAT DES LIEUX — GPS",t*.77,e*.12,"700 "+e*.03+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#2a2118"),[["#c97a62","Support signalé"],["#7d9ec2","À vérifier"],["#8fae8a","Conforme"]].forEach(([s,o],r)=>{n.fillStyle=s,n.beginPath(),n.arc(t*.66,e*.16+r*e*.038,e*.013,0,Zn),n.fill(),n.fillStyle="#4a3a28",n.font="500 "+e*.02+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",n.textAlign="left",n.fillText(o,t*.69,e*.166+r*e*.038)}),Ao(n,"RELEVÉ GPS DE TOUS LES SUPPORTS",e*.88,e*.032),bn(n,t,e,e*.8)}function x_(n,t,e){hd(n,t,e),[[.05,.1,.3,.34,"rgba(125,158,194,0.38)","ZONE A"],[.39,.06,.32,.3,"rgba(192,138,104,0.4)","ZONE B"],[.11,.5,.34,.34,"rgba(143,174,138,0.38)","ZONE C"],[.5,.44,.36,.42,"rgba(207,165,116,0.4)","ZONE D"]].forEach(([s,o,r,a,l,c])=>{n.fillStyle=l,n.fillRect(t*s,e*o,t*r,e*a),n.strokeStyle="rgba(50,40,28,0.55)",n.lineWidth=2.5,n.setLineDash([9,6]),n.strokeRect(t*s,e*o,t*r,e*a),n.setLineDash([]),n.fillStyle="rgba(20,14,8,0.65)",qe(n,t*s+t*.012,e*o+e*.02,t*.09,e*.045,4),n.fill(),De(n,c,t*s+t*.057,e*o+e*.052,"800 "+e*.026+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#fff")}),n.fillStyle="rgba(240,236,220,0.94)",qe(n,t*.05,e*.86,t*.9,e*.11,6),n.fill(),n.strokeStyle="rgba(150,120,70,0.5)",n.stroke(),De(n,"ZONAGE : LE TERRITOIRE DÉCOUPÉ EN ZONES RÉGLEMENTÉES",t*.5,e*.925,"700 "+e*.035+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#2a2118"),bn(n,t,e,e*.85)}function S_(n,t,e){const i=os(n,t,e),s=i+(e-i)*.72;Ii(n,t*.74,s,.72,-.04);const o=t*.3,r=i+(e-i)*.6;n.fillStyle="#f7eeda",qe(n,o-t*.16,r-e*.06,t*.32,e*.06,4),n.fill(),n.strokeStyle=Ve.bronze,n.lineWidth=4,n.stroke(),n.fillStyle="rgba(90,70,40,0.35)";for(let a=0;a<5;a++)n.fillRect(o-t*.14+a*t*.06,r-e*.052,t*.045,e*.044);De(n,"MOBILIER URBAIN DE PUBLICITÉ — LOT N° 01",o,r-e*.09,"700 "+e*.034+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#3a2e1f"),De(n,"DES LOTS COHÉRENTS POUR UN FINANCEMENT MAÎTRISÉ",t/2,e*.24,"700 26px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#3a2e1f"),bn(n,t,e,i)}function w_(n,t,e){Gl(n,t,e),Hl(n,t,e),Er(n,t*.42,e*.55,t*.46,e*.4,-.02,10),De(n,"CONVENTION DE CONCESSION",t*.42,e*.34,"700 "+e*.036+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#2a2118");const i=t*.62,s=e*.66;n.save(),n.translate(i,s),n.rotate(-.14),n.fillStyle="#b03a30",qe(n,-t*.07,-e*.028,t*.14,e*.056,6),n.fill(),n.strokeStyle="#7c241c",n.lineWidth=3,qe(n,-t*.07,-e*.028,t*.14,e*.056,6),n.stroke(),De(n,"CONCÉDÉ",0,e*.012,"800 "+e*.03+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#f4ead0"),n.restore(),n.save(),n.translate(t*.26,e*.62),n.rotate(.12),n.strokeStyle="#2a2118",n.lineWidth=3,n.lineCap="round",n.beginPath(),n.moveTo(-t*.02,e*.05),n.lineTo(0,0),n.lineTo(t*.012,-e*.06),n.moveTo(0,0),n.lineTo(-t*.02,-e*.02),n.stroke(),n.restore(),Ao(n,"MISE EN CONCESSION DES ESPACES PUBLICITAIRES",e*.9,e*.032),bn(n,t,e,e*.5)}function b_(n,t,e){Gl(n,t,e),Hl(n,t,e),Er(n,t*.34,e*.56,t*.42,e*.36,-.02,8),De(n,"CAHIER DES CHARGES",t*.34,e*.36,"700 "+e*.034+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#2a2118");const i=t*.55,s=e*.62;n.save(),n.translate(i,s),n.rotate(-.2),n.fillStyle="#57a05f",qe(n,-t*.1,-e*.042,t*.2,e*.084,8),n.fill(),n.strokeStyle="#3a703f",n.lineWidth=4,qe(n,-t*.1,-e*.042,t*.2,e*.084,8),n.stroke(),De(n,"ADMIS",0,e*.012,"800 "+e*.055+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#f4f0d8"),n.restore(),Ao(n,"ATTRIBUTION DES LOTS PAR APPEL D'OFFRES",e*.9,e*.032),bn(n,t,e,e*.5)}function E_(n,t,e){const i=os(n,t,e),s=t/2,o=t*.42,r=e*.46;n.fillStyle="#d3bd92",n.fillRect(s-o/2,i-r,o,r),n.fillStyle="#c9b184";for(let u=0;u<5;u++)n.fillRect(s-o/2+u*o/5+4,i-r,o/5-8,r);n.fillStyle="rgba(160,120,60,0.55)";for(let u=0;u<6;u++)for(let d=0;d<2;d++)Math.random()<.7&&n.fillRect(s-o/2+d*o/2+o*.08,i-r+r*.1+u*r*.13,o*.18,r*.06);const a=i-r*.18;n.fillStyle="#6b5230",n.fillRect(s-t*.03,a-e*.045,t*.06,e*.045),De(n,"RÉGIE PUBLICITAIRE",s,a-e*.055,"700 "+e*.026+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#3a2e1f");const l=s,c=i-r-e*.08;n.strokeStyle="#4a3a26",n.lineWidth=4,n.beginPath(),n.moveTo(l,c+e*.14),n.lineTo(l,c),n.stroke(),n.fillStyle="#c08a68",n.beginPath(),n.moveTo(l,c-e*.03),n.lineTo(l-t*.012,c),n.lineTo(l+t*.012,c),n.fill(),De(n,"GESTION PAR LES RÉGIES : UN SERVICE EN RÈGIE DIRECTE",t/2,e*.22,"700 26px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#3a2e1f"),bn(n,t,e,i)}function T_(n,t,e){const i=n.createLinearGradient(0,0,0,e);i.addColorStop(0,"#efe5cd"),i.addColorStop(1,"#e4d5b4"),n.fillStyle=i,n.fillRect(0,0,t,e),n.fillStyle="#faf3e2",qe(n,t*.05,e*.08,t*.9,e*.84,10),n.fill(),n.strokeStyle="rgba(138,111,69,0.5)",n.lineWidth=3,n.stroke(),Ma(n,t*.25,e*.38,e*.14,Ve.amber,.9,"AUDIT"),Ma(n,t*.5,e*.38,e*.14,Ve.terracotta,.78,"CONCESSION"),Ma(n,t*.75,e*.38,e*.14,"#7da878",.86,"GESTION"),n.strokeStyle="#7da878",n.lineWidth=4,n.beginPath(),n.moveTo(t*.12,e*.68),n.bezierCurveTo(t*.24,e*.6,t*.3,e*.66,t*.42,e*.55),n.bezierCurveTo(t*.55,e*.62,t*.6,e*.5,t*.72,e*.5),n.bezierCurveTo(t*.8,e*.48,t*.86,e*.42,t*.9,e*.4),n.stroke(),n.fillStyle="#7da878",n.beginPath(),n.arc(t*.9,e*.4,7,0,Zn),n.fill(),De(n,"ÉVALUATION DU SYSTÈME",t/2,e*.93,"700 "+e*.036+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#7a5f38"),bn(n,t,e,e*.5)}function A_(n,t,e){const i=os(n,t,e);[[t*.24,e*.4],[t*.62,e*.5],[t*.84,e*.34]].forEach(([o,r])=>{const a=i-r;n.strokeStyle="#5c4a30",n.lineWidth=6,n.lineCap="butt",n.beginPath(),n.moveTo(o-18,i),n.lineTo(o+12,a),n.lineTo(o+46,a+16),n.moveTo(o+12,a),n.lineTo(o+12,a+60),n.moveTo(o+12,a+14),n.lineTo(o+58,a+26),n.stroke(),n.lineWidth=3,n.strokeStyle="#4a3a26",n.beginPath(),n.moveTo(o-8,a+26),n.lineTo(o+58,a+32),n.stroke()}),Ii(n,t*.5,i+(e-i)*.78,.62,-.1),De(n,"LE SECTEUR SE MODERNISE, LE PARC S'ADAPTE",t/2,e*.24,"700 28px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#3a2e1f"),bn(n,t,e,i)}function C_(n,t,e){const i=os(n,t,e);n.fillStyle="rgba(253,250,242,0.93)",qe(n,t*.2,e*.12,t*.6,e*.72,18),n.fill(),n.strokeStyle="rgba(138,111,69,0.5)",n.lineWidth=3,n.stroke(),n.fillStyle="rgba(201,143,78,0.16)",n.beginPath(),n.arc(t*.5,e*.42,e*.22,0,Zn),n.fill(),n.strokeStyle="rgba(201,143,78,0.4)",n.lineWidth=3,n.stroke(),n.fillStyle="#7a5f38",n.font="800 "+e*.26+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",n.textAlign="center",n.fillText("?",t*.5,e*.52),De(n,"12 QUESTIONS — VALIDEZ VOS ACQUIS",t*.5,e*.72,"700 "+e*.034+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#3a2e1f"),De(n,"DÉFINITIONS · ZONES · CONCESSIONS · RÈGIES",t*.5,e*.79,"500 "+e*.02+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#b3825e"),bn(n,t,e,i)}const R_={presentation:fd,"lecon1-importance":v_,"lecon2-constat":__,audit:M_,"etat-lieux":y_,zonage:x_,"constitution-lots":S_,"mise-concession":w_,attribution:b_,gestion:E_,evaluation:T_,"mise-a-jour":A_,quiz:C_};function P_(n,t,e,i){n.width=e,n.height=i;const s=n.getContext("2d");(R_[t]||fd)(s,e,i)}const Is=Math.PI*2;let qi=null,Tr=!1;function L_(){if(Tr)return null;if(!qi)try{const n=document.createElement("canvas");qi=new Ul({canvas:n,antialias:!0,alpha:!1,preserveDrawingBuffer:!0}),qi.toneMapping=wo,qi.toneMappingExposure=1.2,qi.shadowMap.enabled=!0,qi.shadowMap.type=yl}catch(n){return Tr=!0,console.warn("Illustrations 3D indisponibles (WebGL) — fallback 2D.",n),null}return qi}function ci(n,t=1024,e=1024){const i=document.createElement("canvas");i.width=t,i.height=e;const s=i.getContext("2d");n(s,t,e);const o=new tn(i);return o.colorSpace=ye,o.anisotropy=4,o}function _o(n,t,e,i,s,o){n.beginPath(),n.moveTo(t+o,e),n.arcTo(t+i,e,t+i,e+s,o),n.arcTo(t+i,e+s,t,e+s,o),n.arcTo(t,e+s,t,e,o),n.arcTo(t,e,t+i,e,o),n.closePath()}function Vn(n=0){const t=["sunset","waves","dune","rings","prism","ember"],e=t[n%t.length];return ci((i,s,o)=>{const r=i.createLinearGradient(0,0,s*(n%2?1:-1),o);if(r.addColorStop(0,["#8a6a4e","#96745a","#7d6350"][n%3]),r.addColorStop(1,["#c29a78","#c9a280","#b08c6e"][(n+1)%3]),i.fillStyle=r,i.fillRect(0,0,s,o),i.fillStyle="rgba(242,232,212,0.9)",i.beginPath(),i.arc(s*.5,o*.38,o*.2,0,Is),i.fill(),i.fillStyle="rgba(232,163,92,0.95)",i.beginPath(),i.arc(s*.5,o*.38,o*.13,0,Is),i.fill(),i.strokeStyle="rgba(242,232,212,0.5)",i.lineWidth=8,e==="waves"||e==="rings")for(let a=0;a<4;a++)i.beginPath(),i.arc(s*.5,o*.4,o*(.24+a*.08),0,Is),i.stroke();else for(let a=0;a<3;a++)i.beginPath(),i.moveTo(s*.2,o*(.72-a*.14)),i.quadraticCurveTo(s*.5,o*(.6-a*.14),s*.8,o*(.72-a*.14)),i.stroke();i.fillStyle="rgba(242,232,212,0.28)",i.fillRect(s*.16,o*.84,s*.68,3)},512,384)}function ya(n,t){const e=new pn([new b(0,0,-20),new b(0,0,140)]);return cd(n,e,.5,1,t).group}function Xi(n,t={}){const e=new Tt,i=new $({color:ie.walnut,roughness:.8,metalness:.05}),s=new $({color:ie.bronze,roughness:.55,metalness:.35}),o=t.w??6.6,r=t.h??4.4,a=new R(new ft(o,r,.22),i);a.position.y=3,a.castShadow=!0,e.add(a);const l=new R(new ft(o+.4,.26,.3),s);l.position.y=r+.92,e.add(l);const c=new R(new ft(o+.4,.26,.3),s);c.position.y=.72,e.add(c);const u=new $e({map:n}),d=new R(new Jt(o-.4,r-.4),u);return d.position.set(0,3,.13),e.add(d),e}function I_(n){const t=new Tt,e=new $({color:ie.walnutDark,roughness:.7,metalness:.2}),i=new R(new Rt(.09,.12,3.4,8),e);i.position.y=1.7,i.castShadow=!0,t.add(i);const s=new $e({map:n}),o=new R(new Jt(1.5,2.1),s);o.position.y=3.9,t.add(o);const r=new R(new Rt(.14,.1,.24,8),e);return r.position.y=5.15,t.add(r),t}function D_(n){const t=new Tt,e=new $({color:4864550,roughness:.5,metalness:.5}),i=new $({color:10336447,roughness:.15,metalness:.4,transparent:!0,opacity:.5}),s=new $({color:ie.bronze,roughness:.5,metalness:.45});for(const u of[-2.2,2.2]){const d=new R(new Rt(.08,.1,2.8,8),e);d.position.set(u,1.4,0),t.add(d)}const o=new R(new ft(5.4,.16,2.6),s);o.position.y=2.9,o.rotation.x=.06,t.add(o);const r=new R(new ft(5.4,2.1,.1),i);r.position.set(0,1.75,-1.15),t.add(r);const a=new R(new ft(4.4,.08,.4),new $({color:7031340}));a.position.set(0,.5,-.3),t.add(a);const l=new $e({map:n}),c=new R(new Jt(3.4,2),l);return c.position.set(0,1.9,.14),t.add(c),t}function U_(n){const t=new Tt,e=new R(new ft(2.6,2.6,.5),new $({color:ie.walnut,roughness:.7}));e.position.y=1.3,t.add(e);const i=new $e({map:n}),s=new R(new Jt(2.2,2),i);s.position.set(0,1.35,.27),t.add(s);const o=new R(new ft(3,.12,1),new $({color:ie.bronze,roughness:.5,metalness:.4}));return o.position.y=2.72,t.add(o),t}function mu(n=!1){return ci((t,e,i)=>{const s=t.createLinearGradient(0,0,0,i);s.addColorStop(0,"#efe7d3"),s.addColorStop(1,"#dcc9a6"),t.fillStyle=s,t.fillRect(0,0,e,i);for(let o=0;o<70;o++){const r=24+Math.random()*90,a=14+Math.random()*60;t.fillStyle=`rgba(178,166,138,${(.1+Math.random()*.22).toFixed(3)})`,t.fillRect(Math.random()*(e-r),Math.random()*(i-a),r,a)}t.fillStyle="rgba(120,162,184,0.35)",t.fillRect(0,0,e*.16,i*.12),t.fillRect(e*.82,i*.72,e*.18,i*.28),t.fillStyle="rgba(109,168,124,0.35)",t.fillRect(e*.6,i*.08,e*.28,i*.18),t.strokeStyle="rgba(120,104,80,0.5)",t.lineWidth=3;for(let o=0;o<6;o++){const r=i*(.1+o*.16);t.beginPath(),t.moveTo(0,r),t.bezierCurveTo(e*.3,r+16,e*.6,r-14,e,r+8),t.stroke()}for(let o=0;o<7;o++){const r=e*(.08+o*.14);t.beginPath(),t.moveTo(r,0),t.bezierCurveTo(r+14,i*.3,r-12,i*.62,r+8,i),t.stroke()}n&&[[.08,.12,.3,.34,"rgba(125,158,194,0.36)"],[.44,.1,.3,.3,"rgba(192,138,104,0.38)"],[.12,.52,.32,.32,"rgba(143,174,138,0.36)"],[.5,.5,.36,.38,"rgba(207,165,116,0.38)"]].forEach(([r,a,l,c,u])=>{t.fillStyle=u,t.fillRect(e*r,i*a,e*l,i*c),t.strokeStyle="rgba(50,40,28,0.6)",t.lineWidth=4,t.setLineDash([12,8]),t.strokeRect(e*r,i*a,e*l,i*c),t.setLineDash([])})},1024,1024)}function gu(n){const t=new Tt,e=new $({color:n,roughness:.5,metalness:.2,emissive:n,emissiveIntensity:.5}),i=new R(new an(.28,.7,12),e);i.position.y=.7,t.add(i);const s=new R(new oe(.16,10,8),e);return s.position.y=1.15,t.add(s),t}function xa(){const n=new Tt,t=new $({color:9071429,roughness:.6,metalness:.05}),e=new $({color:4864550,roughness:.8}),i=new R(new ft(3.4,.14,1.5),t);i.position.y=1,i.castShadow=!0,n.add(i);for(const[s,o]of[[-1.5,-.6],[1.5,-.6],[-1.5,.6],[1.5,.6]]){const r=new R(new ft(.12,1,.12),e);r.position.set(s,.5,o),n.add(r)}return n}function N_(n=.85,t=1.15,e=0){const i=new Tt,s=new R(new ft(n,.02,t),new $({color:16050896,roughness:.85}));i.add(s);const o=new Fe({color:7034424});for(let r=0;r<5;r++){const a=new R(new ft(n*.72,.005,.02),o);a.position.set(0,.012,t*.32-r*t*.14),i.add(a)}return i.rotation.y=e,i}function z_(){const n=new Tt,t=new R(new ft(.72,.03,.98),new $({color:13215850,roughness:.6}));n.add(t);const e=new R(new Jt(.62,.86),new $({color:16050896,roughness:.9}));e.position.set(0,.02,.02),n.add(e);const i=new R(new ft(.2,.06,.3),new $({color:6048304,metalness:.6,roughness:.3}));return i.position.set(0,.05,.42),n.add(i),n}function F_(n=.2){const t=new Tt,e=new R(new Yn(.34,.05,12,28),new $({color:ie.bronze,roughness:.3,metalness:.7}));t.add(e);const i=new R(new $n(.33,28),new $({color:12574950,transparent:!0,opacity:.35,roughness:.05,metalness:.4}));t.add(i);const s=new R(new Rt(.035,.05,.5,10),new $({color:4864550,roughness:.7}));return s.position.set(-.4,-.15,0),s.rotation.z=.9,t.add(s),t.rotation.x=n,t}function Sa(n=16758896){const t=new Tt,e=new $({color:4864550,roughness:.4,metalness:.6}),i=new R(new Rt(.28,.34,.1,16),e);i.position.y=.05,t.add(i);const s=new R(new Rt(.05,.05,1.1,10),e);s.position.y=.65,t.add(s);const o=new R(new ft(.9,.05,.05),e);o.position.set(.42,1.25,0),t.add(o);const r=new R(new an(.16,.22,14),e);r.position.set(.85,1.28,0),r.rotation.z=-Math.PI/2,t.add(r);const a=new R(new oe(.07,10,8),new $({color:n,emissive:n,emissiveIntensity:2.2}));a.position.set(.9,1.18,0),t.add(a);const l=new Bl(n,1.6,9,2);return l.position.set(.9,1.1,0),t.add(l),{g:t,light:l}}function O_(){const n=new Tt,t=new R(new Rt(.05,.05,.8,12),new $({color:3813154,roughness:.4,metalness:.5}));t.position.y=.4,n.add(t);const e=new R(new an(.05,.16,12),new $({color:ie.bronze,metalness:.8,roughness:.3}));e.position.y=-.02,e.rotation.x=Math.PI,n.add(e);const i=new R(new Rt(.055,.055,.18,12),new $({color:12151365,roughness:.5}));return i.position.y=.92,n.add(i),n}function vu(n=11549232,t="CONCÉDÉ"){const e=new Tt,i=new R(new Rt(.42,.42,.24,20),new $({color:n,roughness:.5}));e.add(i);const s=new R(new Rt(.12,.14,.3,12),new $({color:4864550,roughness:.6}));s.position.y=.27,e.add(s);const o=new R(new Yn(.42,.03,8,24),new $({color:16050896,roughness:.6}));return o.rotation.x=Math.PI/2,o.position.y=.121,e.add(o),e}function B_(){const n=new Tt,t=new $({color:9071165,roughness:.5}),e=new R(new Rt(.05,.06,.9,12),t);e.rotation.z=Math.PI/2,n.add(e);const i=new R(new Rt(.14,.14,.34,12),t);return i.position.set(.55,.12,0),i.rotation.z=Math.PI/2,n.add(i),n}function k_(n=0){const t=new Tt,e=new R(new ft(.6,.05,.42),new $({color:16050896,roughness:.85}));t.add(e);const i=new R(new Rt(.09,.09,.02,12),new $({color:11549232,roughness:.4}));return i.position.y=.035,t.add(i),t.rotation.y=n,t}function G_(n,t,e){return ci((i,s,o)=>{i.fillStyle="#f7f0de",_o(i,6,6,s-12,o-12,20),i.fill(),i.strokeStyle="rgba(138,111,69,0.55)",i.lineWidth=4,_o(i,6,6,s-12,o-12,20),i.stroke();const r=s/2,a=o*.56,l=o*.32,c=Math.PI*.75,u=Math.PI*1.5;i.lineCap="round",i.lineWidth=26,i.strokeStyle="rgba(110,90,55,0.22)",i.beginPath(),i.arc(r,a,l,c,c+u),i.stroke(),i.strokeStyle=t,i.beginPath(),i.arc(r,a,l,c,c+u*n),i.stroke(),i.fillStyle="#3a2e1f",i.font="800 90px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",i.textAlign="center",i.fillText(Math.round(n*100)+"%",r,a+22),i.fillStyle="rgba(90,74,52,0.75)",i.font="600 30px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",i.fillText(e,r,a+l+44)},512,512)}function _u(n=1){const t=new Tt,e=new $({color:4864550,roughness:.5,metalness:.4}),i=new $({color:ie.terracotta,roughness:.6}),s=17*n,o=new R(new ft(.5,s,.5),e);o.position.y=s/2,o.castShadow=!0,t.add(o);const r=new R(new ft(.35,.35,15*n),e);r.position.set(0,s+.6,5*n),t.add(r);const a=new R(new ft(1,1,1),i);a.position.set(0,s,-1.6*n),t.add(a);for(const h of[-.2,.2]){const f=new R(new Rt(.03,.03,8*n,6),e);f.position.set(h,s+.4,6.6*n),f.rotation.x=-.35,t.add(f)}const l=new Ir({color:6048304}),c=[new b(0,s+.5,8*n),new b(0,s-3*n,8*n)],u=new Pe().setFromPoints(c);t.add(new zl(u,l));const d=new R(new ft(.3,.3,.3),e);return d.position.set(0,s-3.4*n,8*n),t.add(d),t}function H_(n,t=60){const e=new Float32Array(t*3),i=new Float32Array(t*3),s=[12618344,13805688,16050896,9416330,10521188];for(let l=0;l<t;l++){e[l*3]=(Math.random()-.5)*14,e[l*3+1]=Math.random()*9,e[l*3+2]=(Math.random()-.5)*14;const c=new _t(s[l%s.length]);i[l*3]=c.r,i[l*3+1]=c.g,i[l*3+2]=c.b}const o=new Pe;o.setAttribute("position",new Be(e,3)),o.setAttribute("color",new Be(i,3));const r=new Bs({size:.16,vertexColors:!0,transparent:!0,opacity:.85}),a=new So(o,r);return n.add(a),a}function wn(n,t={}){const e=ci((m,v,g)=>{const p=m.createLinearGradient(0,0,0,g);p.addColorStop(0,"#f8f1de"),p.addColorStop(.34,"#f4e9cf"),p.addColorStop(.6,"#efe1bf"),p.addColorStop(.82,"#e9d7ab"),p.addColorStop(1,"#e1cc95"),m.fillStyle=p,m.fillRect(0,0,v,g);const S=m.createLinearGradient(0,g*.58,0,g);S.addColorStop(0,"rgba(255,238,205,0)"),S.addColorStop(1,"rgba(255,241,212,0.9)"),m.fillStyle=S,m.fillRect(0,g*.58,v,g*.42),m.fillStyle="rgba(255,252,244,0.5)";for(let w=0;w<12;w++){const M=Math.random()*v,E=Math.random()*g*.55,P=26+Math.random()*48;for(let I=0;I<4;I++)m.beginPath(),m.ellipse(M+(Math.random()-.5)*P*.6,E+(Math.random()-.5)*10,P*(.3+Math.random()*.25),4+Math.random()*5,0,0,Is),m.fill()}},256,1024),i=new Fe({map:e,side:rn,fog:!1,depthWrite:!1}),s=new R(new oe(820,24,14),i);n.add(s);const o=new Xn(new On({map:Cn(0,"rgba(240,180,110,0.95)"),transparent:!0,blending:He,depthWrite:!1,depthTest:!1}));o.position.set(t.sunX??-180,t.sunY??90,-520),o.scale.setScalar(t.sunS??130),n.add(o);const r=new Xn(new On({map:Cn(.25,"rgba(235,165,95,0.35)"),transparent:!0,blending:He,depthWrite:!1,depthTest:!1}));r.position.set(t.sunX??-180,t.sunY??90,-520),r.scale.setScalar(460),n.add(r),n.userData.sun={sprite:o,halo:r};const a=new R(new $n(1400,40),new $({map:ld(),roughness:1,metalness:0}));a.rotation.x=-Math.PI/2,a.position.y=-.03,a.receiveShadow=!0,n.add(a),n.add(new rd(11772544,t.ambient??.75)),n.add(new id(15918796,12101246,t.hemi??.5));const l=new od(16772552,t.sunI??2.6);l.position.set(-120,140,-220),l.castShadow=!0,l.shadow.mapSize.set(1024,1024),l.shadow.camera.left=-60,l.shadow.camera.right=60,l.shadow.camera.top=60,l.shadow.camera.bottom=-60,l.shadow.camera.near=10,l.shadow.camera.far=600,n.add(l),n.add(l.target),n.fog=new Li(t.fogColor??ie.skyHorizon,t.fogNear??40,t.fogFar??480);const c=ns()?70:140,u=new Float32Array(c*3);for(let m=0;m<c;m++)u[m*3]=(Math.random()-.5)*90,u[m*3+1]=.4+Math.random()*9,u[m*3+2]=-20+Math.random()*160;const d=new Pe;d.setAttribute("position",new Be(u,3));const h=new Bs({color:16050896,transparent:!0,opacity:.3,blending:He,depthWrite:!1,size:.09,sizeAttenuation:!0}),f=new So(d,h);n.add(f),n.userData.dust=f}function Yi(n,t=12,e=30,i=170,s=70){for(let o=0;o<t;o++){const r=e+Math.random()*(i-e),a=9+Math.random()*22,l=5+Math.random()*4,c=5+Math.random()*4,u=Math.random()>.5?1:-1;n.add(vl(l,a,c,r,u*(s*.55+Math.random()*s*.45)))}}function $i(n,t){n.userData.palms=n.userData.palms||[];for(const[e,i,s]of t){const o=ud(new b(e,0,i),s??1);n.userData.palms.push(o),n.add(o)}}const Ar={presentation(n,t,e){wn(n);const i=new pn([new b(0,0,-30),new b(0,0,140)]),s=li(i,4.4,ie.path,Ts(),400);s.position.y=.01,n.add(s);const o=ya(t,e);o.position.set(-5.2,0,46),o.rotation.y=.42,n.add(o);const r=Xi(Vn(1));r.position.set(6.4,0,70),r.rotation.y=-.55,n.add(r),Yi(n,16),$i(n,[[-9,18,1.2],[9,22,1],[-10,62,1.3],[10,92,1.1],[-11,120,1.25]]);for(let l=0;l<=4;l++){const c=8+l*26,u=l%2===0?1:-1,d=uo(new b(u*6,0,c),u);n.add(d);const h=ho(new b(u*6,0,c),u);n.add(h.group)}for(const l of[30,78]){const c=br();c.group.position.set(0,0,l),c.group.rotation.y=Math.PI,c.group.userData.x0=0,(n.userData.cars=n.userData.cars||[]).push(c.group),n.add(c.group)}const a=new Ie(46,1280/760,.1,2e3);return a.position.set(6.5,3.1,14),a.lookAt(-1.5,3.4,52),a},"lecon1-importance"(n,t,e){wn(n,{sunX:60,sunY:120,sunI:2.4});const i=new pn([new b(0,0,-20),new b(0,0,150)]),s=li(i,4.4,ie.path,Ts(),400);s.position.y=.01,n.add(s),[{x:-5.6,z:40,ry:.5},{x:5.8,z:62,ry:-.6},{x:-5.9,z:86,ry:.55},{x:5.9,z:108,ry:-.55},{x:-5.8,z:130,ry:.5}].forEach((a,l)=>{const c=l===0?ya(t,e):Xi(Vn(l+2));c.position.set(a.x,0,a.z),c.rotation.y=a.ry,n.add(c)}),Yi(n,14,30,190,80),$i(n,[[-9,16,1],[9,50,1.1],[-10,96,1.05],[10,132,1.15]]);for(let a=0;a<=5;a++){const l=12+a*24,c=a%2===0?1:-1,u=uo(new b(c*6,0,l),c);n.add(u);const d=ho(new b(c*6,0,l),c);n.add(d.group)}for(const a of[28,74,118]){const l=br();l.group.position.set(0,0,a),l.group.rotation.y=Math.PI,l.group.userData.x0=0,(n.userData.cars=n.userData.cars||[]).push(l.group),n.add(l.group)}const r=new Ie(48,1280/760,.1,2e3);return r.position.set(8,5.4,6),r.lookAt(0,3.2,80),r},"lecon2-constat"(n,t,e){wn(n,{sunI:1.3,ambient:.5,fogColor:15524036,fogNear:24,fogFar:220}),[[0,20,.1,1.15],[-7,34,-.35,1],[6,42,.55,.9],[-3,52,-.2,1.25],[8,60,-.7,.85],[-8,66,.3,1.1],[3,74,.65,.95],[-5,84,-.5,1.05],[7,90,.15,.8],[-9,96,-.8,1.2]].forEach(([r,a,l,c],u)=>{const d=u===0?ya(t,e):Xi(Vn(u+1));d.position.set(r,0,a),d.scale.setScalar(c),d.rotation.y=l,d.rotation.z=u%3*.06-.06,u%4===3&&(d.rotation.x=-.08),n.add(d)});const s=Xi(Vn(5));s.position.set(2,0,102),s.rotation.set(1.35,.4,.3),n.add(s),Yi(n,10,20,150,60),$i(n,[[-9,30,.9],[9,55,.85],[-10,88,.95]]);const o=new Ie(52,1280/760,.1,2e3);return o.position.set(11,5.2,-8),o.lookAt(-1,2.6,55),o},audit(n){wn(n,{sunI:1.1,ambient:.65,fogNear:30,fogFar:200}),n.fog=new Li(15524036,30,200);const t=new R(new Jt(90,40),new $({color:15985364}));t.position.set(0,14,-16),t.rotation.y=Math.PI,n.add(t);const e=ci((h,f,m)=>{const v=h.createLinearGradient(0,0,0,m);v.addColorStop(0,"#d9e4e6"),v.addColorStop(1,"#f2e4c6"),h.fillStyle=v,h.fillRect(0,0,f,m),h.fillStyle="#c3ab7c",h.fillRect(0,m*.72,f,m*.28),h.fillStyle="rgba(180,140,90,0.6)";for(let g=0;g<14;g++){const p=16+Math.random()*40,S=20+Math.random()*60;h.fillRect(10+Math.random()*(f-50),m*.76,p,S)}},512,320),i=new R(new Jt(13,7),new $({map:e,emissiveMap:e,emissive:new _t(16773336),emissiveIntensity:.12}));i.position.set(0,7.5,-15.6),n.add(i);const s=new $({color:8019768}),o=new R(new ft(.4,7,.3),s);o.position.set(0,7.5,-15.2),n.add(o);const r=new R(new ft(13,.4,.3),s);r.position.set(0,7.5,-15.2),n.add(r);const a=xa();n.add(a);for(const[h,f,m]of[[.7,.3,.35],[-.6,.4,-.4],[.2,-.5,.1]]){const v=N_(.9,1.2,m);v.position.set(h,1.1,f),n.add(v)}const l=z_();l.position.set(-.9,1.09,.25),l.rotation.y=.3,n.add(l);const c=F_(.25);c.position.set(.55,1.12,.5),c.rotation.y=.4,c.userData.y0=1.12,c.userData.rz0=0,(n.userData.floaters=n.userData.floaters||[]).push(c),n.add(c);const u=Sa();u.g.position.set(-1.6,0,-.5),n.add(u.g),n.add(u.light);const d=new Ie(44,1280/760,.1,2e3);return d.position.set(4.2,3.4,7.5),d.lookAt(0,1.6,-1),d},"etat-lieux"(n){wn(n,{sunI:2.2,fogNear:60,fogFar:700});const t=new R(new Jt(24,24),new $({map:mu(),roughness:.9}));t.rotation.x=-Math.PI/2,t.position.y=.01,n.add(t);const e=[new b(-7,.5,6),new b(-3.5,.6,1),new b(1,.7,-4),new b(5.5,.8,-7),new b(9,.9,-10)],i=new R(new ks(new pn(e),64,.12,8,!1),new Fe({color:12618344,transparent:!0,opacity:.8}));i.position.y=-.01,n.add(i),[[-7,6,13204066],[-3.5,1,8232642],[1,-4,13805688],[5.5,-7,9416330],[9,-10,13204066]].forEach(([l,c,u])=>{const d=gu(u);d.position.set(l,0,c),n.add(d)});const o=ci((l,c,u)=>{l.fillStyle="rgba(255,255,255,0.75)",l.beginPath(),l.arc(c/2,u/2,c/2-8,0,Is),l.fill(),l.strokeStyle="rgba(90,74,52,0.8)",l.lineWidth=5,l.stroke(),l.fillStyle="#c08a68",l.beginPath(),l.moveTo(c/2,u*.16),l.lineTo(c*.58,u*.6),l.lineTo(c*.42,u*.6),l.closePath(),l.fill(),l.fillStyle="#5a4a34",l.font="800 34px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",l.textAlign="center",l.fillText("N",c/2,u*.2)},160,160),r=new R(new Jt(2.2,2.2),new Fe({map:o,transparent:!0}));r.position.set(-9.5,.05,9.5),r.rotation.x=-Math.PI/2,n.userData.compass=r,n.add(r);const a=new Ie(40,1280/760,.1,2e3);return a.position.set(13,20,11),a.lookAt(0,0,0),a},zonage(n){wn(n,{sunI:2,fogNear:60,fogFar:700});const t=new R(new Jt(24,24),new $({map:mu(!0),roughness:.9}));t.rotation.x=-Math.PI/2,t.position.y=.01,n.add(t),[[0,0,8232642],[6,0,12618344],[0,-6,9416330],[6,-6,13805688]].forEach(([r,a,l])=>{const c=gu(l);c.position.set(r,0,a),n.add(c)});const i=ci((r,a,l)=>{r.fillStyle="rgba(240,236,220,0.95)",_o(r,0,0,a,l,16),r.fill();const c=[["#7d9ec2","Zone A"],["#c08a68","Zone B"],["#8fae8a","Zone C"],["#d2a878","Zone D"]];r.font="700 30px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",r.textAlign="left",c.forEach(([u,d],h)=>{r.fillStyle=u,r.beginPath(),r.arc(46,60+h*70,16,0,Is),r.fill(),r.fillStyle="#3a2a18",r.fillText(d,78,72+h*70)})},360,320),s=new R(new Jt(3.4,3),new Fe({map:i,transparent:!0}));s.position.set(-8.8,.05,-8),s.rotation.x=-Math.PI/2,n.add(s);const o=new Ie(40,1280/760,.1,2e3);return o.position.set(-10,21,14),o.lookAt(0,0,-1),o},"constitution-lots"(n,t,e){wn(n,{sunX:40,sunY:130,sunI:2.4});const i=new pn([new b(0,0,-20),new b(0,0,150)]),s=li(i,4.4,ie.path,Ts(),400);s.position.y=.01,n.add(s);const o=D_(Vn(0));o.position.set(-6.4,0,42),o.rotation.y=.35,n.add(o);const r=Xi(Vn(3));r.position.set(6.6,0,64),r.rotation.y=-.5,n.add(r);const a=U_(Vn(2));a.position.set(-6.2,0,88),a.rotation.y=.4,n.add(a);const l=I_(Vn(1));l.position.set(6.4,0,108),l.rotation.y=-.45,n.add(l),Yi(n,12,30,180,80),$i(n,[[-9,22,1.1],[9,34,1],[-10,78,1.15],[10,122,1.05]]);for(let u=0;u<=4;u++){const d=20+u*24,h=u%2===0?1:-1,f=uo(new b(h*6,0,d),h);n.add(f);const m=ho(new b(h*6,0,d),h);n.add(m.group)}for(const u of[58,100]){const d=As(new b(4.6,0,u),1);n.add(d)}const c=new Ie(46,1280/760,.1,2e3);return c.position.set(8.5,4.6,4),c.lookAt(-1,3,62),c},"mise-concession"(n){wn(n,{sunI:1.2,ambient:.7,fogNear:30,fogFar:200}),n.fog=new Li(15524036,30,200);const t=new R(new Jt(90,40),new $({color:15985364}));t.position.set(0,14,-16),t.rotation.y=Math.PI,n.add(t);const e=xa();n.add(e);const i=new R(new Jt(2.3,1.6),new $({color:16050896,roughness:.85}));i.position.set(.1,1.08,.15),i.rotation.x=-.18,n.add(i);const s=O_();s.position.set(1.05,1.1,.5),s.rotation.y=-.5,s.rotation.z=-.12,s.userData.y0=1.1,s.userData.rz0=-.12,(n.userData.floaters=n.userData.floaters||[]).push(s),n.add(s);const o=vu();o.position.set(-1.15,1.05,-.1),o.rotation.y=.3,o.userData.y0=1.05,o.userData.rz0=0,(n.userData.floaters=n.userData.floaters||[]).push(o),n.add(o);const r=new R(new Yn(.22,.04,10,24),new $({color:ie.bronze,metalness:.8,roughness:.3}));r.position.set(-.7,1.12,.6),r.rotation.x=Math.PI/2.2,r.rotation.z=.3,n.add(r);const a=Sa();a.g.position.set(-1.7,0,-.6),n.add(a.g),n.add(a.light);const l=new Ie(42,1280/760,.1,2e3);return l.position.set(3.9,3.6,6.8),l.lookAt(-.1,1.7,-.4),l},attribution(n){wn(n,{sunI:1.2,ambient:.7,fogNear:30,fogFar:200}),n.fog=new Li(15524036,30,200);const t=new R(new Jt(90,40),new $({color:15985364}));t.position.set(0,14,-16),t.rotation.y=Math.PI,n.add(t);const e=xa();n.add(e);const i=B_();i.position.set(.9,1.12,.2),i.rotation.y=.7,i.userData.y0=1.12,i.userData.rz0=0,(n.userData.floaters=n.userData.floaters||[]).push(i),n.add(i);for(const[l,c,u]of[[-1.2,.4,.5],[-.5,-.4,-.6],[.4,.6,.1]]){const d=k_(u);d.position.set(l,1.06,c),n.add(d)}const s=vu(3829823,"ADMIS");s.position.set(-1.4,1.05,-.5),s.rotation.y=-.4,n.add(s);const o=new R(new Yn(.24,.06,12,28),new $({color:13805688,metalness:.9,roughness:.25}));o.position.set(.1,1.15,-.6),o.rotation.x=Math.PI/2.4,o.userData.y0=1.15,o.userData.rz0=0,(n.userData.floaters=n.userData.floaters||[]).push(o),n.add(o);const r=Sa();r.g.position.set(-1.7,0,-.6),n.add(r.g),n.add(r.light);const a=new Ie(42,1280/760,.1,2e3);return a.position.set(4.1,3.5,7.2),a.lookAt(0,1.6,-.2),a},gestion(n){wn(n,{sunX:20,sunY:150,sunI:2.5});const t=new pn([new b(0,0,-20),new b(0,0,150)]),e=li(t,4.4,ie.path,Ts(),400);e.position.y=.01,n.add(e);const i=new Tt,s=new $({color:15195071,roughness:.85}),o=new R(new ft(14,10,8),s);o.position.y=5,o.castShadow=!0,i.add(o);const r=new R(new Rt(8,8.6,1.6,4),s);r.position.y=11,r.rotation.y=Math.PI/4,i.add(r);const a=new $({color:13614751,roughness:.6});for(const f of[-5,-3.3,-1.6,0,1.6,3.3,5]){const m=new R(new Rt(.28,.34,4.6,10),a);m.position.set(f,2.3,4.05),i.add(m)}const l=ci((f,m,v)=>{f.fillStyle="#d8c9a6",f.fillRect(0,0,m,v);for(let g=0;g<3;g++)for(let p=0;p<6;p++)Math.random()<.75&&(f.fillStyle=Math.random()<.4?"#b98a5a":"#c9a25f",f.globalAlpha=.6,f.fillRect(10+p*(m/6),10+g*(v/3.4),m/8,v/4.4),f.globalAlpha=1)},512,256),c=new R(new Jt(10,4.4),new $({map:l,emissiveMap:l,emissive:new _t(16114365),emissiveIntensity:.15}));c.position.set(0,6.2,4.06),i.add(c),i.position.set(0,0,58),i.rotation.y=Math.PI,n.add(i);const u=new R(new Rt(.08,.12,8,8),new $({color:6048304}));u.position.set(-8,4,56),n.add(u);const d=new R(new Jt(2.6,1.5),new $({color:ie.terracotta,side:Oe,roughness:.8}));d.position.set(-6.6,7.4,56),d.rotation.y=.2,n.userData.flag=d,n.add(d);for(let f=0;f<3;f++){const m=Xi(Vn(f+1));m.position.set(-6.4,0,30+f*22),m.rotation.y=.45,n.add(m)}Yi(n,10,80,200,90),$i(n,[[-9,20,1],[9,44,1.1],[9.5,92,1]]);for(let f=0;f<=4;f++){const m=14+f*26,v=f%2===0?1:-1,g=uo(new b(v*6,0,m),v);n.add(g);const p=ho(new b(v*6,0,m),v);n.add(p.group)}const h=new Ie(44,1280/760,.1,2e3);return h.position.set(10,3.6,18),h.lookAt(0,4.5,58),h},evaluation(n){wn(n,{sunI:1,ambient:.55,fogNear:30,fogFar:300}),n.fog=new Li(15524036,30,300),[{pct:.9,color:"#d2a878",label:"AUDIT",x:-4},{pct:.78,color:"#c08a68",label:"CONCESSION",x:0},{pct:.86,color:"#7da878",label:"GESTION",x:4}].forEach(({pct:r,color:a,label:l,x:c})=>{const u=new R(new Rt(1.5,1.8,.3,20),new $({color:6048304,roughness:.7}));u.position.set(c,.15,0),n.add(u);const d=new R(new Rt(.14,.16,3.4,10),new $({color:ie.walnut,roughness:.6}));d.position.set(c,1.85,0),n.add(d);const h=G_(r,a,l),f=new R(new Jt(3.6,3.6),new $({map:h,emissiveMap:h,emissive:new _t(16777215),emissiveIntensity:.08}));f.position.set(c,3.9,0),f.rotation.x=.25,n.add(f);const m=new Bl(15246172,.2,8,2);m.position.set(c,3.2,2),n.add(m)});const e=[new b(-6,.8,2.5),new b(-3,1.6,1.4),new b(0,2.6,0),new b(3,3.8,-1.2),new b(6,5.2,-2.4)],i=new R(new ks(new pn(e),64,.1,8,!1),new Fe({color:5742687,transparent:!0,opacity:.9}));n.add(i);const s=new R(new an(.3,.8,12),new $({color:5742687,emissive:5742687,emissiveIntensity:.6}));s.position.set(6.4,5.6,-2.7),s.rotation.z=-.6,n.add(s);const o=new Ie(46,1280/760,.1,2e3);return o.position.set(7,3.4,11),o.lookAt(0,3.2,-1),o},"mise-a-jour"(n){wn(n,{sunX:-80,sunY:110,sunI:2.2});const t=new pn([new b(0,0,-20),new b(0,0,150)]),e=li(t,4.4,ie.path,Ts(),400);e.position.y=.01,n.add(e);const i=_u(1);i.position.set(-8,0,52),n.userData.cranes=[i],n.add(i);const s=_u(.7);s.position.set(8,0,84),n.userData.cranes.push(s),n.add(s);const o=new R(new ft(7,9,7),new $({color:2760726,roughness:.9}));o.position.set(0,4.5,62),o.castShadow=!0,n.add(o);const r=new $({color:7034424,roughness:.8});for(let h=0;h<4;h++){const f=new R(new ft(8,.14,.14),r);f.position.set(0,1.5+h*2.3,3.6),n.add(f)}const a=Xi(Vn(4));a.position.set(0,14,66),a.rotation.x=.15,a.userData.y0=14,n.userData.hoisted=a,n.add(a);const l=new Ir({color:6048304}),c=[new b(-8,18,52),new b(0,15,65)],u=new Pe().setFromPoints(c);n.add(new zl(u,l)),Yi(n,10,90,220,85),$i(n,[[-9,30,.9],[9,110,1]]);const d=new Ie(48,1280/760,.1,2e3);return d.position.set(11,5.5,6),d.lookAt(0,8,62),d},quiz(n){wn(n,{sunX:0,sunY:130,sunI:2});const t=ci((u,d,h)=>{u.clearRect(0,0,d,h),u.fillStyle="rgba(253,250,242,0.92)",_o(u,0,0,d,h,40),u.fill(),u.strokeStyle="rgba(138,111,69,0.5)",u.lineWidth=8,_o(u,8,8,d-16,h-16,36),u.stroke(),u.shadowColor="rgba(122,95,56,0.55)",u.shadowBlur=40,u.fillStyle="#7a5f38",u.font="800 620px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",u.textAlign="center",u.textBaseline="middle",u.fillText("?",d/2,h*.52),u.shadowBlur=0},640,640),e=new R(new Jt(7,7),new Fe({map:t,transparent:!0}));e.position.set(0,8.5,30),n.add(e);const i=new Xn(new On({map:Cn(.3,"rgba(232,163,92,0.28)"),transparent:!0,blending:He,depthWrite:!1}));i.position.set(0,8.5,28.5),i.scale.setScalar(18),n.add(i);const s=new Tt,o=new $({color:13805688,metalness:.85,roughness:.28}),r=new R(new Rt(.9,1,.3,16),o);s.add(r);const a=new R(new Rt(.28,.3,1.2,12),o);a.position.y=.75,s.add(a);const l=new R(new Rt(.9,.45,1.1,18),o);l.position.y=1.7,s.add(l);for(const u of[-1,1]){const d=new R(new Yn(.4,.07,10,20,Math.PI),o);d.position.set(u*.78,1.5,0),d.rotation.z=u*Math.PI/2,s.add(d)}s.position.set(-3.6,0,40),n.userData.trophy=s,n.add(s),Yi(n,12,60,200,90),$i(n,[[-9,60,1],[9,90,1.1]]),n.userData.confetti=H_(n,70);const c=new Ie(46,1280/760,.1,2e3);return c.position.set(6,3.6,8),c.lookAt(0,6.5,34),c}};function V_(n,t,e,i=1280,s=760){if(Tr)return null;let o;try{o=new Ul({canvas:e,antialias:!ns(),alpha:!1}),o.toneMapping=wo,o.toneMappingExposure=1.2,o.shadowMap.enabled=!ns(),o.shadowMap.enabled&&(o.shadowMap.type=yl),o.setPixelRatio(Math.min(window.devicePixelRatio||1,ns()?1:1.25)),o.setSize(i,s,!1)}catch{return Tr=!0,null}let r=null,a=null;try{r=new Nl,a=(Ar[n.id]||Ar.presentation)(r,n,t),a.aspect=i/s,a.updateProjectionMatrix()}catch(N){return console.warn("Illustration 3D en direct indisponible pour",n.id,N),o.dispose(),null}const l=a.position.clone(),c=new b;a.getWorldDirection(c);const u=l.clone().addScaledVector(c,40),d=Math.min(3,Math.max(.6,l.length()/14)),h=r.userData.dust||null,f=r.userData.sun||null,m=r.userData.palms||[],v=r.userData.cars||[],g=r.userData.cranes||[],p=r.userData.hoisted||null,S=r.userData.trophy||null,w=r.userData.flag||null,M=r.userData.compass||null,E=r.userData.confetti||null,P=r.userData.floaters||[];function I(N,y,x){h&&(h.rotation.y+=y*.02,h.position.y=Math.sin(N*.4)*.3,h.material.opacity=.26+Math.sin(N*.8)*.08),f&&(f.sprite.material.opacity=.82+Math.sin(N*.5)*.1,f.halo.material.opacity=.28+Math.sin(N*.4+1)*.06);for(let L=0;L<m.length;L++)m[L].rotation.z=Math.sin(N*.8+L*1.7)*.05;for(let L=0;L<v.length;L++){const B=v[L];B.position.z-=y*.9,B.position.x=(B.userData.x0||0)+Math.sin(N*.5+L*2.1)*.4,B.position.z<-14&&(B.position.z=132,B.position.x=(Math.random()-.5)*6,B.userData.x0=B.position.x)}if(E){const L=E.geometry.attributes.position,B=L.array;for(let k=0;k<L.count;k++)B[k*3+1]-=y*.7,B[k*3+1]<.2&&(B[k*3+1]=6+Math.random()*3,B[k*3]=(Math.random()-.5)*14,B[k*3+2]=(Math.random()-.5)*14);L.needsUpdate=!0}S&&(S.rotation.y=Math.sin(N*.6)*.12);for(let L=0;L<g.length;L++){const B=g[L];B.rotation.y=(B.userData.baseY||0)+Math.sin(N*.15+L*2.4)*.12}p&&(p.rotation.z=Math.sin(N*1.1)*.03,p.position.y=(p.userData.y0||14)+Math.sin(N*.7)*.25),w&&(w.rotation.z=Math.sin(N*1.8)*.16+Math.sin(N*3.1)*.05),M&&(M.rotation.z=N*.15);for(let L=0;L<P.length;L++){const B=P[L];B.position.y=(B.userData.y0||B.position.y)+Math.sin(N*1.2+L*1.3)*.03,B.rotation.z=(B.userData.rz0||0)+Math.sin(N*.9+L)*.02}a.position.set(l.x+Math.sin(x*Math.PI)*.5*d+Math.sin(N*.3)*.06*d,l.y+Math.cos(x*Math.PI)*.25*d+Math.sin(N*.24)*.05*d,l.z+(x-.5)*1.2*d+Math.cos(N*.21)*.07*d),a.lookAt(u),o.render(r,a)}return{canvas:o.domElement,render:I,dispose(){o.dispose(),r.traverse(N=>{if(N.geometry&&N.geometry.dispose(),N.material){const y=Array.isArray(N.material)?N.material:[N.material];for(const x of y)x.map&&x.map.dispose(),x.dispose()}})}}}const wa=new Map;function W_(n,t,e=1280,i=760){if(wa.has(n.id))return wa.get(n.id);const s=L_();if(!s)return null;try{s.setPixelRatio(ns()?1:1.5),s.setSize(e,i);const o=new Nl,a=(Ar[n.id]||Ar.presentation)(o,n,t);a.aspect=e/i,a.updateProjectionMatrix(),s.render(o,a);const l=s.domElement.toDataURL("image/jpeg",.85);return q_(o),wa.set(n.id,l),l}catch(o){return console.warn("Illustration 3D indisponible pour",n.id,o),null}}function q_(n){const t=new Set,e=new Set;n.traverse(i=>{i.geometry&&i.geometry.dispose();const s=Array.isArray(i.material)?i.material:i.material?[i.material]:[];for(const o of s)if(!e.has(o)){e.add(o);for(const r of[o.map,o.emissiveMap])r&&!t.has(r)&&(t.add(r),r.dispose());o.dispose()}})}function X_({onExit:n,onScrollTo:t,onQuiz:e}){const i=document.getElementById("ui-course"),s=i.querySelector("#course-toc"),o=i.querySelector("#course-toc-select"),r=i.querySelector("#course-sections"),a=i.querySelector("#course-cover"),l=i.querySelector("#course-close"),c=i.querySelector("#course-quiz-btn"),u=i.querySelector(".course-main"),d=t||(y=>u.scrollTo({top:y,behavior:"smooth"}));let h=!1;a.innerHTML=`
    <div class="course-cover-kicker">${va.module} — Formation :</div>
    <h1 class="course-cover-title">${va.title}</h1>
    <div class="course-cover-sub">${va.subtitle}</div>
    <div class="course-cover-rule"></div>
    <p class="course-cover-desc">Lecture complète et illustrée du cours. Avancez section par section, chaque étape est accompagnée d'une illustration de son contexte.</p>
    <div class="course-cover-meta"><span>${Je.length} étapes</span><span>12 questions finales</span></div>
  `;const f=[],m=[];gr.forEach((y,x)=>{const L=Je.filter(B=>B.chapter===x);L.length&&(f.push(`<div class="toc-chapter"><div class="toc-chapter-name">${y.name}</div><div class="toc-chapter-label">${y.label}</div></div>`),L.forEach(B=>{f.push(`<a href="#course-sec-${B.id}" class="toc-item" data-id="${B.id}"><span class="toc-num">${B.num}</span><span>${B.title}</span></a>`)}))}),Je.forEach(y=>{const x=gr[y.chapter],L=y.id==="quiz";let B="";L?B=`<ul class="course-bullets">${y.bullets.map(k=>`<li>${k}</li>`).join("")}</ul>`:B=y.content.map(k=>`<p><span class="course-body-t">${k.t}</span>${k.b}</p>`).join(""),m.push(`
      <section class="course-section" id="course-sec-${y.id}">
        <canvas class="course-illus" role="img" aria-label="Illustration — ${y.title}"></canvas>
        <div class="course-sec-meta">
          <span class="course-sec-chapter">${x?`${x.name} · ${x.label}`:""}</span>
          <span class="course-sec-num">${y.num} / ${String(Je.length).padStart(2,"0")}</span>
        </div>
        <h2 class="course-sec-title">${y.title}</h2>
        <div class="course-sec-rule"></div>
        <div class="course-sec-content">${B}</div>
      </section>
    `)}),s.innerHTML=f.join(""),r.innerHTML=m.join("");const v=[];gr.forEach((y,x)=>{const L=Je.filter(B=>B.chapter===x);L.length&&(v.push(`<optgroup label="${y.name}">`),L.forEach(B=>v.push(`<option value="${B.id}">${B.num} · ${B.title}</option>`)),v.push("</optgroup>"))}),o.innerHTML=v.join("");const g=[];r.querySelectorAll(".course-illus").forEach(y=>{const x=y.closest(".course-section").id.replace("course-sec-",""),L=document.createElement("canvas");P_(L,x,1280,760),y.style.backgroundImage=`url(${L.toDataURL("image/jpeg",.86)})`,y.style.backgroundSize="cover",y.style.backgroundPosition="center",g.push({canvas:y,id:x,live:null,raf:0,p:0,running:!1})});const p=window.matchMedia("(prefers-reduced-motion: reduce)").matches;function S(y){const x=y.getBoundingClientRect(),L=u.getBoundingClientRect(),B=x.height+L.height||1;return Math.min(1,Math.max(0,(L.bottom-x.top)/B))}function w(y){if(!y.live||y.running)return;y.running=!0,y.p=S(y.canvas);let x=performance.now();const L=B=>{if(!y.running)return;const k=Math.min(.05,Math.max(.001,(B-x)/1e3));x=B,y.p=S(y.canvas),y.live.render(B*.001,k,y.p),y.raf=requestAnimationFrame(L)};y.raf=requestAnimationFrame(L)}function M(y){y.running&&(y.running=!1,cancelAnimationFrame(y.raf))}const E=new IntersectionObserver(y=>{for(const x of y){const L=g.find(B=>B.canvas===x.target);if(L)if(x.isIntersecting){if(!L.live){const B=Je.find(k=>k.id===L.id);if(B&&(p||(L.live=V_(B,Je.indexOf(B),L.canvas,1280,760)),!L.live)){const k=W_(B,Je.indexOf(B));k&&(L.canvas.style.backgroundImage=`url(${k})`)}}w(L)}else M(L)}},{root:u,rootMargin:"420px 0px 420px 0px",threshold:0});g.forEach(y=>E.observe(y.canvas)),s.addEventListener("click",y=>{const x=y.target.closest(".toc-item");if(!x)return;const L=document.getElementById("course-sec-"+x.dataset.id);L&&(d(L.offsetTop-90),s.querySelectorAll(".toc-item").forEach(B=>B.classList.toggle("active",B===x)))});function P(){let y=Je[0].id;for(const x of Je){const L=document.getElementById("course-sec-"+x.id);L&&L.offsetTop-120<=u.scrollTop&&(y=x.id)}s.querySelectorAll(".toc-item").forEach(x=>x.classList.toggle("active",x.dataset.id===y)),o.value!==y&&(o.value=y)}u.addEventListener("scroll",P,{passive:!0}),o.addEventListener("change",()=>{const y=document.getElementById("course-sec-"+o.value);y&&d(y.offsetTop-90)}),l.addEventListener("click",n),c.addEventListener("click",e);function I(){h=!0,document.body.classList.add("mode-course"),setTimeout(()=>P(),80)}function N(){h=!1,document.body.classList.remove("mode-course"),g.forEach(y=>M(y))}return{open:I,close:N,isOpen:()=>h}}const Y_=["Awa","Jean-Marc","Fatoumata","Kofi","Aminata","Paul","Estelle","Yao","Mariam","Didier","Nadège","Sékou","Clarisse","Aubin","Grâce","Landry"],$_=["AGOUA","KOUADIO","DIAWARA","TRAORÉ","MENSAH","BÉRÉ","N'GUESSAN","DOSSOU","OKOULÉ","HOUESSOU","BAKAYOKO","ZINSOU"],Z_=["Chargée de communication","Responsable du zonage publicitaire","Ingénieure en signalétique urbaine","Directeur des affaires publiques","Cheffe de projet panneautique","Consultant en mobiliers urbains","Auditrice des espaces publicitaires","Coordinateur des concessions","Designer d'espace public","Gestionnaire de la régie publicitaire","Analyste du territoire","Conseiller en urbanisme commercial"],vr=8;function ba(n){const t=n.slice();for(let e=t.length-1;e>0;e--){const i=Math.floor(Math.random()*(e+1));[t[e],t[i]]=[t[i],t[e]]}return t}function K_(n=vr){const t=ba(Y_).slice(0,n),e=ba($_).slice(0,n),i=ba(Z_).slice(0,n);return t.map((s,o)=>({first:s,last:e[o],name:`${s} ${e[o]}`,role:i[o],seed:(o+1)*2654435761%2147483647}))}function j_(n){return function(){n|=0,n=n+1831565813|0;let t=Math.imul(n^n>>>15,1|n);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function cr(n,t){return t[Math.floor(n()*t.length)]}function J_(n){const i=document.createElement("canvas");i.width=480,i.height=640;const s=i.getContext("2d"),o=j_(n),r=s.createLinearGradient(0,0,0,640);r.addColorStop(0,"#f4e9cf"),r.addColorStop(.55,"#ead8b5"),r.addColorStop(1,"#d9bf93"),s.fillStyle=r,s.fillRect(0,0,480,640);const a=s.createRadialGradient(480/2,640*.4,20,480/2,640*.4,480*.62);a.addColorStop(0,"rgba(255,247,226,0.95)"),a.addColorStop(1,"rgba(255,247,226,0)"),s.fillStyle=a,s.fillRect(0,0,480,640),s.fillStyle="rgba(90,70,45,0.10)",s.beginPath(),s.moveTo(480*.1,640),s.quadraticCurveTo(480*.12,640*.4,480*.5,640*.34),s.quadraticCurveTo(480*.88,640*.4,480*.9,640),s.closePath(),s.fill(),s.fillStyle="rgba(90,70,45,0.14)",s.beginPath(),s.ellipse(480/2,640*.92,480*.34,640*.04,0,0,Math.PI*2),s.fill();const l=cr(o,["#c98d63","#b97b53","#a06a48","#d49a6f","#8a5a3e"]),c=cr(o,["#2c2018","#3a2c1f","#4a3423","#221a12"]),u=cr(o,["#1e1812","#33261a"]),d=cr(o,["#9a8157","#b08a63","#6f7f56","#7d8aa6","#8a6f7a","#a26f4e","#5f7a4a","#84673f"]),h=o()<.22,f=o()<.16,m=o()<.34;s.fillStyle=d,s.beginPath(),s.moveTo(480*.14,640),s.quadraticCurveTo(480*.13,640*.78,480*.16,640*.64),s.quadraticCurveTo(480*.21,640*.55,480*.5,640*.56),s.quadraticCurveTo(480*.79,640*.55,480*.84,640*.64),s.quadraticCurveTo(480*.87,640*.78,480*.86,640),s.closePath(),s.fill(),s.fillStyle="rgba(0,0,0,0.07)",s.beginPath(),s.moveTo(480*.5,640*.56),s.quadraticCurveTo(480*.5,640*.7,480*.5,640),s.lineTo(480*.62,640),s.quadraticCurveTo(480*.55,640*.62,480*.5,640*.56),s.closePath(),s.fill(),s.strokeStyle="rgba(58,46,31,0.25)",s.lineWidth=3,s.beginPath(),s.moveTo(480*.34,640*.6),s.quadraticCurveTo(480*.5,640*.68,480*.66,640*.6),s.stroke(),s.fillStyle=l,s.fillRect(480*.44,640*.5,480*.12,640*.14);const v=480*.5,g=640*.415,p=480*.155,S=640*.21;s.fillStyle=l,s.beginPath(),s.ellipse(v,g,p,S,0,0,Math.PI*2),s.fill(),s.beginPath(),s.ellipse(v-p,640*.46,7,12,0,0,Math.PI*2),s.fill(),s.beginPath(),s.ellipse(v+p,640*.46,7,12,0,0,Math.PI*2),s.fill(),s.fillStyle=c,f?(s.beginPath(),s.ellipse(v,g-S*1.25,640*.055,640*.05,0,0,Math.PI*2),s.fill(),s.beginPath(),s.ellipse(v,g-S*.7,p*.98,S*.75,0,0,Math.PI*2),s.fill()):(s.beginPath(),s.arc(v,g,p,Math.PI*1.05,Math.PI*1.95),s.quadraticCurveTo(v-p*1.12,g-S*.55,v-p*.75,g-S*.6),s.quadraticCurveTo(v,g-S*1.28,v+p*.75,g-S*.6),s.quadraticCurveTo(v+p*1.12,g-S*.55,v+p,g),s.closePath(),s.fill()),m&&(s.fillStyle=u,s.beginPath(),s.ellipse(v-p*.98,g+S*.4,p*.3,S*.95,0,0,Math.PI*2),s.fill(),s.beginPath(),s.ellipse(v+p*.98,g+S*.4,p*.3,S*.95,0,0,Math.PI*2),s.fill(),s.fillStyle=c,s.beginPath(),s.ellipse(v,g-S*.55,p*1.05,S*.8,0,0,Math.PI*2),s.fill()),s.strokeStyle="rgba(58,46,31,0.55)",s.lineWidth=3.5,s.lineCap="round",s.beginPath(),s.moveTo(v-p*.62,g-S*.32),s.quadraticCurveTo(v-p*.42,g-S*.42,v-p*.2,g-S*.34),s.stroke(),s.beginPath(),s.moveTo(v+p*.2,g-S*.34),s.quadraticCurveTo(v+p*.42,g-S*.42,v+p*.62,g-S*.32),s.stroke(),s.fillStyle="rgba(46,34,22,0.85)",s.beginPath(),s.ellipse(v-p*.42,g+S*.06,4.5,3.2,0,0,Math.PI*2),s.fill(),s.beginPath(),s.ellipse(v+p*.42,g+S*.06,4.5,3.2,0,0,Math.PI*2),s.fill(),h&&(s.strokeStyle="rgba(90,70,45,0.55)",s.lineWidth=2.5,s.beginPath(),s.ellipse(v-p*.42,g+S*.06,p*.22,S*.16,0,0,Math.PI*2),s.stroke(),s.beginPath(),s.ellipse(v+p*.42,g+S*.06,p*.22,S*.16,0,0,Math.PI*2),s.stroke(),s.beginPath(),s.moveTo(v-p*.2,g+S*.06),s.lineTo(v+p*.2,g+S*.06),s.stroke()),s.strokeStyle="rgba(120,80,55,0.35)",s.lineWidth=2.5,s.beginPath(),s.moveTo(v,g+S*.1),s.quadraticCurveTo(v+p*.08,g+S*.28,v-p*.02,g+S*.34),s.stroke(),s.strokeStyle="rgba(120,80,55,0.5)",s.lineWidth=3,s.beginPath(),s.moveTo(v-p*.16,g+S*.62),s.quadraticCurveTo(v,g+S*.72,v+p*.16,g+S*.62),s.stroke(),s.fillStyle="rgba(255,246,224,0.22)",s.beginPath(),s.ellipse(v-p*.72,g+S*.5,S*.5,S*.16,.5,0,Math.PI*2),s.fill();const w=s.createRadialGradient(480/2,640*.46,480*.2,480/2,640*.46,480*.78);w.addColorStop(0,"rgba(70,52,32,0)"),w.addColorStop(1,"rgba(70,52,32,0.30)"),s.fillStyle=w,s.fillRect(0,0,480,640);for(let M=0;M<1400;M++){const E=.02+o()*.04;s.fillStyle=o()<.5?`rgba(58,46,31,${E.toFixed(3)})`:`rgba(255,250,238,${E.toFixed(3)})`,s.fillRect(o()*480,o()*640,1.4,1.4)}return i.toDataURL("image/jpeg",.88)}const fo=(n,t,e)=>Math.max(t,Math.min(e,n)),Ea=n=>n>=1?1:1-Math.pow(2,-10*n),ri=n=>1-Math.pow(1-n,4),Ta=n=>1-Math.pow(1-n,5);function Q_(n,t,e){const i=Math.abs(n-t);return i>=e/2?0:.5+.5*Math.cos(i/(e/2)*Math.PI)}const Ge={portrait:{start:0,dur:.9},name:{start:.55,dur:.5},role:{start:.85,dur:.4},accent:{start:1.15,dur:.35}},Nn={accent:{start:0,dur:.21},role:{start:.09,dur:.24},name:{start:.18,dur:.3},portrait:{start:.27,dur:.54}},Aa=.018,Mu=.4;function hn(n,t,e){return fo((n-t)/e,0,1)}function t1({onExit:n}={}){const t=document.getElementById("ui-team"),e=t.querySelector("#team-scroll"),i=t.querySelector("#team-corridor"),s=t.querySelector(".team-track"),o=t.querySelector("#team-count"),r=t.querySelector("#team-close"),a=window.matchMedia("(prefers-reduced-motion: reduce)").matches,l=K_(vr),c=new Array(vr);s.innerHTML=l.map((G,U)=>{const tt=G.name.split("").map(at=>`<span class="tl">${at===" "?" ":at}</span>`).join("");return`
        <article class="team-cell" data-i="${U}">
          <div class="team-niche">
            <div class="team-arch"></div>
            <div class="team-glow"></div>
            <div class="team-portrait-wrap">
              <div class="team-portrait"></div>
            </div>
          </div>
          <div class="team-info">
            <div class="team-name">${tt}</div>
            <div class="team-role"></div>
            <div class="team-accent"></div>
          </div>
        </article>`}).join("");const u=[];s.querySelectorAll(".team-cell").forEach((G,U)=>{const tt={el:G,i:U,state:"idle",t0:0,pulseAt:0,f:null,phase:U*.9,restRot:U%2===0?-18:18,wrap:G.querySelector(".team-portrait-wrap"),portrait:G.querySelector(".team-portrait"),glow:G.querySelector(".team-glow"),name:G.querySelector(".team-name"),letters:[...G.querySelectorAll(".team-name .tl")],role:G.querySelector(".team-role"),accent:G.querySelector(".team-accent")};tt.portrait.style.backgroundImage=`url("${c[U]=J_(l[U].seed)}")`,tt.role.textContent=l[U].role,tt.accent.style.transformOrigin=U%2===0?"left center":"right center",G.addEventListener("click",()=>rt(U)),d(tt),u.push(tt)});function d(G){G.wrap.style.transform="translateZ(-50px) scale(0.85)",G.portrait.style.filter="grayscale(35%) blur(4px) brightness(0.4)",G.glow.style.opacity="0",G.name.style.opacity="0",G.name.style.transform="translateY(24px)",G.name.style.filter="blur(6px)",G.role.style.opacity="0",G.role.style.transform="translateY(16px)",G.role.style.letterSpacing="0.15em",G.accent.style.transform="scaleX(0)",G.accent.style.filter="";for(const U of G.letters)U.style.opacity="0",U.style.transform="translateY(12px)",U.style.filter="blur(6px)"}let h=null;function f(){h||(h=new Ca({wrapper:e,content:e,orientation:"horizontal",smoothWheel:!0,duration:1.15,easing:G=>1-Math.pow(1-G,3),wheelMultiplier:1.1}))}function m(G){return u[G].el.offsetLeft+u[G].el.offsetWidth/2}function v(){const G=e.scrollLeft+e.clientWidth/2;let U=0,tt=1/0;for(let at=0;at<u.length;at++){const q=Math.abs(m(at)-G);q<tt&&(tt=q,U=at)}return U}let g=-1;function p(){o.textContent=`${String(g+1).padStart(2,"0")} / ${String(vr).padStart(2,"0")}`}function S(G,U,tt=0,at=1){const q=-50+110*U,pt=.85+(.75+tt)*U,Ut=Math.sin(fo(U,0,1)*Math.PI)*15,Mt=G.restRot*Math.sin(fo(U,0,1)*Math.PI);G.wrap.style.transform=`translateZ(${q.toFixed(1)}px) translateY(${(-Ut).toFixed(1)}px) rotateY(${Mt.toFixed(2)}deg) scale(${pt.toFixed(4)})`,G.portrait.style.filter=`grayscale(${((1-U)*35).toFixed(1)}%) blur(${(4*(1-U)).toFixed(1)}px) brightness(${(.4+.6*U).toFixed(3)})`,G.glow.style.opacity=(U*at).toFixed(3),G.el.style.transform=`translateZ(${(-50*(1-U)).toFixed(1)}px) scale(${(.85+.15*U).toFixed(4)})`}function w(G,U,tt){G.name.style.opacity=U.toFixed(3),G.name.style.transform=`translateY(${(24*(1-U)).toFixed(1)}px)`,G.name.style.filter=`blur(${(6*(1-U)).toFixed(1)}px)`;for(let at=0;at<G.letters.length;at++){const q=tt?tt[at]:U,pt=G.letters[at];pt.style.opacity=q.toFixed(3),pt.style.transform=`translateY(${(12*(1-q)).toFixed(1)}px)`,pt.style.filter=`blur(${(6*(1-q)).toFixed(1)}px)`}}function M(G,U){G.role.style.opacity=U.toFixed(3),G.role.style.transform=`translateY(${(16*(1-U)).toFixed(1)}px)`,G.role.style.letterSpacing=`${(.15-.07*U).toFixed(3)}em`}function E(G,U){G.accent.style.transform=`scaleX(${U.toFixed(4)})`}function P(G,U){if(G.state==="entering"){const tt=U-G.t0;return{portrait:Ea(hn(tt,Ge.portrait.start,Ge.portrait.dur)),name:ri(hn(tt,Ge.name.start,Ge.name.dur)),role:ri(hn(tt,Ge.role.start,Ge.role.dur)),accent:Ta(hn(tt,Ge.accent.start,Ge.accent.dur)),letters:G.letters.map((at,q)=>ri(hn(tt,Ge.name.start+q*Aa,Mu)))}}return{portrait:1,name:1,role:1,accent:1,letters:G.letters.map(()=>1)}}function I(G){const U=v();if(U===g)return;const tt=g;g=U,tt>=0&&u[tt]&&u[tt].state!=="idle"&&(u[tt].f=P(u[tt],G),u[tt].state="leaving",u[tt].t0=G,u[tt].accent.style.filter=""),u[U].state!=="entering"&&(u[U].state="entering",u[U].t0=G),p()}function N(G,U){const tt=U-G.t0,at=hn(tt,Ge.portrait.start,Ge.portrait.dur),q=Ea(at),pt=.05*Q_(at,.78,.5),Ut=1-.55*Math.exp(-at*16)*(1-Math.abs(Math.sin(at*60)));S(G,q,pt,Ut);const Mt=ri(hn(tt,Ge.name.start,Ge.name.dur)),Vt=G.letters.map(($t,Qt)=>ri(hn(tt,Ge.name.start+Qt*Aa,Mu)));w(G,Mt,Vt),M(G,ri(hn(tt,Ge.role.start,Ge.role.dur))),E(G,Ta(hn(tt,Ge.accent.start,Ge.accent.dur))),tt>=Ge.accent.start+Ge.accent.dur&&(G.state="active",G.pulseAt=U,G.accent.style.filter="brightness(1)")}function y(G,U){const tt=U-G.pulseAt;if(tt<.28){const at=1+.7*Math.sin(fo(tt/.28,0,1)*Math.PI);G.accent.style.filter=`brightness(${at.toFixed(2)})`}else G.accent.style.filter=""}function x(G,U){const tt=U-G.t0,at=G.f||P(G,U);E(G,at.accent*(1-Ta(hn(tt,Nn.accent.start,Nn.accent.dur)))),G.accent.style.filter="",M(G,at.role*(1-ri(hn(tt,Nn.role.start,Nn.role.dur))));const q=G.letters.map((pt,Ut)=>{const Mt=Nn.name.start+(G.letters.length-1-Ut)*Aa;return at.letters[Ut]*(1-ri(hn(tt,Mt,.24)))});w(G,at.name*(1-ri(hn(tt,Nn.name.start,Nn.name.dur))),q),S(G,at.portrait*(1-Ea(hn(tt,Nn.portrait.start,Nn.portrait.dur)))),tt>=Nn.portrait.start+Nn.portrait.dur&&(G.state="idle",G.f=null,d(G))}function L(G,U){const tt=.85+.02*(.5+.5*Math.sin(U*Math.PI*2/4+G.phase));G.el.style.transform=`translateZ(-50px) scale(${tt.toFixed(4)})`}let B=0,k=!1;function nt(G){const U=G/1e3;h.raf(G),I(U);for(const tt of u)tt.state==="entering"?N(tt,U):tt.state==="active"?y(tt,U):tt.state==="leaving"?x(tt,U):L(tt,U);i.style.transform=`rotateZ(${(Math.sin(U*.5)*.4).toFixed(3)}deg)`,B=requestAnimationFrame(nt)}function rt(G){const U=Math.max(0,m(G)-e.clientWidth/2);h.scrollTo(U,{duration:1.15,easing:tt=>1-Math.pow(1-tt,3)}),a&&requestAnimationFrame(()=>ot())}function st(G){const U=fo(g+G,0,u.length-1);U!==g&&rt(U)}function ot(){const G=v();g=G,u.forEach((U,tt)=>{if(tt===G){U.wrap.style.transform="translateZ(60px) scale(1.6)",U.portrait.style.filter="grayscale(0%) blur(0px) brightness(1)",U.glow.style.opacity="1",U.name.style.opacity="1",U.name.style.transform="none",U.name.style.filter="none",U.role.style.opacity="1",U.role.style.transform="none",U.role.style.letterSpacing="0.08em",U.accent.style.transform="scaleX(1)",U.el.style.transform="none";for(const at of U.letters)at.style.opacity="1",at.style.transform="none",at.style.filter="none"}else d(U),U.el.style.transform="translateZ(-50px) scale(0.85)"}),i.style.transform="none",p()}function et(){if(document.body.classList.add("mode-team"),document.documentElement.classList.add("team-lock"),f(),a){e.scrollLeft=Math.max(0,m(0)-e.clientWidth/2),ot(),h.start();return}u.forEach(G=>{G.state="idle",G.f=null,d(G)}),g=-1,e.scrollLeft=Math.max(0,m(0)-e.clientWidth/2),p(),k||(k=!0,h.start(),B=requestAnimationFrame(nt))}function dt(){document.body.classList.remove("mode-team"),document.documentElement.classList.remove("team-lock"),k&&(k=!1,cancelAnimationFrame(B)),h&&h.stop()}return e.addEventListener("scroll",()=>{a&&k&&ot()}),r.addEventListener("click",()=>n&&n()),{open:et,close:dt,nav:st,isOpen:()=>document.body.classList.contains("mode-team"),focusCell:rt}}async function e1(){await Promise.allSettled([document.fonts.load("400 26px 'Century Gothic'"),document.fonts.load("600 26px 'Century Gothic'"),document.fonts.load("700 26px 'Century Gothic'"),document.fonts.load("italic 400 26px 'Century Gothic'"),document.fonts.load("italic 700 26px 'Century Gothic'")]);const n=document.getElementById("scene"),t=Je.length,e=u_(n,Je),i=d_();let s=null;function o(U,tt="smooth"){s?s.scrollTo(U,{duration:tt==="smooth"?1.2:0,easing:at=>1-Math.pow(1-at,3)}):document.querySelector("#ui-course .course-main").scrollTo({top:U,behavior:tt})}function r(U){const tt=U==="journey",at=U==="course",q=U==="team";l.isOpen()&&l.close(),a.isOpen()&&a.close(),at&&i.setQuizShown(!1),at&&l.open(),q&&a.open(),document.getElementById("mode-journey").classList.toggle("active",tt),document.getElementById("mode-course-btn").classList.toggle("active",at),document.getElementById("mode-team-btn").classList.toggle("active",q),at?(y.stop(),s==null||s.start()):q?(s==null||s.stop(),y.stop()):(s==null||s.stop(),y.start())}const a=t1({onExit:()=>r("journey")}),l=X_({onExit:()=>r("journey"),onScrollTo:o,onQuiz:()=>{r("journey"),setTimeout(()=>{const U=Math.max(1,I.offsetHeight-window.innerHeight);y.scrollTo(U,{duration:1.6})},120)}});document.getElementById("mode-journey").addEventListener("click",()=>r("journey")),document.getElementById("mode-course-btn").addEventListener("click",()=>r("course")),document.getElementById("mode-team-btn").addEventListener("click",()=>r("team"));const c='<svg class="dn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4.5"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.2 5.2l1.6 1.6M17.2 17.2l1.6 1.6M18.8 5.2l-1.6 1.6M6.8 17.2l-1.6 1.6"/></svg>',u='<svg class="dn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>',d='<svg class="dn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3.4 2"/></svg>',h={auto:"Auto",day:"Jour",night:"Nuit"},f={auto:d,day:c,night:u},m=document.getElementById("ui-daynight");function v(U){const tt=Math.floor(U),at=Math.floor((U-tt)*60);return String(tt).padStart(2,"0")+"h"+String(at).padStart(2,"0")}let g="auto";function p(){e.setTimeMode(g);const U=g==="night";m.classList.toggle("night",U),m.classList.toggle("auto",g==="auto"),m.setAttribute("aria-pressed",String(U));const tt=e.getTimeInfo(),at=g==="auto"?" · "+v(tt.hour):"";m.innerHTML=f[g]+" "+h[g]+at,m.title=g==="auto"?"Heure réelle de la journée — cliquer pour passer en mode Jour":g==="day"?"Mode Jour fixe — cliquer pour passer en mode Nuit":"Mode Nuit fixe — cliquer pour repasser en Auto";try{localStorage.setItem("panneau-light",g)}catch{}}m.addEventListener("click",()=>{g=g==="auto"?"day":g==="day"?"night":"auto",p()});let S="auto";try{const U=localStorage.getItem("panneau-light");U==="auto"||U==="day"||U==="night"?S=U:localStorage.getItem("panneau-night")==="1"&&(S="night")}catch{}const w=new URLSearchParams(window.location.search);w.get("light")&&["auto","day","night"].includes(w.get("light"))&&(g=w.get("light"));const M=w.get("hour");M&&!isNaN(Number(M))&&(e.setHour(Number(M)),g="auto"),p();const E=w.get("at");E&&!isNaN(Number(E))&&setTimeout(()=>{const U=Math.max(1,I.offsetHeight-window.innerHeight);window.scrollTo(0,Math.round(Math.min(1,Math.max(0,Number(E)))*U))},400),(w.get("mode")==="team"||w.get("mode")==="course")&&setTimeout(()=>r(w.get("mode")),400),w.get("hide")==="1"&&!E&&setTimeout(()=>{const U=Math.max(1,I.offsetHeight-window.innerHeight);window.scrollTo(0,Math.round(U*.03))},250),setInterval(()=>{if(g==="auto"){const U=e.getTimeInfo();m.innerHTML=f.auto+" "+h.auto+" · "+v(U.hour)}},3e4);const P=t+2,I=document.getElementById("scroll");function N(){const U=P*window.innerHeight;I.style.height=U+"px"}N();const y=new Ca({duration:1.32,smoothWheel:!0,easing:U=>1-Math.pow(1-U,3),touchMultiplier:1.5,wheelMultiplier:1.05}),x=document.querySelector("#ui-course .course-main");s=new Ca({wrapper:x,content:x,duration:1.25,smoothWheel:!0,easing:U=>1-Math.pow(1-U,3),touchMultiplier:1.6,wheelMultiplier:1});function L(U){y.raf(U),s&&s.raf(U),requestAnimationFrame(L)}requestAnimationFrame(L);let B=0,k=0;function nt(U){const tt=Math.max(1,I.offsetHeight-window.innerHeight),at=Math.min(1,Math.max(0,U/tt));B=at;const q=Math.floor(at*P)-1;k=Math.max(0,Math.min(t-1,q))}let rt=0;y.on("scroll",({scroll:U})=>{nt(U),rt=performance.now()}),nt(window.scrollY||0),e.update(B,k);function st(){e.update(B,k),i.updateGlobal(B,k),e.render(),requestAnimationFrame(st)}requestAnimationFrame(st),window.addEventListener("resize",()=>{N(),e.resize(),nt(window.scrollY||0)}),window.addEventListener("keydown",U=>{if(a.isOpen()){U.key==="Escape"?r("journey"):U.key==="ArrowLeft"?(U.preventDefault(),a.nav(-1)):U.key==="ArrowRight"&&(U.preventDefault(),a.nav(1));return}if(l.isOpen()){U.key==="Escape"?r("journey"):U.key==="ArrowDown"||U.key==="PageDown"?(U.preventDefault(),o(x.scrollTop+window.innerHeight*.8)):(U.key==="ArrowUp"||U.key==="PageUp")&&(U.preventDefault(),o(x.scrollTop-window.innerHeight*.8));return}if(i.isReaderOpen()){const q=document.querySelector(".reader-panel");U.key==="Escape"?i.closeReader():U.key==="ArrowLeft"?i.readerNav(-1):U.key==="ArrowRight"?i.readerNav(1):U.key==="ArrowDown"||U.key==="PageDown"?(U.preventDefault(),q.scrollBy({top:Math.min(q.clientHeight*.7,q.scrollHeight-q.scrollTop),behavior:"smooth"})):(U.key==="ArrowUp"||U.key==="PageUp")&&(U.preventDefault(),q.scrollBy({top:-q.clientHeight*.7,behavior:"smooth"}));return}if(U.key==="Enter"&&k>=0&&!i.quizOpen()){i.openReader(k);return}if(["1","2","3","4"].includes(U.key)&&i.quizOpen()){U.preventDefault(),i.answerQuiz(Number(U.key)-1);return}if(i.quizOpen()){const q=document.querySelector("#ui-quiz");if(U.key==="ArrowDown"||U.key==="PageDown"){U.preventDefault(),q.scrollBy({top:window.innerHeight*.7,behavior:"smooth"});return}if(U.key==="ArrowUp"||U.key==="PageUp"){U.preventDefault(),q.scrollBy({top:-window.innerHeight*.7,behavior:"smooth"});return}}const at=window.innerHeight;U.key==="ArrowDown"||U.key==="PageDown"?(U.preventDefault(),y.scrollTo(window.scrollY+at,{duration:1.1})):(U.key==="ArrowUp"||U.key==="PageUp")&&(U.preventDefault(),y.scrollTo(Math.max(0,window.scrollY-at),{duration:1.1}))});let ot=null;function et(U,tt){document.documentElement.classList.toggle(tt,U),U?(ot=window.scrollY,y.stop()):(ot=null,y.start())}window.addEventListener("scroll",()=>{ot!==null&&Math.abs(window.scrollY-ot)>2&&window.scrollTo(0,ot)},{passive:!0}),i.setReaderListener(U=>et(U,"reader-lock")),i.setQuizListener(U=>et(U,"quiz-lock"));function dt(U){return{nx:U.clientX/window.innerWidth*2-1,ny:-(U.clientY/window.innerHeight)*2+1}}window.addEventListener("click",U=>{if(a.isOpen()||l.isOpen()||i.isReaderOpen()||i.quizOpen()||U.target.closest&&U.target.closest("#ui"))return;const{nx:tt,ny:at}=dt(U),q=e.pick(tt,at);if(q){if(q.kind==="panel"){i.openReader(q.index);return}if(q.kind==="pigeon"){e.interact({kind:"pigeon",index:q.index});return}if(q.kind==="balloon"){e.interact({kind:"balloon",index:q.index}),i.showToast(q.tip);return}if(q.kind==="fountain"){e.interact({kind:"fountain",index:q.index}),i.showToast(q.tip);return}if(q.kind==="car"){e.interact({kind:"car",index:q.index});return}if(q.kind==="bille"){e.interact({kind:"bille",index:q.index}),i.showToast(q.tip);return}q.tip&&i.showToast(q.tip)}});let G=!1;window.addEventListener("mouseout",U=>{U.relatedTarget||(document.body.classList.remove("hover-pick","hover-fun"),e.setHover(null))}),window.addEventListener("blur",()=>{document.body.classList.remove("hover-pick","hover-fun"),e.setHover(null)}),window.addEventListener("mousemove",U=>{G||(G=!0,requestAnimationFrame(()=>{if(G=!1,a.isOpen()||l.isOpen()||i.isReaderOpen())return;if(i.quizOpen()){document.body.classList.remove("hover-pick","hover-fun"),e.setHover(null);return}if(performance.now()-rt<200){document.body.classList.remove("hover-pick","hover-fun"),e.setHover(null);return}const{nx:tt,ny:at}=dt(U),q=e.pick(tt,at);document.body.classList.toggle("hover-pick",!!q&&q.kind!=="pigeon"),document.body.classList.toggle("hover-fun",!!q&&q.kind==="pigeon"),e.setHover(q)}))}),window.__panneautique={openReader:i.openReader,closeReader:i.closeReader,openCourse:()=>r("course"),closeCourse:()=>r("journey"),openTeam:()=>r("team"),closeTeam:()=>r("journey"),pickAt:(U,tt)=>{const at=e.pick(U/window.innerWidth*2-1,-(tt/window.innerHeight)*2+1);return at?{kind:at.kind,index:at.index,tip:at.tip}:null},interactAt:(U,tt)=>{const at=e.pick(U/window.innerWidth*2-1,-(tt/window.innerHeight)*2+1);return at&&e.interact({kind:at.kind,index:at.index}),at?{kind:at.kind,index:at.index,tip:at.tip}:null},project:(U,tt)=>{const at=e.projectPickable(U,tt);return at?{x:Math.round((at.x*.5+.5)*innerWidth),y:Math.round((-at.y*.5+.5)*innerHeight)}:null},reactive:()=>e.getReactiveState(),scrollToRatio:U=>{const tt=Math.max(1,I.offsetHeight-window.innerHeight);y.scrollTo(Math.round(Math.min(1,Math.max(0,U))*tt),{duration:.8})},getState:()=>{const U=e.getCameraPos();return{progress:B,activeIndex:k,cam:{x:U.x,y:U.y,z:U.z}}},settle:(U,tt)=>{for(let q=0;q<2400;q++)e.update(U,tt);const at=e.getCameraPos();return{cam:{x:at.x,y:at.y,z:at.z},progress:U,activeIndex:tt}},setHour:U=>e.setHour(U),setLightMode:U=>{g=U,p()},getTimeInfo:()=>e.getTimeInfo(),panelCanvas:(U,tt)=>{const at=e.getPanelCanvas(U,tt);return at?{w:at.width,h:at.height,dataUrl:at.toDataURL("image/png")}:null}},setTimeout(()=>{document.getElementById("ui-topbar").classList.add("visible"),document.getElementById("ui-dots").classList.add("visible"),document.getElementById("ui-hint").classList.add("visible")},1200),document.querySelectorAll(".dot").forEach((U,tt)=>{U.addEventListener("click",()=>{const at=(tt+1.5)/P,q=Math.max(1,I.offsetHeight-window.innerHeight);y.scrollTo(Math.round(at*q),{duration:1.4})})})}e1();
