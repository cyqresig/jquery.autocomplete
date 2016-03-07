/**
 * @fileOverview 初始化autocomplete组件
 * @author HISAME SHIZUMARU
 * @version
 * Created on 16/3/7.
 */



require.ensure('./../src/autocomplete', function(require) {

	var AutoComplete = require('./../src/autocomplete');

	//local
	var localData = {

		'淘': [
			{
				keyword: '淘宝进货'
			},
			{
				keyword: '淘宝打包'
			},
			{
				keyword: '淘宝装修'
			},
			{
				keyword: '淘宝胶带'
			},
			{
				keyword: '淘宝纸箱'
			},
			{
				keyword: '淘宝开店教程'
			},
			{
				keyword: '淘宝店铺装修'
			},
			{
				keyword: '淘宝店铺装修模板'
			},
			{
				keyword: '淘宝电影'
			},
			{
				keyword: '淘抢购'
			}
		],

		'淘宝': [
			{
				keyword: '淘宝胶带'
			},
			{
				keyword: '淘宝美工'
			},
			{
				keyword: '淘宝推广'
			},
			{
				keyword: '淘宝电影'
			},
			{
				keyword: '淘宝纸箱'
			},
			{
				keyword: '淘宝装修'
			},
			{
				keyword: '淘宝开店教程'
			},
			{
				keyword: '淘宝店铺装修'
			},
			{
				keyword: '淘宝店铺装修模板'
			},
			{
				keyword: '淘宝代运营'
			},
		],

		'淘宝宝': [
			{
				keyword: '淘宝宝贝详情页模板'
			},
			{
				keyword: '淘宝宝贝主图'
			},
			{
				keyword: '淘宝宝贝拍摄'
			},
			{
				keyword: '淘宝宝贝主图设计'
			},
			{
				keyword: '淘宝宝贝上架'
			},
			{
				keyword: '淘宝宝贝模板'
			},
			{
				keyword: '淘宝宝贝描述设计'
			},
			{
				keyword: '淘宝宝贝详情'
			},
			{
				keyword: '淘宝宝贝详情页设计'
			},
			{
				keyword: '淘宝宝贝拍照'
			},
		]

	};

	var instance = new AutoComplete({

		localData: localData,

		$searchInput: $('#s')

	});


	//remote

});