/**
 * @fileOverview 组件事件处理
 * @author HISAME SHIZUMARU
 * @version
 * Created on 16/3/5.
 */

var util = require('./util');
var attrs = require('./attrs');
var service = require('./service');

var handler = {

	onInputHandler: function() {


	},

	onClickHandler: function() {


	},

	onFoucsInHandler: function() {

		//1. *一个单行文本框*`search-input`*当前focus状态*`focusState`赋值为true
		attrs.focusState = true;

	},

	onFocusOutHandler: function() {

		//1.  *一个单行文本框*`search-input`*当前focus状态*`focusState`赋值为false
		attrs.focusState = false;

		//1.  [判断]*一个填充搜索推荐层*`search-menu`*当前显示状态*`displayState`为true

			//1.  [结束]隐藏*一个填充搜索推荐层*`search-menu`

			//2.  *一个填充搜索推荐层*`search-menu`*当前显示状态*`displayState`赋值为false
		service.toogleSearchMenuDisplayState.call(this);

	},

	onKeyDownHandler: function(e) {

		var keyCode = e.keyCode;

		switch(keyCode) {

			case '27':
				//1.  ESC: 27

				//1.  [判断]*一个填充搜索推荐层*`search-menu`*当前显示状态*`displayState`为true

					//1.  [结束]隐藏*一个填充搜索推荐层*`search-menu`

					//2.  *一个填充搜索推荐层*`search-menu`*当前显示状态*`displayState`赋值为false
				service.toogleSearchMenuDisplayState.call(this);

				break;

			case '13':
				//2.  RETURN: 13

				//1.  [判断]*提交搜索事件 -> 回调函数*`onSearch`是否存在

				//    1.  执行`onSearch`
				this.options.onSearch(this, attrs.recommendKeywordDataList[attrs.searchItemIndex], attrs.recommendKeyword);

				break;

			case '38':
				//4.  UP: 38

				//1.  [判断]*一个单行文本框*`search-input`*当前focus状态*`focusState`为true
				if(attrs.focusState) {
					/*
					1.  [判断]*一个单行文本框*`search-input`*当前focus状态*`focusState`为true

						1.  [分支]*一个填充搜索推荐层*`search-menu`*当前显示状态*`displayState`为false

							1.  *当前选择/停留的搜索项index*`searchItemIndex`赋值为*推荐搜索项count*`recommendItemsCount` (最后一项+1)

							1.  显示*一个填充搜索推荐层*`search-menu`

		                    2.  *一个填充搜索推荐层*`search-menu`*当前显示状态*`displayState`赋值为true

						2.  [分支]*一个填充搜索推荐层*`search-menu`*当前显示状态*`displayState`为true

							1.  [分支]*当前选择/停留的搜索项index*`searchItemIndex`的值等于-1

								1.  *当前选择/停留的搜索项index*`searchItemIndex`赋值为*推荐搜索项count*`recommendItemsCount`-1

							2.  [分支]*当前选择/停留的搜索项index*`searchItemIndex`的值不等于-1

								1.  *当前选择/停留的搜索项index*`searchItemIndex`赋值为旧值-1

							3.  [分支2]*当前选择/停留的搜索项index*`searchItemIndex`的值等于*推荐搜索项count*`recommendItemsCount` 或者 等于 -1

								1.  *一个单行文本框*`search-input`*输入文本值*`searchInputValue` 赋值为 *推荐搜索关键词*`recommendKeyword`

	                        4.  [分支2]*当前选择/停留的搜索项index*`searchItemIndex`的值不等于*推荐搜索项count*`recommendItemsCount` 或者 不等于 -1

								1.  *一个单行文本框*`search-input`*输入文本值*`searchInputValue` 赋值为 *search-menu-content的赋值数据源*`recommendKeywordDataList`的第`searchItemIndex`项的keyword值

							5.  [判断]*切换推荐搜索项事件 -> 回调函数*`onSelect`是否存在

								1.  执行`onSelect`
					*/
					if(!attrs.displayState) {

						service.toogleSearchMenuDisplayState.call(this);

						service.selectSearchItem.call(this, keyCode);

					}


				}





			//case '37':
			//	//LEFT: 37
			//
			//	break;
			//
			//case '39':
			//	//RIGHT: 39
			//
			//	break;
			//

		}

	},


};

module.exports = handler;