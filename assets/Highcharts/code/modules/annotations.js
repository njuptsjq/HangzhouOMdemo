(function(a){"object"===typeof module&&module.exports?module.exports=a:a(Highcharts)})(function(a){(function(j){var e=j.defined,i=j.isNumber,h=j.inArray,o=j.isArray,m=j.merge,g=j.Chart,l=j.extend,d=j.each,c,b;b=["path","rect","circle"];c={top:0,left:0,center:0.5,middle:0.5,bottom:1,right:1};var p=function(){this.init.apply(this,arguments)};p.prototype={init:function(k,n){var q=n.shape&&n.shape.type;this.chart=k;var f;f={xAxis:0,yAxis:0,title:{style:{},text:"",x:0,y:0},shape:{params:{stroke:"#000000",fill:"transparent",strokeWidth:2}}};k={circle:{params:{x:0,y:0}}};k[q]&&(f.shape=m(f.shape,k[q]));this.options=m({},f,n)},render:function(x){var u=this.chart,v=this.chart.renderer,w=this.group,s=this.title,t=this.shape,r=this.options,q=r.title,n=r.shape;w||(w=this.group=v.g());!t&&n&&-1!==h(n.type,b)&&(t=this.shape=v[r.shape.type](n.params),t.add(w));!s&&q&&(s=this.title=v.label(q),s.add(w));w.add(u.annotations.group);this.linkObjects();!1!==x&&this.redraw()},redraw:function(){var M=this.options,J=this.chart,K=this.group,L=this.title,r=this.shape,I=this.linkedObject,G=J.xAxis[M.xAxis],J=J.yAxis[M.yAxis],k=M.width,C=M.height,f=c[M.anchorY],B=c[M.anchorX],x,E,H,s;I&&(x=I instanceof j.Point?"point":I instanceof j.Series?"series":null,"point"===x?(M.xValue=I.x,M.yValue=I.y,E=I.series):"series"===x&&(E=I),K.visibility!==E.group.visibility&&K.attr({visibility:E.group.visibility}));I=e(M.xValue)?G.toPixels(M.xValue+G.minPointOffset)-G.minPixelPadding:M.x;E=e(M.yValue)?J.toPixels(M.yValue):M.y;if(i(I)&&i(E)){L&&(L.attr(M.title),L.css(M.title.style));if(r){L=l({},M.shape.params);if("values"===M.units){for(H in L){-1<h(H,["width","x"])?L[H]=G.translate(L[H]):-1<h(H,["height","y"])&&(L[H]=J.translate(L[H]))}L.width&&(L.width-=G.toPixels(0)-G.left);L.x&&(L.x+=G.minPixelPadding);if("path"===M.shape.type){H=L.d;x=I;for(var q=E,n=H.length,D=0;D<n;){i(H[D])&&i(H[D+1])?(H[D]=G.toPixels(H[D])-x,H[D+1]=J.toPixels(H[D+1])-q,D+=2):D+=1}}}"circle"===M.shape.type&&(L.x+=L.r,L.y+=L.r);r.attr(L)}K.bBox=null;i(k)||(s=K.getBBox(),k=s.width);i(C)||(s||(s=K.getBBox()),C=s.height);i(B)||(B=c.center);i(f)||(f=c.center);I-=k*B;E-=C*f;e(K.translateX)&&e(K.translateY)?K.animate({translateX:I,translateY:E}):K.translate(I,E)}},destroy:function(){var f=this,k=this.chart.annotations.allItems,n=k.indexOf(f);-1<n&&k.splice(n,1);d(["title","shape","group"],function(q){f[q]&&(f[q].destroy(),f[q]=null)});f.group=f.title=f.shape=f.chart=f.options=null},update:function(f,k){l(this.options,f);this.linkObjects();this.render(k)},linkObjects:function(){var k=this.chart,n=this.linkedObject,q=n&&(n.id||n.options.id),f=this.options.linkedTo;e(f)?e(n)&&f===q||(this.linkedObject=k.get(f)):this.linkedObject=null}};l(g.prototype,{annotations:{add:function(n,s){var t=this.allItems,k=this.chart,q,r;o(n)||(n=[n]);for(r=n.length;r--;){q=new p(k,n[r]),t.push(q),q.render(s)}},redraw:function(){d(this.allItems,function(f){f.redraw()})}}});g.prototype.callbacks.push(function(f){var k=f.options.annotations,n;n=f.renderer.g("annotations");n.attr({zIndex:7});n.add();f.annotations.allItems=[];f.annotations.chart=f;f.annotations.group=n;o(k)&&0<k.length&&f.annotations.add(f.options.annotations);j.addEvent(f,"redraw",function(){f.annotations.redraw()})})})(a)});