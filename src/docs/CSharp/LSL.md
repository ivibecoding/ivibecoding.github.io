---
title: matlab 和 python 接收 LSL 数据
createTime: 2026/01/23 13:50:32
permalink: /docs/csharp/qmk2y1qo/
---

## LSL
The lab streaming layer (LSL) is a system for the unified collection of measurement time series in research experiments that handles both the networking, time-synchronization, (near-) real-time access as well as optionally the centralized collection, viewing and disk recording of the data.
https://github.com/sccn/labstreaminglayer

### 基础头文件
标签 | 描述信息
:----------- | :-----------
 name |     [type][channel] 数据类型+输出通道（Default通道为空，Channel1~Channel9为1~9）
 type|     Command/Gaze/Behavior/VRScene/VRGaze/VRGait
 channel_count|     发送数据通道数
 channel_format|     数据类型   
 source_id|     唯一，Guid
 nominal_srate|     采样率

### Examples

``` xml
<?xml version="1.0"?>
<info>
        <name>Command1</name>
        <type>Command</type>
        <channel_count>1</channel_count>
        <channel_format>int32</channel_format>
        <source_id>1d8b12d8-349c-487c-a40c-4ebfae83d7a2</source_id>
        <nominal_srate>0.000000</nominal_srate>
        <version>1.100000</version>
        <created_at>300390.476483</created_at>
        <uid>a8e65937-f465-4e9c-820e-78c95b20293c</uid>
        <session_id>default</session_id>
        <hostname>Z小染</hostname>
        <v4address />
        <v4data_port>16572</v4data_port>
        <v4service_port>16578</v4service_port>
        <v6address />
        <v6data_port>16572</v6data_port>
        <v6service_port>16578</v6service_port>
        <desc/>
</info>

```


>注意：
使用不同的Type，需要在<desc></desc>标签中加入对应的描述信息。
以下收发数据Example均为通道1输出示例。



```python
from pylsl import StreamInlet, resolve_stream

def receive_lsl_eeg_data():
    # 创建一个inlet从EEG流中读取数据
    streams = resolve_stream('type', 'EEG')
    inlet = StreamInlet(streams[0])

    # 读取inlet中的info信息
    info = inlet.info()

    # 将info直接转为字符串数据直接解析xml
    # xml = info.as_xml()
    # print(xml)

    # 采用lsl内部方法解析info中的描述信息
    receive_name = info.name()
    receive_type = info.type()
    channel_count = info.channel_count()
    channel_format = info.channel_format()
    source_id = info.source_id()
    nominal_srate = info.nominal_srate()
    msg = "receive_name:{0} receive_type:{1} channel_count:{2} channel_format:{3} source_id:{4} nominal_srate:{5}"
    print(msg.format(receive_name, receive_type, channel_count, channel_format, source_id, nominal_srate))

    msg = "channel_label:{0} channel_type:{1} channel_unit:{2} channel_location_x:{3} channel_location_y:{4} channel_location_z:{5}"
    channels = info.desc().child('channels')
    i = 0
    while i < channel_count:
        if i == 0:
            channel = channels.child('channel')
        else:
            channel = channel.next_sibling()

        channel_label = channel.child_value('label')
        channel_type = channel.child_value('type')
        channel_unit = channel.child_value('unit')
        channel_location = channel.child('location')
        channel_location_x = channel_location.child_value('X')
        channel_location_y = channel_location.child_value('Y')
        channel_location_z = channel_location.child_value('Z')
        print(msg.format(channel_label, channel_type, channel_unit, channel_location_x, channel_location_y, channel_location_z))

        i += 1

    # 循环从inlet中获取数据和lsl内部时间戳
    while True:
        sample, timestamp = inlet.pull_sample()
        print(sample, timestamp)

if __name__ == '__main__':
    receive_lsl_eeg_data()

```

```matlab
function receive_lsl_eeg_data()
    % 创建一个inlet从EEG流中读取数据
    lib = lsl_loadlib();
    result = {};
    while isempty(result)
      result = lsl_resolve_byprop(lib,'type','EEG');
    end
    inlet = lsl_inlet(result{1});

    % 读取inlet中的info信息
    info = inlet.info();

    % 可以将info直接转为字符串数据解析xml
    % xml = info.as_xml();
    % fprintf(xml);

    % 采用lsl内部方法解析info中的描述信息
    receive_name = info.name();
    receive_type = info.type();
    channel_count = info.channel_count();
    channel_format = info.channel_format();
    source_id = info.source_id();
    nominal_srate = info.nominal_srate();
    msg = "receive_name:%s receive_type:%s channel_count:%i channel_format:%s source_id:%s nominal_srate:%f\n";
    fprintf(msg, receive_name, receive_type, channel_count, channel_format, source_id, nominal_srate);

    msg = "channel_label:%s channel_type:%s channel_unit:%s channel_location_x:%s channel_location_y:%s channel_location_z:%s\n";
    channels = info.desc().child('channels');
    i = 0;
    while i < channel_count
        if i == 0
            channel = channels.child('channel');
        else
            channel = channel.next_sibling();
        end

        channel_label = channel.child_value('label');
        channel_type = channel.child_value('type');
        channel_unit = channel.child_value('unit');
        channel_location = channel.child('location');
        channel_location_x = channel_location.child_value('X');
        channel_location_y = channel_location.child_value('Y');
        channel_location_z = channel_location.child_value('Z');

        fprintf(msg, channel_label, channel_type, channel_unit, channel_location_x, channel_location_y, channel_location_z);
        i = i + 1;
    end

    % 循环从inlet中获取数据和lsl内部时间戳
    while true
        [vec,ts] = inlet.pull_sample();
        fprintf('%f\t',vec);
        fprintf('%f\n',ts);
    end
end

```