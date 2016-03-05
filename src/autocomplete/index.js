/**
 * @fileOverview 组件初始化, 定义实例, 引用css, 引用模板, 引用其他依赖模板
 * @author HISAME SHIZUMARU
 * @version
 * Created on 16/3/5.
 */


;'use strict';

//require('./autocomplete.css');            //UI层交给使用者自行处理
//var tpl = require('autocomplete.ejs')     //UI层交给使用者自行处理
var attrs = require('./attrs');
var defaults = require('./options');
var events = require('./events');


function AutoComplete(options) {

	this._options = $.extend({}, defaults, options);
	this._attrs = $.extend({}, attrs);

	events.init.call(this);

	return this;
}

//AutoComplete.prototype = {
//
//};

module.exports = AutoComplete;