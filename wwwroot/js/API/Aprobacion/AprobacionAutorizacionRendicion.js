$(document).ready(function () {

    cod_sociedad = localStorage['cod_sociedad'];
    cod_jefe = localStorage['cod_usuario'];
    SegunTipoAprobacion(cod_sociedad);

});

const SegunTipoAprobacion = (cod_sociedad) => {

    const url = `http://192.168.0.22:81/api/tipoaprobacion/${cod_sociedad}/2`;

    $.ajax({
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        type: "GET",
        url: url,
        success: function (res) {
            if (res.length == 0) {

            } else {

                localStorage['tipo_proceso'] = res[0]['ta_opcion']

                ListarUsuariosRendicion();

            }
        }
    });

}


const ListarUsuariosRendicion = () => {


    const url = `http://192.168.0.22:81/api/procesoaprobacion/solicitudes/rendicion/${cod_jefe}/${cod_sociedad}/2`;


    $.ajax({
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        type: "GET",
        url: url,
        success: function (res) {
            var FILAS = '';
            $.each(res, function (i, item) {

                FILAS +=
                    `<tr>
                <td style="font-size: 13px;" " class="pt-3-half text-center" >${item.coD_FONDO_POR_RENDIR}</td>
                <td style="font-size: 13px;" class="pt-3-half text-center">${item.nombres}</td>
                <td style="font-size: 13px;" class="pt-3-half text-center">${item.fechA_CREACION}</td>
                <td style="font-size: 13px;" class="pt-3-half text-center">${item.fechA_REQUERIDA}</td>
                <td style="font-size: 13px;" class="pt-3-half text-center">${item.etapa}</td>
                <td style="font-size: 13px;" class="pt-3-half text-center">${item.comentario}</td>
             
                <td style="font-size: 13px;" class="pt-3-half text-center">  <a href="" data-toggle="modal" data-target="#modal${item.coD_FONDO_POR_RENDIR}" onclick="ListarDetalles('${item.coD_FONDO_POR_RENDIR}','${item.etapa}')" style="text-decoration:none;" ><img height="16px" src="http://localhost:5001/img/ojo.png"/></a>
                
                    <div class="modal fade bd-example-modal-lg" id="modal${item.coD_FONDO_POR_RENDIR}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                        
                    <div class="modal-dialog modal-lg" role="document">

                            <div class="modal-content container">

                                <div class="modal-header">
                                    <h5 class="modal-title" >Solicitud de fondo de  <h5 class="modal-title text-info ml-2 font-weight-bold"> ${item.nombres} </h5>    </h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>

                                <div class="row text-left ">

                                     <div class="col-12 col-lg-6 pt-2">
                                            <div class="form-group">
                                                <label for="" class="text-dark " style="font-weight: 500;">
                                                    Fecha solicitud actual  <span class="text-danger"> * </span>
                                                </label>
                                                <input  value="${item.fechA_CREACION}" placeholder="Sin Proyecto" type="date" class="form-control rounded-0 mt-2 form-control-sm" id="Is_FechaCreacion"  disabled> 
                                            </div>
                                        </div>

                                        <div class="col-12 col-lg-6 pt-2">
                                            <div class="form-group">
                                                <label for="" class="text-dark " style="font-weight: 500;">
                                                    Fecha Requerida actual  <span class="text-danger">
                                                        *
                                                    </span>
                                                </label>
                                                <input  value="${item.fechA_REQUERIDA}" disabled placeholder="Sin Centro de costo" type="date" class=" form-control rounded-0 mt-2 form-control-sm" id="Is_FechaRequerida${item.cod_fondo_por_rendir}" >
                                            </div>
                                        </div>

                                      
                                        <div class="col-12 col-lg-12 pt-3">
                                            <div class="form-group">
                                                <label for="" class="text-dark " style="font-weight: 500;">
                                                    Comentario<span class="text-danger">
                                                        *
                                                    </span>
                                                </label>
                                                <textarea class="form-control mt-2" rows="2"   maxlength="200" disabled>${item.comentario}</textarea>
                                            </div>
                                        </div>

                    
                                    <div class="table-responsive mt-4 ">

                                        <table class="table table-striped table-bordered" id="mtable${item.coD_FONDO_POR_RENDIR}">
                        
                                            <thead class="thead-dark ">
                        
                                                <tr>
                                                    <th scope="col" class="text-center" style="font-size: 13px; font-weight: 500;">Codigo</th>
                                                    <th scope="col" class="text-center" style="font-size: 13px; font-weight: 500;">Linea</th>
                                                    <th scope="col" class="text-center" style="font-size: 13px; font-weight: 500;">Articulo</th>
                                                    <th scope="col" class="text-center" style="font-size: 13px; font-weight: 500;">Comentario</th>
                                                    <th scope="col" class="text-center" style="font-size: 13px; font-weight: 500;">Monto</th>
                                                    <th scope="col" class="text-center" style="font-size: 13px; font-weight: 500;">Proyecto</th>
                                                    <th scope="col" class="text-center" style="font-size: 13px; font-weight: 500;">Estado</th>
                                                    <th scope="col" class="text-center" style="font-size: 13px; font-weight: 500;">Agregar comentario</th>
                                                  
                                                </tr>
                        
                                            </thead>
                        
                                                <tbody id="tabla${item.coD_FONDO_POR_RENDIR}">

                                               </tbody>
                        
                                        </table>

                                          <div class="mt-2 pb-3 mr-3 float-right">
                                                <span  id="total${item.coD_FONDO_POR_RENDIR}">
                                                 TOTAL: 
                                                </span>
                                          </div>
                        
                                    </div>

                                </div>

                               <div class="modal-footer">
                                    <button type="button" onclick="AceptarBTNR('${item.coD_FONDO_POR_RENDIR}','${item.etapa}');" class="btn btn-info font-weight-bold rounded-0 btn-sm">Aprobar todos</button>
                                    <button type="button"  onclick="ValidarComentario('${item.coD_FONDO_POR_RENDIR}');" class="btn btn-danger font-weight-bold rounded-0  btn-sm" >Rechazar seleccionados </button>
                                </div>

                            </div>

                        </div>

                    </div>

                </td>

            </tr>`
            });

            $("#TablaListarUsuariosAdministradores").append(FILAS);

        }
        ,
        error: function (error) {
            console.log(error);

        }
    });

}


const ListarDetalles = (COD_FONDO, ETAPA) => {
    localStorage['etapa'] = ETAPA;
    $("#tabla" + COD_FONDO + " tr").remove();

    const url = `http://192.168.0.22:81/api/rendiciondetalle/${COD_FONDO}`;



    $.ajax({
        url: url,
        type: "GET",
        dataType: 'json',
        success: function (response) {

            var HTML = '';
            $.each(response, function (i, item) {

                var estado = item.rd_estado.toString();
                var monto = addCommas(item.rd_monto);

                var ind = i + 1;

                if (estado == "0") {
                    HTML +=
                        `<tr>
                        <td style="font-size: 13px;" class="text-center" class="pt-3-half">${item.cod_rendicion_detalle}</td> 
                        <td style="font-size: 13px;" class="text-center" class="pt-3-half">${ind}</td> 
                        <td style="font-size: 13px;" class="text-center" class="pt-3-half">${item.art_nombre}</td> 
                        <td style="font-size: 13px;" class="text-center" class="pt-3-half">${item.rd_comentario}</td>
                        <td style="font-size: 13px;" class="text-center" class="pt-3-half">${monto}</td> 
                        <td style="font-size: 13px;" class="text-center" class="pt-3-half">${item.proyecto}</td> 
                        <td style="font-size: 13px;" class="text-center" class="pt-3-half"> <input class="form-check-input text-danger"  id="c${ind}" type="checkbox" ></td>
                        <td style="font-size: 13px;" class="text-center" class="pt-3-half" contenteditable="true"></td>
                    </tr>`;
                } else {
                    HTML +=
                        `<tr>
                        <td style="font-size: 13px;" class="text-center" class="pt-3-half">${item.cod_fondo_por_rendir_detalle}</td> 
                        <td style="font-size: 13px;" class="text-center" class="pt-3-half">${ind}</td> 
                        <td style="font-size: 13px;" class="text-center" class="pt-3-half">${item.art_nombre}</td> 
                        <td style="font-size: 13px;" class="text-center" class="pt-3-half">${item.fxrd_comentario}</td>
                        <td style="font-size: 13px;" class="text-center" class="pt-3-half">${monto}</td> 
                        <td style="font-size: 13px;" class="text-center" class="pt-3-half">${item.proyecto}</td> 
                         <td style="font-size: 13px;" class="text-center text-danger" class="pt-3-half">Rechazado</td>
                        <td style="font-size: 13px;" class="text-center" class="pt-3-half">${item.rd_comentario_jefe}</td>
                    </tr>`;
                }

            });
            $("#tabla" + COD_FONDO + "").append(HTML);

            Total(COD_FONDO);

        },
        error: function (err) {
            console.log(err);
        },
    });

}

const AceptarBTNR = (COD_DETALLE, COD_ETAPA) => { // ACEPTAR EL DOCUMENTO A NIVEL GENERAL

    if (COD_ETAPA == 1) {

        var EtapaR = 50;

    } else {

        var EtapaR = COD_ETAPA;

    }

    cod_sociedad = localStorage['cod_sociedad'];
    const url = `http://192.168.0.22:81/api/procesoaprobacion/aceptar/autoRendicion/${cod_sociedad}/${COD_DETALLE}/${EtapaR}/2`;



    $.ajax({
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        url: url,
        type: "POST",
        dataType: 'json',
        success: function (res) {
            getDataR(COD_DETALLE);
        },
        error: function (err) {
            console.log(err);
            alert("Error al aceptar solicitud");

        },
    });


}


const ValidarCheck = (CODIGO) => { // VALIDAR QUE AL MENOS HAYA UN RECHAZADO

    var rs = 0;
    $("#mtable" + CODIGO + " tbody tr").each(function (i) {
        var x = i + 1;
        var result = $('#c' + x).is(":checked");

        if (result == false) {
            rs = rs + 0;
        } else {
            rs = rs + 1;
        }
    });
    return rs;

} 

const ValidarComentario = (COD_DETALLE) => {

    var rs = ValidarCheck(COD_DETALLE);

    if (rs == 0) {
        alert("Debes seleccionar al menos detalle para rechazar seleccionados "); 
    } else { // SI HAY ALMENOS UN RECHAZADO
        var cv = 0;
        $("#mtable" + COD_DETALLE + " tbody tr").each(function (i) {

            var x = i + 1;
            var result = $('#c' + x).is(":checked");

            if (result == true) {

                var customerId = $(this).find("td").eq(7).html();

                if (customerId.toString() == "") {
                    cv = cv + 1;
                    alert("Comentario por el motivo de rechazo en la linea " + x)
                }
            }
        }); // VALIDAR QUE HAYA MENSAJE CUANDO ESTE EL CHECK EN RECHAZADO

        if (cv == 0) { // SI YA ESTA TODO VALIDADO

            if (localStorage['tipo_proceso'] == 2) { // SI EL PROCESO ES EL 2 =  TERMINAR CON ALGUN RECHAZADO
                RechazarR(COD_DETALLE); // RECHAZAR EL DOCUMENTO
                getDataR(COD_DETALLE); // GUARDAR LOGS
            } else {
                Rechazar2R(COD_DETALLE); // rechazar cuando la opcion sea 1 = pasan los aprobados
            }
        }
    }
}


const Rechazar2R = (COD_DETALLE) => {

    var row = $("#mtable" + COD_DETALLE + " tbody tr td input").length; // SE CAPTURA SIEMPRE Y CUANDO ESTE EL INPUT , OSEA EL CHECK , CUANDO EL CHECK NO ESTA ES POR QUE EN EL PROCESO ANTERIOR SE RECHAZO

    var cv = 0;

    $("#mtable" + COD_DETALLE + " tbody tr").each(function (i) {
        var x = i + 1;
        var result = $('#c' + x).is(":checked");
        if (result == true) {
            cv = cv + 1;
        }
    });

    if (row == cv) { // SI ESTAN TODOS LOS DETALLES RECHAZADO SE DEBE RECHAZAR EL DOCUMENTO EN GENERAL
        RechazarR(COD_DETALLE);
        getDataR(COD_DETALLE);
    } else {
        AceptarBTN2R(COD_DETALLE); // EN EL CASO DE AL MENOS QUEDE UN DETALLE APROBADO , SE DEBE ACEPTAR 
        RechazarDetalleR(COD_DETALLE); // RECHAZAR 
        getDataR(COD_DETALLE);
    }

}


const AceptarBTN2R = (COD_DETALLE) => {

    cod_sociedad = localStorage['cod_sociedad'];

    const url = `http://192.168.0.22:81/api/procesoaprobacion/aceptar/${cod_sociedad}/${COD_DETALLE}/2/1`;

    $.ajax({
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        url: url,
        type: "POST",
        dataType: 'json',
        success: function (res) {
            console.log(res);
        },
        error: function (err) {
            console.log(err);
            alert("Error al aceptar solicitud");

        },
    });


}


const RechazarR = (COD_DETALLE) => { // ENTRA AQUI CUANDO SE RECHAZA CON AL MENOS UN DETALLE RECHAZADO , ENTONCES AQUI SE DEBE RECHAZAR EL DOCUMENTO

    const url = `http://192.168.0.22:81/api/procesoaprobacion/rechazar/rendicion/${COD_DETALLE}`; // SE RECHAZA EL ENCABEZADO 

    $.ajax({
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        url: url,
        type: "POST",
        dataType: 'json',
        success: function (res) {
            RechazarDetalleR(COD_DETALLE); // AHORA SE DEBE CANCELAR LOS DETALLES 
        },
        error: function (err) {
            alert("Error al rachazar solicitud");

        },
    });

}

const RechazarDetalleR = (COD_DETALLE) => { // se debe rechazar los detalles

    $("#mtable" + COD_DETALLE + " tbody tr").each(function (i) {
        var x = i + 1;
        var result = $('#c' + x).is(":checked");

        if (result == true) {

            var cod = $(this).find("td").eq(0).html();
            var comentario = $(this).find("td").eq(7).html(); 



            const url = `http://192.168.0.22:81/api/fondorendirdetalle/rendicion/99/${cod}/${comentario}`; // se rechaza los detalles cuando este click

            $.ajax({
                url: url,
                type: "PUT"
            });
        }
    });

}

const getDataR = (COD_DETALLE) => {

    var data = new Object([]);
    var hora = getHora();
    var fecha = getFecha();
    var nombre = $("#nombres").text();

    $("#mtable" + COD_DETALLE + " tbody tr").each(function (i) {

        var x = i + 1;
        var result = $('#c' + x).is(":checked");
        var result2 = $(this).find("td").eq(6).html();
        var codigo = $(this).find("td").eq(0).html();
        var linea = $(this).find("td").eq(1).html();
        var comentario = $(this).find("td").eq(2).html();
        var monto = $(this).find("td").eq(4).html();
        var comentario_jefe = $(this).find("td").eq(7).html();
        var etapa = $(this).find("td").eq(7).html();

        monto = monto.replace(/,/g, "");

        if (result == true) {
            result = 1;
        } else {
            if (result2.toString() == "Rechazado") {
                result = 1;
            } else {
                result = 0;
            }

        }


        if (comentario_jefe.toString() == "") {
            comentario_jefe = "-"
        }

        var dataSet = {
            'LRA_HORA': hora,
            'LRA_FECHA': fecha,
            'LRA_CODIGO_RENDICION_DETALLE': codigo,
            'LRA_ETAPA': localStorage['etapa'],
            'LRA_ESTADO': result,
            'LRA_LINEA': linea,
            'LRA_COMENTARIO': comentario,
            'LRA_MONTO': monto,
            'LRA_COMENTARIO_JEFE': comentario_jefe,
            'LRA_JEFE': nombre,
            'LRA_CODIGO_RENDICION': COD_DETALLE
        }

        data.push(dataSet);

    });


    GuardarLogR(data);
}

const GuardarLogR = (data) => {

    $(data).each(function (i, x) {

        const json = JSON.stringify(x);
        const url = 'http://192.168.0.22:81/api/logs_rendicion';

        $.ajax({
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            url: url,
            type: "POST",
            dataType: 'json',
            data: json,
            error: function (err) {
                console.log(err);
            },
        });

    });


    Swal.fire({
        icon: 'success',
        title: 'Aprobación lista',
        showConfirmButton: false,
        timer: 2100
    })

    setTimeout(function () { location.reload() }, 2100);

}


const getHora = () => {
    var hora = new Date().getHours()
    var minutos = new Date().getMinutes()
    var segundos = new Date().getSeconds()

    return hora + ":" + minutos + ":" + segundos;
}

const getFecha = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;

    return today;
}


const Total = (CODIGO) => {
    var init = 0;
    $("#mtable" + CODIGO + " tbody tr").each(function (i) {
        var customerId = $(this).find("td").eq(4).html();
        var f = customerId.replace(',', '');
        f = f.replace(',', '');
        init = init + parseInt(f);
    });

    init = addCommas(init);

    $('#total' + CODIGO + '').text("Total: " + init);
}

function addCommas(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}