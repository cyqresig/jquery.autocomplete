/**
 * @fileOverview 组件公开配置
 * @author HISAME SHIZUMARU
 * @version
 * Created on 16/3/5.
 */


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

	onSearchMenuDisplayStateChange: $.noop,

	onSetSearchMenuData: $.noop,

	onSearch: $.noop,

	onSelect: $.noop,

	$searchInput: null,

	template: $.noop,

	onTemplate: $.noop,
};

module.exports = options;