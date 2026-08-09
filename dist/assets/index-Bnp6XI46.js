var au=Object.defineProperty;var lu=(n,t,e)=>t in n?au(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var bt=(n,t,e)=>lu(n,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();var Za="1.3.26";function fc(n,t,e){return Math.max(n,Math.min(t,e))}function cu(n,t,e){return(1-e)*n+e*t}function uu(n,t,e,i){return cu(n,t,1-Math.exp(-e*i))}function du(n,t){return(n%t+t)%t}var hu=class{constructor(){bt(this,"isRunning",!1);bt(this,"value",0);bt(this,"from",0);bt(this,"to",0);bt(this,"currentTime",0);bt(this,"lerp");bt(this,"duration");bt(this,"easing");bt(this,"onUpdate")}advance(n){var e;if(!this.isRunning)return;let t=!1;if(this.duration&&this.easing){this.currentTime+=n;const i=fc(0,this.currentTime/this.duration,1);t=i>=1;const s=t?1:this.easing(i);this.value=this.from+(this.to-this.from)*s}else this.lerp?(this.value=uu(this.value,this.to,this.lerp*60,n),Math.round(this.value)===Math.round(this.to)&&(this.value=this.to,t=!0)):(this.value=this.to,t=!0);t&&this.stop(),(e=this.onUpdate)==null||e.call(this,this.value,t)}stop(){this.isRunning=!1}fromTo(n,t,{lerp:e,duration:i,easing:s,onStart:r,onUpdate:o}){this.from=this.value=n,this.to=t,this.lerp=e,this.duration=i,this.easing=s,this.currentTime=0,this.isRunning=!0,r==null||r(),this.onUpdate=o}};function fu(n,t){let e;return function(...i){clearTimeout(e),e=setTimeout(()=>{e=void 0,n.apply(this,i)},t)}}var pu=class{constructor(n,t,{autoResize:e=!0,debounce:i=250}={}){bt(this,"width",0);bt(this,"height",0);bt(this,"scrollHeight",0);bt(this,"scrollWidth",0);bt(this,"debouncedResize");bt(this,"wrapperResizeObserver");bt(this,"contentResizeObserver");bt(this,"resize",()=>{this.onWrapperResize(),this.onContentResize()});bt(this,"onWrapperResize",()=>{this.wrapper instanceof Window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)});bt(this,"onContentResize",()=>{this.wrapper instanceof Window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)});this.wrapper=n,this.content=t,e&&(this.debouncedResize=fu(this.resize,i),this.wrapper instanceof Window?window.addEventListener("resize",this.debouncedResize):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){var n,t;(n=this.wrapperResizeObserver)==null||n.disconnect(),(t=this.contentResizeObserver)==null||t.disconnect(),this.wrapper===window&&this.debouncedResize&&window.removeEventListener("resize",this.debouncedResize)}get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},pc=class{constructor(){bt(this,"events",{})}emit(n,...t){var i;const e=this.events[n]||[];for(let s=0,r=e.length;s<r;s++)(i=e[s])==null||i.call(e,...t)}on(n,t){return this.events[n]?this.events[n].push(t):this.events[n]=[t],()=>{var e;this.events[n]=(e=this.events[n])==null?void 0:e.filter(i=>t!==i)}}off(n,t){var e;this.events[n]=(e=this.events[n])==null?void 0:e.filter(i=>t!==i)}destroy(){this.events={}}};const mu=100/6,kn={passive:!1};function Ka(n,t){return n===1?mu:n===2?t:1}var gu=class{constructor(n,t={wheelMultiplier:1,touchMultiplier:1}){bt(this,"touchStart",{x:0,y:0});bt(this,"lastDelta",{x:0,y:0});bt(this,"window",{width:0,height:0});bt(this,"emitter",new pc);bt(this,"onTouchStart",n=>{const{clientX:t,clientY:e}=n.targetTouches?n.targetTouches[0]:n;this.touchStart.x=t,this.touchStart.y=e,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:n})});bt(this,"onTouchMove",n=>{const{clientX:t,clientY:e}=n.targetTouches?n.targetTouches[0]:n,i=-(t-this.touchStart.x)*this.options.touchMultiplier,s=-(e-this.touchStart.y)*this.options.touchMultiplier;this.touchStart.x=t,this.touchStart.y=e,this.lastDelta={x:i,y:s},this.emitter.emit("scroll",{deltaX:i,deltaY:s,event:n})});bt(this,"onTouchEnd",n=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:n})});bt(this,"onWheel",n=>{let{deltaX:t,deltaY:e,deltaMode:i}=n;const s=Ka(i,this.window.width),r=Ka(i,this.window.height);t*=s,e*=r,t*=this.options.wheelMultiplier,e*=this.options.wheelMultiplier,this.emitter.emit("scroll",{deltaX:t,deltaY:e,event:n})});bt(this,"onWindowResize",()=>{this.window={width:window.innerWidth,height:window.innerHeight}});this.element=n,this.options=t,window.addEventListener("resize",this.onWindowResize),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,kn),this.element.addEventListener("touchstart",this.onTouchStart,kn),this.element.addEventListener("touchmove",this.onTouchMove,kn),this.element.addEventListener("touchend",this.onTouchEnd,kn)}on(n,t){return this.emitter.on(n,t)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize),this.element.removeEventListener("wheel",this.onWheel,kn),this.element.removeEventListener("touchstart",this.onTouchStart,kn),this.element.removeEventListener("touchmove",this.onTouchMove,kn),this.element.removeEventListener("touchend",this.onTouchEnd,kn)}};const Ja=n=>Math.min(1,1.001-2**(-10*n));var ja=class{constructor({wrapper:n=window,content:t=document.documentElement,eventsTarget:e=n,smoothWheel:i=!0,syncTouch:s=!1,syncTouchLerp:r=.075,touchInertiaExponent:o=1.7,duration:a,easing:l,lerp:c=.1,infinite:d=!1,orientation:u="vertical",gestureOrientation:h=u==="horizontal"?"both":"vertical",touchMultiplier:f=1,wheelMultiplier:g=1,autoResize:v=!0,prevent:m,virtualScroll:p,overscroll:S=!0,autoRaf:x=!1,anchors:_=!1,autoToggle:L=!1,allowNestedScroll:T=!1,__experimental__naiveDimensions:R=!1,naiveDimensions:P=R,stopInertiaOnNavigate:M=!1,respectReducedMotion:y=!0}={}){bt(this,"_isScrolling",!1);bt(this,"_isStopped",!1);bt(this,"_isLocked",!1);bt(this,"_preventNextNativeScrollEvent",!1);bt(this,"_resetVelocityTimeout",null);bt(this,"_rafId",null);bt(this,"_isDraggingSelection",!1);bt(this,"reducedMotionMediaQuery",window.matchMedia("(prefers-reduced-motion: reduce)"));bt(this,"isTouching");bt(this,"isIos");bt(this,"time",0);bt(this,"userData",{});bt(this,"lastVelocity",0);bt(this,"velocity",0);bt(this,"direction",0);bt(this,"options");bt(this,"targetScroll");bt(this,"animatedScroll");bt(this,"animate",new hu);bt(this,"emitter",new pc);bt(this,"dimensions");bt(this,"virtualScroll");bt(this,"onScrollEnd",n=>{n instanceof CustomEvent||(this.isScrolling==="smooth"||this.isScrolling===!1)&&n.stopPropagation()});bt(this,"dispatchScrollendEvent",()=>{this.options.wrapper.dispatchEvent(new CustomEvent("scrollend",{bubbles:this.options.wrapper===window,detail:{lenisScrollEnd:!0}}))});bt(this,"onTransitionEnd",n=>{var t;(t=n.propertyName)!=null&&t.includes("overflow")&&n.target===this.rootElement&&this.checkOverflow()});bt(this,"onClick",n=>{const t=n.composedPath().filter(i=>i instanceof HTMLAnchorElement&&i.href).map(i=>new URL(i.href)),e=new URL(window.location.href);if(this.options.anchors){const i=t.find(s=>e.host===s.host&&e.pathname===s.pathname&&s.hash);if(i){const s=typeof this.options.anchors=="object"&&this.options.anchors?this.options.anchors:void 0,r=decodeURIComponent(i.hash);this.scrollTo(r,s);return}}if(this.options.stopInertiaOnNavigate&&t.some(i=>e.host===i.host&&e.pathname!==i.pathname)){this.reset();return}});bt(this,"onPointerDown",n=>{n.button===1&&this.reset()});bt(this,"onVirtualScroll",n=>{if(typeof this.options.virtualScroll=="function"&&this.options.virtualScroll(n)===!1)return;const{deltaX:t,deltaY:e,event:i}=n;if(this.emitter.emit("virtual-scroll",{deltaX:t,deltaY:e,event:i}),i.ctrlKey||i.lenisStopPropagation)return;const s=i.type.includes("touch"),r=i.type.includes("wheel");if(s&&this.isIos&&(i.type==="touchstart"&&(this._isDraggingSelection=this.isTouchOnSelectionHandle(i)),this._isDraggingSelection)){i.type==="touchend"&&(this._isDraggingSelection=!1);return}this.isTouching=i.type==="touchstart"||i.type==="touchmove";const o=t===0&&e===0;if(this.options.syncTouch&&s&&i.type==="touchstart"&&o&&!this.isStopped&&!this.isLocked){this.reset();return}const a=this.options.gestureOrientation==="vertical"&&e===0||this.options.gestureOrientation==="horizontal"&&t===0;if(o||a)return;let l=i.composedPath();l=l.slice(0,l.indexOf(this.rootElement));const c=this.options.prevent,d=Math.abs(t)>=Math.abs(e)?"horizontal":"vertical";if(l.find(g=>{var v,m,p,S,x;return g instanceof HTMLElement&&(typeof c=="function"&&(c==null?void 0:c(g))||((v=g.hasAttribute)==null?void 0:v.call(g,"data-lenis-prevent"))||d==="vertical"&&((m=g.hasAttribute)==null?void 0:m.call(g,"data-lenis-prevent-vertical"))||d==="horizontal"&&((p=g.hasAttribute)==null?void 0:p.call(g,"data-lenis-prevent-horizontal"))||s&&((S=g.hasAttribute)==null?void 0:S.call(g,"data-lenis-prevent-touch"))||r&&((x=g.hasAttribute)==null?void 0:x.call(g,"data-lenis-prevent-wheel"))||this.options.allowNestedScroll&&this.hasNestedScroll(g,{deltaX:t,deltaY:e}))}))return;if(this.isStopped||this.isLocked){i.cancelable&&i.preventDefault();return}if(!(this.options.syncTouch&&s||this.options.smoothWheel&&r)){this.isScrolling="native",this.animate.stop(),i.lenisStopPropagation=!0;return}let u=e;this.options.gestureOrientation==="both"?u=Math.abs(e)>Math.abs(t)?e:t:this.options.gestureOrientation==="horizontal"&&(u=t),(!this.options.overscroll||this.options.infinite||this.options.wrapper!==window&&this.limit>0&&(this.animatedScroll>0&&this.animatedScroll<this.limit||this.animatedScroll===0&&e>0||this.animatedScroll===this.limit&&e<0))&&(i.lenisStopPropagation=!0),i.cancelable&&i.preventDefault();const h=s&&this.options.syncTouch,f=s&&i.type==="touchend";f&&(u=Math.sign(u)*Math.abs(this.velocity)**this.options.touchInertiaExponent),this.scrollTo(this.targetScroll+u,{programmatic:!1,...h?{lerp:f?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}})});bt(this,"onNativeScroll",()=>{if(this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this._preventNextNativeScrollEvent){this._preventNextNativeScrollEvent=!1;return}if(this.isScrolling===!1||this.isScrolling==="native"){const n=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-n,this.direction=Math.sign(this.animatedScroll-n),this.isStopped||(this.isScrolling="native"),this.emit(),this.velocity!==0&&(this._resetVelocityTimeout=setTimeout(()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()},400))}});bt(this,"raf",n=>{const t=n-(this.time||n);this.time=n,this.animate.advance(t*.001),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))});window.lenisVersion=Za,window.lenis||(window.lenis={}),window.lenis.version=Za,u==="horizontal"&&(window.lenis.horizontal=!0),s===!0&&(window.lenis.touch=!0),this.isIos=/(iPad|iPhone|iPod)/g.test(navigator.userAgent),(!n||n===document.documentElement)&&(n=window),typeof a=="number"&&typeof l!="function"?l=Ja:typeof l=="function"&&typeof a!="number"&&(a=1),this.options={wrapper:n,content:t,eventsTarget:e,smoothWheel:i,syncTouch:s,syncTouchLerp:r,touchInertiaExponent:o,duration:a,easing:l,lerp:c,infinite:d,gestureOrientation:h,orientation:u,touchMultiplier:f,wheelMultiplier:g,autoResize:v,prevent:m,virtualScroll:p,overscroll:S,autoRaf:x,anchors:_,autoToggle:L,allowNestedScroll:T,naiveDimensions:P,stopInertiaOnNavigate:M,respectReducedMotion:y},this.dimensions=new pu(n,t,{autoResize:v}),this.updateClassName(),this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll),this.options.wrapper.addEventListener("scrollend",this.onScrollEnd,{capture:!0}),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.addEventListener("click",this.onClick),this.options.wrapper.addEventListener("pointerdown",this.onPointerDown),this.virtualScroll=new gu(e,{touchMultiplier:f,wheelMultiplier:g}),this.virtualScroll.on("scroll",this.onVirtualScroll),this.options.autoToggle&&(this.checkOverflow(),this.rootElement.addEventListener("transitionend",this.onTransitionEnd)),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll),this.options.wrapper.removeEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.wrapper.removeEventListener("pointerdown",this.onPointerDown),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.removeEventListener("click",this.onClick),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName(),this._rafId&&cancelAnimationFrame(this._rafId)}on(n,t){return this.emitter.on(n,t)}off(n,t){return this.emitter.off(n,t)}get overflow(){const n=this.isHorizontal?"overflow-x":"overflow-y";return getComputedStyle(this.rootElement)[n]}checkOverflow(){["hidden","clip"].includes(this.overflow)?this.internalStop():this.internalStart()}setScroll(n){this.isHorizontal?this.options.wrapper.scrollTo({left:n,behavior:"instant"}):this.options.wrapper.scrollTo({top:n,behavior:"instant"})}isTouchOnSelectionHandle(n){const t=window.getSelection();if(!t||t.isCollapsed||t.rangeCount===0)return!1;const e=n.targetTouches[0]??n.changedTouches[0];if(!e)return!1;const i=t.getRangeAt(0).getClientRects();if(i.length===0)return!1;const s=i[0],r=i[i.length-1],o=40,a=Math.hypot(e.clientX-s.left,e.clientY-s.top)<=o,l=Math.hypot(e.clientX-r.right,e.clientY-r.bottom)<=o;return a||l}resize(){this.dimensions.resize(),this.animatedScroll=this.targetScroll=this.actualScroll,this.emit()}emit(){this.emitter.emit("scroll",this)}reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){if(this.isStopped){if(this.options.autoToggle){this.rootElement.style.removeProperty("overflow");return}this.internalStart()}}internalStart(){this.isStopped&&(this.reset(),this.isStopped=!1,this.emit())}stop(){if(!this.isStopped){if(this.options.autoToggle){this.rootElement.style.setProperty("overflow","clip");return}this.internalStop()}}internalStop(){this.isStopped||(this.reset(),this.isStopped=!0,this.emit())}scrollTo(n,{offset:t=0,immediate:e=!1,lock:i=!1,programmatic:s=!0,lerp:r=s?this.options.lerp:void 0,duration:o=s?this.options.duration:void 0,easing:a=s?this.options.easing:void 0,onStart:l,onComplete:c,force:d=!1,userData:u}={}){if(this.prefersReducedMotion&&(s?e=!0:(r=1,o=void 0,a=void 0)),(this.isStopped||this.isLocked)&&!d)return;let h=n,f=t;if(typeof h=="string"&&["top","left","start","#"].includes(h))h=0;else if(typeof h=="string"&&["bottom","right","end"].includes(h))h=this.limit;else{let g=null;if(typeof h=="string"?(g=h.startsWith("#")?document.getElementById(h.slice(1)):document.querySelector(h),g||(h==="#top"?h=0:console.warn("Lenis: Target not found",h))):h instanceof HTMLElement&&(h!=null&&h.nodeType)&&(g=h),g){if(this.options.wrapper!==window){const _=this.rootElement.getBoundingClientRect();f-=this.isHorizontal?_.left:_.top}const v=g.getBoundingClientRect(),m=getComputedStyle(g),p=this.isHorizontal?Number.parseFloat(m.scrollMarginLeft):Number.parseFloat(m.scrollMarginTop),S=getComputedStyle(this.rootElement),x=this.isHorizontal?Number.parseFloat(S.scrollPaddingLeft):Number.parseFloat(S.scrollPaddingTop);h=(this.isHorizontal?v.left:v.top)+this.animatedScroll-(Number.isNaN(p)?0:p)-(Number.isNaN(x)?0:x)}}if(typeof h=="number"){if(h+=f,this.options.infinite){if(s){this.targetScroll=this.animatedScroll=this.scroll;const g=h-this.animatedScroll;g>this.limit/2?h-=this.limit:g<-this.limit/2&&(h+=this.limit)}}else h=fc(0,h,this.limit);if(h===this.targetScroll){l==null||l(this),c==null||c(this);return}if(this.userData=u??{},e){this.animatedScroll=this.targetScroll=h,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),c==null||c(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()});return}s||(this.targetScroll=h),typeof o=="number"&&typeof a!="function"?a=Ja:typeof a=="function"&&typeof o!="number"&&(o=1),this.animate.fromTo(this.animatedScroll,h,{duration:o,easing:a,lerp:r,onStart:()=>{i&&(this.isLocked=!0),this.isScrolling="smooth",l==null||l(this)},onUpdate:(g,v)=>{this.isScrolling="smooth",this.lastVelocity=this.velocity,this.velocity=g-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=g,this.setScroll(this.scroll),s&&(this.targetScroll=g),v||this.emit(),v&&(this.reset(),this.emit(),c==null||c(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()}),this.preventNextNativeScrollEvent())}})}}preventNextNativeScrollEvent(){this._preventNextNativeScrollEvent=!0,requestAnimationFrame(()=>{this._preventNextNativeScrollEvent=!1})}hasNestedScroll(n,{deltaX:t,deltaY:e}){const i=Date.now();n._lenis||(n._lenis={});const s=n._lenis;let r,o,a,l,c,d,u,h,f,g;if(i-(s.time??0)>2e3){s.time=Date.now();const T=window.getComputedStyle(n);if(s.computedStyle=T,r=["auto","overlay","scroll"].includes(T.overflowX),o=["auto","overlay","scroll"].includes(T.overflowY),c=["auto"].includes(T.overscrollBehaviorX),d=["auto"].includes(T.overscrollBehaviorY),s.hasOverflowX=r,s.hasOverflowY=o,!(r||o))return!1;u=n.scrollWidth,h=n.scrollHeight,f=n.clientWidth,g=n.clientHeight,a=u>f,l=h>g,s.isScrollableX=a,s.isScrollableY=l,s.scrollWidth=u,s.scrollHeight=h,s.clientWidth=f,s.clientHeight=g,s.hasOverscrollBehaviorX=c,s.hasOverscrollBehaviorY=d}else a=s.isScrollableX,l=s.isScrollableY,r=s.hasOverflowX,o=s.hasOverflowY,u=s.scrollWidth,h=s.scrollHeight,f=s.clientWidth,g=s.clientHeight,c=s.hasOverscrollBehaviorX,d=s.hasOverscrollBehaviorY;if(!(r&&a||o&&l))return!1;const v=Math.abs(t)>=Math.abs(e)?"horizontal":"vertical";let m,p,S,x,_,L;if(v==="horizontal")m=Math.round(n.scrollLeft),p=u-f,S=t,x=r,_=a,L=c;else if(v==="vertical")m=Math.round(n.scrollTop),p=h-g,S=e,x=o,_=l,L=d;else return!1;return!L&&(m>=p||m<=0)?!0:(S>0?m<p:m>0)&&x&&_}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return this.options.orientation==="horizontal"}get actualScroll(){const n=this.options.wrapper;return this.isHorizontal?n.scrollX??n.scrollLeft:n.scrollY??n.scrollTop}get scroll(){return this.options.infinite?du(this.animatedScroll,this.limit):this.animatedScroll}get progress(){return this.limit===0?1:this.scroll/this.limit}get isScrolling(){return this._isScrolling}set isScrolling(n){this._isScrolling!==n&&(this._isScrolling=n,this.updateClassName())}get isStopped(){return this._isStopped}set isStopped(n){this._isStopped!==n&&(this._isStopped=n,this.updateClassName())}get isLocked(){return this._isLocked}set isLocked(n){this._isLocked!==n&&(this._isLocked=n,this.updateClassName())}get isSmooth(){return this.isScrolling==="smooth"}get prefersReducedMotion(){return this.options.respectReducedMotion&&this.reducedMotionMediaQuery.matches}get className(){let n="lenis";return this.options.autoToggle&&(n+=" lenis-autoToggle"),this.isStopped&&(n+=" lenis-stopped"),this.isLocked&&(n+=" lenis-locked"),this.isScrolling&&(n+=" lenis-scrolling"),this.isScrolling==="smooth"&&(n+=" lenis-smooth"),n}updateClassName(){this.cleanUpClassName(),this.className.split(" ").forEach(n=>{this.rootElement.classList.add(n)})}cleanUpClassName(){for(const n of Array.from(this.rootElement.classList))(n==="lenis"||n.startsWith("lenis-"))&&this.rootElement.classList.remove(n)}};/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ea="170",_u=0,Qa=1,vu=2,mc=1,Ir=2,bn=3,Qn=0,Oe=1,Ke=2,Jn=0,Mi=1,sn=2,tl=3,el=4,Mu=5,mi=100,yu=101,Su=102,xu=103,wu=104,Eu=200,bu=201,Tu=202,Au=203,Io=204,Uo=205,Cu=206,Ru=207,Pu=208,Lu=209,Du=210,Iu=211,Uu=212,Nu=213,Fu=214,No=0,Fo=1,Oo=2,es=3,zo=4,Bo=5,ko=6,Go=7,ba=0,Ou=1,zu=2,jn=0,Bu=1,ku=2,Gu=3,Ur=4,Hu=5,Vu=6,Wu=7,gc=300,ns=301,is=302,Ho=303,Vo=304,Nr=306,ti=1e3,_i=1001,Wo=1002,hn=1003,Xu=1004,Vs=1005,_n=1006,Hr=1007,vi=1008,In=1009,_c=1010,vc=1011,Us=1012,Ta=1013,yi=1014,Cn=1015,Os=1016,Aa=1017,Ca=1018,ss=1020,Mc=35902,yc=1021,Sc=1022,dn=1023,xc=1024,wc=1025,Ji=1026,rs=1027,Ec=1028,Ra=1029,bc=1030,Pa=1031,La=1033,vr=33776,Mr=33777,yr=33778,Sr=33779,Xo=35840,qo=35841,Yo=35842,$o=35843,Zo=36196,Ko=37492,Jo=37496,jo=37808,Qo=37809,ta=37810,ea=37811,na=37812,ia=37813,sa=37814,ra=37815,oa=37816,aa=37817,la=37818,ca=37819,ua=37820,da=37821,xr=36492,ha=36494,fa=36495,Tc=36283,pa=36284,ma=36285,ga=36286,qu=3200,Yu=3201,Da=0,$u=1,$n="",_e="srgb",as="srgb-linear",Fr="linear",le="srgb",Pi=7680,nl=519,Zu=512,Ku=513,Ju=514,Ac=515,ju=516,Qu=517,td=518,ed=519,_a=35044,il="300 es",Rn=2e3,br=2001;class ls{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const i=this._listeners[t.type];if(i!==void 0){t.target=this;const s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const Ne=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let sl=1234567;const Cs=Math.PI/180,Ns=180/Math.PI;function Pn(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Ne[n&255]+Ne[n>>8&255]+Ne[n>>16&255]+Ne[n>>24&255]+"-"+Ne[t&255]+Ne[t>>8&255]+"-"+Ne[t>>16&15|64]+Ne[t>>24&255]+"-"+Ne[e&63|128]+Ne[e>>8&255]+"-"+Ne[e>>16&255]+Ne[e>>24&255]+Ne[i&255]+Ne[i>>8&255]+Ne[i>>16&255]+Ne[i>>24&255]).toLowerCase()}function Ue(n,t,e){return Math.max(t,Math.min(e,n))}function Ia(n,t){return(n%t+t)%t}function nd(n,t,e,i,s){return i+(n-t)*(s-i)/(e-t)}function id(n,t,e){return n!==t?(e-n)/(t-n):0}function Rs(n,t,e){return(1-e)*n+e*t}function sd(n,t,e,i){return Rs(n,t,1-Math.exp(-e*i))}function rd(n,t=1){return t-Math.abs(Ia(n,t*2)-t)}function od(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function ad(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function ld(n,t){return n+Math.floor(Math.random()*(t-n+1))}function cd(n,t){return n+Math.random()*(t-n)}function ud(n){return n*(.5-Math.random())}function dd(n){n!==void 0&&(sl=n);let t=sl+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function hd(n){return n*Cs}function fd(n){return n*Ns}function pd(n){return(n&n-1)===0&&n!==0}function md(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function gd(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function _d(n,t,e,i,s){const r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),c=r((t+i)/2),d=o((t+i)/2),u=r((t-i)/2),h=o((t-i)/2),f=r((i-t)/2),g=o((i-t)/2);switch(s){case"XYX":n.set(a*d,l*u,l*h,a*c);break;case"YZY":n.set(l*h,a*d,l*u,a*c);break;case"ZXZ":n.set(l*u,l*h,a*d,a*c);break;case"XZX":n.set(a*d,l*g,l*f,a*c);break;case"YXY":n.set(l*f,a*d,l*g,a*c);break;case"ZYZ":n.set(l*g,l*f,a*d,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function un(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function re(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const Gn={DEG2RAD:Cs,RAD2DEG:Ns,generateUUID:Pn,clamp:Ue,euclideanModulo:Ia,mapLinear:nd,inverseLerp:id,lerp:Rs,damp:sd,pingpong:rd,smoothstep:od,smootherstep:ad,randInt:ld,randFloat:cd,randFloatSpread:ud,seededRandom:dd,degToRad:hd,radToDeg:fd,isPowerOfTwo:pd,ceilPowerOfTwo:md,floorPowerOfTwo:gd,setQuaternionFromProperEuler:_d,normalize:re,denormalize:un};class wt{constructor(t=0,e=0){wt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Ue(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*i-o*s+t.x,this.y=r*s+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Vt{constructor(t,e,i,s,r,o,a,l,c){Vt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,l,c)}set(t,e,i,s,r,o,a,l,c){const d=this.elements;return d[0]=t,d[1]=s,d[2]=a,d[3]=e,d[4]=r,d[5]=l,d[6]=i,d[7]=o,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],d=i[4],u=i[7],h=i[2],f=i[5],g=i[8],v=s[0],m=s[3],p=s[6],S=s[1],x=s[4],_=s[7],L=s[2],T=s[5],R=s[8];return r[0]=o*v+a*S+l*L,r[3]=o*m+a*x+l*T,r[6]=o*p+a*_+l*R,r[1]=c*v+d*S+u*L,r[4]=c*m+d*x+u*T,r[7]=c*p+d*_+u*R,r[2]=h*v+f*S+g*L,r[5]=h*m+f*x+g*T,r[8]=h*p+f*_+g*R,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],d=t[8];return e*o*d-e*a*c-i*r*d+i*a*l+s*r*c-s*o*l}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],d=t[8],u=d*o-a*c,h=a*l-d*r,f=c*r-o*l,g=e*u+i*h+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return t[0]=u*v,t[1]=(s*c-d*i)*v,t[2]=(a*i-s*o)*v,t[3]=h*v,t[4]=(d*e-s*l)*v,t[5]=(s*r-a*e)*v,t[6]=f*v,t[7]=(i*l-c*e)*v,t[8]=(o*e-i*r)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Vr.makeScale(t,e)),this}rotate(t){return this.premultiply(Vr.makeRotation(-t)),this}translate(t,e){return this.premultiply(Vr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Vr=new Vt;function Cc(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function Tr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function vd(){const n=Tr("canvas");return n.style.display="block",n}const rl={};function Es(n){n in rl||(rl[n]=!0,console.warn(n))}function Md(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}function yd(n){const t=n.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Sd(n){const t=n.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const jt={enabled:!0,workingColorSpace:as,spaces:{},convert:function(n,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===le&&(n.r=Ln(n.r),n.g=Ln(n.g),n.b=Ln(n.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(n.applyMatrix3(this.spaces[t].toXYZ),n.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===le&&(n.r=ji(n.r),n.g=ji(n.g),n.b=ji(n.b))),n},fromWorkingColorSpace:function(n,t){return this.convert(n,this.workingColorSpace,t)},toWorkingColorSpace:function(n,t){return this.convert(n,t,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===$n?Fr:this.spaces[n].transfer},getLuminanceCoefficients:function(n,t=this.workingColorSpace){return n.fromArray(this.spaces[t].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,t,e){return n.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace}};function Ln(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function ji(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}const ol=[.64,.33,.3,.6,.15,.06],al=[.2126,.7152,.0722],ll=[.3127,.329],cl=new Vt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ul=new Vt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);jt.define({[as]:{primaries:ol,whitePoint:ll,transfer:Fr,toXYZ:cl,fromXYZ:ul,luminanceCoefficients:al,workingColorSpaceConfig:{unpackColorSpace:_e},outputColorSpaceConfig:{drawingBufferColorSpace:_e}},[_e]:{primaries:ol,whitePoint:ll,transfer:le,toXYZ:cl,fromXYZ:ul,luminanceCoefficients:al,outputColorSpaceConfig:{drawingBufferColorSpace:_e}}});let Li;class xd{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Li===void 0&&(Li=Tr("canvas")),Li.width=t.width,Li.height=t.height;const i=Li.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=Li}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Tr("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Ln(r[o]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Ln(e[i]/255)*255):e[i]=Ln(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let wd=0;class Rc{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:wd++}),this.uuid=Pn(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Wr(s[o].image)):r.push(Wr(s[o]))}else r=Wr(s);i.url=r}return e||(t.images[this.uuid]=i),i}}function Wr(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?xd.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Ed=0;class Ge extends ls{constructor(t=Ge.DEFAULT_IMAGE,e=Ge.DEFAULT_MAPPING,i=_i,s=_i,r=_n,o=vi,a=dn,l=In,c=Ge.DEFAULT_ANISOTROPY,d=$n){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ed++}),this.uuid=Pn(),this.name="",this.source=new Rc(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new wt(0,0),this.repeat=new wt(1,1),this.center=new wt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Vt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==gc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case ti:t.x=t.x-Math.floor(t.x);break;case _i:t.x=t.x<0?0:1;break;case Wo:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case ti:t.y=t.y-Math.floor(t.y);break;case _i:t.y=t.y<0?0:1;break;case Wo:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ge.DEFAULT_IMAGE=null;Ge.DEFAULT_MAPPING=gc;Ge.DEFAULT_ANISOTROPY=1;class ce{constructor(t=0,e=0,i=0,s=1){ce.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*i+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r;const l=t.elements,c=l[0],d=l[4],u=l[8],h=l[1],f=l[5],g=l[9],v=l[2],m=l[6],p=l[10];if(Math.abs(d-h)<.01&&Math.abs(u-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(d+h)<.1&&Math.abs(u+v)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const x=(c+1)/2,_=(f+1)/2,L=(p+1)/2,T=(d+h)/4,R=(u+v)/4,P=(g+m)/4;return x>_&&x>L?x<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(x),s=T/i,r=R/i):_>L?_<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),i=T/s,r=P/s):L<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(L),i=R/r,s=P/r),this.set(i,s,r,e),this}let S=Math.sqrt((m-g)*(m-g)+(u-v)*(u-v)+(h-d)*(h-d));return Math.abs(S)<.001&&(S=1),this.x=(m-g)/S,this.y=(u-v)/S,this.z=(h-d)/S,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class bd extends ls{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new ce(0,0,t,e),this.scissorTest=!1,this.viewport=new ce(0,0,t,e);const s={width:t,height:e,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:_n,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const r=new Ge(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);r.flipY=!1,r.generateMipmaps=i.generateMipmaps,r.internalFormat=i.internalFormat,this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,s=t.textures.length;i<s;i++)this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Rc(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Si extends bd{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class Pc extends Ge{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=hn,this.minFilter=hn,this.wrapR=_i,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Td extends Ge{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=hn,this.minFilter=hn,this.wrapR=_i,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class zs{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,o,a){let l=i[s+0],c=i[s+1],d=i[s+2],u=i[s+3];const h=r[o+0],f=r[o+1],g=r[o+2],v=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=d,t[e+3]=u;return}if(a===1){t[e+0]=h,t[e+1]=f,t[e+2]=g,t[e+3]=v;return}if(u!==v||l!==h||c!==f||d!==g){let m=1-a;const p=l*h+c*f+d*g+u*v,S=p>=0?1:-1,x=1-p*p;if(x>Number.EPSILON){const L=Math.sqrt(x),T=Math.atan2(L,p*S);m=Math.sin(m*T)/L,a=Math.sin(a*T)/L}const _=a*S;if(l=l*m+h*_,c=c*m+f*_,d=d*m+g*_,u=u*m+v*_,m===1-a){const L=1/Math.sqrt(l*l+c*c+d*d+u*u);l*=L,c*=L,d*=L,u*=L}}t[e]=l,t[e+1]=c,t[e+2]=d,t[e+3]=u}static multiplyQuaternionsFlat(t,e,i,s,r,o){const a=i[s],l=i[s+1],c=i[s+2],d=i[s+3],u=r[o],h=r[o+1],f=r[o+2],g=r[o+3];return t[e]=a*g+d*u+l*f-c*h,t[e+1]=l*g+d*h+c*u-a*f,t[e+2]=c*g+d*f+a*h-l*u,t[e+3]=d*g-a*u-l*h-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(i/2),d=a(s/2),u=a(r/2),h=l(i/2),f=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=h*d*u+c*f*g,this._y=c*f*u-h*d*g,this._z=c*d*g+h*f*u,this._w=c*d*u-h*f*g;break;case"YXZ":this._x=h*d*u+c*f*g,this._y=c*f*u-h*d*g,this._z=c*d*g-h*f*u,this._w=c*d*u+h*f*g;break;case"ZXY":this._x=h*d*u-c*f*g,this._y=c*f*u+h*d*g,this._z=c*d*g+h*f*u,this._w=c*d*u-h*f*g;break;case"ZYX":this._x=h*d*u-c*f*g,this._y=c*f*u+h*d*g,this._z=c*d*g-h*f*u,this._w=c*d*u+h*f*g;break;case"YZX":this._x=h*d*u+c*f*g,this._y=c*f*u+h*d*g,this._z=c*d*g-h*f*u,this._w=c*d*u-h*f*g;break;case"XZY":this._x=h*d*u-c*f*g,this._y=c*f*u-h*d*g,this._z=c*d*g+h*f*u,this._w=c*d*u+h*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],d=e[6],u=e[10],h=i+a+u;if(h>0){const f=.5/Math.sqrt(h+1);this._w=.25/f,this._x=(d-l)*f,this._y=(r-c)*f,this._z=(o-s)*f}else if(i>a&&i>u){const f=2*Math.sqrt(1+i-a-u);this._w=(d-l)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+c)/f}else if(a>u){const f=2*Math.sqrt(1+a-i-u);this._w=(r-c)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(l+d)/f}else{const f=2*Math.sqrt(1+u-i-a);this._w=(o-s)/f,this._x=(r+c)/f,this._y=(l+d)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ue(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,d=e._w;return this._x=i*d+o*a+s*c-r*l,this._y=s*d+o*l+r*a-i*c,this._z=r*d+o*c+i*l-s*a,this._w=o*d-i*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,s=this._y,r=this._z,o=this._w;let a=o*t._w+i*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=i,this._y=s,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const f=1-e;return this._w=f*o+e*this._w,this._x=f*i+e*this._x,this._y=f*s+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),d=Math.atan2(c,a),u=Math.sin((1-e)*d)/c,h=Math.sin(e*d)/c;return this._w=o*u+this._w*h,this._x=i*u+this._x*h,this._y=s*u+this._y*h,this._z=r*u+this._z*h,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class b{constructor(t=0,e=0,i=0){b.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(dl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(dl.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,i=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*i),d=2*(a*e-r*s),u=2*(r*i-o*e);return this.x=e+l*c+o*u-a*d,this.y=i+l*d+a*c-r*u,this.z=s+l*u+r*d-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-i*l,this.z=i*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Xr.copy(this).projectOnVector(t),this.sub(Xr)}reflect(t){return this.sub(Xr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Ue(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Xr=new b,dl=new zs;class Bs{constructor(t=new b(1/0,1/0,1/0),e=new b(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(an.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(an.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=an.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,an):an.fromBufferAttribute(r,o),an.applyMatrix4(t.matrixWorld),this.expandByPoint(an);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ws.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ws.copy(i.boundingBox)),Ws.applyMatrix4(t.matrixWorld),this.union(Ws)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,an),an.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ps),Xs.subVectors(this.max,ps),Di.subVectors(t.a,ps),Ii.subVectors(t.b,ps),Ui.subVectors(t.c,ps),Hn.subVectors(Ii,Di),Vn.subVectors(Ui,Ii),ii.subVectors(Di,Ui);let e=[0,-Hn.z,Hn.y,0,-Vn.z,Vn.y,0,-ii.z,ii.y,Hn.z,0,-Hn.x,Vn.z,0,-Vn.x,ii.z,0,-ii.x,-Hn.y,Hn.x,0,-Vn.y,Vn.x,0,-ii.y,ii.x,0];return!qr(e,Di,Ii,Ui,Xs)||(e=[1,0,0,0,1,0,0,0,1],!qr(e,Di,Ii,Ui,Xs))?!1:(qs.crossVectors(Hn,Vn),e=[qs.x,qs.y,qs.z],qr(e,Di,Ii,Ui,Xs))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,an).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(an).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(yn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),yn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),yn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),yn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),yn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),yn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),yn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),yn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(yn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const yn=[new b,new b,new b,new b,new b,new b,new b,new b],an=new b,Ws=new Bs,Di=new b,Ii=new b,Ui=new b,Hn=new b,Vn=new b,ii=new b,ps=new b,Xs=new b,qs=new b,si=new b;function qr(n,t,e,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){si.fromArray(n,r);const a=s.x*Math.abs(si.x)+s.y*Math.abs(si.y)+s.z*Math.abs(si.z),l=t.dot(si),c=e.dot(si),d=i.dot(si);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>a)return!1}return!0}const Ad=new Bs,ms=new b,Yr=new b;class ks{constructor(t=new b,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):Ad.setFromPoints(t).getCenter(i);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ms.subVectors(t,this.center);const e=ms.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(ms,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Yr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ms.copy(t.center).add(Yr)),this.expandByPoint(ms.copy(t.center).sub(Yr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Sn=new b,$r=new b,Ys=new b,Wn=new b,Zr=new b,$s=new b,Kr=new b;class Or{constructor(t=new b,e=new b(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Sn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Sn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Sn.copy(this.origin).addScaledVector(this.direction,e),Sn.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){$r.copy(t).add(e).multiplyScalar(.5),Ys.copy(e).sub(t).normalize(),Wn.copy(this.origin).sub($r);const r=t.distanceTo(e)*.5,o=-this.direction.dot(Ys),a=Wn.dot(this.direction),l=-Wn.dot(Ys),c=Wn.lengthSq(),d=Math.abs(1-o*o);let u,h,f,g;if(d>0)if(u=o*l-a,h=o*a-l,g=r*d,u>=0)if(h>=-g)if(h<=g){const v=1/d;u*=v,h*=v,f=u*(u+o*h+2*a)+h*(o*u+h+2*l)+c}else h=r,u=Math.max(0,-(o*h+a)),f=-u*u+h*(h+2*l)+c;else h=-r,u=Math.max(0,-(o*h+a)),f=-u*u+h*(h+2*l)+c;else h<=-g?(u=Math.max(0,-(-o*r+a)),h=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+h*(h+2*l)+c):h<=g?(u=0,h=Math.min(Math.max(-r,-l),r),f=h*(h+2*l)+c):(u=Math.max(0,-(o*r+a)),h=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+h*(h+2*l)+c);else h=o>0?-r:r,u=Math.max(0,-(o*h+a)),f=-u*u+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy($r).addScaledVector(Ys,h),f}intersectSphere(t,e){Sn.subVectors(t.center,this.origin);const i=Sn.dot(this.direction),s=Sn.dot(Sn)-i*i,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,o,a,l;const c=1/this.direction.x,d=1/this.direction.y,u=1/this.direction.z,h=this.origin;return c>=0?(i=(t.min.x-h.x)*c,s=(t.max.x-h.x)*c):(i=(t.max.x-h.x)*c,s=(t.min.x-h.x)*c),d>=0?(r=(t.min.y-h.y)*d,o=(t.max.y-h.y)*d):(r=(t.max.y-h.y)*d,o=(t.min.y-h.y)*d),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-h.z)*u,l=(t.max.z-h.z)*u):(a=(t.max.z-h.z)*u,l=(t.min.z-h.z)*u),i>l||a>s)||((a>i||i!==i)&&(i=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,Sn)!==null}intersectTriangle(t,e,i,s,r){Zr.subVectors(e,t),$s.subVectors(i,t),Kr.crossVectors(Zr,$s);let o=this.direction.dot(Kr),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Wn.subVectors(this.origin,t);const l=a*this.direction.dot($s.crossVectors(Wn,$s));if(l<0)return null;const c=a*this.direction.dot(Zr.cross(Wn));if(c<0||l+c>o)return null;const d=-a*Wn.dot(Kr);return d<0?null:this.at(d/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ue{constructor(t,e,i,s,r,o,a,l,c,d,u,h,f,g,v,m){ue.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,l,c,d,u,h,f,g,v,m)}set(t,e,i,s,r,o,a,l,c,d,u,h,f,g,v,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=i,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=d,p[10]=u,p[14]=h,p[3]=f,p[7]=g,p[11]=v,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ue().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,s=1/Ni.setFromMatrixColumn(t,0).length(),r=1/Ni.setFromMatrixColumn(t,1).length(),o=1/Ni.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*o,e[9]=i[9]*o,e[10]=i[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,s=t.y,r=t.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(s),c=Math.sin(s),d=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const h=o*d,f=o*u,g=a*d,v=a*u;e[0]=l*d,e[4]=-l*u,e[8]=c,e[1]=f+g*c,e[5]=h-v*c,e[9]=-a*l,e[2]=v-h*c,e[6]=g+f*c,e[10]=o*l}else if(t.order==="YXZ"){const h=l*d,f=l*u,g=c*d,v=c*u;e[0]=h+v*a,e[4]=g*a-f,e[8]=o*c,e[1]=o*u,e[5]=o*d,e[9]=-a,e[2]=f*a-g,e[6]=v+h*a,e[10]=o*l}else if(t.order==="ZXY"){const h=l*d,f=l*u,g=c*d,v=c*u;e[0]=h-v*a,e[4]=-o*u,e[8]=g+f*a,e[1]=f+g*a,e[5]=o*d,e[9]=v-h*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const h=o*d,f=o*u,g=a*d,v=a*u;e[0]=l*d,e[4]=g*c-f,e[8]=h*c+v,e[1]=l*u,e[5]=v*c+h,e[9]=f*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const h=o*l,f=o*c,g=a*l,v=a*c;e[0]=l*d,e[4]=v-h*u,e[8]=g*u+f,e[1]=u,e[5]=o*d,e[9]=-a*d,e[2]=-c*d,e[6]=f*u+g,e[10]=h-v*u}else if(t.order==="XZY"){const h=o*l,f=o*c,g=a*l,v=a*c;e[0]=l*d,e[4]=-u,e[8]=c*d,e[1]=h*u+v,e[5]=o*d,e[9]=f*u-g,e[2]=g*u-f,e[6]=a*d,e[10]=v*u+h}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Cd,t,Rd)}lookAt(t,e,i){const s=this.elements;return qe.subVectors(t,e),qe.lengthSq()===0&&(qe.z=1),qe.normalize(),Xn.crossVectors(i,qe),Xn.lengthSq()===0&&(Math.abs(i.z)===1?qe.x+=1e-4:qe.z+=1e-4,qe.normalize(),Xn.crossVectors(i,qe)),Xn.normalize(),Zs.crossVectors(qe,Xn),s[0]=Xn.x,s[4]=Zs.x,s[8]=qe.x,s[1]=Xn.y,s[5]=Zs.y,s[9]=qe.y,s[2]=Xn.z,s[6]=Zs.z,s[10]=qe.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],d=i[1],u=i[5],h=i[9],f=i[13],g=i[2],v=i[6],m=i[10],p=i[14],S=i[3],x=i[7],_=i[11],L=i[15],T=s[0],R=s[4],P=s[8],M=s[12],y=s[1],C=s[5],I=s[9],G=s[13],J=s[2],et=s[6],K=s[10],st=s[14],$=s[3],ht=s[7],ft=s[11],Pt=s[15];return r[0]=o*T+a*y+l*J+c*$,r[4]=o*R+a*C+l*et+c*ht,r[8]=o*P+a*I+l*K+c*ft,r[12]=o*M+a*G+l*st+c*Pt,r[1]=d*T+u*y+h*J+f*$,r[5]=d*R+u*C+h*et+f*ht,r[9]=d*P+u*I+h*K+f*ft,r[13]=d*M+u*G+h*st+f*Pt,r[2]=g*T+v*y+m*J+p*$,r[6]=g*R+v*C+m*et+p*ht,r[10]=g*P+v*I+m*K+p*ft,r[14]=g*M+v*G+m*st+p*Pt,r[3]=S*T+x*y+_*J+L*$,r[7]=S*R+x*C+_*et+L*ht,r[11]=S*P+x*I+_*K+L*ft,r[15]=S*M+x*G+_*st+L*Pt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],d=t[2],u=t[6],h=t[10],f=t[14],g=t[3],v=t[7],m=t[11],p=t[15];return g*(+r*l*u-s*c*u-r*a*h+i*c*h+s*a*f-i*l*f)+v*(+e*l*f-e*c*h+r*o*h-s*o*f+s*c*d-r*l*d)+m*(+e*c*u-e*a*f-r*o*u+i*o*f+r*a*d-i*c*d)+p*(-s*a*d-e*l*u+e*a*h+s*o*u-i*o*h+i*l*d)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],d=t[8],u=t[9],h=t[10],f=t[11],g=t[12],v=t[13],m=t[14],p=t[15],S=u*m*c-v*h*c+v*l*f-a*m*f-u*l*p+a*h*p,x=g*h*c-d*m*c-g*l*f+o*m*f+d*l*p-o*h*p,_=d*v*c-g*u*c+g*a*f-o*v*f-d*a*p+o*u*p,L=g*u*l-d*v*l-g*a*h+o*v*h+d*a*m-o*u*m,T=e*S+i*x+s*_+r*L;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/T;return t[0]=S*R,t[1]=(v*h*r-u*m*r-v*s*f+i*m*f+u*s*p-i*h*p)*R,t[2]=(a*m*r-v*l*r+v*s*c-i*m*c-a*s*p+i*l*p)*R,t[3]=(u*l*r-a*h*r-u*s*c+i*h*c+a*s*f-i*l*f)*R,t[4]=x*R,t[5]=(d*m*r-g*h*r+g*s*f-e*m*f-d*s*p+e*h*p)*R,t[6]=(g*l*r-o*m*r-g*s*c+e*m*c+o*s*p-e*l*p)*R,t[7]=(o*h*r-d*l*r+d*s*c-e*h*c-o*s*f+e*l*f)*R,t[8]=_*R,t[9]=(g*u*r-d*v*r-g*i*f+e*v*f+d*i*p-e*u*p)*R,t[10]=(o*v*r-g*a*r+g*i*c-e*v*c-o*i*p+e*a*p)*R,t[11]=(d*a*r-o*u*r-d*i*c+e*u*c+o*i*f-e*a*f)*R,t[12]=L*R,t[13]=(d*v*s-g*u*s+g*i*h-e*v*h-d*i*m+e*u*m)*R,t[14]=(g*a*s-o*v*s-g*i*l+e*v*l+o*i*m-e*a*m)*R,t[15]=(o*u*s-d*a*s+d*i*l-e*u*l-o*i*h+e*a*h)*R,this}scale(t){const e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),s=Math.sin(e),r=1-i,o=t.x,a=t.y,l=t.z,c=r*o,d=r*a;return this.set(c*o+i,c*a-s*l,c*l+s*a,0,c*a+s*l,d*a+i,d*l-s*o,0,c*l-s*a,d*l+s*o,r*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,o){return this.set(1,i,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){const s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,d=o+o,u=a+a,h=r*c,f=r*d,g=r*u,v=o*d,m=o*u,p=a*u,S=l*c,x=l*d,_=l*u,L=i.x,T=i.y,R=i.z;return s[0]=(1-(v+p))*L,s[1]=(f+_)*L,s[2]=(g-x)*L,s[3]=0,s[4]=(f-_)*T,s[5]=(1-(h+p))*T,s[6]=(m+S)*T,s[7]=0,s[8]=(g+x)*R,s[9]=(m-S)*R,s[10]=(1-(h+v))*R,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){const s=this.elements;let r=Ni.set(s[0],s[1],s[2]).length();const o=Ni.set(s[4],s[5],s[6]).length(),a=Ni.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],ln.copy(this);const c=1/r,d=1/o,u=1/a;return ln.elements[0]*=c,ln.elements[1]*=c,ln.elements[2]*=c,ln.elements[4]*=d,ln.elements[5]*=d,ln.elements[6]*=d,ln.elements[8]*=u,ln.elements[9]*=u,ln.elements[10]*=u,e.setFromRotationMatrix(ln),i.x=r,i.y=o,i.z=a,this}makePerspective(t,e,i,s,r,o,a=Rn){const l=this.elements,c=2*r/(e-t),d=2*r/(i-s),u=(e+t)/(e-t),h=(i+s)/(i-s);let f,g;if(a===Rn)f=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===br)f=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=d,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,s,r,o,a=Rn){const l=this.elements,c=1/(e-t),d=1/(i-s),u=1/(o-r),h=(e+t)*c,f=(i+s)*d;let g,v;if(a===Rn)g=(o+r)*u,v=-2*u;else if(a===br)g=r*u,v=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-h,l[1]=0,l[5]=2*d,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=v,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const Ni=new b,ln=new ue,Cd=new b(0,0,0),Rd=new b(1,1,1),Xn=new b,Zs=new b,qe=new b,hl=new ue,fl=new zs;class fn{constructor(t=0,e=0,i=0,s=fn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],d=s[9],u=s[2],h=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(Ue(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-d,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ue(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ue(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ue(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(h,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Ue(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Ue(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-d,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return hl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(hl,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return fl.setFromEuler(this),this.setFromQuaternion(fl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}fn.DEFAULT_ORDER="XYZ";class Ua{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Pd=0;const pl=new b,Fi=new zs,xn=new ue,Ks=new b,gs=new b,Ld=new b,Dd=new zs,ml=new b(1,0,0),gl=new b(0,1,0),_l=new b(0,0,1),vl={type:"added"},Id={type:"removed"},Oi={type:"childadded",child:null},Jr={type:"childremoved",child:null};class Ae extends ls{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Pd++}),this.uuid=Pn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ae.DEFAULT_UP.clone();const t=new b,e=new fn,i=new zs,s=new b(1,1,1);function r(){i.setFromEuler(e,!1)}function o(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ue},normalMatrix:{value:new Vt}}),this.matrix=new ue,this.matrixWorld=new ue,this.matrixAutoUpdate=Ae.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ae.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ua,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Fi.setFromAxisAngle(t,e),this.quaternion.multiply(Fi),this}rotateOnWorldAxis(t,e){return Fi.setFromAxisAngle(t,e),this.quaternion.premultiply(Fi),this}rotateX(t){return this.rotateOnAxis(ml,t)}rotateY(t){return this.rotateOnAxis(gl,t)}rotateZ(t){return this.rotateOnAxis(_l,t)}translateOnAxis(t,e){return pl.copy(t).applyQuaternion(this.quaternion),this.position.add(pl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(ml,t)}translateY(t){return this.translateOnAxis(gl,t)}translateZ(t){return this.translateOnAxis(_l,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(xn.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Ks.copy(t):Ks.set(t,e,i);const s=this.parent;this.updateWorldMatrix(!0,!1),gs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?xn.lookAt(gs,Ks,this.up):xn.lookAt(Ks,gs,this.up),this.quaternion.setFromRotationMatrix(xn),s&&(xn.extractRotation(s.matrixWorld),Fi.setFromRotationMatrix(xn),this.quaternion.premultiply(Fi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(vl),Oi.child=t,this.dispatchEvent(Oi),Oi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Id),Jr.child=t,this.dispatchEvent(Jr),Jr.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),xn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),xn.multiply(t.parent.matrixWorld)),t.applyMatrix4(xn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(vl),Oi.child=t,this.dispatchEvent(Oi),Oi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(gs,t,Ld),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(gs,Dd,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){const u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),d=o(t.images),u=o(t.shapes),h=o(t.skeletons),f=o(t.animations),g=o(t.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),d.length>0&&(i.images=d),u.length>0&&(i.shapes=u),h.length>0&&(i.skeletons=h),f.length>0&&(i.animations=f),g.length>0&&(i.nodes=g)}return i.object=s,i;function o(a){const l=[];for(const c in a){const d=a[c];delete d.metadata,l.push(d)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const s=t.children[i];this.add(s.clone())}return this}}Ae.DEFAULT_UP=new b(0,1,0);Ae.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ae.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const cn=new b,wn=new b,jr=new b,En=new b,zi=new b,Bi=new b,Ml=new b,Qr=new b,to=new b,eo=new b,no=new ce,io=new ce,so=new ce;class nn{constructor(t=new b,e=new b,i=new b){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),cn.subVectors(t,e),s.cross(cn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){cn.subVectors(s,e),wn.subVectors(i,e),jr.subVectors(t,e);const o=cn.dot(cn),a=cn.dot(wn),l=cn.dot(jr),c=wn.dot(wn),d=wn.dot(jr),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;const h=1/u,f=(c*l-a*d)*h,g=(o*d-a*l)*h;return r.set(1-f-g,g,f)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,En)===null?!1:En.x>=0&&En.y>=0&&En.x+En.y<=1}static getInterpolation(t,e,i,s,r,o,a,l){return this.getBarycoord(t,e,i,s,En)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,En.x),l.addScaledVector(o,En.y),l.addScaledVector(a,En.z),l)}static getInterpolatedAttribute(t,e,i,s,r,o){return no.setScalar(0),io.setScalar(0),so.setScalar(0),no.fromBufferAttribute(t,e),io.fromBufferAttribute(t,i),so.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(no,r.x),o.addScaledVector(io,r.y),o.addScaledVector(so,r.z),o}static isFrontFacing(t,e,i,s){return cn.subVectors(i,e),wn.subVectors(t,e),cn.cross(wn).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return cn.subVectors(this.c,this.b),wn.subVectors(this.a,this.b),cn.cross(wn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return nn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return nn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return nn.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return nn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return nn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,s=this.b,r=this.c;let o,a;zi.subVectors(s,i),Bi.subVectors(r,i),Qr.subVectors(t,i);const l=zi.dot(Qr),c=Bi.dot(Qr);if(l<=0&&c<=0)return e.copy(i);to.subVectors(t,s);const d=zi.dot(to),u=Bi.dot(to);if(d>=0&&u<=d)return e.copy(s);const h=l*u-d*c;if(h<=0&&l>=0&&d<=0)return o=l/(l-d),e.copy(i).addScaledVector(zi,o);eo.subVectors(t,r);const f=zi.dot(eo),g=Bi.dot(eo);if(g>=0&&f<=g)return e.copy(r);const v=f*c-l*g;if(v<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(i).addScaledVector(Bi,a);const m=d*g-f*u;if(m<=0&&u-d>=0&&f-g>=0)return Ml.subVectors(r,s),a=(u-d)/(u-d+(f-g)),e.copy(s).addScaledVector(Ml,a);const p=1/(m+v+h);return o=v*p,a=h*p,e.copy(i).addScaledVector(zi,o).addScaledVector(Bi,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Lc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},qn={h:0,s:0,l:0},Js={h:0,s:0,l:0};function ro(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class Nt{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=_e){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,jt.toWorkingColorSpace(this,e),this}setRGB(t,e,i,s=jt.workingColorSpace){return this.r=t,this.g=e,this.b=i,jt.toWorkingColorSpace(this,s),this}setHSL(t,e,i,s=jt.workingColorSpace){if(t=Ia(t,1),e=Ue(e,0,1),i=Ue(i,0,1),e===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+e):i+e-i*e,o=2*i-r;this.r=ro(o,r,t+1/3),this.g=ro(o,r,t),this.b=ro(o,r,t-1/3)}return jt.toWorkingColorSpace(this,s),this}setStyle(t,e=_e){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=_e){const i=Lc[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ln(t.r),this.g=Ln(t.g),this.b=Ln(t.b),this}copyLinearToSRGB(t){return this.r=ji(t.r),this.g=ji(t.g),this.b=ji(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=_e){return jt.fromWorkingColorSpace(Fe.copy(this),t),Math.round(Ue(Fe.r*255,0,255))*65536+Math.round(Ue(Fe.g*255,0,255))*256+Math.round(Ue(Fe.b*255,0,255))}getHexString(t=_e){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=jt.workingColorSpace){jt.fromWorkingColorSpace(Fe.copy(this),e);const i=Fe.r,s=Fe.g,r=Fe.b,o=Math.max(i,s,r),a=Math.min(i,s,r);let l,c;const d=(a+o)/2;if(a===o)l=0,c=0;else{const u=o-a;switch(c=d<=.5?u/(o+a):u/(2-o-a),o){case i:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-i)/u+2;break;case r:l=(i-s)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=d,t}getRGB(t,e=jt.workingColorSpace){return jt.fromWorkingColorSpace(Fe.copy(this),e),t.r=Fe.r,t.g=Fe.g,t.b=Fe.b,t}getStyle(t=_e){jt.fromWorkingColorSpace(Fe.copy(this),t);const e=Fe.r,i=Fe.g,s=Fe.b;return t!==_e?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(qn),this.setHSL(qn.h+t,qn.s+e,qn.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(qn),t.getHSL(Js);const i=Rs(qn.h,Js.h,e),s=Rs(qn.s,Js.s,e),r=Rs(qn.l,Js.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Fe=new Nt;Nt.NAMES=Lc;let Ud=0;class Fn extends ls{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ud++}),this.uuid=Pn(),this.name="",this.blending=Mi,this.side=Qn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Io,this.blendDst=Uo,this.blendEquation=mi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Nt(0,0,0),this.blendAlpha=0,this.depthFunc=es,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=nl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Pi,this.stencilZFail=Pi,this.stencilZPass=Pi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Mi&&(i.blending=this.blending),this.side!==Qn&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Io&&(i.blendSrc=this.blendSrc),this.blendDst!==Uo&&(i.blendDst=this.blendDst),this.blendEquation!==mi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==es&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==nl&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Pi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Pi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Pi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Ve extends Fn{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Nt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new fn,this.combine=ba,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const be=new b,js=new wt;class De{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=_a,this.updateRanges=[],this.gpuType=Cn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)js.fromBufferAttribute(this,e),js.applyMatrix3(t),this.setXY(e,js.x,js.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)be.fromBufferAttribute(this,e),be.applyMatrix3(t),this.setXYZ(e,be.x,be.y,be.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)be.fromBufferAttribute(this,e),be.applyMatrix4(t),this.setXYZ(e,be.x,be.y,be.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)be.fromBufferAttribute(this,e),be.applyNormalMatrix(t),this.setXYZ(e,be.x,be.y,be.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)be.fromBufferAttribute(this,e),be.transformDirection(t),this.setXYZ(e,be.x,be.y,be.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=un(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=re(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=un(e,this.array)),e}setX(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=un(e,this.array)),e}setY(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=un(e,this.array)),e}setZ(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=un(e,this.array)),e}setW(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=re(e,this.array),i=re(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=re(e,this.array),i=re(i,this.array),s=re(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=re(e,this.array),i=re(i,this.array),s=re(s,this.array),r=re(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==_a&&(t.usage=this.usage),t}}class Dc extends De{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class Ic extends De{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class fe extends De{constructor(t,e,i){super(new Float32Array(t),e,i)}}let Nd=0;const en=new ue,oo=new Ae,ki=new b,Ye=new Bs,_s=new Bs,Le=new b;class xe extends ls{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Nd++}),this.uuid=Pn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Cc(t)?Ic:Dc)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Vt().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return en.makeRotationFromQuaternion(t),this.applyMatrix4(en),this}rotateX(t){return en.makeRotationX(t),this.applyMatrix4(en),this}rotateY(t){return en.makeRotationY(t),this.applyMatrix4(en),this}rotateZ(t){return en.makeRotationZ(t),this.applyMatrix4(en),this}translate(t,e,i){return en.makeTranslation(t,e,i),this.applyMatrix4(en),this}scale(t,e,i){return en.makeScale(t,e,i),this.applyMatrix4(en),this}lookAt(t){return oo.lookAt(t),oo.updateMatrix(),this.applyMatrix4(oo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ki).negate(),this.translate(ki.x,ki.y,ki.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new fe(i,3))}else{for(let i=0,s=e.count;i<s;i++){const r=t[i];e.setXYZ(i,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Bs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new b(-1/0,-1/0,-1/0),new b(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){const r=e[i];Ye.setFromBufferAttribute(r),this.morphTargetsRelative?(Le.addVectors(this.boundingBox.min,Ye.min),this.boundingBox.expandByPoint(Le),Le.addVectors(this.boundingBox.max,Ye.max),this.boundingBox.expandByPoint(Le)):(this.boundingBox.expandByPoint(Ye.min),this.boundingBox.expandByPoint(Ye.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ks);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new b,1/0);return}if(t){const i=this.boundingSphere.center;if(Ye.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];_s.setFromBufferAttribute(a),this.morphTargetsRelative?(Le.addVectors(Ye.min,_s.min),Ye.expandByPoint(Le),Le.addVectors(Ye.max,_s.max),Ye.expandByPoint(Le)):(Ye.expandByPoint(_s.min),Ye.expandByPoint(_s.max))}Ye.getCenter(i);let s=0;for(let r=0,o=t.count;r<o;r++)Le.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(Le));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],l=this.morphTargetsRelative;for(let c=0,d=a.count;c<d;c++)Le.fromBufferAttribute(a,c),l&&(ki.fromBufferAttribute(t,c),Le.add(ki)),s=Math.max(s,i.distanceToSquared(Le))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new De(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let P=0;P<i.count;P++)a[P]=new b,l[P]=new b;const c=new b,d=new b,u=new b,h=new wt,f=new wt,g=new wt,v=new b,m=new b;function p(P,M,y){c.fromBufferAttribute(i,P),d.fromBufferAttribute(i,M),u.fromBufferAttribute(i,y),h.fromBufferAttribute(r,P),f.fromBufferAttribute(r,M),g.fromBufferAttribute(r,y),d.sub(c),u.sub(c),f.sub(h),g.sub(h);const C=1/(f.x*g.y-g.x*f.y);isFinite(C)&&(v.copy(d).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(C),m.copy(u).multiplyScalar(f.x).addScaledVector(d,-g.x).multiplyScalar(C),a[P].add(v),a[M].add(v),a[y].add(v),l[P].add(m),l[M].add(m),l[y].add(m))}let S=this.groups;S.length===0&&(S=[{start:0,count:t.count}]);for(let P=0,M=S.length;P<M;++P){const y=S[P],C=y.start,I=y.count;for(let G=C,J=C+I;G<J;G+=3)p(t.getX(G+0),t.getX(G+1),t.getX(G+2))}const x=new b,_=new b,L=new b,T=new b;function R(P){L.fromBufferAttribute(s,P),T.copy(L);const M=a[P];x.copy(M),x.sub(L.multiplyScalar(L.dot(M))).normalize(),_.crossVectors(T,M);const C=_.dot(l[P])<0?-1:1;o.setXYZW(P,x.x,x.y,x.z,C)}for(let P=0,M=S.length;P<M;++P){const y=S[P],C=y.start,I=y.count;for(let G=C,J=C+I;G<J;G+=3)R(t.getX(G+0)),R(t.getX(G+1)),R(t.getX(G+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new De(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let h=0,f=i.count;h<f;h++)i.setXYZ(h,0,0,0);const s=new b,r=new b,o=new b,a=new b,l=new b,c=new b,d=new b,u=new b;if(t)for(let h=0,f=t.count;h<f;h+=3){const g=t.getX(h+0),v=t.getX(h+1),m=t.getX(h+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,v),o.fromBufferAttribute(e,m),d.subVectors(o,r),u.subVectors(s,r),d.cross(u),a.fromBufferAttribute(i,g),l.fromBufferAttribute(i,v),c.fromBufferAttribute(i,m),a.add(d),l.add(d),c.add(d),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(v,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,f=e.count;h<f;h+=3)s.fromBufferAttribute(e,h+0),r.fromBufferAttribute(e,h+1),o.fromBufferAttribute(e,h+2),d.subVectors(o,r),u.subVectors(s,r),d.cross(u),i.setXYZ(h+0,d.x,d.y,d.z),i.setXYZ(h+1,d.x,d.y,d.z),i.setXYZ(h+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Le.fromBufferAttribute(t,e),Le.normalize(),t.setXYZ(e,Le.x,Le.y,Le.z)}toNonIndexed(){function t(a,l){const c=a.array,d=a.itemSize,u=a.normalized,h=new c.constructor(l.length*d);let f=0,g=0;for(let v=0,m=l.length;v<m;v++){a.isInterleavedBufferAttribute?f=l[v]*a.data.stride+a.offset:f=l[v]*d;for(let p=0;p<d;p++)h[g++]=c[f++]}return new De(h,d,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new xe,i=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=t(l,i);e.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let d=0,u=c.length;d<u;d++){const h=c[d],f=t(h,i);l.push(f)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const l in i){const c=i[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],d=[];for(let u=0,h=c.length;u<h;u++){const f=c[u];d.push(f.toJSON(t.data))}d.length>0&&(s[l]=d,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone(e));const s=t.attributes;for(const c in s){const d=s[c];this.setAttribute(c,d.clone(e))}const r=t.morphAttributes;for(const c in r){const d=[],u=r[c];for(let h=0,f=u.length;h<f;h++)d.push(u[h].clone(e));this.morphAttributes[c]=d}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,d=o.length;c<d;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const yl=new ue,ri=new Or,Qs=new ks,Sl=new b,tr=new b,er=new b,nr=new b,ao=new b,ir=new b,xl=new b,sr=new b;class U extends Ae{constructor(t=new xe,e=new Ve){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){ir.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const d=a[l],u=r[l];d!==0&&(ao.fromBufferAttribute(u,t),o?ir.addScaledVector(ao,d):ir.addScaledVector(ao.sub(e),d))}e.add(ir)}return e}raycast(t,e){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Qs.copy(i.boundingSphere),Qs.applyMatrix4(r),ri.copy(t.ray).recast(t.near),!(Qs.containsPoint(ri.origin)===!1&&(ri.intersectSphere(Qs,Sl)===null||ri.origin.distanceToSquared(Sl)>(t.far-t.near)**2))&&(yl.copy(r).invert(),ri.copy(t.ray).applyMatrix4(yl),!(i.boundingBox!==null&&ri.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,ri)))}_computeIntersections(t,e,i){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,d=r.attributes.uv1,u=r.attributes.normal,h=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,v=h.length;g<v;g++){const m=h[g],p=o[m.materialIndex],S=Math.max(m.start,f.start),x=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let _=S,L=x;_<L;_+=3){const T=a.getX(_),R=a.getX(_+1),P=a.getX(_+2);s=rr(this,p,t,i,c,d,u,T,R,P),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,f.start),v=Math.min(a.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){const S=a.getX(m),x=a.getX(m+1),_=a.getX(m+2);s=rr(this,o,t,i,c,d,u,S,x,_),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,v=h.length;g<v;g++){const m=h[g],p=o[m.materialIndex],S=Math.max(m.start,f.start),x=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let _=S,L=x;_<L;_+=3){const T=_,R=_+1,P=_+2;s=rr(this,p,t,i,c,d,u,T,R,P),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){const S=m,x=m+1,_=m+2;s=rr(this,o,t,i,c,d,u,S,x,_),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function Fd(n,t,e,i,s,r,o,a){let l;if(t.side===Oe?l=i.intersectTriangle(o,r,s,!0,a):l=i.intersectTriangle(s,r,o,t.side===Qn,a),l===null)return null;sr.copy(a),sr.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(sr);return c<e.near||c>e.far?null:{distance:c,point:sr.clone(),object:n}}function rr(n,t,e,i,s,r,o,a,l,c){n.getVertexPosition(a,tr),n.getVertexPosition(l,er),n.getVertexPosition(c,nr);const d=Fd(n,t,e,i,tr,er,nr,xl);if(d){const u=new b;nn.getBarycoord(xl,tr,er,nr,u),s&&(d.uv=nn.getInterpolatedAttribute(s,a,l,c,u,new wt)),r&&(d.uv1=nn.getInterpolatedAttribute(r,a,l,c,u,new wt)),o&&(d.normal=nn.getInterpolatedAttribute(o,a,l,c,u,new b),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));const h={a,b:l,c,normal:new b,materialIndex:0};nn.getNormal(tr,er,nr,h.normal),d.face=h,d.barycoord=u}return d}class St extends xe{constructor(t=1,e=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],d=[],u=[];let h=0,f=0;g("z","y","x",-1,-1,i,e,t,o,r,0),g("z","y","x",1,-1,i,e,-t,o,r,1),g("x","z","y",1,1,t,i,e,s,o,2),g("x","z","y",1,-1,t,i,-e,s,o,3),g("x","y","z",1,-1,t,e,i,s,r,4),g("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new fe(c,3)),this.setAttribute("normal",new fe(d,3)),this.setAttribute("uv",new fe(u,2));function g(v,m,p,S,x,_,L,T,R,P,M){const y=_/R,C=L/P,I=_/2,G=L/2,J=T/2,et=R+1,K=P+1;let st=0,$=0;const ht=new b;for(let ft=0;ft<K;ft++){const Pt=ft*C-G;for(let Gt=0;Gt<et;Gt++){const ee=Gt*y-I;ht[v]=ee*S,ht[m]=Pt*x,ht[p]=J,c.push(ht.x,ht.y,ht.z),ht[v]=0,ht[m]=0,ht[p]=T>0?1:-1,d.push(ht.x,ht.y,ht.z),u.push(Gt/R),u.push(1-ft/P),st+=1}}for(let ft=0;ft<P;ft++)for(let Pt=0;Pt<R;Pt++){const Gt=h+Pt+et*ft,ee=h+Pt+et*(ft+1),Q=h+(Pt+1)+et*(ft+1),dt=h+(Pt+1)+et*ft;l.push(Gt,ee,dt),l.push(ee,Q,dt),$+=6}a.addGroup(f,$,M),f+=$,h+=st}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new St(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function os(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const s=n[e][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone():Array.isArray(s)?t[e][i]=s.slice():t[e][i]=s}}return t}function ke(n){const t={};for(let e=0;e<n.length;e++){const i=os(n[e]);for(const s in i)t[s]=i[s]}return t}function Od(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function Uc(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:jt.workingColorSpace}const zd={clone:os,merge:ke};var Bd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,kd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Un extends Fn{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Bd,this.fragmentShader=kd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=os(t.uniforms),this.uniformsGroups=Od(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class Nc extends Ae{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ue,this.projectionMatrix=new ue,this.projectionMatrixInverse=new ue,this.coordinateSystem=Rn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Yn=new b,wl=new wt,El=new wt;class he extends Nc{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Ns*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Cs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ns*2*Math.atan(Math.tan(Cs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){Yn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Yn.x,Yn.y).multiplyScalar(-t/Yn.z),Yn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Yn.x,Yn.y).multiplyScalar(-t/Yn.z)}getViewSize(t,e){return this.getViewBounds(t,wl,El),e.subVectors(El,wl)}setViewOffset(t,e,i,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Cs*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*i/c,s*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Gi=-90,Hi=1;class Gd extends Ae{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new he(Gi,Hi,t,e);s.layers=this.layers,this.add(s);const r=new he(Gi,Hi,t,e);r.layers=this.layers,this.add(r);const o=new he(Gi,Hi,t,e);o.layers=this.layers,this.add(o);const a=new he(Gi,Hi,t,e);a.layers=this.layers,this.add(a);const l=new he(Gi,Hi,t,e);l.layers=this.layers,this.add(l);const c=new he(Gi,Hi,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,s,r,o,a,l]=e;for(const c of e)this.remove(c);if(t===Rn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===br)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,d]=this.children,u=t.getRenderTarget(),h=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,s),t.render(e,r),t.setRenderTarget(i,1,s),t.render(e,o),t.setRenderTarget(i,2,s),t.render(e,a),t.setRenderTarget(i,3,s),t.render(e,l),t.setRenderTarget(i,4,s),t.render(e,c),i.texture.generateMipmaps=v,t.setRenderTarget(i,5,s),t.render(e,d),t.setRenderTarget(u,h,f),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class Fc extends Ge{constructor(t,e,i,s,r,o,a,l,c,d){t=t!==void 0?t:[],e=e!==void 0?e:ns,super(t,e,i,s,r,o,a,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Hd extends Si{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new Fc(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:_n}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new St(5,5,5),r=new Un({name:"CubemapFromEquirect",uniforms:os(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Oe,blending:Jn});r.uniforms.tEquirect.value=e;const o=new U(s,r),a=e.minFilter;return e.minFilter===vi&&(e.minFilter=_n),new Gd(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,i,s){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,i,s);t.setRenderTarget(r)}}const lo=new b,Vd=new b,Wd=new Vt;class fi{constructor(t=new b(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const s=lo.subVectors(i,e).cross(Vd.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(lo),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(i,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||Wd.getNormalMatrix(t),s=this.coplanarPoint(lo).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const oi=new ks,or=new b;class Na{constructor(t=new fi,e=new fi,i=new fi,s=new fi,r=new fi,o=new fi){this.planes=[t,e,i,s,r,o]}set(t,e,i,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=Rn){const i=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],l=s[3],c=s[4],d=s[5],u=s[6],h=s[7],f=s[8],g=s[9],v=s[10],m=s[11],p=s[12],S=s[13],x=s[14],_=s[15];if(i[0].setComponents(l-r,h-c,m-f,_-p).normalize(),i[1].setComponents(l+r,h+c,m+f,_+p).normalize(),i[2].setComponents(l+o,h+d,m+g,_+S).normalize(),i[3].setComponents(l-o,h-d,m-g,_-S).normalize(),i[4].setComponents(l-a,h-u,m-v,_-x).normalize(),e===Rn)i[5].setComponents(l+a,h+u,m+v,_+x).normalize();else if(e===br)i[5].setComponents(a,u,v,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),oi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),oi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(oi)}intersectsSprite(t){return oi.center.set(0,0,0),oi.radius=.7071067811865476,oi.applyMatrix4(t.matrixWorld),this.intersectsSphere(oi)}intersectsSphere(t){const e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const s=e[i];if(or.x=s.normal.x>0?t.max.x:t.min.x,or.y=s.normal.y>0?t.max.y:t.min.y,or.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(or)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Oc(){let n=null,t=!1,e=null,i=null;function s(r,o){e(r,o),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function Xd(n){const t=new WeakMap;function e(a,l){const c=a.array,d=a.usage,u=c.byteLength,h=n.createBuffer();n.bindBuffer(l,h),n.bufferData(l,c,d),a.onUploadCallback();let f;if(c instanceof Float32Array)f=n.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=n.HALF_FLOAT:f=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=n.SHORT;else if(c instanceof Uint32Array)f=n.UNSIGNED_INT;else if(c instanceof Int32Array)f=n.INT;else if(c instanceof Int8Array)f=n.BYTE;else if(c instanceof Uint8Array)f=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function i(a,l,c){const d=l.array,u=l.updateRanges;if(n.bindBuffer(c,a),u.length===0)n.bufferSubData(c,0,d);else{u.sort((f,g)=>f.start-g.start);let h=0;for(let f=1;f<u.length;f++){const g=u[h],v=u[f];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++h,u[h]=v)}u.length=h+1;for(let f=0,g=u.length;f<g;f++){const v=u[f];n.bufferSubData(c,v.start*d.BYTES_PER_ELEMENT,d,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(n.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const d=t.get(a);(!d||d.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}class Zt extends xe{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(i),l=Math.floor(s),c=a+1,d=l+1,u=t/a,h=e/l,f=[],g=[],v=[],m=[];for(let p=0;p<d;p++){const S=p*h-o;for(let x=0;x<c;x++){const _=x*u-r;g.push(_,-S,0),v.push(0,0,1),m.push(x/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let S=0;S<a;S++){const x=S+c*p,_=S+c*(p+1),L=S+1+c*(p+1),T=S+1+c*p;f.push(x,_,T),f.push(_,L,T)}this.setIndex(f),this.setAttribute("position",new fe(g,3)),this.setAttribute("normal",new fe(v,3)),this.setAttribute("uv",new fe(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Zt(t.width,t.height,t.widthSegments,t.heightSegments)}}var qd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Yd=`#ifdef USE_ALPHAHASH
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
#endif`,$d=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Zd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Kd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Jd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,jd=`#ifdef USE_AOMAP
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
#endif`,Qd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,th=`#ifdef USE_BATCHING
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
#endif`,eh=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,nh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ih=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,sh=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,rh=`#ifdef USE_IRIDESCENCE
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
#endif`,oh=`#ifdef USE_BUMPMAP
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
#endif`,ah=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,lh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ch=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,uh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,dh=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,hh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,fh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,ph=`#if defined( USE_COLOR_ALPHA )
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
#endif`,mh=`#define PI 3.141592653589793
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
} // validated`,gh=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,_h=`vec3 transformedNormal = objectNormal;
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
#endif`,vh=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Mh=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,yh=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Sh=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,xh="gl_FragColor = linearToOutputTexel( gl_FragColor );",wh=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Eh=`#ifdef USE_ENVMAP
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
#endif`,bh=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Th=`#ifdef USE_ENVMAP
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
#endif`,Ah=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Ch=`#ifdef USE_ENVMAP
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
#endif`,Rh=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Ph=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Lh=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Dh=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Ih=`#ifdef USE_GRADIENTMAP
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
}`,Uh=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Nh=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Fh=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Oh=`uniform bool receiveShadow;
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
#endif`,zh=`#ifdef USE_ENVMAP
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
#endif`,Bh=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,kh=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Gh=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Hh=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Vh=`PhysicalMaterial material;
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
#endif`,Wh=`struct PhysicalMaterial {
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
}`,Xh=`
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
#endif`,qh=`#if defined( RE_IndirectDiffuse )
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
#endif`,Yh=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,$h=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Zh=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Kh=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Jh=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,jh=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Qh=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,tf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,ef=`#if defined( USE_POINTS_UV )
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
#endif`,nf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,sf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,rf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,of=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,af=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,lf=`#ifdef USE_MORPHTARGETS
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
#endif`,cf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,uf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,df=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,hf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ff=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,pf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,mf=`#ifdef USE_NORMALMAP
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
#endif`,gf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,_f=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,vf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Mf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,yf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Sf=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,xf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,wf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Ef=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,bf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Tf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Af=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Cf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Rf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Pf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Lf=`float getShadowMask() {
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
}`,Df=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,If=`#ifdef USE_SKINNING
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
#endif`,Uf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Nf=`#ifdef USE_SKINNING
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
#endif`,Ff=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Of=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,zf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Bf=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,kf=`#ifdef USE_TRANSMISSION
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
#endif`,Gf=`#ifdef USE_TRANSMISSION
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
#endif`,Hf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Vf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Wf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Xf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const qf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Yf=`uniform sampler2D t2D;
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
}`,$f=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Zf=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Kf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Jf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,jf=`#include <common>
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
}`,Qf=`#if DEPTH_PACKING == 3200
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
}`,tp=`#define DISTANCE
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
}`,ep=`#define DISTANCE
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
}`,np=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,ip=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sp=`uniform float scale;
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
}`,rp=`uniform vec3 diffuse;
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
}`,op=`#include <common>
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
}`,ap=`uniform vec3 diffuse;
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
}`,lp=`#define LAMBERT
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
}`,cp=`#define LAMBERT
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
}`,up=`#define MATCAP
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
}`,dp=`#define MATCAP
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
}`,hp=`#define NORMAL
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
}`,fp=`#define NORMAL
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
}`,pp=`#define PHONG
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
}`,mp=`#define PHONG
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
}`,gp=`#define STANDARD
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
}`,_p=`#define STANDARD
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
}`,vp=`#define TOON
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
}`,Mp=`#define TOON
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
}`,yp=`uniform float size;
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
}`,Sp=`uniform vec3 diffuse;
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
}`,xp=`#include <common>
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
}`,wp=`uniform vec3 color;
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
}`,Ep=`uniform float rotation;
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
}`,bp=`uniform vec3 diffuse;
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
}`,Wt={alphahash_fragment:qd,alphahash_pars_fragment:Yd,alphamap_fragment:$d,alphamap_pars_fragment:Zd,alphatest_fragment:Kd,alphatest_pars_fragment:Jd,aomap_fragment:jd,aomap_pars_fragment:Qd,batching_pars_vertex:th,batching_vertex:eh,begin_vertex:nh,beginnormal_vertex:ih,bsdfs:sh,iridescence_fragment:rh,bumpmap_pars_fragment:oh,clipping_planes_fragment:ah,clipping_planes_pars_fragment:lh,clipping_planes_pars_vertex:ch,clipping_planes_vertex:uh,color_fragment:dh,color_pars_fragment:hh,color_pars_vertex:fh,color_vertex:ph,common:mh,cube_uv_reflection_fragment:gh,defaultnormal_vertex:_h,displacementmap_pars_vertex:vh,displacementmap_vertex:Mh,emissivemap_fragment:yh,emissivemap_pars_fragment:Sh,colorspace_fragment:xh,colorspace_pars_fragment:wh,envmap_fragment:Eh,envmap_common_pars_fragment:bh,envmap_pars_fragment:Th,envmap_pars_vertex:Ah,envmap_physical_pars_fragment:zh,envmap_vertex:Ch,fog_vertex:Rh,fog_pars_vertex:Ph,fog_fragment:Lh,fog_pars_fragment:Dh,gradientmap_pars_fragment:Ih,lightmap_pars_fragment:Uh,lights_lambert_fragment:Nh,lights_lambert_pars_fragment:Fh,lights_pars_begin:Oh,lights_toon_fragment:Bh,lights_toon_pars_fragment:kh,lights_phong_fragment:Gh,lights_phong_pars_fragment:Hh,lights_physical_fragment:Vh,lights_physical_pars_fragment:Wh,lights_fragment_begin:Xh,lights_fragment_maps:qh,lights_fragment_end:Yh,logdepthbuf_fragment:$h,logdepthbuf_pars_fragment:Zh,logdepthbuf_pars_vertex:Kh,logdepthbuf_vertex:Jh,map_fragment:jh,map_pars_fragment:Qh,map_particle_fragment:tf,map_particle_pars_fragment:ef,metalnessmap_fragment:nf,metalnessmap_pars_fragment:sf,morphinstance_vertex:rf,morphcolor_vertex:of,morphnormal_vertex:af,morphtarget_pars_vertex:lf,morphtarget_vertex:cf,normal_fragment_begin:uf,normal_fragment_maps:df,normal_pars_fragment:hf,normal_pars_vertex:ff,normal_vertex:pf,normalmap_pars_fragment:mf,clearcoat_normal_fragment_begin:gf,clearcoat_normal_fragment_maps:_f,clearcoat_pars_fragment:vf,iridescence_pars_fragment:Mf,opaque_fragment:yf,packing:Sf,premultiplied_alpha_fragment:xf,project_vertex:wf,dithering_fragment:Ef,dithering_pars_fragment:bf,roughnessmap_fragment:Tf,roughnessmap_pars_fragment:Af,shadowmap_pars_fragment:Cf,shadowmap_pars_vertex:Rf,shadowmap_vertex:Pf,shadowmask_pars_fragment:Lf,skinbase_vertex:Df,skinning_pars_vertex:If,skinning_vertex:Uf,skinnormal_vertex:Nf,specularmap_fragment:Ff,specularmap_pars_fragment:Of,tonemapping_fragment:zf,tonemapping_pars_fragment:Bf,transmission_fragment:kf,transmission_pars_fragment:Gf,uv_pars_fragment:Hf,uv_pars_vertex:Vf,uv_vertex:Wf,worldpos_vertex:Xf,background_vert:qf,background_frag:Yf,backgroundCube_vert:$f,backgroundCube_frag:Zf,cube_vert:Kf,cube_frag:Jf,depth_vert:jf,depth_frag:Qf,distanceRGBA_vert:tp,distanceRGBA_frag:ep,equirect_vert:np,equirect_frag:ip,linedashed_vert:sp,linedashed_frag:rp,meshbasic_vert:op,meshbasic_frag:ap,meshlambert_vert:lp,meshlambert_frag:cp,meshmatcap_vert:up,meshmatcap_frag:dp,meshnormal_vert:hp,meshnormal_frag:fp,meshphong_vert:pp,meshphong_frag:mp,meshphysical_vert:gp,meshphysical_frag:_p,meshtoon_vert:vp,meshtoon_frag:Mp,points_vert:yp,points_frag:Sp,shadow_vert:xp,shadow_frag:wp,sprite_vert:Ep,sprite_frag:bp},pt={common:{diffuse:{value:new Nt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Vt},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Vt}},envmap:{envMap:{value:null},envMapRotation:{value:new Vt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Vt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Vt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Vt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Vt},normalScale:{value:new wt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Vt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Vt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Vt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Vt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Nt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Nt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0},uvTransform:{value:new Vt}},sprite:{diffuse:{value:new Nt(16777215)},opacity:{value:1},center:{value:new wt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Vt},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0}}},gn={basic:{uniforms:ke([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.fog]),vertexShader:Wt.meshbasic_vert,fragmentShader:Wt.meshbasic_frag},lambert:{uniforms:ke([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,pt.lights,{emissive:{value:new Nt(0)}}]),vertexShader:Wt.meshlambert_vert,fragmentShader:Wt.meshlambert_frag},phong:{uniforms:ke([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,pt.lights,{emissive:{value:new Nt(0)},specular:{value:new Nt(1118481)},shininess:{value:30}}]),vertexShader:Wt.meshphong_vert,fragmentShader:Wt.meshphong_frag},standard:{uniforms:ke([pt.common,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.roughnessmap,pt.metalnessmap,pt.fog,pt.lights,{emissive:{value:new Nt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Wt.meshphysical_vert,fragmentShader:Wt.meshphysical_frag},toon:{uniforms:ke([pt.common,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.gradientmap,pt.fog,pt.lights,{emissive:{value:new Nt(0)}}]),vertexShader:Wt.meshtoon_vert,fragmentShader:Wt.meshtoon_frag},matcap:{uniforms:ke([pt.common,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,{matcap:{value:null}}]),vertexShader:Wt.meshmatcap_vert,fragmentShader:Wt.meshmatcap_frag},points:{uniforms:ke([pt.points,pt.fog]),vertexShader:Wt.points_vert,fragmentShader:Wt.points_frag},dashed:{uniforms:ke([pt.common,pt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Wt.linedashed_vert,fragmentShader:Wt.linedashed_frag},depth:{uniforms:ke([pt.common,pt.displacementmap]),vertexShader:Wt.depth_vert,fragmentShader:Wt.depth_frag},normal:{uniforms:ke([pt.common,pt.bumpmap,pt.normalmap,pt.displacementmap,{opacity:{value:1}}]),vertexShader:Wt.meshnormal_vert,fragmentShader:Wt.meshnormal_frag},sprite:{uniforms:ke([pt.sprite,pt.fog]),vertexShader:Wt.sprite_vert,fragmentShader:Wt.sprite_frag},background:{uniforms:{uvTransform:{value:new Vt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Wt.background_vert,fragmentShader:Wt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Vt}},vertexShader:Wt.backgroundCube_vert,fragmentShader:Wt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Wt.cube_vert,fragmentShader:Wt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Wt.equirect_vert,fragmentShader:Wt.equirect_frag},distanceRGBA:{uniforms:ke([pt.common,pt.displacementmap,{referencePosition:{value:new b},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Wt.distanceRGBA_vert,fragmentShader:Wt.distanceRGBA_frag},shadow:{uniforms:ke([pt.lights,pt.fog,{color:{value:new Nt(0)},opacity:{value:1}}]),vertexShader:Wt.shadow_vert,fragmentShader:Wt.shadow_frag}};gn.physical={uniforms:ke([gn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Vt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Vt},clearcoatNormalScale:{value:new wt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Vt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Vt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Vt},sheen:{value:0},sheenColor:{value:new Nt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Vt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Vt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Vt},transmissionSamplerSize:{value:new wt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Vt},attenuationDistance:{value:0},attenuationColor:{value:new Nt(0)},specularColor:{value:new Nt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Vt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Vt},anisotropyVector:{value:new wt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Vt}}]),vertexShader:Wt.meshphysical_vert,fragmentShader:Wt.meshphysical_frag};const ar={r:0,b:0,g:0},ai=new fn,Tp=new ue;function Ap(n,t,e,i,s,r,o){const a=new Nt(0);let l=r===!0?0:1,c,d,u=null,h=0,f=null;function g(S){let x=S.isScene===!0?S.background:null;return x&&x.isTexture&&(x=(S.backgroundBlurriness>0?e:t).get(x)),x}function v(S){let x=!1;const _=g(S);_===null?p(a,l):_&&_.isColor&&(p(_,1),x=!0);const L=n.xr.getEnvironmentBlendMode();L==="additive"?i.buffers.color.setClear(0,0,0,1,o):L==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||x)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(S,x){const _=g(x);_&&(_.isCubeTexture||_.mapping===Nr)?(d===void 0&&(d=new U(new St(1,1,1),new Un({name:"BackgroundCubeMaterial",uniforms:os(gn.backgroundCube.uniforms),vertexShader:gn.backgroundCube.vertexShader,fragmentShader:gn.backgroundCube.fragmentShader,side:Oe,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(L,T,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(d)),ai.copy(x.backgroundRotation),ai.x*=-1,ai.y*=-1,ai.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(ai.y*=-1,ai.z*=-1),d.material.uniforms.envMap.value=_,d.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(Tp.makeRotationFromEuler(ai)),d.material.toneMapped=jt.getTransfer(_.colorSpace)!==le,(u!==_||h!==_.version||f!==n.toneMapping)&&(d.material.needsUpdate=!0,u=_,h=_.version,f=n.toneMapping),d.layers.enableAll(),S.unshift(d,d.geometry,d.material,0,0,null)):_&&_.isTexture&&(c===void 0&&(c=new U(new Zt(2,2),new Un({name:"BackgroundMaterial",uniforms:os(gn.background.uniforms),vertexShader:gn.background.vertexShader,fragmentShader:gn.background.fragmentShader,side:Qn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=_,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=jt.getTransfer(_.colorSpace)!==le,_.matrixAutoUpdate===!0&&_.updateMatrix(),c.material.uniforms.uvTransform.value.copy(_.matrix),(u!==_||h!==_.version||f!==n.toneMapping)&&(c.material.needsUpdate=!0,u=_,h=_.version,f=n.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null))}function p(S,x){S.getRGB(ar,Uc(n)),i.buffers.color.setClear(ar.r,ar.g,ar.b,x,o)}return{getClearColor:function(){return a},setClearColor:function(S,x=1){a.set(S),l=x,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(S){l=S,p(a,l)},render:v,addToRenderList:m}}function Cp(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=h(null);let r=s,o=!1;function a(y,C,I,G,J){let et=!1;const K=u(G,I,C);r!==K&&(r=K,c(r.object)),et=f(y,G,I,J),et&&g(y,G,I,J),J!==null&&t.update(J,n.ELEMENT_ARRAY_BUFFER),(et||o)&&(o=!1,_(y,C,I,G),J!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(J).buffer))}function l(){return n.createVertexArray()}function c(y){return n.bindVertexArray(y)}function d(y){return n.deleteVertexArray(y)}function u(y,C,I){const G=I.wireframe===!0;let J=i[y.id];J===void 0&&(J={},i[y.id]=J);let et=J[C.id];et===void 0&&(et={},J[C.id]=et);let K=et[G];return K===void 0&&(K=h(l()),et[G]=K),K}function h(y){const C=[],I=[],G=[];for(let J=0;J<e;J++)C[J]=0,I[J]=0,G[J]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:I,attributeDivisors:G,object:y,attributes:{},index:null}}function f(y,C,I,G){const J=r.attributes,et=C.attributes;let K=0;const st=I.getAttributes();for(const $ in st)if(st[$].location>=0){const ft=J[$];let Pt=et[$];if(Pt===void 0&&($==="instanceMatrix"&&y.instanceMatrix&&(Pt=y.instanceMatrix),$==="instanceColor"&&y.instanceColor&&(Pt=y.instanceColor)),ft===void 0||ft.attribute!==Pt||Pt&&ft.data!==Pt.data)return!0;K++}return r.attributesNum!==K||r.index!==G}function g(y,C,I,G){const J={},et=C.attributes;let K=0;const st=I.getAttributes();for(const $ in st)if(st[$].location>=0){let ft=et[$];ft===void 0&&($==="instanceMatrix"&&y.instanceMatrix&&(ft=y.instanceMatrix),$==="instanceColor"&&y.instanceColor&&(ft=y.instanceColor));const Pt={};Pt.attribute=ft,ft&&ft.data&&(Pt.data=ft.data),J[$]=Pt,K++}r.attributes=J,r.attributesNum=K,r.index=G}function v(){const y=r.newAttributes;for(let C=0,I=y.length;C<I;C++)y[C]=0}function m(y){p(y,0)}function p(y,C){const I=r.newAttributes,G=r.enabledAttributes,J=r.attributeDivisors;I[y]=1,G[y]===0&&(n.enableVertexAttribArray(y),G[y]=1),J[y]!==C&&(n.vertexAttribDivisor(y,C),J[y]=C)}function S(){const y=r.newAttributes,C=r.enabledAttributes;for(let I=0,G=C.length;I<G;I++)C[I]!==y[I]&&(n.disableVertexAttribArray(I),C[I]=0)}function x(y,C,I,G,J,et,K){K===!0?n.vertexAttribIPointer(y,C,I,J,et):n.vertexAttribPointer(y,C,I,G,J,et)}function _(y,C,I,G){v();const J=G.attributes,et=I.getAttributes(),K=C.defaultAttributeValues;for(const st in et){const $=et[st];if($.location>=0){let ht=J[st];if(ht===void 0&&(st==="instanceMatrix"&&y.instanceMatrix&&(ht=y.instanceMatrix),st==="instanceColor"&&y.instanceColor&&(ht=y.instanceColor)),ht!==void 0){const ft=ht.normalized,Pt=ht.itemSize,Gt=t.get(ht);if(Gt===void 0)continue;const ee=Gt.buffer,Q=Gt.type,dt=Gt.bytesPerElement,Et=Q===n.INT||Q===n.UNSIGNED_INT||ht.gpuType===Ta;if(ht.isInterleavedBufferAttribute){const mt=ht.data,Ut=mt.stride,zt=ht.offset;if(mt.isInstancedInterleavedBuffer){for(let qt=0;qt<$.locationSize;qt++)p($.location+qt,mt.meshPerAttribute);y.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=mt.meshPerAttribute*mt.count)}else for(let qt=0;qt<$.locationSize;qt++)m($.location+qt);n.bindBuffer(n.ARRAY_BUFFER,ee);for(let qt=0;qt<$.locationSize;qt++)x($.location+qt,Pt/$.locationSize,Q,ft,Ut*dt,(zt+Pt/$.locationSize*qt)*dt,Et)}else{if(ht.isInstancedBufferAttribute){for(let mt=0;mt<$.locationSize;mt++)p($.location+mt,ht.meshPerAttribute);y.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=ht.meshPerAttribute*ht.count)}else for(let mt=0;mt<$.locationSize;mt++)m($.location+mt);n.bindBuffer(n.ARRAY_BUFFER,ee);for(let mt=0;mt<$.locationSize;mt++)x($.location+mt,Pt/$.locationSize,Q,ft,Pt*dt,Pt/$.locationSize*mt*dt,Et)}}else if(K!==void 0){const ft=K[st];if(ft!==void 0)switch(ft.length){case 2:n.vertexAttrib2fv($.location,ft);break;case 3:n.vertexAttrib3fv($.location,ft);break;case 4:n.vertexAttrib4fv($.location,ft);break;default:n.vertexAttrib1fv($.location,ft)}}}}S()}function L(){P();for(const y in i){const C=i[y];for(const I in C){const G=C[I];for(const J in G)d(G[J].object),delete G[J];delete C[I]}delete i[y]}}function T(y){if(i[y.id]===void 0)return;const C=i[y.id];for(const I in C){const G=C[I];for(const J in G)d(G[J].object),delete G[J];delete C[I]}delete i[y.id]}function R(y){for(const C in i){const I=i[C];if(I[y.id]===void 0)continue;const G=I[y.id];for(const J in G)d(G[J].object),delete G[J];delete I[y.id]}}function P(){M(),o=!0,r!==s&&(r=s,c(r.object))}function M(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:P,resetDefaultState:M,dispose:L,releaseStatesOfGeometry:T,releaseStatesOfProgram:R,initAttributes:v,enableAttribute:m,disableUnusedAttributes:S}}function Rp(n,t,e){let i;function s(c){i=c}function r(c,d){n.drawArrays(i,c,d),e.update(d,i,1)}function o(c,d,u){u!==0&&(n.drawArraysInstanced(i,c,d,u),e.update(d,i,u))}function a(c,d,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,d,0,u);let f=0;for(let g=0;g<u;g++)f+=d[g];e.update(f,i,1)}function l(c,d,u,h){if(u===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)o(c[g],d[g],h[g]);else{f.multiDrawArraysInstancedWEBGL(i,c,0,d,0,h,0,u);let g=0;for(let v=0;v<u;v++)g+=d[v]*h[v];e.update(g,i,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Pp(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const R=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(R){return!(R!==dn&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(R){const P=R===Os&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(R!==In&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==Cn&&!P)}function l(R){if(R==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const d=l(c);d!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);const u=e.logarithmicDepthBuffer===!0,h=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),S=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),x=n.getParameter(n.MAX_VARYING_VECTORS),_=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),L=g>0,T=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:h,maxTextures:f,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:S,maxVaryings:x,maxFragmentUniforms:_,vertexTextures:L,maxSamples:T}}function Lp(n){const t=this;let e=null,i=0,s=!1,r=!1;const o=new fi,a=new Vt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,h){const f=u.length!==0||h||i!==0||s;return s=h,i=u.length,f},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,h){e=d(u,h,0)},this.setState=function(u,h,f){const g=u.clippingPlanes,v=u.clipIntersection,m=u.clipShadows,p=n.get(u);if(!s||g===null||g.length===0||r&&!m)r?d(null):c();else{const S=r?0:i,x=S*4;let _=p.clippingState||null;l.value=_,_=d(g,h,x,f);for(let L=0;L!==x;++L)_[L]=e[L];p.clippingState=_,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function d(u,h,f,g){const v=u!==null?u.length:0;let m=null;if(v!==0){if(m=l.value,g!==!0||m===null){const p=f+v*4,S=h.matrixWorldInverse;a.getNormalMatrix(S),(m===null||m.length<p)&&(m=new Float32Array(p));for(let x=0,_=f;x!==v;++x,_+=4)o.copy(u[x]).applyMatrix4(S,a),o.normal.toArray(m,_),m[_+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,m}}function Dp(n){let t=new WeakMap;function e(o,a){return a===Ho?o.mapping=ns:a===Vo&&(o.mapping=is),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===Ho||a===Vo)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Hd(l.height);return c.fromEquirectangularTexture(n,o),t.set(o,c),o.addEventListener("dispose",s),e(c.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:i,dispose:r}}class zc extends Nc{constructor(t=-1,e=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-t,o=i+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=d*this.view.offsetY,l=a-d*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Ki=4,bl=[.125,.215,.35,.446,.526,.582],gi=20,co=new zc,Tl=new Nt;let uo=null,ho=0,fo=0,po=!1;const pi=(1+Math.sqrt(5))/2,Vi=1/pi,Al=[new b(-pi,Vi,0),new b(pi,Vi,0),new b(-Vi,0,pi),new b(Vi,0,pi),new b(0,pi,-Vi),new b(0,pi,Vi),new b(-1,1,-1),new b(1,1,-1),new b(-1,1,1),new b(1,1,1)];class Cl{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,s=100){uo=this._renderer.getRenderTarget(),ho=this._renderer.getActiveCubeFace(),fo=this._renderer.getActiveMipmapLevel(),po=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,i,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ll(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Pl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(uo,ho,fo),this._renderer.xr.enabled=po,t.scissorTest=!1,lr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===ns||t.mapping===is?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),uo=this._renderer.getRenderTarget(),ho=this._renderer.getActiveCubeFace(),fo=this._renderer.getActiveMipmapLevel(),po=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:_n,minFilter:_n,generateMipmaps:!1,type:Os,format:dn,colorSpace:as,depthBuffer:!1},s=Rl(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Rl(t,e,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Ip(r)),this._blurMaterial=Up(r,t,e)}return s}_compileMaterial(t){const e=new U(this._lodPlanes[0],t);this._renderer.compile(e,co)}_sceneToCubeUV(t,e,i,s){const a=new he(90,1,e,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,h=d.toneMapping;d.getClearColor(Tl),d.toneMapping=jn,d.autoClear=!1;const f=new Ve({name:"PMREM.Background",side:Oe,depthWrite:!1,depthTest:!1}),g=new U(new St,f);let v=!1;const m=t.background;m?m.isColor&&(f.color.copy(m),t.background=null,v=!0):(f.color.copy(Tl),v=!0);for(let p=0;p<6;p++){const S=p%3;S===0?(a.up.set(0,l[p],0),a.lookAt(c[p],0,0)):S===1?(a.up.set(0,0,l[p]),a.lookAt(0,c[p],0)):(a.up.set(0,l[p],0),a.lookAt(0,0,c[p]));const x=this._cubeSize;lr(s,S*x,p>2?x:0,x,x),d.setRenderTarget(s),v&&d.render(g,a),d.render(t,a)}g.geometry.dispose(),g.material.dispose(),d.toneMapping=h,d.autoClear=u,t.background=m}_textureToCubeUV(t,e){const i=this._renderer,s=t.mapping===ns||t.mapping===is;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ll()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Pl());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new U(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const l=this._cubeSize;lr(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(o,co)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Al[(s-r-1)%Al.length];this._blur(t,r-1,r,o,a)}e.autoClear=i}_blur(t,e,i,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,i,s,"latitudinal",r),this._halfBlur(o,t,i,i,s,"longitudinal",r)}_halfBlur(t,e,i,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const d=3,u=new U(this._lodPlanes[s],c),h=c.uniforms,f=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*gi-1),v=r/g,m=isFinite(r)?1+Math.floor(d*v):gi;m>gi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${gi}`);const p=[];let S=0;for(let R=0;R<gi;++R){const P=R/v,M=Math.exp(-P*P/2);p.push(M),R===0?S+=M:R<m&&(S+=2*M)}for(let R=0;R<p.length;R++)p[R]=p[R]/S;h.envMap.value=t.texture,h.samples.value=m,h.weights.value=p,h.latitudinal.value=o==="latitudinal",a&&(h.poleAxis.value=a);const{_lodMax:x}=this;h.dTheta.value=g,h.mipInt.value=x-i;const _=this._sizeLods[s],L=3*_*(s>x-Ki?s-x+Ki:0),T=4*(this._cubeSize-_);lr(e,L,T,3*_,2*_),l.setRenderTarget(e),l.render(u,co)}}function Ip(n){const t=[],e=[],i=[];let s=n;const r=n-Ki+1+bl.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let l=1/a;o>n-Ki?l=bl[o-n+Ki-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),d=-c,u=1+c,h=[d,d,u,d,u,u,d,d,u,u,d,u],f=6,g=6,v=3,m=2,p=1,S=new Float32Array(v*g*f),x=new Float32Array(m*g*f),_=new Float32Array(p*g*f);for(let T=0;T<f;T++){const R=T%3*2/3-1,P=T>2?0:-1,M=[R,P,0,R+2/3,P,0,R+2/3,P+1,0,R,P,0,R+2/3,P+1,0,R,P+1,0];S.set(M,v*g*T),x.set(h,m*g*T);const y=[T,T,T,T,T,T];_.set(y,p*g*T)}const L=new xe;L.setAttribute("position",new De(S,v)),L.setAttribute("uv",new De(x,m)),L.setAttribute("faceIndex",new De(_,p)),t.push(L),s>Ki&&s--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function Rl(n,t,e){const i=new Si(n,t,e);return i.texture.mapping=Nr,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function lr(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function Up(n,t,e){const i=new Float32Array(gi),s=new b(0,1,0);return new Un({name:"SphericalGaussianBlur",defines:{n:gi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Fa(),fragmentShader:`

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
		`,blending:Jn,depthTest:!1,depthWrite:!1})}function Pl(){return new Un({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Fa(),fragmentShader:`

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
		`,blending:Jn,depthTest:!1,depthWrite:!1})}function Ll(){return new Un({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Fa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Jn,depthTest:!1,depthWrite:!1})}function Fa(){return`

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
	`}function Np(n){let t=new WeakMap,e=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===Ho||l===Vo,d=l===ns||l===is;if(c||d){let u=t.get(a);const h=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==h)return e===null&&(e=new Cl(n)),u=c?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{const f=a.image;return c&&f&&f.height>0||d&&f&&s(f)?(e===null&&(e=new Cl(n)),u=c?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let l=0;const c=6;for(let d=0;d<c;d++)a[d]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:o}}function Fp(n){const t={};function e(i){if(t[i]!==void 0)return t[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const s=e(i);return s===null&&Es("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function Op(n,t,e,i){const s={},r=new WeakMap;function o(u){const h=u.target;h.index!==null&&t.remove(h.index);for(const g in h.attributes)t.remove(h.attributes[g]);for(const g in h.morphAttributes){const v=h.morphAttributes[g];for(let m=0,p=v.length;m<p;m++)t.remove(v[m])}h.removeEventListener("dispose",o),delete s[h.id];const f=r.get(h);f&&(t.remove(f),r.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,e.memory.geometries--}function a(u,h){return s[h.id]===!0||(h.addEventListener("dispose",o),s[h.id]=!0,e.memory.geometries++),h}function l(u){const h=u.attributes;for(const g in h)t.update(h[g],n.ARRAY_BUFFER);const f=u.morphAttributes;for(const g in f){const v=f[g];for(let m=0,p=v.length;m<p;m++)t.update(v[m],n.ARRAY_BUFFER)}}function c(u){const h=[],f=u.index,g=u.attributes.position;let v=0;if(f!==null){const S=f.array;v=f.version;for(let x=0,_=S.length;x<_;x+=3){const L=S[x+0],T=S[x+1],R=S[x+2];h.push(L,T,T,R,R,L)}}else if(g!==void 0){const S=g.array;v=g.version;for(let x=0,_=S.length/3-1;x<_;x+=3){const L=x+0,T=x+1,R=x+2;h.push(L,T,T,R,R,L)}}else return;const m=new(Cc(h)?Ic:Dc)(h,1);m.version=v;const p=r.get(u);p&&t.remove(p),r.set(u,m)}function d(u){const h=r.get(u);if(h){const f=u.index;f!==null&&h.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:d}}function zp(n,t,e){let i;function s(h){i=h}let r,o;function a(h){r=h.type,o=h.bytesPerElement}function l(h,f){n.drawElements(i,f,r,h*o),e.update(f,i,1)}function c(h,f,g){g!==0&&(n.drawElementsInstanced(i,f,r,h*o,g),e.update(f,i,g))}function d(h,f,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,r,h,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];e.update(m,i,1)}function u(h,f,g,v){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<h.length;p++)c(h[p]/o,f[p],v[p]);else{m.multiDrawElementsInstancedWEBGL(i,f,0,r,h,0,v,0,g);let p=0;for(let S=0;S<g;S++)p+=f[S]*v[S];e.update(p,i,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=d,this.renderMultiDrawInstances=u}function Bp(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(e.calls++,o){case n.TRIANGLES:e.triangles+=a*(r/3);break;case n.LINES:e.lines+=a*(r/2);break;case n.LINE_STRIP:e.lines+=a*(r-1);break;case n.LINE_LOOP:e.lines+=a*r;break;case n.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function kp(n,t,e){const i=new WeakMap,s=new ce;function r(o,a,l){const c=o.morphTargetInfluences,d=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=d!==void 0?d.length:0;let h=i.get(a);if(h===void 0||h.count!==u){let y=function(){P.dispose(),i.delete(a),a.removeEventListener("dispose",y)};var f=y;h!==void 0&&h.texture.dispose();const g=a.morphAttributes.position!==void 0,v=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],S=a.morphAttributes.normal||[],x=a.morphAttributes.color||[];let _=0;g===!0&&(_=1),v===!0&&(_=2),m===!0&&(_=3);let L=a.attributes.position.count*_,T=1;L>t.maxTextureSize&&(T=Math.ceil(L/t.maxTextureSize),L=t.maxTextureSize);const R=new Float32Array(L*T*4*u),P=new Pc(R,L,T,u);P.type=Cn,P.needsUpdate=!0;const M=_*4;for(let C=0;C<u;C++){const I=p[C],G=S[C],J=x[C],et=L*T*4*C;for(let K=0;K<I.count;K++){const st=K*M;g===!0&&(s.fromBufferAttribute(I,K),R[et+st+0]=s.x,R[et+st+1]=s.y,R[et+st+2]=s.z,R[et+st+3]=0),v===!0&&(s.fromBufferAttribute(G,K),R[et+st+4]=s.x,R[et+st+5]=s.y,R[et+st+6]=s.z,R[et+st+7]=0),m===!0&&(s.fromBufferAttribute(J,K),R[et+st+8]=s.x,R[et+st+9]=s.y,R[et+st+10]=s.z,R[et+st+11]=J.itemSize===4?s.w:1)}}h={count:u,texture:P,size:new wt(L,T)},i.set(a,h),a.addEventListener("dispose",y)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,e);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const v=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(n,"morphTargetBaseInfluence",v),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",h.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:r}}function Gp(n,t,e,i){let s=new WeakMap;function r(l){const c=i.render.frame,d=l.geometry,u=t.get(l,d);if(s.get(u)!==c&&(t.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const h=l.skeleton;s.get(h)!==c&&(h.update(),s.set(h,c))}return u}function o(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}class Bc extends Ge{constructor(t,e,i,s,r,o,a,l,c,d=Ji){if(d!==Ji&&d!==rs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&d===Ji&&(i=yi),i===void 0&&d===rs&&(i=ss),super(null,s,r,o,a,l,d,i,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:hn,this.minFilter=l!==void 0?l:hn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const kc=new Ge,Dl=new Bc(1,1),Gc=new Pc,Hc=new Td,Vc=new Fc,Il=[],Ul=[],Nl=new Float32Array(16),Fl=new Float32Array(9),Ol=new Float32Array(4);function cs(n,t,e){const i=n[0];if(i<=0||i>0)return n;const s=t*e;let r=Il[s];if(r===void 0&&(r=new Float32Array(s),Il[s]=r),t!==0){i.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,n[o].toArray(r,a)}return r}function Re(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function Pe(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function zr(n,t){let e=Ul[t];e===void 0&&(e=new Int32Array(t),Ul[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function Hp(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function Vp(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Re(e,t))return;n.uniform2fv(this.addr,t),Pe(e,t)}}function Wp(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Re(e,t))return;n.uniform3fv(this.addr,t),Pe(e,t)}}function Xp(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Re(e,t))return;n.uniform4fv(this.addr,t),Pe(e,t)}}function qp(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Re(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),Pe(e,t)}else{if(Re(e,i))return;Ol.set(i),n.uniformMatrix2fv(this.addr,!1,Ol),Pe(e,i)}}function Yp(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Re(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),Pe(e,t)}else{if(Re(e,i))return;Fl.set(i),n.uniformMatrix3fv(this.addr,!1,Fl),Pe(e,i)}}function $p(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Re(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),Pe(e,t)}else{if(Re(e,i))return;Nl.set(i),n.uniformMatrix4fv(this.addr,!1,Nl),Pe(e,i)}}function Zp(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function Kp(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Re(e,t))return;n.uniform2iv(this.addr,t),Pe(e,t)}}function Jp(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Re(e,t))return;n.uniform3iv(this.addr,t),Pe(e,t)}}function jp(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Re(e,t))return;n.uniform4iv(this.addr,t),Pe(e,t)}}function Qp(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function t0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Re(e,t))return;n.uniform2uiv(this.addr,t),Pe(e,t)}}function e0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Re(e,t))return;n.uniform3uiv(this.addr,t),Pe(e,t)}}function n0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Re(e,t))return;n.uniform4uiv(this.addr,t),Pe(e,t)}}function i0(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Dl.compareFunction=Ac,r=Dl):r=kc,e.setTexture2D(t||r,s)}function s0(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||Hc,s)}function r0(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||Vc,s)}function o0(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||Gc,s)}function a0(n){switch(n){case 5126:return Hp;case 35664:return Vp;case 35665:return Wp;case 35666:return Xp;case 35674:return qp;case 35675:return Yp;case 35676:return $p;case 5124:case 35670:return Zp;case 35667:case 35671:return Kp;case 35668:case 35672:return Jp;case 35669:case 35673:return jp;case 5125:return Qp;case 36294:return t0;case 36295:return e0;case 36296:return n0;case 35678:case 36198:case 36298:case 36306:case 35682:return i0;case 35679:case 36299:case 36307:return s0;case 35680:case 36300:case 36308:case 36293:return r0;case 36289:case 36303:case 36311:case 36292:return o0}}function l0(n,t){n.uniform1fv(this.addr,t)}function c0(n,t){const e=cs(t,this.size,2);n.uniform2fv(this.addr,e)}function u0(n,t){const e=cs(t,this.size,3);n.uniform3fv(this.addr,e)}function d0(n,t){const e=cs(t,this.size,4);n.uniform4fv(this.addr,e)}function h0(n,t){const e=cs(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function f0(n,t){const e=cs(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function p0(n,t){const e=cs(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function m0(n,t){n.uniform1iv(this.addr,t)}function g0(n,t){n.uniform2iv(this.addr,t)}function _0(n,t){n.uniform3iv(this.addr,t)}function v0(n,t){n.uniform4iv(this.addr,t)}function M0(n,t){n.uniform1uiv(this.addr,t)}function y0(n,t){n.uniform2uiv(this.addr,t)}function S0(n,t){n.uniform3uiv(this.addr,t)}function x0(n,t){n.uniform4uiv(this.addr,t)}function w0(n,t,e){const i=this.cache,s=t.length,r=zr(e,s);Re(i,r)||(n.uniform1iv(this.addr,r),Pe(i,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||kc,r[o])}function E0(n,t,e){const i=this.cache,s=t.length,r=zr(e,s);Re(i,r)||(n.uniform1iv(this.addr,r),Pe(i,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||Hc,r[o])}function b0(n,t,e){const i=this.cache,s=t.length,r=zr(e,s);Re(i,r)||(n.uniform1iv(this.addr,r),Pe(i,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||Vc,r[o])}function T0(n,t,e){const i=this.cache,s=t.length,r=zr(e,s);Re(i,r)||(n.uniform1iv(this.addr,r),Pe(i,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Gc,r[o])}function A0(n){switch(n){case 5126:return l0;case 35664:return c0;case 35665:return u0;case 35666:return d0;case 35674:return h0;case 35675:return f0;case 35676:return p0;case 5124:case 35670:return m0;case 35667:case 35671:return g0;case 35668:case 35672:return _0;case 35669:case 35673:return v0;case 5125:return M0;case 36294:return y0;case 36295:return S0;case 36296:return x0;case 35678:case 36198:case 36298:case 36306:case 35682:return w0;case 35679:case 36299:case 36307:return E0;case 35680:case 36300:case 36308:case 36293:return b0;case 36289:case 36303:case 36311:case 36292:return T0}}class C0{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=a0(e.type)}}class R0{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=A0(e.type)}}class P0{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],i)}}}const mo=/(\w+)(\])?(\[|\.)?/g;function zl(n,t){n.seq.push(t),n.map[t.id]=t}function L0(n,t,e){const i=n.name,s=i.length;for(mo.lastIndex=0;;){const r=mo.exec(i),o=mo.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){zl(e,c===void 0?new C0(a,n,t):new R0(a,n,t));break}else{let u=e.map[a];u===void 0&&(u=new P0(a),zl(e,u)),e=u}}}class wr{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);L0(r,o,this)}}setValue(t,e,i,s){const r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){const s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],l=i[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){const i=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&i.push(o)}return i}}function Bl(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const D0=37297;let I0=0;function U0(n,t){const e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;i.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return i.join(`
`)}const kl=new Vt;function N0(n){jt._getMatrix(kl,jt.workingColorSpace,n);const t=`mat3( ${kl.elements.map(e=>e.toFixed(4))} )`;switch(jt.getTransfer(n)){case Fr:return[t,"LinearTransferOETF"];case le:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function Gl(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),s=n.getShaderInfoLog(t).trim();if(i&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+U0(n.getShaderSource(t),o)}else return s}function F0(n,t){const e=N0(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function O0(n,t){let e;switch(t){case Bu:e="Linear";break;case ku:e="Reinhard";break;case Gu:e="Cineon";break;case Ur:e="ACESFilmic";break;case Vu:e="AgX";break;case Wu:e="Neutral";break;case Hu:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const cr=new b;function z0(){jt.getLuminanceCoefficients(cr);const n=cr.x.toFixed(4),t=cr.y.toFixed(4),e=cr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function B0(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(bs).join(`
`)}function k0(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function G0(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(t,s),o=r.name;let a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:n.getAttribLocation(t,o),locationSize:a}}return e}function bs(n){return n!==""}function Hl(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Vl(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const H0=/^[ \t]*#include +<([\w\d./]+)>/gm;function va(n){return n.replace(H0,W0)}const V0=new Map;function W0(n,t){let e=Wt[t];if(e===void 0){const i=V0.get(t);if(i!==void 0)e=Wt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return va(e)}const X0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Wl(n){return n.replace(X0,q0)}function q0(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Xl(n){let t=`precision ${n.precision} float;
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
#define LOW_PRECISION`),t}function Y0(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===mc?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===Ir?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===bn&&(t="SHADOWMAP_TYPE_VSM"),t}function $0(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case ns:case is:t="ENVMAP_TYPE_CUBE";break;case Nr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Z0(n){let t="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case is:t="ENVMAP_MODE_REFRACTION";break}return t}function K0(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case ba:t="ENVMAP_BLENDING_MULTIPLY";break;case Ou:t="ENVMAP_BLENDING_MIX";break;case zu:t="ENVMAP_BLENDING_ADD";break}return t}function J0(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:i,maxMip:e}}function j0(n,t,e,i){const s=n.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=Y0(e),c=$0(e),d=Z0(e),u=K0(e),h=J0(e),f=B0(e),g=k0(r),v=s.createProgram();let m,p,S=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(bs).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(bs).join(`
`),p.length>0&&(p+=`
`)):(m=[Xl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+d:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(bs).join(`
`),p=[Xl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+d:"",e.envMap?"#define "+u:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==jn?"#define TONE_MAPPING":"",e.toneMapping!==jn?Wt.tonemapping_pars_fragment:"",e.toneMapping!==jn?O0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Wt.colorspace_pars_fragment,F0("linearToOutputTexel",e.outputColorSpace),z0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(bs).join(`
`)),o=va(o),o=Hl(o,e),o=Vl(o,e),a=va(a),a=Hl(a,e),a=Vl(a,e),o=Wl(o),a=Wl(a),e.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===il?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===il?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const x=S+m+o,_=S+p+a,L=Bl(s,s.VERTEX_SHADER,x),T=Bl(s,s.FRAGMENT_SHADER,_);s.attachShader(v,L),s.attachShader(v,T),e.index0AttributeName!==void 0?s.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function R(C){if(n.debug.checkShaderErrors){const I=s.getProgramInfoLog(v).trim(),G=s.getShaderInfoLog(L).trim(),J=s.getShaderInfoLog(T).trim();let et=!0,K=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(et=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,v,L,T);else{const st=Gl(s,L,"vertex"),$=Gl(s,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+I+`
`+st+`
`+$)}else I!==""?console.warn("THREE.WebGLProgram: Program Info Log:",I):(G===""||J==="")&&(K=!1);K&&(C.diagnostics={runnable:et,programLog:I,vertexShader:{log:G,prefix:m},fragmentShader:{log:J,prefix:p}})}s.deleteShader(L),s.deleteShader(T),P=new wr(s,v),M=G0(s,v)}let P;this.getUniforms=function(){return P===void 0&&R(this),P};let M;this.getAttributes=function(){return M===void 0&&R(this),M};let y=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=s.getProgramParameter(v,D0)),y},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=I0++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=L,this.fragmentShader=T,this}let Q0=0;class tm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(i),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new em(t),e.set(t,i)),i}}class em{constructor(t){this.id=Q0++,this.code=t,this.usedTimes=0}}function nm(n,t,e,i,s,r,o){const a=new Ua,l=new tm,c=new Set,d=[],u=s.logarithmicDepthBuffer,h=s.vertexTextures;let f=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(M){return c.add(M),M===0?"uv":`uv${M}`}function m(M,y,C,I,G){const J=I.fog,et=G.geometry,K=M.isMeshStandardMaterial?I.environment:null,st=(M.isMeshStandardMaterial?e:t).get(M.envMap||K),$=st&&st.mapping===Nr?st.image.height:null,ht=g[M.type];M.precision!==null&&(f=s.getMaxPrecision(M.precision),f!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",f,"instead."));const ft=et.morphAttributes.position||et.morphAttributes.normal||et.morphAttributes.color,Pt=ft!==void 0?ft.length:0;let Gt=0;et.morphAttributes.position!==void 0&&(Gt=1),et.morphAttributes.normal!==void 0&&(Gt=2),et.morphAttributes.color!==void 0&&(Gt=3);let ee,Q,dt,Et;if(ht){const yt=gn[ht];ee=yt.vertexShader,Q=yt.fragmentShader}else ee=M.vertexShader,Q=M.fragmentShader,l.update(M),dt=l.getVertexShaderID(M),Et=l.getFragmentShaderID(M);const mt=n.getRenderTarget(),Ut=n.state.buffers.depth.getReversed(),zt=G.isInstancedMesh===!0,qt=G.isBatchedMesh===!0,se=!!M.map,Kt=!!M.matcap,ve=!!st,z=!!M.aoMap,ze=!!M.lightMap,Yt=!!M.bumpMap,$t=!!M.normalMap,Dt=!!M.displacementMap,oe=!!M.emissiveMap,It=!!M.metalnessMap,A=!!M.roughnessMap,w=M.anisotropy>0,W=M.clearcoat>0,it=M.dispersion>0,rt=M.iridescence>0,tt=M.sheen>0,Tt=M.transmission>0,gt=w&&!!M.anisotropyMap,xt=W&&!!M.clearcoatMap,Jt=W&&!!M.clearcoatNormalMap,at=W&&!!M.clearcoatRoughnessMap,N=rt&&!!M.iridescenceMap,k=rt&&!!M.iridescenceThicknessMap,V=tt&&!!M.sheenColorMap,H=tt&&!!M.sheenRoughnessMap,Z=!!M.specularMap,ot=!!M.specularColorMap,lt=!!M.specularIntensityMap,D=Tt&&!!M.transmissionMap,ct=Tt&&!!M.thicknessMap,Y=!!M.gradientMap,nt=!!M.alphaMap,vt=M.alphaTest>0,_t=!!M.alphaHash,Bt=!!M.extensions;let Me=jn;M.toneMapped&&(mt===null||mt.isXRRenderTarget===!0)&&(Me=n.toneMapping);const F={shaderID:ht,shaderType:M.type,shaderName:M.name,vertexShader:ee,fragmentShader:Q,defines:M.defines,customVertexShaderID:dt,customFragmentShaderID:Et,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:f,batching:qt,batchingColor:qt&&G._colorsTexture!==null,instancing:zt,instancingColor:zt&&G.instanceColor!==null,instancingMorph:zt&&G.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:mt===null?n.outputColorSpace:mt.isXRRenderTarget===!0?mt.texture.colorSpace:as,alphaToCoverage:!!M.alphaToCoverage,map:se,matcap:Kt,envMap:ve,envMapMode:ve&&st.mapping,envMapCubeUVHeight:$,aoMap:z,lightMap:ze,bumpMap:Yt,normalMap:$t,displacementMap:h&&Dt,emissiveMap:oe,normalMapObjectSpace:$t&&M.normalMapType===$u,normalMapTangentSpace:$t&&M.normalMapType===Da,metalnessMap:It,roughnessMap:A,anisotropy:w,anisotropyMap:gt,clearcoat:W,clearcoatMap:xt,clearcoatNormalMap:Jt,clearcoatRoughnessMap:at,dispersion:it,iridescence:rt,iridescenceMap:N,iridescenceThicknessMap:k,sheen:tt,sheenColorMap:V,sheenRoughnessMap:H,specularMap:Z,specularColorMap:ot,specularIntensityMap:lt,transmission:Tt,transmissionMap:D,thicknessMap:ct,gradientMap:Y,opaque:M.transparent===!1&&M.blending===Mi&&M.alphaToCoverage===!1,alphaMap:nt,alphaTest:vt,alphaHash:_t,combine:M.combine,mapUv:se&&v(M.map.channel),aoMapUv:z&&v(M.aoMap.channel),lightMapUv:ze&&v(M.lightMap.channel),bumpMapUv:Yt&&v(M.bumpMap.channel),normalMapUv:$t&&v(M.normalMap.channel),displacementMapUv:Dt&&v(M.displacementMap.channel),emissiveMapUv:oe&&v(M.emissiveMap.channel),metalnessMapUv:It&&v(M.metalnessMap.channel),roughnessMapUv:A&&v(M.roughnessMap.channel),anisotropyMapUv:gt&&v(M.anisotropyMap.channel),clearcoatMapUv:xt&&v(M.clearcoatMap.channel),clearcoatNormalMapUv:Jt&&v(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:at&&v(M.clearcoatRoughnessMap.channel),iridescenceMapUv:N&&v(M.iridescenceMap.channel),iridescenceThicknessMapUv:k&&v(M.iridescenceThicknessMap.channel),sheenColorMapUv:V&&v(M.sheenColorMap.channel),sheenRoughnessMapUv:H&&v(M.sheenRoughnessMap.channel),specularMapUv:Z&&v(M.specularMap.channel),specularColorMapUv:ot&&v(M.specularColorMap.channel),specularIntensityMapUv:lt&&v(M.specularIntensityMap.channel),transmissionMapUv:D&&v(M.transmissionMap.channel),thicknessMapUv:ct&&v(M.thicknessMap.channel),alphaMapUv:nt&&v(M.alphaMap.channel),vertexTangents:!!et.attributes.tangent&&($t||w),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!et.attributes.color&&et.attributes.color.itemSize===4,pointsUvs:G.isPoints===!0&&!!et.attributes.uv&&(se||nt),fog:!!J,useFog:M.fog===!0,fogExp2:!!J&&J.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Ut,skinning:G.isSkinnedMesh===!0,morphTargets:et.morphAttributes.position!==void 0,morphNormals:et.morphAttributes.normal!==void 0,morphColors:et.morphAttributes.color!==void 0,morphTargetsCount:Pt,morphTextureStride:Gt,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:M.dithering,shadowMapEnabled:n.shadowMap.enabled&&C.length>0,shadowMapType:n.shadowMap.type,toneMapping:Me,decodeVideoTexture:se&&M.map.isVideoTexture===!0&&jt.getTransfer(M.map.colorSpace)===le,decodeVideoTextureEmissive:oe&&M.emissiveMap.isVideoTexture===!0&&jt.getTransfer(M.emissiveMap.colorSpace)===le,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===Ke,flipSided:M.side===Oe,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:Bt&&M.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Bt&&M.extensions.multiDraw===!0||qt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return F.vertexUv1s=c.has(1),F.vertexUv2s=c.has(2),F.vertexUv3s=c.has(3),c.clear(),F}function p(M){const y=[];if(M.shaderID?y.push(M.shaderID):(y.push(M.customVertexShaderID),y.push(M.customFragmentShaderID)),M.defines!==void 0)for(const C in M.defines)y.push(C),y.push(M.defines[C]);return M.isRawShaderMaterial===!1&&(S(y,M),x(y,M),y.push(n.outputColorSpace)),y.push(M.customProgramCacheKey),y.join()}function S(M,y){M.push(y.precision),M.push(y.outputColorSpace),M.push(y.envMapMode),M.push(y.envMapCubeUVHeight),M.push(y.mapUv),M.push(y.alphaMapUv),M.push(y.lightMapUv),M.push(y.aoMapUv),M.push(y.bumpMapUv),M.push(y.normalMapUv),M.push(y.displacementMapUv),M.push(y.emissiveMapUv),M.push(y.metalnessMapUv),M.push(y.roughnessMapUv),M.push(y.anisotropyMapUv),M.push(y.clearcoatMapUv),M.push(y.clearcoatNormalMapUv),M.push(y.clearcoatRoughnessMapUv),M.push(y.iridescenceMapUv),M.push(y.iridescenceThicknessMapUv),M.push(y.sheenColorMapUv),M.push(y.sheenRoughnessMapUv),M.push(y.specularMapUv),M.push(y.specularColorMapUv),M.push(y.specularIntensityMapUv),M.push(y.transmissionMapUv),M.push(y.thicknessMapUv),M.push(y.combine),M.push(y.fogExp2),M.push(y.sizeAttenuation),M.push(y.morphTargetsCount),M.push(y.morphAttributeCount),M.push(y.numDirLights),M.push(y.numPointLights),M.push(y.numSpotLights),M.push(y.numSpotLightMaps),M.push(y.numHemiLights),M.push(y.numRectAreaLights),M.push(y.numDirLightShadows),M.push(y.numPointLightShadows),M.push(y.numSpotLightShadows),M.push(y.numSpotLightShadowsWithMaps),M.push(y.numLightProbes),M.push(y.shadowMapType),M.push(y.toneMapping),M.push(y.numClippingPlanes),M.push(y.numClipIntersection),M.push(y.depthPacking)}function x(M,y){a.disableAll(),y.supportsVertexTextures&&a.enable(0),y.instancing&&a.enable(1),y.instancingColor&&a.enable(2),y.instancingMorph&&a.enable(3),y.matcap&&a.enable(4),y.envMap&&a.enable(5),y.normalMapObjectSpace&&a.enable(6),y.normalMapTangentSpace&&a.enable(7),y.clearcoat&&a.enable(8),y.iridescence&&a.enable(9),y.alphaTest&&a.enable(10),y.vertexColors&&a.enable(11),y.vertexAlphas&&a.enable(12),y.vertexUv1s&&a.enable(13),y.vertexUv2s&&a.enable(14),y.vertexUv3s&&a.enable(15),y.vertexTangents&&a.enable(16),y.anisotropy&&a.enable(17),y.alphaHash&&a.enable(18),y.batching&&a.enable(19),y.dispersion&&a.enable(20),y.batchingColor&&a.enable(21),M.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.reverseDepthBuffer&&a.enable(4),y.skinning&&a.enable(5),y.morphTargets&&a.enable(6),y.morphNormals&&a.enable(7),y.morphColors&&a.enable(8),y.premultipliedAlpha&&a.enable(9),y.shadowMapEnabled&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),y.decodeVideoTextureEmissive&&a.enable(20),y.alphaToCoverage&&a.enable(21),M.push(a.mask)}function _(M){const y=g[M.type];let C;if(y){const I=gn[y];C=zd.clone(I.uniforms)}else C=M.uniforms;return C}function L(M,y){let C;for(let I=0,G=d.length;I<G;I++){const J=d[I];if(J.cacheKey===y){C=J,++C.usedTimes;break}}return C===void 0&&(C=new j0(n,y,M,r),d.push(C)),C}function T(M){if(--M.usedTimes===0){const y=d.indexOf(M);d[y]=d[d.length-1],d.pop(),M.destroy()}}function R(M){l.remove(M)}function P(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:_,acquireProgram:L,releaseProgram:T,releaseShaderCache:R,programs:d,dispose:P}}function im(){let n=new WeakMap;function t(o){return n.has(o)}function e(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function s(o,a,l){n.get(o)[a]=l}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function sm(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function ql(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function Yl(){const n=[];let t=0;const e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function o(u,h,f,g,v,m){let p=n[t];return p===void 0?(p={id:u.id,object:u,geometry:h,material:f,groupOrder:g,renderOrder:u.renderOrder,z:v,group:m},n[t]=p):(p.id=u.id,p.object=u,p.geometry=h,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=v,p.group=m),t++,p}function a(u,h,f,g,v,m){const p=o(u,h,f,g,v,m);f.transmission>0?i.push(p):f.transparent===!0?s.push(p):e.push(p)}function l(u,h,f,g,v,m){const p=o(u,h,f,g,v,m);f.transmission>0?i.unshift(p):f.transparent===!0?s.unshift(p):e.unshift(p)}function c(u,h){e.length>1&&e.sort(u||sm),i.length>1&&i.sort(h||ql),s.length>1&&s.sort(h||ql)}function d(){for(let u=t,h=n.length;u<h;u++){const f=n[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:a,unshift:l,finish:d,sort:c}}function rm(){let n=new WeakMap;function t(i,s){const r=n.get(i);let o;return r===void 0?(o=new Yl,n.set(i,[o])):s>=r.length?(o=new Yl,r.push(o)):o=r[s],o}function e(){n=new WeakMap}return{get:t,dispose:e}}function om(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new b,color:new Nt};break;case"SpotLight":e={position:new b,direction:new b,color:new Nt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new b,color:new Nt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new b,skyColor:new Nt,groundColor:new Nt};break;case"RectAreaLight":e={color:new Nt,position:new b,halfWidth:new b,halfHeight:new b};break}return n[t.id]=e,e}}}function am(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new wt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new wt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new wt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let lm=0;function cm(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function um(n){const t=new om,e=am(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new b);const s=new b,r=new ue,o=new ue;function a(c){let d=0,u=0,h=0;for(let M=0;M<9;M++)i.probe[M].set(0,0,0);let f=0,g=0,v=0,m=0,p=0,S=0,x=0,_=0,L=0,T=0,R=0;c.sort(cm);for(let M=0,y=c.length;M<y;M++){const C=c[M],I=C.color,G=C.intensity,J=C.distance,et=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)d+=I.r*G,u+=I.g*G,h+=I.b*G;else if(C.isLightProbe){for(let K=0;K<9;K++)i.probe[K].addScaledVector(C.sh.coefficients[K],G);R++}else if(C.isDirectionalLight){const K=t.get(C);if(K.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const st=C.shadow,$=e.get(C);$.shadowIntensity=st.intensity,$.shadowBias=st.bias,$.shadowNormalBias=st.normalBias,$.shadowRadius=st.radius,$.shadowMapSize=st.mapSize,i.directionalShadow[f]=$,i.directionalShadowMap[f]=et,i.directionalShadowMatrix[f]=C.shadow.matrix,S++}i.directional[f]=K,f++}else if(C.isSpotLight){const K=t.get(C);K.position.setFromMatrixPosition(C.matrixWorld),K.color.copy(I).multiplyScalar(G),K.distance=J,K.coneCos=Math.cos(C.angle),K.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),K.decay=C.decay,i.spot[v]=K;const st=C.shadow;if(C.map&&(i.spotLightMap[L]=C.map,L++,st.updateMatrices(C),C.castShadow&&T++),i.spotLightMatrix[v]=st.matrix,C.castShadow){const $=e.get(C);$.shadowIntensity=st.intensity,$.shadowBias=st.bias,$.shadowNormalBias=st.normalBias,$.shadowRadius=st.radius,$.shadowMapSize=st.mapSize,i.spotShadow[v]=$,i.spotShadowMap[v]=et,_++}v++}else if(C.isRectAreaLight){const K=t.get(C);K.color.copy(I).multiplyScalar(G),K.halfWidth.set(C.width*.5,0,0),K.halfHeight.set(0,C.height*.5,0),i.rectArea[m]=K,m++}else if(C.isPointLight){const K=t.get(C);if(K.color.copy(C.color).multiplyScalar(C.intensity),K.distance=C.distance,K.decay=C.decay,C.castShadow){const st=C.shadow,$=e.get(C);$.shadowIntensity=st.intensity,$.shadowBias=st.bias,$.shadowNormalBias=st.normalBias,$.shadowRadius=st.radius,$.shadowMapSize=st.mapSize,$.shadowCameraNear=st.camera.near,$.shadowCameraFar=st.camera.far,i.pointShadow[g]=$,i.pointShadowMap[g]=et,i.pointShadowMatrix[g]=C.shadow.matrix,x++}i.point[g]=K,g++}else if(C.isHemisphereLight){const K=t.get(C);K.skyColor.copy(C.color).multiplyScalar(G),K.groundColor.copy(C.groundColor).multiplyScalar(G),i.hemi[p]=K,p++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=pt.LTC_FLOAT_1,i.rectAreaLTC2=pt.LTC_FLOAT_2):(i.rectAreaLTC1=pt.LTC_HALF_1,i.rectAreaLTC2=pt.LTC_HALF_2)),i.ambient[0]=d,i.ambient[1]=u,i.ambient[2]=h;const P=i.hash;(P.directionalLength!==f||P.pointLength!==g||P.spotLength!==v||P.rectAreaLength!==m||P.hemiLength!==p||P.numDirectionalShadows!==S||P.numPointShadows!==x||P.numSpotShadows!==_||P.numSpotMaps!==L||P.numLightProbes!==R)&&(i.directional.length=f,i.spot.length=v,i.rectArea.length=m,i.point.length=g,i.hemi.length=p,i.directionalShadow.length=S,i.directionalShadowMap.length=S,i.pointShadow.length=x,i.pointShadowMap.length=x,i.spotShadow.length=_,i.spotShadowMap.length=_,i.directionalShadowMatrix.length=S,i.pointShadowMatrix.length=x,i.spotLightMatrix.length=_+L-T,i.spotLightMap.length=L,i.numSpotLightShadowsWithMaps=T,i.numLightProbes=R,P.directionalLength=f,P.pointLength=g,P.spotLength=v,P.rectAreaLength=m,P.hemiLength=p,P.numDirectionalShadows=S,P.numPointShadows=x,P.numSpotShadows=_,P.numSpotMaps=L,P.numLightProbes=R,i.version=lm++)}function l(c,d){let u=0,h=0,f=0,g=0,v=0;const m=d.matrixWorldInverse;for(let p=0,S=c.length;p<S;p++){const x=c[p];if(x.isDirectionalLight){const _=i.directional[u];_.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(m),u++}else if(x.isSpotLight){const _=i.spot[f];_.position.setFromMatrixPosition(x.matrixWorld),_.position.applyMatrix4(m),_.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(m),f++}else if(x.isRectAreaLight){const _=i.rectArea[g];_.position.setFromMatrixPosition(x.matrixWorld),_.position.applyMatrix4(m),o.identity(),r.copy(x.matrixWorld),r.premultiply(m),o.extractRotation(r),_.halfWidth.set(x.width*.5,0,0),_.halfHeight.set(0,x.height*.5,0),_.halfWidth.applyMatrix4(o),_.halfHeight.applyMatrix4(o),g++}else if(x.isPointLight){const _=i.point[h];_.position.setFromMatrixPosition(x.matrixWorld),_.position.applyMatrix4(m),h++}else if(x.isHemisphereLight){const _=i.hemi[v];_.direction.setFromMatrixPosition(x.matrixWorld),_.direction.transformDirection(m),v++}}}return{setup:a,setupView:l,state:i}}function $l(n){const t=new um(n),e=[],i=[];function s(d){c.camera=d,e.length=0,i.length=0}function r(d){e.push(d)}function o(d){i.push(d)}function a(){t.setup(e)}function l(d){t.setupView(e,d)}const c={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function dm(n){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new $l(n),t.set(s,[a])):r>=o.length?(a=new $l(n),o.push(a)):a=o[r],a}function i(){t=new WeakMap}return{get:e,dispose:i}}class hm extends Fn{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=qu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class fm extends Fn{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const pm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,mm=`uniform sampler2D shadow_pass;
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
}`;function gm(n,t,e){let i=new Na;const s=new wt,r=new wt,o=new ce,a=new hm({depthPacking:Yu}),l=new fm,c={},d=e.maxTextureSize,u={[Qn]:Oe,[Oe]:Qn,[Ke]:Ke},h=new Un({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new wt},radius:{value:4}},vertexShader:pm,fragmentShader:mm}),f=h.clone();f.defines.HORIZONTAL_PASS=1;const g=new xe;g.setAttribute("position",new De(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new U(g,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=mc;let p=this.type;this.render=function(T,R,P){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;const M=n.getRenderTarget(),y=n.getActiveCubeFace(),C=n.getActiveMipmapLevel(),I=n.state;I.setBlending(Jn),I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);const G=p!==bn&&this.type===bn,J=p===bn&&this.type!==bn;for(let et=0,K=T.length;et<K;et++){const st=T[et],$=st.shadow;if($===void 0){console.warn("THREE.WebGLShadowMap:",st,"has no shadow.");continue}if($.autoUpdate===!1&&$.needsUpdate===!1)continue;s.copy($.mapSize);const ht=$.getFrameExtents();if(s.multiply(ht),r.copy($.mapSize),(s.x>d||s.y>d)&&(s.x>d&&(r.x=Math.floor(d/ht.x),s.x=r.x*ht.x,$.mapSize.x=r.x),s.y>d&&(r.y=Math.floor(d/ht.y),s.y=r.y*ht.y,$.mapSize.y=r.y)),$.map===null||G===!0||J===!0){const Pt=this.type!==bn?{minFilter:hn,magFilter:hn}:{};$.map!==null&&$.map.dispose(),$.map=new Si(s.x,s.y,Pt),$.map.texture.name=st.name+".shadowMap",$.camera.updateProjectionMatrix()}n.setRenderTarget($.map),n.clear();const ft=$.getViewportCount();for(let Pt=0;Pt<ft;Pt++){const Gt=$.getViewport(Pt);o.set(r.x*Gt.x,r.y*Gt.y,r.x*Gt.z,r.y*Gt.w),I.viewport(o),$.updateMatrices(st,Pt),i=$.getFrustum(),_(R,P,$.camera,st,this.type)}$.isPointLightShadow!==!0&&this.type===bn&&S($,P),$.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(M,y,C)};function S(T,R){const P=t.update(v);h.defines.VSM_SAMPLES!==T.blurSamples&&(h.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,h.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new Si(s.x,s.y)),h.uniforms.shadow_pass.value=T.map.texture,h.uniforms.resolution.value=T.mapSize,h.uniforms.radius.value=T.radius,n.setRenderTarget(T.mapPass),n.clear(),n.renderBufferDirect(R,null,P,h,v,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,n.setRenderTarget(T.map),n.clear(),n.renderBufferDirect(R,null,P,f,v,null)}function x(T,R,P,M){let y=null;const C=P.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(C!==void 0)y=C;else if(y=P.isPointLight===!0?l:a,n.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){const I=y.uuid,G=R.uuid;let J=c[I];J===void 0&&(J={},c[I]=J);let et=J[G];et===void 0&&(et=y.clone(),J[G]=et,R.addEventListener("dispose",L)),y=et}if(y.visible=R.visible,y.wireframe=R.wireframe,M===bn?y.side=R.shadowSide!==null?R.shadowSide:R.side:y.side=R.shadowSide!==null?R.shadowSide:u[R.side],y.alphaMap=R.alphaMap,y.alphaTest=R.alphaTest,y.map=R.map,y.clipShadows=R.clipShadows,y.clippingPlanes=R.clippingPlanes,y.clipIntersection=R.clipIntersection,y.displacementMap=R.displacementMap,y.displacementScale=R.displacementScale,y.displacementBias=R.displacementBias,y.wireframeLinewidth=R.wireframeLinewidth,y.linewidth=R.linewidth,P.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const I=n.properties.get(y);I.light=P}return y}function _(T,R,P,M,y){if(T.visible===!1)return;if(T.layers.test(R.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&y===bn)&&(!T.frustumCulled||i.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,T.matrixWorld);const G=t.update(T),J=T.material;if(Array.isArray(J)){const et=G.groups;for(let K=0,st=et.length;K<st;K++){const $=et[K],ht=J[$.materialIndex];if(ht&&ht.visible){const ft=x(T,ht,M,y);T.onBeforeShadow(n,T,R,P,G,ft,$),n.renderBufferDirect(P,null,G,ft,T,$),T.onAfterShadow(n,T,R,P,G,ft,$)}}}else if(J.visible){const et=x(T,J,M,y);T.onBeforeShadow(n,T,R,P,G,et,null),n.renderBufferDirect(P,null,G,et,T,null),T.onAfterShadow(n,T,R,P,G,et,null)}}const I=T.children;for(let G=0,J=I.length;G<J;G++)_(I[G],R,P,M,y)}function L(T){T.target.removeEventListener("dispose",L);for(const P in c){const M=c[P],y=T.target.uuid;y in M&&(M[y].dispose(),delete M[y])}}}const _m={[No]:Fo,[Oo]:ko,[zo]:Go,[es]:Bo,[Fo]:No,[ko]:Oo,[Go]:zo,[Bo]:es};function vm(n,t){function e(){let D=!1;const ct=new ce;let Y=null;const nt=new ce(0,0,0,0);return{setMask:function(vt){Y!==vt&&!D&&(n.colorMask(vt,vt,vt,vt),Y=vt)},setLocked:function(vt){D=vt},setClear:function(vt,_t,Bt,Me,F){F===!0&&(vt*=Me,_t*=Me,Bt*=Me),ct.set(vt,_t,Bt,Me),nt.equals(ct)===!1&&(n.clearColor(vt,_t,Bt,Me),nt.copy(ct))},reset:function(){D=!1,Y=null,nt.set(-1,0,0,0)}}}function i(){let D=!1,ct=!1,Y=null,nt=null,vt=null;return{setReversed:function(_t){if(ct!==_t){const Bt=t.get("EXT_clip_control");ct?Bt.clipControlEXT(Bt.LOWER_LEFT_EXT,Bt.ZERO_TO_ONE_EXT):Bt.clipControlEXT(Bt.LOWER_LEFT_EXT,Bt.NEGATIVE_ONE_TO_ONE_EXT);const Me=vt;vt=null,this.setClear(Me)}ct=_t},getReversed:function(){return ct},setTest:function(_t){_t?mt(n.DEPTH_TEST):Ut(n.DEPTH_TEST)},setMask:function(_t){Y!==_t&&!D&&(n.depthMask(_t),Y=_t)},setFunc:function(_t){if(ct&&(_t=_m[_t]),nt!==_t){switch(_t){case No:n.depthFunc(n.NEVER);break;case Fo:n.depthFunc(n.ALWAYS);break;case Oo:n.depthFunc(n.LESS);break;case es:n.depthFunc(n.LEQUAL);break;case zo:n.depthFunc(n.EQUAL);break;case Bo:n.depthFunc(n.GEQUAL);break;case ko:n.depthFunc(n.GREATER);break;case Go:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}nt=_t}},setLocked:function(_t){D=_t},setClear:function(_t){vt!==_t&&(ct&&(_t=1-_t),n.clearDepth(_t),vt=_t)},reset:function(){D=!1,Y=null,nt=null,vt=null,ct=!1}}}function s(){let D=!1,ct=null,Y=null,nt=null,vt=null,_t=null,Bt=null,Me=null,F=null;return{setTest:function(yt){D||(yt?mt(n.STENCIL_TEST):Ut(n.STENCIL_TEST))},setMask:function(yt){ct!==yt&&!D&&(n.stencilMask(yt),ct=yt)},setFunc:function(yt,Qt,ye){(Y!==yt||nt!==Qt||vt!==ye)&&(n.stencilFunc(yt,Qt,ye),Y=yt,nt=Qt,vt=ye)},setOp:function(yt,Qt,ye){(_t!==yt||Bt!==Qt||Me!==ye)&&(n.stencilOp(yt,Qt,ye),_t=yt,Bt=Qt,Me=ye)},setLocked:function(yt){D=yt},setClear:function(yt){F!==yt&&(n.clearStencil(yt),F=yt)},reset:function(){D=!1,ct=null,Y=null,nt=null,vt=null,_t=null,Bt=null,Me=null,F=null}}}const r=new e,o=new i,a=new s,l=new WeakMap,c=new WeakMap;let d={},u={},h=new WeakMap,f=[],g=null,v=!1,m=null,p=null,S=null,x=null,_=null,L=null,T=null,R=new Nt(0,0,0),P=0,M=!1,y=null,C=null,I=null,G=null,J=null;const et=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let K=!1,st=0;const $=n.getParameter(n.VERSION);$.indexOf("WebGL")!==-1?(st=parseFloat(/^WebGL (\d)/.exec($)[1]),K=st>=1):$.indexOf("OpenGL ES")!==-1&&(st=parseFloat(/^OpenGL ES (\d)/.exec($)[1]),K=st>=2);let ht=null,ft={};const Pt=n.getParameter(n.SCISSOR_BOX),Gt=n.getParameter(n.VIEWPORT),ee=new ce().fromArray(Pt),Q=new ce().fromArray(Gt);function dt(D,ct,Y,nt){const vt=new Uint8Array(4),_t=n.createTexture();n.bindTexture(D,_t),n.texParameteri(D,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(D,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Bt=0;Bt<Y;Bt++)D===n.TEXTURE_3D||D===n.TEXTURE_2D_ARRAY?n.texImage3D(ct,0,n.RGBA,1,1,nt,0,n.RGBA,n.UNSIGNED_BYTE,vt):n.texImage2D(ct+Bt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,vt);return _t}const Et={};Et[n.TEXTURE_2D]=dt(n.TEXTURE_2D,n.TEXTURE_2D,1),Et[n.TEXTURE_CUBE_MAP]=dt(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),Et[n.TEXTURE_2D_ARRAY]=dt(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Et[n.TEXTURE_3D]=dt(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),mt(n.DEPTH_TEST),o.setFunc(es),Yt(!1),$t(Qa),mt(n.CULL_FACE),z(Jn);function mt(D){d[D]!==!0&&(n.enable(D),d[D]=!0)}function Ut(D){d[D]!==!1&&(n.disable(D),d[D]=!1)}function zt(D,ct){return u[D]!==ct?(n.bindFramebuffer(D,ct),u[D]=ct,D===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=ct),D===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=ct),!0):!1}function qt(D,ct){let Y=f,nt=!1;if(D){Y=h.get(ct),Y===void 0&&(Y=[],h.set(ct,Y));const vt=D.textures;if(Y.length!==vt.length||Y[0]!==n.COLOR_ATTACHMENT0){for(let _t=0,Bt=vt.length;_t<Bt;_t++)Y[_t]=n.COLOR_ATTACHMENT0+_t;Y.length=vt.length,nt=!0}}else Y[0]!==n.BACK&&(Y[0]=n.BACK,nt=!0);nt&&n.drawBuffers(Y)}function se(D){return g!==D?(n.useProgram(D),g=D,!0):!1}const Kt={[mi]:n.FUNC_ADD,[yu]:n.FUNC_SUBTRACT,[Su]:n.FUNC_REVERSE_SUBTRACT};Kt[xu]=n.MIN,Kt[wu]=n.MAX;const ve={[Eu]:n.ZERO,[bu]:n.ONE,[Tu]:n.SRC_COLOR,[Io]:n.SRC_ALPHA,[Du]:n.SRC_ALPHA_SATURATE,[Pu]:n.DST_COLOR,[Cu]:n.DST_ALPHA,[Au]:n.ONE_MINUS_SRC_COLOR,[Uo]:n.ONE_MINUS_SRC_ALPHA,[Lu]:n.ONE_MINUS_DST_COLOR,[Ru]:n.ONE_MINUS_DST_ALPHA,[Iu]:n.CONSTANT_COLOR,[Uu]:n.ONE_MINUS_CONSTANT_COLOR,[Nu]:n.CONSTANT_ALPHA,[Fu]:n.ONE_MINUS_CONSTANT_ALPHA};function z(D,ct,Y,nt,vt,_t,Bt,Me,F,yt){if(D===Jn){v===!0&&(Ut(n.BLEND),v=!1);return}if(v===!1&&(mt(n.BLEND),v=!0),D!==Mu){if(D!==m||yt!==M){if((p!==mi||_!==mi)&&(n.blendEquation(n.FUNC_ADD),p=mi,_=mi),yt)switch(D){case Mi:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case sn:n.blendFunc(n.ONE,n.ONE);break;case tl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case el:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case Mi:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case sn:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case tl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case el:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}S=null,x=null,L=null,T=null,R.set(0,0,0),P=0,m=D,M=yt}return}vt=vt||ct,_t=_t||Y,Bt=Bt||nt,(ct!==p||vt!==_)&&(n.blendEquationSeparate(Kt[ct],Kt[vt]),p=ct,_=vt),(Y!==S||nt!==x||_t!==L||Bt!==T)&&(n.blendFuncSeparate(ve[Y],ve[nt],ve[_t],ve[Bt]),S=Y,x=nt,L=_t,T=Bt),(Me.equals(R)===!1||F!==P)&&(n.blendColor(Me.r,Me.g,Me.b,F),R.copy(Me),P=F),m=D,M=!1}function ze(D,ct){D.side===Ke?Ut(n.CULL_FACE):mt(n.CULL_FACE);let Y=D.side===Oe;ct&&(Y=!Y),Yt(Y),D.blending===Mi&&D.transparent===!1?z(Jn):z(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),o.setFunc(D.depthFunc),o.setTest(D.depthTest),o.setMask(D.depthWrite),r.setMask(D.colorWrite);const nt=D.stencilWrite;a.setTest(nt),nt&&(a.setMask(D.stencilWriteMask),a.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),a.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),oe(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?mt(n.SAMPLE_ALPHA_TO_COVERAGE):Ut(n.SAMPLE_ALPHA_TO_COVERAGE)}function Yt(D){y!==D&&(D?n.frontFace(n.CW):n.frontFace(n.CCW),y=D)}function $t(D){D!==_u?(mt(n.CULL_FACE),D!==C&&(D===Qa?n.cullFace(n.BACK):D===vu?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Ut(n.CULL_FACE),C=D}function Dt(D){D!==I&&(K&&n.lineWidth(D),I=D)}function oe(D,ct,Y){D?(mt(n.POLYGON_OFFSET_FILL),(G!==ct||J!==Y)&&(n.polygonOffset(ct,Y),G=ct,J=Y)):Ut(n.POLYGON_OFFSET_FILL)}function It(D){D?mt(n.SCISSOR_TEST):Ut(n.SCISSOR_TEST)}function A(D){D===void 0&&(D=n.TEXTURE0+et-1),ht!==D&&(n.activeTexture(D),ht=D)}function w(D,ct,Y){Y===void 0&&(ht===null?Y=n.TEXTURE0+et-1:Y=ht);let nt=ft[Y];nt===void 0&&(nt={type:void 0,texture:void 0},ft[Y]=nt),(nt.type!==D||nt.texture!==ct)&&(ht!==Y&&(n.activeTexture(Y),ht=Y),n.bindTexture(D,ct||Et[D]),nt.type=D,nt.texture=ct)}function W(){const D=ft[ht];D!==void 0&&D.type!==void 0&&(n.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function it(){try{n.compressedTexImage2D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function rt(){try{n.compressedTexImage3D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function tt(){try{n.texSubImage2D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Tt(){try{n.texSubImage3D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function gt(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function xt(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Jt(){try{n.texStorage2D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function at(){try{n.texStorage3D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function N(){try{n.texImage2D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function k(){try{n.texImage3D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function V(D){ee.equals(D)===!1&&(n.scissor(D.x,D.y,D.z,D.w),ee.copy(D))}function H(D){Q.equals(D)===!1&&(n.viewport(D.x,D.y,D.z,D.w),Q.copy(D))}function Z(D,ct){let Y=c.get(ct);Y===void 0&&(Y=new WeakMap,c.set(ct,Y));let nt=Y.get(D);nt===void 0&&(nt=n.getUniformBlockIndex(ct,D.name),Y.set(D,nt))}function ot(D,ct){const nt=c.get(ct).get(D);l.get(ct)!==nt&&(n.uniformBlockBinding(ct,nt,D.__bindingPointIndex),l.set(ct,nt))}function lt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),d={},ht=null,ft={},u={},h=new WeakMap,f=[],g=null,v=!1,m=null,p=null,S=null,x=null,_=null,L=null,T=null,R=new Nt(0,0,0),P=0,M=!1,y=null,C=null,I=null,G=null,J=null,ee.set(0,0,n.canvas.width,n.canvas.height),Q.set(0,0,n.canvas.width,n.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:mt,disable:Ut,bindFramebuffer:zt,drawBuffers:qt,useProgram:se,setBlending:z,setMaterial:ze,setFlipSided:Yt,setCullFace:$t,setLineWidth:Dt,setPolygonOffset:oe,setScissorTest:It,activeTexture:A,bindTexture:w,unbindTexture:W,compressedTexImage2D:it,compressedTexImage3D:rt,texImage2D:N,texImage3D:k,updateUBOMapping:Z,uniformBlockBinding:ot,texStorage2D:Jt,texStorage3D:at,texSubImage2D:tt,texSubImage3D:Tt,compressedTexSubImage2D:gt,compressedTexSubImage3D:xt,scissor:V,viewport:H,reset:lt}}function Zl(n,t,e,i){const s=Mm(i);switch(e){case yc:return n*t;case xc:return n*t;case wc:return n*t*2;case Ec:return n*t/s.components*s.byteLength;case Ra:return n*t/s.components*s.byteLength;case bc:return n*t*2/s.components*s.byteLength;case Pa:return n*t*2/s.components*s.byteLength;case Sc:return n*t*3/s.components*s.byteLength;case dn:return n*t*4/s.components*s.byteLength;case La:return n*t*4/s.components*s.byteLength;case vr:case Mr:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case yr:case Sr:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case qo:case $o:return Math.max(n,16)*Math.max(t,8)/4;case Xo:case Yo:return Math.max(n,8)*Math.max(t,8)/2;case Zo:case Ko:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Jo:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case jo:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Qo:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case ta:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case ea:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case na:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case ia:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case sa:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case ra:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case oa:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case aa:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case la:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case ca:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case ua:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case da:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case xr:case ha:case fa:return Math.ceil(n/4)*Math.ceil(t/4)*16;case Tc:case pa:return Math.ceil(n/4)*Math.ceil(t/4)*8;case ma:case ga:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Mm(n){switch(n){case In:case _c:return{byteLength:1,components:1};case Us:case vc:case Os:return{byteLength:2,components:1};case Aa:case Ca:return{byteLength:2,components:4};case yi:case Ta:case Cn:return{byteLength:4,components:1};case Mc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function ym(n,t,e,i,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new wt,d=new WeakMap;let u;const h=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(A,w){return f?new OffscreenCanvas(A,w):Tr("canvas")}function v(A,w,W){let it=1;const rt=It(A);if((rt.width>W||rt.height>W)&&(it=W/Math.max(rt.width,rt.height)),it<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const tt=Math.floor(it*rt.width),Tt=Math.floor(it*rt.height);u===void 0&&(u=g(tt,Tt));const gt=w?g(tt,Tt):u;return gt.width=tt,gt.height=Tt,gt.getContext("2d").drawImage(A,0,0,tt,Tt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+rt.width+"x"+rt.height+") to ("+tt+"x"+Tt+")."),gt}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+rt.width+"x"+rt.height+")."),A;return A}function m(A){return A.generateMipmaps}function p(A){n.generateMipmap(A)}function S(A){return A.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?n.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function x(A,w,W,it,rt=!1){if(A!==null){if(n[A]!==void 0)return n[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let tt=w;if(w===n.RED&&(W===n.FLOAT&&(tt=n.R32F),W===n.HALF_FLOAT&&(tt=n.R16F),W===n.UNSIGNED_BYTE&&(tt=n.R8)),w===n.RED_INTEGER&&(W===n.UNSIGNED_BYTE&&(tt=n.R8UI),W===n.UNSIGNED_SHORT&&(tt=n.R16UI),W===n.UNSIGNED_INT&&(tt=n.R32UI),W===n.BYTE&&(tt=n.R8I),W===n.SHORT&&(tt=n.R16I),W===n.INT&&(tt=n.R32I)),w===n.RG&&(W===n.FLOAT&&(tt=n.RG32F),W===n.HALF_FLOAT&&(tt=n.RG16F),W===n.UNSIGNED_BYTE&&(tt=n.RG8)),w===n.RG_INTEGER&&(W===n.UNSIGNED_BYTE&&(tt=n.RG8UI),W===n.UNSIGNED_SHORT&&(tt=n.RG16UI),W===n.UNSIGNED_INT&&(tt=n.RG32UI),W===n.BYTE&&(tt=n.RG8I),W===n.SHORT&&(tt=n.RG16I),W===n.INT&&(tt=n.RG32I)),w===n.RGB_INTEGER&&(W===n.UNSIGNED_BYTE&&(tt=n.RGB8UI),W===n.UNSIGNED_SHORT&&(tt=n.RGB16UI),W===n.UNSIGNED_INT&&(tt=n.RGB32UI),W===n.BYTE&&(tt=n.RGB8I),W===n.SHORT&&(tt=n.RGB16I),W===n.INT&&(tt=n.RGB32I)),w===n.RGBA_INTEGER&&(W===n.UNSIGNED_BYTE&&(tt=n.RGBA8UI),W===n.UNSIGNED_SHORT&&(tt=n.RGBA16UI),W===n.UNSIGNED_INT&&(tt=n.RGBA32UI),W===n.BYTE&&(tt=n.RGBA8I),W===n.SHORT&&(tt=n.RGBA16I),W===n.INT&&(tt=n.RGBA32I)),w===n.RGB&&W===n.UNSIGNED_INT_5_9_9_9_REV&&(tt=n.RGB9_E5),w===n.RGBA){const Tt=rt?Fr:jt.getTransfer(it);W===n.FLOAT&&(tt=n.RGBA32F),W===n.HALF_FLOAT&&(tt=n.RGBA16F),W===n.UNSIGNED_BYTE&&(tt=Tt===le?n.SRGB8_ALPHA8:n.RGBA8),W===n.UNSIGNED_SHORT_4_4_4_4&&(tt=n.RGBA4),W===n.UNSIGNED_SHORT_5_5_5_1&&(tt=n.RGB5_A1)}return(tt===n.R16F||tt===n.R32F||tt===n.RG16F||tt===n.RG32F||tt===n.RGBA16F||tt===n.RGBA32F)&&t.get("EXT_color_buffer_float"),tt}function _(A,w){let W;return A?w===null||w===yi||w===ss?W=n.DEPTH24_STENCIL8:w===Cn?W=n.DEPTH32F_STENCIL8:w===Us&&(W=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===yi||w===ss?W=n.DEPTH_COMPONENT24:w===Cn?W=n.DEPTH_COMPONENT32F:w===Us&&(W=n.DEPTH_COMPONENT16),W}function L(A,w){return m(A)===!0||A.isFramebufferTexture&&A.minFilter!==hn&&A.minFilter!==_n?Math.log2(Math.max(w.width,w.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?w.mipmaps.length:1}function T(A){const w=A.target;w.removeEventListener("dispose",T),P(w),w.isVideoTexture&&d.delete(w)}function R(A){const w=A.target;w.removeEventListener("dispose",R),y(w)}function P(A){const w=i.get(A);if(w.__webglInit===void 0)return;const W=A.source,it=h.get(W);if(it){const rt=it[w.__cacheKey];rt.usedTimes--,rt.usedTimes===0&&M(A),Object.keys(it).length===0&&h.delete(W)}i.remove(A)}function M(A){const w=i.get(A);n.deleteTexture(w.__webglTexture);const W=A.source,it=h.get(W);delete it[w.__cacheKey],o.memory.textures--}function y(A){const w=i.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),i.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let it=0;it<6;it++){if(Array.isArray(w.__webglFramebuffer[it]))for(let rt=0;rt<w.__webglFramebuffer[it].length;rt++)n.deleteFramebuffer(w.__webglFramebuffer[it][rt]);else n.deleteFramebuffer(w.__webglFramebuffer[it]);w.__webglDepthbuffer&&n.deleteRenderbuffer(w.__webglDepthbuffer[it])}else{if(Array.isArray(w.__webglFramebuffer))for(let it=0;it<w.__webglFramebuffer.length;it++)n.deleteFramebuffer(w.__webglFramebuffer[it]);else n.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&n.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&n.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let it=0;it<w.__webglColorRenderbuffer.length;it++)w.__webglColorRenderbuffer[it]&&n.deleteRenderbuffer(w.__webglColorRenderbuffer[it]);w.__webglDepthRenderbuffer&&n.deleteRenderbuffer(w.__webglDepthRenderbuffer)}const W=A.textures;for(let it=0,rt=W.length;it<rt;it++){const tt=i.get(W[it]);tt.__webglTexture&&(n.deleteTexture(tt.__webglTexture),o.memory.textures--),i.remove(W[it])}i.remove(A)}let C=0;function I(){C=0}function G(){const A=C;return A>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+s.maxTextures),C+=1,A}function J(A){const w=[];return w.push(A.wrapS),w.push(A.wrapT),w.push(A.wrapR||0),w.push(A.magFilter),w.push(A.minFilter),w.push(A.anisotropy),w.push(A.internalFormat),w.push(A.format),w.push(A.type),w.push(A.generateMipmaps),w.push(A.premultiplyAlpha),w.push(A.flipY),w.push(A.unpackAlignment),w.push(A.colorSpace),w.join()}function et(A,w){const W=i.get(A);if(A.isVideoTexture&&Dt(A),A.isRenderTargetTexture===!1&&A.version>0&&W.__version!==A.version){const it=A.image;if(it===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(it.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Q(W,A,w);return}}e.bindTexture(n.TEXTURE_2D,W.__webglTexture,n.TEXTURE0+w)}function K(A,w){const W=i.get(A);if(A.version>0&&W.__version!==A.version){Q(W,A,w);return}e.bindTexture(n.TEXTURE_2D_ARRAY,W.__webglTexture,n.TEXTURE0+w)}function st(A,w){const W=i.get(A);if(A.version>0&&W.__version!==A.version){Q(W,A,w);return}e.bindTexture(n.TEXTURE_3D,W.__webglTexture,n.TEXTURE0+w)}function $(A,w){const W=i.get(A);if(A.version>0&&W.__version!==A.version){dt(W,A,w);return}e.bindTexture(n.TEXTURE_CUBE_MAP,W.__webglTexture,n.TEXTURE0+w)}const ht={[ti]:n.REPEAT,[_i]:n.CLAMP_TO_EDGE,[Wo]:n.MIRRORED_REPEAT},ft={[hn]:n.NEAREST,[Xu]:n.NEAREST_MIPMAP_NEAREST,[Vs]:n.NEAREST_MIPMAP_LINEAR,[_n]:n.LINEAR,[Hr]:n.LINEAR_MIPMAP_NEAREST,[vi]:n.LINEAR_MIPMAP_LINEAR},Pt={[Zu]:n.NEVER,[ed]:n.ALWAYS,[Ku]:n.LESS,[Ac]:n.LEQUAL,[Ju]:n.EQUAL,[td]:n.GEQUAL,[ju]:n.GREATER,[Qu]:n.NOTEQUAL};function Gt(A,w){if(w.type===Cn&&t.has("OES_texture_float_linear")===!1&&(w.magFilter===_n||w.magFilter===Hr||w.magFilter===Vs||w.magFilter===vi||w.minFilter===_n||w.minFilter===Hr||w.minFilter===Vs||w.minFilter===vi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(A,n.TEXTURE_WRAP_S,ht[w.wrapS]),n.texParameteri(A,n.TEXTURE_WRAP_T,ht[w.wrapT]),(A===n.TEXTURE_3D||A===n.TEXTURE_2D_ARRAY)&&n.texParameteri(A,n.TEXTURE_WRAP_R,ht[w.wrapR]),n.texParameteri(A,n.TEXTURE_MAG_FILTER,ft[w.magFilter]),n.texParameteri(A,n.TEXTURE_MIN_FILTER,ft[w.minFilter]),w.compareFunction&&(n.texParameteri(A,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(A,n.TEXTURE_COMPARE_FUNC,Pt[w.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===hn||w.minFilter!==Vs&&w.minFilter!==vi||w.type===Cn&&t.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||i.get(w).__currentAnisotropy){const W=t.get("EXT_texture_filter_anisotropic");n.texParameterf(A,W.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,s.getMaxAnisotropy())),i.get(w).__currentAnisotropy=w.anisotropy}}}function ee(A,w){let W=!1;A.__webglInit===void 0&&(A.__webglInit=!0,w.addEventListener("dispose",T));const it=w.source;let rt=h.get(it);rt===void 0&&(rt={},h.set(it,rt));const tt=J(w);if(tt!==A.__cacheKey){rt[tt]===void 0&&(rt[tt]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,W=!0),rt[tt].usedTimes++;const Tt=rt[A.__cacheKey];Tt!==void 0&&(rt[A.__cacheKey].usedTimes--,Tt.usedTimes===0&&M(w)),A.__cacheKey=tt,A.__webglTexture=rt[tt].texture}return W}function Q(A,w,W){let it=n.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(it=n.TEXTURE_2D_ARRAY),w.isData3DTexture&&(it=n.TEXTURE_3D);const rt=ee(A,w),tt=w.source;e.bindTexture(it,A.__webglTexture,n.TEXTURE0+W);const Tt=i.get(tt);if(tt.version!==Tt.__version||rt===!0){e.activeTexture(n.TEXTURE0+W);const gt=jt.getPrimaries(jt.workingColorSpace),xt=w.colorSpace===$n?null:jt.getPrimaries(w.colorSpace),Jt=w.colorSpace===$n||gt===xt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,w.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,w.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Jt);let at=v(w.image,!1,s.maxTextureSize);at=oe(w,at);const N=r.convert(w.format,w.colorSpace),k=r.convert(w.type);let V=x(w.internalFormat,N,k,w.colorSpace,w.isVideoTexture);Gt(it,w);let H;const Z=w.mipmaps,ot=w.isVideoTexture!==!0,lt=Tt.__version===void 0||rt===!0,D=tt.dataReady,ct=L(w,at);if(w.isDepthTexture)V=_(w.format===rs,w.type),lt&&(ot?e.texStorage2D(n.TEXTURE_2D,1,V,at.width,at.height):e.texImage2D(n.TEXTURE_2D,0,V,at.width,at.height,0,N,k,null));else if(w.isDataTexture)if(Z.length>0){ot&&lt&&e.texStorage2D(n.TEXTURE_2D,ct,V,Z[0].width,Z[0].height);for(let Y=0,nt=Z.length;Y<nt;Y++)H=Z[Y],ot?D&&e.texSubImage2D(n.TEXTURE_2D,Y,0,0,H.width,H.height,N,k,H.data):e.texImage2D(n.TEXTURE_2D,Y,V,H.width,H.height,0,N,k,H.data);w.generateMipmaps=!1}else ot?(lt&&e.texStorage2D(n.TEXTURE_2D,ct,V,at.width,at.height),D&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,at.width,at.height,N,k,at.data)):e.texImage2D(n.TEXTURE_2D,0,V,at.width,at.height,0,N,k,at.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){ot&&lt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,ct,V,Z[0].width,Z[0].height,at.depth);for(let Y=0,nt=Z.length;Y<nt;Y++)if(H=Z[Y],w.format!==dn)if(N!==null)if(ot){if(D)if(w.layerUpdates.size>0){const vt=Zl(H.width,H.height,w.format,w.type);for(const _t of w.layerUpdates){const Bt=H.data.subarray(_t*vt/H.data.BYTES_PER_ELEMENT,(_t+1)*vt/H.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,Y,0,0,_t,H.width,H.height,1,N,Bt)}w.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,Y,0,0,0,H.width,H.height,at.depth,N,H.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,Y,V,H.width,H.height,at.depth,0,H.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ot?D&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,Y,0,0,0,H.width,H.height,at.depth,N,k,H.data):e.texImage3D(n.TEXTURE_2D_ARRAY,Y,V,H.width,H.height,at.depth,0,N,k,H.data)}else{ot&&lt&&e.texStorage2D(n.TEXTURE_2D,ct,V,Z[0].width,Z[0].height);for(let Y=0,nt=Z.length;Y<nt;Y++)H=Z[Y],w.format!==dn?N!==null?ot?D&&e.compressedTexSubImage2D(n.TEXTURE_2D,Y,0,0,H.width,H.height,N,H.data):e.compressedTexImage2D(n.TEXTURE_2D,Y,V,H.width,H.height,0,H.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ot?D&&e.texSubImage2D(n.TEXTURE_2D,Y,0,0,H.width,H.height,N,k,H.data):e.texImage2D(n.TEXTURE_2D,Y,V,H.width,H.height,0,N,k,H.data)}else if(w.isDataArrayTexture)if(ot){if(lt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,ct,V,at.width,at.height,at.depth),D)if(w.layerUpdates.size>0){const Y=Zl(at.width,at.height,w.format,w.type);for(const nt of w.layerUpdates){const vt=at.data.subarray(nt*Y/at.data.BYTES_PER_ELEMENT,(nt+1)*Y/at.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,nt,at.width,at.height,1,N,k,vt)}w.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,at.width,at.height,at.depth,N,k,at.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,V,at.width,at.height,at.depth,0,N,k,at.data);else if(w.isData3DTexture)ot?(lt&&e.texStorage3D(n.TEXTURE_3D,ct,V,at.width,at.height,at.depth),D&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,at.width,at.height,at.depth,N,k,at.data)):e.texImage3D(n.TEXTURE_3D,0,V,at.width,at.height,at.depth,0,N,k,at.data);else if(w.isFramebufferTexture){if(lt)if(ot)e.texStorage2D(n.TEXTURE_2D,ct,V,at.width,at.height);else{let Y=at.width,nt=at.height;for(let vt=0;vt<ct;vt++)e.texImage2D(n.TEXTURE_2D,vt,V,Y,nt,0,N,k,null),Y>>=1,nt>>=1}}else if(Z.length>0){if(ot&&lt){const Y=It(Z[0]);e.texStorage2D(n.TEXTURE_2D,ct,V,Y.width,Y.height)}for(let Y=0,nt=Z.length;Y<nt;Y++)H=Z[Y],ot?D&&e.texSubImage2D(n.TEXTURE_2D,Y,0,0,N,k,H):e.texImage2D(n.TEXTURE_2D,Y,V,N,k,H);w.generateMipmaps=!1}else if(ot){if(lt){const Y=It(at);e.texStorage2D(n.TEXTURE_2D,ct,V,Y.width,Y.height)}D&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,N,k,at)}else e.texImage2D(n.TEXTURE_2D,0,V,N,k,at);m(w)&&p(it),Tt.__version=tt.version,w.onUpdate&&w.onUpdate(w)}A.__version=w.version}function dt(A,w,W){if(w.image.length!==6)return;const it=ee(A,w),rt=w.source;e.bindTexture(n.TEXTURE_CUBE_MAP,A.__webglTexture,n.TEXTURE0+W);const tt=i.get(rt);if(rt.version!==tt.__version||it===!0){e.activeTexture(n.TEXTURE0+W);const Tt=jt.getPrimaries(jt.workingColorSpace),gt=w.colorSpace===$n?null:jt.getPrimaries(w.colorSpace),xt=w.colorSpace===$n||Tt===gt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,w.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,w.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,xt);const Jt=w.isCompressedTexture||w.image[0].isCompressedTexture,at=w.image[0]&&w.image[0].isDataTexture,N=[];for(let nt=0;nt<6;nt++)!Jt&&!at?N[nt]=v(w.image[nt],!0,s.maxCubemapSize):N[nt]=at?w.image[nt].image:w.image[nt],N[nt]=oe(w,N[nt]);const k=N[0],V=r.convert(w.format,w.colorSpace),H=r.convert(w.type),Z=x(w.internalFormat,V,H,w.colorSpace),ot=w.isVideoTexture!==!0,lt=tt.__version===void 0||it===!0,D=rt.dataReady;let ct=L(w,k);Gt(n.TEXTURE_CUBE_MAP,w);let Y;if(Jt){ot&&lt&&e.texStorage2D(n.TEXTURE_CUBE_MAP,ct,Z,k.width,k.height);for(let nt=0;nt<6;nt++){Y=N[nt].mipmaps;for(let vt=0;vt<Y.length;vt++){const _t=Y[vt];w.format!==dn?V!==null?ot?D&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,vt,0,0,_t.width,_t.height,V,_t.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,vt,Z,_t.width,_t.height,0,_t.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ot?D&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,vt,0,0,_t.width,_t.height,V,H,_t.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,vt,Z,_t.width,_t.height,0,V,H,_t.data)}}}else{if(Y=w.mipmaps,ot&&lt){Y.length>0&&ct++;const nt=It(N[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,ct,Z,nt.width,nt.height)}for(let nt=0;nt<6;nt++)if(at){ot?D&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,0,0,N[nt].width,N[nt].height,V,H,N[nt].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,Z,N[nt].width,N[nt].height,0,V,H,N[nt].data);for(let vt=0;vt<Y.length;vt++){const Bt=Y[vt].image[nt].image;ot?D&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,vt+1,0,0,Bt.width,Bt.height,V,H,Bt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,vt+1,Z,Bt.width,Bt.height,0,V,H,Bt.data)}}else{ot?D&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,0,0,V,H,N[nt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,Z,V,H,N[nt]);for(let vt=0;vt<Y.length;vt++){const _t=Y[vt];ot?D&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,vt+1,0,0,V,H,_t.image[nt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,vt+1,Z,V,H,_t.image[nt])}}}m(w)&&p(n.TEXTURE_CUBE_MAP),tt.__version=rt.version,w.onUpdate&&w.onUpdate(w)}A.__version=w.version}function Et(A,w,W,it,rt,tt){const Tt=r.convert(W.format,W.colorSpace),gt=r.convert(W.type),xt=x(W.internalFormat,Tt,gt,W.colorSpace),Jt=i.get(w),at=i.get(W);if(at.__renderTarget=w,!Jt.__hasExternalTextures){const N=Math.max(1,w.width>>tt),k=Math.max(1,w.height>>tt);rt===n.TEXTURE_3D||rt===n.TEXTURE_2D_ARRAY?e.texImage3D(rt,tt,xt,N,k,w.depth,0,Tt,gt,null):e.texImage2D(rt,tt,xt,N,k,0,Tt,gt,null)}e.bindFramebuffer(n.FRAMEBUFFER,A),$t(w)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,it,rt,at.__webglTexture,0,Yt(w)):(rt===n.TEXTURE_2D||rt>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&rt<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,it,rt,at.__webglTexture,tt),e.bindFramebuffer(n.FRAMEBUFFER,null)}function mt(A,w,W){if(n.bindRenderbuffer(n.RENDERBUFFER,A),w.depthBuffer){const it=w.depthTexture,rt=it&&it.isDepthTexture?it.type:null,tt=_(w.stencilBuffer,rt),Tt=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,gt=Yt(w);$t(w)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,gt,tt,w.width,w.height):W?n.renderbufferStorageMultisample(n.RENDERBUFFER,gt,tt,w.width,w.height):n.renderbufferStorage(n.RENDERBUFFER,tt,w.width,w.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Tt,n.RENDERBUFFER,A)}else{const it=w.textures;for(let rt=0;rt<it.length;rt++){const tt=it[rt],Tt=r.convert(tt.format,tt.colorSpace),gt=r.convert(tt.type),xt=x(tt.internalFormat,Tt,gt,tt.colorSpace),Jt=Yt(w);W&&$t(w)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Jt,xt,w.width,w.height):$t(w)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Jt,xt,w.width,w.height):n.renderbufferStorage(n.RENDERBUFFER,xt,w.width,w.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Ut(A,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,A),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const it=i.get(w.depthTexture);it.__renderTarget=w,(!it.__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),et(w.depthTexture,0);const rt=it.__webglTexture,tt=Yt(w);if(w.depthTexture.format===Ji)$t(w)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,rt,0,tt):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,rt,0);else if(w.depthTexture.format===rs)$t(w)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,rt,0,tt):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,rt,0);else throw new Error("Unknown depthTexture format")}function zt(A){const w=i.get(A),W=A.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==A.depthTexture){const it=A.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),it){const rt=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,it.removeEventListener("dispose",rt)};it.addEventListener("dispose",rt),w.__depthDisposeCallback=rt}w.__boundDepthTexture=it}if(A.depthTexture&&!w.__autoAllocateDepthBuffer){if(W)throw new Error("target.depthTexture not supported in Cube render targets");Ut(w.__webglFramebuffer,A)}else if(W){w.__webglDepthbuffer=[];for(let it=0;it<6;it++)if(e.bindFramebuffer(n.FRAMEBUFFER,w.__webglFramebuffer[it]),w.__webglDepthbuffer[it]===void 0)w.__webglDepthbuffer[it]=n.createRenderbuffer(),mt(w.__webglDepthbuffer[it],A,!1);else{const rt=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,tt=w.__webglDepthbuffer[it];n.bindRenderbuffer(n.RENDERBUFFER,tt),n.framebufferRenderbuffer(n.FRAMEBUFFER,rt,n.RENDERBUFFER,tt)}}else if(e.bindFramebuffer(n.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=n.createRenderbuffer(),mt(w.__webglDepthbuffer,A,!1);else{const it=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,rt=w.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,rt),n.framebufferRenderbuffer(n.FRAMEBUFFER,it,n.RENDERBUFFER,rt)}e.bindFramebuffer(n.FRAMEBUFFER,null)}function qt(A,w,W){const it=i.get(A);w!==void 0&&Et(it.__webglFramebuffer,A,A.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),W!==void 0&&zt(A)}function se(A){const w=A.texture,W=i.get(A),it=i.get(w);A.addEventListener("dispose",R);const rt=A.textures,tt=A.isWebGLCubeRenderTarget===!0,Tt=rt.length>1;if(Tt||(it.__webglTexture===void 0&&(it.__webglTexture=n.createTexture()),it.__version=w.version,o.memory.textures++),tt){W.__webglFramebuffer=[];for(let gt=0;gt<6;gt++)if(w.mipmaps&&w.mipmaps.length>0){W.__webglFramebuffer[gt]=[];for(let xt=0;xt<w.mipmaps.length;xt++)W.__webglFramebuffer[gt][xt]=n.createFramebuffer()}else W.__webglFramebuffer[gt]=n.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){W.__webglFramebuffer=[];for(let gt=0;gt<w.mipmaps.length;gt++)W.__webglFramebuffer[gt]=n.createFramebuffer()}else W.__webglFramebuffer=n.createFramebuffer();if(Tt)for(let gt=0,xt=rt.length;gt<xt;gt++){const Jt=i.get(rt[gt]);Jt.__webglTexture===void 0&&(Jt.__webglTexture=n.createTexture(),o.memory.textures++)}if(A.samples>0&&$t(A)===!1){W.__webglMultisampledFramebuffer=n.createFramebuffer(),W.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let gt=0;gt<rt.length;gt++){const xt=rt[gt];W.__webglColorRenderbuffer[gt]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,W.__webglColorRenderbuffer[gt]);const Jt=r.convert(xt.format,xt.colorSpace),at=r.convert(xt.type),N=x(xt.internalFormat,Jt,at,xt.colorSpace,A.isXRRenderTarget===!0),k=Yt(A);n.renderbufferStorageMultisample(n.RENDERBUFFER,k,N,A.width,A.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+gt,n.RENDERBUFFER,W.__webglColorRenderbuffer[gt])}n.bindRenderbuffer(n.RENDERBUFFER,null),A.depthBuffer&&(W.__webglDepthRenderbuffer=n.createRenderbuffer(),mt(W.__webglDepthRenderbuffer,A,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(tt){e.bindTexture(n.TEXTURE_CUBE_MAP,it.__webglTexture),Gt(n.TEXTURE_CUBE_MAP,w);for(let gt=0;gt<6;gt++)if(w.mipmaps&&w.mipmaps.length>0)for(let xt=0;xt<w.mipmaps.length;xt++)Et(W.__webglFramebuffer[gt][xt],A,w,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+gt,xt);else Et(W.__webglFramebuffer[gt],A,w,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0);m(w)&&p(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Tt){for(let gt=0,xt=rt.length;gt<xt;gt++){const Jt=rt[gt],at=i.get(Jt);e.bindTexture(n.TEXTURE_2D,at.__webglTexture),Gt(n.TEXTURE_2D,Jt),Et(W.__webglFramebuffer,A,Jt,n.COLOR_ATTACHMENT0+gt,n.TEXTURE_2D,0),m(Jt)&&p(n.TEXTURE_2D)}e.unbindTexture()}else{let gt=n.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(gt=A.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(gt,it.__webglTexture),Gt(gt,w),w.mipmaps&&w.mipmaps.length>0)for(let xt=0;xt<w.mipmaps.length;xt++)Et(W.__webglFramebuffer[xt],A,w,n.COLOR_ATTACHMENT0,gt,xt);else Et(W.__webglFramebuffer,A,w,n.COLOR_ATTACHMENT0,gt,0);m(w)&&p(gt),e.unbindTexture()}A.depthBuffer&&zt(A)}function Kt(A){const w=A.textures;for(let W=0,it=w.length;W<it;W++){const rt=w[W];if(m(rt)){const tt=S(A),Tt=i.get(rt).__webglTexture;e.bindTexture(tt,Tt),p(tt),e.unbindTexture()}}}const ve=[],z=[];function ze(A){if(A.samples>0){if($t(A)===!1){const w=A.textures,W=A.width,it=A.height;let rt=n.COLOR_BUFFER_BIT;const tt=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Tt=i.get(A),gt=w.length>1;if(gt)for(let xt=0;xt<w.length;xt++)e.bindFramebuffer(n.FRAMEBUFFER,Tt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+xt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,Tt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+xt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,Tt.__webglMultisampledFramebuffer),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,Tt.__webglFramebuffer);for(let xt=0;xt<w.length;xt++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(rt|=n.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(rt|=n.STENCIL_BUFFER_BIT)),gt){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Tt.__webglColorRenderbuffer[xt]);const Jt=i.get(w[xt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Jt,0)}n.blitFramebuffer(0,0,W,it,0,0,W,it,rt,n.NEAREST),l===!0&&(ve.length=0,z.length=0,ve.push(n.COLOR_ATTACHMENT0+xt),A.depthBuffer&&A.resolveDepthBuffer===!1&&(ve.push(tt),z.push(tt),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,z)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,ve))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),gt)for(let xt=0;xt<w.length;xt++){e.bindFramebuffer(n.FRAMEBUFFER,Tt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+xt,n.RENDERBUFFER,Tt.__webglColorRenderbuffer[xt]);const Jt=i.get(w[xt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,Tt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+xt,n.TEXTURE_2D,Jt,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,Tt.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&l){const w=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[w])}}}function Yt(A){return Math.min(s.maxSamples,A.samples)}function $t(A){const w=i.get(A);return A.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function Dt(A){const w=o.render.frame;d.get(A)!==w&&(d.set(A,w),A.update())}function oe(A,w){const W=A.colorSpace,it=A.format,rt=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||W!==as&&W!==$n&&(jt.getTransfer(W)===le?(it!==dn||rt!==In)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",W)),w}function It(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=G,this.resetTextureUnits=I,this.setTexture2D=et,this.setTexture2DArray=K,this.setTexture3D=st,this.setTextureCube=$,this.rebindTextures=qt,this.setupRenderTarget=se,this.updateRenderTargetMipmap=Kt,this.updateMultisampleRenderTarget=ze,this.setupDepthRenderbuffer=zt,this.setupFrameBufferTexture=Et,this.useMultisampledRTT=$t}function Sm(n,t){function e(i,s=$n){let r;const o=jt.getTransfer(s);if(i===In)return n.UNSIGNED_BYTE;if(i===Aa)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Ca)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Mc)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===_c)return n.BYTE;if(i===vc)return n.SHORT;if(i===Us)return n.UNSIGNED_SHORT;if(i===Ta)return n.INT;if(i===yi)return n.UNSIGNED_INT;if(i===Cn)return n.FLOAT;if(i===Os)return n.HALF_FLOAT;if(i===yc)return n.ALPHA;if(i===Sc)return n.RGB;if(i===dn)return n.RGBA;if(i===xc)return n.LUMINANCE;if(i===wc)return n.LUMINANCE_ALPHA;if(i===Ji)return n.DEPTH_COMPONENT;if(i===rs)return n.DEPTH_STENCIL;if(i===Ec)return n.RED;if(i===Ra)return n.RED_INTEGER;if(i===bc)return n.RG;if(i===Pa)return n.RG_INTEGER;if(i===La)return n.RGBA_INTEGER;if(i===vr||i===Mr||i===yr||i===Sr)if(o===le)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===vr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Mr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===yr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Sr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===vr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Mr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===yr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Sr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Xo||i===qo||i===Yo||i===$o)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Xo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===qo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Yo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===$o)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Zo||i===Ko||i===Jo)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Zo||i===Ko)return o===le?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Jo)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===jo||i===Qo||i===ta||i===ea||i===na||i===ia||i===sa||i===ra||i===oa||i===aa||i===la||i===ca||i===ua||i===da)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===jo)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Qo)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===ta)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===ea)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===na)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===ia)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===sa)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===ra)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===oa)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===aa)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===la)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===ca)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===ua)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===da)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===xr||i===ha||i===fa)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===xr)return o===le?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===ha)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===fa)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Tc||i===pa||i===ma||i===ga)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===xr)return r.COMPRESSED_RED_RGTC1_EXT;if(i===pa)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===ma)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===ga)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===ss?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}class xm extends he{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Ft extends Ae{constructor(){super(),this.isGroup=!0,this.type="Group"}}const wm={type:"move"};class go{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ft,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ft,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new b,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new b),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ft,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new b,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new b),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const v of t.hand.values()){const m=e.getJointPose(v,i),p=this._getHandJoint(c,v);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const d=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],h=d.position.distanceTo(u.position),f=.02,g=.005;c.inputState.pinching&&h>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&h<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(wm)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new Ft;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}const Em=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,bm=`
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

}`;class Tm{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){const s=new Ge,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=i.depthNear||e.depthFar!=i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new Un({vertexShader:Em,fragmentShader:bm,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new U(new Zt(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Am extends ls{constructor(t,e){super();const i=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,d=null,u=null,h=null,f=null,g=null;const v=new Tm,m=e.getContextAttributes();let p=null,S=null;const x=[],_=[],L=new wt;let T=null;const R=new he;R.viewport=new ce;const P=new he;P.viewport=new ce;const M=[R,P],y=new xm;let C=null,I=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Q){let dt=x[Q];return dt===void 0&&(dt=new go,x[Q]=dt),dt.getTargetRaySpace()},this.getControllerGrip=function(Q){let dt=x[Q];return dt===void 0&&(dt=new go,x[Q]=dt),dt.getGripSpace()},this.getHand=function(Q){let dt=x[Q];return dt===void 0&&(dt=new go,x[Q]=dt),dt.getHandSpace()};function G(Q){const dt=_.indexOf(Q.inputSource);if(dt===-1)return;const Et=x[dt];Et!==void 0&&(Et.update(Q.inputSource,Q.frame,c||o),Et.dispatchEvent({type:Q.type,data:Q.inputSource}))}function J(){s.removeEventListener("select",G),s.removeEventListener("selectstart",G),s.removeEventListener("selectend",G),s.removeEventListener("squeeze",G),s.removeEventListener("squeezestart",G),s.removeEventListener("squeezeend",G),s.removeEventListener("end",J),s.removeEventListener("inputsourceschange",et);for(let Q=0;Q<x.length;Q++){const dt=_[Q];dt!==null&&(_[Q]=null,x[Q].disconnect(dt))}C=null,I=null,v.reset(),t.setRenderTarget(p),f=null,h=null,u=null,s=null,S=null,ee.stop(),i.isPresenting=!1,t.setPixelRatio(T),t.setSize(L.width,L.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Q){r=Q,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Q){a=Q,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(Q){c=Q},this.getBaseLayer=function(){return h!==null?h:f},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(Q){if(s=Q,s!==null){if(p=t.getRenderTarget(),s.addEventListener("select",G),s.addEventListener("selectstart",G),s.addEventListener("selectend",G),s.addEventListener("squeeze",G),s.addEventListener("squeezestart",G),s.addEventListener("squeezeend",G),s.addEventListener("end",J),s.addEventListener("inputsourceschange",et),m.xrCompatible!==!0&&await e.makeXRCompatible(),T=t.getPixelRatio(),t.getSize(L),s.renderState.layers===void 0){const dt={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,dt),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),S=new Si(f.framebufferWidth,f.framebufferHeight,{format:dn,type:In,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let dt=null,Et=null,mt=null;m.depth&&(mt=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,dt=m.stencil?rs:Ji,Et=m.stencil?ss:yi);const Ut={colorFormat:e.RGBA8,depthFormat:mt,scaleFactor:r};u=new XRWebGLBinding(s,e),h=u.createProjectionLayer(Ut),s.updateRenderState({layers:[h]}),t.setPixelRatio(1),t.setSize(h.textureWidth,h.textureHeight,!1),S=new Si(h.textureWidth,h.textureHeight,{format:dn,type:In,depthTexture:new Bc(h.textureWidth,h.textureHeight,Et,void 0,void 0,void 0,void 0,void 0,void 0,dt),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),ee.setContext(s),ee.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function et(Q){for(let dt=0;dt<Q.removed.length;dt++){const Et=Q.removed[dt],mt=_.indexOf(Et);mt>=0&&(_[mt]=null,x[mt].disconnect(Et))}for(let dt=0;dt<Q.added.length;dt++){const Et=Q.added[dt];let mt=_.indexOf(Et);if(mt===-1){for(let zt=0;zt<x.length;zt++)if(zt>=_.length){_.push(Et),mt=zt;break}else if(_[zt]===null){_[zt]=Et,mt=zt;break}if(mt===-1)break}const Ut=x[mt];Ut&&Ut.connect(Et)}}const K=new b,st=new b;function $(Q,dt,Et){K.setFromMatrixPosition(dt.matrixWorld),st.setFromMatrixPosition(Et.matrixWorld);const mt=K.distanceTo(st),Ut=dt.projectionMatrix.elements,zt=Et.projectionMatrix.elements,qt=Ut[14]/(Ut[10]-1),se=Ut[14]/(Ut[10]+1),Kt=(Ut[9]+1)/Ut[5],ve=(Ut[9]-1)/Ut[5],z=(Ut[8]-1)/Ut[0],ze=(zt[8]+1)/zt[0],Yt=qt*z,$t=qt*ze,Dt=mt/(-z+ze),oe=Dt*-z;if(dt.matrixWorld.decompose(Q.position,Q.quaternion,Q.scale),Q.translateX(oe),Q.translateZ(Dt),Q.matrixWorld.compose(Q.position,Q.quaternion,Q.scale),Q.matrixWorldInverse.copy(Q.matrixWorld).invert(),Ut[10]===-1)Q.projectionMatrix.copy(dt.projectionMatrix),Q.projectionMatrixInverse.copy(dt.projectionMatrixInverse);else{const It=qt+Dt,A=se+Dt,w=Yt-oe,W=$t+(mt-oe),it=Kt*se/A*It,rt=ve*se/A*It;Q.projectionMatrix.makePerspective(w,W,it,rt,It,A),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert()}}function ht(Q,dt){dt===null?Q.matrixWorld.copy(Q.matrix):Q.matrixWorld.multiplyMatrices(dt.matrixWorld,Q.matrix),Q.matrixWorldInverse.copy(Q.matrixWorld).invert()}this.updateCamera=function(Q){if(s===null)return;let dt=Q.near,Et=Q.far;v.texture!==null&&(v.depthNear>0&&(dt=v.depthNear),v.depthFar>0&&(Et=v.depthFar)),y.near=P.near=R.near=dt,y.far=P.far=R.far=Et,(C!==y.near||I!==y.far)&&(s.updateRenderState({depthNear:y.near,depthFar:y.far}),C=y.near,I=y.far),R.layers.mask=Q.layers.mask|2,P.layers.mask=Q.layers.mask|4,y.layers.mask=R.layers.mask|P.layers.mask;const mt=Q.parent,Ut=y.cameras;ht(y,mt);for(let zt=0;zt<Ut.length;zt++)ht(Ut[zt],mt);Ut.length===2?$(y,R,P):y.projectionMatrix.copy(R.projectionMatrix),ft(Q,y,mt)};function ft(Q,dt,Et){Et===null?Q.matrix.copy(dt.matrixWorld):(Q.matrix.copy(Et.matrixWorld),Q.matrix.invert(),Q.matrix.multiply(dt.matrixWorld)),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.updateMatrixWorld(!0),Q.projectionMatrix.copy(dt.projectionMatrix),Q.projectionMatrixInverse.copy(dt.projectionMatrixInverse),Q.isPerspectiveCamera&&(Q.fov=Ns*2*Math.atan(1/Q.projectionMatrix.elements[5]),Q.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(h===null&&f===null))return l},this.setFoveation=function(Q){l=Q,h!==null&&(h.fixedFoveation=Q),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Q)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(y)};let Pt=null;function Gt(Q,dt){if(d=dt.getViewerPose(c||o),g=dt,d!==null){const Et=d.views;f!==null&&(t.setRenderTargetFramebuffer(S,f.framebuffer),t.setRenderTarget(S));let mt=!1;Et.length!==y.cameras.length&&(y.cameras.length=0,mt=!0);for(let zt=0;zt<Et.length;zt++){const qt=Et[zt];let se=null;if(f!==null)se=f.getViewport(qt);else{const ve=u.getViewSubImage(h,qt);se=ve.viewport,zt===0&&(t.setRenderTargetTextures(S,ve.colorTexture,h.ignoreDepthValues?void 0:ve.depthStencilTexture),t.setRenderTarget(S))}let Kt=M[zt];Kt===void 0&&(Kt=new he,Kt.layers.enable(zt),Kt.viewport=new ce,M[zt]=Kt),Kt.matrix.fromArray(qt.transform.matrix),Kt.matrix.decompose(Kt.position,Kt.quaternion,Kt.scale),Kt.projectionMatrix.fromArray(qt.projectionMatrix),Kt.projectionMatrixInverse.copy(Kt.projectionMatrix).invert(),Kt.viewport.set(se.x,se.y,se.width,se.height),zt===0&&(y.matrix.copy(Kt.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),mt===!0&&y.cameras.push(Kt)}const Ut=s.enabledFeatures;if(Ut&&Ut.includes("depth-sensing")){const zt=u.getDepthInformation(Et[0]);zt&&zt.isValid&&zt.texture&&v.init(t,zt,s.renderState)}}for(let Et=0;Et<x.length;Et++){const mt=_[Et],Ut=x[Et];mt!==null&&Ut!==void 0&&Ut.update(mt,dt,c||o)}Pt&&Pt(Q,dt),dt.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:dt}),g=null}const ee=new Oc;ee.setAnimationLoop(Gt),this.setAnimationLoop=function(Q){Pt=Q},this.dispose=function(){}}}const li=new fn,Cm=new ue;function Rm(n,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,Uc(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,S,x,_){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),d(m,p)):p.isMeshStandardMaterial?(r(m,p),h(m,p),p.isMeshPhysicalMaterial&&f(m,p,_)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),v(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,S,x):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Oe&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Oe&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const S=t.get(p),x=S.envMap,_=S.envMapRotation;x&&(m.envMap.value=x,li.copy(_),li.x*=-1,li.y*=-1,li.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(li.y*=-1,li.z*=-1),m.envMapRotation.value.setFromMatrix4(Cm.makeRotationFromEuler(li)),m.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,S,x){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*S,m.scale.value=x*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function d(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function h(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,S){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Oe&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=S.texture,m.transmissionSamplerSize.value.set(S.width,S.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function v(m,p){const S=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(S.matrixWorld),m.nearDistance.value=S.shadow.camera.near,m.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function Pm(n,t,e,i){let s={},r={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,x){const _=x.program;i.uniformBlockBinding(S,_)}function c(S,x){let _=s[S.id];_===void 0&&(g(S),_=d(S),s[S.id]=_,S.addEventListener("dispose",m));const L=x.program;i.updateUBOMapping(S,L);const T=t.render.frame;r[S.id]!==T&&(h(S),r[S.id]=T)}function d(S){const x=u();S.__bindingPointIndex=x;const _=n.createBuffer(),L=S.__size,T=S.usage;return n.bindBuffer(n.UNIFORM_BUFFER,_),n.bufferData(n.UNIFORM_BUFFER,L,T),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,x,_),_}function u(){for(let S=0;S<a;S++)if(o.indexOf(S)===-1)return o.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(S){const x=s[S.id],_=S.uniforms,L=S.__cache;n.bindBuffer(n.UNIFORM_BUFFER,x);for(let T=0,R=_.length;T<R;T++){const P=Array.isArray(_[T])?_[T]:[_[T]];for(let M=0,y=P.length;M<y;M++){const C=P[M];if(f(C,T,M,L)===!0){const I=C.__offset,G=Array.isArray(C.value)?C.value:[C.value];let J=0;for(let et=0;et<G.length;et++){const K=G[et],st=v(K);typeof K=="number"||typeof K=="boolean"?(C.__data[0]=K,n.bufferSubData(n.UNIFORM_BUFFER,I+J,C.__data)):K.isMatrix3?(C.__data[0]=K.elements[0],C.__data[1]=K.elements[1],C.__data[2]=K.elements[2],C.__data[3]=0,C.__data[4]=K.elements[3],C.__data[5]=K.elements[4],C.__data[6]=K.elements[5],C.__data[7]=0,C.__data[8]=K.elements[6],C.__data[9]=K.elements[7],C.__data[10]=K.elements[8],C.__data[11]=0):(K.toArray(C.__data,J),J+=st.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,I,C.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(S,x,_,L){const T=S.value,R=x+"_"+_;if(L[R]===void 0)return typeof T=="number"||typeof T=="boolean"?L[R]=T:L[R]=T.clone(),!0;{const P=L[R];if(typeof T=="number"||typeof T=="boolean"){if(P!==T)return L[R]=T,!0}else if(P.equals(T)===!1)return P.copy(T),!0}return!1}function g(S){const x=S.uniforms;let _=0;const L=16;for(let R=0,P=x.length;R<P;R++){const M=Array.isArray(x[R])?x[R]:[x[R]];for(let y=0,C=M.length;y<C;y++){const I=M[y],G=Array.isArray(I.value)?I.value:[I.value];for(let J=0,et=G.length;J<et;J++){const K=G[J],st=v(K),$=_%L,ht=$%st.boundary,ft=$+ht;_+=ht,ft!==0&&L-ft<st.storage&&(_+=L-ft),I.__data=new Float32Array(st.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=_,_+=st.storage}}}const T=_%L;return T>0&&(_+=L-T),S.__size=_,S.__cache={},this}function v(S){const x={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(x.boundary=4,x.storage=4):S.isVector2?(x.boundary=8,x.storage=8):S.isVector3||S.isColor?(x.boundary=16,x.storage=12):S.isVector4?(x.boundary=16,x.storage=16):S.isMatrix3?(x.boundary=48,x.storage=48):S.isMatrix4?(x.boundary=64,x.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),x}function m(S){const x=S.target;x.removeEventListener("dispose",m);const _=o.indexOf(x.__bindingPointIndex);o.splice(_,1),n.deleteBuffer(s[x.id]),delete s[x.id],delete r[x.id]}function p(){for(const S in s)n.deleteBuffer(s[S]);o=[],s={},r={}}return{bind:l,update:c,dispose:p}}class Oa{constructor(t={}){const{canvas:e=vd(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:h=!1}=t;this.isWebGLRenderer=!0;let f;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=i.getContextAttributes().alpha}else f=o;const g=new Uint32Array(4),v=new Int32Array(4);let m=null,p=null;const S=[],x=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=_e,this.toneMapping=jn,this.toneMappingExposure=1;const _=this;let L=!1,T=0,R=0,P=null,M=-1,y=null;const C=new ce,I=new ce;let G=null;const J=new Nt(0);let et=0,K=e.width,st=e.height,$=1,ht=null,ft=null;const Pt=new ce(0,0,K,st),Gt=new ce(0,0,K,st);let ee=!1;const Q=new Na;let dt=!1,Et=!1;const mt=new ue,Ut=new ue,zt=new b,qt=new ce,se={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Kt=!1;function ve(){return P===null?$:1}let z=i;function ze(E,O){return e.getContext(E,O)}try{const E={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Ea}`),e.addEventListener("webglcontextlost",nt,!1),e.addEventListener("webglcontextrestored",vt,!1),e.addEventListener("webglcontextcreationerror",_t,!1),z===null){const O="webgl2";if(z=ze(O,E),z===null)throw ze(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let Yt,$t,Dt,oe,It,A,w,W,it,rt,tt,Tt,gt,xt,Jt,at,N,k,V,H,Z,ot,lt,D;function ct(){Yt=new Fp(z),Yt.init(),ot=new Sm(z,Yt),$t=new Pp(z,Yt,t,ot),Dt=new vm(z,Yt),$t.reverseDepthBuffer&&h&&Dt.buffers.depth.setReversed(!0),oe=new Bp(z),It=new im,A=new ym(z,Yt,Dt,It,$t,ot,oe),w=new Dp(_),W=new Np(_),it=new Xd(z),lt=new Cp(z,it),rt=new Op(z,it,oe,lt),tt=new Gp(z,rt,it,oe),V=new kp(z,$t,A),at=new Lp(It),Tt=new nm(_,w,W,Yt,$t,lt,at),gt=new Rm(_,It),xt=new rm,Jt=new dm(Yt),k=new Ap(_,w,W,Dt,tt,f,l),N=new gm(_,tt,$t),D=new Pm(z,oe,$t,Dt),H=new Rp(z,Yt,oe),Z=new zp(z,Yt,oe),oe.programs=Tt.programs,_.capabilities=$t,_.extensions=Yt,_.properties=It,_.renderLists=xt,_.shadowMap=N,_.state=Dt,_.info=oe}ct();const Y=new Am(_,z);this.xr=Y,this.getContext=function(){return z},this.getContextAttributes=function(){return z.getContextAttributes()},this.forceContextLoss=function(){const E=Yt.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=Yt.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return $},this.setPixelRatio=function(E){E!==void 0&&($=E,this.setSize(K,st,!1))},this.getSize=function(E){return E.set(K,st)},this.setSize=function(E,O,X=!0){if(Y.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}K=E,st=O,e.width=Math.floor(E*$),e.height=Math.floor(O*$),X===!0&&(e.style.width=E+"px",e.style.height=O+"px"),this.setViewport(0,0,E,O)},this.getDrawingBufferSize=function(E){return E.set(K*$,st*$).floor()},this.setDrawingBufferSize=function(E,O,X){K=E,st=O,$=X,e.width=Math.floor(E*X),e.height=Math.floor(O*X),this.setViewport(0,0,E,O)},this.getCurrentViewport=function(E){return E.copy(C)},this.getViewport=function(E){return E.copy(Pt)},this.setViewport=function(E,O,X,q){E.isVector4?Pt.set(E.x,E.y,E.z,E.w):Pt.set(E,O,X,q),Dt.viewport(C.copy(Pt).multiplyScalar($).round())},this.getScissor=function(E){return E.copy(Gt)},this.setScissor=function(E,O,X,q){E.isVector4?Gt.set(E.x,E.y,E.z,E.w):Gt.set(E,O,X,q),Dt.scissor(I.copy(Gt).multiplyScalar($).round())},this.getScissorTest=function(){return ee},this.setScissorTest=function(E){Dt.setScissorTest(ee=E)},this.setOpaqueSort=function(E){ht=E},this.setTransparentSort=function(E){ft=E},this.getClearColor=function(E){return E.copy(k.getClearColor())},this.setClearColor=function(){k.setClearColor.apply(k,arguments)},this.getClearAlpha=function(){return k.getClearAlpha()},this.setClearAlpha=function(){k.setClearAlpha.apply(k,arguments)},this.clear=function(E=!0,O=!0,X=!0){let q=0;if(E){let B=!1;if(P!==null){const ut=P.texture.format;B=ut===La||ut===Pa||ut===Ra}if(B){const ut=P.texture.type,Mt=ut===In||ut===yi||ut===Us||ut===ss||ut===Aa||ut===Ca,At=k.getClearColor(),Ct=k.getClearAlpha(),kt=At.r,Ht=At.g,Rt=At.b;Mt?(g[0]=kt,g[1]=Ht,g[2]=Rt,g[3]=Ct,z.clearBufferuiv(z.COLOR,0,g)):(v[0]=kt,v[1]=Ht,v[2]=Rt,v[3]=Ct,z.clearBufferiv(z.COLOR,0,v))}else q|=z.COLOR_BUFFER_BIT}O&&(q|=z.DEPTH_BUFFER_BIT),X&&(q|=z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z.clear(q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",nt,!1),e.removeEventListener("webglcontextrestored",vt,!1),e.removeEventListener("webglcontextcreationerror",_t,!1),xt.dispose(),Jt.dispose(),It.dispose(),w.dispose(),W.dispose(),tt.dispose(),lt.dispose(),D.dispose(),Tt.dispose(),Y.dispose(),Y.removeEventListener("sessionstart",Ee),Y.removeEventListener("sessionend",rn),Qe.stop()};function nt(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),L=!0}function vt(){console.log("THREE.WebGLRenderer: Context Restored."),L=!1;const E=oe.autoReset,O=N.enabled,X=N.autoUpdate,q=N.needsUpdate,B=N.type;ct(),oe.autoReset=E,N.enabled=O,N.autoUpdate=X,N.needsUpdate=q,N.type=B}function _t(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function Bt(E){const O=E.target;O.removeEventListener("dispose",Bt),Me(O)}function Me(E){F(E),It.remove(E)}function F(E){const O=It.get(E).programs;O!==void 0&&(O.forEach(function(X){Tt.releaseProgram(X)}),E.isShaderMaterial&&Tt.releaseShaderCache(E))}this.renderBufferDirect=function(E,O,X,q,B,ut){O===null&&(O=se);const Mt=B.isMesh&&B.matrixWorld.determinant()<0,At=su(E,O,X,q,B);Dt.setMaterial(q,Mt);let Ct=X.index,kt=1;if(q.wireframe===!0){if(Ct=rt.getWireframeAttribute(X),Ct===void 0)return;kt=2}const Ht=X.drawRange,Rt=X.attributes.position;let te=Ht.start*kt,de=(Ht.start+Ht.count)*kt;ut!==null&&(te=Math.max(te,ut.start*kt),de=Math.min(de,(ut.start+ut.count)*kt)),Ct!==null?(te=Math.max(te,0),de=Math.min(de,Ct.count)):Rt!=null&&(te=Math.max(te,0),de=Math.min(de,Rt.count));const me=de-te;if(me<0||me===1/0)return;lt.setup(B,q,At,X,Ct);let He,ne=H;if(Ct!==null&&(He=it.get(Ct),ne=Z,ne.setIndex(He)),B.isMesh)q.wireframe===!0?(Dt.setLineWidth(q.wireframeLinewidth*ve()),ne.setMode(z.LINES)):ne.setMode(z.TRIANGLES);else if(B.isLine){let Lt=q.linewidth;Lt===void 0&&(Lt=1),Dt.setLineWidth(Lt*ve()),B.isLineSegments?ne.setMode(z.LINES):B.isLineLoop?ne.setMode(z.LINE_LOOP):ne.setMode(z.LINE_STRIP)}else B.isPoints?ne.setMode(z.POINTS):B.isSprite&&ne.setMode(z.TRIANGLES);if(B.isBatchedMesh)if(B._multiDrawInstances!==null)ne.renderMultiDrawInstances(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount,B._multiDrawInstances);else if(Yt.get("WEBGL_multi_draw"))ne.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{const Lt=B._multiDrawStarts,Mn=B._multiDrawCounts,ie=B._multiDrawCount,on=Ct?it.get(Ct).bytesPerElement:1,Ri=It.get(q).currentProgram.getUniforms();for(let Xe=0;Xe<ie;Xe++)Ri.setValue(z,"_gl_DrawID",Xe),ne.render(Lt[Xe]/on,Mn[Xe])}else if(B.isInstancedMesh)ne.renderInstances(te,me,B.count);else if(X.isInstancedBufferGeometry){const Lt=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,Mn=Math.min(X.instanceCount,Lt);ne.renderInstances(te,me,Mn)}else ne.render(te,me)};function yt(E,O,X){E.transparent===!0&&E.side===Ke&&E.forceSinglePass===!1?(E.side=Oe,E.needsUpdate=!0,Ci(E,O,X),E.side=Qn,E.needsUpdate=!0,Ci(E,O,X),E.side=Ke):Ci(E,O,X)}this.compile=function(E,O,X=null){X===null&&(X=E),p=Jt.get(X),p.init(O),x.push(p),X.traverseVisible(function(B){B.isLight&&B.layers.test(O.layers)&&(p.pushLight(B),B.castShadow&&p.pushShadow(B))}),E!==X&&E.traverseVisible(function(B){B.isLight&&B.layers.test(O.layers)&&(p.pushLight(B),B.castShadow&&p.pushShadow(B))}),p.setupLights();const q=new Set;return E.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;const ut=B.material;if(ut)if(Array.isArray(ut))for(let Mt=0;Mt<ut.length;Mt++){const At=ut[Mt];yt(At,X,B),q.add(At)}else yt(ut,X,B),q.add(ut)}),x.pop(),p=null,q},this.compileAsync=function(E,O,X=null){const q=this.compile(E,O,X);return new Promise(B=>{function ut(){if(q.forEach(function(Mt){It.get(Mt).currentProgram.isReady()&&q.delete(Mt)}),q.size===0){B(E);return}setTimeout(ut,10)}Yt.get("KHR_parallel_shader_compile")!==null?ut():setTimeout(ut,10)})};let Qt=null;function ye(E){Qt&&Qt(E)}function Ee(){Qe.stop()}function rn(){Qe.start()}const Qe=new Oc;Qe.setAnimationLoop(ye),typeof self<"u"&&Qe.setContext(self),this.setAnimationLoop=function(E){Qt=E,Y.setAnimationLoop(E),E===null?Qe.stop():Qe.start()},Y.addEventListener("sessionstart",Ee),Y.addEventListener("sessionend",rn),this.render=function(E,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),Y.enabled===!0&&Y.isPresenting===!0&&(Y.cameraAutoUpdate===!0&&Y.updateCamera(O),O=Y.getCamera()),E.isScene===!0&&E.onBeforeRender(_,E,O,P),p=Jt.get(E,x.length),p.init(O),x.push(p),Ut.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),Q.setFromProjectionMatrix(Ut),Et=this.localClippingEnabled,dt=at.init(this.clippingPlanes,Et),m=xt.get(E,S.length),m.init(),S.push(m),Y.enabled===!0&&Y.isPresenting===!0){const ut=_.xr.getDepthSensingMesh();ut!==null&&Ti(ut,O,-1/0,_.sortObjects)}Ti(E,O,0,_.sortObjects),m.finish(),_.sortObjects===!0&&m.sort(ht,ft),Kt=Y.enabled===!1||Y.isPresenting===!1||Y.hasDepthSensing()===!1,Kt&&k.addToRenderList(m,E),this.info.render.frame++,dt===!0&&at.beginShadows();const X=p.state.shadowsArray;N.render(X,E,O),dt===!0&&at.endShadows(),this.info.autoReset===!0&&this.info.reset();const q=m.opaque,B=m.transmissive;if(p.setupLights(),O.isArrayCamera){const ut=O.cameras;if(B.length>0)for(let Mt=0,At=ut.length;Mt<At;Mt++){const Ct=ut[Mt];ds(q,B,E,Ct)}Kt&&k.render(E);for(let Mt=0,At=ut.length;Mt<At;Mt++){const Ct=ut[Mt];us(m,E,Ct,Ct.viewport)}}else B.length>0&&ds(q,B,E,O),Kt&&k.render(E),us(m,E,O);P!==null&&(A.updateMultisampleRenderTarget(P),A.updateRenderTargetMipmap(P)),E.isScene===!0&&E.onAfterRender(_,E,O),lt.resetDefaultState(),M=-1,y=null,x.pop(),x.length>0?(p=x[x.length-1],dt===!0&&at.setGlobalState(_.clippingPlanes,p.state.camera)):p=null,S.pop(),S.length>0?m=S[S.length-1]:m=null};function Ti(E,O,X,q){if(E.visible===!1)return;if(E.layers.test(O.layers)){if(E.isGroup)X=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(O);else if(E.isLight)p.pushLight(E),E.castShadow&&p.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||Q.intersectsSprite(E)){q&&qt.setFromMatrixPosition(E.matrixWorld).applyMatrix4(Ut);const Mt=tt.update(E),At=E.material;At.visible&&m.push(E,Mt,At,X,qt.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||Q.intersectsObject(E))){const Mt=tt.update(E),At=E.material;if(q&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),qt.copy(E.boundingSphere.center)):(Mt.boundingSphere===null&&Mt.computeBoundingSphere(),qt.copy(Mt.boundingSphere.center)),qt.applyMatrix4(E.matrixWorld).applyMatrix4(Ut)),Array.isArray(At)){const Ct=Mt.groups;for(let kt=0,Ht=Ct.length;kt<Ht;kt++){const Rt=Ct[kt],te=At[Rt.materialIndex];te&&te.visible&&m.push(E,Mt,te,X,qt.z,Rt)}}else At.visible&&m.push(E,Mt,At,X,qt.z,null)}}const ut=E.children;for(let Mt=0,At=ut.length;Mt<At;Mt++)Ti(ut[Mt],O,X,q)}function us(E,O,X,q){const B=E.opaque,ut=E.transmissive,Mt=E.transparent;p.setupLightsView(X),dt===!0&&at.setGlobalState(_.clippingPlanes,X),q&&Dt.viewport(C.copy(q)),B.length>0&&Ai(B,O,X),ut.length>0&&Ai(ut,O,X),Mt.length>0&&Ai(Mt,O,X),Dt.buffers.depth.setTest(!0),Dt.buffers.depth.setMask(!0),Dt.buffers.color.setMask(!0),Dt.setPolygonOffset(!1)}function ds(E,O,X,q){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[q.id]===void 0&&(p.state.transmissionRenderTarget[q.id]=new Si(1,1,{generateMipmaps:!0,type:Yt.has("EXT_color_buffer_half_float")||Yt.has("EXT_color_buffer_float")?Os:In,minFilter:vi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:jt.workingColorSpace}));const ut=p.state.transmissionRenderTarget[q.id],Mt=q.viewport||C;ut.setSize(Mt.z,Mt.w);const At=_.getRenderTarget();_.setRenderTarget(ut),_.getClearColor(J),et=_.getClearAlpha(),et<1&&_.setClearColor(16777215,.5),_.clear(),Kt&&k.render(X);const Ct=_.toneMapping;_.toneMapping=jn;const kt=q.viewport;if(q.viewport!==void 0&&(q.viewport=void 0),p.setupLightsView(q),dt===!0&&at.setGlobalState(_.clippingPlanes,q),Ai(E,X,q),A.updateMultisampleRenderTarget(ut),A.updateRenderTargetMipmap(ut),Yt.has("WEBGL_multisampled_render_to_texture")===!1){let Ht=!1;for(let Rt=0,te=O.length;Rt<te;Rt++){const de=O[Rt],me=de.object,He=de.geometry,ne=de.material,Lt=de.group;if(ne.side===Ke&&me.layers.test(q.layers)){const Mn=ne.side;ne.side=Oe,ne.needsUpdate=!0,Hs(me,X,q,He,ne,Lt),ne.side=Mn,ne.needsUpdate=!0,Ht=!0}}Ht===!0&&(A.updateMultisampleRenderTarget(ut),A.updateRenderTargetMipmap(ut))}_.setRenderTarget(At),_.setClearColor(J,et),kt!==void 0&&(q.viewport=kt),_.toneMapping=Ct}function Ai(E,O,X){const q=O.isScene===!0?O.overrideMaterial:null;for(let B=0,ut=E.length;B<ut;B++){const Mt=E[B],At=Mt.object,Ct=Mt.geometry,kt=q===null?Mt.material:q,Ht=Mt.group;At.layers.test(X.layers)&&Hs(At,O,X,Ct,kt,Ht)}}function Hs(E,O,X,q,B,ut){E.onBeforeRender(_,O,X,q,B,ut),E.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),B.onBeforeRender(_,O,X,q,E,ut),B.transparent===!0&&B.side===Ke&&B.forceSinglePass===!1?(B.side=Oe,B.needsUpdate=!0,_.renderBufferDirect(X,O,q,B,E,ut),B.side=Qn,B.needsUpdate=!0,_.renderBufferDirect(X,O,q,B,E,ut),B.side=Ke):_.renderBufferDirect(X,O,q,B,E,ut),E.onAfterRender(_,O,X,q,B,ut)}function Ci(E,O,X){O.isScene!==!0&&(O=se);const q=It.get(E),B=p.state.lights,ut=p.state.shadowsArray,Mt=B.state.version,At=Tt.getParameters(E,B.state,ut,O,X),Ct=Tt.getProgramCacheKey(At);let kt=q.programs;q.environment=E.isMeshStandardMaterial?O.environment:null,q.fog=O.fog,q.envMap=(E.isMeshStandardMaterial?W:w).get(E.envMap||q.environment),q.envMapRotation=q.environment!==null&&E.envMap===null?O.environmentRotation:E.envMapRotation,kt===void 0&&(E.addEventListener("dispose",Bt),kt=new Map,q.programs=kt);let Ht=kt.get(Ct);if(Ht!==void 0){if(q.currentProgram===Ht&&q.lightsStateVersion===Mt)return Ya(E,At),Ht}else At.uniforms=Tt.getUniforms(E),E.onBeforeCompile(At,_),Ht=Tt.acquireProgram(At,Ct),kt.set(Ct,Ht),q.uniforms=At.uniforms;const Rt=q.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Rt.clippingPlanes=at.uniform),Ya(E,At),q.needsLights=ou(E),q.lightsStateVersion=Mt,q.needsLights&&(Rt.ambientLightColor.value=B.state.ambient,Rt.lightProbe.value=B.state.probe,Rt.directionalLights.value=B.state.directional,Rt.directionalLightShadows.value=B.state.directionalShadow,Rt.spotLights.value=B.state.spot,Rt.spotLightShadows.value=B.state.spotShadow,Rt.rectAreaLights.value=B.state.rectArea,Rt.ltc_1.value=B.state.rectAreaLTC1,Rt.ltc_2.value=B.state.rectAreaLTC2,Rt.pointLights.value=B.state.point,Rt.pointLightShadows.value=B.state.pointShadow,Rt.hemisphereLights.value=B.state.hemi,Rt.directionalShadowMap.value=B.state.directionalShadowMap,Rt.directionalShadowMatrix.value=B.state.directionalShadowMatrix,Rt.spotShadowMap.value=B.state.spotShadowMap,Rt.spotLightMatrix.value=B.state.spotLightMatrix,Rt.spotLightMap.value=B.state.spotLightMap,Rt.pointShadowMap.value=B.state.pointShadowMap,Rt.pointShadowMatrix.value=B.state.pointShadowMatrix),q.currentProgram=Ht,q.uniformsList=null,Ht}function qa(E){if(E.uniformsList===null){const O=E.currentProgram.getUniforms();E.uniformsList=wr.seqWithValue(O.seq,E.uniforms)}return E.uniformsList}function Ya(E,O){const X=It.get(E);X.outputColorSpace=O.outputColorSpace,X.batching=O.batching,X.batchingColor=O.batchingColor,X.instancing=O.instancing,X.instancingColor=O.instancingColor,X.instancingMorph=O.instancingMorph,X.skinning=O.skinning,X.morphTargets=O.morphTargets,X.morphNormals=O.morphNormals,X.morphColors=O.morphColors,X.morphTargetsCount=O.morphTargetsCount,X.numClippingPlanes=O.numClippingPlanes,X.numIntersection=O.numClipIntersection,X.vertexAlphas=O.vertexAlphas,X.vertexTangents=O.vertexTangents,X.toneMapping=O.toneMapping}function su(E,O,X,q,B){O.isScene!==!0&&(O=se),A.resetTextureUnits();const ut=O.fog,Mt=q.isMeshStandardMaterial?O.environment:null,At=P===null?_.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:as,Ct=(q.isMeshStandardMaterial?W:w).get(q.envMap||Mt),kt=q.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,Ht=!!X.attributes.tangent&&(!!q.normalMap||q.anisotropy>0),Rt=!!X.morphAttributes.position,te=!!X.morphAttributes.normal,de=!!X.morphAttributes.color;let me=jn;q.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(me=_.toneMapping);const He=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,ne=He!==void 0?He.length:0,Lt=It.get(q),Mn=p.state.lights;if(dt===!0&&(Et===!0||E!==y)){const tn=E===y&&q.id===M;at.setState(q,E,tn)}let ie=!1;q.version===Lt.__version?(Lt.needsLights&&Lt.lightsStateVersion!==Mn.state.version||Lt.outputColorSpace!==At||B.isBatchedMesh&&Lt.batching===!1||!B.isBatchedMesh&&Lt.batching===!0||B.isBatchedMesh&&Lt.batchingColor===!0&&B.colorTexture===null||B.isBatchedMesh&&Lt.batchingColor===!1&&B.colorTexture!==null||B.isInstancedMesh&&Lt.instancing===!1||!B.isInstancedMesh&&Lt.instancing===!0||B.isSkinnedMesh&&Lt.skinning===!1||!B.isSkinnedMesh&&Lt.skinning===!0||B.isInstancedMesh&&Lt.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&Lt.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&Lt.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&Lt.instancingMorph===!1&&B.morphTexture!==null||Lt.envMap!==Ct||q.fog===!0&&Lt.fog!==ut||Lt.numClippingPlanes!==void 0&&(Lt.numClippingPlanes!==at.numPlanes||Lt.numIntersection!==at.numIntersection)||Lt.vertexAlphas!==kt||Lt.vertexTangents!==Ht||Lt.morphTargets!==Rt||Lt.morphNormals!==te||Lt.morphColors!==de||Lt.toneMapping!==me||Lt.morphTargetsCount!==ne)&&(ie=!0):(ie=!0,Lt.__version=q.version);let on=Lt.currentProgram;ie===!0&&(on=Ci(q,O,B));let Ri=!1,Xe=!1,hs=!1;const ge=on.getUniforms(),pn=Lt.uniforms;if(Dt.useProgram(on.program)&&(Ri=!0,Xe=!0,hs=!0),q.id!==M&&(M=q.id,Xe=!0),Ri||y!==E){Dt.buffers.depth.getReversed()?(mt.copy(E.projectionMatrix),yd(mt),Sd(mt),ge.setValue(z,"projectionMatrix",mt)):ge.setValue(z,"projectionMatrix",E.projectionMatrix),ge.setValue(z,"viewMatrix",E.matrixWorldInverse);const zn=ge.map.cameraPosition;zn!==void 0&&zn.setValue(z,zt.setFromMatrixPosition(E.matrixWorld)),$t.logarithmicDepthBuffer&&ge.setValue(z,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(q.isMeshPhongMaterial||q.isMeshToonMaterial||q.isMeshLambertMaterial||q.isMeshBasicMaterial||q.isMeshStandardMaterial||q.isShaderMaterial)&&ge.setValue(z,"isOrthographic",E.isOrthographicCamera===!0),y!==E&&(y=E,Xe=!0,hs=!0)}if(B.isSkinnedMesh){ge.setOptional(z,B,"bindMatrix"),ge.setOptional(z,B,"bindMatrixInverse");const tn=B.skeleton;tn&&(tn.boneTexture===null&&tn.computeBoneTexture(),ge.setValue(z,"boneTexture",tn.boneTexture,A))}B.isBatchedMesh&&(ge.setOptional(z,B,"batchingTexture"),ge.setValue(z,"batchingTexture",B._matricesTexture,A),ge.setOptional(z,B,"batchingIdTexture"),ge.setValue(z,"batchingIdTexture",B._indirectTexture,A),ge.setOptional(z,B,"batchingColorTexture"),B._colorsTexture!==null&&ge.setValue(z,"batchingColorTexture",B._colorsTexture,A));const fs=X.morphAttributes;if((fs.position!==void 0||fs.normal!==void 0||fs.color!==void 0)&&V.update(B,X,on),(Xe||Lt.receiveShadow!==B.receiveShadow)&&(Lt.receiveShadow=B.receiveShadow,ge.setValue(z,"receiveShadow",B.receiveShadow)),q.isMeshGouraudMaterial&&q.envMap!==null&&(pn.envMap.value=Ct,pn.flipEnvMap.value=Ct.isCubeTexture&&Ct.isRenderTargetTexture===!1?-1:1),q.isMeshStandardMaterial&&q.envMap===null&&O.environment!==null&&(pn.envMapIntensity.value=O.environmentIntensity),Xe&&(ge.setValue(z,"toneMappingExposure",_.toneMappingExposure),Lt.needsLights&&ru(pn,hs),ut&&q.fog===!0&&gt.refreshFogUniforms(pn,ut),gt.refreshMaterialUniforms(pn,q,$,st,p.state.transmissionRenderTarget[E.id]),wr.upload(z,qa(Lt),pn,A)),q.isShaderMaterial&&q.uniformsNeedUpdate===!0&&(wr.upload(z,qa(Lt),pn,A),q.uniformsNeedUpdate=!1),q.isSpriteMaterial&&ge.setValue(z,"center",B.center),ge.setValue(z,"modelViewMatrix",B.modelViewMatrix),ge.setValue(z,"normalMatrix",B.normalMatrix),ge.setValue(z,"modelMatrix",B.matrixWorld),q.isShaderMaterial||q.isRawShaderMaterial){const tn=q.uniformsGroups;for(let zn=0,Bn=tn.length;zn<Bn;zn++){const $a=tn[zn];D.update($a,on),D.bind($a,on)}}return on}function ru(E,O){E.ambientLightColor.needsUpdate=O,E.lightProbe.needsUpdate=O,E.directionalLights.needsUpdate=O,E.directionalLightShadows.needsUpdate=O,E.pointLights.needsUpdate=O,E.pointLightShadows.needsUpdate=O,E.spotLights.needsUpdate=O,E.spotLightShadows.needsUpdate=O,E.rectAreaLights.needsUpdate=O,E.hemisphereLights.needsUpdate=O}function ou(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(E,O,X){It.get(E.texture).__webglTexture=O,It.get(E.depthTexture).__webglTexture=X;const q=It.get(E);q.__hasExternalTextures=!0,q.__autoAllocateDepthBuffer=X===void 0,q.__autoAllocateDepthBuffer||Yt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),q.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(E,O){const X=It.get(E);X.__webglFramebuffer=O,X.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(E,O=0,X=0){P=E,T=O,R=X;let q=!0,B=null,ut=!1,Mt=!1;if(E){const Ct=It.get(E);if(Ct.__useDefaultFramebuffer!==void 0)Dt.bindFramebuffer(z.FRAMEBUFFER,null),q=!1;else if(Ct.__webglFramebuffer===void 0)A.setupRenderTarget(E);else if(Ct.__hasExternalTextures)A.rebindTextures(E,It.get(E.texture).__webglTexture,It.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const Rt=E.depthTexture;if(Ct.__boundDepthTexture!==Rt){if(Rt!==null&&It.has(Rt)&&(E.width!==Rt.image.width||E.height!==Rt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");A.setupDepthRenderbuffer(E)}}const kt=E.texture;(kt.isData3DTexture||kt.isDataArrayTexture||kt.isCompressedArrayTexture)&&(Mt=!0);const Ht=It.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Ht[O])?B=Ht[O][X]:B=Ht[O],ut=!0):E.samples>0&&A.useMultisampledRTT(E)===!1?B=It.get(E).__webglMultisampledFramebuffer:Array.isArray(Ht)?B=Ht[X]:B=Ht,C.copy(E.viewport),I.copy(E.scissor),G=E.scissorTest}else C.copy(Pt).multiplyScalar($).floor(),I.copy(Gt).multiplyScalar($).floor(),G=ee;if(Dt.bindFramebuffer(z.FRAMEBUFFER,B)&&q&&Dt.drawBuffers(E,B),Dt.viewport(C),Dt.scissor(I),Dt.setScissorTest(G),ut){const Ct=It.get(E.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_CUBE_MAP_POSITIVE_X+O,Ct.__webglTexture,X)}else if(Mt){const Ct=It.get(E.texture),kt=O||0;z.framebufferTextureLayer(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,Ct.__webglTexture,X||0,kt)}M=-1},this.readRenderTargetPixels=function(E,O,X,q,B,ut,Mt){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let At=It.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Mt!==void 0&&(At=At[Mt]),At){Dt.bindFramebuffer(z.FRAMEBUFFER,At);try{const Ct=E.texture,kt=Ct.format,Ht=Ct.type;if(!$t.textureFormatReadable(kt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!$t.textureTypeReadable(Ht)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=E.width-q&&X>=0&&X<=E.height-B&&z.readPixels(O,X,q,B,ot.convert(kt),ot.convert(Ht),ut)}finally{const Ct=P!==null?It.get(P).__webglFramebuffer:null;Dt.bindFramebuffer(z.FRAMEBUFFER,Ct)}}},this.readRenderTargetPixelsAsync=async function(E,O,X,q,B,ut,Mt){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let At=It.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Mt!==void 0&&(At=At[Mt]),At){const Ct=E.texture,kt=Ct.format,Ht=Ct.type;if(!$t.textureFormatReadable(kt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!$t.textureTypeReadable(Ht))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(O>=0&&O<=E.width-q&&X>=0&&X<=E.height-B){Dt.bindFramebuffer(z.FRAMEBUFFER,At);const Rt=z.createBuffer();z.bindBuffer(z.PIXEL_PACK_BUFFER,Rt),z.bufferData(z.PIXEL_PACK_BUFFER,ut.byteLength,z.STREAM_READ),z.readPixels(O,X,q,B,ot.convert(kt),ot.convert(Ht),0);const te=P!==null?It.get(P).__webglFramebuffer:null;Dt.bindFramebuffer(z.FRAMEBUFFER,te);const de=z.fenceSync(z.SYNC_GPU_COMMANDS_COMPLETE,0);return z.flush(),await Md(z,de,4),z.bindBuffer(z.PIXEL_PACK_BUFFER,Rt),z.getBufferSubData(z.PIXEL_PACK_BUFFER,0,ut),z.deleteBuffer(Rt),z.deleteSync(de),ut}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(E,O=null,X=0){E.isTexture!==!0&&(Es("WebGLRenderer: copyFramebufferToTexture function signature has changed."),O=arguments[0]||null,E=arguments[1]);const q=Math.pow(2,-X),B=Math.floor(E.image.width*q),ut=Math.floor(E.image.height*q),Mt=O!==null?O.x:0,At=O!==null?O.y:0;A.setTexture2D(E,0),z.copyTexSubImage2D(z.TEXTURE_2D,X,0,0,Mt,At,B,ut),Dt.unbindTexture()},this.copyTextureToTexture=function(E,O,X=null,q=null,B=0){E.isTexture!==!0&&(Es("WebGLRenderer: copyTextureToTexture function signature has changed."),q=arguments[0]||null,E=arguments[1],O=arguments[2],B=arguments[3]||0,X=null);let ut,Mt,At,Ct,kt,Ht,Rt,te,de;const me=E.isCompressedTexture?E.mipmaps[B]:E.image;X!==null?(ut=X.max.x-X.min.x,Mt=X.max.y-X.min.y,At=X.isBox3?X.max.z-X.min.z:1,Ct=X.min.x,kt=X.min.y,Ht=X.isBox3?X.min.z:0):(ut=me.width,Mt=me.height,At=me.depth||1,Ct=0,kt=0,Ht=0),q!==null?(Rt=q.x,te=q.y,de=q.z):(Rt=0,te=0,de=0);const He=ot.convert(O.format),ne=ot.convert(O.type);let Lt;O.isData3DTexture?(A.setTexture3D(O,0),Lt=z.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(A.setTexture2DArray(O,0),Lt=z.TEXTURE_2D_ARRAY):(A.setTexture2D(O,0),Lt=z.TEXTURE_2D),z.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,O.flipY),z.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),z.pixelStorei(z.UNPACK_ALIGNMENT,O.unpackAlignment);const Mn=z.getParameter(z.UNPACK_ROW_LENGTH),ie=z.getParameter(z.UNPACK_IMAGE_HEIGHT),on=z.getParameter(z.UNPACK_SKIP_PIXELS),Ri=z.getParameter(z.UNPACK_SKIP_ROWS),Xe=z.getParameter(z.UNPACK_SKIP_IMAGES);z.pixelStorei(z.UNPACK_ROW_LENGTH,me.width),z.pixelStorei(z.UNPACK_IMAGE_HEIGHT,me.height),z.pixelStorei(z.UNPACK_SKIP_PIXELS,Ct),z.pixelStorei(z.UNPACK_SKIP_ROWS,kt),z.pixelStorei(z.UNPACK_SKIP_IMAGES,Ht);const hs=E.isDataArrayTexture||E.isData3DTexture,ge=O.isDataArrayTexture||O.isData3DTexture;if(E.isRenderTargetTexture||E.isDepthTexture){const pn=It.get(E),fs=It.get(O),tn=It.get(pn.__renderTarget),zn=It.get(fs.__renderTarget);Dt.bindFramebuffer(z.READ_FRAMEBUFFER,tn.__webglFramebuffer),Dt.bindFramebuffer(z.DRAW_FRAMEBUFFER,zn.__webglFramebuffer);for(let Bn=0;Bn<At;Bn++)hs&&z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,It.get(E).__webglTexture,B,Ht+Bn),E.isDepthTexture?(ge&&z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,It.get(O).__webglTexture,B,de+Bn),z.blitFramebuffer(Ct,kt,ut,Mt,Rt,te,ut,Mt,z.DEPTH_BUFFER_BIT,z.NEAREST)):ge?z.copyTexSubImage3D(Lt,B,Rt,te,de+Bn,Ct,kt,ut,Mt):z.copyTexSubImage2D(Lt,B,Rt,te,de+Bn,Ct,kt,ut,Mt);Dt.bindFramebuffer(z.READ_FRAMEBUFFER,null),Dt.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else ge?E.isDataTexture||E.isData3DTexture?z.texSubImage3D(Lt,B,Rt,te,de,ut,Mt,At,He,ne,me.data):O.isCompressedArrayTexture?z.compressedTexSubImage3D(Lt,B,Rt,te,de,ut,Mt,At,He,me.data):z.texSubImage3D(Lt,B,Rt,te,de,ut,Mt,At,He,ne,me):E.isDataTexture?z.texSubImage2D(z.TEXTURE_2D,B,Rt,te,ut,Mt,He,ne,me.data):E.isCompressedTexture?z.compressedTexSubImage2D(z.TEXTURE_2D,B,Rt,te,me.width,me.height,He,me.data):z.texSubImage2D(z.TEXTURE_2D,B,Rt,te,ut,Mt,He,ne,me);z.pixelStorei(z.UNPACK_ROW_LENGTH,Mn),z.pixelStorei(z.UNPACK_IMAGE_HEIGHT,ie),z.pixelStorei(z.UNPACK_SKIP_PIXELS,on),z.pixelStorei(z.UNPACK_SKIP_ROWS,Ri),z.pixelStorei(z.UNPACK_SKIP_IMAGES,Xe),B===0&&O.generateMipmaps&&z.generateMipmap(Lt),Dt.unbindTexture()},this.copyTextureToTexture3D=function(E,O,X=null,q=null,B=0){return E.isTexture!==!0&&(Es("WebGLRenderer: copyTextureToTexture3D function signature has changed."),X=arguments[0]||null,q=arguments[1]||null,E=arguments[2],O=arguments[3],B=arguments[4]||0),Es('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(E,O,X,q,B)},this.initRenderTarget=function(E){It.get(E).__webglFramebuffer===void 0&&A.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?A.setTextureCube(E,0):E.isData3DTexture?A.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?A.setTexture2DArray(E,0):A.setTexture2D(E,0),Dt.unbindTexture()},this.resetState=function(){T=0,R=0,P=null,Dt.reset(),lt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Rn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=jt._getDrawingBufferColorSpace(t),e.unpackColorSpace=jt._getUnpackColorSpace()}}class Zn{constructor(t,e=1,i=1e3){this.isFog=!0,this.name="",this.color=new Nt(t),this.near=e,this.far=i}clone(){return new Zn(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class za extends Ae{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new fn,this.environmentIntensity=1,this.environmentRotation=new fn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Lm{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=_a,this.updateRanges=[],this.version=0,this.uuid=Pn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,i){t*=this.stride,i*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[i+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Pn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(e,this.stride);return i.setUsage(this.usage),i}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Pn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Be=new b;class Ar{constructor(t,e,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,i=this.data.count;e<i;e++)Be.fromBufferAttribute(this,e),Be.applyMatrix4(t),this.setXYZ(e,Be.x,Be.y,Be.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Be.fromBufferAttribute(this,e),Be.applyNormalMatrix(t),this.setXYZ(e,Be.x,Be.y,Be.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Be.fromBufferAttribute(this,e),Be.transformDirection(t),this.setXYZ(e,Be.x,Be.y,Be.z);return this}getComponent(t,e){let i=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(i=un(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=re(i,this.array)),this.data.array[t*this.data.stride+this.offset+e]=i,this}setX(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=un(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=un(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=un(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=un(e,this.array)),e}setXY(t,e,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=re(e,this.array),i=re(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this}setXYZ(t,e,i,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=re(e,this.array),i=re(i,this.array),s=re(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=re(e,this.array),i=re(i,this.array),s=re(s,this.array),r=re(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new De(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Ar(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class ei extends Fn{static get type(){return"SpriteMaterial"}constructor(t){super(),this.isSpriteMaterial=!0,this.color=new Nt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let Wi;const vs=new b,Xi=new b,qi=new b,Yi=new wt,Ms=new wt,Wc=new ue,ur=new b,ys=new b,dr=new b,Kl=new wt,_o=new wt,Jl=new wt;class xi extends Ae{constructor(t=new ei){if(super(),this.isSprite=!0,this.type="Sprite",Wi===void 0){Wi=new xe;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new Lm(e,5);Wi.setIndex([0,1,2,0,2,3]),Wi.setAttribute("position",new Ar(i,3,0,!1)),Wi.setAttribute("uv",new Ar(i,2,3,!1))}this.geometry=Wi,this.material=t,this.center=new wt(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Xi.setFromMatrixScale(this.matrixWorld),Wc.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),qi.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Xi.multiplyScalar(-qi.z);const i=this.material.rotation;let s,r;i!==0&&(r=Math.cos(i),s=Math.sin(i));const o=this.center;hr(ur.set(-.5,-.5,0),qi,o,Xi,s,r),hr(ys.set(.5,-.5,0),qi,o,Xi,s,r),hr(dr.set(.5,.5,0),qi,o,Xi,s,r),Kl.set(0,0),_o.set(1,0),Jl.set(1,1);let a=t.ray.intersectTriangle(ur,ys,dr,!1,vs);if(a===null&&(hr(ys.set(-.5,.5,0),qi,o,Xi,s,r),_o.set(0,1),a=t.ray.intersectTriangle(ur,dr,ys,!1,vs),a===null))return;const l=t.ray.origin.distanceTo(vs);l<t.near||l>t.far||e.push({distance:l,point:vs.clone(),uv:nn.getInterpolation(vs,ur,ys,dr,Kl,_o,Jl,new wt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function hr(n,t,e,i,s,r){Yi.subVectors(n,e).addScalar(.5).multiply(i),s!==void 0?(Ms.x=r*Yi.x-s*Yi.y,Ms.y=s*Yi.x+r*Yi.y):Ms.copy(Yi),n.copy(t),n.x+=Ms.x,n.y+=Ms.y,n.applyMatrix4(Wc)}class Ba extends Fn{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new Nt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Cr=new b,Rr=new b,jl=new ue,Ss=new Or,fr=new ks,vo=new b,Ql=new b;class Xc extends Ae{constructor(t=new xe,e=new Ba){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[0];for(let s=1,r=e.count;s<r;s++)Cr.fromBufferAttribute(e,s-1),Rr.fromBufferAttribute(e,s),i[s]=i[s-1],i[s]+=Cr.distanceTo(Rr);t.setAttribute("lineDistance",new fe(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const i=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),fr.copy(i.boundingSphere),fr.applyMatrix4(s),fr.radius+=r,t.ray.intersectsSphere(fr)===!1)return;jl.copy(s).invert(),Ss.copy(t.ray).applyMatrix4(jl);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,d=i.index,h=i.attributes.position;if(d!==null){const f=Math.max(0,o.start),g=Math.min(d.count,o.start+o.count);for(let v=f,m=g-1;v<m;v+=c){const p=d.getX(v),S=d.getX(v+1),x=pr(this,t,Ss,l,p,S);x&&e.push(x)}if(this.isLineLoop){const v=d.getX(g-1),m=d.getX(f),p=pr(this,t,Ss,l,v,m);p&&e.push(p)}}else{const f=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let v=f,m=g-1;v<m;v+=c){const p=pr(this,t,Ss,l,v,v+1);p&&e.push(p)}if(this.isLineLoop){const v=pr(this,t,Ss,l,g-1,f);v&&e.push(v)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function pr(n,t,e,i,s,r){const o=n.geometry.attributes.position;if(Cr.fromBufferAttribute(o,s),Rr.fromBufferAttribute(o,r),e.distanceSqToSegment(Cr,Rr,vo,Ql)>i)return;vo.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(vo);if(!(l<t.near||l>t.far))return{distance:l,point:Ql.clone().applyMatrix4(n.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:n}}class Br extends Fn{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new Nt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const tc=new ue,Ma=new Or,mr=new ks,gr=new b;class ka extends Ae{constructor(t=new xe,e=new Br){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const i=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),mr.copy(i.boundingSphere),mr.applyMatrix4(s),mr.radius+=r,t.ray.intersectsSphere(mr)===!1)return;tc.copy(s).invert(),Ma.copy(t.ray).applyMatrix4(tc);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=i.index,u=i.attributes.position;if(c!==null){const h=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let g=h,v=f;g<v;g++){const m=c.getX(g);gr.fromBufferAttribute(u,m),ec(gr,m,l,s,t,e,this)}}else{const h=Math.max(0,o.start),f=Math.min(u.count,o.start+o.count);for(let g=h,v=f;g<v;g++)gr.fromBufferAttribute(u,g),ec(gr,g,l,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function ec(n,t,e,i,s,r,o){const a=Ma.distanceSqToPoint(n);if(a<e){const l=new b;Ma.closestPointToPoint(n,l),l.applyMatrix4(i);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class Je extends Ge{constructor(t,e,i,s,r,o,a,l,c){super(t,e,i,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class On{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let i,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)i=this.getPoint(o/t),r+=i.distanceTo(s),e.push(r),s=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const i=this.getLengths();let s=0;const r=i.length;let o;e?o=e:o=t*i[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=i[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,i[s]===o)return s/(r-1);const d=i[s],h=i[s+1]-d,f=(o-d)/h;return(s+f)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),l=e||(o.isVector2?new wt:new b);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){const i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e){const i=new b,s=[],r=[],o=[],a=new b,l=new ue;for(let f=0;f<=t;f++){const g=f/t;s[f]=this.getTangentAt(g,new b)}r[0]=new b,o[0]=new b;let c=Number.MAX_VALUE;const d=Math.abs(s[0].x),u=Math.abs(s[0].y),h=Math.abs(s[0].z);d<=c&&(c=d,i.set(1,0,0)),u<=c&&(c=u,i.set(0,1,0)),h<=c&&i.set(0,0,1),a.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(s[f-1],s[f]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(Ue(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(a,g))}o[f].crossVectors(s[f],r[f])}if(e===!0){let f=Math.acos(Ue(r[0].dot(r[t]),-1,1));f/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(f=-f);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],f*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class qc extends On{constructor(t=0,e=0,i=1,s=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=i,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new wt){const i=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const d=Math.cos(this.aRotation),u=Math.sin(this.aRotation),h=l-this.aX,f=c-this.aY;l=h*d-f*u+this.aX,c=h*u+f*d+this.aY}return i.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Dm extends qc{constructor(t,e,i,s,r,o){super(t,e,i,i,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Ga(){let n=0,t=0,e=0,i=0;function s(r,o,a,l){n=r,t=a,e=-3*r+3*o-2*a-l,i=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,d,u){let h=(o-r)/c-(a-r)/(c+d)+(a-o)/d,f=(a-o)/d-(l-o)/(d+u)+(l-a)/u;h*=d,f*=d,s(o,a,h,f)},calc:function(r){const o=r*r,a=o*r;return n+t*r+e*o+i*a}}}const _r=new b,Mo=new Ga,yo=new Ga,So=new Ga;class Ze extends On{constructor(t=[],e=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=s}getPoint(t,e=new b){const i=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,d;this.closed||a>0?c=s[(a-1)%r]:(_r.subVectors(s[0],s[1]).add(s[0]),c=_r);const u=s[a%r],h=s[(a+1)%r];if(this.closed||a+2<r?d=s[(a+2)%r]:(_r.subVectors(s[r-1],s[r-2]).add(s[r-1]),d=_r),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(u),f),v=Math.pow(u.distanceToSquared(h),f),m=Math.pow(h.distanceToSquared(d),f);v<1e-4&&(v=1),g<1e-4&&(g=v),m<1e-4&&(m=v),Mo.initNonuniformCatmullRom(c.x,u.x,h.x,d.x,g,v,m),yo.initNonuniformCatmullRom(c.y,u.y,h.y,d.y,g,v,m),So.initNonuniformCatmullRom(c.z,u.z,h.z,d.z,g,v,m)}else this.curveType==="catmullrom"&&(Mo.initCatmullRom(c.x,u.x,h.x,d.x,this.tension),yo.initCatmullRom(c.y,u.y,h.y,d.y,this.tension),So.initCatmullRom(c.z,u.z,h.z,d.z,this.tension));return i.set(Mo.calc(l),yo.calc(l),So.calc(l)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(new b().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function nc(n,t,e,i,s){const r=(i-t)*.5,o=(s-e)*.5,a=n*n,l=n*a;return(2*e-2*i+r+o)*l+(-3*e+3*i-2*r-o)*a+r*n+e}function Im(n,t){const e=1-n;return e*e*t}function Um(n,t){return 2*(1-n)*n*t}function Nm(n,t){return n*n*t}function Ps(n,t,e,i){return Im(n,t)+Um(n,e)+Nm(n,i)}function Fm(n,t){const e=1-n;return e*e*e*t}function Om(n,t){const e=1-n;return 3*e*e*n*t}function zm(n,t){return 3*(1-n)*n*n*t}function Bm(n,t){return n*n*n*t}function Ls(n,t,e,i,s){return Fm(n,t)+Om(n,e)+zm(n,i)+Bm(n,s)}class km extends On{constructor(t=new wt,e=new wt,i=new wt,s=new wt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new wt){const i=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(Ls(t,s.x,r.x,o.x,a.x),Ls(t,s.y,r.y,o.y,a.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Gm extends On{constructor(t=new b,e=new b,i=new b,s=new b){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new b){const i=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(Ls(t,s.x,r.x,o.x,a.x),Ls(t,s.y,r.y,o.y,a.y),Ls(t,s.z,r.z,o.z,a.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Hm extends On{constructor(t=new wt,e=new wt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new wt){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new wt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Vm extends On{constructor(t=new b,e=new b){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new b){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new b){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Wm extends On{constructor(t=new wt,e=new wt,i=new wt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new wt){const i=e,s=this.v0,r=this.v1,o=this.v2;return i.set(Ps(t,s.x,r.x,o.x),Ps(t,s.y,r.y,o.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Yc extends On{constructor(t=new b,e=new b,i=new b){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new b){const i=e,s=this.v0,r=this.v1,o=this.v2;return i.set(Ps(t,s.x,r.x,o.x),Ps(t,s.y,r.y,o.y),Ps(t,s.z,r.z,o.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Xm extends On{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new wt){const i=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,l=s[o===0?o:o-1],c=s[o],d=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return i.set(nc(a,l.x,c.x,d.x,u.x),nc(a,l.y,c.y,d.y,u.y)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(new wt().fromArray(s))}return this}}var qm=Object.freeze({__proto__:null,ArcCurve:Dm,CatmullRomCurve3:Ze,CubicBezierCurve:km,CubicBezierCurve3:Gm,EllipseCurve:qc,LineCurve:Hm,LineCurve3:Vm,QuadraticBezierCurve:Wm,QuadraticBezierCurve3:Yc,SplineCurve:Xm});class wi extends xe{constructor(t=1,e=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:i,thetaLength:s},e=Math.max(3,e);const r=[],o=[],a=[],l=[],c=new b,d=new wt;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let u=0,h=3;u<=e;u++,h+=3){const f=i+u/e*s;c.x=t*Math.cos(f),c.y=t*Math.sin(f),o.push(c.x,c.y,c.z),a.push(0,0,1),d.x=(o[h]/t+1)/2,d.y=(o[h+1]/t+1)/2,l.push(d.x,d.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new fe(o,3)),this.setAttribute("normal",new fe(a,3)),this.setAttribute("uv",new fe(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new wi(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Ot extends xe{constructor(t=1,e=1,i=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const d=[],u=[],h=[],f=[];let g=0;const v=[],m=i/2;let p=0;S(),o===!1&&(t>0&&x(!0),e>0&&x(!1)),this.setIndex(d),this.setAttribute("position",new fe(u,3)),this.setAttribute("normal",new fe(h,3)),this.setAttribute("uv",new fe(f,2));function S(){const _=new b,L=new b;let T=0;const R=(e-t)/i;for(let P=0;P<=r;P++){const M=[],y=P/r,C=y*(e-t)+t;for(let I=0;I<=s;I++){const G=I/s,J=G*l+a,et=Math.sin(J),K=Math.cos(J);L.x=C*et,L.y=-y*i+m,L.z=C*K,u.push(L.x,L.y,L.z),_.set(et,R,K).normalize(),h.push(_.x,_.y,_.z),f.push(G,1-y),M.push(g++)}v.push(M)}for(let P=0;P<s;P++)for(let M=0;M<r;M++){const y=v[M][P],C=v[M+1][P],I=v[M+1][P+1],G=v[M][P+1];(t>0||M!==0)&&(d.push(y,C,G),T+=3),(e>0||M!==r-1)&&(d.push(C,I,G),T+=3)}c.addGroup(p,T,0),p+=T}function x(_){const L=g,T=new wt,R=new b;let P=0;const M=_===!0?t:e,y=_===!0?1:-1;for(let I=1;I<=s;I++)u.push(0,m*y,0),h.push(0,y,0),f.push(.5,.5),g++;const C=g;for(let I=0;I<=s;I++){const J=I/s*l+a,et=Math.cos(J),K=Math.sin(J);R.x=M*K,R.y=m*y,R.z=M*et,u.push(R.x,R.y,R.z),h.push(0,y,0),T.x=et*.5+.5,T.y=K*.5*y+.5,f.push(T.x,T.y),g++}for(let I=0;I<s;I++){const G=L+I,J=C+I;_===!0?d.push(J,J+1,G):d.push(J+1,J,G),P+=3}c.addGroup(p,P,_===!0?1:2),p+=P}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ot(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class ni extends Ot{constructor(t=1,e=1,i=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,i,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new ni(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class kr extends xe{constructor(t=[],e=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:i,detail:s};const r=[],o=[];a(s),c(i),d(),this.setAttribute("position",new fe(r,3)),this.setAttribute("normal",new fe(r.slice(),3)),this.setAttribute("uv",new fe(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(S){const x=new b,_=new b,L=new b;for(let T=0;T<e.length;T+=3)f(e[T+0],x),f(e[T+1],_),f(e[T+2],L),l(x,_,L,S)}function l(S,x,_,L){const T=L+1,R=[];for(let P=0;P<=T;P++){R[P]=[];const M=S.clone().lerp(_,P/T),y=x.clone().lerp(_,P/T),C=T-P;for(let I=0;I<=C;I++)I===0&&P===T?R[P][I]=M:R[P][I]=M.clone().lerp(y,I/C)}for(let P=0;P<T;P++)for(let M=0;M<2*(T-P)-1;M++){const y=Math.floor(M/2);M%2===0?(h(R[P][y+1]),h(R[P+1][y]),h(R[P][y])):(h(R[P][y+1]),h(R[P+1][y+1]),h(R[P+1][y]))}}function c(S){const x=new b;for(let _=0;_<r.length;_+=3)x.x=r[_+0],x.y=r[_+1],x.z=r[_+2],x.normalize().multiplyScalar(S),r[_+0]=x.x,r[_+1]=x.y,r[_+2]=x.z}function d(){const S=new b;for(let x=0;x<r.length;x+=3){S.x=r[x+0],S.y=r[x+1],S.z=r[x+2];const _=m(S)/2/Math.PI+.5,L=p(S)/Math.PI+.5;o.push(_,1-L)}g(),u()}function u(){for(let S=0;S<o.length;S+=6){const x=o[S+0],_=o[S+2],L=o[S+4],T=Math.max(x,_,L),R=Math.min(x,_,L);T>.9&&R<.1&&(x<.2&&(o[S+0]+=1),_<.2&&(o[S+2]+=1),L<.2&&(o[S+4]+=1))}}function h(S){r.push(S.x,S.y,S.z)}function f(S,x){const _=S*3;x.x=t[_+0],x.y=t[_+1],x.z=t[_+2]}function g(){const S=new b,x=new b,_=new b,L=new b,T=new wt,R=new wt,P=new wt;for(let M=0,y=0;M<r.length;M+=9,y+=6){S.set(r[M+0],r[M+1],r[M+2]),x.set(r[M+3],r[M+4],r[M+5]),_.set(r[M+6],r[M+7],r[M+8]),T.set(o[y+0],o[y+1]),R.set(o[y+2],o[y+3]),P.set(o[y+4],o[y+5]),L.copy(S).add(x).add(_).divideScalar(3);const C=m(L);v(T,y+0,S,C),v(R,y+2,x,C),v(P,y+4,_,C)}}function v(S,x,_,L){L<0&&S.x===1&&(o[x]=S.x-1),_.x===0&&_.z===0&&(o[x]=L/2/Math.PI+.5)}function m(S){return Math.atan2(S.z,-S.x)}function p(S){return Math.atan2(-S.y,Math.sqrt(S.x*S.x+S.z*S.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new kr(t.vertices,t.indices,t.radius,t.details)}}class Ha extends kr{constructor(t=1,e=0){const i=(1+Math.sqrt(5))/2,s=1/i,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-i,0,-s,i,0,s,-i,0,s,i,-s,-i,0,-s,i,0,s,-i,0,s,i,0,-i,0,-s,i,0,-s,-i,0,s,i,0,s],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,o,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Ha(t.radius,t.detail)}}class Ei extends kr{constructor(t=1,e=0){const i=(1+Math.sqrt(5))/2,s=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Ei(t.radius,t.detail)}}class we extends xe{constructor(t=1,e=32,i=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));const l=Math.min(o+a,Math.PI);let c=0;const d=[],u=new b,h=new b,f=[],g=[],v=[],m=[];for(let p=0;p<=i;p++){const S=[],x=p/i;let _=0;p===0&&o===0?_=.5/e:p===i&&l===Math.PI&&(_=-.5/e);for(let L=0;L<=e;L++){const T=L/e;u.x=-t*Math.cos(s+T*r)*Math.sin(o+x*a),u.y=t*Math.cos(o+x*a),u.z=t*Math.sin(s+T*r)*Math.sin(o+x*a),g.push(u.x,u.y,u.z),h.copy(u).normalize(),v.push(h.x,h.y,h.z),m.push(T+_,1-x),S.push(c++)}d.push(S)}for(let p=0;p<i;p++)for(let S=0;S<e;S++){const x=d[p][S+1],_=d[p][S],L=d[p+1][S],T=d[p+1][S+1];(p!==0||o>0)&&f.push(x,_,T),(p!==i-1||l<Math.PI)&&f.push(_,L,T)}this.setIndex(f),this.setAttribute("position",new fe(g,3)),this.setAttribute("normal",new fe(v,3)),this.setAttribute("uv",new fe(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new we(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Dn extends xe{constructor(t=1,e=.4,i=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:s,arc:r},i=Math.floor(i),s=Math.floor(s);const o=[],a=[],l=[],c=[],d=new b,u=new b,h=new b;for(let f=0;f<=i;f++)for(let g=0;g<=s;g++){const v=g/s*r,m=f/i*Math.PI*2;u.x=(t+e*Math.cos(m))*Math.cos(v),u.y=(t+e*Math.cos(m))*Math.sin(v),u.z=e*Math.sin(m),a.push(u.x,u.y,u.z),d.x=t*Math.cos(v),d.y=t*Math.sin(v),h.subVectors(u,d).normalize(),l.push(h.x,h.y,h.z),c.push(g/s),c.push(f/i)}for(let f=1;f<=i;f++)for(let g=1;g<=s;g++){const v=(s+1)*f+g-1,m=(s+1)*(f-1)+g-1,p=(s+1)*(f-1)+g,S=(s+1)*f+g;o.push(v,m,S),o.push(m,p,S)}this.setIndex(o),this.setAttribute("position",new fe(a,3)),this.setAttribute("normal",new fe(l,3)),this.setAttribute("uv",new fe(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Dn(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class Fs extends xe{constructor(t=new Yc(new b(-1,-1,0),new b(-1,1,0),new b(1,1,0)),e=64,i=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:i,radialSegments:s,closed:r};const o=t.computeFrenetFrames(e,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new b,l=new b,c=new wt;let d=new b;const u=[],h=[],f=[],g=[];v(),this.setIndex(g),this.setAttribute("position",new fe(u,3)),this.setAttribute("normal",new fe(h,3)),this.setAttribute("uv",new fe(f,2));function v(){for(let x=0;x<e;x++)m(x);m(r===!1?e:0),S(),p()}function m(x){d=t.getPointAt(x/e,d);const _=o.normals[x],L=o.binormals[x];for(let T=0;T<=s;T++){const R=T/s*Math.PI*2,P=Math.sin(R),M=-Math.cos(R);l.x=M*_.x+P*L.x,l.y=M*_.y+P*L.y,l.z=M*_.z+P*L.z,l.normalize(),h.push(l.x,l.y,l.z),a.x=d.x+i*l.x,a.y=d.y+i*l.y,a.z=d.z+i*l.z,u.push(a.x,a.y,a.z)}}function p(){for(let x=1;x<=e;x++)for(let _=1;_<=s;_++){const L=(s+1)*(x-1)+(_-1),T=(s+1)*x+(_-1),R=(s+1)*x+_,P=(s+1)*(x-1)+_;g.push(L,T,P),g.push(T,R,P)}}function S(){for(let x=0;x<=e;x++)for(let _=0;_<=s;_++)c.x=x/e,c.y=_/s,f.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new Fs(new qm[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}class j extends Fn{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Nt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Nt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Da,this.normalScale=new wt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new fn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class We extends Fn{static get type(){return"MeshLambertMaterial"}constructor(t){super(),this.isMeshLambertMaterial=!0,this.color=new Nt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Nt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Da,this.normalScale=new wt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new fn,this.combine=ba,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Gr extends Ae{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Nt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class $c extends Gr{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ae.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Nt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const xo=new ue,ic=new b,sc=new b;class Zc{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new wt(512,512),this.map=null,this.mapPass=null,this.matrix=new ue,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Na,this._frameExtents=new wt(1,1),this._viewportCount=1,this._viewports=[new ce(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;ic.setFromMatrixPosition(t.matrixWorld),e.position.copy(ic),sc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(sc),e.updateMatrixWorld(),xo.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(xo),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(xo)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const rc=new ue,xs=new b,wo=new b;class Ym extends Zc{constructor(){super(new he(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new wt(4,2),this._viewportCount=6,this._viewports=[new ce(2,1,1,1),new ce(0,1,1,1),new ce(3,1,1,1),new ce(1,1,1,1),new ce(3,0,1,1),new ce(1,0,1,1)],this._cubeDirections=[new b(1,0,0),new b(-1,0,0),new b(0,0,1),new b(0,0,-1),new b(0,1,0),new b(0,-1,0)],this._cubeUps=[new b(0,1,0),new b(0,1,0),new b(0,1,0),new b(0,1,0),new b(0,0,1),new b(0,0,-1)]}updateMatrices(t,e=0){const i=this.camera,s=this.matrix,r=t.distance||i.far;r!==i.far&&(i.far=r,i.updateProjectionMatrix()),xs.setFromMatrixPosition(t.matrixWorld),i.position.copy(xs),wo.copy(i.position),wo.add(this._cubeDirections[e]),i.up.copy(this._cubeUps[e]),i.lookAt(wo),i.updateMatrixWorld(),s.makeTranslation(-xs.x,-xs.y,-xs.z),rc.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(rc)}}class Va extends Gr{constructor(t,e,i=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new Ym}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class $m extends Zc{constructor(){super(new zc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Kc extends Gr{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ae.DEFAULT_UP),this.updateMatrix(),this.target=new Ae,this.shadow=new $m}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Jc extends Gr{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}const oc=new ue;class Zm{constructor(t,e,i=0,s=1/0){this.ray=new Or(t,e),this.near=i,this.far=s,this.camera=null,this.layers=new Ua,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return oc.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(oc),this}intersectObject(t,e=!0,i=[]){return ya(t,this,i,e),i.sort(ac),i}intersectObjects(t,e=!0,i=[]){for(let s=0,r=t.length;s<r;s++)ya(t[s],this,i,e);return i.sort(ac),i}}function ac(n,t){return n.distance-t.distance}function ya(n,t,e,i){let s=!0;if(n.layers.test(t.layers)&&n.raycast(t,e)===!1&&(s=!1),s===!0&&i===!0){const r=n.children;for(let o=0,a=r.length;o<a;o++)ya(r[o],t,e,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ea}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ea);let Se=!1;function Km(n){Se=n}function Ds(){return Se}const Xt={skyTop:15391936,skyMid:15786952,skyHorizon:16116950,sun:15317355,ground:14008723,groundDark:12823420,path:12625527,pathEdge:13875851,walnut:5917238,walnutDark:4338986,bronze:10125655,terracotta:12618344,amber:13608308,hill:13023379};function Nn(n,t){const e=document.createElement("canvas");e.width=128,e.height=128;const i=e.getContext("2d"),s=i.createRadialGradient(64,64,64*n,64,64,64);s.addColorStop(0,t),s.addColorStop(1,"rgba(0,0,0,0)"),i.fillStyle=s,i.fillRect(0,0,128,128);const r=new Je(e);return r.colorSpace=_e,r}function lc(n,t,e){const i=t.split(" "),s=[];let r="";for(const o of i){const a=r?r+" "+o:o;n.measureText(a).width>e&&r?(s.push(r),r=o):r=a}return r&&s.push(r),s}function jc(){const n=document.createElement("canvas");n.width=256,n.height=256;const t=n.getContext("2d");t.fillStyle="#cdb98c",t.fillRect(0,0,256,256);for(let i=0;i<2600;i++){const s=168+Math.random()*42;t.fillStyle=`rgba(${s|0},${s*.92|0},${s*.72|0},${(Math.random()*.2).toFixed(3)})`,t.fillRect(Math.random()*256,Math.random()*256,2+Math.random()*4,2+Math.random()*4)}for(let i=0;i<150;i++)t.fillStyle="rgba(110,86,52,"+(.14+Math.random()*.26).toFixed(3)+")",t.beginPath(),t.arc(Math.random()*256,Math.random()*256,1+Math.random()*2,0,Math.PI*2),t.fill();const e=new Je(n);return e.colorSpace=_e,e.wrapS=e.wrapT=ti,e.repeat.set(Se?48:90,Se?48:90),e.anisotropy=Se?2:8,e}function Zi(){const n=document.createElement("canvas");n.width=256,n.height=256;const t=n.getContext("2d");t.fillStyle="#c2a878",t.fillRect(0,0,256,256);for(let s=0;s<3200;s++)t.fillStyle=`rgba(90,68,40,${(Math.random()*.16).toFixed(3)})`,t.fillRect(Math.random()*256,Math.random()*256,1+Math.random()*3,1+Math.random()*3);for(let s=0;s<500;s++)t.fillStyle=`rgba(255,252,244,${(Math.random()*.12).toFixed(3)})`,t.fillRect(Math.random()*256,Math.random()*256,1+Math.random()*2,1+Math.random()*2);const e=t.createLinearGradient(112,0,144,256);e.addColorStop(0,"rgba(255,255,255,0)"),e.addColorStop(.5,"rgba(255,255,255,0.07)"),e.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=e,t.fillRect(0,0,256,256);const i=new Je(n);return i.colorSpace=_e,i.wrapS=i.wrapT=ti,i.repeat.set(1,60),i.anisotropy=Se?2:8,i}function Tn(n,t,e,i,s=500){const r=n.getSpacedPoints(s),o=new Float32Array((s+1)*6),a=new Float32Array((s+1)*4),l=new Uint32Array(s*6);for(let u=0;u<=s;u++){const h=r[Math.min(u,s-1)],f=r[Math.min(u+1,s-1)],g=new b().subVectors(f,h).normalize(),v=new b(-g.z,0,g.x).normalize(),m=h.clone().add(v.clone().multiplyScalar(-t/2)),p=h.clone().add(v.clone().multiplyScalar(t/2)),S=u*6;if(o[S]=m.x,o[S+1]=m.y,o[S+2]=m.z,o[S+3]=p.x,o[S+4]=p.y,o[S+5]=p.z,a[u*4]=0,a[u*4+1]=u/s,a[u*4+2]=1,a[u*4+3]=u/s,u<s){const x=u*2,_=u*2+1,L=u*2+2,T=u*2+3,R=u*6;l[R]=x,l[R+1]=L,l[R+2]=_,l[R+3]=_,l[R+4]=L,l[R+5]=T}}const c=new xe;c.setAttribute("position",new De(o,3)),c.setAttribute("uv",new De(a,2)),c.setIndex(new De(l,1)),c.computeVertexNormals();const d=new U(c,new j({color:e,roughness:.95,metalness:.02,map:i||null}));return d.receiveShadow=!0,d}function Qc(n,t,e,i,s){const r=new Ft,o=t.getPointAt(e),a=t.getTangentAt(e),c=new b(-a.z,0,a.x).normalize().clone().multiplyScalar(i*5.4),d=s%3-1;r.position.set(o.x+c.x+d*.9,0,o.z+c.z+d*.9);const u=t.getPointAt(Math.max(0,e-.035)),h=new b().subVectors(u,r.position).normalize(),f=Math.atan2(h.x,h.z);r.rotation.y=f;const g=new j({color:Xt.walnut,roughness:.8,metalness:.05}),v=new U(new St(6.6,4.4,.22),g);v.position.y=3,v.castShadow=!0,r.add(v);const m=new j({color:12035198,roughness:.92}),p=new U(new St(5.6,.4,.8),m);p.position.y=.2,p.castShadow=!0,r.add(p);const S=new j({color:10125655,roughness:.9}),x=new j({color:4338986,roughness:1}),_=new j({color:6257226,roughness:1,flatShading:!0});for(const ht of[-2.9,2.9]){const ft=new U(new St(.5,.34,.5),S);ft.position.set(ht,.17,.55),r.add(ft);const Pt=new U(new St(.42,.1,.42),x);Pt.position.set(ht,.34,.55),r.add(Pt);for(const Gt of[-.1,.12]){const ee=new U(new Ei(.14,1),_);ee.position.set(ht+Gt,.42,.55),r.add(ee);const Q=new U(new we(.05,6,5),new j({color:ht<0?12618344:13608308,roughness:.9}));Q.position.set(ht+Gt,.52,.55),r.add(Q)}}const L=new j({color:Xt.bronze,roughness:.75,metalness:.12}),T=new U(new St(7,.26,.3),L);T.position.y=5.32,r.add(T);const R=new U(new St(7,.26,.3),L);R.position.y=.72,r.add(R);for(const ht of[-3.5,3.5]){const ft=new U(new St(.26,4.8,.3),L);ft.position.set(ht,3,0),r.add(ft)}const P=new j({color:Xt.walnutDark,roughness:.7,metalness:.1});for(const ht of[-2.5,2.5]){const ft=new U(new St(.32,.8,.32),P);ft.position.set(ht,.4,0),ft.castShadow=!0,r.add(ft)}const M=Se?640:1024,y=Se?480:768,C=document.createElement("canvas");C.width=M,C.height=y,Jm(C.getContext("2d"),n,s,M,y);const I=new Je(C);I.colorSpace=_e,I.anisotropy=Se?2:8;const G=new We({map:I}),J=new U(new Zt(6.2,4),G);J.position.set(0,3,.125),r.add(J);const et=new U(new Zt(6.2,4),new j({color:Xt.walnutDark,roughness:.9}));et.position.set(0,3,-.125),et.rotation.y=Math.PI,r.add(et);const K=Se?null:new Va(15246172,0,26,2);K&&(K.position.set(0,3.3,2.4),r.add(K));const st=new j({color:Xt.amber,emissive:Xt.amber,emissiveIntensity:.22}),$=new U(new we(.09,12,12),st);return $.position.set(0,5.52,0),r.add($),{group:r,frontMat:G,light:K,beaconMat:st,front:J}}function Jm(n,t,e,i=1024,s=768){const r=i,o=s;n.scale(i/1024,s/768);const a=n.createLinearGradient(0,0,0,o);a.addColorStop(0,"#fdf8ec"),a.addColorStop(1,"#f1e6cb"),n.fillStyle=a,n.fillRect(0,0,r,o),n.globalAlpha=.045;for(let u=0;u<900;u++)n.fillStyle=Math.random()>.5?"#7a5f38":"#ffffff",n.fillRect(Math.random()*r,Math.random()*o,2,2);n.globalAlpha=1,n.strokeStyle="rgba(122,95,56,0.3)",n.lineWidth=3,n.strokeRect(34,34,r-68,o-68),n.fillStyle="#c08a68";for(const[u,h,f,g]of[[34,34,1,1],[r-34,34,-1,1],[34,o-34,1,-1],[r-34,o-34,-1,-1]])n.fillRect(u+f*8,h+g*8,26*f,4*g),n.fillRect(u+f*8,h+g*8,4*f,26*g);n.fillStyle="#7a5f38",n.font="500 26px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",n.textAlign="left",n.letterSpacing="6px",n.fillText(t.kicker.toUpperCase(),70,96),n.letterSpacing="0px",n.fillStyle="rgba(207,165,116,0.18)",n.font="600 300px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",n.textAlign="right",n.fillText(t.num,r-60,360),n.fillStyle="#c08a68",n.fillRect(70,132,90,4),n.fillStyle="#3a2e1f",n.font="600 62px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",n.textAlign="left";const l=lc(n,t.title,860);let c=210;if(l.slice(0,4).forEach(u=>{n.fillText(u,70,c),c+=70}),c+=18,t.id!=="quiz"&&t.bullets.length){n.fillStyle="rgba(122,95,56,0.45)",n.fillRect(70,c-6,60,2),c+=26,n.font="400 30px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif";const u=[];t.bullets.slice(0,4).forEach(h=>u.push(...lc(n,h,840))),u.slice(0,5).forEach(h=>{n.fillStyle="#c08a68",n.beginPath(),n.arc(78,c-10,4,0,Math.PI*2),n.fill(),n.fillStyle="#4c3d28",n.fillText(h,100,c),c+=40})}n.fillStyle="rgba(122,95,56,0.7)",n.font="400 22px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",n.textAlign="left",n.letterSpacing="3px",n.fillText("MODULE 1 · DOMAINE PUBLIC",70,o-62),n.fillStyle="rgba(170,120,85,0.8)",n.textAlign="right",n.fillText(String(e+1).padStart(2,"0")+" / 13",r-70,o-62),n.letterSpacing="0px";const d=n.createRadialGradient(r/2,o/2,r*.3,r/2,o/2,r*.62);d.addColorStop(0,"rgba(0,0,0,0)"),d.addColorStop(.6,"rgba(0,0,0,0)"),d.addColorStop(1,"rgba(150,120,75,0.22)"),n.fillStyle=d,n.fillRect(0,0,r,o)}function Sa(n,t,e,i,s){const r=document.createElement("canvas");r.width=64,r.height=128;const o=r.getContext("2d");o.fillStyle="#dccda8",o.fillRect(0,0,64,128);for(let d=0;d<9;d++)for(let u=0;u<4;u++){const h=Math.random();h<.3?(o.fillStyle=Math.random()<.3?"#c08a68":"#c9a25f",o.globalAlpha=.35+Math.random()*.35,o.fillRect(4+u*14+Math.random()*4,6+d*13+Math.random()*3,5,7),o.globalAlpha=1):h<.42&&(o.fillStyle="#6a5a38",o.globalAlpha=.35,o.fillRect(4+u*14,6+d*13,5,7),o.globalAlpha=1)}const a=new Je(r);a.colorSpace=_e,a.repeat.set(1,Math.max(1,Math.round(t/6))),a.wrapS=ti,a.wrapT=ti,a.anisotropy=Se?1:4;const l=new j({map:a,roughness:.9,metalness:0}),c=new U(new St(n,t,e),l);return c.position.set(s,t/2-.3,i),c.rotation.y=(Math.random()-.5)*.5,c.castShadow=!0,c}function Ts(n,t){const e=new Ft;e.position.copy(n);const i=new j({color:Xt.walnutDark,roughness:.6,metalness:.3}),s=new U(new Ot(.07,.1,5.6,8),i);s.position.y=2.8,e.add(s);const r=new U(new St(1.7,.1,.1),i);r.position.set(t*.85,5.5,0),e.add(r);const o=new j({color:Xt.amber,emissive:Xt.amber,emissiveIntensity:.25}),a=new U(new we(.16,12,12),o);return a.position.set(t*1.7,5.5,0),e.add(a),e}function jm(n,t){const e=new j({color:new Nt(Xt.groundDark).lerp(new Nt(Xt.ground),Math.random()),roughness:1,flatShading:!0}),i=new U(new Ei(t,1),e);return i.position.set(n.x,-.15,n.z),i.scale.set(1,.32,1),i.rotation.y=Math.random()*Math.PI,i}function Qm(n,t){const e=new j({color:10127976,roughness:.95,flatShading:!0}),i=new U(new Ha(t,0),e);return i.position.set(n.x,t*.4,n.z),i.rotation.set(Math.random(),Math.random()*Math.PI,Math.random()),i}function tg(n=420){const t=n,e=new Float32Array(t*3),i=new Ze([new b(0,0,0),new b(0,0,120),new b(0,0,240),new b(0,0,360),new b(0,0,468)],!1,"centripetal");for(let o=0;o<t;o++){const a=Math.random(),l=i.getPointAt(a);e[o*3]=l.x+(Math.random()-.5)*24,e[o*3+1]=.4+Math.random()*6,e[o*3+2]=l.z+(Math.random()-.5)*24}const s=new xe;s.setAttribute("position",new De(e,3));const r=new Br({color:Xt.amber,transparent:!0,opacity:.5,blending:sn,depthWrite:!1,size:.35,sizeAttenuation:!0});return new ka(s,r)}function eg(){const n=new Ft,t=new Ve({color:4864550,transparent:!0,opacity:.9,side:Ke}),e=new Zt(.55,.18),i=new U(e,t);i.position.x=-.3;const s=new U(e,t);s.position.x=.3;const r=new U(new Zt(.34,.07),t);return r.rotation.z=Math.PI/2,n.add(i,s,r),n.scale.setScalar(1.3),{g:n,l:i,r:s}}function tu(n,t=1){const e=new Ft,i=new j({color:9071429,roughness:.95,flatShading:!0}),s=new U(new Ot(.09,.18,3.2,6),i);s.position.y=1.6,s.rotation.z=(Math.random()-.5)*.22,s.castShadow=!0,e.add(s);const r=new j({color:6257226,roughness:1,flatShading:!0}),o=7;for(let l=0;l<o;l++){const c=l/o*Math.PI*2,d=new U(new we(1,7,5),r);d.position.set(Math.cos(c)*1.15,3.05,Math.sin(c)*1.15),d.scale.set(1.15,.28,.55),d.rotation.y=c,e.add(d)}const a=new U(new we(.28,8,6),r);return a.position.y=3.15,e.add(a),e.position.copy(n),e.scale.setScalar(t),e}function ng(n,t=1){const e=new Ft,i=new j({color:7045971,roughness:1,flatShading:!0});for(let s=0;s<5;s++){const r=new U(new Ei(.3+Math.random()*.24,1),i);r.position.set((Math.random()-.5)*.7,.22+Math.random()*.3,(Math.random()-.5)*.7),e.add(r)}return e.position.copy(n),e.scale.setScalar(t),e}function ig(n,t=1){const e=new Ft,i=new j({color:16183261,roughness:1,flatShading:!0,transparent:!0,opacity:.92});for(let s=0;s<6;s++){const r=new U(new we(1.1+Math.random()*1.4,9,7),i);r.position.set(s*1.6-4,Math.random()*.9,(Math.random()-.5)*2),r.scale.y=.5,e.add(r)}return e.position.copy(n),e.scale.setScalar(t),e}function sg(n,t,e){const i=new Ft;i.position.copy(n);const s=new j({color:Xt.walnutDark,roughness:.7,metalness:.2}),r=new U(new Ot(.1,.14,2.1,8),s);r.position.y=1.05,r.castShadow=!0,i.add(r);const o=new U(new St(.9,.08,.14),s);o.position.set(0,1.85,0),o.rotation.z=Math.PI/2,i.add(o);const a=Se?256:512,l=Se?160:320,c=document.createElement("canvas");c.width=a,c.height=l;const d=c.getContext("2d");d.scale(a/512,l/320),d.fillStyle="#f7eeda",d.fillRect(0,0,512,320),d.strokeStyle="rgba(138,111,69,0.6)",d.lineWidth=8,d.strokeRect(12,12,488,296);const u=d.createLinearGradient(0,0,512,0);u.addColorStop(0,"#c08a68"),u.addColorStop(1,"#cfa574"),d.fillStyle=u,d.fillRect(0,52,512,10),d.textAlign="center",d.fillStyle="#3a2e1f",d.font="700 42px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",e.forEach((m,p)=>d.fillText(m,256,122+p*50));const h=new Je(c);h.colorSpace=_e,h.anisotropy=Se?2:8;const f=new We({map:h}),g=new U(new Zt(1.7,1.06),f);g.position.y=2.28;const v=new Ft;return v.add(g),v.rotation.y=t,i.add(v),{group:i,sign:g}}function rg(n,t,e,i){const s=new j({color:Xt.hill,roughness:1,flatShading:!0}),r=new U(new Ei(1,2),s);return r.scale.set(t,e,i),r.position.set(n.x,n.y,n.z),r.rotation.y=Math.random()*Math.PI,r.castShadow=!0,r}function As(n,t){const e=new Ft;e.position.copy(n);const i=new xi(new ei({map:Nn(0,"rgba(255,190,120,0.3)"),transparent:!0,blending:sn,depthWrite:!1,depthTest:!1}));i.scale.setScalar(3.6),i.position.set(t*1.7,5.5,0),e.add(i);const s=new U(new wi(3.8,24),new Ve({map:Nn(.12,"rgba(255,180,110,0.32)"),transparent:!0,blending:sn,depthWrite:!1}));return s.rotation.x=-Math.PI/2,s.position.y=.03,e.add(s),{group:e,glow:i,pool:s}}function xa(){const n=new Ft,t=Math.random()<.5?12618344:Math.random()<.5?13805688:7035458,e=new j({color:t,roughness:.45,metalness:.35}),i=new j({color:3813154,roughness:.5,metalness:.4}),s=new U(new St(1.5,.5,3.2),e);s.position.y=.5,s.castShadow=!0,n.add(s);const r=new U(new St(1.3,.24,1),i);r.position.set(0,.72,1.15),n.add(r);const o=new U(new St(1.12,.46,1.5),i);o.position.set(0,.95,-.2),o.castShadow=!0,n.add(o);const a=new j({color:8364973,roughness:.15,metalness:.6});for(const[h,f]of[[0,-.95],[0,.5]]){const g=new U(new St(1.14,.38,.05),a);g.position.set(h,.96,f),n.add(g)}const l=new j({color:3023896,roughness:.9});for(const[h,f]of[[-.78,1.05],[.78,1.05],[-.78,-1.05],[.78,-1.05]]){const g=new U(new Ot(.32,.32,.22,14),l);g.rotation.x=Math.PI/2,g.rotation.z=Math.PI/2,g.position.set(h,.32,f),n.add(g)}const c=new j({color:16773839,emissive:16769184,emissiveIntensity:.5});for(const h of[-.55,.55]){const f=new U(new we(.09,8,8),c);f.position.set(h,.55,1.6),n.add(f)}const d=new j({color:9051670,emissive:9051670,emissiveIntensity:.3});for(const h of[-.55,.55]){const f=new U(new St(.16,.1,.04),d);f.position.set(h,.55,-1.6),n.add(f)}const u=new xi(new ei({map:Nn(0,"rgba(255,226,175,0.4)"),transparent:!0,blending:sn,depthWrite:!1,depthTest:!1}));return u.scale.set(3.4,3.4,1),u.position.set(0,.55,2.8),n.add(u),{group:n,cone:u}}function wa(n,t){const e=new Ft;e.position.copy(n),e.rotation.y=t>0?Math.PI:0;const i=new j({color:9071429,roughness:.85}),s=new j({color:4864550,roughness:.7,metalness:.4}),r=new U(new St(1.4,.08,.42),i);r.position.y=.42,e.add(r);const o=new U(new St(1.4,.08,.4),i);o.position.set(0,.72,.18),e.add(o);for(const a of[-.6,.6]){const l=new U(new St(.08,.42,.5),s);l.position.set(a,.21,0),e.add(l)}return e}function og(){const n=document.createElement("canvas");n.width=256,n.height=256;const t=n.getContext("2d");t.fillStyle="#d3c096",t.fillRect(0,0,256,256),t.strokeStyle="rgba(122,95,56,0.35)",t.lineWidth=2,t.strokeRect(2,2,252,252);for(let i=64;i<256;i+=64)t.beginPath(),t.moveTo(i,2),t.lineTo(i,254),t.stroke(),t.beginPath(),t.moveTo(2,i),t.lineTo(254,i),t.stroke();for(let i=0;i<900;i++){const s=180+Math.random()*36;t.fillStyle=`rgba(${s|0},${s*.9|0},${s*.72|0},${(Math.random()*.16).toFixed(3)})`,t.fillRect(Math.random()*256,Math.random()*256,1+Math.random()*3,1+Math.random()*3)}const e=new Je(n);return e.colorSpace=_e,e.wrapS=e.wrapT=ti,e.repeat.set(Se?1:2,90),e.anisotropy=Se?2:8,e}function Eo(n,t=1){const e=new Ft,i=new j({color:7031340,roughness:.95,flatShading:!0}),s=new U(new Ot(.1,.16,2.6,7),i);s.position.y=1.3,s.castShadow=!0,e.add(s);const r=new j({color:5599295,roughness:1,flatShading:!0});for(let o=0;o<3;o++){const a=new U(new we(1.05-o*.18,8,6),r);a.position.set((Math.random()-.5)*.5,2.6+o*.65,(Math.random()-.5)*.5),a.scale.y=.85,a.castShadow=!0,e.add(a)}return e.position.copy(n),e.scale.setScalar(t),e}function ag(n,t=1,e=0){const i=new Ft,s=[5599295,6585414],r=[12618344,13608308,10336383,14731680],o=a=>{const l=Math.sin(e*127.1+a*311.7)*43758.5453;return l-Math.floor(l)};for(let a=0;a<6;a++){const l=new U(new Ot(.015,.02,.32,4),new j({color:s[a%2],roughness:1}));l.position.set((o(a)-.5)*.5,.16,(o(a+13)-.5)*.5),i.add(l);const c=new U(new we(.05,5,4),new j({color:r[(a+e)%r.length],roughness:.9}));c.position.set(l.position.x,.34,l.position.z),i.add(c)}return i.position.copy(n),i.scale.setScalar(t),i}function lg(n){const t=new Ft;t.position.copy(n);const e=new j({color:4864550,roughness:.6,metalness:.5}),i=new U(new Ot(.24,.2,.72,10),e);i.position.y=.36,i.castShadow=!0,t.add(i);const s=new U(new Ot(.27,.27,.05,10),e);return s.position.y=.75,t.add(s),t}function cg(){const n=new Ft,t=new j({color:10127994,roughness:.95,flatShading:!0}),e=new U(new we(.11,8,6),t);e.scale.set(1,.8,1.4),e.position.y=.12,n.add(e);const i=new U(new we(.055,8,6),t);i.position.set(0,.22,.1),n.add(i);const s=new U(new ni(.02,.05,4),t);return s.rotation.x=Math.PI/2,s.position.set(0,.22,.16),n.add(s),n.rotation.y=Math.random()*Math.PI*2,n}function $i(n,t=4.6,e=3.2){const i=new U(new Zt(t,e),new Ve({map:Nn(.35,"rgba(90,70,42,0.34)"),transparent:!0,depthWrite:!1}));return i.rotation.x=-Math.PI/2,i.position.set(n.x,.02,n.z),i}function ug(n,t=0,e=["PUBLICITÉ","URBAINE"]){const i=new Ft;i.position.copy(n),i.rotation.y=t;const s=new j({color:15392706,roughness:.85}),r=new j({color:10850152,roughness:.7,metalness:.15}),o=new U(new Ot(.62,.68,2.5,18),s);o.position.y=1.25,o.castShadow=!0,i.add(o);const a=new U(new Ot(.72,.8,.22,18),r);a.position.y=.11,i.add(a);const l=new U(new Ot(.66,.72,.16,18),r);l.position.y=2.58,i.add(l);const c=new U(new we(.2,10,8),r);c.position.y=2.75,i.add(c);const d=256,u=640,h=document.createElement("canvas");h.width=d,h.height=u;const f=h.getContext("2d"),g=f.createLinearGradient(0,0,0,u);g.addColorStop(0,"#f5ecd6"),g.addColorStop(1,"#ead9b4"),f.fillStyle=g,f.fillRect(0,0,d,u),f.strokeStyle="rgba(138,111,69,0.5)",f.lineWidth=10,f.strokeRect(10,10,d-20,u-20),f.fillStyle="#c08a68",f.fillRect(0,u*.14,d,14),f.textAlign="center",f.fillStyle="#3a2e1f",f.font="700 34px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",e.forEach((p,S)=>f.fillText(p,d/2,u*.3+S*56)),f.fillStyle="#8a6a4e",f.font="400 26px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",f.fillText("DOMAINE PUBLIC",d/2,u*.78);const v=new Je(h);v.colorSpace=_e,v.anisotropy=Se?2:8;const m=new U(new Zt(.92,2.5),new We({map:v}));return m.position.set(0,1.25,.55),i.add(m),i}function dg(n,t=1){const e=new Ft;e.position.copy(n),e.rotation.y=t>0?0:Math.PI;const i=new j({color:4864550,roughness:.6,metalness:.45}),s=new j({color:12100725,roughness:.7,metalness:.2});for(const p of[-1.7,1.7]){const S=new U(new St(.12,2.3,.12),i);S.position.set(p,1.15,.4),S.castShadow=!0,e.add(S)}const r=new U(new St(4.2,.1,1.7),s);r.position.y=2.4,r.castShadow=!0,e.add(r);const o=new j({color:11060425,roughness:.1,metalness:.2,transparent:!0,opacity:.35}),a=new U(new Zt(3.4,1.5),o);a.position.set(0,1.5,-.42),e.add(a);const l=new U(new Zt(1.3,1.5),o);l.position.set(1.9,1.5,0),l.rotation.y=Math.PI/2,e.add(l);const c=320,d=200,u=document.createElement("canvas");u.width=c,u.height=d;const h=u.getContext("2d");h.fillStyle="#f2e7cd",h.fillRect(0,0,c,d),h.fillStyle="#cfa574",h.fillRect(0,0,c,40),h.textAlign="center",h.fillStyle="#3a2e1f",h.font="700 30px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",h.fillText("VOTRE ESPACE PUBLICITAIRE",c/2,105),h.font="400 20px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",h.fillStyle="#7a5f38",h.fillText("MODULE 1 · PANNEAUTIQUE",c/2,150);const f=new Je(u);f.colorSpace=_e,f.anisotropy=Se?2:8;const g=new U(new Zt(3.4,1.4),new We({map:f}));g.position.set(0,1.45,.42),e.add(g);const v=new j({color:9071429,roughness:.85}),m=new U(new St(2.6,.07,.35),v);return m.position.set(0,.42,-.1),e.add(m),e}function hg(n,t=13215868,e=0){const i=new Ft;i.position.copy(n),i.rotation.y=e;const s=new j({color:5916210,roughness:.6,metalness:.4}),r=new j({color:9071429,roughness:.8}),o=new U(new Ot(.04,.06,.75,8),s);o.position.y=.38,i.add(o);const a=new U(new Ot(.42,.42,.06,14),r);a.position.y=.76,i.add(a);const l=new U(new Ot(.03,.03,1.5,8),s);l.position.y=1.1,i.add(l);const c=new U(new ni(1.1,.28,10),new We({color:t}));c.position.y=1.95,i.add(c);for(const[d,u]of[[-.5,.5],[.5,.5],[-.5,-.5],[.5,-.5]]){const h=new U(new St(.4,.1,.4),r);h.position.set(d,.42,u),i.add(h);const f=new U(new Ot(.025,.025,.42,6),s);f.position.set(d,.21,u),i.add(f)}return i.userData={parasol:c},i}function fg(n,t=0){const e=new Ft;e.position.copy(n),e.rotation.y=t;const i=new j({color:9071182,roughness:.6,metalness:.2}),s=new j({color:3813154,roughness:.95}),r=.34;for(const d of[-.35,.35]){const u=new U(new Dn(r,.035,8,20),s);u.position.set(0,r,d),e.add(u)}const o=new U(new St(.03,.03,.72),i);o.position.set(0,.66,0),e.add(o);const a=new U(new Ot(.02,.02,.62,6),i);a.position.set(0,.82,0),a.rotation.x=Math.PI/2,e.add(a);const l=new U(new Ot(.02,.02,.34,6),i);l.position.set(0,.98,.35),e.add(l);const c=new U(new St(.14,.03,.08),i);return c.position.set(0,.84,-.32),e.add(c),e}function pg(n,t=0,e="D"){const i=new Ft;i.position.copy(n),i.rotation.y=t;const s=new j({color:4864550,roughness:.6,metalness:.4}),r=new U(new Ot(.03,.05,1.8,8),s);r.position.y=.9,r.castShadow=!0,i.add(r);const o=document.createElement("canvas");o.width=128,o.height=64;const a=o.getContext("2d");a.fillStyle="#e3d6b4",a.fillRect(0,0,128,64),a.fillStyle=e==="D"?"#c08a68":"#7d9a68",a.fillRect(0,0,26,64),a.strokeStyle="rgba(138,111,69,0.6)",a.lineWidth=4,a.strokeRect(2,2,124,60),a.textAlign="center",a.fillStyle="#3a2e1f",a.font="700 26px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",a.fillText(e,76,42);const l=new Je(o);l.colorSpace=_e,l.anisotropy=Se?2:8;const c=new U(new Zt(.7,.35),new We({map:l}));return c.position.y=1.9,i.add(c),i}function bo(n,t=1.8,e=.6){const i=new Ft;i.position.copy(n);const s=new j({color:6257226,roughness:1,flatShading:!0}),r=new U(new St(t,e,.5),s);r.position.y=e/2,r.castShadow=!0,i.add(r);const o=Math.max(2,Math.round(t/.7));for(let a=0;a<o;a++){const l=new U(new Ei(.3,1),s);l.position.set(-t/2+.3+a*(t-.6)/(o-1),e+.18,0),i.add(l)}return i}function mg(){const n=new Ft,t=new j({color:14266508,roughness:.9}),e=[13215868,9415293,13608308,11052232,10336447,13805176],i=new j({color:e[Math.random()*e.length|0],roughness:.85}),s=new j({color:6048314,roughness:.9}),r=new U(new we(.13,10,8),t);r.position.y=1.62,n.add(r);const o=new U(new St(.34,.5,.2),i);o.position.y=1.2,o.castShadow=!0,n.add(o);const a=new St(.12,.55,.14),l=new U(a,s);l.position.set(-.09,.55,0);const c=new U(a,s);c.position.set(.09,.55,0),n.add(l,c);const d=new Ft,u=new St(.07,.42,.07),h=new U(u,i);h.position.set(-.24,1.05,0);const f=new U(u,i);return f.position.set(.24,1.05,0),d.add(h,f),n.add(d),{g:n,legL:l,legR:c,arms:d,phase:Math.random()*Math.PI*2}}function gg(){const n=new Ft,t=new j({color:13219985,roughness:.9}),e=new j({color:11048556,roughness:.9}),i=new j({color:11060425,roughness:.1,metalness:.2,transparent:!0,opacity:.75}),s=new U(new Ot(1.7,1.9,.5,20),t);s.position.y=.25,s.castShadow=!0,n.add(s);const r=new U(new Dn(1.8,.14,8,24),e);r.rotation.x=Math.PI/2,r.position.y=.5,n.add(r);const o=new U(new wi(1.62,20),i);o.rotation.x=-Math.PI/2,o.position.y=.31,n.add(o);const a=new U(new Ot(.16,.22,.8,10),e);a.position.y=.9,n.add(a);const l=new U(new Ot(.55,.35,.14,12),e);l.position.y=1.25,n.add(l);const c=new U(new Ot(.05,.05,.55,8),i);return c.position.y=1.6,n.add(c),n.userData={jet:c,pool:o,dish:l},n}function _g(n,t=0,e=["ESPACE","PUBLICITAIRE"]){const i=new Ft;i.position.copy(n),i.rotation.y=t;const s=new j({color:7035458,roughness:.7,metalness:.2}),r=new j({color:15260864,roughness:.85});for(const g of[-2.6,2.6]){const v=new U(new St(.22,3.4,.22),s);v.position.set(g,1.7,0),v.castShadow=!0,i.add(v);const m=new U(new St(.6,.12,.6),s);m.position.set(g,.06,0),i.add(m)}const o=new U(new St(5.6,3.1,.14),r);o.position.y=3.6,o.castShadow=!0,i.add(o);const a=Se?320:640,l=Se?180:360,c=document.createElement("canvas");c.width=a,c.height=l;const d=c.getContext("2d"),u=d.createLinearGradient(0,0,0,l);u.addColorStop(0,"#f3e8cd"),u.addColorStop(1,"#e6d3a9"),d.fillStyle=u,d.fillRect(0,0,a,l),d.fillStyle="#c08a68",d.fillRect(0,0,a,l*.22),d.textAlign="center",d.fillStyle="#3a2e1f",d.font="700 "+l*.11+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",e.forEach((g,v)=>d.fillText(g,a/2,l*.42+v*(l*.16))),d.fillStyle="#7a5f38",d.font="400 "+l*.06+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",d.fillText("PANNEAUTIQUE · DOMAINE PUBLIC",a/2,l*.86);const h=new Je(c);h.colorSpace=_e,h.anisotropy=Se?2:8;const f=new U(new Zt(5.3,2.8),new We({map:h}));return f.position.set(0,3.6,.09),i.add(f),i}function vg(n,t=0){const e=new Ft;e.position.copy(n),e.rotation.y=t;const i=new j({color:9071429,roughness:.85}),s=new j({color:6048304,roughness:.5,metalness:.4}),r=new U(new St(1.9,2.2,1.5),i);r.position.y=1.1,r.castShadow=!0,e.add(r);const o=new U(new St(2.4,.14,2),s);o.position.y=2.27,e.add(o);const a=new U(new Zt(.34,.2),new We({color:13608308,side:Ke}));a.position.set(1.05,2.42,.55),a.rotation.y=Math.PI/2,e.add(a);const l=new U(new St(1.9,.5,.25),s);l.position.set(0,.9,.82),e.add(l);const c=new U(new St(2.2,.06,.7),new j({color:12618344,roughness:.9}));c.position.set(0,1.65,.85),e.add(c);const d=document.createElement("canvas");d.width=128,d.height=96;const u=d.getContext("2d");u.fillStyle="#f2e7cd",u.fillRect(0,0,128,96),u.strokeStyle="rgba(138,111,69,0.6)",u.lineWidth=4,u.strokeRect(4,4,120,88),u.textAlign="center",u.fillStyle="#3a2e1f",u.font="700 20px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",u.fillText("LE QUOTIDIEN",64,40),u.font="400 15px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",u.fillStyle="#7a5f38",u.fillText("0,50 €",64,66);const h=new Je(d);h.colorSpace=_e,h.anisotropy=Se?2:8;const f=new U(new Zt(.7,.5),new We({map:h}));return f.position.set(0,1.35,.82),e.add(f),e.userData={flag:a},e}function Mg(){const n=[9415293,7045971,13215868,13805176],t=new Ft,e=new U(new Zt(.16,.1),new We({color:n[Math.random()*n.length|0],side:Ke,transparent:!0,opacity:.72}));return t.add(e),t}function yg(n,t){const e=window.innerWidth<=760;Km(e);const i=N=>e?Math.max(2,Math.round(N*.45)):N,s=new Oa({canvas:n,antialias:!e,alpha:!1});s.setPixelRatio(Math.min(window.devicePixelRatio,e?1.5:2)),s.setSize(window.innerWidth,window.innerHeight),s.toneMapping=Ur,s.toneMappingExposure=1.25,s.shadowMap.enabled=!e,s.shadowMap.type=Ir;const r=new za;r.fog=new Zn(Xt.skyHorizon,60,760);const o=new he(e?62:52,window.innerWidth/window.innerHeight,.1,900),a=new Un({side:Oe,depthWrite:!1,uniforms:{top:{value:new Nt(Xt.skyTop)},mid:{value:new Nt(Xt.skyMid)},horizon:{value:new Nt(Xt.skyHorizon)},sunDir:{value:new b(0,.16,-1).normalize()},sunColor:{value:new Nt(Xt.sun)}},vertexShader:`
      varying vec3 vPos;
      void main() { vPos = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
    `,fragmentShader:`
      varying vec3 vPos;
      uniform vec3 top, mid, horizon, sunColor, sunDir;
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
        float sun = pow(max(dot(dir, sunDir), 0.0), 42.0) * 1.5;
        float halo = pow(max(dot(dir, sunDir), 0.0), 7.0) * 0.4;
        col += sunColor * sun + sunColor * halo;
        // Plein jour : plus d'étoiles dans le ciel clair
        float starMask = smoothstep(0.16, 0.32, h);
        float s = step(0.9991, hash(dir));
        col += vec3(1.0) * s * starMask * 0.0;
        gl_FragColor = vec4(col, 1.0);
      }
    `});r.add(new U(new we(700,e?24:40,e?12:20),a));const l=new xi(new ei({map:Nn(0,"rgba(244,200,150,0.5)"),transparent:!0,blending:sn,depthWrite:!1,depthTest:!1}));l.position.set(42,56,-560),l.scale.setScalar(42),o.add(l),r.add(o);const c=new U(new wi(1600,e?32:48),new j({map:jc(),roughness:1,metalness:0}));c.rotation.x=-Math.PI/2,c.position.y=-.02,c.receiveShadow=!0,r.add(c);const d=[new b(0,0,0),new b(7,0,30),new b(-8,0,62),new b(9,0,96),new b(-9,0,132),new b(8,0,168),new b(-7,0,202),new b(6,0,236),new b(-8,0,270),new b(7,0,304),new b(-6,0,338),new b(8,0,372),new b(-8,0,406),new b(6,0,440),new b(0,0,468)],u=new Ze(d,!1,"centripetal",.6);u.arcLengthDivisions=1e3;const h=e?240:500,f=Tn(u,4.2,Xt.path,Zi(),h);f.position.y=.012,r.add(f);for(const N of[-1.5,1.5]){const k=Tn(u,.14,Xt.pathEdge,null,h);k.position.set(N,.025,0),r.add(k)}for(let N=0;N<=i(84);N++){const k=N/84*.96+.02,V=u.getPointAt(k),H=u.getTangentAt(k),Z=new U(new St(.14,.03,1.1),new Ve({color:14270604}));Z.position.set(V.x,.045,V.z),Z.rotation.y=Math.atan2(H.x,H.z),r.add(Z)}const g=[3.55,-3.55].map(N=>{const k=[],V=e?60:120;for(let H=0;H<=V;H++){const Z=H/V,ot=u.getPointAt(Z),lt=u.getTangentAt(Z),D=new b(-lt.z,0,lt.x).normalize();k.push(new b(ot.x+D.x*N,0,ot.z+D.z*N))}return new Ze(k,!1,"centripetal",.6)}),v=[2.42,-2.42].map(N=>{const k=[],V=e?60:120;for(let H=0;H<=V;H++){const Z=H/V,ot=u.getPointAt(Z),lt=u.getTangentAt(Z),D=new b(-lt.z,0,lt.x).normalize();k.push(new b(ot.x+D.x*N,0,ot.z+D.z*N))}return new Ze(k,!1,"centripetal",.6)}),m=og();for(const N of g){const k=Tn(N,2.2,13877398,m,h);k.position.y=.015,r.add(k)}for(const N of v){const k=Tn(N,.24,12100725,null,h);k.position.y=.035,r.add(k)}const p=new U(new Fs(u,e?200:400,.05,8,!1),new Ve({color:13015654,transparent:!0,opacity:.7,blending:Mi,depthWrite:!1}));p.position.y=.055,r.add(p);const S=p.geometry.index.count;r.add(new Jc(11772544,.75)),r.add(new $c(15918796,12101246,.5));const x=new Kc(16772552,2.2);x.position.set(-40,60,-120),x.castShadow=!0,x.shadow.mapSize.set(2048,2048),x.shadow.camera.left=-160,x.shadow.camera.right=160,x.shadow.camera.top=200,x.shadow.camera.bottom=-60,x.shadow.camera.near=10,x.shadow.camera.far=700,r.add(x),r.add(x.target);const _=[],L=[],T=t.length,R=[],P=[],M=[],y=[],C=[];function I(N,k){const V=ng(N,k);return y.push({g:V,phase:Math.random()*Math.PI*2}),r.add(V),V}function G(N,k,V){const H=ag(N,k,V);return C.push({g:H,phase:Math.random()*Math.PI*2}),r.add(H),H}t.forEach((N,k)=>{const V=.02+(k+.5)/T*.94,H=k%2===0?1:-1,Z=Qc(N,u,V,H,k);if(_.push(Z),L.push({mesh:Z.front,kind:"panel",index:k}),r.add(Z.group),r.add($i(Z.group.position,6.4,4.2)),k%3===0){const ot=new b(Math.cos(Z.group.rotation.y),0,-Math.sin(Z.group.rotation.y)).normalize(),lt=Z.group.position.clone().add(ot.clone().multiplyScalar(3.4));lt.y=0,G(lt,.9+Math.random()*.5,k),I(Z.group.position.clone().add(ot.clone().multiplyScalar(-3.2)),.7+Math.random()*.5)}});for(let N=0;N<i(40);N++){const k=N*13+Math.random()*7,V=7+Math.random()*27,H=4+Math.random()*3.5,Z=4+Math.random()*3.5;r.add(Sa(H,V,Z,k,-78-Math.random()*34)),r.add(Sa(H,V*(.7+Math.random()*.6),Z,k,78+Math.random()*34))}for(let N=0;N<i(14);N++){const k=30+Math.random()*450,V=Math.random()>.5?1:-1,H=28+Math.random()*55,Z=42+Math.random()*50;r.add(rg(new b(V*(210+Math.random()*150),H*.4-3,k),Z,H,38+Math.random()*30))}const J=new j({color:Xt.hill,roughness:1,flatShading:!0}),et=new U(new we(120,24,12),J);et.scale.set(1,.5,4),et.position.set(-230,-2,240),r.add(et);const K=new U(new we(150,24,12),J);K.scale.set(1,.55,4.5),K.position.set(280,0,330),r.add(K);const st=[];for(let N=0;N<=i(14);N++){const k=N/14*.96+.02,V=u.getPointAt(k),H=u.getTangentAt(k),Z=N%2===0?1:-1,ot=new b(-H.z,0,H.x).normalize(),lt=V.clone().add(ot.clone().multiplyScalar(Z*4.8));r.add(Ts(lt,Z));const D=As(lt,Z);st.push({glow:D.glow,pool:D.pool,i:N}),r.add(D.group)}for(let N=0;N<=i(13);N++){const k=N/13*.96+.02+.035;if(k>.98)continue;const V=u.getPointAt(k),H=u.getTangentAt(k),Z=N%2===0?-1:1,ot=new b(-H.z,0,H.x).normalize(),lt=V.clone().add(ot.clone().multiplyScalar(Z*5.3));r.add(wa(lt,Z));const D=V.clone().add(ot.clone().multiplyScalar(Z*4.6));if(G(D,.8+Math.random()*.5,N*3+1),N%3===1){const ct=V.clone().add(ot.clone().multiplyScalar(Z*6.1));r.add(lg(ct))}}const $=[],ht=t.map((N,k)=>.02+(k+.5)/T*.94);for(let N=0;N<i(30);N++){let k=Math.random();for(let ct=0;ct<8&&(k=Math.random(),!!ht.some(Y=>Math.abs(Y-k)<.018));ct++);const V=u.getPointAt(k),H=u.getTangentAt(k),Z=new b(-H.z,0,H.x).normalize(),ot=Math.random()>.5?1:-1,lt=V.clone().add(Z.clone().multiplyScalar(ot*(8.5+Math.random()*7.5))),D=Eo(lt,.9+Math.random()*.8);$.push({g:D,phase:Math.random()*Math.PI*2}),r.add(D)}const ft=[];for(let N=0;N<i(9);N++){const k=.04+Math.random()*.92,V=u.getPointAt(k),H=u.getTangentAt(k),Z=new b(-H.z,0,H.x).normalize(),ot=Math.random()>.5?1:-1,lt=V.clone().add(Z.clone().multiplyScalar(ot*(3.1+Math.random()*1.8))),D=cg();D.position.set(lt.x,0,lt.z),ft.push({g:D,phase:Math.random()*Math.PI*2,x0:lt.x,z0:lt.z}),r.add(D)}(e?[.14,.46]:[.14,.46,.82]).forEach((N,k)=>{const V=u.getPointAt(N),H=u.getTangentAt(N),Z=new b(-H.z,0,H.x).normalize(),ot=k%2===0?1:-1,lt=V.clone().add(Z.clone().multiplyScalar(ot*5.15)),D=Math.atan2(Z.x,Z.z)+(ot>0?0:Math.PI);r.add(ug(lt,D,k===1?["RÈGLES","D'AFFICHAGE"]:void 0)),r.add($i(lt,2,2)),r.add(bo(lt.clone().add(Z.clone().multiplyScalar(ot*-1.6)),2.2,.55))}),(e?[.24]:[.24,.62]).forEach((N,k)=>{const V=u.getPointAt(N),H=u.getTangentAt(N),Z=new b(-H.z,0,H.x).normalize(),ot=k%2===0?-1:1,lt=V.clone().add(Z.clone().multiplyScalar(ot*5.5));r.add(dg(lt,ot)),r.add($i(lt,4.6,2.6))}),(e?[.19,.85]:[.19,.52,.85]).forEach((N,k)=>{const V=u.getPointAt(N),H=u.getTangentAt(N),Z=new b(-H.z,0,H.x).normalize(),ot=k%2===0?1:-1,lt=V.clone().add(Z.clone().multiplyScalar(ot*6.4)),D=Math.atan2(H.x,H.z)+(ot>0?Math.PI:0),ct=[13215868,9415293,13805176],Y=hg(lt,ct[k%ct.length],D);P.push({g:Y,phase:Math.random()*Math.PI*2}),r.add(Y)});for(let N=0;N<i(5);N++){const k=.06+Math.random()*.88,V=u.getPointAt(k),H=u.getTangentAt(k),Z=new b(-H.z,0,H.x).normalize(),ot=Math.random()>.5?1:-1,lt=V.clone().add(Z.clone().multiplyScalar(ot*(5.9+Math.random()*1.4)));r.add(fg(lt,Math.random()*Math.PI*2))}[.32,.7].forEach((N,k)=>{const V=u.getPointAt(N),H=u.getTangentAt(N),Z=new b(-H.z,0,H.x).normalize(),ot=k%2===0?1:-1,lt=V.clone().add(Z.clone().multiplyScalar(ot*2.8));r.add(pg(lt,Math.atan2(H.x,H.z),k===0?"D":"A"))});for(let N=0;N<i(8);N++){const k=.08+Math.random()*.84,V=u.getPointAt(k),H=u.getTangentAt(k),Z=new b(-H.z,0,H.x).normalize(),ot=Math.random()>.5?1:-1,lt=V.clone().add(Z.clone().multiplyScalar(ot*(4.55+Math.random()*.4)));r.add(bo(lt,1.5+Math.random()*1.2,.5+Math.random()*.3))}[{t:.09,side:-1,lines:["RÉCLAMEZ","VOTRE VILLE"]},{t:.36,side:1,lines:["ESPACE","PUBLICITAIRE"]},{t:.62,side:-1,lines:["MOBILIER","URBAIN"]},{t:.88,side:1,lines:["ZONAGE","RÉGULÉ"]}].forEach(N=>{const k=u.getPointAt(N.t),V=u.getTangentAt(N.t),H=new b(-V.z,0,V.x).normalize(),Z=k.clone().add(H.clone().multiplyScalar(N.side*7.6)),ot=Math.atan2(-H.x*N.side,-H.z*N.side);r.add(_g(Z,ot,N.lines)),r.add($i(Z,6.4,4)),I(Z.clone().add(H.clone().multiplyScalar(N.side*2.3)),.8),I(Z.clone().add(H.clone().multiplyScalar(N.side*2.8)),.7)});{const k=u.getPointAt(.33),V=u.getTangentAt(.33),H=new b(-V.z,0,V.x).normalize(),Z=k.clone().add(H.clone().multiplyScalar(-11)),ot=gg();ot.position.copy(Z),R.push({g:ot,phase:0}),r.add(ot),r.add($i(Z,4.6,4.6));for(let lt=0;lt<4;lt++){const D=lt/4*Math.PI*2+.4,ct=Z.clone().add(new b(Math.cos(D)*2.7,0,Math.sin(D)*2.7));r.add(wa(ct,1)),G(ct.clone().add(new b(.6,0,0)),.8,lt)}r.add(Eo(Z.clone().add(new b(-3.4,0,1.4)),1.3)),r.add(Eo(Z.clone().add(new b(3.2,0,-1.2)),1.2))}{const k=u.getPointAt(.585),V=u.getTangentAt(.585),H=new b(-V.z,0,V.x).normalize(),Z=k.clone().add(H.clone().multiplyScalar(-6.2)),ot=Math.atan2(H.x,H.z),lt=vg(Z,ot);M.push({g:lt,phase:0}),r.add(lt),r.add($i(Z,3,2.6)),r.add(bo(Z.clone().add(new b(2.4,0,0)),1.6,.5))}const Et=[],mt=e?7:14;for(let N=0;N<mt;N++){const k=mg(),V=Math.random()>.5?1:-1,H=Math.random()>.5?1:-1;Et.push({g:k.g,legL:k.legL,legR:k.legR,arms:k.arms,t:.02+Math.random()*.96,speed:(.004+Math.random()*.005)*V,side:H,off:3+Math.random()*1.3,phase:k.phase,step:0}),r.add(k.g)}for(let N=0;N<i(34);N++){const k=Math.random(),V=u.getPointAt(k),H=u.getTangentAt(k),Z=new b(-H.z,0,H.x).normalize(),ot=Math.random()>.5?1:-1,lt=V.clone().add(Z.clone().multiplyScalar(ot*(9+Math.random()*22)));Math.random()<.5?r.add(jm(lt,1+Math.random()*2.4)):r.add(Qm(lt,.3+Math.random()*.9))}const Ut=[];for(let N=0;N<i(26);N++){const k=Math.random(),V=u.getPointAt(k),H=u.getTangentAt(k),Z=new b(-H.z,0,H.x).normalize(),ot=Math.random()>.5?1:-1,lt=V.clone().add(Z.clone().multiplyScalar(ot*(9+Math.random()*8))),D=tu(lt,.8+Math.random()*.8);Ut.push({g:D,phase:Math.random()*Math.PI*2}),r.add(D)}for(let N=0;N<i(60);N++){const k=Math.random(),V=u.getPointAt(k),H=u.getTangentAt(k),Z=new b(-H.z,0,H.x).normalize(),ot=Math.random()>.5?1:-1,lt=V.clone().add(Z.clone().multiplyScalar(ot*(5.8+Math.random()*3.4)));if(I(lt,.5+Math.random()*.8),Math.random()<.35){const D=V.clone().add(Z.clone().multiplyScalar(ot*(6.2+Math.random()*1.6)));G(D,.7+Math.random()*.5,N*7%9)}}const zt=[];for(let N=0;N<i(12);N++){const k=ig(new b((Math.random()-.5)*130,30+Math.random()*20,Math.random()*440),1.4+Math.random()*2.6);zt.push({g:k,speed:.5+Math.random()*.8,phase:Math.random()*Math.PI*2,y0:k.position.y,s0:k.scale.x}),r.add(k)}[{t:.12,side:1,lines:["Audit","d'abord"],tip:"Toute réorganisation commence par l'audit des acteurs du secteur."},{t:.5,side:-1,lines:["Zonage","du territoire"],tip:"Le zonage délimite les espaces publicitaires selon des normes."},{t:.88,side:1,lines:["Mise à jour","continue"],tip:"Un secteur en phase avec l'urbanisation se pérennise."}].forEach(N=>{const k=u.getPointAt(N.t),V=u.getTangentAt(N.t),H=new b(-V.z,0,V.x).normalize(),Z=k.clone().add(H.clone().multiplyScalar(N.side*5.5)),ot=new b().subVectors(k,Z).normalize(),lt=sg(Z,Math.atan2(ot.x,ot.z),N.lines);L.push({mesh:lt.sign,kind:"sign",tip:N.tip}),r.add(lt.group)});const se=tg(e?180:420);r.add(se);const Kt=[];for(let N=0;N<i(26);N++){const k=Mg(),V=Math.random(),H=u.getPointAt(V),Z=u.getTangentAt(V),ot=new b(-Z.z,0,Z.x).normalize(),lt=Math.random()>.5?1:-1,D=H.x+ot.x*lt*(2+Math.random()*7),ct=.4+Math.random()*4,Y=H.z+ot.z*lt*(2+Math.random()*7);k.position.set(D,ct,Y),Kt.push({g:k,x:D,y:ct,z:Y,vx:(Math.random()-.5)*2.2,vz:-(.8+Math.random()*1.4),vy:-(.3+Math.random()*.4),spin:(Math.random()-.5)*4,phase:Math.random()*Math.PI*2}),r.add(k)}const ve=[];for(let N=0;N<i(8);N++){const k=eg();k.g.position.set(-60+Math.random()*120,9+Math.random()*8,40+Math.random()*120),ve.push({g:k.g,l:k.l,r:k.r,phase:Math.random()*Math.PI*2,speed:4+Math.random()*3,y0:k.g.position.y,z0:k.g.position.z}),r.add(k.g)}const z=[];for(let N=0;N<i(7);N++){const k=xa();z.push({g:k.group,cone:k.cone,t:N/7,speed:.02+Math.random()*.014,phase:Math.random()*Math.PI*2}),r.add(k.group)}const ze=new b,Yt=new b,$t=new b,Dt=new b;let oe=performance.now()*.001,It=-1,A=null,w=1/0,W=0;function it(N){It=N}function rt(N,k){const V=performance.now()*.001,H=Math.min(.05,Math.max(.001,V-oe));oe=V;const Z=.005+N*.98,ot=u.getPointAt(Z),lt=u.getTangentAt(Z),D=u.getPointAt(Math.min(Z+.045,.999));$t.set(-lt.z,0,lt.x).normalize();const ct=Math.sin(V*.7)*.07,Y=Math.sin(V*.25)*.18;ze.set(ot.x+$t.x*Y,ot.y+3.45+ct,ot.z+$t.z*Y),Yt.set(D.x,D.y+2.7,D.z);{let F=0,yt=1/0;const Qt=Z+.03;for(let Ee=0;Ee<T;Ee++){const rn=.02+(Ee+.5)/T*.94,Qe=Math.abs(rn-Qt);Qe<yt&&(yt=Qe,F=Ee)}const ye=Gn.clamp(1-yt/.08,0,1);if(ye>0){const Ee=_[F].group.position,rn=ye*ye*(3-2*ye);Yt.lerp(new b(Ee.x,Ee.y+2.8,Ee.z),rn*.85)}}o.up.set(0,1,0),o.lookAt(Yt);const nt=Math.atan2(lt.x,lt.z),vt=nt-W;W=nt;const _t=Gn.clamp(vt/Math.max(H,.001)*.09,-.08,.08);o.rotation.z=Gn.lerp(o.rotation.z,_t,.06);const Bt=55,Me=15.2;Dt.addScaledVector(ze,Bt*H),Dt.addScaledVector(o.position,-Bt*H),Dt.multiplyScalar(Math.max(0,1-Me*H)),o.position.addScaledVector(Dt,H),p.geometry.setDrawRange(0,Math.floor(S*N)),_.forEach((F,yt)=>{const Qt=yt===k,ye=yt===It,Ee=Math.abs(N-(.02+(yt+.5)/T*.94))<.06,rn=Qt?1:ye?1.09:.86,Qe=ye?.22:Qt?.15:Ee?.05:0,Ti=ye?.12:.08;F.group.scale.setScalar(Gn.lerp(F.group.scale.x,rn,Ti)),F.light&&(F.light.intensity=Gn.lerp(F.light.intensity,Qe,Ti)),F.group.position.y=Gn.lerp(F.group.position.y,Qt?.22:0,.06),F.beaconMat.emissiveIntensity=.22+Math.sin(V*2.4+yt)*.1;const us=o.position.x-F.group.position.x,ds=o.position.z-F.group.position.z,Ai=Math.hypot(us,ds),Hs=Gn.clamp(1-Ai/34,0,1),Ci=Math.atan2(us,ds);F.group.rotation.y=Gn.lerp(F.group.rotation.y,Ci,Hs*.16)});for(const F of z){F.t=(F.t+F.speed*H)%1;const yt=u.getPointAt(F.t),Qt=u.getTangentAt(F.t);F.g.position.set(yt.x,.06+Math.sin(V*3+F.t*44)*.02,yt.z),F.g.rotation.y=Math.atan2(Qt.x,Qt.z),F.cone.material.opacity=.45+Math.sin(V*11+F.phase)*.15}for(const F of Ut)F.g.rotation.z=Math.sin(V*.9+F.phase)*.05,F.g.rotation.y+=3e-4;for(const F of $)F.g.rotation.z=Math.sin(V*.6+F.phase)*.03;for(const F of ft){const yt=Math.abs(Math.sin(V*2.2+F.phase))*.05;F.g.position.y=yt,F.g.rotation.z=Math.sin(V*2.2+F.phase)*.08,F.g.position.x=F.x0+Math.sin(V*.35+F.phase)*.4,F.g.position.z=F.z0+Math.cos(V*.3+F.phase)*.3}for(const F of Et){F.t=(F.t+F.speed*H)%1,F.t<0&&(F.t+=1);const yt=u.getPointAt(F.t),Qt=u.getTangentAt(F.t),ye=new b(-Qt.z,0,Qt.x).normalize();F.g.position.set(yt.x+ye.x*F.side*F.off,0,yt.z+ye.z*F.side*F.off),F.g.rotation.y=Math.atan2(Qt.x,Qt.z)+(F.side>0?0:Math.PI),F.step+=H*(6+Math.abs(F.speed)*90);const Ee=Math.sin(F.step)*.55;F.legL.rotation.x=Ee,F.legR.rotation.x=-Ee,F.arms.rotation.x=-Ee*.6,F.g.position.y=Math.abs(Math.sin(F.step))*.03}for(const F of st){const yt=.9+Math.sin(V*9+F.i*1.7)*.09;F.glow.material.opacity=.08*yt,F.pool.material.opacity=.1*yt}if(A){const F=(V-A.t0)/1.05;A.sp.position.lerpVectors(A.from,A.to,Math.min(1,F)),A.sp.material.opacity=Math.sin(Math.min(1,F)*Math.PI),F>=1&&(r.remove(A.sp),A.sp.material.dispose(),A=null,w=8+Math.random()*10)}else if(w-=H,w<=0){const F=new xi(new ei({map:Nn(0,"rgba(255,242,214,1)"),transparent:!0,blending:sn,depthWrite:!1,opacity:0}));F.scale.setScalar(2.4);const yt=new b(120+Math.random()*60,92+Math.random()*36,-330-Math.random()*130);F.position.copy(yt),r.add(F),A={sp:F,t0:V,from:yt,to:yt.clone().add(new b(-78,-30,16))}}for(const F of ve){F.g.position.x+=F.speed*.02,F.g.position.y=F.y0+Math.sin(V*1.3+F.phase)*.8,F.g.position.z=F.z0+Math.sin(V*.6+F.phase)*3.5;const yt=Math.sin(V*9+F.phase)*.7;F.l.rotation.z=yt,F.r.rotation.z=-yt,F.g.rotation.z=.25+Math.sin(V*1.3+F.phase)*.12+Math.cos(V*.6+F.phase)*.08,F.g.position.x>80&&(F.g.position.x=-80,F.y0=8+Math.random()*9,F.z0=30+Math.random()*90,F.g.position.z=F.z0,F.g.position.y=F.y0)}se.rotation.y=V*.05,se.material.opacity=.5+Math.sin(V*3)*.12,se.position.x=Math.sin(V*.12)*2.4,se.position.z=Math.cos(V*.09)*1.6;for(const F of zt){F.g.position.x+=F.speed*.02,F.g.position.y=F.y0+Math.sin(V*.22+F.phase)*.7;const yt=1+Math.sin(V*.3+F.phase)*.05;F.g.scale.set(F.s0*yt,F.s0*yt,F.s0*yt),F.g.position.x>150&&(F.g.position.x=-150)}for(const F of R){const yt=Math.sin(V*2.6+F.phase)*.5+1;F.g.userData.jet.scale.set(1,.7+.3*yt,1),F.g.userData.jet.rotation.z=Math.sin(V*3.1)*.06,F.g.userData.jet.rotation.x=Math.cos(V*2.7)*.05,F.g.userData.pool.rotation.z=V*.25;const Qt=1+Math.sin(V*1.8+F.phase)*.03;F.g.userData.pool.scale.set(Qt,Qt,Qt),F.g.userData.dish.rotation.z=Math.sin(V*1.4)*.03}for(const F of P)F.g.userData.parasol.rotation.z=Math.sin(V*.9+F.phase)*.06,F.g.userData.parasol.rotation.x=Math.sin(V*.7+F.phase*1.3)*.05;for(const F of M){const yt=F.g.userData.flag;yt.rotation.z=Math.sin(V*2.4+F.phase)*.28,yt.position.y=2.42+Math.sin(V*2.4+F.phase)*.04}for(const F of y)F.g.rotation.z=Math.sin(V*.7+F.phase)*.03;for(const F of C)F.g.rotation.z=Math.sin(V*.9+F.phase)*.06;for(const F of Kt)if(F.x+=(Math.sin(V*.5+F.phase)*.6+F.vx)*H,F.z+=F.vz*H,F.y+=F.vy*H,F.g.rotation.x+=F.spin*H,F.g.rotation.z+=F.spin*.6*H,F.g.position.set(F.x,F.y,F.z),F.y<.18){const yt=Math.min(.97,Math.max(.02,Z+(Math.random()-.35)*.12)),Qt=u.getPointAt(yt),ye=u.getTangentAt(yt),Ee=new b(-ye.z,0,ye.x).normalize(),rn=Math.random()>.5?1:-1;F.x=Qt.x+Ee.x*rn*(2+Math.random()*7),F.z=Qt.z+Ee.z*rn*(2+Math.random()*7),F.y=1.5+Math.random()*3,F.phase=Math.random()*Math.PI*2}}const tt=new Zm,Tt=new wt;function gt(N,k){Tt.set(N,k),tt.setFromCamera(Tt,o);const V=tt.intersectObjects(L.map(Z=>Z.mesh),!1);if(!V.length)return null;const H=V[0];return H.distance>45?null:L[L.findIndex(Z=>Z.mesh===H.object)]}function xt(){const N=window.innerWidth,k=window.innerHeight;o.aspect=N/k,o.updateProjectionMatrix(),s.setSize(N,k)}function Jt(){return o.position.clone()}function at(){s.render(r,o)}return{render:at,resize:xt,update:rt,pick:gt,getCameraPos:Jt,setHover:it}}const To={module:"Module 1",title:"Formation sur la panneautique",subtitle:"Domaine public"},Er=[{name:"Chapitre 1",label:"Introduction"},{name:"Chapitre 2",label:"Réorganisation & Réaménagement du secteur"},{name:"Chapitre 3",label:"Évaluation du système d'exploitation"},{name:"Chapitre 4",label:"Mise à jour"},{name:"Questionnaire",label:"Module 1"}],Ie=[{id:"presentation",chapter:0,num:"01",kicker:"Chapitre 1 · Présentation",title:"La panneautique, un véritable corps de métier",bullets:["Ensemble des moyens et techniques d'installation et de gestion des panneaux publicitaires","Une étude pluridisciplinaire"],content:[{t:"Un métier à part entière",b:"La panneautique, en tant qu'ensemble des moyens et techniques d'installation et de gestion des panneaux publicitaires, est un véritable corps de métier dont l'étude est pluridisciplinaire."},{t:"Ce que vous allez parcourir",b:"L'importance du panneau publicitaire, le constat général du secteur, puis la réorganisation complète en sept étapes, l'évaluation du système et sa mise à jour. Un questionnaire de douze questions clôture le module."}]},{id:"lecon1-importance",chapter:0,num:"02",kicker:"Chapitre 1 · Leçon 1",title:"Le panneau publicitaire et son importance socio-économique",bullets:["Booste la concurrence entre les entreprises","Propulse l'économie : compétitivité des acteurs","Vecteur de publicité : stimule la consommation","Participe à l'embellissement des villes"],content:[{t:"Un moteur pour la concurrence",b:"L'exploitation des panneaux publicitaires est une activité qui booste la concurrence entre les entreprises. Elle propulse l'économie grâce à l'accroissement et à l'amélioration de la compétitivité des différents acteurs de la vie économique d'un pays."},{t:"Le support de publicité par excellence",b:"Vecteur de publicité, le panneau stimule et encourage la consommation. Lorsque l'activité est bien réglementée et bien encadrée, les normes d'exercice garantissent l'équité dans la gestion du secteur. On ne paie pas pour regarder un panneau : c'est le support publicitaire par excellence."},{t:"Une part du décor urbain",b:"Par leurs aménagements, les panneaux publicitaires contribuent à l'embellissement des villes. Le choix des supports ne doit donc plus être motivé seulement par leur design, mais aussi par un besoin d'esthétique, pour un environnement et un cadre de vie plus agréables à la vue."}]},{id:"lecon2-constat",chapter:0,num:"03",kicker:"Chapitre 1 · Leçon 2",title:"Constat général",bullets:["Pléthore de panneaux, parfois dans les capitales","Pollution visuelle, insalubrité, insécurité","Secteur mal organisé, ou pas encadré du tout","Supports délabrés, absence de normes"],content:[{t:"Des villes saturées",b:"Dans beaucoup de villes à travers le monde — l'Afrique en est un bel exemple —, il est fréquent de constater, parfois dans des capitales, des cas de pléthore de panneaux publicitaires, cause de pollution visuelle, d'insalubrité et d'insécurité pour les personnes et les biens."},{t:"Une source : l'anarchie",b:"Un secteur d'exploitation mal organisé, mal encadré, ou pas encadré du tout, où règnent l'anarchie et le désordre, en est la source. L'état délabré et obsolète des supports, l'absence de normes et de réglementations rendent le secteur contre-productif et dégradent l'environnement."},{t:"Des mesures nécessaires",b:"Il importe donc, pour le rayonnement du secteur et pour sa contribution effective au développement socio-économique des villes, que des mesures adéquates soient prises."}]},{id:"audit",chapter:1,num:"04",kicker:"Chapitre 2 · Étape 1 · Audit",title:"Audit de la gestion en cours",bullets:["Liste exhaustive de tous les acteurs du secteur","Examen du mécanisme d'attribution des supports","Examen du cahier des charges"],content:[{t:"Étape 3.1",b:"Pour que l'activité d'exploitation des panneaux publicitaires participe au rayonnement d'une ville (ou d'un pays), il faut faire un audit de la gestion en cours."},{t:"En quoi consiste-t-il ?",b:"En l'établissement de la liste exhaustive de tous les acteurs — entreprise ou personne exploitant des panneaux à des fins publicitaires — et en l'examen du mécanisme d'attribution des supports et du cahier des charges."}]},{id:"etat-lieux",chapter:1,num:"05",kicker:"Chapitre 2 · Étape 2 · État des lieux",title:"État des lieux du parc existant",bullets:["Relevé GPS détaillé et précis de tous les panneaux","Plan piqué géolocalisable des supports"],content:[{t:"Étape 3.2",b:"Faire le relevé (GPS) détaillé et précis de l'ensemble des panneaux publicitaires présents."},{t:"Un plan géolocalisable",b:"Établir le plan piqué géolocalisable de ces supports : chaque panneau est localisé avec précision sur le territoire."}]},{id:"zonage",chapter:1,num:"06",kicker:"Chapitre 2 · Étape 3 · Zonage",title:"Zonage du territoire",bullets:["Délimitation selon des normes spécifiques du territoire","Des supports facteurs d'embellissement et de modernité","Paysage publicitaire harmonieux et équilibré","Grilles tarifaires adaptées aux réalités locales"],content:[{t:"Étape 3.3",b:"Pour un réaménagement optimal du plan d'implantation des panneaux publicitaires, il faut effectuer des délimitations suivant des normes spécifiques du territoire et proposer des supports facteurs d'embellissement et symboles de modernité."},{t:"Le but du zonage",b:"Créer les conditions d'un développement harmonieux et équilibré du paysage de l'affichage publicitaire, ainsi que l'établissement de grilles tarifaires en adéquation avec les réalités économiques des villes. Il consiste donc à délimiter des espaces à cette fin."}]},{id:"constitution-lots",chapter:1,num:"07",kicker:"Chapitre 2 · Étape 4 · Constitution des lots",title:"Constitution des lots",bullets:["Le « Mobilier Urbain de Publicité » : des objets d'embellissement","Des lots pour les appels d'offres","Équilibre des espaces et des types de supports"],content:[{t:"Étape 4",b:"Le terme « Mobilier Urbain de Publicité » s'inscrit dans un contexte où les panneaux publicitaires ne sont plus seulement des supports publicitaires, mais de véritables objets (ou meubles) d'embellissement et de décoration des villes."},{t:"Vers les appels d'offres",b:"Après études et validation des supports devant être pris en compte dans le cadre du réaménagement, on procède à la constitution des lots devant faire l'objet d'appels d'offres pour la mise en concession des différents espaces publicitaires."},{t:"Un équilibre garanti",b:"La constitution des lots est faite de manière à garantir l'équilibre des espaces et celui en matière de type de support des différentes régies publicitaires."}]},{id:"mise-concession",chapter:1,num:"08",kicker:"Chapitre 2 · Étape 5 · Mise en concession",title:"Mise en concession des espaces",bullets:["Une technique variable selon les pays","Fonction des réalités économiques et législatives","À traiter au cas par cas"],content:[{t:"Étape 5",b:"La technique de mise en concession des espaces publicitaires est variable. Elle est fonction des réalités économiques, politico-administratives et de la législation en vigueur dans chaque pays."},{t:"À retenir",b:"NB : il faut partir d'exemples précis et traiter le sujet au cas par cas."}]},{id:"attribution",chapter:1,num:"09",kicker:"Chapitre 2 · Étape 6 · Attribution",title:"Attribution des espaces",bullets:["Sur la base du cahier des charges","Contenu dans le dossier d'appel d'offres"],content:[{t:"Étape 6",b:"L'attribution des espaces aux régies publicitaires est faite sur la base du cahier des charges contenu dans le dossier d'appel d'offres."}]},{id:"gestion",chapter:1,num:"10",kicker:"Chapitre 2 · Étape 7 · Gestion",title:"Gestion des régies publicitaires",bullets:["Collectivités locales ou Gouvernement","Selon les textes en vigueur dans chaque pays","Transparence, professionnalisme, efficience"],content:[{t:"Étape 7",b:"La gestion des régies publicitaires est faite, dans certains pays, par les collectivités locales. Dans d'autres, elle est du ressort du Gouvernement par l'intermédiaire du Ministère de la Communication, etc."},{t:"L'essentiel",b:"Plus généralement, c'est selon les textes et dispositions en vigueur dans chaque pays. L'essentiel est que la transparence, le professionnalisme et l'efficience soient rigoureusement observés."}]},{id:"evaluation",chapter:2,num:"11",kicker:"Chapitre 3 · Évaluation",title:"Évaluer le système d'exploitation du Mobilier Urbain de Publicité",bullets:["Évaluer tout le processus, de l'audit à la gestion","Un mécanisme scientifiquement soutenable et autonome","Prévenir les dérapages, sécuriser sur le long terme"],content:[{t:"Chapitre 3",b:"Pour garantir un développement harmonieux du secteur d'exploitation des panneaux publicitaires / Mobilier Urbain de Publicité, il faut prévoir, dans les réformes, un mécanisme d'évaluation de l'ensemble du processus, depuis l'audit jusqu'à la gestion des régies publicitaires."},{t:"Un pilotage autonome",b:"Le mécanisme d'évaluation doit être scientifiquement soutenable, avec une autonomie certaine dans son pilotage. L'évaluation permet de prévenir les risques de dérapage et de sécuriser les intérêts des différents acteurs du secteur et des populations, à travers leur cadre de vie, sur le long terme."}]},{id:"mise-a-jour",chapter:3,num:"12",kicker:"Chapitre 4 · Mise à jour",title:"Pérenniser et faire évoluer le secteur",bullets:["Pérenniser les acquis de développement","Le rayonnement des villes par les supports","Une évolution en phase avec l'urbanisation"],content:[{t:"Chapitre 4",b:"La mise à jour du secteur d'exploitation des panneaux publicitaires / Mobilier Urbain de Publicité est importante pour pérenniser les acquis de développement de l'activité."},{t:"Pourquoi ?",b:"Elle est importante pour le rayonnement des villes par l'exploitation des supports de publicité et favorisera l'essor de l'activité en adéquation avec l'urbanisation."},{t:"Concrètement",b:"Elle consiste à s'assurer que le secteur, dans son évolution, soit en phase avec l'évolution démographique et le développement infrastructurel des villes."}]},{id:"quiz",chapter:4,num:"13",kicker:"Questionnaire · Module 1",title:"Douze questions pour valider le module",bullets:["5 définitions","7 questions de compréhension","Testez vos acquis en fin de parcours"],content:[]}],Qi=[{q:"Que désigne la panneautique ?",options:["L'ensemble des moyens et techniques d'installation et de gestion des panneaux publicitaires","La seule vente d'espaces publicitaires","La fabrication du mobilier urbain","La régulation des réseaux sociaux"],correct:0,explain:"La panneautique est l'ensemble des moyens et techniques d'installation et de gestion des panneaux publicitaires — un corps de métier pluridisciplinaire."},{q:"Quel est le but du zonage ?",options:["Multiplier les panneaux pour maximiser les recettes","Créer les conditions d'un développement harmonieux et équilibré du paysage de l'affichage publicitaire","Supprimer toute publicité des villes","Uniformiser tous les panneaux du pays"],correct:1,explain:"Le zonage délimite des espaces pour un paysage publicitaire harmonieux et équilibré, et établit des grilles tarifaires adaptées aux réalités économiques."},{q:"Que désigne le « Mobilier Urbain de Publicité » ?",options:["Les panneaux posés sur le mobilier des cafés","La publicité diffusée à la télévision urbaine","Des panneaux devenus de véritables objets d'embellissement et de décoration des villes","Les panneaux strictement destinés à la location"],correct:2,explain:"Le Mobilier Urbain de Publicité : des panneaux qui ne sont plus de simples supports, mais de véritables meubles d'embellissement et de décoration des villes."},{q:"Qu'est-ce qu'une régie publicitaire ?",options:["L'organisme autorisé à gérer et exploiter des espaces publicitaires","L'autorité qui interdit la publicité","L'entreprise qui imprime les affiches","L'organisme de contrôle des réseaux sociaux"],correct:0,explain:"Les régies publicitaires sont les exploitants auxquels les espaces sont attribués sur la base du cahier des charges contenu dans le dossier d'appel d'offres."},{q:"Qu'est-ce que la pollution visuelle, dans le cadre de l'exploitation des panneaux ?",options:["Les panneaux trop colorés","La publicité lumineuse la nuit","Le bruit produit par les panneaux numériques","Une pléthore de panneaux mal organisés qui dégrade le cadre de vie"],correct:3,explain:"Une pléthore de panneaux issus d'un secteur mal organisé ou non encadré est cause de pollution visuelle, d'insalubrité et d'insécurité."},{q:"En quoi consiste une réorganisation du secteur d'exploitation des panneaux publicitaires ?",options:["À augmenter le nombre d'exploitants","À privatiser tous les supports","À remettre de l'ordre : audit, état des lieux, zonage, lots, concession, attribution, gestion","À supprimer le cahier des charges"],correct:2,explain:"La réorganisation suit sept étapes : audit, état des lieux, zonage, constitution des lots, mise en concession, attribution des espaces et gestion des régies."},{q:"En quoi consiste le réaménagement de l'espace publicitaire d'une ville ?",options:["Délimiter des zones et proposer des supports facteurs d'embellissement et de modernité","Remplacer tous les panneaux par des écrans numériques","Retirer les panneaux des centres-villes","Uniformiser les tarifs à l'échelle nationale"],correct:0,explain:"Le réaménagement repose sur le zonage : délimiter des espaces selon des normes et proposer des supports qui embellissent et modernisent le cadre de vie."},{q:"Comment prévenir la pollution visuelle due à l'exploitation des panneaux ?",options:["En interdisant toute nouvelle publicité","En augmentant le nombre de panneaux","En confiant le secteur à une seule régie","En réglementant, auditant et zonant le secteur d'exploitation"],correct:3,explain:"Un secteur réglementé et encadré (audit, état des lieux, zonage, normes) prévient la pléthore de panneaux à l'origine de la pollution visuelle."},{q:"Comment s'assurer d'une bonne rentabilité et de la pérennité du secteur ?",options:["En baissant tous les tarifs","Par la transparence, le professionnalisme, l'efficience et une mise à jour régulière","En vendant les panneaux aux enchères chaque année","En supprimant l'évaluation"],correct:1,explain:"Transparence, professionnalisme et efficience sont essentiels ; l'évaluation et la mise à jour régulière pérennisent les acquis du secteur."},{q:"Peut-on installer un panneau publicitaire n'importe où ? Pourquoi ?",options:["Oui, la liberté d'entreprendre le permet","Oui, sauf dans les capitales","Non, l'implantation suit des normes, un zonage et des délimitations","Non, uniquement sur les autoroutes"],correct:2,explain:"L'implantation suit un zonage et des délimitations selon des normes spécifiques du territoire, pour un développement harmonieux et un cadre de vie agréable."},{q:"Quelle est l'importance du panneau publicitaire dans une ville ?",options:["Il booste la concurrence, l'économie et embellit le cadre de vie","Il ne sert qu'à décorer","Il remplace les marchés publics","Il est surtout un obstacle à la circulation"],correct:0,explain:"Il booste la concurrence entre entreprises, propulse l'économie et, bien aménagé, contribue à l'embellissement des villes."},{q:"N'importe qui peut-il exercer l'activité d'exploitation de panneaux publicitaires ?",options:["Oui, c'est totalement libre","Oui, moyennant une simple taxe","Non, seuls les ministères peuvent exploiter","Non : acteurs identifiés, appels d'offres et gestion encadrée"],correct:3,explain:"Le secteur est encadré : audit des acteurs, appels d'offres, cahier des charges, concession et gestion selon les textes en vigueur."}],ae=n=>document.querySelector(n);function Sg(){const n={topbar:ae("#ui-topbar"),chapter:ae("#ui-chapter"),progressFill:ae("#ui-progress-fill"),dots:ae("#ui-dots"),hint:ae("#ui-hint"),clickHint:ae("#ui-click-hint"),title:ae("#ui-title"),card:ae("#ui-card"),cardKicker:ae("#ui-card .card-kicker"),cardTitle:ae("#ui-card .card-title"),cardBody:ae("#ui-card .card-body"),quiz:ae("#ui-quiz"),quizScore:ae("#quiz-score"),quizList:ae("#quiz-list"),quizFill:ae("#quiz-progress-fill"),quizResult:ae("#quiz-result"),resultTitle:ae("#quiz-result .result-title"),resultText:ae("#quiz-result .result-text"),reader:ae("#ui-reader"),readerKicker:ae("#ui-reader .reader-kicker"),readerTitle:ae("#ui-reader .reader-title"),readerBody:ae("#ui-reader .reader-body"),readerCount:ae("#reader-count"),readerPrev:ae("#reader-prev"),readerNext:ae("#reader-next"),readerClose:ae("#reader-close"),toast:ae("#ui-toast"),cardOpen:ae("#card-open")};Ie.forEach((S,x)=>{const _=document.createElement("span");_.className="dot"+(x===0?" active":""),_.dataset.index=x,n.dots.appendChild(_)});const t={activeIndex:-1,quizAnswered:new Set,score:0,started:!1,readerOpen:!1,readerIndex:-1};let e=null,i=null;function s(S){n.progressFill.style.width=(S*100).toFixed(2)+"%"}function r(S){const x=Er[S];n.chapter.textContent=x?`${x.name} — ${x.label}`:""}function o(S,x){if(S===t.activeIndex)return;t.activeIndex=S;const _=Ie[S];document.querySelectorAll(".dot").forEach((T,R)=>{T.classList.toggle("active",R===S)});const L=_.id==="quiz";n.card.classList.toggle("show",!L&&S!==-1),n.quiz.classList.toggle("show",L),L||(n.cardKicker.textContent=_.kicker,n.cardTitle.textContent=_.title,n.cardBody.innerHTML=`<p class="card-note">Leçon prête à lire : ouvrez la fenêtre dédiée pour parcourir l'étape en entier.</p>`),r(_.chapter)}function a(S){S>.015&&(t.started=!0),n.title.classList.toggle("hide",t.started)}function l(S,x){s(S),o(x),a(S);const _=n.quiz.classList.contains("show");n.clickHint.classList.toggle("visible",x>=0&&!_&&!t.readerOpen)}function c(S){t.readerIndex=S,t.readerOpen=!0;const x=Ie[S];if(n.readerKicker.textContent=x.kicker,n.readerTitle.textContent=x.title,n.readerBody.innerHTML="",x.id==="quiz"){const _=document.createElement("ul");_.className="reader-bullets",x.bullets.forEach(T=>{const R=document.createElement("li");R.textContent=T,_.appendChild(R)}),n.readerBody.appendChild(_);const L=document.createElement("button");L.className="reader-quiz-btn",L.textContent="Lancer le questionnaire",L.addEventListener("click",d),n.readerBody.appendChild(L)}else x.content.forEach(_=>{const L=document.createElement("p"),T=document.createElement("span");T.className="body-t",T.textContent=_.t,L.appendChild(T),L.appendChild(document.createTextNode(_.b)),n.readerBody.appendChild(L)});n.readerCount.textContent=`${String(S+1).padStart(2,"0")} / ${String(Ie.length).padStart(2,"0")}`,n.title.classList.add("hide"),n.reader.classList.add("show"),e&&e(!0)}function d(){t.readerOpen&&(t.readerOpen=!1,n.reader.classList.remove("show"),e&&e(!1))}function u(S){if(!t.readerOpen)return;const x=Math.max(0,Math.min(Ie.length-1,t.readerIndex+S));x!==t.readerIndex&&c(x)}n.readerClose.addEventListener("click",d),n.readerPrev.addEventListener("click",()=>u(-1)),n.readerNext.addEventListener("click",()=>u(1)),n.reader.addEventListener("click",S=>{S.target===n.reader&&d()}),n.cardOpen.addEventListener("click",()=>{t.activeIndex>=0&&c(t.activeIndex)});function h(S){n.toast.textContent=S,n.toast.classList.add("show"),clearTimeout(i),i=setTimeout(()=>n.toast.classList.remove("show"),4600)}eu(t,n);function f(){return n.quiz.classList.contains("show")}function g(S){if(!f())return;const x=n.quizList.querySelectorAll(".quiz-card");for(const _ of x){if(_.classList.contains("done"))continue;const L=_.querySelectorAll(".quiz-opt");S<L.length&&L[S].click();return}}const v=document.querySelectorAll(".tsize-btn");function m(S){const x=document.documentElement;x.classList.toggle("ts-sm",S===0),x.classList.toggle("ts-lg",S===2),v.forEach(_=>{const L=Number(_.dataset.tsize)===S;_.classList.toggle("active",L),_.setAttribute("aria-pressed",String(L))});try{localStorage.setItem("panneau-tsize",String(S))}catch{}}let p=1;try{const S=Number(localStorage.getItem("panneau-tsize"));S>=0&&S<=2&&(p=S)}catch{}return m(p),v.forEach(S=>S.addEventListener("click",()=>m(Number(S.dataset.tsize)))),{updateGlobal:l,el:n,openReader:c,closeReader:d,readerNav:u,showToast:h,isReaderOpen:()=>t.readerOpen,quizOpen:f,answerQuiz:g,setReaderListener:S=>{e=S}}}function eu(n,t){const e=t.quizList;e.innerHTML="",Qi.forEach((i,s)=>{const r=document.createElement("div");r.className="quiz-card",r.innerHTML=`
      <div class="quiz-num">Question ${String(s+1).padStart(2,"0")}</div>
      <div class="quiz-q"></div>
      <div class="quiz-opts"></div>
      <div class="quiz-explain"></div>
    `,r.querySelector(".quiz-q").textContent=i.q;const o=r.querySelector(".quiz-opts");i.options.forEach((a,l)=>{const c=document.createElement("button");c.className="quiz-opt",c.innerHTML=`<span class="opt-letter">${String.fromCharCode(65+l)}.</span> <span class="opt-text"></span>`,c.querySelector(".opt-text").textContent=a,c.addEventListener("click",()=>{if(n.quizAnswered.has(s))return;n.quizAnswered.add(s);const d=l===i.correct;o.querySelectorAll(".quiz-opt").forEach((h,f)=>{f===i.correct?h.classList.add("correct"):f===l?h.classList.add("wrong"):h.classList.add("dim")}),d&&(n.score++,document.querySelector("#quiz-score").textContent=n.score);const u=r.querySelector(".quiz-explain");u.textContent=i.explain,u.classList.add("show"),r.classList.add("done",d?"correct-q":"wrong-q"),t.quizFill.style.width=(n.quizAnswered.size/Qi.length*100).toFixed(2)+"%",n.quizAnswered.size===Qi.length&&xg(n,t)}),o.appendChild(c)}),e.appendChild(r)})}function xg(n,t){const e=Math.round(n.score/Qi.length*100);let i;e>=90?i="Excellent ! Vous maîtrisez le module sur le bout des doigts.":e>=70?i="Très bien ! Quelques points à consolider, mais la base est solide.":e>=50?i="Bien. Relisez les leçons indiquées pour consolider vos acquis.":i="Le module mérite une seconde lecture : remontez le parcours et revivez les étapes.",t.resultTitle.textContent=e>=70?"Formation validée":"Formation à revoir";const s=Qi.length-n.score;t.resultText.innerHTML=`Score : <strong>${n.score} / ${Qi.length}</strong> — ${i}<br><span class="result-breakdown">${n.score} bonne${n.score>1?"s":""} réponse${n.score>1?"s":""} · ${s} à revoir</span>`,t.quizResult.classList.remove("hide"),document.querySelector("#quiz-retry").addEventListener("click",()=>{n.quizAnswered.clear(),n.score=0,document.querySelector("#quiz-score").textContent=0,t.quizFill.style.width="0%",t.quizResult.classList.add("hide"),eu(n,t)}),document.querySelector("#quiz-restart").addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})})}const Te={sky0:"#f6edd8",sky1:"#f2e6ca",sky2:"#eee0bf",sky3:"#eadab4",sky4:"#e6d3a6",sky5:"#e2cc9a",asphalt0:"#b39a6e",asphalt1:"#c4ab7e",asphalt2:"#d0b98c",bronze:"#9a8157",terracotta:"#c08a68",amber:"#cfa574"},vn=Math.PI*2;function Ce(n,t,e,i,s,r){n.beginPath(),n.moveTo(t+r,e),n.arcTo(t+i,e,t+i,e+s,r),n.arcTo(t+i,e+s,t,e+s,r),n.arcTo(t,e+s,t,e,r),n.arcTo(t,e,t+i,e,r),n.closePath()}function pe(n,t,e,i,s,r){n.font=s,n.textAlign="center",n.fillStyle=r,n.fillText(t,e,i)}function wg(n,t,e){const i=n.createLinearGradient(0,0,0,e);i.addColorStop(0,Te.sky0),i.addColorStop(.3,Te.sky1),i.addColorStop(.58,Te.sky2),i.addColorStop(.78,Te.sky3),i.addColorStop(.9,Te.sky4),i.addColorStop(1,Te.sky5),n.fillStyle=i,n.fillRect(0,0,t,e);const s=n.createRadialGradient(t/2,e*.6,10,t/2,e*.6,t*.72);s.addColorStop(0,"rgba(240,196,126,0.5)"),s.addColorStop(.5,"rgba(238,184,118,0.18)"),s.addColorStop(1,"rgba(238,184,118,0)"),n.fillStyle=s,n.fillRect(0,0,t,e)}function Ao(n,t,e,{minH:i,maxH:s,alpha:r,body:o,win:a,density:l,tall:c=.14}){let d=-12;for(;d<t+12;){const u=22+Math.random()*52,h=i+Math.random()*(s-i);n.fillStyle=o,n.globalAlpha=r,n.fillRect(d,e-h,u,h),Math.random()<c&&(n.fillRect(d+u/2-1,e-h-12,2,12),Math.random()<.5&&(n.fillStyle="rgba(196,138,104,0.85)"),n.fillRect(d+u/2-1,e-h-12,2,2));const f=Math.floor(u/14);for(let g=0;g<f;g++)for(let v=0;v<Math.floor(h/17);v++)if(Math.random()<l){const m=d+5+g*14,p=e-h+7+v*17;n.fillStyle=a,n.globalAlpha=r*(.4+Math.random()*.6),n.fillRect(m,p,4.5,6.5),Math.random()<.28&&(n.fillStyle="rgba(170,130,80,0.45)",n.fillRect(m-1.5,p-1.5,7.5,9.5))}n.globalAlpha=1,d+=u+4+Math.random()*9}}function bi(n,t,e){const i=e*.6;return wg(n,t,e),Ao(n,t,i,{minH:34,maxH:92,alpha:.45,body:"#d6c095",win:"#8f7a4e",density:.3}),Ao(n,t,i,{minH:20,maxH:62,alpha:.6,body:"#c9b184",win:"#7a663c",density:.5}),Ao(n,t,i,{minH:13,maxH:44,alpha:.85,body:"#bda375",win:"#665430",density:.68}),Eg(n,t,i),i}function Eg(n,t,e){const i=n.canvas.height,s=t/2,r=n.createLinearGradient(0,e,0,i);r.addColorStop(0,Te.asphalt0),r.addColorStop(.5,Te.asphalt1),r.addColorStop(1,Te.asphalt2),n.fillStyle=r,n.beginPath(),n.moveTo(s-1,e),n.lineTo(-40,i+20),n.lineTo(t+40,i+20),n.lineTo(s+1,e),n.closePath(),n.fill();const o=n.createRadialGradient(t/2,e+(i-e)*.38,6,t/2,e+(i-e)*.38,t*.24);o.addColorStop(0,"rgba(160,120,60,0.18)"),o.addColorStop(1,"rgba(160,120,60,0)"),n.fillStyle=o,n.fillRect(0,e,t,i-e),n.strokeStyle="rgba(90,70,40,0.55)",n.lineWidth=2,n.setLineDash([16,30]),n.beginPath(),n.moveTo(s,e+2),n.lineTo(s,i+20),n.stroke(),n.setLineDash([]),n.strokeStyle="rgba(90,70,40,0.25)",n.lineWidth=3;for(const a of[-1,1])n.beginPath(),n.moveTo(s+a*1.2,e+2),n.lineTo(t/2+a*t*.48,i+10),n.stroke()}function Kn(n,t,e,i,s){n.save(),n.translate(t,e),n.rotate(s||0),n.globalAlpha=.34,n.fillStyle="#000",n.beginPath(),n.ellipse(0,0,62*i,10*i,0,0,vn),n.fill(),n.globalAlpha=1;const r=n.createLinearGradient(-46*i,0,-38*i,0);r.addColorStop(0,"#6b5230"),r.addColorStop(1,"#8a6f45"),n.fillStyle=r,n.fillRect(-46*i,-80*i,9*i,80*i),n.fillRect(37*i,-80*i,9*i,80*i);const o=134*i,a=98*i,l=-o/2,c=-186*i;Ce(n,l,c,o,a,7*i),n.fillStyle="#f7eeda",n.fill(),n.lineWidth=5*i,n.strokeStyle=Te.bronze,n.stroke();const d=n.createLinearGradient(0,c,0,c+a);d.addColorStop(0,"#fdf8ec"),d.addColorStop(1,"#f1e6cb"),Ce(n,l+7*i,c+7*i,o-14*i,a-14*i,5*i),n.fillStyle=d,n.fill(),n.fillStyle=Te.terracotta,n.fillRect(l+7*i,c+7*i,o-14*i,5*i),n.strokeStyle="rgba(90,70,40,0.3)",n.lineWidth=1.5*i,Ce(n,l+13*i,c+15*i,o-26*i,a-26*i,4*i),n.stroke(),pe(n,"PANNEAUTIQUE · DOMAINE PUBLIC",0,c+34*i,`600 ${Math.max(7,9*i)}px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif`,"#7a5f38"),pe(n,"PUBLICITÉ & AFFICHAGE",0,c+60*i,`700 ${Math.max(10,15*i)}px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif`,"#3a2e1f"),pe(n,"RÈGLES · ZONES · CONCESSIONS",0,c+80*i,`700 ${Math.max(6,8*i)}px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif`,"#b3825e"),n.fillStyle=Te.amber,n.shadowColor=Te.amber,n.shadowBlur=16*i,n.beginPath(),n.arc(0,c-6*i,3*i,0,vn),n.fill(),n.shadowBlur=0;const u=n.createRadialGradient(0,-70*i,4,0,-70*i,48*i);u.addColorStop(0,"rgba(232,163,92,0.2)"),u.addColorStop(1,"rgba(232,163,92,0)"),n.fillStyle=u,n.fillRect(-64*i,-124*i,128*i,64*i),n.restore()}function bg(n,t,e,i,s){n.save(),n.translate(t,e),n.strokeStyle="#6b5230",n.lineCap="round",n.lineWidth=Math.max(3,i*.035),n.beginPath(),n.moveTo(0,0),n.quadraticCurveTo(10,-i*.5,5,-i*.94),n.stroke(),n.fillStyle="#5f7a4a";for(let r=0;r<6;r++){const o=-Math.PI*.95+r/5*Math.PI*.62;n.beginPath(),n.ellipse(Math.cos(o)*i*.34,-i*.97+Math.sin(o)*i*.1,i*.3,i*.05,o-Math.PI/2,0,vn),n.fill()}n.restore()}function Gs(n,t,e,i){const s=n.canvas.width,r=n.canvas.height;n.fillStyle="rgba(253,250,242,0.9)",n.fillRect(0,e,s,r-e),n.fillStyle="rgba(138,111,69,0.35)",n.fillRect(0,e,s,2),pe(n,t,s/2,e+i*1.45,`700 ${i}px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif`,"#7a5f38")}function je(n,t,e,i){const s=n.createRadialGradient(t/2,i,4,t/2,i,e*.6);s.addColorStop(0,"rgba(240,200,140,0.2)"),s.addColorStop(1,"rgba(240,200,140,0)"),n.fillStyle=s,n.fillRect(0,0,t,e);const r=n.createRadialGradient(t/2,e*.45,t*.2,t/2,e*.5,t*.74);r.addColorStop(0,"rgba(0,0,0,0)"),r.addColorStop(1,"rgba(140,115,75,0.3)"),n.fillStyle=r,n.fillRect(0,0,t,e);const o=n.createLinearGradient(0,0,0,e*.42);o.addColorStop(0,"rgba(120,95,55,0.14)"),o.addColorStop(1,"rgba(120,95,55,0)"),n.fillStyle=o,n.fillRect(0,0,t,e*.42),n.globalAlpha=.055;for(let a=0;a<420;a++)n.fillStyle=Math.random()>.5?"#fff":"#000",n.fillRect(Math.random()*t,Math.random()*e,1,1);n.globalAlpha=1}function Wa(n,t,e){const i=n.createLinearGradient(0,0,0,e);i.addColorStop(0,"#f3ead4"),i.addColorStop(.7,"#e6d8ba"),i.addColorStop(1,"#d9c8a2"),n.fillStyle=i,n.fillRect(0,0,t,e),n.fillStyle="rgba(120,95,55,0.18)";for(let c=0;c<5;c++)n.fillRect(t*(.04+c*.2),e*.05,t*.14,e*.44);const s=t*.6,r=e*.1,o=t*.26,a=e*.36;Ce(n,s,r,o,a,8);const l=n.createLinearGradient(0,r,0,r+a);l.addColorStop(0,"#cfe0e2"),l.addColorStop(1,"#f0e2c0"),n.fillStyle=l,n.fill(),n.strokeStyle="#7a5f38",n.lineWidth=6,Ce(n,s,r,o,a,8),n.stroke(),n.strokeStyle="rgba(90,70,40,0.4)",n.lineWidth=3,n.beginPath(),n.moveTo(s+o/2,r),n.lineTo(s+o/2,r+a),n.moveTo(s,r+a/2),n.lineTo(s+o,r+a/2),n.stroke()}function Xa(n,t,e){const i=e*.64,s=n.createLinearGradient(0,i,0,e);s.addColorStop(0,"#b08a5c"),s.addColorStop(.2,"#96714a"),s.addColorStop(1,"#6b4f30"),n.fillStyle=s,n.beginPath(),n.moveTo(t*.05,i),n.lineTo(t*.95,i),n.lineTo(t*.85,e),n.lineTo(t*.15,e),n.fill(),n.fillStyle="#7a5f3c",n.beginPath(),n.moveTo(t*.12,e*.8),n.lineTo(t*.88,e*.8),n.lineTo(t*.85,e),n.lineTo(t*.15,e),n.fill(),n.fillStyle="rgba(255,240,210,0.35)",n.beginPath(),n.moveTo(t*.05,i),n.lineTo(t*.95,i),n.lineTo(t*.93,i+10),n.lineTo(t*.07,i+10),n.fill()}function Pr(n,t,e,i,s,r,o){if(n.save(),n.translate(t,e),n.rotate(r||0),n.shadowColor="rgba(0,0,0,0.4)",n.shadowBlur=18,n.shadowOffsetY=10,Ce(n,-i/2,-s/2,i,s,4),n.fillStyle="#f4ead0",n.fill(),n.shadowBlur=0,n.strokeStyle="rgba(120,100,70,0.5)",n.lineWidth=2,n.stroke(),n.fillStyle=Te.terracotta,n.fillRect(-i/2,-s/2,i,s*.06),o){const a=typeof o=="number"?o:o.length;n.fillStyle="rgba(60,50,34,0.5)";for(let l=0;l<a;l++)n.fillRect(-i*.36,-s*.26+l*s*.09,i*.72,s*.02)}n.restore()}function nu(n,t,e){const i=n.createLinearGradient(0,0,0,e);i.addColorStop(0,"#efe7d3"),i.addColorStop(1,"#e0d3b6"),n.fillStyle=i,n.fillRect(0,0,t,e);for(let s=0;s<80;s++){const r=22+Math.random()*64,o=14+Math.random()*42;n.fillStyle=`rgba(178,166,138,${(.12+Math.random()*.2).toFixed(3)})`,n.fillRect(Math.random()*(t-r),Math.random()*(e-o),r,o)}n.fillStyle="rgba(120,162,184,0.4)",n.beginPath(),n.moveTo(0,e*.06),n.bezierCurveTo(t*.3,e*0,t*.62,e*.12,t*.8,e*.05),n.lineTo(t*.88,0),n.lineTo(0,0),n.fill(),n.strokeStyle="rgba(120,104,80,0.55)",n.lineWidth=2.5;for(let s=0;s<7;s++){const r=e*(.13+s*.13);n.beginPath(),n.moveTo(0,r),n.bezierCurveTo(t*.3,r+20,t*.6,r-20,t,r+8),n.stroke()}for(let s=0;s<9;s++){const r=t*(.1+s*.1);n.beginPath(),n.moveTo(r,0),n.bezierCurveTo(r+16,e*.3,r-16,e*.62,r+10,e),n.stroke()}n.lineWidth=5,n.strokeStyle="rgba(193,104,63,0.4)",n.beginPath(),n.moveTo(0,e*.2),n.bezierCurveTo(t*.35,e*.26,t*.55,e*.55,t*.84,e*.72),n.stroke(),n.save(),n.translate(t*.06,e*.09),n.fillStyle="rgba(255,255,255,0.65)",n.beginPath(),n.arc(0,0,26,0,vn),n.fill(),n.strokeStyle="rgba(90,74,52,0.6)",n.lineWidth=2,n.stroke(),n.fillStyle=Te.terracotta,n.beginPath(),n.moveTo(0,-18),n.lineTo(5,0),n.lineTo(-5,0),n.closePath(),n.fill(),pe(n,"N",0,-32,"700 15px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","rgba(90,74,52,0.9)"),n.restore()}function ws(n,t,e,i,s){n.save(),n.shadowColor="rgba(0,0,0,0.4)",n.shadowBlur=8,n.shadowOffsetY=4,n.fillStyle=i,n.beginPath(),n.moveTo(t,e-34),n.quadraticCurveTo(t+16,e-4,t+12,e-2),n.lineTo(t,e+6),n.lineTo(t-12,e-2),n.quadraticCurveTo(t-16,e-4,t,e-34),n.fill(),n.shadowBlur=0,n.fillStyle="#fff",n.beginPath(),n.arc(t,e-30,7.5,0,vn),n.fill(),n.fillStyle=i,n.beginPath(),n.arc(t,e-30,3.5,0,vn),n.fill(),s&&(n.font="800 19px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",n.lineWidth=4,n.strokeStyle="rgba(240,236,220,0.9)",n.strokeText(s,t+17,e-22),n.fillStyle="#2a2118",n.fillText(s,t+17,e-22)),n.restore()}function Co(n,t,e,i,s,r,o,a){const l=Math.PI*.75,c=Math.PI*1.5;n.lineCap="round",n.beginPath(),n.arc(t,e,i,l,l+c),n.strokeStyle="rgba(110,90,55,0.22)",n.lineWidth=14,n.stroke();const d=n.createLinearGradient(t-i,0,t+i,0);d.addColorStop(0,Te.terracotta),d.addColorStop(1,s),n.beginPath(),n.arc(t,e,i,l,l+c*r),n.strokeStyle=d,n.lineWidth=14,n.stroke(),pe(n,String(Math.round(r*100))+"%",t,e+8,"800 34px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#3a2e1f"),pe(n,o,t,e+i*.78+8,"700 18px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","rgba(90,74,52,0.75)")}function iu(n,t,e){const i=bi(n,t,e);bg(n,t*.1,i+20,e*.5),Kn(n,t*.5,i+2,1.12,0),Gs(n,"LE PARCOURS DE LA PANNEAUTIQUE SUR LE DOMAINE PUBLIC",e*.86,e*.03),je(n,t,e,i)}function Tg(n,t,e){const i=bi(n,t,e),s=5;for(let r=0;r<s;r++){const o=r===2,a=t*(.14+r*.18),l=i+(e-i)*.82*Math.pow(1-r/(s-1),.7)*.85+i*.12,c=.5+.18*r+(o?.12:0);Kn(n,a,Math.min(l,e-10),c,o?0:(r-2)*.05)}pe(n,"LA PANNEAUTIQUE, LEVIER ÉCONOMIQUE DU DOMAINE PUBLIC",t/2,e*.3,"700 34px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#3a2e1f"),n.shadowColor="rgba(255,255,255,0.75)",n.shadowBlur=12,pe(n,"CHAQUE SUPPORT EST UNE RESSOURCE",t/2,e*.34,"600 20px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#b3825e"),n.shadowBlur=0,je(n,t,e,i)}function Ag(n,t,e){const i=bi(n,t,e);Kn(n,t*.2,i+2,1,-.1),Kn(n,t*.46,i-6,.9,.12),Kn(n,t*.68,i+2,.75,-.26),Kn(n,t*.3,i+(e-i)*.7,.55,.38);const s=i+(e-i)*.92;n.fillStyle="rgba(253,250,242,0.92)",Ce(n,t*.05,s,t*.34,e*.05,4),n.fill();for(let r=0;r<12;r++)r%2===0?n.fillStyle="#cfa574":n.fillStyle="#7a5f38",n.fillRect(t*.055+r*t*.027,s+e*.008,t*.027,e*.034);pe(n,"PANNEAUX ANARCHIQUES — LE CONSTAT",t/2,s-e*.02,"700 28px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#3a2e1f"),je(n,t,e,i)}function Cg(n,t,e){Wa(n,t,e),Xa(n,t,e),Pr(n,t*.3,e*.56,t*.3,e*.3,-.04,8),Pr(n,t*.48,e*.6,t*.26,e*.26,.03,6);const i=t*.74,s=e*.56;n.save(),n.translate(i,s),n.shadowColor="rgba(0,0,0,0.45)",n.shadowBlur=16,n.shadowOffsetY=8,Ce(n,-t*.14,-e*.14,t*.28,e*.28,6),n.fillStyle="#e8d9b8",n.fill(),n.shadowBlur=0,n.strokeStyle="rgba(150,120,70,0.5)",n.stroke(),n.fillStyle=Te.terracotta,n.fillRect(-t*.14,-e*.14,t*.28,e*.035),n.fillStyle="#3a2a18";for(let r=0;r<6;r++)n.fillRect(-t*.11,-e*.08+r*e*.045,t*.22,e*.012);n.fillStyle="#57a05f";for(let r=0;r<4;r++)n.beginPath(),n.arc(-t*.11,-e*.08+r*e*.045,e*.014,0,vn),n.fill();pe(n,"LISTE DE CONTRÔLE",0,e*.11,"700 "+e*.028+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#2a2118"),n.restore(),n.save(),n.translate(t*.5,e*.42),n.rotate(.05),n.shadowColor="rgba(0,0,0,0.4)",n.shadowBlur=14,n.fillStyle="#4a3a26",Ce(n,-t*.11,-e*.02,t*.09,e*.05,6),n.fill(),n.shadowBlur=0,n.fillStyle="#f4ead0",Ce(n,-t*.1,-e*.016,t*.012,e*.044,3),n.fill(),n.restore(),Gs(n,"AUDIT : COMPRENDRE AVANT D'AGIR",e*.9,e*.032),je(n,t,e,e*.5)}function Rg(n,t,e){nu(n,t,e),n.strokeStyle="rgba(193,104,63,0.85)",n.lineWidth=4,n.setLineDash([12,9]),n.beginPath(),n.moveTo(t*.16,e*.2),n.bezierCurveTo(t*.38,e*.34,t*.55,e*.5,t*.84,e*.74),n.stroke(),n.setLineDash([]),ws(n,t*.16,e*.2,"#c97a62","P1"),ws(n,t*.32,e*.42,"#7d9ec2","P2"),ws(n,t*.5,e*.58,"#d2a878","P3"),ws(n,t*.7,e*.72,"#8fae8a","P4"),ws(n,t*.85,e*.8,"#c97a62","P5"),n.fillStyle="rgba(240,236,220,0.92)",Ce(n,t*.62,e*.07,t*.3,e*.22,6),n.fill(),n.strokeStyle="rgba(150,120,70,0.5)",n.stroke(),pe(n,"ÉTAT DES LIEUX — GPS",t*.77,e*.12,"700 "+e*.03+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#2a2118"),[["#c97a62","Support signalé"],["#7d9ec2","À vérifier"],["#8fae8a","Conforme"]].forEach(([s,r],o)=>{n.fillStyle=s,n.beginPath(),n.arc(t*.66,e*.16+o*e*.038,e*.013,0,vn),n.fill(),n.fillStyle="#4a3a28",n.font="500 "+e*.02+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",n.textAlign="left",n.fillText(r,t*.69,e*.166+o*e*.038)}),Gs(n,"RELEVÉ GPS DE TOUS LES SUPPORTS",e*.88,e*.032),je(n,t,e,e*.8)}function Pg(n,t,e){nu(n,t,e),[[.05,.1,.3,.34,"rgba(125,158,194,0.38)","ZONE A"],[.39,.06,.32,.3,"rgba(192,138,104,0.4)","ZONE B"],[.11,.5,.34,.34,"rgba(143,174,138,0.38)","ZONE C"],[.5,.44,.36,.42,"rgba(207,165,116,0.4)","ZONE D"]].forEach(([s,r,o,a,l,c])=>{n.fillStyle=l,n.fillRect(t*s,e*r,t*o,e*a),n.strokeStyle="rgba(50,40,28,0.55)",n.lineWidth=2.5,n.setLineDash([9,6]),n.strokeRect(t*s,e*r,t*o,e*a),n.setLineDash([]),n.fillStyle="rgba(20,14,8,0.65)",Ce(n,t*s+t*.012,e*r+e*.02,t*.09,e*.045,4),n.fill(),pe(n,c,t*s+t*.057,e*r+e*.052,"800 "+e*.026+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#fff")}),n.fillStyle="rgba(240,236,220,0.94)",Ce(n,t*.05,e*.86,t*.9,e*.11,6),n.fill(),n.strokeStyle="rgba(150,120,70,0.5)",n.stroke(),pe(n,"ZONAGE : LE TERRITOIRE DÉCOUPÉ EN ZONES RÉGLEMENTÉES",t*.5,e*.925,"700 "+e*.035+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#2a2118"),je(n,t,e,e*.85)}function Lg(n,t,e){const i=bi(n,t,e),s=i+(e-i)*.72;Kn(n,t*.74,s,.72,-.04);const r=t*.3,o=i+(e-i)*.6;n.fillStyle="#f7eeda",Ce(n,r-t*.16,o-e*.06,t*.32,e*.06,4),n.fill(),n.strokeStyle=Te.bronze,n.lineWidth=4,n.stroke(),n.fillStyle="rgba(90,70,40,0.35)";for(let a=0;a<5;a++)n.fillRect(r-t*.14+a*t*.06,o-e*.052,t*.045,e*.044);pe(n,"MOBILIER URBAIN DE PUBLICITÉ — LOT N° 01",r,o-e*.09,"700 "+e*.034+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#3a2e1f"),pe(n,"DES LOTS COHÉRENTS POUR UN FINANCEMENT MAÎTRISÉ",t/2,e*.24,"700 26px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#3a2e1f"),je(n,t,e,i)}function Dg(n,t,e){Wa(n,t,e),Xa(n,t,e),Pr(n,t*.42,e*.55,t*.46,e*.4,-.02,10),pe(n,"CONVENTION DE CONCESSION",t*.42,e*.34,"700 "+e*.036+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#2a2118");const i=t*.62,s=e*.66;n.save(),n.translate(i,s),n.rotate(-.14),n.fillStyle="#b03a30",Ce(n,-t*.07,-e*.028,t*.14,e*.056,6),n.fill(),n.strokeStyle="#7c241c",n.lineWidth=3,Ce(n,-t*.07,-e*.028,t*.14,e*.056,6),n.stroke(),pe(n,"CONCÉDÉ",0,e*.012,"800 "+e*.03+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#f4ead0"),n.restore(),n.save(),n.translate(t*.26,e*.62),n.rotate(.12),n.strokeStyle="#2a2118",n.lineWidth=3,n.lineCap="round",n.beginPath(),n.moveTo(-t*.02,e*.05),n.lineTo(0,0),n.lineTo(t*.012,-e*.06),n.moveTo(0,0),n.lineTo(-t*.02,-e*.02),n.stroke(),n.restore(),Gs(n,"MISE EN CONCESSION DES ESPACES PUBLICITAIRES",e*.9,e*.032),je(n,t,e,e*.5)}function Ig(n,t,e){Wa(n,t,e),Xa(n,t,e),Pr(n,t*.34,e*.56,t*.42,e*.36,-.02,8),pe(n,"CAHIER DES CHARGES",t*.34,e*.36,"700 "+e*.034+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#2a2118");const i=t*.55,s=e*.62;n.save(),n.translate(i,s),n.rotate(-.2),n.fillStyle="#57a05f",Ce(n,-t*.1,-e*.042,t*.2,e*.084,8),n.fill(),n.strokeStyle="#3a703f",n.lineWidth=4,Ce(n,-t*.1,-e*.042,t*.2,e*.084,8),n.stroke(),pe(n,"ADMIS",0,e*.012,"800 "+e*.055+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#f4f0d8"),n.restore(),Gs(n,"ATTRIBUTION DES LOTS PAR APPEL D'OFFRES",e*.9,e*.032),je(n,t,e,e*.5)}function Ug(n,t,e){const i=bi(n,t,e),s=t/2,r=t*.42,o=e*.46;n.fillStyle="#d3bd92",n.fillRect(s-r/2,i-o,r,o),n.fillStyle="#c9b184";for(let d=0;d<5;d++)n.fillRect(s-r/2+d*r/5+4,i-o,r/5-8,o);n.fillStyle="rgba(160,120,60,0.55)";for(let d=0;d<6;d++)for(let u=0;u<2;u++)Math.random()<.7&&n.fillRect(s-r/2+u*r/2+r*.08,i-o+o*.1+d*o*.13,r*.18,o*.06);const a=i-o*.18;n.fillStyle="#6b5230",n.fillRect(s-t*.03,a-e*.045,t*.06,e*.045),pe(n,"RÉGIE PUBLICITAIRE",s,a-e*.055,"700 "+e*.026+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#3a2e1f");const l=s,c=i-o-e*.08;n.strokeStyle="#4a3a26",n.lineWidth=4,n.beginPath(),n.moveTo(l,c+e*.14),n.lineTo(l,c),n.stroke(),n.fillStyle="#c08a68",n.beginPath(),n.moveTo(l,c-e*.03),n.lineTo(l-t*.012,c),n.lineTo(l+t*.012,c),n.fill(),pe(n,"GESTION DES RÉGIES : UN SERVICE EN RÈGIE DIRECTE",t/2,e*.22,"700 26px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#3a2e1f"),je(n,t,e,i)}function Ng(n,t,e){const i=n.createLinearGradient(0,0,0,e);i.addColorStop(0,"#efe5cd"),i.addColorStop(1,"#e4d5b4"),n.fillStyle=i,n.fillRect(0,0,t,e),n.fillStyle="#faf3e2",Ce(n,t*.05,e*.08,t*.9,e*.84,10),n.fill(),n.strokeStyle="rgba(138,111,69,0.5)",n.lineWidth=3,n.stroke(),Co(n,t*.25,e*.38,e*.14,Te.amber,.9,"AUDIT"),Co(n,t*.5,e*.38,e*.14,Te.terracotta,.78,"CONCESSION"),Co(n,t*.75,e*.38,e*.14,"#7da878",.86,"GESTION"),n.strokeStyle="#7da878",n.lineWidth=4,n.beginPath(),n.moveTo(t*.12,e*.68),n.bezierCurveTo(t*.24,e*.6,t*.3,e*.66,t*.42,e*.55),n.bezierCurveTo(t*.55,e*.62,t*.6,e*.5,t*.72,e*.5),n.bezierCurveTo(t*.8,e*.48,t*.86,e*.42,t*.9,e*.4),n.stroke(),n.fillStyle="#7da878",n.beginPath(),n.arc(t*.9,e*.4,7,0,vn),n.fill(),pe(n,"ÉVALUATION DU SYSTÈME",t/2,e*.93,"700 "+e*.036+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#7a5f38"),je(n,t,e,e*.5)}function Fg(n,t,e){const i=bi(n,t,e);[[t*.24,e*.4],[t*.62,e*.5],[t*.84,e*.34]].forEach(([r,o])=>{const a=i-o;n.strokeStyle="#5c4a30",n.lineWidth=6,n.lineCap="butt",n.beginPath(),n.moveTo(r-18,i),n.lineTo(r+12,a),n.lineTo(r+46,a+16),n.moveTo(r+12,a),n.lineTo(r+12,a+60),n.moveTo(r+12,a+14),n.lineTo(r+58,a+26),n.stroke(),n.lineWidth=3,n.strokeStyle="#4a3a26",n.beginPath(),n.moveTo(r-8,a+26),n.lineTo(r+58,a+32),n.stroke()}),Kn(n,t*.5,i+(e-i)*.78,.62,-.1),pe(n,"LE SECTEUR SE MODERNISE, LE PARC S'ADAPTE",t/2,e*.24,"700 28px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#3a2e1f"),je(n,t,e,i)}function Og(n,t,e){const i=bi(n,t,e);n.fillStyle="rgba(253,250,242,0.93)",Ce(n,t*.2,e*.12,t*.6,e*.72,18),n.fill(),n.strokeStyle="rgba(138,111,69,0.5)",n.lineWidth=3,n.stroke(),n.fillStyle="rgba(201,143,78,0.16)",n.beginPath(),n.arc(t*.5,e*.42,e*.22,0,vn),n.fill(),n.strokeStyle="rgba(201,143,78,0.4)",n.lineWidth=3,n.stroke(),n.fillStyle="#7a5f38",n.font="800 "+e*.26+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",n.textAlign="center",n.fillText("?",t*.5,e*.52),pe(n,"12 QUESTIONS — VALIDEZ VOS ACQUIS",t*.5,e*.72,"700 "+e*.034+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#3a2e1f"),pe(n,"DÉFINITIONS · ZONES · CONCESSIONS · RÈGIES",t*.5,e*.79,"500 "+e*.02+"px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif","#b3825e"),je(n,t,e,i)}const zg={presentation:iu,"lecon1-importance":Tg,"lecon2-constat":Ag,audit:Cg,"etat-lieux":Rg,zonage:Pg,"constitution-lots":Lg,"mise-concession":Dg,attribution:Ig,gestion:Ug,evaluation:Ng,"mise-a-jour":Fg,quiz:Og};function Bg(n,t,e,i){n.width=e,n.height=i;const s=n.getContext("2d");(zg[t]||iu)(s,e,i)}const ts=Math.PI*2;let ci=null,Lr=!1;function kg(){if(Lr)return null;if(!ci)try{const n=document.createElement("canvas");ci=new Oa({canvas:n,antialias:!0,alpha:!1,preserveDrawingBuffer:!0}),ci.toneMapping=Ur,ci.toneMappingExposure=1.2,ci.shadowMap.enabled=!0,ci.shadowMap.type=Ir}catch(n){return Lr=!0,console.warn("Illustrations 3D indisponibles (WebGL) — fallback 2D.",n),null}return ci}function An(n,t=1024,e=1024){const i=document.createElement("canvas");i.width=t,i.height=e;const s=i.getContext("2d");n(s,t,e);const r=new Je(i);return r.colorSpace=_e,r.anisotropy=4,r}function Is(n,t,e,i,s,r){n.beginPath(),n.moveTo(t+r,e),n.arcTo(t+i,e,t+i,e+s,r),n.arcTo(t+i,e+s,t,e+s,r),n.arcTo(t,e+s,t,e,r),n.arcTo(t,e,t+i,e,r),n.closePath()}function mn(n=0){const t=["sunset","waves","dune","rings","prism","ember"],e=t[n%t.length];return An((i,s,r)=>{const o=i.createLinearGradient(0,0,s*(n%2?1:-1),r);if(o.addColorStop(0,["#8a6a4e","#96745a","#7d6350"][n%3]),o.addColorStop(1,["#c29a78","#c9a280","#b08c6e"][(n+1)%3]),i.fillStyle=o,i.fillRect(0,0,s,r),i.fillStyle="rgba(242,232,212,0.9)",i.beginPath(),i.arc(s*.5,r*.38,r*.2,0,ts),i.fill(),i.fillStyle="rgba(232,163,92,0.95)",i.beginPath(),i.arc(s*.5,r*.38,r*.13,0,ts),i.fill(),i.strokeStyle="rgba(242,232,212,0.5)",i.lineWidth=8,e==="waves"||e==="rings")for(let a=0;a<4;a++)i.beginPath(),i.arc(s*.5,r*.4,r*(.24+a*.08),0,ts),i.stroke();else for(let a=0;a<3;a++)i.beginPath(),i.moveTo(s*.2,r*(.72-a*.14)),i.quadraticCurveTo(s*.5,r*(.6-a*.14),s*.8,r*(.72-a*.14)),i.stroke();i.fillStyle="rgba(242,232,212,0.28)",i.fillRect(s*.16,r*.84,s*.68,3)},512,384)}function Ro(n,t){const e=new Ze([new b(0,0,-20),new b(0,0,140)]);return Qc(n,e,.5,1,t).group}function ui(n,t={}){const e=new Ft,i=new j({color:Xt.walnut,roughness:.8,metalness:.05}),s=new j({color:Xt.bronze,roughness:.55,metalness:.35}),r=t.w??6.6,o=t.h??4.4,a=new U(new St(r,o,.22),i);a.position.y=3,a.castShadow=!0,e.add(a);const l=new U(new St(r+.4,.26,.3),s);l.position.y=o+.92,e.add(l);const c=new U(new St(r+.4,.26,.3),s);c.position.y=.72,e.add(c);const d=new We({map:n}),u=new U(new Zt(r-.4,o-.4),d);return u.position.set(0,3,.13),e.add(u),e}function Gg(n){const t=new Ft,e=new j({color:Xt.walnutDark,roughness:.7,metalness:.2}),i=new U(new Ot(.09,.12,3.4,8),e);i.position.y=1.7,i.castShadow=!0,t.add(i);const s=new We({map:n}),r=new U(new Zt(1.5,2.1),s);r.position.y=3.9,t.add(r);const o=new U(new Ot(.14,.1,.24,8),e);return o.position.y=5.15,t.add(o),t}function Hg(n){const t=new Ft,e=new j({color:4864550,roughness:.5,metalness:.5}),i=new j({color:10336447,roughness:.15,metalness:.4,transparent:!0,opacity:.5}),s=new j({color:Xt.bronze,roughness:.5,metalness:.45});for(const d of[-2.2,2.2]){const u=new U(new Ot(.08,.1,2.8,8),e);u.position.set(d,1.4,0),t.add(u)}const r=new U(new St(5.4,.16,2.6),s);r.position.y=2.9,r.rotation.x=.06,t.add(r);const o=new U(new St(5.4,2.1,.1),i);o.position.set(0,1.75,-1.15),t.add(o);const a=new U(new St(4.4,.08,.4),new j({color:7031340}));a.position.set(0,.5,-.3),t.add(a);const l=new We({map:n}),c=new U(new Zt(3.4,2),l);return c.position.set(0,1.9,.14),t.add(c),t}function Vg(n){const t=new Ft,e=new U(new St(2.6,2.6,.5),new j({color:Xt.walnut,roughness:.7}));e.position.y=1.3,t.add(e);const i=new We({map:n}),s=new U(new Zt(2.2,2),i);s.position.set(0,1.35,.27),t.add(s);const r=new U(new St(3,.12,1),new j({color:Xt.bronze,roughness:.5,metalness:.4}));return r.position.y=2.72,t.add(r),t}function cc(n=!1){return An((t,e,i)=>{const s=t.createLinearGradient(0,0,0,i);s.addColorStop(0,"#efe7d3"),s.addColorStop(1,"#dcc9a6"),t.fillStyle=s,t.fillRect(0,0,e,i);for(let r=0;r<70;r++){const o=24+Math.random()*90,a=14+Math.random()*60;t.fillStyle=`rgba(178,166,138,${(.1+Math.random()*.22).toFixed(3)})`,t.fillRect(Math.random()*(e-o),Math.random()*(i-a),o,a)}t.fillStyle="rgba(120,162,184,0.35)",t.fillRect(0,0,e*.16,i*.12),t.fillRect(e*.82,i*.72,e*.18,i*.28),t.fillStyle="rgba(109,168,124,0.35)",t.fillRect(e*.6,i*.08,e*.28,i*.18),t.strokeStyle="rgba(120,104,80,0.5)",t.lineWidth=3;for(let r=0;r<6;r++){const o=i*(.1+r*.16);t.beginPath(),t.moveTo(0,o),t.bezierCurveTo(e*.3,o+16,e*.6,o-14,e,o+8),t.stroke()}for(let r=0;r<7;r++){const o=e*(.08+r*.14);t.beginPath(),t.moveTo(o,0),t.bezierCurveTo(o+14,i*.3,o-12,i*.62,o+8,i),t.stroke()}n&&[[.08,.12,.3,.34,"rgba(125,158,194,0.36)"],[.44,.1,.3,.3,"rgba(192,138,104,0.38)"],[.12,.52,.32,.32,"rgba(143,174,138,0.36)"],[.5,.5,.36,.38,"rgba(207,165,116,0.38)"]].forEach(([o,a,l,c,d])=>{t.fillStyle=d,t.fillRect(e*o,i*a,e*l,i*c),t.strokeStyle="rgba(50,40,28,0.6)",t.lineWidth=4,t.setLineDash([12,8]),t.strokeRect(e*o,i*a,e*l,i*c),t.setLineDash([])})},1024,1024)}function uc(n){const t=new Ft,e=new j({color:n,roughness:.5,metalness:.2,emissive:n,emissiveIntensity:.5}),i=new U(new ni(.28,.7,12),e);i.position.y=.7,t.add(i);const s=new U(new we(.16,10,8),e);return s.position.y=1.15,t.add(s),t}function Po(){const n=new Ft,t=new j({color:9071429,roughness:.6,metalness:.05}),e=new j({color:4864550,roughness:.8}),i=new U(new St(3.4,.14,1.5),t);i.position.y=1,i.castShadow=!0,n.add(i);for(const[s,r]of[[-1.5,-.6],[1.5,-.6],[-1.5,.6],[1.5,.6]]){const o=new U(new St(.12,1,.12),e);o.position.set(s,.5,r),n.add(o)}return n}function Wg(n=.85,t=1.15,e=0){const i=new Ft,s=new U(new St(n,.02,t),new j({color:16050896,roughness:.85}));i.add(s);const r=new Ve({color:7034424});for(let o=0;o<5;o++){const a=new U(new St(n*.72,.005,.02),r);a.position.set(0,.012,t*.32-o*t*.14),i.add(a)}return i.rotation.y=e,i}function Xg(){const n=new Ft,t=new U(new St(.72,.03,.98),new j({color:13215850,roughness:.6}));n.add(t);const e=new U(new Zt(.62,.86),new j({color:16050896,roughness:.9}));e.position.set(0,.02,.02),n.add(e);const i=new U(new St(.2,.06,.3),new j({color:6048304,metalness:.6,roughness:.3}));return i.position.set(0,.05,.42),n.add(i),n}function qg(n=.2){const t=new Ft,e=new U(new Dn(.34,.05,12,28),new j({color:Xt.bronze,roughness:.3,metalness:.7}));t.add(e);const i=new U(new wi(.33,28),new j({color:12574950,transparent:!0,opacity:.35,roughness:.05,metalness:.4}));t.add(i);const s=new U(new Ot(.035,.05,.5,10),new j({color:4864550,roughness:.7}));return s.position.set(-.4,-.15,0),s.rotation.z=.9,t.add(s),t.rotation.x=n,t}function Lo(n=16758896){const t=new Ft,e=new j({color:4864550,roughness:.4,metalness:.6}),i=new U(new Ot(.28,.34,.1,16),e);i.position.y=.05,t.add(i);const s=new U(new Ot(.05,.05,1.1,10),e);s.position.y=.65,t.add(s);const r=new U(new St(.9,.05,.05),e);r.position.set(.42,1.25,0),t.add(r);const o=new U(new ni(.16,.22,14),e);o.position.set(.85,1.28,0),o.rotation.z=-Math.PI/2,t.add(o);const a=new U(new we(.07,10,8),new j({color:n,emissive:n,emissiveIntensity:2.2}));a.position.set(.9,1.18,0),t.add(a);const l=new Va(n,1.6,9,2);return l.position.set(.9,1.1,0),t.add(l),{g:t,light:l}}function Yg(){const n=new Ft,t=new U(new Ot(.05,.05,.8,12),new j({color:3813154,roughness:.4,metalness:.5}));t.position.y=.4,n.add(t);const e=new U(new ni(.05,.16,12),new j({color:Xt.bronze,metalness:.8,roughness:.3}));e.position.y=-.02,e.rotation.x=Math.PI,n.add(e);const i=new U(new Ot(.055,.055,.18,12),new j({color:12151365,roughness:.5}));return i.position.y=.92,n.add(i),n}function dc(n=11549232,t="CONCÉDÉ"){const e=new Ft,i=new U(new Ot(.42,.42,.24,20),new j({color:n,roughness:.5}));e.add(i);const s=new U(new Ot(.12,.14,.3,12),new j({color:4864550,roughness:.6}));s.position.y=.27,e.add(s);const r=new U(new Dn(.42,.03,8,24),new j({color:16050896,roughness:.6}));return r.rotation.x=Math.PI/2,r.position.y=.121,e.add(r),e}function $g(){const n=new Ft,t=new j({color:9071165,roughness:.5}),e=new U(new Ot(.05,.06,.9,12),t);e.rotation.z=Math.PI/2,n.add(e);const i=new U(new Ot(.14,.14,.34,12),t);return i.position.set(.55,.12,0),i.rotation.z=Math.PI/2,n.add(i),n}function Zg(n=0){const t=new Ft,e=new U(new St(.6,.05,.42),new j({color:16050896,roughness:.85}));t.add(e);const i=new U(new Ot(.09,.09,.02,12),new j({color:11549232,roughness:.4}));return i.position.y=.035,t.add(i),t.rotation.y=n,t}function Kg(n,t,e){return An((i,s,r)=>{i.fillStyle="#f7f0de",Is(i,6,6,s-12,r-12,20),i.fill(),i.strokeStyle="rgba(138,111,69,0.55)",i.lineWidth=4,Is(i,6,6,s-12,r-12,20),i.stroke();const o=s/2,a=r*.56,l=r*.32,c=Math.PI*.75,d=Math.PI*1.5;i.lineCap="round",i.lineWidth=26,i.strokeStyle="rgba(110,90,55,0.22)",i.beginPath(),i.arc(o,a,l,c,c+d),i.stroke(),i.strokeStyle=t,i.beginPath(),i.arc(o,a,l,c,c+d*n),i.stroke(),i.fillStyle="#3a2e1f",i.font="800 90px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",i.textAlign="center",i.fillText(Math.round(n*100)+"%",o,a+22),i.fillStyle="rgba(90,74,52,0.75)",i.font="600 30px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",i.fillText(e,o,a+l+44)},512,512)}function hc(n=1){const t=new Ft,e=new j({color:4864550,roughness:.5,metalness:.4}),i=new j({color:Xt.terracotta,roughness:.6}),s=17*n,r=new U(new St(.5,s,.5),e);r.position.y=s/2,r.castShadow=!0,t.add(r);const o=new U(new St(.35,.35,15*n),e);o.position.set(0,s+.6,5*n),t.add(o);const a=new U(new St(1,1,1),i);a.position.set(0,s,-1.6*n),t.add(a);for(const h of[-.2,.2]){const f=new U(new Ot(.03,.03,8*n,6),e);f.position.set(h,s+.4,6.6*n),f.rotation.x=-.35,t.add(f)}const l=new Ba({color:6048304}),c=[new b(0,s+.5,8*n),new b(0,s-3*n,8*n)],d=new xe().setFromPoints(c);t.add(new Xc(d,l));const u=new U(new St(.3,.3,.3),e);return u.position.set(0,s-3.4*n,8*n),t.add(u),t}function Jg(n,t=60){const e=new Float32Array(t*3),i=new Float32Array(t*3),s=[12618344,13805688,16050896,9416330,10521188];for(let l=0;l<t;l++){e[l*3]=(Math.random()-.5)*14,e[l*3+1]=Math.random()*9,e[l*3+2]=(Math.random()-.5)*14;const c=new Nt(s[l%s.length]);i[l*3]=c.r,i[l*3+1]=c.g,i[l*3+2]=c.b}const r=new xe;r.setAttribute("position",new De(e,3)),r.setAttribute("color",new De(i,3));const o=new Br({size:.16,vertexColors:!0,transparent:!0,opacity:.85}),a=new ka(r,o);return n.add(a),a}function $e(n,t={}){const e=An((g,v,m)=>{const p=g.createLinearGradient(0,0,0,m);p.addColorStop(0,"#f8f1de"),p.addColorStop(.34,"#f4e9cf"),p.addColorStop(.6,"#efe1bf"),p.addColorStop(.82,"#e9d7ab"),p.addColorStop(1,"#e1cc95"),g.fillStyle=p,g.fillRect(0,0,v,m);const S=g.createLinearGradient(0,m*.58,0,m);S.addColorStop(0,"rgba(255,238,205,0)"),S.addColorStop(1,"rgba(255,241,212,0.9)"),g.fillStyle=S,g.fillRect(0,m*.58,v,m*.42),g.fillStyle="rgba(255,252,244,0.5)";for(let x=0;x<12;x++){const _=Math.random()*v,L=Math.random()*m*.55,T=26+Math.random()*48;for(let R=0;R<4;R++)g.beginPath(),g.ellipse(_+(Math.random()-.5)*T*.6,L+(Math.random()-.5)*10,T*(.3+Math.random()*.25),4+Math.random()*5,0,0,ts),g.fill()}},256,1024),i=new Ve({map:e,side:Oe,fog:!1,depthWrite:!1}),s=new U(new we(820,24,14),i);n.add(s);const r=new xi(new ei({map:Nn(0,"rgba(240,180,110,0.95)"),transparent:!0,blending:sn,depthWrite:!1,depthTest:!1}));r.position.set(t.sunX??-180,t.sunY??90,-520),r.scale.setScalar(t.sunS??130),n.add(r);const o=new xi(new ei({map:Nn(.25,"rgba(235,165,95,0.35)"),transparent:!0,blending:sn,depthWrite:!1,depthTest:!1}));o.position.set(t.sunX??-180,t.sunY??90,-520),o.scale.setScalar(460),n.add(o),n.userData.sun={sprite:r,halo:o};const a=new U(new wi(1400,40),new j({map:jc(),roughness:1,metalness:0}));a.rotation.x=-Math.PI/2,a.position.y=-.03,a.receiveShadow=!0,n.add(a),n.add(new Jc(11772544,t.ambient??.75)),n.add(new $c(15918796,12101246,t.hemi??.5));const l=new Kc(16772552,t.sunI??2.6);l.position.set(-120,140,-220),l.castShadow=!0,l.shadow.mapSize.set(1024,1024),l.shadow.camera.left=-60,l.shadow.camera.right=60,l.shadow.camera.top=60,l.shadow.camera.bottom=-60,l.shadow.camera.near=10,l.shadow.camera.far=600,n.add(l),n.add(l.target),n.fog=new Zn(t.fogColor??Xt.skyHorizon,t.fogNear??40,t.fogFar??480);const c=Ds()?70:140,d=new Float32Array(c*3);for(let g=0;g<c;g++)d[g*3]=(Math.random()-.5)*90,d[g*3+1]=.4+Math.random()*9,d[g*3+2]=-20+Math.random()*160;const u=new xe;u.setAttribute("position",new De(d,3));const h=new Br({color:16050896,transparent:!0,opacity:.3,blending:sn,depthWrite:!1,size:.09,sizeAttenuation:!0}),f=new ka(u,h);n.add(f),n.userData.dust=f}function di(n,t=12,e=30,i=170,s=70){for(let r=0;r<t;r++){const o=e+Math.random()*(i-e),a=9+Math.random()*22,l=5+Math.random()*4,c=5+Math.random()*4,d=Math.random()>.5?1:-1;n.add(Sa(l,a,c,o,d*(s*.55+Math.random()*s*.45)))}}function hi(n,t){n.userData.palms=n.userData.palms||[];for(const[e,i,s]of t){const r=tu(new b(e,0,i),s??1);n.userData.palms.push(r),n.add(r)}}const Dr={presentation(n,t,e){$e(n);const i=new Ze([new b(0,0,-30),new b(0,0,140)]),s=Tn(i,4.4,Xt.path,Zi(),400);s.position.y=.01,n.add(s);const r=Ro(t,e);r.position.set(-5.2,0,46),r.rotation.y=.42,n.add(r);const o=ui(mn(1));o.position.set(6.4,0,70),o.rotation.y=-.55,n.add(o),di(n,16),hi(n,[[-9,18,1.2],[9,22,1],[-10,62,1.3],[10,92,1.1],[-11,120,1.25]]);for(let l=0;l<=4;l++){const c=8+l*26,d=l%2===0?1:-1,u=Ts(new b(d*6,0,c),d);n.add(u);const h=As(new b(d*6,0,c),d);n.add(h.group)}for(const l of[30,78]){const c=xa();c.group.position.set(0,0,l),c.group.rotation.y=Math.PI,c.group.userData.x0=0,(n.userData.cars=n.userData.cars||[]).push(c.group),n.add(c.group)}const a=new he(46,1280/760,.1,2e3);return a.position.set(6.5,3.1,14),a.lookAt(-1.5,3.4,52),a},"lecon1-importance"(n,t,e){$e(n,{sunX:60,sunY:120,sunI:2.4});const i=new Ze([new b(0,0,-20),new b(0,0,150)]),s=Tn(i,4.4,Xt.path,Zi(),400);s.position.y=.01,n.add(s),[{x:-5.6,z:40,ry:.5},{x:5.8,z:62,ry:-.6},{x:-5.9,z:86,ry:.55},{x:5.9,z:108,ry:-.55},{x:-5.8,z:130,ry:.5}].forEach((a,l)=>{const c=l===0?Ro(t,e):ui(mn(l+2));c.position.set(a.x,0,a.z),c.rotation.y=a.ry,n.add(c)}),di(n,14,30,190,80),hi(n,[[-9,16,1],[9,50,1.1],[-10,96,1.05],[10,132,1.15]]);for(let a=0;a<=5;a++){const l=12+a*24,c=a%2===0?1:-1,d=Ts(new b(c*6,0,l),c);n.add(d);const u=As(new b(c*6,0,l),c);n.add(u.group)}for(const a of[28,74,118]){const l=xa();l.group.position.set(0,0,a),l.group.rotation.y=Math.PI,l.group.userData.x0=0,(n.userData.cars=n.userData.cars||[]).push(l.group),n.add(l.group)}const o=new he(48,1280/760,.1,2e3);return o.position.set(8,5.4,6),o.lookAt(0,3.2,80),o},"lecon2-constat"(n,t,e){$e(n,{sunI:1.3,ambient:.5,fogColor:15524036,fogNear:24,fogFar:220}),[[0,20,.1,1.15],[-7,34,-.35,1],[6,42,.55,.9],[-3,52,-.2,1.25],[8,60,-.7,.85],[-8,66,.3,1.1],[3,74,.65,.95],[-5,84,-.5,1.05],[7,90,.15,.8],[-9,96,-.8,1.2]].forEach(([o,a,l,c],d)=>{const u=d===0?Ro(t,e):ui(mn(d+1));u.position.set(o,0,a),u.scale.setScalar(c),u.rotation.y=l,u.rotation.z=d%3*.06-.06,d%4===3&&(u.rotation.x=-.08),n.add(u)});const s=ui(mn(5));s.position.set(2,0,102),s.rotation.set(1.35,.4,.3),n.add(s),di(n,10,20,150,60),hi(n,[[-9,30,.9],[9,55,.85],[-10,88,.95]]);const r=new he(52,1280/760,.1,2e3);return r.position.set(11,5.2,-8),r.lookAt(-1,2.6,55),r},audit(n){$e(n,{sunI:1.1,ambient:.65,fogNear:30,fogFar:200}),n.fog=new Zn(15524036,30,200);const t=new U(new Zt(90,40),new j({color:15985364}));t.position.set(0,14,-16),t.rotation.y=Math.PI,n.add(t);const e=An((h,f,g)=>{const v=h.createLinearGradient(0,0,0,g);v.addColorStop(0,"#d9e4e6"),v.addColorStop(1,"#f2e4c6"),h.fillStyle=v,h.fillRect(0,0,f,g),h.fillStyle="#c3ab7c",h.fillRect(0,g*.72,f,g*.28),h.fillStyle="rgba(180,140,90,0.6)";for(let m=0;m<14;m++){const p=16+Math.random()*40,S=20+Math.random()*60;h.fillRect(10+Math.random()*(f-50),g*.76,p,S)}},512,320),i=new U(new Zt(13,7),new j({map:e,emissiveMap:e,emissive:new Nt(16773336),emissiveIntensity:.12}));i.position.set(0,7.5,-15.6),n.add(i);const s=new j({color:8019768}),r=new U(new St(.4,7,.3),s);r.position.set(0,7.5,-15.2),n.add(r);const o=new U(new St(13,.4,.3),s);o.position.set(0,7.5,-15.2),n.add(o);const a=Po();n.add(a);for(const[h,f,g]of[[.7,.3,.35],[-.6,.4,-.4],[.2,-.5,.1]]){const v=Wg(.9,1.2,g);v.position.set(h,1.1,f),n.add(v)}const l=Xg();l.position.set(-.9,1.09,.25),l.rotation.y=.3,n.add(l);const c=qg(.25);c.position.set(.55,1.12,.5),c.rotation.y=.4,c.userData.y0=1.12,c.userData.rz0=0,(n.userData.floaters=n.userData.floaters||[]).push(c),n.add(c);const d=Lo();d.g.position.set(-1.6,0,-.5),n.add(d.g),n.add(d.light);const u=new he(44,1280/760,.1,2e3);return u.position.set(4.2,3.4,7.5),u.lookAt(0,1.6,-1),u},"etat-lieux"(n){$e(n,{sunI:2.2,fogNear:60,fogFar:700});const t=new U(new Zt(24,24),new j({map:cc(),roughness:.9}));t.rotation.x=-Math.PI/2,t.position.y=.01,n.add(t);const e=[new b(-7,.5,6),new b(-3.5,.6,1),new b(1,.7,-4),new b(5.5,.8,-7),new b(9,.9,-10)],i=new U(new Fs(new Ze(e),64,.12,8,!1),new Ve({color:12618344,transparent:!0,opacity:.8}));i.position.y=-.01,n.add(i),[[-7,6,13204066],[-3.5,1,8232642],[1,-4,13805688],[5.5,-7,9416330],[9,-10,13204066]].forEach(([l,c,d])=>{const u=uc(d);u.position.set(l,0,c),n.add(u)});const r=An((l,c,d)=>{l.fillStyle="rgba(255,255,255,0.75)",l.beginPath(),l.arc(c/2,d/2,c/2-8,0,ts),l.fill(),l.strokeStyle="rgba(90,74,52,0.8)",l.lineWidth=5,l.stroke(),l.fillStyle="#c08a68",l.beginPath(),l.moveTo(c/2,d*.16),l.lineTo(c*.58,d*.6),l.lineTo(c*.42,d*.6),l.closePath(),l.fill(),l.fillStyle="#5a4a34",l.font="800 34px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",l.textAlign="center",l.fillText("N",c/2,d*.2)},160,160),o=new U(new Zt(2.2,2.2),new Ve({map:r,transparent:!0}));o.position.set(-9.5,.05,9.5),o.rotation.x=-Math.PI/2,n.userData.compass=o,n.add(o);const a=new he(40,1280/760,.1,2e3);return a.position.set(13,20,11),a.lookAt(0,0,0),a},zonage(n){$e(n,{sunI:2,fogNear:60,fogFar:700});const t=new U(new Zt(24,24),new j({map:cc(!0),roughness:.9}));t.rotation.x=-Math.PI/2,t.position.y=.01,n.add(t),[[0,0,8232642],[6,0,12618344],[0,-6,9416330],[6,-6,13805688]].forEach(([o,a,l])=>{const c=uc(l);c.position.set(o,0,a),n.add(c)});const i=An((o,a,l)=>{o.fillStyle="rgba(240,236,220,0.95)",Is(o,0,0,a,l,16),o.fill();const c=[["#7d9ec2","Zone A"],["#c08a68","Zone B"],["#8fae8a","Zone C"],["#d2a878","Zone D"]];o.font="700 30px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",o.textAlign="left",c.forEach(([d,u],h)=>{o.fillStyle=d,o.beginPath(),o.arc(46,60+h*70,16,0,ts),o.fill(),o.fillStyle="#3a2a18",o.fillText(u,78,72+h*70)})},360,320),s=new U(new Zt(3.4,3),new Ve({map:i,transparent:!0}));s.position.set(-8.8,.05,-8),s.rotation.x=-Math.PI/2,n.add(s);const r=new he(40,1280/760,.1,2e3);return r.position.set(-10,21,14),r.lookAt(0,0,-1),r},"constitution-lots"(n,t,e){$e(n,{sunX:40,sunY:130,sunI:2.4});const i=new Ze([new b(0,0,-20),new b(0,0,150)]),s=Tn(i,4.4,Xt.path,Zi(),400);s.position.y=.01,n.add(s);const r=Hg(mn(0));r.position.set(-6.4,0,42),r.rotation.y=.35,n.add(r);const o=ui(mn(3));o.position.set(6.6,0,64),o.rotation.y=-.5,n.add(o);const a=Vg(mn(2));a.position.set(-6.2,0,88),a.rotation.y=.4,n.add(a);const l=Gg(mn(1));l.position.set(6.4,0,108),l.rotation.y=-.45,n.add(l),di(n,12,30,180,80),hi(n,[[-9,22,1.1],[9,34,1],[-10,78,1.15],[10,122,1.05]]);for(let d=0;d<=4;d++){const u=20+d*24,h=d%2===0?1:-1,f=Ts(new b(h*6,0,u),h);n.add(f);const g=As(new b(h*6,0,u),h);n.add(g.group)}for(const d of[58,100]){const u=wa(new b(4.6,0,d),1);n.add(u)}const c=new he(46,1280/760,.1,2e3);return c.position.set(8.5,4.6,4),c.lookAt(-1,3,62),c},"mise-concession"(n){$e(n,{sunI:1.2,ambient:.7,fogNear:30,fogFar:200}),n.fog=new Zn(15524036,30,200);const t=new U(new Zt(90,40),new j({color:15985364}));t.position.set(0,14,-16),t.rotation.y=Math.PI,n.add(t);const e=Po();n.add(e);const i=new U(new Zt(2.3,1.6),new j({color:16050896,roughness:.85}));i.position.set(.1,1.08,.15),i.rotation.x=-.18,n.add(i);const s=Yg();s.position.set(1.05,1.1,.5),s.rotation.y=-.5,s.rotation.z=-.12,s.userData.y0=1.1,s.userData.rz0=-.12,(n.userData.floaters=n.userData.floaters||[]).push(s),n.add(s);const r=dc();r.position.set(-1.15,1.05,-.1),r.rotation.y=.3,r.userData.y0=1.05,r.userData.rz0=0,(n.userData.floaters=n.userData.floaters||[]).push(r),n.add(r);const o=new U(new Dn(.22,.04,10,24),new j({color:Xt.bronze,metalness:.8,roughness:.3}));o.position.set(-.7,1.12,.6),o.rotation.x=Math.PI/2.2,o.rotation.z=.3,n.add(o);const a=Lo();a.g.position.set(-1.7,0,-.6),n.add(a.g),n.add(a.light);const l=new he(42,1280/760,.1,2e3);return l.position.set(3.9,3.6,6.8),l.lookAt(-.1,1.7,-.4),l},attribution(n){$e(n,{sunI:1.2,ambient:.7,fogNear:30,fogFar:200}),n.fog=new Zn(15524036,30,200);const t=new U(new Zt(90,40),new j({color:15985364}));t.position.set(0,14,-16),t.rotation.y=Math.PI,n.add(t);const e=Po();n.add(e);const i=$g();i.position.set(.9,1.12,.2),i.rotation.y=.7,i.userData.y0=1.12,i.userData.rz0=0,(n.userData.floaters=n.userData.floaters||[]).push(i),n.add(i);for(const[l,c,d]of[[-1.2,.4,.5],[-.5,-.4,-.6],[.4,.6,.1]]){const u=Zg(d);u.position.set(l,1.06,c),n.add(u)}const s=dc(3829823,"ADMIS");s.position.set(-1.4,1.05,-.5),s.rotation.y=-.4,n.add(s);const r=new U(new Dn(.24,.06,12,28),new j({color:13805688,metalness:.9,roughness:.25}));r.position.set(.1,1.15,-.6),r.rotation.x=Math.PI/2.4,r.userData.y0=1.15,r.userData.rz0=0,(n.userData.floaters=n.userData.floaters||[]).push(r),n.add(r);const o=Lo();o.g.position.set(-1.7,0,-.6),n.add(o.g),n.add(o.light);const a=new he(42,1280/760,.1,2e3);return a.position.set(4.1,3.5,7.2),a.lookAt(0,1.6,-.2),a},gestion(n){$e(n,{sunX:20,sunY:150,sunI:2.5});const t=new Ze([new b(0,0,-20),new b(0,0,150)]),e=Tn(t,4.4,Xt.path,Zi(),400);e.position.y=.01,n.add(e);const i=new Ft,s=new j({color:15195071,roughness:.85}),r=new U(new St(14,10,8),s);r.position.y=5,r.castShadow=!0,i.add(r);const o=new U(new Ot(8,8.6,1.6,4),s);o.position.y=11,o.rotation.y=Math.PI/4,i.add(o);const a=new j({color:13614751,roughness:.6});for(const f of[-5,-3.3,-1.6,0,1.6,3.3,5]){const g=new U(new Ot(.28,.34,4.6,10),a);g.position.set(f,2.3,4.05),i.add(g)}const l=An((f,g,v)=>{f.fillStyle="#d8c9a6",f.fillRect(0,0,g,v);for(let m=0;m<3;m++)for(let p=0;p<6;p++)Math.random()<.75&&(f.fillStyle=Math.random()<.4?"#b98a5a":"#c9a25f",f.globalAlpha=.6,f.fillRect(10+p*(g/6),10+m*(v/3.4),g/8,v/4.4),f.globalAlpha=1)},512,256),c=new U(new Zt(10,4.4),new j({map:l,emissiveMap:l,emissive:new Nt(16114365),emissiveIntensity:.15}));c.position.set(0,6.2,4.06),i.add(c),i.position.set(0,0,58),i.rotation.y=Math.PI,n.add(i);const d=new U(new Ot(.08,.12,8,8),new j({color:6048304}));d.position.set(-8,4,56),n.add(d);const u=new U(new Zt(2.6,1.5),new j({color:Xt.terracotta,side:Ke,roughness:.8}));u.position.set(-6.6,7.4,56),u.rotation.y=.2,n.userData.flag=u,n.add(u);for(let f=0;f<3;f++){const g=ui(mn(f+1));g.position.set(-6.4,0,30+f*22),g.rotation.y=.45,n.add(g)}di(n,10,80,200,90),hi(n,[[-9,20,1],[9,44,1.1],[9.5,92,1]]);for(let f=0;f<=4;f++){const g=14+f*26,v=f%2===0?1:-1,m=Ts(new b(v*6,0,g),v);n.add(m);const p=As(new b(v*6,0,g),v);n.add(p.group)}const h=new he(44,1280/760,.1,2e3);return h.position.set(10,3.6,18),h.lookAt(0,4.5,58),h},evaluation(n){$e(n,{sunI:1,ambient:.55,fogNear:30,fogFar:300}),n.fog=new Zn(15524036,30,300),[{pct:.9,color:"#d2a878",label:"AUDIT",x:-4},{pct:.78,color:"#c08a68",label:"CONCESSION",x:0},{pct:.86,color:"#7da878",label:"GESTION",x:4}].forEach(({pct:o,color:a,label:l,x:c})=>{const d=new U(new Ot(1.5,1.8,.3,20),new j({color:6048304,roughness:.7}));d.position.set(c,.15,0),n.add(d);const u=new U(new Ot(.14,.16,3.4,10),new j({color:Xt.walnut,roughness:.6}));u.position.set(c,1.85,0),n.add(u);const h=Kg(o,a,l),f=new U(new Zt(3.6,3.6),new j({map:h,emissiveMap:h,emissive:new Nt(16777215),emissiveIntensity:.08}));f.position.set(c,3.9,0),f.rotation.x=.25,n.add(f);const g=new Va(15246172,.2,8,2);g.position.set(c,3.2,2),n.add(g)});const e=[new b(-6,.8,2.5),new b(-3,1.6,1.4),new b(0,2.6,0),new b(3,3.8,-1.2),new b(6,5.2,-2.4)],i=new U(new Fs(new Ze(e),64,.1,8,!1),new Ve({color:5742687,transparent:!0,opacity:.9}));n.add(i);const s=new U(new ni(.3,.8,12),new j({color:5742687,emissive:5742687,emissiveIntensity:.6}));s.position.set(6.4,5.6,-2.7),s.rotation.z=-.6,n.add(s);const r=new he(46,1280/760,.1,2e3);return r.position.set(7,3.4,11),r.lookAt(0,3.2,-1),r},"mise-a-jour"(n){$e(n,{sunX:-80,sunY:110,sunI:2.2});const t=new Ze([new b(0,0,-20),new b(0,0,150)]),e=Tn(t,4.4,Xt.path,Zi(),400);e.position.y=.01,n.add(e);const i=hc(1);i.position.set(-8,0,52),n.userData.cranes=[i],n.add(i);const s=hc(.7);s.position.set(8,0,84),n.userData.cranes.push(s),n.add(s);const r=new U(new St(7,9,7),new j({color:2760726,roughness:.9}));r.position.set(0,4.5,62),r.castShadow=!0,n.add(r);const o=new j({color:7034424,roughness:.8});for(let h=0;h<4;h++){const f=new U(new St(8,.14,.14),o);f.position.set(0,1.5+h*2.3,3.6),n.add(f)}const a=ui(mn(4));a.position.set(0,14,66),a.rotation.x=.15,a.userData.y0=14,n.userData.hoisted=a,n.add(a);const l=new Ba({color:6048304}),c=[new b(-8,18,52),new b(0,15,65)],d=new xe().setFromPoints(c);n.add(new Xc(d,l)),di(n,10,90,220,85),hi(n,[[-9,30,.9],[9,110,1]]);const u=new he(48,1280/760,.1,2e3);return u.position.set(11,5.5,6),u.lookAt(0,8,62),u},quiz(n){$e(n,{sunX:0,sunY:130,sunI:2});const t=An((d,u,h)=>{d.clearRect(0,0,u,h),d.fillStyle="rgba(253,250,242,0.92)",Is(d,0,0,u,h,40),d.fill(),d.strokeStyle="rgba(138,111,69,0.5)",d.lineWidth=8,Is(d,8,8,u-16,h-16,36),d.stroke(),d.shadowColor="rgba(122,95,56,0.55)",d.shadowBlur=40,d.fillStyle="#7a5f38",d.font="800 620px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif",d.textAlign="center",d.textBaseline="middle",d.fillText("?",u/2,h*.52),d.shadowBlur=0},640,640),e=new U(new Zt(7,7),new Ve({map:t,transparent:!0}));e.position.set(0,8.5,30),n.add(e);const i=new xi(new ei({map:Nn(.3,"rgba(232,163,92,0.28)"),transparent:!0,blending:sn,depthWrite:!1}));i.position.set(0,8.5,28.5),i.scale.setScalar(18),n.add(i);const s=new Ft,r=new j({color:13805688,metalness:.85,roughness:.28}),o=new U(new Ot(.9,1,.3,16),r);s.add(o);const a=new U(new Ot(.28,.3,1.2,12),r);a.position.y=.75,s.add(a);const l=new U(new Ot(.9,.45,1.1,18),r);l.position.y=1.7,s.add(l);for(const d of[-1,1]){const u=new U(new Dn(.4,.07,10,20,Math.PI),r);u.position.set(d*.78,1.5,0),u.rotation.z=d*Math.PI/2,s.add(u)}s.position.set(-3.6,0,40),n.userData.trophy=s,n.add(s),di(n,12,60,200,90),hi(n,[[-9,60,1],[9,90,1.1]]),n.userData.confetti=Jg(n,70);const c=new he(46,1280/760,.1,2e3);return c.position.set(6,3.6,8),c.lookAt(0,6.5,34),c}};function jg(n,t,e,i=1280,s=760){if(Lr)return null;let r;try{r=new Oa({canvas:e,antialias:!Ds(),alpha:!1}),r.toneMapping=Ur,r.toneMappingExposure=1.2,r.shadowMap.enabled=!Ds(),r.shadowMap.enabled&&(r.shadowMap.type=Ir),r.setPixelRatio(Math.min(window.devicePixelRatio||1,Ds()?1:1.25)),r.setSize(i,s,!1)}catch{return Lr=!0,null}let o=null,a=null;try{o=new za,a=(Dr[n.id]||Dr.presentation)(o,n,t),a.aspect=i/s,a.updateProjectionMatrix()}catch(P){return console.warn("Illustration 3D en direct indisponible pour",n.id,P),r.dispose(),null}const l=a.position.clone(),c=new b;a.getWorldDirection(c);const d=l.clone().addScaledVector(c,40),u=Math.min(3,Math.max(.6,l.length()/14)),h=o.userData.dust||null,f=o.userData.sun||null,g=o.userData.palms||[],v=o.userData.cars||[],m=o.userData.cranes||[],p=o.userData.hoisted||null,S=o.userData.trophy||null,x=o.userData.flag||null,_=o.userData.compass||null,L=o.userData.confetti||null,T=o.userData.floaters||[];function R(P,M,y){h&&(h.rotation.y+=M*.02,h.position.y=Math.sin(P*.4)*.3,h.material.opacity=.26+Math.sin(P*.8)*.08),f&&(f.sprite.material.opacity=.82+Math.sin(P*.5)*.1,f.halo.material.opacity=.28+Math.sin(P*.4+1)*.06);for(let C=0;C<g.length;C++)g[C].rotation.z=Math.sin(P*.8+C*1.7)*.05;for(let C=0;C<v.length;C++){const I=v[C];I.position.z-=M*.9,I.position.x=(I.userData.x0||0)+Math.sin(P*.5+C*2.1)*.4,I.position.z<-14&&(I.position.z=132,I.position.x=(Math.random()-.5)*6,I.userData.x0=I.position.x)}if(L){const C=L.geometry.attributes.position,I=C.array;for(let G=0;G<C.count;G++)I[G*3+1]-=M*.7,I[G*3+1]<.2&&(I[G*3+1]=6+Math.random()*3,I[G*3]=(Math.random()-.5)*14,I[G*3+2]=(Math.random()-.5)*14);C.needsUpdate=!0}S&&(S.rotation.y=Math.sin(P*.6)*.12);for(let C=0;C<m.length;C++){const I=m[C];I.rotation.y=(I.userData.baseY||0)+Math.sin(P*.15+C*2.4)*.12}p&&(p.rotation.z=Math.sin(P*1.1)*.03,p.position.y=(p.userData.y0||14)+Math.sin(P*.7)*.25),x&&(x.rotation.z=Math.sin(P*1.8)*.16+Math.sin(P*3.1)*.05),_&&(_.rotation.z=P*.15);for(let C=0;C<T.length;C++){const I=T[C];I.position.y=(I.userData.y0||I.position.y)+Math.sin(P*1.2+C*1.3)*.03,I.rotation.z=(I.userData.rz0||0)+Math.sin(P*.9+C)*.02}a.position.set(l.x+Math.sin(y*Math.PI)*.5*u+Math.sin(P*.3)*.06*u,l.y+Math.cos(y*Math.PI)*.25*u+Math.sin(P*.24)*.05*u,l.z+(y-.5)*1.2*u+Math.cos(P*.21)*.07*u),a.lookAt(d),r.render(o,a)}return{canvas:r.domElement,render:R,dispose(){r.dispose(),o.traverse(P=>{if(P.geometry&&P.geometry.dispose(),P.material){const M=Array.isArray(P.material)?P.material:[P.material];for(const y of M)y.map&&y.map.dispose(),y.dispose()}})}}}const Do=new Map;function Qg(n,t,e=1280,i=760){if(Do.has(n.id))return Do.get(n.id);const s=kg();if(!s)return null;try{s.setPixelRatio(Ds()?1:1.5),s.setSize(e,i);const r=new za,a=(Dr[n.id]||Dr.presentation)(r,n,t);a.aspect=e/i,a.updateProjectionMatrix(),s.render(r,a);const l=s.domElement.toDataURL("image/jpeg",.85);return t_(r),Do.set(n.id,l),l}catch(r){return console.warn("Illustration 3D indisponible pour",n.id,r),null}}function t_(n){const t=new Set,e=new Set;n.traverse(i=>{i.geometry&&i.geometry.dispose();const s=Array.isArray(i.material)?i.material:i.material?[i.material]:[];for(const r of s)if(!e.has(r)){e.add(r);for(const o of[r.map,r.emissiveMap])o&&!t.has(o)&&(t.add(o),o.dispose());r.dispose()}})}function e_({onExit:n,onScrollTo:t,onQuiz:e}){const i=document.getElementById("ui-course"),s=i.querySelector("#course-toc"),r=i.querySelector("#course-toc-select"),o=i.querySelector("#course-sections"),a=i.querySelector("#course-cover"),l=i.querySelector("#course-close"),c=i.querySelector("#course-quiz-btn"),d=i.querySelector(".course-main"),u=t||(M=>d.scrollTo({top:M,behavior:"smooth"}));let h=!1;a.innerHTML=`
    <div class="course-cover-kicker">${To.module} — Formation</div>
    <h1 class="course-cover-title">${To.title}</h1>
    <div class="course-cover-sub">${To.subtitle}</div>
    <div class="course-cover-rule"></div>
    <p class="course-cover-desc">Lecture complète et illustrée du cours. Avancez section par section, chaque étape est accompagnée d'une illustration de son contexte.</p>
    <div class="course-cover-meta"><span>${Ie.length} étapes</span><span>12 questions finales</span></div>
  `;const f=[],g=[];Er.forEach((M,y)=>{const C=Ie.filter(I=>I.chapter===y);C.length&&(f.push(`<div class="toc-chapter"><div class="toc-chapter-name">${M.name}</div><div class="toc-chapter-label">${M.label}</div></div>`),C.forEach(I=>{f.push(`<a href="#course-sec-${I.id}" class="toc-item" data-id="${I.id}"><span class="toc-num">${I.num}</span><span>${I.title}</span></a>`)}))}),Ie.forEach(M=>{const y=Er[M.chapter],C=M.id==="quiz";let I="";C?I=`<ul class="course-bullets">${M.bullets.map(G=>`<li>${G}</li>`).join("")}</ul>`:I=M.content.map(G=>`<p><span class="course-body-t">${G.t}</span>${G.b}</p>`).join(""),g.push(`
      <section class="course-section" id="course-sec-${M.id}">
        <canvas class="course-illus" role="img" aria-label="Illustration — ${M.title}"></canvas>
        <div class="course-sec-meta">
          <span class="course-sec-chapter">${y?`${y.name} · ${y.label}`:""}</span>
          <span class="course-sec-num">${M.num} / ${String(Ie.length).padStart(2,"0")}</span>
        </div>
        <h2 class="course-sec-title">${M.title}</h2>
        <div class="course-sec-rule"></div>
        <div class="course-sec-content">${I}</div>
      </section>
    `)}),s.innerHTML=f.join(""),o.innerHTML=g.join("");const v=[];Er.forEach((M,y)=>{const C=Ie.filter(I=>I.chapter===y);C.length&&(v.push(`<optgroup label="${M.name}">`),C.forEach(I=>v.push(`<option value="${I.id}">${I.num} · ${I.title}</option>`)),v.push("</optgroup>"))}),r.innerHTML=v.join("");const m=[];o.querySelectorAll(".course-illus").forEach(M=>{const y=M.closest(".course-section").id.replace("course-sec-",""),C=document.createElement("canvas");Bg(C,y,1280,760),M.style.backgroundImage=`url(${C.toDataURL("image/jpeg",.86)})`,M.style.backgroundSize="cover",M.style.backgroundPosition="center",m.push({canvas:M,id:y,live:null,raf:0,p:0,running:!1})});const p=window.matchMedia("(prefers-reduced-motion: reduce)").matches;function S(M){const y=M.getBoundingClientRect(),C=d.getBoundingClientRect(),I=y.height+C.height||1;return Math.min(1,Math.max(0,(C.bottom-y.top)/I))}function x(M){if(!M.live||M.running)return;M.running=!0,M.p=S(M.canvas);let y=performance.now();const C=I=>{if(!M.running)return;const G=Math.min(.05,Math.max(.001,(I-y)/1e3));y=I,M.p=S(M.canvas),M.live.render(I*.001,G,M.p),M.raf=requestAnimationFrame(C)};M.raf=requestAnimationFrame(C)}function _(M){M.running&&(M.running=!1,cancelAnimationFrame(M.raf))}const L=new IntersectionObserver(M=>{for(const y of M){const C=m.find(I=>I.canvas===y.target);if(C)if(y.isIntersecting){if(!C.live){const I=Ie.find(G=>G.id===C.id);if(I&&(p||(C.live=jg(I,Ie.indexOf(I),C.canvas,1280,760)),!C.live)){const G=Qg(I,Ie.indexOf(I));G&&(C.canvas.style.backgroundImage=`url(${G})`)}}x(C)}else _(C)}},{root:d,rootMargin:"420px 0px 420px 0px",threshold:0});m.forEach(M=>L.observe(M.canvas)),s.addEventListener("click",M=>{const y=M.target.closest(".toc-item");if(!y)return;const C=document.getElementById("course-sec-"+y.dataset.id);C&&(u(C.offsetTop-90),s.querySelectorAll(".toc-item").forEach(I=>I.classList.toggle("active",I===y)))});function T(){let M=Ie[0].id;for(const y of Ie){const C=document.getElementById("course-sec-"+y.id);C&&C.offsetTop-120<=d.scrollTop&&(M=y.id)}s.querySelectorAll(".toc-item").forEach(y=>y.classList.toggle("active",y.dataset.id===M)),r.value!==M&&(r.value=M)}d.addEventListener("scroll",T,{passive:!0}),r.addEventListener("change",()=>{const M=document.getElementById("course-sec-"+r.value);M&&u(M.offsetTop-90)}),l.addEventListener("click",n),c.addEventListener("click",e);function R(){h=!0,document.body.classList.add("mode-course"),setTimeout(()=>T(),80)}function P(){h=!1,document.body.classList.remove("mode-course"),m.forEach(M=>_(M))}return{open:R,close:P,isOpen:()=>h}}async function n_(){await Promise.allSettled([document.fonts.load("400 26px 'Century Gothic'"),document.fonts.load("700 26px 'Century Gothic'"),document.fonts.load("italic 400 26px 'Century Gothic'"),document.fonts.load("italic 700 26px 'Century Gothic'")]);const n=document.getElementById("scene"),t=Ie.length,e=yg(n,Ie),i=Sg();let s=null;function r(_,L="smooth"){s?s.scrollTo(_,{duration:L==="smooth"?1.2:0,easing:T=>1-Math.pow(1-T,3)}):document.querySelector("#ui-course .course-main").scrollTo({top:_,behavior:L})}function o(_){const L=_==="course";a.isOpen()&&a.close(),L&&a.open(),document.getElementById("mode-journey").classList.toggle("active",!L),document.getElementById("mode-course-btn").classList.toggle("active",L),L?(u.stop(),s==null||s.start()):(s==null||s.stop(),u.start())}const a=e_({onExit:()=>o("journey"),onScrollTo:r,onQuiz:()=>{o("journey"),setTimeout(()=>{const _=Math.max(1,c.offsetHeight-window.innerHeight);u.scrollTo(_,{duration:1.6})},120)}});document.getElementById("mode-journey").addEventListener("click",()=>o("journey")),document.getElementById("mode-course-btn").addEventListener("click",()=>o("course"));const l=t+2,c=document.getElementById("scroll");function d(){const _=l*window.innerHeight;c.style.height=_+"px"}d();const u=new ja({duration:1.12,smoothWheel:!0,touchMultiplier:1.5,wheelMultiplier:1}),h=document.querySelector("#ui-course .course-main");s=new ja({wrapper:h,content:h,duration:1.15,smoothWheel:!0,touchMultiplier:1.6,wheelMultiplier:1});function f(_){u.raf(_),s&&s.raf(_),requestAnimationFrame(f)}requestAnimationFrame(f);let g=0,v=0;function m(_){const L=Math.max(1,c.offsetHeight-window.innerHeight),T=Math.min(1,Math.max(0,_/L));g=T;const R=Math.floor(T*l)-1;v=Math.max(0,Math.min(t-1,R))}u.on("scroll",({scroll:_})=>{m(_)}),m(window.scrollY||0),e.update(g,v);function p(){e.update(g,v),i.updateGlobal(g,v),e.render(),requestAnimationFrame(p)}requestAnimationFrame(p),window.addEventListener("resize",()=>{d(),e.resize(),m(window.scrollY||0)}),window.addEventListener("keydown",_=>{if(a.isOpen()){_.key==="Escape"?o("journey"):_.key==="ArrowDown"||_.key==="PageDown"?(_.preventDefault(),r(h.scrollTop+window.innerHeight*.8)):(_.key==="ArrowUp"||_.key==="PageUp")&&(_.preventDefault(),r(h.scrollTop-window.innerHeight*.8));return}if(i.isReaderOpen()){_.key==="Escape"?i.closeReader():_.key==="ArrowLeft"?i.readerNav(-1):_.key==="ArrowRight"&&i.readerNav(1);return}if(_.key==="Enter"&&v>=0&&!i.quizOpen()){i.openReader(v);return}if(["1","2","3","4"].includes(_.key)&&i.quizOpen()){_.preventDefault(),i.answerQuiz(Number(_.key)-1);return}const T=window.innerHeight;_.key==="ArrowDown"||_.key==="PageDown"?(_.preventDefault(),u.scrollTo(window.scrollY+T,{duration:1.1})):(_.key==="ArrowUp"||_.key==="PageUp")&&(_.preventDefault(),u.scrollTo(Math.max(0,window.scrollY-T),{duration:1.1}))}),i.setReaderListener(_=>{_?u.stop():u.start()});function S(_){return{nx:_.clientX/window.innerWidth*2-1,ny:-(_.clientY/window.innerHeight)*2+1}}window.addEventListener("click",_=>{if(a.isOpen()||i.isReaderOpen()||_.target.closest&&_.target.closest("#ui"))return;const{nx:L,ny:T}=S(_),R=e.pick(L,T);R&&(R.kind==="panel"?i.openReader(R.index):R.kind==="sign"&&i.showToast(R.tip))});let x=!1;window.addEventListener("mousemove",_=>{x||(x=!0,requestAnimationFrame(()=>{if(x=!1,a.isOpen()||i.isReaderOpen())return;const{nx:L,ny:T}=S(_),R=e.pick(L,T);document.body.classList.toggle("hover-pick",!!R),e.setHover(R&&R.kind==="panel"?R.index:-1)}))}),window.__panneautique={openReader:i.openReader,closeReader:i.closeReader,openCourse:()=>o("course"),closeCourse:()=>o("journey"),pickAt:(_,L)=>{const T=e.pick(_/window.innerWidth*2-1,-(L/window.innerHeight)*2+1);return T?{kind:T.kind,index:T.index,tip:T.tip}:null},getState:()=>{const _=e.getCameraPos();return{progress:g,activeIndex:v,cam:{x:_.x,y:_.y,z:_.z}}},settle:(_,L)=>{for(let R=0;R<2400;R++)e.update(_,L);const T=e.getCameraPos();return{cam:{x:T.x,y:T.y,z:T.z},progress:_,activeIndex:L}}},setTimeout(()=>{document.getElementById("ui-topbar").classList.add("visible"),document.getElementById("ui-dots").classList.add("visible"),document.getElementById("ui-hint").classList.add("visible")},1200),document.querySelectorAll(".dot").forEach((_,L)=>{_.addEventListener("click",()=>{const T=(L+1.5)/l,R=Math.max(1,c.offsetHeight-window.innerHeight);u.scrollTo(Math.round(T*R),{duration:1.4})})})}n_();
