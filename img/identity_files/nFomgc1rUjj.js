if (self.CavalryLogger) { CavalryLogger.start_js(["Jnuyk"]); }

__d("XEventsSuggestionRefreshController",["XController"],(function a(b,c,d,e,f,g){f.exports=c("XController").create("\/events\/permalink\/related_event\/refresh\/",{fetch_num:{type:"Int",defaultValue:1},key:{type:"String"},seed_eid:{type:"Int"},cursor:{type:"Int",defaultValue:0},displayed_events:{type:"IntVector"},acontext:{type:"StringToStringMap",required:true},filter_data:{type:"StringToStringMap",defaultValue:{}},pager_data:{type:"StringToStringMap"},removed_eid:{type:"Int"},row_id:{type:"String"}});}),null);
__d('EventSuggestionFetcher',['csx','cx','$','Animation','Arbiter','AsyncRequest','CSS','DOM','XEventsSuggestionRefreshController'],(function a(b,c,d,e,f,g,h,i){var j={_displayedIDs:{},_eventsCache:{},_replacementRequestCache:{},addDisplayedEvent:function k(l){this._displayedIDs[l]=(this._displayedIDs[l]||0)+1;},removeDisplayedEvent:function k(l){this._displayedIDs[l]--;if(this._displayedIDs[l]===0)delete this._displayedIDs[l];},_computeCacheKey:function k(l){return JSON.stringify(l.filter_data)+JSON.stringify(l.acontext);},replace:function k(l,m,n,o){if(!n)return;var p=this._computeCacheKey(n);if(!this._addReplacementRequest(p,l,m,o))return;this._setFetchData(p,n);this._replaceFromCache(p);},_addReplacementRequest:function k(l,m,n,o){if(!this._replacementRequestCache[l])this._replacementRequestCache[l]=[];for(var p=0;p<this._replacementRequestCache[l].length;p++)if(this._replacementRequestCache[l][p].eid===m)return false;this._replacementRequestCache[l].push({eid:m,row_id:n,callback:o});return true;},_setFetchData:function k(l,m){if(this._eventsCache[l])return;this._eventsCache[l]={events:[],fetchdata:{filter_data:m.filter_data,acontext:m.acontext,seed_eid:m.seed_eid,cursor:0},fetching:false};},_replaceFromCache:function k(l){while(this._replacementRequestCache[l].length>0)if(this._isCacheEmpty(l)){this._fetchEvent(l);return;}else{var m=this._popFirstCachedEvent(l),n=this._replacementRequestCache[l].shift();this._replaceItem(n.row_id,m.item,m.divider);this.removeDisplayedEvent(n.eid);n.callback();}},_isCacheEmpty:function k(l){return !this._eventsCache[l]||this._eventsCache[l].events.length===0;},cacheEvents:function k(l,m,n){if(!this._eventsCache[m])return;this._eventsCache[m].fetchdata.curser=n;this._eventsCache[m].fetching=false;l.forEach(function(o){this._eventsCache[m].events.push({event_id:o.id,item:o.item,divider:o.divider});},this);this._replaceFromCache(m);},_popFirstCachedEvent:function k(l){if(!this._eventsCache[l]||this._eventsCache[l].events.length===0)return null;var m=this._eventsCache[l].events.shift();if(this._eventsCache[l].events.length===0)delete this._eventsCache[l];return m;},_fetchEvent:function k(l){if(!this._eventsCache[l]||this._eventsCache[l].fetching)return;this._eventsCache[l].fetching=true;var m=this._eventsCache[l].fetchdata,n=this._replacementRequestCache[l][0],o=c('XEventsSuggestionRefreshController').getURIBuilder().setInt('fetch_num',6).setString('key',l).setInt('seed_eid',m.seed_eid).setInt('cursor',m.cursor).setIntVector('displayed_events',Object.keys(this._displayedIDs)).setStringToStringMap('filter_data',m.filter_data).setStringToStringMap('acontext',m.acontext).setStringToStringMap('pager_data',{fetch_num:6,key:l}).setInt('removed_eid',n.eid).setString('row_id',n.row_id).getURI();new (c('AsyncRequest'))(o).setErrorHandler(function(){this._eventsCache[l].fetching=false;}.bind(this)).send();},_replaceItem:function k(l,m,n){var o=c('$')(l);c('CSS').addClass(o,"fbEventsSuggestionRemovingItem");c('DOM').insertAfter(o,m);if(n)c('DOM').insertBefore(o,n);new (c('Animation'))(o).to('opacity',0).duration(500).ondone(function(){c('CSS').hide(o);c('CSS').addClass(m,"fbEventsSuggestionShowingItem");c('CSS').show(m);c('DOM').remove(o);o=null;new (c('Animation'))(m).from('opacity',0).to('opacity',1).ondone(function(){if(n){c('DOM').remove(n);n=null;}m.style.opacity=null;c('CSS').removeClass(m,"fbEventsSuggestionShowingItem");c('Arbiter').inform("EventSuggestion/insert");}).duration(300).ease(c('Animation').ease.end).show().go();}.bind(this)).ease(c('Animation').ease.end).hide().go();},_removeItem:function k(l){var m=c('$')(l);c('DOM').remove(m);},_clearEmptyCard:function k(l){var m=c('$')(l),n=c('DOM').scry(m,"div.fbEventsSuggestionItem");if(n.length===0)n=c('DOM').scry(m,"li.fbEventsSuggestionItem");if(n.length===0)c('DOM').remove(m);},clearItems:function k(l,m){if(!this._eventsCache[l])return;this._eventsCache[l].fetching=false;while(this._replacementRequestCache[l].length>0){var n=this._replacementRequestCache[l].shift();this._removeItem(n.row_id);this.removeDisplayedEvent(n.eid);}this._clearEmptyCard(m);}};f.exports=j;}),null);
__d("XEventsSuggestionHideController",["XController"],(function a(b,c,d,e,f,g){f.exports=c("XController").create("\/events\/permalink\/related_event\/update\/",{removed_eid:{type:"Int",required:true},acontext:{type:"StringToStringMap",required:true},hide_type:{type:"String",required:true}});}),null);
__d('EventsSuggestionSync',['Arbiter','AsyncRequest','EventSuggestionFetcher','XEventsSuggestionHideController','EventSuggestionHideAction'],(function a(b,c,d,e,f,g){var h={init:function i(){c('Arbiter').subscribe('EventSuggestions/report',this.reportEvent.bind(this));},setData:function i(j,k,l,m){if(!this._data)this._data={};this._data[j]={removed_eid:j,row_id:m,filter_data:l,acontext:k};},setListener:function i(j,k){c('EventSuggestionFetcher').addDisplayedEvent(k);j.getMenu().subscribe('itemclick',function(l,m){switch(m.item.getValue()){case c('EventSuggestionHideAction').HIDE:this._hideItem(k,c('EventSuggestionHideAction').HIDE);this.replace(k);break;}}.bind(this));},reportEvent:function i(j,k){this._hideItem(k.eid,c('EventSuggestionHideAction').REPORT);this.replace(k.eid);},_hideItem:function i(j,k){if(!this._data||!this._data[j])return;var l=c('XEventsSuggestionHideController').getURIBuilder().setInt('removed_eid',this._data[j].removed_eid).setStringToStringMap('acontext',this._data[j].acontext).setString('hide_type',k).getURI();new (c('AsyncRequest'))(l).send();},replace:function i(j){if(!this._data||!this._data[j])return;c('EventSuggestionFetcher').replace(j,this._data[j].row_id,this._data[j],function(){this._removeEvent(j);}.bind(this));},_removeEvent:function i(j){if(this._data)delete this._data[j];}};f.exports=h;}),null);
__d('UpdateRelatedEvents',['csx','cx','Arbiter','AsyncRequest','EventSuggestionFetcher','EventSuggestionHideAction','XEventsSuggestionHideController','ge'],(function a(b,c,d,e,f,g,h,i){var j={init:function k(l,m,n){this._seedID=l;this._actionContext=m;this._data={};c('Arbiter').subscribe('EventSuggestions/report',this.reportEvent.bind(this));},setListener:function k(l,m,n,o){c('EventSuggestionFetcher').addDisplayedEvent(m);this._data[m]={removed_eid:m,seed_eid:this._seedID,row_id:n,filter_data:o,acontext:this._actionContext};l.getMenu().subscribe('itemclick',function(p,q){switch(q.item.getValue()){case c('EventSuggestionHideAction').HIDE:this._hideItem(m,c('EventSuggestionHideAction').HIDE);this.replace(m);break;}}.bind(this));},reportEvent:function k(l,m){this._hideItem(m.eid,c('EventSuggestionHideAction').REPORT);this.replace(m.eid);},_hideItem:function k(l,m){if(!this._data||!this._data[l])return;var n=c('XEventsSuggestionHideController').getURIBuilder().setInt('removed_eid',this._data[l].removed_eid).setStringToStringMap('acontext',this._data[l].acontext).setString('hide_type',m).getURI();new (c('AsyncRequest'))(n).send();},replace:function k(l){if(!this._data||!this._data[l])return;c('EventSuggestionFetcher').replace(l,this._data[l].row_id,this._data[l],function(){this._removeEvent(l);}.bind(this));},_removeEvent:function k(l){if(this._data)delete this._data[l];}};f.exports=j;}),null);
__d('EventSuggestionAction',['csx','cx','Animation','CSS','DOM','Event','EventActionSource','EventsSuggestionSync','EventSuggestionHideAction','UpdateRelatedEvents','$'],(function a(b,c,d,e,f,g,h,i){var j={_canShowNux:true,_xoutShowing:false,_reportDialogs:{eventData:{},dialogs:{}},_nux:{},_items:{},_timers:{},registerReportDialog:function k(l,m){l.subscribe(['show'],function(){this._reportDialogs.dialogs[m]={showing:true};this._stopRefresh(this._reportDialogs.eventData.eid,this._reportDialogs.eventData.source);}.bind(this));l.subscribe(['hide'],function(){this._reportDialogs.dialogs[m]={showing:false};this._startRefresh(this._reportDialogs.eventData.eid,this._reportDialogs.eventData.source);}.bind(this));},_isReportDialogShowing:function k(){for(var l in this._reportDialogs.dialogs)if(this._reportDialogs.dialogs.hasOwnProperty(l)&&this._reportDialogs.dialogs[l].showing)return true;return false;},addNux:function k(l,m){this._nux[m]=l;},registerXOutMenu:function k(l,m,n){l.getPopover().subscribe('hide',function(){this._xoutShowing=false;this._startRefresh(m,n);}.bind(this));l.getPopover().subscribe('show',function(){this._xoutShowing=true;this._stopRefresh(m,n);}.bind(this));l.getMenu().subscribe('itemclick',function(o,p){switch(p.item.getValue()){case c('EventSuggestionHideAction').REPORT:this._reportDialogs.eventData={eid:m,source:n};break;}}.bind(this));},addButton:function k(l,m,n,o){if(!this._items[o]){this._items[o]={};this._timers[o]={};}c('Event').listen(l,'click',function(){var p=this._items[o][n];if(!p){p=c('DOM').find(l,"^.fbEventsSuggestionItem");this._items[o][n]=p;}if(m==='watch'||m==='join'||m==='save'||m==='maybe'){c('CSS').addClass(p,"fbEventsSuggestionFadingItem");var q=null;if(m==='maybe'){c('CSS').addClass(p,"fbEventsSuggestionMaybedItem");q=".fbEventsSuggestionImageMaybeOverlay";}if(m==='join'){c('CSS').addClass(p,"fbEventsSuggestionJoinedItem");q=".fbEventsSuggestionImageJoinedOverlay";}if(m==='watch'){c('CSS').addClass(p,"fbEventsSuggestionWatchedItem");q=".fbEventsSuggestionImageWatchedOverlay";}if(m==='save'){c('CSS').addClass(p,"fbEventsSuggestionSavedItem");q=".fbEventsSuggestionImageSavedOverlay";}if(q)this.easeInImageOverlay(p,q);}else{c('CSS').removeClass(p,"fbEventsSuggestionFadingItem");if(this._timers[o][n]){clearTimeout(this._timers[o][n]);delete this._timers[o][n];}}c('Event').listen(p,'mouseout',function(){this._startRefresh(n,o);}.bind(this));c('Event').listen(p,'mouseover',function(){this._stopRefresh(n,o);}.bind(this));}.bind(this));},_startRefresh:function k(l,m){if(!this._items[m])return;var n=this._items[m][l];if(!n||this._xoutShowing)return;if(this._isReportDialogShowing()&&this._reportDialogs.eventData.eid===l)return;var o=this._nux[m],p=!o||!o.isShown();if(c('CSS').matchesSelector(n,".fbEventsSuggestionFadingItem")&&p)this._timers[m][l]=setTimeout(function(){this.refreshItem(l,m);}.bind(this),3600);},_stopRefresh:function k(l,m){if(this._timers[m]&&this._timers[m][l]){clearTimeout(this._timers[m][l]);delete this._timers[m][l];}},refreshItem:function k(l,m){var n=null;if(m===c('EventActionSource').EVENT_DASHBOARD_SUGGESTION_UPCOMING||m===c('EventActionSource').EVENT_DASHBOARD_SUGGESTION_PAST||m===c('EventActionSource').EVENT_DASHBOARD_SUGGESTION_BIRTHDAYS||m===c('EventActionSource').EVENT_SUGGESTION){n=c('UpdateRelatedEvents');}else if(m===c('EventActionSource').EVENT_BOTTOM_SUGGESTION||m===c('EventActionSource').DASHBOARD_FRIEND_EVENT||m===c('EventActionSource').DASHBOARD_RELATED_EVENT||m===c('EventActionSource').DASHBOARD_POPULAR_EVENT){n=c('EventsSuggestionSync');}else if(m===c('EventActionSource').DASHBOARD_SUBSCRIBED_CARD)if(this._items[m]&&this._items[m][l]){c('DOM').remove(this._items[m][l]);delete this._items[m][l];}if(!n)return;n.replace(l);},easeInImageOverlay:function k(l,m){var n=c('DOM').find(l,".fbEventsSuggestionImageOverlay"),o=c('DOM').find(l,m);new (c('Animation'))(n).from('opacity',0).to('opacity',1).duration(200).ondone(function(){c('CSS').show(n);n.style.opacity=null;new (c('Animation'))(o).from('opacity',0).to('opacity',1).duration(200).ondone(function(){c('CSS').show(o);o.style.opacity=null;}).ease(c('Animation').ease.end).show().go();}).ease(c('Animation').ease.end).show().go();},swapItem:function k(l,m,n){var o=c('$')(l),p=c('$')(m);c('CSS').addClass(o,"fbEventsSuggestionRemovingItem");if(n)c('DOM').insertBefore(o,n);new (c('Animation'))(o).to('opacity',0).duration(500).ondone(function(){c('CSS').hide(o);c('CSS').addClass(p,"fbEventsSuggestionShowingItem");c('CSS').show(p);c('DOM').remove(o);o=null;new (c('Animation'))(p).from('opacity',0).to('opacity',1).ondone(function(){p.style.opacity=null;if(n){c('DOM').remove(n);n=null;}c('CSS').removeClass(p,"fbEventsSuggestionShowingItem");}).duration(300).ease(c('Animation').ease.end).show().go();}.bind(this)).ease(c('Animation').ease.end).hide().go();},clearEmptyCard:function k(l){var m=c('$')(l),n=c('DOM').scry(m,"div.fbEventsSuggestionItem");if(n.length===0)n=c('DOM').scry(m,"li.fbEventsSuggestionItem");if(n.length===0)c('DOM').remove(m);}};f.exports=j;}),null);
__d("EventSuggestionXOutMenuController",[],(function a(b,c,d,e,f,g){function h(i,j){"use strict";this.$EventSuggestionXOutMenuController1=i;this.$EventSuggestionXOutMenuController2=j;}h.prototype.getMenu=function(){"use strict";return this.$EventSuggestionXOutMenuController1;};h.prototype.getPopover=function(){"use strict";return this.$EventSuggestionXOutMenuController2.getPopover();};f.exports=h;}),null);
__d('EventDiscoverSeeAllButtonLogger',['EventsActionsLogger'],(function a(b,c,d,e,f,g){var h={register:function i(j,k,l){j.addEventListener('click',function(){c('EventsActionsLogger').log(null,{type:c('EventsActionsLogger').Type.CLICK,target:c('EventsActionsLogger').Target.SEE_ALL_BUTTON,acontext:JSON.parse(k)},JSON.parse(l));});}};f.exports=h;}),null);
__d('EventInviteFeedback',['Arbiter','Animation','ge'],(function a(b,c,d,e,f,g){var h={init:function i(){c('Arbiter').subscribe('EventInviteFeedback/timeoutInviteeFeedback',this.timeoutInviteeFeedback.bind(this));},timeoutInviteeFeedback:function i(j){new (c('Animation'))(c('ge')('event_invite_feedback')).to('backgroundColor','#ffffff').to('borderColor','#ffffff').duration(2000).go();}};f.exports=h;}),null);
__d('EventSuggestionsShow',['DOM','CSS','Arbiter'],(function a(b,c,d,e,f,g){var h={init:function i(j){this._list=j.list;this._count=j.count;this._body=j.body;this._initNum=j.init_num;this._expendNum=j.expend_num;this._displayNum=this._initNum;if(this._moreLink)this._moreLink.addEventListener("click",function(){this._displayNum=this._expendNum;var k=0;c('DOM').scry(this._list,'li','stat_elem').forEach(function(l){if(k++<this._displayNum)c('CSS').removeClass(l,'hidden_elem');},this);c('CSS').addClass(this._moreLink,'hidden_elem');if(this._allLink)c('CSS').removeClass(this._allLink,'hidden_elem');}.bind(this));c('Arbiter').subscribe('EventSuggestionsShow/updateEventInvitee',this.updateEventInvitee.bind(this));},addLink:function i(j,k){this._moreLink=j;this._allLink=k;},updateEventInvitee:function i(j,k){var l=c('DOM').scry(this._list,'li','');k.uid.forEach(function(n){for(var o=0;o<l.length;o++)if('suggestion_'+n==l[o].id){l[o].remove();this._count--;break;}},this);if(this._count===0){c('CSS').addClass(this._body,'hidden_elem');return;}var m=0;c('DOM').scry(this._list,'li','stat_elem').forEach(function(n){if(m++<this._displayNum)c('CSS').removeClass(n,'hidden_elem');},this);if(this._link&&this._count<=this._initNum)c('CSS').addClass(this._link,'hidden_elem');}};f.exports=h;}),null);
__d('TypeaheadEventInviteRenderer',['TypeaheadView','CSS'],(function a(b,c,d,e,f,g){var h,i;h=babelHelpers.inherits(j,c('TypeaheadView'));i=h&&h.prototype;j.prototype.init=function(){'use strict';c('CSS').addClass(this.getElement(),'uiTypeaheadView');i.init.call(this);};j.prototype.select=function(k){'use strict';if(!c('CSS').hasClass(this.selected,'nonInvitable'))i.select.call(this,k);};function j(){'use strict';h.apply(this,arguments);}f.exports=j;}),null);
__d('EventsDesktopTypeaheadInviteFriend',['Arbiter'],(function a(b,c,d,e,f,g){function h(j){'use strict';this.typeahead=j;c('Arbiter').subscribe('EventsDesktopTypeaheadInviteFriend/updateEventInvitee',this.resetTypeaheadCaches.bind(this));}h.prototype.resetTypeaheadCaches=function(j,k){'use strict';if(this.typeahead){var l=this.typeahead.getData(),m=k.uids;for(var n=0;n<m.length;n++){var o=l.getEntry(m[n].toString());if(o){o.status=k.status;l.setEntry(m[n].toString(),o);}}this.typeahead.getCore().subscribe('focus',l.bootstrap.bind(l));}};function i(j){new h(j);}f.exports.init=i;}),null);
__d('TypeaheadDisableOnSelect',['CSS','DOMQuery','Event','SubscriptionsHandler'],(function a(b,c,d,e,f,g){function h(i){'use strict';this._typeahead=i;this._subscriptions=new (c('SubscriptionsHandler'))();}h.prototype.enableTypeahead=function(){'use strict';var i=this._typeahead.getCore().getElement();i.removeAttribute('disabled');};h.prototype.disableTypeahead=function(){'use strict';var i=this._typeahead.getCore().getElement();i.setAttribute('disabled','disabled');};h.prototype.enable=function(){'use strict';this._subscriptions.addSubscriptions(this._typeahead.getCore().subscribe('select',this.disableTypeahead.bind(this)),this._typeahead.getCore().subscribe('unselect',this.enableTypeahead.bind(this)));if(this._typeahead.getCore().getHiddenValue())this.disableTypeahead();if(c('CSS').hasClass(this._typeahead.getElement(),'uiClearableTypeahead'))this._subscriptions.addSubscriptions(c('Event').listen(c('DOMQuery').find(this._typeahead.getElement(),'.clear'),'click',function(){this.enableTypeahead();}.bind(this),c('Event').Priority.URGENT));};h.prototype.disable=function(){'use strict';this._subscriptions.release();this.enableTypeahead();};f.exports=h;}),null);
__d('EventInviteSearchTypeaheadRenderer',['DOM','TypeaheadFacepile'],(function a(b,c,d,e,f,g){function h(i,j){var k=[];if(i.xhp)return c('DOM').create('li',{className:'raw'},i.xhp);var l=i.photos||i.photo;if(l){if(l instanceof Array){l=c('TypeaheadFacepile').render(l);}else l=c('DOM').create('img',{alt:'',src:l});k.push(l);}if(i.text){var m=[i.text];k.push(c('DOM').create('span',{className:'text'},m));}if(i.status){var n=[i.status];k.push(c('DOM').create('span',{className:'status'},n));}var o='';if(i.status==null){o=c('DOM').create('li',{className:i.type||''},k);}else o=c('DOM').create('li',{className:'nonInvitable'},k);if(i.text)o.setAttribute('aria-label',i.text);return o;}h.className='eventInviteTypeahead';f.exports=h;}),null);