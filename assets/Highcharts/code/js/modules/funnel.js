(function(a){"object"===typeof module&&module.exports?module.exports=a:a(Highcharts)})(function(a){(function(g){var f=g.seriesType,e=g.seriesTypes,d=g.noop,b=g.each;f("funnel","pie",{animation:!1,center:["50%","50%"],width:"90%",neckWidth:"30%",height:"100%",neckHeight:"25%",reversed:!1,size:!0},{animate:d,translate:function(){var ae=function(h,c){return/%$/.test(h)?c*parseInt(h,10)/100:parseInt(h,10)},ad=0,ab=this.chart,ac=this.options,P=ac.reversed,F=ac.ignoreHiddenPoint,M=ab.plotWidth,ab=ab.plotHeight,T=0,U=ac.center,aa=ae(U[0],M),R=ae(U[1],ab),i=ae(ac.width,M),Y,J,X=ae(ac.height,ab),G=ae(ac.neckWidth,M),N=ae(ac.neckHeight,ab),s=R-X/2+X-N,ae=this.data,S,Q,o="left"===ac.dataLabels.position?1:0,O,W,L,K,Z,j,V;this.getWidthAt=J=function(h){var c=R-X/2;return h>s||X===N?G:G+(i-G)*(1-(h-c)/(X-N))};this.getX=function(h,c){return aa+(c?-1:1)*(J(P?2*R-h:h)/2+ac.dataLabels.distance)};this.center=[aa,R,X];this.centerX=aa;b(ae,function(c){F&&!1===c.visible||(ad+=c.y)});b(ae,function(c){V=null;Q=ad?c.y/ad:0;W=R-X/2+T*X;Z=W+Q*X;Y=J(W);O=aa-Y/2;L=O+Y;Y=J(Z);K=aa-Y/2;j=K+Y;W>s?(O=K=aa-G/2,L=j=aa+G/2):Z>s&&(V=Z,Y=J(s),K=aa-Y/2,j=K+Y,Z=s);P&&(W=2*R-W,Z=2*R-Z,V=V?2*R-V:null);S=["M",O,W,"L",L,W,j,Z];V&&S.push(j,V,K,V);S.push(K,Z,"Z");c.shapeType="path";c.shapeArgs={d:S};c.percentage=100*Q;c.plotX=aa;c.plotY=(W+(V||Z))/2;c.tooltipPos=[aa,c.plotY];c.slice=d;c.half=o;F&&!1===c.visible||(T+=Q)})},drawPoints:e.column.prototype.drawPoints,sortByAngle:function(c){c.sort(function(h,i){return h.plotY-i.plotY})},drawDataLabels:function(){var h=this.data,q=this.options.dataLabels.distance,l,m,j,o=h.length,i,k;for(this.center[2]-=2*q;o--;){j=h[o],m=(l=j.half)?1:-1,k=j.plotY,i=this.getX(k,l),j.labelPos=[0,k,i+(q-5)*m,k,i+q*m,k,l?"right":"left",0]}e.pie.prototype.drawDataLabels.call(this)}});f("pyramid","funnel",{neckWidth:"0%",neckHeight:"0%",reversed:!0})})(a)});