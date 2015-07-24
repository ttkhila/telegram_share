$(function(){ 
	var QTD_JOGOS_CADASTRO = 1;
	var JOGO_AUTOCOMPLETE;
	var FLAG_HISTORICO = 0;
	
	function IsEmail(email) {
	  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	  return regex.test(email);
	}
	
	//Altera TODAS as ocorr�ncias de um determinado parametro em uma string
	function replaceAll(string, token, newtoken) {
        while (string.indexOf(token) != -1) {
            string = string.replace(token, newtoken);
        }
        return string;
    }
    
	function abreModal(id, data, top){
		//id->ID do elemento que recebe o conteúdo (com#)
		//data->Conteúdo do elemento id
		//top->Altura do elemento chamador (que será parametro para a altura de id)
		var maskHeight = $(document).height();
		var maskWidth = $(window).width();
	
		$('#mask').css({'width':maskWidth,'height':maskHeight});
		$('#mask').fadeIn(1000);	
		$('#mask').fadeTo("slow",0.8);	

		var winH = $(window).height();
		var winW = $(window).width();
              
		$(id).css({ 'top': top-$(id).height()/2, 'left': winW/2-$(id).width()/2 });
	
		$(id).fadeIn(2000); 
		$(id).html(data);
	}
	
	function closeModal(){
		return '<a href="#" class="close">Fechar [X]</a><br />';
	}
	
	$('.window').on('click', '.close', function (e) {
		e.preventDefault();
		$('#mask').hide();
		$('.window').hide();
	});		
	
	$('#mask').click(function () {
		$(this).hide();
		$('.window').hide();
	});			
//********************************************************************************
//LOGIN
$("#frmLogin").submit(function(e){
	e.preventDefault(); //previne o evento 'normal'
		
	var $form = $(this).serialize();
	$form = decodeURI(replaceAll($form, '+', ' ')); //retira alguns caracteres especiais   
	$form = $form.split('&'); //transforma em array, separado pelo "&"
	var pars = { dados: $form, funcao: 'realizaLogin'};
	
	$.ajax({
		url: 'funcoes_ajax.php',
		type: 'POST',
		dataType: "json",
		contentType: "application/x-www-form-urlencoded;charset=UFT-8",
		data: pars,
		beforeSend: function() { $("img.pull-right").fadeIn('fast'); },
		complete: function(){ $("img.pull-right").fadeOut('fast'); },
		success: function(data){ 
			console.log(data);
			if(data[0] == 0){ //error
				$(".sp-erro-msg")
					.fadeIn('fast')
					.html(data[1]+"<span>x</span>");
			} else {
				$(location).attr('href', 'index.php');
			} 			
		}
	});
});
//********************************************************************************
$("#deslogar").click(function(e){
	e.preventDefault(); //previne o evento 'normal'
	
	var pars = { funcao: 'realizaLogout'};
	$.ajax({
		url: 'funcoes_ajax.php',
		type: 'POST',
		//dataType: "json",
		//contentType: "application/x-www-form-urlencoded;charset=UFT-8",
		data: pars,
		beforeSend: function() { $("img.pull-right").fadeIn('fast'); },
		complete: function(){ $("img.pull-right").fadeOut('fast'); },
		success: function(){ 
			$(location).attr('href', 'index.php');	
		}
	});
});
//********************************************************************************	
//TOOLTIP
$('.masterTooltip').hover(function(){
	// Hover over code
	var title = $(this).attr('title');
	$(this).data('tipText', title).removeAttr('title');
	$('<p class="tooltip_help"></p>')
	.html(title)
	.appendTo('body')
	.slideDown('fast');
}, function() {
    // Hover out code
    $(this).attr('title', $(this).data('tipText'));
    $('.tooltip_help').remove();
}).mousemove(function(e) {
    var mousex = e.pageX + 15; //Get X coordinates
    var mousey = e.pageY + 3; //Get Y coordinates
    $('.tooltip_help')
    	.css({ top: mousey, left: mousex });
}).click(function(e){
	e.preventDefault(); //previne o evento 'normal'
});
//********************************************************************************
//AUTOCOMPLETE 
//Original 1
$('#original1_autocomplete').simpleAutoComplete('autocomplete_ajax.php',{
autoCompleteClassName: 'autocomplete',
	selectedClassName: 'sel',
	attrCallBack: 'rel',
	identifier: 'original1'
},original1Callback);

function original1Callback( par ){ 
	$('#original1_autocomplete').val(par[1]);
	$('#original1_id').val(par[0]);
}

//Original 2
$('#original2_autocomplete').simpleAutoComplete('autocomplete_ajax.php',{
autoCompleteClassName: 'autocomplete',
	selectedClassName: 'sel',
	attrCallBack: 'rel',
	identifier: 'original2'
},original2Callback);

function original2Callback( par ){ 
	$('#original2_autocomplete').val(par[1]);
	$('#original2_id').val(par[0]);
}

//Fantasma - "Original 3"
$('#original3_autocomplete').simpleAutoComplete('autocomplete_ajax.php',{
autoCompleteClassName: 'autocomplete',
	selectedClassName: 'sel',
	attrCallBack: 'rel',
	identifier: 'original3'
},original3Callback);

function original3Callback( par ){ 
	$('#original3_autocomplete').val(par[1]);
	$('#original3_id').val(par[0]);
}

//jogos
$("#div-novo-grupo").on("keydown","[name='jogo[]']",function(e) {
    if (!$(this).data("simpleAutoComplete")) { 
		JOGO_AUTOCOMPLETE = $(this).attr('id').split("_")[0];
		var tecla = e.which;
		if(tecla != 9 && tecla != 13){
			$("#"+JOGO_AUTOCOMPLETE+"_id").val("");
			$('#'+JOGO_AUTOCOMPLETE+'_check img').prop({'src':"img/uncheck.png"});
		}
        $(this).simpleAutoComplete(
            'autocomplete_jogos_ajax.php',{
				autoCompleteClassName: 'autocomplete',
				selectedClassName: 'sel',
				attrCallBack: 'rel',
				identifier: 'jogo'
			},jogoCallback);
    }
});
function jogoCallback( par ){ 
	$('#'+JOGO_AUTOCOMPLETE+'_autocomplete').val(par[1]);
	$('#'+JOGO_AUTOCOMPLETE+'_id').val(par[0]);
	$('#'+JOGO_AUTOCOMPLETE+'_check img').prop({'src':"img/check.png"});
}

$("#div-novo-grupo").on("blur","[name='jogo[]']",function(e) {
	//apaga o campo de ID se o nome do jogo foi apagado pelo usuário
	var dado = $(this).attr('id').split("_")[0];
	if($(this).val() == ""){
		$("#"+dado+"_id").val("");
		$('#'+dado+'_check img').prop({'src':"img/uncheck.png"});
	}
});
//********************************************************************************
$("#btn-add-jogo").click(function(e){
	e.preventDefault(); //previne o evento 'normal'
	QTD_JOGOS_CADASTRO++;
	var $html = "<div><span class='sp-form'>Jogo "+QTD_JOGOS_CADASTRO+":</span>";
	$html += "<input type='hidden' name='jogo_id[]' id='jogo"+QTD_JOGOS_CADASTRO+"_id' />";
	$html += "<input type='text' name='jogo[]' id='jogo"+QTD_JOGOS_CADASTRO+"_autocomplete' autocomplete='off' style='width:250px;' placeholder='Digite parte do nome do jogo' />";
	$html += "<span class='sp-form' id='jogo"+QTD_JOGOS_CADASTRO+"_check'><img scr='' /></span></div>";
	$("#div-jogos-extras").append($html);
});
//********************************************************************************
//fecha div erro
$(".sp-erro-msg").on("click", "span", function(){
	$(this).parent().hide();
});
//********************************************************************************
$(".btn-limpar").click(function(e){
	e.preventDefault(); //previne o evento 'normal'
	var id = $(this).attr('id');
	$("#original"+id+"_id").val("");
	$("#original"+id+"_autocomplete").val("");
	$("#valor"+id).val("");
});
//********************************************************************************
$("#btn-grupo-novo").click(function(e){
	var $campos = ["nome", "email", "original1_id", "valor1", "original2_id", "valor2", "original3_id", "valor3" ];
	var $dados = new Array();
	if($("#fechado").is(':checked')){ $('#email').attr('required', 'required');  $fechado = 1;}//se marcar grupo como FECHADO, assinala EMAIL como requerido
	else {$('#email').attr('required', false);  $fechado = 0; }
	
	// "escuta" os campos requeridos e os campos de valor
	cont = 0;
	$("#div-novo-grupo").find("input").each(function(){
		$valor = $.trim($(this).val());
		
		if($(this).attr('required') && $valor == ''){
			$(".sp-erro-msg")
				.fadeIn()
				.html("Campo Requerido"+"<span>x</span>");
			$(this).focus();
			cont++;
		}
		
		if($(this).attr('name') == 'valor'){
			$valor = $valor.replace(",", ".");
			if(!$.isNumeric($valor) && $valor != ""){
				$(".sp-erro-msg")
					.fadeIn()
					.html("Valor precisa ser numérico"+"<span>x</span>");
				$(this).focus();
				cont++;
			}
		}	
		
		if($.inArray($(this).attr('id'), $campos) >=0 || $(this).attr("name") == "jogo_id[]")
			$dados.push($(this).attr('id')+"%=%"+$valor); //preenche array com os dados do form
	});
	if(cont > 0) return false;
		
	//verifica se usuário colocou seu ID numa das vagas
	cont = 0;
	var selfID = $("#selfID").val(); //ID do próprio usuario logado
	$("#div-novo-grupo").find("[name*='_id']").each(function(){
		$id = $(this).val();
		if($id != "" && $id == selfID)
			cont++;
	});
	
	if(cont <= 0){
		$(".sp-erro-msg")
			.fadeIn()
			.html("É necessário informar seu próprio ID numa das vagas do grupo."+"<span>x</span>");
		$("#original1_autocomplete").focus();
		return false;
	} 
	
	//verifica se o email digitado é válido
	if($("#email").val() != ""){
		if(!IsEmail($("#email").val())){
			$(".sp-erro-msg")
				.fadeIn()
				.html("E-mail Inválido"+"<span>x</span>");
			$("#email").focus();
			return false;
		}
	}
	
	$dados.push("moeda_id%=%"+$("#moedas option:selected").val());
	$moeda_nome = $("#moedas option:selected").text(); 
	$dados.push("fechado%=%"+$fechado);
	$(".sp-erro-msg").fadeOut();
	//console.log($dados);

	var pars = { dados: $dados, id: selfID, fechado: $fechado, moeda: $moeda_nome, funcao: 'novoGrupo'};
	$.ajax({
		url: 'funcoes_ajax.php',
		type: 'POST',
		dataType: "json",
		contentType: "application/x-www-form-urlencoded;charset=UFT-8",
		data: pars,
		beforeSend: function() { $("img.pull-right").fadeIn('fast'); },
		complete: function(){ $("img.pull-right").fadeOut('fast'); },
		success: function(data){ 
			console.log(data);
			if(data == 1){ //sucesso
				location.reload();
			} else { //erro
				$error = "";
				$.each(data, function(i, item) {
					var qtd = item.length;
					for(var z=0;z<qtd;z++)
						$error += item[z]+"<br />";
				});
				$(document).scrollTop( $("#foco").offset().top );
				$(".sp-erro-msg")
					.fadeIn()
					.html($error+"<span>x</span>");
			}
		}
	});
});

//********************************************************************************
//LISTAGEM DE GRUPOS
$("#div-listagem-grupos").find("[name='div-casulo-grupo'] img").click(function(){
	var $id = $(this).parent().parent().attr('id').split("_")[1]; //ID do grupo
	if($(this).attr("id") == "_0"){
		$("#grupo-conteudo_"+$id)
			.slideUp();
		$(this).prop("id", "_1");
		$(this).prop("src", "img/plus.png");
		return false;
	}
	var $elem = $(this);
		
	var pars = { id: $id, funcao: 'mostraGrupo'};
	$.ajax({
		url: 'funcoes_ajax.php',
		type: 'POST',
		dataType: "json",
		contentType: "application/x-www-form-urlencoded;charset=UFT-8",
		data: pars,
		beforeSend: function() { $("img.pull-right").fadeIn('fast'); },
		complete: function(){ $("img.pull-right").fadeOut('fast'); },
		success: function(data){ 
			console.log(data);
			$("#grupo-conteudo_"+$id)
				.html(data)
				.slideDown();
			
			$elem.prop("src", "img/minus.png");
			$elem.prop("id", "_0");
		}
	});
});
//********************************************************************************
$(".casulo-grupo-conteudo").on("click", "[name='historico-grupo']", function(e){
	e.preventDefault();
	/*
	//$flag = $("#hidFlag").val();
	if($flag == '1'){
		$("#div-historico-grupo")
			.html("")
			.hide();
		$("#hidFlag").val("0");
		$elem.text("Ver Histórico");
		return;
	}
	*/
	$elem = $(this);
	$elemTop = parseInt($elem.offset().top);
	//alert($elemTop);return;
	$idGrupo = $(this).attr("id").split("_")[1];
	var pars = { id: $idGrupo, funcao: 'mostraHistorico'};
	$.ajax({
		url: 'funcoes_ajax.php',
		type: 'POST',
		dataType: "json",
		contentType: "application/x-www-form-urlencoded;charset=UFT-8",
		data: pars,
		beforeSend: function() { $("img.pull-right").fadeIn('fast'); },
		complete: function(){ $("img.pull-right").fadeOut('fast'); },
		success: function(data){ 
			console.log(data);
			//$("#div-historico-grupo").show().css("top", ($elemTop-100)).html(data);
			abreModal("#dialog", closeModal()+data, $elemTop);
			//$("#hidFlag").val("1");
			//$elem.text("Fechar");
		}
	});
});

//********************************************************************************

//********************************************************************************

//********************************************************************************

//********************************************************************************

//********************************************************************************  

//********************************************************************************  

//********************************************************************************  

//********************************************************************************  

//********************************************************************************  

//********************************************************************************  

//******************************************************************************** 

//******************************************************************************** 

//********************************************************************************

});
