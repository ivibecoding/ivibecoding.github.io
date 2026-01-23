---
title: 语音识别
createTime: 2026/01/23 14:39:31
---

## Microsoft.Speech

### 环境安装

- [安装语音包](https://download.microsoft.com/download/4/0/D/40D6347A-AFA5-417D-A9BB-173D937BEED4/MSSpeech_TTS_zh-CN_HuiHui.msi)
- [安装 speech sdk](https://www.microsoft.com/en-us/download/details.aspx?id=27226)
- 安装 runtime

  在 speech sdk 安装目录下面 Microsoft SDKs\Speech\v11.0\Redist\SpeechPlatformRuntime.msi

### 示例代码

引入 Microsoft.Speech 库

```cs
using Microsoft.Speech.Recognition;

private Microsoft.Speech.Recognition.SpeechRecognitionEngine _microsoftSpeech;

private void StartMicrosoftSpeech(string[] wakeUpWords)
{
	CultureInfo cultureInfo = new CultureInfo("zh-CN");
    this._microsoftSpeech = new Microsoft.Speech.Recognition.SpeechRecognitionEngine(cultureInfo);
	this._microsoftSpeech.SetInputToDefaultAudioDevice();
	Microsoft.Speech.Recognition.Choices choices = new Microsoft.Speech.Recognition.Choices();
	choices.Add(wakeUpWords);
	Microsoft.Speech.Recognition.GrammarBuilder gb = new Microsoft.Speech.Recognition.GrammarBuilder();
	gb.Culture = cultureInfo;
	gb.Append(choices);
	Microsoft.Speech.Recognition.Grammar g = new Microsoft.Speech.Recognition.Grammar(gb);
	g.Name = "Microsoft";
	this._microsoftSpeech.LoadGrammar(g);
	this._microsoftSpeech.SpeechRecognized += this.MicrosoftSpeech_SpeechRecognized;
	this._microsoftSpeech.SpeechRecognitionRejected += this.MicrosoftSpeech_SpeechRecognitionRejected;
	this._microsoftSpeech.SpeechDetected += this.MicrosoftSpeech_SpeechDetected;
	this._microsoftSpeech.RecognizeAsync(Microsoft.Speech.Recognition.RecognizeMode.Multiple);
}

private void StopMicrosoftSpeech()
{
	this._microsoftSpeech.RecognizeAsyncStop();
	this._microsoftSpeech.UnloadAllGrammars();
	this._microsoftSpeech.SpeechRecognized -= this.MicrosoftSpeech_SpeechRecognized;
	this._microsoftSpeech.SpeechRecognitionRejected -= this.MicrosoftSpeech_SpeechRecognitionRejected;
	this._microsoftSpeech.SpeechDetected -= this.MicrosoftSpeech_SpeechDetected;
}

private void MicrosoftSpeech_SpeechDetected(object sender, Microsoft.Speech.Recognition.SpeechDetectedEventArgs e)
{
	Console.WriteLine("MicrosoftSpeech_SpeechDetected");
}

private void MicrosoftSpeech_SpeechRecognized(object sender, Microsoft.Speech.Recognition.SpeechRecognizedEventArgs e)
{
	Console.WriteLine($"Yes {e.Result.Text}");
}

private void MicrosoftSpeech_SpeechRecognitionRejected(object sender, Microsoft.Speech.Recognition.SpeechRecognitionRejectedEventArgs e)
{
	Console.WriteLine($"No {e.Result.Text}");
}
```

## System.Speech

### 示例代码

引入 System.Speech 库

```cs
using System.Speech.Recognition;

private System.Speech.Recognition.SpeechRecognitionEngine _systemSpeech;

private void StartSystemSpeech(string[] wakeUpWords)
{
	this._systemSpeech = new System.Speech.Recognition.SpeechRecognitionEngine();
	this._systemSpeech.SetInputToDefaultAudioDevice();
	System.Speech.Recognition.Choices choices = new System.Speech.Recognition.Choices();
	choices.Add(wakeUpWords);
	System.Speech.Recognition.GrammarBuilder gb = new System.Speech.Recognition.GrammarBuilder();
	gb.Append(choices);
	System.Speech.Recognition.Grammar gr = new System.Speech.Recognition.Grammar(gb);
	gr.Name = "System";
	this._systemSpeech.LoadGrammar(gr);
	this._systemSpeech.SpeechRecognized += this.SystemSpeech_SpeechRecognized;
	this._systemSpeech.SpeechRecognitionRejected += this.SystemSpeech_SpeechRecognitionRejected;
	this._systemSpeech.SpeechDetected += this.SystemSpeech_SpeechDetected;
	this._systemSpeech.RecognizeAsync(System.Speech.Recognition.RecognizeMode.Multiple);
}

private void StopSystemSpeech()
{
	this._systemSpeech.RecognizeAsyncStop();
	this._systemSpeech.UnloadAllGrammars();
	this._systemSpeech.SpeechRecognized -= this.SystemSpeech_SpeechRecognized;
	this._systemSpeech.SpeechRecognitionRejected -= this.SystemSpeech_SpeechRecognitionRejected;
	this._systemSpeech.SpeechDetected -= this.SystemSpeech_SpeechDetected;
}

private void ButtonStop_Click(object sender, RoutedEventArgs e)
{
	this._microsoftSpeech.RecognizeAsyncStop();
	this._microsoftSpeech.UnloadAllGrammars();
	this._microsoftSpeech.SpeechRecognized -= this.MicrosoftSpeech_SpeechRecognized;
	this._microsoftSpeech.SpeechRecognitionRejected -= this.MicrosoftSpeech_SpeechRecognitionRejected;
	this._microsoftSpeech.SpeechDetected -= this.MicrosoftSpeech_SpeechDetected;
	this._systemSpeech.RecognizeAsyncStop();
	this._systemSpeech.UnloadAllGrammars();
	this._systemSpeech.SpeechRecognized -= this.SystemSpeech_SpeechRecognized;
	this._systemSpeech.SpeechRecognitionRejected -= this.SystemSpeech_SpeechRecognitionRejected;
	this._systemSpeech.SpeechDetected -= this.SystemSpeech_SpeechDetected;
	this.BtnStart.IsEnabled = true;
	this.BtnStop.IsEnabled = false;
	this.txtTarget.IsEnabled = true;
}

private void SystemSpeech_SpeechDetected(object sender, System.Speech.Recognition.SpeechDetectedEventArgs e)
{
	Console.WriteLine("SystemSpeech_SpeechDetected");
}

private void SystemSpeech_SpeechRecognized(object sender, System.Speech.Recognition.SpeechRecognizedEventArgs e)
{
	Console.WriteLine($"Yes {e.Result.Text}");
}

private void SystemSpeech_SpeechRecognitionRejected(object sender, System.Speech.Recognition.SpeechRecognitionRejectedEventArgs e)
{
	Console.WriteLine($"No {e.Result.Text}");
}

```

## Microsoft.Speech vs System.Speech

![image](./assets/SpeechRecognition01.png)

### 效果对比

| 识别词 | System Speech | Micosoft Speech | 实际个数 |
| :----- | :-----------: | --------------: | -------- |
| 开始   |      56       |              22 | 4        |
| 训练   |      90       |              33 | 4        |
| 注意力 |      25       |               5 | 10       |

- System.Speech 识别速度快
- Microsoft.Speech 准确率高（方言也可以识别）

## 参考资料

- [SpeechRecognitionEngine Class](<https://learn.microsoft.com/en-us/previous-versions/office/developer/speech-technologies/dd147134(v=office.14)>)
- [SpeechRecognizer Class](https://learn.microsoft.com/en-us/dotnet/api/system.speech.recognition.speechrecognizer?view=netframework-4.8)
- [Voice Recognition : Speech Recognition with .NET Desktop Applications](https://docs.microsoft.com/en-us/archive/msdn-magazine/2014/december/voice-recognition-speech-recognition-with-net-desktop-applications)
