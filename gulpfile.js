/**
 * Created by cyqresig on 2016/2/6.
 */

var requireDir = require('require-dir');

//Require all tasks in gulp/tasks, including subfolders
var requireDir = require('require-dir');
requireDir('./gulp/tasks', {
    recurse: true   //子项递归
});