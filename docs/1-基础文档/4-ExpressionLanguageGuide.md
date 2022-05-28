# 表达式语言指南(Expression Language Guide)
***
编辑人：__**le.zw**__  邮箱：**le.zw@qq.com** 
***



## 1.概述

Apache NiFi 中的所有数据都通过流文件“FlowFile”的抽象表示。FlowFile由两个主要部分组成：内容和属性。FlowFile的内容部分表示要操作的数据。例如，如果使用GetFile 组件从本地文件系统中获取文件，则该文件的内容将成为FlowFile 的内容。

FlowFile的属性部分表示有关数据本身或额外的一些元数据信息。属性是键值对，表示对数据信息以及对于适当的输出和处理数据有用的信息。继续以上面的获取文件的组件为例，FlowFile将具有一个名为 `filename` 的属性反映文件系统上文件的名称。另外，FlowFile还有一个 `path` 属性反映此文件所在的文件系统上的目录。FlowFile还将具有一个名为 `uuid` 的属性，这是此FlowFile 的唯一标识符。有关核心属性的完整列表，请查看开发人员指南的`FlowFile`部分

如果用户无法使用这些属性，那么将这些属性放在FlowFile上就没什么用处。NiFi表达式语言提供了访问这些属性并将它们与其他值进行比较以及操作的功能

## 2.NiFi表达式的结构
NiFi表达式语言始终以起始分隔符 `${` 开头并以结束分隔符 `}` 结束。在开始和结束分隔符之间是表达式本身的文本。在最基本的形式中，表达式只包含一个属性名称。 例如， `${filename}` 将返回 `filename` 属性的值。 

在稍微复杂的示例中，我们可以返回对此值的操作。例如，我们可以通过调用 `toUpper` 函数: `${filename:toUpper()}` 返回文件名的大写值。在这种情况下，我们访问 `filename` 属性，然后使用 `toUpper` 函数来操作它的值。函数调用由5个元素组成。首先，有一个函数调用分隔符 `:`。第二个是函数的名称 - 在本例中就是 `toUpper` 。接下来是一个左括号（`(`），后跟函数参数，参数必填与否取决于调用哪个函数。在这个例子中，我们使用 `toUpper` 函数，不需要任何参数，因此可忽略不填。 最后，右括号（`)`）表示函数调用的结束。表达式语言支持许多不同的功能，以实现许多不同的目标。有些函数提供String(文本)操作，例如 `toUpper` 功能。其他的, 比如 `equals` 和 `matches` 函数，提供比较功能。还有用于操纵日期和时间以及执行数学运算的函数。下面在`<<functions>>`部分描述了这些函数，并解释了函数的作用，它需要的参数以及它返回的信息类型。

当我们对属性执行函数调用时，如上所述，我们将属性称为函数的主题（ _subject_ ），因为属性是函数运行的实体。然后我们可以将多个函数调用链接在一起，其中第一个函数的返回值成为第二个函数的主题，其返回值成为第三个函数的主题， 依此类推。继续我们的示例，我们可以使用表达式将多个函数链接在一起 `${filename:toUpper():equals('HELLO.TXT')}`。可以链接在一起的函数数量没有限制。

可以使用表达式语言引用FlowFile上的任何属性。但是，如果属性名称包含特殊字符，必须通过转义引用属性名称。以下字符都是特殊字符： 

- `$` (美元符号)
- `|` (管道符)
- `{` (大括号开始符)
- `}` (大括号结束符)
- `(` (小括号开始符)
- `)` (小括号结束符)
- `[` (中括号开始符)
- `]` (中括号结束符)
- `,` (逗号)
- `:` (冒号)
- `;` (分号)
- `/` (斜杠)
- `*` (星号)
- `'` (单引号)
- ` ` (空格)
- `\t` (制表符)
- `\r` (回车符)
- `\n` (换行符)

此外，如果一个数字是属性名称的第一个字符，它将被视作特殊字符。如果属性中存在任何特殊字符，则使用单引号或双引号转义。表达式语言允许单引号和双引号可互换使用。例如，以下内容可用于转义名为 `my attribute` 的属性: `${"my attribute"}` 或者 `${'my attribute'}`。

在此示例中，要返回的值是“my attribute”属性的值(如果存在)。如果该属性不存在，则表达式语言将查找名为“my attribute”的系统环境变量。如果无法找到它，它将查找名为“my attribute”的JVM系统属性。最后，如果这些都不存在，表达语言将返回一个空字符串 `null` 值。表达式语言将在层次结构中搜索匹配的属性。有关层次结构的描述，请参见[表达式语言层次结构](#2.1表达式语言的层次结构) 结构

还存在一些函数没有主题。这些函数只需通过表达式的开头来调用，例如 `${hostname()}`。然后，这些函数也可以一起更改，例如， `${hostname():toUpper()}`。尝试使用主题来验证函数将出错。在下面的 `<<functions>>`部分中，一些函数将在其描述中清楚地表明它们不需要主题。

通常，我们需要将两个不同属性的值相互比较。我们可以通过使用嵌入式表达式来实现这一目标。例如，我们可以检查一下 `filename` 属性与 `UUID` 属性是否相同: `${filename:equals( ${uuid} )}`。另请注意，我们在括号里面有一个空格，在 `equals` 方法和嵌入式表达式之间。这不是必需的，也不会影响以任何验证表达式的方法。它旨在使表达更容易阅读。分隔符之间的表达式语言忽略空格。因此，我们可以使用表达式 `$ {filename:equals($ {uuid})}` 或者 `$ {filename:equals($ {uuid})}` 两个表达式表达相同意思。但是，我们不能使用 `${file name:equals(${uuid})}`，因为这将导致在 `file` 和 `name` 被视作不同的属性, 而不是单个属性 `filename`。

### 2.1表达式语言的层次结构
当使用表达式语言按名称引用属性时，NiFi 将按照规定好的层次结构搜索属性值的定义。
NiFi中当前属性匹配的层次结构如下：
1. 在 FlowFile 中搜索属性/键
2. 搜索属性/键的进程组变量
3. 在文件注册表文件中搜索属性/键
4. 在 NiFi JVM 属性中搜索属性/键
4. 在系统环境变量中搜索属性/键

NiFi 将搜索并返回匹配属性第一次出现的值。如果没有找到匹配的属性，则返回null

## 3.应用程序中的表达式语言
表达式语言在整个 NiFi 应用程序中被大量使用，用于配置组件属性。但是，并非所有组件属性都支持表达式语言。属性是否支持表达式语言由组件的开发者在组件开发时就确定好了。但是，该应用程序应该清楚地说明每个属性是否支持表达式语言。

在应用程序中，配置组件属性时，用户界面上的属性名称旁边会提供一个信息图标（ Info ）。将鼠标悬停在此图标上将显示提示，提供有关该属性的有用信息。此信息包括属性的描述，默认值(如果有)，历史配置值(如果有)以及此属性的表达式语言的取值范围。有三个值，分别是:NONE →VARIABLE_REGISTRY → FLOWFILE_ATTRIBUTES。

+ NONE - 此属性不支持表达式语言。

+ VARIABLE_REGISTRY 按层次结构构造如下:
  + 在模块级别定义的变量，然后递归地定义到更高的模块，直到根模块。
  + 自定义properties文件中的变量，通过NiFi nifi.properties文件中的nifi.variable.registry.properties属性进行设置。
  + 在JVM级别和系统属性中定义的环境变量。

+ FLOWFILE_ATTRIBUTES - 数据流的属性。

## 4.转义表达式

有时，属性支持表达式语言，但用户希望使用遵循与表达式语言相同语法的特殊符号。例如，用户可能希望将属性值配置为文字  `Hello ${UserName}`。在这种情况下，这可以通过在表达式之前使用额外的 `$`（美元符号）来转义它（即，`Hello $${UserName}`）来完成。除非该`$` 字符用于转义表达式，否则不应转义。例如，该值`Hello $$User$$Name` 不应转义`$`字符，因此将使用的文字值为`Hello $$User$$Name`.

如果`$`在 a 之前连续遇到两个以上的字符`{`，则每对`$`字符都将被视为字符的转义`$`。转义将从左到右执行。为了帮助说明这一点，假设属性 `abc` 值为 `xyz`。参考下表的表达式及其相应的值：

|                   表达式                    |                    值                    |                             备注                             |
| :-----------------------------------------: | :--------------------------------------: | :----------------------------------------------------------: |
|                   ${abc}                    |                   xyz                    |                                                              |
|                   $${abc}                   |                  ${abc}                  |                                                              |
|                  $$${abc}                   |                   $xyz                   |                                                              |
|                  $$$${abc}                  |                 $${abc}                  |                                                              |
|                 $$$$${abc}                  |                  $$xyz                   |                                                              |
|                I owe you $5                 |               I owe you $5               |                     这里没有实际的表达式                     |
|             You owe me $$5 too              |            You owe me $$5 too            |         $ 字符不会被转义，因为它不是紧跟在表达式之前         |
|  Unescaped $$${5 because no closing brace   | Unescaped $$${5 because no closing brace | 因为这里没有右大括号，所以没有实际的表达式，因此 $ 字符不会被转义 |
|  Unescaped $$${5} because no closing brace  |                 `<Error>`                  | 此表达式无效，因为它等于转义的\$，后跟\${5}，并且\${5}不是有效的表达式。这里数字必须转义才能表示成字符串 |
| Unescaped $$${'5'} because no closing brace |   Unescaped $ because no closing brace   | 没有名为 5 的属性，因此表达式的计算结果为空字符串。 $$ 评估为单个（转义）$，因为它紧接在表达式之前 |

## 5.表达式编辑器

配置组件属性的值时，NiFi 用户界面可使用表达式语言编辑器提供表达式语言的帮助。通过键入开始表达式 `${`，编辑器开始突出显示括号和大括号，以便用户可以轻松地分辨哪个左括号或左大括号匹配哪个右括号或右大括号。

编辑器还提供了可在当前光标位置使用的所有函数的列表，从而提供了上下文相关的帮助。要激活此功能，请按键盘上的Ctrl + Space。用户还可以键入函数名称的一部分，然后按Ctrl + Space查看可以使用以相同前缀开头的所有函数。例如，如果我们输入编辑器 `${filename:to` 然后按Ctrl + Space，我们会弹出一个列出六种不同功能的弹出窗口: `toDate`，`toLower`，`toNumber`，`toRadix`，`toString` 和 `toUpper`。然后我们可以继续输入以缩小显示哪些函数的范围，或者我们可以通过用鼠标双击它或使用箭头键突出显示所需功能并按Enter键从列表中选择一个功能。

## 6.函数

函数提供了一种操作和比较属性值的便捷方法。表达式语言提供了许多不同的函数来满足对属性操作的需求。每个函数接受零到多个参数并返回单个值。然后可以将这些函数链接在一起以构建强大的表达式来验证条件和操作值。有关如何调用和链接函数的更多信息，请参见[NiFi 表达式的结构](#2.NiFi表达式的结构)。

### 6.1数据类型

函数的每个参数和函数返回的每个值都具有特定的数据类型。表达式语言支持四种不同的数据类型:

- **String**：String是一系列字符，可以包含数字，字母，空格和特殊字符。
- **Number**：Number是由一个或多个数字组成的整数(`0` 到 `9`)。从Date数据类型转换为数字时，它们表示为自格林威治标准时间1970年1月1日午夜以来的毫秒数。
- **Decimal**：Decimal是一个数值，可以支持小数和更大的值，而精度损失最小。更确切地说，它是一个双精度64位IEEE 754浮点数。由于这种最小的精度损失，这种数据类型不应该用于非常精确的值，例如货币。有关此数据类型中存储的值范围的更多文档，请参阅此内容[link](https://docs.oracle.com/javase/specs/jls/se7/html/jls-4.html#jls-4.2.3) 。 以下是表达式语言支持的小数形式的一些示例 (“E”也可以是小写):
  - 1.1
  - .1E1
  - 1.11E-12
- **Date**：Date是一个包含日期和时间的对象。利用[日期操作](#12.日期操作)和[类型强制转换](#13.类型强制转换)函数可以将这种数据类型转换为字符串和数字。如果整个表达式语言表达式被定义为日期，那么将可被转换为具有以下格式的字符串:"<星期> <月> <日> <时>:<分>:<秒> <时区> <年>"。 在Java SimpleDateFormat格式中也表示为“E MMM dd HH:mm:ss z yyyy”。例如：“Wed Dec 31 12:00:04 UTC 2016”。
- **Boolean**：Boolean布尔值是 `true` 或者 `false`。

表达式语言函数计算后所得的最终值都存储为String类型。

表达式语言通常能够自动将一种数据类型的值强制转换为适合函数的适当数据类型。但是，也提供将值手动强制转换为特定数据类型的函数。有关更多信息，请参阅[类型强制转换](13.类型强制转换)部分。

Number和Decimal类型支持十六进制值，但在被解释为文字时，引用它们必须以“0x”为前缀。例如，如下两个表达式都是有效的（没有引号或“0x”表达式将无法正常运行）：

- ${literal("0xF"):toNumber()}
- ${literal("0xF.Fp10"):toDecimal()}

## 7.布尔表达式

### 7.1 isNull

表达式语言最强大的功能之一是能够将属性值与其他值进行比较。用于例如通过组件配置属性来处理如何路由输出数据。以下函数用于执行布尔逻辑，例如比较两个值。这些函数中的每一个都设计用于处理Boolean类型的值。

**描述**: 如果主题为空，`isNull` 函数返回 `true` ，否则返回 `false`。这通常用于确定属性是否存在。

**主题类型**: 任意

**参数**:无

**返回值类型**: Boolean

**例子**: `${filename:isNull()}` 如果“filename”属性不存在，返回`true`, 如果属性存在，返回 `false` 。

### 7.2 notNull

**描述**: `notNull` 函数返回 `isNull` 函数相反的值。也就是说，如果主题存在它会返回 `true` ，否则返回 `false` 。

**主题类型**: 任意

**参数**:无

**返回值类型**: Boolean

**例子**: `${filename:notNull()}` 如果“filename”属性存在，返回 `true`。如果属性不存在，返回 `false`。

### 7.3 isEmpty

**描述**: 如果主题为null、不包含任何字符，或仅包含空格(换行，回车符，空格，制表符等)，`isEmpty` 函数返回 `true` ，否则返回 `false`。

**主题类型**: String

**参数**:无

**返回值类型**: Boolean

**例子**: 如果“filename”属性不存在或仅包含空格，`${filename:isEmpty()}` 返回 `true` ， `${literal(" "):isEmpty()}` 以及 `${literal(""):isEmpty()}` 都返回 `true`。

### 7.4 equals

**描述**: `equals` 函数被广泛使用并确定其主题是否等于另一个String值。请注意 `equals` 函数执行两个String值的直接比较。注意不要将此函数与[matches](#10.6 matches)函数混淆 ，后者根据正则表达式计算其主题。

**主题类型**: 任意

**参数**:

- *value* : 要比较的主题的值。必须与主题相同的类型。

**返回值类型**: Boolean

**例子**: 通过使用表达式 `${filename:equals('hello.txt')}`，我们可以检查数据流的文件名是否为“hello.txt”。或者可以检查 `hello` 是否等于 `filename` 属性的值: `${hello:equals( ${filename} )}`。

### 7.5 equalsIgnoreCase

**描述**: 与`equals` 函数相似， `equalsIgnoreCase` 函数将其主题与String值进行比较，如果两个值忽略大小写的情况下是相同的，则返回`true`。

**主题类型**: String ，

**参数**:

- *value*: 要比较主题的值。

**返回值类型**: Boolean

**例子**:  如果filename等于"hello.txt"或者 "HELLO.TXT"或者 "HeLLo.TxT"，`${filename:equalsIgnoreCase('hello.txt')}` 都将返回 `true`。

### 7.6 gt

**描述**: `gt` 函数用于数字比较。如果主题大于其参数，返回 `true` 。如果主题或参数无法强制转换为数字，则此函数返回 `false`。

**主题类型**: Number

**参数**:

- *value*: 要比较主题的数字。

**返回值类型**: Boolean

**例子**: 如果的内容大小超过1千字节(1024字节)，`${fileSize:gt( 1024 )}` 将返回 `true` 。否则，它将返回 `false`。

### 7.7 ge

**描述**: `ge` 函数用于数字比较。如果主题大于或等于其参数，返回 `true` 。如果主题或参数无法强制转换为数字，则此函数返回 `false`。

**主题类型**: Number

**参数**:

- *value*: 要比较主题的数字。

**返回值类型**: Boolean

**例子**: 如果FlowFile内容的大小至少(大于或等于)1千字节(1024字节)。`${fileSize:ge( 1024 )}` 将返回 `true`。否则，它将返回 `false`。

### 7.8 lt

**描述**: `lt` 函数用于数字比较，如果主题小于其参数，返回 `true`。如果主题或参数无法强制转换为数字，则此函数返回 `false`。

**主题类型**: Number

**参数**:

- *value*: 要比较主题的数字。

**返回值类型**: Boolean

**例子**: 如果数据流内容小于1兆字节(1048576字节)，`${fileSize:lt( 1048576 )}` 将返回 `true`。否则，它将返回 `false`。

### 7.9 le

**描述**: `le` 函数用于数字比较，如果主题小于或等于其参数，返回 `true`。如果主题或参数无法强制转换为数字，则此函数返回 `false`。

**主题类型**: Number

**参数**:

- *value*: 要比较主题的数字。

**返回值类型**: Boolean

**例子**:  如果数据流内容的最多(小于或等于)1兆字节(1048576字节)，`${fileSize:le( 1048576 )}` 将返回 `true`。否则，它将返回 `false`。

### 7.10 and

**描述**: `and` 函数将布尔值作为单个参数。如果主题和参数都是`true`，则返回 `true` 。如果主题或参数其中任一个是 `false`或者不能强制转换为布尔值，函数返回 `false`。通常会与嵌入式表达式一起用作参数。

**主题类型**: Boolean

**参数**:

- *condition*: 'and’表达式右手边内容

**返回值类型**: Boolean

**例子**:  我们可以通过使用表达式检查文件名是否都是小写的并且至少有5个字符

```
${filename:toLower():equals( ${filename} ):and(
	${filename:length():ge(5)}
)}
```

### 7.11 or

**描述**: `or` 函数将布尔值作为单个参数。 如果主题或参数任一是 `true`，则返回 `true`。如果主题和参数都是 `false`，函数返回 `false`。如果无法将Subject或参数强制转换为布尔值，则此函数将返回 `false`。

**主题类型**: Boolean

**参数**:

- *condition*: 'and'

**返回值类型**: Boolean

**例子**:  如果文件名正好有5个字符，或者文件名都是小写的，以下示例将返回 `true` 。

```
${filename:toLower():equals( ${filename} ):or(
	${filename:length():equals(5)}
)}
```

### 7.12 not

**描述**: `not` 函数返回主题布尔值的否定（反转）。

**Subject Type**: Boolean

**参数**: 无

**返回值类型**: Boolean

**例子**: 可以通过使用 `not` 函数来反转另一个函数的值，如 `${filename:equals('hello.txt'):not()}`，如果文件名不等于"hello.txt"，将返回 `true`，如果文件名是"hello.txt"，将返回 `false` 。

### 7.13 ifElse

**描述**: 如果主题为true，则返回第一个参数值;如果主题为false，则返回第二个参数值。

**主题类型**: Boolean

**参数**:

- *EvaluateIfTrue*: 主题为true时返回的值
- *EvaluateIfFalse*: 主题为false时返回的值

**返回值类型**: String

**例子**:  如果“filename”属性的值为 "a brand new filename.txt"，"nullFilename" 属性的值为null，"bool"属性的值为"true"，则以下表达式将返回以下结果:

| 表达式                                                       | 值                  |
| :----------------------------------------------------------- | ------------------- |
| ${bool:ifElse('a','b')}                                      | a                   |
| ${literal(true):ifElse('a','b')}                             | a                   |
| ${nullFilename:isNull():ifElse('file does not exist', 'located file')} | file does not exist |
| ${nullFilename:ifElse('found', 'not_found')}                 | not_found           |
| ${filename:ifElse('found', 'not_found')}                     | not_found           |
| ${filename:isNull():not():ifElse('found', 'not_found')}      | found               |

## 8.字符串操作

以下函数都以某种方式操作String类型的值。

### 8.1 toUpper

**描述**: 这个函数将主题转换为全大写字符串。换句话说，它用大写字母替换对应小写字母。

**主题类型**: String

**参数**:无

**返回值类型**: String

**例子**:如果“filename”属性为"abc123.txt"，则表达式 `${filename:toUpper()}` 将返回"ABC123.TXT"。

### 8.2 toLower

**描述**: 这个函数将主题转换为全小写的String。换句话说，它用小写字母替换对应大写字母。

**主题类型**: String

**参数**: 无

**返回值类型**: String

**例子**:如果“filename”属性为"ABC123”.TXT"，则表达式 `${filename:toLower()}` 将返回"abc123.txt"。

### 8.3 trim

**描述**: `trim` 函数将从其主题中删除任何前导或尾随空格。

**主题类型**: String

**参数**: 无

**返回值类型**: String

**例子**:如果属性 `attr` 具有值 " 1 2 3 "，则表达式 `${attr:trim()}` 将返回值 "1 2 3"。

### 8.4 substring

**描述**: 返回主题的一部分内容，基于给定的一个 *起始索引* （*starting index*）和一个可选的 *结束索引* （*ending index*）。如果 *结束索引* 没有提供，它将截取主题的从给定的起始索引直到末尾的部分。

*starting index* 和 *ending index* 是从零开始的。也就是说，第一个字符的位置是 `0` 而不是 `1`。

如果 *starting index* 或 _ending index_不是数字，此函数调用将导致错误。

如果 *starting index* 大于 *ending index*，此函数调用将导致错误。

如果 *starting index* 或者 *ending index* 大于主题的长度或者小于0，则此函数调用将导致错误。

**主题类型**: String

**参数**:

- *starting index*: 要捕获的第一个字符的从0开始的索引(包括)
- *ending index*: 要捕获的最后一个字符的从0开始的索引(不包括)

**返回值类型**: String

**例子**:

如果我们有一个名为“filename”的属性，其值为"a brand new filename.txt",然后以下表达式将返回以下值:

| 表达式                                                 | 值                     |
| ------------------------------------------------------ | ---------------------- |
| ${filename:substring(0,1)}                             | a                      |
| ${filename:substring(2)}                               | brand new filename.txt |
| ${filename:substring(12)}                              | filename.txt           |
| ${filename:substring( ${filename:length():minus(2)} )} | xt                     |

### 8.5 substringBefore

**描述**: 返回主题的一部分内容，从主题的第一个字符开始，以第一次出现参数之前的字符结束。如果主题中不包含参数，则将返回整个主题。

**主题类型**: String

**参数**:

- *value*: 主题中要搜索的字符串

**返回值类型**: String

**例子**:如果“filename”属性的值为 "a brand new filename.txt"，以下表达式将产生以下值:

| 表达式                                 | 值                       |
| -------------------------------------- | ------------------------ |
| ${filename:substringBefore('.')}       | a brand new filename     |
| ${filename:substringBefore(' ')}       | a                        |
| ${filename:substringBefore(' n')}      | a brand                  |
| ${filename:substringBefore('missing')} | a brand new filename.txt |

### 8.6 substringBeforeLast

**描述**: 返回主题的一部分内容，从主题的第一个字符开始，以紧接在最后一个参数出现之前的字符结束。如果主题中不包含参数，则将返回整个主题。

**主题类型**: String

**参数**:

- *value*: 主题中要搜索的字符串

**返回值类型**: String

**例子**:如果“filename”属性的值为 "a brand new filename.txt",以下表达式将产生以下值:

| 表达式                                     | 值                       |
| ------------------------------------------ | ------------------------ |
| ${filename:substringBeforeLast('.')}       | a brand new filename     |
| ${filename:substringBeforeLast(' ')}       | a brand new              |
| ${filename:substringBeforeLast(' n')}      | a brand                  |
| ${filename:substringBeforeLast('missing')} | a brand new filename.txt |

### 8.7 substringAfter

**描述**: 返回主题的一部分内容，从第一次出现参数后的字符开始，一直到主题的末尾。如果主题中不包含参数，则将返回整个主题。

**主题类型**: String

**参数**:

- *value*: 主题中要搜索的字符串

**返回值类型**: String

**例子**:如果“filename”属性的值为"a brand new filename.txt"，以下表达式将产生以下值:

| 表达式                                | 值                       |
| ------------------------------------- | ------------------------ |
| ${filename:substringAfter('.')}       | txt                      |
| ${filename:substringAfter(' ')}       | brand new filename.txt   |
| ${filename:substringAfter(' n')}      | ew filename.txt          |
| ${filename:substringAfter('missing')} | a brand new filename.txt |

### 8.8 substringAfterLast

**描述**: 返回主题的一部分内容，从最后一次出现参数后的字符开始，一直延伸到主题的末尾。如果主题中不包括参数，则将返回整个主题。

**主题类型**: String

**参数**:

- *value*: 主题中要搜索的字符串

**返回值类型**: String

**例子**:如果“filename”属性的值为"a brand new filename.txt"。以下表达式将产生以下值:

| 表达式                                    | 值                       |
| ----------------------------------------- | ------------------------ |
| ${filename:substringAfterLast('.')}       | txt                      |
| ${filename:substringAfterLast(' ')}       | filename.txt             |
| ${filename:substringAfterLast(' n')}      | ew filename.txt          |
| ${filename:substringAfterLast('missing')} | a brand new filename.txt |

### 8.9 getDelimitedField

**描述**: 将主题解析为分隔的文本行，并仅从该分隔文本返回单个字段。

**主题类型**: String

**参数**:

- *index* : 要返回的字段的索引。值为1将返回第一个字段，值为2将返回第二个字段，依此类推。
- *delimiter* : 可选参数，提供用作字段分隔符的字符。如果未指定，将使用逗号。该值必须正好为1个字符。
- *quoteChar* : 可选参数，提供可用于引用值的字符，以便可以在单个字段中使用分隔符。如果未指定，将使用双引号（"）。该值必须正好为1个字符。
- *escapeChar* : 可选参数，提供可用于转义字段中的引号字符或分隔符的字符。如果未指定，则使用反斜杠（\）。该值必须正好为1个字符。
- *stripChars* : 可选参数，指定是否应去掉引号字符和转义字符。例如，如果我们有一个字段值"1, 2, 3"并且该值为true，我们将得到该值 `1, 2, 3`，但如果该值为false，我们将获得 `"1, 2, 3"` 带引号的值。默认值为false。该值必须为 `true` 或 `false`。

**返回值类型**: String

**例子**: 如果“line”属性包含值 *"Jacobson, John", 32, Mr.* 并且“altLine”属性包含值 *Jacobson, John|32|Mr.* ，那么以下表达式将产生以下值：

| 表达式                                             | 值               |
| -------------------------------------------------- | ---------------- |
| ${line:getDelimitedField(2)}                       | \_(space)\_32    |
| ${line:getDelimitedField(2):trim()}                | 32               |
| ${line:getDelimitedField(1)}                       | "Jacobson, John" |
| ${line:getDelimitedField(1, ',', '"', '\\', true)} | Jacobson, John   |

### 8.10 append

**描述**: `append` 函数返回将参数追加到主题的值的结果。如果主题为null，则返回参数本身。

**主题类型**: String

**参数**:

- *value*: 要追加到主题末尾的字符串

**返回值类型**: String

**例子**:如果“filename”属性的值为"a brand new filename.txt"，表达式 `${filename:append('.gz')}` 将返回 "a brand new filename.txt.gz"。

### 8.11 prepend

**描述**: `prepend` 函数返回将参数前置到主题的值的结果。如果主题为null，则返回参数本身。

**主题类型**: String

**参数**:

- *value*: 要添加到主题开头的字符串

**返回值类型**: String

**例子**:如果“filename”属性的值为“filename”.txt"，表达式 `${filename:prepend('a brand new ')}` 将返回"a brand new filename.txt"。

### 8.12 replace

**描述**: 替换 **所有** 在主题中出现一个带有另一个String的文字字符串。

**主题类型**: String

**参数**:

- *Search String*: 主题中要查找的字符串
- *Replacement*: 要被 *Search String* 替换的值

**返回值类型**: String

**例子**:如果“filename”属性的值为"a brand new filename.txt"，以下表达式将提供以下结果:

| 表达式                                    | 值                         |
| ----------------------------------------- | -------------------------- |
| `${filename:replace('.', '_')}`           | `a brand new filename_txt` |
| `${filename:replace(' ', '.')}`           | `a.brand.new.filename.txt` |
| `${filename:replace('XYZ', 'ZZZ')}`       | `a brand new filename.txt` |
| `${filename:replace('filename', 'book')}` | `a brand new book.txt`     |

### 8.13 replaceFirst

**描述**: 替换 **首次** 在主题中出现的一个文字字符串或正则表达式的匹配。

**主题类型**: String

**参数**:

- *Search String*: 主题中要查找的字符串(文字或正则表达式模式)
- *Replacement*: 要被 *Search String* 替换的值

**返回值类型**: String

**例子**:如果“filename”属性的值为"a brand new filename.txt"，然后以下 表达式将提供以下结果:

| 表达式                                      | 值                           |
| ------------------------------------------- | ---------------------------- |
| `${filename:replaceFirst('a', 'the')}`      | `the brand new filename.txt` |
| `${filename:replaceFirst('[br]', 'g')}`     | `a grand new filename.txt`   |
| `${filename:replaceFirst('XYZ', 'ZZZ')}`    | `a brand new filename.txt`   |
| `${filename:replaceFirst('\w{8}', 'book')}` | `a brand new book.txt`       |

### 8.14 replaceAll

**描述**: `replaceAll` 函数接受两个String参数:文字字符串或正则表达式(NiFi使用Java模式语法)和替换字符串。返回值是将替换字符串替换为主题中与Regular Expression匹配的所有模式的结果。

**主题类型**: String

**参数**:

- *Regex*: 正则表达式(在Java语法中)在主题中匹配
- *Replacement*: 用于替换主题中匹配项的值。如果 *regular expression* 参数使用捕获组，允许逆向引用 *replacement*。

**返回值类型**: String

**例子**:如果“filename”属性的值为"a brand new filename.txt"，以下表达式将提供以下结果:

| 表达式                                                 | 值                            |
| ------------------------------------------------------ | ----------------------------- |
| `${filename:replaceAll('\..*', '')}`                   | `a brand new filename`        |
| `${filename:replaceAll('a brand (new)', '$1')}`        | `new filename.txt`            |
| `${filename:replaceAll('XYZ', 'ZZZ')}`                 | `a brand new filename.txt`    |
| `${filename:replaceAll('brand (new)', 'somewhat $1')}` | `a somewhat new filename.txt` |

### 8.15 padLeft

**描述**: `padLeft`函数将给定的填充字符(如果未提供任何内容，默认为‘_’)添加到字符串左侧，直到字符串达到给定的长度。

如果字符串的长度已经等于或大于给定的长度，或者填充字符串为NULL且给定的长度为负或大于Integer.MAX_VALUE，则返回原样的参数。如果参数字符串不是有效属性，则返回NULL。

**主题类型**: String

**参数**:

- *DesiredLength* : 指定最终返回字符串长度。
- *PaddingString* : 要填充的字符。如果没有提供PaddingString，则使用"_"。如果填充字符串不是实际填充大小的精确倍数，它将被修剪以适合所需要的长度。

**返回值类型**: String

**例子**:如果“greetings”属性的值为"hello"，以下表达式将提供以下结果:

| 表达式                                               | 值           |
| ---------------------------------------------------- | ------------ |
| `${greetings:padLeft(10)}`                           | `_____hello` |
| `${greetings:padLeft(10, '@')}`                      | `@@@@@hello` |
| `${greetings:padLeft(10, 'xy')}`                     | `xyxyxhello` |
| `${greetings:padLeft(10, 'aVeryLongPaddingString')}` | `aVeryhello` |

### 8.16 padRight

**描述**: `padRight`函数将给定的填充字符(如果未提供任何内容，默认为‘_’)添加到字符串右侧，直到字符串达到给定的长度。

如果字符串的长度已经等于或大于给定的长度，或者填充字符串为NULL且给定的长度为负或大于Integer.MAX_VALUE，则返回原样的参数。如果参数字符串不是有效属性，则返回NULL。

**主题类型**: String

**参数**:

- *DesiredLength* : 指定最终返回字符串长度。
- *PaddingString* : 要填充的字符。如果没有提供PaddingString，则使用"_"。如果填充字符串不是实际填充大小的精确倍数，它将被修剪以适合所需要的长度。

**返回值类型**: String

**例子**:如果“greetings”属性的值为"hello"，以下表达式将提供以下结果:

| 表达式                                               | 值           |
| ---------------------------------------------------- | ------------ |
| `${greetings:padRight(10)}`                          | `hello_____` |
| `${greetings:padRight(10, '@')}`                     | `hello@@@@@` |
| `${greetings:padRight(10, 'xy')}`                    | `helloxyxyx` |
| `${greetings:padLeft(10, 'aVeryLongPaddingString')}` | `helloaVery` |

### 8.17 replaceNull

**描述**: 如果主题为null，则函数返回参数，否则，返回主题。

**主题类型**: 任意

**参数**:

- *Replacement*: 主题为null时返回的值。

**返回值类型**: [.returnType]如果主题不为null，则为主题的类型; 否则，则为参数的类型#

**例子**:如果属性“filename”的值为 "a brand new filename.txt" 和属性"hello"不存在，表达式 `${filename:replaceNull('abc')}` 将返回"a brand new filename.txt"，而 `${hello:replaceNull('abc')}` 将返回"abc”。

### 8.18 replaceEmpty

**描述**: 如果主题为null或者仅包含空格(新行，回车符，制表符，空格)，则函数返回参数。否则，返回主题。

**主题类型**: String

**参数**:

- *Replacement*: 如果主题为null或为空，则返回的值。

**返回值类型**: String

**例子**:如果属性“filename”的值为"a brand new filename.txt"，”hello"的值为 " "，表达式 `${filename:replaceEmpty('abc')}` 将返回"a brand new filename.txt"，而 `${hello:replaceEmpty('abc')}` 将返回"abc”。

### 8.19 length

**描述**: 返回主题的长度

**主题类型**: String

**参数**: 无

**返回值类型**: Number

**例子**:如果属性“filename”的值为"a brand new filename.txt"且属性"hello"不存在，表达式 `${filename:length()}` 将返回24. `${hello:length()}` 将返回0.

### 8.20 evaluateELString

**描述**: 此函数用于计算变量值内的表达式。

**主题类型**: String

**参数**: 无

**返回值类型**: String

**例子**: 如果一个名为“query”的变量的值为“SELECT FROM TABLE WHERE ID=\${id}”，一个名”id”的属性值为20，那么表达式 ${query:evaluatelstring()} 将返回 “SELECT * FROM TABLE WHERE ID = 20”

### 8.21 repeat

**描述**: 返回一个字符串，该字符串是主题在最小重复次数和最大重复次数之间随机重复的次数。如果未提供最大重复次数，它将返回恰好重复最小重复次数的主题。

min repeats和max repeats必须是正数，max repeats大于或等于min repeat。

如果min repeats或max repeats都不是一个数字，这个函数调用将导致一个错误。

**主题类型**: String

**参数**: 

+ *min repeats* : 主题重复的最小次数(含)，或未提供最大重复次数时主题重复的确切次数。
+ *max repeats* : 主题重复的最大次数(含)。

**返回值类型**: String

**例子**:如果属性“str”的值为"abc"，以下表达式将提供以下结果:

| 表达式                           | 值                                      |
| -------------------------------- | --------------------------------------- |
| ${str:repeat(1)}                 | abc                                     |
| `${str:repeat(2)}`               | `abcabc`                                |
| `${str:repeat(1,2)}`             | `abc` or `abcabc` (随机)                |
| ${str:repeat( ${str:length()} )} | `abc` or `abcabc` or `abcabcabc` (随机) |

## 9.编码/解码功能

以下函数都将根据给定数据格式的规则对字符串进行编码。

### 9.1 escapeJson

**描述**: 该函数通过使用Json String规则转义要插入JSON文档的主题字符串中的字符。该函数正确地转义引号和控制字符(制表符，反斜杠，cr，ff等)。)

**主题类型**: String

**参数**: 无

**返回值类型**: String

**例子**:如果"message"属性是 'He didn’t say, "Stop!"' ，表达式 `${message:escapeJson()}` 将返回 'He didn’t say, \"Stop!\"'。

### 9.2 escapeXml

**描述**: 该函数通过使用XML实体转义要插入到XML文档中的主题字符串中的字符。该函数正确地转义引号，撇号，＆符号，<，>和控制字符。

**主题类型**: String

**参数**: 无

**返回值类型**: String

**例子**:如果"message"属性是 '"bread" & "butter"'，则表达式 `${message:escapeXml()}` 将返回 '&quot;bread&quot; &amp; &quot;butter&quot;'

### 9.3 escapeCsv

**描述**: 该函数通过使用RFC 4180中的规则转义要插入CSV文档的主题字符串中的字符。该函数正确地转义引号并在需要的时候用引号括起字符串。

**主题类型**: String

**参数**: 无

**返回值类型**: String

**例子**:如果"message"属性是 'But finally, she left'，表达式 `${message:escapeCsv()}` 将返回'"But finally, she left"'。

### 9.4 escapeHtml3

**描述**: 该函数通过使用HTML实体转义要插入HTML文档的主题字符串中的字符。仅支持HTML 3.0 实体。

**主题类型**: String

**参数**: 无

**返回值类型**: String

**例子**:如果"message"属性是 '"bread" & "butter"'，则表达式 `${message:escapeHtml3()}` 将返回 '&quot;bread&quot; &amp; &quot;butter&quot;'。

### 9.5 escapeHtml4

**描述**: 该函数通过使用HTML实体转义要插入HTML文档的主题字符串中的字符。支持所有已知的HTML 4.0个实体。

**主题类型**: String

**参数**: 无

**返回值类型**: String

**例子**:如果"message"属性是 '"bread" & "butter"'，则表达式 `${message:escapeHtml4()}` 将返回'&quot;bread&quot; &amp; &quot;butter&quot;'。

### 9.6 unescapeJson

**描述**: 该函数反转义在String中找到的任何Json文字。

**主题类型**: String

**参数**: 无

**返回值类型**: String

**例子**:如果"message"属性是 'He didn’t say, \"Stop!\"', 则表达式 `${message:unescapeJson()}` 将返回 'He didn’t say, "Stop!"'

### 9.7 unescapeXml

**描述**: 该函数将包含XML实体转义的字符串转义为包含与转义对应的实际Unicode字符的字符串。仅支持五个基本XML实体(gt，lt，quot，amp，apos)。

**主题类型**: String

**参数**: 无

**返回值类型**: String

**例子**:如果"message"属性为'&quot;bread&quot; &amp; &quot;butter&quot;'，则表达 `${message:unescapeXml()}` 将返回 '"bread" & "butter"' 。

### 9.8 unescapeCsv

**描述**: 该函数根据RFC 4180的规则从CSV文档中反转义字符串。

**主题类型**: String

**参数**: 无

**返回值类型**: String

**例子**:如果"message"属性是 '"But finally, she left"'，则表达式 `${message:unescapeCsv()}` 将返回 'But finally, she left'。

### 9.9 unescapeHtml3

**描述**: 该函数将包含HTML 3实体的字符串转义为包含与转义对应的实际Unicode字符的字符串。仅支持HTML 3.0实体。

**主题类型**: String

**参数**: 无

**返回值类型**: String

**例子**:如果"message"属性为'&quot;bread&quot; &amp; &quot;butter&quot;'，则表达式 `${message:unescapeHtml3()}` 将返回'"bread" & "butter"'。

### 9.10 unescapeHtml4

**描述**: 该函数将包含HTML 4实体的字符串转义为包含与转义对应的实际Unicode字符的字符串。支持所有已知的HTML 4.0个实体。

**主题类型**: String

**参数**: 无

**返回值类型**: String

**例子**:如果"message"属性为 '&quot;bread&quot; &amp; &quot;butter&quot;'，则表达式 `${message:unescapeHtml4()}` 将返回'"bread" & "butter"'。

### 9.11 urlEncode

**描述**: 返回主题的URL友好（URL-friendly ）版本。例如，当使用属性值指示网站的URL时，这很有用。

**主题类型**: String

**参数**: 无

**返回值类型**: String

**例子**:可以使用表达式 `${url:urlEncode()}` 对名为"url"的属性进行URL编码。如果"url"属性的值为"https://nifi.apache.org/some value with spaces"，此表达式将返回"https://nifi.apache.org%2Fsome+value+with+spaces"

### 9.12 urlDecode

**描述**: 将对象的URL友好版本转换为人类可读的形式。

**主题类型**: String

**参数**: 无

**返回值类型**: String

**例子**:如果有一个名为"url"的做过URL-Encoded的属性，其值为"https://nifi.apache.org/some%20value%20with%20spaces" 或 "https%3A%2F%2Fnifi.apache.org%2Fsome+value+with+spaces"，则表达式 `${url:urlDecode()}` 将返回"https://nifi.apache.org/some value with spaces"。

### 9.13 base64Encode

**描述**: 返回Base64编码的字符串。这对于能够将二进制数据传输为ascii非常有用。

**主题类型**: String

**参数**: 无

**返回值类型**: String

**例子**:我们可以使用表达式 `${payload:base64Encode()}` Base64编码名为"payload"的属性，如果属性有效的值为"admin:admin”，则表达式 `${payload:base64Encode()}` 将返回"YWRtaW46YWRtaW4 ="。

### 9.14 base64Decode

**描述**: 解除给定字符串的Base64编码。

**主题类型**: String

**参数**: 无

**返回值类型**: String

**例子**:如果我们有一个名为"payload"的做过Base64-Encoded的属性，其值为"YWRtaW46YWRtaW4 ="，那么表达式 `${payload:base64Decode()}` 将返回"admin:admin”。

### 9.15 UUID3

**描述**: 返回一个基于类型3 (MD5哈希)命名空间名称的UUID。参数必须是一个有效的UUID。

**主题类型**: String

**参数**: 

+ *namespace* : 命名空间UUID标识符

**返回值类型**: String

**例子**: 如果我们有一个名为"attr"的属性值为"string value"，那么表达式${attr:UUID3('b9e81de3-7047-4b5e-a822-8fff5b49f808')}将返回"bf0ea246-a177-3300-bd7e-d4c9e973dc6f"。

一个空参数或一个具有无效UUID的参数值将导致一个异常公告。

另请参见：[UUID()](#14.3 UUID)

### 9.16 UUID5

**描述**: 返回一个基于类型5(SHA-1哈希)命名空间名称的UUID。参数必须是一个有效的UUID。

**主题类型**: String

**参数**: 

+ *namespace* : 命名空间UUID标识符

**返回值类型**: String

**例子**: 如果我们有一个名为"attr"的属性值为"string value"，那么表达式${attr:UUID5('245b55a8-397d-4480-a41e-16603c8cf9ad')}将返回"4d111477-5100-5f2d-ae79-b38bbe15aa78"。

一个空参数或一个具有无效UUID的参数值将导致一个异常公告。

另请参见：[UUID()](#14.3 UUID)

### 9.17 hash

**描述**: 使用提供的哈希算法返回十六进制编码的字符串。这可用于生成唯一密钥。

**主题类型**: String

**参数**: 

+ *algorithm* : 哈希算法。支持 [SHA-384, SHA-224, SHA-256, MD2, SHA, SHA-512, MD5] 之一。警告：不应将 MD2、MD5 和 SHA (SHA-1) 视为加密安全 (https://csrc.nist.gov/projects/hash-functions/nist-policy-on-hash-functions).

**返回值类型**: String

**例子**: 如果属性`payload`的值为“string value”，那么表达式${payload:hash('SHA-256')}将返回“9B6A1A9167A5CAF3F594813FAA89E0EC0DE89E12BEF55327442E60DCC0E8C9B”。

## 10.搜索

以下函数都用于搜索其主题以获取某些值。

### 10.1 startsWith

**描述**: 如果主题以作为参数提供的字符串开头，返回 `true`。否则，返回 `false` 。

**主题类型**: String

**参数**:

- *value*: 要搜索的值

**返回值类型**: Boolean

**例子**:如果“filename”属性的值为"a brand new filename.txt"，则表达式 `${filename:startsWith('a brand')}` 将返回 `true`。`${filename:startsWith('A BRAND')}` 返回 `false`。 `${filename:toUpper():startsWith('A BRAND')}` 返回 `true`。

### 10.2 endsWith

**描述**: 如果主题以提供作为参数的字符串结束，返回 `true`。否则，返回 `false`。

**主题类型**: String

**参数**:

- *value*: 要搜索的值

**返回值类型**: Boolean

**例子**:如果“filename”属性的值为"a brand new filename.txt"，则表达式 `${filename:endsWith('txt')}` 将返回 `true`。 `${filename:endsWith('TXT')}` 返回 `false`。`${filename:toUpper():endsWith('TXT')}` 返回 `true`。

### 10.3 contains

**描述**: 如果主题中任何位置包含传入的参数值则返回 `true` 。

**主题类型**: String

**参数**:

- *value*: 要搜索的值

**返回值类型**: Boolean

**例子**:如果“filename”属性的值为"a brand new filename.txt"，则表达式 `${filename:contains('new')}` 将返回 `true`。`${filename:contains('NEW')}` 返回 `false`。`${filename:toUpper():contains('NEW')}` 返回 `true`。

### 10.4 in

**描述**: 如果主题匹配参数的其中一个则返回 `true` 。

**主题类型**: String

**参数**:

- *value1*: [.argDesc]#First匹配值#First
- *valueN*: [.argDesc]#Nth匹配值#N

**返回值类型**: Boolean

**例子**:如果"myEnum”属性的值为"JOHN”，则表达式 `${myEnum:in("PAUL", "JOHN", "MIKE")}` 将返回 `true`。 `${myEnum:in("RED", "GREEN", "BLUE")}` 返回 `false`。

### 10.5 find

**描述**: 如果主题包含与参数提供的正则表达式匹配的任何字符序列则返回 `true`。

**主题类型**: String

**参数**:

- *Regex*: 正则表达式(在Java Pattern语法中)与主题匹配

**返回值类型**: Boolean

**例子**:

如果“filename”属性的值为"a brand new filename.txt"，则表达式将返回以下结果:

| 表达式                                  | 值      |
| --------------------------------------- | ------- |
| `${filename:find('a [Bb]rand [Nn]ew')}` | `true`  |
| `${filename:find('Brand.*')}`           | `false` |
| `${filename:find('brand')}`             | `true`  |

### 10.6 matches

**描述**: 如果主题与参数提供的正则表达式完全匹配则返回 `true` 。

**主题类型**: String

**参数**:

- *Regex*: 正则表达式(在Java Pattern语法中)与主题匹配

**返回值类型**: Boolean

**例子**:

如果“filename”属性的值为"a brand new filename.txt"，则以下表达式将返回以下结果:

| 表达式                             | 值      |
| ---------------------------------- | ------- |
| `${filename:matches('a.*txt')}`    | `true`  |
| `${filename:matches('brand')}`     | `false` |
| `${filename:matches('.+brand.+')}` | `true`  |

### 10.7 indexOf

**描述**: 返回主题中与参数匹配的第一个字符的索引。如果在主题中多次匹配到参数，则返回的值是*第一次*匹配的位置。如果在主题中找不到参数，则返回 `-1`。 索引是从零开始的，这意味着如果在主题的开头找到搜索字符串，则返回的值将是 `0` 而不是 `1`。

**主题类型**: String

**参数**:

- *value*: 在主题中搜索的值

**返回值类型**: Number

**例子**:如果“filename”属性的值为"a brand new filename.txt"，则以下表达式将返回以下结果:

| 表达式                          | 值   |
| ------------------------------- | ---- |
| `${filename:indexOf('a.*txt')}` | `-1` |
| `${filename:indexOf('.')}`      | `20` |
| `${filename:indexOf('a')}`      | `0`  |
| `${filename:indexOf(' ')}`      | `1`  |

### 10.8 lastIndexOf

**描述**: 返回主题中与参数匹配的第一个字符的索引。如果在Subject中多次找到参数，则返回的值是*最后一次* 匹配的位置。如果在主题中找不到参数，则返回 `-1`. 索引是从零开始的，这意味着如果在主题的开头找到搜索字符串，则返回的值将是 `0`而不是 `1`。

**主题类型**: String

**参数**:

- *value*: 在主题中搜索的值

**返回值类型**: Number

**例子**:如果“filename”属性的值为"a brand new filename.txt"，则以下表达式将返回以下结果:

| 表达式                              | 值   |
| ----------------------------------- | ---- |
| `${filename:lastIndexOf('a.*txt')}` | `-1` |
| `${filename:lastIndexOf('.')}`      | `20` |
| `${filename:lastIndexOf('a')}`      | `17` |
| `${filename:lastIndexOf(' ')}`      | `11` |

### 10.9 jsonPath

**描述**: `jsonPath` 函数通过将主题视为JSON并应用JSON路径表达式来生成字符串。如果主题不包含有效的JSON， *jsonPath* 无效，或者主题中不存在路径，都将生成空字符串。如果评估结果为标量值，则生成标量值的字符串表示。否则，将生成JSON结果的字符串。当 `[0]` 作为标量时，长度为1的JSON数组是特殊情况，会生成一个代表 `[0]` 的字符串。

**主题类型**: String

**参数**: *jsonPath*: 用于主题的JSON路径表达式。

**返回值类型**: String

**例子**:如果"myJson"属性是：

```
{
  "firstName": "John",
  "lastName": "Smith",
  "isAlive": true,
  "age": 25,
  "address": {
    "streetAddress": "21 2nd Street",
    "city": "New York",
    "state": "NY",
    "postalCode": "10021-3100"
  },
  "phoneNumbers": [
    {
      "type": "home",
      "number": "212 555-1234"
    },
    {
      "type": "office",
      "number": "646 555-4567"
    }
  ],
  "children": [],
  "spouse": null
}
```

| 表达式                                                       | 值                                                           |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| `${myJson:jsonPath('$.firstName')}`                          | `John`                                                       |
| `${myJson:jsonPath('$.address.postalCode')}`                 | `10021-3100`                                                 |
| `${myJson:jsonPath('$.phoneNumbers[?(@.type=="home")].number')}`1 | `212 555-1234`                                               |
| `${myJson:jsonPath('$.phoneNumbers')}`                       | `[{"type":"home","number":"212 555-1234"},{"type":"office","number":"646 555-4567"}]` |
| `${myJson:jsonPath('$.missing-path')}`                       | *empty*                                                      |
| `${myJson:jsonPath('$.bad-json-path..')}`                    | *exception bulletin*                                         |

空主题值或具有无效JSON文档的主题值将导致异常公告。

### 10.10 jsonPathDelete

**描述**: 该`jsonPathDelete`函数从主题 JSON 中删除指定的 JsonPath，并返回更新后的 JSON 的字符串。

**主题类型**: String

**参数**: *jsonPath*: 用于主题的JSON路径表达式。

**返回值类型**: String

**例子**:如果"myJson"属性是：

```
{
  "firstName": "John",
  "lastName": "Smith",
  "isAlive": true,
  "age": 25,
  "address": {
    "streetAddress": "21 2nd Street",
    "city": "New York",
    "state": "NY",
    "postalCode": "10021-3100"
  },
  "phoneNumbers": [
    {
      "type": "home",
      "number": "212 555-1234"
    },
    {
      "type": "office",
      "number": "646 555-4567"
    }
  ],
  "children": [],
  "spouse": null
}
```

| 表达式                                       | 值                                                           |
| -------------------------------------------- | ------------------------------------------------------------ |
| `${myJson:jsonPathDelete('$.firstName')}`    | `{"lastName":"Smith","age":25,"address":{"streetAddress":"21 2nd Street","city":"New York","state":"NY","postalCode":"10021-3100"},"phoneNumbers":[{"type":"home","number":"212 555-1234"},{"type":"office","number":"646 555-4567"}]}` |
| `${myJson:jsonPathDelete('$.missing-path')}` | 返回原始 JSON 对象                                           |

空主题值或具有无效JSON文档的主题值将导致异常公告。

### 10.11 jsonPathAdd

**描述**: 该`jsonPathAdd`函数将指定值添加到主题 JSON 上指定 JsonPath 的数组中，并返回更新后的 JSON 字符串。 如果表达式目标元素是非数组，则返回一个空字符串并记录一个指示错误的异常。如果表达式目标元素路径不在 JSON 中，则操作返回原始 JSON，不做任何修改。

**主题类型**: String

**参数**: 

+ *jsonPath*: 用于主题的JSON路径表达式。
+ *value* : 要在主题的指定路径处添加到数组中的value。

**返回值类型**: String

**例子**:如果"myJson"属性是：

```
{
     "firstName": "John",
     "lastName": "Smith",
     "age": 25,
     "voter" : true,
     "height" : 6.1,
     "address" : {
         "streetAddress": "21 2nd Street",
         "city": "New York",
         "state": "NY",
         "postalCode": "10021-3100"
     },
     "phoneNumbers": [
         {
             "type": "home",
             "number": "212 555-1234"
         },
         {
             "type": "office",
             "number": "646 555-4567"
         }
     ],
     "nicknames" : []
 }
```

| 表达式                                            | 值                                                           |
| ------------------------------------------------- | ------------------------------------------------------------ |
| `${myJson:jsonPathAdd('$.nicknames', 'Jimmy')}`   | `{"firstName":"James", lastName":"Smith", "age":25, "voter":true, "height":6.1, "address":{"streetAddress":"21 2nd Street", "city":"New York", "state":"NY", "postalCode":"10021-3100"}, "phoneNumbers":[{"type":"home", "number":"212 555-1234"}, {"type":"office", "number":"646 555-4567"}],"nicknames":["Jimmy"]}` |
| `${myJson:jsonPathAdd('$.missingpath', 'Jimmy')}` | Returns original JSON document with no modifications         |
| `${myJson:jsonPathAdd('$.firstName', 'Jimmy')}`   | *empty*                                                      |

空主题值或具有无效JSON文档的主题值将导致异常公告。

### 10.12 jsonPathSet

**描述**: 该`jsonPathSet`函数在主题 JSON 上设置指定 JsonPath 的值，并返回更新后的 JSON 的字符串形式。

**主题类型**: String

**参数**: 

+ *jsonPath*: 用于主题的JSON路径表达式。
+ *value* : 要在主题的指定路径上设置的value。

**返回值类型**: String

**例子**:如果"myJson"属性是：

```
{
     "firstName": "John",
     "lastName": "Smith",
     "age": 25,
     "voter" : true,
     "height" : 6.1,
     "address" : {
         "streetAddress": "21 2nd Street",
         "city": "New York",
         "state": "NY",
         "postalCode": "10021-3100"
     },
     "phoneNumbers": [
         {
             "type": "home",
             "number": "212 555-1234"
         },
         {
             "type": "office",
             "number": "646 555-4567"
         }
     ],
     "nicknames" : []
 }
```

| 表达式                                            | 值                                                           |
| ------------------------------------------------- | ------------------------------------------------------------ |
| `${myJson:jsonPathSet('$.firstName', 'James')}`   | `{"firstName":"James", lastName":"Smith", "age":25, "voter":true, "height":6.1, "address":{"streetAddress":"21 2nd Street", "city":"New York", "state":"NY", "postalCode":"10021-3100"}, "phoneNumbers":[{"type":"home", "number":"212 555-1234"}, {"type":"office", "number":"646 555-4567"}]}` |
| `${myJson:jsonPathSet('$.missingpath', 'James')}` | 返回原始JSON对象                                             |

空主题值或具有无效JSON文档的主题值将导致异常公告。

### 10.13 jsonPathPut

**描述**: 该`jsonPathPut`函数将在原 JSON指定 JsonPath 处新增 key 和 value，并返回更新后的 JSON 字符串。

**主题类型**: String

**参数**: 

+ *jsonPath*: 用于主题的JSON路径表达式。
+ *value* : 要在主题的指定路径上设置的value.
+ *key* : 要在主题上指定路径上设置的具有关联值的key.

**返回值类型**: String

**例子**:如果"myJson"属性是：

```
{
     "firstName": "John",
     "lastName": "Smith",
     "age": 25,
     "voter" : true,
     "height" : 6.1,
     "address" : {
         "streetAddress": "21 2nd Street",
         "city": "New York",
         "state": "NY",
         "postalCode": "10021-3100"
     },
     "phoneNumbers": [
         {
             "type": "home",
             "number": "212 555-1234"
         },
         {
             "type": "office",
             "number": "646 555-4567"
         }
     ],
     "nicknames" : []
 }
```

| 表达式                                                       | 值                                                           |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| `${myJson:jsonPath('$.firstName')}`                          | `John`                                                       |
| `${myJson:jsonPath('$.address.postalCode')}`                 | `10021-3100`                                                 |
| `${myJson:jsonPath('$.phoneNumbers[?(@.type=="home")].number')}`1 | `212 555-1234`                                               |
| `${myJson:jsonPath('$.phoneNumbers')}`                       | `[{"type":"home","number":"212 555-1234"},{"type":"office","number":"646 555-4567"}]` |
| `${myJson:jsonPath('$.missing-path')}`                       | *empty*                                                      |
| `${myJson:jsonPath('$.bad-json-path..')}`                    | *exception bulletin*                                         |

空主题值或具有无效JSON文档的主题值将导致异常公告。

## 11.数学运算和数值处理

对于那些支持Decimal和Number(整数)类型的函数，返回值类型取决于输入类型。如果主题或参数是十进制，则结果将是十进制。如果两个值均为Numbers，则结果为Number。这样适用于除法。这是为了保持向后兼容性并且不产生舍入错误。

### 11.1 plus

**描述**: 向主题添加数值。如果参数或主题无法强制转换为数字，则返回 `null`。

**主题类型**: Number或Decimal或BigDecimal

**参数**:

- *Operand*: 要添加到主题的值

**返回值类型**: Number或Decimal或BigDecimal(取决于输入类型)

**例子**:如果"fileSize"属性的值为100，则表达式 `${fileSize:plus(1000)}` 将返回值 `1100`.

### 11.2 minus

**描述**: 从主题中减去数值。

**主题类型**: Number或Decimal或BigDecimal

**参数**:

- *Operand*: 要从主题中减去的值

**返回值类型**: Number或Decimal或BigDecimal(取决于输入类型)

**例子**:如果"fileSize"属性的值为100，则表达式 `${fileSize:minus(100)}` 将返回值 `0`。

### 11.3 multiply

**描述**: 返回主题与数值的乘积。

**主题类型**: Number或Decimal

**参数**:

- *Operand*: 对多个主题的值

**返回值类型**: Number或Decimal或BigDecimal(取决于输入类型)

**例子**:如果"fileSize"属性的值为100，则表达式 `${fileSize:multiply(1024)}` 将返回值 `102400`。

### 11.4 divide

**描述**: 除以一个数值并返回结果。

**主题类型**: Number或Decimal或BigDecimal

**参数**:

- *Operand*: 将主题除以的数值
- scale: 指定返回值的精度,当输入数据为BigDecimal时可选使用该参数
- roundingMode: 指定能够丢弃精度的数值运算的舍入行为,每个舍入模式指示如何计算舍入结果的最低有效返回数字.当输入数据为BigDecimal时可选使用该参数

**返回值类型**: Number或Decimal或BigDecimal(取决于输入类型)

**例子**:如果"fileSize"属性的值为100，则表达式 `${fileSize:divide(12)}` 将返回值 `8`。 .devide示例

| 表达式                                          | 值         |
| ----------------------------------------------- | ---------- |
| `${31.415926:toBigDecimal():divide(12,1)}`      | `2.617993` |
| `${31.415926:toBigDecimal():divide(12,3,"up")}` | `2.618`    |

### 11.5 mod

**描述**: 通过参数执行对主题的取模。

**主题类型**: Number或Decimal

**参数**:

- *Operand*: 将主题取模的值

**返回值类型**: Number或Decimal(取决于输入类型)

**例子**:如果"fileSize"属性的值为100，则表达式 `${fileSize:mod(12)}` 将返回值 `4`。

### 11.6 toRadix

**描述**: 将主题从10进制转换为不同的进制(或数字基数)。可选的第二个参数可用于指示要使用的最小字符数。如果转换后的值少于此字符数，则该数字将以前导零填充。如果将小数作为主题传递，则首先将其转换为整数然后进行处理。

**主题类型**: Number

**参数**:

- *Desired Base*: 一个介于2和36之间的数字(含)
- *Padding*: 可选参数，指定转换后的输出中的最小字符数

**返回值类型**: String

**例子**:如果"fileSize"属性的值为1024，则以下表达式将产生以下结果:

| 表达式                       | 值                 |
| ---------------------------- | ------------------ |
| `${fileSize:toRadix(10)}`    | `1024`             |
| `${fileSize:toRadix(10, 1)}` | `1024`             |
| `${fileSize:toRadix(10, 8)}` | `00001024`         |
| `${fileSize:toRadix(16)}`    | `400`              |
| `${fileSize:toRadix(16, 8)}` | `00000400`         |
| `${fileSize:toRadix(2)}`     | `10000000000`      |
| `${fileSize:toRadix(2, 16)}` | `0000010000000000` |

### 11.7 fromRadix

**描述**: 将主题从指定的进制(或数字基数)转换为10进制整数。主题将按原样进行转换，无需解释，并且所有字符必须对转换的机制有效。例如，由于"x”是无效的十六进制字符，从十六进制转换“0xFF”将不起作用。如果将小数作为主题传递，则首先将其转换为整数然后进行处理。

**主题类型**: String

**参数**:

- *Subject Base*: 一个介于2和36之间的数字(含)

**返回值类型**: Number

**例子**:如果"fileSize"属性的值为1234A，则以下表达式将产生以下结果:

| 表达式                      | 值       |
| --------------------------- | -------- |
| `${fileSize:fromRadix(11)}` | `17720`  |
| `${fileSize:fromRadix(16)}` | `74570`  |
| `${fileSize:fromRadix(20)}` | `177290` |

### 11.8 random

**描述**: 返回随机整数(0 到 263 - 1)，使用不安全的随机数生成器。

**主题类型**: 无主题

**参数**: 无

**返回值类型**: Number

**例子**: `${random():mod(10):plus(1)}` 返回1到10之间的随机数。

### 11.9 math

**描述**: 高级特性。此表达式仅供高级用户使用。 它利用Java Reflection来运行java.lang.Math静态方法。确切的API将取决于您运行的Java版本。Java 8 API可以在这里找到: https://docs.oracle.com/javase/8/docs/api/java/lang/Math.html
为了运行正确的方法，参数类型必须正确。表达式语言 "Number" (整数)类型被解释为Java中的"long". "Decimal"类型被解释为Java中的"double"。运行所需的方法可能需要调用"toNumber()"或"toDecimal()"，以便将值"转换(cast)"为所需的类型。当级联调用"math()"时，这也很重要，因为返回类型取决于运行的方法。

**主题类型**: Subjectless，Number或Decimal(取决于所需的运行方法)

**参数**: - *Method*: 要运行的Java Math方法的名称 - *Optional Argument*: Optional参数作为方法的第二个参数。

**返回值类型**: Number或Decimal(取决于方法运行)

**例子**:

- ${math("random")} 运行 Math.random()。
- ${literal(2):toDecimal:math("pow", 2.5)} 运行 Math.pow(2D,2.5D)。
- ${literal(64):toDouble():math("cbrt"):toNumber():math("max", 5)} 运行 Math.maxDouble.valueOf(Math.cbrt(64D).longValue(), 5L)。请注意，需要toDecimal()是因为"cbrt"将"double"作为输入，"64"将被解释为long。"toDecimal()"调用是正确调用该方法所必需的。"toNumber()"调用也是必要的，因为"cbrt"返回一个double类型而且"max"方法必须具有相同类型的参数，"5"被解释为long。
- ${literal(5.4):math("scalb", 2)} 执行 Math.scalb(5.4, 2)。这个例子很重要，因为NiFi 表达式将所有整数视为"long"，并且没有"int"的概念. "scalb"接受"int"的第二个参数，并且它不会超载以接受long，所以如果没有特殊的类型处理它就无法运行。在使用"double"和"long"类型的参数找不到Java方法的情况下，"math()" EL函数将尝试查找具有相同名称但参数为"double"和"int"的Java方法。
- ${first:toDecimal():math("pow", ${second:toDecimal()})} 其中属性评估为"first" = 2.5 and "second" = 2。 此示例运行Math.POW(2.5D，2D)。由于EL的动态特性，对toDecimal()的显式调用很重要。 在创建流时，用户不知道表达式语言值是否能够被解释为整数。在没有显式调用"toDecimal"的示例中，"math”函数将尝试运行类型为"double"和"long"(不存在)的Java方法"pow"。

## 12.日期操作

### 12.1 format

**描述**: 根据参数指定的格式将数字格式化为日期/时间。参数必须是有效的Java SimpleDateFormat格式的String。主题是一个数字，表示自1970年1月1日格林尼治标准时间午夜以来的毫秒数。除非在第二个可选参数中指定，否则将使用本地的时区计算。

**主题类型**: Number

**参数**:

- *format*: 在Java SimpleDateFormat语法中使用的格式
- *time zone*: 可选参数，指定要使用的时区(在Java TimeZone语法中)

**返回值类型**: String

**例子**:如果属性"time"的值为"1420058163264"，则以下表达式将产生以下结果:

| 表达式                                                       | 值                         |
| ------------------------------------------------------------ | -------------------------- |
| `${time:format("yyyy/MM/dd HH:mm:ss.SSS’Z'", "GMT")}`        | `2014/12/31 20:36:03.264Z` |
| `${time:format("yyyy/MM/dd HH:mm:ss.SSS’Z'", "America/Los_Angeles")}` | `2014/12/31 12:36:03.264Z` |
| `${time:format("yyyy/MM/dd HH:mm:ss.SSS’Z'", "Asia/Tokyo")}` | `2015/01/01 05:36:03.264Z` |
| `${time:format("yyyy/MM/dd", "GMT")}`                        | `2014/12/31`               |
| `${time:format("HH:mm:ss.SSS’Z'", "GMT")}`                   | `20:36:03.264Z`            |
| `${time:format("yyyy", "GMT")}`                              | `2014`                     |

### 12.2 toDate

**描述**: 根据参数指定的格式将String转换为Date数据类型。参数必须是一个有效的Java SimpleDateFormat语法的String。主题应该是一个根据参数格式化的String。 除非在第二个可选参数中指定，否则将使用本地的时区计算日期。

**主题类型**: String

**参数**:

- *format*: 在Java SimpleDateFormat语法中解析Subject时使用的当前格式。
- *time zone*: Optional参数，用于指定在Java TimeZone语法中解析主题时使用的时区。

**返回值类型**: 日期

**例子**:如果属性"year"的值为"2014"，属性"time"的值为 "2014/12/31 15:36:03.264Z"，则表达式 `${year:toDate('yyyy', 'GMT')}` 将返回一个日期数据类型，其值代表2014年一月一号，午夜，格林威治标准时间（GMT）。表达式 `${time:toDate("yyyy/MM/dd HH:mm:ss.SSS’Z'", "GMT")}` 将返回15:36:03.264 GMT on December 31, 2014。

通常，此函数与[format](#12.1 format)函数结合使用以更改日期/时间的格式。例如，如果属性"date“的值为"12-24-2014"，并且我们想要将格式更改为"2014/12/24"，我们可以通过将两个函数链接在一起来实现: `${date:toDate('MM-dd-yyyy'):format('yyyy/MM/dd')}`.

### 12.3. now

**描述**: 返回当前日期和时间作为Date数据类型对象。

**主题类型**: 无主题

**参数**: 无

**返回值类型**: 日期

**例子**:我们可以使用 `${now()}` 函数获取当前日期和时间。例如，如果当期时间是东部时间2014年12月31日星期三下午3点36分36.123秒， `${now()}` 获取的当前日期显示为 `Wed Dec 31 15:36:03 EST 2014`。

利用[toNumber](#13.2 toNumber)方法， `now` 可以提供当前日期和时间作为1970年1月1日格林尼治标准时间午夜以来的毫秒数。例如，如果不是执行 `${now()}` 在前面的例子中 `${now():toNumber()}` 运行会输出 `1453843201123`。此方法提供毫秒级精度，并提供 操作值的功能.

| 表达式                                            | 值                                                           |
| ------------------------------------------------- | ------------------------------------------------------------ |
| `${now()}`                                        | 表示当前日期和时间的Date类型，精确到毫秒                     |
| `${now():toNumber()}`                             | 自格林威治标准时间1970年1月1日午夜起的毫秒数(比如`1453843201123`) |
| `${now():toNumber():minus(86400000)`              | 显示24小时前的时间数字                                       |
| `${now():format('yyyy')}`                         | 本年度                                                       |
| `${now():toNumber():minus(86400000):format('E')}` | 昨天星期几，星期为3个首字母的缩写(例如， `Wed`)              |

## 13.类型强制转换

### 13.1 toString

**描述**: 将主题强制转换为字符串

**主题类型**: 任何类型

**参数**: 无

**返回值类型**: String

**例子**: 表达方式 `${fileSize:toNumber():toString()}` 将"fileSize"属性的值转换为数字并返回String。

### 13.2 toNumber

**描述**: 将主题强制转换为数字

**主题类型**: String，Decimal或Date

**参数**: 无

**返回值类型**: Number

**例子**: 表达方式 `${fileSize:toNumber()}` 将"fileSize"的属性值转换为数字。

### 13.3 toDecimal

**描述**: 将主题强制转换为小数

**主题类型**: String，整数或日期

**参数**: 无

**返回值类型**: 小数

**例子**: 表达方式 `${fileSize:toDecimal()}` 将"fileSize"的属性值转换为小数。

## 14.无主题函数

尽管表达式语言中的大多数函数都是通过 `${attributeName:function()}` 语法调用的，但有一些函数是没有主题的，在这种情况下，属性名称是不存在的。例如，可以使用表达式 `${ip()}` 获得机器的IP地址。本节中的所有函数都是在没有主题的情况下调用的。 在验证函数时，尝试调用无主题函数并向其提供主题将导致错误。

### 14.1 ip

**描述**: 返回机器的IP地址。

**主题类型**: 无主题

**参数**: 无

**返回值类型**: String

**例子**:可以使用表达式 `${ip()}` 获取机器的IP地址。

### 14.2 hostname

**描述**: 返回机器的主机名，可以提供类型为Boolean的可选参数，以指定是否应使用完全限定域名。如果 `false` 或者未指定，主机名将不是完全限定的。如果参数是 `true` 但无法解析完全限定的主机名，将返回简单的主机名。

**主题类型**: 无主题

**参数**:

- *Fully Qualified*: Optional参数，指定主机名是否应完全限定。如果未指定，则默认为false。

**返回值类型**: String

**例子**:可以使用表达式 `${hostname(true)}` 获取计算机的完全限定主机名，而简单的主机名可以通过 `${hostname(false)}` 或简单的 `${hostname()}` 来获取。

### 14.3 UUID

**描述**: 返回随机生成类型4的UUID。

**主题类型**: 无主题

**参数**: 无

**返回值类型**: String

**例子**: `${UUID()}` 返回类似于de305d54-75b4-431b-adb2-eb6b9e546013的值。

### 14.4 nextInt

**描述**: 返回一个增1后的值（从0开始）。在运行的 NiFi 实例的生命周期内增加。 此值不会在重新启动后保留，并且不保证在群集中是唯一的。该值被认为是“往上加一”，如果在 NiFi 实例上多次调用，则值将是连续增加的。但是，此计数器在所有 NiFi 组件中共享，因此从一个组件多次调用此函数将无法保证特定组件环境中的顺序值。

**主题类型**: 无主题

**参数**: 无

**返回值类型**: Number

**例子**:如果返回前一个值 `nextInt` 是 `5`， 表达方式 `${nextInt():divide(2)}` 获取下一个可用的整数(6)并将结果除以2，返回值 `3`。

### 14.5 literal

**描述**: 将其参数作为文字字符串值返回。这对于将表达式开头的字符串或数字视为实际值而不是将其视为属性名称很有用。此外，当参数是嵌入式表达式时，我们可以使用它，然后我们要计算其他函数。

**主题类型**: 无主题

**参数**:

- *value*: 要作为文字字符串，数字或布尔值处理的值。

**返回值类型**: String

**例子**: `${literal(2):gt(1)}` 返回 `true`

`${literal( ${allMatchingAttributes('a.*'):count()} ):gt(3)}` 如果有超过3个属性的名称以字母 `a` 开头，则返回true。

### 14.6 getStateValue

**描述**: 通过传入一个String类型的key来访问组件的状态值，并将状态值作为String返回。这是一种特殊的表达式函数，仅适用于明确允许EL查询状态的组件。目前只有UpdateAttribute可以使用。

**主题类型**: 无主题

**参数**:

- *Key*: 访问状态图时使用的key。

**返回值类型**: String

**例子**:UpdateAttribute组件在状态中存储了值"20"的键"count"，则 `${getStateValue("count")}` 返回 `20`。

### 14.7 thread

**描述**: 返回计算表达式时处理器使用的线程的名称。当使用具有多个并发任务的处理器并且需要一些数据唯一性时，这会很有用。

**主题类型**: 无主题

**参数**: 无

**返回值类型**: String

**例子**: ${thread()}可能会返回类似于`Timer-Driven Process Thread-4`的内容。

## 15.对多个属性求值

当需要针对多个相同条件的属性求值时，可以通过 `and` 和 `or` 函数来实现。 但是这很乏味，容易出错并且难以维护。因此，NiFi 提供了多种功能，可以同时针对一组属性求值。

### 15.1 anyAttribute

**描述**: 查看是否有任何给定的属性与给定条件匹配。此函数没有主题，可接受一个或多个参数，这些参数是要应用表达式其余部分的属性的名称。如果指定的任何属性在针对表达式的其余部分计算时，则返回值 `true`，然后这个函数将返回 `true`。否则，此函数将返回 `false`。

**主题类型**: 无主题

**参数**:

- *Attribute Names*: 要评估的一个或多个属性名称

**返回值类型**: Boolean

**例子**:比如"abc"属性包含值"hello world"，"xyz"包含"good bye world"， “filename"包含"file.txt",参考以下示例:

| 表达式                                                      | 值      |
| ----------------------------------------------------------- | ------- |
| `${anyAttribute("abc", "xyz"):contains("bye")}`             | `true`  |
| `${anyAttribute("filename","xyz"):toUpper():contains("e")}` | `false` |

### 15.2 allAttributes

**描述**: 查看所有给定属性是否与给定条件匹配.此函数没有主题，并且接受一个或多个参数，这些参数是要应用表达式其余部分的属性的名称。如果指定的所有属性在针对Expression的其余部分进行求值时返回值 `true`，然后这个函数将返回 `true`。否则，此函数将返回 `false`。

**主题类型**: 无主题

**参数**:

- *Attribute Names*: 要评估的一个或多个属性名称

**返回值类型**: Boolean

**例子**:比如"abc"属性包含值"hello world"，"xyz"包含"good bye world"， “filename"包含"file.txt",参考以下示例:

| 表达式                                                       | 值      |
| ------------------------------------------------------------ | ------- |
| `${allAttributes("abc", "xyz"):contains("world")}`           | `true`  |
| `${allAttributes("abc", "filename","xyz"):toUpper():contains("e")}` | `false` |

### 15.3 anyMatchingAttribute

**描述**: 查看是否有任何给定的属性与给定条件匹配。此函数没有主题，并且使用一个或多个正则表达式的参数来匹配属性名称。任何匹配给定正则表达式的属性的名称，都检查是否满足表达式的剩余部分。如果指定的任何属性在表达式的其余部分验证成立，则返回值 `true`，然后这个函数将返回 `true`。否则，此函数将返回 `false`。

**主题类型**: 无主题

**参数**:

- *Regex*: 一个或者多个正则表达式(在Java模式语法中)来评估属性名称

**返回值类型**: Boolean

**例子**:比如"abc"属性包含值"hello world"，"xyz"包含"good bye world"， “filename"包含"file.txt",参考以下示例:

| 表达式                                              | 值      |
| --------------------------------------------------- | ------- |
| `${anyMatchingAttribute("[ax].*"):contains('bye')}` | `true`  |
| `${anyMatchingAttribute(".*"):isNull()}`            | `false` |

### 15.4 allMatchingAttributes

**描述**: 查看是否有任何给定的属性与给定条件匹配。此函数没有主题，并且使用一个或多个正则表达式的参数来匹配属性名称。任何匹配给定正则表达式的属性的名称，都检查是否满足表达式的剩余部分。如果指定的所有属性在表达式的其余部分验证成立，则返回值 `true`，然后这个函数将返回 `true`。否则，此函数将返回 `false`。

**主题类型**: 无主题

- *Regex*: One或更多正则表达式(在Java模式语法中)来评估属性名称

**返回值类型**: Boolean

**例子**:比如"abc"属性包含值"hello world"，"xyz"包含"good bye world"， “filename"包含"file.txt",参考以下示例:

| 表达式                                                 | 值      |
| ------------------------------------------------------ | ------- |
| `${allMatchingAttributes("[ax].*"):contains("world")}` | `true`  |
| `${allMatchingAttributes(".*"):isNull()}`              | `false` |
| `${allMatchingAttributes("f.*"):count()}`              | `1`     |

### 15.5 anyDelineatedValue

**描述**: 根据提供的分隔符分离String，然后根据表达式的其余部分计算每个值。如果表达式在针对任何单个值进行评估时返回 `true`，这个函数返回 `true`。否则，函数返回 `false`。

**主题类型**: 无主题

**参数**:

- *Delineated Value*: 描述的值。这通常是嵌入式表达式，但并非必须如此。
- *Delimiter*: 用于拆分 *delineatedValue* 参数的值。

**返回值类型**: Boolean

**例子**: 给定"number_list" 属性包括值 "1,2,3,4,5", "word_list" 属性包括值 "the,and,or,not", 参考以下示例:

| 表达式                                                       | 值      |
| ------------------------------------------------------------ | ------- |
| `${anyDelineatedValue("${number_list}", ","):contains("5")}` | `true`  |
| `${anyDelineatedValue("this that and", ","):equals("${word_list}")}` | `false` |

### 15.6 allDelineatedValues

**描述**: 根据提供的分隔符分离String，然后根据表达式的其余部分计算每个值。如果表达式在针对所有单个值进行评估时都返回 `true` ，然后此函数返回 `true`。否则，函数返回 `false`。

**主题类型**: 无主题

**参数**:

- *Delineated Value*: 描述的值。这通常是嵌入式表达式，但并非必须如此。
- *Delimiter*: 用于拆分 *delineatedValue* 参数的值。

**返回值类型**: Boolean

**例子**：给定 "number_list" 属性包含"1,2,3,4,5", "word_list" 属性包含 "those,known,or,not",参考以下示例:

| 表达式                                                       | 值      |
| ------------------------------------------------------------ | ------- |
| `${allDelineatedValues("${word_list}", ","):contains("o")}`  | `true`  |
| `${allDelineatedValues("${number_list}", ","):count()}`      | `4`     |
| `${allDelineatedValues("${number_list}", ","):matches("[0-9]+")}` | `true`  |
| `${allDelineatedValues("${word_list}", ","):matches('e')}`   | `false` |

### 15.7 join

**描述**: 聚合函数，用于将多个值与指定的分隔符连接起来。此功能只能与 `allAttributes` ， `allMatchingAttributes` 和 `allDelineatedValues` 一起使用。

**主题类型**: String

**参数**:

- *Delimiter*: 连接值时使用的字符串分隔符

**返回值类型**: String

**例子**: 给定"abc" 属性包含"hello world", "xyz" 属性包含 "good bye world","filename" 包含 "file.txt"，参考以下示例:

| 表达式                                                       | 值                                  |
| ------------------------------------------------------------ | ----------------------------------- |
| `${allMatchingAttributes("[ax].*"):substringBefore(" "):join("-")}` | `hello-good`                        |
| `${allAttributes("abc", "xyz"):join(" now")}`                | `hello world nowgood bye world now` |

### 15.8 count

**描述**: 聚合函数，用于计算由 `allAttributes`， `allMatchingAttributes` 和 `allDelineatedValues` 返回的非null，非false值的数量。此功能只能与 `allAttributes`，`allMatchingAttributes` 和 `allDelineatedValues` 一起使用。

**主题类型**: 任意

**参数**: 无

**返回值类型**: Number

**例子**:给定"abc" 属性包含"hello world", "xyz" 包含 "good bye world", "number_list" 包含 "1,2,3,4,5"，参考以下示例:

| 表达式                                                       | 值   |
| ------------------------------------------------------------ | ---- |
| `${allMatchingAttributes("[ax].*"):substringBefore(" "):count()}` | `2`  |
| `${allAttributes("abc", "xyz"):contains("world"):count()}`   | `1`  |
| `${allDelineatedValues(${number_list}, ","):count()}`        | `5`  |
| `${allAttributes("abc", "non-existent-attr", "xyz"):count()}` | `2`  |
| `${allMatchingAttributes(".*"):length():gt(10):count()}`     | `2`  |
