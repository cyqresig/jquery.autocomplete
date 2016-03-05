/**
 * @fileOverview 组件内部属性
 * @author HISAME SHIZUMARU
 * @version
 * Created on 16/3/5.
 */


var attrs = {

	searchMenuObject: {},

	recommendKeywordDataList: [],

	historySearchedKeywordCacheList: [],

	historyKeywordCacheList: [],

	historyRecommendKeywordCache: {},

	searchInputValue: undefined,

	recommendKeyword: undefined,

	xhr: null,

	defered: null,

	focusState: false,

	displayState: false,

	recommendItemsCount: 0,

	searchItemIndex: -1,

	$searchMenu: null,

};

module.exports = attrs;