var IngSisSem1= {
	"items" : 5,
	"materia0": "Calculo I",
	"creditos0": 5,
	"materia1": "Algebra Lineal",
	"creditos1": 3,
	"materia2": "Competencias Comunicativas I",
	"creditos2": 3,
	"materia3": "Algoritmia y Programacion I",
	"creditos3": 3,
	"materia4": "Introduccion Ing de Sistemas",
	"creditos4": 1	
};
var IngsSem1= {
	"items" : 5,
	"materia0": "Calculo I",
	"creditos0": 5,
	"materia1": "Algebra Lineal",
	"creditos1": 3,
	"materia2": "Competencias Comunicativas I",
	"creditos2": 3,
	"materia3": "Expresion Grafica",
	"creditos3": 3,
	"creditos4": 1	
};



function armarDefs(_items){
	itemsProm = _items;
	$('#resultspaceProm').empty()	;	
	$('#resultspaceProm').append(ArmarElementoProm(_items));
	$('#iniciarCalculoProm').show();
	$('#cleanProm').show();
	$('#cantidadMat').val(_items);
	
}