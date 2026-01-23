---
title: Wpf Image Render
createTime: 2026/01/23 11:40:32
permalink: /docs/wpf/ob0u49np/
---

```xml
<Rectangle Height="20" Width="20" VerticalAlignment="Center" Fill="Red">
    <Rectangle.OpacityMask>
        <ImageBrush Stretch="Uniform" ImageSource="/IProject;component/Resources/logo.png"/>
    </Rectangle.OpacityMask>
</Rectangle>

```