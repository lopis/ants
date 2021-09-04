(()=>{"use strict";class t{constructor({spriteSheet:t,frames:i,frameRate:s,loop:e=!0}){this.spriteSheet=t,this.frames=i,this.frameRate=s,this.loop=e;let{width:h,height:n,margin:r=0}=t.frame;this.width=h,this.height=n,this.margin=r,this._f=0,this._a=0}clone(){return new t(this)}reset(){this._f=0,this._a=0}update(t=1/60){if(this.loop||this._f!=this.frames.length-1)for(this._a+=t;this._a*this.frameRate>=1;)this._f=++this._f%this.frames.length,this._a-=1/this.frameRate}render({x:t,y:i,width:s=this.width,height:e=this.height,context:h}){let n=this.frames[this._f]/this.spriteSheet._f|0,r=this.frames[this._f]%this.spriteSheet._f|0;h.drawImage(this.spriteSheet.image,r*this.width+(2*r+1)*this.margin,n*this.height+(2*n+1)*this.margin,this.width,this.height,t,i,s,e)}}function i(){return new t(...arguments)}function s(t,i,s){return Math.min(Math.max(t,s),i)}function e(t,i){return t.rotation||i.rotation?null:([t,i]=[t,i].map((t=>h(t))),t.x<i.x+i.width&&t.x+t.width>i.x&&t.y<i.y+i.height&&t.y+t.height>i.y)}function h(t){let{x:i=0,y:s=0,width:e,height:h}=t.world||t;return t.mapwidth&&(e=t.mapwidth,h=t.mapheight),t.anchor&&(i-=e*t.anchor.x,s-=h*t.anchor.y),e<0&&(i+=e,e*=-1),h<0&&(s+=h,h*=-1),{x:i,y:s,width:e,height:h}}i.prototype=t.prototype,i.class=t,new WeakMap;class n{constructor(t=0,i=0,s={}){this.x=t,this.y=i,s._c&&(this.clamp(s._a,s._b,s._d,s._e),this.x=t,this.y=i)}add(t){return new n(this.x+t.x,this.y+t.y,this)}subtract(t){return new n(this.x-t.x,this.y-t.y,this)}scale(t){return new n(this.x*t,this.y*t)}normalize(t=this.length()){return new n(this.x/t,this.y/t)}dot(t){return this.x*t.x+this.y*t.y}length(){return Math.hypot(this.x,this.y)}distance(t){return Math.hypot(this.x-t.x,this.y-t.y)}angle(t){return Math.acos(this.dot(t)/(this.length()*t.length()))}clamp(t,i,s,e){this._c=!0,this._a=t,this._b=i,this._d=s,this._e=e}get x(){return this._x}get y(){return this._y}set x(t){this._x=this._c?s(this._a,this._d,t):t}set y(t){this._y=this._c?s(this._b,this._e,t):t}}function r(){return new n(...arguments)}r.prototype=n.prototype,r.class=n;let a=()=>{},o="position:absolute;width:1px;height:1px;overflow:hidden;";function c(t,i){let s=i.parentNode;if(t.setAttribute("data-kontra",""),s){let e=s.querySelector("[data-kontra]:last-of-type")||i;s.insertBefore(t,e.nextSibling)}else document.body.appendChild(t)}class d extends class{constructor(t){return this.init(t)}init(t={}){this.position=r(),this.velocity=r(),this.acceleration=r(),this.ttl=1/0,Object.assign(this,t)}update(t){this.advance(t)}advance(t){let i=this.acceleration;t&&(i=i.scale(t)),this.velocity=this.velocity.add(i);let s=this.velocity;t&&(s=s.scale(t)),this.position=this.position.add(s),this._pc(),this.ttl--}get dx(){return this.velocity.x}get dy(){return this.velocity.y}set dx(t){this.velocity.x=t}set dy(t){this.velocity.y=t}get ddx(){return this.acceleration.x}get ddy(){return this.acceleration.y}set ddx(t){this.acceleration.x=t}set ddy(t){this.acceleration.y=t}isAlive(){return this.ttl>0}_pc(){}}{init({width:t=0,height:i=0,context:s,render:e=this.draw,update:h=this.advance,children:n=[],anchor:r={x:0,y:0},sx:a=0,sy:o=0,opacity:c=1,rotation:d=0,scaleX:l=1,scaleY:_=1,...p}={}){this.children=[],super.init({width:t,height:i,context:s,anchor:r,sx:a,sy:o,opacity:c,rotation:d,scaleX:l,scaleY:_,...p}),this._di=!0,this._uw(),n.map((t=>this.addChild(t))),this._rf=e,this._uf=h}update(t){this._uf(t),this.children.map((i=>i.update&&i.update(t)))}render(t){let i=this.context;i.save(),(this.x||this.y)&&i.translate(this.x,this.y),this.rotation&&i.rotate(this.rotation),(this.sx||this.sy)&&i.translate(-this.sx,-this.sy),1==this.scaleX&&1==this.scaleY||i.scale(this.scaleX,this.scaleY);let s=-this.width*this.anchor.x,e=-this.height*this.anchor.y;(s||e)&&i.translate(s,e),this.context.globalAlpha=this.opacity,this._rf(),(s||e)&&i.translate(-s,-e);let h=this.children;t&&(h=h.filter(t)),h.map((t=>t.render&&t.render())),i.restore()}draw(){}_pc(t,i){this._uw(),this.children.map((t=>t._pc()))}get x(){return this.position.x}get y(){return this.position.y}set x(t){this.position.x=t,this._pc()}set y(t){this.position.y=t,this._pc()}get width(){return this._w}set width(t){this._w=t,this._pc()}get height(){return this._h}set height(t){this._h=t,this._pc()}_uw(){if(!this._di)return;let{_wx:t=0,_wy:i=0,_wo:s=1,_wr:e=0,_wsx:h=1,_wsy:n=1}=this.parent||{};this._wx=this.x,this._wy=this.y,this._ww=this.width,this._wh=this.height,this._wo=s*this.opacity,this._wr=e+this.rotation;let{x:r,y:a}=function(t,i){let s=Math.sin(i),e=Math.cos(i);return{x:t.x*e-t.y*s,y:t.x*s+t.y*e}}({x:this.x,y:this.y},e);this._wx=r,this._wy=a,this._wsx=h*this.scaleX,this._wsy=n*this.scaleY,this._wx=this.x*h,this._wy=this.y*n,this._ww=this.width*this._wsx,this._wh=this.height*this._wsy,this._wx+=t,this._wy+=i}get world(){return{x:this._wx,y:this._wy,width:this._ww,height:this._wh,opacity:this._wo,rotation:this._wr,scaleX:this._wsx,scaleY:this._wsy}}addChild(t,{absolute:i=!1}={}){this.children.push(t),t.parent=this,t._pc=t._pc||a,t._pc()}removeChild(t){let i=this.children.indexOf(t);-1!==i&&(this.children.splice(i,1),t.parent=null,t._pc())}get opacity(){return this._opa}set opacity(t){this._opa=t,this._pc()}get rotation(){return this._rot}set rotation(t){this._rot=t,this._pc()}setScale(t,i=t){this.scaleX=t,this.scaleY=i}get scaleX(){return this._scx}set scaleX(t){this._scx=t,this._pc()}get scaleY(){return this._scy}set scaleY(t){this._scy=t,this._pc()}}function l(){return new d(...arguments)}l.prototype=d.prototype,l.class=d;class _ extends l.class{init({image:t,width:i=(t?t.width:void 0),height:s=(t?t.height:void 0),...e}={}){super.init({image:t,width:i,height:s,...e})}get animations(){return this._a}set animations(t){let i,s;for(i in this._a={},t)this._a[i]=t[i].clone(),s=s||this._a[i];this.currentAnimation=s,this.width=this.width||s.width,this.height=this.height||s.height}playAnimation(t){this.currentAnimation=this.animations[t],this.currentAnimation.loop||this.currentAnimation.reset()}advance(t){super.advance(t),this.currentAnimation&&this.currentAnimation.update(t)}draw(){this.image&&this.context.drawImage(this.image,0,0,this.image.width,this.image.height),this.currentAnimation&&this.currentAnimation.render({x:0,y:0,width:this.width,height:this.height,context:this.context}),this.color&&(this.context.fillStyle=this.color,this.context.fillRect(0,0,this.width,this.height))}}function p(){return new _(...arguments)}p.prototype=_.prototype,p.class=_;let u=/(\d+)(\w+)/;class x extends l.class{init({text:t="",textAlign:i="",lineHeight:s=1,font:e=(void 0).font,...h}={}){t=""+t,super.init({text:t,textAlign:i,lineHeight:s,font:e,...h}),this._p()}get width(){return this._w}set width(t){this._d=!0,this._w=t,this._fw=t}get text(){return this._t}set text(t){this._d=!0,this._t=t}get font(){return this._f}set font(t){this._d=!0,this._f=t,this._fs=function(t){let i=t.match(u),s=+i[1];return{size:s,unit:i[2],computed:s}}(t).computed}get lineHeight(){return this._lh}set lineHeight(t){this._d=!0,this._lh=t}render(){this._d&&this._p(),super.render()}_p(){this._s=[],this._d=!1;let t=this.context;if(t.font=this.font,!this._s.length&&this._fw){let i=this.text.split(" "),s=0,e=2;for(;e<=i.length;e++){let h=i.slice(s,e).join(" ");t.measureText(h).width>this._fw&&(this._s.push(i.slice(s,e-1).join(" ")),s=e-1)}this._s.push(i.slice(s,e).join(" "))}if(!this._s.length&&this.text.includes("\n")){let i=0;this.text.split("\n").map((s=>{this._s.push(s),i=Math.max(i,t.measureText(s).width)})),this._w=this._fw||i}this._s.length||(this._s.push(this.text),this._w=this._fw||t.measureText(this.text).width),this.height=this._fs+(this._s.length-1)*this._fs*this.lineHeight,this._uw()}draw(){let t=0,i=this.textAlign,s=this.context;i=this.textAlign||("rtl"===s.canvas.dir?"right":"left"),t="right"===i?this.width:"center"===i?this.width/2|0:0,this._s.map(((e,h)=>{s.textBaseline="top",s.textAlign=i,s.fillStyle=this.color,s.font=this.font,s.fillText(e,t,this._fs*this.lineHeight*h)}))}}function w(){return new x(...arguments)}w.prototype=x.prototype,w.class=x;let m=new WeakMap;class y extends p.class{init({padX:t=0,padY:i=0,text:s,onDown:e,onUp:h,...n}={}){super.init({padX:t,padY:i,...n}),this.textNode=w({...s,context:this.context}),this.width||(this.width=this.textNode.width,this.height=this.textNode.height),function(...t){t.map((t=>{let i=t.context?t.context.canvas:void 0,s=m.get(i);if(!s)throw new ReferenceError("Pointer events not initialized for the objects canvas");t._r||(t._r=t.render,t.render=function(){s._cf.push(this),this._r()},s._o.push(t))}))}(this),this.addChild(this.textNode),this._od=e||a,this._ou=h||a;const r=this._dn=document.createElement("button");r.style=o,r.textContent=this.text,r.addEventListener("focus",(()=>this.focus())),r.addEventListener("blur",(()=>this.blur())),r.addEventListener("keydown",(t=>this._kd(t))),r.addEventListener("keyup",(t=>this._ku(t))),c(r,this.context.canvas),this._uw(),this._p()}get text(){return this.textNode.text}set text(t){this._d=!0,this.textNode.text=t}destroy(){this._dn.remove()}_p(){this.text!==this._dn.textContent&&(this._dn.textContent=this.text),this.textNode._p();let t=this.textNode.width+2*this.padX,i=this.textNode.height+2*this.padY;this.width=Math.max(t,this.width),this.height=Math.max(i,this.height),this._uw()}render(){this._d&&this._p(),super.render()}enable(){this.disabled=this._dn.disabled=!1,this.onEnable()}disable(){this.disabled=this._dn.disabled=!0,this.onDisable()}focus(){this.disabled||(this.focused=!0,document.activeElement!=this._dn&&this._dn.focus(),this.onFocus())}blur(){this.focused=!1,document.activeElement==this._dn&&this._dn.blur(),this.onBlur()}onOver(){this.disabled||(this.hovered=!0)}onOut(){this.hovered=!1}onEnable(){}onDisable(){}onFocus(){}onBlur(){}onDown(){this.disabled||(this.pressed=!0,this._od())}onUp(){this.disabled||(this.pressed=!1,this._ou())}_kd(t){"Enter"!=t.code&&"Space"!=t.code||this.onDown()}_ku(t){"Enter"!=t.code&&"Space"!=t.code||this.onUp()}}function f(){return new y(...arguments)}f.prototype=y.prototype,f.class=y;let g={set:(t,i,s)=>(i.startsWith("_")||(t._d=!0),Reflect.set(t,i,s))},b={start:t=>t?1:0,center:()=>.5,end:t=>t?0:1};class v extends l.class{init({flow:t="column",align:i="start",justify:s="start",colGap:e=0,rowGap:h=0,numCols:n=1,dir:r="",breakpoints:a=[],...o}={}){return super.init({flow:t,align:i,justify:s,colGap:e,rowGap:h,numCols:n,dir:r,breakpoints:a,...o}),this._p(),new Proxy(this,g)}addChild(t){this._d=!0,super.addChild(t)}removeChild(t){this._d=!0,super.removeChild(t)}render(){this._d&&this._p(),super.render()}destroy(){this.children.map((t=>t.destroy&&t.destroy()))}_p(){this._d=!1,this.breakpoints.map((t=>{t.metric.call(this)&&this._b!==t&&(this._b=t,t.callback.call(this))}));let t=this._g=[],i=this._cw=[],s=this._rh=[],e=this.children,h=this._nc="column"===this.flow?1:"row"===this.flow?e.length:this.numCols,n=0,r=0;for(let a,o=0;a=e[o];o++){t[n]=t[n]||[],a._p&&a._p(),s[n]=Math.max(s[n]||0,a.height);let e=a.colSpan||1,o=e;do{i[r]=Math.max(i[r]||0,a.width/o),t[n][r]=a}while(o+r++<=h&&--e);r>=h&&(r=0,n++)}for(;r>0&&r<h;)t[n][r++]=!1;let a=t.length,o=[].concat(this.colGap),c=[].concat(this.rowGap);this._w=i.reduce(((t,i)=>t+i),0);for(let t=0;t<h-1;t++)this._w+=o[t%o.length];this._h=s.reduce(((t,i)=>t+i),0);for(let t=0;t<a-1;t++)this._h+=c[t%c.length];this._uw();let d="rtl"===this.context.canvas.dir&&!this.dir||"rtl"===this.dir;this._rtl=d,d&&(this._g=t.map((t=>t.reverse())),this._cw=i.reverse(),o=o.reverse());let l=-this.anchor.y*this.height,_=[];this._g.map(((t,e)=>{let h=-this.anchor.x*this.width;t.map(((t,n)=>{if(t&&!_.includes(t)){_.push(t);let r=b[t.justifySelf||this.justify](this._rtl),a=b[t.alignSelf||this.align](),c=t.colSpan||1,d=i[n];if(c>1&&n+c<=this._nc)for(let t=1;t<c;t++)d+=i[n+t]+o[(n+t)%o.length];let p=d*r,u=s[e]*a,x=0,w=0,{width:m,height:y}=t;t.anchor&&(x=t.anchor.x,w=t.anchor.y),0===r?p+=m*x:.5===r?p+=(x<.5?-1:.5===x?0:1)*m*r:p-=m*(1-x),0===a?u+=y*w:.5===a?u+=(w<.5?-1:.5===w?0:1)*y*a:u-=y*(1-w),t.x=h+p,t.y=l+u}h+=i[n]+o[n%o.length]})),l+=s[e]+c[e%c.length]}))}}function A(){return new v(...arguments)}A.prototype=v.prototype,A.class=v;class j{constructor({create:t,maxSize:i=1024}={}){let s;if(!t||!(s=t())||!(s.update&&s.init&&s.isAlive&&s.render))throw Error("Must provide create() function which returns an object with init(), update(), render(), and isAlive() functions");this._c=t,this.objects=[t()],this.size=0,this.maxSize=i}get(t={}){if(this.size===this.objects.length){if(this.size===this.maxSize)return;for(let t=0;t<this.size&&this.objects.length<this.maxSize;t++)this.objects.push(this._c())}let i=this.objects[this.size];return this.size++,i.init(t),i}getAliveObjects(){return this.objects.slice(0,this.size)}clear(){this.size=this.objects.length=0,this.objects.push(this._c())}update(t){let i,s=!1;for(let e=this.size;e--;)i=this.objects[e],i.update(t),i.isAlive()||(s=!0,this.size--);s&&this.objects.sort(((t,i)=>i.isAlive()-t.isAlive()))}render(){for(let t=this.size;t--;)this.objects[t].render()}}function S(){return new j(...arguments)}function C(t,i){let s=[],e=i.x+i.width/2,n=i.y+i.height/2,{x:r,y:a,width:o,height:c}=h(t),d=t.y<n,l=t.y+t.height>=n;return t.x<e&&(d&&s.push(0),l&&s.push(2)),t.x+t.width>=e&&(d&&s.push(1),l&&s.push(3)),s}S.prototype=j.prototype,S.class=j;class z{constructor({maxDepth:t=3,maxObjects:i=25,bounds:s}={}){let e;this.maxDepth=t,this.maxObjects=i,this.bounds=s||{x:0,y:0,width:e.width,height:e.height},this._b=!1,this._d=0,this._o=[],this._s=[],this._p=null}clear(){this._s.map((function(t){t.clear()})),this._b=!1,this._o.length=0}get(t){let i=new Set;for(;this._s.length&&this._b;)return C(t,this.bounds).map((s=>{this._s[s].get(t).map((t=>i.add(t)))})),Array.from(i);return this._o.filter((i=>i!==t))}add(...t){t.map((t=>{Array.isArray(t)?this.add.apply(this,t):this._b?this._a(t):(this._o.push(t),this._o.length>this.maxObjects&&this._d<this.maxDepth&&(this._sp(),this._o.map((t=>this._a(t))),this._o.length=0))}))}_a(t){C(t,this.bounds).map((i=>{this._s[i].add(t)}))}_sp(t,i,s){if(this._b=!0,!this._s.length)for(t=this.bounds.width/2|0,i=this.bounds.height/2|0,s=0;s<4;s++)this._s[s]=new z({bounds:{x:this.bounds.x+(s%2==1?t:0),y:this.bounds.y+(s>=2?i:0),width:t,height:i},maxDepth:this.maxDepth,maxObjects:this.maxObjects}),this._s[s]._d=this._d+1,this._s[s]._p=this}}function E(){return new z(...arguments)}function M(t){let i=[];return t._dn?i.push(t._dn):t.children&&t.children.map((t=>{i=i.concat(M(t))})),i}E.prototype=z.prototype,E.class=z;class X extends l.class{init({id:t,name:i=t,cullObjects:s=!0,cullFunction:h=e,...n}){const r=this._dn=document.createElement("section");r.tabIndex=-1,r.style=o,r.id=t,r.setAttribute("aria-label",i),super.init({id:t,name:i,cullObjects:s,cullFunction:h,...n}),c(r,this.context.canvas);let a=this.context.canvas;this.camera=l({x:a.width/2,y:a.height/2,width:a.width,height:a.height,anchor:{x:.5,y:.5}}),this.camera._pc=()=>{super._pc.call(this.camera),this.context.canvas,this.camera._wx=this.camera.x*this.scaleX,this.camera._wy=this.camera.y*this.scaleY}}show(){this.hidden=this._dn.hidden=!1;let t=this.children.find((t=>t.focus));t?t.focus():this._dn.focus(),this.onShow()}hide(){this.hidden=this._dn.hidden=!0,this.onHide()}addChild(t,i){super.addChild(t,i),M(t).map((t=>{this._dn.appendChild(t)}))}removeChild(t){super.removeChild(t),M(t).map((t=>{c(t,this.context.canvas)}))}destroy(){this._dn.remove(),this.children.map((t=>t.destroy&&t.destroy()))}update(t){this.hidden||super.update(t)}lookAt(t){let i=(t=t.world||t).x,s=t.y;t.scaleX&&(i/=t.scaleX,s/=t.scaleY),this.camera.x=i,this.camera.y=s,this._pc()}_pc(){super._pc(),this.camera&&this.camera._pc()}render(){let{x:t,y:i,width:s,height:e}=this.camera;this.sx=t*this.scaleX-s/2,this.sy=i*this.scaleY-e/2,this.hidden||super.render((t=>!this.cullObjects||this.cullFunction(t,this.camera)))}onShow(){}onHide(){}}function Y(){return new X(...arguments)}function k(t){if(+t===t)return t;let i=[],s=t.split(".."),e=+s[0],h=+s[1],n=e;if(e<h)for(;n<=h;n++)i.push(n);else for(;n>=h;n--)i.push(n);return i}Y.prototype=X.prototype,Y.class=X;class O{constructor({image:t,frameWidth:i,frameHeight:s,frameMargin:e,animations:h}={}){if(!t)throw Error("You must provide an Image for the SpriteSheet");this.animations={},this.image=t,this.frame={width:i,height:s,margin:e},this._f=t.width/i|0,this.createAnimations(h)}createAnimations(t){let s,e;for(e in t){let{frames:h,frameRate:n,loop:r}=t[e];if(s=[],void 0===h)throw Error("Animation "+e+" must provide a frames property");[].concat(h).map((t=>{s=s.concat(k(t))})),this.animations[e]=i({spriteSheet:this,frames:s,frameRate:n,loop:r})}}}function D(){return new O(...arguments)}D.prototype=O.prototype,D.class=O,p({x:100,y:80,color:"red",width:20,height:40,dx:2})})();