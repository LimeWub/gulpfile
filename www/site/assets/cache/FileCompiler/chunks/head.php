<!DOCTYPE html>
<html lang="en">
	<head>
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
		<title><?php echo $page->title; ?></title>
		
		<!-- Critical CSS -->
		<?php
			$cssCookie = $input->cookie->criticalCssVersion; //store version of CSS in cookie eg.1,2,3,4....,1000
			$cssCriticalPage = $config->urls->templates.'styles/'.$page->template->ame.'.min.css';
			$cssFileMain = $config->urls->templates.'styles/main.min.css';
			$cssLatestVersion = 1;
			
			if( !( isset($cssCookie) && ($cssCookie == $cssLatestVersion) ) && ($config->debug === false) ){ ?>

			<style>
				<?php include(\ProcessWire\wire('files')->compile($cssCriticalPage,array('includes'=>true,'namespace'=>true,'modules'=>true,'skipIfNamespace'=>true))); ?>
			</style>
			<noscript>
				<link rel="stylesheet" type="text/css" href="<?php echo $cssFileMain; ?>" />
			</noscript>

			<script>
			(function (win, doc) {
				'use strict';
				function loadCSS(e){function t(){var e,n;for(n=0;n<l.length;n+=1)l[n].href&&l[n].href.indexOf(r.href)>-1&&(e=!0);e?r.media="all":win.setTimeout(t)}var r=doc.createElement("link"),n=doc.getElementsByTagName("script")[0],l=doc.styleSheets;return r.rel="stylesheet",r.href=e,r.media="only x",n.parentNode.insertBefore(r,n),t(),r}
				loadCSS('<?php echo $cssFileMain; ?>');
				doc.cookie = 'criticalCssVersion=<?php echo $cssLatestVersion; ?>';
			}(this, this.document));
			</script>
			
		<?php }?>
		<!-- / Critical CSS -->
		
	</head>
	<body>
