/**
 * @fileOverview 组件业务逻辑
 * @author HISAME SHIZUMARU
 * @version
 * Created on 16/3/5.
 */

var service = {

	toogleSearchMenu: function() {

		service.toogleSearchMenuDisplayState.call(this);

		this._options.onSearchMenuDisplayStateChange.call(this);

	},

	toogleSearchMenuDisplayState: function() {

		//var displayAction = this._attrs.displayState ? 'hide' : 'show';

		//this._attrs.$searchMenu[displayAction]();   //UI层变化应移至对外回调中, 交给使用者自行处理

		this._attrs.displayState = !this._attrs.displayState;

	},

	selectSearchItem: function(keyCode) {

		service.setSearchItemIndex.call(this, keyCode);

		this._options.onSelect.call(this, this._attrs.recommendKeywordDataList, this._attrs.searchItemIndex, this._attrs.recommendKeyword);
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

		$.extend(this._attrs.recommendKeywordDataList, dataList);

		attr.searchMenuData.recommendKeywordDataList = this._attrs.recommendKeywordDataList;

		this._options.onSetSearchMenuData.call(this, attr.searchMenuData);

	},

	//setSearchInputElementValue:  function() {
	//
	//	if(this._attrs.searchItemIndex == this._attrs.recommendItemsCount || this._attrs.searchItemIndex == -1) {
	//
	//		this._options.$searchInput.val(this._attrs.recommendKeyword);
	//
	//	}
	//	else {
	//
	//		this._options.$searchInput.val(this._attrs.recommendKeywordDataList[searchItemIndex].keyword);
	//
	//	}
	//
	//},



};

module.exports = service;