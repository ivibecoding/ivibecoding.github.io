---
title: XAML Binding
createTime: 2026/01/23 11:29:06
---

## 数据绑定

### Mode

模式属性，用于控制 Binding 数据流向

- OneWay：Source 影响 Target，但是 Target 影响不到 Source
- TwoWay：Source 与 Target 相互影响
- OneWayToSource：Target 影响 Source，Source 却影响不到 Target
- OneTime：仅绑定一次，显示初始值

### 绑定示例

```xml
<!--绑定到DataContext-->
<Button Content = "{Binding DataTime}" />

< !--绑定到DataContext, 并设置绑定模式-->
<Button x:Name="btn" Content="{Binding DataTime,Mode=OneTime}"/>

<!--绑定到DataContext,并设置更新模式-->
<Button Content = "{Binding DataTime,UpdateSourceTrigger=PropertyChanged}" />

< !--绑定到DataContext, 并设置转换模式-->
<Button Content = "{Binding DataTime,Converter={StaticResource ConvertResource},ConverterParameter=btn1}" />

< !--绑定到Element中指定属性-- >
< Button Content="{Binding ElementName=btn,Path=Content}"/>

<!--绑定到相对位置中的自身模式-->
<Button Content = "{Binding RelativeSource={RelativeSource Mode=Self},Path=Tag}" Tag="MyTag"/>

<!--绑定到相对位置中的父级别查找模式-->
<Button Content = "{Binding RelativeSource={RelativeSource Mode=FindAncestor,AncestorType=Window},Path=Content}" />

< !--绑定到相对位置中的父级别查找模式 绑定到指定类型-->
<Button Content = "{Binding RelativeSource={RelativeSource Mode=FindAncestor,AncestorType=Window},Path=Content}" />

< !--绑定到相对位置中的父级别查找模式 绑定到指定层级-->
<Button Content = "{Binding RelativeSource={RelativeSource Mode=FindAncestor,AncestorLevel=2},Path=Content}" />

< !--绑定到相对位置中的父级别查找模式 绑定到模板内容-->
<Button Content = "{Binding RelativeSource={RelativeSource Mode=TemplatedParent},Path=Content}" />
```

## CalcBinding

> [CalcBinding](https://github.com/Alex141/CalcBinding)

通过 Nuget 安装 CalcBinding 库，在使用这个库之前需要引用命名空间，打开 MainWindow.xaml 文件，添加命名空间 `xmlns:c="clr-namespace:CalcBinding;assembly=CalcBinding"`可以实现一些简单的数学运算转换

```xml
<TextBlock Text="{c:Binding 0.5*A+B}" />
```

对于经常计算值这里也可以简单使用，如 Math 里面的方法

```xml
<TextBox Text="{c:Binding Math.Sin(A*Math.PI/180), StringFormat={}{0:n5} }"/>
<TextBox Text="{c:Binding A*Math.PI}" />
```

经常会将 bool 转换为 Visibility 这个库也有简单的方法

```xml
<Button Content="TargetButton" Visibility="{c:Binding HasPrivileges, FalseToVisibility=Collapsed}"/>
```

因为在 xaml 不能使用 && || <= 所以需要使用 and or 'less=' 替换
另外对于 : 之前需要添加空格，如下面代码

```xml
<TextBox Text="{c:Binding '(A == 2)?IsChecked : IsFull}"/> <!-- right -->
<TextBox Text="{c:Binding '(A == 2)?IsChecked :!IsFull}"/> <!-- right -->
<TextBox Text="{c:Binding '(A == 2) ? IsChecked :4 + IsFull}"/> <!-- right -->
```

这些都是对的，但是下面的代码是无法运行

```xml
<TextBox Text="{c:Binding '(A == 2)?IsChecked:IsFull}"/> <!-- wrong -->
```

## Converter

转换器，通过参数，返回需要绑定的属性值

### IValueConverter

```csharp

    public class BooleanToOpacityConverter : IValueConverter
    {
        public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
        {
            if (value is not null && value is bool isCut && isCut)
                return 0.3;

            return 1;
        }

        public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
        {
            double opacity = (double)value;
            if (opacity == 1)
                return false;
            else if (opacity == 0.3)
                return true;
            else
                return default;
        }
    }

```

```xml

<Grid Opacity="{Binding IsCut,Converter={StaticResource BooleanToOpacityConverter}}" />

```

### IMultiValueConverter

```csharp
    public class MultiBooleanToVisibilityConverter : IMultiValueConverter
    {
        public object Convert(object[] values, Type targetType, object parameter, System.Globalization.CultureInfo culture)
        {
            foreach (object value in values)
            {
                if (value is bool boolValue && boolValue)
                {
                    return System.Windows.Visibility.Hidden;
                }
            }

            return System.Windows.Visibility.Visible;
        }

        public object[] ConvertBack(object value, Type[] targetTypes, object parameter, System.Globalization.CultureInfo culture)
        {
            throw new NotImplementedException();
        }
    }
```

```xml
<Style TargetType="Button" BasedOn="{StaticResource Button.PlayerOverlay.Style}">
    <Setter Property="Visibility">
        <Setter.Value>
            <MultiBinding Converter="{StaticResource MultiBooleanToVisibilityConverter}">
                <Binding Path="IsMouseOver" ElementName="Root"/>
                <Binding Path="CameraRecordModel.CanChangeLayout"/>
            </MultiBinding>
        </Setter.Value>
    </Setter>
</Style>
```

## Custom Binding

自定义绑定模式，避免多处写 Converter

```csharp
    public class NullImageConverter : IValueConverter
    {
        public bool ValidateFileExists { get; set; } = true;

        /// <summary>
        /// 转换值。
        /// </summary>
        /// <param name="value">绑定源生成的值。</param>
        /// <param name="targetType">绑定目标属性的类型。</param>
        /// <param name="parameter">要使用的转换器参数。</param>
        /// <param name="culture">要用在转换器中的区域性。</param>
        /// <returns>
        /// 转换后的值。 如果该方法返回 null，则使用有效的 null 值。
        /// </returns>
        public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
        {
            string path = value?.ToString();

            if (string.IsNullOrEmpty(path))
                return DependencyProperty.UnsetValue;

            if (ValidateFileExists)
            {
                if (!File.Exists(path))
                    return DependencyProperty.UnsetValue;
            }

            return value;
        }

        /// <summary>
        /// 转换值。
        /// </summary>
        /// <param name="value">绑定目标生成的值。</param>
        /// <param name="targetType">要转换为的类型。</param>
        /// <param name="parameter">要使用的转换器参数。</param>
        /// <param name="culture">要用在转换器中的区域性。</param>
        /// <returns>
        /// 转换后的值。 如果该方法返回 null，则使用有效的 null 值。
        /// </returns>
        public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
        {
            return Binding.DoNothing;
        }
    }

    public class ImageBinding : Binding
    {
        private readonly NullImageConverter _nullImageConverter = new NullImageConverter();

        private bool _validateFileExists = true;

        public bool ValidateFileExists
        {
            get
            {
                return _validateFileExists;
            }
            set
            {
                _validateFileExists = value;
                _nullImageConverter.ValidateFileExists = value;
            }
        }

        public ImageBinding(string path) : base(path)
        {
            this.Converter = _nullImageConverter;
        }
    }
```

```xml
 <ImageBrush ImageSource="{uiConverters:ImageBinding ViewInfoModel.IconImageUri, ValidateFileExists=False}" Stretch="UniformToFill"/>
```
