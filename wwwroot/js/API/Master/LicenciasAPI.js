$(document).ready(function(){

    ListarUsuariosLicencias();
    ListarTotalLicecnias();

    $("#FiltroUsuarios").keyup(function () {
        _this = this;
        $.each($("#TablaListarUsuarios tbody tr"), function () {
            if ($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) === -1)
                $(this).hide();
            else
                $(this).show();
        });
    });

});

const ListarTotalLicecnias = () => {
 
    const COD_EMPRESA = 1;
    $("#TablaListarLicenciasTotal tr").remove();
    const url = 'http://192.168.0.22:81/api/asignacionlicencia/'+COD_EMPRESA+'';
    $.ajax({
        url:url,
        type: "GET",
        dataType: 'json',
        success: function (response) {
            
            var trHTML = '';
            $.each(response, function (i, item) {
                var anio = JSON.stringify(item.lic_datos);
                s = anio.substr(1,11);
              
                trHTML +=
                    '<tr> ' +
                    ' <td style="font-size: 12px;">' + item.lic_descripcion+ '</td style="font-size: 14px;"> '+
                    ' <td style="font-size: 12px;">' +s+ ' </td> '+
                    ' <td style="font-size: 13px;" class="font-weight-bold text-dark">' + item.lic_total + '</td> '+
                    '</tr>';
            });
            $('#TablaListarLicenciasTotal').append(trHTML);
        
        },
        error: function (error){
            alert("Error al cargar las licencias" + error);
        }
       });
 
}

const ListarUsuariosLicencias = () => {
    $('#TablaListarUsuarios tr').remove();

    const COD_EMPRESA = 1;
    const url = 'http://192.168.0.22:81/api/licencia/usuario/'+COD_EMPRESA+'';

    $.ajax({
     url:url,
     type: "GET",
     dataType: 'json',
     success: function (response) {
         
         var trHTML = '';
         $.each(response, function (i, item) {
            var RUT_INSTRING = JSON.stringify(item.usu_rut);
            var rut = RUT_INSTRING.replace(/['"]+/g, '');
             const RutFormateado = FormatearRut(rut);

             var img = "";

             if (item.asignacion.toString() == "Con licencia") {
                 var img = "http://localhost:5001/img/state.png";
             }
         
             trHTML +=
                 '<tr> ' +
                 ' <td class="text-center"> <img height="11px" src="'+img+'" /> </td>'+
                 ' <td class="text-center " style="font-size: 12px;">' + RutFormateado + ' </td> '+
                 ' <td class="text-center" style="font-size: 12px;">' + item.usu_nombre + ' ' + item.usu_apellido + '</td style="font-size: 14px;"> '+
                 ' <td class="text-center" style="font-size: 12px;">' + item.asignacion + '</td> ' +
                 ' <td class="text-center" class="pl-3 pt-1" style="text-decoration: none;"> <a style="font-size: 12px;" onclick="tableCheck(\'' + item.cod_usuario + '\')" data-toggle="modal" data-target="#exampleModal' + item.usu_rut +'" href=""><img src="http://localhost:5001/img/mas.png" height="13px" alt="Boton Abrir" />  </a>'+
                 '<div class=" rounded-0 modal fade" id="exampleModal'+item.usu_rut+'" tabindex="-1" '+
                 '   role="dialog" aria-labelledby="exampleModalLabel" '+
                 '   aria-hidden="true"> '+
                 '<div class="modal-dialog text-left" role="document"> '+
                 '   <div class="modal-content"> '+
                 '      <div class="modal-header"> '+
                 '         <h5 class="modal-title" id="exampleModalLabel"> Asignacion de licencias'+
                 '         </h5> '+
                 '         <button type="button" class="close" data-dismiss="modal" '+
                 '            aria-label="Close"> '+
                 '         <span aria-hidden="true">&times;</span> '+
                 '         </button> '+
                 '      </div> '+
                 '      <div class="container mt-3 pb-4"> '+
                 '      <span class="text-dark ml-1 ">Seleccione las licencias activas para  <span class="text-dark font-weight-bold "> ' + item.usu_nombre + ' ' + item.usu_apellido + '</span>  </span> '+
                 '         <form class="mt-3 container-fluid" id="forma'+item.cod_usuario+'" > '+
                 '         </form> '+
                 '      </div>  '+
                 '   </div> '+
                 '</div>  '+
                 '</td> '+
                 '</tr>';
         });
         $('#TablaListarUsuarios').append(trHTML);
     
     },
     error: function (error){
        alert("Error al cargar las licencias" + error);
     }
    });
}

const tableCheck = (ID) =>{
    
    $("#forma"+ID+" div").remove();
    const COD_EMPRESA = 1;
    const url = 'http://192.168.0.22:81/api/licencia/query/'+ID+'/'+COD_EMPRESA+'';
    $.ajax({
        url:url,
        type: "GET",
        dataType: 'json',
        success: function (response) {
            var HTML = '';
            $.each(response, function (i, item) {
                var ASIG = JSON.stringify(item.asignacion);
                var anio = JSON.stringify(item.lic_anio_expiracion);
                s = anio.substr(1,11);
           
                if( ASIG == '"NO ASIGNADO"'){
                    HTML += '<div class="row p-2 mt-2 border">'+
                    '<div class="col-4">'+
                    '<span style="font-size: 11px;">Nombre : '+item.lic_descripcion+' </span>'+
                    '</div>'+
                    '<div class="col-4">'+
                    '<span style="font-size: 11px;">Termino: '+s+'</span>'+
                    '</div>'+
                    '<div class="col-4">'+
                    '<div class="form-check">'+
                    '<input class="form-check-input position-static"   onclick="check(\''+item.cod_licencia+'\',\''+ID+'\',\''+item.asignacion+'\')"  type="checkbox" id="Checkbox" value="option1" aria-label="..." >'+
                    '<span style="font-size: 13px;">Estado</span>'+
                    '</div>'+
                    '</div>'+
                    '</div>';
                }else{
                    HTML += '<div class="row p-2 mt-2 border">'+
                    '<div class="col-4">'+
                    '<span style="font-size: 11px;">Nombre : '+item.lic_descripcion+' </span>'+
                    '</div>'+
                    '<div class="col-4">'+
                    '<span style="font-size: 11px;">Termino: '+s+'</span>'+
                    '</div>'+
                    '<div class="col-4">'+
                    '<div class="form-check">'+
                    '<input class="form-check-input position-static" type="checkbox" onclick="check(\''+item.cod_licencia+'\',\''+ID+'\',\''+item.asignacion+'\')"  id="Checkbox" value="option1" aria-label="..." checked>'+
                    '<span style="font-size: 13px;">Estado</span>'+
                    '</div>'+
                    '</div>'+
                    '</div>';
                }
            });
            $("#forma"+ID+"").append(HTML);
        }
    });
}

const check = (LIC,ID,ASIG) => {

    var ASIGACION_ACTUAL = JSON.stringify(ASIG);

    if(ASIGACION_ACTUAL == '"NO ASIGNADO"'){

        AsignarLicencia(LIC,ID);
    }else{
        borrarLicencia(LIC,ID);
    }
}

const AsignarLicencia = (LIC,ID) => {
    const url = 'http://192.168.0.22:81/api/asignacionlicencia/';
    const json = '{"cod_usuario":'+ID+',"cod_licencia":'+LIC+'}';
    $.ajax({
        headers: {  'Accept': 'application/json','Content-Type': 'application/json' },
        url:url,
        type: "POST",
        dataType: 'json',
        data:json,
        success: function (response) {
       
       
            ListarTotalLicecnias();
            tableCheck(ID);
      
        },
        error: function(response){
            alert("ERROR AL ASIGNAR");
            ListarTotalLicecnias();
            return tableCheck(ID);
        }
    });
}

const borrarLicencia = (LIC,ID) => {
    const url = 'http://192.168.0.22:81/api/asignacionlicencia/'+ID+'/'+LIC+'';

    $.ajax({
        headers: {  'Accept': 'application/json','Content-Type': 'application/json' },
        url:url,
        type: "DELETE",
        dataType: 'json',
        success: function(response){
          
          
            ListarTotalLicecnias();
           
            tableCheck(ID);
     
        },
        error: function(response){
            alert("ERROR AL BORRAR");
            ListarTotalLicecnias();
            return tableCheck(ID);
        }
    });
}

const FormatearRut = (rut) => {
    var actual = rut.replace(/^0+/, "");
    if (actual != '' && actual.length > 1) {
        var sinPuntos = actual.replace(/\./g, "");
        var actualLimpio = sinPuntos.replace(/-/g, "");
        var inicio = actualLimpio.substring(0, actualLimpio.length - 1);
        var rutPuntos = "";
        var i = 0;
        var j = 1;
        for (i = inicio.length - 1; i >= 0; i--) {
            var letra = inicio.charAt(i);
            rutPuntos = letra + rutPuntos;
            if (j % 3 == 0 && j <= inicio.length - 1) {
                rutPuntos = "." + rutPuntos;
            }
            j++;
        }
        var dv = actualLimpio.substring(actualLimpio.length - 1);
        rutPuntos = rutPuntos + "-" + dv;
    }
    return rutPuntos;
}