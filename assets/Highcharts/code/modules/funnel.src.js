(function(a){if(typeof module==="object"&&module.exports){module.exports=a}else{a(Highcharts)}}(function(a){(function(d){var b=d.seriesType,c=d.seriesTypes,e=d.noop,f=d.each;b("funnel","pie",{animation:false,center:["50%","50%"],width:"90%",neckWidth:"30%",height:"100%",neckHeight:"25%",reversed:false,size:true,dataLabels:{connectorWidth:1},states:{select:{color:"#cccccc",borderColor:"#000000",shadow:false}}},{animate:e,translate:function(){var j=function(M,L){return(/%$/).test(M)?L*parseInt(M,10)/100:parseInt(M,10)},l=0,u=this,x=u.chart,o=u.options,k=o.reversed,g=o.ignoreHiddenPoint,r=x.plotWidth,F=x.plotHeight,A=0,J=o.center,t=j(J[0],r),s=j(J[1],F),B=j(o.width,r),I,w,y=j(o.height,F),v=j(o.neckWidth,r),n=j(o.neckHeight,F),p=(s-y/2)+y-n,K=u.data,z,q,D=o.dataLabels.position==="left"?1:0,H,m,G,E,i,C,h;u.getWidthAt=w=function(M){var L=(s-y/2);return M>p||y===n?v:v+(B-v)*(1-(M-L)/(y-n))};u.getX=function(M,L){return t+(L?-1:1)*((w(k?2*s-M:M)/2)+o.dataLabels.distance)};u.center=[t,s,y];u.centerX=t;f(K,function(L){if(!g||L.visible!==false){l+=L.y}});f(K,function(L){h=null;q=l?L.y/l:0;m=s-y/2+A*y;i=m+q*y;I=w(m);H=t-I/2;G=H+I;I=w(i);E=t-I/2;C=E+I;if(m>p){H=E=t-v/2;G=C=t+v/2}else{if(i>p){h=i;I=w(p);E=t-I/2;C=E+I;i=p}}if(k){m=2*s-m;i=2*s-i;h=(h?2*s-h:null)}z=["M",H,m,"L",G,m,C,i];if(h){z.push(C,h,E,h)}z.push(E,i,"Z");L.shapeType="path";L.shapeArgs={d:z};L.percentage=q*100;L.plotX=t;L.plotY=(m+(h||i))/2;L.tooltipPos=[t,L.plotY];L.slice=e;L.half=D;if(!g||L.visible!==false){A+=q}})},drawPoints:c.column.prototype.drawPoints,sortByAngle:function(g){g.sort(function(i,h){return i.plotY-h.plotY})},drawDataLabels:function(){var m=this.data,n=this.options.dataLabels.distance,l,j,h,k=m.length,g,o;this.center[2]-=2*n;while(k--){h=m[k];l=h.half;j=l?1:-1;o=h.plotY;g=this.getX(o,l);h.labelPos=[0,o,g+(n-5)*j,o,g+n*j,o,l?"right":"left",0]}c.pie.prototype.drawDataLabels.call(this)}});b("pyramid","funnel",{neckWidth:"0%",neckHeight:"0%",reversed:true})}(a))}));