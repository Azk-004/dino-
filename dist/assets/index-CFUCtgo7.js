var zd=Object.defineProperty;var Fd=(n,t,e)=>t in n?zd(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var Ot=(n,t,e)=>Fd(n,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function e(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(s){if(s.ep)return;s.ep=!0;const o=e(s);fetch(s.href,o)}})();var gl="1.3.26";function Gc(n,t,e){return Math.max(n,Math.min(t,e))}function Od(n,t,e){return(1-e)*n+e*t}function Bd(n,t,e,i){return Od(n,t,1-Math.exp(-e*i))}function kd(n,t){return(n%t+t)%t}var Gd=class{constructor(){Ot(this,"isRunning",!1);Ot(this,"value",0);Ot(this,"from",0);Ot(this,"to",0);Ot(this,"currentTime",0);Ot(this,"lerp");Ot(this,"duration");Ot(this,"easing");Ot(this,"onUpdate")}advance(n){var e;if(!this.isRunning)return;let t=!1;if(this.duration&&this.easing){this.currentTime+=n;const i=Gc(0,this.currentTime/this.duration,1);t=i>=1;const s=t?1:this.easing(i);this.value=this.from+(this.to-this.from)*s}else this.lerp?(this.value=Bd(this.value,this.to,this.lerp*60,n),Math.round(this.value)===Math.round(this.to)&&(this.value=this.to,t=!0)):(this.value=this.to,t=!0);t&&this.stop(),(e=this.onUpdate)==null||e.call(this,this.value,t)}stop(){this.isRunning=!1}fromTo(n,t,{lerp:e,duration:i,easing:s,onStart:o,onUpdate:r}){this.from=this.value=n,this.to=t,this.lerp=e,this.duration=i,this.easing=s,this.currentTime=0,this.isRunning=!0,o==null||o(),this.onUpdate=r}};function Hd(n,t){let e;return function(...i){clearTimeout(e),e=setTimeout(()=>{e=void 0,n.apply(this,i)},t)}}var Vd=class{constructor(n,t,{autoResize:e=!0,debounce:i=250}={}){Ot(this,"width",0);Ot(this,"height",0);Ot(this,"scrollHeight",0);Ot(this,"scrollWidth",0);Ot(this,"debouncedResize");Ot(this,"wrapperResizeObserver");Ot(this,"contentResizeObserver");Ot(this,"resize",()=>{this.onWrapperResize(),this.onContentResize()});Ot(this,"onWrapperResize",()=>{this.wrapper instanceof Window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)});Ot(this,"onContentResize",()=>{this.wrapper instanceof Window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)});this.wrapper=n,this.content=t,e&&(this.debouncedResize=Hd(this.resize,i),this.wrapper instanceof Window?window.addEventListener("resize",this.debouncedResize):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){var n,t;(n=this.wrapperResizeObserver)==null||n.disconnect(),(t=this.contentResizeObserver)==null||t.disconnect(),this.wrapper===window&&this.debouncedResize&&window.removeEventListener("resize",this.debouncedResize)}get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},Hc=class{constructor(){Ot(this,"events",{})}emit(n,...t){var i;const e=this.events[n]||[];for(let s=0,o=e.length;s<o;s++)(i=e[s])==null||i.call(e,...t)}on(n,t){return this.events[n]?this.events[n].push(t):this.events[n]=[t],()=>{var e;this.events[n]=(e=this.events[n])==null?void 0:e.filter(i=>t!==i)}}off(n,t){var e;this.events[n]=(e=this.events[n])==null?void 0:e.filter(i=>t!==i)}destroy(){this.events={}}};const Wd=100/6,ri={passive:!1};function vl(n,t){return n===1?Wd:n===2?t:1}var Xd=class{constructor(n,t={wheelMultiplier:1,touchMultiplier:1}){Ot(this,"touchStart",{x:0,y:0});Ot(this,"lastDelta",{x:0,y:0});Ot(this,"window",{width:0,height:0});Ot(this,"emitter",new Hc);Ot(this,"onTouchStart",n=>{const{clientX:t,clientY:e}=n.targetTouches?n.targetTouches[0]:n;this.touchStart.x=t,this.touchStart.y=e,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:n})});Ot(this,"onTouchMove",n=>{const{clientX:t,clientY:e}=n.targetTouches?n.targetTouches[0]:n,i=-(t-this.touchStart.x)*this.options.touchMultiplier,s=-(e-this.touchStart.y)*this.options.touchMultiplier;this.touchStart.x=t,this.touchStart.y=e,this.lastDelta={x:i,y:s},this.emitter.emit("scroll",{deltaX:i,deltaY:s,event:n})});Ot(this,"onTouchEnd",n=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:n})});Ot(this,"onWheel",n=>{let{deltaX:t,deltaY:e,deltaMode:i}=n;const s=vl(i,this.window.width),o=vl(i,this.window.height);t*=s,e*=o,t*=this.options.wheelMultiplier,e*=this.options.wheelMultiplier,this.emitter.emit("scroll",{deltaX:t,deltaY:e,event:n})});Ot(this,"onWindowResize",()=>{this.window={width:window.innerWidth,height:window.innerHeight}});this.element=n,this.options=t,window.addEventListener("resize",this.onWindowResize),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,ri),this.element.addEventListener("touchstart",this.onTouchStart,ri),this.element.addEventListener("touchmove",this.onTouchMove,ri),this.element.addEventListener("touchend",this.onTouchEnd,ri)}on(n,t){return this.emitter.on(n,t)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize),this.element.removeEventListener("wheel",this.onWheel,ri),this.element.removeEventListener("touchstart",this.onTouchStart,ri),this.element.removeEventListener("touchmove",this.onTouchMove,ri),this.element.removeEventListener("touchend",this.onTouchEnd,ri)}};const _l=n=>Math.min(1,1.001-2**(-10*n));var Ml=class{constructor({wrapper:n=window,content:t=document.documentElement,eventsTarget:e=n,smoothWheel:i=!0,syncTouch:s=!1,syncTouchLerp:o=.075,touchInertiaExponent:r=1.7,duration:a,easing:l,lerp:c=.1,infinite:d=!1,orientation:h="vertical",gestureOrientation:u=h==="horizontal"?"both":"vertical",touchMultiplier:f=1,wheelMultiplier:m=1,autoResize:v=!0,prevent:g,virtualScroll:p,overscroll:T=!0,autoRaf:_=!1,anchors:M=!1,autoToggle:F=!1,allowNestedScroll:L=!1,__experimental__naiveDimensions:D=!1,naiveDimensions:I=D,stopInertiaOnNavigate:y=!1,respectReducedMotion:x=!0}={}){Ot(this,"_isScrolling",!1);Ot(this,"_isStopped",!1);Ot(this,"_isLocked",!1);Ot(this,"_preventNextNativeScrollEvent",!1);Ot(this,"_resetVelocityTimeout",null);Ot(this,"_rafId",null);Ot(this,"_isDraggingSelection",!1);Ot(this,"reducedMotionMediaQuery",window.matchMedia("(prefers-reduced-motion: reduce)"));Ot(this,"isTouching");Ot(this,"isIos");Ot(this,"time",0);Ot(this,"userData",{});Ot(this,"lastVelocity",0);Ot(this,"velocity",0);Ot(this,"direction",0);Ot(this,"options");Ot(this,"targetScroll");Ot(this,"animatedScroll");Ot(this,"animate",new Gd);Ot(this,"emitter",new Hc);Ot(this,"dimensions");Ot(this,"virtualScroll");Ot(this,"onScrollEnd",n=>{n instanceof CustomEvent||(this.isScrolling==="smooth"||this.isScrolling===!1)&&n.stopPropagation()});Ot(this,"dispatchScrollendEvent",()=>{this.options.wrapper.dispatchEvent(new CustomEvent("scrollend",{bubbles:this.options.wrapper===window,detail:{lenisScrollEnd:!0}}))});Ot(this,"onTransitionEnd",n=>{var t;(t=n.propertyName)!=null&&t.includes("overflow")&&n.target===this.rootElement&&this.checkOverflow()});Ot(this,"onClick",n=>{const t=n.composedPath().filter(i=>i instanceof HTMLAnchorElement&&i.href).map(i=>new URL(i.href)),e=new URL(window.location.href);if(this.options.anchors){const i=t.find(s=>e.host===s.host&&e.pathname===s.pathname&&s.hash);if(i){const s=typeof this.options.anchors=="object"&&this.options.anchors?this.options.anchors:void 0,o=decodeURIComponent(i.hash);this.scrollTo(o,s);return}}if(this.options.stopInertiaOnNavigate&&t.some(i=>e.host===i.host&&e.pathname!==i.pathname)){this.reset();return}});Ot(this,"onPointerDown",n=>{n.button===1&&this.reset()});Ot(this,"onVirtualScroll",n=>{if(typeof this.options.virtualScroll=="function"&&this.options.virtualScroll(n)===!1)return;const{deltaX:t,deltaY:e,event:i}=n;if(this.emitter.emit("virtual-scroll",{deltaX:t,deltaY:e,event:i}),i.ctrlKey||i.lenisStopPropagation)return;const s=i.type.includes("touch"),o=i.type.includes("wheel");if(s&&this.isIos&&(i.type==="touchstart"&&(this._isDraggingSelection=this.isTouchOnSelectionHandle(i)),this._isDraggingSelection)){i.type==="touchend"&&(this._isDraggingSelection=!1);return}this.isTouching=i.type==="touchstart"||i.type==="touchmove";const r=t===0&&e===0;if(this.options.syncTouch&&s&&i.type==="touchstart"&&r&&!this.isStopped&&!this.isLocked){this.reset();return}const a=this.options.gestureOrientation==="vertical"&&e===0||this.options.gestureOrientation==="horizontal"&&t===0;if(r||a)return;let l=i.composedPath();l=l.slice(0,l.indexOf(this.rootElement));const c=this.options.prevent,d=Math.abs(t)>=Math.abs(e)?"horizontal":"vertical";if(l.find(m=>{var v,g,p,T,_;return m instanceof HTMLElement&&(typeof c=="function"&&(c==null?void 0:c(m))||((v=m.hasAttribute)==null?void 0:v.call(m,"data-lenis-prevent"))||d==="vertical"&&((g=m.hasAttribute)==null?void 0:g.call(m,"data-lenis-prevent-vertical"))||d==="horizontal"&&((p=m.hasAttribute)==null?void 0:p.call(m,"data-lenis-prevent-horizontal"))||s&&((T=m.hasAttribute)==null?void 0:T.call(m,"data-lenis-prevent-touch"))||o&&((_=m.hasAttribute)==null?void 0:_.call(m,"data-lenis-prevent-wheel"))||this.options.allowNestedScroll&&this.hasNestedScroll(m,{deltaX:t,deltaY:e}))}))return;if(this.isStopped||this.isLocked){i.cancelable&&i.preventDefault();return}if(!(this.options.syncTouch&&s||this.options.smoothWheel&&o)){this.isScrolling="native",this.animate.stop(),i.lenisStopPropagation=!0;return}let h=e;this.options.gestureOrientation==="both"?h=Math.abs(e)>Math.abs(t)?e:t:this.options.gestureOrientation==="horizontal"&&(h=t),(!this.options.overscroll||this.options.infinite||this.options.wrapper!==window&&this.limit>0&&(this.animatedScroll>0&&this.animatedScroll<this.limit||this.animatedScroll===0&&e>0||this.animatedScroll===this.limit&&e<0))&&(i.lenisStopPropagation=!0),i.cancelable&&i.preventDefault();const u=s&&this.options.syncTouch,f=s&&i.type==="touchend";f&&(h=Math.sign(h)*Math.abs(this.velocity)**this.options.touchInertiaExponent),this.scrollTo(this.targetScroll+h,{programmatic:!1,...u?{lerp:f?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}})});Ot(this,"onNativeScroll",()=>{if(this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this._preventNextNativeScrollEvent){this._preventNextNativeScrollEvent=!1;return}if(this.isScrolling===!1||this.isScrolling==="native"){const n=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-n,this.direction=Math.sign(this.animatedScroll-n),this.isStopped||(this.isScrolling="native"),this.emit(),this.velocity!==0&&(this._resetVelocityTimeout=setTimeout(()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()},400))}});Ot(this,"raf",n=>{const t=n-(this.time||n);this.time=n,this.animate.advance(t*.001),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))});window.lenisVersion=gl,window.lenis||(window.lenis={}),window.lenis.version=gl,h==="horizontal"&&(window.lenis.horizontal=!0),s===!0&&(window.lenis.touch=!0),this.isIos=/(iPad|iPhone|iPod)/g.test(navigator.userAgent),(!n||n===document.documentElement)&&(n=window),typeof a=="number"&&typeof l!="function"?l=_l:typeof l=="function"&&typeof a!="number"&&(a=1),this.options={wrapper:n,content:t,eventsTarget:e,smoothWheel:i,syncTouch:s,syncTouchLerp:o,touchInertiaExponent:r,duration:a,easing:l,lerp:c,infinite:d,gestureOrientation:u,orientation:h,touchMultiplier:f,wheelMultiplier:m,autoResize:v,prevent:g,virtualScroll:p,overscroll:T,autoRaf:_,anchors:M,autoToggle:F,allowNestedScroll:L,naiveDimensions:I,stopInertiaOnNavigate:y,respectReducedMotion:x},this.dimensions=new Vd(n,t,{autoResize:v}),this.updateClassName(),this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll),this.options.wrapper.addEventListener("scrollend",this.onScrollEnd,{capture:!0}),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.addEventListener("click",this.onClick),this.options.wrapper.addEventListener("pointerdown",this.onPointerDown),this.virtualScroll=new Xd(e,{touchMultiplier:f,wheelMultiplier:m}),this.virtualScroll.on("scroll",this.onVirtualScroll),this.options.autoToggle&&(this.checkOverflow(),this.rootElement.addEventListener("transitionend",this.onTransitionEnd)),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll),this.options.wrapper.removeEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.wrapper.removeEventListener("pointerdown",this.onPointerDown),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.removeEventListener("click",this.onClick),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName(),this._rafId&&cancelAnimationFrame(this._rafId)}on(n,t){return this.emitter.on(n,t)}off(n,t){return this.emitter.off(n,t)}get overflow(){const n=this.isHorizontal?"overflow-x":"overflow-y";return getComputedStyle(this.rootElement)[n]}checkOverflow(){["hidden","clip"].includes(this.overflow)?this.internalStop():this.internalStart()}setScroll(n){this.isHorizontal?this.options.wrapper.scrollTo({left:n,behavior:"instant"}):this.options.wrapper.scrollTo({top:n,behavior:"instant"})}isTouchOnSelectionHandle(n){const t=window.getSelection();if(!t||t.isCollapsed||t.rangeCount===0)return!1;const e=n.targetTouches[0]??n.changedTouches[0];if(!e)return!1;const i=t.getRangeAt(0).getClientRects();if(i.length===0)return!1;const s=i[0],o=i[i.length-1],r=40,a=Math.hypot(e.clientX-s.left,e.clientY-s.top)<=r,l=Math.hypot(e.clientX-o.right,e.clientY-o.bottom)<=r;return a||l}resize(){this.dimensions.resize(),this.animatedScroll=this.targetScroll=this.actualScroll,this.emit()}emit(){this.emitter.emit("scroll",this)}reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){if(this.isStopped){if(this.options.autoToggle){this.rootElement.style.removeProperty("overflow");return}this.internalStart()}}internalStart(){this.isStopped&&(this.reset(),this.isStopped=!1,this.emit())}stop(){if(!this.isStopped){if(this.options.autoToggle){this.rootElement.style.setProperty("overflow","clip");return}this.internalStop()}}internalStop(){this.isStopped||(this.reset(),this.isStopped=!0,this.emit())}scrollTo(n,{offset:t=0,immediate:e=!1,lock:i=!1,programmatic:s=!0,lerp:o=s?this.options.lerp:void 0,duration:r=s?this.options.duration:void 0,easing:a=s?this.options.easing:void 0,onStart:l,onComplete:c,force:d=!1,userData:h}={}){if(this.prefersReducedMotion&&(s?e=!0:(o=1,r=void 0,a=void 0)),(this.isStopped||this.isLocked)&&!d)return;let u=n,f=t;if(typeof u=="string"&&["top","left","start","#"].includes(u))u=0;else if(typeof u=="string"&&["bottom","right","end"].includes(u))u=this.limit;else{let m=null;if(typeof u=="string"?(m=u.startsWith("#")?document.getElementById(u.slice(1)):document.querySelector(u),m||(u==="#top"?u=0:console.warn("Lenis: Target not found",u))):u instanceof HTMLElement&&(u!=null&&u.nodeType)&&(m=u),m){if(this.options.wrapper!==window){const M=this.rootElement.getBoundingClientRect();f-=this.isHorizontal?M.left:M.top}const v=m.getBoundingClientRect(),g=getComputedStyle(m),p=this.isHorizontal?Number.parseFloat(g.scrollMarginLeft):Number.parseFloat(g.scrollMarginTop),T=getComputedStyle(this.rootElement),_=this.isHorizontal?Number.parseFloat(T.scrollPaddingLeft):Number.parseFloat(T.scrollPaddingTop);u=(this.isHorizontal?v.left:v.top)+this.animatedScroll-(Number.isNaN(p)?0:p)-(Number.isNaN(_)?0:_)}}if(typeof u=="number"){if(u+=f,this.options.infinite){if(s){this.targetScroll=this.animatedScroll=this.scroll;const m=u-this.animatedScroll;m>this.limit/2?u-=this.limit:m<-this.limit/2&&(u+=this.limit)}}else u=Gc(0,u,this.limit);if(u===this.targetScroll){l==null||l(this),c==null||c(this);return}if(this.userData=h??{},e){this.animatedScroll=this.targetScroll=u,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),c==null||c(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()});return}s||(this.targetScroll=u),typeof r=="number"&&typeof a!="function"?a=_l:typeof a=="function"&&typeof r!="number"&&(r=1),this.animate.fromTo(this.animatedScroll,u,{duration:r,easing:a,lerp:o,onStart:()=>{i&&(this.isLocked=!0),this.isScrolling="smooth",l==null||l(this)},onUpdate:(m,v)=>{this.isScrolling="smooth",this.lastVelocity=this.velocity,this.velocity=m-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=m,this.setScroll(this.scroll),s&&(this.targetScroll=m),v||this.emit(),v&&(this.reset(),this.emit(),c==null||c(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()}),this.preventNextNativeScrollEvent())}})}}preventNextNativeScrollEvent(){this._preventNextNativeScrollEvent=!0,requestAnimationFrame(()=>{this._preventNextNativeScrollEvent=!1})}hasNestedScroll(n,{deltaX:t,deltaY:e}){const i=Date.now();n._lenis||(n._lenis={});const s=n._lenis;let o,r,a,l,c,d,h,u,f,m;if(i-(s.time??0)>2e3){s.time=Date.now();const L=window.getComputedStyle(n);if(s.computedStyle=L,o=["auto","overlay","scroll"].includes(L.overflowX),r=["auto","overlay","scroll"].includes(L.overflowY),c=["auto"].includes(L.overscrollBehaviorX),d=["auto"].includes(L.overscrollBehaviorY),s.hasOverflowX=o,s.hasOverflowY=r,!(o||r))return!1;h=n.scrollWidth,u=n.scrollHeight,f=n.clientWidth,m=n.clientHeight,a=h>f,l=u>m,s.isScrollableX=a,s.isScrollableY=l,s.scrollWidth=h,s.scrollHeight=u,s.clientWidth=f,s.clientHeight=m,s.hasOverscrollBehaviorX=c,s.hasOverscrollBehaviorY=d}else a=s.isScrollableX,l=s.isScrollableY,o=s.hasOverflowX,r=s.hasOverflowY,h=s.scrollWidth,u=s.scrollHeight,f=s.clientWidth,m=s.clientHeight,c=s.hasOverscrollBehaviorX,d=s.hasOverscrollBehaviorY;if(!(o&&a||r&&l))return!1;const v=Math.abs(t)>=Math.abs(e)?"horizontal":"vertical";let g,p,T,_,M,F;if(v==="horizontal")g=Math.round(n.scrollLeft),p=h-f,T=t,_=o,M=a,F=c;else if(v==="vertical")g=Math.round(n.scrollTop),p=u-m,T=e,_=r,M=l,F=d;else return!1;return!F&&(g>=p||g<=0)?!0:(T>0?g<p:g>0)&&_&&M}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return this.options.orientation==="horizontal"}get actualScroll(){const n=this.options.wrapper;return this.isHorizontal?n.scrollX??n.scrollLeft:n.scrollY??n.scrollTop}get scroll(){return this.options.infinite?kd(this.animatedScroll,this.limit):this.animatedScroll}get progress(){return this.limit===0?1:this.scroll/this.limit}get isScrolling(){return this._isScrolling}set isScrolling(n){this._isScrolling!==n&&(this._isScrolling=n,this.updateClassName())}get isStopped(){return this._isStopped}set isStopped(n){this._isStopped!==n&&(this._isStopped=n,this.updateClassName())}get isLocked(){return this._isLocked}set isLocked(n){this._isLocked!==n&&(this._isLocked=n,this.updateClassName())}get isSmooth(){return this.isScrolling==="smooth"}get prefersReducedMotion(){return this.options.respectReducedMotion&&this.reducedMotionMediaQuery.matches}get className(){let n="lenis";return this.options.autoToggle&&(n+=" lenis-autoToggle"),this.isStopped&&(n+=" lenis-stopped"),this.isLocked&&(n+=" lenis-locked"),this.isScrolling&&(n+=" lenis-scrolling"),this.isScrolling==="smooth"&&(n+=" lenis-smooth"),n}updateClassName(){this.cleanUpClassName(),this.className.split(" ").forEach(n=>{this.rootElement.classList.add(n)})}cleanUpClassName(){for(const n of Array.from(this.rootElement.classList))(n==="lenis"||n.startsWith("lenis-"))&&this.rootElement.classList.remove(n)}};/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const $a="170",qd=0,yl=1,Yd=2,Vc=1,rr=2,qn=3,Mi=0,en=1,ze=2,vi=0,Bi=1,Ze=2,xl=3,Sl=4,$d=5,Ni=100,Zd=101,Kd=102,jd=103,Jd=104,Qd=200,tu=201,eu=202,nu=203,oa=204,ra=205,iu=206,su=207,ou=208,ru=209,au=210,lu=211,cu=212,du=213,uu=214,aa=0,la=1,ca=2,ys=3,da=4,ua=5,ha=6,fa=7,Za=0,hu=1,fu=2,_i=0,pu=1,mu=2,gu=3,ar=4,vu=5,_u=6,Mu=7,Wc=300,xs=301,Ss=302,pa=303,ma=304,lr=306,yi=1e3,Fi=1001,ga=1002,Cn=1003,yu=1004,fo=1005,Nn=1006,gr=1007,Oi=1008,ti=1009,Xc=1010,qc=1011,eo=1012,Ka=1013,ki=1014,Zn=1015,so=1016,ja=1017,Ja=1018,ws=1020,Yc=35902,$c=1021,Zc=1022,An=1023,Kc=1024,jc=1025,ms=1026,bs=1027,Jc=1028,Qa=1029,Qc=1030,tl=1031,el=1033,Wo=33776,Xo=33777,qo=33778,Yo=33779,va=35840,_a=35841,Ma=35842,ya=35843,xa=36196,Sa=37492,wa=37496,ba=37808,Ea=37809,Ta=37810,Aa=37811,Ca=37812,Ra=37813,Pa=37814,La=37815,Ia=37816,Da=37817,Ua=37818,Na=37819,za=37820,Fa=37821,$o=36492,Oa=36494,Ba=36495,td=36283,ka=36284,Ga=36285,Ha=36286,xu=3200,Su=3201,nl=0,wu=1,pi="",_e="srgb",Cs="srgb-linear",cr="linear",xe="srgb",$i=7680,wl=519,bu=512,Eu=513,Tu=514,ed=515,Au=516,Cu=517,Ru=518,Pu=519,Va=35044,bl="300 es",Kn=2e3,jo=2001;class Rs{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const o=s.indexOf(e);o!==-1&&s.splice(o,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const i=this._listeners[t.type];if(i!==void 0){t.target=this;const s=i.slice(0);for(let o=0,r=s.length;o<r;o++)s[o].call(this,t);t.target=null}}}const Qe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let El=1234567;const Ks=Math.PI/180,no=180/Math.PI;function jn(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Qe[n&255]+Qe[n>>8&255]+Qe[n>>16&255]+Qe[n>>24&255]+"-"+Qe[t&255]+Qe[t>>8&255]+"-"+Qe[t>>16&15|64]+Qe[t>>24&255]+"-"+Qe[e&63|128]+Qe[e>>8&255]+"-"+Qe[e>>16&255]+Qe[e>>24&255]+Qe[i&255]+Qe[i>>8&255]+Qe[i>>16&255]+Qe[i>>24&255]).toLowerCase()}function Ke(n,t,e){return Math.max(t,Math.min(e,n))}function il(n,t){return(n%t+t)%t}function Lu(n,t,e,i,s){return i+(n-t)*(s-i)/(e-t)}function Iu(n,t,e){return n!==t?(e-n)/(t-n):0}function js(n,t,e){return(1-e)*n+e*t}function Du(n,t,e,i){return js(n,t,1-Math.exp(-e*i))}function Uu(n,t=1){return t-Math.abs(il(n,t*2)-t)}function Nu(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function zu(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function Fu(n,t){return n+Math.floor(Math.random()*(t-n+1))}function Ou(n,t){return n+Math.random()*(t-n)}function Bu(n){return n*(.5-Math.random())}function ku(n){n!==void 0&&(El=n);let t=El+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Gu(n){return n*Ks}function Hu(n){return n*no}function Vu(n){return(n&n-1)===0&&n!==0}function Wu(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Xu(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function qu(n,t,e,i,s){const o=Math.cos,r=Math.sin,a=o(e/2),l=r(e/2),c=o((t+i)/2),d=r((t+i)/2),h=o((t-i)/2),u=r((t-i)/2),f=o((i-t)/2),m=r((i-t)/2);switch(s){case"XYX":n.set(a*d,l*h,l*u,a*c);break;case"YZY":n.set(l*u,a*d,l*h,a*c);break;case"ZXZ":n.set(l*h,l*u,a*d,a*c);break;case"XZX":n.set(a*d,l*m,l*f,a*c);break;case"YXY":n.set(l*f,a*d,l*m,a*c);break;case"ZYZ":n.set(l*m,l*f,a*d,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Tn(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function ve(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const an={DEG2RAD:Ks,RAD2DEG:no,generateUUID:jn,clamp:Ke,euclideanModulo:il,mapLinear:Lu,inverseLerp:Iu,lerp:js,damp:Du,pingpong:Uu,smoothstep:Nu,smootherstep:zu,randInt:Fu,randFloat:Ou,randFloatSpread:Bu,seededRandom:ku,degToRad:Gu,radToDeg:Hu,isPowerOfTwo:Vu,ceilPowerOfTwo:Wu,floorPowerOfTwo:Xu,setQuaternionFromProperEuler:qu,normalize:ve,denormalize:Tn};class Dt{constructor(t=0,e=0){Dt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Ke(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),s=Math.sin(e),o=this.x-t.x,r=this.y-t.y;return this.x=o*i-r*s+t.x,this.y=o*s+r*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class te{constructor(t,e,i,s,o,r,a,l,c){te.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,o,r,a,l,c)}set(t,e,i,s,o,r,a,l,c){const d=this.elements;return d[0]=t,d[1]=s,d[2]=a,d[3]=e,d[4]=o,d[5]=l,d[6]=i,d[7]=r,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,o=this.elements,r=i[0],a=i[3],l=i[6],c=i[1],d=i[4],h=i[7],u=i[2],f=i[5],m=i[8],v=s[0],g=s[3],p=s[6],T=s[1],_=s[4],M=s[7],F=s[2],L=s[5],D=s[8];return o[0]=r*v+a*T+l*F,o[3]=r*g+a*_+l*L,o[6]=r*p+a*M+l*D,o[1]=c*v+d*T+h*F,o[4]=c*g+d*_+h*L,o[7]=c*p+d*M+h*D,o[2]=u*v+f*T+m*F,o[5]=u*g+f*_+m*L,o[8]=u*p+f*M+m*D,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],s=t[2],o=t[3],r=t[4],a=t[5],l=t[6],c=t[7],d=t[8];return e*r*d-e*a*c-i*o*d+i*a*l+s*o*c-s*r*l}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],o=t[3],r=t[4],a=t[5],l=t[6],c=t[7],d=t[8],h=d*r-a*c,u=a*l-d*o,f=c*o-r*l,m=e*h+i*u+s*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/m;return t[0]=h*v,t[1]=(s*c-d*i)*v,t[2]=(a*i-s*r)*v,t[3]=u*v,t[4]=(d*e-s*l)*v,t[5]=(s*o-a*e)*v,t[6]=f*v,t[7]=(i*l-c*e)*v,t[8]=(r*e-i*o)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,o,r,a){const l=Math.cos(o),c=Math.sin(o);return this.set(i*l,i*c,-i*(l*r+c*a)+r+t,-s*c,s*l,-s*(-c*r+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(vr.makeScale(t,e)),this}rotate(t){return this.premultiply(vr.makeRotation(-t)),this}translate(t,e){return this.premultiply(vr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const vr=new te;function nd(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function Jo(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Yu(){const n=Jo("canvas");return n.style.display="block",n}const Tl={};function qs(n){n in Tl||(Tl[n]=!0,console.warn(n))}function $u(n,t,e){return new Promise(function(i,s){function o(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(o,e);break;default:i()}}setTimeout(o,e)})}function Zu(n){const t=n.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Ku(n){const t=n.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const he={enabled:!0,workingColorSpace:Cs,spaces:{},convert:function(n,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===xe&&(n.r=Jn(n.r),n.g=Jn(n.g),n.b=Jn(n.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(n.applyMatrix3(this.spaces[t].toXYZ),n.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===xe&&(n.r=gs(n.r),n.g=gs(n.g),n.b=gs(n.b))),n},fromWorkingColorSpace:function(n,t){return this.convert(n,this.workingColorSpace,t)},toWorkingColorSpace:function(n,t){return this.convert(n,t,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===pi?cr:this.spaces[n].transfer},getLuminanceCoefficients:function(n,t=this.workingColorSpace){return n.fromArray(this.spaces[t].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,t,e){return n.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace}};function Jn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function gs(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}const Al=[.64,.33,.3,.6,.15,.06],Cl=[.2126,.7152,.0722],Rl=[.3127,.329],Pl=new te().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ll=new te().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);he.define({[Cs]:{primaries:Al,whitePoint:Rl,transfer:cr,toXYZ:Pl,fromXYZ:Ll,luminanceCoefficients:Cl,workingColorSpaceConfig:{unpackColorSpace:_e},outputColorSpaceConfig:{drawingBufferColorSpace:_e}},[_e]:{primaries:Al,whitePoint:Rl,transfer:xe,toXYZ:Pl,fromXYZ:Ll,luminanceCoefficients:Cl,outputColorSpaceConfig:{drawingBufferColorSpace:_e}}});let Zi;class ju{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Zi===void 0&&(Zi=Jo("canvas")),Zi.width=t.width,Zi.height=t.height;const i=Zi.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=Zi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Jo("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const s=i.getImageData(0,0,t.width,t.height),o=s.data;for(let r=0;r<o.length;r++)o[r]=Jn(o[r]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Jn(e[i]/255)*255):e[i]=Jn(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Ju=0;class id{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Ju++}),this.uuid=jn(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let o;if(Array.isArray(s)){o=[];for(let r=0,a=s.length;r<a;r++)s[r].isDataTexture?o.push(_r(s[r].image)):o.push(_r(s[r]))}else o=_r(s);i.url=o}return e||(t.images[this.uuid]=i),i}}function _r(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?ju.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Qu=0;class cn extends Rs{constructor(t=cn.DEFAULT_IMAGE,e=cn.DEFAULT_MAPPING,i=Fi,s=Fi,o=Nn,r=Oi,a=An,l=ti,c=cn.DEFAULT_ANISOTROPY,d=pi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Qu++}),this.uuid=jn(),this.name="",this.source=new id(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=o,this.minFilter=r,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Dt(0,0),this.repeat=new Dt(1,1),this.center=new Dt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new te,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Wc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case yi:t.x=t.x-Math.floor(t.x);break;case Fi:t.x=t.x<0?0:1;break;case ga:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case yi:t.y=t.y-Math.floor(t.y);break;case Fi:t.y=t.y<0?0:1;break;case ga:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}cn.DEFAULT_IMAGE=null;cn.DEFAULT_MAPPING=Wc;cn.DEFAULT_ANISOTROPY=1;class Se{constructor(t=0,e=0,i=0,s=1){Se.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,o=this.w,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s+r[12]*o,this.y=r[1]*e+r[5]*i+r[9]*s+r[13]*o,this.z=r[2]*e+r[6]*i+r[10]*s+r[14]*o,this.w=r[3]*e+r[7]*i+r[11]*s+r[15]*o,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,o;const l=t.elements,c=l[0],d=l[4],h=l[8],u=l[1],f=l[5],m=l[9],v=l[2],g=l[6],p=l[10];if(Math.abs(d-u)<.01&&Math.abs(h-v)<.01&&Math.abs(m-g)<.01){if(Math.abs(d+u)<.1&&Math.abs(h+v)<.1&&Math.abs(m+g)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const _=(c+1)/2,M=(f+1)/2,F=(p+1)/2,L=(d+u)/4,D=(h+v)/4,I=(m+g)/4;return _>M&&_>F?_<.01?(i=0,s=.707106781,o=.707106781):(i=Math.sqrt(_),s=L/i,o=D/i):M>F?M<.01?(i=.707106781,s=0,o=.707106781):(s=Math.sqrt(M),i=L/s,o=I/s):F<.01?(i=.707106781,s=.707106781,o=0):(o=Math.sqrt(F),i=D/o,s=I/o),this.set(i,s,o,e),this}let T=Math.sqrt((g-m)*(g-m)+(h-v)*(h-v)+(u-d)*(u-d));return Math.abs(T)<.001&&(T=1),this.x=(g-m)/T,this.y=(h-v)/T,this.z=(u-d)/T,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class th extends Rs{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Se(0,0,t,e),this.scissorTest=!1,this.viewport=new Se(0,0,t,e);const s={width:t,height:e,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Nn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const o=new cn(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);o.flipY=!1,o.generateMipmaps=i.generateMipmaps,o.internalFormat=i.internalFormat,this.textures=[];const r=i.count;for(let a=0;a<r;a++)this.textures[a]=o.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,o=this.textures.length;s<o;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,s=t.textures.length;i<s;i++)this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new id(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Gi extends th{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class sd extends cn{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Cn,this.minFilter=Cn,this.wrapR=Fi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class eh extends cn{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Cn,this.minFilter=Cn,this.wrapR=Fi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class oo{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,o,r,a){let l=i[s+0],c=i[s+1],d=i[s+2],h=i[s+3];const u=o[r+0],f=o[r+1],m=o[r+2],v=o[r+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=d,t[e+3]=h;return}if(a===1){t[e+0]=u,t[e+1]=f,t[e+2]=m,t[e+3]=v;return}if(h!==v||l!==u||c!==f||d!==m){let g=1-a;const p=l*u+c*f+d*m+h*v,T=p>=0?1:-1,_=1-p*p;if(_>Number.EPSILON){const F=Math.sqrt(_),L=Math.atan2(F,p*T);g=Math.sin(g*L)/F,a=Math.sin(a*L)/F}const M=a*T;if(l=l*g+u*M,c=c*g+f*M,d=d*g+m*M,h=h*g+v*M,g===1-a){const F=1/Math.sqrt(l*l+c*c+d*d+h*h);l*=F,c*=F,d*=F,h*=F}}t[e]=l,t[e+1]=c,t[e+2]=d,t[e+3]=h}static multiplyQuaternionsFlat(t,e,i,s,o,r){const a=i[s],l=i[s+1],c=i[s+2],d=i[s+3],h=o[r],u=o[r+1],f=o[r+2],m=o[r+3];return t[e]=a*m+d*h+l*f-c*u,t[e+1]=l*m+d*u+c*h-a*f,t[e+2]=c*m+d*f+a*u-l*h,t[e+3]=d*m-a*h-l*u-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,s=t._y,o=t._z,r=t._order,a=Math.cos,l=Math.sin,c=a(i/2),d=a(s/2),h=a(o/2),u=l(i/2),f=l(s/2),m=l(o/2);switch(r){case"XYZ":this._x=u*d*h+c*f*m,this._y=c*f*h-u*d*m,this._z=c*d*m+u*f*h,this._w=c*d*h-u*f*m;break;case"YXZ":this._x=u*d*h+c*f*m,this._y=c*f*h-u*d*m,this._z=c*d*m-u*f*h,this._w=c*d*h+u*f*m;break;case"ZXY":this._x=u*d*h-c*f*m,this._y=c*f*h+u*d*m,this._z=c*d*m+u*f*h,this._w=c*d*h-u*f*m;break;case"ZYX":this._x=u*d*h-c*f*m,this._y=c*f*h+u*d*m,this._z=c*d*m-u*f*h,this._w=c*d*h+u*f*m;break;case"YZX":this._x=u*d*h+c*f*m,this._y=c*f*h+u*d*m,this._z=c*d*m-u*f*h,this._w=c*d*h-u*f*m;break;case"XZY":this._x=u*d*h-c*f*m,this._y=c*f*h-u*d*m,this._z=c*d*m+u*f*h,this._w=c*d*h+u*f*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+r)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],s=e[4],o=e[8],r=e[1],a=e[5],l=e[9],c=e[2],d=e[6],h=e[10],u=i+a+h;if(u>0){const f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(d-l)*f,this._y=(o-c)*f,this._z=(r-s)*f}else if(i>a&&i>h){const f=2*Math.sqrt(1+i-a-h);this._w=(d-l)/f,this._x=.25*f,this._y=(s+r)/f,this._z=(o+c)/f}else if(a>h){const f=2*Math.sqrt(1+a-i-h);this._w=(o-c)/f,this._x=(s+r)/f,this._y=.25*f,this._z=(l+d)/f}else{const f=2*Math.sqrt(1+h-i-a);this._w=(r-s)/f,this._x=(o+c)/f,this._y=(l+d)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ke(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,s=t._y,o=t._z,r=t._w,a=e._x,l=e._y,c=e._z,d=e._w;return this._x=i*d+r*a+s*c-o*l,this._y=s*d+r*l+o*a-i*c,this._z=o*d+r*c+i*l-s*a,this._w=r*d-i*a-s*l-o*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,s=this._y,o=this._z,r=this._w;let a=r*t._w+i*t._x+s*t._y+o*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=r,this._x=i,this._y=s,this._z=o,this;const l=1-a*a;if(l<=Number.EPSILON){const f=1-e;return this._w=f*r+e*this._w,this._x=f*i+e*this._x,this._y=f*s+e*this._y,this._z=f*o+e*this._z,this.normalize(),this}const c=Math.sqrt(l),d=Math.atan2(c,a),h=Math.sin((1-e)*d)/c,u=Math.sin(e*d)/c;return this._w=r*h+this._w*u,this._x=i*h+this._x*u,this._y=s*h+this._y*u,this._z=o*h+this._z*u,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),o=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),o*Math.sin(e),o*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class w{constructor(t=0,e=0,i=0){w.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Il.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Il.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,s=this.z,o=t.elements;return this.x=o[0]*e+o[3]*i+o[6]*s,this.y=o[1]*e+o[4]*i+o[7]*s,this.z=o[2]*e+o[5]*i+o[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,o=t.elements,r=1/(o[3]*e+o[7]*i+o[11]*s+o[15]);return this.x=(o[0]*e+o[4]*i+o[8]*s+o[12])*r,this.y=(o[1]*e+o[5]*i+o[9]*s+o[13])*r,this.z=(o[2]*e+o[6]*i+o[10]*s+o[14])*r,this}applyQuaternion(t){const e=this.x,i=this.y,s=this.z,o=t.x,r=t.y,a=t.z,l=t.w,c=2*(r*s-a*i),d=2*(a*e-o*s),h=2*(o*i-r*e);return this.x=e+l*c+r*h-a*d,this.y=i+l*d+a*c-o*h,this.z=s+l*h+o*d-r*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,s=this.z,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*s,this.y=o[1]*e+o[5]*i+o[9]*s,this.z=o[2]*e+o[6]*i+o[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,s=t.y,o=t.z,r=e.x,a=e.y,l=e.z;return this.x=s*l-o*a,this.y=o*r-i*l,this.z=i*a-s*r,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Mr.copy(this).projectOnVector(t),this.sub(Mr)}reflect(t){return this.sub(Mr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Ke(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Mr=new w,Il=new oo;class ro{constructor(t=new w(1/0,1/0,1/0),e=new w(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(wn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(wn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=wn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const o=i.getAttribute("position");if(e===!0&&o!==void 0&&t.isInstancedMesh!==!0)for(let r=0,a=o.count;r<a;r++)t.isMesh===!0?t.getVertexPosition(r,wn):wn.fromBufferAttribute(o,r),wn.applyMatrix4(t.matrixWorld),this.expandByPoint(wn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),po.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),po.copy(i.boundingBox)),po.applyMatrix4(t.matrixWorld),this.union(po)}const s=t.children;for(let o=0,r=s.length;o<r;o++)this.expandByObject(s[o],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,wn),wn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(zs),mo.subVectors(this.max,zs),Ki.subVectors(t.a,zs),ji.subVectors(t.b,zs),Ji.subVectors(t.c,zs),ai.subVectors(ji,Ki),li.subVectors(Ji,ji),wi.subVectors(Ki,Ji);let e=[0,-ai.z,ai.y,0,-li.z,li.y,0,-wi.z,wi.y,ai.z,0,-ai.x,li.z,0,-li.x,wi.z,0,-wi.x,-ai.y,ai.x,0,-li.y,li.x,0,-wi.y,wi.x,0];return!yr(e,Ki,ji,Ji,mo)||(e=[1,0,0,0,1,0,0,0,1],!yr(e,Ki,ji,Ji,mo))?!1:(go.crossVectors(ai,li),e=[go.x,go.y,go.z],yr(e,Ki,ji,Ji,mo))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,wn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(wn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Gn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Gn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Gn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Gn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Gn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Gn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Gn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Gn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Gn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Gn=[new w,new w,new w,new w,new w,new w,new w,new w],wn=new w,po=new ro,Ki=new w,ji=new w,Ji=new w,ai=new w,li=new w,wi=new w,zs=new w,mo=new w,go=new w,bi=new w;function yr(n,t,e,i,s){for(let o=0,r=n.length-3;o<=r;o+=3){bi.fromArray(n,o);const a=s.x*Math.abs(bi.x)+s.y*Math.abs(bi.y)+s.z*Math.abs(bi.z),l=t.dot(bi),c=e.dot(bi),d=i.dot(bi);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>a)return!1}return!0}const nh=new ro,Fs=new w,xr=new w;class ao{constructor(t=new w,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):nh.setFromPoints(t).getCenter(i);let s=0;for(let o=0,r=t.length;o<r;o++)s=Math.max(s,i.distanceToSquared(t[o]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Fs.subVectors(t,this.center);const e=Fs.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(Fs,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(xr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Fs.copy(t.center).add(xr)),this.expandByPoint(Fs.copy(t.center).sub(xr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Hn=new w,Sr=new w,vo=new w,ci=new w,wr=new w,_o=new w,br=new w;class dr{constructor(t=new w,e=new w(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Hn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Hn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Hn.copy(this.origin).addScaledVector(this.direction,e),Hn.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){Sr.copy(t).add(e).multiplyScalar(.5),vo.copy(e).sub(t).normalize(),ci.copy(this.origin).sub(Sr);const o=t.distanceTo(e)*.5,r=-this.direction.dot(vo),a=ci.dot(this.direction),l=-ci.dot(vo),c=ci.lengthSq(),d=Math.abs(1-r*r);let h,u,f,m;if(d>0)if(h=r*l-a,u=r*a-l,m=o*d,h>=0)if(u>=-m)if(u<=m){const v=1/d;h*=v,u*=v,f=h*(h+r*u+2*a)+u*(r*h+u+2*l)+c}else u=o,h=Math.max(0,-(r*u+a)),f=-h*h+u*(u+2*l)+c;else u=-o,h=Math.max(0,-(r*u+a)),f=-h*h+u*(u+2*l)+c;else u<=-m?(h=Math.max(0,-(-r*o+a)),u=h>0?-o:Math.min(Math.max(-o,-l),o),f=-h*h+u*(u+2*l)+c):u<=m?(h=0,u=Math.min(Math.max(-o,-l),o),f=u*(u+2*l)+c):(h=Math.max(0,-(r*o+a)),u=h>0?o:Math.min(Math.max(-o,-l),o),f=-h*h+u*(u+2*l)+c);else u=r>0?-o:o,h=Math.max(0,-(r*u+a)),f=-h*h+u*(u+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(Sr).addScaledVector(vo,u),f}intersectSphere(t,e){Hn.subVectors(t.center,this.origin);const i=Hn.dot(this.direction),s=Hn.dot(Hn)-i*i,o=t.radius*t.radius;if(s>o)return null;const r=Math.sqrt(o-s),a=i-r,l=i+r;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,o,r,a,l;const c=1/this.direction.x,d=1/this.direction.y,h=1/this.direction.z,u=this.origin;return c>=0?(i=(t.min.x-u.x)*c,s=(t.max.x-u.x)*c):(i=(t.max.x-u.x)*c,s=(t.min.x-u.x)*c),d>=0?(o=(t.min.y-u.y)*d,r=(t.max.y-u.y)*d):(o=(t.max.y-u.y)*d,r=(t.min.y-u.y)*d),i>r||o>s||((o>i||isNaN(i))&&(i=o),(r<s||isNaN(s))&&(s=r),h>=0?(a=(t.min.z-u.z)*h,l=(t.max.z-u.z)*h):(a=(t.max.z-u.z)*h,l=(t.min.z-u.z)*h),i>l||a>s)||((a>i||i!==i)&&(i=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,Hn)!==null}intersectTriangle(t,e,i,s,o){wr.subVectors(e,t),_o.subVectors(i,t),br.crossVectors(wr,_o);let r=this.direction.dot(br),a;if(r>0){if(s)return null;a=1}else if(r<0)a=-1,r=-r;else return null;ci.subVectors(this.origin,t);const l=a*this.direction.dot(_o.crossVectors(ci,_o));if(l<0)return null;const c=a*this.direction.dot(wr.cross(ci));if(c<0||l+c>r)return null;const d=-a*ci.dot(br);return d<0?null:this.at(d/r,o)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class be{constructor(t,e,i,s,o,r,a,l,c,d,h,u,f,m,v,g){be.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,o,r,a,l,c,d,h,u,f,m,v,g)}set(t,e,i,s,o,r,a,l,c,d,h,u,f,m,v,g){const p=this.elements;return p[0]=t,p[4]=e,p[8]=i,p[12]=s,p[1]=o,p[5]=r,p[9]=a,p[13]=l,p[2]=c,p[6]=d,p[10]=h,p[14]=u,p[3]=f,p[7]=m,p[11]=v,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new be().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,s=1/Qi.setFromMatrixColumn(t,0).length(),o=1/Qi.setFromMatrixColumn(t,1).length(),r=1/Qi.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*o,e[5]=i[5]*o,e[6]=i[6]*o,e[7]=0,e[8]=i[8]*r,e[9]=i[9]*r,e[10]=i[10]*r,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,s=t.y,o=t.z,r=Math.cos(i),a=Math.sin(i),l=Math.cos(s),c=Math.sin(s),d=Math.cos(o),h=Math.sin(o);if(t.order==="XYZ"){const u=r*d,f=r*h,m=a*d,v=a*h;e[0]=l*d,e[4]=-l*h,e[8]=c,e[1]=f+m*c,e[5]=u-v*c,e[9]=-a*l,e[2]=v-u*c,e[6]=m+f*c,e[10]=r*l}else if(t.order==="YXZ"){const u=l*d,f=l*h,m=c*d,v=c*h;e[0]=u+v*a,e[4]=m*a-f,e[8]=r*c,e[1]=r*h,e[5]=r*d,e[9]=-a,e[2]=f*a-m,e[6]=v+u*a,e[10]=r*l}else if(t.order==="ZXY"){const u=l*d,f=l*h,m=c*d,v=c*h;e[0]=u-v*a,e[4]=-r*h,e[8]=m+f*a,e[1]=f+m*a,e[5]=r*d,e[9]=v-u*a,e[2]=-r*c,e[6]=a,e[10]=r*l}else if(t.order==="ZYX"){const u=r*d,f=r*h,m=a*d,v=a*h;e[0]=l*d,e[4]=m*c-f,e[8]=u*c+v,e[1]=l*h,e[5]=v*c+u,e[9]=f*c-m,e[2]=-c,e[6]=a*l,e[10]=r*l}else if(t.order==="YZX"){const u=r*l,f=r*c,m=a*l,v=a*c;e[0]=l*d,e[4]=v-u*h,e[8]=m*h+f,e[1]=h,e[5]=r*d,e[9]=-a*d,e[2]=-c*d,e[6]=f*h+m,e[10]=u-v*h}else if(t.order==="XZY"){const u=r*l,f=r*c,m=a*l,v=a*c;e[0]=l*d,e[4]=-h,e[8]=c*d,e[1]=u*h+v,e[5]=r*d,e[9]=f*h-m,e[2]=m*h-f,e[6]=a*d,e[10]=v*h+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(ih,t,sh)}lookAt(t,e,i){const s=this.elements;return mn.subVectors(t,e),mn.lengthSq()===0&&(mn.z=1),mn.normalize(),di.crossVectors(i,mn),di.lengthSq()===0&&(Math.abs(i.z)===1?mn.x+=1e-4:mn.z+=1e-4,mn.normalize(),di.crossVectors(i,mn)),di.normalize(),Mo.crossVectors(mn,di),s[0]=di.x,s[4]=Mo.x,s[8]=mn.x,s[1]=di.y,s[5]=Mo.y,s[9]=mn.y,s[2]=di.z,s[6]=Mo.z,s[10]=mn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,o=this.elements,r=i[0],a=i[4],l=i[8],c=i[12],d=i[1],h=i[5],u=i[9],f=i[13],m=i[2],v=i[6],g=i[10],p=i[14],T=i[3],_=i[7],M=i[11],F=i[15],L=s[0],D=s[4],I=s[8],y=s[12],x=s[1],P=s[5],O=s[9],V=s[13],Q=s[2],nt=s[6],tt=s[10],it=s[14],J=s[3],ht=s[7],B=s[11],ut=s[15];return o[0]=r*L+a*x+l*Q+c*J,o[4]=r*D+a*P+l*nt+c*ht,o[8]=r*I+a*O+l*tt+c*B,o[12]=r*y+a*V+l*it+c*ut,o[1]=d*L+h*x+u*Q+f*J,o[5]=d*D+h*P+u*nt+f*ht,o[9]=d*I+h*O+u*tt+f*B,o[13]=d*y+h*V+u*it+f*ut,o[2]=m*L+v*x+g*Q+p*J,o[6]=m*D+v*P+g*nt+p*ht,o[10]=m*I+v*O+g*tt+p*B,o[14]=m*y+v*V+g*it+p*ut,o[3]=T*L+_*x+M*Q+F*J,o[7]=T*D+_*P+M*nt+F*ht,o[11]=T*I+_*O+M*tt+F*B,o[15]=T*y+_*V+M*it+F*ut,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],s=t[8],o=t[12],r=t[1],a=t[5],l=t[9],c=t[13],d=t[2],h=t[6],u=t[10],f=t[14],m=t[3],v=t[7],g=t[11],p=t[15];return m*(+o*l*h-s*c*h-o*a*u+i*c*u+s*a*f-i*l*f)+v*(+e*l*f-e*c*u+o*r*u-s*r*f+s*c*d-o*l*d)+g*(+e*c*h-e*a*f-o*r*h+i*r*f+o*a*d-i*c*d)+p*(-s*a*d-e*l*h+e*a*u+s*r*h-i*r*u+i*l*d)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],o=t[3],r=t[4],a=t[5],l=t[6],c=t[7],d=t[8],h=t[9],u=t[10],f=t[11],m=t[12],v=t[13],g=t[14],p=t[15],T=h*g*c-v*u*c+v*l*f-a*g*f-h*l*p+a*u*p,_=m*u*c-d*g*c-m*l*f+r*g*f+d*l*p-r*u*p,M=d*v*c-m*h*c+m*a*f-r*v*f-d*a*p+r*h*p,F=m*h*l-d*v*l-m*a*u+r*v*u+d*a*g-r*h*g,L=e*T+i*_+s*M+o*F;if(L===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const D=1/L;return t[0]=T*D,t[1]=(v*u*o-h*g*o-v*s*f+i*g*f+h*s*p-i*u*p)*D,t[2]=(a*g*o-v*l*o+v*s*c-i*g*c-a*s*p+i*l*p)*D,t[3]=(h*l*o-a*u*o-h*s*c+i*u*c+a*s*f-i*l*f)*D,t[4]=_*D,t[5]=(d*g*o-m*u*o+m*s*f-e*g*f-d*s*p+e*u*p)*D,t[6]=(m*l*o-r*g*o-m*s*c+e*g*c+r*s*p-e*l*p)*D,t[7]=(r*u*o-d*l*o+d*s*c-e*u*c-r*s*f+e*l*f)*D,t[8]=M*D,t[9]=(m*h*o-d*v*o-m*i*f+e*v*f+d*i*p-e*h*p)*D,t[10]=(r*v*o-m*a*o+m*i*c-e*v*c-r*i*p+e*a*p)*D,t[11]=(d*a*o-r*h*o-d*i*c+e*h*c+r*i*f-e*a*f)*D,t[12]=F*D,t[13]=(d*v*s-m*h*s+m*i*u-e*v*u-d*i*g+e*h*g)*D,t[14]=(m*a*s-r*v*s-m*i*l+e*v*l+r*i*g-e*a*g)*D,t[15]=(r*h*s-d*a*s+d*i*l-e*h*l-r*i*u+e*a*u)*D,this}scale(t){const e=this.elements,i=t.x,s=t.y,o=t.z;return e[0]*=i,e[4]*=s,e[8]*=o,e[1]*=i,e[5]*=s,e[9]*=o,e[2]*=i,e[6]*=s,e[10]*=o,e[3]*=i,e[7]*=s,e[11]*=o,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),s=Math.sin(e),o=1-i,r=t.x,a=t.y,l=t.z,c=o*r,d=o*a;return this.set(c*r+i,c*a-s*l,c*l+s*a,0,c*a+s*l,d*a+i,d*l-s*r,0,c*l-s*a,d*l+s*r,o*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,o,r){return this.set(1,i,o,0,t,1,r,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){const s=this.elements,o=e._x,r=e._y,a=e._z,l=e._w,c=o+o,d=r+r,h=a+a,u=o*c,f=o*d,m=o*h,v=r*d,g=r*h,p=a*h,T=l*c,_=l*d,M=l*h,F=i.x,L=i.y,D=i.z;return s[0]=(1-(v+p))*F,s[1]=(f+M)*F,s[2]=(m-_)*F,s[3]=0,s[4]=(f-M)*L,s[5]=(1-(u+p))*L,s[6]=(g+T)*L,s[7]=0,s[8]=(m+_)*D,s[9]=(g-T)*D,s[10]=(1-(u+v))*D,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){const s=this.elements;let o=Qi.set(s[0],s[1],s[2]).length();const r=Qi.set(s[4],s[5],s[6]).length(),a=Qi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(o=-o),t.x=s[12],t.y=s[13],t.z=s[14],bn.copy(this);const c=1/o,d=1/r,h=1/a;return bn.elements[0]*=c,bn.elements[1]*=c,bn.elements[2]*=c,bn.elements[4]*=d,bn.elements[5]*=d,bn.elements[6]*=d,bn.elements[8]*=h,bn.elements[9]*=h,bn.elements[10]*=h,e.setFromRotationMatrix(bn),i.x=o,i.y=r,i.z=a,this}makePerspective(t,e,i,s,o,r,a=Kn){const l=this.elements,c=2*o/(e-t),d=2*o/(i-s),h=(e+t)/(e-t),u=(i+s)/(i-s);let f,m;if(a===Kn)f=-(r+o)/(r-o),m=-2*r*o/(r-o);else if(a===jo)f=-r/(r-o),m=-r*o/(r-o);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=d,l[9]=u,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=m,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,s,o,r,a=Kn){const l=this.elements,c=1/(e-t),d=1/(i-s),h=1/(r-o),u=(e+t)*c,f=(i+s)*d;let m,v;if(a===Kn)m=(r+o)*h,v=-2*h;else if(a===jo)m=o*h,v=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-u,l[1]=0,l[5]=2*d,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=v,l[14]=-m,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const Qi=new w,bn=new be,ih=new w(0,0,0),sh=new w(1,1,1),di=new w,Mo=new w,mn=new w,Dl=new be,Ul=new oo;class Pn{constructor(t=0,e=0,i=0,s=Pn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const s=t.elements,o=s[0],r=s[4],a=s[8],l=s[1],c=s[5],d=s[9],h=s[2],u=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(Ke(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-d,f),this._z=Math.atan2(-r,o)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ke(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,o),this._z=0);break;case"ZXY":this._x=Math.asin(Ke(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-r,c)):(this._y=0,this._z=Math.atan2(l,o));break;case"ZYX":this._y=Math.asin(-Ke(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,o)):(this._x=0,this._z=Math.atan2(-r,c));break;case"YZX":this._z=Math.asin(Ke(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-h,o)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Ke(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(a,o)):(this._x=Math.atan2(-d,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return Dl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Dl,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Ul.setFromEuler(this),this.setFromQuaternion(Ul,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Pn.DEFAULT_ORDER="XYZ";class sl{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let oh=0;const Nl=new w,ts=new oo,Vn=new be,yo=new w,Os=new w,rh=new w,ah=new oo,zl=new w(1,0,0),Fl=new w(0,1,0),Ol=new w(0,0,1),Bl={type:"added"},lh={type:"removed"},es={type:"childadded",child:null},Er={type:"childremoved",child:null};class Ge extends Rs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:oh++}),this.uuid=jn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ge.DEFAULT_UP.clone();const t=new w,e=new Pn,i=new oo,s=new w(1,1,1);function o(){i.setFromEuler(e,!1)}function r(){e.setFromQuaternion(i,void 0,!1)}e._onChange(o),i._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new be},normalMatrix:{value:new te}}),this.matrix=new be,this.matrixWorld=new be,this.matrixAutoUpdate=Ge.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ge.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new sl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ts.setFromAxisAngle(t,e),this.quaternion.multiply(ts),this}rotateOnWorldAxis(t,e){return ts.setFromAxisAngle(t,e),this.quaternion.premultiply(ts),this}rotateX(t){return this.rotateOnAxis(zl,t)}rotateY(t){return this.rotateOnAxis(Fl,t)}rotateZ(t){return this.rotateOnAxis(Ol,t)}translateOnAxis(t,e){return Nl.copy(t).applyQuaternion(this.quaternion),this.position.add(Nl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(zl,t)}translateY(t){return this.translateOnAxis(Fl,t)}translateZ(t){return this.translateOnAxis(Ol,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Vn.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?yo.copy(t):yo.set(t,e,i);const s=this.parent;this.updateWorldMatrix(!0,!1),Os.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Vn.lookAt(Os,yo,this.up):Vn.lookAt(yo,Os,this.up),this.quaternion.setFromRotationMatrix(Vn),s&&(Vn.extractRotation(s.matrixWorld),ts.setFromRotationMatrix(Vn),this.quaternion.premultiply(ts.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Bl),es.child=t,this.dispatchEvent(es),es.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(lh),Er.child=t,this.dispatchEvent(Er),Er.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Vn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Vn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Vn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Bl),es.child=t,this.dispatchEvent(es),es.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){const r=this.children[i].getObjectByProperty(t,e);if(r!==void 0)return r}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const s=this.children;for(let o=0,r=s.length;o<r;o++)s[o].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Os,t,rh),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Os,ah,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let o=0,r=s.length;o<r;o++)s[o].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function o(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=o(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){const h=l[c];o(t.shapes,h)}else o(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(o(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(o(t.materials,this.material[l]));s.material=a}else s.material=o(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(o(t.animations,l))}}if(e){const a=r(t.geometries),l=r(t.materials),c=r(t.textures),d=r(t.images),h=r(t.shapes),u=r(t.skeletons),f=r(t.animations),m=r(t.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),d.length>0&&(i.images=d),h.length>0&&(i.shapes=h),u.length>0&&(i.skeletons=u),f.length>0&&(i.animations=f),m.length>0&&(i.nodes=m)}return i.object=s,i;function r(a){const l=[];for(const c in a){const d=a[c];delete d.metadata,l.push(d)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const s=t.children[i];this.add(s.clone())}return this}}Ge.DEFAULT_UP=new w(0,1,0);Ge.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ge.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const En=new w,Wn=new w,Tr=new w,Xn=new w,ns=new w,is=new w,kl=new w,Ar=new w,Cr=new w,Rr=new w,Pr=new Se,Lr=new Se,Ir=new Se;class Sn{constructor(t=new w,e=new w,i=new w){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),En.subVectors(t,e),s.cross(En);const o=s.lengthSq();return o>0?s.multiplyScalar(1/Math.sqrt(o)):s.set(0,0,0)}static getBarycoord(t,e,i,s,o){En.subVectors(s,e),Wn.subVectors(i,e),Tr.subVectors(t,e);const r=En.dot(En),a=En.dot(Wn),l=En.dot(Tr),c=Wn.dot(Wn),d=Wn.dot(Tr),h=r*c-a*a;if(h===0)return o.set(0,0,0),null;const u=1/h,f=(c*l-a*d)*u,m=(r*d-a*l)*u;return o.set(1-f-m,m,f)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,Xn)===null?!1:Xn.x>=0&&Xn.y>=0&&Xn.x+Xn.y<=1}static getInterpolation(t,e,i,s,o,r,a,l){return this.getBarycoord(t,e,i,s,Xn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(o,Xn.x),l.addScaledVector(r,Xn.y),l.addScaledVector(a,Xn.z),l)}static getInterpolatedAttribute(t,e,i,s,o,r){return Pr.setScalar(0),Lr.setScalar(0),Ir.setScalar(0),Pr.fromBufferAttribute(t,e),Lr.fromBufferAttribute(t,i),Ir.fromBufferAttribute(t,s),r.setScalar(0),r.addScaledVector(Pr,o.x),r.addScaledVector(Lr,o.y),r.addScaledVector(Ir,o.z),r}static isFrontFacing(t,e,i,s){return En.subVectors(i,e),Wn.subVectors(t,e),En.cross(Wn).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return En.subVectors(this.c,this.b),Wn.subVectors(this.a,this.b),En.cross(Wn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Sn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Sn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,o){return Sn.getInterpolation(t,this.a,this.b,this.c,e,i,s,o)}containsPoint(t){return Sn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Sn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,s=this.b,o=this.c;let r,a;ns.subVectors(s,i),is.subVectors(o,i),Ar.subVectors(t,i);const l=ns.dot(Ar),c=is.dot(Ar);if(l<=0&&c<=0)return e.copy(i);Cr.subVectors(t,s);const d=ns.dot(Cr),h=is.dot(Cr);if(d>=0&&h<=d)return e.copy(s);const u=l*h-d*c;if(u<=0&&l>=0&&d<=0)return r=l/(l-d),e.copy(i).addScaledVector(ns,r);Rr.subVectors(t,o);const f=ns.dot(Rr),m=is.dot(Rr);if(m>=0&&f<=m)return e.copy(o);const v=f*c-l*m;if(v<=0&&c>=0&&m<=0)return a=c/(c-m),e.copy(i).addScaledVector(is,a);const g=d*m-f*h;if(g<=0&&h-d>=0&&f-m>=0)return kl.subVectors(o,s),a=(h-d)/(h-d+(f-m)),e.copy(s).addScaledVector(kl,a);const p=1/(g+v+u);return r=v*p,a=u*p,e.copy(i).addScaledVector(ns,r).addScaledVector(is,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const od={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ui={h:0,s:0,l:0},xo={h:0,s:0,l:0};function Dr(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class vt{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=_e){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,he.toWorkingColorSpace(this,e),this}setRGB(t,e,i,s=he.workingColorSpace){return this.r=t,this.g=e,this.b=i,he.toWorkingColorSpace(this,s),this}setHSL(t,e,i,s=he.workingColorSpace){if(t=il(t,1),e=Ke(e,0,1),i=Ke(i,0,1),e===0)this.r=this.g=this.b=i;else{const o=i<=.5?i*(1+e):i+e-i*e,r=2*i-o;this.r=Dr(r,o,t+1/3),this.g=Dr(r,o,t),this.b=Dr(r,o,t-1/3)}return he.toWorkingColorSpace(this,s),this}setStyle(t,e=_e){function i(o){o!==void 0&&parseFloat(o)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let o;const r=s[1],a=s[2];switch(r){case"rgb":case"rgba":if(o=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(o[4]),this.setRGB(Math.min(255,parseInt(o[1],10))/255,Math.min(255,parseInt(o[2],10))/255,Math.min(255,parseInt(o[3],10))/255,e);if(o=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(o[4]),this.setRGB(Math.min(100,parseInt(o[1],10))/100,Math.min(100,parseInt(o[2],10))/100,Math.min(100,parseInt(o[3],10))/100,e);break;case"hsl":case"hsla":if(o=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(o[4]),this.setHSL(parseFloat(o[1])/360,parseFloat(o[2])/100,parseFloat(o[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const o=s[1],r=o.length;if(r===3)return this.setRGB(parseInt(o.charAt(0),16)/15,parseInt(o.charAt(1),16)/15,parseInt(o.charAt(2),16)/15,e);if(r===6)return this.setHex(parseInt(o,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=_e){const i=od[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Jn(t.r),this.g=Jn(t.g),this.b=Jn(t.b),this}copyLinearToSRGB(t){return this.r=gs(t.r),this.g=gs(t.g),this.b=gs(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=_e){return he.fromWorkingColorSpace(tn.copy(this),t),Math.round(Ke(tn.r*255,0,255))*65536+Math.round(Ke(tn.g*255,0,255))*256+Math.round(Ke(tn.b*255,0,255))}getHexString(t=_e){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=he.workingColorSpace){he.fromWorkingColorSpace(tn.copy(this),e);const i=tn.r,s=tn.g,o=tn.b,r=Math.max(i,s,o),a=Math.min(i,s,o);let l,c;const d=(a+r)/2;if(a===r)l=0,c=0;else{const h=r-a;switch(c=d<=.5?h/(r+a):h/(2-r-a),r){case i:l=(s-o)/h+(s<o?6:0);break;case s:l=(o-i)/h+2;break;case o:l=(i-s)/h+4;break}l/=6}return t.h=l,t.s=c,t.l=d,t}getRGB(t,e=he.workingColorSpace){return he.fromWorkingColorSpace(tn.copy(this),e),t.r=tn.r,t.g=tn.g,t.b=tn.b,t}getStyle(t=_e){he.fromWorkingColorSpace(tn.copy(this),t);const e=tn.r,i=tn.g,s=tn.b;return t!==_e?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(ui),this.setHSL(ui.h+t,ui.s+e,ui.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(ui),t.getHSL(xo);const i=js(ui.h,xo.h,e),s=js(ui.s,xo.s,e),o=js(ui.l,xo.l,e);return this.setHSL(i,s,o),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,s=this.b,o=t.elements;return this.r=o[0]*e+o[3]*i+o[6]*s,this.g=o[1]*e+o[4]*i+o[7]*s,this.b=o[2]*e+o[5]*i+o[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const tn=new vt;vt.NAMES=od;let ch=0;class ni extends Rs{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ch++}),this.uuid=jn(),this.name="",this.blending=Bi,this.side=Mi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=oa,this.blendDst=ra,this.blendEquation=Ni,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new vt(0,0,0),this.blendAlpha=0,this.depthFunc=ys,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=wl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=$i,this.stencilZFail=$i,this.stencilZPass=$i,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Bi&&(i.blending=this.blending),this.side!==Mi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==oa&&(i.blendSrc=this.blendSrc),this.blendDst!==ra&&(i.blendDst=this.blendDst),this.blendEquation!==Ni&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==ys&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==wl&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==$i&&(i.stencilFail=this.stencilFail),this.stencilZFail!==$i&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==$i&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(o){const r=[];for(const a in o){const l=o[a];delete l.metadata,r.push(l)}return r}if(e){const o=s(t.textures),r=s(t.images);o.length>0&&(i.textures=o),r.length>0&&(i.images=r)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const s=e.length;i=new Array(s);for(let o=0;o!==s;++o)i[o]=e[o].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Fe extends ni{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new vt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Pn,this.combine=Za,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Be=new w,So=new Dt;class Oe{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=Va,this.updateRanges=[],this.gpuType=Zn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,o=this.itemSize;s<o;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)So.fromBufferAttribute(this,e),So.applyMatrix3(t),this.setXY(e,So.x,So.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Be.fromBufferAttribute(this,e),Be.applyMatrix3(t),this.setXYZ(e,Be.x,Be.y,Be.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Be.fromBufferAttribute(this,e),Be.applyMatrix4(t),this.setXYZ(e,Be.x,Be.y,Be.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Be.fromBufferAttribute(this,e),Be.applyNormalMatrix(t),this.setXYZ(e,Be.x,Be.y,Be.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Be.fromBufferAttribute(this,e),Be.transformDirection(t),this.setXYZ(e,Be.x,Be.y,Be.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=Tn(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=ve(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Tn(e,this.array)),e}setX(t,e){return this.normalized&&(e=ve(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Tn(e,this.array)),e}setY(t,e){return this.normalized&&(e=ve(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Tn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ve(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Tn(e,this.array)),e}setW(t,e){return this.normalized&&(e=ve(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=ve(e,this.array),i=ve(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=ve(e,this.array),i=ve(i,this.array),s=ve(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,o){return t*=this.itemSize,this.normalized&&(e=ve(e,this.array),i=ve(i,this.array),s=ve(s,this.array),o=ve(o,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=o,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Va&&(t.usage=this.usage),t}}class rd extends Oe{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class ad extends Oe{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class Ce extends Oe{constructor(t,e,i){super(new Float32Array(t),e,i)}}let dh=0;const xn=new be,Ur=new Ge,ss=new w,gn=new ro,Bs=new ro,Ye=new w;class Pe extends Rs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:dh++}),this.uuid=jn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(nd(t)?ad:rd)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const o=new te().getNormalMatrix(t);i.applyNormalMatrix(o),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return xn.makeRotationFromQuaternion(t),this.applyMatrix4(xn),this}rotateX(t){return xn.makeRotationX(t),this.applyMatrix4(xn),this}rotateY(t){return xn.makeRotationY(t),this.applyMatrix4(xn),this}rotateZ(t){return xn.makeRotationZ(t),this.applyMatrix4(xn),this}translate(t,e,i){return xn.makeTranslation(t,e,i),this.applyMatrix4(xn),this}scale(t,e,i){return xn.makeScale(t,e,i),this.applyMatrix4(xn),this}lookAt(t){return Ur.lookAt(t),Ur.updateMatrix(),this.applyMatrix4(Ur.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ss).negate(),this.translate(ss.x,ss.y,ss.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let s=0,o=t.length;s<o;s++){const r=t[s];i.push(r.x,r.y,r.z||0)}this.setAttribute("position",new Ce(i,3))}else{for(let i=0,s=e.count;i<s;i++){const o=t[i];e.setXYZ(i,o.x,o.y,o.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ro);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new w(-1/0,-1/0,-1/0),new w(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){const o=e[i];gn.setFromBufferAttribute(o),this.morphTargetsRelative?(Ye.addVectors(this.boundingBox.min,gn.min),this.boundingBox.expandByPoint(Ye),Ye.addVectors(this.boundingBox.max,gn.max),this.boundingBox.expandByPoint(Ye)):(this.boundingBox.expandByPoint(gn.min),this.boundingBox.expandByPoint(gn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ao);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new w,1/0);return}if(t){const i=this.boundingSphere.center;if(gn.setFromBufferAttribute(t),e)for(let o=0,r=e.length;o<r;o++){const a=e[o];Bs.setFromBufferAttribute(a),this.morphTargetsRelative?(Ye.addVectors(gn.min,Bs.min),gn.expandByPoint(Ye),Ye.addVectors(gn.max,Bs.max),gn.expandByPoint(Ye)):(gn.expandByPoint(Bs.min),gn.expandByPoint(Bs.max))}gn.getCenter(i);let s=0;for(let o=0,r=t.count;o<r;o++)Ye.fromBufferAttribute(t,o),s=Math.max(s,i.distanceToSquared(Ye));if(e)for(let o=0,r=e.length;o<r;o++){const a=e[o],l=this.morphTargetsRelative;for(let c=0,d=a.count;c<d;c++)Ye.fromBufferAttribute(a,c),l&&(ss.fromBufferAttribute(t,c),Ye.add(ss)),s=Math.max(s,i.distanceToSquared(Ye))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,s=e.normal,o=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Oe(new Float32Array(4*i.count),4));const r=this.getAttribute("tangent"),a=[],l=[];for(let I=0;I<i.count;I++)a[I]=new w,l[I]=new w;const c=new w,d=new w,h=new w,u=new Dt,f=new Dt,m=new Dt,v=new w,g=new w;function p(I,y,x){c.fromBufferAttribute(i,I),d.fromBufferAttribute(i,y),h.fromBufferAttribute(i,x),u.fromBufferAttribute(o,I),f.fromBufferAttribute(o,y),m.fromBufferAttribute(o,x),d.sub(c),h.sub(c),f.sub(u),m.sub(u);const P=1/(f.x*m.y-m.x*f.y);isFinite(P)&&(v.copy(d).multiplyScalar(m.y).addScaledVector(h,-f.y).multiplyScalar(P),g.copy(h).multiplyScalar(f.x).addScaledVector(d,-m.x).multiplyScalar(P),a[I].add(v),a[y].add(v),a[x].add(v),l[I].add(g),l[y].add(g),l[x].add(g))}let T=this.groups;T.length===0&&(T=[{start:0,count:t.count}]);for(let I=0,y=T.length;I<y;++I){const x=T[I],P=x.start,O=x.count;for(let V=P,Q=P+O;V<Q;V+=3)p(t.getX(V+0),t.getX(V+1),t.getX(V+2))}const _=new w,M=new w,F=new w,L=new w;function D(I){F.fromBufferAttribute(s,I),L.copy(F);const y=a[I];_.copy(y),_.sub(F.multiplyScalar(F.dot(y))).normalize(),M.crossVectors(L,y);const P=M.dot(l[I])<0?-1:1;r.setXYZW(I,_.x,_.y,_.z,P)}for(let I=0,y=T.length;I<y;++I){const x=T[I],P=x.start,O=x.count;for(let V=P,Q=P+O;V<Q;V+=3)D(t.getX(V+0)),D(t.getX(V+1)),D(t.getX(V+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Oe(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let u=0,f=i.count;u<f;u++)i.setXYZ(u,0,0,0);const s=new w,o=new w,r=new w,a=new w,l=new w,c=new w,d=new w,h=new w;if(t)for(let u=0,f=t.count;u<f;u+=3){const m=t.getX(u+0),v=t.getX(u+1),g=t.getX(u+2);s.fromBufferAttribute(e,m),o.fromBufferAttribute(e,v),r.fromBufferAttribute(e,g),d.subVectors(r,o),h.subVectors(s,o),d.cross(h),a.fromBufferAttribute(i,m),l.fromBufferAttribute(i,v),c.fromBufferAttribute(i,g),a.add(d),l.add(d),c.add(d),i.setXYZ(m,a.x,a.y,a.z),i.setXYZ(v,l.x,l.y,l.z),i.setXYZ(g,c.x,c.y,c.z)}else for(let u=0,f=e.count;u<f;u+=3)s.fromBufferAttribute(e,u+0),o.fromBufferAttribute(e,u+1),r.fromBufferAttribute(e,u+2),d.subVectors(r,o),h.subVectors(s,o),d.cross(h),i.setXYZ(u+0,d.x,d.y,d.z),i.setXYZ(u+1,d.x,d.y,d.z),i.setXYZ(u+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Ye.fromBufferAttribute(t,e),Ye.normalize(),t.setXYZ(e,Ye.x,Ye.y,Ye.z)}toNonIndexed(){function t(a,l){const c=a.array,d=a.itemSize,h=a.normalized,u=new c.constructor(l.length*d);let f=0,m=0;for(let v=0,g=l.length;v<g;v++){a.isInterleavedBufferAttribute?f=l[v]*a.data.stride+a.offset:f=l[v]*d;for(let p=0;p<d;p++)u[m++]=c[f++]}return new Oe(u,d,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Pe,i=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=t(l,i);e.setAttribute(a,c)}const o=this.morphAttributes;for(const a in o){const l=[],c=o[a];for(let d=0,h=c.length;d<h;d++){const u=c[d],f=t(u,i);l.push(f)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const r=this.groups;for(let a=0,l=r.length;a<l;a++){const c=r[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const l in i){const c=i[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let o=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],d=[];for(let h=0,u=c.length;h<u;h++){const f=c[h];d.push(f.toJSON(t.data))}d.length>0&&(s[l]=d,o=!0)}o&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const r=this.groups;r.length>0&&(t.data.groups=JSON.parse(JSON.stringify(r)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone(e));const s=t.attributes;for(const c in s){const d=s[c];this.setAttribute(c,d.clone(e))}const o=t.morphAttributes;for(const c in o){const d=[],h=o[c];for(let u=0,f=h.length;u<f;u++)d.push(h[u].clone(e));this.morphAttributes[c]=d}this.morphTargetsRelative=t.morphTargetsRelative;const r=t.groups;for(let c=0,d=r.length;c<d;c++){const h=r[c];this.addGroup(h.start,h.count,h.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Gl=new be,Ei=new dr,wo=new ao,Hl=new w,bo=new w,Eo=new w,To=new w,Nr=new w,Ao=new w,Vl=new w,Co=new w;class C extends Ge{constructor(t=new Pe,e=new Fe){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,r=s.length;o<r;o++){const a=s[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=o}}}}getVertexPosition(t,e){const i=this.geometry,s=i.attributes.position,o=i.morphAttributes.position,r=i.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(o&&a){Ao.set(0,0,0);for(let l=0,c=o.length;l<c;l++){const d=a[l],h=o[l];d!==0&&(Nr.fromBufferAttribute(h,t),r?Ao.addScaledVector(Nr,d):Ao.addScaledVector(Nr.sub(e),d))}e.add(Ao)}return e}raycast(t,e){const i=this.geometry,s=this.material,o=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),wo.copy(i.boundingSphere),wo.applyMatrix4(o),Ei.copy(t.ray).recast(t.near),!(wo.containsPoint(Ei.origin)===!1&&(Ei.intersectSphere(wo,Hl)===null||Ei.origin.distanceToSquared(Hl)>(t.far-t.near)**2))&&(Gl.copy(o).invert(),Ei.copy(t.ray).applyMatrix4(Gl),!(i.boundingBox!==null&&Ei.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Ei)))}_computeIntersections(t,e,i){let s;const o=this.geometry,r=this.material,a=o.index,l=o.attributes.position,c=o.attributes.uv,d=o.attributes.uv1,h=o.attributes.normal,u=o.groups,f=o.drawRange;if(a!==null)if(Array.isArray(r))for(let m=0,v=u.length;m<v;m++){const g=u[m],p=r[g.materialIndex],T=Math.max(g.start,f.start),_=Math.min(a.count,Math.min(g.start+g.count,f.start+f.count));for(let M=T,F=_;M<F;M+=3){const L=a.getX(M),D=a.getX(M+1),I=a.getX(M+2);s=Ro(this,p,t,i,c,d,h,L,D,I),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const m=Math.max(0,f.start),v=Math.min(a.count,f.start+f.count);for(let g=m,p=v;g<p;g+=3){const T=a.getX(g),_=a.getX(g+1),M=a.getX(g+2);s=Ro(this,r,t,i,c,d,h,T,_,M),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(r))for(let m=0,v=u.length;m<v;m++){const g=u[m],p=r[g.materialIndex],T=Math.max(g.start,f.start),_=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let M=T,F=_;M<F;M+=3){const L=M,D=M+1,I=M+2;s=Ro(this,p,t,i,c,d,h,L,D,I),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const m=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let g=m,p=v;g<p;g+=3){const T=g,_=g+1,M=g+2;s=Ro(this,r,t,i,c,d,h,T,_,M),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}}}function uh(n,t,e,i,s,o,r,a){let l;if(t.side===en?l=i.intersectTriangle(r,o,s,!0,a):l=i.intersectTriangle(s,o,r,t.side===Mi,a),l===null)return null;Co.copy(a),Co.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(Co);return c<e.near||c>e.far?null:{distance:c,point:Co.clone(),object:n}}function Ro(n,t,e,i,s,o,r,a,l,c){n.getVertexPosition(a,bo),n.getVertexPosition(l,Eo),n.getVertexPosition(c,To);const d=uh(n,t,e,i,bo,Eo,To,Vl);if(d){const h=new w;Sn.getBarycoord(Vl,bo,Eo,To,h),s&&(d.uv=Sn.getInterpolatedAttribute(s,a,l,c,h,new Dt)),o&&(d.uv1=Sn.getInterpolatedAttribute(o,a,l,c,h,new Dt)),r&&(d.normal=Sn.getInterpolatedAttribute(r,a,l,c,h,new w),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));const u={a,b:l,c,normal:new w,materialIndex:0};Sn.getNormal(bo,Eo,To,u.normal),d.face=u,d.barycoord=h}return d}class dt extends Pe{constructor(t=1,e=1,i=1,s=1,o=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:o,depthSegments:r};const a=this;s=Math.floor(s),o=Math.floor(o),r=Math.floor(r);const l=[],c=[],d=[],h=[];let u=0,f=0;m("z","y","x",-1,-1,i,e,t,r,o,0),m("z","y","x",1,-1,i,e,-t,r,o,1),m("x","z","y",1,1,t,i,e,s,r,2),m("x","z","y",1,-1,t,i,-e,s,r,3),m("x","y","z",1,-1,t,e,i,s,o,4),m("x","y","z",-1,-1,t,e,-i,s,o,5),this.setIndex(l),this.setAttribute("position",new Ce(c,3)),this.setAttribute("normal",new Ce(d,3)),this.setAttribute("uv",new Ce(h,2));function m(v,g,p,T,_,M,F,L,D,I,y){const x=M/D,P=F/I,O=M/2,V=F/2,Q=L/2,nt=D+1,tt=I+1;let it=0,J=0;const ht=new w;for(let B=0;B<tt;B++){const ut=B*P-V;for(let gt=0;gt<nt;gt++){const yt=gt*x-O;ht[v]=yt*T,ht[g]=ut*_,ht[p]=Q,c.push(ht.x,ht.y,ht.z),ht[v]=0,ht[g]=0,ht[p]=L>0?1:-1,d.push(ht.x,ht.y,ht.z),h.push(gt/D),h.push(1-B/I),it+=1}}for(let B=0;B<I;B++)for(let ut=0;ut<D;ut++){const gt=u+ut+nt*B,yt=u+ut+nt*(B+1),st=u+(ut+1)+nt*(B+1),mt=u+(ut+1)+nt*B;l.push(gt,yt,mt),l.push(yt,st,mt),J+=6}a.addGroup(f,J,y),f+=J,u+=it}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new dt(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Es(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const s=n[e][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone():Array.isArray(s)?t[e][i]=s.slice():t[e][i]=s}}return t}function rn(n){const t={};for(let e=0;e<n.length;e++){const i=Es(n[e]);for(const s in i)t[s]=i[s]}return t}function hh(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function ld(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:he.workingColorSpace}const fh={clone:Es,merge:rn};var ph=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,mh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ei extends ni{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ph,this.fragmentShader=mh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Es(t.uniforms),this.uniformsGroups=hh(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const r=this.uniforms[s].value;r&&r.isTexture?e.uniforms[s]={type:"t",value:r.toJSON(t).uuid}:r&&r.isColor?e.uniforms[s]={type:"c",value:r.getHex()}:r&&r.isVector2?e.uniforms[s]={type:"v2",value:r.toArray()}:r&&r.isVector3?e.uniforms[s]={type:"v3",value:r.toArray()}:r&&r.isVector4?e.uniforms[s]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?e.uniforms[s]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?e.uniforms[s]={type:"m4",value:r.toArray()}:e.uniforms[s]={value:r}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class cd extends Ge{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new be,this.projectionMatrix=new be,this.projectionMatrixInverse=new be,this.coordinateSystem=Kn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const hi=new w,Wl=new Dt,Xl=new Dt;class Ae extends cd{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=no*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Ks*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return no*2*Math.atan(Math.tan(Ks*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){hi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(hi.x,hi.y).multiplyScalar(-t/hi.z),hi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(hi.x,hi.y).multiplyScalar(-t/hi.z)}getViewSize(t,e){return this.getViewBounds(t,Wl,Xl),e.subVectors(Xl,Wl)}setViewOffset(t,e,i,s,o,r){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=o,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Ks*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,o=-.5*s;const r=this.view;if(this.view!==null&&this.view.enabled){const l=r.fullWidth,c=r.fullHeight;o+=r.offsetX*s/l,e-=r.offsetY*i/c,s*=r.width/l,i*=r.height/c}const a=this.filmOffset;a!==0&&(o+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(o,o+s,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const os=-90,rs=1;class gh extends Ge{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Ae(os,rs,t,e);s.layers=this.layers,this.add(s);const o=new Ae(os,rs,t,e);o.layers=this.layers,this.add(o);const r=new Ae(os,rs,t,e);r.layers=this.layers,this.add(r);const a=new Ae(os,rs,t,e);a.layers=this.layers,this.add(a);const l=new Ae(os,rs,t,e);l.layers=this.layers,this.add(l);const c=new Ae(os,rs,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,s,o,r,a,l]=e;for(const c of e)this.remove(c);if(t===Kn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),o.up.set(0,0,-1),o.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===jo)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),o.up.set(0,0,1),o.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[o,r,a,l,c,d]=this.children,h=t.getRenderTarget(),u=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,s),t.render(e,o),t.setRenderTarget(i,1,s),t.render(e,r),t.setRenderTarget(i,2,s),t.render(e,a),t.setRenderTarget(i,3,s),t.render(e,l),t.setRenderTarget(i,4,s),t.render(e,c),i.texture.generateMipmaps=v,t.setRenderTarget(i,5,s),t.render(e,d),t.setRenderTarget(h,u,f),t.xr.enabled=m,i.texture.needsPMREMUpdate=!0}}class dd extends cn{constructor(t,e,i,s,o,r,a,l,c,d){t=t!==void 0?t:[],e=e!==void 0?e:xs,super(t,e,i,s,o,r,a,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class vh extends Gi{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new dd(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Nn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new dt(5,5,5),o=new ei({name:"CubemapFromEquirect",uniforms:Es(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:en,blending:vi});o.uniforms.tEquirect.value=e;const r=new C(s,o),a=e.minFilter;return e.minFilter===Oi&&(e.minFilter=Nn),new gh(1,10,this).update(t,r),e.minFilter=a,r.geometry.dispose(),r.material.dispose(),this}clear(t,e,i,s){const o=t.getRenderTarget();for(let r=0;r<6;r++)t.setRenderTarget(this,r),t.clear(e,i,s);t.setRenderTarget(o)}}const zr=new w,_h=new w,Mh=new te;class Di{constructor(t=new w(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const s=zr.subVectors(i,e).cross(_h.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(zr),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const o=-(t.start.dot(this.normal)+this.constant)/s;return o<0||o>1?null:e.copy(t.start).addScaledVector(i,o)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||Mh.getNormalMatrix(t),s=this.coplanarPoint(zr).applyMatrix4(t),o=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(o),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ti=new ao,Po=new w;class ol{constructor(t=new Di,e=new Di,i=new Di,s=new Di,o=new Di,r=new Di){this.planes=[t,e,i,s,o,r]}set(t,e,i,s,o,r){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(s),a[4].copy(o),a[5].copy(r),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=Kn){const i=this.planes,s=t.elements,o=s[0],r=s[1],a=s[2],l=s[3],c=s[4],d=s[5],h=s[6],u=s[7],f=s[8],m=s[9],v=s[10],g=s[11],p=s[12],T=s[13],_=s[14],M=s[15];if(i[0].setComponents(l-o,u-c,g-f,M-p).normalize(),i[1].setComponents(l+o,u+c,g+f,M+p).normalize(),i[2].setComponents(l+r,u+d,g+m,M+T).normalize(),i[3].setComponents(l-r,u-d,g-m,M-T).normalize(),i[4].setComponents(l-a,u-h,g-v,M-_).normalize(),e===Kn)i[5].setComponents(l+a,u+h,g+v,M+_).normalize();else if(e===jo)i[5].setComponents(a,h,v,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ti.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Ti.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ti)}intersectsSprite(t){return Ti.center.set(0,0,0),Ti.radius=.7071067811865476,Ti.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ti)}intersectsSphere(t){const e=this.planes,i=t.center,s=-t.radius;for(let o=0;o<6;o++)if(e[o].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const s=e[i];if(Po.x=s.normal.x>0?t.max.x:t.min.x,Po.y=s.normal.y>0?t.max.y:t.min.y,Po.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Po)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function ud(){let n=null,t=!1,e=null,i=null;function s(o,r){e(o,r),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(o){e=o},setContext:function(o){n=o}}}function yh(n){const t=new WeakMap;function e(a,l){const c=a.array,d=a.usage,h=c.byteLength,u=n.createBuffer();n.bindBuffer(l,u),n.bufferData(l,c,d),a.onUploadCallback();let f;if(c instanceof Float32Array)f=n.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=n.HALF_FLOAT:f=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=n.SHORT;else if(c instanceof Uint32Array)f=n.UNSIGNED_INT;else if(c instanceof Int32Array)f=n.INT;else if(c instanceof Int8Array)f=n.BYTE;else if(c instanceof Uint8Array)f=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:h}}function i(a,l,c){const d=l.array,h=l.updateRanges;if(n.bindBuffer(c,a),h.length===0)n.bufferSubData(c,0,d);else{h.sort((f,m)=>f.start-m.start);let u=0;for(let f=1;f<h.length;f++){const m=h[u],v=h[f];v.start<=m.start+m.count+1?m.count=Math.max(m.count,v.start+v.count-m.start):(++u,h[u]=v)}h.length=u+1;for(let f=0,m=h.length;f<m;f++){const v=h[f];n.bufferSubData(c,v.start*d.BYTES_PER_ELEMENT,d,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function o(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(n.deleteBuffer(l.buffer),t.delete(a))}function r(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const d=t.get(a);(!d||d.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:s,remove:o,update:r}}class Kt extends Pe{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};const o=t/2,r=e/2,a=Math.floor(i),l=Math.floor(s),c=a+1,d=l+1,h=t/a,u=e/l,f=[],m=[],v=[],g=[];for(let p=0;p<d;p++){const T=p*u-r;for(let _=0;_<c;_++){const M=_*h-o;m.push(M,-T,0),v.push(0,0,1),g.push(_/a),g.push(1-p/l)}}for(let p=0;p<l;p++)for(let T=0;T<a;T++){const _=T+c*p,M=T+c*(p+1),F=T+1+c*(p+1),L=T+1+c*p;f.push(_,M,L),f.push(M,F,L)}this.setIndex(f),this.setAttribute("position",new Ce(m,3)),this.setAttribute("normal",new Ce(v,3)),this.setAttribute("uv",new Ce(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Kt(t.width,t.height,t.widthSegments,t.heightSegments)}}var xh=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Sh=`#ifdef USE_ALPHAHASH
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
#endif`,wh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,bh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Eh=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Th=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Ah=`#ifdef USE_AOMAP
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
#endif`,Ch=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Rh=`#ifdef USE_BATCHING
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
#endif`,Ph=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Lh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Ih=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Dh=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Uh=`#ifdef USE_IRIDESCENCE
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
#endif`,Nh=`#ifdef USE_BUMPMAP
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
#endif`,zh=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Fh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Oh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Bh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,kh=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Gh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Hh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Vh=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Wh=`#define PI 3.141592653589793
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
} // validated`,Xh=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,qh=`vec3 transformedNormal = objectNormal;
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
#endif`,Yh=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,$h=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Zh=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Kh=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,jh="gl_FragColor = linearToOutputTexel( gl_FragColor );",Jh=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Qh=`#ifdef USE_ENVMAP
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
#endif`,tf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,ef=`#ifdef USE_ENVMAP
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
#endif`,nf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,sf=`#ifdef USE_ENVMAP
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
#endif`,of=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,rf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,af=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,lf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,cf=`#ifdef USE_GRADIENTMAP
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
}`,df=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,uf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,hf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ff=`uniform bool receiveShadow;
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
#endif`,pf=`#ifdef USE_ENVMAP
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
#endif`,mf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,gf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,vf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,_f=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Mf=`PhysicalMaterial material;
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
#endif`,yf=`struct PhysicalMaterial {
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
}`,xf=`
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
#endif`,Sf=`#if defined( RE_IndirectDiffuse )
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
#endif`,wf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,bf=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ef=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Tf=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Af=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Cf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Rf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Pf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Lf=`#if defined( USE_POINTS_UV )
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
#endif`,If=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Df=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Uf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Nf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,zf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ff=`#ifdef USE_MORPHTARGETS
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
#endif`,Of=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Bf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,kf=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Gf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Hf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Vf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Wf=`#ifdef USE_NORMALMAP
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
#endif`,Xf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,qf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Yf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,$f=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Zf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Kf=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,jf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Jf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Qf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,tp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,ep=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,np=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ip=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,sp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,op=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,rp=`float getShadowMask() {
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
}`,ap=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,lp=`#ifdef USE_SKINNING
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
#endif`,cp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,dp=`#ifdef USE_SKINNING
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
#endif`,up=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,hp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,fp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,pp=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,mp=`#ifdef USE_TRANSMISSION
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
#endif`,gp=`#ifdef USE_TRANSMISSION
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
#endif`,vp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,_p=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Mp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,yp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const xp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Sp=`uniform sampler2D t2D;
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
}`,wp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,bp=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Ep=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Tp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ap=`#include <common>
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
}`,Cp=`#if DEPTH_PACKING == 3200
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
}`,Rp=`#define DISTANCE
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
}`,Pp=`#define DISTANCE
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
}`,Lp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Ip=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Dp=`uniform float scale;
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
}`,Up=`uniform vec3 diffuse;
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
}`,Np=`#include <common>
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
}`,zp=`uniform vec3 diffuse;
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
}`,Fp=`#define LAMBERT
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
}`,Op=`#define LAMBERT
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
}`,Bp=`#define MATCAP
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
}`,kp=`#define MATCAP
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
}`,Gp=`#define NORMAL
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
}`,Hp=`#define NORMAL
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
}`,Vp=`#define PHONG
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
}`,Wp=`#define PHONG
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
}`,Xp=`#define STANDARD
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
}`,qp=`#define STANDARD
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
}`,Yp=`#define TOON
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
}`,$p=`#define TOON
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
}`,Zp=`uniform float size;
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
}`,Kp=`uniform vec3 diffuse;
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
}`,jp=`#include <common>
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
}`,Jp=`uniform vec3 color;
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
}`,Qp=`uniform float rotation;
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
}`,t0=`uniform vec3 diffuse;
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
}`,ee={alphahash_fragment:xh,alphahash_pars_fragment:Sh,alphamap_fragment:wh,alphamap_pars_fragment:bh,alphatest_fragment:Eh,alphatest_pars_fragment:Th,aomap_fragment:Ah,aomap_pars_fragment:Ch,batching_pars_vertex:Rh,batching_vertex:Ph,begin_vertex:Lh,beginnormal_vertex:Ih,bsdfs:Dh,iridescence_fragment:Uh,bumpmap_pars_fragment:Nh,clipping_planes_fragment:zh,clipping_planes_pars_fragment:Fh,clipping_planes_pars_vertex:Oh,clipping_planes_vertex:Bh,color_fragment:kh,color_pars_fragment:Gh,color_pars_vertex:Hh,color_vertex:Vh,common:Wh,cube_uv_reflection_fragment:Xh,defaultnormal_vertex:qh,displacementmap_pars_vertex:Yh,displacementmap_vertex:$h,emissivemap_fragment:Zh,emissivemap_pars_fragment:Kh,colorspace_fragment:jh,colorspace_pars_fragment:Jh,envmap_fragment:Qh,envmap_common_pars_fragment:tf,envmap_pars_fragment:ef,envmap_pars_vertex:nf,envmap_physical_pars_fragment:pf,envmap_vertex:sf,fog_vertex:of,fog_pars_vertex:rf,fog_fragment:af,fog_pars_fragment:lf,gradientmap_pars_fragment:cf,lightmap_pars_fragment:df,lights_lambert_fragment:uf,lights_lambert_pars_fragment:hf,lights_pars_begin:ff,lights_toon_fragment:mf,lights_toon_pars_fragment:gf,lights_phong_fragment:vf,lights_phong_pars_fragment:_f,lights_physical_fragment:Mf,lights_physical_pars_fragment:yf,lights_fragment_begin:xf,lights_fragment_maps:Sf,lights_fragment_end:wf,logdepthbuf_fragment:bf,logdepthbuf_pars_fragment:Ef,logdepthbuf_pars_vertex:Tf,logdepthbuf_vertex:Af,map_fragment:Cf,map_pars_fragment:Rf,map_particle_fragment:Pf,map_particle_pars_fragment:Lf,metalnessmap_fragment:If,metalnessmap_pars_fragment:Df,morphinstance_vertex:Uf,morphcolor_vertex:Nf,morphnormal_vertex:zf,morphtarget_pars_vertex:Ff,morphtarget_vertex:Of,normal_fragment_begin:Bf,normal_fragment_maps:kf,normal_pars_fragment:Gf,normal_pars_vertex:Hf,normal_vertex:Vf,normalmap_pars_fragment:Wf,clearcoat_normal_fragment_begin:Xf,clearcoat_normal_fragment_maps:qf,clearcoat_pars_fragment:Yf,iridescence_pars_fragment:$f,opaque_fragment:Zf,packing:Kf,premultiplied_alpha_fragment:jf,project_vertex:Jf,dithering_fragment:Qf,dithering_pars_fragment:tp,roughnessmap_fragment:ep,roughnessmap_pars_fragment:np,shadowmap_pars_fragment:ip,shadowmap_pars_vertex:sp,shadowmap_vertex:op,shadowmask_pars_fragment:rp,skinbase_vertex:ap,skinning_pars_vertex:lp,skinning_vertex:cp,skinnormal_vertex:dp,specularmap_fragment:up,specularmap_pars_fragment:hp,tonemapping_fragment:fp,tonemapping_pars_fragment:pp,transmission_fragment:mp,transmission_pars_fragment:gp,uv_pars_fragment:vp,uv_pars_vertex:_p,uv_vertex:Mp,worldpos_vertex:yp,background_vert:xp,background_frag:Sp,backgroundCube_vert:wp,backgroundCube_frag:bp,cube_vert:Ep,cube_frag:Tp,depth_vert:Ap,depth_frag:Cp,distanceRGBA_vert:Rp,distanceRGBA_frag:Pp,equirect_vert:Lp,equirect_frag:Ip,linedashed_vert:Dp,linedashed_frag:Up,meshbasic_vert:Np,meshbasic_frag:zp,meshlambert_vert:Fp,meshlambert_frag:Op,meshmatcap_vert:Bp,meshmatcap_frag:kp,meshnormal_vert:Gp,meshnormal_frag:Hp,meshphong_vert:Vp,meshphong_frag:Wp,meshphysical_vert:Xp,meshphysical_frag:qp,meshtoon_vert:Yp,meshtoon_frag:$p,points_vert:Zp,points_frag:Kp,shadow_vert:jp,shadow_frag:Jp,sprite_vert:Qp,sprite_frag:t0},Mt={common:{diffuse:{value:new vt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new te},alphaMap:{value:null},alphaMapTransform:{value:new te},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new te}},envmap:{envMap:{value:null},envMapRotation:{value:new te},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new te}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new te}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new te},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new te},normalScale:{value:new Dt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new te},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new te}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new te}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new te}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new vt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new vt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new te},alphaTest:{value:0},uvTransform:{value:new te}},sprite:{diffuse:{value:new vt(16777215)},opacity:{value:1},center:{value:new Dt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new te},alphaMap:{value:null},alphaMapTransform:{value:new te},alphaTest:{value:0}}},Un={basic:{uniforms:rn([Mt.common,Mt.specularmap,Mt.envmap,Mt.aomap,Mt.lightmap,Mt.fog]),vertexShader:ee.meshbasic_vert,fragmentShader:ee.meshbasic_frag},lambert:{uniforms:rn([Mt.common,Mt.specularmap,Mt.envmap,Mt.aomap,Mt.lightmap,Mt.emissivemap,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,Mt.fog,Mt.lights,{emissive:{value:new vt(0)}}]),vertexShader:ee.meshlambert_vert,fragmentShader:ee.meshlambert_frag},phong:{uniforms:rn([Mt.common,Mt.specularmap,Mt.envmap,Mt.aomap,Mt.lightmap,Mt.emissivemap,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,Mt.fog,Mt.lights,{emissive:{value:new vt(0)},specular:{value:new vt(1118481)},shininess:{value:30}}]),vertexShader:ee.meshphong_vert,fragmentShader:ee.meshphong_frag},standard:{uniforms:rn([Mt.common,Mt.envmap,Mt.aomap,Mt.lightmap,Mt.emissivemap,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,Mt.roughnessmap,Mt.metalnessmap,Mt.fog,Mt.lights,{emissive:{value:new vt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ee.meshphysical_vert,fragmentShader:ee.meshphysical_frag},toon:{uniforms:rn([Mt.common,Mt.aomap,Mt.lightmap,Mt.emissivemap,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,Mt.gradientmap,Mt.fog,Mt.lights,{emissive:{value:new vt(0)}}]),vertexShader:ee.meshtoon_vert,fragmentShader:ee.meshtoon_frag},matcap:{uniforms:rn([Mt.common,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,Mt.fog,{matcap:{value:null}}]),vertexShader:ee.meshmatcap_vert,fragmentShader:ee.meshmatcap_frag},points:{uniforms:rn([Mt.points,Mt.fog]),vertexShader:ee.points_vert,fragmentShader:ee.points_frag},dashed:{uniforms:rn([Mt.common,Mt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ee.linedashed_vert,fragmentShader:ee.linedashed_frag},depth:{uniforms:rn([Mt.common,Mt.displacementmap]),vertexShader:ee.depth_vert,fragmentShader:ee.depth_frag},normal:{uniforms:rn([Mt.common,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,{opacity:{value:1}}]),vertexShader:ee.meshnormal_vert,fragmentShader:ee.meshnormal_frag},sprite:{uniforms:rn([Mt.sprite,Mt.fog]),vertexShader:ee.sprite_vert,fragmentShader:ee.sprite_frag},background:{uniforms:{uvTransform:{value:new te},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ee.background_vert,fragmentShader:ee.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new te}},vertexShader:ee.backgroundCube_vert,fragmentShader:ee.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ee.cube_vert,fragmentShader:ee.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ee.equirect_vert,fragmentShader:ee.equirect_frag},distanceRGBA:{uniforms:rn([Mt.common,Mt.displacementmap,{referencePosition:{value:new w},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ee.distanceRGBA_vert,fragmentShader:ee.distanceRGBA_frag},shadow:{uniforms:rn([Mt.lights,Mt.fog,{color:{value:new vt(0)},opacity:{value:1}}]),vertexShader:ee.shadow_vert,fragmentShader:ee.shadow_frag}};Un.physical={uniforms:rn([Un.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new te},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new te},clearcoatNormalScale:{value:new Dt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new te},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new te},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new te},sheen:{value:0},sheenColor:{value:new vt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new te},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new te},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new te},transmissionSamplerSize:{value:new Dt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new te},attenuationDistance:{value:0},attenuationColor:{value:new vt(0)},specularColor:{value:new vt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new te},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new te},anisotropyVector:{value:new Dt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new te}}]),vertexShader:ee.meshphysical_vert,fragmentShader:ee.meshphysical_frag};const Lo={r:0,b:0,g:0},Ai=new Pn,e0=new be;function n0(n,t,e,i,s,o,r){const a=new vt(0);let l=o===!0?0:1,c,d,h=null,u=0,f=null;function m(T){let _=T.isScene===!0?T.background:null;return _&&_.isTexture&&(_=(T.backgroundBlurriness>0?e:t).get(_)),_}function v(T){let _=!1;const M=m(T);M===null?p(a,l):M&&M.isColor&&(p(M,1),_=!0);const F=n.xr.getEnvironmentBlendMode();F==="additive"?i.buffers.color.setClear(0,0,0,1,r):F==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,r),(n.autoClear||_)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function g(T,_){const M=m(_);M&&(M.isCubeTexture||M.mapping===lr)?(d===void 0&&(d=new C(new dt(1,1,1),new ei({name:"BackgroundCubeMaterial",uniforms:Es(Un.backgroundCube.uniforms),vertexShader:Un.backgroundCube.vertexShader,fragmentShader:Un.backgroundCube.fragmentShader,side:en,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(F,L,D){this.matrixWorld.copyPosition(D.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(d)),Ai.copy(_.backgroundRotation),Ai.x*=-1,Ai.y*=-1,Ai.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Ai.y*=-1,Ai.z*=-1),d.material.uniforms.envMap.value=M,d.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(e0.makeRotationFromEuler(Ai)),d.material.toneMapped=he.getTransfer(M.colorSpace)!==xe,(h!==M||u!==M.version||f!==n.toneMapping)&&(d.material.needsUpdate=!0,h=M,u=M.version,f=n.toneMapping),d.layers.enableAll(),T.unshift(d,d.geometry,d.material,0,0,null)):M&&M.isTexture&&(c===void 0&&(c=new C(new Kt(2,2),new ei({name:"BackgroundMaterial",uniforms:Es(Un.background.uniforms),vertexShader:Un.background.vertexShader,fragmentShader:Un.background.fragmentShader,side:Mi,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=M,c.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,c.material.toneMapped=he.getTransfer(M.colorSpace)!==xe,M.matrixAutoUpdate===!0&&M.updateMatrix(),c.material.uniforms.uvTransform.value.copy(M.matrix),(h!==M||u!==M.version||f!==n.toneMapping)&&(c.material.needsUpdate=!0,h=M,u=M.version,f=n.toneMapping),c.layers.enableAll(),T.unshift(c,c.geometry,c.material,0,0,null))}function p(T,_){T.getRGB(Lo,ld(n)),i.buffers.color.setClear(Lo.r,Lo.g,Lo.b,_,r)}return{getClearColor:function(){return a},setClearColor:function(T,_=1){a.set(T),l=_,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(T){l=T,p(a,l)},render:v,addToRenderList:g}}function i0(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=u(null);let o=s,r=!1;function a(x,P,O,V,Q){let nt=!1;const tt=h(V,O,P);o!==tt&&(o=tt,c(o.object)),nt=f(x,V,O,Q),nt&&m(x,V,O,Q),Q!==null&&t.update(Q,n.ELEMENT_ARRAY_BUFFER),(nt||r)&&(r=!1,M(x,P,O,V),Q!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(Q).buffer))}function l(){return n.createVertexArray()}function c(x){return n.bindVertexArray(x)}function d(x){return n.deleteVertexArray(x)}function h(x,P,O){const V=O.wireframe===!0;let Q=i[x.id];Q===void 0&&(Q={},i[x.id]=Q);let nt=Q[P.id];nt===void 0&&(nt={},Q[P.id]=nt);let tt=nt[V];return tt===void 0&&(tt=u(l()),nt[V]=tt),tt}function u(x){const P=[],O=[],V=[];for(let Q=0;Q<e;Q++)P[Q]=0,O[Q]=0,V[Q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:O,attributeDivisors:V,object:x,attributes:{},index:null}}function f(x,P,O,V){const Q=o.attributes,nt=P.attributes;let tt=0;const it=O.getAttributes();for(const J in it)if(it[J].location>=0){const B=Q[J];let ut=nt[J];if(ut===void 0&&(J==="instanceMatrix"&&x.instanceMatrix&&(ut=x.instanceMatrix),J==="instanceColor"&&x.instanceColor&&(ut=x.instanceColor)),B===void 0||B.attribute!==ut||ut&&B.data!==ut.data)return!0;tt++}return o.attributesNum!==tt||o.index!==V}function m(x,P,O,V){const Q={},nt=P.attributes;let tt=0;const it=O.getAttributes();for(const J in it)if(it[J].location>=0){let B=nt[J];B===void 0&&(J==="instanceMatrix"&&x.instanceMatrix&&(B=x.instanceMatrix),J==="instanceColor"&&x.instanceColor&&(B=x.instanceColor));const ut={};ut.attribute=B,B&&B.data&&(ut.data=B.data),Q[J]=ut,tt++}o.attributes=Q,o.attributesNum=tt,o.index=V}function v(){const x=o.newAttributes;for(let P=0,O=x.length;P<O;P++)x[P]=0}function g(x){p(x,0)}function p(x,P){const O=o.newAttributes,V=o.enabledAttributes,Q=o.attributeDivisors;O[x]=1,V[x]===0&&(n.enableVertexAttribArray(x),V[x]=1),Q[x]!==P&&(n.vertexAttribDivisor(x,P),Q[x]=P)}function T(){const x=o.newAttributes,P=o.enabledAttributes;for(let O=0,V=P.length;O<V;O++)P[O]!==x[O]&&(n.disableVertexAttribArray(O),P[O]=0)}function _(x,P,O,V,Q,nt,tt){tt===!0?n.vertexAttribIPointer(x,P,O,Q,nt):n.vertexAttribPointer(x,P,O,V,Q,nt)}function M(x,P,O,V){v();const Q=V.attributes,nt=O.getAttributes(),tt=P.defaultAttributeValues;for(const it in nt){const J=nt[it];if(J.location>=0){let ht=Q[it];if(ht===void 0&&(it==="instanceMatrix"&&x.instanceMatrix&&(ht=x.instanceMatrix),it==="instanceColor"&&x.instanceColor&&(ht=x.instanceColor)),ht!==void 0){const B=ht.normalized,ut=ht.itemSize,gt=t.get(ht);if(gt===void 0)continue;const yt=gt.buffer,st=gt.type,mt=gt.bytesPerElement,Ut=st===n.INT||st===n.UNSIGNED_INT||ht.gpuType===Ka;if(ht.isInterleavedBufferAttribute){const _t=ht.data,Vt=_t.stride,$t=ht.offset;if(_t.isInstancedInterleavedBuffer){for(let Qt=0;Qt<J.locationSize;Qt++)p(J.location+Qt,_t.meshPerAttribute);x.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=_t.meshPerAttribute*_t.count)}else for(let Qt=0;Qt<J.locationSize;Qt++)g(J.location+Qt);n.bindBuffer(n.ARRAY_BUFFER,yt);for(let Qt=0;Qt<J.locationSize;Qt++)_(J.location+Qt,ut/J.locationSize,st,B,Vt*mt,($t+ut/J.locationSize*Qt)*mt,Ut)}else{if(ht.isInstancedBufferAttribute){for(let _t=0;_t<J.locationSize;_t++)p(J.location+_t,ht.meshPerAttribute);x.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=ht.meshPerAttribute*ht.count)}else for(let _t=0;_t<J.locationSize;_t++)g(J.location+_t);n.bindBuffer(n.ARRAY_BUFFER,yt);for(let _t=0;_t<J.locationSize;_t++)_(J.location+_t,ut/J.locationSize,st,B,ut*mt,ut/J.locationSize*_t*mt,Ut)}}else if(tt!==void 0){const B=tt[it];if(B!==void 0)switch(B.length){case 2:n.vertexAttrib2fv(J.location,B);break;case 3:n.vertexAttrib3fv(J.location,B);break;case 4:n.vertexAttrib4fv(J.location,B);break;default:n.vertexAttrib1fv(J.location,B)}}}}T()}function F(){I();for(const x in i){const P=i[x];for(const O in P){const V=P[O];for(const Q in V)d(V[Q].object),delete V[Q];delete P[O]}delete i[x]}}function L(x){if(i[x.id]===void 0)return;const P=i[x.id];for(const O in P){const V=P[O];for(const Q in V)d(V[Q].object),delete V[Q];delete P[O]}delete i[x.id]}function D(x){for(const P in i){const O=i[P];if(O[x.id]===void 0)continue;const V=O[x.id];for(const Q in V)d(V[Q].object),delete V[Q];delete O[x.id]}}function I(){y(),r=!0,o!==s&&(o=s,c(o.object))}function y(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:I,resetDefaultState:y,dispose:F,releaseStatesOfGeometry:L,releaseStatesOfProgram:D,initAttributes:v,enableAttribute:g,disableUnusedAttributes:T}}function s0(n,t,e){let i;function s(c){i=c}function o(c,d){n.drawArrays(i,c,d),e.update(d,i,1)}function r(c,d,h){h!==0&&(n.drawArraysInstanced(i,c,d,h),e.update(d,i,h))}function a(c,d,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,d,0,h);let f=0;for(let m=0;m<h;m++)f+=d[m];e.update(f,i,1)}function l(c,d,h,u){if(h===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let m=0;m<c.length;m++)r(c[m],d[m],u[m]);else{f.multiDrawArraysInstancedWEBGL(i,c,0,d,0,u,0,h);let m=0;for(let v=0;v<h;v++)m+=d[v]*u[v];e.update(m,i,1)}}this.setMode=s,this.render=o,this.renderInstances=r,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function o0(n,t,e,i){let s;function o(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const D=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(D.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function r(D){return!(D!==An&&i.convert(D)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(D){const I=D===so&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(D!==ti&&i.convert(D)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&D!==Zn&&!I)}function l(D){if(D==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";D="mediump"}return D==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const d=l(c);d!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);const h=e.logarithmicDepthBuffer===!0,u=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),m=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),T=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),_=n.getParameter(n.MAX_VARYING_VECTORS),M=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),F=m>0,L=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:o,getMaxPrecision:l,textureFormatReadable:r,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:h,reverseDepthBuffer:u,maxTextures:f,maxVertexTextures:m,maxTextureSize:v,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:T,maxVaryings:_,maxFragmentUniforms:M,vertexTextures:F,maxSamples:L}}function r0(n){const t=this;let e=null,i=0,s=!1,o=!1;const r=new Di,a=new te,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,u){const f=h.length!==0||u||i!==0||s;return s=u,i=h.length,f},this.beginShadows=function(){o=!0,d(null)},this.endShadows=function(){o=!1},this.setGlobalState=function(h,u){e=d(h,u,0)},this.setState=function(h,u,f){const m=h.clippingPlanes,v=h.clipIntersection,g=h.clipShadows,p=n.get(h);if(!s||m===null||m.length===0||o&&!g)o?d(null):c();else{const T=o?0:i,_=T*4;let M=p.clippingState||null;l.value=M,M=d(m,u,_,f);for(let F=0;F!==_;++F)M[F]=e[F];p.clippingState=M,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=T}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function d(h,u,f,m){const v=h!==null?h.length:0;let g=null;if(v!==0){if(g=l.value,m!==!0||g===null){const p=f+v*4,T=u.matrixWorldInverse;a.getNormalMatrix(T),(g===null||g.length<p)&&(g=new Float32Array(p));for(let _=0,M=f;_!==v;++_,M+=4)r.copy(h[_]).applyMatrix4(T,a),r.normal.toArray(g,M),g[M+3]=r.constant}l.value=g,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,g}}function a0(n){let t=new WeakMap;function e(r,a){return a===pa?r.mapping=xs:a===ma&&(r.mapping=Ss),r}function i(r){if(r&&r.isTexture){const a=r.mapping;if(a===pa||a===ma)if(t.has(r)){const l=t.get(r).texture;return e(l,r.mapping)}else{const l=r.image;if(l&&l.height>0){const c=new vh(l.height);return c.fromEquirectangularTexture(n,r),t.set(r,c),r.addEventListener("dispose",s),e(c.texture,r.mapping)}else return null}}return r}function s(r){const a=r.target;a.removeEventListener("dispose",s);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function o(){t=new WeakMap}return{get:i,dispose:o}}class hd extends cd{constructor(t=-1,e=1,i=1,s=-1,o=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=o,this.far=r,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,o,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=o,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let o=i-t,r=i+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;o+=c*this.view.offsetX,r=o+c*this.view.width,a-=d*this.view.offsetY,l=a-d*this.view.height}this.projectionMatrix.makeOrthographic(o,r,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const ps=4,ql=[.125,.215,.35,.446,.526,.582],zi=20,Fr=new hd,Yl=new vt;let Or=null,Br=0,kr=0,Gr=!1;const Ui=(1+Math.sqrt(5))/2,as=1/Ui,$l=[new w(-Ui,as,0),new w(Ui,as,0),new w(-as,0,Ui),new w(as,0,Ui),new w(0,Ui,-as),new w(0,Ui,as),new w(-1,1,-1),new w(1,1,-1),new w(-1,1,1),new w(1,1,1)];class Zl{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,s=100){Or=this._renderer.getRenderTarget(),Br=this._renderer.getActiveCubeFace(),kr=this._renderer.getActiveMipmapLevel(),Gr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const o=this._allocateTargets();return o.depthBuffer=!0,this._sceneToCubeUV(t,i,s,o),e>0&&this._blur(o,0,0,e),this._applyPMREM(o),this._cleanup(o),o}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Jl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=jl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Or,Br,kr),this._renderer.xr.enabled=Gr,t.scissorTest=!1,Io(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===xs||t.mapping===Ss?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Or=this._renderer.getRenderTarget(),Br=this._renderer.getActiveCubeFace(),kr=this._renderer.getActiveMipmapLevel(),Gr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:Nn,minFilter:Nn,generateMipmaps:!1,type:so,format:An,colorSpace:Cs,depthBuffer:!1},s=Kl(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Kl(t,e,i);const{_lodMax:o}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=l0(o)),this._blurMaterial=c0(o,t,e)}return s}_compileMaterial(t){const e=new C(this._lodPlanes[0],t);this._renderer.compile(e,Fr)}_sceneToCubeUV(t,e,i,s){const a=new Ae(90,1,e,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,u=d.toneMapping;d.getClearColor(Yl),d.toneMapping=_i,d.autoClear=!1;const f=new Fe({name:"PMREM.Background",side:en,depthWrite:!1,depthTest:!1}),m=new C(new dt,f);let v=!1;const g=t.background;g?g.isColor&&(f.color.copy(g),t.background=null,v=!0):(f.color.copy(Yl),v=!0);for(let p=0;p<6;p++){const T=p%3;T===0?(a.up.set(0,l[p],0),a.lookAt(c[p],0,0)):T===1?(a.up.set(0,0,l[p]),a.lookAt(0,c[p],0)):(a.up.set(0,l[p],0),a.lookAt(0,0,c[p]));const _=this._cubeSize;Io(s,T*_,p>2?_:0,_,_),d.setRenderTarget(s),v&&d.render(m,a),d.render(t,a)}m.geometry.dispose(),m.material.dispose(),d.toneMapping=u,d.autoClear=h,t.background=g}_textureToCubeUV(t,e){const i=this._renderer,s=t.mapping===xs||t.mapping===Ss;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Jl()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=jl());const o=s?this._cubemapMaterial:this._equirectMaterial,r=new C(this._lodPlanes[0],o),a=o.uniforms;a.envMap.value=t;const l=this._cubeSize;Io(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(r,Fr)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let o=1;o<s;o++){const r=Math.sqrt(this._sigmas[o]*this._sigmas[o]-this._sigmas[o-1]*this._sigmas[o-1]),a=$l[(s-o-1)%$l.length];this._blur(t,o-1,o,r,a)}e.autoClear=i}_blur(t,e,i,s,o){const r=this._pingPongRenderTarget;this._halfBlur(t,r,e,i,s,"latitudinal",o),this._halfBlur(r,t,i,i,s,"longitudinal",o)}_halfBlur(t,e,i,s,o,r,a){const l=this._renderer,c=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const d=3,h=new C(this._lodPlanes[s],c),u=c.uniforms,f=this._sizeLods[i]-1,m=isFinite(o)?Math.PI/(2*f):2*Math.PI/(2*zi-1),v=o/m,g=isFinite(o)?1+Math.floor(d*v):zi;g>zi&&console.warn(`sigmaRadians, ${o}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${zi}`);const p=[];let T=0;for(let D=0;D<zi;++D){const I=D/v,y=Math.exp(-I*I/2);p.push(y),D===0?T+=y:D<g&&(T+=2*y)}for(let D=0;D<p.length;D++)p[D]=p[D]/T;u.envMap.value=t.texture,u.samples.value=g,u.weights.value=p,u.latitudinal.value=r==="latitudinal",a&&(u.poleAxis.value=a);const{_lodMax:_}=this;u.dTheta.value=m,u.mipInt.value=_-i;const M=this._sizeLods[s],F=3*M*(s>_-ps?s-_+ps:0),L=4*(this._cubeSize-M);Io(e,F,L,3*M,2*M),l.setRenderTarget(e),l.render(h,Fr)}}function l0(n){const t=[],e=[],i=[];let s=n;const o=n-ps+1+ql.length;for(let r=0;r<o;r++){const a=Math.pow(2,s);e.push(a);let l=1/a;r>n-ps?l=ql[r-n+ps-1]:r===0&&(l=0),i.push(l);const c=1/(a-2),d=-c,h=1+c,u=[d,d,h,d,h,h,d,d,h,h,d,h],f=6,m=6,v=3,g=2,p=1,T=new Float32Array(v*m*f),_=new Float32Array(g*m*f),M=new Float32Array(p*m*f);for(let L=0;L<f;L++){const D=L%3*2/3-1,I=L>2?0:-1,y=[D,I,0,D+2/3,I,0,D+2/3,I+1,0,D,I,0,D+2/3,I+1,0,D,I+1,0];T.set(y,v*m*L),_.set(u,g*m*L);const x=[L,L,L,L,L,L];M.set(x,p*m*L)}const F=new Pe;F.setAttribute("position",new Oe(T,v)),F.setAttribute("uv",new Oe(_,g)),F.setAttribute("faceIndex",new Oe(M,p)),t.push(F),s>ps&&s--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function Kl(n,t,e){const i=new Gi(n,t,e);return i.texture.mapping=lr,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Io(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function c0(n,t,e){const i=new Float32Array(zi),s=new w(0,1,0);return new ei({name:"SphericalGaussianBlur",defines:{n:zi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:rl(),fragmentShader:`

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
		`,blending:vi,depthTest:!1,depthWrite:!1})}function jl(){return new ei({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:rl(),fragmentShader:`

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
		`,blending:vi,depthTest:!1,depthWrite:!1})}function Jl(){return new ei({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:rl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:vi,depthTest:!1,depthWrite:!1})}function rl(){return`

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
	`}function d0(n){let t=new WeakMap,e=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===pa||l===ma,d=l===xs||l===Ss;if(c||d){let h=t.get(a);const u=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==u)return e===null&&(e=new Zl(n)),h=c?e.fromEquirectangular(a,h):e.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,t.set(a,h),h.texture;if(h!==void 0)return h.texture;{const f=a.image;return c&&f&&f.height>0||d&&f&&s(f)?(e===null&&(e=new Zl(n)),h=c?e.fromEquirectangular(a):e.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,t.set(a,h),a.addEventListener("dispose",o),h.texture):null}}}return a}function s(a){let l=0;const c=6;for(let d=0;d<c;d++)a[d]!==void 0&&l++;return l===c}function o(a){const l=a.target;l.removeEventListener("dispose",o);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function r(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:r}}function u0(n){const t={};function e(i){if(t[i]!==void 0)return t[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const s=e(i);return s===null&&qs("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function h0(n,t,e,i){const s={},o=new WeakMap;function r(h){const u=h.target;u.index!==null&&t.remove(u.index);for(const m in u.attributes)t.remove(u.attributes[m]);for(const m in u.morphAttributes){const v=u.morphAttributes[m];for(let g=0,p=v.length;g<p;g++)t.remove(v[g])}u.removeEventListener("dispose",r),delete s[u.id];const f=o.get(u);f&&(t.remove(f),o.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function a(h,u){return s[u.id]===!0||(u.addEventListener("dispose",r),s[u.id]=!0,e.memory.geometries++),u}function l(h){const u=h.attributes;for(const m in u)t.update(u[m],n.ARRAY_BUFFER);const f=h.morphAttributes;for(const m in f){const v=f[m];for(let g=0,p=v.length;g<p;g++)t.update(v[g],n.ARRAY_BUFFER)}}function c(h){const u=[],f=h.index,m=h.attributes.position;let v=0;if(f!==null){const T=f.array;v=f.version;for(let _=0,M=T.length;_<M;_+=3){const F=T[_+0],L=T[_+1],D=T[_+2];u.push(F,L,L,D,D,F)}}else if(m!==void 0){const T=m.array;v=m.version;for(let _=0,M=T.length/3-1;_<M;_+=3){const F=_+0,L=_+1,D=_+2;u.push(F,L,L,D,D,F)}}else return;const g=new(nd(u)?ad:rd)(u,1);g.version=v;const p=o.get(h);p&&t.remove(p),o.set(h,g)}function d(h){const u=o.get(h);if(u){const f=h.index;f!==null&&u.version<f.version&&c(h)}else c(h);return o.get(h)}return{get:a,update:l,getWireframeAttribute:d}}function f0(n,t,e){let i;function s(u){i=u}let o,r;function a(u){o=u.type,r=u.bytesPerElement}function l(u,f){n.drawElements(i,f,o,u*r),e.update(f,i,1)}function c(u,f,m){m!==0&&(n.drawElementsInstanced(i,f,o,u*r,m),e.update(f,i,m))}function d(u,f,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,o,u,0,m);let g=0;for(let p=0;p<m;p++)g+=f[p];e.update(g,i,1)}function h(u,f,m,v){if(m===0)return;const g=t.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<u.length;p++)c(u[p]/r,f[p],v[p]);else{g.multiDrawElementsInstancedWEBGL(i,f,0,o,u,0,v,0,m);let p=0;for(let T=0;T<m;T++)p+=f[T]*v[T];e.update(p,i,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=d,this.renderMultiDrawInstances=h}function p0(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(o,r,a){switch(e.calls++,r){case n.TRIANGLES:e.triangles+=a*(o/3);break;case n.LINES:e.lines+=a*(o/2);break;case n.LINE_STRIP:e.lines+=a*(o-1);break;case n.LINE_LOOP:e.lines+=a*o;break;case n.POINTS:e.points+=a*o;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",r);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function m0(n,t,e){const i=new WeakMap,s=new Se;function o(r,a,l){const c=r.morphTargetInfluences,d=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=d!==void 0?d.length:0;let u=i.get(a);if(u===void 0||u.count!==h){let x=function(){I.dispose(),i.delete(a),a.removeEventListener("dispose",x)};var f=x;u!==void 0&&u.texture.dispose();const m=a.morphAttributes.position!==void 0,v=a.morphAttributes.normal!==void 0,g=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],T=a.morphAttributes.normal||[],_=a.morphAttributes.color||[];let M=0;m===!0&&(M=1),v===!0&&(M=2),g===!0&&(M=3);let F=a.attributes.position.count*M,L=1;F>t.maxTextureSize&&(L=Math.ceil(F/t.maxTextureSize),F=t.maxTextureSize);const D=new Float32Array(F*L*4*h),I=new sd(D,F,L,h);I.type=Zn,I.needsUpdate=!0;const y=M*4;for(let P=0;P<h;P++){const O=p[P],V=T[P],Q=_[P],nt=F*L*4*P;for(let tt=0;tt<O.count;tt++){const it=tt*y;m===!0&&(s.fromBufferAttribute(O,tt),D[nt+it+0]=s.x,D[nt+it+1]=s.y,D[nt+it+2]=s.z,D[nt+it+3]=0),v===!0&&(s.fromBufferAttribute(V,tt),D[nt+it+4]=s.x,D[nt+it+5]=s.y,D[nt+it+6]=s.z,D[nt+it+7]=0),g===!0&&(s.fromBufferAttribute(Q,tt),D[nt+it+8]=s.x,D[nt+it+9]=s.y,D[nt+it+10]=s.z,D[nt+it+11]=Q.itemSize===4?s.w:1)}}u={count:h,texture:I,size:new Dt(F,L)},i.set(a,u),a.addEventListener("dispose",x)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",r.morphTexture,e);else{let m=0;for(let g=0;g<c.length;g++)m+=c[g];const v=a.morphTargetsRelative?1:1-m;l.getUniforms().setValue(n,"morphTargetBaseInfluence",v),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",u.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",u.size)}return{update:o}}function g0(n,t,e,i){let s=new WeakMap;function o(l){const c=i.render.frame,d=l.geometry,h=t.get(l,d);if(s.get(h)!==c&&(t.update(h),s.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const u=l.skeleton;s.get(u)!==c&&(u.update(),s.set(u,c))}return h}function r(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:o,dispose:r}}class fd extends cn{constructor(t,e,i,s,o,r,a,l,c,d=ms){if(d!==ms&&d!==bs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&d===ms&&(i=ki),i===void 0&&d===bs&&(i=ws),super(null,s,o,r,a,l,d,i,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:Cn,this.minFilter=l!==void 0?l:Cn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const pd=new cn,Ql=new fd(1,1),md=new sd,gd=new eh,vd=new dd,tc=[],ec=[],nc=new Float32Array(16),ic=new Float32Array(9),sc=new Float32Array(4);function Ps(n,t,e){const i=n[0];if(i<=0||i>0)return n;const s=t*e;let o=tc[s];if(o===void 0&&(o=new Float32Array(s),tc[s]=o),t!==0){i.toArray(o,0);for(let r=1,a=0;r!==t;++r)a+=e,n[r].toArray(o,a)}return o}function We(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function Xe(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function ur(n,t){let e=ec[t];e===void 0&&(e=new Int32Array(t),ec[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function v0(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function _0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(We(e,t))return;n.uniform2fv(this.addr,t),Xe(e,t)}}function M0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(We(e,t))return;n.uniform3fv(this.addr,t),Xe(e,t)}}function y0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(We(e,t))return;n.uniform4fv(this.addr,t),Xe(e,t)}}function x0(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(We(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),Xe(e,t)}else{if(We(e,i))return;sc.set(i),n.uniformMatrix2fv(this.addr,!1,sc),Xe(e,i)}}function S0(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(We(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),Xe(e,t)}else{if(We(e,i))return;ic.set(i),n.uniformMatrix3fv(this.addr,!1,ic),Xe(e,i)}}function w0(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(We(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),Xe(e,t)}else{if(We(e,i))return;nc.set(i),n.uniformMatrix4fv(this.addr,!1,nc),Xe(e,i)}}function b0(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function E0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(We(e,t))return;n.uniform2iv(this.addr,t),Xe(e,t)}}function T0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(We(e,t))return;n.uniform3iv(this.addr,t),Xe(e,t)}}function A0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(We(e,t))return;n.uniform4iv(this.addr,t),Xe(e,t)}}function C0(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function R0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(We(e,t))return;n.uniform2uiv(this.addr,t),Xe(e,t)}}function P0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(We(e,t))return;n.uniform3uiv(this.addr,t),Xe(e,t)}}function L0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(We(e,t))return;n.uniform4uiv(this.addr,t),Xe(e,t)}}function I0(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let o;this.type===n.SAMPLER_2D_SHADOW?(Ql.compareFunction=ed,o=Ql):o=pd,e.setTexture2D(t||o,s)}function D0(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||gd,s)}function U0(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||vd,s)}function N0(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||md,s)}function z0(n){switch(n){case 5126:return v0;case 35664:return _0;case 35665:return M0;case 35666:return y0;case 35674:return x0;case 35675:return S0;case 35676:return w0;case 5124:case 35670:return b0;case 35667:case 35671:return E0;case 35668:case 35672:return T0;case 35669:case 35673:return A0;case 5125:return C0;case 36294:return R0;case 36295:return P0;case 36296:return L0;case 35678:case 36198:case 36298:case 36306:case 35682:return I0;case 35679:case 36299:case 36307:return D0;case 35680:case 36300:case 36308:case 36293:return U0;case 36289:case 36303:case 36311:case 36292:return N0}}function F0(n,t){n.uniform1fv(this.addr,t)}function O0(n,t){const e=Ps(t,this.size,2);n.uniform2fv(this.addr,e)}function B0(n,t){const e=Ps(t,this.size,3);n.uniform3fv(this.addr,e)}function k0(n,t){const e=Ps(t,this.size,4);n.uniform4fv(this.addr,e)}function G0(n,t){const e=Ps(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function H0(n,t){const e=Ps(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function V0(n,t){const e=Ps(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function W0(n,t){n.uniform1iv(this.addr,t)}function X0(n,t){n.uniform2iv(this.addr,t)}function q0(n,t){n.uniform3iv(this.addr,t)}function Y0(n,t){n.uniform4iv(this.addr,t)}function $0(n,t){n.uniform1uiv(this.addr,t)}function Z0(n,t){n.uniform2uiv(this.addr,t)}function K0(n,t){n.uniform3uiv(this.addr,t)}function j0(n,t){n.uniform4uiv(this.addr,t)}function J0(n,t,e){const i=this.cache,s=t.length,o=ur(e,s);We(i,o)||(n.uniform1iv(this.addr,o),Xe(i,o));for(let r=0;r!==s;++r)e.setTexture2D(t[r]||pd,o[r])}function Q0(n,t,e){const i=this.cache,s=t.length,o=ur(e,s);We(i,o)||(n.uniform1iv(this.addr,o),Xe(i,o));for(let r=0;r!==s;++r)e.setTexture3D(t[r]||gd,o[r])}function tm(n,t,e){const i=this.cache,s=t.length,o=ur(e,s);We(i,o)||(n.uniform1iv(this.addr,o),Xe(i,o));for(let r=0;r!==s;++r)e.setTextureCube(t[r]||vd,o[r])}function em(n,t,e){const i=this.cache,s=t.length,o=ur(e,s);We(i,o)||(n.uniform1iv(this.addr,o),Xe(i,o));for(let r=0;r!==s;++r)e.setTexture2DArray(t[r]||md,o[r])}function nm(n){switch(n){case 5126:return F0;case 35664:return O0;case 35665:return B0;case 35666:return k0;case 35674:return G0;case 35675:return H0;case 35676:return V0;case 5124:case 35670:return W0;case 35667:case 35671:return X0;case 35668:case 35672:return q0;case 35669:case 35673:return Y0;case 5125:return $0;case 36294:return Z0;case 36295:return K0;case 36296:return j0;case 35678:case 36198:case 36298:case 36306:case 35682:return J0;case 35679:case 36299:case 36307:return Q0;case 35680:case 36300:case 36308:case 36293:return tm;case 36289:case 36303:case 36311:case 36292:return em}}class im{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=z0(e.type)}}class sm{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=nm(e.type)}}class om{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const s=this.seq;for(let o=0,r=s.length;o!==r;++o){const a=s[o];a.setValue(t,e[a.id],i)}}}const Hr=/(\w+)(\])?(\[|\.)?/g;function oc(n,t){n.seq.push(t),n.map[t.id]=t}function rm(n,t,e){const i=n.name,s=i.length;for(Hr.lastIndex=0;;){const o=Hr.exec(i),r=Hr.lastIndex;let a=o[1];const l=o[2]==="]",c=o[3];if(l&&(a=a|0),c===void 0||c==="["&&r+2===s){oc(e,c===void 0?new im(a,n,t):new sm(a,n,t));break}else{let h=e.map[a];h===void 0&&(h=new om(a),oc(e,h)),e=h}}}class Zo{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const o=t.getActiveUniform(e,s),r=t.getUniformLocation(e,o.name);rm(o,r,this)}}setValue(t,e,i,s){const o=this.map[e];o!==void 0&&o.setValue(t,i,s)}setOptional(t,e,i){const s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let o=0,r=e.length;o!==r;++o){const a=e[o],l=i[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){const i=[];for(let s=0,o=t.length;s!==o;++s){const r=t[s];r.id in e&&i.push(r)}return i}}function rc(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const am=37297;let lm=0;function cm(n,t){const e=n.split(`
`),i=[],s=Math.max(t-6,0),o=Math.min(t+6,e.length);for(let r=s;r<o;r++){const a=r+1;i.push(`${a===t?">":" "} ${a}: ${e[r]}`)}return i.join(`
`)}const ac=new te;function dm(n){he._getMatrix(ac,he.workingColorSpace,n);const t=`mat3( ${ac.elements.map(e=>e.toFixed(4))} )`;switch(he.getTransfer(n)){case cr:return[t,"LinearTransferOETF"];case xe:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function lc(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),s=n.getShaderInfoLog(t).trim();if(i&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const r=parseInt(o[1]);return e.toUpperCase()+`

`+s+`

`+cm(n.getShaderSource(t),r)}else return s}function um(n,t){const e=dm(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function hm(n,t){let e;switch(t){case pu:e="Linear";break;case mu:e="Reinhard";break;case gu:e="Cineon";break;case ar:e="ACESFilmic";break;case _u:e="AgX";break;case Mu:e="Neutral";break;case vu:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Do=new w;function fm(){he.getLuminanceCoefficients(Do);const n=Do.x.toFixed(4),t=Do.y.toFixed(4),e=Do.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function pm(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ys).join(`
`)}function mm(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function gm(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const o=n.getActiveAttrib(t,s),r=o.name;let a=1;o.type===n.FLOAT_MAT2&&(a=2),o.type===n.FLOAT_MAT3&&(a=3),o.type===n.FLOAT_MAT4&&(a=4),e[r]={type:o.type,location:n.getAttribLocation(t,r),locationSize:a}}return e}function Ys(n){return n!==""}function cc(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function dc(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const vm=/^[ \t]*#include +<([\w\d./]+)>/gm;function Wa(n){return n.replace(vm,Mm)}const _m=new Map;function Mm(n,t){let e=ee[t];if(e===void 0){const i=_m.get(t);if(i!==void 0)e=ee[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return Wa(e)}const ym=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function uc(n){return n.replace(ym,xm)}function xm(n,t,e,i){let s="";for(let o=parseInt(t);o<parseInt(e);o++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+o+" ]").replace(/UNROLLED_LOOP_INDEX/g,o);return s}function hc(n){let t=`precision ${n.precision} float;
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
#define LOW_PRECISION`),t}function Sm(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Vc?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===rr?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===qn&&(t="SHADOWMAP_TYPE_VSM"),t}function wm(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case xs:case Ss:t="ENVMAP_TYPE_CUBE";break;case lr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function bm(n){let t="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Ss:t="ENVMAP_MODE_REFRACTION";break}return t}function Em(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Za:t="ENVMAP_BLENDING_MULTIPLY";break;case hu:t="ENVMAP_BLENDING_MIX";break;case fu:t="ENVMAP_BLENDING_ADD";break}return t}function Tm(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:i,maxMip:e}}function Am(n,t,e,i){const s=n.getContext(),o=e.defines;let r=e.vertexShader,a=e.fragmentShader;const l=Sm(e),c=wm(e),d=bm(e),h=Em(e),u=Tm(e),f=pm(e),m=mm(o),v=s.createProgram();let g,p,T=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(Ys).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(Ys).join(`
`),p.length>0&&(p+=`
`)):(g=[hc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+d:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ys).join(`
`),p=[hc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+d:"",e.envMap?"#define "+h:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==_i?"#define TONE_MAPPING":"",e.toneMapping!==_i?ee.tonemapping_pars_fragment:"",e.toneMapping!==_i?hm("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",ee.colorspace_pars_fragment,um("linearToOutputTexel",e.outputColorSpace),fm(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ys).join(`
`)),r=Wa(r),r=cc(r,e),r=dc(r,e),a=Wa(a),a=cc(a,e),a=dc(a,e),r=uc(r),a=uc(a),e.isRawShaderMaterial!==!0&&(T=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",e.glslVersion===bl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===bl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const _=T+g+r,M=T+p+a,F=rc(s,s.VERTEX_SHADER,_),L=rc(s,s.FRAGMENT_SHADER,M);s.attachShader(v,F),s.attachShader(v,L),e.index0AttributeName!==void 0?s.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function D(P){if(n.debug.checkShaderErrors){const O=s.getProgramInfoLog(v).trim(),V=s.getShaderInfoLog(F).trim(),Q=s.getShaderInfoLog(L).trim();let nt=!0,tt=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(nt=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,v,F,L);else{const it=lc(s,F,"vertex"),J=lc(s,L,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+O+`
`+it+`
`+J)}else O!==""?console.warn("THREE.WebGLProgram: Program Info Log:",O):(V===""||Q==="")&&(tt=!1);tt&&(P.diagnostics={runnable:nt,programLog:O,vertexShader:{log:V,prefix:g},fragmentShader:{log:Q,prefix:p}})}s.deleteShader(F),s.deleteShader(L),I=new Zo(s,v),y=gm(s,v)}let I;this.getUniforms=function(){return I===void 0&&D(this),I};let y;this.getAttributes=function(){return y===void 0&&D(this),y};let x=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=s.getProgramParameter(v,am)),x},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=lm++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=F,this.fragmentShader=L,this}let Cm=0;class Rm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(e),o=this._getShaderStage(i),r=this._getShaderCacheForMaterial(t);return r.has(s)===!1&&(r.add(s),s.usedTimes++),r.has(o)===!1&&(r.add(o),o.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new Pm(t),e.set(t,i)),i}}class Pm{constructor(t){this.id=Cm++,this.code=t,this.usedTimes=0}}function Lm(n,t,e,i,s,o,r){const a=new sl,l=new Rm,c=new Set,d=[],h=s.logarithmicDepthBuffer,u=s.vertexTextures;let f=s.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(y){return c.add(y),y===0?"uv":`uv${y}`}function g(y,x,P,O,V){const Q=O.fog,nt=V.geometry,tt=y.isMeshStandardMaterial?O.environment:null,it=(y.isMeshStandardMaterial?e:t).get(y.envMap||tt),J=it&&it.mapping===lr?it.image.height:null,ht=m[y.type];y.precision!==null&&(f=s.getMaxPrecision(y.precision),f!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",f,"instead."));const B=nt.morphAttributes.position||nt.morphAttributes.normal||nt.morphAttributes.color,ut=B!==void 0?B.length:0;let gt=0;nt.morphAttributes.position!==void 0&&(gt=1),nt.morphAttributes.normal!==void 0&&(gt=2),nt.morphAttributes.color!==void 0&&(gt=3);let yt,st,mt,Ut;if(ht){const pe=Un[ht];yt=pe.vertexShader,st=pe.fragmentShader}else yt=y.vertexShader,st=y.fragmentShader,l.update(y),mt=l.getVertexShaderID(y),Ut=l.getFragmentShaderID(y);const _t=n.getRenderTarget(),Vt=n.state.buffers.depth.getReversed(),$t=V.isInstancedMesh===!0,Qt=V.isBatchedMesh===!0,Te=!!y.map,le=!!y.matcap,Le=!!it,X=!!y.aoMap,sn=!!y.lightMap,ie=!!y.bumpMap,se=!!y.normalMap,Gt=!!y.displacementMap,Me=!!y.emissiveMap,Ht=!!y.metalnessMap,U=!!y.roughnessMap,b=y.anisotropy>0,$=y.clearcoat>0,ot=y.dispersion>0,ct=y.iridescence>0,rt=y.sheen>0,kt=y.transmission>0,Tt=b&&!!y.anisotropyMap,Lt=$&&!!y.clearcoatMap,oe=$&&!!y.clearcoatNormalMap,ft=$&&!!y.clearcoatRoughnessMap,It=ct&&!!y.iridescenceMap,Wt=ct&&!!y.iridescenceThicknessMap,Bt=rt&&!!y.sheenColorMap,Pt=rt&&!!y.sheenRoughnessMap,ae=!!y.specularMap,Jt=!!y.specularColorMap,Ee=!!y.specularIntensityMap,k=kt&&!!y.transmissionMap,xt=kt&&!!y.thicknessMap,et=!!y.gradientMap,at=!!y.alphaMap,At=y.alphaTest>0,St=!!y.alphaHash,Zt=!!y.extensions;let Ie=_i;y.toneMapped&&(_t===null||_t.isXRRenderTarget===!0)&&(Ie=n.toneMapping);const Ue={shaderID:ht,shaderType:y.type,shaderName:y.name,vertexShader:yt,fragmentShader:st,defines:y.defines,customVertexShaderID:mt,customFragmentShaderID:Ut,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:f,batching:Qt,batchingColor:Qt&&V._colorsTexture!==null,instancing:$t,instancingColor:$t&&V.instanceColor!==null,instancingMorph:$t&&V.morphTexture!==null,supportsVertexTextures:u,outputColorSpace:_t===null?n.outputColorSpace:_t.isXRRenderTarget===!0?_t.texture.colorSpace:Cs,alphaToCoverage:!!y.alphaToCoverage,map:Te,matcap:le,envMap:Le,envMapMode:Le&&it.mapping,envMapCubeUVHeight:J,aoMap:X,lightMap:sn,bumpMap:ie,normalMap:se,displacementMap:u&&Gt,emissiveMap:Me,normalMapObjectSpace:se&&y.normalMapType===wu,normalMapTangentSpace:se&&y.normalMapType===nl,metalnessMap:Ht,roughnessMap:U,anisotropy:b,anisotropyMap:Tt,clearcoat:$,clearcoatMap:Lt,clearcoatNormalMap:oe,clearcoatRoughnessMap:ft,dispersion:ot,iridescence:ct,iridescenceMap:It,iridescenceThicknessMap:Wt,sheen:rt,sheenColorMap:Bt,sheenRoughnessMap:Pt,specularMap:ae,specularColorMap:Jt,specularIntensityMap:Ee,transmission:kt,transmissionMap:k,thicknessMap:xt,gradientMap:et,opaque:y.transparent===!1&&y.blending===Bi&&y.alphaToCoverage===!1,alphaMap:at,alphaTest:At,alphaHash:St,combine:y.combine,mapUv:Te&&v(y.map.channel),aoMapUv:X&&v(y.aoMap.channel),lightMapUv:sn&&v(y.lightMap.channel),bumpMapUv:ie&&v(y.bumpMap.channel),normalMapUv:se&&v(y.normalMap.channel),displacementMapUv:Gt&&v(y.displacementMap.channel),emissiveMapUv:Me&&v(y.emissiveMap.channel),metalnessMapUv:Ht&&v(y.metalnessMap.channel),roughnessMapUv:U&&v(y.roughnessMap.channel),anisotropyMapUv:Tt&&v(y.anisotropyMap.channel),clearcoatMapUv:Lt&&v(y.clearcoatMap.channel),clearcoatNormalMapUv:oe&&v(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ft&&v(y.clearcoatRoughnessMap.channel),iridescenceMapUv:It&&v(y.iridescenceMap.channel),iridescenceThicknessMapUv:Wt&&v(y.iridescenceThicknessMap.channel),sheenColorMapUv:Bt&&v(y.sheenColorMap.channel),sheenRoughnessMapUv:Pt&&v(y.sheenRoughnessMap.channel),specularMapUv:ae&&v(y.specularMap.channel),specularColorMapUv:Jt&&v(y.specularColorMap.channel),specularIntensityMapUv:Ee&&v(y.specularIntensityMap.channel),transmissionMapUv:k&&v(y.transmissionMap.channel),thicknessMapUv:xt&&v(y.thicknessMap.channel),alphaMapUv:at&&v(y.alphaMap.channel),vertexTangents:!!nt.attributes.tangent&&(se||b),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!nt.attributes.color&&nt.attributes.color.itemSize===4,pointsUvs:V.isPoints===!0&&!!nt.attributes.uv&&(Te||at),fog:!!Q,useFog:y.fog===!0,fogExp2:!!Q&&Q.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:Vt,skinning:V.isSkinnedMesh===!0,morphTargets:nt.morphAttributes.position!==void 0,morphNormals:nt.morphAttributes.normal!==void 0,morphColors:nt.morphAttributes.color!==void 0,morphTargetsCount:ut,morphTextureStride:gt,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:y.dithering,shadowMapEnabled:n.shadowMap.enabled&&P.length>0,shadowMapType:n.shadowMap.type,toneMapping:Ie,decodeVideoTexture:Te&&y.map.isVideoTexture===!0&&he.getTransfer(y.map.colorSpace)===xe,decodeVideoTextureEmissive:Me&&y.emissiveMap.isVideoTexture===!0&&he.getTransfer(y.emissiveMap.colorSpace)===xe,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===ze,flipSided:y.side===en,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:Zt&&y.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Zt&&y.extensions.multiDraw===!0||Qt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Ue.vertexUv1s=c.has(1),Ue.vertexUv2s=c.has(2),Ue.vertexUv3s=c.has(3),c.clear(),Ue}function p(y){const x=[];if(y.shaderID?x.push(y.shaderID):(x.push(y.customVertexShaderID),x.push(y.customFragmentShaderID)),y.defines!==void 0)for(const P in y.defines)x.push(P),x.push(y.defines[P]);return y.isRawShaderMaterial===!1&&(T(x,y),_(x,y),x.push(n.outputColorSpace)),x.push(y.customProgramCacheKey),x.join()}function T(y,x){y.push(x.precision),y.push(x.outputColorSpace),y.push(x.envMapMode),y.push(x.envMapCubeUVHeight),y.push(x.mapUv),y.push(x.alphaMapUv),y.push(x.lightMapUv),y.push(x.aoMapUv),y.push(x.bumpMapUv),y.push(x.normalMapUv),y.push(x.displacementMapUv),y.push(x.emissiveMapUv),y.push(x.metalnessMapUv),y.push(x.roughnessMapUv),y.push(x.anisotropyMapUv),y.push(x.clearcoatMapUv),y.push(x.clearcoatNormalMapUv),y.push(x.clearcoatRoughnessMapUv),y.push(x.iridescenceMapUv),y.push(x.iridescenceThicknessMapUv),y.push(x.sheenColorMapUv),y.push(x.sheenRoughnessMapUv),y.push(x.specularMapUv),y.push(x.specularColorMapUv),y.push(x.specularIntensityMapUv),y.push(x.transmissionMapUv),y.push(x.thicknessMapUv),y.push(x.combine),y.push(x.fogExp2),y.push(x.sizeAttenuation),y.push(x.morphTargetsCount),y.push(x.morphAttributeCount),y.push(x.numDirLights),y.push(x.numPointLights),y.push(x.numSpotLights),y.push(x.numSpotLightMaps),y.push(x.numHemiLights),y.push(x.numRectAreaLights),y.push(x.numDirLightShadows),y.push(x.numPointLightShadows),y.push(x.numSpotLightShadows),y.push(x.numSpotLightShadowsWithMaps),y.push(x.numLightProbes),y.push(x.shadowMapType),y.push(x.toneMapping),y.push(x.numClippingPlanes),y.push(x.numClipIntersection),y.push(x.depthPacking)}function _(y,x){a.disableAll(),x.supportsVertexTextures&&a.enable(0),x.instancing&&a.enable(1),x.instancingColor&&a.enable(2),x.instancingMorph&&a.enable(3),x.matcap&&a.enable(4),x.envMap&&a.enable(5),x.normalMapObjectSpace&&a.enable(6),x.normalMapTangentSpace&&a.enable(7),x.clearcoat&&a.enable(8),x.iridescence&&a.enable(9),x.alphaTest&&a.enable(10),x.vertexColors&&a.enable(11),x.vertexAlphas&&a.enable(12),x.vertexUv1s&&a.enable(13),x.vertexUv2s&&a.enable(14),x.vertexUv3s&&a.enable(15),x.vertexTangents&&a.enable(16),x.anisotropy&&a.enable(17),x.alphaHash&&a.enable(18),x.batching&&a.enable(19),x.dispersion&&a.enable(20),x.batchingColor&&a.enable(21),y.push(a.mask),a.disableAll(),x.fog&&a.enable(0),x.useFog&&a.enable(1),x.flatShading&&a.enable(2),x.logarithmicDepthBuffer&&a.enable(3),x.reverseDepthBuffer&&a.enable(4),x.skinning&&a.enable(5),x.morphTargets&&a.enable(6),x.morphNormals&&a.enable(7),x.morphColors&&a.enable(8),x.premultipliedAlpha&&a.enable(9),x.shadowMapEnabled&&a.enable(10),x.doubleSided&&a.enable(11),x.flipSided&&a.enable(12),x.useDepthPacking&&a.enable(13),x.dithering&&a.enable(14),x.transmission&&a.enable(15),x.sheen&&a.enable(16),x.opaque&&a.enable(17),x.pointsUvs&&a.enable(18),x.decodeVideoTexture&&a.enable(19),x.decodeVideoTextureEmissive&&a.enable(20),x.alphaToCoverage&&a.enable(21),y.push(a.mask)}function M(y){const x=m[y.type];let P;if(x){const O=Un[x];P=fh.clone(O.uniforms)}else P=y.uniforms;return P}function F(y,x){let P;for(let O=0,V=d.length;O<V;O++){const Q=d[O];if(Q.cacheKey===x){P=Q,++P.usedTimes;break}}return P===void 0&&(P=new Am(n,x,y,o),d.push(P)),P}function L(y){if(--y.usedTimes===0){const x=d.indexOf(y);d[x]=d[d.length-1],d.pop(),y.destroy()}}function D(y){l.remove(y)}function I(){l.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:M,acquireProgram:F,releaseProgram:L,releaseShaderCache:D,programs:d,dispose:I}}function Im(){let n=new WeakMap;function t(r){return n.has(r)}function e(r){let a=n.get(r);return a===void 0&&(a={},n.set(r,a)),a}function i(r){n.delete(r)}function s(r,a,l){n.get(r)[a]=l}function o(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:o}}function Dm(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function fc(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function pc(){const n=[];let t=0;const e=[],i=[],s=[];function o(){t=0,e.length=0,i.length=0,s.length=0}function r(h,u,f,m,v,g){let p=n[t];return p===void 0?(p={id:h.id,object:h,geometry:u,material:f,groupOrder:m,renderOrder:h.renderOrder,z:v,group:g},n[t]=p):(p.id=h.id,p.object=h,p.geometry=u,p.material=f,p.groupOrder=m,p.renderOrder=h.renderOrder,p.z=v,p.group=g),t++,p}function a(h,u,f,m,v,g){const p=r(h,u,f,m,v,g);f.transmission>0?i.push(p):f.transparent===!0?s.push(p):e.push(p)}function l(h,u,f,m,v,g){const p=r(h,u,f,m,v,g);f.transmission>0?i.unshift(p):f.transparent===!0?s.unshift(p):e.unshift(p)}function c(h,u){e.length>1&&e.sort(h||Dm),i.length>1&&i.sort(u||fc),s.length>1&&s.sort(u||fc)}function d(){for(let h=t,u=n.length;h<u;h++){const f=n[h];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:i,transparent:s,init:o,push:a,unshift:l,finish:d,sort:c}}function Um(){let n=new WeakMap;function t(i,s){const o=n.get(i);let r;return o===void 0?(r=new pc,n.set(i,[r])):s>=o.length?(r=new pc,o.push(r)):r=o[s],r}function e(){n=new WeakMap}return{get:t,dispose:e}}function Nm(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new w,color:new vt};break;case"SpotLight":e={position:new w,direction:new w,color:new vt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new w,color:new vt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new w,skyColor:new vt,groundColor:new vt};break;case"RectAreaLight":e={color:new vt,position:new w,halfWidth:new w,halfHeight:new w};break}return n[t.id]=e,e}}}function zm(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Dt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Dt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Dt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let Fm=0;function Om(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function Bm(n){const t=new Nm,e=zm(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new w);const s=new w,o=new be,r=new be;function a(c){let d=0,h=0,u=0;for(let y=0;y<9;y++)i.probe[y].set(0,0,0);let f=0,m=0,v=0,g=0,p=0,T=0,_=0,M=0,F=0,L=0,D=0;c.sort(Om);for(let y=0,x=c.length;y<x;y++){const P=c[y],O=P.color,V=P.intensity,Q=P.distance,nt=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)d+=O.r*V,h+=O.g*V,u+=O.b*V;else if(P.isLightProbe){for(let tt=0;tt<9;tt++)i.probe[tt].addScaledVector(P.sh.coefficients[tt],V);D++}else if(P.isDirectionalLight){const tt=t.get(P);if(tt.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const it=P.shadow,J=e.get(P);J.shadowIntensity=it.intensity,J.shadowBias=it.bias,J.shadowNormalBias=it.normalBias,J.shadowRadius=it.radius,J.shadowMapSize=it.mapSize,i.directionalShadow[f]=J,i.directionalShadowMap[f]=nt,i.directionalShadowMatrix[f]=P.shadow.matrix,T++}i.directional[f]=tt,f++}else if(P.isSpotLight){const tt=t.get(P);tt.position.setFromMatrixPosition(P.matrixWorld),tt.color.copy(O).multiplyScalar(V),tt.distance=Q,tt.coneCos=Math.cos(P.angle),tt.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),tt.decay=P.decay,i.spot[v]=tt;const it=P.shadow;if(P.map&&(i.spotLightMap[F]=P.map,F++,it.updateMatrices(P),P.castShadow&&L++),i.spotLightMatrix[v]=it.matrix,P.castShadow){const J=e.get(P);J.shadowIntensity=it.intensity,J.shadowBias=it.bias,J.shadowNormalBias=it.normalBias,J.shadowRadius=it.radius,J.shadowMapSize=it.mapSize,i.spotShadow[v]=J,i.spotShadowMap[v]=nt,M++}v++}else if(P.isRectAreaLight){const tt=t.get(P);tt.color.copy(O).multiplyScalar(V),tt.halfWidth.set(P.width*.5,0,0),tt.halfHeight.set(0,P.height*.5,0),i.rectArea[g]=tt,g++}else if(P.isPointLight){const tt=t.get(P);if(tt.color.copy(P.color).multiplyScalar(P.intensity),tt.distance=P.distance,tt.decay=P.decay,P.castShadow){const it=P.shadow,J=e.get(P);J.shadowIntensity=it.intensity,J.shadowBias=it.bias,J.shadowNormalBias=it.normalBias,J.shadowRadius=it.radius,J.shadowMapSize=it.mapSize,J.shadowCameraNear=it.camera.near,J.shadowCameraFar=it.camera.far,i.pointShadow[m]=J,i.pointShadowMap[m]=nt,i.pointShadowMatrix[m]=P.shadow.matrix,_++}i.point[m]=tt,m++}else if(P.isHemisphereLight){const tt=t.get(P);tt.skyColor.copy(P.color).multiplyScalar(V),tt.groundColor.copy(P.groundColor).multiplyScalar(V),i.hemi[p]=tt,p++}}g>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Mt.LTC_FLOAT_1,i.rectAreaLTC2=Mt.LTC_FLOAT_2):(i.rectAreaLTC1=Mt.LTC_HALF_1,i.rectAreaLTC2=Mt.LTC_HALF_2)),i.ambient[0]=d,i.ambient[1]=h,i.ambient[2]=u;const I=i.hash;(I.directionalLength!==f||I.pointLength!==m||I.spotLength!==v||I.rectAreaLength!==g||I.hemiLength!==p||I.numDirectionalShadows!==T||I.numPointShadows!==_||I.numSpotShadows!==M||I.numSpotMaps!==F||I.numLightProbes!==D)&&(i.directional.length=f,i.spot.length=v,i.rectArea.length=g,i.point.length=m,i.hemi.length=p,i.directionalShadow.length=T,i.directionalShadowMap.length=T,i.pointShadow.length=_,i.pointShadowMap.length=_,i.spotShadow.length=M,i.spotShadowMap.length=M,i.directionalShadowMatrix.length=T,i.pointShadowMatrix.length=_,i.spotLightMatrix.length=M+F-L,i.spotLightMap.length=F,i.numSpotLightShadowsWithMaps=L,i.numLightProbes=D,I.directionalLength=f,I.pointLength=m,I.spotLength=v,I.rectAreaLength=g,I.hemiLength=p,I.numDirectionalShadows=T,I.numPointShadows=_,I.numSpotShadows=M,I.numSpotMaps=F,I.numLightProbes=D,i.version=Fm++)}function l(c,d){let h=0,u=0,f=0,m=0,v=0;const g=d.matrixWorldInverse;for(let p=0,T=c.length;p<T;p++){const _=c[p];if(_.isDirectionalLight){const M=i.directional[h];M.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(g),h++}else if(_.isSpotLight){const M=i.spot[f];M.position.setFromMatrixPosition(_.matrixWorld),M.position.applyMatrix4(g),M.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(g),f++}else if(_.isRectAreaLight){const M=i.rectArea[m];M.position.setFromMatrixPosition(_.matrixWorld),M.position.applyMatrix4(g),r.identity(),o.copy(_.matrixWorld),o.premultiply(g),r.extractRotation(o),M.halfWidth.set(_.width*.5,0,0),M.halfHeight.set(0,_.height*.5,0),M.halfWidth.applyMatrix4(r),M.halfHeight.applyMatrix4(r),m++}else if(_.isPointLight){const M=i.point[u];M.position.setFromMatrixPosition(_.matrixWorld),M.position.applyMatrix4(g),u++}else if(_.isHemisphereLight){const M=i.hemi[v];M.direction.setFromMatrixPosition(_.matrixWorld),M.direction.transformDirection(g),v++}}}return{setup:a,setupView:l,state:i}}function mc(n){const t=new Bm(n),e=[],i=[];function s(d){c.camera=d,e.length=0,i.length=0}function o(d){e.push(d)}function r(d){i.push(d)}function a(){t.setup(e)}function l(d){t.setupView(e,d)}const c={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:o,pushShadow:r}}function km(n){let t=new WeakMap;function e(s,o=0){const r=t.get(s);let a;return r===void 0?(a=new mc(n),t.set(s,[a])):o>=r.length?(a=new mc(n),r.push(a)):a=r[o],a}function i(){t=new WeakMap}return{get:e,dispose:i}}class Gm extends ni{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=xu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Hm extends ni{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Vm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Wm=`uniform sampler2D shadow_pass;
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
}`;function Xm(n,t,e){let i=new ol;const s=new Dt,o=new Dt,r=new Se,a=new Gm({depthPacking:Su}),l=new Hm,c={},d=e.maxTextureSize,h={[Mi]:en,[en]:Mi,[ze]:ze},u=new ei({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Dt},radius:{value:4}},vertexShader:Vm,fragmentShader:Wm}),f=u.clone();f.defines.HORIZONTAL_PASS=1;const m=new Pe;m.setAttribute("position",new Oe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new C(m,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Vc;let p=this.type;this.render=function(L,D,I){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||L.length===0)return;const y=n.getRenderTarget(),x=n.getActiveCubeFace(),P=n.getActiveMipmapLevel(),O=n.state;O.setBlending(vi),O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);const V=p!==qn&&this.type===qn,Q=p===qn&&this.type!==qn;for(let nt=0,tt=L.length;nt<tt;nt++){const it=L[nt],J=it.shadow;if(J===void 0){console.warn("THREE.WebGLShadowMap:",it,"has no shadow.");continue}if(J.autoUpdate===!1&&J.needsUpdate===!1)continue;s.copy(J.mapSize);const ht=J.getFrameExtents();if(s.multiply(ht),o.copy(J.mapSize),(s.x>d||s.y>d)&&(s.x>d&&(o.x=Math.floor(d/ht.x),s.x=o.x*ht.x,J.mapSize.x=o.x),s.y>d&&(o.y=Math.floor(d/ht.y),s.y=o.y*ht.y,J.mapSize.y=o.y)),J.map===null||V===!0||Q===!0){const ut=this.type!==qn?{minFilter:Cn,magFilter:Cn}:{};J.map!==null&&J.map.dispose(),J.map=new Gi(s.x,s.y,ut),J.map.texture.name=it.name+".shadowMap",J.camera.updateProjectionMatrix()}n.setRenderTarget(J.map),n.clear();const B=J.getViewportCount();for(let ut=0;ut<B;ut++){const gt=J.getViewport(ut);r.set(o.x*gt.x,o.y*gt.y,o.x*gt.z,o.y*gt.w),O.viewport(r),J.updateMatrices(it,ut),i=J.getFrustum(),M(D,I,J.camera,it,this.type)}J.isPointLightShadow!==!0&&this.type===qn&&T(J,I),J.needsUpdate=!1}p=this.type,g.needsUpdate=!1,n.setRenderTarget(y,x,P)};function T(L,D){const I=t.update(v);u.defines.VSM_SAMPLES!==L.blurSamples&&(u.defines.VSM_SAMPLES=L.blurSamples,f.defines.VSM_SAMPLES=L.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),L.mapPass===null&&(L.mapPass=new Gi(s.x,s.y)),u.uniforms.shadow_pass.value=L.map.texture,u.uniforms.resolution.value=L.mapSize,u.uniforms.radius.value=L.radius,n.setRenderTarget(L.mapPass),n.clear(),n.renderBufferDirect(D,null,I,u,v,null),f.uniforms.shadow_pass.value=L.mapPass.texture,f.uniforms.resolution.value=L.mapSize,f.uniforms.radius.value=L.radius,n.setRenderTarget(L.map),n.clear(),n.renderBufferDirect(D,null,I,f,v,null)}function _(L,D,I,y){let x=null;const P=I.isPointLight===!0?L.customDistanceMaterial:L.customDepthMaterial;if(P!==void 0)x=P;else if(x=I.isPointLight===!0?l:a,n.localClippingEnabled&&D.clipShadows===!0&&Array.isArray(D.clippingPlanes)&&D.clippingPlanes.length!==0||D.displacementMap&&D.displacementScale!==0||D.alphaMap&&D.alphaTest>0||D.map&&D.alphaTest>0){const O=x.uuid,V=D.uuid;let Q=c[O];Q===void 0&&(Q={},c[O]=Q);let nt=Q[V];nt===void 0&&(nt=x.clone(),Q[V]=nt,D.addEventListener("dispose",F)),x=nt}if(x.visible=D.visible,x.wireframe=D.wireframe,y===qn?x.side=D.shadowSide!==null?D.shadowSide:D.side:x.side=D.shadowSide!==null?D.shadowSide:h[D.side],x.alphaMap=D.alphaMap,x.alphaTest=D.alphaTest,x.map=D.map,x.clipShadows=D.clipShadows,x.clippingPlanes=D.clippingPlanes,x.clipIntersection=D.clipIntersection,x.displacementMap=D.displacementMap,x.displacementScale=D.displacementScale,x.displacementBias=D.displacementBias,x.wireframeLinewidth=D.wireframeLinewidth,x.linewidth=D.linewidth,I.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const O=n.properties.get(x);O.light=I}return x}function M(L,D,I,y,x){if(L.visible===!1)return;if(L.layers.test(D.layers)&&(L.isMesh||L.isLine||L.isPoints)&&(L.castShadow||L.receiveShadow&&x===qn)&&(!L.frustumCulled||i.intersectsObject(L))){L.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,L.matrixWorld);const V=t.update(L),Q=L.material;if(Array.isArray(Q)){const nt=V.groups;for(let tt=0,it=nt.length;tt<it;tt++){const J=nt[tt],ht=Q[J.materialIndex];if(ht&&ht.visible){const B=_(L,ht,y,x);L.onBeforeShadow(n,L,D,I,V,B,J),n.renderBufferDirect(I,null,V,B,L,J),L.onAfterShadow(n,L,D,I,V,B,J)}}}else if(Q.visible){const nt=_(L,Q,y,x);L.onBeforeShadow(n,L,D,I,V,nt,null),n.renderBufferDirect(I,null,V,nt,L,null),L.onAfterShadow(n,L,D,I,V,nt,null)}}const O=L.children;for(let V=0,Q=O.length;V<Q;V++)M(O[V],D,I,y,x)}function F(L){L.target.removeEventListener("dispose",F);for(const I in c){const y=c[I],x=L.target.uuid;x in y&&(y[x].dispose(),delete y[x])}}}const qm={[aa]:la,[ca]:ha,[da]:fa,[ys]:ua,[la]:aa,[ha]:ca,[fa]:da,[ua]:ys};function Ym(n,t){function e(){let k=!1;const xt=new Se;let et=null;const at=new Se(0,0,0,0);return{setMask:function(At){et!==At&&!k&&(n.colorMask(At,At,At,At),et=At)},setLocked:function(At){k=At},setClear:function(At,St,Zt,Ie,Ue){Ue===!0&&(At*=Ie,St*=Ie,Zt*=Ie),xt.set(At,St,Zt,Ie),at.equals(xt)===!1&&(n.clearColor(At,St,Zt,Ie),at.copy(xt))},reset:function(){k=!1,et=null,at.set(-1,0,0,0)}}}function i(){let k=!1,xt=!1,et=null,at=null,At=null;return{setReversed:function(St){if(xt!==St){const Zt=t.get("EXT_clip_control");xt?Zt.clipControlEXT(Zt.LOWER_LEFT_EXT,Zt.ZERO_TO_ONE_EXT):Zt.clipControlEXT(Zt.LOWER_LEFT_EXT,Zt.NEGATIVE_ONE_TO_ONE_EXT);const Ie=At;At=null,this.setClear(Ie)}xt=St},getReversed:function(){return xt},setTest:function(St){St?_t(n.DEPTH_TEST):Vt(n.DEPTH_TEST)},setMask:function(St){et!==St&&!k&&(n.depthMask(St),et=St)},setFunc:function(St){if(xt&&(St=qm[St]),at!==St){switch(St){case aa:n.depthFunc(n.NEVER);break;case la:n.depthFunc(n.ALWAYS);break;case ca:n.depthFunc(n.LESS);break;case ys:n.depthFunc(n.LEQUAL);break;case da:n.depthFunc(n.EQUAL);break;case ua:n.depthFunc(n.GEQUAL);break;case ha:n.depthFunc(n.GREATER);break;case fa:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}at=St}},setLocked:function(St){k=St},setClear:function(St){At!==St&&(xt&&(St=1-St),n.clearDepth(St),At=St)},reset:function(){k=!1,et=null,at=null,At=null,xt=!1}}}function s(){let k=!1,xt=null,et=null,at=null,At=null,St=null,Zt=null,Ie=null,Ue=null;return{setTest:function(pe){k||(pe?_t(n.STENCIL_TEST):Vt(n.STENCIL_TEST))},setMask:function(pe){xt!==pe&&!k&&(n.stencilMask(pe),xt=pe)},setFunc:function(pe,dn,un){(et!==pe||at!==dn||At!==un)&&(n.stencilFunc(pe,dn,un),et=pe,at=dn,At=un)},setOp:function(pe,dn,un){(St!==pe||Zt!==dn||Ie!==un)&&(n.stencilOp(pe,dn,un),St=pe,Zt=dn,Ie=un)},setLocked:function(pe){k=pe},setClear:function(pe){Ue!==pe&&(n.clearStencil(pe),Ue=pe)},reset:function(){k=!1,xt=null,et=null,at=null,At=null,St=null,Zt=null,Ie=null,Ue=null}}}const o=new e,r=new i,a=new s,l=new WeakMap,c=new WeakMap;let d={},h={},u=new WeakMap,f=[],m=null,v=!1,g=null,p=null,T=null,_=null,M=null,F=null,L=null,D=new vt(0,0,0),I=0,y=!1,x=null,P=null,O=null,V=null,Q=null;const nt=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let tt=!1,it=0;const J=n.getParameter(n.VERSION);J.indexOf("WebGL")!==-1?(it=parseFloat(/^WebGL (\d)/.exec(J)[1]),tt=it>=1):J.indexOf("OpenGL ES")!==-1&&(it=parseFloat(/^OpenGL ES (\d)/.exec(J)[1]),tt=it>=2);let ht=null,B={};const ut=n.getParameter(n.SCISSOR_BOX),gt=n.getParameter(n.VIEWPORT),yt=new Se().fromArray(ut),st=new Se().fromArray(gt);function mt(k,xt,et,at){const At=new Uint8Array(4),St=n.createTexture();n.bindTexture(k,St),n.texParameteri(k,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(k,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Zt=0;Zt<et;Zt++)k===n.TEXTURE_3D||k===n.TEXTURE_2D_ARRAY?n.texImage3D(xt,0,n.RGBA,1,1,at,0,n.RGBA,n.UNSIGNED_BYTE,At):n.texImage2D(xt+Zt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,At);return St}const Ut={};Ut[n.TEXTURE_2D]=mt(n.TEXTURE_2D,n.TEXTURE_2D,1),Ut[n.TEXTURE_CUBE_MAP]=mt(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),Ut[n.TEXTURE_2D_ARRAY]=mt(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Ut[n.TEXTURE_3D]=mt(n.TEXTURE_3D,n.TEXTURE_3D,1,1),o.setClear(0,0,0,1),r.setClear(1),a.setClear(0),_t(n.DEPTH_TEST),r.setFunc(ys),ie(!1),se(yl),_t(n.CULL_FACE),X(vi);function _t(k){d[k]!==!0&&(n.enable(k),d[k]=!0)}function Vt(k){d[k]!==!1&&(n.disable(k),d[k]=!1)}function $t(k,xt){return h[k]!==xt?(n.bindFramebuffer(k,xt),h[k]=xt,k===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=xt),k===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=xt),!0):!1}function Qt(k,xt){let et=f,at=!1;if(k){et=u.get(xt),et===void 0&&(et=[],u.set(xt,et));const At=k.textures;if(et.length!==At.length||et[0]!==n.COLOR_ATTACHMENT0){for(let St=0,Zt=At.length;St<Zt;St++)et[St]=n.COLOR_ATTACHMENT0+St;et.length=At.length,at=!0}}else et[0]!==n.BACK&&(et[0]=n.BACK,at=!0);at&&n.drawBuffers(et)}function Te(k){return m!==k?(n.useProgram(k),m=k,!0):!1}const le={[Ni]:n.FUNC_ADD,[Zd]:n.FUNC_SUBTRACT,[Kd]:n.FUNC_REVERSE_SUBTRACT};le[jd]=n.MIN,le[Jd]=n.MAX;const Le={[Qd]:n.ZERO,[tu]:n.ONE,[eu]:n.SRC_COLOR,[oa]:n.SRC_ALPHA,[au]:n.SRC_ALPHA_SATURATE,[ou]:n.DST_COLOR,[iu]:n.DST_ALPHA,[nu]:n.ONE_MINUS_SRC_COLOR,[ra]:n.ONE_MINUS_SRC_ALPHA,[ru]:n.ONE_MINUS_DST_COLOR,[su]:n.ONE_MINUS_DST_ALPHA,[lu]:n.CONSTANT_COLOR,[cu]:n.ONE_MINUS_CONSTANT_COLOR,[du]:n.CONSTANT_ALPHA,[uu]:n.ONE_MINUS_CONSTANT_ALPHA};function X(k,xt,et,at,At,St,Zt,Ie,Ue,pe){if(k===vi){v===!0&&(Vt(n.BLEND),v=!1);return}if(v===!1&&(_t(n.BLEND),v=!0),k!==$d){if(k!==g||pe!==y){if((p!==Ni||M!==Ni)&&(n.blendEquation(n.FUNC_ADD),p=Ni,M=Ni),pe)switch(k){case Bi:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Ze:n.blendFunc(n.ONE,n.ONE);break;case xl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Sl:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}else switch(k){case Bi:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Ze:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case xl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Sl:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}T=null,_=null,F=null,L=null,D.set(0,0,0),I=0,g=k,y=pe}return}At=At||xt,St=St||et,Zt=Zt||at,(xt!==p||At!==M)&&(n.blendEquationSeparate(le[xt],le[At]),p=xt,M=At),(et!==T||at!==_||St!==F||Zt!==L)&&(n.blendFuncSeparate(Le[et],Le[at],Le[St],Le[Zt]),T=et,_=at,F=St,L=Zt),(Ie.equals(D)===!1||Ue!==I)&&(n.blendColor(Ie.r,Ie.g,Ie.b,Ue),D.copy(Ie),I=Ue),g=k,y=!1}function sn(k,xt){k.side===ze?Vt(n.CULL_FACE):_t(n.CULL_FACE);let et=k.side===en;xt&&(et=!et),ie(et),k.blending===Bi&&k.transparent===!1?X(vi):X(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),r.setFunc(k.depthFunc),r.setTest(k.depthTest),r.setMask(k.depthWrite),o.setMask(k.colorWrite);const at=k.stencilWrite;a.setTest(at),at&&(a.setMask(k.stencilWriteMask),a.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),a.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),Me(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?_t(n.SAMPLE_ALPHA_TO_COVERAGE):Vt(n.SAMPLE_ALPHA_TO_COVERAGE)}function ie(k){x!==k&&(k?n.frontFace(n.CW):n.frontFace(n.CCW),x=k)}function se(k){k!==qd?(_t(n.CULL_FACE),k!==P&&(k===yl?n.cullFace(n.BACK):k===Yd?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Vt(n.CULL_FACE),P=k}function Gt(k){k!==O&&(tt&&n.lineWidth(k),O=k)}function Me(k,xt,et){k?(_t(n.POLYGON_OFFSET_FILL),(V!==xt||Q!==et)&&(n.polygonOffset(xt,et),V=xt,Q=et)):Vt(n.POLYGON_OFFSET_FILL)}function Ht(k){k?_t(n.SCISSOR_TEST):Vt(n.SCISSOR_TEST)}function U(k){k===void 0&&(k=n.TEXTURE0+nt-1),ht!==k&&(n.activeTexture(k),ht=k)}function b(k,xt,et){et===void 0&&(ht===null?et=n.TEXTURE0+nt-1:et=ht);let at=B[et];at===void 0&&(at={type:void 0,texture:void 0},B[et]=at),(at.type!==k||at.texture!==xt)&&(ht!==et&&(n.activeTexture(et),ht=et),n.bindTexture(k,xt||Ut[k]),at.type=k,at.texture=xt)}function $(){const k=B[ht];k!==void 0&&k.type!==void 0&&(n.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function ot(){try{n.compressedTexImage2D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function ct(){try{n.compressedTexImage3D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function rt(){try{n.texSubImage2D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function kt(){try{n.texSubImage3D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Tt(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Lt(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function oe(){try{n.texStorage2D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function ft(){try{n.texStorage3D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function It(){try{n.texImage2D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Wt(){try{n.texImage3D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Bt(k){yt.equals(k)===!1&&(n.scissor(k.x,k.y,k.z,k.w),yt.copy(k))}function Pt(k){st.equals(k)===!1&&(n.viewport(k.x,k.y,k.z,k.w),st.copy(k))}function ae(k,xt){let et=c.get(xt);et===void 0&&(et=new WeakMap,c.set(xt,et));let at=et.get(k);at===void 0&&(at=n.getUniformBlockIndex(xt,k.name),et.set(k,at))}function Jt(k,xt){const at=c.get(xt).get(k);l.get(xt)!==at&&(n.uniformBlockBinding(xt,at,k.__bindingPointIndex),l.set(xt,at))}function Ee(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),r.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),d={},ht=null,B={},h={},u=new WeakMap,f=[],m=null,v=!1,g=null,p=null,T=null,_=null,M=null,F=null,L=null,D=new vt(0,0,0),I=0,y=!1,x=null,P=null,O=null,V=null,Q=null,yt.set(0,0,n.canvas.width,n.canvas.height),st.set(0,0,n.canvas.width,n.canvas.height),o.reset(),r.reset(),a.reset()}return{buffers:{color:o,depth:r,stencil:a},enable:_t,disable:Vt,bindFramebuffer:$t,drawBuffers:Qt,useProgram:Te,setBlending:X,setMaterial:sn,setFlipSided:ie,setCullFace:se,setLineWidth:Gt,setPolygonOffset:Me,setScissorTest:Ht,activeTexture:U,bindTexture:b,unbindTexture:$,compressedTexImage2D:ot,compressedTexImage3D:ct,texImage2D:It,texImage3D:Wt,updateUBOMapping:ae,uniformBlockBinding:Jt,texStorage2D:oe,texStorage3D:ft,texSubImage2D:rt,texSubImage3D:kt,compressedTexSubImage2D:Tt,compressedTexSubImage3D:Lt,scissor:Bt,viewport:Pt,reset:Ee}}function gc(n,t,e,i){const s=$m(i);switch(e){case $c:return n*t;case Kc:return n*t;case jc:return n*t*2;case Jc:return n*t/s.components*s.byteLength;case Qa:return n*t/s.components*s.byteLength;case Qc:return n*t*2/s.components*s.byteLength;case tl:return n*t*2/s.components*s.byteLength;case Zc:return n*t*3/s.components*s.byteLength;case An:return n*t*4/s.components*s.byteLength;case el:return n*t*4/s.components*s.byteLength;case Wo:case Xo:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case qo:case Yo:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case _a:case ya:return Math.max(n,16)*Math.max(t,8)/4;case va:case Ma:return Math.max(n,8)*Math.max(t,8)/2;case xa:case Sa:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case wa:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case ba:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Ea:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case Ta:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case Aa:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case Ca:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case Ra:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case Pa:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case La:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case Ia:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case Da:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case Ua:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case Na:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case za:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case Fa:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case $o:case Oa:case Ba:return Math.ceil(n/4)*Math.ceil(t/4)*16;case td:case ka:return Math.ceil(n/4)*Math.ceil(t/4)*8;case Ga:case Ha:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function $m(n){switch(n){case ti:case Xc:return{byteLength:1,components:1};case eo:case qc:case so:return{byteLength:2,components:1};case ja:case Ja:return{byteLength:2,components:4};case ki:case Ka:case Zn:return{byteLength:4,components:1};case Yc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function Zm(n,t,e,i,s,o,r){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Dt,d=new WeakMap;let h;const u=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(U,b){return f?new OffscreenCanvas(U,b):Jo("canvas")}function v(U,b,$){let ot=1;const ct=Ht(U);if((ct.width>$||ct.height>$)&&(ot=$/Math.max(ct.width,ct.height)),ot<1)if(typeof HTMLImageElement<"u"&&U instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&U instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&U instanceof ImageBitmap||typeof VideoFrame<"u"&&U instanceof VideoFrame){const rt=Math.floor(ot*ct.width),kt=Math.floor(ot*ct.height);h===void 0&&(h=m(rt,kt));const Tt=b?m(rt,kt):h;return Tt.width=rt,Tt.height=kt,Tt.getContext("2d").drawImage(U,0,0,rt,kt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ct.width+"x"+ct.height+") to ("+rt+"x"+kt+")."),Tt}else return"data"in U&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ct.width+"x"+ct.height+")."),U;return U}function g(U){return U.generateMipmaps}function p(U){n.generateMipmap(U)}function T(U){return U.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:U.isWebGL3DRenderTarget?n.TEXTURE_3D:U.isWebGLArrayRenderTarget||U.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function _(U,b,$,ot,ct=!1){if(U!==null){if(n[U]!==void 0)return n[U];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+U+"'")}let rt=b;if(b===n.RED&&($===n.FLOAT&&(rt=n.R32F),$===n.HALF_FLOAT&&(rt=n.R16F),$===n.UNSIGNED_BYTE&&(rt=n.R8)),b===n.RED_INTEGER&&($===n.UNSIGNED_BYTE&&(rt=n.R8UI),$===n.UNSIGNED_SHORT&&(rt=n.R16UI),$===n.UNSIGNED_INT&&(rt=n.R32UI),$===n.BYTE&&(rt=n.R8I),$===n.SHORT&&(rt=n.R16I),$===n.INT&&(rt=n.R32I)),b===n.RG&&($===n.FLOAT&&(rt=n.RG32F),$===n.HALF_FLOAT&&(rt=n.RG16F),$===n.UNSIGNED_BYTE&&(rt=n.RG8)),b===n.RG_INTEGER&&($===n.UNSIGNED_BYTE&&(rt=n.RG8UI),$===n.UNSIGNED_SHORT&&(rt=n.RG16UI),$===n.UNSIGNED_INT&&(rt=n.RG32UI),$===n.BYTE&&(rt=n.RG8I),$===n.SHORT&&(rt=n.RG16I),$===n.INT&&(rt=n.RG32I)),b===n.RGB_INTEGER&&($===n.UNSIGNED_BYTE&&(rt=n.RGB8UI),$===n.UNSIGNED_SHORT&&(rt=n.RGB16UI),$===n.UNSIGNED_INT&&(rt=n.RGB32UI),$===n.BYTE&&(rt=n.RGB8I),$===n.SHORT&&(rt=n.RGB16I),$===n.INT&&(rt=n.RGB32I)),b===n.RGBA_INTEGER&&($===n.UNSIGNED_BYTE&&(rt=n.RGBA8UI),$===n.UNSIGNED_SHORT&&(rt=n.RGBA16UI),$===n.UNSIGNED_INT&&(rt=n.RGBA32UI),$===n.BYTE&&(rt=n.RGBA8I),$===n.SHORT&&(rt=n.RGBA16I),$===n.INT&&(rt=n.RGBA32I)),b===n.RGB&&$===n.UNSIGNED_INT_5_9_9_9_REV&&(rt=n.RGB9_E5),b===n.RGBA){const kt=ct?cr:he.getTransfer(ot);$===n.FLOAT&&(rt=n.RGBA32F),$===n.HALF_FLOAT&&(rt=n.RGBA16F),$===n.UNSIGNED_BYTE&&(rt=kt===xe?n.SRGB8_ALPHA8:n.RGBA8),$===n.UNSIGNED_SHORT_4_4_4_4&&(rt=n.RGBA4),$===n.UNSIGNED_SHORT_5_5_5_1&&(rt=n.RGB5_A1)}return(rt===n.R16F||rt===n.R32F||rt===n.RG16F||rt===n.RG32F||rt===n.RGBA16F||rt===n.RGBA32F)&&t.get("EXT_color_buffer_float"),rt}function M(U,b){let $;return U?b===null||b===ki||b===ws?$=n.DEPTH24_STENCIL8:b===Zn?$=n.DEPTH32F_STENCIL8:b===eo&&($=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===ki||b===ws?$=n.DEPTH_COMPONENT24:b===Zn?$=n.DEPTH_COMPONENT32F:b===eo&&($=n.DEPTH_COMPONENT16),$}function F(U,b){return g(U)===!0||U.isFramebufferTexture&&U.minFilter!==Cn&&U.minFilter!==Nn?Math.log2(Math.max(b.width,b.height))+1:U.mipmaps!==void 0&&U.mipmaps.length>0?U.mipmaps.length:U.isCompressedTexture&&Array.isArray(U.image)?b.mipmaps.length:1}function L(U){const b=U.target;b.removeEventListener("dispose",L),I(b),b.isVideoTexture&&d.delete(b)}function D(U){const b=U.target;b.removeEventListener("dispose",D),x(b)}function I(U){const b=i.get(U);if(b.__webglInit===void 0)return;const $=U.source,ot=u.get($);if(ot){const ct=ot[b.__cacheKey];ct.usedTimes--,ct.usedTimes===0&&y(U),Object.keys(ot).length===0&&u.delete($)}i.remove(U)}function y(U){const b=i.get(U);n.deleteTexture(b.__webglTexture);const $=U.source,ot=u.get($);delete ot[b.__cacheKey],r.memory.textures--}function x(U){const b=i.get(U);if(U.depthTexture&&(U.depthTexture.dispose(),i.remove(U.depthTexture)),U.isWebGLCubeRenderTarget)for(let ot=0;ot<6;ot++){if(Array.isArray(b.__webglFramebuffer[ot]))for(let ct=0;ct<b.__webglFramebuffer[ot].length;ct++)n.deleteFramebuffer(b.__webglFramebuffer[ot][ct]);else n.deleteFramebuffer(b.__webglFramebuffer[ot]);b.__webglDepthbuffer&&n.deleteRenderbuffer(b.__webglDepthbuffer[ot])}else{if(Array.isArray(b.__webglFramebuffer))for(let ot=0;ot<b.__webglFramebuffer.length;ot++)n.deleteFramebuffer(b.__webglFramebuffer[ot]);else n.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&n.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&n.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let ot=0;ot<b.__webglColorRenderbuffer.length;ot++)b.__webglColorRenderbuffer[ot]&&n.deleteRenderbuffer(b.__webglColorRenderbuffer[ot]);b.__webglDepthRenderbuffer&&n.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const $=U.textures;for(let ot=0,ct=$.length;ot<ct;ot++){const rt=i.get($[ot]);rt.__webglTexture&&(n.deleteTexture(rt.__webglTexture),r.memory.textures--),i.remove($[ot])}i.remove(U)}let P=0;function O(){P=0}function V(){const U=P;return U>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+U+" texture units while this GPU supports only "+s.maxTextures),P+=1,U}function Q(U){const b=[];return b.push(U.wrapS),b.push(U.wrapT),b.push(U.wrapR||0),b.push(U.magFilter),b.push(U.minFilter),b.push(U.anisotropy),b.push(U.internalFormat),b.push(U.format),b.push(U.type),b.push(U.generateMipmaps),b.push(U.premultiplyAlpha),b.push(U.flipY),b.push(U.unpackAlignment),b.push(U.colorSpace),b.join()}function nt(U,b){const $=i.get(U);if(U.isVideoTexture&&Gt(U),U.isRenderTargetTexture===!1&&U.version>0&&$.__version!==U.version){const ot=U.image;if(ot===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ot.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{st($,U,b);return}}e.bindTexture(n.TEXTURE_2D,$.__webglTexture,n.TEXTURE0+b)}function tt(U,b){const $=i.get(U);if(U.version>0&&$.__version!==U.version){st($,U,b);return}e.bindTexture(n.TEXTURE_2D_ARRAY,$.__webglTexture,n.TEXTURE0+b)}function it(U,b){const $=i.get(U);if(U.version>0&&$.__version!==U.version){st($,U,b);return}e.bindTexture(n.TEXTURE_3D,$.__webglTexture,n.TEXTURE0+b)}function J(U,b){const $=i.get(U);if(U.version>0&&$.__version!==U.version){mt($,U,b);return}e.bindTexture(n.TEXTURE_CUBE_MAP,$.__webglTexture,n.TEXTURE0+b)}const ht={[yi]:n.REPEAT,[Fi]:n.CLAMP_TO_EDGE,[ga]:n.MIRRORED_REPEAT},B={[Cn]:n.NEAREST,[yu]:n.NEAREST_MIPMAP_NEAREST,[fo]:n.NEAREST_MIPMAP_LINEAR,[Nn]:n.LINEAR,[gr]:n.LINEAR_MIPMAP_NEAREST,[Oi]:n.LINEAR_MIPMAP_LINEAR},ut={[bu]:n.NEVER,[Pu]:n.ALWAYS,[Eu]:n.LESS,[ed]:n.LEQUAL,[Tu]:n.EQUAL,[Ru]:n.GEQUAL,[Au]:n.GREATER,[Cu]:n.NOTEQUAL};function gt(U,b){if(b.type===Zn&&t.has("OES_texture_float_linear")===!1&&(b.magFilter===Nn||b.magFilter===gr||b.magFilter===fo||b.magFilter===Oi||b.minFilter===Nn||b.minFilter===gr||b.minFilter===fo||b.minFilter===Oi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(U,n.TEXTURE_WRAP_S,ht[b.wrapS]),n.texParameteri(U,n.TEXTURE_WRAP_T,ht[b.wrapT]),(U===n.TEXTURE_3D||U===n.TEXTURE_2D_ARRAY)&&n.texParameteri(U,n.TEXTURE_WRAP_R,ht[b.wrapR]),n.texParameteri(U,n.TEXTURE_MAG_FILTER,B[b.magFilter]),n.texParameteri(U,n.TEXTURE_MIN_FILTER,B[b.minFilter]),b.compareFunction&&(n.texParameteri(U,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(U,n.TEXTURE_COMPARE_FUNC,ut[b.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===Cn||b.minFilter!==fo&&b.minFilter!==Oi||b.type===Zn&&t.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||i.get(b).__currentAnisotropy){const $=t.get("EXT_texture_filter_anisotropic");n.texParameterf(U,$.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,s.getMaxAnisotropy())),i.get(b).__currentAnisotropy=b.anisotropy}}}function yt(U,b){let $=!1;U.__webglInit===void 0&&(U.__webglInit=!0,b.addEventListener("dispose",L));const ot=b.source;let ct=u.get(ot);ct===void 0&&(ct={},u.set(ot,ct));const rt=Q(b);if(rt!==U.__cacheKey){ct[rt]===void 0&&(ct[rt]={texture:n.createTexture(),usedTimes:0},r.memory.textures++,$=!0),ct[rt].usedTimes++;const kt=ct[U.__cacheKey];kt!==void 0&&(ct[U.__cacheKey].usedTimes--,kt.usedTimes===0&&y(b)),U.__cacheKey=rt,U.__webglTexture=ct[rt].texture}return $}function st(U,b,$){let ot=n.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(ot=n.TEXTURE_2D_ARRAY),b.isData3DTexture&&(ot=n.TEXTURE_3D);const ct=yt(U,b),rt=b.source;e.bindTexture(ot,U.__webglTexture,n.TEXTURE0+$);const kt=i.get(rt);if(rt.version!==kt.__version||ct===!0){e.activeTexture(n.TEXTURE0+$);const Tt=he.getPrimaries(he.workingColorSpace),Lt=b.colorSpace===pi?null:he.getPrimaries(b.colorSpace),oe=b.colorSpace===pi||Tt===Lt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,b.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,b.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,oe);let ft=v(b.image,!1,s.maxTextureSize);ft=Me(b,ft);const It=o.convert(b.format,b.colorSpace),Wt=o.convert(b.type);let Bt=_(b.internalFormat,It,Wt,b.colorSpace,b.isVideoTexture);gt(ot,b);let Pt;const ae=b.mipmaps,Jt=b.isVideoTexture!==!0,Ee=kt.__version===void 0||ct===!0,k=rt.dataReady,xt=F(b,ft);if(b.isDepthTexture)Bt=M(b.format===bs,b.type),Ee&&(Jt?e.texStorage2D(n.TEXTURE_2D,1,Bt,ft.width,ft.height):e.texImage2D(n.TEXTURE_2D,0,Bt,ft.width,ft.height,0,It,Wt,null));else if(b.isDataTexture)if(ae.length>0){Jt&&Ee&&e.texStorage2D(n.TEXTURE_2D,xt,Bt,ae[0].width,ae[0].height);for(let et=0,at=ae.length;et<at;et++)Pt=ae[et],Jt?k&&e.texSubImage2D(n.TEXTURE_2D,et,0,0,Pt.width,Pt.height,It,Wt,Pt.data):e.texImage2D(n.TEXTURE_2D,et,Bt,Pt.width,Pt.height,0,It,Wt,Pt.data);b.generateMipmaps=!1}else Jt?(Ee&&e.texStorage2D(n.TEXTURE_2D,xt,Bt,ft.width,ft.height),k&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,ft.width,ft.height,It,Wt,ft.data)):e.texImage2D(n.TEXTURE_2D,0,Bt,ft.width,ft.height,0,It,Wt,ft.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){Jt&&Ee&&e.texStorage3D(n.TEXTURE_2D_ARRAY,xt,Bt,ae[0].width,ae[0].height,ft.depth);for(let et=0,at=ae.length;et<at;et++)if(Pt=ae[et],b.format!==An)if(It!==null)if(Jt){if(k)if(b.layerUpdates.size>0){const At=gc(Pt.width,Pt.height,b.format,b.type);for(const St of b.layerUpdates){const Zt=Pt.data.subarray(St*At/Pt.data.BYTES_PER_ELEMENT,(St+1)*At/Pt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,et,0,0,St,Pt.width,Pt.height,1,It,Zt)}b.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,et,0,0,0,Pt.width,Pt.height,ft.depth,It,Pt.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,et,Bt,Pt.width,Pt.height,ft.depth,0,Pt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Jt?k&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,et,0,0,0,Pt.width,Pt.height,ft.depth,It,Wt,Pt.data):e.texImage3D(n.TEXTURE_2D_ARRAY,et,Bt,Pt.width,Pt.height,ft.depth,0,It,Wt,Pt.data)}else{Jt&&Ee&&e.texStorage2D(n.TEXTURE_2D,xt,Bt,ae[0].width,ae[0].height);for(let et=0,at=ae.length;et<at;et++)Pt=ae[et],b.format!==An?It!==null?Jt?k&&e.compressedTexSubImage2D(n.TEXTURE_2D,et,0,0,Pt.width,Pt.height,It,Pt.data):e.compressedTexImage2D(n.TEXTURE_2D,et,Bt,Pt.width,Pt.height,0,Pt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Jt?k&&e.texSubImage2D(n.TEXTURE_2D,et,0,0,Pt.width,Pt.height,It,Wt,Pt.data):e.texImage2D(n.TEXTURE_2D,et,Bt,Pt.width,Pt.height,0,It,Wt,Pt.data)}else if(b.isDataArrayTexture)if(Jt){if(Ee&&e.texStorage3D(n.TEXTURE_2D_ARRAY,xt,Bt,ft.width,ft.height,ft.depth),k)if(b.layerUpdates.size>0){const et=gc(ft.width,ft.height,b.format,b.type);for(const at of b.layerUpdates){const At=ft.data.subarray(at*et/ft.data.BYTES_PER_ELEMENT,(at+1)*et/ft.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,at,ft.width,ft.height,1,It,Wt,At)}b.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ft.width,ft.height,ft.depth,It,Wt,ft.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,Bt,ft.width,ft.height,ft.depth,0,It,Wt,ft.data);else if(b.isData3DTexture)Jt?(Ee&&e.texStorage3D(n.TEXTURE_3D,xt,Bt,ft.width,ft.height,ft.depth),k&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ft.width,ft.height,ft.depth,It,Wt,ft.data)):e.texImage3D(n.TEXTURE_3D,0,Bt,ft.width,ft.height,ft.depth,0,It,Wt,ft.data);else if(b.isFramebufferTexture){if(Ee)if(Jt)e.texStorage2D(n.TEXTURE_2D,xt,Bt,ft.width,ft.height);else{let et=ft.width,at=ft.height;for(let At=0;At<xt;At++)e.texImage2D(n.TEXTURE_2D,At,Bt,et,at,0,It,Wt,null),et>>=1,at>>=1}}else if(ae.length>0){if(Jt&&Ee){const et=Ht(ae[0]);e.texStorage2D(n.TEXTURE_2D,xt,Bt,et.width,et.height)}for(let et=0,at=ae.length;et<at;et++)Pt=ae[et],Jt?k&&e.texSubImage2D(n.TEXTURE_2D,et,0,0,It,Wt,Pt):e.texImage2D(n.TEXTURE_2D,et,Bt,It,Wt,Pt);b.generateMipmaps=!1}else if(Jt){if(Ee){const et=Ht(ft);e.texStorage2D(n.TEXTURE_2D,xt,Bt,et.width,et.height)}k&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,It,Wt,ft)}else e.texImage2D(n.TEXTURE_2D,0,Bt,It,Wt,ft);g(b)&&p(ot),kt.__version=rt.version,b.onUpdate&&b.onUpdate(b)}U.__version=b.version}function mt(U,b,$){if(b.image.length!==6)return;const ot=yt(U,b),ct=b.source;e.bindTexture(n.TEXTURE_CUBE_MAP,U.__webglTexture,n.TEXTURE0+$);const rt=i.get(ct);if(ct.version!==rt.__version||ot===!0){e.activeTexture(n.TEXTURE0+$);const kt=he.getPrimaries(he.workingColorSpace),Tt=b.colorSpace===pi?null:he.getPrimaries(b.colorSpace),Lt=b.colorSpace===pi||kt===Tt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,b.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,b.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Lt);const oe=b.isCompressedTexture||b.image[0].isCompressedTexture,ft=b.image[0]&&b.image[0].isDataTexture,It=[];for(let at=0;at<6;at++)!oe&&!ft?It[at]=v(b.image[at],!0,s.maxCubemapSize):It[at]=ft?b.image[at].image:b.image[at],It[at]=Me(b,It[at]);const Wt=It[0],Bt=o.convert(b.format,b.colorSpace),Pt=o.convert(b.type),ae=_(b.internalFormat,Bt,Pt,b.colorSpace),Jt=b.isVideoTexture!==!0,Ee=rt.__version===void 0||ot===!0,k=ct.dataReady;let xt=F(b,Wt);gt(n.TEXTURE_CUBE_MAP,b);let et;if(oe){Jt&&Ee&&e.texStorage2D(n.TEXTURE_CUBE_MAP,xt,ae,Wt.width,Wt.height);for(let at=0;at<6;at++){et=It[at].mipmaps;for(let At=0;At<et.length;At++){const St=et[At];b.format!==An?Bt!==null?Jt?k&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+at,At,0,0,St.width,St.height,Bt,St.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+at,At,ae,St.width,St.height,0,St.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Jt?k&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+at,At,0,0,St.width,St.height,Bt,Pt,St.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+at,At,ae,St.width,St.height,0,Bt,Pt,St.data)}}}else{if(et=b.mipmaps,Jt&&Ee){et.length>0&&xt++;const at=Ht(It[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,xt,ae,at.width,at.height)}for(let at=0;at<6;at++)if(ft){Jt?k&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+at,0,0,0,It[at].width,It[at].height,Bt,Pt,It[at].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+at,0,ae,It[at].width,It[at].height,0,Bt,Pt,It[at].data);for(let At=0;At<et.length;At++){const Zt=et[At].image[at].image;Jt?k&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+at,At+1,0,0,Zt.width,Zt.height,Bt,Pt,Zt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+at,At+1,ae,Zt.width,Zt.height,0,Bt,Pt,Zt.data)}}else{Jt?k&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+at,0,0,0,Bt,Pt,It[at]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+at,0,ae,Bt,Pt,It[at]);for(let At=0;At<et.length;At++){const St=et[At];Jt?k&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+at,At+1,0,0,Bt,Pt,St.image[at]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+at,At+1,ae,Bt,Pt,St.image[at])}}}g(b)&&p(n.TEXTURE_CUBE_MAP),rt.__version=ct.version,b.onUpdate&&b.onUpdate(b)}U.__version=b.version}function Ut(U,b,$,ot,ct,rt){const kt=o.convert($.format,$.colorSpace),Tt=o.convert($.type),Lt=_($.internalFormat,kt,Tt,$.colorSpace),oe=i.get(b),ft=i.get($);if(ft.__renderTarget=b,!oe.__hasExternalTextures){const It=Math.max(1,b.width>>rt),Wt=Math.max(1,b.height>>rt);ct===n.TEXTURE_3D||ct===n.TEXTURE_2D_ARRAY?e.texImage3D(ct,rt,Lt,It,Wt,b.depth,0,kt,Tt,null):e.texImage2D(ct,rt,Lt,It,Wt,0,kt,Tt,null)}e.bindFramebuffer(n.FRAMEBUFFER,U),se(b)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ot,ct,ft.__webglTexture,0,ie(b)):(ct===n.TEXTURE_2D||ct>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ct<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,ot,ct,ft.__webglTexture,rt),e.bindFramebuffer(n.FRAMEBUFFER,null)}function _t(U,b,$){if(n.bindRenderbuffer(n.RENDERBUFFER,U),b.depthBuffer){const ot=b.depthTexture,ct=ot&&ot.isDepthTexture?ot.type:null,rt=M(b.stencilBuffer,ct),kt=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Tt=ie(b);se(b)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Tt,rt,b.width,b.height):$?n.renderbufferStorageMultisample(n.RENDERBUFFER,Tt,rt,b.width,b.height):n.renderbufferStorage(n.RENDERBUFFER,rt,b.width,b.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,kt,n.RENDERBUFFER,U)}else{const ot=b.textures;for(let ct=0;ct<ot.length;ct++){const rt=ot[ct],kt=o.convert(rt.format,rt.colorSpace),Tt=o.convert(rt.type),Lt=_(rt.internalFormat,kt,Tt,rt.colorSpace),oe=ie(b);$&&se(b)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,oe,Lt,b.width,b.height):se(b)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,oe,Lt,b.width,b.height):n.renderbufferStorage(n.RENDERBUFFER,Lt,b.width,b.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Vt(U,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,U),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const ot=i.get(b.depthTexture);ot.__renderTarget=b,(!ot.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),nt(b.depthTexture,0);const ct=ot.__webglTexture,rt=ie(b);if(b.depthTexture.format===ms)se(b)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ct,0,rt):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ct,0);else if(b.depthTexture.format===bs)se(b)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ct,0,rt):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ct,0);else throw new Error("Unknown depthTexture format")}function $t(U){const b=i.get(U),$=U.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==U.depthTexture){const ot=U.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),ot){const ct=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,ot.removeEventListener("dispose",ct)};ot.addEventListener("dispose",ct),b.__depthDisposeCallback=ct}b.__boundDepthTexture=ot}if(U.depthTexture&&!b.__autoAllocateDepthBuffer){if($)throw new Error("target.depthTexture not supported in Cube render targets");Vt(b.__webglFramebuffer,U)}else if($){b.__webglDepthbuffer=[];for(let ot=0;ot<6;ot++)if(e.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer[ot]),b.__webglDepthbuffer[ot]===void 0)b.__webglDepthbuffer[ot]=n.createRenderbuffer(),_t(b.__webglDepthbuffer[ot],U,!1);else{const ct=U.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,rt=b.__webglDepthbuffer[ot];n.bindRenderbuffer(n.RENDERBUFFER,rt),n.framebufferRenderbuffer(n.FRAMEBUFFER,ct,n.RENDERBUFFER,rt)}}else if(e.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=n.createRenderbuffer(),_t(b.__webglDepthbuffer,U,!1);else{const ot=U.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ct=b.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,ct),n.framebufferRenderbuffer(n.FRAMEBUFFER,ot,n.RENDERBUFFER,ct)}e.bindFramebuffer(n.FRAMEBUFFER,null)}function Qt(U,b,$){const ot=i.get(U);b!==void 0&&Ut(ot.__webglFramebuffer,U,U.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),$!==void 0&&$t(U)}function Te(U){const b=U.texture,$=i.get(U),ot=i.get(b);U.addEventListener("dispose",D);const ct=U.textures,rt=U.isWebGLCubeRenderTarget===!0,kt=ct.length>1;if(kt||(ot.__webglTexture===void 0&&(ot.__webglTexture=n.createTexture()),ot.__version=b.version,r.memory.textures++),rt){$.__webglFramebuffer=[];for(let Tt=0;Tt<6;Tt++)if(b.mipmaps&&b.mipmaps.length>0){$.__webglFramebuffer[Tt]=[];for(let Lt=0;Lt<b.mipmaps.length;Lt++)$.__webglFramebuffer[Tt][Lt]=n.createFramebuffer()}else $.__webglFramebuffer[Tt]=n.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){$.__webglFramebuffer=[];for(let Tt=0;Tt<b.mipmaps.length;Tt++)$.__webglFramebuffer[Tt]=n.createFramebuffer()}else $.__webglFramebuffer=n.createFramebuffer();if(kt)for(let Tt=0,Lt=ct.length;Tt<Lt;Tt++){const oe=i.get(ct[Tt]);oe.__webglTexture===void 0&&(oe.__webglTexture=n.createTexture(),r.memory.textures++)}if(U.samples>0&&se(U)===!1){$.__webglMultisampledFramebuffer=n.createFramebuffer(),$.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,$.__webglMultisampledFramebuffer);for(let Tt=0;Tt<ct.length;Tt++){const Lt=ct[Tt];$.__webglColorRenderbuffer[Tt]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,$.__webglColorRenderbuffer[Tt]);const oe=o.convert(Lt.format,Lt.colorSpace),ft=o.convert(Lt.type),It=_(Lt.internalFormat,oe,ft,Lt.colorSpace,U.isXRRenderTarget===!0),Wt=ie(U);n.renderbufferStorageMultisample(n.RENDERBUFFER,Wt,It,U.width,U.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Tt,n.RENDERBUFFER,$.__webglColorRenderbuffer[Tt])}n.bindRenderbuffer(n.RENDERBUFFER,null),U.depthBuffer&&($.__webglDepthRenderbuffer=n.createRenderbuffer(),_t($.__webglDepthRenderbuffer,U,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(rt){e.bindTexture(n.TEXTURE_CUBE_MAP,ot.__webglTexture),gt(n.TEXTURE_CUBE_MAP,b);for(let Tt=0;Tt<6;Tt++)if(b.mipmaps&&b.mipmaps.length>0)for(let Lt=0;Lt<b.mipmaps.length;Lt++)Ut($.__webglFramebuffer[Tt][Lt],U,b,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,Lt);else Ut($.__webglFramebuffer[Tt],U,b,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,0);g(b)&&p(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(kt){for(let Tt=0,Lt=ct.length;Tt<Lt;Tt++){const oe=ct[Tt],ft=i.get(oe);e.bindTexture(n.TEXTURE_2D,ft.__webglTexture),gt(n.TEXTURE_2D,oe),Ut($.__webglFramebuffer,U,oe,n.COLOR_ATTACHMENT0+Tt,n.TEXTURE_2D,0),g(oe)&&p(n.TEXTURE_2D)}e.unbindTexture()}else{let Tt=n.TEXTURE_2D;if((U.isWebGL3DRenderTarget||U.isWebGLArrayRenderTarget)&&(Tt=U.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(Tt,ot.__webglTexture),gt(Tt,b),b.mipmaps&&b.mipmaps.length>0)for(let Lt=0;Lt<b.mipmaps.length;Lt++)Ut($.__webglFramebuffer[Lt],U,b,n.COLOR_ATTACHMENT0,Tt,Lt);else Ut($.__webglFramebuffer,U,b,n.COLOR_ATTACHMENT0,Tt,0);g(b)&&p(Tt),e.unbindTexture()}U.depthBuffer&&$t(U)}function le(U){const b=U.textures;for(let $=0,ot=b.length;$<ot;$++){const ct=b[$];if(g(ct)){const rt=T(U),kt=i.get(ct).__webglTexture;e.bindTexture(rt,kt),p(rt),e.unbindTexture()}}}const Le=[],X=[];function sn(U){if(U.samples>0){if(se(U)===!1){const b=U.textures,$=U.width,ot=U.height;let ct=n.COLOR_BUFFER_BIT;const rt=U.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,kt=i.get(U),Tt=b.length>1;if(Tt)for(let Lt=0;Lt<b.length;Lt++)e.bindFramebuffer(n.FRAMEBUFFER,kt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Lt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,kt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Lt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,kt.__webglMultisampledFramebuffer),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,kt.__webglFramebuffer);for(let Lt=0;Lt<b.length;Lt++){if(U.resolveDepthBuffer&&(U.depthBuffer&&(ct|=n.DEPTH_BUFFER_BIT),U.stencilBuffer&&U.resolveStencilBuffer&&(ct|=n.STENCIL_BUFFER_BIT)),Tt){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,kt.__webglColorRenderbuffer[Lt]);const oe=i.get(b[Lt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,oe,0)}n.blitFramebuffer(0,0,$,ot,0,0,$,ot,ct,n.NEAREST),l===!0&&(Le.length=0,X.length=0,Le.push(n.COLOR_ATTACHMENT0+Lt),U.depthBuffer&&U.resolveDepthBuffer===!1&&(Le.push(rt),X.push(rt),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,X)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Le))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),Tt)for(let Lt=0;Lt<b.length;Lt++){e.bindFramebuffer(n.FRAMEBUFFER,kt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Lt,n.RENDERBUFFER,kt.__webglColorRenderbuffer[Lt]);const oe=i.get(b[Lt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,kt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Lt,n.TEXTURE_2D,oe,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,kt.__webglMultisampledFramebuffer)}else if(U.depthBuffer&&U.resolveDepthBuffer===!1&&l){const b=U.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[b])}}}function ie(U){return Math.min(s.maxSamples,U.samples)}function se(U){const b=i.get(U);return U.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function Gt(U){const b=r.render.frame;d.get(U)!==b&&(d.set(U,b),U.update())}function Me(U,b){const $=U.colorSpace,ot=U.format,ct=U.type;return U.isCompressedTexture===!0||U.isVideoTexture===!0||$!==Cs&&$!==pi&&(he.getTransfer($)===xe?(ot!==An||ct!==ti)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",$)),b}function Ht(U){return typeof HTMLImageElement<"u"&&U instanceof HTMLImageElement?(c.width=U.naturalWidth||U.width,c.height=U.naturalHeight||U.height):typeof VideoFrame<"u"&&U instanceof VideoFrame?(c.width=U.displayWidth,c.height=U.displayHeight):(c.width=U.width,c.height=U.height),c}this.allocateTextureUnit=V,this.resetTextureUnits=O,this.setTexture2D=nt,this.setTexture2DArray=tt,this.setTexture3D=it,this.setTextureCube=J,this.rebindTextures=Qt,this.setupRenderTarget=Te,this.updateRenderTargetMipmap=le,this.updateMultisampleRenderTarget=sn,this.setupDepthRenderbuffer=$t,this.setupFrameBufferTexture=Ut,this.useMultisampledRTT=se}function Km(n,t){function e(i,s=pi){let o;const r=he.getTransfer(s);if(i===ti)return n.UNSIGNED_BYTE;if(i===ja)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Ja)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Yc)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Xc)return n.BYTE;if(i===qc)return n.SHORT;if(i===eo)return n.UNSIGNED_SHORT;if(i===Ka)return n.INT;if(i===ki)return n.UNSIGNED_INT;if(i===Zn)return n.FLOAT;if(i===so)return n.HALF_FLOAT;if(i===$c)return n.ALPHA;if(i===Zc)return n.RGB;if(i===An)return n.RGBA;if(i===Kc)return n.LUMINANCE;if(i===jc)return n.LUMINANCE_ALPHA;if(i===ms)return n.DEPTH_COMPONENT;if(i===bs)return n.DEPTH_STENCIL;if(i===Jc)return n.RED;if(i===Qa)return n.RED_INTEGER;if(i===Qc)return n.RG;if(i===tl)return n.RG_INTEGER;if(i===el)return n.RGBA_INTEGER;if(i===Wo||i===Xo||i===qo||i===Yo)if(r===xe)if(o=t.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(i===Wo)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Xo)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===qo)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Yo)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=t.get("WEBGL_compressed_texture_s3tc"),o!==null){if(i===Wo)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Xo)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===qo)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Yo)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===va||i===_a||i===Ma||i===ya)if(o=t.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(i===va)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===_a)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Ma)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===ya)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===xa||i===Sa||i===wa)if(o=t.get("WEBGL_compressed_texture_etc"),o!==null){if(i===xa||i===Sa)return r===xe?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(i===wa)return r===xe?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===ba||i===Ea||i===Ta||i===Aa||i===Ca||i===Ra||i===Pa||i===La||i===Ia||i===Da||i===Ua||i===Na||i===za||i===Fa)if(o=t.get("WEBGL_compressed_texture_astc"),o!==null){if(i===ba)return r===xe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Ea)return r===xe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Ta)return r===xe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Aa)return r===xe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Ca)return r===xe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Ra)return r===xe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Pa)return r===xe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===La)return r===xe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Ia)return r===xe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Da)return r===xe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Ua)return r===xe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Na)return r===xe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===za)return r===xe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Fa)return r===xe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===$o||i===Oa||i===Ba)if(o=t.get("EXT_texture_compression_bptc"),o!==null){if(i===$o)return r===xe?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Oa)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Ba)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===td||i===ka||i===Ga||i===Ha)if(o=t.get("EXT_texture_compression_rgtc"),o!==null){if(i===$o)return o.COMPRESSED_RED_RGTC1_EXT;if(i===ka)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Ga)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Ha)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===ws?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}class jm extends Ae{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Et extends Ge{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Jm={type:"move"};class Vr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Et,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Et,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new w,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new w),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Et,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new w,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new w),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,o=null,r=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){r=!0;for(const v of t.hand.values()){const g=e.getJointPose(v,i),p=this._getHandJoint(c,v);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}const d=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],u=d.position.distanceTo(h.position),f=.02,m=.005;c.inputState.pinching&&u>f+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=f-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(o=e.getPose(t.gripSpace,i),o!==null&&(l.matrix.fromArray(o.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,o.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(o.linearVelocity)):l.hasLinearVelocity=!1,o.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(o.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&o!==null&&(s=o),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Jm)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=o!==null),c!==null&&(c.visible=r!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new Et;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}const Qm=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,tg=`
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

}`;class eg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){const s=new cn,o=t.properties.get(s);o.__webglTexture=e.texture,(e.depthNear!=i.depthNear||e.depthFar!=i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new ei({vertexShader:Qm,fragmentShader:tg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new C(new Kt(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class ng extends Rs{constructor(t,e){super();const i=this;let s=null,o=1,r=null,a="local-floor",l=1,c=null,d=null,h=null,u=null,f=null,m=null;const v=new eg,g=e.getContextAttributes();let p=null,T=null;const _=[],M=[],F=new Dt;let L=null;const D=new Ae;D.viewport=new Se;const I=new Ae;I.viewport=new Se;const y=[D,I],x=new jm;let P=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(st){let mt=_[st];return mt===void 0&&(mt=new Vr,_[st]=mt),mt.getTargetRaySpace()},this.getControllerGrip=function(st){let mt=_[st];return mt===void 0&&(mt=new Vr,_[st]=mt),mt.getGripSpace()},this.getHand=function(st){let mt=_[st];return mt===void 0&&(mt=new Vr,_[st]=mt),mt.getHandSpace()};function V(st){const mt=M.indexOf(st.inputSource);if(mt===-1)return;const Ut=_[mt];Ut!==void 0&&(Ut.update(st.inputSource,st.frame,c||r),Ut.dispatchEvent({type:st.type,data:st.inputSource}))}function Q(){s.removeEventListener("select",V),s.removeEventListener("selectstart",V),s.removeEventListener("selectend",V),s.removeEventListener("squeeze",V),s.removeEventListener("squeezestart",V),s.removeEventListener("squeezeend",V),s.removeEventListener("end",Q),s.removeEventListener("inputsourceschange",nt);for(let st=0;st<_.length;st++){const mt=M[st];mt!==null&&(M[st]=null,_[st].disconnect(mt))}P=null,O=null,v.reset(),t.setRenderTarget(p),f=null,u=null,h=null,s=null,T=null,yt.stop(),i.isPresenting=!1,t.setPixelRatio(L),t.setSize(F.width,F.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(st){o=st,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(st){a=st,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||r},this.setReferenceSpace=function(st){c=st},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return h},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(st){if(s=st,s!==null){if(p=t.getRenderTarget(),s.addEventListener("select",V),s.addEventListener("selectstart",V),s.addEventListener("selectend",V),s.addEventListener("squeeze",V),s.addEventListener("squeezestart",V),s.addEventListener("squeezeend",V),s.addEventListener("end",Q),s.addEventListener("inputsourceschange",nt),g.xrCompatible!==!0&&await e.makeXRCompatible(),L=t.getPixelRatio(),t.getSize(F),s.renderState.layers===void 0){const mt={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:o};f=new XRWebGLLayer(s,e,mt),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),T=new Gi(f.framebufferWidth,f.framebufferHeight,{format:An,type:ti,colorSpace:t.outputColorSpace,stencilBuffer:g.stencil})}else{let mt=null,Ut=null,_t=null;g.depth&&(_t=g.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,mt=g.stencil?bs:ms,Ut=g.stencil?ws:ki);const Vt={colorFormat:e.RGBA8,depthFormat:_t,scaleFactor:o};h=new XRWebGLBinding(s,e),u=h.createProjectionLayer(Vt),s.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),T=new Gi(u.textureWidth,u.textureHeight,{format:An,type:ti,depthTexture:new fd(u.textureWidth,u.textureHeight,Ut,void 0,void 0,void 0,void 0,void 0,void 0,mt),stencilBuffer:g.stencil,colorSpace:t.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1})}T.isXRRenderTarget=!0,this.setFoveation(l),c=null,r=await s.requestReferenceSpace(a),yt.setContext(s),yt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function nt(st){for(let mt=0;mt<st.removed.length;mt++){const Ut=st.removed[mt],_t=M.indexOf(Ut);_t>=0&&(M[_t]=null,_[_t].disconnect(Ut))}for(let mt=0;mt<st.added.length;mt++){const Ut=st.added[mt];let _t=M.indexOf(Ut);if(_t===-1){for(let $t=0;$t<_.length;$t++)if($t>=M.length){M.push(Ut),_t=$t;break}else if(M[$t]===null){M[$t]=Ut,_t=$t;break}if(_t===-1)break}const Vt=_[_t];Vt&&Vt.connect(Ut)}}const tt=new w,it=new w;function J(st,mt,Ut){tt.setFromMatrixPosition(mt.matrixWorld),it.setFromMatrixPosition(Ut.matrixWorld);const _t=tt.distanceTo(it),Vt=mt.projectionMatrix.elements,$t=Ut.projectionMatrix.elements,Qt=Vt[14]/(Vt[10]-1),Te=Vt[14]/(Vt[10]+1),le=(Vt[9]+1)/Vt[5],Le=(Vt[9]-1)/Vt[5],X=(Vt[8]-1)/Vt[0],sn=($t[8]+1)/$t[0],ie=Qt*X,se=Qt*sn,Gt=_t/(-X+sn),Me=Gt*-X;if(mt.matrixWorld.decompose(st.position,st.quaternion,st.scale),st.translateX(Me),st.translateZ(Gt),st.matrixWorld.compose(st.position,st.quaternion,st.scale),st.matrixWorldInverse.copy(st.matrixWorld).invert(),Vt[10]===-1)st.projectionMatrix.copy(mt.projectionMatrix),st.projectionMatrixInverse.copy(mt.projectionMatrixInverse);else{const Ht=Qt+Gt,U=Te+Gt,b=ie-Me,$=se+(_t-Me),ot=le*Te/U*Ht,ct=Le*Te/U*Ht;st.projectionMatrix.makePerspective(b,$,ot,ct,Ht,U),st.projectionMatrixInverse.copy(st.projectionMatrix).invert()}}function ht(st,mt){mt===null?st.matrixWorld.copy(st.matrix):st.matrixWorld.multiplyMatrices(mt.matrixWorld,st.matrix),st.matrixWorldInverse.copy(st.matrixWorld).invert()}this.updateCamera=function(st){if(s===null)return;let mt=st.near,Ut=st.far;v.texture!==null&&(v.depthNear>0&&(mt=v.depthNear),v.depthFar>0&&(Ut=v.depthFar)),x.near=I.near=D.near=mt,x.far=I.far=D.far=Ut,(P!==x.near||O!==x.far)&&(s.updateRenderState({depthNear:x.near,depthFar:x.far}),P=x.near,O=x.far),D.layers.mask=st.layers.mask|2,I.layers.mask=st.layers.mask|4,x.layers.mask=D.layers.mask|I.layers.mask;const _t=st.parent,Vt=x.cameras;ht(x,_t);for(let $t=0;$t<Vt.length;$t++)ht(Vt[$t],_t);Vt.length===2?J(x,D,I):x.projectionMatrix.copy(D.projectionMatrix),B(st,x,_t)};function B(st,mt,Ut){Ut===null?st.matrix.copy(mt.matrixWorld):(st.matrix.copy(Ut.matrixWorld),st.matrix.invert(),st.matrix.multiply(mt.matrixWorld)),st.matrix.decompose(st.position,st.quaternion,st.scale),st.updateMatrixWorld(!0),st.projectionMatrix.copy(mt.projectionMatrix),st.projectionMatrixInverse.copy(mt.projectionMatrixInverse),st.isPerspectiveCamera&&(st.fov=no*2*Math.atan(1/st.projectionMatrix.elements[5]),st.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(st){l=st,u!==null&&(u.fixedFoveation=st),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=st)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(x)};let ut=null;function gt(st,mt){if(d=mt.getViewerPose(c||r),m=mt,d!==null){const Ut=d.views;f!==null&&(t.setRenderTargetFramebuffer(T,f.framebuffer),t.setRenderTarget(T));let _t=!1;Ut.length!==x.cameras.length&&(x.cameras.length=0,_t=!0);for(let $t=0;$t<Ut.length;$t++){const Qt=Ut[$t];let Te=null;if(f!==null)Te=f.getViewport(Qt);else{const Le=h.getViewSubImage(u,Qt);Te=Le.viewport,$t===0&&(t.setRenderTargetTextures(T,Le.colorTexture,u.ignoreDepthValues?void 0:Le.depthStencilTexture),t.setRenderTarget(T))}let le=y[$t];le===void 0&&(le=new Ae,le.layers.enable($t),le.viewport=new Se,y[$t]=le),le.matrix.fromArray(Qt.transform.matrix),le.matrix.decompose(le.position,le.quaternion,le.scale),le.projectionMatrix.fromArray(Qt.projectionMatrix),le.projectionMatrixInverse.copy(le.projectionMatrix).invert(),le.viewport.set(Te.x,Te.y,Te.width,Te.height),$t===0&&(x.matrix.copy(le.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),_t===!0&&x.cameras.push(le)}const Vt=s.enabledFeatures;if(Vt&&Vt.includes("depth-sensing")){const $t=h.getDepthInformation(Ut[0]);$t&&$t.isValid&&$t.texture&&v.init(t,$t,s.renderState)}}for(let Ut=0;Ut<_.length;Ut++){const _t=M[Ut],Vt=_[Ut];_t!==null&&Vt!==void 0&&Vt.update(_t,mt,c||r)}ut&&ut(st,mt),mt.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:mt}),m=null}const yt=new ud;yt.setAnimationLoop(gt),this.setAnimationLoop=function(st){ut=st},this.dispose=function(){}}}const Ci=new Pn,ig=new be;function sg(n,t){function e(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function i(g,p){p.color.getRGB(g.fogColor.value,ld(n)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function s(g,p,T,_,M){p.isMeshBasicMaterial||p.isMeshLambertMaterial?o(g,p):p.isMeshToonMaterial?(o(g,p),h(g,p)):p.isMeshPhongMaterial?(o(g,p),d(g,p)):p.isMeshStandardMaterial?(o(g,p),u(g,p),p.isMeshPhysicalMaterial&&f(g,p,M)):p.isMeshMatcapMaterial?(o(g,p),m(g,p)):p.isMeshDepthMaterial?o(g,p):p.isMeshDistanceMaterial?(o(g,p),v(g,p)):p.isMeshNormalMaterial?o(g,p):p.isLineBasicMaterial?(r(g,p),p.isLineDashedMaterial&&a(g,p)):p.isPointsMaterial?l(g,p,T,_):p.isSpriteMaterial?c(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function o(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,e(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===en&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,e(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===en&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,e(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,e(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);const T=t.get(p),_=T.envMap,M=T.envMapRotation;_&&(g.envMap.value=_,Ci.copy(M),Ci.x*=-1,Ci.y*=-1,Ci.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(Ci.y*=-1,Ci.z*=-1),g.envMapRotation.value.setFromMatrix4(ig.makeRotationFromEuler(Ci)),g.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,g.aoMapTransform))}function r(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform))}function a(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function l(g,p,T,_){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*T,g.scale.value=_*.5,p.map&&(g.map.value=p.map,e(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function c(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function d(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function h(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function u(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function f(g,p,T){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===en&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=T.texture,g.transmissionSamplerSize.value.set(T.width,T.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function v(g,p){const T=t.get(p).light;g.referencePosition.value.setFromMatrixPosition(T.matrixWorld),g.nearDistance.value=T.shadow.camera.near,g.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function og(n,t,e,i){let s={},o={},r=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(T,_){const M=_.program;i.uniformBlockBinding(T,M)}function c(T,_){let M=s[T.id];M===void 0&&(m(T),M=d(T),s[T.id]=M,T.addEventListener("dispose",g));const F=_.program;i.updateUBOMapping(T,F);const L=t.render.frame;o[T.id]!==L&&(u(T),o[T.id]=L)}function d(T){const _=h();T.__bindingPointIndex=_;const M=n.createBuffer(),F=T.__size,L=T.usage;return n.bindBuffer(n.UNIFORM_BUFFER,M),n.bufferData(n.UNIFORM_BUFFER,F,L),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,_,M),M}function h(){for(let T=0;T<a;T++)if(r.indexOf(T)===-1)return r.push(T),T;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(T){const _=s[T.id],M=T.uniforms,F=T.__cache;n.bindBuffer(n.UNIFORM_BUFFER,_);for(let L=0,D=M.length;L<D;L++){const I=Array.isArray(M[L])?M[L]:[M[L]];for(let y=0,x=I.length;y<x;y++){const P=I[y];if(f(P,L,y,F)===!0){const O=P.__offset,V=Array.isArray(P.value)?P.value:[P.value];let Q=0;for(let nt=0;nt<V.length;nt++){const tt=V[nt],it=v(tt);typeof tt=="number"||typeof tt=="boolean"?(P.__data[0]=tt,n.bufferSubData(n.UNIFORM_BUFFER,O+Q,P.__data)):tt.isMatrix3?(P.__data[0]=tt.elements[0],P.__data[1]=tt.elements[1],P.__data[2]=tt.elements[2],P.__data[3]=0,P.__data[4]=tt.elements[3],P.__data[5]=tt.elements[4],P.__data[6]=tt.elements[5],P.__data[7]=0,P.__data[8]=tt.elements[6],P.__data[9]=tt.elements[7],P.__data[10]=tt.elements[8],P.__data[11]=0):(tt.toArray(P.__data,Q),Q+=it.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,O,P.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(T,_,M,F){const L=T.value,D=_+"_"+M;if(F[D]===void 0)return typeof L=="number"||typeof L=="boolean"?F[D]=L:F[D]=L.clone(),!0;{const I=F[D];if(typeof L=="number"||typeof L=="boolean"){if(I!==L)return F[D]=L,!0}else if(I.equals(L)===!1)return I.copy(L),!0}return!1}function m(T){const _=T.uniforms;let M=0;const F=16;for(let D=0,I=_.length;D<I;D++){const y=Array.isArray(_[D])?_[D]:[_[D]];for(let x=0,P=y.length;x<P;x++){const O=y[x],V=Array.isArray(O.value)?O.value:[O.value];for(let Q=0,nt=V.length;Q<nt;Q++){const tt=V[Q],it=v(tt),J=M%F,ht=J%it.boundary,B=J+ht;M+=ht,B!==0&&F-B<it.storage&&(M+=F-B),O.__data=new Float32Array(it.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=M,M+=it.storage}}}const L=M%F;return L>0&&(M+=F-L),T.__size=M,T.__cache={},this}function v(T){const _={boundary:0,storage:0};return typeof T=="number"||typeof T=="boolean"?(_.boundary=4,_.storage=4):T.isVector2?(_.boundary=8,_.storage=8):T.isVector3||T.isColor?(_.boundary=16,_.storage=12):T.isVector4?(_.boundary=16,_.storage=16):T.isMatrix3?(_.boundary=48,_.storage=48):T.isMatrix4?(_.boundary=64,_.storage=64):T.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",T),_}function g(T){const _=T.target;_.removeEventListener("dispose",g);const M=r.indexOf(_.__bindingPointIndex);r.splice(M,1),n.deleteBuffer(s[_.id]),delete s[_.id],delete o[_.id]}function p(){for(const T in s)n.deleteBuffer(s[T]);r=[],s={},o={}}return{bind:l,update:c,dispose:p}}class al{constructor(t={}){const{canvas:e=Yu(),context:i=null,depth:s=!0,stencil:o=!1,alpha:r=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:h=!1,reverseDepthBuffer:u=!1}=t;this.isWebGLRenderer=!0;let f;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=i.getContextAttributes().alpha}else f=r;const m=new Uint32Array(4),v=new Int32Array(4);let g=null,p=null;const T=[],_=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=_e,this.toneMapping=_i,this.toneMappingExposure=1;const M=this;let F=!1,L=0,D=0,I=null,y=-1,x=null;const P=new Se,O=new Se;let V=null;const Q=new vt(0);let nt=0,tt=e.width,it=e.height,J=1,ht=null,B=null;const ut=new Se(0,0,tt,it),gt=new Se(0,0,tt,it);let yt=!1;const st=new ol;let mt=!1,Ut=!1;const _t=new be,Vt=new be,$t=new w,Qt=new Se,Te={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let le=!1;function Le(){return I===null?J:1}let X=i;function sn(E,H){return e.getContext(E,H)}try{const E={alpha:!0,depth:s,stencil:o,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:h};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${$a}`),e.addEventListener("webglcontextlost",at,!1),e.addEventListener("webglcontextrestored",At,!1),e.addEventListener("webglcontextcreationerror",St,!1),X===null){const H="webgl2";if(X=sn(H,E),X===null)throw sn(H)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let ie,se,Gt,Me,Ht,U,b,$,ot,ct,rt,kt,Tt,Lt,oe,ft,It,Wt,Bt,Pt,ae,Jt,Ee,k;function xt(){ie=new u0(X),ie.init(),Jt=new Km(X,ie),se=new o0(X,ie,t,Jt),Gt=new Ym(X,ie),se.reverseDepthBuffer&&u&&Gt.buffers.depth.setReversed(!0),Me=new p0(X),Ht=new Im,U=new Zm(X,ie,Gt,Ht,se,Jt,Me),b=new a0(M),$=new d0(M),ot=new yh(X),Ee=new i0(X,ot),ct=new h0(X,ot,Me,Ee),rt=new g0(X,ct,ot,Me),Bt=new m0(X,se,U),ft=new r0(Ht),kt=new Lm(M,b,$,ie,se,Ee,ft),Tt=new sg(M,Ht),Lt=new Um,oe=new km(ie),Wt=new n0(M,b,$,Gt,rt,f,l),It=new Xm(M,rt,se),k=new og(X,Me,se,Gt),Pt=new s0(X,ie,Me),ae=new f0(X,ie,Me),Me.programs=kt.programs,M.capabilities=se,M.extensions=ie,M.properties=Ht,M.renderLists=Lt,M.shadowMap=It,M.state=Gt,M.info=Me}xt();const et=new ng(M,X);this.xr=et,this.getContext=function(){return X},this.getContextAttributes=function(){return X.getContextAttributes()},this.forceContextLoss=function(){const E=ie.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=ie.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return J},this.setPixelRatio=function(E){E!==void 0&&(J=E,this.setSize(tt,it,!1))},this.getSize=function(E){return E.set(tt,it)},this.setSize=function(E,H,K=!0){if(et.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}tt=E,it=H,e.width=Math.floor(E*J),e.height=Math.floor(H*J),K===!0&&(e.style.width=E+"px",e.style.height=H+"px"),this.setViewport(0,0,E,H)},this.getDrawingBufferSize=function(E){return E.set(tt*J,it*J).floor()},this.setDrawingBufferSize=function(E,H,K){tt=E,it=H,J=K,e.width=Math.floor(E*K),e.height=Math.floor(H*K),this.setViewport(0,0,E,H)},this.getCurrentViewport=function(E){return E.copy(P)},this.getViewport=function(E){return E.copy(ut)},this.setViewport=function(E,H,K,j){E.isVector4?ut.set(E.x,E.y,E.z,E.w):ut.set(E,H,K,j),Gt.viewport(P.copy(ut).multiplyScalar(J).round())},this.getScissor=function(E){return E.copy(gt)},this.setScissor=function(E,H,K,j){E.isVector4?gt.set(E.x,E.y,E.z,E.w):gt.set(E,H,K,j),Gt.scissor(O.copy(gt).multiplyScalar(J).round())},this.getScissorTest=function(){return yt},this.setScissorTest=function(E){Gt.setScissorTest(yt=E)},this.setOpaqueSort=function(E){ht=E},this.setTransparentSort=function(E){B=E},this.getClearColor=function(E){return E.copy(Wt.getClearColor())},this.setClearColor=function(){Wt.setClearColor.apply(Wt,arguments)},this.getClearAlpha=function(){return Wt.getClearAlpha()},this.setClearAlpha=function(){Wt.setClearAlpha.apply(Wt,arguments)},this.clear=function(E=!0,H=!0,K=!0){let j=0;if(E){let W=!1;if(I!==null){const pt=I.texture.format;W=pt===el||pt===tl||pt===Qa}if(W){const pt=I.texture.type,wt=pt===ti||pt===ki||pt===eo||pt===ws||pt===ja||pt===Ja,Nt=Wt.getClearColor(),zt=Wt.getClearAlpha(),qt=Nt.r,jt=Nt.g,Ft=Nt.b;wt?(m[0]=qt,m[1]=jt,m[2]=Ft,m[3]=zt,X.clearBufferuiv(X.COLOR,0,m)):(v[0]=qt,v[1]=jt,v[2]=Ft,v[3]=zt,X.clearBufferiv(X.COLOR,0,v))}else j|=X.COLOR_BUFFER_BIT}H&&(j|=X.DEPTH_BUFFER_BIT),K&&(j|=X.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),X.clear(j)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",at,!1),e.removeEventListener("webglcontextrestored",At,!1),e.removeEventListener("webglcontextcreationerror",St,!1),Lt.dispose(),oe.dispose(),Ht.dispose(),b.dispose(),$.dispose(),rt.dispose(),Ee.dispose(),k.dispose(),kt.dispose(),et.dispose(),et.removeEventListener("sessionstart",Ls),et.removeEventListener("sessionend",Is),Mn.stop()};function at(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),F=!0}function At(){console.log("THREE.WebGLRenderer: Context Restored."),F=!1;const E=Me.autoReset,H=It.enabled,K=It.autoUpdate,j=It.needsUpdate,W=It.type;xt(),Me.autoReset=E,It.enabled=H,It.autoUpdate=K,It.needsUpdate=j,It.type=W}function St(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function Zt(E){const H=E.target;H.removeEventListener("dispose",Zt),Ie(H)}function Ie(E){Ue(E),Ht.remove(E)}function Ue(E){const H=Ht.get(E).programs;H!==void 0&&(H.forEach(function(K){kt.releaseProgram(K)}),E.isShaderMaterial&&kt.releaseShaderCache(E))}this.renderBufferDirect=function(E,H,K,j,W,pt){H===null&&(H=Te);const wt=W.isMesh&&W.matrixWorld.determinant()<0,Nt=Yi(E,H,K,j,W);Gt.setMaterial(j,wt);let zt=K.index,qt=1;if(j.wireframe===!0){if(zt=ct.getWireframeAttribute(K),zt===void 0)return;qt=2}const jt=K.drawRange,Ft=K.attributes.position;let ce=jt.start*qt,ye=(jt.start+jt.count)*qt;pt!==null&&(ce=Math.max(ce,pt.start*qt),ye=Math.min(ye,(pt.start+pt.count)*qt)),zt!==null?(ce=Math.max(ce,0),ye=Math.min(ye,zt.count)):Ft!=null&&(ce=Math.max(ce,0),ye=Math.min(ye,Ft.count));const A=ye-ce;if(A<0||A===1/0)return;Ee.setup(W,j,Nt,K,zt);let z,R=Pt;if(zt!==null&&(z=ot.get(zt),R=ae,R.setIndex(z)),W.isMesh)j.wireframe===!0?(Gt.setLineWidth(j.wireframeLinewidth*Le()),R.setMode(X.LINES)):R.setMode(X.TRIANGLES);else if(W.isLine){let N=j.linewidth;N===void 0&&(N=1),Gt.setLineWidth(N*Le()),W.isLineSegments?R.setMode(X.LINES):W.isLineLoop?R.setMode(X.LINE_LOOP):R.setMode(X.LINE_STRIP)}else W.isPoints?R.setMode(X.POINTS):W.isSprite&&R.setMode(X.TRIANGLES);if(W.isBatchedMesh)if(W._multiDrawInstances!==null)R.renderMultiDrawInstances(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount,W._multiDrawInstances);else if(ie.get("WEBGL_multi_draw"))R.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{const N=W._multiDrawStarts,G=W._multiDrawCounts,q=W._multiDrawCount,Z=zt?ot.get(zt).bytesPerElement:1,lt=Ht.get(j).currentProgram.getUniforms();for(let Xt=0;Xt<q;Xt++)lt.setValue(X,"_gl_DrawID",Xt),R.render(N[Xt]/Z,G[Xt])}else if(W.isInstancedMesh)R.renderInstances(ce,A,W.count);else if(K.isInstancedBufferGeometry){const N=K._maxInstanceCount!==void 0?K._maxInstanceCount:1/0,G=Math.min(K.instanceCount,N);R.renderInstances(ce,A,G)}else R.render(ce,A)};function pe(E,H,K){E.transparent===!0&&E.side===ze&&E.forceSinglePass===!1?(E.side=en,E.needsUpdate=!0,Si(E,H,K),E.side=Mi,E.needsUpdate=!0,Si(E,H,K),E.side=ze):Si(E,H,K)}this.compile=function(E,H,K=null){K===null&&(K=E),p=oe.get(K),p.init(H),_.push(p),K.traverseVisible(function(W){W.isLight&&W.layers.test(H.layers)&&(p.pushLight(W),W.castShadow&&p.pushShadow(W))}),E!==K&&E.traverseVisible(function(W){W.isLight&&W.layers.test(H.layers)&&(p.pushLight(W),W.castShadow&&p.pushShadow(W))}),p.setupLights();const j=new Set;return E.traverse(function(W){if(!(W.isMesh||W.isPoints||W.isLine||W.isSprite))return;const pt=W.material;if(pt)if(Array.isArray(pt))for(let wt=0;wt<pt.length;wt++){const Nt=pt[wt];pe(Nt,K,W),j.add(Nt)}else pe(pt,K,W),j.add(pt)}),_.pop(),p=null,j},this.compileAsync=function(E,H,K=null){const j=this.compile(E,H,K);return new Promise(W=>{function pt(){if(j.forEach(function(wt){Ht.get(wt).currentProgram.isReady()&&j.delete(wt)}),j.size===0){W(E);return}setTimeout(pt,10)}ie.get("KHR_parallel_shader_compile")!==null?pt():setTimeout(pt,10)})};let dn=null;function un(E){dn&&dn(E)}function Ls(){Mn.stop()}function Is(){Mn.start()}const Mn=new ud;Mn.setAnimationLoop(un),typeof self<"u"&&Mn.setContext(self),this.setAnimationLoop=function(E){dn=E,et.setAnimationLoop(E),E===null?Mn.stop():Mn.start()},et.addEventListener("sessionstart",Ls),et.addEventListener("sessionend",Is),this.render=function(E,H){if(H!==void 0&&H.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(F===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),H.parent===null&&H.matrixWorldAutoUpdate===!0&&H.updateMatrixWorld(),et.enabled===!0&&et.isPresenting===!0&&(et.cameraAutoUpdate===!0&&et.updateCamera(H),H=et.getCamera()),E.isScene===!0&&E.onBeforeRender(M,E,H,I),p=oe.get(E,_.length),p.init(H),_.push(p),Vt.multiplyMatrices(H.projectionMatrix,H.matrixWorldInverse),st.setFromProjectionMatrix(Vt),Ut=this.localClippingEnabled,mt=ft.init(this.clippingPlanes,Ut),g=Lt.get(E,T.length),g.init(),T.push(g),et.enabled===!0&&et.isPresenting===!0){const pt=M.xr.getDepthSensingMesh();pt!==null&&Wi(pt,H,-1/0,M.sortObjects)}Wi(E,H,0,M.sortObjects),g.finish(),M.sortObjects===!0&&g.sort(ht,B),le=et.enabled===!1||et.isPresenting===!1||et.hasDepthSensing()===!1,le&&Wt.addToRenderList(g,E),this.info.render.frame++,mt===!0&&ft.beginShadows();const K=p.state.shadowsArray;It.render(K,E,H),mt===!0&&ft.endShadows(),this.info.autoReset===!0&&this.info.reset();const j=g.opaque,W=g.transmissive;if(p.setupLights(),H.isArrayCamera){const pt=H.cameras;if(W.length>0)for(let wt=0,Nt=pt.length;wt<Nt;wt++){const zt=pt[wt];Us(j,W,E,zt)}le&&Wt.render(E);for(let wt=0,Nt=pt.length;wt<Nt;wt++){const zt=pt[wt];Ds(g,E,zt,zt.viewport)}}else W.length>0&&Us(j,W,E,H),le&&Wt.render(E),Ds(g,E,H);I!==null&&(U.updateMultisampleRenderTarget(I),U.updateRenderTargetMipmap(I)),E.isScene===!0&&E.onAfterRender(M,E,H),Ee.resetDefaultState(),y=-1,x=null,_.pop(),_.length>0?(p=_[_.length-1],mt===!0&&ft.setGlobalState(M.clippingPlanes,p.state.camera)):p=null,T.pop(),T.length>0?g=T[T.length-1]:g=null};function Wi(E,H,K,j){if(E.visible===!1)return;if(E.layers.test(H.layers)){if(E.isGroup)K=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(H);else if(E.isLight)p.pushLight(E),E.castShadow&&p.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||st.intersectsSprite(E)){j&&Qt.setFromMatrixPosition(E.matrixWorld).applyMatrix4(Vt);const wt=rt.update(E),Nt=E.material;Nt.visible&&g.push(E,wt,Nt,K,Qt.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||st.intersectsObject(E))){const wt=rt.update(E),Nt=E.material;if(j&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Qt.copy(E.boundingSphere.center)):(wt.boundingSphere===null&&wt.computeBoundingSphere(),Qt.copy(wt.boundingSphere.center)),Qt.applyMatrix4(E.matrixWorld).applyMatrix4(Vt)),Array.isArray(Nt)){const zt=wt.groups;for(let qt=0,jt=zt.length;qt<jt;qt++){const Ft=zt[qt],ce=Nt[Ft.materialIndex];ce&&ce.visible&&g.push(E,wt,ce,K,Qt.z,Ft)}}else Nt.visible&&g.push(E,wt,Nt,K,Qt.z,null)}}const pt=E.children;for(let wt=0,Nt=pt.length;wt<Nt;wt++)Wi(pt[wt],H,K,j)}function Ds(E,H,K,j){const W=E.opaque,pt=E.transmissive,wt=E.transparent;p.setupLightsView(K),mt===!0&&ft.setGlobalState(M.clippingPlanes,K),j&&Gt.viewport(P.copy(j)),W.length>0&&xi(W,H,K),pt.length>0&&xi(pt,H,K),wt.length>0&&xi(wt,H,K),Gt.buffers.depth.setTest(!0),Gt.buffers.depth.setMask(!0),Gt.buffers.color.setMask(!0),Gt.setPolygonOffset(!1)}function Us(E,H,K,j){if((K.isScene===!0?K.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[j.id]===void 0&&(p.state.transmissionRenderTarget[j.id]=new Gi(1,1,{generateMipmaps:!0,type:ie.has("EXT_color_buffer_half_float")||ie.has("EXT_color_buffer_float")?so:ti,minFilter:Oi,samples:4,stencilBuffer:o,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:he.workingColorSpace}));const pt=p.state.transmissionRenderTarget[j.id],wt=j.viewport||P;pt.setSize(wt.z,wt.w);const Nt=M.getRenderTarget();M.setRenderTarget(pt),M.getClearColor(Q),nt=M.getClearAlpha(),nt<1&&M.setClearColor(16777215,.5),M.clear(),le&&Wt.render(K);const zt=M.toneMapping;M.toneMapping=_i;const qt=j.viewport;if(j.viewport!==void 0&&(j.viewport=void 0),p.setupLightsView(j),mt===!0&&ft.setGlobalState(M.clippingPlanes,j),xi(E,K,j),U.updateMultisampleRenderTarget(pt),U.updateRenderTargetMipmap(pt),ie.has("WEBGL_multisampled_render_to_texture")===!1){let jt=!1;for(let Ft=0,ce=H.length;Ft<ce;Ft++){const ye=H[Ft],A=ye.object,z=ye.geometry,R=ye.material,N=ye.group;if(R.side===ze&&A.layers.test(j.layers)){const G=R.side;R.side=en,R.needsUpdate=!0,si(A,K,j,z,R,N),R.side=G,R.needsUpdate=!0,jt=!0}}jt===!0&&(U.updateMultisampleRenderTarget(pt),U.updateRenderTargetMipmap(pt))}M.setRenderTarget(Nt),M.setClearColor(Q,nt),qt!==void 0&&(j.viewport=qt),M.toneMapping=zt}function xi(E,H,K){const j=H.isScene===!0?H.overrideMaterial:null;for(let W=0,pt=E.length;W<pt;W++){const wt=E[W],Nt=wt.object,zt=wt.geometry,qt=j===null?wt.material:j,jt=wt.group;Nt.layers.test(K.layers)&&si(Nt,H,K,zt,qt,jt)}}function si(E,H,K,j,W,pt){E.onBeforeRender(M,H,K,j,W,pt),E.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),W.onBeforeRender(M,H,K,j,E,pt),W.transparent===!0&&W.side===ze&&W.forceSinglePass===!1?(W.side=en,W.needsUpdate=!0,M.renderBufferDirect(K,H,j,W,E,pt),W.side=Mi,W.needsUpdate=!0,M.renderBufferDirect(K,H,j,W,E,pt),W.side=ze):M.renderBufferDirect(K,H,j,W,E,pt),E.onAfterRender(M,H,K,j,W,pt)}function Si(E,H,K){H.isScene!==!0&&(H=Te);const j=Ht.get(E),W=p.state.lights,pt=p.state.shadowsArray,wt=W.state.version,Nt=kt.getParameters(E,W.state,pt,H,K),zt=kt.getProgramCacheKey(Nt);let qt=j.programs;j.environment=E.isMeshStandardMaterial?H.environment:null,j.fog=H.fog,j.envMap=(E.isMeshStandardMaterial?$:b).get(E.envMap||j.environment),j.envMapRotation=j.environment!==null&&E.envMap===null?H.environmentRotation:E.envMapRotation,qt===void 0&&(E.addEventListener("dispose",Zt),qt=new Map,j.programs=qt);let jt=qt.get(zt);if(jt!==void 0){if(j.currentProgram===jt&&j.lightsStateVersion===wt)return qi(E,Nt),jt}else Nt.uniforms=kt.getUniforms(E),E.onBeforeCompile(Nt,M),jt=kt.acquireProgram(Nt,zt),qt.set(zt,jt),j.uniforms=Nt.uniforms;const Ft=j.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Ft.clippingPlanes=ft.uniform),qi(E,Nt),j.needsLights=Je(E),j.lightsStateVersion=wt,j.needsLights&&(Ft.ambientLightColor.value=W.state.ambient,Ft.lightProbe.value=W.state.probe,Ft.directionalLights.value=W.state.directional,Ft.directionalLightShadows.value=W.state.directionalShadow,Ft.spotLights.value=W.state.spot,Ft.spotLightShadows.value=W.state.spotShadow,Ft.rectAreaLights.value=W.state.rectArea,Ft.ltc_1.value=W.state.rectAreaLTC1,Ft.ltc_2.value=W.state.rectAreaLTC2,Ft.pointLights.value=W.state.point,Ft.pointLightShadows.value=W.state.pointShadow,Ft.hemisphereLights.value=W.state.hemi,Ft.directionalShadowMap.value=W.state.directionalShadowMap,Ft.directionalShadowMatrix.value=W.state.directionalShadowMatrix,Ft.spotShadowMap.value=W.state.spotShadowMap,Ft.spotLightMatrix.value=W.state.spotLightMatrix,Ft.spotLightMap.value=W.state.spotLightMap,Ft.pointShadowMap.value=W.state.pointShadowMap,Ft.pointShadowMatrix.value=W.state.pointShadowMatrix),j.currentProgram=jt,j.uniformsList=null,jt}function Xi(E){if(E.uniformsList===null){const H=E.currentProgram.getUniforms();E.uniformsList=Zo.seqWithValue(H.seq,E.uniforms)}return E.uniformsList}function qi(E,H){const K=Ht.get(E);K.outputColorSpace=H.outputColorSpace,K.batching=H.batching,K.batchingColor=H.batchingColor,K.instancing=H.instancing,K.instancingColor=H.instancingColor,K.instancingMorph=H.instancingMorph,K.skinning=H.skinning,K.morphTargets=H.morphTargets,K.morphNormals=H.morphNormals,K.morphColors=H.morphColors,K.morphTargetsCount=H.morphTargetsCount,K.numClippingPlanes=H.numClippingPlanes,K.numIntersection=H.numClipIntersection,K.vertexAlphas=H.vertexAlphas,K.vertexTangents=H.vertexTangents,K.toneMapping=H.toneMapping}function Yi(E,H,K,j,W){H.isScene!==!0&&(H=Te),U.resetTextureUnits();const pt=H.fog,wt=j.isMeshStandardMaterial?H.environment:null,Nt=I===null?M.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:Cs,zt=(j.isMeshStandardMaterial?$:b).get(j.envMap||wt),qt=j.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,jt=!!K.attributes.tangent&&(!!j.normalMap||j.anisotropy>0),Ft=!!K.morphAttributes.position,ce=!!K.morphAttributes.normal,ye=!!K.morphAttributes.color;let A=_i;j.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(A=M.toneMapping);const z=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,R=z!==void 0?z.length:0,N=Ht.get(j),G=p.state.lights;if(mt===!0&&(Ut===!0||E!==x)){const Ve=E===x&&j.id===y;ft.setState(j,E,Ve)}let q=!1;j.version===N.__version?(N.needsLights&&N.lightsStateVersion!==G.state.version||N.outputColorSpace!==Nt||W.isBatchedMesh&&N.batching===!1||!W.isBatchedMesh&&N.batching===!0||W.isBatchedMesh&&N.batchingColor===!0&&W.colorTexture===null||W.isBatchedMesh&&N.batchingColor===!1&&W.colorTexture!==null||W.isInstancedMesh&&N.instancing===!1||!W.isInstancedMesh&&N.instancing===!0||W.isSkinnedMesh&&N.skinning===!1||!W.isSkinnedMesh&&N.skinning===!0||W.isInstancedMesh&&N.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&N.instancingColor===!1&&W.instanceColor!==null||W.isInstancedMesh&&N.instancingMorph===!0&&W.morphTexture===null||W.isInstancedMesh&&N.instancingMorph===!1&&W.morphTexture!==null||N.envMap!==zt||j.fog===!0&&N.fog!==pt||N.numClippingPlanes!==void 0&&(N.numClippingPlanes!==ft.numPlanes||N.numIntersection!==ft.numIntersection)||N.vertexAlphas!==qt||N.vertexTangents!==jt||N.morphTargets!==Ft||N.morphNormals!==ce||N.morphColors!==ye||N.toneMapping!==A||N.morphTargetsCount!==R)&&(q=!0):(q=!0,N.__version=j.version);let Z=N.currentProgram;q===!0&&(Z=Si(j,H,W));let lt=!1,Xt=!1,me=!1;const fe=Z.getUniforms(),Ne=N.uniforms;if(Gt.useProgram(Z.program)&&(lt=!0,Xt=!0,me=!0),j.id!==y&&(y=j.id,Xt=!0),lt||x!==E){Gt.buffers.depth.getReversed()?(_t.copy(E.projectionMatrix),Zu(_t),Ku(_t),fe.setValue(X,"projectionMatrix",_t)):fe.setValue(X,"projectionMatrix",E.projectionMatrix),fe.setValue(X,"viewMatrix",E.matrixWorldInverse);const hn=fe.map.cameraPosition;hn!==void 0&&hn.setValue(X,$t.setFromMatrixPosition(E.matrixWorld)),se.logarithmicDepthBuffer&&fe.setValue(X,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(j.isMeshPhongMaterial||j.isMeshToonMaterial||j.isMeshLambertMaterial||j.isMeshBasicMaterial||j.isMeshStandardMaterial||j.isShaderMaterial)&&fe.setValue(X,"isOrthographic",E.isOrthographicCamera===!0),x!==E&&(x=E,Xt=!0,me=!0)}if(W.isSkinnedMesh){fe.setOptional(X,W,"bindMatrix"),fe.setOptional(X,W,"bindMatrixInverse");const Ve=W.skeleton;Ve&&(Ve.boneTexture===null&&Ve.computeBoneTexture(),fe.setValue(X,"boneTexture",Ve.boneTexture,U))}W.isBatchedMesh&&(fe.setOptional(X,W,"batchingTexture"),fe.setValue(X,"batchingTexture",W._matricesTexture,U),fe.setOptional(X,W,"batchingIdTexture"),fe.setValue(X,"batchingIdTexture",W._indirectTexture,U),fe.setOptional(X,W,"batchingColorTexture"),W._colorsTexture!==null&&fe.setValue(X,"batchingColorTexture",W._colorsTexture,U));const pn=K.morphAttributes;if((pn.position!==void 0||pn.normal!==void 0||pn.color!==void 0)&&Bt.update(W,K,Z),(Xt||N.receiveShadow!==W.receiveShadow)&&(N.receiveShadow=W.receiveShadow,fe.setValue(X,"receiveShadow",W.receiveShadow)),j.isMeshGouraudMaterial&&j.envMap!==null&&(Ne.envMap.value=zt,Ne.flipEnvMap.value=zt.isCubeTexture&&zt.isRenderTargetTexture===!1?-1:1),j.isMeshStandardMaterial&&j.envMap===null&&H.environment!==null&&(Ne.envMapIntensity.value=H.environmentIntensity),Xt&&(fe.setValue(X,"toneMappingExposure",M.toneMappingExposure),N.needsLights&&co(Ne,me),pt&&j.fog===!0&&Tt.refreshFogUniforms(Ne,pt),Tt.refreshMaterialUniforms(Ne,j,J,it,p.state.transmissionRenderTarget[E.id]),Zo.upload(X,Xi(N),Ne,U)),j.isShaderMaterial&&j.uniformsNeedUpdate===!0&&(Zo.upload(X,Xi(N),Ne,U),j.uniformsNeedUpdate=!1),j.isSpriteMaterial&&fe.setValue(X,"center",W.center),fe.setValue(X,"modelViewMatrix",W.modelViewMatrix),fe.setValue(X,"normalMatrix",W.normalMatrix),fe.setValue(X,"modelMatrix",W.matrixWorld),j.isShaderMaterial||j.isRawShaderMaterial){const Ve=j.uniformsGroups;for(let hn=0,fn=Ve.length;hn<fn;hn++){const uo=Ve[hn];k.update(uo,Z),k.bind(uo,Z)}}return Z}function co(E,H){E.ambientLightColor.needsUpdate=H,E.lightProbe.needsUpdate=H,E.directionalLights.needsUpdate=H,E.directionalLightShadows.needsUpdate=H,E.pointLights.needsUpdate=H,E.pointLightShadows.needsUpdate=H,E.spotLights.needsUpdate=H,E.spotLightShadows.needsUpdate=H,E.rectAreaLights.needsUpdate=H,E.hemisphereLights.needsUpdate=H}function Je(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return L},this.getActiveMipmapLevel=function(){return D},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(E,H,K){Ht.get(E.texture).__webglTexture=H,Ht.get(E.depthTexture).__webglTexture=K;const j=Ht.get(E);j.__hasExternalTextures=!0,j.__autoAllocateDepthBuffer=K===void 0,j.__autoAllocateDepthBuffer||ie.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),j.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(E,H){const K=Ht.get(E);K.__webglFramebuffer=H,K.__useDefaultFramebuffer=H===void 0},this.setRenderTarget=function(E,H=0,K=0){I=E,L=H,D=K;let j=!0,W=null,pt=!1,wt=!1;if(E){const zt=Ht.get(E);if(zt.__useDefaultFramebuffer!==void 0)Gt.bindFramebuffer(X.FRAMEBUFFER,null),j=!1;else if(zt.__webglFramebuffer===void 0)U.setupRenderTarget(E);else if(zt.__hasExternalTextures)U.rebindTextures(E,Ht.get(E.texture).__webglTexture,Ht.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const Ft=E.depthTexture;if(zt.__boundDepthTexture!==Ft){if(Ft!==null&&Ht.has(Ft)&&(E.width!==Ft.image.width||E.height!==Ft.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");U.setupDepthRenderbuffer(E)}}const qt=E.texture;(qt.isData3DTexture||qt.isDataArrayTexture||qt.isCompressedArrayTexture)&&(wt=!0);const jt=Ht.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(jt[H])?W=jt[H][K]:W=jt[H],pt=!0):E.samples>0&&U.useMultisampledRTT(E)===!1?W=Ht.get(E).__webglMultisampledFramebuffer:Array.isArray(jt)?W=jt[K]:W=jt,P.copy(E.viewport),O.copy(E.scissor),V=E.scissorTest}else P.copy(ut).multiplyScalar(J).floor(),O.copy(gt).multiplyScalar(J).floor(),V=yt;if(Gt.bindFramebuffer(X.FRAMEBUFFER,W)&&j&&Gt.drawBuffers(E,W),Gt.viewport(P),Gt.scissor(O),Gt.setScissorTest(V),pt){const zt=Ht.get(E.texture);X.framebufferTexture2D(X.FRAMEBUFFER,X.COLOR_ATTACHMENT0,X.TEXTURE_CUBE_MAP_POSITIVE_X+H,zt.__webglTexture,K)}else if(wt){const zt=Ht.get(E.texture),qt=H||0;X.framebufferTextureLayer(X.FRAMEBUFFER,X.COLOR_ATTACHMENT0,zt.__webglTexture,K||0,qt)}y=-1},this.readRenderTargetPixels=function(E,H,K,j,W,pt,wt){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Nt=Ht.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&wt!==void 0&&(Nt=Nt[wt]),Nt){Gt.bindFramebuffer(X.FRAMEBUFFER,Nt);try{const zt=E.texture,qt=zt.format,jt=zt.type;if(!se.textureFormatReadable(qt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!se.textureTypeReadable(jt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}H>=0&&H<=E.width-j&&K>=0&&K<=E.height-W&&X.readPixels(H,K,j,W,Jt.convert(qt),Jt.convert(jt),pt)}finally{const zt=I!==null?Ht.get(I).__webglFramebuffer:null;Gt.bindFramebuffer(X.FRAMEBUFFER,zt)}}},this.readRenderTargetPixelsAsync=async function(E,H,K,j,W,pt,wt){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Nt=Ht.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&wt!==void 0&&(Nt=Nt[wt]),Nt){const zt=E.texture,qt=zt.format,jt=zt.type;if(!se.textureFormatReadable(qt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!se.textureTypeReadable(jt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(H>=0&&H<=E.width-j&&K>=0&&K<=E.height-W){Gt.bindFramebuffer(X.FRAMEBUFFER,Nt);const Ft=X.createBuffer();X.bindBuffer(X.PIXEL_PACK_BUFFER,Ft),X.bufferData(X.PIXEL_PACK_BUFFER,pt.byteLength,X.STREAM_READ),X.readPixels(H,K,j,W,Jt.convert(qt),Jt.convert(jt),0);const ce=I!==null?Ht.get(I).__webglFramebuffer:null;Gt.bindFramebuffer(X.FRAMEBUFFER,ce);const ye=X.fenceSync(X.SYNC_GPU_COMMANDS_COMPLETE,0);return X.flush(),await $u(X,ye,4),X.bindBuffer(X.PIXEL_PACK_BUFFER,Ft),X.getBufferSubData(X.PIXEL_PACK_BUFFER,0,pt),X.deleteBuffer(Ft),X.deleteSync(ye),pt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(E,H=null,K=0){E.isTexture!==!0&&(qs("WebGLRenderer: copyFramebufferToTexture function signature has changed."),H=arguments[0]||null,E=arguments[1]);const j=Math.pow(2,-K),W=Math.floor(E.image.width*j),pt=Math.floor(E.image.height*j),wt=H!==null?H.x:0,Nt=H!==null?H.y:0;U.setTexture2D(E,0),X.copyTexSubImage2D(X.TEXTURE_2D,K,0,0,wt,Nt,W,pt),Gt.unbindTexture()},this.copyTextureToTexture=function(E,H,K=null,j=null,W=0){E.isTexture!==!0&&(qs("WebGLRenderer: copyTextureToTexture function signature has changed."),j=arguments[0]||null,E=arguments[1],H=arguments[2],W=arguments[3]||0,K=null);let pt,wt,Nt,zt,qt,jt,Ft,ce,ye;const A=E.isCompressedTexture?E.mipmaps[W]:E.image;K!==null?(pt=K.max.x-K.min.x,wt=K.max.y-K.min.y,Nt=K.isBox3?K.max.z-K.min.z:1,zt=K.min.x,qt=K.min.y,jt=K.isBox3?K.min.z:0):(pt=A.width,wt=A.height,Nt=A.depth||1,zt=0,qt=0,jt=0),j!==null?(Ft=j.x,ce=j.y,ye=j.z):(Ft=0,ce=0,ye=0);const z=Jt.convert(H.format),R=Jt.convert(H.type);let N;H.isData3DTexture?(U.setTexture3D(H,0),N=X.TEXTURE_3D):H.isDataArrayTexture||H.isCompressedArrayTexture?(U.setTexture2DArray(H,0),N=X.TEXTURE_2D_ARRAY):(U.setTexture2D(H,0),N=X.TEXTURE_2D),X.pixelStorei(X.UNPACK_FLIP_Y_WEBGL,H.flipY),X.pixelStorei(X.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),X.pixelStorei(X.UNPACK_ALIGNMENT,H.unpackAlignment);const G=X.getParameter(X.UNPACK_ROW_LENGTH),q=X.getParameter(X.UNPACK_IMAGE_HEIGHT),Z=X.getParameter(X.UNPACK_SKIP_PIXELS),lt=X.getParameter(X.UNPACK_SKIP_ROWS),Xt=X.getParameter(X.UNPACK_SKIP_IMAGES);X.pixelStorei(X.UNPACK_ROW_LENGTH,A.width),X.pixelStorei(X.UNPACK_IMAGE_HEIGHT,A.height),X.pixelStorei(X.UNPACK_SKIP_PIXELS,zt),X.pixelStorei(X.UNPACK_SKIP_ROWS,qt),X.pixelStorei(X.UNPACK_SKIP_IMAGES,jt);const me=E.isDataArrayTexture||E.isData3DTexture,fe=H.isDataArrayTexture||H.isData3DTexture;if(E.isRenderTargetTexture||E.isDepthTexture){const Ne=Ht.get(E),pn=Ht.get(H),Ve=Ht.get(Ne.__renderTarget),hn=Ht.get(pn.__renderTarget);Gt.bindFramebuffer(X.READ_FRAMEBUFFER,Ve.__webglFramebuffer),Gt.bindFramebuffer(X.DRAW_FRAMEBUFFER,hn.__webglFramebuffer);for(let fn=0;fn<Nt;fn++)me&&X.framebufferTextureLayer(X.READ_FRAMEBUFFER,X.COLOR_ATTACHMENT0,Ht.get(E).__webglTexture,W,jt+fn),E.isDepthTexture?(fe&&X.framebufferTextureLayer(X.DRAW_FRAMEBUFFER,X.COLOR_ATTACHMENT0,Ht.get(H).__webglTexture,W,ye+fn),X.blitFramebuffer(zt,qt,pt,wt,Ft,ce,pt,wt,X.DEPTH_BUFFER_BIT,X.NEAREST)):fe?X.copyTexSubImage3D(N,W,Ft,ce,ye+fn,zt,qt,pt,wt):X.copyTexSubImage2D(N,W,Ft,ce,ye+fn,zt,qt,pt,wt);Gt.bindFramebuffer(X.READ_FRAMEBUFFER,null),Gt.bindFramebuffer(X.DRAW_FRAMEBUFFER,null)}else fe?E.isDataTexture||E.isData3DTexture?X.texSubImage3D(N,W,Ft,ce,ye,pt,wt,Nt,z,R,A.data):H.isCompressedArrayTexture?X.compressedTexSubImage3D(N,W,Ft,ce,ye,pt,wt,Nt,z,A.data):X.texSubImage3D(N,W,Ft,ce,ye,pt,wt,Nt,z,R,A):E.isDataTexture?X.texSubImage2D(X.TEXTURE_2D,W,Ft,ce,pt,wt,z,R,A.data):E.isCompressedTexture?X.compressedTexSubImage2D(X.TEXTURE_2D,W,Ft,ce,A.width,A.height,z,A.data):X.texSubImage2D(X.TEXTURE_2D,W,Ft,ce,pt,wt,z,R,A);X.pixelStorei(X.UNPACK_ROW_LENGTH,G),X.pixelStorei(X.UNPACK_IMAGE_HEIGHT,q),X.pixelStorei(X.UNPACK_SKIP_PIXELS,Z),X.pixelStorei(X.UNPACK_SKIP_ROWS,lt),X.pixelStorei(X.UNPACK_SKIP_IMAGES,Xt),W===0&&H.generateMipmaps&&X.generateMipmap(N),Gt.unbindTexture()},this.copyTextureToTexture3D=function(E,H,K=null,j=null,W=0){return E.isTexture!==!0&&(qs("WebGLRenderer: copyTextureToTexture3D function signature has changed."),K=arguments[0]||null,j=arguments[1]||null,E=arguments[2],H=arguments[3],W=arguments[4]||0),qs('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(E,H,K,j,W)},this.initRenderTarget=function(E){Ht.get(E).__webglFramebuffer===void 0&&U.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?U.setTextureCube(E,0):E.isData3DTexture?U.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?U.setTexture2DArray(E,0):U.setTexture2D(E,0),Gt.unbindTexture()},this.resetState=function(){L=0,D=0,I=null,Gt.reset(),Ee.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Kn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=he._getDrawingBufferColorSpace(t),e.unpackColorSpace=he._getUnpackColorSpace()}}class mi{constructor(t,e=1,i=1e3){this.isFog=!0,this.name="",this.color=new vt(t),this.near=e,this.far=i}clone(){return new mi(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class ll extends Ge{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Pn,this.environmentIntensity=1,this.environmentRotation=new Pn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class rg{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Va,this.updateRanges=[],this.version=0,this.uuid=jn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,i){t*=this.stride,i*=e.stride;for(let s=0,o=this.stride;s<o;s++)this.array[t+s]=e.array[i+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=jn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(e,this.stride);return i.setUsage(this.usage),i}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=jn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const on=new w;class Qo{constructor(t,e,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,i=this.data.count;e<i;e++)on.fromBufferAttribute(this,e),on.applyMatrix4(t),this.setXYZ(e,on.x,on.y,on.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)on.fromBufferAttribute(this,e),on.applyNormalMatrix(t),this.setXYZ(e,on.x,on.y,on.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)on.fromBufferAttribute(this,e),on.transformDirection(t),this.setXYZ(e,on.x,on.y,on.z);return this}getComponent(t,e){let i=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(i=Tn(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=ve(i,this.array)),this.data.array[t*this.data.stride+this.offset+e]=i,this}setX(t,e){return this.normalized&&(e=ve(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=ve(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=ve(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=ve(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=Tn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=Tn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=Tn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=Tn(e,this.array)),e}setXY(t,e,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=ve(e,this.array),i=ve(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this}setXYZ(t,e,i,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=ve(e,this.array),i=ve(i,this.array),s=ve(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=s,this}setXYZW(t,e,i,s,o){return t=t*this.data.stride+this.offset,this.normalized&&(e=ve(e,this.array),i=ve(i,this.array),s=ve(s,this.array),o=ve(o,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=s,this.data.array[t+3]=o,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let o=0;o<this.itemSize;o++)e.push(this.data.array[s+o])}return new Oe(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Qo(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let o=0;o<this.itemSize;o++)e.push(this.data.array[s+o])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class zn extends ni{static get type(){return"SpriteMaterial"}constructor(t){super(),this.isSpriteMaterial=!0,this.color=new vt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let ls;const ks=new w,cs=new w,ds=new w,us=new Dt,Gs=new Dt,_d=new be,Uo=new w,Hs=new w,No=new w,vc=new Dt,Wr=new Dt,_c=new Dt;class Qn extends Ge{constructor(t=new zn){if(super(),this.isSprite=!0,this.type="Sprite",ls===void 0){ls=new Pe;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new rg(e,5);ls.setIndex([0,1,2,0,2,3]),ls.setAttribute("position",new Qo(i,3,0,!1)),ls.setAttribute("uv",new Qo(i,2,3,!1))}this.geometry=ls,this.material=t,this.center=new Dt(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),cs.setFromMatrixScale(this.matrixWorld),_d.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),ds.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&cs.multiplyScalar(-ds.z);const i=this.material.rotation;let s,o;i!==0&&(o=Math.cos(i),s=Math.sin(i));const r=this.center;zo(Uo.set(-.5,-.5,0),ds,r,cs,s,o),zo(Hs.set(.5,-.5,0),ds,r,cs,s,o),zo(No.set(.5,.5,0),ds,r,cs,s,o),vc.set(0,0),Wr.set(1,0),_c.set(1,1);let a=t.ray.intersectTriangle(Uo,Hs,No,!1,ks);if(a===null&&(zo(Hs.set(-.5,.5,0),ds,r,cs,s,o),Wr.set(0,1),a=t.ray.intersectTriangle(Uo,No,Hs,!1,ks),a===null))return;const l=t.ray.origin.distanceTo(ks);l<t.near||l>t.far||e.push({distance:l,point:ks.clone(),uv:Sn.getInterpolation(ks,Uo,Hs,No,vc,Wr,_c,new Dt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function zo(n,t,e,i,s,o){us.subVectors(n,e).addScalar(.5).multiply(i),s!==void 0?(Gs.x=o*us.x-s*us.y,Gs.y=s*us.x+o*us.y):Gs.copy(us),n.copy(t),n.x+=Gs.x,n.y+=Gs.y,n.applyMatrix4(_d)}class hr extends ni{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new vt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const tr=new w,er=new w,Mc=new be,Vs=new dr,Fo=new ao,Xr=new w,yc=new w;class cl extends Ge{constructor(t=new Pe,e=new hr){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[0];for(let s=1,o=e.count;s<o;s++)tr.fromBufferAttribute(e,s-1),er.fromBufferAttribute(e,s),i[s]=i[s-1],i[s]+=tr.distanceTo(er);t.setAttribute("lineDistance",new Ce(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const i=this.geometry,s=this.matrixWorld,o=t.params.Line.threshold,r=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Fo.copy(i.boundingSphere),Fo.applyMatrix4(s),Fo.radius+=o,t.ray.intersectsSphere(Fo)===!1)return;Mc.copy(s).invert(),Vs.copy(t.ray).applyMatrix4(Mc);const a=o/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,d=i.index,u=i.attributes.position;if(d!==null){const f=Math.max(0,r.start),m=Math.min(d.count,r.start+r.count);for(let v=f,g=m-1;v<g;v+=c){const p=d.getX(v),T=d.getX(v+1),_=Oo(this,t,Vs,l,p,T);_&&e.push(_)}if(this.isLineLoop){const v=d.getX(m-1),g=d.getX(f),p=Oo(this,t,Vs,l,v,g);p&&e.push(p)}}else{const f=Math.max(0,r.start),m=Math.min(u.count,r.start+r.count);for(let v=f,g=m-1;v<g;v+=c){const p=Oo(this,t,Vs,l,v,v+1);p&&e.push(p)}if(this.isLineLoop){const v=Oo(this,t,Vs,l,m-1,f);v&&e.push(v)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,r=s.length;o<r;o++){const a=s[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=o}}}}}function Oo(n,t,e,i,s,o){const r=n.geometry.attributes.position;if(tr.fromBufferAttribute(r,s),er.fromBufferAttribute(r,o),e.distanceSqToSegment(tr,er,Xr,yc)>i)return;Xr.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(Xr);if(!(l<t.near||l>t.far))return{distance:l,point:yc.clone().applyMatrix4(n.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:n}}class Ts extends ni{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new vt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const xc=new be,Xa=new dr,Bo=new ao,ko=new w;class io extends Ge{constructor(t=new Pe,e=new Ts){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const i=this.geometry,s=this.matrixWorld,o=t.params.Points.threshold,r=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Bo.copy(i.boundingSphere),Bo.applyMatrix4(s),Bo.radius+=o,t.ray.intersectsSphere(Bo)===!1)return;xc.copy(s).invert(),Xa.copy(t.ray).applyMatrix4(xc);const a=o/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=i.index,h=i.attributes.position;if(c!==null){const u=Math.max(0,r.start),f=Math.min(c.count,r.start+r.count);for(let m=u,v=f;m<v;m++){const g=c.getX(m);ko.fromBufferAttribute(h,g),Sc(ko,g,l,s,t,e,this)}}else{const u=Math.max(0,r.start),f=Math.min(h.count,r.start+r.count);for(let m=u,v=f;m<v;m++)ko.fromBufferAttribute(h,m),Sc(ko,m,l,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,r=s.length;o<r;o++){const a=s[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=o}}}}}function Sc(n,t,e,i,s,o,r){const a=Xa.distanceSqToPoint(n);if(a<e){const l=new w;Xa.closestPointToPoint(n,l),l.applyMatrix4(i);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;o.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:r})}}class je extends cn{constructor(t,e,i,s,o,r,a,l,c){super(t,e,i,s,o,r,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class ii{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let i,s=this.getPoint(0),o=0;e.push(0);for(let r=1;r<=t;r++)i=this.getPoint(r/t),o+=i.distanceTo(s),e.push(o),s=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const i=this.getLengths();let s=0;const o=i.length;let r;e?r=e:r=t*i[o-1];let a=0,l=o-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=i[s]-r,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,i[s]===r)return s/(o-1);const d=i[s],u=i[s+1]-d,f=(r-d)/u;return(s+f)/(o-1)}getTangent(t,e){let s=t-1e-4,o=t+1e-4;s<0&&(s=0),o>1&&(o=1);const r=this.getPoint(s),a=this.getPoint(o),l=e||(r.isVector2?new Dt:new w);return l.copy(a).sub(r).normalize(),l}getTangentAt(t,e){const i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e){const i=new w,s=[],o=[],r=[],a=new w,l=new be;for(let f=0;f<=t;f++){const m=f/t;s[f]=this.getTangentAt(m,new w)}o[0]=new w,r[0]=new w;let c=Number.MAX_VALUE;const d=Math.abs(s[0].x),h=Math.abs(s[0].y),u=Math.abs(s[0].z);d<=c&&(c=d,i.set(1,0,0)),h<=c&&(c=h,i.set(0,1,0)),u<=c&&i.set(0,0,1),a.crossVectors(s[0],i).normalize(),o[0].crossVectors(s[0],a),r[0].crossVectors(s[0],o[0]);for(let f=1;f<=t;f++){if(o[f]=o[f-1].clone(),r[f]=r[f-1].clone(),a.crossVectors(s[f-1],s[f]),a.length()>Number.EPSILON){a.normalize();const m=Math.acos(Ke(s[f-1].dot(s[f]),-1,1));o[f].applyMatrix4(l.makeRotationAxis(a,m))}r[f].crossVectors(s[f],o[f])}if(e===!0){let f=Math.acos(Ke(o[0].dot(o[t]),-1,1));f/=t,s[0].dot(a.crossVectors(o[0],o[t]))>0&&(f=-f);for(let m=1;m<=t;m++)o[m].applyMatrix4(l.makeRotationAxis(s[m],f*m)),r[m].crossVectors(s[m],o[m])}return{tangents:s,normals:o,binormals:r}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Md extends ii{constructor(t=0,e=0,i=1,s=1,o=0,r=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=i,this.yRadius=s,this.aStartAngle=o,this.aEndAngle=r,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new Dt){const i=e,s=Math.PI*2;let o=this.aEndAngle-this.aStartAngle;const r=Math.abs(o)<Number.EPSILON;for(;o<0;)o+=s;for(;o>s;)o-=s;o<Number.EPSILON&&(r?o=0:o=s),this.aClockwise===!0&&!r&&(o===s?o=-s:o=o-s);const a=this.aStartAngle+t*o;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const d=Math.cos(this.aRotation),h=Math.sin(this.aRotation),u=l-this.aX,f=c-this.aY;l=u*d-f*h+this.aX,c=u*h+f*d+this.aY}return i.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class ag extends Md{constructor(t,e,i,s,o,r){super(t,e,i,i,s,o,r),this.isArcCurve=!0,this.type="ArcCurve"}}function dl(){let n=0,t=0,e=0,i=0;function s(o,r,a,l){n=o,t=a,e=-3*o+3*r-2*a-l,i=2*o-2*r+a+l}return{initCatmullRom:function(o,r,a,l,c){s(r,a,c*(a-o),c*(l-r))},initNonuniformCatmullRom:function(o,r,a,l,c,d,h){let u=(r-o)/c-(a-o)/(c+d)+(a-r)/d,f=(a-r)/d-(l-r)/(d+h)+(l-a)/h;u*=d,f*=d,s(r,a,u,f)},calc:function(o){const r=o*o,a=r*o;return n+t*o+e*r+i*a}}}const Go=new w,qr=new dl,Yr=new dl,$r=new dl;class ln extends ii{constructor(t=[],e=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=s}getPoint(t,e=new w){const i=e,s=this.points,o=s.length,r=(o-(this.closed?0:1))*t;let a=Math.floor(r),l=r-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/o)+1)*o:l===0&&a===o-1&&(a=o-2,l=1);let c,d;this.closed||a>0?c=s[(a-1)%o]:(Go.subVectors(s[0],s[1]).add(s[0]),c=Go);const h=s[a%o],u=s[(a+1)%o];if(this.closed||a+2<o?d=s[(a+2)%o]:(Go.subVectors(s[o-1],s[o-2]).add(s[o-1]),d=Go),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let m=Math.pow(c.distanceToSquared(h),f),v=Math.pow(h.distanceToSquared(u),f),g=Math.pow(u.distanceToSquared(d),f);v<1e-4&&(v=1),m<1e-4&&(m=v),g<1e-4&&(g=v),qr.initNonuniformCatmullRom(c.x,h.x,u.x,d.x,m,v,g),Yr.initNonuniformCatmullRom(c.y,h.y,u.y,d.y,m,v,g),$r.initNonuniformCatmullRom(c.z,h.z,u.z,d.z,m,v,g)}else this.curveType==="catmullrom"&&(qr.initCatmullRom(c.x,h.x,u.x,d.x,this.tension),Yr.initCatmullRom(c.y,h.y,u.y,d.y,this.tension),$r.initCatmullRom(c.z,h.z,u.z,d.z,this.tension));return i.set(qr.calc(l),Yr.calc(l),$r.calc(l)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(new w().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function wc(n,t,e,i,s){const o=(i-t)*.5,r=(s-e)*.5,a=n*n,l=n*a;return(2*e-2*i+o+r)*l+(-3*e+3*i-2*o-r)*a+o*n+e}function lg(n,t){const e=1-n;return e*e*t}function cg(n,t){return 2*(1-n)*n*t}function dg(n,t){return n*n*t}function Js(n,t,e,i){return lg(n,t)+cg(n,e)+dg(n,i)}function ug(n,t){const e=1-n;return e*e*e*t}function hg(n,t){const e=1-n;return 3*e*e*n*t}function fg(n,t){return 3*(1-n)*n*n*t}function pg(n,t){return n*n*n*t}function Qs(n,t,e,i,s){return ug(n,t)+hg(n,e)+fg(n,i)+pg(n,s)}class mg extends ii{constructor(t=new Dt,e=new Dt,i=new Dt,s=new Dt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new Dt){const i=e,s=this.v0,o=this.v1,r=this.v2,a=this.v3;return i.set(Qs(t,s.x,o.x,r.x,a.x),Qs(t,s.y,o.y,r.y,a.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class gg extends ii{constructor(t=new w,e=new w,i=new w,s=new w){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new w){const i=e,s=this.v0,o=this.v1,r=this.v2,a=this.v3;return i.set(Qs(t,s.x,o.x,r.x,a.x),Qs(t,s.y,o.y,r.y,a.y),Qs(t,s.z,o.z,r.z,a.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class vg extends ii{constructor(t=new Dt,e=new Dt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new Dt){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new Dt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class _g extends ii{constructor(t=new w,e=new w){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new w){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new w){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Mg extends ii{constructor(t=new Dt,e=new Dt,i=new Dt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new Dt){const i=e,s=this.v0,o=this.v1,r=this.v2;return i.set(Js(t,s.x,o.x,r.x),Js(t,s.y,o.y,r.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class yd extends ii{constructor(t=new w,e=new w,i=new w){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new w){const i=e,s=this.v0,o=this.v1,r=this.v2;return i.set(Js(t,s.x,o.x,r.x),Js(t,s.y,o.y,r.y),Js(t,s.z,o.z,r.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class yg extends ii{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new Dt){const i=e,s=this.points,o=(s.length-1)*t,r=Math.floor(o),a=o-r,l=s[r===0?r:r-1],c=s[r],d=s[r>s.length-2?s.length-1:r+1],h=s[r>s.length-3?s.length-1:r+2];return i.set(wc(a,l.x,c.x,d.x,h.x),wc(a,l.y,c.y,d.y,h.y)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(new Dt().fromArray(s))}return this}}var xg=Object.freeze({__proto__:null,ArcCurve:ag,CatmullRomCurve3:ln,CubicBezierCurve:mg,CubicBezierCurve3:gg,EllipseCurve:Md,LineCurve:vg,LineCurve3:_g,QuadraticBezierCurve:Mg,QuadraticBezierCurve3:yd,SplineCurve:yg});class On extends Pe{constructor(t=1,e=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:i,thetaLength:s},e=Math.max(3,e);const o=[],r=[],a=[],l=[],c=new w,d=new Dt;r.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let h=0,u=3;h<=e;h++,u+=3){const f=i+h/e*s;c.x=t*Math.cos(f),c.y=t*Math.sin(f),r.push(c.x,c.y,c.z),a.push(0,0,1),d.x=(r[u]/t+1)/2,d.y=(r[u+1]/t+1)/2,l.push(d.x,d.y)}for(let h=1;h<=e;h++)o.push(h,h+1,0);this.setIndex(o),this.setAttribute("position",new Ce(r,3)),this.setAttribute("normal",new Ce(a,3)),this.setAttribute("uv",new Ce(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new On(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class bt extends Pe{constructor(t=1,e=1,i=1,s=32,o=1,r=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:s,heightSegments:o,openEnded:r,thetaStart:a,thetaLength:l};const c=this;s=Math.floor(s),o=Math.floor(o);const d=[],h=[],u=[],f=[];let m=0;const v=[],g=i/2;let p=0;T(),r===!1&&(t>0&&_(!0),e>0&&_(!1)),this.setIndex(d),this.setAttribute("position",new Ce(h,3)),this.setAttribute("normal",new Ce(u,3)),this.setAttribute("uv",new Ce(f,2));function T(){const M=new w,F=new w;let L=0;const D=(e-t)/i;for(let I=0;I<=o;I++){const y=[],x=I/o,P=x*(e-t)+t;for(let O=0;O<=s;O++){const V=O/s,Q=V*l+a,nt=Math.sin(Q),tt=Math.cos(Q);F.x=P*nt,F.y=-x*i+g,F.z=P*tt,h.push(F.x,F.y,F.z),M.set(nt,D,tt).normalize(),u.push(M.x,M.y,M.z),f.push(V,1-x),y.push(m++)}v.push(y)}for(let I=0;I<s;I++)for(let y=0;y<o;y++){const x=v[y][I],P=v[y+1][I],O=v[y+1][I+1],V=v[y][I+1];(t>0||y!==0)&&(d.push(x,P,V),L+=3),(e>0||y!==o-1)&&(d.push(P,O,V),L+=3)}c.addGroup(p,L,0),p+=L}function _(M){const F=m,L=new Dt,D=new w;let I=0;const y=M===!0?t:e,x=M===!0?1:-1;for(let O=1;O<=s;O++)h.push(0,g*x,0),u.push(0,x,0),f.push(.5,.5),m++;const P=m;for(let O=0;O<=s;O++){const Q=O/s*l+a,nt=Math.cos(Q),tt=Math.sin(Q);D.x=y*tt,D.y=g*x,D.z=y*nt,h.push(D.x,D.y,D.z),u.push(0,x,0),L.x=nt*.5+.5,L.y=tt*.5*x+.5,f.push(L.x,L.y),m++}for(let O=0;O<s;O++){const V=F+O,Q=P+O;M===!0?d.push(Q,Q+1,V):d.push(Q+1,Q,V),I+=3}c.addGroup(p,I,M===!0?1:2),p+=I}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new bt(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class nn extends bt{constructor(t=1,e=1,i=32,s=1,o=!1,r=0,a=Math.PI*2){super(0,t,e,i,s,o,r,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:i,heightSegments:s,openEnded:o,thetaStart:r,thetaLength:a}}static fromJSON(t){return new nn(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class fr extends Pe{constructor(t=[],e=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:i,detail:s};const o=[],r=[];a(s),c(i),d(),this.setAttribute("position",new Ce(o,3)),this.setAttribute("normal",new Ce(o.slice(),3)),this.setAttribute("uv",new Ce(r,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(T){const _=new w,M=new w,F=new w;for(let L=0;L<e.length;L+=3)f(e[L+0],_),f(e[L+1],M),f(e[L+2],F),l(_,M,F,T)}function l(T,_,M,F){const L=F+1,D=[];for(let I=0;I<=L;I++){D[I]=[];const y=T.clone().lerp(M,I/L),x=_.clone().lerp(M,I/L),P=L-I;for(let O=0;O<=P;O++)O===0&&I===L?D[I][O]=y:D[I][O]=y.clone().lerp(x,O/P)}for(let I=0;I<L;I++)for(let y=0;y<2*(L-I)-1;y++){const x=Math.floor(y/2);y%2===0?(u(D[I][x+1]),u(D[I+1][x]),u(D[I][x])):(u(D[I][x+1]),u(D[I+1][x+1]),u(D[I+1][x]))}}function c(T){const _=new w;for(let M=0;M<o.length;M+=3)_.x=o[M+0],_.y=o[M+1],_.z=o[M+2],_.normalize().multiplyScalar(T),o[M+0]=_.x,o[M+1]=_.y,o[M+2]=_.z}function d(){const T=new w;for(let _=0;_<o.length;_+=3){T.x=o[_+0],T.y=o[_+1],T.z=o[_+2];const M=g(T)/2/Math.PI+.5,F=p(T)/Math.PI+.5;r.push(M,1-F)}m(),h()}function h(){for(let T=0;T<r.length;T+=6){const _=r[T+0],M=r[T+2],F=r[T+4],L=Math.max(_,M,F),D=Math.min(_,M,F);L>.9&&D<.1&&(_<.2&&(r[T+0]+=1),M<.2&&(r[T+2]+=1),F<.2&&(r[T+4]+=1))}}function u(T){o.push(T.x,T.y,T.z)}function f(T,_){const M=T*3;_.x=t[M+0],_.y=t[M+1],_.z=t[M+2]}function m(){const T=new w,_=new w,M=new w,F=new w,L=new Dt,D=new Dt,I=new Dt;for(let y=0,x=0;y<o.length;y+=9,x+=6){T.set(o[y+0],o[y+1],o[y+2]),_.set(o[y+3],o[y+4],o[y+5]),M.set(o[y+6],o[y+7],o[y+8]),L.set(r[x+0],r[x+1]),D.set(r[x+2],r[x+3]),I.set(r[x+4],r[x+5]),F.copy(T).add(_).add(M).divideScalar(3);const P=g(F);v(L,x+0,T,P),v(D,x+2,_,P),v(I,x+4,M,P)}}function v(T,_,M,F){F<0&&T.x===1&&(r[_]=T.x-1),M.x===0&&M.z===0&&(r[_]=F/2/Math.PI+.5)}function g(T){return Math.atan2(T.z,-T.x)}function p(T){return Math.atan2(-T.y,Math.sqrt(T.x*T.x+T.z*T.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new fr(t.vertices,t.indices,t.radius,t.details)}}class ul extends fr{constructor(t=1,e=0){const i=(1+Math.sqrt(5))/2,s=1/i,o=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-i,0,-s,i,0,s,-i,0,s,i,-s,-i,0,-s,i,0,s,-i,0,s,i,0,-i,0,-s,i,0,-s,-i,0,s,i,0,s],r=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(o,r,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new ul(t.radius,t.detail)}}class Hi extends fr{constructor(t=1,e=0){const i=(1+Math.sqrt(5))/2,s=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],o=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,o,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Hi(t.radius,t.detail)}}class re extends Pe{constructor(t=1,e=32,i=16,s=0,o=Math.PI*2,r=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:s,phiLength:o,thetaStart:r,thetaLength:a},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));const l=Math.min(r+a,Math.PI);let c=0;const d=[],h=new w,u=new w,f=[],m=[],v=[],g=[];for(let p=0;p<=i;p++){const T=[],_=p/i;let M=0;p===0&&r===0?M=.5/e:p===i&&l===Math.PI&&(M=-.5/e);for(let F=0;F<=e;F++){const L=F/e;h.x=-t*Math.cos(s+L*o)*Math.sin(r+_*a),h.y=t*Math.cos(r+_*a),h.z=t*Math.sin(s+L*o)*Math.sin(r+_*a),m.push(h.x,h.y,h.z),u.copy(h).normalize(),v.push(u.x,u.y,u.z),g.push(L+M,1-_),T.push(c++)}d.push(T)}for(let p=0;p<i;p++)for(let T=0;T<e;T++){const _=d[p][T+1],M=d[p][T],F=d[p+1][T],L=d[p+1][T+1];(p!==0||r>0)&&f.push(_,M,L),(p!==i-1||l<Math.PI)&&f.push(M,F,L)}this.setIndex(f),this.setAttribute("position",new Ce(m,3)),this.setAttribute("normal",new Ce(v,3)),this.setAttribute("uv",new Ce(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new re(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Fn extends Pe{constructor(t=1,e=.4,i=12,s=48,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:s,arc:o},i=Math.floor(i),s=Math.floor(s);const r=[],a=[],l=[],c=[],d=new w,h=new w,u=new w;for(let f=0;f<=i;f++)for(let m=0;m<=s;m++){const v=m/s*o,g=f/i*Math.PI*2;h.x=(t+e*Math.cos(g))*Math.cos(v),h.y=(t+e*Math.cos(g))*Math.sin(v),h.z=e*Math.sin(g),a.push(h.x,h.y,h.z),d.x=t*Math.cos(v),d.y=t*Math.sin(v),u.subVectors(h,d).normalize(),l.push(u.x,u.y,u.z),c.push(m/s),c.push(f/i)}for(let f=1;f<=i;f++)for(let m=1;m<=s;m++){const v=(s+1)*f+m-1,g=(s+1)*(f-1)+m-1,p=(s+1)*(f-1)+m,T=(s+1)*f+m;r.push(v,g,T),r.push(g,p,T)}this.setIndex(r),this.setAttribute("position",new Ce(a,3)),this.setAttribute("normal",new Ce(l,3)),this.setAttribute("uv",new Ce(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Fn(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class As extends Pe{constructor(t=new yd(new w(-1,-1,0),new w(-1,1,0),new w(1,1,0)),e=64,i=1,s=8,o=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:i,radialSegments:s,closed:o};const r=t.computeFrenetFrames(e,o);this.tangents=r.tangents,this.normals=r.normals,this.binormals=r.binormals;const a=new w,l=new w,c=new Dt;let d=new w;const h=[],u=[],f=[],m=[];v(),this.setIndex(m),this.setAttribute("position",new Ce(h,3)),this.setAttribute("normal",new Ce(u,3)),this.setAttribute("uv",new Ce(f,2));function v(){for(let _=0;_<e;_++)g(_);g(o===!1?e:0),T(),p()}function g(_){d=t.getPointAt(_/e,d);const M=r.normals[_],F=r.binormals[_];for(let L=0;L<=s;L++){const D=L/s*Math.PI*2,I=Math.sin(D),y=-Math.cos(D);l.x=y*M.x+I*F.x,l.y=y*M.y+I*F.y,l.z=y*M.z+I*F.z,l.normalize(),u.push(l.x,l.y,l.z),a.x=d.x+i*l.x,a.y=d.y+i*l.y,a.z=d.z+i*l.z,h.push(a.x,a.y,a.z)}}function p(){for(let _=1;_<=e;_++)for(let M=1;M<=s;M++){const F=(s+1)*(_-1)+(M-1),L=(s+1)*_+(M-1),D=(s+1)*_+M,I=(s+1)*(_-1)+M;m.push(F,L,I),m.push(L,D,I)}}function T(){for(let _=0;_<=e;_++)for(let M=0;M<=s;M++)c.x=_/e,c.y=M/s,f.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new As(new xg[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}class Y extends ni{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new vt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new vt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=nl,this.normalScale=new Dt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Pn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class qe extends ni{static get type(){return"MeshLambertMaterial"}constructor(t){super(),this.isMeshLambertMaterial=!0,this.color=new vt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new vt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=nl,this.normalScale=new Dt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Pn,this.combine=Za,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class pr extends Ge{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new vt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class xd extends pr{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ge.DEFAULT_UP),this.updateMatrix(),this.groundColor=new vt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Zr=new be,bc=new w,Ec=new w;class Sd{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Dt(512,512),this.map=null,this.mapPass=null,this.matrix=new be,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ol,this._frameExtents=new Dt(1,1),this._viewportCount=1,this._viewports=[new Se(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;bc.setFromMatrixPosition(t.matrixWorld),e.position.copy(bc),Ec.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Ec),e.updateMatrixWorld(),Zr.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Zr),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Zr)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Tc=new be,Ws=new w,Kr=new w;class Sg extends Sd{constructor(){super(new Ae(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Dt(4,2),this._viewportCount=6,this._viewports=[new Se(2,1,1,1),new Se(0,1,1,1),new Se(3,1,1,1),new Se(1,1,1,1),new Se(3,0,1,1),new Se(1,0,1,1)],this._cubeDirections=[new w(1,0,0),new w(-1,0,0),new w(0,0,1),new w(0,0,-1),new w(0,1,0),new w(0,-1,0)],this._cubeUps=[new w(0,1,0),new w(0,1,0),new w(0,1,0),new w(0,1,0),new w(0,0,1),new w(0,0,-1)]}updateMatrices(t,e=0){const i=this.camera,s=this.matrix,o=t.distance||i.far;o!==i.far&&(i.far=o,i.updateProjectionMatrix()),Ws.setFromMatrixPosition(t.matrixWorld),i.position.copy(Ws),Kr.copy(i.position),Kr.add(this._cubeDirections[e]),i.up.copy(this._cubeUps[e]),i.lookAt(Kr),i.updateMatrixWorld(),s.makeTranslation(-Ws.x,-Ws.y,-Ws.z),Tc.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Tc)}}class hl extends pr{constructor(t,e,i=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new Sg}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class wg extends Sd{constructor(){super(new hd(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class wd extends pr{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ge.DEFAULT_UP),this.updateMatrix(),this.target=new Ge,this.shadow=new wg}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class bd extends pr{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}const Ac=new be;class bg{constructor(t,e,i=0,s=1/0){this.ray=new dr(t,e),this.near=i,this.far=s,this.camera=null,this.layers=new sl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Ac.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Ac),this}intersectObject(t,e=!0,i=[]){return qa(t,this,i,e),i.sort(Cc),i}intersectObjects(t,e=!0,i=[]){for(let s=0,o=t.length;s<o;s++)qa(t[s],this,i,e);return i.sort(Cc),i}}function Cc(n,t){return n.distance-t.distance}function qa(n,t,e,i){let s=!0;if(n.layers.test(t.layers)&&n.raycast(t,e)===!1&&(s=!1),s===!0&&i===!0){const o=n.children;for(let r=0,a=o.length;r<a;r++)qa(o[r],t,e,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:$a}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=$a);let we=!1;function Eg(n){we=n}function vs(){return we}const ne={skyTop:14930610,skyMid:15524034,skyHorizon:16116950,sun:15317355,ground:13811085,groundDark:12559992,walnut:5917238,walnutDark:4338986,bronze:10125655,terracotta:12618344,amber:13608308,hill:12759693,path:16777215,pathEdge:15789280};function Rn(n,t){const e=document.createElement("canvas");e.width=128,e.height=128;const i=e.getContext("2d"),s=i.createRadialGradient(64,64,64*n,64,64,64);s.addColorStop(0,t),s.addColorStop(1,"rgba(0,0,0,0)"),i.fillStyle=s,i.fillRect(0,0,128,128);const o=new je(e);return o.colorSpace=_e,o}function Rc(n,t,e){const i=t.split(" "),s=[];let o="";for(const r of i){const a=o?o+" "+r:r;n.measureText(a).width>e&&o?(s.push(o),o=r):o=a}return o&&s.push(o),s}function Ed(){const n=document.createElement("canvas");n.width=256,n.height=256;const t=n.getContext("2d");t.fillStyle="#cdb98c",t.fillRect(0,0,256,256);for(let i=0;i<26;i++){const s=172+Math.random()*34;t.fillStyle=`rgba(${s|0},${s*.93|0},${s*.74|0},${(.05+Math.random()*.1).toFixed(3)})`,t.beginPath(),t.ellipse(Math.random()*256,Math.random()*256,14+Math.random()*30,10+Math.random()*22,Math.random()*Math.PI,0,Math.PI*2),t.fill()}for(let i=0;i<2200;i++){const s=168+Math.random()*42;t.fillStyle=`rgba(${s|0},${s*.92|0},${s*.72|0},${(Math.random()*.16).toFixed(3)})`,t.fillRect(Math.random()*256,Math.random()*256,2+Math.random()*4,2+Math.random()*4)}for(let i=0;i<120;i++)t.fillStyle="rgba(110,86,52,"+(.12+Math.random()*.2).toFixed(3)+")",t.beginPath(),t.arc(Math.random()*256,Math.random()*256,1+Math.random()*2,0,Math.PI*2),t.fill();const e=new je(n);return e.colorSpace=_e,e.wrapS=e.wrapT=yi,e.repeat.set(we?48:90,we?48:90),e.anisotropy=we?2:8,e}function hs(){const n=document.createElement("canvas");n.width=256,n.height=256;const t=n.getContext("2d");t.fillStyle="#212429",t.fillRect(0,0,256,256);for(let i=0;i<4600;i++){const s=26+Math.random()*40;t.fillStyle=`rgba(${s|0},${s*.98|0},${s*1.04|0},${(Math.random()*.28).toFixed(3)})`,t.fillRect(Math.random()*256,Math.random()*256,1+Math.random()*2,1+Math.random()*2)}for(let i=0;i<700;i++)t.fillStyle=`rgba(118,124,134,${(Math.random()*.1).toFixed(3)})`,t.fillRect(Math.random()*256,Math.random()*256,1+Math.random()*2,1+Math.random()*2);for(const i of[42,178]){const s=t.createLinearGradient(i,0,i+34,256);s.addColorStop(0,"rgba(8,10,12,0)"),s.addColorStop(.5,"rgba(8,10,12,0.5)"),s.addColorStop(1,"rgba(8,10,12,0)"),t.fillStyle=s,t.fillRect(i,0,34,256)}t.fillStyle="rgba(6,8,11,0.38)",t.fillRect(127,0,2,256);const e=new je(n);return e.colorSpace=_e,e.wrapS=e.wrapT=yi,e.repeat.set(1,60),e.anisotropy=we?2:8,e}function Yn(n,t,e,i,s=500,o=!1){const r=n.getSpacedPoints(s),a=new Float32Array((s+1)*6),l=new Float32Array((s+1)*4),c=new Uint32Array(s*6);for(let u=0;u<=s;u++){const f=r[Math.min(u,s-1)],m=r[Math.min(u+1,s-1)],v=new w().subVectors(m,f).normalize(),g=new w(-v.z,0,v.x).normalize(),p=f.clone().add(g.clone().multiplyScalar(-t/2)),T=f.clone().add(g.clone().multiplyScalar(t/2)),_=u*6;if(a[_]=p.x,a[_+1]=p.y,a[_+2]=p.z,a[_+3]=T.x,a[_+4]=T.y,a[_+5]=T.z,l[u*4]=0,l[u*4+1]=u/s,l[u*4+2]=1,l[u*4+3]=u/s,u<s){const M=u*2,F=u*2+1,L=u*2+2,D=u*2+3,I=u*6;c[I]=M,c[I+1]=L,c[I+2]=F,c[I+3]=F,c[I+4]=L,c[I+5]=D}}const d=new Pe;d.setAttribute("position",new Oe(a,3)),d.setAttribute("uv",new Oe(l,2)),d.setIndex(new Oe(c,1)),d.computeVertexNormals();const h=new C(d,o?new Fe({color:e,side:ze}):new Y({color:e,roughness:.85,metalness:.02,map:i||null,side:ze}));return h.receiveShadow=!0,h}function Td(n,t,e,i,s){const o=new Et,r=t.getPointAt(e),a=t.getTangentAt(e),c=new w(-a.z,0,a.x).normalize().clone().multiplyScalar(i*7.4),d=s%3-1;o.position.set(r.x+c.x+d*.5,0,r.z+c.z+d*.5);const h=t.getPointAt(Math.max(0,e-.035)),u=new w().subVectors(h,o.position).normalize(),f=Math.atan2(u.x,u.z);o.rotation.y=f;const m=new Y({color:ne.walnut,roughness:.8,metalness:.05}),v=new C(new dt(6.6,4.4,.22),m);v.position.y=3,v.castShadow=!0,o.add(v);const g=new Y({color:12035198,roughness:.92}),p=new C(new dt(5.6,.4,.8),g);p.position.y=.2,p.castShadow=!0,o.add(p);const T=new Y({color:10125655,roughness:.9}),_=new Y({color:4338986,roughness:1}),M=new Y({color:6257226,roughness:1,flatShading:!0});for(const ht of[-2.9,2.9]){const B=new C(new dt(.5,.34,.5),T);B.position.set(ht,.17,.55),o.add(B);const ut=new C(new dt(.42,.1,.42),_);ut.position.set(ht,.34,.55),o.add(ut);for(const gt of[-.1,.12]){const yt=new C(new Hi(.14,1),M);yt.position.set(ht+gt,.42,.55),o.add(yt);const st=new C(new re(.05,6,5),new Y({color:ht<0?12618344:13608308,roughness:.9}));st.position.set(ht+gt,.52,.55),o.add(st)}}const F=new Y({color:ne.bronze,roughness:.75,metalness:.12}),L=new C(new dt(7,.26,.3),F);L.position.y=5.32,o.add(L);const D=new C(new dt(7,.26,.3),F);D.position.y=.72,o.add(D);for(const ht of[-3.5,3.5]){const B=new C(new dt(.26,4.8,.3),F);B.position.set(ht,3,0),o.add(B)}const I=new Y({color:ne.walnutDark,roughness:.7,metalness:.1});for(const ht of[-2.5,2.5]){const B=new C(new dt(.32,.8,.32),I);B.position.set(ht,.4,0),B.castShadow=!0,o.add(B)}const y=we?640:1024,x=we?480:768,P=document.createElement("canvas");P.width=y,P.height=x,Tg(P.getContext("2d"),n,s,y,x);const O=new je(P);O.colorSpace=_e,O.anisotropy=we?2:8;const V=new qe({map:O});V.emissive=new vt(16777215),V.emissiveIntensity=0;const Q=new C(new Kt(6.2,4),V);Q.position.set(0,3,.125),o.add(Q);const nt=new C(new Kt(6.2,4),new Y({color:ne.walnutDark,roughness:.9}));nt.position.set(0,3,-.125),nt.rotation.y=Math.PI,o.add(nt);const tt=we?null:new hl(15246172,0,26,2);tt&&(tt.position.set(0,3.3,2.4),o.add(tt));const it=new Y({color:ne.amber,emissive:ne.amber,emissiveIntensity:.22}),J=new C(new re(.09,12,12),it);return J.position.set(0,5.52,0),o.add(J),{group:o,frontMat:V,light:tt,beaconMat:it,front:Q,restRot:f}}function Tg(n,t,e,i=1024,s=768){const o=i,r=s;n.scale(i/1024,s/768);const a=n.createLinearGradient(0,0,0,r);a.addColorStop(0,"#fdf8ec"),a.addColorStop(.55,"#f7eed7"),a.addColorStop(1,"#efe1c2"),n.fillStyle=a,n.fillRect(0,0,o,r);const l=n.createRadialGradient(o/2,r*.42,40,o/2,r*.42,o*.55);l.addColorStop(0,"rgba(255,244,216,0.55)"),l.addColorStop(1,"rgba(255,244,216,0)"),n.fillStyle=l,n.fillRect(0,0,o,r),n.globalAlpha=.05;for(let u=0;u<900;u++)n.fillStyle=Math.random()>.5?"#7a5f38":"#ffffff",n.fillRect(Math.random()*o,Math.random()*r,2,2);n.globalAlpha=1,n.strokeStyle="rgba(122,95,56,0.28)",n.lineWidth=3,n.strokeRect(34,34,o-68,r-68),n.strokeStyle="rgba(192,138,104,0.22)",n.lineWidth=1.5,n.strokeRect(52,52,o-104,r-104),n.fillStyle="#c08a68";for(const[u,f,m,v]of[[34,34,1,1],[o-34,34,-1,1],[34,r-34,1,-1],[o-34,r-34,-1,-1]])n.fillRect(u+m*8,f+v*8,26*m,4*v),n.fillRect(u+m*8,f+v*8,4*m,26*v);n.fillStyle="rgba(192,138,104,0.14)",n.fillRect(70,64,o-140,56),n.fillStyle="rgba(207,165,116,0.55)",n.fillRect(70,118,o-140,2),n.fillStyle="#8a6a4e",n.font="500 26px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",n.textAlign="left",n.letterSpacing="6px",n.fillText(t.kicker.toUpperCase(),70,96),n.letterSpacing="0px",n.fillStyle="rgba(207,165,116,0.16)",n.font="600 300px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",n.textAlign="right",n.fillText(t.num,o-60,360),n.fillStyle="rgba(192,138,104,0.5)",n.font="600 46px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",n.fillText(t.num,o-60,392),n.fillStyle="#c08a68",n.fillRect(70,148,90,4),n.fillStyle="#3a2e1f",n.font="600 62px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",n.textAlign="left";const c=Rc(n,t.title,850);let d=232;if(c.slice(0,4).forEach(u=>{n.fillText(u,70,d),d+=70}),d+=18,t.id!=="quiz"&&t.bullets.length){n.fillStyle="rgba(122,95,56,0.45)",n.fillRect(70,d-6,60,2),d+=26,n.font="400 30px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif";const u=[];t.bullets.slice(0,4).forEach(f=>u.push(...Rc(n,f,830))),u.slice(0,5).forEach(f=>{n.fillStyle="#c08a68",n.beginPath(),n.arc(78,d-10,4,0,Math.PI*2),n.fill(),n.fillStyle="#4c3d28",n.fillText(f,100,d),d+=40})}n.fillStyle="rgba(207,165,116,0.35)",n.fillRect(70,r-108,o-140,2),n.fillStyle="rgba(122,95,56,0.7)",n.font="400 22px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",n.textAlign="left",n.letterSpacing="3px",n.fillText("MODULE 1 · DOMAINE PUBLIC",70,r-74),n.fillStyle="rgba(170,120,85,0.8)",n.textAlign="right",n.fillText(String(e+1).padStart(2,"0")+" / "+String(13).padStart(2,"0"),o-70,r-74),n.letterSpacing="0px";const h=n.createRadialGradient(o/2,r/2,o*.3,o/2,r/2,o*.62);h.addColorStop(0,"rgba(0,0,0,0)"),h.addColorStop(.6,"rgba(0,0,0,0)"),h.addColorStop(1,"rgba(150,120,75,0.24)"),n.fillStyle=h,n.fillRect(0,0,o,r)}function Ya(n,t,e,i,s){const o=document.createElement("canvas");o.width=64,o.height=128;const r=o.getContext("2d");r.fillStyle="#dccda8",r.fillRect(0,0,64,128);for(let m=0;m<9;m++)for(let v=0;v<4;v++){const g=Math.random();g<.3?(r.fillStyle=Math.random()<.3?"#c08a68":"#c9a25f",r.globalAlpha=.35+Math.random()*.35,r.fillRect(4+v*14+Math.random()*4,6+m*13+Math.random()*3,5,7),r.globalAlpha=1):g<.42&&(r.fillStyle="#6a5a38",r.globalAlpha=.35,r.fillRect(4+v*14,6+m*13,5,7),r.globalAlpha=1)}const a=new je(o);a.colorSpace=_e,a.repeat.set(1,Math.max(1,Math.round(t/6))),a.wrapS=yi,a.wrapT=yi,a.anisotropy=we?1:4;const l=new Y({map:a,roughness:.9,metalness:0});l.emissive=new vt(16763274),l.emissiveMap=a,l.emissiveIntensity=0;const c=new C(new dt(n,t,e),l);c.position.set(s,t/2-.3,i),c.rotation.y=(Math.random()-.5)*.5,c.castShadow=!0;const d=t/2,h=new Y({color:12035198,roughness:.85}),u=new Y({color:6969912,roughness:.8}),f=Math.random();if(f<.34&&t>8){const m=new C(new bt(Math.min(1.1,n*.24),Math.min(1.1,n*.24),t*.12+.7,10),h);m.position.y=d+(t*.06+.55),c.add(m);const v=new C(new nn(Math.min(1.1,n*.24),.55,10),u);v.position.y=d+(t*.06+.55)+(t*.06+.35)+.27,c.add(v);for(const[g,p]of[[-.5,-.5],[.5,-.5],[-.5,.5],[.5,.5]]){const T=new C(new bt(.05,.05,.7,6),u);T.position.set(g*Math.min(.7,n*.16),d+.35,p*Math.min(.7,e*.16)),c.add(T)}}else if(f<.6){const m=new C(new bt(.04,.07,t*.22+2.2,6),u);m.position.y=d+(t*.11+1.1),c.add(m);for(let g=0;g<3;g++){const p=new C(new dt(.5,.04,.04),u);p.position.y=d+(t*.11+.5+g*.55),c.add(p)}const v=new C(new re(.09,8,8),new Y({color:12597547,emissive:12597547,emissiveIntensity:.4}));v.position.y=d+t*.11+2.25,c.add(v)}else if(f<.78&&t>6){const m=new C(new dt(n*.3,.9,e*.3),h);m.position.y=d+.45,c.add(m);const v=new C(new dt(n*.16,.1,e*.16),u);v.position.y=d+.95,c.add(v)}else{const m=new C(new bt(.22,.26,1.3,8),h);m.position.y=d+.65,c.add(m)}return c}function Ag(n){const t=new Et,e=new Y({color:15261896,roughness:.75}),i=new Y({color:3038778,roughness:.7,metalness:.1}),s=new Y({color:14256698,roughness:.6}),o=new C(new re(.16,10,8),e);o.scale.set(1,.78,1.35),o.position.y=.14,t.add(o);const r=new C(new re(.09,10,8),i);r.position.set(0,.3,.14),t.add(r);const a=new C(new nn(.035,.1,6),s);a.rotation.x=Math.PI/2,a.position.set(0,.29,.25),t.add(a);const l=new C(new re(.05,8,6),e);return l.position.set(0,.2,-.18),l.scale.set(1,.7,1.4),t.add(l),t.position.copy(n),{g:t,head:r,tail:l}}function Cg(n){const t=new Et;t.position.copy(n);const e=new C(new On(4.4,28),new Y({color:8366256,roughness:.08,metalness:.25,transparent:!0,opacity:.82}));e.rotation.x=-Math.PI/2,e.position.y=.05,t.add(e);const i=new C(new Fn(4.4,.28,8,32),new Y({color:12035198,roughness:.9}));i.rotation.x=Math.PI/2,i.position.y=.02,t.add(i);const s=new Y({color:5143114,roughness:.9,side:ze}),o=new Y({color:15255720,roughness:.8,side:ze});for(let r=0;r<6;r++){const a=r/6*Math.PI*2+Math.random()*.5,l=1.2+Math.random()*2.2,c=new C(new On(.3+Math.random()*.18,8),s);if(c.rotation.x=-Math.PI/2,c.position.set(Math.cos(a)*l,.1,Math.sin(a)*l),t.add(c),r%2===0){const d=new C(new re(.1,6,5),o);d.position.set(Math.cos(a)*l+.12,.2,Math.sin(a)*l),d.scale.y=.6,t.add(d)}}return{g:t,water:e}}function Rg(n){const t=new Et,e=[12618344,13608308,10336383,9083576,14256746,12100808],i=e[Math.random()*e.length|0],s=new Fe({color:i,side:ze,transparent:!0,opacity:.92}),o=new Kt(.16,.11),r=new C(o,s);r.position.x=-.09;const a=new C(o,s);a.position.x=.09;const l=new C(new dt(.02,.04,.08),new Fe({color:3812895}));return t.add(r,a,l),t.position.copy(n),{g:t,lw:r,rw:a}}function $s(n,t){const e=new Et;e.position.copy(n);const i=new Y({color:ne.walnutDark,roughness:.6,metalness:.3}),s=new C(new bt(.07,.1,5.6,8),i);s.position.y=2.8,e.add(s);const o=new C(new dt(1.7,.1,.1),i);o.position.set(t*.85,5.5,0),e.add(o);const r=new Y({color:ne.amber,emissive:ne.amber,emissiveIntensity:.25}),a=new C(new re(.16,12,12),r);return a.position.set(t*1.7,5.5,0),e.add(a),e}function Pg(n,t){const e=new Y({color:new vt(ne.groundDark).lerp(new vt(ne.ground),Math.random()),roughness:1,flatShading:!0}),i=new C(new Hi(t,1),e);return i.position.set(n.x,-.15,n.z),i.scale.set(1,.32,1),i.rotation.y=Math.random()*Math.PI,i}function Lg(n,t){const e=new Y({color:10127976,roughness:.95,flatShading:!0}),i=new C(new ul(t,0),e);return i.position.set(n.x,t*.4,n.z),i.rotation.set(Math.random(),Math.random()*Math.PI,Math.random()),i}function Ig(n=420){const t=n,e=new Float32Array(t*3),i=new ln([new w(0,0,0),new w(0,0,120),new w(0,0,240),new w(0,0,360),new w(0,0,468)],!1,"centripetal");for(let r=0;r<t;r++){const a=Math.random(),l=i.getPointAt(a);e[r*3]=l.x+(Math.random()-.5)*24,e[r*3+1]=.4+Math.random()*6,e[r*3+2]=l.z+(Math.random()-.5)*24}const s=new Pe;s.setAttribute("position",new Oe(e,3));const o=new Ts({color:ne.amber,transparent:!0,opacity:.5,blending:Ze,depthWrite:!1,size:.35,sizeAttenuation:!0});return new io(s,o)}function Dg(){const n=new Et,t=new Fe({color:4864550,transparent:!0,opacity:.9,side:ze}),e=new Kt(.55,.18),i=new C(e,t);i.position.x=-.3;const s=new C(e,t);s.position.x=.3;const o=new C(new Kt(.34,.07),t);return o.rotation.z=Math.PI/2,n.add(i,s,o),n.scale.setScalar(1.3),{g:n,l:i,r:s}}function Ad(n,t=1){const e=new Et,i=new Y({color:9071429,roughness:.95,flatShading:!0}),s=new C(new bt(.09,.18,3.2,6),i);s.position.y=1.6,s.rotation.z=(Math.random()-.5)*.22,s.castShadow=!0,e.add(s);const o=new Y({color:6257226,roughness:1,flatShading:!0}),r=7;for(let l=0;l<r;l++){const c=l/r*Math.PI*2,d=new C(new re(1,7,5),o);d.position.set(Math.cos(c)*1.15,3.05,Math.sin(c)*1.15),d.scale.set(1.15,.28,.55),d.rotation.y=c,e.add(d)}const a=new C(new re(.28,8,6),o);return a.position.y=3.15,e.add(a),e.position.copy(n),e.scale.setScalar(t),e}function Ug(n,t=1){const e=new Et,i=new Y({color:7045971,roughness:1,flatShading:!0});for(let s=0;s<5;s++){const o=new C(new Hi(.3+Math.random()*.24,1),i);o.position.set((Math.random()-.5)*.7,.22+Math.random()*.3,(Math.random()-.5)*.7),e.add(o)}return e.position.copy(n),e.scale.setScalar(t),e}function Ng(n,t=1){const e=new Et,i=new Y({color:16183261,roughness:1,flatShading:!0,transparent:!0,opacity:.92});for(let s=0;s<6;s++){const o=new C(new re(1.1+Math.random()*1.4,9,7),i);o.position.set(s*1.6-4,Math.random()*.9,(Math.random()-.5)*2),o.scale.y=.5,e.add(o)}return e.position.copy(n),e.scale.setScalar(t),e}function zg(n,t,e){const i=new Et;i.position.copy(n);const s=new Y({color:ne.walnutDark,roughness:.7,metalness:.2}),o=new C(new bt(.1,.14,2.1,8),s);o.position.y=1.05,o.castShadow=!0,i.add(o);const r=new C(new dt(.9,.08,.14),s);r.position.set(0,1.85,0),r.rotation.z=Math.PI/2,i.add(r);const a=we?256:512,l=we?160:320,c=document.createElement("canvas");c.width=a,c.height=l;const d=c.getContext("2d");d.scale(a/512,l/320),d.fillStyle="#f7eeda",d.fillRect(0,0,512,320),d.strokeStyle="rgba(138,111,69,0.6)",d.lineWidth=8,d.strokeRect(12,12,488,296);const h=d.createLinearGradient(0,0,512,0);h.addColorStop(0,"#c08a68"),h.addColorStop(1,"#cfa574"),d.fillStyle=h,d.fillRect(0,52,512,10),d.textAlign="center",d.fillStyle="#3a2e1f",d.font="700 42px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",e.forEach((g,p)=>d.fillText(g,256,122+p*50));const u=new je(c);u.colorSpace=_e,u.anisotropy=we?2:8;const f=new qe({map:u}),m=new C(new Kt(1.7,1.06),f);m.position.y=2.28;const v=new Et;return v.add(m),v.rotation.y=t,i.add(v),{group:i,sign:m}}function Fg(n,t,e,i){const s=new Y({color:ne.hill,roughness:1,flatShading:!0}),o=new C(new Hi(1,2),s);return o.scale.set(t,e,i),o.position.set(n.x,n.y,n.z),o.rotation.y=Math.random()*Math.PI,o.castShadow=!0,o}function Zs(n,t){const e=new Et;e.position.copy(n);const i=new Qn(new zn({map:Rn(0,"rgba(255,190,120,0.3)"),transparent:!0,blending:Ze,depthWrite:!1,depthTest:!1}));i.scale.setScalar(3.6),i.position.set(t*1.7,5.5,0),e.add(i);const s=new C(new On(3.8,24),new Fe({map:Rn(.12,"rgba(255,180,110,0.32)"),transparent:!0,blending:Ze,depthWrite:!1}));return s.rotation.x=-Math.PI/2,s.position.y=.03,e.add(s),{group:e,glow:i,pool:s}}function nr(){const n=new Et,t=Math.random()<.5?12618344:Math.random()<.5?13805688:7035458,e=new Y({color:t,roughness:.45,metalness:.35}),i=new Y({color:3813154,roughness:.5,metalness:.4}),s=new C(new dt(1.5,.5,3.2),e);s.position.y=.5,s.castShadow=!0,n.add(s);const o=new C(new dt(1.3,.24,1),i);o.position.set(0,.72,1.15),n.add(o);const r=new C(new dt(1.12,.46,1.5),i);r.position.set(0,.95,-.2),r.castShadow=!0,n.add(r);const a=new Y({color:8364973,roughness:.15,metalness:.6});for(const[u,f]of[[0,-.95],[0,.5]]){const m=new C(new dt(1.14,.38,.05),a);m.position.set(u,.96,f),n.add(m)}const l=new Y({color:3023896,roughness:.9});for(const[u,f]of[[-.78,1.05],[.78,1.05],[-.78,-1.05],[.78,-1.05]]){const m=new C(new bt(.32,.32,.22,14),l);m.rotation.x=Math.PI/2,m.rotation.z=Math.PI/2,m.position.set(u,.32,f),n.add(m)}const c=new Y({color:16773839,emissive:16769184,emissiveIntensity:.5});for(const u of[-.55,.55]){const f=new C(new re(.09,8,8),c);f.position.set(u,.55,1.6),n.add(f)}const d=new Y({color:9051670,emissive:9051670,emissiveIntensity:.3});for(const u of[-.55,.55]){const f=new C(new dt(.16,.1,.04),d);f.position.set(u,.55,-1.6),n.add(f)}const h=new Qn(new zn({map:Rn(0,"rgba(255,226,175,0.4)"),transparent:!0,blending:Ze,depthWrite:!1,depthTest:!1}));return h.scale.set(3.4,3.4,1),h.position.set(0,.55,2.8),n.add(h),{group:n,cone:h,body:s}}function fs(n,t){const e=new Et;e.position.copy(n),e.rotation.y=t>0?Math.PI:0;const i=new Y({color:9071429,roughness:.85}),s=new Y({color:4864550,roughness:.7,metalness:.4}),o=new C(new dt(1.4,.08,.42),i);o.position.y=.42,e.add(o);const r=new C(new dt(1.4,.08,.4),i);r.position.set(0,.72,.18),e.add(r);for(const a of[-.6,.6]){const l=new C(new dt(.08,.42,.5),s);l.position.set(a,.21,0),e.add(l)}return e}function Og(){const n=document.createElement("canvas");n.width=256,n.height=256;const t=n.getContext("2d");t.fillStyle="#d3c096",t.fillRect(0,0,256,256),t.strokeStyle="rgba(122,95,56,0.35)",t.lineWidth=2,t.strokeRect(2,2,252,252);for(let i=64;i<256;i+=64)t.beginPath(),t.moveTo(i,2),t.lineTo(i,254),t.stroke(),t.beginPath(),t.moveTo(2,i),t.lineTo(254,i),t.stroke();for(let i=0;i<900;i++){const s=180+Math.random()*36;t.fillStyle=`rgba(${s|0},${s*.9|0},${s*.72|0},${(Math.random()*.16).toFixed(3)})`,t.fillRect(Math.random()*256,Math.random()*256,1+Math.random()*3,1+Math.random()*3)}const e=new je(n);return e.colorSpace=_e,e.wrapS=e.wrapT=yi,e.repeat.set(we?1:2,90),e.anisotropy=we?2:8,e}function Ho(n,t=1){const e=new Et,i=new Y({color:7031340,roughness:.95,flatShading:!0}),s=new C(new bt(.1,.16,2.6,7),i);s.position.y=1.3,s.castShadow=!0,e.add(s);const o=new Y({color:5599295,roughness:1,flatShading:!0});for(let r=0;r<3;r++){const a=new C(new re(1.05-r*.18,8,6),o);a.position.set((Math.random()-.5)*.5,2.6+r*.65,(Math.random()-.5)*.5),a.scale.y=.85,a.castShadow=!0,e.add(a)}return e.position.copy(n),e.scale.setScalar(t),e}function Bg(n,t=1,e=0){const i=new Et,s=[5599295,6585414],o=[12618344,13608308,10336383,14731680,14256746,9083576,12100808,13808780],r=a=>{const l=Math.sin(e*127.1+a*311.7)*43758.5453;return l-Math.floor(l)};for(let a=0;a<6;a++){const l=new C(new bt(.015,.02,.32,4),new Y({color:s[a%2],roughness:1}));l.position.set((r(a)-.5)*.5,.16,(r(a+13)-.5)*.5),i.add(l);const c=new C(new re(.05,5,4),new Y({color:o[(a+e)%o.length],roughness:.9}));c.position.set(l.position.x,.34,l.position.z),i.add(c)}return i.position.copy(n),i.scale.setScalar(t),i}function kg(n){const t=new Et;t.position.copy(n);const e=new Y({color:4864550,roughness:.6,metalness:.5}),i=new C(new bt(.24,.2,.72,10),e);i.position.y=.36,i.castShadow=!0,t.add(i);const s=new C(new bt(.27,.27,.05,10),e);return s.position.y=.75,t.add(s),t}function Gg(){const n=new Et,t=new Y({color:10127994,roughness:.95,flatShading:!0}),e=new C(new re(.11,8,6),t);e.scale.set(1,.8,1.4),e.position.y=.12,n.add(e);const i=new C(new re(.055,8,6),t);i.position.set(0,.22,.1),n.add(i);const s=new C(new nn(.02,.05,4),t);return s.rotation.x=Math.PI/2,s.position.set(0,.22,.16),n.add(s),n.rotation.y=Math.random()*Math.PI*2,n.userData={body:e},n}function In(n,t=4.6,e=3.2){const i=new C(new Kt(t,e),new Fe({map:Rn(.35,"rgba(90,70,42,0.34)"),transparent:!0,depthWrite:!1}));return i.rotation.x=-Math.PI/2,i.position.set(n.x,.02,n.z),i}function Hg(n,t=0,e=["PUBLICITÉ","URBAINE"]){const i=new Et;i.position.copy(n),i.rotation.y=t;const s=new Y({color:15392706,roughness:.85}),o=new Y({color:10850152,roughness:.7,metalness:.15}),r=new C(new bt(.62,.68,2.5,18),s);r.position.y=1.25,r.castShadow=!0,i.add(r);const a=new C(new bt(.72,.8,.22,18),o);a.position.y=.11,i.add(a);const l=new C(new bt(.66,.72,.16,18),o);l.position.y=2.58,i.add(l);const c=new C(new re(.2,10,8),o);c.position.y=2.75,i.add(c);const d=256,h=640,u=document.createElement("canvas");u.width=d,u.height=h;const f=u.getContext("2d"),m=f.createLinearGradient(0,0,0,h);m.addColorStop(0,"#f5ecd6"),m.addColorStop(1,"#ead9b4"),f.fillStyle=m,f.fillRect(0,0,d,h),f.strokeStyle="rgba(138,111,69,0.5)",f.lineWidth=10,f.strokeRect(10,10,d-20,h-20),f.fillStyle="#c08a68",f.fillRect(0,h*.14,d,14),f.textAlign="center",f.fillStyle="#3a2e1f",f.font="700 34px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",e.forEach((p,T)=>f.fillText(p,d/2,h*.3+T*56)),f.fillStyle="#8a6a4e",f.font="400 26px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",f.fillText("DOMAINE PUBLIC",d/2,h*.78);const v=new je(u);v.colorSpace=_e,v.anisotropy=we?2:8;const g=new C(new Kt(.92,2.5),new qe({map:v}));return g.position.set(0,1.25,.55),i.add(g),i.userData={body:r},i}function Vg(n,t=1){const e=new Et;e.position.copy(n),e.rotation.y=t>0?0:Math.PI;const i=new Y({color:4864550,roughness:.6,metalness:.45}),s=new Y({color:12100725,roughness:.7,metalness:.2});for(const p of[-1.7,1.7]){const T=new C(new dt(.12,2.3,.12),i);T.position.set(p,1.15,.4),T.castShadow=!0,e.add(T)}const o=new C(new dt(4.2,.1,1.7),s);o.position.y=2.4,o.castShadow=!0,e.add(o);const r=new Y({color:11060425,roughness:.1,metalness:.2,transparent:!0,opacity:.35}),a=new C(new Kt(3.4,1.5),r);a.position.set(0,1.5,-.42),e.add(a);const l=new C(new Kt(1.3,1.5),r);l.position.set(1.9,1.5,0),l.rotation.y=Math.PI/2,e.add(l);const c=320,d=200,h=document.createElement("canvas");h.width=c,h.height=d;const u=h.getContext("2d");u.fillStyle="#f2e7cd",u.fillRect(0,0,c,d),u.fillStyle="#cfa574",u.fillRect(0,0,c,40),u.textAlign="center",u.fillStyle="#3a2e1f",u.font="700 30px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",u.fillText("VOTRE ESPACE PUBLICITAIRE",c/2,105),u.font="400 20px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",u.fillStyle="#7a5f38",u.fillText("MODULE 1 · PANNEAUTIQUE",c/2,150);const f=new je(h);f.colorSpace=_e,f.anisotropy=we?2:8;const m=new C(new Kt(3.4,1.4),new qe({map:f}));m.position.set(0,1.45,.42),e.add(m),e.userData={poster:m};const v=new Y({color:9071429,roughness:.85}),g=new C(new dt(2.6,.07,.35),v);return g.position.set(0,.42,-.1),e.add(g),e}function Wg(n,t=13215868,e=0){const i=new Et;i.position.copy(n),i.rotation.y=e;const s=new Y({color:5916210,roughness:.6,metalness:.4}),o=new Y({color:9071429,roughness:.8}),r=new C(new bt(.04,.06,.75,8),s);r.position.y=.38,i.add(r);const a=new C(new bt(.42,.42,.06,14),o);a.position.y=.76,i.add(a);const l=new C(new bt(.03,.03,1.5,8),s);l.position.y=1.1,i.add(l);const c=new C(new nn(1.1,.28,10),new qe({color:t}));c.position.y=1.95,i.add(c);for(const[d,h]of[[-.5,.5],[.5,.5],[-.5,-.5],[.5,-.5]]){const u=new C(new dt(.4,.1,.4),o);u.position.set(d,.42,h),i.add(u);const f=new C(new bt(.025,.025,.42,6),s);f.position.set(d,.21,h),i.add(f)}return i.userData={parasol:c},i}function Xg(n,t=0){const e=new Et;e.position.copy(n),e.rotation.y=t;const i=new Y({color:9071182,roughness:.6,metalness:.2}),s=new Y({color:3813154,roughness:.95}),o=.34;for(const d of[-.35,.35]){const h=new C(new Fn(o,.035,8,20),s);h.position.set(0,o,d),e.add(h)}const r=new C(new dt(.03,.03,.72),i);r.position.set(0,.66,0),e.add(r);const a=new C(new bt(.02,.02,.62,6),i);a.position.set(0,.82,0),a.rotation.x=Math.PI/2,e.add(a);const l=new C(new bt(.02,.02,.34,6),i);l.position.set(0,.98,.35),e.add(l);const c=new C(new dt(.14,.03,.08),i);return c.position.set(0,.84,-.32),e.add(c),e}function qg(n,t=0,e="D"){const i=new Et;i.position.copy(n),i.rotation.y=t;const s=new Y({color:4864550,roughness:.6,metalness:.4}),o=new C(new bt(.03,.05,1.8,8),s);o.position.y=.9,o.castShadow=!0,i.add(o);const r=document.createElement("canvas");r.width=128,r.height=64;const a=r.getContext("2d");a.fillStyle="#e3d6b4",a.fillRect(0,0,128,64),a.fillStyle=e==="D"?"#c08a68":"#7d9a68",a.fillRect(0,0,26,64),a.strokeStyle="rgba(138,111,69,0.6)",a.lineWidth=4,a.strokeRect(2,2,124,60),a.textAlign="center",a.fillStyle="#3a2e1f",a.font="700 26px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",a.fillText(e,76,42);const l=new je(r);l.colorSpace=_e,l.anisotropy=we?2:8;const c=new C(new Kt(.7,.35),new qe({map:l}));return c.position.y=1.9,i.add(c),i}function jr(n,t=1.8,e=.6){const i=new Et;i.position.copy(n);const s=new Y({color:6257226,roughness:1,flatShading:!0}),o=new C(new dt(t,e,.5),s);o.position.y=e/2,o.castShadow=!0,i.add(o);const r=Math.max(2,Math.round(t/.7));for(let a=0;a<r;a++){const l=new C(new Hi(.3,1),s);l.position.set(-t/2+.3+a*(t-.6)/(r-1),e+.18,0),i.add(l)}return i}const Yg=[14266508,13146738,11567964,9068616,14727320].map(n=>new Y({color:n,roughness:.85})),$g=[3023896,4863524,8215604,13215864,2236446].map(n=>new Y({color:n,roughness:.9})),Zg=[13215868,9415293,13608308,11052232,10336447,13805176,14726304,12108960].map(n=>new Y({color:n,roughness:.85})),Kg=[4865070,6048314,4146772,6969924,5588028].map(n=>new Y({color:n,roughness:.9})),jg=new Y({color:3023896,roughness:.8}),Pc=new Y({color:13610612,roughness:.9}),Vo=n=>n[Math.random()*n.length|0];function Jg(){const n=new Et,t=.92+Math.random()*.18,e=.85+Math.random()*.32,i=Vo(Yg),s=Vo($g),o=Vo(Zg),r=Vo(Kg),a=jg,l=Math.random()<.22,c=Math.random()<.14,d=Math.random()<.16,h=.9*t,u=.105*e,f=y=>{const x=new Et;x.position.set(y,h,0);const P=new C(new bt(.064,.05,.46*t,8),r);P.position.y=-.23*t,P.castShadow=!0,x.add(P);const O=new Et;O.position.y=-.46*t;const V=new C(new bt(.05,.04,.44*t,8),r);V.position.y=-.22*t,O.add(V);const Q=new C(new dt(.09,.07,.17),a);return Q.position.set(0,-.44*t,.045),O.add(Q),x.add(O),{leg:x,knee:O}},m=f(-u),v=f(u);n.add(m.leg,v.leg);const g=new Et;if(n.add(g),l){const y=new C(new nn(.21*e,.34,12),o);y.position.y=.78*t,y.castShadow=!0,g.add(y)}const p=new C(new bt(.175*e,.215*e,.54*t,12),o);p.position.y=1.2*t,p.castShadow=!0,g.add(p);const T=o;for(const y of[-.19*e,.19*e]){const x=new C(new re(.075*e,8,6),T);x.position.set(y,1.42*t,0),g.add(x)}if(d){const y=new C(new dt(.15,.17,.06),r);y.position.set(.3*e,1.16*t,0),y.rotation.z=.18,g.add(y);const x=new C(new dt(.02,.3,.02),r);x.position.set(.26*e,1.32*t,0),x.rotation.z=.4,g.add(x)}const _=new C(new bt(.045,.055,.12,8),i);_.position.y=1.5*t,g.add(_);const M=new C(new re(.135,12,10),i);M.position.y=1.64*t,M.castShadow=!0,g.add(M);const F=new C(new re(.15,10,8),s);if(F.position.set(0,1.66*t,-.02),F.scale.set(1,.78,1.06),g.add(F),c){const y=new C(new bt(.19,.2,.03,12),Pc);y.position.y=1.74*t,g.add(y);const x=new C(new re(.1,10,8),Pc);x.position.y=1.78*t,x.scale.set(1,.85,1),g.add(x)}const L=y=>{const x=new Et;x.position.set(y,1.4*t,0);const P=new C(new bt(.055,.062,.26,8),o);P.position.y=-.13,P.castShadow=!0,x.add(P);const O=new Et;O.position.y=-.26;const V=new C(new bt(.042,.05,.24,8),i);V.position.y=-.12,O.add(V);const Q=new C(new re(.05,8,6),i);return Q.position.y=-.24,O.add(Q),x.add(O),{arm:x,elbow:O}},D=L(-.235*e),I=L(.235*e);return g.add(D.arm,I.arm),{g:n,legL:m.leg,legR:v.leg,kneeL:m.knee,kneeR:v.knee,armL:D.arm,armR:I.arm,elbowL:D.elbow,elbowR:I.elbow,lean:g,phase:Math.random()*Math.PI*2}}function Qg(){const n=new Et,t=new Y({color:13219985,roughness:.9}),e=new Y({color:11048556,roughness:.9}),i=new Y({color:11060425,roughness:.1,metalness:.2,transparent:!0,opacity:.75}),s=new C(new bt(1.7,1.9,.5,20),t);s.position.y=.25,s.castShadow=!0,n.add(s);const o=new C(new Fn(1.8,.14,8,24),e);o.rotation.x=Math.PI/2,o.position.y=.5,n.add(o);const r=new C(new On(1.62,20),i);r.rotation.x=-Math.PI/2,r.position.y=.31,n.add(r);const a=new C(new bt(.16,.22,.8,10),e);a.position.y=.9,n.add(a);const l=new C(new bt(.55,.35,.14,12),e);l.position.y=1.25,n.add(l);const c=new C(new bt(.05,.05,.55,8),i);return c.position.y=1.6,n.add(c),n.userData={jet:c,pool:r,dish:l},n}function tv(n,t=0,e=["ESPACE","PUBLICITAIRE"]){const i=new Et;i.position.copy(n),i.rotation.y=t;const s=new Y({color:7035458,roughness:.7,metalness:.2}),o=new Y({color:15260864,roughness:.85});for(const m of[-2.6,2.6]){const v=new C(new dt(.22,3.4,.22),s);v.position.set(m,1.7,0),v.castShadow=!0,i.add(v);const g=new C(new dt(.6,.12,.6),s);g.position.set(m,.06,0),i.add(g)}const r=new C(new dt(5.6,3.1,.14),o);r.position.y=3.6,r.castShadow=!0,i.add(r);const a=we?320:640,l=we?180:360,c=document.createElement("canvas");c.width=a,c.height=l;const d=c.getContext("2d"),h=d.createLinearGradient(0,0,0,l);h.addColorStop(0,"#f3e8cd"),h.addColorStop(1,"#e6d3a9"),d.fillStyle=h,d.fillRect(0,0,a,l),d.fillStyle="#c08a68",d.fillRect(0,0,a,l*.22),d.textAlign="center",d.fillStyle="#3a2e1f",d.font="700 "+l*.11+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",e.forEach((m,v)=>d.fillText(m,a/2,l*.42+v*(l*.16))),d.fillStyle="#7a5f38",d.font="400 "+l*.06+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",d.fillText("PANNEAUTIQUE · DOMAINE PUBLIC",a/2,l*.86);const u=new je(c);u.colorSpace=_e,u.anisotropy=we?2:8;const f=new C(new Kt(5.3,2.8),new Y({map:u,emissive:16767392,emissiveMap:u,emissiveIntensity:0}));return f.position.set(0,3.6,.09),i.add(f),i.userData={face:f},i}function ev(n,t=0){const e=new Et;e.position.copy(n),e.rotation.y=t;const i=new Y({color:9071429,roughness:.85}),s=new Y({color:6048304,roughness:.5,metalness:.4}),o=new C(new dt(1.9,2.2,1.5),i);o.position.y=1.1,o.castShadow=!0,e.add(o);const r=new C(new dt(2.4,.14,2),s);r.position.y=2.27,e.add(r);const a=new C(new Kt(.34,.2),new qe({color:13608308,side:ze}));a.position.set(1.05,2.42,.55),a.rotation.y=Math.PI/2,e.add(a);const l=new C(new dt(1.9,.5,.25),s);l.position.set(0,.9,.82),e.add(l);const c=new C(new dt(2.2,.06,.7),new Y({color:12618344,roughness:.9}));c.position.set(0,1.65,.85),e.add(c);const d=document.createElement("canvas");d.width=128,d.height=96;const h=d.getContext("2d");h.fillStyle="#f2e7cd",h.fillRect(0,0,128,96),h.strokeStyle="rgba(138,111,69,0.6)",h.lineWidth=4,h.strokeRect(4,4,120,88),h.textAlign="center",h.fillStyle="#3a2e1f",h.font="700 20px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",h.fillText("LE QUOTIDIEN",64,40),h.font="400 15px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",h.fillStyle="#7a5f38",h.fillText("0,50 €",64,66);const u=new je(d);u.colorSpace=_e,u.anisotropy=we?2:8;const f=new C(new Kt(.7,.5),new Y({map:u,emissive:16767392,emissiveMap:u,emissiveIntensity:0}));return f.position.set(0,1.35,.82),e.add(f),e.userData={flag:a,sign:f},e}function Lc(n,t=0,e=13209450){const i=new Et;i.position.copy(n),i.rotation.y=t;const s=new Y({color:9071429,roughness:.85});for(const f of[-1,1]){const m=new C(new dt(.08,1,.08),s);m.position.set(f,.5,0),m.castShadow=!0,i.add(m)}const o=new C(new dt(2,.12,.8),s);o.position.y=.97,i.add(o);const r=new C(new dt(2.2,.06,.9),s);r.position.y=1.03,i.add(r);const a=[12606026,13608308,8231528,9083576,13805176];for(let f=0;f<5;f++){const m=new C(new re(.09,8,6),new Y({color:a[f%a.length],roughness:.7}));m.position.set(-.8+f*.4,1.12,0),m.scale.y=.85,i.add(m)}const l=Cd(2.4,.9,e);l.position.set(0,2.1,.3),i.add(l);const c=document.createElement("canvas");c.width=256,c.height=96;const d=c.getContext("2d");d.fillStyle="#f7eeda",d.fillRect(0,0,256,96),d.strokeStyle="rgba(138,111,69,0.6)",d.lineWidth=6,d.strokeRect(4,4,248,88),d.fillStyle="#3a2e1f",d.textAlign="center",d.font="700 34px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",d.fillText("MARCHÉ",128,60);const h=new je(c);h.colorSpace=_e;const u=new C(new Kt(1.3,.5),new Y({map:h,emissive:16767392,emissiveMap:h,emissiveIntensity:0}));return u.position.set(0,2.32,.05),i.add(u),i.userData={sign:u,awning:l},i}function nv(){const n=[9415293,7045971,13215868,13805176],t=new Et,e=new C(new Kt(.16,.1),new qe({color:n[Math.random()*n.length|0],side:ze,transparent:!0,opacity:.72}));return t.add(e),t}function iv(n,t,e=[12618344,13608308,10336383,9083576,13805176],i=10,s=.7){const o=new Et,r=new w().addVectors(n,t).multiplyScalar(.5);o.position.copy(r);const a=new w().subVectors(t,n),l=e.map(m=>new qe({color:m,side:ze})),c=new Kt(.42,.3),d=Math.atan2(a.x,a.z),h=[],u=i*2;for(let m=0;m<=u;m++){const v=m/u,g=an.lerp(n.x,t.x,v)-r.x,p=an.lerp(n.y,t.y,v)-s*Math.sin(Math.PI*v)-r.y,T=an.lerp(n.z,t.z,v)-r.z;if(h.push(new w(g,p,T)),m%2===0){const _=new C(c,l[m/2%l.length]);_.position.set(g,p-.15,T),_.rotation.y=d,o.add(_)}}const f=new cl(new Pe().setFromPoints(h),new hr({color:9071182}));return o.add(f),o}function Cd(n,t,e){const o=document.createElement("canvas");o.width=256,o.height=128;const r=o.getContext("2d"),a="#"+e.toString(16).padStart(6,"0"),l=8;for(let m=0;m<l;m++)r.fillStyle=m%2===0?a:"#f7eeda",r.fillRect(m*(256/l),0,256/l,128);const c=new je(o);c.colorSpace=_e,c.anisotropy=we?1:4;const d=new qe({map:c,side:ze}),h=new Et,u=new C(new Kt(n,t),d);u.rotation.x=-.5,u.position.set(0,.15,.45),h.add(u);const f=new C(new Kt(n,.2),d);return f.position.set(0,.1,t*.85),f.rotation.x=-.15,h.add(f),h}function sv(n,t=0,e=13209450,i="BOUTIQUE"){const s=new Et;s.position.copy(n),s.rotation.y=t;const o=5,r=3.3,a=2.8,l=new qe({color:15129019}),c=new C(new dt(o,r,a),l);c.position.y=r/2,c.castShadow=!0,s.add(c);const d=new C(new dt(o+.24,.2,a+.24),l);d.position.y=r+.1,s.add(d);const h=we?256:512,u=we?160:320,f=document.createElement("canvas");f.width=h,f.height=u;const m=f.getContext("2d");m.scale(h/512,u/320);const v=m.createLinearGradient(0,0,0,320);v.addColorStop(0,"#f2e6c9"),v.addColorStop(1,"#dccaa3"),m.fillStyle=v,m.fillRect(0,0,512,320);const g=["#c08a68","#7d9a68","#cfa574"];for(let F=0;F<3;F++){const L=30+F*160;m.fillStyle="rgba(122,95,56,0.5)",m.fillRect(L,192,120,10),m.fillStyle=g[F];for(let D=0;D<4;D++)m.beginPath(),m.arc(L+22+D*26,178,9,0,Math.PI*2),m.fill()}m.fillStyle="rgba(255,255,255,0.2)",m.beginPath(),m.moveTo(300,0),m.lineTo(430,0),m.lineTo(230,320),m.lineTo(100,320),m.closePath(),m.fill(),m.strokeStyle="#8a6a4e",m.lineWidth=12,m.strokeRect(6,6,500,308),m.fillStyle="#3a2e1f",m.font="700 36px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",m.textAlign="center",m.fillText(i,256,52);const p=new je(f);p.colorSpace=_e,p.anisotropy=we?2:8;const T=new Y({map:p,emissive:16767392,emissiveMap:p,emissiveIntensity:0}),_=new C(new Kt(o*.8,r*.6),T);_.position.set(0,r*.52,a/2+.03),s.add(_);const M=Cd(o*.84,.9,e);return M.position.set(0,r-.55,a/2-.2),s.add(M),s.userData={window:_,awning:M},s}function ov(){const n=new Et,t=new Y({color:12618344,roughness:.5,metalness:.25});new Y({color:4864550,roughness:.5,metalness:.3});const e=new Y({color:9416888,roughness:.15,metalness:.5}),i=new C(new dt(2,1.3,5.6),t);i.position.y=1.15,i.castShadow=!0,n.add(i);const s=new C(new dt(1.8,.16,5.4),t);s.position.y=1.9,n.add(s);const o=new C(new dt(1.72,.52,5.2),e);o.position.y=1.56,n.add(o);const r=new C(new dt(1.8,.5,.06),e);r.position.set(0,1.5,2.8),n.add(r);const a=new Y({color:3023896,roughness:.9});for(const[d,h]of[[-.95,1.7],[.95,1.7],[-.95,-1.7],[.95,-1.7]]){const u=new C(new bt(.36,.36,.26,14),a);u.rotation.x=Math.PI/2,u.rotation.z=Math.PI/2,u.position.set(d,.36,h),n.add(u)}const l=new Y({color:16773839,emissive:16769184,emissiveIntensity:.5});for(const d of[-.7,.7]){const h=new C(new re(.1,8,8),l);h.position.set(d,1.05,2.82),n.add(h)}const c=new Qn(new zn({map:Rn(0,"rgba(255,226,175,0.4)"),transparent:!0,blending:Ze,depthWrite:!1,depthTest:!1}));return c.scale.set(4.2,4.2,1),c.position.set(0,1.1,4.6),n.add(c),{group:n,cone:c,body:i}}function rv(){const n=new Et,t=new qe({color:12159582}),e=new qe({color:9069120}),i=new C(new dt(.3,.22,.55),t);i.position.y=.24,i.castShadow=!0,n.add(i);const s=new C(new dt(.16,.15,.18),t);s.position.set(0,.36,.33),n.add(s);const o=new C(new dt(.04,.09,.11),e);o.position.set(0,.45,.34),n.add(o);const r=new C(new dt(.05,.05,.2),t);r.position.set(0,.36,-.37),n.add(r);for(const[a,l]of[[-.11,.18],[.11,.18],[-.11,-.18],[.11,-.18]]){const c=new C(new dt(.06,.18,.06),t);c.position.set(a,.09,l),n.add(c)}return n.userData={tail:r},n}function av(n){const t=new Et;t.position.copy(n);const e=new C(new bt(.025,.025,1.1,6),new Y({color:9071182,roughness:.8}));e.position.y=.55,t.add(e);const i=[12606026,13608308,8231528],s=[];for(let o=0;o<3;o++){const r=new C(new re(.21,10,8),new qe({color:i[o],emissive:i[o],emissiveIntensity:.08}));r.position.set((o-1)*.22,1.2+Math.sin(o*2.1)*.05,o%2*.12-.06),r.scale.set(1,1.2,1),t.add(r),s.push(r)}return t.userData={balloons:s},t}function lv(n,t=0){const e=new Et;e.position.copy(n),e.rotation.y=t;const i=new Y({color:3025446,roughness:.5,metalness:.5}),s=new C(new bt(.045,.07,3.4,8),i);s.position.y=1.7,s.castShadow=!0,e.add(s);const o=new Y({color:3816770,roughness:.6,metalness:.3}),r=new C(new dt(.32,.9,.26),o);r.position.y=2.9,e.add(r);const a=[{c:13193026,y:3.24,on:.9},{c:14723130,y:2.9,on:.2},{c:6265944,y:2.56,on:.2}],l=[];a.forEach(h=>{const u=new C(new re(.095,10,8),new Y({color:1711136,emissive:h.c,emissiveIntensity:h.on,roughness:.4}));u.position.set(0,h.y,.14),e.add(u),l.push(u)});const c=new C(new dt(.17,.55,.14),o);c.position.set(0,1.15,0),e.add(c);const d=[];for(const[h,u]of[[13193026,1.32],[6265944,1.05]]){const f=new C(new re(.05,8,6),new Y({color:1711136,emissive:h,emissiveIntensity:.7,roughness:.4}));f.position.set(0,u,.08),e.add(f),d.push(f)}return e.userData={bulbs:l,peds:d},e}function cv(n){const t=new Et;t.position.copy(n);const e=new Y({color:14932410,roughness:.7,metalness:.2}),i=new C(new bt(.09,.11,.5,8),e);i.position.y=.25,i.castShadow=!0,t.add(i);const s=new C(new re(.09,8,6),e);return s.position.y=.51,t.add(s),t}function dv(n){const t=new Et;t.position.copy(n);const e=new Y({color:11882556,roughness:.6,metalness:.35}),i=new C(new bt(.1,.13,.52,10),e);i.position.y=.26,i.castShadow=!0,t.add(i);const s=new C(new re(.1,10,8),e);s.position.y=.55,t.add(s);for(const o of[0,Math.PI/2,Math.PI,3*Math.PI/2]){const r=new C(new bt(.055,.055,.07,8),e);r.position.set(Math.cos(o)*.13,.38,Math.sin(o)*.13),r.rotation.z=Math.PI/2,r.rotation.y=o,t.add(r)}return t}function uv(n){const t=new Et;t.position.copy(n);const e=new Y({color:6978964,roughness:.6,metalness:.4}),i=new C(new bt(.03,.045,1.15,8),e);i.position.y=.58,i.castShadow=!0,t.add(i);const s=new C(new dt(.32,.42,.17),e);s.position.y=1.02,s.castShadow=!0,t.add(s);const o=new C(new dt(.22,.045,.02),new Y({color:1711136,roughness:.7}));return o.position.set(0,1.2,.095),t.add(o),t}function hv(n,t=0,e=["ESPACE","PUBLICITAIRE"]){const i=new Et;i.position.copy(n),i.rotation.y=t;const s=new Y({color:3814187,roughness:.55,metalness:.5}),o=new C(new bt(.42,.5,.1,10),s);o.position.y=.05,i.add(o);const r=new C(new bt(.06,.08,1,8),s);r.position.y=.6,r.castShadow=!0,i.add(r);const a=256,l=384,c=document.createElement("canvas");c.width=a,c.height=l;const d=c.getContext("2d"),h=d.createLinearGradient(0,0,0,l);h.addColorStop(0,"#fbf4e0"),h.addColorStop(1,"#efdfba"),d.fillStyle=h,d.fillRect(0,0,a,l),d.strokeStyle="rgba(138,111,69,0.55)",d.lineWidth=10,d.strokeRect(10,10,a-20,l-20),d.fillStyle="#c08a68",d.fillRect(0,0,a,36),d.textAlign="center",d.fillStyle="#3a2e1f",d.font="700 42px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",e.forEach((g,p)=>d.fillText(g,a/2,168+p*58)),d.fillStyle="#8a6a4e",d.font="400 22px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",d.fillText("DOMAINE PUBLIC",a/2,l-34);const u=new je(c);u.colorSpace=_e,u.anisotropy=we?2:8;const f=new qe({map:u}),m=new C(new Kt(1.35,2),f);m.position.set(0,1.95,.02),i.add(m);const v=m.clone();return v.position.z=-.02,v.rotation.y=Math.PI,i.add(v),i.userData={front:m},i}function fv(n,t=1){const e=new Et;e.position.copy(n),e.scale.setScalar(t);const i=new Y({color:12035198,roughness:.9}),s=new C(new dt(1,.48,1),i);s.position.y=.24,s.castShadow=!0,e.add(s);const o=new C(new dt(1.08,.08,1.08),i);o.position.y=.48,e.add(o);const r=new C(new dt(.92,.06,.92),new Y({color:4338986,roughness:1}));r.position.y=.51,e.add(r);const a=new Y({color:7031340,roughness:.95,flatShading:!0}),l=new C(new bt(.09,.13,2.2,7),a);l.position.y=1.55,l.castShadow=!0,e.add(l);const c=new Y({color:5599295,roughness:1,flatShading:!0});for(let d=0;d<3;d++){const h=new C(new re(1-d*.16,8,6),c);h.position.set((Math.random()-.5)*.4,2.55+d*.55,(Math.random()-.5)*.4),h.scale.y=.85,h.castShadow=!0,e.add(h)}return e}function pv(n,t=0){const e=new Pe,i=new Float32Array([0,-1,0,-.55,-.35,0,.55,-.35,0,0,-1,0,.55,-.35,0,.26,.9,0,0,-1,0,.26,.9,0,-.26,.9,0,0,-1,0,-.26,.9,0,-.55,-.35,0]);e.setAttribute("position",new Oe(i,3)),e.computeVertexNormals();const s=new C(e,new Fe({color:15789280,side:ze}));s.rotation.x=-Math.PI/2;const o=new Et;return o.add(s),o.rotation.y=t,o.position.set(n.x,.05,n.z),o}function mv(n,t=1){const e=new Et,i=new Y({color:5913892,roughness:.95,flatShading:!0}),s=new C(new bt(.09,.14,1.3,7),i);s.position.y=.65,s.castShadow=!0,e.add(s);const o=new Y({color:4151862,roughness:1,flatShading:!0}),r=4;for(let l=0;l<r;l++){const c=new C(new nn(1.05-l*.18,.85,8),o);c.position.y=1.1+l*.62,c.castShadow=!0,e.add(c)}const a=new C(new nn(.14,.42,6),o);return a.position.y=3.7,e.add(a),e.position.copy(n),e.scale.setScalar(t),e}function Ic(n,t=0,e=0){const i=new Et;if(i.position.copy(n),i.rotation.y=e,t===0){const s=new Y({color:3948356,roughness:.85,metalness:.35}),o=new C(new bt(.42,.42,.05,20),s);o.position.y=.06,i.add(o);const r=new C(new On(.3,20),new Y({color:2895411,roughness:.9}));r.rotation.x=-Math.PI/2,r.position.y=.09,i.add(r);for(let a=0;a<3;a++){const l=new C(new dt(.52,.02,.035),s);l.position.set(0,.105,-.2+a*.2),i.add(l)}}else{const s=new Y({color:3093046,roughness:.8,metalness:.4}),o=new C(new dt(.9,.04,.5),s);o.position.y=.06,i.add(o);for(let r=0;r<5;r++){const a=new C(new dt(.7,.03,.05),s);a.position.set(0,.075,-.17+r*.085),i.add(a)}}return i}function Dc(n){const t=new Et;t.position.copy(n);const e=new Y({color:5916210,roughness:.9,flatShading:!0}),i=new C(new bt(.09,.13,7.2,8),e);i.position.y=3.6,i.castShadow=!0,t.add(i);const s=new C(new dt(2.6,.09,.09),e);s.position.y=6.3,t.add(s);const o=new Y({color:9083498,roughness:.6,metalness:.2});for(const a of[-1.15,1.15]){const l=new C(new bt(.05,.07,.14,6),o);l.position.set(a,6.4,0),t.add(l)}const r=new C(new nn(.12,.3,6),e);return r.position.y=7.32,t.add(r),t}function Uc(n,t,e=.8){const i=[];for(let r=0;r<=24;r++){const a=r/24;i.push(new w(n.x+(t.x-n.x)*a,n.y+(t.y-n.y)*a+Math.sin(a*Math.PI)*-e,n.z+(t.z-n.z)*a))}const o=new ln(i);return new C(new As(o,24,.015,5,!1),new Fe({color:2893344}))}function gv(n){const t=new Et;t.position.copy(n);const e=new Y({color:14248509,roughness:.8}),i=new C(new nn(.16,.5,10),e);i.position.y=.25,i.castShadow=!0,t.add(i);const s=new Y({color:15920352,roughness:.7}),o=new C(new bt(.105,.115,.09,10),s);o.position.y=.2,t.add(o);const r=new C(new dt(.3,.04,.3),e);return r.position.y=.02,t.add(r),t}function vv(n,t){const e=window.innerWidth<=760;Eg(e);const i=A=>e?Math.max(2,Math.round(A*.55)):A,s=new al({canvas:n,antialias:!e,alpha:!1});s.setPixelRatio(Math.min(window.devicePixelRatio,e?1.75:2)),s.setSize(window.innerWidth,window.innerHeight),s.toneMapping=ar,s.toneMappingExposure=1.25,s.shadowMap.enabled=!e,s.shadowMap.type=rr;const o=new ll;o.fog=new mi(ne.skyHorizon,60,760);const r=new Ae(e?62:52,window.innerWidth/window.innerHeight,.1,900),a=[{h:4,night:1,top:725536,mid:1385016,hor:3227998,amb:6253452,hs:4412282,hg:2305088,sun:10335448,fog:3227998,sunI:.3,exp:1.5,warm:0},{h:5.2,night:.85,top:1713208,mid:2766160,hor:4868702,amb:6975116,hs:4740218,hg:2501694,sun:11056336,fog:3818848,sunI:.5,exp:1.45,warm:.15},{h:6.2,night:.25,top:9084096,mid:14266506,hor:15909e3,amb:10127986,hs:15255712,hg:9071184,sun:16763e3,fog:14201994,sunI:1.4,exp:1.2,warm:.9},{h:7.5,night:.05,top:10466512,mid:14866104,hor:15919312,amb:11313280,hs:15787212,hg:11049592,sun:16769712,fog:15787216,sunI:1.9,exp:1.18,warm:.45},{h:10,night:0,top:10532562,mid:15261120,hor:16182998,amb:11772544,hs:15918796,hg:12101246,sun:16772552,fog:16116950,sunI:2.2,exp:1.15,warm:0},{h:14,night:0,top:10467023,mid:15261120,hor:16182998,amb:11772544,hs:15918796,hg:12101246,sun:16772294,fog:16116950,sunI:2.2,exp:1.12,warm:0},{h:17,night:0,top:9676488,mid:14996140,hor:15785916,amb:11050112,hs:15654850,hg:11575420,sun:16768424,fog:15260864,sunI:1.9,exp:1.18,warm:.2},{h:18.4,night:.1,top:8030900,mid:14262378,hor:15769690,amb:9337448,hs:14723704,hg:8019014,sun:16756320,fog:14195816,sunI:1.3,exp:1.25,warm:1},{h:19.4,night:.55,top:3817568,mid:8017e3,hor:10512474,amb:6970488,hs:6968436,hg:3420234,sun:14196848,fog:7623784,sunI:.6,exp:1.35,warm:.7},{h:20.5,night:.85,top:1317936,mid:2371658,hor:3818592,amb:5923966,hs:3950704,hg:1975348,sun:10335448,fog:3424348,sunI:.35,exp:1.45,warm:.15},{h:22,night:1,top:725536,mid:1385016,hor:3227998,amb:6253452,hs:4412282,hg:2305088,sun:10335448,fog:3227998,sunI:.3,exp:1.5,warm:0},{h:24,night:1,top:725536,mid:1385016,hor:3227998,amb:6253452,hs:4412282,hg:2305088,sun:10335448,fog:3227998,sunI:.3,exp:1.5,warm:0}].map(A=>({...A,top:new vt(A.top),mid:new vt(A.mid),hor:new vt(A.hor),amb:new vt(A.amb),hs:new vt(A.hs),hg:new vt(A.hg),sun:new vt(A.sun),fog:new vt(A.fog)}));let l="auto",c=null;function d(){if(c!==null)return c;if(l==="day")return 13;if(l==="night")return 1.5;const A=new Date;return A.getHours()+A.getMinutes()/60+A.getSeconds()/3600}const h={top:new vt,mid:new vt,hor:new vt,amb:new vt,hs:new vt,hg:new vt,sun:new vt,fog:new vt,night:0,warm:0,sunI:1,exp:1.25},u={top:new vt,mid:new vt,hor:new vt,amb:new vt,hs:new vt,hg:new vt,sun:new vt,fog:new vt,night:0,warm:0,sunI:1,exp:1.25};function f(A){let z=a[a.length-2],R=a[a.length-1],N=!1;for(let Z=0;Z<a.length-1;Z++)if(A>=a[Z].h&&A<a[Z+1].h){z=a[Z],R=a[Z+1],N=!1;break}A<a[0].h&&(z=a[a.length-1],R=a[0],N=!0);let G=N?(A+24-z.h)/(R.h+24-z.h):(A-z.h)/Math.max(1e-6,R.h-z.h);G=G<0?0:G>1?1:G;const q=G*G*(3-2*G);h.night=z.night+(R.night-z.night)*q,h.warm=z.warm+(R.warm-z.warm)*q,h.sunI=z.sunI+(R.sunI-z.sunI)*q,h.exp=z.exp+(R.exp-z.exp)*q,h.top.copy(z.top).lerp(R.top,q),h.mid.copy(z.mid).lerp(R.mid,q),h.hor.copy(z.hor).lerp(R.hor,q),h.amb.copy(z.amb).lerp(R.amb,q),h.hs.copy(z.hs).lerp(R.hs,q),h.hg.copy(z.hg).lerp(R.hg,q),h.sun.copy(z.sun).lerp(R.sun,q),h.fog.copy(z.fog).lerp(R.fog,q)}f(d()),u.top.copy(h.top),u.mid.copy(h.mid),u.hor.copy(h.hor),u.amb.copy(h.amb),u.hs.copy(h.hs),u.hg.copy(h.hg),u.sun.copy(h.sun),u.fog.copy(h.fog),u.night=h.night,u.warm=h.warm,u.sunI=h.sunI,u.exp=h.exp;const m=new ei({side:en,depthWrite:!1,uniforms:{top:{value:new vt(ne.skyTop)},mid:{value:new vt(ne.skyMid)},horizon:{value:new vt(ne.skyHorizon)},sunDir:{value:new w(0,.16,-1).normalize()},sunColor:{value:new vt(ne.sun)},night:{value:0},topN:{value:new vt(725536)},midN:{value:new vt(1385016)},horN:{value:new vt(3227998)},moonDir:{value:new w(.22,.52,-.83).normalize()},moonColor:{value:new vt(14082804)},warm:{value:0}},vertexShader:`
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
    `});o.add(new C(new re(700,e?24:40,e?12:20),m));const v=new Qn(new zn({map:Rn(0,"rgba(244,200,150,0.5)"),transparent:!0,blending:Ze,depthWrite:!1,depthTest:!1}));v.position.set(42,56,-560),v.scale.setScalar(42),r.add(v);const g=new Qn(new zn({map:Rn(0,"rgba(214,226,244,0.5)"),transparent:!0,blending:Ze,depthWrite:!1,depthTest:!1,opacity:0}));g.position.set(-34,54,-545),g.scale.setScalar(30),r.add(g),o.add(r);const p=new C(new On(1600,e?32:48),new Y({map:Ed(),roughness:1,metalness:0}));p.rotation.x=-Math.PI/2,p.position.y=-.02,p.receiveShadow=!0,o.add(p);const T=[new w(0,0,0),new w(7,0,30),new w(-8,0,62),new w(9,0,96),new w(-9,0,132),new w(8,0,168),new w(-7,0,202),new w(6,0,236),new w(-8,0,270),new w(7,0,304),new w(-6,0,338),new w(8,0,372),new w(-8,0,406),new w(6,0,440),new w(0,0,468)],_=new ln(T,!1,"centripetal",.6);_.arcLengthDivisions=1e3;const M=e?240:500,F=Yn(_,4.2,ne.path,hs(),M);F.position.y=.012,o.add(F);const L=[1.85,-1.85].map(A=>{const z=[],R=e?60:120;for(let N=0;N<=R;N++){const G=N/R,q=_.getPointAt(G),Z=_.getTangentAt(G),lt=new w(-Z.z,0,Z.x).normalize();z.push(new w(q.x+lt.x*A,0,q.z+lt.z*A))}return new ln(z,!1,"centripetal",.6)});for(const A of L){const z=Yn(A,.14,ne.pathEdge,null,M,!0);z.position.y=.032,o.add(z)}for(let A=0;A<=i(84);A++){const z=A/84*.96+.02,R=_.getPointAt(z),N=_.getTangentAt(z),G=new w(-N.z,0,N.x).normalize();for(const q of[-1.25,1.25]){const Z=new C(new dt(.16,.03,1.3),new Fe({color:14859594}));Z.position.set(R.x+G.x*q,.05,R.z+G.z*q),Z.rotation.y=Math.atan2(N.x,N.z),o.add(Z)}}const D=new Fe({color:15919826});for(const A of[.22,.58,.86]){const z=_.getPointAt(A),R=_.getTangentAt(A),N=new w(-R.z,0,R.x).normalize();for(let G=-3;G<=3;G++){const q=z.clone().add(R.clone().multiplyScalar(G*.55)),Z=new C(new dt(.42,.03,3.3),D);Z.position.set(q.x,.05,q.z),Z.rotation.y=Math.atan2(N.x,N.z),o.add(Z)}}for(const A of[.3,.55,.78]){const z=_.getPointAt(A),R=_.getTangentAt(A),N=new w(-R.z,0,R.x).normalize();for(const G of[-1.1,1.1]){const q=z.clone().add(N.clone().multiplyScalar(G));o.add(pv(q,Math.atan2(R.x,R.z)))}}const I=[3.55,-3.55].map(A=>{const z=[],R=e?60:120;for(let N=0;N<=R;N++){const G=N/R,q=_.getPointAt(G),Z=_.getTangentAt(G),lt=new w(-Z.z,0,Z.x).normalize();z.push(new w(q.x+lt.x*A,0,q.z+lt.z*A))}return new ln(z,!1,"centripetal",.6)}),y=[2.42,-2.42].map(A=>{const z=[],R=e?60:120;for(let N=0;N<=R;N++){const G=N/R,q=_.getPointAt(G),Z=_.getTangentAt(G),lt=new w(-Z.z,0,Z.x).normalize();z.push(new w(q.x+lt.x*A,0,q.z+lt.z*A))}return new ln(z,!1,"centripetal",.6)}),x=Og();for(const A of I){const z=Yn(A,2.2,13877398,x,M);z.position.y=.015,o.add(z)}for(const A of y){const z=Yn(A,.24,12100725,null,M);z.position.y=.035,o.add(z)}const P=new C(new As(_,e?200:400,.05,8,!1),new Fe({color:13015654,transparent:!0,opacity:.7,blending:Bi,depthWrite:!1}));P.position.y=.055,o.add(P);const O=P.geometry.index.count,V=new bd(11772544,.75);o.add(V);const Q=new xd(15918796,12101246,.5);o.add(Q);const nt=new wd(16772552,2.2);nt.position.set(-40,60,-120),nt.castShadow=!0,nt.shadow.mapSize.set(2048,2048),nt.shadow.camera.left=-160,nt.shadow.camera.right=160,nt.shadow.camera.top=200,nt.shadow.camera.bottom=-60,nt.shadow.camera.near=10,nt.shadow.camera.far=700,o.add(nt),o.add(nt.target);const tt=[],it=[],J=t.length,ht=[],B=[],ut=[],gt=[],yt=[],st=[],mt=[],Ut=[],_t=[],Vt=[],$t=[],Qt=[],Te=[],le=[],Le=[],X=[],sn=new w(.5,.3,-.5),ie=new w(.5,.3,-.5).normalize();function se(A,z){const R=Ug(A,z);return gt.push({g:R,phase:Math.random()*Math.PI*2}),o.add(R),R}function Gt(A,z,R){const N=Bg(A,z,R);return yt.push({g:N,phase:Math.random()*Math.PI*2}),o.add(N),N}t.forEach((A,z)=>{const R=.02+(z+.5)/J*.94,N=z%2===0?1:-1,G=Td(A,_,R,N,z);if(tt.push(G),it.push({mesh:G.front,kind:"panel",index:z}),o.add(G.group),o.add(In(G.group.position,6.4,4.2)),z%3===0){const q=new w(Math.cos(G.group.rotation.y),0,-Math.sin(G.group.rotation.y)).normalize(),Z=G.group.position.clone().add(q.clone().multiplyScalar(3.4));Z.y=0,Gt(Z,.9+Math.random()*.5,z),se(G.group.position.clone().add(q.clone().multiplyScalar(-3.2)),.7+Math.random()*.5)}});for(let A=0;A<i(48);A++){const z=A*13+Math.random()*7,R=7+Math.random()*27,N=4+Math.random()*3.5,G=4+Math.random()*3.5,q=Ya(N,R,G,z,-78-Math.random()*34),Z=Ya(N,R*(.7+Math.random()*.6),G,z,78+Math.random()*34);_t.push(q,Z),o.add(q,Z)}for(let A=0;A<i(14);A++){const z=30+Math.random()*450,R=Math.random()>.5?1:-1,N=28+Math.random()*55,G=42+Math.random()*50;o.add(Fg(new w(R*(210+Math.random()*150),N*.4-3,z),G,N,38+Math.random()*30))}const Me=new Y({color:ne.hill,roughness:1,flatShading:!0}),Ht=new C(new re(120,24,12),Me);Ht.scale.set(1,.5,4),Ht.position.set(-230,-2,240),o.add(Ht);const U=new C(new re(150,24,12),Me);U.scale.set(1,.55,4.5),U.position.set(280,0,330),o.add(U);const b=[];for(let A=0;A<=i(14);A++){const z=A/14*.96+.02,R=_.getPointAt(z),N=_.getTangentAt(z),G=A%2===0?1:-1,q=new w(-N.z,0,N.x).normalize(),Z=R.clone().add(q.clone().multiplyScalar(G*4.8));o.add($s(Z,G));const lt=Zs(Z,G);b.push({glow:lt.glow,pool:lt.pool,i:A}),o.add(lt.group)}for(let A=0;A<=i(13);A++){const z=A/13*.96+.02+.035;if(z>.98)continue;const R=_.getPointAt(z),N=_.getTangentAt(z),G=A%2===0?-1:1,q=new w(-N.z,0,N.x).normalize(),Z=R.clone().add(q.clone().multiplyScalar(G*5.3));o.add(fs(Z,G));const lt=R.clone().add(q.clone().multiplyScalar(G*4.6));if(Gt(lt,.8+Math.random()*.5,A*3+1),A%3===1){const Xt=R.clone().add(q.clone().multiplyScalar(G*6.1));o.add(kg(Xt))}}const $=[],ot=t.map((A,z)=>.02+(z+.5)/J*.94);for(let A=0;A<i(36);A++){let z=Math.random();for(let Xt=0;Xt<8&&(z=Math.random(),!!ot.some(me=>Math.abs(me-z)<.018));Xt++);const R=_.getPointAt(z),N=_.getTangentAt(z),G=new w(-N.z,0,N.x).normalize(),q=Math.random()>.5?1:-1,Z=R.clone().add(G.clone().multiplyScalar(q*(8.5+Math.random()*7.5))),lt=Ho(Z,.9+Math.random()*.8);$.push({g:lt,phase:Math.random()*Math.PI*2}),o.add(lt)}for(let A=0;A<i(14);A++){let z=Math.random();for(let Xt=0;Xt<8&&(z=Math.random(),!!ot.some(me=>Math.abs(me-z)<.02));Xt++);const R=_.getPointAt(z),N=_.getTangentAt(z),G=new w(-N.z,0,N.x).normalize(),q=Math.random()>.5?1:-1,Z=R.clone().add(G.clone().multiplyScalar(q*(10+Math.random()*9))),lt=mv(Z,.9+Math.random()*.9);$.push({g:lt,phase:Math.random()*Math.PI*2}),o.add(lt)}for(let A=0;A<i(7);A++){const z=.05+Math.random()*.9;if(ot.some(lt=>Math.abs(lt-z)<.015))continue;const R=_.getPointAt(z),N=_.getTangentAt(z),G=new w(-N.z,0,N.x).normalize(),q=A%2===0?1:-1,Z=R.clone().add(G.clone().multiplyScalar(q*(5.1+Math.random()*.5)));o.add(fs(Z,q))}const ct=[];for(let A=0;A<i(12);A++){const z=.04+Math.random()*.92,R=_.getPointAt(z),N=_.getTangentAt(z),G=new w(-N.z,0,N.x).normalize(),q=Math.random()>.5?1:-1,Z=R.clone().add(G.clone().multiplyScalar(q*(3.1+Math.random()*.9))),lt=Gg();lt.position.set(Z.x,0,Z.z),ct.push({g:lt,phase:Math.random()*Math.PI*2,x0:Z.x,z0:Z.z,fx:G.x*q,fz:G.z*q,state:0,timer:0,idx:A}),it.push({mesh:lt.userData.body,kind:"pigeon",index:A}),o.add(lt)}(e?[.14,.46]:[.14,.46,.82]).forEach((A,z)=>{const R=_.getPointAt(A),N=_.getTangentAt(A),G=new w(-N.z,0,N.x).normalize(),q=z%2===0?1:-1,Z=R.clone().add(G.clone().multiplyScalar(q*5.15)),lt=Math.atan2(G.x,G.z)+(q>0?0:Math.PI),Xt=Hg(Z,lt,z===1?["RÈGLES","D'AFFICHAGE"]:void 0);it.push({mesh:Xt.userData.body,kind:"morris",tip:"Colonne Morris — l'affichage classique du mobilier urbain publicitaire."}),o.add(Xt),o.add(In(Z,2,2)),o.add(jr(Z.clone().add(G.clone().multiplyScalar(q*-1.6)),2.2,.55))}),(e?[.24]:[.24,.62]).forEach((A,z)=>{const R=_.getPointAt(A),N=_.getTangentAt(A),G=new w(-N.z,0,N.x).normalize(),q=z%2===0?-1:1,Z=R.clone().add(G.clone().multiplyScalar(q*5.5)),lt=Vg(Z,q);it.push({mesh:lt.userData.poster,kind:"shelter",tip:"Abribus — le mobilier qui allie transport et communication."}),o.add(lt),o.add(In(Z,4.6,2.6))}),(e?[.19,.85]:[.12,.28,.45,.6,.76,.9]).forEach((A,z)=>{const R=_.getPointAt(A),N=_.getTangentAt(A),G=new w(-N.z,0,N.x).normalize(),q=z%2===0?1:-1,Z=R.clone().add(G.clone().multiplyScalar(q*6.4)),lt=Math.atan2(N.x,N.z)+(q>0?Math.PI:0),Xt=[13215868,9415293,13805176],me=Wg(Z,Xt[z%Xt.length],lt);B.push({g:me,phase:Math.random()*Math.PI*2}),o.add(me)});for(let A=0;A<i(8);A++){const z=.06+Math.random()*.88,R=_.getPointAt(z),N=_.getTangentAt(z),G=new w(-N.z,0,N.x).normalize(),q=Math.random()>.5?1:-1,Z=R.clone().add(G.clone().multiplyScalar(q*(5.9+Math.random()*1.4)));o.add(Xg(Z,Math.random()*Math.PI*2))}(e?[.28,.72]:[.18,.5,.8]).forEach(A=>{const z=_.getPointAt(A),R=_.getTangentAt(A),N=new w(-R.z,0,R.x).normalize(),G=z.clone().add(N.clone().multiplyScalar(3.9)),q=z.clone().add(N.clone().multiplyScalar(-3.9));G.y=5.3,q.y=5.3;const Z=iv(G,q);st.push({g:Z,phase:Math.random()*Math.PI*2}),o.add(Z)});const oe=[{color:13209450,label:"BOULANGERIE"},{color:8231528,label:"PHARMACIE"},{color:9083576,label:"LIBRAIRIE"},{color:13608308,label:"CAFÉ DU PARC"}];(e?[.15,.42,.72]:[.15,.38,.6,.84]).forEach((A,z)=>{const R=_.getPointAt(A),N=_.getTangentAt(A),G=new w(-N.z,0,N.x).normalize(),q=R.clone().add(G.clone().multiplyScalar(-1*(11+z%2*2.4))),Z=Math.atan2(G.x,G.z),lt=sv(q,Z,oe[z%oe.length].color,oe[z%oe.length].label);Vt.push(lt),o.add(lt),o.add(In(q,5.4,3.2))}),[.32,.7].forEach((A,z)=>{const R=_.getPointAt(A),N=_.getTangentAt(A),G=new w(-N.z,0,N.x).normalize(),q=z%2===0?1:-1,Z=R.clone().add(G.clone().multiplyScalar(q*2.8));o.add(qg(Z,Math.atan2(N.x,N.z),z===0?"D":"A"))});for(let A=0;A<i(8);A++){const z=.08+Math.random()*.84,R=_.getPointAt(z),N=_.getTangentAt(z),G=new w(-N.z,0,N.x).normalize(),q=Math.random()>.5?1:-1,Z=R.clone().add(G.clone().multiplyScalar(q*(4.55+Math.random()*.4)));o.add(jr(Z,1.5+Math.random()*1.2,.5+Math.random()*.3))}[{t:.09,side:-1,lines:["RÉCLAMEZ","VOTRE VILLE"]},{t:.36,side:1,lines:["ESPACE","PUBLICITAIRE"]},{t:.62,side:-1,lines:["MOBILIER","URBAIN"]},{t:.88,side:1,lines:["ZONAGE","RÉGULÉ"]}].forEach(A=>{const z=_.getPointAt(A.t),R=_.getTangentAt(A.t),N=new w(-R.z,0,R.x).normalize(),G=z.clone().add(N.clone().multiplyScalar(A.side*7.6)),q=Math.atan2(-N.x*A.side,-N.z*A.side),Z=tv(G,q,A.lines);$t.push(Z),it.push({mesh:Z.userData.face,kind:"billboard",tip:"Grand format 4×3 — un panneau publicitaire soumis au zonage."}),o.add(Z),o.add(In(G,6.4,4)),se(G.clone().add(N.clone().multiplyScalar(A.side*2.3)),.8),se(G.clone().add(N.clone().multiplyScalar(A.side*2.8)),.7)});{const z=_.getPointAt(.33),R=_.getTangentAt(.33),N=new w(-R.z,0,R.x).normalize(),G=z.clone().add(N.clone().multiplyScalar(-11)),q=Qg();q.position.copy(G);const Z=e?26:60,lt=new Float32Array(Z*3),Xt=new Ts({color:13625580,size:.09,transparent:!0,opacity:.6,blending:Ze,depthWrite:!1,sizeAttenuation:!0}),me=new Pe;me.setAttribute("position",new Oe(lt,3));const fe=new io(me,Xt);q.add(fe),ht.push({g:q,phase:0,splash:0,drops:fe,nDrops:Z,life:new Float32Array(Z).fill(0),vx:new Float32Array(Z),vy:new Float32Array(Z),vz:new Float32Array(Z)}),it.push({mesh:q.userData.pool,kind:"fountain",index:0,tip:"Fontaine publique — l'embellissement du cadre de vie."}),o.add(q),o.add(In(G,4.6,4.6));for(let Ve=0;Ve<4;Ve++){const hn=Ve/4*Math.PI*2+.4,fn=G.clone().add(new w(Math.cos(hn)*2.7,0,Math.sin(hn)*2.7));o.add(fs(fn,1)),Gt(fn.clone().add(new w(.6,0,0)),.8,Ve)}o.add(Ho(G.clone().add(new w(-3.4,0,1.4)),1.3)),o.add(Ho(G.clone().add(new w(3.2,0,-1.2)),1.2));const Ne=G.clone().add(new w(3.9,0,-3.4)),pn=Lc(Ne,Math.atan2(R.x,R.z)+Math.PI);Qt.push(pn),it.push({mesh:pn.userData.sign,kind:"stall",tip:"Étal de marché — un commerce de proximité sur la place."}),o.add(pn),o.add(In(Ne,2.6,1.4))}{const z=_.getPointAt(.33),R=_.getTangentAt(.33),N=new w(-R.z,0,R.x).normalize(),G=z.clone().add(N.clone().multiplyScalar(11.6)).add(R.clone().multiplyScalar(3)),q=Cg(G);Te.push(q),o.add(q.g);for(let Z=0;Z<i(3);Z++){const lt=Ag(G);le.push({g:lt.g,head:lt.head,tail:lt.tail,a:Z/3*Math.PI*2+Math.random(),r:.6+Math.random()*2.4,sp:.35+Math.random()*.4,ph:Math.random()*Math.PI*2}),o.add(lt.g)}for(let Z=0;Z<5;Z++){const lt=Z/5*Math.PI*2+.4,Xt=G.clone().add(new w(Math.cos(lt)*5.4,0,Math.sin(lt)*5.4)),me=Ho(Xt,.9+Math.random()*.7);$.push({g:me,phase:Math.random()*Math.PI*2}),o.add(me)}o.add(fs(G.clone().add(new w(4.6,0,1.4)),1)),o.add(fs(G.clone().add(new w(-4.4,0,-1.6)),-1))}{const A=[{t:.06,off:4.8,side:1},{t:.18,off:5.2,side:-1},{t:.33,off:-11,side:-1},{t:.46,off:6,side:1},{t:.62,off:5.6,side:-1},{t:.78,off:6.2,side:1}];(e?A.slice(0,3):A).forEach((R,N)=>{const G=_.getPointAt(R.t),q=_.getTangentAt(R.t),Z=new w(-q.z,0,q.x).normalize(),lt=G.clone().add(Z.clone().multiplyScalar(R.side*R.off));for(let Xt=0;Xt<2;Xt++){const me=Rg(lt.clone().add(new w((Math.random()-.5)*2,1.4+Math.random()*.8,(Math.random()-.5)*2)));Le.push({g:me.g,lw:me.lw,rw:me.rw,base:lt.clone(),ph:Math.random()*Math.PI*2,amp:.7+Math.random()*.9}),o.add(me.g)}})}{const z=_.getPointAt(.585),R=_.getTangentAt(.585),N=new w(-R.z,0,R.x).normalize(),G=z.clone().add(N.clone().multiplyScalar(-6.2)),q=Math.atan2(N.x,N.z),Z=ev(G,q);ut.push({g:Z,phase:0}),it.push({mesh:Z.userData.sign,kind:"kiosk",tip:"Kiosque — un point de vente au cœur de la ville."}),o.add(Z),o.add(In(G,3,2.6)),o.add(jr(G.clone().add(new w(2.4,0,0)),1.6,.5));const lt=av(G.clone().add(new w(1.5,0,1)));Ut.push({g:lt,phase:Math.random()*Math.PI*2,state:0,timer:0}),lt.userData.balloons.forEach(Xt=>it.push({mesh:Xt,kind:"balloon",tip:"Les ballons s'envolent vers le ciel !"})),o.add(lt)}const Bt=(A,z)=>.5*(ot[A]+ot[z]);for(const A of[.22,.58,.86]){const z=_.getPointAt(A),R=_.getTangentAt(A),N=new w(-R.z,0,R.x).normalize(),G=Math.random()>.5?1:-1,q=z.clone().add(N.clone().multiplyScalar(G*2.9)),Z=new w().subVectors(z,q).normalize(),lt=lv(q,Math.atan2(Z.x,Z.z));o.add(lt),X.push({g:lt,phase:Math.random()*10})}const Pt=e?4:8;for(let A=0;A<Pt;A++){const z=.05+A/Pt*.9,R=_.getPointAt(z),N=_.getTangentAt(z),G=new w(-N.z,0,N.x).normalize(),q=A%2===0?1:-1;o.add(cv(R.clone().add(G.clone().multiplyScalar(q*2.6))))}const ae=e?1:3;for(let A=0;A<ae;A++){const z=.14+A/ae*.6,R=_.getPointAt(z),N=_.getTangentAt(z),G=new w(-N.z,0,N.x).normalize(),q=A%2===0?1:-1;o.add(dv(R.clone().add(G.clone().multiplyScalar(q*2.85))))}const Jt=e?1:2;for(let A=0;A<Jt;A++){const z=.24+A*.3,R=_.getPointAt(z),N=_.getTangentAt(z),G=new w(-N.z,0,N.x).normalize(),q=A%2===0?-1:1;o.add(uv(R.clone().add(G.clone().multiplyScalar(q*2.95))))}(e?[.32,.74]:[.08,.32,.55,.78]).forEach((A,z)=>{const R=_.getPointAt(A),N=_.getTangentAt(A),G=new w(-N.z,0,N.x).normalize(),q=z%2===0?1:-1,Z=R.clone().add(G.clone().multiplyScalar(q*6.9)),lt=z%2===0?["ESPACE","PUBLICITAIRE"]:["MOBILIER","URBAIN"],Xt=hv(Z,Math.atan2(G.x,G.z)+(q>0?0:Math.PI),lt);it.push({mesh:Xt.userData.front,kind:"sucette",tip:"Sucette d'affichage — un petit format encadré par la réglementation."}),o.add(Xt),o.add(In(Z,1.6,2.2))}),(e?[Bt(1,2),Bt(8,9)]:[Bt(1,2),Bt(3,4),Bt(6,7),Bt(9,10)]).forEach((A,z)=>{const R=_.getPointAt(A),N=_.getTangentAt(A),G=new w(-N.z,0,N.x).normalize(),q=z%2===0?1:-1,Z=R.clone().add(G.clone().multiplyScalar(q*4.55));o.add(fv(Z,.9+z%3*.15))}),(e?[Bt(7,8)]:[Bt(1,2),Bt(3,4),Bt(5,6),Bt(7,8),Bt(9,10),Bt(11,12)]).forEach((A,z)=>{const R=_.getPointAt(A),N=_.getTangentAt(A),G=new w(-N.z,0,N.x).normalize(),q=z%2===0?1:-1,Z=nr();Z.cone.material.opacity=0,Z.group.position.set(R.x+G.x*q*1.7,0,R.z+G.z*q*1.7),Z.group.rotation.y=Math.atan2(N.x,N.z),o.add(Z.group)});for(const A of[.13,.45,.75]){const z=_.getPointAt(A),R=_.getTangentAt(A),N=new w(-R.z,0,R.x).normalize(),G=z.clone().add(N.clone().multiplyScalar(4.9)),q=z.clone().add(N.clone().multiplyScalar(-4.9));o.add(Dc(G)),o.add(Dc(q)),G.y=6.35,q.y=6.35,o.add(Uc(G,q,.55)),o.add(Uc(G.clone().add(new w(.14,-.22,0)),q.clone().add(new w(-.14,-.22,0)),.45))}for(const[A,z,R]of[[.1,.6,0],[.33,-.6,0],[.49,.6,1],[.65,-.6,0],[.8,.6,1],[.93,-.6,0]]){const N=_.getPointAt(A),G=_.getTangentAt(A),q=new w(-G.z,0,G.x).normalize();o.add(Ic(N.clone().add(q.clone().multiplyScalar(z)),R,Math.atan2(G.x,G.z)))}for(const A of[.31,.71]){const z=_.getPointAt(A),R=_.getTangentAt(A),N=new w(-R.z,0,R.x).normalize(),G=Math.random()>.5?1:-1;o.add(Ic(z.clone().add(N.clone().multiplyScalar(G*3.1)),1,Math.atan2(R.x,R.z)))}{const z=_.getPointAt(.24),R=_.getTangentAt(.24),N=new w(-R.z,0,R.x).normalize();[1.6,2,-1.6].forEach((G,q)=>{const Z=z.clone().add(N.clone().multiplyScalar(G)).add(R.clone().multiplyScalar(q===2?-.5:.6));o.add(gv(Z))})}{const z=_.getPointAt(.82),R=_.getTangentAt(.82),N=new w(-R.z,0,R.x).normalize(),G=z.clone().add(N.clone().multiplyScalar(11.6)),q=Lc(G,Math.atan2(-N.x,-N.z),9415293);Qt.push(q),it.push({mesh:q.userData.sign,kind:"stall",tip:"Étal de marché — un commerce de proximité sur la place."}),o.add(q),o.add(In(G,2.6,1.4))}const et=[],at=e?10:20,At=e?1:3;for(let A=0;A<at;A++){const z=A<At,R=Jg();z&&R.g.scale.setScalar(.72);const N=Math.random()>.5?1:-1,G=Math.random()>.5?1:-1;et.push({g:R.g,legL:R.legL,legR:R.legR,kneeL:R.kneeL,kneeR:R.kneeR,armL:R.armL,armR:R.armR,elbowL:R.elbowL,elbowR:R.elbowR,lean:R.lean,t:.02+Math.random()*.96,speed:(z?.009:.004+Math.random()*.005)*N,side:G,off:3+Math.random()*.9,phase:R.phase,step:0}),o.add(R.g)}for(let A=0;A<(e?1:3);A++){const z=rv(),R=Math.random()>.5?1:-1,N=Math.random()>.5?1:-1;mt.push({g:z,t:.08+Math.random()*.84,speed:(.006+Math.random()*.004)*R,side:N,off:3.4+Math.random()*.9,phase:Math.random()*Math.PI*2,step:0}),o.add(z)}for(let A=0;A<i(38);A++){const z=Math.random(),R=_.getPointAt(z),N=_.getTangentAt(z),G=new w(-N.z,0,N.x).normalize(),q=Math.random()>.5?1:-1,Z=R.clone().add(G.clone().multiplyScalar(q*(9+Math.random()*22)));Math.random()<.5?o.add(Pg(Z,1+Math.random()*2.4)):o.add(Lg(Z,.3+Math.random()*.9))}const St=[];for(let A=0;A<i(30);A++){const z=Math.random(),R=_.getPointAt(z),N=_.getTangentAt(z),G=new w(-N.z,0,N.x).normalize(),q=Math.random()>.5?1:-1,Z=R.clone().add(G.clone().multiplyScalar(q*(9+Math.random()*8))),lt=Ad(Z,.8+Math.random()*.8);St.push({g:lt,phase:Math.random()*Math.PI*2}),o.add(lt)}for(let A=0;A<i(66);A++){let z=Math.random();for(let lt=0;lt<8&&(z=Math.random(),!!ot.some(Xt=>Math.abs(Xt-z)<.012));lt++);const R=_.getPointAt(z),N=_.getTangentAt(z),G=new w(-N.z,0,N.x).normalize(),q=Math.random()>.5?1:-1,Z=R.clone().add(G.clone().multiplyScalar(q*(5.8+Math.random()*3.4)));if(se(Z,.5+Math.random()*.8),Math.random()<.35){const lt=R.clone().add(G.clone().multiplyScalar(q*(6.2+Math.random()*1.6)));Gt(lt,.7+Math.random()*.5,A*7%9)}}const Zt=[];for(let A=0;A<i(17);A++){const z=Ng(new w((Math.random()-.5)*130,30+Math.random()*20,Math.random()*440),1.4+Math.random()*2.6);Zt.push({g:z,speed:.5+Math.random()*.8,phase:Math.random()*Math.PI*2,y0:z.position.y,s0:z.scale.x}),o.add(z)}[{t:.12,side:1,lines:["Audit","d'abord"],tip:"Toute réorganisation commence par l'audit des acteurs du secteur."},{t:.5,side:-1,lines:["Zonage","du territoire"],tip:"Le zonage délimite les espaces publicitaires selon des normes."},{t:.88,side:1,lines:["Mise à jour","continue"],tip:"Un secteur en phase avec l'urbanisation se pérennise."}].forEach(A=>{const z=_.getPointAt(A.t),R=_.getTangentAt(A.t),N=new w(-R.z,0,R.x).normalize(),G=z.clone().add(N.clone().multiplyScalar(A.side*5.5)),q=new w().subVectors(z,G).normalize(),Z=zg(G,Math.atan2(q.x,q.z),A.lines);it.push({mesh:Z.sign,kind:"sign",tip:A.tip}),o.add(Z.group)});const Ue=Ig(e?180:420);o.add(Ue);const pe=Math.random()*Math.PI*2,dn=e?60:130,un=new Float32Array(dn*3);for(let A=0;A<dn;A++){const z=Math.random(),R=_.getPointAt(z),N=_.getTangentAt(z),G=new w(-N.z,0,N.x).normalize(),q=Math.random()>.5?1:-1,Z=2.6+Math.random()*8;un[A*3]=R.x+G.x*q*Z,un[A*3+1]=.35+Math.random()*2.6,un[A*3+2]=R.z+G.z*q*Z}const Ls=new Pe;Ls.setAttribute("position",new Oe(un,3));const Is=new Ts({color:16180136,size:vs()?.1:.13,transparent:!0,opacity:0,blending:Ze,depthWrite:!1,sizeAttenuation:!0}),Mn=new io(Ls,Is);o.add(Mn);const Wi=[];for(let A=0;A<i(30);A++){const z=nv(),R=Math.random(),N=_.getPointAt(R),G=_.getTangentAt(R),q=new w(-G.z,0,G.x).normalize(),Z=Math.random()>.5?1:-1,lt=N.x+q.x*Z*(2+Math.random()*7),Xt=.4+Math.random()*4,me=N.z+q.z*Z*(2+Math.random()*7);z.position.set(lt,Xt,me),Wi.push({g:z,x:lt,y:Xt,z:me,vx:(Math.random()-.5)*2.2,vz:-(.8+Math.random()*1.4),vy:-(.3+Math.random()*.4),spin:(Math.random()-.5)*4,phase:Math.random()*Math.PI*2}),o.add(z)}const Ds=[];for(let A=0;A<i(9);A++){const z=Dg();z.g.position.set(-60+Math.random()*120,9+Math.random()*8,40+Math.random()*120),Ds.push({g:z.g,l:z.l,r:z.r,phase:Math.random()*Math.PI*2,speed:4+Math.random()*3,y0:z.g.position.y,z0:z.g.position.z}),o.add(z.g)}const Us=[];for(let A=0;A<i(7);A++){const z=nr();Us.push({g:z.group,cone:z.cone,body:z.body,beamY:.55,t:A/7,speed:.02+Math.random()*.014,phase:Math.random()*Math.PI*2}),o.add(z.group)}const xi=[];for(let A=0;A<(e?1:2);A++){const z=ov();xi.push({g:z.group,cone:z.cone,body:z.body,beamY:1.05,t:.2+A*.5,speed:.014+Math.random()*.004,phase:Math.random()*Math.PI*2}),o.add(z.group)}const si=Us.concat(xi);for(const A of si){const z=new nn(1.15,5.4,14,1,!0),R=new Fe({color:16773320,transparent:!0,opacity:0,blending:Ze,depthWrite:!1,side:ze});A.beam=new C(z,R),A.beam.rotation.x=-Math.PI/2,A.beam.position.set(0,A.beamY,3.6),A.g.add(A.beam),A.flash=0}si.forEach((A,z)=>it.push({mesh:A.body,kind:"car",index:z}));const Si=new w,Xi=new w,qi=new w,Yi=new w;let co=performance.now()*.001,Je=null,E=null,H=1/0,K=0;function j(A){Je=A&&A.kind?A:null}function W(A){if(!(!A||!A.kind)){if(A.kind==="pigeon"){const z=ct[A.index];z&&z.state===0&&(z.state=1,z.timer=0)}else if(A.kind==="balloon")for(const z of Ut)z.state===0&&(z.state=1,z.timer=0);else if(A.kind==="fountain"){const z=ht[A.index];z&&(z.splash=1)}else if(A.kind==="car"){const z=si[A.index];z&&(z.flash=1)}}}function pt(A,z){const R=performance.now()*.001,N=Math.min(.05,Math.max(.001,R-co));co=R;const G=.005+A*.98,q=d();f(q);const Z=Math.min(1,N*1.6);u.top.lerp(h.top,Z),u.mid.lerp(h.mid,Z),u.hor.lerp(h.hor,Z),u.amb.lerp(h.amb,Z),u.hs.lerp(h.hs,Z),u.hg.lerp(h.hg,Z),u.sun.lerp(h.sun,Z),u.fog.lerp(h.fog,Z),u.night+=(h.night-u.night)*Z,u.warm+=(h.warm-u.warm)*Z,u.sunI+=(h.sunI-u.sunI)*Z,u.exp+=(h.exp-u.exp)*Z;const lt=u.night;m.uniforms.night.value=lt,m.uniforms.warm.value=u.warm,m.uniforms.top.value.copy(u.top),m.uniforms.mid.value.copy(u.mid),m.uniforms.horizon.value.copy(u.hor),m.uniforms.sunColor.value.copy(u.sun);const Xt=(q-6.2)/13.8*Math.PI,me=Math.max(0,Math.sin(Xt));sn.set(Math.sin(Xt)*.55,me*.95+.08,-Math.cos(Xt)*.55),ie.lerp(sn,Z).normalize(),m.uniforms.sunDir.value.copy(ie),s.toneMappingExposure=an.lerp(s.toneMappingExposure,u.exp,Math.min(1,N*2)),V.color.copy(u.amb),V.intensity=.75*(1-lt)+.4*lt,Q.color.copy(u.hs),Q.groundColor.copy(u.hg),Q.intensity=.5*(1-lt)+.45*lt,nt.color.copy(u.sun),nt.intensity=2.2*u.sunI*(1-lt)+.3*lt,lt<.5!==nt.castShadow&&(nt.castShadow=lt<.5),o.fog.color.copy(u.fog),v.position.copy(ie).multiplyScalar(560),v.scale.setScalar(26+me*26),g.position.copy(ie).multiplyScalar(-560),v.material.opacity=(1-lt)*(.35+me*.65),g.material.opacity=lt;const fe=_.getPointAt(G),Ne=_.getTangentAt(G),pn=_.getPointAt(Math.min(G+.045,.999));qi.set(-Ne.z,0,Ne.x).normalize();const Ve=Math.sin(R*.7)*.07,hn=Math.sin(R*.25)*.18;Si.set(fe.x+qi.x*hn,fe.y+3.45+Ve,fe.z+qi.z*hn),Xi.set(pn.x,pn.y+2.7,pn.z);{let S=0,Ct=1/0;const Yt=G+.03;for(let ue=0;ue<J;ue++){const De=.02+(ue+.5)/J*.94,de=Math.abs(De-Yt);de<Ct&&(Ct=de,S=ue)}const Rt=an.clamp(1-Ct/.06,0,1);if(Rt>0){const ue=tt[S].group.position,De=ue.x-r.position.x,de=ue.z-r.position.z,kn=De*Ne.x+de*Ne.z>0,yn=Math.hypot(De,de),Ln=an.clamp((yn-9)/10,0,1),oi=Rt*Rt*(3-2*Rt)*(kn?1:0)*Ln;oi>0&&Xi.lerp(new w(ue.x,ue.y+2.8,ue.z),oi*.3)}}r.up.set(0,1,0),r.lookAt(Xi);const fn=Math.atan2(Ne.x,Ne.z),uo=fn-K;K=fn;const Ld=an.clamp(uo/Math.max(N,.001)*.09,-.08,.08);r.rotation.z=an.lerp(r.rotation.z,Ld,.06);const ml=55,Id=15.2;Yi.addScaledVector(Si,ml*N),Yi.addScaledVector(r.position,-ml*N),Yi.multiplyScalar(Math.max(0,1-Id*N)),r.position.addScaledVector(Yi,N),P.geometry.setDrawRange(0,Math.floor(O*A)),tt.forEach((S,Ct)=>{const Yt=Ct===z,Rt=Je&&Je.kind==="panel"&&Je.index===Ct,ue=Math.abs(A-(.02+(Ct+.5)/J*.94))<.06,De=Yt?.96:Rt?1.04:.78,de=Rt?.18:Yt?.12:ue?.04:0,kn=Rt?.12:.08;S.group.scale.setScalar(an.lerp(S.group.scale.x,De,kn)),S.light&&(S.light.intensity=an.lerp(S.light.intensity,de+lt*.55,kn)),S.group.position.y=an.lerp(S.group.position.y,Yt?.22:0,.06),S.beaconMat.emissiveIntensity=(.22+Math.sin(R*2.4+Ct)*.1)*(1-lt)+(1.3+Math.sin(R*2.4+Ct)*.3)*lt,S.frontMat.emissiveIntensity=an.lerp(S.frontMat.emissiveIntensity,lt*.3,.06);const yn=r.position.x-S.group.position.x,Ln=r.position.z-S.group.position.z,oi=Math.hypot(yn,Ln),Ns=yn*Ne.x+Ln*Ne.z<0,ho=an.clamp(1-oi/32,0,1)*(Ns?1:0),Ud=Ns?Math.atan2(yn,Ln):S.restRot,Nd=Ns?ho*.14:.02;S.group.rotation.y=an.lerp(S.group.rotation.y,Ud,Nd)}),si.forEach((S,Ct)=>{S.t=(S.t+S.speed*N)%1;const Yt=_.getPointAt(S.t),Rt=_.getTangentAt(S.t);S.g.position.set(Yt.x,.06+Math.sin(R*3+S.t*44)*.02,Yt.z),S.g.rotation.y=Math.atan2(Rt.x,Rt.z),S.cone.material.opacity=.45+Math.sin(R*11+S.phase)*.15;const ue=Je&&Je.kind==="car"&&Je.index===Ct;S.flash=Math.max(0,S.flash-N*1.4);const De=ue?.24+.4*lt+S.flash*.5:S.flash*.5;S.beam.material.opacity=an.lerp(S.beam.material.opacity,De,.09);const de=1+(ue?.18:0)+S.flash*.25;S.beam.scale.set(de,de,de)});for(const S of St)S.g.rotation.z=Math.sin(R*.9+S.phase)*.05,S.g.rotation.y+=3e-4;for(const S of $){const Ct=.5+.5*Math.sin(R*.31+S.phase*1.7);S.g.rotation.z=Math.sin(R*.6+S.phase)*.022+Math.sin(R*1.9+S.phase*2.3)*.016*Ct,S.g.rotation.x=Math.sin(R*.83+S.phase*.7)*.014,S.g.rotation.y=Math.sin(R*.47+S.phase)*.02}for(const S of ct){Je&&Je.kind==="pigeon"&&Je.index===S.idx&&S.state===0&&(S.state=1,S.timer=0);const Yt=Math.sin(R*26+S.phase);if(S.state===1){S.timer+=N;const Rt=Math.min(1,S.timer/1.1);S.g.position.y=Rt*2.4,S.g.position.x=S.x0+S.fx*Rt*5.5+Math.sin(R*3)*.06,S.g.position.z=S.z0+S.fz*Rt*5.5,S.g.rotation.z=(1-Rt)*Math.sin(R*2.2+S.phase)*.08-Rt*.22,S.g.rotation.x=-Rt*.45,S.g.scale.y=1+Math.abs(Yt)*.24,S.g.scale.x=1-Math.abs(Yt)*.13,Rt>=1&&(S.state=2,S.timer=0)}else if(S.state===2)S.timer+=N,S.g.position.y=2.4+Math.sin(R*2)*.15,S.g.position.x=S.x0+S.fx*5.5,S.g.position.z=S.z0+S.fz*5.5,S.timer>2.6&&(S.state=3,S.timer=0);else if(S.state===3){S.timer+=N;const Rt=Math.min(1,S.timer/1.4);S.g.position.y=2.4*(1-Rt),S.g.position.x=S.x0+S.fx*5.5*(1-Rt),S.g.position.z=S.z0+S.fz*5.5*(1-Rt),S.g.rotation.z=Rt*Math.sin(R*2.2+S.phase)*.08,S.g.rotation.x=0,S.g.scale.set(1,1,1),Rt>=1&&(S.state=0,S.timer=0)}else{const Rt=Math.abs(Math.sin(R*2.2+S.phase))*.05;S.g.position.y=Rt,S.g.rotation.z=Math.sin(R*2.2+S.phase)*.08,S.g.position.x=S.x0+Math.sin(R*.35+S.phase)*.4,S.g.position.z=S.z0+Math.cos(R*.3+S.phase)*.3}}for(const S of et){S.t=(S.t+S.speed*N)%1,S.t<0&&(S.t+=1);const Ct=_.getPointAt(S.t),Yt=_.getTangentAt(S.t),Rt=new w(-Yt.z,0,Yt.x).normalize();S.g.position.set(Ct.x+Rt.x*S.side*S.off,0,Ct.z+Rt.z*S.side*S.off),S.g.rotation.y=Math.atan2(Yt.x,Yt.z)+(S.side>0?0:Math.PI),S.step+=N*(6+Math.abs(S.speed)*90);const ue=Math.sin(S.step)*.5;S.legL.rotation.x=ue,S.legR.rotation.x=-ue,S.kneeL.rotation.x=Math.max(0,-ue)*.95,S.kneeR.rotation.x=Math.max(0,ue)*.95,S.armL.rotation.x=-ue*.8,S.armR.rotation.x=ue*.8,S.elbowL.rotation.x=Math.max(0,ue)*.9,S.elbowR.rotation.x=Math.max(0,-ue)*.9,S.lean.rotation.z=Math.sin(S.step)*.025,S.lean.rotation.x=.045+Math.abs(Math.sin(S.step))*.025,S.g.position.y=Math.abs(Math.sin(S.step))*.04}for(const S of b){const Ct=.9+Math.sin(R*9+S.i*1.7)*.09;S.glow.material.opacity=(.08*(1-lt)+.85*lt)*Ct,S.pool.material.opacity=(.1*(1-lt)+.55*lt)*Ct}if(E){const S=(R-E.t0)/1.05;E.sp.position.lerpVectors(E.from,E.to,Math.min(1,S)),E.sp.material.opacity=Math.sin(Math.min(1,S)*Math.PI),S>=1&&(o.remove(E.sp),E.sp.material.dispose(),E=null,H=8+Math.random()*10)}else if(H-=N,H<=0){const S=new Qn(new zn({map:Rn(0,"rgba(255,242,214,1)"),transparent:!0,blending:Ze,depthWrite:!1,opacity:0}));S.scale.setScalar(2.4);const Ct=new w(120+Math.random()*60,92+Math.random()*36,-330-Math.random()*130);S.position.copy(Ct),o.add(S),E={sp:S,t0:R,from:Ct,to:Ct.clone().add(new w(-78,-30,16))}}for(const S of X){const Ct=(R+S.phase)%12/12,Yt=Ct<.4,Rt=Ct>=.4&&Ct<.78,ue=Ct>=.78,[De,de,kn]=S.g.userData.bulbs,[yn,Ln]=S.g.userData.peds,oi=(Ns,ho)=>Ns?ho+lt*.6:ho*.12;De.material.emissiveIntensity=oi(Yt,1),de.material.emissiveIntensity=oi(ue,.95),kn.material.emissiveIntensity=oi(Rt,.9),yn.material.emissiveIntensity=Rt?.75+lt*.4:.08,Ln.material.emissiveIntensity=Rt?.08:.75+lt*.4}for(const S of Ds){S.g.position.x+=S.speed*.02*(.75+.25*Math.sin(R*.8+S.phase)),S.g.position.y=S.y0+Math.sin(R*1.3+S.phase)*.8+Math.sin(R*.4+S.phase*2)*.35,S.g.position.z=S.z0+Math.sin(R*.6+S.phase)*3.5;const Ct=Math.cos(R*.6+S.phase)*.6,Yt=Math.cos(R*1.3+S.phase)*.4,Rt=Math.sin(R*(9+Math.abs(Math.sin(R*.8+S.phase))*3)+S.phase)*.75;S.l.rotation.z=Rt,S.r.rotation.z=-Rt,S.g.rotation.z=.25+Math.sin(R*1.3+S.phase)*.12+Math.cos(R*.6+S.phase)*.08+Ct*.22,S.g.rotation.x=-Yt*.3-Math.cos(R*1.3+S.phase)*.08,S.g.rotation.y=-Ct*.35,S.g.position.x>80&&(S.g.position.x=-80,S.y0=8+Math.random()*9,S.z0=30+Math.random()*90,S.g.position.z=S.z0,S.g.position.y=S.y0)}Ue.rotation.y=R*.05,Ue.material.opacity=(.5+Math.sin(R*3)*.12)*(1-lt*.7),Ue.position.x=Math.sin(R*.12)*2.4,Ue.position.z=Math.cos(R*.09)*1.6;const Dd=.35+Math.sin(R*2.1+pe)*.15;Is.opacity=lt*Dd,Mn.position.x=Math.sin(R*.08)*1.8,Mn.position.z=Math.cos(R*.06)*1.2,Mn.rotation.y=R*.02;for(const S of Zt){S.g.position.x+=S.speed*.02,S.g.position.y=S.y0+Math.sin(R*.22+S.phase)*.7;const Ct=1+Math.sin(R*.3+S.phase)*.05;S.g.scale.set(S.s0*Ct,S.s0*Ct,S.s0*Ct),S.g.position.x>150&&(S.g.position.x=-150)}for(const S of ht){S.splash=Math.max(0,S.splash-N*1.2);const Ct=Je&&Je.kind==="fountain",Yt=1+S.splash*.9+(Ct?.5:0),Rt=(Math.sin(R*2.6+S.phase)*.5+1)*Yt;S.g.userData.jet.scale.set(1,.7+.3*Rt,1),S.g.userData.jet.rotation.z=Math.sin(R*3.1)*.06*Yt,S.g.userData.jet.rotation.x=Math.cos(R*2.7)*.05*Yt,S.g.userData.pool.rotation.z=R*.25;const ue=(1+Math.sin(R*1.8+S.phase)*.03)*(1+S.splash*.12);if(S.g.userData.pool.scale.set(ue,ue,ue),S.g.userData.dish.rotation.z=Math.sin(R*1.4)*.03,S.drops){const De=S.drops.geometry.attributes.position;for(let de=0;de<S.nDrops;de++){let kn=S.life[de];if(kn-=N*(2.2+S.splash*2.4),kn<0){S.life[de]=1;const yn=Math.random()*Math.PI*2,Ln=.12+Math.random()*.3;S.vx[de]=Math.cos(yn)*Ln,S.vz[de]=Math.sin(yn)*Ln,S.vy[de]=.55+Math.random()*.4*Yt,De.array[de*3]=Math.cos(yn)*.3,De.array[de*3+1]=1.25,De.array[de*3+2]=Math.sin(yn)*.3}else S.vy[de]-=1.5*N,De.array[de*3]+=S.vx[de]*N,De.array[de*3+1]+=S.vy[de]*N,De.array[de*3+2]+=S.vz[de]*N,De.array[de*3+1]<.35&&(S.life[de]=0,De.array[de*3+1]=.35)}De.needsUpdate=!0,S.drops.material.opacity=(.55+.3*Rt)*(.35+.65*(1-lt))}}for(const S of B)S.g.userData.parasol.rotation.z=Math.sin(R*.9+S.phase)*.06,S.g.userData.parasol.rotation.x=Math.sin(R*.7+S.phase*1.3)*.05;for(const S of Te){const Ct=S.water.material;Ct.roughness=.08+(Math.sin(R*1.1)*.5+.5)*.05,S.water.rotation.z=Math.sin(R*.3)*.01}for(const S of le){S.a+=S.sp*N;const Ct=S.g.userData.ox??(S.g.userData.ox=S.g.position.x),Yt=S.g.userData.oz??(S.g.userData.oz=S.g.position.z);S.g.position.x=Ct+Math.cos(S.a)*S.r,S.g.position.z=Yt+Math.sin(S.a)*S.r,S.g.rotation.y=-S.a+Math.PI/2,S.g.position.y=.1+Math.sin(R*2.2+S.ph)*.02,S.head.rotation.z=Math.sin(R*3.1+S.ph)*.14,S.tail.rotation.z=Math.sin(R*2.6+S.ph)*.1}for(const S of Le){const Ct=Math.sin(R*24+S.ph);S.lw.rotation.z=-.55+Ct*.85,S.rw.rotation.z=.55-Ct*.85,S.g.position.x=S.base.x+Math.sin(R*.9+S.ph)*S.amp,S.g.position.z=S.base.z+Math.cos(R*1.3+S.ph*1.7)*S.amp*.7,S.g.position.y=S.base.y+Math.sin(R*2.4+S.ph*2)*.5,S.g.rotation.y=Math.sin(R*1.1+S.ph)*.9}for(const S of ut){const Ct=S.g.userData.flag;Ct.rotation.z=Math.sin(R*2.4+S.phase)*.28,Ct.position.y=2.42+Math.sin(R*2.4+S.phase)*.04,S.g.userData.sign.material.emissiveIntensity=lt*.75}for(let S=0;S<_t.length;S++)_t[S].material.emissiveIntensity=lt*(.8+Math.sin(R*1.6+S*1.7)*.18);const mr=lt*.85;for(const S of Vt){S.userData.window.material.emissiveIntensity=mr;const Ct=S.position.x*1.7+S.position.z*3.1;S.userData.awning.rotation.z=Math.sin(R*.55+Ct)*.03,S.userData.awning.rotation.x=Math.sin(R*.4+Ct*1.3)*.025}for(const S of $t)S.userData.face.material.emissiveIntensity=mr;for(const S of Qt){S.userData.sign.material.emissiveIntensity=mr;const Ct=S.position.x*1.9+S.position.z*2.7;S.userData.awning.rotation.z=Math.sin(R*.6+Ct)*.035,S.userData.awning.rotation.x=Math.sin(R*.45+Ct*1.2)*.028}for(const S of st)S.g.rotation.z=Math.sin(R*.7+S.phase)*.05;for(const S of mt){S.t=(S.t+S.speed*N)%1,S.t<0&&(S.t+=1);const Ct=_.getPointAt(S.t),Yt=_.getTangentAt(S.t),Rt=new w(-Yt.z,0,Yt.x).normalize();S.g.position.set(Ct.x+Rt.x*S.side*S.off,Math.abs(Math.sin(S.step))*.03,Ct.z+Rt.z*S.side*S.off),S.g.rotation.y=Math.atan2(Yt.x,Yt.z)+(S.side>0?0:Math.PI),S.step+=N*14,S.g.userData.tail.rotation.z=Math.sin(R*7+S.phase)*.55}for(const S of Ut){const Ct=S.g.userData.balloons;if(S.state===1){S.timer+=N;const Yt=Math.min(1,S.timer/2.2);for(let Rt=0;Rt<Ct.length;Rt++)Ct[Rt].position.y=1.2+Yt*5.6+Math.sin(Rt*2.1)*.05,Ct[Rt].position.x=(Rt-1)*.22+Math.sin(Yt*6+Rt*2.3)*Yt*.9;Yt>=1&&(S.state=2,S.timer=0)}else if(S.state===2)S.timer+=N,S.timer>3.6&&(S.state=3,S.timer=0);else if(S.state===3){S.timer+=N;const Yt=Math.min(1,S.timer/1.6);for(let Rt=0;Rt<Ct.length;Rt++)Ct[Rt].position.y=1.2+5.6-Yt*5.6+Math.sin(Rt*2.1)*.05,Ct[Rt].position.x=(Rt-1)*.22;Yt>=1&&(S.state=0,S.timer=0)}else{const Yt=Je&&Je.kind==="balloon";for(let Rt=0;Rt<Ct.length;Rt++)Ct[Rt].position.y=1.2+Math.sin(Rt*2.1)*.05+Math.sin(R*(Yt?2.6:1.1)+S.phase+Rt*1.7)*(Yt?.22:.12),Ct[Rt].position.x=(Rt-1)*.22+Math.sin(R*.8+Rt*2.3)*.04}}for(const S of gt)S.g.rotation.z=Math.sin(R*.7+S.phase)*.03;for(const S of yt)S.g.rotation.z=Math.sin(R*.9+S.phase)*.06;for(const S of Wi)if(S.x+=(Math.sin(R*.5+S.phase)*.6+S.vx)*N,S.z+=S.vz*N,S.y+=S.vy*N,S.g.rotation.x+=S.spin*N,S.g.rotation.z+=S.spin*.6*N,S.g.position.set(S.x,S.y,S.z),S.y<.18){const Ct=Math.min(.97,Math.max(.02,G+(Math.random()-.35)*.12)),Yt=_.getPointAt(Ct),Rt=_.getTangentAt(Ct),ue=new w(-Rt.z,0,Rt.x).normalize(),De=Math.random()>.5?1:-1;S.x=Yt.x+ue.x*De*(2+Math.random()*7),S.z=Yt.z+ue.z*De*(2+Math.random()*7),S.y=1.5+Math.random()*3,S.phase=Math.random()*Math.PI*2}}const wt=new bg,Nt=new Dt;function zt(A,z){Nt.set(A,z),wt.setFromCamera(Nt,r);const R=wt.intersectObjects(it.map(G=>G.mesh),!1);if(!R.length)return null;const N=R[0];return N.distance>45?null:it[it.findIndex(G=>G.mesh===N.object)]}function qt(){const A=window.innerWidth,z=window.innerHeight;r.aspect=A/z,r.updateProjectionMatrix(),s.setSize(A,z)}function jt(A,z){const R=it.find(G=>G.kind===A&&(z===void 0||G.index===z));if(!R)return null;const N=new w;if(R.mesh.getWorldPosition(N),N.distanceTo(r.position)>42)return null;if(A==="fountain"){const G=N.clone().sub(r.position).normalize();N.addScaledVector(G,1.25)}return N.project(r),N.z>1||N.z<-1?null:{x:N.x,y:N.y}}function Ft(){return{pigeons:ct.map(A=>A.state),balloons:Ut.map(A=>A.state),beams:si.map(A=>Math.round(A.beam.material.opacity*100)/100),fountain:ht.map(A=>Math.round(A.splash*100)/100)}}function ce(){return r.position.clone()}function ye(){s.render(o,r)}return{render:ye,resize:qt,update:pt,pick:zt,interact:W,projectPickable:jt,getReactiveState:Ft,getCameraPos:ce,setHover:j,setTimeMode:A=>{l=A==="day"||A==="night"?A:"auto"},setHour:A=>{c=A},setNight:A=>{l=A?"night":"day"},getTimeInfo:()=>({hour:d(),mode:l,night:u.night})}}const Jr={module:"Module 1",title:"Formation sur la panneautique.",subtitle:"Domaine public :"},Ko=[{name:"Chapitre 1",label:"Introduction :"},{name:"Chapitre 2",label:"Réorganisation & Réaménagement du secteur :"},{name:"Chapitre 3",label:"Évaluation du système d'exploitation :"},{name:"Chapitre 4",label:"Mise à jour :"},{name:"Questionnaire",label:"Module 1 :"}],$e=[{id:"presentation",chapter:0,num:"01",kicker:"Chapitre 1 · Présentation :",title:"La panneautique, un véritable corps de métier.",bullets:["Ensemble des moyens et techniques d'installation et de gestion des panneaux publicitaires","Une étude pluridisciplinaire"],content:[{t:"Un métier à part entière :",b:"La panneautique, en tant qu'ensemble des moyens et techniques d'installation et de gestion des panneaux publicitaires, est un véritable corps de métier dont l'étude est pluridisciplinaire."},{t:"Ce que vous allez parcourir :",b:"De l'importance du panneau publicitaire au constat général dans le secteur, de la réorganisation complète (en sept étapes) du domaine d'activité aux techniques d'évaluation et de mise à jour de l'ensemble du processus ; le module 1 est conçu pour un embellissement durable du cadre de vie des populations, un rayonnement de l'économie grâce à l'exploitation du mobilier urbain de publicité et à la pérennité des acquis de développement dans ce corps de métier. Un questionnaire en douze points achève le module."}]},{id:"lecon1-importance",chapter:0,num:"02",kicker:"Chapitre 1 · Leçon 1 :",title:"Le panneau publicitaire et son importance socio-économique.",bullets:["Booste la concurrence entre les entreprises","Propulse l'économie : compétitivité des acteurs","Vecteur de publicité : stimule la consommation","Participe à l'embellissement des villes"],content:[{t:"Un moteur pour la concurrence :",b:"L'exploitation des panneaux publicitaires est une activité qui booste la concurrence entre les entreprises. Elle propulse l'économie grâce à l'accroissement et à l'amélioration de la compétitivité des différents acteurs de la vie économique d'un pays."},{t:"Le support de publicité par excellence :",b:"Vecteur de publicité, le panneau stimule et encourage la consommation. Lorsque l'activité est bien réglementée et bien encadrée, les normes d'exercice garantissent l'équité dans la gestion du secteur. On ne paie pas pour regarder un panneau : c'est le support publicitaire par excellence."},{t:"Une part du décor urbain :",b:"Par leurs aménagements, les panneaux publicitaires contribuent à l'embellissement des villes. Le choix des supports ne doit donc plus être motivé seulement par leur design, mais aussi par un besoin d'esthétique, pour un environnement et un cadre de vie plus agréables à la vue."}]},{id:"lecon2-constat",chapter:0,num:"03",kicker:"Chapitre 1 · Leçon 2 :",title:"Constat général.",bullets:["Pléthore de panneaux, parfois dans les capitales","Pollution visuelle, insalubrité, insécurité","Secteur mal organisé, ou pas encadré du tout","Supports délabrés, absence de normes"],content:[{t:"Des villes saturées :",b:"Dans beaucoup de villes à travers le monde — l'Afrique en est un bel exemple —, il est fréquent de constater, parfois dans des capitales, des cas de pléthore de panneaux publicitaires, cause de pollution visuelle, d'insalubrité et d'insécurité pour les personnes et les biens."},{t:"Une source : l'anarchie",b:"Un secteur d'exploitation mal organisé, mal encadré, ou pas encadré du tout, où règnent l'anarchie et le désordre, en est la source. L'état délabré et obsolète des supports, l'absence de normes et de réglementations rendent le secteur contre-productif et dégradent l'environnement."},{t:"Des mesures nécessaires :",b:"Il importe donc, pour le rayonnement du secteur et pour sa contribution effective au développement socio-économique des villes, que des mesures adéquates soient prises."}]},{id:"audit",chapter:1,num:"04",kicker:"Chapitre 2 · Étape 1 · Audit :",title:"Audit de la gestion en cours.",bullets:["Liste exhaustive de tous les acteurs du secteur","Examen du mécanisme d'attribution des supports","Examen du cahier des charges"],content:[{t:"Étape 3.1 :",b:"Pour que l'activité d'exploitation des panneaux publicitaires participe au rayonnement d'une ville (ou d'un pays), il faut faire un audit de la gestion en cours."},{t:"En quoi consiste-t-il ?",b:"En l'établissement de la liste exhaustive de tous les acteurs — entreprise ou personne exploitant des panneaux à des fins publicitaires — et en l'examen du mécanisme d'attribution des supports et du cahier des charges."}]},{id:"etat-lieux",chapter:1,num:"05",kicker:"Chapitre 2 · Étape 2 · État des lieux :",title:"État des lieux du parc existant.",bullets:["Relevé GPS détaillé et précis de tous les panneaux","Plan piqué géolocalisable des supports"],content:[{t:"Étape 3.2 :",b:"Faire le relevé (GPS) détaillé et précis de l'ensemble des panneaux publicitaires présents."},{t:"Un plan géolocalisable :",b:"Établir le plan piqué géolocalisable de ces supports : chaque panneau est localisé avec précision sur le territoire."}]},{id:"zonage",chapter:1,num:"06",kicker:"Chapitre 2 · Étape 3 · Zonage :",title:"Zonage du territoire.",bullets:["Délimitation selon des normes spécifiques du territoire","Des supports facteurs d'embellissement et de modernité","Paysage publicitaire harmonieux et équilibré","Grilles tarifaires adaptées aux réalités locales"],content:[{t:"Étape 3.3 :",b:"Pour un réaménagement optimal du plan d'implantation des panneaux publicitaires, il faut effectuer des délimitations suivant des normes spécifiques du territoire et proposer des supports facteurs d'embellissement et symboles de modernité."},{t:"Le but du zonage :",b:"Créer les conditions d'un développement harmonieux et équilibré du paysage de l'affichage publicitaire, ainsi que l'établissement de grilles tarifaires en adéquation avec les réalités économiques des villes. Il consiste donc à délimiter des espaces à cette fin."}]},{id:"constitution-lots",chapter:1,num:"07",kicker:"Chapitre 2 · Étape 4 · Constitution des lots :",title:"Constitution des lots.",bullets:["Le « Mobilier Urbain de Publicité » : des objets d'embellissement","Des lots pour les appels d'offres","Équilibre des espaces et des types de supports"],content:[{t:"Étape 4 :",b:"Le terme « Mobilier Urbain de Publicité » s'inscrit dans un contexte où les panneaux publicitaires ne sont plus seulement des supports publicitaires, mais de véritables objets (ou meubles) d'embellissement et de décoration des villes."},{t:"Vers les appels d'offres :",b:"Après études et validation des supports devant être pris en compte dans le cadre du réaménagement, on procède à la constitution des lots devant faire l'objet d'appels d'offres pour la mise en concession des différents espaces publicitaires."},{t:"Garantir un équilibre :",b:"La constitution des lots est faite de manière à garantir l'équilibre des espaces et celui en matière de type de support des différentes régies publicitaires."}]},{id:"mise-concession",chapter:1,num:"08",kicker:"Chapitre 2 · Étape 5 · Mise en concession :",title:"Mise en concession des espaces.",bullets:["Une technique variable selon les pays","Fonction des réalités économiques et législatives","À traiter au cas par cas"],content:[{t:"Étape 5 :",b:"La technique de mise en concession des espaces publicitaires est variable. Elle est fonction des réalités économiques, politico-administratives et de la législation en vigueur dans chaque pays."},{t:"À retenir :",b:"NB : il faut partir d'exemples précis et traiter le sujet au cas par cas."}]},{id:"attribution",chapter:1,num:"09",kicker:"Chapitre 2 · Étape 6 · Attribution :",title:"Attribution des espaces.",bullets:["Sur la base du cahier des charges","Contenu dans le dossier d'appel d'offres"],content:[{t:"Étape 6 :",b:"L'attribution des espaces aux régies publicitaires est faite sur la base du cahier des charges contenu dans le dossier d'appel d'offres."}]},{id:"gestion",chapter:1,num:"10",kicker:"Chapitre 2 · Étape 7 · Gestion :",title:"Gestion par les régies publicitaires.",bullets:["Collectivités locales ou Gouvernement","Selon les textes en vigueur dans chaque pays","Transparence, professionnalisme, efficience"],content:[{t:"Étape 7 :",b:"La gestion par les régies publicitaires est encadrée, dans certains pays, par les collectivités locales. Dans d'autres, elle est du ressort du Gouvernement par l'intermédiaire du Ministère de la Communication, etc."},{t:"L'essentiel :",b:"Plus généralement, c'est selon les textes et dispositions en vigueur dans chaque pays. L'essentiel est que la transparence, le professionnalisme et l'efficience soient rigoureusement observés."}]},{id:"evaluation",chapter:2,num:"11",kicker:"Chapitre 3 · Évaluation :",title:"Évaluer le système d'exploitation du Mobilier Urbain de Publicité.",bullets:["Évaluer tout le processus, de l'audit à la gestion","Un mécanisme scientifiquement soutenable et autonome","Prévenir les dérapages, sécuriser sur le long terme"],content:[{t:"Chapitre 3 :",b:"Pour garantir un développement harmonieux du secteur d'exploitation des panneaux publicitaires / Mobilier Urbain de Publicité, il faut prévoir, dans les réformes, un mécanisme d'évaluation de l'ensemble du processus, depuis l'audit jusqu'à la gestion par les régies publicitaires."},{t:"Un pilotage autonome :",b:"Le mécanisme d'évaluation doit être scientifiquement soutenable, avec une autonomie certaine dans son pilotage. L'évaluation permet de prévenir les risques de dérapage et de sécuriser les intérêts des différents acteurs du secteur et des populations, à travers leur cadre de vie, sur le long terme."}]},{id:"mise-a-jour",chapter:3,num:"12",kicker:"Chapitre 4 · Mise à jour :",title:"Pérenniser et faire évoluer le secteur.",bullets:["Pérenniser les acquis de développement","Le rayonnement des villes par les supports","Une évolution en phase avec l'urbanisation"],content:[{t:"Chapitre 4 :",b:"La mise à jour du secteur d'exploitation des panneaux publicitaires / Mobilier Urbain de Publicité est importante pour pérenniser les acquis de développement de l'activité."},{t:"Pourquoi ?",b:"Elle est importante pour le rayonnement des villes par l'exploitation des supports de publicité et favorisera l'essor de l'activité en adéquation avec l'urbanisation."},{t:"Concrètement :",b:"Elle consiste à s'assurer que le secteur, dans son évolution, soit en phase avec l'évolution démographique et le développement infrastructurel des villes."}]},{id:"quiz",chapter:4,num:"13",kicker:"Questionnaire · Module 1 :",title:"Douze questions pour valider le module.",bullets:["5 définitions","7 questions de compréhension","Testez vos acquis en fin de parcours"],content:[]}],_s=[{q:"Que désigne la panneautique ?",options:["L'ensemble des moyens et techniques d'installation et de gestion des panneaux publicitaires","La seule vente d'espaces publicitaires","La fabrication du mobilier urbain","La régulation des réseaux sociaux"],correct:0,explain:"La panneautique est l'ensemble des moyens et techniques d'installation et de gestion des panneaux publicitaires — un corps de métier pluridisciplinaire."},{q:"Quel est le but du zonage ?",options:["Multiplier les panneaux pour maximiser les recettes","Créer les conditions d'un développement harmonieux et équilibré du paysage de l'affichage publicitaire","Supprimer toute publicité des villes","Uniformiser tous les panneaux du pays"],correct:1,explain:"Le zonage délimite des espaces pour un paysage publicitaire harmonieux et équilibré, et établit des grilles tarifaires adaptées aux réalités économiques."},{q:"Que désigne le « Mobilier Urbain de Publicité » ?",options:["Les panneaux posés sur le mobilier des cafés","La publicité diffusée à la télévision urbaine","Des panneaux devenus de véritables objets d'embellissement et de décoration des villes","Les panneaux strictement destinés à la location"],correct:2,explain:"Le Mobilier Urbain de Publicité : des panneaux qui ne sont plus de simples supports, mais de véritables meubles d'embellissement et de décoration des villes."},{q:"Qu'est-ce qu'une régie publicitaire ?",options:["L'organisme autorisé à gérer et exploiter des espaces publicitaires","L'autorité qui interdit la publicité","L'entreprise qui imprime les affiches","L'organisme de contrôle des réseaux sociaux"],correct:0,explain:"Les régies publicitaires sont les exploitants auxquels les espaces sont attribués sur la base du cahier des charges contenu dans le dossier d'appel d'offres."},{q:"Qu'est-ce que la pollution visuelle, dans le cadre de l'exploitation des panneaux ?",options:["Les panneaux trop colorés","La publicité lumineuse la nuit","Le bruit produit par les panneaux numériques","Une pléthore de panneaux mal organisés qui dégrade le cadre de vie"],correct:3,explain:"Une pléthore de panneaux issus d'un secteur mal organisé ou non encadré est cause de pollution visuelle, d'insalubrité et d'insécurité."},{q:"En quoi consiste une réorganisation du secteur d'exploitation des panneaux publicitaires ?",options:["À augmenter le nombre d'exploitants","À privatiser tous les supports","À remettre de l'ordre : audit, état des lieux, zonage, lots, concession, attribution, gestion","À supprimer le cahier des charges"],correct:2,explain:"La réorganisation suit sept étapes : audit, état des lieux, zonage, constitution des lots, mise en concession, attribution des espaces et gestion par les régies."},{q:"En quoi consiste le réaménagement de l'espace publicitaire d'une ville ?",options:["Délimiter des zones et proposer des supports facteurs d'embellissement et de modernité","Remplacer tous les panneaux par des écrans numériques","Retirer les panneaux des centres-villes","Uniformiser les tarifs à l'échelle nationale"],correct:0,explain:"Le réaménagement repose sur le zonage : délimiter des espaces selon des normes et proposer des supports qui embellissent et modernisent le cadre de vie."},{q:"Comment prévenir la pollution visuelle due à l'exploitation des panneaux ?",options:["En interdisant toute nouvelle publicité","En augmentant le nombre de panneaux","En confiant le secteur à une seule régie","En réglementant, auditant et zonant le secteur d'exploitation"],correct:3,explain:"Un secteur réglementé et encadré (audit, état des lieux, zonage, normes) prévient la pléthore de panneaux à l'origine de la pollution visuelle."},{q:"Comment s'assurer d'une bonne rentabilité et de la pérennité du secteur ?",options:["En baissant tous les tarifs","Par la transparence, le professionnalisme, l'efficience et une mise à jour régulière","En vendant les panneaux aux enchères chaque année","En supprimant l'évaluation"],correct:1,explain:"Transparence, professionnalisme et efficience sont essentiels ; l'évaluation et la mise à jour régulière pérennisent les acquis du secteur."},{q:"Peut-on installer un panneau publicitaire n'importe où ? Pourquoi ?",options:["Oui, la liberté d'entreprendre le permet","Oui, sauf dans les capitales","Non, l'implantation suit des normes, un zonage et des délimitations","Non, uniquement sur les autoroutes"],correct:2,explain:"L'implantation suit un zonage et des délimitations selon des normes spécifiques du territoire, pour un développement harmonieux et un cadre de vie agréable."},{q:"Quelle est l'importance du panneau publicitaire dans une ville ?",options:["Il booste la concurrence, l'économie et embellit le cadre de vie","Il ne sert qu'à décorer","Il remplace les marchés publics","Il est surtout un obstacle à la circulation"],correct:0,explain:"Il booste la concurrence entre entreprises, propulse l'économie et, bien aménagé, contribue à l'embellissement des villes."},{q:"N'importe qui peut-il exercer l'activité d'exploitation de panneaux publicitaires ?",options:["Oui, c'est totalement libre","Oui, moyennant une simple taxe","Non, seuls les ministères peuvent exploiter","Non : acteurs identifiés, appels d'offres et gestion encadrée"],correct:3,explain:"Le secteur est encadré : audit des acteurs, appels d'offres, cahier des charges, concession et gestion selon les textes en vigueur."}],ge=n=>document.querySelector(n);function _v(){const n={topbar:ge("#ui-topbar"),chapter:ge("#ui-chapter"),progressFill:ge("#ui-progress-fill"),dots:ge("#ui-dots"),hint:ge("#ui-hint"),clickHint:ge("#ui-click-hint"),title:ge("#ui-title"),card:ge("#ui-card"),cardKicker:ge("#ui-card .card-kicker"),cardTitle:ge("#ui-card .card-title"),cardBody:ge("#ui-card .card-body"),quiz:ge("#ui-quiz"),quizScore:ge("#quiz-score"),quizList:ge("#quiz-list"),quizFill:ge("#quiz-progress-fill"),quizResult:ge("#quiz-result"),resultTitle:ge("#quiz-result .result-title"),resultText:ge("#quiz-result .result-text"),reader:ge("#ui-reader"),readerPanel:ge(".reader-panel"),readerProg:ge("#reader-progress-fill"),readerKicker:ge("#ui-reader .reader-kicker"),readerTitle:ge("#ui-reader .reader-title"),readerBody:ge("#ui-reader .reader-body"),readerCount:ge("#reader-count"),readerPrev:ge("#reader-prev"),readerNext:ge("#reader-next"),readerClose:ge("#reader-close"),toast:ge("#ui-toast"),cardOpen:ge("#card-open")};$e.forEach((M,F)=>{const L=document.createElement("span");L.className="dot"+(F===0?" active":""),L.dataset.index=F,n.dots.appendChild(L)});const t={activeIndex:-1,quizAnswered:new Set,score:0,started:!1,readerOpen:!1,readerIndex:-1};let e=null,i=null,s=null;function o(M){n.progressFill.style.width=(M*100).toFixed(2)+"%"}function r(M){const F=Ko[M];n.chapter.textContent=F?`${F.name} — ${F.label}`:""}function a(M,F){if(M===t.activeIndex)return;t.activeIndex=M;const L=$e[M];document.querySelectorAll(".dot").forEach((I,y)=>{I.classList.toggle("active",y===M)});const D=L.id==="quiz";n.card.classList.toggle("show",!D&&M!==-1),n.quiz.classList.toggle("show",D),i&&i(D),D||(n.cardKicker.textContent=L.kicker,n.cardTitle.textContent=L.title,n.cardBody.innerHTML=`<p class="card-note">Leçon prête à lire : ouvrez la fenêtre dédiée pour parcourir l'étape en entier.</p>`),r(L.chapter)}function l(M){M>.015&&(t.started=!0),n.title.classList.toggle("hide",t.started)}function c(M,F){o(M),a(F),l(M);const L=n.quiz.classList.contains("show");n.clickHint.classList.toggle("visible",F>=0&&!L&&!t.readerOpen)}function d(M){t.readerIndex=M,t.readerOpen=!0;const F=$e[M];if(n.readerKicker.textContent=F.kicker,n.readerTitle.textContent=F.title,n.readerBody.innerHTML="",F.id==="quiz"){const L=document.createElement("ul");L.className="reader-bullets",F.bullets.forEach(I=>{const y=document.createElement("li");y.textContent=I,L.appendChild(y)}),n.readerBody.appendChild(L);const D=document.createElement("button");D.className="reader-quiz-btn",D.textContent="Lancer le questionnaire",D.addEventListener("click",h),n.readerBody.appendChild(D)}else F.content.forEach(L=>{const D=document.createElement("p"),I=document.createElement("span");I.className="body-t",I.textContent=L.t,D.appendChild(I),D.appendChild(document.createTextNode(L.b)),n.readerBody.appendChild(D)});n.readerCount.textContent=`${String(M+1).padStart(2,"0")} / ${String($e.length).padStart(2,"0")}`,n.readerPanel.scrollTop=0,f(),n.title.classList.add("hide"),n.reader.classList.add("show"),e&&e(!0)}function h(){t.readerOpen&&(t.readerOpen=!1,n.reader.classList.remove("show"),e&&e(!1))}function u(M){if(!t.readerOpen)return;const F=Math.max(0,Math.min($e.length-1,t.readerIndex+M));F!==t.readerIndex&&d(F)}function f(){if(!n.readerProg)return;const M=n.readerPanel.scrollHeight-n.readerPanel.clientHeight;n.readerProg.style.width=(M>0?n.readerPanel.scrollTop/M*100:100)+"%"}n.readerPanel.addEventListener("scroll",f,{passive:!0}),n.readerClose.addEventListener("click",h),n.readerPrev.addEventListener("click",()=>u(-1)),n.readerNext.addEventListener("click",()=>u(1)),n.reader.addEventListener("click",M=>{M.target===n.reader&&h()}),n.cardOpen.addEventListener("click",()=>{t.activeIndex>=0&&d(t.activeIndex)}),document.querySelector("#quiz-retry").addEventListener("click",()=>{t.quizAnswered.clear(),t.score=0,document.querySelector("#quiz-score").textContent=0,n.quizFill.style.width="0%",n.quizResult.classList.add("hide"),Nc(t,n)}),document.querySelector("#quiz-restart").addEventListener("click",()=>{i&&i(!1),window.scrollTo({top:0,behavior:"smooth"})});function m(M){n.toast.textContent=M,n.toast.classList.add("show"),clearTimeout(s),s=setTimeout(()=>n.toast.classList.remove("show"),4600)}Nc(t,n);function v(){return n.quiz.classList.contains("show")}function g(M){if(!v())return;const F=n.quizList.querySelectorAll(".quiz-card");for(const L of F){if(L.classList.contains("done"))continue;const D=L.querySelectorAll(".quiz-opt");M<D.length&&D[M].click();return}}const p=document.querySelectorAll(".tsize-btn");function T(M){const F=document.documentElement;F.classList.toggle("ts-sm",M===0),F.classList.toggle("ts-lg",M===2),p.forEach(L=>{const D=Number(L.dataset.tsize)===M;L.classList.toggle("active",D),L.setAttribute("aria-pressed",String(D))});try{localStorage.setItem("panneau-tsize",String(M))}catch{}}let _=1;try{const M=Number(localStorage.getItem("panneau-tsize"));M>=0&&M<=2&&(_=M)}catch{}return T(_),p.forEach(M=>M.addEventListener("click",()=>T(Number(M.dataset.tsize)))),{updateGlobal:c,el:n,openReader:d,closeReader:h,readerNav:u,showToast:m,isReaderOpen:()=>t.readerOpen,quizOpen:v,answerQuiz:g,setReaderListener:M=>{e=M},setQuizListener:M=>{i=M},setQuizShown:M=>{i&&i(M)}}}function Nc(n,t){const e=t.quizList;e.innerHTML="",_s.forEach((i,s)=>{const o=document.createElement("div");o.className="quiz-card",o.innerHTML=`
      <div class="quiz-num">Question ${String(s+1).padStart(2,"0")}</div>
      <div class="quiz-q"></div>
      <div class="quiz-opts"></div>
      <div class="quiz-explain"></div>
    `,o.querySelector(".quiz-q").textContent=i.q;const r=o.querySelector(".quiz-opts");i.options.forEach((a,l)=>{const c=document.createElement("button");c.className="quiz-opt",c.innerHTML=`<span class="opt-letter">${String.fromCharCode(65+l)}.</span> <span class="opt-text"></span>`,c.querySelector(".opt-text").textContent=a,c.addEventListener("click",()=>{if(n.quizAnswered.has(s))return;n.quizAnswered.add(s);const d=l===i.correct;r.querySelectorAll(".quiz-opt").forEach((u,f)=>{f===i.correct?u.classList.add("correct"):f===l?u.classList.add("wrong"):u.classList.add("dim")}),d&&(n.score++,document.querySelector("#quiz-score").textContent=n.score);const h=o.querySelector(".quiz-explain");h.textContent=i.explain,h.classList.add("show"),o.classList.add("done",d?"correct-q":"wrong-q"),t.quizFill.style.width=(n.quizAnswered.size/_s.length*100).toFixed(2)+"%",n.quizAnswered.size===_s.length&&Mv(n,t)}),r.appendChild(c)}),e.appendChild(o)})}function Mv(n,t){const e=Math.round(n.score/_s.length*100);let i;e>=90?i="Excellent ! Vous maîtrisez le module sur le bout des doigts.":e>=70?i="Très bien ! Quelques points à consolider, mais la base est solide.":e>=50?i="Bien. Relisez les leçons indiquées pour consolider vos acquis.":i="Le module mérite une seconde lecture : remontez le parcours et revivez les étapes.",t.resultTitle.textContent=e>=70?"Formation validée.":"Formation à revoir.";const s=_s.length-n.score;t.resultText.innerHTML=`Score : <strong>${n.score} / ${_s.length}</strong> — ${i}<br><span class="result-breakdown">${n.score} bonne${n.score>1?"s":""} réponse${n.score>1?"s":""} · ${s} à revoir</span>`,t.quizResult.classList.remove("hide"),e>=70&&yv()}const zc=["#c08a68","#cfa574","#9db87f","#8a9ab8","#d2a678","#e0c9a0"];let fi=null;function yv(){fi||(fi=document.createElement("div"),fi.id="confetti-layer",document.body.appendChild(fi));const n=110;for(let t=0;t<n;t++){const e=document.createElement("span");e.className="confetti-piece"+(Math.random()<.3?" circle":""),e.style.left=Math.random()*100+"vw",e.style.background=zc[Math.random()*zc.length|0],e.style.opacity=(.55+Math.random()*.45).toFixed(2);const i=2.4+Math.random()*2.2,s=Math.random()*.9;e.style.animation=`confettiFall ${i}s cubic-bezier(0.2, 0.6, 0.4, 1) ${s}s forwards`,fi.appendChild(e),setTimeout(()=>e.remove(),(i+s+.2)*1e3)}setTimeout(()=>{fi&&!fi.childElementCount&&fi.remove()},6200)}const ke={sky0:"#f6edd8",sky1:"#f2e6ca",sky2:"#eee0bf",sky3:"#eadab4",sky4:"#e6d3a6",sky5:"#e2cc9a",asphalt0:"#b39a6e",asphalt1:"#c4ab7e",asphalt2:"#d0b98c",bronze:"#9a8157",terracotta:"#c08a68",amber:"#cfa574"},Bn=Math.PI*2;function He(n,t,e,i,s,o){n.beginPath(),n.moveTo(t+o,e),n.arcTo(t+i,e,t+i,e+s,o),n.arcTo(t+i,e+s,t,e+s,o),n.arcTo(t,e+s,t,e,o),n.arcTo(t,e,t+i,e,o),n.closePath()}function Re(n,t,e,i,s,o){n.font=s,n.textAlign="center",n.fillStyle=o,n.fillText(t,e,i)}function xv(n,t,e){const i=n.createLinearGradient(0,0,0,e);i.addColorStop(0,ke.sky0),i.addColorStop(.3,ke.sky1),i.addColorStop(.58,ke.sky2),i.addColorStop(.78,ke.sky3),i.addColorStop(.9,ke.sky4),i.addColorStop(1,ke.sky5),n.fillStyle=i,n.fillRect(0,0,t,e);const s=n.createRadialGradient(t/2,e*.6,10,t/2,e*.6,t*.72);s.addColorStop(0,"rgba(240,196,126,0.5)"),s.addColorStop(.5,"rgba(238,184,118,0.18)"),s.addColorStop(1,"rgba(238,184,118,0)"),n.fillStyle=s,n.fillRect(0,0,t,e)}function Qr(n,t,e,{minH:i,maxH:s,alpha:o,body:r,win:a,density:l,tall:c=.14}){let d=-12;for(;d<t+12;){const h=22+Math.random()*52,u=i+Math.random()*(s-i);n.fillStyle=r,n.globalAlpha=o,n.fillRect(d,e-u,h,u),Math.random()<c&&(n.fillRect(d+h/2-1,e-u-12,2,12),Math.random()<.5&&(n.fillStyle="rgba(196,138,104,0.85)"),n.fillRect(d+h/2-1,e-u-12,2,2));const f=Math.floor(h/14);for(let m=0;m<f;m++)for(let v=0;v<Math.floor(u/17);v++)if(Math.random()<l){const g=d+5+m*14,p=e-u+7+v*17;n.fillStyle=a,n.globalAlpha=o*(.4+Math.random()*.6),n.fillRect(g,p,4.5,6.5),Math.random()<.28&&(n.fillStyle="rgba(170,130,80,0.45)",n.fillRect(g-1.5,p-1.5,7.5,9.5))}n.globalAlpha=1,d+=h+4+Math.random()*9}}function Vi(n,t,e){const i=e*.6;return xv(n,t,e),Qr(n,t,i,{minH:34,maxH:92,alpha:.45,body:"#d6c095",win:"#8f7a4e",density:.3}),Qr(n,t,i,{minH:20,maxH:62,alpha:.6,body:"#c9b184",win:"#7a663c",density:.5}),Qr(n,t,i,{minH:13,maxH:44,alpha:.85,body:"#bda375",win:"#665430",density:.68}),Sv(n,t,i),i}function Sv(n,t,e){const i=n.canvas.height,s=t/2,o=n.createLinearGradient(0,e,0,i);o.addColorStop(0,ke.asphalt0),o.addColorStop(.5,ke.asphalt1),o.addColorStop(1,ke.asphalt2),n.fillStyle=o,n.beginPath(),n.moveTo(s-1,e),n.lineTo(-40,i+20),n.lineTo(t+40,i+20),n.lineTo(s+1,e),n.closePath(),n.fill();const r=n.createRadialGradient(t/2,e+(i-e)*.38,6,t/2,e+(i-e)*.38,t*.24);r.addColorStop(0,"rgba(160,120,60,0.18)"),r.addColorStop(1,"rgba(160,120,60,0)"),n.fillStyle=r,n.fillRect(0,e,t,i-e),n.strokeStyle="rgba(90,70,40,0.55)",n.lineWidth=2,n.setLineDash([16,30]),n.beginPath(),n.moveTo(s,e+2),n.lineTo(s,i+20),n.stroke(),n.setLineDash([]),n.strokeStyle="rgba(90,70,40,0.25)",n.lineWidth=3;for(const a of[-1,1])n.beginPath(),n.moveTo(s+a*1.2,e+2),n.lineTo(t/2+a*t*.48,i+10),n.stroke()}function gi(n,t,e,i,s){n.save(),n.translate(t,e),n.rotate(s||0),n.globalAlpha=.34,n.fillStyle="#000",n.beginPath(),n.ellipse(0,0,62*i,10*i,0,0,Bn),n.fill(),n.globalAlpha=1;const o=n.createLinearGradient(-46*i,0,-38*i,0);o.addColorStop(0,"#6b5230"),o.addColorStop(1,"#8a6f45"),n.fillStyle=o,n.fillRect(-46*i,-80*i,9*i,80*i),n.fillRect(37*i,-80*i,9*i,80*i);const r=134*i,a=98*i,l=-r/2,c=-186*i;He(n,l,c,r,a,7*i),n.fillStyle="#f7eeda",n.fill(),n.lineWidth=5*i,n.strokeStyle=ke.bronze,n.stroke();const d=n.createLinearGradient(0,c,0,c+a);d.addColorStop(0,"#fdf8ec"),d.addColorStop(1,"#f1e6cb"),He(n,l+7*i,c+7*i,r-14*i,a-14*i,5*i),n.fillStyle=d,n.fill(),n.fillStyle=ke.terracotta,n.fillRect(l+7*i,c+7*i,r-14*i,5*i),n.strokeStyle="rgba(90,70,40,0.3)",n.lineWidth=1.5*i,He(n,l+13*i,c+15*i,r-26*i,a-26*i,4*i),n.stroke(),Re(n,"PANNEAUTIQUE · DOMAINE PUBLIC",0,c+34*i,`600 ${Math.max(7,9*i)}px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif`,"#7a5f38"),Re(n,"PUBLICITÉ & AFFICHAGE",0,c+60*i,`700 ${Math.max(10,15*i)}px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif`,"#3a2e1f"),Re(n,"RÈGLES · ZONES · CONCESSIONS",0,c+80*i,`700 ${Math.max(6,8*i)}px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif`,"#b3825e"),n.fillStyle=ke.amber,n.shadowColor=ke.amber,n.shadowBlur=16*i,n.beginPath(),n.arc(0,c-6*i,3*i,0,Bn),n.fill(),n.shadowBlur=0;const h=n.createRadialGradient(0,-70*i,4,0,-70*i,48*i);h.addColorStop(0,"rgba(232,163,92,0.2)"),h.addColorStop(1,"rgba(232,163,92,0)"),n.fillStyle=h,n.fillRect(-64*i,-124*i,128*i,64*i),n.restore()}function wv(n,t,e,i,s){n.save(),n.translate(t,e),n.strokeStyle="#6b5230",n.lineCap="round",n.lineWidth=Math.max(3,i*.035),n.beginPath(),n.moveTo(0,0),n.quadraticCurveTo(10,-i*.5,5,-i*.94),n.stroke(),n.fillStyle="#5f7a4a";for(let o=0;o<6;o++){const r=-Math.PI*.95+o/5*Math.PI*.62;n.beginPath(),n.ellipse(Math.cos(r)*i*.34,-i*.97+Math.sin(r)*i*.1,i*.3,i*.05,r-Math.PI/2,0,Bn),n.fill()}n.restore()}function lo(n,t,e,i){const s=n.canvas.width,o=n.canvas.height;n.fillStyle="rgba(253,250,242,0.9)",n.fillRect(0,e,s,o-e),n.fillStyle="rgba(138,111,69,0.35)",n.fillRect(0,e,s,2),Re(n,t,s/2,e+i*1.45,`700 ${i}px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif`,"#7a5f38")}function _n(n,t,e,i){const s=n.createRadialGradient(t/2,i,4,t/2,i,e*.6);s.addColorStop(0,"rgba(240,200,140,0.2)"),s.addColorStop(1,"rgba(240,200,140,0)"),n.fillStyle=s,n.fillRect(0,0,t,e);const o=n.createRadialGradient(t/2,e*.45,t*.2,t/2,e*.5,t*.74);o.addColorStop(0,"rgba(0,0,0,0)"),o.addColorStop(1,"rgba(140,115,75,0.3)"),n.fillStyle=o,n.fillRect(0,0,t,e);const r=n.createLinearGradient(0,0,0,e*.42);r.addColorStop(0,"rgba(120,95,55,0.14)"),r.addColorStop(1,"rgba(120,95,55,0)"),n.fillStyle=r,n.fillRect(0,0,t,e*.42),n.globalAlpha=.055;for(let a=0;a<420;a++)n.fillStyle=Math.random()>.5?"#fff":"#000",n.fillRect(Math.random()*t,Math.random()*e,1,1);n.globalAlpha=1}function fl(n,t,e){const i=n.createLinearGradient(0,0,0,e);i.addColorStop(0,"#f3ead4"),i.addColorStop(.7,"#e6d8ba"),i.addColorStop(1,"#d9c8a2"),n.fillStyle=i,n.fillRect(0,0,t,e),n.fillStyle="rgba(120,95,55,0.18)";for(let c=0;c<5;c++)n.fillRect(t*(.04+c*.2),e*.05,t*.14,e*.44);const s=t*.6,o=e*.1,r=t*.26,a=e*.36;He(n,s,o,r,a,8);const l=n.createLinearGradient(0,o,0,o+a);l.addColorStop(0,"#cfe0e2"),l.addColorStop(1,"#f0e2c0"),n.fillStyle=l,n.fill(),n.strokeStyle="#7a5f38",n.lineWidth=6,He(n,s,o,r,a,8),n.stroke(),n.strokeStyle="rgba(90,70,40,0.4)",n.lineWidth=3,n.beginPath(),n.moveTo(s+r/2,o),n.lineTo(s+r/2,o+a),n.moveTo(s,o+a/2),n.lineTo(s+r,o+a/2),n.stroke()}function pl(n,t,e){const i=e*.64,s=n.createLinearGradient(0,i,0,e);s.addColorStop(0,"#b08a5c"),s.addColorStop(.2,"#96714a"),s.addColorStop(1,"#6b4f30"),n.fillStyle=s,n.beginPath(),n.moveTo(t*.05,i),n.lineTo(t*.95,i),n.lineTo(t*.85,e),n.lineTo(t*.15,e),n.fill(),n.fillStyle="#7a5f3c",n.beginPath(),n.moveTo(t*.12,e*.8),n.lineTo(t*.88,e*.8),n.lineTo(t*.85,e),n.lineTo(t*.15,e),n.fill(),n.fillStyle="rgba(255,240,210,0.35)",n.beginPath(),n.moveTo(t*.05,i),n.lineTo(t*.95,i),n.lineTo(t*.93,i+10),n.lineTo(t*.07,i+10),n.fill()}function ir(n,t,e,i,s,o,r){if(n.save(),n.translate(t,e),n.rotate(o||0),n.shadowColor="rgba(0,0,0,0.4)",n.shadowBlur=18,n.shadowOffsetY=10,He(n,-i/2,-s/2,i,s,4),n.fillStyle="#f4ead0",n.fill(),n.shadowBlur=0,n.strokeStyle="rgba(120,100,70,0.5)",n.lineWidth=2,n.stroke(),n.fillStyle=ke.terracotta,n.fillRect(-i/2,-s/2,i,s*.06),r){const a=typeof r=="number"?r:r.length;n.fillStyle="rgba(60,50,34,0.5)";for(let l=0;l<a;l++)n.fillRect(-i*.36,-s*.26+l*s*.09,i*.72,s*.02)}n.restore()}function Rd(n,t,e){const i=n.createLinearGradient(0,0,0,e);i.addColorStop(0,"#efe7d3"),i.addColorStop(1,"#e0d3b6"),n.fillStyle=i,n.fillRect(0,0,t,e);for(let s=0;s<80;s++){const o=22+Math.random()*64,r=14+Math.random()*42;n.fillStyle=`rgba(178,166,138,${(.12+Math.random()*.2).toFixed(3)})`,n.fillRect(Math.random()*(t-o),Math.random()*(e-r),o,r)}n.fillStyle="rgba(120,162,184,0.4)",n.beginPath(),n.moveTo(0,e*.06),n.bezierCurveTo(t*.3,e*0,t*.62,e*.12,t*.8,e*.05),n.lineTo(t*.88,0),n.lineTo(0,0),n.fill(),n.strokeStyle="rgba(120,104,80,0.55)",n.lineWidth=2.5;for(let s=0;s<7;s++){const o=e*(.13+s*.13);n.beginPath(),n.moveTo(0,o),n.bezierCurveTo(t*.3,o+20,t*.6,o-20,t,o+8),n.stroke()}for(let s=0;s<9;s++){const o=t*(.1+s*.1);n.beginPath(),n.moveTo(o,0),n.bezierCurveTo(o+16,e*.3,o-16,e*.62,o+10,e),n.stroke()}n.lineWidth=5,n.strokeStyle="rgba(193,104,63,0.4)",n.beginPath(),n.moveTo(0,e*.2),n.bezierCurveTo(t*.35,e*.26,t*.55,e*.55,t*.84,e*.72),n.stroke(),n.save(),n.translate(t*.06,e*.09),n.fillStyle="rgba(255,255,255,0.65)",n.beginPath(),n.arc(0,0,26,0,Bn),n.fill(),n.strokeStyle="rgba(90,74,52,0.6)",n.lineWidth=2,n.stroke(),n.fillStyle=ke.terracotta,n.beginPath(),n.moveTo(0,-18),n.lineTo(5,0),n.lineTo(-5,0),n.closePath(),n.fill(),Re(n,"N",0,-32,"700 15px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","rgba(90,74,52,0.9)"),n.restore()}function Xs(n,t,e,i,s){n.save(),n.shadowColor="rgba(0,0,0,0.4)",n.shadowBlur=8,n.shadowOffsetY=4,n.fillStyle=i,n.beginPath(),n.moveTo(t,e-34),n.quadraticCurveTo(t+16,e-4,t+12,e-2),n.lineTo(t,e+6),n.lineTo(t-12,e-2),n.quadraticCurveTo(t-16,e-4,t,e-34),n.fill(),n.shadowBlur=0,n.fillStyle="#fff",n.beginPath(),n.arc(t,e-30,7.5,0,Bn),n.fill(),n.fillStyle=i,n.beginPath(),n.arc(t,e-30,3.5,0,Bn),n.fill(),s&&(n.font="800 19px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",n.lineWidth=4,n.strokeStyle="rgba(240,236,220,0.9)",n.strokeText(s,t+17,e-22),n.fillStyle="#2a2118",n.fillText(s,t+17,e-22)),n.restore()}function ta(n,t,e,i,s,o,r,a){const l=Math.PI*.75,c=Math.PI*1.5;n.lineCap="round",n.beginPath(),n.arc(t,e,i,l,l+c),n.strokeStyle="rgba(110,90,55,0.22)",n.lineWidth=14,n.stroke();const d=n.createLinearGradient(t-i,0,t+i,0);d.addColorStop(0,ke.terracotta),d.addColorStop(1,s),n.beginPath(),n.arc(t,e,i,l,l+c*o),n.strokeStyle=d,n.lineWidth=14,n.stroke(),Re(n,String(Math.round(o*100))+"%",t,e+8,"800 34px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#3a2e1f"),Re(n,r,t,e+i*.78+8,"700 18px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","rgba(90,74,52,0.75)")}function Pd(n,t,e){const i=Vi(n,t,e);wv(n,t*.1,i+20,e*.5),gi(n,t*.5,i+2,1.12,0),lo(n,"LE PARCOURS DE LA PANNEAUTIQUE SUR LE DOMAINE PUBLIC",e*.86,e*.03),_n(n,t,e,i)}function bv(n,t,e){const i=Vi(n,t,e),s=5;for(let o=0;o<s;o++){const r=o===2,a=t*(.14+o*.18),l=i+(e-i)*.82*Math.pow(1-o/(s-1),.7)*.85+i*.12,c=.5+.18*o+(r?.12:0);gi(n,a,Math.min(l,e-10),c,r?0:(o-2)*.05)}Re(n,"LA PANNEAUTIQUE, LEVIER ÉCONOMIQUE DU DOMAINE PUBLIC",t/2,e*.3,"700 34px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#3a2e1f"),n.shadowColor="rgba(255,255,255,0.75)",n.shadowBlur=12,Re(n,"CHAQUE SUPPORT EST UNE RESSOURCE",t/2,e*.34,"600 20px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#b3825e"),n.shadowBlur=0,_n(n,t,e,i)}function Ev(n,t,e){const i=Vi(n,t,e);gi(n,t*.2,i+2,1,-.1),gi(n,t*.46,i-6,.9,.12),gi(n,t*.68,i+2,.75,-.26),gi(n,t*.3,i+(e-i)*.7,.55,.38);const s=i+(e-i)*.92;n.fillStyle="rgba(253,250,242,0.92)",He(n,t*.05,s,t*.34,e*.05,4),n.fill();for(let o=0;o<12;o++)o%2===0?n.fillStyle="#cfa574":n.fillStyle="#7a5f38",n.fillRect(t*.055+o*t*.027,s+e*.008,t*.027,e*.034);Re(n,"PANNEAUX ANARCHIQUES — LE CONSTAT",t/2,s-e*.02,"700 28px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#3a2e1f"),_n(n,t,e,i)}function Tv(n,t,e){fl(n,t,e),pl(n,t,e),ir(n,t*.3,e*.56,t*.3,e*.3,-.04,8),ir(n,t*.48,e*.6,t*.26,e*.26,.03,6);const i=t*.74,s=e*.56;n.save(),n.translate(i,s),n.shadowColor="rgba(0,0,0,0.45)",n.shadowBlur=16,n.shadowOffsetY=8,He(n,-t*.14,-e*.14,t*.28,e*.28,6),n.fillStyle="#e8d9b8",n.fill(),n.shadowBlur=0,n.strokeStyle="rgba(150,120,70,0.5)",n.stroke(),n.fillStyle=ke.terracotta,n.fillRect(-t*.14,-e*.14,t*.28,e*.035),n.fillStyle="#3a2a18";for(let o=0;o<6;o++)n.fillRect(-t*.11,-e*.08+o*e*.045,t*.22,e*.012);n.fillStyle="#57a05f";for(let o=0;o<4;o++)n.beginPath(),n.arc(-t*.11,-e*.08+o*e*.045,e*.014,0,Bn),n.fill();Re(n,"LISTE DE CONTRÔLE",0,e*.11,"700 "+e*.028+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#2a2118"),n.restore(),n.save(),n.translate(t*.5,e*.42),n.rotate(.05),n.shadowColor="rgba(0,0,0,0.4)",n.shadowBlur=14,n.fillStyle="#4a3a26",He(n,-t*.11,-e*.02,t*.09,e*.05,6),n.fill(),n.shadowBlur=0,n.fillStyle="#f4ead0",He(n,-t*.1,-e*.016,t*.012,e*.044,3),n.fill(),n.restore(),lo(n,"AUDIT : COMPRENDRE AVANT D'AGIR",e*.9,e*.032),_n(n,t,e,e*.5)}function Av(n,t,e){Rd(n,t,e),n.strokeStyle="rgba(193,104,63,0.85)",n.lineWidth=4,n.setLineDash([12,9]),n.beginPath(),n.moveTo(t*.16,e*.2),n.bezierCurveTo(t*.38,e*.34,t*.55,e*.5,t*.84,e*.74),n.stroke(),n.setLineDash([]),Xs(n,t*.16,e*.2,"#c97a62","P1"),Xs(n,t*.32,e*.42,"#7d9ec2","P2"),Xs(n,t*.5,e*.58,"#d2a878","P3"),Xs(n,t*.7,e*.72,"#8fae8a","P4"),Xs(n,t*.85,e*.8,"#c97a62","P5"),n.fillStyle="rgba(240,236,220,0.92)",He(n,t*.62,e*.07,t*.3,e*.22,6),n.fill(),n.strokeStyle="rgba(150,120,70,0.5)",n.stroke(),Re(n,"ÉTAT DES LIEUX — GPS",t*.77,e*.12,"700 "+e*.03+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#2a2118"),[["#c97a62","Support signalé"],["#7d9ec2","À vérifier"],["#8fae8a","Conforme"]].forEach(([s,o],r)=>{n.fillStyle=s,n.beginPath(),n.arc(t*.66,e*.16+r*e*.038,e*.013,0,Bn),n.fill(),n.fillStyle="#4a3a28",n.font="500 "+e*.02+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",n.textAlign="left",n.fillText(o,t*.69,e*.166+r*e*.038)}),lo(n,"RELEVÉ GPS DE TOUS LES SUPPORTS",e*.88,e*.032),_n(n,t,e,e*.8)}function Cv(n,t,e){Rd(n,t,e),[[.05,.1,.3,.34,"rgba(125,158,194,0.38)","ZONE A"],[.39,.06,.32,.3,"rgba(192,138,104,0.4)","ZONE B"],[.11,.5,.34,.34,"rgba(143,174,138,0.38)","ZONE C"],[.5,.44,.36,.42,"rgba(207,165,116,0.4)","ZONE D"]].forEach(([s,o,r,a,l,c])=>{n.fillStyle=l,n.fillRect(t*s,e*o,t*r,e*a),n.strokeStyle="rgba(50,40,28,0.55)",n.lineWidth=2.5,n.setLineDash([9,6]),n.strokeRect(t*s,e*o,t*r,e*a),n.setLineDash([]),n.fillStyle="rgba(20,14,8,0.65)",He(n,t*s+t*.012,e*o+e*.02,t*.09,e*.045,4),n.fill(),Re(n,c,t*s+t*.057,e*o+e*.052,"800 "+e*.026+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#fff")}),n.fillStyle="rgba(240,236,220,0.94)",He(n,t*.05,e*.86,t*.9,e*.11,6),n.fill(),n.strokeStyle="rgba(150,120,70,0.5)",n.stroke(),Re(n,"ZONAGE : LE TERRITOIRE DÉCOUPÉ EN ZONES RÉGLEMENTÉES",t*.5,e*.925,"700 "+e*.035+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#2a2118"),_n(n,t,e,e*.85)}function Rv(n,t,e){const i=Vi(n,t,e),s=i+(e-i)*.72;gi(n,t*.74,s,.72,-.04);const o=t*.3,r=i+(e-i)*.6;n.fillStyle="#f7eeda",He(n,o-t*.16,r-e*.06,t*.32,e*.06,4),n.fill(),n.strokeStyle=ke.bronze,n.lineWidth=4,n.stroke(),n.fillStyle="rgba(90,70,40,0.35)";for(let a=0;a<5;a++)n.fillRect(o-t*.14+a*t*.06,r-e*.052,t*.045,e*.044);Re(n,"MOBILIER URBAIN DE PUBLICITÉ — LOT N° 01",o,r-e*.09,"700 "+e*.034+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#3a2e1f"),Re(n,"DES LOTS COHÉRENTS POUR UN FINANCEMENT MAÎTRISÉ",t/2,e*.24,"700 26px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#3a2e1f"),_n(n,t,e,i)}function Pv(n,t,e){fl(n,t,e),pl(n,t,e),ir(n,t*.42,e*.55,t*.46,e*.4,-.02,10),Re(n,"CONVENTION DE CONCESSION",t*.42,e*.34,"700 "+e*.036+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#2a2118");const i=t*.62,s=e*.66;n.save(),n.translate(i,s),n.rotate(-.14),n.fillStyle="#b03a30",He(n,-t*.07,-e*.028,t*.14,e*.056,6),n.fill(),n.strokeStyle="#7c241c",n.lineWidth=3,He(n,-t*.07,-e*.028,t*.14,e*.056,6),n.stroke(),Re(n,"CONCÉDÉ",0,e*.012,"800 "+e*.03+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#f4ead0"),n.restore(),n.save(),n.translate(t*.26,e*.62),n.rotate(.12),n.strokeStyle="#2a2118",n.lineWidth=3,n.lineCap="round",n.beginPath(),n.moveTo(-t*.02,e*.05),n.lineTo(0,0),n.lineTo(t*.012,-e*.06),n.moveTo(0,0),n.lineTo(-t*.02,-e*.02),n.stroke(),n.restore(),lo(n,"MISE EN CONCESSION DES ESPACES PUBLICITAIRES",e*.9,e*.032),_n(n,t,e,e*.5)}function Lv(n,t,e){fl(n,t,e),pl(n,t,e),ir(n,t*.34,e*.56,t*.42,e*.36,-.02,8),Re(n,"CAHIER DES CHARGES",t*.34,e*.36,"700 "+e*.034+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#2a2118");const i=t*.55,s=e*.62;n.save(),n.translate(i,s),n.rotate(-.2),n.fillStyle="#57a05f",He(n,-t*.1,-e*.042,t*.2,e*.084,8),n.fill(),n.strokeStyle="#3a703f",n.lineWidth=4,He(n,-t*.1,-e*.042,t*.2,e*.084,8),n.stroke(),Re(n,"ADMIS",0,e*.012,"800 "+e*.055+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#f4f0d8"),n.restore(),lo(n,"ATTRIBUTION DES LOTS PAR APPEL D'OFFRES",e*.9,e*.032),_n(n,t,e,e*.5)}function Iv(n,t,e){const i=Vi(n,t,e),s=t/2,o=t*.42,r=e*.46;n.fillStyle="#d3bd92",n.fillRect(s-o/2,i-r,o,r),n.fillStyle="#c9b184";for(let d=0;d<5;d++)n.fillRect(s-o/2+d*o/5+4,i-r,o/5-8,r);n.fillStyle="rgba(160,120,60,0.55)";for(let d=0;d<6;d++)for(let h=0;h<2;h++)Math.random()<.7&&n.fillRect(s-o/2+h*o/2+o*.08,i-r+r*.1+d*r*.13,o*.18,r*.06);const a=i-r*.18;n.fillStyle="#6b5230",n.fillRect(s-t*.03,a-e*.045,t*.06,e*.045),Re(n,"RÉGIE PUBLICITAIRE",s,a-e*.055,"700 "+e*.026+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#3a2e1f");const l=s,c=i-r-e*.08;n.strokeStyle="#4a3a26",n.lineWidth=4,n.beginPath(),n.moveTo(l,c+e*.14),n.lineTo(l,c),n.stroke(),n.fillStyle="#c08a68",n.beginPath(),n.moveTo(l,c-e*.03),n.lineTo(l-t*.012,c),n.lineTo(l+t*.012,c),n.fill(),Re(n,"GESTION PAR LES RÉGIES : UN SERVICE EN RÈGIE DIRECTE",t/2,e*.22,"700 26px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#3a2e1f"),_n(n,t,e,i)}function Dv(n,t,e){const i=n.createLinearGradient(0,0,0,e);i.addColorStop(0,"#efe5cd"),i.addColorStop(1,"#e4d5b4"),n.fillStyle=i,n.fillRect(0,0,t,e),n.fillStyle="#faf3e2",He(n,t*.05,e*.08,t*.9,e*.84,10),n.fill(),n.strokeStyle="rgba(138,111,69,0.5)",n.lineWidth=3,n.stroke(),ta(n,t*.25,e*.38,e*.14,ke.amber,.9,"AUDIT"),ta(n,t*.5,e*.38,e*.14,ke.terracotta,.78,"CONCESSION"),ta(n,t*.75,e*.38,e*.14,"#7da878",.86,"GESTION"),n.strokeStyle="#7da878",n.lineWidth=4,n.beginPath(),n.moveTo(t*.12,e*.68),n.bezierCurveTo(t*.24,e*.6,t*.3,e*.66,t*.42,e*.55),n.bezierCurveTo(t*.55,e*.62,t*.6,e*.5,t*.72,e*.5),n.bezierCurveTo(t*.8,e*.48,t*.86,e*.42,t*.9,e*.4),n.stroke(),n.fillStyle="#7da878",n.beginPath(),n.arc(t*.9,e*.4,7,0,Bn),n.fill(),Re(n,"ÉVALUATION DU SYSTÈME",t/2,e*.93,"700 "+e*.036+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#7a5f38"),_n(n,t,e,e*.5)}function Uv(n,t,e){const i=Vi(n,t,e);[[t*.24,e*.4],[t*.62,e*.5],[t*.84,e*.34]].forEach(([o,r])=>{const a=i-r;n.strokeStyle="#5c4a30",n.lineWidth=6,n.lineCap="butt",n.beginPath(),n.moveTo(o-18,i),n.lineTo(o+12,a),n.lineTo(o+46,a+16),n.moveTo(o+12,a),n.lineTo(o+12,a+60),n.moveTo(o+12,a+14),n.lineTo(o+58,a+26),n.stroke(),n.lineWidth=3,n.strokeStyle="#4a3a26",n.beginPath(),n.moveTo(o-8,a+26),n.lineTo(o+58,a+32),n.stroke()}),gi(n,t*.5,i+(e-i)*.78,.62,-.1),Re(n,"LE SECTEUR SE MODERNISE, LE PARC S'ADAPTE",t/2,e*.24,"700 28px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#3a2e1f"),_n(n,t,e,i)}function Nv(n,t,e){const i=Vi(n,t,e);n.fillStyle="rgba(253,250,242,0.93)",He(n,t*.2,e*.12,t*.6,e*.72,18),n.fill(),n.strokeStyle="rgba(138,111,69,0.5)",n.lineWidth=3,n.stroke(),n.fillStyle="rgba(201,143,78,0.16)",n.beginPath(),n.arc(t*.5,e*.42,e*.22,0,Bn),n.fill(),n.strokeStyle="rgba(201,143,78,0.4)",n.lineWidth=3,n.stroke(),n.fillStyle="#7a5f38",n.font="800 "+e*.26+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",n.textAlign="center",n.fillText("?",t*.5,e*.52),Re(n,"12 QUESTIONS — VALIDEZ VOS ACQUIS",t*.5,e*.72,"700 "+e*.034+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#3a2e1f"),Re(n,"DÉFINITIONS · ZONES · CONCESSIONS · RÈGIES",t*.5,e*.79,"500 "+e*.02+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#b3825e"),_n(n,t,e,i)}const zv={presentation:Pd,"lecon1-importance":bv,"lecon2-constat":Ev,audit:Tv,"etat-lieux":Av,zonage:Cv,"constitution-lots":Rv,"mise-concession":Pv,attribution:Lv,gestion:Iv,evaluation:Dv,"mise-a-jour":Uv,quiz:Nv};function Fv(n,t,e,i){n.width=e,n.height=i;const s=n.getContext("2d");(zv[t]||Pd)(s,e,i)}const Ms=Math.PI*2;let Ri=null,sr=!1;function Ov(){if(sr)return null;if(!Ri)try{const n=document.createElement("canvas");Ri=new al({canvas:n,antialias:!0,alpha:!1,preserveDrawingBuffer:!0}),Ri.toneMapping=ar,Ri.toneMappingExposure=1.2,Ri.shadowMap.enabled=!0,Ri.shadowMap.type=rr}catch(n){return sr=!0,console.warn("Illustrations 3D indisponibles (WebGL) — fallback 2D.",n),null}return Ri}function $n(n,t=1024,e=1024){const i=document.createElement("canvas");i.width=t,i.height=e;const s=i.getContext("2d");n(s,t,e);const o=new je(i);return o.colorSpace=_e,o.anisotropy=4,o}function to(n,t,e,i,s,o){n.beginPath(),n.moveTo(t+o,e),n.arcTo(t+i,e,t+i,e+s,o),n.arcTo(t+i,e+s,t,e+s,o),n.arcTo(t,e+s,t,e,o),n.arcTo(t,e,t+i,e,o),n.closePath()}function Dn(n=0){const t=["sunset","waves","dune","rings","prism","ember"],e=t[n%t.length];return $n((i,s,o)=>{const r=i.createLinearGradient(0,0,s*(n%2?1:-1),o);if(r.addColorStop(0,["#8a6a4e","#96745a","#7d6350"][n%3]),r.addColorStop(1,["#c29a78","#c9a280","#b08c6e"][(n+1)%3]),i.fillStyle=r,i.fillRect(0,0,s,o),i.fillStyle="rgba(242,232,212,0.9)",i.beginPath(),i.arc(s*.5,o*.38,o*.2,0,Ms),i.fill(),i.fillStyle="rgba(232,163,92,0.95)",i.beginPath(),i.arc(s*.5,o*.38,o*.13,0,Ms),i.fill(),i.strokeStyle="rgba(242,232,212,0.5)",i.lineWidth=8,e==="waves"||e==="rings")for(let a=0;a<4;a++)i.beginPath(),i.arc(s*.5,o*.4,o*(.24+a*.08),0,Ms),i.stroke();else for(let a=0;a<3;a++)i.beginPath(),i.moveTo(s*.2,o*(.72-a*.14)),i.quadraticCurveTo(s*.5,o*(.6-a*.14),s*.8,o*(.72-a*.14)),i.stroke();i.fillStyle="rgba(242,232,212,0.28)",i.fillRect(s*.16,o*.84,s*.68,3)},512,384)}function ea(n,t){const e=new ln([new w(0,0,-20),new w(0,0,140)]);return Td(n,e,.5,1,t).group}function Pi(n,t={}){const e=new Et,i=new Y({color:ne.walnut,roughness:.8,metalness:.05}),s=new Y({color:ne.bronze,roughness:.55,metalness:.35}),o=t.w??6.6,r=t.h??4.4,a=new C(new dt(o,r,.22),i);a.position.y=3,a.castShadow=!0,e.add(a);const l=new C(new dt(o+.4,.26,.3),s);l.position.y=r+.92,e.add(l);const c=new C(new dt(o+.4,.26,.3),s);c.position.y=.72,e.add(c);const d=new qe({map:n}),h=new C(new Kt(o-.4,r-.4),d);return h.position.set(0,3,.13),e.add(h),e}function Bv(n){const t=new Et,e=new Y({color:ne.walnutDark,roughness:.7,metalness:.2}),i=new C(new bt(.09,.12,3.4,8),e);i.position.y=1.7,i.castShadow=!0,t.add(i);const s=new qe({map:n}),o=new C(new Kt(1.5,2.1),s);o.position.y=3.9,t.add(o);const r=new C(new bt(.14,.1,.24,8),e);return r.position.y=5.15,t.add(r),t}function kv(n){const t=new Et,e=new Y({color:4864550,roughness:.5,metalness:.5}),i=new Y({color:10336447,roughness:.15,metalness:.4,transparent:!0,opacity:.5}),s=new Y({color:ne.bronze,roughness:.5,metalness:.45});for(const d of[-2.2,2.2]){const h=new C(new bt(.08,.1,2.8,8),e);h.position.set(d,1.4,0),t.add(h)}const o=new C(new dt(5.4,.16,2.6),s);o.position.y=2.9,o.rotation.x=.06,t.add(o);const r=new C(new dt(5.4,2.1,.1),i);r.position.set(0,1.75,-1.15),t.add(r);const a=new C(new dt(4.4,.08,.4),new Y({color:7031340}));a.position.set(0,.5,-.3),t.add(a);const l=new qe({map:n}),c=new C(new Kt(3.4,2),l);return c.position.set(0,1.9,.14),t.add(c),t}function Gv(n){const t=new Et,e=new C(new dt(2.6,2.6,.5),new Y({color:ne.walnut,roughness:.7}));e.position.y=1.3,t.add(e);const i=new qe({map:n}),s=new C(new Kt(2.2,2),i);s.position.set(0,1.35,.27),t.add(s);const o=new C(new dt(3,.12,1),new Y({color:ne.bronze,roughness:.5,metalness:.4}));return o.position.y=2.72,t.add(o),t}function Fc(n=!1){return $n((t,e,i)=>{const s=t.createLinearGradient(0,0,0,i);s.addColorStop(0,"#efe7d3"),s.addColorStop(1,"#dcc9a6"),t.fillStyle=s,t.fillRect(0,0,e,i);for(let o=0;o<70;o++){const r=24+Math.random()*90,a=14+Math.random()*60;t.fillStyle=`rgba(178,166,138,${(.1+Math.random()*.22).toFixed(3)})`,t.fillRect(Math.random()*(e-r),Math.random()*(i-a),r,a)}t.fillStyle="rgba(120,162,184,0.35)",t.fillRect(0,0,e*.16,i*.12),t.fillRect(e*.82,i*.72,e*.18,i*.28),t.fillStyle="rgba(109,168,124,0.35)",t.fillRect(e*.6,i*.08,e*.28,i*.18),t.strokeStyle="rgba(120,104,80,0.5)",t.lineWidth=3;for(let o=0;o<6;o++){const r=i*(.1+o*.16);t.beginPath(),t.moveTo(0,r),t.bezierCurveTo(e*.3,r+16,e*.6,r-14,e,r+8),t.stroke()}for(let o=0;o<7;o++){const r=e*(.08+o*.14);t.beginPath(),t.moveTo(r,0),t.bezierCurveTo(r+14,i*.3,r-12,i*.62,r+8,i),t.stroke()}n&&[[.08,.12,.3,.34,"rgba(125,158,194,0.36)"],[.44,.1,.3,.3,"rgba(192,138,104,0.38)"],[.12,.52,.32,.32,"rgba(143,174,138,0.36)"],[.5,.5,.36,.38,"rgba(207,165,116,0.38)"]].forEach(([r,a,l,c,d])=>{t.fillStyle=d,t.fillRect(e*r,i*a,e*l,i*c),t.strokeStyle="rgba(50,40,28,0.6)",t.lineWidth=4,t.setLineDash([12,8]),t.strokeRect(e*r,i*a,e*l,i*c),t.setLineDash([])})},1024,1024)}function Oc(n){const t=new Et,e=new Y({color:n,roughness:.5,metalness:.2,emissive:n,emissiveIntensity:.5}),i=new C(new nn(.28,.7,12),e);i.position.y=.7,t.add(i);const s=new C(new re(.16,10,8),e);return s.position.y=1.15,t.add(s),t}function na(){const n=new Et,t=new Y({color:9071429,roughness:.6,metalness:.05}),e=new Y({color:4864550,roughness:.8}),i=new C(new dt(3.4,.14,1.5),t);i.position.y=1,i.castShadow=!0,n.add(i);for(const[s,o]of[[-1.5,-.6],[1.5,-.6],[-1.5,.6],[1.5,.6]]){const r=new C(new dt(.12,1,.12),e);r.position.set(s,.5,o),n.add(r)}return n}function Hv(n=.85,t=1.15,e=0){const i=new Et,s=new C(new dt(n,.02,t),new Y({color:16050896,roughness:.85}));i.add(s);const o=new Fe({color:7034424});for(let r=0;r<5;r++){const a=new C(new dt(n*.72,.005,.02),o);a.position.set(0,.012,t*.32-r*t*.14),i.add(a)}return i.rotation.y=e,i}function Vv(){const n=new Et,t=new C(new dt(.72,.03,.98),new Y({color:13215850,roughness:.6}));n.add(t);const e=new C(new Kt(.62,.86),new Y({color:16050896,roughness:.9}));e.position.set(0,.02,.02),n.add(e);const i=new C(new dt(.2,.06,.3),new Y({color:6048304,metalness:.6,roughness:.3}));return i.position.set(0,.05,.42),n.add(i),n}function Wv(n=.2){const t=new Et,e=new C(new Fn(.34,.05,12,28),new Y({color:ne.bronze,roughness:.3,metalness:.7}));t.add(e);const i=new C(new On(.33,28),new Y({color:12574950,transparent:!0,opacity:.35,roughness:.05,metalness:.4}));t.add(i);const s=new C(new bt(.035,.05,.5,10),new Y({color:4864550,roughness:.7}));return s.position.set(-.4,-.15,0),s.rotation.z=.9,t.add(s),t.rotation.x=n,t}function ia(n=16758896){const t=new Et,e=new Y({color:4864550,roughness:.4,metalness:.6}),i=new C(new bt(.28,.34,.1,16),e);i.position.y=.05,t.add(i);const s=new C(new bt(.05,.05,1.1,10),e);s.position.y=.65,t.add(s);const o=new C(new dt(.9,.05,.05),e);o.position.set(.42,1.25,0),t.add(o);const r=new C(new nn(.16,.22,14),e);r.position.set(.85,1.28,0),r.rotation.z=-Math.PI/2,t.add(r);const a=new C(new re(.07,10,8),new Y({color:n,emissive:n,emissiveIntensity:2.2}));a.position.set(.9,1.18,0),t.add(a);const l=new hl(n,1.6,9,2);return l.position.set(.9,1.1,0),t.add(l),{g:t,light:l}}function Xv(){const n=new Et,t=new C(new bt(.05,.05,.8,12),new Y({color:3813154,roughness:.4,metalness:.5}));t.position.y=.4,n.add(t);const e=new C(new nn(.05,.16,12),new Y({color:ne.bronze,metalness:.8,roughness:.3}));e.position.y=-.02,e.rotation.x=Math.PI,n.add(e);const i=new C(new bt(.055,.055,.18,12),new Y({color:12151365,roughness:.5}));return i.position.y=.92,n.add(i),n}function Bc(n=11549232,t="CONCÉDÉ"){const e=new Et,i=new C(new bt(.42,.42,.24,20),new Y({color:n,roughness:.5}));e.add(i);const s=new C(new bt(.12,.14,.3,12),new Y({color:4864550,roughness:.6}));s.position.y=.27,e.add(s);const o=new C(new Fn(.42,.03,8,24),new Y({color:16050896,roughness:.6}));return o.rotation.x=Math.PI/2,o.position.y=.121,e.add(o),e}function qv(){const n=new Et,t=new Y({color:9071165,roughness:.5}),e=new C(new bt(.05,.06,.9,12),t);e.rotation.z=Math.PI/2,n.add(e);const i=new C(new bt(.14,.14,.34,12),t);return i.position.set(.55,.12,0),i.rotation.z=Math.PI/2,n.add(i),n}function Yv(n=0){const t=new Et,e=new C(new dt(.6,.05,.42),new Y({color:16050896,roughness:.85}));t.add(e);const i=new C(new bt(.09,.09,.02,12),new Y({color:11549232,roughness:.4}));return i.position.y=.035,t.add(i),t.rotation.y=n,t}function $v(n,t,e){return $n((i,s,o)=>{i.fillStyle="#f7f0de",to(i,6,6,s-12,o-12,20),i.fill(),i.strokeStyle="rgba(138,111,69,0.55)",i.lineWidth=4,to(i,6,6,s-12,o-12,20),i.stroke();const r=s/2,a=o*.56,l=o*.32,c=Math.PI*.75,d=Math.PI*1.5;i.lineCap="round",i.lineWidth=26,i.strokeStyle="rgba(110,90,55,0.22)",i.beginPath(),i.arc(r,a,l,c,c+d),i.stroke(),i.strokeStyle=t,i.beginPath(),i.arc(r,a,l,c,c+d*n),i.stroke(),i.fillStyle="#3a2e1f",i.font="800 90px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",i.textAlign="center",i.fillText(Math.round(n*100)+"%",r,a+22),i.fillStyle="rgba(90,74,52,0.75)",i.font="600 30px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",i.fillText(e,r,a+l+44)},512,512)}function kc(n=1){const t=new Et,e=new Y({color:4864550,roughness:.5,metalness:.4}),i=new Y({color:ne.terracotta,roughness:.6}),s=17*n,o=new C(new dt(.5,s,.5),e);o.position.y=s/2,o.castShadow=!0,t.add(o);const r=new C(new dt(.35,.35,15*n),e);r.position.set(0,s+.6,5*n),t.add(r);const a=new C(new dt(1,1,1),i);a.position.set(0,s,-1.6*n),t.add(a);for(const u of[-.2,.2]){const f=new C(new bt(.03,.03,8*n,6),e);f.position.set(u,s+.4,6.6*n),f.rotation.x=-.35,t.add(f)}const l=new hr({color:6048304}),c=[new w(0,s+.5,8*n),new w(0,s-3*n,8*n)],d=new Pe().setFromPoints(c);t.add(new cl(d,l));const h=new C(new dt(.3,.3,.3),e);return h.position.set(0,s-3.4*n,8*n),t.add(h),t}function Zv(n,t=60){const e=new Float32Array(t*3),i=new Float32Array(t*3),s=[12618344,13805688,16050896,9416330,10521188];for(let l=0;l<t;l++){e[l*3]=(Math.random()-.5)*14,e[l*3+1]=Math.random()*9,e[l*3+2]=(Math.random()-.5)*14;const c=new vt(s[l%s.length]);i[l*3]=c.r,i[l*3+1]=c.g,i[l*3+2]=c.b}const o=new Pe;o.setAttribute("position",new Oe(e,3)),o.setAttribute("color",new Oe(i,3));const r=new Ts({size:.16,vertexColors:!0,transparent:!0,opacity:.85}),a=new io(o,r);return n.add(a),a}function vn(n,t={}){const e=$n((m,v,g)=>{const p=m.createLinearGradient(0,0,0,g);p.addColorStop(0,"#f8f1de"),p.addColorStop(.34,"#f4e9cf"),p.addColorStop(.6,"#efe1bf"),p.addColorStop(.82,"#e9d7ab"),p.addColorStop(1,"#e1cc95"),m.fillStyle=p,m.fillRect(0,0,v,g);const T=m.createLinearGradient(0,g*.58,0,g);T.addColorStop(0,"rgba(255,238,205,0)"),T.addColorStop(1,"rgba(255,241,212,0.9)"),m.fillStyle=T,m.fillRect(0,g*.58,v,g*.42),m.fillStyle="rgba(255,252,244,0.5)";for(let _=0;_<12;_++){const M=Math.random()*v,F=Math.random()*g*.55,L=26+Math.random()*48;for(let D=0;D<4;D++)m.beginPath(),m.ellipse(M+(Math.random()-.5)*L*.6,F+(Math.random()-.5)*10,L*(.3+Math.random()*.25),4+Math.random()*5,0,0,Ms),m.fill()}},256,1024),i=new Fe({map:e,side:en,fog:!1,depthWrite:!1}),s=new C(new re(820,24,14),i);n.add(s);const o=new Qn(new zn({map:Rn(0,"rgba(240,180,110,0.95)"),transparent:!0,blending:Ze,depthWrite:!1,depthTest:!1}));o.position.set(t.sunX??-180,t.sunY??90,-520),o.scale.setScalar(t.sunS??130),n.add(o);const r=new Qn(new zn({map:Rn(.25,"rgba(235,165,95,0.35)"),transparent:!0,blending:Ze,depthWrite:!1,depthTest:!1}));r.position.set(t.sunX??-180,t.sunY??90,-520),r.scale.setScalar(460),n.add(r),n.userData.sun={sprite:o,halo:r};const a=new C(new On(1400,40),new Y({map:Ed(),roughness:1,metalness:0}));a.rotation.x=-Math.PI/2,a.position.y=-.03,a.receiveShadow=!0,n.add(a),n.add(new bd(11772544,t.ambient??.75)),n.add(new xd(15918796,12101246,t.hemi??.5));const l=new wd(16772552,t.sunI??2.6);l.position.set(-120,140,-220),l.castShadow=!0,l.shadow.mapSize.set(1024,1024),l.shadow.camera.left=-60,l.shadow.camera.right=60,l.shadow.camera.top=60,l.shadow.camera.bottom=-60,l.shadow.camera.near=10,l.shadow.camera.far=600,n.add(l),n.add(l.target),n.fog=new mi(t.fogColor??ne.skyHorizon,t.fogNear??40,t.fogFar??480);const c=vs()?70:140,d=new Float32Array(c*3);for(let m=0;m<c;m++)d[m*3]=(Math.random()-.5)*90,d[m*3+1]=.4+Math.random()*9,d[m*3+2]=-20+Math.random()*160;const h=new Pe;h.setAttribute("position",new Oe(d,3));const u=new Ts({color:16050896,transparent:!0,opacity:.3,blending:Ze,depthWrite:!1,size:.09,sizeAttenuation:!0}),f=new io(h,u);n.add(f),n.userData.dust=f}function Li(n,t=12,e=30,i=170,s=70){for(let o=0;o<t;o++){const r=e+Math.random()*(i-e),a=9+Math.random()*22,l=5+Math.random()*4,c=5+Math.random()*4,d=Math.random()>.5?1:-1;n.add(Ya(l,a,c,r,d*(s*.55+Math.random()*s*.45)))}}function Ii(n,t){n.userData.palms=n.userData.palms||[];for(const[e,i,s]of t){const o=Ad(new w(e,0,i),s??1);n.userData.palms.push(o),n.add(o)}}const or={presentation(n,t,e){vn(n);const i=new ln([new w(0,0,-30),new w(0,0,140)]),s=Yn(i,4.4,ne.path,hs(),400);s.position.y=.01,n.add(s);const o=ea(t,e);o.position.set(-5.2,0,46),o.rotation.y=.42,n.add(o);const r=Pi(Dn(1));r.position.set(6.4,0,70),r.rotation.y=-.55,n.add(r),Li(n,16),Ii(n,[[-9,18,1.2],[9,22,1],[-10,62,1.3],[10,92,1.1],[-11,120,1.25]]);for(let l=0;l<=4;l++){const c=8+l*26,d=l%2===0?1:-1,h=$s(new w(d*6,0,c),d);n.add(h);const u=Zs(new w(d*6,0,c),d);n.add(u.group)}for(const l of[30,78]){const c=nr();c.group.position.set(0,0,l),c.group.rotation.y=Math.PI,c.group.userData.x0=0,(n.userData.cars=n.userData.cars||[]).push(c.group),n.add(c.group)}const a=new Ae(46,1280/760,.1,2e3);return a.position.set(6.5,3.1,14),a.lookAt(-1.5,3.4,52),a},"lecon1-importance"(n,t,e){vn(n,{sunX:60,sunY:120,sunI:2.4});const i=new ln([new w(0,0,-20),new w(0,0,150)]),s=Yn(i,4.4,ne.path,hs(),400);s.position.y=.01,n.add(s),[{x:-5.6,z:40,ry:.5},{x:5.8,z:62,ry:-.6},{x:-5.9,z:86,ry:.55},{x:5.9,z:108,ry:-.55},{x:-5.8,z:130,ry:.5}].forEach((a,l)=>{const c=l===0?ea(t,e):Pi(Dn(l+2));c.position.set(a.x,0,a.z),c.rotation.y=a.ry,n.add(c)}),Li(n,14,30,190,80),Ii(n,[[-9,16,1],[9,50,1.1],[-10,96,1.05],[10,132,1.15]]);for(let a=0;a<=5;a++){const l=12+a*24,c=a%2===0?1:-1,d=$s(new w(c*6,0,l),c);n.add(d);const h=Zs(new w(c*6,0,l),c);n.add(h.group)}for(const a of[28,74,118]){const l=nr();l.group.position.set(0,0,a),l.group.rotation.y=Math.PI,l.group.userData.x0=0,(n.userData.cars=n.userData.cars||[]).push(l.group),n.add(l.group)}const r=new Ae(48,1280/760,.1,2e3);return r.position.set(8,5.4,6),r.lookAt(0,3.2,80),r},"lecon2-constat"(n,t,e){vn(n,{sunI:1.3,ambient:.5,fogColor:15524036,fogNear:24,fogFar:220}),[[0,20,.1,1.15],[-7,34,-.35,1],[6,42,.55,.9],[-3,52,-.2,1.25],[8,60,-.7,.85],[-8,66,.3,1.1],[3,74,.65,.95],[-5,84,-.5,1.05],[7,90,.15,.8],[-9,96,-.8,1.2]].forEach(([r,a,l,c],d)=>{const h=d===0?ea(t,e):Pi(Dn(d+1));h.position.set(r,0,a),h.scale.setScalar(c),h.rotation.y=l,h.rotation.z=d%3*.06-.06,d%4===3&&(h.rotation.x=-.08),n.add(h)});const s=Pi(Dn(5));s.position.set(2,0,102),s.rotation.set(1.35,.4,.3),n.add(s),Li(n,10,20,150,60),Ii(n,[[-9,30,.9],[9,55,.85],[-10,88,.95]]);const o=new Ae(52,1280/760,.1,2e3);return o.position.set(11,5.2,-8),o.lookAt(-1,2.6,55),o},audit(n){vn(n,{sunI:1.1,ambient:.65,fogNear:30,fogFar:200}),n.fog=new mi(15524036,30,200);const t=new C(new Kt(90,40),new Y({color:15985364}));t.position.set(0,14,-16),t.rotation.y=Math.PI,n.add(t);const e=$n((u,f,m)=>{const v=u.createLinearGradient(0,0,0,m);v.addColorStop(0,"#d9e4e6"),v.addColorStop(1,"#f2e4c6"),u.fillStyle=v,u.fillRect(0,0,f,m),u.fillStyle="#c3ab7c",u.fillRect(0,m*.72,f,m*.28),u.fillStyle="rgba(180,140,90,0.6)";for(let g=0;g<14;g++){const p=16+Math.random()*40,T=20+Math.random()*60;u.fillRect(10+Math.random()*(f-50),m*.76,p,T)}},512,320),i=new C(new Kt(13,7),new Y({map:e,emissiveMap:e,emissive:new vt(16773336),emissiveIntensity:.12}));i.position.set(0,7.5,-15.6),n.add(i);const s=new Y({color:8019768}),o=new C(new dt(.4,7,.3),s);o.position.set(0,7.5,-15.2),n.add(o);const r=new C(new dt(13,.4,.3),s);r.position.set(0,7.5,-15.2),n.add(r);const a=na();n.add(a);for(const[u,f,m]of[[.7,.3,.35],[-.6,.4,-.4],[.2,-.5,.1]]){const v=Hv(.9,1.2,m);v.position.set(u,1.1,f),n.add(v)}const l=Vv();l.position.set(-.9,1.09,.25),l.rotation.y=.3,n.add(l);const c=Wv(.25);c.position.set(.55,1.12,.5),c.rotation.y=.4,c.userData.y0=1.12,c.userData.rz0=0,(n.userData.floaters=n.userData.floaters||[]).push(c),n.add(c);const d=ia();d.g.position.set(-1.6,0,-.5),n.add(d.g),n.add(d.light);const h=new Ae(44,1280/760,.1,2e3);return h.position.set(4.2,3.4,7.5),h.lookAt(0,1.6,-1),h},"etat-lieux"(n){vn(n,{sunI:2.2,fogNear:60,fogFar:700});const t=new C(new Kt(24,24),new Y({map:Fc(),roughness:.9}));t.rotation.x=-Math.PI/2,t.position.y=.01,n.add(t);const e=[new w(-7,.5,6),new w(-3.5,.6,1),new w(1,.7,-4),new w(5.5,.8,-7),new w(9,.9,-10)],i=new C(new As(new ln(e),64,.12,8,!1),new Fe({color:12618344,transparent:!0,opacity:.8}));i.position.y=-.01,n.add(i),[[-7,6,13204066],[-3.5,1,8232642],[1,-4,13805688],[5.5,-7,9416330],[9,-10,13204066]].forEach(([l,c,d])=>{const h=Oc(d);h.position.set(l,0,c),n.add(h)});const o=$n((l,c,d)=>{l.fillStyle="rgba(255,255,255,0.75)",l.beginPath(),l.arc(c/2,d/2,c/2-8,0,Ms),l.fill(),l.strokeStyle="rgba(90,74,52,0.8)",l.lineWidth=5,l.stroke(),l.fillStyle="#c08a68",l.beginPath(),l.moveTo(c/2,d*.16),l.lineTo(c*.58,d*.6),l.lineTo(c*.42,d*.6),l.closePath(),l.fill(),l.fillStyle="#5a4a34",l.font="800 34px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",l.textAlign="center",l.fillText("N",c/2,d*.2)},160,160),r=new C(new Kt(2.2,2.2),new Fe({map:o,transparent:!0}));r.position.set(-9.5,.05,9.5),r.rotation.x=-Math.PI/2,n.userData.compass=r,n.add(r);const a=new Ae(40,1280/760,.1,2e3);return a.position.set(13,20,11),a.lookAt(0,0,0),a},zonage(n){vn(n,{sunI:2,fogNear:60,fogFar:700});const t=new C(new Kt(24,24),new Y({map:Fc(!0),roughness:.9}));t.rotation.x=-Math.PI/2,t.position.y=.01,n.add(t),[[0,0,8232642],[6,0,12618344],[0,-6,9416330],[6,-6,13805688]].forEach(([r,a,l])=>{const c=Oc(l);c.position.set(r,0,a),n.add(c)});const i=$n((r,a,l)=>{r.fillStyle="rgba(240,236,220,0.95)",to(r,0,0,a,l,16),r.fill();const c=[["#7d9ec2","Zone A"],["#c08a68","Zone B"],["#8fae8a","Zone C"],["#d2a878","Zone D"]];r.font="700 30px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",r.textAlign="left",c.forEach(([d,h],u)=>{r.fillStyle=d,r.beginPath(),r.arc(46,60+u*70,16,0,Ms),r.fill(),r.fillStyle="#3a2a18",r.fillText(h,78,72+u*70)})},360,320),s=new C(new Kt(3.4,3),new Fe({map:i,transparent:!0}));s.position.set(-8.8,.05,-8),s.rotation.x=-Math.PI/2,n.add(s);const o=new Ae(40,1280/760,.1,2e3);return o.position.set(-10,21,14),o.lookAt(0,0,-1),o},"constitution-lots"(n,t,e){vn(n,{sunX:40,sunY:130,sunI:2.4});const i=new ln([new w(0,0,-20),new w(0,0,150)]),s=Yn(i,4.4,ne.path,hs(),400);s.position.y=.01,n.add(s);const o=kv(Dn(0));o.position.set(-6.4,0,42),o.rotation.y=.35,n.add(o);const r=Pi(Dn(3));r.position.set(6.6,0,64),r.rotation.y=-.5,n.add(r);const a=Gv(Dn(2));a.position.set(-6.2,0,88),a.rotation.y=.4,n.add(a);const l=Bv(Dn(1));l.position.set(6.4,0,108),l.rotation.y=-.45,n.add(l),Li(n,12,30,180,80),Ii(n,[[-9,22,1.1],[9,34,1],[-10,78,1.15],[10,122,1.05]]);for(let d=0;d<=4;d++){const h=20+d*24,u=d%2===0?1:-1,f=$s(new w(u*6,0,h),u);n.add(f);const m=Zs(new w(u*6,0,h),u);n.add(m.group)}for(const d of[58,100]){const h=fs(new w(4.6,0,d),1);n.add(h)}const c=new Ae(46,1280/760,.1,2e3);return c.position.set(8.5,4.6,4),c.lookAt(-1,3,62),c},"mise-concession"(n){vn(n,{sunI:1.2,ambient:.7,fogNear:30,fogFar:200}),n.fog=new mi(15524036,30,200);const t=new C(new Kt(90,40),new Y({color:15985364}));t.position.set(0,14,-16),t.rotation.y=Math.PI,n.add(t);const e=na();n.add(e);const i=new C(new Kt(2.3,1.6),new Y({color:16050896,roughness:.85}));i.position.set(.1,1.08,.15),i.rotation.x=-.18,n.add(i);const s=Xv();s.position.set(1.05,1.1,.5),s.rotation.y=-.5,s.rotation.z=-.12,s.userData.y0=1.1,s.userData.rz0=-.12,(n.userData.floaters=n.userData.floaters||[]).push(s),n.add(s);const o=Bc();o.position.set(-1.15,1.05,-.1),o.rotation.y=.3,o.userData.y0=1.05,o.userData.rz0=0,(n.userData.floaters=n.userData.floaters||[]).push(o),n.add(o);const r=new C(new Fn(.22,.04,10,24),new Y({color:ne.bronze,metalness:.8,roughness:.3}));r.position.set(-.7,1.12,.6),r.rotation.x=Math.PI/2.2,r.rotation.z=.3,n.add(r);const a=ia();a.g.position.set(-1.7,0,-.6),n.add(a.g),n.add(a.light);const l=new Ae(42,1280/760,.1,2e3);return l.position.set(3.9,3.6,6.8),l.lookAt(-.1,1.7,-.4),l},attribution(n){vn(n,{sunI:1.2,ambient:.7,fogNear:30,fogFar:200}),n.fog=new mi(15524036,30,200);const t=new C(new Kt(90,40),new Y({color:15985364}));t.position.set(0,14,-16),t.rotation.y=Math.PI,n.add(t);const e=na();n.add(e);const i=qv();i.position.set(.9,1.12,.2),i.rotation.y=.7,i.userData.y0=1.12,i.userData.rz0=0,(n.userData.floaters=n.userData.floaters||[]).push(i),n.add(i);for(const[l,c,d]of[[-1.2,.4,.5],[-.5,-.4,-.6],[.4,.6,.1]]){const h=Yv(d);h.position.set(l,1.06,c),n.add(h)}const s=Bc(3829823,"ADMIS");s.position.set(-1.4,1.05,-.5),s.rotation.y=-.4,n.add(s);const o=new C(new Fn(.24,.06,12,28),new Y({color:13805688,metalness:.9,roughness:.25}));o.position.set(.1,1.15,-.6),o.rotation.x=Math.PI/2.4,o.userData.y0=1.15,o.userData.rz0=0,(n.userData.floaters=n.userData.floaters||[]).push(o),n.add(o);const r=ia();r.g.position.set(-1.7,0,-.6),n.add(r.g),n.add(r.light);const a=new Ae(42,1280/760,.1,2e3);return a.position.set(4.1,3.5,7.2),a.lookAt(0,1.6,-.2),a},gestion(n){vn(n,{sunX:20,sunY:150,sunI:2.5});const t=new ln([new w(0,0,-20),new w(0,0,150)]),e=Yn(t,4.4,ne.path,hs(),400);e.position.y=.01,n.add(e);const i=new Et,s=new Y({color:15195071,roughness:.85}),o=new C(new dt(14,10,8),s);o.position.y=5,o.castShadow=!0,i.add(o);const r=new C(new bt(8,8.6,1.6,4),s);r.position.y=11,r.rotation.y=Math.PI/4,i.add(r);const a=new Y({color:13614751,roughness:.6});for(const f of[-5,-3.3,-1.6,0,1.6,3.3,5]){const m=new C(new bt(.28,.34,4.6,10),a);m.position.set(f,2.3,4.05),i.add(m)}const l=$n((f,m,v)=>{f.fillStyle="#d8c9a6",f.fillRect(0,0,m,v);for(let g=0;g<3;g++)for(let p=0;p<6;p++)Math.random()<.75&&(f.fillStyle=Math.random()<.4?"#b98a5a":"#c9a25f",f.globalAlpha=.6,f.fillRect(10+p*(m/6),10+g*(v/3.4),m/8,v/4.4),f.globalAlpha=1)},512,256),c=new C(new Kt(10,4.4),new Y({map:l,emissiveMap:l,emissive:new vt(16114365),emissiveIntensity:.15}));c.position.set(0,6.2,4.06),i.add(c),i.position.set(0,0,58),i.rotation.y=Math.PI,n.add(i);const d=new C(new bt(.08,.12,8,8),new Y({color:6048304}));d.position.set(-8,4,56),n.add(d);const h=new C(new Kt(2.6,1.5),new Y({color:ne.terracotta,side:ze,roughness:.8}));h.position.set(-6.6,7.4,56),h.rotation.y=.2,n.userData.flag=h,n.add(h);for(let f=0;f<3;f++){const m=Pi(Dn(f+1));m.position.set(-6.4,0,30+f*22),m.rotation.y=.45,n.add(m)}Li(n,10,80,200,90),Ii(n,[[-9,20,1],[9,44,1.1],[9.5,92,1]]);for(let f=0;f<=4;f++){const m=14+f*26,v=f%2===0?1:-1,g=$s(new w(v*6,0,m),v);n.add(g);const p=Zs(new w(v*6,0,m),v);n.add(p.group)}const u=new Ae(44,1280/760,.1,2e3);return u.position.set(10,3.6,18),u.lookAt(0,4.5,58),u},evaluation(n){vn(n,{sunI:1,ambient:.55,fogNear:30,fogFar:300}),n.fog=new mi(15524036,30,300),[{pct:.9,color:"#d2a878",label:"AUDIT",x:-4},{pct:.78,color:"#c08a68",label:"CONCESSION",x:0},{pct:.86,color:"#7da878",label:"GESTION",x:4}].forEach(({pct:r,color:a,label:l,x:c})=>{const d=new C(new bt(1.5,1.8,.3,20),new Y({color:6048304,roughness:.7}));d.position.set(c,.15,0),n.add(d);const h=new C(new bt(.14,.16,3.4,10),new Y({color:ne.walnut,roughness:.6}));h.position.set(c,1.85,0),n.add(h);const u=$v(r,a,l),f=new C(new Kt(3.6,3.6),new Y({map:u,emissiveMap:u,emissive:new vt(16777215),emissiveIntensity:.08}));f.position.set(c,3.9,0),f.rotation.x=.25,n.add(f);const m=new hl(15246172,.2,8,2);m.position.set(c,3.2,2),n.add(m)});const e=[new w(-6,.8,2.5),new w(-3,1.6,1.4),new w(0,2.6,0),new w(3,3.8,-1.2),new w(6,5.2,-2.4)],i=new C(new As(new ln(e),64,.1,8,!1),new Fe({color:5742687,transparent:!0,opacity:.9}));n.add(i);const s=new C(new nn(.3,.8,12),new Y({color:5742687,emissive:5742687,emissiveIntensity:.6}));s.position.set(6.4,5.6,-2.7),s.rotation.z=-.6,n.add(s);const o=new Ae(46,1280/760,.1,2e3);return o.position.set(7,3.4,11),o.lookAt(0,3.2,-1),o},"mise-a-jour"(n){vn(n,{sunX:-80,sunY:110,sunI:2.2});const t=new ln([new w(0,0,-20),new w(0,0,150)]),e=Yn(t,4.4,ne.path,hs(),400);e.position.y=.01,n.add(e);const i=kc(1);i.position.set(-8,0,52),n.userData.cranes=[i],n.add(i);const s=kc(.7);s.position.set(8,0,84),n.userData.cranes.push(s),n.add(s);const o=new C(new dt(7,9,7),new Y({color:2760726,roughness:.9}));o.position.set(0,4.5,62),o.castShadow=!0,n.add(o);const r=new Y({color:7034424,roughness:.8});for(let u=0;u<4;u++){const f=new C(new dt(8,.14,.14),r);f.position.set(0,1.5+u*2.3,3.6),n.add(f)}const a=Pi(Dn(4));a.position.set(0,14,66),a.rotation.x=.15,a.userData.y0=14,n.userData.hoisted=a,n.add(a);const l=new hr({color:6048304}),c=[new w(-8,18,52),new w(0,15,65)],d=new Pe().setFromPoints(c);n.add(new cl(d,l)),Li(n,10,90,220,85),Ii(n,[[-9,30,.9],[9,110,1]]);const h=new Ae(48,1280/760,.1,2e3);return h.position.set(11,5.5,6),h.lookAt(0,8,62),h},quiz(n){vn(n,{sunX:0,sunY:130,sunI:2});const t=$n((d,h,u)=>{d.clearRect(0,0,h,u),d.fillStyle="rgba(253,250,242,0.92)",to(d,0,0,h,u,40),d.fill(),d.strokeStyle="rgba(138,111,69,0.5)",d.lineWidth=8,to(d,8,8,h-16,u-16,36),d.stroke(),d.shadowColor="rgba(122,95,56,0.55)",d.shadowBlur=40,d.fillStyle="#7a5f38",d.font="800 620px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",d.textAlign="center",d.textBaseline="middle",d.fillText("?",h/2,u*.52),d.shadowBlur=0},640,640),e=new C(new Kt(7,7),new Fe({map:t,transparent:!0}));e.position.set(0,8.5,30),n.add(e);const i=new Qn(new zn({map:Rn(.3,"rgba(232,163,92,0.28)"),transparent:!0,blending:Ze,depthWrite:!1}));i.position.set(0,8.5,28.5),i.scale.setScalar(18),n.add(i);const s=new Et,o=new Y({color:13805688,metalness:.85,roughness:.28}),r=new C(new bt(.9,1,.3,16),o);s.add(r);const a=new C(new bt(.28,.3,1.2,12),o);a.position.y=.75,s.add(a);const l=new C(new bt(.9,.45,1.1,18),o);l.position.y=1.7,s.add(l);for(const d of[-1,1]){const h=new C(new Fn(.4,.07,10,20,Math.PI),o);h.position.set(d*.78,1.5,0),h.rotation.z=d*Math.PI/2,s.add(h)}s.position.set(-3.6,0,40),n.userData.trophy=s,n.add(s),Li(n,12,60,200,90),Ii(n,[[-9,60,1],[9,90,1.1]]),n.userData.confetti=Zv(n,70);const c=new Ae(46,1280/760,.1,2e3);return c.position.set(6,3.6,8),c.lookAt(0,6.5,34),c}};function Kv(n,t,e,i=1280,s=760){if(sr)return null;let o;try{o=new al({canvas:e,antialias:!vs(),alpha:!1}),o.toneMapping=ar,o.toneMappingExposure=1.2,o.shadowMap.enabled=!vs(),o.shadowMap.enabled&&(o.shadowMap.type=rr),o.setPixelRatio(Math.min(window.devicePixelRatio||1,vs()?1:1.25)),o.setSize(i,s,!1)}catch{return sr=!0,null}let r=null,a=null;try{r=new ll,a=(or[n.id]||or.presentation)(r,n,t),a.aspect=i/s,a.updateProjectionMatrix()}catch(I){return console.warn("Illustration 3D en direct indisponible pour",n.id,I),o.dispose(),null}const l=a.position.clone(),c=new w;a.getWorldDirection(c);const d=l.clone().addScaledVector(c,40),h=Math.min(3,Math.max(.6,l.length()/14)),u=r.userData.dust||null,f=r.userData.sun||null,m=r.userData.palms||[],v=r.userData.cars||[],g=r.userData.cranes||[],p=r.userData.hoisted||null,T=r.userData.trophy||null,_=r.userData.flag||null,M=r.userData.compass||null,F=r.userData.confetti||null,L=r.userData.floaters||[];function D(I,y,x){u&&(u.rotation.y+=y*.02,u.position.y=Math.sin(I*.4)*.3,u.material.opacity=.26+Math.sin(I*.8)*.08),f&&(f.sprite.material.opacity=.82+Math.sin(I*.5)*.1,f.halo.material.opacity=.28+Math.sin(I*.4+1)*.06);for(let P=0;P<m.length;P++)m[P].rotation.z=Math.sin(I*.8+P*1.7)*.05;for(let P=0;P<v.length;P++){const O=v[P];O.position.z-=y*.9,O.position.x=(O.userData.x0||0)+Math.sin(I*.5+P*2.1)*.4,O.position.z<-14&&(O.position.z=132,O.position.x=(Math.random()-.5)*6,O.userData.x0=O.position.x)}if(F){const P=F.geometry.attributes.position,O=P.array;for(let V=0;V<P.count;V++)O[V*3+1]-=y*.7,O[V*3+1]<.2&&(O[V*3+1]=6+Math.random()*3,O[V*3]=(Math.random()-.5)*14,O[V*3+2]=(Math.random()-.5)*14);P.needsUpdate=!0}T&&(T.rotation.y=Math.sin(I*.6)*.12);for(let P=0;P<g.length;P++){const O=g[P];O.rotation.y=(O.userData.baseY||0)+Math.sin(I*.15+P*2.4)*.12}p&&(p.rotation.z=Math.sin(I*1.1)*.03,p.position.y=(p.userData.y0||14)+Math.sin(I*.7)*.25),_&&(_.rotation.z=Math.sin(I*1.8)*.16+Math.sin(I*3.1)*.05),M&&(M.rotation.z=I*.15);for(let P=0;P<L.length;P++){const O=L[P];O.position.y=(O.userData.y0||O.position.y)+Math.sin(I*1.2+P*1.3)*.03,O.rotation.z=(O.userData.rz0||0)+Math.sin(I*.9+P)*.02}a.position.set(l.x+Math.sin(x*Math.PI)*.5*h+Math.sin(I*.3)*.06*h,l.y+Math.cos(x*Math.PI)*.25*h+Math.sin(I*.24)*.05*h,l.z+(x-.5)*1.2*h+Math.cos(I*.21)*.07*h),a.lookAt(d),o.render(r,a)}return{canvas:o.domElement,render:D,dispose(){o.dispose(),r.traverse(I=>{if(I.geometry&&I.geometry.dispose(),I.material){const y=Array.isArray(I.material)?I.material:[I.material];for(const x of y)x.map&&x.map.dispose(),x.dispose()}})}}}const sa=new Map;function jv(n,t,e=1280,i=760){if(sa.has(n.id))return sa.get(n.id);const s=Ov();if(!s)return null;try{s.setPixelRatio(vs()?1:1.5),s.setSize(e,i);const o=new ll,a=(or[n.id]||or.presentation)(o,n,t);a.aspect=e/i,a.updateProjectionMatrix(),s.render(o,a);const l=s.domElement.toDataURL("image/jpeg",.85);return Jv(o),sa.set(n.id,l),l}catch(o){return console.warn("Illustration 3D indisponible pour",n.id,o),null}}function Jv(n){const t=new Set,e=new Set;n.traverse(i=>{i.geometry&&i.geometry.dispose();const s=Array.isArray(i.material)?i.material:i.material?[i.material]:[];for(const o of s)if(!e.has(o)){e.add(o);for(const r of[o.map,o.emissiveMap])r&&!t.has(r)&&(t.add(r),r.dispose());o.dispose()}})}function Qv({onExit:n,onScrollTo:t,onQuiz:e}){const i=document.getElementById("ui-course"),s=i.querySelector("#course-toc"),o=i.querySelector("#course-toc-select"),r=i.querySelector("#course-sections"),a=i.querySelector("#course-cover"),l=i.querySelector("#course-close"),c=i.querySelector("#course-quiz-btn"),d=i.querySelector(".course-main"),h=t||(y=>d.scrollTo({top:y,behavior:"smooth"}));let u=!1;a.innerHTML=`
    <div class="course-cover-kicker">${Jr.module} — Formation :</div>
    <h1 class="course-cover-title">${Jr.title}</h1>
    <div class="course-cover-sub">${Jr.subtitle}</div>
    <div class="course-cover-rule"></div>
    <p class="course-cover-desc">Lecture complète et illustrée du cours. Avancez section par section, chaque étape est accompagnée d'une illustration de son contexte.</p>
    <div class="course-cover-meta"><span>${$e.length} étapes</span><span>12 questions finales</span></div>
  `;const f=[],m=[];Ko.forEach((y,x)=>{const P=$e.filter(O=>O.chapter===x);P.length&&(f.push(`<div class="toc-chapter"><div class="toc-chapter-name">${y.name}</div><div class="toc-chapter-label">${y.label}</div></div>`),P.forEach(O=>{f.push(`<a href="#course-sec-${O.id}" class="toc-item" data-id="${O.id}"><span class="toc-num">${O.num}</span><span>${O.title}</span></a>`)}))}),$e.forEach(y=>{const x=Ko[y.chapter],P=y.id==="quiz";let O="";P?O=`<ul class="course-bullets">${y.bullets.map(V=>`<li>${V}</li>`).join("")}</ul>`:O=y.content.map(V=>`<p><span class="course-body-t">${V.t}</span>${V.b}</p>`).join(""),m.push(`
      <section class="course-section" id="course-sec-${y.id}">
        <canvas class="course-illus" role="img" aria-label="Illustration — ${y.title}"></canvas>
        <div class="course-sec-meta">
          <span class="course-sec-chapter">${x?`${x.name} · ${x.label}`:""}</span>
          <span class="course-sec-num">${y.num} / ${String($e.length).padStart(2,"0")}</span>
        </div>
        <h2 class="course-sec-title">${y.title}</h2>
        <div class="course-sec-rule"></div>
        <div class="course-sec-content">${O}</div>
      </section>
    `)}),s.innerHTML=f.join(""),r.innerHTML=m.join("");const v=[];Ko.forEach((y,x)=>{const P=$e.filter(O=>O.chapter===x);P.length&&(v.push(`<optgroup label="${y.name}">`),P.forEach(O=>v.push(`<option value="${O.id}">${O.num} · ${O.title}</option>`)),v.push("</optgroup>"))}),o.innerHTML=v.join("");const g=[];r.querySelectorAll(".course-illus").forEach(y=>{const x=y.closest(".course-section").id.replace("course-sec-",""),P=document.createElement("canvas");Fv(P,x,1280,760),y.style.backgroundImage=`url(${P.toDataURL("image/jpeg",.86)})`,y.style.backgroundSize="cover",y.style.backgroundPosition="center",g.push({canvas:y,id:x,live:null,raf:0,p:0,running:!1})});const p=window.matchMedia("(prefers-reduced-motion: reduce)").matches;function T(y){const x=y.getBoundingClientRect(),P=d.getBoundingClientRect(),O=x.height+P.height||1;return Math.min(1,Math.max(0,(P.bottom-x.top)/O))}function _(y){if(!y.live||y.running)return;y.running=!0,y.p=T(y.canvas);let x=performance.now();const P=O=>{if(!y.running)return;const V=Math.min(.05,Math.max(.001,(O-x)/1e3));x=O,y.p=T(y.canvas),y.live.render(O*.001,V,y.p),y.raf=requestAnimationFrame(P)};y.raf=requestAnimationFrame(P)}function M(y){y.running&&(y.running=!1,cancelAnimationFrame(y.raf))}const F=new IntersectionObserver(y=>{for(const x of y){const P=g.find(O=>O.canvas===x.target);if(P)if(x.isIntersecting){if(!P.live){const O=$e.find(V=>V.id===P.id);if(O&&(p||(P.live=Kv(O,$e.indexOf(O),P.canvas,1280,760)),!P.live)){const V=jv(O,$e.indexOf(O));V&&(P.canvas.style.backgroundImage=`url(${V})`)}}_(P)}else M(P)}},{root:d,rootMargin:"420px 0px 420px 0px",threshold:0});g.forEach(y=>F.observe(y.canvas)),s.addEventListener("click",y=>{const x=y.target.closest(".toc-item");if(!x)return;const P=document.getElementById("course-sec-"+x.dataset.id);P&&(h(P.offsetTop-90),s.querySelectorAll(".toc-item").forEach(O=>O.classList.toggle("active",O===x)))});function L(){let y=$e[0].id;for(const x of $e){const P=document.getElementById("course-sec-"+x.id);P&&P.offsetTop-120<=d.scrollTop&&(y=x.id)}s.querySelectorAll(".toc-item").forEach(x=>x.classList.toggle("active",x.dataset.id===y)),o.value!==y&&(o.value=y)}d.addEventListener("scroll",L,{passive:!0}),o.addEventListener("change",()=>{const y=document.getElementById("course-sec-"+o.value);y&&h(y.offsetTop-90)}),l.addEventListener("click",n),c.addEventListener("click",e);function D(){u=!0,document.body.classList.add("mode-course"),setTimeout(()=>L(),80)}function I(){u=!1,document.body.classList.remove("mode-course"),g.forEach(y=>M(y))}return{open:D,close:I,isOpen:()=>u}}async function t_(){await Promise.allSettled([document.fonts.load("400 26px 'Century Gothic'"),document.fonts.load("600 26px 'Century Gothic'"),document.fonts.load("700 26px 'Century Gothic'"),document.fonts.load("italic 400 26px 'Century Gothic'"),document.fonts.load("italic 700 26px 'Century Gothic'")]);const n=document.getElementById("scene"),t=$e.length,e=vv(n,$e),i=_v();let s=null;function o(B,ut="smooth"){s?s.scrollTo(B,{duration:ut==="smooth"?1.2:0,easing:gt=>1-Math.pow(1-gt,3)}):document.querySelector("#ui-course .course-main").scrollTo({top:B,behavior:ut})}function r(B){const ut=B==="course";a.isOpen()&&a.close(),ut&&i.setQuizShown(!1),ut&&a.open(),document.getElementById("mode-journey").classList.toggle("active",!ut),document.getElementById("mode-course-btn").classList.toggle("active",ut),ut?(I.stop(),s==null||s.start()):(s==null||s.stop(),I.start())}const a=Qv({onExit:()=>r("journey"),onScrollTo:o,onQuiz:()=>{r("journey"),setTimeout(()=>{const B=Math.max(1,L.offsetHeight-window.innerHeight);I.scrollTo(B,{duration:1.6})},120)}});document.getElementById("mode-journey").addEventListener("click",()=>r("journey")),document.getElementById("mode-course-btn").addEventListener("click",()=>r("course"));const l='<svg class="dn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4.5"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.2 5.2l1.6 1.6M17.2 17.2l1.6 1.6M18.8 5.2l-1.6 1.6M6.8 17.2l-1.6 1.6"/></svg>',c='<svg class="dn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>',d='<svg class="dn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3.4 2"/></svg>',h={auto:"Auto",day:"Jour",night:"Nuit"},u={auto:d,day:l,night:c},f=document.getElementById("ui-daynight");function m(B){const ut=Math.floor(B),gt=Math.floor((B-ut)*60);return String(ut).padStart(2,"0")+"h"+String(gt).padStart(2,"0")}let v="auto";function g(){e.setTimeMode(v);const B=v==="night";f.classList.toggle("night",B),f.classList.toggle("auto",v==="auto"),f.setAttribute("aria-pressed",String(B));const ut=e.getTimeInfo(),gt=v==="auto"?" · "+m(ut.hour):"";f.innerHTML=u[v]+" "+h[v]+gt,f.title=v==="auto"?"Heure réelle de la journée — cliquer pour passer en mode Jour":v==="day"?"Mode Jour fixe — cliquer pour passer en mode Nuit":"Mode Nuit fixe — cliquer pour repasser en Auto";try{localStorage.setItem("panneau-light",v)}catch{}}f.addEventListener("click",()=>{v=v==="auto"?"day":v==="day"?"night":"auto",g()});let p="auto";try{const B=localStorage.getItem("panneau-light");B==="auto"||B==="day"||B==="night"?p=B:localStorage.getItem("panneau-night")==="1"&&(p="night")}catch{}const T=new URLSearchParams(window.location.search);T.get("light")&&["auto","day","night"].includes(T.get("light"))&&(v=T.get("light"));const _=T.get("hour");_&&!isNaN(Number(_))&&(e.setHour(Number(_)),v="auto"),g();const M=T.get("at");M&&!isNaN(Number(M))&&setTimeout(()=>{const B=Math.max(1,L.offsetHeight-window.innerHeight);window.scrollTo(0,Math.round(Math.min(1,Math.max(0,Number(M)))*B))},400),T.get("hide")==="1"&&!M&&setTimeout(()=>{const B=Math.max(1,L.offsetHeight-window.innerHeight);window.scrollTo(0,Math.round(B*.03))},250),setInterval(()=>{if(v==="auto"){const B=e.getTimeInfo();f.innerHTML=u.auto+" "+h.auto+" · "+m(B.hour)}},3e4);const F=t+2,L=document.getElementById("scroll");function D(){const B=F*window.innerHeight;L.style.height=B+"px"}D();const I=new Ml({duration:1.12,smoothWheel:!0,touchMultiplier:1.5,wheelMultiplier:1}),y=document.querySelector("#ui-course .course-main");s=new Ml({wrapper:y,content:y,duration:1.15,smoothWheel:!0,touchMultiplier:1.6,wheelMultiplier:1});function x(B){I.raf(B),s&&s.raf(B),requestAnimationFrame(x)}requestAnimationFrame(x);let P=0,O=0;function V(B){const ut=Math.max(1,L.offsetHeight-window.innerHeight),gt=Math.min(1,Math.max(0,B/ut));P=gt;const yt=Math.floor(gt*F)-1;O=Math.max(0,Math.min(t-1,yt))}let Q=0;I.on("scroll",({scroll:B})=>{V(B),Q=performance.now()}),V(window.scrollY||0),e.update(P,O);function nt(){e.update(P,O),i.updateGlobal(P,O),e.render(),requestAnimationFrame(nt)}requestAnimationFrame(nt),window.addEventListener("resize",()=>{D(),e.resize(),V(window.scrollY||0)}),window.addEventListener("keydown",B=>{if(a.isOpen()){B.key==="Escape"?r("journey"):B.key==="ArrowDown"||B.key==="PageDown"?(B.preventDefault(),o(y.scrollTop+window.innerHeight*.8)):(B.key==="ArrowUp"||B.key==="PageUp")&&(B.preventDefault(),o(y.scrollTop-window.innerHeight*.8));return}if(i.isReaderOpen()){const yt=document.querySelector(".reader-panel");B.key==="Escape"?i.closeReader():B.key==="ArrowLeft"?i.readerNav(-1):B.key==="ArrowRight"?i.readerNav(1):B.key==="ArrowDown"||B.key==="PageDown"?(B.preventDefault(),yt.scrollBy({top:Math.min(yt.clientHeight*.7,yt.scrollHeight-yt.scrollTop),behavior:"smooth"})):(B.key==="ArrowUp"||B.key==="PageUp")&&(B.preventDefault(),yt.scrollBy({top:-yt.clientHeight*.7,behavior:"smooth"}));return}if(B.key==="Enter"&&O>=0&&!i.quizOpen()){i.openReader(O);return}if(["1","2","3","4"].includes(B.key)&&i.quizOpen()){B.preventDefault(),i.answerQuiz(Number(B.key)-1);return}if(i.quizOpen()){const yt=document.querySelector("#ui-quiz");if(B.key==="ArrowDown"||B.key==="PageDown"){B.preventDefault(),yt.scrollBy({top:window.innerHeight*.7,behavior:"smooth"});return}if(B.key==="ArrowUp"||B.key==="PageUp"){B.preventDefault(),yt.scrollBy({top:-window.innerHeight*.7,behavior:"smooth"});return}}const gt=window.innerHeight;B.key==="ArrowDown"||B.key==="PageDown"?(B.preventDefault(),I.scrollTo(window.scrollY+gt,{duration:1.1})):(B.key==="ArrowUp"||B.key==="PageUp")&&(B.preventDefault(),I.scrollTo(Math.max(0,window.scrollY-gt),{duration:1.1}))});let tt=null;function it(B,ut){document.documentElement.classList.toggle(ut,B),B?(tt=window.scrollY,I.stop()):(tt=null,I.start())}window.addEventListener("scroll",()=>{tt!==null&&Math.abs(window.scrollY-tt)>2&&window.scrollTo(0,tt)},{passive:!0}),i.setReaderListener(B=>it(B,"reader-lock")),i.setQuizListener(B=>it(B,"quiz-lock"));function J(B){return{nx:B.clientX/window.innerWidth*2-1,ny:-(B.clientY/window.innerHeight)*2+1}}window.addEventListener("click",B=>{if(a.isOpen()||i.isReaderOpen()||i.quizOpen()||B.target.closest&&B.target.closest("#ui"))return;const{nx:ut,ny:gt}=J(B),yt=e.pick(ut,gt);if(yt){if(yt.kind==="panel"){i.openReader(yt.index);return}if(yt.kind==="pigeon"){e.interact({kind:"pigeon",index:yt.index});return}if(yt.kind==="balloon"){e.interact({kind:"balloon",index:yt.index}),i.showToast(yt.tip);return}if(yt.kind==="fountain"){e.interact({kind:"fountain",index:yt.index}),i.showToast(yt.tip);return}if(yt.kind==="car"){e.interact({kind:"car",index:yt.index});return}yt.tip&&i.showToast(yt.tip)}});let ht=!1;window.addEventListener("mouseout",B=>{B.relatedTarget||(document.body.classList.remove("hover-pick","hover-fun"),e.setHover(null))}),window.addEventListener("blur",()=>{document.body.classList.remove("hover-pick","hover-fun"),e.setHover(null)}),window.addEventListener("mousemove",B=>{ht||(ht=!0,requestAnimationFrame(()=>{if(ht=!1,a.isOpen()||i.isReaderOpen())return;if(i.quizOpen()){document.body.classList.remove("hover-pick","hover-fun"),e.setHover(null);return}if(performance.now()-Q<200){document.body.classList.remove("hover-pick","hover-fun"),e.setHover(null);return}const{nx:ut,ny:gt}=J(B),yt=e.pick(ut,gt);document.body.classList.toggle("hover-pick",!!yt&&yt.kind!=="pigeon"),document.body.classList.toggle("hover-fun",!!yt&&yt.kind==="pigeon"),e.setHover(yt)}))}),window.__panneautique={openReader:i.openReader,closeReader:i.closeReader,openCourse:()=>r("course"),closeCourse:()=>r("journey"),pickAt:(B,ut)=>{const gt=e.pick(B/window.innerWidth*2-1,-(ut/window.innerHeight)*2+1);return gt?{kind:gt.kind,index:gt.index,tip:gt.tip}:null},interactAt:(B,ut)=>{const gt=e.pick(B/window.innerWidth*2-1,-(ut/window.innerHeight)*2+1);return gt&&e.interact({kind:gt.kind,index:gt.index}),gt?{kind:gt.kind,index:gt.index,tip:gt.tip}:null},project:(B,ut)=>{const gt=e.projectPickable(B,ut);return gt?{x:Math.round((gt.x*.5+.5)*innerWidth),y:Math.round((-gt.y*.5+.5)*innerHeight)}:null},reactive:()=>e.getReactiveState(),scrollToRatio:B=>{const ut=Math.max(1,L.offsetHeight-window.innerHeight);I.scrollTo(Math.round(Math.min(1,Math.max(0,B))*ut),{duration:.8})},getState:()=>{const B=e.getCameraPos();return{progress:P,activeIndex:O,cam:{x:B.x,y:B.y,z:B.z}}},settle:(B,ut)=>{for(let yt=0;yt<2400;yt++)e.update(B,ut);const gt=e.getCameraPos();return{cam:{x:gt.x,y:gt.y,z:gt.z},progress:B,activeIndex:ut}},setHour:B=>e.setHour(B),setLightMode:B=>{v=B,g()},getTimeInfo:()=>e.getTimeInfo()},setTimeout(()=>{document.getElementById("ui-topbar").classList.add("visible"),document.getElementById("ui-dots").classList.add("visible"),document.getElementById("ui-hint").classList.add("visible")},1200),document.querySelectorAll(".dot").forEach((B,ut)=>{B.addEventListener("click",()=>{const gt=(ut+1.5)/F,yt=Math.max(1,L.offsetHeight-window.innerHeight);I.scrollTo(Math.round(gt*yt),{duration:1.4})})})}t_();
