/**
 * @fileOverview 模拟动态数据
 * @author HISAME SHIZUMARU
 * @version
 * Created on 16/3/8.
 */

var Mock = require('mockjs');

//%E6%B7%98 -> 淘
var remoteJSONData_tao = Mock.mock( /\/sug\?searchKey=%E6%B7%98$/, {

	// 属性 list 的值是一个数组，其中含有 1 到 10 个元素
	'list|1-10': [{
		'keyword': '淘' + '@ctitle'
	}]
});
//$.ajax({
//	url: '/demo/sug?',
//	dataType: 'json'
//}).done(function(data, status, jqXHR){
//	$('<pre>').text(JSON.stringify(data, null, 4))
//		.appendTo('body')
//})

//%E6%B7%98%E5%AE%9D -> 淘宝
var remoteJSONData_taobao = Mock.mock( /\/sug\?searchKey=%E6%B7%98%E5%AE%9D$/, {

	// 属性 list 的值是一个数组，其中含有 1 到 10 个元素
	'list|1-10': [{
		'keyword': '淘宝' + '@ctitle'
	}]
});

var remoteJSONData_taobaobao = Mock.mock( /\/sug\?searchKey=%E6%B7%98%E5%AE%9D%E5%AE%9D$/, {

	// 属性 list 的值是一个数组，其中含有 1 到 10 个元素
	'list|1-10': [{
		'keyword': '淘宝宝' + '@ctitle'
	}]
});

var remoteJSONData_all = Mock.mock( /\/sug/, {

	// 属性 list 的值是一个数组，其中含有 1 到 10 个元素
	'list': []
});

exports.remoteJSONData_tao = remoteJSONData_tao;
exports.remoteJSONData_taobao = remoteJSONData_taobao;
exports.remoteJSONData_taobaobao = remoteJSONData_taobaobao;
exports.remoteJSONData_all = remoteJSONData_all;


