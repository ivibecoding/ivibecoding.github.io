---
title: Log4Net
createTime: 2026/01/23 11:34:29
permalink: /docs/csharp/221nz2e0/
---

将软件运行时的关键信息（重要步骤，错误异常）记录下来，便于开发人员快速定位问题位置


## 添加 log4net 引用

### 创建静态对象\_logger

```csharp
//根据当前方法得数据类型获取记录器对象赋值给变量_logger
private static log4net.ILog _logger = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

static Logger()
{
  log4net.GlobalContext.Properties["Version"] = AssemblyHelper.Version.ToString(3);//设置当前版本信息
  log4net.Config.XmlConfigurator.ConfigureAndWatch(new System.IO.FileInfo("log4net.xml"));//加载配置文件
}
```

### log4net.xml 文件配置信息

```xml
<?xml version="1.0"?>
<configuration>
  <configSections>
    <section name="log4net" type="log4net.Config.Log4NetConfigurationSectionHandler,log4net"/>
  </configSections>
  <!--站点日志配置部分-->
  <log4net>
    <root>
      <!--控制级别，由低到高: ALL|DEBUG|INFO|WARN|ERROR|FATAL|OFF-->
      <!--比如定义级别为INFO，则INFO级别向下的级别，比如DEBUG日志将不会被记录-->
      <!--如果没有定义LEVEL的值，则缺省为DEBUG-->
      <level value="ALL"/>
      <!--负责记录日志介质的方式-->
      <!--<appender-ref ref="RollingFileAppender"/>-->
      <appender-ref ref="LogFileAppender"/>
      <appender-ref ref="ConsoleAppender"/>
    </root>
    <appender name="RollingFileAppender" type="log4net.Appender.RollingFileAppender">
      <!--日志文件名开头-->
      <file value="log/log.txt"/>
      <!--多线程时采用最小锁定-->
      <lockingModel type="log4net.Appender.FileAppender+MinimalLock"/>
      <!--日期的格式，每天换一个文件记录，如不设置则永远只记录一天的日志，需设置-->
      <datePattern value="yyyyMMdd'.txt'"/>
      <!--是否追加到文件,默认为true，通常无需设置-->
      <appendToFile value="true"/>
      <!--变换的形式为日期，这种情况下每天只有一个日志-->
      <!--此时MaxSizeRollBackups和maximumFileSize的节点设置没有意义-->
      <RollingStyle value="Date"/>
      <!--变换的形式为日志大小-->
      <!--这种情况下MaxSizeRollBackups和maximumFileSize的节点设置才有意义-->
      <!--<RollingStyle value="Size"/>-->
      <!--保留的log文件数量 超过此数量后 自动删除之前的 好像只有在 按Size分割时有效-->
      <!--每天记录的日志文件个数，与maximumFileSize配合使用-->
      <MaxSizeRollBackups value="10"/>
      <!--单个文件最大数量 好像只有在 RollingStyle=Size分割时有效-->
      <!--可用的单位:KB|MB|GB-->
      <!--不要使用小数,否则会一直写入当前日志-->
      <maximumFileSize value="2MB"/>
      <!--日志格式-->
      <layout type="log4net.Layout.PatternLayout">
        <!--<conversionPattern value="%date [%t]%-5p %c - %m%n"/>-->
        <ConversionPattern value="%date [%thread] %-5level %logger [%L] - %message%newline" />
      </layout>
    </appender>
    <appender name="LogFileAppender" type="log4net.Appender.RollingFileAppender">
      <file type="log4net.Util.PatternString" value="%envFolderPath{MyDocuments}\ErgoLAB 3.0\Logs\%property{Version}_"/>
      <appendToFile value="true" />
      <rollingStyle value="Date" />
      <datePattern value="yyyy-MM-dd'.log'" />
      <layout type="log4net.Layout.PatternLayout">
        <footer value="" />
        <ConversionPattern value="%date [%thread] %-5level [%L] - %message%newline" />
      </layout>
      <!--单个文件最大数量 好像只有在 RollingStyle=Size分割时有效-->
      <RollingStyle value="Date"/>
      <maximumFileSize value="2MB" />
      <!--保留的log文件数量 超过此数量后 自动删除之前的 好像只有在 按Size分割时有效-->
      <maxSizeRollBackups value="5" />
      <staticLogFileName value="false" />
    </appender>
    <appender name="ConsoleAppender" type="log4net.Appender.ConsoleAppender">
      <layout type="log4net.Layout.PatternLayout">
        <ConversionPattern value="%date [%thread] %-5level [%L] - %message%newline" />
      </layout>
    </appender>
  </log4net>
</configuration>
```

## Logger 方法

| 方法                                                                                                                                                                  | 描述                           |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| Debug(object message, [CallerFilePath] string callingFilePath = null, [CallerMemberName] string callingMember = null, [CallerLineNumber] int? callingNum = null)      | 记录指定的调式消息             |
| Error(object message, [CallerFilePath] string callingFilePath = null, [CallerMemberName] string callingMember = null, [CallerLineNumber] int? callingNum = null)      | 记录指定的错误信息             |
| Error(Exception exception, [CallerFilePath] string callingFilePath = null, [CallerMemberName] string callingMember = null, [CallerLineNumber] int? callingNum = null) | 记录指定的异常信息             |
| Info(string message, [CallerFilePath] string callingFilePath = null, [CallerMemberName] string callingMember = null, [CallerLineNumber] int? callingNum = null)       | 记录指定的信息                 |
| Warn(string message, [CallerFilePath] string callingFilePath = null, [CallerMemberName] string callingMember = null, [CallerLineNumber] int? callingNum = null)       | 记录指定的警告信息             |
| Fatal(string message, [CallerFilePath] string callingFilePath = null, [CallerMemberName] string callingMember = null, [CallerLineNumber] int? callingNum = null)      | 记录指定的致命的信息           |
| Trace(string message, [CallerFilePath] string callingFilePath = null, [CallerMemberName] string callingMember = null, [CallerLineNumber] int? callingNum = null)      | 记录指定的追踪的信息           |
| GetCallInfo(string callingFilePath, string callingMember, int? callingNum, object message)                                                                            | 返回固定格式的记录信息的字符串 |

参数说明

| 参数                | 描述                   |
| ------------------- | ---------------------- |
| object Message      | object 类型信息        |
| stringMessage       | 字符串信息             |
| Exception exception | 捕获到的异常信息       |
| CallerFilePath      | 调用方法所在位置文件名 |
| CallerMemberName    | 调用方法所在位置方法名 |
| CallerLineNumber    | 调用方法所在位置行号   |

---

#方法调用

- **Debug**
  debug 运行状态下，常用于不能断点调试位置，通过添加日志获取运行中变量状态值

### ‍Code

```csharp
Task delayTask = Task.Delay(_calibrationCallbackMaxTime);
if (await Task.WhenAny(_isLeftCalibrationCallback?.Task, delayTask) == delayTask)
{
  Logger.Debug("左眼调用CallBack超时，校准结束");
  return false;
}
```

- **Error**
- 常用于 Try……catch,将获取到的异常信息添加到日志文件
- 已经知道的错误提示信息直接添加到日志

```csharp
try
{
  ……
}
catch (Exception ex)
{
  Logger.Error(ex);
}
```

- **Ingo**
  向日志中添加重要的操作步骤

### ‍Code

```csharp
Logger.Info("提示信息");
```

- **Warn**

### ‍Code

```csharp
logger.Warn("警告信息");
```

- **Fatal**

### ‍Code

```csharp
logger.Fatal("发生致命错误");
```

