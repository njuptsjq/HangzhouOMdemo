(function(a){var N;var p;var J=2/3;var w=function(R){var Z=R.pathSegList;if(Z){return Z}Z=[];var U=R.getAttribute("d");var Y=/([a-df-zA-DF-Z])([^a-df-zA-DF-Z]*)/g,T;while(T=Y.exec(U)){var X=E(T[2]);var W=T[1];var Q="zZ".indexOf(W)>=0?0:"hHvV".indexOf(W)>=0?1:"mMlLtT".indexOf(W)>=0?2:"sSqQ".indexOf(W)>=0?4:"cC".indexOf(W)>=0?6:-1;var S=0;do{var V={pathSegTypeAsLetter:W};switch(W){case"h":case"H":V.x=X[S];break;case"v":case"V":V.y=X[S];break;case"c":case"C":V.x1=X[S+Q-6];V.y1=X[S+Q-5];case"s":case"S":V.x2=X[S+Q-4];V.y2=X[S+Q-3];case"t":case"T":case"l":case"L":case"m":case"M":V.x=X[S+Q-2];V.y=X[S+Q-1];break;case"q":case"Q":V.x1=X[S];V.y1=X[S+1];V.x=X[S+2];V.y=X[S+3];break}Z.push(V);S+=Q}while(S<X.length)}Z.getItem=function(aa){return this[aa]};Z.numberOfItems=Z.length;return Z};var D=function(R,Q,S){S=S||Q;return R.getAttribute(Q)||R.style[S]};var F=function(Q,R){return R.split(",").indexOf(Q.tagName.toLowerCase())>=0};var M=function(U,T){var S=[];for(var R=0;R<U.childNodes.length;R++){var Q=U.childNodes[R];if(Q.nodeName.charAt(0)!=="#"){S.push(Q)}}for(R=0;R<S.length;R++){T(R,S[R])}};var n=function(R,Q){return Math.atan2(Q[1]-R[1],Q[0]-R[0])};var u=function(T,S){var R=S[0]-T[0];var Q=S[1]-T[1];return[T[0]+2*R,T[1]+2*Q]};var C=function(R,Q){return[J*(Q[0]-R[0])+R[0],J*(Q[1]-R[1])+R[1]]};var H=function(Q,W,U,T,S){var R=U.getItem(Q-1);var V;if(Q>0&&(R.pathSegTypeAsLetter==="C"||R.pathSegTypeAsLetter==="S")){V=u([R.x2,R.y2],W)}else{if(Q>0&&(R.pathSegTypeAsLetter==="c"||R.pathSegTypeAsLetter==="s")){V=u([R.x2+T,R.y2+S],W)}else{V=[W[0],W[1]]}}return V};var b=function(Q){this.prefix=Q;this.id=0;this.nextChild=function(){return new b("_"+this.id+++"_"+this.get())};this.get=function(){return this.prefix}};var q=function(S,Q){var R=/_\d+_/;while(!Q[S]&&R.exec(S)){S=S.replace(R,"")}return Q[S]};var k=function(Q){return Q.replace(/[\n\s\r]+/," ").trim()};var G=function(Q){var S={};for(var R in Q){if(Q.hasOwnProperty(R)){S[R]=Q[R]}}return S};var e=function(T){var Y,S,U,aa,Q,ac,W,X;var V=p.unitMatrix;if(F(T,"svg,g")){X=parseFloat(T.getAttribute("x"))||0;W=parseFloat(T.getAttribute("y"))||0;ac=T.getAttribute("viewBox");if(ac){Q=E(ac);aa=Q[2]-Q[0];U=Q[3]-Q[1];S=parseFloat(T.getAttribute("width"))||aa;Y=parseFloat(T.getAttribute("height"))||U;V=new p.Matrix(S/aa,0,0,Y/U,X-Q[0],W-Q[1])}else{V=new p.Matrix(1,0,0,1,X,W)}}else{if(F(T,"marker")){X=-parseFloat(T.getAttribute("refX"))||0;W=-parseFloat(T.getAttribute("refY"))||0;ac=T.getAttribute("viewBox");if(ac){Q=E(ac);aa=Q[2]-Q[0];U=Q[3]-Q[1];S=parseFloat(T.getAttribute("markerWidth"))||aa;Y=parseFloat(T.getAttribute("markerHeight"))||U;var ab=new p.Matrix(S/aa,0,0,Y/U,0,0);var Z=new p.Matrix(1,0,0,1,X,W);V=p.matrixMult(Z,ab)}else{V=new p.Matrix(1,0,0,1,X,W)}}}var R=T.getAttribute("transform");if(!R){return V}else{return p.matrixMult(V,j(R))}};var l=function(S){var U=E(S);var R=[];for(var T=0;T<U.length-1;T+=2){var Q=U[T];var V=U[T+1];R.push([Q,V])}return R};var j=function(Q){if(!Q){return p.unitMatrix}var ac=/^\s*matrix\(([^\)]+)\)\s*/,R=/^\s*translate\(([^\)]+)\)\s*/,X=/^\s*rotate\(([^\)]+)\)\s*/,aa=/^\s*scale\(([^\)]+)\)\s*/,ab=/^\s*skewX\(([^\)]+)\)\s*/,S=/^\s*skewY\(([^\)]+)\)\s*/;var Y=p.unitMatrix,T;while(Q.length>0){var V=ac.exec(Q);if(V){T=E(V[1]);Y=p.matrixMult(new p.Matrix(T[0],T[1],T[2],T[3],T[4],T[5]),Y);Q=Q.substr(V[0].length)}V=X.exec(Q);if(V){T=E(V[1]);var Z=Math.PI*T[0]/180;Y=p.matrixMult(new p.Matrix(Math.cos(Z),Math.sin(Z),-Math.sin(Z),Math.cos(Z),0,0),Y);if(T[1]&&T[2]){var W=new p.Matrix(1,0,0,1,T[1],T[2]);var U=new p.Matrix(1,0,0,1,-T[1],-T[2]);Y=p.matrixMult(U,p.matrixMult(Y,W))}Q=Q.substr(V[0].length)}V=R.exec(Q);if(V){T=E(V[1]);Y=p.matrixMult(new p.Matrix(1,0,0,1,T[0],T[1]||0),Y);Q=Q.substr(V[0].length)}V=aa.exec(Q);if(V){T=E(V[1]);if(!T[1]){T[1]=T[0]}Y=p.matrixMult(new p.Matrix(T[0],0,0,T[1],0,0),Y);Q=Q.substr(V[0].length)}V=ab.exec(Q);if(V){T=parseFloat(V[1]);Y=p.matrixMult(new p.Matrix(1,0,Math.tan(T),1,0,0),Y);Q=Q.substr(V[0].length)}V=S.exec(Q);if(V){T=parseFloat(V[1]);Y=p.matrixMult(new p.Matrix(1,Math.tan(T),0,1,0,0),Y);Q=Q.substr(V[0].length)}}return Y};var E=function(T){var S=[],Q,R=/[+-]?(?:(?:\d+\.?\d*)|(?:\d*\.?\d+))(?:[eE][+-]?\d+)?/g;while(Q=R.exec(T)){S.push(parseFloat(Q[0]))}return S};var h=function(Q){var S=/\s*rgba\(((?:[^,\)]*,){3}[^,\)]*)\)\s*/.exec(Q);if(S){var T=E(S[1]);var R=new N("rgb("+T.slice(0,3).join(",")+")");R.a=T[3];return R}else{return new N(Q)}};var y=function(S,R){var Q=S[0];var T=S[1];return[R.a*Q+R.c*T+R.e,R.b*Q+R.d*T+R.f]};var o=function(ae){var ai,at,ap,aq,an,ad,U,aa;var au=parseFloat;if(F(ae,"polygon")){var ah=l(ae.getAttribute("points"));at=Number.POSITIVE_INFINITY;ap=Number.POSITIVE_INFINITY;aq=Number.NEGATIVE_INFINITY;an=Number.NEGATIVE_INFINITY;for(ai=0;ai<ah.length;ai++){var af=ah[ai];at=Math.min(at,af[0]);aq=Math.max(aq,af[0]);ap=Math.min(ap,af[1]);an=Math.max(an,af[1])}aa=[at,ap,aq-at,an-ap]}else{if(F(ae,"path")){var am=w(ae);at=Number.POSITIVE_INFINITY;ap=Number.POSITIVE_INFINITY;aq=Number.NEGATIVE_INFINITY;an=Number.NEGATIVE_INFINITY;var ac=0,ab=0;var Z,Y,ar,ao;var S,R,W;for(ai=0;ai<am.numberOfItems;ai++){var al=am.getItem(ai);var ag=al.pathSegTypeAsLetter;switch(ag){case"H":ar=al.x;ao=ab;break;case"h":ar=al.x+ac;ao=ab;break;case"V":ar=ac;ao=al.y;break;case"v":ar=ac;ao=al.y+ab;break;case"C":S=[al.x1,al.y1];R=[al.x2,al.y2];W=[al.x,al.y];break;case"c":S=[al.x1+ac,al.y1+ab];R=[al.x2+ac,al.y2+ab];W=[al.x+ac,al.y+ab];break;case"S":S=H(ai,[ac,ab],am,Z,Y);R=[al.x2,al.y2];W=[al.x,al.y];break;case"s":S=H(ai,[ac,ab],am,Z,Y);R=[al.x2+ac,al.y2+ab];W=[al.x+ac,al.y+ab];break;case"Q":au=[al.x1,al.y1];S=C([ac,ab],au);R=C([al.x,al.y],au);W=[al.x,al.y];break;case"q":au=[al.x1+ac,al.y1+ab];S=C([ac,ab],au);R=C([ac+al.x,ab+al.y],au);W=[al.x+ac,al.y+ab];break;case"T":S=H(ai,[ac,ab],am,Z,Y);S=C([ac,ab],au);R=C([al.x,al.y],au);W=[al.x,al.y];break;case"t":au=H(ai,[ac,ab],am,Z,Y);S=C([ac,ab],au);R=C([ac+al.x,ab+al.y],au);W=[al.x+ac,al.y+ab];break}if("sScCqQtT".indexOf(ag)>=0){Z=ac;Y=ab}if("MLCSQT".indexOf(ag)>=0){ac=al.x;ab=al.y}else{if("mlcsqt".indexOf(ag)>=0){ac=al.x+ac;ab=al.y+ab}else{if("zZ".indexOf(ag)<0){ac=ar;ab=ao}}}if("CSQTcsqt".indexOf(ag)>=0){at=Math.min(at,ac,S[0],R[0],W[0]);aq=Math.max(aq,ac,S[0],R[0],W[0]);ap=Math.min(ap,ab,S[1],R[1],W[1]);an=Math.max(an,ab,S[1],R[1],W[1])}else{at=Math.min(at,ac);aq=Math.max(aq,ac);ap=Math.min(ap,ab);an=Math.max(an,ab)}}aa=[at,ap,aq-at,an-ap]}else{if(F(ae,"svg")){ad=ae.getAttribute("viewBox");if(ad){U=E(ad)}return[au(ae.getAttribute("x"))||(U&&U[0])||0,au(ae.getAttribute("y"))||(U&&U[1])||0,au(ae.getAttribute("width"))||(U&&U[2])||0,au(ae.getAttribute("height"))||(U&&U[3])||0]}else{if(F(ae,"g")){aa=[0,0,0,0];M(ae,function(av,ax){var aw=o(ax);aa=[Math.min(aa[0],aw[0]),Math.min(aa[1],aw[1]),Math.max(aa[0]+aa[2],aw[0]+aw[2])-Math.min(aa[0],aw[0]),Math.max(aa[1]+aa[3],aw[1]+aw[3])-Math.min(aa[1],aw[1])]})}else{if(F(ae,"marker")){ad=ae.getAttribute("viewBox");if(ad){U=E(ad)}return[(U&&U[0])||0,(U&&U[1])||0,(U&&U[2])||au(ae.getAttribute("marker-width"))||0,(U&&U[3])||au(ae.getAttribute("marker-height"))||0]}else{if(F(ae,"pattern")){return[au(ae.getAttribute("x"))||0,au(ae.getAttribute("y"))||0,au(ae.getAttribute("width"))||0,au(ae.getAttribute("height"))||0]}else{var ak=au(ae.getAttribute("x1"))||au(ae.getAttribute("x"))||au((ae.getAttribute("cx"))-au(ae.getAttribute("r")))||0;var aj=au(ae.getAttribute("x2"))||(ak+au(ae.getAttribute("width")))||(au(ae.getAttribute("cx"))+au(ae.getAttribute("r")))||0;var X=au(ae.getAttribute("y1"))||au(ae.getAttribute("y"))||(au(ae.getAttribute("cy"))-au(ae.getAttribute("r")))||0;var V=au(ae.getAttribute("y2"))||(X+au(ae.getAttribute("height")))||(au(ae.getAttribute("cy"))+au(ae.getAttribute("r")))||0;aa=[Math.min(ak,aj),Math.min(X,V),Math.max(ak,aj)-Math.min(ak,aj),Math.max(X,V)-Math.min(X,V)]}}}}}}if(!F(ae,"marker,svg,g")){var Q=D(ae,"stroke-width")||1;var T=D(ae,"stroke-miterlimit");T&&(Q*=0.5/(Math.sin(Math.PI/12)));return[aa[0]-Q,aa[1]-Q,aa[2]+2*Q,aa[3]+2*Q]}return aa};var g=function(T,W){var R=y([T[0],T[1]],W);var Y=y([T[0]+T[2],T[1]],W);var Z=y([T[0],T[1]+T[3]],W);var U=y([T[0]+T[2],T[1]+T[3]],W);var Q=Math.min(R[1],Y[1],Z[1],U[1]);var S=Math.min(R[0],Y[0],Z[0],U[0]);var V=Math.max(R[1],Y[1],Z[1],U[1]);var X=Math.max(R[0],Y[0],Z[0],U[0]);return[S,Q,X-S,V-Q]};var r=function(R,V,T,W,S){var Y=l(R.getAttribute("points"));var Z=[{op:"m",c:y(Y[0],V)}];for(var U=1;U<Y.length;U++){var Q=Y[U];var X=y(Q,V);Z.push({op:"l",c:X})}Z.push({op:"h"});p.path(Z,T,W,S)};var d=function(T){var Y=T.getAttribute("xlink:href")||T.getAttribute("href");var U=new Image();U.src=Y;var S=document.createElement("canvas");var R=parseFloat(T.getAttribute("width")),Z=parseFloat(T.getAttribute("height")),X=parseFloat(T.getAttribute("x")||0),W=parseFloat(T.getAttribute("y")||0);S.width=R;S.height=Z;var Q=S.getContext("2d");Q.fillStyle="#fff";Q.fillRect(0,0,R,Z);Q.drawImage(U,0,0,R,Z);var V=S.toDataURL("image/jpeg");p.addImage(V,"jpeg",X,W,R,Z)};var I=function(S,Y,ab,V,ad,T){var aa=w(S);var U=S.getAttribute("marker-end"),R=S.getAttribute("marker-start"),ac=S.getAttribute("marker-mid");var Q=function(ar,af){var aq=0,ap=0;var aA=aq,al=ap;var an,am,aD,aC;var aj,au,ai,ag;var ah=[];var ay=[];var ao;var aB=0,aG;var aF=function(aM,aI,aJ){var aK=Math.cos(aM);var aH=Math.sin(aM);var aL;aL=new p.Matrix(aK,aH,-aH,aK,aI[0],aI[1]);ay.push({type:aJ,tf:p.matrixMult(aL,af)})};for(var aw=0;aw<aa.numberOfItems;aw++){var ax=aa.getItem(aw);var av=ax.pathSegTypeAsLetter;switch(av){case"M":aA=aq;al=ap;aj=[ax.x,ax.y];ao="m";break;case"m":aA=aq;al=ap;aj=[ax.x+aq,ax.y+ap];ao="m";break;case"L":aj=[ax.x,ax.y];ao="l";break;case"l":aj=[ax.x+aq,ax.y+ap];ao="l";break;case"H":aj=[ax.x,ap];ao="l";aD=ax.x;aC=ap;break;case"h":aj=[ax.x+aq,ap];ao="l";aD=ax.x+aq;aC=ap;break;case"V":aj=[aq,ax.y];ao="l";aD=aq;aC=ax.y;break;case"v":aj=[aq,ax.y+ap];ao="l";aD=aq;aC=ax.y+ap;break;case"C":ai=[ax.x1,ax.y1];ag=[ax.x2,ax.y2];aj=[ax.x,ax.y];break;case"c":ai=[ax.x1+aq,ax.y1+ap];ag=[ax.x2+aq,ax.y2+ap];aj=[ax.x+aq,ax.y+ap];break;case"S":ai=H(aw,[aq,ap],aa,an,am);ag=[ax.x2,ax.y2];aj=[ax.x,ax.y];break;case"s":ai=H(aw,[aq,ap],aa,an,am);ag=[ax.x2+aq,ax.y2+ap];aj=[ax.x+aq,ax.y+ap];break;case"Q":au=[ax.x1,ax.y1];ai=C([aq,ap],au);ag=C([ax.x,ax.y],au);aj=[ax.x,ax.y];break;case"q":au=[ax.x1+aq,ax.y1+ap];ai=C([aq,ap],au);ag=C([aq+ax.x,ap+ax.y],au);aj=[ax.x+aq,ax.y+ap];break;case"T":ai=H(aw,[aq,ap],aa,an,am);ai=C([aq,ap],au);ag=C([ax.x,ax.y],au);aj=[ax.x,ax.y];break;case"t":au=H(aw,[aq,ap],aa,an,am);ai=C([aq,ap],au);ag=C([aq+ax.x,ap+ax.y],au);aj=[ax.x+aq,ax.y+ap];break;case"Z":case"z":aq=aA;ap=al;ah.push({op:"h"});break}var ak=R&&(aw===1||("mM".indexOf(av)<0&&"mM".indexOf(aa.getItem(aw-1).pathSegTypeAsLetter)>=0));var at=U&&(aw===aa.numberOfItems-1||("mM".indexOf(av)<0&&"mM".indexOf(aa.getItem(aw+1).pathSegTypeAsLetter)>=0));var aE=ac&&aw>0&&!(aw===1&&"mM".indexOf(aa.getItem(aw-1).pathSegTypeAsLetter)>=0);if("sScCqQtT".indexOf(av)>=0){ak&&aF(n([aq,ap],ai),[aq,ap],"start");at&&aF(n(ag,aj),aj,"end");if(aE){aG=n([aq,ap],ai);aG="mM".indexOf(aa.getItem(aw-1).pathSegTypeAsLetter)>=0?aG:0.5*(aB+aG);aF(aG,[aq,ap],"mid")}aB=n(ag,aj);an=aq;am=ap;ai=y(ai,af);ag=y(ag,af);au=y(aj,af);ah.push({op:"c",c:[ai[0],ai[1],ag[0],ag[1],au[0],au[1]]})}else{if("lLhHvVmM".indexOf(av)>=0){aG=n([aq,ap],aj);ak&&aF(aG,[aq,ap],"start");at&&aF(aG,aj,"end");if(aE){var az="mM".indexOf(av)>=0?aB:"mM".indexOf(aa.getItem(aw-1).pathSegTypeAsLetter)>=0?aG:0.5*(aB+aG);aF(az,[aq,ap],"mid")}aB=aG;au=y(aj,af);ah.push({op:ao,c:au})}}if("MLCSQT".indexOf(av)>=0){aq=ax.x;ap=ax.y}else{if("mlcsqt".indexOf(av)>=0){aq=ax.x+aq;ap=ax.y+ap}else{if("zZ".indexOf(av)<0){aq=aD;ap=aC}}}}return{lines:ah,markers:ay}};var ae=Q(aa,Y);if(U||R||ac){for(var X=0;X<ae.markers.length;X++){var W=ae.markers[X];var Z;switch(W.type){case"start":Z=ab.get()+/url\(#(\w+)\)/.exec(R)[1];break;case"end":Z=ab.get()+/url\(#(\w+)\)/.exec(U)[1];break;case"mid":Z=ab.get()+/url\(#(\w+)\)/.exec(ac)[1];break}p.doFormObject(Z,W.tf)}}if(ae.lines.length>0){p.path(ae.lines,V,ad,T)}};var L=function(S,T,U){var Q=(S.getAttribute("href")||S.getAttribute("xlink:href"));if(!Q){return}var Z=p.getFormObject(U.get()+Q.substring(1));var W=S.getAttribute("x")||0;var V=S.getAttribute("y")||0;var R=S.getAttribute("width")||Z.width;var X=S.getAttribute("height")||Z.height;var Y=new p.Matrix(R/Z.width||0,0,0,X/Z.height||0,W,V);Y=p.matrixMult(Y,T);p.doFormObject(U.get()+Q.substring(1),Y)};var i=function(R,Q){var T=y([parseFloat(R.getAttribute("x1")),parseFloat(R.getAttribute("y1"))],Q);var S=y([parseFloat(R.getAttribute("x2")),parseFloat(R.getAttribute("y2"))],Q);p.line(T[0],T[1],S[0],S[1])};var z=function(S,R,T,Q){p.roundedRect(parseFloat(S.getAttribute("x"))||0,parseFloat(S.getAttribute("y"))||0,parseFloat(S.getAttribute("width")),parseFloat(S.getAttribute("height")),parseFloat(S.getAttribute("rx"))||0,parseFloat(S.getAttribute("ry"))||0,R,T,Q)};var P=function(S,R,T,Q){p.ellipse(parseFloat(S.getAttribute("cx"))||0,parseFloat(S.getAttribute("cy"))||0,parseFloat(S.getAttribute("rx")),parseFloat(S.getAttribute("ry")),R,T,Q)};var t=function(T,S,U,R){var Q=parseFloat(T.getAttribute("r"))||0;p.ellipse(parseFloat(T.getAttribute("cx"))||0,parseFloat(T.getAttribute("cy"))||0,Q,Q,S,U,R)};var B=function(Q,R){var S=D(Q,"text-transform");switch(S){case"uppercase":return R.toUpperCase();case"lowercase":return R.toLowerCase();default:return R}};var x=function(U,Y,Q,R){p.saveGraphicsState();s(U,R);var ad=function(ag,ai){var ah=0;switch(ag){case"end":ah=ai;break;case"middle":ah=ai/2;break;case"start":break}return ah};var af=function(ai,ah){var ag;ag=ai&&ai.toString().match(/^([\-0-9.]+)em$/);if(ag){return parseFloat(ag[1])*ah}ag=ai&&ai.toString().match(/^([\-0-9.]+)(px|)$/);if(ag){return parseFloat(ag[1])}return 0};var Z=document.createElementNS("http://www.w3.org/2000/svg","svg");Z.appendChild(U);Z.setAttribute("visibility","hidden");document.body.appendChild(Z);var X=U.getBBox();var ae,ac,ab=0;var T=D(U,"text-anchor");if(T){ab=ad(T,X.width)}var aa=p.getFontSize();var W=af(U.getAttribute("x"),aa);var V=af(U.getAttribute("y"),aa);var S=p.matrixMult(new p.Matrix(1,0,0,1,W,V),Y);ae=af(U.getAttribute("dx"),aa);ac=af(U.getAttribute("dy"),aa);if(U.childElementCount===0){p.text((ae-ab),ac,B(U,k(U.textContent)),void 0,S)}else{M(U,function(ag,ai){p.saveGraphicsState();var aj=D(ai,"fill");s(ai,aj&&new N(aj));var ah=ai.getExtentOfChar(0);p.text(ah.x-W,ah.y+ah.height*0.7-V,B(U,k(ai.textContent)),void 0,S);p.restoreGraphicsState()})}document.body.removeChild(Z);p.restoreGraphicsState()};var A=function(T,R,Q,U,S){M(T,function(V,W){if(W.tagName.toLowerCase()==="defs"){O(W,R,Q,U,S);W.parentNode.removeChild(W)}})};var c=function(T,R,Q,U,S){var W=U.nextChild();var V=G(Q);A(T,R,V,W,S);m(T,R,V,W,S)};var m=function(T,R,Q,U,S){M(T,function(V,W){O(W,R,Q,U,S)})};var v=function(T,Z,aa,U,Y){var Q=[];var W=0;var S=false;var V;M(T,function(ae,ad){if(ad.tagName.toLowerCase()==="stop"){var ab=new N(D(ad,"stop-color"));Q.push({offset:parseFloat(ad.getAttribute("offset")),color:[ab.r,ab.g,ab.b]});var ac=D(ad,"stop-opacity");if(ac&&ac!=1){W+=parseFloat(ac);S=true}}});if(S){V=new p.GState({opacity:W/aa.length})}var X=new p.ShadingPattern(Z,aa,Q,V);var R=Y.get()+T.getAttribute("id");p.addShadingPattern(R,X);U[R]=T};var f=function(S,Q,U){var V=U.get()+S.getAttribute("id");Q[V]=S;var R=o(S);var T=new p.TilingPattern([R[0],R[1],R[0]+R[2],R[1]+R[3]],R[2],R[3],null,e(S));p.beginTilingPattern(T);m(S,p.unitMatrix,Q,U,false);p.endTilingPattern(V,T)};function s(T,S){var Q=D(T,"font-family");if(Q){p.setFont(Q)}if(S&&S.ok){p.setTextColor(S.r,S.g,S.b)}var W;var R=D(T,"font-weight");if(R){if(R==="bold"){W="bold"}}var X=D(T,"font-style");if(X){if(X==="italic"){W+="italic"}}p.setFontType(W);var V=16;var U=D(T,"font-size");if(U){V=parseFloat(U);p.setFontSize(V)}}var O=function(ap,ae,T,S,av){var Q,R=false,U=null,ab=null,aj=null,Z=null,ac;var aa=av&&!F(ap,"lineargradient,radialgradient,pattern");if(aa){Q=e(ap);ac=o(ap);p.beginFormObject(ac[0],ac[1],ac[2],ac[3],Q);Q=p.unitMatrix;av=false}else{Q=p.matrixMult(e(ap),ae);p.saveGraphicsState()}if(F(ap,"g,path,rect,text,ellipse,line,circle,polygon")){function af(){U=new N("rgb(0, 0, 0)");R=true;ab="F"}var X=D(ap,"fill");if(X){var Y=/url\(#(\w+)\)/.exec(X);if(Y){aj=S.get()+Y[1];var at=q(aj,T);if(at&&F(at,"lineargradient,radialgradient")){var aw=Q;if(!at.hasAttribute("gradientUnits")||at.getAttribute("gradientUnits").toLowerCase()==="objectboundingbox"){ac||(ac=o(ap));aw=new p.Matrix(ac[2],0,0,ac[3],ac[0],ac[1]);var ar=e(ap);aw=p.matrixMult(aw,ar)}var ah=j(at.getAttribute("gradientTransform"));Z=p.matrixMult(ah,aw)}else{if(at&&F(at,"pattern")){var am,ag,an,ak,ai;Z={};var aq=p.unitMatrix;if(!at.hasAttribute("patternUnits")||at.getAttribute("patternUnits").toLowerCase()==="objectboundingbox"){ac||(ac=o(ap));aq=new p.Matrix(1,0,0,1,ac[0],ac[1]);am=o(at);ai=am[0]*ac[0];ag=am[1]*ac[1];an=am[2]*ac[2];ak=am[3]*ac[3];Z.boundingBox=[ai,ag,ai+an,ag+ak];Z.xStep=an;Z.yStep=ak}var ad=p.unitMatrix;if(at.hasAttribute("patternContentUnits")&&at.getAttribute("patternContentUnits").toLowerCase()==="objectboundingbox"){ac||(ac=o(ap));ad=new p.Matrix(ac[2],0,0,ac[3],0,0);am=Z.boundingBox||o(at);ai=am[0]/ac[0];ag=am[1]/ac[1];an=am[2]/ac[2];ak=am[3]/ac[3];Z.boundingBox=[ai,ag,ai+an,ag+ak];Z.xStep=an;Z.yStep=ak}Z.matrix=p.matrixMult(p.matrixMult(ad,aq),Q);ab="F"}else{aj=at=null;af()}}}else{U=h(X);if(U.ok){R=true;ab="F"}else{ab=null}}}else{af()}var V=1;var au=ap.getAttribute("opacity")||ap.getAttribute("fill-opacity");if(au){V*=parseFloat(au)}if(U&&typeof U.a==="number"){V*=U.a}p.setGState(new p.GState({opacity:V}))}if(F(ap,"g,path,rect,ellipse,line,circle,polygon")){if(R){p.setFillColor(U.r,U.g,U.b)}var ao=ap.getAttribute("stroke");if(ao){var al;if(ap.hasAttribute("stroke-width")){al=Math.abs(parseFloat(ap.getAttribute("stroke-width")));p.setLineWidth(al)}var W=new N(ao);if(W.ok){p.setDrawColor(W.r,W.g,W.b);if(al!==0){ab=(ab||"")+"D"}}if(ap.hasAttribute("stroke-linecap")){p.setLineCap(ap.getAttribute("stroke-linecap"))}if(ap.hasAttribute("stroke-linejoin")){p.setLineJoin(ap.getAttribute("stroke-linejoin"))}if(ap.hasAttribute("stroke-dasharray")){p.setLineDashPattern(E(ap.getAttribute("stroke-dasharray")),parseInt(ap.getAttribute("stroke-dashoffset"))||0)}if(ap.hasAttribute("stroke-miterlimit")){p.setLineMiterLimit(parseFloat(ap.getAttribute("stroke-miterlimit")))}}}s(ap,U);switch(ap.tagName.toLowerCase()){case"svg":c(ap,Q,T,S,av);break;case"g":A(ap,Q,T,S,av);case"a":case"marker":m(ap,Q,T,S,av);break;case"defs":m(ap,Q,T,S,true);break;case"use":L(ap,Q,S);break;case"line":i(ap,Q);break;case"rect":p.setCurrentTransformationMatrix(Q);z(ap,ab,aj,Z);break;case"ellipse":p.setCurrentTransformationMatrix(Q);P(ap,ab,aj,Z);break;case"circle":p.setCurrentTransformationMatrix(Q);t(ap,ab,aj,Z);break;case"text":x(ap,Q,R,U);break;case"path":I(ap,Q,S,ab,aj,Z);break;case"polygon":r(ap,Q,ab,aj,Z);break;case"image":p.setCurrentTransformationMatrix(Q);d(ap);break;case"lineargradient":v(ap,"axial",[ap.getAttribute("x1"),ap.getAttribute("y1"),ap.getAttribute("x2"),ap.getAttribute("y2")],T,S);break;case"radialgradient":v(ap,"radial",[ap.getAttribute("fx")||ap.getAttribute("cx"),ap.getAttribute("fy")||ap.getAttribute("cy"),0,ap.getAttribute("cx")||0,ap.getAttribute("cy")||0,ap.getAttribute("r")||0],T,S);break;case"pattern":f(ap,T,S);break}if(aa){p.endFormObject(S.get()+ap.getAttribute("id"))}else{p.restoreGraphicsState()}};var K=function(T,Q,S){p=Q;var R=S.scale||1,U=S.xOffset||0,V=S.yOffset||0;p.saveGraphicsState();p.setCurrentTransformationMatrix(new p.Matrix(R,0,0,R,U,V));O(T.cloneNode(true),p.unitMatrix,{},new b(""),false);p.restoreGraphicsState();return p};if(typeof define==="function"&&define.amd){define(["rgbcolor"],function(Q){N=Q;return K})}else{if(typeof module!=="undefined"&&module.exports){N=require("./rgbcolor.js");module.exports=K}else{N=a.RGBColor;a.svg2pdf=K;a.svgElementToPdf=K}}return K}(typeof self!=="undefined"&&self||typeof window!=="undefined"&&window||this));