---
title: Thread & Task
createTime: 2026/01/23 14:42:29
permalink: /docs/7tohe0qa/
---

## Thread

**Thread 默认是前台线程，主线程必须等待前台线程执行完毕后才能退出，thread 可以设置为后台线程，适合长跑型的操作**；
多线程的意义在于一个应用程序中，有多个执行部分可以同时执行；对于比较耗时的操作(例如 io，数据库操作)，或者等待响应(如 WCF 通信)的操作，可以单独开启后台线程来执行，这样主线程就不会阻塞，可以继续往下执行；等到后台线程执行完毕，再通知主线程，然后做出对应操作！

```cs
private void ThreadTest()
{
  Thread t1=new Thread(DoWork);//初始化线程
  t1.Start();//开启线程
  t1.Abort();//结束线程
}

private void DoWork()
{
  …
}
```

**注意: Thread.Abort 方法是强制停止正在执行的线程，实际并没有真正的停止线程**
**Abort()方法工作原理**：因为公用语言运行时管理了所有的托管的线程，同样它能在每个线程内抛出异常。Abort 方法能在目标线程中抛出一个 ThreadAbortException 异常从而导致目标线程的终止。不过 Abort 方法被调用后，目标线程可能并不是马上就终止了。因为只要目标线程正在调用非托管的代码而且还没有返回的话，该线程就不会立即终止。而如果目标线程在调用非托管的代码而且陷入了一个死循环的话，该目标线程就根本不会终止。不过这种情况只是一些特例，更多的情况是目标线程在调用托管的代码，一旦 Abort 被调用那么该线程就立即终止了。

结束线程的最好方法是：在启动的线程中加**信号灯**，当想要终止线程执行时就更改信号灯的状态，启动的线程当读到信号灯状态改变后自己结束代码的执行，这才是最安全的做法。
t1.**Join**();线程阻塞，一直等待线程 t1 终止,才继续向下执行。**信号灯:红灯**

[Thread 参考链接](https://www.cnblogs.com/wyy1234/p/9166444.html)

### ThreadPool

**ThreadPool 默认是后台线程，主线程执行完毕后就能退出，无论后台线程是否执行完毕。ThreadPool 是 Thread 基础上的一个线程池，目的是减少频繁创建销毁线程的开销，适合频繁、短期执行的小操作**
线程池，试想一下，如果有大量的任务需要处理，例如网站后台对于 HTTP 请求的处理，那是不是要对每一个请求创建一个后台线程呢？显然不合适，这会占用大量内存，而且频繁地创建的过程也会严重影响速度，那怎么办呢？线程池就是为了解决这一问题，把创建的线程存起来，形成一个线程池(里面有多个线程)，当要处理任务时，若线程池中有空闲线程(前一个任务执行完成后，线程不会被回收，会被设置为空闲状态)，则直接调用线程池中的线程执行(例 asp.net 处理机制中的 Application 对象)

**缺点：**

- ThreadPool 不支持线程的取消、完成、失败通知等交互性操作；
- ThreadPool 不支持线程执行的先后次序；
  **优点：**
- 可以避免创建和销毁消除的开支，从而可以实现更好的性能和系统稳定性。
- 把线程交给系统进行管理，程序员不需要费力于线程管理，可以集中精力处理应用程序任务。

[线程池详解](https://blog.csdn.net/chen_zw/article/details/7939834?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.control&dist_request_id=&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.control)

### 线程锁

在多线程编程中，可能会有许多线程并发的执行一段代码（代码块 A），以提高执行效率。在某些情况下，我们希望 A 中的代码块（B）同步的执行，即同一时刻只有一个线程执行代码块 B，这就需要用到锁（lock）。lock 关键字可以用来确保代码块完成运行，而不会被其他线程中断。它可以把一段代码定义为互斥段（critical section），互斥段在一个时刻内只允许一个线程进入执行，而其他线程必须等待。
线程锁的两种方式：

- Lock：

```cs
Object  locker = new Object();
lock(locker)
{
      B    //同步执行的代码
}
```

- Monitor： Moniter 类提供同步访问对象的机制

```cs
Object  locker = new Object();
Monitor.enter(locker); //enter(Object)获取排他锁
{
      B
}
Monitor.exit(locker); //exit(Object)释放指定对象上的排他锁。
```

_**locker 必须时引用类型的值。**_

[线程锁的学习](https://blog.csdn.net/smooth_tailor/article/details/52411359?utm_medium=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromMachineLearnPai2-1.control&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromMachineLearnPai2-1.control)

## Task

Task 是.NET4.0 加入的，跟线程池 ThreadPool 的功能类似，用 Task 开启新任务时，会从线程池中调用线程，而 Thread 每次实例化都会创建一个新的线程。
开启新任务的方法：Task.Run()或者 Task.Factory.StartNew()，开启的是后台线程要在主线程中等待后台线程执行完毕，可以使用 wait 方法(会以同步的方式来执行)。不用 Wait 则会以异步的方式来执行。
Task 常用方法总结
Task.Run()//异步执行任务方法或 Lambda 表达式
Task.Factory.StartNew(）//异步执行任务方法或 Lambda 表达式,等同于 Task.Run()
Task.Delay(numberInMs)//等待等同于睡眠 Thread.Sleep(numberInMs);
Task.WhenAny()//任意一个任务完成返回对应任务结果
Task.WhenAll()//所有任务完成
Task.WaitAll(t1,t2,……)；//等待所有任务完成
Task.Wait()；//等待任务完成
Task.ContinueWith(lambda 表达式)//可以让该后台线程继续执行新的任务

**Task.WhenAll()和 Task.WaitAll()区别**
WaitAll 就好像是一颗“发霉的花生”，它是**阻塞当前线程**的，当 WaitAll 执行“过去了”的时候还在当前线程继续执行。而**WhenAll 是异步的**，其实异步回调时是使用新的子线程、还是注册 WhenAll 时的线程，是不确定的，核心技术就在于此时根本不占用线程阻塞。这是更重要的区别。

- [微软 Task 详解](https://docs.microsoft.com/zh-cn/dotnet/api/system.threading.tasks.task.whenall?view=net-5.0)
- [参考使用链接 1](https://www.cnblogs.com/zhaoshujie/p/11082753.html)
- [参考使用链接 2](https://www.cnblogs.com/xiaojidanbai/p/13224172.html)

## Task 于 Thread 的区别

1. 任务可以返回结果，没有直接的机制可以从线程返回结果。
2. 任务通过使用取消令牌来支持取消，但是线程没有。
3. 一个任务可以同时执行多个线程，线程一次只能运行一个任务。
4. 可以使用 async 和 await 关键字轻松实现异步。
5. 新的 Thread 不处理线程池线程，而 Task 确实使用线程池线程。
6. 任务是比线程更高层次的概念。

### 什么是 thread

当我们提及多线程的时候会想到 thread 和 threadpool，这都是异步操作，threadpool 其实就是 thread 的集合，具有很多优势，不过在任务多的时候全局队列会存在竞争而消耗资源。thread 默认为前台线程，主程序必须等线程跑完才会关闭，而 threadpool 相反。
总结：threadpool 确实比 thread 性能优，但是两者都没有很好的 api 区控制，如果线程执行无响应就只能等待结束，从而诞生了 task 任务。

### 什么是 task

task 简单地看就是任务，那和 thread 有什么区别呢？Task 的背后的实现也是使用了线程池线程，但它的性能优于 ThreadPool,因为它使用的不是线程池的全局队列，而是使用的本地队列，使线程之间的资源竞争减少。同时 Task 提供了丰富的 API 来管理线程、控制。但是相对前面的两种耗内存，Task 依赖于 CPU 对于多核的 CPU 性能远超前两者，单核的 CPU 三者的性能没什么差别

[Task 于 Thread 的对比](https://blog.csdn.net/qq_40677590/article/details/102797838)

### Task.Delay()和 Thread.Sleep()区别

1. Thread.Sleep 是同步延迟，Task.Delay 异步延迟。
2. Thread.Sleep 会阻塞线程，Task.Delay 不会。
3. Thread.Sleep 不能取消，Task.Delay 可以
4. Task.Delay() 比 Thread.Sleep() 消耗更多的资源，但是 Task.Delay()可用于为方法返回 Task 类型；或者根据 CancellationToken 取消标记动态取消等待
5. Task.Delay() 实质创建一个运行给定时间的任务， Thread.Sleep() 使当前线程休眠给定时间

[Task.Delay()和 Thread.Sleep()对比](链接：https://blog.csdn.net/zxf347085420/article/details/93347885?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-6.control&dist_request_id=&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-6.control)

### 取消阻塞多线程

**使用 CancellationTokenSource 取消任务**

Task+CancellationTokenSource 共有三种写法：

```cs
CancellationTokenSource cts = new CancellationTokenSource();
// One
taskFactory.StartNew(() => { }, cts.Token);
// Two
Task task3 = new Task(() => { }, cts.Token);
// Three
Task.Run(() => { }, cts.Token);

```

在任务方法体内，通过判断 CancellationTokenSource.IsCancellationRequested 属性，得知线程是否被取消

**ManualResetEvent 线程内部阻塞**

```cs
//参数值为false线程默认会阻塞
private ManualResetEvent mre = new ManualResetEvent(false);
private void btnManuResetEvent_Click(object sender, EventArgs e)
{
    Thread thread = new Thread(Run);
    thread.Start();
}

private void Run()
{
    while (true)
    {
        this.mre.WaitOne();
        Thread.Sleep(1000);
        Console.WriteLine("ThreadId=" + Thread.CurrentThread.ManagedThreadId + "：" + DateTime.Now);
    }
}

private void btnStart_Click(object sender, EventArgs e)
{
    //放开线程
    this.mre.Set();
}

private void btnStop_Click(object sender, EventArgs e)
{
    //阻塞线程
    this.mre.Reset();
}
```

- [取消线程 链接学习目录 8](https://blog.csdn.net/xiaouncle/article/details/83037245?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.control&dist_request_id=1328593.10674.16147521124551795&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.control)
