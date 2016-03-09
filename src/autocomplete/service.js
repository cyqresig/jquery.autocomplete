/**
 * @fileOverview 组件业务逻辑
 * @author HISAME SHIZUMARU
 * @version
 * Created on 16/3/5.
 */
var utils = require('./utils');

var service = {

	toogleSearchMenu: function() {

		if(!this._attrs.displayState && this._attrs.recommendItemsCount == 0) {

			return;
		}

		service.toogleSearchMenuDisplayState.call(this);

		this._options.onSearchMenuDisplayStateChange.call(this);

	},

	toogleSearchMenuDisplayState: function() {

		this._attrs.displayState = !this._attrs.displayState;

	},

	selectSearchItem: function(keyCode) {

		service.setSearchItemIndex.call(this, keyCode);

		this._options.onSelect.call(this);
	},

	resetSearchItemIndex: function(keyCode) {
		/*反向边界线index值, up时recommendItemsCount, down时-1*/
		var reverseBoundary;

		if(keyCode == '38') {

			reverseBoundary = this._attrs.recommendItemsCount;

		}
		else {

			reverseBoundary = -1;

		}

		this._attrs.searchItemIndex = reverseBoundary;

	},

	setSearchItemIndex: function(keyCode) {
			/*边界线index值, up时-1, down时recommendItemsCount*/
		var boundary,
		/*反向的限制值, up时为down的最大index值recommendItemsCount-1, down时为up的最小index值0*/
			reverseLimit,
		/*index移动方向, up时为负1表示, down时为正1表示*/
			vector;


		if(keyCode == '38') {

			boundary = -1;

			reverseLimit = this._attrs.recommendItemsCount - 1;

			vector = -1;
		}
		else {

			boundary = this._attrs.recommendItemsCount;

			reverseLimit = 0;

			vector = 1;
		}

		if(this._attrs.searchItemIndex == boundary) {

			this._attrs.searchItemIndex = reverseLimit;

		}
		else {

			this._attrs.searchItemIndex = this._attrs.searchItemIndex + vector * 1;

		}

	},

	setSearchMenuData: function(dataList) {

		this._options.formatRecommendKeywordData.call(this, dataList, this._attrs.recommendKeyword);

		this._attrs.recommendKeywordDataList.length = 0;

		$.extend(true, this._attrs.recommendKeywordDataList, dataList);

		this._attrs.recommendItemsCount = this._attrs.recommendKeywordDataList.length;

		this._attrs.searchMenuData.recommendKeywordDataList = this._attrs.recommendKeywordDataList;

		if(!this._attrs.searchMenuData.id && this._attrs.recommendKeywordDataList.length > 0) {

			this._attrs.searchMenuData.id = utils.generateId();

		}

		this._options.onSetSearchMenuData.call(this);

	},

	getWrapHistorySearchedKeywordCacheList: function(historySearchedKeywordCacheList) {

		var that = this, wrapList = [], wrapObj;

		$.each(historySearchedKeywordCacheList, function(index, item) {

			wrapObj = {};

			wrapObj[that._options.suggestKeyword] = item;

			wrapList.push(wrapObj);

			if(index == that._options.displayHistorySearchedKeywordCacheListCount - 1) {

				return false;

			}

		});

		return wrapList;
	},

	setHistoryRecommendKeywordCache: function(recommendKeywordDataList, recommendKeyword) {

		if(!(recommendKeyword in this._attrs.historyRecommendKeywordCache)) {

			if(this._attrs.historyRecommendKeywordCacheList.length == this._options.maximumHistoryKeywordCacheList) {

				service.shiftHistoryRecommendKeywordCache.call(this);

			}

			this._attrs.historyRecommendKeywordCacheList.push(recommendKeyword);

			this._attrs.historyRecommendKeywordCache[recommendKeyword] = JSON.stringify(recommendKeywordDataList);

		}

	},

	shiftHistoryRecommendKeywordCache: function() {

		var recommendKeyword = this._attrs.historyRecommendKeywordCacheList.shift();

		delete this._attrs.historyRecommendKeywordCache[recommendKeyword];

	},

	abortXhr: function(xhr) {

		xhr.abort();

		service.destoryXhr();
	},


	destoryXhr: function(xhr) {

		xhr = null;

	},

	destoryDefered: function(defered) {

		clearTimeout(defered);

		defered = null;

	},

	setHistorySearchedKeywordCacheList: function() {

		if(this._attrs.recommendKeyword != '') {

			if(this._attrs.historySearchedKeywordCacheList.length == this._options.maximumHistorySearchedKeywordCacheList) {

				service.popHistorySearchedKeywordCacheList.call(this);

			}

			this._attrs.historySearchedKeywordCacheList.unshift(this._attrs.recommendKeyword);

		}

	},

	popHistorySearchedKeywordCacheList: function() {

		this._attrs.historySearchedKeywordCacheList.pop();

	},

	generateTemplate: function() {

		var templateHtml = this._options.template({

			searchMenuData: this._attrs.searchMenuData

		});

		this._options.onTemplate.call(this, templateHtml);
	},

	processResponse: function(dataList) {

		service.setHistoryRecommendKeywordCache.call(this, dataList, this._attrs.recommendKeyword);

		if(dataList.length > 0) {

			service.setSearchMenuData.call(this, dataList);

			service.generateTemplate.call(this);

			if(!this._attrs.displayState) {

				service.toogleSearchMenu.call(this);

			}

		}

	},

	processSearchHistory: function() {

		var wrapHistorySearchedKeywordCacheList;

		if(this._attrs.historySearchedKeywordCacheList.length > 0) {

			wrapHistorySearchedKeywordCacheList = service.getWrapHistorySearchedKeywordCacheList.call(this, this._attrs.historySearchedKeywordCacheList);

			service.setSearchMenuData.call(this, wrapHistorySearchedKeywordCacheList);

			service.generateTemplate.call(this);

			if(!this._attrs.displayState) {

				service.toogleSearchMenu.call(this);

			}

		}
		else {

			if(this._attrs.displayState) {

				service.toogleSearchMenu.call(this);

			}

		}

	}

};

module.exports = service;