<{include file="head.tpl"}>
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
    webSocket();
</script>