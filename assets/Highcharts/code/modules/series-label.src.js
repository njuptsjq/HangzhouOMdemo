(function(a){if(typeof module==="object"&&module.exports){module.exports=a}else{a(Highcharts)}}(function(a){(function(l){var c=3,e=l.wrap,j=l.each,g=l.extend,n=l.isNumber,h=l.Series,i=l.SVGRenderer,f=l.Chart;l.setOptions({plotOptions:{series:{label:{enabled:true,connectorAllowed:true,connectorNeighbourDistance:24,styles:{fontWeight:"bold"}}}}});function m(s,u,q,t,p,r){var o=((r-u)*(q-s))-((t-u)*(p-s));return o>0?true:o<0?false:true}function b(t,v,r,u,p,s,o,q){return m(t,v,p,s,o,q)!==m(r,u,p,s,o,q)&&m(t,v,r,u,p,s)!==m(t,v,r,u,o,q)}function k(o,v,p,u,r,t,q,s){return(b(o,v,o+p,v,r,t,q,s)||b(o+p,v,o+p,v+u,r,t,q,s)||b(o,v+u,o+p,v+u,r,t,q,s)||b(o,v,o,v+u,r,t,q,s))}i.prototype.symbols.connector=function(u,t,v,s,A){var q=A&&A.anchorX,p=A&&A.anchorY,z,r,o=v/2;if(n(q)&&n(p)){z=["M",q,p];r=t-p;if(r<0){r=-s-r}if(r<v){o=q<u+(v/2)?r:v-r}if(p>t+s){z.push("L",u+o,t+s)}else{if(p<t){z.push("L",u+o,t)}else{if(q<u){z.push("L",u,t+s/2)}else{if(q>u+v){z.push("L",u+v,t+s/2)}}}}}return z||[]};h.prototype.getPointsOnGraph=function(){var p=16,z=this.points,x,r,t=[],A,F,E,D,B,v,y,C,o=this.graph||this.area,w=o.element,u=this.chart.inverted,s=u?this.yAxis.pos:this.xAxis.pos,q=u?this.xAxis.pos:this.yAxis.pos;if(this.getPointSpline&&w.getPointAtLength){if(o.toD){C=o.attr("d");o.attr({d:o.toD})}B=w.getTotalLength();for(A=0;A<B;A+=p){x=w.getPointAtLength(A);t.push({chartX:s+x.x,chartY:q+x.y,plotX:x.x,plotY:x.y})}if(C){o.attr({d:C})}x=z[z.length-1];x.chartX=s+x.plotX;x.chartY=q+x.plotY;t.push(x)}else{B=z.length;for(A=0;A<B;A+=1){x=z[A];r=z[A-1];x.chartX=s+x.plotX;x.chartY=q+x.plotY;if(A>0){F=Math.abs(x.chartX-r.chartX);E=Math.abs(x.chartY-r.chartY);D=Math.max(F,E);if(D>p){v=Math.ceil(D/p);for(y=1;y<v;y+=1){t.push({chartX:r.chartX+(x.chartX-r.chartX)*(y/v),chartY:r.chartY+(x.chartY-r.chartY)*(y/v),plotX:r.plotX+(x.plotX-r.plotX)*(y/v),plotY:r.plotY+(x.plotY-r.plotY)*(y/v)})}}}if(n(x.plotY)){t.push(x)}}}return t};h.prototype.checkClearPoint=function(u,t,r,o){var B=Number.MAX_VALUE,E=Number.MAX_VALUE,z,H,A=this.options.label.connectorAllowed,w=this.chart,v,D,q=16,G,F,C;function p(y,x){return !(x.left>y.right||x.right<y.left||x.top>y.bottom||x.bottom<y.top)}function s(x,y){return x-y}for(F=0;F<w.boxesToAvoid.length;F+=1){if(p(w.boxesToAvoid[F],{left:u,right:u+r.width,top:t,bottom:t+r.height})){return false}}for(F=0;F<w.series.length;F+=1){v=w.series[F];D=v.interpolatedPoints;if(v.visible&&D){for(C=1;C<D.length;C+=1){if(k(u,t,r.width,r.height,D[C-1].chartX,D[C-1].chartY,D[C].chartX,D[C].chartY)){return false}if(this===v&&!G&&o){G=k(u-q,t-q,r.width+2*q,r.height+2*q,D[C-1].chartX,D[C-1].chartY,D[C].chartX,D[C].chartY)}if(this!==v){B=Math.min(B,Math.pow(u+r.width/2-D[C].chartX,2)+Math.pow(t+r.height/2-D[C].chartY,2),Math.pow(u-D[C].chartX,2)+Math.pow(t-D[C].chartY,2),Math.pow(u+r.width-D[C].chartX,2)+Math.pow(t-D[C].chartY,2),Math.pow(u+r.width-D[C].chartX,2)+Math.pow(t+r.height-D[C].chartY,2),Math.pow(u-D[C].chartX,2)+Math.pow(t+r.height-D[C].chartY,2))}}if(A&&this===v&&((o&&!G)||B<Math.pow(this.options.label.connectorNeighbourDistance,2))){for(C=1;C<D.length;C+=1){z=Math.min(Math.pow(u+r.width/2-D[C].chartX,2)+Math.pow(t+r.height/2-D[C].chartY,2),Math.pow(u-D[C].chartX,2)+Math.pow(t-D[C].chartY,2),Math.pow(u+r.width-D[C].chartX,2)+Math.pow(t-D[C].chartY,2),Math.pow(u+r.width-D[C].chartX,2)+Math.pow(t+r.height-D[C].chartY,2),Math.pow(u-D[C].chartX,2)+Math.pow(t+r.height-D[C].chartY,2));if(z<E){E=z;H=D[C]}}G=true}}}return !o||G?{x:u,y:t,weight:s(B,H?E:0),connectorPoint:H}:false};f.prototype.drawSeriesLabels=function(){var p=this,o=this.labelSeries;p.boxesToAvoid=[];j(o,function(q){q.interpolatedPoints=q.getPointsOnGraph();j(q.options.label.boxesToAvoid||[],function(r){p.boxesToAvoid.push(r)})});j(p.series,function(A){var I,G,E,B=[],z,C,v,t=p.inverted,q=t?A.yAxis.pos:A.xAxis.pos,u=t?A.xAxis.pos:A.yAxis.pos,D=p.inverted?A.yAxis.len:A.xAxis.len,s=p.inverted?A.xAxis.len:A.yAxis.len,H=A.interpolatedPoints,F=A.labelBySeries;function w(J,L,K){return J>q&&J<=q+D-K.width&&L>=u&&L<=u+s-K.height}if(A.visible&&H){if(!F){A.labelBySeries=F=p.renderer.label(A.name,0,-9999,"connector").css(g({color:A.color},A.options.label.styles)).attr({padding:0,opacity:0,stroke:A.color,"stroke-width":1}).add(A.group).animate({opacity:1},{duration:200})}I=F.getBBox();I.width=Math.round(I.width);for(C=H.length-1;C>0;C-=1){G=H[C].chartX+c;E=H[C].chartY-I.height-c;if(w(G,E,I)){v=A.checkClearPoint(G,E,I)}if(v){B.push(v)}G=H[C].chartX+c;E=H[C].chartY+c;if(w(G,E,I)){v=A.checkClearPoint(G,E,I)}if(v){B.push(v)}G=H[C].chartX-I.width-c;E=H[C].chartY+c;if(w(G,E,I)){v=A.checkClearPoint(G,E,I)}if(v){B.push(v)}G=H[C].chartX-I.width-c;E=H[C].chartY-I.height-c;if(w(G,E,I)){v=A.checkClearPoint(G,E,I)}if(v){B.push(v)}}if(!B.length){for(G=q+D-I.width;G>=q;G-=16){for(E=u;E<u+s-I.height;E+=16){z=A.checkClearPoint(G,E,I,true);if(z){B.push(z)}}}}if(B.length){B.sort(function(y,x){return x.weight-y.weight});v=B[0];p.boxesToAvoid.push({left:v.x,right:v.x+I.width,top:v.y,bottom:v.y+I.height});if(Math.round(v.x)!==Math.round(F.x)||Math.round(v.y)!==Math.round(F.y)){A.labelBySeries.attr({opacity:0,x:v.x-q,y:v.y-u,anchorX:v.connectorPoint&&v.connectorPoint.plotX,anchorY:v.connectorPoint&&v.connectorPoint.plotY}).animate({opacity:1});A.options.kdNow=true;A.buildKDTree();var r=A.searchPoint({chartX:v.x,chartY:v.y},true);F.closest=[r,v.x-q-r.plotX,v.y-u-r.plotY]}}else{if(F){A.labelBySeries=F.destroy()}}}})};function d(r){var q=this,p=Math.max(l.animObject(q.renderer.globalAnimation).duration,250),o=!q.hasRendered;r.apply(q,[].slice.call(arguments,1));q.labelSeries=[];clearTimeout(q.seriesLabelTimer);j(q.series,function(u){var t=u.options.label,s=u.labelBySeries,v=s&&s.closest;if(t.enabled&&u.visible&&(u.graph||u.area)){q.labelSeries.push(u);if(o){p=Math.max(p,l.animObject(u.options.animation).duration)}if(v){if(v[0].plotX!==undefined){s.animate({x:v[0].plotX+v[1],y:v[0].plotY+v[2]})}else{s.attr({opacity:0})}}}});q.seriesLabelTimer=setTimeout(function(){q.drawSeriesLabels()},p)}e(f.prototype,"render",d);e(f.prototype,"redraw",d)}(a))}));