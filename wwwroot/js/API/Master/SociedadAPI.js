
$(document).ready(function () {



    const cod_usuario = localStorage['cod_usuario'];

    if (cod_usuario) {
      
        LISTAR();
        ListaUsuarios();

        $("#Listar").click(function () {
            location.reload();
        })


    } else {

        location.href = "http://localhost:5001/";
    }

    $("#FiltroSociedad").keyup(function () {
        _this = this;
        $.each($("#TablaAsignarSociedades tbody tr"), function () {
            if ($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) === -1)
                $(this).hide();
            else
                $(this).show();
        });
    });


    $("#FiltroUsuario").keyup(function () {
        _this = this;
        $.each($("#records_table tbody tr"), function () {
            if ($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) === -1)
                $(this).hide();
            else
                $(this).show();
        });
    });

}); 



const ListaUsuarios = ()  =>{

    const url = 'http://192.168.0.22:81/api/usuario/query/1'

    $.ajax({
        url: url,
        type: "GET",
        dataType: 'json',
        success: function (res) {
            var trHTML = '';
       
            $.each(res, function (i, item) {

                var rut = FormatearRut(item.usu_rut);

                trHTML += '<tr> ' +


                ' <td class="text-center"  style="font-size: 12px;">' + rut + ' </td> ' +
                    ' <td class="text-center"  style="font-size: 12px;">' + item.usu_nombre + '</td style="font-size: 14px;"> ' +
                    ' <td class="text-center"  style="font-size: 12px;">' + item.usu_apellido + '</td> ' +
                    ' <td class="text-center"  style="text-decoration: none;"> <a onclick="table(\'' + item.cod_usuario + '\')" style="font-size: 12px;" data-toggle="modal" data-target="#exampleModal' + item.cod_usuario + '" href=""><img src="http://localhost:5001/img/mas.png" height="13px" alt="Boton Abrir" /> </a> ' +
                    '<div class=" rounded-0 modal fade" id="exampleModal' + item.cod_usuario + '" tabindex="-1" ' +
                    '   role="dialog" aria-labelledby="exampleModalLabel" ' +
                    '   aria-hidden="true"> ' +
                    '<div class="modal-dialog" role="document"> ' +
                    '   <div class="modal-content"> ' +
                    '      <div class="modal-header class-left"> ' +
                    '         <h5 class="modal-title" id="exampleModalLabel">Asignación de    ' +
                    '           sociedad ' +
                    '         </h5> ' +
                    '         <button type="button" class="close" data-dismiss="modal" ' +
                    '            aria-label="Close"> ' +
                    '         <span aria-hidden="true">&times;</span> ' +
                    '         </button> ' +
                    '      </div> ' +
                    '      <div class="container text-left mt-3 pb-4"> ' +
                    '      <span class="text-dark text-left ">Seleccione las sociedades asignadas para  <span class="font-weight-bold" style="color:#0abbec;" > ' + item.usu_nombre + ' ' + item.usu_apellido + '</span>  </span> ' +

                    '         <form class="mt-4 container-fluid" id="forma' + item.cod_usuario + '" > ' +
                    '         </form> ' +
                    '      </div>  ' +
                    '   </div> ' +
                    '</div>  ' +
                    '</tr>';
            });
            $('#TablaAsignarSociedades').append(trHTML);

        },
        error: function (data) {
        
            console.log("Error en listar usuarios  " + data)
        }
    });

}

const table = (COD_USUARIO) => {
 
    const COD_EMPRESA = 1;
    $("#forma"+COD_USUARIO+" div").remove();
    const url = 'http://192.168.0.22:81/api/sociedad/query/'+COD_USUARIO+'/'+COD_EMPRESA+'';
    $.ajax({
        url:url,
        type: "GET",
        dataType: 'json',
        success: function (response) {
            var HTML = '';
            $.each(response, function (i, item) {
                var ASIG = JSON.stringify(item.asignacion_sociedad);
          
                if( ASIG == '"NO ASIGNADO"'){
                    HTML += '<div class="row p-2 mt-2 border rounded border">'+
                    '<div class="col-4 text-left">'+
                        '<span style="font-size: 11px;">Código:  <span class="font-weight-bold pl-1 " > ' + item.cod_sociedad + ' </span > </span > '+
                    '</div>'+
                    '<div class="col-4 text-left">'+
                        '<span style="font-size: 11px;">Nombre:  <span class="font-weight-bold ml-2" >' + item.soc_nombre + ' </span>   </span>' +
                    '</div>'+
                    '<div class="col-4">'+
                    '<div class="form-check">'+
                    '<input class="form-check-input  float-right" type="checkbox" onclick="check(\''+item.cod_sociedad+'\',\''+COD_USUARIO+'\',\''+item.asignacion_sociedad+'\')"  id="Checkbox" value="option1">'+
                 
                    '</div>'+
                    '</div>'+
                    '</div>'+
                    '</div>';
                }else{
                  
                    HTML += '<div class="row p-2 mt-2 border rounded border">'+
                    '<div class="col-4 text-left">'+
                        '<span style="font-size: 11px;">Código:  <span class="font-weight-bold pl-1 " >'  + item.cod_sociedad + ' </span> </span>'+
                    '</div>'+
                    '<div class="col-4 text-left">'+
                        '<span style="font-size: 11px;">Nombre:  <span class="font-weight-bold ml-2" >' + item.soc_nombre +' </span>   </span>'+
                    '</div>'+
                    '<div class="col-4">'+
                    '<div class="form-check">'+
                    '<input class="form-check-input  float-right" type="checkbox" onclick="check(\''+item.cod_sociedad+'\',\''+COD_USUARIO+'\',\''+item.asignacion_sociedad+'\')"  id="Checkbox" value="option1" checked>'+
                
                    '</div>'+
                    '</div>'+
                    '</div>'+
                    '</div>';
                }
            });
            $("#forma"+COD_USUARIO+"").append(HTML);
        }
    });
}

const check = (COD_SOCIEDAD , COD_USUARIO , ASIG) => {
    var ASIGACION_ACTUAL = JSON.stringify(ASIG);

    if(ASIGACION_ACTUAL == '"NO ASIGNADO"'){

        AsignarSociedad(COD_SOCIEDAD,COD_USUARIO);
    }else{
     
        borrarSociedad(COD_USUARIO,COD_SOCIEDAD);
  
    }
}

 
const AsignarSociedad = (COD_SOCIEDAD, COD_USUARIO) => {
 
    url = 'http://192.168.0.22:81/api/asignacionsociedad/';

    json = '{"cod_sociedad": "'+COD_SOCIEDAD+'", "cod_usuario": '+COD_USUARIO+' ,"cod_perfil": 0,"cod_usuario_sap":"NO ASIGNADO"} "'

    $.ajax({
        headers: {  'Accept': 'application/json','Content-Type': 'application/json' },
        url:url,
        type: "POST",
        dataType: 'json',
        data:json,
        success: function(response){
        
           table(COD_USUARIO);
            console.log(error);
       
        },
        error: function(error){
           alert("ENTRO AL ERROR");
            table(COD_SOCIEDAD);
            console.log(error);
       
        }

    });
}

const borrarSociedad = (COD_USUARIO, COD_SOCIEDAD) => {



    url = 'http://192.168.0.22:81/api/asignacionSociedad/'+COD_SOCIEDAD+'/'+COD_USUARIO+'';
   
    $.ajax({
        headers: {  'Accept': 'application/json','Content-Type': 'application/json' },
        url:url,
        type: "DELETE",
        dataType: 'json',
        success: function(res){
    
           console.log(res)
           table(COD_USUARIO);
        },
        error: function(error){
           alert("ERROR AL DESASIGNAR AL USUARIO DE LA SOCIEDAD");
           console.log(error)
           table(COD_USUARIO);
        }

    });
}


const Modif_to_1 = (ID) =>{
   
    const url = 'http://192.168.0.22:81/api/sociedad/estado/'+ID+'/1';
    $.ajax({
      url:url,
      type: "PUT",
      dataType: 'json',
      success: function (response) {
   
      },
      error: function(error){
        location.reload();
      }

    }); 
   
}



  
const Modif_to_0 = (ID) => {


    var Mitexto = '¿Está seguro que desea desactivar esta sociedad?';

    swalWithBootstrapButtons.fire({
        title: Mitexto,
        text: "Desactivar la sociedad causara la denegación a los usuarios que esten en esta sociedad.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Desactivar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true

    }).then((result) => {

        if (result.isConfirmed) {
            const url = 'http://192.168.0.22:81/api/sociedad/estado/' + ID + '/0';
            $.ajax({
                url: url,
                type: "PUT",
                dataType: 'json',
                success: function (response) {
                    alert("asdsa");
                    console.log(response)
                },
                error: function (error) {
                    location.reload();
                }
            }); 
        }
    })
    
      

  }

const POST_SOCIEDAD = () =>{

    event.preventDefault();

    const url = "http://192.168.0.22:81/api/sociedad";

    const COD_EMPRESA = 1;

   const codigo = $('#IsCod').val();
   const servidor = $('#IsServidor').val();
   const nombre = $('#IsNombre').val();
   const enlace = $('#IsEnlace').val();
   const usuario = $('#IsUsuario').val();
   const contrasenia = $('#IsPass').val();
    const usuarioBD = $('#IsUserBD').val();
    const passBD = $('#IsPassBD').val();
    const BD = $('#Isbd').val();
    const BDVersion = $('#IsBDVERSION').val();

    const estado = 1;

    const data = {

        cod_sociedad : codigo,
        soc_nombre : nombre,
        soc_servidor : servidor,
        soc_usuario: usuario,
        soc_contrasenia: contrasenia,
        soc_enlace_sl: enlace,
        soc_esactiva: estado,
        cod_empresa: COD_EMPRESA,
        soc_version_sql: BDVersion,
        soc_contrasenia_bd: passBD,
        soc_usuario_bd: usuarioBD,
        soc_bd: BD
    }

    const json = JSON.stringify(data);

   
   $.ajax({
        headers: {  'Accept': 'application/json','Content-Type': 'application/json' },
        type: "POST",
        url: url,
        data: json,
        success: function() {
            Swal.fire({
                icon: 'success',
                title: 'Sociedad registrada.',
                showConfirmButton: false,
                timer: 1500
            })

            setTimeout(function () { location.reload() }, 1500);

        },
        error: function(err) {  
            if (err) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al agregar sociedad.',
                    text: 'El codigo ya se encuentra registrado',
                    showConfirmButton: false,
                    timer: 1800
                })

           
            };
        }
    });   

   
}

const LISTAR = () =>{
    const COD_EMPRESA = 1;
    const url = 'http://192.168.0.22:81/api/sociedad/estado/'+COD_EMPRESA+'';
    
    $.ajax({
        url: url,
        type: "GET",
        dataType: 'json',
        success: function (response) {
            var trHTML = '';
       
            $.each(response, function (i, item) {
                const estado = item.soc_esactiva;
              

                if (estado.toString() == '1') {
                    trHTML += '<tr> ' +

                        ' <td class="text-center"  style="font-size: 12px;">' + item.cod_sociedad + ' </td> ' +
                        ' <td class="text-center"  style="font-size: 12px;">' + item.soc_nombre + '</td style="font-size: 14px;"> ' +
                        ' <td class="text-center"  style="font-size: 12px;">' + item.soc_servidor + '</td> ' +
                        ' <td class="text-center"  style="font-size: 12px;">' + item.soc_enlace_sl + '</td> ' +
                        ' <td class="text-center" style="text-decoration: none;"> <a style="font-size: 12px;" data-toggle="modal" data-target="#exampleModal' + item.cod_sociedad + '" href=""><img src="http://localhost:5001/img/actualizar.png" height="15px" alt="Boton Abrir" /> </a></td> ' +
                        ' <td class="text-center"  > <button style="border:none;background: none; " class="text-danger  font-weight-bold" onclick="Modif_to_0(\'' + item.cod_sociedad + '\')" >X</button>  ' +
                        '<div class=" rounded-0 modal fade modal fade bd-example-modal-lg " id="exampleModal' + item.cod_sociedad + '" tabindex="-1" ' +
                        '   role="dialog" aria-labelledby="exampleModalLabel" ' +
                        '   aria-hidden="true"> ' +
                        '<div class="modal-dialog modal-lg" role="document"> ' +
                        '   <div class="modal-content"> ' +
                        '      <div class="modal-header"> ' +
                        '         <h5 class="modal-title text-left" id="exampleModalLabel">Modificar  ' +
                        '           Sociedad ' +
                        '         </h5> ' +
                        '         <button type="button" class="close" data-dismiss="modal" ' +
                        '            aria-label="Close"> ' +
                        '         <span aria-hidden="true">&times;</span> ' +
                        '         </button> ' +
                        '      </div> ' +
                        '      <div class="container text-left mt-2 pb-3"> ' +
                        '      <span class="text-dark ">Formulario para modificar sociedades.</span> ' +
                        '       <h6 class="text-danger pt-2">*Obligatorio</h6> ' +
                        '         <form class="mt-2" onsubmit="ModificarSociedad(\'' + item.cod_sociedad + '\')"> ' +
                        '    <div class="row mt-2 "> ' +
                        '    <div class="col-12 col-sm-12 col-md-12 col-lg-6 pt-2"> ' +
                        '      <div class="form-group"> ' +
                        '         <label for=""  class="text-dark " style="font-weight: 500;"  >Codigo <span class="text-danger"> * </span> </label> ' +
                        '         <input   value="' + item.cod_sociedad + '" minlength="3" maxlength="30"   type="text" class="form-control rounded-0 mt-2 form-control-sm" id="IsCod2' + item.cod_sociedad + '" placeholder="Ingrese codigo de la sociedad" disabled  required> ' +
                        '      </div> ' +
                        '   </div> ' +
                        '   <div class="col-12 col-lg-6 pt-2"> ' +
                        '      <div class="form-group"> ' +
                        '         <label for=""  class="text-dark " style="font-weight: 500;"  >Nombre <span class="text-danger"> * </span> </label> ' +
                        '         <input value="' + item.soc_nombre + '" minlength="3" maxlength="30"   placeholder="Ingrese nombre de la sociedad"  type="text" class="  form-control rounded-0 mt-2 form-control-sm" id="IsNombre2' + item.cod_sociedad + '" required> ' +
                        '      </div> ' +
                        '   </div> ' +
                        '</div> ' +
                        '<div class="row "> ' +
                        '   <div class="col-12 col-lg-6 pt-2"> ' +
                        '      <div class="form-group"> ' +
                        '         <label for=""  class="text-dark " style="font-weight: 500;"  >Servidor<span class="text-danger"> * </span> </label> ' +
                        '         <input value="' + item.soc_servidor + '" minlength="3" maxlength="30"   placeholder="Ingrese nombre del servidor"  type="text" class="form-control rounded-0 mt-2 form-control-sm" id="IsServidor2' + item.cod_sociedad + '"  required> ' +
                        '      </div> ' +
                        '   </div> ' +
                        '   <div class="col-12 col-lg-6 pt-2"> ' +
                        '      <div class="form-group"> ' +
                        '         <label for=""  class="text-dark " style="font-weight: 500;"  >Enlance<span class="text-danger"> * </span> </label> ' +
                        '         <input value="' + item.soc_enlace_sl + '" minlength="3" maxlength="30"    placeholder="Ingrese enlace "  type="text" class=" form-control rounded-0 mt-2 form-control-sm" id="IsEnlace2' + item.cod_sociedad + '"  required> ' +
                        '      </div> ' +
                        '   </div> ' +
                        '</div> ' +
                        '<div class="row "> ' +
                        '   <div class="col-12 col-lg-6 pt-2"> ' +
                        '      <div class="form-group"> ' +
                        '         <label for=""  class="text-dark " style="font-weight: 500;"  >Usuario Sap<span class="text-danger"> * </span> </label> ' +
                        '         <input value="' + item.soc_usuario + '" minlength="3" maxlength="30"    placeholder="Ingrese usuario para la sociedad"  type="text" class="form-control rounded-0 mt-2 form-control-sm" id="IsUsuario2' + item.cod_sociedad + '"  required> ' +
                        '      </div> ' +
                        '   </div> ' +
                        '   <div class="col-12 col-lg-6 pt-2"> ' +
                        '      <div class="form-group"> ' +
                        '         <label for=""  class="text-dark " style="font-weight: 500;"  >Contraseña Sap<span class="text-danger"> * </span> </label> ' +
                        '         <input value="' + item.soc_contrasenia + '" minlength="3" maxlength="30"   placeholder="Ingrese contraseña para la sociedad"  type="password" class=" form-control rounded-0 mt-2 form-control-sm" id="IsPass2' + item.cod_sociedad + '"  required> ' +
                        '      </div> ' +
                        '   </div> ' +
                        '   </div> ' +

                        '<div class="row "> ' +
                        '   <div class="col-12 col-lg-6 pt-2"> ' +
                        '      <div class="form-group"> ' +
                        '         <label for=""  class="text-dark " style="font-weight: 500;"  >Usuario BD<span class="text-danger"> * </span> </label> ' +
                        '         <input value="' + item.soc_usuario_bd + '" minlength="3" maxlength="30"    placeholder="Ingrese usuario para la sociedad"  type="text" class="form-control rounded-0 mt-2 form-control-sm" id="1' + item.cod_sociedad + '"  required> ' +
                        '      </div> ' +
                        '   </div> ' +
                        '   <div class="col-12 col-lg-6 pt-2"> ' +
                        '      <div class="form-group"> ' +
                        '         <label for=""  class="text-dark " style="font-weight: 500;"  >Contraseña BD<span class="text-danger"> * </span> </label> ' +
                        '         <input value="' + item.soc_contrasenia_bd + '" minlength="3" maxlength="30"   placeholder="Ingrese contraseña para la sociedad"  type="password" class=" form-control rounded-0 mt-2 form-control-sm" id="2' + item.cod_sociedad + '"  required> ' +
                        '      </div> ' +
                        '   </div> ' +
                        '   </div> ' +

                        '<div class="row "> ' +
                        '   <div class="col-12 col-lg-6 pt-2"> ' +
                        '      <div class="form-group"> ' +
                        '         <label for=""  class="text-dark " style="font-weight: 500;"  >BD<span class="text-danger"> * </span> </label> ' +
                        '         <input value="' + item.soc_bd + '" minlength="3" maxlength="30"    placeholder="Ingrese usuario para la sociedad"  type="text" class="form-control rounded-0 mt-2 form-control-sm" id="3' + item.cod_sociedad + '"  required> ' +
                        '      </div> ' +
                        '   </div> ' +
                        '   <div class="col-12 col-lg-6 pt-2"> ' +
                        '      <div class="form-group"> ' +
                        '         <label for=""  class="text-dark " style="font-weight: 500;"  >BD Version<span class="text-danger"> * </span> </label> ' +
                        '         <input value="' + item.soc_version_sql + '" minlength="3" maxlength="30"   placeholder="Ingrese contraseña para la sociedad"  type="text" class=" form-control rounded-0 mt-2 form-control-sm" id="4' + item.cod_sociedad + '"  required> ' +
                        '      </div> ' +
                        '   </div> ' +
                        '   </div> ' +
                  
                        '      <div class="pt-3 "> ' +
                        '         <button type="submit" ' +
                        '            style="background:#71cee7; border-color:#6dc2da ;" ' +
                        '            class="btn rounded-0 btn-primary btn-sm shadow font-weight-bold mt-1 float-right">Modificar</button> ' +
                        '      </div> ' +
                        '         </form> ' +
                        '      </div>  ' +

                        '   </div> ' +
                        '</div>  ' +
                        '</tr>';
                } else {
                    trHTML +=
                        '<tr> ' +
                    ' <td class="text-center"  style="font-size: 12px;">' + item.cod_sociedad + ' </td> ' +
                    ' <td class="text-center"  style="font-size: 12px;">' + item.soc_nombre + '</td style="font-size: 14px;"> ' +
                    ' <td class="text-center"  style="font-size: 12px;">' + item.soc_servidor + '</td> ' +
                    ' <td class="text-center"   style="font-size: 12px;">' + item.soc_enlace_sl + '</td> ' +
                    '    <td class="text-center text-secondary" style="font-size: 12px;">Desactivada</td> ' +
                    '    <td class="text-center" > <button class="btn font-weight-bold text-primary  " onclick="Modif_to_1(\'' + item.cod_sociedad + '\')" type="submit"  style="border:none; background: none; font-size:12px;"><img src="http://localhost:5001/img/tick.png" height="17px" alt="Boton Abrir" /> </button>   </td> ' +
                        '</tr> ' + '';
                }

            });
            $('#records_table').append(trHTML);

        },
        error: function (data) {
        
            console.log(data)
        }
    });
 
}


const swalWithBootstrapButtons = Swal.mixin({

    customClass: {
        confirmButton: 'btn btn-danger ml-3 border-none  font-weight-bold',
        cancelButton: 'btn btn-light-sm mr-3 border  font-weight-bold ',
        title: 'font-weight-bold',
    },
    buttonsStyling: false

})

const ModificarSociedad = (id) => {

    var Mitexto = '¿Está seguro que desea modificar esta sociedad?';

    swalWithBootstrapButtons.fire({
        title: Mitexto,
        text: "Modificar la sociedad puede causar cambios que pueden afectar al funcionamiento del sistema .",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Modificar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true

    }).then((result) => {

        if (result.isConfirmed) {

            const COD_EMPRESA = 1;
            const codigo = $('#IsCod2' + id + '').val();
            const servidor = $('#IsServidor2' + id + '').val();
            const nombre = $('#IsNombre2' + id + '').val();
            const enlace = $('#IsEnlace2' + id + '').val();
            const usuario = $('#IsUsuario2' + id + '').val();
            const contrasenia = $('#IsPass2' + id + '').val();
            const BDnombre = $('#1' + id + '').val();
            const BDPass = $('#2' + id + '').val();
            const BD = $('#3' + id + '').val();
            const versionBD = $('#4' + id + '').val();
            const estado = 1;
            const url = 'http://192.168.0.22:81/api/sociedad/' + id + '';

            const data = {

                cod_sociedad: codigo,
                soc_nombre: nombre,
                soc_servidor: servidor,
                soc_usuario: usuario,
                soc_contrasenia: contrasenia,
                soc_enlace_sl: enlace,
                soc_esactiva: estado,
                cod_empresa: COD_EMPRESA,
                soc_version_sql: versionBD,
                soc_contrasenia_bd: BDPass,
                soc_usuario_bd: BDnombre,
                soc_bd: BD
            }

            const json = JSON.stringify(data);

            $.ajax({
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                type: "PUT",
                url: url,
                data: json,

                success: function (data) {

                    Swal.fire({
                        icon: 'success',
                        title: 'Sociedad modificada.',
                        showConfirmButton: false,
                        timer: 1500
                    })

                    setTimeout(function () { location.reload() }, 1500);
                   
                },
                error: function (data) {

                    Swal.fire({
                        icon: 'warning',
                        title: 'Error al modificar sociedad.',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    
                }
            });
           

        }


    })
    event.preventDefault();

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