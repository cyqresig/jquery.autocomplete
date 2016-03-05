/**
 * @fileOverview 组件业务逻辑
 * @author HISAME SHIZUMARU
 * @version
 * Created on 16/3/5.
 */

var attrs = require('./attrs');

var service = {

	toogleSearchMenuDisplayState: function() {

		//var displayAction = attrs.displayState ? 'hide' : 'show';

		//attrs.$searchMenu[displayAction]();   //UI层变化应移至对外回调中, 交给使用者自行处理

		attrs.displayState = !attrs.displayState;

		this.options.onSearchMenuDisplayStateChange.call(this);

	},

	selectSearchItem: function(keyCode) {

		service.setSearchItemIndex.call(this, keyCode);

		this.options.onSelect.call(this, attrs.recommendKeywordDataList[attrs.searchItemIndex], attrs.recommendKeyword);
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

			reverseLimit = attrs.recommendItemsCount - 1;

			vector = -1;
		}
		else {

			boundary = attrs.recommendItemsCount;

			reverseLimit = 0;

			vector = 1;
		}

		if(attrs.searchItemIndex == boundary) {

			attrs.searchItemIndex = reverseLimit;

		}
		else {

			attrs.searchItemIndex = attrs.searchItemIndex + vector * 1;

		}

	},

	//setSearchInputElementValue:  function() {
	//
	//	if(attrs.searchItemIndex == attrs.recommendItemsCount || attrs.searchItemIndex == -1) {
	//
	//		this.options.$searchInput.val(attrs.recommendKeyword);
	//
	//	}
	//	else {
	//
	//		this.options.$searchInput.val(attrs.recommendKeywordDataList[searchItemIndex].keyword);
	//
	//	}
	//
	//},



};

module.exports = service;