(window.webpackJsonp=window.webpackJsonp||[]).push([[53],{420:function(t,e,v){"use strict";v.r(e);var r=v(25),a=Object(r.a)({},(function(){var t=this,e=t.$createElement,v=t._self._c||e;return v("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[v("h1",{attrs:{id:"puthivestreaming"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#puthivestreaming"}},[t._v("#")]),t._v(" PutHiveStreaming")]),t._v(" "),v("hr"),t._v(" "),v("p",[t._v("编辑人(全网同名)："),v("strong",[v("strong",[t._v("酷酷的诚")])]),t._v("  邮箱："),v("strong",[t._v("zhangchengk@foxmail.com")])]),t._v(" "),v("hr"),t._v(" "),v("h2",{attrs:{id:"描述"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#描述"}},[t._v("#")]),t._v(" 描述")]),t._v(" "),v("p",[t._v("该处理器使用Hive流将流文件数据发送到Apache Hive表。传入的流文件需要是Avro格式，表必须存在于Hive中。有关Hive表的需求(格式、分区等)，请参阅Hive文档。分区值是根据处理器中指定的分区列的名称，然后从Avro记录中提取的。注意:如果为这个处理器配置了多个并发任务，那么一个线程在任何时候只能写入一个表。写入同一表的其他任务将等待当前任务完成对表的写入。")]),t._v(" "),v("h2",{attrs:{id:"属性配置"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#属性配置"}},[t._v("#")]),t._v(" 属性配置")]),t._v(" "),v("table",[v("thead",[v("tr",[v("th",[t._v("属性名称")]),t._v(" "),v("th",{staticStyle:{"text-align":"right"}},[t._v("默认值")]),t._v(" "),v("th",[t._v("可选值")]),t._v(" "),v("th",[t._v("描述")])])]),t._v(" "),v("tbody",[v("tr",[v("td",[v("strong",[t._v("Hive Metastore URI")])]),t._v(" "),v("td",{staticStyle:{"text-align":"right"}}),t._v(" "),v("td"),t._v(" "),v("td",[t._v("Hive Metastore的URI位置。注意，这不是Hive服务器的位置。Hive metastore的默认端口是9043"),v("br"),t._v("支持表达式语言:true")])]),t._v(" "),v("tr",[v("td",[t._v("Hive Configuration Resources")]),t._v(" "),v("td",{staticStyle:{"text-align":"right"}}),t._v(" "),v("td"),t._v(" "),v("td",[t._v("一个文件或着被逗号分隔的文件列表，其中包含Hive配置(hive-site.xml)。如果没有这个配置，Hadoop将在类路径中搜索'hive-site.xml'，或着使用默认配置。注意，如果要启用Kerberos等身份验证，必须在配置文件中设置适当的属性。还要注意，如果Max Concurrent Tasks被设置为一个大于1的数字，那么'hcatalog.hive.client.cache.disabled'将被迫设置为'true'以避免并发问题。请参阅Hive文档了解更多细节"),v("br"),t._v("支持表达式语言:true（只用于变量注册表）")])]),t._v(" "),v("tr",[v("td",[v("strong",[t._v("Database Name")])]),t._v(" "),v("td",{staticStyle:{"text-align":"right"}}),t._v(" "),v("td"),t._v(" "),v("td",[t._v("数据库名称  "),v("br"),t._v("支持表达式语言:true")])]),t._v(" "),v("tr",[v("td",[v("strong",[t._v("Table Name")])]),t._v(" "),v("td",{staticStyle:{"text-align":"right"}}),t._v(" "),v("td"),t._v(" "),v("td",[t._v("表名  "),v("br"),t._v("支持表达式语言:true")])]),t._v(" "),v("tr",[v("td",[t._v("Partition Columns")]),t._v(" "),v("td",{staticStyle:{"text-align":"right"}}),t._v(" "),v("td"),t._v(" "),v("td",[t._v("以逗号分隔的已对表进行分区的列名列表。此列表中的值的顺序必须与表创建期间指定的分区列的顺序完全对应。  "),v("br"),t._v("支持表达式语言:true（只用于变量注册表）")])]),t._v(" "),v("tr",[v("td",[v("strong",[t._v("Auto-Create Partitions")])]),t._v(" "),v("td",{staticStyle:{"text-align":"right"}},[t._v("true")]),t._v(" "),v("td",[t._v("▪true"),v("br"),t._v(" ▪false")]),t._v(" "),v("td",[t._v("标志，指示是否应该自动创建分区")])]),t._v(" "),v("tr",[v("td",[v("strong",[t._v("Max Open Connections")])]),t._v(" "),v("td",{staticStyle:{"text-align":"right"}},[t._v("8")]),t._v(" "),v("td"),t._v(" "),v("td",[t._v("同时从这个池中分配的最大打开连接数，为负则表示没有限制。")])]),t._v(" "),v("tr",[v("td",[v("strong",[t._v("Heartbeat Interval")])]),t._v(" "),v("td",{staticStyle:{"text-align":"right"}},[t._v("60")]),t._v(" "),v("td"),t._v(" "),v("td",[t._v("指示当经过指定的秒数时应发送心跳。值0表示不应该发送心跳。注意，尽管此属性支持表达式语言，但它不会根据传入的FlowFile属性进行计算。  "),v("br"),t._v("支持表达式语言:true（只用于变量注册表）")])]),t._v(" "),v("tr",[v("td",[v("strong",[t._v("Transactions per Batch")])]),t._v(" "),v("td",{staticStyle:{"text-align":"right"}},[t._v("100")]),t._v(" "),v("td"),t._v(" "),v("td",[t._v("一个指向Hive流的提示，指示处理器任务将需要多少事务。这个值必须大于1。"),v("br"),t._v("支持表达式语言:true")])]),t._v(" "),v("tr",[v("td",[v("strong",[t._v("Records per Transaction")])]),t._v(" "),v("td",{staticStyle:{"text-align":"right"}},[t._v("10000")]),t._v(" "),v("td"),t._v(" "),v("td",[t._v("提交事务之前要处理的记录数。这个值必须大于1。 "),v("br"),t._v("支持表达式语言:true")])]),t._v(" "),v("tr",[v("td",[v("strong",[t._v("Call Timeout")])]),t._v(" "),v("td",{staticStyle:{"text-align":"right"}},[t._v("0")]),t._v(" "),v("td"),t._v(" "),v("td",[t._v("Hive流操作完成所需的秒数。值0表示处理器应该无限期地等待操作。注意，尽管此属性支持表达式语言，但它不会根据传入的FlowFile属性进行计算。  "),v("br"),t._v("支持表达式语言:true（只用于变量注册表）")])]),t._v(" "),v("tr",[v("td",[v("strong",[t._v("Rollback On Failure")])]),t._v(" "),v("td",{staticStyle:{"text-align":"right"}},[t._v("false")]),t._v(" "),v("td",[t._v("▪true"),v("br"),t._v(" ▪false")]),t._v(" "),v("td",[t._v("指定如何处理错误。默认情况下(false)，如果在处理一个流文件时发生错误，该流文件将根据错误类型路由到“failure”或“retry”关系，处理器可以继续处理下一个流文件。相反（true），将回滚当前处理的流文件并立即停止进一步的处理，在这种情况下，失败的流文件将保留在输入关系中，而不会对其进行惩罚，并重复处理，直到成功处理或通过其他方法删除它。重要的是要设置足够的“Yield Duration”，以避免过于频繁地重试。注意:当一个错误发生在一个源自相同的输入FlowFile的已提交的Hive流事务,(即FlowFile包含比记录每笔交易的记录，错误发生在第二个事务或其他版本),成功记录将被转移到“成功”的关系,而原始输入FlowFile呆在输入队列。当再次处理相同的流文件时，数据会重复 。")])]),t._v(" "),v("tr",[v("td",[t._v("Kerberos Credentials Service")]),t._v(" "),v("td",{staticStyle:{"text-align":"right"}}),t._v(" "),v("td",[v("strong",[t._v("Controller Service API:")]),v("br"),t._v("KerberosCredentialsService"),v("br"),v("strong",[t._v("Implementation:")]),v("br"),t._v("KeytabCredentialsService")]),t._v(" "),v("td",[t._v("指定应该用于Kerberos身份验证的Kerberos凭证控制器服务")])]),t._v(" "),v("tr",[v("td",[t._v("Kerberos Principal")]),t._v(" "),v("td",{staticStyle:{"text-align":"right"}}),t._v(" "),v("td"),t._v(" "),v("td",[t._v("Kerberos主体进行身份验证。需要在nifi.properties中设置nifi.kerberos.krb5.file "),v("br"),t._v("支持表达式语言:true（只用于变量注册表）")])]),t._v(" "),v("tr",[v("td",[t._v("Kerberos Keytab")]),t._v(" "),v("td",{staticStyle:{"text-align":"right"}}),t._v(" "),v("td"),t._v(" "),v("td",[t._v("与主体关联的Kerberos keytab。需要在nifi.properties中设置nifi.kerberos.krb5.file  "),v("br"),t._v("支持表达式语言:true（只用于变量注册表）")])])])]),t._v(" "),v("h2",{attrs:{id:"连接关系"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#连接关系"}},[t._v("#")]),t._v(" 连接关系")]),t._v(" "),v("table",[v("thead",[v("tr",[v("th",[t._v("名称")]),t._v(" "),v("th",[t._v("描述")])])]),t._v(" "),v("tbody",[v("tr",[v("td",[t._v("retry")]),t._v(" "),v("td",[t._v("如果传入的流文件的记录不能传输到Hive，则将其路由到此关系。注意，一些记录可能已经成功处理，它们将被路由到成功关系(作为Avro流文件)。重试、成功和失败关系的组合表明有多少记录成功和/或失败。这可以用来提供重试功能，因为不可能完全回滚。")])]),t._v(" "),v("tr",[v("td",[t._v("success")]),t._v(" "),v("td",[t._v("一个包含Avro记录的流文件，在该记录成功传输到Hive后路由到这个关系。")])]),t._v(" "),v("tr",[v("td",[t._v("failure")]),t._v(" "),v("td",[t._v("如果无法将Avro记录传输到Hive，则包含路由到此关系的Avro记录的流文件。")])])])]),t._v(" "),v("h2",{attrs:{id:"读取属性"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#读取属性"}},[t._v("#")]),t._v(" 读取属性")]),t._v(" "),v("p",[t._v("没有指定。")]),t._v(" "),v("h2",{attrs:{id:"写属性"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#写属性"}},[t._v("#")]),t._v(" 写属性")]),t._v(" "),v("table",[v("thead",[v("tr",[v("th",[t._v("Name")]),t._v(" "),v("th",[t._v("Description")])])]),t._v(" "),v("tbody",[v("tr",[v("td",[t._v("hivestreaming.record.count")]),t._v(" "),v("td",[t._v("此属性写入路由到“成功”和“失败”关系的流文件，并包含分别写入成功和未成功的传入流文件中的记录数。")])]),t._v(" "),v("tr",[v("td",[t._v("query.output.tables")]),t._v(" "),v("td",[t._v("此属性写在路由到“成功”和“失败”关系的流文件上，并在“databaseName”中包含目标表名,表的格式。")])])])]),t._v(" "),v("h2",{attrs:{id:"状态管理"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#状态管理"}},[t._v("#")]),t._v(" 状态管理")]),t._v(" "),v("p",[t._v("此组件不存储状态。")]),t._v(" "),v("h2",{attrs:{id:"限制"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#限制"}},[t._v("#")]),t._v(" 限制")]),t._v(" "),v("p",[t._v("此组件不受限制。")]),t._v(" "),v("h2",{attrs:{id:"系统资源方面的考虑"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#系统资源方面的考虑"}},[t._v("#")]),t._v(" 系统资源方面的考虑")]),t._v(" "),v("p",[t._v("没有指定。")]),t._v(" "),v("h2",{attrs:{id:"应用场景"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#应用场景"}},[t._v("#")]),t._v(" 应用场景")]),t._v(" "),v("p",[t._v("该处理器用于向hive表写 数据，数据要求 是avro格式，要求使用者熟练使用hive。")]),t._v(" "),v("p",[t._v("通过 thrift nifi连hive的问题有点复杂,Apache版NIFI对应的Apache版hive，HDP版NIFI对应的HDP版hive。")]),t._v(" "),v("p",[t._v("连接HDP版hive时NIFI运行环境需配置hive HDFS的相关hosts,并且运行NIFI 的用户拥有hive表的读写权限。")]),t._v(" "),v("p",[t._v("此处理器hive支持的版本为1.2.1，不支持hive2.x,hive3.x则使用别的处理器。")]),t._v(" "),v("h2",{attrs:{id:"示例说明"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#示例说明"}},[t._v("#")]),t._v(" 示例说明")]),t._v(" "),v("p",[t._v("1：从数据库读取数据写入hive表（无分区）,Apache NIFI 1.8 - Apache hive 1.2.1")]),t._v(" "),v("p",[t._v("建表语句:")]),t._v(" "),v("p",[t._v("hive表只能是ORC格式；")]),t._v(" "),v("p",[t._v("默认情况下（1.2及以上版本）建表使用SQL2011关键字会报错，如果弃用保留关键字，还需另做配置；")]),t._v(" "),v("p",[t._v('建表时必须指明transactional = "true"')]),t._v(" "),v("p",[t._v('建表时需"clustered by (colName) into (n) buckets"')]),t._v(" "),v("p",[t._v("详情请查看hive  streaming 官方文档（https://cwiki.apache.org/confluence/display/Hive/Streaming+Data+Ingest）")]),t._v(" "),v("p",[v("img",{attrs:{src:"https://nifichina.gitee.io/image/processors/PutHiveStreaming/hive.png",alt:""}})]),t._v(" "),v("div",{staticClass:"language-sql extra-class"},[v("pre",{pre:!0,attrs:{class:"language-sql"}},[v("code",[v("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("CREATE")]),t._v(" "),v("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("TABLE")]),t._v(" demo_hive"),v("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("id "),v("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),v("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("name string"),v("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("day_time string"),v("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),v("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("CLUSTERED")]),t._v(" "),v("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("BY")]),t._v(" "),v("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("name"),v("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),v("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("INTO")]),t._v(" "),v("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),t._v(" BUCKETS\nSTORED "),v("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("AS")]),t._v(" ORC\nTBLPROPERTIES"),v("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),v("span",{pre:!0,attrs:{class:"token string"}},[t._v("'transactional'")]),v("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),v("span",{pre:!0,attrs:{class:"token string"}},[t._v("'true'")]),v("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),v("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),v("p",[v("img",{attrs:{src:"https://nifichina.gitee.io/image/processors/PutHiveStreaming/hive2.png",alt:""}})]),t._v(" "),v("p",[t._v("来源 库数据：")]),t._v(" "),v("p",[v("img",{attrs:{src:"https://nifichina.gitee.io/image/processors/PutHiveStreaming/input.png",alt:""}})]),t._v(" "),v("p",[t._v("配置如下：hive的thrift要查看配置 hive-site.xml")]),t._v(" "),v("p",[v("img",{attrs:{src:"https://nifichina.gitee.io/image/processors/PutHiveStreaming/config.png",alt:""}})]),t._v(" "),v("p",[v("img",{attrs:{src:"https://nifichina.gitee.io/image/processors/PutHiveStreaming/dataflow.png",alt:""}})]),t._v(" "),v("p",[t._v("输出结果:")]),t._v(" "),v("p",[v("img",{attrs:{src:"https://nifichina.gitee.io/image/processors/PutHiveStreaming/result.png",alt:""}})]),t._v(" "),v("p",[t._v("2: HDP NIFI 1.5 - HDP hive 1.2.1")]),t._v(" "),v("p",[v("img",{attrs:{src:"https://nifichina.gitee.io/image/processors/PutHiveStreaming/dataflow2.png",alt:""}})]),t._v(" "),v("h2",{attrs:{id:"公众号"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#公众号"}},[t._v("#")]),t._v(" 公众号")]),t._v(" "),v("p",[t._v("关注公众号 得到第一手文章/文档更新推送。")]),t._v(" "),v("p",[v("img",{attrs:{src:"https://nifichina.gitee.io/image/donate/wechat.jpg",alt:""}})])])}),[],!1,null,null,null);e.default=a.exports}}]);