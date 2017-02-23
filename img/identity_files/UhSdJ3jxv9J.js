if (self.CavalryLogger) { CavalryLogger.start_js(["puB\/s"]); }

__d('SendAPIDialogButton',['Button'],(function a(b,c,d,e,f,g){f.exports={monitor:function h(i){var j=document.getElementsByName('publish')[0],k='TypeaheadBehaviors';Object.assign(window[k]||(window[k]={}),{SendAPIDialogButtonActivate:function l(m){m.subscribe('select',function(){c('Button').setEnabled(j,1);});m.subscribe('blur',function(){var n=i.getTokenValues();c('Button').setEnabled(j,n&&n.length);});}});}};}),null);
__d('LitestandLinkHider',['DataStore','DOMQuery','Event','Parent','UserAgent_DEPRECATED'],(function a(b,c,d,e,f,g){'use strict';function h(event){var j=event.getTarget(),k=c('Parent').byTag(j,'a');if(!k)return;if(event.type==='mouseover'){c('DataStore').set(k,'href',k.href);k.removeAttribute('href');}else{k.href=c('DataStore').get(k,'href')||k.href;if(event.type==='mouseout')c('DataStore').remove(k,'href');}}var i={hideLinks:function j(k){if(c('UserAgent_DEPRECATED').chrome()||c('UserAgent_DEPRECATED').ie()>=9||c('UserAgent_DEPRECATED').opera())c('Event').listen(k,{mouseover:h,mouseout:h,mousedown:h});},removeAllHrefs:function j(k){var l=arguments.length<=1||arguments[1]===undefined?null:arguments[1],m=c('DOMQuery').scry(k,'a');m.forEach(function(n){if(l&&l.length&&l.some(function(o){return n.hasAttribute(o);}))return;n.removeAttribute('href');n.removeAttribute('ajaxify');n.removeAttribute('rel');n.setAttribute('tabindex',0);});},removeClickable:function j(k,l){i.removeAllHrefs(k);var m=c('DOMQuery').scry(k,'.'+l+' a');m.forEach(function(n){n.removeAttribute('onclick');n.removeAttribute('onmouseover');});}};f.exports=i;}),null);
__d('ProgressiveDatepicker',['Arbiter','ArbiterMixin','CSS','DataStore','DOM','Event','Parent','getElementText','mixin','shield','Focus'],(function a(b,c,d,e,f,g){var h,i;function j(m){return new Date(m[0],m[1],m[2],m[3],m[4]);}function k(m,n){while(m.length)c('DOM').insertAfter(n,m.pop());}h=babelHelpers.inherits(l,c('mixin')(c('ArbiterMixin')));i=h&&h.prototype;function l(m,n){'use strict';i.constructor.call(this);this._root=m;this._savedLabels={};this._savedPeriodsBack=[];this._savedPeriodsFront=[];this._menus={};this._dayOrderAscending=n.dayorderascending;var o=0;if(n.gmtoffset!==undefined)o=-new Date().getTimezoneOffset()-n.gmtoffset;this._mintime=n.mintime&&new Date(1000*n.mintime-o*60000);this._maxtime=n.maxtime&&new Date(1000*n.maxtime-o*60000);c('DataStore').set(m,'datepicker',this);c('DOM').scry(m,'select').forEach(function(p){c('Event').listen(p,'change',c('shield')(this._handleChange,this,p));var q=c('Parent').byClass(p,'period');c('Event').listen(p,'focus',c('CSS').addClass.bind(null,q,'periodFocus'));c('Event').listen(p,'blur',c('CSS').removeClass.bind(null,q,'periodFocus'));this._setMenuSelectionState(p);if(p.getAttribute('data-name')==='month')this._filterInvalidDates();}.bind(this));c('DOM').scry(m,'a.periodLabel').forEach(function(p){var q=c('Parent').byClass(p,'period');c('Event').listen(p,'click',function(){c('CSS').addClass(q,'periodSelected');c('CSS').addClass(q,'periodFocus');c('Focus').set(c('DOM').find(q,'select'));});});this._filterInvalidDates();this.inform('initialized',this,c('Arbiter').BEHAVIOR_STATE);}l.prototype.setDate=function(m,n,o,p,q){'use strict';this._addSavedPeriods();var r=l.PERIODS;for(var s=0;s<r.length;s++)this._setValueForPeriod(r[s],arguments[s]);this._filterInvalidDates();this.inform('changed');};l.prototype.setDateWithTimestamp=function(m){'use strict';var n=new Date(m);this.setDate(n.getFullYear(),n.getMonth()+1,n.getDate(),n.getHours(),n.getMinutes());};l.prototype.isSet=function(){'use strict';var m=l.PERIODS;for(var n=0;n<m.length;n++)if(this._getValueForPeriod(m[n]))return true;return false;};l.prototype.getRoot=function(){'use strict';return this._root;};l.prototype.getValues=function(){'use strict';var m=l.PERIODS,n={};for(var o=0;o<m.length;o++){var p=this._getValueForPeriod(m[o]);if(p)n[m[o]]=p;}return n;};l.prototype.getDate=function(){'use strict';var m=this.getValues();return new Date(m.year||0,(m.month||1)-1,m.day||1,m.hour||0,m.minute||0);};l.prototype.getTimestamp=function(){'use strict';return Math.round(this.getDate().getTime()/1000);};l.prototype._setValueForPeriod=function(m,n){'use strict';var o=this._menuForPeriodName(m);if(!o)return;if(n===undefined)n='';var p=o.options;for(var q=0,r=p.length;q<r;q++)if(p[q].value==n){o.selectedIndex=q;break;}this._setMenuSelectionState(o);};l.prototype._getValueForPeriod=function(m){'use strict';var n=this._menuForPeriodName(m);return n&&n.options[n.selectedIndex].value;};l.prototype._handleChange=function(m){'use strict';this._setMenuSelectionState(m);this._filterInvalidDates();this.inform('changed');};l.prototype._setMenuSelectionState=function(m){'use strict';var n=c('Parent').byClass(m,'period');if(!n)return;if(c('CSS').hasClass(n,'periodRequired')){if(m.selectedIndex===0)m.selectedIndex=1;}else this._updateLabel(m);var o=m.getAttribute('data-name'),p=m.options[m.selectedIndex].value;c('CSS').conditionClass(n,'periodSelected',p);c('CSS').conditionClass(this._root,this._selectedClass(o),p);if(!p)this._resetMenu(l.PERIODS.indexOf(o)+1);};l.prototype._updateLabel=function(m){'use strict';var n=m.getAttribute('data-name'),o=m.options[0];if(!this._savedLabels[n])this._savedLabels[n]=c('getElementText')(o);if(m.selectedIndex===0){c('DOM').setContent(o,this._savedLabels[n]);}else c('DOM').setContent(o,'--');};l.prototype._daysInMonth=function(m,n){'use strict';return new Date(m||1999,n+1||1,0).getDate();};l.prototype._daysInCurrentMonth=function(){'use strict';return this._daysInMonth(this._getValueForPeriod('year'),this._getValueForPeriod('month')-1);};l.prototype._menuForPeriodName=function(m){'use strict';if(!this._menus[m])this._menus[m]=c('DOM').scry(this._root,'.'+m+'Menu')[0];return this._menus[m];};l.prototype._selectedClass=function(m){'use strict';return 'uiProgressiveDatepickerSelected-'+m;};l.prototype._resetMenu=function(m){'use strict';var n=l.PERIODS;for(;m<n.length;m++){var o=n[m],p=this._menuForPeriodName(o);if(!p)return;if(c('Parent').byClass(p,'periodRequired')){p.selectedIndex=1;}else{c('CSS').removeClass(c('Parent').byClass(p,'period'),'periodSelected');c('CSS').removeClass(this._root,this._selectedClass(o));p.selectedIndex=0;this._updateLabel(p);}}};l.prototype._addSavedPeriods=function(){'use strict';var m=l.PERIODS;for(var n=0;n<m.length;n++){var o=this._menuForPeriodName(m[n]);if(!o)return;this._savedPeriodsFront[n]||(this._savedPeriodsFront[n]=[]);this._savedPeriodsBack[n]||(this._savedPeriodsBack[n]=[]);var p=o.options[0],q=o.options[o.options.length-1];if(n===l.PERIODS.indexOf('hour')||n===l.PERIODS.indexOf('minute')||n===l.PERIODS.indexOf('day')&&this._dayOrderAscending){k(this._savedPeriodsFront[n],p);k(this._savedPeriodsBack[n],q);}else{k(this._savedPeriodsBack[n],p);k(this._savedPeriodsFront[n],q);}}};l.prototype._filterInvalidDates=function(){'use strict';this._addSavedPeriods();var m=l.PERIODS,n=this.getValues();for(var o=0;o<m.length;o++){var p=this._menuForPeriodName(m[o]);if(!p)return;this._savedPeriodsFront[o]||(this._savedPeriodsFront[o]=[]);this._savedPeriodsBack[o]||(this._savedPeriodsBack[o]=[]);for(var q=1;q<p.options.length;){var r=p.options[q],s=[o-1>=0?n[m[0]]:0,o-1>=1?n[m[1]]-1:0,o-1>=2?n[m[2]]:1,o-1>=3?n[m[3]]:0,o-1>=4?n[m[4]]:0];s[o]=r.value;if(o===l.PERIODS.indexOf('month'))s[o]=s[o]-1;var t=j(s),u=[o-1>=0?n[m[0]]:9001,o-1>=1?n[m[1]]-1:11,o-1>=2?n[m[2]]:this._daysInCurrentMonth(),o-1>=3?n[m[3]]:23,o-1>=4?n[m[4]]:59];u[o]=r.value;if(o===l.PERIODS.indexOf('month')){u[o]--;u[o+1]=this._daysInMonth(u[0],u[1]);}var v=j(u),w=t>this._maxtime,x=v<this._mintime,y=o===l.PERIODS.indexOf('day')&&r.value>this._daysInCurrentMonth();if(x||w||y){if(r.selected){r.selected=false;this._resetMenu(o);}c('DOM').remove(r);if(w||y){this._savedPeriodsBack[o].push(r);}else this._savedPeriodsFront[o].push(r);}else q++;}}};l.getInstance=function(m){'use strict';return m?c('DataStore').get(m,'datepicker'):null;};Object.assign(l,{PERIODS:['year','month','day','hour','minute']});f.exports=l;}),null);
__d('PhotosBulkEditablePhoto',['csx','cx','fbt','Arbiter','AsyncDialog','AsyncRequest','AsyncResponse','CSS','Dialog','DOM','Event','Focus','Form','Input','Parent','PhotosConst','PlaceUtils','ProgressiveDatepicker'],(function a(b,c,d,e,f,g,h,i,j){var k=null,l=null,m=false;function n(o,p,q,r,s,t,u){'use strict';this._root=o;this._mentionsTypeahead=p;this._placesTypeahead=q;this._photoData=r;this._hasOwnPlaceValue=!!q.getCore().getHiddenValue();var v=c('DOM').find(o,'.placesInput'),w=c('DOM').find(o,'.captionTextarea'),x=c('DOM').find(q.element,'.uiTypeaheadCloseButton');this._metadataInputs=c('DOM').find(o,'.metadataInputs');this._editorId=s;this._published=t;this._showMove=u;this._photoDataKey=this._root.id;this._hasTimeTaken=!!this._photoData.timeTaken;this._hasExistingDateValue=this._photoData.isBackdated;this._listeners=[c('Event').listen(o,'click',this._handleClick.bind(this)),c('Event').listen(v,'focus',this._placesFocus.bind(this)),c('Event').listen(w,'focus',this._captionFocus.bind(this)),c('Event').listen(w,'blur',this._save.bind(this)),c('Event').listen(x,'click',function(){setTimeout(this._save.bind(this),0);}.bind(this)),c('Event').listen(o,'submit',function(){return false;})];this._previousSaveData=c('Form').serialize(this._root);var y=c('DOM').scry(this._root,'div.backdateInput .periodMenu');for(var z=0;z<y.length;z++){var aa=y[z];this._listeners.push(c('Event').listen(aa,'change',function(){return this._saveDate();}.bind(this)));}var ba=c('DOM').scry(this._root,"._2sfm").pop();if(ba){var ca=ba.getAttribute('data-direction');this._listeners.push(c('Event').listen(ba,'click',this._rotate.bind(this,ca)));}var da=c('DOM').scry(o,'.photoContextualSelector')[0];if(da){var ea=c('DOM').scry(da,'.moveAlbum')[0];ea&&this._listeners.push(c('Event').listen(ea,'click',this._move.bind(this)));var fa=c('DOM').scry(da,'.albumCover')[0];fa&&this._listeners.push(c('Event').listen(fa,'click',this._setAlbumCover.bind(this)));var ga=c('DOM').scry(da,'.removePhoto')[0];ga&&this._listeners.push(c('Event').listen(ga,'click',this.remove.bind(this)));}else{var ha=c('DOM').find(o,'.removePhotoButton');this._listeners.push(c('Event').listen(ha,'click',this.remove.bind(this)));}this._placesDataListener=[q.subscribe(['select','reset','render'],function(ia,ja){c('CSS').conditionClass(this._root,'focusedInput',ia=='render');if(ia=='render')return;if(ia=='reset'&&q.getCore().getHiddenValue())return;if(ja&&ja.selected){k=ja.selected;if(l==k.text){m=true;}else{l=k.text;m=false;}}else{k=null;l=null;m=false;}this._hasOwnPlaceValue=ia=='select';c('CSS').conditionClass(c('DOM').find(o,'.placeIcon'),'hasPlace',this._hasOwnPlaceValue);if(this._hasOwnPlaceValue)this._save();}.bind(this))];this._placesInputBlurListener=q.getCore().subscribe('blur',function(ia,ja){c('CSS').removeClass(this._root,'focusedInput');}.bind(this));c('Arbiter').inform(this.mapEventNameToNamespace('PhotosBulkEditablePhoto.INITIALIZED'),this,c('Arbiter').BEHAVIOR_PERSISTENT);}n.prototype.getPhotoDataKey=function(){'use strict';return this._photoDataKey;};n.prototype.getPhotoData=function(){'use strict';return this._photoData;};n.prototype.getRoot=function(){'use strict';return this._root;};n.prototype.getDragHandle=function(){'use strict';return this.getRoot();};n.prototype.getRotateButtonType=function(){'use strict';return this._rotateButtonType;};n.prototype.swapData=function(o,p){'use strict';var q=this._mentionsTypeahead.getData(),r=this._placesTypeahead.getData();if(q!==o)this._mentionsTypeahead.swapData(o);if(r!==p){var s=this._placesTypeahead.getCore().getValue(),t=this._placesTypeahead.getCore().getHiddenValue();this._placesTypeahead.swapData(p);if(this.hasOwnPlaceValue())this._placesTypeahead.getCore().select({text:s,uid:t});}};n.prototype.hasOwnPlaceValue=function(){'use strict';return this._hasOwnPlaceValue;};n.prototype.setAlbumPlace=function(o,p){'use strict';this._hasOwnPlaceValue=false;var q=this._placesTypeahead.getCore();c('CSS').conditionClass(c('DOM').find(this._root,'.placeIcon'),'hasPlace',!!o);if(o){q.select(o);}else q.reset();if(!p)this._save();};n.prototype.addPlaceSelectHandler=function(o){'use strict';this._placesDataListener.push(this._placesTypeahead.subscribe('select',o));};n.prototype.mapEventNameToNamespace=function(o){'use strict';return o+(this._editorId?'/'+this._editorId:'');};n.prototype.setDate=function(o,p){'use strict';if(this._hasExistingDateValue)return;var q=!o,r=o;if(q){if(!this._hasTimeTaken)return;r=Math.round(this._photoData.timeTaken/600)*600*1000;}var s=c('DOM').find(this.getRoot(),'.uiProgressiveDatepicker'),t=c('ProgressiveDatepicker').getInstance(s);t.setDateWithTimestamp(r);c('CSS').conditionClass(c('DOM').find(this._root,'.dateIcon'),'hasDate',!!r);if(q)this._saveDate(p);};n.prototype._doRemove=function(){'use strict';c('DOM').remove(this._root);this._unsubscribeAll();c('Arbiter').inform(this.mapEventNameToNamespace('PhotosBulkEditablePhoto.REMOVED'),this);};n.prototype._unsubscribeAll=function(){'use strict';this._listeners.forEach(function(o){o.remove();});this._listeners=[];this._placesDataListener.forEach(function(o){this._placesTypeahead.unsubscribe(o);}.bind(this));this._placesTypeahead.getCore().unsubscribe(this._placesInputBlurListener);};n.prototype._handleClick=function(o){'use strict';var p=o.getTarget();if(c('Parent').byClass(p,'confirmPhotoBackdate')){this._saveDate();return;}if(!c('Parent').byClass(p,'metaIcon'))return;c('CSS').addClass(this._root,'showControls');if(c('Parent').byClass(p,'placeIcon')){this._showMetadataInput('place');c('Focus').set(this._placesTypeahead.getCore().getElement());}else if(c('Parent').byClass(p,'dateIcon')){this._showMetadataInput('date');}else if(c('Parent').byClass(p,'peopleIcon')){c('Arbiter').inform(this.mapEventNameToNamespace('PhotosBulkEditablePhoto.TAG_BUTTON_CLICKED'),this);this._showMetadataInput('people');}else c('CSS').removeClass(this._root,'showControls');};n.prototype.hideMetadataInputs=function(){'use strict';this._showMetadataInput();};n.prototype._showMetadataInput=function(o){'use strict';['people','date','place'].forEach(function(p){c('CSS').conditionClass(this._metadataInputs,p,o==p);}.bind(this));};n.prototype._captionFocus=function(o){'use strict';this.hideMetadataInputs();c('CSS').addClass(this._root,'focusedInput');};n.prototype.remove=function(){'use strict';var o={fbid:this._photoData.fbid,version:c('PhotosConst').BULK_EDITOR,confirmed:true};new (c('Dialog'))().setTitle(j._("Delete Photo")).setBody(j._("Are you sure you want to delete this photo?")).setButtons(c('Dialog').OK_AND_CANCEL).setModal(true).setHandler(function(){c('CSS').addClass(this._root,'editablePhotoWillBeRemoved');new (c('AsyncRequest'))().setURI('/ajax/photos/photo/delete/dialog.php').setData(o).setHandler(function(p){if(p.getPayload().success){this._doRemove();}else c('CSS').removeClass(this._root,'editablePhotoWillBeRemoved');}.bind(this)).setErrorHandler(function(p){c('CSS').removeClass(this._root,'editablePhotoWillBeRemoved');c('AsyncResponse').defaultErrorHandler(p);}.bind(this)).send();}.bind(this)).show();};n.prototype._setAlbumCover=function(){'use strict';var o={aid:this._photoData.aid,albumFBID:this._photoData.albumFBID,fbid:this._photoData.fbid,owner:this._photoData.owner,pid:this._photoData.pid},p=new (c('AsyncRequest'))().setURI('/ajax/photos/album/setcover/').setData(o).setAllowCrossPageTransition(false);c('AsyncDialog').send(p);};n.prototype._move=function(){'use strict';var o={aid:this._photoData.aid,albumFBID:this._photoData.albumFBID,datakey:this._photoDataKey,fbid:this._photoData.fbid,owner:this._photoData.owner,pid:this._photoData.pid},p=new (c('AsyncRequest'))().setURI('/ajax/photos/photo/move/dialog.php').setData(o).setAllowCrossPageTransition(false);c('AsyncDialog').send(p);};n.prototype._timeclose=function(o,p){'use strict';o=o||0;p=p||0;return Math.abs(o-p)<43200;};n.prototype._placesFocus=function(o){'use strict';c('CSS').addClass(this._root,'focusedInput');var p=c('DOM').scry(this._root,'input.latitude')[0],q=c('DOM').scry(this._root,'input.longitude')[0],r=c('DOM').scry(this._root,'input.takentime')[0],s=r?c('Input').getValue(r):null,t=this._placesTypeahead.getData(),u=t.getBootstrapData(),v={};if(p&&q){v={latitude:c('Input').getValue(p),longitude:c('Input').getValue(q),proximity_boost:'true',city_id:null,search_time:s};t.setQueryData(v,false);if(!c('PlaceUtils').placesClose(u.latitude,u.longitude,v.latitude,v.longitude)||!this._timeclose(u.search_time,v.search_time))t.setBootstrapData(v,false).setBootstrapEndpoint(t.getQueryEndpoint());}else{v={latitude:null,longitude:null,proximity_boost:null,city_id:null,search_time:s};if(k)if(k.city_id){v.city_id=k.city_id;}else if(k.latitude&&k.longitude){v.latitude=k.latitude;v.longitude=k.longitude;}t.setQueryData(v,false);if(!m){t.setBootstrapData(v).resetBootstrapEndpoint(true);}else if(!c('PlaceUtils').placesClose(u.latitude,u.longitude,v.latitude,v.longitude)||!this._timeclose(u.search_time,v.search_time))t.setBootstrapData(v,false).resetBootstrapEndpoint();}};n.prototype._saveDate=function(o){'use strict';var p=c('DOM').find(this._root,'div.backdateInput'),q=c('Form').serialize(p);q.source=this.source;q.fbid=this._photoData.fbid;q.version=c('PhotosConst').BULK_EDITOR;q.bulk=!!o;c('CSS').addClass(p,'backdating');new (c('AsyncRequest'))().setURI('/ajax/photos/photo/backdate/').setData(q).setRelativeTo(this._root).send();};n.prototype._save=function(){'use strict';c('CSS').removeClass(this._root,'focusedInput');var o=c('Form').serialize(this._root);if(this._previousSaveData){var p=false;for(var q in o){if(q!=='caption'&&q!=='location'&&q!=='location_data')continue;if(o[q]!==this._previousSaveData[q]){p=true;this._previousSaveData[q]=o[q];}}if(!p)return;}o.source=this.source;o.bulk=!this._hasOwnPlaceValue;new (c('AsyncRequest'))().setURI('/ajax/photos/metadata/save/').setData(o).setAllowCrossPageTransition(true).send();};n.prototype._setLoadingIndicator=function(o){'use strict';c('CSS').conditionClass(this._root,"_2sfl",o);};n.prototype._rotate=function(o){'use strict';var p={fbid:this._photoData.fbid,cs_ver:c('PhotosConst').BULK_EDITOR,editor_id:this._editorId,published:this._published,showMove:this._showMove};p[o]=1;this._setLoadingIndicator(true);new (c('AsyncRequest'))('/ajax/photos/photo/rotate/').setData(p).setHandler(function(q){c('DOM').replace(this._root,q.getPayload());this._unsubscribeAll();c('Arbiter').inform(this.mapEventNameToNamespace('PhotosBulkEditablePhoto.ROTATED'),this);}.bind(this)).setFinallyHandler(function(){this._setLoadingIndicator(false);}.bind(this)).setMethod('POST').send();return false;};f.exports=n;}),null);
__d('TagTypeaheadView',['AsyncRequest','ContextualTypeaheadView','CSS','DOM','Parent','FamilyTaggingConfig'],(function a(b,c,d,e,f,g){var h,i;h=babelHelpers.inherits(j,c('ContextualTypeaheadView'));i=h&&h.prototype;function j(k,l){'use strict';i.constructor.call(this,k,l);this.hintText=l.hintText;this.userEd=l.userEd;this.origAutoSelect=l.autoSelect;this.setSuggestions(l.suggestions);}j.prototype.init=function(){'use strict';c('CSS').addClass(this.element,'uiTagTypeaheadView');i.init.call(this);};j.prototype.buildResults=function(k){'use strict';if(!this.value&&this.hintText)k.unshift({subtext:this.hintText,type:'hintText'});if(this.userEd){new (c('AsyncRequest'))().setURI('/ajax/fof/user_education.php').setData({increment:1}).send();k.unshift({subtext:this.userEd,type:'userEdText'});}if(c('FamilyTaggingConfig').gk){var l=[],m=[];for(var n=0;n<k.length;n++)if(k[n].type!=='family_tags'&&k[n].index!=-1000&&k[n].type!=='hintText'){l.push(k[n]);}else m.push(k[n]);k=m.concat(l);i.updateResults.call(this,k);}var o=i.buildResults.call(this,k);if(this.userEd)k.shift();if(!this.value)k.shift();return o;};j.prototype.show=function(){'use strict';var k=c('DOM').scry(this.context,'.typeaheadBackdrop');if(k.length>0)c('CSS').addClass(k[0],'resultsPresent');return i.show.call(this);};j.prototype.hide=function(){'use strict';var k=c('DOM').scry(this.context,'.typeaheadBackdrop');if(k.length>0)c('CSS').removeClass(k[0],'resultsPresent');return i.hide.call(this);};j.prototype.render=function(k,l,m){'use strict';this.autoSelect=this.origAutoSelect&&k.length;this.disableAutoSelect=k.length===0;l=l.concat(this.getAdditionalResults());i.render.call(this,k,l,m);};j.prototype.getItems=function(){'use strict';var k=i.getItems.call(this);if(!this.value)k.shift();if(this.userEd)k.shift();return k;};j.prototype.getSuggestions=function(){'use strict';return this.suggestions;};j.prototype.setSuggestions=function(k){'use strict';this.suggestions=k?k.map(String):[];this.visible=!!this.suggestions.length;};j.prototype.addSuggestion=function(k){'use strict';this.suggestions.unshift(k);};j.prototype.addTypeaheadFlip=function(k){'use strict';c('CSS').addClass(this.element,k);};j.prototype.removeTypeaheadFlip=function(k){'use strict';c('CSS').removeClass(this.element,k);};j.prototype.getContext=function(){'use strict';var k=c('Parent').byClass(this.element,'typeaheadContainer');if(k){return k;}else return i.getContext.call(this);};j.prototype.getAdditionalResults=function(){'use strict';return [];};f.exports=j;}),null);
__d('NoTrucatingCompactTypeaheadRenderer',['CompactTypeaheadRenderer'],(function a(b,c,d,e,f,g){function h(i,j){return c('CompactTypeaheadRenderer')(i,j);}h.className='noTrucating compact';f.exports=h;}),null);
__d('DisablePlatformButton',['ge','CSS','Event'],(function a(b,c,d,e,f,g){var h=false,i={init:function j(k){for(var l=0;l<k.length;l++){var m=c('ge')(k[l]);c('Event').listen(m,'click',function(n){if(h){return false;}else{h=true;for(var o=0;o<k.length;o++)c('CSS').addClass(k[o],'uiButtonDisabled');}});}}};f.exports=i;}),null);
__d('FreeformTokenizerBehavior',['Event','Input','Keys'],(function a(b,c,d,e,f,g){function h(i,j){var k=j.matcher&&new RegExp(j.matcher,'i'),l=j.splitter&&new RegExp(j.splitter),m=j.tokenize_on_blur!==false,n=j.tokenize_on_paste!==false,o=j.split_on_check===true,p=j.select_on_comma!==false,q=j.select_on_space===true,r=j.never_submit===true;function s(event){var t=c('Input').getValue(i.getInput()).trim();if(l&&event&&event.type=='paste'){t=t.split(l);}else if(l&&o){t=t.split(l);}else t=[t];var u=false;for(var v=0;v<t.length;v++){var w=t[v].trim();if(w&&(!k||k.test(w))){var x={uid:w,text:w,freeform:true};i.addToken(i.createToken(x));u=true;}}if(event&&u){i.getTypeahead().getCore().afterSelect();event.kill();}}i.subscribe('keydown',function(t,u){var event=u.event,v=c('Event').getKeyCode(event);if(v==c('Keys').RETURN||p&&v==c('Keys').COMMA||q&&v==c('Keys').SPACE){var w=i.getTypeahead().getView();if(w.getSelection()){w.select();event.kill();}else s(event);}if(v==c('Keys').RETURN&&r)event.kill();});i.subscribe('paste',function(t,u){if(n)setTimeout(s.bind(null,u.event),20);});i.subscribe('blur',function(t,u){if(m)s();i.getTypeahead().getCore().reset();});}f.exports=h;}),null);
__d('TypeaheadHintText',['emptyFunction'],(function a(b,c,d,e,f,g){function h(i){'use strict';this._typeahead=i;}h.prototype.enable=function(){'use strict';this._typeahead.getCore().resetOnKeyup=false;};Object.assign(h.prototype,{disable:c('emptyFunction')});f.exports=h;}),null);
__d('legacy:HintTextTypeaheadBehavior',['TypeaheadHintText'],(function a(b,c,d,e,f,g){if(!b.TypeaheadBehaviors)b.TypeaheadBehaviors={};b.TypeaheadBehaviors.hintText=function(h){h.enableBehavior(c('TypeaheadHintText'));};}),3);