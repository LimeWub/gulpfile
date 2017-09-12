<?php
include 'chunks/head.php';
include 'chunks/header.php';
?>

<h1><?php echo $page->title; ?></h1>
<?php if($page->editable()) echo "<p><a href='$page->editURL'>Edit</a></p>"; ?>
Content goes here

<?php
include 'chunks/footer.php';
include 'chunks/foot.php';
?>