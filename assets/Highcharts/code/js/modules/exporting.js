(function(a){"object"===typeof module&&module.exports?module.exports=a:a(Highcharts)})(function(a){(function(h){var g=h.defaultOptions,r=h.doc,e=h.Chart,k=h.addEvent,p=h.removeEvent,E=h.fireEvent,n=h.createElement,d=h.discardElement,q=h.css,o=h.merge,c=h.pick,s=h.each,j=h.extend,i=h.win,b=h.SVGRenderer,m=h.Renderer.prototype.symbols;j(g.lang,{printChart:"Print chart",downloadPNG:"Download PNG image",downloadJPEG:"Download JPEG image",downloadPDF:"Download PDF document",downloadSVG:"Download SVG vector image",contextButtonTitle:"Chart context menu"});g.navigation={buttonOptions:{theme:{},symbolSize:14,symbolX:12.5,symbolY:10.5,align:"right",buttonSpacing:3,height:22,verticalAlign:"top",width:24}};g.exporting={type:"image/png",url:"https://export.highcharts.com/",printMaxWidth:780,scale:2,buttons:{contextButton:{className:"highcharts-contextbutton",menuClassName:"highcharts-contextmenu",symbol:"menu",_titleKey:"contextButtonTitle",menuItems:[{textKey:"printChart",onclick:function(){this.print()}},{separator:!0},{textKey:"downloadPNG",onclick:function(){this.exportChart()}},{textKey:"downloadJPEG",onclick:function(){this.exportChart({type:"image/jpeg"})}},{textKey:"downloadPDF",onclick:function(){this.exportChart({type:"application/pdf"})}},{textKey:"downloadSVG",onclick:function(){this.exportChart({type:"image/svg+xml"})}}]}}};h.post=function(l,f,u){var t;l=n("form",o({method:"post",action:l,enctype:"multipart/form-data"},u),{display:"none"},r.body);for(t in f){n("input",{type:"hidden",name:t,value:f[t]},null,l)}l.submit();d(l)};j(e.prototype,{sanitizeSVG:function(l,f){if(f&&f.exporting&&f.exporting.allowHTML){var t=l.match(/<\/svg>(.*?$)/);t&&(t='\x3cforeignObject x\x3d"0" y\x3d"0" width\x3d"'+f.chart.width+'" height\x3d"'+f.chart.height+'"\x3e\x3cbody xmlns\x3d"http://www.w3.org/1999/xhtml"\x3e'+t[1]+"\x3c/body\x3e\x3c/foreignObject\x3e",l=l.replace("\x3c/svg\x3e",t+"\x3c/svg\x3e"))}return l=l.replace(/zIndex="[^"]+"/g,"").replace(/isShadow="[^"]+"/g,"").replace(/symbolName="[^"]+"/g,"").replace(/jQuery[0-9]+="[^"]+"/g,"").replace(/url\(("|&quot;)(\S+)("|&quot;)\)/g,"url($2)").replace(/url\([^#]+#/g,"url(#").replace(/<svg /,'\x3csvg xmlns:xlink\x3d"http://www.w3.org/1999/xlink" ').replace(/ (NS[0-9]+\:)?href=/g," xlink:href\x3d").replace(/\n/," ").replace(/<\/svg>.*?$/,"\x3c/svg\x3e").replace(/(fill|stroke)="rgba\(([ 0-9]+,[ 0-9]+,[ 0-9]+),([ 0-9\.]+)\)"/g,'$1\x3d"rgb($2)" $1-opacity\x3d"$3"').replace(/&nbsp;/g,"\u00a0").replace(/&shy;/g,"\u00ad")},getChartHTML:function(){this.inlineStyles();return this.container.innerHTML},getSVG:function(t){var l=this,y,w,f,v,u,x=o(l.options,t);r.createElementNS||(r.createElementNS=function(A,z){return r.createElement(z)});w=n("div",null,{position:"absolute",top:"-9999em",width:l.chartWidth+"px",height:l.chartHeight+"px"},r.body);f=l.renderTo.style.width;u=l.renderTo.style.height;f=x.exporting.sourceWidth||x.chart.width||/px$/.test(f)&&parseInt(f,10)||600;u=x.exporting.sourceHeight||x.chart.height||/px$/.test(u)&&parseInt(u,10)||400;j(x.chart,{animation:!1,renderTo:w,forExport:!0,renderer:"SVGRenderer",width:f,height:u});x.exporting.enabled=!1;delete x.data;x.series=[];s(l.series,function(z){v=o(z.userOptions,{animation:!1,enableMouseTracking:!1,showCheckbox:!1,visible:z.visible});v.isInternal||x.series.push(v)});y=new h.Chart(x,l.callback);t&&s(["xAxis","yAxis","series"],function(z){var A={};t[z]&&(A[z]=t[z],y.update(A))});s(["xAxis","yAxis"],function(z){s(l[z],function(A,B){B=y[z][B];var C=A.getExtremes();A=C.userMin;C=C.userMax;!B||void 0===A&&void 0===C||B.setExtremes(A,C,!0,!1)})});f=y.getChartHTML();f=l.sanitizeSVG(f,x);x=null;y.destroy();d(w);return f},getSVGForExport:function(l,f){var t=this.options.exporting;return this.getSVG(o({chart:{borderRadius:0}},t.chartOptions,f,{exporting:{sourceWidth:l&&l.sourceWidth||t.sourceWidth,sourceHeight:l&&l.sourceHeight||t.sourceHeight}}))},exportChart:function(l,f){f=this.getSVGForExport(l,f);l=o(this.options.exporting,l);h.post(l.url,{filename:l.filename||"chart",type:l.type,width:l.width||0,scale:l.scale,svg:f},l.formAttributes)},print:function(){var A=this,z=A.container,y=[],w=z.parentNode,t=r.body,v=t.childNodes,u=A.options.exporting.printMaxWidth,x,l;if(!A.isPrinting){A.isPrinting=!0;A.pointer.reset(null,0);E(A,"beforePrint");if(l=u&&A.chartWidth>u){x=[A.options.chart.width,void 0,!1],A.setSize(u,void 0,!1)}s(v,function(B,f){1===B.nodeType&&(y[f]=B.style.display,B.style.display="none")});t.appendChild(z);i.focus();i.print();setTimeout(function(){w.appendChild(z);s(v,function(B,f){1===B.nodeType&&(B.style.display=y[f])});A.isPrinting=!1;l&&A.setSize.apply(A,x);E(A,"afterPrint")},1000)}},contextMenu:function(I,H,G,D,x,C,A){var F=this,v=F.chartWidth,B=F.chartHeight,z="cache-"+I,w=F[z],u=Math.max(x,C),t,y;w||(F[z]=w=n("div",{className:I},{position:"absolute",zIndex:1000,padding:u+"px"},F.container),t=n("div",{className:"highcharts-menu"},null,w),y=function(){q(w,{display:"none"});A&&A.setState(0);F.openMenu=!1},k(w,"mouseleave",function(){w.hideTimer=setTimeout(y,500)}),k(w,"mouseenter",function(){clearTimeout(w.hideTimer)}),z=k(r,"mouseup",function(f){F.pointer.inClass(f.target,I)||y()}),k(F,"destroy",z),s(H,function(l){if(l){var f;f=l.separator?n("hr",null,null,t):n("div",{className:"highcharts-menu-item",onclick:function(J){J&&J.stopPropagation();y();l.onclick&&l.onclick.apply(F,arguments)},innerHTML:l.text||F.options.lang[l.textKey]},null,t);F.exportDivElements.push(f)}}),F.exportDivElements.push(t,w),F.exportMenuWidth=w.offsetWidth,F.exportMenuHeight=w.offsetHeight);H={display:"block"};G+F.exportMenuWidth>v?H.right=v-G-x-u+"px":H.left=G-u+"px";D+C+F.exportMenuHeight>B&&"top"!==A.alignOptions.verticalAlign?H.bottom=B-D-u+"px":H.top=D+C-u+"px";q(w,H);F.openMenu=!0},addButton:function(G){var F=this,D=F.renderer,B=o(F.options.navigation.buttonOptions,G),A=B.onclick,w=B.menuItems,y,C,u=B.symbolSize||12;F.btnCount||(F.btnCount=0);F.exportDivElements||(F.exportDivElements=[],F.exportSVGElements=[]);if(!1!==B.enabled){var z=B.theme,x=z.states,v=x&&x.hover,x=x&&x.select,t;delete z.states;A?t=function(f){f.stopPropagation();A.call(F,f)}:w&&(t=function(){F.contextMenu(C.menuClassName,w,C.translateX,C.translateY,C.width,C.height,C);C.setState(2)});B.text&&B.symbol?z.paddingLeft=c(z.paddingLeft,25):B.text||j(z,{width:B.width,height:B.height,padding:0});C=D.button(B.text,0,0,t,z,v,x).addClass(G.className).attr({title:F.options.lang[B._titleKey],zIndex:3});C.menuClassName=G.menuClassName||"highcharts-menu-"+F.btnCount++;B.symbol&&(y=D.symbol(B.symbol,B.symbolX-u/2,B.symbolY-u/2,u,u).addClass("highcharts-button-symbol").attr({zIndex:1}).add(C));C.add().align(j(B,{width:C.width,x:c(B.x,F.buttonOffset)}),!0,"spacingBox");F.buttonOffset+=(C.width+B.buttonSpacing)*("right"===B.align?-1:1);F.exportSVGElements.push(C,y)}},destroyExport:function(l){var f=l?l.target:this;l=f.exportSVGElements;var t=f.exportDivElements;l&&(s(l,function(u,v){u&&(u.onclick=u.ontouchstart=null,f.exportSVGElements[v]=u.destroy())}),l.length=0);t&&(s(t,function(u,v){clearTimeout(u.hideTimer);p(u,"mouseleave");f.exportDivElements[v]=u.onmouseout=u.onmouseover=u.ontouchstart=u.onclick=null;d(u)}),t.length=0)}});b.prototype.inlineToAttributes="fill stroke strokeLinecap strokeLinejoin strokeWidth textAnchor x y".split(" ");b.prototype.inlineBlacklist=[/-/,/^(clipPath|cssText|d|height|width)$/,/^font$/,/[lL]ogical(Width|Height)$/,/perspective/,/TapHighlightColor/,/^transition/];b.prototype.unstyledElements=["clipPath","defs","desc"];e.prototype.inlineStyles=function(){function v(l){return l.replace(/([A-Z])/g,function(B,A){return"-"+A.toLowerCase()})}function t(G){var B,l,F,C="",A,D;if(1===G.nodeType&&-1===u.indexOf(G.nodeName)){l=i.getComputedStyle(G,null);F="svg"===G.nodeName?{}:i.getComputedStyle(G.parentNode,null);w[G.nodeName]||(y||(y=r.createElementNS(h.SVG_NS,"svg"),y.setAttribute("version","1.1"),r.body.appendChild(y)),A=r.createElementNS(G.namespaceURI,G.nodeName),y.appendChild(A),w[G.nodeName]=o(i.getComputedStyle(A,null)),y.removeChild(A));for(B in l){A=!1;for(D=f.length;D--&&!A;){A=f[D].test(B)||"function"===typeof l[B]}A||F[B]!==l[B]&&w[G.nodeName][B]!==l[B]&&(-1!==x.indexOf(B)?G.setAttribute(v(B),l[B]):C+=v(B)+":"+l[B]+";")}C&&(B=G.getAttribute("style"),G.setAttribute("style",(B?B+";":"")+C));"text"!==G.nodeName&&s(G.children||G.childNodes,t)}}var z=this.renderer,x=z.inlineToAttributes,f=z.inlineBlacklist,u=z.unstyledElements,w={},y;t(this.container.querySelector("svg"));y.parentNode.removeChild(y)};m.menu=function(l,f,u,t){return["M",l,f+2.5,"L",l+u,f+2.5,"M",l,f+t/2+0.5,"L",l+u,f+t/2+0.5,"M",l,f+t-1.5,"L",l+u,f+t-1.5]};e.prototype.renderExporting=function(){var l,f=this.options.exporting,u=f.buttons,t=this.isDirtyExporting||!this.exportSVGElements;this.buttonOffset=0;this.isDirtyExporting&&this.destroyExport();if(t&&!1!==f.enabled){for(l in u){this.addButton(u[l])}this.isDirtyExporting=!1}k(this,"destroy",this.destroyExport)};e.prototype.callbacks.push(function(f){f.renderExporting();k(f,"redraw",f.renderExporting);s(["exporting","navigation"],function(l){f[l]={update:function(u,t){f.isDirtyExporting=!0;o(!0,f.options[l],u);c(t,!0)&&f.redraw()}}})})})(a)});