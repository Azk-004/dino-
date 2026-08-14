var Fd=Object.defineProperty;var Od=(n,t,e)=>t in n?Fd(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var kt=(n,t,e)=>Od(n,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function e(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(s){if(s.ep)return;s.ep=!0;const o=e(s);fetch(s.href,o)}})();var nc="1.3.26";function Iu(n,t,e){return Math.max(n,Math.min(t,e))}function Bd(n,t,e){return(1-e)*n+e*t}function kd(n,t,e,i){return Bd(n,t,1-Math.exp(-e*i))}function Gd(n,t){return(n%t+t)%t}var Hd=class{constructor(){kt(this,"isRunning",!1);kt(this,"value",0);kt(this,"from",0);kt(this,"to",0);kt(this,"currentTime",0);kt(this,"lerp");kt(this,"duration");kt(this,"easing");kt(this,"onUpdate")}advance(n){var e;if(!this.isRunning)return;let t=!1;if(this.duration&&this.easing){this.currentTime+=n;const i=Iu(0,this.currentTime/this.duration,1);t=i>=1;const s=t?1:this.easing(i);this.value=this.from+(this.to-this.from)*s}else this.lerp?(this.value=kd(this.value,this.to,this.lerp*60,n),Math.round(this.value)===Math.round(this.to)&&(this.value=this.to,t=!0)):(this.value=this.to,t=!0);t&&this.stop(),(e=this.onUpdate)==null||e.call(this,this.value,t)}stop(){this.isRunning=!1}fromTo(n,t,{lerp:e,duration:i,easing:s,onStart:o,onUpdate:r}){this.from=this.value=n,this.to=t,this.lerp=e,this.duration=i,this.easing=s,this.currentTime=0,this.isRunning=!0,o==null||o(),this.onUpdate=r}};function Vd(n,t){let e;return function(...i){clearTimeout(e),e=setTimeout(()=>{e=void 0,n.apply(this,i)},t)}}var Wd=class{constructor(n,t,{autoResize:e=!0,debounce:i=250}={}){kt(this,"width",0);kt(this,"height",0);kt(this,"scrollHeight",0);kt(this,"scrollWidth",0);kt(this,"debouncedResize");kt(this,"wrapperResizeObserver");kt(this,"contentResizeObserver");kt(this,"resize",()=>{this.onWrapperResize(),this.onContentResize()});kt(this,"onWrapperResize",()=>{this.wrapper instanceof Window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)});kt(this,"onContentResize",()=>{this.wrapper instanceof Window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)});this.wrapper=n,this.content=t,e&&(this.debouncedResize=Vd(this.resize,i),this.wrapper instanceof Window?window.addEventListener("resize",this.debouncedResize):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){var n,t;(n=this.wrapperResizeObserver)==null||n.disconnect(),(t=this.contentResizeObserver)==null||t.disconnect(),this.wrapper===window&&this.debouncedResize&&window.removeEventListener("resize",this.debouncedResize)}get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},Du=class{constructor(){kt(this,"events",{})}emit(n,...t){var i;const e=this.events[n]||[];for(let s=0,o=e.length;s<o;s++)(i=e[s])==null||i.call(e,...t)}on(n,t){return this.events[n]?this.events[n].push(t):this.events[n]=[t],()=>{var e;this.events[n]=(e=this.events[n])==null?void 0:e.filter(i=>t!==i)}}off(n,t){var e;this.events[n]=(e=this.events[n])==null?void 0:e.filter(i=>t!==i)}destroy(){this.events={}}};const qd=100/6,Ri={passive:!1};function ic(n,t){return n===1?qd:n===2?t:1}var Xd=class{constructor(n,t={wheelMultiplier:1,touchMultiplier:1}){kt(this,"touchStart",{x:0,y:0});kt(this,"lastDelta",{x:0,y:0});kt(this,"window",{width:0,height:0});kt(this,"emitter",new Du);kt(this,"onTouchStart",n=>{const{clientX:t,clientY:e}=n.targetTouches?n.targetTouches[0]:n;this.touchStart.x=t,this.touchStart.y=e,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:n})});kt(this,"onTouchMove",n=>{const{clientX:t,clientY:e}=n.targetTouches?n.targetTouches[0]:n,i=-(t-this.touchStart.x)*this.options.touchMultiplier,s=-(e-this.touchStart.y)*this.options.touchMultiplier;this.touchStart.x=t,this.touchStart.y=e,this.lastDelta={x:i,y:s},this.emitter.emit("scroll",{deltaX:i,deltaY:s,event:n})});kt(this,"onTouchEnd",n=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:n})});kt(this,"onWheel",n=>{let{deltaX:t,deltaY:e,deltaMode:i}=n;const s=ic(i,this.window.width),o=ic(i,this.window.height);t*=s,e*=o,t*=this.options.wheelMultiplier,e*=this.options.wheelMultiplier,this.emitter.emit("scroll",{deltaX:t,deltaY:e,event:n})});kt(this,"onWindowResize",()=>{this.window={width:window.innerWidth,height:window.innerHeight}});this.element=n,this.options=t,window.addEventListener("resize",this.onWindowResize),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,Ri),this.element.addEventListener("touchstart",this.onTouchStart,Ri),this.element.addEventListener("touchmove",this.onTouchMove,Ri),this.element.addEventListener("touchend",this.onTouchEnd,Ri)}on(n,t){return this.emitter.on(n,t)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize),this.element.removeEventListener("wheel",this.onWheel,Ri),this.element.removeEventListener("touchstart",this.onTouchStart,Ri),this.element.removeEventListener("touchmove",this.onTouchMove,Ri),this.element.removeEventListener("touchend",this.onTouchEnd,Ri)}};const sc=n=>Math.min(1,1.001-2**(-10*n));var Oa=class{constructor({wrapper:n=window,content:t=document.documentElement,eventsTarget:e=n,smoothWheel:i=!0,syncTouch:s=!1,syncTouchLerp:o=.075,touchInertiaExponent:r=1.7,duration:a,easing:l,lerp:c=.1,infinite:u=!1,orientation:d="vertical",gestureOrientation:h=d==="horizontal"?"both":"vertical",touchMultiplier:p=1,wheelMultiplier:m=1,autoResize:v=!0,prevent:g,virtualScroll:f,overscroll:S=!0,autoRaf:w=!1,anchors:E=!1,autoToggle:G=!1,allowNestedScroll:x=!1,__experimental__naiveDimensions:U=!1,naiveDimensions:z=U,stopInertiaOnNavigate:y=!1,respectReducedMotion:M=!0}={}){kt(this,"_isScrolling",!1);kt(this,"_isStopped",!1);kt(this,"_isLocked",!1);kt(this,"_preventNextNativeScrollEvent",!1);kt(this,"_resetVelocityTimeout",null);kt(this,"_rafId",null);kt(this,"_isDraggingSelection",!1);kt(this,"reducedMotionMediaQuery",window.matchMedia("(prefers-reduced-motion: reduce)"));kt(this,"isTouching");kt(this,"isIos");kt(this,"time",0);kt(this,"userData",{});kt(this,"lastVelocity",0);kt(this,"velocity",0);kt(this,"direction",0);kt(this,"options");kt(this,"targetScroll");kt(this,"animatedScroll");kt(this,"animate",new Hd);kt(this,"emitter",new Du);kt(this,"dimensions");kt(this,"virtualScroll");kt(this,"onScrollEnd",n=>{n instanceof CustomEvent||(this.isScrolling==="smooth"||this.isScrolling===!1)&&n.stopPropagation()});kt(this,"dispatchScrollendEvent",()=>{this.options.wrapper.dispatchEvent(new CustomEvent("scrollend",{bubbles:this.options.wrapper===window,detail:{lenisScrollEnd:!0}}))});kt(this,"onTransitionEnd",n=>{var t;(t=n.propertyName)!=null&&t.includes("overflow")&&n.target===this.rootElement&&this.checkOverflow()});kt(this,"onClick",n=>{const t=n.composedPath().filter(i=>i instanceof HTMLAnchorElement&&i.href).map(i=>new URL(i.href)),e=new URL(window.location.href);if(this.options.anchors){const i=t.find(s=>e.host===s.host&&e.pathname===s.pathname&&s.hash);if(i){const s=typeof this.options.anchors=="object"&&this.options.anchors?this.options.anchors:void 0,o=decodeURIComponent(i.hash);this.scrollTo(o,s);return}}if(this.options.stopInertiaOnNavigate&&t.some(i=>e.host===i.host&&e.pathname!==i.pathname)){this.reset();return}});kt(this,"onPointerDown",n=>{n.button===1&&this.reset()});kt(this,"onVirtualScroll",n=>{if(typeof this.options.virtualScroll=="function"&&this.options.virtualScroll(n)===!1)return;const{deltaX:t,deltaY:e,event:i}=n;if(this.emitter.emit("virtual-scroll",{deltaX:t,deltaY:e,event:i}),i.ctrlKey||i.lenisStopPropagation)return;const s=i.type.includes("touch"),o=i.type.includes("wheel");if(s&&this.isIos&&(i.type==="touchstart"&&(this._isDraggingSelection=this.isTouchOnSelectionHandle(i)),this._isDraggingSelection)){i.type==="touchend"&&(this._isDraggingSelection=!1);return}this.isTouching=i.type==="touchstart"||i.type==="touchmove";const r=t===0&&e===0;if(this.options.syncTouch&&s&&i.type==="touchstart"&&r&&!this.isStopped&&!this.isLocked){this.reset();return}const a=this.options.gestureOrientation==="vertical"&&e===0||this.options.gestureOrientation==="horizontal"&&t===0;if(r||a)return;let l=i.composedPath();l=l.slice(0,l.indexOf(this.rootElement));const c=this.options.prevent,u=Math.abs(t)>=Math.abs(e)?"horizontal":"vertical";if(l.find(m=>{var v,g,f,S,w;return m instanceof HTMLElement&&(typeof c=="function"&&(c==null?void 0:c(m))||((v=m.hasAttribute)==null?void 0:v.call(m,"data-lenis-prevent"))||u==="vertical"&&((g=m.hasAttribute)==null?void 0:g.call(m,"data-lenis-prevent-vertical"))||u==="horizontal"&&((f=m.hasAttribute)==null?void 0:f.call(m,"data-lenis-prevent-horizontal"))||s&&((S=m.hasAttribute)==null?void 0:S.call(m,"data-lenis-prevent-touch"))||o&&((w=m.hasAttribute)==null?void 0:w.call(m,"data-lenis-prevent-wheel"))||this.options.allowNestedScroll&&this.hasNestedScroll(m,{deltaX:t,deltaY:e}))}))return;if(this.isStopped||this.isLocked){i.cancelable&&i.preventDefault();return}if(!(this.options.syncTouch&&s||this.options.smoothWheel&&o)){this.isScrolling="native",this.animate.stop(),i.lenisStopPropagation=!0;return}let d=e;this.options.gestureOrientation==="both"?d=Math.abs(e)>Math.abs(t)?e:t:this.options.gestureOrientation==="horizontal"&&(d=t),(!this.options.overscroll||this.options.infinite||this.options.wrapper!==window&&this.limit>0&&(this.animatedScroll>0&&this.animatedScroll<this.limit||this.animatedScroll===0&&e>0||this.animatedScroll===this.limit&&e<0))&&(i.lenisStopPropagation=!0),i.cancelable&&i.preventDefault();const h=s&&this.options.syncTouch,p=s&&i.type==="touchend";p&&(d=Math.sign(d)*Math.abs(this.velocity)**this.options.touchInertiaExponent),this.scrollTo(this.targetScroll+d,{programmatic:!1,...h?{lerp:p?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}})});kt(this,"onNativeScroll",()=>{if(this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this._preventNextNativeScrollEvent){this._preventNextNativeScrollEvent=!1;return}if(this.isScrolling===!1||this.isScrolling==="native"){const n=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-n,this.direction=Math.sign(this.animatedScroll-n),this.isStopped||(this.isScrolling="native"),this.emit(),this.velocity!==0&&(this._resetVelocityTimeout=setTimeout(()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()},400))}});kt(this,"raf",n=>{const t=n-(this.time||n);this.time=n,this.animate.advance(t*.001),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))});window.lenisVersion=nc,window.lenis||(window.lenis={}),window.lenis.version=nc,d==="horizontal"&&(window.lenis.horizontal=!0),s===!0&&(window.lenis.touch=!0),this.isIos=/(iPad|iPhone|iPod)/g.test(navigator.userAgent),(!n||n===document.documentElement)&&(n=window),typeof a=="number"&&typeof l!="function"?l=sc:typeof l=="function"&&typeof a!="number"&&(a=1),this.options={wrapper:n,content:t,eventsTarget:e,smoothWheel:i,syncTouch:s,syncTouchLerp:o,touchInertiaExponent:r,duration:a,easing:l,lerp:c,infinite:u,gestureOrientation:h,orientation:d,touchMultiplier:p,wheelMultiplier:m,autoResize:v,prevent:g,virtualScroll:f,overscroll:S,autoRaf:w,anchors:E,autoToggle:G,allowNestedScroll:x,naiveDimensions:z,stopInertiaOnNavigate:y,respectReducedMotion:M},this.dimensions=new Wd(n,t,{autoResize:v}),this.updateClassName(),this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll),this.options.wrapper.addEventListener("scrollend",this.onScrollEnd,{capture:!0}),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.addEventListener("click",this.onClick),this.options.wrapper.addEventListener("pointerdown",this.onPointerDown),this.virtualScroll=new Xd(e,{touchMultiplier:p,wheelMultiplier:m}),this.virtualScroll.on("scroll",this.onVirtualScroll),this.options.autoToggle&&(this.checkOverflow(),this.rootElement.addEventListener("transitionend",this.onTransitionEnd)),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll),this.options.wrapper.removeEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.wrapper.removeEventListener("pointerdown",this.onPointerDown),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.removeEventListener("click",this.onClick),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName(),this._rafId&&cancelAnimationFrame(this._rafId)}on(n,t){return this.emitter.on(n,t)}off(n,t){return this.emitter.off(n,t)}get overflow(){const n=this.isHorizontal?"overflow-x":"overflow-y";return getComputedStyle(this.rootElement)[n]}checkOverflow(){["hidden","clip"].includes(this.overflow)?this.internalStop():this.internalStart()}setScroll(n){this.isHorizontal?this.options.wrapper.scrollTo({left:n,behavior:"instant"}):this.options.wrapper.scrollTo({top:n,behavior:"instant"})}isTouchOnSelectionHandle(n){const t=window.getSelection();if(!t||t.isCollapsed||t.rangeCount===0)return!1;const e=n.targetTouches[0]??n.changedTouches[0];if(!e)return!1;const i=t.getRangeAt(0).getClientRects();if(i.length===0)return!1;const s=i[0],o=i[i.length-1],r=40,a=Math.hypot(e.clientX-s.left,e.clientY-s.top)<=r,l=Math.hypot(e.clientX-o.right,e.clientY-o.bottom)<=r;return a||l}resize(){this.dimensions.resize(),this.animatedScroll=this.targetScroll=this.actualScroll,this.emit()}emit(){this.emitter.emit("scroll",this)}reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){if(this.isStopped){if(this.options.autoToggle){this.rootElement.style.removeProperty("overflow");return}this.internalStart()}}internalStart(){this.isStopped&&(this.reset(),this.isStopped=!1,this.emit())}stop(){if(!this.isStopped){if(this.options.autoToggle){this.rootElement.style.setProperty("overflow","clip");return}this.internalStop()}}internalStop(){this.isStopped||(this.reset(),this.isStopped=!0,this.emit())}scrollTo(n,{offset:t=0,immediate:e=!1,lock:i=!1,programmatic:s=!0,lerp:o=s?this.options.lerp:void 0,duration:r=s?this.options.duration:void 0,easing:a=s?this.options.easing:void 0,onStart:l,onComplete:c,force:u=!1,userData:d}={}){if(this.prefersReducedMotion&&(s?e=!0:(o=1,r=void 0,a=void 0)),(this.isStopped||this.isLocked)&&!u)return;let h=n,p=t;if(typeof h=="string"&&["top","left","start","#"].includes(h))h=0;else if(typeof h=="string"&&["bottom","right","end"].includes(h))h=this.limit;else{let m=null;if(typeof h=="string"?(m=h.startsWith("#")?document.getElementById(h.slice(1)):document.querySelector(h),m||(h==="#top"?h=0:console.warn("Lenis: Target not found",h))):h instanceof HTMLElement&&(h!=null&&h.nodeType)&&(m=h),m){if(this.options.wrapper!==window){const E=this.rootElement.getBoundingClientRect();p-=this.isHorizontal?E.left:E.top}const v=m.getBoundingClientRect(),g=getComputedStyle(m),f=this.isHorizontal?Number.parseFloat(g.scrollMarginLeft):Number.parseFloat(g.scrollMarginTop),S=getComputedStyle(this.rootElement),w=this.isHorizontal?Number.parseFloat(S.scrollPaddingLeft):Number.parseFloat(S.scrollPaddingTop);h=(this.isHorizontal?v.left:v.top)+this.animatedScroll-(Number.isNaN(f)?0:f)-(Number.isNaN(w)?0:w)}}if(typeof h=="number"){if(h+=p,this.options.infinite){if(s){this.targetScroll=this.animatedScroll=this.scroll;const m=h-this.animatedScroll;m>this.limit/2?h-=this.limit:m<-this.limit/2&&(h+=this.limit)}}else h=Iu(0,h,this.limit);if(h===this.targetScroll){l==null||l(this),c==null||c(this);return}if(this.userData=d??{},e){this.animatedScroll=this.targetScroll=h,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),c==null||c(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()});return}s||(this.targetScroll=h),typeof r=="number"&&typeof a!="function"?a=sc:typeof a=="function"&&typeof r!="number"&&(r=1),this.animate.fromTo(this.animatedScroll,h,{duration:r,easing:a,lerp:o,onStart:()=>{i&&(this.isLocked=!0),this.isScrolling="smooth",l==null||l(this)},onUpdate:(m,v)=>{this.isScrolling="smooth",this.lastVelocity=this.velocity,this.velocity=m-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=m,this.setScroll(this.scroll),s&&(this.targetScroll=m),v||this.emit(),v&&(this.reset(),this.emit(),c==null||c(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()}),this.preventNextNativeScrollEvent())}})}}preventNextNativeScrollEvent(){this._preventNextNativeScrollEvent=!0,requestAnimationFrame(()=>{this._preventNextNativeScrollEvent=!1})}hasNestedScroll(n,{deltaX:t,deltaY:e}){const i=Date.now();n._lenis||(n._lenis={});const s=n._lenis;let o,r,a,l,c,u,d,h,p,m;if(i-(s.time??0)>2e3){s.time=Date.now();const x=window.getComputedStyle(n);if(s.computedStyle=x,o=["auto","overlay","scroll"].includes(x.overflowX),r=["auto","overlay","scroll"].includes(x.overflowY),c=["auto"].includes(x.overscrollBehaviorX),u=["auto"].includes(x.overscrollBehaviorY),s.hasOverflowX=o,s.hasOverflowY=r,!(o||r))return!1;d=n.scrollWidth,h=n.scrollHeight,p=n.clientWidth,m=n.clientHeight,a=d>p,l=h>m,s.isScrollableX=a,s.isScrollableY=l,s.scrollWidth=d,s.scrollHeight=h,s.clientWidth=p,s.clientHeight=m,s.hasOverscrollBehaviorX=c,s.hasOverscrollBehaviorY=u}else a=s.isScrollableX,l=s.isScrollableY,o=s.hasOverflowX,r=s.hasOverflowY,d=s.scrollWidth,h=s.scrollHeight,p=s.clientWidth,m=s.clientHeight,c=s.hasOverscrollBehaviorX,u=s.hasOverscrollBehaviorY;if(!(o&&a||r&&l))return!1;const v=Math.abs(t)>=Math.abs(e)?"horizontal":"vertical";let g,f,S,w,E,G;if(v==="horizontal")g=Math.round(n.scrollLeft),f=d-p,S=t,w=o,E=a,G=c;else if(v==="vertical")g=Math.round(n.scrollTop),f=h-m,S=e,w=r,E=l,G=u;else return!1;return!G&&(g>=f||g<=0)?!0:(S>0?g<f:g>0)&&w&&E}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return this.options.orientation==="horizontal"}get actualScroll(){const n=this.options.wrapper;return this.isHorizontal?n.scrollX??n.scrollLeft:n.scrollY??n.scrollTop}get scroll(){return this.options.infinite?Gd(this.animatedScroll,this.limit):this.animatedScroll}get progress(){return this.limit===0?1:this.scroll/this.limit}get isScrolling(){return this._isScrolling}set isScrolling(n){this._isScrolling!==n&&(this._isScrolling=n,this.updateClassName())}get isStopped(){return this._isStopped}set isStopped(n){this._isStopped!==n&&(this._isStopped=n,this.updateClassName())}get isLocked(){return this._isLocked}set isLocked(n){this._isLocked!==n&&(this._isLocked=n,this.updateClassName())}get isSmooth(){return this.isScrolling==="smooth"}get prefersReducedMotion(){return this.options.respectReducedMotion&&this.reducedMotionMediaQuery.matches}get className(){let n="lenis";return this.options.autoToggle&&(n+=" lenis-autoToggle"),this.isStopped&&(n+=" lenis-stopped"),this.isLocked&&(n+=" lenis-locked"),this.isScrolling&&(n+=" lenis-scrolling"),this.isScrolling==="smooth"&&(n+=" lenis-smooth"),n}updateClassName(){this.cleanUpClassName(),this.className.split(" ").forEach(n=>{this.rootElement.classList.add(n)})}cleanUpClassName(){for(const n of Array.from(this.rootElement.classList))(n==="lenis"||n.startsWith("lenis-"))&&this.rootElement.classList.remove(n)}};/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Cl="170",Yd=0,oc=1,$d=2,Rl=1,Pl=2,mi=3,Gi=0,pn=1,Ge=2,yi=0,ls=1,Xe=2,rc=3,ac=4,Zd=5,ss=100,jd=101,Kd=102,Jd=103,Qd=104,th=200,eh=201,nh=202,ih=203,Ba=204,ka=205,sh=206,oh=207,rh=208,ah=209,lh=210,ch=211,uh=212,dh=213,hh=214,Ga=0,Ha=1,Va=2,Ws=3,Wa=4,qa=5,Xa=6,Ya=7,Ll=0,fh=1,ph=2,ki=0,Uu=1,Nu=2,zu=3,Io=4,mh=5,Fu=6,Ou=7,Bu=300,qs=301,Xs=302,$a=303,Za=304,zr=306,Hi=1e3,rs=1001,ja=1002,$n=1003,gh=1004,Ho=1005,oi=1006,Yr=1007,as=1008,bi=1009,ku=1010,Gu=1011,Co=1012,Il=1013,us=1014,_i=1015,xi=1016,Dl=1017,Ul=1018,Ys=1020,Hu=35902,Vu=1021,Wu=1022,Xn=1023,qu=1024,Xu=1025,ks=1026,$s=1027,Yu=1028,Nl=1029,$u=1030,zl=1031,Fl=1033,_r=33776,Mr=33777,yr=33778,xr=33779,Ka=35840,Ja=35841,Qa=35842,tl=35843,el=36196,nl=37492,il=37496,sl=37808,ol=37809,rl=37810,al=37811,ll=37812,cl=37813,ul=37814,dl=37815,hl=37816,fl=37817,pl=37818,ml=37819,gl=37820,vl=37821,Sr=36492,_l=36494,Ml=36495,Zu=36283,yl=36284,xl=36285,Sl=36286,vh=3200,_h=3201,Ol=0,Mh=1,Fi="",xe="srgb",Qs="srgb-linear",Fr="linear",be="srgb",vs=7680,lc=519,yh=512,xh=513,Sh=514,ju=515,wh=516,bh=517,Eh=518,Th=519,wl=35044,cc="300 es",Mi=2e3,Tr=2001;class to{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const o=s.indexOf(e);o!==-1&&s.splice(o,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const i=this._listeners[t.type];if(i!==void 0){t.target=this;const s=i.slice(0);for(let o=0,r=s.length;o<r;o++)s[o].call(this,t);t.target=null}}}const dn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let uc=1234567;const wo=Math.PI/180,Ro=180/Math.PI;function Si(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(dn[n&255]+dn[n>>8&255]+dn[n>>16&255]+dn[n>>24&255]+"-"+dn[t&255]+dn[t>>8&255]+"-"+dn[t>>16&15|64]+dn[t>>24&255]+"-"+dn[e&63|128]+dn[e>>8&255]+"-"+dn[e>>16&255]+dn[e>>24&255]+dn[i&255]+dn[i>>8&255]+dn[i>>16&255]+dn[i>>24&255]).toLowerCase()}function an(n,t,e){return Math.max(t,Math.min(e,n))}function Bl(n,t){return(n%t+t)%t}function Ah(n,t,e,i,s){return i+(n-t)*(s-i)/(e-t)}function Ch(n,t,e){return n!==t?(e-n)/(t-n):0}function bo(n,t,e){return(1-e)*n+e*t}function Rh(n,t,e,i){return bo(n,t,1-Math.exp(-e*i))}function Ph(n,t=1){return t-Math.abs(Bl(n,t*2)-t)}function Lh(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function Ih(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function Dh(n,t){return n+Math.floor(Math.random()*(t-n+1))}function Uh(n,t){return n+Math.random()*(t-n)}function Nh(n){return n*(.5-Math.random())}function zh(n){n!==void 0&&(uc=n);let t=uc+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Fh(n){return n*wo}function Oh(n){return n*Ro}function Bh(n){return(n&n-1)===0&&n!==0}function kh(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Gh(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Hh(n,t,e,i,s){const o=Math.cos,r=Math.sin,a=o(e/2),l=r(e/2),c=o((t+i)/2),u=r((t+i)/2),d=o((t-i)/2),h=r((t-i)/2),p=o((i-t)/2),m=r((i-t)/2);switch(s){case"XYX":n.set(a*u,l*d,l*h,a*c);break;case"YZY":n.set(l*h,a*u,l*d,a*c);break;case"ZXZ":n.set(l*d,l*h,a*u,a*c);break;case"XZX":n.set(a*u,l*m,l*p,a*c);break;case"YXY":n.set(l*p,a*u,l*m,a*c);break;case"ZYZ":n.set(l*m,l*p,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function qn(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Ee(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const en={DEG2RAD:wo,RAD2DEG:Ro,generateUUID:Si,clamp:an,euclideanModulo:Bl,mapLinear:Ah,inverseLerp:Ch,lerp:bo,damp:Rh,pingpong:Ph,smoothstep:Lh,smootherstep:Ih,randInt:Dh,randFloat:Uh,randFloatSpread:Nh,seededRandom:zh,degToRad:Fh,radToDeg:Oh,isPowerOfTwo:Bh,ceilPowerOfTwo:kh,floorPowerOfTwo:Gh,setQuaternionFromProperEuler:Hh,normalize:Ee,denormalize:qn};class Et{constructor(t=0,e=0){Et.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(an(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),s=Math.sin(e),o=this.x-t.x,r=this.y-t.y;return this.x=o*i-r*s+t.x,this.y=o*s+r*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ee{constructor(t,e,i,s,o,r,a,l,c){ee.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,o,r,a,l,c)}set(t,e,i,s,o,r,a,l,c){const u=this.elements;return u[0]=t,u[1]=s,u[2]=a,u[3]=e,u[4]=o,u[5]=l,u[6]=i,u[7]=r,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,o=this.elements,r=i[0],a=i[3],l=i[6],c=i[1],u=i[4],d=i[7],h=i[2],p=i[5],m=i[8],v=s[0],g=s[3],f=s[6],S=s[1],w=s[4],E=s[7],G=s[2],x=s[5],U=s[8];return o[0]=r*v+a*S+l*G,o[3]=r*g+a*w+l*x,o[6]=r*f+a*E+l*U,o[1]=c*v+u*S+d*G,o[4]=c*g+u*w+d*x,o[7]=c*f+u*E+d*U,o[2]=h*v+p*S+m*G,o[5]=h*g+p*w+m*x,o[8]=h*f+p*E+m*U,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],s=t[2],o=t[3],r=t[4],a=t[5],l=t[6],c=t[7],u=t[8];return e*r*u-e*a*c-i*o*u+i*a*l+s*o*c-s*r*l}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],o=t[3],r=t[4],a=t[5],l=t[6],c=t[7],u=t[8],d=u*r-a*c,h=a*l-u*o,p=c*o-r*l,m=e*d+i*h+s*p;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/m;return t[0]=d*v,t[1]=(s*c-u*i)*v,t[2]=(a*i-s*r)*v,t[3]=h*v,t[4]=(u*e-s*l)*v,t[5]=(s*o-a*e)*v,t[6]=p*v,t[7]=(i*l-c*e)*v,t[8]=(r*e-i*o)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,o,r,a){const l=Math.cos(o),c=Math.sin(o);return this.set(i*l,i*c,-i*(l*r+c*a)+r+t,-s*c,s*l,-s*(-c*r+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply($r.makeScale(t,e)),this}rotate(t){return this.premultiply($r.makeRotation(-t)),this}translate(t,e){return this.premultiply($r.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const $r=new ee;function Ku(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function Ar(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Vh(){const n=Ar("canvas");return n.style.display="block",n}const dc={};function Mo(n){n in dc||(dc[n]=!0,console.warn(n))}function Wh(n,t,e){return new Promise(function(i,s){function o(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(o,e);break;default:i()}}setTimeout(o,e)})}function qh(n){const t=n.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Xh(n){const t=n.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const pe={enabled:!0,workingColorSpace:Qs,spaces:{},convert:function(n,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===be&&(n.r=wi(n.r),n.g=wi(n.g),n.b=wi(n.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(n.applyMatrix3(this.spaces[t].toXYZ),n.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===be&&(n.r=Gs(n.r),n.g=Gs(n.g),n.b=Gs(n.b))),n},fromWorkingColorSpace:function(n,t){return this.convert(n,this.workingColorSpace,t)},toWorkingColorSpace:function(n,t){return this.convert(n,t,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===Fi?Fr:this.spaces[n].transfer},getLuminanceCoefficients:function(n,t=this.workingColorSpace){return n.fromArray(this.spaces[t].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,t,e){return n.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace}};function wi(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Gs(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}const hc=[.64,.33,.3,.6,.15,.06],fc=[.2126,.7152,.0722],pc=[.3127,.329],mc=new ee().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),gc=new ee().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);pe.define({[Qs]:{primaries:hc,whitePoint:pc,transfer:Fr,toXYZ:mc,fromXYZ:gc,luminanceCoefficients:fc,workingColorSpaceConfig:{unpackColorSpace:xe},outputColorSpaceConfig:{drawingBufferColorSpace:xe}},[xe]:{primaries:hc,whitePoint:pc,transfer:be,toXYZ:mc,fromXYZ:gc,luminanceCoefficients:fc,outputColorSpaceConfig:{drawingBufferColorSpace:xe}}});let _s;class Yh{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{_s===void 0&&(_s=Ar("canvas")),_s.width=t.width,_s.height=t.height;const i=_s.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=_s}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Ar("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const s=i.getImageData(0,0,t.width,t.height),o=s.data;for(let r=0;r<o.length;r++)o[r]=wi(o[r]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(wi(e[i]/255)*255):e[i]=wi(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let $h=0;class Ju{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:$h++}),this.uuid=Si(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let o;if(Array.isArray(s)){o=[];for(let r=0,a=s.length;r<a;r++)s[r].isDataTexture?o.push(Zr(s[r].image)):o.push(Zr(s[r]))}else o=Zr(s);i.url=o}return e||(t.images[this.uuid]=i),i}}function Zr(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Yh.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Zh=0;class yn extends to{constructor(t=yn.DEFAULT_IMAGE,e=yn.DEFAULT_MAPPING,i=rs,s=rs,o=oi,r=as,a=Xn,l=bi,c=yn.DEFAULT_ANISOTROPY,u=Fi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Zh++}),this.uuid=Si(),this.name="",this.source=new Ju(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=o,this.minFilter=r,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Et(0,0),this.repeat=new Et(1,1),this.center=new Et(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ee,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Bu)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Hi:t.x=t.x-Math.floor(t.x);break;case rs:t.x=t.x<0?0:1;break;case ja:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Hi:t.y=t.y-Math.floor(t.y);break;case rs:t.y=t.y<0?0:1;break;case ja:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}yn.DEFAULT_IMAGE=null;yn.DEFAULT_MAPPING=Bu;yn.DEFAULT_ANISOTROPY=1;class Ae{constructor(t=0,e=0,i=0,s=1){Ae.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,o=this.w,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s+r[12]*o,this.y=r[1]*e+r[5]*i+r[9]*s+r[13]*o,this.z=r[2]*e+r[6]*i+r[10]*s+r[14]*o,this.w=r[3]*e+r[7]*i+r[11]*s+r[15]*o,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,o;const l=t.elements,c=l[0],u=l[4],d=l[8],h=l[1],p=l[5],m=l[9],v=l[2],g=l[6],f=l[10];if(Math.abs(u-h)<.01&&Math.abs(d-v)<.01&&Math.abs(m-g)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+v)<.1&&Math.abs(m+g)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const w=(c+1)/2,E=(p+1)/2,G=(f+1)/2,x=(u+h)/4,U=(d+v)/4,z=(m+g)/4;return w>E&&w>G?w<.01?(i=0,s=.707106781,o=.707106781):(i=Math.sqrt(w),s=x/i,o=U/i):E>G?E<.01?(i=.707106781,s=0,o=.707106781):(s=Math.sqrt(E),i=x/s,o=z/s):G<.01?(i=.707106781,s=.707106781,o=0):(o=Math.sqrt(G),i=U/o,s=z/o),this.set(i,s,o,e),this}let S=Math.sqrt((g-m)*(g-m)+(d-v)*(d-v)+(h-u)*(h-u));return Math.abs(S)<.001&&(S=1),this.x=(g-m)/S,this.y=(d-v)/S,this.z=(h-u)/S,this.w=Math.acos((c+p+f-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class jh extends to{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Ae(0,0,t,e),this.scissorTest=!1,this.viewport=new Ae(0,0,t,e);const s={width:t,height:e,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:oi,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const o=new yn(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);o.flipY=!1,o.generateMipmaps=i.generateMipmaps,o.internalFormat=i.internalFormat,this.textures=[];const r=i.count;for(let a=0;a<r;a++)this.textures[a]=o.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,o=this.textures.length;s<o;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,s=t.textures.length;i<s;i++)this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Ju(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Zn extends jh{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class Qu extends yn{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=$n,this.minFilter=$n,this.wrapR=rs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Kh extends yn{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=$n,this.minFilter=$n,this.wrapR=rs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Do{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,o,r,a){let l=i[s+0],c=i[s+1],u=i[s+2],d=i[s+3];const h=o[r+0],p=o[r+1],m=o[r+2],v=o[r+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=u,t[e+3]=d;return}if(a===1){t[e+0]=h,t[e+1]=p,t[e+2]=m,t[e+3]=v;return}if(d!==v||l!==h||c!==p||u!==m){let g=1-a;const f=l*h+c*p+u*m+d*v,S=f>=0?1:-1,w=1-f*f;if(w>Number.EPSILON){const G=Math.sqrt(w),x=Math.atan2(G,f*S);g=Math.sin(g*x)/G,a=Math.sin(a*x)/G}const E=a*S;if(l=l*g+h*E,c=c*g+p*E,u=u*g+m*E,d=d*g+v*E,g===1-a){const G=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=G,c*=G,u*=G,d*=G}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=d}static multiplyQuaternionsFlat(t,e,i,s,o,r){const a=i[s],l=i[s+1],c=i[s+2],u=i[s+3],d=o[r],h=o[r+1],p=o[r+2],m=o[r+3];return t[e]=a*m+u*d+l*p-c*h,t[e+1]=l*m+u*h+c*d-a*p,t[e+2]=c*m+u*p+a*h-l*d,t[e+3]=u*m-a*d-l*h-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,s=t._y,o=t._z,r=t._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(s/2),d=a(o/2),h=l(i/2),p=l(s/2),m=l(o/2);switch(r){case"XYZ":this._x=h*u*d+c*p*m,this._y=c*p*d-h*u*m,this._z=c*u*m+h*p*d,this._w=c*u*d-h*p*m;break;case"YXZ":this._x=h*u*d+c*p*m,this._y=c*p*d-h*u*m,this._z=c*u*m-h*p*d,this._w=c*u*d+h*p*m;break;case"ZXY":this._x=h*u*d-c*p*m,this._y=c*p*d+h*u*m,this._z=c*u*m+h*p*d,this._w=c*u*d-h*p*m;break;case"ZYX":this._x=h*u*d-c*p*m,this._y=c*p*d+h*u*m,this._z=c*u*m-h*p*d,this._w=c*u*d+h*p*m;break;case"YZX":this._x=h*u*d+c*p*m,this._y=c*p*d+h*u*m,this._z=c*u*m-h*p*d,this._w=c*u*d-h*p*m;break;case"XZY":this._x=h*u*d-c*p*m,this._y=c*p*d-h*u*m,this._z=c*u*m+h*p*d,this._w=c*u*d+h*p*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+r)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],s=e[4],o=e[8],r=e[1],a=e[5],l=e[9],c=e[2],u=e[6],d=e[10],h=i+a+d;if(h>0){const p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(u-l)*p,this._y=(o-c)*p,this._z=(r-s)*p}else if(i>a&&i>d){const p=2*Math.sqrt(1+i-a-d);this._w=(u-l)/p,this._x=.25*p,this._y=(s+r)/p,this._z=(o+c)/p}else if(a>d){const p=2*Math.sqrt(1+a-i-d);this._w=(o-c)/p,this._x=(s+r)/p,this._y=.25*p,this._z=(l+u)/p}else{const p=2*Math.sqrt(1+d-i-a);this._w=(r-s)/p,this._x=(o+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(an(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,s=t._y,o=t._z,r=t._w,a=e._x,l=e._y,c=e._z,u=e._w;return this._x=i*u+r*a+s*c-o*l,this._y=s*u+r*l+o*a-i*c,this._z=o*u+r*c+i*l-s*a,this._w=r*u-i*a-s*l-o*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,s=this._y,o=this._z,r=this._w;let a=r*t._w+i*t._x+s*t._y+o*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=r,this._x=i,this._y=s,this._z=o,this;const l=1-a*a;if(l<=Number.EPSILON){const p=1-e;return this._w=p*r+e*this._w,this._x=p*i+e*this._x,this._y=p*s+e*this._y,this._z=p*o+e*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),d=Math.sin((1-e)*u)/c,h=Math.sin(e*u)/c;return this._w=r*d+this._w*h,this._x=i*d+this._x*h,this._y=s*d+this._y*h,this._z=o*d+this._z*h,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),o=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),o*Math.sin(e),o*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class b{constructor(t=0,e=0,i=0){b.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(vc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(vc.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,s=this.z,o=t.elements;return this.x=o[0]*e+o[3]*i+o[6]*s,this.y=o[1]*e+o[4]*i+o[7]*s,this.z=o[2]*e+o[5]*i+o[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,o=t.elements,r=1/(o[3]*e+o[7]*i+o[11]*s+o[15]);return this.x=(o[0]*e+o[4]*i+o[8]*s+o[12])*r,this.y=(o[1]*e+o[5]*i+o[9]*s+o[13])*r,this.z=(o[2]*e+o[6]*i+o[10]*s+o[14])*r,this}applyQuaternion(t){const e=this.x,i=this.y,s=this.z,o=t.x,r=t.y,a=t.z,l=t.w,c=2*(r*s-a*i),u=2*(a*e-o*s),d=2*(o*i-r*e);return this.x=e+l*c+r*d-a*u,this.y=i+l*u+a*c-o*d,this.z=s+l*d+o*u-r*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,s=this.z,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*s,this.y=o[1]*e+o[5]*i+o[9]*s,this.z=o[2]*e+o[6]*i+o[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,s=t.y,o=t.z,r=e.x,a=e.y,l=e.z;return this.x=s*l-o*a,this.y=o*r-i*l,this.z=i*a-s*r,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return jr.copy(this).projectOnVector(t),this.sub(jr)}reflect(t){return this.sub(jr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(an(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const jr=new b,vc=new Do;class Uo{constructor(t=new b(1/0,1/0,1/0),e=new b(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(Hn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(Hn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=Hn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const o=i.getAttribute("position");if(e===!0&&o!==void 0&&t.isInstancedMesh!==!0)for(let r=0,a=o.count;r<a;r++)t.isMesh===!0?t.getVertexPosition(r,Hn):Hn.fromBufferAttribute(o,r),Hn.applyMatrix4(t.matrixWorld),this.expandByPoint(Hn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Vo.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Vo.copy(i.boundingBox)),Vo.applyMatrix4(t.matrixWorld),this.union(Vo)}const s=t.children;for(let o=0,r=s.length;o<r;o++)this.expandByObject(s[o],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Hn),Hn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ao),Wo.subVectors(this.max,ao),Ms.subVectors(t.a,ao),ys.subVectors(t.b,ao),xs.subVectors(t.c,ao),Pi.subVectors(ys,Ms),Li.subVectors(xs,ys),qi.subVectors(Ms,xs);let e=[0,-Pi.z,Pi.y,0,-Li.z,Li.y,0,-qi.z,qi.y,Pi.z,0,-Pi.x,Li.z,0,-Li.x,qi.z,0,-qi.x,-Pi.y,Pi.x,0,-Li.y,Li.x,0,-qi.y,qi.x,0];return!Kr(e,Ms,ys,xs,Wo)||(e=[1,0,0,0,1,0,0,0,1],!Kr(e,Ms,ys,xs,Wo))?!1:(qo.crossVectors(Pi,Li),e=[qo.x,qo.y,qo.z],Kr(e,Ms,ys,xs,Wo))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Hn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Hn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(ui[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),ui[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),ui[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),ui[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),ui[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),ui[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),ui[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),ui[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(ui),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const ui=[new b,new b,new b,new b,new b,new b,new b,new b],Hn=new b,Vo=new Uo,Ms=new b,ys=new b,xs=new b,Pi=new b,Li=new b,qi=new b,ao=new b,Wo=new b,qo=new b,Xi=new b;function Kr(n,t,e,i,s){for(let o=0,r=n.length-3;o<=r;o+=3){Xi.fromArray(n,o);const a=s.x*Math.abs(Xi.x)+s.y*Math.abs(Xi.y)+s.z*Math.abs(Xi.z),l=t.dot(Xi),c=e.dot(Xi),u=i.dot(Xi);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const Jh=new Uo,lo=new b,Jr=new b;class No{constructor(t=new b,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):Jh.setFromPoints(t).getCenter(i);let s=0;for(let o=0,r=t.length;o<r;o++)s=Math.max(s,i.distanceToSquared(t[o]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;lo.subVectors(t,this.center);const e=lo.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(lo,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Jr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(lo.copy(t.center).add(Jr)),this.expandByPoint(lo.copy(t.center).sub(Jr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const di=new b,Qr=new b,Xo=new b,Ii=new b,ta=new b,Yo=new b,ea=new b;class Or{constructor(t=new b,e=new b(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,di)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=di.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(di.copy(this.origin).addScaledVector(this.direction,e),di.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){Qr.copy(t).add(e).multiplyScalar(.5),Xo.copy(e).sub(t).normalize(),Ii.copy(this.origin).sub(Qr);const o=t.distanceTo(e)*.5,r=-this.direction.dot(Xo),a=Ii.dot(this.direction),l=-Ii.dot(Xo),c=Ii.lengthSq(),u=Math.abs(1-r*r);let d,h,p,m;if(u>0)if(d=r*l-a,h=r*a-l,m=o*u,d>=0)if(h>=-m)if(h<=m){const v=1/u;d*=v,h*=v,p=d*(d+r*h+2*a)+h*(r*d+h+2*l)+c}else h=o,d=Math.max(0,-(r*h+a)),p=-d*d+h*(h+2*l)+c;else h=-o,d=Math.max(0,-(r*h+a)),p=-d*d+h*(h+2*l)+c;else h<=-m?(d=Math.max(0,-(-r*o+a)),h=d>0?-o:Math.min(Math.max(-o,-l),o),p=-d*d+h*(h+2*l)+c):h<=m?(d=0,h=Math.min(Math.max(-o,-l),o),p=h*(h+2*l)+c):(d=Math.max(0,-(r*o+a)),h=d>0?o:Math.min(Math.max(-o,-l),o),p=-d*d+h*(h+2*l)+c);else h=r>0?-o:o,d=Math.max(0,-(r*h+a)),p=-d*d+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(Qr).addScaledVector(Xo,h),p}intersectSphere(t,e){di.subVectors(t.center,this.origin);const i=di.dot(this.direction),s=di.dot(di)-i*i,o=t.radius*t.radius;if(s>o)return null;const r=Math.sqrt(o-s),a=i-r,l=i+r;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,o,r,a,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return c>=0?(i=(t.min.x-h.x)*c,s=(t.max.x-h.x)*c):(i=(t.max.x-h.x)*c,s=(t.min.x-h.x)*c),u>=0?(o=(t.min.y-h.y)*u,r=(t.max.y-h.y)*u):(o=(t.max.y-h.y)*u,r=(t.min.y-h.y)*u),i>r||o>s||((o>i||isNaN(i))&&(i=o),(r<s||isNaN(s))&&(s=r),d>=0?(a=(t.min.z-h.z)*d,l=(t.max.z-h.z)*d):(a=(t.max.z-h.z)*d,l=(t.min.z-h.z)*d),i>l||a>s)||((a>i||i!==i)&&(i=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,di)!==null}intersectTriangle(t,e,i,s,o){ta.subVectors(e,t),Yo.subVectors(i,t),ea.crossVectors(ta,Yo);let r=this.direction.dot(ea),a;if(r>0){if(s)return null;a=1}else if(r<0)a=-1,r=-r;else return null;Ii.subVectors(this.origin,t);const l=a*this.direction.dot(Yo.crossVectors(Ii,Yo));if(l<0)return null;const c=a*this.direction.dot(ta.cross(Ii));if(c<0||l+c>r)return null;const u=-a*Ii.dot(ea);return u<0?null:this.at(u/r,o)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ce{constructor(t,e,i,s,o,r,a,l,c,u,d,h,p,m,v,g){Ce.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,o,r,a,l,c,u,d,h,p,m,v,g)}set(t,e,i,s,o,r,a,l,c,u,d,h,p,m,v,g){const f=this.elements;return f[0]=t,f[4]=e,f[8]=i,f[12]=s,f[1]=o,f[5]=r,f[9]=a,f[13]=l,f[2]=c,f[6]=u,f[10]=d,f[14]=h,f[3]=p,f[7]=m,f[11]=v,f[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ce().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,s=1/Ss.setFromMatrixColumn(t,0).length(),o=1/Ss.setFromMatrixColumn(t,1).length(),r=1/Ss.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*o,e[5]=i[5]*o,e[6]=i[6]*o,e[7]=0,e[8]=i[8]*r,e[9]=i[9]*r,e[10]=i[10]*r,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,s=t.y,o=t.z,r=Math.cos(i),a=Math.sin(i),l=Math.cos(s),c=Math.sin(s),u=Math.cos(o),d=Math.sin(o);if(t.order==="XYZ"){const h=r*u,p=r*d,m=a*u,v=a*d;e[0]=l*u,e[4]=-l*d,e[8]=c,e[1]=p+m*c,e[5]=h-v*c,e[9]=-a*l,e[2]=v-h*c,e[6]=m+p*c,e[10]=r*l}else if(t.order==="YXZ"){const h=l*u,p=l*d,m=c*u,v=c*d;e[0]=h+v*a,e[4]=m*a-p,e[8]=r*c,e[1]=r*d,e[5]=r*u,e[9]=-a,e[2]=p*a-m,e[6]=v+h*a,e[10]=r*l}else if(t.order==="ZXY"){const h=l*u,p=l*d,m=c*u,v=c*d;e[0]=h-v*a,e[4]=-r*d,e[8]=m+p*a,e[1]=p+m*a,e[5]=r*u,e[9]=v-h*a,e[2]=-r*c,e[6]=a,e[10]=r*l}else if(t.order==="ZYX"){const h=r*u,p=r*d,m=a*u,v=a*d;e[0]=l*u,e[4]=m*c-p,e[8]=h*c+v,e[1]=l*d,e[5]=v*c+h,e[9]=p*c-m,e[2]=-c,e[6]=a*l,e[10]=r*l}else if(t.order==="YZX"){const h=r*l,p=r*c,m=a*l,v=a*c;e[0]=l*u,e[4]=v-h*d,e[8]=m*d+p,e[1]=d,e[5]=r*u,e[9]=-a*u,e[2]=-c*u,e[6]=p*d+m,e[10]=h-v*d}else if(t.order==="XZY"){const h=r*l,p=r*c,m=a*l,v=a*c;e[0]=l*u,e[4]=-d,e[8]=c*u,e[1]=h*d+v,e[5]=r*u,e[9]=p*d-m,e[2]=m*d-p,e[6]=a*u,e[10]=v*d+h}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Qh,t,tf)}lookAt(t,e,i){const s=this.elements;return Tn.subVectors(t,e),Tn.lengthSq()===0&&(Tn.z=1),Tn.normalize(),Di.crossVectors(i,Tn),Di.lengthSq()===0&&(Math.abs(i.z)===1?Tn.x+=1e-4:Tn.z+=1e-4,Tn.normalize(),Di.crossVectors(i,Tn)),Di.normalize(),$o.crossVectors(Tn,Di),s[0]=Di.x,s[4]=$o.x,s[8]=Tn.x,s[1]=Di.y,s[5]=$o.y,s[9]=Tn.y,s[2]=Di.z,s[6]=$o.z,s[10]=Tn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,o=this.elements,r=i[0],a=i[4],l=i[8],c=i[12],u=i[1],d=i[5],h=i[9],p=i[13],m=i[2],v=i[6],g=i[10],f=i[14],S=i[3],w=i[7],E=i[11],G=i[15],x=s[0],U=s[4],z=s[8],y=s[12],M=s[1],I=s[5],k=s[9],F=s[13],Z=s[2],et=s[6],J=s[10],rt=s[14],j=s[3],gt=s[7],ht=s[11],Pt=s[15];return o[0]=r*x+a*M+l*Z+c*j,o[4]=r*U+a*I+l*et+c*gt,o[8]=r*z+a*k+l*J+c*ht,o[12]=r*y+a*F+l*rt+c*Pt,o[1]=u*x+d*M+h*Z+p*j,o[5]=u*U+d*I+h*et+p*gt,o[9]=u*z+d*k+h*J+p*ht,o[13]=u*y+d*F+h*rt+p*Pt,o[2]=m*x+v*M+g*Z+f*j,o[6]=m*U+v*I+g*et+f*gt,o[10]=m*z+v*k+g*J+f*ht,o[14]=m*y+v*F+g*rt+f*Pt,o[3]=S*x+w*M+E*Z+G*j,o[7]=S*U+w*I+E*et+G*gt,o[11]=S*z+w*k+E*J+G*ht,o[15]=S*y+w*F+E*rt+G*Pt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],s=t[8],o=t[12],r=t[1],a=t[5],l=t[9],c=t[13],u=t[2],d=t[6],h=t[10],p=t[14],m=t[3],v=t[7],g=t[11],f=t[15];return m*(+o*l*d-s*c*d-o*a*h+i*c*h+s*a*p-i*l*p)+v*(+e*l*p-e*c*h+o*r*h-s*r*p+s*c*u-o*l*u)+g*(+e*c*d-e*a*p-o*r*d+i*r*p+o*a*u-i*c*u)+f*(-s*a*u-e*l*d+e*a*h+s*r*d-i*r*h+i*l*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],o=t[3],r=t[4],a=t[5],l=t[6],c=t[7],u=t[8],d=t[9],h=t[10],p=t[11],m=t[12],v=t[13],g=t[14],f=t[15],S=d*g*c-v*h*c+v*l*p-a*g*p-d*l*f+a*h*f,w=m*h*c-u*g*c-m*l*p+r*g*p+u*l*f-r*h*f,E=u*v*c-m*d*c+m*a*p-r*v*p-u*a*f+r*d*f,G=m*d*l-u*v*l-m*a*h+r*v*h+u*a*g-r*d*g,x=e*S+i*w+s*E+o*G;if(x===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const U=1/x;return t[0]=S*U,t[1]=(v*h*o-d*g*o-v*s*p+i*g*p+d*s*f-i*h*f)*U,t[2]=(a*g*o-v*l*o+v*s*c-i*g*c-a*s*f+i*l*f)*U,t[3]=(d*l*o-a*h*o-d*s*c+i*h*c+a*s*p-i*l*p)*U,t[4]=w*U,t[5]=(u*g*o-m*h*o+m*s*p-e*g*p-u*s*f+e*h*f)*U,t[6]=(m*l*o-r*g*o-m*s*c+e*g*c+r*s*f-e*l*f)*U,t[7]=(r*h*o-u*l*o+u*s*c-e*h*c-r*s*p+e*l*p)*U,t[8]=E*U,t[9]=(m*d*o-u*v*o-m*i*p+e*v*p+u*i*f-e*d*f)*U,t[10]=(r*v*o-m*a*o+m*i*c-e*v*c-r*i*f+e*a*f)*U,t[11]=(u*a*o-r*d*o-u*i*c+e*d*c+r*i*p-e*a*p)*U,t[12]=G*U,t[13]=(u*v*s-m*d*s+m*i*h-e*v*h-u*i*g+e*d*g)*U,t[14]=(m*a*s-r*v*s-m*i*l+e*v*l+r*i*g-e*a*g)*U,t[15]=(r*d*s-u*a*s+u*i*l-e*d*l-r*i*h+e*a*h)*U,this}scale(t){const e=this.elements,i=t.x,s=t.y,o=t.z;return e[0]*=i,e[4]*=s,e[8]*=o,e[1]*=i,e[5]*=s,e[9]*=o,e[2]*=i,e[6]*=s,e[10]*=o,e[3]*=i,e[7]*=s,e[11]*=o,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),s=Math.sin(e),o=1-i,r=t.x,a=t.y,l=t.z,c=o*r,u=o*a;return this.set(c*r+i,c*a-s*l,c*l+s*a,0,c*a+s*l,u*a+i,u*l-s*r,0,c*l-s*a,u*l+s*r,o*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,o,r){return this.set(1,i,o,0,t,1,r,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){const s=this.elements,o=e._x,r=e._y,a=e._z,l=e._w,c=o+o,u=r+r,d=a+a,h=o*c,p=o*u,m=o*d,v=r*u,g=r*d,f=a*d,S=l*c,w=l*u,E=l*d,G=i.x,x=i.y,U=i.z;return s[0]=(1-(v+f))*G,s[1]=(p+E)*G,s[2]=(m-w)*G,s[3]=0,s[4]=(p-E)*x,s[5]=(1-(h+f))*x,s[6]=(g+S)*x,s[7]=0,s[8]=(m+w)*U,s[9]=(g-S)*U,s[10]=(1-(h+v))*U,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){const s=this.elements;let o=Ss.set(s[0],s[1],s[2]).length();const r=Ss.set(s[4],s[5],s[6]).length(),a=Ss.set(s[8],s[9],s[10]).length();this.determinant()<0&&(o=-o),t.x=s[12],t.y=s[13],t.z=s[14],Vn.copy(this);const c=1/o,u=1/r,d=1/a;return Vn.elements[0]*=c,Vn.elements[1]*=c,Vn.elements[2]*=c,Vn.elements[4]*=u,Vn.elements[5]*=u,Vn.elements[6]*=u,Vn.elements[8]*=d,Vn.elements[9]*=d,Vn.elements[10]*=d,e.setFromRotationMatrix(Vn),i.x=o,i.y=r,i.z=a,this}makePerspective(t,e,i,s,o,r,a=Mi){const l=this.elements,c=2*o/(e-t),u=2*o/(i-s),d=(e+t)/(e-t),h=(i+s)/(i-s);let p,m;if(a===Mi)p=-(r+o)/(r-o),m=-2*r*o/(r-o);else if(a===Tr)p=-r/(r-o),m=-r*o/(r-o);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=m,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,s,o,r,a=Mi){const l=this.elements,c=1/(e-t),u=1/(i-s),d=1/(r-o),h=(e+t)*c,p=(i+s)*u;let m,v;if(a===Mi)m=(r+o)*d,v=-2*d;else if(a===Tr)m=o*d,v=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-h,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=v,l[14]=-m,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const Ss=new b,Vn=new Ce,Qh=new b(0,0,0),tf=new b(1,1,1),Di=new b,$o=new b,Tn=new b,_c=new Ce,Mc=new Do;class jn{constructor(t=0,e=0,i=0,s=jn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const s=t.elements,o=s[0],r=s[4],a=s[8],l=s[1],c=s[5],u=s[9],d=s[2],h=s[6],p=s[10];switch(e){case"XYZ":this._y=Math.asin(an(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-r,o)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-an(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,o),this._z=0);break;case"ZXY":this._x=Math.asin(an(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-r,c)):(this._y=0,this._z=Math.atan2(l,o));break;case"ZYX":this._y=Math.asin(-an(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(l,o)):(this._x=0,this._z=Math.atan2(-r,c));break;case"YZX":this._z=Math.asin(an(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,o)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-an(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(a,o)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return _c.makeRotationFromQuaternion(t),this.setFromRotationMatrix(_c,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Mc.setFromEuler(this),this.setFromQuaternion(Mc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}jn.DEFAULT_ORDER="XYZ";class kl{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let ef=0;const yc=new b,ws=new Do,hi=new Ce,Zo=new b,co=new b,nf=new b,sf=new Do,xc=new b(1,0,0),Sc=new b(0,1,0),wc=new b(0,0,1),bc={type:"added"},of={type:"removed"},bs={type:"childadded",child:null},na={type:"childremoved",child:null};class $e extends to{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ef++}),this.uuid=Si(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=$e.DEFAULT_UP.clone();const t=new b,e=new jn,i=new Do,s=new b(1,1,1);function o(){i.setFromEuler(e,!1)}function r(){e.setFromQuaternion(i,void 0,!1)}e._onChange(o),i._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ce},normalMatrix:{value:new ee}}),this.matrix=new Ce,this.matrixWorld=new Ce,this.matrixAutoUpdate=$e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=$e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new kl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ws.setFromAxisAngle(t,e),this.quaternion.multiply(ws),this}rotateOnWorldAxis(t,e){return ws.setFromAxisAngle(t,e),this.quaternion.premultiply(ws),this}rotateX(t){return this.rotateOnAxis(xc,t)}rotateY(t){return this.rotateOnAxis(Sc,t)}rotateZ(t){return this.rotateOnAxis(wc,t)}translateOnAxis(t,e){return yc.copy(t).applyQuaternion(this.quaternion),this.position.add(yc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(xc,t)}translateY(t){return this.translateOnAxis(Sc,t)}translateZ(t){return this.translateOnAxis(wc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(hi.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Zo.copy(t):Zo.set(t,e,i);const s=this.parent;this.updateWorldMatrix(!0,!1),co.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?hi.lookAt(co,Zo,this.up):hi.lookAt(Zo,co,this.up),this.quaternion.setFromRotationMatrix(hi),s&&(hi.extractRotation(s.matrixWorld),ws.setFromRotationMatrix(hi),this.quaternion.premultiply(ws.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(bc),bs.child=t,this.dispatchEvent(bs),bs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(of),na.child=t,this.dispatchEvent(na),na.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),hi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),hi.multiply(t.parent.matrixWorld)),t.applyMatrix4(hi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(bc),bs.child=t,this.dispatchEvent(bs),bs.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){const r=this.children[i].getObjectByProperty(t,e);if(r!==void 0)return r}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const s=this.children;for(let o=0,r=s.length;o<r;o++)s[o].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(co,t,nf),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(co,sf,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let o=0,r=s.length;o<r;o++)s[o].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function o(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=o(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];o(t.shapes,d)}else o(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(o(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(o(t.materials,this.material[l]));s.material=a}else s.material=o(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(o(t.animations,l))}}if(e){const a=r(t.geometries),l=r(t.materials),c=r(t.textures),u=r(t.images),d=r(t.shapes),h=r(t.skeletons),p=r(t.animations),m=r(t.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),d.length>0&&(i.shapes=d),h.length>0&&(i.skeletons=h),p.length>0&&(i.animations=p),m.length>0&&(i.nodes=m)}return i.object=s,i;function r(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const s=t.children[i];this.add(s.clone())}return this}}$e.DEFAULT_UP=new b(0,1,0);$e.DEFAULT_MATRIX_AUTO_UPDATE=!0;$e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Wn=new b,fi=new b,ia=new b,pi=new b,Es=new b,Ts=new b,Ec=new b,sa=new b,oa=new b,ra=new b,aa=new Ae,la=new Ae,ca=new Ae;class Fn{constructor(t=new b,e=new b,i=new b){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),Wn.subVectors(t,e),s.cross(Wn);const o=s.lengthSq();return o>0?s.multiplyScalar(1/Math.sqrt(o)):s.set(0,0,0)}static getBarycoord(t,e,i,s,o){Wn.subVectors(s,e),fi.subVectors(i,e),ia.subVectors(t,e);const r=Wn.dot(Wn),a=Wn.dot(fi),l=Wn.dot(ia),c=fi.dot(fi),u=fi.dot(ia),d=r*c-a*a;if(d===0)return o.set(0,0,0),null;const h=1/d,p=(c*l-a*u)*h,m=(r*u-a*l)*h;return o.set(1-p-m,m,p)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,pi)===null?!1:pi.x>=0&&pi.y>=0&&pi.x+pi.y<=1}static getInterpolation(t,e,i,s,o,r,a,l){return this.getBarycoord(t,e,i,s,pi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(o,pi.x),l.addScaledVector(r,pi.y),l.addScaledVector(a,pi.z),l)}static getInterpolatedAttribute(t,e,i,s,o,r){return aa.setScalar(0),la.setScalar(0),ca.setScalar(0),aa.fromBufferAttribute(t,e),la.fromBufferAttribute(t,i),ca.fromBufferAttribute(t,s),r.setScalar(0),r.addScaledVector(aa,o.x),r.addScaledVector(la,o.y),r.addScaledVector(ca,o.z),r}static isFrontFacing(t,e,i,s){return Wn.subVectors(i,e),fi.subVectors(t,e),Wn.cross(fi).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Wn.subVectors(this.c,this.b),fi.subVectors(this.a,this.b),Wn.cross(fi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Fn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Fn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,o){return Fn.getInterpolation(t,this.a,this.b,this.c,e,i,s,o)}containsPoint(t){return Fn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Fn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,s=this.b,o=this.c;let r,a;Es.subVectors(s,i),Ts.subVectors(o,i),sa.subVectors(t,i);const l=Es.dot(sa),c=Ts.dot(sa);if(l<=0&&c<=0)return e.copy(i);oa.subVectors(t,s);const u=Es.dot(oa),d=Ts.dot(oa);if(u>=0&&d<=u)return e.copy(s);const h=l*d-u*c;if(h<=0&&l>=0&&u<=0)return r=l/(l-u),e.copy(i).addScaledVector(Es,r);ra.subVectors(t,o);const p=Es.dot(ra),m=Ts.dot(ra);if(m>=0&&p<=m)return e.copy(o);const v=p*c-l*m;if(v<=0&&c>=0&&m<=0)return a=c/(c-m),e.copy(i).addScaledVector(Ts,a);const g=u*m-p*d;if(g<=0&&d-u>=0&&p-m>=0)return Ec.subVectors(o,s),a=(d-u)/(d-u+(p-m)),e.copy(s).addScaledVector(Ec,a);const f=1/(g+v+h);return r=v*f,a=h*f,e.copy(i).addScaledVector(Es,r).addScaledVector(Ts,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const td={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ui={h:0,s:0,l:0},jo={h:0,s:0,l:0};function ua(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class _t{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=xe){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,pe.toWorkingColorSpace(this,e),this}setRGB(t,e,i,s=pe.workingColorSpace){return this.r=t,this.g=e,this.b=i,pe.toWorkingColorSpace(this,s),this}setHSL(t,e,i,s=pe.workingColorSpace){if(t=Bl(t,1),e=an(e,0,1),i=an(i,0,1),e===0)this.r=this.g=this.b=i;else{const o=i<=.5?i*(1+e):i+e-i*e,r=2*i-o;this.r=ua(r,o,t+1/3),this.g=ua(r,o,t),this.b=ua(r,o,t-1/3)}return pe.toWorkingColorSpace(this,s),this}setStyle(t,e=xe){function i(o){o!==void 0&&parseFloat(o)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let o;const r=s[1],a=s[2];switch(r){case"rgb":case"rgba":if(o=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(o[4]),this.setRGB(Math.min(255,parseInt(o[1],10))/255,Math.min(255,parseInt(o[2],10))/255,Math.min(255,parseInt(o[3],10))/255,e);if(o=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(o[4]),this.setRGB(Math.min(100,parseInt(o[1],10))/100,Math.min(100,parseInt(o[2],10))/100,Math.min(100,parseInt(o[3],10))/100,e);break;case"hsl":case"hsla":if(o=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(o[4]),this.setHSL(parseFloat(o[1])/360,parseFloat(o[2])/100,parseFloat(o[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const o=s[1],r=o.length;if(r===3)return this.setRGB(parseInt(o.charAt(0),16)/15,parseInt(o.charAt(1),16)/15,parseInt(o.charAt(2),16)/15,e);if(r===6)return this.setHex(parseInt(o,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=xe){const i=td[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=wi(t.r),this.g=wi(t.g),this.b=wi(t.b),this}copyLinearToSRGB(t){return this.r=Gs(t.r),this.g=Gs(t.g),this.b=Gs(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=xe){return pe.fromWorkingColorSpace(hn.copy(this),t),Math.round(an(hn.r*255,0,255))*65536+Math.round(an(hn.g*255,0,255))*256+Math.round(an(hn.b*255,0,255))}getHexString(t=xe){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=pe.workingColorSpace){pe.fromWorkingColorSpace(hn.copy(this),e);const i=hn.r,s=hn.g,o=hn.b,r=Math.max(i,s,o),a=Math.min(i,s,o);let l,c;const u=(a+r)/2;if(a===r)l=0,c=0;else{const d=r-a;switch(c=u<=.5?d/(r+a):d/(2-r-a),r){case i:l=(s-o)/d+(s<o?6:0);break;case s:l=(o-i)/d+2;break;case o:l=(i-s)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=pe.workingColorSpace){return pe.fromWorkingColorSpace(hn.copy(this),e),t.r=hn.r,t.g=hn.g,t.b=hn.b,t}getStyle(t=xe){pe.fromWorkingColorSpace(hn.copy(this),t);const e=hn.r,i=hn.g,s=hn.b;return t!==xe?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(Ui),this.setHSL(Ui.h+t,Ui.s+e,Ui.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Ui),t.getHSL(jo);const i=bo(Ui.h,jo.h,e),s=bo(Ui.s,jo.s,e),o=bo(Ui.l,jo.l,e);return this.setHSL(i,s,o),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,s=this.b,o=t.elements;return this.r=o[0]*e+o[3]*i+o[6]*s,this.g=o[1]*e+o[4]*i+o[7]*s,this.b=o[2]*e+o[5]*i+o[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const hn=new _t;_t.NAMES=td;let rf=0;class Ei extends to{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:rf++}),this.uuid=Si(),this.name="",this.blending=ls,this.side=Gi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ba,this.blendDst=ka,this.blendEquation=ss,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new _t(0,0,0),this.blendAlpha=0,this.depthFunc=Ws,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=lc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=vs,this.stencilZFail=vs,this.stencilZPass=vs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==ls&&(i.blending=this.blending),this.side!==Gi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Ba&&(i.blendSrc=this.blendSrc),this.blendDst!==ka&&(i.blendDst=this.blendDst),this.blendEquation!==ss&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Ws&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==lc&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==vs&&(i.stencilFail=this.stencilFail),this.stencilZFail!==vs&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==vs&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(o){const r=[];for(const a in o){const l=o[a];delete l.metadata,r.push(l)}return r}if(e){const o=s(t.textures),r=s(t.images);o.length>0&&(i.textures=o),r.length>0&&(i.images=r)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const s=e.length;i=new Array(s);for(let o=0;o!==s;++o)i[o]=e[o].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Be extends Ei{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new _t(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new jn,this.combine=Ll,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const qe=new b,Ko=new Et;class Ve{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=wl,this.updateRanges=[],this.gpuType=_i,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,o=this.itemSize;s<o;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Ko.fromBufferAttribute(this,e),Ko.applyMatrix3(t),this.setXY(e,Ko.x,Ko.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)qe.fromBufferAttribute(this,e),qe.applyMatrix3(t),this.setXYZ(e,qe.x,qe.y,qe.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)qe.fromBufferAttribute(this,e),qe.applyMatrix4(t),this.setXYZ(e,qe.x,qe.y,qe.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)qe.fromBufferAttribute(this,e),qe.applyNormalMatrix(t),this.setXYZ(e,qe.x,qe.y,qe.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)qe.fromBufferAttribute(this,e),qe.transformDirection(t),this.setXYZ(e,qe.x,qe.y,qe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=qn(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=Ee(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=qn(e,this.array)),e}setX(t,e){return this.normalized&&(e=Ee(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=qn(e,this.array)),e}setY(t,e){return this.normalized&&(e=Ee(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=qn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Ee(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=qn(e,this.array)),e}setW(t,e){return this.normalized&&(e=Ee(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=Ee(e,this.array),i=Ee(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=Ee(e,this.array),i=Ee(i,this.array),s=Ee(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,o){return t*=this.itemSize,this.normalized&&(e=Ee(e,this.array),i=Ee(i,this.array),s=Ee(s,this.array),o=Ee(o,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=o,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==wl&&(t.usage=this.usage),t}}class ed extends Ve{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class nd extends Ve{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class Re extends Ve{constructor(t,e,i){super(new Float32Array(t),e,i)}}let af=0;const Nn=new Ce,da=new $e,As=new b,An=new Uo,uo=new Uo,Qe=new b;class Le extends to{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:af++}),this.uuid=Si(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Ku(t)?nd:ed)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const o=new ee().getNormalMatrix(t);i.applyNormalMatrix(o),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Nn.makeRotationFromQuaternion(t),this.applyMatrix4(Nn),this}rotateX(t){return Nn.makeRotationX(t),this.applyMatrix4(Nn),this}rotateY(t){return Nn.makeRotationY(t),this.applyMatrix4(Nn),this}rotateZ(t){return Nn.makeRotationZ(t),this.applyMatrix4(Nn),this}translate(t,e,i){return Nn.makeTranslation(t,e,i),this.applyMatrix4(Nn),this}scale(t,e,i){return Nn.makeScale(t,e,i),this.applyMatrix4(Nn),this}lookAt(t){return da.lookAt(t),da.updateMatrix(),this.applyMatrix4(da.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(As).negate(),this.translate(As.x,As.y,As.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let s=0,o=t.length;s<o;s++){const r=t[s];i.push(r.x,r.y,r.z||0)}this.setAttribute("position",new Re(i,3))}else{for(let i=0,s=e.count;i<s;i++){const o=t[i];e.setXYZ(i,o.x,o.y,o.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Uo);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new b(-1/0,-1/0,-1/0),new b(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){const o=e[i];An.setFromBufferAttribute(o),this.morphTargetsRelative?(Qe.addVectors(this.boundingBox.min,An.min),this.boundingBox.expandByPoint(Qe),Qe.addVectors(this.boundingBox.max,An.max),this.boundingBox.expandByPoint(Qe)):(this.boundingBox.expandByPoint(An.min),this.boundingBox.expandByPoint(An.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new No);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new b,1/0);return}if(t){const i=this.boundingSphere.center;if(An.setFromBufferAttribute(t),e)for(let o=0,r=e.length;o<r;o++){const a=e[o];uo.setFromBufferAttribute(a),this.morphTargetsRelative?(Qe.addVectors(An.min,uo.min),An.expandByPoint(Qe),Qe.addVectors(An.max,uo.max),An.expandByPoint(Qe)):(An.expandByPoint(uo.min),An.expandByPoint(uo.max))}An.getCenter(i);let s=0;for(let o=0,r=t.count;o<r;o++)Qe.fromBufferAttribute(t,o),s=Math.max(s,i.distanceToSquared(Qe));if(e)for(let o=0,r=e.length;o<r;o++){const a=e[o],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Qe.fromBufferAttribute(a,c),l&&(As.fromBufferAttribute(t,c),Qe.add(As)),s=Math.max(s,i.distanceToSquared(Qe))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,s=e.normal,o=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ve(new Float32Array(4*i.count),4));const r=this.getAttribute("tangent"),a=[],l=[];for(let z=0;z<i.count;z++)a[z]=new b,l[z]=new b;const c=new b,u=new b,d=new b,h=new Et,p=new Et,m=new Et,v=new b,g=new b;function f(z,y,M){c.fromBufferAttribute(i,z),u.fromBufferAttribute(i,y),d.fromBufferAttribute(i,M),h.fromBufferAttribute(o,z),p.fromBufferAttribute(o,y),m.fromBufferAttribute(o,M),u.sub(c),d.sub(c),p.sub(h),m.sub(h);const I=1/(p.x*m.y-m.x*p.y);isFinite(I)&&(v.copy(u).multiplyScalar(m.y).addScaledVector(d,-p.y).multiplyScalar(I),g.copy(d).multiplyScalar(p.x).addScaledVector(u,-m.x).multiplyScalar(I),a[z].add(v),a[y].add(v),a[M].add(v),l[z].add(g),l[y].add(g),l[M].add(g))}let S=this.groups;S.length===0&&(S=[{start:0,count:t.count}]);for(let z=0,y=S.length;z<y;++z){const M=S[z],I=M.start,k=M.count;for(let F=I,Z=I+k;F<Z;F+=3)f(t.getX(F+0),t.getX(F+1),t.getX(F+2))}const w=new b,E=new b,G=new b,x=new b;function U(z){G.fromBufferAttribute(s,z),x.copy(G);const y=a[z];w.copy(y),w.sub(G.multiplyScalar(G.dot(y))).normalize(),E.crossVectors(x,y);const I=E.dot(l[z])<0?-1:1;r.setXYZW(z,w.x,w.y,w.z,I)}for(let z=0,y=S.length;z<y;++z){const M=S[z],I=M.start,k=M.count;for(let F=I,Z=I+k;F<Z;F+=3)U(t.getX(F+0)),U(t.getX(F+1)),U(t.getX(F+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Ve(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let h=0,p=i.count;h<p;h++)i.setXYZ(h,0,0,0);const s=new b,o=new b,r=new b,a=new b,l=new b,c=new b,u=new b,d=new b;if(t)for(let h=0,p=t.count;h<p;h+=3){const m=t.getX(h+0),v=t.getX(h+1),g=t.getX(h+2);s.fromBufferAttribute(e,m),o.fromBufferAttribute(e,v),r.fromBufferAttribute(e,g),u.subVectors(r,o),d.subVectors(s,o),u.cross(d),a.fromBufferAttribute(i,m),l.fromBufferAttribute(i,v),c.fromBufferAttribute(i,g),a.add(u),l.add(u),c.add(u),i.setXYZ(m,a.x,a.y,a.z),i.setXYZ(v,l.x,l.y,l.z),i.setXYZ(g,c.x,c.y,c.z)}else for(let h=0,p=e.count;h<p;h+=3)s.fromBufferAttribute(e,h+0),o.fromBufferAttribute(e,h+1),r.fromBufferAttribute(e,h+2),u.subVectors(r,o),d.subVectors(s,o),u.cross(d),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Qe.fromBufferAttribute(t,e),Qe.normalize(),t.setXYZ(e,Qe.x,Qe.y,Qe.z)}toNonIndexed(){function t(a,l){const c=a.array,u=a.itemSize,d=a.normalized,h=new c.constructor(l.length*u);let p=0,m=0;for(let v=0,g=l.length;v<g;v++){a.isInterleavedBufferAttribute?p=l[v]*a.data.stride+a.offset:p=l[v]*u;for(let f=0;f<u;f++)h[m++]=c[p++]}return new Ve(h,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Le,i=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=t(l,i);e.setAttribute(a,c)}const o=this.morphAttributes;for(const a in o){const l=[],c=o[a];for(let u=0,d=c.length;u<d;u++){const h=c[u],p=t(h,i);l.push(p)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const r=this.groups;for(let a=0,l=r.length;a<l;a++){const c=r[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const l in i){const c=i[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let o=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,h=c.length;d<h;d++){const p=c[d];u.push(p.toJSON(t.data))}u.length>0&&(s[l]=u,o=!0)}o&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const r=this.groups;r.length>0&&(t.data.groups=JSON.parse(JSON.stringify(r)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone(e));const s=t.attributes;for(const c in s){const u=s[c];this.setAttribute(c,u.clone(e))}const o=t.morphAttributes;for(const c in o){const u=[],d=o[c];for(let h=0,p=d.length;h<p;h++)u.push(d[h].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;const r=t.groups;for(let c=0,u=r.length;c<u;c++){const d=r[c];this.addGroup(d.start,d.count,d.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Tc=new Ce,Yi=new Or,Jo=new No,Ac=new b,Qo=new b,tr=new b,er=new b,ha=new b,nr=new b,Cc=new b,ir=new b;class R extends $e{constructor(t=new Le,e=new Be){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,r=s.length;o<r;o++){const a=s[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=o}}}}getVertexPosition(t,e){const i=this.geometry,s=i.attributes.position,o=i.morphAttributes.position,r=i.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(o&&a){nr.set(0,0,0);for(let l=0,c=o.length;l<c;l++){const u=a[l],d=o[l];u!==0&&(ha.fromBufferAttribute(d,t),r?nr.addScaledVector(ha,u):nr.addScaledVector(ha.sub(e),u))}e.add(nr)}return e}raycast(t,e){const i=this.geometry,s=this.material,o=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Jo.copy(i.boundingSphere),Jo.applyMatrix4(o),Yi.copy(t.ray).recast(t.near),!(Jo.containsPoint(Yi.origin)===!1&&(Yi.intersectSphere(Jo,Ac)===null||Yi.origin.distanceToSquared(Ac)>(t.far-t.near)**2))&&(Tc.copy(o).invert(),Yi.copy(t.ray).applyMatrix4(Tc),!(i.boundingBox!==null&&Yi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Yi)))}_computeIntersections(t,e,i){let s;const o=this.geometry,r=this.material,a=o.index,l=o.attributes.position,c=o.attributes.uv,u=o.attributes.uv1,d=o.attributes.normal,h=o.groups,p=o.drawRange;if(a!==null)if(Array.isArray(r))for(let m=0,v=h.length;m<v;m++){const g=h[m],f=r[g.materialIndex],S=Math.max(g.start,p.start),w=Math.min(a.count,Math.min(g.start+g.count,p.start+p.count));for(let E=S,G=w;E<G;E+=3){const x=a.getX(E),U=a.getX(E+1),z=a.getX(E+2);s=sr(this,f,t,i,c,u,d,x,U,z),s&&(s.faceIndex=Math.floor(E/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const m=Math.max(0,p.start),v=Math.min(a.count,p.start+p.count);for(let g=m,f=v;g<f;g+=3){const S=a.getX(g),w=a.getX(g+1),E=a.getX(g+2);s=sr(this,r,t,i,c,u,d,S,w,E),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(r))for(let m=0,v=h.length;m<v;m++){const g=h[m],f=r[g.materialIndex],S=Math.max(g.start,p.start),w=Math.min(l.count,Math.min(g.start+g.count,p.start+p.count));for(let E=S,G=w;E<G;E+=3){const x=E,U=E+1,z=E+2;s=sr(this,f,t,i,c,u,d,x,U,z),s&&(s.faceIndex=Math.floor(E/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const m=Math.max(0,p.start),v=Math.min(l.count,p.start+p.count);for(let g=m,f=v;g<f;g+=3){const S=g,w=g+1,E=g+2;s=sr(this,r,t,i,c,u,d,S,w,E),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}}}function lf(n,t,e,i,s,o,r,a){let l;if(t.side===pn?l=i.intersectTriangle(r,o,s,!0,a):l=i.intersectTriangle(s,o,r,t.side===Gi,a),l===null)return null;ir.copy(a),ir.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(ir);return c<e.near||c>e.far?null:{distance:c,point:ir.clone(),object:n}}function sr(n,t,e,i,s,o,r,a,l,c){n.getVertexPosition(a,Qo),n.getVertexPosition(l,tr),n.getVertexPosition(c,er);const u=lf(n,t,e,i,Qo,tr,er,Cc);if(u){const d=new b;Fn.getBarycoord(Cc,Qo,tr,er,d),s&&(u.uv=Fn.getInterpolatedAttribute(s,a,l,c,d,new Et)),o&&(u.uv1=Fn.getInterpolatedAttribute(o,a,l,c,d,new Et)),r&&(u.normal=Fn.getInterpolatedAttribute(r,a,l,c,d,new b),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const h={a,b:l,c,normal:new b,materialIndex:0};Fn.getNormal(Qo,tr,er,h.normal),u.face=h,u.barycoord=d}return u}class ft extends Le{constructor(t=1,e=1,i=1,s=1,o=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:o,depthSegments:r};const a=this;s=Math.floor(s),o=Math.floor(o),r=Math.floor(r);const l=[],c=[],u=[],d=[];let h=0,p=0;m("z","y","x",-1,-1,i,e,t,r,o,0),m("z","y","x",1,-1,i,e,-t,r,o,1),m("x","z","y",1,1,t,i,e,s,r,2),m("x","z","y",1,-1,t,i,-e,s,r,3),m("x","y","z",1,-1,t,e,i,s,o,4),m("x","y","z",-1,-1,t,e,-i,s,o,5),this.setIndex(l),this.setAttribute("position",new Re(c,3)),this.setAttribute("normal",new Re(u,3)),this.setAttribute("uv",new Re(d,2));function m(v,g,f,S,w,E,G,x,U,z,y){const M=E/U,I=G/z,k=E/2,F=G/2,Z=x/2,et=U+1,J=z+1;let rt=0,j=0;const gt=new b;for(let ht=0;ht<J;ht++){const Pt=ht*I-F;for(let Y=0;Y<et;Y++){const Ut=Y*M-k;gt[v]=Ut*S,gt[g]=Pt*w,gt[f]=Z,c.push(gt.x,gt.y,gt.z),gt[v]=0,gt[g]=0,gt[f]=x>0?1:-1,u.push(gt.x,gt.y,gt.z),d.push(Y/U),d.push(1-ht/z),rt+=1}}for(let ht=0;ht<z;ht++)for(let Pt=0;Pt<U;Pt++){const Y=h+Pt+et*ht,Ut=h+Pt+et*(ht+1),L=h+(Pt+1)+et*(ht+1),O=h+(Pt+1)+et*ht;l.push(Y,Ut,O),l.push(Ut,L,O),j+=6}a.addGroup(p,j,y),p+=j,h+=rt}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ft(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Zs(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const s=n[e][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone():Array.isArray(s)?t[e][i]=s.slice():t[e][i]=s}}return t}function _n(n){const t={};for(let e=0;e<n.length;e++){const i=Zs(n[e]);for(const s in i)t[s]=i[s]}return t}function cf(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function id(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:pe.workingColorSpace}const Po={clone:Zs,merge:_n};var uf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,df=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class fn extends Ei{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=uf,this.fragmentShader=df,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Zs(t.uniforms),this.uniformsGroups=cf(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const r=this.uniforms[s].value;r&&r.isTexture?e.uniforms[s]={type:"t",value:r.toJSON(t).uuid}:r&&r.isColor?e.uniforms[s]={type:"c",value:r.getHex()}:r&&r.isVector2?e.uniforms[s]={type:"v2",value:r.toArray()}:r&&r.isVector3?e.uniforms[s]={type:"v3",value:r.toArray()}:r&&r.isVector4?e.uniforms[s]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?e.uniforms[s]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?e.uniforms[s]={type:"m4",value:r.toArray()}:e.uniforms[s]={value:r}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class sd extends $e{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ce,this.projectionMatrix=new Ce,this.projectionMatrixInverse=new Ce,this.coordinateSystem=Mi}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Ni=new b,Rc=new Et,Pc=new Et;class Ue extends sd{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Ro*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(wo*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ro*2*Math.atan(Math.tan(wo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){Ni.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Ni.x,Ni.y).multiplyScalar(-t/Ni.z),Ni.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Ni.x,Ni.y).multiplyScalar(-t/Ni.z)}getViewSize(t,e){return this.getViewBounds(t,Rc,Pc),e.subVectors(Pc,Rc)}setViewOffset(t,e,i,s,o,r){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=o,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(wo*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,o=-.5*s;const r=this.view;if(this.view!==null&&this.view.enabled){const l=r.fullWidth,c=r.fullHeight;o+=r.offsetX*s/l,e-=r.offsetY*i/c,s*=r.width/l,i*=r.height/c}const a=this.filmOffset;a!==0&&(o+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(o,o+s,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Cs=-90,Rs=1;class hf extends $e{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Ue(Cs,Rs,t,e);s.layers=this.layers,this.add(s);const o=new Ue(Cs,Rs,t,e);o.layers=this.layers,this.add(o);const r=new Ue(Cs,Rs,t,e);r.layers=this.layers,this.add(r);const a=new Ue(Cs,Rs,t,e);a.layers=this.layers,this.add(a);const l=new Ue(Cs,Rs,t,e);l.layers=this.layers,this.add(l);const c=new Ue(Cs,Rs,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,s,o,r,a,l]=e;for(const c of e)this.remove(c);if(t===Mi)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),o.up.set(0,0,-1),o.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Tr)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),o.up.set(0,0,1),o.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[o,r,a,l,c,u]=this.children,d=t.getRenderTarget(),h=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,s),t.render(e,o),t.setRenderTarget(i,1,s),t.render(e,r),t.setRenderTarget(i,2,s),t.render(e,a),t.setRenderTarget(i,3,s),t.render(e,l),t.setRenderTarget(i,4,s),t.render(e,c),i.texture.generateMipmaps=v,t.setRenderTarget(i,5,s),t.render(e,u),t.setRenderTarget(d,h,p),t.xr.enabled=m,i.texture.needsPMREMUpdate=!0}}class od extends yn{constructor(t,e,i,s,o,r,a,l,c,u){t=t!==void 0?t:[],e=e!==void 0?e:qs,super(t,e,i,s,o,r,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class ff extends Zn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new od(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:oi}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new ft(5,5,5),o=new fn({name:"CubemapFromEquirect",uniforms:Zs(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:pn,blending:yi});o.uniforms.tEquirect.value=e;const r=new R(s,o),a=e.minFilter;return e.minFilter===as&&(e.minFilter=oi),new hf(1,10,this).update(t,r),e.minFilter=a,r.geometry.dispose(),r.material.dispose(),this}clear(t,e,i,s){const o=t.getRenderTarget();for(let r=0;r<6;r++)t.setRenderTarget(this,r),t.clear(e,i,s);t.setRenderTarget(o)}}const fa=new b,pf=new b,mf=new ee;class es{constructor(t=new b(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const s=fa.subVectors(i,e).cross(pf.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(fa),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const o=-(t.start.dot(this.normal)+this.constant)/s;return o<0||o>1?null:e.copy(t.start).addScaledVector(i,o)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||mf.getNormalMatrix(t),s=this.coplanarPoint(fa).applyMatrix4(t),o=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(o),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const $i=new No,or=new b;class Gl{constructor(t=new es,e=new es,i=new es,s=new es,o=new es,r=new es){this.planes=[t,e,i,s,o,r]}set(t,e,i,s,o,r){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(s),a[4].copy(o),a[5].copy(r),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=Mi){const i=this.planes,s=t.elements,o=s[0],r=s[1],a=s[2],l=s[3],c=s[4],u=s[5],d=s[6],h=s[7],p=s[8],m=s[9],v=s[10],g=s[11],f=s[12],S=s[13],w=s[14],E=s[15];if(i[0].setComponents(l-o,h-c,g-p,E-f).normalize(),i[1].setComponents(l+o,h+c,g+p,E+f).normalize(),i[2].setComponents(l+r,h+u,g+m,E+S).normalize(),i[3].setComponents(l-r,h-u,g-m,E-S).normalize(),i[4].setComponents(l-a,h-d,g-v,E-w).normalize(),e===Mi)i[5].setComponents(l+a,h+d,g+v,E+w).normalize();else if(e===Tr)i[5].setComponents(a,d,v,w).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),$i.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),$i.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere($i)}intersectsSprite(t){return $i.center.set(0,0,0),$i.radius=.7071067811865476,$i.applyMatrix4(t.matrixWorld),this.intersectsSphere($i)}intersectsSphere(t){const e=this.planes,i=t.center,s=-t.radius;for(let o=0;o<6;o++)if(e[o].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const s=e[i];if(or.x=s.normal.x>0?t.max.x:t.min.x,or.y=s.normal.y>0?t.max.y:t.min.y,or.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(or)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function rd(){let n=null,t=!1,e=null,i=null;function s(o,r){e(o,r),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(o){e=o},setContext:function(o){n=o}}}function gf(n){const t=new WeakMap;function e(a,l){const c=a.array,u=a.usage,d=c.byteLength,h=n.createBuffer();n.bindBuffer(l,h),n.bufferData(l,c,u),a.onUploadCallback();let p;if(c instanceof Float32Array)p=n.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=n.SHORT;else if(c instanceof Uint32Array)p=n.UNSIGNED_INT;else if(c instanceof Int32Array)p=n.INT;else if(c instanceof Int8Array)p=n.BYTE;else if(c instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function i(a,l,c){const u=l.array,d=l.updateRanges;if(n.bindBuffer(c,a),d.length===0)n.bufferSubData(c,0,u);else{d.sort((p,m)=>p.start-m.start);let h=0;for(let p=1;p<d.length;p++){const m=d[h],v=d[p];v.start<=m.start+m.count+1?m.count=Math.max(m.count,v.start+v.count-m.start):(++h,d[h]=v)}d.length=h+1;for(let p=0,m=d.length;p<m;p++){const v=d[p];n.bufferSubData(c,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function o(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(n.deleteBuffer(l.buffer),t.delete(a))}function r(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:s,remove:o,update:r}}class Jt extends Le{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};const o=t/2,r=e/2,a=Math.floor(i),l=Math.floor(s),c=a+1,u=l+1,d=t/a,h=e/l,p=[],m=[],v=[],g=[];for(let f=0;f<u;f++){const S=f*h-r;for(let w=0;w<c;w++){const E=w*d-o;m.push(E,-S,0),v.push(0,0,1),g.push(w/a),g.push(1-f/l)}}for(let f=0;f<l;f++)for(let S=0;S<a;S++){const w=S+c*f,E=S+c*(f+1),G=S+1+c*(f+1),x=S+1+c*f;p.push(w,E,x),p.push(E,G,x)}this.setIndex(p),this.setAttribute("position",new Re(m,3)),this.setAttribute("normal",new Re(v,3)),this.setAttribute("uv",new Re(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Jt(t.width,t.height,t.widthSegments,t.heightSegments)}}var vf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,_f=`#ifdef USE_ALPHAHASH
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
#endif`,Mf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,yf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,xf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Sf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,wf=`#ifdef USE_AOMAP
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
#endif`,bf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ef=`#ifdef USE_BATCHING
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
#endif`,Tf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Af=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Cf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Rf=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Pf=`#ifdef USE_IRIDESCENCE
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
#endif`,Lf=`#ifdef USE_BUMPMAP
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
#endif`,If=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Df=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Uf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Nf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,zf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Ff=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Of=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Bf=`#if defined( USE_COLOR_ALPHA )
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
#endif`,kf=`#define PI 3.141592653589793
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
} // validated`,Gf=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Hf=`vec3 transformedNormal = objectNormal;
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
#endif`,Vf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Wf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,qf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Xf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Yf="gl_FragColor = linearToOutputTexel( gl_FragColor );",$f=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Zf=`#ifdef USE_ENVMAP
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
#endif`,jf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Kf=`#ifdef USE_ENVMAP
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
#endif`,Jf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Qf=`#ifdef USE_ENVMAP
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
#endif`,tp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ep=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,np=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ip=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,sp=`#ifdef USE_GRADIENTMAP
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
}`,op=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,rp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ap=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lp=`uniform bool receiveShadow;
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
#endif`,cp=`#ifdef USE_ENVMAP
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
#endif`,up=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,dp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,hp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,fp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,pp=`PhysicalMaterial material;
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
#endif`,mp=`struct PhysicalMaterial {
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
}`,gp=`
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
#endif`,vp=`#if defined( RE_IndirectDiffuse )
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
#endif`,_p=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Mp=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,yp=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,xp=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Sp=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,wp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,bp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ep=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Tp=`#if defined( USE_POINTS_UV )
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
#endif`,Ap=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Cp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Rp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Pp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Lp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ip=`#ifdef USE_MORPHTARGETS
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
#endif`,Dp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Up=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Np=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,zp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Fp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Op=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Bp=`#ifdef USE_NORMALMAP
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
#endif`,kp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Gp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Hp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Vp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Wp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,qp=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Xp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Yp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,$p=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Zp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,jp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Kp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Jp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Qp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,t0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,e0=`float getShadowMask() {
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
}`,n0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,i0=`#ifdef USE_SKINNING
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
#endif`,s0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,o0=`#ifdef USE_SKINNING
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
#endif`,r0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,a0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,l0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,c0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,u0=`#ifdef USE_TRANSMISSION
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
#endif`,d0=`#ifdef USE_TRANSMISSION
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
#endif`,h0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,f0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,p0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,m0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const g0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,v0=`uniform sampler2D t2D;
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
}`,_0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,M0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,y0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,x0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,S0=`#include <common>
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
}`,w0=`#if DEPTH_PACKING == 3200
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
}`,b0=`#define DISTANCE
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
}`,E0=`#define DISTANCE
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
}`,T0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,A0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,C0=`uniform float scale;
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
}`,R0=`uniform vec3 diffuse;
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
}`,P0=`#include <common>
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
}`,L0=`uniform vec3 diffuse;
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
}`,I0=`#define LAMBERT
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
}`,D0=`#define LAMBERT
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
}`,U0=`#define MATCAP
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
}`,N0=`#define MATCAP
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
}`,z0=`#define NORMAL
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
}`,F0=`#define NORMAL
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
}`,O0=`#define PHONG
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
}`,B0=`#define PHONG
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
}`,k0=`#define STANDARD
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
}`,G0=`#define STANDARD
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
}`,H0=`#define TOON
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
}`,V0=`#define TOON
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
}`,W0=`uniform float size;
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
}`,q0=`uniform vec3 diffuse;
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
}`,X0=`#include <common>
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
}`,Y0=`uniform vec3 color;
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
}`,$0=`uniform float rotation;
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
}`,Z0=`uniform vec3 diffuse;
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
}`,ne={alphahash_fragment:vf,alphahash_pars_fragment:_f,alphamap_fragment:Mf,alphamap_pars_fragment:yf,alphatest_fragment:xf,alphatest_pars_fragment:Sf,aomap_fragment:wf,aomap_pars_fragment:bf,batching_pars_vertex:Ef,batching_vertex:Tf,begin_vertex:Af,beginnormal_vertex:Cf,bsdfs:Rf,iridescence_fragment:Pf,bumpmap_pars_fragment:Lf,clipping_planes_fragment:If,clipping_planes_pars_fragment:Df,clipping_planes_pars_vertex:Uf,clipping_planes_vertex:Nf,color_fragment:zf,color_pars_fragment:Ff,color_pars_vertex:Of,color_vertex:Bf,common:kf,cube_uv_reflection_fragment:Gf,defaultnormal_vertex:Hf,displacementmap_pars_vertex:Vf,displacementmap_vertex:Wf,emissivemap_fragment:qf,emissivemap_pars_fragment:Xf,colorspace_fragment:Yf,colorspace_pars_fragment:$f,envmap_fragment:Zf,envmap_common_pars_fragment:jf,envmap_pars_fragment:Kf,envmap_pars_vertex:Jf,envmap_physical_pars_fragment:cp,envmap_vertex:Qf,fog_vertex:tp,fog_pars_vertex:ep,fog_fragment:np,fog_pars_fragment:ip,gradientmap_pars_fragment:sp,lightmap_pars_fragment:op,lights_lambert_fragment:rp,lights_lambert_pars_fragment:ap,lights_pars_begin:lp,lights_toon_fragment:up,lights_toon_pars_fragment:dp,lights_phong_fragment:hp,lights_phong_pars_fragment:fp,lights_physical_fragment:pp,lights_physical_pars_fragment:mp,lights_fragment_begin:gp,lights_fragment_maps:vp,lights_fragment_end:_p,logdepthbuf_fragment:Mp,logdepthbuf_pars_fragment:yp,logdepthbuf_pars_vertex:xp,logdepthbuf_vertex:Sp,map_fragment:wp,map_pars_fragment:bp,map_particle_fragment:Ep,map_particle_pars_fragment:Tp,metalnessmap_fragment:Ap,metalnessmap_pars_fragment:Cp,morphinstance_vertex:Rp,morphcolor_vertex:Pp,morphnormal_vertex:Lp,morphtarget_pars_vertex:Ip,morphtarget_vertex:Dp,normal_fragment_begin:Up,normal_fragment_maps:Np,normal_pars_fragment:zp,normal_pars_vertex:Fp,normal_vertex:Op,normalmap_pars_fragment:Bp,clearcoat_normal_fragment_begin:kp,clearcoat_normal_fragment_maps:Gp,clearcoat_pars_fragment:Hp,iridescence_pars_fragment:Vp,opaque_fragment:Wp,packing:qp,premultiplied_alpha_fragment:Xp,project_vertex:Yp,dithering_fragment:$p,dithering_pars_fragment:Zp,roughnessmap_fragment:jp,roughnessmap_pars_fragment:Kp,shadowmap_pars_fragment:Jp,shadowmap_pars_vertex:Qp,shadowmap_vertex:t0,shadowmask_pars_fragment:e0,skinbase_vertex:n0,skinning_pars_vertex:i0,skinning_vertex:s0,skinnormal_vertex:o0,specularmap_fragment:r0,specularmap_pars_fragment:a0,tonemapping_fragment:l0,tonemapping_pars_fragment:c0,transmission_fragment:u0,transmission_pars_fragment:d0,uv_pars_fragment:h0,uv_pars_vertex:f0,uv_vertex:p0,worldpos_vertex:m0,background_vert:g0,background_frag:v0,backgroundCube_vert:_0,backgroundCube_frag:M0,cube_vert:y0,cube_frag:x0,depth_vert:S0,depth_frag:w0,distanceRGBA_vert:b0,distanceRGBA_frag:E0,equirect_vert:T0,equirect_frag:A0,linedashed_vert:C0,linedashed_frag:R0,meshbasic_vert:P0,meshbasic_frag:L0,meshlambert_vert:I0,meshlambert_frag:D0,meshmatcap_vert:U0,meshmatcap_frag:N0,meshnormal_vert:z0,meshnormal_frag:F0,meshphong_vert:O0,meshphong_frag:B0,meshphysical_vert:k0,meshphysical_frag:G0,meshtoon_vert:H0,meshtoon_frag:V0,points_vert:W0,points_frag:q0,shadow_vert:X0,shadow_frag:Y0,sprite_vert:$0,sprite_frag:Z0},wt={common:{diffuse:{value:new _t(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ee},alphaMap:{value:null},alphaMapTransform:{value:new ee},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ee}},envmap:{envMap:{value:null},envMapRotation:{value:new ee},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ee}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ee}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ee},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ee},normalScale:{value:new Et(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ee},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ee}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ee}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ee}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new _t(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new _t(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ee},alphaTest:{value:0},uvTransform:{value:new ee}},sprite:{diffuse:{value:new _t(16777215)},opacity:{value:1},center:{value:new Et(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ee},alphaMap:{value:null},alphaMapTransform:{value:new ee},alphaTest:{value:0}}},si={basic:{uniforms:_n([wt.common,wt.specularmap,wt.envmap,wt.aomap,wt.lightmap,wt.fog]),vertexShader:ne.meshbasic_vert,fragmentShader:ne.meshbasic_frag},lambert:{uniforms:_n([wt.common,wt.specularmap,wt.envmap,wt.aomap,wt.lightmap,wt.emissivemap,wt.bumpmap,wt.normalmap,wt.displacementmap,wt.fog,wt.lights,{emissive:{value:new _t(0)}}]),vertexShader:ne.meshlambert_vert,fragmentShader:ne.meshlambert_frag},phong:{uniforms:_n([wt.common,wt.specularmap,wt.envmap,wt.aomap,wt.lightmap,wt.emissivemap,wt.bumpmap,wt.normalmap,wt.displacementmap,wt.fog,wt.lights,{emissive:{value:new _t(0)},specular:{value:new _t(1118481)},shininess:{value:30}}]),vertexShader:ne.meshphong_vert,fragmentShader:ne.meshphong_frag},standard:{uniforms:_n([wt.common,wt.envmap,wt.aomap,wt.lightmap,wt.emissivemap,wt.bumpmap,wt.normalmap,wt.displacementmap,wt.roughnessmap,wt.metalnessmap,wt.fog,wt.lights,{emissive:{value:new _t(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ne.meshphysical_vert,fragmentShader:ne.meshphysical_frag},toon:{uniforms:_n([wt.common,wt.aomap,wt.lightmap,wt.emissivemap,wt.bumpmap,wt.normalmap,wt.displacementmap,wt.gradientmap,wt.fog,wt.lights,{emissive:{value:new _t(0)}}]),vertexShader:ne.meshtoon_vert,fragmentShader:ne.meshtoon_frag},matcap:{uniforms:_n([wt.common,wt.bumpmap,wt.normalmap,wt.displacementmap,wt.fog,{matcap:{value:null}}]),vertexShader:ne.meshmatcap_vert,fragmentShader:ne.meshmatcap_frag},points:{uniforms:_n([wt.points,wt.fog]),vertexShader:ne.points_vert,fragmentShader:ne.points_frag},dashed:{uniforms:_n([wt.common,wt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ne.linedashed_vert,fragmentShader:ne.linedashed_frag},depth:{uniforms:_n([wt.common,wt.displacementmap]),vertexShader:ne.depth_vert,fragmentShader:ne.depth_frag},normal:{uniforms:_n([wt.common,wt.bumpmap,wt.normalmap,wt.displacementmap,{opacity:{value:1}}]),vertexShader:ne.meshnormal_vert,fragmentShader:ne.meshnormal_frag},sprite:{uniforms:_n([wt.sprite,wt.fog]),vertexShader:ne.sprite_vert,fragmentShader:ne.sprite_frag},background:{uniforms:{uvTransform:{value:new ee},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ne.background_vert,fragmentShader:ne.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ee}},vertexShader:ne.backgroundCube_vert,fragmentShader:ne.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ne.cube_vert,fragmentShader:ne.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ne.equirect_vert,fragmentShader:ne.equirect_frag},distanceRGBA:{uniforms:_n([wt.common,wt.displacementmap,{referencePosition:{value:new b},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ne.distanceRGBA_vert,fragmentShader:ne.distanceRGBA_frag},shadow:{uniforms:_n([wt.lights,wt.fog,{color:{value:new _t(0)},opacity:{value:1}}]),vertexShader:ne.shadow_vert,fragmentShader:ne.shadow_frag}};si.physical={uniforms:_n([si.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ee},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ee},clearcoatNormalScale:{value:new Et(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ee},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ee},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ee},sheen:{value:0},sheenColor:{value:new _t(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ee},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ee},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ee},transmissionSamplerSize:{value:new Et},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ee},attenuationDistance:{value:0},attenuationColor:{value:new _t(0)},specularColor:{value:new _t(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ee},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ee},anisotropyVector:{value:new Et},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ee}}]),vertexShader:ne.meshphysical_vert,fragmentShader:ne.meshphysical_frag};const rr={r:0,b:0,g:0},Zi=new jn,j0=new Ce;function K0(n,t,e,i,s,o,r){const a=new _t(0);let l=o===!0?0:1,c,u,d=null,h=0,p=null;function m(S){let w=S.isScene===!0?S.background:null;return w&&w.isTexture&&(w=(S.backgroundBlurriness>0?e:t).get(w)),w}function v(S){let w=!1;const E=m(S);E===null?f(a,l):E&&E.isColor&&(f(E,1),w=!0);const G=n.xr.getEnvironmentBlendMode();G==="additive"?i.buffers.color.setClear(0,0,0,1,r):G==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,r),(n.autoClear||w)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function g(S,w){const E=m(w);E&&(E.isCubeTexture||E.mapping===zr)?(u===void 0&&(u=new R(new ft(1,1,1),new fn({name:"BackgroundCubeMaterial",uniforms:Zs(si.backgroundCube.uniforms),vertexShader:si.backgroundCube.vertexShader,fragmentShader:si.backgroundCube.fragmentShader,side:pn,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(G,x,U){this.matrixWorld.copyPosition(U.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),Zi.copy(w.backgroundRotation),Zi.x*=-1,Zi.y*=-1,Zi.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(Zi.y*=-1,Zi.z*=-1),u.material.uniforms.envMap.value=E,u.material.uniforms.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(j0.makeRotationFromEuler(Zi)),u.material.toneMapped=pe.getTransfer(E.colorSpace)!==be,(d!==E||h!==E.version||p!==n.toneMapping)&&(u.material.needsUpdate=!0,d=E,h=E.version,p=n.toneMapping),u.layers.enableAll(),S.unshift(u,u.geometry,u.material,0,0,null)):E&&E.isTexture&&(c===void 0&&(c=new R(new Jt(2,2),new fn({name:"BackgroundMaterial",uniforms:Zs(si.background.uniforms),vertexShader:si.background.vertexShader,fragmentShader:si.background.fragmentShader,side:Gi,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=E,c.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,c.material.toneMapped=pe.getTransfer(E.colorSpace)!==be,E.matrixAutoUpdate===!0&&E.updateMatrix(),c.material.uniforms.uvTransform.value.copy(E.matrix),(d!==E||h!==E.version||p!==n.toneMapping)&&(c.material.needsUpdate=!0,d=E,h=E.version,p=n.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null))}function f(S,w){S.getRGB(rr,id(n)),i.buffers.color.setClear(rr.r,rr.g,rr.b,w,r)}return{getClearColor:function(){return a},setClearColor:function(S,w=1){a.set(S),l=w,f(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(S){l=S,f(a,l)},render:v,addToRenderList:g}}function J0(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=h(null);let o=s,r=!1;function a(M,I,k,F,Z){let et=!1;const J=d(F,k,I);o!==J&&(o=J,c(o.object)),et=p(M,F,k,Z),et&&m(M,F,k,Z),Z!==null&&t.update(Z,n.ELEMENT_ARRAY_BUFFER),(et||r)&&(r=!1,E(M,I,k,F),Z!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(Z).buffer))}function l(){return n.createVertexArray()}function c(M){return n.bindVertexArray(M)}function u(M){return n.deleteVertexArray(M)}function d(M,I,k){const F=k.wireframe===!0;let Z=i[M.id];Z===void 0&&(Z={},i[M.id]=Z);let et=Z[I.id];et===void 0&&(et={},Z[I.id]=et);let J=et[F];return J===void 0&&(J=h(l()),et[F]=J),J}function h(M){const I=[],k=[],F=[];for(let Z=0;Z<e;Z++)I[Z]=0,k[Z]=0,F[Z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:k,attributeDivisors:F,object:M,attributes:{},index:null}}function p(M,I,k,F){const Z=o.attributes,et=I.attributes;let J=0;const rt=k.getAttributes();for(const j in rt)if(rt[j].location>=0){const ht=Z[j];let Pt=et[j];if(Pt===void 0&&(j==="instanceMatrix"&&M.instanceMatrix&&(Pt=M.instanceMatrix),j==="instanceColor"&&M.instanceColor&&(Pt=M.instanceColor)),ht===void 0||ht.attribute!==Pt||Pt&&ht.data!==Pt.data)return!0;J++}return o.attributesNum!==J||o.index!==F}function m(M,I,k,F){const Z={},et=I.attributes;let J=0;const rt=k.getAttributes();for(const j in rt)if(rt[j].location>=0){let ht=et[j];ht===void 0&&(j==="instanceMatrix"&&M.instanceMatrix&&(ht=M.instanceMatrix),j==="instanceColor"&&M.instanceColor&&(ht=M.instanceColor));const Pt={};Pt.attribute=ht,ht&&ht.data&&(Pt.data=ht.data),Z[j]=Pt,J++}o.attributes=Z,o.attributesNum=J,o.index=F}function v(){const M=o.newAttributes;for(let I=0,k=M.length;I<k;I++)M[I]=0}function g(M){f(M,0)}function f(M,I){const k=o.newAttributes,F=o.enabledAttributes,Z=o.attributeDivisors;k[M]=1,F[M]===0&&(n.enableVertexAttribArray(M),F[M]=1),Z[M]!==I&&(n.vertexAttribDivisor(M,I),Z[M]=I)}function S(){const M=o.newAttributes,I=o.enabledAttributes;for(let k=0,F=I.length;k<F;k++)I[k]!==M[k]&&(n.disableVertexAttribArray(k),I[k]=0)}function w(M,I,k,F,Z,et,J){J===!0?n.vertexAttribIPointer(M,I,k,Z,et):n.vertexAttribPointer(M,I,k,F,Z,et)}function E(M,I,k,F){v();const Z=F.attributes,et=k.getAttributes(),J=I.defaultAttributeValues;for(const rt in et){const j=et[rt];if(j.location>=0){let gt=Z[rt];if(gt===void 0&&(rt==="instanceMatrix"&&M.instanceMatrix&&(gt=M.instanceMatrix),rt==="instanceColor"&&M.instanceColor&&(gt=M.instanceColor)),gt!==void 0){const ht=gt.normalized,Pt=gt.itemSize,Y=t.get(gt);if(Y===void 0)continue;const Ut=Y.buffer,L=Y.type,O=Y.bytesPerElement,st=L===n.INT||L===n.UNSIGNED_INT||gt.gpuType===Il;if(gt.isInterleavedBufferAttribute){const ct=gt.data,It=ct.stride,Vt=gt.offset;if(ct.isInstancedInterleavedBuffer){for(let Zt=0;Zt<j.locationSize;Zt++)f(j.location+Zt,ct.meshPerAttribute);M.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=ct.meshPerAttribute*ct.count)}else for(let Zt=0;Zt<j.locationSize;Zt++)g(j.location+Zt);n.bindBuffer(n.ARRAY_BUFFER,Ut);for(let Zt=0;Zt<j.locationSize;Zt++)w(j.location+Zt,Pt/j.locationSize,L,ht,It*O,(Vt+Pt/j.locationSize*Zt)*O,st)}else{if(gt.isInstancedBufferAttribute){for(let ct=0;ct<j.locationSize;ct++)f(j.location+ct,gt.meshPerAttribute);M.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=gt.meshPerAttribute*gt.count)}else for(let ct=0;ct<j.locationSize;ct++)g(j.location+ct);n.bindBuffer(n.ARRAY_BUFFER,Ut);for(let ct=0;ct<j.locationSize;ct++)w(j.location+ct,Pt/j.locationSize,L,ht,Pt*O,Pt/j.locationSize*ct*O,st)}}else if(J!==void 0){const ht=J[rt];if(ht!==void 0)switch(ht.length){case 2:n.vertexAttrib2fv(j.location,ht);break;case 3:n.vertexAttrib3fv(j.location,ht);break;case 4:n.vertexAttrib4fv(j.location,ht);break;default:n.vertexAttrib1fv(j.location,ht)}}}}S()}function G(){z();for(const M in i){const I=i[M];for(const k in I){const F=I[k];for(const Z in F)u(F[Z].object),delete F[Z];delete I[k]}delete i[M]}}function x(M){if(i[M.id]===void 0)return;const I=i[M.id];for(const k in I){const F=I[k];for(const Z in F)u(F[Z].object),delete F[Z];delete I[k]}delete i[M.id]}function U(M){for(const I in i){const k=i[I];if(k[M.id]===void 0)continue;const F=k[M.id];for(const Z in F)u(F[Z].object),delete F[Z];delete k[M.id]}}function z(){y(),r=!0,o!==s&&(o=s,c(o.object))}function y(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:z,resetDefaultState:y,dispose:G,releaseStatesOfGeometry:x,releaseStatesOfProgram:U,initAttributes:v,enableAttribute:g,disableUnusedAttributes:S}}function Q0(n,t,e){let i;function s(c){i=c}function o(c,u){n.drawArrays(i,c,u),e.update(u,i,1)}function r(c,u,d){d!==0&&(n.drawArraysInstanced(i,c,u,d),e.update(u,i,d))}function a(c,u,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,d);let p=0;for(let m=0;m<d;m++)p+=u[m];e.update(p,i,1)}function l(c,u,d,h){if(d===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<c.length;m++)r(c[m],u[m],h[m]);else{p.multiDrawArraysInstancedWEBGL(i,c,0,u,0,h,0,d);let m=0;for(let v=0;v<d;v++)m+=u[v]*h[v];e.update(m,i,1)}}this.setMode=s,this.render=o,this.renderInstances=r,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function tm(n,t,e,i){let s;function o(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const U=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(U.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function r(U){return!(U!==Xn&&i.convert(U)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(U){const z=U===xi&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(U!==bi&&i.convert(U)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&U!==_i&&!z)}function l(U){if(U==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";U="mediump"}return U==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const d=e.logarithmicDepthBuffer===!0,h=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),m=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),f=n.getParameter(n.MAX_VERTEX_ATTRIBS),S=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),w=n.getParameter(n.MAX_VARYING_VECTORS),E=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),G=m>0,x=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:o,getMaxPrecision:l,textureFormatReadable:r,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reverseDepthBuffer:h,maxTextures:p,maxVertexTextures:m,maxTextureSize:v,maxCubemapSize:g,maxAttributes:f,maxVertexUniforms:S,maxVaryings:w,maxFragmentUniforms:E,vertexTextures:G,maxSamples:x}}function em(n){const t=this;let e=null,i=0,s=!1,o=!1;const r=new es,a=new ee,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){const p=d.length!==0||h||i!==0||s;return s=h,i=d.length,p},this.beginShadows=function(){o=!0,u(null)},this.endShadows=function(){o=!1},this.setGlobalState=function(d,h){e=u(d,h,0)},this.setState=function(d,h,p){const m=d.clippingPlanes,v=d.clipIntersection,g=d.clipShadows,f=n.get(d);if(!s||m===null||m.length===0||o&&!g)o?u(null):c();else{const S=o?0:i,w=S*4;let E=f.clippingState||null;l.value=E,E=u(m,h,w,p);for(let G=0;G!==w;++G)E[G]=e[G];f.clippingState=E,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function u(d,h,p,m){const v=d!==null?d.length:0;let g=null;if(v!==0){if(g=l.value,m!==!0||g===null){const f=p+v*4,S=h.matrixWorldInverse;a.getNormalMatrix(S),(g===null||g.length<f)&&(g=new Float32Array(f));for(let w=0,E=p;w!==v;++w,E+=4)r.copy(d[w]).applyMatrix4(S,a),r.normal.toArray(g,E),g[E+3]=r.constant}l.value=g,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,g}}function nm(n){let t=new WeakMap;function e(r,a){return a===$a?r.mapping=qs:a===Za&&(r.mapping=Xs),r}function i(r){if(r&&r.isTexture){const a=r.mapping;if(a===$a||a===Za)if(t.has(r)){const l=t.get(r).texture;return e(l,r.mapping)}else{const l=r.image;if(l&&l.height>0){const c=new ff(l.height);return c.fromEquirectangularTexture(n,r),t.set(r,c),r.addEventListener("dispose",s),e(c.texture,r.mapping)}else return null}}return r}function s(r){const a=r.target;a.removeEventListener("dispose",s);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function o(){t=new WeakMap}return{get:i,dispose:o}}class Hl extends sd{constructor(t=-1,e=1,i=1,s=-1,o=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=o,this.far=r,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,o,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=o,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let o=i-t,r=i+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;o+=c*this.view.offsetX,r=o+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(o,r,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Fs=4,Lc=[.125,.215,.35,.446,.526,.582],os=20,pa=new Hl,Ic=new _t;let ma=null,ga=0,va=0,_a=!1;const ns=(1+Math.sqrt(5))/2,Ps=1/ns,Dc=[new b(-ns,Ps,0),new b(ns,Ps,0),new b(-Ps,0,ns),new b(Ps,0,ns),new b(0,ns,-Ps),new b(0,ns,Ps),new b(-1,1,-1),new b(1,1,-1),new b(-1,1,1),new b(1,1,1)];class Uc{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,s=100){ma=this._renderer.getRenderTarget(),ga=this._renderer.getActiveCubeFace(),va=this._renderer.getActiveMipmapLevel(),_a=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const o=this._allocateTargets();return o.depthBuffer=!0,this._sceneToCubeUV(t,i,s,o),e>0&&this._blur(o,0,0,e),this._applyPMREM(o),this._cleanup(o),o}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Fc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=zc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(ma,ga,va),this._renderer.xr.enabled=_a,t.scissorTest=!1,ar(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===qs||t.mapping===Xs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),ma=this._renderer.getRenderTarget(),ga=this._renderer.getActiveCubeFace(),va=this._renderer.getActiveMipmapLevel(),_a=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:oi,minFilter:oi,generateMipmaps:!1,type:xi,format:Xn,colorSpace:Qs,depthBuffer:!1},s=Nc(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Nc(t,e,i);const{_lodMax:o}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=im(o)),this._blurMaterial=sm(o,t,e)}return s}_compileMaterial(t){const e=new R(this._lodPlanes[0],t);this._renderer.compile(e,pa)}_sceneToCubeUV(t,e,i,s){const a=new Ue(90,1,e,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,h=u.toneMapping;u.getClearColor(Ic),u.toneMapping=ki,u.autoClear=!1;const p=new Be({name:"PMREM.Background",side:pn,depthWrite:!1,depthTest:!1}),m=new R(new ft,p);let v=!1;const g=t.background;g?g.isColor&&(p.color.copy(g),t.background=null,v=!0):(p.color.copy(Ic),v=!0);for(let f=0;f<6;f++){const S=f%3;S===0?(a.up.set(0,l[f],0),a.lookAt(c[f],0,0)):S===1?(a.up.set(0,0,l[f]),a.lookAt(0,c[f],0)):(a.up.set(0,l[f],0),a.lookAt(0,0,c[f]));const w=this._cubeSize;ar(s,S*w,f>2?w:0,w,w),u.setRenderTarget(s),v&&u.render(m,a),u.render(t,a)}m.geometry.dispose(),m.material.dispose(),u.toneMapping=h,u.autoClear=d,t.background=g}_textureToCubeUV(t,e){const i=this._renderer,s=t.mapping===qs||t.mapping===Xs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Fc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=zc());const o=s?this._cubemapMaterial:this._equirectMaterial,r=new R(this._lodPlanes[0],o),a=o.uniforms;a.envMap.value=t;const l=this._cubeSize;ar(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(r,pa)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let o=1;o<s;o++){const r=Math.sqrt(this._sigmas[o]*this._sigmas[o]-this._sigmas[o-1]*this._sigmas[o-1]),a=Dc[(s-o-1)%Dc.length];this._blur(t,o-1,o,r,a)}e.autoClear=i}_blur(t,e,i,s,o){const r=this._pingPongRenderTarget;this._halfBlur(t,r,e,i,s,"latitudinal",o),this._halfBlur(r,t,i,i,s,"longitudinal",o)}_halfBlur(t,e,i,s,o,r,a){const l=this._renderer,c=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,d=new R(this._lodPlanes[s],c),h=c.uniforms,p=this._sizeLods[i]-1,m=isFinite(o)?Math.PI/(2*p):2*Math.PI/(2*os-1),v=o/m,g=isFinite(o)?1+Math.floor(u*v):os;g>os&&console.warn(`sigmaRadians, ${o}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${os}`);const f=[];let S=0;for(let U=0;U<os;++U){const z=U/v,y=Math.exp(-z*z/2);f.push(y),U===0?S+=y:U<g&&(S+=2*y)}for(let U=0;U<f.length;U++)f[U]=f[U]/S;h.envMap.value=t.texture,h.samples.value=g,h.weights.value=f,h.latitudinal.value=r==="latitudinal",a&&(h.poleAxis.value=a);const{_lodMax:w}=this;h.dTheta.value=m,h.mipInt.value=w-i;const E=this._sizeLods[s],G=3*E*(s>w-Fs?s-w+Fs:0),x=4*(this._cubeSize-E);ar(e,G,x,3*E,2*E),l.setRenderTarget(e),l.render(d,pa)}}function im(n){const t=[],e=[],i=[];let s=n;const o=n-Fs+1+Lc.length;for(let r=0;r<o;r++){const a=Math.pow(2,s);e.push(a);let l=1/a;r>n-Fs?l=Lc[r-n+Fs-1]:r===0&&(l=0),i.push(l);const c=1/(a-2),u=-c,d=1+c,h=[u,u,d,u,d,d,u,u,d,d,u,d],p=6,m=6,v=3,g=2,f=1,S=new Float32Array(v*m*p),w=new Float32Array(g*m*p),E=new Float32Array(f*m*p);for(let x=0;x<p;x++){const U=x%3*2/3-1,z=x>2?0:-1,y=[U,z,0,U+2/3,z,0,U+2/3,z+1,0,U,z,0,U+2/3,z+1,0,U,z+1,0];S.set(y,v*m*x),w.set(h,g*m*x);const M=[x,x,x,x,x,x];E.set(M,f*m*x)}const G=new Le;G.setAttribute("position",new Ve(S,v)),G.setAttribute("uv",new Ve(w,g)),G.setAttribute("faceIndex",new Ve(E,f)),t.push(G),s>Fs&&s--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function Nc(n,t,e){const i=new Zn(n,t,e);return i.texture.mapping=zr,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ar(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function sm(n,t,e){const i=new Float32Array(os),s=new b(0,1,0);return new fn({name:"SphericalGaussianBlur",defines:{n:os,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Vl(),fragmentShader:`

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
		`,blending:yi,depthTest:!1,depthWrite:!1})}function zc(){return new fn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Vl(),fragmentShader:`

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
		`,blending:yi,depthTest:!1,depthWrite:!1})}function Fc(){return new fn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Vl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:yi,depthTest:!1,depthWrite:!1})}function Vl(){return`

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
	`}function om(n){let t=new WeakMap,e=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===$a||l===Za,u=l===qs||l===Xs;if(c||u){let d=t.get(a);const h=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==h)return e===null&&(e=new Uc(n)),d=c?e.fromEquirectangular(a,d):e.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,t.set(a,d),d.texture;if(d!==void 0)return d.texture;{const p=a.image;return c&&p&&p.height>0||u&&p&&s(p)?(e===null&&(e=new Uc(n)),d=c?e.fromEquirectangular(a):e.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,t.set(a,d),a.addEventListener("dispose",o),d.texture):null}}}return a}function s(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function o(a){const l=a.target;l.removeEventListener("dispose",o);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function r(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:r}}function rm(n){const t={};function e(i){if(t[i]!==void 0)return t[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const s=e(i);return s===null&&Mo("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function am(n,t,e,i){const s={},o=new WeakMap;function r(d){const h=d.target;h.index!==null&&t.remove(h.index);for(const m in h.attributes)t.remove(h.attributes[m]);for(const m in h.morphAttributes){const v=h.morphAttributes[m];for(let g=0,f=v.length;g<f;g++)t.remove(v[g])}h.removeEventListener("dispose",r),delete s[h.id];const p=o.get(h);p&&(t.remove(p),o.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,e.memory.geometries--}function a(d,h){return s[h.id]===!0||(h.addEventListener("dispose",r),s[h.id]=!0,e.memory.geometries++),h}function l(d){const h=d.attributes;for(const m in h)t.update(h[m],n.ARRAY_BUFFER);const p=d.morphAttributes;for(const m in p){const v=p[m];for(let g=0,f=v.length;g<f;g++)t.update(v[g],n.ARRAY_BUFFER)}}function c(d){const h=[],p=d.index,m=d.attributes.position;let v=0;if(p!==null){const S=p.array;v=p.version;for(let w=0,E=S.length;w<E;w+=3){const G=S[w+0],x=S[w+1],U=S[w+2];h.push(G,x,x,U,U,G)}}else if(m!==void 0){const S=m.array;v=m.version;for(let w=0,E=S.length/3-1;w<E;w+=3){const G=w+0,x=w+1,U=w+2;h.push(G,x,x,U,U,G)}}else return;const g=new(Ku(h)?nd:ed)(h,1);g.version=v;const f=o.get(d);f&&t.remove(f),o.set(d,g)}function u(d){const h=o.get(d);if(h){const p=d.index;p!==null&&h.version<p.version&&c(d)}else c(d);return o.get(d)}return{get:a,update:l,getWireframeAttribute:u}}function lm(n,t,e){let i;function s(h){i=h}let o,r;function a(h){o=h.type,r=h.bytesPerElement}function l(h,p){n.drawElements(i,p,o,h*r),e.update(p,i,1)}function c(h,p,m){m!==0&&(n.drawElementsInstanced(i,p,o,h*r,m),e.update(p,i,m))}function u(h,p,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,o,h,0,m);let g=0;for(let f=0;f<m;f++)g+=p[f];e.update(g,i,1)}function d(h,p,m,v){if(m===0)return;const g=t.get("WEBGL_multi_draw");if(g===null)for(let f=0;f<h.length;f++)c(h[f]/r,p[f],v[f]);else{g.multiDrawElementsInstancedWEBGL(i,p,0,o,h,0,v,0,m);let f=0;for(let S=0;S<m;S++)f+=p[S]*v[S];e.update(f,i,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function cm(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(o,r,a){switch(e.calls++,r){case n.TRIANGLES:e.triangles+=a*(o/3);break;case n.LINES:e.lines+=a*(o/2);break;case n.LINE_STRIP:e.lines+=a*(o-1);break;case n.LINE_LOOP:e.lines+=a*o;break;case n.POINTS:e.points+=a*o;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",r);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function um(n,t,e){const i=new WeakMap,s=new Ae;function o(r,a,l){const c=r.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0;let h=i.get(a);if(h===void 0||h.count!==d){let M=function(){z.dispose(),i.delete(a),a.removeEventListener("dispose",M)};var p=M;h!==void 0&&h.texture.dispose();const m=a.morphAttributes.position!==void 0,v=a.morphAttributes.normal!==void 0,g=a.morphAttributes.color!==void 0,f=a.morphAttributes.position||[],S=a.morphAttributes.normal||[],w=a.morphAttributes.color||[];let E=0;m===!0&&(E=1),v===!0&&(E=2),g===!0&&(E=3);let G=a.attributes.position.count*E,x=1;G>t.maxTextureSize&&(x=Math.ceil(G/t.maxTextureSize),G=t.maxTextureSize);const U=new Float32Array(G*x*4*d),z=new Qu(U,G,x,d);z.type=_i,z.needsUpdate=!0;const y=E*4;for(let I=0;I<d;I++){const k=f[I],F=S[I],Z=w[I],et=G*x*4*I;for(let J=0;J<k.count;J++){const rt=J*y;m===!0&&(s.fromBufferAttribute(k,J),U[et+rt+0]=s.x,U[et+rt+1]=s.y,U[et+rt+2]=s.z,U[et+rt+3]=0),v===!0&&(s.fromBufferAttribute(F,J),U[et+rt+4]=s.x,U[et+rt+5]=s.y,U[et+rt+6]=s.z,U[et+rt+7]=0),g===!0&&(s.fromBufferAttribute(Z,J),U[et+rt+8]=s.x,U[et+rt+9]=s.y,U[et+rt+10]=s.z,U[et+rt+11]=Z.itemSize===4?s.w:1)}}h={count:d,texture:z,size:new Et(G,x)},i.set(a,h),a.addEventListener("dispose",M)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",r.morphTexture,e);else{let m=0;for(let g=0;g<c.length;g++)m+=c[g];const v=a.morphTargetsRelative?1:1-m;l.getUniforms().setValue(n,"morphTargetBaseInfluence",v),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",h.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:o}}function dm(n,t,e,i){let s=new WeakMap;function o(l){const c=i.render.frame,u=l.geometry,d=t.get(l,u);if(s.get(d)!==c&&(t.update(d),s.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const h=l.skeleton;s.get(h)!==c&&(h.update(),s.set(h,c))}return d}function r(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:o,dispose:r}}class ad extends yn{constructor(t,e,i,s,o,r,a,l,c,u=ks){if(u!==ks&&u!==$s)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===ks&&(i=us),i===void 0&&u===$s&&(i=Ys),super(null,s,o,r,a,l,u,i,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:$n,this.minFilter=l!==void 0?l:$n,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const ld=new yn,Oc=new ad(1,1),cd=new Qu,ud=new Kh,dd=new od,Bc=[],kc=[],Gc=new Float32Array(16),Hc=new Float32Array(9),Vc=new Float32Array(4);function eo(n,t,e){const i=n[0];if(i<=0||i>0)return n;const s=t*e;let o=Bc[s];if(o===void 0&&(o=new Float32Array(s),Bc[s]=o),t!==0){i.toArray(o,0);for(let r=1,a=0;r!==t;++r)a+=e,n[r].toArray(o,a)}return o}function je(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function Ke(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function Br(n,t){let e=kc[t];e===void 0&&(e=new Int32Array(t),kc[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function hm(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function fm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(je(e,t))return;n.uniform2fv(this.addr,t),Ke(e,t)}}function pm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(je(e,t))return;n.uniform3fv(this.addr,t),Ke(e,t)}}function mm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(je(e,t))return;n.uniform4fv(this.addr,t),Ke(e,t)}}function gm(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(je(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),Ke(e,t)}else{if(je(e,i))return;Vc.set(i),n.uniformMatrix2fv(this.addr,!1,Vc),Ke(e,i)}}function vm(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(je(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),Ke(e,t)}else{if(je(e,i))return;Hc.set(i),n.uniformMatrix3fv(this.addr,!1,Hc),Ke(e,i)}}function _m(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(je(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),Ke(e,t)}else{if(je(e,i))return;Gc.set(i),n.uniformMatrix4fv(this.addr,!1,Gc),Ke(e,i)}}function Mm(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function ym(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(je(e,t))return;n.uniform2iv(this.addr,t),Ke(e,t)}}function xm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(je(e,t))return;n.uniform3iv(this.addr,t),Ke(e,t)}}function Sm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(je(e,t))return;n.uniform4iv(this.addr,t),Ke(e,t)}}function wm(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function bm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(je(e,t))return;n.uniform2uiv(this.addr,t),Ke(e,t)}}function Em(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(je(e,t))return;n.uniform3uiv(this.addr,t),Ke(e,t)}}function Tm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(je(e,t))return;n.uniform4uiv(this.addr,t),Ke(e,t)}}function Am(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let o;this.type===n.SAMPLER_2D_SHADOW?(Oc.compareFunction=ju,o=Oc):o=ld,e.setTexture2D(t||o,s)}function Cm(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||ud,s)}function Rm(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||dd,s)}function Pm(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||cd,s)}function Lm(n){switch(n){case 5126:return hm;case 35664:return fm;case 35665:return pm;case 35666:return mm;case 35674:return gm;case 35675:return vm;case 35676:return _m;case 5124:case 35670:return Mm;case 35667:case 35671:return ym;case 35668:case 35672:return xm;case 35669:case 35673:return Sm;case 5125:return wm;case 36294:return bm;case 36295:return Em;case 36296:return Tm;case 35678:case 36198:case 36298:case 36306:case 35682:return Am;case 35679:case 36299:case 36307:return Cm;case 35680:case 36300:case 36308:case 36293:return Rm;case 36289:case 36303:case 36311:case 36292:return Pm}}function Im(n,t){n.uniform1fv(this.addr,t)}function Dm(n,t){const e=eo(t,this.size,2);n.uniform2fv(this.addr,e)}function Um(n,t){const e=eo(t,this.size,3);n.uniform3fv(this.addr,e)}function Nm(n,t){const e=eo(t,this.size,4);n.uniform4fv(this.addr,e)}function zm(n,t){const e=eo(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function Fm(n,t){const e=eo(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function Om(n,t){const e=eo(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function Bm(n,t){n.uniform1iv(this.addr,t)}function km(n,t){n.uniform2iv(this.addr,t)}function Gm(n,t){n.uniform3iv(this.addr,t)}function Hm(n,t){n.uniform4iv(this.addr,t)}function Vm(n,t){n.uniform1uiv(this.addr,t)}function Wm(n,t){n.uniform2uiv(this.addr,t)}function qm(n,t){n.uniform3uiv(this.addr,t)}function Xm(n,t){n.uniform4uiv(this.addr,t)}function Ym(n,t,e){const i=this.cache,s=t.length,o=Br(e,s);je(i,o)||(n.uniform1iv(this.addr,o),Ke(i,o));for(let r=0;r!==s;++r)e.setTexture2D(t[r]||ld,o[r])}function $m(n,t,e){const i=this.cache,s=t.length,o=Br(e,s);je(i,o)||(n.uniform1iv(this.addr,o),Ke(i,o));for(let r=0;r!==s;++r)e.setTexture3D(t[r]||ud,o[r])}function Zm(n,t,e){const i=this.cache,s=t.length,o=Br(e,s);je(i,o)||(n.uniform1iv(this.addr,o),Ke(i,o));for(let r=0;r!==s;++r)e.setTextureCube(t[r]||dd,o[r])}function jm(n,t,e){const i=this.cache,s=t.length,o=Br(e,s);je(i,o)||(n.uniform1iv(this.addr,o),Ke(i,o));for(let r=0;r!==s;++r)e.setTexture2DArray(t[r]||cd,o[r])}function Km(n){switch(n){case 5126:return Im;case 35664:return Dm;case 35665:return Um;case 35666:return Nm;case 35674:return zm;case 35675:return Fm;case 35676:return Om;case 5124:case 35670:return Bm;case 35667:case 35671:return km;case 35668:case 35672:return Gm;case 35669:case 35673:return Hm;case 5125:return Vm;case 36294:return Wm;case 36295:return qm;case 36296:return Xm;case 35678:case 36198:case 36298:case 36306:case 35682:return Ym;case 35679:case 36299:case 36307:return $m;case 35680:case 36300:case 36308:case 36293:return Zm;case 36289:case 36303:case 36311:case 36292:return jm}}class Jm{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=Lm(e.type)}}class Qm{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Km(e.type)}}class tg{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const s=this.seq;for(let o=0,r=s.length;o!==r;++o){const a=s[o];a.setValue(t,e[a.id],i)}}}const Ma=/(\w+)(\])?(\[|\.)?/g;function Wc(n,t){n.seq.push(t),n.map[t.id]=t}function eg(n,t,e){const i=n.name,s=i.length;for(Ma.lastIndex=0;;){const o=Ma.exec(i),r=Ma.lastIndex;let a=o[1];const l=o[2]==="]",c=o[3];if(l&&(a=a|0),c===void 0||c==="["&&r+2===s){Wc(e,c===void 0?new Jm(a,n,t):new Qm(a,n,t));break}else{let d=e.map[a];d===void 0&&(d=new tg(a),Wc(e,d)),e=d}}}class wr{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const o=t.getActiveUniform(e,s),r=t.getUniformLocation(e,o.name);eg(o,r,this)}}setValue(t,e,i,s){const o=this.map[e];o!==void 0&&o.setValue(t,i,s)}setOptional(t,e,i){const s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let o=0,r=e.length;o!==r;++o){const a=e[o],l=i[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){const i=[];for(let s=0,o=t.length;s!==o;++s){const r=t[s];r.id in e&&i.push(r)}return i}}function qc(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const ng=37297;let ig=0;function sg(n,t){const e=n.split(`
`),i=[],s=Math.max(t-6,0),o=Math.min(t+6,e.length);for(let r=s;r<o;r++){const a=r+1;i.push(`${a===t?">":" "} ${a}: ${e[r]}`)}return i.join(`
`)}const Xc=new ee;function og(n){pe._getMatrix(Xc,pe.workingColorSpace,n);const t=`mat3( ${Xc.elements.map(e=>e.toFixed(4))} )`;switch(pe.getTransfer(n)){case Fr:return[t,"LinearTransferOETF"];case be:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function Yc(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),s=n.getShaderInfoLog(t).trim();if(i&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const r=parseInt(o[1]);return e.toUpperCase()+`

`+s+`

`+sg(n.getShaderSource(t),r)}else return s}function rg(n,t){const e=og(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function ag(n,t){let e;switch(t){case Uu:e="Linear";break;case Nu:e="Reinhard";break;case zu:e="Cineon";break;case Io:e="ACESFilmic";break;case Fu:e="AgX";break;case Ou:e="Neutral";break;case mh:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const lr=new b;function lg(){pe.getLuminanceCoefficients(lr);const n=lr.x.toFixed(4),t=lr.y.toFixed(4),e=lr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function cg(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(yo).join(`
`)}function ug(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function dg(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const o=n.getActiveAttrib(t,s),r=o.name;let a=1;o.type===n.FLOAT_MAT2&&(a=2),o.type===n.FLOAT_MAT3&&(a=3),o.type===n.FLOAT_MAT4&&(a=4),e[r]={type:o.type,location:n.getAttribLocation(t,r),locationSize:a}}return e}function yo(n){return n!==""}function $c(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Zc(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const hg=/^[ \t]*#include +<([\w\d./]+)>/gm;function bl(n){return n.replace(hg,pg)}const fg=new Map;function pg(n,t){let e=ne[t];if(e===void 0){const i=fg.get(t);if(i!==void 0)e=ne[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return bl(e)}const mg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function jc(n){return n.replace(mg,gg)}function gg(n,t,e,i){let s="";for(let o=parseInt(t);o<parseInt(e);o++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+o+" ]").replace(/UNROLLED_LOOP_INDEX/g,o);return s}function Kc(n){let t=`precision ${n.precision} float;
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
#define LOW_PRECISION`),t}function vg(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Rl?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===Pl?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===mi&&(t="SHADOWMAP_TYPE_VSM"),t}function _g(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case qs:case Xs:t="ENVMAP_TYPE_CUBE";break;case zr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Mg(n){let t="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Xs:t="ENVMAP_MODE_REFRACTION";break}return t}function yg(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Ll:t="ENVMAP_BLENDING_MULTIPLY";break;case fh:t="ENVMAP_BLENDING_MIX";break;case ph:t="ENVMAP_BLENDING_ADD";break}return t}function xg(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:i,maxMip:e}}function Sg(n,t,e,i){const s=n.getContext(),o=e.defines;let r=e.vertexShader,a=e.fragmentShader;const l=vg(e),c=_g(e),u=Mg(e),d=yg(e),h=xg(e),p=cg(e),m=ug(o),v=s.createProgram();let g,f,S=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(yo).join(`
`),g.length>0&&(g+=`
`),f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(yo).join(`
`),f.length>0&&(f+=`
`)):(g=[Kc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(yo).join(`
`),f=[Kc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==ki?"#define TONE_MAPPING":"",e.toneMapping!==ki?ne.tonemapping_pars_fragment:"",e.toneMapping!==ki?ag("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",ne.colorspace_pars_fragment,rg("linearToOutputTexel",e.outputColorSpace),lg(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(yo).join(`
`)),r=bl(r),r=$c(r,e),r=Zc(r,e),a=bl(a),a=$c(a,e),a=Zc(a,e),r=jc(r),a=jc(a),e.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,g=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,f=["#define varying in",e.glslVersion===cc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===cc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const w=S+g+r,E=S+f+a,G=qc(s,s.VERTEX_SHADER,w),x=qc(s,s.FRAGMENT_SHADER,E);s.attachShader(v,G),s.attachShader(v,x),e.index0AttributeName!==void 0?s.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function U(I){if(n.debug.checkShaderErrors){const k=s.getProgramInfoLog(v).trim(),F=s.getShaderInfoLog(G).trim(),Z=s.getShaderInfoLog(x).trim();let et=!0,J=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(et=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,v,G,x);else{const rt=Yc(s,G,"vertex"),j=Yc(s,x,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+k+`
`+rt+`
`+j)}else k!==""?console.warn("THREE.WebGLProgram: Program Info Log:",k):(F===""||Z==="")&&(J=!1);J&&(I.diagnostics={runnable:et,programLog:k,vertexShader:{log:F,prefix:g},fragmentShader:{log:Z,prefix:f}})}s.deleteShader(G),s.deleteShader(x),z=new wr(s,v),y=dg(s,v)}let z;this.getUniforms=function(){return z===void 0&&U(this),z};let y;this.getAttributes=function(){return y===void 0&&U(this),y};let M=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=s.getProgramParameter(v,ng)),M},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=ig++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=G,this.fragmentShader=x,this}let wg=0;class bg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(e),o=this._getShaderStage(i),r=this._getShaderCacheForMaterial(t);return r.has(s)===!1&&(r.add(s),s.usedTimes++),r.has(o)===!1&&(r.add(o),o.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new Eg(t),e.set(t,i)),i}}class Eg{constructor(t){this.id=wg++,this.code=t,this.usedTimes=0}}function Tg(n,t,e,i,s,o,r){const a=new kl,l=new bg,c=new Set,u=[],d=s.logarithmicDepthBuffer,h=s.vertexTextures;let p=s.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(y){return c.add(y),y===0?"uv":`uv${y}`}function g(y,M,I,k,F){const Z=k.fog,et=F.geometry,J=y.isMeshStandardMaterial?k.environment:null,rt=(y.isMeshStandardMaterial?e:t).get(y.envMap||J),j=rt&&rt.mapping===zr?rt.image.height:null,gt=m[y.type];y.precision!==null&&(p=s.getMaxPrecision(y.precision),p!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",p,"instead."));const ht=et.morphAttributes.position||et.morphAttributes.normal||et.morphAttributes.color,Pt=ht!==void 0?ht.length:0;let Y=0;et.morphAttributes.position!==void 0&&(Y=1),et.morphAttributes.normal!==void 0&&(Y=2),et.morphAttributes.color!==void 0&&(Y=3);let Ut,L,O,st;if(gt){const ve=si[gt];Ut=ve.vertexShader,L=ve.fragmentShader}else Ut=y.vertexShader,L=y.fragmentShader,l.update(y),O=l.getVertexShaderID(y),st=l.getFragmentShaderID(y);const ct=n.getRenderTarget(),It=n.state.buffers.depth.getReversed(),Vt=F.isInstancedMesh===!0,Zt=F.isBatchedMesh===!0,ge=!!y.map,re=!!y.matcap,Ie=!!rt,X=!!y.aoMap,mn=!!y.lightMap,ae=!!y.bumpMap,le=!!y.normalMap,Xt=!!y.displacementMap,Te=!!y.emissiveMap,Yt=!!y.metalnessMap,N=!!y.roughnessMap,T=y.anisotropy>0,Q=y.clearcoat>0,ut=y.dispersion>0,dt=y.iridescence>0,lt=y.sheen>0,Gt=y.transmission>0,xt=T&&!!y.anisotropyMap,zt=Q&&!!y.clearcoatMap,oe=Q&&!!y.clearcoatNormalMap,mt=Q&&!!y.clearcoatRoughnessMap,Lt=dt&&!!y.iridescenceMap,qt=dt&&!!y.iridescenceThicknessMap,Kt=lt&&!!y.sheenColorMap,Ft=lt&&!!y.sheenRoughnessMap,de=!!y.specularMap,te=!!y.specularColorMap,ye=!!y.specularIntensityMap,V=Gt&&!!y.transmissionMap,Tt=Gt&&!!y.thicknessMap,ot=!!y.gradientMap,at=!!y.alphaMap,Rt=y.alphaTest>0,At=!!y.alphaHash,Qt=!!y.extensions;let Oe=ki;y.toneMapped&&(ct===null||ct.isXRRenderTarget===!0)&&(Oe=n.toneMapping);const sn={shaderID:gt,shaderType:y.type,shaderName:y.name,vertexShader:Ut,fragmentShader:L,defines:y.defines,customVertexShaderID:O,customFragmentShaderID:st,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:p,batching:Zt,batchingColor:Zt&&F._colorsTexture!==null,instancing:Vt,instancingColor:Vt&&F.instanceColor!==null,instancingMorph:Vt&&F.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:ct===null?n.outputColorSpace:ct.isXRRenderTarget===!0?ct.texture.colorSpace:Qs,alphaToCoverage:!!y.alphaToCoverage,map:ge,matcap:re,envMap:Ie,envMapMode:Ie&&rt.mapping,envMapCubeUVHeight:j,aoMap:X,lightMap:mn,bumpMap:ae,normalMap:le,displacementMap:h&&Xt,emissiveMap:Te,normalMapObjectSpace:le&&y.normalMapType===Mh,normalMapTangentSpace:le&&y.normalMapType===Ol,metalnessMap:Yt,roughnessMap:N,anisotropy:T,anisotropyMap:xt,clearcoat:Q,clearcoatMap:zt,clearcoatNormalMap:oe,clearcoatRoughnessMap:mt,dispersion:ut,iridescence:dt,iridescenceMap:Lt,iridescenceThicknessMap:qt,sheen:lt,sheenColorMap:Kt,sheenRoughnessMap:Ft,specularMap:de,specularColorMap:te,specularIntensityMap:ye,transmission:Gt,transmissionMap:V,thicknessMap:Tt,gradientMap:ot,opaque:y.transparent===!1&&y.blending===ls&&y.alphaToCoverage===!1,alphaMap:at,alphaTest:Rt,alphaHash:At,combine:y.combine,mapUv:ge&&v(y.map.channel),aoMapUv:X&&v(y.aoMap.channel),lightMapUv:mn&&v(y.lightMap.channel),bumpMapUv:ae&&v(y.bumpMap.channel),normalMapUv:le&&v(y.normalMap.channel),displacementMapUv:Xt&&v(y.displacementMap.channel),emissiveMapUv:Te&&v(y.emissiveMap.channel),metalnessMapUv:Yt&&v(y.metalnessMap.channel),roughnessMapUv:N&&v(y.roughnessMap.channel),anisotropyMapUv:xt&&v(y.anisotropyMap.channel),clearcoatMapUv:zt&&v(y.clearcoatMap.channel),clearcoatNormalMapUv:oe&&v(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:mt&&v(y.clearcoatRoughnessMap.channel),iridescenceMapUv:Lt&&v(y.iridescenceMap.channel),iridescenceThicknessMapUv:qt&&v(y.iridescenceThicknessMap.channel),sheenColorMapUv:Kt&&v(y.sheenColorMap.channel),sheenRoughnessMapUv:Ft&&v(y.sheenRoughnessMap.channel),specularMapUv:de&&v(y.specularMap.channel),specularColorMapUv:te&&v(y.specularColorMap.channel),specularIntensityMapUv:ye&&v(y.specularIntensityMap.channel),transmissionMapUv:V&&v(y.transmissionMap.channel),thicknessMapUv:Tt&&v(y.thicknessMap.channel),alphaMapUv:at&&v(y.alphaMap.channel),vertexTangents:!!et.attributes.tangent&&(le||T),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!et.attributes.color&&et.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!et.attributes.uv&&(ge||at),fog:!!Z,useFog:y.fog===!0,fogExp2:!!Z&&Z.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:It,skinning:F.isSkinnedMesh===!0,morphTargets:et.morphAttributes.position!==void 0,morphNormals:et.morphAttributes.normal!==void 0,morphColors:et.morphAttributes.color!==void 0,morphTargetsCount:Pt,morphTextureStride:Y,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:y.dithering,shadowMapEnabled:n.shadowMap.enabled&&I.length>0,shadowMapType:n.shadowMap.type,toneMapping:Oe,decodeVideoTexture:ge&&y.map.isVideoTexture===!0&&pe.getTransfer(y.map.colorSpace)===be,decodeVideoTextureEmissive:Te&&y.emissiveMap.isVideoTexture===!0&&pe.getTransfer(y.emissiveMap.colorSpace)===be,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Ge,flipSided:y.side===pn,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:Qt&&y.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Qt&&y.extensions.multiDraw===!0||Zt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return sn.vertexUv1s=c.has(1),sn.vertexUv2s=c.has(2),sn.vertexUv3s=c.has(3),c.clear(),sn}function f(y){const M=[];if(y.shaderID?M.push(y.shaderID):(M.push(y.customVertexShaderID),M.push(y.customFragmentShaderID)),y.defines!==void 0)for(const I in y.defines)M.push(I),M.push(y.defines[I]);return y.isRawShaderMaterial===!1&&(S(M,y),w(M,y),M.push(n.outputColorSpace)),M.push(y.customProgramCacheKey),M.join()}function S(y,M){y.push(M.precision),y.push(M.outputColorSpace),y.push(M.envMapMode),y.push(M.envMapCubeUVHeight),y.push(M.mapUv),y.push(M.alphaMapUv),y.push(M.lightMapUv),y.push(M.aoMapUv),y.push(M.bumpMapUv),y.push(M.normalMapUv),y.push(M.displacementMapUv),y.push(M.emissiveMapUv),y.push(M.metalnessMapUv),y.push(M.roughnessMapUv),y.push(M.anisotropyMapUv),y.push(M.clearcoatMapUv),y.push(M.clearcoatNormalMapUv),y.push(M.clearcoatRoughnessMapUv),y.push(M.iridescenceMapUv),y.push(M.iridescenceThicknessMapUv),y.push(M.sheenColorMapUv),y.push(M.sheenRoughnessMapUv),y.push(M.specularMapUv),y.push(M.specularColorMapUv),y.push(M.specularIntensityMapUv),y.push(M.transmissionMapUv),y.push(M.thicknessMapUv),y.push(M.combine),y.push(M.fogExp2),y.push(M.sizeAttenuation),y.push(M.morphTargetsCount),y.push(M.morphAttributeCount),y.push(M.numDirLights),y.push(M.numPointLights),y.push(M.numSpotLights),y.push(M.numSpotLightMaps),y.push(M.numHemiLights),y.push(M.numRectAreaLights),y.push(M.numDirLightShadows),y.push(M.numPointLightShadows),y.push(M.numSpotLightShadows),y.push(M.numSpotLightShadowsWithMaps),y.push(M.numLightProbes),y.push(M.shadowMapType),y.push(M.toneMapping),y.push(M.numClippingPlanes),y.push(M.numClipIntersection),y.push(M.depthPacking)}function w(y,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),y.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reverseDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),y.push(a.mask)}function E(y){const M=m[y.type];let I;if(M){const k=si[M];I=Po.clone(k.uniforms)}else I=y.uniforms;return I}function G(y,M){let I;for(let k=0,F=u.length;k<F;k++){const Z=u[k];if(Z.cacheKey===M){I=Z,++I.usedTimes;break}}return I===void 0&&(I=new Sg(n,M,y,o),u.push(I)),I}function x(y){if(--y.usedTimes===0){const M=u.indexOf(y);u[M]=u[u.length-1],u.pop(),y.destroy()}}function U(y){l.remove(y)}function z(){l.dispose()}return{getParameters:g,getProgramCacheKey:f,getUniforms:E,acquireProgram:G,releaseProgram:x,releaseShaderCache:U,programs:u,dispose:z}}function Ag(){let n=new WeakMap;function t(r){return n.has(r)}function e(r){let a=n.get(r);return a===void 0&&(a={},n.set(r,a)),a}function i(r){n.delete(r)}function s(r,a,l){n.get(r)[a]=l}function o(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:o}}function Cg(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function Jc(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function Qc(){const n=[];let t=0;const e=[],i=[],s=[];function o(){t=0,e.length=0,i.length=0,s.length=0}function r(d,h,p,m,v,g){let f=n[t];return f===void 0?(f={id:d.id,object:d,geometry:h,material:p,groupOrder:m,renderOrder:d.renderOrder,z:v,group:g},n[t]=f):(f.id=d.id,f.object=d,f.geometry=h,f.material=p,f.groupOrder=m,f.renderOrder=d.renderOrder,f.z=v,f.group=g),t++,f}function a(d,h,p,m,v,g){const f=r(d,h,p,m,v,g);p.transmission>0?i.push(f):p.transparent===!0?s.push(f):e.push(f)}function l(d,h,p,m,v,g){const f=r(d,h,p,m,v,g);p.transmission>0?i.unshift(f):p.transparent===!0?s.unshift(f):e.unshift(f)}function c(d,h){e.length>1&&e.sort(d||Cg),i.length>1&&i.sort(h||Jc),s.length>1&&s.sort(h||Jc)}function u(){for(let d=t,h=n.length;d<h;d++){const p=n[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:i,transparent:s,init:o,push:a,unshift:l,finish:u,sort:c}}function Rg(){let n=new WeakMap;function t(i,s){const o=n.get(i);let r;return o===void 0?(r=new Qc,n.set(i,[r])):s>=o.length?(r=new Qc,o.push(r)):r=o[s],r}function e(){n=new WeakMap}return{get:t,dispose:e}}function Pg(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new b,color:new _t};break;case"SpotLight":e={position:new b,direction:new b,color:new _t,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new b,color:new _t,distance:0,decay:0};break;case"HemisphereLight":e={direction:new b,skyColor:new _t,groundColor:new _t};break;case"RectAreaLight":e={color:new _t,position:new b,halfWidth:new b,halfHeight:new b};break}return n[t.id]=e,e}}}function Lg(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Et};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Et};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Et,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let Ig=0;function Dg(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function Ug(n){const t=new Pg,e=Lg(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new b);const s=new b,o=new Ce,r=new Ce;function a(c){let u=0,d=0,h=0;for(let y=0;y<9;y++)i.probe[y].set(0,0,0);let p=0,m=0,v=0,g=0,f=0,S=0,w=0,E=0,G=0,x=0,U=0;c.sort(Dg);for(let y=0,M=c.length;y<M;y++){const I=c[y],k=I.color,F=I.intensity,Z=I.distance,et=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)u+=k.r*F,d+=k.g*F,h+=k.b*F;else if(I.isLightProbe){for(let J=0;J<9;J++)i.probe[J].addScaledVector(I.sh.coefficients[J],F);U++}else if(I.isDirectionalLight){const J=t.get(I);if(J.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const rt=I.shadow,j=e.get(I);j.shadowIntensity=rt.intensity,j.shadowBias=rt.bias,j.shadowNormalBias=rt.normalBias,j.shadowRadius=rt.radius,j.shadowMapSize=rt.mapSize,i.directionalShadow[p]=j,i.directionalShadowMap[p]=et,i.directionalShadowMatrix[p]=I.shadow.matrix,S++}i.directional[p]=J,p++}else if(I.isSpotLight){const J=t.get(I);J.position.setFromMatrixPosition(I.matrixWorld),J.color.copy(k).multiplyScalar(F),J.distance=Z,J.coneCos=Math.cos(I.angle),J.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),J.decay=I.decay,i.spot[v]=J;const rt=I.shadow;if(I.map&&(i.spotLightMap[G]=I.map,G++,rt.updateMatrices(I),I.castShadow&&x++),i.spotLightMatrix[v]=rt.matrix,I.castShadow){const j=e.get(I);j.shadowIntensity=rt.intensity,j.shadowBias=rt.bias,j.shadowNormalBias=rt.normalBias,j.shadowRadius=rt.radius,j.shadowMapSize=rt.mapSize,i.spotShadow[v]=j,i.spotShadowMap[v]=et,E++}v++}else if(I.isRectAreaLight){const J=t.get(I);J.color.copy(k).multiplyScalar(F),J.halfWidth.set(I.width*.5,0,0),J.halfHeight.set(0,I.height*.5,0),i.rectArea[g]=J,g++}else if(I.isPointLight){const J=t.get(I);if(J.color.copy(I.color).multiplyScalar(I.intensity),J.distance=I.distance,J.decay=I.decay,I.castShadow){const rt=I.shadow,j=e.get(I);j.shadowIntensity=rt.intensity,j.shadowBias=rt.bias,j.shadowNormalBias=rt.normalBias,j.shadowRadius=rt.radius,j.shadowMapSize=rt.mapSize,j.shadowCameraNear=rt.camera.near,j.shadowCameraFar=rt.camera.far,i.pointShadow[m]=j,i.pointShadowMap[m]=et,i.pointShadowMatrix[m]=I.shadow.matrix,w++}i.point[m]=J,m++}else if(I.isHemisphereLight){const J=t.get(I);J.skyColor.copy(I.color).multiplyScalar(F),J.groundColor.copy(I.groundColor).multiplyScalar(F),i.hemi[f]=J,f++}}g>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=wt.LTC_FLOAT_1,i.rectAreaLTC2=wt.LTC_FLOAT_2):(i.rectAreaLTC1=wt.LTC_HALF_1,i.rectAreaLTC2=wt.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=h;const z=i.hash;(z.directionalLength!==p||z.pointLength!==m||z.spotLength!==v||z.rectAreaLength!==g||z.hemiLength!==f||z.numDirectionalShadows!==S||z.numPointShadows!==w||z.numSpotShadows!==E||z.numSpotMaps!==G||z.numLightProbes!==U)&&(i.directional.length=p,i.spot.length=v,i.rectArea.length=g,i.point.length=m,i.hemi.length=f,i.directionalShadow.length=S,i.directionalShadowMap.length=S,i.pointShadow.length=w,i.pointShadowMap.length=w,i.spotShadow.length=E,i.spotShadowMap.length=E,i.directionalShadowMatrix.length=S,i.pointShadowMatrix.length=w,i.spotLightMatrix.length=E+G-x,i.spotLightMap.length=G,i.numSpotLightShadowsWithMaps=x,i.numLightProbes=U,z.directionalLength=p,z.pointLength=m,z.spotLength=v,z.rectAreaLength=g,z.hemiLength=f,z.numDirectionalShadows=S,z.numPointShadows=w,z.numSpotShadows=E,z.numSpotMaps=G,z.numLightProbes=U,i.version=Ig++)}function l(c,u){let d=0,h=0,p=0,m=0,v=0;const g=u.matrixWorldInverse;for(let f=0,S=c.length;f<S;f++){const w=c[f];if(w.isDirectionalLight){const E=i.directional[d];E.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(g),d++}else if(w.isSpotLight){const E=i.spot[p];E.position.setFromMatrixPosition(w.matrixWorld),E.position.applyMatrix4(g),E.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(g),p++}else if(w.isRectAreaLight){const E=i.rectArea[m];E.position.setFromMatrixPosition(w.matrixWorld),E.position.applyMatrix4(g),r.identity(),o.copy(w.matrixWorld),o.premultiply(g),r.extractRotation(o),E.halfWidth.set(w.width*.5,0,0),E.halfHeight.set(0,w.height*.5,0),E.halfWidth.applyMatrix4(r),E.halfHeight.applyMatrix4(r),m++}else if(w.isPointLight){const E=i.point[h];E.position.setFromMatrixPosition(w.matrixWorld),E.position.applyMatrix4(g),h++}else if(w.isHemisphereLight){const E=i.hemi[v];E.direction.setFromMatrixPosition(w.matrixWorld),E.direction.transformDirection(g),v++}}}return{setup:a,setupView:l,state:i}}function tu(n){const t=new Ug(n),e=[],i=[];function s(u){c.camera=u,e.length=0,i.length=0}function o(u){e.push(u)}function r(u){i.push(u)}function a(){t.setup(e)}function l(u){t.setupView(e,u)}const c={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:o,pushShadow:r}}function Ng(n){let t=new WeakMap;function e(s,o=0){const r=t.get(s);let a;return r===void 0?(a=new tu(n),t.set(s,[a])):o>=r.length?(a=new tu(n),r.push(a)):a=r[o],a}function i(){t=new WeakMap}return{get:e,dispose:i}}class zg extends Ei{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=vh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Fg extends Ei{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Og=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Bg=`uniform sampler2D shadow_pass;
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
}`;function kg(n,t,e){let i=new Gl;const s=new Et,o=new Et,r=new Ae,a=new zg({depthPacking:_h}),l=new Fg,c={},u=e.maxTextureSize,d={[Gi]:pn,[pn]:Gi,[Ge]:Ge},h=new fn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Et},radius:{value:4}},vertexShader:Og,fragmentShader:Bg}),p=h.clone();p.defines.HORIZONTAL_PASS=1;const m=new Le;m.setAttribute("position",new Ve(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new R(m,h),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Rl;let f=this.type;this.render=function(x,U,z){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||x.length===0)return;const y=n.getRenderTarget(),M=n.getActiveCubeFace(),I=n.getActiveMipmapLevel(),k=n.state;k.setBlending(yi),k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);const F=f!==mi&&this.type===mi,Z=f===mi&&this.type!==mi;for(let et=0,J=x.length;et<J;et++){const rt=x[et],j=rt.shadow;if(j===void 0){console.warn("THREE.WebGLShadowMap:",rt,"has no shadow.");continue}if(j.autoUpdate===!1&&j.needsUpdate===!1)continue;s.copy(j.mapSize);const gt=j.getFrameExtents();if(s.multiply(gt),o.copy(j.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(o.x=Math.floor(u/gt.x),s.x=o.x*gt.x,j.mapSize.x=o.x),s.y>u&&(o.y=Math.floor(u/gt.y),s.y=o.y*gt.y,j.mapSize.y=o.y)),j.map===null||F===!0||Z===!0){const Pt=this.type!==mi?{minFilter:$n,magFilter:$n}:{};j.map!==null&&j.map.dispose(),j.map=new Zn(s.x,s.y,Pt),j.map.texture.name=rt.name+".shadowMap",j.camera.updateProjectionMatrix()}n.setRenderTarget(j.map),n.clear();const ht=j.getViewportCount();for(let Pt=0;Pt<ht;Pt++){const Y=j.getViewport(Pt);r.set(o.x*Y.x,o.y*Y.y,o.x*Y.z,o.y*Y.w),k.viewport(r),j.updateMatrices(rt,Pt),i=j.getFrustum(),E(U,z,j.camera,rt,this.type)}j.isPointLightShadow!==!0&&this.type===mi&&S(j,z),j.needsUpdate=!1}f=this.type,g.needsUpdate=!1,n.setRenderTarget(y,M,I)};function S(x,U){const z=t.update(v);h.defines.VSM_SAMPLES!==x.blurSamples&&(h.defines.VSM_SAMPLES=x.blurSamples,p.defines.VSM_SAMPLES=x.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),x.mapPass===null&&(x.mapPass=new Zn(s.x,s.y)),h.uniforms.shadow_pass.value=x.map.texture,h.uniforms.resolution.value=x.mapSize,h.uniforms.radius.value=x.radius,n.setRenderTarget(x.mapPass),n.clear(),n.renderBufferDirect(U,null,z,h,v,null),p.uniforms.shadow_pass.value=x.mapPass.texture,p.uniforms.resolution.value=x.mapSize,p.uniforms.radius.value=x.radius,n.setRenderTarget(x.map),n.clear(),n.renderBufferDirect(U,null,z,p,v,null)}function w(x,U,z,y){let M=null;const I=z.isPointLight===!0?x.customDistanceMaterial:x.customDepthMaterial;if(I!==void 0)M=I;else if(M=z.isPointLight===!0?l:a,n.localClippingEnabled&&U.clipShadows===!0&&Array.isArray(U.clippingPlanes)&&U.clippingPlanes.length!==0||U.displacementMap&&U.displacementScale!==0||U.alphaMap&&U.alphaTest>0||U.map&&U.alphaTest>0){const k=M.uuid,F=U.uuid;let Z=c[k];Z===void 0&&(Z={},c[k]=Z);let et=Z[F];et===void 0&&(et=M.clone(),Z[F]=et,U.addEventListener("dispose",G)),M=et}if(M.visible=U.visible,M.wireframe=U.wireframe,y===mi?M.side=U.shadowSide!==null?U.shadowSide:U.side:M.side=U.shadowSide!==null?U.shadowSide:d[U.side],M.alphaMap=U.alphaMap,M.alphaTest=U.alphaTest,M.map=U.map,M.clipShadows=U.clipShadows,M.clippingPlanes=U.clippingPlanes,M.clipIntersection=U.clipIntersection,M.displacementMap=U.displacementMap,M.displacementScale=U.displacementScale,M.displacementBias=U.displacementBias,M.wireframeLinewidth=U.wireframeLinewidth,M.linewidth=U.linewidth,z.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const k=n.properties.get(M);k.light=z}return M}function E(x,U,z,y,M){if(x.visible===!1)return;if(x.layers.test(U.layers)&&(x.isMesh||x.isLine||x.isPoints)&&(x.castShadow||x.receiveShadow&&M===mi)&&(!x.frustumCulled||i.intersectsObject(x))){x.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,x.matrixWorld);const F=t.update(x),Z=x.material;if(Array.isArray(Z)){const et=F.groups;for(let J=0,rt=et.length;J<rt;J++){const j=et[J],gt=Z[j.materialIndex];if(gt&&gt.visible){const ht=w(x,gt,y,M);x.onBeforeShadow(n,x,U,z,F,ht,j),n.renderBufferDirect(z,null,F,ht,x,j),x.onAfterShadow(n,x,U,z,F,ht,j)}}}else if(Z.visible){const et=w(x,Z,y,M);x.onBeforeShadow(n,x,U,z,F,et,null),n.renderBufferDirect(z,null,F,et,x,null),x.onAfterShadow(n,x,U,z,F,et,null)}}const k=x.children;for(let F=0,Z=k.length;F<Z;F++)E(k[F],U,z,y,M)}function G(x){x.target.removeEventListener("dispose",G);for(const z in c){const y=c[z],M=x.target.uuid;M in y&&(y[M].dispose(),delete y[M])}}}const Gg={[Ga]:Ha,[Va]:Xa,[Wa]:Ya,[Ws]:qa,[Ha]:Ga,[Xa]:Va,[Ya]:Wa,[qa]:Ws};function Hg(n,t){function e(){let V=!1;const Tt=new Ae;let ot=null;const at=new Ae(0,0,0,0);return{setMask:function(Rt){ot!==Rt&&!V&&(n.colorMask(Rt,Rt,Rt,Rt),ot=Rt)},setLocked:function(Rt){V=Rt},setClear:function(Rt,At,Qt,Oe,sn){sn===!0&&(Rt*=Oe,At*=Oe,Qt*=Oe),Tt.set(Rt,At,Qt,Oe),at.equals(Tt)===!1&&(n.clearColor(Rt,At,Qt,Oe),at.copy(Tt))},reset:function(){V=!1,ot=null,at.set(-1,0,0,0)}}}function i(){let V=!1,Tt=!1,ot=null,at=null,Rt=null;return{setReversed:function(At){if(Tt!==At){const Qt=t.get("EXT_clip_control");Tt?Qt.clipControlEXT(Qt.LOWER_LEFT_EXT,Qt.ZERO_TO_ONE_EXT):Qt.clipControlEXT(Qt.LOWER_LEFT_EXT,Qt.NEGATIVE_ONE_TO_ONE_EXT);const Oe=Rt;Rt=null,this.setClear(Oe)}Tt=At},getReversed:function(){return Tt},setTest:function(At){At?ct(n.DEPTH_TEST):It(n.DEPTH_TEST)},setMask:function(At){ot!==At&&!V&&(n.depthMask(At),ot=At)},setFunc:function(At){if(Tt&&(At=Gg[At]),at!==At){switch(At){case Ga:n.depthFunc(n.NEVER);break;case Ha:n.depthFunc(n.ALWAYS);break;case Va:n.depthFunc(n.LESS);break;case Ws:n.depthFunc(n.LEQUAL);break;case Wa:n.depthFunc(n.EQUAL);break;case qa:n.depthFunc(n.GEQUAL);break;case Xa:n.depthFunc(n.GREATER);break;case Ya:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}at=At}},setLocked:function(At){V=At},setClear:function(At){Rt!==At&&(Tt&&(At=1-At),n.clearDepth(At),Rt=At)},reset:function(){V=!1,ot=null,at=null,Rt=null,Tt=!1}}}function s(){let V=!1,Tt=null,ot=null,at=null,Rt=null,At=null,Qt=null,Oe=null,sn=null;return{setTest:function(ve){V||(ve?ct(n.STENCIL_TEST):It(n.STENCIL_TEST))},setMask:function(ve){Tt!==ve&&!V&&(n.stencilMask(ve),Tt=ve)},setFunc:function(ve,Ln,In){(ot!==ve||at!==Ln||Rt!==In)&&(n.stencilFunc(ve,Ln,In),ot=ve,at=Ln,Rt=In)},setOp:function(ve,Ln,In){(At!==ve||Qt!==Ln||Oe!==In)&&(n.stencilOp(ve,Ln,In),At=ve,Qt=Ln,Oe=In)},setLocked:function(ve){V=ve},setClear:function(ve){sn!==ve&&(n.clearStencil(ve),sn=ve)},reset:function(){V=!1,Tt=null,ot=null,at=null,Rt=null,At=null,Qt=null,Oe=null,sn=null}}}const o=new e,r=new i,a=new s,l=new WeakMap,c=new WeakMap;let u={},d={},h=new WeakMap,p=[],m=null,v=!1,g=null,f=null,S=null,w=null,E=null,G=null,x=null,U=new _t(0,0,0),z=0,y=!1,M=null,I=null,k=null,F=null,Z=null;const et=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let J=!1,rt=0;const j=n.getParameter(n.VERSION);j.indexOf("WebGL")!==-1?(rt=parseFloat(/^WebGL (\d)/.exec(j)[1]),J=rt>=1):j.indexOf("OpenGL ES")!==-1&&(rt=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),J=rt>=2);let gt=null,ht={};const Pt=n.getParameter(n.SCISSOR_BOX),Y=n.getParameter(n.VIEWPORT),Ut=new Ae().fromArray(Pt),L=new Ae().fromArray(Y);function O(V,Tt,ot,at){const Rt=new Uint8Array(4),At=n.createTexture();n.bindTexture(V,At),n.texParameteri(V,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(V,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Qt=0;Qt<ot;Qt++)V===n.TEXTURE_3D||V===n.TEXTURE_2D_ARRAY?n.texImage3D(Tt,0,n.RGBA,1,1,at,0,n.RGBA,n.UNSIGNED_BYTE,Rt):n.texImage2D(Tt+Qt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Rt);return At}const st={};st[n.TEXTURE_2D]=O(n.TEXTURE_2D,n.TEXTURE_2D,1),st[n.TEXTURE_CUBE_MAP]=O(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),st[n.TEXTURE_2D_ARRAY]=O(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),st[n.TEXTURE_3D]=O(n.TEXTURE_3D,n.TEXTURE_3D,1,1),o.setClear(0,0,0,1),r.setClear(1),a.setClear(0),ct(n.DEPTH_TEST),r.setFunc(Ws),ae(!1),le(oc),ct(n.CULL_FACE),X(yi);function ct(V){u[V]!==!0&&(n.enable(V),u[V]=!0)}function It(V){u[V]!==!1&&(n.disable(V),u[V]=!1)}function Vt(V,Tt){return d[V]!==Tt?(n.bindFramebuffer(V,Tt),d[V]=Tt,V===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=Tt),V===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=Tt),!0):!1}function Zt(V,Tt){let ot=p,at=!1;if(V){ot=h.get(Tt),ot===void 0&&(ot=[],h.set(Tt,ot));const Rt=V.textures;if(ot.length!==Rt.length||ot[0]!==n.COLOR_ATTACHMENT0){for(let At=0,Qt=Rt.length;At<Qt;At++)ot[At]=n.COLOR_ATTACHMENT0+At;ot.length=Rt.length,at=!0}}else ot[0]!==n.BACK&&(ot[0]=n.BACK,at=!0);at&&n.drawBuffers(ot)}function ge(V){return m!==V?(n.useProgram(V),m=V,!0):!1}const re={[ss]:n.FUNC_ADD,[jd]:n.FUNC_SUBTRACT,[Kd]:n.FUNC_REVERSE_SUBTRACT};re[Jd]=n.MIN,re[Qd]=n.MAX;const Ie={[th]:n.ZERO,[eh]:n.ONE,[nh]:n.SRC_COLOR,[Ba]:n.SRC_ALPHA,[lh]:n.SRC_ALPHA_SATURATE,[rh]:n.DST_COLOR,[sh]:n.DST_ALPHA,[ih]:n.ONE_MINUS_SRC_COLOR,[ka]:n.ONE_MINUS_SRC_ALPHA,[ah]:n.ONE_MINUS_DST_COLOR,[oh]:n.ONE_MINUS_DST_ALPHA,[ch]:n.CONSTANT_COLOR,[uh]:n.ONE_MINUS_CONSTANT_COLOR,[dh]:n.CONSTANT_ALPHA,[hh]:n.ONE_MINUS_CONSTANT_ALPHA};function X(V,Tt,ot,at,Rt,At,Qt,Oe,sn,ve){if(V===yi){v===!0&&(It(n.BLEND),v=!1);return}if(v===!1&&(ct(n.BLEND),v=!0),V!==Zd){if(V!==g||ve!==y){if((f!==ss||E!==ss)&&(n.blendEquation(n.FUNC_ADD),f=ss,E=ss),ve)switch(V){case ls:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Xe:n.blendFunc(n.ONE,n.ONE);break;case rc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case ac:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",V);break}else switch(V){case ls:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Xe:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case rc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case ac:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",V);break}S=null,w=null,G=null,x=null,U.set(0,0,0),z=0,g=V,y=ve}return}Rt=Rt||Tt,At=At||ot,Qt=Qt||at,(Tt!==f||Rt!==E)&&(n.blendEquationSeparate(re[Tt],re[Rt]),f=Tt,E=Rt),(ot!==S||at!==w||At!==G||Qt!==x)&&(n.blendFuncSeparate(Ie[ot],Ie[at],Ie[At],Ie[Qt]),S=ot,w=at,G=At,x=Qt),(Oe.equals(U)===!1||sn!==z)&&(n.blendColor(Oe.r,Oe.g,Oe.b,sn),U.copy(Oe),z=sn),g=V,y=!1}function mn(V,Tt){V.side===Ge?It(n.CULL_FACE):ct(n.CULL_FACE);let ot=V.side===pn;Tt&&(ot=!ot),ae(ot),V.blending===ls&&V.transparent===!1?X(yi):X(V.blending,V.blendEquation,V.blendSrc,V.blendDst,V.blendEquationAlpha,V.blendSrcAlpha,V.blendDstAlpha,V.blendColor,V.blendAlpha,V.premultipliedAlpha),r.setFunc(V.depthFunc),r.setTest(V.depthTest),r.setMask(V.depthWrite),o.setMask(V.colorWrite);const at=V.stencilWrite;a.setTest(at),at&&(a.setMask(V.stencilWriteMask),a.setFunc(V.stencilFunc,V.stencilRef,V.stencilFuncMask),a.setOp(V.stencilFail,V.stencilZFail,V.stencilZPass)),Te(V.polygonOffset,V.polygonOffsetFactor,V.polygonOffsetUnits),V.alphaToCoverage===!0?ct(n.SAMPLE_ALPHA_TO_COVERAGE):It(n.SAMPLE_ALPHA_TO_COVERAGE)}function ae(V){M!==V&&(V?n.frontFace(n.CW):n.frontFace(n.CCW),M=V)}function le(V){V!==Yd?(ct(n.CULL_FACE),V!==I&&(V===oc?n.cullFace(n.BACK):V===$d?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):It(n.CULL_FACE),I=V}function Xt(V){V!==k&&(J&&n.lineWidth(V),k=V)}function Te(V,Tt,ot){V?(ct(n.POLYGON_OFFSET_FILL),(F!==Tt||Z!==ot)&&(n.polygonOffset(Tt,ot),F=Tt,Z=ot)):It(n.POLYGON_OFFSET_FILL)}function Yt(V){V?ct(n.SCISSOR_TEST):It(n.SCISSOR_TEST)}function N(V){V===void 0&&(V=n.TEXTURE0+et-1),gt!==V&&(n.activeTexture(V),gt=V)}function T(V,Tt,ot){ot===void 0&&(gt===null?ot=n.TEXTURE0+et-1:ot=gt);let at=ht[ot];at===void 0&&(at={type:void 0,texture:void 0},ht[ot]=at),(at.type!==V||at.texture!==Tt)&&(gt!==ot&&(n.activeTexture(ot),gt=ot),n.bindTexture(V,Tt||st[V]),at.type=V,at.texture=Tt)}function Q(){const V=ht[gt];V!==void 0&&V.type!==void 0&&(n.bindTexture(V.type,null),V.type=void 0,V.texture=void 0)}function ut(){try{n.compressedTexImage2D.apply(n,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function dt(){try{n.compressedTexImage3D.apply(n,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function lt(){try{n.texSubImage2D.apply(n,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Gt(){try{n.texSubImage3D.apply(n,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function xt(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function zt(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function oe(){try{n.texStorage2D.apply(n,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function mt(){try{n.texStorage3D.apply(n,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Lt(){try{n.texImage2D.apply(n,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function qt(){try{n.texImage3D.apply(n,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Kt(V){Ut.equals(V)===!1&&(n.scissor(V.x,V.y,V.z,V.w),Ut.copy(V))}function Ft(V){L.equals(V)===!1&&(n.viewport(V.x,V.y,V.z,V.w),L.copy(V))}function de(V,Tt){let ot=c.get(Tt);ot===void 0&&(ot=new WeakMap,c.set(Tt,ot));let at=ot.get(V);at===void 0&&(at=n.getUniformBlockIndex(Tt,V.name),ot.set(V,at))}function te(V,Tt){const at=c.get(Tt).get(V);l.get(Tt)!==at&&(n.uniformBlockBinding(Tt,at,V.__bindingPointIndex),l.set(Tt,at))}function ye(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),r.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},gt=null,ht={},d={},h=new WeakMap,p=[],m=null,v=!1,g=null,f=null,S=null,w=null,E=null,G=null,x=null,U=new _t(0,0,0),z=0,y=!1,M=null,I=null,k=null,F=null,Z=null,Ut.set(0,0,n.canvas.width,n.canvas.height),L.set(0,0,n.canvas.width,n.canvas.height),o.reset(),r.reset(),a.reset()}return{buffers:{color:o,depth:r,stencil:a},enable:ct,disable:It,bindFramebuffer:Vt,drawBuffers:Zt,useProgram:ge,setBlending:X,setMaterial:mn,setFlipSided:ae,setCullFace:le,setLineWidth:Xt,setPolygonOffset:Te,setScissorTest:Yt,activeTexture:N,bindTexture:T,unbindTexture:Q,compressedTexImage2D:ut,compressedTexImage3D:dt,texImage2D:Lt,texImage3D:qt,updateUBOMapping:de,uniformBlockBinding:te,texStorage2D:oe,texStorage3D:mt,texSubImage2D:lt,texSubImage3D:Gt,compressedTexSubImage2D:xt,compressedTexSubImage3D:zt,scissor:Kt,viewport:Ft,reset:ye}}function eu(n,t,e,i){const s=Vg(i);switch(e){case Vu:return n*t;case qu:return n*t;case Xu:return n*t*2;case Yu:return n*t/s.components*s.byteLength;case Nl:return n*t/s.components*s.byteLength;case $u:return n*t*2/s.components*s.byteLength;case zl:return n*t*2/s.components*s.byteLength;case Wu:return n*t*3/s.components*s.byteLength;case Xn:return n*t*4/s.components*s.byteLength;case Fl:return n*t*4/s.components*s.byteLength;case _r:case Mr:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case yr:case xr:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Ja:case tl:return Math.max(n,16)*Math.max(t,8)/4;case Ka:case Qa:return Math.max(n,8)*Math.max(t,8)/2;case el:case nl:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case il:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case sl:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case ol:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case rl:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case al:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case ll:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case cl:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case ul:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case dl:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case hl:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case fl:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case pl:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case ml:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case gl:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case vl:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case Sr:case _l:case Ml:return Math.ceil(n/4)*Math.ceil(t/4)*16;case Zu:case yl:return Math.ceil(n/4)*Math.ceil(t/4)*8;case xl:case Sl:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Vg(n){switch(n){case bi:case ku:return{byteLength:1,components:1};case Co:case Gu:case xi:return{byteLength:2,components:1};case Dl:case Ul:return{byteLength:2,components:4};case us:case Il:case _i:return{byteLength:4,components:1};case Hu:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function Wg(n,t,e,i,s,o,r){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Et,u=new WeakMap;let d;const h=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(N,T){return p?new OffscreenCanvas(N,T):Ar("canvas")}function v(N,T,Q){let ut=1;const dt=Yt(N);if((dt.width>Q||dt.height>Q)&&(ut=Q/Math.max(dt.width,dt.height)),ut<1)if(typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&N instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&N instanceof ImageBitmap||typeof VideoFrame<"u"&&N instanceof VideoFrame){const lt=Math.floor(ut*dt.width),Gt=Math.floor(ut*dt.height);d===void 0&&(d=m(lt,Gt));const xt=T?m(lt,Gt):d;return xt.width=lt,xt.height=Gt,xt.getContext("2d").drawImage(N,0,0,lt,Gt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+dt.width+"x"+dt.height+") to ("+lt+"x"+Gt+")."),xt}else return"data"in N&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+dt.width+"x"+dt.height+")."),N;return N}function g(N){return N.generateMipmaps}function f(N){n.generateMipmap(N)}function S(N){return N.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:N.isWebGL3DRenderTarget?n.TEXTURE_3D:N.isWebGLArrayRenderTarget||N.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function w(N,T,Q,ut,dt=!1){if(N!==null){if(n[N]!==void 0)return n[N];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+N+"'")}let lt=T;if(T===n.RED&&(Q===n.FLOAT&&(lt=n.R32F),Q===n.HALF_FLOAT&&(lt=n.R16F),Q===n.UNSIGNED_BYTE&&(lt=n.R8)),T===n.RED_INTEGER&&(Q===n.UNSIGNED_BYTE&&(lt=n.R8UI),Q===n.UNSIGNED_SHORT&&(lt=n.R16UI),Q===n.UNSIGNED_INT&&(lt=n.R32UI),Q===n.BYTE&&(lt=n.R8I),Q===n.SHORT&&(lt=n.R16I),Q===n.INT&&(lt=n.R32I)),T===n.RG&&(Q===n.FLOAT&&(lt=n.RG32F),Q===n.HALF_FLOAT&&(lt=n.RG16F),Q===n.UNSIGNED_BYTE&&(lt=n.RG8)),T===n.RG_INTEGER&&(Q===n.UNSIGNED_BYTE&&(lt=n.RG8UI),Q===n.UNSIGNED_SHORT&&(lt=n.RG16UI),Q===n.UNSIGNED_INT&&(lt=n.RG32UI),Q===n.BYTE&&(lt=n.RG8I),Q===n.SHORT&&(lt=n.RG16I),Q===n.INT&&(lt=n.RG32I)),T===n.RGB_INTEGER&&(Q===n.UNSIGNED_BYTE&&(lt=n.RGB8UI),Q===n.UNSIGNED_SHORT&&(lt=n.RGB16UI),Q===n.UNSIGNED_INT&&(lt=n.RGB32UI),Q===n.BYTE&&(lt=n.RGB8I),Q===n.SHORT&&(lt=n.RGB16I),Q===n.INT&&(lt=n.RGB32I)),T===n.RGBA_INTEGER&&(Q===n.UNSIGNED_BYTE&&(lt=n.RGBA8UI),Q===n.UNSIGNED_SHORT&&(lt=n.RGBA16UI),Q===n.UNSIGNED_INT&&(lt=n.RGBA32UI),Q===n.BYTE&&(lt=n.RGBA8I),Q===n.SHORT&&(lt=n.RGBA16I),Q===n.INT&&(lt=n.RGBA32I)),T===n.RGB&&Q===n.UNSIGNED_INT_5_9_9_9_REV&&(lt=n.RGB9_E5),T===n.RGBA){const Gt=dt?Fr:pe.getTransfer(ut);Q===n.FLOAT&&(lt=n.RGBA32F),Q===n.HALF_FLOAT&&(lt=n.RGBA16F),Q===n.UNSIGNED_BYTE&&(lt=Gt===be?n.SRGB8_ALPHA8:n.RGBA8),Q===n.UNSIGNED_SHORT_4_4_4_4&&(lt=n.RGBA4),Q===n.UNSIGNED_SHORT_5_5_5_1&&(lt=n.RGB5_A1)}return(lt===n.R16F||lt===n.R32F||lt===n.RG16F||lt===n.RG32F||lt===n.RGBA16F||lt===n.RGBA32F)&&t.get("EXT_color_buffer_float"),lt}function E(N,T){let Q;return N?T===null||T===us||T===Ys?Q=n.DEPTH24_STENCIL8:T===_i?Q=n.DEPTH32F_STENCIL8:T===Co&&(Q=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):T===null||T===us||T===Ys?Q=n.DEPTH_COMPONENT24:T===_i?Q=n.DEPTH_COMPONENT32F:T===Co&&(Q=n.DEPTH_COMPONENT16),Q}function G(N,T){return g(N)===!0||N.isFramebufferTexture&&N.minFilter!==$n&&N.minFilter!==oi?Math.log2(Math.max(T.width,T.height))+1:N.mipmaps!==void 0&&N.mipmaps.length>0?N.mipmaps.length:N.isCompressedTexture&&Array.isArray(N.image)?T.mipmaps.length:1}function x(N){const T=N.target;T.removeEventListener("dispose",x),z(T),T.isVideoTexture&&u.delete(T)}function U(N){const T=N.target;T.removeEventListener("dispose",U),M(T)}function z(N){const T=i.get(N);if(T.__webglInit===void 0)return;const Q=N.source,ut=h.get(Q);if(ut){const dt=ut[T.__cacheKey];dt.usedTimes--,dt.usedTimes===0&&y(N),Object.keys(ut).length===0&&h.delete(Q)}i.remove(N)}function y(N){const T=i.get(N);n.deleteTexture(T.__webglTexture);const Q=N.source,ut=h.get(Q);delete ut[T.__cacheKey],r.memory.textures--}function M(N){const T=i.get(N);if(N.depthTexture&&(N.depthTexture.dispose(),i.remove(N.depthTexture)),N.isWebGLCubeRenderTarget)for(let ut=0;ut<6;ut++){if(Array.isArray(T.__webglFramebuffer[ut]))for(let dt=0;dt<T.__webglFramebuffer[ut].length;dt++)n.deleteFramebuffer(T.__webglFramebuffer[ut][dt]);else n.deleteFramebuffer(T.__webglFramebuffer[ut]);T.__webglDepthbuffer&&n.deleteRenderbuffer(T.__webglDepthbuffer[ut])}else{if(Array.isArray(T.__webglFramebuffer))for(let ut=0;ut<T.__webglFramebuffer.length;ut++)n.deleteFramebuffer(T.__webglFramebuffer[ut]);else n.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&n.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&n.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let ut=0;ut<T.__webglColorRenderbuffer.length;ut++)T.__webglColorRenderbuffer[ut]&&n.deleteRenderbuffer(T.__webglColorRenderbuffer[ut]);T.__webglDepthRenderbuffer&&n.deleteRenderbuffer(T.__webglDepthRenderbuffer)}const Q=N.textures;for(let ut=0,dt=Q.length;ut<dt;ut++){const lt=i.get(Q[ut]);lt.__webglTexture&&(n.deleteTexture(lt.__webglTexture),r.memory.textures--),i.remove(Q[ut])}i.remove(N)}let I=0;function k(){I=0}function F(){const N=I;return N>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+N+" texture units while this GPU supports only "+s.maxTextures),I+=1,N}function Z(N){const T=[];return T.push(N.wrapS),T.push(N.wrapT),T.push(N.wrapR||0),T.push(N.magFilter),T.push(N.minFilter),T.push(N.anisotropy),T.push(N.internalFormat),T.push(N.format),T.push(N.type),T.push(N.generateMipmaps),T.push(N.premultiplyAlpha),T.push(N.flipY),T.push(N.unpackAlignment),T.push(N.colorSpace),T.join()}function et(N,T){const Q=i.get(N);if(N.isVideoTexture&&Xt(N),N.isRenderTargetTexture===!1&&N.version>0&&Q.__version!==N.version){const ut=N.image;if(ut===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ut.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{L(Q,N,T);return}}e.bindTexture(n.TEXTURE_2D,Q.__webglTexture,n.TEXTURE0+T)}function J(N,T){const Q=i.get(N);if(N.version>0&&Q.__version!==N.version){L(Q,N,T);return}e.bindTexture(n.TEXTURE_2D_ARRAY,Q.__webglTexture,n.TEXTURE0+T)}function rt(N,T){const Q=i.get(N);if(N.version>0&&Q.__version!==N.version){L(Q,N,T);return}e.bindTexture(n.TEXTURE_3D,Q.__webglTexture,n.TEXTURE0+T)}function j(N,T){const Q=i.get(N);if(N.version>0&&Q.__version!==N.version){O(Q,N,T);return}e.bindTexture(n.TEXTURE_CUBE_MAP,Q.__webglTexture,n.TEXTURE0+T)}const gt={[Hi]:n.REPEAT,[rs]:n.CLAMP_TO_EDGE,[ja]:n.MIRRORED_REPEAT},ht={[$n]:n.NEAREST,[gh]:n.NEAREST_MIPMAP_NEAREST,[Ho]:n.NEAREST_MIPMAP_LINEAR,[oi]:n.LINEAR,[Yr]:n.LINEAR_MIPMAP_NEAREST,[as]:n.LINEAR_MIPMAP_LINEAR},Pt={[yh]:n.NEVER,[Th]:n.ALWAYS,[xh]:n.LESS,[ju]:n.LEQUAL,[Sh]:n.EQUAL,[Eh]:n.GEQUAL,[wh]:n.GREATER,[bh]:n.NOTEQUAL};function Y(N,T){if(T.type===_i&&t.has("OES_texture_float_linear")===!1&&(T.magFilter===oi||T.magFilter===Yr||T.magFilter===Ho||T.magFilter===as||T.minFilter===oi||T.minFilter===Yr||T.minFilter===Ho||T.minFilter===as)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(N,n.TEXTURE_WRAP_S,gt[T.wrapS]),n.texParameteri(N,n.TEXTURE_WRAP_T,gt[T.wrapT]),(N===n.TEXTURE_3D||N===n.TEXTURE_2D_ARRAY)&&n.texParameteri(N,n.TEXTURE_WRAP_R,gt[T.wrapR]),n.texParameteri(N,n.TEXTURE_MAG_FILTER,ht[T.magFilter]),n.texParameteri(N,n.TEXTURE_MIN_FILTER,ht[T.minFilter]),T.compareFunction&&(n.texParameteri(N,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(N,n.TEXTURE_COMPARE_FUNC,Pt[T.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===$n||T.minFilter!==Ho&&T.minFilter!==as||T.type===_i&&t.has("OES_texture_float_linear")===!1)return;if(T.anisotropy>1||i.get(T).__currentAnisotropy){const Q=t.get("EXT_texture_filter_anisotropic");n.texParameterf(N,Q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,s.getMaxAnisotropy())),i.get(T).__currentAnisotropy=T.anisotropy}}}function Ut(N,T){let Q=!1;N.__webglInit===void 0&&(N.__webglInit=!0,T.addEventListener("dispose",x));const ut=T.source;let dt=h.get(ut);dt===void 0&&(dt={},h.set(ut,dt));const lt=Z(T);if(lt!==N.__cacheKey){dt[lt]===void 0&&(dt[lt]={texture:n.createTexture(),usedTimes:0},r.memory.textures++,Q=!0),dt[lt].usedTimes++;const Gt=dt[N.__cacheKey];Gt!==void 0&&(dt[N.__cacheKey].usedTimes--,Gt.usedTimes===0&&y(T)),N.__cacheKey=lt,N.__webglTexture=dt[lt].texture}return Q}function L(N,T,Q){let ut=n.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(ut=n.TEXTURE_2D_ARRAY),T.isData3DTexture&&(ut=n.TEXTURE_3D);const dt=Ut(N,T),lt=T.source;e.bindTexture(ut,N.__webglTexture,n.TEXTURE0+Q);const Gt=i.get(lt);if(lt.version!==Gt.__version||dt===!0){e.activeTexture(n.TEXTURE0+Q);const xt=pe.getPrimaries(pe.workingColorSpace),zt=T.colorSpace===Fi?null:pe.getPrimaries(T.colorSpace),oe=T.colorSpace===Fi||xt===zt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,T.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,T.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,oe);let mt=v(T.image,!1,s.maxTextureSize);mt=Te(T,mt);const Lt=o.convert(T.format,T.colorSpace),qt=o.convert(T.type);let Kt=w(T.internalFormat,Lt,qt,T.colorSpace,T.isVideoTexture);Y(ut,T);let Ft;const de=T.mipmaps,te=T.isVideoTexture!==!0,ye=Gt.__version===void 0||dt===!0,V=lt.dataReady,Tt=G(T,mt);if(T.isDepthTexture)Kt=E(T.format===$s,T.type),ye&&(te?e.texStorage2D(n.TEXTURE_2D,1,Kt,mt.width,mt.height):e.texImage2D(n.TEXTURE_2D,0,Kt,mt.width,mt.height,0,Lt,qt,null));else if(T.isDataTexture)if(de.length>0){te&&ye&&e.texStorage2D(n.TEXTURE_2D,Tt,Kt,de[0].width,de[0].height);for(let ot=0,at=de.length;ot<at;ot++)Ft=de[ot],te?V&&e.texSubImage2D(n.TEXTURE_2D,ot,0,0,Ft.width,Ft.height,Lt,qt,Ft.data):e.texImage2D(n.TEXTURE_2D,ot,Kt,Ft.width,Ft.height,0,Lt,qt,Ft.data);T.generateMipmaps=!1}else te?(ye&&e.texStorage2D(n.TEXTURE_2D,Tt,Kt,mt.width,mt.height),V&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,mt.width,mt.height,Lt,qt,mt.data)):e.texImage2D(n.TEXTURE_2D,0,Kt,mt.width,mt.height,0,Lt,qt,mt.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){te&&ye&&e.texStorage3D(n.TEXTURE_2D_ARRAY,Tt,Kt,de[0].width,de[0].height,mt.depth);for(let ot=0,at=de.length;ot<at;ot++)if(Ft=de[ot],T.format!==Xn)if(Lt!==null)if(te){if(V)if(T.layerUpdates.size>0){const Rt=eu(Ft.width,Ft.height,T.format,T.type);for(const At of T.layerUpdates){const Qt=Ft.data.subarray(At*Rt/Ft.data.BYTES_PER_ELEMENT,(At+1)*Rt/Ft.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ot,0,0,At,Ft.width,Ft.height,1,Lt,Qt)}T.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ot,0,0,0,Ft.width,Ft.height,mt.depth,Lt,Ft.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ot,Kt,Ft.width,Ft.height,mt.depth,0,Ft.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else te?V&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,ot,0,0,0,Ft.width,Ft.height,mt.depth,Lt,qt,Ft.data):e.texImage3D(n.TEXTURE_2D_ARRAY,ot,Kt,Ft.width,Ft.height,mt.depth,0,Lt,qt,Ft.data)}else{te&&ye&&e.texStorage2D(n.TEXTURE_2D,Tt,Kt,de[0].width,de[0].height);for(let ot=0,at=de.length;ot<at;ot++)Ft=de[ot],T.format!==Xn?Lt!==null?te?V&&e.compressedTexSubImage2D(n.TEXTURE_2D,ot,0,0,Ft.width,Ft.height,Lt,Ft.data):e.compressedTexImage2D(n.TEXTURE_2D,ot,Kt,Ft.width,Ft.height,0,Ft.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):te?V&&e.texSubImage2D(n.TEXTURE_2D,ot,0,0,Ft.width,Ft.height,Lt,qt,Ft.data):e.texImage2D(n.TEXTURE_2D,ot,Kt,Ft.width,Ft.height,0,Lt,qt,Ft.data)}else if(T.isDataArrayTexture)if(te){if(ye&&e.texStorage3D(n.TEXTURE_2D_ARRAY,Tt,Kt,mt.width,mt.height,mt.depth),V)if(T.layerUpdates.size>0){const ot=eu(mt.width,mt.height,T.format,T.type);for(const at of T.layerUpdates){const Rt=mt.data.subarray(at*ot/mt.data.BYTES_PER_ELEMENT,(at+1)*ot/mt.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,at,mt.width,mt.height,1,Lt,qt,Rt)}T.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,mt.width,mt.height,mt.depth,Lt,qt,mt.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,Kt,mt.width,mt.height,mt.depth,0,Lt,qt,mt.data);else if(T.isData3DTexture)te?(ye&&e.texStorage3D(n.TEXTURE_3D,Tt,Kt,mt.width,mt.height,mt.depth),V&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,mt.width,mt.height,mt.depth,Lt,qt,mt.data)):e.texImage3D(n.TEXTURE_3D,0,Kt,mt.width,mt.height,mt.depth,0,Lt,qt,mt.data);else if(T.isFramebufferTexture){if(ye)if(te)e.texStorage2D(n.TEXTURE_2D,Tt,Kt,mt.width,mt.height);else{let ot=mt.width,at=mt.height;for(let Rt=0;Rt<Tt;Rt++)e.texImage2D(n.TEXTURE_2D,Rt,Kt,ot,at,0,Lt,qt,null),ot>>=1,at>>=1}}else if(de.length>0){if(te&&ye){const ot=Yt(de[0]);e.texStorage2D(n.TEXTURE_2D,Tt,Kt,ot.width,ot.height)}for(let ot=0,at=de.length;ot<at;ot++)Ft=de[ot],te?V&&e.texSubImage2D(n.TEXTURE_2D,ot,0,0,Lt,qt,Ft):e.texImage2D(n.TEXTURE_2D,ot,Kt,Lt,qt,Ft);T.generateMipmaps=!1}else if(te){if(ye){const ot=Yt(mt);e.texStorage2D(n.TEXTURE_2D,Tt,Kt,ot.width,ot.height)}V&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,Lt,qt,mt)}else e.texImage2D(n.TEXTURE_2D,0,Kt,Lt,qt,mt);g(T)&&f(ut),Gt.__version=lt.version,T.onUpdate&&T.onUpdate(T)}N.__version=T.version}function O(N,T,Q){if(T.image.length!==6)return;const ut=Ut(N,T),dt=T.source;e.bindTexture(n.TEXTURE_CUBE_MAP,N.__webglTexture,n.TEXTURE0+Q);const lt=i.get(dt);if(dt.version!==lt.__version||ut===!0){e.activeTexture(n.TEXTURE0+Q);const Gt=pe.getPrimaries(pe.workingColorSpace),xt=T.colorSpace===Fi?null:pe.getPrimaries(T.colorSpace),zt=T.colorSpace===Fi||Gt===xt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,T.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,T.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,zt);const oe=T.isCompressedTexture||T.image[0].isCompressedTexture,mt=T.image[0]&&T.image[0].isDataTexture,Lt=[];for(let at=0;at<6;at++)!oe&&!mt?Lt[at]=v(T.image[at],!0,s.maxCubemapSize):Lt[at]=mt?T.image[at].image:T.image[at],Lt[at]=Te(T,Lt[at]);const qt=Lt[0],Kt=o.convert(T.format,T.colorSpace),Ft=o.convert(T.type),de=w(T.internalFormat,Kt,Ft,T.colorSpace),te=T.isVideoTexture!==!0,ye=lt.__version===void 0||ut===!0,V=dt.dataReady;let Tt=G(T,qt);Y(n.TEXTURE_CUBE_MAP,T);let ot;if(oe){te&&ye&&e.texStorage2D(n.TEXTURE_CUBE_MAP,Tt,de,qt.width,qt.height);for(let at=0;at<6;at++){ot=Lt[at].mipmaps;for(let Rt=0;Rt<ot.length;Rt++){const At=ot[Rt];T.format!==Xn?Kt!==null?te?V&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+at,Rt,0,0,At.width,At.height,Kt,At.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+at,Rt,de,At.width,At.height,0,At.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):te?V&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+at,Rt,0,0,At.width,At.height,Kt,Ft,At.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+at,Rt,de,At.width,At.height,0,Kt,Ft,At.data)}}}else{if(ot=T.mipmaps,te&&ye){ot.length>0&&Tt++;const at=Yt(Lt[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,Tt,de,at.width,at.height)}for(let at=0;at<6;at++)if(mt){te?V&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+at,0,0,0,Lt[at].width,Lt[at].height,Kt,Ft,Lt[at].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+at,0,de,Lt[at].width,Lt[at].height,0,Kt,Ft,Lt[at].data);for(let Rt=0;Rt<ot.length;Rt++){const Qt=ot[Rt].image[at].image;te?V&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+at,Rt+1,0,0,Qt.width,Qt.height,Kt,Ft,Qt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+at,Rt+1,de,Qt.width,Qt.height,0,Kt,Ft,Qt.data)}}else{te?V&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+at,0,0,0,Kt,Ft,Lt[at]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+at,0,de,Kt,Ft,Lt[at]);for(let Rt=0;Rt<ot.length;Rt++){const At=ot[Rt];te?V&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+at,Rt+1,0,0,Kt,Ft,At.image[at]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+at,Rt+1,de,Kt,Ft,At.image[at])}}}g(T)&&f(n.TEXTURE_CUBE_MAP),lt.__version=dt.version,T.onUpdate&&T.onUpdate(T)}N.__version=T.version}function st(N,T,Q,ut,dt,lt){const Gt=o.convert(Q.format,Q.colorSpace),xt=o.convert(Q.type),zt=w(Q.internalFormat,Gt,xt,Q.colorSpace),oe=i.get(T),mt=i.get(Q);if(mt.__renderTarget=T,!oe.__hasExternalTextures){const Lt=Math.max(1,T.width>>lt),qt=Math.max(1,T.height>>lt);dt===n.TEXTURE_3D||dt===n.TEXTURE_2D_ARRAY?e.texImage3D(dt,lt,zt,Lt,qt,T.depth,0,Gt,xt,null):e.texImage2D(dt,lt,zt,Lt,qt,0,Gt,xt,null)}e.bindFramebuffer(n.FRAMEBUFFER,N),le(T)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ut,dt,mt.__webglTexture,0,ae(T)):(dt===n.TEXTURE_2D||dt>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&dt<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,ut,dt,mt.__webglTexture,lt),e.bindFramebuffer(n.FRAMEBUFFER,null)}function ct(N,T,Q){if(n.bindRenderbuffer(n.RENDERBUFFER,N),T.depthBuffer){const ut=T.depthTexture,dt=ut&&ut.isDepthTexture?ut.type:null,lt=E(T.stencilBuffer,dt),Gt=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,xt=ae(T);le(T)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,xt,lt,T.width,T.height):Q?n.renderbufferStorageMultisample(n.RENDERBUFFER,xt,lt,T.width,T.height):n.renderbufferStorage(n.RENDERBUFFER,lt,T.width,T.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Gt,n.RENDERBUFFER,N)}else{const ut=T.textures;for(let dt=0;dt<ut.length;dt++){const lt=ut[dt],Gt=o.convert(lt.format,lt.colorSpace),xt=o.convert(lt.type),zt=w(lt.internalFormat,Gt,xt,lt.colorSpace),oe=ae(T);Q&&le(T)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,oe,zt,T.width,T.height):le(T)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,oe,zt,T.width,T.height):n.renderbufferStorage(n.RENDERBUFFER,zt,T.width,T.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function It(N,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,N),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const ut=i.get(T.depthTexture);ut.__renderTarget=T,(!ut.__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),et(T.depthTexture,0);const dt=ut.__webglTexture,lt=ae(T);if(T.depthTexture.format===ks)le(T)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,dt,0,lt):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,dt,0);else if(T.depthTexture.format===$s)le(T)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,dt,0,lt):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,dt,0);else throw new Error("Unknown depthTexture format")}function Vt(N){const T=i.get(N),Q=N.isWebGLCubeRenderTarget===!0;if(T.__boundDepthTexture!==N.depthTexture){const ut=N.depthTexture;if(T.__depthDisposeCallback&&T.__depthDisposeCallback(),ut){const dt=()=>{delete T.__boundDepthTexture,delete T.__depthDisposeCallback,ut.removeEventListener("dispose",dt)};ut.addEventListener("dispose",dt),T.__depthDisposeCallback=dt}T.__boundDepthTexture=ut}if(N.depthTexture&&!T.__autoAllocateDepthBuffer){if(Q)throw new Error("target.depthTexture not supported in Cube render targets");It(T.__webglFramebuffer,N)}else if(Q){T.__webglDepthbuffer=[];for(let ut=0;ut<6;ut++)if(e.bindFramebuffer(n.FRAMEBUFFER,T.__webglFramebuffer[ut]),T.__webglDepthbuffer[ut]===void 0)T.__webglDepthbuffer[ut]=n.createRenderbuffer(),ct(T.__webglDepthbuffer[ut],N,!1);else{const dt=N.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,lt=T.__webglDepthbuffer[ut];n.bindRenderbuffer(n.RENDERBUFFER,lt),n.framebufferRenderbuffer(n.FRAMEBUFFER,dt,n.RENDERBUFFER,lt)}}else if(e.bindFramebuffer(n.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer===void 0)T.__webglDepthbuffer=n.createRenderbuffer(),ct(T.__webglDepthbuffer,N,!1);else{const ut=N.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,dt=T.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,dt),n.framebufferRenderbuffer(n.FRAMEBUFFER,ut,n.RENDERBUFFER,dt)}e.bindFramebuffer(n.FRAMEBUFFER,null)}function Zt(N,T,Q){const ut=i.get(N);T!==void 0&&st(ut.__webglFramebuffer,N,N.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),Q!==void 0&&Vt(N)}function ge(N){const T=N.texture,Q=i.get(N),ut=i.get(T);N.addEventListener("dispose",U);const dt=N.textures,lt=N.isWebGLCubeRenderTarget===!0,Gt=dt.length>1;if(Gt||(ut.__webglTexture===void 0&&(ut.__webglTexture=n.createTexture()),ut.__version=T.version,r.memory.textures++),lt){Q.__webglFramebuffer=[];for(let xt=0;xt<6;xt++)if(T.mipmaps&&T.mipmaps.length>0){Q.__webglFramebuffer[xt]=[];for(let zt=0;zt<T.mipmaps.length;zt++)Q.__webglFramebuffer[xt][zt]=n.createFramebuffer()}else Q.__webglFramebuffer[xt]=n.createFramebuffer()}else{if(T.mipmaps&&T.mipmaps.length>0){Q.__webglFramebuffer=[];for(let xt=0;xt<T.mipmaps.length;xt++)Q.__webglFramebuffer[xt]=n.createFramebuffer()}else Q.__webglFramebuffer=n.createFramebuffer();if(Gt)for(let xt=0,zt=dt.length;xt<zt;xt++){const oe=i.get(dt[xt]);oe.__webglTexture===void 0&&(oe.__webglTexture=n.createTexture(),r.memory.textures++)}if(N.samples>0&&le(N)===!1){Q.__webglMultisampledFramebuffer=n.createFramebuffer(),Q.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,Q.__webglMultisampledFramebuffer);for(let xt=0;xt<dt.length;xt++){const zt=dt[xt];Q.__webglColorRenderbuffer[xt]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,Q.__webglColorRenderbuffer[xt]);const oe=o.convert(zt.format,zt.colorSpace),mt=o.convert(zt.type),Lt=w(zt.internalFormat,oe,mt,zt.colorSpace,N.isXRRenderTarget===!0),qt=ae(N);n.renderbufferStorageMultisample(n.RENDERBUFFER,qt,Lt,N.width,N.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+xt,n.RENDERBUFFER,Q.__webglColorRenderbuffer[xt])}n.bindRenderbuffer(n.RENDERBUFFER,null),N.depthBuffer&&(Q.__webglDepthRenderbuffer=n.createRenderbuffer(),ct(Q.__webglDepthRenderbuffer,N,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(lt){e.bindTexture(n.TEXTURE_CUBE_MAP,ut.__webglTexture),Y(n.TEXTURE_CUBE_MAP,T);for(let xt=0;xt<6;xt++)if(T.mipmaps&&T.mipmaps.length>0)for(let zt=0;zt<T.mipmaps.length;zt++)st(Q.__webglFramebuffer[xt][zt],N,T,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+xt,zt);else st(Q.__webglFramebuffer[xt],N,T,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+xt,0);g(T)&&f(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Gt){for(let xt=0,zt=dt.length;xt<zt;xt++){const oe=dt[xt],mt=i.get(oe);e.bindTexture(n.TEXTURE_2D,mt.__webglTexture),Y(n.TEXTURE_2D,oe),st(Q.__webglFramebuffer,N,oe,n.COLOR_ATTACHMENT0+xt,n.TEXTURE_2D,0),g(oe)&&f(n.TEXTURE_2D)}e.unbindTexture()}else{let xt=n.TEXTURE_2D;if((N.isWebGL3DRenderTarget||N.isWebGLArrayRenderTarget)&&(xt=N.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(xt,ut.__webglTexture),Y(xt,T),T.mipmaps&&T.mipmaps.length>0)for(let zt=0;zt<T.mipmaps.length;zt++)st(Q.__webglFramebuffer[zt],N,T,n.COLOR_ATTACHMENT0,xt,zt);else st(Q.__webglFramebuffer,N,T,n.COLOR_ATTACHMENT0,xt,0);g(T)&&f(xt),e.unbindTexture()}N.depthBuffer&&Vt(N)}function re(N){const T=N.textures;for(let Q=0,ut=T.length;Q<ut;Q++){const dt=T[Q];if(g(dt)){const lt=S(N),Gt=i.get(dt).__webglTexture;e.bindTexture(lt,Gt),f(lt),e.unbindTexture()}}}const Ie=[],X=[];function mn(N){if(N.samples>0){if(le(N)===!1){const T=N.textures,Q=N.width,ut=N.height;let dt=n.COLOR_BUFFER_BIT;const lt=N.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Gt=i.get(N),xt=T.length>1;if(xt)for(let zt=0;zt<T.length;zt++)e.bindFramebuffer(n.FRAMEBUFFER,Gt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+zt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,Gt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+zt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,Gt.__webglMultisampledFramebuffer),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,Gt.__webglFramebuffer);for(let zt=0;zt<T.length;zt++){if(N.resolveDepthBuffer&&(N.depthBuffer&&(dt|=n.DEPTH_BUFFER_BIT),N.stencilBuffer&&N.resolveStencilBuffer&&(dt|=n.STENCIL_BUFFER_BIT)),xt){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Gt.__webglColorRenderbuffer[zt]);const oe=i.get(T[zt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,oe,0)}n.blitFramebuffer(0,0,Q,ut,0,0,Q,ut,dt,n.NEAREST),l===!0&&(Ie.length=0,X.length=0,Ie.push(n.COLOR_ATTACHMENT0+zt),N.depthBuffer&&N.resolveDepthBuffer===!1&&(Ie.push(lt),X.push(lt),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,X)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Ie))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),xt)for(let zt=0;zt<T.length;zt++){e.bindFramebuffer(n.FRAMEBUFFER,Gt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+zt,n.RENDERBUFFER,Gt.__webglColorRenderbuffer[zt]);const oe=i.get(T[zt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,Gt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+zt,n.TEXTURE_2D,oe,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,Gt.__webglMultisampledFramebuffer)}else if(N.depthBuffer&&N.resolveDepthBuffer===!1&&l){const T=N.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[T])}}}function ae(N){return Math.min(s.maxSamples,N.samples)}function le(N){const T=i.get(N);return N.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function Xt(N){const T=r.render.frame;u.get(N)!==T&&(u.set(N,T),N.update())}function Te(N,T){const Q=N.colorSpace,ut=N.format,dt=N.type;return N.isCompressedTexture===!0||N.isVideoTexture===!0||Q!==Qs&&Q!==Fi&&(pe.getTransfer(Q)===be?(ut!==Xn||dt!==bi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",Q)),T}function Yt(N){return typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement?(c.width=N.naturalWidth||N.width,c.height=N.naturalHeight||N.height):typeof VideoFrame<"u"&&N instanceof VideoFrame?(c.width=N.displayWidth,c.height=N.displayHeight):(c.width=N.width,c.height=N.height),c}this.allocateTextureUnit=F,this.resetTextureUnits=k,this.setTexture2D=et,this.setTexture2DArray=J,this.setTexture3D=rt,this.setTextureCube=j,this.rebindTextures=Zt,this.setupRenderTarget=ge,this.updateRenderTargetMipmap=re,this.updateMultisampleRenderTarget=mn,this.setupDepthRenderbuffer=Vt,this.setupFrameBufferTexture=st,this.useMultisampledRTT=le}function qg(n,t){function e(i,s=Fi){let o;const r=pe.getTransfer(s);if(i===bi)return n.UNSIGNED_BYTE;if(i===Dl)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Ul)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Hu)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===ku)return n.BYTE;if(i===Gu)return n.SHORT;if(i===Co)return n.UNSIGNED_SHORT;if(i===Il)return n.INT;if(i===us)return n.UNSIGNED_INT;if(i===_i)return n.FLOAT;if(i===xi)return n.HALF_FLOAT;if(i===Vu)return n.ALPHA;if(i===Wu)return n.RGB;if(i===Xn)return n.RGBA;if(i===qu)return n.LUMINANCE;if(i===Xu)return n.LUMINANCE_ALPHA;if(i===ks)return n.DEPTH_COMPONENT;if(i===$s)return n.DEPTH_STENCIL;if(i===Yu)return n.RED;if(i===Nl)return n.RED_INTEGER;if(i===$u)return n.RG;if(i===zl)return n.RG_INTEGER;if(i===Fl)return n.RGBA_INTEGER;if(i===_r||i===Mr||i===yr||i===xr)if(r===be)if(o=t.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(i===_r)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Mr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===yr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===xr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=t.get("WEBGL_compressed_texture_s3tc"),o!==null){if(i===_r)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Mr)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===yr)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===xr)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Ka||i===Ja||i===Qa||i===tl)if(o=t.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(i===Ka)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Ja)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Qa)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===tl)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===el||i===nl||i===il)if(o=t.get("WEBGL_compressed_texture_etc"),o!==null){if(i===el||i===nl)return r===be?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(i===il)return r===be?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===sl||i===ol||i===rl||i===al||i===ll||i===cl||i===ul||i===dl||i===hl||i===fl||i===pl||i===ml||i===gl||i===vl)if(o=t.get("WEBGL_compressed_texture_astc"),o!==null){if(i===sl)return r===be?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===ol)return r===be?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===rl)return r===be?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===al)return r===be?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===ll)return r===be?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===cl)return r===be?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===ul)return r===be?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===dl)return r===be?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===hl)return r===be?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===fl)return r===be?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===pl)return r===be?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===ml)return r===be?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===gl)return r===be?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===vl)return r===be?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Sr||i===_l||i===Ml)if(o=t.get("EXT_texture_compression_bptc"),o!==null){if(i===Sr)return r===be?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===_l)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Ml)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Zu||i===yl||i===xl||i===Sl)if(o=t.get("EXT_texture_compression_rgtc"),o!==null){if(i===Sr)return o.COMPRESSED_RED_RGTC1_EXT;if(i===yl)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===xl)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Sl)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Ys?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}class Xg extends Ue{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class yt extends $e{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Yg={type:"move"};class ya{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new yt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new yt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new b,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new b),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new yt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new b,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new b),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,o=null,r=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){r=!0;for(const v of t.hand.values()){const g=e.getJointPose(v,i),f=this._getHandJoint(c,v);g!==null&&(f.matrix.fromArray(g.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=g.radius),f.visible=g!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],h=u.position.distanceTo(d.position),p=.02,m=.005;c.inputState.pinching&&h>p+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&h<=p-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(o=e.getPose(t.gripSpace,i),o!==null&&(l.matrix.fromArray(o.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,o.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(o.linearVelocity)):l.hasLinearVelocity=!1,o.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(o.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&o!==null&&(s=o),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Yg)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=o!==null),c!==null&&(c.visible=r!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new yt;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}const $g=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Zg=`
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

}`;class jg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){const s=new yn,o=t.properties.get(s);o.__webglTexture=e.texture,(e.depthNear!=i.depthNear||e.depthFar!=i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new fn({vertexShader:$g,fragmentShader:Zg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new R(new Jt(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Kg extends to{constructor(t,e){super();const i=this;let s=null,o=1,r=null,a="local-floor",l=1,c=null,u=null,d=null,h=null,p=null,m=null;const v=new jg,g=e.getContextAttributes();let f=null,S=null;const w=[],E=[],G=new Et;let x=null;const U=new Ue;U.viewport=new Ae;const z=new Ue;z.viewport=new Ae;const y=[U,z],M=new Xg;let I=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(L){let O=w[L];return O===void 0&&(O=new ya,w[L]=O),O.getTargetRaySpace()},this.getControllerGrip=function(L){let O=w[L];return O===void 0&&(O=new ya,w[L]=O),O.getGripSpace()},this.getHand=function(L){let O=w[L];return O===void 0&&(O=new ya,w[L]=O),O.getHandSpace()};function F(L){const O=E.indexOf(L.inputSource);if(O===-1)return;const st=w[O];st!==void 0&&(st.update(L.inputSource,L.frame,c||r),st.dispatchEvent({type:L.type,data:L.inputSource}))}function Z(){s.removeEventListener("select",F),s.removeEventListener("selectstart",F),s.removeEventListener("selectend",F),s.removeEventListener("squeeze",F),s.removeEventListener("squeezestart",F),s.removeEventListener("squeezeend",F),s.removeEventListener("end",Z),s.removeEventListener("inputsourceschange",et);for(let L=0;L<w.length;L++){const O=E[L];O!==null&&(E[L]=null,w[L].disconnect(O))}I=null,k=null,v.reset(),t.setRenderTarget(f),p=null,h=null,d=null,s=null,S=null,Ut.stop(),i.isPresenting=!1,t.setPixelRatio(x),t.setSize(G.width,G.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(L){o=L,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(L){a=L,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||r},this.setReferenceSpace=function(L){c=L},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return d},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(L){if(s=L,s!==null){if(f=t.getRenderTarget(),s.addEventListener("select",F),s.addEventListener("selectstart",F),s.addEventListener("selectend",F),s.addEventListener("squeeze",F),s.addEventListener("squeezestart",F),s.addEventListener("squeezeend",F),s.addEventListener("end",Z),s.addEventListener("inputsourceschange",et),g.xrCompatible!==!0&&await e.makeXRCompatible(),x=t.getPixelRatio(),t.getSize(G),s.renderState.layers===void 0){const O={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:o};p=new XRWebGLLayer(s,e,O),s.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),S=new Zn(p.framebufferWidth,p.framebufferHeight,{format:Xn,type:bi,colorSpace:t.outputColorSpace,stencilBuffer:g.stencil})}else{let O=null,st=null,ct=null;g.depth&&(ct=g.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,O=g.stencil?$s:ks,st=g.stencil?Ys:us);const It={colorFormat:e.RGBA8,depthFormat:ct,scaleFactor:o};d=new XRWebGLBinding(s,e),h=d.createProjectionLayer(It),s.updateRenderState({layers:[h]}),t.setPixelRatio(1),t.setSize(h.textureWidth,h.textureHeight,!1),S=new Zn(h.textureWidth,h.textureHeight,{format:Xn,type:bi,depthTexture:new ad(h.textureWidth,h.textureHeight,st,void 0,void 0,void 0,void 0,void 0,void 0,O),stencilBuffer:g.stencil,colorSpace:t.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,r=await s.requestReferenceSpace(a),Ut.setContext(s),Ut.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function et(L){for(let O=0;O<L.removed.length;O++){const st=L.removed[O],ct=E.indexOf(st);ct>=0&&(E[ct]=null,w[ct].disconnect(st))}for(let O=0;O<L.added.length;O++){const st=L.added[O];let ct=E.indexOf(st);if(ct===-1){for(let Vt=0;Vt<w.length;Vt++)if(Vt>=E.length){E.push(st),ct=Vt;break}else if(E[Vt]===null){E[Vt]=st,ct=Vt;break}if(ct===-1)break}const It=w[ct];It&&It.connect(st)}}const J=new b,rt=new b;function j(L,O,st){J.setFromMatrixPosition(O.matrixWorld),rt.setFromMatrixPosition(st.matrixWorld);const ct=J.distanceTo(rt),It=O.projectionMatrix.elements,Vt=st.projectionMatrix.elements,Zt=It[14]/(It[10]-1),ge=It[14]/(It[10]+1),re=(It[9]+1)/It[5],Ie=(It[9]-1)/It[5],X=(It[8]-1)/It[0],mn=(Vt[8]+1)/Vt[0],ae=Zt*X,le=Zt*mn,Xt=ct/(-X+mn),Te=Xt*-X;if(O.matrixWorld.decompose(L.position,L.quaternion,L.scale),L.translateX(Te),L.translateZ(Xt),L.matrixWorld.compose(L.position,L.quaternion,L.scale),L.matrixWorldInverse.copy(L.matrixWorld).invert(),It[10]===-1)L.projectionMatrix.copy(O.projectionMatrix),L.projectionMatrixInverse.copy(O.projectionMatrixInverse);else{const Yt=Zt+Xt,N=ge+Xt,T=ae-Te,Q=le+(ct-Te),ut=re*ge/N*Yt,dt=Ie*ge/N*Yt;L.projectionMatrix.makePerspective(T,Q,ut,dt,Yt,N),L.projectionMatrixInverse.copy(L.projectionMatrix).invert()}}function gt(L,O){O===null?L.matrixWorld.copy(L.matrix):L.matrixWorld.multiplyMatrices(O.matrixWorld,L.matrix),L.matrixWorldInverse.copy(L.matrixWorld).invert()}this.updateCamera=function(L){if(s===null)return;let O=L.near,st=L.far;v.texture!==null&&(v.depthNear>0&&(O=v.depthNear),v.depthFar>0&&(st=v.depthFar)),M.near=z.near=U.near=O,M.far=z.far=U.far=st,(I!==M.near||k!==M.far)&&(s.updateRenderState({depthNear:M.near,depthFar:M.far}),I=M.near,k=M.far),U.layers.mask=L.layers.mask|2,z.layers.mask=L.layers.mask|4,M.layers.mask=U.layers.mask|z.layers.mask;const ct=L.parent,It=M.cameras;gt(M,ct);for(let Vt=0;Vt<It.length;Vt++)gt(It[Vt],ct);It.length===2?j(M,U,z):M.projectionMatrix.copy(U.projectionMatrix),ht(L,M,ct)};function ht(L,O,st){st===null?L.matrix.copy(O.matrixWorld):(L.matrix.copy(st.matrixWorld),L.matrix.invert(),L.matrix.multiply(O.matrixWorld)),L.matrix.decompose(L.position,L.quaternion,L.scale),L.updateMatrixWorld(!0),L.projectionMatrix.copy(O.projectionMatrix),L.projectionMatrixInverse.copy(O.projectionMatrixInverse),L.isPerspectiveCamera&&(L.fov=Ro*2*Math.atan(1/L.projectionMatrix.elements[5]),L.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(h===null&&p===null))return l},this.setFoveation=function(L){l=L,h!==null&&(h.fixedFoveation=L),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=L)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(M)};let Pt=null;function Y(L,O){if(u=O.getViewerPose(c||r),m=O,u!==null){const st=u.views;p!==null&&(t.setRenderTargetFramebuffer(S,p.framebuffer),t.setRenderTarget(S));let ct=!1;st.length!==M.cameras.length&&(M.cameras.length=0,ct=!0);for(let Vt=0;Vt<st.length;Vt++){const Zt=st[Vt];let ge=null;if(p!==null)ge=p.getViewport(Zt);else{const Ie=d.getViewSubImage(h,Zt);ge=Ie.viewport,Vt===0&&(t.setRenderTargetTextures(S,Ie.colorTexture,h.ignoreDepthValues?void 0:Ie.depthStencilTexture),t.setRenderTarget(S))}let re=y[Vt];re===void 0&&(re=new Ue,re.layers.enable(Vt),re.viewport=new Ae,y[Vt]=re),re.matrix.fromArray(Zt.transform.matrix),re.matrix.decompose(re.position,re.quaternion,re.scale),re.projectionMatrix.fromArray(Zt.projectionMatrix),re.projectionMatrixInverse.copy(re.projectionMatrix).invert(),re.viewport.set(ge.x,ge.y,ge.width,ge.height),Vt===0&&(M.matrix.copy(re.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),ct===!0&&M.cameras.push(re)}const It=s.enabledFeatures;if(It&&It.includes("depth-sensing")){const Vt=d.getDepthInformation(st[0]);Vt&&Vt.isValid&&Vt.texture&&v.init(t,Vt,s.renderState)}}for(let st=0;st<w.length;st++){const ct=E[st],It=w[st];ct!==null&&It!==void 0&&It.update(ct,O,c||r)}Pt&&Pt(L,O),O.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:O}),m=null}const Ut=new rd;Ut.setAnimationLoop(Y),this.setAnimationLoop=function(L){Pt=L},this.dispose=function(){}}}const ji=new jn,Jg=new Ce;function Qg(n,t){function e(g,f){g.matrixAutoUpdate===!0&&g.updateMatrix(),f.value.copy(g.matrix)}function i(g,f){f.color.getRGB(g.fogColor.value,id(n)),f.isFog?(g.fogNear.value=f.near,g.fogFar.value=f.far):f.isFogExp2&&(g.fogDensity.value=f.density)}function s(g,f,S,w,E){f.isMeshBasicMaterial||f.isMeshLambertMaterial?o(g,f):f.isMeshToonMaterial?(o(g,f),d(g,f)):f.isMeshPhongMaterial?(o(g,f),u(g,f)):f.isMeshStandardMaterial?(o(g,f),h(g,f),f.isMeshPhysicalMaterial&&p(g,f,E)):f.isMeshMatcapMaterial?(o(g,f),m(g,f)):f.isMeshDepthMaterial?o(g,f):f.isMeshDistanceMaterial?(o(g,f),v(g,f)):f.isMeshNormalMaterial?o(g,f):f.isLineBasicMaterial?(r(g,f),f.isLineDashedMaterial&&a(g,f)):f.isPointsMaterial?l(g,f,S,w):f.isSpriteMaterial?c(g,f):f.isShadowMaterial?(g.color.value.copy(f.color),g.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function o(g,f){g.opacity.value=f.opacity,f.color&&g.diffuse.value.copy(f.color),f.emissive&&g.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(g.map.value=f.map,e(f.map,g.mapTransform)),f.alphaMap&&(g.alphaMap.value=f.alphaMap,e(f.alphaMap,g.alphaMapTransform)),f.bumpMap&&(g.bumpMap.value=f.bumpMap,e(f.bumpMap,g.bumpMapTransform),g.bumpScale.value=f.bumpScale,f.side===pn&&(g.bumpScale.value*=-1)),f.normalMap&&(g.normalMap.value=f.normalMap,e(f.normalMap,g.normalMapTransform),g.normalScale.value.copy(f.normalScale),f.side===pn&&g.normalScale.value.negate()),f.displacementMap&&(g.displacementMap.value=f.displacementMap,e(f.displacementMap,g.displacementMapTransform),g.displacementScale.value=f.displacementScale,g.displacementBias.value=f.displacementBias),f.emissiveMap&&(g.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,g.emissiveMapTransform)),f.specularMap&&(g.specularMap.value=f.specularMap,e(f.specularMap,g.specularMapTransform)),f.alphaTest>0&&(g.alphaTest.value=f.alphaTest);const S=t.get(f),w=S.envMap,E=S.envMapRotation;w&&(g.envMap.value=w,ji.copy(E),ji.x*=-1,ji.y*=-1,ji.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(ji.y*=-1,ji.z*=-1),g.envMapRotation.value.setFromMatrix4(Jg.makeRotationFromEuler(ji)),g.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=f.reflectivity,g.ior.value=f.ior,g.refractionRatio.value=f.refractionRatio),f.lightMap&&(g.lightMap.value=f.lightMap,g.lightMapIntensity.value=f.lightMapIntensity,e(f.lightMap,g.lightMapTransform)),f.aoMap&&(g.aoMap.value=f.aoMap,g.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,g.aoMapTransform))}function r(g,f){g.diffuse.value.copy(f.color),g.opacity.value=f.opacity,f.map&&(g.map.value=f.map,e(f.map,g.mapTransform))}function a(g,f){g.dashSize.value=f.dashSize,g.totalSize.value=f.dashSize+f.gapSize,g.scale.value=f.scale}function l(g,f,S,w){g.diffuse.value.copy(f.color),g.opacity.value=f.opacity,g.size.value=f.size*S,g.scale.value=w*.5,f.map&&(g.map.value=f.map,e(f.map,g.uvTransform)),f.alphaMap&&(g.alphaMap.value=f.alphaMap,e(f.alphaMap,g.alphaMapTransform)),f.alphaTest>0&&(g.alphaTest.value=f.alphaTest)}function c(g,f){g.diffuse.value.copy(f.color),g.opacity.value=f.opacity,g.rotation.value=f.rotation,f.map&&(g.map.value=f.map,e(f.map,g.mapTransform)),f.alphaMap&&(g.alphaMap.value=f.alphaMap,e(f.alphaMap,g.alphaMapTransform)),f.alphaTest>0&&(g.alphaTest.value=f.alphaTest)}function u(g,f){g.specular.value.copy(f.specular),g.shininess.value=Math.max(f.shininess,1e-4)}function d(g,f){f.gradientMap&&(g.gradientMap.value=f.gradientMap)}function h(g,f){g.metalness.value=f.metalness,f.metalnessMap&&(g.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,g.metalnessMapTransform)),g.roughness.value=f.roughness,f.roughnessMap&&(g.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,g.roughnessMapTransform)),f.envMap&&(g.envMapIntensity.value=f.envMapIntensity)}function p(g,f,S){g.ior.value=f.ior,f.sheen>0&&(g.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),g.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(g.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,g.sheenColorMapTransform)),f.sheenRoughnessMap&&(g.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,g.sheenRoughnessMapTransform))),f.clearcoat>0&&(g.clearcoat.value=f.clearcoat,g.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(g.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,g.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(g.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===pn&&g.clearcoatNormalScale.value.negate())),f.dispersion>0&&(g.dispersion.value=f.dispersion),f.iridescence>0&&(g.iridescence.value=f.iridescence,g.iridescenceIOR.value=f.iridescenceIOR,g.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(g.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,g.iridescenceMapTransform)),f.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),f.transmission>0&&(g.transmission.value=f.transmission,g.transmissionSamplerMap.value=S.texture,g.transmissionSamplerSize.value.set(S.width,S.height),f.transmissionMap&&(g.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,g.transmissionMapTransform)),g.thickness.value=f.thickness,f.thicknessMap&&(g.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=f.attenuationDistance,g.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(g.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(g.anisotropyMap.value=f.anisotropyMap,e(f.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=f.specularIntensity,g.specularColor.value.copy(f.specularColor),f.specularColorMap&&(g.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,g.specularColorMapTransform)),f.specularIntensityMap&&(g.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,f){f.matcap&&(g.matcap.value=f.matcap)}function v(g,f){const S=t.get(f).light;g.referencePosition.value.setFromMatrixPosition(S.matrixWorld),g.nearDistance.value=S.shadow.camera.near,g.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function tv(n,t,e,i){let s={},o={},r=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,w){const E=w.program;i.uniformBlockBinding(S,E)}function c(S,w){let E=s[S.id];E===void 0&&(m(S),E=u(S),s[S.id]=E,S.addEventListener("dispose",g));const G=w.program;i.updateUBOMapping(S,G);const x=t.render.frame;o[S.id]!==x&&(h(S),o[S.id]=x)}function u(S){const w=d();S.__bindingPointIndex=w;const E=n.createBuffer(),G=S.__size,x=S.usage;return n.bindBuffer(n.UNIFORM_BUFFER,E),n.bufferData(n.UNIFORM_BUFFER,G,x),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,w,E),E}function d(){for(let S=0;S<a;S++)if(r.indexOf(S)===-1)return r.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(S){const w=s[S.id],E=S.uniforms,G=S.__cache;n.bindBuffer(n.UNIFORM_BUFFER,w);for(let x=0,U=E.length;x<U;x++){const z=Array.isArray(E[x])?E[x]:[E[x]];for(let y=0,M=z.length;y<M;y++){const I=z[y];if(p(I,x,y,G)===!0){const k=I.__offset,F=Array.isArray(I.value)?I.value:[I.value];let Z=0;for(let et=0;et<F.length;et++){const J=F[et],rt=v(J);typeof J=="number"||typeof J=="boolean"?(I.__data[0]=J,n.bufferSubData(n.UNIFORM_BUFFER,k+Z,I.__data)):J.isMatrix3?(I.__data[0]=J.elements[0],I.__data[1]=J.elements[1],I.__data[2]=J.elements[2],I.__data[3]=0,I.__data[4]=J.elements[3],I.__data[5]=J.elements[4],I.__data[6]=J.elements[5],I.__data[7]=0,I.__data[8]=J.elements[6],I.__data[9]=J.elements[7],I.__data[10]=J.elements[8],I.__data[11]=0):(J.toArray(I.__data,Z),Z+=rt.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,k,I.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(S,w,E,G){const x=S.value,U=w+"_"+E;if(G[U]===void 0)return typeof x=="number"||typeof x=="boolean"?G[U]=x:G[U]=x.clone(),!0;{const z=G[U];if(typeof x=="number"||typeof x=="boolean"){if(z!==x)return G[U]=x,!0}else if(z.equals(x)===!1)return z.copy(x),!0}return!1}function m(S){const w=S.uniforms;let E=0;const G=16;for(let U=0,z=w.length;U<z;U++){const y=Array.isArray(w[U])?w[U]:[w[U]];for(let M=0,I=y.length;M<I;M++){const k=y[M],F=Array.isArray(k.value)?k.value:[k.value];for(let Z=0,et=F.length;Z<et;Z++){const J=F[Z],rt=v(J),j=E%G,gt=j%rt.boundary,ht=j+gt;E+=gt,ht!==0&&G-ht<rt.storage&&(E+=G-ht),k.__data=new Float32Array(rt.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=E,E+=rt.storage}}}const x=E%G;return x>0&&(E+=G-x),S.__size=E,S.__cache={},this}function v(S){const w={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(w.boundary=4,w.storage=4):S.isVector2?(w.boundary=8,w.storage=8):S.isVector3||S.isColor?(w.boundary=16,w.storage=12):S.isVector4?(w.boundary=16,w.storage=16):S.isMatrix3?(w.boundary=48,w.storage=48):S.isMatrix4?(w.boundary=64,w.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),w}function g(S){const w=S.target;w.removeEventListener("dispose",g);const E=r.indexOf(w.__bindingPointIndex);r.splice(E,1),n.deleteBuffer(s[w.id]),delete s[w.id],delete o[w.id]}function f(){for(const S in s)n.deleteBuffer(s[S]);r=[],s={},o={}}return{bind:l,update:c,dispose:f}}class Wl{constructor(t={}){const{canvas:e=Vh(),context:i=null,depth:s=!0,stencil:o=!1,alpha:r=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:h=!1}=t;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=r;const m=new Uint32Array(4),v=new Int32Array(4);let g=null,f=null;const S=[],w=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=xe,this.toneMapping=ki,this.toneMappingExposure=1;const E=this;let G=!1,x=0,U=0,z=null,y=-1,M=null;const I=new Ae,k=new Ae;let F=null;const Z=new _t(0);let et=0,J=e.width,rt=e.height,j=1,gt=null,ht=null;const Pt=new Ae(0,0,J,rt),Y=new Ae(0,0,J,rt);let Ut=!1;const L=new Gl;let O=!1,st=!1;const ct=new Ce,It=new Ce,Vt=new b,Zt=new Ae,ge={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let re=!1;function Ie(){return z===null?j:1}let X=i;function mn(A,W){return e.getContext(A,W)}try{const A={alpha:!0,depth:s,stencil:o,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Cl}`),e.addEventListener("webglcontextlost",at,!1),e.addEventListener("webglcontextrestored",Rt,!1),e.addEventListener("webglcontextcreationerror",At,!1),X===null){const W="webgl2";if(X=mn(W,A),X===null)throw mn(W)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let ae,le,Xt,Te,Yt,N,T,Q,ut,dt,lt,Gt,xt,zt,oe,mt,Lt,qt,Kt,Ft,de,te,ye,V;function Tt(){ae=new rm(X),ae.init(),te=new qg(X,ae),le=new tm(X,ae,t,te),Xt=new Hg(X,ae),le.reverseDepthBuffer&&h&&Xt.buffers.depth.setReversed(!0),Te=new cm(X),Yt=new Ag,N=new Wg(X,ae,Xt,Yt,le,te,Te),T=new nm(E),Q=new om(E),ut=new gf(X),ye=new J0(X,ut),dt=new am(X,ut,Te,ye),lt=new dm(X,dt,ut,Te),Kt=new um(X,le,N),mt=new em(Yt),Gt=new Tg(E,T,Q,ae,le,ye,mt),xt=new Qg(E,Yt),zt=new Rg,oe=new Ng(ae),qt=new K0(E,T,Q,Xt,lt,p,l),Lt=new kg(E,lt,le),V=new tv(X,Te,le,Xt),Ft=new Q0(X,ae,Te),de=new lm(X,ae,Te),Te.programs=Gt.programs,E.capabilities=le,E.extensions=ae,E.properties=Yt,E.renderLists=zt,E.shadowMap=Lt,E.state=Xt,E.info=Te}Tt();const ot=new Kg(E,X);this.xr=ot,this.getContext=function(){return X},this.getContextAttributes=function(){return X.getContextAttributes()},this.forceContextLoss=function(){const A=ae.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=ae.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return j},this.setPixelRatio=function(A){A!==void 0&&(j=A,this.setSize(J,rt,!1))},this.getSize=function(A){return A.set(J,rt)},this.setSize=function(A,W,tt=!0){if(ot.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}J=A,rt=W,e.width=Math.floor(A*j),e.height=Math.floor(W*j),tt===!0&&(e.style.width=A+"px",e.style.height=W+"px"),this.setViewport(0,0,A,W)},this.getDrawingBufferSize=function(A){return A.set(J*j,rt*j).floor()},this.setDrawingBufferSize=function(A,W,tt){J=A,rt=W,j=tt,e.width=Math.floor(A*tt),e.height=Math.floor(W*tt),this.setViewport(0,0,A,W)},this.getCurrentViewport=function(A){return A.copy(I)},this.getViewport=function(A){return A.copy(Pt)},this.setViewport=function(A,W,tt,nt){A.isVector4?Pt.set(A.x,A.y,A.z,A.w):Pt.set(A,W,tt,nt),Xt.viewport(I.copy(Pt).multiplyScalar(j).round())},this.getScissor=function(A){return A.copy(Y)},this.setScissor=function(A,W,tt,nt){A.isVector4?Y.set(A.x,A.y,A.z,A.w):Y.set(A,W,tt,nt),Xt.scissor(k.copy(Y).multiplyScalar(j).round())},this.getScissorTest=function(){return Ut},this.setScissorTest=function(A){Xt.setScissorTest(Ut=A)},this.setOpaqueSort=function(A){gt=A},this.setTransparentSort=function(A){ht=A},this.getClearColor=function(A){return A.copy(qt.getClearColor())},this.setClearColor=function(){qt.setClearColor.apply(qt,arguments)},this.getClearAlpha=function(){return qt.getClearAlpha()},this.setClearAlpha=function(){qt.setClearAlpha.apply(qt,arguments)},this.clear=function(A=!0,W=!0,tt=!0){let nt=0;if(A){let q=!1;if(z!==null){const vt=z.texture.format;q=vt===Fl||vt===zl||vt===Nl}if(q){const vt=z.texture.type,Ct=vt===bi||vt===us||vt===Co||vt===Ys||vt===Dl||vt===Ul,Bt=qt.getClearColor(),Ot=qt.getClearAlpha(),jt=Bt.r,Ht=Bt.g,Nt=Bt.b;Ct?(m[0]=jt,m[1]=Ht,m[2]=Nt,m[3]=Ot,X.clearBufferuiv(X.COLOR,0,m)):(v[0]=jt,v[1]=Ht,v[2]=Nt,v[3]=Ot,X.clearBufferiv(X.COLOR,0,v))}else nt|=X.COLOR_BUFFER_BIT}W&&(nt|=X.DEPTH_BUFFER_BIT),tt&&(nt|=X.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),X.clear(nt)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",at,!1),e.removeEventListener("webglcontextrestored",Rt,!1),e.removeEventListener("webglcontextcreationerror",At,!1),zt.dispose(),oe.dispose(),Yt.dispose(),T.dispose(),Q.dispose(),lt.dispose(),ye.dispose(),V.dispose(),Gt.dispose(),ot.dispose(),ot.removeEventListener("sessionstart",io),ot.removeEventListener("sessionend",Fo),Jn.stop()};function at(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),G=!0}function Rt(){console.log("THREE.WebGLRenderer: Context Restored."),G=!1;const A=Te.autoReset,W=Lt.enabled,tt=Lt.autoUpdate,nt=Lt.needsUpdate,q=Lt.type;Tt(),Te.autoReset=A,Lt.enabled=W,Lt.autoUpdate=tt,Lt.needsUpdate=nt,Lt.type=q}function At(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function Qt(A){const W=A.target;W.removeEventListener("dispose",Qt),Oe(W)}function Oe(A){sn(A),Yt.remove(A)}function sn(A){const W=Yt.get(A).programs;W!==void 0&&(W.forEach(function(tt){Gt.releaseProgram(tt)}),A.isShaderMaterial&&Gt.releaseShaderCache(A))}this.renderBufferDirect=function(A,W,tt,nt,q,vt){W===null&&(W=ge);const Ct=q.isMesh&&q.matrixWorld.determinant()<0,Bt=ms(A,W,tt,nt,q);Xt.setMaterial(nt,Ct);let Ot=tt.index,jt=1;if(nt.wireframe===!0){if(Ot=dt.getWireframeAttribute(tt),Ot===void 0)return;jt=2}const Ht=tt.drawRange,Nt=tt.attributes.position;let ce=Ht.start*jt,Se=(Ht.start+Ht.count)*jt;vt!==null&&(ce=Math.max(ce,vt.start*jt),Se=Math.min(Se,(vt.start+vt.count)*jt)),Ot!==null?(ce=Math.max(ce,0),Se=Math.min(Se,Ot.count)):Nt!=null&&(ce=Math.max(ce,0),Se=Math.min(Se,Nt.count));const we=Se-ce;if(we<0||we===1/0)return;ye.setup(q,nt,Bt,tt,Ot);let on,_e=Ft;if(Ot!==null&&(on=ut.get(Ot),_e=de,_e.setIndex(on)),q.isMesh)nt.wireframe===!0?(Xt.setLineWidth(nt.wireframeLinewidth*Ie()),_e.setMode(X.LINES)):_e.setMode(X.TRIANGLES);else if(q.isLine){let Wt=nt.linewidth;Wt===void 0&&(Wt=1),Xt.setLineWidth(Wt*Ie()),q.isLineSegments?_e.setMode(X.LINES):q.isLineLoop?_e.setMode(X.LINE_LOOP):_e.setMode(X.LINE_STRIP)}else q.isPoints?_e.setMode(X.POINTS):q.isSprite&&_e.setMode(X.TRIANGLES);if(q.isBatchedMesh)if(q._multiDrawInstances!==null)_e.renderMultiDrawInstances(q._multiDrawStarts,q._multiDrawCounts,q._multiDrawCount,q._multiDrawInstances);else if(ae.get("WEBGL_multi_draw"))_e.renderMultiDraw(q._multiDrawStarts,q._multiDrawCounts,q._multiDrawCount);else{const Wt=q._multiDrawStarts,Bn=q._multiDrawCounts,me=q._multiDrawCount,xn=Ot?ut.get(Ot).bytesPerElement:1,Ci=Yt.get(nt).currentProgram.getUniforms();for(let gn=0;gn<me;gn++)Ci.setValue(X,"_gl_DrawID",gn),_e.render(Wt[gn]/xn,Bn[gn])}else if(q.isInstancedMesh)_e.renderInstances(ce,we,q.count);else if(tt.isInstancedBufferGeometry){const Wt=tt._maxInstanceCount!==void 0?tt._maxInstanceCount:1/0,Bn=Math.min(tt.instanceCount,Wt);_e.renderInstances(ce,we,Bn)}else _e.render(ce,we)};function ve(A,W,tt){A.transparent===!0&&A.side===Ge&&A.forceSinglePass===!1?(A.side=pn,A.needsUpdate=!0,ci(A,W,tt),A.side=Gi,A.needsUpdate=!0,ci(A,W,tt),A.side=Ge):ci(A,W,tt)}this.compile=function(A,W,tt=null){tt===null&&(tt=A),f=oe.get(tt),f.init(W),w.push(f),tt.traverseVisible(function(q){q.isLight&&q.layers.test(W.layers)&&(f.pushLight(q),q.castShadow&&f.pushShadow(q))}),A!==tt&&A.traverseVisible(function(q){q.isLight&&q.layers.test(W.layers)&&(f.pushLight(q),q.castShadow&&f.pushShadow(q))}),f.setupLights();const nt=new Set;return A.traverse(function(q){if(!(q.isMesh||q.isPoints||q.isLine||q.isSprite))return;const vt=q.material;if(vt)if(Array.isArray(vt))for(let Ct=0;Ct<vt.length;Ct++){const Bt=vt[Ct];ve(Bt,tt,q),nt.add(Bt)}else ve(vt,tt,q),nt.add(vt)}),w.pop(),f=null,nt},this.compileAsync=function(A,W,tt=null){const nt=this.compile(A,W,tt);return new Promise(q=>{function vt(){if(nt.forEach(function(Ct){Yt.get(Ct).currentProgram.isReady()&&nt.delete(Ct)}),nt.size===0){q(A);return}setTimeout(vt,10)}ae.get("KHR_parallel_shader_compile")!==null?vt():setTimeout(vt,10)})};let Ln=null;function In(A){Ln&&Ln(A)}function io(){Jn.stop()}function Fo(){Jn.start()}const Jn=new rd;Jn.setAnimationLoop(In),typeof self<"u"&&Jn.setContext(self),this.setAnimationLoop=function(A){Ln=A,ot.setAnimationLoop(A),A===null?Jn.stop():Jn.start()},ot.addEventListener("sessionstart",io),ot.addEventListener("sessionend",Fo),this.render=function(A,W){if(W!==void 0&&W.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(G===!0)return;if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),W.parent===null&&W.matrixWorldAutoUpdate===!0&&W.updateMatrixWorld(),ot.enabled===!0&&ot.isPresenting===!0&&(ot.cameraAutoUpdate===!0&&ot.updateCamera(W),W=ot.getCamera()),A.isScene===!0&&A.onBeforeRender(E,A,W,z),f=oe.get(A,w.length),f.init(W),w.push(f),It.multiplyMatrices(W.projectionMatrix,W.matrixWorldInverse),L.setFromProjectionMatrix(It),st=this.localClippingEnabled,O=mt.init(this.clippingPlanes,st),g=zt.get(A,S.length),g.init(),S.push(g),ot.enabled===!0&&ot.isPresenting===!0){const vt=E.xr.getDepthSensingMesh();vt!==null&&fs(vt,W,-1/0,E.sortObjects)}fs(A,W,0,E.sortObjects),g.finish(),E.sortObjects===!0&&g.sort(gt,ht),re=ot.enabled===!1||ot.isPresenting===!1||ot.hasDepthSensing()===!1,re&&qt.addToRenderList(g,A),this.info.render.frame++,O===!0&&mt.beginShadows();const tt=f.state.shadowsArray;Lt.render(tt,A,W),O===!0&&mt.endShadows(),this.info.autoReset===!0&&this.info.reset();const nt=g.opaque,q=g.transmissive;if(f.setupLights(),W.isArrayCamera){const vt=W.cameras;if(q.length>0)for(let Ct=0,Bt=vt.length;Ct<Bt;Ct++){const Ot=vt[Ct];Ai(nt,q,A,Ot)}re&&qt.render(A);for(let Ct=0,Bt=vt.length;Ct<Bt;Ct++){const Ot=vt[Ct];Vr(g,A,Ot,Ot.viewport)}}else q.length>0&&Ai(nt,q,A,W),re&&qt.render(A),Vr(g,A,W);z!==null&&(N.updateMultisampleRenderTarget(z),N.updateRenderTargetMipmap(z)),A.isScene===!0&&A.onAfterRender(E,A,W),ye.resetDefaultState(),y=-1,M=null,w.pop(),w.length>0?(f=w[w.length-1],O===!0&&mt.setGlobalState(E.clippingPlanes,f.state.camera)):f=null,S.pop(),S.length>0?g=S[S.length-1]:g=null};function fs(A,W,tt,nt){if(A.visible===!1)return;if(A.layers.test(W.layers)){if(A.isGroup)tt=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(W);else if(A.isLight)f.pushLight(A),A.castShadow&&f.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||L.intersectsSprite(A)){nt&&Zt.setFromMatrixPosition(A.matrixWorld).applyMatrix4(It);const Ct=lt.update(A),Bt=A.material;Bt.visible&&g.push(A,Ct,Bt,tt,Zt.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||L.intersectsObject(A))){const Ct=lt.update(A),Bt=A.material;if(nt&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),Zt.copy(A.boundingSphere.center)):(Ct.boundingSphere===null&&Ct.computeBoundingSphere(),Zt.copy(Ct.boundingSphere.center)),Zt.applyMatrix4(A.matrixWorld).applyMatrix4(It)),Array.isArray(Bt)){const Ot=Ct.groups;for(let jt=0,Ht=Ot.length;jt<Ht;jt++){const Nt=Ot[jt],ce=Bt[Nt.materialIndex];ce&&ce.visible&&g.push(A,Ct,ce,tt,Zt.z,Nt)}}else Bt.visible&&g.push(A,Ct,Bt,tt,Zt.z,null)}}const vt=A.children;for(let Ct=0,Bt=vt.length;Ct<Bt;Ct++)fs(vt[Ct],W,tt,nt)}function Vr(A,W,tt,nt){const q=A.opaque,vt=A.transmissive,Ct=A.transparent;f.setupLightsView(tt),O===!0&&mt.setGlobalState(E.clippingPlanes,tt),nt&&Xt.viewport(I.copy(nt)),q.length>0&&ps(q,W,tt),vt.length>0&&ps(vt,W,tt),Ct.length>0&&ps(Ct,W,tt),Xt.buffers.depth.setTest(!0),Xt.buffers.depth.setMask(!0),Xt.buffers.color.setMask(!0),Xt.setPolygonOffset(!1)}function Ai(A,W,tt,nt){if((tt.isScene===!0?tt.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[nt.id]===void 0&&(f.state.transmissionRenderTarget[nt.id]=new Zn(1,1,{generateMipmaps:!0,type:ae.has("EXT_color_buffer_half_float")||ae.has("EXT_color_buffer_float")?xi:bi,minFilter:as,samples:4,stencilBuffer:o,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:pe.workingColorSpace}));const vt=f.state.transmissionRenderTarget[nt.id],Ct=nt.viewport||I;vt.setSize(Ct.z,Ct.w);const Bt=E.getRenderTarget();E.setRenderTarget(vt),E.getClearColor(Z),et=E.getClearAlpha(),et<1&&E.setClearColor(16777215,.5),E.clear(),re&&qt.render(tt);const Ot=E.toneMapping;E.toneMapping=ki;const jt=nt.viewport;if(nt.viewport!==void 0&&(nt.viewport=void 0),f.setupLightsView(nt),O===!0&&mt.setGlobalState(E.clippingPlanes,nt),ps(A,tt,nt),N.updateMultisampleRenderTarget(vt),N.updateRenderTargetMipmap(vt),ae.has("WEBGL_multisampled_render_to_texture")===!1){let Ht=!1;for(let Nt=0,ce=W.length;Nt<ce;Nt++){const Se=W[Nt],we=Se.object,on=Se.geometry,_e=Se.material,Wt=Se.group;if(_e.side===Ge&&we.layers.test(nt.layers)){const Bn=_e.side;_e.side=pn,_e.needsUpdate=!0,so(we,tt,nt,on,_e,Wt),_e.side=Bn,_e.needsUpdate=!0,Ht=!0}}Ht===!0&&(N.updateMultisampleRenderTarget(vt),N.updateRenderTargetMipmap(vt))}E.setRenderTarget(Bt),E.setClearColor(Z,et),jt!==void 0&&(nt.viewport=jt),E.toneMapping=Ot}function ps(A,W,tt){const nt=W.isScene===!0?W.overrideMaterial:null;for(let q=0,vt=A.length;q<vt;q++){const Ct=A[q],Bt=Ct.object,Ot=Ct.geometry,jt=nt===null?Ct.material:nt,Ht=Ct.group;Bt.layers.test(tt.layers)&&so(Bt,W,tt,Ot,jt,Ht)}}function so(A,W,tt,nt,q,vt){A.onBeforeRender(E,W,tt,nt,q,vt),A.modelViewMatrix.multiplyMatrices(tt.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),q.onBeforeRender(E,W,tt,nt,A,vt),q.transparent===!0&&q.side===Ge&&q.forceSinglePass===!1?(q.side=pn,q.needsUpdate=!0,E.renderBufferDirect(tt,W,nt,q,A,vt),q.side=Gi,q.needsUpdate=!0,E.renderBufferDirect(tt,W,nt,q,A,vt),q.side=Ge):E.renderBufferDirect(tt,W,nt,q,A,vt),A.onAfterRender(E,W,tt,nt,q,vt)}function ci(A,W,tt){W.isScene!==!0&&(W=ge);const nt=Yt.get(A),q=f.state.lights,vt=f.state.shadowsArray,Ct=q.state.version,Bt=Gt.getParameters(A,q.state,vt,W,tt),Ot=Gt.getProgramCacheKey(Bt);let jt=nt.programs;nt.environment=A.isMeshStandardMaterial?W.environment:null,nt.fog=W.fog,nt.envMap=(A.isMeshStandardMaterial?Q:T).get(A.envMap||nt.environment),nt.envMapRotation=nt.environment!==null&&A.envMap===null?W.environmentRotation:A.envMapRotation,jt===void 0&&(A.addEventListener("dispose",Qt),jt=new Map,nt.programs=jt);let Ht=jt.get(Ot);if(Ht!==void 0){if(nt.currentProgram===Ht&&nt.lightsStateVersion===Ct)return ro(A,Bt),Ht}else Bt.uniforms=Gt.getUniforms(A),A.onBeforeCompile(Bt,E),Ht=Gt.acquireProgram(Bt,Ot),jt.set(Ot,Ht),nt.uniforms=Bt.uniforms;const Nt=nt.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Nt.clippingPlanes=mt.uniform),ro(A,Bt),nt.needsLights=Bo(A),nt.lightsStateVersion=Ct,nt.needsLights&&(Nt.ambientLightColor.value=q.state.ambient,Nt.lightProbe.value=q.state.probe,Nt.directionalLights.value=q.state.directional,Nt.directionalLightShadows.value=q.state.directionalShadow,Nt.spotLights.value=q.state.spot,Nt.spotLightShadows.value=q.state.spotShadow,Nt.rectAreaLights.value=q.state.rectArea,Nt.ltc_1.value=q.state.rectAreaLTC1,Nt.ltc_2.value=q.state.rectAreaLTC2,Nt.pointLights.value=q.state.point,Nt.pointLightShadows.value=q.state.pointShadow,Nt.hemisphereLights.value=q.state.hemi,Nt.directionalShadowMap.value=q.state.directionalShadowMap,Nt.directionalShadowMatrix.value=q.state.directionalShadowMatrix,Nt.spotShadowMap.value=q.state.spotShadowMap,Nt.spotLightMatrix.value=q.state.spotLightMatrix,Nt.spotLightMap.value=q.state.spotLightMap,Nt.pointShadowMap.value=q.state.pointShadowMap,Nt.pointShadowMatrix.value=q.state.pointShadowMatrix),nt.currentProgram=Ht,nt.uniformsList=null,Ht}function oo(A){if(A.uniformsList===null){const W=A.currentProgram.getUniforms();A.uniformsList=wr.seqWithValue(W.seq,A.uniforms)}return A.uniformsList}function ro(A,W){const tt=Yt.get(A);tt.outputColorSpace=W.outputColorSpace,tt.batching=W.batching,tt.batchingColor=W.batchingColor,tt.instancing=W.instancing,tt.instancingColor=W.instancingColor,tt.instancingMorph=W.instancingMorph,tt.skinning=W.skinning,tt.morphTargets=W.morphTargets,tt.morphNormals=W.morphNormals,tt.morphColors=W.morphColors,tt.morphTargetsCount=W.morphTargetsCount,tt.numClippingPlanes=W.numClippingPlanes,tt.numIntersection=W.numClipIntersection,tt.vertexAlphas=W.vertexAlphas,tt.vertexTangents=W.vertexTangents,tt.toneMapping=W.toneMapping}function ms(A,W,tt,nt,q){W.isScene!==!0&&(W=ge),N.resetTextureUnits();const vt=W.fog,Ct=nt.isMeshStandardMaterial?W.environment:null,Bt=z===null?E.outputColorSpace:z.isXRRenderTarget===!0?z.texture.colorSpace:Qs,Ot=(nt.isMeshStandardMaterial?Q:T).get(nt.envMap||Ct),jt=nt.vertexColors===!0&&!!tt.attributes.color&&tt.attributes.color.itemSize===4,Ht=!!tt.attributes.tangent&&(!!nt.normalMap||nt.anisotropy>0),Nt=!!tt.morphAttributes.position,ce=!!tt.morphAttributes.normal,Se=!!tt.morphAttributes.color;let we=ki;nt.toneMapped&&(z===null||z.isXRRenderTarget===!0)&&(we=E.toneMapping);const on=tt.morphAttributes.position||tt.morphAttributes.normal||tt.morphAttributes.color,_e=on!==void 0?on.length:0,Wt=Yt.get(nt),Bn=f.state.lights;if(O===!0&&(st===!0||A!==M)){const Sn=A===M&&nt.id===y;mt.setState(nt,A,Sn)}let me=!1;nt.version===Wt.__version?(Wt.needsLights&&Wt.lightsStateVersion!==Bn.state.version||Wt.outputColorSpace!==Bt||q.isBatchedMesh&&Wt.batching===!1||!q.isBatchedMesh&&Wt.batching===!0||q.isBatchedMesh&&Wt.batchingColor===!0&&q.colorTexture===null||q.isBatchedMesh&&Wt.batchingColor===!1&&q.colorTexture!==null||q.isInstancedMesh&&Wt.instancing===!1||!q.isInstancedMesh&&Wt.instancing===!0||q.isSkinnedMesh&&Wt.skinning===!1||!q.isSkinnedMesh&&Wt.skinning===!0||q.isInstancedMesh&&Wt.instancingColor===!0&&q.instanceColor===null||q.isInstancedMesh&&Wt.instancingColor===!1&&q.instanceColor!==null||q.isInstancedMesh&&Wt.instancingMorph===!0&&q.morphTexture===null||q.isInstancedMesh&&Wt.instancingMorph===!1&&q.morphTexture!==null||Wt.envMap!==Ot||nt.fog===!0&&Wt.fog!==vt||Wt.numClippingPlanes!==void 0&&(Wt.numClippingPlanes!==mt.numPlanes||Wt.numIntersection!==mt.numIntersection)||Wt.vertexAlphas!==jt||Wt.vertexTangents!==Ht||Wt.morphTargets!==Nt||Wt.morphNormals!==ce||Wt.morphColors!==Se||Wt.toneMapping!==we||Wt.morphTargetsCount!==_e)&&(me=!0):(me=!0,Wt.__version=nt.version);let xn=Wt.currentProgram;me===!0&&(xn=ci(nt,W,q));let Ci=!1,gn=!1,Vi=!1;const Pe=xn.getUniforms(),Dn=Wt.uniforms;if(Xt.useProgram(xn.program)&&(Ci=!0,gn=!0,Vi=!0),nt.id!==y&&(y=nt.id,gn=!0),Ci||M!==A){Xt.buffers.depth.getReversed()?(ct.copy(A.projectionMatrix),qh(ct),Xh(ct),Pe.setValue(X,"projectionMatrix",ct)):Pe.setValue(X,"projectionMatrix",A.projectionMatrix),Pe.setValue(X,"viewMatrix",A.matrixWorldInverse);const Qn=Pe.map.cameraPosition;Qn!==void 0&&Qn.setValue(X,Vt.setFromMatrixPosition(A.matrixWorld)),le.logarithmicDepthBuffer&&Pe.setValue(X,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(nt.isMeshPhongMaterial||nt.isMeshToonMaterial||nt.isMeshLambertMaterial||nt.isMeshBasicMaterial||nt.isMeshStandardMaterial||nt.isShaderMaterial)&&Pe.setValue(X,"isOrthographic",A.isOrthographicCamera===!0),M!==A&&(M=A,gn=!0,Vi=!0)}if(q.isSkinnedMesh){Pe.setOptional(X,q,"bindMatrix"),Pe.setOptional(X,q,"bindMatrixInverse");const Sn=q.skeleton;Sn&&(Sn.boneTexture===null&&Sn.computeBoneTexture(),Pe.setValue(X,"boneTexture",Sn.boneTexture,N))}q.isBatchedMesh&&(Pe.setOptional(X,q,"batchingTexture"),Pe.setValue(X,"batchingTexture",q._matricesTexture,N),Pe.setOptional(X,q,"batchingIdTexture"),Pe.setValue(X,"batchingIdTexture",q._indirectTexture,N),Pe.setOptional(X,q,"batchingColorTexture"),q._colorsTexture!==null&&Pe.setValue(X,"batchingColorTexture",q._colorsTexture,N));const Wi=tt.morphAttributes;if((Wi.position!==void 0||Wi.normal!==void 0||Wi.color!==void 0)&&Kt.update(q,tt,xn),(gn||Wt.receiveShadow!==q.receiveShadow)&&(Wt.receiveShadow=q.receiveShadow,Pe.setValue(X,"receiveShadow",q.receiveShadow)),nt.isMeshGouraudMaterial&&nt.envMap!==null&&(Dn.envMap.value=Ot,Dn.flipEnvMap.value=Ot.isCubeTexture&&Ot.isRenderTargetTexture===!1?-1:1),nt.isMeshStandardMaterial&&nt.envMap===null&&W.environment!==null&&(Dn.envMapIntensity.value=W.environmentIntensity),gn&&(Pe.setValue(X,"toneMappingExposure",E.toneMappingExposure),Wt.needsLights&&Oo(Dn,Vi),vt&&nt.fog===!0&&xt.refreshFogUniforms(Dn,vt),xt.refreshMaterialUniforms(Dn,nt,j,rt,f.state.transmissionRenderTarget[A.id]),wr.upload(X,oo(Wt),Dn,N)),nt.isShaderMaterial&&nt.uniformsNeedUpdate===!0&&(wr.upload(X,oo(Wt),Dn,N),nt.uniformsNeedUpdate=!1),nt.isSpriteMaterial&&Pe.setValue(X,"center",q.center),Pe.setValue(X,"modelViewMatrix",q.modelViewMatrix),Pe.setValue(X,"normalMatrix",q.normalMatrix),Pe.setValue(X,"modelMatrix",q.matrixWorld),nt.isShaderMaterial||nt.isRawShaderMaterial){const Sn=nt.uniformsGroups;for(let Qn=0,ti=Sn.length;Qn<ti;Qn++){const C=Sn[Qn];V.update(C,xn),V.bind(C,xn)}}return xn}function Oo(A,W){A.ambientLightColor.needsUpdate=W,A.lightProbe.needsUpdate=W,A.directionalLights.needsUpdate=W,A.directionalLightShadows.needsUpdate=W,A.pointLights.needsUpdate=W,A.pointLightShadows.needsUpdate=W,A.spotLights.needsUpdate=W,A.spotLightShadows.needsUpdate=W,A.rectAreaLights.needsUpdate=W,A.hemisphereLights.needsUpdate=W}function Bo(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return x},this.getActiveMipmapLevel=function(){return U},this.getRenderTarget=function(){return z},this.setRenderTargetTextures=function(A,W,tt){Yt.get(A.texture).__webglTexture=W,Yt.get(A.depthTexture).__webglTexture=tt;const nt=Yt.get(A);nt.__hasExternalTextures=!0,nt.__autoAllocateDepthBuffer=tt===void 0,nt.__autoAllocateDepthBuffer||ae.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),nt.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(A,W){const tt=Yt.get(A);tt.__webglFramebuffer=W,tt.__useDefaultFramebuffer=W===void 0},this.setRenderTarget=function(A,W=0,tt=0){z=A,x=W,U=tt;let nt=!0,q=null,vt=!1,Ct=!1;if(A){const Ot=Yt.get(A);if(Ot.__useDefaultFramebuffer!==void 0)Xt.bindFramebuffer(X.FRAMEBUFFER,null),nt=!1;else if(Ot.__webglFramebuffer===void 0)N.setupRenderTarget(A);else if(Ot.__hasExternalTextures)N.rebindTextures(A,Yt.get(A.texture).__webglTexture,Yt.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const Nt=A.depthTexture;if(Ot.__boundDepthTexture!==Nt){if(Nt!==null&&Yt.has(Nt)&&(A.width!==Nt.image.width||A.height!==Nt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");N.setupDepthRenderbuffer(A)}}const jt=A.texture;(jt.isData3DTexture||jt.isDataArrayTexture||jt.isCompressedArrayTexture)&&(Ct=!0);const Ht=Yt.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Ht[W])?q=Ht[W][tt]:q=Ht[W],vt=!0):A.samples>0&&N.useMultisampledRTT(A)===!1?q=Yt.get(A).__webglMultisampledFramebuffer:Array.isArray(Ht)?q=Ht[tt]:q=Ht,I.copy(A.viewport),k.copy(A.scissor),F=A.scissorTest}else I.copy(Pt).multiplyScalar(j).floor(),k.copy(Y).multiplyScalar(j).floor(),F=Ut;if(Xt.bindFramebuffer(X.FRAMEBUFFER,q)&&nt&&Xt.drawBuffers(A,q),Xt.viewport(I),Xt.scissor(k),Xt.setScissorTest(F),vt){const Ot=Yt.get(A.texture);X.framebufferTexture2D(X.FRAMEBUFFER,X.COLOR_ATTACHMENT0,X.TEXTURE_CUBE_MAP_POSITIVE_X+W,Ot.__webglTexture,tt)}else if(Ct){const Ot=Yt.get(A.texture),jt=W||0;X.framebufferTextureLayer(X.FRAMEBUFFER,X.COLOR_ATTACHMENT0,Ot.__webglTexture,tt||0,jt)}y=-1},this.readRenderTargetPixels=function(A,W,tt,nt,q,vt,Ct){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Bt=Yt.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Ct!==void 0&&(Bt=Bt[Ct]),Bt){Xt.bindFramebuffer(X.FRAMEBUFFER,Bt);try{const Ot=A.texture,jt=Ot.format,Ht=Ot.type;if(!le.textureFormatReadable(jt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!le.textureTypeReadable(Ht)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}W>=0&&W<=A.width-nt&&tt>=0&&tt<=A.height-q&&X.readPixels(W,tt,nt,q,te.convert(jt),te.convert(Ht),vt)}finally{const Ot=z!==null?Yt.get(z).__webglFramebuffer:null;Xt.bindFramebuffer(X.FRAMEBUFFER,Ot)}}},this.readRenderTargetPixelsAsync=async function(A,W,tt,nt,q,vt,Ct){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Bt=Yt.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Ct!==void 0&&(Bt=Bt[Ct]),Bt){const Ot=A.texture,jt=Ot.format,Ht=Ot.type;if(!le.textureFormatReadable(jt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!le.textureTypeReadable(Ht))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(W>=0&&W<=A.width-nt&&tt>=0&&tt<=A.height-q){Xt.bindFramebuffer(X.FRAMEBUFFER,Bt);const Nt=X.createBuffer();X.bindBuffer(X.PIXEL_PACK_BUFFER,Nt),X.bufferData(X.PIXEL_PACK_BUFFER,vt.byteLength,X.STREAM_READ),X.readPixels(W,tt,nt,q,te.convert(jt),te.convert(Ht),0);const ce=z!==null?Yt.get(z).__webglFramebuffer:null;Xt.bindFramebuffer(X.FRAMEBUFFER,ce);const Se=X.fenceSync(X.SYNC_GPU_COMMANDS_COMPLETE,0);return X.flush(),await Wh(X,Se,4),X.bindBuffer(X.PIXEL_PACK_BUFFER,Nt),X.getBufferSubData(X.PIXEL_PACK_BUFFER,0,vt),X.deleteBuffer(Nt),X.deleteSync(Se),vt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(A,W=null,tt=0){A.isTexture!==!0&&(Mo("WebGLRenderer: copyFramebufferToTexture function signature has changed."),W=arguments[0]||null,A=arguments[1]);const nt=Math.pow(2,-tt),q=Math.floor(A.image.width*nt),vt=Math.floor(A.image.height*nt),Ct=W!==null?W.x:0,Bt=W!==null?W.y:0;N.setTexture2D(A,0),X.copyTexSubImage2D(X.TEXTURE_2D,tt,0,0,Ct,Bt,q,vt),Xt.unbindTexture()},this.copyTextureToTexture=function(A,W,tt=null,nt=null,q=0){A.isTexture!==!0&&(Mo("WebGLRenderer: copyTextureToTexture function signature has changed."),nt=arguments[0]||null,A=arguments[1],W=arguments[2],q=arguments[3]||0,tt=null);let vt,Ct,Bt,Ot,jt,Ht,Nt,ce,Se;const we=A.isCompressedTexture?A.mipmaps[q]:A.image;tt!==null?(vt=tt.max.x-tt.min.x,Ct=tt.max.y-tt.min.y,Bt=tt.isBox3?tt.max.z-tt.min.z:1,Ot=tt.min.x,jt=tt.min.y,Ht=tt.isBox3?tt.min.z:0):(vt=we.width,Ct=we.height,Bt=we.depth||1,Ot=0,jt=0,Ht=0),nt!==null?(Nt=nt.x,ce=nt.y,Se=nt.z):(Nt=0,ce=0,Se=0);const on=te.convert(W.format),_e=te.convert(W.type);let Wt;W.isData3DTexture?(N.setTexture3D(W,0),Wt=X.TEXTURE_3D):W.isDataArrayTexture||W.isCompressedArrayTexture?(N.setTexture2DArray(W,0),Wt=X.TEXTURE_2D_ARRAY):(N.setTexture2D(W,0),Wt=X.TEXTURE_2D),X.pixelStorei(X.UNPACK_FLIP_Y_WEBGL,W.flipY),X.pixelStorei(X.UNPACK_PREMULTIPLY_ALPHA_WEBGL,W.premultiplyAlpha),X.pixelStorei(X.UNPACK_ALIGNMENT,W.unpackAlignment);const Bn=X.getParameter(X.UNPACK_ROW_LENGTH),me=X.getParameter(X.UNPACK_IMAGE_HEIGHT),xn=X.getParameter(X.UNPACK_SKIP_PIXELS),Ci=X.getParameter(X.UNPACK_SKIP_ROWS),gn=X.getParameter(X.UNPACK_SKIP_IMAGES);X.pixelStorei(X.UNPACK_ROW_LENGTH,we.width),X.pixelStorei(X.UNPACK_IMAGE_HEIGHT,we.height),X.pixelStorei(X.UNPACK_SKIP_PIXELS,Ot),X.pixelStorei(X.UNPACK_SKIP_ROWS,jt),X.pixelStorei(X.UNPACK_SKIP_IMAGES,Ht);const Vi=A.isDataArrayTexture||A.isData3DTexture,Pe=W.isDataArrayTexture||W.isData3DTexture;if(A.isRenderTargetTexture||A.isDepthTexture){const Dn=Yt.get(A),Wi=Yt.get(W),Sn=Yt.get(Dn.__renderTarget),Qn=Yt.get(Wi.__renderTarget);Xt.bindFramebuffer(X.READ_FRAMEBUFFER,Sn.__webglFramebuffer),Xt.bindFramebuffer(X.DRAW_FRAMEBUFFER,Qn.__webglFramebuffer);for(let ti=0;ti<Bt;ti++)Vi&&X.framebufferTextureLayer(X.READ_FRAMEBUFFER,X.COLOR_ATTACHMENT0,Yt.get(A).__webglTexture,q,Ht+ti),A.isDepthTexture?(Pe&&X.framebufferTextureLayer(X.DRAW_FRAMEBUFFER,X.COLOR_ATTACHMENT0,Yt.get(W).__webglTexture,q,Se+ti),X.blitFramebuffer(Ot,jt,vt,Ct,Nt,ce,vt,Ct,X.DEPTH_BUFFER_BIT,X.NEAREST)):Pe?X.copyTexSubImage3D(Wt,q,Nt,ce,Se+ti,Ot,jt,vt,Ct):X.copyTexSubImage2D(Wt,q,Nt,ce,Se+ti,Ot,jt,vt,Ct);Xt.bindFramebuffer(X.READ_FRAMEBUFFER,null),Xt.bindFramebuffer(X.DRAW_FRAMEBUFFER,null)}else Pe?A.isDataTexture||A.isData3DTexture?X.texSubImage3D(Wt,q,Nt,ce,Se,vt,Ct,Bt,on,_e,we.data):W.isCompressedArrayTexture?X.compressedTexSubImage3D(Wt,q,Nt,ce,Se,vt,Ct,Bt,on,we.data):X.texSubImage3D(Wt,q,Nt,ce,Se,vt,Ct,Bt,on,_e,we):A.isDataTexture?X.texSubImage2D(X.TEXTURE_2D,q,Nt,ce,vt,Ct,on,_e,we.data):A.isCompressedTexture?X.compressedTexSubImage2D(X.TEXTURE_2D,q,Nt,ce,we.width,we.height,on,we.data):X.texSubImage2D(X.TEXTURE_2D,q,Nt,ce,vt,Ct,on,_e,we);X.pixelStorei(X.UNPACK_ROW_LENGTH,Bn),X.pixelStorei(X.UNPACK_IMAGE_HEIGHT,me),X.pixelStorei(X.UNPACK_SKIP_PIXELS,xn),X.pixelStorei(X.UNPACK_SKIP_ROWS,Ci),X.pixelStorei(X.UNPACK_SKIP_IMAGES,gn),q===0&&W.generateMipmaps&&X.generateMipmap(Wt),Xt.unbindTexture()},this.copyTextureToTexture3D=function(A,W,tt=null,nt=null,q=0){return A.isTexture!==!0&&(Mo("WebGLRenderer: copyTextureToTexture3D function signature has changed."),tt=arguments[0]||null,nt=arguments[1]||null,A=arguments[2],W=arguments[3],q=arguments[4]||0),Mo('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(A,W,tt,nt,q)},this.initRenderTarget=function(A){Yt.get(A).__webglFramebuffer===void 0&&N.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?N.setTextureCube(A,0):A.isData3DTexture?N.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?N.setTexture2DArray(A,0):N.setTexture2D(A,0),Xt.unbindTexture()},this.resetState=function(){x=0,U=0,z=null,Xt.reset(),ye.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Mi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=pe._getDrawingBufferColorSpace(t),e.unpackColorSpace=pe._getUnpackColorSpace()}}class Oi{constructor(t,e=1,i=1e3){this.isFog=!0,this.name="",this.color=new _t(t),this.near=e,this.far=i}clone(){return new Oi(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class ql extends $e{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new jn,this.environmentIntensity=1,this.environmentRotation=new jn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class ev{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=wl,this.updateRanges=[],this.version=0,this.uuid=Si()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,i){t*=this.stride,i*=e.stride;for(let s=0,o=this.stride;s<o;s++)this.array[t+s]=e.array[i+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Si()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(e,this.stride);return i.setUsage(this.usage),i}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Si()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const vn=new b;class Cr{constructor(t,e,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,i=this.data.count;e<i;e++)vn.fromBufferAttribute(this,e),vn.applyMatrix4(t),this.setXYZ(e,vn.x,vn.y,vn.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)vn.fromBufferAttribute(this,e),vn.applyNormalMatrix(t),this.setXYZ(e,vn.x,vn.y,vn.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)vn.fromBufferAttribute(this,e),vn.transformDirection(t),this.setXYZ(e,vn.x,vn.y,vn.z);return this}getComponent(t,e){let i=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(i=qn(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=Ee(i,this.array)),this.data.array[t*this.data.stride+this.offset+e]=i,this}setX(t,e){return this.normalized&&(e=Ee(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=Ee(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=Ee(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=Ee(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=qn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=qn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=qn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=qn(e,this.array)),e}setXY(t,e,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=Ee(e,this.array),i=Ee(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this}setXYZ(t,e,i,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=Ee(e,this.array),i=Ee(i,this.array),s=Ee(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=s,this}setXYZW(t,e,i,s,o){return t=t*this.data.stride+this.offset,this.normalized&&(e=Ee(e,this.array),i=Ee(i,this.array),s=Ee(s,this.array),o=Ee(o,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=s,this.data.array[t+3]=o,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let o=0;o<this.itemSize;o++)e.push(this.data.array[s+o])}return new Ve(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Cr(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let o=0;o<this.itemSize;o++)e.push(this.data.array[s+o])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Yn extends Ei{static get type(){return"SpriteMaterial"}constructor(t){super(),this.isSpriteMaterial=!0,this.color=new _t(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let Ls;const ho=new b,Is=new b,Ds=new b,Us=new Et,fo=new Et,hd=new Ce,cr=new b,po=new b,ur=new b,nu=new Et,xa=new Et,iu=new Et;class ri extends $e{constructor(t=new Yn){if(super(),this.isSprite=!0,this.type="Sprite",Ls===void 0){Ls=new Le;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new ev(e,5);Ls.setIndex([0,1,2,0,2,3]),Ls.setAttribute("position",new Cr(i,3,0,!1)),Ls.setAttribute("uv",new Cr(i,2,3,!1))}this.geometry=Ls,this.material=t,this.center=new Et(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Is.setFromMatrixScale(this.matrixWorld),hd.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Ds.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Is.multiplyScalar(-Ds.z);const i=this.material.rotation;let s,o;i!==0&&(o=Math.cos(i),s=Math.sin(i));const r=this.center;dr(cr.set(-.5,-.5,0),Ds,r,Is,s,o),dr(po.set(.5,-.5,0),Ds,r,Is,s,o),dr(ur.set(.5,.5,0),Ds,r,Is,s,o),nu.set(0,0),xa.set(1,0),iu.set(1,1);let a=t.ray.intersectTriangle(cr,po,ur,!1,ho);if(a===null&&(dr(po.set(-.5,.5,0),Ds,r,Is,s,o),xa.set(0,1),a=t.ray.intersectTriangle(cr,ur,po,!1,ho),a===null))return;const l=t.ray.origin.distanceTo(ho);l<t.near||l>t.far||e.push({distance:l,point:ho.clone(),uv:Fn.getInterpolation(ho,cr,po,ur,nu,xa,iu,new Et),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function dr(n,t,e,i,s,o){Us.subVectors(n,e).addScalar(.5).multiply(i),s!==void 0?(fo.x=o*Us.x-s*Us.y,fo.y=s*Us.x+o*Us.y):fo.copy(Us),n.copy(t),n.x+=fo.x,n.y+=fo.y,n.applyMatrix4(hd)}class kr extends Ei{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new _t(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Rr=new b,Pr=new b,su=new Ce,mo=new Or,hr=new No,Sa=new b,ou=new b;class Xl extends $e{constructor(t=new Le,e=new kr){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[0];for(let s=1,o=e.count;s<o;s++)Rr.fromBufferAttribute(e,s-1),Pr.fromBufferAttribute(e,s),i[s]=i[s-1],i[s]+=Rr.distanceTo(Pr);t.setAttribute("lineDistance",new Re(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const i=this.geometry,s=this.matrixWorld,o=t.params.Line.threshold,r=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),hr.copy(i.boundingSphere),hr.applyMatrix4(s),hr.radius+=o,t.ray.intersectsSphere(hr)===!1)return;su.copy(s).invert(),mo.copy(t.ray).applyMatrix4(su);const a=o/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=i.index,h=i.attributes.position;if(u!==null){const p=Math.max(0,r.start),m=Math.min(u.count,r.start+r.count);for(let v=p,g=m-1;v<g;v+=c){const f=u.getX(v),S=u.getX(v+1),w=fr(this,t,mo,l,f,S);w&&e.push(w)}if(this.isLineLoop){const v=u.getX(m-1),g=u.getX(p),f=fr(this,t,mo,l,v,g);f&&e.push(f)}}else{const p=Math.max(0,r.start),m=Math.min(h.count,r.start+r.count);for(let v=p,g=m-1;v<g;v+=c){const f=fr(this,t,mo,l,v,v+1);f&&e.push(f)}if(this.isLineLoop){const v=fr(this,t,mo,l,m-1,p);v&&e.push(v)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,r=s.length;o<r;o++){const a=s[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=o}}}}}function fr(n,t,e,i,s,o){const r=n.geometry.attributes.position;if(Rr.fromBufferAttribute(r,s),Pr.fromBufferAttribute(r,o),e.distanceSqToSegment(Rr,Pr,Sa,ou)>i)return;Sa.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(Sa);if(!(l<t.near||l>t.far))return{distance:l,point:ou.clone().applyMatrix4(n.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:n}}class js extends Ei{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new _t(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const ru=new Ce,El=new Or,pr=new No,mr=new b;class Lo extends $e{constructor(t=new Le,e=new js){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const i=this.geometry,s=this.matrixWorld,o=t.params.Points.threshold,r=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),pr.copy(i.boundingSphere),pr.applyMatrix4(s),pr.radius+=o,t.ray.intersectsSphere(pr)===!1)return;ru.copy(s).invert(),El.copy(t.ray).applyMatrix4(ru);const a=o/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=i.index,d=i.attributes.position;if(c!==null){const h=Math.max(0,r.start),p=Math.min(c.count,r.start+r.count);for(let m=h,v=p;m<v;m++){const g=c.getX(m);mr.fromBufferAttribute(d,g),au(mr,g,l,s,t,e,this)}}else{const h=Math.max(0,r.start),p=Math.min(d.count,r.start+r.count);for(let m=h,v=p;m<v;m++)mr.fromBufferAttribute(d,m),au(mr,m,l,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,r=s.length;o<r;o++){const a=s[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=o}}}}}function au(n,t,e,i,s,o,r){const a=El.distanceSqToPoint(n);if(a<e){const l=new b;El.closestPointToPoint(n,l),l.applyMatrix4(i);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;o.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:r})}}class nn extends yn{constructor(t,e,i,s,o,r,a,l,c){super(t,e,i,s,o,r,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Ti{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let i,s=this.getPoint(0),o=0;e.push(0);for(let r=1;r<=t;r++)i=this.getPoint(r/t),o+=i.distanceTo(s),e.push(o),s=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const i=this.getLengths();let s=0;const o=i.length;let r;e?r=e:r=t*i[o-1];let a=0,l=o-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=i[s]-r,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,i[s]===r)return s/(o-1);const u=i[s],h=i[s+1]-u,p=(r-u)/h;return(s+p)/(o-1)}getTangent(t,e){let s=t-1e-4,o=t+1e-4;s<0&&(s=0),o>1&&(o=1);const r=this.getPoint(s),a=this.getPoint(o),l=e||(r.isVector2?new Et:new b);return l.copy(a).sub(r).normalize(),l}getTangentAt(t,e){const i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e){const i=new b,s=[],o=[],r=[],a=new b,l=new Ce;for(let p=0;p<=t;p++){const m=p/t;s[p]=this.getTangentAt(m,new b)}o[0]=new b,r[0]=new b;let c=Number.MAX_VALUE;const u=Math.abs(s[0].x),d=Math.abs(s[0].y),h=Math.abs(s[0].z);u<=c&&(c=u,i.set(1,0,0)),d<=c&&(c=d,i.set(0,1,0)),h<=c&&i.set(0,0,1),a.crossVectors(s[0],i).normalize(),o[0].crossVectors(s[0],a),r[0].crossVectors(s[0],o[0]);for(let p=1;p<=t;p++){if(o[p]=o[p-1].clone(),r[p]=r[p-1].clone(),a.crossVectors(s[p-1],s[p]),a.length()>Number.EPSILON){a.normalize();const m=Math.acos(an(s[p-1].dot(s[p]),-1,1));o[p].applyMatrix4(l.makeRotationAxis(a,m))}r[p].crossVectors(s[p],o[p])}if(e===!0){let p=Math.acos(an(o[0].dot(o[t]),-1,1));p/=t,s[0].dot(a.crossVectors(o[0],o[t]))>0&&(p=-p);for(let m=1;m<=t;m++)o[m].applyMatrix4(l.makeRotationAxis(s[m],p*m)),r[m].crossVectors(s[m],o[m])}return{tangents:s,normals:o,binormals:r}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class fd extends Ti{constructor(t=0,e=0,i=1,s=1,o=0,r=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=i,this.yRadius=s,this.aStartAngle=o,this.aEndAngle=r,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new Et){const i=e,s=Math.PI*2;let o=this.aEndAngle-this.aStartAngle;const r=Math.abs(o)<Number.EPSILON;for(;o<0;)o+=s;for(;o>s;)o-=s;o<Number.EPSILON&&(r?o=0:o=s),this.aClockwise===!0&&!r&&(o===s?o=-s:o=o-s);const a=this.aStartAngle+t*o;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const u=Math.cos(this.aRotation),d=Math.sin(this.aRotation),h=l-this.aX,p=c-this.aY;l=h*u-p*d+this.aX,c=h*d+p*u+this.aY}return i.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class nv extends fd{constructor(t,e,i,s,o,r){super(t,e,i,i,s,o,r),this.isArcCurve=!0,this.type="ArcCurve"}}function Yl(){let n=0,t=0,e=0,i=0;function s(o,r,a,l){n=o,t=a,e=-3*o+3*r-2*a-l,i=2*o-2*r+a+l}return{initCatmullRom:function(o,r,a,l,c){s(r,a,c*(a-o),c*(l-r))},initNonuniformCatmullRom:function(o,r,a,l,c,u,d){let h=(r-o)/c-(a-o)/(c+u)+(a-r)/u,p=(a-r)/u-(l-r)/(u+d)+(l-a)/d;h*=u,p*=u,s(r,a,h,p)},calc:function(o){const r=o*o,a=r*o;return n+t*o+e*r+i*a}}}const gr=new b,wa=new Yl,ba=new Yl,Ea=new Yl;class Mn extends Ti{constructor(t=[],e=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=s}getPoint(t,e=new b){const i=e,s=this.points,o=s.length,r=(o-(this.closed?0:1))*t;let a=Math.floor(r),l=r-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/o)+1)*o:l===0&&a===o-1&&(a=o-2,l=1);let c,u;this.closed||a>0?c=s[(a-1)%o]:(gr.subVectors(s[0],s[1]).add(s[0]),c=gr);const d=s[a%o],h=s[(a+1)%o];if(this.closed||a+2<o?u=s[(a+2)%o]:(gr.subVectors(s[o-1],s[o-2]).add(s[o-1]),u=gr),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let m=Math.pow(c.distanceToSquared(d),p),v=Math.pow(d.distanceToSquared(h),p),g=Math.pow(h.distanceToSquared(u),p);v<1e-4&&(v=1),m<1e-4&&(m=v),g<1e-4&&(g=v),wa.initNonuniformCatmullRom(c.x,d.x,h.x,u.x,m,v,g),ba.initNonuniformCatmullRom(c.y,d.y,h.y,u.y,m,v,g),Ea.initNonuniformCatmullRom(c.z,d.z,h.z,u.z,m,v,g)}else this.curveType==="catmullrom"&&(wa.initCatmullRom(c.x,d.x,h.x,u.x,this.tension),ba.initCatmullRom(c.y,d.y,h.y,u.y,this.tension),Ea.initCatmullRom(c.z,d.z,h.z,u.z,this.tension));return i.set(wa.calc(l),ba.calc(l),Ea.calc(l)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(new b().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function lu(n,t,e,i,s){const o=(i-t)*.5,r=(s-e)*.5,a=n*n,l=n*a;return(2*e-2*i+o+r)*l+(-3*e+3*i-2*o-r)*a+o*n+e}function iv(n,t){const e=1-n;return e*e*t}function sv(n,t){return 2*(1-n)*n*t}function ov(n,t){return n*n*t}function Eo(n,t,e,i){return iv(n,t)+sv(n,e)+ov(n,i)}function rv(n,t){const e=1-n;return e*e*e*t}function av(n,t){const e=1-n;return 3*e*e*n*t}function lv(n,t){return 3*(1-n)*n*n*t}function cv(n,t){return n*n*n*t}function To(n,t,e,i,s){return rv(n,t)+av(n,e)+lv(n,i)+cv(n,s)}class uv extends Ti{constructor(t=new Et,e=new Et,i=new Et,s=new Et){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new Et){const i=e,s=this.v0,o=this.v1,r=this.v2,a=this.v3;return i.set(To(t,s.x,o.x,r.x,a.x),To(t,s.y,o.y,r.y,a.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class dv extends Ti{constructor(t=new b,e=new b,i=new b,s=new b){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new b){const i=e,s=this.v0,o=this.v1,r=this.v2,a=this.v3;return i.set(To(t,s.x,o.x,r.x,a.x),To(t,s.y,o.y,r.y,a.y),To(t,s.z,o.z,r.z,a.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class hv extends Ti{constructor(t=new Et,e=new Et){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new Et){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new Et){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class fv extends Ti{constructor(t=new b,e=new b){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new b){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new b){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class pv extends Ti{constructor(t=new Et,e=new Et,i=new Et){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new Et){const i=e,s=this.v0,o=this.v1,r=this.v2;return i.set(Eo(t,s.x,o.x,r.x),Eo(t,s.y,o.y,r.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class pd extends Ti{constructor(t=new b,e=new b,i=new b){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new b){const i=e,s=this.v0,o=this.v1,r=this.v2;return i.set(Eo(t,s.x,o.x,r.x),Eo(t,s.y,o.y,r.y),Eo(t,s.z,o.z,r.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class mv extends Ti{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new Et){const i=e,s=this.points,o=(s.length-1)*t,r=Math.floor(o),a=o-r,l=s[r===0?r:r-1],c=s[r],u=s[r>s.length-2?s.length-1:r+1],d=s[r>s.length-3?s.length-1:r+2];return i.set(lu(a,l.x,c.x,u.x,d.x),lu(a,l.y,c.y,u.y,d.y)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(new Et().fromArray(s))}return this}}var gv=Object.freeze({__proto__:null,ArcCurve:nv,CatmullRomCurve3:Mn,CubicBezierCurve:uv,CubicBezierCurve3:dv,EllipseCurve:fd,LineCurve:hv,LineCurve3:fv,QuadraticBezierCurve:pv,QuadraticBezierCurve3:pd,SplineCurve:mv});class Kn extends Le{constructor(t=1,e=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:i,thetaLength:s},e=Math.max(3,e);const o=[],r=[],a=[],l=[],c=new b,u=new Et;r.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let d=0,h=3;d<=e;d++,h+=3){const p=i+d/e*s;c.x=t*Math.cos(p),c.y=t*Math.sin(p),r.push(c.x,c.y,c.z),a.push(0,0,1),u.x=(r[h]/t+1)/2,u.y=(r[h+1]/t+1)/2,l.push(u.x,u.y)}for(let d=1;d<=e;d++)o.push(d,d+1,0);this.setIndex(o),this.setAttribute("position",new Re(r,3)),this.setAttribute("normal",new Re(a,3)),this.setAttribute("uv",new Re(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Kn(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class bt extends Le{constructor(t=1,e=1,i=1,s=32,o=1,r=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:s,heightSegments:o,openEnded:r,thetaStart:a,thetaLength:l};const c=this;s=Math.floor(s),o=Math.floor(o);const u=[],d=[],h=[],p=[];let m=0;const v=[],g=i/2;let f=0;S(),r===!1&&(t>0&&w(!0),e>0&&w(!1)),this.setIndex(u),this.setAttribute("position",new Re(d,3)),this.setAttribute("normal",new Re(h,3)),this.setAttribute("uv",new Re(p,2));function S(){const E=new b,G=new b;let x=0;const U=(e-t)/i;for(let z=0;z<=o;z++){const y=[],M=z/o,I=M*(e-t)+t;for(let k=0;k<=s;k++){const F=k/s,Z=F*l+a,et=Math.sin(Z),J=Math.cos(Z);G.x=I*et,G.y=-M*i+g,G.z=I*J,d.push(G.x,G.y,G.z),E.set(et,U,J).normalize(),h.push(E.x,E.y,E.z),p.push(F,1-M),y.push(m++)}v.push(y)}for(let z=0;z<s;z++)for(let y=0;y<o;y++){const M=v[y][z],I=v[y+1][z],k=v[y+1][z+1],F=v[y][z+1];(t>0||y!==0)&&(u.push(M,I,F),x+=3),(e>0||y!==o-1)&&(u.push(I,k,F),x+=3)}c.addGroup(f,x,0),f+=x}function w(E){const G=m,x=new Et,U=new b;let z=0;const y=E===!0?t:e,M=E===!0?1:-1;for(let k=1;k<=s;k++)d.push(0,g*M,0),h.push(0,M,0),p.push(.5,.5),m++;const I=m;for(let k=0;k<=s;k++){const Z=k/s*l+a,et=Math.cos(Z),J=Math.sin(Z);U.x=y*J,U.y=g*M,U.z=y*et,d.push(U.x,U.y,U.z),h.push(0,M,0),x.x=et*.5+.5,x.y=J*.5*M+.5,p.push(x.x,x.y),m++}for(let k=0;k<s;k++){const F=G+k,Z=I+k;E===!0?u.push(Z,Z+1,F):u.push(Z+1,Z,F),z+=3}c.addGroup(f,z,E===!0?1:2),f+=z}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new bt(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class ln extends bt{constructor(t=1,e=1,i=32,s=1,o=!1,r=0,a=Math.PI*2){super(0,t,e,i,s,o,r,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:i,heightSegments:s,openEnded:o,thetaStart:r,thetaLength:a}}static fromJSON(t){return new ln(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Gr extends Le{constructor(t=[],e=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:i,detail:s};const o=[],r=[];a(s),c(i),u(),this.setAttribute("position",new Re(o,3)),this.setAttribute("normal",new Re(o.slice(),3)),this.setAttribute("uv",new Re(r,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(S){const w=new b,E=new b,G=new b;for(let x=0;x<e.length;x+=3)p(e[x+0],w),p(e[x+1],E),p(e[x+2],G),l(w,E,G,S)}function l(S,w,E,G){const x=G+1,U=[];for(let z=0;z<=x;z++){U[z]=[];const y=S.clone().lerp(E,z/x),M=w.clone().lerp(E,z/x),I=x-z;for(let k=0;k<=I;k++)k===0&&z===x?U[z][k]=y:U[z][k]=y.clone().lerp(M,k/I)}for(let z=0;z<x;z++)for(let y=0;y<2*(x-z)-1;y++){const M=Math.floor(y/2);y%2===0?(h(U[z][M+1]),h(U[z+1][M]),h(U[z][M])):(h(U[z][M+1]),h(U[z+1][M+1]),h(U[z+1][M]))}}function c(S){const w=new b;for(let E=0;E<o.length;E+=3)w.x=o[E+0],w.y=o[E+1],w.z=o[E+2],w.normalize().multiplyScalar(S),o[E+0]=w.x,o[E+1]=w.y,o[E+2]=w.z}function u(){const S=new b;for(let w=0;w<o.length;w+=3){S.x=o[w+0],S.y=o[w+1],S.z=o[w+2];const E=g(S)/2/Math.PI+.5,G=f(S)/Math.PI+.5;r.push(E,1-G)}m(),d()}function d(){for(let S=0;S<r.length;S+=6){const w=r[S+0],E=r[S+2],G=r[S+4],x=Math.max(w,E,G),U=Math.min(w,E,G);x>.9&&U<.1&&(w<.2&&(r[S+0]+=1),E<.2&&(r[S+2]+=1),G<.2&&(r[S+4]+=1))}}function h(S){o.push(S.x,S.y,S.z)}function p(S,w){const E=S*3;w.x=t[E+0],w.y=t[E+1],w.z=t[E+2]}function m(){const S=new b,w=new b,E=new b,G=new b,x=new Et,U=new Et,z=new Et;for(let y=0,M=0;y<o.length;y+=9,M+=6){S.set(o[y+0],o[y+1],o[y+2]),w.set(o[y+3],o[y+4],o[y+5]),E.set(o[y+6],o[y+7],o[y+8]),x.set(r[M+0],r[M+1]),U.set(r[M+2],r[M+3]),z.set(r[M+4],r[M+5]),G.copy(S).add(w).add(E).divideScalar(3);const I=g(G);v(x,M+0,S,I),v(U,M+2,w,I),v(z,M+4,E,I)}}function v(S,w,E,G){G<0&&S.x===1&&(r[w]=S.x-1),E.x===0&&E.z===0&&(r[w]=G/2/Math.PI+.5)}function g(S){return Math.atan2(S.z,-S.x)}function f(S){return Math.atan2(-S.y,Math.sqrt(S.x*S.x+S.z*S.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Gr(t.vertices,t.indices,t.radius,t.details)}}class $l extends Gr{constructor(t=1,e=0){const i=(1+Math.sqrt(5))/2,s=1/i,o=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-i,0,-s,i,0,s,-i,0,s,i,-s,-i,0,-s,i,0,s,-i,0,s,i,0,-i,0,-s,i,0,-s,-i,0,s,i,0,s],r=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(o,r,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new $l(t.radius,t.detail)}}class ds extends Gr{constructor(t=1,e=0){const i=(1+Math.sqrt(5))/2,s=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],o=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,o,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new ds(t.radius,t.detail)}}class se extends Le{constructor(t=1,e=32,i=16,s=0,o=Math.PI*2,r=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:s,phiLength:o,thetaStart:r,thetaLength:a},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));const l=Math.min(r+a,Math.PI);let c=0;const u=[],d=new b,h=new b,p=[],m=[],v=[],g=[];for(let f=0;f<=i;f++){const S=[],w=f/i;let E=0;f===0&&r===0?E=.5/e:f===i&&l===Math.PI&&(E=-.5/e);for(let G=0;G<=e;G++){const x=G/e;d.x=-t*Math.cos(s+x*o)*Math.sin(r+w*a),d.y=t*Math.cos(r+w*a),d.z=t*Math.sin(s+x*o)*Math.sin(r+w*a),m.push(d.x,d.y,d.z),h.copy(d).normalize(),v.push(h.x,h.y,h.z),g.push(x+E,1-w),S.push(c++)}u.push(S)}for(let f=0;f<i;f++)for(let S=0;S<e;S++){const w=u[f][S+1],E=u[f][S],G=u[f+1][S],x=u[f+1][S+1];(f!==0||r>0)&&p.push(w,E,x),(f!==i-1||l<Math.PI)&&p.push(E,G,x)}this.setIndex(p),this.setAttribute("position",new Re(m,3)),this.setAttribute("normal",new Re(v,3)),this.setAttribute("uv",new Re(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new se(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class ai extends Le{constructor(t=1,e=.4,i=12,s=48,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:s,arc:o},i=Math.floor(i),s=Math.floor(s);const r=[],a=[],l=[],c=[],u=new b,d=new b,h=new b;for(let p=0;p<=i;p++)for(let m=0;m<=s;m++){const v=m/s*o,g=p/i*Math.PI*2;d.x=(t+e*Math.cos(g))*Math.cos(v),d.y=(t+e*Math.cos(g))*Math.sin(v),d.z=e*Math.sin(g),a.push(d.x,d.y,d.z),u.x=t*Math.cos(v),u.y=t*Math.sin(v),h.subVectors(d,u).normalize(),l.push(h.x,h.y,h.z),c.push(m/s),c.push(p/i)}for(let p=1;p<=i;p++)for(let m=1;m<=s;m++){const v=(s+1)*p+m-1,g=(s+1)*(p-1)+m-1,f=(s+1)*(p-1)+m,S=(s+1)*p+m;r.push(v,g,S),r.push(g,f,S)}this.setIndex(r),this.setAttribute("position",new Re(a,3)),this.setAttribute("normal",new Re(l,3)),this.setAttribute("uv",new Re(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ai(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class Ks extends Le{constructor(t=new pd(new b(-1,-1,0),new b(-1,1,0),new b(1,1,0)),e=64,i=1,s=8,o=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:i,radialSegments:s,closed:o};const r=t.computeFrenetFrames(e,o);this.tangents=r.tangents,this.normals=r.normals,this.binormals=r.binormals;const a=new b,l=new b,c=new Et;let u=new b;const d=[],h=[],p=[],m=[];v(),this.setIndex(m),this.setAttribute("position",new Re(d,3)),this.setAttribute("normal",new Re(h,3)),this.setAttribute("uv",new Re(p,2));function v(){for(let w=0;w<e;w++)g(w);g(o===!1?e:0),S(),f()}function g(w){u=t.getPointAt(w/e,u);const E=r.normals[w],G=r.binormals[w];for(let x=0;x<=s;x++){const U=x/s*Math.PI*2,z=Math.sin(U),y=-Math.cos(U);l.x=y*E.x+z*G.x,l.y=y*E.y+z*G.y,l.z=y*E.z+z*G.z,l.normalize(),h.push(l.x,l.y,l.z),a.x=u.x+i*l.x,a.y=u.y+i*l.y,a.z=u.z+i*l.z,d.push(a.x,a.y,a.z)}}function f(){for(let w=1;w<=e;w++)for(let E=1;E<=s;E++){const G=(s+1)*(w-1)+(E-1),x=(s+1)*w+(E-1),U=(s+1)*w+E,z=(s+1)*(w-1)+E;m.push(G,x,z),m.push(x,U,z)}}function S(){for(let w=0;w<=e;w++)for(let E=0;E<=s;E++)c.x=w/e,c.y=E/s,p.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new Ks(new gv[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}class vv extends fn{static get type(){return"RawShaderMaterial"}constructor(t){super(t),this.isRawShaderMaterial=!0}}class $ extends Ei{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new _t(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new _t(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ol,this.normalScale=new Et(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new jn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Je extends Ei{static get type(){return"MeshLambertMaterial"}constructor(t){super(),this.isMeshLambertMaterial=!0,this.color=new _t(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new _t(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ol,this.normalScale=new Et(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new jn,this.combine=Ll,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Hr extends $e{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new _t(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class md extends Hr{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy($e.DEFAULT_UP),this.updateMatrix(),this.groundColor=new _t(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Ta=new Ce,cu=new b,uu=new b;class gd{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Et(512,512),this.map=null,this.mapPass=null,this.matrix=new Ce,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Gl,this._frameExtents=new Et(1,1),this._viewportCount=1,this._viewports=[new Ae(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;cu.setFromMatrixPosition(t.matrixWorld),e.position.copy(cu),uu.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(uu),e.updateMatrixWorld(),Ta.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ta),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Ta)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const du=new Ce,go=new b,Aa=new b;class _v extends gd{constructor(){super(new Ue(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Et(4,2),this._viewportCount=6,this._viewports=[new Ae(2,1,1,1),new Ae(0,1,1,1),new Ae(3,1,1,1),new Ae(1,1,1,1),new Ae(3,0,1,1),new Ae(1,0,1,1)],this._cubeDirections=[new b(1,0,0),new b(-1,0,0),new b(0,0,1),new b(0,0,-1),new b(0,1,0),new b(0,-1,0)],this._cubeUps=[new b(0,1,0),new b(0,1,0),new b(0,1,0),new b(0,1,0),new b(0,0,1),new b(0,0,-1)]}updateMatrices(t,e=0){const i=this.camera,s=this.matrix,o=t.distance||i.far;o!==i.far&&(i.far=o,i.updateProjectionMatrix()),go.setFromMatrixPosition(t.matrixWorld),i.position.copy(go),Aa.copy(i.position),Aa.add(this._cubeDirections[e]),i.up.copy(this._cubeUps[e]),i.lookAt(Aa),i.updateMatrixWorld(),s.makeTranslation(-go.x,-go.y,-go.z),du.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(du)}}class Zl extends Hr{constructor(t,e,i=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new _v}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class Mv extends gd{constructor(){super(new Hl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class vd extends Hr{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy($e.DEFAULT_UP),this.updateMatrix(),this.target=new $e,this.shadow=new Mv}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class _d extends Hr{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class yv{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=hu(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=hu();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function hu(){return performance.now()}const fu=new Ce;class xv{constructor(t,e,i=0,s=1/0){this.ray=new Or(t,e),this.near=i,this.far=s,this.camera=null,this.layers=new kl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return fu.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(fu),this}intersectObject(t,e=!0,i=[]){return Tl(t,this,i,e),i.sort(pu),i}intersectObjects(t,e=!0,i=[]){for(let s=0,o=t.length;s<o;s++)Tl(t[s],this,i,e);return i.sort(pu),i}}function pu(n,t){return n.distance-t.distance}function Tl(n,t,e,i){let s=!0;if(n.layers.test(t.layers)&&n.raycast(t,e)===!1&&(s=!1),s===!0&&i===!0){const o=n.children;for(let r=0,a=o.length;r<a;r++)Tl(o[r],t,e,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Cl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Cl);const Md={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class no{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const Sv=new Hl(-1,1,1,-1,0,1);class wv extends Le{constructor(){super(),this.setAttribute("position",new Re([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Re([0,2,0,0,2,0],2))}}const bv=new wv;class jl{constructor(t){this._mesh=new R(bv,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,Sv)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class Ev extends no{constructor(t,e){super(),this.textureID=e!==void 0?e:"tDiffuse",t instanceof fn?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=Po.clone(t.uniforms),this.material=new fn({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this.fsQuad=new jl(this.material)}render(t,e,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this.fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class mu extends no{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,i){const s=t.getContext(),o=t.state;o.buffers.color.setMask(!1),o.buffers.depth.setMask(!1),o.buffers.color.setLocked(!0),o.buffers.depth.setLocked(!0);let r,a;this.inverse?(r=0,a=1):(r=1,a=0),o.buffers.stencil.setTest(!0),o.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),o.buffers.stencil.setFunc(s.ALWAYS,r,4294967295),o.buffers.stencil.setClear(a),o.buffers.stencil.setLocked(!0),t.setRenderTarget(i),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),o.buffers.color.setLocked(!1),o.buffers.depth.setLocked(!1),o.buffers.color.setMask(!0),o.buffers.depth.setMask(!0),o.buffers.stencil.setLocked(!1),o.buffers.stencil.setFunc(s.EQUAL,1,4294967295),o.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),o.buffers.stencil.setLocked(!0)}}class Tv extends no{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class Av{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){const i=t.getSize(new Et);this._width=i.width,this._height=i.height,e=new Zn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:xi}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Ev(Md),this.copyPass.material.blending=yi,this.clock=new yv}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());const e=this.renderer.getRenderTarget();let i=!1;for(let s=0,o=this.passes.length;s<o;s++){const r=this.passes[s];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),r.render(this.renderer,this.writeBuffer,this.readBuffer,t,i),r.needsSwap){if(i){const a=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}mu!==void 0&&(r instanceof mu?i=!0:r instanceof Tv&&(i=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){const e=this.renderer.getSize(new Et);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const i=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(i,s),this.renderTarget2.setSize(i,s);for(let o=0;o<this.passes.length;o++)this.passes[o].setSize(i,s)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class Cv extends no{constructor(t,e,i=null,s=null,o=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=i,this.clearColor=s,this.clearAlpha=o,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new _t}render(t,e,i){const s=t.autoClear;t.autoClear=!1;let o,r;this.overrideMaterial!==null&&(r=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(o=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(o),this.overrideMaterial!==null&&(this.scene.overrideMaterial=r),t.autoClear=s}}const Rv={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new _t(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class Js extends no{constructor(t,e,i,s){super(),this.strength=e!==void 0?e:1,this.radius=i,this.threshold=s,this.resolution=t!==void 0?new Et(t.x,t.y):new Et(256,256),this.clearColor=new _t(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let o=Math.round(this.resolution.x/2),r=Math.round(this.resolution.y/2);this.renderTargetBright=new Zn(o,r,{type:xi}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let d=0;d<this.nMips;d++){const h=new Zn(o,r,{type:xi});h.texture.name="UnrealBloomPass.h"+d,h.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(h);const p=new Zn(o,r,{type:xi});p.texture.name="UnrealBloomPass.v"+d,p.texture.generateMipmaps=!1,this.renderTargetsVertical.push(p),o=Math.round(o/2),r=Math.round(r/2)}const a=Rv;this.highPassUniforms=Po.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new fn({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];o=Math.round(this.resolution.x/2),r=Math.round(this.resolution.y/2);for(let d=0;d<this.nMips;d++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[d])),this.separableBlurMaterials[d].uniforms.invSize.value=new Et(1/o,1/r),o=Math.round(o/2),r=Math.round(r/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new b(1,1,1),new b(1,1,1),new b(1,1,1),new b(1,1,1),new b(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const u=Md;this.copyUniforms=Po.clone(u.uniforms),this.blendMaterial=new fn({uniforms:this.copyUniforms,vertexShader:u.vertexShader,fragmentShader:u.fragmentShader,blending:Xe,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new _t,this.oldClearAlpha=1,this.basic=new Be,this.fsQuad=new jl(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(t,e){let i=Math.round(t/2),s=Math.round(e/2);this.renderTargetBright.setSize(i,s);for(let o=0;o<this.nMips;o++)this.renderTargetsHorizontal[o].setSize(i,s),this.renderTargetsVertical[o].setSize(i,s),this.separableBlurMaterials[o].uniforms.invSize.value=new Et(1/i,1/s),i=Math.round(i/2),s=Math.round(s/2)}render(t,e,i,s,o){t.getClearColor(this._oldClearColor),this.oldClearAlpha=t.getClearAlpha();const r=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),o&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=i.texture,t.setRenderTarget(null),t.clear(),this.fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this.fsQuad.render(t);let a=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[l].uniforms.direction.value=Js.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[l]),t.clear(),this.fsQuad.render(t),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=Js.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[l]),t.clear(),this.fsQuad.render(t),a=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this.fsQuad.render(t),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,o&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(i),this.fsQuad.render(t)),t.setClearColor(this._oldClearColor,this.oldClearAlpha),t.autoClear=r}getSeperableBlurMaterial(t){const e=[];for(let i=0;i<t;i++)e.push(.39894*Math.exp(-.5*i*i/(t*t))/t);return new fn({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new Et(.5,.5)},direction:{value:new Et(.5,.5)},gaussianCoefficients:{value:e}},vertexShader:`varying vec2 vUv;
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
				}`})}getCompositeMaterial(t){return new fn({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
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
				}`})}}Js.BlurDirectionX=new Et(1,0);Js.BlurDirectionY=new Et(0,1);const Pv={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class Lv extends no{constructor(){super();const t=Pv;this.uniforms=Po.clone(t.uniforms),this.material=new vv({name:t.name,uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader}),this.fsQuad=new jl(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},pe.getTransfer(this._outputColorSpace)===be&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Uu?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Nu?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===zu?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Io?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Fu?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Ou&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}let Ne=!1;function Iv(n){Ne=n}function cs(){return Ne}const ie={skyTop:14930610,skyMid:15524034,skyHorizon:16116950,sun:15317355,ground:13811085,groundDark:12559992,walnut:5917238,walnutDark:4338986,bronze:10125655,terracotta:12618344,amber:13608308,hill:12759693,path:16777215,pathEdge:15789280};function On(n,t){const e=document.createElement("canvas");e.width=128,e.height=128;const i=e.getContext("2d"),s=i.createRadialGradient(64,64,64*n,64,64,64);s.addColorStop(0,t),s.addColorStop(1,"rgba(0,0,0,0)"),i.fillStyle=s,i.fillRect(0,0,128,128);const o=new nn(e);return o.colorSpace=xe,o}function Lr(n,t,e){const i=t.split(" "),s=[];let o="";for(const r of i){const a=o?o+" "+r:r;n.measureText(a).width>e&&o?(s.push(o),o=r):o=a}return o&&s.push(o),s}function gu(n,t,e,i,s,o){let r=i;n.font=`600 ${r}px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif`;let a=Lr(n,t,e);for(;a.length>o&&r>s;)r-=4,n.font=`600 ${r}px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif`,a=Lr(n,t,e);return{lines:a,size:r}}function yd(){const n=document.createElement("canvas");n.width=256,n.height=256;const t=n.getContext("2d");t.fillStyle="#cdb98c",t.fillRect(0,0,256,256);for(let i=0;i<26;i++){const s=172+Math.random()*34;t.fillStyle=`rgba(${s|0},${s*.93|0},${s*.74|0},${(.05+Math.random()*.1).toFixed(3)})`,t.beginPath(),t.ellipse(Math.random()*256,Math.random()*256,14+Math.random()*30,10+Math.random()*22,Math.random()*Math.PI,0,Math.PI*2),t.fill()}for(let i=0;i<2200;i++){const s=168+Math.random()*42;t.fillStyle=`rgba(${s|0},${s*.92|0},${s*.72|0},${(Math.random()*.16).toFixed(3)})`,t.fillRect(Math.random()*256,Math.random()*256,2+Math.random()*4,2+Math.random()*4)}for(let i=0;i<120;i++)t.fillStyle="rgba(110,86,52,"+(.12+Math.random()*.2).toFixed(3)+")",t.beginPath(),t.arc(Math.random()*256,Math.random()*256,1+Math.random()*2,0,Math.PI*2),t.fill();const e=new nn(n);return e.colorSpace=xe,e.wrapS=e.wrapT=Hi,e.repeat.set(Ne?48:90,Ne?48:90),e.anisotropy=Ne?2:8,e}function zs(){const n=document.createElement("canvas");n.width=256,n.height=256;const t=n.getContext("2d");t.fillStyle="#212429",t.fillRect(0,0,256,256);for(let i=0;i<4600;i++){const s=26+Math.random()*40;t.fillStyle=`rgba(${s|0},${s*.98|0},${s*1.04|0},${(Math.random()*.28).toFixed(3)})`,t.fillRect(Math.random()*256,Math.random()*256,1+Math.random()*2,1+Math.random()*2)}for(let i=0;i<700;i++)t.fillStyle=`rgba(118,124,134,${(Math.random()*.1).toFixed(3)})`,t.fillRect(Math.random()*256,Math.random()*256,1+Math.random()*2,1+Math.random()*2);for(const i of[42,178]){const s=t.createLinearGradient(i,0,i+34,256);s.addColorStop(0,"rgba(8,10,12,0)"),s.addColorStop(.5,"rgba(8,10,12,0.5)"),s.addColorStop(1,"rgba(8,10,12,0)"),t.fillStyle=s,t.fillRect(i,0,34,256)}t.fillStyle="rgba(6,8,11,0.38)",t.fillRect(127,0,2,256);const e=new nn(n);return e.colorSpace=xe,e.wrapS=e.wrapT=Hi,e.repeat.set(1,60),e.anisotropy=Ne?2:8,e}function gi(n,t,e,i,s=500,o=!1){const r=n.getSpacedPoints(s),a=new Float32Array((s+1)*6),l=new Float32Array((s+1)*4),c=new Uint32Array(s*6);for(let h=0;h<=s;h++){const p=r[Math.min(h,s-1)],m=r[Math.min(h+1,s-1)],v=new b().subVectors(m,p).normalize(),g=new b(-v.z,0,v.x).normalize(),f=p.clone().add(g.clone().multiplyScalar(-t/2)),S=p.clone().add(g.clone().multiplyScalar(t/2)),w=h*6;if(a[w]=f.x,a[w+1]=f.y,a[w+2]=f.z,a[w+3]=S.x,a[w+4]=S.y,a[w+5]=S.z,l[h*4]=0,l[h*4+1]=h/s,l[h*4+2]=1,l[h*4+3]=h/s,h<s){const E=h*2,G=h*2+1,x=h*2+2,U=h*2+3,z=h*6;c[z]=E,c[z+1]=x,c[z+2]=G,c[z+3]=G,c[z+4]=x,c[z+5]=U}}const u=new Le;u.setAttribute("position",new Ve(a,3)),u.setAttribute("uv",new Ve(l,2)),u.setIndex(new Ve(c,1)),u.computeVertexNormals();const d=new R(u,o?new Be({color:e,side:Ge}):new $({color:e,roughness:.85,metalness:.02,map:i||null,side:Ge}));return d.receiveShadow=!0,d}function xd(n,t,e,i,s){const o=new yt,r=t.getPointAt(e),a=t.getTangentAt(e),c=new b(-a.z,0,a.x).normalize().clone().multiplyScalar(i*(Ne?6:7.4)),u=s%3-1;o.position.set(r.x+c.x+u*.5,0,r.z+c.z+u*.5);const d=t.getPointAt(Math.max(0,e-.035)),h=new b().subVectors(d,o.position).normalize(),p=Math.atan2(h.x,h.z);o.rotation.y=p;const m=new $({color:ie.walnut,roughness:.8,metalness:.05});m.emissive=new _t(3817293),m.emissiveIntensity=0;const v=new R(new ft(6.6,4.4,.22),m);v.position.y=3,v.castShadow=!1,o.add(v);const g=new $({color:12035198,roughness:.92}),f=new R(new ft(5.6,.4,.8),g);f.position.y=.2,f.castShadow=!1,o.add(f);const S=new $({color:10125655,roughness:.9}),w=new $({color:4338986,roughness:1}),E=new $({color:6257226,roughness:1,flatShading:!0});for(const gt of[-2.9,2.9]){const ht=new R(new ft(.5,.34,.5),S);ht.position.set(gt,.17,.55),o.add(ht);const Pt=new R(new ft(.42,.1,.42),w);Pt.position.set(gt,.34,.55),o.add(Pt);for(const Y of[-.1,.12]){const Ut=new R(new ds(.14,1),E);Ut.position.set(gt+Y,.42,.55),o.add(Ut);const L=new R(new se(.05,6,5),new $({color:gt<0?12618344:13608308,roughness:.9}));L.position.set(gt+Y,.52,.55),o.add(L)}}const G=new $({color:ie.bronze,roughness:.75,metalness:.12}),x=new R(new ft(7,.26,.3),G);x.position.y=5.32,o.add(x);const U=new R(new ft(7,.26,.3),G);U.position.y=.72,o.add(U);for(const gt of[-3.5,3.5]){const ht=new R(new ft(.26,4.8,.3),G);ht.position.set(gt,3,0),o.add(ht)}const z=new $({color:ie.walnutDark,roughness:.7,metalness:.1});for(const gt of[-2.5,2.5]){const ht=new R(new ft(.32,.8,.32),z);ht.position.set(gt,.4,0),ht.castShadow=!1,o.add(ht)}const y=Ne?1024:1280,M=Math.round(y*(660/1024)),I=vu(n,s,y,M,!1),k=vu(n,s,y,M,!0),F=new Je({map:I,color:9735540});F.emissive=new _t(15781776),F.emissiveIntensity=0;const Z=new R(new Jt(6.2,4),F);Z.position.set(0,3,.125),o.add(Z);const et=new R(new Jt(6.2,4),new $({color:ie.walnutDark,roughness:.9}));et.position.set(0,3,-.125),et.rotation.y=Math.PI,o.add(et);const J=Ne?null:new Zl(15246172,0,26,2);J&&(J.position.set(0,3.3,2.4),o.add(J));const rt=new $({color:ie.amber,emissive:ie.amber,emissiveIntensity:.22}),j=new R(new se(.09,12,12),rt);return j.position.set(0,5.52,0),o.add(j),{group:o,frontMat:F,light:J,beaconMat:rt,front:Z,restRot:p,frameMat:m,dayTex:I,nightTex:k}}function vu(n,t,e,i,s){const o=document.createElement("canvas");o.width=e,o.height=i;try{Dv(o.getContext("2d"),n,t,e,i,s)}catch(a){console.error("[panelTex]",t,s,a&&a.stack?a.stack:a)}const r=new nn(o);return r.colorSpace=xe,r.anisotropy=Ne?2:8,r}function Dv(n,t,e,i=1024,s=660,o=!1){n.scale(i/1024,s/660);const r=1024,a=660;if(o){const g=n.createLinearGradient(0,0,0,a);g.addColorStop(0,"#2c3347"),g.addColorStop(.55,"#252c3d"),g.addColorStop(1,"#1a2130"),n.fillStyle=g,n.fillRect(0,0,r,a);const f=n.createRadialGradient(r/2,a*.42,40,r/2,a*.42,r*.55);f.addColorStop(0,"rgba(140,160,210,0.10)"),f.addColorStop(1,"rgba(140,160,210,0)"),n.fillStyle=f,n.fillRect(0,0,r,a),n.strokeStyle="rgba(150,165,200,0.22)",n.lineWidth=3,n.strokeRect(30,30,r-60,a-60),n.strokeStyle="rgba(150,165,200,0.14)",n.lineWidth=1.5,n.strokeRect(45,45,r-90,a-90),n.fillStyle="rgba(210,170,110,0.16)",n.fillRect(64,48,r-128,46),n.fillStyle="rgba(220,180,120,0.4)",n.fillRect(64,92,r-128,2),n.fillStyle="#d8c9a3",n.font="500 22px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",n.textAlign="left",n.letterSpacing="5px",n.fillText(t.kicker.toUpperCase(),64,78),n.letterSpacing="0px",n.fillStyle="rgba(220,205,170,0.10)",n.font="600 220px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",n.textAlign="right",n.fillText(t.num,r-56,270),n.fillStyle="rgba(220,180,120,0.35)",n.font="600 40px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",n.fillText(t.num,r-56,298),n.fillStyle="#c9a25f",n.fillRect(64,108,90,4),n.save(),n.shadowColor="rgba(255,205,120,0.55)",n.shadowBlur=14,n.fillStyle="#f6e7c0",n.textAlign="left";const S=gu(n,t.title,850,56,38,4);let w=176;const E=Math.round(S.size*1.1);if(S.lines.forEach(G=>{n.fillText(G,64,w),w+=E}),n.restore(),n.textAlign="left",w+=14,t.id!=="quiz"&&t.bullets.length){n.fillStyle="rgba(200,170,120,0.35)",n.fillRect(64,w-4,60,2),w+=22;const G=a-104;let x=26;const U=M=>{n.font=`400 ${M}px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif`;const I=[];return t.bullets.forEach(k=>I.push(...Lr(n,k,830))),I};let z=U(x);for(;z.length*Math.round(x*1.38)>G-w&&x>19;)x-=1,z=U(x);const y=Math.round(x*1.38);z.forEach(M=>{n.fillStyle="#c9a25f",n.beginPath(),n.arc(74,w-9,3.5,0,Math.PI*2),n.fill(),n.save(),n.shadowColor="rgba(255,205,120,0.4)",n.shadowBlur=8,n.fillStyle="#e8dab4",n.fillText(M,98,w),n.restore(),w+=y})}n.fillStyle="rgba(200,170,120,0.25)",n.fillRect(64,a-90,r-128,2),n.fillStyle="rgba(200,190,215,0.55)",n.font="400 19px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",n.textAlign="left",n.letterSpacing="3px",n.fillText("MODULE 1 · DOMAINE PUBLIC",64,a-60),n.fillStyle="rgba(210,170,110,0.6)",n.textAlign="right",n.fillText(String(e+1).padStart(2,"0")+" / "+String(13).padStart(2,"0"),r-64,a-60),n.letterSpacing="0px";return}const l=n.createLinearGradient(0,0,0,a);l.addColorStop(0,"#fdf8ec"),l.addColorStop(.55,"#f7eed7"),l.addColorStop(1,"#efe1c2"),n.fillStyle=l,n.fillRect(0,0,r,a);const c=n.createRadialGradient(r/2,a*.42,40,r/2,a*.42,r*.55);c.addColorStop(0,"rgba(255,244,216,0.55)"),c.addColorStop(1,"rgba(255,244,216,0)"),n.fillStyle=c,n.fillRect(0,0,r,a),n.globalAlpha=.05;for(let g=0;g<900;g++)n.fillStyle=Math.random()>.5?"#7a5f38":"#ffffff",n.fillRect(Math.random()*r,Math.random()*a,2,2);n.globalAlpha=1,n.strokeStyle="rgba(122,95,56,0.28)",n.lineWidth=3,n.strokeRect(30,30,r-60,a-60),n.strokeStyle="rgba(192,138,104,0.22)",n.lineWidth=1.5,n.strokeRect(45,45,r-90,a-90),n.fillStyle="#c08a68";for(const[g,f,S,w]of[[30,30,1,1],[r-30,30,-1,1],[30,a-30,1,-1],[r-30,a-30,-1,-1]])n.fillRect(g+S*8,f+w*8,26*S,4*w),n.fillRect(g+S*8,f+w*8,4*S,26*w);n.fillStyle="rgba(192,138,104,0.14)",n.fillRect(64,48,r-128,46),n.fillStyle="rgba(207,165,116,0.55)",n.fillRect(64,92,r-128,2),n.fillStyle="#8a6a4e",n.font="500 22px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",n.textAlign="left",n.letterSpacing="5px",n.fillText(t.kicker.toUpperCase(),64,78),n.letterSpacing="0px",n.fillStyle="rgba(207,165,116,0.16)",n.font="600 220px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",n.textAlign="right",n.fillText(t.num,r-56,270),n.fillStyle="rgba(192,138,104,0.5)",n.font="600 40px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",n.fillText(t.num,r-56,298),n.fillStyle="#c08a68",n.fillRect(64,108,90,4);const u=()=>{n.save(),n.shadowColor="rgba(255,246,220,0.72)",n.shadowBlur=5},d=()=>n.restore();u(),n.fillStyle="#241a0e",n.textAlign="left";const h=gu(n,t.title,850,56,38,4);let p=176;const m=Math.round(h.size*1.1);if(h.lines.forEach(g=>{n.fillText(g,64,p),p+=m}),d(),n.textAlign="left",p+=14,t.id!=="quiz"&&t.bullets.length){n.fillStyle="rgba(122,95,56,0.45)",n.fillRect(64,p-4,60,2),p+=22;const g=a-104;let f=26;const S=G=>{n.font=`400 ${G}px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif`;const x=[];return t.bullets.forEach(U=>x.push(...Lr(n,U,830))),x};let w=S(f);for(;w.length*Math.round(f*1.38)>g-p&&f>19;)f-=1,w=S(f);const E=Math.round(f*1.38);w.forEach(G=>{n.fillStyle="#c08a68",n.beginPath(),n.arc(74,p-9,3.5,0,Math.PI*2),n.fill(),u(),n.fillStyle="#2e2314",n.fillText(G,98,p),d(),p+=E})}n.fillStyle="rgba(207,165,116,0.35)",n.fillRect(64,a-90,r-128,2),n.fillStyle="rgba(122,95,56,0.7)",n.font="400 19px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",n.textAlign="left",n.letterSpacing="3px",n.fillText("MODULE 1 · DOMAINE PUBLIC",64,a-60),n.fillStyle="rgba(170,120,85,0.8)",n.textAlign="right",n.fillText(String(e+1).padStart(2,"0")+" / "+String(13).padStart(2,"0"),r-64,a-60),n.letterSpacing="0px";const v=n.createRadialGradient(r/2,a/2,r*.3,r/2,a/2,r*.62);v.addColorStop(0,"rgba(0,0,0,0)"),v.addColorStop(.6,"rgba(0,0,0,0)"),v.addColorStop(1,"rgba(150,120,75,0.24)"),n.fillStyle=v,n.fillRect(0,0,r,a)}function Al(n,t,e,i,s){const o=document.createElement("canvas");o.width=64,o.height=128;const r=o.getContext("2d");r.fillStyle="#dccda8",r.fillRect(0,0,64,128);for(let m=0;m<9;m++)for(let v=0;v<4;v++){const g=Math.random();g<.3?(r.fillStyle=Math.random()<.3?"#c08a68":"#c9a25f",r.globalAlpha=.35+Math.random()*.35,r.fillRect(4+v*14+Math.random()*4,6+m*13+Math.random()*3,5,7),r.globalAlpha=1):g<.42&&(r.fillStyle="#6a5a38",r.globalAlpha=.35,r.fillRect(4+v*14,6+m*13,5,7),r.globalAlpha=1)}const a=new nn(o);a.colorSpace=xe,a.repeat.set(1,Math.max(1,Math.round(t/6))),a.wrapS=Hi,a.wrapT=Hi,a.anisotropy=Ne?1:4;const l=new $({map:a,roughness:.9,metalness:0});l.emissive=new _t(16763274),l.emissiveMap=a,l.emissiveIntensity=0;const c=new R(new ft(n,t,e),l);c.position.set(s,t/2-.3,i),c.rotation.y=(Math.random()-.5)*.5,c.castShadow=!0;const u=t/2,d=new $({color:12035198,roughness:.85}),h=new $({color:6969912,roughness:.8}),p=Math.random();if(p<.34&&t>8){const m=new R(new bt(Math.min(1.1,n*.24),Math.min(1.1,n*.24),t*.12+.7,10),d);m.position.y=u+(t*.06+.55),c.add(m);const v=new R(new ln(Math.min(1.1,n*.24),.55,10),h);v.position.y=u+(t*.06+.55)+(t*.06+.35)+.27,c.add(v);for(const[g,f]of[[-.5,-.5],[.5,-.5],[-.5,.5],[.5,.5]]){const S=new R(new bt(.05,.05,.7,6),h);S.position.set(g*Math.min(.7,n*.16),u+.35,f*Math.min(.7,e*.16)),c.add(S)}}else if(p<.6){const m=new R(new bt(.04,.07,t*.22+2.2,6),h);m.position.y=u+(t*.11+1.1),c.add(m);for(let g=0;g<3;g++){const f=new R(new ft(.5,.04,.04),h);f.position.y=u+(t*.11+.5+g*.55),c.add(f)}const v=new R(new se(.09,8,8),new $({color:12597547,emissive:12597547,emissiveIntensity:.4}));v.position.y=u+t*.11+2.25,c.add(v)}else if(p<.78&&t>6){const m=new R(new ft(n*.3,.9,e*.3),d);m.position.y=u+.45,c.add(m);const v=new R(new ft(n*.16,.1,e*.16),h);v.position.y=u+.95,c.add(v)}else{const m=new R(new bt(.22,.26,1.3,8),d);m.position.y=u+.65,c.add(m)}return c}function Uv(n){const t=new yt,e=new $({color:15261896,roughness:.75}),i=new $({color:3038778,roughness:.7,metalness:.1}),s=new $({color:14256698,roughness:.6}),o=new R(new se(.16,10,8),e);o.scale.set(1,.78,1.35),o.position.y=.14,t.add(o);const r=new R(new se(.09,10,8),i);r.position.set(0,.3,.14),t.add(r);const a=new R(new ln(.035,.1,6),s);a.rotation.x=Math.PI/2,a.position.set(0,.29,.25),t.add(a);const l=new R(new se(.05,8,6),e);return l.position.set(0,.2,-.18),l.scale.set(1,.7,1.4),t.add(l),t.position.copy(n),{g:t,head:r,tail:l}}function Nv(n){const t=new yt;t.position.copy(n);const e=new R(new Kn(4.4,28),new $({color:8366256,roughness:.08,metalness:.25,transparent:!0,opacity:.82}));e.rotation.x=-Math.PI/2,e.position.y=.05,t.add(e);const i=new R(new ai(4.4,.28,8,32),new $({color:12035198,roughness:.9}));i.rotation.x=Math.PI/2,i.position.y=.02,t.add(i);const s=new $({color:5143114,roughness:.9,side:Ge}),o=new $({color:15255720,roughness:.8,side:Ge});for(let r=0;r<6;r++){const a=r/6*Math.PI*2+Math.random()*.5,l=1.2+Math.random()*2.2,c=new R(new Kn(.3+Math.random()*.18,8),s);if(c.rotation.x=-Math.PI/2,c.position.set(Math.cos(a)*l,.1,Math.sin(a)*l),t.add(c),r%2===0){const u=new R(new se(.1,6,5),o);u.position.set(Math.cos(a)*l+.12,.2,Math.sin(a)*l),u.scale.y=.6,t.add(u)}}return{g:t,water:e}}function zv(n){const t=new yt,e=[12618344,13608308,10336383,9083576,14256746,12100808],i=e[Math.random()*e.length|0],s=new Be({color:i,side:Ge,transparent:!0,opacity:.92}),o=new Jt(.16,.11),r=new R(o,s);r.position.x=-.09;const a=new R(o,s);a.position.x=.09;const l=new R(new ft(.02,.04,.08),new Be({color:3812895}));return t.add(r,a,l),t.position.copy(n),{g:t,lw:r,rw:a}}function Os(n,t){const e=new yt;e.position.copy(n);const i=new $({color:ie.walnutDark,roughness:.6,metalness:.3}),s=new R(new bt(.07,.1,5.6,8),i);s.position.y=2.8,e.add(s);const o=new R(new ft(1.7,.1,.1),i);o.position.set(t*.85,5.5,0),e.add(o);const r=new $({color:ie.amber,emissive:ie.amber,emissiveIntensity:.25}),a=new R(new se(.16,12,12),r);return a.position.set(t*1.7,5.5,0),e.add(a),e}function Fv(n,t){const e=new $({color:new _t(ie.groundDark).lerp(new _t(ie.ground),Math.random()),roughness:1,flatShading:!0}),i=new R(new ds(t,1),e);return i.position.set(n.x,-.15,n.z),i.scale.set(1,.32,1),i.rotation.y=Math.random()*Math.PI,i}function Ov(n,t){const e=new $({color:10127976,roughness:.95,flatShading:!0}),i=new R(new $l(t,0),e);return i.position.set(n.x,t*.4,n.z),i.rotation.set(Math.random(),Math.random()*Math.PI,Math.random()),i}function Bv(n=420){const t=n,e=new Float32Array(t*3),i=new Mn([new b(0,0,0),new b(0,0,120),new b(0,0,240),new b(0,0,360),new b(0,0,468)],!1,"centripetal");for(let r=0;r<t;r++){const a=Math.random(),l=i.getPointAt(a);e[r*3]=l.x+(Math.random()-.5)*24,e[r*3+1]=.4+Math.random()*6,e[r*3+2]=l.z+(Math.random()-.5)*24}const s=new Le;s.setAttribute("position",new Ve(e,3));const o=new js({color:ie.amber,transparent:!0,opacity:.5,blending:Xe,depthWrite:!1,size:.35,sizeAttenuation:!0});return new Lo(s,o)}function kv(){const n=new yt,t=new Be({color:4864550,transparent:!0,opacity:.9,side:Ge}),e=new Jt(.55,.18),i=new R(e,t);i.position.x=-.3;const s=new R(e,t);s.position.x=.3;const o=new R(new Jt(.34,.07),t);return o.rotation.z=Math.PI/2,n.add(i,s,o),n.scale.setScalar(1.3),{g:n,l:i,r:s}}function Sd(n,t=1){const e=new yt,i=new $({color:9071429,roughness:.95,flatShading:!0}),s=new R(new bt(.09,.18,3.2,6),i);s.position.y=1.6,s.rotation.z=(Math.random()-.5)*.22,s.castShadow=!0,e.add(s);const o=new $({color:6257226,roughness:1,flatShading:!0}),r=7;for(let l=0;l<r;l++){const c=l/r*Math.PI*2,u=new R(new se(1,7,5),o);u.position.set(Math.cos(c)*1.15,3.05,Math.sin(c)*1.15),u.scale.set(1.15,.28,.55),u.rotation.y=c,e.add(u)}const a=new R(new se(.28,8,6),o);return a.position.y=3.15,e.add(a),e.position.copy(n),e.scale.setScalar(t),e}function Gv(n,t=1){const e=new yt,i=new $({color:7045971,roughness:1,flatShading:!0});for(let s=0;s<5;s++){const o=new R(new ds(.3+Math.random()*.24,1),i);o.position.set((Math.random()-.5)*.7,.22+Math.random()*.3,(Math.random()-.5)*.7),e.add(o)}return e.position.copy(n),e.scale.setScalar(t),e}function Hv(n,t=1){const e=new yt,i=new $({color:16183261,roughness:1,flatShading:!0,transparent:!0,opacity:.92});for(let s=0;s<6;s++){const o=new R(new se(1.1+Math.random()*1.4,9,7),i);o.position.set(s*1.6-4,Math.random()*.9,(Math.random()-.5)*2),o.scale.y=.5,e.add(o)}return e.position.copy(n),e.scale.setScalar(t),e}function Vv(n,t,e){const i=new yt;i.position.copy(n);const s=new $({color:ie.walnutDark,roughness:.7,metalness:.2}),o=new R(new bt(.1,.14,2.1,8),s);o.position.y=1.05,o.castShadow=!0,i.add(o);const r=new R(new ft(.9,.08,.14),s);r.position.set(0,1.85,0),r.rotation.z=Math.PI/2,i.add(r);const a=Ne?256:512,l=Ne?160:320,c=document.createElement("canvas");c.width=a,c.height=l;const u=c.getContext("2d");u.scale(a/512,l/320),u.fillStyle="#f7eeda",u.fillRect(0,0,512,320),u.strokeStyle="rgba(138,111,69,0.6)",u.lineWidth=8,u.strokeRect(12,12,488,296);const d=u.createLinearGradient(0,0,512,0);d.addColorStop(0,"#c08a68"),d.addColorStop(1,"#cfa574"),u.fillStyle=d,u.fillRect(0,52,512,10),u.textAlign="center",u.fillStyle="#3a2e1f",u.font="700 42px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",e.forEach((g,f)=>u.fillText(g,256,122+f*50));const h=new nn(c);h.colorSpace=xe,h.anisotropy=Ne?2:8;const p=new Je({map:h}),m=new R(new Jt(1.7,1.06),p);m.position.y=2.28;const v=new yt;return v.add(m),v.rotation.y=t,i.add(v),{group:i,sign:m}}function Wv(n,t,e,i){const s=new $({color:ie.hill,roughness:1,flatShading:!0}),o=new R(new ds(1,2),s);return o.scale.set(t,e,i),o.position.set(n.x,n.y,n.z),o.rotation.y=Math.random()*Math.PI,o.castShadow=!0,o}function Bs(n,t){const e=new yt;e.position.copy(n);const i=new ri(new Yn({map:On(0,"rgba(255,190,120,0.3)"),transparent:!0,blending:Xe,depthWrite:!1,depthTest:!1}));i.scale.setScalar(3.6),i.position.set(t*1.7,5.5,0),e.add(i);const s=new R(new Kn(3.8,24),new Be({map:On(.12,"rgba(255,180,110,0.32)"),transparent:!0,blending:Xe,depthWrite:!1}));return s.rotation.x=-Math.PI/2,s.position.y=.03,e.add(s),{group:e,glow:i,pool:s}}function Ir(){const n=new yt,t=Math.random()<.5?12618344:Math.random()<.5?13805688:7035458,e=new $({color:t,roughness:.45,metalness:.35}),i=new $({color:3813154,roughness:.5,metalness:.4}),s=new R(new ft(1.5,.5,3.2),e);s.position.y=.5,s.castShadow=!0,n.add(s);const o=new R(new ft(1.3,.24,1),i);o.position.set(0,.72,1.15),n.add(o);const r=new R(new ft(1.12,.46,1.5),i);r.position.set(0,.95,-.2),r.castShadow=!0,n.add(r);const a=new $({color:8364973,roughness:.15,metalness:.6});for(const[h,p]of[[0,-.95],[0,.5]]){const m=new R(new ft(1.14,.38,.05),a);m.position.set(h,.96,p),n.add(m)}const l=new $({color:3023896,roughness:.9});for(const[h,p]of[[-.78,1.05],[.78,1.05],[-.78,-1.05],[.78,-1.05]]){const m=new R(new bt(.32,.32,.22,14),l);m.rotation.x=Math.PI/2,m.rotation.z=Math.PI/2,m.position.set(h,.32,p),n.add(m)}const c=new $({color:16773839,emissive:16769184,emissiveIntensity:.5});for(const h of[-.55,.55]){const p=new R(new se(.09,8,8),c);p.position.set(h,.55,1.6),n.add(p)}const u=new $({color:9051670,emissive:9051670,emissiveIntensity:.3});for(const h of[-.55,.55]){const p=new R(new ft(.16,.1,.04),u);p.position.set(h,.55,-1.6),n.add(p)}const d=new ri(new Yn({map:On(0,"rgba(255,226,175,0.4)"),transparent:!0,blending:Xe,depthWrite:!1,depthTest:!1}));return d.scale.set(3.4,3.4,1),d.position.set(0,.55,2.8),n.add(d),{group:n,cone:d,body:s}}function is(n,t){const e=new yt;e.position.copy(n),e.rotation.y=t>0?Math.PI:0;const i=new $({color:9071429,roughness:.85}),s=new $({color:4864550,roughness:.7,metalness:.4}),o=new R(new ft(1.4,.08,.42),i);o.position.y=.42,e.add(o);const r=new R(new ft(1.4,.08,.4),i);r.position.set(0,.72,.18),e.add(r);for(const a of[-.6,.6]){const l=new R(new ft(.08,.42,.5),s);l.position.set(a,.21,0),e.add(l)}return e}function qv(){const n=document.createElement("canvas");n.width=256,n.height=256;const t=n.getContext("2d");t.fillStyle="#d3c096",t.fillRect(0,0,256,256),t.strokeStyle="rgba(122,95,56,0.35)",t.lineWidth=2,t.strokeRect(2,2,252,252);for(let i=64;i<256;i+=64)t.beginPath(),t.moveTo(i,2),t.lineTo(i,254),t.stroke(),t.beginPath(),t.moveTo(2,i),t.lineTo(254,i),t.stroke();for(let i=0;i<900;i++){const s=180+Math.random()*36;t.fillStyle=`rgba(${s|0},${s*.9|0},${s*.72|0},${(Math.random()*.16).toFixed(3)})`,t.fillRect(Math.random()*256,Math.random()*256,1+Math.random()*3,1+Math.random()*3)}const e=new nn(n);return e.colorSpace=xe,e.wrapS=e.wrapT=Hi,e.repeat.set(Ne?1:2,90),e.anisotropy=Ne?2:8,e}function vo(n,t=1){const e=new yt,i=new $({color:7031340,roughness:.95,flatShading:!0}),s=new R(new bt(.1,.16,2.6,7),i);s.position.y=1.3,s.castShadow=!0,e.add(s);const o=new $({color:5599295,roughness:1,flatShading:!0});for(let r=0;r<3;r++){const a=new R(new se(1.05-r*.18,8,6),o);a.position.set((Math.random()-.5)*.5,2.6+r*.65,(Math.random()-.5)*.5),a.scale.y=.85,a.castShadow=!0,e.add(a)}return e.position.copy(n),e.scale.setScalar(t),e}function wd(n,t=1,e=0){const i=new yt,s=[5599295,6585414],o=[12618344,13608308,10336383,14731680,14256746,9083576,12100808,13808780],r=a=>{const l=Math.sin(e*127.1+a*311.7)*43758.5453;return l-Math.floor(l)};for(let a=0;a<6;a++){const l=new R(new bt(.015,.02,.32,4),new $({color:s[a%2],roughness:1}));l.position.set((r(a)-.5)*.5,.16,(r(a+13)-.5)*.5),i.add(l);const c=new R(new se(.05,5,4),new $({color:o[(a+e)%o.length],roughness:.9}));c.position.set(l.position.x,.34,l.position.z),i.add(c)}return i.position.copy(n),i.scale.setScalar(t),i}function Xv(n,t=0,e=0){const i=new yt,s=new $({color:8019006,roughness:.9,flatShading:!0}),o=new R(new ft(1.1,.5,.7),s);o.position.y=.25,o.castShadow=!0,i.add(o);const r=new R(new ft(.95,.07,.55),new $({color:4863524,roughness:1}));return r.position.y=.52,i.add(r),i.add(wd(new b(0,.5,0),1,e)),i.position.copy(n),i.rotation.y=t,i}function Ns(n,t=0,e=13214282){const i=new yt,s=new $({color:9071172,roughness:.9,flatShading:!0}),o=new R(new ft(.7,.4,.5),s);o.position.y=.2,o.castShadow=!0,i.add(o),new $({color:e,roughness:.5});const r=[13214282,11552826,7307094,14256746];for(let a=0;a<5;a++){const l=new R(new se(.07,6,5),new $({color:r[(a+Math.round(e))%r.length],roughness:.5}));l.position.set(a%3*.16-.16,.44,Math.floor(a/3)*.14-.07),i.add(l)}return i.position.copy(n),i.rotation.y=t,i}function Yv(){const n=document.createElement("canvas");n.width=256,n.height=256;const t=n.getContext("2d");t.fillStyle="#f6eeda",t.beginPath(),t.arc(128,128,118,0,Math.PI*2),t.fill(),t.strokeStyle="#8a6a4e",t.lineWidth=10,t.beginPath(),t.arc(128,128,118,0,Math.PI*2),t.stroke(),t.strokeStyle="#6b4a2c",t.lineWidth=6,t.lineCap="round";for(let r=0;r<12;r++){const a=r/12*Math.PI*2-Math.PI/2;t.beginPath(),t.moveTo(128+Math.cos(a)*94,128+Math.sin(a)*94),t.lineTo(128+Math.cos(a)*110,128+Math.sin(a)*110),t.stroke()}const e=new Date,i=(e.getHours()%12+e.getMinutes()/60)*(Math.PI*2/12)-Math.PI/2,s=e.getMinutes()/60*Math.PI*2-Math.PI/2;t.strokeStyle="#241a0e",t.lineWidth=11,t.beginPath(),t.moveTo(128,128),t.lineTo(128+Math.cos(i)*54,128+Math.sin(i)*54),t.stroke(),t.lineWidth=6,t.beginPath(),t.moveTo(128,128),t.lineTo(128+Math.cos(s)*82,128+Math.sin(s)*82),t.stroke(),t.fillStyle="#b96a45",t.beginPath(),t.arc(128,128,8,0,Math.PI*2),t.fill();const o=new nn(n);return o.colorSpace=xe,o}function $v(n,t=0){const e=new yt,i=new $({color:4864550,roughness:.7,metalness:.4}),s=new R(new bt(.07,.09,3.6,8),i);s.position.y=1.8,s.castShadow=!0,e.add(s);const o=new R(new bt(.32,.36,.75,12),i);o.position.y=3.5,e.add(o);const r=new R(new ln(.12,.3,10),i);r.position.y=4.05,e.add(r);const a=new $({map:Yv(),roughness:.4}),l=new R(new Kn(.27,22),a);l.position.set(0,3.5,.34);const c=l.clone();return c.position.z=-.34,c.rotation.y=Math.PI,e.add(l,c),e.position.copy(n),e.rotation.y=t,e}function Zv(n){const t=new yt;t.position.copy(n);const e=new $({color:4864550,roughness:.6,metalness:.5}),i=new R(new bt(.24,.2,.72,10),e);i.position.y=.36,i.castShadow=!0,t.add(i);const s=new R(new bt(.27,.27,.05,10),e);return s.position.y=.75,t.add(s),t}function _u(){const n=new yt,t=new $({color:10127994,roughness:.95,flatShading:!0}),e=new R(new se(.11,8,6),t);e.scale.set(1,.8,1.4),e.position.y=.12,n.add(e);const i=new R(new se(.055,8,6),t);i.position.set(0,.22,.1),n.add(i);const s=new R(new ln(.02,.05,4),t);return s.rotation.x=Math.PI/2,s.position.set(0,.22,.16),n.add(s),n.rotation.y=Math.random()*Math.PI*2,n.userData={body:e},n}function ni(n,t=4.6,e=3.2){const i=new R(new Jt(t,e),new Be({map:On(.35,"rgba(90,70,42,0.34)"),transparent:!0,depthWrite:!1}));return i.rotation.x=-Math.PI/2,i.position.set(n.x,.02,n.z),i}function jv(n,t=0,e=["PUBLICITÉ","URBAINE"]){const i=new yt;i.position.copy(n),i.rotation.y=t;const s=new $({color:15392706,roughness:.85}),o=new $({color:10850152,roughness:.7,metalness:.15}),r=new R(new bt(.62,.68,2.5,18),s);r.position.y=1.25,r.castShadow=!0,i.add(r);const a=new R(new bt(.72,.8,.22,18),o);a.position.y=.11,i.add(a);const l=new R(new bt(.66,.72,.16,18),o);l.position.y=2.58,i.add(l);const c=new R(new se(.2,10,8),o);c.position.y=2.75,i.add(c);const u=236,d=640,h=document.createElement("canvas");h.width=u,h.height=d;const p=h.getContext("2d"),m=p.createLinearGradient(0,0,0,d);m.addColorStop(0,"#f5ecd6"),m.addColorStop(1,"#ead9b4"),p.fillStyle=m,p.fillRect(0,0,u,d),p.strokeStyle="rgba(138,111,69,0.5)",p.lineWidth=10,p.strokeRect(10,10,u-20,d-20),p.fillStyle="#c08a68",p.fillRect(0,d*.14,u,14),p.textAlign="center",p.fillStyle="#3a2e1f",p.font="700 34px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",e.forEach((f,S)=>p.fillText(f,u/2,d*.3+S*56)),p.fillStyle="#8a6a4e",p.font="400 26px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",p.fillText("DOMAINE PUBLIC",u/2,d*.78);const v=new nn(h);v.colorSpace=xe,v.anisotropy=Ne?2:8;const g=new R(new Jt(.92,2.5),new Je({map:v}));return g.material.emissive=new _t(15524552),g.material.emissiveIntensity=0,g.position.set(0,1.25,.55),i.add(g),i.userData={body:r,poster:g},i}function Kv(n,t=1){const e=new yt;e.position.copy(n),e.rotation.y=t>0?0:Math.PI;const i=new $({color:4864550,roughness:.6,metalness:.45}),s=new $({color:12100725,roughness:.7,metalness:.2});for(const f of[-1.7,1.7]){const S=new R(new ft(.12,2.3,.12),i);S.position.set(f,1.15,.4),S.castShadow=!0,e.add(S)}const o=new R(new ft(4.2,.1,1.7),s);o.position.y=2.4,o.castShadow=!0,e.add(o);const r=new $({color:11060425,roughness:.1,metalness:.2,transparent:!0,opacity:.35}),a=new R(new Jt(3.4,1.5),r);a.position.set(0,1.5,-.42),e.add(a);const l=new R(new Jt(1.3,1.5),r);l.position.set(1.9,1.5,0),l.rotation.y=Math.PI/2,e.add(l);const c=340,u=140,d=document.createElement("canvas");d.width=c,d.height=u;const h=d.getContext("2d");h.fillStyle="#f2e7cd",h.fillRect(0,0,c,u),h.fillStyle="#cfa574",h.fillRect(0,0,c,30),h.textAlign="center",h.fillStyle="#3a2e1f",h.font="700 24px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",h.fillText("VOTRE ESPACE PUBLICITAIRE",c/2,72),h.font="400 15px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",h.fillStyle="#7a5f38",h.fillText("MODULE 1 · PANNEAUTIQUE",c/2,104);const p=new nn(d);p.colorSpace=xe,p.anisotropy=Ne?2:8;const m=new R(new Jt(3.4,1.4),new Je({map:p}));m.material.emissive=new _t(15524552),m.material.emissiveIntensity=0,m.position.set(0,1.45,.42),e.add(m),e.userData={poster:m};const v=new $({color:9071429,roughness:.85}),g=new R(new ft(2.6,.07,.35),v);return g.position.set(0,.42,-.1),e.add(g),e}function Jv(n,t=13215868,e=0){const i=new yt;i.position.copy(n),i.rotation.y=e;const s=new $({color:5916210,roughness:.6,metalness:.4}),o=new $({color:9071429,roughness:.8}),r=new R(new bt(.04,.06,.75,8),s);r.position.y=.38,i.add(r);const a=new R(new bt(.42,.42,.06,14),o);a.position.y=.76,i.add(a);const l=new R(new bt(.03,.03,1.5,8),s);l.position.y=1.1,i.add(l);const c=new R(new ln(1.1,.28,10),new Je({color:t}));c.position.y=1.95,i.add(c);for(const[u,d]of[[-.5,.5],[.5,.5],[-.5,-.5],[.5,-.5]]){const h=new R(new ft(.4,.1,.4),o);h.position.set(u,.42,d),i.add(h);const p=new R(new bt(.025,.025,.42,6),s);p.position.set(u,.21,d),i.add(p)}return i.userData={parasol:c},i}function Qv(n,t=0){const e=new yt;e.position.copy(n),e.rotation.y=t;const i=new $({color:9071182,roughness:.6,metalness:.2}),s=new $({color:3813154,roughness:.95}),o=.34;for(const u of[-.35,.35]){const d=new R(new ai(o,.035,8,20),s);d.position.set(0,o,u),e.add(d)}const r=new R(new ft(.03,.03,.72),i);r.position.set(0,.66,0),e.add(r);const a=new R(new bt(.02,.02,.62,6),i);a.position.set(0,.82,0),a.rotation.x=Math.PI/2,e.add(a);const l=new R(new bt(.02,.02,.34,6),i);l.position.set(0,.98,.35),e.add(l);const c=new R(new ft(.14,.03,.08),i);return c.position.set(0,.84,-.32),e.add(c),e}function t_(n,t=0,e="D"){const i=new yt;i.position.copy(n),i.rotation.y=t;const s=new $({color:4864550,roughness:.6,metalness:.4}),o=new R(new bt(.03,.05,1.8,8),s);o.position.y=.9,o.castShadow=!0,i.add(o);const r=document.createElement("canvas");r.width=128,r.height=64;const a=r.getContext("2d");a.fillStyle="#e3d6b4",a.fillRect(0,0,128,64),a.fillStyle=e==="D"?"#c08a68":"#7d9a68",a.fillRect(0,0,26,64),a.strokeStyle="rgba(138,111,69,0.6)",a.lineWidth=4,a.strokeRect(2,2,124,60),a.textAlign="center",a.fillStyle="#3a2e1f",a.font="700 26px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",a.fillText(e,76,42);const l=new nn(r);l.colorSpace=xe,l.anisotropy=Ne?2:8;const c=new R(new Jt(.7,.35),new Je({map:l}));return c.position.y=1.9,i.add(c),i}function e_(n,t=1.8,e=.6){const i=new yt;i.position.copy(n);const s=new $({color:6257226,roughness:1,flatShading:!0}),o=new R(new ft(t,e,.5),s);o.position.y=e/2,o.castShadow=!0,i.add(o);const r=Math.max(2,Math.round(t/.7));for(let a=0;a<r;a++){const l=new R(new ds(.3,1),s);l.position.set(-t/2+.3+a*(t-.6)/(r-1),e+.18,0),i.add(l)}return i}const n_=[14266508,13146738,11567964,9068616,14727320].map(n=>new $({color:n,roughness:.85})),i_=[3023896,4863524,8215604,13215864,2236446].map(n=>new $({color:n,roughness:.9})),s_=[13215868,9415293,13608308,11052232,10336447,13805176,14726304,12108960].map(n=>new $({color:n,roughness:.85})),o_=[4865070,6048314,4146772,6969924,5588028].map(n=>new $({color:n,roughness:.9})),r_=new $({color:3023896,roughness:.8}),Mu=new $({color:13610612,roughness:.9}),vr=n=>n[Math.random()*n.length|0];function a_(){const n=new yt,t=.92+Math.random()*.18,e=.85+Math.random()*.32,i=vr(n_),s=vr(i_),o=vr(s_),r=vr(o_),a=r_,l=Math.random()<.22,c=Math.random()<.14,u=Math.random()<.16,d=.9*t,h=.105*e,p=y=>{const M=new yt;M.position.set(y,d,0);const I=new R(new bt(.064,.05,.46*t,8),r);I.position.y=-.23*t,I.castShadow=!0,M.add(I);const k=new yt;k.position.y=-.46*t;const F=new R(new bt(.05,.04,.44*t,8),r);F.position.y=-.22*t,k.add(F);const Z=new R(new ft(.09,.07,.17),a);return Z.position.set(0,-.44*t,.045),k.add(Z),M.add(k),{leg:M,knee:k}},m=p(-h),v=p(h);n.add(m.leg,v.leg);const g=new yt;if(n.add(g),l){const y=new R(new ln(.21*e,.34,12),o);y.position.y=.78*t,y.castShadow=!0,g.add(y)}const f=new R(new bt(.175*e,.215*e,.54*t,12),o);f.position.y=1.2*t,f.castShadow=!0,g.add(f);const S=o;for(const y of[-.19*e,.19*e]){const M=new R(new se(.075*e,8,6),S);M.position.set(y,1.42*t,0),g.add(M)}if(u){const y=new R(new ft(.15,.17,.06),r);y.position.set(.3*e,1.16*t,0),y.rotation.z=.18,g.add(y);const M=new R(new ft(.02,.3,.02),r);M.position.set(.26*e,1.32*t,0),M.rotation.z=.4,g.add(M)}const w=new R(new bt(.045,.055,.12,8),i);w.position.y=1.5*t,g.add(w);const E=new R(new se(.135,12,10),i);E.position.y=1.64*t,E.castShadow=!0,g.add(E);const G=new R(new se(.15,10,8),s);if(G.position.set(0,1.66*t,-.02),G.scale.set(1,.78,1.06),g.add(G),c){const y=new R(new bt(.19,.2,.03,12),Mu);y.position.y=1.74*t,g.add(y);const M=new R(new se(.1,10,8),Mu);M.position.y=1.78*t,M.scale.set(1,.85,1),g.add(M)}const x=y=>{const M=new yt;M.position.set(y,1.4*t,0);const I=new R(new bt(.055,.062,.26,8),o);I.position.y=-.13,I.castShadow=!0,M.add(I);const k=new yt;k.position.y=-.26;const F=new R(new bt(.042,.05,.24,8),i);F.position.y=-.12,k.add(F);const Z=new R(new se(.05,8,6),i);return Z.position.y=-.24,k.add(Z),M.add(k),{arm:M,elbow:k}},U=x(-.235*e),z=x(.235*e);return g.add(U.arm,z.arm),{g:n,legL:m.leg,legR:v.leg,kneeL:m.knee,kneeR:v.knee,armL:U.arm,armR:z.arm,elbowL:U.elbow,elbowR:z.elbow,lean:g,phase:Math.random()*Math.PI*2}}function l_(){const n=new yt,t=new $({color:13219985,roughness:.9}),e=new $({color:11048556,roughness:.9}),i=new $({color:11060425,roughness:.1,metalness:.2,transparent:!0,opacity:.75}),s=new R(new bt(1.7,1.9,.5,20),t);s.position.y=.25,s.castShadow=!0,n.add(s);const o=new R(new ai(1.8,.14,8,24),e);o.rotation.x=Math.PI/2,o.position.y=.5,n.add(o);const r=new R(new Kn(1.62,20),i);r.rotation.x=-Math.PI/2,r.position.y=.31,n.add(r);const a=new R(new bt(.16,.22,.8,10),e);a.position.y=.9,n.add(a);const l=new R(new bt(.55,.35,.14,12),e);l.position.y=1.25,n.add(l);const c=new R(new bt(.05,.05,.55,8),i);return c.position.y=1.6,n.add(c),n.userData={jet:c,pool:r,dish:l},n}function c_(n,t=0,e=["ESPACE","PUBLICITAIRE"]){const i=new yt;i.position.copy(n),i.rotation.y=t;const s=new $({color:7035458,roughness:.7,metalness:.2}),o=new $({color:15260864,roughness:.85});for(const m of[-2.6,2.6]){const v=new R(new ft(.22,3.4,.22),s);v.position.set(m,1.7,0),v.castShadow=!0,i.add(v);const g=new R(new ft(.6,.12,.6),s);g.position.set(m,.06,0),i.add(g)}const r=new R(new ft(5.6,3.1,.14),o);r.position.y=3.6,r.castShadow=!0,i.add(r);const a=Ne?320:640,l=Math.round(a*(2.8/5.3)),c=document.createElement("canvas");c.width=a,c.height=l;const u=c.getContext("2d"),d=u.createLinearGradient(0,0,0,l);d.addColorStop(0,"#f3e8cd"),d.addColorStop(1,"#e6d3a9"),u.fillStyle=d,u.fillRect(0,0,a,l),u.fillStyle="#c08a68",u.fillRect(0,0,a,l*.22),u.textAlign="center",u.fillStyle="#3a2e1f",u.font="700 "+l*.11+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",e.forEach((m,v)=>u.fillText(m,a/2,l*.42+v*(l*.16))),u.fillStyle="#7a5f38",u.font="400 "+l*.06+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",u.fillText("PANNEAUTIQUE · DOMAINE PUBLIC",a/2,l*.86);const h=new nn(c);h.colorSpace=xe,h.anisotropy=Ne?2:8;const p=new R(new Jt(5.3,2.8),new $({map:h,emissive:16767392,emissiveMap:h,emissiveIntensity:0}));return p.position.set(0,3.6,.09),i.add(p),i.userData={face:p},i}function u_(n,t=0){const e=new yt;e.position.copy(n),e.rotation.y=t;const i=new $({color:9071429,roughness:.85}),s=new $({color:6048304,roughness:.5,metalness:.4}),o=new R(new ft(1.9,2.2,1.5),i);o.position.y=1.1,o.castShadow=!0,e.add(o);const r=new R(new ft(2.4,.14,2),s);r.position.y=2.27,e.add(r);const a=new R(new Jt(.34,.2),new Je({color:13608308,side:Ge}));a.position.set(1.05,2.42,.55),a.rotation.y=Math.PI/2,e.add(a);const l=new R(new ft(1.9,.5,.25),s);l.position.set(0,.9,.82),e.add(l);const c=new R(new ft(2.2,.06,.7),new $({color:12618344,roughness:.9}));c.position.set(0,1.65,.85),e.add(c);const u=document.createElement("canvas");u.width=128,u.height=91;const d=u.getContext("2d");d.fillStyle="#f2e7cd",d.fillRect(0,0,128,91),d.strokeStyle="rgba(138,111,69,0.6)",d.lineWidth=4,d.strokeRect(4,4,120,83),d.textAlign="center",d.fillStyle="#3a2e1f",d.font="700 18px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",d.fillText("LE QUOTIDIEN",64,40),d.font="400 14px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",d.fillStyle="#7a5f38",d.fillText("0,50 €",64,64);const h=new nn(u);h.colorSpace=xe,h.anisotropy=Ne?2:8;const p=new R(new Jt(.7,.5),new $({map:h,emissive:16767392,emissiveMap:h,emissiveIntensity:0}));return p.position.set(0,1.35,.82),e.add(p),e.userData={flag:a,sign:p},e}function yu(n,t=0,e=13209450){const i=new yt;i.position.copy(n),i.rotation.y=t;const s=new $({color:9071429,roughness:.85});for(const p of[-1,1]){const m=new R(new ft(.08,1,.08),s);m.position.set(p,.5,0),m.castShadow=!0,i.add(m)}const o=new R(new ft(2,.12,.8),s);o.position.y=.97,i.add(o);const r=new R(new ft(2.2,.06,.9),s);r.position.y=1.03,i.add(r);const a=[12606026,13608308,8231528,9083576,13805176];for(let p=0;p<5;p++){const m=new R(new se(.09,8,6),new $({color:a[p%a.length],roughness:.7}));m.position.set(-.8+p*.4,1.12,0),m.scale.y=.85,i.add(m)}const l=bd(2.4,.9,e);l.position.set(0,2.1,.3),i.add(l);const c=document.createElement("canvas");c.width=256,c.height=98;const u=c.getContext("2d");u.fillStyle="#f7eeda",u.fillRect(0,0,256,98),u.strokeStyle="rgba(138,111,69,0.6)",u.lineWidth=6,u.strokeRect(4,4,248,90),u.fillStyle="#3a2e1f",u.textAlign="center",u.font="700 34px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",u.fillText("MARCHÉ",128,60);const d=new nn(c);d.colorSpace=xe;const h=new R(new Jt(1.3,.5),new $({map:d,emissive:16767392,emissiveMap:d,emissiveIntensity:0}));return h.position.set(0,2.32,.05),i.add(h),i.userData={sign:h,awning:l},i}function d_(){const n=[9415293,7045971,13215868,13805176],t=new yt,e=new R(new Jt(.16,.1),new Je({color:n[Math.random()*n.length|0],side:Ge,transparent:!0,opacity:.72}));return t.add(e),t}function h_(n,t,e=[12618344,13608308,10336383,9083576,13805176],i=10,s=.7){const o=new yt,r=new b().addVectors(n,t).multiplyScalar(.5);o.position.copy(r);const a=new b().subVectors(t,n),l=e.map(m=>new Je({color:m,side:Ge})),c=new Jt(.42,.3),u=Math.atan2(a.x,a.z),d=[],h=i*2;for(let m=0;m<=h;m++){const v=m/h,g=en.lerp(n.x,t.x,v)-r.x,f=en.lerp(n.y,t.y,v)-s*Math.sin(Math.PI*v)-r.y,S=en.lerp(n.z,t.z,v)-r.z;if(d.push(new b(g,f,S)),m%2===0){const w=new R(c,l[m/2%l.length]);w.position.set(g,f-.15,S),w.rotation.y=u,o.add(w)}}const p=new Xl(new Le().setFromPoints(d),new kr({color:9071182}));return o.add(p),o}function bd(n,t,e){const o=document.createElement("canvas");o.width=256,o.height=128;const r=o.getContext("2d"),a="#"+e.toString(16).padStart(6,"0"),l=8;for(let m=0;m<l;m++)r.fillStyle=m%2===0?a:"#f7eeda",r.fillRect(m*(256/l),0,256/l,128);const c=new nn(o);c.colorSpace=xe,c.anisotropy=Ne?1:4;const u=new Je({map:c,side:Ge}),d=new yt,h=new R(new Jt(n,t),u);h.rotation.x=-.5,h.position.set(0,.15,.45),d.add(h);const p=new R(new Jt(n,.2),u);return p.position.set(0,.1,t*.85),p.rotation.x=-.15,d.add(p),d}function f_(n,t=0,e=13209450,i="BOUTIQUE"){const s=new yt;s.position.copy(n),s.rotation.y=t;const o=5,r=3.3,a=2.8,l=new Je({color:15129019}),c=new R(new ft(o,r,a),l);c.position.y=r/2,c.castShadow=!0,s.add(c);const u=new R(new ft(o+.24,.2,a+.24),l);u.position.y=r+.1,s.add(u);const d=Ne?256:512,h=Math.round(d*(r*.6)/(o*.8)),p=document.createElement("canvas");p.width=d,p.height=h;const m=p.getContext("2d");m.scale(d/512,h/253);const v=m.createLinearGradient(0,0,0,253);v.addColorStop(0,"#f2e6c9"),v.addColorStop(1,"#dccaa3"),m.fillStyle=v,m.fillRect(0,0,512,253);const g=["#c08a68","#7d9a68","#cfa574"];for(let G=0;G<3;G++){const x=30+G*160;m.fillStyle="rgba(122,95,56,0.5)",m.fillRect(x,152,120,8),m.fillStyle=g[G];for(let U=0;U<4;U++)m.beginPath(),m.arc(x+22+U*26,141,9,0,Math.PI*2),m.fill()}m.fillStyle="rgba(255,255,255,0.2)",m.beginPath(),m.moveTo(300,0),m.lineTo(430,0),m.lineTo(230,253),m.lineTo(100,253),m.closePath(),m.fill(),m.strokeStyle="#8a6a4e",m.lineWidth=12,m.strokeRect(6,6,500,241),m.fillStyle="#3a2e1f",m.font="700 36px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",m.textAlign="center",m.fillText(i,256,44);const f=new nn(p);f.colorSpace=xe,f.anisotropy=Ne?2:8;const S=new $({map:f,emissive:16767392,emissiveMap:f,emissiveIntensity:0}),w=new R(new Jt(o*.8,r*.6),S);w.position.set(0,r*.52,a/2+.03),s.add(w);const E=bd(o*.84,.9,e);return E.position.set(0,r-.55,a/2-.2),s.add(E),s.userData={window:w,awning:E},s}function p_(){const n=new yt,t=new $({color:12618344,roughness:.5,metalness:.25});new $({color:4864550,roughness:.5,metalness:.3});const e=new $({color:9416888,roughness:.15,metalness:.5}),i=new R(new ft(2,1.3,5.6),t);i.position.y=1.15,i.castShadow=!0,n.add(i);const s=new R(new ft(1.8,.16,5.4),t);s.position.y=1.9,n.add(s);const o=new R(new ft(1.72,.52,5.2),e);o.position.y=1.56,n.add(o);const r=new R(new ft(1.8,.5,.06),e);r.position.set(0,1.5,2.8),n.add(r);const a=new $({color:3023896,roughness:.9});for(const[u,d]of[[-.95,1.7],[.95,1.7],[-.95,-1.7],[.95,-1.7]]){const h=new R(new bt(.36,.36,.26,14),a);h.rotation.x=Math.PI/2,h.rotation.z=Math.PI/2,h.position.set(u,.36,d),n.add(h)}const l=new $({color:16773839,emissive:16769184,emissiveIntensity:.5});for(const u of[-.7,.7]){const d=new R(new se(.1,8,8),l);d.position.set(u,1.05,2.82),n.add(d)}const c=new ri(new Yn({map:On(0,"rgba(255,226,175,0.4)"),transparent:!0,blending:Xe,depthWrite:!1,depthTest:!1}));return c.scale.set(4.2,4.2,1),c.position.set(0,1.1,4.6),n.add(c),{group:n,cone:c,body:i}}function m_(){const n=new yt,t=new Je({color:12159582}),e=new Je({color:9069120}),i=new R(new ft(.3,.22,.55),t);i.position.y=.24,i.castShadow=!0,n.add(i);const s=new R(new ft(.16,.15,.18),t);s.position.set(0,.36,.33),n.add(s);const o=new R(new ft(.04,.09,.11),e);o.position.set(0,.45,.34),n.add(o);const r=new R(new ft(.05,.05,.2),t);r.position.set(0,.36,-.37),n.add(r);for(const[a,l]of[[-.11,.18],[.11,.18],[-.11,-.18],[.11,-.18]]){const c=new R(new ft(.06,.18,.06),t);c.position.set(a,.09,l),n.add(c)}return n.userData={tail:r},n}function g_(n){const t=new yt;t.position.copy(n);const e=new R(new bt(.025,.025,1.1,6),new $({color:9071182,roughness:.8}));e.position.y=.55,t.add(e);const i=[12606026,13608308,8231528],s=[];for(let o=0;o<3;o++){const r=new R(new se(.21,10,8),new Je({color:i[o],emissive:i[o],emissiveIntensity:.08}));r.position.set((o-1)*.22,1.2+Math.sin(o*2.1)*.05,o%2*.12-.06),r.scale.set(1,1.2,1),t.add(r),s.push(r)}return t.userData={balloons:s},t}function v_(n,t=0){const e=new yt;e.position.copy(n),e.rotation.y=t;const i=new $({color:3025446,roughness:.5,metalness:.5}),s=new R(new bt(.045,.07,3.4,8),i);s.position.y=1.7,s.castShadow=!0,e.add(s);const o=new $({color:3816770,roughness:.6,metalness:.3}),r=new R(new ft(.32,.9,.26),o);r.position.y=2.9,e.add(r);const a=[{c:13193026,y:3.24,on:.9},{c:14723130,y:2.9,on:.2},{c:6265944,y:2.56,on:.2}],l=[];a.forEach(d=>{const h=new R(new se(.095,10,8),new $({color:1711136,emissive:d.c,emissiveIntensity:d.on,roughness:.4}));h.position.set(0,d.y,.14),e.add(h),l.push(h)});const c=new R(new ft(.17,.55,.14),o);c.position.set(0,1.15,0),e.add(c);const u=[];for(const[d,h]of[[13193026,1.32],[6265944,1.05]]){const p=new R(new se(.05,8,6),new $({color:1711136,emissive:d,emissiveIntensity:.7,roughness:.4}));p.position.set(0,h,.08),e.add(p),u.push(p)}return e.userData={bulbs:l,peds:u},e}function __(n){const t=new yt;t.position.copy(n);const e=new $({color:14932410,roughness:.7,metalness:.2}),i=new R(new bt(.09,.11,.5,8),e);i.position.y=.25,i.castShadow=!0,t.add(i);const s=new R(new se(.09,8,6),e);return s.position.y=.51,t.add(s),t}function M_(n){const t=new yt;t.position.copy(n);const e=new $({color:11882556,roughness:.6,metalness:.35}),i=new R(new bt(.1,.13,.52,10),e);i.position.y=.26,i.castShadow=!0,t.add(i);const s=new R(new se(.1,10,8),e);s.position.y=.55,t.add(s);for(const o of[0,Math.PI/2,Math.PI,3*Math.PI/2]){const r=new R(new bt(.055,.055,.07,8),e);r.position.set(Math.cos(o)*.13,.38,Math.sin(o)*.13),r.rotation.z=Math.PI/2,r.rotation.y=o,t.add(r)}return t}function y_(n){const t=new yt;t.position.copy(n);const e=new $({color:6978964,roughness:.6,metalness:.4}),i=new R(new bt(.03,.045,1.15,8),e);i.position.y=.58,i.castShadow=!0,t.add(i);const s=new R(new ft(.32,.42,.17),e);s.position.y=1.02,s.castShadow=!0,t.add(s);const o=new R(new ft(.22,.045,.02),new $({color:1711136,roughness:.7}));return o.position.set(0,1.2,.095),t.add(o),t}function x_(n,t=0,e=["ESPACE","PUBLICITAIRE"]){const i=new yt;i.position.copy(n),i.rotation.y=t;const s=new $({color:3814187,roughness:.55,metalness:.5}),o=new R(new bt(.42,.5,.1,10),s);o.position.y=.05,i.add(o);const r=new R(new bt(.06,.08,1,8),s);r.position.y=.6,r.castShadow=!0,i.add(r);const a=270,l=400,c=document.createElement("canvas");c.width=a,c.height=l;const u=c.getContext("2d"),d=u.createLinearGradient(0,0,0,l);d.addColorStop(0,"#fbf4e0"),d.addColorStop(1,"#efdfba"),u.fillStyle=d,u.fillRect(0,0,a,l),u.strokeStyle="rgba(138,111,69,0.55)",u.lineWidth=10,u.strokeRect(10,10,a-20,l-20),u.fillStyle="#c08a68",u.fillRect(0,0,a,36),u.textAlign="center",u.fillStyle="#3a2e1f",u.font="700 40px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",e.forEach((g,f)=>u.fillText(g,a/2,172+f*58)),u.fillStyle="#8a6a4e",u.font="400 22px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",u.fillText("DOMAINE PUBLIC",a/2,l-34);const h=new nn(c);h.colorSpace=xe,h.anisotropy=Ne?2:8;const p=new Je({map:h});p.emissive=new _t(15524552),p.emissiveIntensity=0;const m=new R(new Jt(1.35,2),p);m.position.set(0,1.95,.02),i.add(m);const v=m.clone();return v.position.z=-.02,v.rotation.y=Math.PI,i.add(v),i.userData={front:m},i}function S_(n,t=1){const e=new yt;e.position.copy(n),e.scale.setScalar(t);const i=new $({color:12035198,roughness:.9}),s=new R(new ft(1,.48,1),i);s.position.y=.24,s.castShadow=!0,e.add(s);const o=new R(new ft(1.08,.08,1.08),i);o.position.y=.48,e.add(o);const r=new R(new ft(.92,.06,.92),new $({color:4338986,roughness:1}));r.position.y=.51,e.add(r);const a=new $({color:7031340,roughness:.95,flatShading:!0}),l=new R(new bt(.09,.13,2.2,7),a);l.position.y=1.55,l.castShadow=!0,e.add(l);const c=new $({color:5599295,roughness:1,flatShading:!0});for(let u=0;u<3;u++){const d=new R(new se(1-u*.16,8,6),c);d.position.set((Math.random()-.5)*.4,2.55+u*.55,(Math.random()-.5)*.4),d.scale.y=.85,d.castShadow=!0,e.add(d)}return e}function w_(n,t=0){const e=new Le,i=new Float32Array([0,-1,0,-.55,-.35,0,.55,-.35,0,0,-1,0,.55,-.35,0,.26,.9,0,0,-1,0,.26,.9,0,-.26,.9,0,0,-1,0,-.26,.9,0,-.55,-.35,0]);e.setAttribute("position",new Ve(i,3)),e.computeVertexNormals();const s=new R(e,new Be({color:15789280,side:Ge}));s.rotation.x=-Math.PI/2;const o=new yt;return o.add(s),o.rotation.y=t,o.position.set(n.x,.05,n.z),o}function b_(n,t=1){const e=new yt,i=new $({color:5913892,roughness:.95,flatShading:!0}),s=new R(new bt(.09,.14,1.3,7),i);s.position.y=.65,s.castShadow=!0,e.add(s);const o=new $({color:4151862,roughness:1,flatShading:!0}),r=4;for(let l=0;l<r;l++){const c=new R(new ln(1.05-l*.18,.85,8),o);c.position.y=1.1+l*.62,c.castShadow=!0,e.add(c)}const a=new R(new ln(.14,.42,6),o);return a.position.y=3.7,e.add(a),e.position.copy(n),e.scale.setScalar(t),e}function xu(n,t=0,e=0){const i=new yt;if(i.position.copy(n),i.rotation.y=e,t===0){const s=new $({color:3948356,roughness:.85,metalness:.35}),o=new R(new bt(.42,.42,.05,20),s);o.position.y=.06,i.add(o);const r=new R(new Kn(.3,20),new $({color:2895411,roughness:.9}));r.rotation.x=-Math.PI/2,r.position.y=.09,i.add(r);for(let a=0;a<3;a++){const l=new R(new ft(.52,.02,.035),s);l.position.set(0,.105,-.2+a*.2),i.add(l)}}else{const s=new $({color:3093046,roughness:.8,metalness:.4}),o=new R(new ft(.9,.04,.5),s);o.position.y=.06,i.add(o);for(let r=0;r<5;r++){const a=new R(new ft(.7,.03,.05),s);a.position.set(0,.075,-.17+r*.085),i.add(a)}}return i}function Su(n){const t=new yt;t.position.copy(n);const e=new $({color:5916210,roughness:.9,flatShading:!0}),i=new R(new bt(.09,.13,7.2,8),e);i.position.y=3.6,i.castShadow=!0,t.add(i);const s=new R(new ft(2.6,.09,.09),e);s.position.y=6.3,t.add(s);const o=new $({color:9083498,roughness:.6,metalness:.2});for(const a of[-1.15,1.15]){const l=new R(new bt(.05,.07,.14,6),o);l.position.set(a,6.4,0),t.add(l)}const r=new R(new ln(.12,.3,6),e);return r.position.y=7.32,t.add(r),t}function wu(n,t,e=.8){const i=[];for(let r=0;r<=24;r++){const a=r/24;i.push(new b(n.x+(t.x-n.x)*a,n.y+(t.y-n.y)*a+Math.sin(a*Math.PI)*-e,n.z+(t.z-n.z)*a))}const o=new Mn(i);return new R(new Ks(o,24,.015,5,!1),new Be({color:2893344}))}function E_(n){const t=new yt;t.position.copy(n);const e=new $({color:14248509,roughness:.8}),i=new R(new ln(.16,.5,10),e);i.position.y=.25,i.castShadow=!0,t.add(i);const s=new $({color:15920352,roughness:.7}),o=new R(new bt(.105,.115,.09,10),s);o.position.y=.2,t.add(o);const r=new R(new ft(.3,.04,.3),e);return r.position.y=.02,t.add(r),t}function T_(n,t){const e=window.innerWidth<=760;Iv(e);const i=C=>e?Math.max(2,Math.round(C*.55)):C,s=(C,D,P=.35)=>{const B=.94/D;return .03+(C+.5)*B+(Math.random()-.5)*B*P},o=new Wl({canvas:n,antialias:!e,alpha:!1});o.setPixelRatio(Math.min(window.devicePixelRatio,e?1.75:1.5)),o.setSize(window.innerWidth,window.innerHeight),o.toneMapping=Io,o.toneMappingExposure=1.25,o.shadowMap.enabled=!e,o.shadowMap.type=Rl;const r=new ql;r.fog=new Oi(ie.skyHorizon,60,760);const a=new Ue(e?57:52,window.innerWidth/window.innerHeight,.1,900);let l=null,c=null;cs()||(l=new Av(o),l.addPass(new Cv(r,a)),c=new Js(new Et(Math.max(2,Math.floor(window.innerWidth/2)),Math.max(2,Math.floor(window.innerHeight/2))),.35,.6,.8),l.addPass(c),l.addPass(new Lv));const u=[{h:4,night:1,top:725536,mid:1385016,hor:3227998,amb:6253452,hs:4412282,hg:2305088,sun:10335448,fog:3227998,sunI:.3,exp:1.5,warm:0},{h:5.2,night:.85,top:1713208,mid:2766160,hor:4868702,amb:6975116,hs:4740218,hg:2501694,sun:11056336,fog:3818848,sunI:.5,exp:1.45,warm:.15},{h:6.2,night:.25,top:9084096,mid:14266506,hor:15909e3,amb:10127986,hs:15255712,hg:9071184,sun:16763e3,fog:14201994,sunI:1.4,exp:1.2,warm:.9},{h:7.5,night:.05,top:10466512,mid:14866104,hor:15919312,amb:11313280,hs:15787212,hg:11049592,sun:16769712,fog:15787216,sunI:1.9,exp:1.18,warm:.45},{h:10,night:0,top:10532562,mid:15261120,hor:16182998,amb:11772544,hs:15918796,hg:12101246,sun:16772552,fog:16116950,sunI:2.2,exp:1.15,warm:0},{h:14,night:0,top:10467023,mid:15261120,hor:16182998,amb:11772544,hs:15918796,hg:12101246,sun:16772294,fog:16116950,sunI:2.2,exp:1.12,warm:0},{h:17,night:0,top:9676488,mid:14996140,hor:15785916,amb:11050112,hs:15654850,hg:11575420,sun:16768424,fog:15260864,sunI:1.9,exp:1.18,warm:.2},{h:18.4,night:.1,top:8030900,mid:14262378,hor:15769690,amb:9337448,hs:14723704,hg:8019014,sun:16756320,fog:14195816,sunI:1.3,exp:1.25,warm:1},{h:19.4,night:.55,top:3817568,mid:8017e3,hor:10512474,amb:6970488,hs:6968436,hg:3420234,sun:14196848,fog:7623784,sunI:.6,exp:1.35,warm:.7},{h:20.5,night:.85,top:1317936,mid:2371658,hor:3818592,amb:5923966,hs:3950704,hg:1975348,sun:10335448,fog:3424348,sunI:.35,exp:1.45,warm:.15},{h:22,night:1,top:725536,mid:1385016,hor:3227998,amb:6253452,hs:4412282,hg:2305088,sun:10335448,fog:3227998,sunI:.3,exp:1.5,warm:0},{h:24,night:1,top:725536,mid:1385016,hor:3227998,amb:6253452,hs:4412282,hg:2305088,sun:10335448,fog:3227998,sunI:.3,exp:1.5,warm:0}].map(C=>({...C,top:new _t(C.top),mid:new _t(C.mid),hor:new _t(C.hor),amb:new _t(C.amb),hs:new _t(C.hs),hg:new _t(C.hg),sun:new _t(C.sun),fog:new _t(C.fog)}));let d="auto",h=null;function p(){if(h!==null)return h;if(d==="day")return 13;if(d==="night")return 1.5;const C=new Date;return C.getHours()+C.getMinutes()/60+C.getSeconds()/3600}const m={top:new _t,mid:new _t,hor:new _t,amb:new _t,hs:new _t,hg:new _t,sun:new _t,fog:new _t,night:0,warm:0,sunI:1,exp:1.25},v={top:new _t,mid:new _t,hor:new _t,amb:new _t,hs:new _t,hg:new _t,sun:new _t,fog:new _t,night:0,warm:0,sunI:1,exp:1.25};function g(C){let D=u[u.length-2],P=u[u.length-1],B=!1;for(let it=0;it<u.length-1;it++)if(C>=u[it].h&&C<u[it+1].h){D=u[it],P=u[it+1],B=!1;break}C<u[0].h&&(D=u[u.length-1],P=u[0],B=!0);let H=B?(C+24-D.h)/(P.h+24-D.h):(C-D.h)/Math.max(1e-6,P.h-D.h);H=H<0?0:H>1?1:H;const K=H*H*(3-2*H);m.night=D.night+(P.night-D.night)*K,m.warm=D.warm+(P.warm-D.warm)*K,m.sunI=D.sunI+(P.sunI-D.sunI)*K,m.exp=D.exp+(P.exp-D.exp)*K,m.top.copy(D.top).lerp(P.top,K),m.mid.copy(D.mid).lerp(P.mid,K),m.hor.copy(D.hor).lerp(P.hor,K),m.amb.copy(D.amb).lerp(P.amb,K),m.hs.copy(D.hs).lerp(P.hs,K),m.hg.copy(D.hg).lerp(P.hg,K),m.sun.copy(D.sun).lerp(P.sun,K),m.fog.copy(D.fog).lerp(P.fog,K)}g(p()),v.top.copy(m.top),v.mid.copy(m.mid),v.hor.copy(m.hor),v.amb.copy(m.amb),v.hs.copy(m.hs),v.hg.copy(m.hg),v.sun.copy(m.sun),v.fog.copy(m.fog),v.night=m.night,v.warm=m.warm,v.sunI=m.sunI,v.exp=m.exp;const f=new fn({side:pn,depthWrite:!1,uniforms:{top:{value:new _t(ie.skyTop)},mid:{value:new _t(ie.skyMid)},horizon:{value:new _t(ie.skyHorizon)},sunDir:{value:new b(0,.16,-1).normalize()},sunColor:{value:new _t(ie.sun)},night:{value:0},topN:{value:new _t(725536)},midN:{value:new _t(1385016)},horN:{value:new _t(3227998)},moonDir:{value:new b(.22,.52,-.83).normalize()},moonColor:{value:new _t(14082804)},warm:{value:0}},vertexShader:`
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
    `});r.add(new R(new se(700,e?24:40,e?12:20),f));const S=new ri(new Yn({map:On(0,"rgba(244,200,150,0.5)"),transparent:!0,blending:Xe,depthWrite:!1,depthTest:!1}));S.position.set(42,56,-560),S.scale.setScalar(42),a.add(S);const w=new ri(new Yn({map:On(0,"rgba(214,226,244,0.5)"),transparent:!0,blending:Xe,depthWrite:!1,depthTest:!1,opacity:0}));w.position.set(-34,54,-545),w.scale.setScalar(30),a.add(w),r.add(a);const E=new R(new Kn(1600,e?32:48),new $({map:yd(),roughness:1,metalness:0}));E.rotation.x=-Math.PI/2,E.position.y=-.02,E.receiveShadow=!0,r.add(E);const G=[new b(0,0,0),new b(7,0,30),new b(-8,0,62),new b(9,0,96),new b(-9,0,132),new b(8,0,168),new b(-7,0,202),new b(6,0,236),new b(-8,0,270),new b(7,0,304),new b(-6,0,338),new b(8,0,372),new b(-8,0,406),new b(6,0,440),new b(0,0,468)],x=new Mn(G,!1,"centripetal",.6);x.arcLengthDivisions=1e3;const U=e?240:500,z=gi(x,4.2,ie.path,zs(),U);z.position.y=.012,r.add(z);const y=[1.85,-1.85].map(C=>{const D=[],P=e?60:120;for(let B=0;B<=P;B++){const H=B/P,K=x.getPointAt(H),it=x.getTangentAt(H),pt=new b(-it.z,0,it.x).normalize();D.push(new b(K.x+pt.x*C,0,K.z+pt.z*C))}return new Mn(D,!1,"centripetal",.6)});for(const C of y){const D=gi(C,.14,ie.pathEdge,null,U,!0);D.position.y=.032,r.add(D)}for(let C=0;C<=i(84);C++){const D=C/84*.96+.02,P=x.getPointAt(D),B=x.getTangentAt(D),H=new b(-B.z,0,B.x).normalize();for(const K of[-1.25,1.25]){const it=new R(new ft(.16,.03,1.3),new Be({color:14859594}));it.position.set(P.x+H.x*K,.05,P.z+H.z*K),it.rotation.y=Math.atan2(B.x,B.z),r.add(it)}}const M=new Be({color:15919826});for(const C of[.22,.58,.86]){const D=x.getPointAt(C),P=x.getTangentAt(C),B=new b(-P.z,0,P.x).normalize();for(let H=-3;H<=3;H++){const K=D.clone().add(P.clone().multiplyScalar(H*.55)),it=new R(new ft(.42,.03,3.3),M);it.position.set(K.x,.05,K.z),it.rotation.y=Math.atan2(B.x,B.z),r.add(it)}}for(const C of[.3,.55,.78]){const D=x.getPointAt(C),P=x.getTangentAt(C),B=new b(-P.z,0,P.x).normalize();for(const H of[-1.1,1.1]){const K=D.clone().add(B.clone().multiplyScalar(H));r.add(w_(K,Math.atan2(P.x,P.z)))}}const I=[3.55,-3.55].map(C=>{const D=[],P=e?60:120;for(let B=0;B<=P;B++){const H=B/P,K=x.getPointAt(H),it=x.getTangentAt(H),pt=new b(-it.z,0,it.x).normalize();D.push(new b(K.x+pt.x*C,0,K.z+pt.z*C))}return new Mn(D,!1,"centripetal",.6)}),k=[2.42,-2.42].map(C=>{const D=[],P=e?60:120;for(let B=0;B<=P;B++){const H=B/P,K=x.getPointAt(H),it=x.getTangentAt(H),pt=new b(-it.z,0,it.x).normalize();D.push(new b(K.x+pt.x*C,0,K.z+pt.z*C))}return new Mn(D,!1,"centripetal",.6)}),F=qv();for(const C of I){const D=gi(C,2.2,13877398,F,U);D.position.y=.015,r.add(D)}for(const C of k){const D=gi(C,.24,12100725,null,U);D.position.y=.035,r.add(D)}const Z=new R(new Ks(x,e?200:400,.05,8,!1),new Be({color:13015654,transparent:!0,opacity:.7,blending:ls,depthWrite:!1}));Z.position.y=.055,r.add(Z);const et=Z.geometry.index.count,J=new _d(11772544,.75);r.add(J);const rt=new md(15918796,12101246,.5);r.add(rt);const j=new vd(16772552,2.2);j.position.set(-40,60,-120),j.castShadow=!0,j.shadow.mapSize.set(2048,2048),j.shadow.camera.left=-160,j.shadow.camera.right=160,j.shadow.camera.top=200,j.shadow.camera.bottom=-60,j.shadow.camera.near=10,j.shadow.camera.far=700,r.add(j),r.add(j.target);const gt=[],ht=[],Pt=t.length,Y=[],Ut=[],L=[],O=[],st=[],ct=[],It=[],Vt=[],Zt=[],ge=[],re=[],Ie=[],X=[],mn=[],ae=[],le=[],Xt=[],Te=[],Yt=[],N=[],T=new b(.5,.3,-.5),Q=new b(.5,.3,-.5).normalize();function ut(C,D){const P=Gv(C,D);return O.push({g:P,phase:Math.random()*Math.PI*2}),r.add(P),P}function dt(C,D,P){const B=wd(C,D,P);return st.push({g:B,phase:Math.random()*Math.PI*2}),r.add(B),B}function lt(C,D,P){const B=e_(C,D,P);return Xt.push({g:B,phase:Math.random()*Math.PI*2}),r.add(B),B}t.forEach((C,D)=>{const P=.02+(D+.5)/Pt*.94,B=D%2===0?1:-1,H=xd(C,x,P,B,D);if(gt.push(H),ht.push({mesh:H.front,kind:"panel",index:D}),r.add(H.group),D%3===0){const K=new b(Math.cos(H.group.rotation.y),0,-Math.sin(H.group.rotation.y)).normalize(),it=H.group.position.clone().add(K.clone().multiplyScalar(3.4));it.y=0,dt(it,.9+Math.random()*.5,D),ut(H.group.position.clone().add(K.clone().multiplyScalar(-3.2)),.7+Math.random()*.5)}});for(let C=0;C<i(48);C++){const D=C*13+(e?16:0)+Math.random()*7,P=(7+Math.random()*27)*(e?.72:1),B=4+Math.random()*3.5,H=4+Math.random()*3.5,K=e?20:0,it=-78-K-Math.random()*34,pt=78+K+Math.random()*34,Mt=Al(B,P,H,D,it),he=Al(B,P*(.7+Math.random()*.6),H,D,pt);Zt.push(Mt,he),r.add(Mt,he);for(const[ke,wn]of[[it,B],[pt,B*.8]]){const We=ke>0?-1:1,He=Math.random();He<.45?lt(new b(ke+We*2.6,0,D),wn*1.05,.7+Math.random()*.4):He<.72?(ut(new b(ke+We*2.2,0,D+(Math.random()-.5)*3),.8+Math.random()*.5),ut(new b(ke+We*3,0,D-1.4),.6+Math.random()*.4)):He<.88&&dt(new b(ke+We*2.4,0,D+(Math.random()-.5)*2),.9+Math.random()*.5,C*7+3)}}for(let C=0;C<i(14);C++){const D=30+Math.random()*450,P=Math.random()>.5?1:-1,B=28+Math.random()*55,H=42+Math.random()*50;r.add(Wv(new b(P*(210+Math.random()*150),B*.4-3,D),H,B,38+Math.random()*30))}const Gt=new $({color:ie.hill,roughness:1,flatShading:!0}),xt=new R(new se(120,24,12),Gt);xt.scale.set(1,.5,4),xt.position.set(-230,-2,240),r.add(xt);const zt=new R(new se(150,24,12),Gt);zt.scale.set(1,.55,4.5),zt.position.set(280,0,330),r.add(zt);const oe=[];for(let C=0;C<=i(14);C++){const D=C/14*.96+.02,P=x.getPointAt(D),B=x.getTangentAt(D),H=C%2===0?1:-1,K=new b(-B.z,0,B.x).normalize(),it=P.clone().add(K.clone().multiplyScalar(H*4.8));r.add(Os(it,H));const pt=Bs(it,H);oe.push({glow:pt.glow,pool:pt.pool,i:C}),r.add(pt.group)}for(let C=0;C<=i(13);C++){const D=C/13*.96+.02+.035;if(D>.98)continue;const P=x.getPointAt(D),B=x.getTangentAt(D),H=C%2===0?-1:1,K=new b(-B.z,0,B.x).normalize(),it=P.clone().add(K.clone().multiplyScalar(H*5.3));r.add(is(it,H));const pt=P.clone().add(K.clone().multiplyScalar(H*4.6));if(dt(pt,.8+Math.random()*.5,C*3+1),C%3===1){const Mt=P.clone().add(K.clone().multiplyScalar(H*6.1));r.add(Zv(Mt))}}const mt=[],Lt=t.map((C,D)=>.02+(D+.5)/Pt*.94);for(let C=0;C<i(36);C++){let D=s(C,i(36));for(let Mt=0;Mt<8&&Lt.some(he=>Math.abs(he-D)<.018);Mt++)D=s(C,i(36));const P=x.getPointAt(D),B=x.getTangentAt(D),H=new b(-B.z,0,B.x).normalize(),K=Math.random()>.5?1:-1,it=P.clone().add(H.clone().multiplyScalar(K*(8.5+Math.random()*7.5))),pt=vo(it,.9+Math.random()*.8);mt.push({g:pt,phase:Math.random()*Math.PI*2}),r.add(pt)}for(let C=0;C<i(14);C++){let D=s(C,i(14));for(let Mt=0;Mt<8&&Lt.some(he=>Math.abs(he-D)<.02);Mt++)D=s(C,i(14));const P=x.getPointAt(D),B=x.getTangentAt(D),H=new b(-B.z,0,B.x).normalize(),K=Math.random()>.5?1:-1,it=P.clone().add(H.clone().multiplyScalar(K*(10+Math.random()*9))),pt=b_(it,.9+Math.random()*.9);mt.push({g:pt,phase:Math.random()*Math.PI*2}),r.add(pt)}for(let C=0;C<i(7);C++){const D=s(C,i(7),.25);if(Lt.some(pt=>Math.abs(pt-D)<.015))continue;const P=x.getPointAt(D),B=x.getTangentAt(D),H=new b(-B.z,0,B.x).normalize(),K=C%2===0?1:-1,it=P.clone().add(H.clone().multiplyScalar(K*(5.1+Math.random()*.5)));r.add(is(it,K))}{const C=i(18);for(let D=0;D<C;D++){const P=s(D,C,.35),B=x.getPointAt(P),H=x.getTangentAt(P),K=new b(-H.z,0,H.x).normalize();for(const it of[1,-1]){const pt=it*(24+Math.random()*34),Mt=B.clone().add(K.clone().multiplyScalar(pt)),he=Math.random();if(he<.34){const ke=vo(Mt,.85+Math.random()*.7);mt.push({g:ke,phase:Math.random()*Math.PI*2}),r.add(ke)}else if(he<.55)ut(Mt,.9+Math.random()*.6);else if(he<.68)lt(Mt,2.4+Math.random()*2.2,.8+Math.random()*.3);else if(he<.8)r.add(is(Mt,it));else{r.add(Os(Mt,it));const ke=Bs(Mt,it);oe.push({glow:ke.glow,pool:ke.pool,i:oe.length}),r.add(ke.group)}}}}const qt=[];for(let C=0;C<i(12);C++){const D=s(C,i(12),.3),P=x.getPointAt(D),B=x.getTangentAt(D),H=new b(-B.z,0,B.x).normalize(),K=Math.random()>.5?1:-1,it=P.clone().add(H.clone().multiplyScalar(K*(3.1+Math.random()*.9))),pt=_u();pt.position.set(it.x,0,it.z),qt.push({g:pt,phase:Math.random()*Math.PI*2,x0:it.x,z0:it.z,fx:H.x*K,fz:H.z*K,state:0,timer:0,idx:C}),ht.push({mesh:pt.userData.body,kind:"pigeon",index:C}),r.add(pt)}(e?[.14,.46]:[.14,.46,.82]).forEach((C,D)=>{const P=x.getPointAt(C),B=x.getTangentAt(C),H=new b(-B.z,0,B.x).normalize(),K=D%2===0?1:-1,it=P.clone().add(H.clone().multiplyScalar(K*5.15)),pt=Math.atan2(H.x,H.z)+(K>0?0:Math.PI),Mt=jv(it,pt,D===1?["RÈGLES","D'AFFICHAGE"]:void 0);ht.push({mesh:Mt.userData.body,kind:"morris",tip:"Colonne Morris — l'affichage classique du mobilier urbain publicitaire."}),Te.push(Mt),r.add(Mt),r.add(ni(it,2,2)),lt(it.clone().add(H.clone().multiplyScalar(K*-1.6)),2.2,.55)}),(e?[.24]:[.24,.62]).forEach((C,D)=>{const P=x.getPointAt(C),B=x.getTangentAt(C),H=new b(-B.z,0,B.x).normalize(),K=D%2===0?-1:1,it=P.clone().add(H.clone().multiplyScalar(K*5.5)),pt=Kv(it,K);ht.push({mesh:pt.userData.poster,kind:"shelter",tip:"Abribus — le mobilier qui allie transport et communication."}),Yt.push(pt),r.add(pt),r.add(ni(it,4.6,2.6))}),(e?[.19,.85]:[.12,.28,.45,.6,.76,.9]).forEach((C,D)=>{const P=x.getPointAt(C),B=x.getTangentAt(C),H=new b(-B.z,0,B.x).normalize(),K=D%2===0?1:-1,it=P.clone().add(H.clone().multiplyScalar(K*6.4)),pt=Math.atan2(B.x,B.z)+(K>0?Math.PI:0),Mt=[13215868,9415293,13805176],he=Jv(it,Mt[D%Mt.length],pt);Ut.push({g:he,phase:Math.random()*Math.PI*2}),r.add(he)});for(let C=0;C<i(8);C++){const D=s(C,i(8),.3),P=x.getPointAt(D),B=x.getTangentAt(D),H=new b(-B.z,0,B.x).normalize(),K=Math.random()>.5?1:-1,it=P.clone().add(H.clone().multiplyScalar(K*(5.9+Math.random()*1.4)));r.add(Qv(it,Math.random()*Math.PI*2))}(e?[.28,.72]:[.18,.5,.8]).forEach(C=>{const D=x.getPointAt(C),P=x.getTangentAt(C),B=new b(-P.z,0,P.x).normalize(),H=D.clone().add(B.clone().multiplyScalar(3.9)),K=D.clone().add(B.clone().multiplyScalar(-3.9));H.y=5.3,K.y=5.3;const it=h_(H,K);ct.push({g:it,phase:Math.random()*Math.PI*2}),r.add(it)});const ye=[{color:13209450,label:"BOULANGERIE"},{color:8231528,label:"PHARMACIE"},{color:9083576,label:"LIBRAIRIE"},{color:13608308,label:"CAFÉ DU PARC"}];(e?[.15,.42,.72]:[.15,.38,.6,.84]).forEach((C,D)=>{const P=x.getPointAt(C),B=x.getTangentAt(C),H=new b(-B.z,0,B.x).normalize(),K=P.clone().add(H.clone().multiplyScalar(-1*(11+D%2*2.4))),it=Math.atan2(H.x,H.z),pt=f_(K,it,ye[D%ye.length].color,ye[D%ye.length].label);ge.push(pt),r.add(pt),r.add(ni(K,5.4,3.2))}),[.32,.7].forEach((C,D)=>{const P=x.getPointAt(C),B=x.getTangentAt(C),H=new b(-B.z,0,B.x).normalize(),K=D%2===0?1:-1,it=P.clone().add(H.clone().multiplyScalar(K*2.8));r.add(t_(it,Math.atan2(B.x,B.z),D===0?"D":"A"))});for(let C=0;C<i(8);C++){const D=s(C,i(8),.3),P=x.getPointAt(D),B=x.getTangentAt(D),H=new b(-B.z,0,B.x).normalize(),K=Math.random()>.5?1:-1,it=P.clone().add(H.clone().multiplyScalar(K*(4.55+Math.random()*.4)));lt(it,1.5+Math.random()*1.2,.5+Math.random()*.3)}[{t:.09,side:-1,lines:["RÉCLAMEZ","VOTRE VILLE"]},{t:.36,side:1,lines:["ESPACE","PUBLICITAIRE"]},{t:.62,side:-1,lines:["MOBILIER","URBAIN"]},{t:.88,side:1,lines:["ZONAGE","RÉGULÉ"]}].forEach(C=>{const D=x.getPointAt(C.t),P=x.getTangentAt(C.t),B=new b(-P.z,0,P.x).normalize(),H=D.clone().add(B.clone().multiplyScalar(C.side*7.6)),K=Math.atan2(-B.x*C.side,-B.z*C.side),it=c_(H,K,C.lines);re.push(it),ht.push({mesh:it.userData.face,kind:"billboard",tip:"Grand format 4×3 — un panneau publicitaire soumis au zonage."}),r.add(it),r.add(ni(H,6.4,4)),ut(H.clone().add(B.clone().multiplyScalar(C.side*2.3)),.8),ut(H.clone().add(B.clone().multiplyScalar(C.side*2.8)),.7)});{const D=x.getPointAt(.33),P=x.getTangentAt(.33),B=new b(-P.z,0,P.x).normalize(),H=D.clone().add(B.clone().multiplyScalar(-11)),K=l_();K.position.copy(H);const it=e?26:60,pt=new Float32Array(it*3),Mt=new js({color:13625580,size:.09,transparent:!0,opacity:.6,blending:Xe,depthWrite:!1,sizeAttenuation:!0}),he=new Le;he.setAttribute("position",new Ve(pt,3));const ke=new Lo(he,Mt);K.add(ke),Y.push({g:K,phase:0,splash:0,drops:ke,nDrops:it,life:new Float32Array(it).fill(0),vx:new Float32Array(it),vy:new Float32Array(it),vz:new Float32Array(it)}),ht.push({mesh:K.userData.pool,kind:"fountain",index:0,tip:"Fontaine publique — l'embellissement du cadre de vie."}),r.add(K),r.add(ni(H,4.6,4.6));for(let He=0;He<4;He++){const bn=He/4*Math.PI*2+.4,kn=H.clone().add(new b(Math.cos(bn)*2.7,0,Math.sin(bn)*2.7));r.add(is(kn,1)),dt(kn.clone().add(new b(.6,0,0)),.8,He)}r.add(vo(H.clone().add(new b(-3.4,0,1.4)),1.3)),r.add(vo(H.clone().add(new b(3.2,0,-1.2)),1.2));for(let He=0;He<4;He++){const bn=He/4*Math.PI*2+.7,kn=_u();kn.position.set(H.x+Math.cos(bn)*2.2,0,H.z+Math.sin(bn)*2.2);const ko=kn.position;qt.push({g:kn,phase:Math.random()*Math.PI*2,x0:ko.x,z0:ko.z,fx:Math.cos(bn),fz:Math.sin(bn),state:0,timer:0,idx:qt.length}),ht.push({mesh:kn.userData.body,kind:"pigeon",index:qt.length-1}),r.add(kn)}const wn=H.clone().add(new b(3.9,0,-3.4)),We=yu(wn,Math.atan2(P.x,P.z)+Math.PI);Ie.push(We),ht.push({mesh:We.userData.sign,kind:"stall",tip:"Étal de marché — un commerce de proximité sur la place."}),r.add(We),r.add(ni(wn,2.6,1.4)),r.add(Ns(wn.clone().add(new b(.9,0,1.2)),Math.PI*.6,1)),r.add(Ns(wn.clone().add(new b(-1.1,0,.8)),Math.PI*1.3,3)),r.add(Ns(wn.clone().add(new b(.2,0,-1.3)),Math.PI*2.1,0))}{const D=x.getPointAt(.33),P=x.getTangentAt(.33),B=new b(-P.z,0,P.x).normalize(),H=D.clone().add(B.clone().multiplyScalar(11.6)).add(P.clone().multiplyScalar(3)),K=Nv(H);X.push(K),r.add(K.g);for(let it=0;it<i(3);it++){const pt=Uv(H);mn.push({g:pt.g,head:pt.head,tail:pt.tail,a:it/3*Math.PI*2+Math.random(),r:.6+Math.random()*2.4,sp:.35+Math.random()*.4,ph:Math.random()*Math.PI*2}),r.add(pt.g)}for(let it=0;it<5;it++){const pt=it/5*Math.PI*2+.4,Mt=H.clone().add(new b(Math.cos(pt)*5.4,0,Math.sin(pt)*5.4)),he=vo(Mt,.9+Math.random()*.7);mt.push({g:he,phase:Math.random()*Math.PI*2}),r.add(he)}r.add(is(H.clone().add(new b(4.6,0,1.4)),1)),r.add(is(H.clone().add(new b(-4.4,0,-1.6)),-1))}{const C=[{t:.06,off:4.8,side:1},{t:.18,off:5.2,side:-1},{t:.33,off:-11,side:-1},{t:.46,off:6,side:1},{t:.62,off:5.6,side:-1},{t:.78,off:6.2,side:1}];(e?C.slice(0,3):C).forEach((P,B)=>{const H=x.getPointAt(P.t),K=x.getTangentAt(P.t),it=new b(-K.z,0,K.x).normalize(),pt=H.clone().add(it.clone().multiplyScalar(P.side*P.off));for(let Mt=0;Mt<2;Mt++){const he=zv(pt.clone().add(new b((Math.random()-.5)*2,1.4+Math.random()*.8,(Math.random()-.5)*2)));ae.push({g:he.g,lw:he.lw,rw:he.rw,base:pt.clone(),ph:Math.random()*Math.PI*2,amp:.7+Math.random()*.9}),r.add(he.g)}})}{const D=x.getPointAt(.585),P=x.getTangentAt(.585),B=new b(-P.z,0,P.x).normalize(),H=D.clone().add(B.clone().multiplyScalar(-6.2)),K=Math.atan2(B.x,B.z),it=u_(H,K);L.push({g:it,phase:0}),ht.push({mesh:it.userData.sign,kind:"kiosk",tip:"Kiosque — un point de vente au cœur de la ville."}),r.add(it),r.add(ni(H,3,2.6)),lt(H.clone().add(new b(2.4,0,0)),1.6,.5);const pt=g_(H.clone().add(new b(1.5,0,1)));Vt.push({g:pt,phase:Math.random()*Math.PI*2,state:0,timer:0}),pt.userData.balloons.forEach(Mt=>ht.push({mesh:Mt,kind:"balloon",tip:"Les ballons s'envolent vers le ciel !"})),r.add(pt)}const at=(C,D)=>.5*(Lt[C]+Lt[D]);for(const C of[.22,.58,.86]){const D=x.getPointAt(C),P=x.getTangentAt(C),B=new b(-P.z,0,P.x).normalize(),H=Math.random()>.5?1:-1,K=D.clone().add(B.clone().multiplyScalar(H*2.9)),it=new b().subVectors(D,K).normalize(),pt=v_(K,Math.atan2(it.x,it.z));r.add(pt),le.push({g:pt,phase:Math.random()*10})}const Rt=e?4:8;for(let C=0;C<Rt;C++){const D=.05+C/Rt*.9,P=x.getPointAt(D),B=x.getTangentAt(D),H=new b(-B.z,0,B.x).normalize(),K=C%2===0?1:-1;r.add(__(P.clone().add(H.clone().multiplyScalar(K*2.6))))}const At=e?1:3;for(let C=0;C<At;C++){const D=.14+C/At*.6,P=x.getPointAt(D),B=x.getTangentAt(D),H=new b(-B.z,0,B.x).normalize(),K=C%2===0?1:-1;r.add(M_(P.clone().add(H.clone().multiplyScalar(K*2.85))))}const Qt=e?1:2;for(let C=0;C<Qt;C++){const D=.24+C*.3,P=x.getPointAt(D),B=x.getTangentAt(D),H=new b(-B.z,0,B.x).normalize(),K=C%2===0?-1:1;r.add(y_(P.clone().add(H.clone().multiplyScalar(K*2.95))))}(e?[.32,.74]:[.08,.32,.55,.78]).forEach((C,D)=>{const P=x.getPointAt(C),B=x.getTangentAt(C),H=new b(-B.z,0,B.x).normalize(),K=D%2===0?1:-1,it=P.clone().add(H.clone().multiplyScalar(K*6.9)),pt=D%2===0?["ESPACE","PUBLICITAIRE"]:["MOBILIER","URBAIN"],Mt=x_(it,Math.atan2(H.x,H.z)+(K>0?0:Math.PI),pt);ht.push({mesh:Mt.userData.front,kind:"sucette",tip:"Sucette d'affichage — un petit format encadré par la réglementation."}),N.push(Mt),r.add(Mt),r.add(ni(it,1.6,2.2))}),(e?[at(1,2),at(8,9)]:[at(1,2),at(3,4),at(6,7),at(9,10)]).forEach((C,D)=>{const P=x.getPointAt(C),B=x.getTangentAt(C),H=new b(-B.z,0,B.x).normalize(),K=D%2===0?1:-1,it=P.clone().add(H.clone().multiplyScalar(K*4.55)),pt=S_(it,.9+D%3*.15);mt.push({g:pt,phase:Math.random()*Math.PI*2}),r.add(pt)});const ve=e?3:9;for(let C=0;C<ve;C++){const D=s(C,ve,.2);if(Lt.some(Mt=>Math.abs(Mt-D)<.02))continue;const P=x.getPointAt(D),B=x.getTangentAt(D),H=new b(-B.z,0,B.x).normalize(),K=C%2===0?1:-1,it=P.clone().add(H.clone().multiplyScalar(K*5)),pt=Math.atan2(H.x,H.z)+(K>0?Math.PI:0);r.add(Xv(it,pt,C*5))}for(const C of[.34,.62]){const D=x.getPointAt(C),P=x.getTangentAt(C),B=new b(-P.z,0,P.x).normalize(),H=C<.5?-1:1,K=D.clone().add(B.clone().multiplyScalar(H*8.2)),it=Math.atan2(B.x,B.z)+(H>0?Math.PI:0);r.add($v(K,it)),r.add(ni(K,1.4,1.4))}(e?[at(7,8)]:[at(1,2),at(3,4),at(5,6),at(7,8),at(9,10),at(11,12)]).forEach((C,D)=>{const P=x.getPointAt(C),B=x.getTangentAt(C),H=new b(-B.z,0,B.x).normalize(),K=D%2===0?1:-1,it=Ir();it.cone.material.opacity=0,it.group.position.set(P.x+H.x*K*1.7,0,P.z+H.z*K*1.7),it.group.rotation.y=Math.atan2(B.x,B.z),r.add(it.group)});for(const C of[.13,.45,.75]){const D=x.getPointAt(C),P=x.getTangentAt(C),B=new b(-P.z,0,P.x).normalize(),H=D.clone().add(B.clone().multiplyScalar(4.9)),K=D.clone().add(B.clone().multiplyScalar(-4.9));r.add(Su(H)),r.add(Su(K)),H.y=6.35,K.y=6.35,r.add(wu(H,K,.55)),r.add(wu(H.clone().add(new b(.14,-.22,0)),K.clone().add(new b(-.14,-.22,0)),.45))}for(const[C,D,P]of[[.1,.6,0],[.33,-.6,0],[.49,.6,1],[.65,-.6,0],[.8,.6,1],[.93,-.6,0]]){const B=x.getPointAt(C),H=x.getTangentAt(C),K=new b(-H.z,0,H.x).normalize();r.add(xu(B.clone().add(K.clone().multiplyScalar(D)),P,Math.atan2(H.x,H.z)))}for(const C of[.31,.71]){const D=x.getPointAt(C),P=x.getTangentAt(C),B=new b(-P.z,0,P.x).normalize(),H=Math.random()>.5?1:-1;r.add(xu(D.clone().add(B.clone().multiplyScalar(H*3.1)),1,Math.atan2(P.x,P.z)))}{const D=x.getPointAt(.24),P=x.getTangentAt(.24),B=new b(-P.z,0,P.x).normalize();[1.6,2,-1.6].forEach((H,K)=>{const it=D.clone().add(B.clone().multiplyScalar(H)).add(P.clone().multiplyScalar(K===2?-.5:.6));r.add(E_(it))})}{const D=x.getPointAt(.82),P=x.getTangentAt(.82),B=new b(-P.z,0,P.x).normalize(),H=D.clone().add(B.clone().multiplyScalar(11.6)),K=yu(H,Math.atan2(-B.x,-B.z),9415293);Ie.push(K),ht.push({mesh:K.userData.sign,kind:"stall",tip:"Étal de marché — un commerce de proximité sur la place."}),r.add(K),r.add(ni(H,2.6,1.4)),r.add(Ns(H.clone().add(new b(1,0,1)),.8,2)),r.add(Ns(H.clone().add(new b(-.9,0,-1.1)),2.4,1)),r.add(Ns(H.clone().add(new b(.4,0,-1.6)),4.2,0))}const In=[],io=e?10:20,Fo=e?1:3;for(let C=0;C<io;C++){const D=C<Fo,P=a_();D&&P.g.scale.setScalar(.72);const B=Math.random()>.5?1:-1,H=Math.random()>.5?1:-1;In.push({g:P.g,legL:P.legL,legR:P.legR,kneeL:P.kneeL,kneeR:P.kneeR,armL:P.armL,armR:P.armR,elbowL:P.elbowL,elbowR:P.elbowR,lean:P.lean,t:s(C,io,.35),speed:(D?.009:.004+Math.random()*.005)*B,side:H,off:3+Math.random()*.9,phase:P.phase,step:0}),r.add(P.g)}for(let C=0;C<(e?1:3);C++){const D=m_(),P=Math.random()>.5?1:-1,B=Math.random()>.5?1:-1;It.push({g:D,t:s(C,e?1:3,.3),speed:(.006+Math.random()*.004)*P,side:B,off:3.4+Math.random()*.9,phase:Math.random()*Math.PI*2,step:0}),r.add(D)}for(let C=0;C<i(38);C++){const D=s(C,i(38),.4),P=x.getPointAt(D),B=x.getTangentAt(D),H=new b(-B.z,0,B.x).normalize(),K=Math.random()>.5?1:-1,it=P.clone().add(H.clone().multiplyScalar(K*(9+Math.random()*22)));Math.random()<.5?r.add(Fv(it,1+Math.random()*2.4)):r.add(Ov(it,.3+Math.random()*.9))}const Jn=[];for(let C=0;C<i(30);C++){const D=s(C,i(30),.35),P=x.getPointAt(D),B=x.getTangentAt(D),H=new b(-B.z,0,B.x).normalize(),K=Math.random()>.5?1:-1,it=P.clone().add(H.clone().multiplyScalar(K*(9+Math.random()*8))),pt=Sd(it,.8+Math.random()*.8);Jn.push({g:pt,phase:Math.random()*Math.PI*2}),r.add(pt)}for(let C=0;C<i(66);C++){let D=s(C,i(66),.3);for(let pt=0;pt<8&&Lt.some(Mt=>Math.abs(Mt-D)<.012);pt++)D=s(C,i(66),.3);const P=x.getPointAt(D),B=x.getTangentAt(D),H=new b(-B.z,0,B.x).normalize(),K=Math.random()>.5?1:-1,it=P.clone().add(H.clone().multiplyScalar(K*(5.8+Math.random()*3.4)));if(ut(it,.5+Math.random()*.8),Math.random()<.35){const pt=P.clone().add(H.clone().multiplyScalar(K*(6.2+Math.random()*1.6)));dt(pt,.7+Math.random()*.5,C*7%9)}}const fs=[];for(let C=0;C<i(17);C++){const D=Hv(new b((Math.random()-.5)*130,30+Math.random()*20,Math.random()*440),1.4+Math.random()*2.6);fs.push({g:D,speed:.5+Math.random()*.8,phase:Math.random()*Math.PI*2,y0:D.position.y,s0:D.scale.x}),r.add(D)}[{t:.12,side:1,lines:["Audit","d'abord"],tip:"Toute réorganisation commence par l'audit des acteurs du secteur."},{t:.5,side:-1,lines:["Zonage"],tip:"Le zonage délimite les espaces publicitaires selon des normes."},{t:.88,side:1,lines:["Mise à jour","continue"],tip:"Un secteur en phase avec l'urbanisation se pérennise."}].forEach(C=>{const D=x.getPointAt(C.t),P=x.getTangentAt(C.t),B=new b(-P.z,0,P.x).normalize(),H=D.clone().add(B.clone().multiplyScalar(C.side*5.5)),K=new b().subVectors(D,H).normalize(),it=Vv(H,Math.atan2(K.x,K.z),C.lines);ht.push({mesh:it.sign,kind:"sign",tip:C.tip}),r.add(it.group)});const Ai=Bv(e?180:420);r.add(Ai);const ps=Math.random()*Math.PI*2,so=e?60:130,ci=new Float32Array(so*3);for(let C=0;C<so;C++){const D=Math.random(),P=x.getPointAt(D),B=x.getTangentAt(D),H=new b(-B.z,0,B.x).normalize(),K=Math.random()>.5?1:-1,it=2.6+Math.random()*8;ci[C*3]=P.x+H.x*K*it,ci[C*3+1]=.35+Math.random()*2.6,ci[C*3+2]=P.z+H.z*K*it}const oo=new Le;oo.setAttribute("position",new Ve(ci,3));const ro=new js({color:16180136,size:cs()?.1:.13,transparent:!0,opacity:0,blending:Xe,depthWrite:!1,sizeAttenuation:!0}),ms=new Lo(oo,ro);r.add(ms);const Oo=[];for(let C=0;C<i(30);C++){const D=d_(),P=s(C,i(30),.4),B=x.getPointAt(P),H=x.getTangentAt(P),K=new b(-H.z,0,H.x).normalize(),it=Math.random()>.5?1:-1,pt=B.x+K.x*it*(2+Math.random()*7),Mt=.4+Math.random()*4,he=B.z+K.z*it*(2+Math.random()*7);D.position.set(pt,Mt,he),Oo.push({g:D,x:pt,y:Mt,z:he,vx:(Math.random()-.5)*2.2,vz:-(.8+Math.random()*1.4),vy:-(.3+Math.random()*.4),spin:(Math.random()-.5)*4,phase:Math.random()*Math.PI*2}),r.add(D)}const Bo=[];for(let C=0;C<i(9);C++){const D=kv();D.g.position.set(-60+Math.random()*120,9+Math.random()*8,40+Math.random()*120),Bo.push({g:D.g,l:D.l,r:D.r,phase:Math.random()*Math.PI*2,speed:4+Math.random()*3,y0:D.g.position.y,z0:D.g.position.z}),r.add(D.g)}const A=[];for(let C=0;C<i(7);C++){const D=Ir();A.push({g:D.group,cone:D.cone,body:D.body,beamY:.55,t:C/7,speed:.02+Math.random()*.014,phase:Math.random()*Math.PI*2}),r.add(D.group)}const W=[];for(let C=0;C<(e?1:2);C++){const D=p_();W.push({g:D.group,cone:D.cone,body:D.body,beamY:1.05,t:.2+C*.5,speed:.014+Math.random()*.004,phase:Math.random()*Math.PI*2}),r.add(D.group)}const tt=A.concat(W);for(const C of tt){const D=new ln(1.15,5.4,14,1,!0),P=new Be({color:16773320,transparent:!0,opacity:0,blending:Xe,depthWrite:!1,side:Ge});C.beam=new R(D,P),C.beam.rotation.x=-Math.PI/2,C.beam.position.set(0,C.beamY,3.6),C.g.add(C.beam),C.flash=0}tt.forEach((C,D)=>ht.push({mesh:C.body,kind:"car",index:D}));const nt=[];{const C=e?18:38,D=new se(.17,20,16),P=On(0,"rgba(255,216,150,0.9)");for(let B=0;B<C;B++){const H=.03+Math.random()*.94,K=x.getPointAt(H),it=x.getTangentAt(H),pt=new b(-it.z,0,it.x).normalize(),Mt=Math.random()>.5?1:-1,he=new b(K.x+pt.x*Mt*(3.4+Math.random()*4.8),1.6+Math.random()*2.2,K.z+pt.z*Mt*(3.4+Math.random()*4.8)),ke=new Be({color:16767392,transparent:!0,opacity:.85,blending:Xe,depthWrite:!1}),wn=new Yn({map:P,transparent:!0,opacity:.7,blending:Xe,depthWrite:!1,depthTest:!1}),We=new R(D,ke),He=new ri(wn);He.scale.setScalar(1.25);const bn=new yt;bn.add(We,He),bn.position.copy(he),r.add(bn),nt.push({g:bn,mesh:We,halo:He,mat:ke,haloMat:wn,base:he.clone(),i:B,phase:Math.random()*Math.PI*2,scale:.8+Math.random()*.5,state:0,timer:0}),ht.push({mesh:He,kind:"bille",index:B,tip:"Bille d'or — l'étincelle du domaine public."})}}const q=new b,vt=new b,Ct=new b,Bt=new b,Ot=new b;let jt=performance.now()*.001,Ht=null,Nt=null,ce=1/0,Se=0,we=.005,on=null;function _e(C){Ht=C&&C.kind?C:null}function Wt(C){if(!(!C||!C.kind)){if(C.kind==="pigeon"){const D=qt[C.index];D&&D.state===0&&(D.state=1,D.timer=0)}else if(C.kind==="balloon")for(const D of Vt)D.state===0&&(D.state=1,D.timer=0);else if(C.kind==="fountain"){const D=Y[C.index];D&&(D.splash=1)}else if(C.kind==="car"){const D=tt[C.index];D&&(D.flash=1)}else if(C.kind==="bille"){const D=nt[C.index];D&&D.state===0&&(D.state=1,D.timer=0)}}}function Bn(C,D){const P=performance.now()*.001,B=Math.min(.05,Math.max(.001,P-jt));jt=P;const H=.005+C*.98;we+=(H-we)*Math.min(1,B*5);const K=we,it=p();g(it);const pt=Math.min(1,B*1.6);v.top.lerp(m.top,pt),v.mid.lerp(m.mid,pt),v.hor.lerp(m.hor,pt),v.amb.lerp(m.amb,pt),v.hs.lerp(m.hs,pt),v.hg.lerp(m.hg,pt),v.sun.lerp(m.sun,pt),v.fog.lerp(m.fog,pt),v.night+=(m.night-v.night)*pt,v.warm+=(m.warm-v.warm)*pt,v.sunI+=(m.sunI-v.sunI)*pt,v.exp+=(m.exp-v.exp)*pt;const Mt=v.night;f.uniforms.night.value=Mt,f.uniforms.warm.value=v.warm,f.uniforms.top.value.copy(v.top),f.uniforms.mid.value.copy(v.mid),f.uniforms.horizon.value.copy(v.hor),f.uniforms.sunColor.value.copy(v.sun);const he=(it-6.2)/13.8*Math.PI,ke=Math.max(0,Math.sin(he));T.set(Math.sin(he)*.55,ke*.95+.08,-Math.cos(he)*.55),Q.lerp(T,pt).normalize(),f.uniforms.sunDir.value.copy(Q),o.toneMappingExposure=en.lerp(o.toneMappingExposure,v.exp,Math.min(1,B*2)),J.color.copy(v.amb),J.intensity=.75*(1-Mt)+.45*Mt,rt.color.copy(v.hs),rt.groundColor.copy(v.hg),rt.intensity=.5*(1-Mt)+.45*Mt,j.color.copy(v.sun),j.intensity=2.2*v.sunI*(1-Mt)+.3*Mt,Mt<.5!==j.castShadow&&(j.castShadow=Mt<.5),r.fog.color.copy(v.fog),S.position.copy(Q).multiplyScalar(560),S.scale.setScalar(26+ke*26),w.position.copy(Q).multiplyScalar(-560),S.material.opacity=(1-Mt)*(.35+ke*.65),w.material.opacity=Mt;const wn=x.getPointAt(K),We=x.getTangentAt(K),He=x.getPointAt(Math.min(K+.045,.999));Bt.set(-We.z,0,We.x).normalize();const bn=Math.sin(P*.7)*.07,kn=Math.sin(P*.25)*.18,ko=e?4.15:3.45,Cd=e?3:2.7;q.set(wn.x+Bt.x*kn,wn.y+ko+bn,wn.z+Bt.z*kn),vt.set(He.x,He.y+Cd,He.z);let Go=null;{let _=0,St=1/0,$t=!1;const Dt=K+.03;for(let un=0;un<Pt;un++){const En=.02+(un+.5)/Pt*.94;if(En<K+.006)continue;const Un=Math.abs(En-Dt);Un<St&&(St=Un,_=un,$t=!0)}const Me=gt[_].group.position,De=Me.x-a.position.x,fe=Me.z-a.position.z,Gn=$t&&De*We.x+fe*We.z>0,cn=Math.hypot(De,fe);if(Gn&&cn<55){const un=en.clamp((55-cn)/14,0,1),En=e?6.5:5,Un=en.clamp((cn-En)/6,0,1),ei=un*Un;ei>0&&(Ct.set(Me.x,Me.y+2.8,Me.z),vt.lerp(Ct,ei*(e?.9:.5)),Go={index:_,dist:cn,sw:ei})}}on=Go,a.up.set(0,1,0),a.lookAt(vt);const Ql=Math.atan2(We.x,We.z),Rd=Ql-Se;Se=Ql;const Pd=en.clamp(Rd/Math.max(B,.001)*.09,-.08,.08);a.rotation.z=en.lerp(a.rotation.z,Pd,.06);const tc=55,Ld=15.2;Ot.addScaledVector(q,tc*B),Ot.addScaledVector(a.position,-tc*B),Ot.multiplyScalar(Math.max(0,1-Ld*B)),a.position.addScaledVector(Ot,B),Z.geometry.setDrawRange(0,Math.floor(et*C)),gt.forEach((_,St)=>{const $t=St===D,Dt=Ht&&Ht.kind==="panel"&&Ht.index===St,Me=Math.abs(C-(.02+(St+.5)/Pt*.94))<.06,De=1+Math.sin(P*1.15+St*1.9)*.012,fe=en.clamp(window.innerWidth/window.innerHeight/(16/9),.82,1.18),Gn=e?1.28:1,cn=$t||Go&&Go.index===St,un=De*(cn?1.04*fe*Gn:Dt?1.08*fe:.82),En=Dt?.18:$t?.12:Me?.04:0,Un=Dt?.12:.08;_.group.scale.setScalar(en.lerp(_.group.scale.x,un,Un)),_.light&&(_.light.intensity=en.lerp(_.light.intensity,En+Mt*.9,Un)),_.group.position.y=en.lerp(_.group.position.y,$t?.22:0,.06),_.beaconMat.emissiveIntensity=(.22+Math.sin(P*2.4+St)*.1)*(1-Mt)+(1.3+Math.sin(P*2.4+St)*.3)*Mt;const ei=Mt>.45;if(ei!==_.nightMode){_.nightMode=ei;const ec=ei?_.nightTex:_.dayTex;_.frontMat.map=ec,_.frontMat.emissiveMap=ec,_.frontMat.needsUpdate=!0}_.frontMat.emissiveIntensity=en.lerp(_.frontMat.emissiveIntensity,_.nightMode?Mt*(.8+($t?.12:Dt?.16:Me?.06:0)):0,.1),_.frameMat.emissiveIntensity=en.lerp(_.frameMat.emissiveIntensity,Mt*.3,.05);const Wr=a.position.x-_.group.position.x,qr=a.position.z-_.group.position.z,Dd=Math.hypot(Wr,qr),Xr=Wr*We.x+qr*We.z<0,Ud=en.clamp(1-Dd/32,0,1)*(Xr?1:0),Nd=Xr?Math.atan2(Wr,qr):_.restRot,zd=Xr?Ud*.14:.02;_.group.rotation.y=en.lerp(_.group.rotation.y,Nd,zd)}),tt.forEach((_,St)=>{_.t=(_.t+_.speed*B)%1;const $t=x.getPointAt(_.t),Dt=x.getTangentAt(_.t);_.g.position.set($t.x,.06+Math.sin(P*3+_.t*44)*.02,$t.z),_.g.rotation.y=Math.atan2(Dt.x,Dt.z),_.cone.material.opacity=.45+Math.sin(P*11+_.phase)*.15;const Me=Ht&&Ht.kind==="car"&&Ht.index===St;_.flash=Math.max(0,_.flash-B*1.4);const De=Me?.24+.4*Mt+_.flash*.5:_.flash*.5;_.beam.material.opacity=en.lerp(_.beam.material.opacity,De,.09);const fe=1+(Me?.18:0)+_.flash*.25;_.beam.scale.set(fe,fe,fe)});for(const _ of Jn)_.g.rotation.z=Math.sin(P*.9+_.phase)*.05,_.g.rotation.y+=3e-4;for(const _ of mt){const St=.5+.5*Math.sin(P*.31+_.phase*1.7);_.g.rotation.z=Math.sin(P*.6+_.phase)*.026+Math.sin(P*1.9+_.phase*2.3)*.018*St,_.g.rotation.x=Math.sin(P*.83+_.phase*.7)*.016,_.g.rotation.y=Math.sin(P*.47+_.phase)*.024}for(const _ of qt){Ht&&Ht.kind==="pigeon"&&Ht.index===_.idx&&_.state===0&&(_.state=1,_.timer=0);const $t=Math.sin(P*26+_.phase);if(_.state===1){_.timer+=B;const Dt=Math.min(1,_.timer/1.1);_.g.position.y=Dt*2.4,_.g.position.x=_.x0+_.fx*Dt*5.5+Math.sin(P*3)*.06,_.g.position.z=_.z0+_.fz*Dt*5.5,_.g.rotation.z=(1-Dt)*Math.sin(P*2.2+_.phase)*.08-Dt*.22,_.g.rotation.x=-Dt*.45,_.g.scale.y=1+Math.abs($t)*.24,_.g.scale.x=1-Math.abs($t)*.13,Dt>=1&&(_.state=2,_.timer=0)}else if(_.state===2)_.timer+=B,_.g.position.y=2.4+Math.sin(P*2)*.15,_.g.position.x=_.x0+_.fx*5.5,_.g.position.z=_.z0+_.fz*5.5,_.timer>2.6&&(_.state=3,_.timer=0);else if(_.state===3){_.timer+=B;const Dt=Math.min(1,_.timer/1.4);_.g.position.y=2.4*(1-Dt),_.g.position.x=_.x0+_.fx*5.5*(1-Dt),_.g.position.z=_.z0+_.fz*5.5*(1-Dt),_.g.rotation.z=Dt*Math.sin(P*2.2+_.phase)*.08,_.g.rotation.x=0,_.g.scale.set(1,1,1),Dt>=1&&(_.state=0,_.timer=0)}else{const Dt=Math.abs(Math.sin(P*2.2+_.phase))*.05;_.g.position.y=Dt,_.g.rotation.z=Math.sin(P*2.2+_.phase)*.08,_.g.position.x=_.x0+Math.sin(P*.35+_.phase)*.4,_.g.position.z=_.z0+Math.cos(P*.3+_.phase)*.3}}for(const _ of In){_.t=(_.t+_.speed*B)%1,_.t<0&&(_.t+=1);const St=x.getPointAt(_.t),$t=x.getTangentAt(_.t),Dt=new b(-$t.z,0,$t.x).normalize();_.g.position.set(St.x+Dt.x*_.side*_.off,0,St.z+Dt.z*_.side*_.off),_.g.rotation.y=Math.atan2($t.x,$t.z)+(_.side>0?0:Math.PI),_.step+=B*(6+Math.abs(_.speed)*90);const Me=Math.sin(_.step)*.5;_.legL.rotation.x=Me,_.legR.rotation.x=-Me,_.kneeL.rotation.x=Math.max(0,-Me)*.95,_.kneeR.rotation.x=Math.max(0,Me)*.95,_.armL.rotation.x=-Me*.8,_.armR.rotation.x=Me*.8,_.elbowL.rotation.x=Math.max(0,Me)*.9,_.elbowR.rotation.x=Math.max(0,-Me)*.9,_.lean.rotation.z=Math.sin(_.step)*.025,_.lean.rotation.x=.045+Math.abs(Math.sin(_.step))*.025,_.g.position.y=Math.abs(Math.sin(_.step))*.04}for(const _ of oe){const St=.9+Math.sin(P*9+_.i*1.7)*.09;_.glow.material.opacity=(.08*(1-Mt)+.85*Mt)*St,_.pool.material.opacity=(.1*(1-Mt)+.55*Mt)*St}if(Nt){const _=(P-Nt.t0)/1.05;Nt.sp.position.lerpVectors(Nt.from,Nt.to,Math.min(1,_)),Nt.sp.material.opacity=Math.sin(Math.min(1,_)*Math.PI),_>=1&&(r.remove(Nt.sp),Nt.sp.material.dispose(),Nt=null,ce=8+Math.random()*10)}else if(ce-=B,ce<=0){const _=new ri(new Yn({map:On(0,"rgba(255,242,214,1)"),transparent:!0,blending:Xe,depthWrite:!1,opacity:0}));_.scale.setScalar(2.4);const St=new b(120+Math.random()*60,92+Math.random()*36,-330-Math.random()*130);_.position.copy(St),r.add(_),Nt={sp:_,t0:P,from:St,to:St.clone().add(new b(-78,-30,16))}}for(const _ of le){const St=(P+_.phase)%12/12,$t=St<.4,Dt=St>=.4&&St<.78,Me=St>=.78,[De,fe,Gn]=_.g.userData.bulbs,[cn,un]=_.g.userData.peds,En=(Un,ei)=>Un?ei+Mt*.6:ei*.12;De.material.emissiveIntensity=En($t,1),fe.material.emissiveIntensity=En(Me,.95),Gn.material.emissiveIntensity=En(Dt,.9),cn.material.emissiveIntensity=Dt?.75+Mt*.4:.08,un.material.emissiveIntensity=Dt?.08:.75+Mt*.4}for(const _ of Bo){_.g.position.x+=_.speed*.02*(.75+.25*Math.sin(P*.8+_.phase)),_.g.position.y=_.y0+Math.sin(P*1.3+_.phase)*.8+Math.sin(P*.4+_.phase*2)*.35,_.g.position.z=_.z0+Math.sin(P*.6+_.phase)*3.5;const St=Math.cos(P*.6+_.phase)*.6,$t=Math.cos(P*1.3+_.phase)*.4,Dt=Math.sin(P*(9+Math.abs(Math.sin(P*.8+_.phase))*3)+_.phase)*.75;_.l.rotation.z=Dt,_.r.rotation.z=-Dt,_.g.rotation.z=.25+Math.sin(P*1.3+_.phase)*.12+Math.cos(P*.6+_.phase)*.08+St*.22,_.g.rotation.x=-$t*.3-Math.cos(P*1.3+_.phase)*.08,_.g.rotation.y=-St*.35,_.g.position.x>80&&(_.g.position.x=-80,_.y0=8+Math.random()*9,_.z0=30+Math.random()*90,_.g.position.z=_.z0,_.g.position.y=_.y0)}Ai.rotation.y=P*.05,Ai.material.opacity=(.5+Math.sin(P*3)*.12)*(1-Mt*.7),Ai.position.x=Math.sin(P*.12)*2.4,Ai.position.z=Math.cos(P*.09)*1.6;const Id=.35+Math.sin(P*2.1+ps)*.15;ro.opacity=Mt*Id,ms.position.x=Math.sin(P*.08)*1.8,ms.position.z=Math.cos(P*.06)*1.2,ms.rotation.y=P*.02;for(const _ of fs){_.g.position.x+=_.speed*.02,_.g.position.y=_.y0+Math.sin(P*.22+_.phase)*.7;const St=1+Math.sin(P*.3+_.phase)*.05;_.g.scale.set(_.s0*St,_.s0*St,_.s0*St),_.g.position.x>150&&(_.g.position.x=-150)}for(const _ of Y){_.splash=Math.max(0,_.splash-B*1.2);const St=Ht&&Ht.kind==="fountain",$t=1+_.splash*.9+(St?.5:0),Dt=(Math.sin(P*2.6+_.phase)*.5+1)*$t;_.g.userData.jet.scale.set(1,.7+.3*Dt,1),_.g.userData.jet.rotation.z=Math.sin(P*3.1)*.06*$t,_.g.userData.jet.rotation.x=Math.cos(P*2.7)*.05*$t,_.g.userData.pool.rotation.z=P*.25;const Me=(1+Math.sin(P*1.8+_.phase)*.03)*(1+_.splash*.12);if(_.g.userData.pool.scale.set(Me,Me,Me),_.g.userData.dish.rotation.z=Math.sin(P*1.4)*.03,_.drops){const De=_.drops.geometry.attributes.position;for(let fe=0;fe<_.nDrops;fe++){let Gn=_.life[fe];if(Gn-=B*(2.2+_.splash*2.4),Gn<0){_.life[fe]=1;const cn=Math.random()*Math.PI*2,un=.12+Math.random()*.3;_.vx[fe]=Math.cos(cn)*un,_.vz[fe]=Math.sin(cn)*un,_.vy[fe]=.55+Math.random()*.4*$t,De.array[fe*3]=Math.cos(cn)*.3,De.array[fe*3+1]=1.25,De.array[fe*3+2]=Math.sin(cn)*.3}else _.vy[fe]-=1.5*B,De.array[fe*3]+=_.vx[fe]*B,De.array[fe*3+1]+=_.vy[fe]*B,De.array[fe*3+2]+=_.vz[fe]*B,De.array[fe*3+1]<.35&&(_.life[fe]=0,De.array[fe*3+1]=.35)}De.needsUpdate=!0,_.drops.material.opacity=(.55+.3*Dt)*(.35+.65*(1-Mt))}}for(const _ of Ut)_.g.userData.parasol.rotation.z=Math.sin(P*.9+_.phase)*.06,_.g.userData.parasol.rotation.x=Math.sin(P*.7+_.phase*1.3)*.05;for(const _ of X){const St=_.water.material;St.roughness=.08+(Math.sin(P*1.1)*.5+.5)*.05,_.water.rotation.z=Math.sin(P*.3)*.01}for(const _ of mn){_.a+=_.sp*B;const St=_.g.userData.ox??(_.g.userData.ox=_.g.position.x),$t=_.g.userData.oz??(_.g.userData.oz=_.g.position.z);_.g.position.x=St+Math.cos(_.a)*_.r,_.g.position.z=$t+Math.sin(_.a)*_.r,_.g.rotation.y=-_.a+Math.PI/2,_.g.position.y=.1+Math.sin(P*2.2+_.ph)*.02,_.head.rotation.z=Math.sin(P*3.1+_.ph)*.14,_.tail.rotation.z=Math.sin(P*2.6+_.ph)*.1}for(const _ of ae){const St=Math.sin(P*24+_.ph);_.lw.rotation.z=-.55+St*.85,_.rw.rotation.z=.55-St*.85,_.g.position.x=_.base.x+Math.sin(P*.9+_.ph)*_.amp,_.g.position.z=_.base.z+Math.cos(P*1.3+_.ph*1.7)*_.amp*.7,_.g.position.y=_.base.y+Math.sin(P*2.4+_.ph*2)*.5,_.g.rotation.y=Math.sin(P*1.1+_.ph)*.9}for(const _ of L){const St=_.g.userData.flag;St.rotation.z=Math.sin(P*2.4+_.phase)*.28,St.position.y=2.42+Math.sin(P*2.4+_.phase)*.04,_.g.userData.sign.material.emissiveIntensity=Mt*.75}for(let _=0;_<Zt.length;_++)Zt[_].material.emissiveIntensity=Mt*(.8+Math.sin(P*1.6+_*1.7)*.18);const gs=Mt*.4;for(const _ of ge){_.userData.window.material.emissiveIntensity=gs;const St=_.position.x*1.7+_.position.z*3.1;_.userData.awning.rotation.z=Math.sin(P*.55+St)*.03,_.userData.awning.rotation.x=Math.sin(P*.4+St*1.3)*.025}for(const _ of re)_.userData.face.material.emissiveIntensity=gs;for(const _ of Ie){_.userData.sign.material.emissiveIntensity=gs;const St=_.position.x*1.9+_.position.z*2.7;_.userData.awning.rotation.z=Math.sin(P*.6+St)*.035,_.userData.awning.rotation.x=Math.sin(P*.45+St*1.2)*.028}for(const _ of Te)_.userData.poster.material.emissiveIntensity=gs;for(const _ of N)_.userData.front.material.emissiveIntensity=gs;for(const _ of Yt)_.userData.poster.material.emissiveIntensity=gs;for(const _ of ct)_.g.rotation.z=Math.sin(P*.7+_.phase)*.05;for(const _ of It){_.t=(_.t+_.speed*B)%1,_.t<0&&(_.t+=1);const St=x.getPointAt(_.t),$t=x.getTangentAt(_.t),Dt=new b(-$t.z,0,$t.x).normalize();_.g.position.set(St.x+Dt.x*_.side*_.off,Math.abs(Math.sin(_.step))*.03,St.z+Dt.z*_.side*_.off),_.g.rotation.y=Math.atan2($t.x,$t.z)+(_.side>0?0:Math.PI),_.step+=B*14,_.g.userData.tail.rotation.z=Math.sin(P*7+_.phase)*.55}for(const _ of Vt){const St=_.g.userData.balloons;if(_.state===1){_.timer+=B;const $t=Math.min(1,_.timer/2.2);for(let Dt=0;Dt<St.length;Dt++)St[Dt].position.y=1.2+$t*5.6+Math.sin(Dt*2.1)*.05,St[Dt].position.x=(Dt-1)*.22+Math.sin($t*6+Dt*2.3)*$t*.9;$t>=1&&(_.state=2,_.timer=0)}else if(_.state===2)_.timer+=B,_.timer>3.6&&(_.state=3,_.timer=0);else if(_.state===3){_.timer+=B;const $t=Math.min(1,_.timer/1.6);for(let Dt=0;Dt<St.length;Dt++)St[Dt].position.y=1.2+5.6-$t*5.6+Math.sin(Dt*2.1)*.05,St[Dt].position.x=(Dt-1)*.22;$t>=1&&(_.state=0,_.timer=0)}else{const $t=Ht&&Ht.kind==="balloon";for(let Dt=0;Dt<St.length;Dt++)St[Dt].position.y=1.2+Math.sin(Dt*2.1)*.05+Math.sin(P*($t?2.6:1.1)+_.phase+Dt*1.7)*($t?.22:.12),St[Dt].position.x=(Dt-1)*.22+Math.sin(P*.8+Dt*2.3)*.04}}for(const _ of O)_.g.rotation.z=Math.sin(P*.7+_.phase)*.03,_.g.rotation.x=Math.sin(P*.55+_.phase*1.2)*.02;for(const _ of st)_.g.rotation.z=Math.sin(P*.9+_.phase)*.06,_.g.rotation.x=Math.sin(P*1.1+_.phase*1.4)*.045;for(const _ of Xt)_.g.rotation.z=Math.sin(P*.8+_.phase)*.022,_.g.rotation.x=Math.sin(P*.6+_.phase*1.3)*.014;for(const _ of Oo)if(_.x+=(Math.sin(P*.5+_.phase)*.6+_.vx)*B,_.z+=_.vz*B,_.y+=_.vy*B,_.g.rotation.x+=_.spin*B,_.g.rotation.z+=_.spin*.6*B,_.g.position.set(_.x,_.y,_.z),_.y<.18){const St=Math.min(.97,Math.max(.02,K+(Math.random()-.35)*.12)),$t=x.getPointAt(St),Dt=x.getTangentAt(St),Me=new b(-Dt.z,0,Dt.x).normalize(),De=Math.random()>.5?1:-1;_.x=$t.x+Me.x*De*(2+Math.random()*7),_.z=$t.z+Me.z*De*(2+Math.random()*7),_.y=1.5+Math.random()*3,_.phase=Math.random()*Math.PI*2}for(const _ of nt){if(_.state===1){_.timer+=B;const De=Math.min(1,_.timer/.55),fe=_.scale*(1+De*2.4);if(_.g.scale.setScalar(fe),_.mat.opacity=.85*(1-De),_.haloMat.opacity=.7*(1-De),De>=1){const Gn=en.clamp(K+(Math.random()-.35)*.18,.02,.98),cn=x.getPointAt(Gn),un=x.getTangentAt(Gn),En=new b(-un.z,0,un.x).normalize(),Un=Math.random()>.5?1:-1;_.base.set(cn.x+En.x*Un*(3.4+Math.random()*4.8),1.6+Math.random()*2.2,cn.z+En.z*Un*(3.4+Math.random()*4.8)),_.g.position.copy(_.base),_.state=0,_.phase=Math.random()*Math.PI*2,_.mat.opacity=.85,_.haloMat.opacity=.7}continue}const St=Ht&&Ht.kind==="bille"&&Ht.index===_.i;_.g.position.x=_.base.x+Math.sin(P*.6+_.phase)*.5,_.g.position.z=_.base.z+Math.cos(P*.52+_.phase*1.3)*.5,_.g.position.y=_.base.y+Math.sin(P*.9+_.phase*2)*.38;const $t=.82+Math.sin(P*2.6+_.phase)*.18,Dt=_.scale*(St?2:1)*$t;_.g.scale.setScalar(Dt);const Me=(St?1:.5)*(.65+.35*(1-Mt));_.mat.opacity=Me,_.haloMat.opacity=Me*.85,_.halo.scale.setScalar((St?1.7:1.25)*$t)}}const me=new xv,xn=new Et;function Ci(C,D){xn.set(C,D),me.setFromCamera(xn,a);const P=me.intersectObjects(ht.map(H=>H.mesh),!1);if(!P.length)return null;const B=P[0];return B.distance>45?null:ht[ht.findIndex(H=>H.mesh===B.object)]}function gn(){const C=window.innerWidth,D=window.innerHeight;a.aspect=C/D,a.updateProjectionMatrix(),o.setSize(C,D),l&&(l.setSize(C,D),c&&c.setSize(Math.max(2,Math.floor(C/2)),Math.max(2,Math.floor(D/2))))}function Vi(C,D){const P=ht.find(H=>H.kind===C&&(D===void 0||H.index===D));if(!P)return null;const B=new b;if(P.mesh.getWorldPosition(B),B.distanceTo(a.position)>42)return null;if(C==="fountain"){const H=B.clone().sub(a.position).normalize();B.addScaledVector(H,1.25)}return B.project(a),B.z>1||B.z<-1?null:{x:B.x,y:B.y}}function Pe(){return{pigeons:qt.map(C=>C.state),balloons:Vt.map(C=>C.state),beams:tt.map(C=>Math.round(C.beam.material.opacity*100)/100),fountain:Y.map(C=>Math.round(C.splash*100)/100)}}function Dn(){return a.position.clone()}function Wi(C){const D=gt[C];if(!D)return null;const P=D.group.position.distanceTo(a.position);if(P<1)return null;const B=D.group.scale.x,H=a.fov*Math.PI/180,K=2*Math.atan(Math.tan(H/2)*(window.innerWidth/window.innerHeight)),it=4*B/(2*P*Math.tan(H/2))*window.innerHeight,pt=6.2*B/(2*P*Math.tan(K/2))*window.innerWidth;return{w:Math.round(pt),h:Math.round(it),d:Math.round(P)}}function Sn(){return on}function Qn(){return{trees:mt.length,hedges:Xt.length,bushes:O.length,flowers:st.length,buildings:Zt.length,lamps:oe.length,pigeons:qt.length}}function ti(){l?l.render():o.render(r,a)}return{render:ti,resize:gn,update:Bn,pick:Ci,interact:Wt,projectPickable:Vi,getReactiveState:Pe,getCameraPos:Dn,getFramedPanel:Sn,panelScreenSize:Wi,sceneCounts:Qn,setHover:_e,setTimeMode:C=>{d=C==="day"||C==="night"?C:"auto"},setHour:C=>{h=C},setNight:C=>{d=C?"night":"day"},getTimeInfo:()=>({hour:p(),mode:d,night:v.night}),getPanelCanvas:(C,D)=>{const P=gt[C];return P?(D?P.nightTex:P.dayTex).image:null}}}const Ca={module:"Module 1",title:"Formation sur la panneautique.",subtitle:"Domaine public :"},br=[{name:"Chapitre 1",label:"Introduction :"},{name:"Chapitre 2",label:"Réorganisation & Réaménagement du secteur :"},{name:"Chapitre 3",label:"Évaluation du système d'exploitation :"},{name:"Chapitre 4",label:"Mise à jour :"},{name:"Questionnaire",label:"Module 1 :"}],rn=[{id:"presentation",chapter:0,num:"01",kicker:"Chapitre 1 · Présentation :",title:"La panneautique, un véritable corps de métier.",bullets:["Ensemble des moyens et techniques d'installation et de gestion des panneaux publicitaires","Une étude pluridisciplinaire"],content:[{t:"Un métier à part entière :",b:"La panneautique, en tant qu'ensemble des moyens et techniques d'installation et de gestion des panneaux publicitaires, est un véritable corps de métier dont l'étude est pluridisciplinaire."},{t:"Ce que vous allez parcourir :",b:"De l'importance du panneau publicitaire au constat général dans le secteur, de la réorganisation complète (en sept étapes) du domaine d'activité aux techniques d'évaluation et de mise à jour de l'ensemble du processus ; le module 1 est conçu pour un embellissement durable du cadre de vie des populations, un rayonnement de l'économie grâce à l'exploitation du mobilier urbain de publicité et à la pérennité des acquis de développement dans ce corps de métier. Un questionnaire en douze points achève le module."}]},{id:"lecon1-importance",chapter:0,num:"02",kicker:"Chapitre 1 · Leçon 1 :",title:"Le panneau publicitaire et son importance socio-économique.",bullets:["Booste la concurrence entre les entreprises","Propulse l'économie : compétitivité des acteurs","Vecteur de publicité : stimule la consommation","Participe à l'embellissement des villes"],content:[{t:"Un moteur pour la concurrence :",b:"L'exploitation des panneaux publicitaires est une activité qui booste la concurrence entre les entreprises. Elle propulse l'économie grâce à l'accroissement et à l'amélioration de la compétitivité des différents acteurs de la vie économique d'un pays."},{t:"Le support de publicité par excellence :",b:"Vecteur de publicité, le panneau stimule et encourage la consommation. Lorsque l'activité est bien réglementée et bien encadrée, les normes d'exercice garantissent l'équité dans la gestion du secteur. On ne paie pas pour regarder un panneau : c'est le support publicitaire par excellence."},{t:"Une part du décor urbain :",b:"Par leurs aménagements, les panneaux publicitaires contribuent à l'embellissement des villes. Le choix des supports ne doit donc plus être motivé seulement par leur design, mais aussi par un besoin d'esthétique, pour un environnement et un cadre de vie plus agréables à la vue."}]},{id:"lecon2-constat",chapter:0,num:"03",kicker:"Chapitre 1 · Leçon 2 :",title:"Constat général.",bullets:["Pléthore de panneaux, parfois dans les capitales","Pollution visuelle, insalubrité, insécurité","Secteur mal organisé, ou pas encadré du tout","Supports délabrés, absence de normes"],content:[{t:"Des villes saturées :",b:"Dans beaucoup de villes à travers le monde — l'Afrique en est un bel exemple —, il est fréquent de constater, parfois dans des capitales, des cas de pléthore de panneaux publicitaires, cause de pollution visuelle, d'insalubrité et d'insécurité pour les personnes et les biens."},{t:"Une source : l'anarchie",b:"Un secteur d'exploitation mal organisé, mal encadré, ou pas encadré du tout, où règnent l'anarchie et le désordre, en est la source. L'état délabré et obsolète des supports, l'absence de normes et de réglementations rendent le secteur contre-productif et dégradent l'environnement."},{t:"Des mesures nécessaires :",b:"Il importe donc, pour le rayonnement du secteur et pour sa contribution effective au développement socio-économique des villes, que des mesures adéquates soient prises."}]},{id:"audit",chapter:1,num:"04",kicker:"Chapitre 2 · Étape 1 · Audit :",title:"Audit de la gestion en cours.",bullets:["Liste exhaustive de tous les acteurs du secteur","Examen du mécanisme d'attribution des supports","Examen du cahier des charges"],content:[{t:"Étape 3.1 :",b:"Pour que l'activité d'exploitation des panneaux publicitaires participe au rayonnement d'une ville (ou d'un pays), il faut faire un audit de la gestion en cours."},{t:"En quoi consiste-t-il ?",b:"En l'établissement de la liste exhaustive de tous les acteurs — entreprise ou personne exploitant des panneaux à des fins publicitaires — et en l'examen du mécanisme d'attribution des supports et du cahier des charges."}]},{id:"etat-lieux",chapter:1,num:"05",kicker:"Chapitre 2 · Étape 2 · État des lieux :",title:"État des lieux du parc existant.",bullets:["Relevé GPS détaillé et précis de tous les panneaux","Plan piqué géolocalisable des supports"],content:[{t:"Étape 3.2 :",b:"Faire le relevé (GPS) détaillé et précis de l'ensemble des panneaux publicitaires présents."},{t:"Un plan géolocalisable :",b:"Établir le plan piqué géolocalisable de ces supports : chaque panneau est localisé avec précision sur le territoire."}]},{id:"zonage",chapter:1,num:"06",kicker:"Chapitre 2 · Étape 3 · Zonage :",title:"Zonage.",bullets:["Délimitation selon des normes spécifiques du territoire","Des supports facteurs d'embellissement et de modernité","Paysage publicitaire harmonieux et équilibré","Grilles tarifaires adaptées aux réalités locales"],content:[{t:"Étape 3.3 :",b:"Pour un réaménagement optimal du plan d'implantation des panneaux publicitaires, il faut effectuer des délimitations suivant des normes spécifiques du territoire et proposer des supports facteurs d'embellissement et symboles de modernité."},{t:"Le but du zonage :",b:"Créer les conditions d'un développement harmonieux et équilibré du paysage de l'affichage publicitaire, ainsi que l'établissement de grilles tarifaires en adéquation avec les réalités économiques des villes. Il consiste donc à délimiter des espaces à cette fin."}]},{id:"constitution-lots",chapter:1,num:"07",kicker:"Chapitre 2 · Étape 4 · Constitution des lots :",title:"Constitution des lots.",bullets:["Le « Mobilier Urbain de Publicité » : des objets d'embellissement","Des lots pour les appels d'offres","Équilibre des espaces et des types de supports"],content:[{t:"Étape 4 :",b:"Le terme « Mobilier Urbain de Publicité » s'inscrit dans un contexte où les panneaux publicitaires ne sont plus seulement des supports publicitaires, mais de véritables objets (ou meubles) d'embellissement et de décoration des villes."},{t:"Vers les appels d'offres :",b:"Après études et validation des supports devant être pris en compte dans le cadre du réaménagement, on procède à la constitution des lots devant faire l'objet d'appels d'offres pour la mise en concession des différents espaces publicitaires."},{t:"Garantir un équilibre :",b:"La constitution des lots est faite de manière à garantir l'équilibre des espaces et celui en matière de type de support des différentes régies publicitaires."}]},{id:"mise-concession",chapter:1,num:"08",kicker:"Chapitre 2 · Étape 5 · Mise en concession :",title:"Mise en concession des espaces.",bullets:["Une technique variable selon les pays","Fonction des réalités économiques et législatives","À traiter au cas par cas"],content:[{t:"Étape 5 :",b:"La technique de mise en concession des espaces publicitaires est variable. Elle est fonction des réalités économiques, politico-administratives et de la législation en vigueur dans chaque pays."},{t:"À retenir :",b:"NB : il faut partir d'exemples précis et traiter le sujet au cas par cas."}]},{id:"attribution",chapter:1,num:"09",kicker:"Chapitre 2 · Étape 6 · Attribution :",title:"Attribution des espaces.",bullets:["Sur la base du cahier des charges","Contenu dans le dossier d'appel d'offres"],content:[{t:"Étape 6 :",b:"L'attribution des espaces aux régies publicitaires est faite sur la base du cahier des charges contenu dans le dossier d'appel d'offres."}]},{id:"gestion",chapter:1,num:"10",kicker:"Chapitre 2 · Étape 7 · Gestion :",title:"Gestion par les régies publicitaires.",bullets:["Collectivités locales ou Gouvernement","Selon les textes en vigueur dans chaque pays","Transparence, professionnalisme, efficience"],content:[{t:"Étape 7 :",b:"La gestion par les régies publicitaires est encadrée, dans certains pays, par les collectivités locales. Dans d'autres, elle est du ressort du Gouvernement par l'intermédiaire du Ministère de la Communication, etc."},{t:"L'essentiel :",b:"Plus généralement, c'est selon les textes et dispositions en vigueur dans chaque pays. L'essentiel est que la transparence, le professionnalisme et l'efficience soient rigoureusement observés."}]},{id:"evaluation",chapter:2,num:"11",kicker:"Chapitre 3 · Évaluation :",title:"Évaluer le système d'exploitation du Mobilier Urbain de Publicité.",bullets:["Évaluer tout le processus, de l'audit à la gestion","Un mécanisme scientifiquement soutenable et autonome","Prévenir les dérapages, sécuriser sur le long terme"],content:[{t:"Chapitre 3 :",b:"Pour garantir un développement harmonieux du secteur d'exploitation des panneaux publicitaires / Mobilier Urbain de Publicité, il faut prévoir, dans les réformes, un mécanisme d'évaluation de l'ensemble du processus, depuis l'audit jusqu'à la gestion par les régies publicitaires."},{t:"Un pilotage autonome :",b:"Le mécanisme d'évaluation doit être scientifiquement soutenable, avec une autonomie certaine dans son pilotage. L'évaluation permet de prévenir les risques de dérapage et de sécuriser les intérêts des différents acteurs du secteur et des populations, à travers leur cadre de vie, sur le long terme."}]},{id:"mise-a-jour",chapter:3,num:"12",kicker:"Chapitre 4 · Mise à jour :",title:"Pérenniser les acquis de développement du secteur.",bullets:["Pérenniser les acquis de développement","Le rayonnement des villes par les supports","Une évolution en phase avec l'urbanisation"],content:[{t:"Chapitre 4 :",b:"La mise à jour du secteur d'exploitation des panneaux publicitaires / Mobilier Urbain de Publicité est importante pour pérenniser les acquis de développement de l'activité."},{t:"Pourquoi ?",b:"Elle est importante pour le rayonnement des villes par l'exploitation des supports de publicité et favorisera l'essor de l'activité en adéquation avec l'urbanisation."},{t:"Concrètement :",b:"Elle consiste à s'assurer que le secteur, dans son évolution, soit en phase avec l'évolution démographique et le développement infrastructurel des villes."}]},{id:"quiz",chapter:4,num:"13",kicker:"Questionnaire · Module 1 :",title:"Douze questions pour valider le module.",bullets:["5 définitions","7 questions de compréhension","Testez vos acquis en fin de parcours"],content:[]}],Hs=[{q:"Que désigne la panneautique ?",options:["L'ensemble des moyens et techniques d'installation et de gestion des panneaux publicitaires","La seule vente d'espaces publicitaires","La fabrication du mobilier urbain","La régulation des réseaux sociaux"],correct:0,explain:"La panneautique est l'ensemble des moyens et techniques d'installation et de gestion des panneaux publicitaires — un corps de métier pluridisciplinaire."},{q:"Quel est le but du zonage ?",options:["Multiplier les panneaux pour maximiser les recettes","Créer les conditions d'un développement harmonieux et équilibré du paysage de l'affichage publicitaire","Supprimer toute publicité des villes","Uniformiser tous les panneaux du pays"],correct:1,explain:"Le zonage délimite des espaces pour un paysage publicitaire harmonieux et équilibré, et établit des grilles tarifaires adaptées aux réalités économiques."},{q:"Que désigne le « Mobilier Urbain de Publicité » ?",options:["Les panneaux posés sur le mobilier des cafés","La publicité diffusée à la télévision urbaine","Des panneaux devenus de véritables objets d'embellissement et de décoration des villes","Les panneaux strictement destinés à la location"],correct:2,explain:"Le Mobilier Urbain de Publicité : des panneaux qui ne sont plus de simples supports, mais de véritables meubles d'embellissement et de décoration des villes."},{q:"Qu'est-ce qu'une régie publicitaire ?",options:["L'organisme autorisé à gérer et exploiter des espaces publicitaires","L'autorité qui interdit la publicité","L'entreprise qui imprime les affiches","L'organisme de contrôle des réseaux sociaux"],correct:0,explain:"Les régies publicitaires sont les exploitants auxquels les espaces sont attribués sur la base du cahier des charges contenu dans le dossier d'appel d'offres."},{q:"Qu'est-ce que la pollution visuelle, dans le cadre de l'exploitation des panneaux ?",options:["Les panneaux trop colorés","La publicité lumineuse la nuit","Le bruit produit par les panneaux numériques","Une pléthore de panneaux mal organisés qui dégrade le cadre de vie"],correct:3,explain:"Une pléthore de panneaux issus d'un secteur mal organisé ou non encadré est cause de pollution visuelle, d'insalubrité et d'insécurité."},{q:"En quoi consiste une réorganisation du secteur d'exploitation des panneaux publicitaires ?",options:["À augmenter le nombre d'exploitants","À privatiser tous les supports","À remettre de l'ordre : audit, état des lieux, zonage, lots, concession, attribution, gestion","À supprimer le cahier des charges"],correct:2,explain:"La réorganisation suit sept étapes : audit, état des lieux, zonage, constitution des lots, mise en concession, attribution des espaces et gestion par les régies."},{q:"En quoi consiste le réaménagement de l'espace publicitaire d'une ville ?",options:["Délimiter des zones et proposer des supports facteurs d'embellissement et de modernité","Remplacer tous les panneaux par des écrans numériques","Retirer les panneaux des centres-villes","Uniformiser les tarifs à l'échelle nationale"],correct:0,explain:"Le réaménagement repose sur le zonage : délimiter des espaces selon des normes et proposer des supports qui embellissent et modernisent le cadre de vie."},{q:"Comment prévenir la pollution visuelle due à l'exploitation des panneaux ?",options:["En interdisant toute nouvelle publicité","En augmentant le nombre de panneaux","En confiant le secteur à une seule régie","En réglementant, auditant et zonant le secteur d'exploitation"],correct:3,explain:"Un secteur réglementé et encadré (audit, état des lieux, zonage, normes) prévient la pléthore de panneaux à l'origine de la pollution visuelle."},{q:"Comment s'assurer d'une bonne rentabilité et de la pérennité du secteur ?",options:["En baissant tous les tarifs","Par la transparence, le professionnalisme, l'efficience et une mise à jour régulière","En vendant les panneaux aux enchères chaque année","En supprimant l'évaluation"],correct:1,explain:"Transparence, professionnalisme et efficience sont essentiels ; l'évaluation et la mise à jour régulière pérennisent les acquis du secteur."},{q:"Peut-on installer un panneau publicitaire n'importe où ? Pourquoi ?",options:["Oui, la liberté d'entreprendre le permet","Oui, sauf dans les capitales","Non, l'implantation suit des normes, un zonage et des délimitations","Non, uniquement sur les autoroutes"],correct:2,explain:"L'implantation suit un zonage et des délimitations selon des normes spécifiques du territoire, pour un développement harmonieux et un cadre de vie agréable."},{q:"Quelle est l'importance du panneau publicitaire dans une ville ?",options:["Il booste la concurrence, l'économie et embellit le cadre de vie","Il ne sert qu'à décorer","Il remplace les marchés publics","Il est surtout un obstacle à la circulation"],correct:0,explain:"Il booste la concurrence entre entreprises, propulse l'économie et, bien aménagé, contribue à l'embellissement des villes."},{q:"N'importe qui peut-il exercer l'activité d'exploitation de panneaux publicitaires ?",options:["Oui, c'est totalement libre","Oui, moyennant une simple taxe","Non, seuls les ministères peuvent exploiter","Non : acteurs identifiés, appels d'offres et gestion encadrée"],correct:3,explain:"Le secteur est encadré : audit des acteurs, appels d'offres, cahier des charges, concession et gestion selon les textes en vigueur."}],ue=n=>document.querySelector(n);function A_(){const n={topbar:ue("#ui-topbar"),chapter:ue("#ui-chapter"),progressFill:ue("#ui-progress-fill"),dots:ue("#ui-dots"),hint:ue("#ui-hint"),clickHint:ue("#ui-click-hint"),title:ue("#ui-title"),card:ue("#ui-card"),cardKicker:ue("#ui-card .card-kicker"),cardTitle:ue("#ui-card .card-title"),cardBody:ue("#ui-card .card-body"),quiz:ue("#ui-quiz"),quizScore:ue("#quiz-score"),quizList:ue("#quiz-list"),quizFill:ue("#quiz-progress-fill"),quizResult:ue("#quiz-result"),resultTitle:ue("#quiz-result .result-title"),resultText:ue("#quiz-result .result-text"),reader:ue("#ui-reader"),readerPanel:ue(".reader-panel"),readerProg:ue("#reader-progress-fill"),readerKicker:ue("#ui-reader .reader-kicker"),readerTitle:ue("#ui-reader .reader-title"),readerBody:ue("#ui-reader .reader-body"),readerCount:ue("#reader-count"),readerPrev:ue("#reader-prev"),readerNext:ue("#reader-next"),readerClose:ue("#reader-close"),toast:ue("#ui-toast"),cardOpen:ue("#card-open")};rn.forEach((F,Z)=>{const et=document.createElement("span");et.className="dot"+(Z===0?" active":""),et.dataset.index=Z,n.dots.appendChild(et)});const t={activeIndex:-1,quizAnswered:new Set,score:0,started:!1,readerOpen:!1,readerIndex:-1};let e=null,i=null,s=null;function o(F){n.progressFill.style.width=(F*100).toFixed(2)+"%"}function r(F){const Z=br[F];n.chapter.textContent=Z?`${Z.name} — ${Z.label}`:""}function a(F,Z){if(F===t.activeIndex)return;t.activeIndex=F;const et=rn[F];document.querySelectorAll(".dot").forEach((rt,j)=>{rt.classList.toggle("active",j===F)});const J=et.id==="quiz";n.card.classList.toggle("show",!J&&F!==-1),n.quiz.classList.toggle("show",J),i&&i(J),J||(n.cardKicker.textContent=et.kicker,n.cardTitle.textContent=et.title,n.cardBody.innerHTML=`<p class="card-note">Leçon prête à lire : ouvrez la fenêtre dédiée pour parcourir l'étape en entier.</p>`),r(et.chapter)}function l(F){F>.015&&(t.started=!0),n.title.classList.toggle("hide",t.started)}function c(F,Z,et){o(F),a(Z),l(F);const J=n.quiz.classList.contains("show");n.clickHint.classList.toggle("visible",Z>=0&&!J&&!t.readerOpen);const rt=!!et&&et.dist<14;n.card.classList.toggle("panel-focus",rt&&Z>=0&&!J)}function u(F){t.readerIndex=F,t.readerOpen=!0;const Z=rn[F];if(n.readerKicker.textContent=Z.kicker,n.readerTitle.textContent=Z.title,n.readerBody.innerHTML="",Z.id==="quiz"){const et=document.createElement("ul");et.className="reader-bullets",Z.bullets.forEach(rt=>{const j=document.createElement("li");j.textContent=rt,et.appendChild(j)}),n.readerBody.appendChild(et);const J=document.createElement("button");J.className="reader-quiz-btn",J.textContent="Lancer le questionnaire",J.addEventListener("click",d),n.readerBody.appendChild(J)}else Z.content.forEach(et=>{const J=document.createElement("p"),rt=document.createElement("span");rt.className="body-t",rt.textContent=et.t,J.appendChild(rt),J.appendChild(document.createTextNode(et.b)),n.readerBody.appendChild(J)});n.readerCount.textContent=`${String(F+1).padStart(2,"0")} / ${String(rn.length).padStart(2,"0")}`,n.readerPanel.scrollTop=0,p(),n.title.classList.add("hide"),n.reader.classList.add("show"),e&&e(!0)}function d(){t.readerOpen&&(t.readerOpen=!1,n.reader.classList.remove("show"),e&&e(!1))}function h(F){if(!t.readerOpen)return;const Z=Math.max(0,Math.min(rn.length-1,t.readerIndex+F));Z!==t.readerIndex&&u(Z)}function p(){if(!n.readerProg)return;const F=n.readerPanel.scrollHeight-n.readerPanel.clientHeight;n.readerProg.style.width=(F>0?n.readerPanel.scrollTop/F*100:100)+"%"}n.readerPanel.addEventListener("scroll",p,{passive:!0}),n.readerClose.addEventListener("click",d),n.readerPrev.addEventListener("click",()=>h(-1)),n.readerNext.addEventListener("click",()=>h(1)),n.reader.addEventListener("click",F=>{F.target===n.reader&&d()}),n.cardOpen.addEventListener("click",()=>{t.activeIndex>=0&&u(t.activeIndex)}),document.querySelector("#quiz-retry").addEventListener("click",()=>{t.quizAnswered.clear(),t.score=0,document.querySelector("#quiz-score").textContent=0,n.quizFill.style.width="0%",n.quizResult.classList.add("hide"),bu(t,n)}),document.querySelector("#quiz-restart").addEventListener("click",()=>{i&&i(!1),window.scrollTo({top:0,behavior:"smooth"})});function m(F){n.toast.textContent=F,n.toast.classList.add("show"),clearTimeout(s),s=setTimeout(()=>n.toast.classList.remove("show"),4600)}bu(t,n);function v(){return n.quiz.classList.contains("show")}function g(F){if(!v())return;const Z=n.quizList.querySelectorAll(".quiz-card");for(const et of Z){if(et.classList.contains("done"))continue;const J=et.querySelectorAll(".quiz-opt");F<J.length&&J[F].click();return}}const f=document.querySelectorAll(".tsize-btn");function S(F){const Z=document.documentElement;Z.classList.toggle("ts-sm",F===0),Z.classList.toggle("ts-lg",F===2),f.forEach(et=>{const J=Number(et.dataset.tsize)===F;et.classList.toggle("active",J),et.setAttribute("aria-pressed",String(J))});try{localStorage.setItem("panneau-tsize",String(F))}catch{}}let w=1;try{const F=Number(localStorage.getItem("panneau-tsize"));F>=0&&F<=2&&(w=F)}catch{}S(w),f.forEach(F=>F.addEventListener("click",()=>S(Number(F.dataset.tsize))));const E=ue("#ui-contact"),G=ue("#contact-form"),x=ue("#contact-status"),U=ue("#contact-name"),z=ue("#contact-email"),y=ue("#contact-message");let M=!1;function I(){E.classList.add("show"),E.setAttribute("aria-hidden","false"),x.textContent="",setTimeout(()=>U&&U.focus(),60)}function k(){E.classList.remove("show"),E.setAttribute("aria-hidden","true")}return document.querySelector("#contact-open").addEventListener("click",I),document.querySelector("#contact-close").addEventListener("click",k),E.addEventListener("click",F=>{F.target===E&&k()}),G.addEventListener("submit",F=>{if(F.preventDefault(),!M){if(!U.value.trim()||!z.value.trim()||!y.value.trim()){x.classList.remove("ok"),x.classList.add("err"),x.textContent="Merci de remplir tous les champs.";return}if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(z.value.trim())){x.classList.remove("ok"),x.classList.add("err"),x.textContent="L'adresse email semble incorrecte.";return}M=!0,x.classList.remove("ok","err"),x.textContent="Envoi en cours…",setTimeout(()=>{M=!1,x.classList.add("ok"),x.textContent="Merci, votre message est bien parti.",G.reset(),setTimeout(k,2200)},750)}}),{updateGlobal:c,el:n,openReader:u,closeReader:d,readerNav:h,showToast:m,isReaderOpen:()=>t.readerOpen,quizOpen:v,answerQuiz:g,openContact:I,closeContact:k,setReaderListener:F=>{e=F},setQuizListener:F=>{i=F},setQuizShown:F=>{i&&i(F)}}}function bu(n,t){const e=t.quizList;e.innerHTML="",Hs.forEach((i,s)=>{const o=document.createElement("div");o.className="quiz-card",o.innerHTML=`
      <div class="quiz-num">Question ${String(s+1).padStart(2,"0")}</div>
      <div class="quiz-q"></div>
      <div class="quiz-opts"></div>
      <div class="quiz-explain"></div>
    `,o.querySelector(".quiz-q").textContent=i.q;const r=o.querySelector(".quiz-opts");i.options.forEach((a,l)=>{const c=document.createElement("button");c.className="quiz-opt",c.innerHTML=`<span class="opt-letter">${String.fromCharCode(65+l)}.</span> <span class="opt-text"></span>`,c.querySelector(".opt-text").textContent=a,c.addEventListener("click",()=>{if(n.quizAnswered.has(s))return;n.quizAnswered.add(s);const u=l===i.correct;r.querySelectorAll(".quiz-opt").forEach((h,p)=>{p===i.correct?h.classList.add("correct"):p===l?h.classList.add("wrong"):h.classList.add("dim")}),u&&(n.score++,document.querySelector("#quiz-score").textContent=n.score);const d=o.querySelector(".quiz-explain");d.textContent=i.explain,d.classList.add("show"),o.classList.add("done",u?"correct-q":"wrong-q"),t.quizFill.style.width=(n.quizAnswered.size/Hs.length*100).toFixed(2)+"%",n.quizAnswered.size===Hs.length&&C_(n,t)}),r.appendChild(c)}),e.appendChild(o)})}function C_(n,t){const e=Math.round(n.score/Hs.length*100);let i;e>=90?i="Excellent ! Vous maîtrisez le module sur le bout des doigts.":e>=70?i="Très bien ! Quelques points à consolider, mais la base est solide.":e>=50?i="Bien. Relisez les leçons indiquées pour consolider vos acquis.":i="Le module mérite une seconde lecture : remontez le parcours et revivez les étapes.",t.resultTitle.textContent=e>=70?"Formation validée.":"Formation à revoir.";const s=Hs.length-n.score;t.resultText.innerHTML=`Score : <strong>${n.score} / ${Hs.length}</strong> — ${i}<br><span class="result-breakdown">${n.score} bonne${n.score>1?"s":""} réponse${n.score>1?"s":""} · ${s} à revoir</span>`,t.quizResult.classList.remove("hide"),e>=70&&R_()}const Eu=["#c08a68","#cfa574","#9db87f","#8a9ab8","#d2a678","#e0c9a0"];let zi=null;function R_(){zi||(zi=document.createElement("div"),zi.id="confetti-layer",document.body.appendChild(zi));const n=110;for(let t=0;t<n;t++){const e=document.createElement("span");e.className="confetti-piece"+(Math.random()<.3?" circle":""),e.style.left=Math.random()*100+"vw",e.style.background=Eu[Math.random()*Eu.length|0],e.style.opacity=(.55+Math.random()*.45).toFixed(2);const i=2.4+Math.random()*2.2,s=Math.random()*.9;e.style.animation=`confettiFall ${i}s cubic-bezier(0.2, 0.6, 0.4, 1) ${s}s forwards`,zi.appendChild(e),setTimeout(()=>e.remove(),(i+s+.2)*1e3)}setTimeout(()=>{zi&&!zi.childElementCount&&zi.remove()},6200)}const Ye={sky0:"#f6edd8",sky1:"#f2e6ca",sky2:"#eee0bf",sky3:"#eadab4",sky4:"#e6d3a6",sky5:"#e2cc9a",asphalt0:"#b39a6e",asphalt1:"#c4ab7e",asphalt2:"#d0b98c",bronze:"#9a8157",terracotta:"#c08a68",amber:"#cfa574"},li=Math.PI*2;function Ze(n,t,e,i,s,o){n.beginPath(),n.moveTo(t+o,e),n.arcTo(t+i,e,t+i,e+s,o),n.arcTo(t+i,e+s,t,e+s,o),n.arcTo(t,e+s,t,e,o),n.arcTo(t,e,t+i,e,o),n.closePath()}function ze(n,t,e,i,s,o){n.font=s,n.textAlign="center",n.fillStyle=o,n.fillText(t,e,i)}function P_(n,t,e){const i=n.createLinearGradient(0,0,0,e);i.addColorStop(0,Ye.sky0),i.addColorStop(.3,Ye.sky1),i.addColorStop(.58,Ye.sky2),i.addColorStop(.78,Ye.sky3),i.addColorStop(.9,Ye.sky4),i.addColorStop(1,Ye.sky5),n.fillStyle=i,n.fillRect(0,0,t,e);const s=n.createRadialGradient(t/2,e*.6,10,t/2,e*.6,t*.72);s.addColorStop(0,"rgba(240,196,126,0.5)"),s.addColorStop(.5,"rgba(238,184,118,0.18)"),s.addColorStop(1,"rgba(238,184,118,0)"),n.fillStyle=s,n.fillRect(0,0,t,e)}function Ra(n,t,e,{minH:i,maxH:s,alpha:o,body:r,win:a,density:l,tall:c=.14}){let u=-12;for(;u<t+12;){const d=22+Math.random()*52,h=i+Math.random()*(s-i);n.fillStyle=r,n.globalAlpha=o,n.fillRect(u,e-h,d,h),Math.random()<c&&(n.fillRect(u+d/2-1,e-h-12,2,12),Math.random()<.5&&(n.fillStyle="rgba(196,138,104,0.85)"),n.fillRect(u+d/2-1,e-h-12,2,2));const p=Math.floor(d/14);for(let m=0;m<p;m++)for(let v=0;v<Math.floor(h/17);v++)if(Math.random()<l){const g=u+5+m*14,f=e-h+7+v*17;n.fillStyle=a,n.globalAlpha=o*(.4+Math.random()*.6),n.fillRect(g,f,4.5,6.5),Math.random()<.28&&(n.fillStyle="rgba(170,130,80,0.45)",n.fillRect(g-1.5,f-1.5,7.5,9.5))}n.globalAlpha=1,u+=d+4+Math.random()*9}}function hs(n,t,e){const i=e*.6;return P_(n,t,e),Ra(n,t,i,{minH:34,maxH:92,alpha:.45,body:"#d6c095",win:"#8f7a4e",density:.3}),Ra(n,t,i,{minH:20,maxH:62,alpha:.6,body:"#c9b184",win:"#7a663c",density:.5}),Ra(n,t,i,{minH:13,maxH:44,alpha:.85,body:"#bda375",win:"#665430",density:.68}),L_(n,t,i),i}function L_(n,t,e){const i=n.canvas.height,s=t/2,o=n.createLinearGradient(0,e,0,i);o.addColorStop(0,Ye.asphalt0),o.addColorStop(.5,Ye.asphalt1),o.addColorStop(1,Ye.asphalt2),n.fillStyle=o,n.beginPath(),n.moveTo(s-1,e),n.lineTo(-40,i+20),n.lineTo(t+40,i+20),n.lineTo(s+1,e),n.closePath(),n.fill();const r=n.createRadialGradient(t/2,e+(i-e)*.38,6,t/2,e+(i-e)*.38,t*.24);r.addColorStop(0,"rgba(160,120,60,0.18)"),r.addColorStop(1,"rgba(160,120,60,0)"),n.fillStyle=r,n.fillRect(0,e,t,i-e),n.strokeStyle="rgba(90,70,40,0.55)",n.lineWidth=2,n.setLineDash([16,30]),n.beginPath(),n.moveTo(s,e+2),n.lineTo(s,i+20),n.stroke(),n.setLineDash([]),n.strokeStyle="rgba(90,70,40,0.25)",n.lineWidth=3;for(const a of[-1,1])n.beginPath(),n.moveTo(s+a*1.2,e+2),n.lineTo(t/2+a*t*.48,i+10),n.stroke()}function Bi(n,t,e,i,s){n.save(),n.translate(t,e),n.rotate(s||0),n.globalAlpha=.34,n.fillStyle="#000",n.beginPath(),n.ellipse(0,0,62*i,10*i,0,0,li),n.fill(),n.globalAlpha=1;const o=n.createLinearGradient(-46*i,0,-38*i,0);o.addColorStop(0,"#6b5230"),o.addColorStop(1,"#8a6f45"),n.fillStyle=o,n.fillRect(-46*i,-80*i,9*i,80*i),n.fillRect(37*i,-80*i,9*i,80*i);const r=134*i,a=98*i,l=-r/2,c=-186*i;Ze(n,l,c,r,a,7*i),n.fillStyle="#f7eeda",n.fill(),n.lineWidth=5*i,n.strokeStyle=Ye.bronze,n.stroke();const u=n.createLinearGradient(0,c,0,c+a);u.addColorStop(0,"#fdf8ec"),u.addColorStop(1,"#f1e6cb"),Ze(n,l+7*i,c+7*i,r-14*i,a-14*i,5*i),n.fillStyle=u,n.fill(),n.fillStyle=Ye.terracotta,n.fillRect(l+7*i,c+7*i,r-14*i,5*i),n.strokeStyle="rgba(90,70,40,0.3)",n.lineWidth=1.5*i,Ze(n,l+13*i,c+15*i,r-26*i,a-26*i,4*i),n.stroke(),ze(n,"PANNEAUTIQUE · DOMAINE PUBLIC",0,c+34*i,`600 ${Math.max(7,9*i)}px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif`,"#7a5f38"),ze(n,"PUBLICITÉ & AFFICHAGE",0,c+60*i,`700 ${Math.max(10,15*i)}px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif`,"#3a2e1f"),ze(n,"RÈGLES · ZONES · CONCESSIONS",0,c+80*i,`700 ${Math.max(6,8*i)}px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif`,"#b3825e"),n.fillStyle=Ye.amber,n.shadowColor=Ye.amber,n.shadowBlur=16*i,n.beginPath(),n.arc(0,c-6*i,3*i,0,li),n.fill(),n.shadowBlur=0;const d=n.createRadialGradient(0,-70*i,4,0,-70*i,48*i);d.addColorStop(0,"rgba(232,163,92,0.2)"),d.addColorStop(1,"rgba(232,163,92,0)"),n.fillStyle=d,n.fillRect(-64*i,-124*i,128*i,64*i),n.restore()}function I_(n,t,e,i,s){n.save(),n.translate(t,e),n.strokeStyle="#6b5230",n.lineCap="round",n.lineWidth=Math.max(3,i*.035),n.beginPath(),n.moveTo(0,0),n.quadraticCurveTo(10,-i*.5,5,-i*.94),n.stroke(),n.fillStyle="#5f7a4a";for(let o=0;o<6;o++){const r=-Math.PI*.95+o/5*Math.PI*.62;n.beginPath(),n.ellipse(Math.cos(r)*i*.34,-i*.97+Math.sin(r)*i*.1,i*.3,i*.05,r-Math.PI/2,0,li),n.fill()}n.restore()}function zo(n,t,e,i){const s=n.canvas.width,o=n.canvas.height;n.fillStyle="rgba(253,250,242,0.9)",n.fillRect(0,e,s,o-e),n.fillStyle="rgba(138,111,69,0.35)",n.fillRect(0,e,s,2),ze(n,t,s/2,e+i*1.45,`700 ${i}px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif`,"#7a5f38")}function Pn(n,t,e,i){const s=n.createRadialGradient(t/2,i,4,t/2,i,e*.6);s.addColorStop(0,"rgba(240,200,140,0.2)"),s.addColorStop(1,"rgba(240,200,140,0)"),n.fillStyle=s,n.fillRect(0,0,t,e);const o=n.createRadialGradient(t/2,e*.45,t*.2,t/2,e*.5,t*.74);o.addColorStop(0,"rgba(0,0,0,0)"),o.addColorStop(1,"rgba(140,115,75,0.3)"),n.fillStyle=o,n.fillRect(0,0,t,e);const r=n.createLinearGradient(0,0,0,e*.42);r.addColorStop(0,"rgba(120,95,55,0.14)"),r.addColorStop(1,"rgba(120,95,55,0)"),n.fillStyle=r,n.fillRect(0,0,t,e*.42),n.globalAlpha=.055;for(let a=0;a<420;a++)n.fillStyle=Math.random()>.5?"#fff":"#000",n.fillRect(Math.random()*t,Math.random()*e,1,1);n.globalAlpha=1}function Kl(n,t,e){const i=n.createLinearGradient(0,0,0,e);i.addColorStop(0,"#f3ead4"),i.addColorStop(.7,"#e6d8ba"),i.addColorStop(1,"#d9c8a2"),n.fillStyle=i,n.fillRect(0,0,t,e),n.fillStyle="rgba(120,95,55,0.18)";for(let c=0;c<5;c++)n.fillRect(t*(.04+c*.2),e*.05,t*.14,e*.44);const s=t*.6,o=e*.1,r=t*.26,a=e*.36;Ze(n,s,o,r,a,8);const l=n.createLinearGradient(0,o,0,o+a);l.addColorStop(0,"#cfe0e2"),l.addColorStop(1,"#f0e2c0"),n.fillStyle=l,n.fill(),n.strokeStyle="#7a5f38",n.lineWidth=6,Ze(n,s,o,r,a,8),n.stroke(),n.strokeStyle="rgba(90,70,40,0.4)",n.lineWidth=3,n.beginPath(),n.moveTo(s+r/2,o),n.lineTo(s+r/2,o+a),n.moveTo(s,o+a/2),n.lineTo(s+r,o+a/2),n.stroke()}function Jl(n,t,e){const i=e*.64,s=n.createLinearGradient(0,i,0,e);s.addColorStop(0,"#b08a5c"),s.addColorStop(.2,"#96714a"),s.addColorStop(1,"#6b4f30"),n.fillStyle=s,n.beginPath(),n.moveTo(t*.05,i),n.lineTo(t*.95,i),n.lineTo(t*.85,e),n.lineTo(t*.15,e),n.fill(),n.fillStyle="#7a5f3c",n.beginPath(),n.moveTo(t*.12,e*.8),n.lineTo(t*.88,e*.8),n.lineTo(t*.85,e),n.lineTo(t*.15,e),n.fill(),n.fillStyle="rgba(255,240,210,0.35)",n.beginPath(),n.moveTo(t*.05,i),n.lineTo(t*.95,i),n.lineTo(t*.93,i+10),n.lineTo(t*.07,i+10),n.fill()}function Dr(n,t,e,i,s,o,r){if(n.save(),n.translate(t,e),n.rotate(o||0),n.shadowColor="rgba(0,0,0,0.4)",n.shadowBlur=18,n.shadowOffsetY=10,Ze(n,-i/2,-s/2,i,s,4),n.fillStyle="#f4ead0",n.fill(),n.shadowBlur=0,n.strokeStyle="rgba(120,100,70,0.5)",n.lineWidth=2,n.stroke(),n.fillStyle=Ye.terracotta,n.fillRect(-i/2,-s/2,i,s*.06),r){const a=typeof r=="number"?r:r.length;n.fillStyle="rgba(60,50,34,0.5)";for(let l=0;l<a;l++)n.fillRect(-i*.36,-s*.26+l*s*.09,i*.72,s*.02)}n.restore()}function Ed(n,t,e){const i=n.createLinearGradient(0,0,0,e);i.addColorStop(0,"#efe7d3"),i.addColorStop(1,"#e0d3b6"),n.fillStyle=i,n.fillRect(0,0,t,e);for(let s=0;s<80;s++){const o=22+Math.random()*64,r=14+Math.random()*42;n.fillStyle=`rgba(178,166,138,${(.12+Math.random()*.2).toFixed(3)})`,n.fillRect(Math.random()*(t-o),Math.random()*(e-r),o,r)}n.fillStyle="rgba(120,162,184,0.4)",n.beginPath(),n.moveTo(0,e*.06),n.bezierCurveTo(t*.3,e*0,t*.62,e*.12,t*.8,e*.05),n.lineTo(t*.88,0),n.lineTo(0,0),n.fill(),n.strokeStyle="rgba(120,104,80,0.55)",n.lineWidth=2.5;for(let s=0;s<7;s++){const o=e*(.13+s*.13);n.beginPath(),n.moveTo(0,o),n.bezierCurveTo(t*.3,o+20,t*.6,o-20,t,o+8),n.stroke()}for(let s=0;s<9;s++){const o=t*(.1+s*.1);n.beginPath(),n.moveTo(o,0),n.bezierCurveTo(o+16,e*.3,o-16,e*.62,o+10,e),n.stroke()}n.lineWidth=5,n.strokeStyle="rgba(193,104,63,0.4)",n.beginPath(),n.moveTo(0,e*.2),n.bezierCurveTo(t*.35,e*.26,t*.55,e*.55,t*.84,e*.72),n.stroke(),n.save(),n.translate(t*.06,e*.09),n.fillStyle="rgba(255,255,255,0.65)",n.beginPath(),n.arc(0,0,26,0,li),n.fill(),n.strokeStyle="rgba(90,74,52,0.6)",n.lineWidth=2,n.stroke(),n.fillStyle=Ye.terracotta,n.beginPath(),n.moveTo(0,-18),n.lineTo(5,0),n.lineTo(-5,0),n.closePath(),n.fill(),ze(n,"N",0,-32,"700 15px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","rgba(90,74,52,0.9)"),n.restore()}function _o(n,t,e,i,s){n.save(),n.shadowColor="rgba(0,0,0,0.4)",n.shadowBlur=8,n.shadowOffsetY=4,n.fillStyle=i,n.beginPath(),n.moveTo(t,e-34),n.quadraticCurveTo(t+16,e-4,t+12,e-2),n.lineTo(t,e+6),n.lineTo(t-12,e-2),n.quadraticCurveTo(t-16,e-4,t,e-34),n.fill(),n.shadowBlur=0,n.fillStyle="#fff",n.beginPath(),n.arc(t,e-30,7.5,0,li),n.fill(),n.fillStyle=i,n.beginPath(),n.arc(t,e-30,3.5,0,li),n.fill(),s&&(n.font="800 19px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",n.lineWidth=4,n.strokeStyle="rgba(240,236,220,0.9)",n.strokeText(s,t+17,e-22),n.fillStyle="#2a2118",n.fillText(s,t+17,e-22)),n.restore()}function Pa(n,t,e,i,s,o,r,a){const l=Math.PI*.75,c=Math.PI*1.5;n.lineCap="round",n.beginPath(),n.arc(t,e,i,l,l+c),n.strokeStyle="rgba(110,90,55,0.22)",n.lineWidth=14,n.stroke();const u=n.createLinearGradient(t-i,0,t+i,0);u.addColorStop(0,Ye.terracotta),u.addColorStop(1,s),n.beginPath(),n.arc(t,e,i,l,l+c*o),n.strokeStyle=u,n.lineWidth=14,n.stroke(),ze(n,String(Math.round(o*100))+"%",t,e+8,"800 34px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#3a2e1f"),ze(n,r,t,e+i*.78+8,"700 18px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","rgba(90,74,52,0.75)")}function Td(n,t,e){const i=hs(n,t,e);I_(n,t*.1,i+20,e*.5),Bi(n,t*.5,i+2,1.12,0),zo(n,"LE PARCOURS DE LA PANNEAUTIQUE SUR LE DOMAINE PUBLIC",e*.86,e*.03),Pn(n,t,e,i)}function D_(n,t,e){const i=hs(n,t,e),s=5;for(let o=0;o<s;o++){const r=o===2,a=t*(.14+o*.18),l=i+(e-i)*.82*Math.pow(1-o/(s-1),.7)*.85+i*.12,c=.5+.18*o+(r?.12:0);Bi(n,a,Math.min(l,e-10),c,r?0:(o-2)*.05)}ze(n,"LA PANNEAUTIQUE, LEVIER ÉCONOMIQUE DU DOMAINE PUBLIC",t/2,e*.3,"700 34px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#3a2e1f"),n.shadowColor="rgba(255,255,255,0.75)",n.shadowBlur=12,ze(n,"CHAQUE SUPPORT EST UNE RESSOURCE",t/2,e*.34,"600 20px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#b3825e"),n.shadowBlur=0,Pn(n,t,e,i)}function U_(n,t,e){const i=hs(n,t,e);Bi(n,t*.2,i+2,1,-.1),Bi(n,t*.46,i-6,.9,.12),Bi(n,t*.68,i+2,.75,-.26),Bi(n,t*.3,i+(e-i)*.7,.55,.38);const s=i+(e-i)*.92;n.fillStyle="rgba(253,250,242,0.92)",Ze(n,t*.05,s,t*.34,e*.05,4),n.fill();for(let o=0;o<12;o++)o%2===0?n.fillStyle="#cfa574":n.fillStyle="#7a5f38",n.fillRect(t*.055+o*t*.027,s+e*.008,t*.027,e*.034);ze(n,"PANNEAUX ANARCHIQUES — LE CONSTAT",t/2,s-e*.02,"700 28px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#3a2e1f"),Pn(n,t,e,i)}function N_(n,t,e){Kl(n,t,e),Jl(n,t,e),Dr(n,t*.3,e*.56,t*.3,e*.3,-.04,8),Dr(n,t*.48,e*.6,t*.26,e*.26,.03,6);const i=t*.74,s=e*.56;n.save(),n.translate(i,s),n.shadowColor="rgba(0,0,0,0.45)",n.shadowBlur=16,n.shadowOffsetY=8,Ze(n,-t*.14,-e*.14,t*.28,e*.28,6),n.fillStyle="#e8d9b8",n.fill(),n.shadowBlur=0,n.strokeStyle="rgba(150,120,70,0.5)",n.stroke(),n.fillStyle=Ye.terracotta,n.fillRect(-t*.14,-e*.14,t*.28,e*.035),n.fillStyle="#3a2a18";for(let o=0;o<6;o++)n.fillRect(-t*.11,-e*.08+o*e*.045,t*.22,e*.012);n.fillStyle="#57a05f";for(let o=0;o<4;o++)n.beginPath(),n.arc(-t*.11,-e*.08+o*e*.045,e*.014,0,li),n.fill();ze(n,"LISTE DE CONTRÔLE",0,e*.11,"700 "+e*.028+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#2a2118"),n.restore(),n.save(),n.translate(t*.5,e*.42),n.rotate(.05),n.shadowColor="rgba(0,0,0,0.4)",n.shadowBlur=14,n.fillStyle="#4a3a26",Ze(n,-t*.11,-e*.02,t*.09,e*.05,6),n.fill(),n.shadowBlur=0,n.fillStyle="#f4ead0",Ze(n,-t*.1,-e*.016,t*.012,e*.044,3),n.fill(),n.restore(),zo(n,"AUDIT : COMPRENDRE AVANT D'AGIR",e*.9,e*.032),Pn(n,t,e,e*.5)}function z_(n,t,e){Ed(n,t,e),n.strokeStyle="rgba(193,104,63,0.85)",n.lineWidth=4,n.setLineDash([12,9]),n.beginPath(),n.moveTo(t*.16,e*.2),n.bezierCurveTo(t*.38,e*.34,t*.55,e*.5,t*.84,e*.74),n.stroke(),n.setLineDash([]),_o(n,t*.16,e*.2,"#c97a62","P1"),_o(n,t*.32,e*.42,"#7d9ec2","P2"),_o(n,t*.5,e*.58,"#d2a878","P3"),_o(n,t*.7,e*.72,"#8fae8a","P4"),_o(n,t*.85,e*.8,"#c97a62","P5"),n.fillStyle="rgba(240,236,220,0.92)",Ze(n,t*.62,e*.07,t*.3,e*.22,6),n.fill(),n.strokeStyle="rgba(150,120,70,0.5)",n.stroke(),ze(n,"ÉTAT DES LIEUX — GPS",t*.77,e*.12,"700 "+e*.03+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#2a2118"),[["#c97a62","Support signalé"],["#7d9ec2","À vérifier"],["#8fae8a","Conforme"]].forEach(([s,o],r)=>{n.fillStyle=s,n.beginPath(),n.arc(t*.66,e*.16+r*e*.038,e*.013,0,li),n.fill(),n.fillStyle="#4a3a28",n.font="500 "+e*.02+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",n.textAlign="left",n.fillText(o,t*.69,e*.166+r*e*.038)}),zo(n,"RELEVÉ GPS DE TOUS LES SUPPORTS",e*.88,e*.032),Pn(n,t,e,e*.8)}function F_(n,t,e){Ed(n,t,e),[[.05,.1,.3,.34,"rgba(125,158,194,0.38)","ZONE A"],[.39,.06,.32,.3,"rgba(192,138,104,0.4)","ZONE B"],[.11,.5,.34,.34,"rgba(143,174,138,0.38)","ZONE C"],[.5,.44,.36,.42,"rgba(207,165,116,0.4)","ZONE D"]].forEach(([s,o,r,a,l,c])=>{n.fillStyle=l,n.fillRect(t*s,e*o,t*r,e*a),n.strokeStyle="rgba(50,40,28,0.55)",n.lineWidth=2.5,n.setLineDash([9,6]),n.strokeRect(t*s,e*o,t*r,e*a),n.setLineDash([]),n.fillStyle="rgba(20,14,8,0.65)",Ze(n,t*s+t*.012,e*o+e*.02,t*.09,e*.045,4),n.fill(),ze(n,c,t*s+t*.057,e*o+e*.052,"800 "+e*.026+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#fff")}),n.fillStyle="rgba(240,236,220,0.94)",Ze(n,t*.05,e*.86,t*.9,e*.11,6),n.fill(),n.strokeStyle="rgba(150,120,70,0.5)",n.stroke(),ze(n,"ZONAGE : LE TERRITOIRE DÉCOUPÉ EN ZONES RÉGLEMENTÉES",t*.5,e*.925,"700 "+e*.035+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#2a2118"),Pn(n,t,e,e*.85)}function O_(n,t,e){const i=hs(n,t,e),s=i+(e-i)*.72;Bi(n,t*.74,s,.72,-.04);const o=t*.3,r=i+(e-i)*.6;n.fillStyle="#f7eeda",Ze(n,o-t*.16,r-e*.06,t*.32,e*.06,4),n.fill(),n.strokeStyle=Ye.bronze,n.lineWidth=4,n.stroke(),n.fillStyle="rgba(90,70,40,0.35)";for(let a=0;a<5;a++)n.fillRect(o-t*.14+a*t*.06,r-e*.052,t*.045,e*.044);ze(n,"MOBILIER URBAIN DE PUBLICITÉ — LOT N° 01",o,r-e*.09,"700 "+e*.034+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#3a2e1f"),ze(n,"DES LOTS COHÉRENTS POUR UN FINANCEMENT MAÎTRISÉ",t/2,e*.24,"700 26px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#3a2e1f"),Pn(n,t,e,i)}function B_(n,t,e){Kl(n,t,e),Jl(n,t,e),Dr(n,t*.42,e*.55,t*.46,e*.4,-.02,10),ze(n,"CONVENTION DE CONCESSION",t*.42,e*.34,"700 "+e*.036+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#2a2118");const i=t*.62,s=e*.66;n.save(),n.translate(i,s),n.rotate(-.14),n.fillStyle="#b03a30",Ze(n,-t*.07,-e*.028,t*.14,e*.056,6),n.fill(),n.strokeStyle="#7c241c",n.lineWidth=3,Ze(n,-t*.07,-e*.028,t*.14,e*.056,6),n.stroke(),ze(n,"CONCÉDÉ",0,e*.012,"800 "+e*.03+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#f4ead0"),n.restore(),n.save(),n.translate(t*.26,e*.62),n.rotate(.12),n.strokeStyle="#2a2118",n.lineWidth=3,n.lineCap="round",n.beginPath(),n.moveTo(-t*.02,e*.05),n.lineTo(0,0),n.lineTo(t*.012,-e*.06),n.moveTo(0,0),n.lineTo(-t*.02,-e*.02),n.stroke(),n.restore(),zo(n,"MISE EN CONCESSION DES ESPACES PUBLICITAIRES",e*.9,e*.032),Pn(n,t,e,e*.5)}function k_(n,t,e){Kl(n,t,e),Jl(n,t,e),Dr(n,t*.34,e*.56,t*.42,e*.36,-.02,8),ze(n,"CAHIER DES CHARGES",t*.34,e*.36,"700 "+e*.034+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#2a2118");const i=t*.55,s=e*.62;n.save(),n.translate(i,s),n.rotate(-.2),n.fillStyle="#57a05f",Ze(n,-t*.1,-e*.042,t*.2,e*.084,8),n.fill(),n.strokeStyle="#3a703f",n.lineWidth=4,Ze(n,-t*.1,-e*.042,t*.2,e*.084,8),n.stroke(),ze(n,"ADMIS",0,e*.012,"800 "+e*.055+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#f4f0d8"),n.restore(),zo(n,"ATTRIBUTION DES LOTS PAR APPEL D'OFFRES",e*.9,e*.032),Pn(n,t,e,e*.5)}function G_(n,t,e){const i=hs(n,t,e),s=t/2,o=t*.42,r=e*.46;n.fillStyle="#d3bd92",n.fillRect(s-o/2,i-r,o,r),n.fillStyle="#c9b184";for(let u=0;u<5;u++)n.fillRect(s-o/2+u*o/5+4,i-r,o/5-8,r);n.fillStyle="rgba(160,120,60,0.55)";for(let u=0;u<6;u++)for(let d=0;d<2;d++)Math.random()<.7&&n.fillRect(s-o/2+d*o/2+o*.08,i-r+r*.1+u*r*.13,o*.18,r*.06);const a=i-r*.18;n.fillStyle="#6b5230",n.fillRect(s-t*.03,a-e*.045,t*.06,e*.045),ze(n,"RÉGIE PUBLICITAIRE",s,a-e*.055,"700 "+e*.026+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#3a2e1f");const l=s,c=i-r-e*.08;n.strokeStyle="#4a3a26",n.lineWidth=4,n.beginPath(),n.moveTo(l,c+e*.14),n.lineTo(l,c),n.stroke(),n.fillStyle="#c08a68",n.beginPath(),n.moveTo(l,c-e*.03),n.lineTo(l-t*.012,c),n.lineTo(l+t*.012,c),n.fill(),ze(n,"GESTION PAR LES RÉGIES : UN SERVICE EN RÈGIE DIRECTE",t/2,e*.22,"700 26px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#3a2e1f"),Pn(n,t,e,i)}function H_(n,t,e){const i=n.createLinearGradient(0,0,0,e);i.addColorStop(0,"#efe5cd"),i.addColorStop(1,"#e4d5b4"),n.fillStyle=i,n.fillRect(0,0,t,e),n.fillStyle="#faf3e2",Ze(n,t*.05,e*.08,t*.9,e*.84,10),n.fill(),n.strokeStyle="rgba(138,111,69,0.5)",n.lineWidth=3,n.stroke(),Pa(n,t*.25,e*.38,e*.14,Ye.amber,.9,"AUDIT"),Pa(n,t*.5,e*.38,e*.14,Ye.terracotta,.78,"CONCESSION"),Pa(n,t*.75,e*.38,e*.14,"#7da878",.86,"GESTION"),n.strokeStyle="#7da878",n.lineWidth=4,n.beginPath(),n.moveTo(t*.12,e*.68),n.bezierCurveTo(t*.24,e*.6,t*.3,e*.66,t*.42,e*.55),n.bezierCurveTo(t*.55,e*.62,t*.6,e*.5,t*.72,e*.5),n.bezierCurveTo(t*.8,e*.48,t*.86,e*.42,t*.9,e*.4),n.stroke(),n.fillStyle="#7da878",n.beginPath(),n.arc(t*.9,e*.4,7,0,li),n.fill(),ze(n,"ÉVALUATION DU SYSTÈME",t/2,e*.93,"700 "+e*.036+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#7a5f38"),Pn(n,t,e,e*.5)}function V_(n,t,e){const i=hs(n,t,e);[[t*.24,e*.4],[t*.62,e*.5],[t*.84,e*.34]].forEach(([o,r])=>{const a=i-r;n.strokeStyle="#5c4a30",n.lineWidth=6,n.lineCap="butt",n.beginPath(),n.moveTo(o-18,i),n.lineTo(o+12,a),n.lineTo(o+46,a+16),n.moveTo(o+12,a),n.lineTo(o+12,a+60),n.moveTo(o+12,a+14),n.lineTo(o+58,a+26),n.stroke(),n.lineWidth=3,n.strokeStyle="#4a3a26",n.beginPath(),n.moveTo(o-8,a+26),n.lineTo(o+58,a+32),n.stroke()}),Bi(n,t*.5,i+(e-i)*.78,.62,-.1),ze(n,"LE SECTEUR SE MODERNISE, LE PARC S'ADAPTE",t/2,e*.24,"700 28px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#3a2e1f"),Pn(n,t,e,i)}function W_(n,t,e){const i=hs(n,t,e);n.fillStyle="rgba(253,250,242,0.93)",Ze(n,t*.2,e*.12,t*.6,e*.72,18),n.fill(),n.strokeStyle="rgba(138,111,69,0.5)",n.lineWidth=3,n.stroke(),n.fillStyle="rgba(201,143,78,0.16)",n.beginPath(),n.arc(t*.5,e*.42,e*.22,0,li),n.fill(),n.strokeStyle="rgba(201,143,78,0.4)",n.lineWidth=3,n.stroke(),n.fillStyle="#7a5f38",n.font="800 "+e*.26+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",n.textAlign="center",n.fillText("?",t*.5,e*.52),ze(n,"12 QUESTIONS — VALIDEZ VOS ACQUIS",t*.5,e*.72,"700 "+e*.034+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#3a2e1f"),ze(n,"DÉFINITIONS · ZONES · CONCESSIONS · RÈGIES",t*.5,e*.79,"500 "+e*.02+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#b3825e"),Pn(n,t,e,i)}const q_={presentation:Td,"lecon1-importance":D_,"lecon2-constat":U_,audit:N_,"etat-lieux":z_,zonage:F_,"constitution-lots":O_,"mise-concession":B_,attribution:k_,gestion:G_,evaluation:H_,"mise-a-jour":V_,quiz:W_};function X_(n,t,e,i){n.width=e,n.height=i;const s=n.getContext("2d");(q_[t]||Td)(s,e,i)}const Vs=Math.PI*2;let Ki=null,Ur=!1;function Y_(){if(Ur)return null;if(!Ki)try{const n=document.createElement("canvas");Ki=new Wl({canvas:n,antialias:!0,alpha:!1,preserveDrawingBuffer:!0}),Ki.toneMapping=Io,Ki.toneMappingExposure=1.2,Ki.shadowMap.enabled=!0,Ki.shadowMap.type=Pl}catch(n){return Ur=!0,console.warn("Illustrations 3D indisponibles (WebGL) — fallback 2D.",n),null}return Ki}function vi(n,t=1024,e=1024){const i=document.createElement("canvas");i.width=t,i.height=e;const s=i.getContext("2d");n(s,t,e);const o=new nn(i);return o.colorSpace=xe,o.anisotropy=4,o}function Ao(n,t,e,i,s,o){n.beginPath(),n.moveTo(t+o,e),n.arcTo(t+i,e,t+i,e+s,o),n.arcTo(t+i,e+s,t,e+s,o),n.arcTo(t,e+s,t,e,o),n.arcTo(t,e,t+i,e,o),n.closePath()}function ii(n=0){const t=["sunset","waves","dune","rings","prism","ember"],e=t[n%t.length];return vi((i,s,o)=>{const r=i.createLinearGradient(0,0,s*(n%2?1:-1),o);if(r.addColorStop(0,["#8a6a4e","#96745a","#7d6350"][n%3]),r.addColorStop(1,["#c29a78","#c9a280","#b08c6e"][(n+1)%3]),i.fillStyle=r,i.fillRect(0,0,s,o),i.fillStyle="rgba(242,232,212,0.9)",i.beginPath(),i.arc(s*.5,o*.38,o*.2,0,Vs),i.fill(),i.fillStyle="rgba(232,163,92,0.95)",i.beginPath(),i.arc(s*.5,o*.38,o*.13,0,Vs),i.fill(),i.strokeStyle="rgba(242,232,212,0.5)",i.lineWidth=8,e==="waves"||e==="rings")for(let a=0;a<4;a++)i.beginPath(),i.arc(s*.5,o*.4,o*(.24+a*.08),0,Vs),i.stroke();else for(let a=0;a<3;a++)i.beginPath(),i.moveTo(s*.2,o*(.72-a*.14)),i.quadraticCurveTo(s*.5,o*(.6-a*.14),s*.8,o*(.72-a*.14)),i.stroke();i.fillStyle="rgba(242,232,212,0.28)",i.fillRect(s*.16,o*.84,s*.68,3)},512,384)}function La(n,t){const e=new Mn([new b(0,0,-20),new b(0,0,140)]);return xd(n,e,.5,1,t).group}function Ji(n,t={}){const e=new yt,i=new $({color:ie.walnut,roughness:.8,metalness:.05}),s=new $({color:ie.bronze,roughness:.55,metalness:.35}),o=t.w??6.6,r=t.h??4.4,a=new R(new ft(o,r,.22),i);a.position.y=3,a.castShadow=!0,e.add(a);const l=new R(new ft(o+.4,.26,.3),s);l.position.y=r+.92,e.add(l);const c=new R(new ft(o+.4,.26,.3),s);c.position.y=.72,e.add(c);const u=new Je({map:n}),d=new R(new Jt(o-.4,r-.4),u);return d.position.set(0,3,.13),e.add(d),e}function $_(n){const t=new yt,e=new $({color:ie.walnutDark,roughness:.7,metalness:.2}),i=new R(new bt(.09,.12,3.4,8),e);i.position.y=1.7,i.castShadow=!0,t.add(i);const s=new Je({map:n}),o=new R(new Jt(1.5,2.1),s);o.position.y=3.9,t.add(o);const r=new R(new bt(.14,.1,.24,8),e);return r.position.y=5.15,t.add(r),t}function Z_(n){const t=new yt,e=new $({color:4864550,roughness:.5,metalness:.5}),i=new $({color:10336447,roughness:.15,metalness:.4,transparent:!0,opacity:.5}),s=new $({color:ie.bronze,roughness:.5,metalness:.45});for(const u of[-2.2,2.2]){const d=new R(new bt(.08,.1,2.8,8),e);d.position.set(u,1.4,0),t.add(d)}const o=new R(new ft(5.4,.16,2.6),s);o.position.y=2.9,o.rotation.x=.06,t.add(o);const r=new R(new ft(5.4,2.1,.1),i);r.position.set(0,1.75,-1.15),t.add(r);const a=new R(new ft(4.4,.08,.4),new $({color:7031340}));a.position.set(0,.5,-.3),t.add(a);const l=new Je({map:n}),c=new R(new Jt(3.4,2),l);return c.position.set(0,1.9,.14),t.add(c),t}function j_(n){const t=new yt,e=new R(new ft(2.6,2.6,.5),new $({color:ie.walnut,roughness:.7}));e.position.y=1.3,t.add(e);const i=new Je({map:n}),s=new R(new Jt(2.2,2),i);s.position.set(0,1.35,.27),t.add(s);const o=new R(new ft(3,.12,1),new $({color:ie.bronze,roughness:.5,metalness:.4}));return o.position.y=2.72,t.add(o),t}function Tu(n=!1){return vi((t,e,i)=>{const s=t.createLinearGradient(0,0,0,i);s.addColorStop(0,"#efe7d3"),s.addColorStop(1,"#dcc9a6"),t.fillStyle=s,t.fillRect(0,0,e,i);for(let o=0;o<70;o++){const r=24+Math.random()*90,a=14+Math.random()*60;t.fillStyle=`rgba(178,166,138,${(.1+Math.random()*.22).toFixed(3)})`,t.fillRect(Math.random()*(e-r),Math.random()*(i-a),r,a)}t.fillStyle="rgba(120,162,184,0.35)",t.fillRect(0,0,e*.16,i*.12),t.fillRect(e*.82,i*.72,e*.18,i*.28),t.fillStyle="rgba(109,168,124,0.35)",t.fillRect(e*.6,i*.08,e*.28,i*.18),t.strokeStyle="rgba(120,104,80,0.5)",t.lineWidth=3;for(let o=0;o<6;o++){const r=i*(.1+o*.16);t.beginPath(),t.moveTo(0,r),t.bezierCurveTo(e*.3,r+16,e*.6,r-14,e,r+8),t.stroke()}for(let o=0;o<7;o++){const r=e*(.08+o*.14);t.beginPath(),t.moveTo(r,0),t.bezierCurveTo(r+14,i*.3,r-12,i*.62,r+8,i),t.stroke()}n&&[[.08,.12,.3,.34,"rgba(125,158,194,0.36)"],[.44,.1,.3,.3,"rgba(192,138,104,0.38)"],[.12,.52,.32,.32,"rgba(143,174,138,0.36)"],[.5,.5,.36,.38,"rgba(207,165,116,0.38)"]].forEach(([r,a,l,c,u])=>{t.fillStyle=u,t.fillRect(e*r,i*a,e*l,i*c),t.strokeStyle="rgba(50,40,28,0.6)",t.lineWidth=4,t.setLineDash([12,8]),t.strokeRect(e*r,i*a,e*l,i*c),t.setLineDash([])})},1024,1024)}function Au(n){const t=new yt,e=new $({color:n,roughness:.5,metalness:.2,emissive:n,emissiveIntensity:.5}),i=new R(new ln(.28,.7,12),e);i.position.y=.7,t.add(i);const s=new R(new se(.16,10,8),e);return s.position.y=1.15,t.add(s),t}function Ia(){const n=new yt,t=new $({color:9071429,roughness:.6,metalness:.05}),e=new $({color:4864550,roughness:.8}),i=new R(new ft(3.4,.14,1.5),t);i.position.y=1,i.castShadow=!0,n.add(i);for(const[s,o]of[[-1.5,-.6],[1.5,-.6],[-1.5,.6],[1.5,.6]]){const r=new R(new ft(.12,1,.12),e);r.position.set(s,.5,o),n.add(r)}return n}function K_(n=.85,t=1.15,e=0){const i=new yt,s=new R(new ft(n,.02,t),new $({color:16050896,roughness:.85}));i.add(s);const o=new Be({color:7034424});for(let r=0;r<5;r++){const a=new R(new ft(n*.72,.005,.02),o);a.position.set(0,.012,t*.32-r*t*.14),i.add(a)}return i.rotation.y=e,i}function J_(){const n=new yt,t=new R(new ft(.72,.03,.98),new $({color:13215850,roughness:.6}));n.add(t);const e=new R(new Jt(.62,.86),new $({color:16050896,roughness:.9}));e.position.set(0,.02,.02),n.add(e);const i=new R(new ft(.2,.06,.3),new $({color:6048304,metalness:.6,roughness:.3}));return i.position.set(0,.05,.42),n.add(i),n}function Q_(n=.2){const t=new yt,e=new R(new ai(.34,.05,12,28),new $({color:ie.bronze,roughness:.3,metalness:.7}));t.add(e);const i=new R(new Kn(.33,28),new $({color:12574950,transparent:!0,opacity:.35,roughness:.05,metalness:.4}));t.add(i);const s=new R(new bt(.035,.05,.5,10),new $({color:4864550,roughness:.7}));return s.position.set(-.4,-.15,0),s.rotation.z=.9,t.add(s),t.rotation.x=n,t}function Da(n=16758896){const t=new yt,e=new $({color:4864550,roughness:.4,metalness:.6}),i=new R(new bt(.28,.34,.1,16),e);i.position.y=.05,t.add(i);const s=new R(new bt(.05,.05,1.1,10),e);s.position.y=.65,t.add(s);const o=new R(new ft(.9,.05,.05),e);o.position.set(.42,1.25,0),t.add(o);const r=new R(new ln(.16,.22,14),e);r.position.set(.85,1.28,0),r.rotation.z=-Math.PI/2,t.add(r);const a=new R(new se(.07,10,8),new $({color:n,emissive:n,emissiveIntensity:2.2}));a.position.set(.9,1.18,0),t.add(a);const l=new Zl(n,1.6,9,2);return l.position.set(.9,1.1,0),t.add(l),{g:t,light:l}}function t1(){const n=new yt,t=new R(new bt(.05,.05,.8,12),new $({color:3813154,roughness:.4,metalness:.5}));t.position.y=.4,n.add(t);const e=new R(new ln(.05,.16,12),new $({color:ie.bronze,metalness:.8,roughness:.3}));e.position.y=-.02,e.rotation.x=Math.PI,n.add(e);const i=new R(new bt(.055,.055,.18,12),new $({color:12151365,roughness:.5}));return i.position.y=.92,n.add(i),n}function Cu(n=11549232,t="CONCÉDÉ"){const e=new yt,i=new R(new bt(.42,.42,.24,20),new $({color:n,roughness:.5}));e.add(i);const s=new R(new bt(.12,.14,.3,12),new $({color:4864550,roughness:.6}));s.position.y=.27,e.add(s);const o=new R(new ai(.42,.03,8,24),new $({color:16050896,roughness:.6}));return o.rotation.x=Math.PI/2,o.position.y=.121,e.add(o),e}function e1(){const n=new yt,t=new $({color:9071165,roughness:.5}),e=new R(new bt(.05,.06,.9,12),t);e.rotation.z=Math.PI/2,n.add(e);const i=new R(new bt(.14,.14,.34,12),t);return i.position.set(.55,.12,0),i.rotation.z=Math.PI/2,n.add(i),n}function n1(n=0){const t=new yt,e=new R(new ft(.6,.05,.42),new $({color:16050896,roughness:.85}));t.add(e);const i=new R(new bt(.09,.09,.02,12),new $({color:11549232,roughness:.4}));return i.position.y=.035,t.add(i),t.rotation.y=n,t}function i1(n,t,e){return vi((i,s,o)=>{i.fillStyle="#f7f0de",Ao(i,6,6,s-12,o-12,20),i.fill(),i.strokeStyle="rgba(138,111,69,0.55)",i.lineWidth=4,Ao(i,6,6,s-12,o-12,20),i.stroke();const r=s/2,a=o*.56,l=o*.32,c=Math.PI*.75,u=Math.PI*1.5;i.lineCap="round",i.lineWidth=26,i.strokeStyle="rgba(110,90,55,0.22)",i.beginPath(),i.arc(r,a,l,c,c+u),i.stroke(),i.strokeStyle=t,i.beginPath(),i.arc(r,a,l,c,c+u*n),i.stroke(),i.fillStyle="#3a2e1f",i.font="800 90px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",i.textAlign="center",i.fillText(Math.round(n*100)+"%",r,a+22),i.fillStyle="rgba(90,74,52,0.75)",i.font="600 30px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",i.fillText(e,r,a+l+44)},512,512)}function Ru(n=1){const t=new yt,e=new $({color:4864550,roughness:.5,metalness:.4}),i=new $({color:ie.terracotta,roughness:.6}),s=17*n,o=new R(new ft(.5,s,.5),e);o.position.y=s/2,o.castShadow=!0,t.add(o);const r=new R(new ft(.35,.35,15*n),e);r.position.set(0,s+.6,5*n),t.add(r);const a=new R(new ft(1,1,1),i);a.position.set(0,s,-1.6*n),t.add(a);for(const h of[-.2,.2]){const p=new R(new bt(.03,.03,8*n,6),e);p.position.set(h,s+.4,6.6*n),p.rotation.x=-.35,t.add(p)}const l=new kr({color:6048304}),c=[new b(0,s+.5,8*n),new b(0,s-3*n,8*n)],u=new Le().setFromPoints(c);t.add(new Xl(u,l));const d=new R(new ft(.3,.3,.3),e);return d.position.set(0,s-3.4*n,8*n),t.add(d),t}function s1(n,t=60){const e=new Float32Array(t*3),i=new Float32Array(t*3),s=[12618344,13805688,16050896,9416330,10521188];for(let l=0;l<t;l++){e[l*3]=(Math.random()-.5)*14,e[l*3+1]=Math.random()*9,e[l*3+2]=(Math.random()-.5)*14;const c=new _t(s[l%s.length]);i[l*3]=c.r,i[l*3+1]=c.g,i[l*3+2]=c.b}const o=new Le;o.setAttribute("position",new Ve(e,3)),o.setAttribute("color",new Ve(i,3));const r=new js({size:.16,vertexColors:!0,transparent:!0,opacity:.85}),a=new Lo(o,r);return n.add(a),a}function Cn(n,t={}){const e=vi((m,v,g)=>{const f=m.createLinearGradient(0,0,0,g);f.addColorStop(0,"#f8f1de"),f.addColorStop(.34,"#f4e9cf"),f.addColorStop(.6,"#efe1bf"),f.addColorStop(.82,"#e9d7ab"),f.addColorStop(1,"#e1cc95"),m.fillStyle=f,m.fillRect(0,0,v,g);const S=m.createLinearGradient(0,g*.58,0,g);S.addColorStop(0,"rgba(255,238,205,0)"),S.addColorStop(1,"rgba(255,241,212,0.9)"),m.fillStyle=S,m.fillRect(0,g*.58,v,g*.42),m.fillStyle="rgba(255,252,244,0.5)";for(let w=0;w<12;w++){const E=Math.random()*v,G=Math.random()*g*.55,x=26+Math.random()*48;for(let U=0;U<4;U++)m.beginPath(),m.ellipse(E+(Math.random()-.5)*x*.6,G+(Math.random()-.5)*10,x*(.3+Math.random()*.25),4+Math.random()*5,0,0,Vs),m.fill()}},256,1024),i=new Be({map:e,side:pn,fog:!1,depthWrite:!1}),s=new R(new se(820,24,14),i);n.add(s);const o=new ri(new Yn({map:On(0,"rgba(240,180,110,0.95)"),transparent:!0,blending:Xe,depthWrite:!1,depthTest:!1}));o.position.set(t.sunX??-180,t.sunY??90,-520),o.scale.setScalar(t.sunS??130),n.add(o);const r=new ri(new Yn({map:On(.25,"rgba(235,165,95,0.35)"),transparent:!0,blending:Xe,depthWrite:!1,depthTest:!1}));r.position.set(t.sunX??-180,t.sunY??90,-520),r.scale.setScalar(460),n.add(r),n.userData.sun={sprite:o,halo:r};const a=new R(new Kn(1400,40),new $({map:yd(),roughness:1,metalness:0}));a.rotation.x=-Math.PI/2,a.position.y=-.03,a.receiveShadow=!0,n.add(a),n.add(new _d(11772544,t.ambient??.75)),n.add(new md(15918796,12101246,t.hemi??.5));const l=new vd(16772552,t.sunI??2.6);l.position.set(-120,140,-220),l.castShadow=!0,l.shadow.mapSize.set(1024,1024),l.shadow.camera.left=-60,l.shadow.camera.right=60,l.shadow.camera.top=60,l.shadow.camera.bottom=-60,l.shadow.camera.near=10,l.shadow.camera.far=600,n.add(l),n.add(l.target),n.fog=new Oi(t.fogColor??ie.skyHorizon,t.fogNear??40,t.fogFar??480);const c=cs()?70:140,u=new Float32Array(c*3);for(let m=0;m<c;m++)u[m*3]=(Math.random()-.5)*90,u[m*3+1]=.4+Math.random()*9,u[m*3+2]=-20+Math.random()*160;const d=new Le;d.setAttribute("position",new Ve(u,3));const h=new js({color:16050896,transparent:!0,opacity:.3,blending:Xe,depthWrite:!1,size:.09,sizeAttenuation:!0}),p=new Lo(d,h);n.add(p),n.userData.dust=p}function Qi(n,t=12,e=30,i=170,s=70){for(let o=0;o<t;o++){const r=e+Math.random()*(i-e),a=9+Math.random()*22,l=5+Math.random()*4,c=5+Math.random()*4,u=Math.random()>.5?1:-1;n.add(Al(l,a,c,r,u*(s*.55+Math.random()*s*.45)))}}function ts(n,t){n.userData.palms=n.userData.palms||[];for(const[e,i,s]of t){const o=Sd(new b(e,0,i),s??1);n.userData.palms.push(o),n.add(o)}}const Nr={presentation(n,t,e){Cn(n);const i=new Mn([new b(0,0,-30),new b(0,0,140)]),s=gi(i,4.4,ie.path,zs(),400);s.position.y=.01,n.add(s);const o=La(t,e);o.position.set(-5.2,0,46),o.rotation.y=.42,n.add(o);const r=Ji(ii(1));r.position.set(6.4,0,70),r.rotation.y=-.55,n.add(r),Qi(n,16),ts(n,[[-9,18,1.2],[9,22,1],[-10,62,1.3],[10,92,1.1],[-11,120,1.25]]);for(let l=0;l<=4;l++){const c=8+l*26,u=l%2===0?1:-1,d=Os(new b(u*6,0,c),u);n.add(d);const h=Bs(new b(u*6,0,c),u);n.add(h.group)}for(const l of[30,78]){const c=Ir();c.group.position.set(0,0,l),c.group.rotation.y=Math.PI,c.group.userData.x0=0,(n.userData.cars=n.userData.cars||[]).push(c.group),n.add(c.group)}const a=new Ue(46,1280/760,.1,2e3);return a.position.set(6.5,3.1,14),a.lookAt(-1.5,3.4,52),a},"lecon1-importance"(n,t,e){Cn(n,{sunX:60,sunY:120,sunI:2.4});const i=new Mn([new b(0,0,-20),new b(0,0,150)]),s=gi(i,4.4,ie.path,zs(),400);s.position.y=.01,n.add(s),[{x:-5.6,z:40,ry:.5},{x:5.8,z:62,ry:-.6},{x:-5.9,z:86,ry:.55},{x:5.9,z:108,ry:-.55},{x:-5.8,z:130,ry:.5}].forEach((a,l)=>{const c=l===0?La(t,e):Ji(ii(l+2));c.position.set(a.x,0,a.z),c.rotation.y=a.ry,n.add(c)}),Qi(n,14,30,190,80),ts(n,[[-9,16,1],[9,50,1.1],[-10,96,1.05],[10,132,1.15]]);for(let a=0;a<=5;a++){const l=12+a*24,c=a%2===0?1:-1,u=Os(new b(c*6,0,l),c);n.add(u);const d=Bs(new b(c*6,0,l),c);n.add(d.group)}for(const a of[28,74,118]){const l=Ir();l.group.position.set(0,0,a),l.group.rotation.y=Math.PI,l.group.userData.x0=0,(n.userData.cars=n.userData.cars||[]).push(l.group),n.add(l.group)}const r=new Ue(48,1280/760,.1,2e3);return r.position.set(8,5.4,6),r.lookAt(0,3.2,80),r},"lecon2-constat"(n,t,e){Cn(n,{sunI:1.3,ambient:.5,fogColor:15524036,fogNear:24,fogFar:220}),[[0,20,.1,1.15],[-7,34,-.35,1],[6,42,.55,.9],[-3,52,-.2,1.25],[8,60,-.7,.85],[-8,66,.3,1.1],[3,74,.65,.95],[-5,84,-.5,1.05],[7,90,.15,.8],[-9,96,-.8,1.2]].forEach(([r,a,l,c],u)=>{const d=u===0?La(t,e):Ji(ii(u+1));d.position.set(r,0,a),d.scale.setScalar(c),d.rotation.y=l,d.rotation.z=u%3*.06-.06,u%4===3&&(d.rotation.x=-.08),n.add(d)});const s=Ji(ii(5));s.position.set(2,0,102),s.rotation.set(1.35,.4,.3),n.add(s),Qi(n,10,20,150,60),ts(n,[[-9,30,.9],[9,55,.85],[-10,88,.95]]);const o=new Ue(52,1280/760,.1,2e3);return o.position.set(11,5.2,-8),o.lookAt(-1,2.6,55),o},audit(n){Cn(n,{sunI:1.1,ambient:.65,fogNear:30,fogFar:200}),n.fog=new Oi(15524036,30,200);const t=new R(new Jt(90,40),new $({color:15985364}));t.position.set(0,14,-16),t.rotation.y=Math.PI,n.add(t);const e=vi((h,p,m)=>{const v=h.createLinearGradient(0,0,0,m);v.addColorStop(0,"#d9e4e6"),v.addColorStop(1,"#f2e4c6"),h.fillStyle=v,h.fillRect(0,0,p,m),h.fillStyle="#c3ab7c",h.fillRect(0,m*.72,p,m*.28),h.fillStyle="rgba(180,140,90,0.6)";for(let g=0;g<14;g++){const f=16+Math.random()*40,S=20+Math.random()*60;h.fillRect(10+Math.random()*(p-50),m*.76,f,S)}},512,320),i=new R(new Jt(13,7),new $({map:e,emissiveMap:e,emissive:new _t(16773336),emissiveIntensity:.12}));i.position.set(0,7.5,-15.6),n.add(i);const s=new $({color:8019768}),o=new R(new ft(.4,7,.3),s);o.position.set(0,7.5,-15.2),n.add(o);const r=new R(new ft(13,.4,.3),s);r.position.set(0,7.5,-15.2),n.add(r);const a=Ia();n.add(a);for(const[h,p,m]of[[.7,.3,.35],[-.6,.4,-.4],[.2,-.5,.1]]){const v=K_(.9,1.2,m);v.position.set(h,1.1,p),n.add(v)}const l=J_();l.position.set(-.9,1.09,.25),l.rotation.y=.3,n.add(l);const c=Q_(.25);c.position.set(.55,1.12,.5),c.rotation.y=.4,c.userData.y0=1.12,c.userData.rz0=0,(n.userData.floaters=n.userData.floaters||[]).push(c),n.add(c);const u=Da();u.g.position.set(-1.6,0,-.5),n.add(u.g),n.add(u.light);const d=new Ue(44,1280/760,.1,2e3);return d.position.set(4.2,3.4,7.5),d.lookAt(0,1.6,-1),d},"etat-lieux"(n){Cn(n,{sunI:2.2,fogNear:60,fogFar:700});const t=new R(new Jt(24,24),new $({map:Tu(),roughness:.9}));t.rotation.x=-Math.PI/2,t.position.y=.01,n.add(t);const e=[new b(-7,.5,6),new b(-3.5,.6,1),new b(1,.7,-4),new b(5.5,.8,-7),new b(9,.9,-10)],i=new R(new Ks(new Mn(e),64,.12,8,!1),new Be({color:12618344,transparent:!0,opacity:.8}));i.position.y=-.01,n.add(i),[[-7,6,13204066],[-3.5,1,8232642],[1,-4,13805688],[5.5,-7,9416330],[9,-10,13204066]].forEach(([l,c,u])=>{const d=Au(u);d.position.set(l,0,c),n.add(d)});const o=vi((l,c,u)=>{l.fillStyle="rgba(255,255,255,0.75)",l.beginPath(),l.arc(c/2,u/2,c/2-8,0,Vs),l.fill(),l.strokeStyle="rgba(90,74,52,0.8)",l.lineWidth=5,l.stroke(),l.fillStyle="#c08a68",l.beginPath(),l.moveTo(c/2,u*.16),l.lineTo(c*.58,u*.6),l.lineTo(c*.42,u*.6),l.closePath(),l.fill(),l.fillStyle="#5a4a34",l.font="800 34px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",l.textAlign="center",l.fillText("N",c/2,u*.2)},160,160),r=new R(new Jt(2.2,2.2),new Be({map:o,transparent:!0}));r.position.set(-9.5,.05,9.5),r.rotation.x=-Math.PI/2,n.userData.compass=r,n.add(r);const a=new Ue(40,1280/760,.1,2e3);return a.position.set(13,20,11),a.lookAt(0,0,0),a},zonage(n){Cn(n,{sunI:2,fogNear:60,fogFar:700});const t=new R(new Jt(24,24),new $({map:Tu(!0),roughness:.9}));t.rotation.x=-Math.PI/2,t.position.y=.01,n.add(t),[[0,0,8232642],[6,0,12618344],[0,-6,9416330],[6,-6,13805688]].forEach(([r,a,l])=>{const c=Au(l);c.position.set(r,0,a),n.add(c)});const i=vi((r,a,l)=>{r.fillStyle="rgba(240,236,220,0.95)",Ao(r,0,0,a,l,16),r.fill();const c=[["#7d9ec2","Zone A"],["#c08a68","Zone B"],["#8fae8a","Zone C"],["#d2a878","Zone D"]];r.font="700 30px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",r.textAlign="left",c.forEach(([u,d],h)=>{r.fillStyle=u,r.beginPath(),r.arc(46,60+h*70,16,0,Vs),r.fill(),r.fillStyle="#3a2a18",r.fillText(d,78,72+h*70)})},360,320),s=new R(new Jt(3.4,3),new Be({map:i,transparent:!0}));s.position.set(-8.8,.05,-8),s.rotation.x=-Math.PI/2,n.add(s);const o=new Ue(40,1280/760,.1,2e3);return o.position.set(-10,21,14),o.lookAt(0,0,-1),o},"constitution-lots"(n,t,e){Cn(n,{sunX:40,sunY:130,sunI:2.4});const i=new Mn([new b(0,0,-20),new b(0,0,150)]),s=gi(i,4.4,ie.path,zs(),400);s.position.y=.01,n.add(s);const o=Z_(ii(0));o.position.set(-6.4,0,42),o.rotation.y=.35,n.add(o);const r=Ji(ii(3));r.position.set(6.6,0,64),r.rotation.y=-.5,n.add(r);const a=j_(ii(2));a.position.set(-6.2,0,88),a.rotation.y=.4,n.add(a);const l=$_(ii(1));l.position.set(6.4,0,108),l.rotation.y=-.45,n.add(l),Qi(n,12,30,180,80),ts(n,[[-9,22,1.1],[9,34,1],[-10,78,1.15],[10,122,1.05]]);for(let u=0;u<=4;u++){const d=20+u*24,h=u%2===0?1:-1,p=Os(new b(h*6,0,d),h);n.add(p);const m=Bs(new b(h*6,0,d),h);n.add(m.group)}for(const u of[58,100]){const d=is(new b(4.6,0,u),1);n.add(d)}const c=new Ue(46,1280/760,.1,2e3);return c.position.set(8.5,4.6,4),c.lookAt(-1,3,62),c},"mise-concession"(n){Cn(n,{sunI:1.2,ambient:.7,fogNear:30,fogFar:200}),n.fog=new Oi(15524036,30,200);const t=new R(new Jt(90,40),new $({color:15985364}));t.position.set(0,14,-16),t.rotation.y=Math.PI,n.add(t);const e=Ia();n.add(e);const i=new R(new Jt(2.3,1.6),new $({color:16050896,roughness:.85}));i.position.set(.1,1.08,.15),i.rotation.x=-.18,n.add(i);const s=t1();s.position.set(1.05,1.1,.5),s.rotation.y=-.5,s.rotation.z=-.12,s.userData.y0=1.1,s.userData.rz0=-.12,(n.userData.floaters=n.userData.floaters||[]).push(s),n.add(s);const o=Cu();o.position.set(-1.15,1.05,-.1),o.rotation.y=.3,o.userData.y0=1.05,o.userData.rz0=0,(n.userData.floaters=n.userData.floaters||[]).push(o),n.add(o);const r=new R(new ai(.22,.04,10,24),new $({color:ie.bronze,metalness:.8,roughness:.3}));r.position.set(-.7,1.12,.6),r.rotation.x=Math.PI/2.2,r.rotation.z=.3,n.add(r);const a=Da();a.g.position.set(-1.7,0,-.6),n.add(a.g),n.add(a.light);const l=new Ue(42,1280/760,.1,2e3);return l.position.set(3.9,3.6,6.8),l.lookAt(-.1,1.7,-.4),l},attribution(n){Cn(n,{sunI:1.2,ambient:.7,fogNear:30,fogFar:200}),n.fog=new Oi(15524036,30,200);const t=new R(new Jt(90,40),new $({color:15985364}));t.position.set(0,14,-16),t.rotation.y=Math.PI,n.add(t);const e=Ia();n.add(e);const i=e1();i.position.set(.9,1.12,.2),i.rotation.y=.7,i.userData.y0=1.12,i.userData.rz0=0,(n.userData.floaters=n.userData.floaters||[]).push(i),n.add(i);for(const[l,c,u]of[[-1.2,.4,.5],[-.5,-.4,-.6],[.4,.6,.1]]){const d=n1(u);d.position.set(l,1.06,c),n.add(d)}const s=Cu(3829823,"ADMIS");s.position.set(-1.4,1.05,-.5),s.rotation.y=-.4,n.add(s);const o=new R(new ai(.24,.06,12,28),new $({color:13805688,metalness:.9,roughness:.25}));o.position.set(.1,1.15,-.6),o.rotation.x=Math.PI/2.4,o.userData.y0=1.15,o.userData.rz0=0,(n.userData.floaters=n.userData.floaters||[]).push(o),n.add(o);const r=Da();r.g.position.set(-1.7,0,-.6),n.add(r.g),n.add(r.light);const a=new Ue(42,1280/760,.1,2e3);return a.position.set(4.1,3.5,7.2),a.lookAt(0,1.6,-.2),a},gestion(n){Cn(n,{sunX:20,sunY:150,sunI:2.5});const t=new Mn([new b(0,0,-20),new b(0,0,150)]),e=gi(t,4.4,ie.path,zs(),400);e.position.y=.01,n.add(e);const i=new yt,s=new $({color:15195071,roughness:.85}),o=new R(new ft(14,10,8),s);o.position.y=5,o.castShadow=!0,i.add(o);const r=new R(new bt(8,8.6,1.6,4),s);r.position.y=11,r.rotation.y=Math.PI/4,i.add(r);const a=new $({color:13614751,roughness:.6});for(const p of[-5,-3.3,-1.6,0,1.6,3.3,5]){const m=new R(new bt(.28,.34,4.6,10),a);m.position.set(p,2.3,4.05),i.add(m)}const l=vi((p,m,v)=>{p.fillStyle="#d8c9a6",p.fillRect(0,0,m,v);for(let g=0;g<3;g++)for(let f=0;f<6;f++)Math.random()<.75&&(p.fillStyle=Math.random()<.4?"#b98a5a":"#c9a25f",p.globalAlpha=.6,p.fillRect(10+f*(m/6),10+g*(v/3.4),m/8,v/4.4),p.globalAlpha=1)},512,256),c=new R(new Jt(10,4.4),new $({map:l,emissiveMap:l,emissive:new _t(16114365),emissiveIntensity:.15}));c.position.set(0,6.2,4.06),i.add(c),i.position.set(0,0,58),i.rotation.y=Math.PI,n.add(i);const u=new R(new bt(.08,.12,8,8),new $({color:6048304}));u.position.set(-8,4,56),n.add(u);const d=new R(new Jt(2.6,1.5),new $({color:ie.terracotta,side:Ge,roughness:.8}));d.position.set(-6.6,7.4,56),d.rotation.y=.2,n.userData.flag=d,n.add(d);for(let p=0;p<3;p++){const m=Ji(ii(p+1));m.position.set(-6.4,0,30+p*22),m.rotation.y=.45,n.add(m)}Qi(n,10,80,200,90),ts(n,[[-9,20,1],[9,44,1.1],[9.5,92,1]]);for(let p=0;p<=4;p++){const m=14+p*26,v=p%2===0?1:-1,g=Os(new b(v*6,0,m),v);n.add(g);const f=Bs(new b(v*6,0,m),v);n.add(f.group)}const h=new Ue(44,1280/760,.1,2e3);return h.position.set(10,3.6,18),h.lookAt(0,4.5,58),h},evaluation(n){Cn(n,{sunI:1,ambient:.55,fogNear:30,fogFar:300}),n.fog=new Oi(15524036,30,300),[{pct:.9,color:"#d2a878",label:"AUDIT",x:-4},{pct:.78,color:"#c08a68",label:"CONCESSION",x:0},{pct:.86,color:"#7da878",label:"GESTION",x:4}].forEach(({pct:r,color:a,label:l,x:c})=>{const u=new R(new bt(1.5,1.8,.3,20),new $({color:6048304,roughness:.7}));u.position.set(c,.15,0),n.add(u);const d=new R(new bt(.14,.16,3.4,10),new $({color:ie.walnut,roughness:.6}));d.position.set(c,1.85,0),n.add(d);const h=i1(r,a,l),p=new R(new Jt(3.6,3.6),new $({map:h,emissiveMap:h,emissive:new _t(16777215),emissiveIntensity:.08}));p.position.set(c,3.9,0),p.rotation.x=.25,n.add(p);const m=new Zl(15246172,.2,8,2);m.position.set(c,3.2,2),n.add(m)});const e=[new b(-6,.8,2.5),new b(-3,1.6,1.4),new b(0,2.6,0),new b(3,3.8,-1.2),new b(6,5.2,-2.4)],i=new R(new Ks(new Mn(e),64,.1,8,!1),new Be({color:5742687,transparent:!0,opacity:.9}));n.add(i);const s=new R(new ln(.3,.8,12),new $({color:5742687,emissive:5742687,emissiveIntensity:.6}));s.position.set(6.4,5.6,-2.7),s.rotation.z=-.6,n.add(s);const o=new Ue(46,1280/760,.1,2e3);return o.position.set(7,3.4,11),o.lookAt(0,3.2,-1),o},"mise-a-jour"(n){Cn(n,{sunX:-80,sunY:110,sunI:2.2});const t=new Mn([new b(0,0,-20),new b(0,0,150)]),e=gi(t,4.4,ie.path,zs(),400);e.position.y=.01,n.add(e);const i=Ru(1);i.position.set(-8,0,52),n.userData.cranes=[i],n.add(i);const s=Ru(.7);s.position.set(8,0,84),n.userData.cranes.push(s),n.add(s);const o=new R(new ft(7,9,7),new $({color:2760726,roughness:.9}));o.position.set(0,4.5,62),o.castShadow=!0,n.add(o);const r=new $({color:7034424,roughness:.8});for(let h=0;h<4;h++){const p=new R(new ft(8,.14,.14),r);p.position.set(0,1.5+h*2.3,3.6),n.add(p)}const a=Ji(ii(4));a.position.set(0,14,66),a.rotation.x=.15,a.userData.y0=14,n.userData.hoisted=a,n.add(a);const l=new kr({color:6048304}),c=[new b(-8,18,52),new b(0,15,65)],u=new Le().setFromPoints(c);n.add(new Xl(u,l)),Qi(n,10,90,220,85),ts(n,[[-9,30,.9],[9,110,1]]);const d=new Ue(48,1280/760,.1,2e3);return d.position.set(11,5.5,6),d.lookAt(0,8,62),d},quiz(n){Cn(n,{sunX:0,sunY:130,sunI:2});const t=vi((u,d,h)=>{u.clearRect(0,0,d,h),u.fillStyle="rgba(253,250,242,0.92)",Ao(u,0,0,d,h,40),u.fill(),u.strokeStyle="rgba(138,111,69,0.5)",u.lineWidth=8,Ao(u,8,8,d-16,h-16,36),u.stroke(),u.shadowColor="rgba(122,95,56,0.55)",u.shadowBlur=40,u.fillStyle="#7a5f38",u.font="800 620px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",u.textAlign="center",u.textBaseline="middle",u.fillText("?",d/2,h*.52),u.shadowBlur=0},640,640),e=new R(new Jt(7,7),new Be({map:t,transparent:!0}));e.position.set(0,8.5,30),n.add(e);const i=new ri(new Yn({map:On(.3,"rgba(232,163,92,0.28)"),transparent:!0,blending:Xe,depthWrite:!1}));i.position.set(0,8.5,28.5),i.scale.setScalar(18),n.add(i);const s=new yt,o=new $({color:13805688,metalness:.85,roughness:.28}),r=new R(new bt(.9,1,.3,16),o);s.add(r);const a=new R(new bt(.28,.3,1.2,12),o);a.position.y=.75,s.add(a);const l=new R(new bt(.9,.45,1.1,18),o);l.position.y=1.7,s.add(l);for(const u of[-1,1]){const d=new R(new ai(.4,.07,10,20,Math.PI),o);d.position.set(u*.78,1.5,0),d.rotation.z=u*Math.PI/2,s.add(d)}s.position.set(-3.6,0,40),n.userData.trophy=s,n.add(s),Qi(n,12,60,200,90),ts(n,[[-9,60,1],[9,90,1.1]]),n.userData.confetti=s1(n,70);const c=new Ue(46,1280/760,.1,2e3);return c.position.set(6,3.6,8),c.lookAt(0,6.5,34),c}};function o1(n,t,e,i=1280,s=760){if(Ur)return null;let o;try{o=new Wl({canvas:e,antialias:!cs(),alpha:!1}),o.toneMapping=Io,o.toneMappingExposure=1.2,o.shadowMap.enabled=!cs(),o.shadowMap.enabled&&(o.shadowMap.type=Pl),o.setPixelRatio(Math.min(window.devicePixelRatio||1,cs()?1:1.25)),o.setSize(i,s,!1)}catch{return Ur=!0,null}let r=null,a=null;try{r=new ql,a=(Nr[n.id]||Nr.presentation)(r,n,t),a.aspect=i/s,a.updateProjectionMatrix()}catch(z){return console.warn("Illustration 3D en direct indisponible pour",n.id,z),o.dispose(),null}const l=a.position.clone(),c=new b;a.getWorldDirection(c);const u=l.clone().addScaledVector(c,40),d=Math.min(3,Math.max(.6,l.length()/14)),h=r.userData.dust||null,p=r.userData.sun||null,m=r.userData.palms||[],v=r.userData.cars||[],g=r.userData.cranes||[],f=r.userData.hoisted||null,S=r.userData.trophy||null,w=r.userData.flag||null,E=r.userData.compass||null,G=r.userData.confetti||null,x=r.userData.floaters||[];function U(z,y,M){h&&(h.rotation.y+=y*.02,h.position.y=Math.sin(z*.4)*.3,h.material.opacity=.26+Math.sin(z*.8)*.08),p&&(p.sprite.material.opacity=.82+Math.sin(z*.5)*.1,p.halo.material.opacity=.28+Math.sin(z*.4+1)*.06);for(let I=0;I<m.length;I++)m[I].rotation.z=Math.sin(z*.8+I*1.7)*.05;for(let I=0;I<v.length;I++){const k=v[I];k.position.z-=y*.9,k.position.x=(k.userData.x0||0)+Math.sin(z*.5+I*2.1)*.4,k.position.z<-14&&(k.position.z=132,k.position.x=(Math.random()-.5)*6,k.userData.x0=k.position.x)}if(G){const I=G.geometry.attributes.position,k=I.array;for(let F=0;F<I.count;F++)k[F*3+1]-=y*.7,k[F*3+1]<.2&&(k[F*3+1]=6+Math.random()*3,k[F*3]=(Math.random()-.5)*14,k[F*3+2]=(Math.random()-.5)*14);I.needsUpdate=!0}S&&(S.rotation.y=Math.sin(z*.6)*.12);for(let I=0;I<g.length;I++){const k=g[I];k.rotation.y=(k.userData.baseY||0)+Math.sin(z*.15+I*2.4)*.12}f&&(f.rotation.z=Math.sin(z*1.1)*.03,f.position.y=(f.userData.y0||14)+Math.sin(z*.7)*.25),w&&(w.rotation.z=Math.sin(z*1.8)*.16+Math.sin(z*3.1)*.05),E&&(E.rotation.z=z*.15);for(let I=0;I<x.length;I++){const k=x[I];k.position.y=(k.userData.y0||k.position.y)+Math.sin(z*1.2+I*1.3)*.03,k.rotation.z=(k.userData.rz0||0)+Math.sin(z*.9+I)*.02}a.position.set(l.x+Math.sin(M*Math.PI)*.5*d+Math.sin(z*.3)*.06*d,l.y+Math.cos(M*Math.PI)*.25*d+Math.sin(z*.24)*.05*d,l.z+(M-.5)*1.2*d+Math.cos(z*.21)*.07*d),a.lookAt(u),o.render(r,a)}return{canvas:o.domElement,render:U,dispose(){o.dispose(),r.traverse(z=>{if(z.geometry&&z.geometry.dispose(),z.material){const y=Array.isArray(z.material)?z.material:[z.material];for(const M of y)M.map&&M.map.dispose(),M.dispose()}})}}}const Ua=new Map;function r1(n,t,e=1280,i=760){if(Ua.has(n.id))return Ua.get(n.id);const s=Y_();if(!s)return null;try{s.setPixelRatio(cs()?1:1.5),s.setSize(e,i);const o=new ql,a=(Nr[n.id]||Nr.presentation)(o,n,t);a.aspect=e/i,a.updateProjectionMatrix(),s.render(o,a);const l=s.domElement.toDataURL("image/jpeg",.85);return a1(o),Ua.set(n.id,l),l}catch(o){return console.warn("Illustration 3D indisponible pour",n.id,o),null}}function a1(n){const t=new Set,e=new Set;n.traverse(i=>{i.geometry&&i.geometry.dispose();const s=Array.isArray(i.material)?i.material:i.material?[i.material]:[];for(const o of s)if(!e.has(o)){e.add(o);for(const r of[o.map,o.emissiveMap])r&&!t.has(r)&&(t.add(r),r.dispose());o.dispose()}})}function l1({onExit:n,onScrollTo:t,onQuiz:e}){const i=document.getElementById("ui-course"),s=i.querySelector("#course-toc"),o=i.querySelector("#course-toc-select"),r=i.querySelector("#course-sections"),a=i.querySelector("#course-cover"),l=i.querySelector("#course-close"),c=i.querySelector("#course-quiz-btn"),u=i.querySelector(".course-main"),d=t||(y=>u.scrollTo({top:y,behavior:"smooth"}));let h=!1;a.innerHTML=`
    <div class="course-cover-kicker">${Ca.module} — Formation :</div>
    <h1 class="course-cover-title">${Ca.title}</h1>
    <div class="course-cover-sub">${Ca.subtitle}</div>
    <div class="course-cover-rule"></div>
    <p class="course-cover-desc">Lecture complète et illustrée du cours. Avancez section par section, chaque étape est accompagnée d'une illustration de son contexte.</p>
    <div class="course-cover-meta"><span>${rn.length} étapes</span><span>12 questions finales</span></div>
  `;const p=[],m=[];br.forEach((y,M)=>{const I=rn.filter(k=>k.chapter===M);I.length&&(p.push(`<div class="toc-chapter"><div class="toc-chapter-name">${y.name}</div><div class="toc-chapter-label">${y.label}</div></div>`),I.forEach(k=>{p.push(`<a href="#course-sec-${k.id}" class="toc-item" data-id="${k.id}"><span class="toc-num">${k.num}</span><span>${k.title}</span></a>`)}))}),rn.forEach(y=>{const M=br[y.chapter],I=y.id==="quiz";let k="";I?k=`<ul class="course-bullets">${y.bullets.map(F=>`<li>${F}</li>`).join("")}</ul>`:k=y.content.map(F=>`<p><span class="course-body-t">${F.t}</span>${F.b}</p>`).join(""),m.push(`
      <section class="course-section" id="course-sec-${y.id}">
        <canvas class="course-illus" role="img" aria-label="Illustration — ${y.title}"></canvas>
        <div class="course-sec-meta">
          <span class="course-sec-chapter">${M?`${M.name} · ${M.label}`:""}</span>
          <span class="course-sec-num">${y.num} / ${String(rn.length).padStart(2,"0")}</span>
        </div>
        <h2 class="course-sec-title">${y.title}</h2>
        <div class="course-sec-rule"></div>
        <div class="course-sec-content">${k}</div>
      </section>
    `)}),s.innerHTML=p.join(""),r.innerHTML=m.join("");const v=[];br.forEach((y,M)=>{const I=rn.filter(k=>k.chapter===M);I.length&&(v.push(`<optgroup label="${y.name}">`),I.forEach(k=>v.push(`<option value="${k.id}">${k.num} · ${k.title}</option>`)),v.push("</optgroup>"))}),o.innerHTML=v.join("");const g=[];r.querySelectorAll(".course-illus").forEach(y=>{const M=y.closest(".course-section").id.replace("course-sec-",""),I=document.createElement("canvas");X_(I,M,1280,760),y.style.backgroundImage=`url(${I.toDataURL("image/jpeg",.86)})`,y.style.backgroundSize="cover",y.style.backgroundPosition="center",g.push({canvas:y,id:M,live:null,raf:0,p:0,running:!1})});const f=window.matchMedia("(prefers-reduced-motion: reduce)").matches;function S(y){const M=y.getBoundingClientRect(),I=u.getBoundingClientRect(),k=M.height+I.height||1;return Math.min(1,Math.max(0,(I.bottom-M.top)/k))}function w(y){if(!y.live||y.running)return;y.running=!0,y.p=S(y.canvas);let M=performance.now();const I=k=>{if(!y.running)return;const F=Math.min(.05,Math.max(.001,(k-M)/1e3));M=k,y.p=S(y.canvas),y.live.render(k*.001,F,y.p),y.raf=requestAnimationFrame(I)};y.raf=requestAnimationFrame(I)}function E(y){y.running&&(y.running=!1,cancelAnimationFrame(y.raf))}const G=new IntersectionObserver(y=>{for(const M of y){const I=g.find(k=>k.canvas===M.target);if(I)if(M.isIntersecting){if(!I.live){const k=rn.find(F=>F.id===I.id);if(k&&(f||(I.live=o1(k,rn.indexOf(k),I.canvas,1280,760)),!I.live)){const F=r1(k,rn.indexOf(k));F&&(I.canvas.style.backgroundImage=`url(${F})`)}}w(I)}else E(I)}},{root:u,rootMargin:"420px 0px 420px 0px",threshold:0});g.forEach(y=>G.observe(y.canvas)),s.addEventListener("click",y=>{const M=y.target.closest(".toc-item");if(!M)return;const I=document.getElementById("course-sec-"+M.dataset.id);I&&(d(I.offsetTop-90),s.querySelectorAll(".toc-item").forEach(k=>k.classList.toggle("active",k===M)))});function x(){let y=rn[0].id;for(const M of rn){const I=document.getElementById("course-sec-"+M.id);I&&I.offsetTop-120<=u.scrollTop&&(y=M.id)}s.querySelectorAll(".toc-item").forEach(M=>M.classList.toggle("active",M.dataset.id===y)),o.value!==y&&(o.value=y)}u.addEventListener("scroll",x,{passive:!0}),o.addEventListener("change",()=>{const y=document.getElementById("course-sec-"+o.value);y&&d(y.offsetTop-90)}),l.addEventListener("click",n),c.addEventListener("click",e);function U(){h=!0,document.body.classList.add("mode-course"),setTimeout(()=>x(),80)}function z(){h=!1,document.body.classList.remove("mode-course"),g.forEach(y=>E(y))}return{open:U,close:z,isOpen:()=>h}}const Pu=["Chargé de communication","Ingénieur en signalétique urbaine","Chef de projet panneautique","Directeur des affaires publiques","Auditeur des espaces publicitaires","Responsable du foncier publicitaire","Architecte des espaces urbains","Expert en mobilité urbaine"],c1=["La ville se lit comme un livre.","Bien orienter, c'est respecter.","Un espace bien signalé est un espace partagé.","La clarté est une forme de courtoisie urbaine.","Chaque panneau raconte un trajet.","Rendre visible, c'est rendre accessible.","La signalétique pense à ceux qui arrivent.","Une ville lisible est une ville accueillante.","L'information juste, au bon endroit, au bon moment.","Le domaine public se mérite : il se partage."],Er=8;function u1(n=Er){return Array.from({length:n},(t,e)=>{const i=(e+1)*2654435761%2147483647,s=Ad(i);return{first:"Membre",last:String(e+1),name:`Membre ${e+1}`,role:Pu[e%Pu.length],quote:xo(s,c1),seed:i}})}function Ad(n){return function(){n|=0,n=n+1831565813|0;let t=Math.imul(n^n>>>15,1|n);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function xo(n,t){return t[Math.floor(n()*t.length)]}function d1(n){const i=document.createElement("canvas");i.width=480,i.height=640;const s=i.getContext("2d"),o=Ad(n),r=s.createLinearGradient(0,0,0,640);r.addColorStop(0,"#f4e9cf"),r.addColorStop(.55,"#ead8b5"),r.addColorStop(1,"#d9bf93"),s.fillStyle=r,s.fillRect(0,0,480,640);const a=s.createRadialGradient(480/2,640*.4,20,480/2,640*.4,480*.62);a.addColorStop(0,"rgba(255,247,226,0.95)"),a.addColorStop(1,"rgba(255,247,226,0)"),s.fillStyle=a,s.fillRect(0,0,480,640),s.fillStyle="rgba(90,70,45,0.10)",s.beginPath(),s.moveTo(480*.1,640),s.quadraticCurveTo(480*.12,640*.4,480*.5,640*.34),s.quadraticCurveTo(480*.88,640*.4,480*.9,640),s.closePath(),s.fill(),s.fillStyle="rgba(90,70,45,0.14)",s.beginPath(),s.ellipse(480/2,640*.92,480*.34,640*.04,0,0,Math.PI*2),s.fill();const l=xo(o,["#c98d63","#b97b53","#a06a48","#d49a6f","#8a5a3e"]),c=xo(o,["#2c2018","#3a2c1f","#4a3423","#221a12"]),u=xo(o,["#1e1812","#33261a"]),d=xo(o,["#9a8157","#b08a63","#6f7f56","#7d8aa6","#8a6f7a","#a26f4e","#5f7a4a","#84673f"]),h=o()<.22,p=o()<.16,m=o()<.34;s.fillStyle=d,s.beginPath(),s.moveTo(480*.14,640),s.quadraticCurveTo(480*.13,640*.78,480*.16,640*.64),s.quadraticCurveTo(480*.21,640*.55,480*.5,640*.56),s.quadraticCurveTo(480*.79,640*.55,480*.84,640*.64),s.quadraticCurveTo(480*.87,640*.78,480*.86,640),s.closePath(),s.fill(),s.fillStyle="rgba(0,0,0,0.07)",s.beginPath(),s.moveTo(480*.5,640*.56),s.quadraticCurveTo(480*.5,640*.7,480*.5,640),s.lineTo(480*.62,640),s.quadraticCurveTo(480*.55,640*.62,480*.5,640*.56),s.closePath(),s.fill(),s.strokeStyle="rgba(58,46,31,0.25)",s.lineWidth=3,s.beginPath(),s.moveTo(480*.34,640*.6),s.quadraticCurveTo(480*.5,640*.68,480*.66,640*.6),s.stroke(),s.fillStyle=l,s.fillRect(480*.44,640*.5,480*.12,640*.14);const v=480*.5,g=640*.415,f=480*.155,S=640*.21;s.fillStyle=l,s.beginPath(),s.ellipse(v,g,f,S,0,0,Math.PI*2),s.fill(),s.beginPath(),s.ellipse(v-f,640*.46,7,12,0,0,Math.PI*2),s.fill(),s.beginPath(),s.ellipse(v+f,640*.46,7,12,0,0,Math.PI*2),s.fill(),s.fillStyle=c,p?(s.beginPath(),s.ellipse(v,g-S*1.25,640*.055,640*.05,0,0,Math.PI*2),s.fill(),s.beginPath(),s.ellipse(v,g-S*.7,f*.98,S*.75,0,0,Math.PI*2),s.fill()):(s.beginPath(),s.arc(v,g,f,Math.PI*1.05,Math.PI*1.95),s.quadraticCurveTo(v-f*1.12,g-S*.55,v-f*.75,g-S*.6),s.quadraticCurveTo(v,g-S*1.28,v+f*.75,g-S*.6),s.quadraticCurveTo(v+f*1.12,g-S*.55,v+f,g),s.closePath(),s.fill()),m&&(s.fillStyle=u,s.beginPath(),s.ellipse(v-f*.98,g+S*.4,f*.3,S*.95,0,0,Math.PI*2),s.fill(),s.beginPath(),s.ellipse(v+f*.98,g+S*.4,f*.3,S*.95,0,0,Math.PI*2),s.fill(),s.fillStyle=c,s.beginPath(),s.ellipse(v,g-S*.55,f*1.05,S*.8,0,0,Math.PI*2),s.fill()),s.strokeStyle="rgba(58,46,31,0.55)",s.lineWidth=3.5,s.lineCap="round",s.beginPath(),s.moveTo(v-f*.62,g-S*.32),s.quadraticCurveTo(v-f*.42,g-S*.42,v-f*.2,g-S*.34),s.stroke(),s.beginPath(),s.moveTo(v+f*.2,g-S*.34),s.quadraticCurveTo(v+f*.42,g-S*.42,v+f*.62,g-S*.32),s.stroke(),s.fillStyle="rgba(46,34,22,0.85)",s.beginPath(),s.ellipse(v-f*.42,g+S*.06,4.5,3.2,0,0,Math.PI*2),s.fill(),s.beginPath(),s.ellipse(v+f*.42,g+S*.06,4.5,3.2,0,0,Math.PI*2),s.fill(),h&&(s.strokeStyle="rgba(90,70,45,0.55)",s.lineWidth=2.5,s.beginPath(),s.ellipse(v-f*.42,g+S*.06,f*.22,S*.16,0,0,Math.PI*2),s.stroke(),s.beginPath(),s.ellipse(v+f*.42,g+S*.06,f*.22,S*.16,0,0,Math.PI*2),s.stroke(),s.beginPath(),s.moveTo(v-f*.2,g+S*.06),s.lineTo(v+f*.2,g+S*.06),s.stroke()),s.strokeStyle="rgba(120,80,55,0.35)",s.lineWidth=2.5,s.beginPath(),s.moveTo(v,g+S*.1),s.quadraticCurveTo(v+f*.08,g+S*.28,v-f*.02,g+S*.34),s.stroke(),s.strokeStyle="rgba(120,80,55,0.5)",s.lineWidth=3,s.beginPath(),s.moveTo(v-f*.16,g+S*.62),s.quadraticCurveTo(v,g+S*.72,v+f*.16,g+S*.62),s.stroke(),s.fillStyle="rgba(255,246,224,0.22)",s.beginPath(),s.ellipse(v-f*.72,g+S*.5,S*.5,S*.16,.5,0,Math.PI*2),s.fill();const w=s.createRadialGradient(480/2,640*.46,480*.2,480/2,640*.46,480*.78);w.addColorStop(0,"rgba(70,52,32,0)"),w.addColorStop(1,"rgba(70,52,32,0.30)"),s.fillStyle=w,s.fillRect(0,0,480,640);for(let E=0;E<1400;E++){const G=.02+o()*.04;s.fillStyle=o()<.5?`rgba(58,46,31,${G.toFixed(3)})`:`rgba(255,250,238,${G.toFixed(3)})`,s.fillRect(o()*480,o()*640,1.4,1.4)}return i.toDataURL("image/jpeg",.88)}const So=(n,t,e)=>Math.max(t,Math.min(e,n)),Na=n=>n>=1?1:1-Math.pow(2,-10*n),zn=n=>1-Math.pow(1-n,4),za=n=>1-Math.pow(1-n,5);function h1(n,t,e){const i=Math.abs(n-t);return i>=e/2?0:.5+.5*Math.cos(i/(e/2)*Math.PI)}const Fe={portrait:{start:0,dur:.9},name:{start:.55,dur:.5},role:{start:.85,dur:.4},quote:{start:.92,dur:.4},accent:{start:1.15,dur:.35}},Rn={accent:{start:0,dur:.21},role:{start:.09,dur:.24},quote:{start:.16,dur:.24},name:{start:.18,dur:.3},portrait:{start:.27,dur:.54}},Fa=.018,Lu=.4;function tn(n,t,e){return So((n-t)/e,0,1)}function f1({onExit:n}={}){const t=document.getElementById("ui-team"),e=t.querySelector("#team-scroll"),i=t.querySelector("#team-corridor"),s=t.querySelector(".team-track"),o=t.querySelector("#team-count"),r=t.querySelector("#team-close"),a=window.matchMedia("(prefers-reduced-motion: reduce)").matches,l=u1(Er),c=new Array(Er),u=document.createElement("section");u.className="team-cover",u.innerHTML=`
    <div class="team-cover-kicker">Panneautique · Domaine public</div>
    <h2 class="team-cover-title">L'équipe.</h2>
    <div class="team-cover-rule"></div>
    <p class="team-cover-desc">Huit profils complémentaires, une même mission : rendre le domaine public lisible, respecté et bien partagé. Glissez le long du couloir pour les rencontrer un à un.</p>
    <div class="team-cover-meta">
      <span class="team-cover-chip">08 membres</span>
      <span class="team-cover-chip">1 mission commune</span>
    </div>
    <button class="team-cover-cta" type="button">Découvrir l'équipe →</button>
  `,s.innerHTML=l.map((L,O)=>{const st=L.name.split("").map(It=>`<span class="tl">${It===" "?" ":It}</span>`).join(""),ct=(L.first[0]+L.last[0]).toUpperCase();return`
        <article class="team-cell" data-i="${O}">
          <div class="team-niche">
            <div class="team-arch"></div>
            <div class="team-glow"></div>
            <div class="team-portrait-wrap">
              <div class="team-portrait"></div>
            </div>
            <span class="team-monogram">${ct}</span>
          </div>
          <div class="team-info">
            <div class="team-name">${st}</div>
            <div class="team-role"></div>
            <div class="team-quote"></div>
            <div class="team-accent"></div>
          </div>
        </article>`}).join(""),s.insertBefore(u,s.firstChild);const d=[],h=s.querySelector(".team-cover-cta"),p={el:u,cx:()=>u.offsetLeft+u.offsetWidth/2};s.querySelectorAll(".team-cell").forEach((L,O)=>{const st={el:L,i:O,state:"idle",t0:0,pulseAt:0,f:null,phase:O*.9,restRot:O%2===0?-18:18,wrap:L.querySelector(".team-portrait-wrap"),portrait:L.querySelector(".team-portrait"),glow:L.querySelector(".team-glow"),mono:L.querySelector(".team-monogram"),name:L.querySelector(".team-name"),letters:[...L.querySelectorAll(".team-name .tl")],role:L.querySelector(".team-role"),quote:L.querySelector(".team-quote"),accent:L.querySelector(".team-accent")};st.portrait.style.backgroundImage=`url("${c[O]=d1(l[O].seed)}")`,st.role.textContent=l[O].role,st.quote.textContent=l[O].quote,st.accent.style.transformOrigin=O%2===0?"left center":"right center",L.addEventListener("click",()=>j(O)),m(st),d.push(st)});function m(L){L.wrap.style.transform="translateZ(-50px) scale(0.85)",L.portrait.style.filter="grayscale(35%) blur(4px) brightness(0.4)",L.glow.style.opacity="0",L.mono.style.opacity="0",L.mono.style.transform="scale(0.6) translateY(6px)",L.name.style.opacity="0",L.name.style.transform="translateY(24px)",L.name.style.filter="blur(6px)",L.role.style.opacity="0",L.role.style.transform="translateY(16px)",L.role.style.letterSpacing="0.15em",L.quote.style.opacity="0",L.quote.style.transform="translateY(12px)",L.accent.style.transform="scaleX(0)",L.accent.style.filter="";for(const O of L.letters)O.style.opacity="0",O.style.transform="translateY(12px)",O.style.filter="blur(6px)"}let v=null;function g(){v||(v=new Oa({wrapper:e,content:e,orientation:"horizontal",smoothWheel:!0,duration:1.15,easing:L=>1-Math.pow(1-L,3),wheelMultiplier:1.1}))}function f(L){return d[L].el.offsetLeft+d[L].el.offsetWidth/2}function S(){const L=e.scrollLeft+e.clientWidth/2;if(Math.abs(p.cx()-L)<e.clientWidth*.32)return-1;let O=0,st=1/0;for(let ct=0;ct<d.length;ct++){const It=Math.abs(f(ct)-L);It<st&&(st=It,O=ct)}return O}let w=-1;function E(){o.textContent=w<0?"L'équipe":`${String(w+1).padStart(2,"0")} / ${String(Er).padStart(2,"0")}`}function G(L,O,st=0,ct=1){const It=-50+110*O,Vt=.85+(.75+st)*O,Zt=Math.sin(So(O,0,1)*Math.PI)*15,ge=L.restRot*Math.sin(So(O,0,1)*Math.PI);L.wrap.style.transform=`translateZ(${It.toFixed(1)}px) translateY(${(-Zt).toFixed(1)}px) rotateY(${ge.toFixed(2)}deg) scale(${Vt.toFixed(4)})`,L.portrait.style.filter=`grayscale(${((1-O)*35).toFixed(1)}%) blur(${(4*(1-O)).toFixed(1)}px) brightness(${(.4+.6*O).toFixed(3)})`,L.glow.style.opacity=(O*ct).toFixed(3),L.mono.style.opacity=O.toFixed(3),L.mono.style.transform=`scale(${(.6+.4*O).toFixed(4)}) translateY(${(6*(1-O)).toFixed(1)}px)`,L.el.style.transform=`translateZ(${(-50*(1-O)).toFixed(1)}px) scale(${(.85+.15*O).toFixed(4)})`}function x(L,O,st){L.name.style.opacity=O.toFixed(3),L.name.style.transform=`translateY(${(24*(1-O)).toFixed(1)}px)`,L.name.style.filter=`blur(${(6*(1-O)).toFixed(1)}px)`;for(let ct=0;ct<L.letters.length;ct++){const It=st?st[ct]:O,Vt=L.letters[ct];Vt.style.opacity=It.toFixed(3),Vt.style.transform=`translateY(${(12*(1-It)).toFixed(1)}px)`,Vt.style.filter=`blur(${(6*(1-It)).toFixed(1)}px)`}}function U(L,O,st){L.role.style.opacity=O.toFixed(3),L.role.style.transform=`translateY(${(16*(1-O)).toFixed(1)}px)`,L.role.style.letterSpacing=`${(.15-.07*O).toFixed(3)}em`;const ct=st??O;L.quote.style.opacity=ct.toFixed(3),L.quote.style.transform=`translateY(${(12*(1-ct)).toFixed(1)}px)`}function z(L,O){L.accent.style.transform=`scaleX(${O.toFixed(4)})`}function y(L,O){if(L.state==="entering"){const st=O-L.t0;return{portrait:Na(tn(st,Fe.portrait.start,Fe.portrait.dur)),name:zn(tn(st,Fe.name.start,Fe.name.dur)),role:zn(tn(st,Fe.role.start,Fe.role.dur)),quote:zn(tn(st,Fe.quote.start,Fe.quote.dur)),accent:za(tn(st,Fe.accent.start,Fe.accent.dur)),letters:L.letters.map((ct,It)=>zn(tn(st,Fe.name.start+It*Fa,Lu)))}}return{portrait:1,name:1,role:1,quote:1,accent:1,letters:L.letters.map(()=>1)}}function M(L){const O=S();if(O===w)return;const st=w;w=O,st>=0&&d[st]&&d[st].state!=="idle"&&(d[st].f=y(d[st],L),d[st].state="leaving",d[st].t0=L,d[st].accent.style.filter=""),O>=0&&d[O].state!=="entering"&&(d[O].state="entering",d[O].t0=L),E()}function I(L,O){const st=O-L.t0,ct=tn(st,Fe.portrait.start,Fe.portrait.dur),It=Na(ct),Vt=.05*h1(ct,.78,.5),Zt=1-.55*Math.exp(-ct*16)*(1-Math.abs(Math.sin(ct*60)));G(L,It,Vt,Zt);const ge=zn(tn(st,Fe.name.start,Fe.name.dur)),re=L.letters.map((Ie,X)=>zn(tn(st,Fe.name.start+X*Fa,Lu)));x(L,ge,re),U(L,zn(tn(st,Fe.role.start,Fe.role.dur)),zn(tn(st,Fe.quote.start,Fe.quote.dur))),z(L,za(tn(st,Fe.accent.start,Fe.accent.dur))),st>=Fe.accent.start+Fe.accent.dur&&(L.state="active",L.pulseAt=O,L.accent.style.filter="brightness(1)")}function k(L,O){const st=O-L.pulseAt;if(st<.28){const ct=1+.7*Math.sin(So(st/.28,0,1)*Math.PI);L.accent.style.filter=`brightness(${ct.toFixed(2)})`}else L.accent.style.filter=""}function F(L,O){const st=O-L.t0,ct=L.f||y(L,O);z(L,ct.accent*(1-za(tn(st,Rn.accent.start,Rn.accent.dur)))),L.accent.style.filter="",U(L,ct.role*(1-zn(tn(st,Rn.role.start,Rn.role.dur))),ct.quote*(1-zn(tn(st,Rn.quote.start,Rn.quote.dur))));const It=L.letters.map((Vt,Zt)=>{const ge=Rn.name.start+(L.letters.length-1-Zt)*Fa;return ct.letters[Zt]*(1-zn(tn(st,ge,.24)))});x(L,ct.name*(1-zn(tn(st,Rn.name.start,Rn.name.dur))),It),G(L,ct.portrait*(1-Na(tn(st,Rn.portrait.start,Rn.portrait.dur)))),st>=Rn.portrait.start+Rn.portrait.dur&&(L.state="idle",L.f=null,m(L))}function Z(L,O){const st=.85+.02*(.5+.5*Math.sin(O*Math.PI*2/4+L.phase));L.el.style.transform=`translateZ(-50px) scale(${st.toFixed(4)})`}let et=0,J=!1;function rt(L){const O=L/1e3;v.raf(L),M(O);for(const st of d)st.state==="entering"?I(st,O):st.state==="active"?k(st,O):st.state==="leaving"?F(st,O):Z(st,O);i.style.transform=`rotateZ(${(Math.sin(O*.5)*.4).toFixed(3)}deg)`,et=requestAnimationFrame(rt)}function j(L){const O=Math.max(0,f(L)-e.clientWidth/2);v.scrollTo(O,{duration:1.15,easing:st=>1-Math.pow(1-st,3)}),a&&requestAnimationFrame(()=>Pt())}function gt(){const L=Math.max(0,p.cx()-e.clientWidth/2);v.scrollTo(L,{duration:1.15,easing:O=>1-Math.pow(1-O,3)}),a&&requestAnimationFrame(()=>Pt())}function ht(L){if(L>0&&w===d.length-1){gt();return}const O=So(w+L,0,d.length-1);O!==w&&j(O)}function Pt(){const L=S();w=L,d.forEach((O,st)=>{if(st===L){O.wrap.style.transform="translateZ(60px) scale(1.6)",O.portrait.style.filter="grayscale(0%) blur(0px) brightness(1)",O.glow.style.opacity="1",O.mono.style.opacity="1",O.mono.style.transform="none",O.name.style.opacity="1",O.name.style.transform="none",O.name.style.filter="none",O.role.style.opacity="1",O.role.style.transform="none",O.role.style.letterSpacing="0.08em",O.quote.style.opacity="1",O.quote.style.transform="none",O.accent.style.transform="scaleX(1)",O.el.style.transform="none";for(const ct of O.letters)ct.style.opacity="1",ct.style.transform="none",ct.style.filter="none"}else m(O),O.el.style.transform="translateZ(-50px) scale(0.85)"}),i.style.transform="none",E()}function Y(){if(document.body.classList.add("mode-team"),document.documentElement.classList.add("team-lock"),g(),a){e.scrollLeft=Math.max(0,p.cx()-e.clientWidth/2),Pt(),v.start();return}d.forEach(L=>{L.state="idle",L.f=null,m(L)}),w=-1,e.scrollLeft=Math.max(0,p.cx()-e.clientWidth/2),w=S(),E(),J||(J=!0,v.start(),et=requestAnimationFrame(rt))}function Ut(){document.body.classList.remove("mode-team"),document.documentElement.classList.remove("team-lock"),J&&(J=!1,cancelAnimationFrame(et)),v&&v.stop()}return e.addEventListener("scroll",()=>{a&&J&&Pt()}),h.addEventListener("click",()=>j(0)),t.querySelector("#team-prev").addEventListener("click",()=>ht(-1)),t.querySelector("#team-next").addEventListener("click",()=>ht(1)),r.addEventListener("click",()=>n&&n()),{open:Y,close:Ut,nav:ht,isOpen:()=>document.body.classList.contains("mode-team"),focusCell:j}}async function p1(){await Promise.allSettled([document.fonts.load("400 26px 'Century Gothic'"),document.fonts.load("600 26px 'Century Gothic'"),document.fonts.load("700 26px 'Century Gothic'"),document.fonts.load("italic 400 26px 'Century Gothic'"),document.fonts.load("italic 700 26px 'Century Gothic'")]);const n=document.getElementById("scene"),t=rn.length,e=T_(n,rn),i=A_();let s=null;function o(Y,Ut="smooth"){s?s.scrollTo(Y,{duration:Ut==="smooth"?1.2:0,easing:L=>1-Math.pow(1-L,3)}):document.querySelector("#ui-course .course-main").scrollTo({top:Y,behavior:Ut})}function r(Y){const Ut=Y==="journey",L=Y==="course",O=Y==="team";l.isOpen()&&l.close(),a.isOpen()&&a.close(),L&&i.setQuizShown(!1),L&&l.open(),O&&a.open(),document.getElementById("mode-journey").classList.toggle("active",Ut),document.getElementById("mode-course-btn").classList.toggle("active",L),document.getElementById("mode-team-btn").classList.toggle("active",O),L?(M.stop(),s==null||s.start()):O?(s==null||s.stop(),M.stop()):(s==null||s.stop(),M.start())}const a=f1({onExit:()=>r("journey")}),l=l1({onExit:()=>r("journey"),onScrollTo:o,onQuiz:()=>{r("journey"),setTimeout(()=>{const Y=Math.max(1,U.offsetHeight-window.innerHeight);M.scrollTo(Y,{duration:1.6})},120)}});document.getElementById("mode-journey").addEventListener("click",()=>r("journey")),document.getElementById("mode-course-btn").addEventListener("click",()=>r("course")),document.getElementById("mode-team-btn").addEventListener("click",()=>r("team"));const c='<svg class="dn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4.5"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.2 5.2l1.6 1.6M17.2 17.2l1.6 1.6M18.8 5.2l-1.6 1.6M6.8 17.2l-1.6 1.6"/></svg>',u='<svg class="dn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>',d='<svg class="dn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3.4 2"/></svg>',h={auto:"Auto",day:"Jour",night:"Nuit"},p={auto:d,day:c,night:u},m=document.getElementById("ui-daynight");function v(Y){const Ut=Math.floor(Y),L=Math.floor((Y-Ut)*60);return String(Ut).padStart(2,"0")+"h"+String(L).padStart(2,"0")}let g="auto";function f(){e.setTimeMode(g);const Y=g==="night";m.classList.toggle("night",Y),m.classList.toggle("auto",g==="auto"),m.setAttribute("aria-pressed",String(Y));const Ut=e.getTimeInfo(),L=g==="auto"?" · "+v(Ut.hour):"";m.innerHTML=p[g]+" "+h[g]+L,m.title=g==="auto"?"Heure réelle de la journée — cliquer pour passer en mode Jour":g==="day"?"Mode Jour fixe — cliquer pour passer en mode Nuit":"Mode Nuit fixe — cliquer pour repasser en Auto";try{localStorage.setItem("panneau-light",g)}catch{}}m.addEventListener("click",()=>{g=g==="auto"?"day":g==="day"?"night":"auto",f()});let S="auto";try{const Y=localStorage.getItem("panneau-light");Y==="auto"||Y==="day"||Y==="night"?S=Y:localStorage.getItem("panneau-night")==="1"&&(S="night")}catch{}const w=new URLSearchParams(window.location.search);w.get("light")&&["auto","day","night"].includes(w.get("light"))&&(g=w.get("light"));const E=w.get("hour");E&&!isNaN(Number(E))&&(e.setHour(Number(E)),g="auto"),f();const G=w.get("at");G&&!isNaN(Number(G))&&setTimeout(()=>{const Y=Math.max(1,U.offsetHeight-window.innerHeight);window.scrollTo(0,Math.round(Math.min(1,Math.max(0,Number(G)))*Y))},400),(w.get("mode")==="team"||w.get("mode")==="course")&&setTimeout(()=>r(w.get("mode")),400),w.get("hide")==="1"&&!G&&setTimeout(()=>{const Y=Math.max(1,U.offsetHeight-window.innerHeight);window.scrollTo(0,Math.round(Y*.03))},250),setInterval(()=>{if(g==="auto"){const Y=e.getTimeInfo();m.innerHTML=p.auto+" "+h.auto+" · "+v(Y.hour)}},3e4);const x=t+2,U=document.getElementById("scroll");function z(){return window.innerWidth<=760?.5:.7}function y(){const Y=x*window.innerHeight*z();U.style.height=Y+"px"}y();const M=new Oa({duration:window.innerWidth<=760?.9:1,smoothWheel:!0,easing:Y=>1-Math.pow(1-Y,3),touchMultiplier:window.innerWidth<=760?2:1.5,wheelMultiplier:1.15}),I=document.querySelector("#ui-course .course-main");s=new Oa({wrapper:I,content:I,duration:1.25,smoothWheel:!0,easing:Y=>1-Math.pow(1-Y,3),touchMultiplier:1.6,wheelMultiplier:1});function k(Y){M.raf(Y),s&&s.raf(Y),requestAnimationFrame(k)}requestAnimationFrame(k);let F=0,Z=0;function et(Y){const Ut=Math.max(1,U.offsetHeight-window.innerHeight),L=Math.min(1,Math.max(0,Y/Ut));F=L;const O=Math.floor(L*x)-1;Z=Math.max(0,Math.min(t-1,O))}let J=0;M.on("scroll",({scroll:Y})=>{et(Y),J=performance.now()}),et(window.scrollY||0),e.update(F,Z);function rt(){e.update(F,Z),i.updateGlobal(F,Z,e.getFramedPanel()),e.render(),requestAnimationFrame(rt)}requestAnimationFrame(rt),window.addEventListener("resize",()=>{y(),e.resize(),et(window.scrollY||0)}),window.addEventListener("keydown",Y=>{if(a.isOpen()){Y.key==="Escape"?r("journey"):Y.key==="ArrowLeft"?(Y.preventDefault(),a.nav(-1)):Y.key==="ArrowRight"&&(Y.preventDefault(),a.nav(1));return}if(l.isOpen()){Y.key==="Escape"?r("journey"):Y.key==="ArrowDown"||Y.key==="PageDown"?(Y.preventDefault(),o(I.scrollTop+window.innerHeight*.8)):(Y.key==="ArrowUp"||Y.key==="PageUp")&&(Y.preventDefault(),o(I.scrollTop-window.innerHeight*.8));return}if(i.isReaderOpen()){const O=document.querySelector(".reader-panel");Y.key==="Escape"?i.closeReader():Y.key==="ArrowLeft"?i.readerNav(-1):Y.key==="ArrowRight"?i.readerNav(1):Y.key==="ArrowDown"||Y.key==="PageDown"?(Y.preventDefault(),O.scrollBy({top:Math.min(O.clientHeight*.7,O.scrollHeight-O.scrollTop),behavior:"smooth"})):(Y.key==="ArrowUp"||Y.key==="PageUp")&&(Y.preventDefault(),O.scrollBy({top:-O.clientHeight*.7,behavior:"smooth"}));return}if(Y.key==="Enter"&&Z>=0&&!i.quizOpen()){i.openReader(Z);return}if(["1","2","3","4"].includes(Y.key)&&i.quizOpen()){Y.preventDefault(),i.answerQuiz(Number(Y.key)-1);return}if(i.quizOpen()){const O=document.querySelector("#ui-quiz");if(Y.key==="ArrowDown"||Y.key==="PageDown"){Y.preventDefault(),O.scrollBy({top:window.innerHeight*.7,behavior:"smooth"});return}if(Y.key==="ArrowUp"||Y.key==="PageUp"){Y.preventDefault(),O.scrollBy({top:-window.innerHeight*.7,behavior:"smooth"});return}}const L=window.innerHeight*z();Y.key==="ArrowDown"||Y.key==="PageDown"?(Y.preventDefault(),M.scrollTo(window.scrollY+L,{duration:1.1})):(Y.key==="ArrowUp"||Y.key==="PageUp")&&(Y.preventDefault(),M.scrollTo(Math.max(0,window.scrollY-L),{duration:1.1}))});let j=null;function gt(Y,Ut){document.documentElement.classList.toggle(Ut,Y),Y?(j=window.scrollY,M.stop()):(j=null,M.start())}window.addEventListener("scroll",()=>{j!==null&&Math.abs(window.scrollY-j)>2&&window.scrollTo(0,j)},{passive:!0}),i.setReaderListener(Y=>gt(Y,"reader-lock")),i.setQuizListener(Y=>gt(Y,"quiz-lock"));function ht(Y){return{nx:Y.clientX/window.innerWidth*2-1,ny:-(Y.clientY/window.innerHeight)*2+1}}window.addEventListener("click",Y=>{if(a.isOpen()||l.isOpen()||i.isReaderOpen()||i.quizOpen()||Y.target.closest&&Y.target.closest("#ui"))return;const{nx:Ut,ny:L}=ht(Y),O=e.pick(Ut,L);if(O){if(O.kind==="panel"){i.openReader(O.index);return}{const st=e.getFramedPanel();if(st&&st.sw>.25){const ct=e.projectPickable("panel",st.index);if(ct){const It=(ct.x*.5+.5)*innerWidth,Vt=(-ct.y*.5+.5)*innerHeight;if(Math.hypot(It-Y.clientX,Vt-Y.clientY)<80){i.openReader(st.index);return}}}}if(O.kind==="pigeon"){e.interact({kind:"pigeon",index:O.index});return}if(O.kind==="balloon"){e.interact({kind:"balloon",index:O.index}),i.showToast(O.tip);return}if(O.kind==="fountain"){e.interact({kind:"fountain",index:O.index}),i.showToast(O.tip);return}if(O.kind==="car"){e.interact({kind:"car",index:O.index});return}if(O.kind==="bille"){e.interact({kind:"bille",index:O.index}),i.showToast(O.tip);return}O.tip&&i.showToast(O.tip)}});let Pt=!1;window.addEventListener("mouseout",Y=>{Y.relatedTarget||(document.body.classList.remove("hover-pick","hover-fun"),e.setHover(null))}),window.addEventListener("blur",()=>{document.body.classList.remove("hover-pick","hover-fun"),e.setHover(null)}),window.addEventListener("mousemove",Y=>{Pt||(Pt=!0,requestAnimationFrame(()=>{if(Pt=!1,a.isOpen()||l.isOpen()||i.isReaderOpen())return;if(i.quizOpen()){document.body.classList.remove("hover-pick","hover-fun"),e.setHover(null);return}if(performance.now()-J<200){document.body.classList.remove("hover-pick","hover-fun"),e.setHover(null);return}const{nx:Ut,ny:L}=ht(Y),O=e.pick(Ut,L);document.body.classList.toggle("hover-pick",!!O&&O.kind!=="pigeon"),document.body.classList.toggle("hover-fun",!!O&&O.kind==="pigeon"),e.setHover(O)}))}),window.__panneautique={openReader:i.openReader,closeReader:i.closeReader,openCourse:()=>r("course"),closeCourse:()=>r("journey"),openTeam:()=>r("team"),closeTeam:()=>r("journey"),pickAt:(Y,Ut)=>{const L=e.pick(Y/window.innerWidth*2-1,-(Ut/window.innerHeight)*2+1);return L?{kind:L.kind,index:L.index,tip:L.tip}:null},interactAt:(Y,Ut)=>{const L=e.pick(Y/window.innerWidth*2-1,-(Ut/window.innerHeight)*2+1);return L&&e.interact({kind:L.kind,index:L.index}),L?{kind:L.kind,index:L.index,tip:L.tip}:null},project:(Y,Ut)=>{const L=e.projectPickable(Y,Ut);return L?{x:Math.round((L.x*.5+.5)*innerWidth),y:Math.round((-L.y*.5+.5)*innerHeight)}:null},reactive:()=>e.getReactiveState(),scrollToRatio:Y=>{const Ut=Math.max(1,U.offsetHeight-window.innerHeight);M.scrollTo(Math.round(Math.min(1,Math.max(0,Y))*Ut),{duration:.8})},getState:()=>{const Y=e.getCameraPos();return{progress:F,activeIndex:Z,cam:{x:Y.x,y:Y.y,z:Y.z}}},framed:()=>e.getFramedPanel(),panelScreenSize:Y=>e.panelScreenSize(Y),counts:()=>e.sceneCounts(),settle:(Y,Ut)=>{for(let O=0;O<2400;O++)e.update(Y,Ut);const L=e.getCameraPos();return{cam:{x:L.x,y:L.y,z:L.z},progress:Y,activeIndex:Ut}},setHour:Y=>e.setHour(Y),setLightMode:Y=>{g=Y,f()},getTimeInfo:()=>e.getTimeInfo(),panelCanvas:(Y,Ut)=>{const L=e.getPanelCanvas(Y,Ut);return L?{w:L.width,h:L.height,dataUrl:L.toDataURL("image/png")}:null}},setTimeout(()=>{document.getElementById("ui-topbar").classList.add("visible"),document.getElementById("ui-dots").classList.add("visible"),document.getElementById("ui-hint").classList.add("visible")},1200),document.querySelectorAll(".dot").forEach((Y,Ut)=>{Y.addEventListener("click",()=>{const L=(Ut+1.5)/x,O=Math.max(1,U.offsetHeight-window.innerHeight);M.scrollTo(Math.round(L*O),{duration:1.4})})})}p1();
