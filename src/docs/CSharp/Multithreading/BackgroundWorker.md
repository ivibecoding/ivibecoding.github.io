---
title: BackgroundWorker
createTime: 2026/01/23 14:42:57
---

BackgroundWorker 类允许您在单独的线程上执行某个可能导致用户界面（UI）停止响应的耗时操作（比如文件下载数据库事务等），并且想要一个响应式的 UI 来反应当前耗时操作的进度。
可以看的出来，BackgroundWorker 组件提供了一种执行异步操作（后台线程）的同时，并且还能妥妥的显示操作进度的解决方案。

> **特点**：可以直接更新界面，而线程不可以直接更新界面（需要异步更新界面），适用于简单后台线程控制前台页面控件值，如：进度条，倒计时

## 属性

- WorkerReportsProgress
  bool 类型，指示 BackgroundWorker 是否可以报告进度更新。当该属性值为 True 是，将可以成功调用 ReportProgress 方法，否则将引发 InvalidOperationException 异常。
- WorkerSupportsCancellation
  bool 类型，指示 BackgroundWorker 是否支持异步取消操作。当该属性值为 True 是，将可以成功调用 CancelAsync 方法，否则将引发 InvalidOperationException 异常。
- CancellationPending
  bool 类型，指示应用程序是否已请求取消后台操作。此属性通常放在用户执行的异步操作内部，用来判断用户是否取消执行异步操作。当执行 BackgroundWorker.CancelAsync()方法时，该属性值将变为 True。
- IsBusy
  bool 类型，指示 BackgroundWorker 是否正在执行一个异步操作。此属性通常放在 BackgroundWorker.RunWorkerAsync()方法之前，避免多次调用 RunWorkerAsync()方法引发异常。当执行 BackgroundWorker.RunWorkerAsync()方法是，该属性值将变为 True。

## 方法

- RunWorkerAsync()
  开始执行一个后台操作。调用该方法后，将触发 BackgroundWorker.DoWork 事件，并以异步的方式执行 DoWork 事件中的代码。该方法还有一个带参数的重载方法：RunWorkerAsync(Object)。该方法允许传递一个 Object 类型的参数到后台操作中，并且可以通过 DoWork 事件的 DoWorkEventArgs.Argument 属性将该参数提取出来。

  > 当 BackgroundWorker 的 IsBusy 属性为 True 时，调用该方法将引发 InvalidOperationException 异常。

- ReportProgress(Int percentProgress)
  报告操作进度。调用该方法后，将触发 BackgroundWorker. ProgressChanged 事件。另外，该方法包含了一个 int 类型的参数 percentProgress，用来表示当前异步操作所执 行的进度百分比。 该方法还有一个重载方法：ReportProgress(Int percentProgress, Object userState)。允许传递一个 Object 类型的状态对象到 ProgressChanged 事件中，并且可以通过 ProgressChanged 事件的 ProgressChangedEventArgs.UserState 属性取得参数值。

  > 调用该方法之前需确保 WorkerReportsProgress 属性值为 True，否则将引发 InvalidOperationException 异常。

- CancelAsync()
  请求取消当前正在执行的异步操作。调用该方法将使 BackgroundWorker.CancellationPending 属性设置为 True。 但需要注意的是，并非每次调用 CancelAsync()都能确保异步操作，CancelAsync()通常不适用于取消一个紧密执行的操作，更适用于在循环体中执行。

## 事件

- DoWork
  用于承载异步操作。当调用 BackgroundWorker.RunWorkerAsync()时触发。
  需要注意的是，由于 DoWork 事件内部的代码运行在非 UI 线程之上，所以在 DoWork 事件内部应避免于用户界面交互，而于用户界面交互的操作应放置在 ProgressChanged 和 RunWorkerCompleted 事件中。

- ProgressChanged
  当调用 BackgroundWorker.ReportProgress(int percentProgress)方式时触发该事件。
  该事件的 ProgressChangedEventArgs.ProgressPercentage 属性可以接收来自 ReportProgress 方法传递的 percentProgress 参数值,ProgressChangedEventArgs.UserState 属性可以接收来自 ReportProgress 方法传递的 userState 参数。

- RunWorkerCompleted
  异步操作完成或取消时执行的操作，当调用 DoWork 事件执行完成时触发。
  该事件的 RunWorkerCompletedEventArgs 参数包含三个常用的属性 Error,Cancelled,Result。其中，Error 表示在执行异步操作期间发生的错误；Cancelled 用于判断用户是否取消了异步操作；Result 属性接收来自 DoWork 事件的 DoWorkEventArgs 参数的 Result 属性值，可用于传递异步操作的执行结果。

## 参考资料

- [BackGroundWorker 详细学习](https://docs.microsoft.com/en-us/dotnet/api/system.componentmodel.backgroundworker?view=net-5.0)
