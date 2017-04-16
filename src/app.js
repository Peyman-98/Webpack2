const css = require('./app.scss');
// var $ = require("jquery");
import $ from 'jquery'
let msg = "Hi There";
var dd = 'aaaa';
console.log(msg);
function multiply(a,b){
    return a*b;
}
$(document).ready(function(){
    $('.heading').css('background','yellow');
    console.log(this);
});


