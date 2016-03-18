/**
 * @fileOverview 组件公开配置
 * @author HISAME SHIZUMARU
 * @version
 * Created on 16/3/5.
 */

//var template = require('./search-menu.ejs');

//var utils = require('./utils');

//var events = require('./events');

var options = {

	remote: false,

	url: undefined,

	timeout: 3000,

	dataType: 'json',

	resultListKey: 'list',

	suggestKeyword: 'keyword',

	suggestKeywordHtml: 'keywordHtml',

	queryName: 'searchKey',

	additionalQueryParams: null,

	localData: null,

	recommendFetchInterval: 100,

	isShowHeader: false,

	isShowFooter: true,

	maximumHistorySearchedKeywordCacheList: 100,

	displayHistorySearchedKeywordCacheListCount: 10,

	maximumHistoryKeywordCacheList: 100,

	formatRecommendKeywordData: null, //formatRecommendKeywordData,

	onSearchMenuDisplayStateChange: null, //onSearchMenuDisplayStateChange,

	onSetSearchMenuData: null, //onSetSearchMenuData,

	onSearch: $.noop,

	onSelect: null, //onSelect,

	$searchInput: null,

	template: null, //template,

	onTemplate: null, //onTemplate,

	searchItemSelector: '.search-item',

	searchMenuContentSelector: '.search-menu-content',

	searchMenuCloseSelector: '.search-menu-close',

	searchMenuHistoryDeleteSelector: '.search-menu-history-delete',

	searchItemSelectedSelector: '.selected'

};

//function formatRecommendKeywordData(dataList, keyword) {
//
//	var suggestKeywordHtml = this._options.suggestKeywordHtml,
//		suggestKeyword = this._options.suggestKeyword;
//
//	$.each(dataList, function(index, item) {
//
//		var pattern;
//
//		if(keyword != '') {
//
//			pattern = '^(' + utils.escapeRegExChars(keyword) + ')(.*)$';
//
//			item[suggestKeywordHtml] = item[suggestKeyword].replace(new RegExp(pattern, 'gi'), '$1<b>$2<\/b>');
//
//		}
//		else {
//
//			item[suggestKeywordHtml] = '<span class="search-menu-history-key">'+ item[suggestKeyword] +'</span><a class="search-menu-history-delete">删除</a>';
//
//		}
//
//
//	});
//
//}

//function onSearchMenuDisplayStateChange() {
//
//	var action;
//
//	//上来$searchMenu还不会生成, 直到匹配了一次搜索结果后
//	if(this._attrs.$searchMenu != null) {
//
//		//action = this._attrs.displayState ? 'show' : 'hide';
//
//		action = this._attrs.displayState ? 'visible' : 'hidden';
//
//		this._attrs.$searchMenu.css('visibility', action);
//	}
//
//
//}

//function onSetSearchMenuData() {
//
//	this._attrs.searchMenuData.isShowHeader = !this._attrs.recommendKeyword;
//
//	this._attrs.searchMenuData.isShowFooter = true;
//
//}


//function onSelect(mouseEventType) {
//
//	var selectedCssClass = this._options.searchItemSelectedSelector.replace('.', '');
//
//	this._attrs.$searchMenu.find(this._options.searchItemSelector + this._options.searchItemSelectedSelector).removeClass(selectedCssClass);
//
//	this._attrs.watchValueChange = false;
//
//	if(this._attrs.searchItemIndex == this._attrs.recommendItemsCount || this._attrs.searchItemIndex == -1) {
//
//		//console.debug('this._attrs.recommendKeyword ' + this._attrs.recommendKeyword);
//
//		this._options.$searchInput.val(this._attrs.tempRecommendKeyword);
//
//	}
//	else {
//
//		if(!mouseEventType) {
//
//			this._attrs.recommendKeyword = this._attrs.recommendKeywordDataList[this._attrs.searchItemIndex].keyword;
//
//			this._options.$searchInput.val(this._attrs.recommendKeyword);
//
//			this._attrs.$searchMenu.find(this._options.searchItemSelector + ':eq('+ this._attrs.searchItemIndex +')').addClass(selectedCssClass);
//
//		}
//		else {
//
//			if(mouseEventType == 'mouseenter') {
//
//				this._attrs.$searchMenu.find(this._options.searchItemSelector + ':eq('+ this._attrs.searchItemIndex +')').addClass(selectedCssClass);
//
//			}
//
//		}
//
//	}
//
//	this._attrs.watchValueChange = true;
//
//}

//function onTemplate(templateHtml) {
//
//	var $body, that = this, offset;
//
//	if(that._attrs.$searchMenu == null) {
//
//		$body = $(document.body);
//
//		$body.append(templateHtml);
//
//		that._attrs.$searchMenu = $('#' + that._attrs.searchMenuData.id);
//
//	}
//	else {
//
//		that._attrs.$searchMenu.html(templateHtml);
//
//	}
//
//	offset = that._options.$searchInput.offset();
//
//	that._attrs.$searchMenu.css({
//
//		left: offset.left,
//
//		top: offset.top + that._options.$searchInput.outerHeight(),
//
//	});
//
//	if(!that._attrs.searchMenuData.isReady) {
//
//		$.each(events.searchMenu, function(eventType, bindEvent) {
//
//			bindEvent.call(that);
//
//		});
//
//		that._attrs.searchMenuData.isReady = true;
//
//	}
//
//}

module.exports = options;