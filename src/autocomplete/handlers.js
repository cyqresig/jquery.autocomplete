/**
 * @fileOverview 组件事件处理
 * @author HISAME SHIZUMARU
 * @version
 * Created on 16/3/5.
 */

var util = require('./utils');
var service = require('./service');

var handler = {

	searchInput: {

		onInputHandler: function() {

			var that, queryData, recommendKeywordDataList, wrapHistorySearchedKeywordCacheList;

			this._attrs.recommendKeyword = this._options.$searchInput.val().trim();

			if(!this._options.remote) {

				if(this._attrs.recommendKeyword == '') {

					if(this._attrs.displayState) {

						service.toogleSearchMenu.call(this);

					}

				}
				else {

					if(this._attrs.recommendKeyword in this._options.localData) {

						if(!$.isArray(this._options.localData[this._attrs.recommendKeyword])) {

							throw new Error('localData每一项应是一个json格式的数组');

						}

						service.setSearchMenuData.call(this, this._options.localData[this._attrs.recommendKeyword]);

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

			}
			else {

				if(this._attrs.defered != null) {

					service.destoryDefered(this._attrs.defered);

				}
				if(this._attrs.xhr != null) {

					service.abortXhr(this._attrs.xhr);

				}

				if(this._attrs.recommendKeyword == '') {

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
				else {

					if(this._attrs.recommendKeyword in this._attrs.historyRecommendKeywordCache) {


						recommendKeywordDataList = JSON.parse(this._attrs.historyRecommendKeywordCache[this._attrs.recommendKeyword]);

						if(recommendKeywordDataList.length > 0) {

							service.setSearchMenuData.call(this, recommendKeywordDataList);

							service.generateTemplate.call(this);

							if (!this._attrs.displayState) {

								service.toogleSearchMenu.call(this);

							}

						}

					}
					else {

						//if(this._attrs.displayState) {
						//
						//	service.toogleSearchMenu.call(this);
						//
						//}

						that = this;

						queryData = {};

						queryData[that._options.queryName] = encodeURIComponent(that._attrs.recommendKeyword);

						if($.isPlainObject(this._options.additionalQueryParams)) {

							$.extend(true, queryData, this._options.additionalQueryParams);
						}

						that._attrs.defered = setTimeout(function() {

							that.xhr = $.ajax({

								url: that._options.url,

								type: 'get',

								data: queryData,

								dataType: that._options.dataType,

								timeout: that._options.timeout,

								success: function(result) {

									var dataList = result[that._options.resultListKey];

									service.processResponse.call(that, dataList);

								},

								error: function(xhr, textStatus, errorThrown) {

									//throw new Error('jsonp请求失败');
									util.debug(xhr);

								},

								complete: function() {

									service.destoryXhr(that.xhr);
								}

							});


						}, this._options.recommendFetchInterval);


					}

				}



			}

		},

		onClickHandler: function() {

			var recommendKeywordDataList, wrapHistorySearchedKeywordCacheList;

			if(!this._attrs.recommendKeyword) {

				wrapHistorySearchedKeywordCacheList = service.getWrapHistorySearchedKeywordCacheList.call(this, this._attrs.historySearchedKeywordCacheList);

				service.setSearchMenuData.call(this, wrapHistorySearchedKeywordCacheList);

			}
			else {

				if(this._attrs.recommendKeyword in this._attrs.historyRecommendKeywordCache) {

					recommendKeywordDataList = JSON.parse(this._attrs.historyRecommendKeywordCache[this._attrs.recommendKeyword]);

				}

				service.setSearchMenuData.call(this, recommendKeywordDataList);

			}


			if(this._attrs.recommendItemsCount > 0) {

				service.generateTemplate.call(this);

				if(!this._attrs.displayState) {

					service.toogleSearchMenu.call(this);

				}

			}

		},

		onFoucsInHandler: function() {

			this._attrs.focusState = true;

		},

		onFocusOutHandler: function() {

			if(this._attrs.allowFocusOut) {

				this._attrs.focusState = false;

				if(this._attrs.displayState) {

					service.toogleSearchMenu.call(this);

				}

			}

		},

		onKeyDownHandler: function(e) {

			var keyCode = e.keyCode;

			switch(keyCode) {

				case 27:

					if(this._attrs.displayState) {

						service.toogleSearchMenu.call(this);

					}
					break;

				case 13:

					if(this._attrs.displayState) {

						service.toogleSearchMenu.call(this);

					}

					if(this._options.remote) {

						service.setHistorySearchedKeywordCacheList.call(this);

					}

					this._options.onSearch.call(this, this._attrs.recommendKeywordDataList[this._attrs.searchItemIndex], this._attrs.recommendKeyword);

					break;

				case 38:
				case 40:

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

		}

	},

	searchMenu: {

		onMouseEnterHandler: function(e) {

			var $searchItem = $(e.currentTarget);

			this._attrs.searchItemIndex = $searchItem.index();

			this._options.onSelect.call(this, 'mouseenter');

			this._attrs.allowFocusOut = false;

		},

		onMouseLeaveHandler: function() {

			this._attrs.searchItemIndex = 0;

			this._options.onSelect.call(this, 'mouseleave');

			this._attrs.allowFocusOut = true;

		},

		onClickHandler: function(e) {

			var $searchItem = $(e.currentTarget);

			this._attrs.searchItemIndex = $searchItem.index();

			this._options.onSelect.call(this);

			if(this._attrs.displayState) {

				service.toogleSearchMenu.call(this);

			}

			if(this._options.remote) {

				service.setHistorySearchedKeywordCacheList.call(this);

			}

			this._options.onSearch.call(this, this._attrs.recommendKeywordDataList[this._attrs.searchItemIndex], this._attrs.recommendKeyword);

		},

		onFooterClickHandler: function() {

			service.toogleSearchMenu.call(this);

		}

	}

};


module.exports = handler;