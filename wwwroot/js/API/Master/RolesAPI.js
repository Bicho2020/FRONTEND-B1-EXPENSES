$(document).ready(function(){


    ListaUsuarios();

    $("#FiltroUsuario").keyup(function () {
        _this = this;
        $.each($("#records_table_3 tbody tr"), function () {
            if ($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) === -1)
                $(this).hide();
            else
                $(this).show();
        });
    });

});


const ListaUsuarios = () =>{
    const COD_EMPRESA = 1;
    const url = 'http://192.168.0.22:81/api/usuario/query/'+COD_EMPRESA+'';
 
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
             trHTML += '<tr> '+
 
                 ' <td  class="text-center" style="font-size: 12px;">' + RutFormateado+ ' </td> '+
                 ' <td  class="text-center" style="font-size: 12px;">' + item.usu_nombre + '</td style="font-size: 14px;"> '+
                 ' <td  class="text-center" style="font-size: 12px;">' + item.usu_apellido + '</td> '+
                 ' <td  class="text-center" class="pl-3 pt-1" style="text-decoration: none;"> <a style="font-size: 12px;" onclick="table(\'' + item.cod_usuario + '\')" data-toggle="modal" data-target="#exampleModal' + item.usu_rut +'" href=""><img src="http://localhost:5001/img/mas.png" height="13px" alt="Boton Abrir" /></a>'+
                 '<div class="modal fade bd-example-modal-lg" id="exampleModal'+item.usu_rut+'" tabindex="-1" '+
                 '   role="dialog" aria-labelledby="exampleModalLabel" '+
                 '   aria-hidden="true"> '+
                 '<div class="modal-dialog modal-lg" role="document"> '+
                 '   <div class="modal-content"> '+
                 '      <div class="modal-header text-left"> '+
                 '         <h5 class="modal-title" id="exampleModalLabel"> Asignacion de roles  '+
                 '         </h5> '+
                 '         <button type="button" class="close" data-dismiss="modal" '+
                 '            aria-label="Close"> '+
                 '         <span aria-hidden="true">&times;</span> '+
                 '         </button> '+
                 '      </div> '+
                 '      <div class="container text-left mt-2 pb-4"> '+
                 '      <span class="text-dark ">Seleccione los roles por sociedad para el usuario   <span class="font-weight-bold" style="color:#0abbec" > ' + item.usu_nombre + ' ' + item.usu_apellido + '</span>  </span> '+
                 '         <form class="mt-4 container-fluid" id="forma'+item.cod_usuario+'" > '+
                 '         </form> '+
                 '      </div>  '+
                 '   </div> '+
                 '</div>  '+
                 '</td> '+
                 '</tr>';
         });
         $('#records_table_3').append(trHTML);
     
     },
     error: function (res){
 
     }
    });
 }
 
const table = (COD_USUARIO) =>{
     const COD_EMPRESA = 1;
     $("#forma"+COD_USUARIO+" div").remove();
    const url = 'http://192.168.0.22:81/api/perfil/'+COD_USUARIO+'';
     $.ajax({
         url:url,
         type: "GET",
         dataType: 'json',
         success: function (response) {
             var HTML = '';
             $.each(response, function (i, item) {
             
                    HTML +=
                     
                    '<div class="row p-2 mt-3 border">'+
                 
                        '<div class="col-3">'+
                        ' <span class="font-weight-bold text-dark" style="font-size: 11px;">Sociedad: <span class="font-weight-bold" style="font-size: 12px;color:#0abbec">'+item.soc_nombre+'</span> </span> '+
                        '</div>'+

                        '<div class="col-9">'+

                        '  <form onsubmit="AsignarRolSociedadUsuario(event,\''+item.cod_perfil+'\',\''+COD_USUARIO+'\')"> '+

                            '<div class="row">'+

                       

                                    '<div class="col-8 col-lg-9 ">'+
                                
                                        '<select class="form-control form-control-sm w-100" id="cod'+item.cod_perfil+'"  required>'+
                                        '  <option value="'+item.perf_nombre+'" hidden>'+item.perf_nombre+'</option>'+
                                        '  <option value="ADMINISTRADOR" >ADMISTRADOR</option>'+
                                        '  <option value="AUTORIZADOR">AUTORIZADOR</option>'+
                                        '  <option value="USUARIO">USUARIO</option>'+
                                        '</select>'+

                                    '</div>'+

                                    '<div class="col-4 col-lg-3 text-right">'+
                                
                                          '<button style="background:#0abbec" class="btn w-100 text-white rounded btn-sm font-weight-bold ">Cambiar</button>' +

                                    '</div>'+


                            '</div>'+

                            
                            '</form>'+

                            '</div>'+

                        '</div>'+

                    '</div>';
            
             });
             $("#forma"+COD_USUARIO+"").append(HTML);
         }
     });
 }
 
 const AsignarRolSociedadUsuario = (event,COD_PERFIL,COD_USUARIO) => {
    event.preventDefault();

    const nombre = $('select[id=cod'+COD_PERFIL+'] option').filter(':selected').val()

     url = 'http://192.168.0.22:81/api/Perfil/'+nombre+'/'+COD_PERFIL+''

  
 
     $.ajax({
         headers: {  'Accept': 'application/json','Content-Type': 'application/json' },
         url:url,
         type: "PUT",
         dataType: 'json',
         success: function (response) {

             Swal.fire({
                 icon: 'success',
                 title: 'Rol asignado correctamente.',
                 showConfirmButton: false,
                 timer: 1200
             })



            table(COD_USUARIO);
         
     
         },
         error: function(error){
             Swal.fire({
                 icon: 'error',
                 title: 'Error al cambiar rol.',
                 showConfirmButton: false,
                 timer: 1200
             })

         

            table(COD_USUARIO);
            ContarRoles();
         }
     });
    }


 
 const check = (SOC,ID,ASIG,COD_ASIG,COD_PERFIL) => {
     var ASIGACION_ACTUAL = JSON.stringify(ASIG);
 
     if(ASIGACION_ACTUAL == '"NO ASIGNADO"'){
         AsignarSociedad(SOC,ID);
     }else{
         borrarSociedad(ID,COD_ASIG,COD_PERFIL);
   
     }
 }
 
 
 const AsignarSociedad = (SOC,ID) =>{
     url = 'http://192.168.0.22:81/api/asignacionsociedad/';
     json = '{"cod_sociedad": "'+SOC+'", "cod_usuario": '+ID+' ,"cod_perfil": 0}'
 
     $.ajax({
         headers: {  'Accept': 'application/json','Content-Type': 'application/json' },
         url:url,
         type: "POST",
         dataType: 'json',
         data:json,
         success: function(response){
            alert('Asignacion Lista');
            table(ID);
            ContarRoles();
        
         },
         error: function(error){
            alert("ENTRO AL ERROR");
            table(ID);
            ContarRoles();
         }
 
     });
 }
 
 const borrarSociedad = (ID,COD_ASIG,COD_PERFIL) =>{
     url = 'http://192.168.0.22:81/api/asignacionSociedad/'+COD_ASIG+'/'+COD_PERFIL+'';
    
     $.ajax({
         headers: {  'Accept': 'application/json','Content-Type': 'application/json' },
         url:url,
         type: "DELETE",
         dataType: 'json',
         success: function(response){
            alert("USUARIO DESASIGNADO A LA SOCIEDAD");
            ContarRoles();
            table(ID);
         },
         error: function(response){
            alert("ERROR AL DESASIGNAR AL USUARIO DE LA SOCIEDAD");
            ContarRoles();
            table(ID);
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