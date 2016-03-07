/**
 * @fileOverview 组件公开配置
 * @author HISAME SHIZUMARU
 * @version
 * Created on 16/3/5.
 */

var template = require('./search-menu.ejs');

var events = require('./events');

var options = {

	remote: false,

	url: undefined,

	queryName: 'keyword',

	additionalQueryParams: null,

	localData: null,

	recommendFetchInterval: 10,

	isShowHeader: false,

	isShowFooter: true,

	maximumHistorySearchedKeywordCacheList: 10,

	maximumHistoryKeywordCacheList: 100,

	maximumRecommendKeywordDataList: 10,

	formatRecommendKeywordData: $.noop,

	onSearchMenuDisplayStateChange: onSearchMenuDisplayStateChange,

	onSetSearchMenuData: onSetSearchMenuData,

	onSearch: $.noop,

	onSelect: onSelect,

	$searchInput: null,

	template: template,

	onTemplate: onTemplate,

	searchItemSelector: '.search-item',

	searchItemSelectedSelector: '.selected'

};

function onSearchMenuDisplayStateChange() {

	var action;

	//上来$searchMenu还不会生成, 直到匹配了一次搜索结果后
	if(this._attrs.$searchMenu != null) {

		action = this._attrs.displayState ? 'show' : 'hide';

		this._attrs.$searchMenu[action]();

	}


}

function onSetSearchMenuData() {

	this._attrs.searchMenuData.isShowHeader = !this._attrs.recommendKeyword;

	this._attrs.searchMenuData.isShowFooter = true;

}


function onSelect(mouseEventType) {

	var selectedCssClass = this._options.searchItemSelectedSelector.replace('.', '');

	this._attrs.$searchMenu.find(this._options.searchItemSelector + this._options.searchItemSelectedSelector).removeClass(selectedCssClass);


	if(this._attrs.searchItemIndex == this._attrs.recommendItemsCount || this._attrs.searchItemIndex == -1) {

		this._options.$searchInput.val(this._attrs.recommendKeyword);

	}
	else {

		if(!mouseEventType) {

			this._attrs.recommendKeyword = this._attrs.recommendKeywordDataList[this._attrs.searchItemIndex].keyword;

			this._options.$searchInput.val(this._attrs.recommendKeyword);

			this._attrs.$searchMenu.find(this._options.searchItemSelector + ':eq('+ this._attrs.searchItemIndex +')').addClass(selectedCssClass);

		}
		else {

			if(mouseEventType == 'mouseenter') {

				this._attrs.$searchMenu.find(this._options.searchItemSelector + ':eq('+ this._attrs.searchItemIndex +')').addClass(selectedCssClass);

			}

		}

	}

}

function onTemplate(templateHtml) {

	var $body, that = this;

	if(that._attrs.$searchMenu == null) {

		$body = $(document.body);

		$body.append(templateHtml);

		that._attrs.$searchMenu = $('#' + that._attrs.searchMenuData.id);

	}
	else {

		that._attrs.$searchMenu.html(templateHtml);

	}

	if(!that._attrs.searchMenuData.isReady) {

		$.each(events.searchMenu, function(eventType, bindEvent) {

			bindEvent.call(that);

		});

		that._attrs.searchMenuData.isReady = true;

	}

}

module.exports = options;