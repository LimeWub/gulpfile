<!DOCTYPE html>
<html lang="en">
	<head>
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
		<title><?php echo $page->title; ?></title>
		
		<?php
			$cssCookie = $input->cookie->criticalCssLastMod;
			$cssCriticalPage = $config->paths->templates.'styles/'.$page->template->name.'_critical.min.css';
			$cssFileMain = $config->urls->templates.'styles/main.min.css';
			$cssLatestLastMod = filemtime($config->paths->templates.'styles/main.min.css'); //not sure if there's a more performant way to do this. Possibly.
			
			
			if( !( isset($cssCookie) && ($cssCookie == $cssLatestLastMod) ) && ($config->debug === false) ){ ?>
			<!-- Critical CSS -->
			
			<style>
				<?php include $cssCriticalPage; ?>
			</style>
			<noscript>
				<link rel="stylesheet" type="text/css" href="<?php echo $cssFileMain; ?>" />
			</noscript>

			<script>
			(function (win, doc) {
				'use strict';
				function loadCSS(e){function t(){var e,n;for(n=0;n<l.length;n+=1)l[n].href&&l[n].href.indexOf(r.href)>-1&&(e=!0);e?r.media="all":win.setTimeout(t)}var r=doc.createElement("link"),n=doc.getElementsByTagName("script")[0],l=doc.styleSheets;return r.rel="stylesheet",r.href=e,r.media="only x",n.parentNode.insertBefore(r,n),t(),r}
				loadCSS('<?php echo $cssFileMain; ?>');
				doc.cookie = 'criticalCssLastMod=<?php echo $cssLatestLastMod; ?>';
			}(this, this.document));
			</script>
			
			<!-- / Critical CSS -->
		<?php }else{?>
			<link rel="stylesheet" type="text/css" href="<?php echo $cssFileMain; ?>" />
		<?php } ?>
		
		
	</head>
	<body>
