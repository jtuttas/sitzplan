$enc = [system.Text.Encoding]::UTF8
$string1 = "Hallo Welt" 
$data1 = $enc.GetBytes($string1) 


$endcrypt = $rsa.Encrypt($data1,$true)
$encString=[System.Convert]::ToBase64String($endcrypt)

$encString="iFNiwm73qLL7H61urgO99qZeFNx6bHYTC/0B8m28XQb41C+PyMApCJmFYEA9+w97Yj9/wJn5UVEFNC2fcqYiNdv5FSCkjITWOg6h3YQ+c4iu7RjiVlUxkdsjPG9nrCqL76A4Di3RsjNb22TuFoEVyr5K4EUuVReciSKLefLsVds="

$encByte = [System.Convert]::FromBase64String($encString)

$decryptedBytes = $rsa.Decrypt($encByte, $true)
[System.Text.Encoding]::ASCII.GetString($decryptedBytes)




# don't forget to dispose when you're done!
$rsa.Dispose() 