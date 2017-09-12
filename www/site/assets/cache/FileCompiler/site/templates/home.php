<?php
echo 'livereload is epic!! huehue';
 include(\ProcessWire\wire('files')->compile(\ProcessWire\wire("config")->paths->root . "site/templates/page.php",array('includes'=>true,'namespace'=>true,'modules'=>true,'skipIfNamespace'=>true))); 
