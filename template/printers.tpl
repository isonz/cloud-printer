<{include file="header.tpl"}>

<div class="container" style="padding-top: 40px;">

    <{foreach from=$locations item=location}>

        <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">
                    #<{$location.id}> - <{$location.name}>
                </h3>
            </div>

            <div class="panel-body">

                <div class="input-group">
                    <span class="input-group-addon"><span class="glyphicon glyphicon-print"></span></span>
                    <input type="text" class="form-control" placeholder="Printer 01 name" value="<{$location.printer_01}>" id="printer_name_<{$location.id}>" >
                </div>
                <p style="margin-top: 10px">
                    <button type="button" class="btn btn-success" id="save<{$location.id}>" data-loading-text="Loading...">Save</button>
                </p>
            </div>


        </div>

    <{/foreach}>

</div>

<{include file="footer.tpl"}>
