<template>
<div>
    <!-- BEGIN HEADER -->
    <div class="page-header navbar navbar-fixed-top">
        <!-- BEGIN HEADER INNER -->
        <div class="page-header-inner">
            <!-- BEGIN LOGO -->
            <div class="page-logo">
                <a v-link="{ path: '/' }">
                    <img src="../lib/assets/admin/layout2/img/logo-default.png" alt="logo" class="logo-default"/>
                </a>

                <div class="menu-toggler sidebar-toggler">
                    <!-- DOC: Remove the above "hide" to enable the sidebar toggler button on header -->
                </div>
            </div>
            <!-- END LOGO -->
            <!-- BEGIN RESPONSIVE MENU TOGGLER -->
            <a href="javascript:;" class="menu-toggler responsive-toggler" data-toggle="collapse"
               data-target=".navbar-collapse">
            </a>
            <!-- END RESPONSIVE MENU TOGGLER -->
            <!-- BEGIN PAGE ACTIONS -->
            <!-- DOC: Remove "hide" class to enable the page header actions -->
            <div class="page-actions">
                <div class="btn-group hide">
                    <button type="button" class="btn btn-circle red-pink dropdown-toggle" data-toggle="dropdown">
                        <i class="fa fa-bar-chart"></i>&nbsp;<span class="hidden-sm hidden-xs">New&nbsp;</span>&nbsp;<i
                            class="fa fa-angle-down"></i>
                    </button>
                    <ul class="dropdown-menu" role="menu">
                        <li>
                            <a href="javascript:;">
                                <i class="fa fa-user"></i> New User </a>
                        </li>
                        <li>
                            <a href="javascript:;">
                                <i class="fa fa-present"></i> New Event <span class="badge badge-success">4</span>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:;">
                                <i class="fa fa-basket"></i> New order </a>
                        </li>
                        <li class="divider">
                        </li>
                        <li>
                            <a href="javascript:;">
                                <i class="fa fa-flag"></i> Pending Orders <span class="badge badge-danger">4</span>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:;">
                                <i class="fa fa-users"></i> Pending Users <span class="badge badge-warning">12</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="btn-group hide">
                    <button type="button" class="btn btn-circle green-haze dropdown-toggle" data-toggle="dropdown">
                        <i class="fa fa-plus"></i>&nbsp;<span class="hidden-sm hidden-xs">New&nbsp;</span>&nbsp;<i
                            class="fa fa-angle-down"></i>
                    </button>
                    <ul class="dropdown-menu" role="menu">
                        <li>
                            <a href="javascript:;">
                                <i class="fa fa-docs"></i> New Post </a>
                        </li>
                        <li>
                            <a href="javascript:;">
                                <i class="fa fa-tag"></i> New Comment </a>
                        </li>
                        <li>
                            <a href="javascript:;">
                                <i class="fa fa-share"></i> Share </a>
                        </li>
                        <li class="divider">
                        </li>
                        <li>
                            <a href="javascript:;">
                                <i class="fa fa-flag"></i> Comments <span class="badge badge-success">4</span>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:;">
                                <i class="fa fa-users"></i> Feedbacks <span class="badge badge-danger">2</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- END PAGE ACTIONS -->
            <!-- BEGIN PAGE TOP -->
            <div class="page-top">
                <!-- BEGIN HEADER SEARCH BOX -->
                <!-- DOC: Apply "search-form-expanded" right after the "search-form" class to have half expanded search box -->
                <h2 style="width: 300px; float: left;color: #044C96;margin-left: 10px;">
                    <strong><i class="fa fa-users"></i>管理系统</strong>
                </h2>
                <!-- END HEADER SEARCH BOX -->
                <!-- BEGIN TOP NAVIGATION MENU -->
                <div class="top-menu">
                    <ul class="nav navbar-nav pull-right">
                        <!-- BEGIN NOTIFICATION DROPDOWN -->
                        <!-- DOC: Apply "dropdown-dark" class after below "dropdown-extended" to change the dropdown styte -->
                        <li class="dropdown dropdown-extended dropdown-notification" id="header_notification_bar">
                            <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown"
                               data-close-others="true">
                                <i class="fa fa-bell-o"></i>
						<span class="badge badge-default">
						7 </span>
                            </a>
                            <ul class="dropdown-menu">
                                <li class="external">
                                    <h3><span class="bold">12 pending</span> notifications</h3>
                                    <a href="extra_profile.html">view all</a>
                                </li>
                                <li>
                                    <ul class="dropdown-menu-list scroller" style="height: 250px;"
                                        data-handle-color="#637283">
                                        <li>
                                            <a href="javascript:;">
                                                <span class="time">just now</span>
										<span class="details">
										<span class="label label-sm label-icon label-success">
										<i class="fa fa-plus"></i>
										</span>
										New user registered. </span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:;">
                                                <span class="time">3 mins</span>
										<span class="details">
										<span class="label label-sm label-icon label-danger">
										<i class="fa fa-bolt"></i>
										</span>
										Server #12 overloaded. </span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:;">
                                                <span class="time">10 mins</span>
										<span class="details">
										<span class="label label-sm label-icon label-warning">
										<i class="fa fa-bell-o"></i>
										</span>
										Server #2 not responding. </span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:;">
                                                <span class="time">14 hrs</span>
										<span class="details">
										<span class="label label-sm label-icon label-info">
										<i class="fa fa-bullhorn"></i>
										</span>
										Application error. </span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:;">
                                                <span class="time">2 days</span>
										<span class="details">
										<span class="label label-sm label-icon label-danger">
										<i class="fa fa-bolt"></i>
										</span>
										Database overloaded 68%. </span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:;">
                                                <span class="time">3 days</span>
										<span class="details">
										<span class="label label-sm label-icon label-danger">
										<i class="fa fa-bolt"></i>
										</span>
										A user IP blocked. </span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:;">
                                                <span class="time">4 days</span>
										<span class="details">
										<span class="label label-sm label-icon label-warning">
										<i class="fa fa-bell-o"></i>
										</span>
										Storage Server #4 not responding dfdfdfd. </span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:;">
                                                <span class="time">5 days</span>
										<span class="details">
										<span class="label label-sm label-icon label-info">
										<i class="fa fa-bullhorn"></i>
										</span>
										System Error. </span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:;">
                                                <span class="time">9 days</span>
										<span class="details">
										<span class="label label-sm label-icon label-danger">
										<i class="fa fa-bolt"></i>
										</span>
										Storage server failed. </span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <!-- END NOTIFICATION DROPDOWN -->
                        <!-- BEGIN INBOX DROPDOWN -->
                        <!-- DOC: Apply "dropdown-dark" class after below "dropdown-extended" to change the dropdown styte -->
                        <li class="dropdown dropdown-extended dropdown-inbox" id="header_inbox_bar">
                            <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown"
                               data-close-others="true">
                                <i class="fa fa-envelope-o"></i>
						<span class="badge badge-default">
						4 </span>
                            </a>
                            <ul class="dropdown-menu">
                                <li class="external">
                                    <h3>You have <span class="bold">7 New</span> Messages</h3>
                                    <a href="page_inbox.html">view all</a>
                                </li>
                                <li>
                                    <ul class="dropdown-menu-list scroller" style="height: 275px;"
                                        data-handle-color="#637283">
                                        <li>
                                            <a href="inbox.html?a=view">
										<span class="photo">
										<img src="../lib/assets/admin/layout2/img/avatar2.jpg" class="img-circle" alt="">
										</span>
										<span class="subject">
										<span class="from">
										Lisa Wong </span>
										<span class="time">Just Now </span>
										</span>
										<span class="message">
										Vivamus sed auctor nibh congue nibh. auctor nibh auctor nibh... </span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="inbox.html?a=view">
										<span class="photo">
										<img src="../lib/assets/admin/layout2/img/avatar3.jpg" class="img-circle" alt="">
										</span>
										<span class="subject">
										<span class="from">
										Richard Doe </span>
										<span class="time">16 mins </span>
										</span>
										<span class="message">
										Vivamus sed congue nibh auctor nibh congue nibh. auctor nibh auctor nibh... </span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="inbox.html?a=view">
										<span class="photo">
										<img src="../lib/assets/admin/layout2/img/avatar1.jpg" class="img-circle" alt="">
										</span>
										<span class="subject">
										<span class="from">
										Bob Nilson </span>
										<span class="time">2 hrs </span>
										</span>
										<span class="message">
										Vivamus sed nibh auctor nibh congue nibh. auctor nibh auctor nibh... </span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="inbox.html?a=view">
										<span class="photo">
										<img src="../lib/assets/admin/layout2/img/avatar2.jpg" class="img-circle" alt="">
										</span>
										<span class="subject">
										<span class="from">
										Lisa Wong </span>
										<span class="time">40 mins </span>
										</span>
										<span class="message">
										Vivamus sed auctor 40% nibh congue nibh... </span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="inbox.html?a=view">
										<span class="photo">
										<img src="../lib/assets/admin/layout2/img/avatar3.jpg" class="img-circle" alt="">
										</span>
										<span class="subject">
										<span class="from">
										Richard Doe </span>
										<span class="time">46 mins </span>
										</span>
										<span class="message">
										Vivamus sed congue nibh auctor nibh congue nibh. auctor nibh auctor nibh... </span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <!-- END INBOX DROPDOWN -->
                        <!-- BEGIN TODO DROPDOWN -->
                        <!-- DOC: Apply "dropdown-dark" class after below "dropdown-extended" to change the dropdown styte -->
                        <li class="dropdown dropdown-extended dropdown-tasks" id="header_task_bar">
                            <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown"
                               data-close-others="true">
                                <i class="fa fa-calendar"></i>
						<span class="badge badge-default">
						3 </span>
                            </a>
                            <ul class="dropdown-menu extended tasks">
                                <li class="external">
                                    <h3>You have <span class="bold">12 pending</span> tasks</h3>
                                    <a href="page_todo.html">view all</a>
                                </li>
                                <li>
                                    <ul class="dropdown-menu-list scroller" style="height: 275px;"
                                        data-handle-color="#637283">
                                        <li>
                                            <a href="javascript:;">
										<span class="task">
										<span class="desc">New release v1.2 </span>
										<span class="percent">30%</span>
										</span>
										<span class="progress">
										<span style="width: 40%;" class="progress-bar progress-bar-success"
                                              aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"><span
                                                class="sr-only">40% Complete</span></span>
										</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:;">
										<span class="task">
										<span class="desc">Application deployment</span>
										<span class="percent">65%</span>
										</span>
										<span class="progress">
										<span style="width: 65%;" class="progress-bar progress-bar-danger"
                                              aria-valuenow="65" aria-valuemin="0" aria-valuemax="100"><span
                                                class="sr-only">65% Complete</span></span>
										</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:;">
										<span class="task">
										<span class="desc">Mobile app release</span>
										<span class="percent">98%</span>
										</span>
										<span class="progress">
										<span style="width: 98%;" class="progress-bar progress-bar-success"
                                              aria-valuenow="98" aria-valuemin="0" aria-valuemax="100"><span
                                                class="sr-only">98% Complete</span></span>
										</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:;">
										<span class="task">
										<span class="desc">Database migration</span>
										<span class="percent">10%</span>
										</span>
										<span class="progress">
										<span style="width: 10%;" class="progress-bar progress-bar-warning"
                                              aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"><span
                                                class="sr-only">10% Complete</span></span>
										</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:;">
										<span class="task">
										<span class="desc">Web server upgrade</span>
										<span class="percent">58%</span>
										</span>
										<span class="progress">
										<span style="width: 58%;" class="progress-bar progress-bar-info"
                                              aria-valuenow="58" aria-valuemin="0" aria-valuemax="100"><span
                                                class="sr-only">58% Complete</span></span>
										</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:;">
										<span class="task">
										<span class="desc">Mobile development</span>
										<span class="percent">85%</span>
										</span>
										<span class="progress">
										<span style="width: 85%;" class="progress-bar progress-bar-success"
                                              aria-valuenow="85" aria-valuemin="0" aria-valuemax="100"><span
                                                class="sr-only">85% Complete</span></span>
										</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:;">
										<span class="task">
										<span class="desc">New UI release</span>
										<span class="percent">38%</span>
										</span>
										<span class="progress progress-striped">
										<span style="width: 38%;" class="progress-bar progress-bar-important"
                                              aria-valuenow="18" aria-valuemin="0" aria-valuemax="100"><span
                                                class="sr-only">38% Complete</span></span>
										</span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <!-- END TODO DROPDOWN -->
                        <!-- BEGIN USER LOGIN DROPDOWN -->
                        <!-- DOC: Apply "dropdown-dark" class after below "dropdown-extended" to change the dropdown styte -->
                        <li class="dropdown dropdown-user">
                            <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown"
                               data-close-others="true">
                                <img alt="" class="img-circle" src="../lib/assets/admin/layout2/img/avatar3_small.jpg"/>
						<span class="username username-hide-on-mobile">
						Nick </span>
                                <i class="fa fa-angle-down"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-default">
                                <li>
                                    <a href="extra_profile.html">
                                        <i class="fa fa-user"></i> My Profile </a>
                                </li>
                                <li>
                                    <a href="page_calendar.html">
                                        <i class="fa fa-calendar"></i> My Calendar </a>
                                </li>
                                <li>
                                    <a href="inbox.html">
                                        <i class="fa fa-envelope-o"></i> My Inbox <span class="badge badge-danger">
								3 </span>
                                    </a>
                                </li>
                                <li>
                                    <a href="page_todo.html">
                                        <i class="fa fa-tasks"></i> My Tasks <span class="badge badge-success">
								7 </span>
                                    </a>
                                </li>
                                <li class="divider">
                                </li>
                                <li>
                                    <a href="extra_lock.html">
                                        <i class="fa fa-lock"></i> Lock Screen </a>
                                </li>
                                <li>
                                    <a href="login.html">
                                        <i class="fa fa-sign-out"></i> Log Out </a>
                                </li>
                            </ul>
                        </li>
                        <!-- END USER LOGIN DROPDOWN -->
                    </ul>
                </div>
                <!-- END TOP NAVIGATION MENU -->
            </div>
            <!-- END PAGE TOP -->
        </div>
        <!-- END HEADER INNER -->
    </div>
    <!-- END HEADER -->
    <div class="clearfix">
    </div>
    <!--<div class="container">-->
    <!-- BEGIN CONTAINER -->
    <div class="page-container">
        <!-- BEGIN SIDEBAR -->
        <div class="page-sidebar-wrapper">
            <!-- DOC: Set data-auto-scroll="false" to disable the sidebar from auto scrolling/focusing -->
            <!-- DOC: Change data-auto-speed="200" to adjust the sub menu slide up/down speed -->
            <div class="page-sidebar navbar-collapse collapse">
                <!-- BEGIN SIDEBAR MENU -->
                <!-- DOC: Apply "page-sidebar-menu-light" class right after "page-sidebar-menu" to enable light sidebar menu style(without borders) -->
                <!-- DOC: Apply "page-sidebar-menu-hover-submenu" class right after "page-sidebar-menu" to enable hoverable(hover vs accordion) sub menu mode -->
                <!-- DOC: Apply "page-sidebar-menu-closed" class right after "page-sidebar-menu" to collapse("page-sidebar-closed" class must be applied to the body element) the sidebar sub menu mode -->
                <!-- DOC: Set data-auto-scroll="false" to disable the sidebar from auto scrolling/focusing -->
                <!-- DOC: Set data-keep-expand="true" to keep the submenues expanded -->
                <!-- DOC: Set data-auto-speed="200" to adjust the sub menu slide up/down speed -->
                <ul class="page-sidebar-menu  page-sidebar-menu-compact " data-auto-scroll="true"
                    data-slide-speed="200">
                    <li  v-for="(i,item) in array" :class="item.class">
                        <a v-link="{ path: $route.path }">
                            <i :class="item.iclass"></i>
                            <span class="title">{{item.name}}</span>
                            <span v-show="item.class==='active'" class="selected"></span>
                            <span class="arrow "></span>
                        </a>
                        <ul class="sub-menu">
                            <li v-for="(j,ic) in item.children" v-on:click="act(i,j)" :class="ic.class">
                                <a  v-link="{path: ic.href}">
                                    <i :class="ic.iclass"></i>
                                    <span class="badge badge-danger">{{ic.span}}</span>{{ic.name}}</a>
                            </li>
                        </ul>
                    </li>

                </ul>
                <!-- END SIDEBAR MENU -->
            </div>
        </div>
        <!-- END SIDEBAR -->
        <!-- BEGIN CONTENT -->
        <div class="page-content-wrapper">
            <div class="page-content" id = "tableTest">
                <!-- BEGIN SAMPLE PORTLET CONFIGURATION MODAL FORM-->
                <div class="modal fade" id="portlet-config" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
                     aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                                <h4 class="modal-title">Modal title</h4>
                            </div>
                            <div class="modal-body">
                                Widget settings form goes here
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn blue">Save changes</button>
                                <button type="button" class="btn default" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                        <!-- /.modal-content -->
                    </div>
                    <!-- /.modal-dialog -->
                </div>
                <!-- /.modal -->
                <!-- END SAMPLE PORTLET CONFIGURATION MODAL FORM-->
                <!-- BEGIN PAGE HEADER-->
                <div class="page-bar">
                    <ul class="page-breadcrumb">
                        <li>
                            <i class="fa fa-home"></i>
                            <a v-link="{ path: '/' }">系统首页</a>
                            <i class="fa fa-angle-right"></i>
                        </li>
                        <li>
                            <a v-link="{ path: $route.path }">{{breadcrumb.pnod}}</a>
                            <i class="fa fa-angle-right"></i>
                        </li>
                        <li>
                            <a v-link="{ path:  $route.path }">{{breadcrumb.snod}}</a>
                        </li>
                    </ul>
                    <div class="page-toolbar">
                        <div class="btn-group pull-right">
                            <button type="button" class="btn btn-fit-height grey-salt dropdown-toggle"
                                    data-toggle="dropdown" data-hover="dropdown" data-delay="1000" data-close-others="true">
                                Actions <i class="fa fa-angle-down"></i>
                            </button>
                            <ul class="dropdown-menu pull-right" role="menu">
                                <li>
                                    <a v-link="{ path: $route.path }">Action</a>
                                </li>
                                <li>
                                    <a v-link="{ path: $route.path }">Another action</a>
                                </li>
                                <li>
                                    <a v-link="{ path: $route.path }">Something else here</a>
                                </li>
                                <li class="divider">
                                </li>
                                <li>
                                    <a v-link="{ path: $route.path }">Separated link</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <!-- END PAGE HEADER-->
                <!--  body -->
                <div class="row">
                    <!-- vue路由主页面-->
                    <router-view></router-view>
                    <!-- vue路由主页面-->
                </div>
                <!-- / body -->
            </div>
        </div>
        <!-- END CONTENT -->
    </div>
    <!-- END CONTAINER -->
    <!-- BEGIN FOOTER -->
    <div class="page-footer">
        <div class="page-footer-inner">
            2015 &copy; Administration by qio. <a
                v-link="{ path: $route.path }" target="_blank">Good luck!</a>
        </div>
        <div class="scroll-to-top">
            <i class="fa fa-arrow-up"></i>
        </div>
    </div>
    <!-- END FOOTER -->
</div>
</template>
<script >
    var Metronic=require('../lib/assets/global/scripts/metronic.js')
    var Layout=require('../lib/assets/admin/layout2/scripts/layout.js')
    var pdata =[
        {
            name:'系统管理',
            id:'1',
            iclass:'fa fa-cogs',
            class:"",
            children:[
                {
                    name:'用户管理',
                    id:'2',
                    span:0,
                    iclass:"fa fa-users",
                    class:"",
                    href:"/bar"
                },
                {
                    name :'客户管理',
                    id:'3',
                    iclass:"fa fa-building-o",
                    class:"",
                    href:"/foo"
                }
            ]
        },
        {
            name:'业务管理',
            id:'4',
            iclass:'fa fa-bar-chart',
            class:"",
            children:[
                {
                    name:'信息管理',
                    id:'5',
                    iclass:"fa fa-commenting-o",
                    class:"",
                    href:"/tree"
                },
                {
                    name:'任务管理',
                    id:'6',
                    span:2,
                    iclass:"fa fa-tasks",
                    class:"",
                    href:"/index3"
                }
            ]
        }
    ];
    export default{
        data :function() {
            return{
                array: pdata,
                toggle: false,
                breadcrumb:{
                    pnod:pdata[0].name,
                    snod:pdata[0].children[0].name
                }
            }
        },
        ready:function(){
            jQuery(document).ready(function () {
                Metronic.init(); // init metronic core components
                Layout.init(); // init current layout
            })
        },
        methods: {
            act: function(i,j) {
                for(var t=0;t<this.array.length;t++){
                    this.array[t].class= ""
                    for(var s=0;s<this.array[t].children.length;s++){
                        this.array[t].children[s].class=""
                    }
                }
                this.breadcrumb.pnod =  this.array[i].name
                this.breadcrumb.snod = this.array[i].children[j].name
                this.array[i].class= "active"
                this.array[i].children[j].class= "active"
            }
        }
    }
</script>

<!--<style>-->
    <!--.ms-controller{-->
        <!--visibility: hidden;-->
    <!--}-->
<!--</style>-->