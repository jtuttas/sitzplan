
$worksheet="206"
$excel=Import-Excel D:\Temp\Sitzplan.xlsx -NoHeader -WorksheetName $worksheet
$rsa = New-Object -TypeName System.Security.Cryptography.RSACryptoServiceProvider
$rsa.FromXmlString("<RSAKeyValue><Modulus>nLZxDwJf/nWgWq8MPahQ1EcYRTtWz+GicGVdTvuhbzgo8GIYOlJj1JNp87R+bmQElEn7tF15ZOR3eBSKOaFR3VtnTh/0eWg42hJCGeD85dlO1ZnPvt2DX7LI235SyD2BoOu0UL2QIfw3GQDCP1aejrJzvLuW3f3jF3LLOcrJSQs=</Modulus><Exponent>AQAB</Exponent><P>zB3JVz8vG1IrUtFig79JNcEnK0lgWquuEstBeEdZUs0ZNIkXU5RTxh9B0Y/Qfbe8LM3A1kTFl2YkB1NKDkMjNw==</P><Q>xIwDSG8Oz6i4kXK6MxwYXtUtzy76Pg6ZH5dEtJY4X4PaWp6Pd0JL2mJJFVcXdp+oQ81o1I3J0+iUr/1vfGGazQ==</Q><DP>gxpGriFJMnUumn0el5yPe1VawTTaDKLkpfGjVYwOVV6i59l+ABLvU/vTnLSQp48R8H0fdQCrITlbvtDCajK5NQ==</DP><DQ>c7w6pql24ELqxAL5r+ToWNdRDUINawNvmVGazHf0pBHhPyFFO6WXQvZDMMTC9UAYdix7gUYoxZacD3G991EGNQ==</DQ><InverseQ>UGgCWK7oxTSUO0fAx60jRf/IZS8eTnNvswG61UI/cVAwv66cPPo78eP5sYd2TZNOSursMp82CBD7+5jkpJTluw==</InverseQ><D>JmougrBhWZ355eDdDkwxLCgVUfs+x4yW5hhi7BaQtxO8LVjOeZVytUxBf6TyDRtlZ/hOxCLZvBqpEn1ueLwLteYX2CPak4Ca7LrPdPyb5LF3zMfCg2i9Js1qyGVEZ09takGylYJTaRoUAjZiZyRHL5uefEZy6JPT3Pj2CXQvwQk=</D></RSAKeyValue>")

$rowcounter=0
$enc = [system.Text.Encoding]::UTF8
foreach ($row in $excel) {
    $colCounter=0
    foreach ($col in $row.PSObject.Properties) {
        
        if ($col.Value -ne $null) {
            $a=""+$col.Value            
            $filename=$worksheet+"_"+$a+".jpg"
            Write-Host "Filename = $filename for row=$rowcounter and col=$colCounter";
            $param=$worksheet+"&$rowCounter&$colCounter";           
            $data1 = $enc.GetBytes($param) 
            $endcrypt = $rsa.Encrypt($data1,$true)
            $encString=[System.Convert]::ToBase64String($endcrypt)
            Write-Host "RSA Encrypted: $encString"

            $url="http://130.61.61.100:8080/web/?id=$encString"
            $url=[uri]::EscapeDataString($url)
            Write-Host "Get QR Code for $url"
            Invoke-WebRequest -Uri "https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=$url"  -OutFile $filename
        }
        $colCounter++
    }
    $rowcounter++
}


