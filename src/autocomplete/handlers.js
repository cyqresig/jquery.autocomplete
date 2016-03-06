/**
 * @fileOverview 组件事件处理
 * @author HISAME SHIZUMARU
 * @version
 * Created on 16/3/5.
 */

var util = require('./util');
var service = require('./service');

var handler = {

	searchInput: {

		onInputHandler: function() {


		},

		onClickHandler: function() {

			var recommendKeywordDataList;

			if(!this._attrs.recommendKeyword) {

				if(this._attrs.historySearchedKeywordCacheList.length > 0) {

					service.setSearchMenuData.call(this, this._attrs.historySearchedKeywordCacheList);

				}

			}
			else {

				if(~$.inArray(this._attrs.recommendKeyword, this._attrs.historyKeywordCacheList)) {

					recommendKeywordDataList = this._attrs.historyRecommendKeywordCache[this._attrs.recommendKeyword] || [];

					this._attrs.recommendItemsCount = recommendKeywordDataList.length;

					service.setSearchMenuData.call(this, this._attrs.historySearchedKeywordCacheList);

				}

			}

			if(!this._attrs.displayState) {

				service.toogleSearchMenu.call(this);

			}

			this._options.onTemplate.call(this, this._options.template(this._attrs.searchMenuData), this._attrs.$searchMenu);

		},

		onFoucsInHandler: function() {

			this._attrs.focusState = true;

		},

		onFocusOutHandler: function() {

			this._attrs.focusState = false;

			service.toogleSearchMenu.call(this);

		},

		onKeyDownHandler: function(e) {

			var keyCode = e.keyCode;

			switch(keyCode) {

				case '27':

					if(this._attrs.displayState) {

						service.toogleSearchMenu.call(this);

					}
					break;

				case '13':

					if(this._attrs.displayState) {

						service.toogleSearchMenu.call(this);

					}

					this._options.onSearch.call(this, this._attrs.recommendKeywordDataList[this._attrs.searchItemIndex], this._attrs.recommendKeyword);

					break;

				case '38':
				case '40':

					if(this._attrs.focusState) {

						if(!this._attrs.displayState) {

							service.toogleSearchMenu.call(this);

							service.resetSearchItemIndex.call(this, keyCode);

						}
						else {

							service.selectSearchItem.call(this, keyCode);

						}


					}
					break;

			}

		},

	},

	searchMenu: {

		onMouseEnterHandler: function(e) {

			var $searchItem = $(e.currentTarget);

			this._attrs.searchItemIndex = $searchItem.index();

			this._options.onSelect.call(this);

		},

		onMouseLeaveHandler: function() {

			this._options.onSelect.call(this);

		},

		onClickHandler: function() {

			if(this._attrs.displayState) {

				service.toogleSearchMenu.call(this);

			}

			this._options.onSearch.call(this, this._attrs.recommendKeywordDataList[this._attrs.searchItemIndex], this._attrs.recommendKeyword);

		}

	},

};

module.exports = handler;