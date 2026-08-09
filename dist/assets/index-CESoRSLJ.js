var pu=Object.defineProperty;var mu=(n,t,e)=>t in n?pu(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var Lt=(n,t,e)=>mu(n,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function e(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(s){if(s.ep)return;s.ep=!0;const o=e(s);fetch(s.href,o)}})();var tl="1.3.26";function wc(n,t,e){return Math.max(n,Math.min(t,e))}function gu(n,t,e){return(1-e)*n+e*t}function _u(n,t,e,i){return gu(n,t,1-Math.exp(-e*i))}function vu(n,t){return(n%t+t)%t}var Mu=class{constructor(){Lt(this,"isRunning",!1);Lt(this,"value",0);Lt(this,"from",0);Lt(this,"to",0);Lt(this,"currentTime",0);Lt(this,"lerp");Lt(this,"duration");Lt(this,"easing");Lt(this,"onUpdate")}advance(n){var e;if(!this.isRunning)return;let t=!1;if(this.duration&&this.easing){this.currentTime+=n;const i=wc(0,this.currentTime/this.duration,1);t=i>=1;const s=t?1:this.easing(i);this.value=this.from+(this.to-this.from)*s}else this.lerp?(this.value=_u(this.value,this.to,this.lerp*60,n),Math.round(this.value)===Math.round(this.to)&&(this.value=this.to,t=!0)):(this.value=this.to,t=!0);t&&this.stop(),(e=this.onUpdate)==null||e.call(this,this.value,t)}stop(){this.isRunning=!1}fromTo(n,t,{lerp:e,duration:i,easing:s,onStart:o,onUpdate:r}){this.from=this.value=n,this.to=t,this.lerp=e,this.duration=i,this.easing=s,this.currentTime=0,this.isRunning=!0,o==null||o(),this.onUpdate=r}};function yu(n,t){let e;return function(...i){clearTimeout(e),e=setTimeout(()=>{e=void 0,n.apply(this,i)},t)}}var Su=class{constructor(n,t,{autoResize:e=!0,debounce:i=250}={}){Lt(this,"width",0);Lt(this,"height",0);Lt(this,"scrollHeight",0);Lt(this,"scrollWidth",0);Lt(this,"debouncedResize");Lt(this,"wrapperResizeObserver");Lt(this,"contentResizeObserver");Lt(this,"resize",()=>{this.onWrapperResize(),this.onContentResize()});Lt(this,"onWrapperResize",()=>{this.wrapper instanceof Window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)});Lt(this,"onContentResize",()=>{this.wrapper instanceof Window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)});this.wrapper=n,this.content=t,e&&(this.debouncedResize=yu(this.resize,i),this.wrapper instanceof Window?window.addEventListener("resize",this.debouncedResize):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){var n,t;(n=this.wrapperResizeObserver)==null||n.disconnect(),(t=this.contentResizeObserver)==null||t.disconnect(),this.wrapper===window&&this.debouncedResize&&window.removeEventListener("resize",this.debouncedResize)}get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},bc=class{constructor(){Lt(this,"events",{})}emit(n,...t){var i;const e=this.events[n]||[];for(let s=0,o=e.length;s<o;s++)(i=e[s])==null||i.call(e,...t)}on(n,t){return this.events[n]?this.events[n].push(t):this.events[n]=[t],()=>{var e;this.events[n]=(e=this.events[n])==null?void 0:e.filter(i=>t!==i)}}off(n,t){var e;this.events[n]=(e=this.events[n])==null?void 0:e.filter(i=>t!==i)}destroy(){this.events={}}};const xu=100/6,Zn={passive:!1};function el(n,t){return n===1?xu:n===2?t:1}var wu=class{constructor(n,t={wheelMultiplier:1,touchMultiplier:1}){Lt(this,"touchStart",{x:0,y:0});Lt(this,"lastDelta",{x:0,y:0});Lt(this,"window",{width:0,height:0});Lt(this,"emitter",new bc);Lt(this,"onTouchStart",n=>{const{clientX:t,clientY:e}=n.targetTouches?n.targetTouches[0]:n;this.touchStart.x=t,this.touchStart.y=e,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:n})});Lt(this,"onTouchMove",n=>{const{clientX:t,clientY:e}=n.targetTouches?n.targetTouches[0]:n,i=-(t-this.touchStart.x)*this.options.touchMultiplier,s=-(e-this.touchStart.y)*this.options.touchMultiplier;this.touchStart.x=t,this.touchStart.y=e,this.lastDelta={x:i,y:s},this.emitter.emit("scroll",{deltaX:i,deltaY:s,event:n})});Lt(this,"onTouchEnd",n=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:n})});Lt(this,"onWheel",n=>{let{deltaX:t,deltaY:e,deltaMode:i}=n;const s=el(i,this.window.width),o=el(i,this.window.height);t*=s,e*=o,t*=this.options.wheelMultiplier,e*=this.options.wheelMultiplier,this.emitter.emit("scroll",{deltaX:t,deltaY:e,event:n})});Lt(this,"onWindowResize",()=>{this.window={width:window.innerWidth,height:window.innerHeight}});this.element=n,this.options=t,window.addEventListener("resize",this.onWindowResize),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,Zn),this.element.addEventListener("touchstart",this.onTouchStart,Zn),this.element.addEventListener("touchmove",this.onTouchMove,Zn),this.element.addEventListener("touchend",this.onTouchEnd,Zn)}on(n,t){return this.emitter.on(n,t)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize),this.element.removeEventListener("wheel",this.onWheel,Zn),this.element.removeEventListener("touchstart",this.onTouchStart,Zn),this.element.removeEventListener("touchmove",this.onTouchMove,Zn),this.element.removeEventListener("touchend",this.onTouchEnd,Zn)}};const nl=n=>Math.min(1,1.001-2**(-10*n));var il=class{constructor({wrapper:n=window,content:t=document.documentElement,eventsTarget:e=n,smoothWheel:i=!0,syncTouch:s=!1,syncTouchLerp:o=.075,touchInertiaExponent:r=1.7,duration:a,easing:l,lerp:c=.1,infinite:u=!1,orientation:d="vertical",gestureOrientation:h=d==="horizontal"?"both":"vertical",touchMultiplier:p=1,wheelMultiplier:f=1,autoResize:M=!0,prevent:g,virtualScroll:m,overscroll:x=!0,autoRaf:w=!1,anchors:S=!1,autoToggle:z=!1,allowNestedScroll:P=!1,__experimental__naiveDimensions:I=!1,naiveDimensions:L=I,stopInertiaOnNavigate:y=!1,respectReducedMotion:_=!0}={}){Lt(this,"_isScrolling",!1);Lt(this,"_isStopped",!1);Lt(this,"_isLocked",!1);Lt(this,"_preventNextNativeScrollEvent",!1);Lt(this,"_resetVelocityTimeout",null);Lt(this,"_rafId",null);Lt(this,"_isDraggingSelection",!1);Lt(this,"reducedMotionMediaQuery",window.matchMedia("(prefers-reduced-motion: reduce)"));Lt(this,"isTouching");Lt(this,"isIos");Lt(this,"time",0);Lt(this,"userData",{});Lt(this,"lastVelocity",0);Lt(this,"velocity",0);Lt(this,"direction",0);Lt(this,"options");Lt(this,"targetScroll");Lt(this,"animatedScroll");Lt(this,"animate",new Mu);Lt(this,"emitter",new bc);Lt(this,"dimensions");Lt(this,"virtualScroll");Lt(this,"onScrollEnd",n=>{n instanceof CustomEvent||(this.isScrolling==="smooth"||this.isScrolling===!1)&&n.stopPropagation()});Lt(this,"dispatchScrollendEvent",()=>{this.options.wrapper.dispatchEvent(new CustomEvent("scrollend",{bubbles:this.options.wrapper===window,detail:{lenisScrollEnd:!0}}))});Lt(this,"onTransitionEnd",n=>{var t;(t=n.propertyName)!=null&&t.includes("overflow")&&n.target===this.rootElement&&this.checkOverflow()});Lt(this,"onClick",n=>{const t=n.composedPath().filter(i=>i instanceof HTMLAnchorElement&&i.href).map(i=>new URL(i.href)),e=new URL(window.location.href);if(this.options.anchors){const i=t.find(s=>e.host===s.host&&e.pathname===s.pathname&&s.hash);if(i){const s=typeof this.options.anchors=="object"&&this.options.anchors?this.options.anchors:void 0,o=decodeURIComponent(i.hash);this.scrollTo(o,s);return}}if(this.options.stopInertiaOnNavigate&&t.some(i=>e.host===i.host&&e.pathname!==i.pathname)){this.reset();return}});Lt(this,"onPointerDown",n=>{n.button===1&&this.reset()});Lt(this,"onVirtualScroll",n=>{if(typeof this.options.virtualScroll=="function"&&this.options.virtualScroll(n)===!1)return;const{deltaX:t,deltaY:e,event:i}=n;if(this.emitter.emit("virtual-scroll",{deltaX:t,deltaY:e,event:i}),i.ctrlKey||i.lenisStopPropagation)return;const s=i.type.includes("touch"),o=i.type.includes("wheel");if(s&&this.isIos&&(i.type==="touchstart"&&(this._isDraggingSelection=this.isTouchOnSelectionHandle(i)),this._isDraggingSelection)){i.type==="touchend"&&(this._isDraggingSelection=!1);return}this.isTouching=i.type==="touchstart"||i.type==="touchmove";const r=t===0&&e===0;if(this.options.syncTouch&&s&&i.type==="touchstart"&&r&&!this.isStopped&&!this.isLocked){this.reset();return}const a=this.options.gestureOrientation==="vertical"&&e===0||this.options.gestureOrientation==="horizontal"&&t===0;if(r||a)return;let l=i.composedPath();l=l.slice(0,l.indexOf(this.rootElement));const c=this.options.prevent,u=Math.abs(t)>=Math.abs(e)?"horizontal":"vertical";if(l.find(f=>{var M,g,m,x,w;return f instanceof HTMLElement&&(typeof c=="function"&&(c==null?void 0:c(f))||((M=f.hasAttribute)==null?void 0:M.call(f,"data-lenis-prevent"))||u==="vertical"&&((g=f.hasAttribute)==null?void 0:g.call(f,"data-lenis-prevent-vertical"))||u==="horizontal"&&((m=f.hasAttribute)==null?void 0:m.call(f,"data-lenis-prevent-horizontal"))||s&&((x=f.hasAttribute)==null?void 0:x.call(f,"data-lenis-prevent-touch"))||o&&((w=f.hasAttribute)==null?void 0:w.call(f,"data-lenis-prevent-wheel"))||this.options.allowNestedScroll&&this.hasNestedScroll(f,{deltaX:t,deltaY:e}))}))return;if(this.isStopped||this.isLocked){i.cancelable&&i.preventDefault();return}if(!(this.options.syncTouch&&s||this.options.smoothWheel&&o)){this.isScrolling="native",this.animate.stop(),i.lenisStopPropagation=!0;return}let d=e;this.options.gestureOrientation==="both"?d=Math.abs(e)>Math.abs(t)?e:t:this.options.gestureOrientation==="horizontal"&&(d=t),(!this.options.overscroll||this.options.infinite||this.options.wrapper!==window&&this.limit>0&&(this.animatedScroll>0&&this.animatedScroll<this.limit||this.animatedScroll===0&&e>0||this.animatedScroll===this.limit&&e<0))&&(i.lenisStopPropagation=!0),i.cancelable&&i.preventDefault();const h=s&&this.options.syncTouch,p=s&&i.type==="touchend";p&&(d=Math.sign(d)*Math.abs(this.velocity)**this.options.touchInertiaExponent),this.scrollTo(this.targetScroll+d,{programmatic:!1,...h?{lerp:p?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}})});Lt(this,"onNativeScroll",()=>{if(this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this._preventNextNativeScrollEvent){this._preventNextNativeScrollEvent=!1;return}if(this.isScrolling===!1||this.isScrolling==="native"){const n=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-n,this.direction=Math.sign(this.animatedScroll-n),this.isStopped||(this.isScrolling="native"),this.emit(),this.velocity!==0&&(this._resetVelocityTimeout=setTimeout(()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()},400))}});Lt(this,"raf",n=>{const t=n-(this.time||n);this.time=n,this.animate.advance(t*.001),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))});window.lenisVersion=tl,window.lenis||(window.lenis={}),window.lenis.version=tl,d==="horizontal"&&(window.lenis.horizontal=!0),s===!0&&(window.lenis.touch=!0),this.isIos=/(iPad|iPhone|iPod)/g.test(navigator.userAgent),(!n||n===document.documentElement)&&(n=window),typeof a=="number"&&typeof l!="function"?l=nl:typeof l=="function"&&typeof a!="number"&&(a=1),this.options={wrapper:n,content:t,eventsTarget:e,smoothWheel:i,syncTouch:s,syncTouchLerp:o,touchInertiaExponent:r,duration:a,easing:l,lerp:c,infinite:u,gestureOrientation:h,orientation:d,touchMultiplier:p,wheelMultiplier:f,autoResize:M,prevent:g,virtualScroll:m,overscroll:x,autoRaf:w,anchors:S,autoToggle:z,allowNestedScroll:P,naiveDimensions:L,stopInertiaOnNavigate:y,respectReducedMotion:_},this.dimensions=new Su(n,t,{autoResize:M}),this.updateClassName(),this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll),this.options.wrapper.addEventListener("scrollend",this.onScrollEnd,{capture:!0}),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.addEventListener("click",this.onClick),this.options.wrapper.addEventListener("pointerdown",this.onPointerDown),this.virtualScroll=new wu(e,{touchMultiplier:p,wheelMultiplier:f}),this.virtualScroll.on("scroll",this.onVirtualScroll),this.options.autoToggle&&(this.checkOverflow(),this.rootElement.addEventListener("transitionend",this.onTransitionEnd)),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll),this.options.wrapper.removeEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.wrapper.removeEventListener("pointerdown",this.onPointerDown),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.removeEventListener("click",this.onClick),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName(),this._rafId&&cancelAnimationFrame(this._rafId)}on(n,t){return this.emitter.on(n,t)}off(n,t){return this.emitter.off(n,t)}get overflow(){const n=this.isHorizontal?"overflow-x":"overflow-y";return getComputedStyle(this.rootElement)[n]}checkOverflow(){["hidden","clip"].includes(this.overflow)?this.internalStop():this.internalStart()}setScroll(n){this.isHorizontal?this.options.wrapper.scrollTo({left:n,behavior:"instant"}):this.options.wrapper.scrollTo({top:n,behavior:"instant"})}isTouchOnSelectionHandle(n){const t=window.getSelection();if(!t||t.isCollapsed||t.rangeCount===0)return!1;const e=n.targetTouches[0]??n.changedTouches[0];if(!e)return!1;const i=t.getRangeAt(0).getClientRects();if(i.length===0)return!1;const s=i[0],o=i[i.length-1],r=40,a=Math.hypot(e.clientX-s.left,e.clientY-s.top)<=r,l=Math.hypot(e.clientX-o.right,e.clientY-o.bottom)<=r;return a||l}resize(){this.dimensions.resize(),this.animatedScroll=this.targetScroll=this.actualScroll,this.emit()}emit(){this.emitter.emit("scroll",this)}reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){if(this.isStopped){if(this.options.autoToggle){this.rootElement.style.removeProperty("overflow");return}this.internalStart()}}internalStart(){this.isStopped&&(this.reset(),this.isStopped=!1,this.emit())}stop(){if(!this.isStopped){if(this.options.autoToggle){this.rootElement.style.setProperty("overflow","clip");return}this.internalStop()}}internalStop(){this.isStopped||(this.reset(),this.isStopped=!0,this.emit())}scrollTo(n,{offset:t=0,immediate:e=!1,lock:i=!1,programmatic:s=!0,lerp:o=s?this.options.lerp:void 0,duration:r=s?this.options.duration:void 0,easing:a=s?this.options.easing:void 0,onStart:l,onComplete:c,force:u=!1,userData:d}={}){if(this.prefersReducedMotion&&(s?e=!0:(o=1,r=void 0,a=void 0)),(this.isStopped||this.isLocked)&&!u)return;let h=n,p=t;if(typeof h=="string"&&["top","left","start","#"].includes(h))h=0;else if(typeof h=="string"&&["bottom","right","end"].includes(h))h=this.limit;else{let f=null;if(typeof h=="string"?(f=h.startsWith("#")?document.getElementById(h.slice(1)):document.querySelector(h),f||(h==="#top"?h=0:console.warn("Lenis: Target not found",h))):h instanceof HTMLElement&&(h!=null&&h.nodeType)&&(f=h),f){if(this.options.wrapper!==window){const S=this.rootElement.getBoundingClientRect();p-=this.isHorizontal?S.left:S.top}const M=f.getBoundingClientRect(),g=getComputedStyle(f),m=this.isHorizontal?Number.parseFloat(g.scrollMarginLeft):Number.parseFloat(g.scrollMarginTop),x=getComputedStyle(this.rootElement),w=this.isHorizontal?Number.parseFloat(x.scrollPaddingLeft):Number.parseFloat(x.scrollPaddingTop);h=(this.isHorizontal?M.left:M.top)+this.animatedScroll-(Number.isNaN(m)?0:m)-(Number.isNaN(w)?0:w)}}if(typeof h=="number"){if(h+=p,this.options.infinite){if(s){this.targetScroll=this.animatedScroll=this.scroll;const f=h-this.animatedScroll;f>this.limit/2?h-=this.limit:f<-this.limit/2&&(h+=this.limit)}}else h=wc(0,h,this.limit);if(h===this.targetScroll){l==null||l(this),c==null||c(this);return}if(this.userData=d??{},e){this.animatedScroll=this.targetScroll=h,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),c==null||c(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()});return}s||(this.targetScroll=h),typeof r=="number"&&typeof a!="function"?a=nl:typeof a=="function"&&typeof r!="number"&&(r=1),this.animate.fromTo(this.animatedScroll,h,{duration:r,easing:a,lerp:o,onStart:()=>{i&&(this.isLocked=!0),this.isScrolling="smooth",l==null||l(this)},onUpdate:(f,M)=>{this.isScrolling="smooth",this.lastVelocity=this.velocity,this.velocity=f-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=f,this.setScroll(this.scroll),s&&(this.targetScroll=f),M||this.emit(),M&&(this.reset(),this.emit(),c==null||c(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()}),this.preventNextNativeScrollEvent())}})}}preventNextNativeScrollEvent(){this._preventNextNativeScrollEvent=!0,requestAnimationFrame(()=>{this._preventNextNativeScrollEvent=!1})}hasNestedScroll(n,{deltaX:t,deltaY:e}){const i=Date.now();n._lenis||(n._lenis={});const s=n._lenis;let o,r,a,l,c,u,d,h,p,f;if(i-(s.time??0)>2e3){s.time=Date.now();const P=window.getComputedStyle(n);if(s.computedStyle=P,o=["auto","overlay","scroll"].includes(P.overflowX),r=["auto","overlay","scroll"].includes(P.overflowY),c=["auto"].includes(P.overscrollBehaviorX),u=["auto"].includes(P.overscrollBehaviorY),s.hasOverflowX=o,s.hasOverflowY=r,!(o||r))return!1;d=n.scrollWidth,h=n.scrollHeight,p=n.clientWidth,f=n.clientHeight,a=d>p,l=h>f,s.isScrollableX=a,s.isScrollableY=l,s.scrollWidth=d,s.scrollHeight=h,s.clientWidth=p,s.clientHeight=f,s.hasOverscrollBehaviorX=c,s.hasOverscrollBehaviorY=u}else a=s.isScrollableX,l=s.isScrollableY,o=s.hasOverflowX,r=s.hasOverflowY,d=s.scrollWidth,h=s.scrollHeight,p=s.clientWidth,f=s.clientHeight,c=s.hasOverscrollBehaviorX,u=s.hasOverscrollBehaviorY;if(!(o&&a||r&&l))return!1;const M=Math.abs(t)>=Math.abs(e)?"horizontal":"vertical";let g,m,x,w,S,z;if(M==="horizontal")g=Math.round(n.scrollLeft),m=d-p,x=t,w=o,S=a,z=c;else if(M==="vertical")g=Math.round(n.scrollTop),m=h-f,x=e,w=r,S=l,z=u;else return!1;return!z&&(g>=m||g<=0)?!0:(x>0?g<m:g>0)&&w&&S}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return this.options.orientation==="horizontal"}get actualScroll(){const n=this.options.wrapper;return this.isHorizontal?n.scrollX??n.scrollLeft:n.scrollY??n.scrollTop}get scroll(){return this.options.infinite?vu(this.animatedScroll,this.limit):this.animatedScroll}get progress(){return this.limit===0?1:this.scroll/this.limit}get isScrolling(){return this._isScrolling}set isScrolling(n){this._isScrolling!==n&&(this._isScrolling=n,this.updateClassName())}get isStopped(){return this._isStopped}set isStopped(n){this._isStopped!==n&&(this._isStopped=n,this.updateClassName())}get isLocked(){return this._isLocked}set isLocked(n){this._isLocked!==n&&(this._isLocked=n,this.updateClassName())}get isSmooth(){return this.isScrolling==="smooth"}get prefersReducedMotion(){return this.options.respectReducedMotion&&this.reducedMotionMediaQuery.matches}get className(){let n="lenis";return this.options.autoToggle&&(n+=" lenis-autoToggle"),this.isStopped&&(n+=" lenis-stopped"),this.isLocked&&(n+=" lenis-locked"),this.isScrolling&&(n+=" lenis-scrolling"),this.isScrolling==="smooth"&&(n+=" lenis-smooth"),n}updateClassName(){this.cleanUpClassName(),this.className.split(" ").forEach(n=>{this.rootElement.classList.add(n)})}cleanUpClassName(){for(const n of Array.from(this.rootElement.classList))(n==="lenis"||n.startsWith("lenis-"))&&this.rootElement.classList.remove(n)}};/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const La="170",bu=0,sl=1,Eu=2,Ec=1,Ho=2,Un=3,ai=0,$e=1,ke=2,oi=0,Ai=1,nn=2,ol=3,rl=4,Tu=5,wi=100,Au=101,Cu=102,Ru=103,Pu=104,Lu=200,Iu=201,Du=202,Uu=203,Hr=204,Vr=205,Nu=206,zu=207,Fu=208,Ou=209,Bu=210,ku=211,Gu=212,Hu=213,Vu=214,Wr=0,Xr=1,qr=2,os=3,Yr=4,$r=5,Zr=6,Kr=7,Ia=0,Wu=1,Xu=2,ri=0,qu=1,Yu=2,$u=3,Vo=4,Zu=5,Ku=6,Ju=7,Tc=300,rs=301,as=302,Jr=303,jr=304,Wo=306,li=1e3,Ei=1001,Qr=1002,vn=1003,ju=1004,$s=1005,En=1006,jo=1007,Ti=1008,Vn=1009,Ac=1010,Cc=1011,Bs=1012,Da=1013,Ci=1014,Fn=1015,Gs=1016,Ua=1017,Na=1018,ls=1020,Rc=35902,Pc=1021,Lc=1022,_n=1023,Ic=1024,Dc=1025,es=1026,cs=1027,Uc=1028,za=1029,Nc=1030,Fa=1031,Oa=1033,Eo=33776,To=33777,Ao=33778,Co=33779,ta=35840,ea=35841,na=35842,ia=35843,sa=36196,oa=37492,ra=37496,aa=37808,la=37809,ca=37810,ua=37811,da=37812,ha=37813,fa=37814,pa=37815,ma=37816,ga=37817,_a=37818,va=37819,Ma=37820,ya=37821,Ro=36492,Sa=36494,xa=36495,zc=36283,wa=36284,ba=36285,Ea=36286,Qu=3200,td=3201,Ba=0,ed=1,ni="",fe="srgb",hs="srgb-linear",Xo="linear",pe="srgb",Ni=7680,al=519,nd=512,id=513,sd=514,Fc=515,od=516,rd=517,ad=518,ld=519,Ta=35044,ll="300 es",On=2e3,Do=2001;class fs{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const o=s.indexOf(e);o!==-1&&s.splice(o,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const i=this._listeners[t.type];if(i!==void 0){t.target=this;const s=i.slice(0);for(let o=0,r=s.length;o<r;o++)s[o].call(this,t);t.target=null}}}const qe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let cl=1234567;const Ds=Math.PI/180,ks=180/Math.PI;function Bn(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(qe[n&255]+qe[n>>8&255]+qe[n>>16&255]+qe[n>>24&255]+"-"+qe[t&255]+qe[t>>8&255]+"-"+qe[t>>16&15|64]+qe[t>>24&255]+"-"+qe[e&63|128]+qe[e>>8&255]+"-"+qe[e>>16&255]+qe[e>>24&255]+qe[i&255]+qe[i>>8&255]+qe[i>>16&255]+qe[i>>24&255]).toLowerCase()}function Ve(n,t,e){return Math.max(t,Math.min(e,n))}function ka(n,t){return(n%t+t)%t}function cd(n,t,e,i,s){return i+(n-t)*(s-i)/(e-t)}function ud(n,t,e){return n!==t?(e-n)/(t-n):0}function Us(n,t,e){return(1-e)*n+e*t}function dd(n,t,e,i){return Us(n,t,1-Math.exp(-e*i))}function hd(n,t=1){return t-Math.abs(ka(n,t*2)-t)}function fd(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function pd(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function md(n,t){return n+Math.floor(Math.random()*(t-n+1))}function gd(n,t){return n+Math.random()*(t-n)}function _d(n){return n*(.5-Math.random())}function vd(n){n!==void 0&&(cl=n);let t=cl+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Md(n){return n*Ds}function yd(n){return n*ks}function Sd(n){return(n&n-1)===0&&n!==0}function xd(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function wd(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function bd(n,t,e,i,s){const o=Math.cos,r=Math.sin,a=o(e/2),l=r(e/2),c=o((t+i)/2),u=r((t+i)/2),d=o((t-i)/2),h=r((t-i)/2),p=o((i-t)/2),f=r((i-t)/2);switch(s){case"XYX":n.set(a*u,l*d,l*h,a*c);break;case"YZY":n.set(l*h,a*u,l*d,a*c);break;case"ZXZ":n.set(l*d,l*h,a*u,a*c);break;case"XZX":n.set(a*u,l*f,l*p,a*c);break;case"YXY":n.set(l*p,a*u,l*f,a*c);break;case"ZYZ":n.set(l*f,l*p,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function gn(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function he(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const en={DEG2RAD:Ds,RAD2DEG:ks,generateUUID:Bn,clamp:Ve,euclideanModulo:ka,mapLinear:cd,inverseLerp:ud,lerp:Us,damp:dd,pingpong:hd,smoothstep:fd,smootherstep:pd,randInt:md,randFloat:gd,randFloatSpread:_d,seededRandom:vd,degToRad:Md,radToDeg:yd,isPowerOfTwo:Sd,ceilPowerOfTwo:xd,floorPowerOfTwo:wd,setQuaternionFromProperEuler:bd,normalize:he,denormalize:gn};class Tt{constructor(t=0,e=0){Tt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Ve(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),s=Math.sin(e),o=this.x-t.x,r=this.y-t.y;return this.x=o*i-r*s+t.x,this.y=o*s+r*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class $t{constructor(t,e,i,s,o,r,a,l,c){$t.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,o,r,a,l,c)}set(t,e,i,s,o,r,a,l,c){const u=this.elements;return u[0]=t,u[1]=s,u[2]=a,u[3]=e,u[4]=o,u[5]=l,u[6]=i,u[7]=r,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,o=this.elements,r=i[0],a=i[3],l=i[6],c=i[1],u=i[4],d=i[7],h=i[2],p=i[5],f=i[8],M=s[0],g=s[3],m=s[6],x=s[1],w=s[4],S=s[7],z=s[2],P=s[5],I=s[8];return o[0]=r*M+a*x+l*z,o[3]=r*g+a*w+l*P,o[6]=r*m+a*S+l*I,o[1]=c*M+u*x+d*z,o[4]=c*g+u*w+d*P,o[7]=c*m+u*S+d*I,o[2]=h*M+p*x+f*z,o[5]=h*g+p*w+f*P,o[8]=h*m+p*S+f*I,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],s=t[2],o=t[3],r=t[4],a=t[5],l=t[6],c=t[7],u=t[8];return e*r*u-e*a*c-i*o*u+i*a*l+s*o*c-s*r*l}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],o=t[3],r=t[4],a=t[5],l=t[6],c=t[7],u=t[8],d=u*r-a*c,h=a*l-u*o,p=c*o-r*l,f=e*d+i*h+s*p;if(f===0)return this.set(0,0,0,0,0,0,0,0,0);const M=1/f;return t[0]=d*M,t[1]=(s*c-u*i)*M,t[2]=(a*i-s*r)*M,t[3]=h*M,t[4]=(u*e-s*l)*M,t[5]=(s*o-a*e)*M,t[6]=p*M,t[7]=(i*l-c*e)*M,t[8]=(r*e-i*o)*M,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,o,r,a){const l=Math.cos(o),c=Math.sin(o);return this.set(i*l,i*c,-i*(l*r+c*a)+r+t,-s*c,s*l,-s*(-c*r+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Qo.makeScale(t,e)),this}rotate(t){return this.premultiply(Qo.makeRotation(-t)),this}translate(t,e){return this.premultiply(Qo.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Qo=new $t;function Oc(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function Uo(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Ed(){const n=Uo("canvas");return n.style.display="block",n}const ul={};function Rs(n){n in ul||(ul[n]=!0,console.warn(n))}function Td(n,t,e){return new Promise(function(i,s){function o(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(o,e);break;default:i()}}setTimeout(o,e)})}function Ad(n){const t=n.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Cd(n){const t=n.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const re={enabled:!0,workingColorSpace:hs,spaces:{},convert:function(n,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===pe&&(n.r=kn(n.r),n.g=kn(n.g),n.b=kn(n.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(n.applyMatrix3(this.spaces[t].toXYZ),n.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===pe&&(n.r=ns(n.r),n.g=ns(n.g),n.b=ns(n.b))),n},fromWorkingColorSpace:function(n,t){return this.convert(n,this.workingColorSpace,t)},toWorkingColorSpace:function(n,t){return this.convert(n,t,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===ni?Xo:this.spaces[n].transfer},getLuminanceCoefficients:function(n,t=this.workingColorSpace){return n.fromArray(this.spaces[t].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,t,e){return n.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace}};function kn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function ns(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}const dl=[.64,.33,.3,.6,.15,.06],hl=[.2126,.7152,.0722],fl=[.3127,.329],pl=new $t().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ml=new $t().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);re.define({[hs]:{primaries:dl,whitePoint:fl,transfer:Xo,toXYZ:pl,fromXYZ:ml,luminanceCoefficients:hl,workingColorSpaceConfig:{unpackColorSpace:fe},outputColorSpaceConfig:{drawingBufferColorSpace:fe}},[fe]:{primaries:dl,whitePoint:fl,transfer:pe,toXYZ:pl,fromXYZ:ml,luminanceCoefficients:hl,outputColorSpaceConfig:{drawingBufferColorSpace:fe}}});let zi;class Rd{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{zi===void 0&&(zi=Uo("canvas")),zi.width=t.width,zi.height=t.height;const i=zi.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=zi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Uo("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const s=i.getImageData(0,0,t.width,t.height),o=s.data;for(let r=0;r<o.length;r++)o[r]=kn(o[r]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(kn(e[i]/255)*255):e[i]=kn(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Pd=0;class Bc{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Pd++}),this.uuid=Bn(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let o;if(Array.isArray(s)){o=[];for(let r=0,a=s.length;r<a;r++)s[r].isDataTexture?o.push(tr(s[r].image)):o.push(tr(s[r]))}else o=tr(s);i.url=o}return e||(t.images[this.uuid]=i),i}}function tr(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Rd.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Ld=0;class je extends fs{constructor(t=je.DEFAULT_IMAGE,e=je.DEFAULT_MAPPING,i=Ei,s=Ei,o=En,r=Ti,a=_n,l=Vn,c=je.DEFAULT_ANISOTROPY,u=ni){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ld++}),this.uuid=Bn(),this.name="",this.source=new Bc(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=o,this.minFilter=r,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Tt(0,0),this.repeat=new Tt(1,1),this.center=new Tt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new $t,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Tc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case li:t.x=t.x-Math.floor(t.x);break;case Ei:t.x=t.x<0?0:1;break;case Qr:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case li:t.y=t.y-Math.floor(t.y);break;case Ei:t.y=t.y<0?0:1;break;case Qr:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}je.DEFAULT_IMAGE=null;je.DEFAULT_MAPPING=Tc;je.DEFAULT_ANISOTROPY=1;class me{constructor(t=0,e=0,i=0,s=1){me.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,o=this.w,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s+r[12]*o,this.y=r[1]*e+r[5]*i+r[9]*s+r[13]*o,this.z=r[2]*e+r[6]*i+r[10]*s+r[14]*o,this.w=r[3]*e+r[7]*i+r[11]*s+r[15]*o,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,o;const l=t.elements,c=l[0],u=l[4],d=l[8],h=l[1],p=l[5],f=l[9],M=l[2],g=l[6],m=l[10];if(Math.abs(u-h)<.01&&Math.abs(d-M)<.01&&Math.abs(f-g)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+M)<.1&&Math.abs(f+g)<.1&&Math.abs(c+p+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const w=(c+1)/2,S=(p+1)/2,z=(m+1)/2,P=(u+h)/4,I=(d+M)/4,L=(f+g)/4;return w>S&&w>z?w<.01?(i=0,s=.707106781,o=.707106781):(i=Math.sqrt(w),s=P/i,o=I/i):S>z?S<.01?(i=.707106781,s=0,o=.707106781):(s=Math.sqrt(S),i=P/s,o=L/s):z<.01?(i=.707106781,s=.707106781,o=0):(o=Math.sqrt(z),i=I/o,s=L/o),this.set(i,s,o,e),this}let x=Math.sqrt((g-f)*(g-f)+(d-M)*(d-M)+(h-u)*(h-u));return Math.abs(x)<.001&&(x=1),this.x=(g-f)/x,this.y=(d-M)/x,this.z=(h-u)/x,this.w=Math.acos((c+p+m-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Id extends fs{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new me(0,0,t,e),this.scissorTest=!1,this.viewport=new me(0,0,t,e);const s={width:t,height:e,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:En,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const o=new je(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);o.flipY=!1,o.generateMipmaps=i.generateMipmaps,o.internalFormat=i.internalFormat,this.textures=[];const r=i.count;for(let a=0;a<r;a++)this.textures[a]=o.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,o=this.textures.length;s<o;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,s=t.textures.length;i<s;i++)this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Bc(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ri extends Id{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class kc extends je{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=vn,this.minFilter=vn,this.wrapR=Ei,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Dd extends je{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=vn,this.minFilter=vn,this.wrapR=Ei,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Hs{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,o,r,a){let l=i[s+0],c=i[s+1],u=i[s+2],d=i[s+3];const h=o[r+0],p=o[r+1],f=o[r+2],M=o[r+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=u,t[e+3]=d;return}if(a===1){t[e+0]=h,t[e+1]=p,t[e+2]=f,t[e+3]=M;return}if(d!==M||l!==h||c!==p||u!==f){let g=1-a;const m=l*h+c*p+u*f+d*M,x=m>=0?1:-1,w=1-m*m;if(w>Number.EPSILON){const z=Math.sqrt(w),P=Math.atan2(z,m*x);g=Math.sin(g*P)/z,a=Math.sin(a*P)/z}const S=a*x;if(l=l*g+h*S,c=c*g+p*S,u=u*g+f*S,d=d*g+M*S,g===1-a){const z=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=z,c*=z,u*=z,d*=z}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=d}static multiplyQuaternionsFlat(t,e,i,s,o,r){const a=i[s],l=i[s+1],c=i[s+2],u=i[s+3],d=o[r],h=o[r+1],p=o[r+2],f=o[r+3];return t[e]=a*f+u*d+l*p-c*h,t[e+1]=l*f+u*h+c*d-a*p,t[e+2]=c*f+u*p+a*h-l*d,t[e+3]=u*f-a*d-l*h-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,s=t._y,o=t._z,r=t._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(s/2),d=a(o/2),h=l(i/2),p=l(s/2),f=l(o/2);switch(r){case"XYZ":this._x=h*u*d+c*p*f,this._y=c*p*d-h*u*f,this._z=c*u*f+h*p*d,this._w=c*u*d-h*p*f;break;case"YXZ":this._x=h*u*d+c*p*f,this._y=c*p*d-h*u*f,this._z=c*u*f-h*p*d,this._w=c*u*d+h*p*f;break;case"ZXY":this._x=h*u*d-c*p*f,this._y=c*p*d+h*u*f,this._z=c*u*f+h*p*d,this._w=c*u*d-h*p*f;break;case"ZYX":this._x=h*u*d-c*p*f,this._y=c*p*d+h*u*f,this._z=c*u*f-h*p*d,this._w=c*u*d+h*p*f;break;case"YZX":this._x=h*u*d+c*p*f,this._y=c*p*d+h*u*f,this._z=c*u*f-h*p*d,this._w=c*u*d-h*p*f;break;case"XZY":this._x=h*u*d-c*p*f,this._y=c*p*d-h*u*f,this._z=c*u*f+h*p*d,this._w=c*u*d+h*p*f;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+r)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],s=e[4],o=e[8],r=e[1],a=e[5],l=e[9],c=e[2],u=e[6],d=e[10],h=i+a+d;if(h>0){const p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(u-l)*p,this._y=(o-c)*p,this._z=(r-s)*p}else if(i>a&&i>d){const p=2*Math.sqrt(1+i-a-d);this._w=(u-l)/p,this._x=.25*p,this._y=(s+r)/p,this._z=(o+c)/p}else if(a>d){const p=2*Math.sqrt(1+a-i-d);this._w=(o-c)/p,this._x=(s+r)/p,this._y=.25*p,this._z=(l+u)/p}else{const p=2*Math.sqrt(1+d-i-a);this._w=(r-s)/p,this._x=(o+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ve(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,s=t._y,o=t._z,r=t._w,a=e._x,l=e._y,c=e._z,u=e._w;return this._x=i*u+r*a+s*c-o*l,this._y=s*u+r*l+o*a-i*c,this._z=o*u+r*c+i*l-s*a,this._w=r*u-i*a-s*l-o*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,s=this._y,o=this._z,r=this._w;let a=r*t._w+i*t._x+s*t._y+o*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=r,this._x=i,this._y=s,this._z=o,this;const l=1-a*a;if(l<=Number.EPSILON){const p=1-e;return this._w=p*r+e*this._w,this._x=p*i+e*this._x,this._y=p*s+e*this._y,this._z=p*o+e*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),d=Math.sin((1-e)*u)/c,h=Math.sin(e*u)/c;return this._w=r*d+this._w*h,this._x=i*d+this._x*h,this._y=s*d+this._y*h,this._z=o*d+this._z*h,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),o=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),o*Math.sin(e),o*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class b{constructor(t=0,e=0,i=0){b.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(gl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(gl.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,s=this.z,o=t.elements;return this.x=o[0]*e+o[3]*i+o[6]*s,this.y=o[1]*e+o[4]*i+o[7]*s,this.z=o[2]*e+o[5]*i+o[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,o=t.elements,r=1/(o[3]*e+o[7]*i+o[11]*s+o[15]);return this.x=(o[0]*e+o[4]*i+o[8]*s+o[12])*r,this.y=(o[1]*e+o[5]*i+o[9]*s+o[13])*r,this.z=(o[2]*e+o[6]*i+o[10]*s+o[14])*r,this}applyQuaternion(t){const e=this.x,i=this.y,s=this.z,o=t.x,r=t.y,a=t.z,l=t.w,c=2*(r*s-a*i),u=2*(a*e-o*s),d=2*(o*i-r*e);return this.x=e+l*c+r*d-a*u,this.y=i+l*u+a*c-o*d,this.z=s+l*d+o*u-r*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,s=this.z,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*s,this.y=o[1]*e+o[5]*i+o[9]*s,this.z=o[2]*e+o[6]*i+o[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,s=t.y,o=t.z,r=e.x,a=e.y,l=e.z;return this.x=s*l-o*a,this.y=o*r-i*l,this.z=i*a-s*r,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return er.copy(this).projectOnVector(t),this.sub(er)}reflect(t){return this.sub(er.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Ve(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const er=new b,gl=new Hs;class Vs{constructor(t=new b(1/0,1/0,1/0),e=new b(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(fn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(fn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=fn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const o=i.getAttribute("position");if(e===!0&&o!==void 0&&t.isInstancedMesh!==!0)for(let r=0,a=o.count;r<a;r++)t.isMesh===!0?t.getVertexPosition(r,fn):fn.fromBufferAttribute(o,r),fn.applyMatrix4(t.matrixWorld),this.expandByPoint(fn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Zs.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Zs.copy(i.boundingBox)),Zs.applyMatrix4(t.matrixWorld),this.union(Zs)}const s=t.children;for(let o=0,r=s.length;o<r;o++)this.expandByObject(s[o],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,fn),fn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ms),Ks.subVectors(this.max,Ms),Fi.subVectors(t.a,Ms),Oi.subVectors(t.b,Ms),Bi.subVectors(t.c,Ms),Kn.subVectors(Oi,Fi),Jn.subVectors(Bi,Oi),di.subVectors(Fi,Bi);let e=[0,-Kn.z,Kn.y,0,-Jn.z,Jn.y,0,-di.z,di.y,Kn.z,0,-Kn.x,Jn.z,0,-Jn.x,di.z,0,-di.x,-Kn.y,Kn.x,0,-Jn.y,Jn.x,0,-di.y,di.x,0];return!nr(e,Fi,Oi,Bi,Ks)||(e=[1,0,0,0,1,0,0,0,1],!nr(e,Fi,Oi,Bi,Ks))?!1:(Js.crossVectors(Kn,Jn),e=[Js.x,Js.y,Js.z],nr(e,Fi,Oi,Bi,Ks))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,fn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(fn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Rn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Rn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Rn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Rn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Rn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Rn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Rn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Rn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Rn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Rn=[new b,new b,new b,new b,new b,new b,new b,new b],fn=new b,Zs=new Vs,Fi=new b,Oi=new b,Bi=new b,Kn=new b,Jn=new b,di=new b,Ms=new b,Ks=new b,Js=new b,hi=new b;function nr(n,t,e,i,s){for(let o=0,r=n.length-3;o<=r;o+=3){hi.fromArray(n,o);const a=s.x*Math.abs(hi.x)+s.y*Math.abs(hi.y)+s.z*Math.abs(hi.z),l=t.dot(hi),c=e.dot(hi),u=i.dot(hi);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const Ud=new Vs,ys=new b,ir=new b;class Ws{constructor(t=new b,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):Ud.setFromPoints(t).getCenter(i);let s=0;for(let o=0,r=t.length;o<r;o++)s=Math.max(s,i.distanceToSquared(t[o]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ys.subVectors(t,this.center);const e=ys.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(ys,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(ir.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ys.copy(t.center).add(ir)),this.expandByPoint(ys.copy(t.center).sub(ir))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Pn=new b,sr=new b,js=new b,jn=new b,or=new b,Qs=new b,rr=new b;class qo{constructor(t=new b,e=new b(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Pn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Pn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Pn.copy(this.origin).addScaledVector(this.direction,e),Pn.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){sr.copy(t).add(e).multiplyScalar(.5),js.copy(e).sub(t).normalize(),jn.copy(this.origin).sub(sr);const o=t.distanceTo(e)*.5,r=-this.direction.dot(js),a=jn.dot(this.direction),l=-jn.dot(js),c=jn.lengthSq(),u=Math.abs(1-r*r);let d,h,p,f;if(u>0)if(d=r*l-a,h=r*a-l,f=o*u,d>=0)if(h>=-f)if(h<=f){const M=1/u;d*=M,h*=M,p=d*(d+r*h+2*a)+h*(r*d+h+2*l)+c}else h=o,d=Math.max(0,-(r*h+a)),p=-d*d+h*(h+2*l)+c;else h=-o,d=Math.max(0,-(r*h+a)),p=-d*d+h*(h+2*l)+c;else h<=-f?(d=Math.max(0,-(-r*o+a)),h=d>0?-o:Math.min(Math.max(-o,-l),o),p=-d*d+h*(h+2*l)+c):h<=f?(d=0,h=Math.min(Math.max(-o,-l),o),p=h*(h+2*l)+c):(d=Math.max(0,-(r*o+a)),h=d>0?o:Math.min(Math.max(-o,-l),o),p=-d*d+h*(h+2*l)+c);else h=r>0?-o:o,d=Math.max(0,-(r*h+a)),p=-d*d+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(sr).addScaledVector(js,h),p}intersectSphere(t,e){Pn.subVectors(t.center,this.origin);const i=Pn.dot(this.direction),s=Pn.dot(Pn)-i*i,o=t.radius*t.radius;if(s>o)return null;const r=Math.sqrt(o-s),a=i-r,l=i+r;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,o,r,a,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return c>=0?(i=(t.min.x-h.x)*c,s=(t.max.x-h.x)*c):(i=(t.max.x-h.x)*c,s=(t.min.x-h.x)*c),u>=0?(o=(t.min.y-h.y)*u,r=(t.max.y-h.y)*u):(o=(t.max.y-h.y)*u,r=(t.min.y-h.y)*u),i>r||o>s||((o>i||isNaN(i))&&(i=o),(r<s||isNaN(s))&&(s=r),d>=0?(a=(t.min.z-h.z)*d,l=(t.max.z-h.z)*d):(a=(t.max.z-h.z)*d,l=(t.min.z-h.z)*d),i>l||a>s)||((a>i||i!==i)&&(i=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,Pn)!==null}intersectTriangle(t,e,i,s,o){or.subVectors(e,t),Qs.subVectors(i,t),rr.crossVectors(or,Qs);let r=this.direction.dot(rr),a;if(r>0){if(s)return null;a=1}else if(r<0)a=-1,r=-r;else return null;jn.subVectors(this.origin,t);const l=a*this.direction.dot(Qs.crossVectors(jn,Qs));if(l<0)return null;const c=a*this.direction.dot(or.cross(jn));if(c<0||l+c>r)return null;const u=-a*jn.dot(rr);return u<0?null:this.at(u/r,o)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class _e{constructor(t,e,i,s,o,r,a,l,c,u,d,h,p,f,M,g){_e.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,o,r,a,l,c,u,d,h,p,f,M,g)}set(t,e,i,s,o,r,a,l,c,u,d,h,p,f,M,g){const m=this.elements;return m[0]=t,m[4]=e,m[8]=i,m[12]=s,m[1]=o,m[5]=r,m[9]=a,m[13]=l,m[2]=c,m[6]=u,m[10]=d,m[14]=h,m[3]=p,m[7]=f,m[11]=M,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new _e().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,s=1/ki.setFromMatrixColumn(t,0).length(),o=1/ki.setFromMatrixColumn(t,1).length(),r=1/ki.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*o,e[5]=i[5]*o,e[6]=i[6]*o,e[7]=0,e[8]=i[8]*r,e[9]=i[9]*r,e[10]=i[10]*r,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,s=t.y,o=t.z,r=Math.cos(i),a=Math.sin(i),l=Math.cos(s),c=Math.sin(s),u=Math.cos(o),d=Math.sin(o);if(t.order==="XYZ"){const h=r*u,p=r*d,f=a*u,M=a*d;e[0]=l*u,e[4]=-l*d,e[8]=c,e[1]=p+f*c,e[5]=h-M*c,e[9]=-a*l,e[2]=M-h*c,e[6]=f+p*c,e[10]=r*l}else if(t.order==="YXZ"){const h=l*u,p=l*d,f=c*u,M=c*d;e[0]=h+M*a,e[4]=f*a-p,e[8]=r*c,e[1]=r*d,e[5]=r*u,e[9]=-a,e[2]=p*a-f,e[6]=M+h*a,e[10]=r*l}else if(t.order==="ZXY"){const h=l*u,p=l*d,f=c*u,M=c*d;e[0]=h-M*a,e[4]=-r*d,e[8]=f+p*a,e[1]=p+f*a,e[5]=r*u,e[9]=M-h*a,e[2]=-r*c,e[6]=a,e[10]=r*l}else if(t.order==="ZYX"){const h=r*u,p=r*d,f=a*u,M=a*d;e[0]=l*u,e[4]=f*c-p,e[8]=h*c+M,e[1]=l*d,e[5]=M*c+h,e[9]=p*c-f,e[2]=-c,e[6]=a*l,e[10]=r*l}else if(t.order==="YZX"){const h=r*l,p=r*c,f=a*l,M=a*c;e[0]=l*u,e[4]=M-h*d,e[8]=f*d+p,e[1]=d,e[5]=r*u,e[9]=-a*u,e[2]=-c*u,e[6]=p*d+f,e[10]=h-M*d}else if(t.order==="XZY"){const h=r*l,p=r*c,f=a*l,M=a*c;e[0]=l*u,e[4]=-d,e[8]=c*u,e[1]=h*d+M,e[5]=r*u,e[9]=p*d-f,e[2]=f*d-p,e[6]=a*u,e[10]=M*d+h}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Nd,t,zd)}lookAt(t,e,i){const s=this.elements;return sn.subVectors(t,e),sn.lengthSq()===0&&(sn.z=1),sn.normalize(),Qn.crossVectors(i,sn),Qn.lengthSq()===0&&(Math.abs(i.z)===1?sn.x+=1e-4:sn.z+=1e-4,sn.normalize(),Qn.crossVectors(i,sn)),Qn.normalize(),to.crossVectors(sn,Qn),s[0]=Qn.x,s[4]=to.x,s[8]=sn.x,s[1]=Qn.y,s[5]=to.y,s[9]=sn.y,s[2]=Qn.z,s[6]=to.z,s[10]=sn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,o=this.elements,r=i[0],a=i[4],l=i[8],c=i[12],u=i[1],d=i[5],h=i[9],p=i[13],f=i[2],M=i[6],g=i[10],m=i[14],x=i[3],w=i[7],S=i[11],z=i[15],P=s[0],I=s[4],L=s[8],y=s[12],_=s[1],A=s[5],U=s[9],O=s[13],K=s[2],tt=s[6],J=s[10],st=s[14],$=s[3],ct=s[7],dt=s[11],It=s[15];return o[0]=r*P+a*_+l*K+c*$,o[4]=r*I+a*A+l*tt+c*ct,o[8]=r*L+a*U+l*J+c*dt,o[12]=r*y+a*O+l*st+c*It,o[1]=u*P+d*_+h*K+p*$,o[5]=u*I+d*A+h*tt+p*ct,o[9]=u*L+d*U+h*J+p*dt,o[13]=u*y+d*O+h*st+p*It,o[2]=f*P+M*_+g*K+m*$,o[6]=f*I+M*A+g*tt+m*ct,o[10]=f*L+M*U+g*J+m*dt,o[14]=f*y+M*O+g*st+m*It,o[3]=x*P+w*_+S*K+z*$,o[7]=x*I+w*A+S*tt+z*ct,o[11]=x*L+w*U+S*J+z*dt,o[15]=x*y+w*O+S*st+z*It,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],s=t[8],o=t[12],r=t[1],a=t[5],l=t[9],c=t[13],u=t[2],d=t[6],h=t[10],p=t[14],f=t[3],M=t[7],g=t[11],m=t[15];return f*(+o*l*d-s*c*d-o*a*h+i*c*h+s*a*p-i*l*p)+M*(+e*l*p-e*c*h+o*r*h-s*r*p+s*c*u-o*l*u)+g*(+e*c*d-e*a*p-o*r*d+i*r*p+o*a*u-i*c*u)+m*(-s*a*u-e*l*d+e*a*h+s*r*d-i*r*h+i*l*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],o=t[3],r=t[4],a=t[5],l=t[6],c=t[7],u=t[8],d=t[9],h=t[10],p=t[11],f=t[12],M=t[13],g=t[14],m=t[15],x=d*g*c-M*h*c+M*l*p-a*g*p-d*l*m+a*h*m,w=f*h*c-u*g*c-f*l*p+r*g*p+u*l*m-r*h*m,S=u*M*c-f*d*c+f*a*p-r*M*p-u*a*m+r*d*m,z=f*d*l-u*M*l-f*a*h+r*M*h+u*a*g-r*d*g,P=e*x+i*w+s*S+o*z;if(P===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const I=1/P;return t[0]=x*I,t[1]=(M*h*o-d*g*o-M*s*p+i*g*p+d*s*m-i*h*m)*I,t[2]=(a*g*o-M*l*o+M*s*c-i*g*c-a*s*m+i*l*m)*I,t[3]=(d*l*o-a*h*o-d*s*c+i*h*c+a*s*p-i*l*p)*I,t[4]=w*I,t[5]=(u*g*o-f*h*o+f*s*p-e*g*p-u*s*m+e*h*m)*I,t[6]=(f*l*o-r*g*o-f*s*c+e*g*c+r*s*m-e*l*m)*I,t[7]=(r*h*o-u*l*o+u*s*c-e*h*c-r*s*p+e*l*p)*I,t[8]=S*I,t[9]=(f*d*o-u*M*o-f*i*p+e*M*p+u*i*m-e*d*m)*I,t[10]=(r*M*o-f*a*o+f*i*c-e*M*c-r*i*m+e*a*m)*I,t[11]=(u*a*o-r*d*o-u*i*c+e*d*c+r*i*p-e*a*p)*I,t[12]=z*I,t[13]=(u*M*s-f*d*s+f*i*h-e*M*h-u*i*g+e*d*g)*I,t[14]=(f*a*s-r*M*s-f*i*l+e*M*l+r*i*g-e*a*g)*I,t[15]=(r*d*s-u*a*s+u*i*l-e*d*l-r*i*h+e*a*h)*I,this}scale(t){const e=this.elements,i=t.x,s=t.y,o=t.z;return e[0]*=i,e[4]*=s,e[8]*=o,e[1]*=i,e[5]*=s,e[9]*=o,e[2]*=i,e[6]*=s,e[10]*=o,e[3]*=i,e[7]*=s,e[11]*=o,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),s=Math.sin(e),o=1-i,r=t.x,a=t.y,l=t.z,c=o*r,u=o*a;return this.set(c*r+i,c*a-s*l,c*l+s*a,0,c*a+s*l,u*a+i,u*l-s*r,0,c*l-s*a,u*l+s*r,o*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,o,r){return this.set(1,i,o,0,t,1,r,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){const s=this.elements,o=e._x,r=e._y,a=e._z,l=e._w,c=o+o,u=r+r,d=a+a,h=o*c,p=o*u,f=o*d,M=r*u,g=r*d,m=a*d,x=l*c,w=l*u,S=l*d,z=i.x,P=i.y,I=i.z;return s[0]=(1-(M+m))*z,s[1]=(p+S)*z,s[2]=(f-w)*z,s[3]=0,s[4]=(p-S)*P,s[5]=(1-(h+m))*P,s[6]=(g+x)*P,s[7]=0,s[8]=(f+w)*I,s[9]=(g-x)*I,s[10]=(1-(h+M))*I,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){const s=this.elements;let o=ki.set(s[0],s[1],s[2]).length();const r=ki.set(s[4],s[5],s[6]).length(),a=ki.set(s[8],s[9],s[10]).length();this.determinant()<0&&(o=-o),t.x=s[12],t.y=s[13],t.z=s[14],pn.copy(this);const c=1/o,u=1/r,d=1/a;return pn.elements[0]*=c,pn.elements[1]*=c,pn.elements[2]*=c,pn.elements[4]*=u,pn.elements[5]*=u,pn.elements[6]*=u,pn.elements[8]*=d,pn.elements[9]*=d,pn.elements[10]*=d,e.setFromRotationMatrix(pn),i.x=o,i.y=r,i.z=a,this}makePerspective(t,e,i,s,o,r,a=On){const l=this.elements,c=2*o/(e-t),u=2*o/(i-s),d=(e+t)/(e-t),h=(i+s)/(i-s);let p,f;if(a===On)p=-(r+o)/(r-o),f=-2*r*o/(r-o);else if(a===Do)p=-r/(r-o),f=-r*o/(r-o);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=f,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,s,o,r,a=On){const l=this.elements,c=1/(e-t),u=1/(i-s),d=1/(r-o),h=(e+t)*c,p=(i+s)*u;let f,M;if(a===On)f=(r+o)*d,M=-2*d;else if(a===Do)f=o*d,M=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-h,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=M,l[14]=-f,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const ki=new b,pn=new _e,Nd=new b(0,0,0),zd=new b(1,1,1),Qn=new b,to=new b,sn=new b,_l=new _e,vl=new Hs;class yn{constructor(t=0,e=0,i=0,s=yn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const s=t.elements,o=s[0],r=s[4],a=s[8],l=s[1],c=s[5],u=s[9],d=s[2],h=s[6],p=s[10];switch(e){case"XYZ":this._y=Math.asin(Ve(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-r,o)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ve(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,o),this._z=0);break;case"ZXY":this._x=Math.asin(Ve(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-r,c)):(this._y=0,this._z=Math.atan2(l,o));break;case"ZYX":this._y=Math.asin(-Ve(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(l,o)):(this._x=0,this._z=Math.atan2(-r,c));break;case"YZX":this._z=Math.asin(Ve(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,o)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Ve(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(a,o)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return _l.makeRotationFromQuaternion(t),this.setFromRotationMatrix(_l,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return vl.setFromEuler(this),this.setFromQuaternion(vl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}yn.DEFAULT_ORDER="XYZ";class Ga{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Fd=0;const Ml=new b,Gi=new Hs,Ln=new _e,eo=new b,Ss=new b,Od=new b,Bd=new Hs,yl=new b(1,0,0),Sl=new b(0,1,0),xl=new b(0,0,1),wl={type:"added"},kd={type:"removed"},Hi={type:"childadded",child:null},ar={type:"childremoved",child:null};class Pe extends fs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Fd++}),this.uuid=Bn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Pe.DEFAULT_UP.clone();const t=new b,e=new yn,i=new Hs,s=new b(1,1,1);function o(){i.setFromEuler(e,!1)}function r(){e.setFromQuaternion(i,void 0,!1)}e._onChange(o),i._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new _e},normalMatrix:{value:new $t}}),this.matrix=new _e,this.matrixWorld=new _e,this.matrixAutoUpdate=Pe.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Pe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ga,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Gi.setFromAxisAngle(t,e),this.quaternion.multiply(Gi),this}rotateOnWorldAxis(t,e){return Gi.setFromAxisAngle(t,e),this.quaternion.premultiply(Gi),this}rotateX(t){return this.rotateOnAxis(yl,t)}rotateY(t){return this.rotateOnAxis(Sl,t)}rotateZ(t){return this.rotateOnAxis(xl,t)}translateOnAxis(t,e){return Ml.copy(t).applyQuaternion(this.quaternion),this.position.add(Ml.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(yl,t)}translateY(t){return this.translateOnAxis(Sl,t)}translateZ(t){return this.translateOnAxis(xl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Ln.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?eo.copy(t):eo.set(t,e,i);const s=this.parent;this.updateWorldMatrix(!0,!1),Ss.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ln.lookAt(Ss,eo,this.up):Ln.lookAt(eo,Ss,this.up),this.quaternion.setFromRotationMatrix(Ln),s&&(Ln.extractRotation(s.matrixWorld),Gi.setFromRotationMatrix(Ln),this.quaternion.premultiply(Gi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(wl),Hi.child=t,this.dispatchEvent(Hi),Hi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(kd),ar.child=t,this.dispatchEvent(ar),ar.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Ln.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Ln.multiply(t.parent.matrixWorld)),t.applyMatrix4(Ln),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(wl),Hi.child=t,this.dispatchEvent(Hi),Hi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){const r=this.children[i].getObjectByProperty(t,e);if(r!==void 0)return r}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const s=this.children;for(let o=0,r=s.length;o<r;o++)s[o].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ss,t,Od),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ss,Bd,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let o=0,r=s.length;o<r;o++)s[o].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function o(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=o(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];o(t.shapes,d)}else o(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(o(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(o(t.materials,this.material[l]));s.material=a}else s.material=o(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(o(t.animations,l))}}if(e){const a=r(t.geometries),l=r(t.materials),c=r(t.textures),u=r(t.images),d=r(t.shapes),h=r(t.skeletons),p=r(t.animations),f=r(t.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),d.length>0&&(i.shapes=d),h.length>0&&(i.skeletons=h),p.length>0&&(i.animations=p),f.length>0&&(i.nodes=f)}return i.object=s,i;function r(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const s=t.children[i];this.add(s.clone())}return this}}Pe.DEFAULT_UP=new b(0,1,0);Pe.DEFAULT_MATRIX_AUTO_UPDATE=!0;Pe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const mn=new b,In=new b,lr=new b,Dn=new b,Vi=new b,Wi=new b,bl=new b,cr=new b,ur=new b,dr=new b,hr=new me,fr=new me,pr=new me;class hn{constructor(t=new b,e=new b,i=new b){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),mn.subVectors(t,e),s.cross(mn);const o=s.lengthSq();return o>0?s.multiplyScalar(1/Math.sqrt(o)):s.set(0,0,0)}static getBarycoord(t,e,i,s,o){mn.subVectors(s,e),In.subVectors(i,e),lr.subVectors(t,e);const r=mn.dot(mn),a=mn.dot(In),l=mn.dot(lr),c=In.dot(In),u=In.dot(lr),d=r*c-a*a;if(d===0)return o.set(0,0,0),null;const h=1/d,p=(c*l-a*u)*h,f=(r*u-a*l)*h;return o.set(1-p-f,f,p)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,Dn)===null?!1:Dn.x>=0&&Dn.y>=0&&Dn.x+Dn.y<=1}static getInterpolation(t,e,i,s,o,r,a,l){return this.getBarycoord(t,e,i,s,Dn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(o,Dn.x),l.addScaledVector(r,Dn.y),l.addScaledVector(a,Dn.z),l)}static getInterpolatedAttribute(t,e,i,s,o,r){return hr.setScalar(0),fr.setScalar(0),pr.setScalar(0),hr.fromBufferAttribute(t,e),fr.fromBufferAttribute(t,i),pr.fromBufferAttribute(t,s),r.setScalar(0),r.addScaledVector(hr,o.x),r.addScaledVector(fr,o.y),r.addScaledVector(pr,o.z),r}static isFrontFacing(t,e,i,s){return mn.subVectors(i,e),In.subVectors(t,e),mn.cross(In).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return mn.subVectors(this.c,this.b),In.subVectors(this.a,this.b),mn.cross(In).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return hn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return hn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,o){return hn.getInterpolation(t,this.a,this.b,this.c,e,i,s,o)}containsPoint(t){return hn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return hn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,s=this.b,o=this.c;let r,a;Vi.subVectors(s,i),Wi.subVectors(o,i),cr.subVectors(t,i);const l=Vi.dot(cr),c=Wi.dot(cr);if(l<=0&&c<=0)return e.copy(i);ur.subVectors(t,s);const u=Vi.dot(ur),d=Wi.dot(ur);if(u>=0&&d<=u)return e.copy(s);const h=l*d-u*c;if(h<=0&&l>=0&&u<=0)return r=l/(l-u),e.copy(i).addScaledVector(Vi,r);dr.subVectors(t,o);const p=Vi.dot(dr),f=Wi.dot(dr);if(f>=0&&p<=f)return e.copy(o);const M=p*c-l*f;if(M<=0&&c>=0&&f<=0)return a=c/(c-f),e.copy(i).addScaledVector(Wi,a);const g=u*f-p*d;if(g<=0&&d-u>=0&&p-f>=0)return bl.subVectors(o,s),a=(d-u)/(d-u+(p-f)),e.copy(s).addScaledVector(bl,a);const m=1/(g+M+h);return r=M*m,a=h*m,e.copy(i).addScaledVector(Vi,r).addScaledVector(Wi,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Gc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ti={h:0,s:0,l:0},no={h:0,s:0,l:0};function mr(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class Et{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=fe){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,re.toWorkingColorSpace(this,e),this}setRGB(t,e,i,s=re.workingColorSpace){return this.r=t,this.g=e,this.b=i,re.toWorkingColorSpace(this,s),this}setHSL(t,e,i,s=re.workingColorSpace){if(t=ka(t,1),e=Ve(e,0,1),i=Ve(i,0,1),e===0)this.r=this.g=this.b=i;else{const o=i<=.5?i*(1+e):i+e-i*e,r=2*i-o;this.r=mr(r,o,t+1/3),this.g=mr(r,o,t),this.b=mr(r,o,t-1/3)}return re.toWorkingColorSpace(this,s),this}setStyle(t,e=fe){function i(o){o!==void 0&&parseFloat(o)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let o;const r=s[1],a=s[2];switch(r){case"rgb":case"rgba":if(o=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(o[4]),this.setRGB(Math.min(255,parseInt(o[1],10))/255,Math.min(255,parseInt(o[2],10))/255,Math.min(255,parseInt(o[3],10))/255,e);if(o=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(o[4]),this.setRGB(Math.min(100,parseInt(o[1],10))/100,Math.min(100,parseInt(o[2],10))/100,Math.min(100,parseInt(o[3],10))/100,e);break;case"hsl":case"hsla":if(o=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(o[4]),this.setHSL(parseFloat(o[1])/360,parseFloat(o[2])/100,parseFloat(o[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const o=s[1],r=o.length;if(r===3)return this.setRGB(parseInt(o.charAt(0),16)/15,parseInt(o.charAt(1),16)/15,parseInt(o.charAt(2),16)/15,e);if(r===6)return this.setHex(parseInt(o,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=fe){const i=Gc[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=kn(t.r),this.g=kn(t.g),this.b=kn(t.b),this}copyLinearToSRGB(t){return this.r=ns(t.r),this.g=ns(t.g),this.b=ns(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=fe){return re.fromWorkingColorSpace(Ye.copy(this),t),Math.round(Ve(Ye.r*255,0,255))*65536+Math.round(Ve(Ye.g*255,0,255))*256+Math.round(Ve(Ye.b*255,0,255))}getHexString(t=fe){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=re.workingColorSpace){re.fromWorkingColorSpace(Ye.copy(this),e);const i=Ye.r,s=Ye.g,o=Ye.b,r=Math.max(i,s,o),a=Math.min(i,s,o);let l,c;const u=(a+r)/2;if(a===r)l=0,c=0;else{const d=r-a;switch(c=u<=.5?d/(r+a):d/(2-r-a),r){case i:l=(s-o)/d+(s<o?6:0);break;case s:l=(o-i)/d+2;break;case o:l=(i-s)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=re.workingColorSpace){return re.fromWorkingColorSpace(Ye.copy(this),e),t.r=Ye.r,t.g=Ye.g,t.b=Ye.b,t}getStyle(t=fe){re.fromWorkingColorSpace(Ye.copy(this),t);const e=Ye.r,i=Ye.g,s=Ye.b;return t!==fe?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(ti),this.setHSL(ti.h+t,ti.s+e,ti.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(ti),t.getHSL(no);const i=Us(ti.h,no.h,e),s=Us(ti.s,no.s,e),o=Us(ti.l,no.l,e);return this.setHSL(i,s,o),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,s=this.b,o=t.elements;return this.r=o[0]*e+o[3]*i+o[6]*s,this.g=o[1]*e+o[4]*i+o[7]*s,this.b=o[2]*e+o[5]*i+o[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ye=new Et;Et.NAMES=Gc;let Gd=0;class Xn extends fs{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Gd++}),this.uuid=Bn(),this.name="",this.blending=Ai,this.side=ai,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Hr,this.blendDst=Vr,this.blendEquation=wi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Et(0,0,0),this.blendAlpha=0,this.depthFunc=os,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=al,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ni,this.stencilZFail=Ni,this.stencilZPass=Ni,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Ai&&(i.blending=this.blending),this.side!==ai&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Hr&&(i.blendSrc=this.blendSrc),this.blendDst!==Vr&&(i.blendDst=this.blendDst),this.blendEquation!==wi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==os&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==al&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ni&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Ni&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Ni&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(o){const r=[];for(const a in o){const l=o[a];delete l.metadata,r.push(l)}return r}if(e){const o=s(t.textures),r=s(t.images);o.length>0&&(i.textures=o),r.length>0&&(i.images=r)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const s=e.length;i=new Array(s);for(let o=0;o!==s;++o)i[o]=e[o].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Ge extends Xn{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Et(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new yn,this.combine=Ia,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Ce=new b,io=new Tt;class Ne{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=Ta,this.updateRanges=[],this.gpuType=Fn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,o=this.itemSize;s<o;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)io.fromBufferAttribute(this,e),io.applyMatrix3(t),this.setXY(e,io.x,io.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Ce.fromBufferAttribute(this,e),Ce.applyMatrix3(t),this.setXYZ(e,Ce.x,Ce.y,Ce.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Ce.fromBufferAttribute(this,e),Ce.applyMatrix4(t),this.setXYZ(e,Ce.x,Ce.y,Ce.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Ce.fromBufferAttribute(this,e),Ce.applyNormalMatrix(t),this.setXYZ(e,Ce.x,Ce.y,Ce.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Ce.fromBufferAttribute(this,e),Ce.transformDirection(t),this.setXYZ(e,Ce.x,Ce.y,Ce.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=gn(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=he(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=gn(e,this.array)),e}setX(t,e){return this.normalized&&(e=he(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=gn(e,this.array)),e}setY(t,e){return this.normalized&&(e=he(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=gn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=he(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=gn(e,this.array)),e}setW(t,e){return this.normalized&&(e=he(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=he(e,this.array),i=he(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=he(e,this.array),i=he(i,this.array),s=he(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,o){return t*=this.itemSize,this.normalized&&(e=he(e,this.array),i=he(i,this.array),s=he(s,this.array),o=he(o,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=o,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Ta&&(t.usage=this.usage),t}}class Hc extends Ne{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class Vc extends Ne{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class xe extends Ne{constructor(t,e,i){super(new Float32Array(t),e,i)}}let Hd=0;const dn=new _e,gr=new Pe,Xi=new b,on=new Vs,xs=new Vs,Be=new b;class Ee extends fs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Hd++}),this.uuid=Bn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Oc(t)?Vc:Hc)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const o=new $t().getNormalMatrix(t);i.applyNormalMatrix(o),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return dn.makeRotationFromQuaternion(t),this.applyMatrix4(dn),this}rotateX(t){return dn.makeRotationX(t),this.applyMatrix4(dn),this}rotateY(t){return dn.makeRotationY(t),this.applyMatrix4(dn),this}rotateZ(t){return dn.makeRotationZ(t),this.applyMatrix4(dn),this}translate(t,e,i){return dn.makeTranslation(t,e,i),this.applyMatrix4(dn),this}scale(t,e,i){return dn.makeScale(t,e,i),this.applyMatrix4(dn),this}lookAt(t){return gr.lookAt(t),gr.updateMatrix(),this.applyMatrix4(gr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Xi).negate(),this.translate(Xi.x,Xi.y,Xi.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let s=0,o=t.length;s<o;s++){const r=t[s];i.push(r.x,r.y,r.z||0)}this.setAttribute("position",new xe(i,3))}else{for(let i=0,s=e.count;i<s;i++){const o=t[i];e.setXYZ(i,o.x,o.y,o.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Vs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new b(-1/0,-1/0,-1/0),new b(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){const o=e[i];on.setFromBufferAttribute(o),this.morphTargetsRelative?(Be.addVectors(this.boundingBox.min,on.min),this.boundingBox.expandByPoint(Be),Be.addVectors(this.boundingBox.max,on.max),this.boundingBox.expandByPoint(Be)):(this.boundingBox.expandByPoint(on.min),this.boundingBox.expandByPoint(on.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ws);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new b,1/0);return}if(t){const i=this.boundingSphere.center;if(on.setFromBufferAttribute(t),e)for(let o=0,r=e.length;o<r;o++){const a=e[o];xs.setFromBufferAttribute(a),this.morphTargetsRelative?(Be.addVectors(on.min,xs.min),on.expandByPoint(Be),Be.addVectors(on.max,xs.max),on.expandByPoint(Be)):(on.expandByPoint(xs.min),on.expandByPoint(xs.max))}on.getCenter(i);let s=0;for(let o=0,r=t.count;o<r;o++)Be.fromBufferAttribute(t,o),s=Math.max(s,i.distanceToSquared(Be));if(e)for(let o=0,r=e.length;o<r;o++){const a=e[o],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Be.fromBufferAttribute(a,c),l&&(Xi.fromBufferAttribute(t,c),Be.add(Xi)),s=Math.max(s,i.distanceToSquared(Be))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,s=e.normal,o=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ne(new Float32Array(4*i.count),4));const r=this.getAttribute("tangent"),a=[],l=[];for(let L=0;L<i.count;L++)a[L]=new b,l[L]=new b;const c=new b,u=new b,d=new b,h=new Tt,p=new Tt,f=new Tt,M=new b,g=new b;function m(L,y,_){c.fromBufferAttribute(i,L),u.fromBufferAttribute(i,y),d.fromBufferAttribute(i,_),h.fromBufferAttribute(o,L),p.fromBufferAttribute(o,y),f.fromBufferAttribute(o,_),u.sub(c),d.sub(c),p.sub(h),f.sub(h);const A=1/(p.x*f.y-f.x*p.y);isFinite(A)&&(M.copy(u).multiplyScalar(f.y).addScaledVector(d,-p.y).multiplyScalar(A),g.copy(d).multiplyScalar(p.x).addScaledVector(u,-f.x).multiplyScalar(A),a[L].add(M),a[y].add(M),a[_].add(M),l[L].add(g),l[y].add(g),l[_].add(g))}let x=this.groups;x.length===0&&(x=[{start:0,count:t.count}]);for(let L=0,y=x.length;L<y;++L){const _=x[L],A=_.start,U=_.count;for(let O=A,K=A+U;O<K;O+=3)m(t.getX(O+0),t.getX(O+1),t.getX(O+2))}const w=new b,S=new b,z=new b,P=new b;function I(L){z.fromBufferAttribute(s,L),P.copy(z);const y=a[L];w.copy(y),w.sub(z.multiplyScalar(z.dot(y))).normalize(),S.crossVectors(P,y);const A=S.dot(l[L])<0?-1:1;r.setXYZW(L,w.x,w.y,w.z,A)}for(let L=0,y=x.length;L<y;++L){const _=x[L],A=_.start,U=_.count;for(let O=A,K=A+U;O<K;O+=3)I(t.getX(O+0)),I(t.getX(O+1)),I(t.getX(O+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Ne(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let h=0,p=i.count;h<p;h++)i.setXYZ(h,0,0,0);const s=new b,o=new b,r=new b,a=new b,l=new b,c=new b,u=new b,d=new b;if(t)for(let h=0,p=t.count;h<p;h+=3){const f=t.getX(h+0),M=t.getX(h+1),g=t.getX(h+2);s.fromBufferAttribute(e,f),o.fromBufferAttribute(e,M),r.fromBufferAttribute(e,g),u.subVectors(r,o),d.subVectors(s,o),u.cross(d),a.fromBufferAttribute(i,f),l.fromBufferAttribute(i,M),c.fromBufferAttribute(i,g),a.add(u),l.add(u),c.add(u),i.setXYZ(f,a.x,a.y,a.z),i.setXYZ(M,l.x,l.y,l.z),i.setXYZ(g,c.x,c.y,c.z)}else for(let h=0,p=e.count;h<p;h+=3)s.fromBufferAttribute(e,h+0),o.fromBufferAttribute(e,h+1),r.fromBufferAttribute(e,h+2),u.subVectors(r,o),d.subVectors(s,o),u.cross(d),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Be.fromBufferAttribute(t,e),Be.normalize(),t.setXYZ(e,Be.x,Be.y,Be.z)}toNonIndexed(){function t(a,l){const c=a.array,u=a.itemSize,d=a.normalized,h=new c.constructor(l.length*u);let p=0,f=0;for(let M=0,g=l.length;M<g;M++){a.isInterleavedBufferAttribute?p=l[M]*a.data.stride+a.offset:p=l[M]*u;for(let m=0;m<u;m++)h[f++]=c[p++]}return new Ne(h,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Ee,i=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=t(l,i);e.setAttribute(a,c)}const o=this.morphAttributes;for(const a in o){const l=[],c=o[a];for(let u=0,d=c.length;u<d;u++){const h=c[u],p=t(h,i);l.push(p)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const r=this.groups;for(let a=0,l=r.length;a<l;a++){const c=r[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const l in i){const c=i[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let o=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,h=c.length;d<h;d++){const p=c[d];u.push(p.toJSON(t.data))}u.length>0&&(s[l]=u,o=!0)}o&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const r=this.groups;r.length>0&&(t.data.groups=JSON.parse(JSON.stringify(r)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone(e));const s=t.attributes;for(const c in s){const u=s[c];this.setAttribute(c,u.clone(e))}const o=t.morphAttributes;for(const c in o){const u=[],d=o[c];for(let h=0,p=d.length;h<p;h++)u.push(d[h].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;const r=t.groups;for(let c=0,u=r.length;c<u;c++){const d=r[c];this.addGroup(d.start,d.count,d.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const El=new _e,fi=new qo,so=new Ws,Tl=new b,oo=new b,ro=new b,ao=new b,_r=new b,lo=new b,Al=new b,co=new b;class C extends Pe{constructor(t=new Ee,e=new Ge){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,r=s.length;o<r;o++){const a=s[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=o}}}}getVertexPosition(t,e){const i=this.geometry,s=i.attributes.position,o=i.morphAttributes.position,r=i.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(o&&a){lo.set(0,0,0);for(let l=0,c=o.length;l<c;l++){const u=a[l],d=o[l];u!==0&&(_r.fromBufferAttribute(d,t),r?lo.addScaledVector(_r,u):lo.addScaledVector(_r.sub(e),u))}e.add(lo)}return e}raycast(t,e){const i=this.geometry,s=this.material,o=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),so.copy(i.boundingSphere),so.applyMatrix4(o),fi.copy(t.ray).recast(t.near),!(so.containsPoint(fi.origin)===!1&&(fi.intersectSphere(so,Tl)===null||fi.origin.distanceToSquared(Tl)>(t.far-t.near)**2))&&(El.copy(o).invert(),fi.copy(t.ray).applyMatrix4(El),!(i.boundingBox!==null&&fi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,fi)))}_computeIntersections(t,e,i){let s;const o=this.geometry,r=this.material,a=o.index,l=o.attributes.position,c=o.attributes.uv,u=o.attributes.uv1,d=o.attributes.normal,h=o.groups,p=o.drawRange;if(a!==null)if(Array.isArray(r))for(let f=0,M=h.length;f<M;f++){const g=h[f],m=r[g.materialIndex],x=Math.max(g.start,p.start),w=Math.min(a.count,Math.min(g.start+g.count,p.start+p.count));for(let S=x,z=w;S<z;S+=3){const P=a.getX(S),I=a.getX(S+1),L=a.getX(S+2);s=uo(this,m,t,i,c,u,d,P,I,L),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const f=Math.max(0,p.start),M=Math.min(a.count,p.start+p.count);for(let g=f,m=M;g<m;g+=3){const x=a.getX(g),w=a.getX(g+1),S=a.getX(g+2);s=uo(this,r,t,i,c,u,d,x,w,S),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(r))for(let f=0,M=h.length;f<M;f++){const g=h[f],m=r[g.materialIndex],x=Math.max(g.start,p.start),w=Math.min(l.count,Math.min(g.start+g.count,p.start+p.count));for(let S=x,z=w;S<z;S+=3){const P=S,I=S+1,L=S+2;s=uo(this,m,t,i,c,u,d,P,I,L),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const f=Math.max(0,p.start),M=Math.min(l.count,p.start+p.count);for(let g=f,m=M;g<m;g+=3){const x=g,w=g+1,S=g+2;s=uo(this,r,t,i,c,u,d,x,w,S),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}}}function Vd(n,t,e,i,s,o,r,a){let l;if(t.side===$e?l=i.intersectTriangle(r,o,s,!0,a):l=i.intersectTriangle(s,o,r,t.side===ai,a),l===null)return null;co.copy(a),co.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(co);return c<e.near||c>e.far?null:{distance:c,point:co.clone(),object:n}}function uo(n,t,e,i,s,o,r,a,l,c){n.getVertexPosition(a,oo),n.getVertexPosition(l,ro),n.getVertexPosition(c,ao);const u=Vd(n,t,e,i,oo,ro,ao,Al);if(u){const d=new b;hn.getBarycoord(Al,oo,ro,ao,d),s&&(u.uv=hn.getInterpolatedAttribute(s,a,l,c,d,new Tt)),o&&(u.uv1=hn.getInterpolatedAttribute(o,a,l,c,d,new Tt)),r&&(u.normal=hn.getInterpolatedAttribute(r,a,l,c,d,new b),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const h={a,b:l,c,normal:new b,materialIndex:0};hn.getNormal(oo,ro,ao,h.normal),u.face=h,u.barycoord=d}return u}class rt extends Ee{constructor(t=1,e=1,i=1,s=1,o=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:o,depthSegments:r};const a=this;s=Math.floor(s),o=Math.floor(o),r=Math.floor(r);const l=[],c=[],u=[],d=[];let h=0,p=0;f("z","y","x",-1,-1,i,e,t,r,o,0),f("z","y","x",1,-1,i,e,-t,r,o,1),f("x","z","y",1,1,t,i,e,s,r,2),f("x","z","y",1,-1,t,i,-e,s,r,3),f("x","y","z",1,-1,t,e,i,s,o,4),f("x","y","z",-1,-1,t,e,-i,s,o,5),this.setIndex(l),this.setAttribute("position",new xe(c,3)),this.setAttribute("normal",new xe(u,3)),this.setAttribute("uv",new xe(d,2));function f(M,g,m,x,w,S,z,P,I,L,y){const _=S/I,A=z/L,U=S/2,O=z/2,K=P/2,tt=I+1,J=L+1;let st=0,$=0;const ct=new b;for(let dt=0;dt<J;dt++){const It=dt*A-O;for(let Wt=0;Wt<tt;Wt++){const oe=Wt*_-U;ct[M]=oe*x,ct[g]=It*w,ct[m]=K,c.push(ct.x,ct.y,ct.z),ct[M]=0,ct[g]=0,ct[m]=P>0?1:-1,u.push(ct.x,ct.y,ct.z),d.push(Wt/I),d.push(1-dt/L),st+=1}}for(let dt=0;dt<L;dt++)for(let It=0;It<I;It++){const Wt=h+It+tt*dt,oe=h+It+tt*(dt+1),j=h+(It+1)+tt*(dt+1),at=h+(It+1)+tt*dt;l.push(Wt,oe,at),l.push(oe,j,at),$+=6}a.addGroup(p,$,y),p+=$,h+=st}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new rt(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function us(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const s=n[e][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone():Array.isArray(s)?t[e][i]=s.slice():t[e][i]=s}}return t}function Ke(n){const t={};for(let e=0;e<n.length;e++){const i=us(n[e]);for(const s in i)t[s]=i[s]}return t}function Wd(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function Wc(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:re.workingColorSpace}const Xd={clone:us,merge:Ke};var qd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Yd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Wn extends Xn{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=qd,this.fragmentShader=Yd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=us(t.uniforms),this.uniformsGroups=Wd(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const r=this.uniforms[s].value;r&&r.isTexture?e.uniforms[s]={type:"t",value:r.toJSON(t).uuid}:r&&r.isColor?e.uniforms[s]={type:"c",value:r.getHex()}:r&&r.isVector2?e.uniforms[s]={type:"v2",value:r.toArray()}:r&&r.isVector3?e.uniforms[s]={type:"v3",value:r.toArray()}:r&&r.isVector4?e.uniforms[s]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?e.uniforms[s]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?e.uniforms[s]={type:"m4",value:r.toArray()}:e.uniforms[s]={value:r}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class Xc extends Pe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new _e,this.projectionMatrix=new _e,this.projectionMatrixInverse=new _e,this.coordinateSystem=On}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ei=new b,Cl=new Tt,Rl=new Tt;class Se extends Xc{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=ks*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Ds*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ks*2*Math.atan(Math.tan(Ds*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){ei.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(ei.x,ei.y).multiplyScalar(-t/ei.z),ei.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ei.x,ei.y).multiplyScalar(-t/ei.z)}getViewSize(t,e){return this.getViewBounds(t,Cl,Rl),e.subVectors(Rl,Cl)}setViewOffset(t,e,i,s,o,r){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=o,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Ds*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,o=-.5*s;const r=this.view;if(this.view!==null&&this.view.enabled){const l=r.fullWidth,c=r.fullHeight;o+=r.offsetX*s/l,e-=r.offsetY*i/c,s*=r.width/l,i*=r.height/c}const a=this.filmOffset;a!==0&&(o+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(o,o+s,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const qi=-90,Yi=1;class $d extends Pe{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Se(qi,Yi,t,e);s.layers=this.layers,this.add(s);const o=new Se(qi,Yi,t,e);o.layers=this.layers,this.add(o);const r=new Se(qi,Yi,t,e);r.layers=this.layers,this.add(r);const a=new Se(qi,Yi,t,e);a.layers=this.layers,this.add(a);const l=new Se(qi,Yi,t,e);l.layers=this.layers,this.add(l);const c=new Se(qi,Yi,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,s,o,r,a,l]=e;for(const c of e)this.remove(c);if(t===On)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),o.up.set(0,0,-1),o.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Do)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),o.up.set(0,0,1),o.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[o,r,a,l,c,u]=this.children,d=t.getRenderTarget(),h=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),f=t.xr.enabled;t.xr.enabled=!1;const M=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,s),t.render(e,o),t.setRenderTarget(i,1,s),t.render(e,r),t.setRenderTarget(i,2,s),t.render(e,a),t.setRenderTarget(i,3,s),t.render(e,l),t.setRenderTarget(i,4,s),t.render(e,c),i.texture.generateMipmaps=M,t.setRenderTarget(i,5,s),t.render(e,u),t.setRenderTarget(d,h,p),t.xr.enabled=f,i.texture.needsPMREMUpdate=!0}}class qc extends je{constructor(t,e,i,s,o,r,a,l,c,u){t=t!==void 0?t:[],e=e!==void 0?e:rs,super(t,e,i,s,o,r,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Zd extends Ri{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new qc(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:En}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new rt(5,5,5),o=new Wn({name:"CubemapFromEquirect",uniforms:us(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:$e,blending:oi});o.uniforms.tEquirect.value=e;const r=new C(s,o),a=e.minFilter;return e.minFilter===Ti&&(e.minFilter=En),new $d(1,10,this).update(t,r),e.minFilter=a,r.geometry.dispose(),r.material.dispose(),this}clear(t,e,i,s){const o=t.getRenderTarget();for(let r=0;r<6;r++)t.setRenderTarget(this,r),t.clear(e,i,s);t.setRenderTarget(o)}}const vr=new b,Kd=new b,Jd=new $t;class Si{constructor(t=new b(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const s=vr.subVectors(i,e).cross(Kd.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(vr),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const o=-(t.start.dot(this.normal)+this.constant)/s;return o<0||o>1?null:e.copy(t.start).addScaledVector(i,o)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||Jd.getNormalMatrix(t),s=this.coplanarPoint(vr).applyMatrix4(t),o=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(o),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const pi=new Ws,ho=new b;class Ha{constructor(t=new Si,e=new Si,i=new Si,s=new Si,o=new Si,r=new Si){this.planes=[t,e,i,s,o,r]}set(t,e,i,s,o,r){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(s),a[4].copy(o),a[5].copy(r),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=On){const i=this.planes,s=t.elements,o=s[0],r=s[1],a=s[2],l=s[3],c=s[4],u=s[5],d=s[6],h=s[7],p=s[8],f=s[9],M=s[10],g=s[11],m=s[12],x=s[13],w=s[14],S=s[15];if(i[0].setComponents(l-o,h-c,g-p,S-m).normalize(),i[1].setComponents(l+o,h+c,g+p,S+m).normalize(),i[2].setComponents(l+r,h+u,g+f,S+x).normalize(),i[3].setComponents(l-r,h-u,g-f,S-x).normalize(),i[4].setComponents(l-a,h-d,g-M,S-w).normalize(),e===On)i[5].setComponents(l+a,h+d,g+M,S+w).normalize();else if(e===Do)i[5].setComponents(a,d,M,w).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),pi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),pi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(pi)}intersectsSprite(t){return pi.center.set(0,0,0),pi.radius=.7071067811865476,pi.applyMatrix4(t.matrixWorld),this.intersectsSphere(pi)}intersectsSphere(t){const e=this.planes,i=t.center,s=-t.radius;for(let o=0;o<6;o++)if(e[o].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const s=e[i];if(ho.x=s.normal.x>0?t.max.x:t.min.x,ho.y=s.normal.y>0?t.max.y:t.min.y,ho.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(ho)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Yc(){let n=null,t=!1,e=null,i=null;function s(o,r){e(o,r),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(o){e=o},setContext:function(o){n=o}}}function jd(n){const t=new WeakMap;function e(a,l){const c=a.array,u=a.usage,d=c.byteLength,h=n.createBuffer();n.bindBuffer(l,h),n.bufferData(l,c,u),a.onUploadCallback();let p;if(c instanceof Float32Array)p=n.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=n.SHORT;else if(c instanceof Uint32Array)p=n.UNSIGNED_INT;else if(c instanceof Int32Array)p=n.INT;else if(c instanceof Int8Array)p=n.BYTE;else if(c instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function i(a,l,c){const u=l.array,d=l.updateRanges;if(n.bindBuffer(c,a),d.length===0)n.bufferSubData(c,0,u);else{d.sort((p,f)=>p.start-f.start);let h=0;for(let p=1;p<d.length;p++){const f=d[h],M=d[p];M.start<=f.start+f.count+1?f.count=Math.max(f.count,M.start+M.count-f.start):(++h,d[h]=M)}d.length=h+1;for(let p=0,f=d.length;p<f;p++){const M=d[p];n.bufferSubData(c,M.start*u.BYTES_PER_ELEMENT,u,M.start,M.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function o(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(n.deleteBuffer(l.buffer),t.delete(a))}function r(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:s,remove:o,update:r}}class qt extends Ee{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};const o=t/2,r=e/2,a=Math.floor(i),l=Math.floor(s),c=a+1,u=l+1,d=t/a,h=e/l,p=[],f=[],M=[],g=[];for(let m=0;m<u;m++){const x=m*h-r;for(let w=0;w<c;w++){const S=w*d-o;f.push(S,-x,0),M.push(0,0,1),g.push(w/a),g.push(1-m/l)}}for(let m=0;m<l;m++)for(let x=0;x<a;x++){const w=x+c*m,S=x+c*(m+1),z=x+1+c*(m+1),P=x+1+c*m;p.push(w,S,P),p.push(S,z,P)}this.setIndex(p),this.setAttribute("position",new xe(f,3)),this.setAttribute("normal",new xe(M,3)),this.setAttribute("uv",new xe(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new qt(t.width,t.height,t.widthSegments,t.heightSegments)}}var Qd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,th=`#ifdef USE_ALPHAHASH
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
#endif`,eh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,nh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ih=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,sh=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,oh=`#ifdef USE_AOMAP
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
#endif`,rh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ah=`#ifdef USE_BATCHING
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
#endif`,lh=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,ch=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,uh=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,dh=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,hh=`#ifdef USE_IRIDESCENCE
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
#endif`,fh=`#ifdef USE_BUMPMAP
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
#endif`,ph=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,mh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,gh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,_h=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,vh=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Mh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,yh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Sh=`#if defined( USE_COLOR_ALPHA )
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
#endif`,xh=`#define PI 3.141592653589793
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
} // validated`,wh=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,bh=`vec3 transformedNormal = objectNormal;
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
#endif`,Eh=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Th=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Ah=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ch=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Rh="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ph=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Lh=`#ifdef USE_ENVMAP
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
#endif`,Ih=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Dh=`#ifdef USE_ENVMAP
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
#endif`,Uh=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Nh=`#ifdef USE_ENVMAP
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
#endif`,zh=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Fh=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Oh=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Bh=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,kh=`#ifdef USE_GRADIENTMAP
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
}`,Gh=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Hh=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Vh=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Wh=`uniform bool receiveShadow;
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
#endif`,Xh=`#ifdef USE_ENVMAP
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
#endif`,qh=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Yh=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,$h=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Zh=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Kh=`PhysicalMaterial material;
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
#endif`,Jh=`struct PhysicalMaterial {
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
}`,jh=`
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
#endif`,Qh=`#if defined( RE_IndirectDiffuse )
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
#endif`,tf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,ef=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,nf=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,sf=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,of=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,rf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,af=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,lf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,cf=`#if defined( USE_POINTS_UV )
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
#endif`,uf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,df=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,hf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,ff=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,pf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,mf=`#ifdef USE_MORPHTARGETS
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
#endif`,gf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,_f=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,vf=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Mf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,yf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Sf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,xf=`#ifdef USE_NORMALMAP
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
#endif`,wf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,bf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Ef=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Tf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Af=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Cf=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Rf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Pf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Lf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,If=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Df=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Uf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Nf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,zf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Ff=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Of=`float getShadowMask() {
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
}`,Bf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,kf=`#ifdef USE_SKINNING
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
#endif`,Gf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Hf=`#ifdef USE_SKINNING
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
#endif`,Vf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Wf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Xf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,qf=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Yf=`#ifdef USE_TRANSMISSION
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
#endif`,$f=`#ifdef USE_TRANSMISSION
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
#endif`,Zf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Kf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Jf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,jf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Qf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,tp=`uniform sampler2D t2D;
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
}`,ep=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,np=`#ifdef ENVMAP_TYPE_CUBE
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
}`,ip=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,sp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,op=`#include <common>
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
}`,rp=`#if DEPTH_PACKING == 3200
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
}`,ap=`#define DISTANCE
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
}`,lp=`#define DISTANCE
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
}`,cp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,up=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,dp=`uniform float scale;
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
}`,hp=`uniform vec3 diffuse;
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
}`,fp=`#include <common>
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
}`,pp=`uniform vec3 diffuse;
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
}`,mp=`#define LAMBERT
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
}`,gp=`#define LAMBERT
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
}`,_p=`#define MATCAP
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
}`,vp=`#define MATCAP
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
}`,Mp=`#define NORMAL
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
}`,yp=`#define NORMAL
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
}`,Sp=`#define PHONG
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
}`,xp=`#define PHONG
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
}`,wp=`#define STANDARD
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
}`,bp=`#define STANDARD
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
}`,Ep=`#define TOON
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
}`,Tp=`#define TOON
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
}`,Ap=`uniform float size;
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
}`,Cp=`uniform vec3 diffuse;
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
}`,Rp=`#include <common>
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
}`,Pp=`uniform vec3 color;
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
}`,Lp=`uniform float rotation;
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
}`,Ip=`uniform vec3 diffuse;
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
}`,Kt={alphahash_fragment:Qd,alphahash_pars_fragment:th,alphamap_fragment:eh,alphamap_pars_fragment:nh,alphatest_fragment:ih,alphatest_pars_fragment:sh,aomap_fragment:oh,aomap_pars_fragment:rh,batching_pars_vertex:ah,batching_vertex:lh,begin_vertex:ch,beginnormal_vertex:uh,bsdfs:dh,iridescence_fragment:hh,bumpmap_pars_fragment:fh,clipping_planes_fragment:ph,clipping_planes_pars_fragment:mh,clipping_planes_pars_vertex:gh,clipping_planes_vertex:_h,color_fragment:vh,color_pars_fragment:Mh,color_pars_vertex:yh,color_vertex:Sh,common:xh,cube_uv_reflection_fragment:wh,defaultnormal_vertex:bh,displacementmap_pars_vertex:Eh,displacementmap_vertex:Th,emissivemap_fragment:Ah,emissivemap_pars_fragment:Ch,colorspace_fragment:Rh,colorspace_pars_fragment:Ph,envmap_fragment:Lh,envmap_common_pars_fragment:Ih,envmap_pars_fragment:Dh,envmap_pars_vertex:Uh,envmap_physical_pars_fragment:Xh,envmap_vertex:Nh,fog_vertex:zh,fog_pars_vertex:Fh,fog_fragment:Oh,fog_pars_fragment:Bh,gradientmap_pars_fragment:kh,lightmap_pars_fragment:Gh,lights_lambert_fragment:Hh,lights_lambert_pars_fragment:Vh,lights_pars_begin:Wh,lights_toon_fragment:qh,lights_toon_pars_fragment:Yh,lights_phong_fragment:$h,lights_phong_pars_fragment:Zh,lights_physical_fragment:Kh,lights_physical_pars_fragment:Jh,lights_fragment_begin:jh,lights_fragment_maps:Qh,lights_fragment_end:tf,logdepthbuf_fragment:ef,logdepthbuf_pars_fragment:nf,logdepthbuf_pars_vertex:sf,logdepthbuf_vertex:of,map_fragment:rf,map_pars_fragment:af,map_particle_fragment:lf,map_particle_pars_fragment:cf,metalnessmap_fragment:uf,metalnessmap_pars_fragment:df,morphinstance_vertex:hf,morphcolor_vertex:ff,morphnormal_vertex:pf,morphtarget_pars_vertex:mf,morphtarget_vertex:gf,normal_fragment_begin:_f,normal_fragment_maps:vf,normal_pars_fragment:Mf,normal_pars_vertex:yf,normal_vertex:Sf,normalmap_pars_fragment:xf,clearcoat_normal_fragment_begin:wf,clearcoat_normal_fragment_maps:bf,clearcoat_pars_fragment:Ef,iridescence_pars_fragment:Tf,opaque_fragment:Af,packing:Cf,premultiplied_alpha_fragment:Rf,project_vertex:Pf,dithering_fragment:Lf,dithering_pars_fragment:If,roughnessmap_fragment:Df,roughnessmap_pars_fragment:Uf,shadowmap_pars_fragment:Nf,shadowmap_pars_vertex:zf,shadowmap_vertex:Ff,shadowmask_pars_fragment:Of,skinbase_vertex:Bf,skinning_pars_vertex:kf,skinning_vertex:Gf,skinnormal_vertex:Hf,specularmap_fragment:Vf,specularmap_pars_fragment:Wf,tonemapping_fragment:Xf,tonemapping_pars_fragment:qf,transmission_fragment:Yf,transmission_pars_fragment:$f,uv_pars_fragment:Zf,uv_pars_vertex:Kf,uv_vertex:Jf,worldpos_vertex:jf,background_vert:Qf,background_frag:tp,backgroundCube_vert:ep,backgroundCube_frag:np,cube_vert:ip,cube_frag:sp,depth_vert:op,depth_frag:rp,distanceRGBA_vert:ap,distanceRGBA_frag:lp,equirect_vert:cp,equirect_frag:up,linedashed_vert:dp,linedashed_frag:hp,meshbasic_vert:fp,meshbasic_frag:pp,meshlambert_vert:mp,meshlambert_frag:gp,meshmatcap_vert:_p,meshmatcap_frag:vp,meshnormal_vert:Mp,meshnormal_frag:yp,meshphong_vert:Sp,meshphong_frag:xp,meshphysical_vert:wp,meshphysical_frag:bp,meshtoon_vert:Ep,meshtoon_frag:Tp,points_vert:Ap,points_frag:Cp,shadow_vert:Rp,shadow_frag:Pp,sprite_vert:Lp,sprite_frag:Ip},pt={common:{diffuse:{value:new Et(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new $t},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new $t}},envmap:{envMap:{value:null},envMapRotation:{value:new $t},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new $t}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new $t}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new $t},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new $t},normalScale:{value:new Tt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new $t},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new $t}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new $t}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new $t}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Et(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Et(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0},uvTransform:{value:new $t}},sprite:{diffuse:{value:new Et(16777215)},opacity:{value:1},center:{value:new Tt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new $t},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0}}},bn={basic:{uniforms:Ke([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.fog]),vertexShader:Kt.meshbasic_vert,fragmentShader:Kt.meshbasic_frag},lambert:{uniforms:Ke([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,pt.lights,{emissive:{value:new Et(0)}}]),vertexShader:Kt.meshlambert_vert,fragmentShader:Kt.meshlambert_frag},phong:{uniforms:Ke([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,pt.lights,{emissive:{value:new Et(0)},specular:{value:new Et(1118481)},shininess:{value:30}}]),vertexShader:Kt.meshphong_vert,fragmentShader:Kt.meshphong_frag},standard:{uniforms:Ke([pt.common,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.roughnessmap,pt.metalnessmap,pt.fog,pt.lights,{emissive:{value:new Et(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Kt.meshphysical_vert,fragmentShader:Kt.meshphysical_frag},toon:{uniforms:Ke([pt.common,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.gradientmap,pt.fog,pt.lights,{emissive:{value:new Et(0)}}]),vertexShader:Kt.meshtoon_vert,fragmentShader:Kt.meshtoon_frag},matcap:{uniforms:Ke([pt.common,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,{matcap:{value:null}}]),vertexShader:Kt.meshmatcap_vert,fragmentShader:Kt.meshmatcap_frag},points:{uniforms:Ke([pt.points,pt.fog]),vertexShader:Kt.points_vert,fragmentShader:Kt.points_frag},dashed:{uniforms:Ke([pt.common,pt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Kt.linedashed_vert,fragmentShader:Kt.linedashed_frag},depth:{uniforms:Ke([pt.common,pt.displacementmap]),vertexShader:Kt.depth_vert,fragmentShader:Kt.depth_frag},normal:{uniforms:Ke([pt.common,pt.bumpmap,pt.normalmap,pt.displacementmap,{opacity:{value:1}}]),vertexShader:Kt.meshnormal_vert,fragmentShader:Kt.meshnormal_frag},sprite:{uniforms:Ke([pt.sprite,pt.fog]),vertexShader:Kt.sprite_vert,fragmentShader:Kt.sprite_frag},background:{uniforms:{uvTransform:{value:new $t},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Kt.background_vert,fragmentShader:Kt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new $t}},vertexShader:Kt.backgroundCube_vert,fragmentShader:Kt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Kt.cube_vert,fragmentShader:Kt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Kt.equirect_vert,fragmentShader:Kt.equirect_frag},distanceRGBA:{uniforms:Ke([pt.common,pt.displacementmap,{referencePosition:{value:new b},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Kt.distanceRGBA_vert,fragmentShader:Kt.distanceRGBA_frag},shadow:{uniforms:Ke([pt.lights,pt.fog,{color:{value:new Et(0)},opacity:{value:1}}]),vertexShader:Kt.shadow_vert,fragmentShader:Kt.shadow_frag}};bn.physical={uniforms:Ke([bn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new $t},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new $t},clearcoatNormalScale:{value:new Tt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new $t},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new $t},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new $t},sheen:{value:0},sheenColor:{value:new Et(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new $t},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new $t},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new $t},transmissionSamplerSize:{value:new Tt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new $t},attenuationDistance:{value:0},attenuationColor:{value:new Et(0)},specularColor:{value:new Et(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new $t},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new $t},anisotropyVector:{value:new Tt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new $t}}]),vertexShader:Kt.meshphysical_vert,fragmentShader:Kt.meshphysical_frag};const fo={r:0,b:0,g:0},mi=new yn,Dp=new _e;function Up(n,t,e,i,s,o,r){const a=new Et(0);let l=o===!0?0:1,c,u,d=null,h=0,p=null;function f(x){let w=x.isScene===!0?x.background:null;return w&&w.isTexture&&(w=(x.backgroundBlurriness>0?e:t).get(w)),w}function M(x){let w=!1;const S=f(x);S===null?m(a,l):S&&S.isColor&&(m(S,1),w=!0);const z=n.xr.getEnvironmentBlendMode();z==="additive"?i.buffers.color.setClear(0,0,0,1,r):z==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,r),(n.autoClear||w)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function g(x,w){const S=f(w);S&&(S.isCubeTexture||S.mapping===Wo)?(u===void 0&&(u=new C(new rt(1,1,1),new Wn({name:"BackgroundCubeMaterial",uniforms:us(bn.backgroundCube.uniforms),vertexShader:bn.backgroundCube.vertexShader,fragmentShader:bn.backgroundCube.fragmentShader,side:$e,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(z,P,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),mi.copy(w.backgroundRotation),mi.x*=-1,mi.y*=-1,mi.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(mi.y*=-1,mi.z*=-1),u.material.uniforms.envMap.value=S,u.material.uniforms.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Dp.makeRotationFromEuler(mi)),u.material.toneMapped=re.getTransfer(S.colorSpace)!==pe,(d!==S||h!==S.version||p!==n.toneMapping)&&(u.material.needsUpdate=!0,d=S,h=S.version,p=n.toneMapping),u.layers.enableAll(),x.unshift(u,u.geometry,u.material,0,0,null)):S&&S.isTexture&&(c===void 0&&(c=new C(new qt(2,2),new Wn({name:"BackgroundMaterial",uniforms:us(bn.background.uniforms),vertexShader:bn.background.vertexShader,fragmentShader:bn.background.fragmentShader,side:ai,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=S,c.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,c.material.toneMapped=re.getTransfer(S.colorSpace)!==pe,S.matrixAutoUpdate===!0&&S.updateMatrix(),c.material.uniforms.uvTransform.value.copy(S.matrix),(d!==S||h!==S.version||p!==n.toneMapping)&&(c.material.needsUpdate=!0,d=S,h=S.version,p=n.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null))}function m(x,w){x.getRGB(fo,Wc(n)),i.buffers.color.setClear(fo.r,fo.g,fo.b,w,r)}return{getClearColor:function(){return a},setClearColor:function(x,w=1){a.set(x),l=w,m(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(x){l=x,m(a,l)},render:M,addToRenderList:g}}function Np(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=h(null);let o=s,r=!1;function a(_,A,U,O,K){let tt=!1;const J=d(O,U,A);o!==J&&(o=J,c(o.object)),tt=p(_,O,U,K),tt&&f(_,O,U,K),K!==null&&t.update(K,n.ELEMENT_ARRAY_BUFFER),(tt||r)&&(r=!1,S(_,A,U,O),K!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(K).buffer))}function l(){return n.createVertexArray()}function c(_){return n.bindVertexArray(_)}function u(_){return n.deleteVertexArray(_)}function d(_,A,U){const O=U.wireframe===!0;let K=i[_.id];K===void 0&&(K={},i[_.id]=K);let tt=K[A.id];tt===void 0&&(tt={},K[A.id]=tt);let J=tt[O];return J===void 0&&(J=h(l()),tt[O]=J),J}function h(_){const A=[],U=[],O=[];for(let K=0;K<e;K++)A[K]=0,U[K]=0,O[K]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:A,enabledAttributes:U,attributeDivisors:O,object:_,attributes:{},index:null}}function p(_,A,U,O){const K=o.attributes,tt=A.attributes;let J=0;const st=U.getAttributes();for(const $ in st)if(st[$].location>=0){const dt=K[$];let It=tt[$];if(It===void 0&&($==="instanceMatrix"&&_.instanceMatrix&&(It=_.instanceMatrix),$==="instanceColor"&&_.instanceColor&&(It=_.instanceColor)),dt===void 0||dt.attribute!==It||It&&dt.data!==It.data)return!0;J++}return o.attributesNum!==J||o.index!==O}function f(_,A,U,O){const K={},tt=A.attributes;let J=0;const st=U.getAttributes();for(const $ in st)if(st[$].location>=0){let dt=tt[$];dt===void 0&&($==="instanceMatrix"&&_.instanceMatrix&&(dt=_.instanceMatrix),$==="instanceColor"&&_.instanceColor&&(dt=_.instanceColor));const It={};It.attribute=dt,dt&&dt.data&&(It.data=dt.data),K[$]=It,J++}o.attributes=K,o.attributesNum=J,o.index=O}function M(){const _=o.newAttributes;for(let A=0,U=_.length;A<U;A++)_[A]=0}function g(_){m(_,0)}function m(_,A){const U=o.newAttributes,O=o.enabledAttributes,K=o.attributeDivisors;U[_]=1,O[_]===0&&(n.enableVertexAttribArray(_),O[_]=1),K[_]!==A&&(n.vertexAttribDivisor(_,A),K[_]=A)}function x(){const _=o.newAttributes,A=o.enabledAttributes;for(let U=0,O=A.length;U<O;U++)A[U]!==_[U]&&(n.disableVertexAttribArray(U),A[U]=0)}function w(_,A,U,O,K,tt,J){J===!0?n.vertexAttribIPointer(_,A,U,K,tt):n.vertexAttribPointer(_,A,U,O,K,tt)}function S(_,A,U,O){M();const K=O.attributes,tt=U.getAttributes(),J=A.defaultAttributeValues;for(const st in tt){const $=tt[st];if($.location>=0){let ct=K[st];if(ct===void 0&&(st==="instanceMatrix"&&_.instanceMatrix&&(ct=_.instanceMatrix),st==="instanceColor"&&_.instanceColor&&(ct=_.instanceColor)),ct!==void 0){const dt=ct.normalized,It=ct.itemSize,Wt=t.get(ct);if(Wt===void 0)continue;const oe=Wt.buffer,j=Wt.type,at=Wt.bytesPerElement,At=j===n.INT||j===n.UNSIGNED_INT||ct.gpuType===Da;if(ct.isInterleavedBufferAttribute){const mt=ct.data,Ut=mt.stride,kt=ct.offset;if(mt.isInstancedInterleavedBuffer){for(let Zt=0;Zt<$.locationSize;Zt++)m($.location+Zt,mt.meshPerAttribute);_.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=mt.meshPerAttribute*mt.count)}else for(let Zt=0;Zt<$.locationSize;Zt++)g($.location+Zt);n.bindBuffer(n.ARRAY_BUFFER,oe);for(let Zt=0;Zt<$.locationSize;Zt++)w($.location+Zt,It/$.locationSize,j,dt,Ut*at,(kt+It/$.locationSize*Zt)*at,At)}else{if(ct.isInstancedBufferAttribute){for(let mt=0;mt<$.locationSize;mt++)m($.location+mt,ct.meshPerAttribute);_.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=ct.meshPerAttribute*ct.count)}else for(let mt=0;mt<$.locationSize;mt++)g($.location+mt);n.bindBuffer(n.ARRAY_BUFFER,oe);for(let mt=0;mt<$.locationSize;mt++)w($.location+mt,It/$.locationSize,j,dt,It*at,It/$.locationSize*mt*at,At)}}else if(J!==void 0){const dt=J[st];if(dt!==void 0)switch(dt.length){case 2:n.vertexAttrib2fv($.location,dt);break;case 3:n.vertexAttrib3fv($.location,dt);break;case 4:n.vertexAttrib4fv($.location,dt);break;default:n.vertexAttrib1fv($.location,dt)}}}}x()}function z(){L();for(const _ in i){const A=i[_];for(const U in A){const O=A[U];for(const K in O)u(O[K].object),delete O[K];delete A[U]}delete i[_]}}function P(_){if(i[_.id]===void 0)return;const A=i[_.id];for(const U in A){const O=A[U];for(const K in O)u(O[K].object),delete O[K];delete A[U]}delete i[_.id]}function I(_){for(const A in i){const U=i[A];if(U[_.id]===void 0)continue;const O=U[_.id];for(const K in O)u(O[K].object),delete O[K];delete U[_.id]}}function L(){y(),r=!0,o!==s&&(o=s,c(o.object))}function y(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:L,resetDefaultState:y,dispose:z,releaseStatesOfGeometry:P,releaseStatesOfProgram:I,initAttributes:M,enableAttribute:g,disableUnusedAttributes:x}}function zp(n,t,e){let i;function s(c){i=c}function o(c,u){n.drawArrays(i,c,u),e.update(u,i,1)}function r(c,u,d){d!==0&&(n.drawArraysInstanced(i,c,u,d),e.update(u,i,d))}function a(c,u,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,d);let p=0;for(let f=0;f<d;f++)p+=u[f];e.update(p,i,1)}function l(c,u,d,h){if(d===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let f=0;f<c.length;f++)r(c[f],u[f],h[f]);else{p.multiDrawArraysInstancedWEBGL(i,c,0,u,0,h,0,d);let f=0;for(let M=0;M<d;M++)f+=u[M]*h[M];e.update(f,i,1)}}this.setMode=s,this.render=o,this.renderInstances=r,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Fp(n,t,e,i){let s;function o(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const I=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(I.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function r(I){return!(I!==_n&&i.convert(I)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(I){const L=I===Gs&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(I!==Vn&&i.convert(I)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&I!==Fn&&!L)}function l(I){if(I==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";I="mediump"}return I==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const d=e.logarithmicDepthBuffer===!0,h=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),f=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),M=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),m=n.getParameter(n.MAX_VERTEX_ATTRIBS),x=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),w=n.getParameter(n.MAX_VARYING_VECTORS),S=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),z=f>0,P=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:o,getMaxPrecision:l,textureFormatReadable:r,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reverseDepthBuffer:h,maxTextures:p,maxVertexTextures:f,maxTextureSize:M,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:x,maxVaryings:w,maxFragmentUniforms:S,vertexTextures:z,maxSamples:P}}function Op(n){const t=this;let e=null,i=0,s=!1,o=!1;const r=new Si,a=new $t,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){const p=d.length!==0||h||i!==0||s;return s=h,i=d.length,p},this.beginShadows=function(){o=!0,u(null)},this.endShadows=function(){o=!1},this.setGlobalState=function(d,h){e=u(d,h,0)},this.setState=function(d,h,p){const f=d.clippingPlanes,M=d.clipIntersection,g=d.clipShadows,m=n.get(d);if(!s||f===null||f.length===0||o&&!g)o?u(null):c();else{const x=o?0:i,w=x*4;let S=m.clippingState||null;l.value=S,S=u(f,h,w,p);for(let z=0;z!==w;++z)S[z]=e[z];m.clippingState=S,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=x}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function u(d,h,p,f){const M=d!==null?d.length:0;let g=null;if(M!==0){if(g=l.value,f!==!0||g===null){const m=p+M*4,x=h.matrixWorldInverse;a.getNormalMatrix(x),(g===null||g.length<m)&&(g=new Float32Array(m));for(let w=0,S=p;w!==M;++w,S+=4)r.copy(d[w]).applyMatrix4(x,a),r.normal.toArray(g,S),g[S+3]=r.constant}l.value=g,l.needsUpdate=!0}return t.numPlanes=M,t.numIntersection=0,g}}function Bp(n){let t=new WeakMap;function e(r,a){return a===Jr?r.mapping=rs:a===jr&&(r.mapping=as),r}function i(r){if(r&&r.isTexture){const a=r.mapping;if(a===Jr||a===jr)if(t.has(r)){const l=t.get(r).texture;return e(l,r.mapping)}else{const l=r.image;if(l&&l.height>0){const c=new Zd(l.height);return c.fromEquirectangularTexture(n,r),t.set(r,c),r.addEventListener("dispose",s),e(c.texture,r.mapping)}else return null}}return r}function s(r){const a=r.target;a.removeEventListener("dispose",s);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function o(){t=new WeakMap}return{get:i,dispose:o}}class $c extends Xc{constructor(t=-1,e=1,i=1,s=-1,o=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=o,this.far=r,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,o,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=o,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let o=i-t,r=i+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;o+=c*this.view.offsetX,r=o+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(o,r,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const ts=4,Pl=[.125,.215,.35,.446,.526,.582],bi=20,Mr=new $c,Ll=new Et;let yr=null,Sr=0,xr=0,wr=!1;const xi=(1+Math.sqrt(5))/2,$i=1/xi,Il=[new b(-xi,$i,0),new b(xi,$i,0),new b(-$i,0,xi),new b($i,0,xi),new b(0,xi,-$i),new b(0,xi,$i),new b(-1,1,-1),new b(1,1,-1),new b(-1,1,1),new b(1,1,1)];class Dl{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,s=100){yr=this._renderer.getRenderTarget(),Sr=this._renderer.getActiveCubeFace(),xr=this._renderer.getActiveMipmapLevel(),wr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const o=this._allocateTargets();return o.depthBuffer=!0,this._sceneToCubeUV(t,i,s,o),e>0&&this._blur(o,0,0,e),this._applyPMREM(o),this._cleanup(o),o}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=zl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Nl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(yr,Sr,xr),this._renderer.xr.enabled=wr,t.scissorTest=!1,po(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===rs||t.mapping===as?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),yr=this._renderer.getRenderTarget(),Sr=this._renderer.getActiveCubeFace(),xr=this._renderer.getActiveMipmapLevel(),wr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:En,minFilter:En,generateMipmaps:!1,type:Gs,format:_n,colorSpace:hs,depthBuffer:!1},s=Ul(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ul(t,e,i);const{_lodMax:o}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=kp(o)),this._blurMaterial=Gp(o,t,e)}return s}_compileMaterial(t){const e=new C(this._lodPlanes[0],t);this._renderer.compile(e,Mr)}_sceneToCubeUV(t,e,i,s){const a=new Se(90,1,e,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,h=u.toneMapping;u.getClearColor(Ll),u.toneMapping=ri,u.autoClear=!1;const p=new Ge({name:"PMREM.Background",side:$e,depthWrite:!1,depthTest:!1}),f=new C(new rt,p);let M=!1;const g=t.background;g?g.isColor&&(p.color.copy(g),t.background=null,M=!0):(p.color.copy(Ll),M=!0);for(let m=0;m<6;m++){const x=m%3;x===0?(a.up.set(0,l[m],0),a.lookAt(c[m],0,0)):x===1?(a.up.set(0,0,l[m]),a.lookAt(0,c[m],0)):(a.up.set(0,l[m],0),a.lookAt(0,0,c[m]));const w=this._cubeSize;po(s,x*w,m>2?w:0,w,w),u.setRenderTarget(s),M&&u.render(f,a),u.render(t,a)}f.geometry.dispose(),f.material.dispose(),u.toneMapping=h,u.autoClear=d,t.background=g}_textureToCubeUV(t,e){const i=this._renderer,s=t.mapping===rs||t.mapping===as;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=zl()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Nl());const o=s?this._cubemapMaterial:this._equirectMaterial,r=new C(this._lodPlanes[0],o),a=o.uniforms;a.envMap.value=t;const l=this._cubeSize;po(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(r,Mr)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let o=1;o<s;o++){const r=Math.sqrt(this._sigmas[o]*this._sigmas[o]-this._sigmas[o-1]*this._sigmas[o-1]),a=Il[(s-o-1)%Il.length];this._blur(t,o-1,o,r,a)}e.autoClear=i}_blur(t,e,i,s,o){const r=this._pingPongRenderTarget;this._halfBlur(t,r,e,i,s,"latitudinal",o),this._halfBlur(r,t,i,i,s,"longitudinal",o)}_halfBlur(t,e,i,s,o,r,a){const l=this._renderer,c=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,d=new C(this._lodPlanes[s],c),h=c.uniforms,p=this._sizeLods[i]-1,f=isFinite(o)?Math.PI/(2*p):2*Math.PI/(2*bi-1),M=o/f,g=isFinite(o)?1+Math.floor(u*M):bi;g>bi&&console.warn(`sigmaRadians, ${o}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${bi}`);const m=[];let x=0;for(let I=0;I<bi;++I){const L=I/M,y=Math.exp(-L*L/2);m.push(y),I===0?x+=y:I<g&&(x+=2*y)}for(let I=0;I<m.length;I++)m[I]=m[I]/x;h.envMap.value=t.texture,h.samples.value=g,h.weights.value=m,h.latitudinal.value=r==="latitudinal",a&&(h.poleAxis.value=a);const{_lodMax:w}=this;h.dTheta.value=f,h.mipInt.value=w-i;const S=this._sizeLods[s],z=3*S*(s>w-ts?s-w+ts:0),P=4*(this._cubeSize-S);po(e,z,P,3*S,2*S),l.setRenderTarget(e),l.render(d,Mr)}}function kp(n){const t=[],e=[],i=[];let s=n;const o=n-ts+1+Pl.length;for(let r=0;r<o;r++){const a=Math.pow(2,s);e.push(a);let l=1/a;r>n-ts?l=Pl[r-n+ts-1]:r===0&&(l=0),i.push(l);const c=1/(a-2),u=-c,d=1+c,h=[u,u,d,u,d,d,u,u,d,d,u,d],p=6,f=6,M=3,g=2,m=1,x=new Float32Array(M*f*p),w=new Float32Array(g*f*p),S=new Float32Array(m*f*p);for(let P=0;P<p;P++){const I=P%3*2/3-1,L=P>2?0:-1,y=[I,L,0,I+2/3,L,0,I+2/3,L+1,0,I,L,0,I+2/3,L+1,0,I,L+1,0];x.set(y,M*f*P),w.set(h,g*f*P);const _=[P,P,P,P,P,P];S.set(_,m*f*P)}const z=new Ee;z.setAttribute("position",new Ne(x,M)),z.setAttribute("uv",new Ne(w,g)),z.setAttribute("faceIndex",new Ne(S,m)),t.push(z),s>ts&&s--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function Ul(n,t,e){const i=new Ri(n,t,e);return i.texture.mapping=Wo,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function po(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function Gp(n,t,e){const i=new Float32Array(bi),s=new b(0,1,0);return new Wn({name:"SphericalGaussianBlur",defines:{n:bi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Va(),fragmentShader:`

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
		`,blending:oi,depthTest:!1,depthWrite:!1})}function Nl(){return new Wn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Va(),fragmentShader:`

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
		`,blending:oi,depthTest:!1,depthWrite:!1})}function zl(){return new Wn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Va(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:oi,depthTest:!1,depthWrite:!1})}function Va(){return`

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
	`}function Hp(n){let t=new WeakMap,e=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===Jr||l===jr,u=l===rs||l===as;if(c||u){let d=t.get(a);const h=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==h)return e===null&&(e=new Dl(n)),d=c?e.fromEquirectangular(a,d):e.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,t.set(a,d),d.texture;if(d!==void 0)return d.texture;{const p=a.image;return c&&p&&p.height>0||u&&p&&s(p)?(e===null&&(e=new Dl(n)),d=c?e.fromEquirectangular(a):e.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,t.set(a,d),a.addEventListener("dispose",o),d.texture):null}}}return a}function s(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function o(a){const l=a.target;l.removeEventListener("dispose",o);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function r(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:r}}function Vp(n){const t={};function e(i){if(t[i]!==void 0)return t[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const s=e(i);return s===null&&Rs("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function Wp(n,t,e,i){const s={},o=new WeakMap;function r(d){const h=d.target;h.index!==null&&t.remove(h.index);for(const f in h.attributes)t.remove(h.attributes[f]);for(const f in h.morphAttributes){const M=h.morphAttributes[f];for(let g=0,m=M.length;g<m;g++)t.remove(M[g])}h.removeEventListener("dispose",r),delete s[h.id];const p=o.get(h);p&&(t.remove(p),o.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,e.memory.geometries--}function a(d,h){return s[h.id]===!0||(h.addEventListener("dispose",r),s[h.id]=!0,e.memory.geometries++),h}function l(d){const h=d.attributes;for(const f in h)t.update(h[f],n.ARRAY_BUFFER);const p=d.morphAttributes;for(const f in p){const M=p[f];for(let g=0,m=M.length;g<m;g++)t.update(M[g],n.ARRAY_BUFFER)}}function c(d){const h=[],p=d.index,f=d.attributes.position;let M=0;if(p!==null){const x=p.array;M=p.version;for(let w=0,S=x.length;w<S;w+=3){const z=x[w+0],P=x[w+1],I=x[w+2];h.push(z,P,P,I,I,z)}}else if(f!==void 0){const x=f.array;M=f.version;for(let w=0,S=x.length/3-1;w<S;w+=3){const z=w+0,P=w+1,I=w+2;h.push(z,P,P,I,I,z)}}else return;const g=new(Oc(h)?Vc:Hc)(h,1);g.version=M;const m=o.get(d);m&&t.remove(m),o.set(d,g)}function u(d){const h=o.get(d);if(h){const p=d.index;p!==null&&h.version<p.version&&c(d)}else c(d);return o.get(d)}return{get:a,update:l,getWireframeAttribute:u}}function Xp(n,t,e){let i;function s(h){i=h}let o,r;function a(h){o=h.type,r=h.bytesPerElement}function l(h,p){n.drawElements(i,p,o,h*r),e.update(p,i,1)}function c(h,p,f){f!==0&&(n.drawElementsInstanced(i,p,o,h*r,f),e.update(p,i,f))}function u(h,p,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,o,h,0,f);let g=0;for(let m=0;m<f;m++)g+=p[m];e.update(g,i,1)}function d(h,p,f,M){if(f===0)return;const g=t.get("WEBGL_multi_draw");if(g===null)for(let m=0;m<h.length;m++)c(h[m]/r,p[m],M[m]);else{g.multiDrawElementsInstancedWEBGL(i,p,0,o,h,0,M,0,f);let m=0;for(let x=0;x<f;x++)m+=p[x]*M[x];e.update(m,i,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function qp(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(o,r,a){switch(e.calls++,r){case n.TRIANGLES:e.triangles+=a*(o/3);break;case n.LINES:e.lines+=a*(o/2);break;case n.LINE_STRIP:e.lines+=a*(o-1);break;case n.LINE_LOOP:e.lines+=a*o;break;case n.POINTS:e.points+=a*o;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",r);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function Yp(n,t,e){const i=new WeakMap,s=new me;function o(r,a,l){const c=r.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0;let h=i.get(a);if(h===void 0||h.count!==d){let _=function(){L.dispose(),i.delete(a),a.removeEventListener("dispose",_)};var p=_;h!==void 0&&h.texture.dispose();const f=a.morphAttributes.position!==void 0,M=a.morphAttributes.normal!==void 0,g=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],x=a.morphAttributes.normal||[],w=a.morphAttributes.color||[];let S=0;f===!0&&(S=1),M===!0&&(S=2),g===!0&&(S=3);let z=a.attributes.position.count*S,P=1;z>t.maxTextureSize&&(P=Math.ceil(z/t.maxTextureSize),z=t.maxTextureSize);const I=new Float32Array(z*P*4*d),L=new kc(I,z,P,d);L.type=Fn,L.needsUpdate=!0;const y=S*4;for(let A=0;A<d;A++){const U=m[A],O=x[A],K=w[A],tt=z*P*4*A;for(let J=0;J<U.count;J++){const st=J*y;f===!0&&(s.fromBufferAttribute(U,J),I[tt+st+0]=s.x,I[tt+st+1]=s.y,I[tt+st+2]=s.z,I[tt+st+3]=0),M===!0&&(s.fromBufferAttribute(O,J),I[tt+st+4]=s.x,I[tt+st+5]=s.y,I[tt+st+6]=s.z,I[tt+st+7]=0),g===!0&&(s.fromBufferAttribute(K,J),I[tt+st+8]=s.x,I[tt+st+9]=s.y,I[tt+st+10]=s.z,I[tt+st+11]=K.itemSize===4?s.w:1)}}h={count:d,texture:L,size:new Tt(z,P)},i.set(a,h),a.addEventListener("dispose",_)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",r.morphTexture,e);else{let f=0;for(let g=0;g<c.length;g++)f+=c[g];const M=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(n,"morphTargetBaseInfluence",M),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",h.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:o}}function $p(n,t,e,i){let s=new WeakMap;function o(l){const c=i.render.frame,u=l.geometry,d=t.get(l,u);if(s.get(d)!==c&&(t.update(d),s.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const h=l.skeleton;s.get(h)!==c&&(h.update(),s.set(h,c))}return d}function r(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:o,dispose:r}}class Zc extends je{constructor(t,e,i,s,o,r,a,l,c,u=es){if(u!==es&&u!==cs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===es&&(i=Ci),i===void 0&&u===cs&&(i=ls),super(null,s,o,r,a,l,u,i,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:vn,this.minFilter=l!==void 0?l:vn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Kc=new je,Fl=new Zc(1,1),Jc=new kc,jc=new Dd,Qc=new qc,Ol=[],Bl=[],kl=new Float32Array(16),Gl=new Float32Array(9),Hl=new Float32Array(4);function ps(n,t,e){const i=n[0];if(i<=0||i>0)return n;const s=t*e;let o=Ol[s];if(o===void 0&&(o=new Float32Array(s),Ol[s]=o),t!==0){i.toArray(o,0);for(let r=1,a=0;r!==t;++r)a+=e,n[r].toArray(o,a)}return o}function ze(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function Fe(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function Yo(n,t){let e=Bl[t];e===void 0&&(e=new Int32Array(t),Bl[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function Zp(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function Kp(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ze(e,t))return;n.uniform2fv(this.addr,t),Fe(e,t)}}function Jp(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ze(e,t))return;n.uniform3fv(this.addr,t),Fe(e,t)}}function jp(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ze(e,t))return;n.uniform4fv(this.addr,t),Fe(e,t)}}function Qp(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(ze(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),Fe(e,t)}else{if(ze(e,i))return;Hl.set(i),n.uniformMatrix2fv(this.addr,!1,Hl),Fe(e,i)}}function t0(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(ze(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),Fe(e,t)}else{if(ze(e,i))return;Gl.set(i),n.uniformMatrix3fv(this.addr,!1,Gl),Fe(e,i)}}function e0(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(ze(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),Fe(e,t)}else{if(ze(e,i))return;kl.set(i),n.uniformMatrix4fv(this.addr,!1,kl),Fe(e,i)}}function n0(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function i0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ze(e,t))return;n.uniform2iv(this.addr,t),Fe(e,t)}}function s0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ze(e,t))return;n.uniform3iv(this.addr,t),Fe(e,t)}}function o0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ze(e,t))return;n.uniform4iv(this.addr,t),Fe(e,t)}}function r0(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function a0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ze(e,t))return;n.uniform2uiv(this.addr,t),Fe(e,t)}}function l0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ze(e,t))return;n.uniform3uiv(this.addr,t),Fe(e,t)}}function c0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ze(e,t))return;n.uniform4uiv(this.addr,t),Fe(e,t)}}function u0(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let o;this.type===n.SAMPLER_2D_SHADOW?(Fl.compareFunction=Fc,o=Fl):o=Kc,e.setTexture2D(t||o,s)}function d0(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||jc,s)}function h0(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||Qc,s)}function f0(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||Jc,s)}function p0(n){switch(n){case 5126:return Zp;case 35664:return Kp;case 35665:return Jp;case 35666:return jp;case 35674:return Qp;case 35675:return t0;case 35676:return e0;case 5124:case 35670:return n0;case 35667:case 35671:return i0;case 35668:case 35672:return s0;case 35669:case 35673:return o0;case 5125:return r0;case 36294:return a0;case 36295:return l0;case 36296:return c0;case 35678:case 36198:case 36298:case 36306:case 35682:return u0;case 35679:case 36299:case 36307:return d0;case 35680:case 36300:case 36308:case 36293:return h0;case 36289:case 36303:case 36311:case 36292:return f0}}function m0(n,t){n.uniform1fv(this.addr,t)}function g0(n,t){const e=ps(t,this.size,2);n.uniform2fv(this.addr,e)}function _0(n,t){const e=ps(t,this.size,3);n.uniform3fv(this.addr,e)}function v0(n,t){const e=ps(t,this.size,4);n.uniform4fv(this.addr,e)}function M0(n,t){const e=ps(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function y0(n,t){const e=ps(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function S0(n,t){const e=ps(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function x0(n,t){n.uniform1iv(this.addr,t)}function w0(n,t){n.uniform2iv(this.addr,t)}function b0(n,t){n.uniform3iv(this.addr,t)}function E0(n,t){n.uniform4iv(this.addr,t)}function T0(n,t){n.uniform1uiv(this.addr,t)}function A0(n,t){n.uniform2uiv(this.addr,t)}function C0(n,t){n.uniform3uiv(this.addr,t)}function R0(n,t){n.uniform4uiv(this.addr,t)}function P0(n,t,e){const i=this.cache,s=t.length,o=Yo(e,s);ze(i,o)||(n.uniform1iv(this.addr,o),Fe(i,o));for(let r=0;r!==s;++r)e.setTexture2D(t[r]||Kc,o[r])}function L0(n,t,e){const i=this.cache,s=t.length,o=Yo(e,s);ze(i,o)||(n.uniform1iv(this.addr,o),Fe(i,o));for(let r=0;r!==s;++r)e.setTexture3D(t[r]||jc,o[r])}function I0(n,t,e){const i=this.cache,s=t.length,o=Yo(e,s);ze(i,o)||(n.uniform1iv(this.addr,o),Fe(i,o));for(let r=0;r!==s;++r)e.setTextureCube(t[r]||Qc,o[r])}function D0(n,t,e){const i=this.cache,s=t.length,o=Yo(e,s);ze(i,o)||(n.uniform1iv(this.addr,o),Fe(i,o));for(let r=0;r!==s;++r)e.setTexture2DArray(t[r]||Jc,o[r])}function U0(n){switch(n){case 5126:return m0;case 35664:return g0;case 35665:return _0;case 35666:return v0;case 35674:return M0;case 35675:return y0;case 35676:return S0;case 5124:case 35670:return x0;case 35667:case 35671:return w0;case 35668:case 35672:return b0;case 35669:case 35673:return E0;case 5125:return T0;case 36294:return A0;case 36295:return C0;case 36296:return R0;case 35678:case 36198:case 36298:case 36306:case 35682:return P0;case 35679:case 36299:case 36307:return L0;case 35680:case 36300:case 36308:case 36293:return I0;case 36289:case 36303:case 36311:case 36292:return D0}}class N0{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=p0(e.type)}}class z0{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=U0(e.type)}}class F0{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const s=this.seq;for(let o=0,r=s.length;o!==r;++o){const a=s[o];a.setValue(t,e[a.id],i)}}}const br=/(\w+)(\])?(\[|\.)?/g;function Vl(n,t){n.seq.push(t),n.map[t.id]=t}function O0(n,t,e){const i=n.name,s=i.length;for(br.lastIndex=0;;){const o=br.exec(i),r=br.lastIndex;let a=o[1];const l=o[2]==="]",c=o[3];if(l&&(a=a|0),c===void 0||c==="["&&r+2===s){Vl(e,c===void 0?new N0(a,n,t):new z0(a,n,t));break}else{let d=e.map[a];d===void 0&&(d=new F0(a),Vl(e,d)),e=d}}}class Po{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const o=t.getActiveUniform(e,s),r=t.getUniformLocation(e,o.name);O0(o,r,this)}}setValue(t,e,i,s){const o=this.map[e];o!==void 0&&o.setValue(t,i,s)}setOptional(t,e,i){const s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let o=0,r=e.length;o!==r;++o){const a=e[o],l=i[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){const i=[];for(let s=0,o=t.length;s!==o;++s){const r=t[s];r.id in e&&i.push(r)}return i}}function Wl(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const B0=37297;let k0=0;function G0(n,t){const e=n.split(`
`),i=[],s=Math.max(t-6,0),o=Math.min(t+6,e.length);for(let r=s;r<o;r++){const a=r+1;i.push(`${a===t?">":" "} ${a}: ${e[r]}`)}return i.join(`
`)}const Xl=new $t;function H0(n){re._getMatrix(Xl,re.workingColorSpace,n);const t=`mat3( ${Xl.elements.map(e=>e.toFixed(4))} )`;switch(re.getTransfer(n)){case Xo:return[t,"LinearTransferOETF"];case pe:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function ql(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),s=n.getShaderInfoLog(t).trim();if(i&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const r=parseInt(o[1]);return e.toUpperCase()+`

`+s+`

`+G0(n.getShaderSource(t),r)}else return s}function V0(n,t){const e=H0(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function W0(n,t){let e;switch(t){case qu:e="Linear";break;case Yu:e="Reinhard";break;case $u:e="Cineon";break;case Vo:e="ACESFilmic";break;case Ku:e="AgX";break;case Ju:e="Neutral";break;case Zu:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const mo=new b;function X0(){re.getLuminanceCoefficients(mo);const n=mo.x.toFixed(4),t=mo.y.toFixed(4),e=mo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function q0(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ps).join(`
`)}function Y0(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function $0(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const o=n.getActiveAttrib(t,s),r=o.name;let a=1;o.type===n.FLOAT_MAT2&&(a=2),o.type===n.FLOAT_MAT3&&(a=3),o.type===n.FLOAT_MAT4&&(a=4),e[r]={type:o.type,location:n.getAttribLocation(t,r),locationSize:a}}return e}function Ps(n){return n!==""}function Yl(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function $l(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Z0=/^[ \t]*#include +<([\w\d./]+)>/gm;function Aa(n){return n.replace(Z0,J0)}const K0=new Map;function J0(n,t){let e=Kt[t];if(e===void 0){const i=K0.get(t);if(i!==void 0)e=Kt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return Aa(e)}const j0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Zl(n){return n.replace(j0,Q0)}function Q0(n,t,e,i){let s="";for(let o=parseInt(t);o<parseInt(e);o++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+o+" ]").replace(/UNROLLED_LOOP_INDEX/g,o);return s}function Kl(n){let t=`precision ${n.precision} float;
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
#define LOW_PRECISION`),t}function tm(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Ec?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===Ho?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Un&&(t="SHADOWMAP_TYPE_VSM"),t}function em(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case rs:case as:t="ENVMAP_TYPE_CUBE";break;case Wo:t="ENVMAP_TYPE_CUBE_UV";break}return t}function nm(n){let t="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case as:t="ENVMAP_MODE_REFRACTION";break}return t}function im(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Ia:t="ENVMAP_BLENDING_MULTIPLY";break;case Wu:t="ENVMAP_BLENDING_MIX";break;case Xu:t="ENVMAP_BLENDING_ADD";break}return t}function sm(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:i,maxMip:e}}function om(n,t,e,i){const s=n.getContext(),o=e.defines;let r=e.vertexShader,a=e.fragmentShader;const l=tm(e),c=em(e),u=nm(e),d=im(e),h=sm(e),p=q0(e),f=Y0(o),M=s.createProgram();let g,m,x=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f].filter(Ps).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f].filter(Ps).join(`
`),m.length>0&&(m+=`
`)):(g=[Kl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ps).join(`
`),m=[Kl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==ri?"#define TONE_MAPPING":"",e.toneMapping!==ri?Kt.tonemapping_pars_fragment:"",e.toneMapping!==ri?W0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Kt.colorspace_pars_fragment,V0("linearToOutputTexel",e.outputColorSpace),X0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ps).join(`
`)),r=Aa(r),r=Yl(r,e),r=$l(r,e),a=Aa(a),a=Yl(a,e),a=$l(a,e),r=Zl(r),a=Zl(a),e.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,g=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",e.glslVersion===ll?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===ll?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const w=x+g+r,S=x+m+a,z=Wl(s,s.VERTEX_SHADER,w),P=Wl(s,s.FRAGMENT_SHADER,S);s.attachShader(M,z),s.attachShader(M,P),e.index0AttributeName!==void 0?s.bindAttribLocation(M,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(M,0,"position"),s.linkProgram(M);function I(A){if(n.debug.checkShaderErrors){const U=s.getProgramInfoLog(M).trim(),O=s.getShaderInfoLog(z).trim(),K=s.getShaderInfoLog(P).trim();let tt=!0,J=!0;if(s.getProgramParameter(M,s.LINK_STATUS)===!1)if(tt=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,M,z,P);else{const st=ql(s,z,"vertex"),$=ql(s,P,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(M,s.VALIDATE_STATUS)+`

Material Name: `+A.name+`
Material Type: `+A.type+`

Program Info Log: `+U+`
`+st+`
`+$)}else U!==""?console.warn("THREE.WebGLProgram: Program Info Log:",U):(O===""||K==="")&&(J=!1);J&&(A.diagnostics={runnable:tt,programLog:U,vertexShader:{log:O,prefix:g},fragmentShader:{log:K,prefix:m}})}s.deleteShader(z),s.deleteShader(P),L=new Po(s,M),y=$0(s,M)}let L;this.getUniforms=function(){return L===void 0&&I(this),L};let y;this.getAttributes=function(){return y===void 0&&I(this),y};let _=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return _===!1&&(_=s.getProgramParameter(M,B0)),_},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(M),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=k0++,this.cacheKey=t,this.usedTimes=1,this.program=M,this.vertexShader=z,this.fragmentShader=P,this}let rm=0;class am{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(e),o=this._getShaderStage(i),r=this._getShaderCacheForMaterial(t);return r.has(s)===!1&&(r.add(s),s.usedTimes++),r.has(o)===!1&&(r.add(o),o.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new lm(t),e.set(t,i)),i}}class lm{constructor(t){this.id=rm++,this.code=t,this.usedTimes=0}}function cm(n,t,e,i,s,o,r){const a=new Ga,l=new am,c=new Set,u=[],d=s.logarithmicDepthBuffer,h=s.vertexTextures;let p=s.precision;const f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function M(y){return c.add(y),y===0?"uv":`uv${y}`}function g(y,_,A,U,O){const K=U.fog,tt=O.geometry,J=y.isMeshStandardMaterial?U.environment:null,st=(y.isMeshStandardMaterial?e:t).get(y.envMap||J),$=st&&st.mapping===Wo?st.image.height:null,ct=f[y.type];y.precision!==null&&(p=s.getMaxPrecision(y.precision),p!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",p,"instead."));const dt=tt.morphAttributes.position||tt.morphAttributes.normal||tt.morphAttributes.color,It=dt!==void 0?dt.length:0;let Wt=0;tt.morphAttributes.position!==void 0&&(Wt=1),tt.morphAttributes.normal!==void 0&&(Wt=2),tt.morphAttributes.color!==void 0&&(Wt=3);let oe,j,at,At;if(ct){const ce=bn[ct];oe=ce.vertexShader,j=ce.fragmentShader}else oe=y.vertexShader,j=y.fragmentShader,l.update(y),at=l.getVertexShaderID(y),At=l.getFragmentShaderID(y);const mt=n.getRenderTarget(),Ut=n.state.buffers.depth.getReversed(),kt=O.isInstancedMesh===!0,Zt=O.isBatchedMesh===!0,ve=!!y.map,Qt=!!y.matcap,be=!!st,W=!!y.aoMap,Ie=!!y.lightMap,te=!!y.bumpMap,ie=!!y.normalMap,zt=!!y.displacementMap,Me=!!y.emissiveMap,Nt=!!y.metalnessMap,R=!!y.roughnessMap,E=y.anisotropy>0,Y=y.clearcoat>0,it=y.dispersion>0,et=y.iridescence>0,Q=y.sheen>0,Dt=y.transmission>0,gt=E&&!!y.anisotropyMap,bt=Y&&!!y.clearcoatMap,se=Y&&!!y.clearcoatNormalMap,lt=Y&&!!y.clearcoatRoughnessMap,xt=et&&!!y.iridescenceMap,Ft=et&&!!y.iridescenceThicknessMap,Gt=Q&&!!y.sheenColorMap,wt=Q&&!!y.sheenRoughnessMap,ee=!!y.specularMap,Yt=!!y.specularColorMap,le=!!y.specularIntensityMap,H=Dt&&!!y.transmissionMap,ft=Dt&&!!y.thicknessMap,Z=!!y.gradientMap,nt=!!y.alphaMap,Mt=y.alphaTest>0,_t=!!y.alphaHash,Vt=!!y.extensions;let ye=ri;y.toneMapped&&(mt===null||mt.isXRRenderTarget===!0)&&(ye=n.toneMapping);const Te={shaderID:ct,shaderType:y.type,shaderName:y.name,vertexShader:oe,fragmentShader:j,defines:y.defines,customVertexShaderID:at,customFragmentShaderID:At,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:p,batching:Zt,batchingColor:Zt&&O._colorsTexture!==null,instancing:kt,instancingColor:kt&&O.instanceColor!==null,instancingMorph:kt&&O.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:mt===null?n.outputColorSpace:mt.isXRRenderTarget===!0?mt.texture.colorSpace:hs,alphaToCoverage:!!y.alphaToCoverage,map:ve,matcap:Qt,envMap:be,envMapMode:be&&st.mapping,envMapCubeUVHeight:$,aoMap:W,lightMap:Ie,bumpMap:te,normalMap:ie,displacementMap:h&&zt,emissiveMap:Me,normalMapObjectSpace:ie&&y.normalMapType===ed,normalMapTangentSpace:ie&&y.normalMapType===Ba,metalnessMap:Nt,roughnessMap:R,anisotropy:E,anisotropyMap:gt,clearcoat:Y,clearcoatMap:bt,clearcoatNormalMap:se,clearcoatRoughnessMap:lt,dispersion:it,iridescence:et,iridescenceMap:xt,iridescenceThicknessMap:Ft,sheen:Q,sheenColorMap:Gt,sheenRoughnessMap:wt,specularMap:ee,specularColorMap:Yt,specularIntensityMap:le,transmission:Dt,transmissionMap:H,thicknessMap:ft,gradientMap:Z,opaque:y.transparent===!1&&y.blending===Ai&&y.alphaToCoverage===!1,alphaMap:nt,alphaTest:Mt,alphaHash:_t,combine:y.combine,mapUv:ve&&M(y.map.channel),aoMapUv:W&&M(y.aoMap.channel),lightMapUv:Ie&&M(y.lightMap.channel),bumpMapUv:te&&M(y.bumpMap.channel),normalMapUv:ie&&M(y.normalMap.channel),displacementMapUv:zt&&M(y.displacementMap.channel),emissiveMapUv:Me&&M(y.emissiveMap.channel),metalnessMapUv:Nt&&M(y.metalnessMap.channel),roughnessMapUv:R&&M(y.roughnessMap.channel),anisotropyMapUv:gt&&M(y.anisotropyMap.channel),clearcoatMapUv:bt&&M(y.clearcoatMap.channel),clearcoatNormalMapUv:se&&M(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:lt&&M(y.clearcoatRoughnessMap.channel),iridescenceMapUv:xt&&M(y.iridescenceMap.channel),iridescenceThicknessMapUv:Ft&&M(y.iridescenceThicknessMap.channel),sheenColorMapUv:Gt&&M(y.sheenColorMap.channel),sheenRoughnessMapUv:wt&&M(y.sheenRoughnessMap.channel),specularMapUv:ee&&M(y.specularMap.channel),specularColorMapUv:Yt&&M(y.specularColorMap.channel),specularIntensityMapUv:le&&M(y.specularIntensityMap.channel),transmissionMapUv:H&&M(y.transmissionMap.channel),thicknessMapUv:ft&&M(y.thicknessMap.channel),alphaMapUv:nt&&M(y.alphaMap.channel),vertexTangents:!!tt.attributes.tangent&&(ie||E),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!tt.attributes.color&&tt.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!tt.attributes.uv&&(ve||nt),fog:!!K,useFog:y.fog===!0,fogExp2:!!K&&K.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:Ut,skinning:O.isSkinnedMesh===!0,morphTargets:tt.morphAttributes.position!==void 0,morphNormals:tt.morphAttributes.normal!==void 0,morphColors:tt.morphAttributes.color!==void 0,morphTargetsCount:It,morphTextureStride:Wt,numDirLights:_.directional.length,numPointLights:_.point.length,numSpotLights:_.spot.length,numSpotLightMaps:_.spotLightMap.length,numRectAreaLights:_.rectArea.length,numHemiLights:_.hemi.length,numDirLightShadows:_.directionalShadowMap.length,numPointLightShadows:_.pointShadowMap.length,numSpotLightShadows:_.spotShadowMap.length,numSpotLightShadowsWithMaps:_.numSpotLightShadowsWithMaps,numLightProbes:_.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:y.dithering,shadowMapEnabled:n.shadowMap.enabled&&A.length>0,shadowMapType:n.shadowMap.type,toneMapping:ye,decodeVideoTexture:ve&&y.map.isVideoTexture===!0&&re.getTransfer(y.map.colorSpace)===pe,decodeVideoTextureEmissive:Me&&y.emissiveMap.isVideoTexture===!0&&re.getTransfer(y.emissiveMap.colorSpace)===pe,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===ke,flipSided:y.side===$e,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:Vt&&y.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Vt&&y.extensions.multiDraw===!0||Zt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Te.vertexUv1s=c.has(1),Te.vertexUv2s=c.has(2),Te.vertexUv3s=c.has(3),c.clear(),Te}function m(y){const _=[];if(y.shaderID?_.push(y.shaderID):(_.push(y.customVertexShaderID),_.push(y.customFragmentShaderID)),y.defines!==void 0)for(const A in y.defines)_.push(A),_.push(y.defines[A]);return y.isRawShaderMaterial===!1&&(x(_,y),w(_,y),_.push(n.outputColorSpace)),_.push(y.customProgramCacheKey),_.join()}function x(y,_){y.push(_.precision),y.push(_.outputColorSpace),y.push(_.envMapMode),y.push(_.envMapCubeUVHeight),y.push(_.mapUv),y.push(_.alphaMapUv),y.push(_.lightMapUv),y.push(_.aoMapUv),y.push(_.bumpMapUv),y.push(_.normalMapUv),y.push(_.displacementMapUv),y.push(_.emissiveMapUv),y.push(_.metalnessMapUv),y.push(_.roughnessMapUv),y.push(_.anisotropyMapUv),y.push(_.clearcoatMapUv),y.push(_.clearcoatNormalMapUv),y.push(_.clearcoatRoughnessMapUv),y.push(_.iridescenceMapUv),y.push(_.iridescenceThicknessMapUv),y.push(_.sheenColorMapUv),y.push(_.sheenRoughnessMapUv),y.push(_.specularMapUv),y.push(_.specularColorMapUv),y.push(_.specularIntensityMapUv),y.push(_.transmissionMapUv),y.push(_.thicknessMapUv),y.push(_.combine),y.push(_.fogExp2),y.push(_.sizeAttenuation),y.push(_.morphTargetsCount),y.push(_.morphAttributeCount),y.push(_.numDirLights),y.push(_.numPointLights),y.push(_.numSpotLights),y.push(_.numSpotLightMaps),y.push(_.numHemiLights),y.push(_.numRectAreaLights),y.push(_.numDirLightShadows),y.push(_.numPointLightShadows),y.push(_.numSpotLightShadows),y.push(_.numSpotLightShadowsWithMaps),y.push(_.numLightProbes),y.push(_.shadowMapType),y.push(_.toneMapping),y.push(_.numClippingPlanes),y.push(_.numClipIntersection),y.push(_.depthPacking)}function w(y,_){a.disableAll(),_.supportsVertexTextures&&a.enable(0),_.instancing&&a.enable(1),_.instancingColor&&a.enable(2),_.instancingMorph&&a.enable(3),_.matcap&&a.enable(4),_.envMap&&a.enable(5),_.normalMapObjectSpace&&a.enable(6),_.normalMapTangentSpace&&a.enable(7),_.clearcoat&&a.enable(8),_.iridescence&&a.enable(9),_.alphaTest&&a.enable(10),_.vertexColors&&a.enable(11),_.vertexAlphas&&a.enable(12),_.vertexUv1s&&a.enable(13),_.vertexUv2s&&a.enable(14),_.vertexUv3s&&a.enable(15),_.vertexTangents&&a.enable(16),_.anisotropy&&a.enable(17),_.alphaHash&&a.enable(18),_.batching&&a.enable(19),_.dispersion&&a.enable(20),_.batchingColor&&a.enable(21),y.push(a.mask),a.disableAll(),_.fog&&a.enable(0),_.useFog&&a.enable(1),_.flatShading&&a.enable(2),_.logarithmicDepthBuffer&&a.enable(3),_.reverseDepthBuffer&&a.enable(4),_.skinning&&a.enable(5),_.morphTargets&&a.enable(6),_.morphNormals&&a.enable(7),_.morphColors&&a.enable(8),_.premultipliedAlpha&&a.enable(9),_.shadowMapEnabled&&a.enable(10),_.doubleSided&&a.enable(11),_.flipSided&&a.enable(12),_.useDepthPacking&&a.enable(13),_.dithering&&a.enable(14),_.transmission&&a.enable(15),_.sheen&&a.enable(16),_.opaque&&a.enable(17),_.pointsUvs&&a.enable(18),_.decodeVideoTexture&&a.enable(19),_.decodeVideoTextureEmissive&&a.enable(20),_.alphaToCoverage&&a.enable(21),y.push(a.mask)}function S(y){const _=f[y.type];let A;if(_){const U=bn[_];A=Xd.clone(U.uniforms)}else A=y.uniforms;return A}function z(y,_){let A;for(let U=0,O=u.length;U<O;U++){const K=u[U];if(K.cacheKey===_){A=K,++A.usedTimes;break}}return A===void 0&&(A=new om(n,_,y,o),u.push(A)),A}function P(y){if(--y.usedTimes===0){const _=u.indexOf(y);u[_]=u[u.length-1],u.pop(),y.destroy()}}function I(y){l.remove(y)}function L(){l.dispose()}return{getParameters:g,getProgramCacheKey:m,getUniforms:S,acquireProgram:z,releaseProgram:P,releaseShaderCache:I,programs:u,dispose:L}}function um(){let n=new WeakMap;function t(r){return n.has(r)}function e(r){let a=n.get(r);return a===void 0&&(a={},n.set(r,a)),a}function i(r){n.delete(r)}function s(r,a,l){n.get(r)[a]=l}function o(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:o}}function dm(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function Jl(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function jl(){const n=[];let t=0;const e=[],i=[],s=[];function o(){t=0,e.length=0,i.length=0,s.length=0}function r(d,h,p,f,M,g){let m=n[t];return m===void 0?(m={id:d.id,object:d,geometry:h,material:p,groupOrder:f,renderOrder:d.renderOrder,z:M,group:g},n[t]=m):(m.id=d.id,m.object=d,m.geometry=h,m.material=p,m.groupOrder=f,m.renderOrder=d.renderOrder,m.z=M,m.group=g),t++,m}function a(d,h,p,f,M,g){const m=r(d,h,p,f,M,g);p.transmission>0?i.push(m):p.transparent===!0?s.push(m):e.push(m)}function l(d,h,p,f,M,g){const m=r(d,h,p,f,M,g);p.transmission>0?i.unshift(m):p.transparent===!0?s.unshift(m):e.unshift(m)}function c(d,h){e.length>1&&e.sort(d||dm),i.length>1&&i.sort(h||Jl),s.length>1&&s.sort(h||Jl)}function u(){for(let d=t,h=n.length;d<h;d++){const p=n[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:i,transparent:s,init:o,push:a,unshift:l,finish:u,sort:c}}function hm(){let n=new WeakMap;function t(i,s){const o=n.get(i);let r;return o===void 0?(r=new jl,n.set(i,[r])):s>=o.length?(r=new jl,o.push(r)):r=o[s],r}function e(){n=new WeakMap}return{get:t,dispose:e}}function fm(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new b,color:new Et};break;case"SpotLight":e={position:new b,direction:new b,color:new Et,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new b,color:new Et,distance:0,decay:0};break;case"HemisphereLight":e={direction:new b,skyColor:new Et,groundColor:new Et};break;case"RectAreaLight":e={color:new Et,position:new b,halfWidth:new b,halfHeight:new b};break}return n[t.id]=e,e}}}function pm(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Tt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Tt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Tt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let mm=0;function gm(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function _m(n){const t=new fm,e=pm(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new b);const s=new b,o=new _e,r=new _e;function a(c){let u=0,d=0,h=0;for(let y=0;y<9;y++)i.probe[y].set(0,0,0);let p=0,f=0,M=0,g=0,m=0,x=0,w=0,S=0,z=0,P=0,I=0;c.sort(gm);for(let y=0,_=c.length;y<_;y++){const A=c[y],U=A.color,O=A.intensity,K=A.distance,tt=A.shadow&&A.shadow.map?A.shadow.map.texture:null;if(A.isAmbientLight)u+=U.r*O,d+=U.g*O,h+=U.b*O;else if(A.isLightProbe){for(let J=0;J<9;J++)i.probe[J].addScaledVector(A.sh.coefficients[J],O);I++}else if(A.isDirectionalLight){const J=t.get(A);if(J.color.copy(A.color).multiplyScalar(A.intensity),A.castShadow){const st=A.shadow,$=e.get(A);$.shadowIntensity=st.intensity,$.shadowBias=st.bias,$.shadowNormalBias=st.normalBias,$.shadowRadius=st.radius,$.shadowMapSize=st.mapSize,i.directionalShadow[p]=$,i.directionalShadowMap[p]=tt,i.directionalShadowMatrix[p]=A.shadow.matrix,x++}i.directional[p]=J,p++}else if(A.isSpotLight){const J=t.get(A);J.position.setFromMatrixPosition(A.matrixWorld),J.color.copy(U).multiplyScalar(O),J.distance=K,J.coneCos=Math.cos(A.angle),J.penumbraCos=Math.cos(A.angle*(1-A.penumbra)),J.decay=A.decay,i.spot[M]=J;const st=A.shadow;if(A.map&&(i.spotLightMap[z]=A.map,z++,st.updateMatrices(A),A.castShadow&&P++),i.spotLightMatrix[M]=st.matrix,A.castShadow){const $=e.get(A);$.shadowIntensity=st.intensity,$.shadowBias=st.bias,$.shadowNormalBias=st.normalBias,$.shadowRadius=st.radius,$.shadowMapSize=st.mapSize,i.spotShadow[M]=$,i.spotShadowMap[M]=tt,S++}M++}else if(A.isRectAreaLight){const J=t.get(A);J.color.copy(U).multiplyScalar(O),J.halfWidth.set(A.width*.5,0,0),J.halfHeight.set(0,A.height*.5,0),i.rectArea[g]=J,g++}else if(A.isPointLight){const J=t.get(A);if(J.color.copy(A.color).multiplyScalar(A.intensity),J.distance=A.distance,J.decay=A.decay,A.castShadow){const st=A.shadow,$=e.get(A);$.shadowIntensity=st.intensity,$.shadowBias=st.bias,$.shadowNormalBias=st.normalBias,$.shadowRadius=st.radius,$.shadowMapSize=st.mapSize,$.shadowCameraNear=st.camera.near,$.shadowCameraFar=st.camera.far,i.pointShadow[f]=$,i.pointShadowMap[f]=tt,i.pointShadowMatrix[f]=A.shadow.matrix,w++}i.point[f]=J,f++}else if(A.isHemisphereLight){const J=t.get(A);J.skyColor.copy(A.color).multiplyScalar(O),J.groundColor.copy(A.groundColor).multiplyScalar(O),i.hemi[m]=J,m++}}g>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=pt.LTC_FLOAT_1,i.rectAreaLTC2=pt.LTC_FLOAT_2):(i.rectAreaLTC1=pt.LTC_HALF_1,i.rectAreaLTC2=pt.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=h;const L=i.hash;(L.directionalLength!==p||L.pointLength!==f||L.spotLength!==M||L.rectAreaLength!==g||L.hemiLength!==m||L.numDirectionalShadows!==x||L.numPointShadows!==w||L.numSpotShadows!==S||L.numSpotMaps!==z||L.numLightProbes!==I)&&(i.directional.length=p,i.spot.length=M,i.rectArea.length=g,i.point.length=f,i.hemi.length=m,i.directionalShadow.length=x,i.directionalShadowMap.length=x,i.pointShadow.length=w,i.pointShadowMap.length=w,i.spotShadow.length=S,i.spotShadowMap.length=S,i.directionalShadowMatrix.length=x,i.pointShadowMatrix.length=w,i.spotLightMatrix.length=S+z-P,i.spotLightMap.length=z,i.numSpotLightShadowsWithMaps=P,i.numLightProbes=I,L.directionalLength=p,L.pointLength=f,L.spotLength=M,L.rectAreaLength=g,L.hemiLength=m,L.numDirectionalShadows=x,L.numPointShadows=w,L.numSpotShadows=S,L.numSpotMaps=z,L.numLightProbes=I,i.version=mm++)}function l(c,u){let d=0,h=0,p=0,f=0,M=0;const g=u.matrixWorldInverse;for(let m=0,x=c.length;m<x;m++){const w=c[m];if(w.isDirectionalLight){const S=i.directional[d];S.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(g),d++}else if(w.isSpotLight){const S=i.spot[p];S.position.setFromMatrixPosition(w.matrixWorld),S.position.applyMatrix4(g),S.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(g),p++}else if(w.isRectAreaLight){const S=i.rectArea[f];S.position.setFromMatrixPosition(w.matrixWorld),S.position.applyMatrix4(g),r.identity(),o.copy(w.matrixWorld),o.premultiply(g),r.extractRotation(o),S.halfWidth.set(w.width*.5,0,0),S.halfHeight.set(0,w.height*.5,0),S.halfWidth.applyMatrix4(r),S.halfHeight.applyMatrix4(r),f++}else if(w.isPointLight){const S=i.point[h];S.position.setFromMatrixPosition(w.matrixWorld),S.position.applyMatrix4(g),h++}else if(w.isHemisphereLight){const S=i.hemi[M];S.direction.setFromMatrixPosition(w.matrixWorld),S.direction.transformDirection(g),M++}}}return{setup:a,setupView:l,state:i}}function Ql(n){const t=new _m(n),e=[],i=[];function s(u){c.camera=u,e.length=0,i.length=0}function o(u){e.push(u)}function r(u){i.push(u)}function a(){t.setup(e)}function l(u){t.setupView(e,u)}const c={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:o,pushShadow:r}}function vm(n){let t=new WeakMap;function e(s,o=0){const r=t.get(s);let a;return r===void 0?(a=new Ql(n),t.set(s,[a])):o>=r.length?(a=new Ql(n),r.push(a)):a=r[o],a}function i(){t=new WeakMap}return{get:e,dispose:i}}class Mm extends Xn{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Qu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class ym extends Xn{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Sm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,xm=`uniform sampler2D shadow_pass;
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
}`;function wm(n,t,e){let i=new Ha;const s=new Tt,o=new Tt,r=new me,a=new Mm({depthPacking:td}),l=new ym,c={},u=e.maxTextureSize,d={[ai]:$e,[$e]:ai,[ke]:ke},h=new Wn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Tt},radius:{value:4}},vertexShader:Sm,fragmentShader:xm}),p=h.clone();p.defines.HORIZONTAL_PASS=1;const f=new Ee;f.setAttribute("position",new Ne(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const M=new C(f,h),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ec;let m=this.type;this.render=function(P,I,L){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||P.length===0)return;const y=n.getRenderTarget(),_=n.getActiveCubeFace(),A=n.getActiveMipmapLevel(),U=n.state;U.setBlending(oi),U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const O=m!==Un&&this.type===Un,K=m===Un&&this.type!==Un;for(let tt=0,J=P.length;tt<J;tt++){const st=P[tt],$=st.shadow;if($===void 0){console.warn("THREE.WebGLShadowMap:",st,"has no shadow.");continue}if($.autoUpdate===!1&&$.needsUpdate===!1)continue;s.copy($.mapSize);const ct=$.getFrameExtents();if(s.multiply(ct),o.copy($.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(o.x=Math.floor(u/ct.x),s.x=o.x*ct.x,$.mapSize.x=o.x),s.y>u&&(o.y=Math.floor(u/ct.y),s.y=o.y*ct.y,$.mapSize.y=o.y)),$.map===null||O===!0||K===!0){const It=this.type!==Un?{minFilter:vn,magFilter:vn}:{};$.map!==null&&$.map.dispose(),$.map=new Ri(s.x,s.y,It),$.map.texture.name=st.name+".shadowMap",$.camera.updateProjectionMatrix()}n.setRenderTarget($.map),n.clear();const dt=$.getViewportCount();for(let It=0;It<dt;It++){const Wt=$.getViewport(It);r.set(o.x*Wt.x,o.y*Wt.y,o.x*Wt.z,o.y*Wt.w),U.viewport(r),$.updateMatrices(st,It),i=$.getFrustum(),S(I,L,$.camera,st,this.type)}$.isPointLightShadow!==!0&&this.type===Un&&x($,L),$.needsUpdate=!1}m=this.type,g.needsUpdate=!1,n.setRenderTarget(y,_,A)};function x(P,I){const L=t.update(M);h.defines.VSM_SAMPLES!==P.blurSamples&&(h.defines.VSM_SAMPLES=P.blurSamples,p.defines.VSM_SAMPLES=P.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),P.mapPass===null&&(P.mapPass=new Ri(s.x,s.y)),h.uniforms.shadow_pass.value=P.map.texture,h.uniforms.resolution.value=P.mapSize,h.uniforms.radius.value=P.radius,n.setRenderTarget(P.mapPass),n.clear(),n.renderBufferDirect(I,null,L,h,M,null),p.uniforms.shadow_pass.value=P.mapPass.texture,p.uniforms.resolution.value=P.mapSize,p.uniforms.radius.value=P.radius,n.setRenderTarget(P.map),n.clear(),n.renderBufferDirect(I,null,L,p,M,null)}function w(P,I,L,y){let _=null;const A=L.isPointLight===!0?P.customDistanceMaterial:P.customDepthMaterial;if(A!==void 0)_=A;else if(_=L.isPointLight===!0?l:a,n.localClippingEnabled&&I.clipShadows===!0&&Array.isArray(I.clippingPlanes)&&I.clippingPlanes.length!==0||I.displacementMap&&I.displacementScale!==0||I.alphaMap&&I.alphaTest>0||I.map&&I.alphaTest>0){const U=_.uuid,O=I.uuid;let K=c[U];K===void 0&&(K={},c[U]=K);let tt=K[O];tt===void 0&&(tt=_.clone(),K[O]=tt,I.addEventListener("dispose",z)),_=tt}if(_.visible=I.visible,_.wireframe=I.wireframe,y===Un?_.side=I.shadowSide!==null?I.shadowSide:I.side:_.side=I.shadowSide!==null?I.shadowSide:d[I.side],_.alphaMap=I.alphaMap,_.alphaTest=I.alphaTest,_.map=I.map,_.clipShadows=I.clipShadows,_.clippingPlanes=I.clippingPlanes,_.clipIntersection=I.clipIntersection,_.displacementMap=I.displacementMap,_.displacementScale=I.displacementScale,_.displacementBias=I.displacementBias,_.wireframeLinewidth=I.wireframeLinewidth,_.linewidth=I.linewidth,L.isPointLight===!0&&_.isMeshDistanceMaterial===!0){const U=n.properties.get(_);U.light=L}return _}function S(P,I,L,y,_){if(P.visible===!1)return;if(P.layers.test(I.layers)&&(P.isMesh||P.isLine||P.isPoints)&&(P.castShadow||P.receiveShadow&&_===Un)&&(!P.frustumCulled||i.intersectsObject(P))){P.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,P.matrixWorld);const O=t.update(P),K=P.material;if(Array.isArray(K)){const tt=O.groups;for(let J=0,st=tt.length;J<st;J++){const $=tt[J],ct=K[$.materialIndex];if(ct&&ct.visible){const dt=w(P,ct,y,_);P.onBeforeShadow(n,P,I,L,O,dt,$),n.renderBufferDirect(L,null,O,dt,P,$),P.onAfterShadow(n,P,I,L,O,dt,$)}}}else if(K.visible){const tt=w(P,K,y,_);P.onBeforeShadow(n,P,I,L,O,tt,null),n.renderBufferDirect(L,null,O,tt,P,null),P.onAfterShadow(n,P,I,L,O,tt,null)}}const U=P.children;for(let O=0,K=U.length;O<K;O++)S(U[O],I,L,y,_)}function z(P){P.target.removeEventListener("dispose",z);for(const L in c){const y=c[L],_=P.target.uuid;_ in y&&(y[_].dispose(),delete y[_])}}}const bm={[Wr]:Xr,[qr]:Zr,[Yr]:Kr,[os]:$r,[Xr]:Wr,[Zr]:qr,[Kr]:Yr,[$r]:os};function Em(n,t){function e(){let H=!1;const ft=new me;let Z=null;const nt=new me(0,0,0,0);return{setMask:function(Mt){Z!==Mt&&!H&&(n.colorMask(Mt,Mt,Mt,Mt),Z=Mt)},setLocked:function(Mt){H=Mt},setClear:function(Mt,_t,Vt,ye,Te){Te===!0&&(Mt*=ye,_t*=ye,Vt*=ye),ft.set(Mt,_t,Vt,ye),nt.equals(ft)===!1&&(n.clearColor(Mt,_t,Vt,ye),nt.copy(ft))},reset:function(){H=!1,Z=null,nt.set(-1,0,0,0)}}}function i(){let H=!1,ft=!1,Z=null,nt=null,Mt=null;return{setReversed:function(_t){if(ft!==_t){const Vt=t.get("EXT_clip_control");ft?Vt.clipControlEXT(Vt.LOWER_LEFT_EXT,Vt.ZERO_TO_ONE_EXT):Vt.clipControlEXT(Vt.LOWER_LEFT_EXT,Vt.NEGATIVE_ONE_TO_ONE_EXT);const ye=Mt;Mt=null,this.setClear(ye)}ft=_t},getReversed:function(){return ft},setTest:function(_t){_t?mt(n.DEPTH_TEST):Ut(n.DEPTH_TEST)},setMask:function(_t){Z!==_t&&!H&&(n.depthMask(_t),Z=_t)},setFunc:function(_t){if(ft&&(_t=bm[_t]),nt!==_t){switch(_t){case Wr:n.depthFunc(n.NEVER);break;case Xr:n.depthFunc(n.ALWAYS);break;case qr:n.depthFunc(n.LESS);break;case os:n.depthFunc(n.LEQUAL);break;case Yr:n.depthFunc(n.EQUAL);break;case $r:n.depthFunc(n.GEQUAL);break;case Zr:n.depthFunc(n.GREATER);break;case Kr:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}nt=_t}},setLocked:function(_t){H=_t},setClear:function(_t){Mt!==_t&&(ft&&(_t=1-_t),n.clearDepth(_t),Mt=_t)},reset:function(){H=!1,Z=null,nt=null,Mt=null,ft=!1}}}function s(){let H=!1,ft=null,Z=null,nt=null,Mt=null,_t=null,Vt=null,ye=null,Te=null;return{setTest:function(ce){H||(ce?mt(n.STENCIL_TEST):Ut(n.STENCIL_TEST))},setMask:function(ce){ft!==ce&&!H&&(n.stencilMask(ce),ft=ce)},setFunc:function(ce,Qe,Ae){(Z!==ce||nt!==Qe||Mt!==Ae)&&(n.stencilFunc(ce,Qe,Ae),Z=ce,nt=Qe,Mt=Ae)},setOp:function(ce,Qe,Ae){(_t!==ce||Vt!==Qe||ye!==Ae)&&(n.stencilOp(ce,Qe,Ae),_t=ce,Vt=Qe,ye=Ae)},setLocked:function(ce){H=ce},setClear:function(ce){Te!==ce&&(n.clearStencil(ce),Te=ce)},reset:function(){H=!1,ft=null,Z=null,nt=null,Mt=null,_t=null,Vt=null,ye=null,Te=null}}}const o=new e,r=new i,a=new s,l=new WeakMap,c=new WeakMap;let u={},d={},h=new WeakMap,p=[],f=null,M=!1,g=null,m=null,x=null,w=null,S=null,z=null,P=null,I=new Et(0,0,0),L=0,y=!1,_=null,A=null,U=null,O=null,K=null;const tt=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let J=!1,st=0;const $=n.getParameter(n.VERSION);$.indexOf("WebGL")!==-1?(st=parseFloat(/^WebGL (\d)/.exec($)[1]),J=st>=1):$.indexOf("OpenGL ES")!==-1&&(st=parseFloat(/^OpenGL ES (\d)/.exec($)[1]),J=st>=2);let ct=null,dt={};const It=n.getParameter(n.SCISSOR_BOX),Wt=n.getParameter(n.VIEWPORT),oe=new me().fromArray(It),j=new me().fromArray(Wt);function at(H,ft,Z,nt){const Mt=new Uint8Array(4),_t=n.createTexture();n.bindTexture(H,_t),n.texParameteri(H,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(H,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Vt=0;Vt<Z;Vt++)H===n.TEXTURE_3D||H===n.TEXTURE_2D_ARRAY?n.texImage3D(ft,0,n.RGBA,1,1,nt,0,n.RGBA,n.UNSIGNED_BYTE,Mt):n.texImage2D(ft+Vt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Mt);return _t}const At={};At[n.TEXTURE_2D]=at(n.TEXTURE_2D,n.TEXTURE_2D,1),At[n.TEXTURE_CUBE_MAP]=at(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),At[n.TEXTURE_2D_ARRAY]=at(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),At[n.TEXTURE_3D]=at(n.TEXTURE_3D,n.TEXTURE_3D,1,1),o.setClear(0,0,0,1),r.setClear(1),a.setClear(0),mt(n.DEPTH_TEST),r.setFunc(os),te(!1),ie(sl),mt(n.CULL_FACE),W(oi);function mt(H){u[H]!==!0&&(n.enable(H),u[H]=!0)}function Ut(H){u[H]!==!1&&(n.disable(H),u[H]=!1)}function kt(H,ft){return d[H]!==ft?(n.bindFramebuffer(H,ft),d[H]=ft,H===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=ft),H===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=ft),!0):!1}function Zt(H,ft){let Z=p,nt=!1;if(H){Z=h.get(ft),Z===void 0&&(Z=[],h.set(ft,Z));const Mt=H.textures;if(Z.length!==Mt.length||Z[0]!==n.COLOR_ATTACHMENT0){for(let _t=0,Vt=Mt.length;_t<Vt;_t++)Z[_t]=n.COLOR_ATTACHMENT0+_t;Z.length=Mt.length,nt=!0}}else Z[0]!==n.BACK&&(Z[0]=n.BACK,nt=!0);nt&&n.drawBuffers(Z)}function ve(H){return f!==H?(n.useProgram(H),f=H,!0):!1}const Qt={[wi]:n.FUNC_ADD,[Au]:n.FUNC_SUBTRACT,[Cu]:n.FUNC_REVERSE_SUBTRACT};Qt[Ru]=n.MIN,Qt[Pu]=n.MAX;const be={[Lu]:n.ZERO,[Iu]:n.ONE,[Du]:n.SRC_COLOR,[Hr]:n.SRC_ALPHA,[Bu]:n.SRC_ALPHA_SATURATE,[Fu]:n.DST_COLOR,[Nu]:n.DST_ALPHA,[Uu]:n.ONE_MINUS_SRC_COLOR,[Vr]:n.ONE_MINUS_SRC_ALPHA,[Ou]:n.ONE_MINUS_DST_COLOR,[zu]:n.ONE_MINUS_DST_ALPHA,[ku]:n.CONSTANT_COLOR,[Gu]:n.ONE_MINUS_CONSTANT_COLOR,[Hu]:n.CONSTANT_ALPHA,[Vu]:n.ONE_MINUS_CONSTANT_ALPHA};function W(H,ft,Z,nt,Mt,_t,Vt,ye,Te,ce){if(H===oi){M===!0&&(Ut(n.BLEND),M=!1);return}if(M===!1&&(mt(n.BLEND),M=!0),H!==Tu){if(H!==g||ce!==y){if((m!==wi||S!==wi)&&(n.blendEquation(n.FUNC_ADD),m=wi,S=wi),ce)switch(H){case Ai:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case nn:n.blendFunc(n.ONE,n.ONE);break;case ol:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case rl:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",H);break}else switch(H){case Ai:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case nn:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case ol:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case rl:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",H);break}x=null,w=null,z=null,P=null,I.set(0,0,0),L=0,g=H,y=ce}return}Mt=Mt||ft,_t=_t||Z,Vt=Vt||nt,(ft!==m||Mt!==S)&&(n.blendEquationSeparate(Qt[ft],Qt[Mt]),m=ft,S=Mt),(Z!==x||nt!==w||_t!==z||Vt!==P)&&(n.blendFuncSeparate(be[Z],be[nt],be[_t],be[Vt]),x=Z,w=nt,z=_t,P=Vt),(ye.equals(I)===!1||Te!==L)&&(n.blendColor(ye.r,ye.g,ye.b,Te),I.copy(ye),L=Te),g=H,y=!1}function Ie(H,ft){H.side===ke?Ut(n.CULL_FACE):mt(n.CULL_FACE);let Z=H.side===$e;ft&&(Z=!Z),te(Z),H.blending===Ai&&H.transparent===!1?W(oi):W(H.blending,H.blendEquation,H.blendSrc,H.blendDst,H.blendEquationAlpha,H.blendSrcAlpha,H.blendDstAlpha,H.blendColor,H.blendAlpha,H.premultipliedAlpha),r.setFunc(H.depthFunc),r.setTest(H.depthTest),r.setMask(H.depthWrite),o.setMask(H.colorWrite);const nt=H.stencilWrite;a.setTest(nt),nt&&(a.setMask(H.stencilWriteMask),a.setFunc(H.stencilFunc,H.stencilRef,H.stencilFuncMask),a.setOp(H.stencilFail,H.stencilZFail,H.stencilZPass)),Me(H.polygonOffset,H.polygonOffsetFactor,H.polygonOffsetUnits),H.alphaToCoverage===!0?mt(n.SAMPLE_ALPHA_TO_COVERAGE):Ut(n.SAMPLE_ALPHA_TO_COVERAGE)}function te(H){_!==H&&(H?n.frontFace(n.CW):n.frontFace(n.CCW),_=H)}function ie(H){H!==bu?(mt(n.CULL_FACE),H!==A&&(H===sl?n.cullFace(n.BACK):H===Eu?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Ut(n.CULL_FACE),A=H}function zt(H){H!==U&&(J&&n.lineWidth(H),U=H)}function Me(H,ft,Z){H?(mt(n.POLYGON_OFFSET_FILL),(O!==ft||K!==Z)&&(n.polygonOffset(ft,Z),O=ft,K=Z)):Ut(n.POLYGON_OFFSET_FILL)}function Nt(H){H?mt(n.SCISSOR_TEST):Ut(n.SCISSOR_TEST)}function R(H){H===void 0&&(H=n.TEXTURE0+tt-1),ct!==H&&(n.activeTexture(H),ct=H)}function E(H,ft,Z){Z===void 0&&(ct===null?Z=n.TEXTURE0+tt-1:Z=ct);let nt=dt[Z];nt===void 0&&(nt={type:void 0,texture:void 0},dt[Z]=nt),(nt.type!==H||nt.texture!==ft)&&(ct!==Z&&(n.activeTexture(Z),ct=Z),n.bindTexture(H,ft||At[H]),nt.type=H,nt.texture=ft)}function Y(){const H=dt[ct];H!==void 0&&H.type!==void 0&&(n.bindTexture(H.type,null),H.type=void 0,H.texture=void 0)}function it(){try{n.compressedTexImage2D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function et(){try{n.compressedTexImage3D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Q(){try{n.texSubImage2D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Dt(){try{n.texSubImage3D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function gt(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function bt(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function se(){try{n.texStorage2D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function lt(){try{n.texStorage3D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function xt(){try{n.texImage2D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Ft(){try{n.texImage3D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Gt(H){oe.equals(H)===!1&&(n.scissor(H.x,H.y,H.z,H.w),oe.copy(H))}function wt(H){j.equals(H)===!1&&(n.viewport(H.x,H.y,H.z,H.w),j.copy(H))}function ee(H,ft){let Z=c.get(ft);Z===void 0&&(Z=new WeakMap,c.set(ft,Z));let nt=Z.get(H);nt===void 0&&(nt=n.getUniformBlockIndex(ft,H.name),Z.set(H,nt))}function Yt(H,ft){const nt=c.get(ft).get(H);l.get(ft)!==nt&&(n.uniformBlockBinding(ft,nt,H.__bindingPointIndex),l.set(ft,nt))}function le(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),r.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},ct=null,dt={},d={},h=new WeakMap,p=[],f=null,M=!1,g=null,m=null,x=null,w=null,S=null,z=null,P=null,I=new Et(0,0,0),L=0,y=!1,_=null,A=null,U=null,O=null,K=null,oe.set(0,0,n.canvas.width,n.canvas.height),j.set(0,0,n.canvas.width,n.canvas.height),o.reset(),r.reset(),a.reset()}return{buffers:{color:o,depth:r,stencil:a},enable:mt,disable:Ut,bindFramebuffer:kt,drawBuffers:Zt,useProgram:ve,setBlending:W,setMaterial:Ie,setFlipSided:te,setCullFace:ie,setLineWidth:zt,setPolygonOffset:Me,setScissorTest:Nt,activeTexture:R,bindTexture:E,unbindTexture:Y,compressedTexImage2D:it,compressedTexImage3D:et,texImage2D:xt,texImage3D:Ft,updateUBOMapping:ee,uniformBlockBinding:Yt,texStorage2D:se,texStorage3D:lt,texSubImage2D:Q,texSubImage3D:Dt,compressedTexSubImage2D:gt,compressedTexSubImage3D:bt,scissor:Gt,viewport:wt,reset:le}}function tc(n,t,e,i){const s=Tm(i);switch(e){case Pc:return n*t;case Ic:return n*t;case Dc:return n*t*2;case Uc:return n*t/s.components*s.byteLength;case za:return n*t/s.components*s.byteLength;case Nc:return n*t*2/s.components*s.byteLength;case Fa:return n*t*2/s.components*s.byteLength;case Lc:return n*t*3/s.components*s.byteLength;case _n:return n*t*4/s.components*s.byteLength;case Oa:return n*t*4/s.components*s.byteLength;case Eo:case To:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Ao:case Co:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case ea:case ia:return Math.max(n,16)*Math.max(t,8)/4;case ta:case na:return Math.max(n,8)*Math.max(t,8)/2;case sa:case oa:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case ra:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case aa:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case la:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case ca:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case ua:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case da:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case ha:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case fa:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case pa:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case ma:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case ga:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case _a:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case va:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case Ma:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case ya:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case Ro:case Sa:case xa:return Math.ceil(n/4)*Math.ceil(t/4)*16;case zc:case wa:return Math.ceil(n/4)*Math.ceil(t/4)*8;case ba:case Ea:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Tm(n){switch(n){case Vn:case Ac:return{byteLength:1,components:1};case Bs:case Cc:case Gs:return{byteLength:2,components:1};case Ua:case Na:return{byteLength:2,components:4};case Ci:case Da:case Fn:return{byteLength:4,components:1};case Rc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function Am(n,t,e,i,s,o,r){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Tt,u=new WeakMap;let d;const h=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function f(R,E){return p?new OffscreenCanvas(R,E):Uo("canvas")}function M(R,E,Y){let it=1;const et=Nt(R);if((et.width>Y||et.height>Y)&&(it=Y/Math.max(et.width,et.height)),it<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const Q=Math.floor(it*et.width),Dt=Math.floor(it*et.height);d===void 0&&(d=f(Q,Dt));const gt=E?f(Q,Dt):d;return gt.width=Q,gt.height=Dt,gt.getContext("2d").drawImage(R,0,0,Q,Dt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+et.width+"x"+et.height+") to ("+Q+"x"+Dt+")."),gt}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+et.width+"x"+et.height+")."),R;return R}function g(R){return R.generateMipmaps}function m(R){n.generateMipmap(R)}function x(R){return R.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?n.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function w(R,E,Y,it,et=!1){if(R!==null){if(n[R]!==void 0)return n[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let Q=E;if(E===n.RED&&(Y===n.FLOAT&&(Q=n.R32F),Y===n.HALF_FLOAT&&(Q=n.R16F),Y===n.UNSIGNED_BYTE&&(Q=n.R8)),E===n.RED_INTEGER&&(Y===n.UNSIGNED_BYTE&&(Q=n.R8UI),Y===n.UNSIGNED_SHORT&&(Q=n.R16UI),Y===n.UNSIGNED_INT&&(Q=n.R32UI),Y===n.BYTE&&(Q=n.R8I),Y===n.SHORT&&(Q=n.R16I),Y===n.INT&&(Q=n.R32I)),E===n.RG&&(Y===n.FLOAT&&(Q=n.RG32F),Y===n.HALF_FLOAT&&(Q=n.RG16F),Y===n.UNSIGNED_BYTE&&(Q=n.RG8)),E===n.RG_INTEGER&&(Y===n.UNSIGNED_BYTE&&(Q=n.RG8UI),Y===n.UNSIGNED_SHORT&&(Q=n.RG16UI),Y===n.UNSIGNED_INT&&(Q=n.RG32UI),Y===n.BYTE&&(Q=n.RG8I),Y===n.SHORT&&(Q=n.RG16I),Y===n.INT&&(Q=n.RG32I)),E===n.RGB_INTEGER&&(Y===n.UNSIGNED_BYTE&&(Q=n.RGB8UI),Y===n.UNSIGNED_SHORT&&(Q=n.RGB16UI),Y===n.UNSIGNED_INT&&(Q=n.RGB32UI),Y===n.BYTE&&(Q=n.RGB8I),Y===n.SHORT&&(Q=n.RGB16I),Y===n.INT&&(Q=n.RGB32I)),E===n.RGBA_INTEGER&&(Y===n.UNSIGNED_BYTE&&(Q=n.RGBA8UI),Y===n.UNSIGNED_SHORT&&(Q=n.RGBA16UI),Y===n.UNSIGNED_INT&&(Q=n.RGBA32UI),Y===n.BYTE&&(Q=n.RGBA8I),Y===n.SHORT&&(Q=n.RGBA16I),Y===n.INT&&(Q=n.RGBA32I)),E===n.RGB&&Y===n.UNSIGNED_INT_5_9_9_9_REV&&(Q=n.RGB9_E5),E===n.RGBA){const Dt=et?Xo:re.getTransfer(it);Y===n.FLOAT&&(Q=n.RGBA32F),Y===n.HALF_FLOAT&&(Q=n.RGBA16F),Y===n.UNSIGNED_BYTE&&(Q=Dt===pe?n.SRGB8_ALPHA8:n.RGBA8),Y===n.UNSIGNED_SHORT_4_4_4_4&&(Q=n.RGBA4),Y===n.UNSIGNED_SHORT_5_5_5_1&&(Q=n.RGB5_A1)}return(Q===n.R16F||Q===n.R32F||Q===n.RG16F||Q===n.RG32F||Q===n.RGBA16F||Q===n.RGBA32F)&&t.get("EXT_color_buffer_float"),Q}function S(R,E){let Y;return R?E===null||E===Ci||E===ls?Y=n.DEPTH24_STENCIL8:E===Fn?Y=n.DEPTH32F_STENCIL8:E===Bs&&(Y=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===Ci||E===ls?Y=n.DEPTH_COMPONENT24:E===Fn?Y=n.DEPTH_COMPONENT32F:E===Bs&&(Y=n.DEPTH_COMPONENT16),Y}function z(R,E){return g(R)===!0||R.isFramebufferTexture&&R.minFilter!==vn&&R.minFilter!==En?Math.log2(Math.max(E.width,E.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?E.mipmaps.length:1}function P(R){const E=R.target;E.removeEventListener("dispose",P),L(E),E.isVideoTexture&&u.delete(E)}function I(R){const E=R.target;E.removeEventListener("dispose",I),_(E)}function L(R){const E=i.get(R);if(E.__webglInit===void 0)return;const Y=R.source,it=h.get(Y);if(it){const et=it[E.__cacheKey];et.usedTimes--,et.usedTimes===0&&y(R),Object.keys(it).length===0&&h.delete(Y)}i.remove(R)}function y(R){const E=i.get(R);n.deleteTexture(E.__webglTexture);const Y=R.source,it=h.get(Y);delete it[E.__cacheKey],r.memory.textures--}function _(R){const E=i.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),i.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let it=0;it<6;it++){if(Array.isArray(E.__webglFramebuffer[it]))for(let et=0;et<E.__webglFramebuffer[it].length;et++)n.deleteFramebuffer(E.__webglFramebuffer[it][et]);else n.deleteFramebuffer(E.__webglFramebuffer[it]);E.__webglDepthbuffer&&n.deleteRenderbuffer(E.__webglDepthbuffer[it])}else{if(Array.isArray(E.__webglFramebuffer))for(let it=0;it<E.__webglFramebuffer.length;it++)n.deleteFramebuffer(E.__webglFramebuffer[it]);else n.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&n.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&n.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let it=0;it<E.__webglColorRenderbuffer.length;it++)E.__webglColorRenderbuffer[it]&&n.deleteRenderbuffer(E.__webglColorRenderbuffer[it]);E.__webglDepthRenderbuffer&&n.deleteRenderbuffer(E.__webglDepthRenderbuffer)}const Y=R.textures;for(let it=0,et=Y.length;it<et;it++){const Q=i.get(Y[it]);Q.__webglTexture&&(n.deleteTexture(Q.__webglTexture),r.memory.textures--),i.remove(Y[it])}i.remove(R)}let A=0;function U(){A=0}function O(){const R=A;return R>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+s.maxTextures),A+=1,R}function K(R){const E=[];return E.push(R.wrapS),E.push(R.wrapT),E.push(R.wrapR||0),E.push(R.magFilter),E.push(R.minFilter),E.push(R.anisotropy),E.push(R.internalFormat),E.push(R.format),E.push(R.type),E.push(R.generateMipmaps),E.push(R.premultiplyAlpha),E.push(R.flipY),E.push(R.unpackAlignment),E.push(R.colorSpace),E.join()}function tt(R,E){const Y=i.get(R);if(R.isVideoTexture&&zt(R),R.isRenderTargetTexture===!1&&R.version>0&&Y.__version!==R.version){const it=R.image;if(it===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(it.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{j(Y,R,E);return}}e.bindTexture(n.TEXTURE_2D,Y.__webglTexture,n.TEXTURE0+E)}function J(R,E){const Y=i.get(R);if(R.version>0&&Y.__version!==R.version){j(Y,R,E);return}e.bindTexture(n.TEXTURE_2D_ARRAY,Y.__webglTexture,n.TEXTURE0+E)}function st(R,E){const Y=i.get(R);if(R.version>0&&Y.__version!==R.version){j(Y,R,E);return}e.bindTexture(n.TEXTURE_3D,Y.__webglTexture,n.TEXTURE0+E)}function $(R,E){const Y=i.get(R);if(R.version>0&&Y.__version!==R.version){at(Y,R,E);return}e.bindTexture(n.TEXTURE_CUBE_MAP,Y.__webglTexture,n.TEXTURE0+E)}const ct={[li]:n.REPEAT,[Ei]:n.CLAMP_TO_EDGE,[Qr]:n.MIRRORED_REPEAT},dt={[vn]:n.NEAREST,[ju]:n.NEAREST_MIPMAP_NEAREST,[$s]:n.NEAREST_MIPMAP_LINEAR,[En]:n.LINEAR,[jo]:n.LINEAR_MIPMAP_NEAREST,[Ti]:n.LINEAR_MIPMAP_LINEAR},It={[nd]:n.NEVER,[ld]:n.ALWAYS,[id]:n.LESS,[Fc]:n.LEQUAL,[sd]:n.EQUAL,[ad]:n.GEQUAL,[od]:n.GREATER,[rd]:n.NOTEQUAL};function Wt(R,E){if(E.type===Fn&&t.has("OES_texture_float_linear")===!1&&(E.magFilter===En||E.magFilter===jo||E.magFilter===$s||E.magFilter===Ti||E.minFilter===En||E.minFilter===jo||E.minFilter===$s||E.minFilter===Ti)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(R,n.TEXTURE_WRAP_S,ct[E.wrapS]),n.texParameteri(R,n.TEXTURE_WRAP_T,ct[E.wrapT]),(R===n.TEXTURE_3D||R===n.TEXTURE_2D_ARRAY)&&n.texParameteri(R,n.TEXTURE_WRAP_R,ct[E.wrapR]),n.texParameteri(R,n.TEXTURE_MAG_FILTER,dt[E.magFilter]),n.texParameteri(R,n.TEXTURE_MIN_FILTER,dt[E.minFilter]),E.compareFunction&&(n.texParameteri(R,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(R,n.TEXTURE_COMPARE_FUNC,It[E.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===vn||E.minFilter!==$s&&E.minFilter!==Ti||E.type===Fn&&t.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||i.get(E).__currentAnisotropy){const Y=t.get("EXT_texture_filter_anisotropic");n.texParameterf(R,Y.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,s.getMaxAnisotropy())),i.get(E).__currentAnisotropy=E.anisotropy}}}function oe(R,E){let Y=!1;R.__webglInit===void 0&&(R.__webglInit=!0,E.addEventListener("dispose",P));const it=E.source;let et=h.get(it);et===void 0&&(et={},h.set(it,et));const Q=K(E);if(Q!==R.__cacheKey){et[Q]===void 0&&(et[Q]={texture:n.createTexture(),usedTimes:0},r.memory.textures++,Y=!0),et[Q].usedTimes++;const Dt=et[R.__cacheKey];Dt!==void 0&&(et[R.__cacheKey].usedTimes--,Dt.usedTimes===0&&y(E)),R.__cacheKey=Q,R.__webglTexture=et[Q].texture}return Y}function j(R,E,Y){let it=n.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(it=n.TEXTURE_2D_ARRAY),E.isData3DTexture&&(it=n.TEXTURE_3D);const et=oe(R,E),Q=E.source;e.bindTexture(it,R.__webglTexture,n.TEXTURE0+Y);const Dt=i.get(Q);if(Q.version!==Dt.__version||et===!0){e.activeTexture(n.TEXTURE0+Y);const gt=re.getPrimaries(re.workingColorSpace),bt=E.colorSpace===ni?null:re.getPrimaries(E.colorSpace),se=E.colorSpace===ni||gt===bt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,E.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,E.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,se);let lt=M(E.image,!1,s.maxTextureSize);lt=Me(E,lt);const xt=o.convert(E.format,E.colorSpace),Ft=o.convert(E.type);let Gt=w(E.internalFormat,xt,Ft,E.colorSpace,E.isVideoTexture);Wt(it,E);let wt;const ee=E.mipmaps,Yt=E.isVideoTexture!==!0,le=Dt.__version===void 0||et===!0,H=Q.dataReady,ft=z(E,lt);if(E.isDepthTexture)Gt=S(E.format===cs,E.type),le&&(Yt?e.texStorage2D(n.TEXTURE_2D,1,Gt,lt.width,lt.height):e.texImage2D(n.TEXTURE_2D,0,Gt,lt.width,lt.height,0,xt,Ft,null));else if(E.isDataTexture)if(ee.length>0){Yt&&le&&e.texStorage2D(n.TEXTURE_2D,ft,Gt,ee[0].width,ee[0].height);for(let Z=0,nt=ee.length;Z<nt;Z++)wt=ee[Z],Yt?H&&e.texSubImage2D(n.TEXTURE_2D,Z,0,0,wt.width,wt.height,xt,Ft,wt.data):e.texImage2D(n.TEXTURE_2D,Z,Gt,wt.width,wt.height,0,xt,Ft,wt.data);E.generateMipmaps=!1}else Yt?(le&&e.texStorage2D(n.TEXTURE_2D,ft,Gt,lt.width,lt.height),H&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,lt.width,lt.height,xt,Ft,lt.data)):e.texImage2D(n.TEXTURE_2D,0,Gt,lt.width,lt.height,0,xt,Ft,lt.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){Yt&&le&&e.texStorage3D(n.TEXTURE_2D_ARRAY,ft,Gt,ee[0].width,ee[0].height,lt.depth);for(let Z=0,nt=ee.length;Z<nt;Z++)if(wt=ee[Z],E.format!==_n)if(xt!==null)if(Yt){if(H)if(E.layerUpdates.size>0){const Mt=tc(wt.width,wt.height,E.format,E.type);for(const _t of E.layerUpdates){const Vt=wt.data.subarray(_t*Mt/wt.data.BYTES_PER_ELEMENT,(_t+1)*Mt/wt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,Z,0,0,_t,wt.width,wt.height,1,xt,Vt)}E.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,Z,0,0,0,wt.width,wt.height,lt.depth,xt,wt.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,Z,Gt,wt.width,wt.height,lt.depth,0,wt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Yt?H&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,Z,0,0,0,wt.width,wt.height,lt.depth,xt,Ft,wt.data):e.texImage3D(n.TEXTURE_2D_ARRAY,Z,Gt,wt.width,wt.height,lt.depth,0,xt,Ft,wt.data)}else{Yt&&le&&e.texStorage2D(n.TEXTURE_2D,ft,Gt,ee[0].width,ee[0].height);for(let Z=0,nt=ee.length;Z<nt;Z++)wt=ee[Z],E.format!==_n?xt!==null?Yt?H&&e.compressedTexSubImage2D(n.TEXTURE_2D,Z,0,0,wt.width,wt.height,xt,wt.data):e.compressedTexImage2D(n.TEXTURE_2D,Z,Gt,wt.width,wt.height,0,wt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Yt?H&&e.texSubImage2D(n.TEXTURE_2D,Z,0,0,wt.width,wt.height,xt,Ft,wt.data):e.texImage2D(n.TEXTURE_2D,Z,Gt,wt.width,wt.height,0,xt,Ft,wt.data)}else if(E.isDataArrayTexture)if(Yt){if(le&&e.texStorage3D(n.TEXTURE_2D_ARRAY,ft,Gt,lt.width,lt.height,lt.depth),H)if(E.layerUpdates.size>0){const Z=tc(lt.width,lt.height,E.format,E.type);for(const nt of E.layerUpdates){const Mt=lt.data.subarray(nt*Z/lt.data.BYTES_PER_ELEMENT,(nt+1)*Z/lt.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,nt,lt.width,lt.height,1,xt,Ft,Mt)}E.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,lt.width,lt.height,lt.depth,xt,Ft,lt.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,Gt,lt.width,lt.height,lt.depth,0,xt,Ft,lt.data);else if(E.isData3DTexture)Yt?(le&&e.texStorage3D(n.TEXTURE_3D,ft,Gt,lt.width,lt.height,lt.depth),H&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,lt.width,lt.height,lt.depth,xt,Ft,lt.data)):e.texImage3D(n.TEXTURE_3D,0,Gt,lt.width,lt.height,lt.depth,0,xt,Ft,lt.data);else if(E.isFramebufferTexture){if(le)if(Yt)e.texStorage2D(n.TEXTURE_2D,ft,Gt,lt.width,lt.height);else{let Z=lt.width,nt=lt.height;for(let Mt=0;Mt<ft;Mt++)e.texImage2D(n.TEXTURE_2D,Mt,Gt,Z,nt,0,xt,Ft,null),Z>>=1,nt>>=1}}else if(ee.length>0){if(Yt&&le){const Z=Nt(ee[0]);e.texStorage2D(n.TEXTURE_2D,ft,Gt,Z.width,Z.height)}for(let Z=0,nt=ee.length;Z<nt;Z++)wt=ee[Z],Yt?H&&e.texSubImage2D(n.TEXTURE_2D,Z,0,0,xt,Ft,wt):e.texImage2D(n.TEXTURE_2D,Z,Gt,xt,Ft,wt);E.generateMipmaps=!1}else if(Yt){if(le){const Z=Nt(lt);e.texStorage2D(n.TEXTURE_2D,ft,Gt,Z.width,Z.height)}H&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,xt,Ft,lt)}else e.texImage2D(n.TEXTURE_2D,0,Gt,xt,Ft,lt);g(E)&&m(it),Dt.__version=Q.version,E.onUpdate&&E.onUpdate(E)}R.__version=E.version}function at(R,E,Y){if(E.image.length!==6)return;const it=oe(R,E),et=E.source;e.bindTexture(n.TEXTURE_CUBE_MAP,R.__webglTexture,n.TEXTURE0+Y);const Q=i.get(et);if(et.version!==Q.__version||it===!0){e.activeTexture(n.TEXTURE0+Y);const Dt=re.getPrimaries(re.workingColorSpace),gt=E.colorSpace===ni?null:re.getPrimaries(E.colorSpace),bt=E.colorSpace===ni||Dt===gt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,E.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,E.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,bt);const se=E.isCompressedTexture||E.image[0].isCompressedTexture,lt=E.image[0]&&E.image[0].isDataTexture,xt=[];for(let nt=0;nt<6;nt++)!se&&!lt?xt[nt]=M(E.image[nt],!0,s.maxCubemapSize):xt[nt]=lt?E.image[nt].image:E.image[nt],xt[nt]=Me(E,xt[nt]);const Ft=xt[0],Gt=o.convert(E.format,E.colorSpace),wt=o.convert(E.type),ee=w(E.internalFormat,Gt,wt,E.colorSpace),Yt=E.isVideoTexture!==!0,le=Q.__version===void 0||it===!0,H=et.dataReady;let ft=z(E,Ft);Wt(n.TEXTURE_CUBE_MAP,E);let Z;if(se){Yt&&le&&e.texStorage2D(n.TEXTURE_CUBE_MAP,ft,ee,Ft.width,Ft.height);for(let nt=0;nt<6;nt++){Z=xt[nt].mipmaps;for(let Mt=0;Mt<Z.length;Mt++){const _t=Z[Mt];E.format!==_n?Gt!==null?Yt?H&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Mt,0,0,_t.width,_t.height,Gt,_t.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Mt,ee,_t.width,_t.height,0,_t.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Yt?H&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Mt,0,0,_t.width,_t.height,Gt,wt,_t.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Mt,ee,_t.width,_t.height,0,Gt,wt,_t.data)}}}else{if(Z=E.mipmaps,Yt&&le){Z.length>0&&ft++;const nt=Nt(xt[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,ft,ee,nt.width,nt.height)}for(let nt=0;nt<6;nt++)if(lt){Yt?H&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,0,0,xt[nt].width,xt[nt].height,Gt,wt,xt[nt].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,ee,xt[nt].width,xt[nt].height,0,Gt,wt,xt[nt].data);for(let Mt=0;Mt<Z.length;Mt++){const Vt=Z[Mt].image[nt].image;Yt?H&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Mt+1,0,0,Vt.width,Vt.height,Gt,wt,Vt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Mt+1,ee,Vt.width,Vt.height,0,Gt,wt,Vt.data)}}else{Yt?H&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,0,0,Gt,wt,xt[nt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,ee,Gt,wt,xt[nt]);for(let Mt=0;Mt<Z.length;Mt++){const _t=Z[Mt];Yt?H&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Mt+1,0,0,Gt,wt,_t.image[nt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Mt+1,ee,Gt,wt,_t.image[nt])}}}g(E)&&m(n.TEXTURE_CUBE_MAP),Q.__version=et.version,E.onUpdate&&E.onUpdate(E)}R.__version=E.version}function At(R,E,Y,it,et,Q){const Dt=o.convert(Y.format,Y.colorSpace),gt=o.convert(Y.type),bt=w(Y.internalFormat,Dt,gt,Y.colorSpace),se=i.get(E),lt=i.get(Y);if(lt.__renderTarget=E,!se.__hasExternalTextures){const xt=Math.max(1,E.width>>Q),Ft=Math.max(1,E.height>>Q);et===n.TEXTURE_3D||et===n.TEXTURE_2D_ARRAY?e.texImage3D(et,Q,bt,xt,Ft,E.depth,0,Dt,gt,null):e.texImage2D(et,Q,bt,xt,Ft,0,Dt,gt,null)}e.bindFramebuffer(n.FRAMEBUFFER,R),ie(E)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,it,et,lt.__webglTexture,0,te(E)):(et===n.TEXTURE_2D||et>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&et<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,it,et,lt.__webglTexture,Q),e.bindFramebuffer(n.FRAMEBUFFER,null)}function mt(R,E,Y){if(n.bindRenderbuffer(n.RENDERBUFFER,R),E.depthBuffer){const it=E.depthTexture,et=it&&it.isDepthTexture?it.type:null,Q=S(E.stencilBuffer,et),Dt=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,gt=te(E);ie(E)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,gt,Q,E.width,E.height):Y?n.renderbufferStorageMultisample(n.RENDERBUFFER,gt,Q,E.width,E.height):n.renderbufferStorage(n.RENDERBUFFER,Q,E.width,E.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Dt,n.RENDERBUFFER,R)}else{const it=E.textures;for(let et=0;et<it.length;et++){const Q=it[et],Dt=o.convert(Q.format,Q.colorSpace),gt=o.convert(Q.type),bt=w(Q.internalFormat,Dt,gt,Q.colorSpace),se=te(E);Y&&ie(E)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,se,bt,E.width,E.height):ie(E)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,se,bt,E.width,E.height):n.renderbufferStorage(n.RENDERBUFFER,bt,E.width,E.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Ut(R,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,R),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const it=i.get(E.depthTexture);it.__renderTarget=E,(!it.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),tt(E.depthTexture,0);const et=it.__webglTexture,Q=te(E);if(E.depthTexture.format===es)ie(E)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,et,0,Q):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,et,0);else if(E.depthTexture.format===cs)ie(E)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,et,0,Q):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,et,0);else throw new Error("Unknown depthTexture format")}function kt(R){const E=i.get(R),Y=R.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==R.depthTexture){const it=R.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),it){const et=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,it.removeEventListener("dispose",et)};it.addEventListener("dispose",et),E.__depthDisposeCallback=et}E.__boundDepthTexture=it}if(R.depthTexture&&!E.__autoAllocateDepthBuffer){if(Y)throw new Error("target.depthTexture not supported in Cube render targets");Ut(E.__webglFramebuffer,R)}else if(Y){E.__webglDepthbuffer=[];for(let it=0;it<6;it++)if(e.bindFramebuffer(n.FRAMEBUFFER,E.__webglFramebuffer[it]),E.__webglDepthbuffer[it]===void 0)E.__webglDepthbuffer[it]=n.createRenderbuffer(),mt(E.__webglDepthbuffer[it],R,!1);else{const et=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Q=E.__webglDepthbuffer[it];n.bindRenderbuffer(n.RENDERBUFFER,Q),n.framebufferRenderbuffer(n.FRAMEBUFFER,et,n.RENDERBUFFER,Q)}}else if(e.bindFramebuffer(n.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=n.createRenderbuffer(),mt(E.__webglDepthbuffer,R,!1);else{const it=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,et=E.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,et),n.framebufferRenderbuffer(n.FRAMEBUFFER,it,n.RENDERBUFFER,et)}e.bindFramebuffer(n.FRAMEBUFFER,null)}function Zt(R,E,Y){const it=i.get(R);E!==void 0&&At(it.__webglFramebuffer,R,R.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),Y!==void 0&&kt(R)}function ve(R){const E=R.texture,Y=i.get(R),it=i.get(E);R.addEventListener("dispose",I);const et=R.textures,Q=R.isWebGLCubeRenderTarget===!0,Dt=et.length>1;if(Dt||(it.__webglTexture===void 0&&(it.__webglTexture=n.createTexture()),it.__version=E.version,r.memory.textures++),Q){Y.__webglFramebuffer=[];for(let gt=0;gt<6;gt++)if(E.mipmaps&&E.mipmaps.length>0){Y.__webglFramebuffer[gt]=[];for(let bt=0;bt<E.mipmaps.length;bt++)Y.__webglFramebuffer[gt][bt]=n.createFramebuffer()}else Y.__webglFramebuffer[gt]=n.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){Y.__webglFramebuffer=[];for(let gt=0;gt<E.mipmaps.length;gt++)Y.__webglFramebuffer[gt]=n.createFramebuffer()}else Y.__webglFramebuffer=n.createFramebuffer();if(Dt)for(let gt=0,bt=et.length;gt<bt;gt++){const se=i.get(et[gt]);se.__webglTexture===void 0&&(se.__webglTexture=n.createTexture(),r.memory.textures++)}if(R.samples>0&&ie(R)===!1){Y.__webglMultisampledFramebuffer=n.createFramebuffer(),Y.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,Y.__webglMultisampledFramebuffer);for(let gt=0;gt<et.length;gt++){const bt=et[gt];Y.__webglColorRenderbuffer[gt]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,Y.__webglColorRenderbuffer[gt]);const se=o.convert(bt.format,bt.colorSpace),lt=o.convert(bt.type),xt=w(bt.internalFormat,se,lt,bt.colorSpace,R.isXRRenderTarget===!0),Ft=te(R);n.renderbufferStorageMultisample(n.RENDERBUFFER,Ft,xt,R.width,R.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+gt,n.RENDERBUFFER,Y.__webglColorRenderbuffer[gt])}n.bindRenderbuffer(n.RENDERBUFFER,null),R.depthBuffer&&(Y.__webglDepthRenderbuffer=n.createRenderbuffer(),mt(Y.__webglDepthRenderbuffer,R,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(Q){e.bindTexture(n.TEXTURE_CUBE_MAP,it.__webglTexture),Wt(n.TEXTURE_CUBE_MAP,E);for(let gt=0;gt<6;gt++)if(E.mipmaps&&E.mipmaps.length>0)for(let bt=0;bt<E.mipmaps.length;bt++)At(Y.__webglFramebuffer[gt][bt],R,E,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+gt,bt);else At(Y.__webglFramebuffer[gt],R,E,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0);g(E)&&m(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Dt){for(let gt=0,bt=et.length;gt<bt;gt++){const se=et[gt],lt=i.get(se);e.bindTexture(n.TEXTURE_2D,lt.__webglTexture),Wt(n.TEXTURE_2D,se),At(Y.__webglFramebuffer,R,se,n.COLOR_ATTACHMENT0+gt,n.TEXTURE_2D,0),g(se)&&m(n.TEXTURE_2D)}e.unbindTexture()}else{let gt=n.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(gt=R.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(gt,it.__webglTexture),Wt(gt,E),E.mipmaps&&E.mipmaps.length>0)for(let bt=0;bt<E.mipmaps.length;bt++)At(Y.__webglFramebuffer[bt],R,E,n.COLOR_ATTACHMENT0,gt,bt);else At(Y.__webglFramebuffer,R,E,n.COLOR_ATTACHMENT0,gt,0);g(E)&&m(gt),e.unbindTexture()}R.depthBuffer&&kt(R)}function Qt(R){const E=R.textures;for(let Y=0,it=E.length;Y<it;Y++){const et=E[Y];if(g(et)){const Q=x(R),Dt=i.get(et).__webglTexture;e.bindTexture(Q,Dt),m(Q),e.unbindTexture()}}}const be=[],W=[];function Ie(R){if(R.samples>0){if(ie(R)===!1){const E=R.textures,Y=R.width,it=R.height;let et=n.COLOR_BUFFER_BIT;const Q=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Dt=i.get(R),gt=E.length>1;if(gt)for(let bt=0;bt<E.length;bt++)e.bindFramebuffer(n.FRAMEBUFFER,Dt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+bt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,Dt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+bt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,Dt.__webglMultisampledFramebuffer),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,Dt.__webglFramebuffer);for(let bt=0;bt<E.length;bt++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(et|=n.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(et|=n.STENCIL_BUFFER_BIT)),gt){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Dt.__webglColorRenderbuffer[bt]);const se=i.get(E[bt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,se,0)}n.blitFramebuffer(0,0,Y,it,0,0,Y,it,et,n.NEAREST),l===!0&&(be.length=0,W.length=0,be.push(n.COLOR_ATTACHMENT0+bt),R.depthBuffer&&R.resolveDepthBuffer===!1&&(be.push(Q),W.push(Q),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,W)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,be))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),gt)for(let bt=0;bt<E.length;bt++){e.bindFramebuffer(n.FRAMEBUFFER,Dt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+bt,n.RENDERBUFFER,Dt.__webglColorRenderbuffer[bt]);const se=i.get(E[bt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,Dt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+bt,n.TEXTURE_2D,se,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,Dt.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&l){const E=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[E])}}}function te(R){return Math.min(s.maxSamples,R.samples)}function ie(R){const E=i.get(R);return R.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function zt(R){const E=r.render.frame;u.get(R)!==E&&(u.set(R,E),R.update())}function Me(R,E){const Y=R.colorSpace,it=R.format,et=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||Y!==hs&&Y!==ni&&(re.getTransfer(Y)===pe?(it!==_n||et!==Vn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",Y)),E}function Nt(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=O,this.resetTextureUnits=U,this.setTexture2D=tt,this.setTexture2DArray=J,this.setTexture3D=st,this.setTextureCube=$,this.rebindTextures=Zt,this.setupRenderTarget=ve,this.updateRenderTargetMipmap=Qt,this.updateMultisampleRenderTarget=Ie,this.setupDepthRenderbuffer=kt,this.setupFrameBufferTexture=At,this.useMultisampledRTT=ie}function Cm(n,t){function e(i,s=ni){let o;const r=re.getTransfer(s);if(i===Vn)return n.UNSIGNED_BYTE;if(i===Ua)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Na)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Rc)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Ac)return n.BYTE;if(i===Cc)return n.SHORT;if(i===Bs)return n.UNSIGNED_SHORT;if(i===Da)return n.INT;if(i===Ci)return n.UNSIGNED_INT;if(i===Fn)return n.FLOAT;if(i===Gs)return n.HALF_FLOAT;if(i===Pc)return n.ALPHA;if(i===Lc)return n.RGB;if(i===_n)return n.RGBA;if(i===Ic)return n.LUMINANCE;if(i===Dc)return n.LUMINANCE_ALPHA;if(i===es)return n.DEPTH_COMPONENT;if(i===cs)return n.DEPTH_STENCIL;if(i===Uc)return n.RED;if(i===za)return n.RED_INTEGER;if(i===Nc)return n.RG;if(i===Fa)return n.RG_INTEGER;if(i===Oa)return n.RGBA_INTEGER;if(i===Eo||i===To||i===Ao||i===Co)if(r===pe)if(o=t.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(i===Eo)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===To)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Ao)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Co)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=t.get("WEBGL_compressed_texture_s3tc"),o!==null){if(i===Eo)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===To)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Ao)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Co)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===ta||i===ea||i===na||i===ia)if(o=t.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(i===ta)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===ea)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===na)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===ia)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===sa||i===oa||i===ra)if(o=t.get("WEBGL_compressed_texture_etc"),o!==null){if(i===sa||i===oa)return r===pe?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(i===ra)return r===pe?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===aa||i===la||i===ca||i===ua||i===da||i===ha||i===fa||i===pa||i===ma||i===ga||i===_a||i===va||i===Ma||i===ya)if(o=t.get("WEBGL_compressed_texture_astc"),o!==null){if(i===aa)return r===pe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===la)return r===pe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===ca)return r===pe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===ua)return r===pe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===da)return r===pe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===ha)return r===pe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===fa)return r===pe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===pa)return r===pe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===ma)return r===pe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===ga)return r===pe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===_a)return r===pe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===va)return r===pe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Ma)return r===pe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===ya)return r===pe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Ro||i===Sa||i===xa)if(o=t.get("EXT_texture_compression_bptc"),o!==null){if(i===Ro)return r===pe?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Sa)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===xa)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===zc||i===wa||i===ba||i===Ea)if(o=t.get("EXT_texture_compression_rgtc"),o!==null){if(i===Ro)return o.COMPRESSED_RED_RGTC1_EXT;if(i===wa)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===ba)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Ea)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===ls?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}class Rm extends Se{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class yt extends Pe{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Pm={type:"move"};class Er{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new yt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new yt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new b,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new b),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new yt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new b,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new b),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,o=null,r=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){r=!0;for(const M of t.hand.values()){const g=e.getJointPose(M,i),m=this._getHandJoint(c,M);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],h=u.position.distanceTo(d.position),p=.02,f=.005;c.inputState.pinching&&h>p+f?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&h<=p-f&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(o=e.getPose(t.gripSpace,i),o!==null&&(l.matrix.fromArray(o.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,o.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(o.linearVelocity)):l.hasLinearVelocity=!1,o.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(o.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&o!==null&&(s=o),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Pm)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=o!==null),c!==null&&(c.visible=r!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new yt;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}const Lm=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Im=`
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

}`;class Dm{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){const s=new je,o=t.properties.get(s);o.__webglTexture=e.texture,(e.depthNear!=i.depthNear||e.depthFar!=i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new Wn({vertexShader:Lm,fragmentShader:Im,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new C(new qt(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Um extends fs{constructor(t,e){super();const i=this;let s=null,o=1,r=null,a="local-floor",l=1,c=null,u=null,d=null,h=null,p=null,f=null;const M=new Dm,g=e.getContextAttributes();let m=null,x=null;const w=[],S=[],z=new Tt;let P=null;const I=new Se;I.viewport=new me;const L=new Se;L.viewport=new me;const y=[I,L],_=new Rm;let A=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let at=w[j];return at===void 0&&(at=new Er,w[j]=at),at.getTargetRaySpace()},this.getControllerGrip=function(j){let at=w[j];return at===void 0&&(at=new Er,w[j]=at),at.getGripSpace()},this.getHand=function(j){let at=w[j];return at===void 0&&(at=new Er,w[j]=at),at.getHandSpace()};function O(j){const at=S.indexOf(j.inputSource);if(at===-1)return;const At=w[at];At!==void 0&&(At.update(j.inputSource,j.frame,c||r),At.dispatchEvent({type:j.type,data:j.inputSource}))}function K(){s.removeEventListener("select",O),s.removeEventListener("selectstart",O),s.removeEventListener("selectend",O),s.removeEventListener("squeeze",O),s.removeEventListener("squeezestart",O),s.removeEventListener("squeezeend",O),s.removeEventListener("end",K),s.removeEventListener("inputsourceschange",tt);for(let j=0;j<w.length;j++){const at=S[j];at!==null&&(S[j]=null,w[j].disconnect(at))}A=null,U=null,M.reset(),t.setRenderTarget(m),p=null,h=null,d=null,s=null,x=null,oe.stop(),i.isPresenting=!1,t.setPixelRatio(P),t.setSize(z.width,z.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){o=j,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){a=j,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||r},this.setReferenceSpace=function(j){c=j},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return d},this.getFrame=function(){return f},this.getSession=function(){return s},this.setSession=async function(j){if(s=j,s!==null){if(m=t.getRenderTarget(),s.addEventListener("select",O),s.addEventListener("selectstart",O),s.addEventListener("selectend",O),s.addEventListener("squeeze",O),s.addEventListener("squeezestart",O),s.addEventListener("squeezeend",O),s.addEventListener("end",K),s.addEventListener("inputsourceschange",tt),g.xrCompatible!==!0&&await e.makeXRCompatible(),P=t.getPixelRatio(),t.getSize(z),s.renderState.layers===void 0){const at={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:o};p=new XRWebGLLayer(s,e,at),s.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),x=new Ri(p.framebufferWidth,p.framebufferHeight,{format:_n,type:Vn,colorSpace:t.outputColorSpace,stencilBuffer:g.stencil})}else{let at=null,At=null,mt=null;g.depth&&(mt=g.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,at=g.stencil?cs:es,At=g.stencil?ls:Ci);const Ut={colorFormat:e.RGBA8,depthFormat:mt,scaleFactor:o};d=new XRWebGLBinding(s,e),h=d.createProjectionLayer(Ut),s.updateRenderState({layers:[h]}),t.setPixelRatio(1),t.setSize(h.textureWidth,h.textureHeight,!1),x=new Ri(h.textureWidth,h.textureHeight,{format:_n,type:Vn,depthTexture:new Zc(h.textureWidth,h.textureHeight,At,void 0,void 0,void 0,void 0,void 0,void 0,at),stencilBuffer:g.stencil,colorSpace:t.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,r=await s.requestReferenceSpace(a),oe.setContext(s),oe.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return M.getDepthTexture()};function tt(j){for(let at=0;at<j.removed.length;at++){const At=j.removed[at],mt=S.indexOf(At);mt>=0&&(S[mt]=null,w[mt].disconnect(At))}for(let at=0;at<j.added.length;at++){const At=j.added[at];let mt=S.indexOf(At);if(mt===-1){for(let kt=0;kt<w.length;kt++)if(kt>=S.length){S.push(At),mt=kt;break}else if(S[kt]===null){S[kt]=At,mt=kt;break}if(mt===-1)break}const Ut=w[mt];Ut&&Ut.connect(At)}}const J=new b,st=new b;function $(j,at,At){J.setFromMatrixPosition(at.matrixWorld),st.setFromMatrixPosition(At.matrixWorld);const mt=J.distanceTo(st),Ut=at.projectionMatrix.elements,kt=At.projectionMatrix.elements,Zt=Ut[14]/(Ut[10]-1),ve=Ut[14]/(Ut[10]+1),Qt=(Ut[9]+1)/Ut[5],be=(Ut[9]-1)/Ut[5],W=(Ut[8]-1)/Ut[0],Ie=(kt[8]+1)/kt[0],te=Zt*W,ie=Zt*Ie,zt=mt/(-W+Ie),Me=zt*-W;if(at.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(Me),j.translateZ(zt),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),Ut[10]===-1)j.projectionMatrix.copy(at.projectionMatrix),j.projectionMatrixInverse.copy(at.projectionMatrixInverse);else{const Nt=Zt+zt,R=ve+zt,E=te-Me,Y=ie+(mt-Me),it=Qt*ve/R*Nt,et=be*ve/R*Nt;j.projectionMatrix.makePerspective(E,Y,it,et,Nt,R),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function ct(j,at){at===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(at.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(s===null)return;let at=j.near,At=j.far;M.texture!==null&&(M.depthNear>0&&(at=M.depthNear),M.depthFar>0&&(At=M.depthFar)),_.near=L.near=I.near=at,_.far=L.far=I.far=At,(A!==_.near||U!==_.far)&&(s.updateRenderState({depthNear:_.near,depthFar:_.far}),A=_.near,U=_.far),I.layers.mask=j.layers.mask|2,L.layers.mask=j.layers.mask|4,_.layers.mask=I.layers.mask|L.layers.mask;const mt=j.parent,Ut=_.cameras;ct(_,mt);for(let kt=0;kt<Ut.length;kt++)ct(Ut[kt],mt);Ut.length===2?$(_,I,L):_.projectionMatrix.copy(I.projectionMatrix),dt(j,_,mt)};function dt(j,at,At){At===null?j.matrix.copy(at.matrixWorld):(j.matrix.copy(At.matrixWorld),j.matrix.invert(),j.matrix.multiply(at.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(at.projectionMatrix),j.projectionMatrixInverse.copy(at.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=ks*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return _},this.getFoveation=function(){if(!(h===null&&p===null))return l},this.setFoveation=function(j){l=j,h!==null&&(h.fixedFoveation=j),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=j)},this.hasDepthSensing=function(){return M.texture!==null},this.getDepthSensingMesh=function(){return M.getMesh(_)};let It=null;function Wt(j,at){if(u=at.getViewerPose(c||r),f=at,u!==null){const At=u.views;p!==null&&(t.setRenderTargetFramebuffer(x,p.framebuffer),t.setRenderTarget(x));let mt=!1;At.length!==_.cameras.length&&(_.cameras.length=0,mt=!0);for(let kt=0;kt<At.length;kt++){const Zt=At[kt];let ve=null;if(p!==null)ve=p.getViewport(Zt);else{const be=d.getViewSubImage(h,Zt);ve=be.viewport,kt===0&&(t.setRenderTargetTextures(x,be.colorTexture,h.ignoreDepthValues?void 0:be.depthStencilTexture),t.setRenderTarget(x))}let Qt=y[kt];Qt===void 0&&(Qt=new Se,Qt.layers.enable(kt),Qt.viewport=new me,y[kt]=Qt),Qt.matrix.fromArray(Zt.transform.matrix),Qt.matrix.decompose(Qt.position,Qt.quaternion,Qt.scale),Qt.projectionMatrix.fromArray(Zt.projectionMatrix),Qt.projectionMatrixInverse.copy(Qt.projectionMatrix).invert(),Qt.viewport.set(ve.x,ve.y,ve.width,ve.height),kt===0&&(_.matrix.copy(Qt.matrix),_.matrix.decompose(_.position,_.quaternion,_.scale)),mt===!0&&_.cameras.push(Qt)}const Ut=s.enabledFeatures;if(Ut&&Ut.includes("depth-sensing")){const kt=d.getDepthInformation(At[0]);kt&&kt.isValid&&kt.texture&&M.init(t,kt,s.renderState)}}for(let At=0;At<w.length;At++){const mt=S[At],Ut=w[At];mt!==null&&Ut!==void 0&&Ut.update(mt,at,c||r)}It&&It(j,at),at.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:at}),f=null}const oe=new Yc;oe.setAnimationLoop(Wt),this.setAnimationLoop=function(j){It=j},this.dispose=function(){}}}const gi=new yn,Nm=new _e;function zm(n,t){function e(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function i(g,m){m.color.getRGB(g.fogColor.value,Wc(n)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function s(g,m,x,w,S){m.isMeshBasicMaterial||m.isMeshLambertMaterial?o(g,m):m.isMeshToonMaterial?(o(g,m),d(g,m)):m.isMeshPhongMaterial?(o(g,m),u(g,m)):m.isMeshStandardMaterial?(o(g,m),h(g,m),m.isMeshPhysicalMaterial&&p(g,m,S)):m.isMeshMatcapMaterial?(o(g,m),f(g,m)):m.isMeshDepthMaterial?o(g,m):m.isMeshDistanceMaterial?(o(g,m),M(g,m)):m.isMeshNormalMaterial?o(g,m):m.isLineBasicMaterial?(r(g,m),m.isLineDashedMaterial&&a(g,m)):m.isPointsMaterial?l(g,m,x,w):m.isSpriteMaterial?c(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function o(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,e(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,e(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===$e&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,e(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===$e&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,e(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,e(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);const x=t.get(m),w=x.envMap,S=x.envMapRotation;w&&(g.envMap.value=w,gi.copy(S),gi.x*=-1,gi.y*=-1,gi.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(gi.y*=-1,gi.z*=-1),g.envMapRotation.value.setFromMatrix4(Nm.makeRotationFromEuler(gi)),g.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,g.aoMapTransform))}function r(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,e(m.map,g.mapTransform))}function a(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function l(g,m,x,w){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*x,g.scale.value=w*.5,m.map&&(g.map.value=m.map,e(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function c(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,e(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function u(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function d(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function h(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function p(g,m,x){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===$e&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=x.texture,g.transmissionSamplerSize.value.set(x.width,x.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,g.specularIntensityMapTransform))}function f(g,m){m.matcap&&(g.matcap.value=m.matcap)}function M(g,m){const x=t.get(m).light;g.referencePosition.value.setFromMatrixPosition(x.matrixWorld),g.nearDistance.value=x.shadow.camera.near,g.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function Fm(n,t,e,i){let s={},o={},r=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,w){const S=w.program;i.uniformBlockBinding(x,S)}function c(x,w){let S=s[x.id];S===void 0&&(f(x),S=u(x),s[x.id]=S,x.addEventListener("dispose",g));const z=w.program;i.updateUBOMapping(x,z);const P=t.render.frame;o[x.id]!==P&&(h(x),o[x.id]=P)}function u(x){const w=d();x.__bindingPointIndex=w;const S=n.createBuffer(),z=x.__size,P=x.usage;return n.bindBuffer(n.UNIFORM_BUFFER,S),n.bufferData(n.UNIFORM_BUFFER,z,P),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,w,S),S}function d(){for(let x=0;x<a;x++)if(r.indexOf(x)===-1)return r.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(x){const w=s[x.id],S=x.uniforms,z=x.__cache;n.bindBuffer(n.UNIFORM_BUFFER,w);for(let P=0,I=S.length;P<I;P++){const L=Array.isArray(S[P])?S[P]:[S[P]];for(let y=0,_=L.length;y<_;y++){const A=L[y];if(p(A,P,y,z)===!0){const U=A.__offset,O=Array.isArray(A.value)?A.value:[A.value];let K=0;for(let tt=0;tt<O.length;tt++){const J=O[tt],st=M(J);typeof J=="number"||typeof J=="boolean"?(A.__data[0]=J,n.bufferSubData(n.UNIFORM_BUFFER,U+K,A.__data)):J.isMatrix3?(A.__data[0]=J.elements[0],A.__data[1]=J.elements[1],A.__data[2]=J.elements[2],A.__data[3]=0,A.__data[4]=J.elements[3],A.__data[5]=J.elements[4],A.__data[6]=J.elements[5],A.__data[7]=0,A.__data[8]=J.elements[6],A.__data[9]=J.elements[7],A.__data[10]=J.elements[8],A.__data[11]=0):(J.toArray(A.__data,K),K+=st.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,U,A.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(x,w,S,z){const P=x.value,I=w+"_"+S;if(z[I]===void 0)return typeof P=="number"||typeof P=="boolean"?z[I]=P:z[I]=P.clone(),!0;{const L=z[I];if(typeof P=="number"||typeof P=="boolean"){if(L!==P)return z[I]=P,!0}else if(L.equals(P)===!1)return L.copy(P),!0}return!1}function f(x){const w=x.uniforms;let S=0;const z=16;for(let I=0,L=w.length;I<L;I++){const y=Array.isArray(w[I])?w[I]:[w[I]];for(let _=0,A=y.length;_<A;_++){const U=y[_],O=Array.isArray(U.value)?U.value:[U.value];for(let K=0,tt=O.length;K<tt;K++){const J=O[K],st=M(J),$=S%z,ct=$%st.boundary,dt=$+ct;S+=ct,dt!==0&&z-dt<st.storage&&(S+=z-dt),U.__data=new Float32Array(st.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=S,S+=st.storage}}}const P=S%z;return P>0&&(S+=z-P),x.__size=S,x.__cache={},this}function M(x){const w={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(w.boundary=4,w.storage=4):x.isVector2?(w.boundary=8,w.storage=8):x.isVector3||x.isColor?(w.boundary=16,w.storage=12):x.isVector4?(w.boundary=16,w.storage=16):x.isMatrix3?(w.boundary=48,w.storage=48):x.isMatrix4?(w.boundary=64,w.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),w}function g(x){const w=x.target;w.removeEventListener("dispose",g);const S=r.indexOf(w.__bindingPointIndex);r.splice(S,1),n.deleteBuffer(s[w.id]),delete s[w.id],delete o[w.id]}function m(){for(const x in s)n.deleteBuffer(s[x]);r=[],s={},o={}}return{bind:l,update:c,dispose:m}}class Wa{constructor(t={}){const{canvas:e=Ed(),context:i=null,depth:s=!0,stencil:o=!1,alpha:r=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:h=!1}=t;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=r;const f=new Uint32Array(4),M=new Int32Array(4);let g=null,m=null;const x=[],w=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=fe,this.toneMapping=ri,this.toneMappingExposure=1;const S=this;let z=!1,P=0,I=0,L=null,y=-1,_=null;const A=new me,U=new me;let O=null;const K=new Et(0);let tt=0,J=e.width,st=e.height,$=1,ct=null,dt=null;const It=new me(0,0,J,st),Wt=new me(0,0,J,st);let oe=!1;const j=new Ha;let at=!1,At=!1;const mt=new _e,Ut=new _e,kt=new b,Zt=new me,ve={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Qt=!1;function be(){return L===null?$:1}let W=i;function Ie(v,T){return e.getContext(v,T)}try{const v={alpha:!0,depth:s,stencil:o,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${La}`),e.addEventListener("webglcontextlost",nt,!1),e.addEventListener("webglcontextrestored",Mt,!1),e.addEventListener("webglcontextcreationerror",_t,!1),W===null){const T="webgl2";if(W=Ie(T,v),W===null)throw Ie(T)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(v){throw console.error("THREE.WebGLRenderer: "+v.message),v}let te,ie,zt,Me,Nt,R,E,Y,it,et,Q,Dt,gt,bt,se,lt,xt,Ft,Gt,wt,ee,Yt,le,H;function ft(){te=new Vp(W),te.init(),Yt=new Cm(W,te),ie=new Fp(W,te,t,Yt),zt=new Em(W,te),ie.reverseDepthBuffer&&h&&zt.buffers.depth.setReversed(!0),Me=new qp(W),Nt=new um,R=new Am(W,te,zt,Nt,ie,Yt,Me),E=new Bp(S),Y=new Hp(S),it=new jd(W),le=new Np(W,it),et=new Wp(W,it,Me,le),Q=new $p(W,et,it,Me),Gt=new Yp(W,ie,R),lt=new Op(Nt),Dt=new cm(S,E,Y,te,ie,le,lt),gt=new zm(S,Nt),bt=new hm,se=new vm(te),Ft=new Up(S,E,Y,zt,Q,p,l),xt=new wm(S,Q,ie),H=new Fm(W,Me,ie,zt),wt=new zp(W,te,Me),ee=new Xp(W,te,Me),Me.programs=Dt.programs,S.capabilities=ie,S.extensions=te,S.properties=Nt,S.renderLists=bt,S.shadowMap=xt,S.state=zt,S.info=Me}ft();const Z=new Um(S,W);this.xr=Z,this.getContext=function(){return W},this.getContextAttributes=function(){return W.getContextAttributes()},this.forceContextLoss=function(){const v=te.get("WEBGL_lose_context");v&&v.loseContext()},this.forceContextRestore=function(){const v=te.get("WEBGL_lose_context");v&&v.restoreContext()},this.getPixelRatio=function(){return $},this.setPixelRatio=function(v){v!==void 0&&($=v,this.setSize(J,st,!1))},this.getSize=function(v){return v.set(J,st)},this.setSize=function(v,T,D=!0){if(Z.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}J=v,st=T,e.width=Math.floor(v*$),e.height=Math.floor(T*$),D===!0&&(e.style.width=v+"px",e.style.height=T+"px"),this.setViewport(0,0,v,T)},this.getDrawingBufferSize=function(v){return v.set(J*$,st*$).floor()},this.setDrawingBufferSize=function(v,T,D){J=v,st=T,$=D,e.width=Math.floor(v*D),e.height=Math.floor(T*D),this.setViewport(0,0,v,T)},this.getCurrentViewport=function(v){return v.copy(A)},this.getViewport=function(v){return v.copy(It)},this.setViewport=function(v,T,D,F){v.isVector4?It.set(v.x,v.y,v.z,v.w):It.set(v,T,D,F),zt.viewport(A.copy(It).multiplyScalar($).round())},this.getScissor=function(v){return v.copy(Wt)},this.setScissor=function(v,T,D,F){v.isVector4?Wt.set(v.x,v.y,v.z,v.w):Wt.set(v,T,D,F),zt.scissor(U.copy(Wt).multiplyScalar($).round())},this.getScissorTest=function(){return oe},this.setScissorTest=function(v){zt.setScissorTest(oe=v)},this.setOpaqueSort=function(v){ct=v},this.setTransparentSort=function(v){dt=v},this.getClearColor=function(v){return v.copy(Ft.getClearColor())},this.setClearColor=function(){Ft.setClearColor.apply(Ft,arguments)},this.getClearAlpha=function(){return Ft.getClearAlpha()},this.setClearAlpha=function(){Ft.setClearAlpha.apply(Ft,arguments)},this.clear=function(v=!0,T=!0,D=!0){let F=0;if(v){let B=!1;if(L!==null){const ot=L.texture.format;B=ot===Oa||ot===Fa||ot===za}if(B){const ot=L.texture.type,ht=ot===Vn||ot===Ci||ot===Bs||ot===ls||ot===Ua||ot===Na,Ct=Ft.getClearColor(),Rt=Ft.getClearAlpha(),Ht=Ct.r,Xt=Ct.g,Pt=Ct.b;ht?(f[0]=Ht,f[1]=Xt,f[2]=Pt,f[3]=Rt,W.clearBufferuiv(W.COLOR,0,f)):(M[0]=Ht,M[1]=Xt,M[2]=Pt,M[3]=Rt,W.clearBufferiv(W.COLOR,0,M))}else F|=W.COLOR_BUFFER_BIT}T&&(F|=W.DEPTH_BUFFER_BIT),D&&(F|=W.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),W.clear(F)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",nt,!1),e.removeEventListener("webglcontextrestored",Mt,!1),e.removeEventListener("webglcontextcreationerror",_t,!1),bt.dispose(),se.dispose(),Nt.dispose(),E.dispose(),Y.dispose(),Q.dispose(),le.dispose(),H.dispose(),Dt.dispose(),Z.dispose(),Z.removeEventListener("sessionstart",Ii),Z.removeEventListener("sessionend",ms),Cn.stop()};function nt(v){v.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),z=!0}function Mt(){console.log("THREE.WebGLRenderer: Context Restored."),z=!1;const v=Me.autoReset,T=xt.enabled,D=xt.autoUpdate,F=xt.needsUpdate,B=xt.type;ft(),Me.autoReset=v,xt.enabled=T,xt.autoUpdate=D,xt.needsUpdate=F,xt.type=B}function _t(v){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",v.statusMessage)}function Vt(v){const T=v.target;T.removeEventListener("dispose",Vt),ye(T)}function ye(v){Te(v),Nt.remove(v)}function Te(v){const T=Nt.get(v).programs;T!==void 0&&(T.forEach(function(D){Dt.releaseProgram(D)}),v.isShaderMaterial&&Dt.releaseShaderCache(v))}this.renderBufferDirect=function(v,T,D,F,B,ot){T===null&&(T=ve);const ht=B.isMesh&&B.matrixWorld.determinant()<0,Ct=V(v,T,D,F,B);zt.setMaterial(F,ht);let Rt=D.index,Ht=1;if(F.wireframe===!0){if(Rt=et.getWireframeAttribute(D),Rt===void 0)return;Ht=2}const Xt=D.drawRange,Pt=D.attributes.position;let ne=Xt.start*Ht,N=(Xt.start+Xt.count)*Ht;ot!==null&&(ne=Math.max(ne,ot.start*Ht),N=Math.min(N,(ot.start+ot.count)*Ht)),Rt!==null?(ne=Math.max(ne,0),N=Math.min(N,Rt.count)):Pt!=null&&(ne=Math.max(ne,0),N=Math.min(N,Pt.count));const vt=N-ne;if(vt<0||vt===1/0)return;le.setup(B,F,Ct,D,Rt);let Ot,Bt=wt;if(Rt!==null&&(Ot=it.get(Rt),Bt=ee,Bt.setIndex(Ot)),B.isMesh)F.wireframe===!0?(zt.setLineWidth(F.wireframeLinewidth*be()),Bt.setMode(W.LINES)):Bt.setMode(W.TRIANGLES);else if(B.isLine){let ut=F.linewidth;ut===void 0&&(ut=1),zt.setLineWidth(ut*be()),B.isLineSegments?Bt.setMode(W.LINES):B.isLineLoop?Bt.setMode(W.LINE_LOOP):Bt.setMode(W.LINE_STRIP)}else B.isPoints?Bt.setMode(W.POINTS):B.isSprite&&Bt.setMode(W.TRIANGLES);if(B.isBatchedMesh)if(B._multiDrawInstances!==null)Bt.renderMultiDrawInstances(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount,B._multiDrawInstances);else if(te.get("WEBGL_multi_draw"))Bt.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{const ut=B._multiDrawStarts,De=B._multiDrawCounts,jt=B._multiDrawCount,Xe=Rt?it.get(Rt).bytesPerElement:1,cn=Nt.get(F).currentProgram.getUniforms();for(let Ue=0;Ue<jt;Ue++)cn.setValue(W,"_gl_DrawID",Ue),Bt.render(ut[Ue]/Xe,De[Ue])}else if(B.isInstancedMesh)Bt.renderInstances(ne,vt,B.count);else if(D.isInstancedBufferGeometry){const ut=D._maxInstanceCount!==void 0?D._maxInstanceCount:1/0,De=Math.min(D.instanceCount,ut);Bt.renderInstances(ne,vt,De)}else Bt.render(ne,vt)};function ce(v,T,D){v.transparent===!0&&v.side===ke&&v.forceSinglePass===!1?(v.side=$e,v.needsUpdate=!0,Ui(v,T,D),v.side=ai,v.needsUpdate=!0,Ui(v,T,D),v.side=ke):Ui(v,T,D)}this.compile=function(v,T,D=null){D===null&&(D=v),m=se.get(D),m.init(T),w.push(m),D.traverseVisible(function(B){B.isLight&&B.layers.test(T.layers)&&(m.pushLight(B),B.castShadow&&m.pushShadow(B))}),v!==D&&v.traverseVisible(function(B){B.isLight&&B.layers.test(T.layers)&&(m.pushLight(B),B.castShadow&&m.pushShadow(B))}),m.setupLights();const F=new Set;return v.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;const ot=B.material;if(ot)if(Array.isArray(ot))for(let ht=0;ht<ot.length;ht++){const Ct=ot[ht];ce(Ct,D,B),F.add(Ct)}else ce(ot,D,B),F.add(ot)}),w.pop(),m=null,F},this.compileAsync=function(v,T,D=null){const F=this.compile(v,T,D);return new Promise(B=>{function ot(){if(F.forEach(function(ht){Nt.get(ht).currentProgram.isReady()&&F.delete(ht)}),F.size===0){B(v);return}setTimeout(ot,10)}te.get("KHR_parallel_shader_compile")!==null?ot():setTimeout(ot,10)})};let Qe=null;function Ae(v){Qe&&Qe(v)}function Ii(){Cn.stop()}function ms(){Cn.start()}const Cn=new Yc;Cn.setAnimationLoop(Ae),typeof self<"u"&&Cn.setContext(self),this.setAnimationLoop=function(v){Qe=v,Z.setAnimationLoop(v),v===null?Cn.stop():Cn.start()},Z.addEventListener("sessionstart",Ii),Z.addEventListener("sessionend",ms),this.render=function(v,T){if(T!==void 0&&T.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(z===!0)return;if(v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),T.parent===null&&T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),Z.enabled===!0&&Z.isPresenting===!0&&(Z.cameraAutoUpdate===!0&&Z.updateCamera(T),T=Z.getCamera()),v.isScene===!0&&v.onBeforeRender(S,v,T,L),m=se.get(v,w.length),m.init(T),w.push(m),Ut.multiplyMatrices(T.projectionMatrix,T.matrixWorldInverse),j.setFromProjectionMatrix(Ut),At=this.localClippingEnabled,at=lt.init(this.clippingPlanes,At),g=bt.get(v,x.length),g.init(),x.push(g),Z.enabled===!0&&Z.isPresenting===!0){const ot=S.xr.getDepthSensingMesh();ot!==null&&gs(ot,T,-1/0,S.sortObjects)}gs(v,T,0,S.sortObjects),g.finish(),S.sortObjects===!0&&g.sort(ct,dt),Qt=Z.enabled===!1||Z.isPresenting===!1||Z.hasDepthSensing()===!1,Qt&&Ft.addToRenderList(g,v),this.info.render.frame++,at===!0&&lt.beginShadows();const D=m.state.shadowsArray;xt.render(D,v,T),at===!0&&lt.endShadows(),this.info.autoReset===!0&&this.info.reset();const F=g.opaque,B=g.transmissive;if(m.setupLights(),T.isArrayCamera){const ot=T.cameras;if(B.length>0)for(let ht=0,Ct=ot.length;ht<Ct;ht++){const Rt=ot[ht];vs(F,B,v,Rt)}Qt&&Ft.render(v);for(let ht=0,Ct=ot.length;ht<Ct;ht++){const Rt=ot[ht];_s(g,v,Rt,Rt.viewport)}}else B.length>0&&vs(F,B,v,T),Qt&&Ft.render(v),_s(g,v,T);L!==null&&(R.updateMultisampleRenderTarget(L),R.updateRenderTargetMipmap(L)),v.isScene===!0&&v.onAfterRender(S,v,T),le.resetDefaultState(),y=-1,_=null,w.pop(),w.length>0?(m=w[w.length-1],at===!0&&lt.setGlobalState(S.clippingPlanes,m.state.camera)):m=null,x.pop(),x.length>0?g=x[x.length-1]:g=null};function gs(v,T,D,F){if(v.visible===!1)return;if(v.layers.test(T.layers)){if(v.isGroup)D=v.renderOrder;else if(v.isLOD)v.autoUpdate===!0&&v.update(T);else if(v.isLight)m.pushLight(v),v.castShadow&&m.pushShadow(v);else if(v.isSprite){if(!v.frustumCulled||j.intersectsSprite(v)){F&&Zt.setFromMatrixPosition(v.matrixWorld).applyMatrix4(Ut);const ht=Q.update(v),Ct=v.material;Ct.visible&&g.push(v,ht,Ct,D,Zt.z,null)}}else if((v.isMesh||v.isLine||v.isPoints)&&(!v.frustumCulled||j.intersectsObject(v))){const ht=Q.update(v),Ct=v.material;if(F&&(v.boundingSphere!==void 0?(v.boundingSphere===null&&v.computeBoundingSphere(),Zt.copy(v.boundingSphere.center)):(ht.boundingSphere===null&&ht.computeBoundingSphere(),Zt.copy(ht.boundingSphere.center)),Zt.applyMatrix4(v.matrixWorld).applyMatrix4(Ut)),Array.isArray(Ct)){const Rt=ht.groups;for(let Ht=0,Xt=Rt.length;Ht<Xt;Ht++){const Pt=Rt[Ht],ne=Ct[Pt.materialIndex];ne&&ne.visible&&g.push(v,ht,ne,D,Zt.z,Pt)}}else Ct.visible&&g.push(v,ht,Ct,D,Zt.z,null)}}const ot=v.children;for(let ht=0,Ct=ot.length;ht<Ct;ht++)gs(ot[ht],T,D,F)}function _s(v,T,D,F){const B=v.opaque,ot=v.transmissive,ht=v.transparent;m.setupLightsView(D),at===!0&&lt.setGlobalState(S.clippingPlanes,D),F&&zt.viewport(A.copy(F)),B.length>0&&Di(B,T,D),ot.length>0&&Di(ot,T,D),ht.length>0&&Di(ht,T,D),zt.buffers.depth.setTest(!0),zt.buffers.depth.setMask(!0),zt.buffers.color.setMask(!0),zt.setPolygonOffset(!1)}function vs(v,T,D,F){if((D.isScene===!0?D.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[F.id]===void 0&&(m.state.transmissionRenderTarget[F.id]=new Ri(1,1,{generateMipmaps:!0,type:te.has("EXT_color_buffer_half_float")||te.has("EXT_color_buffer_float")?Gs:Vn,minFilter:Ti,samples:4,stencilBuffer:o,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:re.workingColorSpace}));const ot=m.state.transmissionRenderTarget[F.id],ht=F.viewport||A;ot.setSize(ht.z,ht.w);const Ct=S.getRenderTarget();S.setRenderTarget(ot),S.getClearColor(K),tt=S.getClearAlpha(),tt<1&&S.setClearColor(16777215,.5),S.clear(),Qt&&Ft.render(D);const Rt=S.toneMapping;S.toneMapping=ri;const Ht=F.viewport;if(F.viewport!==void 0&&(F.viewport=void 0),m.setupLightsView(F),at===!0&&lt.setGlobalState(S.clippingPlanes,F),Di(v,D,F),R.updateMultisampleRenderTarget(ot),R.updateRenderTargetMipmap(ot),te.has("WEBGL_multisampled_render_to_texture")===!1){let Xt=!1;for(let Pt=0,ne=T.length;Pt<ne;Pt++){const N=T[Pt],vt=N.object,Ot=N.geometry,Bt=N.material,ut=N.group;if(Bt.side===ke&&vt.layers.test(F.layers)){const De=Bt.side;Bt.side=$e,Bt.needsUpdate=!0,qs(vt,D,F,Ot,Bt,ut),Bt.side=De,Bt.needsUpdate=!0,Xt=!0}}Xt===!0&&(R.updateMultisampleRenderTarget(ot),R.updateRenderTargetMipmap(ot))}S.setRenderTarget(Ct),S.setClearColor(K,tt),Ht!==void 0&&(F.viewport=Ht),S.toneMapping=Rt}function Di(v,T,D){const F=T.isScene===!0?T.overrideMaterial:null;for(let B=0,ot=v.length;B<ot;B++){const ht=v[B],Ct=ht.object,Rt=ht.geometry,Ht=F===null?ht.material:F,Xt=ht.group;Ct.layers.test(D.layers)&&qs(Ct,T,D,Rt,Ht,Xt)}}function qs(v,T,D,F,B,ot){v.onBeforeRender(S,T,D,F,B,ot),v.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,v.matrixWorld),v.normalMatrix.getNormalMatrix(v.modelViewMatrix),B.onBeforeRender(S,T,D,F,v,ot),B.transparent===!0&&B.side===ke&&B.forceSinglePass===!1?(B.side=$e,B.needsUpdate=!0,S.renderBufferDirect(D,T,F,B,v,ot),B.side=ai,B.needsUpdate=!0,S.renderBufferDirect(D,T,F,B,v,ot),B.side=ke):S.renderBufferDirect(D,T,F,B,v,ot),v.onAfterRender(S,T,D,F,B,ot)}function Ui(v,T,D){T.isScene!==!0&&(T=ve);const F=Nt.get(v),B=m.state.lights,ot=m.state.shadowsArray,ht=B.state.version,Ct=Dt.getParameters(v,B.state,ot,T,D),Rt=Dt.getProgramCacheKey(Ct);let Ht=F.programs;F.environment=v.isMeshStandardMaterial?T.environment:null,F.fog=T.fog,F.envMap=(v.isMeshStandardMaterial?Y:E).get(v.envMap||F.environment),F.envMapRotation=F.environment!==null&&v.envMap===null?T.environmentRotation:v.envMapRotation,Ht===void 0&&(v.addEventListener("dispose",Vt),Ht=new Map,F.programs=Ht);let Xt=Ht.get(Rt);if(Xt!==void 0){if(F.currentProgram===Xt&&F.lightsStateVersion===ht)return k(v,Ct),Xt}else Ct.uniforms=Dt.getUniforms(v),v.onBeforeCompile(Ct,S),Xt=Dt.acquireProgram(Ct,Rt),Ht.set(Rt,Xt),F.uniforms=Ct.uniforms;const Pt=F.uniforms;return(!v.isShaderMaterial&&!v.isRawShaderMaterial||v.clipping===!0)&&(Pt.clippingPlanes=lt.uniform),k(v,Ct),F.needsLights=X(v),F.lightsStateVersion=ht,F.needsLights&&(Pt.ambientLightColor.value=B.state.ambient,Pt.lightProbe.value=B.state.probe,Pt.directionalLights.value=B.state.directional,Pt.directionalLightShadows.value=B.state.directionalShadow,Pt.spotLights.value=B.state.spot,Pt.spotLightShadows.value=B.state.spotShadow,Pt.rectAreaLights.value=B.state.rectArea,Pt.ltc_1.value=B.state.rectAreaLTC1,Pt.ltc_2.value=B.state.rectAreaLTC2,Pt.pointLights.value=B.state.point,Pt.pointLightShadows.value=B.state.pointShadow,Pt.hemisphereLights.value=B.state.hemi,Pt.directionalShadowMap.value=B.state.directionalShadowMap,Pt.directionalShadowMatrix.value=B.state.directionalShadowMatrix,Pt.spotShadowMap.value=B.state.spotShadowMap,Pt.spotLightMatrix.value=B.state.spotLightMatrix,Pt.spotLightMap.value=B.state.spotLightMap,Pt.pointShadowMap.value=B.state.pointShadowMap,Pt.pointShadowMatrix.value=B.state.pointShadowMatrix),F.currentProgram=Xt,F.uniformsList=null,Xt}function Ys(v){if(v.uniformsList===null){const T=v.currentProgram.getUniforms();v.uniformsList=Po.seqWithValue(T.seq,v.uniforms)}return v.uniformsList}function k(v,T){const D=Nt.get(v);D.outputColorSpace=T.outputColorSpace,D.batching=T.batching,D.batchingColor=T.batchingColor,D.instancing=T.instancing,D.instancingColor=T.instancingColor,D.instancingMorph=T.instancingMorph,D.skinning=T.skinning,D.morphTargets=T.morphTargets,D.morphNormals=T.morphNormals,D.morphColors=T.morphColors,D.morphTargetsCount=T.morphTargetsCount,D.numClippingPlanes=T.numClippingPlanes,D.numIntersection=T.numClipIntersection,D.vertexAlphas=T.vertexAlphas,D.vertexTangents=T.vertexTangents,D.toneMapping=T.toneMapping}function V(v,T,D,F,B){T.isScene!==!0&&(T=ve),R.resetTextureUnits();const ot=T.fog,ht=F.isMeshStandardMaterial?T.environment:null,Ct=L===null?S.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:hs,Rt=(F.isMeshStandardMaterial?Y:E).get(F.envMap||ht),Ht=F.vertexColors===!0&&!!D.attributes.color&&D.attributes.color.itemSize===4,Xt=!!D.attributes.tangent&&(!!F.normalMap||F.anisotropy>0),Pt=!!D.morphAttributes.position,ne=!!D.morphAttributes.normal,N=!!D.morphAttributes.color;let vt=ri;F.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(vt=S.toneMapping);const Ot=D.morphAttributes.position||D.morphAttributes.normal||D.morphAttributes.color,Bt=Ot!==void 0?Ot.length:0,ut=Nt.get(F),De=m.state.lights;if(at===!0&&(At===!0||v!==_)){const tn=v===_&&F.id===y;lt.setState(F,v,tn)}let jt=!1;F.version===ut.__version?(ut.needsLights&&ut.lightsStateVersion!==De.state.version||ut.outputColorSpace!==Ct||B.isBatchedMesh&&ut.batching===!1||!B.isBatchedMesh&&ut.batching===!0||B.isBatchedMesh&&ut.batchingColor===!0&&B.colorTexture===null||B.isBatchedMesh&&ut.batchingColor===!1&&B.colorTexture!==null||B.isInstancedMesh&&ut.instancing===!1||!B.isInstancedMesh&&ut.instancing===!0||B.isSkinnedMesh&&ut.skinning===!1||!B.isSkinnedMesh&&ut.skinning===!0||B.isInstancedMesh&&ut.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&ut.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&ut.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&ut.instancingMorph===!1&&B.morphTexture!==null||ut.envMap!==Rt||F.fog===!0&&ut.fog!==ot||ut.numClippingPlanes!==void 0&&(ut.numClippingPlanes!==lt.numPlanes||ut.numIntersection!==lt.numIntersection)||ut.vertexAlphas!==Ht||ut.vertexTangents!==Xt||ut.morphTargets!==Pt||ut.morphNormals!==ne||ut.morphColors!==N||ut.toneMapping!==vt||ut.morphTargetsCount!==Bt)&&(jt=!0):(jt=!0,ut.__version=F.version);let Xe=ut.currentProgram;jt===!0&&(Xe=Ui(F,T,B));let cn=!1,Ue=!1,Sn=!1;const ue=Xe.getUniforms(),un=ut.uniforms;if(zt.useProgram(Xe.program)&&(cn=!0,Ue=!0,Sn=!0),F.id!==y&&(y=F.id,Ue=!0),cn||_!==v){zt.buffers.depth.getReversed()?(mt.copy(v.projectionMatrix),Ad(mt),Cd(mt),ue.setValue(W,"projectionMatrix",mt)):ue.setValue(W,"projectionMatrix",v.projectionMatrix),ue.setValue(W,"viewMatrix",v.matrixWorldInverse);const Yn=ue.map.cameraPosition;Yn!==void 0&&Yn.setValue(W,kt.setFromMatrixPosition(v.matrixWorld)),ie.logarithmicDepthBuffer&&ue.setValue(W,"logDepthBufFC",2/(Math.log(v.far+1)/Math.LN2)),(F.isMeshPhongMaterial||F.isMeshToonMaterial||F.isMeshLambertMaterial||F.isMeshBasicMaterial||F.isMeshStandardMaterial||F.isShaderMaterial)&&ue.setValue(W,"isOrthographic",v.isOrthographicCamera===!0),_!==v&&(_=v,Ue=!0,Sn=!0)}if(B.isSkinnedMesh){ue.setOptional(W,B,"bindMatrix"),ue.setOptional(W,B,"bindMatrixInverse");const tn=B.skeleton;tn&&(tn.boneTexture===null&&tn.computeBoneTexture(),ue.setValue(W,"boneTexture",tn.boneTexture,R))}B.isBatchedMesh&&(ue.setOptional(W,B,"batchingTexture"),ue.setValue(W,"batchingTexture",B._matricesTexture,R),ue.setOptional(W,B,"batchingIdTexture"),ue.setValue(W,"batchingIdTexture",B._indirectTexture,R),ue.setOptional(W,B,"batchingColorTexture"),B._colorsTexture!==null&&ue.setValue(W,"batchingColorTexture",B._colorsTexture,R));const ui=D.morphAttributes;if((ui.position!==void 0||ui.normal!==void 0||ui.color!==void 0)&&Gt.update(B,D,Xe),(Ue||ut.receiveShadow!==B.receiveShadow)&&(ut.receiveShadow=B.receiveShadow,ue.setValue(W,"receiveShadow",B.receiveShadow)),F.isMeshGouraudMaterial&&F.envMap!==null&&(un.envMap.value=Rt,un.flipEnvMap.value=Rt.isCubeTexture&&Rt.isRenderTargetTexture===!1?-1:1),F.isMeshStandardMaterial&&F.envMap===null&&T.environment!==null&&(un.envMapIntensity.value=T.environmentIntensity),Ue&&(ue.setValue(W,"toneMappingExposure",S.toneMappingExposure),ut.needsLights&&G(un,Sn),ot&&F.fog===!0&&gt.refreshFogUniforms(un,ot),gt.refreshMaterialUniforms(un,F,$,st,m.state.transmissionRenderTarget[v.id]),Po.upload(W,Ys(ut),un,R)),F.isShaderMaterial&&F.uniformsNeedUpdate===!0&&(Po.upload(W,Ys(ut),un,R),F.uniformsNeedUpdate=!1),F.isSpriteMaterial&&ue.setValue(W,"center",B.center),ue.setValue(W,"modelViewMatrix",B.modelViewMatrix),ue.setValue(W,"normalMatrix",B.normalMatrix),ue.setValue(W,"modelMatrix",B.matrixWorld),F.isShaderMaterial||F.isRawShaderMaterial){const tn=F.uniformsGroups;for(let Yn=0,$n=tn.length;Yn<$n;Yn++){const Qa=tn[Yn];H.update(Qa,Xe),H.bind(Qa,Xe)}}return Xe}function G(v,T){v.ambientLightColor.needsUpdate=T,v.lightProbe.needsUpdate=T,v.directionalLights.needsUpdate=T,v.directionalLightShadows.needsUpdate=T,v.pointLights.needsUpdate=T,v.pointLightShadows.needsUpdate=T,v.spotLights.needsUpdate=T,v.spotLightShadows.needsUpdate=T,v.rectAreaLights.needsUpdate=T,v.hemisphereLights.needsUpdate=T}function X(v){return v.isMeshLambertMaterial||v.isMeshToonMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isShadowMaterial||v.isShaderMaterial&&v.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return I},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(v,T,D){Nt.get(v.texture).__webglTexture=T,Nt.get(v.depthTexture).__webglTexture=D;const F=Nt.get(v);F.__hasExternalTextures=!0,F.__autoAllocateDepthBuffer=D===void 0,F.__autoAllocateDepthBuffer||te.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),F.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(v,T){const D=Nt.get(v);D.__webglFramebuffer=T,D.__useDefaultFramebuffer=T===void 0},this.setRenderTarget=function(v,T=0,D=0){L=v,P=T,I=D;let F=!0,B=null,ot=!1,ht=!1;if(v){const Rt=Nt.get(v);if(Rt.__useDefaultFramebuffer!==void 0)zt.bindFramebuffer(W.FRAMEBUFFER,null),F=!1;else if(Rt.__webglFramebuffer===void 0)R.setupRenderTarget(v);else if(Rt.__hasExternalTextures)R.rebindTextures(v,Nt.get(v.texture).__webglTexture,Nt.get(v.depthTexture).__webglTexture);else if(v.depthBuffer){const Pt=v.depthTexture;if(Rt.__boundDepthTexture!==Pt){if(Pt!==null&&Nt.has(Pt)&&(v.width!==Pt.image.width||v.height!==Pt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");R.setupDepthRenderbuffer(v)}}const Ht=v.texture;(Ht.isData3DTexture||Ht.isDataArrayTexture||Ht.isCompressedArrayTexture)&&(ht=!0);const Xt=Nt.get(v).__webglFramebuffer;v.isWebGLCubeRenderTarget?(Array.isArray(Xt[T])?B=Xt[T][D]:B=Xt[T],ot=!0):v.samples>0&&R.useMultisampledRTT(v)===!1?B=Nt.get(v).__webglMultisampledFramebuffer:Array.isArray(Xt)?B=Xt[D]:B=Xt,A.copy(v.viewport),U.copy(v.scissor),O=v.scissorTest}else A.copy(It).multiplyScalar($).floor(),U.copy(Wt).multiplyScalar($).floor(),O=oe;if(zt.bindFramebuffer(W.FRAMEBUFFER,B)&&F&&zt.drawBuffers(v,B),zt.viewport(A),zt.scissor(U),zt.setScissorTest(O),ot){const Rt=Nt.get(v.texture);W.framebufferTexture2D(W.FRAMEBUFFER,W.COLOR_ATTACHMENT0,W.TEXTURE_CUBE_MAP_POSITIVE_X+T,Rt.__webglTexture,D)}else if(ht){const Rt=Nt.get(v.texture),Ht=T||0;W.framebufferTextureLayer(W.FRAMEBUFFER,W.COLOR_ATTACHMENT0,Rt.__webglTexture,D||0,Ht)}y=-1},this.readRenderTargetPixels=function(v,T,D,F,B,ot,ht){if(!(v&&v.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ct=Nt.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&ht!==void 0&&(Ct=Ct[ht]),Ct){zt.bindFramebuffer(W.FRAMEBUFFER,Ct);try{const Rt=v.texture,Ht=Rt.format,Xt=Rt.type;if(!ie.textureFormatReadable(Ht)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ie.textureTypeReadable(Xt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}T>=0&&T<=v.width-F&&D>=0&&D<=v.height-B&&W.readPixels(T,D,F,B,Yt.convert(Ht),Yt.convert(Xt),ot)}finally{const Rt=L!==null?Nt.get(L).__webglFramebuffer:null;zt.bindFramebuffer(W.FRAMEBUFFER,Rt)}}},this.readRenderTargetPixelsAsync=async function(v,T,D,F,B,ot,ht){if(!(v&&v.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ct=Nt.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&ht!==void 0&&(Ct=Ct[ht]),Ct){const Rt=v.texture,Ht=Rt.format,Xt=Rt.type;if(!ie.textureFormatReadable(Ht))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ie.textureTypeReadable(Xt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(T>=0&&T<=v.width-F&&D>=0&&D<=v.height-B){zt.bindFramebuffer(W.FRAMEBUFFER,Ct);const Pt=W.createBuffer();W.bindBuffer(W.PIXEL_PACK_BUFFER,Pt),W.bufferData(W.PIXEL_PACK_BUFFER,ot.byteLength,W.STREAM_READ),W.readPixels(T,D,F,B,Yt.convert(Ht),Yt.convert(Xt),0);const ne=L!==null?Nt.get(L).__webglFramebuffer:null;zt.bindFramebuffer(W.FRAMEBUFFER,ne);const N=W.fenceSync(W.SYNC_GPU_COMMANDS_COMPLETE,0);return W.flush(),await Td(W,N,4),W.bindBuffer(W.PIXEL_PACK_BUFFER,Pt),W.getBufferSubData(W.PIXEL_PACK_BUFFER,0,ot),W.deleteBuffer(Pt),W.deleteSync(N),ot}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(v,T=null,D=0){v.isTexture!==!0&&(Rs("WebGLRenderer: copyFramebufferToTexture function signature has changed."),T=arguments[0]||null,v=arguments[1]);const F=Math.pow(2,-D),B=Math.floor(v.image.width*F),ot=Math.floor(v.image.height*F),ht=T!==null?T.x:0,Ct=T!==null?T.y:0;R.setTexture2D(v,0),W.copyTexSubImage2D(W.TEXTURE_2D,D,0,0,ht,Ct,B,ot),zt.unbindTexture()},this.copyTextureToTexture=function(v,T,D=null,F=null,B=0){v.isTexture!==!0&&(Rs("WebGLRenderer: copyTextureToTexture function signature has changed."),F=arguments[0]||null,v=arguments[1],T=arguments[2],B=arguments[3]||0,D=null);let ot,ht,Ct,Rt,Ht,Xt,Pt,ne,N;const vt=v.isCompressedTexture?v.mipmaps[B]:v.image;D!==null?(ot=D.max.x-D.min.x,ht=D.max.y-D.min.y,Ct=D.isBox3?D.max.z-D.min.z:1,Rt=D.min.x,Ht=D.min.y,Xt=D.isBox3?D.min.z:0):(ot=vt.width,ht=vt.height,Ct=vt.depth||1,Rt=0,Ht=0,Xt=0),F!==null?(Pt=F.x,ne=F.y,N=F.z):(Pt=0,ne=0,N=0);const Ot=Yt.convert(T.format),Bt=Yt.convert(T.type);let ut;T.isData3DTexture?(R.setTexture3D(T,0),ut=W.TEXTURE_3D):T.isDataArrayTexture||T.isCompressedArrayTexture?(R.setTexture2DArray(T,0),ut=W.TEXTURE_2D_ARRAY):(R.setTexture2D(T,0),ut=W.TEXTURE_2D),W.pixelStorei(W.UNPACK_FLIP_Y_WEBGL,T.flipY),W.pixelStorei(W.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),W.pixelStorei(W.UNPACK_ALIGNMENT,T.unpackAlignment);const De=W.getParameter(W.UNPACK_ROW_LENGTH),jt=W.getParameter(W.UNPACK_IMAGE_HEIGHT),Xe=W.getParameter(W.UNPACK_SKIP_PIXELS),cn=W.getParameter(W.UNPACK_SKIP_ROWS),Ue=W.getParameter(W.UNPACK_SKIP_IMAGES);W.pixelStorei(W.UNPACK_ROW_LENGTH,vt.width),W.pixelStorei(W.UNPACK_IMAGE_HEIGHT,vt.height),W.pixelStorei(W.UNPACK_SKIP_PIXELS,Rt),W.pixelStorei(W.UNPACK_SKIP_ROWS,Ht),W.pixelStorei(W.UNPACK_SKIP_IMAGES,Xt);const Sn=v.isDataArrayTexture||v.isData3DTexture,ue=T.isDataArrayTexture||T.isData3DTexture;if(v.isRenderTargetTexture||v.isDepthTexture){const un=Nt.get(v),ui=Nt.get(T),tn=Nt.get(un.__renderTarget),Yn=Nt.get(ui.__renderTarget);zt.bindFramebuffer(W.READ_FRAMEBUFFER,tn.__webglFramebuffer),zt.bindFramebuffer(W.DRAW_FRAMEBUFFER,Yn.__webglFramebuffer);for(let $n=0;$n<Ct;$n++)Sn&&W.framebufferTextureLayer(W.READ_FRAMEBUFFER,W.COLOR_ATTACHMENT0,Nt.get(v).__webglTexture,B,Xt+$n),v.isDepthTexture?(ue&&W.framebufferTextureLayer(W.DRAW_FRAMEBUFFER,W.COLOR_ATTACHMENT0,Nt.get(T).__webglTexture,B,N+$n),W.blitFramebuffer(Rt,Ht,ot,ht,Pt,ne,ot,ht,W.DEPTH_BUFFER_BIT,W.NEAREST)):ue?W.copyTexSubImage3D(ut,B,Pt,ne,N+$n,Rt,Ht,ot,ht):W.copyTexSubImage2D(ut,B,Pt,ne,N+$n,Rt,Ht,ot,ht);zt.bindFramebuffer(W.READ_FRAMEBUFFER,null),zt.bindFramebuffer(W.DRAW_FRAMEBUFFER,null)}else ue?v.isDataTexture||v.isData3DTexture?W.texSubImage3D(ut,B,Pt,ne,N,ot,ht,Ct,Ot,Bt,vt.data):T.isCompressedArrayTexture?W.compressedTexSubImage3D(ut,B,Pt,ne,N,ot,ht,Ct,Ot,vt.data):W.texSubImage3D(ut,B,Pt,ne,N,ot,ht,Ct,Ot,Bt,vt):v.isDataTexture?W.texSubImage2D(W.TEXTURE_2D,B,Pt,ne,ot,ht,Ot,Bt,vt.data):v.isCompressedTexture?W.compressedTexSubImage2D(W.TEXTURE_2D,B,Pt,ne,vt.width,vt.height,Ot,vt.data):W.texSubImage2D(W.TEXTURE_2D,B,Pt,ne,ot,ht,Ot,Bt,vt);W.pixelStorei(W.UNPACK_ROW_LENGTH,De),W.pixelStorei(W.UNPACK_IMAGE_HEIGHT,jt),W.pixelStorei(W.UNPACK_SKIP_PIXELS,Xe),W.pixelStorei(W.UNPACK_SKIP_ROWS,cn),W.pixelStorei(W.UNPACK_SKIP_IMAGES,Ue),B===0&&T.generateMipmaps&&W.generateMipmap(ut),zt.unbindTexture()},this.copyTextureToTexture3D=function(v,T,D=null,F=null,B=0){return v.isTexture!==!0&&(Rs("WebGLRenderer: copyTextureToTexture3D function signature has changed."),D=arguments[0]||null,F=arguments[1]||null,v=arguments[2],T=arguments[3],B=arguments[4]||0),Rs('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(v,T,D,F,B)},this.initRenderTarget=function(v){Nt.get(v).__webglFramebuffer===void 0&&R.setupRenderTarget(v)},this.initTexture=function(v){v.isCubeTexture?R.setTextureCube(v,0):v.isData3DTexture?R.setTexture3D(v,0):v.isDataArrayTexture||v.isCompressedArrayTexture?R.setTexture2DArray(v,0):R.setTexture2D(v,0),zt.unbindTexture()},this.resetState=function(){P=0,I=0,L=null,zt.reset(),le.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return On}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=re._getDrawingBufferColorSpace(t),e.unpackColorSpace=re._getUnpackColorSpace()}}class ii{constructor(t,e=1,i=1e3){this.isFog=!0,this.name="",this.color=new Et(t),this.near=e,this.far=i}clone(){return new ii(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Xa extends Pe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new yn,this.environmentIntensity=1,this.environmentRotation=new yn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Om{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Ta,this.updateRanges=[],this.version=0,this.uuid=Bn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,i){t*=this.stride,i*=e.stride;for(let s=0,o=this.stride;s<o;s++)this.array[t+s]=e.array[i+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Bn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(e,this.stride);return i.setUsage(this.usage),i}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Bn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Ze=new b;class No{constructor(t,e,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,i=this.data.count;e<i;e++)Ze.fromBufferAttribute(this,e),Ze.applyMatrix4(t),this.setXYZ(e,Ze.x,Ze.y,Ze.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Ze.fromBufferAttribute(this,e),Ze.applyNormalMatrix(t),this.setXYZ(e,Ze.x,Ze.y,Ze.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Ze.fromBufferAttribute(this,e),Ze.transformDirection(t),this.setXYZ(e,Ze.x,Ze.y,Ze.z);return this}getComponent(t,e){let i=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(i=gn(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=he(i,this.array)),this.data.array[t*this.data.stride+this.offset+e]=i,this}setX(t,e){return this.normalized&&(e=he(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=he(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=he(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=he(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=gn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=gn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=gn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=gn(e,this.array)),e}setXY(t,e,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=he(e,this.array),i=he(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this}setXYZ(t,e,i,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=he(e,this.array),i=he(i,this.array),s=he(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=s,this}setXYZW(t,e,i,s,o){return t=t*this.data.stride+this.offset,this.normalized&&(e=he(e,this.array),i=he(i,this.array),s=he(s,this.array),o=he(o,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=s,this.data.array[t+3]=o,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let o=0;o<this.itemSize;o++)e.push(this.data.array[s+o])}return new Ne(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new No(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let o=0;o<this.itemSize;o++)e.push(this.data.array[s+o])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Tn extends Xn{static get type(){return"SpriteMaterial"}constructor(t){super(),this.isSpriteMaterial=!0,this.color=new Et(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let Zi;const ws=new b,Ki=new b,Ji=new b,ji=new Tt,bs=new Tt,tu=new _e,go=new b,Es=new b,_o=new b,ec=new Tt,Tr=new Tt,nc=new Tt;class Gn extends Pe{constructor(t=new Tn){if(super(),this.isSprite=!0,this.type="Sprite",Zi===void 0){Zi=new Ee;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new Om(e,5);Zi.setIndex([0,1,2,0,2,3]),Zi.setAttribute("position",new No(i,3,0,!1)),Zi.setAttribute("uv",new No(i,2,3,!1))}this.geometry=Zi,this.material=t,this.center=new Tt(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Ki.setFromMatrixScale(this.matrixWorld),tu.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Ji.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Ki.multiplyScalar(-Ji.z);const i=this.material.rotation;let s,o;i!==0&&(o=Math.cos(i),s=Math.sin(i));const r=this.center;vo(go.set(-.5,-.5,0),Ji,r,Ki,s,o),vo(Es.set(.5,-.5,0),Ji,r,Ki,s,o),vo(_o.set(.5,.5,0),Ji,r,Ki,s,o),ec.set(0,0),Tr.set(1,0),nc.set(1,1);let a=t.ray.intersectTriangle(go,Es,_o,!1,ws);if(a===null&&(vo(Es.set(-.5,.5,0),Ji,r,Ki,s,o),Tr.set(0,1),a=t.ray.intersectTriangle(go,_o,Es,!1,ws),a===null))return;const l=t.ray.origin.distanceTo(ws);l<t.near||l>t.far||e.push({distance:l,point:ws.clone(),uv:hn.getInterpolation(ws,go,Es,_o,ec,Tr,nc,new Tt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function vo(n,t,e,i,s,o){ji.subVectors(n,e).addScalar(.5).multiply(i),s!==void 0?(bs.x=o*ji.x-s*ji.y,bs.y=s*ji.x+o*ji.y):bs.copy(ji),n.copy(t),n.x+=bs.x,n.y+=bs.y,n.applyMatrix4(tu)}class $o extends Xn{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new Et(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const zo=new b,Fo=new b,ic=new _e,Ts=new qo,Mo=new Ws,Ar=new b,sc=new b;class qa extends Pe{constructor(t=new Ee,e=new $o){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[0];for(let s=1,o=e.count;s<o;s++)zo.fromBufferAttribute(e,s-1),Fo.fromBufferAttribute(e,s),i[s]=i[s-1],i[s]+=zo.distanceTo(Fo);t.setAttribute("lineDistance",new xe(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const i=this.geometry,s=this.matrixWorld,o=t.params.Line.threshold,r=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Mo.copy(i.boundingSphere),Mo.applyMatrix4(s),Mo.radius+=o,t.ray.intersectsSphere(Mo)===!1)return;ic.copy(s).invert(),Ts.copy(t.ray).applyMatrix4(ic);const a=o/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=i.index,h=i.attributes.position;if(u!==null){const p=Math.max(0,r.start),f=Math.min(u.count,r.start+r.count);for(let M=p,g=f-1;M<g;M+=c){const m=u.getX(M),x=u.getX(M+1),w=yo(this,t,Ts,l,m,x);w&&e.push(w)}if(this.isLineLoop){const M=u.getX(f-1),g=u.getX(p),m=yo(this,t,Ts,l,M,g);m&&e.push(m)}}else{const p=Math.max(0,r.start),f=Math.min(h.count,r.start+r.count);for(let M=p,g=f-1;M<g;M+=c){const m=yo(this,t,Ts,l,M,M+1);m&&e.push(m)}if(this.isLineLoop){const M=yo(this,t,Ts,l,f-1,p);M&&e.push(M)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,r=s.length;o<r;o++){const a=s[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=o}}}}}function yo(n,t,e,i,s,o){const r=n.geometry.attributes.position;if(zo.fromBufferAttribute(r,s),Fo.fromBufferAttribute(r,o),e.distanceSqToSegment(zo,Fo,Ar,sc)>i)return;Ar.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(Ar);if(!(l<t.near||l>t.far))return{distance:l,point:sc.clone().applyMatrix4(n.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:n}}class Zo extends Xn{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new Et(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const oc=new _e,Ca=new qo,So=new Ws,xo=new b;class Ya extends Pe{constructor(t=new Ee,e=new Zo){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const i=this.geometry,s=this.matrixWorld,o=t.params.Points.threshold,r=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),So.copy(i.boundingSphere),So.applyMatrix4(s),So.radius+=o,t.ray.intersectsSphere(So)===!1)return;oc.copy(s).invert(),Ca.copy(t.ray).applyMatrix4(oc);const a=o/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=i.index,d=i.attributes.position;if(c!==null){const h=Math.max(0,r.start),p=Math.min(c.count,r.start+r.count);for(let f=h,M=p;f<M;f++){const g=c.getX(f);xo.fromBufferAttribute(d,g),rc(xo,g,l,s,t,e,this)}}else{const h=Math.max(0,r.start),p=Math.min(d.count,r.start+r.count);for(let f=h,M=p;f<M;f++)xo.fromBufferAttribute(d,f),rc(xo,f,l,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,r=s.length;o<r;o++){const a=s[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=o}}}}}function rc(n,t,e,i,s,o,r){const a=Ca.distanceSqToPoint(n);if(a<e){const l=new b;Ca.closestPointToPoint(n,l),l.applyMatrix4(i);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;o.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:r})}}class We extends je{constructor(t,e,i,s,o,r,a,l,c){super(t,e,i,s,o,r,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class qn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let i,s=this.getPoint(0),o=0;e.push(0);for(let r=1;r<=t;r++)i=this.getPoint(r/t),o+=i.distanceTo(s),e.push(o),s=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const i=this.getLengths();let s=0;const o=i.length;let r;e?r=e:r=t*i[o-1];let a=0,l=o-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=i[s]-r,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,i[s]===r)return s/(o-1);const u=i[s],h=i[s+1]-u,p=(r-u)/h;return(s+p)/(o-1)}getTangent(t,e){let s=t-1e-4,o=t+1e-4;s<0&&(s=0),o>1&&(o=1);const r=this.getPoint(s),a=this.getPoint(o),l=e||(r.isVector2?new Tt:new b);return l.copy(a).sub(r).normalize(),l}getTangentAt(t,e){const i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e){const i=new b,s=[],o=[],r=[],a=new b,l=new _e;for(let p=0;p<=t;p++){const f=p/t;s[p]=this.getTangentAt(f,new b)}o[0]=new b,r[0]=new b;let c=Number.MAX_VALUE;const u=Math.abs(s[0].x),d=Math.abs(s[0].y),h=Math.abs(s[0].z);u<=c&&(c=u,i.set(1,0,0)),d<=c&&(c=d,i.set(0,1,0)),h<=c&&i.set(0,0,1),a.crossVectors(s[0],i).normalize(),o[0].crossVectors(s[0],a),r[0].crossVectors(s[0],o[0]);for(let p=1;p<=t;p++){if(o[p]=o[p-1].clone(),r[p]=r[p-1].clone(),a.crossVectors(s[p-1],s[p]),a.length()>Number.EPSILON){a.normalize();const f=Math.acos(Ve(s[p-1].dot(s[p]),-1,1));o[p].applyMatrix4(l.makeRotationAxis(a,f))}r[p].crossVectors(s[p],o[p])}if(e===!0){let p=Math.acos(Ve(o[0].dot(o[t]),-1,1));p/=t,s[0].dot(a.crossVectors(o[0],o[t]))>0&&(p=-p);for(let f=1;f<=t;f++)o[f].applyMatrix4(l.makeRotationAxis(s[f],p*f)),r[f].crossVectors(s[f],o[f])}return{tangents:s,normals:o,binormals:r}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class eu extends qn{constructor(t=0,e=0,i=1,s=1,o=0,r=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=i,this.yRadius=s,this.aStartAngle=o,this.aEndAngle=r,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new Tt){const i=e,s=Math.PI*2;let o=this.aEndAngle-this.aStartAngle;const r=Math.abs(o)<Number.EPSILON;for(;o<0;)o+=s;for(;o>s;)o-=s;o<Number.EPSILON&&(r?o=0:o=s),this.aClockwise===!0&&!r&&(o===s?o=-s:o=o-s);const a=this.aStartAngle+t*o;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const u=Math.cos(this.aRotation),d=Math.sin(this.aRotation),h=l-this.aX,p=c-this.aY;l=h*u-p*d+this.aX,c=h*d+p*u+this.aY}return i.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Bm extends eu{constructor(t,e,i,s,o,r){super(t,e,i,i,s,o,r),this.isArcCurve=!0,this.type="ArcCurve"}}function $a(){let n=0,t=0,e=0,i=0;function s(o,r,a,l){n=o,t=a,e=-3*o+3*r-2*a-l,i=2*o-2*r+a+l}return{initCatmullRom:function(o,r,a,l,c){s(r,a,c*(a-o),c*(l-r))},initNonuniformCatmullRom:function(o,r,a,l,c,u,d){let h=(r-o)/c-(a-o)/(c+u)+(a-r)/u,p=(a-r)/u-(l-r)/(u+d)+(l-a)/d;h*=u,p*=u,s(r,a,h,p)},calc:function(o){const r=o*o,a=r*o;return n+t*o+e*r+i*a}}}const wo=new b,Cr=new $a,Rr=new $a,Pr=new $a;class Je extends qn{constructor(t=[],e=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=s}getPoint(t,e=new b){const i=e,s=this.points,o=s.length,r=(o-(this.closed?0:1))*t;let a=Math.floor(r),l=r-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/o)+1)*o:l===0&&a===o-1&&(a=o-2,l=1);let c,u;this.closed||a>0?c=s[(a-1)%o]:(wo.subVectors(s[0],s[1]).add(s[0]),c=wo);const d=s[a%o],h=s[(a+1)%o];if(this.closed||a+2<o?u=s[(a+2)%o]:(wo.subVectors(s[o-1],s[o-2]).add(s[o-1]),u=wo),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let f=Math.pow(c.distanceToSquared(d),p),M=Math.pow(d.distanceToSquared(h),p),g=Math.pow(h.distanceToSquared(u),p);M<1e-4&&(M=1),f<1e-4&&(f=M),g<1e-4&&(g=M),Cr.initNonuniformCatmullRom(c.x,d.x,h.x,u.x,f,M,g),Rr.initNonuniformCatmullRom(c.y,d.y,h.y,u.y,f,M,g),Pr.initNonuniformCatmullRom(c.z,d.z,h.z,u.z,f,M,g)}else this.curveType==="catmullrom"&&(Cr.initCatmullRom(c.x,d.x,h.x,u.x,this.tension),Rr.initCatmullRom(c.y,d.y,h.y,u.y,this.tension),Pr.initCatmullRom(c.z,d.z,h.z,u.z,this.tension));return i.set(Cr.calc(l),Rr.calc(l),Pr.calc(l)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(new b().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function ac(n,t,e,i,s){const o=(i-t)*.5,r=(s-e)*.5,a=n*n,l=n*a;return(2*e-2*i+o+r)*l+(-3*e+3*i-2*o-r)*a+o*n+e}function km(n,t){const e=1-n;return e*e*t}function Gm(n,t){return 2*(1-n)*n*t}function Hm(n,t){return n*n*t}function Ns(n,t,e,i){return km(n,t)+Gm(n,e)+Hm(n,i)}function Vm(n,t){const e=1-n;return e*e*e*t}function Wm(n,t){const e=1-n;return 3*e*e*n*t}function Xm(n,t){return 3*(1-n)*n*n*t}function qm(n,t){return n*n*n*t}function zs(n,t,e,i,s){return Vm(n,t)+Wm(n,e)+Xm(n,i)+qm(n,s)}class Ym extends qn{constructor(t=new Tt,e=new Tt,i=new Tt,s=new Tt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new Tt){const i=e,s=this.v0,o=this.v1,r=this.v2,a=this.v3;return i.set(zs(t,s.x,o.x,r.x,a.x),zs(t,s.y,o.y,r.y,a.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class $m extends qn{constructor(t=new b,e=new b,i=new b,s=new b){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new b){const i=e,s=this.v0,o=this.v1,r=this.v2,a=this.v3;return i.set(zs(t,s.x,o.x,r.x,a.x),zs(t,s.y,o.y,r.y,a.y),zs(t,s.z,o.z,r.z,a.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Zm extends qn{constructor(t=new Tt,e=new Tt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new Tt){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new Tt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Km extends qn{constructor(t=new b,e=new b){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new b){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new b){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Jm extends qn{constructor(t=new Tt,e=new Tt,i=new Tt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new Tt){const i=e,s=this.v0,o=this.v1,r=this.v2;return i.set(Ns(t,s.x,o.x,r.x),Ns(t,s.y,o.y,r.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class nu extends qn{constructor(t=new b,e=new b,i=new b){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new b){const i=e,s=this.v0,o=this.v1,r=this.v2;return i.set(Ns(t,s.x,o.x,r.x),Ns(t,s.y,o.y,r.y),Ns(t,s.z,o.z,r.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class jm extends qn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new Tt){const i=e,s=this.points,o=(s.length-1)*t,r=Math.floor(o),a=o-r,l=s[r===0?r:r-1],c=s[r],u=s[r>s.length-2?s.length-1:r+1],d=s[r>s.length-3?s.length-1:r+2];return i.set(ac(a,l.x,c.x,u.x,d.x),ac(a,l.y,c.y,u.y,d.y)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(new Tt().fromArray(s))}return this}}var Qm=Object.freeze({__proto__:null,ArcCurve:Bm,CatmullRomCurve3:Je,CubicBezierCurve:Ym,CubicBezierCurve3:$m,EllipseCurve:eu,LineCurve:Zm,LineCurve3:Km,QuadraticBezierCurve:Jm,QuadraticBezierCurve3:nu,SplineCurve:jm});class ci extends Ee{constructor(t=1,e=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:i,thetaLength:s},e=Math.max(3,e);const o=[],r=[],a=[],l=[],c=new b,u=new Tt;r.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let d=0,h=3;d<=e;d++,h+=3){const p=i+d/e*s;c.x=t*Math.cos(p),c.y=t*Math.sin(p),r.push(c.x,c.y,c.z),a.push(0,0,1),u.x=(r[h]/t+1)/2,u.y=(r[h+1]/t+1)/2,l.push(u.x,u.y)}for(let d=1;d<=e;d++)o.push(d,d+1,0);this.setIndex(o),this.setAttribute("position",new xe(r,3)),this.setAttribute("normal",new xe(a,3)),this.setAttribute("uv",new xe(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ci(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class St extends Ee{constructor(t=1,e=1,i=1,s=32,o=1,r=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:s,heightSegments:o,openEnded:r,thetaStart:a,thetaLength:l};const c=this;s=Math.floor(s),o=Math.floor(o);const u=[],d=[],h=[],p=[];let f=0;const M=[],g=i/2;let m=0;x(),r===!1&&(t>0&&w(!0),e>0&&w(!1)),this.setIndex(u),this.setAttribute("position",new xe(d,3)),this.setAttribute("normal",new xe(h,3)),this.setAttribute("uv",new xe(p,2));function x(){const S=new b,z=new b;let P=0;const I=(e-t)/i;for(let L=0;L<=o;L++){const y=[],_=L/o,A=_*(e-t)+t;for(let U=0;U<=s;U++){const O=U/s,K=O*l+a,tt=Math.sin(K),J=Math.cos(K);z.x=A*tt,z.y=-_*i+g,z.z=A*J,d.push(z.x,z.y,z.z),S.set(tt,I,J).normalize(),h.push(S.x,S.y,S.z),p.push(O,1-_),y.push(f++)}M.push(y)}for(let L=0;L<s;L++)for(let y=0;y<o;y++){const _=M[y][L],A=M[y+1][L],U=M[y+1][L+1],O=M[y][L+1];(t>0||y!==0)&&(u.push(_,A,O),P+=3),(e>0||y!==o-1)&&(u.push(A,U,O),P+=3)}c.addGroup(m,P,0),m+=P}function w(S){const z=f,P=new Tt,I=new b;let L=0;const y=S===!0?t:e,_=S===!0?1:-1;for(let U=1;U<=s;U++)d.push(0,g*_,0),h.push(0,_,0),p.push(.5,.5),f++;const A=f;for(let U=0;U<=s;U++){const K=U/s*l+a,tt=Math.cos(K),J=Math.sin(K);I.x=y*J,I.y=g*_,I.z=y*tt,d.push(I.x,I.y,I.z),h.push(0,_,0),P.x=tt*.5+.5,P.y=J*.5*_+.5,p.push(P.x,P.y),f++}for(let U=0;U<s;U++){const O=z+U,K=A+U;S===!0?u.push(K,K+1,O):u.push(K+1,K,O),L+=3}c.addGroup(m,L,S===!0?1:2),m+=L}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new St(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class an extends St{constructor(t=1,e=1,i=32,s=1,o=!1,r=0,a=Math.PI*2){super(0,t,e,i,s,o,r,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:i,heightSegments:s,openEnded:o,thetaStart:r,thetaLength:a}}static fromJSON(t){return new an(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Ko extends Ee{constructor(t=[],e=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:i,detail:s};const o=[],r=[];a(s),c(i),u(),this.setAttribute("position",new xe(o,3)),this.setAttribute("normal",new xe(o.slice(),3)),this.setAttribute("uv",new xe(r,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(x){const w=new b,S=new b,z=new b;for(let P=0;P<e.length;P+=3)p(e[P+0],w),p(e[P+1],S),p(e[P+2],z),l(w,S,z,x)}function l(x,w,S,z){const P=z+1,I=[];for(let L=0;L<=P;L++){I[L]=[];const y=x.clone().lerp(S,L/P),_=w.clone().lerp(S,L/P),A=P-L;for(let U=0;U<=A;U++)U===0&&L===P?I[L][U]=y:I[L][U]=y.clone().lerp(_,U/A)}for(let L=0;L<P;L++)for(let y=0;y<2*(P-L)-1;y++){const _=Math.floor(y/2);y%2===0?(h(I[L][_+1]),h(I[L+1][_]),h(I[L][_])):(h(I[L][_+1]),h(I[L+1][_+1]),h(I[L+1][_]))}}function c(x){const w=new b;for(let S=0;S<o.length;S+=3)w.x=o[S+0],w.y=o[S+1],w.z=o[S+2],w.normalize().multiplyScalar(x),o[S+0]=w.x,o[S+1]=w.y,o[S+2]=w.z}function u(){const x=new b;for(let w=0;w<o.length;w+=3){x.x=o[w+0],x.y=o[w+1],x.z=o[w+2];const S=g(x)/2/Math.PI+.5,z=m(x)/Math.PI+.5;r.push(S,1-z)}f(),d()}function d(){for(let x=0;x<r.length;x+=6){const w=r[x+0],S=r[x+2],z=r[x+4],P=Math.max(w,S,z),I=Math.min(w,S,z);P>.9&&I<.1&&(w<.2&&(r[x+0]+=1),S<.2&&(r[x+2]+=1),z<.2&&(r[x+4]+=1))}}function h(x){o.push(x.x,x.y,x.z)}function p(x,w){const S=x*3;w.x=t[S+0],w.y=t[S+1],w.z=t[S+2]}function f(){const x=new b,w=new b,S=new b,z=new b,P=new Tt,I=new Tt,L=new Tt;for(let y=0,_=0;y<o.length;y+=9,_+=6){x.set(o[y+0],o[y+1],o[y+2]),w.set(o[y+3],o[y+4],o[y+5]),S.set(o[y+6],o[y+7],o[y+8]),P.set(r[_+0],r[_+1]),I.set(r[_+2],r[_+3]),L.set(r[_+4],r[_+5]),z.copy(x).add(w).add(S).divideScalar(3);const A=g(z);M(P,_+0,x,A),M(I,_+2,w,A),M(L,_+4,S,A)}}function M(x,w,S,z){z<0&&x.x===1&&(r[w]=x.x-1),S.x===0&&S.z===0&&(r[w]=z/2/Math.PI+.5)}function g(x){return Math.atan2(x.z,-x.x)}function m(x){return Math.atan2(-x.y,Math.sqrt(x.x*x.x+x.z*x.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ko(t.vertices,t.indices,t.radius,t.details)}}class Za extends Ko{constructor(t=1,e=0){const i=(1+Math.sqrt(5))/2,s=1/i,o=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-i,0,-s,i,0,s,-i,0,s,i,-s,-i,0,-s,i,0,s,-i,0,s,i,0,-i,0,-s,i,0,-s,-i,0,s,i,0,s],r=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(o,r,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Za(t.radius,t.detail)}}class Pi extends Ko{constructor(t=1,e=0){const i=(1+Math.sqrt(5))/2,s=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],o=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,o,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Pi(t.radius,t.detail)}}class ae extends Ee{constructor(t=1,e=32,i=16,s=0,o=Math.PI*2,r=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:s,phiLength:o,thetaStart:r,thetaLength:a},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));const l=Math.min(r+a,Math.PI);let c=0;const u=[],d=new b,h=new b,p=[],f=[],M=[],g=[];for(let m=0;m<=i;m++){const x=[],w=m/i;let S=0;m===0&&r===0?S=.5/e:m===i&&l===Math.PI&&(S=-.5/e);for(let z=0;z<=e;z++){const P=z/e;d.x=-t*Math.cos(s+P*o)*Math.sin(r+w*a),d.y=t*Math.cos(r+w*a),d.z=t*Math.sin(s+P*o)*Math.sin(r+w*a),f.push(d.x,d.y,d.z),h.copy(d).normalize(),M.push(h.x,h.y,h.z),g.push(P+S,1-w),x.push(c++)}u.push(x)}for(let m=0;m<i;m++)for(let x=0;x<e;x++){const w=u[m][x+1],S=u[m][x],z=u[m+1][x],P=u[m+1][x+1];(m!==0||r>0)&&p.push(w,S,P),(m!==i-1||l<Math.PI)&&p.push(S,z,P)}this.setIndex(p),this.setAttribute("position",new xe(f,3)),this.setAttribute("normal",new xe(M,3)),this.setAttribute("uv",new xe(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ae(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Hn extends Ee{constructor(t=1,e=.4,i=12,s=48,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:s,arc:o},i=Math.floor(i),s=Math.floor(s);const r=[],a=[],l=[],c=[],u=new b,d=new b,h=new b;for(let p=0;p<=i;p++)for(let f=0;f<=s;f++){const M=f/s*o,g=p/i*Math.PI*2;d.x=(t+e*Math.cos(g))*Math.cos(M),d.y=(t+e*Math.cos(g))*Math.sin(M),d.z=e*Math.sin(g),a.push(d.x,d.y,d.z),u.x=t*Math.cos(M),u.y=t*Math.sin(M),h.subVectors(d,u).normalize(),l.push(h.x,h.y,h.z),c.push(f/s),c.push(p/i)}for(let p=1;p<=i;p++)for(let f=1;f<=s;f++){const M=(s+1)*p+f-1,g=(s+1)*(p-1)+f-1,m=(s+1)*(p-1)+f,x=(s+1)*p+f;r.push(M,g,x),r.push(g,m,x)}this.setIndex(r),this.setAttribute("position",new xe(a,3)),this.setAttribute("normal",new xe(l,3)),this.setAttribute("uv",new xe(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Hn(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class ds extends Ee{constructor(t=new nu(new b(-1,-1,0),new b(-1,1,0),new b(1,1,0)),e=64,i=1,s=8,o=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:i,radialSegments:s,closed:o};const r=t.computeFrenetFrames(e,o);this.tangents=r.tangents,this.normals=r.normals,this.binormals=r.binormals;const a=new b,l=new b,c=new Tt;let u=new b;const d=[],h=[],p=[],f=[];M(),this.setIndex(f),this.setAttribute("position",new xe(d,3)),this.setAttribute("normal",new xe(h,3)),this.setAttribute("uv",new xe(p,2));function M(){for(let w=0;w<e;w++)g(w);g(o===!1?e:0),x(),m()}function g(w){u=t.getPointAt(w/e,u);const S=r.normals[w],z=r.binormals[w];for(let P=0;P<=s;P++){const I=P/s*Math.PI*2,L=Math.sin(I),y=-Math.cos(I);l.x=y*S.x+L*z.x,l.y=y*S.y+L*z.y,l.z=y*S.z+L*z.z,l.normalize(),h.push(l.x,l.y,l.z),a.x=u.x+i*l.x,a.y=u.y+i*l.y,a.z=u.z+i*l.z,d.push(a.x,a.y,a.z)}}function m(){for(let w=1;w<=e;w++)for(let S=1;S<=s;S++){const z=(s+1)*(w-1)+(S-1),P=(s+1)*w+(S-1),I=(s+1)*w+S,L=(s+1)*(w-1)+S;f.push(z,P,L),f.push(P,I,L)}}function x(){for(let w=0;w<=e;w++)for(let S=0;S<=s;S++)c.x=w/e,c.y=S/s,p.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new ds(new Qm[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}class q extends Xn{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Et(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Et(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ba,this.normalScale=new Tt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new yn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Oe extends Xn{static get type(){return"MeshLambertMaterial"}constructor(t){super(),this.isMeshLambertMaterial=!0,this.color=new Et(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Et(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ba,this.normalScale=new Tt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new yn,this.combine=Ia,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Jo extends Pe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Et(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class iu extends Jo{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Pe.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Et(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Lr=new _e,lc=new b,cc=new b;class su{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Tt(512,512),this.map=null,this.mapPass=null,this.matrix=new _e,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ha,this._frameExtents=new Tt(1,1),this._viewportCount=1,this._viewports=[new me(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;lc.setFromMatrixPosition(t.matrixWorld),e.position.copy(lc),cc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(cc),e.updateMatrixWorld(),Lr.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Lr),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Lr)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const uc=new _e,As=new b,Ir=new b;class tg extends su{constructor(){super(new Se(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Tt(4,2),this._viewportCount=6,this._viewports=[new me(2,1,1,1),new me(0,1,1,1),new me(3,1,1,1),new me(1,1,1,1),new me(3,0,1,1),new me(1,0,1,1)],this._cubeDirections=[new b(1,0,0),new b(-1,0,0),new b(0,0,1),new b(0,0,-1),new b(0,1,0),new b(0,-1,0)],this._cubeUps=[new b(0,1,0),new b(0,1,0),new b(0,1,0),new b(0,1,0),new b(0,0,1),new b(0,0,-1)]}updateMatrices(t,e=0){const i=this.camera,s=this.matrix,o=t.distance||i.far;o!==i.far&&(i.far=o,i.updateProjectionMatrix()),As.setFromMatrixPosition(t.matrixWorld),i.position.copy(As),Ir.copy(i.position),Ir.add(this._cubeDirections[e]),i.up.copy(this._cubeUps[e]),i.lookAt(Ir),i.updateMatrixWorld(),s.makeTranslation(-As.x,-As.y,-As.z),uc.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(uc)}}class Ka extends Jo{constructor(t,e,i=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new tg}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class eg extends su{constructor(){super(new $c(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class ou extends Jo{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Pe.DEFAULT_UP),this.updateMatrix(),this.target=new Pe,this.shadow=new eg}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class ru extends Jo{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}const dc=new _e;class ng{constructor(t,e,i=0,s=1/0){this.ray=new qo(t,e),this.near=i,this.far=s,this.camera=null,this.layers=new Ga,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return dc.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(dc),this}intersectObject(t,e=!0,i=[]){return Ra(t,this,i,e),i.sort(hc),i}intersectObjects(t,e=!0,i=[]){for(let s=0,o=t.length;s<o;s++)Ra(t[s],this,i,e);return i.sort(hc),i}}function hc(n,t){return n.distance-t.distance}function Ra(n,t,e,i){let s=!0;if(n.layers.test(t.layers)&&n.raycast(t,e)===!1&&(s=!1),s===!0&&i===!0){const o=n.children;for(let r=0,a=o.length;r<a;r++)Ra(o[r],t,e,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:La}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=La);let ge=!1;function ig(n){ge=n}function Fs(){return ge}const Jt={skyTop:15391936,skyMid:15786952,skyHorizon:16116950,sun:15317355,ground:14008723,groundDark:12823420,walnut:5917238,walnutDark:4338986,bronze:10125655,terracotta:12618344,amber:13608308,hill:13023379,path:16777215,pathEdge:15789280};function Mn(n,t){const e=document.createElement("canvas");e.width=128,e.height=128;const i=e.getContext("2d"),s=i.createRadialGradient(64,64,64*n,64,64,64);s.addColorStop(0,t),s.addColorStop(1,"rgba(0,0,0,0)"),i.fillStyle=s,i.fillRect(0,0,128,128);const o=new We(e);return o.colorSpace=fe,o}function fc(n,t,e){const i=t.split(" "),s=[];let o="";for(const r of i){const a=o?o+" "+r:r;n.measureText(a).width>e&&o?(s.push(o),o=r):o=a}return o&&s.push(o),s}function au(){const n=document.createElement("canvas");n.width=256,n.height=256;const t=n.getContext("2d");t.fillStyle="#cdb98c",t.fillRect(0,0,256,256);for(let i=0;i<26;i++){const s=172+Math.random()*34;t.fillStyle=`rgba(${s|0},${s*.93|0},${s*.74|0},${(.05+Math.random()*.1).toFixed(3)})`,t.beginPath(),t.ellipse(Math.random()*256,Math.random()*256,14+Math.random()*30,10+Math.random()*22,Math.random()*Math.PI,0,Math.PI*2),t.fill()}for(let i=0;i<2200;i++){const s=168+Math.random()*42;t.fillStyle=`rgba(${s|0},${s*.92|0},${s*.72|0},${(Math.random()*.16).toFixed(3)})`,t.fillRect(Math.random()*256,Math.random()*256,2+Math.random()*4,2+Math.random()*4)}for(let i=0;i<120;i++)t.fillStyle="rgba(110,86,52,"+(.12+Math.random()*.2).toFixed(3)+")",t.beginPath(),t.arc(Math.random()*256,Math.random()*256,1+Math.random()*2,0,Math.PI*2),t.fill();const e=new We(n);return e.colorSpace=fe,e.wrapS=e.wrapT=li,e.repeat.set(ge?48:90,ge?48:90),e.anisotropy=ge?2:8,e}function Qi(){const n=document.createElement("canvas");n.width=256,n.height=256;const t=n.getContext("2d");t.fillStyle="#212429",t.fillRect(0,0,256,256);for(let i=0;i<4600;i++){const s=26+Math.random()*40;t.fillStyle=`rgba(${s|0},${s*.98|0},${s*1.04|0},${(Math.random()*.28).toFixed(3)})`,t.fillRect(Math.random()*256,Math.random()*256,1+Math.random()*2,1+Math.random()*2)}for(let i=0;i<700;i++)t.fillStyle=`rgba(118,124,134,${(Math.random()*.1).toFixed(3)})`,t.fillRect(Math.random()*256,Math.random()*256,1+Math.random()*2,1+Math.random()*2);for(const i of[42,178]){const s=t.createLinearGradient(i,0,i+34,256);s.addColorStop(0,"rgba(8,10,12,0)"),s.addColorStop(.5,"rgba(8,10,12,0.5)"),s.addColorStop(1,"rgba(8,10,12,0)"),t.fillStyle=s,t.fillRect(i,0,34,256)}t.fillStyle="rgba(6,8,11,0.38)",t.fillRect(127,0,2,256);const e=new We(n);return e.colorSpace=fe,e.wrapS=e.wrapT=li,e.repeat.set(1,60),e.anisotropy=ge?2:8,e}function Nn(n,t,e,i,s=500,o=!1){const r=n.getSpacedPoints(s),a=new Float32Array((s+1)*6),l=new Float32Array((s+1)*4),c=new Uint32Array(s*6);for(let h=0;h<=s;h++){const p=r[Math.min(h,s-1)],f=r[Math.min(h+1,s-1)],M=new b().subVectors(f,p).normalize(),g=new b(-M.z,0,M.x).normalize(),m=p.clone().add(g.clone().multiplyScalar(-t/2)),x=p.clone().add(g.clone().multiplyScalar(t/2)),w=h*6;if(a[w]=m.x,a[w+1]=m.y,a[w+2]=m.z,a[w+3]=x.x,a[w+4]=x.y,a[w+5]=x.z,l[h*4]=0,l[h*4+1]=h/s,l[h*4+2]=1,l[h*4+3]=h/s,h<s){const S=h*2,z=h*2+1,P=h*2+2,I=h*2+3,L=h*6;c[L]=S,c[L+1]=P,c[L+2]=z,c[L+3]=z,c[L+4]=P,c[L+5]=I}}const u=new Ee;u.setAttribute("position",new Ne(a,3)),u.setAttribute("uv",new Ne(l,2)),u.setIndex(new Ne(c,1)),u.computeVertexNormals();const d=new C(u,o?new Ge({color:e,side:ke}):new q({color:e,roughness:.85,metalness:.02,map:i||null,side:ke}));return d.receiveShadow=!0,d}function lu(n,t,e,i,s){const o=new yt,r=t.getPointAt(e),a=t.getTangentAt(e),c=new b(-a.z,0,a.x).normalize().clone().multiplyScalar(i*7.4),u=s%3-1;o.position.set(r.x+c.x+u*.5,0,r.z+c.z+u*.5);const d=t.getPointAt(Math.max(0,e-.035)),h=new b().subVectors(d,o.position).normalize(),p=Math.atan2(h.x,h.z);o.rotation.y=p;const f=new q({color:Jt.walnut,roughness:.8,metalness:.05}),M=new C(new rt(6.6,4.4,.22),f);M.position.y=3,M.castShadow=!0,o.add(M);const g=new q({color:12035198,roughness:.92}),m=new C(new rt(5.6,.4,.8),g);m.position.y=.2,m.castShadow=!0,o.add(m);const x=new q({color:10125655,roughness:.9}),w=new q({color:4338986,roughness:1}),S=new q({color:6257226,roughness:1,flatShading:!0});for(const ct of[-2.9,2.9]){const dt=new C(new rt(.5,.34,.5),x);dt.position.set(ct,.17,.55),o.add(dt);const It=new C(new rt(.42,.1,.42),w);It.position.set(ct,.34,.55),o.add(It);for(const Wt of[-.1,.12]){const oe=new C(new Pi(.14,1),S);oe.position.set(ct+Wt,.42,.55),o.add(oe);const j=new C(new ae(.05,6,5),new q({color:ct<0?12618344:13608308,roughness:.9}));j.position.set(ct+Wt,.52,.55),o.add(j)}}const z=new q({color:Jt.bronze,roughness:.75,metalness:.12}),P=new C(new rt(7,.26,.3),z);P.position.y=5.32,o.add(P);const I=new C(new rt(7,.26,.3),z);I.position.y=.72,o.add(I);for(const ct of[-3.5,3.5]){const dt=new C(new rt(.26,4.8,.3),z);dt.position.set(ct,3,0),o.add(dt)}const L=new q({color:Jt.walnutDark,roughness:.7,metalness:.1});for(const ct of[-2.5,2.5]){const dt=new C(new rt(.32,.8,.32),L);dt.position.set(ct,.4,0),dt.castShadow=!0,o.add(dt)}const y=ge?640:1024,_=ge?480:768,A=document.createElement("canvas");A.width=y,A.height=_,sg(A.getContext("2d"),n,s,y,_);const U=new We(A);U.colorSpace=fe,U.anisotropy=ge?2:8;const O=new Oe({map:U});O.emissive=new Et(16777215),O.emissiveIntensity=0;const K=new C(new qt(6.2,4),O);K.position.set(0,3,.125),o.add(K);const tt=new C(new qt(6.2,4),new q({color:Jt.walnutDark,roughness:.9}));tt.position.set(0,3,-.125),tt.rotation.y=Math.PI,o.add(tt);const J=ge?null:new Ka(15246172,0,26,2);J&&(J.position.set(0,3.3,2.4),o.add(J));const st=new q({color:Jt.amber,emissive:Jt.amber,emissiveIntensity:.22}),$=new C(new ae(.09,12,12),st);return $.position.set(0,5.52,0),o.add($),{group:o,frontMat:O,light:J,beaconMat:st,front:K,restRot:p}}function sg(n,t,e,i=1024,s=768){const o=i,r=s;n.scale(i/1024,s/768);const a=n.createLinearGradient(0,0,0,r);a.addColorStop(0,"#fdf8ec"),a.addColorStop(1,"#f1e6cb"),n.fillStyle=a,n.fillRect(0,0,o,r),n.globalAlpha=.045;for(let d=0;d<900;d++)n.fillStyle=Math.random()>.5?"#7a5f38":"#ffffff",n.fillRect(Math.random()*o,Math.random()*r,2,2);n.globalAlpha=1,n.strokeStyle="rgba(122,95,56,0.3)",n.lineWidth=3,n.strokeRect(34,34,o-68,r-68),n.fillStyle="#c08a68";for(const[d,h,p,f]of[[34,34,1,1],[o-34,34,-1,1],[34,r-34,1,-1],[o-34,r-34,-1,-1]])n.fillRect(d+p*8,h+f*8,26*p,4*f),n.fillRect(d+p*8,h+f*8,4*p,26*f);n.fillStyle="#7a5f38",n.font="500 26px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",n.textAlign="left",n.letterSpacing="6px",n.fillText(t.kicker.toUpperCase(),70,96),n.letterSpacing="0px",n.fillStyle="rgba(207,165,116,0.18)",n.font="600 300px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",n.textAlign="right",n.fillText(t.num,o-60,360),n.fillStyle="#c08a68",n.fillRect(70,132,90,4),n.fillStyle="#3a2e1f",n.font="600 62px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",n.textAlign="left";const l=fc(n,t.title,860);let c=210;if(l.slice(0,4).forEach(d=>{n.fillText(d,70,c),c+=70}),c+=18,t.id!=="quiz"&&t.bullets.length){n.fillStyle="rgba(122,95,56,0.45)",n.fillRect(70,c-6,60,2),c+=26,n.font="400 30px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif";const d=[];t.bullets.slice(0,4).forEach(h=>d.push(...fc(n,h,840))),d.slice(0,5).forEach(h=>{n.fillStyle="#c08a68",n.beginPath(),n.arc(78,c-10,4,0,Math.PI*2),n.fill(),n.fillStyle="#4c3d28",n.fillText(h,100,c),c+=40})}n.fillStyle="rgba(122,95,56,0.7)",n.font="400 22px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",n.textAlign="left",n.letterSpacing="3px",n.fillText("MODULE 1 · DOMAINE PUBLIC",70,r-62),n.fillStyle="rgba(170,120,85,0.8)",n.textAlign="right",n.fillText(String(e+1).padStart(2,"0")+" / 13",o-70,r-62),n.letterSpacing="0px";const u=n.createRadialGradient(o/2,r/2,o*.3,o/2,r/2,o*.62);u.addColorStop(0,"rgba(0,0,0,0)"),u.addColorStop(.6,"rgba(0,0,0,0)"),u.addColorStop(1,"rgba(150,120,75,0.22)"),n.fillStyle=u,n.fillRect(0,0,o,r)}function Pa(n,t,e,i,s){const o=document.createElement("canvas");o.width=64,o.height=128;const r=o.getContext("2d");r.fillStyle="#dccda8",r.fillRect(0,0,64,128);for(let u=0;u<9;u++)for(let d=0;d<4;d++){const h=Math.random();h<.3?(r.fillStyle=Math.random()<.3?"#c08a68":"#c9a25f",r.globalAlpha=.35+Math.random()*.35,r.fillRect(4+d*14+Math.random()*4,6+u*13+Math.random()*3,5,7),r.globalAlpha=1):h<.42&&(r.fillStyle="#6a5a38",r.globalAlpha=.35,r.fillRect(4+d*14,6+u*13,5,7),r.globalAlpha=1)}const a=new We(o);a.colorSpace=fe,a.repeat.set(1,Math.max(1,Math.round(t/6))),a.wrapS=li,a.wrapT=li,a.anisotropy=ge?1:4;const l=new q({map:a,roughness:.9,metalness:0});l.emissive=new Et(16763274),l.emissiveMap=a,l.emissiveIntensity=0;const c=new C(new rt(n,t,e),l);return c.position.set(s,t/2-.3,i),c.rotation.y=(Math.random()-.5)*.5,c.castShadow=!0,c}function Ls(n,t){const e=new yt;e.position.copy(n);const i=new q({color:Jt.walnutDark,roughness:.6,metalness:.3}),s=new C(new St(.07,.1,5.6,8),i);s.position.y=2.8,e.add(s);const o=new C(new rt(1.7,.1,.1),i);o.position.set(t*.85,5.5,0),e.add(o);const r=new q({color:Jt.amber,emissive:Jt.amber,emissiveIntensity:.25}),a=new C(new ae(.16,12,12),r);return a.position.set(t*1.7,5.5,0),e.add(a),e}function og(n,t){const e=new q({color:new Et(Jt.groundDark).lerp(new Et(Jt.ground),Math.random()),roughness:1,flatShading:!0}),i=new C(new Pi(t,1),e);return i.position.set(n.x,-.15,n.z),i.scale.set(1,.32,1),i.rotation.y=Math.random()*Math.PI,i}function rg(n,t){const e=new q({color:10127976,roughness:.95,flatShading:!0}),i=new C(new Za(t,0),e);return i.position.set(n.x,t*.4,n.z),i.rotation.set(Math.random(),Math.random()*Math.PI,Math.random()),i}function ag(n=420){const t=n,e=new Float32Array(t*3),i=new Je([new b(0,0,0),new b(0,0,120),new b(0,0,240),new b(0,0,360),new b(0,0,468)],!1,"centripetal");for(let r=0;r<t;r++){const a=Math.random(),l=i.getPointAt(a);e[r*3]=l.x+(Math.random()-.5)*24,e[r*3+1]=.4+Math.random()*6,e[r*3+2]=l.z+(Math.random()-.5)*24}const s=new Ee;s.setAttribute("position",new Ne(e,3));const o=new Zo({color:Jt.amber,transparent:!0,opacity:.5,blending:nn,depthWrite:!1,size:.35,sizeAttenuation:!0});return new Ya(s,o)}function lg(){const n=new yt,t=new Ge({color:4864550,transparent:!0,opacity:.9,side:ke}),e=new qt(.55,.18),i=new C(e,t);i.position.x=-.3;const s=new C(e,t);s.position.x=.3;const o=new C(new qt(.34,.07),t);return o.rotation.z=Math.PI/2,n.add(i,s,o),n.scale.setScalar(1.3),{g:n,l:i,r:s}}function cu(n,t=1){const e=new yt,i=new q({color:9071429,roughness:.95,flatShading:!0}),s=new C(new St(.09,.18,3.2,6),i);s.position.y=1.6,s.rotation.z=(Math.random()-.5)*.22,s.castShadow=!0,e.add(s);const o=new q({color:6257226,roughness:1,flatShading:!0}),r=7;for(let l=0;l<r;l++){const c=l/r*Math.PI*2,u=new C(new ae(1,7,5),o);u.position.set(Math.cos(c)*1.15,3.05,Math.sin(c)*1.15),u.scale.set(1.15,.28,.55),u.rotation.y=c,e.add(u)}const a=new C(new ae(.28,8,6),o);return a.position.y=3.15,e.add(a),e.position.copy(n),e.scale.setScalar(t),e}function cg(n,t=1){const e=new yt,i=new q({color:7045971,roughness:1,flatShading:!0});for(let s=0;s<5;s++){const o=new C(new Pi(.3+Math.random()*.24,1),i);o.position.set((Math.random()-.5)*.7,.22+Math.random()*.3,(Math.random()-.5)*.7),e.add(o)}return e.position.copy(n),e.scale.setScalar(t),e}function ug(n,t=1){const e=new yt,i=new q({color:16183261,roughness:1,flatShading:!0,transparent:!0,opacity:.92});for(let s=0;s<6;s++){const o=new C(new ae(1.1+Math.random()*1.4,9,7),i);o.position.set(s*1.6-4,Math.random()*.9,(Math.random()-.5)*2),o.scale.y=.5,e.add(o)}return e.position.copy(n),e.scale.setScalar(t),e}function dg(n,t,e){const i=new yt;i.position.copy(n);const s=new q({color:Jt.walnutDark,roughness:.7,metalness:.2}),o=new C(new St(.1,.14,2.1,8),s);o.position.y=1.05,o.castShadow=!0,i.add(o);const r=new C(new rt(.9,.08,.14),s);r.position.set(0,1.85,0),r.rotation.z=Math.PI/2,i.add(r);const a=ge?256:512,l=ge?160:320,c=document.createElement("canvas");c.width=a,c.height=l;const u=c.getContext("2d");u.scale(a/512,l/320),u.fillStyle="#f7eeda",u.fillRect(0,0,512,320),u.strokeStyle="rgba(138,111,69,0.6)",u.lineWidth=8,u.strokeRect(12,12,488,296);const d=u.createLinearGradient(0,0,512,0);d.addColorStop(0,"#c08a68"),d.addColorStop(1,"#cfa574"),u.fillStyle=d,u.fillRect(0,52,512,10),u.textAlign="center",u.fillStyle="#3a2e1f",u.font="700 42px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",e.forEach((g,m)=>u.fillText(g,256,122+m*50));const h=new We(c);h.colorSpace=fe,h.anisotropy=ge?2:8;const p=new Oe({map:h}),f=new C(new qt(1.7,1.06),p);f.position.y=2.28;const M=new yt;return M.add(f),M.rotation.y=t,i.add(M),{group:i,sign:f}}function hg(n,t,e,i){const s=new q({color:Jt.hill,roughness:1,flatShading:!0}),o=new C(new Pi(1,2),s);return o.scale.set(t,e,i),o.position.set(n.x,n.y,n.z),o.rotation.y=Math.random()*Math.PI,o.castShadow=!0,o}function Is(n,t){const e=new yt;e.position.copy(n);const i=new Gn(new Tn({map:Mn(0,"rgba(255,190,120,0.3)"),transparent:!0,blending:nn,depthWrite:!1,depthTest:!1}));i.scale.setScalar(3.6),i.position.set(t*1.7,5.5,0),e.add(i);const s=new C(new ci(3.8,24),new Ge({map:Mn(.12,"rgba(255,180,110,0.32)"),transparent:!0,blending:nn,depthWrite:!1}));return s.rotation.x=-Math.PI/2,s.position.y=.03,e.add(s),{group:e,glow:i,pool:s}}function Oo(){const n=new yt,t=Math.random()<.5?12618344:Math.random()<.5?13805688:7035458,e=new q({color:t,roughness:.45,metalness:.35}),i=new q({color:3813154,roughness:.5,metalness:.4}),s=new C(new rt(1.5,.5,3.2),e);s.position.y=.5,s.castShadow=!0,n.add(s);const o=new C(new rt(1.3,.24,1),i);o.position.set(0,.72,1.15),n.add(o);const r=new C(new rt(1.12,.46,1.5),i);r.position.set(0,.95,-.2),r.castShadow=!0,n.add(r);const a=new q({color:8364973,roughness:.15,metalness:.6});for(const[h,p]of[[0,-.95],[0,.5]]){const f=new C(new rt(1.14,.38,.05),a);f.position.set(h,.96,p),n.add(f)}const l=new q({color:3023896,roughness:.9});for(const[h,p]of[[-.78,1.05],[.78,1.05],[-.78,-1.05],[.78,-1.05]]){const f=new C(new St(.32,.32,.22,14),l);f.rotation.x=Math.PI/2,f.rotation.z=Math.PI/2,f.position.set(h,.32,p),n.add(f)}const c=new q({color:16773839,emissive:16769184,emissiveIntensity:.5});for(const h of[-.55,.55]){const p=new C(new ae(.09,8,8),c);p.position.set(h,.55,1.6),n.add(p)}const u=new q({color:9051670,emissive:9051670,emissiveIntensity:.3});for(const h of[-.55,.55]){const p=new C(new rt(.16,.1,.04),u);p.position.set(h,.55,-1.6),n.add(p)}const d=new Gn(new Tn({map:Mn(0,"rgba(255,226,175,0.4)"),transparent:!0,blending:nn,depthWrite:!1,depthTest:!1}));return d.scale.set(3.4,3.4,1),d.position.set(0,.55,2.8),n.add(d),{group:n,cone:d}}function Lo(n,t){const e=new yt;e.position.copy(n),e.rotation.y=t>0?Math.PI:0;const i=new q({color:9071429,roughness:.85}),s=new q({color:4864550,roughness:.7,metalness:.4}),o=new C(new rt(1.4,.08,.42),i);o.position.y=.42,e.add(o);const r=new C(new rt(1.4,.08,.4),i);r.position.set(0,.72,.18),e.add(r);for(const a of[-.6,.6]){const l=new C(new rt(.08,.42,.5),s);l.position.set(a,.21,0),e.add(l)}return e}function fg(){const n=document.createElement("canvas");n.width=256,n.height=256;const t=n.getContext("2d");t.fillStyle="#d3c096",t.fillRect(0,0,256,256),t.strokeStyle="rgba(122,95,56,0.35)",t.lineWidth=2,t.strokeRect(2,2,252,252);for(let i=64;i<256;i+=64)t.beginPath(),t.moveTo(i,2),t.lineTo(i,254),t.stroke(),t.beginPath(),t.moveTo(2,i),t.lineTo(254,i),t.stroke();for(let i=0;i<900;i++){const s=180+Math.random()*36;t.fillStyle=`rgba(${s|0},${s*.9|0},${s*.72|0},${(Math.random()*.16).toFixed(3)})`,t.fillRect(Math.random()*256,Math.random()*256,1+Math.random()*3,1+Math.random()*3)}const e=new We(n);return e.colorSpace=fe,e.wrapS=e.wrapT=li,e.repeat.set(ge?1:2,90),e.anisotropy=ge?2:8,e}function Dr(n,t=1){const e=new yt,i=new q({color:7031340,roughness:.95,flatShading:!0}),s=new C(new St(.1,.16,2.6,7),i);s.position.y=1.3,s.castShadow=!0,e.add(s);const o=new q({color:5599295,roughness:1,flatShading:!0});for(let r=0;r<3;r++){const a=new C(new ae(1.05-r*.18,8,6),o);a.position.set((Math.random()-.5)*.5,2.6+r*.65,(Math.random()-.5)*.5),a.scale.y=.85,a.castShadow=!0,e.add(a)}return e.position.copy(n),e.scale.setScalar(t),e}function pg(n,t=1,e=0){const i=new yt,s=[5599295,6585414],o=[12618344,13608308,10336383,14731680],r=a=>{const l=Math.sin(e*127.1+a*311.7)*43758.5453;return l-Math.floor(l)};for(let a=0;a<6;a++){const l=new C(new St(.015,.02,.32,4),new q({color:s[a%2],roughness:1}));l.position.set((r(a)-.5)*.5,.16,(r(a+13)-.5)*.5),i.add(l);const c=new C(new ae(.05,5,4),new q({color:o[(a+e)%o.length],roughness:.9}));c.position.set(l.position.x,.34,l.position.z),i.add(c)}return i.position.copy(n),i.scale.setScalar(t),i}function mg(n){const t=new yt;t.position.copy(n);const e=new q({color:4864550,roughness:.6,metalness:.5}),i=new C(new St(.24,.2,.72,10),e);i.position.y=.36,i.castShadow=!0,t.add(i);const s=new C(new St(.27,.27,.05,10),e);return s.position.y=.75,t.add(s),t}function gg(){const n=new yt,t=new q({color:10127994,roughness:.95,flatShading:!0}),e=new C(new ae(.11,8,6),t);e.scale.set(1,.8,1.4),e.position.y=.12,n.add(e);const i=new C(new ae(.055,8,6),t);i.position.set(0,.22,.1),n.add(i);const s=new C(new an(.02,.05,4),t);return s.rotation.x=Math.PI/2,s.position.set(0,.22,.16),n.add(s),n.rotation.y=Math.random()*Math.PI*2,n}function xn(n,t=4.6,e=3.2){const i=new C(new qt(t,e),new Ge({map:Mn(.35,"rgba(90,70,42,0.34)"),transparent:!0,depthWrite:!1}));return i.rotation.x=-Math.PI/2,i.position.set(n.x,.02,n.z),i}function _g(n,t=0,e=["PUBLICITÉ","URBAINE"]){const i=new yt;i.position.copy(n),i.rotation.y=t;const s=new q({color:15392706,roughness:.85}),o=new q({color:10850152,roughness:.7,metalness:.15}),r=new C(new St(.62,.68,2.5,18),s);r.position.y=1.25,r.castShadow=!0,i.add(r);const a=new C(new St(.72,.8,.22,18),o);a.position.y=.11,i.add(a);const l=new C(new St(.66,.72,.16,18),o);l.position.y=2.58,i.add(l);const c=new C(new ae(.2,10,8),o);c.position.y=2.75,i.add(c);const u=256,d=640,h=document.createElement("canvas");h.width=u,h.height=d;const p=h.getContext("2d"),f=p.createLinearGradient(0,0,0,d);f.addColorStop(0,"#f5ecd6"),f.addColorStop(1,"#ead9b4"),p.fillStyle=f,p.fillRect(0,0,u,d),p.strokeStyle="rgba(138,111,69,0.5)",p.lineWidth=10,p.strokeRect(10,10,u-20,d-20),p.fillStyle="#c08a68",p.fillRect(0,d*.14,u,14),p.textAlign="center",p.fillStyle="#3a2e1f",p.font="700 34px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",e.forEach((m,x)=>p.fillText(m,u/2,d*.3+x*56)),p.fillStyle="#8a6a4e",p.font="400 26px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",p.fillText("DOMAINE PUBLIC",u/2,d*.78);const M=new We(h);M.colorSpace=fe,M.anisotropy=ge?2:8;const g=new C(new qt(.92,2.5),new Oe({map:M}));return g.position.set(0,1.25,.55),i.add(g),i}function vg(n,t=1){const e=new yt;e.position.copy(n),e.rotation.y=t>0?0:Math.PI;const i=new q({color:4864550,roughness:.6,metalness:.45}),s=new q({color:12100725,roughness:.7,metalness:.2});for(const m of[-1.7,1.7]){const x=new C(new rt(.12,2.3,.12),i);x.position.set(m,1.15,.4),x.castShadow=!0,e.add(x)}const o=new C(new rt(4.2,.1,1.7),s);o.position.y=2.4,o.castShadow=!0,e.add(o);const r=new q({color:11060425,roughness:.1,metalness:.2,transparent:!0,opacity:.35}),a=new C(new qt(3.4,1.5),r);a.position.set(0,1.5,-.42),e.add(a);const l=new C(new qt(1.3,1.5),r);l.position.set(1.9,1.5,0),l.rotation.y=Math.PI/2,e.add(l);const c=320,u=200,d=document.createElement("canvas");d.width=c,d.height=u;const h=d.getContext("2d");h.fillStyle="#f2e7cd",h.fillRect(0,0,c,u),h.fillStyle="#cfa574",h.fillRect(0,0,c,40),h.textAlign="center",h.fillStyle="#3a2e1f",h.font="700 30px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",h.fillText("VOTRE ESPACE PUBLICITAIRE",c/2,105),h.font="400 20px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",h.fillStyle="#7a5f38",h.fillText("MODULE 1 · PANNEAUTIQUE",c/2,150);const p=new We(d);p.colorSpace=fe,p.anisotropy=ge?2:8;const f=new C(new qt(3.4,1.4),new Oe({map:p}));f.position.set(0,1.45,.42),e.add(f);const M=new q({color:9071429,roughness:.85}),g=new C(new rt(2.6,.07,.35),M);return g.position.set(0,.42,-.1),e.add(g),e}function Mg(n,t=13215868,e=0){const i=new yt;i.position.copy(n),i.rotation.y=e;const s=new q({color:5916210,roughness:.6,metalness:.4}),o=new q({color:9071429,roughness:.8}),r=new C(new St(.04,.06,.75,8),s);r.position.y=.38,i.add(r);const a=new C(new St(.42,.42,.06,14),o);a.position.y=.76,i.add(a);const l=new C(new St(.03,.03,1.5,8),s);l.position.y=1.1,i.add(l);const c=new C(new an(1.1,.28,10),new Oe({color:t}));c.position.y=1.95,i.add(c);for(const[u,d]of[[-.5,.5],[.5,.5],[-.5,-.5],[.5,-.5]]){const h=new C(new rt(.4,.1,.4),o);h.position.set(u,.42,d),i.add(h);const p=new C(new St(.025,.025,.42,6),s);p.position.set(u,.21,d),i.add(p)}return i.userData={parasol:c},i}function yg(n,t=0){const e=new yt;e.position.copy(n),e.rotation.y=t;const i=new q({color:9071182,roughness:.6,metalness:.2}),s=new q({color:3813154,roughness:.95}),o=.34;for(const u of[-.35,.35]){const d=new C(new Hn(o,.035,8,20),s);d.position.set(0,o,u),e.add(d)}const r=new C(new rt(.03,.03,.72),i);r.position.set(0,.66,0),e.add(r);const a=new C(new St(.02,.02,.62,6),i);a.position.set(0,.82,0),a.rotation.x=Math.PI/2,e.add(a);const l=new C(new St(.02,.02,.34,6),i);l.position.set(0,.98,.35),e.add(l);const c=new C(new rt(.14,.03,.08),i);return c.position.set(0,.84,-.32),e.add(c),e}function Sg(n,t=0,e="D"){const i=new yt;i.position.copy(n),i.rotation.y=t;const s=new q({color:4864550,roughness:.6,metalness:.4}),o=new C(new St(.03,.05,1.8,8),s);o.position.y=.9,o.castShadow=!0,i.add(o);const r=document.createElement("canvas");r.width=128,r.height=64;const a=r.getContext("2d");a.fillStyle="#e3d6b4",a.fillRect(0,0,128,64),a.fillStyle=e==="D"?"#c08a68":"#7d9a68",a.fillRect(0,0,26,64),a.strokeStyle="rgba(138,111,69,0.6)",a.lineWidth=4,a.strokeRect(2,2,124,60),a.textAlign="center",a.fillStyle="#3a2e1f",a.font="700 26px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",a.fillText(e,76,42);const l=new We(r);l.colorSpace=fe,l.anisotropy=ge?2:8;const c=new C(new qt(.7,.35),new Oe({map:l}));return c.position.y=1.9,i.add(c),i}function Ur(n,t=1.8,e=.6){const i=new yt;i.position.copy(n);const s=new q({color:6257226,roughness:1,flatShading:!0}),o=new C(new rt(t,e,.5),s);o.position.y=e/2,o.castShadow=!0,i.add(o);const r=Math.max(2,Math.round(t/.7));for(let a=0;a<r;a++){const l=new C(new Pi(.3,1),s);l.position.set(-t/2+.3+a*(t-.6)/(r-1),e+.18,0),i.add(l)}return i}const xg=[14266508,13146738,11567964,9068616,14727320].map(n=>new q({color:n,roughness:.85})),wg=[3023896,4863524,8215604,13215864,2236446].map(n=>new q({color:n,roughness:.9})),bg=[13215868,9415293,13608308,11052232,10336447,13805176,14726304,12108960].map(n=>new q({color:n,roughness:.85})),Eg=[4865070,6048314,4146772,6969924,5588028].map(n=>new q({color:n,roughness:.9})),Tg=new q({color:3023896,roughness:.8}),pc=new q({color:13610612,roughness:.9}),bo=n=>n[Math.random()*n.length|0];function Ag(){const n=new yt,t=.92+Math.random()*.18,e=.85+Math.random()*.32,i=bo(xg),s=bo(wg),o=bo(bg),r=bo(Eg),a=Tg,l=Math.random()<.22,c=Math.random()<.14,u=Math.random()<.16,d=.9*t,h=.105*e,p=y=>{const _=new yt;_.position.set(y,d,0);const A=new C(new St(.064,.05,.46*t,8),r);A.position.y=-.23*t,A.castShadow=!0,_.add(A);const U=new yt;U.position.y=-.46*t;const O=new C(new St(.05,.04,.44*t,8),r);O.position.y=-.22*t,U.add(O);const K=new C(new rt(.09,.07,.17),a);return K.position.set(0,-.44*t,.045),U.add(K),_.add(U),{leg:_,knee:U}},f=p(-h),M=p(h);n.add(f.leg,M.leg);const g=new yt;if(n.add(g),l){const y=new C(new an(.21*e,.34,12),o);y.position.y=.78*t,y.castShadow=!0,g.add(y)}const m=new C(new St(.175*e,.215*e,.54*t,12),o);m.position.y=1.2*t,m.castShadow=!0,g.add(m);const x=o;for(const y of[-.19*e,.19*e]){const _=new C(new ae(.075*e,8,6),x);_.position.set(y,1.42*t,0),g.add(_)}if(u){const y=new C(new rt(.15,.17,.06),r);y.position.set(.3*e,1.16*t,0),y.rotation.z=.18,g.add(y);const _=new C(new rt(.02,.3,.02),r);_.position.set(.26*e,1.32*t,0),_.rotation.z=.4,g.add(_)}const w=new C(new St(.045,.055,.12,8),i);w.position.y=1.5*t,g.add(w);const S=new C(new ae(.135,12,10),i);S.position.y=1.64*t,S.castShadow=!0,g.add(S);const z=new C(new ae(.15,10,8),s);if(z.position.set(0,1.66*t,-.02),z.scale.set(1,.78,1.06),g.add(z),c){const y=new C(new St(.19,.2,.03,12),pc);y.position.y=1.74*t,g.add(y);const _=new C(new ae(.1,10,8),pc);_.position.y=1.78*t,_.scale.set(1,.85,1),g.add(_)}const P=y=>{const _=new yt;_.position.set(y,1.4*t,0);const A=new C(new St(.055,.062,.26,8),o);A.position.y=-.13,A.castShadow=!0,_.add(A);const U=new yt;U.position.y=-.26;const O=new C(new St(.042,.05,.24,8),i);O.position.y=-.12,U.add(O);const K=new C(new ae(.05,8,6),i);return K.position.y=-.24,U.add(K),_.add(U),{arm:_,elbow:U}},I=P(-.235*e),L=P(.235*e);return g.add(I.arm,L.arm),{g:n,legL:f.leg,legR:M.leg,kneeL:f.knee,kneeR:M.knee,armL:I.arm,armR:L.arm,elbowL:I.elbow,elbowR:L.elbow,lean:g,phase:Math.random()*Math.PI*2}}function Cg(){const n=new yt,t=new q({color:13219985,roughness:.9}),e=new q({color:11048556,roughness:.9}),i=new q({color:11060425,roughness:.1,metalness:.2,transparent:!0,opacity:.75}),s=new C(new St(1.7,1.9,.5,20),t);s.position.y=.25,s.castShadow=!0,n.add(s);const o=new C(new Hn(1.8,.14,8,24),e);o.rotation.x=Math.PI/2,o.position.y=.5,n.add(o);const r=new C(new ci(1.62,20),i);r.rotation.x=-Math.PI/2,r.position.y=.31,n.add(r);const a=new C(new St(.16,.22,.8,10),e);a.position.y=.9,n.add(a);const l=new C(new St(.55,.35,.14,12),e);l.position.y=1.25,n.add(l);const c=new C(new St(.05,.05,.55,8),i);return c.position.y=1.6,n.add(c),n.userData={jet:c,pool:r,dish:l},n}function Rg(n,t=0,e=["ESPACE","PUBLICITAIRE"]){const i=new yt;i.position.copy(n),i.rotation.y=t;const s=new q({color:7035458,roughness:.7,metalness:.2}),o=new q({color:15260864,roughness:.85});for(const f of[-2.6,2.6]){const M=new C(new rt(.22,3.4,.22),s);M.position.set(f,1.7,0),M.castShadow=!0,i.add(M);const g=new C(new rt(.6,.12,.6),s);g.position.set(f,.06,0),i.add(g)}const r=new C(new rt(5.6,3.1,.14),o);r.position.y=3.6,r.castShadow=!0,i.add(r);const a=ge?320:640,l=ge?180:360,c=document.createElement("canvas");c.width=a,c.height=l;const u=c.getContext("2d"),d=u.createLinearGradient(0,0,0,l);d.addColorStop(0,"#f3e8cd"),d.addColorStop(1,"#e6d3a9"),u.fillStyle=d,u.fillRect(0,0,a,l),u.fillStyle="#c08a68",u.fillRect(0,0,a,l*.22),u.textAlign="center",u.fillStyle="#3a2e1f",u.font="700 "+l*.11+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",e.forEach((f,M)=>u.fillText(f,a/2,l*.42+M*(l*.16))),u.fillStyle="#7a5f38",u.font="400 "+l*.06+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",u.fillText("PANNEAUTIQUE · DOMAINE PUBLIC",a/2,l*.86);const h=new We(c);h.colorSpace=fe,h.anisotropy=ge?2:8;const p=new C(new qt(5.3,2.8),new q({map:h,emissive:16767392,emissiveMap:h,emissiveIntensity:0}));return p.position.set(0,3.6,.09),i.add(p),i.userData={face:p},i}function Pg(n,t=0){const e=new yt;e.position.copy(n),e.rotation.y=t;const i=new q({color:9071429,roughness:.85}),s=new q({color:6048304,roughness:.5,metalness:.4}),o=new C(new rt(1.9,2.2,1.5),i);o.position.y=1.1,o.castShadow=!0,e.add(o);const r=new C(new rt(2.4,.14,2),s);r.position.y=2.27,e.add(r);const a=new C(new qt(.34,.2),new Oe({color:13608308,side:ke}));a.position.set(1.05,2.42,.55),a.rotation.y=Math.PI/2,e.add(a);const l=new C(new rt(1.9,.5,.25),s);l.position.set(0,.9,.82),e.add(l);const c=new C(new rt(2.2,.06,.7),new q({color:12618344,roughness:.9}));c.position.set(0,1.65,.85),e.add(c);const u=document.createElement("canvas");u.width=128,u.height=96;const d=u.getContext("2d");d.fillStyle="#f2e7cd",d.fillRect(0,0,128,96),d.strokeStyle="rgba(138,111,69,0.6)",d.lineWidth=4,d.strokeRect(4,4,120,88),d.textAlign="center",d.fillStyle="#3a2e1f",d.font="700 20px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",d.fillText("LE QUOTIDIEN",64,40),d.font="400 15px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",d.fillStyle="#7a5f38",d.fillText("0,50 €",64,66);const h=new We(u);h.colorSpace=fe,h.anisotropy=ge?2:8;const p=new C(new qt(.7,.5),new q({map:h,emissive:16767392,emissiveMap:h,emissiveIntensity:0}));return p.position.set(0,1.35,.82),e.add(p),e.userData={flag:a,sign:p},e}function mc(n,t=0,e=13209450){const i=new yt;i.position.copy(n),i.rotation.y=t;const s=new q({color:9071429,roughness:.85});for(const p of[-1,1]){const f=new C(new rt(.08,1,.08),s);f.position.set(p,.5,0),f.castShadow=!0,i.add(f)}const o=new C(new rt(2,.12,.8),s);o.position.y=.97,i.add(o);const r=new C(new rt(2.2,.06,.9),s);r.position.y=1.03,i.add(r);const a=[12606026,13608308,8231528,9083576,13805176];for(let p=0;p<5;p++){const f=new C(new ae(.09,8,6),new q({color:a[p%a.length],roughness:.7}));f.position.set(-.8+p*.4,1.12,0),f.scale.y=.85,i.add(f)}const l=uu(2.4,.9,e);l.position.set(0,2.1,.3),i.add(l);const c=document.createElement("canvas");c.width=256,c.height=96;const u=c.getContext("2d");u.fillStyle="#f7eeda",u.fillRect(0,0,256,96),u.strokeStyle="rgba(138,111,69,0.6)",u.lineWidth=6,u.strokeRect(4,4,248,88),u.fillStyle="#3a2e1f",u.textAlign="center",u.font="700 34px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",u.fillText("MARCHÉ",128,60);const d=new We(c);d.colorSpace=fe;const h=new C(new qt(1.3,.5),new q({map:d,emissive:16767392,emissiveMap:d,emissiveIntensity:0}));return h.position.set(0,2.32,.05),i.add(h),i.userData={sign:h},i}function Lg(){const n=[9415293,7045971,13215868,13805176],t=new yt,e=new C(new qt(.16,.1),new Oe({color:n[Math.random()*n.length|0],side:ke,transparent:!0,opacity:.72}));return t.add(e),t}function Ig(n,t,e=[12618344,13608308,10336383,9083576,13805176],i=10,s=.7){const o=new yt,r=new b().addVectors(n,t).multiplyScalar(.5);o.position.copy(r);const a=new b().subVectors(t,n),l=e.map(f=>new Oe({color:f,side:ke})),c=new qt(.42,.3),u=Math.atan2(a.x,a.z),d=[],h=i*2;for(let f=0;f<=h;f++){const M=f/h,g=en.lerp(n.x,t.x,M)-r.x,m=en.lerp(n.y,t.y,M)-s*Math.sin(Math.PI*M)-r.y,x=en.lerp(n.z,t.z,M)-r.z;if(d.push(new b(g,m,x)),f%2===0){const w=new C(c,l[f/2%l.length]);w.position.set(g,m-.15,x),w.rotation.y=u,o.add(w)}}const p=new qa(new Ee().setFromPoints(d),new $o({color:9071182}));return o.add(p),o}function uu(n,t,e){const o=document.createElement("canvas");o.width=256,o.height=128;const r=o.getContext("2d"),a="#"+e.toString(16).padStart(6,"0"),l=8;for(let f=0;f<l;f++)r.fillStyle=f%2===0?a:"#f7eeda",r.fillRect(f*(256/l),0,256/l,128);const c=new We(o);c.colorSpace=fe,c.anisotropy=ge?1:4;const u=new Oe({map:c,side:ke}),d=new yt,h=new C(new qt(n,t),u);h.rotation.x=-.5,h.position.set(0,.15,.45),d.add(h);const p=new C(new qt(n,.2),u);return p.position.set(0,.1,t*.85),p.rotation.x=-.15,d.add(p),d}function Dg(n,t=0,e=13209450,i="BOUTIQUE"){const s=new yt;s.position.copy(n),s.rotation.y=t;const o=5,r=3.3,a=2.8,l=new Oe({color:15129019}),c=new C(new rt(o,r,a),l);c.position.y=r/2,c.castShadow=!0,s.add(c);const u=new C(new rt(o+.24,.2,a+.24),l);u.position.y=r+.1,s.add(u);const d=ge?256:512,h=ge?160:320,p=document.createElement("canvas");p.width=d,p.height=h;const f=p.getContext("2d");f.scale(d/512,h/320);const M=f.createLinearGradient(0,0,0,320);M.addColorStop(0,"#f2e6c9"),M.addColorStop(1,"#dccaa3"),f.fillStyle=M,f.fillRect(0,0,512,320);const g=["#c08a68","#7d9a68","#cfa574"];for(let z=0;z<3;z++){const P=30+z*160;f.fillStyle="rgba(122,95,56,0.5)",f.fillRect(P,192,120,10),f.fillStyle=g[z];for(let I=0;I<4;I++)f.beginPath(),f.arc(P+22+I*26,178,9,0,Math.PI*2),f.fill()}f.fillStyle="rgba(255,255,255,0.2)",f.beginPath(),f.moveTo(300,0),f.lineTo(430,0),f.lineTo(230,320),f.lineTo(100,320),f.closePath(),f.fill(),f.strokeStyle="#8a6a4e",f.lineWidth=12,f.strokeRect(6,6,500,308),f.fillStyle="#3a2e1f",f.font="700 36px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",f.textAlign="center",f.fillText(i,256,52);const m=new We(p);m.colorSpace=fe,m.anisotropy=ge?2:8;const x=new q({map:m,emissive:16767392,emissiveMap:m,emissiveIntensity:0}),w=new C(new qt(o*.8,r*.6),x);w.position.set(0,r*.52,a/2+.03),s.add(w);const S=uu(o*.84,.9,e);return S.position.set(0,r-.55,a/2-.2),s.add(S),s.userData={window:w},s}function Ug(){const n=new yt,t=new q({color:12618344,roughness:.5,metalness:.25});new q({color:4864550,roughness:.5,metalness:.3});const e=new q({color:9416888,roughness:.15,metalness:.5}),i=new C(new rt(2,1.3,5.6),t);i.position.y=1.15,i.castShadow=!0,n.add(i);const s=new C(new rt(1.8,.16,5.4),t);s.position.y=1.9,n.add(s);const o=new C(new rt(1.72,.52,5.2),e);o.position.y=1.56,n.add(o);const r=new C(new rt(1.8,.5,.06),e);r.position.set(0,1.5,2.8),n.add(r);const a=new q({color:3023896,roughness:.9});for(const[u,d]of[[-.95,1.7],[.95,1.7],[-.95,-1.7],[.95,-1.7]]){const h=new C(new St(.36,.36,.26,14),a);h.rotation.x=Math.PI/2,h.rotation.z=Math.PI/2,h.position.set(u,.36,d),n.add(h)}const l=new q({color:16773839,emissive:16769184,emissiveIntensity:.5});for(const u of[-.7,.7]){const d=new C(new ae(.1,8,8),l);d.position.set(u,1.05,2.82),n.add(d)}const c=new Gn(new Tn({map:Mn(0,"rgba(255,226,175,0.4)"),transparent:!0,blending:nn,depthWrite:!1,depthTest:!1}));return c.scale.set(4.2,4.2,1),c.position.set(0,1.1,4.6),n.add(c),{group:n,cone:c}}function Ng(){const n=new yt,t=new Oe({color:12159582}),e=new Oe({color:9069120}),i=new C(new rt(.3,.22,.55),t);i.position.y=.24,i.castShadow=!0,n.add(i);const s=new C(new rt(.16,.15,.18),t);s.position.set(0,.36,.33),n.add(s);const o=new C(new rt(.04,.09,.11),e);o.position.set(0,.45,.34),n.add(o);const r=new C(new rt(.05,.05,.2),t);r.position.set(0,.36,-.37),n.add(r);for(const[a,l]of[[-.11,.18],[.11,.18],[-.11,-.18],[.11,-.18]]){const c=new C(new rt(.06,.18,.06),t);c.position.set(a,.09,l),n.add(c)}return n.userData={tail:r},n}function zg(n){const t=new yt;t.position.copy(n);const e=new C(new St(.025,.025,1.1,6),new q({color:9071182,roughness:.8}));e.position.y=.55,t.add(e);const i=[12606026,13608308,8231528],s=[];for(let o=0;o<3;o++){const r=new C(new ae(.21,10,8),new Oe({color:i[o],emissive:i[o],emissiveIntensity:.08}));r.position.set((o-1)*.22,1.2+Math.sin(o*2.1)*.05,o%2*.12-.06),r.scale.set(1,1.2,1),t.add(r),s.push(r)}return t.userData={balloons:s},t}function Fg(n,t=0){const e=new yt;e.position.copy(n),e.rotation.y=t;const i=new q({color:3025446,roughness:.5,metalness:.5}),s=new C(new St(.045,.07,3.4,8),i);s.position.y=1.7,s.castShadow=!0,e.add(s);const o=new q({color:3816770,roughness:.6,metalness:.3}),r=new C(new rt(.32,.9,.26),o);r.position.y=2.9,e.add(r),[{c:13193026,y:3.24,on:.9},{c:14723130,y:2.9,on:.2},{c:6265944,y:2.56,on:.2}].forEach(c=>{const u=new C(new ae(.095,10,8),new q({color:1711136,emissive:c.c,emissiveIntensity:c.on,roughness:.4}));u.position.set(0,c.y,.14),e.add(u)});const l=new C(new rt(.17,.55,.14),o);l.position.set(0,1.15,0),e.add(l);for(const[c,u]of[[13193026,1.32],[6265944,1.05]]){const d=new C(new ae(.05,8,6),new q({color:1711136,emissive:c,emissiveIntensity:.7,roughness:.4}));d.position.set(0,u,.08),e.add(d)}return e}function Og(n){const t=new yt;t.position.copy(n);const e=new q({color:14932410,roughness:.7,metalness:.2}),i=new C(new St(.09,.11,.5,8),e);i.position.y=.25,i.castShadow=!0,t.add(i);const s=new C(new ae(.09,8,6),e);return s.position.y=.51,t.add(s),t}function Bg(n){const t=new yt;t.position.copy(n);const e=new q({color:11882556,roughness:.6,metalness:.35}),i=new C(new St(.1,.13,.52,10),e);i.position.y=.26,i.castShadow=!0,t.add(i);const s=new C(new ae(.1,10,8),e);s.position.y=.55,t.add(s);for(const o of[0,Math.PI/2,Math.PI,3*Math.PI/2]){const r=new C(new St(.055,.055,.07,8),e);r.position.set(Math.cos(o)*.13,.38,Math.sin(o)*.13),r.rotation.z=Math.PI/2,r.rotation.y=o,t.add(r)}return t}function kg(n){const t=new yt;t.position.copy(n);const e=new q({color:6978964,roughness:.6,metalness:.4}),i=new C(new St(.03,.045,1.15,8),e);i.position.y=.58,i.castShadow=!0,t.add(i);const s=new C(new rt(.32,.42,.17),e);s.position.y=1.02,s.castShadow=!0,t.add(s);const o=new C(new rt(.22,.045,.02),new q({color:1711136,roughness:.7}));return o.position.set(0,1.2,.095),t.add(o),t}function Gg(n,t=0,e=["ESPACE","PUBLICITAIRE"]){const i=new yt;i.position.copy(n),i.rotation.y=t;const s=new q({color:3814187,roughness:.55,metalness:.5}),o=new C(new St(.42,.5,.1,10),s);o.position.y=.05,i.add(o);const r=new C(new St(.06,.08,1,8),s);r.position.y=.6,r.castShadow=!0,i.add(r);const a=256,l=384,c=document.createElement("canvas");c.width=a,c.height=l;const u=c.getContext("2d"),d=u.createLinearGradient(0,0,0,l);d.addColorStop(0,"#fbf4e0"),d.addColorStop(1,"#efdfba"),u.fillStyle=d,u.fillRect(0,0,a,l),u.strokeStyle="rgba(138,111,69,0.55)",u.lineWidth=10,u.strokeRect(10,10,a-20,l-20),u.fillStyle="#c08a68",u.fillRect(0,0,a,36),u.textAlign="center",u.fillStyle="#3a2e1f",u.font="700 42px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",e.forEach((g,m)=>u.fillText(g,a/2,168+m*58)),u.fillStyle="#8a6a4e",u.font="400 22px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",u.fillText("DOMAINE PUBLIC",a/2,l-34);const h=new We(c);h.colorSpace=fe,h.anisotropy=ge?2:8;const p=new Oe({map:h}),f=new C(new qt(1.35,2),p);f.position.set(0,1.95,.02),i.add(f);const M=f.clone();return M.position.z=-.02,M.rotation.y=Math.PI,i.add(M),i}function Hg(n,t=1){const e=new yt;e.position.copy(n),e.scale.setScalar(t);const i=new q({color:12035198,roughness:.9}),s=new C(new rt(1,.48,1),i);s.position.y=.24,s.castShadow=!0,e.add(s);const o=new C(new rt(1.08,.08,1.08),i);o.position.y=.48,e.add(o);const r=new C(new rt(.92,.06,.92),new q({color:4338986,roughness:1}));r.position.y=.51,e.add(r);const a=new q({color:7031340,roughness:.95,flatShading:!0}),l=new C(new St(.09,.13,2.2,7),a);l.position.y=1.55,l.castShadow=!0,e.add(l);const c=new q({color:5599295,roughness:1,flatShading:!0});for(let u=0;u<3;u++){const d=new C(new ae(1-u*.16,8,6),c);d.position.set((Math.random()-.5)*.4,2.55+u*.55,(Math.random()-.5)*.4),d.scale.y=.85,d.castShadow=!0,e.add(d)}return e}function Vg(n,t=0){const e=new Ee,i=new Float32Array([0,-1,0,-.55,-.35,0,.55,-.35,0,0,-1,0,.55,-.35,0,.26,.9,0,0,-1,0,.26,.9,0,-.26,.9,0,0,-1,0,-.26,.9,0,-.55,-.35,0]);e.setAttribute("position",new Ne(i,3)),e.computeVertexNormals();const s=new C(e,new Ge({color:15789280,side:ke}));s.rotation.x=-Math.PI/2;const o=new yt;return o.add(s),o.rotation.y=t,o.position.set(n.x,.05,n.z),o}function Wg(n,t=1){const e=new yt,i=new q({color:5913892,roughness:.95,flatShading:!0}),s=new C(new St(.09,.14,1.3,7),i);s.position.y=.65,s.castShadow=!0,e.add(s);const o=new q({color:4151862,roughness:1,flatShading:!0}),r=4;for(let l=0;l<r;l++){const c=new C(new an(1.05-l*.18,.85,8),o);c.position.y=1.1+l*.62,c.castShadow=!0,e.add(c)}const a=new C(new an(.14,.42,6),o);return a.position.y=3.7,e.add(a),e.position.copy(n),e.scale.setScalar(t),e}function gc(n,t=0,e=0){const i=new yt;if(i.position.copy(n),i.rotation.y=e,t===0){const s=new q({color:3948356,roughness:.85,metalness:.35}),o=new C(new St(.42,.42,.05,20),s);o.position.y=.06,i.add(o);const r=new C(new ci(.3,20),new q({color:2895411,roughness:.9}));r.rotation.x=-Math.PI/2,r.position.y=.09,i.add(r);for(let a=0;a<3;a++){const l=new C(new rt(.52,.02,.035),s);l.position.set(0,.105,-.2+a*.2),i.add(l)}}else{const s=new q({color:3093046,roughness:.8,metalness:.4}),o=new C(new rt(.9,.04,.5),s);o.position.y=.06,i.add(o);for(let r=0;r<5;r++){const a=new C(new rt(.7,.03,.05),s);a.position.set(0,.075,-.17+r*.085),i.add(a)}}return i}function _c(n){const t=new yt;t.position.copy(n);const e=new q({color:5916210,roughness:.9,flatShading:!0}),i=new C(new St(.09,.13,7.2,8),e);i.position.y=3.6,i.castShadow=!0,t.add(i);const s=new C(new rt(2.6,.09,.09),e);s.position.y=6.3,t.add(s);const o=new q({color:9083498,roughness:.6,metalness:.2});for(const a of[-1.15,1.15]){const l=new C(new St(.05,.07,.14,6),o);l.position.set(a,6.4,0),t.add(l)}const r=new C(new an(.12,.3,6),e);return r.position.y=7.32,t.add(r),t}function vc(n,t,e=.8){const i=[];for(let r=0;r<=24;r++){const a=r/24;i.push(new b(n.x+(t.x-n.x)*a,n.y+(t.y-n.y)*a+Math.sin(a*Math.PI)*-e,n.z+(t.z-n.z)*a))}const o=new Je(i);return new C(new ds(o,24,.015,5,!1),new Ge({color:2893344}))}function Xg(n){const t=new yt;t.position.copy(n);const e=new q({color:14248509,roughness:.8}),i=new C(new an(.16,.5,10),e);i.position.y=.25,i.castShadow=!0,t.add(i);const s=new q({color:15920352,roughness:.7}),o=new C(new St(.105,.115,.09,10),s);o.position.y=.2,t.add(o);const r=new C(new rt(.3,.04,.3),e);return r.position.y=.02,t.add(r),t}function qg(n,t){const e=window.innerWidth<=760;ig(e);const i=k=>e?Math.max(2,Math.round(k*.45)):k,s=new Wa({canvas:n,antialias:!e,alpha:!1});s.setPixelRatio(Math.min(window.devicePixelRatio,e?1.5:2)),s.setSize(window.innerWidth,window.innerHeight),s.toneMapping=Vo,s.toneMappingExposure=1.25,s.shadowMap.enabled=!e,s.shadowMap.type=Ho;const o=new Xa;o.fog=new ii(Jt.skyHorizon,60,760);const r=new Se(e?62:52,window.innerWidth/window.innerHeight,.1,900),a={ambient:new Et(11772544),hemiSky:new Et(15918796),hemiGround:new Et(12101246),sun:new Et(16772552),fog:new Et(16116950)},l={ambient:new Et(6253452),hemiSky:new Et(4412282),hemiGround:new Et(2305088),sun:new Et(10335448),fog:new Et(3227998)},c=new Wn({side:$e,depthWrite:!1,uniforms:{top:{value:new Et(Jt.skyTop)},mid:{value:new Et(Jt.skyMid)},horizon:{value:new Et(Jt.skyHorizon)},sunDir:{value:new b(0,.16,-1).normalize()},sunColor:{value:new Et(Jt.sun)},night:{value:0},topN:{value:new Et(725536)},midN:{value:new Et(1385016)},horN:{value:new Et(3227998)},moonDir:{value:new b(.22,.52,-.83).normalize()},moonColor:{value:new Et(14082804)}},vertexShader:`
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
    `});o.add(new C(new ae(700,e?24:40,e?12:20),c));const u=new Gn(new Tn({map:Mn(0,"rgba(244,200,150,0.5)"),transparent:!0,blending:nn,depthWrite:!1,depthTest:!1}));u.position.set(42,56,-560),u.scale.setScalar(42),r.add(u);const d=new Gn(new Tn({map:Mn(0,"rgba(214,226,244,0.5)"),transparent:!0,blending:nn,depthWrite:!1,depthTest:!1,opacity:0}));d.position.set(-34,54,-545),d.scale.setScalar(30),r.add(d),o.add(r);const h=new C(new ci(1600,e?32:48),new q({map:au(),roughness:1,metalness:0}));h.rotation.x=-Math.PI/2,h.position.y=-.02,h.receiveShadow=!0,o.add(h);const p=[new b(0,0,0),new b(7,0,30),new b(-8,0,62),new b(9,0,96),new b(-9,0,132),new b(8,0,168),new b(-7,0,202),new b(6,0,236),new b(-8,0,270),new b(7,0,304),new b(-6,0,338),new b(8,0,372),new b(-8,0,406),new b(6,0,440),new b(0,0,468)],f=new Je(p,!1,"centripetal",.6);f.arcLengthDivisions=1e3;const M=e?240:500,g=Nn(f,4.2,Jt.path,Qi(),M);g.position.y=.012,o.add(g);const m=[1.85,-1.85].map(k=>{const V=[],G=e?60:120;for(let X=0;X<=G;X++){const v=X/G,T=f.getPointAt(v),D=f.getTangentAt(v),F=new b(-D.z,0,D.x).normalize();V.push(new b(T.x+F.x*k,0,T.z+F.z*k))}return new Je(V,!1,"centripetal",.6)});for(const k of m){const V=Nn(k,.14,Jt.pathEdge,null,M,!0);V.position.y=.032,o.add(V)}for(let k=0;k<=i(84);k++){const V=k/84*.96+.02,G=f.getPointAt(V),X=f.getTangentAt(V),v=new b(-X.z,0,X.x).normalize();for(const T of[-1.25,1.25]){const D=new C(new rt(.16,.03,1.3),new Ge({color:14859594}));D.position.set(G.x+v.x*T,.05,G.z+v.z*T),D.rotation.y=Math.atan2(X.x,X.z),o.add(D)}}const x=new Ge({color:15919826});for(const k of[.22,.58,.86]){const V=f.getPointAt(k),G=f.getTangentAt(k),X=new b(-G.z,0,G.x).normalize();for(let v=-3;v<=3;v++){const T=V.clone().add(G.clone().multiplyScalar(v*.55)),D=new C(new rt(.42,.03,3.3),x);D.position.set(T.x,.05,T.z),D.rotation.y=Math.atan2(X.x,X.z),o.add(D)}}for(const k of[.3,.55,.78]){const V=f.getPointAt(k),G=f.getTangentAt(k),X=new b(-G.z,0,G.x).normalize();for(const v of[-1.1,1.1]){const T=V.clone().add(X.clone().multiplyScalar(v));o.add(Vg(T,Math.atan2(G.x,G.z)))}}const w=[3.55,-3.55].map(k=>{const V=[],G=e?60:120;for(let X=0;X<=G;X++){const v=X/G,T=f.getPointAt(v),D=f.getTangentAt(v),F=new b(-D.z,0,D.x).normalize();V.push(new b(T.x+F.x*k,0,T.z+F.z*k))}return new Je(V,!1,"centripetal",.6)}),S=[2.42,-2.42].map(k=>{const V=[],G=e?60:120;for(let X=0;X<=G;X++){const v=X/G,T=f.getPointAt(v),D=f.getTangentAt(v),F=new b(-D.z,0,D.x).normalize();V.push(new b(T.x+F.x*k,0,T.z+F.z*k))}return new Je(V,!1,"centripetal",.6)}),z=fg();for(const k of w){const V=Nn(k,2.2,13877398,z,M);V.position.y=.015,o.add(V)}for(const k of S){const V=Nn(k,.24,12100725,null,M);V.position.y=.035,o.add(V)}const P=new C(new ds(f,e?200:400,.05,8,!1),new Ge({color:13015654,transparent:!0,opacity:.7,blending:Ai,depthWrite:!1}));P.position.y=.055,o.add(P);const I=P.geometry.index.count,L=new ru(11772544,.75);o.add(L);const y=new iu(15918796,12101246,.5);o.add(y);const _=new ou(16772552,2.2);_.position.set(-40,60,-120),_.castShadow=!0,_.shadow.mapSize.set(2048,2048),_.shadow.camera.left=-160,_.shadow.camera.right=160,_.shadow.camera.top=200,_.shadow.camera.bottom=-60,_.shadow.camera.near=10,_.shadow.camera.far=700,o.add(_),o.add(_.target);const A=[],U=[],O=t.length,K=[],tt=[],J=[],st=[],$=[],ct=[],dt=[],It=[],Wt=[],oe=[],j=[],at=[];let At=0,mt=0;function Ut(k,V){const G=cg(k,V);return st.push({g:G,phase:Math.random()*Math.PI*2}),o.add(G),G}function kt(k,V,G){const X=pg(k,V,G);return $.push({g:X,phase:Math.random()*Math.PI*2}),o.add(X),X}t.forEach((k,V)=>{const G=.02+(V+.5)/O*.94,X=V%2===0?1:-1,v=lu(k,f,G,X,V);if(A.push(v),U.push({mesh:v.front,kind:"panel",index:V}),o.add(v.group),o.add(xn(v.group.position,6.4,4.2)),V%3===0){const T=new b(Math.cos(v.group.rotation.y),0,-Math.sin(v.group.rotation.y)).normalize(),D=v.group.position.clone().add(T.clone().multiplyScalar(3.4));D.y=0,kt(D,.9+Math.random()*.5,V),Ut(v.group.position.clone().add(T.clone().multiplyScalar(-3.2)),.7+Math.random()*.5)}});for(let k=0;k<i(48);k++){const V=k*13+Math.random()*7,G=7+Math.random()*27,X=4+Math.random()*3.5,v=4+Math.random()*3.5,T=Pa(X,G,v,V,-78-Math.random()*34),D=Pa(X,G*(.7+Math.random()*.6),v,V,78+Math.random()*34);Wt.push(T,D),o.add(T,D)}for(let k=0;k<i(14);k++){const V=30+Math.random()*450,G=Math.random()>.5?1:-1,X=28+Math.random()*55,v=42+Math.random()*50;o.add(hg(new b(G*(210+Math.random()*150),X*.4-3,V),v,X,38+Math.random()*30))}const Zt=new q({color:Jt.hill,roughness:1,flatShading:!0}),ve=new C(new ae(120,24,12),Zt);ve.scale.set(1,.5,4),ve.position.set(-230,-2,240),o.add(ve);const Qt=new C(new ae(150,24,12),Zt);Qt.scale.set(1,.55,4.5),Qt.position.set(280,0,330),o.add(Qt);const be=[];for(let k=0;k<=i(14);k++){const V=k/14*.96+.02,G=f.getPointAt(V),X=f.getTangentAt(V),v=k%2===0?1:-1,T=new b(-X.z,0,X.x).normalize(),D=G.clone().add(T.clone().multiplyScalar(v*4.8));o.add(Ls(D,v));const F=Is(D,v);be.push({glow:F.glow,pool:F.pool,i:k}),o.add(F.group)}for(let k=0;k<=i(13);k++){const V=k/13*.96+.02+.035;if(V>.98)continue;const G=f.getPointAt(V),X=f.getTangentAt(V),v=k%2===0?-1:1,T=new b(-X.z,0,X.x).normalize(),D=G.clone().add(T.clone().multiplyScalar(v*5.3));o.add(Lo(D,v));const F=G.clone().add(T.clone().multiplyScalar(v*4.6));if(kt(F,.8+Math.random()*.5,k*3+1),k%3===1){const B=G.clone().add(T.clone().multiplyScalar(v*6.1));o.add(mg(B))}}const W=[],Ie=t.map((k,V)=>.02+(V+.5)/O*.94);for(let k=0;k<i(36);k++){let V=Math.random();for(let B=0;B<8&&(V=Math.random(),!!Ie.some(ot=>Math.abs(ot-V)<.018));B++);const G=f.getPointAt(V),X=f.getTangentAt(V),v=new b(-X.z,0,X.x).normalize(),T=Math.random()>.5?1:-1,D=G.clone().add(v.clone().multiplyScalar(T*(8.5+Math.random()*7.5))),F=Dr(D,.9+Math.random()*.8);W.push({g:F,phase:Math.random()*Math.PI*2}),o.add(F)}for(let k=0;k<i(14);k++){let V=Math.random();for(let B=0;B<8&&(V=Math.random(),!!Ie.some(ot=>Math.abs(ot-V)<.02));B++);const G=f.getPointAt(V),X=f.getTangentAt(V),v=new b(-X.z,0,X.x).normalize(),T=Math.random()>.5?1:-1,D=G.clone().add(v.clone().multiplyScalar(T*(10+Math.random()*9))),F=Wg(D,.9+Math.random()*.9);W.push({g:F,phase:Math.random()*Math.PI*2}),o.add(F)}for(let k=0;k<i(7);k++){const V=.05+Math.random()*.9;if(Ie.some(F=>Math.abs(F-V)<.015))continue;const G=f.getPointAt(V),X=f.getTangentAt(V),v=new b(-X.z,0,X.x).normalize(),T=k%2===0?1:-1,D=G.clone().add(v.clone().multiplyScalar(T*(5.1+Math.random()*.5)));o.add(Lo(D,T))}const te=[];for(let k=0;k<i(12);k++){const V=.04+Math.random()*.92,G=f.getPointAt(V),X=f.getTangentAt(V),v=new b(-X.z,0,X.x).normalize(),T=Math.random()>.5?1:-1,D=G.clone().add(v.clone().multiplyScalar(T*(3.1+Math.random()*.9))),F=gg();F.position.set(D.x,0,D.z),te.push({g:F,phase:Math.random()*Math.PI*2,x0:D.x,z0:D.z}),o.add(F)}(e?[.14,.46]:[.14,.46,.82]).forEach((k,V)=>{const G=f.getPointAt(k),X=f.getTangentAt(k),v=new b(-X.z,0,X.x).normalize(),T=V%2===0?1:-1,D=G.clone().add(v.clone().multiplyScalar(T*5.15)),F=Math.atan2(v.x,v.z)+(T>0?0:Math.PI);o.add(_g(D,F,V===1?["RÈGLES","D'AFFICHAGE"]:void 0)),o.add(xn(D,2,2)),o.add(Ur(D.clone().add(v.clone().multiplyScalar(T*-1.6)),2.2,.55))}),(e?[.24]:[.24,.62]).forEach((k,V)=>{const G=f.getPointAt(k),X=f.getTangentAt(k),v=new b(-X.z,0,X.x).normalize(),T=V%2===0?-1:1,D=G.clone().add(v.clone().multiplyScalar(T*5.5));o.add(vg(D,T)),o.add(xn(D,4.6,2.6))}),(e?[.19,.85]:[.12,.28,.45,.6,.76,.9]).forEach((k,V)=>{const G=f.getPointAt(k),X=f.getTangentAt(k),v=new b(-X.z,0,X.x).normalize(),T=V%2===0?1:-1,D=G.clone().add(v.clone().multiplyScalar(T*6.4)),F=Math.atan2(X.x,X.z)+(T>0?Math.PI:0),B=[13215868,9415293,13805176],ot=Mg(D,B[V%B.length],F);tt.push({g:ot,phase:Math.random()*Math.PI*2}),o.add(ot)});for(let k=0;k<i(8);k++){const V=.06+Math.random()*.88,G=f.getPointAt(V),X=f.getTangentAt(V),v=new b(-X.z,0,X.x).normalize(),T=Math.random()>.5?1:-1,D=G.clone().add(v.clone().multiplyScalar(T*(5.9+Math.random()*1.4)));o.add(yg(D,Math.random()*Math.PI*2))}(e?[.28,.72]:[.18,.5,.8]).forEach(k=>{const V=f.getPointAt(k),G=f.getTangentAt(k),X=new b(-G.z,0,G.x).normalize(),v=V.clone().add(X.clone().multiplyScalar(3.9)),T=V.clone().add(X.clone().multiplyScalar(-3.9));v.y=5.3,T.y=5.3;const D=Ig(v,T);ct.push({g:D,phase:Math.random()*Math.PI*2}),o.add(D)});const R=[{color:13209450,label:"BOULANGERIE"},{color:8231528,label:"PHARMACIE"},{color:9083576,label:"LIBRAIRIE"},{color:13608308,label:"CAFÉ DU PARC"}];(e?[.15,.42,.72]:[.15,.38,.6,.84]).forEach((k,V)=>{const G=f.getPointAt(k),X=f.getTangentAt(k),v=new b(-X.z,0,X.x).normalize(),T=G.clone().add(v.clone().multiplyScalar(-1*(11+V%2*2.4))),D=Math.atan2(v.x,v.z),F=Dg(T,D,R[V%R.length].color,R[V%R.length].label);oe.push(F),o.add(F),o.add(xn(T,5.4,3.2))}),[.32,.7].forEach((k,V)=>{const G=f.getPointAt(k),X=f.getTangentAt(k),v=new b(-X.z,0,X.x).normalize(),T=V%2===0?1:-1,D=G.clone().add(v.clone().multiplyScalar(T*2.8));o.add(Sg(D,Math.atan2(X.x,X.z),V===0?"D":"A"))});for(let k=0;k<i(8);k++){const V=.08+Math.random()*.84,G=f.getPointAt(V),X=f.getTangentAt(V),v=new b(-X.z,0,X.x).normalize(),T=Math.random()>.5?1:-1,D=G.clone().add(v.clone().multiplyScalar(T*(4.55+Math.random()*.4)));o.add(Ur(D,1.5+Math.random()*1.2,.5+Math.random()*.3))}[{t:.09,side:-1,lines:["RÉCLAMEZ","VOTRE VILLE"]},{t:.36,side:1,lines:["ESPACE","PUBLICITAIRE"]},{t:.62,side:-1,lines:["MOBILIER","URBAIN"]},{t:.88,side:1,lines:["ZONAGE","RÉGULÉ"]}].forEach(k=>{const V=f.getPointAt(k.t),G=f.getTangentAt(k.t),X=new b(-G.z,0,G.x).normalize(),v=V.clone().add(X.clone().multiplyScalar(k.side*7.6)),T=Math.atan2(-X.x*k.side,-X.z*k.side),D=Rg(v,T,k.lines);j.push(D),o.add(D),o.add(xn(v,6.4,4)),Ut(v.clone().add(X.clone().multiplyScalar(k.side*2.3)),.8),Ut(v.clone().add(X.clone().multiplyScalar(k.side*2.8)),.7)});{const V=f.getPointAt(.33),G=f.getTangentAt(.33),X=new b(-G.z,0,G.x).normalize(),v=V.clone().add(X.clone().multiplyScalar(-11)),T=Cg();T.position.copy(v),K.push({g:T,phase:0}),o.add(T),o.add(xn(v,4.6,4.6));for(let B=0;B<4;B++){const ot=B/4*Math.PI*2+.4,ht=v.clone().add(new b(Math.cos(ot)*2.7,0,Math.sin(ot)*2.7));o.add(Lo(ht,1)),kt(ht.clone().add(new b(.6,0,0)),.8,B)}o.add(Dr(v.clone().add(new b(-3.4,0,1.4)),1.3)),o.add(Dr(v.clone().add(new b(3.2,0,-1.2)),1.2));const D=v.clone().add(new b(3.9,0,-3.4)),F=mc(D,Math.atan2(G.x,G.z)+Math.PI);at.push(F),o.add(F),o.add(xn(D,2.6,1.4))}{const V=f.getPointAt(.585),G=f.getTangentAt(.585),X=new b(-G.z,0,G.x).normalize(),v=V.clone().add(X.clone().multiplyScalar(-6.2)),T=Math.atan2(X.x,X.z),D=Pg(v,T);J.push({g:D,phase:0}),o.add(D),o.add(xn(v,3,2.6)),o.add(Ur(v.clone().add(new b(2.4,0,0)),1.6,.5));const F=zg(v.clone().add(new b(1.5,0,1)));It.push({g:F,phase:Math.random()*Math.PI*2}),o.add(F)}const et=(k,V)=>.5*(Ie[k]+Ie[V]);for(const k of[.22,.58,.86]){const V=f.getPointAt(k),G=f.getTangentAt(k),X=new b(-G.z,0,G.x).normalize(),v=Math.random()>.5?1:-1,T=V.clone().add(X.clone().multiplyScalar(v*2.9)),D=new b().subVectors(V,T).normalize();o.add(Fg(T,Math.atan2(D.x,D.z)))}const Q=e?4:8;for(let k=0;k<Q;k++){const V=.05+k/Q*.9,G=f.getPointAt(V),X=f.getTangentAt(V),v=new b(-X.z,0,X.x).normalize(),T=k%2===0?1:-1;o.add(Og(G.clone().add(v.clone().multiplyScalar(T*2.6))))}const Dt=e?1:3;for(let k=0;k<Dt;k++){const V=.14+k/Dt*.6,G=f.getPointAt(V),X=f.getTangentAt(V),v=new b(-X.z,0,X.x).normalize(),T=k%2===0?1:-1;o.add(Bg(G.clone().add(v.clone().multiplyScalar(T*2.85))))}const gt=e?1:2;for(let k=0;k<gt;k++){const V=.24+k*.3,G=f.getPointAt(V),X=f.getTangentAt(V),v=new b(-X.z,0,X.x).normalize(),T=k%2===0?-1:1;o.add(kg(G.clone().add(v.clone().multiplyScalar(T*2.95))))}(e?[.32,.74]:[.08,.32,.55,.78]).forEach((k,V)=>{const G=f.getPointAt(k),X=f.getTangentAt(k),v=new b(-X.z,0,X.x).normalize(),T=V%2===0?1:-1,D=G.clone().add(v.clone().multiplyScalar(T*6.9)),F=V%2===0?["ESPACE","PUBLICITAIRE"]:["MOBILIER","URBAIN"];o.add(Gg(D,Math.atan2(v.x,v.z)+(T>0?0:Math.PI),F)),o.add(xn(D,1.6,2.2))}),(e?[et(1,2),et(8,9)]:[et(1,2),et(3,4),et(6,7),et(9,10)]).forEach((k,V)=>{const G=f.getPointAt(k),X=f.getTangentAt(k),v=new b(-X.z,0,X.x).normalize(),T=V%2===0?1:-1,D=G.clone().add(v.clone().multiplyScalar(T*4.55));o.add(Hg(D,.9+V%3*.15))}),(e?[et(7,8)]:[et(1,2),et(3,4),et(5,6),et(7,8),et(9,10),et(11,12)]).forEach((k,V)=>{const G=f.getPointAt(k),X=f.getTangentAt(k),v=new b(-X.z,0,X.x).normalize(),T=V%2===0?1:-1,D=Oo();D.cone.material.opacity=0,D.group.position.set(G.x+v.x*T*1.7,0,G.z+v.z*T*1.7),D.group.rotation.y=Math.atan2(X.x,X.z),o.add(D.group)});for(const k of[.13,.45,.75]){const V=f.getPointAt(k),G=f.getTangentAt(k),X=new b(-G.z,0,G.x).normalize(),v=V.clone().add(X.clone().multiplyScalar(4.9)),T=V.clone().add(X.clone().multiplyScalar(-4.9));o.add(_c(v)),o.add(_c(T)),v.y=6.35,T.y=6.35,o.add(vc(v,T,.55)),o.add(vc(v.clone().add(new b(.14,-.22,0)),T.clone().add(new b(-.14,-.22,0)),.45))}for(const[k,V,G]of[[.1,.6,0],[.33,-.6,0],[.49,.6,1],[.65,-.6,0],[.8,.6,1],[.93,-.6,0]]){const X=f.getPointAt(k),v=f.getTangentAt(k),T=new b(-v.z,0,v.x).normalize();o.add(gc(X.clone().add(T.clone().multiplyScalar(V)),G,Math.atan2(v.x,v.z)))}for(const k of[.31,.71]){const V=f.getPointAt(k),G=f.getTangentAt(k),X=new b(-G.z,0,G.x).normalize(),v=Math.random()>.5?1:-1;o.add(gc(V.clone().add(X.clone().multiplyScalar(v*3.1)),1,Math.atan2(G.x,G.z)))}{const V=f.getPointAt(.24),G=f.getTangentAt(.24),X=new b(-G.z,0,G.x).normalize();[1.6,2,-1.6].forEach((v,T)=>{const D=V.clone().add(X.clone().multiplyScalar(v)).add(G.clone().multiplyScalar(T===2?-.5:.6));o.add(Xg(D))})}{const V=f.getPointAt(.82),G=f.getTangentAt(.82),X=new b(-G.z,0,G.x).normalize(),v=V.clone().add(X.clone().multiplyScalar(11.6)),T=mc(v,Math.atan2(-X.x,-X.z),9415293);at.push(T),o.add(T),o.add(xn(v,2.6,1.4))}const xt=[],Ft=e?10:20,Gt=e?1:3;for(let k=0;k<Ft;k++){const V=k<Gt,G=Ag();V&&G.g.scale.setScalar(.72);const X=Math.random()>.5?1:-1,v=Math.random()>.5?1:-1;xt.push({g:G.g,legL:G.legL,legR:G.legR,kneeL:G.kneeL,kneeR:G.kneeR,armL:G.armL,armR:G.armR,elbowL:G.elbowL,elbowR:G.elbowR,lean:G.lean,t:.02+Math.random()*.96,speed:(V?.009:.004+Math.random()*.005)*X,side:v,off:3+Math.random()*.9,phase:G.phase,step:0}),o.add(G.g)}for(let k=0;k<(e?1:3);k++){const V=Ng(),G=Math.random()>.5?1:-1,X=Math.random()>.5?1:-1;dt.push({g:V,t:.08+Math.random()*.84,speed:(.006+Math.random()*.004)*G,side:X,off:3.4+Math.random()*.9,phase:Math.random()*Math.PI*2,step:0}),o.add(V)}for(let k=0;k<i(38);k++){const V=Math.random(),G=f.getPointAt(V),X=f.getTangentAt(V),v=new b(-X.z,0,X.x).normalize(),T=Math.random()>.5?1:-1,D=G.clone().add(v.clone().multiplyScalar(T*(9+Math.random()*22)));Math.random()<.5?o.add(og(D,1+Math.random()*2.4)):o.add(rg(D,.3+Math.random()*.9))}const wt=[];for(let k=0;k<i(30);k++){const V=Math.random(),G=f.getPointAt(V),X=f.getTangentAt(V),v=new b(-X.z,0,X.x).normalize(),T=Math.random()>.5?1:-1,D=G.clone().add(v.clone().multiplyScalar(T*(9+Math.random()*8))),F=cu(D,.8+Math.random()*.8);wt.push({g:F,phase:Math.random()*Math.PI*2}),o.add(F)}for(let k=0;k<i(66);k++){let V=Math.random();for(let F=0;F<8&&(V=Math.random(),!!Ie.some(B=>Math.abs(B-V)<.012));F++);const G=f.getPointAt(V),X=f.getTangentAt(V),v=new b(-X.z,0,X.x).normalize(),T=Math.random()>.5?1:-1,D=G.clone().add(v.clone().multiplyScalar(T*(5.8+Math.random()*3.4)));if(Ut(D,.5+Math.random()*.8),Math.random()<.35){const F=G.clone().add(v.clone().multiplyScalar(T*(6.2+Math.random()*1.6)));kt(F,.7+Math.random()*.5,k*7%9)}}const ee=[];for(let k=0;k<i(17);k++){const V=ug(new b((Math.random()-.5)*130,30+Math.random()*20,Math.random()*440),1.4+Math.random()*2.6);ee.push({g:V,speed:.5+Math.random()*.8,phase:Math.random()*Math.PI*2,y0:V.position.y,s0:V.scale.x}),o.add(V)}[{t:.12,side:1,lines:["Audit","d'abord"],tip:"Toute réorganisation commence par l'audit des acteurs du secteur."},{t:.5,side:-1,lines:["Zonage","du territoire"],tip:"Le zonage délimite les espaces publicitaires selon des normes."},{t:.88,side:1,lines:["Mise à jour","continue"],tip:"Un secteur en phase avec l'urbanisation se pérennise."}].forEach(k=>{const V=f.getPointAt(k.t),G=f.getTangentAt(k.t),X=new b(-G.z,0,G.x).normalize(),v=V.clone().add(X.clone().multiplyScalar(k.side*5.5)),T=new b().subVectors(V,v).normalize(),D=dg(v,Math.atan2(T.x,T.z),k.lines);U.push({mesh:D.sign,kind:"sign",tip:k.tip}),o.add(D.group)});const le=ag(e?180:420);o.add(le);const H=[];for(let k=0;k<i(30);k++){const V=Lg(),G=Math.random(),X=f.getPointAt(G),v=f.getTangentAt(G),T=new b(-v.z,0,v.x).normalize(),D=Math.random()>.5?1:-1,F=X.x+T.x*D*(2+Math.random()*7),B=.4+Math.random()*4,ot=X.z+T.z*D*(2+Math.random()*7);V.position.set(F,B,ot),H.push({g:V,x:F,y:B,z:ot,vx:(Math.random()-.5)*2.2,vz:-(.8+Math.random()*1.4),vy:-(.3+Math.random()*.4),spin:(Math.random()-.5)*4,phase:Math.random()*Math.PI*2}),o.add(V)}const ft=[];for(let k=0;k<i(9);k++){const V=lg();V.g.position.set(-60+Math.random()*120,9+Math.random()*8,40+Math.random()*120),ft.push({g:V.g,l:V.l,r:V.r,phase:Math.random()*Math.PI*2,speed:4+Math.random()*3,y0:V.g.position.y,z0:V.g.position.z}),o.add(V.g)}const Z=[];for(let k=0;k<i(7);k++){const V=Oo();Z.push({g:V.group,cone:V.cone,t:k/7,speed:.02+Math.random()*.014,phase:Math.random()*Math.PI*2}),o.add(V.group)}const nt=[];for(let k=0;k<(e?1:2);k++){const V=Ug();nt.push({g:V.group,cone:V.cone,t:.2+k*.5,speed:.014+Math.random()*.004,phase:Math.random()*Math.PI*2}),o.add(V.group)}const Mt=Z.concat(nt),_t=new b,Vt=new b,ye=new b,Te=new b;let ce=performance.now()*.001,Qe=-1,Ae=null,Ii=1/0,ms=0;function Cn(k){Qe=k}function gs(k,V){const G=performance.now()*.001,X=Math.min(.05,Math.max(.001,G-ce));ce=G;const v=.005+k*.98;At+=(mt-At)*Math.min(1,X*2.2);const T=At;c.uniforms.night.value=T,s.toneMappingExposure=en.lerp(s.toneMappingExposure,1.25+.32*T,Math.min(1,X*2)),L.color.copy(a.ambient).lerp(l.ambient,T),L.intensity=.75*(1-T)+.4*T,y.color.copy(a.hemiSky).lerp(l.hemiSky,T),y.groundColor.copy(a.hemiGround).lerp(l.hemiGround,T),y.intensity=.5*(1-T)+.45*T,_.color.copy(a.sun).lerp(l.sun,T),_.intensity=2.2*(1-T)+.3*T,T<.5!==_.castShadow&&(_.castShadow=T<.5),o.fog.color.copy(a.fog).lerp(l.fog,T),u.material.opacity=1-T,d.material.opacity=T;const D=f.getPointAt(v),F=f.getTangentAt(v),B=f.getPointAt(Math.min(v+.045,.999));ye.set(-F.z,0,F.x).normalize();const ot=Math.sin(G*.7)*.07,ht=Math.sin(G*.25)*.18;_t.set(D.x+ye.x*ht,D.y+3.45+ot,D.z+ye.z*ht),Vt.set(B.x,B.y+2.7,B.z);{let N=0,vt=1/0;const Ot=v+.03;for(let ut=0;ut<O;ut++){const De=.02+(ut+.5)/O*.94,jt=Math.abs(De-Ot);jt<vt&&(vt=jt,N=ut)}const Bt=en.clamp(1-vt/.06,0,1);if(Bt>0){const ut=A[N].group.position,De=ut.x-r.position.x,jt=ut.z-r.position.z,Xe=De*F.x+jt*F.z>0,cn=Math.hypot(De,jt),Ue=en.clamp((cn-9)/10,0,1),Sn=Bt*Bt*(3-2*Bt)*(Xe?1:0)*Ue;Sn>0&&Vt.lerp(new b(ut.x,ut.y+2.8,ut.z),Sn*.3)}}r.up.set(0,1,0),r.lookAt(Vt);const Ct=Math.atan2(F.x,F.z),Rt=Ct-ms;ms=Ct;const Ht=en.clamp(Rt/Math.max(X,.001)*.09,-.08,.08);r.rotation.z=en.lerp(r.rotation.z,Ht,.06);const Xt=55,Pt=15.2;Te.addScaledVector(_t,Xt*X),Te.addScaledVector(r.position,-Xt*X),Te.multiplyScalar(Math.max(0,1-Pt*X)),r.position.addScaledVector(Te,X),P.geometry.setDrawRange(0,Math.floor(I*k)),A.forEach((N,vt)=>{const Ot=vt===V,Bt=vt===Qe,ut=Math.abs(k-(.02+(vt+.5)/O*.94))<.06,De=Ot?.96:Bt?1.04:.78,jt=Bt?.18:Ot?.12:ut?.04:0,Xe=Bt?.12:.08;N.group.scale.setScalar(en.lerp(N.group.scale.x,De,Xe)),N.light&&(N.light.intensity=en.lerp(N.light.intensity,jt+T*.55,Xe)),N.group.position.y=en.lerp(N.group.position.y,Ot?.22:0,.06),N.beaconMat.emissiveIntensity=(.22+Math.sin(G*2.4+vt)*.1)*(1-T)+(1.3+Math.sin(G*2.4+vt)*.3)*T,N.frontMat.emissiveIntensity=en.lerp(N.frontMat.emissiveIntensity,T*.3,.06);const cn=r.position.x-N.group.position.x,Ue=r.position.z-N.group.position.z,Sn=Math.hypot(cn,Ue),ue=cn*F.x+Ue*F.z<0,un=en.clamp(1-Sn/32,0,1)*(ue?1:0),ui=ue?Math.atan2(cn,Ue):N.restRot,tn=ue?un*.14:.02;N.group.rotation.y=en.lerp(N.group.rotation.y,ui,tn)});for(const N of Mt){N.t=(N.t+N.speed*X)%1;const vt=f.getPointAt(N.t),Ot=f.getTangentAt(N.t);N.g.position.set(vt.x,.06+Math.sin(G*3+N.t*44)*.02,vt.z),N.g.rotation.y=Math.atan2(Ot.x,Ot.z),N.cone.material.opacity=.45+Math.sin(G*11+N.phase)*.15}for(const N of wt)N.g.rotation.z=Math.sin(G*.9+N.phase)*.05,N.g.rotation.y+=3e-4;for(const N of W)N.g.rotation.z=Math.sin(G*.6+N.phase)*.03;for(const N of te){const vt=Math.abs(Math.sin(G*2.2+N.phase))*.05;N.g.position.y=vt,N.g.rotation.z=Math.sin(G*2.2+N.phase)*.08,N.g.position.x=N.x0+Math.sin(G*.35+N.phase)*.4,N.g.position.z=N.z0+Math.cos(G*.3+N.phase)*.3}for(const N of xt){N.t=(N.t+N.speed*X)%1,N.t<0&&(N.t+=1);const vt=f.getPointAt(N.t),Ot=f.getTangentAt(N.t),Bt=new b(-Ot.z,0,Ot.x).normalize();N.g.position.set(vt.x+Bt.x*N.side*N.off,0,vt.z+Bt.z*N.side*N.off),N.g.rotation.y=Math.atan2(Ot.x,Ot.z)+(N.side>0?0:Math.PI),N.step+=X*(6+Math.abs(N.speed)*90);const ut=Math.sin(N.step)*.5;N.legL.rotation.x=ut,N.legR.rotation.x=-ut,N.kneeL.rotation.x=Math.max(0,-ut)*.95,N.kneeR.rotation.x=Math.max(0,ut)*.95,N.armL.rotation.x=-ut*.8,N.armR.rotation.x=ut*.8,N.elbowL.rotation.x=Math.max(0,ut)*.9,N.elbowR.rotation.x=Math.max(0,-ut)*.9,N.lean.rotation.z=Math.sin(N.step)*.025,N.lean.rotation.x=.045+Math.abs(Math.sin(N.step))*.025,N.g.position.y=Math.abs(Math.sin(N.step))*.04}for(const N of be){const vt=.9+Math.sin(G*9+N.i*1.7)*.09;N.glow.material.opacity=(.08*(1-T)+.85*T)*vt,N.pool.material.opacity=(.1*(1-T)+.55*T)*vt}if(Ae){const N=(G-Ae.t0)/1.05;Ae.sp.position.lerpVectors(Ae.from,Ae.to,Math.min(1,N)),Ae.sp.material.opacity=Math.sin(Math.min(1,N)*Math.PI),N>=1&&(o.remove(Ae.sp),Ae.sp.material.dispose(),Ae=null,Ii=8+Math.random()*10)}else if(Ii-=X,Ii<=0){const N=new Gn(new Tn({map:Mn(0,"rgba(255,242,214,1)"),transparent:!0,blending:nn,depthWrite:!1,opacity:0}));N.scale.setScalar(2.4);const vt=new b(120+Math.random()*60,92+Math.random()*36,-330-Math.random()*130);N.position.copy(vt),o.add(N),Ae={sp:N,t0:G,from:vt,to:vt.clone().add(new b(-78,-30,16))}}for(const N of ft){N.g.position.x+=N.speed*.02,N.g.position.y=N.y0+Math.sin(G*1.3+N.phase)*.8,N.g.position.z=N.z0+Math.sin(G*.6+N.phase)*3.5;const vt=Math.sin(G*9+N.phase)*.7;N.l.rotation.z=vt,N.r.rotation.z=-vt,N.g.rotation.z=.25+Math.sin(G*1.3+N.phase)*.12+Math.cos(G*.6+N.phase)*.08,N.g.position.x>80&&(N.g.position.x=-80,N.y0=8+Math.random()*9,N.z0=30+Math.random()*90,N.g.position.z=N.z0,N.g.position.y=N.y0)}le.rotation.y=G*.05,le.material.opacity=(.5+Math.sin(G*3)*.12)*(1-T*.7),le.position.x=Math.sin(G*.12)*2.4,le.position.z=Math.cos(G*.09)*1.6;for(const N of ee){N.g.position.x+=N.speed*.02,N.g.position.y=N.y0+Math.sin(G*.22+N.phase)*.7;const vt=1+Math.sin(G*.3+N.phase)*.05;N.g.scale.set(N.s0*vt,N.s0*vt,N.s0*vt),N.g.position.x>150&&(N.g.position.x=-150)}for(const N of K){const vt=Math.sin(G*2.6+N.phase)*.5+1;N.g.userData.jet.scale.set(1,.7+.3*vt,1),N.g.userData.jet.rotation.z=Math.sin(G*3.1)*.06,N.g.userData.jet.rotation.x=Math.cos(G*2.7)*.05,N.g.userData.pool.rotation.z=G*.25;const Ot=1+Math.sin(G*1.8+N.phase)*.03;N.g.userData.pool.scale.set(Ot,Ot,Ot),N.g.userData.dish.rotation.z=Math.sin(G*1.4)*.03}for(const N of tt)N.g.userData.parasol.rotation.z=Math.sin(G*.9+N.phase)*.06,N.g.userData.parasol.rotation.x=Math.sin(G*.7+N.phase*1.3)*.05;for(const N of J){const vt=N.g.userData.flag;vt.rotation.z=Math.sin(G*2.4+N.phase)*.28,vt.position.y=2.42+Math.sin(G*2.4+N.phase)*.04,N.g.userData.sign.material.emissiveIntensity=T*.75}for(let N=0;N<Wt.length;N++)Wt[N].material.emissiveIntensity=T*(.8+Math.sin(G*1.6+N*1.7)*.18);const ne=T*.85;for(const N of oe)N.userData.window.material.emissiveIntensity=ne;for(const N of j)N.userData.face.material.emissiveIntensity=ne;for(const N of at)N.userData.sign.material.emissiveIntensity=ne;for(const N of ct)N.g.rotation.z=Math.sin(G*.7+N.phase)*.05;for(const N of dt){N.t=(N.t+N.speed*X)%1,N.t<0&&(N.t+=1);const vt=f.getPointAt(N.t),Ot=f.getTangentAt(N.t),Bt=new b(-Ot.z,0,Ot.x).normalize();N.g.position.set(vt.x+Bt.x*N.side*N.off,Math.abs(Math.sin(N.step))*.03,vt.z+Bt.z*N.side*N.off),N.g.rotation.y=Math.atan2(Ot.x,Ot.z)+(N.side>0?0:Math.PI),N.step+=X*14,N.g.userData.tail.rotation.z=Math.sin(G*7+N.phase)*.55}for(const N of It){const vt=N.g.userData.balloons;for(let Ot=0;Ot<vt.length;Ot++)vt[Ot].position.y=1.2+Math.sin(Ot*2.1)*.05+Math.sin(G*1.1+N.phase+Ot*1.7)*.12,vt[Ot].position.x=(Ot-1)*.22+Math.sin(G*.8+Ot*2.3)*.04}for(const N of st)N.g.rotation.z=Math.sin(G*.7+N.phase)*.03;for(const N of $)N.g.rotation.z=Math.sin(G*.9+N.phase)*.06;for(const N of H)if(N.x+=(Math.sin(G*.5+N.phase)*.6+N.vx)*X,N.z+=N.vz*X,N.y+=N.vy*X,N.g.rotation.x+=N.spin*X,N.g.rotation.z+=N.spin*.6*X,N.g.position.set(N.x,N.y,N.z),N.y<.18){const vt=Math.min(.97,Math.max(.02,v+(Math.random()-.35)*.12)),Ot=f.getPointAt(vt),Bt=f.getTangentAt(vt),ut=new b(-Bt.z,0,Bt.x).normalize(),De=Math.random()>.5?1:-1;N.x=Ot.x+ut.x*De*(2+Math.random()*7),N.z=Ot.z+ut.z*De*(2+Math.random()*7),N.y=1.5+Math.random()*3,N.phase=Math.random()*Math.PI*2}}const _s=new ng,vs=new Tt;function Di(k,V){vs.set(k,V),_s.setFromCamera(vs,r);const G=_s.intersectObjects(U.map(v=>v.mesh),!1);if(!G.length)return null;const X=G[0];return X.distance>45?null:U[U.findIndex(v=>v.mesh===X.object)]}function qs(){const k=window.innerWidth,V=window.innerHeight;r.aspect=k/V,r.updateProjectionMatrix(),s.setSize(k,V)}function Ui(){return r.position.clone()}function Ys(){s.render(o,r)}return{render:Ys,resize:qs,update:gs,pick:Di,getCameraPos:Ui,setHover:Cn,setNight:k=>{mt=k?1:0}}}const Nr={module:"Module 1",title:"Formation sur la panneautique.",subtitle:"Domaine public :"},Io=[{name:"Chapitre 1",label:"Introduction :"},{name:"Chapitre 2",label:"Réorganisation & Réaménagement du secteur :"},{name:"Chapitre 3",label:"Évaluation du système d'exploitation :"},{name:"Chapitre 4",label:"Mise à jour :"},{name:"Questionnaire",label:"Module 1 :"}],He=[{id:"presentation",chapter:0,num:"01",kicker:"Chapitre 1 · Présentation :",title:"La panneautique, un véritable corps de métier.",bullets:["Ensemble des moyens et techniques d'installation et de gestion des panneaux publicitaires","Une étude pluridisciplinaire"],content:[{t:"Un métier à part entière :",b:"La panneautique, en tant qu'ensemble des moyens et techniques d'installation et de gestion des panneaux publicitaires, est un véritable corps de métier dont l'étude est pluridisciplinaire."},{t:"Ce que vous allez parcourir :",b:"De l'importance du panneau publicitaire au constat général dans le secteur, de la réorganisation complète (en sept étapes) du domaine d'activité aux techniques d'évaluation et de mise à jour de l'ensemble du processus ; le module 1 est conçu pour un embellissement durable du cadre de vie des populations, un rayonnement de l'économie grâce à l'exploitation du mobilier urbain de publicité et à la pérennité des acquis de développement dans ce corps de métier. Un questionnaire en douze points achève le module."}]},{id:"lecon1-importance",chapter:0,num:"02",kicker:"Chapitre 1 · Leçon 1 :",title:"Le panneau publicitaire et son importance socio-économique.",bullets:["Booste la concurrence entre les entreprises","Propulse l'économie : compétitivité des acteurs","Vecteur de publicité : stimule la consommation","Participe à l'embellissement des villes"],content:[{t:"Un moteur pour la concurrence :",b:"L'exploitation des panneaux publicitaires est une activité qui booste la concurrence entre les entreprises. Elle propulse l'économie grâce à l'accroissement et à l'amélioration de la compétitivité des différents acteurs de la vie économique d'un pays."},{t:"Le support de publicité par excellence :",b:"Vecteur de publicité, le panneau stimule et encourage la consommation. Lorsque l'activité est bien réglementée et bien encadrée, les normes d'exercice garantissent l'équité dans la gestion du secteur. On ne paie pas pour regarder un panneau : c'est le support publicitaire par excellence."},{t:"Une part du décor urbain :",b:"Par leurs aménagements, les panneaux publicitaires contribuent à l'embellissement des villes. Le choix des supports ne doit donc plus être motivé seulement par leur design, mais aussi par un besoin d'esthétique, pour un environnement et un cadre de vie plus agréables à la vue."}]},{id:"lecon2-constat",chapter:0,num:"03",kicker:"Chapitre 1 · Leçon 2 :",title:"Constat général.",bullets:["Pléthore de panneaux, parfois dans les capitales","Pollution visuelle, insalubrité, insécurité","Secteur mal organisé, ou pas encadré du tout","Supports délabrés, absence de normes"],content:[{t:"Des villes saturées :",b:"Dans beaucoup de villes à travers le monde — l'Afrique en est un bel exemple —, il est fréquent de constater, parfois dans des capitales, des cas de pléthore de panneaux publicitaires, cause de pollution visuelle, d'insalubrité et d'insécurité pour les personnes et les biens."},{t:"Une source : l'anarchie",b:"Un secteur d'exploitation mal organisé, mal encadré, ou pas encadré du tout, où règnent l'anarchie et le désordre, en est la source. L'état délabré et obsolète des supports, l'absence de normes et de réglementations rendent le secteur contre-productif et dégradent l'environnement."},{t:"Des mesures nécessaires :",b:"Il importe donc, pour le rayonnement du secteur et pour sa contribution effective au développement socio-économique des villes, que des mesures adéquates soient prises."}]},{id:"audit",chapter:1,num:"04",kicker:"Chapitre 2 · Étape 1 · Audit :",title:"Audit de la gestion en cours.",bullets:["Liste exhaustive de tous les acteurs du secteur","Examen du mécanisme d'attribution des supports","Examen du cahier des charges"],content:[{t:"Étape 3.1 :",b:"Pour que l'activité d'exploitation des panneaux publicitaires participe au rayonnement d'une ville (ou d'un pays), il faut faire un audit de la gestion en cours."},{t:"En quoi consiste-t-il ?",b:"En l'établissement de la liste exhaustive de tous les acteurs — entreprise ou personne exploitant des panneaux à des fins publicitaires — et en l'examen du mécanisme d'attribution des supports et du cahier des charges."}]},{id:"etat-lieux",chapter:1,num:"05",kicker:"Chapitre 2 · Étape 2 · État des lieux :",title:"État des lieux du parc existant.",bullets:["Relevé GPS détaillé et précis de tous les panneaux","Plan piqué géolocalisable des supports"],content:[{t:"Étape 3.2 :",b:"Faire le relevé (GPS) détaillé et précis de l'ensemble des panneaux publicitaires présents."},{t:"Un plan géolocalisable :",b:"Établir le plan piqué géolocalisable de ces supports : chaque panneau est localisé avec précision sur le territoire."}]},{id:"zonage",chapter:1,num:"06",kicker:"Chapitre 2 · Étape 3 · Zonage :",title:"Zonage du territoire.",bullets:["Délimitation selon des normes spécifiques du territoire","Des supports facteurs d'embellissement et de modernité","Paysage publicitaire harmonieux et équilibré","Grilles tarifaires adaptées aux réalités locales"],content:[{t:"Étape 3.3 :",b:"Pour un réaménagement optimal du plan d'implantation des panneaux publicitaires, il faut effectuer des délimitations suivant des normes spécifiques du territoire et proposer des supports facteurs d'embellissement et symboles de modernité."},{t:"Le but du zonage :",b:"Créer les conditions d'un développement harmonieux et équilibré du paysage de l'affichage publicitaire, ainsi que l'établissement de grilles tarifaires en adéquation avec les réalités économiques des villes. Il consiste donc à délimiter des espaces à cette fin."}]},{id:"constitution-lots",chapter:1,num:"07",kicker:"Chapitre 2 · Étape 4 · Constitution des lots :",title:"Constitution des lots.",bullets:["Le « Mobilier Urbain de Publicité » : des objets d'embellissement","Des lots pour les appels d'offres","Équilibre des espaces et des types de supports"],content:[{t:"Étape 4 :",b:"Le terme « Mobilier Urbain de Publicité » s'inscrit dans un contexte où les panneaux publicitaires ne sont plus seulement des supports publicitaires, mais de véritables objets (ou meubles) d'embellissement et de décoration des villes."},{t:"Vers les appels d'offres :",b:"Après études et validation des supports devant être pris en compte dans le cadre du réaménagement, on procède à la constitution des lots devant faire l'objet d'appels d'offres pour la mise en concession des différents espaces publicitaires."},{t:"Garantir un équilibre :",b:"La constitution des lots est faite de manière à garantir l'équilibre des espaces et celui en matière de type de support des différentes régies publicitaires."}]},{id:"mise-concession",chapter:1,num:"08",kicker:"Chapitre 2 · Étape 5 · Mise en concession :",title:"Mise en concession des espaces.",bullets:["Une technique variable selon les pays","Fonction des réalités économiques et législatives","À traiter au cas par cas"],content:[{t:"Étape 5 :",b:"La technique de mise en concession des espaces publicitaires est variable. Elle est fonction des réalités économiques, politico-administratives et de la législation en vigueur dans chaque pays."},{t:"À retenir :",b:"NB : il faut partir d'exemples précis et traiter le sujet au cas par cas."}]},{id:"attribution",chapter:1,num:"09",kicker:"Chapitre 2 · Étape 6 · Attribution :",title:"Attribution des espaces.",bullets:["Sur la base du cahier des charges","Contenu dans le dossier d'appel d'offres"],content:[{t:"Étape 6 :",b:"L'attribution des espaces aux régies publicitaires est faite sur la base du cahier des charges contenu dans le dossier d'appel d'offres."}]},{id:"gestion",chapter:1,num:"10",kicker:"Chapitre 2 · Étape 7 · Gestion :",title:"Gestion par les régies publicitaires.",bullets:["Collectivités locales ou Gouvernement","Selon les textes en vigueur dans chaque pays","Transparence, professionnalisme, efficience"],content:[{t:"Étape 7 :",b:"La gestion par les régies publicitaires est encadrée, dans certains pays, par les collectivités locales. Dans d'autres, elle est du ressort du Gouvernement par l'intermédiaire du Ministère de la Communication, etc."},{t:"L'essentiel :",b:"Plus généralement, c'est selon les textes et dispositions en vigueur dans chaque pays. L'essentiel est que la transparence, le professionnalisme et l'efficience soient rigoureusement observés."}]},{id:"evaluation",chapter:2,num:"11",kicker:"Chapitre 3 · Évaluation :",title:"Évaluer le système d'exploitation du Mobilier Urbain de Publicité.",bullets:["Évaluer tout le processus, de l'audit à la gestion","Un mécanisme scientifiquement soutenable et autonome","Prévenir les dérapages, sécuriser sur le long terme"],content:[{t:"Chapitre 3 :",b:"Pour garantir un développement harmonieux du secteur d'exploitation des panneaux publicitaires / Mobilier Urbain de Publicité, il faut prévoir, dans les réformes, un mécanisme d'évaluation de l'ensemble du processus, depuis l'audit jusqu'à la gestion par les régies publicitaires."},{t:"Un pilotage autonome :",b:"Le mécanisme d'évaluation doit être scientifiquement soutenable, avec une autonomie certaine dans son pilotage. L'évaluation permet de prévenir les risques de dérapage et de sécuriser les intérêts des différents acteurs du secteur et des populations, à travers leur cadre de vie, sur le long terme."}]},{id:"mise-a-jour",chapter:3,num:"12",kicker:"Chapitre 4 · Mise à jour :",title:"Pérenniser et faire évoluer le secteur.",bullets:["Pérenniser les acquis de développement","Le rayonnement des villes par les supports","Une évolution en phase avec l'urbanisation"],content:[{t:"Chapitre 4 :",b:"La mise à jour du secteur d'exploitation des panneaux publicitaires / Mobilier Urbain de Publicité est importante pour pérenniser les acquis de développement de l'activité."},{t:"Pourquoi ?",b:"Elle est importante pour le rayonnement des villes par l'exploitation des supports de publicité et favorisera l'essor de l'activité en adéquation avec l'urbanisation."},{t:"Concrètement :",b:"Elle consiste à s'assurer que le secteur, dans son évolution, soit en phase avec l'évolution démographique et le développement infrastructurel des villes."}]},{id:"quiz",chapter:4,num:"13",kicker:"Questionnaire · Module 1 :",title:"Douze questions pour valider le module.",bullets:["5 définitions","7 questions de compréhension","Testez vos acquis en fin de parcours"],content:[]}],is=[{q:"Que désigne la panneautique ?",options:["L'ensemble des moyens et techniques d'installation et de gestion des panneaux publicitaires","La seule vente d'espaces publicitaires","La fabrication du mobilier urbain","La régulation des réseaux sociaux"],correct:0,explain:"La panneautique est l'ensemble des moyens et techniques d'installation et de gestion des panneaux publicitaires — un corps de métier pluridisciplinaire."},{q:"Quel est le but du zonage ?",options:["Multiplier les panneaux pour maximiser les recettes","Créer les conditions d'un développement harmonieux et équilibré du paysage de l'affichage publicitaire","Supprimer toute publicité des villes","Uniformiser tous les panneaux du pays"],correct:1,explain:"Le zonage délimite des espaces pour un paysage publicitaire harmonieux et équilibré, et établit des grilles tarifaires adaptées aux réalités économiques."},{q:"Que désigne le « Mobilier Urbain de Publicité » ?",options:["Les panneaux posés sur le mobilier des cafés","La publicité diffusée à la télévision urbaine","Des panneaux devenus de véritables objets d'embellissement et de décoration des villes","Les panneaux strictement destinés à la location"],correct:2,explain:"Le Mobilier Urbain de Publicité : des panneaux qui ne sont plus de simples supports, mais de véritables meubles d'embellissement et de décoration des villes."},{q:"Qu'est-ce qu'une régie publicitaire ?",options:["L'organisme autorisé à gérer et exploiter des espaces publicitaires","L'autorité qui interdit la publicité","L'entreprise qui imprime les affiches","L'organisme de contrôle des réseaux sociaux"],correct:0,explain:"Les régies publicitaires sont les exploitants auxquels les espaces sont attribués sur la base du cahier des charges contenu dans le dossier d'appel d'offres."},{q:"Qu'est-ce que la pollution visuelle, dans le cadre de l'exploitation des panneaux ?",options:["Les panneaux trop colorés","La publicité lumineuse la nuit","Le bruit produit par les panneaux numériques","Une pléthore de panneaux mal organisés qui dégrade le cadre de vie"],correct:3,explain:"Une pléthore de panneaux issus d'un secteur mal organisé ou non encadré est cause de pollution visuelle, d'insalubrité et d'insécurité."},{q:"En quoi consiste une réorganisation du secteur d'exploitation des panneaux publicitaires ?",options:["À augmenter le nombre d'exploitants","À privatiser tous les supports","À remettre de l'ordre : audit, état des lieux, zonage, lots, concession, attribution, gestion","À supprimer le cahier des charges"],correct:2,explain:"La réorganisation suit sept étapes : audit, état des lieux, zonage, constitution des lots, mise en concession, attribution des espaces et gestion par les régies."},{q:"En quoi consiste le réaménagement de l'espace publicitaire d'une ville ?",options:["Délimiter des zones et proposer des supports facteurs d'embellissement et de modernité","Remplacer tous les panneaux par des écrans numériques","Retirer les panneaux des centres-villes","Uniformiser les tarifs à l'échelle nationale"],correct:0,explain:"Le réaménagement repose sur le zonage : délimiter des espaces selon des normes et proposer des supports qui embellissent et modernisent le cadre de vie."},{q:"Comment prévenir la pollution visuelle due à l'exploitation des panneaux ?",options:["En interdisant toute nouvelle publicité","En augmentant le nombre de panneaux","En confiant le secteur à une seule régie","En réglementant, auditant et zonant le secteur d'exploitation"],correct:3,explain:"Un secteur réglementé et encadré (audit, état des lieux, zonage, normes) prévient la pléthore de panneaux à l'origine de la pollution visuelle."},{q:"Comment s'assurer d'une bonne rentabilité et de la pérennité du secteur ?",options:["En baissant tous les tarifs","Par la transparence, le professionnalisme, l'efficience et une mise à jour régulière","En vendant les panneaux aux enchères chaque année","En supprimant l'évaluation"],correct:1,explain:"Transparence, professionnalisme et efficience sont essentiels ; l'évaluation et la mise à jour régulière pérennisent les acquis du secteur."},{q:"Peut-on installer un panneau publicitaire n'importe où ? Pourquoi ?",options:["Oui, la liberté d'entreprendre le permet","Oui, sauf dans les capitales","Non, l'implantation suit des normes, un zonage et des délimitations","Non, uniquement sur les autoroutes"],correct:2,explain:"L'implantation suit un zonage et des délimitations selon des normes spécifiques du territoire, pour un développement harmonieux et un cadre de vie agréable."},{q:"Quelle est l'importance du panneau publicitaire dans une ville ?",options:["Il booste la concurrence, l'économie et embellit le cadre de vie","Il ne sert qu'à décorer","Il remplace les marchés publics","Il est surtout un obstacle à la circulation"],correct:0,explain:"Il booste la concurrence entre entreprises, propulse l'économie et, bien aménagé, contribue à l'embellissement des villes."},{q:"N'importe qui peut-il exercer l'activité d'exploitation de panneaux publicitaires ?",options:["Oui, c'est totalement libre","Oui, moyennant une simple taxe","Non, seuls les ministères peuvent exploiter","Non : acteurs identifiés, appels d'offres et gestion encadrée"],correct:3,explain:"Le secteur est encadré : audit des acteurs, appels d'offres, cahier des charges, concession et gestion selon les textes en vigueur."}],de=n=>document.querySelector(n);function Yg(){const n={topbar:de("#ui-topbar"),chapter:de("#ui-chapter"),progressFill:de("#ui-progress-fill"),dots:de("#ui-dots"),hint:de("#ui-hint"),clickHint:de("#ui-click-hint"),title:de("#ui-title"),card:de("#ui-card"),cardKicker:de("#ui-card .card-kicker"),cardTitle:de("#ui-card .card-title"),cardBody:de("#ui-card .card-body"),quiz:de("#ui-quiz"),quizScore:de("#quiz-score"),quizList:de("#quiz-list"),quizFill:de("#quiz-progress-fill"),quizResult:de("#quiz-result"),resultTitle:de("#quiz-result .result-title"),resultText:de("#quiz-result .result-text"),reader:de("#ui-reader"),readerPanel:de(".reader-panel"),readerKicker:de("#ui-reader .reader-kicker"),readerTitle:de("#ui-reader .reader-title"),readerBody:de("#ui-reader .reader-body"),readerCount:de("#reader-count"),readerPrev:de("#reader-prev"),readerNext:de("#reader-next"),readerClose:de("#reader-close"),toast:de("#ui-toast"),cardOpen:de("#card-open")};He.forEach((x,w)=>{const S=document.createElement("span");S.className="dot"+(w===0?" active":""),S.dataset.index=w,n.dots.appendChild(S)});const t={activeIndex:-1,quizAnswered:new Set,score:0,started:!1,readerOpen:!1,readerIndex:-1};let e=null,i=null;function s(x){n.progressFill.style.width=(x*100).toFixed(2)+"%"}function o(x){const w=Io[x];n.chapter.textContent=w?`${w.name} — ${w.label}`:""}function r(x,w){if(x===t.activeIndex)return;t.activeIndex=x;const S=He[x];document.querySelectorAll(".dot").forEach((P,I)=>{P.classList.toggle("active",I===x)});const z=S.id==="quiz";n.card.classList.toggle("show",!z&&x!==-1),n.quiz.classList.toggle("show",z),z||(n.cardKicker.textContent=S.kicker,n.cardTitle.textContent=S.title,n.cardBody.innerHTML=`<p class="card-note">Leçon prête à lire : ouvrez la fenêtre dédiée pour parcourir l'étape en entier.</p>`),o(S.chapter)}function a(x){x>.015&&(t.started=!0),n.title.classList.toggle("hide",t.started)}function l(x,w){s(x),r(w),a(x);const S=n.quiz.classList.contains("show");n.clickHint.classList.toggle("visible",w>=0&&!S&&!t.readerOpen)}function c(x){t.readerIndex=x,t.readerOpen=!0;const w=He[x];if(n.readerKicker.textContent=w.kicker,n.readerTitle.textContent=w.title,n.readerBody.innerHTML="",w.id==="quiz"){const S=document.createElement("ul");S.className="reader-bullets",w.bullets.forEach(P=>{const I=document.createElement("li");I.textContent=P,S.appendChild(I)}),n.readerBody.appendChild(S);const z=document.createElement("button");z.className="reader-quiz-btn",z.textContent="Lancer le questionnaire",z.addEventListener("click",u),n.readerBody.appendChild(z)}else w.content.forEach(S=>{const z=document.createElement("p"),P=document.createElement("span");P.className="body-t",P.textContent=S.t,z.appendChild(P),z.appendChild(document.createTextNode(S.b)),n.readerBody.appendChild(z)});n.readerCount.textContent=`${String(x+1).padStart(2,"0")} / ${String(He.length).padStart(2,"0")}`,n.readerPanel.scrollTop=0,n.title.classList.add("hide"),n.reader.classList.add("show"),e&&e(!0)}function u(){t.readerOpen&&(t.readerOpen=!1,n.reader.classList.remove("show"),e&&e(!1))}function d(x){if(!t.readerOpen)return;const w=Math.max(0,Math.min(He.length-1,t.readerIndex+x));w!==t.readerIndex&&c(w)}n.readerClose.addEventListener("click",u),n.readerPrev.addEventListener("click",()=>d(-1)),n.readerNext.addEventListener("click",()=>d(1)),n.reader.addEventListener("click",x=>{x.target===n.reader&&u()}),n.cardOpen.addEventListener("click",()=>{t.activeIndex>=0&&c(t.activeIndex)});function h(x){n.toast.textContent=x,n.toast.classList.add("show"),clearTimeout(i),i=setTimeout(()=>n.toast.classList.remove("show"),4600)}du(t,n);function p(){return n.quiz.classList.contains("show")}function f(x){if(!p())return;const w=n.quizList.querySelectorAll(".quiz-card");for(const S of w){if(S.classList.contains("done"))continue;const z=S.querySelectorAll(".quiz-opt");x<z.length&&z[x].click();return}}const M=document.querySelectorAll(".tsize-btn");function g(x){const w=document.documentElement;w.classList.toggle("ts-sm",x===0),w.classList.toggle("ts-lg",x===2),M.forEach(S=>{const z=Number(S.dataset.tsize)===x;S.classList.toggle("active",z),S.setAttribute("aria-pressed",String(z))});try{localStorage.setItem("panneau-tsize",String(x))}catch{}}let m=1;try{const x=Number(localStorage.getItem("panneau-tsize"));x>=0&&x<=2&&(m=x)}catch{}return g(m),M.forEach(x=>x.addEventListener("click",()=>g(Number(x.dataset.tsize)))),{updateGlobal:l,el:n,openReader:c,closeReader:u,readerNav:d,showToast:h,isReaderOpen:()=>t.readerOpen,quizOpen:p,answerQuiz:f,setReaderListener:x=>{e=x}}}function du(n,t){const e=t.quizList;e.innerHTML="",is.forEach((i,s)=>{const o=document.createElement("div");o.className="quiz-card",o.innerHTML=`
      <div class="quiz-num">Question ${String(s+1).padStart(2,"0")}</div>
      <div class="quiz-q"></div>
      <div class="quiz-opts"></div>
      <div class="quiz-explain"></div>
    `,o.querySelector(".quiz-q").textContent=i.q;const r=o.querySelector(".quiz-opts");i.options.forEach((a,l)=>{const c=document.createElement("button");c.className="quiz-opt",c.innerHTML=`<span class="opt-letter">${String.fromCharCode(65+l)}.</span> <span class="opt-text"></span>`,c.querySelector(".opt-text").textContent=a,c.addEventListener("click",()=>{if(n.quizAnswered.has(s))return;n.quizAnswered.add(s);const u=l===i.correct;r.querySelectorAll(".quiz-opt").forEach((h,p)=>{p===i.correct?h.classList.add("correct"):p===l?h.classList.add("wrong"):h.classList.add("dim")}),u&&(n.score++,document.querySelector("#quiz-score").textContent=n.score);const d=o.querySelector(".quiz-explain");d.textContent=i.explain,d.classList.add("show"),o.classList.add("done",u?"correct-q":"wrong-q"),t.quizFill.style.width=(n.quizAnswered.size/is.length*100).toFixed(2)+"%",n.quizAnswered.size===is.length&&$g(n,t)}),r.appendChild(c)}),e.appendChild(o)})}function $g(n,t){const e=Math.round(n.score/is.length*100);let i;e>=90?i="Excellent ! Vous maîtrisez le module sur le bout des doigts.":e>=70?i="Très bien ! Quelques points à consolider, mais la base est solide.":e>=50?i="Bien. Relisez les leçons indiquées pour consolider vos acquis.":i="Le module mérite une seconde lecture : remontez le parcours et revivez les étapes.",t.resultTitle.textContent=e>=70?"Formation validée.":"Formation à revoir.";const s=is.length-n.score;t.resultText.innerHTML=`Score : <strong>${n.score} / ${is.length}</strong> — ${i}<br><span class="result-breakdown">${n.score} bonne${n.score>1?"s":""} réponse${n.score>1?"s":""} · ${s} à revoir</span>`,t.quizResult.classList.remove("hide"),document.querySelector("#quiz-retry").addEventListener("click",()=>{n.quizAnswered.clear(),n.score=0,document.querySelector("#quiz-score").textContent=0,t.quizFill.style.width="0%",t.quizResult.classList.add("hide"),du(n,t)}),document.querySelector("#quiz-restart").addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})})}const Re={sky0:"#f6edd8",sky1:"#f2e6ca",sky2:"#eee0bf",sky3:"#eadab4",sky4:"#e6d3a6",sky5:"#e2cc9a",asphalt0:"#b39a6e",asphalt1:"#c4ab7e",asphalt2:"#d0b98c",bronze:"#9a8157",terracotta:"#c08a68",amber:"#cfa574"},An=Math.PI*2;function Le(n,t,e,i,s,o){n.beginPath(),n.moveTo(t+o,e),n.arcTo(t+i,e,t+i,e+s,o),n.arcTo(t+i,e+s,t,e+s,o),n.arcTo(t,e+s,t,e,o),n.arcTo(t,e,t+i,e,o),n.closePath()}function we(n,t,e,i,s,o){n.font=s,n.textAlign="center",n.fillStyle=o,n.fillText(t,e,i)}function Zg(n,t,e){const i=n.createLinearGradient(0,0,0,e);i.addColorStop(0,Re.sky0),i.addColorStop(.3,Re.sky1),i.addColorStop(.58,Re.sky2),i.addColorStop(.78,Re.sky3),i.addColorStop(.9,Re.sky4),i.addColorStop(1,Re.sky5),n.fillStyle=i,n.fillRect(0,0,t,e);const s=n.createRadialGradient(t/2,e*.6,10,t/2,e*.6,t*.72);s.addColorStop(0,"rgba(240,196,126,0.5)"),s.addColorStop(.5,"rgba(238,184,118,0.18)"),s.addColorStop(1,"rgba(238,184,118,0)"),n.fillStyle=s,n.fillRect(0,0,t,e)}function zr(n,t,e,{minH:i,maxH:s,alpha:o,body:r,win:a,density:l,tall:c=.14}){let u=-12;for(;u<t+12;){const d=22+Math.random()*52,h=i+Math.random()*(s-i);n.fillStyle=r,n.globalAlpha=o,n.fillRect(u,e-h,d,h),Math.random()<c&&(n.fillRect(u+d/2-1,e-h-12,2,12),Math.random()<.5&&(n.fillStyle="rgba(196,138,104,0.85)"),n.fillRect(u+d/2-1,e-h-12,2,2));const p=Math.floor(d/14);for(let f=0;f<p;f++)for(let M=0;M<Math.floor(h/17);M++)if(Math.random()<l){const g=u+5+f*14,m=e-h+7+M*17;n.fillStyle=a,n.globalAlpha=o*(.4+Math.random()*.6),n.fillRect(g,m,4.5,6.5),Math.random()<.28&&(n.fillStyle="rgba(170,130,80,0.45)",n.fillRect(g-1.5,m-1.5,7.5,9.5))}n.globalAlpha=1,u+=d+4+Math.random()*9}}function Li(n,t,e){const i=e*.6;return Zg(n,t,e),zr(n,t,i,{minH:34,maxH:92,alpha:.45,body:"#d6c095",win:"#8f7a4e",density:.3}),zr(n,t,i,{minH:20,maxH:62,alpha:.6,body:"#c9b184",win:"#7a663c",density:.5}),zr(n,t,i,{minH:13,maxH:44,alpha:.85,body:"#bda375",win:"#665430",density:.68}),Kg(n,t,i),i}function Kg(n,t,e){const i=n.canvas.height,s=t/2,o=n.createLinearGradient(0,e,0,i);o.addColorStop(0,Re.asphalt0),o.addColorStop(.5,Re.asphalt1),o.addColorStop(1,Re.asphalt2),n.fillStyle=o,n.beginPath(),n.moveTo(s-1,e),n.lineTo(-40,i+20),n.lineTo(t+40,i+20),n.lineTo(s+1,e),n.closePath(),n.fill();const r=n.createRadialGradient(t/2,e+(i-e)*.38,6,t/2,e+(i-e)*.38,t*.24);r.addColorStop(0,"rgba(160,120,60,0.18)"),r.addColorStop(1,"rgba(160,120,60,0)"),n.fillStyle=r,n.fillRect(0,e,t,i-e),n.strokeStyle="rgba(90,70,40,0.55)",n.lineWidth=2,n.setLineDash([16,30]),n.beginPath(),n.moveTo(s,e+2),n.lineTo(s,i+20),n.stroke(),n.setLineDash([]),n.strokeStyle="rgba(90,70,40,0.25)",n.lineWidth=3;for(const a of[-1,1])n.beginPath(),n.moveTo(s+a*1.2,e+2),n.lineTo(t/2+a*t*.48,i+10),n.stroke()}function si(n,t,e,i,s){n.save(),n.translate(t,e),n.rotate(s||0),n.globalAlpha=.34,n.fillStyle="#000",n.beginPath(),n.ellipse(0,0,62*i,10*i,0,0,An),n.fill(),n.globalAlpha=1;const o=n.createLinearGradient(-46*i,0,-38*i,0);o.addColorStop(0,"#6b5230"),o.addColorStop(1,"#8a6f45"),n.fillStyle=o,n.fillRect(-46*i,-80*i,9*i,80*i),n.fillRect(37*i,-80*i,9*i,80*i);const r=134*i,a=98*i,l=-r/2,c=-186*i;Le(n,l,c,r,a,7*i),n.fillStyle="#f7eeda",n.fill(),n.lineWidth=5*i,n.strokeStyle=Re.bronze,n.stroke();const u=n.createLinearGradient(0,c,0,c+a);u.addColorStop(0,"#fdf8ec"),u.addColorStop(1,"#f1e6cb"),Le(n,l+7*i,c+7*i,r-14*i,a-14*i,5*i),n.fillStyle=u,n.fill(),n.fillStyle=Re.terracotta,n.fillRect(l+7*i,c+7*i,r-14*i,5*i),n.strokeStyle="rgba(90,70,40,0.3)",n.lineWidth=1.5*i,Le(n,l+13*i,c+15*i,r-26*i,a-26*i,4*i),n.stroke(),we(n,"PANNEAUTIQUE · DOMAINE PUBLIC",0,c+34*i,`600 ${Math.max(7,9*i)}px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif`,"#7a5f38"),we(n,"PUBLICITÉ & AFFICHAGE",0,c+60*i,`700 ${Math.max(10,15*i)}px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif`,"#3a2e1f"),we(n,"RÈGLES · ZONES · CONCESSIONS",0,c+80*i,`700 ${Math.max(6,8*i)}px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif`,"#b3825e"),n.fillStyle=Re.amber,n.shadowColor=Re.amber,n.shadowBlur=16*i,n.beginPath(),n.arc(0,c-6*i,3*i,0,An),n.fill(),n.shadowBlur=0;const d=n.createRadialGradient(0,-70*i,4,0,-70*i,48*i);d.addColorStop(0,"rgba(232,163,92,0.2)"),d.addColorStop(1,"rgba(232,163,92,0)"),n.fillStyle=d,n.fillRect(-64*i,-124*i,128*i,64*i),n.restore()}function Jg(n,t,e,i,s){n.save(),n.translate(t,e),n.strokeStyle="#6b5230",n.lineCap="round",n.lineWidth=Math.max(3,i*.035),n.beginPath(),n.moveTo(0,0),n.quadraticCurveTo(10,-i*.5,5,-i*.94),n.stroke(),n.fillStyle="#5f7a4a";for(let o=0;o<6;o++){const r=-Math.PI*.95+o/5*Math.PI*.62;n.beginPath(),n.ellipse(Math.cos(r)*i*.34,-i*.97+Math.sin(r)*i*.1,i*.3,i*.05,r-Math.PI/2,0,An),n.fill()}n.restore()}function Xs(n,t,e,i){const s=n.canvas.width,o=n.canvas.height;n.fillStyle="rgba(253,250,242,0.9)",n.fillRect(0,e,s,o-e),n.fillStyle="rgba(138,111,69,0.35)",n.fillRect(0,e,s,2),we(n,t,s/2,e+i*1.45,`700 ${i}px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif`,"#7a5f38")}function ln(n,t,e,i){const s=n.createRadialGradient(t/2,i,4,t/2,i,e*.6);s.addColorStop(0,"rgba(240,200,140,0.2)"),s.addColorStop(1,"rgba(240,200,140,0)"),n.fillStyle=s,n.fillRect(0,0,t,e);const o=n.createRadialGradient(t/2,e*.45,t*.2,t/2,e*.5,t*.74);o.addColorStop(0,"rgba(0,0,0,0)"),o.addColorStop(1,"rgba(140,115,75,0.3)"),n.fillStyle=o,n.fillRect(0,0,t,e);const r=n.createLinearGradient(0,0,0,e*.42);r.addColorStop(0,"rgba(120,95,55,0.14)"),r.addColorStop(1,"rgba(120,95,55,0)"),n.fillStyle=r,n.fillRect(0,0,t,e*.42),n.globalAlpha=.055;for(let a=0;a<420;a++)n.fillStyle=Math.random()>.5?"#fff":"#000",n.fillRect(Math.random()*t,Math.random()*e,1,1);n.globalAlpha=1}function Ja(n,t,e){const i=n.createLinearGradient(0,0,0,e);i.addColorStop(0,"#f3ead4"),i.addColorStop(.7,"#e6d8ba"),i.addColorStop(1,"#d9c8a2"),n.fillStyle=i,n.fillRect(0,0,t,e),n.fillStyle="rgba(120,95,55,0.18)";for(let c=0;c<5;c++)n.fillRect(t*(.04+c*.2),e*.05,t*.14,e*.44);const s=t*.6,o=e*.1,r=t*.26,a=e*.36;Le(n,s,o,r,a,8);const l=n.createLinearGradient(0,o,0,o+a);l.addColorStop(0,"#cfe0e2"),l.addColorStop(1,"#f0e2c0"),n.fillStyle=l,n.fill(),n.strokeStyle="#7a5f38",n.lineWidth=6,Le(n,s,o,r,a,8),n.stroke(),n.strokeStyle="rgba(90,70,40,0.4)",n.lineWidth=3,n.beginPath(),n.moveTo(s+r/2,o),n.lineTo(s+r/2,o+a),n.moveTo(s,o+a/2),n.lineTo(s+r,o+a/2),n.stroke()}function ja(n,t,e){const i=e*.64,s=n.createLinearGradient(0,i,0,e);s.addColorStop(0,"#b08a5c"),s.addColorStop(.2,"#96714a"),s.addColorStop(1,"#6b4f30"),n.fillStyle=s,n.beginPath(),n.moveTo(t*.05,i),n.lineTo(t*.95,i),n.lineTo(t*.85,e),n.lineTo(t*.15,e),n.fill(),n.fillStyle="#7a5f3c",n.beginPath(),n.moveTo(t*.12,e*.8),n.lineTo(t*.88,e*.8),n.lineTo(t*.85,e),n.lineTo(t*.15,e),n.fill(),n.fillStyle="rgba(255,240,210,0.35)",n.beginPath(),n.moveTo(t*.05,i),n.lineTo(t*.95,i),n.lineTo(t*.93,i+10),n.lineTo(t*.07,i+10),n.fill()}function Bo(n,t,e,i,s,o,r){if(n.save(),n.translate(t,e),n.rotate(o||0),n.shadowColor="rgba(0,0,0,0.4)",n.shadowBlur=18,n.shadowOffsetY=10,Le(n,-i/2,-s/2,i,s,4),n.fillStyle="#f4ead0",n.fill(),n.shadowBlur=0,n.strokeStyle="rgba(120,100,70,0.5)",n.lineWidth=2,n.stroke(),n.fillStyle=Re.terracotta,n.fillRect(-i/2,-s/2,i,s*.06),r){const a=typeof r=="number"?r:r.length;n.fillStyle="rgba(60,50,34,0.5)";for(let l=0;l<a;l++)n.fillRect(-i*.36,-s*.26+l*s*.09,i*.72,s*.02)}n.restore()}function hu(n,t,e){const i=n.createLinearGradient(0,0,0,e);i.addColorStop(0,"#efe7d3"),i.addColorStop(1,"#e0d3b6"),n.fillStyle=i,n.fillRect(0,0,t,e);for(let s=0;s<80;s++){const o=22+Math.random()*64,r=14+Math.random()*42;n.fillStyle=`rgba(178,166,138,${(.12+Math.random()*.2).toFixed(3)})`,n.fillRect(Math.random()*(t-o),Math.random()*(e-r),o,r)}n.fillStyle="rgba(120,162,184,0.4)",n.beginPath(),n.moveTo(0,e*.06),n.bezierCurveTo(t*.3,e*0,t*.62,e*.12,t*.8,e*.05),n.lineTo(t*.88,0),n.lineTo(0,0),n.fill(),n.strokeStyle="rgba(120,104,80,0.55)",n.lineWidth=2.5;for(let s=0;s<7;s++){const o=e*(.13+s*.13);n.beginPath(),n.moveTo(0,o),n.bezierCurveTo(t*.3,o+20,t*.6,o-20,t,o+8),n.stroke()}for(let s=0;s<9;s++){const o=t*(.1+s*.1);n.beginPath(),n.moveTo(o,0),n.bezierCurveTo(o+16,e*.3,o-16,e*.62,o+10,e),n.stroke()}n.lineWidth=5,n.strokeStyle="rgba(193,104,63,0.4)",n.beginPath(),n.moveTo(0,e*.2),n.bezierCurveTo(t*.35,e*.26,t*.55,e*.55,t*.84,e*.72),n.stroke(),n.save(),n.translate(t*.06,e*.09),n.fillStyle="rgba(255,255,255,0.65)",n.beginPath(),n.arc(0,0,26,0,An),n.fill(),n.strokeStyle="rgba(90,74,52,0.6)",n.lineWidth=2,n.stroke(),n.fillStyle=Re.terracotta,n.beginPath(),n.moveTo(0,-18),n.lineTo(5,0),n.lineTo(-5,0),n.closePath(),n.fill(),we(n,"N",0,-32,"700 15px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","rgba(90,74,52,0.9)"),n.restore()}function Cs(n,t,e,i,s){n.save(),n.shadowColor="rgba(0,0,0,0.4)",n.shadowBlur=8,n.shadowOffsetY=4,n.fillStyle=i,n.beginPath(),n.moveTo(t,e-34),n.quadraticCurveTo(t+16,e-4,t+12,e-2),n.lineTo(t,e+6),n.lineTo(t-12,e-2),n.quadraticCurveTo(t-16,e-4,t,e-34),n.fill(),n.shadowBlur=0,n.fillStyle="#fff",n.beginPath(),n.arc(t,e-30,7.5,0,An),n.fill(),n.fillStyle=i,n.beginPath(),n.arc(t,e-30,3.5,0,An),n.fill(),s&&(n.font="800 19px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",n.lineWidth=4,n.strokeStyle="rgba(240,236,220,0.9)",n.strokeText(s,t+17,e-22),n.fillStyle="#2a2118",n.fillText(s,t+17,e-22)),n.restore()}function Fr(n,t,e,i,s,o,r,a){const l=Math.PI*.75,c=Math.PI*1.5;n.lineCap="round",n.beginPath(),n.arc(t,e,i,l,l+c),n.strokeStyle="rgba(110,90,55,0.22)",n.lineWidth=14,n.stroke();const u=n.createLinearGradient(t-i,0,t+i,0);u.addColorStop(0,Re.terracotta),u.addColorStop(1,s),n.beginPath(),n.arc(t,e,i,l,l+c*o),n.strokeStyle=u,n.lineWidth=14,n.stroke(),we(n,String(Math.round(o*100))+"%",t,e+8,"800 34px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#3a2e1f"),we(n,r,t,e+i*.78+8,"700 18px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","rgba(90,74,52,0.75)")}function fu(n,t,e){const i=Li(n,t,e);Jg(n,t*.1,i+20,e*.5),si(n,t*.5,i+2,1.12,0),Xs(n,"LE PARCOURS DE LA PANNEAUTIQUE SUR LE DOMAINE PUBLIC",e*.86,e*.03),ln(n,t,e,i)}function jg(n,t,e){const i=Li(n,t,e),s=5;for(let o=0;o<s;o++){const r=o===2,a=t*(.14+o*.18),l=i+(e-i)*.82*Math.pow(1-o/(s-1),.7)*.85+i*.12,c=.5+.18*o+(r?.12:0);si(n,a,Math.min(l,e-10),c,r?0:(o-2)*.05)}we(n,"LA PANNEAUTIQUE, LEVIER ÉCONOMIQUE DU DOMAINE PUBLIC",t/2,e*.3,"700 34px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#3a2e1f"),n.shadowColor="rgba(255,255,255,0.75)",n.shadowBlur=12,we(n,"CHAQUE SUPPORT EST UNE RESSOURCE",t/2,e*.34,"600 20px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#b3825e"),n.shadowBlur=0,ln(n,t,e,i)}function Qg(n,t,e){const i=Li(n,t,e);si(n,t*.2,i+2,1,-.1),si(n,t*.46,i-6,.9,.12),si(n,t*.68,i+2,.75,-.26),si(n,t*.3,i+(e-i)*.7,.55,.38);const s=i+(e-i)*.92;n.fillStyle="rgba(253,250,242,0.92)",Le(n,t*.05,s,t*.34,e*.05,4),n.fill();for(let o=0;o<12;o++)o%2===0?n.fillStyle="#cfa574":n.fillStyle="#7a5f38",n.fillRect(t*.055+o*t*.027,s+e*.008,t*.027,e*.034);we(n,"PANNEAUX ANARCHIQUES — LE CONSTAT",t/2,s-e*.02,"700 28px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#3a2e1f"),ln(n,t,e,i)}function t_(n,t,e){Ja(n,t,e),ja(n,t,e),Bo(n,t*.3,e*.56,t*.3,e*.3,-.04,8),Bo(n,t*.48,e*.6,t*.26,e*.26,.03,6);const i=t*.74,s=e*.56;n.save(),n.translate(i,s),n.shadowColor="rgba(0,0,0,0.45)",n.shadowBlur=16,n.shadowOffsetY=8,Le(n,-t*.14,-e*.14,t*.28,e*.28,6),n.fillStyle="#e8d9b8",n.fill(),n.shadowBlur=0,n.strokeStyle="rgba(150,120,70,0.5)",n.stroke(),n.fillStyle=Re.terracotta,n.fillRect(-t*.14,-e*.14,t*.28,e*.035),n.fillStyle="#3a2a18";for(let o=0;o<6;o++)n.fillRect(-t*.11,-e*.08+o*e*.045,t*.22,e*.012);n.fillStyle="#57a05f";for(let o=0;o<4;o++)n.beginPath(),n.arc(-t*.11,-e*.08+o*e*.045,e*.014,0,An),n.fill();we(n,"LISTE DE CONTRÔLE",0,e*.11,"700 "+e*.028+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#2a2118"),n.restore(),n.save(),n.translate(t*.5,e*.42),n.rotate(.05),n.shadowColor="rgba(0,0,0,0.4)",n.shadowBlur=14,n.fillStyle="#4a3a26",Le(n,-t*.11,-e*.02,t*.09,e*.05,6),n.fill(),n.shadowBlur=0,n.fillStyle="#f4ead0",Le(n,-t*.1,-e*.016,t*.012,e*.044,3),n.fill(),n.restore(),Xs(n,"AUDIT : COMPRENDRE AVANT D'AGIR",e*.9,e*.032),ln(n,t,e,e*.5)}function e_(n,t,e){hu(n,t,e),n.strokeStyle="rgba(193,104,63,0.85)",n.lineWidth=4,n.setLineDash([12,9]),n.beginPath(),n.moveTo(t*.16,e*.2),n.bezierCurveTo(t*.38,e*.34,t*.55,e*.5,t*.84,e*.74),n.stroke(),n.setLineDash([]),Cs(n,t*.16,e*.2,"#c97a62","P1"),Cs(n,t*.32,e*.42,"#7d9ec2","P2"),Cs(n,t*.5,e*.58,"#d2a878","P3"),Cs(n,t*.7,e*.72,"#8fae8a","P4"),Cs(n,t*.85,e*.8,"#c97a62","P5"),n.fillStyle="rgba(240,236,220,0.92)",Le(n,t*.62,e*.07,t*.3,e*.22,6),n.fill(),n.strokeStyle="rgba(150,120,70,0.5)",n.stroke(),we(n,"ÉTAT DES LIEUX — GPS",t*.77,e*.12,"700 "+e*.03+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#2a2118"),[["#c97a62","Support signalé"],["#7d9ec2","À vérifier"],["#8fae8a","Conforme"]].forEach(([s,o],r)=>{n.fillStyle=s,n.beginPath(),n.arc(t*.66,e*.16+r*e*.038,e*.013,0,An),n.fill(),n.fillStyle="#4a3a28",n.font="500 "+e*.02+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",n.textAlign="left",n.fillText(o,t*.69,e*.166+r*e*.038)}),Xs(n,"RELEVÉ GPS DE TOUS LES SUPPORTS",e*.88,e*.032),ln(n,t,e,e*.8)}function n_(n,t,e){hu(n,t,e),[[.05,.1,.3,.34,"rgba(125,158,194,0.38)","ZONE A"],[.39,.06,.32,.3,"rgba(192,138,104,0.4)","ZONE B"],[.11,.5,.34,.34,"rgba(143,174,138,0.38)","ZONE C"],[.5,.44,.36,.42,"rgba(207,165,116,0.4)","ZONE D"]].forEach(([s,o,r,a,l,c])=>{n.fillStyle=l,n.fillRect(t*s,e*o,t*r,e*a),n.strokeStyle="rgba(50,40,28,0.55)",n.lineWidth=2.5,n.setLineDash([9,6]),n.strokeRect(t*s,e*o,t*r,e*a),n.setLineDash([]),n.fillStyle="rgba(20,14,8,0.65)",Le(n,t*s+t*.012,e*o+e*.02,t*.09,e*.045,4),n.fill(),we(n,c,t*s+t*.057,e*o+e*.052,"800 "+e*.026+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#fff")}),n.fillStyle="rgba(240,236,220,0.94)",Le(n,t*.05,e*.86,t*.9,e*.11,6),n.fill(),n.strokeStyle="rgba(150,120,70,0.5)",n.stroke(),we(n,"ZONAGE : LE TERRITOIRE DÉCOUPÉ EN ZONES RÉGLEMENTÉES",t*.5,e*.925,"700 "+e*.035+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#2a2118"),ln(n,t,e,e*.85)}function i_(n,t,e){const i=Li(n,t,e),s=i+(e-i)*.72;si(n,t*.74,s,.72,-.04);const o=t*.3,r=i+(e-i)*.6;n.fillStyle="#f7eeda",Le(n,o-t*.16,r-e*.06,t*.32,e*.06,4),n.fill(),n.strokeStyle=Re.bronze,n.lineWidth=4,n.stroke(),n.fillStyle="rgba(90,70,40,0.35)";for(let a=0;a<5;a++)n.fillRect(o-t*.14+a*t*.06,r-e*.052,t*.045,e*.044);we(n,"MOBILIER URBAIN DE PUBLICITÉ — LOT N° 01",o,r-e*.09,"700 "+e*.034+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#3a2e1f"),we(n,"DES LOTS COHÉRENTS POUR UN FINANCEMENT MAÎTRISÉ",t/2,e*.24,"700 26px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#3a2e1f"),ln(n,t,e,i)}function s_(n,t,e){Ja(n,t,e),ja(n,t,e),Bo(n,t*.42,e*.55,t*.46,e*.4,-.02,10),we(n,"CONVENTION DE CONCESSION",t*.42,e*.34,"700 "+e*.036+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#2a2118");const i=t*.62,s=e*.66;n.save(),n.translate(i,s),n.rotate(-.14),n.fillStyle="#b03a30",Le(n,-t*.07,-e*.028,t*.14,e*.056,6),n.fill(),n.strokeStyle="#7c241c",n.lineWidth=3,Le(n,-t*.07,-e*.028,t*.14,e*.056,6),n.stroke(),we(n,"CONCÉDÉ",0,e*.012,"800 "+e*.03+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#f4ead0"),n.restore(),n.save(),n.translate(t*.26,e*.62),n.rotate(.12),n.strokeStyle="#2a2118",n.lineWidth=3,n.lineCap="round",n.beginPath(),n.moveTo(-t*.02,e*.05),n.lineTo(0,0),n.lineTo(t*.012,-e*.06),n.moveTo(0,0),n.lineTo(-t*.02,-e*.02),n.stroke(),n.restore(),Xs(n,"MISE EN CONCESSION DES ESPACES PUBLICITAIRES",e*.9,e*.032),ln(n,t,e,e*.5)}function o_(n,t,e){Ja(n,t,e),ja(n,t,e),Bo(n,t*.34,e*.56,t*.42,e*.36,-.02,8),we(n,"CAHIER DES CHARGES",t*.34,e*.36,"700 "+e*.034+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#2a2118");const i=t*.55,s=e*.62;n.save(),n.translate(i,s),n.rotate(-.2),n.fillStyle="#57a05f",Le(n,-t*.1,-e*.042,t*.2,e*.084,8),n.fill(),n.strokeStyle="#3a703f",n.lineWidth=4,Le(n,-t*.1,-e*.042,t*.2,e*.084,8),n.stroke(),we(n,"ADMIS",0,e*.012,"800 "+e*.055+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#f4f0d8"),n.restore(),Xs(n,"ATTRIBUTION DES LOTS PAR APPEL D'OFFRES",e*.9,e*.032),ln(n,t,e,e*.5)}function r_(n,t,e){const i=Li(n,t,e),s=t/2,o=t*.42,r=e*.46;n.fillStyle="#d3bd92",n.fillRect(s-o/2,i-r,o,r),n.fillStyle="#c9b184";for(let u=0;u<5;u++)n.fillRect(s-o/2+u*o/5+4,i-r,o/5-8,r);n.fillStyle="rgba(160,120,60,0.55)";for(let u=0;u<6;u++)for(let d=0;d<2;d++)Math.random()<.7&&n.fillRect(s-o/2+d*o/2+o*.08,i-r+r*.1+u*r*.13,o*.18,r*.06);const a=i-r*.18;n.fillStyle="#6b5230",n.fillRect(s-t*.03,a-e*.045,t*.06,e*.045),we(n,"RÉGIE PUBLICITAIRE",s,a-e*.055,"700 "+e*.026+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#3a2e1f");const l=s,c=i-r-e*.08;n.strokeStyle="#4a3a26",n.lineWidth=4,n.beginPath(),n.moveTo(l,c+e*.14),n.lineTo(l,c),n.stroke(),n.fillStyle="#c08a68",n.beginPath(),n.moveTo(l,c-e*.03),n.lineTo(l-t*.012,c),n.lineTo(l+t*.012,c),n.fill(),we(n,"GESTION PAR LES RÉGIES : UN SERVICE EN RÈGIE DIRECTE",t/2,e*.22,"700 26px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#3a2e1f"),ln(n,t,e,i)}function a_(n,t,e){const i=n.createLinearGradient(0,0,0,e);i.addColorStop(0,"#efe5cd"),i.addColorStop(1,"#e4d5b4"),n.fillStyle=i,n.fillRect(0,0,t,e),n.fillStyle="#faf3e2",Le(n,t*.05,e*.08,t*.9,e*.84,10),n.fill(),n.strokeStyle="rgba(138,111,69,0.5)",n.lineWidth=3,n.stroke(),Fr(n,t*.25,e*.38,e*.14,Re.amber,.9,"AUDIT"),Fr(n,t*.5,e*.38,e*.14,Re.terracotta,.78,"CONCESSION"),Fr(n,t*.75,e*.38,e*.14,"#7da878",.86,"GESTION"),n.strokeStyle="#7da878",n.lineWidth=4,n.beginPath(),n.moveTo(t*.12,e*.68),n.bezierCurveTo(t*.24,e*.6,t*.3,e*.66,t*.42,e*.55),n.bezierCurveTo(t*.55,e*.62,t*.6,e*.5,t*.72,e*.5),n.bezierCurveTo(t*.8,e*.48,t*.86,e*.42,t*.9,e*.4),n.stroke(),n.fillStyle="#7da878",n.beginPath(),n.arc(t*.9,e*.4,7,0,An),n.fill(),we(n,"ÉVALUATION DU SYSTÈME",t/2,e*.93,"700 "+e*.036+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#7a5f38"),ln(n,t,e,e*.5)}function l_(n,t,e){const i=Li(n,t,e);[[t*.24,e*.4],[t*.62,e*.5],[t*.84,e*.34]].forEach(([o,r])=>{const a=i-r;n.strokeStyle="#5c4a30",n.lineWidth=6,n.lineCap="butt",n.beginPath(),n.moveTo(o-18,i),n.lineTo(o+12,a),n.lineTo(o+46,a+16),n.moveTo(o+12,a),n.lineTo(o+12,a+60),n.moveTo(o+12,a+14),n.lineTo(o+58,a+26),n.stroke(),n.lineWidth=3,n.strokeStyle="#4a3a26",n.beginPath(),n.moveTo(o-8,a+26),n.lineTo(o+58,a+32),n.stroke()}),si(n,t*.5,i+(e-i)*.78,.62,-.1),we(n,"LE SECTEUR SE MODERNISE, LE PARC S'ADAPTE",t/2,e*.24,"700 28px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#3a2e1f"),ln(n,t,e,i)}function c_(n,t,e){const i=Li(n,t,e);n.fillStyle="rgba(253,250,242,0.93)",Le(n,t*.2,e*.12,t*.6,e*.72,18),n.fill(),n.strokeStyle="rgba(138,111,69,0.5)",n.lineWidth=3,n.stroke(),n.fillStyle="rgba(201,143,78,0.16)",n.beginPath(),n.arc(t*.5,e*.42,e*.22,0,An),n.fill(),n.strokeStyle="rgba(201,143,78,0.4)",n.lineWidth=3,n.stroke(),n.fillStyle="#7a5f38",n.font="800 "+e*.26+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",n.textAlign="center",n.fillText("?",t*.5,e*.52),we(n,"12 QUESTIONS — VALIDEZ VOS ACQUIS",t*.5,e*.72,"700 "+e*.034+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#3a2e1f"),we(n,"DÉFINITIONS · ZONES · CONCESSIONS · RÈGIES",t*.5,e*.79,"500 "+e*.02+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#b3825e"),ln(n,t,e,i)}const u_={presentation:fu,"lecon1-importance":jg,"lecon2-constat":Qg,audit:t_,"etat-lieux":e_,zonage:n_,"constitution-lots":i_,"mise-concession":s_,attribution:o_,gestion:r_,evaluation:a_,"mise-a-jour":l_,quiz:c_};function d_(n,t,e,i){n.width=e,n.height=i;const s=n.getContext("2d");(u_[t]||fu)(s,e,i)}const ss=Math.PI*2;let _i=null,ko=!1;function h_(){if(ko)return null;if(!_i)try{const n=document.createElement("canvas");_i=new Wa({canvas:n,antialias:!0,alpha:!1,preserveDrawingBuffer:!0}),_i.toneMapping=Vo,_i.toneMappingExposure=1.2,_i.shadowMap.enabled=!0,_i.shadowMap.type=Ho}catch(n){return ko=!0,console.warn("Illustrations 3D indisponibles (WebGL) — fallback 2D.",n),null}return _i}function zn(n,t=1024,e=1024){const i=document.createElement("canvas");i.width=t,i.height=e;const s=i.getContext("2d");n(s,t,e);const o=new We(i);return o.colorSpace=fe,o.anisotropy=4,o}function Os(n,t,e,i,s,o){n.beginPath(),n.moveTo(t+o,e),n.arcTo(t+i,e,t+i,e+s,o),n.arcTo(t+i,e+s,t,e+s,o),n.arcTo(t,e+s,t,e,o),n.arcTo(t,e,t+i,e,o),n.closePath()}function wn(n=0){const t=["sunset","waves","dune","rings","prism","ember"],e=t[n%t.length];return zn((i,s,o)=>{const r=i.createLinearGradient(0,0,s*(n%2?1:-1),o);if(r.addColorStop(0,["#8a6a4e","#96745a","#7d6350"][n%3]),r.addColorStop(1,["#c29a78","#c9a280","#b08c6e"][(n+1)%3]),i.fillStyle=r,i.fillRect(0,0,s,o),i.fillStyle="rgba(242,232,212,0.9)",i.beginPath(),i.arc(s*.5,o*.38,o*.2,0,ss),i.fill(),i.fillStyle="rgba(232,163,92,0.95)",i.beginPath(),i.arc(s*.5,o*.38,o*.13,0,ss),i.fill(),i.strokeStyle="rgba(242,232,212,0.5)",i.lineWidth=8,e==="waves"||e==="rings")for(let a=0;a<4;a++)i.beginPath(),i.arc(s*.5,o*.4,o*(.24+a*.08),0,ss),i.stroke();else for(let a=0;a<3;a++)i.beginPath(),i.moveTo(s*.2,o*(.72-a*.14)),i.quadraticCurveTo(s*.5,o*(.6-a*.14),s*.8,o*(.72-a*.14)),i.stroke();i.fillStyle="rgba(242,232,212,0.28)",i.fillRect(s*.16,o*.84,s*.68,3)},512,384)}function Or(n,t){const e=new Je([new b(0,0,-20),new b(0,0,140)]);return lu(n,e,.5,1,t).group}function vi(n,t={}){const e=new yt,i=new q({color:Jt.walnut,roughness:.8,metalness:.05}),s=new q({color:Jt.bronze,roughness:.55,metalness:.35}),o=t.w??6.6,r=t.h??4.4,a=new C(new rt(o,r,.22),i);a.position.y=3,a.castShadow=!0,e.add(a);const l=new C(new rt(o+.4,.26,.3),s);l.position.y=r+.92,e.add(l);const c=new C(new rt(o+.4,.26,.3),s);c.position.y=.72,e.add(c);const u=new Oe({map:n}),d=new C(new qt(o-.4,r-.4),u);return d.position.set(0,3,.13),e.add(d),e}function f_(n){const t=new yt,e=new q({color:Jt.walnutDark,roughness:.7,metalness:.2}),i=new C(new St(.09,.12,3.4,8),e);i.position.y=1.7,i.castShadow=!0,t.add(i);const s=new Oe({map:n}),o=new C(new qt(1.5,2.1),s);o.position.y=3.9,t.add(o);const r=new C(new St(.14,.1,.24,8),e);return r.position.y=5.15,t.add(r),t}function p_(n){const t=new yt,e=new q({color:4864550,roughness:.5,metalness:.5}),i=new q({color:10336447,roughness:.15,metalness:.4,transparent:!0,opacity:.5}),s=new q({color:Jt.bronze,roughness:.5,metalness:.45});for(const u of[-2.2,2.2]){const d=new C(new St(.08,.1,2.8,8),e);d.position.set(u,1.4,0),t.add(d)}const o=new C(new rt(5.4,.16,2.6),s);o.position.y=2.9,o.rotation.x=.06,t.add(o);const r=new C(new rt(5.4,2.1,.1),i);r.position.set(0,1.75,-1.15),t.add(r);const a=new C(new rt(4.4,.08,.4),new q({color:7031340}));a.position.set(0,.5,-.3),t.add(a);const l=new Oe({map:n}),c=new C(new qt(3.4,2),l);return c.position.set(0,1.9,.14),t.add(c),t}function m_(n){const t=new yt,e=new C(new rt(2.6,2.6,.5),new q({color:Jt.walnut,roughness:.7}));e.position.y=1.3,t.add(e);const i=new Oe({map:n}),s=new C(new qt(2.2,2),i);s.position.set(0,1.35,.27),t.add(s);const o=new C(new rt(3,.12,1),new q({color:Jt.bronze,roughness:.5,metalness:.4}));return o.position.y=2.72,t.add(o),t}function Mc(n=!1){return zn((t,e,i)=>{const s=t.createLinearGradient(0,0,0,i);s.addColorStop(0,"#efe7d3"),s.addColorStop(1,"#dcc9a6"),t.fillStyle=s,t.fillRect(0,0,e,i);for(let o=0;o<70;o++){const r=24+Math.random()*90,a=14+Math.random()*60;t.fillStyle=`rgba(178,166,138,${(.1+Math.random()*.22).toFixed(3)})`,t.fillRect(Math.random()*(e-r),Math.random()*(i-a),r,a)}t.fillStyle="rgba(120,162,184,0.35)",t.fillRect(0,0,e*.16,i*.12),t.fillRect(e*.82,i*.72,e*.18,i*.28),t.fillStyle="rgba(109,168,124,0.35)",t.fillRect(e*.6,i*.08,e*.28,i*.18),t.strokeStyle="rgba(120,104,80,0.5)",t.lineWidth=3;for(let o=0;o<6;o++){const r=i*(.1+o*.16);t.beginPath(),t.moveTo(0,r),t.bezierCurveTo(e*.3,r+16,e*.6,r-14,e,r+8),t.stroke()}for(let o=0;o<7;o++){const r=e*(.08+o*.14);t.beginPath(),t.moveTo(r,0),t.bezierCurveTo(r+14,i*.3,r-12,i*.62,r+8,i),t.stroke()}n&&[[.08,.12,.3,.34,"rgba(125,158,194,0.36)"],[.44,.1,.3,.3,"rgba(192,138,104,0.38)"],[.12,.52,.32,.32,"rgba(143,174,138,0.36)"],[.5,.5,.36,.38,"rgba(207,165,116,0.38)"]].forEach(([r,a,l,c,u])=>{t.fillStyle=u,t.fillRect(e*r,i*a,e*l,i*c),t.strokeStyle="rgba(50,40,28,0.6)",t.lineWidth=4,t.setLineDash([12,8]),t.strokeRect(e*r,i*a,e*l,i*c),t.setLineDash([])})},1024,1024)}function yc(n){const t=new yt,e=new q({color:n,roughness:.5,metalness:.2,emissive:n,emissiveIntensity:.5}),i=new C(new an(.28,.7,12),e);i.position.y=.7,t.add(i);const s=new C(new ae(.16,10,8),e);return s.position.y=1.15,t.add(s),t}function Br(){const n=new yt,t=new q({color:9071429,roughness:.6,metalness:.05}),e=new q({color:4864550,roughness:.8}),i=new C(new rt(3.4,.14,1.5),t);i.position.y=1,i.castShadow=!0,n.add(i);for(const[s,o]of[[-1.5,-.6],[1.5,-.6],[-1.5,.6],[1.5,.6]]){const r=new C(new rt(.12,1,.12),e);r.position.set(s,.5,o),n.add(r)}return n}function g_(n=.85,t=1.15,e=0){const i=new yt,s=new C(new rt(n,.02,t),new q({color:16050896,roughness:.85}));i.add(s);const o=new Ge({color:7034424});for(let r=0;r<5;r++){const a=new C(new rt(n*.72,.005,.02),o);a.position.set(0,.012,t*.32-r*t*.14),i.add(a)}return i.rotation.y=e,i}function __(){const n=new yt,t=new C(new rt(.72,.03,.98),new q({color:13215850,roughness:.6}));n.add(t);const e=new C(new qt(.62,.86),new q({color:16050896,roughness:.9}));e.position.set(0,.02,.02),n.add(e);const i=new C(new rt(.2,.06,.3),new q({color:6048304,metalness:.6,roughness:.3}));return i.position.set(0,.05,.42),n.add(i),n}function v_(n=.2){const t=new yt,e=new C(new Hn(.34,.05,12,28),new q({color:Jt.bronze,roughness:.3,metalness:.7}));t.add(e);const i=new C(new ci(.33,28),new q({color:12574950,transparent:!0,opacity:.35,roughness:.05,metalness:.4}));t.add(i);const s=new C(new St(.035,.05,.5,10),new q({color:4864550,roughness:.7}));return s.position.set(-.4,-.15,0),s.rotation.z=.9,t.add(s),t.rotation.x=n,t}function kr(n=16758896){const t=new yt,e=new q({color:4864550,roughness:.4,metalness:.6}),i=new C(new St(.28,.34,.1,16),e);i.position.y=.05,t.add(i);const s=new C(new St(.05,.05,1.1,10),e);s.position.y=.65,t.add(s);const o=new C(new rt(.9,.05,.05),e);o.position.set(.42,1.25,0),t.add(o);const r=new C(new an(.16,.22,14),e);r.position.set(.85,1.28,0),r.rotation.z=-Math.PI/2,t.add(r);const a=new C(new ae(.07,10,8),new q({color:n,emissive:n,emissiveIntensity:2.2}));a.position.set(.9,1.18,0),t.add(a);const l=new Ka(n,1.6,9,2);return l.position.set(.9,1.1,0),t.add(l),{g:t,light:l}}function M_(){const n=new yt,t=new C(new St(.05,.05,.8,12),new q({color:3813154,roughness:.4,metalness:.5}));t.position.y=.4,n.add(t);const e=new C(new an(.05,.16,12),new q({color:Jt.bronze,metalness:.8,roughness:.3}));e.position.y=-.02,e.rotation.x=Math.PI,n.add(e);const i=new C(new St(.055,.055,.18,12),new q({color:12151365,roughness:.5}));return i.position.y=.92,n.add(i),n}function Sc(n=11549232,t="CONCÉDÉ"){const e=new yt,i=new C(new St(.42,.42,.24,20),new q({color:n,roughness:.5}));e.add(i);const s=new C(new St(.12,.14,.3,12),new q({color:4864550,roughness:.6}));s.position.y=.27,e.add(s);const o=new C(new Hn(.42,.03,8,24),new q({color:16050896,roughness:.6}));return o.rotation.x=Math.PI/2,o.position.y=.121,e.add(o),e}function y_(){const n=new yt,t=new q({color:9071165,roughness:.5}),e=new C(new St(.05,.06,.9,12),t);e.rotation.z=Math.PI/2,n.add(e);const i=new C(new St(.14,.14,.34,12),t);return i.position.set(.55,.12,0),i.rotation.z=Math.PI/2,n.add(i),n}function S_(n=0){const t=new yt,e=new C(new rt(.6,.05,.42),new q({color:16050896,roughness:.85}));t.add(e);const i=new C(new St(.09,.09,.02,12),new q({color:11549232,roughness:.4}));return i.position.y=.035,t.add(i),t.rotation.y=n,t}function x_(n,t,e){return zn((i,s,o)=>{i.fillStyle="#f7f0de",Os(i,6,6,s-12,o-12,20),i.fill(),i.strokeStyle="rgba(138,111,69,0.55)",i.lineWidth=4,Os(i,6,6,s-12,o-12,20),i.stroke();const r=s/2,a=o*.56,l=o*.32,c=Math.PI*.75,u=Math.PI*1.5;i.lineCap="round",i.lineWidth=26,i.strokeStyle="rgba(110,90,55,0.22)",i.beginPath(),i.arc(r,a,l,c,c+u),i.stroke(),i.strokeStyle=t,i.beginPath(),i.arc(r,a,l,c,c+u*n),i.stroke(),i.fillStyle="#3a2e1f",i.font="800 90px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",i.textAlign="center",i.fillText(Math.round(n*100)+"%",r,a+22),i.fillStyle="rgba(90,74,52,0.75)",i.font="600 30px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",i.fillText(e,r,a+l+44)},512,512)}function xc(n=1){const t=new yt,e=new q({color:4864550,roughness:.5,metalness:.4}),i=new q({color:Jt.terracotta,roughness:.6}),s=17*n,o=new C(new rt(.5,s,.5),e);o.position.y=s/2,o.castShadow=!0,t.add(o);const r=new C(new rt(.35,.35,15*n),e);r.position.set(0,s+.6,5*n),t.add(r);const a=new C(new rt(1,1,1),i);a.position.set(0,s,-1.6*n),t.add(a);for(const h of[-.2,.2]){const p=new C(new St(.03,.03,8*n,6),e);p.position.set(h,s+.4,6.6*n),p.rotation.x=-.35,t.add(p)}const l=new $o({color:6048304}),c=[new b(0,s+.5,8*n),new b(0,s-3*n,8*n)],u=new Ee().setFromPoints(c);t.add(new qa(u,l));const d=new C(new rt(.3,.3,.3),e);return d.position.set(0,s-3.4*n,8*n),t.add(d),t}function w_(n,t=60){const e=new Float32Array(t*3),i=new Float32Array(t*3),s=[12618344,13805688,16050896,9416330,10521188];for(let l=0;l<t;l++){e[l*3]=(Math.random()-.5)*14,e[l*3+1]=Math.random()*9,e[l*3+2]=(Math.random()-.5)*14;const c=new Et(s[l%s.length]);i[l*3]=c.r,i[l*3+1]=c.g,i[l*3+2]=c.b}const o=new Ee;o.setAttribute("position",new Ne(e,3)),o.setAttribute("color",new Ne(i,3));const r=new Zo({size:.16,vertexColors:!0,transparent:!0,opacity:.85}),a=new Ya(o,r);return n.add(a),a}function rn(n,t={}){const e=zn((f,M,g)=>{const m=f.createLinearGradient(0,0,0,g);m.addColorStop(0,"#f8f1de"),m.addColorStop(.34,"#f4e9cf"),m.addColorStop(.6,"#efe1bf"),m.addColorStop(.82,"#e9d7ab"),m.addColorStop(1,"#e1cc95"),f.fillStyle=m,f.fillRect(0,0,M,g);const x=f.createLinearGradient(0,g*.58,0,g);x.addColorStop(0,"rgba(255,238,205,0)"),x.addColorStop(1,"rgba(255,241,212,0.9)"),f.fillStyle=x,f.fillRect(0,g*.58,M,g*.42),f.fillStyle="rgba(255,252,244,0.5)";for(let w=0;w<12;w++){const S=Math.random()*M,z=Math.random()*g*.55,P=26+Math.random()*48;for(let I=0;I<4;I++)f.beginPath(),f.ellipse(S+(Math.random()-.5)*P*.6,z+(Math.random()-.5)*10,P*(.3+Math.random()*.25),4+Math.random()*5,0,0,ss),f.fill()}},256,1024),i=new Ge({map:e,side:$e,fog:!1,depthWrite:!1}),s=new C(new ae(820,24,14),i);n.add(s);const o=new Gn(new Tn({map:Mn(0,"rgba(240,180,110,0.95)"),transparent:!0,blending:nn,depthWrite:!1,depthTest:!1}));o.position.set(t.sunX??-180,t.sunY??90,-520),o.scale.setScalar(t.sunS??130),n.add(o);const r=new Gn(new Tn({map:Mn(.25,"rgba(235,165,95,0.35)"),transparent:!0,blending:nn,depthWrite:!1,depthTest:!1}));r.position.set(t.sunX??-180,t.sunY??90,-520),r.scale.setScalar(460),n.add(r),n.userData.sun={sprite:o,halo:r};const a=new C(new ci(1400,40),new q({map:au(),roughness:1,metalness:0}));a.rotation.x=-Math.PI/2,a.position.y=-.03,a.receiveShadow=!0,n.add(a),n.add(new ru(11772544,t.ambient??.75)),n.add(new iu(15918796,12101246,t.hemi??.5));const l=new ou(16772552,t.sunI??2.6);l.position.set(-120,140,-220),l.castShadow=!0,l.shadow.mapSize.set(1024,1024),l.shadow.camera.left=-60,l.shadow.camera.right=60,l.shadow.camera.top=60,l.shadow.camera.bottom=-60,l.shadow.camera.near=10,l.shadow.camera.far=600,n.add(l),n.add(l.target),n.fog=new ii(t.fogColor??Jt.skyHorizon,t.fogNear??40,t.fogFar??480);const c=Fs()?70:140,u=new Float32Array(c*3);for(let f=0;f<c;f++)u[f*3]=(Math.random()-.5)*90,u[f*3+1]=.4+Math.random()*9,u[f*3+2]=-20+Math.random()*160;const d=new Ee;d.setAttribute("position",new Ne(u,3));const h=new Zo({color:16050896,transparent:!0,opacity:.3,blending:nn,depthWrite:!1,size:.09,sizeAttenuation:!0}),p=new Ya(d,h);n.add(p),n.userData.dust=p}function Mi(n,t=12,e=30,i=170,s=70){for(let o=0;o<t;o++){const r=e+Math.random()*(i-e),a=9+Math.random()*22,l=5+Math.random()*4,c=5+Math.random()*4,u=Math.random()>.5?1:-1;n.add(Pa(l,a,c,r,u*(s*.55+Math.random()*s*.45)))}}function yi(n,t){n.userData.palms=n.userData.palms||[];for(const[e,i,s]of t){const o=cu(new b(e,0,i),s??1);n.userData.palms.push(o),n.add(o)}}const Go={presentation(n,t,e){rn(n);const i=new Je([new b(0,0,-30),new b(0,0,140)]),s=Nn(i,4.4,Jt.path,Qi(),400);s.position.y=.01,n.add(s);const o=Or(t,e);o.position.set(-5.2,0,46),o.rotation.y=.42,n.add(o);const r=vi(wn(1));r.position.set(6.4,0,70),r.rotation.y=-.55,n.add(r),Mi(n,16),yi(n,[[-9,18,1.2],[9,22,1],[-10,62,1.3],[10,92,1.1],[-11,120,1.25]]);for(let l=0;l<=4;l++){const c=8+l*26,u=l%2===0?1:-1,d=Ls(new b(u*6,0,c),u);n.add(d);const h=Is(new b(u*6,0,c),u);n.add(h.group)}for(const l of[30,78]){const c=Oo();c.group.position.set(0,0,l),c.group.rotation.y=Math.PI,c.group.userData.x0=0,(n.userData.cars=n.userData.cars||[]).push(c.group),n.add(c.group)}const a=new Se(46,1280/760,.1,2e3);return a.position.set(6.5,3.1,14),a.lookAt(-1.5,3.4,52),a},"lecon1-importance"(n,t,e){rn(n,{sunX:60,sunY:120,sunI:2.4});const i=new Je([new b(0,0,-20),new b(0,0,150)]),s=Nn(i,4.4,Jt.path,Qi(),400);s.position.y=.01,n.add(s),[{x:-5.6,z:40,ry:.5},{x:5.8,z:62,ry:-.6},{x:-5.9,z:86,ry:.55},{x:5.9,z:108,ry:-.55},{x:-5.8,z:130,ry:.5}].forEach((a,l)=>{const c=l===0?Or(t,e):vi(wn(l+2));c.position.set(a.x,0,a.z),c.rotation.y=a.ry,n.add(c)}),Mi(n,14,30,190,80),yi(n,[[-9,16,1],[9,50,1.1],[-10,96,1.05],[10,132,1.15]]);for(let a=0;a<=5;a++){const l=12+a*24,c=a%2===0?1:-1,u=Ls(new b(c*6,0,l),c);n.add(u);const d=Is(new b(c*6,0,l),c);n.add(d.group)}for(const a of[28,74,118]){const l=Oo();l.group.position.set(0,0,a),l.group.rotation.y=Math.PI,l.group.userData.x0=0,(n.userData.cars=n.userData.cars||[]).push(l.group),n.add(l.group)}const r=new Se(48,1280/760,.1,2e3);return r.position.set(8,5.4,6),r.lookAt(0,3.2,80),r},"lecon2-constat"(n,t,e){rn(n,{sunI:1.3,ambient:.5,fogColor:15524036,fogNear:24,fogFar:220}),[[0,20,.1,1.15],[-7,34,-.35,1],[6,42,.55,.9],[-3,52,-.2,1.25],[8,60,-.7,.85],[-8,66,.3,1.1],[3,74,.65,.95],[-5,84,-.5,1.05],[7,90,.15,.8],[-9,96,-.8,1.2]].forEach(([r,a,l,c],u)=>{const d=u===0?Or(t,e):vi(wn(u+1));d.position.set(r,0,a),d.scale.setScalar(c),d.rotation.y=l,d.rotation.z=u%3*.06-.06,u%4===3&&(d.rotation.x=-.08),n.add(d)});const s=vi(wn(5));s.position.set(2,0,102),s.rotation.set(1.35,.4,.3),n.add(s),Mi(n,10,20,150,60),yi(n,[[-9,30,.9],[9,55,.85],[-10,88,.95]]);const o=new Se(52,1280/760,.1,2e3);return o.position.set(11,5.2,-8),o.lookAt(-1,2.6,55),o},audit(n){rn(n,{sunI:1.1,ambient:.65,fogNear:30,fogFar:200}),n.fog=new ii(15524036,30,200);const t=new C(new qt(90,40),new q({color:15985364}));t.position.set(0,14,-16),t.rotation.y=Math.PI,n.add(t);const e=zn((h,p,f)=>{const M=h.createLinearGradient(0,0,0,f);M.addColorStop(0,"#d9e4e6"),M.addColorStop(1,"#f2e4c6"),h.fillStyle=M,h.fillRect(0,0,p,f),h.fillStyle="#c3ab7c",h.fillRect(0,f*.72,p,f*.28),h.fillStyle="rgba(180,140,90,0.6)";for(let g=0;g<14;g++){const m=16+Math.random()*40,x=20+Math.random()*60;h.fillRect(10+Math.random()*(p-50),f*.76,m,x)}},512,320),i=new C(new qt(13,7),new q({map:e,emissiveMap:e,emissive:new Et(16773336),emissiveIntensity:.12}));i.position.set(0,7.5,-15.6),n.add(i);const s=new q({color:8019768}),o=new C(new rt(.4,7,.3),s);o.position.set(0,7.5,-15.2),n.add(o);const r=new C(new rt(13,.4,.3),s);r.position.set(0,7.5,-15.2),n.add(r);const a=Br();n.add(a);for(const[h,p,f]of[[.7,.3,.35],[-.6,.4,-.4],[.2,-.5,.1]]){const M=g_(.9,1.2,f);M.position.set(h,1.1,p),n.add(M)}const l=__();l.position.set(-.9,1.09,.25),l.rotation.y=.3,n.add(l);const c=v_(.25);c.position.set(.55,1.12,.5),c.rotation.y=.4,c.userData.y0=1.12,c.userData.rz0=0,(n.userData.floaters=n.userData.floaters||[]).push(c),n.add(c);const u=kr();u.g.position.set(-1.6,0,-.5),n.add(u.g),n.add(u.light);const d=new Se(44,1280/760,.1,2e3);return d.position.set(4.2,3.4,7.5),d.lookAt(0,1.6,-1),d},"etat-lieux"(n){rn(n,{sunI:2.2,fogNear:60,fogFar:700});const t=new C(new qt(24,24),new q({map:Mc(),roughness:.9}));t.rotation.x=-Math.PI/2,t.position.y=.01,n.add(t);const e=[new b(-7,.5,6),new b(-3.5,.6,1),new b(1,.7,-4),new b(5.5,.8,-7),new b(9,.9,-10)],i=new C(new ds(new Je(e),64,.12,8,!1),new Ge({color:12618344,transparent:!0,opacity:.8}));i.position.y=-.01,n.add(i),[[-7,6,13204066],[-3.5,1,8232642],[1,-4,13805688],[5.5,-7,9416330],[9,-10,13204066]].forEach(([l,c,u])=>{const d=yc(u);d.position.set(l,0,c),n.add(d)});const o=zn((l,c,u)=>{l.fillStyle="rgba(255,255,255,0.75)",l.beginPath(),l.arc(c/2,u/2,c/2-8,0,ss),l.fill(),l.strokeStyle="rgba(90,74,52,0.8)",l.lineWidth=5,l.stroke(),l.fillStyle="#c08a68",l.beginPath(),l.moveTo(c/2,u*.16),l.lineTo(c*.58,u*.6),l.lineTo(c*.42,u*.6),l.closePath(),l.fill(),l.fillStyle="#5a4a34",l.font="800 34px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",l.textAlign="center",l.fillText("N",c/2,u*.2)},160,160),r=new C(new qt(2.2,2.2),new Ge({map:o,transparent:!0}));r.position.set(-9.5,.05,9.5),r.rotation.x=-Math.PI/2,n.userData.compass=r,n.add(r);const a=new Se(40,1280/760,.1,2e3);return a.position.set(13,20,11),a.lookAt(0,0,0),a},zonage(n){rn(n,{sunI:2,fogNear:60,fogFar:700});const t=new C(new qt(24,24),new q({map:Mc(!0),roughness:.9}));t.rotation.x=-Math.PI/2,t.position.y=.01,n.add(t),[[0,0,8232642],[6,0,12618344],[0,-6,9416330],[6,-6,13805688]].forEach(([r,a,l])=>{const c=yc(l);c.position.set(r,0,a),n.add(c)});const i=zn((r,a,l)=>{r.fillStyle="rgba(240,236,220,0.95)",Os(r,0,0,a,l,16),r.fill();const c=[["#7d9ec2","Zone A"],["#c08a68","Zone B"],["#8fae8a","Zone C"],["#d2a878","Zone D"]];r.font="700 30px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",r.textAlign="left",c.forEach(([u,d],h)=>{r.fillStyle=u,r.beginPath(),r.arc(46,60+h*70,16,0,ss),r.fill(),r.fillStyle="#3a2a18",r.fillText(d,78,72+h*70)})},360,320),s=new C(new qt(3.4,3),new Ge({map:i,transparent:!0}));s.position.set(-8.8,.05,-8),s.rotation.x=-Math.PI/2,n.add(s);const o=new Se(40,1280/760,.1,2e3);return o.position.set(-10,21,14),o.lookAt(0,0,-1),o},"constitution-lots"(n,t,e){rn(n,{sunX:40,sunY:130,sunI:2.4});const i=new Je([new b(0,0,-20),new b(0,0,150)]),s=Nn(i,4.4,Jt.path,Qi(),400);s.position.y=.01,n.add(s);const o=p_(wn(0));o.position.set(-6.4,0,42),o.rotation.y=.35,n.add(o);const r=vi(wn(3));r.position.set(6.6,0,64),r.rotation.y=-.5,n.add(r);const a=m_(wn(2));a.position.set(-6.2,0,88),a.rotation.y=.4,n.add(a);const l=f_(wn(1));l.position.set(6.4,0,108),l.rotation.y=-.45,n.add(l),Mi(n,12,30,180,80),yi(n,[[-9,22,1.1],[9,34,1],[-10,78,1.15],[10,122,1.05]]);for(let u=0;u<=4;u++){const d=20+u*24,h=u%2===0?1:-1,p=Ls(new b(h*6,0,d),h);n.add(p);const f=Is(new b(h*6,0,d),h);n.add(f.group)}for(const u of[58,100]){const d=Lo(new b(4.6,0,u),1);n.add(d)}const c=new Se(46,1280/760,.1,2e3);return c.position.set(8.5,4.6,4),c.lookAt(-1,3,62),c},"mise-concession"(n){rn(n,{sunI:1.2,ambient:.7,fogNear:30,fogFar:200}),n.fog=new ii(15524036,30,200);const t=new C(new qt(90,40),new q({color:15985364}));t.position.set(0,14,-16),t.rotation.y=Math.PI,n.add(t);const e=Br();n.add(e);const i=new C(new qt(2.3,1.6),new q({color:16050896,roughness:.85}));i.position.set(.1,1.08,.15),i.rotation.x=-.18,n.add(i);const s=M_();s.position.set(1.05,1.1,.5),s.rotation.y=-.5,s.rotation.z=-.12,s.userData.y0=1.1,s.userData.rz0=-.12,(n.userData.floaters=n.userData.floaters||[]).push(s),n.add(s);const o=Sc();o.position.set(-1.15,1.05,-.1),o.rotation.y=.3,o.userData.y0=1.05,o.userData.rz0=0,(n.userData.floaters=n.userData.floaters||[]).push(o),n.add(o);const r=new C(new Hn(.22,.04,10,24),new q({color:Jt.bronze,metalness:.8,roughness:.3}));r.position.set(-.7,1.12,.6),r.rotation.x=Math.PI/2.2,r.rotation.z=.3,n.add(r);const a=kr();a.g.position.set(-1.7,0,-.6),n.add(a.g),n.add(a.light);const l=new Se(42,1280/760,.1,2e3);return l.position.set(3.9,3.6,6.8),l.lookAt(-.1,1.7,-.4),l},attribution(n){rn(n,{sunI:1.2,ambient:.7,fogNear:30,fogFar:200}),n.fog=new ii(15524036,30,200);const t=new C(new qt(90,40),new q({color:15985364}));t.position.set(0,14,-16),t.rotation.y=Math.PI,n.add(t);const e=Br();n.add(e);const i=y_();i.position.set(.9,1.12,.2),i.rotation.y=.7,i.userData.y0=1.12,i.userData.rz0=0,(n.userData.floaters=n.userData.floaters||[]).push(i),n.add(i);for(const[l,c,u]of[[-1.2,.4,.5],[-.5,-.4,-.6],[.4,.6,.1]]){const d=S_(u);d.position.set(l,1.06,c),n.add(d)}const s=Sc(3829823,"ADMIS");s.position.set(-1.4,1.05,-.5),s.rotation.y=-.4,n.add(s);const o=new C(new Hn(.24,.06,12,28),new q({color:13805688,metalness:.9,roughness:.25}));o.position.set(.1,1.15,-.6),o.rotation.x=Math.PI/2.4,o.userData.y0=1.15,o.userData.rz0=0,(n.userData.floaters=n.userData.floaters||[]).push(o),n.add(o);const r=kr();r.g.position.set(-1.7,0,-.6),n.add(r.g),n.add(r.light);const a=new Se(42,1280/760,.1,2e3);return a.position.set(4.1,3.5,7.2),a.lookAt(0,1.6,-.2),a},gestion(n){rn(n,{sunX:20,sunY:150,sunI:2.5});const t=new Je([new b(0,0,-20),new b(0,0,150)]),e=Nn(t,4.4,Jt.path,Qi(),400);e.position.y=.01,n.add(e);const i=new yt,s=new q({color:15195071,roughness:.85}),o=new C(new rt(14,10,8),s);o.position.y=5,o.castShadow=!0,i.add(o);const r=new C(new St(8,8.6,1.6,4),s);r.position.y=11,r.rotation.y=Math.PI/4,i.add(r);const a=new q({color:13614751,roughness:.6});for(const p of[-5,-3.3,-1.6,0,1.6,3.3,5]){const f=new C(new St(.28,.34,4.6,10),a);f.position.set(p,2.3,4.05),i.add(f)}const l=zn((p,f,M)=>{p.fillStyle="#d8c9a6",p.fillRect(0,0,f,M);for(let g=0;g<3;g++)for(let m=0;m<6;m++)Math.random()<.75&&(p.fillStyle=Math.random()<.4?"#b98a5a":"#c9a25f",p.globalAlpha=.6,p.fillRect(10+m*(f/6),10+g*(M/3.4),f/8,M/4.4),p.globalAlpha=1)},512,256),c=new C(new qt(10,4.4),new q({map:l,emissiveMap:l,emissive:new Et(16114365),emissiveIntensity:.15}));c.position.set(0,6.2,4.06),i.add(c),i.position.set(0,0,58),i.rotation.y=Math.PI,n.add(i);const u=new C(new St(.08,.12,8,8),new q({color:6048304}));u.position.set(-8,4,56),n.add(u);const d=new C(new qt(2.6,1.5),new q({color:Jt.terracotta,side:ke,roughness:.8}));d.position.set(-6.6,7.4,56),d.rotation.y=.2,n.userData.flag=d,n.add(d);for(let p=0;p<3;p++){const f=vi(wn(p+1));f.position.set(-6.4,0,30+p*22),f.rotation.y=.45,n.add(f)}Mi(n,10,80,200,90),yi(n,[[-9,20,1],[9,44,1.1],[9.5,92,1]]);for(let p=0;p<=4;p++){const f=14+p*26,M=p%2===0?1:-1,g=Ls(new b(M*6,0,f),M);n.add(g);const m=Is(new b(M*6,0,f),M);n.add(m.group)}const h=new Se(44,1280/760,.1,2e3);return h.position.set(10,3.6,18),h.lookAt(0,4.5,58),h},evaluation(n){rn(n,{sunI:1,ambient:.55,fogNear:30,fogFar:300}),n.fog=new ii(15524036,30,300),[{pct:.9,color:"#d2a878",label:"AUDIT",x:-4},{pct:.78,color:"#c08a68",label:"CONCESSION",x:0},{pct:.86,color:"#7da878",label:"GESTION",x:4}].forEach(({pct:r,color:a,label:l,x:c})=>{const u=new C(new St(1.5,1.8,.3,20),new q({color:6048304,roughness:.7}));u.position.set(c,.15,0),n.add(u);const d=new C(new St(.14,.16,3.4,10),new q({color:Jt.walnut,roughness:.6}));d.position.set(c,1.85,0),n.add(d);const h=x_(r,a,l),p=new C(new qt(3.6,3.6),new q({map:h,emissiveMap:h,emissive:new Et(16777215),emissiveIntensity:.08}));p.position.set(c,3.9,0),p.rotation.x=.25,n.add(p);const f=new Ka(15246172,.2,8,2);f.position.set(c,3.2,2),n.add(f)});const e=[new b(-6,.8,2.5),new b(-3,1.6,1.4),new b(0,2.6,0),new b(3,3.8,-1.2),new b(6,5.2,-2.4)],i=new C(new ds(new Je(e),64,.1,8,!1),new Ge({color:5742687,transparent:!0,opacity:.9}));n.add(i);const s=new C(new an(.3,.8,12),new q({color:5742687,emissive:5742687,emissiveIntensity:.6}));s.position.set(6.4,5.6,-2.7),s.rotation.z=-.6,n.add(s);const o=new Se(46,1280/760,.1,2e3);return o.position.set(7,3.4,11),o.lookAt(0,3.2,-1),o},"mise-a-jour"(n){rn(n,{sunX:-80,sunY:110,sunI:2.2});const t=new Je([new b(0,0,-20),new b(0,0,150)]),e=Nn(t,4.4,Jt.path,Qi(),400);e.position.y=.01,n.add(e);const i=xc(1);i.position.set(-8,0,52),n.userData.cranes=[i],n.add(i);const s=xc(.7);s.position.set(8,0,84),n.userData.cranes.push(s),n.add(s);const o=new C(new rt(7,9,7),new q({color:2760726,roughness:.9}));o.position.set(0,4.5,62),o.castShadow=!0,n.add(o);const r=new q({color:7034424,roughness:.8});for(let h=0;h<4;h++){const p=new C(new rt(8,.14,.14),r);p.position.set(0,1.5+h*2.3,3.6),n.add(p)}const a=vi(wn(4));a.position.set(0,14,66),a.rotation.x=.15,a.userData.y0=14,n.userData.hoisted=a,n.add(a);const l=new $o({color:6048304}),c=[new b(-8,18,52),new b(0,15,65)],u=new Ee().setFromPoints(c);n.add(new qa(u,l)),Mi(n,10,90,220,85),yi(n,[[-9,30,.9],[9,110,1]]);const d=new Se(48,1280/760,.1,2e3);return d.position.set(11,5.5,6),d.lookAt(0,8,62),d},quiz(n){rn(n,{sunX:0,sunY:130,sunI:2});const t=zn((u,d,h)=>{u.clearRect(0,0,d,h),u.fillStyle="rgba(253,250,242,0.92)",Os(u,0,0,d,h,40),u.fill(),u.strokeStyle="rgba(138,111,69,0.5)",u.lineWidth=8,Os(u,8,8,d-16,h-16,36),u.stroke(),u.shadowColor="rgba(122,95,56,0.55)",u.shadowBlur=40,u.fillStyle="#7a5f38",u.font="800 620px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",u.textAlign="center",u.textBaseline="middle",u.fillText("?",d/2,h*.52),u.shadowBlur=0},640,640),e=new C(new qt(7,7),new Ge({map:t,transparent:!0}));e.position.set(0,8.5,30),n.add(e);const i=new Gn(new Tn({map:Mn(.3,"rgba(232,163,92,0.28)"),transparent:!0,blending:nn,depthWrite:!1}));i.position.set(0,8.5,28.5),i.scale.setScalar(18),n.add(i);const s=new yt,o=new q({color:13805688,metalness:.85,roughness:.28}),r=new C(new St(.9,1,.3,16),o);s.add(r);const a=new C(new St(.28,.3,1.2,12),o);a.position.y=.75,s.add(a);const l=new C(new St(.9,.45,1.1,18),o);l.position.y=1.7,s.add(l);for(const u of[-1,1]){const d=new C(new Hn(.4,.07,10,20,Math.PI),o);d.position.set(u*.78,1.5,0),d.rotation.z=u*Math.PI/2,s.add(d)}s.position.set(-3.6,0,40),n.userData.trophy=s,n.add(s),Mi(n,12,60,200,90),yi(n,[[-9,60,1],[9,90,1.1]]),n.userData.confetti=w_(n,70);const c=new Se(46,1280/760,.1,2e3);return c.position.set(6,3.6,8),c.lookAt(0,6.5,34),c}};function b_(n,t,e,i=1280,s=760){if(ko)return null;let o;try{o=new Wa({canvas:e,antialias:!Fs(),alpha:!1}),o.toneMapping=Vo,o.toneMappingExposure=1.2,o.shadowMap.enabled=!Fs(),o.shadowMap.enabled&&(o.shadowMap.type=Ho),o.setPixelRatio(Math.min(window.devicePixelRatio||1,Fs()?1:1.25)),o.setSize(i,s,!1)}catch{return ko=!0,null}let r=null,a=null;try{r=new Xa,a=(Go[n.id]||Go.presentation)(r,n,t),a.aspect=i/s,a.updateProjectionMatrix()}catch(L){return console.warn("Illustration 3D en direct indisponible pour",n.id,L),o.dispose(),null}const l=a.position.clone(),c=new b;a.getWorldDirection(c);const u=l.clone().addScaledVector(c,40),d=Math.min(3,Math.max(.6,l.length()/14)),h=r.userData.dust||null,p=r.userData.sun||null,f=r.userData.palms||[],M=r.userData.cars||[],g=r.userData.cranes||[],m=r.userData.hoisted||null,x=r.userData.trophy||null,w=r.userData.flag||null,S=r.userData.compass||null,z=r.userData.confetti||null,P=r.userData.floaters||[];function I(L,y,_){h&&(h.rotation.y+=y*.02,h.position.y=Math.sin(L*.4)*.3,h.material.opacity=.26+Math.sin(L*.8)*.08),p&&(p.sprite.material.opacity=.82+Math.sin(L*.5)*.1,p.halo.material.opacity=.28+Math.sin(L*.4+1)*.06);for(let A=0;A<f.length;A++)f[A].rotation.z=Math.sin(L*.8+A*1.7)*.05;for(let A=0;A<M.length;A++){const U=M[A];U.position.z-=y*.9,U.position.x=(U.userData.x0||0)+Math.sin(L*.5+A*2.1)*.4,U.position.z<-14&&(U.position.z=132,U.position.x=(Math.random()-.5)*6,U.userData.x0=U.position.x)}if(z){const A=z.geometry.attributes.position,U=A.array;for(let O=0;O<A.count;O++)U[O*3+1]-=y*.7,U[O*3+1]<.2&&(U[O*3+1]=6+Math.random()*3,U[O*3]=(Math.random()-.5)*14,U[O*3+2]=(Math.random()-.5)*14);A.needsUpdate=!0}x&&(x.rotation.y=Math.sin(L*.6)*.12);for(let A=0;A<g.length;A++){const U=g[A];U.rotation.y=(U.userData.baseY||0)+Math.sin(L*.15+A*2.4)*.12}m&&(m.rotation.z=Math.sin(L*1.1)*.03,m.position.y=(m.userData.y0||14)+Math.sin(L*.7)*.25),w&&(w.rotation.z=Math.sin(L*1.8)*.16+Math.sin(L*3.1)*.05),S&&(S.rotation.z=L*.15);for(let A=0;A<P.length;A++){const U=P[A];U.position.y=(U.userData.y0||U.position.y)+Math.sin(L*1.2+A*1.3)*.03,U.rotation.z=(U.userData.rz0||0)+Math.sin(L*.9+A)*.02}a.position.set(l.x+Math.sin(_*Math.PI)*.5*d+Math.sin(L*.3)*.06*d,l.y+Math.cos(_*Math.PI)*.25*d+Math.sin(L*.24)*.05*d,l.z+(_-.5)*1.2*d+Math.cos(L*.21)*.07*d),a.lookAt(u),o.render(r,a)}return{canvas:o.domElement,render:I,dispose(){o.dispose(),r.traverse(L=>{if(L.geometry&&L.geometry.dispose(),L.material){const y=Array.isArray(L.material)?L.material:[L.material];for(const _ of y)_.map&&_.map.dispose(),_.dispose()}})}}}const Gr=new Map;function E_(n,t,e=1280,i=760){if(Gr.has(n.id))return Gr.get(n.id);const s=h_();if(!s)return null;try{s.setPixelRatio(Fs()?1:1.5),s.setSize(e,i);const o=new Xa,a=(Go[n.id]||Go.presentation)(o,n,t);a.aspect=e/i,a.updateProjectionMatrix(),s.render(o,a);const l=s.domElement.toDataURL("image/jpeg",.85);return T_(o),Gr.set(n.id,l),l}catch(o){return console.warn("Illustration 3D indisponible pour",n.id,o),null}}function T_(n){const t=new Set,e=new Set;n.traverse(i=>{i.geometry&&i.geometry.dispose();const s=Array.isArray(i.material)?i.material:i.material?[i.material]:[];for(const o of s)if(!e.has(o)){e.add(o);for(const r of[o.map,o.emissiveMap])r&&!t.has(r)&&(t.add(r),r.dispose());o.dispose()}})}function A_({onExit:n,onScrollTo:t,onQuiz:e}){const i=document.getElementById("ui-course"),s=i.querySelector("#course-toc"),o=i.querySelector("#course-toc-select"),r=i.querySelector("#course-sections"),a=i.querySelector("#course-cover"),l=i.querySelector("#course-close"),c=i.querySelector("#course-quiz-btn"),u=i.querySelector(".course-main"),d=t||(y=>u.scrollTo({top:y,behavior:"smooth"}));let h=!1;a.innerHTML=`
    <div class="course-cover-kicker">${Nr.module} — Formation :</div>
    <h1 class="course-cover-title">${Nr.title}</h1>
    <div class="course-cover-sub">${Nr.subtitle}</div>
    <div class="course-cover-rule"></div>
    <p class="course-cover-desc">Lecture complète et illustrée du cours. Avancez section par section, chaque étape est accompagnée d'une illustration de son contexte.</p>
    <div class="course-cover-meta"><span>${He.length} étapes</span><span>12 questions finales</span></div>
  `;const p=[],f=[];Io.forEach((y,_)=>{const A=He.filter(U=>U.chapter===_);A.length&&(p.push(`<div class="toc-chapter"><div class="toc-chapter-name">${y.name}</div><div class="toc-chapter-label">${y.label}</div></div>`),A.forEach(U=>{p.push(`<a href="#course-sec-${U.id}" class="toc-item" data-id="${U.id}"><span class="toc-num">${U.num}</span><span>${U.title}</span></a>`)}))}),He.forEach(y=>{const _=Io[y.chapter],A=y.id==="quiz";let U="";A?U=`<ul class="course-bullets">${y.bullets.map(O=>`<li>${O}</li>`).join("")}</ul>`:U=y.content.map(O=>`<p><span class="course-body-t">${O.t}</span>${O.b}</p>`).join(""),f.push(`
      <section class="course-section" id="course-sec-${y.id}">
        <canvas class="course-illus" role="img" aria-label="Illustration — ${y.title}"></canvas>
        <div class="course-sec-meta">
          <span class="course-sec-chapter">${_?`${_.name} · ${_.label}`:""}</span>
          <span class="course-sec-num">${y.num} / ${String(He.length).padStart(2,"0")}</span>
        </div>
        <h2 class="course-sec-title">${y.title}</h2>
        <div class="course-sec-rule"></div>
        <div class="course-sec-content">${U}</div>
      </section>
    `)}),s.innerHTML=p.join(""),r.innerHTML=f.join("");const M=[];Io.forEach((y,_)=>{const A=He.filter(U=>U.chapter===_);A.length&&(M.push(`<optgroup label="${y.name}">`),A.forEach(U=>M.push(`<option value="${U.id}">${U.num} · ${U.title}</option>`)),M.push("</optgroup>"))}),o.innerHTML=M.join("");const g=[];r.querySelectorAll(".course-illus").forEach(y=>{const _=y.closest(".course-section").id.replace("course-sec-",""),A=document.createElement("canvas");d_(A,_,1280,760),y.style.backgroundImage=`url(${A.toDataURL("image/jpeg",.86)})`,y.style.backgroundSize="cover",y.style.backgroundPosition="center",g.push({canvas:y,id:_,live:null,raf:0,p:0,running:!1})});const m=window.matchMedia("(prefers-reduced-motion: reduce)").matches;function x(y){const _=y.getBoundingClientRect(),A=u.getBoundingClientRect(),U=_.height+A.height||1;return Math.min(1,Math.max(0,(A.bottom-_.top)/U))}function w(y){if(!y.live||y.running)return;y.running=!0,y.p=x(y.canvas);let _=performance.now();const A=U=>{if(!y.running)return;const O=Math.min(.05,Math.max(.001,(U-_)/1e3));_=U,y.p=x(y.canvas),y.live.render(U*.001,O,y.p),y.raf=requestAnimationFrame(A)};y.raf=requestAnimationFrame(A)}function S(y){y.running&&(y.running=!1,cancelAnimationFrame(y.raf))}const z=new IntersectionObserver(y=>{for(const _ of y){const A=g.find(U=>U.canvas===_.target);if(A)if(_.isIntersecting){if(!A.live){const U=He.find(O=>O.id===A.id);if(U&&(m||(A.live=b_(U,He.indexOf(U),A.canvas,1280,760)),!A.live)){const O=E_(U,He.indexOf(U));O&&(A.canvas.style.backgroundImage=`url(${O})`)}}w(A)}else S(A)}},{root:u,rootMargin:"420px 0px 420px 0px",threshold:0});g.forEach(y=>z.observe(y.canvas)),s.addEventListener("click",y=>{const _=y.target.closest(".toc-item");if(!_)return;const A=document.getElementById("course-sec-"+_.dataset.id);A&&(d(A.offsetTop-90),s.querySelectorAll(".toc-item").forEach(U=>U.classList.toggle("active",U===_)))});function P(){let y=He[0].id;for(const _ of He){const A=document.getElementById("course-sec-"+_.id);A&&A.offsetTop-120<=u.scrollTop&&(y=_.id)}s.querySelectorAll(".toc-item").forEach(_=>_.classList.toggle("active",_.dataset.id===y)),o.value!==y&&(o.value=y)}u.addEventListener("scroll",P,{passive:!0}),o.addEventListener("change",()=>{const y=document.getElementById("course-sec-"+o.value);y&&d(y.offsetTop-90)}),l.addEventListener("click",n),c.addEventListener("click",e);function I(){h=!0,document.body.classList.add("mode-course"),setTimeout(()=>P(),80)}function L(){h=!1,document.body.classList.remove("mode-course"),g.forEach(y=>S(y))}return{open:I,close:L,isOpen:()=>h}}async function C_(){await Promise.allSettled([document.fonts.load("400 26px 'Century Gothic'"),document.fonts.load("700 26px 'Century Gothic'"),document.fonts.load("italic 400 26px 'Century Gothic'"),document.fonts.load("italic 700 26px 'Century Gothic'")]);const n=document.getElementById("scene"),t=He.length,e=qg(n,He),i=Yg();let s=null;function o(_,A="smooth"){s?s.scrollTo(_,{duration:A==="smooth"?1.2:0,easing:U=>1-Math.pow(1-U,3)}):document.querySelector("#ui-course .course-main").scrollTo({top:_,behavior:A})}function r(_){const A=_==="course";a.isOpen()&&a.close(),A&&a.open(),document.getElementById("mode-journey").classList.toggle("active",!A),document.getElementById("mode-course-btn").classList.toggle("active",A),A?(g.stop(),s==null||s.start()):(s==null||s.stop(),g.start())}const a=A_({onExit:()=>r("journey"),onScrollTo:o,onQuiz:()=>{r("journey"),setTimeout(()=>{const _=Math.max(1,f.offsetHeight-window.innerHeight);g.scrollTo(_,{duration:1.6})},120)}});document.getElementById("mode-journey").addEventListener("click",()=>r("journey")),document.getElementById("mode-course-btn").addEventListener("click",()=>r("course"));const l='<svg class="dn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4.5"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.2 5.2l1.6 1.6M17.2 17.2l1.6 1.6M18.8 5.2l-1.6 1.6M6.8 17.2l-1.6 1.6"/></svg>',c='<svg class="dn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>',u=document.getElementById("ui-daynight");function d(_){e.setNight(_),u.classList.toggle("night",_),u.setAttribute("aria-pressed",String(_)),u.innerHTML=(_?c:l)+(_?" Nuit":" Jour");try{localStorage.setItem("panneau-night",_?"1":"0")}catch{}}u.addEventListener("click",()=>d(!u.classList.contains("night")));let h=!1;try{h=localStorage.getItem("panneau-night")==="1"}catch{}d(h);const p=t+2,f=document.getElementById("scroll");function M(){const _=p*window.innerHeight;f.style.height=_+"px"}M();const g=new il({duration:1.12,smoothWheel:!0,touchMultiplier:1.5,wheelMultiplier:1}),m=document.querySelector("#ui-course .course-main");s=new il({wrapper:m,content:m,duration:1.15,smoothWheel:!0,touchMultiplier:1.6,wheelMultiplier:1});function x(_){g.raf(_),s&&s.raf(_),requestAnimationFrame(x)}requestAnimationFrame(x);let w=0,S=0;function z(_){const A=Math.max(1,f.offsetHeight-window.innerHeight),U=Math.min(1,Math.max(0,_/A));w=U;const O=Math.floor(U*p)-1;S=Math.max(0,Math.min(t-1,O))}let P=0;g.on("scroll",({scroll:_})=>{z(_),P=performance.now()}),z(window.scrollY||0),e.update(w,S);function I(){e.update(w,S),i.updateGlobal(w,S),e.render(),requestAnimationFrame(I)}requestAnimationFrame(I),window.addEventListener("resize",()=>{M(),e.resize(),z(window.scrollY||0)}),window.addEventListener("keydown",_=>{if(a.isOpen()){_.key==="Escape"?r("journey"):_.key==="ArrowDown"||_.key==="PageDown"?(_.preventDefault(),o(m.scrollTop+window.innerHeight*.8)):(_.key==="ArrowUp"||_.key==="PageUp")&&(_.preventDefault(),o(m.scrollTop-window.innerHeight*.8));return}if(i.isReaderOpen()){const O=document.querySelector(".reader-panel");_.key==="Escape"?i.closeReader():_.key==="ArrowLeft"?i.readerNav(-1):_.key==="ArrowRight"?i.readerNav(1):_.key==="ArrowDown"||_.key==="PageDown"?(_.preventDefault(),O.scrollBy({top:Math.min(O.clientHeight*.7,O.scrollHeight-O.scrollTop),behavior:"smooth"})):(_.key==="ArrowUp"||_.key==="PageUp")&&(_.preventDefault(),O.scrollBy({top:-O.clientHeight*.7,behavior:"smooth"}));return}if(_.key==="Enter"&&S>=0&&!i.quizOpen()){i.openReader(S);return}if(["1","2","3","4"].includes(_.key)&&i.quizOpen()){_.preventDefault(),i.answerQuiz(Number(_.key)-1);return}const U=window.innerHeight;_.key==="ArrowDown"||_.key==="PageDown"?(_.preventDefault(),g.scrollTo(window.scrollY+U,{duration:1.1})):(_.key==="ArrowUp"||_.key==="PageUp")&&(_.preventDefault(),g.scrollTo(Math.max(0,window.scrollY-U),{duration:1.1}))}),i.setReaderListener(_=>{document.documentElement.classList.toggle("reader-lock",_),_?g.stop():g.start()});function L(_){return{nx:_.clientX/window.innerWidth*2-1,ny:-(_.clientY/window.innerHeight)*2+1}}window.addEventListener("click",_=>{if(a.isOpen()||i.isReaderOpen()||_.target.closest&&_.target.closest("#ui"))return;const{nx:A,ny:U}=L(_),O=e.pick(A,U);O&&(O.kind==="panel"?i.openReader(O.index):O.kind==="sign"&&i.showToast(O.tip))});let y=!1;window.addEventListener("mousemove",_=>{y||(y=!0,requestAnimationFrame(()=>{if(y=!1,a.isOpen()||i.isReaderOpen())return;if(performance.now()-P<200){document.body.classList.remove("hover-pick"),e.setHover(-1);return}const{nx:A,ny:U}=L(_),O=e.pick(A,U);document.body.classList.toggle("hover-pick",!!O),e.setHover(O&&O.kind==="panel"?O.index:-1)}))}),window.__panneautique={openReader:i.openReader,closeReader:i.closeReader,openCourse:()=>r("course"),closeCourse:()=>r("journey"),pickAt:(_,A)=>{const U=e.pick(_/window.innerWidth*2-1,-(A/window.innerHeight)*2+1);return U?{kind:U.kind,index:U.index,tip:U.tip}:null},getState:()=>{const _=e.getCameraPos();return{progress:w,activeIndex:S,cam:{x:_.x,y:_.y,z:_.z}}},settle:(_,A)=>{for(let O=0;O<2400;O++)e.update(_,A);const U=e.getCameraPos();return{cam:{x:U.x,y:U.y,z:U.z},progress:_,activeIndex:A}}},setTimeout(()=>{document.getElementById("ui-topbar").classList.add("visible"),document.getElementById("ui-dots").classList.add("visible"),document.getElementById("ui-hint").classList.add("visible")},1200),document.querySelectorAll(".dot").forEach((_,A)=>{_.addEventListener("click",()=>{const U=(A+1.5)/p,O=Math.max(1,f.offsetHeight-window.innerHeight);g.scrollTo(Math.round(U*O),{duration:1.4})})})}C_();
