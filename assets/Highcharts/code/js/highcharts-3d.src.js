(function(a){if(typeof module==="object"&&module.exports){module.exports=a}else{a(Highcharts)}}(function(a){(function(c){var b=c.deg2rad,e=c.pick;function f(g,j,i,h){return{x:h.cosB*g-h.sinB*i,y:-h.sinA*h.sinB*g+h.cosA*j-h.cosB*h.sinA*i,z:h.cosA*h.sinB*g+h.sinA*j+h.cosA*h.cosB*i}}function d(j,h,i){var g=((i>0)&&(i<Number.POSITIVE_INFINITY))?i/(j.z+h.z+i):1;return{x:j.x*g,y:j.y*g}}c.perspective=function(p,l,g){var k=l.options.chart.options3d,i=g?l.inverted:false,o={x:l.plotWidth/2,y:l.plotHeight/2,z:k.depth/2,vd:e(k.depth,1)*e(k.viewDistance,0)},h=l.scale3d||1,n=b*k.beta*(i?-1:1),j=b*k.alpha*(i?-1:1),m={cosA:Math.cos(j),cosB:Math.cos(-n),sinA:Math.sin(j),sinB:Math.sin(-n)};if(!g){o.x+=l.plotLeft;o.y+=l.plotTop}return c.map(p,function(q){var r=f((i?q.y:q.x)-o.x,(i?q.x:q.y)-o.y,(q.z||0)-o.z,m),s=d(r,o,o.vd);s.x=s.x*h+o.x;s.y=s.y*h+o.y;s.z=r.z*h+o.z;return{x:(i?s.y:s.x),y:(i?s.x:s.y),z:s.z}})};c.pointCameraDistance=function(i,h){var g=h.options.chart.options3d,k={x:h.plotWidth/2,y:h.plotHeight/2,z:e(g.depth,1)*e(g.viewDistance,0)+g.depth},j=Math.sqrt(Math.pow(k.x-i.plotX,2)+Math.pow(k.y-i.plotY,2)+Math.pow(k.z-i.plotZ,2));return j}}(a));(function(l){var d=Math.cos,r=Math.PI,b=Math.sin;var k=l.animObject,u=l.charts,t=l.color,c=l.defined,h=l.deg2rad,e=l.each,w=l.extend,v=l.inArray,x=l.map,g=l.merge,q=l.perspective,f=l.pick,m=l.SVGElement,s=l.SVGRenderer,j=l.wrap;var o=(4*(Math.sqrt(2)-1)/3)/(r/2);function p(B){var A=0,z,y;for(z=0;z<B.length;z++){y=(z+1)%B.length;A+=B[z].x*B[y].y-B[y].x*B[z].y}return A/2}function i(A){var B=0,y;for(y=0;y<A.length;y++){B+=A[y].z}return A.length?B/A.length:0}function n(D,B,A,y,z,C,H,F){var G=[],E=C-z;if((C>z)&&(C-z>Math.PI/2+0.0001)){G=G.concat(n(D,B,A,y,z,z+(Math.PI/2),H,F));G=G.concat(n(D,B,A,y,z+(Math.PI/2),C,H,F));return G}if((C<z)&&(z-C>Math.PI/2+0.0001)){G=G.concat(n(D,B,A,y,z,z-(Math.PI/2),H,F));G=G.concat(n(D,B,A,y,z-(Math.PI/2),C,H,F));return G}return["C",D+(A*Math.cos(z))-((A*o*E)*Math.sin(z))+H,B+(y*Math.sin(z))+((y*o*E)*Math.cos(z))+F,D+(A*Math.cos(C))+((A*o*E)*Math.sin(C))+H,B+(y*Math.sin(C))-((y*o*E)*Math.cos(C))+F,D+(A*Math.cos(C))+H,B+(y*Math.sin(C))+F]}j(s.prototype,"init",function(y){y.apply(this,[].slice.call(arguments,1));e([{name:"darker",slope:0.6},{name:"brighter",slope:1.4}],function(z){this.definition({tagName:"filter",id:"highcharts-"+z.name,children:[{tagName:"feComponentTransfer",children:[{tagName:"feFuncR",type:"linear",slope:z.slope},{tagName:"feFuncG",type:"linear",slope:z.slope},{tagName:"feFuncB",type:"linear",slope:z.slope}]}]})},this)});s.prototype.toLinePath=function(A,z){var y=[];e(A,function(B){y.push("L",B.x,B.y)});if(A.length){y[0]="M";if(z){y.push("Z")}}return y};s.prototype.cuboid=function(z){var y=this.g(),A=this.cuboidPath(z);y.front=this.path(A[0]).attr({"class":"highcharts-3d-front",zIndex:A[3]}).add(y);y.top=this.path(A[1]).attr({"class":"highcharts-3d-top",zIndex:A[4]}).add(y);y.side=this.path(A[2]).attr({"class":"highcharts-3d-side",zIndex:A[5]}).add(y);y.fillSetter=function(B){this.front.attr({fill:B});this.top.attr({fill:t(B).brighten(0.1).get()});this.side.attr({fill:t(B).brighten(-0.1).get()});this.color=B;return this};y.opacitySetter=function(B){this.front.attr({opacity:B});this.top.attr({opacity:B});this.side.attr({opacity:B});return this};y.attr=function(B){if(B.shapeArgs||c(B.x)){var C=B.shapeArgs||B;var D=this.renderer.cuboidPath(C);this.front.attr({d:D[0],zIndex:D[3]});this.top.attr({d:D[1],zIndex:D[4]});this.side.attr({d:D[2],zIndex:D[5]})}else{return l.SVGElement.prototype.attr.call(this,B)}return this};y.animate=function(C,D,B){if(c(C.x)&&c(C.y)){var E=this.renderer.cuboidPath(C);this.front.attr({zIndex:E[3]}).animate({d:E[0]},D,B);this.top.attr({zIndex:E[4]}).animate({d:E[1]},D,B);this.side.attr({zIndex:E[5]}).animate({d:E[2]},D,B);this.attr({zIndex:-E[6]})}else{if(C.opacity){this.front.animate(C,D,B);this.top.animate(C,D,B);this.side.animate(C,D,B)}else{m.prototype.animate.call(this,C,D,B)}}return this};y.destroy=function(){this.front.destroy();this.top.destroy();this.side.destroy();return null};y.attr({zIndex:-A[6]});return y};s.prototype.cuboidPath=function(T){var K=T.x,J=T.y,I=T.z,P=T.height,L=T.width,R=T.depth,N=u[this.chartIndex];var A=[{x:K,y:J,z:I},{x:K+L,y:J,z:I},{x:K+L,y:J+P,z:I},{x:K,y:J+P,z:I},{x:K,y:J+P,z:I+R},{x:K+L,y:J+P,z:I+R},{x:K+L,y:J,z:I+R},{x:K,y:J,z:I+R}];A=q(A,N,T.insidePlotArea);function F(y){return A[y]}var Q=function(U,z){var y=[];U=x(U,F);z=x(z,F);if(p(U)<0){y=U}else{if(p(z)<0){y=z}}return y};var G=[3,2,1,0];var O=[7,6,5,4];var D=Q(G,O);var M=[1,6,7,0];var H=[4,5,2,3];var C=Q(M,H);var S=[1,2,5,6];var E=[0,7,4,3];var B=Q(S,E);return[this.toLinePath(D,true),this.toLinePath(C,true),this.toLinePath(B,true),i(D),i(C),i(B),i(x(H,F))*9000000000]};l.SVGRenderer.prototype.arc3d=function(B){var C=this.g(),z=C.renderer,A=["x","y","r","innerR","start","end"];function y(G){var F=false,D={};for(var E in G){if(v(E,A)!==-1){D[E]=G[E];delete G[E];F=true}}return F?D:false}B=g(B);B.alpha*=h;B.beta*=h;C.top=z.path();C.side1=z.path();C.side2=z.path();C.inn=z.path();C.out=z.path();C.onAdd=function(){var E=C.parentGroup,D=C.attr("class");C.top.add(C);e(["out","inn","side1","side2"],function(F){C[F].addClass(D+" highcharts-3d-side").add(E)})};C.setPaths=function(E){var D=C.renderer.arc3dPath(E),F=D.zTop*100;C.attribs=E;C.top.attr({d:D.top,zIndex:D.zTop});C.inn.attr({d:D.inn,zIndex:D.zInn});C.out.attr({d:D.out,zIndex:D.zOut});C.side1.attr({d:D.side1,zIndex:D.zSide1});C.side2.attr({d:D.side2,zIndex:D.zSide2});C.zIndex=F;C.attr({zIndex:F});if(E.center){C.top.setRadialReference(E.center);delete E.center}};C.setPaths(B);C.fillSetter=function(D){var E=t(D).brighten(-0.1).get();this.fill=D;this.side1.attr({fill:E});this.side2.attr({fill:E});this.inn.attr({fill:E});this.out.attr({fill:E});this.top.attr({fill:D});return this};e(["opacity","translateX","translateY","visibility"],function(D){C[D+"Setter"]=function(F,E){C[E]=F;e(["out","inn","side1","side2","top"],function(G){C[G].attr(E,F)})}});j(C,"attr",function(E,G,F){var D;if(typeof G==="object"){D=y(G);if(D){w(C.attribs,D);C.setPaths(C.attribs)}}return E.call(this,G,F)});j(C,"animate",function(F,I,H,E){var D,K=this.attribs,J,G;delete I.center;delete I.z;delete I.depth;delete I.alpha;delete I.beta;G=k(f(H,this.renderer.globalAnimation));if(G.duration){I=g(I);D=y(I);I.dummy=1;if(D){J=D;G.step=function(L,N){function M(O){return K[O]+(f(J[O],K[O])-K[O])*N.pos}if(N.prop==="dummy"){N.elem.setPaths(g(K,{x:M("x"),y:M("y"),r:M("r"),innerR:M("innerR"),start:M("start"),end:M("end")}))}}}H=G}return F.call(this,I,H,E)});C.destroy=function(){this.top.destroy();this.out.destroy();this.inn.destroy();this.side1.destroy();this.side2.destroy();m.prototype.destroy.call(this)};C.hide=function(){this.top.hide();this.out.hide();this.inn.hide();this.side1.hide();this.side2.hide()};C.show=function(){this.top.show();this.out.show();this.inn.show();this.side1.show();this.side2.show()};return C};s.prototype.arc3dPath=function(B){var I=B.x,H=B.y,M=B.start,D=B.end-0.00001,ab=B.r,P=B.innerR,ah=B.depth,ag=B.alpha,W=B.beta;var L=Math.cos(M),C=Math.sin(M),U=Math.cos(D),G=Math.sin(D),Q=ab*Math.cos(W),N=ab*Math.cos(ag),F=P*Math.cos(W),E=P*Math.cos(ag),z=ah*Math.sin(W),y=ah*Math.sin(ag);var A=["M",I+(Q*L),H+(N*C)];A=A.concat(n(I,H,Q,N,M,D,0,0));A=A.concat(["L",I+(F*U),H+(E*G)]);A=A.concat(n(I,H,F,E,D,M,0,0));A=A.concat(["Z"]);var ai=(W>0?Math.PI/2:0),aj=(ag>0?0:Math.PI/2);var af=M>-ai?M:(D>-ai?-ai:M),R=D<r-aj?D:(M<r-aj?r-aj:D),V=2*r-aj;var Z=["M",I+(Q*d(af)),H+(N*b(af))];Z=Z.concat(n(I,H,Q,N,af,R,0,0));if(D>V&&M<V){Z=Z.concat(["L",I+(Q*d(R))+z,H+(N*b(R))+y]);Z=Z.concat(n(I,H,Q,N,R,V,z,y));Z=Z.concat(["L",I+(Q*d(V)),H+(N*b(V))]);Z=Z.concat(n(I,H,Q,N,V,D,0,0));Z=Z.concat(["L",I+(Q*d(D))+z,H+(N*b(D))+y]);Z=Z.concat(n(I,H,Q,N,D,V,z,y));Z=Z.concat(["L",I+(Q*d(V)),H+(N*b(V))]);Z=Z.concat(n(I,H,Q,N,V,R,0,0))}else{if(D>r-aj&&M<r-aj){Z=Z.concat(["L",I+(Q*Math.cos(R))+z,H+(N*Math.sin(R))+y]);Z=Z.concat(n(I,H,Q,N,R,D,z,y));Z=Z.concat(["L",I+(Q*Math.cos(D)),H+(N*Math.sin(D))]);Z=Z.concat(n(I,H,Q,N,D,R,0,0))}}Z=Z.concat(["L",I+(Q*Math.cos(R))+z,H+(N*Math.sin(R))+y]);Z=Z.concat(n(I,H,Q,N,R,af,z,y));Z=Z.concat(["Z"]);var aa=["M",I+(F*L),H+(E*C)];aa=aa.concat(n(I,H,F,E,M,D,0,0));aa=aa.concat(["L",I+(F*Math.cos(D))+z,H+(E*Math.sin(D))+y]);aa=aa.concat(n(I,H,F,E,D,M,z,y));aa=aa.concat(["Z"]);var T=["M",I+(Q*L),H+(N*C),"L",I+(Q*L)+z,H+(N*C)+y,"L",I+(F*L)+z,H+(E*C)+y,"L",I+(F*L),H+(E*C),"Z"];var S=["M",I+(Q*U),H+(N*G),"L",I+(Q*U)+z,H+(N*G)+y,"L",I+(F*U)+z,H+(E*G)+y,"L",I+(F*U),H+(E*G),"Z"];var O=Math.atan2(y,-z),ak=Math.abs(D+O),Y=Math.abs(M+O),X=Math.abs((M+D)/2+O);function K(al){al=al%(2*Math.PI);if(al>Math.PI){al=2*Math.PI-al}return al}ak=K(ak);Y=K(Y);X=K(X);var J=100000,ae=X*J,ad=Y*J,ac=ak*J;return{top:A,zTop:Math.PI*J+1,out:Z,zOut:Math.max(ae,ad,ac),inn:aa,zInn:Math.max(ae,ad,ac),side1:T,zSide1:ac*0.99,side2:S,zSide2:ad*0.99}}}(a));(function(i){var e=i.Chart,h=i.each,g=i.merge,c=i.perspective,f=i.pick,b=i.wrap;e.prototype.is3d=function(){return this.options.chart.options3d&&this.options.chart.options3d.enabled};e.prototype.propsRequireDirtyBox.push("chart.options3d");e.prototype.propsRequireUpdateSeries.push("chart.options3d");function j(q,m){var k=q.plotLeft,n=q.plotWidth+k,r=q.plotTop,s=q.plotHeight+r,u=k+q.plotWidth/2,t=r+q.plotHeight/2,p={minX:Number.MAX_VALUE,maxX:-Number.MAX_VALUE,minY:Number.MAX_VALUE,maxY:-Number.MAX_VALUE},o,l=1;o=[{x:k,y:r,z:0},{x:k,y:r,z:m}];h([0,1],function(v){o.push({x:n,y:o[v].y,z:o[v].z})});h([0,1,2,3],function(v){o.push({x:o[v].x,y:s,z:o[v].z})});o=c(o,q,false);h(o,function(v){p.minX=Math.min(p.minX,v.x);p.maxX=Math.max(p.maxX,v.x);p.minY=Math.min(p.minY,v.y);p.maxY=Math.max(p.maxY,v.y)});if(k>p.minX){l=Math.min(l,1-Math.abs((k+u)/(p.minX+u))%1)}if(n<p.maxX){l=Math.min(l,(n-u)/(p.maxX-u))}if(r>p.minY){if(p.minY<0){l=Math.min(l,(r+t)/(-p.minY+r+t))}else{l=Math.min(l,1-(r+t)/(p.minY+t)%1)}}if(s<p.maxY){l=Math.min(l,Math.abs((s-t)/(p.maxY-t)))}return l}i.wrap(i.Chart.prototype,"isInsidePlot",function(k){return this.is3d()||k.apply(this,[].slice.call(arguments,1))});var d=i.getOptions();g(true,d,{chart:{options3d:{enabled:false,alpha:0,beta:0,depth:100,fitToPlot:true,viewDistance:25,frame:{bottom:{size:1},side:{size:1},back:{size:1}}}},defs:{style:{textContent:d.defs.style.textContent+"\n.highcharts-3d-top{filter: url(#highcharts-brighter)}\n.highcharts-3d-side{filter: url(#highcharts-darker)}"}}});b(e.prototype,"setClassName",function(k){k.apply(this,[].slice.call(arguments,1));if(this.is3d()){this.container.className+=" highcharts-3d-chart"}});i.wrap(i.Chart.prototype,"setChartSize",function(p){var q=this,o=q.options.chart.options3d;p.apply(q,[].slice.call(arguments,1));if(q.is3d()){var l=q.inverted,k=q.clipBox,m=q.margin,s=l?"y":"x",r=l?"x":"y",t=l?"height":"width",n=l?"width":"height";k[s]=-(m[3]||0);k[r]=-(m[0]||0);k[t]=q.chartWidth+(m[3]||0)+(m[1]||0);k[n]=q.chartHeight+(m[0]||0)+(m[2]||0);q.scale3d=1;if(o.fitToPlot===true){q.scale3d=j(q,o.depth)}}});b(e.prototype,"redraw",function(k){if(this.is3d()){this.isDirtyBox=true}k.apply(this,[].slice.call(arguments,1))});b(e.prototype,"renderSeries",function(m){var l,k=this.series.length;if(this.is3d()){while(k--){l=this.series[k];l.translate();l.render()}}else{m.call(this)}});e.prototype.retrieveStacks=function(m){var l=this.series,n={},o,k=1;h(this.series,function(p){o=f(p.options.stack,(m?0:l.length-1-p.index));if(!n[o]){n[o]={series:[p],position:k};k++}else{n[o].series.push(p)}});n.totalStacks=k+1;return n}}(a));(function(m){var k,g=m.Axis,d=m.Chart,j=m.each,h=m.extend,i=m.merge,c=m.perspective,f=m.pick,e=m.splat,l=m.Tick,b=m.wrap;b(g.prototype,"setOptions",function(o,p){var n;o.call(this,p);if(this.chart.is3d()){n=this.options;n.tickWidth=f(n.tickWidth,0);n.gridLineWidth=f(n.gridLineWidth,1)}});b(g.prototype,"render",function(x){x.apply(this,[].slice.call(arguments,1));if(!this.chart.is3d()){return}var y=this.chart,w=y.renderer,t=y.options.chart.options3d,o=t.frame,r=o.bottom,u=o.back,A=o.side,s=t.depth,C=this.height,n=this.width,p=this.left,z=this.top;if(this.isZAxis){return}if(this.horiz){var q={x:p,y:z+(y.xAxis[0].opposite?-r.size:C),z:0,width:n,height:r.size,depth:s,insidePlotArea:false};if(!this.bottomFrame){this.bottomFrame=w.cuboid(q).attr({"class":"highcharts-3d-frame highcharts-3d-frame-bottom",zIndex:(y.yAxis[0].reversed&&t.alpha>0?4:-1)}).add()}else{this.bottomFrame.animate(q)}}else{var B={x:p+(y.yAxis[0].opposite?0:-A.size),y:z+(y.xAxis[0].opposite?-r.size:0),z:s,width:n+A.size,height:C+r.size,depth:u.size,insidePlotArea:false};if(!this.backFrame){this.backFrame=w.cuboid(B).attr({"class":"highcharts-3d-frame highcharts-3d-frame-back",zIndex:-3}).add()}else{this.backFrame.animate(B)}var v={x:p+(y.yAxis[0].opposite?n:-A.size),y:z+(y.xAxis[0].opposite?-r.size:0),z:0,width:A.size,height:C+r.size,depth:s,insidePlotArea:false};if(!this.sideFrame){this.sideFrame=w.cuboid(v).attr({"class":"highcharts-3d-frame highcharts-3d-frame-side",zIndex:-2}).add()}else{this.sideFrame.animate(v)}}});b(g.prototype,"getPlotLinePath",function(q){var s=q.apply(this,[].slice.call(arguments,1));if(!this.chart.is3d()){return s}if(s===null){return s}var p=this.chart,o=p.options.chart.options3d,t=this.isZAxis?p.plotWidth:o.depth,r=this.opposite;if(this.horiz){r=!r}var n=[this.swapZ({x:s[1],y:s[2],z:(r?t:0)}),this.swapZ({x:s[1],y:s[2],z:t}),this.swapZ({x:s[4],y:s[5],z:t}),this.swapZ({x:s[4],y:s[5],z:(r?0:t)})];n=c(n,this.chart,false);s=this.chart.renderer.toLinePath(n,false);return s});b(g.prototype,"getLinePath",function(n){return this.chart.is3d()?[]:n.apply(this,[].slice.call(arguments,1))});b(g.prototype,"getPlotBandPath",function(o){if(!this.chart.is3d()){return o.apply(this,[].slice.call(arguments,1))}var n=arguments,s=n[1],r=n[2],p=this.getPlotLinePath(r),q=this.getPlotLinePath(s);if(q&&p){q.push("L",p[10],p[11],"L",p[7],p[8],"L",p[4],p[5],"L",p[1],p[2])}else{q=null}return q});b(l.prototype,"getMarkPath",function(o){var p=o.apply(this,[].slice.call(arguments,1));if(!this.axis.chart.is3d()){return p}var n=[this.axis.swapZ({x:p[1],y:p[2],z:0}),this.axis.swapZ({x:p[4],y:p[5],z:0})];n=c(n,this.axis.chart,false);p=["M",n[0].x,n[0].y,"L",n[1].x,n[1].y];return p});b(l.prototype,"getLabelPosition",function(n){var o=n.apply(this,[].slice.call(arguments,1));if(this.axis.chart.is3d()){o=c([this.axis.swapZ({x:o.x,y:o.y,z:0})],this.axis.chart,false)[0]}return o});m.wrap(g.prototype,"getTitlePosition",function(o){var p=this.chart.is3d(),q,n;if(p){n=this.axisTitleMargin;this.axisTitleMargin=0}q=o.apply(this,[].slice.call(arguments,1));if(p){q=c([this.swapZ({x:q.x,y:q.y,z:0})],this.chart,false)[0];q[this.horiz?"y":"x"]+=(this.horiz?1:-1)*(this.opposite?-1:1)*n;this.axisTitleMargin=n}return q});b(g.prototype,"drawCrosshair",function(o){var n=arguments;if(this.chart.is3d()){if(n[2]){n[2]={plotX:n[2].plotXold||n[2].plotX,plotY:n[2].plotYold||n[2].plotY}}}o.apply(this,[].slice.call(n,1))});g.prototype.swapZ=function(q,o){if(this.isZAxis){var r=o?0:this.chart.plotLeft;var n=this.chart;return{x:r+(n.yAxis[0].opposite?q.z:n.xAxis[0].width-q.z),y:q.y,z:q.x-r}}return q};k=m.ZAxis=function(){this.isZAxis=true;this.init.apply(this,arguments)};h(k.prototype,g.prototype);h(k.prototype,{setOptions:function(n){n=i({offset:0,lineWidth:0},n);g.prototype.setOptions.call(this,n);this.coll="zAxis"},setAxisSize:function(){g.prototype.setAxisSize.call(this);this.width=this.len=this.chart.options.chart.options3d.depth;this.right=this.chart.chartWidth-this.width-this.left},getSeriesExtremes:function(){var o=this,n=o.chart;o.hasVisibleSeries=false;o.dataMin=o.dataMax=o.ignoreMinPadding=o.ignoreMaxPadding=null;if(o.buildStacks){o.buildStacks()}j(o.series,function(r){if(r.visible||!n.options.chart.ignoreHiddenSeries){var q=r.options,s,p=q.threshold;o.hasVisibleSeries=true;if(o.isLog&&p<=0){p=null}s=r.zData;if(s.length){o.dataMin=Math.min(f(o.dataMin,s[0]),Math.min.apply(null,s));o.dataMax=Math.max(f(o.dataMax,s[0]),Math.max.apply(null,s))}}})}});b(d.prototype,"getAxes",function(p){var o=this,n=this.options,q=n.zAxis=e(n.zAxis||{});p.call(this);if(!o.is3d()){return}this.zAxis=[];j(q,function(t,r){t.index=r;t.isX=true;var s=new k(o,t);s.setScale()})})}(a));(function(j){var h=j.each,c=j.perspective,f=j.pick,g=j.Series,d=j.seriesTypes,e=j.svg,b=j.wrap;b(d.column.prototype,"translate",function(o){o.apply(this,[].slice.call(arguments,1));if(!this.chart.is3d()){return}var m=this,n=m.chart,l=m.options,q=l.depth||25;var k=l.stacking?(l.stack||0):m._i;var p=k*(q+(l.groupZPadding||1));if(l.grouping!==false){p=0}p+=(l.groupZPadding||1);h(m.data,function(r){if(r.y!==null){var s=r.shapeArgs,t=r.tooltipPos;r.shapeType="cuboid";s.z=p;s.depth=q;s.insidePlotArea=true;t=c([{x:t[0],y:t[1],z:p}],n,true)[0];r.tooltipPos=[t.x,t.y]}});m.z=p});b(d.column.prototype,"animate",function(n){if(!this.chart.is3d()){n.apply(this,[].slice.call(arguments,1))}else{var l=arguments,p=l[1],k=this.yAxis,m=this,o=this.yAxis.reversed;if(e){if(p){h(m.data,function(q){if(q.y!==null){q.height=q.shapeArgs.height;q.shapey=q.shapeArgs.y;q.shapeArgs.height=1;if(!o){if(q.stackY){q.shapeArgs.y=q.plotY+k.translate(q.stackY)}else{q.shapeArgs.y=q.plotY+(q.negative?-q.height:q.height)}}}})}else{h(m.data,function(q){if(q.y!==null){q.shapeArgs.height=q.height;q.shapeArgs.y=q.shapey;if(q.graphic){q.graphic.animate(q.shapeArgs,m.options.animation)}}});this.drawDataLabels();m.animate=null}}}});b(d.column.prototype,"init",function(q){q.apply(this,[].slice.call(arguments,1));if(this.chart.is3d()){var n=this.options,l=n.grouping,p=n.stacking,k=f(this.yAxis.options.reversedStacks,true),r=0;if(!(l!==undefined&&!l)){var m=this.chart.retrieveStacks(p),s=n.stack||0,o;for(o=0;o<m[s].series.length;o++){if(m[s].series[o]===this){break}}r=(10*(m.totalStacks-m[s].position))+(k?o:-o);if(!this.xAxis.reversed){r=(m.totalStacks*10)-r}}n.zIndex=r}});function i(l){if(this.chart.is3d()){var k=this.chart.options.plotOptions.column.grouping;if(k!==undefined&&!k&&this.group.zIndex!==undefined&&!this.zIndexSet){this.group.attr({zIndex:this.group.zIndex*10});this.zIndexSet=true}}l.apply(this,[].slice.call(arguments,1))}b(g.prototype,"alignDataLabel",function(o){if(this.chart.is3d()&&(this.type==="column"||this.type==="columnrange")){var l=this,m=l.chart;var k=arguments,n=k[4];var p=({x:n.x,y:n.y,z:l.z});p=c([p],m,true)[0];n.x=p.x;n.y=p.y}o.apply(this,[].slice.call(arguments,1))});if(d.columnrange){b(d.columnrange.prototype,"drawPoints",i)}b(d.column.prototype,"drawPoints",i)}(a));(function(e){var c=e.deg2rad,h=e.each,g=e.pick,d=e.seriesTypes,b=e.svg,f=e.wrap;f(d.pie.prototype,"translate",function(l){l.apply(this,[].slice.call(arguments,1));if(!this.chart.is3d()){return}var j=this,i=j.options,p=i.depth||0,k=j.chart.options.chart.options3d,n=k.alpha,m=k.beta,o=i.stacking?(i.stack||0)*p:j._i*p;o+=p/2;if(i.grouping!==false){o=0}h(j.data,function(q){var r=q.shapeArgs,s;q.shapeType="arc3d";r.z=o;r.depth=p*0.75;r.alpha=n;r.beta=m;r.center=j.center;s=(r.end+r.start)/2;q.slicedTranslation={translateX:Math.round(Math.cos(s)*i.slicedOffset*Math.cos(n*c)),translateY:Math.round(Math.sin(s)*i.slicedOffset*Math.cos(n*c))}})});f(d.pie.prototype.pointClass.prototype,"haloPath",function(j){var i=arguments;return this.series.chart.is3d()?[]:j.call(this,i[1])});f(d.pie.prototype,"drawPoints",function(i){i.apply(this,[].slice.call(arguments,1));if(this.chart.is3d()){h(this.points,function(j){var k=j.graphic;if(k){k[j.y&&j.visible?"show":"hide"]()}})}});f(d.pie.prototype,"drawDataLabels",function(l){if(this.chart.is3d()){var i=this,k=i.chart,j=k.options.chart.options3d;h(i.data,function(v){var s=v.shapeArgs,m=s.r,o=(s.alpha||j.alpha)*c,u=(s.beta||j.beta)*c,n=(s.start+s.end)/2,p=v.labelPos,w=[0,2,4],q=(-m*(1-Math.cos(o))*Math.sin(n)),t=m*(Math.cos(u)-1)*Math.cos(n);h(w,function(r){p[r]+=t;p[r+1]+=q})})}l.apply(this,[].slice.call(arguments,1))});f(d.pie.prototype,"addPoint",function(i){i.apply(this,[].slice.call(arguments,1));if(this.chart.is3d()){this.update(this.userOptions,true)}});f(d.pie.prototype,"animate",function(l){if(!this.chart.is3d()){l.apply(this,[].slice.call(arguments,1))}else{var j=arguments,p=j[1],m=this.options.animation,o,i=this.center,n=this.group,k=this.markerGroup;if(b){if(m===true){m={}}if(p){n.oldtranslateX=n.translateX;n.oldtranslateY=n.translateY;o={translateX:i[0],translateY:i[1],scaleX:0.001,scaleY:0.001};n.attr(o);if(k){k.attrSetters=n.attrSetters;k.attr(o)}}else{o={translateX:n.oldtranslateX,translateY:n.oldtranslateY,scaleX:1,scaleY:1};n.animate(o,m);if(k){k.animate(o,m)}this.animate=null}}}})}(a));(function(c){var f=c.perspective,e=c.pick,b=c.seriesTypes,d=c.wrap;d(b.scatter.prototype,"translate",function(m){m.apply(this,[].slice.call(arguments,1));if(!this.chart.is3d()){return}var k=this,n=k.chart,q=e(k.zAxis,n.options.zAxis[0]),l=[],h,o,g,p,j;for(j=0;j<k.data.length;j++){h=k.data[j];p=q.isLog&&q.val2lin?q.val2lin(h.z):h.z;h.plotZ=q.translate(p);h.isInside=h.isInside?(p>=q.min&&p<=q.max):false;l.push({x:h.plotX,y:h.plotY,z:h.plotZ})}o=f(l,n,true);for(j=0;j<k.data.length;j++){h=k.data[j];g=o[j];h.plotXold=h.plotX;h.plotYold=h.plotY;h.plotZold=h.plotZ;h.plotX=g.x;h.plotY=g.y;h.plotZ=g.z}});d(b.scatter.prototype,"init",function(j,i,h){if(i.is3d()){this.axisTypes=["xAxis","yAxis","zAxis"];this.pointArrayMap=["x","y","z"];this.parallelArrays=["x","y","z"];this.directTouch=true}var g=j.apply(this,[i,h]);if(this.chart.is3d()){var k="x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>z: <b>{point.z}</b><br/>";if(this.userOptions.tooltip){this.tooltipOptions.pointFormat=this.userOptions.tooltip.pointFormat||k}else{this.tooltipOptions.pointFormat=k}}return g});d(b.scatter.prototype,"pointAttribs",function(i,g){var h=i.apply(this,[].slice.call(arguments,1));if(this.chart.is3d()&&g){h.zIndex=c.pointCameraDistance(g,this.chart)}return h})}(a));(function(b){}(a))}));