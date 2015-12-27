<template>
    <div class="zTreeDemoBackground left">
        <ul id="treeDemo" class="ztree"></ul>
    </div>

</template>
<script>
    require('zTree/css/zTreeStyle/zTreeStyle.css')
    require('zTree/js/jquery.ztree.all-3.5.js')
    export default {
        props: {
            znodes: Array,
            setting:Object
        },
        ready:function ()
        {
            var zNodes = this.znodes
            var setting= this.setting
//           setting、 zNodes为zTree保留字
            $(document).ready(function(){
                $.fn.zTree.init($("#treeDemo"), setting, zNodes);
            });
        }
    }
    // sometimes footer render error.

</script>
<style>
</style>