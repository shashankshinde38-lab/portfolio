Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\shash\.gemini\antigravity-ide\brain\bc9e51f6-3b0b-464d-bfe8-171d0d7c697a\qa_favicon_icon_1788542954413.jpg"
$destDir = "c:\Users\shash\.vscode\Shashank\Projects\Portfolio\public"

$srcImg = [System.Drawing.Image]::FromFile($srcPath)

function Resize-And-Save($width, $height, $outPath, $format) {
    $bmp = New-Object System.Drawing.Bitmap $width, $height
    $graph = [System.Drawing.Graphics]::FromImage($bmp)
    $graph.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graph.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $graph.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $graph.DrawImage($srcImg, 0, 0, $width, $height)
    $graph.Dispose()
    
    if ($format -eq "Icon") {
        $icon = [System.Drawing.Icon]::FromHandle($bmp.GetHicon())
        $fs = New-Object System.IO.FileStream $outPath, ([System.IO.FileMode]::Create)
        $icon.Save($fs)
        $fs.Close()
        $fs.Dispose()
        $icon.Dispose()
    } else {
        $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
    }
    $bmp.Dispose()
    Write-Output "Created $outPath ($width x $height)"
}

Resize-And-Save 180 180 (Join-Path $destDir "apple-touch-icon.png") "Png"
Resize-And-Save 32 32 (Join-Path $destDir "favicon-32x32.png") "Png"
Resize-And-Save 16 16 (Join-Path $destDir "favicon-16x16.png") "Png"
Resize-And-Save 32 32 (Join-Path $destDir "favicon.ico") "Icon"

$srcImg.Dispose()
Write-Output "All favicon assets successfully generated!"
