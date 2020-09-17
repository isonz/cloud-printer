$(document).ready(function(){
	$("#save1").click(function () {
		var that = $(this);
		var val1 = $('#printer_name_1').val();
		saveLocation(1, val1, that)
	});

	$("#save2").click(function () {
		var that = $(this);
		var val2 = $('#printer_name_2').val();
		saveLocation(2, val2, that)
	});

	$("#save3").click(function () {
		var that = $(this);
		var val3 = $('#printer_name_3').val();
		saveLocation(3, val3, that);
	});


	$('.printer-btn').click(function () {
		var that = $(this);
		var checklistId = that.attr('checklist-id');
		var locationId = that.attr('location-id');
		var print_num = that.children('span').text().trim();
		savePrint(checklistId, locationId, print_num, that);
	});

}); 

function saveLocation(id, val, that) {
	if(val.length > 0){
		that.button('loading').queue(function() {
			$.post('/printers', {id: id, printer: val}, function () {
				that.button('reset');
				that.dequeue();
				toastr.success("Save Success");
			});
		});
	}
}

function savePrint(checklistId, locationId, print_num, that) {

	that.button('loading').queue(function() {
		$.ajax({
			type: 'POST',
			dataType: 'json',
			data: {checklistId: checklistId, locationId: locationId, print_num: print_num},
			url: "/home",
			success: function (json) {
				that.button('reset');
				that.dequeue();
				toastr.success("Send to print successfully");
				setTimeout(function () {
					that.children('span').text(json.print_num);
				}, 100);
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				toastr.error(errorThrown+textStatus, "Failed");
			}
		});
	});
}


function webSocket()
{
	var socket = null;
	var timer = null;
	var isConnected = false;

	//判断当前浏览器是否支持WebSocket
	if('WebSocket' in window){
		socket = new WebSocket("ws://127.0.0.1:7777");
	}else{
		toastr.error("Don't support webSocket");
	}

	//连接发生错误的回调方法
	socket.onerror = function(){
		setData({'code':1, 'msg':"ERROR"});
	};

	//连接成功建立的回调方法
	socket.onopen = function(event){
		setData({'code':2, 'msg':"OPENED"});
	};

	//发送消息
	function send(){
		if(socket.readyState === socket.CLOSED){
			clearInterval(timer);
		}else{
			socket.send(clientId);
		}
	}

	//接收到消息的回调方法
	socket.onmessage = function(event){
		var json = JSON.parse(event.data);
		setData(json);
	};

	//连接关闭的回调方法
	socket.onclose = function(){
		setData({'code':3, 'msg':"CLOSED"});
	};

	//监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
	window.onbeforeunload = function(){
		socket.close();
		clearInterval(timer);
	};

	//关闭连接
	function closeWebSocket(){
		socket.close();
		clearInterval(timer);
	}

	//将消息显示在网页上
	function setData(json){
		if(0 == json.code){
			if('CONNECTED'==json.msg){
				toastr.success(json.msg);
				isConnected = true;
			}else {
				listSocketResult(json.data);
			}
		}else{
			if('CLOSED'==json.msg || 'OPENED'==json.msg) return true;
			toastr.error(json.msg);
			clearInterval(timer);
		}
	}

	$(window).on("unload", function(e) {
		socket.close();
	});

	timer = setInterval(function () {
		if(isConnected) send();
	},10000);

}



function printExtF() {
	$(".print-ext").unbind("click");
	$(".print-ext").click(function () {
		var orderCode = $(this).attr("data-id");
		IPC.send('print-silent', {"orderCode":orderCode, "prints": PRINTS});        //打印
	});
}

