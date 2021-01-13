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
                    ' <td class="text-center"  style="font-size: 12px;">' + item.usu_nombre + '</td style="font-size: 14px;"> ' +
                    ' <td class="text-center"  style="font-size: 12px;">' + item.usu_apellido + '</td> ' +
                    ' <td class="text-center"  class="pl-3 pt-1" style="text-decoration: none;"> <a style="font-size: 12px;" onclick="table(\'' + item.cod_usuario + '\')" data-toggle="modal" data-target="#exampleModal' + item.usu_rut + '" href=""><img src="http://localhost:5001/img/mas.png" height="13px" alt="Boton Abrir" />  </a>' +
                    '<div class="modal fade bd-example-modal-lg" id="exampleModal' + item.usu_rut + '" tabindex="-1" ' +
                    '   role="dialog" aria-labelledby="exampleModalLabel" ' +
                    '   aria-hidden="true"> ' +
                    '<div class="modal-dialog modal-lg" role="document"> ' +
                    '   <div class="modal-content text-left"> ' +
                    '      <div class="modal-header"> ' +
                    '         <h5 class="modal-title" id="exampleModalLabel"> Asignación de jefe  ' +
                    '         </h5> ' +
                    '         <button type="button" class="close" data-dismiss="modal" ' +
                    '            aria-label="Close"> ' +
                    '         <span aria-hidden="true">&times;</span> ' +
                    '         </button> ' +
                    '      </div> ' +
                    '      <div class="container mt-2 pb-4"> ' +
                    '      <span class="text-dark ">Seleccione el jefe para el usuario   <span class=" font-weight-bold" style="color:#0abbec" > ' + item.usu_nombre + ' ' + item.usu_apellido + '</span>  </span> ' +
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
            console.log(res);
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

                const cod_jefe = item.cod_jefe;

                if (cod_jefe.toString() == "0" || cod_jefe.toString() == null){
                HTML +=

                    '<div class="row p-2 mt-3 border">' +

                    '<div class="col-3">' +
                    ' <span class="font-weight-bold text-dark" style="font-size: 11px;">Sociedad: <span class="font-weight-bold " style="font-size: 12px;color:#0abbec">' + item.soc_nombre + '</span> </span> ' +
                    '</div>' +

                    '<div class="col-9">' +

                '  <form onsubmit="AsignarRolSociedadUsuario(event,\'' + item.cod_perfil + '\',\'' + COD_USUARIO + '\',\'' + i + '\')"> ' +

                    '<div class="row">' +

                    '<div class="col-8 col-lg-9 ">' +



                  '<select id="s' + COD_USUARIO + i + '" class="form-control form-control-sm"> ' +
                 ' <option hidden selected>Seleccione Jefe</option> ' +
                    ' </select > ' +

                    '</div>' +

                    '<div class="col-4 col-lg-3 text-right">' +

                    '<button style="background:#0abbec" class="btn w-100 text-white rounded btn-sm font-weight-bold ">Cambiar</button>' +

                    '</div>' +


                    '</div>' +


                    '</form>' +

                    '</div>' +

                    '</div>' +

                    '</div>';
                }else{
            HTML +=

            '<div class="row p-2 mt-3 border ">' +

                '<div class="col-3">' +
            ' <span class="font-weight-bold text-dark" style="font-size: 11px;">Sociedad: <span class="font-weight-bold " style="font-size: 12px;color:#0abbec">' + item.soc_nombre + '</span> </span> ' +
                '</div>' +

                '<div class="col-9">' +

            '  <form onsubmit="AsignarRolSociedadUsuario(event,\'' + item.cod_perfil + '\',\'' + COD_USUARIO + '\',\'' + i + '\')"> ' +

                '<div class="row">' +

                '<div class="col-8 col-lg-9 ">' +



                '<select id="s' + COD_USUARIO + i + '" class="form-control form-control-sm"> ' +
               ' <option hidden selected>' + cod_jefe + '</option> ' +
               ' <option value="0" >No asignar jefe</option> ' +
                 ' </select > ' +

                '</div>' +

                '<div class="col-4 col-lg-3 text-right">' +

                '<button style="background:#0abbec" class="btn w-100 text-white rounded btn-sm font-weight-bold ">Cambiar</button>' +

                '</div>' +


                '</div>' +


                '</form>' +

                '</div>' +

                '</div>' +

                '</div>';
                }

                JefesPorSociedad(item.cod_sociedad, COD_USUARIO, i);

            });
            $("#forma" + COD_USUARIO + "").append(HTML);
        }
    });
}

const JefesPorSociedad = (cod_sociedad, COD_USUARIO,i) => {

    const url = `http://192.168.0.22:81/api/usuario/jefe/${cod_sociedad}`;
  
    const x = i;

    $.ajax({
        url: url,
        type: "GET",
        dataType: 'json',
        success: function (res) {

            $.each(res, function (i, item) {
                $('#s'+COD_USUARIO+x+'').append('<option " value="' + item.cod_usuario + '"> <span class="text-info">' + item.usu_nombre + '</span> <span class="text-warning">' + item.usu_apellido+'</span>   </option>');
            });

        },
        error: function (error) {
            alert(error);
            console.log(error)
        }
    });

}

const AsignarRolSociedadUsuario = (event, COD_PERFIL, COD_USUARIO , i) => {
    event.preventDefault();
    const x = i;
    const codigo = $('#s' + COD_USUARIO + x + '').val();

    url = 'http://192.168.0.22:81/api/Perfil/jefe/' + codigo + '/' + COD_PERFIL + ''


    $.ajax({
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        url: url,
        type: "PUT",
        dataType: 'json',
        success: function () {

            if (codigo.toString() == "0") {

                Swal.fire({
                    icon: 'success',
                    title: 'Cambio realizado con éxito',
                    showConfirmButton: false,
                    timer: 1400
                });

              
                table(COD_USUARIO);
              

            } else {



                Swal.fire({
                    icon: 'success',
                    title: 'Cambio realizado con éxito',
                    showConfirmButton: false,
                    timer: 1400
                });

                table(COD_USUARIO);
         
            }
            

        },
        error: function (error) {
            alert("Error al asginar jefe al usuario");
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