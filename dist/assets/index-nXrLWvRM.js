var yu=Object.defineProperty;var xu=(n,e,t)=>e in n?yu(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var be=(n,e,t)=>xu(n,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();var Ja="1.3.26";function gc(n,e,t){return Math.max(n,Math.min(e,t))}function Eu(n,e,t){return(1-t)*n+t*e}function bu(n,e,t,i){return Eu(n,e,1-Math.exp(-t*i))}function wu(n,e){return(n%e+e)%e}var Tu=class{constructor(){be(this,"isRunning",!1);be(this,"value",0);be(this,"from",0);be(this,"to",0);be(this,"currentTime",0);be(this,"lerp");be(this,"duration");be(this,"easing");be(this,"onUpdate")}advance(n){var t;if(!this.isRunning)return;let e=!1;if(this.duration&&this.easing){this.currentTime+=n;const i=gc(0,this.currentTime/this.duration,1);e=i>=1;const s=e?1:this.easing(i);this.value=this.from+(this.to-this.from)*s}else this.lerp?(this.value=bu(this.value,this.to,this.lerp*60,n),Math.round(this.value)===Math.round(this.to)&&(this.value=this.to,e=!0)):(this.value=this.to,e=!0);e&&this.stop(),(t=this.onUpdate)==null||t.call(this,this.value,e)}stop(){this.isRunning=!1}fromTo(n,e,{lerp:t,duration:i,easing:s,onStart:r,onUpdate:o}){this.from=this.value=n,this.to=e,this.lerp=t,this.duration=i,this.easing=s,this.currentTime=0,this.isRunning=!0,r==null||r(),this.onUpdate=o}};function Au(n,e){let t;return function(...i){clearTimeout(t),t=setTimeout(()=>{t=void 0,n.apply(this,i)},e)}}var Ru=class{constructor(n,e,{autoResize:t=!0,debounce:i=250}={}){be(this,"width",0);be(this,"height",0);be(this,"scrollHeight",0);be(this,"scrollWidth",0);be(this,"debouncedResize");be(this,"wrapperResizeObserver");be(this,"contentResizeObserver");be(this,"resize",()=>{this.onWrapperResize(),this.onContentResize()});be(this,"onWrapperResize",()=>{this.wrapper instanceof Window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)});be(this,"onContentResize",()=>{this.wrapper instanceof Window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)});this.wrapper=n,this.content=e,t&&(this.debouncedResize=Au(this.resize,i),this.wrapper instanceof Window?window.addEventListener("resize",this.debouncedResize):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){var n,e;(n=this.wrapperResizeObserver)==null||n.disconnect(),(e=this.contentResizeObserver)==null||e.disconnect(),this.wrapper===window&&this.debouncedResize&&window.removeEventListener("resize",this.debouncedResize)}get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},_c=class{constructor(){be(this,"events",{})}emit(n,...e){var i;const t=this.events[n]||[];for(let s=0,r=t.length;s<r;s++)(i=t[s])==null||i.call(t,...e)}on(n,e){return this.events[n]?this.events[n].push(e):this.events[n]=[e],()=>{var t;this.events[n]=(t=this.events[n])==null?void 0:t.filter(i=>e!==i)}}off(n,e){var t;this.events[n]=(t=this.events[n])==null?void 0:t.filter(i=>e!==i)}destroy(){this.events={}}};const Cu=100/6,Bn={passive:!1};function ja(n,e){return n===1?Cu:n===2?e:1}var Pu=class{constructor(n,e={wheelMultiplier:1,touchMultiplier:1}){be(this,"touchStart",{x:0,y:0});be(this,"lastDelta",{x:0,y:0});be(this,"window",{width:0,height:0});be(this,"emitter",new _c);be(this,"onTouchStart",n=>{const{clientX:e,clientY:t}=n.targetTouches?n.targetTouches[0]:n;this.touchStart.x=e,this.touchStart.y=t,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:n})});be(this,"onTouchMove",n=>{const{clientX:e,clientY:t}=n.targetTouches?n.targetTouches[0]:n,i=-(e-this.touchStart.x)*this.options.touchMultiplier,s=-(t-this.touchStart.y)*this.options.touchMultiplier;this.touchStart.x=e,this.touchStart.y=t,this.lastDelta={x:i,y:s},this.emitter.emit("scroll",{deltaX:i,deltaY:s,event:n})});be(this,"onTouchEnd",n=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:n})});be(this,"onWheel",n=>{let{deltaX:e,deltaY:t,deltaMode:i}=n;const s=ja(i,this.window.width),r=ja(i,this.window.height);e*=s,t*=r,e*=this.options.wheelMultiplier,t*=this.options.wheelMultiplier,this.emitter.emit("scroll",{deltaX:e,deltaY:t,event:n})});be(this,"onWindowResize",()=>{this.window={width:window.innerWidth,height:window.innerHeight}});this.element=n,this.options=e,window.addEventListener("resize",this.onWindowResize),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,Bn),this.element.addEventListener("touchstart",this.onTouchStart,Bn),this.element.addEventListener("touchmove",this.onTouchMove,Bn),this.element.addEventListener("touchend",this.onTouchEnd,Bn)}on(n,e){return this.emitter.on(n,e)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize),this.element.removeEventListener("wheel",this.onWheel,Bn),this.element.removeEventListener("touchstart",this.onTouchStart,Bn),this.element.removeEventListener("touchmove",this.onTouchMove,Bn),this.element.removeEventListener("touchend",this.onTouchEnd,Bn)}};const Qa=n=>Math.min(1,1.001-2**(-10*n));var vc=class{constructor({wrapper:n=window,content:e=document.documentElement,eventsTarget:t=n,smoothWheel:i=!0,syncTouch:s=!1,syncTouchLerp:r=.075,touchInertiaExponent:o=1.7,duration:a,easing:l,lerp:c=.1,infinite:u=!1,orientation:d="vertical",gestureOrientation:h=d==="horizontal"?"both":"vertical",touchMultiplier:f=1,wheelMultiplier:g=1,autoResize:_=!0,prevent:m,virtualScroll:p,overscroll:b=!0,autoRaf:x=!1,anchors:M=!1,autoToggle:L=!1,allowNestedScroll:A=!1,__experimental__naiveDimensions:R=!1,naiveDimensions:C=R,stopInertiaOnNavigate:y=!1,respectReducedMotion:S=!0}={}){be(this,"_isScrolling",!1);be(this,"_isStopped",!1);be(this,"_isLocked",!1);be(this,"_preventNextNativeScrollEvent",!1);be(this,"_resetVelocityTimeout",null);be(this,"_rafId",null);be(this,"_isDraggingSelection",!1);be(this,"reducedMotionMediaQuery",window.matchMedia("(prefers-reduced-motion: reduce)"));be(this,"isTouching");be(this,"isIos");be(this,"time",0);be(this,"userData",{});be(this,"lastVelocity",0);be(this,"velocity",0);be(this,"direction",0);be(this,"options");be(this,"targetScroll");be(this,"animatedScroll");be(this,"animate",new Tu);be(this,"emitter",new _c);be(this,"dimensions");be(this,"virtualScroll");be(this,"onScrollEnd",n=>{n instanceof CustomEvent||(this.isScrolling==="smooth"||this.isScrolling===!1)&&n.stopPropagation()});be(this,"dispatchScrollendEvent",()=>{this.options.wrapper.dispatchEvent(new CustomEvent("scrollend",{bubbles:this.options.wrapper===window,detail:{lenisScrollEnd:!0}}))});be(this,"onTransitionEnd",n=>{var e;(e=n.propertyName)!=null&&e.includes("overflow")&&n.target===this.rootElement&&this.checkOverflow()});be(this,"onClick",n=>{const e=n.composedPath().filter(i=>i instanceof HTMLAnchorElement&&i.href).map(i=>new URL(i.href)),t=new URL(window.location.href);if(this.options.anchors){const i=e.find(s=>t.host===s.host&&t.pathname===s.pathname&&s.hash);if(i){const s=typeof this.options.anchors=="object"&&this.options.anchors?this.options.anchors:void 0,r=decodeURIComponent(i.hash);this.scrollTo(r,s);return}}if(this.options.stopInertiaOnNavigate&&e.some(i=>t.host===i.host&&t.pathname!==i.pathname)){this.reset();return}});be(this,"onPointerDown",n=>{n.button===1&&this.reset()});be(this,"onVirtualScroll",n=>{if(typeof this.options.virtualScroll=="function"&&this.options.virtualScroll(n)===!1)return;const{deltaX:e,deltaY:t,event:i}=n;if(this.emitter.emit("virtual-scroll",{deltaX:e,deltaY:t,event:i}),i.ctrlKey||i.lenisStopPropagation)return;const s=i.type.includes("touch"),r=i.type.includes("wheel");if(s&&this.isIos&&(i.type==="touchstart"&&(this._isDraggingSelection=this.isTouchOnSelectionHandle(i)),this._isDraggingSelection)){i.type==="touchend"&&(this._isDraggingSelection=!1);return}this.isTouching=i.type==="touchstart"||i.type==="touchmove";const o=e===0&&t===0;if(this.options.syncTouch&&s&&i.type==="touchstart"&&o&&!this.isStopped&&!this.isLocked){this.reset();return}const a=this.options.gestureOrientation==="vertical"&&t===0||this.options.gestureOrientation==="horizontal"&&e===0;if(o||a)return;let l=i.composedPath();l=l.slice(0,l.indexOf(this.rootElement));const c=this.options.prevent,u=Math.abs(e)>=Math.abs(t)?"horizontal":"vertical";if(l.find(g=>{var _,m,p,b,x;return g instanceof HTMLElement&&(typeof c=="function"&&(c==null?void 0:c(g))||((_=g.hasAttribute)==null?void 0:_.call(g,"data-lenis-prevent"))||u==="vertical"&&((m=g.hasAttribute)==null?void 0:m.call(g,"data-lenis-prevent-vertical"))||u==="horizontal"&&((p=g.hasAttribute)==null?void 0:p.call(g,"data-lenis-prevent-horizontal"))||s&&((b=g.hasAttribute)==null?void 0:b.call(g,"data-lenis-prevent-touch"))||r&&((x=g.hasAttribute)==null?void 0:x.call(g,"data-lenis-prevent-wheel"))||this.options.allowNestedScroll&&this.hasNestedScroll(g,{deltaX:e,deltaY:t}))}))return;if(this.isStopped||this.isLocked){i.cancelable&&i.preventDefault();return}if(!(this.options.syncTouch&&s||this.options.smoothWheel&&r)){this.isScrolling="native",this.animate.stop(),i.lenisStopPropagation=!0;return}let d=t;this.options.gestureOrientation==="both"?d=Math.abs(t)>Math.abs(e)?t:e:this.options.gestureOrientation==="horizontal"&&(d=e),(!this.options.overscroll||this.options.infinite||this.options.wrapper!==window&&this.limit>0&&(this.animatedScroll>0&&this.animatedScroll<this.limit||this.animatedScroll===0&&t>0||this.animatedScroll===this.limit&&t<0))&&(i.lenisStopPropagation=!0),i.cancelable&&i.preventDefault();const h=s&&this.options.syncTouch,f=s&&i.type==="touchend";f&&(d=Math.sign(d)*Math.abs(this.velocity)**this.options.touchInertiaExponent),this.scrollTo(this.targetScroll+d,{programmatic:!1,...h?{lerp:f?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}})});be(this,"onNativeScroll",()=>{if(this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this._preventNextNativeScrollEvent){this._preventNextNativeScrollEvent=!1;return}if(this.isScrolling===!1||this.isScrolling==="native"){const n=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-n,this.direction=Math.sign(this.animatedScroll-n),this.isStopped||(this.isScrolling="native"),this.emit(),this.velocity!==0&&(this._resetVelocityTimeout=setTimeout(()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()},400))}});be(this,"raf",n=>{const e=n-(this.time||n);this.time=n,this.animate.advance(e*.001),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))});window.lenisVersion=Ja,window.lenis||(window.lenis={}),window.lenis.version=Ja,d==="horizontal"&&(window.lenis.horizontal=!0),s===!0&&(window.lenis.touch=!0),this.isIos=/(iPad|iPhone|iPod)/g.test(navigator.userAgent),(!n||n===document.documentElement)&&(n=window),typeof a=="number"&&typeof l!="function"?l=Qa:typeof l=="function"&&typeof a!="number"&&(a=1),this.options={wrapper:n,content:e,eventsTarget:t,smoothWheel:i,syncTouch:s,syncTouchLerp:r,touchInertiaExponent:o,duration:a,easing:l,lerp:c,infinite:u,gestureOrientation:h,orientation:d,touchMultiplier:f,wheelMultiplier:g,autoResize:_,prevent:m,virtualScroll:p,overscroll:b,autoRaf:x,anchors:M,autoToggle:L,allowNestedScroll:A,naiveDimensions:C,stopInertiaOnNavigate:y,respectReducedMotion:S},this.dimensions=new Ru(n,e,{autoResize:_}),this.updateClassName(),this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll),this.options.wrapper.addEventListener("scrollend",this.onScrollEnd,{capture:!0}),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.addEventListener("click",this.onClick),this.options.wrapper.addEventListener("pointerdown",this.onPointerDown),this.virtualScroll=new Pu(t,{touchMultiplier:f,wheelMultiplier:g}),this.virtualScroll.on("scroll",this.onVirtualScroll),this.options.autoToggle&&(this.checkOverflow(),this.rootElement.addEventListener("transitionend",this.onTransitionEnd)),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll),this.options.wrapper.removeEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.wrapper.removeEventListener("pointerdown",this.onPointerDown),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.removeEventListener("click",this.onClick),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName(),this._rafId&&cancelAnimationFrame(this._rafId)}on(n,e){return this.emitter.on(n,e)}off(n,e){return this.emitter.off(n,e)}get overflow(){const n=this.isHorizontal?"overflow-x":"overflow-y";return getComputedStyle(this.rootElement)[n]}checkOverflow(){["hidden","clip"].includes(this.overflow)?this.internalStop():this.internalStart()}setScroll(n){this.isHorizontal?this.options.wrapper.scrollTo({left:n,behavior:"instant"}):this.options.wrapper.scrollTo({top:n,behavior:"instant"})}isTouchOnSelectionHandle(n){const e=window.getSelection();if(!e||e.isCollapsed||e.rangeCount===0)return!1;const t=n.targetTouches[0]??n.changedTouches[0];if(!t)return!1;const i=e.getRangeAt(0).getClientRects();if(i.length===0)return!1;const s=i[0],r=i[i.length-1],o=40,a=Math.hypot(t.clientX-s.left,t.clientY-s.top)<=o,l=Math.hypot(t.clientX-r.right,t.clientY-r.bottom)<=o;return a||l}resize(){this.dimensions.resize(),this.animatedScroll=this.targetScroll=this.actualScroll,this.emit()}emit(){this.emitter.emit("scroll",this)}reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){if(this.isStopped){if(this.options.autoToggle){this.rootElement.style.removeProperty("overflow");return}this.internalStart()}}internalStart(){this.isStopped&&(this.reset(),this.isStopped=!1,this.emit())}stop(){if(!this.isStopped){if(this.options.autoToggle){this.rootElement.style.setProperty("overflow","clip");return}this.internalStop()}}internalStop(){this.isStopped||(this.reset(),this.isStopped=!0,this.emit())}scrollTo(n,{offset:e=0,immediate:t=!1,lock:i=!1,programmatic:s=!0,lerp:r=s?this.options.lerp:void 0,duration:o=s?this.options.duration:void 0,easing:a=s?this.options.easing:void 0,onStart:l,onComplete:c,force:u=!1,userData:d}={}){if(this.prefersReducedMotion&&(s?t=!0:(r=1,o=void 0,a=void 0)),(this.isStopped||this.isLocked)&&!u)return;let h=n,f=e;if(typeof h=="string"&&["top","left","start","#"].includes(h))h=0;else if(typeof h=="string"&&["bottom","right","end"].includes(h))h=this.limit;else{let g=null;if(typeof h=="string"?(g=h.startsWith("#")?document.getElementById(h.slice(1)):document.querySelector(h),g||(h==="#top"?h=0:console.warn("Lenis: Target not found",h))):h instanceof HTMLElement&&(h!=null&&h.nodeType)&&(g=h),g){if(this.options.wrapper!==window){const M=this.rootElement.getBoundingClientRect();f-=this.isHorizontal?M.left:M.top}const _=g.getBoundingClientRect(),m=getComputedStyle(g),p=this.isHorizontal?Number.parseFloat(m.scrollMarginLeft):Number.parseFloat(m.scrollMarginTop),b=getComputedStyle(this.rootElement),x=this.isHorizontal?Number.parseFloat(b.scrollPaddingLeft):Number.parseFloat(b.scrollPaddingTop);h=(this.isHorizontal?_.left:_.top)+this.animatedScroll-(Number.isNaN(p)?0:p)-(Number.isNaN(x)?0:x)}}if(typeof h=="number"){if(h+=f,this.options.infinite){if(s){this.targetScroll=this.animatedScroll=this.scroll;const g=h-this.animatedScroll;g>this.limit/2?h-=this.limit:g<-this.limit/2&&(h+=this.limit)}}else h=gc(0,h,this.limit);if(h===this.targetScroll){l==null||l(this),c==null||c(this);return}if(this.userData=d??{},t){this.animatedScroll=this.targetScroll=h,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),c==null||c(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()});return}s||(this.targetScroll=h),typeof o=="number"&&typeof a!="function"?a=Qa:typeof a=="function"&&typeof o!="number"&&(o=1),this.animate.fromTo(this.animatedScroll,h,{duration:o,easing:a,lerp:r,onStart:()=>{i&&(this.isLocked=!0),this.isScrolling="smooth",l==null||l(this)},onUpdate:(g,_)=>{this.isScrolling="smooth",this.lastVelocity=this.velocity,this.velocity=g-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=g,this.setScroll(this.scroll),s&&(this.targetScroll=g),_||this.emit(),_&&(this.reset(),this.emit(),c==null||c(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()}),this.preventNextNativeScrollEvent())}})}}preventNextNativeScrollEvent(){this._preventNextNativeScrollEvent=!0,requestAnimationFrame(()=>{this._preventNextNativeScrollEvent=!1})}hasNestedScroll(n,{deltaX:e,deltaY:t}){const i=Date.now();n._lenis||(n._lenis={});const s=n._lenis;let r,o,a,l,c,u,d,h,f,g;if(i-(s.time??0)>2e3){s.time=Date.now();const A=window.getComputedStyle(n);if(s.computedStyle=A,r=["auto","overlay","scroll"].includes(A.overflowX),o=["auto","overlay","scroll"].includes(A.overflowY),c=["auto"].includes(A.overscrollBehaviorX),u=["auto"].includes(A.overscrollBehaviorY),s.hasOverflowX=r,s.hasOverflowY=o,!(r||o))return!1;d=n.scrollWidth,h=n.scrollHeight,f=n.clientWidth,g=n.clientHeight,a=d>f,l=h>g,s.isScrollableX=a,s.isScrollableY=l,s.scrollWidth=d,s.scrollHeight=h,s.clientWidth=f,s.clientHeight=g,s.hasOverscrollBehaviorX=c,s.hasOverscrollBehaviorY=u}else a=s.isScrollableX,l=s.isScrollableY,r=s.hasOverflowX,o=s.hasOverflowY,d=s.scrollWidth,h=s.scrollHeight,f=s.clientWidth,g=s.clientHeight,c=s.hasOverscrollBehaviorX,u=s.hasOverscrollBehaviorY;if(!(r&&a||o&&l))return!1;const _=Math.abs(e)>=Math.abs(t)?"horizontal":"vertical";let m,p,b,x,M,L;if(_==="horizontal")m=Math.round(n.scrollLeft),p=d-f,b=e,x=r,M=a,L=c;else if(_==="vertical")m=Math.round(n.scrollTop),p=h-g,b=t,x=o,M=l,L=u;else return!1;return!L&&(m>=p||m<=0)?!0:(b>0?m<p:m>0)&&x&&M}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return this.options.orientation==="horizontal"}get actualScroll(){const n=this.options.wrapper;return this.isHorizontal?n.scrollX??n.scrollLeft:n.scrollY??n.scrollTop}get scroll(){return this.options.infinite?wu(this.animatedScroll,this.limit):this.animatedScroll}get progress(){return this.limit===0?1:this.scroll/this.limit}get isScrolling(){return this._isScrolling}set isScrolling(n){this._isScrolling!==n&&(this._isScrolling=n,this.updateClassName())}get isStopped(){return this._isStopped}set isStopped(n){this._isStopped!==n&&(this._isStopped=n,this.updateClassName())}get isLocked(){return this._isLocked}set isLocked(n){this._isLocked!==n&&(this._isLocked=n,this.updateClassName())}get isSmooth(){return this.isScrolling==="smooth"}get prefersReducedMotion(){return this.options.respectReducedMotion&&this.reducedMotionMediaQuery.matches}get className(){let n="lenis";return this.options.autoToggle&&(n+=" lenis-autoToggle"),this.isStopped&&(n+=" lenis-stopped"),this.isLocked&&(n+=" lenis-locked"),this.isScrolling&&(n+=" lenis-scrolling"),this.isScrolling==="smooth"&&(n+=" lenis-smooth"),n}updateClassName(){this.cleanUpClassName(),this.className.split(" ").forEach(n=>{this.rootElement.classList.add(n)})}cleanUpClassName(){for(const n of Array.from(this.rootElement.classList))(n==="lenis"||n.startsWith("lenis-"))&&this.rootElement.classList.remove(n)}};/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ya="170",Lu=0,el=1,Iu=2,Mc=1,xa=2,Rn=3,Jn=0,Dt=1,on=2,Zn=0,qi=1,Ot=2,tl=3,nl=4,Du=5,hi=100,Uu=101,Nu=102,Fu=103,Ou=104,zu=200,Bu=201,ku=202,Hu=203,Co=204,Po=205,Gu=206,Vu=207,Wu=208,Xu=209,qu=210,Yu=211,$u=212,Zu=213,Ku=214,Lo=0,Io=1,Do=2,Ji=3,Uo=4,No=5,Fo=6,Oo=7,Sc=0,Ju=1,ju=2,Kn=0,Qu=1,ed=2,td=3,Ea=4,nd=5,id=6,sd=7,yc=300,ji=301,Qi=302,zo=303,Bo=304,Lr=306,vi=1e3,mi=1001,ko=1002,hn=1003,rd=1004,Gs=1005,_n=1006,Br=1007,gi=1008,Un=1009,xc=1010,Ec=1011,Ps=1012,ba=1013,Mi=1014,Pn=1015,Us=1016,wa=1017,Ta=1018,es=1020,bc=35902,wc=1021,Tc=1022,un=1023,Ac=1024,Rc=1025,Yi=1026,ts=1027,Cc=1028,Aa=1029,Pc=1030,Ra=1031,Ca=1033,_r=33776,vr=33777,Mr=33778,Sr=33779,Ho=35840,Go=35841,Vo=35842,Wo=35843,Xo=36196,qo=37492,Yo=37496,$o=37808,Zo=37809,Ko=37810,Jo=37811,jo=37812,Qo=37813,ea=37814,ta=37815,na=37816,ia=37817,sa=37818,ra=37819,oa=37820,aa=37821,yr=36492,la=36494,ca=36495,Lc=36283,ua=36284,da=36285,ha=36286,od=3200,ad=3201,Ic=0,ld=1,qn="",Et="srgb",is="srgb-linear",Ir="linear",rt="srgb",Ti=7680,il=519,cd=512,ud=513,dd=514,Dc=515,hd=516,fd=517,pd=518,md=519,fa=35044,sl="300 es",Ln=2e3,br=2001;class ss{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}}const Pt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let rl=1234567;const bs=Math.PI/180,Ls=180/Math.PI;function In(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Pt[n&255]+Pt[n>>8&255]+Pt[n>>16&255]+Pt[n>>24&255]+"-"+Pt[e&255]+Pt[e>>8&255]+"-"+Pt[e>>16&15|64]+Pt[e>>24&255]+"-"+Pt[t&63|128]+Pt[t>>8&255]+"-"+Pt[t>>16&255]+Pt[t>>24&255]+Pt[i&255]+Pt[i>>8&255]+Pt[i>>16&255]+Pt[i>>24&255]).toLowerCase()}function At(n,e,t){return Math.max(e,Math.min(t,n))}function Pa(n,e){return(n%e+e)%e}function gd(n,e,t,i,s){return i+(n-e)*(s-i)/(t-e)}function _d(n,e,t){return n!==e?(t-n)/(e-n):0}function ws(n,e,t){return(1-t)*n+t*e}function vd(n,e,t,i){return ws(n,e,1-Math.exp(-t*i))}function Md(n,e=1){return e-Math.abs(Pa(n,e*2)-e)}function Sd(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function yd(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function xd(n,e){return n+Math.floor(Math.random()*(e-n+1))}function Ed(n,e){return n+Math.random()*(e-n)}function bd(n){return n*(.5-Math.random())}function wd(n){n!==void 0&&(rl=n);let e=rl+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Td(n){return n*bs}function Ad(n){return n*Ls}function Rd(n){return(n&n-1)===0&&n!==0}function Cd(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Pd(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Ld(n,e,t,i,s){const r=Math.cos,o=Math.sin,a=r(t/2),l=o(t/2),c=r((e+i)/2),u=o((e+i)/2),d=r((e-i)/2),h=o((e-i)/2),f=r((i-e)/2),g=o((i-e)/2);switch(s){case"XYX":n.set(a*u,l*d,l*h,a*c);break;case"YZY":n.set(l*h,a*u,l*d,a*c);break;case"ZXZ":n.set(l*d,l*h,a*u,a*c);break;case"XZX":n.set(a*u,l*g,l*f,a*c);break;case"YXY":n.set(l*f,a*u,l*g,a*c);break;case"ZYZ":n.set(l*g,l*f,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function an(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function nt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const xn={DEG2RAD:bs,RAD2DEG:Ls,generateUUID:In,clamp:At,euclideanModulo:Pa,mapLinear:gd,inverseLerp:_d,lerp:ws,damp:vd,pingpong:Md,smoothstep:Sd,smootherstep:yd,randInt:xd,randFloat:Ed,randFloatSpread:bd,seededRandom:wd,degToRad:Td,radToDeg:Ad,isPowerOfTwo:Rd,ceilPowerOfTwo:Cd,floorPowerOfTwo:Pd,setQuaternionFromProperEuler:Ld,normalize:nt,denormalize:an};class xe{constructor(e=0,t=0){xe.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(At(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*i-o*s+e.x,this.y=r*s+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ge{constructor(e,t,i,s,r,o,a,l,c){Ge.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,o,a,l,c)}set(e,t,i,s,r,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=s,u[2]=a,u[3]=t,u[4]=r,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],u=i[4],d=i[7],h=i[2],f=i[5],g=i[8],_=s[0],m=s[3],p=s[6],b=s[1],x=s[4],M=s[7],L=s[2],A=s[5],R=s[8];return r[0]=o*_+a*b+l*L,r[3]=o*m+a*x+l*A,r[6]=o*p+a*M+l*R,r[1]=c*_+u*b+d*L,r[4]=c*m+u*x+d*A,r[7]=c*p+u*M+d*R,r[2]=h*_+f*b+g*L,r[5]=h*m+f*x+g*A,r[8]=h*p+f*M+g*R,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-i*r*u+i*a*l+s*r*c-s*o*l}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=u*o-a*c,h=a*l-u*r,f=c*r-o*l,g=t*d+i*h+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=d*_,e[1]=(s*c-u*i)*_,e[2]=(a*i-s*o)*_,e[3]=h*_,e[4]=(u*t-s*l)*_,e[5]=(s*r-a*t)*_,e[6]=f*_,e[7]=(i*l-c*t)*_,e[8]=(o*t-i*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-s*c,s*l,-s*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(kr.makeScale(e,t)),this}rotate(e){return this.premultiply(kr.makeRotation(-e)),this}translate(e,t){return this.premultiply(kr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const kr=new Ge;function Uc(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function wr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Id(){const n=wr("canvas");return n.style.display="block",n}const ol={};function Ss(n){n in ol||(ol[n]=!0,console.warn(n))}function Dd(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}function Ud(n){const e=n.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Nd(n){const e=n.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const $e={enabled:!0,workingColorSpace:is,spaces:{},convert:function(n,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===rt&&(n.r=Dn(n.r),n.g=Dn(n.g),n.b=Dn(n.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(n.applyMatrix3(this.spaces[e].toXYZ),n.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===rt&&(n.r=$i(n.r),n.g=$i(n.g),n.b=$i(n.b))),n},fromWorkingColorSpace:function(n,e){return this.convert(n,this.workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===qn?Ir:this.spaces[n].transfer},getLuminanceCoefficients:function(n,e=this.workingColorSpace){return n.fromArray(this.spaces[e].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,e,t){return n.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace}};function Dn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function $i(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}const al=[.64,.33,.3,.6,.15,.06],ll=[.2126,.7152,.0722],cl=[.3127,.329],ul=new Ge().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),dl=new Ge().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);$e.define({[is]:{primaries:al,whitePoint:cl,transfer:Ir,toXYZ:ul,fromXYZ:dl,luminanceCoefficients:ll,workingColorSpaceConfig:{unpackColorSpace:Et},outputColorSpaceConfig:{drawingBufferColorSpace:Et}},[Et]:{primaries:al,whitePoint:cl,transfer:rt,toXYZ:ul,fromXYZ:dl,luminanceCoefficients:ll,outputColorSpaceConfig:{drawingBufferColorSpace:Et}}});let Ai;class Fd{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Ai===void 0&&(Ai=wr("canvas")),Ai.width=e.width,Ai.height=e.height;const i=Ai.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=Ai}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=wr("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Dn(r[o]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Dn(t[i]/255)*255):t[i]=Dn(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Od=0;class Nc{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Od++}),this.uuid=In(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Hr(s[o].image)):r.push(Hr(s[o]))}else r=Hr(s);i.url=r}return t||(e.images[this.uuid]=i),i}}function Hr(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Fd.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let zd=0;class Bt extends ss{constructor(e=Bt.DEFAULT_IMAGE,t=Bt.DEFAULT_MAPPING,i=mi,s=mi,r=_n,o=gi,a=un,l=Un,c=Bt.DEFAULT_ANISOTROPY,u=qn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:zd++}),this.uuid=In(),this.name="",this.source=new Nc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new xe(0,0),this.repeat=new xe(1,1),this.center=new xe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ge,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==yc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case vi:e.x=e.x-Math.floor(e.x);break;case mi:e.x=e.x<0?0:1;break;case ko:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case vi:e.y=e.y-Math.floor(e.y);break;case mi:e.y=e.y<0?0:1;break;case ko:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Bt.DEFAULT_IMAGE=null;Bt.DEFAULT_MAPPING=yc;Bt.DEFAULT_ANISOTROPY=1;class ot{constructor(e=0,t=0,i=0,s=1){ot.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*i+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r;const l=e.elements,c=l[0],u=l[4],d=l[8],h=l[1],f=l[5],g=l[9],_=l[2],m=l[6],p=l[10];if(Math.abs(u-h)<.01&&Math.abs(d-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(c+1)/2,M=(f+1)/2,L=(p+1)/2,A=(u+h)/4,R=(d+_)/4,C=(g+m)/4;return x>M&&x>L?x<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(x),s=A/i,r=R/i):M>L?M<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),i=A/s,r=C/s):L<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(L),i=R/r,s=C/r),this.set(i,s,r,t),this}let b=Math.sqrt((m-g)*(m-g)+(d-_)*(d-_)+(h-u)*(h-u));return Math.abs(b)<.001&&(b=1),this.x=(m-g)/b,this.y=(d-_)/b,this.z=(h-u)/b,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Bd extends ss{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new ot(0,0,e,t),this.scissorTest=!1,this.viewport=new ot(0,0,e,t);const s={width:e,height:t,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:_n,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const r=new Bt(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);r.flipY=!1,r.generateMipmaps=i.generateMipmaps,r.internalFormat=i.internalFormat,this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,s=e.textures.length;i<s;i++)this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Nc(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Si extends Bd{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Fc extends Bt{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=hn,this.minFilter=hn,this.wrapR=mi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class kd extends Bt{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=hn,this.minFilter=hn,this.wrapR=mi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ns{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,o,a){let l=i[s+0],c=i[s+1],u=i[s+2],d=i[s+3];const h=r[o+0],f=r[o+1],g=r[o+2],_=r[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d;return}if(a===1){e[t+0]=h,e[t+1]=f,e[t+2]=g,e[t+3]=_;return}if(d!==_||l!==h||c!==f||u!==g){let m=1-a;const p=l*h+c*f+u*g+d*_,b=p>=0?1:-1,x=1-p*p;if(x>Number.EPSILON){const L=Math.sqrt(x),A=Math.atan2(L,p*b);m=Math.sin(m*A)/L,a=Math.sin(a*A)/L}const M=a*b;if(l=l*m+h*M,c=c*m+f*M,u=u*m+g*M,d=d*m+_*M,m===1-a){const L=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=L,c*=L,u*=L,d*=L}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,s,r,o){const a=i[s],l=i[s+1],c=i[s+2],u=i[s+3],d=r[o],h=r[o+1],f=r[o+2],g=r[o+3];return e[t]=a*g+u*d+l*f-c*h,e[t+1]=l*g+u*h+c*d-a*f,e[t+2]=c*g+u*f+a*h-l*d,e[t+3]=u*g-a*d-l*h-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(s/2),d=a(r/2),h=l(i/2),f=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=h*u*d+c*f*g,this._y=c*f*d-h*u*g,this._z=c*u*g+h*f*d,this._w=c*u*d-h*f*g;break;case"YXZ":this._x=h*u*d+c*f*g,this._y=c*f*d-h*u*g,this._z=c*u*g-h*f*d,this._w=c*u*d+h*f*g;break;case"ZXY":this._x=h*u*d-c*f*g,this._y=c*f*d+h*u*g,this._z=c*u*g+h*f*d,this._w=c*u*d-h*f*g;break;case"ZYX":this._x=h*u*d-c*f*g,this._y=c*f*d+h*u*g,this._z=c*u*g-h*f*d,this._w=c*u*d+h*f*g;break;case"YZX":this._x=h*u*d+c*f*g,this._y=c*f*d+h*u*g,this._z=c*u*g-h*f*d,this._w=c*u*d-h*f*g;break;case"XZY":this._x=h*u*d-c*f*g,this._y=c*f*d-h*u*g,this._z=c*u*g+h*f*d,this._w=c*u*d+h*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],d=t[10],h=i+a+d;if(h>0){const f=.5/Math.sqrt(h+1);this._w=.25/f,this._x=(u-l)*f,this._y=(r-c)*f,this._z=(o-s)*f}else if(i>a&&i>d){const f=2*Math.sqrt(1+i-a-d);this._w=(u-l)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+c)/f}else if(a>d){const f=2*Math.sqrt(1+a-i-d);this._w=(r-c)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(l+u)/f}else{const f=2*Math.sqrt(1+d-i-a);this._w=(o-s)/f,this._x=(r+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(At(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+o*a+s*c-r*l,this._y=s*u+o*l+r*a-i*c,this._z=r*u+o*c+i*l-s*a,this._w=o*u-i*a-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,s=this._y,r=this._z,o=this._w;let a=o*e._w+i*e._x+s*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=s,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const f=1-t;return this._w=f*o+t*this._w,this._x=f*i+t*this._x,this._y=f*s+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),d=Math.sin((1-t)*u)/c,h=Math.sin(t*u)/c;return this._w=o*d+this._w*h,this._x=i*d+this._x*h,this._y=s*d+this._y*h,this._z=r*d+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class w{constructor(e=0,t=0,i=0){w.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(hl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(hl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*s-a*i),u=2*(a*t-r*s),d=2*(r*i-o*t);return this.x=t+l*c+o*d-a*u,this.y=i+l*u+a*c-r*d,this.z=s+l*d+r*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=s*l-r*a,this.y=r*o-i*l,this.z=i*a-s*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Gr.copy(this).projectOnVector(e),this.sub(Gr)}reflect(e){return this.sub(Gr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(At(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Gr=new w,hl=new Ns;class Fs{constructor(e=new w(1/0,1/0,1/0),t=new w(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(en.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(en.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=en.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,en):en.fromBufferAttribute(r,o),en.applyMatrix4(e.matrixWorld),this.expandByPoint(en);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Vs.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Vs.copy(i.boundingBox)),Vs.applyMatrix4(e.matrixWorld),this.union(Vs)}const s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,en),en.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(us),Ws.subVectors(this.max,us),Ri.subVectors(e.a,us),Ci.subVectors(e.b,us),Pi.subVectors(e.c,us),kn.subVectors(Ci,Ri),Hn.subVectors(Pi,Ci),ei.subVectors(Ri,Pi);let t=[0,-kn.z,kn.y,0,-Hn.z,Hn.y,0,-ei.z,ei.y,kn.z,0,-kn.x,Hn.z,0,-Hn.x,ei.z,0,-ei.x,-kn.y,kn.x,0,-Hn.y,Hn.x,0,-ei.y,ei.x,0];return!Vr(t,Ri,Ci,Pi,Ws)||(t=[1,0,0,0,1,0,0,0,1],!Vr(t,Ri,Ci,Pi,Ws))?!1:(Xs.crossVectors(kn,Hn),t=[Xs.x,Xs.y,Xs.z],Vr(t,Ri,Ci,Pi,Ws))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,en).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(en).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(En[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),En[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),En[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),En[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),En[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),En[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),En[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),En[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(En),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const En=[new w,new w,new w,new w,new w,new w,new w,new w],en=new w,Vs=new Fs,Ri=new w,Ci=new w,Pi=new w,kn=new w,Hn=new w,ei=new w,us=new w,Ws=new w,Xs=new w,ti=new w;function Vr(n,e,t,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){ti.fromArray(n,r);const a=s.x*Math.abs(ti.x)+s.y*Math.abs(ti.y)+s.z*Math.abs(ti.z),l=e.dot(ti),c=t.dot(ti),u=i.dot(ti);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const Hd=new Fs,ds=new w,Wr=new w;class Os{constructor(e=new w,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Hd.setFromPoints(e).getCenter(i);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ds.subVectors(e,this.center);const t=ds.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(ds,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Wr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ds.copy(e.center).add(Wr)),this.expandByPoint(ds.copy(e.center).sub(Wr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const bn=new w,Xr=new w,qs=new w,Gn=new w,qr=new w,Ys=new w,Yr=new w;class Dr{constructor(e=new w,t=new w(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,bn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=bn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(bn.copy(this.origin).addScaledVector(this.direction,t),bn.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){Xr.copy(e).add(t).multiplyScalar(.5),qs.copy(t).sub(e).normalize(),Gn.copy(this.origin).sub(Xr);const r=e.distanceTo(t)*.5,o=-this.direction.dot(qs),a=Gn.dot(this.direction),l=-Gn.dot(qs),c=Gn.lengthSq(),u=Math.abs(1-o*o);let d,h,f,g;if(u>0)if(d=o*l-a,h=o*a-l,g=r*u,d>=0)if(h>=-g)if(h<=g){const _=1/u;d*=_,h*=_,f=d*(d+o*h+2*a)+h*(o*d+h+2*l)+c}else h=r,d=Math.max(0,-(o*h+a)),f=-d*d+h*(h+2*l)+c;else h=-r,d=Math.max(0,-(o*h+a)),f=-d*d+h*(h+2*l)+c;else h<=-g?(d=Math.max(0,-(-o*r+a)),h=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+h*(h+2*l)+c):h<=g?(d=0,h=Math.min(Math.max(-r,-l),r),f=h*(h+2*l)+c):(d=Math.max(0,-(o*r+a)),h=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+h*(h+2*l)+c);else h=o>0?-r:r,d=Math.max(0,-(o*h+a)),f=-d*d+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(Xr).addScaledVector(qs,h),f}intersectSphere(e,t){bn.subVectors(e.center,this.origin);const i=bn.dot(this.direction),s=bn.dot(bn)-i*i,r=e.radius*e.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return c>=0?(i=(e.min.x-h.x)*c,s=(e.max.x-h.x)*c):(i=(e.max.x-h.x)*c,s=(e.min.x-h.x)*c),u>=0?(r=(e.min.y-h.y)*u,o=(e.max.y-h.y)*u):(r=(e.max.y-h.y)*u,o=(e.min.y-h.y)*u),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),d>=0?(a=(e.min.z-h.z)*d,l=(e.max.z-h.z)*d):(a=(e.max.z-h.z)*d,l=(e.min.z-h.z)*d),i>l||a>s)||((a>i||i!==i)&&(i=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,bn)!==null}intersectTriangle(e,t,i,s,r){qr.subVectors(t,e),Ys.subVectors(i,e),Yr.crossVectors(qr,Ys);let o=this.direction.dot(Yr),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Gn.subVectors(this.origin,e);const l=a*this.direction.dot(Ys.crossVectors(Gn,Ys));if(l<0)return null;const c=a*this.direction.dot(qr.cross(Gn));if(c<0||l+c>o)return null;const u=-a*Gn.dot(Yr);return u<0?null:this.at(u/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class at{constructor(e,t,i,s,r,o,a,l,c,u,d,h,f,g,_,m){at.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,o,a,l,c,u,d,h,f,g,_,m)}set(e,t,i,s,r,o,a,l,c,u,d,h,f,g,_,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=u,p[10]=d,p[14]=h,p[3]=f,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new at().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,s=1/Li.setFromMatrixColumn(e,0).length(),r=1/Li.setFromMatrixColumn(e,1).length(),o=1/Li.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,r=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){const h=o*u,f=o*d,g=a*u,_=a*d;t[0]=l*u,t[4]=-l*d,t[8]=c,t[1]=f+g*c,t[5]=h-_*c,t[9]=-a*l,t[2]=_-h*c,t[6]=g+f*c,t[10]=o*l}else if(e.order==="YXZ"){const h=l*u,f=l*d,g=c*u,_=c*d;t[0]=h+_*a,t[4]=g*a-f,t[8]=o*c,t[1]=o*d,t[5]=o*u,t[9]=-a,t[2]=f*a-g,t[6]=_+h*a,t[10]=o*l}else if(e.order==="ZXY"){const h=l*u,f=l*d,g=c*u,_=c*d;t[0]=h-_*a,t[4]=-o*d,t[8]=g+f*a,t[1]=f+g*a,t[5]=o*u,t[9]=_-h*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const h=o*u,f=o*d,g=a*u,_=a*d;t[0]=l*u,t[4]=g*c-f,t[8]=h*c+_,t[1]=l*d,t[5]=_*c+h,t[9]=f*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const h=o*l,f=o*c,g=a*l,_=a*c;t[0]=l*u,t[4]=_-h*d,t[8]=g*d+f,t[1]=d,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=f*d+g,t[10]=h-_*d}else if(e.order==="XZY"){const h=o*l,f=o*c,g=a*l,_=a*c;t[0]=l*u,t[4]=-d,t[8]=c*u,t[1]=h*d+_,t[5]=o*u,t[9]=f*d-g,t[2]=g*d-f,t[6]=a*u,t[10]=_*d+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Gd,e,Vd)}lookAt(e,t,i){const s=this.elements;return Vt.subVectors(e,t),Vt.lengthSq()===0&&(Vt.z=1),Vt.normalize(),Vn.crossVectors(i,Vt),Vn.lengthSq()===0&&(Math.abs(i.z)===1?Vt.x+=1e-4:Vt.z+=1e-4,Vt.normalize(),Vn.crossVectors(i,Vt)),Vn.normalize(),$s.crossVectors(Vt,Vn),s[0]=Vn.x,s[4]=$s.x,s[8]=Vt.x,s[1]=Vn.y,s[5]=$s.y,s[9]=Vt.y,s[2]=Vn.z,s[6]=$s.z,s[10]=Vt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],u=i[1],d=i[5],h=i[9],f=i[13],g=i[2],_=i[6],m=i[10],p=i[14],b=i[3],x=i[7],M=i[11],L=i[15],A=s[0],R=s[4],C=s[8],y=s[12],S=s[1],P=s[5],O=s[9],z=s[13],q=s[2],$=s[6],W=s[10],Q=s[14],V=s[3],le=s[7],Me=s[11],we=s[15];return r[0]=o*A+a*S+l*q+c*V,r[4]=o*R+a*P+l*$+c*le,r[8]=o*C+a*O+l*W+c*Me,r[12]=o*y+a*z+l*Q+c*we,r[1]=u*A+d*S+h*q+f*V,r[5]=u*R+d*P+h*$+f*le,r[9]=u*C+d*O+h*W+f*Me,r[13]=u*y+d*z+h*Q+f*we,r[2]=g*A+_*S+m*q+p*V,r[6]=g*R+_*P+m*$+p*le,r[10]=g*C+_*O+m*W+p*Me,r[14]=g*y+_*z+m*Q+p*we,r[3]=b*A+x*S+M*q+L*V,r[7]=b*R+x*P+M*$+L*le,r[11]=b*C+x*O+M*W+L*Me,r[15]=b*y+x*z+M*Q+L*we,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],d=e[6],h=e[10],f=e[14],g=e[3],_=e[7],m=e[11],p=e[15];return g*(+r*l*d-s*c*d-r*a*h+i*c*h+s*a*f-i*l*f)+_*(+t*l*f-t*c*h+r*o*h-s*o*f+s*c*u-r*l*u)+m*(+t*c*d-t*a*f-r*o*d+i*o*f+r*a*u-i*c*u)+p*(-s*a*u-t*l*d+t*a*h+s*o*d-i*o*h+i*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=e[9],h=e[10],f=e[11],g=e[12],_=e[13],m=e[14],p=e[15],b=d*m*c-_*h*c+_*l*f-a*m*f-d*l*p+a*h*p,x=g*h*c-u*m*c-g*l*f+o*m*f+u*l*p-o*h*p,M=u*_*c-g*d*c+g*a*f-o*_*f-u*a*p+o*d*p,L=g*d*l-u*_*l-g*a*h+o*_*h+u*a*m-o*d*m,A=t*b+i*x+s*M+r*L;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/A;return e[0]=b*R,e[1]=(_*h*r-d*m*r-_*s*f+i*m*f+d*s*p-i*h*p)*R,e[2]=(a*m*r-_*l*r+_*s*c-i*m*c-a*s*p+i*l*p)*R,e[3]=(d*l*r-a*h*r-d*s*c+i*h*c+a*s*f-i*l*f)*R,e[4]=x*R,e[5]=(u*m*r-g*h*r+g*s*f-t*m*f-u*s*p+t*h*p)*R,e[6]=(g*l*r-o*m*r-g*s*c+t*m*c+o*s*p-t*l*p)*R,e[7]=(o*h*r-u*l*r+u*s*c-t*h*c-o*s*f+t*l*f)*R,e[8]=M*R,e[9]=(g*d*r-u*_*r-g*i*f+t*_*f+u*i*p-t*d*p)*R,e[10]=(o*_*r-g*a*r+g*i*c-t*_*c-o*i*p+t*a*p)*R,e[11]=(u*a*r-o*d*r-u*i*c+t*d*c+o*i*f-t*a*f)*R,e[12]=L*R,e[13]=(u*_*s-g*d*s+g*i*h-t*_*h-u*i*m+t*d*m)*R,e[14]=(g*a*s-o*_*s-g*i*l+t*_*l+o*i*m-t*a*m)*R,e[15]=(o*d*s-u*a*s+u*i*l-t*d*l-o*i*h+t*a*h)*R,this}scale(e){const t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),r=1-i,o=e.x,a=e.y,l=e.z,c=r*o,u=r*a;return this.set(c*o+i,c*a-s*l,c*l+s*a,0,c*a+s*l,u*a+i,u*l-s*o,0,c*l-s*a,u*l+s*o,r*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,o){return this.set(1,i,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,u=o+o,d=a+a,h=r*c,f=r*u,g=r*d,_=o*u,m=o*d,p=a*d,b=l*c,x=l*u,M=l*d,L=i.x,A=i.y,R=i.z;return s[0]=(1-(_+p))*L,s[1]=(f+M)*L,s[2]=(g-x)*L,s[3]=0,s[4]=(f-M)*A,s[5]=(1-(h+p))*A,s[6]=(m+b)*A,s[7]=0,s[8]=(g+x)*R,s[9]=(m-b)*R,s[10]=(1-(h+_))*R,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;let r=Li.set(s[0],s[1],s[2]).length();const o=Li.set(s[4],s[5],s[6]).length(),a=Li.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],tn.copy(this);const c=1/r,u=1/o,d=1/a;return tn.elements[0]*=c,tn.elements[1]*=c,tn.elements[2]*=c,tn.elements[4]*=u,tn.elements[5]*=u,tn.elements[6]*=u,tn.elements[8]*=d,tn.elements[9]*=d,tn.elements[10]*=d,t.setFromRotationMatrix(tn),i.x=r,i.y=o,i.z=a,this}makePerspective(e,t,i,s,r,o,a=Ln){const l=this.elements,c=2*r/(t-e),u=2*r/(i-s),d=(t+e)/(t-e),h=(i+s)/(i-s);let f,g;if(a===Ln)f=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===br)f=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,s,r,o,a=Ln){const l=this.elements,c=1/(t-e),u=1/(i-s),d=1/(o-r),h=(t+e)*c,f=(i+s)*u;let g,_;if(a===Ln)g=(o+r)*d,_=-2*d;else if(a===br)g=r*d,_=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-h,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Li=new w,tn=new at,Gd=new w(0,0,0),Vd=new w(1,1,1),Vn=new w,$s=new w,Vt=new w,fl=new at,pl=new Ns;class vn{constructor(e=0,t=0,i=0,s=vn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],u=s[9],d=s[2],h=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(At(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-At(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(At(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-At(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(At(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-At(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return fl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(fl,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return pl.setFromEuler(this),this.setFromQuaternion(pl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}vn.DEFAULT_ORDER="XYZ";class La{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Wd=0;const ml=new w,Ii=new Ns,wn=new at,Zs=new w,hs=new w,Xd=new w,qd=new Ns,gl=new w(1,0,0),_l=new w(0,1,0),vl=new w(0,0,1),Ml={type:"added"},Yd={type:"removed"},Di={type:"childadded",child:null},$r={type:"childremoved",child:null};class yt extends ss{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Wd++}),this.uuid=In(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=yt.DEFAULT_UP.clone();const e=new w,t=new vn,i=new Ns,s=new w(1,1,1);function r(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new at},normalMatrix:{value:new Ge}}),this.matrix=new at,this.matrixWorld=new at,this.matrixAutoUpdate=yt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=yt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new La,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ii.setFromAxisAngle(e,t),this.quaternion.multiply(Ii),this}rotateOnWorldAxis(e,t){return Ii.setFromAxisAngle(e,t),this.quaternion.premultiply(Ii),this}rotateX(e){return this.rotateOnAxis(gl,e)}rotateY(e){return this.rotateOnAxis(_l,e)}rotateZ(e){return this.rotateOnAxis(vl,e)}translateOnAxis(e,t){return ml.copy(e).applyQuaternion(this.quaternion),this.position.add(ml.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(gl,e)}translateY(e){return this.translateOnAxis(_l,e)}translateZ(e){return this.translateOnAxis(vl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(wn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Zs.copy(e):Zs.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),hs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?wn.lookAt(hs,Zs,this.up):wn.lookAt(Zs,hs,this.up),this.quaternion.setFromRotationMatrix(wn),s&&(wn.extractRotation(s.matrixWorld),Ii.setFromRotationMatrix(wn),this.quaternion.premultiply(Ii.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Ml),Di.child=e,this.dispatchEvent(Di),Di.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Yd),$r.child=e,this.dispatchEvent($r),$r.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),wn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),wn.multiply(e.parent.matrixWorld)),e.applyMatrix4(wn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Ml),Di.child=e,this.dispatchEvent(Di),Di.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(hs,e,Xd),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(hs,qd,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];r(e.shapes,d)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),d=o(e.shapes),h=o(e.skeletons),f=o(e.animations),g=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),d.length>0&&(i.shapes=d),h.length>0&&(i.skeletons=h),f.length>0&&(i.animations=f),g.length>0&&(i.nodes=g)}return i.object=s,i;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}yt.DEFAULT_UP=new w(0,1,0);yt.DEFAULT_MATRIX_AUTO_UPDATE=!0;yt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const nn=new w,Tn=new w,Zr=new w,An=new w,Ui=new w,Ni=new w,Sl=new w,Kr=new w,Jr=new w,jr=new w,Qr=new ot,eo=new ot,to=new ot;class Kt{constructor(e=new w,t=new w,i=new w){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),nn.subVectors(e,t),s.cross(nn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){nn.subVectors(s,t),Tn.subVectors(i,t),Zr.subVectors(e,t);const o=nn.dot(nn),a=nn.dot(Tn),l=nn.dot(Zr),c=Tn.dot(Tn),u=Tn.dot(Zr),d=o*c-a*a;if(d===0)return r.set(0,0,0),null;const h=1/d,f=(c*l-a*u)*h,g=(o*u-a*l)*h;return r.set(1-f-g,g,f)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,An)===null?!1:An.x>=0&&An.y>=0&&An.x+An.y<=1}static getInterpolation(e,t,i,s,r,o,a,l){return this.getBarycoord(e,t,i,s,An)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,An.x),l.addScaledVector(o,An.y),l.addScaledVector(a,An.z),l)}static getInterpolatedAttribute(e,t,i,s,r,o){return Qr.setScalar(0),eo.setScalar(0),to.setScalar(0),Qr.fromBufferAttribute(e,t),eo.fromBufferAttribute(e,i),to.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(Qr,r.x),o.addScaledVector(eo,r.y),o.addScaledVector(to,r.z),o}static isFrontFacing(e,t,i,s){return nn.subVectors(i,t),Tn.subVectors(e,t),nn.cross(Tn).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return nn.subVectors(this.c,this.b),Tn.subVectors(this.a,this.b),nn.cross(Tn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Kt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Kt.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return Kt.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return Kt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Kt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,r=this.c;let o,a;Ui.subVectors(s,i),Ni.subVectors(r,i),Kr.subVectors(e,i);const l=Ui.dot(Kr),c=Ni.dot(Kr);if(l<=0&&c<=0)return t.copy(i);Jr.subVectors(e,s);const u=Ui.dot(Jr),d=Ni.dot(Jr);if(u>=0&&d<=u)return t.copy(s);const h=l*d-u*c;if(h<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(i).addScaledVector(Ui,o);jr.subVectors(e,r);const f=Ui.dot(jr),g=Ni.dot(jr);if(g>=0&&f<=g)return t.copy(r);const _=f*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(i).addScaledVector(Ni,a);const m=u*g-f*d;if(m<=0&&d-u>=0&&f-g>=0)return Sl.subVectors(r,s),a=(d-u)/(d-u+(f-g)),t.copy(s).addScaledVector(Sl,a);const p=1/(m+_+h);return o=_*p,a=h*p,t.copy(i).addScaledVector(Ui,o).addScaledVector(Ni,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Oc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Wn={h:0,s:0,l:0},Ks={h:0,s:0,l:0};function no(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Ue{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Et){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,$e.toWorkingColorSpace(this,t),this}setRGB(e,t,i,s=$e.workingColorSpace){return this.r=e,this.g=t,this.b=i,$e.toWorkingColorSpace(this,s),this}setHSL(e,t,i,s=$e.workingColorSpace){if(e=Pa(e,1),t=At(t,0,1),i=At(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,o=2*i-r;this.r=no(o,r,e+1/3),this.g=no(o,r,e),this.b=no(o,r,e-1/3)}return $e.toWorkingColorSpace(this,s),this}setStyle(e,t=Et){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Et){const i=Oc[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Dn(e.r),this.g=Dn(e.g),this.b=Dn(e.b),this}copyLinearToSRGB(e){return this.r=$i(e.r),this.g=$i(e.g),this.b=$i(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Et){return $e.fromWorkingColorSpace(Lt.copy(this),e),Math.round(At(Lt.r*255,0,255))*65536+Math.round(At(Lt.g*255,0,255))*256+Math.round(At(Lt.b*255,0,255))}getHexString(e=Et){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=$e.workingColorSpace){$e.fromWorkingColorSpace(Lt.copy(this),t);const i=Lt.r,s=Lt.g,r=Lt.b,o=Math.max(i,s,r),a=Math.min(i,s,r);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const d=o-a;switch(c=u<=.5?d/(o+a):d/(2-o-a),o){case i:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-i)/d+2;break;case r:l=(i-s)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=$e.workingColorSpace){return $e.fromWorkingColorSpace(Lt.copy(this),t),e.r=Lt.r,e.g=Lt.g,e.b=Lt.b,e}getStyle(e=Et){$e.fromWorkingColorSpace(Lt.copy(this),e);const t=Lt.r,i=Lt.g,s=Lt.b;return e!==Et?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(Wn),this.setHSL(Wn.h+e,Wn.s+t,Wn.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Wn),e.getHSL(Ks);const i=ws(Wn.h,Ks.h,t),s=ws(Wn.s,Ks.s,t),r=ws(Wn.l,Ks.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Lt=new Ue;Ue.NAMES=Oc;let $d=0;class jn extends ss{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:$d++}),this.uuid=In(),this.name="",this.blending=qi,this.side=Jn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Co,this.blendDst=Po,this.blendEquation=hi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ue(0,0,0),this.blendAlpha=0,this.depthFunc=Ji,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=il,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ti,this.stencilZFail=Ti,this.stencilZPass=Ti,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==qi&&(i.blending=this.blending),this.side!==Jn&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Co&&(i.blendSrc=this.blendSrc),this.blendDst!==Po&&(i.blendDst=this.blendDst),this.blendEquation!==hi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Ji&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==il&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ti&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Ti&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Ti&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(t){const r=s(e.textures),o=s(e.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class qt extends jn{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new Ue(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new vn,this.combine=Sc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const St=new w,Js=new xe;class Rt{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=fa,this.updateRanges=[],this.gpuType=Pn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Js.fromBufferAttribute(this,t),Js.applyMatrix3(e),this.setXY(t,Js.x,Js.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)St.fromBufferAttribute(this,t),St.applyMatrix3(e),this.setXYZ(t,St.x,St.y,St.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)St.fromBufferAttribute(this,t),St.applyMatrix4(e),this.setXYZ(t,St.x,St.y,St.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)St.fromBufferAttribute(this,t),St.applyNormalMatrix(e),this.setXYZ(t,St.x,St.y,St.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)St.fromBufferAttribute(this,t),St.transformDirection(e),this.setXYZ(t,St.x,St.y,St.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=an(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=nt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=an(t,this.array)),t}setX(e,t){return this.normalized&&(t=nt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=an(t,this.array)),t}setY(e,t){return this.normalized&&(t=nt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=an(t,this.array)),t}setZ(e,t){return this.normalized&&(t=nt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=an(t,this.array)),t}setW(e,t){return this.normalized&&(t=nt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=nt(t,this.array),i=nt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=nt(t,this.array),i=nt(i,this.array),s=nt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=nt(t,this.array),i=nt(i,this.array),s=nt(s,this.array),r=nt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==fa&&(e.usage=this.usage),e}}class zc extends Rt{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Bc extends Rt{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class dt extends Rt{constructor(e,t,i){super(new Float32Array(e),t,i)}}let Zd=0;const Zt=new at,io=new yt,Fi=new w,Wt=new Fs,fs=new Fs,Tt=new w;class Mt extends ss{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Zd++}),this.uuid=In(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Uc(e)?Bc:zc)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Ge().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Zt.makeRotationFromQuaternion(e),this.applyMatrix4(Zt),this}rotateX(e){return Zt.makeRotationX(e),this.applyMatrix4(Zt),this}rotateY(e){return Zt.makeRotationY(e),this.applyMatrix4(Zt),this}rotateZ(e){return Zt.makeRotationZ(e),this.applyMatrix4(Zt),this}translate(e,t,i){return Zt.makeTranslation(e,t,i),this.applyMatrix4(Zt),this}scale(e,t,i){return Zt.makeScale(e,t,i),this.applyMatrix4(Zt),this}lookAt(e){return io.lookAt(e),io.updateMatrix(),this.applyMatrix4(io.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Fi).negate(),this.translate(Fi.x,Fi.y,Fi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let s=0,r=e.length;s<r;s++){const o=e[s];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new dt(i,3))}else{for(let i=0,s=t.count;i<s;i++){const r=e[i];t.setXYZ(i,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Fs);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new w(-1/0,-1/0,-1/0),new w(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const r=t[i];Wt.setFromBufferAttribute(r),this.morphTargetsRelative?(Tt.addVectors(this.boundingBox.min,Wt.min),this.boundingBox.expandByPoint(Tt),Tt.addVectors(this.boundingBox.max,Wt.max),this.boundingBox.expandByPoint(Tt)):(this.boundingBox.expandByPoint(Wt.min),this.boundingBox.expandByPoint(Wt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Os);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new w,1/0);return}if(e){const i=this.boundingSphere.center;if(Wt.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];fs.setFromBufferAttribute(a),this.morphTargetsRelative?(Tt.addVectors(Wt.min,fs.min),Wt.expandByPoint(Tt),Tt.addVectors(Wt.max,fs.max),Wt.expandByPoint(Tt)):(Wt.expandByPoint(fs.min),Wt.expandByPoint(fs.max))}Wt.getCenter(i);let s=0;for(let r=0,o=e.count;r<o;r++)Tt.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(Tt));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Tt.fromBufferAttribute(a,c),l&&(Fi.fromBufferAttribute(e,c),Tt.add(Fi)),s=Math.max(s,i.distanceToSquared(Tt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Rt(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let C=0;C<i.count;C++)a[C]=new w,l[C]=new w;const c=new w,u=new w,d=new w,h=new xe,f=new xe,g=new xe,_=new w,m=new w;function p(C,y,S){c.fromBufferAttribute(i,C),u.fromBufferAttribute(i,y),d.fromBufferAttribute(i,S),h.fromBufferAttribute(r,C),f.fromBufferAttribute(r,y),g.fromBufferAttribute(r,S),u.sub(c),d.sub(c),f.sub(h),g.sub(h);const P=1/(f.x*g.y-g.x*f.y);isFinite(P)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(d,-f.y).multiplyScalar(P),m.copy(d).multiplyScalar(f.x).addScaledVector(u,-g.x).multiplyScalar(P),a[C].add(_),a[y].add(_),a[S].add(_),l[C].add(m),l[y].add(m),l[S].add(m))}let b=this.groups;b.length===0&&(b=[{start:0,count:e.count}]);for(let C=0,y=b.length;C<y;++C){const S=b[C],P=S.start,O=S.count;for(let z=P,q=P+O;z<q;z+=3)p(e.getX(z+0),e.getX(z+1),e.getX(z+2))}const x=new w,M=new w,L=new w,A=new w;function R(C){L.fromBufferAttribute(s,C),A.copy(L);const y=a[C];x.copy(y),x.sub(L.multiplyScalar(L.dot(y))).normalize(),M.crossVectors(A,y);const P=M.dot(l[C])<0?-1:1;o.setXYZW(C,x.x,x.y,x.z,P)}for(let C=0,y=b.length;C<y;++C){const S=b[C],P=S.start,O=S.count;for(let z=P,q=P+O;z<q;z+=3)R(e.getX(z+0)),R(e.getX(z+1)),R(e.getX(z+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Rt(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let h=0,f=i.count;h<f;h++)i.setXYZ(h,0,0,0);const s=new w,r=new w,o=new w,a=new w,l=new w,c=new w,u=new w,d=new w;if(e)for(let h=0,f=e.count;h<f;h+=3){const g=e.getX(h+0),_=e.getX(h+1),m=e.getX(h+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),o.fromBufferAttribute(t,m),u.subVectors(o,r),d.subVectors(s,r),u.cross(d),a.fromBufferAttribute(i,g),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,m),a.add(u),l.add(u),c.add(u),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,f=t.count;h<f;h+=3)s.fromBufferAttribute(t,h+0),r.fromBufferAttribute(t,h+1),o.fromBufferAttribute(t,h+2),u.subVectors(o,r),d.subVectors(s,r),u.cross(d),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Tt.fromBufferAttribute(e,t),Tt.normalize(),e.setXYZ(t,Tt.x,Tt.y,Tt.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,d=a.normalized,h=new c.constructor(l.length*u);let f=0,g=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?f=l[_]*a.data.stride+a.offset:f=l[_]*u;for(let p=0;p<u;p++)h[g++]=c[f++]}return new Rt(h,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Mt,i=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=e(l,i);t.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let u=0,d=c.length;u<d;u++){const h=c[u],f=e(h,i);l.push(f)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,h=c.length;d<h;d++){const f=c[d];u.push(f.toJSON(e.data))}u.length>0&&(s[l]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const s=e.attributes;for(const c in s){const u=s[c];this.setAttribute(c,u.clone(t))}const r=e.morphAttributes;for(const c in r){const u=[],d=r[c];for(let h=0,f=d.length;h<f;h++)u.push(d[h].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const yl=new at,ni=new Dr,js=new Os,xl=new w,Qs=new w,er=new w,tr=new w,so=new w,nr=new w,El=new w,ir=new w;class H extends yt{constructor(e=new Mt,t=new qt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const a=this.morphTargetInfluences;if(r&&a){nr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const u=a[l],d=r[l];u!==0&&(so.fromBufferAttribute(d,e),o?nr.addScaledVector(so,u):nr.addScaledVector(so.sub(t),u))}t.add(nr)}return t}raycast(e,t){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),js.copy(i.boundingSphere),js.applyMatrix4(r),ni.copy(e.ray).recast(e.near),!(js.containsPoint(ni.origin)===!1&&(ni.intersectSphere(js,xl)===null||ni.origin.distanceToSquared(xl)>(e.far-e.near)**2))&&(yl.copy(r).invert(),ni.copy(e.ray).applyMatrix4(yl),!(i.boundingBox!==null&&ni.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,ni)))}_computeIntersections(e,t,i){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,d=r.attributes.normal,h=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=h.length;g<_;g++){const m=h[g],p=o[m.materialIndex],b=Math.max(m.start,f.start),x=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let M=b,L=x;M<L;M+=3){const A=a.getX(M),R=a.getX(M+1),C=a.getX(M+2);s=sr(this,p,e,i,c,u,d,A,R,C),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),_=Math.min(a.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const b=a.getX(m),x=a.getX(m+1),M=a.getX(m+2);s=sr(this,o,e,i,c,u,d,b,x,M),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=h.length;g<_;g++){const m=h[g],p=o[m.materialIndex],b=Math.max(m.start,f.start),x=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let M=b,L=x;M<L;M+=3){const A=M,R=M+1,C=M+2;s=sr(this,p,e,i,c,u,d,A,R,C),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const b=m,x=m+1,M=m+2;s=sr(this,o,e,i,c,u,d,b,x,M),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function Kd(n,e,t,i,s,r,o,a){let l;if(e.side===Dt?l=i.intersectTriangle(o,r,s,!0,a):l=i.intersectTriangle(s,r,o,e.side===Jn,a),l===null)return null;ir.copy(a),ir.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(ir);return c<t.near||c>t.far?null:{distance:c,point:ir.clone(),object:n}}function sr(n,e,t,i,s,r,o,a,l,c){n.getVertexPosition(a,Qs),n.getVertexPosition(l,er),n.getVertexPosition(c,tr);const u=Kd(n,e,t,i,Qs,er,tr,El);if(u){const d=new w;Kt.getBarycoord(El,Qs,er,tr,d),s&&(u.uv=Kt.getInterpolatedAttribute(s,a,l,c,d,new xe)),r&&(u.uv1=Kt.getInterpolatedAttribute(r,a,l,c,d,new xe)),o&&(u.normal=Kt.getInterpolatedAttribute(o,a,l,c,d,new w),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const h={a,b:l,c,normal:new w,materialIndex:0};Kt.getNormal(Qs,er,tr,h.normal),u.face=h,u.barycoord=d}return u}class Ne extends Mt{constructor(e=1,t=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],u=[],d=[];let h=0,f=0;g("z","y","x",-1,-1,i,t,e,o,r,0),g("z","y","x",1,-1,i,t,-e,o,r,1),g("x","z","y",1,1,e,i,t,s,o,2),g("x","z","y",1,-1,e,i,-t,s,o,3),g("x","y","z",1,-1,e,t,i,s,r,4),g("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new dt(c,3)),this.setAttribute("normal",new dt(u,3)),this.setAttribute("uv",new dt(d,2));function g(_,m,p,b,x,M,L,A,R,C,y){const S=M/R,P=L/C,O=M/2,z=L/2,q=A/2,$=R+1,W=C+1;let Q=0,V=0;const le=new w;for(let Me=0;Me<W;Me++){const we=Me*P-z;for(let Ve=0;Ve<$;Ve++){const Je=Ve*S-O;le[_]=Je*b,le[m]=we*x,le[p]=q,c.push(le.x,le.y,le.z),le[_]=0,le[m]=0,le[p]=A>0?1:-1,u.push(le.x,le.y,le.z),d.push(Ve/R),d.push(1-Me/C),Q+=1}}for(let Me=0;Me<C;Me++)for(let we=0;we<R;we++){const Ve=h+we+$*Me,Je=h+we+$*(Me+1),X=h+(we+1)+$*(Me+1),se=h+(we+1)+$*Me;l.push(Ve,Je,se),l.push(Je,X,se),V+=6}a.addGroup(f,V,y),f+=V,h+=Q}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ne(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function ns(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone():Array.isArray(s)?e[t][i]=s.slice():e[t][i]=s}}return e}function Nt(n){const e={};for(let t=0;t<n.length;t++){const i=ns(n[t]);for(const s in i)e[s]=i[s]}return e}function Jd(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function kc(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:$e.workingColorSpace}const jd={clone:ns,merge:Nt};var Qd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,eh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Nn extends jn{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Qd,this.fragmentShader=eh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ns(e.uniforms),this.uniformsGroups=Jd(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class Hc extends yt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new at,this.projectionMatrix=new at,this.projectionMatrixInverse=new at,this.coordinateSystem=Ln}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Xn=new w,bl=new xe,wl=new xe;class ut extends Hc{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ls*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(bs*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ls*2*Math.atan(Math.tan(bs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Xn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Xn.x,Xn.y).multiplyScalar(-e/Xn.z),Xn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Xn.x,Xn.y).multiplyScalar(-e/Xn.z)}getViewSize(e,t){return this.getViewBounds(e,bl,wl),t.subVectors(wl,bl)}setViewOffset(e,t,i,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(bs*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,t-=o.offsetY*i/c,s*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Oi=-90,zi=1;class th extends yt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new ut(Oi,zi,e,t);s.layers=this.layers,this.add(s);const r=new ut(Oi,zi,e,t);r.layers=this.layers,this.add(r);const o=new ut(Oi,zi,e,t);o.layers=this.layers,this.add(o);const a=new ut(Oi,zi,e,t);a.layers=this.layers,this.add(a);const l=new ut(Oi,zi,e,t);l.layers=this.layers,this.add(l);const c=new ut(Oi,zi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,r,o,a,l]=t;for(const c of t)this.remove(c);if(e===Ln)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===br)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,u]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,s),e.render(t,r),e.setRenderTarget(i,1,s),e.render(t,o),e.setRenderTarget(i,2,s),e.render(t,a),e.setRenderTarget(i,3,s),e.render(t,l),e.setRenderTarget(i,4,s),e.render(t,c),i.texture.generateMipmaps=_,e.setRenderTarget(i,5,s),e.render(t,u),e.setRenderTarget(d,h,f),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class Gc extends Bt{constructor(e,t,i,s,r,o,a,l,c,u){e=e!==void 0?e:[],t=t!==void 0?t:ji,super(e,t,i,s,r,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class nh extends Si{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new Gc(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:_n}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Ne(5,5,5),r=new Nn({name:"CubemapFromEquirect",uniforms:ns(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Dt,blending:Zn});r.uniforms.tEquirect.value=t;const o=new H(s,r),a=t.minFilter;return t.minFilter===gi&&(t.minFilter=_n),new th(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,i,s){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,s);e.setRenderTarget(r)}}const ro=new w,ih=new w,sh=new Ge;class ui{constructor(e=new w(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=ro.subVectors(i,t).cross(ih.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(ro),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(i,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||sh.getNormalMatrix(e),s=this.coplanarPoint(ro).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ii=new Os,rr=new w;class Ia{constructor(e=new ui,t=new ui,i=new ui,s=new ui,r=new ui,o=new ui){this.planes=[e,t,i,s,r,o]}set(e,t,i,s,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Ln){const i=this.planes,s=e.elements,r=s[0],o=s[1],a=s[2],l=s[3],c=s[4],u=s[5],d=s[6],h=s[7],f=s[8],g=s[9],_=s[10],m=s[11],p=s[12],b=s[13],x=s[14],M=s[15];if(i[0].setComponents(l-r,h-c,m-f,M-p).normalize(),i[1].setComponents(l+r,h+c,m+f,M+p).normalize(),i[2].setComponents(l+o,h+u,m+g,M+b).normalize(),i[3].setComponents(l-o,h-u,m-g,M-b).normalize(),i[4].setComponents(l-a,h-d,m-_,M-x).normalize(),t===Ln)i[5].setComponents(l+a,h+d,m+_,M+x).normalize();else if(t===br)i[5].setComponents(a,d,_,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ii.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ii.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ii)}intersectsSprite(e){return ii.center.set(0,0,0),ii.radius=.7071067811865476,ii.applyMatrix4(e.matrixWorld),this.intersectsSphere(ii)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(rr.x=s.normal.x>0?e.max.x:e.min.x,rr.y=s.normal.y>0?e.max.y:e.min.y,rr.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(rr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Vc(){let n=null,e=!1,t=null,i=null;function s(r,o){t(r,o),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function rh(n){const e=new WeakMap;function t(a,l){const c=a.array,u=a.usage,d=c.byteLength,h=n.createBuffer();n.bindBuffer(l,h),n.bufferData(l,c,u),a.onUploadCallback();let f;if(c instanceof Float32Array)f=n.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=n.HALF_FLOAT:f=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=n.SHORT;else if(c instanceof Uint32Array)f=n.UNSIGNED_INT;else if(c instanceof Int32Array)f=n.INT;else if(c instanceof Int8Array)f=n.BYTE;else if(c instanceof Uint8Array)f=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function i(a,l,c){const u=l.array,d=l.updateRanges;if(n.bindBuffer(c,a),d.length===0)n.bufferSubData(c,0,u);else{d.sort((f,g)=>f.start-g.start);let h=0;for(let f=1;f<d.length;f++){const g=d[h],_=d[f];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++h,d[h]=_)}d.length=h+1;for(let f=0,g=d.length;f<g;f++){const _=d[f];n.bufferSubData(c,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(n.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}class lt extends Mt{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const r=e/2,o=t/2,a=Math.floor(i),l=Math.floor(s),c=a+1,u=l+1,d=e/a,h=t/l,f=[],g=[],_=[],m=[];for(let p=0;p<u;p++){const b=p*h-o;for(let x=0;x<c;x++){const M=x*d-r;g.push(M,-b,0),_.push(0,0,1),m.push(x/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let b=0;b<a;b++){const x=b+c*p,M=b+c*(p+1),L=b+1+c*(p+1),A=b+1+c*p;f.push(x,M,A),f.push(M,L,A)}this.setIndex(f),this.setAttribute("position",new dt(g,3)),this.setAttribute("normal",new dt(_,3)),this.setAttribute("uv",new dt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new lt(e.width,e.height,e.widthSegments,e.heightSegments)}}var oh=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,ah=`#ifdef USE_ALPHAHASH
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
#endif`,lh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ch=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,uh=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,dh=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,hh=`#ifdef USE_AOMAP
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
#endif`,fh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ph=`#ifdef USE_BATCHING
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
#endif`,mh=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,gh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,_h=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,vh=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Mh=`#ifdef USE_IRIDESCENCE
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
#endif`,Sh=`#ifdef USE_BUMPMAP
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
#endif`,yh=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,xh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Eh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,bh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,wh=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Th=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Ah=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Rh=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Ch=`#define PI 3.141592653589793
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
} // validated`,Ph=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Lh=`vec3 transformedNormal = objectNormal;
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
#endif`,Ih=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Dh=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Uh=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Nh=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Fh="gl_FragColor = linearToOutputTexel( gl_FragColor );",Oh=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,zh=`#ifdef USE_ENVMAP
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
#endif`,Bh=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,kh=`#ifdef USE_ENVMAP
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
#endif`,Hh=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Gh=`#ifdef USE_ENVMAP
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
#endif`,Vh=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Wh=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Xh=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,qh=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Yh=`#ifdef USE_GRADIENTMAP
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
}`,$h=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Zh=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Kh=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Jh=`uniform bool receiveShadow;
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
#endif`,jh=`#ifdef USE_ENVMAP
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
#endif`,Qh=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,ef=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,tf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,nf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,sf=`PhysicalMaterial material;
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
#endif`,rf=`struct PhysicalMaterial {
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
}`,of=`
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
#endif`,af=`#if defined( RE_IndirectDiffuse )
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
#endif`,lf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,cf=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,uf=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,df=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,hf=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,ff=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,pf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,mf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,gf=`#if defined( USE_POINTS_UV )
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
#endif`,_f=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,vf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Mf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Sf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,yf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,xf=`#ifdef USE_MORPHTARGETS
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
#endif`,Ef=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,bf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,wf=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Tf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Af=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Rf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Cf=`#ifdef USE_NORMALMAP
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
#endif`,Pf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Lf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,If=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Df=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Uf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Nf=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Ff=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Of=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,zf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Bf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,kf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Hf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Gf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Vf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Wf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Xf=`float getShadowMask() {
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
}`,qf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Yf=`#ifdef USE_SKINNING
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
#endif`,$f=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Zf=`#ifdef USE_SKINNING
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
#endif`,Kf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Jf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,jf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Qf=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,ep=`#ifdef USE_TRANSMISSION
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
#endif`,tp=`#ifdef USE_TRANSMISSION
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
#endif`,np=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ip=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,sp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,rp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const op=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,ap=`uniform sampler2D t2D;
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
}`,lp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cp=`#ifdef ENVMAP_TYPE_CUBE
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
}`,up=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,dp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,hp=`#include <common>
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
}`,fp=`#if DEPTH_PACKING == 3200
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
}`,pp=`#define DISTANCE
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
}`,mp=`#define DISTANCE
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
}`,gp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,_p=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,vp=`uniform float scale;
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
}`,Mp=`uniform vec3 diffuse;
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
}`,Sp=`#include <common>
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
}`,yp=`uniform vec3 diffuse;
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
}`,xp=`#define LAMBERT
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
}`,Ep=`#define LAMBERT
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
}`,bp=`#define MATCAP
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
}`,wp=`#define MATCAP
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
}`,Tp=`#define NORMAL
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
}`,Ap=`#define NORMAL
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
}`,Rp=`#define PHONG
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
}`,Cp=`#define PHONG
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
}`,Pp=`#define STANDARD
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
}`,Lp=`#define STANDARD
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
}`,Ip=`#define TOON
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
}`,Dp=`#define TOON
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
}`,Up=`uniform float size;
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
}`,Np=`uniform vec3 diffuse;
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
}`,Fp=`#include <common>
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
}`,Op=`uniform vec3 color;
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
}`,zp=`uniform float rotation;
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
}`,Bp=`uniform vec3 diffuse;
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
}`,Xe={alphahash_fragment:oh,alphahash_pars_fragment:ah,alphamap_fragment:lh,alphamap_pars_fragment:ch,alphatest_fragment:uh,alphatest_pars_fragment:dh,aomap_fragment:hh,aomap_pars_fragment:fh,batching_pars_vertex:ph,batching_vertex:mh,begin_vertex:gh,beginnormal_vertex:_h,bsdfs:vh,iridescence_fragment:Mh,bumpmap_pars_fragment:Sh,clipping_planes_fragment:yh,clipping_planes_pars_fragment:xh,clipping_planes_pars_vertex:Eh,clipping_planes_vertex:bh,color_fragment:wh,color_pars_fragment:Th,color_pars_vertex:Ah,color_vertex:Rh,common:Ch,cube_uv_reflection_fragment:Ph,defaultnormal_vertex:Lh,displacementmap_pars_vertex:Ih,displacementmap_vertex:Dh,emissivemap_fragment:Uh,emissivemap_pars_fragment:Nh,colorspace_fragment:Fh,colorspace_pars_fragment:Oh,envmap_fragment:zh,envmap_common_pars_fragment:Bh,envmap_pars_fragment:kh,envmap_pars_vertex:Hh,envmap_physical_pars_fragment:jh,envmap_vertex:Gh,fog_vertex:Vh,fog_pars_vertex:Wh,fog_fragment:Xh,fog_pars_fragment:qh,gradientmap_pars_fragment:Yh,lightmap_pars_fragment:$h,lights_lambert_fragment:Zh,lights_lambert_pars_fragment:Kh,lights_pars_begin:Jh,lights_toon_fragment:Qh,lights_toon_pars_fragment:ef,lights_phong_fragment:tf,lights_phong_pars_fragment:nf,lights_physical_fragment:sf,lights_physical_pars_fragment:rf,lights_fragment_begin:of,lights_fragment_maps:af,lights_fragment_end:lf,logdepthbuf_fragment:cf,logdepthbuf_pars_fragment:uf,logdepthbuf_pars_vertex:df,logdepthbuf_vertex:hf,map_fragment:ff,map_pars_fragment:pf,map_particle_fragment:mf,map_particle_pars_fragment:gf,metalnessmap_fragment:_f,metalnessmap_pars_fragment:vf,morphinstance_vertex:Mf,morphcolor_vertex:Sf,morphnormal_vertex:yf,morphtarget_pars_vertex:xf,morphtarget_vertex:Ef,normal_fragment_begin:bf,normal_fragment_maps:wf,normal_pars_fragment:Tf,normal_pars_vertex:Af,normal_vertex:Rf,normalmap_pars_fragment:Cf,clearcoat_normal_fragment_begin:Pf,clearcoat_normal_fragment_maps:Lf,clearcoat_pars_fragment:If,iridescence_pars_fragment:Df,opaque_fragment:Uf,packing:Nf,premultiplied_alpha_fragment:Ff,project_vertex:Of,dithering_fragment:zf,dithering_pars_fragment:Bf,roughnessmap_fragment:kf,roughnessmap_pars_fragment:Hf,shadowmap_pars_fragment:Gf,shadowmap_pars_vertex:Vf,shadowmap_vertex:Wf,shadowmask_pars_fragment:Xf,skinbase_vertex:qf,skinning_pars_vertex:Yf,skinning_vertex:$f,skinnormal_vertex:Zf,specularmap_fragment:Kf,specularmap_pars_fragment:Jf,tonemapping_fragment:jf,tonemapping_pars_fragment:Qf,transmission_fragment:ep,transmission_pars_fragment:tp,uv_pars_fragment:np,uv_pars_vertex:ip,uv_vertex:sp,worldpos_vertex:rp,background_vert:op,background_frag:ap,backgroundCube_vert:lp,backgroundCube_frag:cp,cube_vert:up,cube_frag:dp,depth_vert:hp,depth_frag:fp,distanceRGBA_vert:pp,distanceRGBA_frag:mp,equirect_vert:gp,equirect_frag:_p,linedashed_vert:vp,linedashed_frag:Mp,meshbasic_vert:Sp,meshbasic_frag:yp,meshlambert_vert:xp,meshlambert_frag:Ep,meshmatcap_vert:bp,meshmatcap_frag:wp,meshnormal_vert:Tp,meshnormal_frag:Ap,meshphong_vert:Rp,meshphong_frag:Cp,meshphysical_vert:Pp,meshphysical_frag:Lp,meshtoon_vert:Ip,meshtoon_frag:Dp,points_vert:Up,points_frag:Np,shadow_vert:Fp,shadow_frag:Op,sprite_vert:zp,sprite_frag:Bp},ue={common:{diffuse:{value:new Ue(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ge}},envmap:{envMap:{value:null},envMapRotation:{value:new Ge},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ge}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ge}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ge},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ge},normalScale:{value:new xe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ge},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ge}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ge}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ge}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ue(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ue(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0},uvTransform:{value:new Ge}},sprite:{diffuse:{value:new Ue(16777215)},opacity:{value:1},center:{value:new xe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}}},mn={basic:{uniforms:Nt([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.fog]),vertexShader:Xe.meshbasic_vert,fragmentShader:Xe.meshbasic_frag},lambert:{uniforms:Nt([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,ue.lights,{emissive:{value:new Ue(0)}}]),vertexShader:Xe.meshlambert_vert,fragmentShader:Xe.meshlambert_frag},phong:{uniforms:Nt([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,ue.lights,{emissive:{value:new Ue(0)},specular:{value:new Ue(1118481)},shininess:{value:30}}]),vertexShader:Xe.meshphong_vert,fragmentShader:Xe.meshphong_frag},standard:{uniforms:Nt([ue.common,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.roughnessmap,ue.metalnessmap,ue.fog,ue.lights,{emissive:{value:new Ue(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag},toon:{uniforms:Nt([ue.common,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.gradientmap,ue.fog,ue.lights,{emissive:{value:new Ue(0)}}]),vertexShader:Xe.meshtoon_vert,fragmentShader:Xe.meshtoon_frag},matcap:{uniforms:Nt([ue.common,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,{matcap:{value:null}}]),vertexShader:Xe.meshmatcap_vert,fragmentShader:Xe.meshmatcap_frag},points:{uniforms:Nt([ue.points,ue.fog]),vertexShader:Xe.points_vert,fragmentShader:Xe.points_frag},dashed:{uniforms:Nt([ue.common,ue.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Xe.linedashed_vert,fragmentShader:Xe.linedashed_frag},depth:{uniforms:Nt([ue.common,ue.displacementmap]),vertexShader:Xe.depth_vert,fragmentShader:Xe.depth_frag},normal:{uniforms:Nt([ue.common,ue.bumpmap,ue.normalmap,ue.displacementmap,{opacity:{value:1}}]),vertexShader:Xe.meshnormal_vert,fragmentShader:Xe.meshnormal_frag},sprite:{uniforms:Nt([ue.sprite,ue.fog]),vertexShader:Xe.sprite_vert,fragmentShader:Xe.sprite_frag},background:{uniforms:{uvTransform:{value:new Ge},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Xe.background_vert,fragmentShader:Xe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ge}},vertexShader:Xe.backgroundCube_vert,fragmentShader:Xe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Xe.cube_vert,fragmentShader:Xe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Xe.equirect_vert,fragmentShader:Xe.equirect_frag},distanceRGBA:{uniforms:Nt([ue.common,ue.displacementmap,{referencePosition:{value:new w},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Xe.distanceRGBA_vert,fragmentShader:Xe.distanceRGBA_frag},shadow:{uniforms:Nt([ue.lights,ue.fog,{color:{value:new Ue(0)},opacity:{value:1}}]),vertexShader:Xe.shadow_vert,fragmentShader:Xe.shadow_frag}};mn.physical={uniforms:Nt([mn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ge},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ge},clearcoatNormalScale:{value:new xe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ge},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ge},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ge},sheen:{value:0},sheenColor:{value:new Ue(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ge},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ge},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ge},transmissionSamplerSize:{value:new xe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ge},attenuationDistance:{value:0},attenuationColor:{value:new Ue(0)},specularColor:{value:new Ue(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ge},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ge},anisotropyVector:{value:new xe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ge}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag};const or={r:0,b:0,g:0},si=new vn,kp=new at;function Hp(n,e,t,i,s,r,o){const a=new Ue(0);let l=r===!0?0:1,c,u,d=null,h=0,f=null;function g(b){let x=b.isScene===!0?b.background:null;return x&&x.isTexture&&(x=(b.backgroundBlurriness>0?t:e).get(x)),x}function _(b){let x=!1;const M=g(b);M===null?p(a,l):M&&M.isColor&&(p(M,1),x=!0);const L=n.xr.getEnvironmentBlendMode();L==="additive"?i.buffers.color.setClear(0,0,0,1,o):L==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||x)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(b,x){const M=g(x);M&&(M.isCubeTexture||M.mapping===Lr)?(u===void 0&&(u=new H(new Ne(1,1,1),new Nn({name:"BackgroundCubeMaterial",uniforms:ns(mn.backgroundCube.uniforms),vertexShader:mn.backgroundCube.vertexShader,fragmentShader:mn.backgroundCube.fragmentShader,side:Dt,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(L,A,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),si.copy(x.backgroundRotation),si.x*=-1,si.y*=-1,si.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(si.y*=-1,si.z*=-1),u.material.uniforms.envMap.value=M,u.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(kp.makeRotationFromEuler(si)),u.material.toneMapped=$e.getTransfer(M.colorSpace)!==rt,(d!==M||h!==M.version||f!==n.toneMapping)&&(u.material.needsUpdate=!0,d=M,h=M.version,f=n.toneMapping),u.layers.enableAll(),b.unshift(u,u.geometry,u.material,0,0,null)):M&&M.isTexture&&(c===void 0&&(c=new H(new lt(2,2),new Nn({name:"BackgroundMaterial",uniforms:ns(mn.background.uniforms),vertexShader:mn.background.vertexShader,fragmentShader:mn.background.fragmentShader,side:Jn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=M,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=$e.getTransfer(M.colorSpace)!==rt,M.matrixAutoUpdate===!0&&M.updateMatrix(),c.material.uniforms.uvTransform.value.copy(M.matrix),(d!==M||h!==M.version||f!==n.toneMapping)&&(c.material.needsUpdate=!0,d=M,h=M.version,f=n.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null))}function p(b,x){b.getRGB(or,kc(n)),i.buffers.color.setClear(or.r,or.g,or.b,x,o)}return{getClearColor:function(){return a},setClearColor:function(b,x=1){a.set(b),l=x,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(b){l=b,p(a,l)},render:_,addToRenderList:m}}function Gp(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=h(null);let r=s,o=!1;function a(S,P,O,z,q){let $=!1;const W=d(z,O,P);r!==W&&(r=W,c(r.object)),$=f(S,z,O,q),$&&g(S,z,O,q),q!==null&&e.update(q,n.ELEMENT_ARRAY_BUFFER),($||o)&&(o=!1,M(S,P,O,z),q!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(q).buffer))}function l(){return n.createVertexArray()}function c(S){return n.bindVertexArray(S)}function u(S){return n.deleteVertexArray(S)}function d(S,P,O){const z=O.wireframe===!0;let q=i[S.id];q===void 0&&(q={},i[S.id]=q);let $=q[P.id];$===void 0&&($={},q[P.id]=$);let W=$[z];return W===void 0&&(W=h(l()),$[z]=W),W}function h(S){const P=[],O=[],z=[];for(let q=0;q<t;q++)P[q]=0,O[q]=0,z[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:O,attributeDivisors:z,object:S,attributes:{},index:null}}function f(S,P,O,z){const q=r.attributes,$=P.attributes;let W=0;const Q=O.getAttributes();for(const V in Q)if(Q[V].location>=0){const Me=q[V];let we=$[V];if(we===void 0&&(V==="instanceMatrix"&&S.instanceMatrix&&(we=S.instanceMatrix),V==="instanceColor"&&S.instanceColor&&(we=S.instanceColor)),Me===void 0||Me.attribute!==we||we&&Me.data!==we.data)return!0;W++}return r.attributesNum!==W||r.index!==z}function g(S,P,O,z){const q={},$=P.attributes;let W=0;const Q=O.getAttributes();for(const V in Q)if(Q[V].location>=0){let Me=$[V];Me===void 0&&(V==="instanceMatrix"&&S.instanceMatrix&&(Me=S.instanceMatrix),V==="instanceColor"&&S.instanceColor&&(Me=S.instanceColor));const we={};we.attribute=Me,Me&&Me.data&&(we.data=Me.data),q[V]=we,W++}r.attributes=q,r.attributesNum=W,r.index=z}function _(){const S=r.newAttributes;for(let P=0,O=S.length;P<O;P++)S[P]=0}function m(S){p(S,0)}function p(S,P){const O=r.newAttributes,z=r.enabledAttributes,q=r.attributeDivisors;O[S]=1,z[S]===0&&(n.enableVertexAttribArray(S),z[S]=1),q[S]!==P&&(n.vertexAttribDivisor(S,P),q[S]=P)}function b(){const S=r.newAttributes,P=r.enabledAttributes;for(let O=0,z=P.length;O<z;O++)P[O]!==S[O]&&(n.disableVertexAttribArray(O),P[O]=0)}function x(S,P,O,z,q,$,W){W===!0?n.vertexAttribIPointer(S,P,O,q,$):n.vertexAttribPointer(S,P,O,z,q,$)}function M(S,P,O,z){_();const q=z.attributes,$=O.getAttributes(),W=P.defaultAttributeValues;for(const Q in $){const V=$[Q];if(V.location>=0){let le=q[Q];if(le===void 0&&(Q==="instanceMatrix"&&S.instanceMatrix&&(le=S.instanceMatrix),Q==="instanceColor"&&S.instanceColor&&(le=S.instanceColor)),le!==void 0){const Me=le.normalized,we=le.itemSize,Ve=e.get(le);if(Ve===void 0)continue;const Je=Ve.buffer,X=Ve.type,se=Ve.bytesPerElement,Ee=X===n.INT||X===n.UNSIGNED_INT||le.gpuType===ba;if(le.isInterleavedBufferAttribute){const he=le.data,De=he.stride,Oe=le.offset;if(he.isInstancedInterleavedBuffer){for(let We=0;We<V.locationSize;We++)p(V.location+We,he.meshPerAttribute);S.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=he.meshPerAttribute*he.count)}else for(let We=0;We<V.locationSize;We++)m(V.location+We);n.bindBuffer(n.ARRAY_BUFFER,Je);for(let We=0;We<V.locationSize;We++)x(V.location+We,we/V.locationSize,X,Me,De*se,(Oe+we/V.locationSize*We)*se,Ee)}else{if(le.isInstancedBufferAttribute){for(let he=0;he<V.locationSize;he++)p(V.location+he,le.meshPerAttribute);S.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let he=0;he<V.locationSize;he++)m(V.location+he);n.bindBuffer(n.ARRAY_BUFFER,Je);for(let he=0;he<V.locationSize;he++)x(V.location+he,we/V.locationSize,X,Me,we*se,we/V.locationSize*he*se,Ee)}}else if(W!==void 0){const Me=W[Q];if(Me!==void 0)switch(Me.length){case 2:n.vertexAttrib2fv(V.location,Me);break;case 3:n.vertexAttrib3fv(V.location,Me);break;case 4:n.vertexAttrib4fv(V.location,Me);break;default:n.vertexAttrib1fv(V.location,Me)}}}}b()}function L(){C();for(const S in i){const P=i[S];for(const O in P){const z=P[O];for(const q in z)u(z[q].object),delete z[q];delete P[O]}delete i[S]}}function A(S){if(i[S.id]===void 0)return;const P=i[S.id];for(const O in P){const z=P[O];for(const q in z)u(z[q].object),delete z[q];delete P[O]}delete i[S.id]}function R(S){for(const P in i){const O=i[P];if(O[S.id]===void 0)continue;const z=O[S.id];for(const q in z)u(z[q].object),delete z[q];delete O[S.id]}}function C(){y(),o=!0,r!==s&&(r=s,c(r.object))}function y(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:C,resetDefaultState:y,dispose:L,releaseStatesOfGeometry:A,releaseStatesOfProgram:R,initAttributes:_,enableAttribute:m,disableUnusedAttributes:b}}function Vp(n,e,t){let i;function s(c){i=c}function r(c,u){n.drawArrays(i,c,u),t.update(u,i,1)}function o(c,u,d){d!==0&&(n.drawArraysInstanced(i,c,u,d),t.update(u,i,d))}function a(c,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,d);let f=0;for(let g=0;g<d;g++)f+=u[g];t.update(f,i,1)}function l(c,u,d,h){if(d===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)o(c[g],u[g],h[g]);else{f.multiDrawArraysInstancedWEBGL(i,c,0,u,0,h,0,d);let g=0;for(let _=0;_<d;_++)g+=u[_]*h[_];t.update(g,i,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Wp(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(R){return!(R!==un&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(R){const C=R===Us&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==Un&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==Pn&&!C)}function l(R){if(R==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const d=t.logarithmicDepthBuffer===!0,h=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),b=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),x=n.getParameter(n.MAX_VARYING_VECTORS),M=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),L=g>0,A=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reverseDepthBuffer:h,maxTextures:f,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:b,maxVaryings:x,maxFragmentUniforms:M,vertexTextures:L,maxSamples:A}}function Xp(n){const e=this;let t=null,i=0,s=!1,r=!1;const o=new ui,a=new Ge,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){const f=d.length!==0||h||i!==0||s;return s=h,i=d.length,f},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,h){t=u(d,h,0)},this.setState=function(d,h,f){const g=d.clippingPlanes,_=d.clipIntersection,m=d.clipShadows,p=n.get(d);if(!s||g===null||g.length===0||r&&!m)r?u(null):c();else{const b=r?0:i,x=b*4;let M=p.clippingState||null;l.value=M,M=u(g,h,x,f);for(let L=0;L!==x;++L)M[L]=t[L];p.clippingState=M,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(d,h,f,g){const _=d!==null?d.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const p=f+_*4,b=h.matrixWorldInverse;a.getNormalMatrix(b),(m===null||m.length<p)&&(m=new Float32Array(p));for(let x=0,M=f;x!==_;++x,M+=4)o.copy(d[x]).applyMatrix4(b,a),o.normal.toArray(m,M),m[M+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function qp(n){let e=new WeakMap;function t(o,a){return a===zo?o.mapping=ji:a===Bo&&(o.mapping=Qi),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===zo||a===Bo)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new nh(l.height);return c.fromEquirectangularTexture(n,o),e.set(o,c),o.addEventListener("dispose",s),t(c.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function r(){e=new WeakMap}return{get:i,dispose:r}}class Wc extends Hc{constructor(e=-1,t=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-e,o=i+e,a=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Xi=4,Tl=[.125,.215,.35,.446,.526,.582],fi=20,oo=new Wc,Al=new Ue;let ao=null,lo=0,co=0,uo=!1;const di=(1+Math.sqrt(5))/2,Bi=1/di,Rl=[new w(-di,Bi,0),new w(di,Bi,0),new w(-Bi,0,di),new w(Bi,0,di),new w(0,di,-Bi),new w(0,di,Bi),new w(-1,1,-1),new w(1,1,-1),new w(-1,1,1),new w(1,1,1)];class Cl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,s=100){ao=this._renderer.getRenderTarget(),lo=this._renderer.getActiveCubeFace(),co=this._renderer.getActiveMipmapLevel(),uo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,i,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Il(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ll(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(ao,lo,co),this._renderer.xr.enabled=uo,e.scissorTest=!1,ar(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ji||e.mapping===Qi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ao=this._renderer.getRenderTarget(),lo=this._renderer.getActiveCubeFace(),co=this._renderer.getActiveMipmapLevel(),uo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:_n,minFilter:_n,generateMipmaps:!1,type:Us,format:un,colorSpace:is,depthBuffer:!1},s=Pl(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Pl(e,t,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Yp(r)),this._blurMaterial=$p(r,e,t)}return s}_compileMaterial(e){const t=new H(this._lodPlanes[0],e);this._renderer.compile(t,oo)}_sceneToCubeUV(e,t,i,s){const a=new ut(90,1,t,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,h=u.toneMapping;u.getClearColor(Al),u.toneMapping=Kn,u.autoClear=!1;const f=new qt({name:"PMREM.Background",side:Dt,depthWrite:!1,depthTest:!1}),g=new H(new Ne,f);let _=!1;const m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,_=!0):(f.color.copy(Al),_=!0);for(let p=0;p<6;p++){const b=p%3;b===0?(a.up.set(0,l[p],0),a.lookAt(c[p],0,0)):b===1?(a.up.set(0,0,l[p]),a.lookAt(0,c[p],0)):(a.up.set(0,l[p],0),a.lookAt(0,0,c[p]));const x=this._cubeSize;ar(s,b*x,p>2?x:0,x,x),u.setRenderTarget(s),_&&u.render(g,a),u.render(e,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=h,u.autoClear=d,e.background=m}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===ji||e.mapping===Qi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Il()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ll());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new H(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const l=this._cubeSize;ar(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(o,oo)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Rl[(s-r-1)%Rl.length];this._blur(e,r-1,r,o,a)}t.autoClear=i}_blur(e,t,i,s,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,s,"latitudinal",r),this._halfBlur(o,e,i,i,s,"longitudinal",r)}_halfBlur(e,t,i,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,d=new H(this._lodPlanes[s],c),h=c.uniforms,f=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*fi-1),_=r/g,m=isFinite(r)?1+Math.floor(u*_):fi;m>fi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${fi}`);const p=[];let b=0;for(let R=0;R<fi;++R){const C=R/_,y=Math.exp(-C*C/2);p.push(y),R===0?b+=y:R<m&&(b+=2*y)}for(let R=0;R<p.length;R++)p[R]=p[R]/b;h.envMap.value=e.texture,h.samples.value=m,h.weights.value=p,h.latitudinal.value=o==="latitudinal",a&&(h.poleAxis.value=a);const{_lodMax:x}=this;h.dTheta.value=g,h.mipInt.value=x-i;const M=this._sizeLods[s],L=3*M*(s>x-Xi?s-x+Xi:0),A=4*(this._cubeSize-M);ar(t,L,A,3*M,2*M),l.setRenderTarget(t),l.render(d,oo)}}function Yp(n){const e=[],t=[],i=[];let s=n;const r=n-Xi+1+Tl.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);t.push(a);let l=1/a;o>n-Xi?l=Tl[o-n+Xi-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),u=-c,d=1+c,h=[u,u,d,u,d,d,u,u,d,d,u,d],f=6,g=6,_=3,m=2,p=1,b=new Float32Array(_*g*f),x=new Float32Array(m*g*f),M=new Float32Array(p*g*f);for(let A=0;A<f;A++){const R=A%3*2/3-1,C=A>2?0:-1,y=[R,C,0,R+2/3,C,0,R+2/3,C+1,0,R,C,0,R+2/3,C+1,0,R,C+1,0];b.set(y,_*g*A),x.set(h,m*g*A);const S=[A,A,A,A,A,A];M.set(S,p*g*A)}const L=new Mt;L.setAttribute("position",new Rt(b,_)),L.setAttribute("uv",new Rt(x,m)),L.setAttribute("faceIndex",new Rt(M,p)),e.push(L),s>Xi&&s--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function Pl(n,e,t){const i=new Si(n,e,t);return i.texture.mapping=Lr,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ar(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function $p(n,e,t){const i=new Float32Array(fi),s=new w(0,1,0);return new Nn({name:"SphericalGaussianBlur",defines:{n:fi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Da(),fragmentShader:`

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
		`,blending:Zn,depthTest:!1,depthWrite:!1})}function Ll(){return new Nn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Da(),fragmentShader:`

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
		`,blending:Zn,depthTest:!1,depthWrite:!1})}function Il(){return new Nn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Da(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Zn,depthTest:!1,depthWrite:!1})}function Da(){return`

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
	`}function Zp(n){let e=new WeakMap,t=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===zo||l===Bo,u=l===ji||l===Qi;if(c||u){let d=e.get(a);const h=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==h)return t===null&&(t=new Cl(n)),d=c?t.fromEquirectangular(a,d):t.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),d.texture;if(d!==void 0)return d.texture;{const f=a.image;return c&&f&&f.height>0||u&&f&&s(f)?(t===null&&(t=new Cl(n)),d=c?t.fromEquirectangular(a):t.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),a.addEventListener("dispose",r),d.texture):null}}}return a}function s(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:o}}function Kp(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const s=t(i);return s===null&&Ss("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function Jp(n,e,t,i){const s={},r=new WeakMap;function o(d){const h=d.target;h.index!==null&&e.remove(h.index);for(const g in h.attributes)e.remove(h.attributes[g]);for(const g in h.morphAttributes){const _=h.morphAttributes[g];for(let m=0,p=_.length;m<p;m++)e.remove(_[m])}h.removeEventListener("dispose",o),delete s[h.id];const f=r.get(h);f&&(e.remove(f),r.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function a(d,h){return s[h.id]===!0||(h.addEventListener("dispose",o),s[h.id]=!0,t.memory.geometries++),h}function l(d){const h=d.attributes;for(const g in h)e.update(h[g],n.ARRAY_BUFFER);const f=d.morphAttributes;for(const g in f){const _=f[g];for(let m=0,p=_.length;m<p;m++)e.update(_[m],n.ARRAY_BUFFER)}}function c(d){const h=[],f=d.index,g=d.attributes.position;let _=0;if(f!==null){const b=f.array;_=f.version;for(let x=0,M=b.length;x<M;x+=3){const L=b[x+0],A=b[x+1],R=b[x+2];h.push(L,A,A,R,R,L)}}else if(g!==void 0){const b=g.array;_=g.version;for(let x=0,M=b.length/3-1;x<M;x+=3){const L=x+0,A=x+1,R=x+2;h.push(L,A,A,R,R,L)}}else return;const m=new(Uc(h)?Bc:zc)(h,1);m.version=_;const p=r.get(d);p&&e.remove(p),r.set(d,m)}function u(d){const h=r.get(d);if(h){const f=d.index;f!==null&&h.version<f.version&&c(d)}else c(d);return r.get(d)}return{get:a,update:l,getWireframeAttribute:u}}function jp(n,e,t){let i;function s(h){i=h}let r,o;function a(h){r=h.type,o=h.bytesPerElement}function l(h,f){n.drawElements(i,f,r,h*o),t.update(f,i,1)}function c(h,f,g){g!==0&&(n.drawElementsInstanced(i,f,r,h*o,g),t.update(f,i,g))}function u(h,f,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,r,h,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];t.update(m,i,1)}function d(h,f,g,_){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<h.length;p++)c(h[p]/o,f[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(i,f,0,r,h,0,_,0,g);let p=0;for(let b=0;b<g;b++)p+=f[b]*_[b];t.update(p,i,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function Qp(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(r/3);break;case n.LINES:t.lines+=a*(r/2);break;case n.LINE_STRIP:t.lines+=a*(r-1);break;case n.LINE_LOOP:t.lines+=a*r;break;case n.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function em(n,e,t){const i=new WeakMap,s=new ot;function r(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0;let h=i.get(a);if(h===void 0||h.count!==d){let S=function(){C.dispose(),i.delete(a),a.removeEventListener("dispose",S)};var f=S;h!==void 0&&h.texture.dispose();const g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],b=a.morphAttributes.normal||[],x=a.morphAttributes.color||[];let M=0;g===!0&&(M=1),_===!0&&(M=2),m===!0&&(M=3);let L=a.attributes.position.count*M,A=1;L>e.maxTextureSize&&(A=Math.ceil(L/e.maxTextureSize),L=e.maxTextureSize);const R=new Float32Array(L*A*4*d),C=new Fc(R,L,A,d);C.type=Pn,C.needsUpdate=!0;const y=M*4;for(let P=0;P<d;P++){const O=p[P],z=b[P],q=x[P],$=L*A*4*P;for(let W=0;W<O.count;W++){const Q=W*y;g===!0&&(s.fromBufferAttribute(O,W),R[$+Q+0]=s.x,R[$+Q+1]=s.y,R[$+Q+2]=s.z,R[$+Q+3]=0),_===!0&&(s.fromBufferAttribute(z,W),R[$+Q+4]=s.x,R[$+Q+5]=s.y,R[$+Q+6]=s.z,R[$+Q+7]=0),m===!0&&(s.fromBufferAttribute(q,W),R[$+Q+8]=s.x,R[$+Q+9]=s.y,R[$+Q+10]=s.z,R[$+Q+11]=q.itemSize===4?s.w:1)}}h={count:d,texture:C,size:new xe(L,A)},i.set(a,h),a.addEventListener("dispose",S)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const _=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(n,"morphTargetBaseInfluence",_),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:r}}function tm(n,e,t,i){let s=new WeakMap;function r(l){const c=i.render.frame,u=l.geometry,d=e.get(l,u);if(s.get(d)!==c&&(e.update(d),s.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const h=l.skeleton;s.get(h)!==c&&(h.update(),s.set(h,c))}return d}function o(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:o}}class Xc extends Bt{constructor(e,t,i,s,r,o,a,l,c,u=Yi){if(u!==Yi&&u!==ts)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===Yi&&(i=Mi),i===void 0&&u===ts&&(i=es),super(null,s,r,o,a,l,u,i,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:hn,this.minFilter=l!==void 0?l:hn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const qc=new Bt,Dl=new Xc(1,1),Yc=new Fc,$c=new kd,Zc=new Gc,Ul=[],Nl=[],Fl=new Float32Array(16),Ol=new Float32Array(9),zl=new Float32Array(4);function rs(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let r=Ul[s];if(r===void 0&&(r=new Float32Array(s),Ul[s]=r),e!==0){i.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(r,a)}return r}function bt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function wt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Ur(n,e){let t=Nl[e];t===void 0&&(t=new Int32Array(e),Nl[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function nm(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function im(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(bt(t,e))return;n.uniform2fv(this.addr,e),wt(t,e)}}function sm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(bt(t,e))return;n.uniform3fv(this.addr,e),wt(t,e)}}function rm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(bt(t,e))return;n.uniform4fv(this.addr,e),wt(t,e)}}function om(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(bt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),wt(t,e)}else{if(bt(t,i))return;zl.set(i),n.uniformMatrix2fv(this.addr,!1,zl),wt(t,i)}}function am(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(bt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),wt(t,e)}else{if(bt(t,i))return;Ol.set(i),n.uniformMatrix3fv(this.addr,!1,Ol),wt(t,i)}}function lm(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(bt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),wt(t,e)}else{if(bt(t,i))return;Fl.set(i),n.uniformMatrix4fv(this.addr,!1,Fl),wt(t,i)}}function cm(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function um(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(bt(t,e))return;n.uniform2iv(this.addr,e),wt(t,e)}}function dm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(bt(t,e))return;n.uniform3iv(this.addr,e),wt(t,e)}}function hm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(bt(t,e))return;n.uniform4iv(this.addr,e),wt(t,e)}}function fm(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function pm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(bt(t,e))return;n.uniform2uiv(this.addr,e),wt(t,e)}}function mm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(bt(t,e))return;n.uniform3uiv(this.addr,e),wt(t,e)}}function gm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(bt(t,e))return;n.uniform4uiv(this.addr,e),wt(t,e)}}function _m(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Dl.compareFunction=Dc,r=Dl):r=qc,t.setTexture2D(e||r,s)}function vm(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||$c,s)}function Mm(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||Zc,s)}function Sm(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||Yc,s)}function ym(n){switch(n){case 5126:return nm;case 35664:return im;case 35665:return sm;case 35666:return rm;case 35674:return om;case 35675:return am;case 35676:return lm;case 5124:case 35670:return cm;case 35667:case 35671:return um;case 35668:case 35672:return dm;case 35669:case 35673:return hm;case 5125:return fm;case 36294:return pm;case 36295:return mm;case 36296:return gm;case 35678:case 36198:case 36298:case 36306:case 35682:return _m;case 35679:case 36299:case 36307:return vm;case 35680:case 36300:case 36308:case 36293:return Mm;case 36289:case 36303:case 36311:case 36292:return Sm}}function xm(n,e){n.uniform1fv(this.addr,e)}function Em(n,e){const t=rs(e,this.size,2);n.uniform2fv(this.addr,t)}function bm(n,e){const t=rs(e,this.size,3);n.uniform3fv(this.addr,t)}function wm(n,e){const t=rs(e,this.size,4);n.uniform4fv(this.addr,t)}function Tm(n,e){const t=rs(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function Am(n,e){const t=rs(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function Rm(n,e){const t=rs(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function Cm(n,e){n.uniform1iv(this.addr,e)}function Pm(n,e){n.uniform2iv(this.addr,e)}function Lm(n,e){n.uniform3iv(this.addr,e)}function Im(n,e){n.uniform4iv(this.addr,e)}function Dm(n,e){n.uniform1uiv(this.addr,e)}function Um(n,e){n.uniform2uiv(this.addr,e)}function Nm(n,e){n.uniform3uiv(this.addr,e)}function Fm(n,e){n.uniform4uiv(this.addr,e)}function Om(n,e,t){const i=this.cache,s=e.length,r=Ur(t,s);bt(i,r)||(n.uniform1iv(this.addr,r),wt(i,r));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||qc,r[o])}function zm(n,e,t){const i=this.cache,s=e.length,r=Ur(t,s);bt(i,r)||(n.uniform1iv(this.addr,r),wt(i,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||$c,r[o])}function Bm(n,e,t){const i=this.cache,s=e.length,r=Ur(t,s);bt(i,r)||(n.uniform1iv(this.addr,r),wt(i,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||Zc,r[o])}function km(n,e,t){const i=this.cache,s=e.length,r=Ur(t,s);bt(i,r)||(n.uniform1iv(this.addr,r),wt(i,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||Yc,r[o])}function Hm(n){switch(n){case 5126:return xm;case 35664:return Em;case 35665:return bm;case 35666:return wm;case 35674:return Tm;case 35675:return Am;case 35676:return Rm;case 5124:case 35670:return Cm;case 35667:case 35671:return Pm;case 35668:case 35672:return Lm;case 35669:case 35673:return Im;case 5125:return Dm;case 36294:return Um;case 36295:return Nm;case 36296:return Fm;case 35678:case 36198:case 36298:case 36306:case 35682:return Om;case 35679:case 36299:case 36307:return zm;case 35680:case 36300:case 36308:case 36293:return Bm;case 36289:case 36303:case 36311:case 36292:return km}}class Gm{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=ym(t.type)}}class Vm{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Hm(t.type)}}class Wm{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(e,t[a.id],i)}}}const ho=/(\w+)(\])?(\[|\.)?/g;function Bl(n,e){n.seq.push(e),n.map[e.id]=e}function Xm(n,e,t){const i=n.name,s=i.length;for(ho.lastIndex=0;;){const r=ho.exec(i),o=ho.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){Bl(t,c===void 0?new Gm(a,n,e):new Vm(a,n,e));break}else{let d=t.map[a];d===void 0&&(d=new Wm(a),Bl(t,d)),t=d}}}class xr{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const r=e.getActiveUniform(t,s),o=e.getUniformLocation(t,r.name);Xm(r,o,this)}}setValue(e,t,i,s){const r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,o=t.length;r!==o;++r){const a=t[r],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,r=e.length;s!==r;++s){const o=e[s];o.id in t&&i.push(o)}return i}}function kl(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const qm=37297;let Ym=0;function $m(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}const Hl=new Ge;function Zm(n){$e._getMatrix(Hl,$e.workingColorSpace,n);const e=`mat3( ${Hl.elements.map(t=>t.toFixed(4))} )`;switch($e.getTransfer(n)){case Ir:return[e,"LinearTransferOETF"];case rt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Gl(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=n.getShaderInfoLog(e).trim();if(i&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+$m(n.getShaderSource(e),o)}else return s}function Km(n,e){const t=Zm(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Jm(n,e){let t;switch(e){case Qu:t="Linear";break;case ed:t="Reinhard";break;case td:t="Cineon";break;case Ea:t="ACESFilmic";break;case id:t="AgX";break;case sd:t="Neutral";break;case nd:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const lr=new w;function jm(){$e.getLuminanceCoefficients(lr);const n=lr.x.toFixed(4),e=lr.y.toFixed(4),t=lr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Qm(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ys).join(`
`)}function e0(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function t0(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(e,s),o=r.name;let a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function ys(n){return n!==""}function Vl(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Wl(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const n0=/^[ \t]*#include +<([\w\d./]+)>/gm;function pa(n){return n.replace(n0,s0)}const i0=new Map;function s0(n,e){let t=Xe[e];if(t===void 0){const i=i0.get(e);if(i!==void 0)t=Xe[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return pa(t)}const r0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Xl(n){return n.replace(r0,o0)}function o0(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function ql(n){let e=`precision ${n.precision} float;
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
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function a0(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Mc?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===xa?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Rn&&(e="SHADOWMAP_TYPE_VSM"),e}function l0(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case ji:case Qi:e="ENVMAP_TYPE_CUBE";break;case Lr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function c0(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Qi:e="ENVMAP_MODE_REFRACTION";break}return e}function u0(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Sc:e="ENVMAP_BLENDING_MULTIPLY";break;case Ju:e="ENVMAP_BLENDING_MIX";break;case ju:e="ENVMAP_BLENDING_ADD";break}return e}function d0(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function h0(n,e,t,i){const s=n.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=a0(t),c=l0(t),u=c0(t),d=u0(t),h=d0(t),f=Qm(t),g=e0(r),_=s.createProgram();let m,p,b=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(ys).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(ys).join(`
`),p.length>0&&(p+=`
`)):(m=[ql(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ys).join(`
`),p=[ql(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Kn?"#define TONE_MAPPING":"",t.toneMapping!==Kn?Xe.tonemapping_pars_fragment:"",t.toneMapping!==Kn?Jm("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Xe.colorspace_pars_fragment,Km("linearToOutputTexel",t.outputColorSpace),jm(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ys).join(`
`)),o=pa(o),o=Vl(o,t),o=Wl(o,t),a=pa(a),a=Vl(a,t),a=Wl(a,t),o=Xl(o),a=Xl(a),t.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===sl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===sl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const x=b+m+o,M=b+p+a,L=kl(s,s.VERTEX_SHADER,x),A=kl(s,s.FRAGMENT_SHADER,M);s.attachShader(_,L),s.attachShader(_,A),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function R(P){if(n.debug.checkShaderErrors){const O=s.getProgramInfoLog(_).trim(),z=s.getShaderInfoLog(L).trim(),q=s.getShaderInfoLog(A).trim();let $=!0,W=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if($=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,_,L,A);else{const Q=Gl(s,L,"vertex"),V=Gl(s,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+O+`
`+Q+`
`+V)}else O!==""?console.warn("THREE.WebGLProgram: Program Info Log:",O):(z===""||q==="")&&(W=!1);W&&(P.diagnostics={runnable:$,programLog:O,vertexShader:{log:z,prefix:m},fragmentShader:{log:q,prefix:p}})}s.deleteShader(L),s.deleteShader(A),C=new xr(s,_),y=t0(s,_)}let C;this.getUniforms=function(){return C===void 0&&R(this),C};let y;this.getAttributes=function(){return y===void 0&&R(this),y};let S=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=s.getProgramParameter(_,qm)),S},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Ym++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=L,this.fragmentShader=A,this}let f0=0;class p0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new m0(e),t.set(e,i)),i}}class m0{constructor(e){this.id=f0++,this.code=e,this.usedTimes=0}}function g0(n,e,t,i,s,r,o){const a=new La,l=new p0,c=new Set,u=[],d=s.logarithmicDepthBuffer,h=s.vertexTextures;let f=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(y){return c.add(y),y===0?"uv":`uv${y}`}function m(y,S,P,O,z){const q=O.fog,$=z.geometry,W=y.isMeshStandardMaterial?O.environment:null,Q=(y.isMeshStandardMaterial?t:e).get(y.envMap||W),V=Q&&Q.mapping===Lr?Q.image.height:null,le=g[y.type];y.precision!==null&&(f=s.getMaxPrecision(y.precision),f!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",f,"instead."));const Me=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,we=Me!==void 0?Me.length:0;let Ve=0;$.morphAttributes.position!==void 0&&(Ve=1),$.morphAttributes.normal!==void 0&&(Ve=2),$.morphAttributes.color!==void 0&&(Ve=3);let Je,X,se,Ee;if(le){const tt=mn[le];Je=tt.vertexShader,X=tt.fragmentShader}else Je=y.vertexShader,X=y.fragmentShader,l.update(y),se=l.getVertexShaderID(y),Ee=l.getFragmentShaderID(y);const he=n.getRenderTarget(),De=n.state.buffers.depth.getReversed(),Oe=z.isInstancedMesh===!0,We=z.isBatchedMesh===!0,ft=!!y.map,Ye=!!y.matcap,_t=!!Q,N=!!y.aoMap,ae=!!y.lightMap,te=!!y.bumpMap,oe=!!y.normalMap,ne=!!y.displacementMap,ye=!!y.emissiveMap,_e=!!y.metalnessMap,T=!!y.roughnessMap,v=y.anisotropy>0,F=y.clearcoat>0,Z=y.dispersion>0,ee=y.iridescence>0,Y=y.sheen>0,Te=y.transmission>0,de=v&&!!y.anisotropyMap,Se=F&&!!y.clearcoatMap,K=F&&!!y.clearcoatNormalMap,J=F&&!!y.clearcoatRoughnessMap,fe=ee&&!!y.iridescenceMap,Ae=ee&&!!y.iridescenceThicknessMap,Le=Y&&!!y.sheenColorMap,ve=Y&&!!y.sheenRoughnessMap,qe=!!y.specularMap,Be=!!y.specularColorMap,je=!!y.specularIntensityMap,I=Te&&!!y.transmissionMap,ce=Te&&!!y.thicknessMap,G=!!y.gradientMap,j=!!y.alphaMap,pe=y.alphaTest>0,me=!!y.alphaHash,ke=!!y.extensions;let vt=Kn;y.toneMapped&&(he===null||he.isXRRenderTarget===!0)&&(vt=n.toneMapping);const Ct={shaderID:le,shaderType:y.type,shaderName:y.name,vertexShader:Je,fragmentShader:X,defines:y.defines,customVertexShaderID:se,customFragmentShaderID:Ee,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:f,batching:We,batchingColor:We&&z._colorsTexture!==null,instancing:Oe,instancingColor:Oe&&z.instanceColor!==null,instancingMorph:Oe&&z.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:he===null?n.outputColorSpace:he.isXRRenderTarget===!0?he.texture.colorSpace:is,alphaToCoverage:!!y.alphaToCoverage,map:ft,matcap:Ye,envMap:_t,envMapMode:_t&&Q.mapping,envMapCubeUVHeight:V,aoMap:N,lightMap:ae,bumpMap:te,normalMap:oe,displacementMap:h&&ne,emissiveMap:ye,normalMapObjectSpace:oe&&y.normalMapType===ld,normalMapTangentSpace:oe&&y.normalMapType===Ic,metalnessMap:_e,roughnessMap:T,anisotropy:v,anisotropyMap:de,clearcoat:F,clearcoatMap:Se,clearcoatNormalMap:K,clearcoatRoughnessMap:J,dispersion:Z,iridescence:ee,iridescenceMap:fe,iridescenceThicknessMap:Ae,sheen:Y,sheenColorMap:Le,sheenRoughnessMap:ve,specularMap:qe,specularColorMap:Be,specularIntensityMap:je,transmission:Te,transmissionMap:I,thicknessMap:ce,gradientMap:G,opaque:y.transparent===!1&&y.blending===qi&&y.alphaToCoverage===!1,alphaMap:j,alphaTest:pe,alphaHash:me,combine:y.combine,mapUv:ft&&_(y.map.channel),aoMapUv:N&&_(y.aoMap.channel),lightMapUv:ae&&_(y.lightMap.channel),bumpMapUv:te&&_(y.bumpMap.channel),normalMapUv:oe&&_(y.normalMap.channel),displacementMapUv:ne&&_(y.displacementMap.channel),emissiveMapUv:ye&&_(y.emissiveMap.channel),metalnessMapUv:_e&&_(y.metalnessMap.channel),roughnessMapUv:T&&_(y.roughnessMap.channel),anisotropyMapUv:de&&_(y.anisotropyMap.channel),clearcoatMapUv:Se&&_(y.clearcoatMap.channel),clearcoatNormalMapUv:K&&_(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:J&&_(y.clearcoatRoughnessMap.channel),iridescenceMapUv:fe&&_(y.iridescenceMap.channel),iridescenceThicknessMapUv:Ae&&_(y.iridescenceThicknessMap.channel),sheenColorMapUv:Le&&_(y.sheenColorMap.channel),sheenRoughnessMapUv:ve&&_(y.sheenRoughnessMap.channel),specularMapUv:qe&&_(y.specularMap.channel),specularColorMapUv:Be&&_(y.specularColorMap.channel),specularIntensityMapUv:je&&_(y.specularIntensityMap.channel),transmissionMapUv:I&&_(y.transmissionMap.channel),thicknessMapUv:ce&&_(y.thicknessMap.channel),alphaMapUv:j&&_(y.alphaMap.channel),vertexTangents:!!$.attributes.tangent&&(oe||v),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!$.attributes.uv&&(ft||j),fog:!!q,useFog:y.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:De,skinning:z.isSkinnedMesh===!0,morphTargets:$.morphAttributes.position!==void 0,morphNormals:$.morphAttributes.normal!==void 0,morphColors:$.morphAttributes.color!==void 0,morphTargetsCount:we,morphTextureStride:Ve,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:y.dithering,shadowMapEnabled:n.shadowMap.enabled&&P.length>0,shadowMapType:n.shadowMap.type,toneMapping:vt,decodeVideoTexture:ft&&y.map.isVideoTexture===!0&&$e.getTransfer(y.map.colorSpace)===rt,decodeVideoTextureEmissive:ye&&y.emissiveMap.isVideoTexture===!0&&$e.getTransfer(y.emissiveMap.colorSpace)===rt,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===on,flipSided:y.side===Dt,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:ke&&y.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ke&&y.extensions.multiDraw===!0||We)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Ct.vertexUv1s=c.has(1),Ct.vertexUv2s=c.has(2),Ct.vertexUv3s=c.has(3),c.clear(),Ct}function p(y){const S=[];if(y.shaderID?S.push(y.shaderID):(S.push(y.customVertexShaderID),S.push(y.customFragmentShaderID)),y.defines!==void 0)for(const P in y.defines)S.push(P),S.push(y.defines[P]);return y.isRawShaderMaterial===!1&&(b(S,y),x(S,y),S.push(n.outputColorSpace)),S.push(y.customProgramCacheKey),S.join()}function b(y,S){y.push(S.precision),y.push(S.outputColorSpace),y.push(S.envMapMode),y.push(S.envMapCubeUVHeight),y.push(S.mapUv),y.push(S.alphaMapUv),y.push(S.lightMapUv),y.push(S.aoMapUv),y.push(S.bumpMapUv),y.push(S.normalMapUv),y.push(S.displacementMapUv),y.push(S.emissiveMapUv),y.push(S.metalnessMapUv),y.push(S.roughnessMapUv),y.push(S.anisotropyMapUv),y.push(S.clearcoatMapUv),y.push(S.clearcoatNormalMapUv),y.push(S.clearcoatRoughnessMapUv),y.push(S.iridescenceMapUv),y.push(S.iridescenceThicknessMapUv),y.push(S.sheenColorMapUv),y.push(S.sheenRoughnessMapUv),y.push(S.specularMapUv),y.push(S.specularColorMapUv),y.push(S.specularIntensityMapUv),y.push(S.transmissionMapUv),y.push(S.thicknessMapUv),y.push(S.combine),y.push(S.fogExp2),y.push(S.sizeAttenuation),y.push(S.morphTargetsCount),y.push(S.morphAttributeCount),y.push(S.numDirLights),y.push(S.numPointLights),y.push(S.numSpotLights),y.push(S.numSpotLightMaps),y.push(S.numHemiLights),y.push(S.numRectAreaLights),y.push(S.numDirLightShadows),y.push(S.numPointLightShadows),y.push(S.numSpotLightShadows),y.push(S.numSpotLightShadowsWithMaps),y.push(S.numLightProbes),y.push(S.shadowMapType),y.push(S.toneMapping),y.push(S.numClippingPlanes),y.push(S.numClipIntersection),y.push(S.depthPacking)}function x(y,S){a.disableAll(),S.supportsVertexTextures&&a.enable(0),S.instancing&&a.enable(1),S.instancingColor&&a.enable(2),S.instancingMorph&&a.enable(3),S.matcap&&a.enable(4),S.envMap&&a.enable(5),S.normalMapObjectSpace&&a.enable(6),S.normalMapTangentSpace&&a.enable(7),S.clearcoat&&a.enable(8),S.iridescence&&a.enable(9),S.alphaTest&&a.enable(10),S.vertexColors&&a.enable(11),S.vertexAlphas&&a.enable(12),S.vertexUv1s&&a.enable(13),S.vertexUv2s&&a.enable(14),S.vertexUv3s&&a.enable(15),S.vertexTangents&&a.enable(16),S.anisotropy&&a.enable(17),S.alphaHash&&a.enable(18),S.batching&&a.enable(19),S.dispersion&&a.enable(20),S.batchingColor&&a.enable(21),y.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reverseDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),y.push(a.mask)}function M(y){const S=g[y.type];let P;if(S){const O=mn[S];P=jd.clone(O.uniforms)}else P=y.uniforms;return P}function L(y,S){let P;for(let O=0,z=u.length;O<z;O++){const q=u[O];if(q.cacheKey===S){P=q,++P.usedTimes;break}}return P===void 0&&(P=new h0(n,S,y,r),u.push(P)),P}function A(y){if(--y.usedTimes===0){const S=u.indexOf(y);u[S]=u[u.length-1],u.pop(),y.destroy()}}function R(y){l.remove(y)}function C(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:M,acquireProgram:L,releaseProgram:A,releaseShaderCache:R,programs:u,dispose:C}}function _0(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function s(o,a,l){n.get(o)[a]=l}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function v0(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function Yl(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function $l(){const n=[];let e=0;const t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function o(d,h,f,g,_,m){let p=n[e];return p===void 0?(p={id:d.id,object:d,geometry:h,material:f,groupOrder:g,renderOrder:d.renderOrder,z:_,group:m},n[e]=p):(p.id=d.id,p.object=d,p.geometry=h,p.material=f,p.groupOrder=g,p.renderOrder=d.renderOrder,p.z=_,p.group=m),e++,p}function a(d,h,f,g,_,m){const p=o(d,h,f,g,_,m);f.transmission>0?i.push(p):f.transparent===!0?s.push(p):t.push(p)}function l(d,h,f,g,_,m){const p=o(d,h,f,g,_,m);f.transmission>0?i.unshift(p):f.transparent===!0?s.unshift(p):t.unshift(p)}function c(d,h){t.length>1&&t.sort(d||v0),i.length>1&&i.sort(h||Yl),s.length>1&&s.sort(h||Yl)}function u(){for(let d=e,h=n.length;d<h;d++){const f=n[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:a,unshift:l,finish:u,sort:c}}function M0(){let n=new WeakMap;function e(i,s){const r=n.get(i);let o;return r===void 0?(o=new $l,n.set(i,[o])):s>=r.length?(o=new $l,r.push(o)):o=r[s],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function S0(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new w,color:new Ue};break;case"SpotLight":t={position:new w,direction:new w,color:new Ue,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new w,color:new Ue,distance:0,decay:0};break;case"HemisphereLight":t={direction:new w,skyColor:new Ue,groundColor:new Ue};break;case"RectAreaLight":t={color:new Ue,position:new w,halfWidth:new w,halfHeight:new w};break}return n[e.id]=t,t}}}function y0(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xe,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let x0=0;function E0(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function b0(n){const e=new S0,t=y0(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new w);const s=new w,r=new at,o=new at;function a(c){let u=0,d=0,h=0;for(let y=0;y<9;y++)i.probe[y].set(0,0,0);let f=0,g=0,_=0,m=0,p=0,b=0,x=0,M=0,L=0,A=0,R=0;c.sort(E0);for(let y=0,S=c.length;y<S;y++){const P=c[y],O=P.color,z=P.intensity,q=P.distance,$=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)u+=O.r*z,d+=O.g*z,h+=O.b*z;else if(P.isLightProbe){for(let W=0;W<9;W++)i.probe[W].addScaledVector(P.sh.coefficients[W],z);R++}else if(P.isDirectionalLight){const W=e.get(P);if(W.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const Q=P.shadow,V=t.get(P);V.shadowIntensity=Q.intensity,V.shadowBias=Q.bias,V.shadowNormalBias=Q.normalBias,V.shadowRadius=Q.radius,V.shadowMapSize=Q.mapSize,i.directionalShadow[f]=V,i.directionalShadowMap[f]=$,i.directionalShadowMatrix[f]=P.shadow.matrix,b++}i.directional[f]=W,f++}else if(P.isSpotLight){const W=e.get(P);W.position.setFromMatrixPosition(P.matrixWorld),W.color.copy(O).multiplyScalar(z),W.distance=q,W.coneCos=Math.cos(P.angle),W.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),W.decay=P.decay,i.spot[_]=W;const Q=P.shadow;if(P.map&&(i.spotLightMap[L]=P.map,L++,Q.updateMatrices(P),P.castShadow&&A++),i.spotLightMatrix[_]=Q.matrix,P.castShadow){const V=t.get(P);V.shadowIntensity=Q.intensity,V.shadowBias=Q.bias,V.shadowNormalBias=Q.normalBias,V.shadowRadius=Q.radius,V.shadowMapSize=Q.mapSize,i.spotShadow[_]=V,i.spotShadowMap[_]=$,M++}_++}else if(P.isRectAreaLight){const W=e.get(P);W.color.copy(O).multiplyScalar(z),W.halfWidth.set(P.width*.5,0,0),W.halfHeight.set(0,P.height*.5,0),i.rectArea[m]=W,m++}else if(P.isPointLight){const W=e.get(P);if(W.color.copy(P.color).multiplyScalar(P.intensity),W.distance=P.distance,W.decay=P.decay,P.castShadow){const Q=P.shadow,V=t.get(P);V.shadowIntensity=Q.intensity,V.shadowBias=Q.bias,V.shadowNormalBias=Q.normalBias,V.shadowRadius=Q.radius,V.shadowMapSize=Q.mapSize,V.shadowCameraNear=Q.camera.near,V.shadowCameraFar=Q.camera.far,i.pointShadow[g]=V,i.pointShadowMap[g]=$,i.pointShadowMatrix[g]=P.shadow.matrix,x++}i.point[g]=W,g++}else if(P.isHemisphereLight){const W=e.get(P);W.skyColor.copy(P.color).multiplyScalar(z),W.groundColor.copy(P.groundColor).multiplyScalar(z),i.hemi[p]=W,p++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ue.LTC_FLOAT_1,i.rectAreaLTC2=ue.LTC_FLOAT_2):(i.rectAreaLTC1=ue.LTC_HALF_1,i.rectAreaLTC2=ue.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=h;const C=i.hash;(C.directionalLength!==f||C.pointLength!==g||C.spotLength!==_||C.rectAreaLength!==m||C.hemiLength!==p||C.numDirectionalShadows!==b||C.numPointShadows!==x||C.numSpotShadows!==M||C.numSpotMaps!==L||C.numLightProbes!==R)&&(i.directional.length=f,i.spot.length=_,i.rectArea.length=m,i.point.length=g,i.hemi.length=p,i.directionalShadow.length=b,i.directionalShadowMap.length=b,i.pointShadow.length=x,i.pointShadowMap.length=x,i.spotShadow.length=M,i.spotShadowMap.length=M,i.directionalShadowMatrix.length=b,i.pointShadowMatrix.length=x,i.spotLightMatrix.length=M+L-A,i.spotLightMap.length=L,i.numSpotLightShadowsWithMaps=A,i.numLightProbes=R,C.directionalLength=f,C.pointLength=g,C.spotLength=_,C.rectAreaLength=m,C.hemiLength=p,C.numDirectionalShadows=b,C.numPointShadows=x,C.numSpotShadows=M,C.numSpotMaps=L,C.numLightProbes=R,i.version=x0++)}function l(c,u){let d=0,h=0,f=0,g=0,_=0;const m=u.matrixWorldInverse;for(let p=0,b=c.length;p<b;p++){const x=c[p];if(x.isDirectionalLight){const M=i.directional[d];M.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),d++}else if(x.isSpotLight){const M=i.spot[f];M.position.setFromMatrixPosition(x.matrixWorld),M.position.applyMatrix4(m),M.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),f++}else if(x.isRectAreaLight){const M=i.rectArea[g];M.position.setFromMatrixPosition(x.matrixWorld),M.position.applyMatrix4(m),o.identity(),r.copy(x.matrixWorld),r.premultiply(m),o.extractRotation(r),M.halfWidth.set(x.width*.5,0,0),M.halfHeight.set(0,x.height*.5,0),M.halfWidth.applyMatrix4(o),M.halfHeight.applyMatrix4(o),g++}else if(x.isPointLight){const M=i.point[h];M.position.setFromMatrixPosition(x.matrixWorld),M.position.applyMatrix4(m),h++}else if(x.isHemisphereLight){const M=i.hemi[_];M.direction.setFromMatrixPosition(x.matrixWorld),M.direction.transformDirection(m),_++}}}return{setup:a,setupView:l,state:i}}function Zl(n){const e=new b0(n),t=[],i=[];function s(u){c.camera=u,t.length=0,i.length=0}function r(u){t.push(u)}function o(u){i.push(u)}function a(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function w0(n){let e=new WeakMap;function t(s,r=0){const o=e.get(s);let a;return o===void 0?(a=new Zl(n),e.set(s,[a])):r>=o.length?(a=new Zl(n),o.push(a)):a=o[r],a}function i(){e=new WeakMap}return{get:t,dispose:i}}class T0 extends jn{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=od,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class A0 extends jn{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const R0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,C0=`uniform sampler2D shadow_pass;
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
}`;function P0(n,e,t){let i=new Ia;const s=new xe,r=new xe,o=new ot,a=new T0({depthPacking:ad}),l=new A0,c={},u=t.maxTextureSize,d={[Jn]:Dt,[Dt]:Jn,[on]:on},h=new Nn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new xe},radius:{value:4}},vertexShader:R0,fragmentShader:C0}),f=h.clone();f.defines.HORIZONTAL_PASS=1;const g=new Mt;g.setAttribute("position",new Rt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new H(g,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Mc;let p=this.type;this.render=function(A,R,C){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;const y=n.getRenderTarget(),S=n.getActiveCubeFace(),P=n.getActiveMipmapLevel(),O=n.state;O.setBlending(Zn),O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);const z=p!==Rn&&this.type===Rn,q=p===Rn&&this.type!==Rn;for(let $=0,W=A.length;$<W;$++){const Q=A[$],V=Q.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",Q,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;s.copy(V.mapSize);const le=V.getFrameExtents();if(s.multiply(le),r.copy(V.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/le.x),s.x=r.x*le.x,V.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/le.y),s.y=r.y*le.y,V.mapSize.y=r.y)),V.map===null||z===!0||q===!0){const we=this.type!==Rn?{minFilter:hn,magFilter:hn}:{};V.map!==null&&V.map.dispose(),V.map=new Si(s.x,s.y,we),V.map.texture.name=Q.name+".shadowMap",V.camera.updateProjectionMatrix()}n.setRenderTarget(V.map),n.clear();const Me=V.getViewportCount();for(let we=0;we<Me;we++){const Ve=V.getViewport(we);o.set(r.x*Ve.x,r.y*Ve.y,r.x*Ve.z,r.y*Ve.w),O.viewport(o),V.updateMatrices(Q,we),i=V.getFrustum(),M(R,C,V.camera,Q,this.type)}V.isPointLightShadow!==!0&&this.type===Rn&&b(V,C),V.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(y,S,P)};function b(A,R){const C=e.update(_);h.defines.VSM_SAMPLES!==A.blurSamples&&(h.defines.VSM_SAMPLES=A.blurSamples,f.defines.VSM_SAMPLES=A.blurSamples,h.needsUpdate=!0,f.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new Si(s.x,s.y)),h.uniforms.shadow_pass.value=A.map.texture,h.uniforms.resolution.value=A.mapSize,h.uniforms.radius.value=A.radius,n.setRenderTarget(A.mapPass),n.clear(),n.renderBufferDirect(R,null,C,h,_,null),f.uniforms.shadow_pass.value=A.mapPass.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,n.setRenderTarget(A.map),n.clear(),n.renderBufferDirect(R,null,C,f,_,null)}function x(A,R,C,y){let S=null;const P=C.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(P!==void 0)S=P;else if(S=C.isPointLight===!0?l:a,n.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){const O=S.uuid,z=R.uuid;let q=c[O];q===void 0&&(q={},c[O]=q);let $=q[z];$===void 0&&($=S.clone(),q[z]=$,R.addEventListener("dispose",L)),S=$}if(S.visible=R.visible,S.wireframe=R.wireframe,y===Rn?S.side=R.shadowSide!==null?R.shadowSide:R.side:S.side=R.shadowSide!==null?R.shadowSide:d[R.side],S.alphaMap=R.alphaMap,S.alphaTest=R.alphaTest,S.map=R.map,S.clipShadows=R.clipShadows,S.clippingPlanes=R.clippingPlanes,S.clipIntersection=R.clipIntersection,S.displacementMap=R.displacementMap,S.displacementScale=R.displacementScale,S.displacementBias=R.displacementBias,S.wireframeLinewidth=R.wireframeLinewidth,S.linewidth=R.linewidth,C.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const O=n.properties.get(S);O.light=C}return S}function M(A,R,C,y,S){if(A.visible===!1)return;if(A.layers.test(R.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&S===Rn)&&(!A.frustumCulled||i.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,A.matrixWorld);const z=e.update(A),q=A.material;if(Array.isArray(q)){const $=z.groups;for(let W=0,Q=$.length;W<Q;W++){const V=$[W],le=q[V.materialIndex];if(le&&le.visible){const Me=x(A,le,y,S);A.onBeforeShadow(n,A,R,C,z,Me,V),n.renderBufferDirect(C,null,z,Me,A,V),A.onAfterShadow(n,A,R,C,z,Me,V)}}}else if(q.visible){const $=x(A,q,y,S);A.onBeforeShadow(n,A,R,C,z,$,null),n.renderBufferDirect(C,null,z,$,A,null),A.onAfterShadow(n,A,R,C,z,$,null)}}const O=A.children;for(let z=0,q=O.length;z<q;z++)M(O[z],R,C,y,S)}function L(A){A.target.removeEventListener("dispose",L);for(const C in c){const y=c[C],S=A.target.uuid;S in y&&(y[S].dispose(),delete y[S])}}}const L0={[Lo]:Io,[Do]:Fo,[Uo]:Oo,[Ji]:No,[Io]:Lo,[Fo]:Do,[Oo]:Uo,[No]:Ji};function I0(n,e){function t(){let I=!1;const ce=new ot;let G=null;const j=new ot(0,0,0,0);return{setMask:function(pe){G!==pe&&!I&&(n.colorMask(pe,pe,pe,pe),G=pe)},setLocked:function(pe){I=pe},setClear:function(pe,me,ke,vt,Ct){Ct===!0&&(pe*=vt,me*=vt,ke*=vt),ce.set(pe,me,ke,vt),j.equals(ce)===!1&&(n.clearColor(pe,me,ke,vt),j.copy(ce))},reset:function(){I=!1,G=null,j.set(-1,0,0,0)}}}function i(){let I=!1,ce=!1,G=null,j=null,pe=null;return{setReversed:function(me){if(ce!==me){const ke=e.get("EXT_clip_control");ce?ke.clipControlEXT(ke.LOWER_LEFT_EXT,ke.ZERO_TO_ONE_EXT):ke.clipControlEXT(ke.LOWER_LEFT_EXT,ke.NEGATIVE_ONE_TO_ONE_EXT);const vt=pe;pe=null,this.setClear(vt)}ce=me},getReversed:function(){return ce},setTest:function(me){me?he(n.DEPTH_TEST):De(n.DEPTH_TEST)},setMask:function(me){G!==me&&!I&&(n.depthMask(me),G=me)},setFunc:function(me){if(ce&&(me=L0[me]),j!==me){switch(me){case Lo:n.depthFunc(n.NEVER);break;case Io:n.depthFunc(n.ALWAYS);break;case Do:n.depthFunc(n.LESS);break;case Ji:n.depthFunc(n.LEQUAL);break;case Uo:n.depthFunc(n.EQUAL);break;case No:n.depthFunc(n.GEQUAL);break;case Fo:n.depthFunc(n.GREATER);break;case Oo:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}j=me}},setLocked:function(me){I=me},setClear:function(me){pe!==me&&(ce&&(me=1-me),n.clearDepth(me),pe=me)},reset:function(){I=!1,G=null,j=null,pe=null,ce=!1}}}function s(){let I=!1,ce=null,G=null,j=null,pe=null,me=null,ke=null,vt=null,Ct=null;return{setTest:function(tt){I||(tt?he(n.STENCIL_TEST):De(n.STENCIL_TEST))},setMask:function(tt){ce!==tt&&!I&&(n.stencilMask(tt),ce=tt)},setFunc:function(tt,jt,Sn){(G!==tt||j!==jt||pe!==Sn)&&(n.stencilFunc(tt,jt,Sn),G=tt,j=jt,pe=Sn)},setOp:function(tt,jt,Sn){(me!==tt||ke!==jt||vt!==Sn)&&(n.stencilOp(tt,jt,Sn),me=tt,ke=jt,vt=Sn)},setLocked:function(tt){I=tt},setClear:function(tt){Ct!==tt&&(n.clearStencil(tt),Ct=tt)},reset:function(){I=!1,ce=null,G=null,j=null,pe=null,me=null,ke=null,vt=null,Ct=null}}}const r=new t,o=new i,a=new s,l=new WeakMap,c=new WeakMap;let u={},d={},h=new WeakMap,f=[],g=null,_=!1,m=null,p=null,b=null,x=null,M=null,L=null,A=null,R=new Ue(0,0,0),C=0,y=!1,S=null,P=null,O=null,z=null,q=null;const $=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,Q=0;const V=n.getParameter(n.VERSION);V.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(V)[1]),W=Q>=1):V.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),W=Q>=2);let le=null,Me={};const we=n.getParameter(n.SCISSOR_BOX),Ve=n.getParameter(n.VIEWPORT),Je=new ot().fromArray(we),X=new ot().fromArray(Ve);function se(I,ce,G,j){const pe=new Uint8Array(4),me=n.createTexture();n.bindTexture(I,me),n.texParameteri(I,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(I,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let ke=0;ke<G;ke++)I===n.TEXTURE_3D||I===n.TEXTURE_2D_ARRAY?n.texImage3D(ce,0,n.RGBA,1,1,j,0,n.RGBA,n.UNSIGNED_BYTE,pe):n.texImage2D(ce+ke,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,pe);return me}const Ee={};Ee[n.TEXTURE_2D]=se(n.TEXTURE_2D,n.TEXTURE_2D,1),Ee[n.TEXTURE_CUBE_MAP]=se(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),Ee[n.TEXTURE_2D_ARRAY]=se(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Ee[n.TEXTURE_3D]=se(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),he(n.DEPTH_TEST),o.setFunc(Ji),te(!1),oe(el),he(n.CULL_FACE),N(Zn);function he(I){u[I]!==!0&&(n.enable(I),u[I]=!0)}function De(I){u[I]!==!1&&(n.disable(I),u[I]=!1)}function Oe(I,ce){return d[I]!==ce?(n.bindFramebuffer(I,ce),d[I]=ce,I===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=ce),I===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=ce),!0):!1}function We(I,ce){let G=f,j=!1;if(I){G=h.get(ce),G===void 0&&(G=[],h.set(ce,G));const pe=I.textures;if(G.length!==pe.length||G[0]!==n.COLOR_ATTACHMENT0){for(let me=0,ke=pe.length;me<ke;me++)G[me]=n.COLOR_ATTACHMENT0+me;G.length=pe.length,j=!0}}else G[0]!==n.BACK&&(G[0]=n.BACK,j=!0);j&&n.drawBuffers(G)}function ft(I){return g!==I?(n.useProgram(I),g=I,!0):!1}const Ye={[hi]:n.FUNC_ADD,[Uu]:n.FUNC_SUBTRACT,[Nu]:n.FUNC_REVERSE_SUBTRACT};Ye[Fu]=n.MIN,Ye[Ou]=n.MAX;const _t={[zu]:n.ZERO,[Bu]:n.ONE,[ku]:n.SRC_COLOR,[Co]:n.SRC_ALPHA,[qu]:n.SRC_ALPHA_SATURATE,[Wu]:n.DST_COLOR,[Gu]:n.DST_ALPHA,[Hu]:n.ONE_MINUS_SRC_COLOR,[Po]:n.ONE_MINUS_SRC_ALPHA,[Xu]:n.ONE_MINUS_DST_COLOR,[Vu]:n.ONE_MINUS_DST_ALPHA,[Yu]:n.CONSTANT_COLOR,[$u]:n.ONE_MINUS_CONSTANT_COLOR,[Zu]:n.CONSTANT_ALPHA,[Ku]:n.ONE_MINUS_CONSTANT_ALPHA};function N(I,ce,G,j,pe,me,ke,vt,Ct,tt){if(I===Zn){_===!0&&(De(n.BLEND),_=!1);return}if(_===!1&&(he(n.BLEND),_=!0),I!==Du){if(I!==m||tt!==y){if((p!==hi||M!==hi)&&(n.blendEquation(n.FUNC_ADD),p=hi,M=hi),tt)switch(I){case qi:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Ot:n.blendFunc(n.ONE,n.ONE);break;case tl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case nl:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}else switch(I){case qi:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Ot:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case tl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case nl:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}b=null,x=null,L=null,A=null,R.set(0,0,0),C=0,m=I,y=tt}return}pe=pe||ce,me=me||G,ke=ke||j,(ce!==p||pe!==M)&&(n.blendEquationSeparate(Ye[ce],Ye[pe]),p=ce,M=pe),(G!==b||j!==x||me!==L||ke!==A)&&(n.blendFuncSeparate(_t[G],_t[j],_t[me],_t[ke]),b=G,x=j,L=me,A=ke),(vt.equals(R)===!1||Ct!==C)&&(n.blendColor(vt.r,vt.g,vt.b,Ct),R.copy(vt),C=Ct),m=I,y=!1}function ae(I,ce){I.side===on?De(n.CULL_FACE):he(n.CULL_FACE);let G=I.side===Dt;ce&&(G=!G),te(G),I.blending===qi&&I.transparent===!1?N(Zn):N(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),o.setFunc(I.depthFunc),o.setTest(I.depthTest),o.setMask(I.depthWrite),r.setMask(I.colorWrite);const j=I.stencilWrite;a.setTest(j),j&&(a.setMask(I.stencilWriteMask),a.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),a.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),ye(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?he(n.SAMPLE_ALPHA_TO_COVERAGE):De(n.SAMPLE_ALPHA_TO_COVERAGE)}function te(I){S!==I&&(I?n.frontFace(n.CW):n.frontFace(n.CCW),S=I)}function oe(I){I!==Lu?(he(n.CULL_FACE),I!==P&&(I===el?n.cullFace(n.BACK):I===Iu?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):De(n.CULL_FACE),P=I}function ne(I){I!==O&&(W&&n.lineWidth(I),O=I)}function ye(I,ce,G){I?(he(n.POLYGON_OFFSET_FILL),(z!==ce||q!==G)&&(n.polygonOffset(ce,G),z=ce,q=G)):De(n.POLYGON_OFFSET_FILL)}function _e(I){I?he(n.SCISSOR_TEST):De(n.SCISSOR_TEST)}function T(I){I===void 0&&(I=n.TEXTURE0+$-1),le!==I&&(n.activeTexture(I),le=I)}function v(I,ce,G){G===void 0&&(le===null?G=n.TEXTURE0+$-1:G=le);let j=Me[G];j===void 0&&(j={type:void 0,texture:void 0},Me[G]=j),(j.type!==I||j.texture!==ce)&&(le!==G&&(n.activeTexture(G),le=G),n.bindTexture(I,ce||Ee[I]),j.type=I,j.texture=ce)}function F(){const I=Me[le];I!==void 0&&I.type!==void 0&&(n.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function Z(){try{n.compressedTexImage2D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ee(){try{n.compressedTexImage3D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Y(){try{n.texSubImage2D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Te(){try{n.texSubImage3D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function de(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Se(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function K(){try{n.texStorage2D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function J(){try{n.texStorage3D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function fe(){try{n.texImage2D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Ae(){try{n.texImage3D.apply(n,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Le(I){Je.equals(I)===!1&&(n.scissor(I.x,I.y,I.z,I.w),Je.copy(I))}function ve(I){X.equals(I)===!1&&(n.viewport(I.x,I.y,I.z,I.w),X.copy(I))}function qe(I,ce){let G=c.get(ce);G===void 0&&(G=new WeakMap,c.set(ce,G));let j=G.get(I);j===void 0&&(j=n.getUniformBlockIndex(ce,I.name),G.set(I,j))}function Be(I,ce){const j=c.get(ce).get(I);l.get(ce)!==j&&(n.uniformBlockBinding(ce,j,I.__bindingPointIndex),l.set(ce,j))}function je(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},le=null,Me={},d={},h=new WeakMap,f=[],g=null,_=!1,m=null,p=null,b=null,x=null,M=null,L=null,A=null,R=new Ue(0,0,0),C=0,y=!1,S=null,P=null,O=null,z=null,q=null,Je.set(0,0,n.canvas.width,n.canvas.height),X.set(0,0,n.canvas.width,n.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:he,disable:De,bindFramebuffer:Oe,drawBuffers:We,useProgram:ft,setBlending:N,setMaterial:ae,setFlipSided:te,setCullFace:oe,setLineWidth:ne,setPolygonOffset:ye,setScissorTest:_e,activeTexture:T,bindTexture:v,unbindTexture:F,compressedTexImage2D:Z,compressedTexImage3D:ee,texImage2D:fe,texImage3D:Ae,updateUBOMapping:qe,uniformBlockBinding:Be,texStorage2D:K,texStorage3D:J,texSubImage2D:Y,texSubImage3D:Te,compressedTexSubImage2D:de,compressedTexSubImage3D:Se,scissor:Le,viewport:ve,reset:je}}function Kl(n,e,t,i){const s=D0(i);switch(t){case wc:return n*e;case Ac:return n*e;case Rc:return n*e*2;case Cc:return n*e/s.components*s.byteLength;case Aa:return n*e/s.components*s.byteLength;case Pc:return n*e*2/s.components*s.byteLength;case Ra:return n*e*2/s.components*s.byteLength;case Tc:return n*e*3/s.components*s.byteLength;case un:return n*e*4/s.components*s.byteLength;case Ca:return n*e*4/s.components*s.byteLength;case _r:case vr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Mr:case Sr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Go:case Wo:return Math.max(n,16)*Math.max(e,8)/4;case Ho:case Vo:return Math.max(n,8)*Math.max(e,8)/2;case Xo:case qo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Yo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case $o:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Zo:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Ko:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Jo:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case jo:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Qo:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case ea:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case ta:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case na:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case ia:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case sa:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case ra:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case oa:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case aa:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case yr:case la:case ca:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Lc:case ua:return Math.ceil(n/4)*Math.ceil(e/4)*8;case da:case ha:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function D0(n){switch(n){case Un:case xc:return{byteLength:1,components:1};case Ps:case Ec:case Us:return{byteLength:2,components:1};case wa:case Ta:return{byteLength:2,components:4};case Mi:case ba:case Pn:return{byteLength:4,components:1};case bc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function U0(n,e,t,i,s,r,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new xe,u=new WeakMap;let d;const h=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(T,v){return f?new OffscreenCanvas(T,v):wr("canvas")}function _(T,v,F){let Z=1;const ee=_e(T);if((ee.width>F||ee.height>F)&&(Z=F/Math.max(ee.width,ee.height)),Z<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const Y=Math.floor(Z*ee.width),Te=Math.floor(Z*ee.height);d===void 0&&(d=g(Y,Te));const de=v?g(Y,Te):d;return de.width=Y,de.height=Te,de.getContext("2d").drawImage(T,0,0,Y,Te),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ee.width+"x"+ee.height+") to ("+Y+"x"+Te+")."),de}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ee.width+"x"+ee.height+")."),T;return T}function m(T){return T.generateMipmaps}function p(T){n.generateMipmap(T)}function b(T){return T.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?n.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function x(T,v,F,Z,ee=!1){if(T!==null){if(n[T]!==void 0)return n[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let Y=v;if(v===n.RED&&(F===n.FLOAT&&(Y=n.R32F),F===n.HALF_FLOAT&&(Y=n.R16F),F===n.UNSIGNED_BYTE&&(Y=n.R8)),v===n.RED_INTEGER&&(F===n.UNSIGNED_BYTE&&(Y=n.R8UI),F===n.UNSIGNED_SHORT&&(Y=n.R16UI),F===n.UNSIGNED_INT&&(Y=n.R32UI),F===n.BYTE&&(Y=n.R8I),F===n.SHORT&&(Y=n.R16I),F===n.INT&&(Y=n.R32I)),v===n.RG&&(F===n.FLOAT&&(Y=n.RG32F),F===n.HALF_FLOAT&&(Y=n.RG16F),F===n.UNSIGNED_BYTE&&(Y=n.RG8)),v===n.RG_INTEGER&&(F===n.UNSIGNED_BYTE&&(Y=n.RG8UI),F===n.UNSIGNED_SHORT&&(Y=n.RG16UI),F===n.UNSIGNED_INT&&(Y=n.RG32UI),F===n.BYTE&&(Y=n.RG8I),F===n.SHORT&&(Y=n.RG16I),F===n.INT&&(Y=n.RG32I)),v===n.RGB_INTEGER&&(F===n.UNSIGNED_BYTE&&(Y=n.RGB8UI),F===n.UNSIGNED_SHORT&&(Y=n.RGB16UI),F===n.UNSIGNED_INT&&(Y=n.RGB32UI),F===n.BYTE&&(Y=n.RGB8I),F===n.SHORT&&(Y=n.RGB16I),F===n.INT&&(Y=n.RGB32I)),v===n.RGBA_INTEGER&&(F===n.UNSIGNED_BYTE&&(Y=n.RGBA8UI),F===n.UNSIGNED_SHORT&&(Y=n.RGBA16UI),F===n.UNSIGNED_INT&&(Y=n.RGBA32UI),F===n.BYTE&&(Y=n.RGBA8I),F===n.SHORT&&(Y=n.RGBA16I),F===n.INT&&(Y=n.RGBA32I)),v===n.RGB&&F===n.UNSIGNED_INT_5_9_9_9_REV&&(Y=n.RGB9_E5),v===n.RGBA){const Te=ee?Ir:$e.getTransfer(Z);F===n.FLOAT&&(Y=n.RGBA32F),F===n.HALF_FLOAT&&(Y=n.RGBA16F),F===n.UNSIGNED_BYTE&&(Y=Te===rt?n.SRGB8_ALPHA8:n.RGBA8),F===n.UNSIGNED_SHORT_4_4_4_4&&(Y=n.RGBA4),F===n.UNSIGNED_SHORT_5_5_5_1&&(Y=n.RGB5_A1)}return(Y===n.R16F||Y===n.R32F||Y===n.RG16F||Y===n.RG32F||Y===n.RGBA16F||Y===n.RGBA32F)&&e.get("EXT_color_buffer_float"),Y}function M(T,v){let F;return T?v===null||v===Mi||v===es?F=n.DEPTH24_STENCIL8:v===Pn?F=n.DEPTH32F_STENCIL8:v===Ps&&(F=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Mi||v===es?F=n.DEPTH_COMPONENT24:v===Pn?F=n.DEPTH_COMPONENT32F:v===Ps&&(F=n.DEPTH_COMPONENT16),F}function L(T,v){return m(T)===!0||T.isFramebufferTexture&&T.minFilter!==hn&&T.minFilter!==_n?Math.log2(Math.max(v.width,v.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?v.mipmaps.length:1}function A(T){const v=T.target;v.removeEventListener("dispose",A),C(v),v.isVideoTexture&&u.delete(v)}function R(T){const v=T.target;v.removeEventListener("dispose",R),S(v)}function C(T){const v=i.get(T);if(v.__webglInit===void 0)return;const F=T.source,Z=h.get(F);if(Z){const ee=Z[v.__cacheKey];ee.usedTimes--,ee.usedTimes===0&&y(T),Object.keys(Z).length===0&&h.delete(F)}i.remove(T)}function y(T){const v=i.get(T);n.deleteTexture(v.__webglTexture);const F=T.source,Z=h.get(F);delete Z[v.__cacheKey],o.memory.textures--}function S(T){const v=i.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),i.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(v.__webglFramebuffer[Z]))for(let ee=0;ee<v.__webglFramebuffer[Z].length;ee++)n.deleteFramebuffer(v.__webglFramebuffer[Z][ee]);else n.deleteFramebuffer(v.__webglFramebuffer[Z]);v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer[Z])}else{if(Array.isArray(v.__webglFramebuffer))for(let Z=0;Z<v.__webglFramebuffer.length;Z++)n.deleteFramebuffer(v.__webglFramebuffer[Z]);else n.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&n.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let Z=0;Z<v.__webglColorRenderbuffer.length;Z++)v.__webglColorRenderbuffer[Z]&&n.deleteRenderbuffer(v.__webglColorRenderbuffer[Z]);v.__webglDepthRenderbuffer&&n.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const F=T.textures;for(let Z=0,ee=F.length;Z<ee;Z++){const Y=i.get(F[Z]);Y.__webglTexture&&(n.deleteTexture(Y.__webglTexture),o.memory.textures--),i.remove(F[Z])}i.remove(T)}let P=0;function O(){P=0}function z(){const T=P;return T>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+s.maxTextures),P+=1,T}function q(T){const v=[];return v.push(T.wrapS),v.push(T.wrapT),v.push(T.wrapR||0),v.push(T.magFilter),v.push(T.minFilter),v.push(T.anisotropy),v.push(T.internalFormat),v.push(T.format),v.push(T.type),v.push(T.generateMipmaps),v.push(T.premultiplyAlpha),v.push(T.flipY),v.push(T.unpackAlignment),v.push(T.colorSpace),v.join()}function $(T,v){const F=i.get(T);if(T.isVideoTexture&&ne(T),T.isRenderTargetTexture===!1&&T.version>0&&F.__version!==T.version){const Z=T.image;if(Z===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{X(F,T,v);return}}t.bindTexture(n.TEXTURE_2D,F.__webglTexture,n.TEXTURE0+v)}function W(T,v){const F=i.get(T);if(T.version>0&&F.__version!==T.version){X(F,T,v);return}t.bindTexture(n.TEXTURE_2D_ARRAY,F.__webglTexture,n.TEXTURE0+v)}function Q(T,v){const F=i.get(T);if(T.version>0&&F.__version!==T.version){X(F,T,v);return}t.bindTexture(n.TEXTURE_3D,F.__webglTexture,n.TEXTURE0+v)}function V(T,v){const F=i.get(T);if(T.version>0&&F.__version!==T.version){se(F,T,v);return}t.bindTexture(n.TEXTURE_CUBE_MAP,F.__webglTexture,n.TEXTURE0+v)}const le={[vi]:n.REPEAT,[mi]:n.CLAMP_TO_EDGE,[ko]:n.MIRRORED_REPEAT},Me={[hn]:n.NEAREST,[rd]:n.NEAREST_MIPMAP_NEAREST,[Gs]:n.NEAREST_MIPMAP_LINEAR,[_n]:n.LINEAR,[Br]:n.LINEAR_MIPMAP_NEAREST,[gi]:n.LINEAR_MIPMAP_LINEAR},we={[cd]:n.NEVER,[md]:n.ALWAYS,[ud]:n.LESS,[Dc]:n.LEQUAL,[dd]:n.EQUAL,[pd]:n.GEQUAL,[hd]:n.GREATER,[fd]:n.NOTEQUAL};function Ve(T,v){if(v.type===Pn&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===_n||v.magFilter===Br||v.magFilter===Gs||v.magFilter===gi||v.minFilter===_n||v.minFilter===Br||v.minFilter===Gs||v.minFilter===gi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(T,n.TEXTURE_WRAP_S,le[v.wrapS]),n.texParameteri(T,n.TEXTURE_WRAP_T,le[v.wrapT]),(T===n.TEXTURE_3D||T===n.TEXTURE_2D_ARRAY)&&n.texParameteri(T,n.TEXTURE_WRAP_R,le[v.wrapR]),n.texParameteri(T,n.TEXTURE_MAG_FILTER,Me[v.magFilter]),n.texParameteri(T,n.TEXTURE_MIN_FILTER,Me[v.minFilter]),v.compareFunction&&(n.texParameteri(T,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(T,n.TEXTURE_COMPARE_FUNC,we[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===hn||v.minFilter!==Gs&&v.minFilter!==gi||v.type===Pn&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||i.get(v).__currentAnisotropy){const F=e.get("EXT_texture_filter_anisotropic");n.texParameterf(T,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),i.get(v).__currentAnisotropy=v.anisotropy}}}function Je(T,v){let F=!1;T.__webglInit===void 0&&(T.__webglInit=!0,v.addEventListener("dispose",A));const Z=v.source;let ee=h.get(Z);ee===void 0&&(ee={},h.set(Z,ee));const Y=q(v);if(Y!==T.__cacheKey){ee[Y]===void 0&&(ee[Y]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,F=!0),ee[Y].usedTimes++;const Te=ee[T.__cacheKey];Te!==void 0&&(ee[T.__cacheKey].usedTimes--,Te.usedTimes===0&&y(v)),T.__cacheKey=Y,T.__webglTexture=ee[Y].texture}return F}function X(T,v,F){let Z=n.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(Z=n.TEXTURE_2D_ARRAY),v.isData3DTexture&&(Z=n.TEXTURE_3D);const ee=Je(T,v),Y=v.source;t.bindTexture(Z,T.__webglTexture,n.TEXTURE0+F);const Te=i.get(Y);if(Y.version!==Te.__version||ee===!0){t.activeTexture(n.TEXTURE0+F);const de=$e.getPrimaries($e.workingColorSpace),Se=v.colorSpace===qn?null:$e.getPrimaries(v.colorSpace),K=v.colorSpace===qn||de===Se?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,K);let J=_(v.image,!1,s.maxTextureSize);J=ye(v,J);const fe=r.convert(v.format,v.colorSpace),Ae=r.convert(v.type);let Le=x(v.internalFormat,fe,Ae,v.colorSpace,v.isVideoTexture);Ve(Z,v);let ve;const qe=v.mipmaps,Be=v.isVideoTexture!==!0,je=Te.__version===void 0||ee===!0,I=Y.dataReady,ce=L(v,J);if(v.isDepthTexture)Le=M(v.format===ts,v.type),je&&(Be?t.texStorage2D(n.TEXTURE_2D,1,Le,J.width,J.height):t.texImage2D(n.TEXTURE_2D,0,Le,J.width,J.height,0,fe,Ae,null));else if(v.isDataTexture)if(qe.length>0){Be&&je&&t.texStorage2D(n.TEXTURE_2D,ce,Le,qe[0].width,qe[0].height);for(let G=0,j=qe.length;G<j;G++)ve=qe[G],Be?I&&t.texSubImage2D(n.TEXTURE_2D,G,0,0,ve.width,ve.height,fe,Ae,ve.data):t.texImage2D(n.TEXTURE_2D,G,Le,ve.width,ve.height,0,fe,Ae,ve.data);v.generateMipmaps=!1}else Be?(je&&t.texStorage2D(n.TEXTURE_2D,ce,Le,J.width,J.height),I&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,J.width,J.height,fe,Ae,J.data)):t.texImage2D(n.TEXTURE_2D,0,Le,J.width,J.height,0,fe,Ae,J.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){Be&&je&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ce,Le,qe[0].width,qe[0].height,J.depth);for(let G=0,j=qe.length;G<j;G++)if(ve=qe[G],v.format!==un)if(fe!==null)if(Be){if(I)if(v.layerUpdates.size>0){const pe=Kl(ve.width,ve.height,v.format,v.type);for(const me of v.layerUpdates){const ke=ve.data.subarray(me*pe/ve.data.BYTES_PER_ELEMENT,(me+1)*pe/ve.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,G,0,0,me,ve.width,ve.height,1,fe,ke)}v.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,G,0,0,0,ve.width,ve.height,J.depth,fe,ve.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,G,Le,ve.width,ve.height,J.depth,0,ve.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Be?I&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,G,0,0,0,ve.width,ve.height,J.depth,fe,Ae,ve.data):t.texImage3D(n.TEXTURE_2D_ARRAY,G,Le,ve.width,ve.height,J.depth,0,fe,Ae,ve.data)}else{Be&&je&&t.texStorage2D(n.TEXTURE_2D,ce,Le,qe[0].width,qe[0].height);for(let G=0,j=qe.length;G<j;G++)ve=qe[G],v.format!==un?fe!==null?Be?I&&t.compressedTexSubImage2D(n.TEXTURE_2D,G,0,0,ve.width,ve.height,fe,ve.data):t.compressedTexImage2D(n.TEXTURE_2D,G,Le,ve.width,ve.height,0,ve.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Be?I&&t.texSubImage2D(n.TEXTURE_2D,G,0,0,ve.width,ve.height,fe,Ae,ve.data):t.texImage2D(n.TEXTURE_2D,G,Le,ve.width,ve.height,0,fe,Ae,ve.data)}else if(v.isDataArrayTexture)if(Be){if(je&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ce,Le,J.width,J.height,J.depth),I)if(v.layerUpdates.size>0){const G=Kl(J.width,J.height,v.format,v.type);for(const j of v.layerUpdates){const pe=J.data.subarray(j*G/J.data.BYTES_PER_ELEMENT,(j+1)*G/J.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,j,J.width,J.height,1,fe,Ae,pe)}v.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,fe,Ae,J.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Le,J.width,J.height,J.depth,0,fe,Ae,J.data);else if(v.isData3DTexture)Be?(je&&t.texStorage3D(n.TEXTURE_3D,ce,Le,J.width,J.height,J.depth),I&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,fe,Ae,J.data)):t.texImage3D(n.TEXTURE_3D,0,Le,J.width,J.height,J.depth,0,fe,Ae,J.data);else if(v.isFramebufferTexture){if(je)if(Be)t.texStorage2D(n.TEXTURE_2D,ce,Le,J.width,J.height);else{let G=J.width,j=J.height;for(let pe=0;pe<ce;pe++)t.texImage2D(n.TEXTURE_2D,pe,Le,G,j,0,fe,Ae,null),G>>=1,j>>=1}}else if(qe.length>0){if(Be&&je){const G=_e(qe[0]);t.texStorage2D(n.TEXTURE_2D,ce,Le,G.width,G.height)}for(let G=0,j=qe.length;G<j;G++)ve=qe[G],Be?I&&t.texSubImage2D(n.TEXTURE_2D,G,0,0,fe,Ae,ve):t.texImage2D(n.TEXTURE_2D,G,Le,fe,Ae,ve);v.generateMipmaps=!1}else if(Be){if(je){const G=_e(J);t.texStorage2D(n.TEXTURE_2D,ce,Le,G.width,G.height)}I&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,fe,Ae,J)}else t.texImage2D(n.TEXTURE_2D,0,Le,fe,Ae,J);m(v)&&p(Z),Te.__version=Y.version,v.onUpdate&&v.onUpdate(v)}T.__version=v.version}function se(T,v,F){if(v.image.length!==6)return;const Z=Je(T,v),ee=v.source;t.bindTexture(n.TEXTURE_CUBE_MAP,T.__webglTexture,n.TEXTURE0+F);const Y=i.get(ee);if(ee.version!==Y.__version||Z===!0){t.activeTexture(n.TEXTURE0+F);const Te=$e.getPrimaries($e.workingColorSpace),de=v.colorSpace===qn?null:$e.getPrimaries(v.colorSpace),Se=v.colorSpace===qn||Te===de?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Se);const K=v.isCompressedTexture||v.image[0].isCompressedTexture,J=v.image[0]&&v.image[0].isDataTexture,fe=[];for(let j=0;j<6;j++)!K&&!J?fe[j]=_(v.image[j],!0,s.maxCubemapSize):fe[j]=J?v.image[j].image:v.image[j],fe[j]=ye(v,fe[j]);const Ae=fe[0],Le=r.convert(v.format,v.colorSpace),ve=r.convert(v.type),qe=x(v.internalFormat,Le,ve,v.colorSpace),Be=v.isVideoTexture!==!0,je=Y.__version===void 0||Z===!0,I=ee.dataReady;let ce=L(v,Ae);Ve(n.TEXTURE_CUBE_MAP,v);let G;if(K){Be&&je&&t.texStorage2D(n.TEXTURE_CUBE_MAP,ce,qe,Ae.width,Ae.height);for(let j=0;j<6;j++){G=fe[j].mipmaps;for(let pe=0;pe<G.length;pe++){const me=G[pe];v.format!==un?Le!==null?Be?I&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,pe,0,0,me.width,me.height,Le,me.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,pe,qe,me.width,me.height,0,me.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Be?I&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,pe,0,0,me.width,me.height,Le,ve,me.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,pe,qe,me.width,me.height,0,Le,ve,me.data)}}}else{if(G=v.mipmaps,Be&&je){G.length>0&&ce++;const j=_e(fe[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,ce,qe,j.width,j.height)}for(let j=0;j<6;j++)if(J){Be?I&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,fe[j].width,fe[j].height,Le,ve,fe[j].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,qe,fe[j].width,fe[j].height,0,Le,ve,fe[j].data);for(let pe=0;pe<G.length;pe++){const ke=G[pe].image[j].image;Be?I&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,pe+1,0,0,ke.width,ke.height,Le,ve,ke.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,pe+1,qe,ke.width,ke.height,0,Le,ve,ke.data)}}else{Be?I&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,Le,ve,fe[j]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,qe,Le,ve,fe[j]);for(let pe=0;pe<G.length;pe++){const me=G[pe];Be?I&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,pe+1,0,0,Le,ve,me.image[j]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,pe+1,qe,Le,ve,me.image[j])}}}m(v)&&p(n.TEXTURE_CUBE_MAP),Y.__version=ee.version,v.onUpdate&&v.onUpdate(v)}T.__version=v.version}function Ee(T,v,F,Z,ee,Y){const Te=r.convert(F.format,F.colorSpace),de=r.convert(F.type),Se=x(F.internalFormat,Te,de,F.colorSpace),K=i.get(v),J=i.get(F);if(J.__renderTarget=v,!K.__hasExternalTextures){const fe=Math.max(1,v.width>>Y),Ae=Math.max(1,v.height>>Y);ee===n.TEXTURE_3D||ee===n.TEXTURE_2D_ARRAY?t.texImage3D(ee,Y,Se,fe,Ae,v.depth,0,Te,de,null):t.texImage2D(ee,Y,Se,fe,Ae,0,Te,de,null)}t.bindFramebuffer(n.FRAMEBUFFER,T),oe(v)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Z,ee,J.__webglTexture,0,te(v)):(ee===n.TEXTURE_2D||ee>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ee<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,Z,ee,J.__webglTexture,Y),t.bindFramebuffer(n.FRAMEBUFFER,null)}function he(T,v,F){if(n.bindRenderbuffer(n.RENDERBUFFER,T),v.depthBuffer){const Z=v.depthTexture,ee=Z&&Z.isDepthTexture?Z.type:null,Y=M(v.stencilBuffer,ee),Te=v.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,de=te(v);oe(v)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,de,Y,v.width,v.height):F?n.renderbufferStorageMultisample(n.RENDERBUFFER,de,Y,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,Y,v.width,v.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Te,n.RENDERBUFFER,T)}else{const Z=v.textures;for(let ee=0;ee<Z.length;ee++){const Y=Z[ee],Te=r.convert(Y.format,Y.colorSpace),de=r.convert(Y.type),Se=x(Y.internalFormat,Te,de,Y.colorSpace),K=te(v);F&&oe(v)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,K,Se,v.width,v.height):oe(v)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,K,Se,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,Se,v.width,v.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function De(T,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,T),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Z=i.get(v.depthTexture);Z.__renderTarget=v,(!Z.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),$(v.depthTexture,0);const ee=Z.__webglTexture,Y=te(v);if(v.depthTexture.format===Yi)oe(v)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ee,0,Y):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ee,0);else if(v.depthTexture.format===ts)oe(v)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ee,0,Y):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ee,0);else throw new Error("Unknown depthTexture format")}function Oe(T){const v=i.get(T),F=T.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==T.depthTexture){const Z=T.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),Z){const ee=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,Z.removeEventListener("dispose",ee)};Z.addEventListener("dispose",ee),v.__depthDisposeCallback=ee}v.__boundDepthTexture=Z}if(T.depthTexture&&!v.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");De(v.__webglFramebuffer,T)}else if(F){v.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[Z]),v.__webglDepthbuffer[Z]===void 0)v.__webglDepthbuffer[Z]=n.createRenderbuffer(),he(v.__webglDepthbuffer[Z],T,!1);else{const ee=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Y=v.__webglDepthbuffer[Z];n.bindRenderbuffer(n.RENDERBUFFER,Y),n.framebufferRenderbuffer(n.FRAMEBUFFER,ee,n.RENDERBUFFER,Y)}}else if(t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=n.createRenderbuffer(),he(v.__webglDepthbuffer,T,!1);else{const Z=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ee=v.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,ee),n.framebufferRenderbuffer(n.FRAMEBUFFER,Z,n.RENDERBUFFER,ee)}t.bindFramebuffer(n.FRAMEBUFFER,null)}function We(T,v,F){const Z=i.get(T);v!==void 0&&Ee(Z.__webglFramebuffer,T,T.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),F!==void 0&&Oe(T)}function ft(T){const v=T.texture,F=i.get(T),Z=i.get(v);T.addEventListener("dispose",R);const ee=T.textures,Y=T.isWebGLCubeRenderTarget===!0,Te=ee.length>1;if(Te||(Z.__webglTexture===void 0&&(Z.__webglTexture=n.createTexture()),Z.__version=v.version,o.memory.textures++),Y){F.__webglFramebuffer=[];for(let de=0;de<6;de++)if(v.mipmaps&&v.mipmaps.length>0){F.__webglFramebuffer[de]=[];for(let Se=0;Se<v.mipmaps.length;Se++)F.__webglFramebuffer[de][Se]=n.createFramebuffer()}else F.__webglFramebuffer[de]=n.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){F.__webglFramebuffer=[];for(let de=0;de<v.mipmaps.length;de++)F.__webglFramebuffer[de]=n.createFramebuffer()}else F.__webglFramebuffer=n.createFramebuffer();if(Te)for(let de=0,Se=ee.length;de<Se;de++){const K=i.get(ee[de]);K.__webglTexture===void 0&&(K.__webglTexture=n.createTexture(),o.memory.textures++)}if(T.samples>0&&oe(T)===!1){F.__webglMultisampledFramebuffer=n.createFramebuffer(),F.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let de=0;de<ee.length;de++){const Se=ee[de];F.__webglColorRenderbuffer[de]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,F.__webglColorRenderbuffer[de]);const K=r.convert(Se.format,Se.colorSpace),J=r.convert(Se.type),fe=x(Se.internalFormat,K,J,Se.colorSpace,T.isXRRenderTarget===!0),Ae=te(T);n.renderbufferStorageMultisample(n.RENDERBUFFER,Ae,fe,T.width,T.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+de,n.RENDERBUFFER,F.__webglColorRenderbuffer[de])}n.bindRenderbuffer(n.RENDERBUFFER,null),T.depthBuffer&&(F.__webglDepthRenderbuffer=n.createRenderbuffer(),he(F.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(Y){t.bindTexture(n.TEXTURE_CUBE_MAP,Z.__webglTexture),Ve(n.TEXTURE_CUBE_MAP,v);for(let de=0;de<6;de++)if(v.mipmaps&&v.mipmaps.length>0)for(let Se=0;Se<v.mipmaps.length;Se++)Ee(F.__webglFramebuffer[de][Se],T,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+de,Se);else Ee(F.__webglFramebuffer[de],T,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+de,0);m(v)&&p(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Te){for(let de=0,Se=ee.length;de<Se;de++){const K=ee[de],J=i.get(K);t.bindTexture(n.TEXTURE_2D,J.__webglTexture),Ve(n.TEXTURE_2D,K),Ee(F.__webglFramebuffer,T,K,n.COLOR_ATTACHMENT0+de,n.TEXTURE_2D,0),m(K)&&p(n.TEXTURE_2D)}t.unbindTexture()}else{let de=n.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(de=T.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(de,Z.__webglTexture),Ve(de,v),v.mipmaps&&v.mipmaps.length>0)for(let Se=0;Se<v.mipmaps.length;Se++)Ee(F.__webglFramebuffer[Se],T,v,n.COLOR_ATTACHMENT0,de,Se);else Ee(F.__webglFramebuffer,T,v,n.COLOR_ATTACHMENT0,de,0);m(v)&&p(de),t.unbindTexture()}T.depthBuffer&&Oe(T)}function Ye(T){const v=T.textures;for(let F=0,Z=v.length;F<Z;F++){const ee=v[F];if(m(ee)){const Y=b(T),Te=i.get(ee).__webglTexture;t.bindTexture(Y,Te),p(Y),t.unbindTexture()}}}const _t=[],N=[];function ae(T){if(T.samples>0){if(oe(T)===!1){const v=T.textures,F=T.width,Z=T.height;let ee=n.COLOR_BUFFER_BIT;const Y=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Te=i.get(T),de=v.length>1;if(de)for(let Se=0;Se<v.length;Se++)t.bindFramebuffer(n.FRAMEBUFFER,Te.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Se,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,Te.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Se,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,Te.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Te.__webglFramebuffer);for(let Se=0;Se<v.length;Se++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(ee|=n.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(ee|=n.STENCIL_BUFFER_BIT)),de){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Te.__webglColorRenderbuffer[Se]);const K=i.get(v[Se]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,K,0)}n.blitFramebuffer(0,0,F,Z,0,0,F,Z,ee,n.NEAREST),l===!0&&(_t.length=0,N.length=0,_t.push(n.COLOR_ATTACHMENT0+Se),T.depthBuffer&&T.resolveDepthBuffer===!1&&(_t.push(Y),N.push(Y),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,N)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,_t))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),de)for(let Se=0;Se<v.length;Se++){t.bindFramebuffer(n.FRAMEBUFFER,Te.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Se,n.RENDERBUFFER,Te.__webglColorRenderbuffer[Se]);const K=i.get(v[Se]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,Te.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Se,n.TEXTURE_2D,K,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Te.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&l){const v=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[v])}}}function te(T){return Math.min(s.maxSamples,T.samples)}function oe(T){const v=i.get(T);return T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function ne(T){const v=o.render.frame;u.get(T)!==v&&(u.set(T,v),T.update())}function ye(T,v){const F=T.colorSpace,Z=T.format,ee=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||F!==is&&F!==qn&&($e.getTransfer(F)===rt?(Z!==un||ee!==Un)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),v}function _e(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(c.width=T.naturalWidth||T.width,c.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(c.width=T.displayWidth,c.height=T.displayHeight):(c.width=T.width,c.height=T.height),c}this.allocateTextureUnit=z,this.resetTextureUnits=O,this.setTexture2D=$,this.setTexture2DArray=W,this.setTexture3D=Q,this.setTextureCube=V,this.rebindTextures=We,this.setupRenderTarget=ft,this.updateRenderTargetMipmap=Ye,this.updateMultisampleRenderTarget=ae,this.setupDepthRenderbuffer=Oe,this.setupFrameBufferTexture=Ee,this.useMultisampledRTT=oe}function N0(n,e){function t(i,s=qn){let r;const o=$e.getTransfer(s);if(i===Un)return n.UNSIGNED_BYTE;if(i===wa)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Ta)return n.UNSIGNED_SHORT_5_5_5_1;if(i===bc)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===xc)return n.BYTE;if(i===Ec)return n.SHORT;if(i===Ps)return n.UNSIGNED_SHORT;if(i===ba)return n.INT;if(i===Mi)return n.UNSIGNED_INT;if(i===Pn)return n.FLOAT;if(i===Us)return n.HALF_FLOAT;if(i===wc)return n.ALPHA;if(i===Tc)return n.RGB;if(i===un)return n.RGBA;if(i===Ac)return n.LUMINANCE;if(i===Rc)return n.LUMINANCE_ALPHA;if(i===Yi)return n.DEPTH_COMPONENT;if(i===ts)return n.DEPTH_STENCIL;if(i===Cc)return n.RED;if(i===Aa)return n.RED_INTEGER;if(i===Pc)return n.RG;if(i===Ra)return n.RG_INTEGER;if(i===Ca)return n.RGBA_INTEGER;if(i===_r||i===vr||i===Mr||i===Sr)if(o===rt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===_r)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===vr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Mr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Sr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===_r)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===vr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Mr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Sr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Ho||i===Go||i===Vo||i===Wo)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Ho)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Go)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Vo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Wo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Xo||i===qo||i===Yo)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Xo||i===qo)return o===rt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Yo)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===$o||i===Zo||i===Ko||i===Jo||i===jo||i===Qo||i===ea||i===ta||i===na||i===ia||i===sa||i===ra||i===oa||i===aa)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===$o)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Zo)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Ko)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Jo)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===jo)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Qo)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===ea)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===ta)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===na)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===ia)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===sa)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===ra)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===oa)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===aa)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===yr||i===la||i===ca)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===yr)return o===rt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===la)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===ca)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Lc||i===ua||i===da||i===ha)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===yr)return r.COMPRESSED_RED_RGTC1_EXT;if(i===ua)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===da)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===ha)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===es?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}class F0 extends ut{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Ke extends yt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const O0={type:"move"};class fo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ke,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ke,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new w,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new w),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ke,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new w,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new w),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,i),p=this._getHandJoint(c,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],h=u.position.distanceTo(d.position),f=.02,g=.005;c.inputState.pinching&&h>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(O0)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Ke;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const z0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,B0=`
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

}`;class k0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,i){if(this.texture===null){const s=new Bt,r=e.properties.get(s);r.__webglTexture=t.texture,(t.depthNear!=i.depthNear||t.depthFar!=i.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new Nn({vertexShader:z0,fragmentShader:B0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new H(new lt(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class H0 extends ss{constructor(e,t){super();const i=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,u=null,d=null,h=null,f=null,g=null;const _=new k0,m=t.getContextAttributes();let p=null,b=null;const x=[],M=[],L=new xe;let A=null;const R=new ut;R.viewport=new ot;const C=new ut;C.viewport=new ot;const y=[R,C],S=new F0;let P=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let se=x[X];return se===void 0&&(se=new fo,x[X]=se),se.getTargetRaySpace()},this.getControllerGrip=function(X){let se=x[X];return se===void 0&&(se=new fo,x[X]=se),se.getGripSpace()},this.getHand=function(X){let se=x[X];return se===void 0&&(se=new fo,x[X]=se),se.getHandSpace()};function z(X){const se=M.indexOf(X.inputSource);if(se===-1)return;const Ee=x[se];Ee!==void 0&&(Ee.update(X.inputSource,X.frame,c||o),Ee.dispatchEvent({type:X.type,data:X.inputSource}))}function q(){s.removeEventListener("select",z),s.removeEventListener("selectstart",z),s.removeEventListener("selectend",z),s.removeEventListener("squeeze",z),s.removeEventListener("squeezestart",z),s.removeEventListener("squeezeend",z),s.removeEventListener("end",q),s.removeEventListener("inputsourceschange",$);for(let X=0;X<x.length;X++){const se=M[X];se!==null&&(M[X]=null,x[X].disconnect(se))}P=null,O=null,_.reset(),e.setRenderTarget(p),f=null,h=null,d=null,s=null,b=null,Je.stop(),i.isPresenting=!1,e.setPixelRatio(A),e.setSize(L.width,L.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){r=X,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){a=X,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(X){c=X},this.getBaseLayer=function(){return h!==null?h:f},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(X){if(s=X,s!==null){if(p=e.getRenderTarget(),s.addEventListener("select",z),s.addEventListener("selectstart",z),s.addEventListener("selectend",z),s.addEventListener("squeeze",z),s.addEventListener("squeezestart",z),s.addEventListener("squeezeend",z),s.addEventListener("end",q),s.addEventListener("inputsourceschange",$),m.xrCompatible!==!0&&await t.makeXRCompatible(),A=e.getPixelRatio(),e.getSize(L),s.renderState.layers===void 0){const se={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,se),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),b=new Si(f.framebufferWidth,f.framebufferHeight,{format:un,type:Un,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let se=null,Ee=null,he=null;m.depth&&(he=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,se=m.stencil?ts:Yi,Ee=m.stencil?es:Mi);const De={colorFormat:t.RGBA8,depthFormat:he,scaleFactor:r};d=new XRWebGLBinding(s,t),h=d.createProjectionLayer(De),s.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),b=new Si(h.textureWidth,h.textureHeight,{format:un,type:Un,depthTexture:new Xc(h.textureWidth,h.textureHeight,Ee,void 0,void 0,void 0,void 0,void 0,void 0,se),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),Je.setContext(s),Je.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function $(X){for(let se=0;se<X.removed.length;se++){const Ee=X.removed[se],he=M.indexOf(Ee);he>=0&&(M[he]=null,x[he].disconnect(Ee))}for(let se=0;se<X.added.length;se++){const Ee=X.added[se];let he=M.indexOf(Ee);if(he===-1){for(let Oe=0;Oe<x.length;Oe++)if(Oe>=M.length){M.push(Ee),he=Oe;break}else if(M[Oe]===null){M[Oe]=Ee,he=Oe;break}if(he===-1)break}const De=x[he];De&&De.connect(Ee)}}const W=new w,Q=new w;function V(X,se,Ee){W.setFromMatrixPosition(se.matrixWorld),Q.setFromMatrixPosition(Ee.matrixWorld);const he=W.distanceTo(Q),De=se.projectionMatrix.elements,Oe=Ee.projectionMatrix.elements,We=De[14]/(De[10]-1),ft=De[14]/(De[10]+1),Ye=(De[9]+1)/De[5],_t=(De[9]-1)/De[5],N=(De[8]-1)/De[0],ae=(Oe[8]+1)/Oe[0],te=We*N,oe=We*ae,ne=he/(-N+ae),ye=ne*-N;if(se.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(ye),X.translateZ(ne),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),De[10]===-1)X.projectionMatrix.copy(se.projectionMatrix),X.projectionMatrixInverse.copy(se.projectionMatrixInverse);else{const _e=We+ne,T=ft+ne,v=te-ye,F=oe+(he-ye),Z=Ye*ft/T*_e,ee=_t*ft/T*_e;X.projectionMatrix.makePerspective(v,F,Z,ee,_e,T),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function le(X,se){se===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(se.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(s===null)return;let se=X.near,Ee=X.far;_.texture!==null&&(_.depthNear>0&&(se=_.depthNear),_.depthFar>0&&(Ee=_.depthFar)),S.near=C.near=R.near=se,S.far=C.far=R.far=Ee,(P!==S.near||O!==S.far)&&(s.updateRenderState({depthNear:S.near,depthFar:S.far}),P=S.near,O=S.far),R.layers.mask=X.layers.mask|2,C.layers.mask=X.layers.mask|4,S.layers.mask=R.layers.mask|C.layers.mask;const he=X.parent,De=S.cameras;le(S,he);for(let Oe=0;Oe<De.length;Oe++)le(De[Oe],he);De.length===2?V(S,R,C):S.projectionMatrix.copy(R.projectionMatrix),Me(X,S,he)};function Me(X,se,Ee){Ee===null?X.matrix.copy(se.matrixWorld):(X.matrix.copy(Ee.matrixWorld),X.matrix.invert(),X.matrix.multiply(se.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(se.projectionMatrix),X.projectionMatrixInverse.copy(se.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=Ls*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(h===null&&f===null))return l},this.setFoveation=function(X){l=X,h!==null&&(h.fixedFoveation=X),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=X)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(S)};let we=null;function Ve(X,se){if(u=se.getViewerPose(c||o),g=se,u!==null){const Ee=u.views;f!==null&&(e.setRenderTargetFramebuffer(b,f.framebuffer),e.setRenderTarget(b));let he=!1;Ee.length!==S.cameras.length&&(S.cameras.length=0,he=!0);for(let Oe=0;Oe<Ee.length;Oe++){const We=Ee[Oe];let ft=null;if(f!==null)ft=f.getViewport(We);else{const _t=d.getViewSubImage(h,We);ft=_t.viewport,Oe===0&&(e.setRenderTargetTextures(b,_t.colorTexture,h.ignoreDepthValues?void 0:_t.depthStencilTexture),e.setRenderTarget(b))}let Ye=y[Oe];Ye===void 0&&(Ye=new ut,Ye.layers.enable(Oe),Ye.viewport=new ot,y[Oe]=Ye),Ye.matrix.fromArray(We.transform.matrix),Ye.matrix.decompose(Ye.position,Ye.quaternion,Ye.scale),Ye.projectionMatrix.fromArray(We.projectionMatrix),Ye.projectionMatrixInverse.copy(Ye.projectionMatrix).invert(),Ye.viewport.set(ft.x,ft.y,ft.width,ft.height),Oe===0&&(S.matrix.copy(Ye.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),he===!0&&S.cameras.push(Ye)}const De=s.enabledFeatures;if(De&&De.includes("depth-sensing")){const Oe=d.getDepthInformation(Ee[0]);Oe&&Oe.isValid&&Oe.texture&&_.init(e,Oe,s.renderState)}}for(let Ee=0;Ee<x.length;Ee++){const he=M[Ee],De=x[Ee];he!==null&&De!==void 0&&De.update(he,se,c||o)}we&&we(X,se),se.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:se}),g=null}const Je=new Vc;Je.setAnimationLoop(Ve),this.setAnimationLoop=function(X){we=X},this.dispose=function(){}}}const ri=new vn,G0=new at;function V0(n,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,kc(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,b,x,M){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),d(m,p)):p.isMeshPhongMaterial?(r(m,p),u(m,p)):p.isMeshStandardMaterial?(r(m,p),h(m,p),p.isMeshPhysicalMaterial&&f(m,p,M)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,b,x):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Dt&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Dt&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const b=e.get(p),x=b.envMap,M=b.envMapRotation;x&&(m.envMap.value=x,ri.copy(M),ri.x*=-1,ri.y*=-1,ri.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(ri.y*=-1,ri.z*=-1),m.envMapRotation.value.setFromMatrix4(G0.makeRotationFromEuler(ri)),m.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,b,x){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*b,m.scale.value=x*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function h(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,b){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Dt&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const b=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function W0(n,e,t,i){let s={},r={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(b,x){const M=x.program;i.uniformBlockBinding(b,M)}function c(b,x){let M=s[b.id];M===void 0&&(g(b),M=u(b),s[b.id]=M,b.addEventListener("dispose",m));const L=x.program;i.updateUBOMapping(b,L);const A=e.render.frame;r[b.id]!==A&&(h(b),r[b.id]=A)}function u(b){const x=d();b.__bindingPointIndex=x;const M=n.createBuffer(),L=b.__size,A=b.usage;return n.bindBuffer(n.UNIFORM_BUFFER,M),n.bufferData(n.UNIFORM_BUFFER,L,A),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,x,M),M}function d(){for(let b=0;b<a;b++)if(o.indexOf(b)===-1)return o.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(b){const x=s[b.id],M=b.uniforms,L=b.__cache;n.bindBuffer(n.UNIFORM_BUFFER,x);for(let A=0,R=M.length;A<R;A++){const C=Array.isArray(M[A])?M[A]:[M[A]];for(let y=0,S=C.length;y<S;y++){const P=C[y];if(f(P,A,y,L)===!0){const O=P.__offset,z=Array.isArray(P.value)?P.value:[P.value];let q=0;for(let $=0;$<z.length;$++){const W=z[$],Q=_(W);typeof W=="number"||typeof W=="boolean"?(P.__data[0]=W,n.bufferSubData(n.UNIFORM_BUFFER,O+q,P.__data)):W.isMatrix3?(P.__data[0]=W.elements[0],P.__data[1]=W.elements[1],P.__data[2]=W.elements[2],P.__data[3]=0,P.__data[4]=W.elements[3],P.__data[5]=W.elements[4],P.__data[6]=W.elements[5],P.__data[7]=0,P.__data[8]=W.elements[6],P.__data[9]=W.elements[7],P.__data[10]=W.elements[8],P.__data[11]=0):(W.toArray(P.__data,q),q+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,O,P.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(b,x,M,L){const A=b.value,R=x+"_"+M;if(L[R]===void 0)return typeof A=="number"||typeof A=="boolean"?L[R]=A:L[R]=A.clone(),!0;{const C=L[R];if(typeof A=="number"||typeof A=="boolean"){if(C!==A)return L[R]=A,!0}else if(C.equals(A)===!1)return C.copy(A),!0}return!1}function g(b){const x=b.uniforms;let M=0;const L=16;for(let R=0,C=x.length;R<C;R++){const y=Array.isArray(x[R])?x[R]:[x[R]];for(let S=0,P=y.length;S<P;S++){const O=y[S],z=Array.isArray(O.value)?O.value:[O.value];for(let q=0,$=z.length;q<$;q++){const W=z[q],Q=_(W),V=M%L,le=V%Q.boundary,Me=V+le;M+=le,Me!==0&&L-Me<Q.storage&&(M+=L-Me),O.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=M,M+=Q.storage}}}const A=M%L;return A>0&&(M+=L-A),b.__size=M,b.__cache={},this}function _(b){const x={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(x.boundary=4,x.storage=4):b.isVector2?(x.boundary=8,x.storage=8):b.isVector3||b.isColor?(x.boundary=16,x.storage=12):b.isVector4?(x.boundary=16,x.storage=16):b.isMatrix3?(x.boundary=48,x.storage=48):b.isMatrix4?(x.boundary=64,x.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),x}function m(b){const x=b.target;x.removeEventListener("dispose",m);const M=o.indexOf(x.__bindingPointIndex);o.splice(M,1),n.deleteBuffer(s[x.id]),delete s[x.id],delete r[x.id]}function p(){for(const b in s)n.deleteBuffer(s[b]);o=[],s={},r={}}return{bind:l,update:c,dispose:p}}class Kc{constructor(e={}){const{canvas:t=Id(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:h=!1}=e;this.isWebGLRenderer=!0;let f;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=i.getContextAttributes().alpha}else f=o;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,p=null;const b=[],x=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Et,this.toneMapping=Kn,this.toneMappingExposure=1;const M=this;let L=!1,A=0,R=0,C=null,y=-1,S=null;const P=new ot,O=new ot;let z=null;const q=new Ue(0);let $=0,W=t.width,Q=t.height,V=1,le=null,Me=null;const we=new ot(0,0,W,Q),Ve=new ot(0,0,W,Q);let Je=!1;const X=new Ia;let se=!1,Ee=!1;const he=new at,De=new at,Oe=new w,We=new ot,ft={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ye=!1;function _t(){return C===null?V:1}let N=i;function ae(E,D){return t.getContext(E,D)}try{const E={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${ya}`),t.addEventListener("webglcontextlost",j,!1),t.addEventListener("webglcontextrestored",pe,!1),t.addEventListener("webglcontextcreationerror",me,!1),N===null){const D="webgl2";if(N=ae(D,E),N===null)throw ae(D)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let te,oe,ne,ye,_e,T,v,F,Z,ee,Y,Te,de,Se,K,J,fe,Ae,Le,ve,qe,Be,je,I;function ce(){te=new Kp(N),te.init(),Be=new N0(N,te),oe=new Wp(N,te,e,Be),ne=new I0(N,te),oe.reverseDepthBuffer&&h&&ne.buffers.depth.setReversed(!0),ye=new Qp(N),_e=new _0,T=new U0(N,te,ne,_e,oe,Be,ye),v=new qp(M),F=new Zp(M),Z=new rh(N),je=new Gp(N,Z),ee=new Jp(N,Z,ye,je),Y=new tm(N,ee,Z,ye),Le=new em(N,oe,T),J=new Xp(_e),Te=new g0(M,v,F,te,oe,je,J),de=new V0(M,_e),Se=new M0,K=new w0(te),Ae=new Hp(M,v,F,ne,Y,f,l),fe=new P0(M,Y,oe),I=new W0(N,ye,oe,ne),ve=new Vp(N,te,ye),qe=new jp(N,te,ye),ye.programs=Te.programs,M.capabilities=oe,M.extensions=te,M.properties=_e,M.renderLists=Se,M.shadowMap=fe,M.state=ne,M.info=ye}ce();const G=new H0(M,N);this.xr=G,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const E=te.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=te.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(E){E!==void 0&&(V=E,this.setSize(W,Q,!1))},this.getSize=function(E){return E.set(W,Q)},this.setSize=function(E,D,B=!0){if(G.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}W=E,Q=D,t.width=Math.floor(E*V),t.height=Math.floor(D*V),B===!0&&(t.style.width=E+"px",t.style.height=D+"px"),this.setViewport(0,0,E,D)},this.getDrawingBufferSize=function(E){return E.set(W*V,Q*V).floor()},this.setDrawingBufferSize=function(E,D,B){W=E,Q=D,V=B,t.width=Math.floor(E*B),t.height=Math.floor(D*B),this.setViewport(0,0,E,D)},this.getCurrentViewport=function(E){return E.copy(P)},this.getViewport=function(E){return E.copy(we)},this.setViewport=function(E,D,B,k){E.isVector4?we.set(E.x,E.y,E.z,E.w):we.set(E,D,B,k),ne.viewport(P.copy(we).multiplyScalar(V).round())},this.getScissor=function(E){return E.copy(Ve)},this.setScissor=function(E,D,B,k){E.isVector4?Ve.set(E.x,E.y,E.z,E.w):Ve.set(E,D,B,k),ne.scissor(O.copy(Ve).multiplyScalar(V).round())},this.getScissorTest=function(){return Je},this.setScissorTest=function(E){ne.setScissorTest(Je=E)},this.setOpaqueSort=function(E){le=E},this.setTransparentSort=function(E){Me=E},this.getClearColor=function(E){return E.copy(Ae.getClearColor())},this.setClearColor=function(){Ae.setClearColor.apply(Ae,arguments)},this.getClearAlpha=function(){return Ae.getClearAlpha()},this.setClearAlpha=function(){Ae.setClearAlpha.apply(Ae,arguments)},this.clear=function(E=!0,D=!0,B=!0){let k=0;if(E){let U=!1;if(C!==null){const re=C.texture.format;U=re===Ca||re===Ra||re===Aa}if(U){const re=C.texture.type,ge=re===Un||re===Mi||re===Ps||re===es||re===wa||re===Ta,Re=Ae.getClearColor(),Ce=Ae.getClearAlpha(),ze=Re.r,He=Re.g,Pe=Re.b;ge?(g[0]=ze,g[1]=He,g[2]=Pe,g[3]=Ce,N.clearBufferuiv(N.COLOR,0,g)):(_[0]=ze,_[1]=He,_[2]=Pe,_[3]=Ce,N.clearBufferiv(N.COLOR,0,_))}else k|=N.COLOR_BUFFER_BIT}D&&(k|=N.DEPTH_BUFFER_BIT),B&&(k|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),N.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",j,!1),t.removeEventListener("webglcontextrestored",pe,!1),t.removeEventListener("webglcontextcreationerror",me,!1),Se.dispose(),K.dispose(),_e.dispose(),v.dispose(),F.dispose(),Y.dispose(),je.dispose(),I.dispose(),Te.dispose(),G.dispose(),G.removeEventListener("sessionstart",Va),G.removeEventListener("sessionend",Wa),Qn.stop()};function j(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),L=!0}function pe(){console.log("THREE.WebGLRenderer: Context Restored."),L=!1;const E=ye.autoReset,D=fe.enabled,B=fe.autoUpdate,k=fe.needsUpdate,U=fe.type;ce(),ye.autoReset=E,fe.enabled=D,fe.autoUpdate=B,fe.needsUpdate=k,fe.type=U}function me(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function ke(E){const D=E.target;D.removeEventListener("dispose",ke),vt(D)}function vt(E){Ct(E),_e.remove(E)}function Ct(E){const D=_e.get(E).programs;D!==void 0&&(D.forEach(function(B){Te.releaseProgram(B)}),E.isShaderMaterial&&Te.releaseShaderCache(E))}this.renderBufferDirect=function(E,D,B,k,U,re){D===null&&(D=ft);const ge=U.isMesh&&U.matrixWorld.determinant()<0,Re=vu(E,D,B,k,U);ne.setMaterial(k,ge);let Ce=B.index,ze=1;if(k.wireframe===!0){if(Ce=ee.getWireframeAttribute(B),Ce===void 0)return;ze=2}const He=B.drawRange,Pe=B.attributes.position;let Ze=He.start*ze,ct=(He.start+He.count)*ze;re!==null&&(Ze=Math.max(Ze,re.start*ze),ct=Math.min(ct,(re.start+re.count)*ze)),Ce!==null?(Ze=Math.max(Ze,0),ct=Math.min(ct,Ce.count)):Pe!=null&&(Ze=Math.max(Ze,0),ct=Math.min(ct,Pe.count));const pt=ct-Ze;if(pt<0||pt===1/0)return;je.setup(U,k,Re,B,Ce);let kt,Qe=ve;if(Ce!==null&&(kt=Z.get(Ce),Qe=qe,Qe.setIndex(kt)),U.isMesh)k.wireframe===!0?(ne.setLineWidth(k.wireframeLinewidth*_t()),Qe.setMode(N.LINES)):Qe.setMode(N.TRIANGLES);else if(U.isLine){let Ie=k.linewidth;Ie===void 0&&(Ie=1),ne.setLineWidth(Ie*_t()),U.isLineSegments?Qe.setMode(N.LINES):U.isLineLoop?Qe.setMode(N.LINE_LOOP):Qe.setMode(N.LINE_STRIP)}else U.isPoints?Qe.setMode(N.POINTS):U.isSprite&&Qe.setMode(N.TRIANGLES);if(U.isBatchedMesh)if(U._multiDrawInstances!==null)Qe.renderMultiDrawInstances(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount,U._multiDrawInstances);else if(te.get("WEBGL_multi_draw"))Qe.renderMultiDraw(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount);else{const Ie=U._multiDrawStarts,yn=U._multiDrawCounts,et=U._multiDrawCount,Qt=Ce?Z.get(Ce).bytesPerElement:1,wi=_e.get(k).currentProgram.getUniforms();for(let Gt=0;Gt<et;Gt++)wi.setValue(N,"_gl_DrawID",Gt),Qe.render(Ie[Gt]/Qt,yn[Gt])}else if(U.isInstancedMesh)Qe.renderInstances(Ze,pt,U.count);else if(B.isInstancedBufferGeometry){const Ie=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,yn=Math.min(B.instanceCount,Ie);Qe.renderInstances(Ze,pt,yn)}else Qe.render(Ze,pt)};function tt(E,D,B){E.transparent===!0&&E.side===on&&E.forceSinglePass===!1?(E.side=Dt,E.needsUpdate=!0,Hs(E,D,B),E.side=Jn,E.needsUpdate=!0,Hs(E,D,B),E.side=on):Hs(E,D,B)}this.compile=function(E,D,B=null){B===null&&(B=E),p=K.get(B),p.init(D),x.push(p),B.traverseVisible(function(U){U.isLight&&U.layers.test(D.layers)&&(p.pushLight(U),U.castShadow&&p.pushShadow(U))}),E!==B&&E.traverseVisible(function(U){U.isLight&&U.layers.test(D.layers)&&(p.pushLight(U),U.castShadow&&p.pushShadow(U))}),p.setupLights();const k=new Set;return E.traverse(function(U){if(!(U.isMesh||U.isPoints||U.isLine||U.isSprite))return;const re=U.material;if(re)if(Array.isArray(re))for(let ge=0;ge<re.length;ge++){const Re=re[ge];tt(Re,B,U),k.add(Re)}else tt(re,B,U),k.add(re)}),x.pop(),p=null,k},this.compileAsync=function(E,D,B=null){const k=this.compile(E,D,B);return new Promise(U=>{function re(){if(k.forEach(function(ge){_e.get(ge).currentProgram.isReady()&&k.delete(ge)}),k.size===0){U(E);return}setTimeout(re,10)}te.get("KHR_parallel_shader_compile")!==null?re():setTimeout(re,10)})};let jt=null;function Sn(E){jt&&jt(E)}function Va(){Qn.stop()}function Wa(){Qn.start()}const Qn=new Vc;Qn.setAnimationLoop(Sn),typeof self<"u"&&Qn.setContext(self),this.setAnimationLoop=function(E){jt=E,G.setAnimationLoop(E),E===null?Qn.stop():Qn.start()},G.addEventListener("sessionstart",Va),G.addEventListener("sessionend",Wa),this.render=function(E,D){if(D!==void 0&&D.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),G.enabled===!0&&G.isPresenting===!0&&(G.cameraAutoUpdate===!0&&G.updateCamera(D),D=G.getCamera()),E.isScene===!0&&E.onBeforeRender(M,E,D,C),p=K.get(E,x.length),p.init(D),x.push(p),De.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),X.setFromProjectionMatrix(De),Ee=this.localClippingEnabled,se=J.init(this.clippingPlanes,Ee),m=Se.get(E,b.length),m.init(),b.push(m),G.enabled===!0&&G.isPresenting===!0){const re=M.xr.getDepthSensingMesh();re!==null&&zr(re,D,-1/0,M.sortObjects)}zr(E,D,0,M.sortObjects),m.finish(),M.sortObjects===!0&&m.sort(le,Me),Ye=G.enabled===!1||G.isPresenting===!1||G.hasDepthSensing()===!1,Ye&&Ae.addToRenderList(m,E),this.info.render.frame++,se===!0&&J.beginShadows();const B=p.state.shadowsArray;fe.render(B,E,D),se===!0&&J.endShadows(),this.info.autoReset===!0&&this.info.reset();const k=m.opaque,U=m.transmissive;if(p.setupLights(),D.isArrayCamera){const re=D.cameras;if(U.length>0)for(let ge=0,Re=re.length;ge<Re;ge++){const Ce=re[ge];qa(k,U,E,Ce)}Ye&&Ae.render(E);for(let ge=0,Re=re.length;ge<Re;ge++){const Ce=re[ge];Xa(m,E,Ce,Ce.viewport)}}else U.length>0&&qa(k,U,E,D),Ye&&Ae.render(E),Xa(m,E,D);C!==null&&(T.updateMultisampleRenderTarget(C),T.updateRenderTargetMipmap(C)),E.isScene===!0&&E.onAfterRender(M,E,D),je.resetDefaultState(),y=-1,S=null,x.pop(),x.length>0?(p=x[x.length-1],se===!0&&J.setGlobalState(M.clippingPlanes,p.state.camera)):p=null,b.pop(),b.length>0?m=b[b.length-1]:m=null};function zr(E,D,B,k){if(E.visible===!1)return;if(E.layers.test(D.layers)){if(E.isGroup)B=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(D);else if(E.isLight)p.pushLight(E),E.castShadow&&p.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||X.intersectsSprite(E)){k&&We.setFromMatrixPosition(E.matrixWorld).applyMatrix4(De);const ge=Y.update(E),Re=E.material;Re.visible&&m.push(E,ge,Re,B,We.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||X.intersectsObject(E))){const ge=Y.update(E),Re=E.material;if(k&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),We.copy(E.boundingSphere.center)):(ge.boundingSphere===null&&ge.computeBoundingSphere(),We.copy(ge.boundingSphere.center)),We.applyMatrix4(E.matrixWorld).applyMatrix4(De)),Array.isArray(Re)){const Ce=ge.groups;for(let ze=0,He=Ce.length;ze<He;ze++){const Pe=Ce[ze],Ze=Re[Pe.materialIndex];Ze&&Ze.visible&&m.push(E,ge,Ze,B,We.z,Pe)}}else Re.visible&&m.push(E,ge,Re,B,We.z,null)}}const re=E.children;for(let ge=0,Re=re.length;ge<Re;ge++)zr(re[ge],D,B,k)}function Xa(E,D,B,k){const U=E.opaque,re=E.transmissive,ge=E.transparent;p.setupLightsView(B),se===!0&&J.setGlobalState(M.clippingPlanes,B),k&&ne.viewport(P.copy(k)),U.length>0&&ks(U,D,B),re.length>0&&ks(re,D,B),ge.length>0&&ks(ge,D,B),ne.buffers.depth.setTest(!0),ne.buffers.depth.setMask(!0),ne.buffers.color.setMask(!0),ne.setPolygonOffset(!1)}function qa(E,D,B,k){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[k.id]===void 0&&(p.state.transmissionRenderTarget[k.id]=new Si(1,1,{generateMipmaps:!0,type:te.has("EXT_color_buffer_half_float")||te.has("EXT_color_buffer_float")?Us:Un,minFilter:gi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:$e.workingColorSpace}));const re=p.state.transmissionRenderTarget[k.id],ge=k.viewport||P;re.setSize(ge.z,ge.w);const Re=M.getRenderTarget();M.setRenderTarget(re),M.getClearColor(q),$=M.getClearAlpha(),$<1&&M.setClearColor(16777215,.5),M.clear(),Ye&&Ae.render(B);const Ce=M.toneMapping;M.toneMapping=Kn;const ze=k.viewport;if(k.viewport!==void 0&&(k.viewport=void 0),p.setupLightsView(k),se===!0&&J.setGlobalState(M.clippingPlanes,k),ks(E,B,k),T.updateMultisampleRenderTarget(re),T.updateRenderTargetMipmap(re),te.has("WEBGL_multisampled_render_to_texture")===!1){let He=!1;for(let Pe=0,Ze=D.length;Pe<Ze;Pe++){const ct=D[Pe],pt=ct.object,kt=ct.geometry,Qe=ct.material,Ie=ct.group;if(Qe.side===on&&pt.layers.test(k.layers)){const yn=Qe.side;Qe.side=Dt,Qe.needsUpdate=!0,Ya(pt,B,k,kt,Qe,Ie),Qe.side=yn,Qe.needsUpdate=!0,He=!0}}He===!0&&(T.updateMultisampleRenderTarget(re),T.updateRenderTargetMipmap(re))}M.setRenderTarget(Re),M.setClearColor(q,$),ze!==void 0&&(k.viewport=ze),M.toneMapping=Ce}function ks(E,D,B){const k=D.isScene===!0?D.overrideMaterial:null;for(let U=0,re=E.length;U<re;U++){const ge=E[U],Re=ge.object,Ce=ge.geometry,ze=k===null?ge.material:k,He=ge.group;Re.layers.test(B.layers)&&Ya(Re,D,B,Ce,ze,He)}}function Ya(E,D,B,k,U,re){E.onBeforeRender(M,D,B,k,U,re),E.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),U.onBeforeRender(M,D,B,k,E,re),U.transparent===!0&&U.side===on&&U.forceSinglePass===!1?(U.side=Dt,U.needsUpdate=!0,M.renderBufferDirect(B,D,k,U,E,re),U.side=Jn,U.needsUpdate=!0,M.renderBufferDirect(B,D,k,U,E,re),U.side=on):M.renderBufferDirect(B,D,k,U,E,re),E.onAfterRender(M,D,B,k,U,re)}function Hs(E,D,B){D.isScene!==!0&&(D=ft);const k=_e.get(E),U=p.state.lights,re=p.state.shadowsArray,ge=U.state.version,Re=Te.getParameters(E,U.state,re,D,B),Ce=Te.getProgramCacheKey(Re);let ze=k.programs;k.environment=E.isMeshStandardMaterial?D.environment:null,k.fog=D.fog,k.envMap=(E.isMeshStandardMaterial?F:v).get(E.envMap||k.environment),k.envMapRotation=k.environment!==null&&E.envMap===null?D.environmentRotation:E.envMapRotation,ze===void 0&&(E.addEventListener("dispose",ke),ze=new Map,k.programs=ze);let He=ze.get(Ce);if(He!==void 0){if(k.currentProgram===He&&k.lightsStateVersion===ge)return Za(E,Re),He}else Re.uniforms=Te.getUniforms(E),E.onBeforeCompile(Re,M),He=Te.acquireProgram(Re,Ce),ze.set(Ce,He),k.uniforms=Re.uniforms;const Pe=k.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Pe.clippingPlanes=J.uniform),Za(E,Re),k.needsLights=Su(E),k.lightsStateVersion=ge,k.needsLights&&(Pe.ambientLightColor.value=U.state.ambient,Pe.lightProbe.value=U.state.probe,Pe.directionalLights.value=U.state.directional,Pe.directionalLightShadows.value=U.state.directionalShadow,Pe.spotLights.value=U.state.spot,Pe.spotLightShadows.value=U.state.spotShadow,Pe.rectAreaLights.value=U.state.rectArea,Pe.ltc_1.value=U.state.rectAreaLTC1,Pe.ltc_2.value=U.state.rectAreaLTC2,Pe.pointLights.value=U.state.point,Pe.pointLightShadows.value=U.state.pointShadow,Pe.hemisphereLights.value=U.state.hemi,Pe.directionalShadowMap.value=U.state.directionalShadowMap,Pe.directionalShadowMatrix.value=U.state.directionalShadowMatrix,Pe.spotShadowMap.value=U.state.spotShadowMap,Pe.spotLightMatrix.value=U.state.spotLightMatrix,Pe.spotLightMap.value=U.state.spotLightMap,Pe.pointShadowMap.value=U.state.pointShadowMap,Pe.pointShadowMatrix.value=U.state.pointShadowMatrix),k.currentProgram=He,k.uniformsList=null,He}function $a(E){if(E.uniformsList===null){const D=E.currentProgram.getUniforms();E.uniformsList=xr.seqWithValue(D.seq,E.uniforms)}return E.uniformsList}function Za(E,D){const B=_e.get(E);B.outputColorSpace=D.outputColorSpace,B.batching=D.batching,B.batchingColor=D.batchingColor,B.instancing=D.instancing,B.instancingColor=D.instancingColor,B.instancingMorph=D.instancingMorph,B.skinning=D.skinning,B.morphTargets=D.morphTargets,B.morphNormals=D.morphNormals,B.morphColors=D.morphColors,B.morphTargetsCount=D.morphTargetsCount,B.numClippingPlanes=D.numClippingPlanes,B.numIntersection=D.numClipIntersection,B.vertexAlphas=D.vertexAlphas,B.vertexTangents=D.vertexTangents,B.toneMapping=D.toneMapping}function vu(E,D,B,k,U){D.isScene!==!0&&(D=ft),T.resetTextureUnits();const re=D.fog,ge=k.isMeshStandardMaterial?D.environment:null,Re=C===null?M.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:is,Ce=(k.isMeshStandardMaterial?F:v).get(k.envMap||ge),ze=k.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,He=!!B.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),Pe=!!B.morphAttributes.position,Ze=!!B.morphAttributes.normal,ct=!!B.morphAttributes.color;let pt=Kn;k.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(pt=M.toneMapping);const kt=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,Qe=kt!==void 0?kt.length:0,Ie=_e.get(k),yn=p.state.lights;if(se===!0&&(Ee===!0||E!==S)){const $t=E===S&&k.id===y;J.setState(k,E,$t)}let et=!1;k.version===Ie.__version?(Ie.needsLights&&Ie.lightsStateVersion!==yn.state.version||Ie.outputColorSpace!==Re||U.isBatchedMesh&&Ie.batching===!1||!U.isBatchedMesh&&Ie.batching===!0||U.isBatchedMesh&&Ie.batchingColor===!0&&U.colorTexture===null||U.isBatchedMesh&&Ie.batchingColor===!1&&U.colorTexture!==null||U.isInstancedMesh&&Ie.instancing===!1||!U.isInstancedMesh&&Ie.instancing===!0||U.isSkinnedMesh&&Ie.skinning===!1||!U.isSkinnedMesh&&Ie.skinning===!0||U.isInstancedMesh&&Ie.instancingColor===!0&&U.instanceColor===null||U.isInstancedMesh&&Ie.instancingColor===!1&&U.instanceColor!==null||U.isInstancedMesh&&Ie.instancingMorph===!0&&U.morphTexture===null||U.isInstancedMesh&&Ie.instancingMorph===!1&&U.morphTexture!==null||Ie.envMap!==Ce||k.fog===!0&&Ie.fog!==re||Ie.numClippingPlanes!==void 0&&(Ie.numClippingPlanes!==J.numPlanes||Ie.numIntersection!==J.numIntersection)||Ie.vertexAlphas!==ze||Ie.vertexTangents!==He||Ie.morphTargets!==Pe||Ie.morphNormals!==Ze||Ie.morphColors!==ct||Ie.toneMapping!==pt||Ie.morphTargetsCount!==Qe)&&(et=!0):(et=!0,Ie.__version=k.version);let Qt=Ie.currentProgram;et===!0&&(Qt=Hs(k,D,U));let wi=!1,Gt=!1,ls=!1;const mt=Qt.getUniforms(),fn=Ie.uniforms;if(ne.useProgram(Qt.program)&&(wi=!0,Gt=!0,ls=!0),k.id!==y&&(y=k.id,Gt=!0),wi||S!==E){ne.buffers.depth.getReversed()?(he.copy(E.projectionMatrix),Ud(he),Nd(he),mt.setValue(N,"projectionMatrix",he)):mt.setValue(N,"projectionMatrix",E.projectionMatrix),mt.setValue(N,"viewMatrix",E.matrixWorldInverse);const On=mt.map.cameraPosition;On!==void 0&&On.setValue(N,Oe.setFromMatrixPosition(E.matrixWorld)),oe.logarithmicDepthBuffer&&mt.setValue(N,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&mt.setValue(N,"isOrthographic",E.isOrthographicCamera===!0),S!==E&&(S=E,Gt=!0,ls=!0)}if(U.isSkinnedMesh){mt.setOptional(N,U,"bindMatrix"),mt.setOptional(N,U,"bindMatrixInverse");const $t=U.skeleton;$t&&($t.boneTexture===null&&$t.computeBoneTexture(),mt.setValue(N,"boneTexture",$t.boneTexture,T))}U.isBatchedMesh&&(mt.setOptional(N,U,"batchingTexture"),mt.setValue(N,"batchingTexture",U._matricesTexture,T),mt.setOptional(N,U,"batchingIdTexture"),mt.setValue(N,"batchingIdTexture",U._indirectTexture,T),mt.setOptional(N,U,"batchingColorTexture"),U._colorsTexture!==null&&mt.setValue(N,"batchingColorTexture",U._colorsTexture,T));const cs=B.morphAttributes;if((cs.position!==void 0||cs.normal!==void 0||cs.color!==void 0)&&Le.update(U,B,Qt),(Gt||Ie.receiveShadow!==U.receiveShadow)&&(Ie.receiveShadow=U.receiveShadow,mt.setValue(N,"receiveShadow",U.receiveShadow)),k.isMeshGouraudMaterial&&k.envMap!==null&&(fn.envMap.value=Ce,fn.flipEnvMap.value=Ce.isCubeTexture&&Ce.isRenderTargetTexture===!1?-1:1),k.isMeshStandardMaterial&&k.envMap===null&&D.environment!==null&&(fn.envMapIntensity.value=D.environmentIntensity),Gt&&(mt.setValue(N,"toneMappingExposure",M.toneMappingExposure),Ie.needsLights&&Mu(fn,ls),re&&k.fog===!0&&de.refreshFogUniforms(fn,re),de.refreshMaterialUniforms(fn,k,V,Q,p.state.transmissionRenderTarget[E.id]),xr.upload(N,$a(Ie),fn,T)),k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(xr.upload(N,$a(Ie),fn,T),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&mt.setValue(N,"center",U.center),mt.setValue(N,"modelViewMatrix",U.modelViewMatrix),mt.setValue(N,"normalMatrix",U.normalMatrix),mt.setValue(N,"modelMatrix",U.matrixWorld),k.isShaderMaterial||k.isRawShaderMaterial){const $t=k.uniformsGroups;for(let On=0,zn=$t.length;On<zn;On++){const Ka=$t[On];I.update(Ka,Qt),I.bind(Ka,Qt)}}return Qt}function Mu(E,D){E.ambientLightColor.needsUpdate=D,E.lightProbe.needsUpdate=D,E.directionalLights.needsUpdate=D,E.directionalLightShadows.needsUpdate=D,E.pointLights.needsUpdate=D,E.pointLightShadows.needsUpdate=D,E.spotLights.needsUpdate=D,E.spotLightShadows.needsUpdate=D,E.rectAreaLights.needsUpdate=D,E.hemisphereLights.needsUpdate=D}function Su(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(E,D,B){_e.get(E.texture).__webglTexture=D,_e.get(E.depthTexture).__webglTexture=B;const k=_e.get(E);k.__hasExternalTextures=!0,k.__autoAllocateDepthBuffer=B===void 0,k.__autoAllocateDepthBuffer||te.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),k.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(E,D){const B=_e.get(E);B.__webglFramebuffer=D,B.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(E,D=0,B=0){C=E,A=D,R=B;let k=!0,U=null,re=!1,ge=!1;if(E){const Ce=_e.get(E);if(Ce.__useDefaultFramebuffer!==void 0)ne.bindFramebuffer(N.FRAMEBUFFER,null),k=!1;else if(Ce.__webglFramebuffer===void 0)T.setupRenderTarget(E);else if(Ce.__hasExternalTextures)T.rebindTextures(E,_e.get(E.texture).__webglTexture,_e.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const Pe=E.depthTexture;if(Ce.__boundDepthTexture!==Pe){if(Pe!==null&&_e.has(Pe)&&(E.width!==Pe.image.width||E.height!==Pe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");T.setupDepthRenderbuffer(E)}}const ze=E.texture;(ze.isData3DTexture||ze.isDataArrayTexture||ze.isCompressedArrayTexture)&&(ge=!0);const He=_e.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(He[D])?U=He[D][B]:U=He[D],re=!0):E.samples>0&&T.useMultisampledRTT(E)===!1?U=_e.get(E).__webglMultisampledFramebuffer:Array.isArray(He)?U=He[B]:U=He,P.copy(E.viewport),O.copy(E.scissor),z=E.scissorTest}else P.copy(we).multiplyScalar(V).floor(),O.copy(Ve).multiplyScalar(V).floor(),z=Je;if(ne.bindFramebuffer(N.FRAMEBUFFER,U)&&k&&ne.drawBuffers(E,U),ne.viewport(P),ne.scissor(O),ne.setScissorTest(z),re){const Ce=_e.get(E.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+D,Ce.__webglTexture,B)}else if(ge){const Ce=_e.get(E.texture),ze=D||0;N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,Ce.__webglTexture,B||0,ze)}y=-1},this.readRenderTargetPixels=function(E,D,B,k,U,re,ge){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Re=_e.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&ge!==void 0&&(Re=Re[ge]),Re){ne.bindFramebuffer(N.FRAMEBUFFER,Re);try{const Ce=E.texture,ze=Ce.format,He=Ce.type;if(!oe.textureFormatReadable(ze)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!oe.textureTypeReadable(He)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=E.width-k&&B>=0&&B<=E.height-U&&N.readPixels(D,B,k,U,Be.convert(ze),Be.convert(He),re)}finally{const Ce=C!==null?_e.get(C).__webglFramebuffer:null;ne.bindFramebuffer(N.FRAMEBUFFER,Ce)}}},this.readRenderTargetPixelsAsync=async function(E,D,B,k,U,re,ge){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Re=_e.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&ge!==void 0&&(Re=Re[ge]),Re){const Ce=E.texture,ze=Ce.format,He=Ce.type;if(!oe.textureFormatReadable(ze))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!oe.textureTypeReadable(He))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(D>=0&&D<=E.width-k&&B>=0&&B<=E.height-U){ne.bindFramebuffer(N.FRAMEBUFFER,Re);const Pe=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,Pe),N.bufferData(N.PIXEL_PACK_BUFFER,re.byteLength,N.STREAM_READ),N.readPixels(D,B,k,U,Be.convert(ze),Be.convert(He),0);const Ze=C!==null?_e.get(C).__webglFramebuffer:null;ne.bindFramebuffer(N.FRAMEBUFFER,Ze);const ct=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await Dd(N,ct,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,Pe),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,re),N.deleteBuffer(Pe),N.deleteSync(ct),re}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(E,D=null,B=0){E.isTexture!==!0&&(Ss("WebGLRenderer: copyFramebufferToTexture function signature has changed."),D=arguments[0]||null,E=arguments[1]);const k=Math.pow(2,-B),U=Math.floor(E.image.width*k),re=Math.floor(E.image.height*k),ge=D!==null?D.x:0,Re=D!==null?D.y:0;T.setTexture2D(E,0),N.copyTexSubImage2D(N.TEXTURE_2D,B,0,0,ge,Re,U,re),ne.unbindTexture()},this.copyTextureToTexture=function(E,D,B=null,k=null,U=0){E.isTexture!==!0&&(Ss("WebGLRenderer: copyTextureToTexture function signature has changed."),k=arguments[0]||null,E=arguments[1],D=arguments[2],U=arguments[3]||0,B=null);let re,ge,Re,Ce,ze,He,Pe,Ze,ct;const pt=E.isCompressedTexture?E.mipmaps[U]:E.image;B!==null?(re=B.max.x-B.min.x,ge=B.max.y-B.min.y,Re=B.isBox3?B.max.z-B.min.z:1,Ce=B.min.x,ze=B.min.y,He=B.isBox3?B.min.z:0):(re=pt.width,ge=pt.height,Re=pt.depth||1,Ce=0,ze=0,He=0),k!==null?(Pe=k.x,Ze=k.y,ct=k.z):(Pe=0,Ze=0,ct=0);const kt=Be.convert(D.format),Qe=Be.convert(D.type);let Ie;D.isData3DTexture?(T.setTexture3D(D,0),Ie=N.TEXTURE_3D):D.isDataArrayTexture||D.isCompressedArrayTexture?(T.setTexture2DArray(D,0),Ie=N.TEXTURE_2D_ARRAY):(T.setTexture2D(D,0),Ie=N.TEXTURE_2D),N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,D.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,D.unpackAlignment);const yn=N.getParameter(N.UNPACK_ROW_LENGTH),et=N.getParameter(N.UNPACK_IMAGE_HEIGHT),Qt=N.getParameter(N.UNPACK_SKIP_PIXELS),wi=N.getParameter(N.UNPACK_SKIP_ROWS),Gt=N.getParameter(N.UNPACK_SKIP_IMAGES);N.pixelStorei(N.UNPACK_ROW_LENGTH,pt.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,pt.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,Ce),N.pixelStorei(N.UNPACK_SKIP_ROWS,ze),N.pixelStorei(N.UNPACK_SKIP_IMAGES,He);const ls=E.isDataArrayTexture||E.isData3DTexture,mt=D.isDataArrayTexture||D.isData3DTexture;if(E.isRenderTargetTexture||E.isDepthTexture){const fn=_e.get(E),cs=_e.get(D),$t=_e.get(fn.__renderTarget),On=_e.get(cs.__renderTarget);ne.bindFramebuffer(N.READ_FRAMEBUFFER,$t.__webglFramebuffer),ne.bindFramebuffer(N.DRAW_FRAMEBUFFER,On.__webglFramebuffer);for(let zn=0;zn<Re;zn++)ls&&N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,_e.get(E).__webglTexture,U,He+zn),E.isDepthTexture?(mt&&N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,_e.get(D).__webglTexture,U,ct+zn),N.blitFramebuffer(Ce,ze,re,ge,Pe,Ze,re,ge,N.DEPTH_BUFFER_BIT,N.NEAREST)):mt?N.copyTexSubImage3D(Ie,U,Pe,Ze,ct+zn,Ce,ze,re,ge):N.copyTexSubImage2D(Ie,U,Pe,Ze,ct+zn,Ce,ze,re,ge);ne.bindFramebuffer(N.READ_FRAMEBUFFER,null),ne.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else mt?E.isDataTexture||E.isData3DTexture?N.texSubImage3D(Ie,U,Pe,Ze,ct,re,ge,Re,kt,Qe,pt.data):D.isCompressedArrayTexture?N.compressedTexSubImage3D(Ie,U,Pe,Ze,ct,re,ge,Re,kt,pt.data):N.texSubImage3D(Ie,U,Pe,Ze,ct,re,ge,Re,kt,Qe,pt):E.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,U,Pe,Ze,re,ge,kt,Qe,pt.data):E.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,U,Pe,Ze,pt.width,pt.height,kt,pt.data):N.texSubImage2D(N.TEXTURE_2D,U,Pe,Ze,re,ge,kt,Qe,pt);N.pixelStorei(N.UNPACK_ROW_LENGTH,yn),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,et),N.pixelStorei(N.UNPACK_SKIP_PIXELS,Qt),N.pixelStorei(N.UNPACK_SKIP_ROWS,wi),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Gt),U===0&&D.generateMipmaps&&N.generateMipmap(Ie),ne.unbindTexture()},this.copyTextureToTexture3D=function(E,D,B=null,k=null,U=0){return E.isTexture!==!0&&(Ss("WebGLRenderer: copyTextureToTexture3D function signature has changed."),B=arguments[0]||null,k=arguments[1]||null,E=arguments[2],D=arguments[3],U=arguments[4]||0),Ss('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(E,D,B,k,U)},this.initRenderTarget=function(E){_e.get(E).__webglFramebuffer===void 0&&T.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?T.setTextureCube(E,0):E.isData3DTexture?T.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?T.setTexture2DArray(E,0):T.setTexture2D(E,0),ne.unbindTexture()},this.resetState=function(){A=0,R=0,C=null,ne.reset(),je.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ln}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=$e._getDrawingBufferColorSpace(e),t.unpackColorSpace=$e._getUnpackColorSpace()}}class Yn{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new Ue(e),this.near=t,this.far=i}clone(){return new Yn(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Jc extends yt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new vn,this.environmentIntensity=1,this.environmentRotation=new vn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class X0{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=fa,this.updateRanges=[],this.version=0,this.uuid=In()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[i+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=In()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=In()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Ut=new w;class Tr{constructor(e,t,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)Ut.fromBufferAttribute(this,t),Ut.applyMatrix4(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Ut.fromBufferAttribute(this,t),Ut.applyNormalMatrix(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Ut.fromBufferAttribute(this,t),Ut.transformDirection(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=an(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=nt(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=nt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=nt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=nt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=nt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=an(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=an(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=an(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=an(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=nt(t,this.array),i=nt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=nt(t,this.array),i=nt(i,this.array),s=nt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=nt(t,this.array),i=nt(i,this.array),s=nt(s,this.array),r=nt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Rt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Tr(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class ln extends jn{static get type(){return"SpriteMaterial"}constructor(e){super(),this.isSpriteMaterial=!0,this.color=new Ue(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let ki;const ps=new w,Hi=new w,Gi=new w,Vi=new xe,ms=new xe,jc=new at,cr=new w,gs=new w,ur=new w,Jl=new xe,po=new xe,jl=new xe;class gn extends yt{constructor(e=new ln){if(super(),this.isSprite=!0,this.type="Sprite",ki===void 0){ki=new Mt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new X0(t,5);ki.setIndex([0,1,2,0,2,3]),ki.setAttribute("position",new Tr(i,3,0,!1)),ki.setAttribute("uv",new Tr(i,2,3,!1))}this.geometry=ki,this.material=e,this.center=new xe(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Hi.setFromMatrixScale(this.matrixWorld),jc.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Gi.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Hi.multiplyScalar(-Gi.z);const i=this.material.rotation;let s,r;i!==0&&(r=Math.cos(i),s=Math.sin(i));const o=this.center;dr(cr.set(-.5,-.5,0),Gi,o,Hi,s,r),dr(gs.set(.5,-.5,0),Gi,o,Hi,s,r),dr(ur.set(.5,.5,0),Gi,o,Hi,s,r),Jl.set(0,0),po.set(1,0),jl.set(1,1);let a=e.ray.intersectTriangle(cr,gs,ur,!1,ps);if(a===null&&(dr(gs.set(-.5,.5,0),Gi,o,Hi,s,r),po.set(0,1),a=e.ray.intersectTriangle(cr,ur,gs,!1,ps),a===null))return;const l=e.ray.origin.distanceTo(ps);l<e.near||l>e.far||t.push({distance:l,point:ps.clone(),uv:Kt.getInterpolation(ps,cr,gs,ur,Jl,po,jl,new xe),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function dr(n,e,t,i,s,r){Vi.subVectors(n,t).addScalar(.5).multiply(i),s!==void 0?(ms.x=r*Vi.x-s*Vi.y,ms.y=s*Vi.x+r*Vi.y):ms.copy(Vi),n.copy(e),n.x+=ms.x,n.y+=ms.y,n.applyMatrix4(jc)}class Ua extends jn{static get type(){return"LineBasicMaterial"}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new Ue(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Ar=new w,Rr=new w,Ql=new at,_s=new Dr,hr=new Os,mo=new w,ec=new w;class Qc extends yt{constructor(e=new Mt,t=new Ua){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let s=1,r=t.count;s<r;s++)Ar.fromBufferAttribute(t,s-1),Rr.fromBufferAttribute(t,s),i[s]=i[s-1],i[s]+=Ar.distanceTo(Rr);e.setAttribute("lineDistance",new dt(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),hr.copy(i.boundingSphere),hr.applyMatrix4(s),hr.radius+=r,e.ray.intersectsSphere(hr)===!1)return;Ql.copy(s).invert(),_s.copy(e.ray).applyMatrix4(Ql);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=i.index,h=i.attributes.position;if(u!==null){const f=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let _=f,m=g-1;_<m;_+=c){const p=u.getX(_),b=u.getX(_+1),x=fr(this,e,_s,l,p,b);x&&t.push(x)}if(this.isLineLoop){const _=u.getX(g-1),m=u.getX(f),p=fr(this,e,_s,l,_,m);p&&t.push(p)}}else{const f=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let _=f,m=g-1;_<m;_+=c){const p=fr(this,e,_s,l,_,_+1);p&&t.push(p)}if(this.isLineLoop){const _=fr(this,e,_s,l,g-1,f);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function fr(n,e,t,i,s,r){const o=n.geometry.attributes.position;if(Ar.fromBufferAttribute(o,s),Rr.fromBufferAttribute(o,r),t.distanceSqToSegment(Ar,Rr,mo,ec)>i)return;mo.applyMatrix4(n.matrixWorld);const l=e.ray.origin.distanceTo(mo);if(!(l<e.near||l>e.far))return{distance:l,point:ec.clone().applyMatrix4(n.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:n}}class Na extends jn{static get type(){return"PointsMaterial"}constructor(e){super(),this.isPointsMaterial=!0,this.color=new Ue(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const tc=new at,ma=new Dr,pr=new Os,mr=new w;class eu extends yt{constructor(e=new Mt,t=new Na){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),pr.copy(i.boundingSphere),pr.applyMatrix4(s),pr.radius+=r,e.ray.intersectsSphere(pr)===!1)return;tc.copy(s).invert(),ma.copy(e.ray).applyMatrix4(tc);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=i.index,d=i.attributes.position;if(c!==null){const h=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let g=h,_=f;g<_;g++){const m=c.getX(g);mr.fromBufferAttribute(d,m),nc(mr,m,l,s,e,t,this)}}else{const h=Math.max(0,o.start),f=Math.min(d.count,o.start+o.count);for(let g=h,_=f;g<_;g++)mr.fromBufferAttribute(d,g),nc(mr,g,l,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function nc(n,e,t,i,s,r,o){const a=ma.distanceSqToPoint(n);if(a<t){const l=new w;ma.closestPointToPoint(n,l),l.applyMatrix4(i);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class Ei extends Bt{constructor(e,t,i,s,r,o,a,l,c){super(e,t,i,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Fn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let i,s=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)i=this.getPoint(o/e),r+=i.distanceTo(s),t.push(r),s=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const i=this.getLengths();let s=0;const r=i.length;let o;t?o=t:o=e*i[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=i[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,i[s]===o)return s/(r-1);const u=i[s],h=i[s+1]-u,f=(o-u)/h;return(s+f)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),l=t||(o.isVector2?new xe:new w);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){const i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t){const i=new w,s=[],r=[],o=[],a=new w,l=new at;for(let f=0;f<=e;f++){const g=f/e;s[f]=this.getTangentAt(g,new w)}r[0]=new w,o[0]=new w;let c=Number.MAX_VALUE;const u=Math.abs(s[0].x),d=Math.abs(s[0].y),h=Math.abs(s[0].z);u<=c&&(c=u,i.set(1,0,0)),d<=c&&(c=d,i.set(0,1,0)),h<=c&&i.set(0,0,1),a.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(s[f-1],s[f]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(At(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(a,g))}o[f].crossVectors(s[f],r[f])}if(t===!0){let f=Math.acos(At(r[0].dot(r[e]),-1,1));f/=e,s[0].dot(a.crossVectors(r[0],r[e]))>0&&(f=-f);for(let g=1;g<=e;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],f*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class tu extends Fn{constructor(e=0,t=0,i=1,s=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t=new xe){const i=t,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+e*r;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const u=Math.cos(this.aRotation),d=Math.sin(this.aRotation),h=l-this.aX,f=c-this.aY;l=h*u-f*d+this.aX,c=h*d+f*u+this.aY}return i.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class q0 extends tu{constructor(e,t,i,s,r,o){super(e,t,i,i,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Fa(){let n=0,e=0,t=0,i=0;function s(r,o,a,l){n=r,e=a,t=-3*r+3*o-2*a-l,i=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,u,d){let h=(o-r)/c-(a-r)/(c+u)+(a-o)/u,f=(a-o)/u-(l-o)/(u+d)+(l-a)/d;h*=u,f*=u,s(o,a,h,f)},calc:function(r){const o=r*r,a=o*r;return n+e*r+t*o+i*a}}}const gr=new w,go=new Fa,_o=new Fa,vo=new Fa;class sn extends Fn{constructor(e=[],t=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=s}getPoint(e,t=new w){const i=t,s=this.points,r=s.length,o=(r-(this.closed?0:1))*e;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,u;this.closed||a>0?c=s[(a-1)%r]:(gr.subVectors(s[0],s[1]).add(s[0]),c=gr);const d=s[a%r],h=s[(a+1)%r];if(this.closed||a+2<r?u=s[(a+2)%r]:(gr.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=gr),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(d),f),_=Math.pow(d.distanceToSquared(h),f),m=Math.pow(h.distanceToSquared(u),f);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),go.initNonuniformCatmullRom(c.x,d.x,h.x,u.x,g,_,m),_o.initNonuniformCatmullRom(c.y,d.y,h.y,u.y,g,_,m),vo.initNonuniformCatmullRom(c.z,d.z,h.z,u.z,g,_,m)}else this.curveType==="catmullrom"&&(go.initCatmullRom(c.x,d.x,h.x,u.x,this.tension),_o.initCatmullRom(c.y,d.y,h.y,u.y,this.tension),vo.initCatmullRom(c.z,d.z,h.z,u.z,this.tension));return i.set(go.calc(l),_o.calc(l),vo.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(new w().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function ic(n,e,t,i,s){const r=(i-e)*.5,o=(s-t)*.5,a=n*n,l=n*a;return(2*t-2*i+r+o)*l+(-3*t+3*i-2*r-o)*a+r*n+t}function Y0(n,e){const t=1-n;return t*t*e}function $0(n,e){return 2*(1-n)*n*e}function Z0(n,e){return n*n*e}function Ts(n,e,t,i){return Y0(n,e)+$0(n,t)+Z0(n,i)}function K0(n,e){const t=1-n;return t*t*t*e}function J0(n,e){const t=1-n;return 3*t*t*n*e}function j0(n,e){return 3*(1-n)*n*n*e}function Q0(n,e){return n*n*n*e}function As(n,e,t,i,s){return K0(n,e)+J0(n,t)+j0(n,i)+Q0(n,s)}class eg extends Fn{constructor(e=new xe,t=new xe,i=new xe,s=new xe){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=s}getPoint(e,t=new xe){const i=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(As(e,s.x,r.x,o.x,a.x),As(e,s.y,r.y,o.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class tg extends Fn{constructor(e=new w,t=new w,i=new w,s=new w){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=s}getPoint(e,t=new w){const i=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(As(e,s.x,r.x,o.x,a.x),As(e,s.y,r.y,o.y,a.y),As(e,s.z,r.z,o.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class ng extends Fn{constructor(e=new xe,t=new xe){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new xe){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new xe){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class ig extends Fn{constructor(e=new w,t=new w){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new w){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new w){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class sg extends Fn{constructor(e=new xe,t=new xe,i=new xe){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new xe){const i=t,s=this.v0,r=this.v1,o=this.v2;return i.set(Ts(e,s.x,r.x,o.x),Ts(e,s.y,r.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class nu extends Fn{constructor(e=new w,t=new w,i=new w){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new w){const i=t,s=this.v0,r=this.v1,o=this.v2;return i.set(Ts(e,s.x,r.x,o.x),Ts(e,s.y,r.y,o.y),Ts(e,s.z,r.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class rg extends Fn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new xe){const i=t,s=this.points,r=(s.length-1)*e,o=Math.floor(r),a=r-o,l=s[o===0?o:o-1],c=s[o],u=s[o>s.length-2?s.length-1:o+1],d=s[o>s.length-3?s.length-1:o+2];return i.set(ic(a,l.x,c.x,u.x,d.x),ic(a,l.y,c.y,u.y,d.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(new xe().fromArray(s))}return this}}var og=Object.freeze({__proto__:null,ArcCurve:q0,CatmullRomCurve3:sn,CubicBezierCurve:eg,CubicBezierCurve3:tg,EllipseCurve:tu,LineCurve:ng,LineCurve3:ig,QuadraticBezierCurve:sg,QuadraticBezierCurve3:nu,SplineCurve:rg});class os extends Mt{constructor(e=1,t=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:s},t=Math.max(3,t);const r=[],o=[],a=[],l=[],c=new w,u=new xe;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let d=0,h=3;d<=t;d++,h+=3){const f=i+d/t*s;c.x=e*Math.cos(f),c.y=e*Math.sin(f),o.push(c.x,c.y,c.z),a.push(0,0,1),u.x=(o[h]/e+1)/2,u.y=(o[h+1]/e+1)/2,l.push(u.x,u.y)}for(let d=1;d<=t;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new dt(o,3)),this.setAttribute("normal",new dt(a,3)),this.setAttribute("uv",new dt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new os(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class it extends Mt{constructor(e=1,t=1,i=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const u=[],d=[],h=[],f=[];let g=0;const _=[],m=i/2;let p=0;b(),o===!1&&(e>0&&x(!0),t>0&&x(!1)),this.setIndex(u),this.setAttribute("position",new dt(d,3)),this.setAttribute("normal",new dt(h,3)),this.setAttribute("uv",new dt(f,2));function b(){const M=new w,L=new w;let A=0;const R=(t-e)/i;for(let C=0;C<=r;C++){const y=[],S=C/r,P=S*(t-e)+e;for(let O=0;O<=s;O++){const z=O/s,q=z*l+a,$=Math.sin(q),W=Math.cos(q);L.x=P*$,L.y=-S*i+m,L.z=P*W,d.push(L.x,L.y,L.z),M.set($,R,W).normalize(),h.push(M.x,M.y,M.z),f.push(z,1-S),y.push(g++)}_.push(y)}for(let C=0;C<s;C++)for(let y=0;y<r;y++){const S=_[y][C],P=_[y+1][C],O=_[y+1][C+1],z=_[y][C+1];(e>0||y!==0)&&(u.push(S,P,z),A+=3),(t>0||y!==r-1)&&(u.push(P,O,z),A+=3)}c.addGroup(p,A,0),p+=A}function x(M){const L=g,A=new xe,R=new w;let C=0;const y=M===!0?e:t,S=M===!0?1:-1;for(let O=1;O<=s;O++)d.push(0,m*S,0),h.push(0,S,0),f.push(.5,.5),g++;const P=g;for(let O=0;O<=s;O++){const q=O/s*l+a,$=Math.cos(q),W=Math.sin(q);R.x=y*W,R.y=m*S,R.z=y*$,d.push(R.x,R.y,R.z),h.push(0,S,0),A.x=$*.5+.5,A.y=W*.5*S+.5,f.push(A.x,A.y),g++}for(let O=0;O<s;O++){const z=L+O,q=P+O;M===!0?u.push(q,q+1,z):u.push(q+1,q,z),C+=3}c.addGroup(p,C,M===!0?1:2),p+=C}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new it(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class as extends it{constructor(e=1,t=1,i=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,i,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new as(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Nr extends Mt{constructor(e=[],t=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:s};const r=[],o=[];a(s),c(i),u(),this.setAttribute("position",new dt(r,3)),this.setAttribute("normal",new dt(r.slice(),3)),this.setAttribute("uv",new dt(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(b){const x=new w,M=new w,L=new w;for(let A=0;A<t.length;A+=3)f(t[A+0],x),f(t[A+1],M),f(t[A+2],L),l(x,M,L,b)}function l(b,x,M,L){const A=L+1,R=[];for(let C=0;C<=A;C++){R[C]=[];const y=b.clone().lerp(M,C/A),S=x.clone().lerp(M,C/A),P=A-C;for(let O=0;O<=P;O++)O===0&&C===A?R[C][O]=y:R[C][O]=y.clone().lerp(S,O/P)}for(let C=0;C<A;C++)for(let y=0;y<2*(A-C)-1;y++){const S=Math.floor(y/2);y%2===0?(h(R[C][S+1]),h(R[C+1][S]),h(R[C][S])):(h(R[C][S+1]),h(R[C+1][S+1]),h(R[C+1][S]))}}function c(b){const x=new w;for(let M=0;M<r.length;M+=3)x.x=r[M+0],x.y=r[M+1],x.z=r[M+2],x.normalize().multiplyScalar(b),r[M+0]=x.x,r[M+1]=x.y,r[M+2]=x.z}function u(){const b=new w;for(let x=0;x<r.length;x+=3){b.x=r[x+0],b.y=r[x+1],b.z=r[x+2];const M=m(b)/2/Math.PI+.5,L=p(b)/Math.PI+.5;o.push(M,1-L)}g(),d()}function d(){for(let b=0;b<o.length;b+=6){const x=o[b+0],M=o[b+2],L=o[b+4],A=Math.max(x,M,L),R=Math.min(x,M,L);A>.9&&R<.1&&(x<.2&&(o[b+0]+=1),M<.2&&(o[b+2]+=1),L<.2&&(o[b+4]+=1))}}function h(b){r.push(b.x,b.y,b.z)}function f(b,x){const M=b*3;x.x=e[M+0],x.y=e[M+1],x.z=e[M+2]}function g(){const b=new w,x=new w,M=new w,L=new w,A=new xe,R=new xe,C=new xe;for(let y=0,S=0;y<r.length;y+=9,S+=6){b.set(r[y+0],r[y+1],r[y+2]),x.set(r[y+3],r[y+4],r[y+5]),M.set(r[y+6],r[y+7],r[y+8]),A.set(o[S+0],o[S+1]),R.set(o[S+2],o[S+3]),C.set(o[S+4],o[S+5]),L.copy(b).add(x).add(M).divideScalar(3);const P=m(L);_(A,S+0,b,P),_(R,S+2,x,P),_(C,S+4,M,P)}}function _(b,x,M,L){L<0&&b.x===1&&(o[x]=b.x-1),M.x===0&&M.z===0&&(o[x]=L/2/Math.PI+.5)}function m(b){return Math.atan2(b.z,-b.x)}function p(b){return Math.atan2(-b.y,Math.sqrt(b.x*b.x+b.z*b.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Nr(e.vertices,e.indices,e.radius,e.details)}}class Oa extends Nr{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,s=1/i,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-i,0,-s,i,0,s,-i,0,s,i,-s,-i,0,-s,i,0,s,-i,0,s,i,0,-i,0,-s,i,0,-s,-i,0,s,i,0,s],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,o,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Oa(e.radius,e.detail)}}class zs extends Nr{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,s=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new zs(e.radius,e.detail)}}class Ht extends Mt{constructor(e=1,t=32,i=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(o+a,Math.PI);let c=0;const u=[],d=new w,h=new w,f=[],g=[],_=[],m=[];for(let p=0;p<=i;p++){const b=[],x=p/i;let M=0;p===0&&o===0?M=.5/t:p===i&&l===Math.PI&&(M=-.5/t);for(let L=0;L<=t;L++){const A=L/t;d.x=-e*Math.cos(s+A*r)*Math.sin(o+x*a),d.y=e*Math.cos(o+x*a),d.z=e*Math.sin(s+A*r)*Math.sin(o+x*a),g.push(d.x,d.y,d.z),h.copy(d).normalize(),_.push(h.x,h.y,h.z),m.push(A+M,1-x),b.push(c++)}u.push(b)}for(let p=0;p<i;p++)for(let b=0;b<t;b++){const x=u[p][b+1],M=u[p][b],L=u[p+1][b],A=u[p+1][b+1];(p!==0||o>0)&&f.push(x,M,A),(p!==i-1||l<Math.PI)&&f.push(M,L,A)}this.setIndex(f),this.setAttribute("position",new dt(g,3)),this.setAttribute("normal",new dt(_,3)),this.setAttribute("uv",new dt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ht(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class _i extends Mt{constructor(e=1,t=.4,i=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:s,arc:r},i=Math.floor(i),s=Math.floor(s);const o=[],a=[],l=[],c=[],u=new w,d=new w,h=new w;for(let f=0;f<=i;f++)for(let g=0;g<=s;g++){const _=g/s*r,m=f/i*Math.PI*2;d.x=(e+t*Math.cos(m))*Math.cos(_),d.y=(e+t*Math.cos(m))*Math.sin(_),d.z=t*Math.sin(m),a.push(d.x,d.y,d.z),u.x=e*Math.cos(_),u.y=e*Math.sin(_),h.subVectors(d,u).normalize(),l.push(h.x,h.y,h.z),c.push(g/s),c.push(f/i)}for(let f=1;f<=i;f++)for(let g=1;g<=s;g++){const _=(s+1)*f+g-1,m=(s+1)*(f-1)+g-1,p=(s+1)*(f-1)+g,b=(s+1)*f+g;o.push(_,m,b),o.push(m,p,b)}this.setIndex(o),this.setAttribute("position",new dt(a,3)),this.setAttribute("normal",new dt(l,3)),this.setAttribute("uv",new dt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new _i(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Is extends Mt{constructor(e=new nu(new w(-1,-1,0),new w(-1,1,0),new w(1,1,0)),t=64,i=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:i,radialSegments:s,closed:r};const o=e.computeFrenetFrames(t,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new w,l=new w,c=new xe;let u=new w;const d=[],h=[],f=[],g=[];_(),this.setIndex(g),this.setAttribute("position",new dt(d,3)),this.setAttribute("normal",new dt(h,3)),this.setAttribute("uv",new dt(f,2));function _(){for(let x=0;x<t;x++)m(x);m(r===!1?t:0),b(),p()}function m(x){u=e.getPointAt(x/t,u);const M=o.normals[x],L=o.binormals[x];for(let A=0;A<=s;A++){const R=A/s*Math.PI*2,C=Math.sin(R),y=-Math.cos(R);l.x=y*M.x+C*L.x,l.y=y*M.y+C*L.y,l.z=y*M.z+C*L.z,l.normalize(),h.push(l.x,l.y,l.z),a.x=u.x+i*l.x,a.y=u.y+i*l.y,a.z=u.z+i*l.z,d.push(a.x,a.y,a.z)}}function p(){for(let x=1;x<=t;x++)for(let M=1;M<=s;M++){const L=(s+1)*(x-1)+(M-1),A=(s+1)*x+(M-1),R=(s+1)*x+M,C=(s+1)*(x-1)+M;g.push(L,A,C),g.push(A,R,C)}}function b(){for(let x=0;x<=t;x++)for(let M=0;M<=s;M++)c.x=x/t,c.y=M/s,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new Is(new og[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class ie extends jn{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Ue(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ue(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ic,this.normalScale=new xe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new vn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Fr extends yt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ue(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class iu extends Fr{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(yt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ue(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Mo=new at,sc=new w,rc=new w;class su{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new xe(512,512),this.map=null,this.mapPass=null,this.matrix=new at,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ia,this._frameExtents=new xe(1,1),this._viewportCount=1,this._viewports=[new ot(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;sc.setFromMatrixPosition(e.matrixWorld),t.position.copy(sc),rc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(rc),t.updateMatrixWorld(),Mo.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Mo),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Mo)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const oc=new at,vs=new w,So=new w;class ag extends su{constructor(){super(new ut(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new xe(4,2),this._viewportCount=6,this._viewports=[new ot(2,1,1,1),new ot(0,1,1,1),new ot(3,1,1,1),new ot(1,1,1,1),new ot(3,0,1,1),new ot(1,0,1,1)],this._cubeDirections=[new w(1,0,0),new w(-1,0,0),new w(0,0,1),new w(0,0,-1),new w(0,1,0),new w(0,-1,0)],this._cubeUps=[new w(0,1,0),new w(0,1,0),new w(0,1,0),new w(0,1,0),new w(0,0,1),new w(0,0,-1)]}updateMatrices(e,t=0){const i=this.camera,s=this.matrix,r=e.distance||i.far;r!==i.far&&(i.far=r,i.updateProjectionMatrix()),vs.setFromMatrixPosition(e.matrixWorld),i.position.copy(vs),So.copy(i.position),So.add(this._cubeDirections[t]),i.up.copy(this._cubeUps[t]),i.lookAt(So),i.updateMatrixWorld(),s.makeTranslation(-vs.x,-vs.y,-vs.z),oc.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(oc)}}class za extends Fr{constructor(e,t,i=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new ag}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class lg extends su{constructor(){super(new Wc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class ga extends Fr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(yt.DEFAULT_UP),this.updateMatrix(),this.target=new yt,this.shadow=new lg}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class ru extends Fr{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}const ac=new at;class cg{constructor(e,t,i=0,s=1/0){this.ray=new Dr(e,t),this.near=i,this.far=s,this.camera=null,this.layers=new La,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return ac.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(ac),this}intersectObject(e,t=!0,i=[]){return _a(e,this,i,t),i.sort(lc),i}intersectObjects(e,t=!0,i=[]){for(let s=0,r=e.length;s<r;s++)_a(e[s],this,i,t);return i.sort(lc),i}}function lc(n,e){return n.distance-e.distance}function _a(n,e,t,i){let s=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(s=!1),s===!0&&i===!0){const r=n.children;for(let o=0,a=r.length;o<a;o++)_a(r[o],e,t,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ya}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ya);let zt=!1;function ug(n){zt=n}function dg(){return zt}const Fe={skyTop:1905680,skyMid:4862496,skyHorizon:11563071,sun:15246172,ground:10848350,groundDark:9072458,path:8150842,pathEdge:11569746,walnut:2365970,walnutDark:1380106,bronze:9071165,ivory:15919316,terracotta:12675135,amber:15246172,hill:1708811};function cn(n,e){const t=document.createElement("canvas");t.width=128,t.height=128;const i=t.getContext("2d"),s=i.createRadialGradient(64,64,64*n,64,64,64);s.addColorStop(0,e),s.addColorStop(1,"rgba(0,0,0,0)"),i.fillStyle=s,i.fillRect(0,0,128,128);const r=new Ei(t);return r.colorSpace=Et,r}function cc(n,e,t){const i=e.split(" "),s=[];let r="";for(const o of i){const a=r?r+" "+o:o;n.measureText(a).width>t&&r?(s.push(r),r=o):r=a}return r&&s.push(r),s}function ou(){const n=document.createElement("canvas");n.width=256,n.height=256;const e=n.getContext("2d");e.fillStyle="#8a6f4a",e.fillRect(0,0,256,256);for(let i=0;i<2600;i++){const s=105+Math.random()*45;e.fillStyle=`rgba(${s|0},${s*.78|0},${s*.46|0},${(Math.random()*.22).toFixed(3)})`,e.fillRect(Math.random()*256,Math.random()*256,2+Math.random()*4,2+Math.random()*4)}for(let i=0;i<150;i++)e.fillStyle="rgba(30,22,14,"+(.2+Math.random()*.3).toFixed(3)+")",e.beginPath(),e.arc(Math.random()*256,Math.random()*256,1+Math.random()*2,0,Math.PI*2),e.fill();const t=new Ei(n);return t.colorSpace=Et,t.wrapS=t.wrapT=vi,t.repeat.set(zt?48:90,zt?48:90),t.anisotropy=zt?2:8,t}function Wi(){const n=document.createElement("canvas");n.width=256,n.height=256;const e=n.getContext("2d");e.fillStyle="#7c5f3a",e.fillRect(0,0,256,256);for(let s=0;s<3200;s++)e.fillStyle=`rgba(0,0,0,${(Math.random()*.18).toFixed(3)})`,e.fillRect(Math.random()*256,Math.random()*256,1+Math.random()*3,1+Math.random()*3);for(let s=0;s<500;s++)e.fillStyle=`rgba(180,150,110,${(Math.random()*.12).toFixed(3)})`,e.fillRect(Math.random()*256,Math.random()*256,1+Math.random()*2,1+Math.random()*2);const t=e.createLinearGradient(112,0,144,256);t.addColorStop(0,"rgba(255,255,255,0)"),t.addColorStop(.5,"rgba(255,255,255,0.07)"),t.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=t,e.fillRect(0,0,256,256);const i=new Ei(n);return i.colorSpace=Et,i.wrapS=i.wrapT=vi,i.repeat.set(1,60),i.anisotropy=zt?2:8,i}function pi(n,e,t,i,s=500){const r=n.getSpacedPoints(s),o=new Float32Array((s+1)*6),a=new Float32Array((s+1)*4),l=new Uint32Array(s*6);for(let d=0;d<=s;d++){const h=r[Math.min(d,s-1)],f=r[Math.min(d+1,s-1)],g=new w().subVectors(f,h).normalize(),_=new w(-g.z,0,g.x).normalize(),m=h.clone().add(_.clone().multiplyScalar(-e/2)),p=h.clone().add(_.clone().multiplyScalar(e/2)),b=d*6;if(o[b]=m.x,o[b+1]=m.y,o[b+2]=m.z,o[b+3]=p.x,o[b+4]=p.y,o[b+5]=p.z,a[d*4]=0,a[d*4+1]=d/s,a[d*4+2]=1,a[d*4+3]=d/s,d<s){const x=d*2,M=d*2+1,L=d*2+2,A=d*2+3,R=d*6;l[R]=x,l[R+1]=L,l[R+2]=M,l[R+3]=M,l[R+4]=L,l[R+5]=A}}const c=new Mt;c.setAttribute("position",new Rt(o,3)),c.setAttribute("uv",new Rt(a,2)),c.setIndex(new Rt(l,1)),c.computeVertexNormals();const u=new H(c,new ie({color:t,roughness:.95,metalness:.02,map:i||null}));return u.receiveShadow=!0,u}function au(n,e,t,i,s){const r=new Ke,o=e.getPointAt(t),a=e.getTangentAt(t),c=new w(-a.z,0,a.x).normalize().clone().multiplyScalar(i*5.4),u=s%3-1;r.position.set(o.x+c.x+u*.9,0,o.z+c.z+u*.9);const d=e.getPointAt(Math.max(0,t-.035)),h=new w().subVectors(d,r.position).normalize(),f=Math.atan2(h.x,h.z);r.rotation.y=f;const g=new ie({color:Fe.walnut,roughness:.8,metalness:.05}),_=new H(new Ne(6.6,4.4,.22),g);_.position.y=3,_.castShadow=!0,r.add(_);const m=new ie({color:Fe.bronze,roughness:.55,metalness:.35}),p=new H(new Ne(7,.26,.3),m);p.position.y=5.32,r.add(p);const b=new H(new Ne(7,.26,.3),m);b.position.y=.72,r.add(b);for(const $ of[-3.5,3.5]){const W=new H(new Ne(.26,4.8,.3),m);W.position.set($,3,0),r.add(W)}const x=new ie({color:Fe.walnutDark,roughness:.7,metalness:.1}),M=new ie({color:Fe.bronze,roughness:.6,metalness:.4});for(const $ of[-2.5,2.5]){const W=new H(new Ne(.32,.8,.32),x);W.position.set($,.4,0),W.castShadow=!0,r.add(W);const Q=new H(new Ne(.7,.14,.7),M);Q.position.set($,.07,0),r.add(Q)}const L=zt?640:1024,A=zt?480:768,R=document.createElement("canvas");R.width=L,R.height=A,hg(R.getContext("2d"),n,s,L,A);const C=new Ei(R);C.colorSpace=Et,C.anisotropy=zt?2:8;const y=new ie({map:C,emissiveMap:C,emissive:Fe.ivory,emissiveIntensity:zt?.5:.24,roughness:.82,metalness:.02}),S=new H(new lt(6.2,4),y);S.position.set(0,3,.125),r.add(S);const P=new H(new lt(6.2,4),new ie({color:Fe.walnutDark,roughness:.9}));P.position.set(0,3,-.125),P.rotation.y=Math.PI,r.add(P);const O=zt?null:new za(15246172,0,26,2);O&&(O.position.set(0,3.3,2.4),r.add(O));const z=new ie({color:Fe.amber,emissive:Fe.amber,emissiveIntensity:1.2}),q=new H(new Ht(.09,12,12),z);return q.position.set(0,5.52,0),r.add(q),{group:r,frontMat:y,light:O,beaconMat:z,front:S}}function hg(n,e,t,i=1024,s=768){const r=i,o=s;n.scale(i/1024,s/768);const a=n.createLinearGradient(0,0,0,o);a.addColorStop(0,"#2a1f14"),a.addColorStop(1,"#160f09"),n.fillStyle=a,n.fillRect(0,0,r,o),n.globalAlpha=.06;for(let d=0;d<900;d++)n.fillStyle=Math.random()>.5?"#000000":"#ffffff",n.fillRect(Math.random()*r,Math.random()*o,2,2);n.globalAlpha=1,n.strokeStyle="rgba(242,232,212,0.28)",n.lineWidth=3,n.strokeRect(34,34,r-68,o-68),n.fillStyle="#c1683f";for(const[d,h,f,g]of[[34,34,1,1],[r-34,34,-1,1],[34,o-34,1,-1],[r-34,o-34,-1,-1]])n.fillRect(d+f*8,h+g*8,26*f,4*g),n.fillRect(d+f*8,h+g*8,4*f,26*g);n.fillStyle="#cfbe9f",n.font="500 26px 'Avenir Next', 'Helvetica Neue', Arial, sans-serif",n.textAlign="left",n.letterSpacing="6px",n.fillText(e.kicker.toUpperCase(),70,96),n.letterSpacing="0px",n.fillStyle="rgba(232,163,92,0.18)",n.font="600 300px 'Didot', Georgia, serif",n.textAlign="right",n.fillText(e.num,r-60,360),n.fillStyle="#c1683f",n.fillRect(70,132,90,4),n.fillStyle="#f2e8d4",n.font="600 62px 'Didot', Georgia, serif",n.textAlign="left";const l=cc(n,e.title,860);let c=210;if(l.slice(0,4).forEach(d=>{n.fillText(d,70,c),c+=70}),c+=18,e.id!=="quiz"&&e.bullets.length){n.fillStyle="rgba(242,232,212,0.55)",n.fillRect(70,c-6,60,2),c+=26,n.font="400 30px 'Avenir Next', 'Helvetica Neue', Arial, sans-serif";const d=[];e.bullets.slice(0,4).forEach(h=>d.push(...cc(n,h,840))),d.slice(0,5).forEach(h=>{n.fillStyle="#c1683f",n.beginPath(),n.arc(78,c-10,4,0,Math.PI*2),n.fill(),n.fillStyle="#cfbe9f",n.fillText(h,100,c),c+=40})}n.fillStyle="rgba(242,232,212,0.4)",n.font="400 22px 'Avenir Next', 'Helvetica Neue', Arial, sans-serif",n.textAlign="left",n.letterSpacing="3px",n.fillText("MODULE 1 · DOMAINE PUBLIC",70,o-62),n.fillStyle="rgba(232,163,92,0.85)",n.textAlign="right",n.fillText(String(t+1).padStart(2,"0")+" / 13",r-70,o-62),n.letterSpacing="0px";const u=n.createRadialGradient(r/2,o/2,r*.3,r/2,o/2,r*.62);u.addColorStop(0,"rgba(255,220,170,0.1)"),u.addColorStop(.6,"rgba(0,0,0,0)"),u.addColorStop(1,"rgba(0,0,0,0.42)"),n.fillStyle=u,n.fillRect(0,0,r,o)}function va(n,e,t,i,s){const r=document.createElement("canvas");r.width=64,r.height=128;const o=r.getContext("2d");o.fillStyle="#151009",o.fillRect(0,0,64,128);const a=Math.random();for(let d=0;d<9;d++)for(let h=0;h<4;h++){const f=Math.random();f<.32?(o.fillStyle=Math.random()<.3?"#c1683f":"#e8a35c",o.globalAlpha=.5+Math.random()*.5,o.fillRect(4+h*14+Math.random()*4,6+d*13+Math.random()*3,5,7),o.globalAlpha=1):f<.4&&(o.fillStyle="#f2e8d4",o.globalAlpha=.25,o.fillRect(4+h*14,6+d*13,5,7),o.globalAlpha=1)}const l=new Ei(r);l.colorSpace=Et,l.repeat.set(1,Math.max(1,Math.round(e/6))),l.wrapS=vi,l.wrapT=vi,l.anisotropy=zt?1:4;const c=new ie({map:l,emissiveMap:l,emissive:new Ue(a>.5?16767392:16758896),emissiveIntensity:.85,roughness:.9}),u=new H(new Ne(n,e,t),c);return u.position.set(s,e/2-.3,i),u.rotation.y=(Math.random()-.5)*.5,u.castShadow=!0,u}function xs(n,e){const t=new Ke;t.position.copy(n);const i=new ie({color:Fe.walnutDark,roughness:.6,metalness:.3}),s=new H(new it(.07,.1,5.6,8),i);s.position.y=2.8,t.add(s);const r=new H(new Ne(1.7,.1,.1),i);r.position.set(e*.85,5.5,0),t.add(r);const o=new ie({color:Fe.amber,emissive:Fe.amber,emissiveIntensity:.9}),a=new H(new Ht(.16,12,12),o);return a.position.set(e*1.7,5.5,0),t.add(a),t}function fg(n,e){const t=new ie({color:new Ue(Fe.groundDark).lerp(new Ue(Fe.ground),Math.random()),roughness:1,flatShading:!0}),i=new H(new zs(e,1),t);return i.position.set(n.x,-.15,n.z),i.scale.set(1,.32,1),i.rotation.y=Math.random()*Math.PI,i}function pg(n,e){const t=new ie({color:7034424,roughness:.95,flatShading:!0}),i=new H(new Oa(e,0),t);return i.position.set(n.x,e*.4,n.z),i.rotation.set(Math.random(),Math.random()*Math.PI,Math.random()),i}function mg(n=420){const e=n,t=new Float32Array(e*3),i=new sn([new w(0,0,0),new w(0,0,120),new w(0,0,240),new w(0,0,360),new w(0,0,468)],!1,"centripetal");for(let o=0;o<e;o++){const a=Math.random(),l=i.getPointAt(a);t[o*3]=l.x+(Math.random()-.5)*24,t[o*3+1]=.4+Math.random()*6,t[o*3+2]=l.z+(Math.random()-.5)*24}const s=new Mt;s.setAttribute("position",new Rt(t,3));const r=new Na({color:Fe.amber,transparent:!0,opacity:.5,blending:Ot,depthWrite:!1,size:.35,sizeAttenuation:!0});return new eu(s,r)}function gg(){const n=new Ke,e=new qt({color:1708554,transparent:!0,opacity:.9,side:on}),t=new lt(.55,.18),i=new H(t,e);i.position.x=-.3;const s=new H(t,e);s.position.x=.3;const r=new H(new lt(.34,.07),e);return r.rotation.z=Math.PI/2,n.add(i,s,r),n.scale.setScalar(1.3),{g:n,l:i,r:s}}function lu(n,e=1){const t=new Ke,i=new ie({color:7031340,roughness:.95,flatShading:!0}),s=new H(new it(.09,.18,3.2,6),i);s.position.y=1.6,s.rotation.z=(Math.random()-.5)*.22,s.castShadow=!0,t.add(s);const r=new ie({color:3099180,roughness:1,flatShading:!0}),o=7;for(let l=0;l<o;l++){const c=l/o*Math.PI*2,u=new H(new Ht(1,7,5),r);u.position.set(Math.cos(c)*1.15,3.05,Math.sin(c)*1.15),u.scale.set(1.15,.28,.55),u.rotation.y=c,t.add(u)}const a=new H(new Ht(.28,8,6),r);return a.position.y=3.15,t.add(a),t.position.copy(n),t.scale.setScalar(e),t}function _g(n,e=1){const t=new Ke,i=new ie({color:3625006,roughness:1,flatShading:!0});for(let s=0;s<5;s++){const r=new H(new zs(.3+Math.random()*.24,1),i);r.position.set((Math.random()-.5)*.7,.22+Math.random()*.3,(Math.random()-.5)*.7),t.add(r)}return t.position.copy(n),t.scale.setScalar(e),t}function vg(n,e=1){const t=new Ke,i=new ie({color:4864552,roughness:1,flatShading:!0,transparent:!0,opacity:.8});for(let s=0;s<6;s++){const r=new H(new Ht(1.1+Math.random()*1.4,9,7),i);r.position.set(s*1.6-4,Math.random()*.9,(Math.random()-.5)*2),r.scale.y=.5,t.add(r)}return t.position.copy(n),t.scale.setScalar(e),t}function Mg(n,e,t){const i=new Ke;i.position.copy(n);const s=new ie({color:Fe.walnutDark,roughness:.7,metalness:.2}),r=new H(new it(.1,.14,2.1,8),s);r.position.y=1.05,r.castShadow=!0,i.add(r);const o=new H(new Ne(.9,.08,.14),s);o.position.set(0,1.85,0),o.rotation.z=Math.PI/2,i.add(o);const a=zt?256:512,l=zt?160:320,c=document.createElement("canvas");c.width=a,c.height=l;const u=c.getContext("2d");u.scale(a/512,l/320),u.fillStyle="#241a12",u.fillRect(0,0,512,320),u.strokeStyle="rgba(232,163,92,0.65)",u.lineWidth=8,u.strokeRect(12,12,488,296);const d=u.createLinearGradient(0,0,512,0);d.addColorStop(0,"#c1683f"),d.addColorStop(1,"#e8a35c"),u.fillStyle=d,u.fillRect(0,52,512,10),u.textAlign="center",u.fillStyle="#f2e8d4",u.font="700 42px 'Avenir Next', 'Helvetica Neue', Arial, sans-serif",t.forEach((m,p)=>u.fillText(m,256,122+p*50));const h=new Ei(c);h.colorSpace=Et,h.anisotropy=zt?2:8;const f=new ie({map:h,emissiveMap:h,emissive:new Ue(9071165),emissiveIntensity:.35,roughness:.75}),g=new H(new lt(1.7,1.06),f);g.position.y=2.28;const _=new Ke;return _.add(g),_.rotation.y=e,i.add(_),{group:i,sign:g}}function Sg(n,e,t,i){const s=new ie({color:Fe.hill,roughness:1,flatShading:!0}),r=new H(new zs(1,2),s);return r.scale.set(e,t,i),r.position.set(n.x,n.y,n.z),r.rotation.y=Math.random()*Math.PI,r.castShadow=!0,r}function Es(n,e){const t=new Ke;t.position.copy(n);const i=new gn(new ln({map:cn(0,"rgba(255,190,120,0.75)"),transparent:!0,blending:Ot,depthWrite:!1,depthTest:!1}));i.scale.setScalar(3.6),i.position.set(e*1.7,5.5,0),t.add(i);const s=new H(new os(3.8,24),new qt({map:cn(.12,"rgba(255,180,110,0.85)"),transparent:!0,blending:Ot,depthWrite:!1}));return s.rotation.x=-Math.PI/2,s.position.y=.03,t.add(s),{group:t,glow:i,pool:s}}function Ma(){const n=new Ke,e=Math.random()<.5?12675135:Math.random()<.5?15246172:5916210,t=new ie({color:e,roughness:.3,metalness:.55}),i=new ie({color:1840400,roughness:.5,metalness:.4}),s=new H(new Ne(1.5,.5,3.2),t);s.position.y=.5,s.castShadow=!0,n.add(s);const r=new H(new Ne(1.3,.24,1),i);r.position.set(0,.72,1.15),n.add(r);const o=new H(new Ne(1.12,.46,1.5),i);o.position.set(0,.95,-.2),o.castShadow=!0,n.add(o);const a=new ie({color:1451055,roughness:.15,metalness:.6});for(const[h,f]of[[0,-.95],[0,.5]]){const g=new H(new Ne(1.14,.38,.05),a);g.position.set(h,.96,f),n.add(g)}const l=new ie({color:854535,roughness:.9});for(const[h,f]of[[-.78,1.05],[.78,1.05],[-.78,-1.05],[.78,-1.05]]){const g=new H(new it(.32,.32,.22,14),l);g.rotation.x=Math.PI/2,g.rotation.z=Math.PI/2,g.position.set(h,.32,f),n.add(g)}const c=new ie({color:16773839,emissive:16769184,emissiveIntensity:2.2});for(const h of[-.55,.55]){const f=new H(new Ht(.09,8,8),c);f.position.set(h,.55,1.6),n.add(f)}const u=new ie({color:9051670,emissive:9051670,emissiveIntensity:1.2});for(const h of[-.55,.55]){const f=new H(new Ne(.16,.1,.04),u);f.position.set(h,.55,-1.6),n.add(f)}const d=new gn(new ln({map:cn(0,"rgba(255,226,175,0.4)"),transparent:!0,blending:Ot,depthWrite:!1,depthTest:!1}));return d.scale.set(3.4,3.4,1),d.position.set(0,.55,2.8),n.add(d),{group:n,cone:d}}function cu(n,e){const t=new Ke;t.position.copy(n),t.rotation.y=e>0?Math.PI:0;const i=new ie({color:7031340,roughness:.85}),s=new ie({color:2365970,roughness:.7,metalness:.4}),r=new H(new Ne(1.4,.08,.42),i);r.position.y=.42,t.add(r);const o=new H(new Ne(1.4,.08,.4),i);o.position.set(0,.72,.18),t.add(o);for(const a of[-.6,.6]){const l=new H(new Ne(.08,.42,.5),s);l.position.set(a,.21,0),t.add(l)}return t}function yg(n,e){const t=window.innerWidth<=760;ug(t);const i=ae=>t?Math.max(2,Math.round(ae*.45)):ae,s=new Kc({canvas:n,antialias:!t,alpha:!1});s.setPixelRatio(Math.min(window.devicePixelRatio,t?1.5:2)),s.setSize(window.innerWidth,window.innerHeight),s.toneMapping=Ea,s.toneMappingExposure=1.12,s.shadowMap.enabled=!t,s.shadowMap.type=xa;const r=new Jc;r.fog=new Yn(Fe.skyHorizon,60,760);const o=new ut(t?62:52,window.innerWidth/window.innerHeight,.1,900),a=new Nn({side:Dt,depthWrite:!1,uniforms:{top:{value:new Ue(Fe.skyTop)},mid:{value:new Ue(Fe.skyMid)},horizon:{value:new Ue(Fe.skyHorizon)},sunDir:{value:new w(0,.16,-1).normalize()},sunColor:{value:new Ue(Fe.sun)}},vertexShader:`
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
        float starMask = smoothstep(0.16, 0.32, h);
        float s = step(0.9991, hash(dir));
        col += vec3(1.0) * s * starMask * 0.8;
        gl_FragColor = vec4(col, 1.0);
      }
    `});r.add(new H(new Ht(700,t?24:40,t?12:20),a));const l=new gn(new ln({map:cn(0,"rgba(240,180,110,0.9)"),transparent:!0,blending:Ot,depthWrite:!1,depthTest:!1}));l.position.set(0,34,-560),l.scale.setScalar(64),o.add(l);const c=new gn(new ln({map:cn(.22,"rgba(230,160,90,0.35)"),transparent:!0,blending:Ot,depthWrite:!1,depthTest:!1}));c.position.set(0,34,-560),c.scale.setScalar(220),o.add(c),r.add(o);const u=new gn(new ln({map:cn(0,"rgba(255,240,205,0.85)"),transparent:!0,blending:Ot,depthWrite:!1,opacity:.5}));u.position.set(250,95,-520),u.scale.setScalar(26),r.add(u);const d=new H(new os(1600,t?32:48),new ie({map:ou(),roughness:1,metalness:0}));d.rotation.x=-Math.PI/2,d.position.y=-.02,d.receiveShadow=!0,r.add(d);const h=[new w(0,0,0),new w(7,0,30),new w(-8,0,62),new w(9,0,96),new w(-9,0,132),new w(8,0,168),new w(-7,0,202),new w(6,0,236),new w(-8,0,270),new w(7,0,304),new w(-6,0,338),new w(8,0,372),new w(-8,0,406),new w(6,0,440),new w(0,0,468)],f=new sn(h,!1,"centripetal",.6);f.arcLengthDivisions=1e3;const g=t?240:500,_=pi(f,4.2,Fe.path,Wi(),g);_.position.y=.012,r.add(_);for(const ae of[-1.5,1.5]){const te=pi(f,.14,Fe.pathEdge,null,g);te.position.set(ae,.025,0),r.add(te)}for(let ae=0;ae<=i(84);ae++){const te=ae/84*.96+.02,oe=f.getPointAt(te),ne=f.getTangentAt(te),ye=new H(new Ne(.14,.03,1.1),new qt({color:14270604}));ye.position.set(oe.x,.045,oe.z),ye.rotation.y=Math.atan2(ne.x,ne.z),r.add(ye)}const m=new H(new Is(f,t?200:400,.05,8,!1),new qt({color:Fe.amber,transparent:!0,opacity:.9,blending:Ot,depthWrite:!1}));m.position.y=.055,r.add(m);const p=m.geometry.index.count;r.add(new ru(4206623,.6)),r.add(new iu(6113906,3811864,.4));const b=new ga(10465496,.4);b.position.set(250,95,-520),r.add(b);const x=new ga(15251840,2.2);x.position.set(-40,60,-120),x.castShadow=!0,x.shadow.mapSize.set(2048,2048),x.shadow.camera.left=-160,x.shadow.camera.right=160,x.shadow.camera.top=200,x.shadow.camera.bottom=-60,x.shadow.camera.near=10,x.shadow.camera.far=700,r.add(x),r.add(x.target);const M=[],L=[],A=e.length;e.forEach((ae,te)=>{const oe=.02+(te+.5)/A*.94,ne=te%2===0?1:-1,ye=au(ae,f,oe,ne,te);M.push(ye),L.push({mesh:ye.front,kind:"panel",index:te}),r.add(ye.group)});for(let ae=0;ae<i(40);ae++){const te=ae*13+Math.random()*7,oe=7+Math.random()*27,ne=4+Math.random()*3.5,ye=4+Math.random()*3.5;r.add(va(ne,oe,ye,te,-78-Math.random()*34)),r.add(va(ne,oe*(.7+Math.random()*.6),ye,te,78+Math.random()*34))}for(let ae=0;ae<i(14);ae++){const te=30+Math.random()*450,oe=Math.random()>.5?1:-1,ne=28+Math.random()*55,ye=42+Math.random()*50;r.add(Sg(new w(oe*(210+Math.random()*150),ne*.4-3,te),ye,ne,38+Math.random()*30))}const R=new ie({color:Fe.hill,roughness:1,flatShading:!0}),C=new H(new Ht(120,24,12),R);C.scale.set(1,.5,4),C.position.set(-230,-2,240),r.add(C);const y=new H(new Ht(150,24,12),R);y.scale.set(1,.55,4.5),y.position.set(280,0,330),r.add(y);const S=[];for(let ae=0;ae<=i(14);ae++){const te=ae/14*.96+.02,oe=f.getPointAt(te),ne=f.getTangentAt(te),ye=ae%2===0?1:-1,_e=new w(-ne.z,0,ne.x).normalize(),T=oe.clone().add(_e.clone().multiplyScalar(ye*4.8));r.add(xs(T,ye));const v=Es(T,ye);S.push({glow:v.glow,pool:v.pool,i:ae}),r.add(v.group)}for(let ae=0;ae<=i(13);ae++){const te=ae/13*.96+.02+.035;if(te>.98)continue;const oe=f.getPointAt(te),ne=f.getTangentAt(te),ye=ae%2===0?-1:1,_e=new w(-ne.z,0,ne.x).normalize(),T=oe.clone().add(_e.clone().multiplyScalar(ye*5.3));r.add(cu(T,ye))}for(let ae=0;ae<i(34);ae++){const te=Math.random(),oe=f.getPointAt(te),ne=f.getTangentAt(te),ye=new w(-ne.z,0,ne.x).normalize(),_e=Math.random()>.5?1:-1,T=oe.clone().add(ye.clone().multiplyScalar(_e*(9+Math.random()*22)));Math.random()<.5?r.add(fg(T,1+Math.random()*2.4)):r.add(pg(T,.3+Math.random()*.9))}const P=[];for(let ae=0;ae<i(26);ae++){const te=Math.random(),oe=f.getPointAt(te),ne=f.getTangentAt(te),ye=new w(-ne.z,0,ne.x).normalize(),_e=Math.random()>.5?1:-1,T=oe.clone().add(ye.clone().multiplyScalar(_e*(8+Math.random()*9))),v=lu(T,.8+Math.random()*.9);P.push({g:v,phase:Math.random()*Math.PI*2}),r.add(v)}for(let ae=0;ae<i(40);ae++){const te=Math.random(),oe=f.getPointAt(te),ne=f.getTangentAt(te),ye=new w(-ne.z,0,ne.x).normalize(),_e=Math.random()>.5?1:-1,T=oe.clone().add(ye.clone().multiplyScalar(_e*(5.8+Math.random()*3.4)));r.add(_g(T,.5+Math.random()*.7))}const O=[];for(let ae=0;ae<i(9);ae++){const te=vg(new w((Math.random()-.5)*130,30+Math.random()*20,Math.random()*440),1.4+Math.random()*2.6);O.push({g:te,speed:.5+Math.random()*.8}),r.add(te)}[{t:.12,side:1,lines:["Audit","d'abord"],tip:"Toute réorganisation commence par l'audit des acteurs du secteur."},{t:.5,side:-1,lines:["Zonage","du territoire"],tip:"Le zonage délimite les espaces publicitaires selon des normes."},{t:.88,side:1,lines:["Mise à jour","continue"],tip:"Un secteur en phase avec l'urbanisation se pérennise."}].forEach(ae=>{const te=f.getPointAt(ae.t),oe=f.getTangentAt(ae.t),ne=new w(-oe.z,0,oe.x).normalize(),ye=te.clone().add(ne.clone().multiplyScalar(ae.side*5.5)),_e=new w().subVectors(te,ye).normalize(),T=Mg(ye,Math.atan2(_e.x,_e.z),ae.lines);L.push({mesh:T.sign,kind:"sign",tip:ae.tip}),r.add(T.group)});const q=mg(t?180:420);r.add(q);const $=[];for(let ae=0;ae<i(40);ae++){const te=Math.random(),oe=f.getPointAt(te),ne=f.getTangentAt(te),ye=new w(-ne.z,0,ne.x).normalize(),_e=Math.random()>.5?1:-1,T=oe.clone().add(ye.clone().multiplyScalar(_e*(5.5+Math.random()*4))),v=new gn(new ln({map:cn(.5,"rgba(240,196,120,1)"),transparent:!0,blending:Ot,depthWrite:!1,opacity:0}));v.position.set(T.x,.8+Math.random()*2.4,T.z),v.scale.setScalar(.5+Math.random()*.5),$.push({sp:v,baseY:v.position.y,phase:Math.random()*Math.PI*2,speed:.8+Math.random()*1.4}),r.add(v)}const W=[];for(let ae=0;ae<i(5);ae++){const te=gg();te.g.position.set(-60+Math.random()*120,9+Math.random()*8,40+Math.random()*120),W.push({g:te.g,l:te.l,r:te.r,phase:Math.random()*Math.PI*2,speed:4+Math.random()*3,y0:te.g.position.y,z0:te.g.position.z}),r.add(te.g)}const Q=[];for(let ae=0;ae<i(7);ae++){const te=Ma();Q.push({g:te.group,cone:te.cone,t:ae/7,speed:.02+Math.random()*.014,phase:Math.random()*Math.PI*2}),r.add(te.group)}const V=new w,le=new w,Me=new w,we=new w;let Ve=performance.now()*.001,Je=-1,X=null,se=5+Math.random()*6,Ee=0;function he(ae){Je=ae}function De(ae,te){const oe=performance.now()*.001,ne=Math.min(.05,Math.max(.001,oe-Ve));Ve=oe;const ye=.005+ae*.98,_e=f.getPointAt(ye),T=f.getTangentAt(ye),v=f.getPointAt(Math.min(ye+.045,.999));Me.set(-T.z,0,T.x).normalize();const F=Math.sin(oe*.7)*.07,Z=Math.sin(oe*.25)*.18;V.set(_e.x+Me.x*Z,_e.y+3.45+F,_e.z+Me.z*Z),le.set(v.x,v.y+2.7,v.z);{let K=0,J=1/0;const fe=ye+.03;for(let Le=0;Le<A;Le++){const ve=.02+(Le+.5)/A*.94,qe=Math.abs(ve-fe);qe<J&&(J=qe,K=Le)}const Ae=xn.clamp(1-J/.08,0,1);if(Ae>0){const Le=M[K].group.position,ve=Ae*Ae*(3-2*Ae);le.lerp(new w(Le.x,Le.y+2.8,Le.z),ve*.85)}}o.up.set(0,1,0),o.lookAt(le);const ee=Math.atan2(T.x,T.z),Y=ee-Ee;Ee=ee;const Te=xn.clamp(Y/Math.max(ne,.001)*.09,-.08,.08);o.rotation.z=xn.lerp(o.rotation.z,Te,.06);const de=55,Se=15.2;we.addScaledVector(V,de*ne),we.addScaledVector(o.position,-de*ne),we.multiplyScalar(Math.max(0,1-Se*ne)),o.position.addScaledVector(we,ne),m.geometry.setDrawRange(0,Math.floor(p*ae)),M.forEach((K,J)=>{const fe=J===te,Ae=J===Je,Le=Math.abs(ae-(.02+(J+.5)/A*.94))<.06,ve=fe?1:Ae?1.09:.86,qe=Ae?1.3:fe?.9:.24,Be=Ae?3.4:fe?2.6:Le?.6:0,je=Ae?.12:.08;K.group.scale.setScalar(xn.lerp(K.group.scale.x,ve,je)),K.frontMat.emissiveIntensity=xn.lerp(K.frontMat.emissiveIntensity,qe,je),K.light&&(K.light.intensity=xn.lerp(K.light.intensity,Be,je)),K.group.position.y=xn.lerp(K.group.position.y,fe?.22:0,.06),K.beaconMat.emissiveIntensity=1.1+Math.sin(oe*2.4+J)*.7;const I=o.position.x-K.group.position.x,ce=o.position.z-K.group.position.z,G=Math.hypot(I,ce),j=xn.clamp(1-G/34,0,1),pe=Math.atan2(I,ce);K.group.rotation.y=xn.lerp(K.group.rotation.y,pe,j*.16)});for(const K of Q){K.t=(K.t+K.speed*ne)%1;const J=f.getPointAt(K.t),fe=f.getTangentAt(K.t);K.g.position.set(J.x,.06+Math.sin(oe*3+K.t*44)*.02,J.z),K.g.rotation.y=Math.atan2(fe.x,fe.z),K.cone.material.opacity=.45+Math.sin(oe*11+K.phase)*.15}for(const K of P)K.g.rotation.z=Math.sin(oe*.9+K.phase)*.05,K.g.rotation.y+=3e-4;for(const K of S){const J=.9+Math.sin(oe*9+K.i*1.7)*.09;K.glow.material.opacity=.72*J,K.pool.material.opacity=.85*J}if(X){const K=(oe-X.t0)/1.05;X.sp.position.lerpVectors(X.from,X.to,Math.min(1,K)),X.sp.material.opacity=Math.sin(Math.min(1,K)*Math.PI),K>=1&&(r.remove(X.sp),X.sp.material.dispose(),X=null,se=8+Math.random()*10)}else if(se-=ne,se<=0){const K=new gn(new ln({map:cn(0,"rgba(255,242,214,1)"),transparent:!0,blending:Ot,depthWrite:!1,opacity:0}));K.scale.setScalar(2.4);const J=new w(120+Math.random()*60,92+Math.random()*36,-330-Math.random()*130);K.position.copy(J),r.add(K),X={sp:K,t0:oe,from:J,to:J.clone().add(new w(-78,-30,16))}}for(const K of $)K.sp.position.y=K.baseY+Math.sin(oe*K.speed+K.phase)*.4,K.sp.material.opacity=.35+.55*(.5+.5*Math.sin(oe*(K.speed+.6)+K.phase*2.7));for(const K of W){K.g.position.x+=K.speed*.02,K.g.position.y=K.y0+Math.sin(oe*1.3+K.phase)*.8;const J=Math.sin(oe*9+K.phase)*.7;K.l.rotation.z=J,K.r.rotation.z=-J,K.g.rotation.z=.25+Math.sin(oe*1.3+K.phase)*.12,K.g.position.x>80&&(K.g.position.x=-80,K.y0=8+Math.random()*9,K.g.position.z=30+Math.random()*90,K.g.position.y=K.y0)}q.rotation.y=oe*.05,q.material.opacity=.5+Math.sin(oe*3)*.12,q.position.x=Math.sin(oe*.12)*2.4,q.position.z=Math.cos(oe*.09)*1.6;for(const K of O)K.g.position.x+=K.speed*.02,K.g.position.x>150&&(K.g.position.x=-150)}const Oe=new cg,We=new xe;function ft(ae,te){We.set(ae,te),Oe.setFromCamera(We,o);const oe=Oe.intersectObjects(L.map(ye=>ye.mesh),!1);if(!oe.length)return null;const ne=oe[0];return ne.distance>45?null:L[L.findIndex(ye=>ye.mesh===ne.object)]}function Ye(){const ae=window.innerWidth,te=window.innerHeight;o.aspect=ae/te,o.updateProjectionMatrix(),s.setSize(ae,te)}function _t(){return o.position.clone()}function N(){s.render(r,o)}return{render:N,resize:Ye,update:De,pick:ft,getCameraPos:_t,setHover:he}}const yo={module:"Module 1",title:"Formation sur la panneautique",subtitle:"Domaine public"},Er=[{name:"Chapitre 1",label:"Introduction"},{name:"Chapitre 2",label:"Réorganisation & Réaménagement du secteur"},{name:"Chapitre 3",label:"Évaluation du système d'exploitation"},{name:"Chapitre 4",label:"Mise à jour"},{name:"Questionnaire",label:"Module 1"}],Ft=[{id:"presentation",chapter:0,num:"01",kicker:"Chapitre 1 · Présentation",title:"La panneautique, un véritable corps de métier",bullets:["Ensemble des moyens et techniques d'installation et de gestion des panneaux publicitaires","Une étude pluridisciplinaire"],content:[{t:"Un métier à part entière",b:"La panneautique, en tant qu'ensemble des moyens et techniques d'installation et de gestion des panneaux publicitaires, est un véritable corps de métier dont l'étude est pluridisciplinaire."},{t:"Ce que vous allez parcourir",b:"L'importance du panneau publicitaire, le constat général du secteur, puis la réorganisation complète en sept étapes, l'évaluation du système et sa mise à jour. Un questionnaire de douze questions clôture le module."}]},{id:"lecon1-importance",chapter:0,num:"02",kicker:"Chapitre 1 · Leçon 1",title:"Le panneau publicitaire et son importance socio-économique",bullets:["Booste la concurrence entre les entreprises","Propulse l'économie : compétitivité des acteurs","Vecteur de publicité : stimule la consommation","Participe à l'embellissement des villes"],content:[{t:"Un moteur pour la concurrence",b:"L'exploitation des panneaux publicitaires est une activité qui booste la concurrence entre les entreprises. Elle propulse l'économie grâce à l'accroissement et à l'amélioration de la compétitivité des différents acteurs de la vie économique d'un pays."},{t:"Le support de publicité par excellence",b:"Vecteur de publicité, le panneau stimule et encourage la consommation. Lorsque l'activité est bien réglementée et bien encadrée, les normes d'exercice garantissent l'équité dans la gestion du secteur. On ne paie pas pour regarder un panneau : c'est le support publicitaire par excellence."},{t:"Une part du décor urbain",b:"Par leurs aménagements, les panneaux publicitaires contribuent à l'embellissement des villes. Le choix des supports ne doit donc plus être motivé seulement par leur design, mais aussi par un besoin d'esthétique, pour un environnement et un cadre de vie plus agréables à la vue."}]},{id:"lecon2-constat",chapter:0,num:"03",kicker:"Chapitre 1 · Leçon 2",title:"Constat général",bullets:["Pléthore de panneaux, parfois dans les capitales","Pollution visuelle, insalubrité, insécurité","Secteur mal organisé, ou pas encadré du tout","Supports délabrés, absence de normes"],content:[{t:"Des villes saturées",b:"Dans beaucoup de villes à travers le monde — l'Afrique en est un bel exemple —, il est fréquent de constater, parfois dans des capitales, des cas de pléthore de panneaux publicitaires, cause de pollution visuelle, d'insalubrité et d'insécurité pour les personnes et les biens."},{t:"Une source : l'anarchie",b:"Un secteur d'exploitation mal organisé, mal encadré, ou pas encadré du tout, où règnent l'anarchie et le désordre, en est la source. L'état délabré et obsolète des supports, l'absence de normes et de réglementations rendent le secteur contre-productif et dégradent l'environnement."},{t:"Des mesures nécessaires",b:"Il importe donc, pour le rayonnement du secteur et pour sa contribution effective au développement socio-économique des villes, que des mesures adéquates soient prises."}]},{id:"audit",chapter:1,num:"04",kicker:"Chapitre 2 · Étape 1 · Audit",title:"Audit de la gestion en cours",bullets:["Liste exhaustive de tous les acteurs du secteur","Examen du mécanisme d'attribution des supports","Examen du cahier des charges"],content:[{t:"Étape 3.1",b:"Pour que l'activité d'exploitation des panneaux publicitaires participe au rayonnement d'une ville (ou d'un pays), il faut faire un audit de la gestion en cours."},{t:"En quoi consiste-t-il ?",b:"En l'établissement de la liste exhaustive de tous les acteurs — entreprise ou personne exploitant des panneaux à des fins publicitaires — et en l'examen du mécanisme d'attribution des supports et du cahier des charges."}]},{id:"etat-lieux",chapter:1,num:"05",kicker:"Chapitre 2 · Étape 2 · État des lieux",title:"État des lieux du parc existant",bullets:["Relevé GPS détaillé et précis de tous les panneaux","Plan piqué géolocalisable des supports"],content:[{t:"Étape 3.2",b:"Faire le relevé (GPS) détaillé et précis de l'ensemble des panneaux publicitaires présents."},{t:"Un plan géolocalisable",b:"Établir le plan piqué géolocalisable de ces supports : chaque panneau est localisé avec précision sur le territoire."}]},{id:"zonage",chapter:1,num:"06",kicker:"Chapitre 2 · Étape 3 · Zonage",title:"Zonage du territoire",bullets:["Délimitation selon des normes spécifiques du territoire","Des supports facteurs d'embellissement et de modernité","Paysage publicitaire harmonieux et équilibré","Grilles tarifaires adaptées aux réalités locales"],content:[{t:"Étape 3.3",b:"Pour un réaménagement optimal du plan d'implantation des panneaux publicitaires, il faut effectuer des délimitations suivant des normes spécifiques du territoire et proposer des supports facteurs d'embellissement et symboles de modernité."},{t:"Le but du zonage",b:"Créer les conditions d'un développement harmonieux et équilibré du paysage de l'affichage publicitaire, ainsi que l'établissement de grilles tarifaires en adéquation avec les réalités économiques des villes. Il consiste donc à délimiter des espaces à cette fin."}]},{id:"constitution-lots",chapter:1,num:"07",kicker:"Chapitre 2 · Étape 4 · Constitution des lots",title:"Constitution des lots",bullets:["Le « Mobilier Urbain de Publicité » : des objets d'embellissement","Des lots pour les appels d'offres","Équilibre des espaces et des types de supports"],content:[{t:"Étape 4",b:"Le terme « Mobilier Urbain de Publicité » s'inscrit dans un contexte où les panneaux publicitaires ne sont plus seulement des supports publicitaires, mais de véritables objets (ou meubles) d'embellissement et de décoration des villes."},{t:"Vers les appels d'offres",b:"Après études et validation des supports devant être pris en compte dans le cadre du réaménagement, on procède à la constitution des lots devant faire l'objet d'appels d'offres pour la mise en concession des différents espaces publicitaires."},{t:"Un équilibre garanti",b:"La constitution des lots est faite de manière à garantir l'équilibre des espaces et celui en matière de type de support des différentes régies publicitaires."}]},{id:"mise-concession",chapter:1,num:"08",kicker:"Chapitre 2 · Étape 5 · Mise en concession",title:"Mise en concession des espaces",bullets:["Une technique variable selon les pays","Fonction des réalités économiques et législatives","À traiter au cas par cas"],content:[{t:"Étape 5",b:"La technique de mise en concession des espaces publicitaires est variable. Elle est fonction des réalités économiques, politico-administratives et de la législation en vigueur dans chaque pays."},{t:"À retenir",b:"NB : il faut partir d'exemples précis et traiter le sujet au cas par cas."}]},{id:"attribution",chapter:1,num:"09",kicker:"Chapitre 2 · Étape 6 · Attribution",title:"Attribution des espaces",bullets:["Sur la base du cahier des charges","Contenu dans le dossier d'appel d'offres"],content:[{t:"Étape 6",b:"L'attribution des espaces aux régies publicitaires est faite sur la base du cahier des charges contenu dans le dossier d'appel d'offres."}]},{id:"gestion",chapter:1,num:"10",kicker:"Chapitre 2 · Étape 7 · Gestion",title:"Gestion des régies publicitaires",bullets:["Collectivités locales ou Gouvernement","Selon les textes en vigueur dans chaque pays","Transparence, professionnalisme, efficience"],content:[{t:"Étape 7",b:"La gestion des régies publicitaires est faite, dans certains pays, par les collectivités locales. Dans d'autres, elle est du ressort du Gouvernement par l'intermédiaire du Ministère de la Communication, etc."},{t:"L'essentiel",b:"Plus généralement, c'est selon les textes et dispositions en vigueur dans chaque pays. L'essentiel est que la transparence, le professionnalisme et l'efficience soient rigoureusement observés."}]},{id:"evaluation",chapter:2,num:"11",kicker:"Chapitre 3 · Évaluation",title:"Évaluer le système d'exploitation du Mobilier Urbain de Publicité",bullets:["Évaluer tout le processus, de l'audit à la gestion","Un mécanisme scientifiquement soutenable et autonome","Prévenir les dérapages, sécuriser sur le long terme"],content:[{t:"Chapitre 3",b:"Pour garantir un développement harmonieux du secteur d'exploitation des panneaux publicitaires / Mobilier Urbain de Publicité, il faut prévoir, dans les réformes, un mécanisme d'évaluation de l'ensemble du processus, depuis l'audit jusqu'à la gestion des régies publicitaires."},{t:"Un pilotage autonome",b:"Le mécanisme d'évaluation doit être scientifiquement soutenable, avec une autonomie certaine dans son pilotage. L'évaluation permet de prévenir les risques de dérapage et de sécuriser les intérêts des différents acteurs du secteur et des populations, à travers leur cadre de vie, sur le long terme."}]},{id:"mise-a-jour",chapter:3,num:"12",kicker:"Chapitre 4 · Mise à jour",title:"Pérenniser et faire évoluer le secteur",bullets:["Pérenniser les acquis de développement","Le rayonnement des villes par les supports","Une évolution en phase avec l'urbanisation"],content:[{t:"Chapitre 4",b:"La mise à jour du secteur d'exploitation des panneaux publicitaires / Mobilier Urbain de Publicité est importante pour pérenniser les acquis de développement de l'activité."},{t:"Pourquoi ?",b:"Elle est importante pour le rayonnement des villes par l'exploitation des supports de publicité et favorisera l'essor de l'activité en adéquation avec l'urbanisation."},{t:"Concrètement",b:"Elle consiste à s'assurer que le secteur, dans son évolution, soit en phase avec l'évolution démographique et le développement infrastructurel des villes."}]},{id:"quiz",chapter:4,num:"13",kicker:"Questionnaire · Module 1",title:"Douze questions pour valider le module",bullets:["5 définitions","7 questions de compréhension","Testez vos acquis en fin de parcours"],content:[]}],Zi=[{q:"Que désigne la panneautique ?",options:["L'ensemble des moyens et techniques d'installation et de gestion des panneaux publicitaires","La seule vente d'espaces publicitaires","La fabrication du mobilier urbain","La régulation des réseaux sociaux"],correct:0,explain:"La panneautique est l'ensemble des moyens et techniques d'installation et de gestion des panneaux publicitaires — un corps de métier pluridisciplinaire."},{q:"Quel est le but du zonage ?",options:["Multiplier les panneaux pour maximiser les recettes","Créer les conditions d'un développement harmonieux et équilibré du paysage de l'affichage publicitaire","Supprimer toute publicité des villes","Uniformiser tous les panneaux du pays"],correct:1,explain:"Le zonage délimite des espaces pour un paysage publicitaire harmonieux et équilibré, et établit des grilles tarifaires adaptées aux réalités économiques."},{q:"Que désigne le « Mobilier Urbain de Publicité » ?",options:["Les panneaux posés sur le mobilier des cafés","La publicité diffusée à la télévision urbaine","Des panneaux devenus de véritables objets d'embellissement et de décoration des villes","Les panneaux strictement destinés à la location"],correct:2,explain:"Le Mobilier Urbain de Publicité : des panneaux qui ne sont plus de simples supports, mais de véritables meubles d'embellissement et de décoration des villes."},{q:"Qu'est-ce qu'une régie publicitaire ?",options:["L'organisme autorisé à gérer et exploiter des espaces publicitaires","L'autorité qui interdit la publicité","L'entreprise qui imprime les affiches","L'organisme de contrôle des réseaux sociaux"],correct:0,explain:"Les régies publicitaires sont les exploitants auxquels les espaces sont attribués sur la base du cahier des charges contenu dans le dossier d'appel d'offres."},{q:"Qu'est-ce que la pollution visuelle, dans le cadre de l'exploitation des panneaux ?",options:["Les panneaux trop colorés","La publicité lumineuse la nuit","Le bruit produit par les panneaux numériques","Une pléthore de panneaux mal organisés qui dégrade le cadre de vie"],correct:3,explain:"Une pléthore de panneaux issus d'un secteur mal organisé ou non encadré est cause de pollution visuelle, d'insalubrité et d'insécurité."},{q:"En quoi consiste une réorganisation du secteur d'exploitation des panneaux publicitaires ?",options:["À augmenter le nombre d'exploitants","À privatiser tous les supports","À remettre de l'ordre : audit, état des lieux, zonage, lots, concession, attribution, gestion","À supprimer le cahier des charges"],correct:2,explain:"La réorganisation suit sept étapes : audit, état des lieux, zonage, constitution des lots, mise en concession, attribution des espaces et gestion des régies."},{q:"En quoi consiste le réaménagement de l'espace publicitaire d'une ville ?",options:["Délimiter des zones et proposer des supports facteurs d'embellissement et de modernité","Remplacer tous les panneaux par des écrans numériques","Retirer les panneaux des centres-villes","Uniformiser les tarifs à l'échelle nationale"],correct:0,explain:"Le réaménagement repose sur le zonage : délimiter des espaces selon des normes et proposer des supports qui embellissent et modernisent le cadre de vie."},{q:"Comment prévenir la pollution visuelle due à l'exploitation des panneaux ?",options:["En interdisant toute nouvelle publicité","En augmentant le nombre de panneaux","En confiant le secteur à une seule régie","En réglementant, auditant et zonant le secteur d'exploitation"],correct:3,explain:"Un secteur réglementé et encadré (audit, état des lieux, zonage, normes) prévient la pléthore de panneaux à l'origine de la pollution visuelle."},{q:"Comment s'assurer d'une bonne rentabilité et de la pérennité du secteur ?",options:["En baissant tous les tarifs","Par la transparence, le professionnalisme, l'efficience et une mise à jour régulière","En vendant les panneaux aux enchères chaque année","En supprimant l'évaluation"],correct:1,explain:"Transparence, professionnalisme et efficience sont essentiels ; l'évaluation et la mise à jour régulière pérennisent les acquis du secteur."},{q:"Peut-on installer un panneau publicitaire n'importe où ? Pourquoi ?",options:["Oui, la liberté d'entreprendre le permet","Oui, sauf dans les capitales","Non, l'implantation suit des normes, un zonage et des délimitations","Non, uniquement sur les autoroutes"],correct:2,explain:"L'implantation suit un zonage et des délimitations selon des normes spécifiques du territoire, pour un développement harmonieux et un cadre de vie agréable."},{q:"Quelle est l'importance du panneau publicitaire dans une ville ?",options:["Il booste la concurrence, l'économie et embellit le cadre de vie","Il ne sert qu'à décorer","Il remplace les marchés publics","Il est surtout un obstacle à la circulation"],correct:0,explain:"Il booste la concurrence entre entreprises, propulse l'économie et, bien aménagé, contribue à l'embellissement des villes."},{q:"N'importe qui peut-il exercer l'activité d'exploitation de panneaux publicitaires ?",options:["Oui, c'est totalement libre","Oui, moyennant une simple taxe","Non, seuls les ministères peuvent exploiter","Non : acteurs identifiés, appels d'offres et gestion encadrée"],correct:3,explain:"Le secteur est encadré : audit des acteurs, appels d'offres, cahier des charges, concession et gestion selon les textes en vigueur."}],st=n=>document.querySelector(n);function xg(){const n={topbar:st("#ui-topbar"),chapter:st("#ui-chapter"),progressFill:st("#ui-progress-fill"),dots:st("#ui-dots"),hint:st("#ui-hint"),clickHint:st("#ui-click-hint"),title:st("#ui-title"),card:st("#ui-card"),cardKicker:st("#ui-card .card-kicker"),cardTitle:st("#ui-card .card-title"),cardBody:st("#ui-card .card-body"),quiz:st("#ui-quiz"),quizScore:st("#quiz-score"),quizList:st("#quiz-list"),quizFill:st("#quiz-progress-fill"),quizResult:st("#quiz-result"),resultTitle:st("#quiz-result .result-title"),resultText:st("#quiz-result .result-text"),reader:st("#ui-reader"),readerKicker:st("#ui-reader .reader-kicker"),readerTitle:st("#ui-reader .reader-title"),readerBody:st("#ui-reader .reader-body"),readerCount:st("#reader-count"),readerPrev:st("#reader-prev"),readerNext:st("#reader-next"),readerClose:st("#reader-close"),toast:st("#ui-toast"),cardOpen:st("#card-open")};Ft.forEach((_,m)=>{const p=document.createElement("span");p.className="dot"+(m===0?" active":""),p.dataset.index=m,n.dots.appendChild(p)});const e={activeIndex:-1,quizAnswered:new Set,score:0,started:!1,readerOpen:!1,readerIndex:-1};let t=null,i=null;function s(_){n.progressFill.style.width=(_*100).toFixed(2)+"%"}function r(_){const m=Er[_];n.chapter.textContent=m?`${m.name} — ${m.label}`:""}function o(_,m){if(_===e.activeIndex)return;e.activeIndex=_;const p=Ft[_];document.querySelectorAll(".dot").forEach((x,M)=>{x.classList.toggle("active",M===_)});const b=p.id==="quiz";n.card.classList.toggle("show",!b&&_!==-1),n.quiz.classList.toggle("show",b),b||(n.cardKicker.textContent=p.kicker,n.cardTitle.textContent=p.title,n.cardBody.innerHTML=`<p class="card-note">Leçon prête à lire : ouvrez la fenêtre dédiée pour parcourir l'étape en entier.</p>`),r(p.chapter)}function a(_){_>.015&&(e.started=!0),n.title.classList.toggle("hide",e.started)}function l(_,m){s(_),o(m),a(_);const p=n.quiz.classList.contains("show");n.clickHint.classList.toggle("visible",m>=0&&!p&&!e.readerOpen)}function c(_){e.readerIndex=_,e.readerOpen=!0;const m=Ft[_];if(n.readerKicker.textContent=m.kicker,n.readerTitle.textContent=m.title,n.readerBody.innerHTML="",m.id==="quiz"){const p=document.createElement("ul");p.className="reader-bullets",m.bullets.forEach(x=>{const M=document.createElement("li");M.textContent=x,p.appendChild(M)}),n.readerBody.appendChild(p);const b=document.createElement("button");b.className="reader-quiz-btn",b.textContent="Lancer le questionnaire",b.addEventListener("click",u),n.readerBody.appendChild(b)}else m.content.forEach(p=>{const b=document.createElement("p"),x=document.createElement("span");x.className="body-t",x.textContent=p.t,b.appendChild(x),b.appendChild(document.createTextNode(p.b)),n.readerBody.appendChild(b)});n.readerCount.textContent=`${String(_+1).padStart(2,"0")} / ${String(Ft.length).padStart(2,"0")}`,n.title.classList.add("hide"),n.reader.classList.add("show"),t&&t(!0)}function u(){e.readerOpen&&(e.readerOpen=!1,n.reader.classList.remove("show"),t&&t(!1))}function d(_){if(!e.readerOpen)return;const m=Math.max(0,Math.min(Ft.length-1,e.readerIndex+_));m!==e.readerIndex&&c(m)}n.readerClose.addEventListener("click",u),n.readerPrev.addEventListener("click",()=>d(-1)),n.readerNext.addEventListener("click",()=>d(1)),n.reader.addEventListener("click",_=>{_.target===n.reader&&u()}),n.cardOpen.addEventListener("click",()=>{e.activeIndex>=0&&c(e.activeIndex)});function h(_){n.toast.textContent=_,n.toast.classList.add("show"),clearTimeout(i),i=setTimeout(()=>n.toast.classList.remove("show"),4600)}uu(e,n);function f(){return n.quiz.classList.contains("show")}function g(_){if(!f())return;const m=n.quizList.querySelectorAll(".quiz-card");for(const p of m){if(p.classList.contains("done"))continue;const b=p.querySelectorAll(".quiz-opt");_<b.length&&b[_].click();return}}return{updateGlobal:l,el:n,openReader:c,closeReader:u,readerNav:d,showToast:h,isReaderOpen:()=>e.readerOpen,quizOpen:f,answerQuiz:g,setReaderListener:_=>{t=_}}}function uu(n,e){const t=e.quizList;t.innerHTML="",Zi.forEach((i,s)=>{const r=document.createElement("div");r.className="quiz-card",r.innerHTML=`
      <div class="quiz-num">Question ${String(s+1).padStart(2,"0")}</div>
      <div class="quiz-q"></div>
      <div class="quiz-opts"></div>
      <div class="quiz-explain"></div>
    `,r.querySelector(".quiz-q").textContent=i.q;const o=r.querySelector(".quiz-opts");i.options.forEach((a,l)=>{const c=document.createElement("button");c.className="quiz-opt",c.innerHTML=`<span class="opt-letter">${String.fromCharCode(65+l)}.</span> <span class="opt-text"></span>`,c.querySelector(".opt-text").textContent=a,c.addEventListener("click",()=>{if(n.quizAnswered.has(s))return;n.quizAnswered.add(s);const u=l===i.correct;o.querySelectorAll(".quiz-opt").forEach((h,f)=>{f===i.correct?h.classList.add("correct"):f===l?h.classList.add("wrong"):h.classList.add("dim")}),u&&(n.score++,document.querySelector("#quiz-score").textContent=n.score);const d=r.querySelector(".quiz-explain");d.textContent=i.explain,d.classList.add("show"),r.classList.add("done",u?"correct-q":"wrong-q"),e.quizFill.style.width=(n.quizAnswered.size/Zi.length*100).toFixed(2)+"%",n.quizAnswered.size===Zi.length&&Eg(n,e)}),o.appendChild(c)}),t.appendChild(r)})}function Eg(n,e){const t=Math.round(n.score/Zi.length*100);let i;t>=90?i="Excellent ! Vous maîtrisez le module sur le bout des doigts.":t>=70?i="Très bien ! Quelques points à consolider, mais la base est solide.":t>=50?i="Bien. Relisez les leçons indiquées pour consolider vos acquis.":i="Le module mérite une seconde lecture : remontez le parcours et revivez les étapes.",e.resultTitle.textContent=t>=70?"Formation validée":"Formation à revoir";const s=Zi.length-n.score;e.resultText.innerHTML=`Score : <strong>${n.score} / ${Zi.length}</strong> — ${i}<br><span class="result-breakdown">${n.score} bonne${n.score>1?"s":""} réponse${n.score>1?"s":""} · ${s} à revoir</span>`,e.quizResult.classList.remove("hide"),document.querySelector("#quiz-retry").addEventListener("click",()=>{n.quizAnswered.clear(),n.score=0,document.querySelector("#quiz-score").textContent=0,e.quizFill.style.width="0%",e.quizResult.classList.add("hide"),uu(n,e)}),document.querySelector("#quiz-restart").addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})})}const gt={sky0:"#1d0f18",sky1:"#3a1f1c",sky2:"#7a4028",sky3:"#c4713a",sky4:"#e69a52",sky5:"#f0b26a",moon:"#f6e7cd",asphalt0:"#3a2b1c",asphalt1:"#241a10",asphalt2:"#1a110a",bronze:"#8a6a3d",terracotta:"#c1683f",amber:"#e8a35c"},Jt=Math.PI*2;function xt(n,e,t,i,s,r){n.beginPath(),n.moveTo(e+r,t),n.arcTo(e+i,t,e+i,t+s,r),n.arcTo(e+i,t+s,e,t+s,r),n.arcTo(e,t+s,e,t,r),n.arcTo(e,t,e+i,t,r),n.closePath()}function ht(n,e,t,i,s,r){n.font=s,n.textAlign="center",n.fillStyle=r,n.fillText(e,t,i)}function bg(n,e,t){const i=n.createLinearGradient(0,0,0,t);i.addColorStop(0,gt.sky0),i.addColorStop(.3,gt.sky1),i.addColorStop(.58,gt.sky2),i.addColorStop(.78,gt.sky3),i.addColorStop(.9,gt.sky4),i.addColorStop(1,gt.sky5),n.fillStyle=i,n.fillRect(0,0,e,t);for(let r=0;r<110;r++){const o=Math.random()*e,a=Math.random()*t*.52,l=(1-a/(t*.52))*(.15+Math.random()*.5);n.fillStyle=`rgba(255,236,205,${l.toFixed(3)})`;const c=.6+Math.random()*1.2;n.fillRect(o,a,c,c)}const s=n.createRadialGradient(e/2,t*.6,10,e/2,t*.6,e*.72);s.addColorStop(0,"rgba(255,180,110,0.55)"),s.addColorStop(.5,"rgba(255,150,85,0.2)"),s.addColorStop(1,"rgba(255,150,85,0)"),n.fillStyle=s,n.fillRect(0,0,e,t)}function wg(n,e,t){const i=e*.8,s=t*.14,r=t*.075,o=n.createRadialGradient(i,s,r*.4,i,s,r*4.5);o.addColorStop(0,"rgba(255,236,205,0.9)"),o.addColorStop(.25,"rgba(255,225,185,0.25)"),o.addColorStop(1,"rgba(255,225,185,0)"),n.fillStyle=o,n.fillRect(0,0,e,t),n.fillStyle=gt.moon,n.beginPath(),n.arc(i,s,r,0,Jt),n.fill(),n.fillStyle="rgba(178,158,128,0.4)";for(let a=0;a<7;a++)n.beginPath(),n.arc(i+(Math.random()-.5)*r*1.4,s+(Math.random()-.5)*r*1.4,r*(.06+Math.random()*.15),0,Jt),n.fill()}function xo(n,e,t,{minH:i,maxH:s,alpha:r,body:o,win:a,density:l,tall:c=.14}){let u=-12;for(;u<e+12;){const d=22+Math.random()*52,h=i+Math.random()*(s-i);n.fillStyle=o,n.globalAlpha=r,n.fillRect(u,t-h,d,h),Math.random()<c&&(n.fillRect(u+d/2-1,t-h-12,2,12),Math.random()<.5&&(n.fillStyle="rgba(232,80,60,0.8)"),n.fillRect(u+d/2-1,t-h-12,2,2));const f=Math.floor(d/14);for(let g=0;g<f;g++)for(let _=0;_<Math.floor(h/17);_++)if(Math.random()<l){const m=u+5+g*14,p=t-h+7+_*17;n.fillStyle=a,n.globalAlpha=r*(.4+Math.random()*.6),n.fillRect(m,p,4.5,6.5),Math.random()<.28&&(n.fillStyle="rgba(255,220,160,0.4)",n.fillRect(m-1.5,p-1.5,7.5,9.5))}n.globalAlpha=1,u+=d+4+Math.random()*9}}function bi(n,e,t,{withMoon:i=!0}={}){const s=t*.6;return bg(n,e,t),i&&wg(n,e,t),xo(n,e,s,{minH:34,maxH:92,alpha:.5,body:"#5a3320",win:"#ffd9a0",density:.3}),xo(n,e,s,{minH:20,maxH:62,alpha:.68,body:"#301d13",win:"#ffc888",density:.5}),xo(n,e,s,{minH:13,maxH:44,alpha:.95,body:"#180f0a",win:"#ffb870",density:.68}),Tg(n,e,s),s}function Tg(n,e,t){const i=n.canvas.height,s=e/2,r=n.createLinearGradient(0,t,0,i);r.addColorStop(0,gt.asphalt0),r.addColorStop(.5,gt.asphalt1),r.addColorStop(1,gt.asphalt2),n.fillStyle=r,n.beginPath(),n.moveTo(s-1,t),n.lineTo(-40,i+20),n.lineTo(e+40,i+20),n.lineTo(s+1,t),n.closePath(),n.fill();const o=n.createRadialGradient(e/2,t+(i-t)*.38,6,e/2,t+(i-t)*.38,e*.24);o.addColorStop(0,"rgba(255,175,95,0.3)"),o.addColorStop(1,"rgba(255,175,95,0)"),n.fillStyle=o,n.fillRect(0,t,e,i-t),n.strokeStyle="rgba(217,192,140,0.6)",n.lineWidth=2,n.setLineDash([16,30]),n.beginPath(),n.moveTo(s,t+2),n.lineTo(s,i+20),n.stroke(),n.setLineDash([]),n.strokeStyle="rgba(217,192,140,0.22)",n.lineWidth=3;for(const a of[-1,1])n.beginPath(),n.moveTo(s+a*1.2,t+2),n.lineTo(e/2+a*e*.48,i+10),n.stroke()}function $n(n,e,t,i,s){n.save(),n.translate(e,t),n.rotate(s||0),n.globalAlpha=.34,n.fillStyle="#000",n.beginPath(),n.ellipse(0,0,62*i,10*i,0,0,Jt),n.fill(),n.globalAlpha=1;const r=n.createLinearGradient(-46*i,0,-38*i,0);r.addColorStop(0,"#1c120a"),r.addColorStop(1,"#3a2818"),n.fillStyle=r,n.fillRect(-46*i,-80*i,9*i,80*i),n.fillRect(37*i,-80*i,9*i,80*i);const o=134*i,a=98*i,l=-o/2,c=-186*i;xt(n,l,c,o,a,7*i),n.fillStyle="#241a12",n.fill(),n.lineWidth=5*i,n.strokeStyle=gt.bronze,n.stroke();const u=n.createLinearGradient(0,c,0,c+a);u.addColorStop(0,"#332518"),u.addColorStop(1,"#1a120b"),xt(n,l+7*i,c+7*i,o-14*i,a-14*i,5*i),n.fillStyle=u,n.fill(),n.fillStyle=gt.terracotta,n.fillRect(l+7*i,c+7*i,o-14*i,5*i),n.strokeStyle="rgba(242,232,212,0.16)",n.lineWidth=1.5*i,xt(n,l+13*i,c+15*i,o-26*i,a-26*i,4*i),n.stroke(),ht(n,"PANNEAUTIQUE · DOMAINE PUBLIC",0,c+34*i,`600 ${Math.max(7,9*i)}px Arial`,"rgba(242,232,212,0.85)"),ht(n,"PUBLICITÉ & AFFICHAGE",0,c+60*i,`700 ${Math.max(10,15*i)}px Georgia`,"#f2e8d4"),ht(n,"RÈGLES · ZONES · CONCESSIONS",0,c+80*i,`700 ${Math.max(6,8*i)}px Arial`,"rgba(232,163,92,0.9)"),n.fillStyle=gt.amber,n.shadowColor=gt.amber,n.shadowBlur=16*i,n.beginPath(),n.arc(0,c-6*i,3*i,0,Jt),n.fill(),n.shadowBlur=0;const d=n.createRadialGradient(0,-70*i,4,0,-70*i,48*i);d.addColorStop(0,"rgba(232,163,92,0.2)"),d.addColorStop(1,"rgba(232,163,92,0)"),n.fillStyle=d,n.fillRect(-64*i,-124*i,128*i,64*i),n.restore()}function Ag(n,e,t,i,s){n.save(),n.translate(e,t),n.strokeStyle="#120c07",n.lineCap="round",n.lineWidth=Math.max(3,i*.035),n.beginPath(),n.moveTo(0,0),n.quadraticCurveTo(10,-i*.5,5,-i*.94),n.stroke(),n.fillStyle="#120c07";for(let r=0;r<6;r++){const o=-Math.PI*.95+r/5*Math.PI*.62;n.beginPath(),n.ellipse(Math.cos(o)*i*.34,-i*.97+Math.sin(o)*i*.1,i*.3,i*.05,o-Math.PI/2,0,Jt),n.fill()}n.restore()}function Bs(n,e,t,i){const s=n.canvas.width,r=n.canvas.height;n.fillStyle="rgba(20,13,8,0.74)",n.fillRect(0,t,s,r-t),n.fillStyle="rgba(232,163,92,0.18)",n.fillRect(0,t,s,2),ht(n,e,s/2,t+i*1.45,`700 ${i}px Georgia`,gt.amber)}function Yt(n,e,t,i){const s=n.createRadialGradient(e/2,i,4,e/2,i,t*.6);s.addColorStop(0,"rgba(255,178,108,0.16)"),s.addColorStop(1,"rgba(255,178,108,0)"),n.fillStyle=s,n.fillRect(0,0,e,t);const r=n.createRadialGradient(e/2,t*.45,e*.2,e/2,t*.5,e*.74);r.addColorStop(0,"rgba(0,0,0,0)"),r.addColorStop(1,"rgba(8,4,2,0.52)"),n.fillStyle=r,n.fillRect(0,0,e,t);const o=n.createLinearGradient(0,0,0,t*.42);o.addColorStop(0,"rgba(24,12,28,0.22)"),o.addColorStop(1,"rgba(24,12,28,0)"),n.fillStyle=o,n.fillRect(0,0,e,t*.42),n.globalAlpha=.055;for(let a=0;a<420;a++)n.fillStyle=Math.random()>.5?"#fff":"#000",n.fillRect(Math.random()*e,Math.random()*t,1,1);n.globalAlpha=1}function Ba(n,e,t){const i=n.createLinearGradient(0,0,0,t);i.addColorStop(0,"#2c2016"),i.addColorStop(.7,"#4a3424"),i.addColorStop(1,"#1a120b"),n.fillStyle=i,n.fillRect(0,0,e,t),n.fillStyle="rgba(20,13,8,0.32)";for(let c=0;c<5;c++)n.fillRect(e*(.04+c*.2),t*.05,e*.14,t*.44);const s=e*.6,r=t*.1,o=e*.26,a=t*.36;xt(n,s,r,o,a,8);const l=n.createLinearGradient(0,r,0,r+a);l.addColorStop(0,"#7a4028"),l.addColorStop(1,"#c4713a"),n.fillStyle=l,n.fill(),n.strokeStyle="#1a120b",n.lineWidth=6,xt(n,s,r,o,a,8),n.stroke(),n.strokeStyle="rgba(20,13,8,0.5)",n.lineWidth=3,n.beginPath(),n.moveTo(s+o/2,r),n.lineTo(s+o/2,r+a),n.moveTo(s,r+a/2),n.lineTo(s+o,r+a/2),n.stroke()}function ka(n,e,t){const i=t*.64,s=n.createLinearGradient(0,i,0,t);s.addColorStop(0,"#7a5632"),s.addColorStop(.2,"#5a3d22"),s.addColorStop(1,"#33220f"),n.fillStyle=s,n.beginPath(),n.moveTo(e*.05,i),n.lineTo(e*.95,i),n.lineTo(e*.85,t),n.lineTo(e*.15,t),n.fill(),n.fillStyle="#4a301c",n.beginPath(),n.moveTo(e*.12,t*.8),n.lineTo(e*.88,t*.8),n.lineTo(e*.85,t),n.lineTo(e*.15,t),n.fill(),n.fillStyle="rgba(0,0,0,0.25)",n.beginPath(),n.moveTo(e*.05,i),n.lineTo(e*.95,i),n.lineTo(e*.93,i+10),n.lineTo(e*.07,i+10),n.fill()}function Cr(n,e,t,i,s,r,o){if(n.save(),n.translate(e,t),n.rotate(r||0),n.shadowColor="rgba(0,0,0,0.4)",n.shadowBlur=18,n.shadowOffsetY=10,xt(n,-i/2,-s/2,i,s,4),n.fillStyle="#f4ead0",n.fill(),n.shadowBlur=0,n.strokeStyle="rgba(120,100,70,0.5)",n.lineWidth=2,n.stroke(),n.fillStyle=gt.terracotta,n.fillRect(-i/2,-s/2,i,s*.06),o){const a=typeof o=="number"?o:o.length;n.fillStyle="rgba(60,50,34,0.5)";for(let l=0;l<a;l++)n.fillRect(-i*.36,-s*.26+l*s*.09,i*.72,s*.02)}n.restore()}function du(n,e,t){const i=n.createLinearGradient(0,0,0,t);i.addColorStop(0,"#efe7d3"),i.addColorStop(1,"#e0d3b6"),n.fillStyle=i,n.fillRect(0,0,e,t);for(let s=0;s<80;s++){const r=22+Math.random()*64,o=14+Math.random()*42;n.fillStyle=`rgba(178,166,138,${(.12+Math.random()*.2).toFixed(3)})`,n.fillRect(Math.random()*(e-r),Math.random()*(t-o),r,o)}n.fillStyle="rgba(120,162,184,0.4)",n.beginPath(),n.moveTo(0,t*.06),n.bezierCurveTo(e*.3,t*0,e*.62,t*.12,e*.8,t*.05),n.lineTo(e*.88,0),n.lineTo(0,0),n.fill(),n.strokeStyle="rgba(120,104,80,0.55)",n.lineWidth=2.5;for(let s=0;s<7;s++){const r=t*(.13+s*.13);n.beginPath(),n.moveTo(0,r),n.bezierCurveTo(e*.3,r+20,e*.6,r-20,e,r+8),n.stroke()}for(let s=0;s<9;s++){const r=e*(.1+s*.1);n.beginPath(),n.moveTo(r,0),n.bezierCurveTo(r+16,t*.3,r-16,t*.62,r+10,t),n.stroke()}n.lineWidth=5,n.strokeStyle="rgba(193,104,63,0.4)",n.beginPath(),n.moveTo(0,t*.2),n.bezierCurveTo(e*.35,t*.26,e*.55,t*.55,e*.84,t*.72),n.stroke(),n.save(),n.translate(e*.06,t*.09),n.fillStyle="rgba(255,255,255,0.65)",n.beginPath(),n.arc(0,0,26,0,Jt),n.fill(),n.strokeStyle="rgba(90,74,52,0.6)",n.lineWidth=2,n.stroke(),n.fillStyle=gt.terracotta,n.beginPath(),n.moveTo(0,-18),n.lineTo(5,0),n.lineTo(-5,0),n.closePath(),n.fill(),ht(n,"N",0,-32,"700 15px Georgia","rgba(90,74,52,0.9)"),n.restore()}function Ms(n,e,t,i,s){n.save(),n.shadowColor="rgba(0,0,0,0.4)",n.shadowBlur=8,n.shadowOffsetY=4,n.fillStyle=i,n.beginPath(),n.moveTo(e,t-34),n.quadraticCurveTo(e+16,t-4,e+12,t-2),n.lineTo(e,t+6),n.lineTo(e-12,t-2),n.quadraticCurveTo(e-16,t-4,e,t-34),n.fill(),n.shadowBlur=0,n.fillStyle="#fff",n.beginPath(),n.arc(e,t-30,7.5,0,Jt),n.fill(),n.fillStyle=i,n.beginPath(),n.arc(e,t-30,3.5,0,Jt),n.fill(),s&&(n.font="800 19px Georgia",n.lineWidth=4,n.strokeStyle="rgba(240,236,220,0.9)",n.strokeText(s,e+17,t-22),n.fillStyle="#2a2118",n.fillText(s,e+17,t-22)),n.restore()}function Eo(n,e,t,i,s,r,o,a){const l=Math.PI*.75,c=Math.PI*1.5;n.lineCap="round",n.beginPath(),n.arc(e,t,i,l,l+c),n.strokeStyle="rgba(242,232,212,0.14)",n.lineWidth=14,n.stroke();const u=n.createLinearGradient(e-i,0,e+i,0);u.addColorStop(0,gt.terracotta),u.addColorStop(1,s),n.beginPath(),n.arc(e,t,i,l,l+c*r),n.strokeStyle=u,n.lineWidth=14,n.stroke(),ht(n,String(Math.round(r*100))+"%",e,t+8,"800 34px Georgia","#f2e8d4"),ht(n,o,e,t+i*.78+8,"700 18px Arial","rgba(242,232,212,0.7)")}function hu(n,e,t){const i=bi(n,e,t);Ag(n,e*.1,i+20,t*.5),$n(n,e*.5,i+2,1.12,0),Bs(n,"LE PARCOURS DE LA PANNEAUTIQUE SUR LE DOMAINE PUBLIC",t*.86,t*.03),Yt(n,e,t,i)}function Rg(n,e,t){const i=bi(n,e,t),s=5;for(let r=0;r<s;r++){const o=r===2,a=e*(.14+r*.18),l=i+(t-i)*.82*Math.pow(1-r/(s-1),.7)*.85+i*.12,c=.5+.18*r+(o?.12:0);$n(n,a,Math.min(l,t-10),c,o?0:(r-2)*.05)}ht(n,"LA PANNEAUTIQUE, LEVIER ÉCONOMIQUE DU DOMAINE PUBLIC",e/2,t*.3,"700 34px Georgia","rgba(242,232,212,0.95)"),n.shadowColor="rgba(0,0,0,0.6)",n.shadowBlur=12,ht(n,"CHAQUE SUPPORT EST UNE RESSOURCE",e/2,t*.34,"600 20px Arial","rgba(232,163,92,0.95)"),n.shadowBlur=0,Yt(n,e,t,i)}function Cg(n,e,t){const i=bi(n,e,t);$n(n,e*.2,i+2,1,-.1),$n(n,e*.46,i-6,.9,.12),$n(n,e*.68,i+2,.75,-.26),$n(n,e*.3,i+(t-i)*.7,.55,.38);const s=i+(t-i)*.92;n.fillStyle="rgba(16,10,6,0.85)",xt(n,e*.05,s,e*.34,t*.05,4),n.fill();for(let r=0;r<12;r++)r%2===0?n.fillStyle="#e8a35c":n.fillStyle="#241a12",n.fillRect(e*.055+r*e*.027,s+t*.008,e*.027,t*.034);ht(n,"PANNEAUX ANARCHIQUES — LE CONSTAT",e/2,s-t*.02,"700 28px Georgia","#f2e8d4"),Yt(n,e,t,i)}function Pg(n,e,t){Ba(n,e,t),ka(n,e,t),Cr(n,e*.3,t*.56,e*.3,t*.3,-.04,8),Cr(n,e*.48,t*.6,e*.26,t*.26,.03,6);const i=e*.74,s=t*.56;n.save(),n.translate(i,s),n.shadowColor="rgba(0,0,0,0.45)",n.shadowBlur=16,n.shadowOffsetY=8,xt(n,-e*.14,-t*.14,e*.28,t*.28,6),n.fillStyle="#e8d9b8",n.fill(),n.shadowBlur=0,n.strokeStyle="rgba(150,120,70,0.5)",n.stroke(),n.fillStyle=gt.terracotta,n.fillRect(-e*.14,-t*.14,e*.28,t*.035),n.fillStyle="#3a2a18";for(let r=0;r<6;r++)n.fillRect(-e*.11,-t*.08+r*t*.045,e*.22,t*.012);n.fillStyle="#57a05f";for(let r=0;r<4;r++)n.beginPath(),n.arc(-e*.11,-t*.08+r*t*.045,t*.014,0,Jt),n.fill();ht(n,"LISTE DE CONTRÔLE",0,t*.11,"700 "+t*.028+"px Georgia","#2a2118"),n.restore(),n.save(),n.translate(e*.5,t*.42),n.rotate(.05),n.shadowColor="rgba(0,0,0,0.4)",n.shadowBlur=14,n.fillStyle="#1c130c",xt(n,-e*.11,-t*.02,e*.09,t*.05,6),n.fill(),n.shadowBlur=0,n.fillStyle="#c9b98f",xt(n,-e*.1,-t*.016,e*.012,t*.044,3),n.fill(),n.restore(),Bs(n,"AUDIT : COMPRENDRE AVANT D'AGIR",t*.9,t*.032),Yt(n,e,t,t*.5)}function Lg(n,e,t){du(n,e,t),n.strokeStyle="rgba(193,104,63,0.85)",n.lineWidth=4,n.setLineDash([12,9]),n.beginPath(),n.moveTo(e*.16,t*.2),n.bezierCurveTo(e*.38,t*.34,e*.55,t*.5,e*.84,t*.74),n.stroke(),n.setLineDash([]),Ms(n,e*.16,t*.2,"#e04d3a","P1"),Ms(n,e*.32,t*.42,"#3a9de0","P2"),Ms(n,e*.5,t*.58,"#e8a35c","P3"),Ms(n,e*.7,t*.72,"#57c26a","P4"),Ms(n,e*.85,t*.8,"#e04d3a","P5"),n.fillStyle="rgba(240,236,220,0.92)",xt(n,e*.62,t*.07,e*.3,t*.22,6),n.fill(),n.strokeStyle="rgba(150,120,70,0.5)",n.stroke(),ht(n,"ÉTAT DES LIEUX — GPS",e*.77,t*.12,"700 "+t*.03+"px Georgia","#2a2118"),[["#e04d3a","Support signalé"],["#3a9de0","À vérifier"],["#57c26a","Conforme"]].forEach(([s,r],o)=>{n.fillStyle=s,n.beginPath(),n.arc(e*.66,t*.16+o*t*.038,t*.013,0,Jt),n.fill(),n.fillStyle="#4a3a28",n.font="500 "+t*.02+"px Arial",n.textAlign="left",n.fillText(r,e*.69,t*.166+o*t*.038)}),Bs(n,"RELEVÉ GPS DE TOUS LES SUPPORTS",t*.88,t*.032),Yt(n,e,t,t*.8)}function Ig(n,e,t){du(n,e,t),[[.05,.1,.3,.34,"rgba(61,118,168,0.42)","ZONE A"],[.39,.06,.32,.3,"rgba(193,104,63,0.48)","ZONE B"],[.11,.5,.34,.34,"rgba(109,168,124,0.42)","ZONE C"],[.5,.44,.36,.42,"rgba(232,163,92,0.46)","ZONE D"]].forEach(([s,r,o,a,l,c])=>{n.fillStyle=l,n.fillRect(e*s,t*r,e*o,t*a),n.strokeStyle="rgba(50,40,28,0.55)",n.lineWidth=2.5,n.setLineDash([9,6]),n.strokeRect(e*s,t*r,e*o,t*a),n.setLineDash([]),n.fillStyle="rgba(20,14,8,0.65)",xt(n,e*s+e*.012,t*r+t*.02,e*.09,t*.045,4),n.fill(),ht(n,c,e*s+e*.057,t*r+t*.052,"800 "+t*.026+"px Georgia","#fff")}),n.fillStyle="rgba(240,236,220,0.94)",xt(n,e*.05,t*.86,e*.9,t*.11,6),n.fill(),n.strokeStyle="rgba(150,120,70,0.5)",n.stroke(),ht(n,"ZONAGE : LE TERRITOIRE DÉCOUPÉ EN ZONES RÉGLEMENTÉES",e*.5,t*.925,"700 "+t*.035+"px Georgia","#2a2118"),Yt(n,e,t,t*.85)}function Dg(n,e,t){const i=bi(n,e,t),s=i+(t-i)*.72;$n(n,e*.74,s,.72,-.04);const r=e*.3,o=i+(t-i)*.6;n.fillStyle="#3a2d1f",xt(n,r-e*.16,o-t*.06,e*.32,t*.06,4),n.fill(),n.strokeStyle=gt.bronze,n.lineWidth=4,n.stroke(),n.fillStyle="rgba(242,232,212,0.1)";for(let a=0;a<5;a++)n.fillRect(r-e*.14+a*e*.06,o-t*.052,e*.045,t*.044);ht(n,"MOBILIER URBAIN DE PUBLICITÉ — LOT N° 01",r,o-t*.09,"700 "+t*.034+"px Georgia","#f2e8d4"),ht(n,"DES LOTS COHÉRENTS POUR UN FINANCEMENT MAÎTRISÉ",e/2,t*.24,"700 26px Georgia","rgba(242,232,212,0.95)"),Yt(n,e,t,i)}function Ug(n,e,t){Ba(n,e,t),ka(n,e,t),Cr(n,e*.42,t*.55,e*.46,t*.4,-.02,10),ht(n,"CONVENTION DE CONCESSION",e*.42,t*.34,"700 "+t*.036+"px Georgia","#2a2118");const i=e*.62,s=t*.66;n.save(),n.translate(i,s),n.rotate(-.14),n.fillStyle="#b03a30",xt(n,-e*.07,-t*.028,e*.14,t*.056,6),n.fill(),n.strokeStyle="#7c241c",n.lineWidth=3,xt(n,-e*.07,-t*.028,e*.14,t*.056,6),n.stroke(),ht(n,"CONCÉDÉ",0,t*.012,"800 "+t*.03+"px Georgia","#f4ead0"),n.restore(),n.save(),n.translate(e*.26,t*.62),n.rotate(.12),n.strokeStyle="#2a2118",n.lineWidth=3,n.lineCap="round",n.beginPath(),n.moveTo(-e*.02,t*.05),n.lineTo(0,0),n.lineTo(e*.012,-t*.06),n.moveTo(0,0),n.lineTo(-e*.02,-t*.02),n.stroke(),n.restore(),Bs(n,"MISE EN CONCESSION DES ESPACES PUBLICITAIRES",t*.9,t*.032),Yt(n,e,t,t*.5)}function Ng(n,e,t){Ba(n,e,t),ka(n,e,t),Cr(n,e*.34,t*.56,e*.42,t*.36,-.02,8),ht(n,"CAHIER DES CHARGES",e*.34,t*.36,"700 "+t*.034+"px Georgia","#2a2118");const i=e*.55,s=t*.62;n.save(),n.translate(i,s),n.rotate(-.2),n.fillStyle="#57a05f",xt(n,-e*.1,-t*.042,e*.2,t*.084,8),n.fill(),n.strokeStyle="#3a703f",n.lineWidth=4,xt(n,-e*.1,-t*.042,e*.2,t*.084,8),n.stroke(),ht(n,"ADMIS",0,t*.012,"800 "+t*.055+"px Georgia","#f4f0d8"),n.restore(),Bs(n,"ATTRIBUTION DES LOTS PAR APPEL D'OFFRES",t*.9,t*.032),Yt(n,e,t,t*.5)}function Fg(n,e,t){const i=bi(n,e,t),s=e/2,r=e*.42,o=t*.46;n.fillStyle="#150f0a",n.fillRect(s-r/2,i-o,r,o),n.fillStyle="#241a12";for(let u=0;u<5;u++)n.fillRect(s-r/2+u*r/5+4,i-o,r/5-8,o);n.fillStyle="rgba(255,200,130,0.9)";for(let u=0;u<6;u++)for(let d=0;d<2;d++)Math.random()<.7&&n.fillRect(s-r/2+d*r/2+r*.08,i-o+o*.1+u*o*.13,r*.18,o*.06);const a=i-o*.18;n.fillStyle="#0f0a06",n.fillRect(s-e*.03,a-t*.045,e*.06,t*.045),ht(n,"RÉGIE PUBLICITAIRE",s,a-t*.055,"700 "+t*.026+"px Georgia","#f2e8d4");const l=s,c=i-o-t*.08;n.strokeStyle="#1a120b",n.lineWidth=4,n.beginPath(),n.moveTo(l,c+t*.14),n.lineTo(l,c),n.stroke(),n.fillStyle="#c1683f",n.beginPath(),n.moveTo(l,c-t*.03),n.lineTo(l-e*.012,c),n.lineTo(l+e*.012,c),n.fill(),ht(n,"GESTION DES RÉGIES : UN SERVICE EN RÈGIE DIRECTE",e/2,t*.22,"700 26px Georgia","rgba(242,232,212,0.95)"),Yt(n,e,t,i)}function Og(n,e,t){const i=n.createLinearGradient(0,0,0,t);i.addColorStop(0,"#201913"),i.addColorStop(1,"#120d08"),n.fillStyle=i,n.fillRect(0,0,e,t),n.fillStyle="#241c14",xt(n,e*.05,t*.08,e*.9,t*.84,10),n.fill(),n.strokeStyle="rgba(232,163,92,0.4)",n.lineWidth=3,n.stroke(),Eo(n,e*.25,t*.38,t*.14,gt.amber,.9,"AUDIT"),Eo(n,e*.5,t*.38,t*.14,gt.terracotta,.78,"CONCESSION"),Eo(n,e*.75,t*.38,t*.14,"#57a05f",.86,"GESTION"),n.strokeStyle="#57a05f",n.lineWidth=4,n.beginPath(),n.moveTo(e*.12,t*.68),n.bezierCurveTo(e*.24,t*.6,e*.3,t*.66,e*.42,t*.55),n.bezierCurveTo(e*.55,t*.62,e*.6,t*.5,e*.72,t*.5),n.bezierCurveTo(e*.8,t*.48,e*.86,t*.42,e*.9,t*.4),n.stroke(),n.fillStyle="#57a05f",n.beginPath(),n.arc(e*.9,t*.4,7,0,Jt),n.fill(),ht(n,"ÉVALUATION DU SYSTÈME",e/2,t*.93,"700 "+t*.036+"px Georgia",gt.amber),Yt(n,e,t,t*.5)}function zg(n,e,t){const i=bi(n,e,t);[[e*.24,t*.4],[e*.62,t*.5],[e*.84,t*.34]].forEach(([r,o])=>{const a=i-o;n.strokeStyle="#0f0a06",n.lineWidth=6,n.lineCap="butt",n.beginPath(),n.moveTo(r-18,i),n.lineTo(r+12,a),n.lineTo(r+46,a+16),n.moveTo(r+12,a),n.lineTo(r+12,a+60),n.moveTo(r+12,a+14),n.lineTo(r+58,a+26),n.stroke(),n.lineWidth=3,n.strokeStyle="#2a2118",n.beginPath(),n.moveTo(r-8,a+26),n.lineTo(r+58,a+32),n.stroke()}),$n(n,e*.5,i+(t-i)*.78,.62,-.1),ht(n,"LE SECTEUR SE MODERNISE, LE PARC S'ADAPTE",e/2,t*.24,"700 28px Georgia","rgba(242,232,212,0.95)"),Yt(n,e,t,i)}function Bg(n,e,t){const i=bi(n,e,t);n.fillStyle="rgba(20,13,8,0.55)",xt(n,e*.2,t*.12,e*.6,t*.72,18),n.fill(),n.strokeStyle="rgba(232,163,92,0.45)",n.lineWidth=3,n.stroke(),n.fillStyle="rgba(232,163,92,0.14)",n.beginPath(),n.arc(e*.5,t*.42,t*.22,0,Jt),n.fill(),n.strokeStyle="rgba(232,163,92,0.4)",n.lineWidth=3,n.stroke(),n.fillStyle=gt.amber,n.font="800 "+t*.26+"px Georgia",n.textAlign="center",n.fillText("?",e*.5,t*.52),ht(n,"12 QUESTIONS — VALIDEZ VOS ACQUIS",e*.5,t*.72,"700 "+t*.034+"px Georgia","#f2e8d4"),ht(n,"DÉFINITIONS · ZONES · CONCESSIONS · RÈGIES",e*.5,t*.79,"500 "+t*.02+"px Arial","rgba(232,163,92,0.9)"),Yt(n,e,t,i)}const kg={presentation:hu,"lecon1-importance":Rg,"lecon2-constat":Cg,audit:Pg,"etat-lieux":Lg,zonage:Ig,"constitution-lots":Dg,"mise-concession":Ug,attribution:Ng,gestion:Fg,evaluation:Og,"mise-a-jour":zg,quiz:Bg};function Hg(n,e,t,i){n.width=t,n.height=i;const s=n.getContext("2d");(kg[e]||hu)(s,t,i)}const Rs=Math.PI*2;let oi=null,uc=!1;function Gg(){if(uc)return null;if(!oi)try{const n=document.createElement("canvas");oi=new Kc({canvas:n,antialias:!0,alpha:!1,preserveDrawingBuffer:!0}),oi.toneMapping=Ea,oi.toneMappingExposure=1.08,oi.shadowMap.enabled=!0,oi.shadowMap.type=xa}catch(n){return uc=!0,console.warn("Illustrations 3D indisponibles (WebGL) — fallback 2D.",n),null}return oi}function Cn(n,e=1024,t=1024){const i=document.createElement("canvas");i.width=e,i.height=t;const s=i.getContext("2d");n(s,e,t);const r=new Ei(i);return r.colorSpace=Et,r.anisotropy=4,r}function Cs(n,e,t,i,s,r){n.beginPath(),n.moveTo(e+r,t),n.arcTo(e+i,t,e+i,t+s,r),n.arcTo(e+i,t+s,e,t+s,r),n.arcTo(e,t+s,e,t,r),n.arcTo(e,t,e+i,t,r),n.closePath()}function pn(n=0){const e=["sunset","waves","dune","rings","prism","ember"],t=e[n%e.length];return Cn((i,s,r)=>{const o=i.createLinearGradient(0,0,s*(n%2?1:-1),r);if(o.addColorStop(0,["#2a1a10","#3a2013","#241608"][n%3]),o.addColorStop(1,["#7a4028","#8a4a2a","#5a2f1a"][(n+1)%3]),i.fillStyle=o,i.fillRect(0,0,s,r),i.fillStyle="rgba(242,232,212,0.9)",i.beginPath(),i.arc(s*.5,r*.38,r*.2,0,Rs),i.fill(),i.fillStyle="rgba(232,163,92,0.95)",i.beginPath(),i.arc(s*.5,r*.38,r*.13,0,Rs),i.fill(),i.strokeStyle="rgba(242,232,212,0.5)",i.lineWidth=8,t==="waves"||t==="rings")for(let a=0;a<4;a++)i.beginPath(),i.arc(s*.5,r*.4,r*(.24+a*.08),0,Rs),i.stroke();else for(let a=0;a<3;a++)i.beginPath(),i.moveTo(s*.2,r*(.72-a*.14)),i.quadraticCurveTo(s*.5,r*(.6-a*.14),s*.8,r*(.72-a*.14)),i.stroke();i.fillStyle="rgba(242,232,212,0.28)",i.fillRect(s*.16,r*.84,s*.68,3)},512,384)}function bo(n,e){const t=new sn([new w(0,0,-20),new w(0,0,140)]);return au(n,t,.5,1,e).group}function ai(n,e={}){const t=new Ke,i=new ie({color:Fe.walnut,roughness:.8,metalness:.05}),s=new ie({color:Fe.bronze,roughness:.55,metalness:.35}),r=e.w??6.6,o=e.h??4.4,a=new H(new Ne(r,o,.22),i);a.position.y=3,a.castShadow=!0,t.add(a);const l=new H(new Ne(r+.4,.26,.3),s);l.position.y=o+.92,t.add(l);const c=new H(new Ne(r+.4,.26,.3),s);c.position.y=.72,t.add(c);const u=new ie({map:n,emissiveMap:n,emissive:Fe.ivory,emissiveIntensity:.32,roughness:.82}),d=new H(new lt(r-.4,o-.4),u);return d.position.set(0,3,.13),t.add(d),t}function Vg(n){const e=new Ke,t=new ie({color:Fe.walnutDark,roughness:.7,metalness:.2}),i=new H(new it(.09,.12,3.4,8),t);i.position.y=1.7,i.castShadow=!0,e.add(i);const s=new ie({map:n,emissiveMap:n,emissive:Fe.ivory,emissiveIntensity:.3,roughness:.8}),r=new H(new lt(1.5,2.1),s);r.position.y=3.9,e.add(r);const o=new H(new it(.14,.1,.24,8),t);return o.position.y=5.15,e.add(o),e}function Wg(n){const e=new Ke,t=new ie({color:2365970,roughness:.5,metalness:.5}),i=new ie({color:2767424,roughness:.15,metalness:.4,transparent:!0,opacity:.55}),s=new ie({color:Fe.bronze,roughness:.5,metalness:.45});for(const u of[-2.2,2.2]){const d=new H(new it(.08,.1,2.8,8),t);d.position.set(u,1.4,0),e.add(d)}const r=new H(new Ne(5.4,.16,2.6),s);r.position.y=2.9,r.rotation.x=.06,e.add(r);const o=new H(new Ne(5.4,2.1,.1),i);o.position.set(0,1.75,-1.15),e.add(o);const a=new H(new Ne(4.4,.08,.4),new ie({color:7031340}));a.position.set(0,.5,-.3),e.add(a);const l=new ie({map:n,emissiveMap:n,emissive:Fe.ivory,emissiveIntensity:.3,roughness:.8}),c=new H(new lt(3.4,2),l);return c.position.set(0,1.9,.14),e.add(c),e}function Xg(n){const e=new Ke,t=new H(new Ne(2.6,2.6,.5),new ie({color:Fe.walnut,roughness:.7}));t.position.y=1.3,e.add(t);const i=new ie({map:n,emissiveMap:n,emissive:Fe.ivory,emissiveIntensity:.3,roughness:.8}),s=new H(new lt(2.2,2),i);s.position.set(0,1.35,.27),e.add(s);const r=new H(new Ne(3,.12,1),new ie({color:Fe.bronze,roughness:.5,metalness:.4}));return r.position.y=2.72,e.add(r),e}function dc(n=!1){return Cn((e,t,i)=>{const s=e.createLinearGradient(0,0,0,i);s.addColorStop(0,"#efe7d3"),s.addColorStop(1,"#dcc9a6"),e.fillStyle=s,e.fillRect(0,0,t,i);for(let r=0;r<70;r++){const o=24+Math.random()*90,a=14+Math.random()*60;e.fillStyle=`rgba(178,166,138,${(.1+Math.random()*.22).toFixed(3)})`,e.fillRect(Math.random()*(t-o),Math.random()*(i-a),o,a)}e.fillStyle="rgba(120,162,184,0.35)",e.fillRect(0,0,t*.16,i*.12),e.fillRect(t*.82,i*.72,t*.18,i*.28),e.fillStyle="rgba(109,168,124,0.35)",e.fillRect(t*.6,i*.08,t*.28,i*.18),e.strokeStyle="rgba(120,104,80,0.5)",e.lineWidth=3;for(let r=0;r<6;r++){const o=i*(.1+r*.16);e.beginPath(),e.moveTo(0,o),e.bezierCurveTo(t*.3,o+16,t*.6,o-14,t,o+8),e.stroke()}for(let r=0;r<7;r++){const o=t*(.08+r*.14);e.beginPath(),e.moveTo(o,0),e.bezierCurveTo(o+14,i*.3,o-12,i*.62,o+8,i),e.stroke()}n&&[[.08,.12,.3,.34,"rgba(61,118,168,0.4)"],[.44,.1,.3,.3,"rgba(193,104,63,0.45)"],[.12,.52,.32,.32,"rgba(109,168,124,0.42)"],[.5,.5,.36,.38,"rgba(232,163,92,0.42)"]].forEach(([o,a,l,c,u])=>{e.fillStyle=u,e.fillRect(t*o,i*a,t*l,i*c),e.strokeStyle="rgba(50,40,28,0.6)",e.lineWidth=4,e.setLineDash([12,8]),e.strokeRect(t*o,i*a,t*l,i*c),e.setLineDash([])})},1024,1024)}function hc(n){const e=new Ke,t=new ie({color:n,roughness:.5,metalness:.2,emissive:n,emissiveIntensity:.5}),i=new H(new as(.28,.7,12),t);i.position.y=.7,e.add(i);const s=new H(new Ht(.16,10,8),t);return s.position.y=1.15,e.add(s),e}function wo(){const n=new Ke,e=new ie({color:5913890,roughness:.6,metalness:.05}),t=new ie({color:2365970,roughness:.8}),i=new H(new Ne(3.4,.14,1.5),e);i.position.y=1,i.castShadow=!0,n.add(i);for(const[s,r]of[[-1.5,-.6],[1.5,-.6],[-1.5,.6],[1.5,.6]]){const o=new H(new Ne(.12,1,.12),t);o.position.set(s,.5,r),n.add(o)}return n}function qg(n=.85,e=1.15,t=0){const i=new Ke,s=new H(new Ne(n,.02,e),new ie({color:16050896,roughness:.85}));i.add(s);const r=new qt({color:7034424});for(let o=0;o<5;o++){const a=new H(new Ne(n*.72,.005,.02),r);a.position.set(0,.012,e*.32-o*e*.14),i.add(a)}return i.rotation.y=t,i}function Yg(){const n=new Ke,e=new H(new Ne(.72,.03,.98),new ie({color:13215850,roughness:.6}));n.add(e);const t=new H(new lt(.62,.86),new ie({color:16050896,roughness:.9}));t.position.set(0,.02,.02),n.add(t);const i=new H(new Ne(.2,.06,.3),new ie({color:3812639,metalness:.6,roughness:.3}));return i.position.set(0,.05,.42),n.add(i),n}function $g(n=.2){const e=new Ke,t=new H(new _i(.34,.05,12,28),new ie({color:Fe.bronze,roughness:.3,metalness:.7}));e.add(t);const i=new H(new os(.33,28),new ie({color:12574950,transparent:!0,opacity:.35,roughness:.05,metalness:.4}));e.add(i);const s=new H(new it(.035,.05,.5,10),new ie({color:2365970,roughness:.7}));return s.position.set(-.4,-.15,0),s.rotation.z=.9,e.add(s),e.rotation.x=n,e}function To(n=16758896){const e=new Ke,t=new ie({color:2365970,roughness:.4,metalness:.6}),i=new H(new it(.28,.34,.1,16),t);i.position.y=.05,e.add(i);const s=new H(new it(.05,.05,1.1,10),t);s.position.y=.65,e.add(s);const r=new H(new Ne(.9,.05,.05),t);r.position.set(.42,1.25,0),e.add(r);const o=new H(new as(.16,.22,14),t);o.position.set(.85,1.28,0),o.rotation.z=-Math.PI/2,e.add(o);const a=new H(new Ht(.07,10,8),new ie({color:n,emissive:n,emissiveIntensity:2.2}));a.position.set(.9,1.18,0),e.add(a);const l=new za(n,1.6,9,2);return l.position.set(.9,1.1,0),e.add(l),{g:e,light:l}}function Zg(){const n=new Ke,e=new H(new it(.05,.05,.8,12),new ie({color:1840400,roughness:.4,metalness:.5}));e.position.y=.4,n.add(e);const t=new H(new as(.05,.16,12),new ie({color:Fe.bronze,metalness:.8,roughness:.3}));t.position.y=-.02,t.rotation.x=Math.PI,n.add(t);const i=new H(new it(.055,.055,.18,12),new ie({color:12675135,roughness:.5}));return i.position.y=.92,n.add(i),n}function fc(n=11549232,e="CONCÉDÉ"){const t=new Ke,i=new H(new it(.42,.42,.24,20),new ie({color:n,roughness:.5}));t.add(i);const s=new H(new it(.12,.14,.3,12),new ie({color:2365970,roughness:.6}));s.position.y=.27,t.add(s);const r=new H(new _i(.42,.03,8,24),new ie({color:16050896,roughness:.6}));return r.rotation.x=Math.PI/2,r.position.y=.121,t.add(r),t}function Kg(){const n=new Ke,e=new ie({color:9071165,roughness:.5}),t=new H(new it(.05,.06,.9,12),e);t.rotation.z=Math.PI/2,n.add(t);const i=new H(new it(.14,.14,.34,12),e);return i.position.set(.55,.12,0),i.rotation.z=Math.PI/2,n.add(i),n}function Jg(n=0){const e=new Ke,t=new H(new Ne(.6,.05,.42),new ie({color:16050896,roughness:.85}));e.add(t);const i=new H(new it(.09,.09,.02,12),new ie({color:11549232,roughness:.4}));return i.position.y=.035,e.add(i),e.rotation.y=n,e}function jg(n,e,t){return Cn((i,s,r)=>{i.fillStyle="#1c1510",Cs(i,6,6,s-12,r-12,20),i.fill(),i.strokeStyle="rgba(232,163,92,0.5)",i.lineWidth=4,Cs(i,6,6,s-12,r-12,20),i.stroke();const o=s/2,a=r*.56,l=r*.32,c=Math.PI*.75,u=Math.PI*1.5;i.lineCap="round",i.lineWidth=26,i.strokeStyle="rgba(242,232,212,0.15)",i.beginPath(),i.arc(o,a,l,c,c+u),i.stroke(),i.strokeStyle=e,i.beginPath(),i.arc(o,a,l,c,c+u*n),i.stroke(),i.fillStyle="#f2e8d4",i.font="800 90px Georgia, serif",i.textAlign="center",i.fillText(Math.round(n*100)+"%",o,a+22),i.fillStyle="rgba(242,232,212,0.6)",i.font="600 30px Arial",i.fillText(t,o,a+l+44)},512,512)}function pc(n=1){const e=new Ke,t=new ie({color:2365970,roughness:.5,metalness:.4}),i=new ie({color:Fe.terracotta,roughness:.6}),s=17*n,r=new H(new Ne(.5,s,.5),t);r.position.y=s/2,r.castShadow=!0,e.add(r);const o=new H(new Ne(.35,.35,15*n),t);o.position.set(0,s+.6,5*n),e.add(o);const a=new H(new Ne(1,1,1),i);a.position.set(0,s,-1.6*n),e.add(a);for(const h of[-.2,.2]){const f=new H(new it(.03,.03,8*n,6),t);f.position.set(h,s+.4,6.6*n),f.rotation.x=-.35,e.add(f)}const l=new Ua({color:3812639}),c=[new w(0,s+.5,8*n),new w(0,s-3*n,8*n)],u=new Mt().setFromPoints(c);e.add(new Qc(u,l));const d=new H(new Ne(.3,.3,.3),t);return d.position.set(0,s-3.4*n,8*n),e.add(d),e}function Qg(n,e=60){const t=new Float32Array(e*3),i=new Float32Array(e*3),s=[12675135,15246172,15919316,7186556,9071165];for(let l=0;l<e;l++){t[l*3]=(Math.random()-.5)*14,t[l*3+1]=Math.random()*9,t[l*3+2]=(Math.random()-.5)*14;const c=new Ue(s[l%s.length]);i[l*3]=c.r,i[l*3+1]=c.g,i[l*3+2]=c.b}const r=new Mt;r.setAttribute("position",new Rt(t,3)),r.setAttribute("color",new Rt(i,3));const o=new Na({size:.16,vertexColors:!0,transparent:!0,opacity:.85}),a=new eu(r,o);n.add(a)}function Xt(n,e={}){const t=Cn((c,u,d)=>{const h=c.createLinearGradient(0,0,0,d);h.addColorStop(0,"#1d0f18"),h.addColorStop(.42,"#3a1f1c"),h.addColorStop(.72,"#7a4028"),h.addColorStop(.9,"#c4713a"),h.addColorStop(1,"#e69a52"),c.fillStyle=h,c.fillRect(0,0,u,d);for(let f=0;f<90;f++){const g=Math.random()*d*.4;c.fillStyle=`rgba(255,236,205,${((1-g/(d*.4))*.5).toFixed(3)})`,c.fillRect(Math.random()*u,g,1.4,1.4)}},64,1024),i=new qt({map:t,side:Dt,fog:!1,depthWrite:!1}),s=new H(new Ht(820,24,14),i);n.add(s);const r=new gn(new ln({map:cn(0,"rgba(240,180,110,0.95)"),transparent:!0,blending:Ot,depthWrite:!1,depthTest:!1}));r.position.set(e.sunX??-180,e.sunY??90,-520),r.scale.setScalar(e.sunS??130),n.add(r);const o=new gn(new ln({map:cn(.25,"rgba(235,165,95,0.35)"),transparent:!0,blending:Ot,depthWrite:!1,depthTest:!1}));o.position.set(e.sunX??-180,e.sunY??90,-520),o.scale.setScalar(460),n.add(o);const a=new H(new os(1400,40),new ie({map:ou(),roughness:1,metalness:0}));a.rotation.x=-Math.PI/2,a.position.y=-.03,a.receiveShadow=!0,n.add(a),n.add(new ru(4206623,e.ambient??.7)),n.add(new iu(6113906,3811864,e.hemi??.45));const l=new ga(15251840,e.sunI??2.6);l.position.set(-120,140,-220),l.castShadow=!0,l.shadow.mapSize.set(1024,1024),l.shadow.camera.left=-60,l.shadow.camera.right=60,l.shadow.camera.top=60,l.shadow.camera.bottom=-60,l.shadow.camera.near=10,l.shadow.camera.far=600,n.add(l),n.add(l.target),n.fog=new Yn(e.fogColor??Fe.skyHorizon,e.fogNear??40,e.fogFar??480)}function li(n,e=12,t=30,i=170,s=70){for(let r=0;r<e;r++){const o=t+Math.random()*(i-t),a=9+Math.random()*22,l=5+Math.random()*4,c=5+Math.random()*4,u=Math.random()>.5?1:-1;n.add(va(l,a,c,o,u*(s*.55+Math.random()*s*.45)))}}function ci(n,e){for(const[t,i,s]of e){const r=lu(new w(t,0,i),s??1);n.add(r)}}const mc={presentation(n,e,t){Xt(n);const i=new sn([new w(0,0,-30),new w(0,0,140)]),s=pi(i,4.4,Fe.path,Wi(),400);s.position.y=.01,n.add(s);const r=bo(e,t);r.position.set(-5.2,0,46),r.rotation.y=.42,n.add(r);const o=ai(pn(1));o.position.set(6.4,0,70),o.rotation.y=-.55,n.add(o),li(n,16),ci(n,[[-9,18,1.2],[9,22,1],[-10,62,1.3],[10,92,1.1],[-11,120,1.25]]);for(let l=0;l<=4;l++){const c=8+l*26,u=l%2===0?1:-1,d=xs(new w(u*6,0,c),u);n.add(d);const h=Es(new w(u*6,0,c),u);n.add(h.group)}for(const l of[30,78]){const c=Ma();c.group.position.set(0,0,l),c.group.rotation.y=Math.PI,n.add(c.group)}const a=new ut(46,1280/760,.1,2e3);return a.position.set(6.5,3.1,14),a.lookAt(-1.5,3.4,52),a},"lecon1-importance"(n,e,t){Xt(n,{sunX:60,sunY:120,sunI:2.4});const i=new sn([new w(0,0,-20),new w(0,0,150)]),s=pi(i,4.4,Fe.path,Wi(),400);s.position.y=.01,n.add(s),[{x:-5.6,z:40,ry:.5},{x:5.8,z:62,ry:-.6},{x:-5.9,z:86,ry:.55},{x:5.9,z:108,ry:-.55},{x:-5.8,z:130,ry:.5}].forEach((a,l)=>{const c=l===0?bo(e,t):ai(pn(l+2));c.position.set(a.x,0,a.z),c.rotation.y=a.ry,n.add(c)}),li(n,14,30,190,80),ci(n,[[-9,16,1],[9,50,1.1],[-10,96,1.05],[10,132,1.15]]);for(let a=0;a<=5;a++){const l=12+a*24,c=a%2===0?1:-1,u=xs(new w(c*6,0,l),c);n.add(u);const d=Es(new w(c*6,0,l),c);n.add(d.group)}for(const a of[28,74,118]){const l=Ma();l.group.position.set(0,0,a),l.group.rotation.y=Math.PI,n.add(l.group)}const o=new ut(48,1280/760,.1,2e3);return o.position.set(8,5.4,6),o.lookAt(0,3.2,80),o},"lecon2-constat"(n,e,t){Xt(n,{sunI:1.3,ambient:.5,fogColor:6965808,fogNear:24,fogFar:220}),[[0,20,.1,1.15],[-7,34,-.35,1],[6,42,.55,.9],[-3,52,-.2,1.25],[8,60,-.7,.85],[-8,66,.3,1.1],[3,74,.65,.95],[-5,84,-.5,1.05],[7,90,.15,.8],[-9,96,-.8,1.2]].forEach(([o,a,l,c],u)=>{const d=u===0?bo(e,t):ai(pn(u+1));d.position.set(o,0,a),d.scale.setScalar(c),d.rotation.y=l,d.rotation.z=u%3*.06-.06,u%4===3&&(d.rotation.x=-.08),n.add(d)});const s=ai(pn(5));s.position.set(2,0,102),s.rotation.set(1.35,.4,.3),n.add(s),li(n,10,20,150,60),ci(n,[[-9,30,.9],[9,55,.85],[-10,88,.95]]);const r=new ut(52,1280/760,.1,2e3);return r.position.set(11,5.2,-8),r.lookAt(-1,2.6,55),r},audit(n){Xt(n,{sunI:1.1,ambient:.65,fogNear:30,fogFar:200}),n.fog=new Yn(2891798,30,200);const e=new H(new lt(90,40),new ie({color:2365970}));e.position.set(0,14,-16),e.rotation.y=Math.PI,n.add(e);const t=Cn((h,f,g)=>{const _=h.createLinearGradient(0,0,0,g);_.addColorStop(0,"#3a1f1c"),_.addColorStop(1,"#c4713a"),h.fillStyle=_,h.fillRect(0,0,f,g),h.fillStyle="#241a12",h.fillRect(0,g*.72,f,g*.28),h.fillStyle="rgba(255,200,130,0.85)";for(let m=0;m<14;m++){const p=16+Math.random()*40,b=20+Math.random()*60;h.fillRect(10+Math.random()*(f-50),g*.76,p,b)}},512,320),i=new H(new lt(13,7),new ie({map:t,emissiveMap:t,emissive:new Ue(16763010),emissiveIntensity:.5}));i.position.set(0,7.5,-15.6),n.add(i);const s=new ie({color:1840400}),r=new H(new Ne(.4,7,.3),s);r.position.set(0,7.5,-15.2),n.add(r);const o=new H(new Ne(13,.4,.3),s);o.position.set(0,7.5,-15.2),n.add(o);const a=wo();n.add(a);for(const[h,f,g]of[[.7,.3,.35],[-.6,.4,-.4],[.2,-.5,.1]]){const _=qg(.9,1.2,g);_.position.set(h,1.1,f),n.add(_)}const l=Yg();l.position.set(-.9,1.09,.25),l.rotation.y=.3,n.add(l);const c=$g(.25);c.position.set(.55,1.12,.5),c.rotation.y=.4,n.add(c);const u=To();u.g.position.set(-1.6,0,-.5),n.add(u.g),n.add(u.light);const d=new ut(44,1280/760,.1,2e3);return d.position.set(4.2,3.4,7.5),d.lookAt(0,1.6,-1),d},"etat-lieux"(n){Xt(n,{sunI:2.2,fogNear:60,fogFar:700});const e=new H(new lt(24,24),new ie({map:dc(),roughness:.9}));e.rotation.x=-Math.PI/2,e.position.y=.01,n.add(e);const t=[new w(-7,.5,6),new w(-3.5,.6,1),new w(1,.7,-4),new w(5.5,.8,-7),new w(9,.9,-10)],i=new H(new Is(new sn(t),64,.12,8,!1),new qt({color:12675135,transparent:!0,opacity:.85}));i.position.y=-.01,n.add(i),[[-7,6,14699834],[-3.5,1,3841504],[1,-4,15246172],[5.5,-7,5751402],[9,-10,14699834]].forEach(([l,c,u])=>{const d=hc(u);d.position.set(l,0,c),n.add(d)});const r=Cn((l,c,u)=>{l.fillStyle="rgba(255,255,255,0.75)",l.beginPath(),l.arc(c/2,u/2,c/2-8,0,Rs),l.fill(),l.strokeStyle="rgba(90,74,52,0.8)",l.lineWidth=5,l.stroke(),l.fillStyle="#c1683f",l.beginPath(),l.moveTo(c/2,u*.16),l.lineTo(c*.58,u*.6),l.lineTo(c*.42,u*.6),l.closePath(),l.fill(),l.fillStyle="#5a4a34",l.font="800 34px Georgia",l.textAlign="center",l.fillText("N",c/2,u*.2)},160,160),o=new H(new lt(2.2,2.2),new qt({map:r,transparent:!0}));o.position.set(-9.5,.05,9.5),o.rotation.x=-Math.PI/2,n.add(o);const a=new ut(40,1280/760,.1,2e3);return a.position.set(13,20,11),a.lookAt(0,0,0),a},zonage(n){Xt(n,{sunI:2,fogNear:60,fogFar:700});const e=new H(new lt(24,24),new ie({map:dc(!0),roughness:.9}));e.rotation.x=-Math.PI/2,e.position.y=.01,n.add(e),[[0,0,4028072],[6,0,12675135],[0,-6,7186556],[6,-6,15246172]].forEach(([o,a,l])=>{const c=hc(l);c.position.set(o,0,a),n.add(c)});const i=Cn((o,a,l)=>{o.fillStyle="rgba(240,236,220,0.95)",Cs(o,0,0,a,l,16),o.fill();const c=[["#3d76a8","Zone A"],["#c1683f","Zone B"],["#6da87c","Zone C"],["#e8a35c","Zone D"]];o.font="700 30px Georgia",o.textAlign="left",c.forEach(([u,d],h)=>{o.fillStyle=u,o.beginPath(),o.arc(46,60+h*70,16,0,Rs),o.fill(),o.fillStyle="#3a2a18",o.fillText(d,78,72+h*70)})},360,320),s=new H(new lt(3.4,3),new qt({map:i,transparent:!0}));s.position.set(-8.8,.05,-8),s.rotation.x=-Math.PI/2,n.add(s);const r=new ut(40,1280/760,.1,2e3);return r.position.set(-10,21,14),r.lookAt(0,0,-1),r},"constitution-lots"(n,e,t){Xt(n,{sunX:40,sunY:130,sunI:2.4});const i=new sn([new w(0,0,-20),new w(0,0,150)]),s=pi(i,4.4,Fe.path,Wi(),400);s.position.y=.01,n.add(s);const r=Wg(pn(0));r.position.set(-6.4,0,42),r.rotation.y=.35,n.add(r);const o=ai(pn(3));o.position.set(6.6,0,64),o.rotation.y=-.5,n.add(o);const a=Xg(pn(2));a.position.set(-6.2,0,88),a.rotation.y=.4,n.add(a);const l=Vg(pn(1));l.position.set(6.4,0,108),l.rotation.y=-.45,n.add(l),li(n,12,30,180,80),ci(n,[[-9,22,1.1],[9,34,1],[-10,78,1.15],[10,122,1.05]]);for(let u=0;u<=4;u++){const d=20+u*24,h=u%2===0?1:-1,f=xs(new w(h*6,0,d),h);n.add(f);const g=Es(new w(h*6,0,d),h);n.add(g.group)}for(const u of[58,100]){const d=cu(new w(4.6,0,u),1);n.add(d)}const c=new ut(46,1280/760,.1,2e3);return c.position.set(8.5,4.6,4),c.lookAt(-1,3,62),c},"mise-concession"(n){Xt(n,{sunI:1.2,ambient:.7,fogNear:30,fogFar:200}),n.fog=new Yn(2891798,30,200);const e=new H(new lt(90,40),new ie({color:2365970}));e.position.set(0,14,-16),e.rotation.y=Math.PI,n.add(e);const t=wo();n.add(t);const i=new H(new lt(2.3,1.6),new ie({color:16050896,roughness:.85}));i.position.set(.1,1.08,.15),i.rotation.x=-.18,n.add(i);const s=Zg();s.position.set(1.05,1.1,.5),s.rotation.y=-.5,s.rotation.z=-.12,n.add(s);const r=fc();r.position.set(-1.15,1.05,-.1),r.rotation.y=.3,n.add(r);const o=new H(new _i(.22,.04,10,24),new ie({color:Fe.bronze,metalness:.8,roughness:.3}));o.position.set(-.7,1.12,.6),o.rotation.x=Math.PI/2.2,o.rotation.z=.3,n.add(o);const a=To();a.g.position.set(-1.7,0,-.6),n.add(a.g),n.add(a.light);const l=new ut(42,1280/760,.1,2e3);return l.position.set(3.9,3.6,6.8),l.lookAt(-.1,1.7,-.4),l},attribution(n){Xt(n,{sunI:1.2,ambient:.7,fogNear:30,fogFar:200}),n.fog=new Yn(2891798,30,200);const e=new H(new lt(90,40),new ie({color:2365970}));e.position.set(0,14,-16),e.rotation.y=Math.PI,n.add(e);const t=wo();n.add(t);const i=Kg();i.position.set(.9,1.12,.2),i.rotation.y=.7,n.add(i);for(const[l,c,u]of[[-1.2,.4,.5],[-.5,-.4,-.6],[.4,.6,.1]]){const d=Jg(u);d.position.set(l,1.06,c),n.add(d)}const s=fc(3829823,"ADMIS");s.position.set(-1.4,1.05,-.5),s.rotation.y=-.4,n.add(s);const r=new H(new _i(.24,.06,12,28),new ie({color:15246172,metalness:.9,roughness:.25}));r.position.set(.1,1.15,-.6),r.rotation.x=Math.PI/2.4,n.add(r);const o=To();o.g.position.set(-1.7,0,-.6),n.add(o.g),n.add(o.light);const a=new ut(42,1280/760,.1,2e3);return a.position.set(4.1,3.5,7.2),a.lookAt(0,1.6,-.2),a},gestion(n){Xt(n,{sunX:20,sunY:150,sunI:2.5});const e=new sn([new w(0,0,-20),new w(0,0,150)]),t=pi(e,4.4,Fe.path,Wi(),400);t.position.y=.01,n.add(t);const i=new Ke,s=new ie({color:2760726,roughness:.85}),r=new H(new Ne(14,10,8),s);r.position.y=5,r.castShadow=!0,i.add(r);const o=new H(new it(8,8.6,1.6,4),s);o.position.y=11,o.rotation.y=Math.PI/4,i.add(o);const a=new ie({color:13614751,roughness:.6});for(const f of[-5,-3.3,-1.6,0,1.6,3.3,5]){const g=new H(new it(.28,.34,4.6,10),a);g.position.set(f,2.3,4.05),i.add(g)}const l=Cn((f,g,_)=>{f.fillStyle="#151009",f.fillRect(0,0,g,_);for(let m=0;m<3;m++)for(let p=0;p<6;p++)Math.random()<.75&&(f.fillStyle=Math.random()<.4?"#c1683f":"#e8a35c",f.globalAlpha=.7,f.fillRect(10+p*(g/6),10+m*(_/3.4),g/8,_/4.4),f.globalAlpha=1)},512,256),c=new H(new lt(10,4.4),new ie({map:l,emissiveMap:l,emissive:new Ue(16763010),emissiveIntensity:.7}));c.position.set(0,6.2,4.06),i.add(c),i.position.set(0,0,58),i.rotation.y=Math.PI,n.add(i);const u=new H(new it(.08,.12,8,8),new ie({color:2365970}));u.position.set(-8,4,56),n.add(u);const d=new H(new lt(2.6,1.5),new ie({color:Fe.terracotta,side:on,roughness:.8}));d.position.set(-6.6,7.4,56),d.rotation.y=.2,n.add(d);for(let f=0;f<3;f++){const g=ai(pn(f+1));g.position.set(-6.4,0,30+f*22),g.rotation.y=.45,n.add(g)}li(n,10,80,200,90),ci(n,[[-9,20,1],[9,44,1.1],[9.5,92,1]]);for(let f=0;f<=4;f++){const g=14+f*26,_=f%2===0?1:-1,m=xs(new w(_*6,0,g),_);n.add(m);const p=Es(new w(_*6,0,g),_);n.add(p.group)}const h=new ut(44,1280/760,.1,2e3);return h.position.set(10,3.6,18),h.lookAt(0,4.5,58),h},evaluation(n){Xt(n,{sunI:1,ambient:.55,fogNear:30,fogFar:300}),n.fog=new Yn(1840400,30,300),[{pct:.9,color:"#e8a35c",label:"AUDIT",x:-4},{pct:.78,color:"#c1683f",label:"CONCESSION",x:0},{pct:.86,color:"#57a05f",label:"GESTION",x:4}].forEach(({pct:o,color:a,label:l,x:c})=>{const u=new H(new it(1.5,1.8,.3,20),new ie({color:2365970,roughness:.7}));u.position.set(c,.15,0),n.add(u);const d=new H(new it(.14,.16,3.4,10),new ie({color:Fe.walnut,roughness:.6}));d.position.set(c,1.85,0),n.add(d);const h=jg(o,a,l),f=new H(new lt(3.6,3.6),new ie({map:h,emissiveMap:h,emissive:new Ue(16777215),emissiveIntensity:.25}));f.position.set(c,3.9,0),f.rotation.x=.25,n.add(f);const g=new za(15246172,.7,8,2);g.position.set(c,3.2,2),n.add(g)});const t=[new w(-6,.8,2.5),new w(-3,1.6,1.4),new w(0,2.6,0),new w(3,3.8,-1.2),new w(6,5.2,-2.4)],i=new H(new Is(new sn(t),64,.1,8,!1),new qt({color:5742687,transparent:!0,opacity:.9}));n.add(i);const s=new H(new as(.3,.8,12),new ie({color:5742687,emissive:5742687,emissiveIntensity:.6}));s.position.set(6.4,5.6,-2.7),s.rotation.z=-.6,n.add(s);const r=new ut(46,1280/760,.1,2e3);return r.position.set(7,3.4,11),r.lookAt(0,3.2,-1),r},"mise-a-jour"(n){Xt(n,{sunX:-80,sunY:110,sunI:2.2});const e=new sn([new w(0,0,-20),new w(0,0,150)]),t=pi(e,4.4,Fe.path,Wi(),400);t.position.y=.01,n.add(t);const i=pc(1);i.position.set(-8,0,52),n.add(i);const s=pc(.7);s.position.set(8,0,84),n.add(s);const r=new H(new Ne(7,9,7),new ie({color:2760726,roughness:.9}));r.position.set(0,4.5,62),r.castShadow=!0,n.add(r);const o=new ie({color:7034424,roughness:.8});for(let h=0;h<4;h++){const f=new H(new Ne(8,.14,.14),o);f.position.set(0,1.5+h*2.3,3.6),n.add(f)}const a=ai(pn(4));a.position.set(0,14,66),a.rotation.x=.15,n.add(a);const l=new Ua({color:3812639}),c=[new w(-8,18,52),new w(0,15,65)],u=new Mt().setFromPoints(c);n.add(new Qc(u,l)),li(n,10,90,220,85),ci(n,[[-9,30,.9],[9,110,1]]);const d=new ut(48,1280/760,.1,2e3);return d.position.set(11,5.5,6),d.lookAt(0,8,62),d},quiz(n){Xt(n,{sunX:0,sunY:130,sunI:2});const e=Cn((u,d,h)=>{u.clearRect(0,0,d,h),u.fillStyle="rgba(20,13,8,0.62)",Cs(u,0,0,d,h,40),u.fill(),u.strokeStyle="rgba(232,163,92,0.55)",u.lineWidth=8,Cs(u,8,8,d-16,h-16,36),u.stroke(),u.shadowColor="rgba(232,163,92,0.9)",u.shadowBlur=60,u.fillStyle="#e8a35c",u.font="800 620px Georgia, serif",u.textAlign="center",u.textBaseline="middle",u.fillText("?",d/2,h*.52),u.shadowBlur=0},640,640),t=new H(new lt(7,7),new qt({map:e,transparent:!0}));t.position.set(0,8.5,30),n.add(t);const i=new gn(new ln({map:cn(.3,"rgba(232,163,92,0.5)"),transparent:!0,blending:Ot,depthWrite:!1}));i.position.set(0,8.5,28.5),i.scale.setScalar(18),n.add(i);const s=new Ke,r=new ie({color:15246172,metalness:.85,roughness:.28}),o=new H(new it(.9,1,.3,16),r);s.add(o);const a=new H(new it(.28,.3,1.2,12),r);a.position.y=.75,s.add(a);const l=new H(new it(.9,.45,1.1,18),r);l.position.y=1.7,s.add(l);for(const u of[-1,1]){const d=new H(new _i(.4,.07,10,20,Math.PI),r);d.position.set(u*.78,1.5,0),d.rotation.z=u*Math.PI/2,s.add(d)}s.position.set(-3.6,0,40),n.add(s),li(n,12,60,200,90),ci(n,[[-9,60,1],[9,90,1.1]]),Qg(n,70);const c=new ut(46,1280/760,.1,2e3);return c.position.set(6,3.6,8),c.lookAt(0,6.5,34),c}},Ao=new Map;function e_(n,e,t=1280,i=760){if(Ao.has(n.id))return Ao.get(n.id);const s=Gg();if(!s)return null;try{s.setPixelRatio(dg()?1:1.5),s.setSize(t,i);const r=new Jc,a=(mc[n.id]||mc.presentation)(r,n,e);a.aspect=t/i,a.updateProjectionMatrix(),s.render(r,a);const l=s.domElement.toDataURL("image/jpeg",.85);return t_(r),Ao.set(n.id,l),l}catch(r){return console.warn("Illustration 3D indisponible pour",n.id,r),null}}function t_(n){const e=new Set,t=new Set;n.traverse(i=>{i.geometry&&i.geometry.dispose();const s=Array.isArray(i.material)?i.material:i.material?[i.material]:[];for(const r of s)if(!t.has(r)){t.add(r);for(const o of[r.map,r.emissiveMap])o&&!e.has(o)&&(e.add(o),o.dispose());r.dispose()}})}function n_({onExit:n,onScrollTo:e,onQuiz:t}){const i=document.getElementById("ui-course"),s=i.querySelector("#course-toc"),r=i.querySelector("#course-toc-select"),o=i.querySelector("#course-sections"),a=i.querySelector("#course-cover"),l=i.querySelector("#course-close"),c=i.querySelector("#course-quiz-btn"),u=i.querySelector(".course-main"),d=e||(A=>u.scrollTo({top:A,behavior:"smooth"}));let h=!1;a.innerHTML=`
    <div class="course-cover-kicker">${yo.module} — Formation</div>
    <h1 class="course-cover-title">${yo.title}</h1>
    <div class="course-cover-sub">${yo.subtitle}</div>
    <div class="course-cover-rule"></div>
    <p class="course-cover-desc">Lecture complète et illustrée du cours. Avancez section par section, chaque étape est accompagnée d'une illustration de son contexte.</p>
    <div class="course-cover-meta"><span>${Ft.length} étapes</span><span>12 questions finales</span></div>
  `;const f=[],g=[];Er.forEach((A,R)=>{const C=Ft.filter(y=>y.chapter===R);C.length&&(f.push(`<div class="toc-chapter"><div class="toc-chapter-name">${A.name}</div><div class="toc-chapter-label">${A.label}</div></div>`),C.forEach(y=>{f.push(`<a href="#course-sec-${y.id}" class="toc-item" data-id="${y.id}"><span class="toc-num">${y.num}</span><span>${y.title}</span></a>`)}))}),Ft.forEach(A=>{const R=Er[A.chapter],C=A.id==="quiz";let y="";C?y=`<ul class="course-bullets">${A.bullets.map(S=>`<li>${S}</li>`).join("")}</ul>`:y=A.content.map(S=>`<p><span class="course-body-t">${S.t}</span>${S.b}</p>`).join(""),g.push(`
      <section class="course-section" id="course-sec-${A.id}">
        <img class="course-illus" alt="Illustration — ${A.title}" />
        <div class="course-sec-meta">
          <span class="course-sec-chapter">${R?`${R.name} · ${R.label}`:""}</span>
          <span class="course-sec-num">${A.num} / ${String(Ft.length).padStart(2,"0")}</span>
        </div>
        <h2 class="course-sec-title">${A.title}</h2>
        <div class="course-sec-rule"></div>
        <div class="course-sec-content">${y}</div>
      </section>
    `)}),s.innerHTML=f.join(""),o.innerHTML=g.join("");const _=[];Er.forEach((A,R)=>{const C=Ft.filter(y=>y.chapter===R);C.length&&(_.push(`<optgroup label="${A.name}">`),C.forEach(y=>_.push(`<option value="${y.id}">${y.num} · ${y.title}</option>`)),_.push("</optgroup>"))}),r.innerHTML=_.join("");const m=[];o.querySelectorAll(".course-illus").forEach(A=>{const R=A.closest(".course-section").id.replace("course-sec-",""),C=document.createElement("canvas");Hg(C,R,1280,760),A.src=C.toDataURL("image/jpeg",.86),m.push({img:A,id:R})});let p=!1;function b(){if(p)return;p=!0;let A=0;const R=()=>{if(A>=m.length){p=!1;return}const{img:C,id:y}=m[A++],S=Ft.find(P=>P.id===y);if(S){const P=e_(S,A-1);P&&(C.src=P)}setTimeout(R,90)};setTimeout(R,80)}s.addEventListener("click",A=>{const R=A.target.closest(".toc-item");if(!R)return;const C=document.getElementById("course-sec-"+R.dataset.id);C&&(d(C.offsetTop-90),s.querySelectorAll(".toc-item").forEach(y=>y.classList.toggle("active",y===R)))});function x(){let A=Ft[0].id;for(const R of Ft){const C=document.getElementById("course-sec-"+R.id);C&&C.offsetTop-120<=u.scrollTop&&(A=R.id)}s.querySelectorAll(".toc-item").forEach(R=>R.classList.toggle("active",R.dataset.id===A)),r.value!==A&&(r.value=A)}u.addEventListener("scroll",x,{passive:!0}),r.addEventListener("change",()=>{const A=document.getElementById("course-sec-"+r.value);A&&d(A.offsetTop-90)}),l.addEventListener("click",n),c.addEventListener("click",t);function M(){h=!0,document.body.classList.add("mode-course"),setTimeout(()=>x(),80),b()}function L(){h=!1,document.body.classList.remove("mode-course")}return{open:M,close:L,isOpen:()=>h}}const i_=document.getElementById("scene"),fu=Ft.length,dn=yg(i_,Ft),It=xg();let rn=null;function Sa(n,e="smooth"){rn?rn.scrollTo(n,{duration:e==="smooth"?1.2:0,easing:t=>1-Math.pow(1-t,3)}):document.querySelector("#ui-course .course-main").scrollTo({top:n,behavior:e})}function yi(n){const e=n==="course";Ki.isOpen()&&Ki.close(),e&&Ki.open(),document.getElementById("mode-journey").classList.toggle("active",!e),document.getElementById("mode-course-btn").classList.toggle("active",e),e?(Mn.stop(),rn==null||rn.start()):(rn==null||rn.stop(),Mn.start())}const Ki=n_({onExit:()=>yi("journey"),onScrollTo:Sa,onQuiz:()=>{yi("journey"),setTimeout(()=>{const n=Math.max(1,Or.offsetHeight-window.innerHeight);Mn.scrollTo(n,{duration:1.6})},120)}});document.getElementById("mode-journey").addEventListener("click",()=>yi("journey"));document.getElementById("mode-course-btn").addEventListener("click",()=>yi("course"));const Ha=fu+2,Or=document.getElementById("scroll");function pu(){const n=Ha*window.innerHeight;Or.style.height=n+"px"}pu();const Mn=new vc({duration:1.12,smoothWheel:!0,touchMultiplier:1.5,wheelMultiplier:1}),Pr=document.querySelector("#ui-course .course-main");rn=new vc({wrapper:Pr,content:Pr,duration:1.15,smoothWheel:!0,touchMultiplier:1.6,wheelMultiplier:1});function mu(n){Mn.raf(n),rn&&rn.raf(n),requestAnimationFrame(mu)}requestAnimationFrame(mu);let Ds=0,xi=0;function Ga(n){const e=Math.max(1,Or.offsetHeight-window.innerHeight),t=Math.min(1,Math.max(0,n/e));Ds=t;const i=Math.floor(t*Ha)-1;xi=Math.max(0,Math.min(fu-1,i))}Mn.on("scroll",({scroll:n})=>{Ga(n)});Ga(window.scrollY||0);dn.update(Ds,xi);function gu(){dn.update(Ds,xi),It.updateGlobal(Ds,xi),dn.render(),requestAnimationFrame(gu)}requestAnimationFrame(gu);window.addEventListener("resize",()=>{pu(),dn.resize(),Ga(window.scrollY||0)});window.addEventListener("keydown",n=>{if(Ki.isOpen()){n.key==="Escape"?yi("journey"):n.key==="ArrowDown"||n.key==="PageDown"?(n.preventDefault(),Sa(Pr.scrollTop+window.innerHeight*.8)):(n.key==="ArrowUp"||n.key==="PageUp")&&(n.preventDefault(),Sa(Pr.scrollTop-window.innerHeight*.8));return}if(It.isReaderOpen()){n.key==="Escape"?It.closeReader():n.key==="ArrowLeft"?It.readerNav(-1):n.key==="ArrowRight"&&It.readerNav(1);return}if(n.key==="Enter"&&xi>=0&&!It.quizOpen()){It.openReader(xi);return}if(["1","2","3","4"].includes(n.key)&&It.quizOpen()){n.preventDefault(),It.answerQuiz(Number(n.key)-1);return}const t=window.innerHeight;n.key==="ArrowDown"||n.key==="PageDown"?(n.preventDefault(),Mn.scrollTo(window.scrollY+t,{duration:1.1})):(n.key==="ArrowUp"||n.key==="PageUp")&&(n.preventDefault(),Mn.scrollTo(Math.max(0,window.scrollY-t),{duration:1.1}))});It.setReaderListener(n=>{n?Mn.stop():Mn.start()});function _u(n){return{nx:n.clientX/window.innerWidth*2-1,ny:-(n.clientY/window.innerHeight)*2+1}}window.addEventListener("click",n=>{if(Ki.isOpen()||It.isReaderOpen()||n.target.closest&&n.target.closest("#ui"))return;const{nx:e,ny:t}=_u(n),i=dn.pick(e,t);i&&(i.kind==="panel"?It.openReader(i.index):i.kind==="sign"&&It.showToast(i.tip))});let Ro=!1;window.addEventListener("mousemove",n=>{Ro||(Ro=!0,requestAnimationFrame(()=>{if(Ro=!1,Ki.isOpen()||It.isReaderOpen())return;const{nx:e,ny:t}=_u(n),i=dn.pick(e,t);document.body.classList.toggle("hover-pick",!!i),dn.setHover(i&&i.kind==="panel"?i.index:-1)}))});window.__panneautique={openReader:It.openReader,closeReader:It.closeReader,openCourse:()=>yi("course"),closeCourse:()=>yi("journey"),pickAt:(n,e)=>{const t=dn.pick(n/window.innerWidth*2-1,-(e/window.innerHeight)*2+1);return t?{kind:t.kind,index:t.index,tip:t.tip}:null},getState:()=>{const n=dn.getCameraPos();return{progress:Ds,activeIndex:xi,cam:{x:n.x,y:n.y,z:n.z}}},settle:(n,e)=>{for(let i=0;i<2400;i++)dn.update(n,e);const t=dn.getCameraPos();return{cam:{x:t.x,y:t.y,z:t.z},progress:n,activeIndex:e}}};setTimeout(()=>{document.getElementById("ui-topbar").classList.add("visible"),document.getElementById("ui-dots").classList.add("visible"),document.getElementById("ui-hint").classList.add("visible")},1200);document.querySelectorAll(".dot").forEach((n,e)=>{n.addEventListener("click",()=>{const t=(e+1.5)/Ha,i=Math.max(1,Or.offsetHeight-window.innerHeight);Mn.scrollTo(Math.round(t*i),{duration:1.4})})});
