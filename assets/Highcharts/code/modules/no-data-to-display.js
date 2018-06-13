(function(a){"object"===typeof module&&module.exports?module.exports=a:a(Highcharts)})(function(a){(function(q){function p(){return !!this.points.length}function m(){this.hasData()?this.hideNoData():this.showNoData()}var j=q.seriesTypes,o=q.Chart.prototype,n=q.getOptions(),i=q.extend,b=q.each;i(n.lang,{noData:"No data to display"});n.noData={position:{x:0,y:0,align:"center",verticalAlign:"middle"}};n.noData.style={fontWeight:"bold",fontSize:"12px",color:"#666666"};b(["pie","gauge","waterfall","bubble","treemap"],function(c){j[c]&&(j[c].prototype.hasData=p)});q.Series.prototype.hasData=function(){return this.visible&&void 0!==this.dataMax&&void 0!==this.dataMin};o.showNoData=function(d){var c=this.options;d=d||c.lang.noData;c=c.noData;this.noDataLabel||(this.noDataLabel=this.renderer.label(d,0,0,null,null,null,c.useHTML,null,"no-data"),this.noDataLabel.attr(c.attr).css(c.style),this.noDataLabel.add(),this.noDataLabel.align(i(this.noDataLabel.getBBox(),c.position),!1,"plotBox"))};o.hideNoData=function(){this.noDataLabel&&(this.noDataLabel=this.noDataLabel.destroy())};o.hasData=function(){for(var d=this.series,c=d.length;c--;){if(d[c].hasData()&&!d[c].options.isInternal){return !0}}return !1};o.callbacks.push(function(c){q.addEvent(c,"load",m);q.addEvent(c,"redraw",m)})})(a)});