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
    const l = console.log
    let socket = io('http://localhost:7777');
    socket.on('connect', function () {
        console.log('链接成功');

        // 发射
        socket.emit('events', {
            name: 'ajanuw'
        });

        // 发射
        socket.emit('events', {
            name: 'alone'
        });

        // 发射
        // socket.emit('identity', 0, (response) => console.log('Identity:', response));
    });

    // 监听
    socket.on('events', (data) => {
        l(data.msg)
    });
</script>