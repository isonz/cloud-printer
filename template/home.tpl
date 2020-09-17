<{include file="header.tpl"}>

<div class="container" style="padding-top: 40px;">

    <P style="margin: 30px;">PRINT AREA</P>

    <{foreach from=$checklists item=checklist}>
        <div class="print_area" id="print_area_1" style="margin: 30px; width: 350px;">
            <{$checklist.content}>
        </div>
        <{foreach from=$locations item=location}>
        <button type="button" class="btn btn-primary printer-btn" checklist-id="<{$checklist.id}>" location-id="<{$location.id}>" data-loading-text="Loading...">
            <span class="n">
                <{foreach from=$checklist.printers item=printer}>
                    <{if $printer.location_id == $location.id}>
                        <{$printer.status}>
                    <{/if}>
                <{/foreach}>
            </span>
            <{$location.name}> Print</button>
        <{/foreach}>
    <{/foreach}>


</div>


<{include file="footer.tpl"}>
