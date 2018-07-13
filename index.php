<?php
    $file = file_get_contents('js/config.json');
    $config = json_decode($file);
?><!DOCTYPE html>

<html manifest="cache.manifest">
    
    <head>

        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0" />
        <meta name="apple-mobile-web-app-capable" content="yes">
        
        <link rel="icon" type="image/ico" href="<?php echo $config->appurl ?>/assets/images/logo_blue.png" />

        <link rel="stylesheet" type="text/css" href="<?php echo $config->appurl ?>/assets/css/stylesheets/main.css">

        <script type="text/javascript" data-main="<?php echo $config->appurl ?>/js/main" src="<?php echo $config->appurl ?>/js/vendor/requirejs/require.js"></script>

        <title>Quantum Detectors</title>
                
    </head>
    
    <body></body>
</html>
