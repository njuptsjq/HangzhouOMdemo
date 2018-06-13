(function(a){if(typeof module==="object"&&module.exports){module.exports=a}else{a(Highcharts)}}(function(a){(function(m){var f=m.defined,n=m.isNumber,o=m.inArray,i=m.isArray,k=m.merge,h=m.Chart,j=m.extend,l=m.each;var g,b;b=["path","rect","circle"];g={top:0,left:0,center:0.5,middle:0.5,bottom:1,right:1};function e(r){var q,p;p={xAxis:0,yAxis:0,title:{style:{},text:"",x:0,y:0},shape:{params:{stroke:"#000000",fill:"transparent",strokeWidth:2}}};q={circle:{params:{x:0,y:0}}};if(q[r]){p.shape=k(p.shape,q[r])}return p}function d(v,t,q,s,u){var p=v.length,r=0;while(r<p){if(n(v[r])&&n(v[r+1])){v[r]=t.toPixels(v[r])-s;v[r+1]=q.toPixels(v[r+1])-u;r+=2}else{r+=1}}return v}var c=function(){this.init.apply(this,arguments)};c.prototype={init:function(q,p){var r=p.shape&&p.shape.type;this.chart=q;this.options=k({},e(r),p)},render:function(w){var q=this,t=this.chart,s=q.chart.renderer,v=q.group,u=q.title,r=q.shape,y=q.options,x=y.title,p=y.shape;if(!v){v=q.group=s.g()}if(!r&&p&&o(p.type,b)!==-1){r=q.shape=s[y.shape.type](p.params);r.add(v)}if(!u&&x){u=q.title=s.label(x);u.add(v)}v.add(t.annotations.group);q.linkObjects();if(w!==false){q.redraw()}},redraw:function(){var u=this.options,D=this.chart,w=this.group,J=this.title,r=this.shape,H=this.linkedObject,z=D.xAxis[u.xAxis],p=D.yAxis[u.yAxis],G=u.width,E=u.height,s=g[u.anchorY],t=g[u.anchorX],I,F,C,v,q,B,A;if(H){F=(H instanceof m.Point)?"point":(H instanceof m.Series)?"series":null;if(F==="point"){u.xValue=H.x;u.yValue=H.y;C=H.series}else{if(F==="series"){C=H}}if(w.visibility!==C.group.visibility){w.attr({visibility:C.group.visibility})}}B=(f(u.xValue)?z.toPixels(u.xValue+z.minPointOffset)-z.minPixelPadding:u.x);A=f(u.yValue)?p.toPixels(u.yValue):u.y;if(!n(B)||!n(A)){return}if(J){J.attr(u.title);J.css(u.title.style)}if(r){I=j({},u.shape.params);if(u.units==="values"){for(v in I){if(o(v,["width","x"])>-1){I[v]=z.translate(I[v])}else{if(o(v,["height","y"])>-1){I[v]=p.translate(I[v])}}}if(I.width){I.width-=z.toPixels(0)-z.left}if(I.x){I.x+=z.minPixelPadding}if(u.shape.type==="path"){d(I.d,z,p,B,A)}}if(u.shape.type==="circle"){I.x+=I.r;I.y+=I.r}r.attr(I)}w.bBox=null;if(!n(G)){q=w.getBBox();G=q.width}if(!n(E)){if(!q){q=w.getBBox()}E=q.height}if(!n(t)){t=g.center}if(!n(s)){s=g.center}B=B-G*t;A=A-E*s;if(f(w.translateX)&&f(w.translateY)){w.animate({translateX:B,translateY:A})}else{w.translate(B,A)}},destroy:function(){var p=this,s=this.chart,r=s.annotations.allItems,q=r.indexOf(p);if(q>-1){r.splice(q,1)}l(["title","shape","group"],function(t){if(p[t]){p[t].destroy();p[t]=null}});p.group=p.title=p.shape=p.chart=p.options=null},update:function(p,q){j(this.options,p);this.linkObjects();this.render(q)},linkObjects:function(){var r=this,t=r.chart,q=r.linkedObject,p=q&&(q.id||q.options.id),s=r.options,u=s.linkedTo;if(!f(u)){r.linkedObject=null}else{if(!f(q)||u!==p){r.linkedObject=t.get(u)}}}};j(h.prototype,{annotations:{add:function(q,u){var t=this.allItems,r=this.chart,s,p;if(!i(q)){q=[q]}p=q.length;while(p--){s=new c(r,q[p]);t.push(s);s.render(u)}},redraw:function(){l(this.allItems,function(p){p.redraw()})}}});h.prototype.callbacks.push(function(q){var p=q.options.annotations,r;r=q.renderer.g("annotations");r.attr({zIndex:7});r.add();q.annotations.allItems=[];q.annotations.chart=q;q.annotations.group=r;if(i(p)&&p.length>0){q.annotations.add(q.options.annotations)}m.addEvent(q,"redraw",function(){q.annotations.redraw()})})}(a))}));