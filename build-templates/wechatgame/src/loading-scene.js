var scene = new cc.Scene();

var root = new cc.Node();
var canvas = root.addComponent(cc.Canvas);
root.parent = scene;

var node = new cc.Node();
var label = node.addComponent(cc.Label);
label.string = "Loading...";
node.parent = root;

module.exports = scene;