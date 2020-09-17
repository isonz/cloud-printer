$(function(){
    window.onresize=resizeWindow;
    resizeWindow();

    $(".returnBack").click(function () {
        history.go(-1);
    });

    ajaxAutoCSRF();
    showUploadImgByCookie();
});


function scrollTop(){return $("html, body").animate({scrollTop: 0},"slow"),!1}

//js生成随机数    n表示生成几位的随机数
function jsRand(n) {
	var jschars = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    var res = "";
    for(var i = 0; i < n ; i ++) {
        var id = Math.ceil(Math.random()*61);
        res += jschars[id];
    }
    return res;
}

//获取窗口长宽
function resizeWindow()
{

}

//AJAX POST 的时候自动补全 CSRF
function ajaxAutoCSRF() {
    var token = $("meta[name='_csrf']").attr("content");
    var header = $("meta[name='_csrf_header']").attr("content");
    $(document).ajaxSend(function(e, xhr, options) {
        xhr.setRequestHeader(header, token);
    });
}

//重置搜索关键词
function searchReset(url){
    location.href = url;
}

//ajax upload 依赖 JUpload 插件
function ajaxUpload(http_url, file_input_id, hidden_input_id) {
    'use strict';
    $('#'+file_input_id).fileupload({
        url: http_url,
        dataType: 'json',
        done: function (e, json) {
            /* $.each(data.result.files, function (index, file) {      //多图
             $('<p/>').text(file.name).appendTo('#'+hidden_input_id);
             }); */
            if(0==json.result.code) {
                $('#' + hidden_input_id).val(json.result.data);           //单图
                $("#img_preview").attr("src",json.result.data);
                $.cookie("upload_img", json.result.data, {expires:7});
            }
            $('#upload_progress').hide();
        },
        progressall: function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $('#upload_progress').show();
            $('#upload_progress .progress-bar').css(
                'width',
                progress + '%'
            );
        }
    }).prop('disabled', !$.support.fileInput)
        .parent().addClass($.support.fileInput ? undefined : 'disabled');
}
function showUploadImgByCookie() {
    if('undefined'!=typeof($.cookie("upload_img"))){
        $("#img_preview").attr("src",$.cookie("upload_img"));
    }
}


//打印指定区域的内容 依赖 jquery.printArea 插件
function print(id) {
    $("#"+id).printArea();
}

//在页面中嵌入 PDF 文件 依赖 jquery.media 插件：  <a href="xx.pdf" class="media-pdf">insert</a>
function insertPDF() {
    $('a.media-pdf').media({width:1024, height:900});
}

//预览某部分内容的窗口   依赖 printPreview 插件
function printPreview() {
    $("#previewBtn").printPreview({
        obj2print:'#printArea',
        width:'900',
        style:'<style>body{background:#fff; padding: 20px;}.no-print{display:none;} .page-header{margin: 0;}</style>',
        title:'Print Preview'

        /*optional properties with default values*/
        //obj2print:'body',     /*if not provided full page will be printed*/
        //style:'',             /*if you want to override or add more css assign here e.g: "<style>#masterContent:background:red;</style>"*/
        //width: '670',         /*if width is not provided it will be 670 (default print paper width)*/
        //height:screen.height, /*if not provided its height will be equal to screen height*/
        //top:0,                /*if not provided its top position will be zero*/
        //left:'center',        /*if not provided it will be at center, you can provide any number e.g. 300,120,200*/
        //resizable : 'yes',    /*yes or no default is yes, * do not work in some browsers*/
        //scrollbars:'yes',     /*yes or no default is yes, * do not work in some browsers*/
        //status:'no',          /*yes or no default is yes, * do not work in some browsers*/
        //title:'Print Preview' /*title of print preview popup window*/

    });
}

//离开或刷新页面时的提示
function RunOnBeforeUnload() {
    window.onbeforeunload = function(){ return ""; }
}

//Toastr 提示框， 依赖 toastr 插件
toastr.options = {
    "closeButton": false, //是否显示关闭按钮
    "debug": false, //是否使用debug模式
    "positionClass": "toast-top-center",//弹出窗的位置
    "showDuration": "300",//显示的动画时间
    "hideDuration": "1000",//消失的动画时间
    "timeOut": "5000", //展现时间
    "extendedTimeOut": "1000",//加长展示时间
    "showEasing": "swing",//显示时的动画缓冲方式
    "hideEasing": "linear",//消失时的动画缓冲方式
    "showMethod": "fadeIn",//显示时的动画方式
    "hideMethod": "fadeOut" //消失时的动画方式
};

//confirm alert 封装
$(function () {
    window.Modal = function () {
        var reg = new RegExp("\\[([^\\[\\]]*?)\\]", 'igm');
        var alr = $("#alert-Modal");
        var ahtml = alr.html();
        var _alert = function (options) {
            alr.html(ahtml);    // 复原
            alr.find('.ok').removeClass('btn-success').addClass('btn-primary');
            alr.find('.cancel').hide();
            _dialog(options);
            return {
                on: function (callback) {
                    if (callback && callback instanceof Function) {
                        alr.find('.ok').click(function () { callback(true) });
                    }
                }
            };
        };
        var _confirm = function (options) {
            alr.html(ahtml); // 复原
            alr.find('.ok').removeClass('btn-primary').addClass('btn-success');
            alr.find('.cancel').show();
            _dialog(options);
            return {
                on: function (callback) {
                    if (callback && callback instanceof Function) {
                        alr.find('.ok').click(function () { callback(true) });
                        alr.find('.cancel').click(function () { callback(false) });
                    }
                }
            };
        };
        var _dialog = function (options) {
            var ops = {
                msg: "Alert",
                title: "Alert Message",
                btnok: "YES",
                btncl: "NO"
            };
            $.extend(ops, options);
            var html = alr.html().replace(reg, function (node, key) {
                return {
                    Title: ops.title,
                    Message: ops.msg,
                    BtnOk: ops.btnok,
                    BtnCancel: ops.btncl
                }[key];
            });
            alr.html(html);
            alr.modal({
                width: 500,
                backdrop: 'static'
            });
        }
        return {
            alert: _alert,
            confirm: _confirm
        }
    }();
});

