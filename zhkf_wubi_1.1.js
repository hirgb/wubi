(function() {
    var c = (new Date()).getTime();
    var m = navigator.userAgent;
    //搜索节点
    function k(t) {
        return document.getElementById(t)
    }
    //创建节点
    function n(t) {
        return document.createElement(t)
    }
    //绑定事件
    function p(v, u, t) {
        if (window.attachEvent) {
            v.attachEvent("on" + u, t)
        } else {
            if (window.addEventListener) {
                v.addEventListener(u, t, false)
            }
        }
    }
    //取消绑定事件
    function l(v, u, t) {
        if (window.attachEvent) {
            v.detachEvent("on" + u, t)
        } else {
            if (window.addEventListener) {
                v.removeEventListener(u, t, false)
            }
        }
    }
    //显示元素
    function o(t) {
        t.style.display = "block"
    }
    //隐藏元素
    function d(t) {
        t.style.display = "none"
    }
    //获取当前元素最终使用的CSS属性值
    function f(u, t) {
        //转换为大写
        t = t.replace(/\-(\w)/g,
        function(v, w) {
            return w.toUpperCase()
        });
        if (g.isIE) {
            return u.currentStyle[t]
        } else {
            return document.defaultView.getComputedStyle(u, null)[t]//获取当前元素最终使用的CSS属性值
        }
    }
    //设置样式
    function e(u, t, v) {
        u.style[t] = v
    }
    //转换特殊字符
    function i(t) {
        return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\r\n|\r|\n/g, "<br>").replace(/\s/g, "&nbsp;")
    }
    //计算元素位置
    function s(v, z) {
        var A;
        if (!z) {
            A = document
        } else {
            A = z.document
        }
        var t = A.documentElement,
        u = A.body;
        var y = 0;
        var x = 0;
        if (v.getBoundingClientRect) {
            var w = v.getBoundingClientRect();//Element.getBoundingClientRect()方法返回元素的大小及其相对于视口的位置。
            y = w.left + Math.max(t.scrollLeft, u.scrollLeft);//该元素的显示（可见）的内容与该元素实际的内容的距离
            x = w.top + Math.max(t.scrollTop, u.scrollTop);
            y -= t.clientLeft;//表示一个元素的左边框的宽度，以像素表示。
            x -= t.clientTop
        } else {
            while (v.offsetParent) {
                y += v.offsetLeft;
                x += v.offsetTop;
                v = v.offsetParent
            }
        }
        return {
            x: y,
            y: x
        }
    }
    //初始化类，执行构造函数
    var q = {
        create: function() {
            return function() {
                this.initialize.apply(this, arguments)
            }
        }
    };
    //定义输入法全局对象
    var g = {
        VERSION:1.1,//使用极爽词库6.0
        status: {
            enable: 0,
            ch: 1,
            bc: 1,
            pt: 1,
            on: 1
        },
        option: {
            tRight: 50,
            tBottom: 30,
            panelH: 59
        },
        //domain: "",
        usr: "",
        inputs: [],
        isClose: false,
        isIE: (/msie (\d+)/i.test(m) && !window.opera) ? parseInt(RegExp.$1) : 0,
        isFirefox: /firefox/i.test(m),
        isOpera: /opera/i.test(m) && window.opera,
        isStrict: document.compatMode == "CSS1Compat",
        shownum: 5,
        curSelectNum: 1,
        iptTargets: [],
        iptCurTarget: null,
        inputsource: "",
        tempsource: "",
        inputselected: "",
        isBlur: true,
        needIptBack: false,
        selectLock: true,
        pageT: null,
        pageTimes: 0,
        isSubAddr: false,
        cursorHtml: "<span id='wubi_cursor'></span>",
        feedbackLink: "<a href='https://weibo.com/zhkfhunter' target='_blank'>\u53cd\u9988</a>",
        hasSug: false,
        panelShow: function() {},
        panelHide: function() {}
    };
    var a = [];
    a[32] = [" ", "\u3000", " ", " ", " ", " "];
    a[48] = ["0", "0", "\uff10", ")", "\uff09", "\uff09"];
    a[49] = ["1", "1", "\uff11", "!", "\uff01", "\uff01"];
    a[50] = ["2", "2", "\uff12", "@", "\uff20", "@"];
    a[51] = ["3", "3", "\uff13", "#", "\uff03", "#"];
    a[52] = ["4", "4", "\uff14", "$", "\uff04", "\uffe5"];
    a[53] = ["5", "5", "\uff15", "%", "\uff05", "\uff05"];
    a[54] = ["6", "6", "\uff16", "^", "\uff3e", "\u2026\u2026"];
    a[55] = ["7", "7", "\uff17", "&", "\uff06", "&"];
    a[56] = ["8", "8", "\uff18", "*", "\uff0a", "*"];
    a[57] = ["9", "9", "\uff19", "(", "\uff08", "\uff08"];
    a[65] = ["a", "\uff41", "\uff41", "A", "\uff21", "\uff21"];
    a[66] = ["b", "\uff42", "\uff42", "B", "\uff22", "\uff22"];
    a[67] = ["c", "\uff43", "\uff43", "C", "\uff23", "\uff23"];
    a[68] = ["d", "\uff44", "\uff44", "D", "\uff24", "\uff24"];
    a[69] = ["e", "\uff45", "\uff45", "E", "\uff25", "\uff25"];
    a[70] = ["f", "\uff46", "\uff46", "F", "\uff26", "\uff26"];
    a[71] = ["g", "\uff47", "\uff47", "G", "\uff27", "\uff27"];
    a[72] = ["h", "\uff48", "\uff48", "H", "\uff28", "\uff28"];
    a[73] = ["i", "\uff49", "\uff49", "I", "\uff29", "\uff29"];
    a[74] = ["j", "\uff4a", "\uff4a", "J", "\uff2a", "\uff2a"];
    a[75] = ["k", "\uff4b", "\uff4b", "K", "\uff2b", "\uff2b"];
    a[76] = ["l", "\uff4c", "\uff4c", "L", "\uff2c", "\uff2c"];
    a[77] = ["m", "\uff4d", "\uff4d", "M", "\uff2d", "\uff2d"];
    a[78] = ["n", "\uff4e", "\uff4e", "N", "\uff2e", "\uff2e"];
    a[79] = ["o", "\uff4f", "\uff4f", "O", "\uff2f", "\uff2f"];
    a[80] = ["p", "\uff50", "\uff50", "P", "\uff30", "\uff30"];
    a[81] = ["q", "\uff51", "\uff51", "Q", "\uff31", "\uff31"];
    a[82] = ["r", "\uff52", "\uff52", "R", "\uff32", "\uff32"];
    a[83] = ["s", "\uff53", "\uff53", "S", "\uff33", "\uff33"];
    a[84] = ["t", "\uff54", "\uff54", "T", "\uff34", "\uff34"];
    a[85] = ["u", "\uff55", "\uff55", "U", "\uff35", "\uff35"];
    a[86] = ["v", "\uff56", "\uff56", "V", "\uff36", "\uff36"];
    a[87] = ["w", "\uff57", "\uff57", "W", "\uff37", "\uff37"];
    a[88] = ["x", "\uff58", "\uff58", "X", "\uff38", "\uff38"];
    a[89] = ["y", "\uff59", "\uff59", "Y", "\uff39", "\uff39"];
    a[90] = ["z", "\uff5a", "\uff5a", "Z", "\uff3a", "\uff3a"];
    a[96] = ["0", "0", "\uff10", ")", "\uff09", "\uff09"];
    a[97] = ["1", "1", "\uff11", "!", "\uff01", "\uff01"];
    a[98] = ["2", "2", "\uff12", "@", "\uff20", "@"];
    a[99] = ["3", "3", "\uff13", "#", "\uff03", "#"];
    a[100] = ["4", "4", "\uff14", "$", "\uff04", "\uffe5"];
    a[101] = ["5", "5", "\uff15", "%", "\uff05", "\uff05"];
    a[102] = ["6", "6", "\uff16", "^", "\uff3e", "\u2026\u2026"];
    a[103] = ["7", "7", "\uff17", "&", "\uff06", "&"];
    a[104] = ["8", "8", "\uff18", "*", "\uff0a", "*"];
    a[105] = ["9", "9", "\uff19", "(", "\uff08", "\uff08"];
    a[106] = ["*", "\uff0a", "*", "*", "\uff0a", "*"];
    a[107] = ["+", "\uff0b", "+", "+", "\uff0b", "+"];
    a[109] = ["-", "\uff0d", "-", "-", "\uff0d", "-"];
    a[110] = [".", "\uff0e", ".", ".", "\uff0e", "."];
    a[111] = ["/", "\uff0f", "/", "/", "\uff0f", "/"];
    a[186] = [";", "\uff1b", "\uff1b", ":", "\uff1a", "\uff1a"];
    a[187] = ["=", "\uff1d", "=", "+", "\uff0b", "+"];
    a[188] = [",", "\uff0c", "\uff0c", "<", "\uff1c", "\u300a"];
    a[189] = ["-", "\uff0d", "-", "_", "\uff3f", "\u2014\u2014"];
    a[190] = [".", "\uff0e", "\u3002", ">", "\uff1e", "\u300b"];
    a[191] = ["/", "\uff0f", "\u3001", "?", "\uff1f", "\uff1f"];
    a[192] = ["`", "\uff40", "\u00b7", "~", "\uff5e", "\uff5e"];
    a[219] = ["[", "\uff3b", "\u3010", "{", "\uff5b", "{"];
    a[220] = ["\\", "\uff3c", "\u3001", "|", "\uff5c", "|"];
    a[221] = ["]", "\uff3d", "\u3011", "}", "\uff5d", "}"];
    a[222] = ["'", "\uff07", "\u2018", "\u2019", '"', "\uff02", "\u201c", "\u201d"];
    //构建样式表、toolbarpanel、inputpanel
    g.build = (function() {
        //将样式表插入head
        function v(A) {
            if (g.isIE) {
                var B = document.createStyleSheet();
                B.id = "wubi";
                B.cssText = A
            } else {
                var z = n("style");
                z.id = "wubi";
                z.type = "text/css";
                z.appendChild(document.createTextNode(A));
                document.getElementsByTagName("HEAD")[0].appendChild(z)
            }
            if (g.isIE == 6) {
                y()
            }
        }
        //设置背景?
        function y() {
            var A = " url(about:blank) fixed";
            var z = document.documentElement,
            B = document.body;
            if (z.currentStyle.backgroundImage == "none") {
                z.style.background = z.currentStyle.backgroundColor + A
            } else {
                if (B.currentStyle.backgroundImage == "none") {
                    B.style.background = B.currentStyle.backgroundColor + A
                }
            }
        }
        //添加样式
        function t() {
            var z = [];
            z.push("#wubi_tools{height:26px;font-size:12px;color:#000;position:absolute;z-index:99999;-moz-user-select:none;display:none}");
            z.push("#wubi_tools_on{width:140px;height:26px;background:url(https://gitee.com/zhangkefei/wubi/raw/master/zhkf_wubi_bg.gif);position:absolute;right:0}");
            z.push("#wubi_tools_on span{width:23px;height:26px;display:inline-block;background:url(https://gitee.com/zhangkefei/wubi/raw/master/zhkf_wubi_bg.gif);cursor:pointer}");
            z.push("span#wubi_tools_drag{width:36px;background:none;cursor:move}");
            z.push("#wubi_tools_on .close_default{width:35px;background:none}");
            z.push("#wubi_tools_on .close_hover{width:35px;background-position:-105px -27px}");
            z.push("#wubi_tools_on .ch_a_default{background-position:-36px 0}");
            z.push("#wubi_tools_on .ch_a_hover{background-position:-36px -27px}");
            z.push("#wubi_tools_on .ch_b_default{background-position:-36px -54px}");
            z.push("#wubi_tools_on .ch_b_hover{background-position:-36px -81px}");
            z.push("#wubi_tools_on .bc_a_default{background-position:-59px 0}");
            z.push("#wubi_tools_on .bc_a_hover{background-position:-59px -27px}");
            z.push("#wubi_tools_on .bc_b_default{background-position:-59px -54px}");
            z.push("#wubi_tools_on .bc_b_hover{background-position:-59px -81px}");
            z.push("#wubi_tools_on .pt_a_default{background-position:-81px 0}");
            z.push("#wubi_tools_on .pt_a_hover{background-position:-81px -27px}");
            z.push("#wubi_tools_on .pt_b_default{background-position:-81px -54px}");
            z.push("#wubi_tools_on .pt_b_hover{background-position:-81px -81px}");
            z.push("#wubi_tools_off{width:38px;height:26px;display:none;position:absolute;right:0}");
            z.push("#wubi_tools_off span{width:29px;height:26px;display:inline-block;background:url(https://gitee.com/zhangkefei/wubi/raw/master/zhkf_wubi_bg.gif) 0 -108px;cursor:pointer}");
            z.push("#wubi_tools_off .off_logo_default{background-position:-52px -108px}");
            z.push("#wubi_tools_off .off_logo_hover{background-position:-9px -108px}");
            z.push("span#wubi_tools_off_drag{width:9px;cursor:move}");
            z.push("#wubi_panel{position:absolute;z-index:99999;display:none}");
            z.push("#wubi_panel table{width:350px;border:0}");
            z.push("#wubi_panel td{font:14px arial;color:#000;height:59px;text-align:left;vertical-align:top;white-space:nowrap;-moz-user-select:none}");
            z.push(".panel_l{width:14px;background:url(https://gitee.com/zhangkefei/wubi/raw/master/zhkf_wubi_bg.gif) no-repeat 0 -135px}");
            z.push(".panel_c{background:url(https://gitee.com/zhangkefei/wubi/raw/master/zhkf_wubi_bg.gif) repeat-x 0 -195px}");
            z.push(".panel_r{width:38px;background:url(https://gitee.com/zhangkefei/wubi/raw/master/zhkf_wubi_bg.gif) no-repeat right -135px}");
            z.push(".panel_m{height:24px;cursor:move}");
            z.push(".panel_l div{width:14px}");
            z.push(".panel_r div{width:38px}");
            z.push(".panel_c a{font-size:12px;color:#366F9B;position:absolute;right:38px;top:7px;text-decoration:underline}");
            z.push("#wubi_cursor{width:1px;height:16px;background:#EB4F04;overflow:hidden}");
            z.push("#wubi_input_holder{font:bold 16px/24px arial;color:#369;padding-right:100px}");
            z.push("#wubi_input span{display:inline-block}");
            z.push("#wubi_selector{font:16px 'simsun';padding-top:8px;cursor:default}");
            z.push("#wubi_selector span{cursor:pointer}");
            z.push(".wubi_selected{color:#eb4f03}");
            z.push(".wubi_page{width:9px;height:9px;overflow:hidden;position:absolute;top:38px;background:url(https://gitee.com/zhangkefei/wubi/raw/master/zhkf_wubi_bg.gif)}");
            z.push(".wubi_sel_pre_on{right:27px;background-position:-85px -110px;cursor:pointer}");
            z.push(".wubi_sel_pre_off{right:27px;background-position:-104px -173px}");
            z.push(".wubi_sel_nxt_on{right:12px;background-position:-96px -110px;cursor:pointer}");
            z.push(".wubi_sel_nxt_off{right:12px;background-position:-119px -173px}");
            z.push("#wubi_msg_off{width:125px;left:60px;top:-50px}");
            z.push("#wubi_msg_off p{text-align:left}");
            z.push("#wubi_msg_on{width:118px;right:-40px;top:-32px}");
            z.push("#wubi_msg_ch{width:120px;right:32px;top:-32px}");
            z.push("#wubi_msg_bc{width:150px;right:-10px;top:-32px}");
            z.push("#wubi_msg_pt{width:135px;right:-28px;top:-32px}");
            z.push(".wubi_msg{font:12px arial;position:absolute;z-index:99999;display:none}");
            z.push(".wubi_msg p{border:1px solid #a1c2f2;background:#dbe9f9;margin:0;padding:3px 6px;line-height:18px;text-align:center}");
            z.push(".wubi_msg div{height:7px;overflow:hidden;background:url(https://gitee.com/zhangkefei/wubi/raw/master/zhkf_wubi_bg.gif) center -256px;position:relative;top:-1px}");
            z.push(".wubi_msg b{width:2px;height:2px;float:left;overflow:hidden;background:url(https://gitee.com/zhangkefei/wubi/raw/master/zhkf_wubi_bg.gif) -85px -121px}");
            z.push(".wubi_msg .r1{_margin-right:-2px}");
            z.push(".wubi_msg .r2{float:right;background-position:-87px -121px}");
            z.push(".wubi_msg .r3{background-position:-85px -123px;margin-top:-2px}");
            z.push(".wubi_msg .r4{float:right;background-position:-87px -123px;margin-top:-2px}");
            z.push("#wubi_menu{width:105px;height:54px;margin:0;padding:7px 0 0;list-style:none;position:absolute;z-index:99999;left:0;top:-61px;background:url(https://gitee.com/zhangkefei/wubi/raw/master/zhkf_wubi_bg.gif) no-repeat 0 -265px;display:none}");
            z.push("#wubi_menu li a{width:101px;height:25px;line-height:25px;color:#000;display:block;text-decoration:none;text-align:left;text-indent:20px;margin:0 auto}");
            z.push("#wubi_menu li a:hover{color:#fff;background:#457cd8}");
            v(z.join(""))
        }
        //构建toolbar/inputpanel
        function x() {
            var B = k("wubi_tools") ? k("wubi_tools") : n("DIV");
            B.id = "wubi_tools";
            var A = '<div id="wubi_tools_off"><div><div id="wubi_msg_on" class="wubi_msg"><b class="r1"></b><b class="r2"></b><p>\u5f00\u542f\u5728\u7ebf\u8f93\u5165\u6cd5</p><b class="r3"></b><b class="r4"></b><div></div></div></div><span id="wubi_tools_off_drag"></span><span id="wubi_tools_off_logo" class="off_logo_default"></span></div><div id="wubi_tools_on"><div><ul id="wubi_menu"><li><a href="https://weibo.com/zhkfhunter" class="wubi_link" target="_blank">\u53cd\u9988\u5efa\u8bae</a></li><li><a href="https://weibo.com/zhkfhunter" class="wubi_link" target="_blank">\u5e2e\u52a9</a></li></ul><div id="wubi_msg_ch" class="wubi_msg"><b class="r1"></b><b class="r2"></b><p>\u5207\u6362\u4e2d/\u82f1\u6587(Shift)</p><b class="r3"></b><b class="r4"></b><div></div></div><div id="wubi_msg_bc" class="wubi_msg"><b class="r1"></b><b class="r2"></b><p>\u5168/\u534a\u89d2(Shift + Space)</p><b class="r3"></b><b class="r4"></b><div></div></div><div id="wubi_msg_pt" class="wubi_msg"><b class="r1"></b><b class="r2"></b><p>\u4e2d/\u82f1\u6587\u6807\u70b9(Ctrl + .)</p><b class="r3"></b><b class="r4"></b><div></div></div><div id="wubi_msg_off" class="wubi_msg"><b class="r1"></b><b class="r2"></b><p>\u70b9\u51fb\u201c\u5173\u95ed\u201d\uff0c\u5728\u7ebf\u8f93\u5165\u6cd5\u6682\u505c\u4f7f\u7528\u3002</p><b class="r3"></b><b class="r4"></b><div></div></div></div><span id="wubi_tools_drag"></span><span id="wubi_tools_ch" class="ch_a_default"></span><span id="wubi_tools_bc" class="bc_b_default"></span><span id="wubi_tools_pt" class="pt_a_default"></span><span id="wubi_tools_close" class="close_default"></span></div>';
            B.innerHTML = A;
            document.body.appendChild(B);
            var z = k("wubi_panel") ? k("wubi_panel") : n("DIV");
            z.id = "wubi_panel";
            var A = '<table cellpadding="0" cellspacing="0" onselectstart="return false;"><tr><td class="panel_l"><div class="panel_m"></div></td><td class="panel_c">' + g.feedbackLink + '<div id="wubi_input_holder" class="panel_m"><span id="wubi_input"></span></div><div id="wubi_selector"></div></td><td class="panel_r"><div class="panel_m"></div><span id="wubi_sel_pre" class="wubi_page wubi_sel_pre_off"></span><span id="wubi_sel_nxt" class="wubi_page wubi_sel_nxt_off"></span></td></tr></table>';
            z.innerHTML = A;
            document.body.appendChild(z);
            k("wubi_input").innerHTML = g.cursorHtml
        }
        //设置面板不被选中
        function u() {
            var C = k("wubi_tools");
            var D = C.getElementsByTagName("*");
            var z = k("wubi_panel");
            var A = z.getElementsByTagName("*");
            C.setAttribute("unselectable", "on");
            z.setAttribute("unselectable", "on");
            for (var B = 0; B < D.length; B++) {
                D[B].setAttribute("unselectable", "on")
            }
            for (var B = 0; B < A.length; B++) {
                A[B].setAttribute("unselectable", "on")
            }
        }
        //初始化，获取面板对象
        function w() {
            //添加样式
            t();
            //构建toolbar/inputpanel
            x();
            //设置面板不被选中
            u();
            //获取面板对象
            g.tools = k("wubi_tools");
            g.tools_on = k("wubi_tools_on");
            g.tools_drag = k("wubi_tools_drag");
            g.tools_ch = k("wubi_tools_ch");
            g.tools_bc = k("wubi_tools_bc");
            g.tools_pt = k("wubi_tools_pt");
            g.tools_close = k("wubi_tools_close");
            g.tools_off = k("wubi_tools_off");
            g.tools_off_drag = k("wubi_tools_off_drag");
            g.tools_off_logo = k("wubi_tools_off_logo");
            g.panel = k("wubi_panel");
            g.panel_pre = k("wubi_sel_pre");
            g.panel_nxt = k("wubi_sel_nxt");
            g.panel_input = k("wubi_input");
            g.panel_selector = k("wubi_selector");
            g.wubi_msg_on = k("wubi_msg_on");
            g.wubi_msg_ch = k("wubi_msg_ch");
            g.wubi_msg_bc = k("wubi_msg_bc");
            g.wubi_msg_pt = k("wubi_msg_pt");
            g.wubi_msg_off = k("wubi_msg_off");
            g.wubi_menu = k("wubi_menu")
        }
        return {
            init: w
        }
    })();
    g.toolbar = (function() {
        var x = false;
        //设置toolbar位置
        function E() {
            var M = g.tools;
            var H = document.documentElement,
            J = document.body;
            var I = g.isStrict ? H.clientHeight: J.clientHeight;
            var N = g.isStrict ? H.clientWidth: J.clientWidth;
            var L = N - M.offsetWidth - g.option.tRight;
            var K = I - M.offsetHeight - g.option.tBottom;
            if (g.isIE == 6) {
                M.style.position = "absolute";
                M.style.setExpression("left", "eval((document.documentElement.scrollLeft || document.body.scrollLeft) + " + L + ") + 'px'");
                M.style.setExpression("top", "eval((document.documentElement.scrollTop || document.body.scrollTop) + " + K + ") + 'px'")
            } else {
                M.style.position = "fixed";
                M.style.left = L + "px";
                M.style.top = K + "px"
            }
        }
        //修正toolbar位置
        function B() {
            var H = g.tools;
            if (H.style.display != "block") {
                //display
                o(H)
            }
            //设置toolbar位置
            E();
            //hide
            d(H)
        }
        //如果cookie中有配置信息则使用
        function z() {
            if (g.domain && navigator.cookieEnabled && /\bwubi=(\d+)(;|$)/i.test(document.cookie)) {
                var H = RegExp.$1;
                g.status.enable = parseInt(H.substr(0, 1));
                if (H.length == 5) {
                    g.status.ch = parseInt(H.substr(1, 1));
                    g.status.bc = parseInt(H.substr(2, 1));
                    g.status.pt = parseInt(H.substr(3, 1));
                    g.status.on = parseInt(H.substr(4, 1))
                }
            }
            //根据状态数据执行相应动作
            D()
        }
        //根据状态数据执行相应动作
        function D() {
            var I = g.toolbar;
            var H = g.tools_ch;
            if (g.status.ch) {
                I.setModeOn(H)
            } else {
                I.setModeOff(H)
            }
            var K = g.tools_bc;
            if (g.status.bc) {
                I.setModeOn(K)
            } else {
                I.setModeOff(K)
            }
            var J = g.tools_pt;
            if (g.status.pt) {
                I.setModeOn(J)
            } else {
                I.setModeOff(J)
            }
        }
        //显示toolbar
        function F() {
            o(g.tools);
            g.toolbar.isShow = true
        }
        //隐藏toolbar
        function A() {
            if (g.isBlur) {
                d(g.tools);
                g.inputpanel.hide();
                g.toolbar.isShow = false
            }
        }
        //切换为toolbar开启状态
        function u() {
            setTimeout(function() {
                o(g.tools_on);
                d(g.tools_off);
                o(g.wubi_msg_off);
                d(g.wubi_msg_off)
            },
            10)
        }
        //切换为toolbar关闭状态
        function C() {
            o(g.wubi_msg_on);
            d(g.wubi_msg_on);
            d(g.wubi_menu);
            d(g.tools_on);
            o(g.tools_off)
        }
        //切换样式为hover
        function y(H) {
            H.className = H.className.replace(/_default/, "_hover")
        }
        //切换样式为default
        function w(H) {
            H.className = H.className.replace(/_hover/, "_default")
        }
        //setModeOn
        function v(H) {
            H.className = H.className.replace(/_b_/, "_a_")
        }
        //setModeOff
        function t(H) {
            H.className = H.className.replace(/_a_/, "_b_")
        }
        //初始化
        function G() {
            //修正toolbar位置
            B();
            //如果cookie中有配置信息则使用
            z();
            //绑定一系列事件
            p(window, "scroll", E);
            var L = g.tools_off_logo;
            p(L, "mouseover",
            function() {
                //切换样式为hover
                y(L);
                //show
                o(g.wubi_msg_on)
            });
            p(L, "mouseout",
            function() {
                //切换样式为default
                w(L);
                //hide
                d(g.wubi_msg_on)
            });
            p(L, "click",
            function() {
                //show
                o(g.wubi_msg_off)
            });
            var K = g.tools_close;
            p(K, "mouseover",
            function() {
                //切换样式为hover
                y(K);
                //show
                o(g.wubi_msg_off)
            });
            p(K, "mouseout",
            function() {
                //切换样式为default
                w(K);
                //hide
                d(g.wubi_msg_off)
            });
            p(K, "click",
            function() {
                //切换样式为hover
                y(L);
                //show
                o(g.wubi_msg_on);
                //hide
                d(g.wubi_menu)
            });
            var H = g.tools_ch;
            p(H, "mouseover",
            function() {
                //切换样式为hover
                y(H);
                //show
                o(g.wubi_msg_ch)
            });
            p(H, "mouseout",
            function() {
                //切换样式为default
                w(H);
                //hide
                d(g.wubi_msg_ch)
            });
            var J = g.tools_bc;
            p(J, "mouseover",
            function() {
                //切换样式为hover
                y(J);
                //show
                o(g.wubi_msg_bc)
            });
            p(J, "mouseout",
            function() {
                //切换样式为default
                w(J);
                //hide
                d(g.wubi_msg_bc)
            });
            var I = g.tools_pt;
            p(I, "mouseover",
            function() {
                //切换样式为hover
                y(I);
                //show
                o(g.wubi_msg_pt)
            });
            p(I, "mouseout",
            function() {
                //切换样式为default
                w(I);
                //hide
                d(g.wubi_msg_pt)
            });
            //阻止默认右键菜单，显示自定义菜单
            p(g.tools_on, "contextmenu",
            function(N) {
                var M = N.target || N.srcElement;
                if (M.id != "wubi_tools_close") {
                    o(g.wubi_menu)
                }
                window.event ? N.returnValue = false: N.preventDefault()
            })
        }
        return {
            show: F,
            hide: A,
            toolsOnShow: u,
            toolsOnHide: C,
            setModeOn: v,
            setModeOff: t,
            setPosition: E,
            resetStatus: D,
            isShow: x,
            init: G
        }
    })();
    //inputPanel
    g.inputpanel = (function() {
        var A = false;
        //清理wubi_temp
        function F() {
            var K = k("wubi_temp");
            if (K) {
                document.body.removeChild(K)
            }
        }
        //重新构建wubi_temp
        function x(L) {
            //清理wubi_temp
            F();
            //重新构建wubi_temp
            var R = L.ownerDocument.defaultView;
            var P = s(L, R);//计算输入框位置
            var M = n("div");
            M.id = "wubi_temp";
            M.style.width = L.clientWidth - 1 + "px";
            M.style.height = L.clientHeight + "px";
            M.style.visibility = "hidden";
            M.style.position = "absolute";
            M.style.wordWrap = "break-word";
            M.style.textAlign = "left";
            M.style.left = P.x + "px";
            M.style.top = P.y + "px";
            document.body.appendChild(M);
            var N = L.value;
            var O = N.substring(0, L.selectionStart);
            M.innerHTML = i(O);//转换特殊字符
            //重新构建wubi_cursor_temp
            var Q = k("wubi_cursor_temp");
            if (Q) {
                M.removeChild(Q)
            } else {
                Q = n("span");
                Q.id = "wubi_cursor_temp";
                Q.innerHTML = "&nbsp;";
                M.appendChild(Q)
            }
            //获取当前元素最终使用的CSS属性值
            var T = ["font", "fontFamily", "fontSize", "fontWeight", "fontVariant", "fontStyle", "letterSpacing", "wordSpacing", "lineHeight", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "borderWidth", "borderTopWidth", "borderRightWidth", "borderBottomWidth", "borderLeftWidth", "borderStyle", "borderTopStyle", "borderRightStyle", "borderBottomStyle", "borderLeftStyle", "overflowX", "overflowY"];
            for (var K = 0; K < T.length; K++) {
                var S = f(L, T[K]);
                if (S) {
                    //设置样式
                    e(M, T[K], S)
                }
            }
            return Q
        }
        //获取光标位置，确定输入框位置
        function I(M) {
            var K = 0,
            O = 0;
            var L = M.ownerDocument.selection.createRange();//获取选择内容
            if (M.tp == "text") {
                var N = s(M);
                K = N.x + L.offsetLeft + 10;
                O = L.boundingTop + L.boundingHeight
            } else {
                var N = s(M);
                K = L.offsetLeft + 10;
                O = L.offsetTop + 10
            }
            return {
                x: K,
                y: O
            }
        }
        //返回当前document对象所关联的window对象
        function J(L) {
            var K;
            if (g.isIE) {
                K = L.ownerDocument.parentWindow
            } else {
                K = L.ownerDocument.defaultView
            }
            return K
        }
        //计算实际像素位置
        function y(P) {
            var M = 0,
            R = 0;
            var L = B(P);
            var O = J(P);
            var Q = s(P, O);
            M += Q.x;
            R += Q.y;
            var K = O.document.documentElement;
            var N = O.document.body;
            M -= K.scrollLeft || N.scrollLeft;
            R -= K.scrollTop || N.scrollTop;
            return {
                x: M,
                y: R
            }
        }
        //return a bool type.
        function B(K) {
            if (document.documentMode == 9) {//documentMode 属性返回浏览器渲染文档的模式
                b = K.ownerDocument.body.innerHTML != window.document.body.innerHTML
            } else {
                b = K.ownerDocument != window.document//ownerDocument返回元素的根元素（文档对象）
            }
            return b
        }
        //
        function E(P) {
            var M = 0,
            R = 0;
            var Q;
            var L = B(P);
            while (L) {
                var O = J(P);//return window obj
                Q = s(P, O);
                P = O.frameElement;
                M += Q.x;
                R += Q.y;
                var K = O.document.documentElement;
                var N = O.document.body;
                M -= K.scrollLeft || N.scrollLeft;
                R -= K.scrollTop || N.scrollTop;
                L = B(P)
            }
            Q = s(P);
            M += Q.x;
            R += Q.y;
            return {
                x: M,
                y: R
            }
        }
        function w(K) {
            return {
                x: E(K).x - y(K).x,
                y: E(K).y - y(K).y
            }
        }
        //返回滚动距离
        function D(K) {
            return {
                x: K.document.documentElement.scrollLeft || K.document.body.scrollLeft,
                y: K.document.documentElement.scrollTop || K.document.body.scrollTop
            }
        }
        //
        function H() {
            var ac = g.iptCurTarget;
            if (! (ac || A)) {//A:isShow
                return
            }
            var L = 0,
            T = 0;
            var O;
            if (ac.tp == "textarea") {
                var K = w(ac);
                if (g.isIE) {
                    O = I(ac);
                    if (document.documentMode >= 8) {
                        L = O.x
                    } else {
                        L = K.x + O.x
                    }
                    T = K.y + O.y + 5
                } else {
                    var R = x(ac);
                    var W = D(ac.ownerDocument.defaultView);
                    var U = R.offsetHeight;
                    O = s(R);
                    L = K.x + O.x - W.x - ac.scrollLeft + 10;
                    T = K.y + O.y - W.y + U - ac.scrollTop
                }
            } else {
                if (ac.tp == "iframe" || ac.tp == "div") {
                    var Z = 20,
                    X = 40;
                    if (ac.tp == "div") {
                        Z = 10;
                        X = 20
                    }
                    var K = w(ac);
                    if (g.isIE) {
                        var N = ac.ownerDocument.parentWindow;
                        var W = D(N);
                        var Q = "<span id='wubi_cursor_temp'>&nbsp;</span>";
                        if (ac.contentWindow) {
                            var ad = ac.contentWindow.document
                        } else {
                            var ad = ac.ownerDocument
                        }
                        var S = ad.selection.createRange();
                        S.collapse();
                        S.pasteHTML(Q);
                        S = null;
                        var aa;
                        if (ac.tp == "iframe") {
                            aa = ac.contentWindow.document
                        } else {
                            aa = ac.ownerDocument
                        }
                        var V = aa.getElementById("wubi_cursor_temp");
                        O = s(V, N);
                        V.parentNode.removeChild(V);
                        V = null
                    } else {
                        var N = ac.ownerDocument.defaultView;
                        var W = D(N);
                        var P;
                        if (ac.tp == "iframe") {
                            P = ac.contentWindow
                        } else {
                            P = N
                        }
                        var V = P.document.createElement("span");
                        var S = P.getSelection().getRangeAt(0);
                        V.id = "wubi_cursor_temp";
                        try {
                            S.insertNode(V);
                            O = s(V, P);
                            V.parentNode.removeChild(V)
                        } catch(Y) {
                            O = E(ac)
                        }
                        S = null;
                        V = null
                    }
                    if (ac.tp == "iframe") {
                        var P = ac.contentWindow;
                        if (!B(ac)) {
                            L = E(ac).x + O.x + 10;
                            T = E(ac).y + O.y + 10;
                            if (g.isIE) {
                                T -= D(window).y
                            }
                        } else {
                            L = K.x + O.x - D(P).x - W.x + Z;
                            T = K.y + O.y - D(P).y - W.y + X
                        }
                        if (g.isIE) {
                            T += 10
                        }
                    } else {
                        L = K.x + O.x - W.x + Z;
                        T = K.y + O.y - W.y + X
                    }
                } else {
                    var O = E(ac);
                    L = O.x + 20;
                    T = O.y + ac.offsetHeight
                }
            }
            var ab = document.body.offsetHeight;
            var M = ac.offsetHeight;
            if (ab > T && T + g.option.panelH > ab) {
                T = T - g.option.panelH - M
            }
            g.panel.style.left = L + "px";
            g.panel.style.top = T + "px"
        }
        //显示inputpanel
        function G() {
            o(g.panel);
            g.inputpanel.isShow = true;
            H(g.iptCurTarget);
            g.panelShow()
            //阻止默认右键菜单，显示自定义菜单
            p(g.panel, "contextmenu",
            function(N) {
                window.event ? N.returnValue = false: N.preventDefault()
            })
        }
        //隐藏inputpanel
        function C() {
            //return;
            d(g.panel);
            g.inputpanel.isShow = false;
            F();
            g.inputsource = "";
            g.inputselected = "";
            g.pageTimes = 0;
            g.isSubAddr = false;
            g.panel_input.innerHTML = g.cursorHtml;
            g.panel_selector.innerHTML = "";
            g.curSelectNum = 1;
            g.data.resetGroup();
            g.panelHide()
        }
        //生成结果
        function u() {
            if (!g.data.db.data) {
                return false
            }
            t();//生成字符选择框
            z();//上一页
            v();//下一页
            if (g.needIptBack) {
                g.control.setInput()
            }
            //重新绑定事件
            l(document, "mouseup", g.control.stopAutoPage);
            p(document, "mouseup", g.control.stopAutoPage)
        }
        //生成字符选择框
        function t() {
            var M = "";
            var O = (g.data.db.curpage - 1) * g.shownum;
            var N = O + g.shownum;
            if (N > g.data.db.totalnum) {
                N = g.data.db.totalnum
            }
            for (var L = O; L < N; L++) {
                var K = L - O + 1;
                M += "<span id='wubi_selector_" + K + "'";
                if (K == 1) {
                    M += " class='wubi_selected'"
                }
                M += " onclick='wubi.control.clkSelResult(this)' sn='" + g.data.db.data[L][1] + "' unselectable='on'>" + K + "." + g.data.db.data[L][0] + "</span>&nbsp;&nbsp;"
            }
            g.panel_selector.innerHTML = M;
            g.selectLock = false
        }
        //上一页
        function z() {
            var K = g.panel_pre;
            if (g.data.db.curpage > 1) {
                K.className = "wubi_page wubi_sel_pre_on";
                l(K, "mousedown", g.control.autoPagePre);
                p(K, "mousedown", g.control.autoPagePre)
            } else {
                K.className = "wubi_page wubi_sel_pre_off";
                l(K, "mousedown", g.control.autoPagePre)
            }
        }
        //下一页
        function v() {
            var K = g.panel_nxt;
            if (g.data.db.totalpage > 1 && g.data.db.curpage < g.data.db.totalpage) {
                K.className = "wubi_page wubi_sel_nxt_on";
                l(K, "mousedown", g.control.autoPageNxt);
                p(K, "mousedown", g.control.autoPageNxt)
            } else {
                K.className = "wubi_page wubi_sel_nxt_off";
                l(K, "mousedown", g.control.autoPageNxt)
            }
        }
        return {
            setPosition: H,
            isShow: A,
            show: G,
            hide: C,
            setResults: u
        }
    })();
    g.control = (function() {
        //在cookie中保存配置
        function I() {
            if (!g.domain) {
                return
            }
            if (navigator.cookieEnabled) {
                var ab = new Date();
                ab.setTime(ab.getTime() + 365 * 24 * 3600 * 1000);
                var aa = g.status.enable + "" + g.status.ch + "" + g.status.bc + "" + g.status.pt + "" + g.status.on;
                document.cookie = "wubi=" + aa + ";domain=" + g.domain + ";path=/;expires=" + ab.toGMTString()
            }
        }
        //开启输入法
        function T(aa) {
            g.status.on = 1;
            g.toolbar.toolsOnShow();
            g.keywatcher.on();
            g.inputwatcher.on();
            if (aa) {
                v(null, true);//在当前控件上禁用外部输入法
                I()//在cookie中保存配置
            }
        }
        //关闭输入法
        function C(aa) {
            g.status.on = 0;
            g.toolbar.toolsOnHide();
            g.inputpanel.hide();
            g.keywatcher.off();
            g.inputwatcher.off();
            A(null, true);//恢复目标控件调用外部输入法状态
            if (aa) {
                I()//在cookie中保存配置
            }
        }
        //重置输入法
        function J() {
            g.isClose = false;
            g.status.enable = 2;
            g.status.ch = 1;
            g.status.bc = 1;
            g.status.pt = 1;
            g.toolbar.resetStatus();
            T(1);//开启输入法
            g.runner.startAutoFocus()
        }
        //禁用输入法
        function D() {
            g.status.enable = 0;
            C(1);//关闭输入法
            g.isClose = true;
            g.toolbar.hide();
            g.runner.stopAutoFocus()
        }
        //检测目标是否是可输入控件
        function R(aa) {
            if (aa && (aa.tp == "input" || aa.tp == "textarea")) {
                return true
            }
            return false
        }
        //恢复目标控件调用外部输入法状态
        function A(ae, ab) {
            var aa = [];
            if (ab) {
                aa = g.iptTargets
            } else {
                aa.push(ae)
            }
            for (var ac = 0; ac < aa.length; ac++) {
                var ad = aa[ac];
                if (ad.tp == "input" || ad.tp == "textarea") {
                    if (ad == g.iptCurTarget) {
                        ad.blur()
                    }
                    ad.style.imeMode = "auto";
                    if (g.hasSug) {
                        ad.setAttribute("autocomplete", "off")
                    } else {
                        ad.setAttribute("autocomplete", "on")
                    }
                    if (ad == g.iptCurTarget) {
                        ad.focus()
                    }
                }
            }
        }
        //在当前控件上禁用外部输入法
        function v(af, ab) {
            var aa = [];
            if (ab) {
                aa = g.iptTargets
            } else {
                aa.push(af)
            }
            for (var ad = 0; ad < aa.length; ad++) {
                var ae = aa[ad];
                if (ae.tp == "input" || ae.tp == "textarea") {
                    var ac = false;
                    if (ae == document.activeElement) {
                        ac = true
                    }
                    if (ac) {
                        ae.blur()
                    }
                    ae.style.imeMode = "disabled";
                    ae.setAttribute("autocomplete", "off");
                    if (ac) {
                        ae.focus()
                    }
                }
            }
        }
        //切换中文、英文输入方式
        function V() {
            var ab = g.tools_ch;
            var aa = g.tools_pt;
            g.control.enterInput();
            if (g.status.ch) {
                g.status.ch = 0;
                g.status.pt = 0;
                g.toolbar.setModeOff(ab);
                g.toolbar.setModeOff(aa);
                g.inputpanel.hide()
            } else {
                g.status.ch = 1;
                g.status.pt = 1;
                g.toolbar.setModeOn(ab);
                g.toolbar.setModeOn(aa)
            }
            I()//在cookie中保存配置
        }
        //切换全角、半角
        function L() {
            var aa = g.tools_bc;
            if (g.status.bc) {
                g.status.bc = 0;
                g.toolbar.setModeOff(aa)
            } else {
                g.status.bc = 1;
                g.toolbar.setModeOn(aa)
            }
            I()//在cookie中保存配置
        }
        //切换标点
        function u() {
            var aa = g.tools_pt;
            if (g.status.pt) {
                g.status.pt = 0;
                g.toolbar.setModeOff(aa)
            } else {
                g.status.pt = 1;
                g.toolbar.setModeOn(aa)
            }
            I()//在cookie中保存配置
        }
        //呈现上一页，预读取再上一页
        function H() {
            z();
            g.pageT = setInterval(z, 300)
        }
        //呈现上一页
        function z() {
            g.data.db.curpage--;
            if (g.data.db.curpage < 1) {
                g.data.db.curpage = 1;
                clearInterval(g.pageT)
            }
            g.needIptBack = false;
            g.inputpanel.setResults()
        }
        //呈现下一页，预读取再下一页
        function x() {
            O();
            g.pageT = setInterval(O, 300)//预读取下一页
        }
        //呈现下一页
        function O() {
            g.data.db.curpage++;
            var ab = g.data.db.curpage;
            var aa = g.data.db.totalpage;
            if (ab >= aa) {
                g.data.db.curpage = aa;
                clearInterval(g.pageT)
            }
            if (g.data.db.enableGetData && ab == aa - 1) {
                g.data.param.bg += (4 * g.shownum);
                g.data.param.ed += (4 * g.shownum);
                g.tempsource = "";
                g.xpc.send();
                g.needIptBack = false
            } else {
                g.needIptBack = false;
                g.inputpanel.setResults()
            }
        }
        //清除预读取
        function N() {
            clearInterval(g.pageT)
        }
        //输入长句时，输入框中英文转换为中文
        function y(ad) {
            var ab = "";//英文
            var ac = g.inputselected;//中文
            for (var aa = 0; aa < ac.length; aa++) {
                ab += "<span class='wubi_ch'>" + ac.charAt(aa) + "</span>"
            }
            for (var aa = 0; aa < ad.length; aa++) {
                ab += "<span class='wubi_en'>" + ad.charAt(aa) + "</span>"
            }
            ab += g.cursorHtml;
            return ab
        }
        //删除字符串中html标签
        function G(aa) {
            return aa.replace(/<\/?[^>]+>/gi, "")
        }
        //清除选择框中选项样式
        function Q() {
            var ab = g.panel_selector.getElementsByTagName("span");
            for (var aa = 0; aa < ab.length; aa++) {
                ab[aa].className = ""
            }
        }
        //字符上屏
        function S(aa, af) {
            if (af) {
                g.inputpanel.hide()//隐藏输入框
            }
            if (/^\w+\'+/.test(g.inputsource)) {
                aa = aa.replace(/\'/g, "");
                aa = U(aa)//删除字符串开头数字序号
            }
            var ad = g.iptCurTarget;
            if (ad.tp == "iframe") {
                var ah = ad.contentWindow.document;
                if (g.isIE) {
                    ad.contentWindow.focus();
                    var ac = ah.selection.createRange();
                    if (af) {
                        ac.pasteHTML(aa);
                        ac.collapse()
                    } else {
                        ac.select()
                    }
                } else {
                    ad.contentWindow.focus();
                    if (af) {
                        ah.execCommand("insertHTML", false, aa)//当一个HTML文档切换到设计模式(designMode)时，文档对象暴露 execCommand方法
                    }
                }
            } else {
                if (ad.tp == "div" && !g.isIE) {
                    var ah = ad.ownerDocument;
                    if (aa != "") {
                        ah.execCommand("insertHTML", false, aa)
                    }
                }
                if (document.selection && !g.isOpera) {
                    ad.focus();
                    var ah = ad.ownerDocument;
                    var ac = ah.selection.createRange();
                    if (af) {
                        ac.text = aa;
                        ac.collapse()
                    }
                    ac.select()
                } else {
                    if (ad.selectionStart || ad.selectionStart > -1) {
                        ad.focus();
                        var ag = ad.scrollTop;
                        var ae = ad.selectionStart;
                        var ab = ad.selectionEnd;
                        if (af) {
                            var ai = ad.value;
                            ad.value = ai.substring(0, ae) + aa + ai.substring(ab, ai.length);
                            ad.selectionStart = ae + aa.length;
                            ad.selectionEnd = ae + aa.length
                        }
                        ad.scrollTop = ag
                    } else {
                        ad.focus();
                        ad.value += aa
                    }
                }
            }
        }
        //删除字符串开头数字序号
        function U(aa) {
            return aa.replace(/^\d\./, "")
        }
        //输入长句时，输入框中英文转换为中文
        function X() {
            if (g.needIptBack) {
                setTimeout(function() {
                    var aa = g.data.db.inputback;
                    if (aa != "") {
                        g.data.db.inputback = ""
                    }
                    g.panel_input.innerHTML = y(aa)//输入长句时，输入框中英文转换为中文
                },
                5)
            } else {
                g.panel_input.innerHTML = y(g.inputsource)//输入长句时，输入框中英文转换为中文
            }
        }
        //从选择文本到字符上屏
        function Y(ad) {
            g.pageTimes = 0;
            g.isSubAddr = false;
            if (g.selectLock) {
                return
            }
            g.selectLock = true;
            var aa = ad.getAttribute("sn");
            var af = "";
            if (aa > 0) {
                af = G(ad.innerHTML);//删除字符串中html标签
                af = U(af);//删除字符串开头数字序号
                g.inputselected += af//选择中文
            }
            S(g.inputselected, true);
        }
        //选择词语上屏
        function w(ab) {
            var aa = k("wubi_selector_" + ab);
            if (aa) {
                Y(aa)
            }
        }
        //上一页、下一页动作
        function F(ab) {
            if (ab == "pre") {
                g.curSelectNum--;
                if (g.data.db.curpage == 1) {
                    if (g.curSelectNum == 0) {
                        g.curSelectNum = 1
                    }
                } else {
                    if (g.curSelectNum == 0) {
                        g.curSelectNum = g.shownum;
                        z()//呈现上一页
                    }
                }
            } else {
                if (ab == "nxt") {
                    g.curSelectNum++;
                    if (g.data.db.curpage == g.data.db.totalpage) {
                        var aa = g.data.db.totalnum - (g.data.db.curpage - 1) * g.shownum;
                        if (g.curSelectNum > aa) {
                            g.curSelectNum = aa
                        }
                    } else {
                        if (g.curSelectNum > g.shownum) {
                            g.curSelectNum = 1;
                            O()//呈现下一页
                        }
                    }
                }
            }
            Q();//清除选择框中选项样式
            k("wubi_selector_" + g.curSelectNum).className = "wubi_selected"
        }
        //从选择文本到字符上屏
        function P(aa) {
            if (aa) {
                Y(aa)
            }
        }
        //从选择文本到字符上屏
        function K() {
            var aa = k("wubi_selector_" + g.curSelectNum);
            if (aa) {
                Y(aa)
            }
        }
        //确定输入结果,获取输入字符
        function B() {
            var aa = G(g.panel_input.innerHTML);//删除字符串中html标签
            if (aa != "") {
                g.data.group.en.push(aa);
                g.data.group.ch.push(aa);
                g.data.group.count = 0;
                g.data.sendGroupLog(0, 0);
                S(aa, true)//字符上屏
            }
        }
        //删除字符
        function Z(ac) {
            g.pageTimes = 0;
            g.isSubAddr = false;
            var aa = false;
            var ae = g.inputsource;
            if (!/\'$/.test(ae)) {
                g.selectLock = true
            }
            var ad = k("wubi_cursor");
            var af = ad.previousSibling;
            var ab = ad.nextSibling;
            if (ac == "left") {
                if (af) {
                    if (af.innerHTML == "'" || af.className == "wubi_ch") {
                        aa = true;
                        g.selectLock = false
                    }
                    g.panel_input.removeChild(af)
                } else {
                    return
                }
            } else {
                if (ac == "right") {
                    if (ab) {
                        if (ab.innerHTML == "'" || ab.className == "wubi_ch") {
                            aa = true;
                            g.selectLock = false
                        }
                        g.panel_input.removeChild(ab)
                    } else {
                        return
                    }
                }
            }
            af = null;
            ab = null;
            E();//长句时，暂存输入框中，中文和英文结果
            g.needIptBack = false;
            if (g.inputsource == "") {
                if (g.inputselected == "") {
                    S("", true);
                    g.inputpanel.hide()
                } else {
                    aa = true;
                    g.selectLock = false;
                    g.data.setSpecialData()
                }
            }
            if (! (aa || /\'$/.test(ae))) {
                g.data.restData()
            }
        }
        //输入文字-inputLetter
        function W(ai, ah) {
            g.pageTimes = 0;
            g.isSubAddr = false;
            var ac = k("wubi_cursor");
            var ag = ac.previousSibling;
            var ab = ac.nextSibling;
            //当输入光标后面为中文时，阻止输入字母
            if (ab && ab.className == "wubi_ch") {
                return
            }
            if (ai != "'") {
                g.selectLock = true
            } else {
                //当输入字符为单引号且后面字符为英文时，阻止输入
                if (ab && ab.className == "wubi_en") {
                    return
                }
            }
            var aa = G(g.panel_input.innerHTML);//删除字符串中html标签
            if (aa.length >= 80) {
                g.selectLock = false;
                return
            }
            if (ah) {
                var ae = k("wubi_selector_" + g.curSelectNum);
                if (ae) {
                    ai = g.inputselected + U(G(ae.innerHTML)) + ai
                }
                S(ai, true)//字符上屏
            } else {
                if (g.status.on && !g.inputpanel.isShow) {
                    g.inputpanel.show()
                }
                for (var af = 0; af < ai.length; af++) {
                    var ad = n("span");
                    ad.innerHTML = ai.substr(af, 1);
                    ad.className = "wubi_en";
                    g.panel_input.insertBefore(ad, ac);
                    ad = null
                }
                E();//长句时，暂存输入框中，中文和英文结果
                g.needIptBack = false;
                if (ai != "'") {
                    g.data.restData()
                }
            }
        }
        //长句时，暂存输入框中，中文和英文结果
        function E() {
            var ad = "",
            aa = "";
            var ac = g.panel_input.getElementsByTagName("span");
            for (var ab = 0; ab < ac.length; ab++) {
                var ae = ac[ab];
                if (ae.className == "wubi_ch") {
                    ad += ae.innerHTML
                } else {
                    if (ae.className == "wubi_en") {
                        aa += ae.innerHTML
                    }
                }
            }
            g.inputselected = ad;
            g.inputsource = aa
        }
        //移动光标
        function t(ab) {
            var ad = k("wubi_cursor");
            switch (ab) {
            case "left":
                var ae = ad.previousSibling;
                if (ae) {
                    g.panel_input.insertBefore(ad, ae)
                }
                ae = null;
                break;
            case "right":
                var aa = ad.nextSibling;
                if (aa) {
                    g.panel_input.insertBefore(aa, ad)
                }
                aa = null;
                break;
            case "home":
                var ae = ad.previousSibling;
                var ac = g.panel_input.childNodes[0];
                if (ae && ac) {
                    g.panel_input.insertBefore(ad, ac)
                }
                ae = null;
                break;
            case "end":
                var aa = ad.nextSibling;
                if (aa) {
                    g.panel_input.appendChild(ad)
                }
                aa = null;
                break
            }
        }
        //初始化，绑定一系列事件
        function M() {
            p(g.tools_close, "click",
            function() {
                C(1);//关闭输入法
                r(0, 0, 0, 0, 0)
            });
            p(g.tools_off_logo, "click",
            function() {
                T(1);//开启输入法
                r(0, 1, 0, 0, 0)
            });
            p(g.tools_ch, "click", V);//切换中文、英文输入方式
            p(g.tools_bc, "click", L);//切换全角、半角
            p(g.tools_pt, "click", u);//切换标点
            p(document, "mousedown",
            function(ad) {
                var ad = ad || window.event;
                var ac = ad.target || ad.srcElement;
                if (ac && ac.className == "wubi_link") {
                    setTimeout(function() {
                        d(g.wubi_menu)
                    },
                    500)
                } else {
                    d(g.wubi_menu)
                }
                if (ac != g.iptCurTarget) {
                    g.runner.end()//失去焦点时，隐藏输入框
                }
            });
            var aa = g.tools;
            //输入状态在toolbar上点击无动作
            p(aa, "mousedown",
            function() {
                setTimeout(function() {
                    S("", false)//字符上屏
                },
                10)
            });
            p(aa, "mouseover",
            function() {
                g.isBlur = false
            });
            p(aa, "mouseout",
            function() {
                g.isBlur = true
            });
            var ab = g.panel;
            //输入状态在panel上点击无动作
            p(ab, "mousedown",
            function() {
                setTimeout(function() {
                    S("", false)
                },
                10)
            });
            p(ab, "mouseover",
            function() {
                g.isBlur = false
            });
            p(ab, "mouseout",
            function() {
                g.isBlur = true
            });
            p(window, "resize",
            function() {
                g.inputpanel.setPosition();
                g.toolbar.setPosition()
            });
            if (g.status.on) {
                T(0)//开启输入法
            } else {
                C(0)//关闭输入法
            }
        }
        return {
            init: M,
            modeCH: V,
            modeBC: L,
            modePT: u,
            inputLetter: W,
            setPagePre: z,
            setPageNxt: O,
            autoPagePre: H,
            autoPageNxt: x,
            stopAutoPage: N,
            setInput: X,
            arrSelResult: F,
            numSelResult: w,
            clkSelResult: P,
            spaSelResult: K,
            delLetter: Z,
            enterInput: B,
            toolsOff: C,
            openIme: J,
            closeIme: D,
            disableTargetIme: v,
            moveCursor: t
        }
    })();
    g.drag = (function() {
        var v = null;
        var x = null;
        var w = null;
        function y(F, E) {
            var E = E || window.event;
            var D = s(F);
            var C = z(E);
            return {
                x: C.x - D.x,
                y: C.y - D.y
            }
        }
        function z(E) {
            var C = document.documentElement,
            D = document.body;
            return {
                x: E.pageX || (E.clientX + C.scrollLeft || D.scrollLeft),
                y: E.pageY || (E.clientY + C.scrollTop || D.scrollTop)
            }
        }
        function A(F) {
            if (!v) {
                return false
            }
            var F = F || window.event;
            var M = z(F);
            var C = M.x - w.x;
            var J = M.y - w.y;
            var N = document.documentElement,
            O = document.body;
            var G = N.scrollLeft || O.scrollLeft;
            var L = N.scrollTop || O.scrollTop;
            var L = N.scrollTop || O.scrollTop;
            var D = N.clientWidth;
            var H = N.clientHeight;
            var I = v.offsetWidth;
            var E = v.offsetHeight;
            if (v == g.tools) {
                I = x == g.tools_off_drag ? 38 : 140;
                if (C < I) {
                    C = I
                }
                if (C > G + D - 50) {
                    C = G + D - 50
                }
                if (g.isIE == 6) {
                    if (J < L) {
                        J = L
                    } else {
                        if (J > L + H - E - 8) {
                            J = L + H - E - 8
                        }
                    }
                } else {
                    C -= G;
                    J -= L;
                    if (J < 0) {
                        J = 0
                    }
                    if (J > H - E - 8) {
                        J = H - E - 8
                    }
                }
            }
            if (v == g.panel) {
                var K = M.x;
                if (K < 5 || K > D - 5) {
                    return
                }
                if (J < L) {
                    J = L
                } else {
                    if (J > L + H - E) {
                        J = L + H - E
                    }
                }
            }
            v.style.left = C + "px";
            v.style.top = J + "px"
        }
        function B() {
            p(g.tools_drag, "mousedown",
            function(C) {
                v = g.tools;
                x = g.tools_drag;
                t(C)
            });
            p(g.tools_off_drag, "mousedown",
            function(C) {
                v = g.tools;
                x = g.tools_off_drag;
                t(C)
            });
            p(g.panel, "mousedown",
            function(C) {
                v = g.panel;
                x = g.panel;
                t(C)
            });
            p(document, "mouseup", u)
        }
        function t(C) {
            p(document, "mousemove", A);
            document.onselectstart = function(D) {
                return false
            };
            if (g.isFirefox) {
                document.body.style.MozUserSelect = "none"
            }
            if (v.setCapture) {
                v.setCapture()
            }
            w = y(v, C)
        }
        function u() {
            l(document, "mousemove", A);
            document.onselectstart = null;
            if (g.isFirefox) {
                document.body.style.MozUserSelect = ""
            }
            if (!v) {
                return false
            }
            if (v.releaseCapture) {
                v.releaseCapture()
            }
            v = null
        }
        return {
            init: B
        }
    })();
    g.inputwatcher = (function() {
        var z = false;//on or off
        var w = "";
        var v = "";
        var y = null;
        var u = null;
        function x() {
            v = g.inputsource.replace(/\'/g, "");
            /*
            var l = g.inputsource.length;
            if(l == 5){
                console.log(l);
                g.control.spaSelResult();
                A();
            }
            */
            if (w != v) {
                w = v;
                g.xpc.send()
            }
        }
        //on
        function t() {
            if (!z) {
                u = setInterval(x, 10);
                z = true
            }
        }
        //off
        function A() {
            if (z) {
                clearInterval(u);
                z = false
            }
        }
        return {
            on: t,
            off: A
        }
    })();
    g.keywatcher = (function() {
        var G = false;//字符是否为可输入字符，而不是命令（组合键）
        var M = false;//字符是否为可输入字符
        var B = false;//shift
        var w = false;//ctrl
        var D = false;//alt
        var x = false;//meta
        var t = true;
        var y = true;
        var I = false;//shift
        var P = false;
        var J = false;
        //输入非字母
        function O(T) {
            var T = T || window.event;
            var S = T.which ? T.which: T.keyCode;
            B = T.shiftKey || (S == 16);
            w = T.ctrlKey || (S == 17);
            D = T.altKey || (S == 18);
            x = T.metaKey || (S == 91);
            I = S == 16;
            if (w || D || x) {
                return
            }
            G = false;
            if (S >= 65 && S <= 90) {
                G = true
            }
            M = false;
            if (g.isFirefox) {
                S = N(S)//为firefox转换字符
            }
            if (g.isOpera) {
                S = v(S);//为opera转换字符
                J = false
            }
            if ((S >= 65 && S <= 90) || (S >= 48 && S <= 57) || (S >= 96 && S <= 105) || S == 192 || S == 189 || S == 187 || S == 219 || S == 221 || S == 220 || S == 186 || S == 222 || S == 188 || S == 190 || S == 191 || S == 109 || S == 107 || S == 110 || S == 111 || S == 106 || S == 59 || S == 32) {
                M = true
            }
            var V = "";//暂存器
            var U = false;//可显示字符
            if (M) {//字符是可输入字符
                if (!G) {//非字母
                    E(T);//阻止默认事件
                    if (S >= 48 && S <= 57) {//如果是大键盘数字
                        if (g.inputpanel.isShow) {
                            //if shift
                            if (B) {
                                V = g.status.pt ? a[S][5] : a[S][3];//英文标点还是中文标点
                                U = true
                            } else {
                                if (g.keywatcher.checkAddr()) {//检测是否为网址输入方式
                                    V = a[S][0]
                                } else {
                                    g.control.numSelResult(String.fromCharCode(S));//选择候选词
                                    return false
                                }
                            }
                        } else {
                            if (B) {//shift
                                var R = g.status.pt ? 5 : 3;//英文标点还是中文标点
                                if (g.status.ch) {
                                    V = a[S][R]
                                } else {
                                    V = g.status.bc ? a[S][R] : a[S][4]
                                }
                            } else {
                                V = g.status.bc ? a[S][0] : a[S][2]
                            }
                            U = true
                        }
                    }
                    if (S >= 96 && S <= 105) {//如果是小键盘数字
                        V = g.status.bc ? a[S][0] : a[S][2];//全半角
                        U = true
                    }
                    switch (S) {
                    case 32://Spacebar键
                        if (B) {//shift
                            return
                        }
                        if (g.inputpanel.isShow) {
                            g.control.spaSelResult();
                            return false
                        } else {
                            var R = g.status.pt ? 2 : 0;//英文标点还是中文标点
                            V = g.status.bc ? a[S][R] : a[S][1];//全半角
                            U = true
                        }
                        break;
                    case 187://=键
                        if (B) {
                            var R = g.status.pt ? 5 : 3;
                            if (g.status.ch) {
                                V = a[S][R]
                            } else {
                                V = g.status.bc ? a[S][R] : a[S][4]
                            }
                            U = true
                        } else {
                            if (g.inputpanel.isShow) {
                                g.control.stopAutoPage();
                                g.control.setPageNxt();
                                return false
                            } else {
                                var R = g.status.pt ? 2 : 0;
                                if (g.status.ch) {
                                    V = a[S][R]
                                } else {
                                    V = g.status.bc ? a[S][R] : a[S][1]
                                }
                                U = true
                            }
                        }
                        break;
                    case 190://.键(句号)
                        if (B) {
                            var R = g.status.pt ? 5 : 3;
                            if (g.status.ch) {
                                V = a[S][R]
                            } else {
                                V = g.status.bc ? a[S][R] : a[S][4]
                            }
                            U = true
                        } else {
                            if (g.inputpanel.isShow) {
                                if (H(".")) {
                                    V = a[S][0]
                                } else {
                                    g.isSubAddr = g.pageTimes > 0 ? false: true;
                                    g.pageTimes++;
                                    g.control.stopAutoPage();
                                    g.control.setPageNxt();
                                    return false
                                }
                            } else {
                                var R = g.status.pt ? 2 : 0;
                                if (g.status.ch) {
                                    V = a[S][R]
                                } else {
                                    V = g.status.bc ? a[S][R] : a[S][1]
                                }
                                U = true
                            }
                        }
                        break;
                    case 189://-键(减号)
                    case 188://,键(逗号)
                        if (B) {
                            var R = g.status.pt ? 5 : 3;
                            if (g.status.ch) {
                                V = a[S][R]
                            } else {
                                V = g.status.bc ? a[S][R] : a[S][4]
                            }
                            U = true
                        } else {
                            if (g.inputpanel.isShow) {
                                if (S == 189 && H("-")) {
                                    V = a[S][0]
                                } else {
                                    g.control.stopAutoPage();
                                    g.control.setPagePre();
                                    return false
                                }
                            } else {
                                var R = g.status.pt ? 2 : 0;
                                if (g.status.ch) {
                                    V = a[S][R]
                                } else {
                                    V = g.status.bc ? a[S][R] : a[S][1]
                                }
                                U = true
                            }
                        }
                        break;
                    case 106://数字键盘上的*键
                    case 107://数字键盘上的+键
                    case 109://数字键盘上的-键
                    case 110://数字键盘上的.键
                    case 111://数字键盘上的/键
                        V = g.status.bc ? a[S][0] : a[S][1];
                        U = true;
                        break;
                    case 186://;(分号)
                    case 191:///键
                    case 192://`键(Esc下面)
                    case 219://[键
                    case 220:
                    case 221://]键
                        if (B) {
                            if (S == 186 && H(":")) {
                                V = a[S][3];
                                break
                            }
                            var R = g.status.pt ? 5 : 3;
                            if (g.status.ch) {
                                V = a[S][R]
                            } else {
                                V = g.status.bc ? a[S][R] : a[S][4]
                            }
                        } else {
                            if (S == 191 && H("/")) {
                                V = a[S][0];
                                break
                            }
                            var R = g.status.pt ? 2 : 0;
                            if (g.status.ch) {
                                V = a[S][R]
                            } else {
                                V = g.status.bc ? a[S][R] : a[S][1]
                            }
                        }
                        U = true;
                        break;
                    case 222://‘键(引号)
                        if (B) {
                            var R = y ? 6 : 7;
                            V = g.status.pt ? a[S][R] : (g.status.bc ? a[S][4] : a[S][5]);
                            if (g.status.pt) {
                                y = y ? false: true
                            }
                            U = true
                        } else {
                            if (g.inputpanel.isShow) {
                                V = a[S][0]
                            } else {
                                var R = t ? 2 : 3;
                                V = g.status.pt ? a[S][R] : (g.status.bc ? a[S][0] : a[S][1]);
                                if (g.status.pt) {
                                    t = t ? false: true
                                }
                                U = true
                            }
                        }
                        break
                    }
                    g.control.inputLetter(V, U)
                }
            } else {//如果是不可显示字符
                if (g.inputpanel.isShow) {
                    if (S == 8) {//Backspace键
                        if (!g.isOpera) {
                            E(T);//阻止默认事件
                            g.control.delLetter("left")
                        }
                    }
                    if (S == 13) {//Enter键
                        if (g.inputpanel.isShow) {
                            P = true
                        }
                        E(T);//阻止默认事件
                        g.control.enterInput()
                    }
                    if (S == 27) {//Ese键
                        E(T);
                        g.inputpanel.hide()
                    }
                    if (S == 33) {//Page Up键
                        E(T);
                        g.control.stopAutoPage();
                        g.control.setPagePre()
                    }
                    if (S == 34) {//Page Domw键
                        E(T);
                        g.control.stopAutoPage();
                        g.control.setPageNxt()
                    }
                    if (S == 38) {//UP ARROW键(↑)
                        if (!g.isOpera) {
                            E(T);
                            g.control.arrSelResult("pre")
                        }
                    }
                    if (S == 40) {//DOWN ARROW键(↓)
                        if (!g.isOpera) {
                            E(T);
                            g.control.arrSelResult("nxt")
                        }
                    }
                    if (S == 37) {//LEFT ARROW 键(←)
                        if (!g.isOpera) {
                            E(T);
                            g.control.moveCursor("left")
                        }
                    }
                    if (S == 39) {//RIGHT ARROW键(→)
                        if (!g.isOpera) {
                            E(T);
                            g.control.moveCursor("right")
                        }
                    }
                    if (S == 36) {//Home键
                        E(T);
                        g.control.moveCursor("home")
                    }
                    if (S == 35) {//End键
                        E(T);
                        g.control.moveCursor("end")
                    }
                    if (S == 46) {//Del键(Num Lock关闭时的数字键盘.)
                        if (g.isOpera) {
                            J = true
                        } else {
                            E(T);
                            g.control.delLetter("right")
                        }
                    }
                }
            }
        }
        //判断是否是特殊字符串
        function H(T) {
            var R = false;
            var S = g.inputsource;
            if (g.inputpanel.isShow) {
                switch (T) {
                case "-":
                case ".":
                    R = /^(((https?|ftp)\:\/{2}[a-z0-9])|w{3})|\./i.test(S);
                    break;
                case ":":
                    R = /^(https?|ftp)(?!\:)/i.test(S);
                    break;
                case "/":
                    R = /^(https?|ftp)\:\/?/i.test(S);
                    break
                }
            }
            return R
        }
        //检测是否为网址输入方式
        function L() {
            return /(((https?|ftp)\:)|w{3}\.|\.)/i.test(g.inputsource)
        }
        //切换输入方式
        function K(S) {
            var S = S || window.event;
            var R = S.which ? S.which: S.keyCode;
            if (B && R == 32) {
                g.control.modeBC();
                I = false
            }
            if (I && R == 16 && !(S.ctrlKey || S.altKey)) {
                g.control.modeCH()
            }
            if ((w && B) || (D && B) || (w && R == 32)) {
                g.control.toolsOff(1);
            }
            if (w && R == 190) {
                g.control.modePT()
            }
        }
        //输入字母
        function z(S) {
            var S = S || window.event;
            var R = S.which ? S.which: S.keyCode;
            var U = "";
            var T = false;
            if (G && !(w || D || x)) {
                if ((R >= 97 && R <= 122)) {
                    if (g.status.ch) {
                        U = a[R - 32][0];
                        if (g.isSubAddr && g.inputsource != "") {
                            if (!/\'$/.test(g.inputsource)) {
                                U = "." + U
                            }
                            g.isSubAddr = false
                        }
                    } else {
                        U = g.status.bc ? a[R - 32][0] : a[R - 32][1];
                        T = true
                    }
                } else {
                    U = g.status.bc ? a[R][3] : a[R][4];
                    T = true
                }
                E(S);//阻止默认事件
                //四个字符自动上屏
                if(g.inputsource.length == 4){
                    g.control.spaSelResult();
                }
                g.control.inputLetter(U, T);
            }
            if (g.isOpera) {
                if (M && !G) {
                    E(S)//阻止默认事件
                }
                if (P && R == 13) {
                    P = false;
                    E(S)//阻止默认事件
                }
                if (g.inputpanel.isShow) {
                    if (R == 8) {
                        E(S);//阻止默认事件
                        g.control.delLetter("left")
                    }
                    if (R == 38) {
                        E(S);//阻止默认事件
                        g.control.arrSelResult("pre")
                    }
                    if (R == 40) {
                        E(S);//阻止默认事件
                        g.control.arrSelResult("nxt")
                    }
                    if (R == 37) {
                        E(S);//阻止默认事件
                        g.control.moveCursor("left")
                    }
                    if (R == 39) {
                        E(S);//阻止默认事件
                        g.control.moveCursor("right")
                    }
                    if (R == 46 && J) {
                        E(S);//阻止默认事件
                        g.control.delLetter("right")
                    }
                }
            }
        }
        //为firefox转换字符
        function N(S) {
            var R = S;
            if (S == 59) {
                R = 186
            } else {
                if (S == 107) {
                    R = 187
                } else {
                    if (S == 109) {
                        R = 189
                    }
                }
            }
            return R
        }
        //为opera转换字符
        function v(S) {
            var R = S;
            if (S == 42) {
                R = 106
            } else {
                if (S == 43) {
                    R = 107
                } else {
                    if (S == 45) {
                        R = 109
                    } else {
                        if (S == 59) {
                            R = 186
                        } else {
                            if (S == 61) {
                                R = 187
                            } else {
                                if (S == 109) {
                                    R = 189
                                }
                            }
                        }
                    }
                }
            }
            return R
        }
        //阻止默认事件
        function E(R) {
            g.isIE ? R.returnValue = false: R.preventDefault()
        }
        function A(R) {
            l(R, "keydown", O);
            l(R, "keyup", K);
            l(R, "keypress", z)
        }
        function F(R) {
            p(R, "keydown", g.keywatcher.keydownhandler);
            p(R, "keyup", g.keywatcher.keyuphandler);
            p(R, "keypress", g.keywatcher.keypresshandler)
        }
        function u(R) {
            if (R.contentDocument && !g.isIE) {
                R = R.contentWindow
            } else {
                if (R.contentWindow.document) {
                    R = R.contentWindow.document
                }
            }
            return R
        }
        // on
        function C() {
            Q();
            var R = g.iptCurTarget;
            if (R) {
                if (R.tp == "iframe") {
                    R = u(R)
                }
                F(R)
            }
        }
        function Q() {
            var R = g.iptCurTarget;
            if (R) {
                if (R.tp == "iframe") {
                    R = u(R)
                }
                A(R)
            }
        }
        return {
            on: C,
            off: Q,
            keydownhandler: O,
            keypresshandler: z,
            keyuphandler: K,
            addKeyEvent: F,
            rmKeyEvent: A,
            checkAddr: L,
            checkSpecialStr: H
        }
    })();
    g.data = (function() {
        var z = {
            input: "",
            inputtype: "py",
            bg: 0,
            ed: (4 * g.shownum),
            result: "hanzi",
            resultcoding: "unicode",
            ch_en: 0,
            clientinfo: "web",
            version: 1
        };
        var K = {
            totalnum: 0,
            totalpage: 1,
            curpage: 1,
            data: [],
            enableGetData: true,
            inputback: ""
        };
        var B = {
            count: 0,
            en: [],
            ch: []
        };
        var H = [];
        var v = [];
        //start
        function L() {
            B.count = 0;
            B.en = [];
            B.ch = []
        }
        function F(T, O) {
            var N = g.data.group.en.join("");
            N = N.replace(/\'/g, "");
            var M = g.data.group.ch.join("");
            var R = N.length;
            var Q = [N, M, R];
            var U = H.length;
            var S = false;
            if (U >= 20) {
                H.shift()
            }
            if (U == 0) {
                H.push(Q)
            } else {
                for (var P = 0; P < H.length; P++) {
                    if (H[P][0] == Q[0]) {
                        H[P][1] = Q[1];
                        S = true;
                        break
                    }
                }
                if (!S) {
                    H.push(Q)
                }
            }
            C(T, O)
        }
        function C(M, N) {}
        function G(M) {
            if (M == "") {
                return ""
            }
            for (var N = 0; N < H.length; N++) {
                if (H[N][0] == M) {
                    return [H[N][1], H[N][2]]
                }
            }
        }
        //将查询结果存入列表并展现出来
        function x(Q) {
            if (!Q || (Q.status == "F") || (Q.errno != "0")) {
                return false
            }
            Q.result && (Q = Q.result);
            if (!Q[0]) {
                Q[0] = [];
                Q[1] = ""
            }
            if (Q[0].length == 0) {
                K.enableGetData = false;
                if (K.totalnum == 0) {
                    Q[0].push([g.inputsource, g.inputsource.length]);
                    Q[1] = g.inputsource;
                }
            }
            if (g.keywatcher.checkAddr()) {
                Q[0].length = 1
            }
            var P = g.inputsource;
            var O = Q[1];
            P = P.replace(/\'/g, "");
            O = O.replace(/\'/g, "");
            if (O != P) {}
            if (!K.data[0]) {
                v = [];
                Q[0] = I(Q[0]);
                var R = G(P);
                if (R) {
                    var N = Q[0];
                    if (!N) {
                        N.unshift(R)
                    } else {
                        var S = -1;
                        for (var M = 0; M < N.length; M++) {
                            if (N[M][0] == R[0]) {
                                S = M;
                                break
                            }
                        }
                        if (S >= 0) {
                            N.splice(M, 1)
                        }
                        N.unshift(R)
                    }
                    Q[0] = N
                }
            }
            K.totalnum += Q[0].length;
            K.totalpage = Math.ceil(K.totalnum / g.shownum);
            K.data = K.data.concat(Q[0]);
            K.inputback = Q[1];
            g.inputpanel.setResults()
        }
        //将特殊结果展现出来
        function J() {
            K.curpage = 1;
            K.totalnum = 1;
            K.totalpage = 1;
            K.data = [[g.inputselected, 0], ""];
            g.inputpanel.setResults()
        }
        //将结果放入列表
        function I(M) {
            for (var N = 0; N < M.length; N++) {
                if (!t(M[N])) {
                    v.push(M[N])
                }
            }
            return v
        }
        //检测数据列表中是否已有该数据
        function t(N) {
            for (var M = 0; M < v.length; M++) {
                if (v[M][0] == N[0]) {
                    return true
                }
            }
            return false
        }
        //重置data对象
        function A() {
            z.bg = 0;
            z.ed = (4 * g.shownum);
            K.totalnum = 0;
            K.totalpage = 1;
            K.curpage = 1;
            K.data = [];
            K.enableGetData = true;
            g.curSelectNum = 1
        }
        //生成查询字符串
        function D() {
            var M = g.inputsource.replace(/\'/g, "");
            if (g.tempsource == M) {
                return
            } else {
                g.tempsource = M
            }
            var N = g.inputsource;
            N = N.replace(/(\')+/g, "$1");
            if (g.inputselected != "") {
                N = N.replace(/\'/g, "")
            }
            N = N.replace(/\'$/g, "");
            z.input = N;
            if (z.input != "") {
                return z.input
            } else {
                return ""
            }
        }
        return {
            getData: D,
            setData: x,
            restData: A,
            setSpecialData: J,
            db: K,
            param: z,
            group: B,
            setGroup: F,
            resetGroup: L,
            sendGroupLog: C
        }
    })();
    var j = q.create();
    j.prototype = {
        //初始化框架
        initialize: function() {
            this.ready()
        },
        ready: function() {
            g.runner.begin();
        },
        //查询请求
        send: function(w) {
            //console.log(g.data);
            var t = w ? w: g.data.getData();
            if (!t) {//空，返回
                return
            } else if(wubi_dic[t]){
                var result=[];
                for (var i=0;i<wubi_dic[t].length;i++){
                    result.push([wubi_dic[t][i],1]);
                }
                var data = {
                    status:'T',
                    errno:'0',
                    errmsg:'',
                    result:[result, t]
                };
                g.data.setData(data);
            } else {
                g.data.restData();
                g.inputpanel.setResults();
            }
        }
    };
    g.runner = (function() {
        var G = null,
        J = null;
        //重新绑定键盘事件，显示工具栏
        function y(M) {
            if (g.isClose) {
                return
            }
            var M = M || window.event;
            var L = M.target || M.srcElement;
            if (typeof(L.tagName) == "undefined") {
                g.iptCurTarget = L.frameElement;//返回嵌入当前window对象的元素(比如 <iframe> 或者 <object>),如果当前window对象已经是顶层窗口,则返回null
            } else {
                g.iptCurTarget = L
            }
            if (g.isIE && L.tp == "iframe") {
                L = L.contentWindow.document//The contentWindow property returns the Window object of an <iframe> element.
            }
            if (g.status.on) {
                g.keywatcher.rmKeyEvent(L);
                g.keywatcher.addKeyEvent(L)
            }
            g.toolbar.show()
        }
        //移除所有键盘事件，隐藏工具栏
        function z(M) {
            if (g.isClose) {
                return
            }
            var M = M || window.event;
            var L = M.target || M.srcElement;
            if (g.isIE && L.tp == "iframe") {
                L = L.contentWindow.document
            }
            g.keywatcher.rmKeyEvent(L);
            g.toolbar.hide()
        }
        //获取所有可编辑控件，并加入列表
        function E(M) {
            //如果g.inputs[]中有元素，将元素添加到iptTarget列表
            if (g.inputs.length > 0) {
                var L = g.inputs;
                for (var N = 0; N < L.length; N++) {
                    var O;
                    if (typeof L[N] == "string") {
                        O = k(L[N])
                    } else {
                        if (typeof L[N] == "object") {
                            O = L[N]
                        } else {
                            break
                        }
                    }
                    if (O && O.tagName && O.tagName.toLowerCase() == "input" && (O.type == "text" || O.type == "search") && C(O)) {
                        t(O, "input")
                    } else {
                        if (O && O.tagName && O.tagName.toLowerCase() == "textarea" && C(O)) {
                            t(O, "textarea")
                        } else {
                            if (O && O.tagName && O.tagName.toLowerCase() == "div" && O.contentEditable.toString() == "true" && typeof(O.ex) == "undefined") {
                                t(O, "div")
                            } else {
                                if (O && O.tagName && O.tagName.toLowerCase() == "iframe" && typeof(O.ex) == "undefined") {
                                    setTimeout(function() {
                                        try {
                                            var R, Q;
                                            if (O.contentDocument && !g.isIE) {
                                                R = O.contentDocument;
                                                Q = O.contentWindow
                                            } else {
                                                if (O.contentWindow.document) {
                                                    R = O.contentWindow.document;
                                                    Q = O
                                                }
                                            }
                                            if (R) {
                                                if (R.designMode.toLowerCase() == "on" || R.body.contentEditable.toString() == "true") {
                                                    g.iptTargets.push(O);
                                                    O.tp = "iframe";
                                                    O.ex = true;
                                                    p(Q, "focus", y);
                                                    p(Q, "blur", z)
                                                }
                                            }
                                        } catch(P) {}
                                    },
                                    10)
                                }
                            }
                        }
                    }
                }
            } else {
                w(M);//获取所有可编辑控件，并加入列表
                if (g.isIE) {
                    p(M, "activate",
                    function() {
                        w(M)//获取所有可编辑控件，并加入列表
                    })
                } else {
                    p(M, "DOMNodeInserted",
                    function() {
                        w(M)//获取所有可编辑控件，并加入列表
                    })
                }
            }
        }
        //将控件加入列表,并绑定focus/blur-显示/隐藏工具栏事件
        function t(M, L) {
            g.iptTargets.push(M);
            M.tp = L;
            M.ex = true;
            if (g.status.on) {
                g.control.disableTargetIme(M, false)
            }
            //绑定focus/blur，显示/隐藏工具栏事件
            p(M, "focus", y);
            p(M, "blur", z)
        }
        //获取所有可编辑控件，并加入列表
        function w(L) {
            if (g.isClose) {
                return
            }
            G = setTimeout(function() {
                if (!g.inputpanel.isShow) {
                    I(L);//获取当前页面所有input控件，并加入列表
                    B(L);//获取当前页面所有textarea控件，并加入列表
                    setTimeout(function() {
                        A(L)//获取当前页面所有可编辑的iframe控件，并加入列表
                    },
                    200);
                    u(L)//获取所有可编辑的div控件，并加入列表
                }
            },
            20)
        }
        //判断当前列表中的控件是否可输入
        function C(L) {
            if (typeof(L.ex) == "undefined" && f(L, "ime-mode") != "disabled" && !L.readOnly && !L.disabled) {
                return true
            }
            return false
        }
        //获取当前页面所有input控件，并加入列表
        function I(M) {
            var L = M.getElementsByTagName("input");
            for (var N = 0; N < L.length; N++) {
                var O = L[N];
                if ((O.type == "text" || O.type == "search") && C(O)) {
                    t(O, "input")
                }
            }
        }
        //获取当前页面所有textarea控件，并加入列表
        function B(M) {
            var L = M.getElementsByTagName("textarea");
            for (var N = 0; N < L.length; N++) {
                var O = L[N];
                if (C(O)) {
                    t(O, "textarea")
                }
            }
        }
        //获取当前页面所有可编辑的iframe控件，并加入列表
        function A(M) {
            var L = M.getElementsByTagName("iframe");
            for (var N = 0; N < L.length; N++) {
                var P = L[N];
                //排除wubi子框架
                if (P.id == "wubi_py" || (typeof(P.ex) != "undefined")) {
                    continue
                }
                try {
                    var R, Q;
                    if (P.contentDocument && !g.isIE) {
                        R = P.contentDocument;
                        Q = P.contentWindow
                    } else {
                        if (P.contentWindow.document) {
                            R = P.contentWindow.document;
                            Q = P
                        }
                    }
                    if (R) {
                        if (R.designMode.toLowerCase() == "on" || R.body.contentEditable.toString() == "true") {
                            g.iptTargets.push(P);
                            P.tp = "iframe";
                            P.ex = true;
                            //绑定focus/blur，显示/隐藏工具栏事件
                            p(Q, "focus", y);
                            p(Q, "blur", z)
                        } else {
                            E(R)
                        }
                    }
                } catch(O) {}
            }
        }
        //获取所有可编辑的div控件，并加入列表
        function u(M) {
            var L = M.getElementsByTagName("div");
            for (var N = 0; N < L.length; N++) {
                var O = L[N];
                if (O.id == "wubi_py" || (typeof(O.ex) != "undefined")) {
                    continue
                }
                if (O.contentEditable.toString() == "true") {
                    g.iptTargets.push(O);
                    O.tp = "div";
                    O.ex = true;
                    p(O, "focus", y);
                    p(O, "blur", z)
                }
            }
        }
        //定时获取焦点并显示工具栏
        function K() {
            if (J) {
                return
            }
            J = setInterval(D, 50)
        }
        //停止获取焦点
        function v() {
            if (!J) {
                return
            }
            clearInterval(J);
            J = null
        }
        //如果目标控件是可输入的，显示工具栏
        function D() {
            if (g.isClose) {
                return
            }
            var O = document.activeElement;//返回当前页面中获得焦点的元素
            if (g.toolbar.isShow) {
                return
            }
            if (O && O.tagName) {
                var L = O.tagName.toLowerCase();
                //如果目标控件是可输入的，显示工具栏
                if ((L == "input" && (O.type == "text" || O.type == "search") || L == "textarea") && !O.readOnly && !O.disabled && typeof(O.ex) != "undefined") {
                    g.iptCurTarget = O;
                    if (g.status.on) {
                        g.keywatcher.rmKeyEvent(O);
                        g.keywatcher.addKeyEvent(O)
                    }
                    g.toolbar.show()
                } else {
                    if (L == "iframe") {
                        var N, M;
                        if (O.contentDocument && !g.isIE) {
                            N = O.contentDocument;
                            M = O.contentWindow
                        } else {
                            if (O.contentWindow.document) {
                                N = O.contentWindow.document;
                                M = N
                            }
                        }
                        if (N && (N.designMode.toLowerCase() == "on" || N.body.contentEditable.toString() == "true")) {
                            g.iptCurTarget = O;
                            if (g.status.on) {
                                g.keywatcher.addKeyEvent(M)
                            }
                            g.toolbar.show()
                        }
                    }
                }
            }
        }
        //初始化所有面板、配置
        function H() {
            E(document);//获取所有可编辑的控件，并加入列表
            g.build.init();
            g.toolbar.init();
            g.drag.init();
            g.control.init();
            K();//定时获取焦点并显示工具栏
            console.log('zhangkefei\'s wubi typewriting is ready.');
        }
        //失去焦点，隐藏输入框
        function x(M) {
            if (M) {
                var M = M || window.event;
                var L = M.target || M.srcElement;
                if (L == g.iptCurTarget) {
                    return false
                }
            }
            //失去焦点，隐藏输入框
            if (g.isBlur) {
                setTimeout(function() {
                    if (g.inputpanel.isShow) {
                        g.inputpanel.hide()
                    }
                },
                50)
            }
        }
        //初始化，读取配置，准备查询连接，绑定销毁事件
        function F() {
            //读取配置
            if (typeof wubi_option == "object") {
                console.log('wubi_option');
                var P = wubi_option;
                var S = P.on,
                L = P.ch,
                R = P.bc,
                V = P.pt,
                N = P.domain,
                O = P.username,
                Q = P.targets,
                T = P.links,
                U = P.calls,
                M = P.hasSug;
                if (S === true || S === false) {
                    g.status.on = S === true ? 1 : 0
                }
                if (L === true || L === false) {
                    g.status.ch = L === true ? 1 : 0
                }
                if (R === true || R === false) {
                    g.status.bc = R === true ? 1 : 0
                }
                if (V === true || V === false) {
                    g.status.pt = V === true ? 1 : 0
                }
                if (N) {
                    g.domain = N
                }
                if (O) {
                    g.usr = O
                }
                if (typeof Q == "object") {
                    g.inputs = Q
                }
                if (T && T.feedback) {
                    g.feedbackLink = T.feedback
                }
                if (U) {
                    if (U.panelShow) {
                        g.panelShow = U.panelShow
                    }
                    if (U.panelHide) {
                        g.panelHide = U.panelHide
                    }
                }
                if (M) {
                    g.hasSug = M
                }
            }
            g.xpc = new j();//准备查询连接
            //绑定销毁事件
            p(window, "unload",
            function() {
                for (var W in g) {
                    delete g[W]
                }
                window.wubi = null
            })
        }
        return {
            init: F,
            startAutoFocus: K,
            stopAutoFocus: v,
            begin: H,
            end: x
        }
    })();
    g.runner.init();
    window.wubi = g;
    g.open = g.control.openIme;
    g.close = g.control.closeIme
})();
