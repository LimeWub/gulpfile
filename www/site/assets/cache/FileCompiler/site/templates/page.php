<?php
 include(\ProcessWire\wire('files')->compile('chunks/head.php',array('includes'=>true,'namespace'=>true,'modules'=>true,'skipIfNamespace'=>true)));
 include(\ProcessWire\wire('files')->compile('chunks/header.php',array('includes'=>true,'namespace'=>true,'modules'=>true,'skipIfNamespace'=>true)));
?>

<h1><?php echo $page->title; ?></h1>
<?php if($page->editable()) echo "<p><a href='$page->editURL'>Edit</a></p>"; ?>
Content goes here

<?php
 include(\ProcessWire\wire('files')->compile('chunks/footer.php',array('includes'=>true,'namespace'=>true,'modules'=>true,'skipIfNamespace'=>true)));
 include(\ProcessWire\wire('files')->compile('chunks/foot.php',array('includes'=>true,'namespace'=>true,'modules'=>true,'skipIfNamespace'=>true)));
?>