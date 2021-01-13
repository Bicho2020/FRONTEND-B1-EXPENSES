$(document).ready(function () {

 
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


const ListaUsuarios = () => {
    const COD_EMPRESA = 1;
    const url = 'http://192.168.0.22:81/api/usuario/query/' + COD_EMPRESA + '';

    $.ajax({
        url: url,
        type: "GET",
        dataType: 'json',
        success: function (response) {

            var trHTML = '';
            $.each(response, function (i, item) {

                var RUT_INSTRING = JSON.stringify(item.usu_rut);
                var rut = RUT_INSTRING.replace(/['"]+/g, '');
                const RutFormateado = FormatearRut(rut);
                trHTML += '<tr> ' +
                    
                    ' <td class="text-center" style="font-size: 12px;">' + RutFormateado + ' </td> ' +
                    ' <td class="text-center" style="font-size: 12px;">' + item.usu_nombre + '</td style="font-size: 14px;"> ' +
                    ' <td class="text-center" style="font-size: 12px;">' + item.usu_apellido + '</td> ' +
                    ' <td class="text-center" class="pl-3 pt-1" style="text-decoration: none;"> <a style="font-size: 12px;" onclick="table(\'' + item.cod_usuario + '\')" data-toggle="modal" data-target="#exampleModal' + item.cod_usuario + '" href=""><img src="http://localhost:5001/img/mas.png" height="13px" alt="Boton Abrir" /> </a>' +
                    '<div class="modal fade bd-example-modal-lg" id="exampleModal'+item.cod_usuario+'" tabindex="-1" ' +
                    '   role="dialog" aria-labelledby="exampleModalLabel" ' +
                    '   aria-hidden="true"> ' +
                    '<div class="modal-dialog modal-lg" role="document"> ' +
                    '   <div class="modal-content text-left"> ' +
                    '      <div class="modal-header"> ' +
                    '         <h5 class="modal-title" id="exampleModalLabel"> Asignación código SAP  ' +
                    '         </h5> ' +
                    '         <button type="button" class="close" data-dismiss="modal" ' +
                    '            aria-label="Close"> ' +
                    '         <span aria-hidden="true">&times;</span> ' +
                    '         </button> ' +
                    '      </div> ' +
                    '      <div class="container mt-2 pb-4"> ' +
                    '      <span class="text-dark ">Seleccione el código de usuario sap al usuario   <span style="color:#0abbec" class="font-weight-bold"> ' + item.usu_nombre + ' ' + item.usu_apellido + '</span>  </span> ' +
                    '         <form class="mt-4 container-fluid" id="forma' + item.cod_usuario + '" > ' +
                    '         </form> ' +
                    '      </div>  ' +
                    '   </div> ' +
                    '</div>  ' +
                    '</td> ' +
                    '</tr>';
            });
            $('#records_table_3').append(trHTML);

        },
        error: function (res) {

        }
    });
}

const table = (COD_USUARIO) => {
    const COD_EMPRESA = 1;
    $("#forma" + COD_USUARIO + " div").remove();
    const url = 'http://192.168.0.22:81/api/perfil/' + COD_USUARIO + '';
    $.ajax({
        url: url,
        type: "GET",
        dataType: 'json',
        success: function (response) {
            var HTML = '';


            if (response.length == 0) {

               
             

                Swal.fire({
                    icon: 'warning',
                    title: 'Usuario sin sociedad asignada.',
                    showConfirmButton: false,
                    timer: 1500
                });

            

            }

            $.each(response, function (i, item) {

               


                HTML +=

                    '<div class="row p-2 mt-2 border mt-3 ">' +

                    '<div class="col-3">' +
                    ' <span class="font-weight-bold text-dark" style="font-size: 11px;">Sociedad: <span class="font-weight-bold"  style="font-size: 12px;color:#0abbec">' + item.soc_nombre + '</span> </span> ' +
                    '</div>' +

                    '<div class="col-9">' +

                    '  <form onsubmit="AsignarRolSociedadUsuario(event,\'' + item.cod_perfil + '\',\'' + COD_USUARIO + '\')"> ' +

                    '<div class="row">' +



                    '<div class="col-8 col-lg-9 ">' +

               
                '<input id="sapCode' + item.cod_perfil+'" type="text" value="'+item.codigo_usuario_sap+'" class="form-control w-100 form-control-sm" >' +

                    '</div>' +

                    '<div class="col-4 col-lg-3 text-right">' +

                    '<button type="submit" style="background:#0abbec" class="btn w-100 text-white rounded btn-sm font-weight-bold ">Cambiar</button>' +

                    '</div>' +


                    '</div>' +


                    '</form>' +

                    '</div>' +

                    '</div>' +

                    '</div>';

            });
            $("#forma" + COD_USUARIO + "").append(HTML);
        }
    });
}

const AsignarRolSociedadUsuario = (event, COD_PERFIL, COD_USUARIO) => {
    event.preventDefault();

    const codigo = $('#sapCode' + COD_PERFIL + '').val();

    url = 'http://192.168.0.22:81/api/Perfil/sap/' + codigo + '/' + COD_PERFIL + ''


    $.ajax({
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        url: url,
        type: "PUT",
        dataType: 'json',
        success: function (response) {

            Swal.fire({
                icon: 'success',
                title: 'Asignación empleado sap correcto.',
                showConfirmButton: false,
                timer: 2000
            });

            setTimeout(function () { location.reload() }, 2000);

            table(COD_USUARIO);
         

        },
        error: function (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error al asignar código sap',
                showConfirmButton: false,
                timer: 2000
            });
            table(COD_USUARIO);
        
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