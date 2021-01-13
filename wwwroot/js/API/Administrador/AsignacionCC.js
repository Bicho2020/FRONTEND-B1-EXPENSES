
$(document).ready(function () {
    ListaUsuarios();
    
    $("#Filtro").keyup(function () {
        _this = this;
        $.each($("#TablaListarUsuarios tbody tr"), function () {
            if ($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) === -1)
                $(this).hide();
            else
                $(this).show();
        });
    });

});


const ListaUsuarios = () => {
    const COD_EMPRESA = 1;
    const COD_SOCIEDAD = localStorage['cod_sociedad'];
    const url = `http://192.168.0.22:81/api/usuario/sociedad/${COD_SOCIEDAD}`;
   
    $.ajax({
        url: url,
        type: "GET",
        dataType: 'json',
        success: function (res) {
            var trHTML = '';
            $.each(res, function (i, item) {
                var RUT_INSTRING = JSON.stringify(item.usu_rut);
                var rut = RUT_INSTRING.replace(/['"]+/g, '');
                const RutFormateado = FormatearRut(rut);
                trHTML += '<tr> ' +
                    ' <td class="text-center" style="font-size: 12px;">' + RutFormateado + ' </td> ' +
                    ' <td class="text-center"  style="font-size: 12px;">' + item.usu_nombre + '</td style="font-size: 14px;"> ' +
                    ' <td class="text-center"  style="font-size: 12px;">' + item.usu_apellido + '</td> ' +
                    ' <td class="text-center"  class="pl-3 pt-1" style="text-decoration: none;"> <a style="font-size: 12px;" onclick="ListarAsignacionActual(\'' + item.cod_usuario + '\')" data-toggle="modal" data-target="#exampleModal' + item.usu_rut + '" href=""><img src="http://localhost:5001/img/mas.png" height="13px" alt="Boton Abrir" />  </a>' +
                    '<div class="modal fade bd-example-modal-lg" id="exampleModal' + item.usu_rut + '" tabindex="-1" ' +
                    '   role="dialog" aria-labelledby="exampleModalLabel" ' +
                    '   aria-hidden="true"> ' +
                    '<div class="modal-dialog modal-lg" role="document"> ' +
                    '   <div class="modal-content text-left"> ' +
                    '      <div class="modal-header"> ' +
                    '         <h5 class="modal-title" id="exampleModalLabel"> Asignacion centro de costo ' +
                    '         </h5> ' +
                    '         <button type="button" class="close" data-dismiss="modal" ' +
                    '            aria-label="Close"> ' +
                    '         <span aria-hidden="true">&times;</span> ' +
                    '         </button> ' +
                    '      </div> ' +
                    '      <div class="container mt-2 pb-4"> ' +
                    '      <span class="text-dark ">Seleccione el centro de costo para el usuario   <span class="text-dark font-weight-bold "> ' + item.usu_nombre + ' ' + item.usu_apellido + '</span>  </span> ' +
                    '         <form class="mt-4 container-fluid" id="forma' + item.cod_usuario + '" > ' +
                    '         </form> ' +
                    '      </div>  ' +
                    '   </div> ' +
                    '</div>  ' +
                    '</td> ' +
                    '</tr>';
            });
            $('#TablaListarUsuarios').append(trHTML);

        },
        error: function (res) {
            console.log(res);
        }
    });
}

const ListarAsignacionActual = (COD_USUARIO) => {

    $('#forma' + COD_USUARIO +' div').remove();

    const COD_SOCIEDAD = localStorage['cod_sociedad'];
    const url = `http://192.168.0.22:81/api/asignacionCC/${COD_SOCIEDAD}/${COD_USUARIO}`;

    $.ajax({
        url: url,
        type: "GET",
        dataType: 'json',
        success: function (res) {

            let cant = res.length

            if (cant === 0) var trHTML =
               
                `<div class="mt-3">
                    <div>
                        <label>Asignacion actual : <span class="font-weight-bold" style="color: #0abbec;">Sin asignacion</span></label>
                        <select class="form-control form-control-sm mt-3 rounded-0 " id="CentroCosto${COD_USUARIO}">
                            <option value="0" hidden>Seleccione un centro de costo</option>
                        </select>
                    </div>

                    <div class="float-right mt-4">
                        <button onclick="AsignarCC(event,'${COD_USUARIO}');" class="btn btn-sm rounded-0 text-white font-weight-bold" style="background-color: #0abbec;">Actualizar</button>
                    </div>

                </div>`;;

            if (cant === 1) var trHTML =

                `<div class="mt-3">
                    <div>
                        <label>Asignacion actual : <span class="font-weight-bold" style="color: #0abbec;">${res[0].cc_nombre}</span></label>
                        <select class="form-control form-control-sm  rounded-0 mt-3" id="CentroCosto${COD_USUARIO}">
                            <option value="${res[0].cod_cc}" hidden>${res[0].cc_nombre}</option>
                            <option value="x" >Desactivar</option>
                        </select>
                    </div>
                
                    <div class="float-right mt-4">
                        <button onclick="ActualizarCC(event,'${COD_USUARIO}','${res[0].cod_asignacion_cc}');" class="btn btn-sm rounded-0 text-white font-weight-bold" style="background-color: #0abbec;">Actualizar</button>
                    </div>

                </div>
                `;;
   
            $('#forma'+COD_USUARIO+'').append(trHTML);
            centroCosto(COD_USUARIO);
        },
        error: function (res) {
            console.log(res);
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

const centroCosto = (COD_USUARIO) => {

    const COD_SOCIEDAD = localStorage['cod_sociedad'];
    const url = `http://192.168.0.22:81/api/centrocosto/${COD_SOCIEDAD}`
    
    $.ajax({
        url: url,
        type: "GET",
        dataType: 'json',
        success: function (res) {

            $.each(res, function (i, x) {
       
                $(`#CentroCosto${COD_USUARIO}`).append(`<option value="${x.cod_centro_de_costo}">${x.cdc_nombre}</option>`);
            });

        },
        error: function (error) {
            alert(error);
            console.log(error)
        }
    });

}

const AsignarCC = (event, COD_USUARIO) => {

    event.preventDefault();

    const COD_SOCIEDAD = localStorage['cod_sociedad'];

    let value = $(`#CentroCosto${COD_USUARIO}`).val();

    if (value == 0) {
        alert('Seleccione centro de costo');
    }
    else {

        const url = `http://192.168.0.22:81/api/asignacionCC`

        let data = {
            ACC_TIPO_DOCUMENTO: 1,
            COD_SOCIEDAD: COD_SOCIEDAD,
            COD_USUARIO: parseInt(COD_USUARIO),
            COD_CENTRO_DE_COSTO: value
        }

        const json = JSON.stringify(data);

        $.ajax({
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            url: url,
            type: "POST",
            dataType:'json',
            data: json,
            success: function (res) {
                alert('Asigncion Lista');
                ListarAsignacionActual(COD_USUARIO);
            },
            error: function (err) {
                console.log(err);
                alert('Error al asignar');
                ListarAsignacionActual(COD_USUARIO);
            }
        });;
    }

 

};

const ActualizarCC = (event, COD_USUARIO, COD_ACC) => {
    event.preventDefault();

    let value = $(`#CentroCosto${COD_USUARIO}`).val();


    if (value.toString() == "x") {

        EliminarCC(COD_USUARIO,COD_ACC);;

    } else {

        const url = `http://192.168.0.22:81/api/asignacionCC/${value}/${COD_ACC}`;

        $.ajax({
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            url: url,
            type: "PUT",
            dataType: 'json',
            success: function (res) {
                alert('Actualizado');
                ListarAsignacionActual(COD_USUARIO);
            },
            error: function (err) {
                console.log(err);
                alert('Error al actualizar');
                ListarAsignacionActual(COD_USUARIO);
            }
        });


    }
       
};


const EliminarCC = (COD_USUARIO, COD_ACC) => {

    const url = `http://192.168.0.22:81/api/asignacionCC/${COD_ACC}`;

    $.ajax({
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        url: url,
        type: "DELETE",
        dataType: 'json',
        success: function (res) {
            alert('Desactivado');
            ListarAsignacionActual(COD_USUARIO);
        },
        error: function (err) {
            console.log(err);
            alert('Error al desactivar');
            ListarAsignacionActual(COD_USUARIO);
        }
    });

};