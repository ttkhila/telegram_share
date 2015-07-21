<?php
	session_start();
	if(isset($_SESSION['login']))
		header('Location: grupos.php');
	
	include 'funcoes.php';
?>
<?php $topo = file_get_contents('topo.php'); echo $topo; //insere topo ?>
</head>
<body>
	<?php $menu = file_get_contents('menu.php'); echo login($menu); //insere menu ?>
		<!-- Conteúdo Principal: Início --> 
		<form id="frmLogin" name="frmLogin" method="post">
			<h2>Login</h2>
			<div class="sp-erro-msg" style="display:none;"></div><!-- mensagem de erro -->
			<span>PSN ID:</span>
			<input type="text" name="login" id="login"  maxlength="16" required="" /><br /><br />
			
			<span>Senha:</span>
			<input type="password" name="senha" id="senha" maxlength="10" required="" /><br /><br />
			
			<span></span>
			<button class="btn-padrao">Confirmar</button>
		</form>
		<!-- Conteúdo Principal: Fim -->
	<?php $rodape = file_get_contents('rodape.html'); echo $rodape; //insere rodapé ?>
	
</html>
