<{include file="head.tpl"}>
<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.1.1/socket.io.js"></script>
<style>
    html, body{
        background: #eee;
    }
</style>



<h1 style="text-align: center">自动打印</h1>
<div class="container" style="padding-top: 40px;">

    <div class="print_area" id="print_area">


    </div>

</div>

<{include file="footer.tpl"}>

<script>
let socket = io('http://localhost:7777');
socket.on('connect', function () {
    toastr.success("Connect success !");
    socket.emit('queryPrint', {name: 'listenStatus'});

    // 发射
    /*
     socket.emit('events', {name: 'alone'}, (response) => {
         console.log(response);
     });

    // 发射
    // socket.emit('identity', 0, (response) => console.log('Identity:', response));
    */
});

// 监听
socket.on('eventListenPrintStatus', (data) => {
    if(null !== data && 'undefinde' !== typeof data.print.checklistId){
        var checklistId = parseInt(data.print.checklistId);
        //console.log(checklistId);
        socket.emit('queryChecklist', {name: 'listenId', id: checklistId} );
    }
});

socket.on('eventListenChecklistId', (data) => {
   $('#print_area').html(data.content);
});

// IPC.send('print-silent', {"orderCode":orderCode, "prints": PRINTS});         //打印

</script>