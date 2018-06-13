(function(a){"object"===typeof module&&module.exports?module.exports=a:a(Highcharts)})(function(a){(function(M){function K(l,f,n){var p;f.rgba.length&&l.rgba.length?(l=l.rgba,f=f.rgba,p=1!==f[3]||1!==l[3],l=(p?"rgba(":"rgb(")+Math.round(f[0]+(l[0]-f[0])*(1-n))+","+Math.round(f[1]+(l[1]-f[1])*(1-n))+","+Math.round(f[2]+(l[2]-f[2])*(1-n))+(p?","+(f[3]+(l[3]-f[3])*(1-n)):"")+")"):l=f.input||"none";return l}var s=M.noop,i=M.color,g=M.defaultOptions,L=M.each,J=M.extend,e=M.format,c=M.pick,d=M.wrap,I=M.Chart,m=M.seriesTypes,o=m.pie,u=m.column,k=M.Tick,b=M.fireEvent,j=M.inArray,h=1;L(["fill","stroke"],function(f){M.Fx.prototype[f+"Setter"]=function(){this.elem.attr(f,K(i(this.start),i(this.end),this.pos),null,!0)}});J(g.lang,{drillUpText:"\u25c1 Back to {series.name}"});g.drilldown={animation:{duration:500},drillUpButton:{position:{align:"right",x:-10,y:10}}};M.SVGRenderer.prototype.Element.prototype.fadeIn=function(f){this.attr({opacity:0.1,visibility:"inherit"}).animate({opacity:c(this.newOpacity,1)},f||{duration:250})};I.prototype.addSeriesAsDrilldown=function(l,f){this.addSingleSeriesAsDrilldown(l,f);this.applyDrilldown()};I.prototype.addSingleSeriesAsDrilldown=function(x,w){var t=x.series,v=t.xAxis,r=t.yAxis,p,q=[],n=[],y,l,f;f={colorIndex:c(x.colorIndex,t.colorIndex)};this.drilldownLevels||(this.drilldownLevels=[]);y=t.options._levelNumber||0;(l=this.drilldownLevels[this.drilldownLevels.length-1])&&l.levelNumber!==y&&(l=void 0);w=J(J({_ddSeriesId:h++},f),w);p=j(x,t.points);L(t.chart.series,function(z){z.xAxis!==v||z.isDrilling||(z.options._ddSeriesId=z.options._ddSeriesId||h++,z.options._colorIndex=z.userOptions._colorIndex,z.options._levelNumber=z.options._levelNumber||y,l?(q=l.levelSeries,n=l.levelSeriesOptions):(q.push(z),n.push(z.options)))});x=J({levelNumber:y,seriesOptions:t.options,levelSeriesOptions:n,levelSeries:q,shapeArgs:x.shapeArgs,bBox:x.graphic?x.graphic.getBBox():{},color:x.isNull?(new M.Color(i)).setOpacity(0).get():i,lowerSeriesOptions:w,pointOptions:t.options.data[p],pointIndex:p,oldExtremes:{xMin:v&&v.userMin,xMax:v&&v.userMax,yMin:r&&r.userMin,yMax:r&&r.userMax}},f);this.drilldownLevels.push(x);w=x.lowerSeries=this.addSeries(w,!1);w.options._levelNumber=y+1;v&&(v.oldPos=v.pos,v.userMin=v.userMax=null,r.userMin=r.userMax=null);t.type===w.type&&(w.animate=w.animateDrilldown||s,w.options.animation=!0)};I.prototype.applyDrilldown=function(){var l=this.drilldownLevels,f;l&&0<l.length&&(f=l[l.length-1].levelNumber,L(this.drilldownLevels,function(n){n.levelNumber===f&&L(n.levelSeries,function(p){p.options&&p.options._levelNumber===f&&p.remove(!1)})}));this.redraw();this.showDrillUpButton()};I.prototype.getDrilldownBackText=function(){var f=this.drilldownLevels;if(f&&0<f.length){return f=f[f.length-1],f.series=f.seriesOptions,e(this.options.lang.drillUpText,f)}};I.prototype.showDrillUpButton=function(){var l=this,f=this.getDrilldownBackText(),p=l.options.drilldown.drillUpButton,q,n;this.drillUpButton?this.drillUpButton.attr({text:f}).align():(n=(q=p.theme)&&q.states,this.drillUpButton=this.renderer.button(f,null,null,function(){l.drillUp()},q,n&&n.hover,n&&n.select).addClass("highcharts-drillup-button").attr({align:p.position.align,zIndex:7}).add().align(p.position,!1,p.relativeTo||"plotBox"))};I.prototype.drillUp=function(){for(var y=this,x=y.drilldownLevels,v=x[x.length-1].levelNumber,w=x.length,t=y.series,p,q,n,r,l=function(z){var f;L(t,function(B){B.options._ddSeriesId===z._ddSeriesId&&(f=B)});f=f||y.addSeries(z,!1);f.type===n.type&&f.animateDrillupTo&&(f.animate=f.animateDrillupTo);z===q.seriesOptions&&(r=f)};w--;){if(q=x[w],q.levelNumber===v){x.pop();n=q.lowerSeries;if(!n.chart){for(p=t.length;p--;){if(t[p].options.id===q.lowerSeriesOptions.id&&t[p].options._levelNumber===v+1){n=t[p];break}}}n.xData=[];L(q.levelSeriesOptions,l);b(y,"drillup",{seriesOptions:q.seriesOptions});r.type===n.type&&(r.drilldownLevel=q,r.options.animation=y.options.drilldown.animation,n.animateDrillupFrom&&n.chart&&n.animateDrillupFrom(q));r.options._levelNumber=v;n.remove(!1);r.xAxis&&(p=q.oldExtremes,r.xAxis.setExtremes(p.xMin,p.xMax,!1),r.yAxis.setExtremes(p.yMin,p.yMax,!1))}}b(y,"drillupall");this.redraw();0===this.drilldownLevels.length?this.drillUpButton=this.drillUpButton.destroy():this.drillUpButton.attr({text:this.getDrilldownBackText()}).align();this.ddDupes.length=[]};u.prototype.supportsDrilldown=!0;u.prototype.animateDrillupTo=function(l){if(!l){var f=this,n=f.drilldownLevel;L(this.points,function(p){p.graphic&&p.graphic.hide();p.dataLabel&&p.dataLabel.hide();p.connector&&p.connector.hide()});setTimeout(function(){f.points&&L(f.points,function(q,p){p=p===(n&&n.pointIndex)?"show":"fadeIn";var r="show"===p?!0:void 0;if(q.graphic){q.graphic[p](r)}if(q.dataLabel){q.dataLabel[p](r)}if(q.connector){q.connector[p](r)}})},Math.max(this.chart.options.drilldown.animation.duration-50,0));this.animate=s}};u.prototype.animateDrilldown=function(l){var f=this,q=this.chart.drilldownLevels,r,p=this.chart.options.drilldown.animation,n=this.xAxis;l||(L(q,function(t){f.options._ddSeriesId===t.lowerSeriesOptions._ddSeriesId&&(r=t.shapeArgs)}),r.x+=c(n.oldPos,n.pos)-n.pos,L(this.points,function(t){t.graphic&&t.graphic.attr(r).animate(J(t.shapeArgs,{fill:t.color||f.color}),p);t.dataLabel&&t.dataLabel.fadeIn(p)}),this.animate=null)};u.prototype.animateDrillupFrom=function(l){var f=this.chart.options.drilldown.animation,n=this.group,p=this;L(p.trackerGroups,function(q){if(p[q]){p[q].on("mouseover")}});delete this.group;L(this.points,function(v){var t=v.graphic,r=l.shapeArgs,q=function(){t.destroy();n&&(n=n.destroy())};t&&(delete v.graphic,f?t.animate(r,M.merge(f,{complete:q})):(t.attr(r),q()))})};o&&J(o.prototype,{supportsDrilldown:!0,animateDrillupTo:u.prototype.animateDrillupTo,animateDrillupFrom:u.prototype.animateDrillupFrom,animateDrilldown:function(l){var f=this.chart.options.drilldown.animation,p=this.chart.drilldownLevels[this.chart.drilldownLevels.length-1].shapeArgs,q=p.start,n=(p.end-q)/this.points.length;l||(L(this.points,function(r,v){var t=r.shapeArgs;if(r.graphic){r.graphic.attr(M.merge(p,{start:q+v*n,end:q+(v+1)*n}))[f?"animate":"attr"](t,f)}}),this.animate=null)}});M.Point.prototype.doDrilldown=function(n,l,t){var v=this.series.chart,r=v.options.drilldown,q=(r.series||[]).length,p;v.ddDupes||(v.ddDupes=[]);for(;q--&&!p;){r.series[q].id===this.drilldown&&-1===j(this.drilldown,v.ddDupes)&&(p=r.series[q],v.ddDupes.push(this.drilldown))}b(v,"drilldown",{point:this,seriesOptions:p,category:l,originalEvent:t,points:void 0!==l&&this.series.xAxis.getDDPoints(l).slice(0)},function(f){var x=f.point.series&&f.point.series.chart,w=f.seriesOptions;x&&w&&(n?x.addSingleSeriesAsDrilldown(f.point,w):x.addSeriesAsDrilldown(f.point,w))})};M.Axis.prototype.drilldownCategory=function(l,f){var p,q,n=this.getDDPoints(l);for(p in n){(q=n[p])&&q.series&&q.series.visible&&q.doDrilldown&&q.doDrilldown(!0,l,f)}this.chart.applyDrilldown()};M.Axis.prototype.getDDPoints=function(l){var f=[];L(this.series,function(q){var r,p=q.xData,n=q.points;for(r=0;r<p.length;r++){if(p[r]===l&&q.options.data[r]&&q.options.data[r].drilldown){f.push(n?n[r]:!0);break}}});return f};k.prototype.drillable=function(){var l=this.pos,f=this.label,p=this.axis,q="xAxis"===p.coll&&p.getDDPoints,n=q&&p.getDDPoints(l);q&&(f&&n.length?(f.drillable=!0,f.addClass("highcharts-drilldown-axis-label").on("click",function(r){p.drilldownCategory(l,r)})):f&&f.drillable&&(f.on("click",null),f.removeClass("highcharts-drilldown-axis-label")))};d(k.prototype,"addLabel",function(f){f.call(this);this.drillable()});d(M.Point.prototype,"init",function(l,f,p,q){var n=l.call(this,f,p,q);q=(l=f.xAxis)&&l.ticks[q];n.drilldown&&M.addEvent(n,"click",function(r){f.xAxis&&!1===f.chart.options.drilldown.allowPointDrilldown?f.xAxis.drilldownCategory(n.x,r):n.doDrilldown(void 0,void 0,r)});q&&q.drillable();return n});d(M.Series.prototype,"drawDataLabels",function(l){var f=this.chart.options.drilldown.activeDataLabelStyle,n=this.chart.renderer;l.call(this);L(this.points,function(p){p.drilldown&&p.dataLabel&&("contrast"===f.color&&n.getContrast(p.color||this.color),p.dataLabel.addClass("highcharts-drilldown-data-label"))},this)});var A,g=function(f){f.call(this);L(this.points,function(l){l.drilldown&&l.graphic&&l.graphic.addClass("highcharts-drilldown-point")})};for(A in m){m[A].prototype.supportsDrilldown&&d(m[A].prototype,"drawTracker",g)}})(a)});