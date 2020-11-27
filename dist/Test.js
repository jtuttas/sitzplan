"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NodeRSA = require("node-rsa");
var key = new NodeRSA('-----BEGIN RSA PRIVATE KEY-----\n' +
    'MIICXAIBAAKBgQCctnEPAl/+daBarww9qFDURxhFO1bP4aJwZV1O+6FvOCjwYhg6\n' +
    'UmPUk2nztH5uZASUSfu0XXlk5Hd4FIo5oVHdW2dOH/R5aDjaEkIZ4Pzl2U7Vmc++\n' +
    '3YNfssjbflLIPYGg67RQvZAh/DcZAMI/Vp6OsnO8u5bd/eMXcss5yslJCwIDAQAB\n' +
    'AoGAJmougrBhWZ355eDdDkwxLCgVUfs+x4yW5hhi7BaQtxO8LVjOeZVytUxBf6Ty\n' +
    'DRtlZ/hOxCLZvBqpEn1ueLwLteYX2CPak4Ca7LrPdPyb5LF3zMfCg2i9Js1qyGVE\n' +
    'Z09takGylYJTaRoUAjZiZyRHL5uefEZy6JPT3Pj2CXQvwQkCQQDMHclXPy8bUitS\n' +
    '0WKDv0k1wScrSWBaq64Sy0F4R1lSzRk0iRdTlFPGH0HRj9B9t7wszcDWRMWXZiQH\n' +
    'U0oOQyM3AkEAxIwDSG8Oz6i4kXK6MxwYXtUtzy76Pg6ZH5dEtJY4X4PaWp6Pd0JL\n' +
    '2mJJFVcXdp+oQ81o1I3J0+iUr/1vfGGazQJBAIMaRq4hSTJ1Lpp9Hpecj3tVWsE0\n' +
    '2gyi5KXxo1WMDlVeoufZfgAS71P705y0kKePEfB9H3UAqyE5W77QwmoyuTUCQHO8\n' +
    'OqapduBC6sQC+a/k6FjXUQ1CDWsDb5lRmsx39KQR4T8hRTull0L2QzDEwvVAGHYs\n' +
    'e4FGKMWWnA9xvfdRBjUCQFBoAliu6MU0lDtHwMetI0X/yGUvHk5zb7MButVCP3FQ\n' +
    'ML+unDz6O/Hj+bGHdk2TTkrq7DKfNggQ+/uY5KSU5bs=\n' +
    '-----END RSA PRIVATE KEY-----');
var text = 'Hello RSA!';
var encrypted = key.encrypt(text, 'base64');
console.log('encrypted: ', encrypted);
var decrypted = key.decrypt(encrypted, 'utf8');
console.log('decrypted: ', decrypted);
//const d2 = key.decrypt("J3Tb5Ch6a6yVgfofsJo7Zj2fUCpsD2Zwhh59aPTXQDk0BNG1KiCv9O7LKHvZg3U+epbFLQ5NtX2DLyI2oJ5nwQ==", 'utf8');
//console.log('decrypted: ', decrypted);
//# sourceMappingURL=Test.js.map