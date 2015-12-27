<template>
    <div>
        <div id="toolbar">
            <select class="form-control">
                <option value="">导出本页</option>
                <option value="all">导出全部</option>
                <option value="selected">导出选择数据</option>
            </select>
        </div>
        <table id="table"
               data-toolbar="#toolbar"
               data-toggle="table"
               data-click-to-select="true"
               data-search="true"
               :data-show-refresh="srefresh"
               data-show-toggle="true"
               data-show-columns="true"
               data-show-export="true"
               data-minimum-count-columns="2"
               data-show-pagination-switch="true"
               data-pagination="true"
               data-id-field="id"
               data-page-list="[10, 25, 50, 100, ALL]"
               data-show-footer="false">
            <thead>
            <tr>
                <th data-field="state" data-checkbox="true"></th>
                <th data-field="id">编码</th>
                <th data-field="name">名称</th>
                <th data-field="price">价格</th>
            </tr>
            </thead>
        </table>

    </div>

</template>
<script>
    require('bootstrap-table/dist/bootstrap-table.css')
    require('bootstrap-table/dist/bootstrap-table.js')
    require("bootstrap-table/src/locale/bootstrap-table-zh-CN.js")
    require("bootstrap-table/src/extensions/export/bootstrap-table-export.js")
    //    require("bootstrap-table/src/extensions/editable/bootstrap-table-editable.js")
    //    require("../../lib/bootstrap-editable.js")
    require("../../lib/tableExport.js")

    export default {
        props: {
            srefresh:  Boolean,
            tdata: Array,
            ttest:Number,
            dob:Object

        },
        ready:function ()
    {
        var $table = $('#table')
        $('#table').bootstrapTable({
            data: this.tdata
        })
        $(function () {
            $('#toolbar').find('select').change(function () {
                $table.bootstrapTable('refreshOptions', {
                    exportDataType: $(this).val()
                });
            });
        })
    }
    }
    // sometimes footer render error.

</script>
<style>
</style>