/**
 * @fileOverview 组件公开配置
 * @author HISAME SHIZUMARU
 * @version
 * Created on 16/3/5.
 */

var template = require('./search-menu.ejs');

var options = {

	remote: false,

	url: undefined,

	paramName: 'query',

	params: null,

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

	searchItemSelector: '.searchItem',

	searchItemSelectedSelector: '.selected',

};

function onSearchMenuDisplayStateChange() {

	var action = this._attrs.displayState ? 'show' : 'hide';

	this._attrs.$searchMenu[action]();

}

function onSetSearchMenuData() {

	if(this._attrs.recommendKeyword) {

		this._attrs.searchMenuData.isShowHeader = false;

	}
	else {

		this._attrs.searchMenuData.isShowHeader = true;

	}
	this._attrs.searchMenuData.isShowFooter = true;

}


function onSelect(mouseEventType) {

	var selectedCssClass = this._options.searchItemSelectedSelector.replace('.', '');

	if(this._attrs.searchItemIndex == this._attrs.recommendItemsCount || this._attrs.searchItemIndex == -1) {

		this._options.$searchInput.val(this._attrs.recommendKeyword);

	}
	else {

		if(!mouseEventType) {


			this._options.$searchInput.val(this._attrs.recommendKeywordDataList[this._attrs.searchItemIndex].keyword);

			this._attrs.$searchMenu.find(':eq('+ this._attrs.searchItemIndex +')').addClass(selectedCssClass);

		}
		else {

			if(mouseEventType == 'enter') {

				this._attrs.$searchMenu.find(':eq('+ this._attrs.searchItemIndex +')').addClass(selectedCssClass);

			}

		}

	}

	this._attrs.$searchMenu.find(this._options.searchItemSelector + this._options.searchItemSelectedSelector).removeClass(selectedCssClass);


}

function onTemplate(templateHtml) {

	var $body = $(document.body);

	if(this._attrs.$searchMenu == null) {

		$body.append(templateHtml);

	}
	else {

		this._attrs.$searchMenu.html(templateHtml);

	}
}

module.exports = options;