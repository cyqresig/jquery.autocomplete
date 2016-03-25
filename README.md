# jquery.autocomplete
基于jquery的自动补全插件，常用于推荐搜索,

开发环境采用webpack-dev-server

## 运行环境

*   确保安装了nodejs环境

*   确保全局安装了gulp

*   将项目拉下来后, 根目录执行npm install

*   根目录执行gulp webpack:dev-server

*   打开浏览器, 输入localhost:9090/demo/autocomplete.html

##  [查看在线示例](http://www.vanadis.cn/demo/autocomplete.html)

## 配置项

* `remote`: 是否使用远程数据, 默认为false
*  `url`: 远程请求地址(当`remote`为true时必须指定)
* `timeout`: 远程请求超时时间,
* `dataType`: 远程请求返回数据格式, 默认为'json',
* `resultListKey`: 请求远程数据, 返回结果对应dataList数组的key, 默认为'list',
* `suggestKeyword`: search-menu-content的赋值数据源*`recommendKeywordDataList`*中对应显示推荐搜索词的字段名, 默认为'keyword',
* `suggestKeywordHtml`: search-menu-content的赋值数据源*`recommendKeywordDataList`*中对应显示推荐搜索词的字段的html内容, 默认为'keywordHtml',
* `queryName`: 对应搜索文本的请求参数名, 默认为'searchKey',
* `additionalQueryParams`: 附加请求参数对象, 默认为null,
* `localData`: 本地数据源, 默认为null, (当`remote`为false时必须指定)
* `recommendFetchInterval`: 允许触发一次获取搜索推荐数据动作最小间隔, 默认为100, (当`remote`为true时生效)
* `isShowHeader`: 头部区域块是否显示标识, 默认为false,
* `isShowFooter`: 尾部区域块是否显示标识, 默认为true,
* `maximumHistorySearchedKeywordCacheList`: 历史已提交搜索关键词缓存最大个数, 默认为100,
* `displayHistorySearchedKeywordCacheListCount`: 历史已提交搜索关键词显示个数, 默认为10,
* `maximumHistoryKeywordCacheList`: 历史未提交搜索关键词缓存最大个数, 默认100,
* `formatRecommendKeywordData`: 对每个推荐搜索返回结果集里指定的字段进行格式化, 返回格式化后的值 -> 回调函数
* `onSearchMenuDisplayStateChange`: 切换搜索菜单层显示状态事件 -> 回调函数
* `onSetSearchMenuData`: 设置完search-menu的赋值数据源事件
* `onSearch`: 提交搜索事件 -> 回调函数
* `onSelect`: 切换推荐搜索项事件 -> 回调函数
* `$searchInput`: 指定jquery获取的搜索文本框对象,
* `template`: 自定义模板解析生成方法
* `onTemplate`: 模板生成html后事件 -> 回调函数
* `searchItemSelector`: 每个推荐搜索项匹配的选择器, 默认为'.search-item',
* `searchMenuContentSelector`: 推荐搜索层*`search-menu`*的内容部分匹配的选择器, 默认为'.search-menu-content',
* `searchMenuCloseSelector``: 推荐搜索层*`search-menu`*的关闭按钮匹配的选择器, 默认为'.search-menu-close',
* `searchMenuHistoryDeleteSelector`: 推荐搜索层*`search-menu`*的历史已提交搜索记录的删除按钮匹配的选择器, 默认为'.search-menu-history-delete',
* `searchItemSelectedSelector`: 被选中的那个推荐搜索项匹配的选择器, 默认为'.selected'

## 简单使用

### 页面元素
```html
<div class="container">

    <h1>autocomplete组件示例演示</h1>

        <div class="form-group">

            <label for="s1" class="control-label">本地数据: (可匹配'淘','淘宝','淘宝宝')</label>

            <div >

                <input id="s1" type="text" class="form-control" placeholder="请输入搜索词">

            </div>

        </div>

        <div class="form-group">

            <label for="s2" class="control-label">远程数据: (可匹配'淘','淘宝','淘宝宝')</label>

            <div>

                <input id="s2" type="text" class="form-control" placeholder="请输入搜索词">

            </div>

        </div>

</div>
```

### 默认模板
```template
<%if(!searchMenuData.isReady) { %>
<div id="<%=searchMenuData.id%>" class="search-menu" style="visibility: hidden;">
<% } %>

    <%if(searchMenuData.isShowHeader) { %>
        <div class="search-menu-header">
            最近搜索
        </div>
    <% } %>

    <div class="search-menu-content">
        <% searchMenuData.recommendKeywordDataList.forEach(function(data) { %>
            <div class="search-item">
                <%=data.keywordHtml%>
            </div>
        <% }) %>
    </div>

    <%if(searchMenuData.isShowFooter) { %>
        <div class="search-menu-footer">
            <a class="search-menu-close">关闭</a>
        </div>
    <% } %>

<%if(!searchMenuData.isReady) { %>
</div>
<% } %>
```

### javascript初始化
```javascript
 var AutoComplete = require('./../src/autocomplete');

 	//local
 	var instance_1 = new AutoComplete({

 		localData: localData,   //localData指json对象

 		$searchInput: $('#s1')

 	});


 	//remote
 	var instance_2 = new AutoComplete({

 		remote: true,

 		url: '/sug',

 		$searchInput: $('#s2'),

 		onSearch: function(recommendKeywordItem, recommendKeyword) {

 			alert('您已提交了搜索词: ' + recommendKeyword);

 		}

 	});
```