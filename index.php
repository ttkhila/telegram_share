<?php
	session_start();
	//if(!isset($_SESSION['login']))
		//header('Location: aviso.php?a=2');
	include 'funcoes.php';
?>
<?php $topo = file_get_contents('topo.php'); echo $topo; //insere topo ?>
</head>
<body>
	<?php $menu = file_get_contents('menu.php'); echo login($menu); //insere menu ?>
	<!-- Conteúdo Principal: Início -->
	Sistema de Compartilhamento de Grupos - Fase Alpha Fechada<br />
	Clique em GRUPOS no menu acima.
	<!-- Conteúdo Principal: Fim -->
	<?php $rodape = file_get_contents('rodape.html'); echo $rodape; //insere rodapé ?>
	
</html>
