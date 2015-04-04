/**
 * @author JuanPablo
 */

//funciones y variables 

function arrayTo0(_items, arreglo){
	 for(i=0; i<_items;i++){
        arreglo[i] = 0;
    };
};

var items;
var itemsProm;
var notas = [];
var porcentajes = [];
var notasFinales = [];
var notaFinal = 0;
var porcentajesFinales = 0;

//Mostrar y quitar el pop-up
function hide(){
	var pop = document.getElementById('pop-up');
	pop.style.display = "none";
	$('#resultados').hide();
}

function calcular(pcento, nota){

    var notaFinal = nota*(pcento/100);

    return notaFinal;
};


function ArmarElemento(_items){
	var items = _items;
	var str = "";
	var Elementos = "";
	for(i=0; i<items; i++){
		
		str = ['<div>'
		 +'<input type="text" id="materia+'+i+'" class="materia">'
         +'<input type="text" id="porcentaje'+i+'" class="porcentaje">'
         +'<input type="text" id="nota'+i+'" class="nota">'
		+'</div>'];
		
		Elementos = Elementos + str;
		}
	return Elementos;
}

function ArmarElementoProm(_items){
	var items = _items;
	var str = "";
	var Elementos = "";
	for(i=0; i<items; i++){
		
		str = ['<div>'
		 +'<input type="text" id="materia+'+i+'" class="materia1">'
         +'<input type="text" id="porcentaje'+i+'" class="credito">'
         +'<input type="text" id="nota'+i+'" class="notaProm">'
		+'</div>'];
		
		Elementos = Elementos + str;
		}
	return Elementos;
}

//main del programa
$(function(){
		
	function getWorkspacepositiontop(){
		var getWorkspaceposition = $('#workspace').position();
		return getWorkspaceposition.top;
	};
	
	function getWorkspacepositionleft(){
		var getWorkspaceposition = $('#CalNote').position();
		return getWorkspaceposition.left;
	};
	
	function getWorkspacewidth(){
		var getWorkspacewidth = $('#CalNote').width();
		return getWorkspacewidth;
	};
	
	function getWorkspaceheight(){
		var getWorkspaceheight = $('#CalNote').height();
		return getWorkspaceheight;
	};
	
	$(window).resize(function(){
		$('#CalProm').css("width", getWorkspacewidth());
		$('#CalProm').css("height", getWorkspaceheight());
		$('#CalProm').css("left", getWorkspacepositionleft());
		$('#CalProm').css("top", getWorkspacepositiontop());
	});
		
		$('#iniciarCalculo').hide();
		$('#iniciarCalculoProm').hide();
		$('#cleanNote').hide();
		$('#cleanProm').hide();
	
	//Cambiar fondo de los botones
	var menu1 = document.getElementById('menu1');
	var menu2 = document.getElementById('menu2');
	
	menu1.onmouseover = function(){
		$('#menu1').addClass("fondoBlanco");
		$('#me1').addClass("letraNegra");
	};
	menu1.onmouseout = function(){
		$('#menu1').removeClass("fondoBlanco");
		$('#me1').removeClass("letraNegra");
	};
	
	menu2.onmouseover = function(){
		$('#menu2').addClass("fondoBlanco");
		$('#me2').addClass("letraNegra");
	};
	menu2.onmouseout = function(){
		$('#menu2').removeClass("fondoBlanco");
		$('#me2').removeClass("letraNegra");
	};
	
	
	
	
	//Cambiar la pantalla del workspace
	$('#menu1').click(function(){
		$('#resultspace').show()	;
		$('#resultspaceProm').hide()	;
		$('#CalNote').css("z-index", "1");
		$('#CalProm').css("z-index", "0");

	});
	
	$('#menu2').click(function(){
		$('#resultspaceProm').show()	;
		$('#resultspace').hide()	;
		$('#CalProm').css("width", getWorkspacewidth());
		$('#CalProm').css("height", getWorkspaceheight());
		$('#CalProm').css("left", getWorkspacepositionleft());
		$('#CalProm').css("top", getWorkspacepositiontop());
		$('#CalNote').css("z-index", "0");
		$('#CalProm').css("z-index", "1");
		$('#CalProm').show();
		
	});
	
	
	$('#seleccionNotas').click(function(){
		$('#resultspace').empty()	;
		items = $('#cantidad').val();	
		$('#resultspace').append(ArmarElemento(items))	;
		$('#iniciarCalculo').show();
		$('#cleanNote').show();
	
	});
	
		$('#seleccionMat').click(function(){
		$('#resultspaceProm').empty()	;
		itemsProm = $('#cantidadMat').val();	
		$('#resultspaceProm').append(ArmarElementoProm(itemsProm))	;
		$('#iniciarCalculoProm').show();
		$('#cleanProm').show();
	
	});
	
	
	//El algoritmo de calcular y mostrar la informacion para CalNote
	$('#iniciarCalculo').click(function(){
		$('#resultados').empty();
		var error = "<h2 style='position:relative; top:20%; display:block;'>Ha ocurrido un error:</h2>";
		var success = "<h2 style='position:relative; top:20%; display:block;'>Su nota es:</h2>";
		var showResultado = "";
		porcentajesFinales = 0;
		notaFinal = 0;
		cancel = false;	
		var tempnotas = [];
		var tempporcentajes = [];
		tempporcentajes = $('.porcentaje');
		tempnotas = $('.nota');
		tempnotasDOM = $('.nota');
		
		for(i=0; i<items; i++){
			//asignar los valores al vector porcentajes
			tempporcentajes[i] = $(tempporcentajes[i]).val();
			porcentajes[i] = parseFloat(tempporcentajes[i]);
			//asignar los valores al vector notas
			tempnotas[i] = $(tempnotas[i]).val();
			notas[i] = parseFloat(tempnotas[i]);
			//validar notas
			if(notas[i] < 0 || notas[i] > 5){
				cancel = true;
				tempnotasDOM[i].style.color = "red";
			}
			else{
				tempnotasDOM[i].style.color = "black";
			}
			//calcular el total de los porcentajes
			porcentajesFinales = porcentajesFinales + porcentajes[i];
			//calcular la nota con su porcentaje
			notasFinales[i] = calcular(porcentajes[i], notas[i]);
			notaFinal = notaFinal + notasFinales[i];
			
		}
		
		notaFinal = notaFinal.toFixed(1);
		
		if(porcentajesFinales == 100){
			if(cancel == false){
				showResultado = success + '<h2 id="notaSuccess" style="position:relative; top:5%; display:block;">' + notaFinal + '</h2>';
				$('#resultados').append(showResultado);
				if(notaFinal < 3.3){
					document.getElementById("notaSuccess").style.color = "red";
				}
				else if(notaFinal > 4){
					document.getElementById("notaSuccess").style.color = "green";
				}
				else if(notaFinal < 4 && notaFinal > 3.3){
					document.getElementById("notaSuccess").style.color = "black";
				}
			}
			else{
				showResultado = error + "<h2 style='position:relative; top:5%; display:block;'>Una o mas notas inválidas</h2>";
				$('#resultados').append(showResultado);
			}
		}
		else{
			showResultado = error + "<h2 style='position:relative; top:5%; display:block;'>Los porcentajes no suman 100%</h2>";
			$('#resultados').append(showResultado);
		}
		
		$('#pop-up').show();
		$('#resultados').show();
	});
	
	 
	 
	 
	 
	 //El algoritmo de calcular y mostrar la informacion para CalProm
	 $('#iniciarCalculoProm').click(function(){
	 	$('#resultados').empty();
		var error = "<h2 style='position:relative; top:20%; display:block;'>Ha ocurrido un error:</h2>";
		var success = "<h2 style='position:relative; top:20%; display:block;'>Su promedio del semestre es:</h2>";
		var showResultado = "";
		cancel = false;	
		var cred = [];
		var defs = [];
		var pts = [];
		var ptsTot = 0;
		var credTot = 0;
		var pond = 0;
		var tempcred = [];
		var tempdefs = [];
		tempcred = $('.credito');
		tempdefs = $('.notaProm');
		tempdefsDOM = $('.notaProm');
	 	
	 	for(i=0;i<itemsProm;i++){
	 		//asignar valores a cred
	 		tempcred[i] = $(tempcred[i]).val();
			cred[i] = parseFloat(tempcred[i]);
			//asignar los valores a defs
			tempdefs[i] = $(tempdefs[i]).val();
			defs[i] = parseFloat(tempdefs[i]);
			
			if(defs[i] < 0 || defs[i] > 5){
				cancel = true;
				tempdefsDOM[i].style.color = "red";
			}
			else{
				tempdefsDOM[i].style.color = "black";
			}
			
			credTot = credTot + cred[i];
			pts[i] = cred[i]*defs[i];
			ptsTot = ptsTot + pts[i];
	 	}
	 	
	 	pond = ptsTot/credTot;
	 	pond = pond.toFixed(1);
	 	if(credTot > 0){

			if(cancel == false){
				showResultado = success + '<h2 id="notaSuccess" style="position:relative; top:5%; display:block;">' + pond + '</h2>';
				$('#resultados').append(showResultado);
				if(pond < 3){
					document.getElementById("notaSuccess").style.color = "red";
				}
				else if(pond > 4){
					document.getElementById("notaSuccess").style.color = "green";
				}
				else if(pond < 4 && pond > 3){
					document.getElementById("notaSuccess").style.color = "black";
				}
			}
			else{
				showResultado = error + "<h2 style='position:relative; top:5%; display:block;'>Una o mas notas inválidas</h2>";
				$('#resultados').append(showResultado);
			}
			}
		else {
			showResultado = error + "<h2 style='position:relative; top:5%; display:block;'>Ingrese todos los créditos</h2>";
			$('#resultados').append(showResultado);
	 		cancel == true;
	 	}
		
			
		
		
	 	$('#pop-up').show();
		$('#resultados').show();
	 	
	 	});
	 	
	 	$('#CalProm').css("width", getWorkspacewidth());
		$('#CalProm').css("height", getWorkspaceheight());
		$('#CalProm').css("left", getWorkspacepositionleft());
		$('#CalProm').css("top", getWorkspacepositiontop());
		$('#CalProm').hide();
		
		//Cleans
		$('#cleanNote').click(function(){
			$('.materia').val('');
			$('.porcentaje').val('');
			$('.nota').val('');
		});
		
		$('#cleanProm').click(function(){
			$('.materia1').val('');
			$('.credito').val('');
			$('.notaProm').val('');
			
		});
		
		$('#predefs').change(function(){
			
			if($('#predefs').val() == "IngSis1"){
				armarDefs(5);
				var defsMat = $('.materia1');
				var defsCred = $('.credito');

				$(defsMat[0]).val(IngSisSem1.materia0);
				$(defsMat[1]).val(IngSisSem1.materia1);
				$(defsMat[2]).val(IngSisSem1.materia2);
				$(defsMat[3]).val(IngSisSem1.materia3);
				$(defsMat[4]).val(IngSisSem1.materia4);
				$(defsCred[0]).val(IngSisSem1.creditos0);
				$(defsCred[1]).val(IngSisSem1.creditos1);
				$(defsCred[2]).val(IngSisSem1.creditos2);
				$(defsCred[3]).val(IngSisSem1.creditos3);
				$(defsCred[4]).val(IngSisSem1.creditos4);
			}
			
			if($('#predefs').val() == "IngInd1"){
				armarDefs(5);
				var defsMat = $('.materia1');
				var defsCred = $('.credito');

				$(defsMat[0]).val(IngsSem1.materia0);
				$(defsMat[1]).val(IngsSem1.materia1);
				$(defsMat[2]).val(IngsSem1.materia2);
				$(defsMat[3]).val(IngsSem1.materia3);
				$(defsMat[4]).val("Introduccion Ing Industrial");
				$(defsCred[0]).val(IngsSem1.creditos0);
				$(defsCred[1]).val(IngsSem1.creditos1);
				$(defsCred[2]).val(IngsSem1.creditos2);
				$(defsCred[3]).val(IngsSem1.creditos3);
				$(defsCred[4]).val(IngsSem1.creditos4);
			}
			
			if($('#predefs').val() == "IngCiv1"){
				armarDefs(5);
				var defsMat = $('.materia1');
				var defsCred = $('.credito');

				$(defsMat[0]).val(IngsSem1.materia0);
				$(defsMat[1]).val(IngsSem1.materia1);
				$(defsMat[2]).val(IngsSem1.materia2);
				$(defsMat[3]).val(IngsSem1.materia3);
				$(defsMat[4]).val("Introduccion Ing Civil");
				$(defsCred[0]).val(IngsSem1.creditos0);
				$(defsCred[1]).val(IngsSem1.creditos1);
				$(defsCred[2]).val(IngsSem1.creditos2);
				$(defsCred[3]).val(IngsSem1.creditos3);
				$(defsCred[4]).val(IngsSem1.creditos4);
			}
			
			if($('#predefs').val() == "IngMec1"){
				armarDefs(5);
				var defsMat = $('.materia1');
				var defsCred = $('.credito');

				$(defsMat[0]).val(IngsSem1.materia0);
				$(defsMat[1]).val(IngsSem1.materia1);
				$(defsMat[2]).val(IngsSem1.materia2);
				$(defsMat[3]).val(IngsSem1.materia3);
				$(defsMat[4]).val("Introduccion Ing Mecanica");
				$(defsCred[0]).val(IngsSem1.creditos0);
				$(defsCred[1]).val(IngsSem1.creditos1);
				$(defsCred[2]).val(IngsSem1.creditos2);
				$(defsCred[3]).val(IngsSem1.creditos3);
				$(defsCred[4]).val(IngsSem1.creditos4);
			}
			
			if($('#predefs').val() == "IngTrica1"){
				armarDefs(5);
				var defsMat = $('.materia1');
				var defsCred = $('.credito');

				$(defsMat[0]).val(IngsSem1.materia0);
				$(defsMat[1]).val(IngsSem1.materia1);
				$(defsMat[2]).val(IngsSem1.materia2);
				$(defsMat[3]).val(IngsSem1.materia3);
				$(defsMat[4]).val("Introduccion Ing Electrica");
				$(defsCred[0]).val(IngsSem1.creditos0);
				$(defsCred[1]).val(IngsSem1.creditos1);
				$(defsCred[2]).val(IngsSem1.creditos2);
				$(defsCred[3]).val(IngsSem1.creditos3);
				$(defsCred[4]).val(IngsSem1.creditos4);
			}
			
			if($('#predefs').val() == "IngTronica1"){
				armarDefs(5);
				var defsMat = $('.materia1');
				var defsCred = $('.credito');

				$(defsMat[0]).val(IngsSem1.materia0);
				$(defsMat[1]).val(IngsSem1.materia1);
				$(defsMat[2]).val(IngsSem1.materia2);
				$(defsMat[3]).val(IngsSem1.materia3);
				$(defsMat[4]).val("Introduccion Ing Electronica");
				$(defsCred[0]).val(IngsSem1.creditos0);
				$(defsCred[1]).val(IngsSem1.creditos1);
				$(defsCred[2]).val(IngsSem1.creditos2);
				$(defsCred[3]).val(IngsSem1.creditos3);
				$(defsCred[4]).val(IngsSem1.creditos4);
			}
			
			
			if($('#predefs').val() == "default"){
				$('#resultspaceProm').empty()	;
			}
		});
});
 