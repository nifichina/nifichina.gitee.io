(window.webpackJsonp=window.webpackJsonp||[]).push([[51],{418:function(t,e,a){"use strict";a.r(e);var r=a(25),v=Object(r.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"putdatabaserecord"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#putdatabaserecord"}},[t._v("#")]),t._v(" PutDatabaseRecord")]),t._v(" "),a("hr"),t._v(" "),a("p",[t._v("编辑人(全网同名)："),a("strong",[a("strong",[t._v("酷酷的诚")])]),t._v("  邮箱："),a("strong",[t._v("zhangchengk@foxmail.com")])]),t._v(" "),a("hr"),t._v(" "),a("h2",{attrs:{id:"描述"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#描述"}},[t._v("#")]),t._v(" 描述")]),t._v(" "),a("p",[t._v("PutDatabaseRecord处理器使用指定的RecordReader从传入的流文件中读取（可能是多个，说数组也成）记录。这些记录将转换为SQL语句，并作为一个批次执行。如果发生任何错误，则将流文件路由到failure或retry，如果执行成功，则将传入的流文件路由到success。处理器执行的SQL语句类型通过"),a("code",[t._v("Statement Type")]),t._v("属性指定，该属性接受一些硬编码的值，例如INSERT，UPDATE和DELETE，使用“Use statement.type Attribute”可以使处理器获取流文件属性中的语句类型。")]),t._v(" "),a("p",[t._v("说明：如果语句类型为UPDATE，正常的不应该修改主键的值。如果记录中修改主键的值，那么有可能找不到数据进行修改或者修改破坏了一些数据(说白了，代码时按照根据主键值为条件进行update的)")]),t._v(" "),a("p",[t._v("当然，隐藏的功能是statement.type的值时‘SQL’的时候，可以从record中的某个字段读取值，此值应该是一个可以执行的SQL语句，该处理器就执行这个SQL就可以了。")]),t._v(" "),a("h2",{attrs:{id:"属性配置"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#属性配置"}},[t._v("#")]),t._v(" 属性配置")]),t._v(" "),a("p",[t._v("在下面的列表中，必需属性的名称以粗体显示。任何其他属性(不是粗体)都被认为是可选的，并且指出属性默认值（如果有默认值），以及属性是否支持表达式语言。")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("Name")]),t._v(" "),a("th",[t._v("Default Value")]),t._v(" "),a("th",[t._v("Allowable Values")]),t._v(" "),a("th",[t._v("Description")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[a("strong",[t._v("Record Reader")])]),t._v(" "),a("td"),t._v(" "),a("td",[a("strong",[t._v("Controller Service API:")]),t._v(" "),a("br"),t._v(" RecordReaderFactory "),a("br"),t._v(" "),a("strong",[t._v("Implementations:")]),t._v(" JsonPathReader"),a("br"),t._v("XMLReader"),a("br"),t._v("ScriptedReader"),a("br"),t._v("CSVReader"),a("br"),t._v("Syslog5424Reader"),a("br"),t._v("GrokReader"),a("br"),t._v("AvroReader"),a("br"),t._v("JsonTreeReader"),a("br"),t._v("ParquetReader"),a("br"),t._v("SyslogReader")]),t._v(" "),a("td",[t._v("指定用于解析传入数据和确定数据模式的Controller Service。")])]),t._v(" "),a("tr",[a("td",[t._v("Database Type")]),t._v(" "),a("td",[t._v("Generic")]),t._v(" "),a("td",[t._v("Generic "),a("br"),t._v("  Oracle "),a("br"),t._v("  Oracle 12+ "),a("br"),t._v(" MSSQL 2012+ "),a("br"),t._v(" MSSQL 2008 "),a("br"),t._v(" MySQL "),a("br"),t._v(" PostgreSQL")]),t._v(" "),a("td",[t._v("数据库的类型/风格，用于生成特定于数据库的代码。在许多情况下，通用类型就足够了，但是某些数据库（例如Oracle）需要自定义SQL子句。")])]),t._v(" "),a("tr",[a("td",[a("strong",[t._v("Statement Type")])]),t._v(" "),a("td"),t._v(" "),a("td",[t._v("UPDATE "),a("br"),t._v(" INSERT "),a("br"),t._v(" UPSERT "),a("br"),t._v(" DELETE "),a("br"),t._v(" Use statement.type Attribute")]),t._v(" "),a("td",[t._v("指定要生成的SQL语句的类型。请参考数据库文档以获取每个操作行为的描述。请注意，某些数据库类型可能不支持某些语句类型。如果选择了“Use statement.type Attribute”，则该值取自FlowFile中的statement.type属性。 “Use statement.type Attribute”选项是唯一允许使用“SQL”语句类型的选项。如果指定了“SQL”，则“Field ContainingSQL”属性指定的字段的值应为目标数据库上的有效SQL语句，并将按原样执行。")])]),t._v(" "),a("tr",[a("td",[a("strong",[t._v("Database Connection Pooling Service")])]),t._v(" "),a("td"),t._v(" "),a("td",[a("strong",[t._v("Controller Service API:")]),t._v(" "),a("br"),t._v(" DBCPService "),a("br"),t._v(" "),a("strong",[t._v("Implementations:")]),t._v(" "),a("br"),t._v("DBCPConnectionPool"),a("br"),t._v("HiveConnectionPool"),a("br"),t._v("DBCPConnectionPoolLookup")]),t._v(" "),a("td",[t._v("Controller Service，用于获得与数据库的连接以发送记录。")])]),t._v(" "),a("tr",[a("td",[t._v("Catalog Name")]),t._v(" "),a("td"),t._v(" "),a("td"),t._v(" "),a("td",[t._v("语句应更新的目录的名称。这可能不适用于你要更新的数据库。在这种情况下，请将该字段留空"),a("br"),t._v(" "),a("strong",[t._v("Supports Expression Language: true (will be evaluated using flow file attributes and variable registry)")])])]),t._v(" "),a("tr",[a("td",[t._v("Schema Name")]),t._v(" "),a("td"),t._v(" "),a("td"),t._v(" "),a("td",[t._v("表所属的schema的名称。这可能不适用于你要更新的数据库。在这种情况下，请将该字段留空"),a("br"),t._v(" "),a("strong",[t._v("Supports Expression Language: true (will be evaluated using flow file attributes and variable registry)")])])]),t._v(" "),a("tr",[a("td",[a("strong",[t._v("Table Name")])]),t._v(" "),a("td"),t._v(" "),a("td"),t._v(" "),a("td",[t._v("语句应影响的表的名称。"),a("br"),t._v(" "),a("strong",[t._v("Supports Expression Language: true (will be evaluated using flow file attributes and variable registry)")])])]),t._v(" "),a("tr",[a("td",[t._v("Translate Field Names")]),t._v(" "),a("td",[t._v("true")]),t._v(" "),a("td",[t._v("true "),a("br"),t._v(" false")]),t._v(" "),a("td",[t._v("如果为true，则处理器将尝试将字段名称转换为指定表的适当列名称。如果为false，则字段名称必须与列名称完全匹配，否则该列将不会更新")])]),t._v(" "),a("tr",[a("td",[t._v("Unmatched Field Behavior")]),t._v(" "),a("td",[t._v("Ignore Unmatched Fields")]),t._v(" "),a("td",[t._v("Ignore Unmatched Fields "),a("br"),t._v(" Fail on Unmatched Fields")]),t._v(" "),a("td",[t._v("如果传入记录的字段未映射到数据库表的任何列，则此属性指定如何处理这种情况")])]),t._v(" "),a("tr",[a("td",[t._v("Unmatched Column Behavior")]),t._v(" "),a("td",[t._v("Fail on Unmatched Columns")]),t._v(" "),a("td",[t._v("Ignore Unmatched Columns"),a("br"),t._v(" Warn on Unmatched Columns "),a("br"),t._v(" Fail on Unmatched Columns")]),t._v(" "),a("td",[t._v("如果传入的记录没有数据库表所有列的字段映射，则此属性指定如何处理这种情况")])]),t._v(" "),a("tr",[a("td",[t._v("Update Keys")]),t._v(" "),a("td"),t._v(" "),a("td"),t._v(" "),a("td",[t._v("列名的逗号分隔列表，可唯一标识数据库中UPDATE语句的行。如果语句类型为UPDATE且未设置此属性，则使用表的主键。在这种情况下，如果不存在主键，并且如果“不匹配的列行为”设置为“失败”，则到SQL的转换将失败。如果语句类型为INSERT，则忽略此属性 "),a("br"),t._v(" "),a("strong",[t._v("Supports Expression Language: true (will be evaluated using flow file attributes and variable registry)")])])]),t._v(" "),a("tr",[a("td",[t._v("Field ContainingSQL")]),t._v(" "),a("td"),t._v(" "),a("td"),t._v(" "),a("td",[t._v("如果语句类型为“SQL”（在statement.type属性中设置），则此字段指示记录中的哪个字段包含要执行的SQL语句。该字段的值必须是单个SQL语句。如果语句类型不是“SQL”，则忽略此字段。"),a("br"),t._v(" "),a("strong",[t._v("Supports Expression Language: true (will be evaluated using flow file attributes and variable registry)")])])]),t._v(" "),a("tr",[a("td",[a("strong",[t._v("Allow MultipleSQL Statements")])]),t._v(" "),a("td",[t._v("false")]),t._v(" "),a("td",[t._v("true "),a("br"),t._v("  false")]),t._v(" "),a("td",[t._v("如果语句类型为“SQL”（在statement.type属性中设置），则此字段指示是否用分号分隔字段值并分别执行每个语句。如果有任何语句导致错误，则将回滚整个语句集。如果语句类型不是“SQL”，则忽略此字段。")])]),t._v(" "),a("tr",[a("td",[t._v("Quote Column Identifiers")]),t._v(" "),a("td",[t._v("false")]),t._v(" "),a("td",[t._v("true "),a("br"),t._v("  false")]),t._v(" "),a("td",[t._v("启用此选项将导致所有列名都被引用，从而允许你将保留字用作表中的列名。")])]),t._v(" "),a("tr",[a("td",[t._v("Quote Table Identifiers")]),t._v(" "),a("td",[t._v("false")]),t._v(" "),a("td",[t._v("true")]),t._v(" "),a("td",[a("br"),t._v(" false")])]),t._v(" "),a("tr",[a("td",[a("strong",[t._v("Max Wait Time")])]),t._v(" "),a("td",[t._v("0 seconds")]),t._v(" "),a("td"),t._v(" "),a("td",[t._v("运行的SQL语句所允许的最长时间，零表示没有限制。少于1秒的最长时间将等于零。 "),a("br"),t._v(" "),a("strong",[t._v("Supports Expression Language: true (will be evaluated using variable registry only)")])])]),t._v(" "),a("tr",[a("td",[a("strong",[t._v("Rollback On Failure")])]),t._v(" "),a("td",[t._v("false")]),t._v(" "),a("td",[t._v("true "),a("br"),t._v("false")]),t._v(" "),a("td",[t._v("指定如何处理错误。默认情况下（false），如果在处理FlowFile时发生错误，则FlowFile将根据错误类型路由到“failure”或“retry”关系，处理器可以继续使用下一个FlowFile。相反，你可能想回滚当前已处理的FlowFile，并立即停止进一步的处理。在这种情况下，你可以通过启用此“回滚失败”属性来实现。如果启用，失败的FlowFiles将保留在输入关系中，而不会受到惩罚，并会反复处理，直到成功处理或通过其他方式将其删除。重要的是要设置足够的“有效期限”，以免重试太频繁。")])]),t._v(" "),a("tr",[a("td",[a("strong",[t._v("Table Schema Cache Size")])]),t._v(" "),a("td",[t._v("100")]),t._v(" "),a("td"),t._v(" "),a("td",[t._v("指定应缓存多少个表模式")])]),t._v(" "),a("tr",[a("td",[t._v("Maximum Batch Size")]),t._v(" "),a("td",[t._v("0")]),t._v(" "),a("td"),t._v(" "),a("td",[t._v("指定INSERT和UPDATE语句的最大批处理大小。该参数对“语句类型”中指定的其他语句无效。零表示批量不受限制。 "),a("br"),t._v(" "),a("strong",[t._v("Supports Expression Language: true (will be evaluated using flow file attributes and variable registry)")])])])])]),t._v(" "),a("h2",{attrs:{id:"连接关系"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#连接关系"}},[t._v("#")]),t._v(" 连接关系")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("Name")]),t._v(" "),a("th",[t._v("Description")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("retry")]),t._v(" "),a("td",[t._v("如果无法更新数据库，但再次尝试操作可能会成功将FlowFile路由到此关系")])]),t._v(" "),a("tr",[a("td",[t._v("success")]),t._v(" "),a("td",[t._v("从SQL查询结果集中成功创建了FlowFile。")])]),t._v(" "),a("tr",[a("td",[t._v("failure")]),t._v(" "),a("td",[t._v("如果无法更新数据库，并且无法重试该操作（例如无效查询或违反完整性约束），也会将FlowFile路由到此关系")])])])]),t._v(" "),a("h2",{attrs:{id:"读取属性"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#读取属性"}},[t._v("#")]),t._v(" 读取属性")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("Name")]),t._v(" "),a("th",[t._v("Description")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("statement.type")]),t._v(" "),a("td",[t._v("如果为“语句类型”属性选择了“使用statement.type属性”，则此属性的值将用于确定要生成和执行的语句类型（INSERT，UPDATE，DELETE，SQL等）。")])])])]),t._v(" "),a("h2",{attrs:{id:"写属性"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#写属性"}},[t._v("#")]),t._v(" 写属性")]),t._v(" "),a("h3",{attrs:{id:""}},[a("a",{staticClass:"header-anchor",attrs:{href:"#"}},[t._v("#")])]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("Name")]),t._v(" "),a("th",[t._v("Description")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("putdatabaserecord.error")]),t._v(" "),a("td",[t._v("如果在处理过程中发生错误，则流文件将被路由至失败或重试，并且将使用错误原因填充该属性。")])])])]),t._v(" "),a("h2",{attrs:{id:"状态管理"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#状态管理"}},[t._v("#")]),t._v(" 状态管理")]),t._v(" "),a("p",[t._v("此组件不存储状态。")]),t._v(" "),a("h2",{attrs:{id:"限制"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#限制"}},[t._v("#")]),t._v(" 限制")]),t._v(" "),a("p",[t._v("此组件不受限制。")]),t._v(" "),a("h2",{attrs:{id:"输入要求"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#输入要求"}},[t._v("#")]),t._v(" 输入要求")]),t._v(" "),a("p",[t._v("此组件需要传入关系。")]),t._v(" "),a("h2",{attrs:{id:"系统资源方面的考虑"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#系统资源方面的考虑"}},[t._v("#")]),t._v(" 系统资源方面的考虑")]),t._v(" "),a("p",[t._v("没有指定。")]),t._v(" "),a("h2",{attrs:{id:"应用场景"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#应用场景"}},[t._v("#")]),t._v(" 应用场景")]),t._v(" "),a("p",[t._v("在PutDatabaseRecord之前，我们想要写入数据到数据库，往往需要使用ConvertJsonToSql+PutSQL组合，尤其是当数据格式不是json的时候还需要先将数据转换为json，而使用ConvertJsonToSql属于一遍连接了目标库，一边要在内存解析一次数据，转成了参数化的SQL，并且参数也是放到FlowFile的属性中,平白无故的这个FlowFile也就更吃内存了。PutDatabaseRecord的好处就是我们可以将任何NIFI支持的Record写入指定目的，在内存解析一次数据就可以了。当然了，前后两种方式写数据到数据库的基本原理都是一样的，只是PutDatabaseRecord的效率更好一些。")]),t._v(" "),a("p",[t._v("最早，PutDatabaseRecord支持将特定的Record集合转成Insert，Update，Delete语句，我们只要选择"),a("strong",[t._v("Statement Type")]),t._v("即可。然后为了更灵活，增加了"),a("code",[t._v("Use statement.type Attribute")]),t._v("选项，我们可以在上游的FlowFile中指定"),a("code",[t._v("statement.type")]),t._v("属性，这期间又暗地里加了“statement.type=SQL”的功能，当"),a("strong",[t._v("Statement Type")]),t._v("的值时“SQL”的时候，我们要配合"),a("code",[t._v("Field ContainingSQL")]),t._v("配置进行工作。"),a("code",[t._v("Field ContainingSQL")]),t._v("指的是上游来的FlowFile中的一个字段，这个字段值是一个可执行的SQL。")]),t._v(" "),a("p",[t._v("可能让我们比较迷茫的是"),a("code",[t._v("Unmatched Field Behavior")]),t._v("和"),a("code",[t._v("Unmatched Column Behavior")]),t._v("，我们如果纠结这两个配置的描述就会很难受，我们只关注两个单词'Field'和'Column'就可以分清楚了。'Column'我们知道，(目标)表的列嘛，就是说如果你手里的数据中的列没有与我目标表的column对应会怎么样。而'Field'针对的是Record，是具体的数据，就是说如果你目标表里列没有与我Record中的Field相对应会怎么样。具体的关系我描述一下：首先Record中会携带schema元数据信息(或推断出schema信息)，信息里会有若干个Field。我们在生成SQL的时候，会从目标数据库查询指定表的元数据信息(放缓存里)，而数据库里设置成非null的且非自增长的没有设置默认值的则认为是required字段。然后针对insert、delete大体有三个步骤，第一步是遍历required字段，看record里是否都有这几个字段，如果没有就用到"),a("code",[t._v("Unmatched Column Behavior")]),t._v("，如果我们配置了'ignore'了，就继续执行。第二步是对这几个Field的遍历 -> 查询是否在指定表的元数据里有对应的列信息，当遇到没有的情况时,就是"),a("code",[t._v("Unmatched Field Behavior")]),t._v("，如果我们配置了'ignore'了，就继续执行。如果存在，我们就放到一个集合set里存起来。第二步遍历结束后，第三步我们再判断这个集合set有没有值，如果是空的，就直接报"),a("code",[t._v('"None of the fields in the record map to the columns defined by the " + tableName + " table"')]),t._v("SQLDataException异常了。update的话稍微有些不一样，第一步就检测"),a("code",[t._v("Update Keys")]),t._v("，如果没有对应值就默认使用目标表的主键，如果都没有值就报"),a("code",[t._v('"Table \'" + tableName + "\' does not have a Primary Key and no Update Keys were specified"')]),t._v("异常了，然后紧接着检测record里是否有这些字段，没有就要"),a("code",[t._v("Unmatched Column Behavior")]),t._v("。第二步跟上面一样，就是对这几个Field的遍历 -> 查询是否在指定表的元数据里有对应的列信息，当遇到没有的情况时,就是"),a("code",[t._v("Unmatched Field Behavior")]),t._v("，如果我们配置了'ignore'了，就继续执行。最后upset的检查就是融合了insert和update。")]),t._v(" "),a("p",[t._v("然后得说一下这个"),a("code",[t._v("Translate Field Names")]),t._v("，这个功能点其实非常好，其实就是将列名转大写替换下划线(Record中的列和指定表的列都做此转换，指定表的列信息会做成一个Map映射，转换的列名：列元数据信息)")]),t._v(" "),a("div",{staticClass:"language-java extra-class"},[a("pre",{pre:!0,attrs:{class:"language-java"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("private")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("static")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("normalizeColumnName")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("final")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),t._v(" colName"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("final")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("boolean")]),t._v(" translateColumnNames"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" colName "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("translateColumnNames "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?")]),t._v(" colName"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("toUpperCase")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("replace")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"_"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('""')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" colName"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("将fieldName转大写替换下划线，然后跟指定表的同样转换过后的列元数据信息映射进行匹配，记录下Field的那个索引值，然后组SQL设置参数的时候根据索引值找到record中对应的value就行了。这个功能其实就是帮助我们更好的对Record列和目标表列进行匹配。而SQL中的列名其实用的还是从指定表查询出来的列元数据信息。")]),t._v(" "),a("h2",{attrs:{id:"公众号"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#公众号"}},[t._v("#")]),t._v(" 公众号")]),t._v(" "),a("p",[t._v("关注公众号 得到第一手文章/文档更新推送。")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://nifichina.gitee.io/image/donate/wechat.jpg",alt:""}})])])}),[],!1,null,null,null);e.default=v.exports}}]);