(window.webpackJsonp=window.webpackJsonp||[]).push([[69],{436:function(t,a,e){"use strict";e.r(a);var v=e(25),r=Object(v.a)({},(function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"volatileschemacache"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#volatileschemacache"}},[t._v("#")]),t._v(" VolatileSchemaCache")]),t._v(" "),e("hr"),t._v(" "),e("p",[t._v("编辑人(全网同名)："),e("strong",[e("strong",[t._v("酷酷的诚")])]),t._v("  邮箱："),e("strong",[t._v("zhangchengk@foxmail.com")])]),t._v(" "),e("hr"),t._v(" "),e("h2",{attrs:{id:"描述"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#描述"}},[t._v("#")]),t._v(" 描述")]),t._v(" "),e("p",[t._v("提供一个缓存服务，该缓存采用最近使用算法(Least-Recently-Used)。该缓存不会物化到磁盘，因此NiFi的任何重新启动都会导致缓存被清除。此外，每当停止并重新启动Controller Service时，都会清除缓存。")]),t._v(" "),e("p",[t._v("额外说一点，其实VolatileSchemaCache的内部实现就是用了一个Caffeine的cache，当缓存的数据超过最大值时，默认使用LRU算法替换。")]),t._v(" "),e("p",[t._v("LRU：最近最少使用算法，每次访问数据都会将其放在我们的队尾，如果需要淘汰数据，就只需要淘汰队首即可。仍然有个问题，如果有个数据在 1 分钟访问了 1000次，再后 1 分钟没有访问这个数据，但是有其他的数据访问，就导致了我们这个热点数据被淘汰。​")]),t._v(" "),e("h2",{attrs:{id:"属性配置"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#属性配置"}},[t._v("#")]),t._v(" 属性配置")]),t._v(" "),e("p",[t._v("在下面的列表中，必需属性的名称以粗体显示。任何其他属性(不是粗体)都被认为是可选的，并且指出属性默认值（如果有默认值），以及属性是否支持表达式语言。(1.11.4版本)")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",[t._v("属性名称")]),t._v(" "),e("th",[t._v("默认值")]),t._v(" "),e("th",[t._v("可选值")]),t._v(" "),e("th",[t._v("描述")])])]),t._v(" "),e("tbody",[e("tr",[e("td",[e("strong",[t._v("Maximum Cache Size")])]),t._v(" "),e("td",[t._v("100")]),t._v(" "),e("td"),t._v(" "),e("td",[t._v("缓存大小"),e("br"),t._v("支持表达式语言:true")])])])]),t._v(" "),e("h2",{attrs:{id:"状态管理"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#状态管理"}},[t._v("#")]),t._v(" 状态管理")]),t._v(" "),e("p",[t._v("此组件不存储状态。")]),t._v(" "),e("h2",{attrs:{id:"限制"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#限制"}},[t._v("#")]),t._v(" 限制")]),t._v(" "),e("p",[t._v("无。")]),t._v(" "),e("h2",{attrs:{id:"系统资源方面的考虑"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#系统资源方面的考虑"}},[t._v("#")]),t._v(" 系统资源方面的考虑")]),t._v(" "),e("p",[t._v("无")]),t._v(" "),e("h2",{attrs:{id:"公众号"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#公众号"}},[t._v("#")]),t._v(" 公众号")]),t._v(" "),e("p",[t._v("关注公众号 得到第一手文章/文档更新推送。")]),t._v(" "),e("p",[e("img",{attrs:{src:"https://nifichina.gitee.io/image/donate/wechat.jpg",alt:""}})])])}),[],!1,null,null,null);a.default=r.exports}}]);