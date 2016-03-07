/**
 * @fileOverview 组件内部属性
 * @author HISAME SHIZUMARU
 * @version
 * Created on 16/3/5.
 */


var attrs = {

	searchMenuData: {

		//isShowHeader: false,  //UI层变化交由使用者自行控制

		//isShowFooter: true,   //UI层变化交由使用者自行控制

		isReady: false, //指searchMenu容器元素还没有被插入到界面上, 只有第一次才会返回false

		recommendKeywordDataList: []
	},

	recommendKeywordDataList: [],

	historySearchedKeywordCacheList: [],

	historyKeywordCacheList: [],

	historyRecommendKeywordCache: {},

	searchInputValue: undefined,

	recommendKeyword: undefined,

	xhr: null,

	defered: null,

	allowFocusOut: true,

	focusState: false,

	displayState: false,

	recommendItemsCount: 0,

	searchItemIndex: -1,

	$searchMenu: null

};

module.exports = attrs;