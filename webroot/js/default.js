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
		var status = that.children('span').text().trim();
		savePrint(checklistId, locationId, status, that);
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

function savePrint(checklistId, locationId, status, that) {

	that.button('loading').queue(function() {
		$.ajax({
			type: 'POST',
			dataType: 'json',
			data: {checklistId: checklistId, locationId: locationId, status: status},
			url: "/home",
			success: function (json) {
				that.button('reset');
				that.dequeue();
				toastr.success("Send to print successfully");
				setTimeout(function () {
					that.children('span').text(json.status);
				}, 100);
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				toastr.error(errorThrown+textStatus, "Failed");
			}
		});
	});

}