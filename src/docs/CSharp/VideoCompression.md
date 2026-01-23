---
title: 视频压缩
createTime: 2026/01/23 11:41:09
permalink: /docs/csharp/2o26wmf0/
---

## 压缩脚本对比

**测试视频 145470kb 的 mkv 文件**

`ffmpeg -i test.mkv-b 400k -vcodec libx264 -y test_video_handle.mkv`

> 时间长 10s 以上，CPU 占用率 95%，压缩后内存小 16152kb，画质无明显变化

`ffmpeg -i test.mkv -r 24 -b 400k -vcodec libx264 -preset ultrafast -qp 35 -y test_video_handle.mkv`

> 时间端 5s 左右，CPU 占用率 50%，压缩后内存稍大 20321kb，画质无明显变化

- 压缩后 MP4 视频比 mkv 内存稍大
- 需要在安装目录下 x64 文件夹增加 ffmpeg.exe

| 命令                                                                                  | 分辨率    | 帧率 | 比特率       | 压缩后占用空间 | 压缩速率     |
| :------------------------------------------------------------------------------------ | :-------- | :--- | :----------- | :------------- | :----------- |
| ffmpeg -i input.mkv -vcodec libx264 -preset ultrafast -y output.mkv                   | 1280\*720 | 25   | 原视频比特率 | 168.873KB      | 44.5x        |
| ffmpeg -i input.mkv -vcodec libx264 -y output.mkv                                     | 1280\*720 | 25   | 原视频比特率 | 93.198KB       | 8.5x CPU100% |
| ffmpeg -i input.mkv -vcodec libx264 -preset ultrafast -qp 35 -y output.mkv            | 1280\*720 | 25   | 原视频比特率 | 20.837KB       | 64x          |
| ffmpeg -i input.mkv -vcodec libx264 -preset ultrafast -qp 25 -y output.mkv            | 1280\*720 | 25   | 原视频比特率 | 97.303KB       | 62x          |
| ffmpeg -i input.mkv -r 24 -b 400k -vcodec libx264 -y output.mkv                       | 1280\*720 | 24   | 400Kbit / s  | 16.161KB       | 17x          |
| ffmpeg -i input.mkv -s 640x360 -vcodec libx264 -preset ultrafast -y output.mkv        | 640\*360  | 25   | 原视频比特率 | 62.866KB       | 46.7x        |
| ffmpeg -i input.mkv -s 640x360 -vcodec libx264 -y output.mkv                          | 640\*360  | 25   | 原视频比特率 | 19.840KB       | 32.3x        |
| ffmpeg -i input.mkv -s 640x360 -r 24 -b 400k -vcodec libx264 -y output.mkv            | 640\*360  | 24   | 400Kbit / s  | 16.071KB       | 35x          |
| ffmpeg -i input.mkv -s 640x360 -vcodec libx264 -preset ultrafast -qp 35 -y output.mkv | 640\*360  | 25   | 原视频比特率 | 7.153KB        | 52x          |

- 强：`ffmpeg -i input.mkv -s 640x360 -vcodec libx264 -preset ultrafast -qp 35 -y output.mkv 7MB 51.9x`
- 中：`ffmpeg -i input.mkv -vcodec libx264 -preset ultrafast -qp 35 -y output.mkv 20MB 64x`
- 弱：`ffmpeg -i input.mkv -vcodec libx264 -preset ultrafast -qp 25 -y output.mkv 97MB 62x`

```csharp
// -i 设定输入流
// -f 设定输出格式
// - ss 开始时间
// - b 设定视频流量(码率)
// - r 设定帧速率
// - s 设定画面的宽与高
// - aspect 设定画面的比例
// - vn 不处理视频
// - vcodec 设定视频编解码器，未设定时则使用与输入流相同的编解码器

// - ar 设定采样率
// - ac 设定声音的Channel数
// - acodec 设定声音编解码器，未设定时则使用与输入流相同的编解码器
// - an 不处理音频
```

## 参考资料

- [ffmpeg Documentation](https://ffmpeg.org/ffmpeg-all.html)
- [ffmpeg：码率控制模式、编码方式](https://blog.csdn.net/ETalien_/article/details/102931065)

