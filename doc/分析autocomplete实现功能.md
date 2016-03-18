
#   autocomplete 功能实现分析

> 功能分析参照了taobo首页的搜索框功能

##  确定实现功能所需的所有界面(按逻辑划分)

1.  *一个单行文本框*`search-input`

2.  *一个填充搜索推荐层*`search-menu`

    1. *头部区域块*`search-menu-header`

    2. *内容区域块*`search-menu-content`

        1.  *推荐搜索项区域块*`search-menu-item`

            1.  *推荐搜索文字区域块*`item-text`

            2.  *推荐搜索附加信息区域块*, 例如: *商品数量显示*`item-count`或者*历史提交搜索记录删除按钮*`search-menu-history-delete`

    3. *尾部区域块*`search-menu-footer`

        1. *关闭按钮*`search-menu-close`

## 确定实现功能所需的所有逻辑(按人机交互事件划分)

1. *一个单行文本框*`search-input`
    1.  `input`*事件*
    
        1.  获取*一个单行文本框*`search-input`的*输入文本值*`value`在移除首尾空白符后转化成*推荐搜索关键词*`recommendKeyword`

        1.  [分支]*是否使用远程数据*`remote`的值为false时,

            1.  [分支]当*推荐搜索关键词*`recommendKeyword`的值为空时,

                1.  [判断]*一个填充搜索推荐层*`search-menu`*当前显示状态*`displayState`为true

                       1.  [结束]执行`onSearchMenuDisplayStateChange` (处理UI层变化, 推荐搜索层的隐显)

                       2.  *一个填充搜索推荐层*`search-menu`*当前显示状态*`displayState`赋值(需要判断*推荐搜索项count*`recommendItemsCount`不为0)为false

            2.  [分支]当*推荐搜索关键词*`recommendKeyword`的值不为空时,

                1.  [分支]当*推荐搜索关键词*`recommendKeyword`被*本地数据源*`localData`中的关键词匹配时

                    1.  将值给*search-menu-content的赋值数据源*`recommendKeywordDataList`赋值 -> *本地数据源*`localData`匹配项

                    2.  *推荐搜索项count*`recommendItemsCount`赋值

                    2.  [废弃逻辑]*头部区域块是否显示标识*`isShowHeader`, 赋值为false, 以便模板中可以不显示出*头部区域块*`search-menu-header`

                    3.  给*search-menu的赋值数据源*`searchMenuData`的[key] `recommendKeywordDataList` 赋值

                2.  [分支]当*推荐搜索关键词*`recommendKeyword`被*本地数据源*`localData`中的关键词不匹配时

                     1.  [判断]*一个填充搜索推荐层*`search-menu`*当前显示状态*`displayState`为true

                            1.  [结束]执行`onSearchMenuDisplayStateChange` (处理UI层变化, 推荐搜索层的隐显)

                            2.  *一个填充搜索推荐层*`search-menu`*当前显示状态*`displayState`赋值(需要判断*推荐搜索项count*`recommendItemsCount`不为0)为false

                3.  将*search-menu的赋值数据源*`searchMenuData`传入配置的模板, 得到最终的html代码

                4.  将*一个填充搜索推荐层*`search-menu`内容替换

                5. *一个填充搜索推荐层*`search-menu`*当前显示状态*`displayState`为false

                    1.  [结束]执行`onSearchMenuDisplayStateChange` (处理UI层变化, 推荐搜索层的隐显)

                    2.  *一个填充搜索推荐层*`search-menu`*当前显示状态*`displayState`赋值(需要判断*推荐搜索项count*`recommendItemsCount`不为0)为true

        2.  [分支]*是否使用远程数据*`remote`的值为true时,

            1.  [判断]*延迟进行fetch数据请求对象*`defered`存在, 说明下一个请求即将开始, 需要阻止

                1.  中止延迟请求

                2.  *延迟进行fetch数据请求对象*`defered`赋值null

            2.  [判断]*fetch数据的请求对象*`xhr`存在, 说明请求正在进行中

                1.  中止请求

                2.  *fetch数据的请求对象*`xhr`赋值null

            1.  [分支]当*推荐搜索关键词*`recommendKeyword`的值为空时,

                1.  [分支]当已经存在*历史已提交搜索关键词缓存*`historySearchedKeywordCacheList`时

                    1.  给*search-menu-content的赋值数据源*`recommendKeywordDataList`赋值 -> *历史已提交搜索关键词缓存*`historySearchedKeywordCacheList`

                    2.  [废弃逻辑]*头部区域块是否显示标识*`isShowHeader`, 赋值为true, 以便模板中可以显示出*头部区域块*`search-menu-header`

                    3.  给*search-menu的赋值数据源*`searchMenuData`的[key] `recommendKeywordDataList` 赋值

                    3.  将*search-menu的赋值数据源*`searchMenuData`传入配置的模板, 得到最终的html代码

                    4.  将*一个填充搜索推荐层*`search-menu`内容替换

                    5. *一个填充搜索推荐层*`search-menu`*当前显示状态*`displayState`为false

                        1.  [结束]执行`onSearchMenuDisplayStateChange` (处理UI层变化, 推荐搜索层的隐显)

                        2.  *一个填充搜索推荐层*`search-menu`*当前显示状态*`displayState`赋值(需要判断*推荐搜索项count*`recommendItemsCount`不为0)为true

                2.  [分支][有效分支]当已经不存在*历史已提交搜索关键词缓存*`historySearchedKeywordCacheList`时

                    1.  *一个填充搜索推荐层*`search-menu`*当前显示状态*`displayState`为true

                        1.  [结束]执行`onSearchMenuDisplayStateChange` (处理UI层变化, 推荐搜索层的隐显)

                        2.  *一个填充搜索推荐层*`search-menu`*当前显示状态*`displayState`赋值(需要判断*推荐搜索项count*`recommendItemsCount`不为0)为false

            2.  [分支]当*推荐搜索关键词*`recommendKeyword`的值不为空时,

                1.  [分支]当*推荐搜索关键词*`recommendKeyword`被*历史未提交搜索关键词缓存*`historyKeywordCacheList`中的关键词匹配时

                    1.  获取*历史推荐搜索关键词 -> 返回的数据结果集*`historyRecommendKeywordCache`匹配键的值, 对值进行Json反序列化

                    2.  将值给*search-menu-content的赋值数据源*`recommendKeywordDataList`赋值

                    2.  *推荐搜索项count*`recommendItemsCount`赋值

                    2.  [废弃逻辑]*头部区域块是否显示标识*`isShowHeader`, 赋值为false, 以便模板中不显示出*头部区域块*`search-menu-header`

                    3.  给*search-menu的赋值数据源*`searchMenuData`的[key] `recommendKeywordDataList` 赋值

                    3.  将*search-menu的赋值数据源*`searchMenuData`传入配置的模板, 得到最终的html代码

                    4.  将*一个填充搜索推荐层*`search-menu`内容替换

                    5. *一个填充搜索推荐层*`search-menu`*当前显示状态*`displayState`为false

                        1.  [结束]执行`onSearchMenuDisplayStateChange` (处理UI层变化, 推荐搜索层的隐显)

                        2.  *一个填充搜索推荐层*`search-menu`*当前显示状态*`displayState`赋值(需要判断*推荐搜索项count*`recommendItemsCount`不为0)为true

                2.  [分支][有效分支]当*推荐搜索关键词*`recommendKeyword`被*历史未提交搜索关键词缓存*`historyKeywordCacheList`中的关键词不匹配时

                    1.  创建*fetch数据的请求对象*`xhr`curry

                    2.  创建并启动*延迟进行fetch数据请求对象*`defered`

                    >   该分支以下逻辑都在*fetch数据的请求对象*`xhr`的回调函数中进行

                     2.  将请求的返回json对象给*search-menu-content的赋值数据源*`recommendKeywordDataList`赋值

                     2.  [废弃逻辑]*头部区域块是否显示标识*`isShowHeader`, 赋值为false, 以便模板中不显示出*头部区域块*`search-menu-header`

                     3.  给*search-menu的赋值数据源*`searchMenuData`的[key] `recommendKeywordDataList` 赋值

                     3.  将*search-menu的赋值数据源*`searchMenuData`传入配置的模板, 得到最终的html代码

                     4.  将*一个填充搜索推荐层*`search-menu`内容替换

                     5. *一个填充搜索推荐层*`search-menu`*当前显示状态*`displayState`为false

                        1.  [结束]执行`onSearchMenuDisplayStateChange` (处理UI层变化, 推荐搜索层的隐显)

                        2.  *一个填充搜索推荐层*`search-menu`*当前显示状态*`displayState`赋值(需要判断*推荐搜索项count*`recommendItemsCount`不为0)为true

    2.  `click`*事件*

        1.  [分支]当*推荐搜索关键词*`recommendKeyword`的值为空时,

            1.  [分支]当已经存在*历史已提交搜索关键词缓存*`historySearchedKeywordCacheList`时

                1.  给*search-menu-content的赋值数据源*`recommendKeywordDataList`赋值 -> *历史已提交搜索关键词缓存*`historySearchedKeywordCacheList`

                2.  [废弃逻辑]*头部区域块是否显示标识*`isShowHeader`, 赋值为true, 以便模板中可以显示出*头部区域块*`search-menu-header`

                3.  给*search-menu的赋值数据源*`searchMenuData`的[key] `recommendKeywordDataList` 赋值

            2.  [分支][无效分支]当已经不存在*历史已提交搜索关键词缓存*`historySearchedKeywordCacheList`时

                1.  [判断]*一个填充搜索推荐层*`search-menu`*当前显示状态*`displayState`为true

                    1.  [结束]执行`onSearchMenuDisplayStateChange` (处理UI层变化, 推荐搜索层的隐显)

                    2.  *一个填充搜索推荐层*`search-menu`*当前显示状态*`displayState`赋值(需要判断*推荐搜索项count*`recommendItemsCount`不为0)为false

        2.  [分支]当*推荐搜索关键词*`recommendKeyword`的值不为空时,

            1.  [分支]当*推荐搜索关键词*`recommendKeyword`被*历史未提交搜索关键词缓存*`historyKeywordCacheList`中的关键词匹配时

                1.  获取匹配键的值, 对值进行Json反序列化

                2.  将值给*search-menu-content的赋值数据源*`recommendKeywordDataList`赋值

                3.  *推荐搜索项count*`recommendItemsCount`赋值

                3.  给*search-menu的赋值数据源*`searchMenuData`的[key] `recommendKeywordDataList` 赋值

            2.  [分支][无效分支]当*推荐搜索关键词*`recommendKeyword`被*历史未提交搜索关键词缓存*`historyKeywordCacheList`中的关键词不匹配时

                1.  [判断]*一个填充搜索推荐层*`search-menu`*当前显示状态*`displayState`为true

                    1.  [结束]执行`onSearchMenuDisplayStateChange` (处理UI层变化, 推荐搜索层的隐显)

                    2.  *一个填充搜索推荐层*`search-menu`*当前显示状态*`displayState`赋值(需要判断*推荐搜索项count*`recommendItemsCount`不为0)为false

        3.  将*search-menu的赋值数据源*`searchMenuData`传入配置的模板, 得到最终的html代码

        4.  将*一个填充搜索推荐层*`search-menu`内容替换

        5.  [判断]*一个填充搜索推荐层*`search-menu`*当前显示状态*`displayState`为false

            1.  [结束]执行`onSearchMenuDisplayStateChange` (处理UI层变化, 推荐搜索层的隐显)

            2.  *一个填充搜索推荐层*`search-menu`*当前显示状态*`displayState`赋值(需要判断*推荐搜索项count*`recommendItemsCount`不为0)为true

    3.  `foucsin` 事件

        1.  *一个单行文本框*`search-input`*当前focus状态*`focusState`赋值为true

    3. `focusout` 事件

        1.  *一个单行文本框*`search-input`*当前focus状态*`focusState`赋值为false

        1.  [判断]*一个填充搜索推荐层*`search-menu`*当前显示状态*`displayState`为true

            1.  [结束]执行`onSearchMenuDisplayStateChange` (处理UI层变化, 推荐搜索层的隐显)

            2.  *一个填充搜索推荐层*`search-menu`*当前显示状态*`displayState`赋值(需要判断*推荐搜索项count*`recommendItemsCount`不为0)为false

    4.  `keydown` 事件

        1.  ESC: 27

            1.  [判断]*一个填充搜索推荐层*`search-menu`*当前显示状态*`displayState`为true

                1.  [结束]执行`onSearchMenuDisplayStateChange` (处理UI层变化, 推荐搜索层的隐显)

                2.  *一个填充搜索推荐层*`search-menu`*当前显示状态*`displayState`赋值(需要判断*推荐搜索项count*`recommendItemsCount`不为0)为false

        2.  RETURN: 13

            1.  [判断]*一个填充搜索推荐层*`search-menu`*当前显示状态*`displayState`为true

                1.  [结束]执行`onSearchMenuDisplayStateChange` (处理UI层变化, 推荐搜索层的隐显)

                2.  *一个填充搜索推荐层*`search-menu`*当前显示状态*`displayState`赋值(需要判断*推荐搜索项count*`recommendItemsCount`不为0)为false

            1.  [判断]*提交搜索事件 -> 回调函数*`onSearch`是否存在

                1.  执行`onSearch`  处理提交搜索表单操作

        3.  LEFT: 37

        4.  UP: 38

            1.  [判断]*一个单行文本框*`search-input`*当前focus状态*`focusState`为true

                1.  [分支]*一个填充搜索推荐层*`search-menu`*当前显示状态*`displayState`为false

                    1.  *当前选择/停留的搜索项index*`searchItemIndex`赋值为*推荐搜索项count*`recommendItemsCount` (最后一项+1)

                    1.  执行`onSearchMenuDisplayStateChange` (处理UI层变化, 推荐搜索层的隐显)

                    2.  *一个填充搜索推荐层*`search-menu`*当前显示状态*`displayState`赋值(需要判断*推荐搜索项count*`recommendItemsCount`不为0)为true

                2.  [分支]*一个填充搜索推荐层*`search-menu`*当前显示状态*`displayState`为true

                    1.  [分支]*当前选择/停留的搜索项index*`searchItemIndex`的值等于-1

                        1.  *当前选择/停留的搜索项index*`searchItemIndex`赋值为*推荐搜索项count*`recommendItemsCount`-1

                    2.  [分支]*当前选择/停留的搜索项index*`searchItemIndex`的值不等于-1

                        1.  *当前选择/停留的搜索项index*`searchItemIndex`赋值为旧值-1

                    3.  [移至onSelect内处理][分支2]*当前选择/停留的搜索项index*`searchItemIndex`的值等于*推荐搜索项count*`recommendItemsCount` 或者 等于 -1

                        1.  *一个单行文本框*`search-input`*输入文本值*`searchInputValue` 赋值为 *推荐搜索关键词*`recommendKeyword`

                    4.  [移至onSelect内处理][分支2]*当前选择/停留的搜索项index*`searchItemIndex`的值不等于*推荐搜索项count*`recommendItemsCount` 或者 不等于 -1

                        1.  *一个单行文本框*`search-input`*输入文本值*`searchInputValue` 赋值为 *search-menu-content的赋值数据源*`recommendKeywordDataList`的第`searchItemIndex`项的keyword值

                    5.  [判断]*切换推荐搜索项事件 -> 回调函数*`onSelect`是否存在

                        1.  执行`onSelect` (处理UI层变化, 例如变更选中项的样式, 变更输入文本框中显示的推荐词)

        5.  RIGHT: 39

        6.  DOWN: 40

            1.  [判断]*一个单行文本框*`search-input`*当前focus状态*`focusState`为true

                1.  [分支]*一个填充搜索推荐层*`search-menu`*当前显示状态*`displayState`为false

                    1.  *当前选择/停留的搜索项index*`searchItemIndex`赋值为-1

                    1.  执行`onSearchMenuDisplayStateChange` (处理UI层变化, 推荐搜索层的隐显)

                    2.  *一个填充搜索推荐层*`search-menu`*当前显示状态*`displayState`赋值(需要判断*推荐搜索项count*`recommendItemsCount`不为0)为true

                2.  [分支]*一个填充搜索推荐层*`search-menu`*当前显示状态*`displayState`为true

                    1.  [分支]*当前选择/停留的搜索项index*`searchItemIndex`的值等于*推荐搜索项count*`recommendItemsCount`

                        1.  *当前选择/停留的搜索项index*`searchItemIndex`赋值为0

                    2.  [分支]*当前选择/停留的搜索项index*`searchItemIndex`的值不等于*推荐搜索项count*`recommendItemsCount`

                        1.  *当前选择/停留的搜索项index*`searchItemIndex`赋值为旧值+1

                    3.  [移至onSelect内处理][分支2]*当前选择/停留的搜索项index*`searchItemIndex`的值等于*推荐搜索项count*`recommendItemsCount` 或者 等于 -1

                        1.  *一个单行文本框*`search-input`*输入文本值*`searchInputValue` 赋值为 *推荐搜索关键词*`recommendKeyword`

                    4.  [移至onSelect内处理][分支2]*当前选择/停留的搜索项index*`searchItemIndex`的值不等于*推荐搜索项count*`recommendItemsCount` 或者 不等于 -1

                        1.  *一个单行文本框*`search-input`*输入文本值*`searchInputValue` 赋值为 *search-menu-content的赋值数据源*`recommendKeywordDataList`的第`searchItemIndex`项的keyword值

                    5.  [判断]*切换推荐搜索项事件 -> 回调函数*`onSelect`是否存在

                        1.  执行`onSelect` (处理UI层变化, 变更选中项的样式, 变更输入文本框中显示的推荐词)

2.  *一个填充搜索推荐层*`search-menu`

    1. `mouseenter`事件 (针对searchItem冒泡)

        1.  根据*每个推荐搜索项匹配的选择器*`searchItemSelector`, 获取到事件触发的searchItem的index,

        2.  *当前选择/停留的搜索项index*`searchItemIndex`赋值

        3.  [判断]*切换推荐搜索项事件 -> 回调函数*`onSelect`是否存在

            1.  执行`onSelect` (处理UI层变化, 变更选中项的样式, 变更输入文本框中显示的推荐词)

        4.  *是否允许`search-input`focusout事件触发*`allowFocusOut`赋值false

    2. `mouseleave`事件

        1.  *当前选择/停留的搜索项index*`searchItemIndex`赋值0

        2.  [判断]*切换推荐搜索项事件 -> 回调函数*`onSelect`是否存在

            1.  执行`onSelect` (处理UI层变化, 变更选中项的样式, 变更输入文本框中显示的推荐词)

         3.  *是否允许`search-input`focusout事件触发*`allowFocusOut`赋值true

    2.  `click`事件 (针对searchItem冒泡)

         1.  根据*每个推荐搜索项匹配的选择器*`searchItemSelector`, 获取到事件触发的searchItem的index,

         2.  *当前选择/停留的搜索项index*`searchItemIndex`赋值

         3.  [判断]*切换推荐搜索项事件 -> 回调函数*`onSelect`是否存在

             1.  执行`onSelect` (处理UI层变化, 变更选中项的样式, 变更输入文本框中显示的推荐词)

         1.  [判断]*一个填充搜索推荐层*`search-menu`*当前显示状态*`displayState`为true

             1.  [结束]执行`onSearchMenuDisplayStateChange` (处理UI层变化, 推荐搜索层的隐显)

             2.  *一个填充搜索推荐层*`search-menu`*当前显示状态*`displayState`赋值(需要判断*推荐搜索项count*`recommendItemsCount`不为0)为false

         1.  [判断]*提交搜索事件 -> 回调函数*`onSearch`是否存在

             1.  执行`onSearch`  处理提交搜索表单操作

3.  *关闭按钮*`search-menu-close`

    1. `click`事件

        1. `search-menu`的控制隐显

4.  *历史提交搜索记录删除按钮*`search-menu-history-delete`

    1.  'click'事件

        1.  删除该项历史提交搜索记录

        2.  处理操作后`search-menu-item`的UI变化

        3.  将焦点返回`search-input`

## 确定数据存储

1.  *search-menu的赋值数据源*`searchMenuData`(Object) 默认为空对象

    [key] `id`  默认未定义

    [key] `isShowHeader` 默认false

    [key] `isShowFooter` 默认true

    [key] `recommendKeywordDataList`

1.  *search-menu-content的赋值数据源*`recommendKeywordDataList`(Array\<Object>)   默认未定义

    其中Object部分

    [key] `keyword` 可以自定义指定这个key

2.  *历史已提交搜索关键词缓存*`historySearchedKeywordCacheList`(Array\<String>) 默认为空数组

3.  *历史未提交推荐搜索关键词缓存*`historyRecommendKeywordCacheList`(Array\<String>) 默认为空数组

4.  *历史未提交推荐搜索关键词 -> 返回的数据结果集*`historyRecommendKeywordCache`(Object) 默认为空对象

    key -> historyKeyword | value -> recommendKeywordDataList toJson


## 确定关键属性

1.  *一个单行文本框*`search-input`*输入文本值*`searchInputValue`(String) 默认未定义

2.  *推荐搜索关键词*`recommendKeyword`(String) 默认未定义

3.  *头部区域块是否显示标识*`isShowHeader`(Boolean) 默认false

4.  *尾部区域块是否显示标识*`isShowFooter`(Boolean) 默认true

5.  [公开]*历史已提交搜索关键词缓存最大个数*`maximumHistorySearchedKeywordCacheList`(Int) 默认为100

5.  [公开]*历史已提交搜索关键词显示个数*`displayHistorySearchedKeywordCacheListCount`(Int)默认为10

6.  [公开]*历史未提交搜索关键词缓存最大个数*`maximumHistoryKeywordCacheList`(Int) 默认为100

7.  [公开]*是否使用远程数据*`remote`(Boolean) 默认false (请求方式强制使用jsonp)

8.  [公开]*远程请求地址*`url`(String) 默认未定义 (当`remote`为true时必须指定)

9.  [公开]*对应搜索文本的请求参数名*`queryName`(String) 默认为'searchKey'

10. [公开]*附加请求参数对象*`additionalQueryParams`(Object) 默认null (需要支持实例修改)

11. [公开]*本地数据源*`localData`(Object) 默认null (当`remote`为false时必须指定)

    key -> keyword | value -> recommendKeywordDataList toJson

12. [公开]*对每个推荐搜索返回结果集里指定的字段进行格式化, 返回格式化后的值 -> 回调函数*`formatRecommendKeywordData`(Function) 默认为null

13. [公开]*允许触发一次获取搜索推荐数据动作最小间隔*`recommendFetchInterval`(Int) 默认为10(ms)

14. *fetch数据的请求对象*`xhr`(Object) 默认null 由jQuery.ajax创建

15. *延迟进行fetch数据请求对象*`defered`(Object) 默认null 由setTimeout创建

16. *一个单行文本框*`search-input`*当前focus状态*`focusState`(Boolean) 默认false

17. *一个填充搜索推荐层*`search-menu`*当前显示状态*`displayState`(Boolean)  默认false

18. *推荐搜索项count*`recommendItemsCount`(Int) 默认0

19. *当前选择/停留的搜索项index*`searchItemIndex`(Int) 默认-1 选择搜索推荐项时使用, 0表示第一项, `recommendItemsCount-1`表示最后一项

20. [公开]*提交搜索事件 -> 回调函数*`onSearch`(Function)

21. [公开]*切换推荐搜索项事件 -> 回调函数*`onSelect`(Function) 默认为更新UI方法 应是指定*搜索文本框元素*`searchInput`的value值, 以及针对自定义模板选中的searchItem切换选中样式

21. [公开]*切换搜索菜单层显示状态事件 -> 回调函数*`onSearchMenuDisplayStateChange`(Function) 默认为更新UI方法 应指定切换*推荐搜索层元素*`searchMenu`的隐显

22. [公开]*搜索文本框元素*`searchInput`(HTMLElement) (必须指定)

23. *推荐搜索层元素*`searchMenu`(HTMLElemnt) 默认为null, 内部模板解析创建元素后, 自动关联(通过id)

24. [公开]*设置完search-menu的赋值数据源事件`searchMenuData`* -> 回调函数*`onSetSearchMenuData*`(Function) 默认为设置header与footer值方法 使用者可以在这里指定搜索菜单header, footer或其他自定义变量

25. [公开]*自定义模板解析生成方法*`template`(Function) 默认为模板方法 该方法应是获取到自定义模板后, 直接传入js对象即可返回html代码

26. [公开]*模板生成html后事件 -> 回调函数*`onTemplate`(Function) 默认为更新UI方法 应是获取到模板解析数据后生成的html代码, 然后将*推荐搜索层元素*`searchMenu`内容替换(模板需要作控制, 只有第一次才包含容器元素标签)

27. [公开]*每个推荐搜索项匹配的选择器*`searchItemSelector`(String) 默认为与默认模板匹配的选择器 可自定义, 但需要同时自定义模板

28. [公开]*被选中的那个推荐搜索项匹配的选择器*`searchItemSelectedSelector`(String) 默认为与默认模板匹配的附加选择器 可自定义, 但需要同时自定义css

29.  *是否允许`search-input`focusout事件触发*`allowFocusOut`(Boolean) 默认true 为防止点击`search-menu`执行foucsout事件逻辑

30. [公开]*search-menu-content的赋值数据源*`recommendKeywordDataList`*中对应显示推荐搜索词的字段名*`suggestKeyword`(String) 默认为'keyword'

31. [公开]*请求远程数据, 返回结果对应dataList数组的key*`resultListKey`(String) 默认为'list'

32. [公开]*推荐搜索层*`search-menu`*的关闭按钮匹配的选择器*`searchMenuCloseSelector`(String) 默认为'.search-menu-close' 可自定义, 但需要同时自定义模板

33. [公开]*推荐搜索层*`search-menu`*的内容部分匹配的选择器*`searchMenuContentSelector`(String) 默认为'.search-menu-content'   可自定义, 但需要同时自定义模板

34. [公开]*远程请求超时时间*`timeout`(Int) 默认为3000(30s)

35. [公开]*远程请求返回数据方式*`dataType`(String) 默认为'json' 也支持'jsonp'

36. [公开]*search-menu-content的赋值数据源*`recommendKeywordDataList`*中对应显示推荐搜索词的字段的html内容*`suggestKeywordHtml`(String) 默认为'keywordHtml'  可自定义, 但需要同时自定义模板

37. [公开]*推荐搜索层*`search-menu`*的历史已提交搜索记录的删除按钮匹配的选择器*`searchMenuHistoryDeleteSelector`(String) 默认为'.search-menu-history-delete' 可自定义, 但需要同时自定义模板

