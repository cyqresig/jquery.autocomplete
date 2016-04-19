/**
 * @fileOverview 组件初始化, 定义实例, 引用css, 引用模板, 引用其他依赖模板
 * @author HISAME SHIZUMARU
 * @version
 * Created on 16/3/5.
 */


;'use strict';

require('./autocomplete.less');
var template = require('./search-menu.ejs');
var attrs = require('./attrs');
var defaults = require('./options');
var events = require('./events');
var service = require('./service');


function AutoComplete(options) {

	var that = this;

	that._options = $.extend(true, {}, defaults, options);

	that._attrs = $.extend(true, {}, attrs);

	$.each(events.searchInput, function(eventType, bindEvent) {

		bindEvent.call(that);

	});

	$.each(that._options.searchTypeList, function(index, searchType) {

		that._attrs.searchTypeCache[searchType] = {

			historySearchedKeywordCacheList: [],

			historyRecommendKeywordCacheList: [],

			historyRecommendKeywordCache: {}

		}
	});

	that._attrs.events = events;  //临时传值

	that._options.$searchInput.attr('autocomplete', 'off');

	//check options, if error, throw custom Error
	//@todo
	that._options.formatRecommendKeywordData = that._options.formatRecommendKeywordData ? that._options.formatRecommendKeywordData : service.formatRecommendKeywordData;

	that._options.onSearchMenuDisplayStateChange = that._options.onSearchMenuDisplayStateChange ? that._options.onSearchMenuDisplayStateChange : service.onSearchMenuDisplayStateChange;

	that._options.onSetSearchMenuData = that._options.onSetSearchMenuData ? that._options.onSetSearchMenuData : service.onSetSearchMenuData;

	that._options.onSelect = that._options.onSelect ? that._options.onSelect : service.onSelect;

	that._options.onTemplate = that._options.onTemplate ? that._options.onTemplate : service.onTemplate;

	that._options.template = that._options.template ? that._options.template : template;

	//return that;
}

AutoComplete.prototype = {

	resetSearchMenuOffset: service.resetSearchMenuOffset

};

module.exports = AutoComplete;