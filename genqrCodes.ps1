<#
Hier sind noch ggf. Anpassungen zu machen. So muss das PEM File des RSA Keys in das XML Format gewandelt
werden. Dieses kann online über den Dienst https://superdry.apphb.com/tools/online-rsa-key-converter erfolgen
#>
$rsa = New-Object -TypeName System.Security.Cryptography.RSACryptoServiceProvider
$rsa.FromXmlString("<RSAKeyValue><Modulus>nLZxDwJf/nWgWq8MPahQ1EcYRTtWz+GicGVdTvuhbzgo8GIYOlJj1JNp87R+bmQElEn7tF15ZOR3eBSKOaFR3VtnTh/0eWg42hJCGeD85dlO1ZnPvt2DX7LI235SyD2BoOu0UL2QIfw3GQDCP1aejrJzvLuW3f3jF3LLOcrJSQs=</Modulus><Exponent>AQAB</Exponent><P>zB3JVz8vG1IrUtFig79JNcEnK0lgWquuEstBeEdZUs0ZNIkXU5RTxh9B0Y/Qfbe8LM3A1kTFl2YkB1NKDkMjNw==</P><Q>xIwDSG8Oz6i4kXK6MxwYXtUtzy76Pg6ZH5dEtJY4X4PaWp6Pd0JL2mJJFVcXdp+oQ81o1I3J0+iUr/1vfGGazQ==</Q><DP>gxpGriFJMnUumn0el5yPe1VawTTaDKLkpfGjVYwOVV6i59l+ABLvU/vTnLSQp48R8H0fdQCrITlbvtDCajK5NQ==</DP><DQ>c7w6pql24ELqxAL5r+ToWNdRDUINawNvmVGazHf0pBHhPyFFO6WXQvZDMMTC9UAYdix7gUYoxZacD3G991EGNQ==</DQ><InverseQ>UGgCWK7oxTSUO0fAx60jRf/IZS8eTnNvswG61UI/cVAwv66cPPo78eP5sYd2TZNOSursMp82CBD7+5jkpJTluw==</InverseQ><D>JmougrBhWZ355eDdDkwxLCgVUfs+x4yW5hhi7BaQtxO8LVjOeZVytUxBf6TyDRtlZ/hOxCLZvBqpEn1ueLwLteYX2CPak4Ca7LrPdPyb5LF3zMfCg2i9Js1qyGVEZ09takGylYJTaRoUAjZiZyRHL5uefEZy6JPT3Pj2CXQvwQk=</D></RSAKeyValue>")

# Pfad zur Excel Tabelle
$excelFile="c:/Users/jtutt/OneDrive - Multi-Media Berufsbildende Schulen/Sitzplan.xlsx"
$wordFile="$PSScriptRoot/Vorlage.doc"

$word = New-Object -ComObject Word.Application
$wordDocument = $word.Documents.open($wordFile)
$Selection = $Word.Selection
#Uncomment to make the Word Document visible
$Word.Visible = $True 


$worksheet=Read-Host "Bezeichnung des Karteireiters:" 
$excel=Import-Excel $excelFile -NoHeader -WorksheetName $worksheet

$rowcounter=0
$Cellcounter=0
$maxrid=0
$enc = [system.Text.Encoding]::UTF8
foreach ($row in $excel) {
    $colCounter=0
    foreach ($col in $row.PSObject.Properties) {
        # erste Zeile wird ignoriert!
        if ($rowcounter -gt 0) {
            if ($col.Value -ne $null) {
                $a=""+$col.Value            
                $filename=$worksheet+"_"+$a+".jpg"
                Write-Host "Filename = $filename for row=$rowcounter and col=$colCounter";
                $param='{"room":"'+$worksheet+'","row":'+$rowCounter+',"col":'+$colCounter+'}';           
                Write-Host "Parameter:$param"
                $data1 = $enc.GetBytes($param) 
                $endcrypt = $rsa.Encrypt($data1,$true)
                $encString=[System.Convert]::ToBase64String($endcrypt)
                Write-Host "RSA Encrypted: $encString"                
                $encString=$encString.Replace("+","%2B") # Musste eingefügt werden beim Dienst qrickit (bei Google ging es auch Ohne) 
                $encString=[uri]::EscapeDataString($encString)
            
                Write-Host "RSA Encrypted URL Encoded: $encString"
                $url="http://splan.joerg-tuttas.de/web/?id=$encString&room=$worksheet"
                $url=[uri]::EscapeDataString($url)
            
                Write-Host "Get QR Code for $url"
                #Invoke-WebRequest -Uri "https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=$url"  -OutFile $filename
                Invoke-WebRequest -uri "https://qrickit.com/api/qr.php?d=$url&addtext=$filename&qrsize=300&t=j&e=m"  -OutFile $filename
                # Wenn die QR Code gleich ausgedruckt werden sollen den Kommentar in der unteren Zeile löschen
                #get-childitem $filename | ForEach-Object {Start-Process -FilePath $_.FullName -Verb Print}
                

                #Write-Host "CellCounter=$Cellcounter"
                $rid=1+[math]::Truncate($Cellcounter/3)
                $cid=($Cellcounter%3)+1
                if ($cid -eq 2) {
                    $cid=3
                }
                elseif ($cid -eq 3) {
                    $cid=5
                }
                if ($rid -gt $maxrid) {
                    $wordDocument.Tables.Item(1).Rows.add($wordDocument.Tables.Item(1).Rows[$rid])
                    $maxrid=$rid;
                }
                $cell=$wordDocument.Tables.Item(1).Rows[$rid].Cells[$cid]


                #Write-Host "Print Cell $rid / $cid" -BackgroundColor DarkGreen
                $Cellcounter++;
                $Selection = $Word.Selection
                $cell.Select()
                $img=$Selection.InlineShapes.AddPicture("$HOME/$filename")
                $img.Width=130
                $img.Height=130
                #$shape=$img.ConvertToShape()
                #$shape.top=5
                #$shape.Left=110            
                $Selection.TypeParagraph()    
            }
        }
        $colCounter++
    }
    $rowcounter++
}


