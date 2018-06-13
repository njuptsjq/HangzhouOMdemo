(function(a){if(typeof module==="object"&&module.exports){module.exports=a}else{a(Highcharts)}}(function(a){(function(m){var h=m.Axis,f=m.Chart,e=m.color,d,l=m.each,j=m.extend,o=m.isNumber,b=m.Legend,i=m.LegendSymbolMixin,n=m.noop,k=m.merge,g=m.pick,c=m.wrap;d=m.ColorAxis=function(){this.init.apply(this,arguments)};j(d.prototype,h.prototype);j(d.prototype,{defaultColorAxisOptions:{lineWidth:0,minPadding:0,maxPadding:0,gridLineWidth:1,tickPixelInterval:72,startOnTick:true,endOnTick:true,offset:0,marker:{animation:{duration:50},width:0.01,color:"#999999"},labels:{overflow:"justify"},minColor:"#e6ebf5",maxColor:"#003399",tickLength:5,showInLegend:true},keepProps:["legendGroup","legendItem","legendSymbol"].concat(h.prototype.keepProps),init:function(q,r){var s=q.options.legend.layout!=="vertical",p;this.coll="colorAxis";p=k(this.defaultColorAxisOptions,{side:s?2:1,reversed:!s},r,{opposite:!s,showEmpty:false,title:null});h.prototype.init.call(this,q,p);if(r.dataClasses){this.initDataClasses(r)}this.initStops(r);this.horiz=s;this.zoomEnabled=false;this.defaultLegendLength=200},tweenColors:function(t,s,r){var q,p;if(!s.rgba.length||!t.rgba.length){p=s.input||"none"}else{t=t.rgba;s=s.rgba;q=(s[3]!==1||t[3]!==1);p=(q?"rgba(":"rgb(")+Math.round(s[0]+(t[0]-s[0])*(1-r))+","+Math.round(s[1]+(t[1]-s[1])*(1-r))+","+Math.round(s[2]+(t[2]-s[2])*(1-r))+(q?(","+(s[3]+(t[3]-s[3])*(1-r))):"")+")"}return p},initDataClasses:function(w){var u=this,t=this.chart,q,v=0,r=t.options.chart.colorCount,s=this.options,p=w.dataClasses.length;this.dataClasses=q=[];this.legendItems=[];l(w.dataClasses,function(z,y){var x;z=k(z);q.push(z);if(!z.color){if(s.dataClassColor==="category"){x=t.options.colors;r=x.length;z.color=x[v];z.colorIndex=v;v++;if(v===r){v=0}}else{z.color=u.tweenColors(e(s.minColor),e(s.maxColor),p<2?0.5:y/(p-1))}}})},initStops:function(p){this.stops=p.stops||[[0,this.options.minColor],[1,this.options.maxColor]];l(this.stops,function(q){q.color=e(q[1])})},setOptions:function(p){h.prototype.setOptions.call(this,p);this.options.crosshair=this.options.marker},setAxisSize:function(){var u=this.legendSymbol,t=this.chart,r=t.options.legend||{},q,v,s,p;if(u){this.left=q=u.attr("x");this.top=v=u.attr("y");this.width=s=u.attr("width");this.height=p=u.attr("height");this.right=t.chartWidth-q-s;this.bottom=t.chartHeight-v-p;this.len=this.horiz?s:p;this.pos=this.horiz?q:v}else{this.len=(this.horiz?r.symbolWidth:r.symbolHeight)||this.defaultLegendLength}},toColor:function(w,x){var t,y=this.stops,u,v,q,p=this.dataClasses,s,r;if(p){r=p.length;while(r--){s=p[r];u=s.from;v=s.to;if((u===undefined||w>=u)&&(v===undefined||w<=v)){q=s.color;if(x){x.dataClass=r;x.colorIndex=s.colorIndex}break}}}else{if(this.isLog){w=this.val2lin(w)}t=1-((this.max-w)/((this.max-this.min)||1));r=y.length;while(r--){if(t>y[r][0]){break}}u=y[r]||y[r+1];v=y[r+1]||u;t=1-(v[0]-t)/((v[0]-u[0])||1);q=this.tweenColors(u.color,v.color,t)}return q},getOffset:function(){var q=this.legendGroup,p=this.chart.axisOffset[this.side];if(q){this.axisParent=q;h.prototype.getOffset.call(this);if(!this.added){this.added=true;this.labelLeft=0;this.labelRight=this.width}this.chart.axisOffset[this.side]=p}},setLegendColor:function(){var u,t=this.horiz,p=this.options,s=this.reversed,q=s?1:0,r=s?0:1;u=t?[q,0,r,0]:[0,r,0,q];this.legendColor={linearGradient:{x1:u[0],y1:u[1],x2:u[2],y2:u[3]},stops:p.stops||[[0,p.minColor],[1,p.maxColor]]}},drawLegendSymbol:function(s,v){var r=s.padding,w=s.options,u=this.horiz,p=g(w.symbolWidth,u?this.defaultLegendLength:12),t=g(w.symbolHeight,u?12:this.defaultLegendLength),q=g(w.labelPadding,u?16:30),x=g(w.itemDistance,10);this.setLegendColor();v.legendSymbol=this.chart.renderer.rect(0,s.baseline-11,p,t).attr({zIndex:1}).add(v.legendGroup);this.legendItemWidth=p+r+(u?x:q);this.legendItemHeight=t+r+(u?q:0)},setState:n,visible:true,setVisible:n,getSeriesExtremes:function(){var p;if(this.series.length){p=this.series[0];this.dataMin=p.valueMin;this.dataMax=p.valueMax}},drawCrosshair:function(u,p){var r=p&&p.plotX,q=p&&p.plotY,v,s=this.pos,t=this.len;if(p){v=this.toPixels(p[p.series.colorKey]);if(v<s){v=s-2}else{if(v>s+t){v=s+t+2}}p.plotX=v;p.plotY=this.len-v;h.prototype.drawCrosshair.call(this,u,p);p.plotX=r;p.plotY=q;if(this.cross){this.cross.addClass("highcharts-coloraxis-marker").add(this.legendGroup);this.cross.attr({fill:this.crosshair.color})}}},getPlotLinePath:function(q,p,t,r,s){return o(s)?(this.horiz?["M",s-4,this.top-6,"L",s+4,this.top-6,s,this.top,"Z"]:["M",this.left,s,"L",this.left-6,s+6,this.left-6,s-6,"Z"]):h.prototype.getPlotLinePath.call(this,q,p,t,r)},update:function(r,s){var q=this.chart,p=q.legend;l(this.series,function(t){t.isDirtyData=true});if(r.dataClasses&&p.allItems){l(p.allItems,function(t){if(t.isDataClass){t.legendGroup.destroy()}});q.isDirtyLegend=true}q.options[this.coll]=k(this.userOptions,r);h.prototype.update.call(this,r,s);if(this.legendItem){this.setLegendColor();p.colorizeItem(this,true)}},getDataClassLegendSymbols:function(){var t=this,s=this.chart,r=this.legendItems,q=s.options.legend,u=q.valueDecimals,v=q.valueSuffix||"",p;if(!r.length){l(this.dataClasses,function(y,w){var x=true,A=y.from,z=y.to;p="";if(A===undefined){p="< "}else{if(z===undefined){p="> "}}if(A!==undefined){p+=m.numberFormat(A,u)+v}if(A!==undefined&&z!==undefined){p+=" - "}if(z!==undefined){p+=m.numberFormat(z,u)+v}r.push(j({chart:s,name:p,options:{},drawLegendSymbol:i.drawRectangle,visible:true,setState:n,isDataClass:true,setVisible:function(){x=this.visible=!x;l(t.series,function(B){l(B.points,function(C){if(C.dataClass===w){C.setVisible(x)}})});s.legend.colorizeItem(this,x)}},y))})}return r},name:""});l(["fill","stroke"],function(p){m.Fx.prototype[p+"Setter"]=function(){this.elem.attr(p,d.prototype.tweenColors(e(this.start),e(this.end),this.pos),null,true)}});c(f.prototype,"getAxes",function(r){var p=this.options,q=p.colorAxis;r.call(this);this.colorAxis=[];if(q){new d(this,q)}});c(b.prototype,"getAllItems",function(r){var q=[],p=this.chart.colorAxis[0];if(p&&p.options){if(p.options.showInLegend){if(p.options.dataClasses){q=q.concat(p.getDataClassLegendSymbols())}else{q.push(p)}}l(p.series,function(s){s.options.showInLegend=false})}return q.concat(r.call(this))});c(b.prototype,"colorizeItem",function(q,p,r){q.call(this,p,r);if(r&&p.legendColor){p.legendSymbol.attr({fill:p.legendColor})}})}(a));(function(c){var f=c.defined,e=c.each,d=c.noop,b=c.seriesTypes;c.colorPointMixin={isValid:function(){return this.value!==null},setVisible:function(h){var g=this,i=h?"show":"hide";e(["graphic","dataLabel"],function(j){if(g[j]){g[j][i]()}})}};c.colorSeriesMixin={pointArrayMap:["value"],axisTypes:["xAxis","yAxis","colorAxis"],optionalAxis:"colorAxis",trackerGroups:["group","markerGroup","dataLabelsGroup"],getSymbol:d,parallelArrays:["x","y","value"],colorKey:"value",pointAttribs:b.column.prototype.pointAttribs,translateColors:function(){var i=this,g=this.options.nullColor,h=this.colorAxis,j=this.colorKey;e(this.data,function(k){var m=k[j],l;l=k.options.color||(k.isNull?g:(h&&m!==undefined)?h.toColor(m,k):k.color||i.color);if(l){k.color=l}})},colorAttribs:function(g){var h={};if(f(g.color)){h[this.colorProp||"fill"]=g.color}return h}}}(a));(function(k){var g=k.colorPointMixin,b=k.colorSeriesMixin,j=k.each,f=k.LegendSymbolMixin,i=k.merge,l=k.noop,e=k.pick,h=k.Series,d=k.seriesType,c=k.seriesTypes;d("heatmap","scatter",{animation:false,borderWidth:0,nullColor:"#f7f7f7",dataLabels:{formatter:function(){return this.point.value},inside:true,verticalAlign:"middle",crop:false,overflow:false,padding:0},marker:null,pointRange:null,tooltip:{pointFormat:"{point.x}, {point.y}: {point.value}<br/>"},states:{normal:{animation:true},hover:{halo:false,brightness:0.2}}},i(b,{pointArrayMap:["y","value"],hasPointSpecificOptions:true,supportsDrilldown:true,getExtremesFromAll:true,directTouch:true,init:function(){var m;c.scatter.prototype.init.apply(this,arguments);m=this.options;m.pointRange=e(m.pointRange,m.colsize||1);this.yAxis.axisPointRange=m.rowsize||1},translate:function(){var o=this,n=o.options,q=o.xAxis,m=o.yAxis,p=function(s,t,r){return Math.min(Math.max(t,s),r)};o.generatePoints();j(o.points,function(r){var x=(n.colsize||1)/2,v=(n.rowsize||1)/2,t=p(Math.round(q.len-q.translate(r.x-x,0,1,0,1)),-q.len,2*q.len),s=p(Math.round(q.len-q.translate(r.x+x,0,1,0,1)),-q.len,2*q.len),w=p(Math.round(m.translate(r.y-v,0,1,0,1)),-m.len,2*m.len),u=p(Math.round(m.translate(r.y+v,0,1,0,1)),-m.len,2*m.len);r.plotX=r.clientX=(t+s)/2;r.plotY=(w+u)/2;r.shapeType="rect";r.shapeArgs={x:Math.min(t,s),y:Math.min(w,u),width:Math.abs(s-t),height:Math.abs(u-w)}});o.translateColors()},drawPoints:function(){c.column.prototype.drawPoints.call(this);j(this.points,function(m){m.graphic.attr(this.colorAttribs(m,m.state))},this)},animate:l,getBox:l,drawLegendSymbol:f.drawRectangle,alignDataLabel:c.column.prototype.alignDataLabel,getExtremes:function(){h.prototype.getExtremes.call(this,this.valueData);this.valueMin=this.dataMin;this.valueMax=this.dataMax;h.prototype.getExtremes.call(this)}}),g)}(a))}));