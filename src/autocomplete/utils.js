/**
 * @fileOverview 公共方法(最终会合并至一处, 防止每个组件重复)
 * @author HISAME SHIZUMARU
 * @version
 * Created on 16/3/5.
 */

var prefix = 'c-autocomplete-';
var id = 1;

var util = {

	/**
	 * 生成组件所需唯一id
	 * @returns {string}
	 */
	generateId: function() {

		return prefix + id++;

	},

	debug: function(content) {

		if(console) {

			console.debug(content);

		}

	},

	escapeRegExChars: function (value) {

		return value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");

	}

};

module.exports = util;




