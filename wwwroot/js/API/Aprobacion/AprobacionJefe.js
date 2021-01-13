
$(document).ready(function () {
    const cod_sociedad = localStorage['cod_sociedad'];
    SegunTipoAprobacion(cod_sociedad);
    
    $("#FiltroUsuarios").keyup(function () {
        _this = this;

        $.each($("#TablaListarUsuariosAdministradores tbody tr"), function () {
            if ($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) === -1)
                $(this).hide();
            else
                $(this).show();
        });
    });

});

const SegunTipoAprobacion = (cod_sociedad) => {

    var pathname = window.location.pathname;
    var getURL = pathname.toString();
    var n = 1;
    var doc = '';

    if (getURL == '/Autorizador/AprobacionJefeRendicion' || getURL == '/usuario/AprobacionJefeRendicion' || getURL == '/Administrador/AprobacionJefeRendicion'  ) {
        n = 2;
        doc = 'rendicion';
    } else {
        n = 1;
        doc = 'fondorendir';
    }

    const url = `http://192.168.0.22:81/api/tipoaprobacion/${cod_sociedad}/${n}`;

    $.ajax({
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        type: "GET",
        url: url,
        success: function (res) {

            if (res.length == 0) {

            } else {
             localStorage['tipo_proceso'] = res[0]['ta_opcion']
    
             
                ListarUsuarios(doc);

            }
        }
    });
}

const ListarUsuarios = (doc) => {

    const cod_sociedad = localStorage['cod_sociedad'];
    const cod_jefe = localStorage['cod_usuario'];
    const url = `http://192.168.0.22:81/api/${doc}/solicitudes/${cod_jefe}/${cod_sociedad}`;

    $.ajax({
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        type: "GET",
        url: url,
        success: function (res) {
            var FILAS = '';
            var MSJ = `<div class="alert alert-primary text-center rounded-0 font-weight-bold shadow-sm " role="alert">
                          Sin solicitudes de aprobación
                       </div>`;
           

            if (res.length == 0) {
                $("#Mensaje").append(MSJ);
            }

            $.each(res, function (i, item) {

                if (doc == 'fondorendir') {
                    doc = 'fondo por rendir'
                }

                FILAS += 

            `<tr>
                <td class="text-center" style="font-size: 13px;" class="pt-3-half" >${item.cod_doc}</td>
                <td class="text-center" style="font-size: 13px;" class="pt-3-half">${item.cod_usuario}</td>
                <td class="text-center" style="font-size: 13px;" class="pt-3-half">${item.fxr_fecha_creacion}</td>
                <td class="text-center" style="font-size: 13px;" class="pt-3-half">${item.fxr_fecha_necesaria}</td>
                <td class="text-center" style="font-size: 13px;" class="pt-3-half">${item.fxr_comentario}</td>
             
                <td class="text-center" style="font-size: 13px;" class="pt-3-half">  <a href="" data-toggle="modal" data-target="#modal${item.cod_doc}" onclick="ListarDetalle('${item.cod_doc}')" style="text-decoration:none;" ><img height="16px" src="http://localhost:5001/img/ojo.png"/></a>
                
                    <div class="modal fade bd-example-modal-lg" id="modal${item.cod_doc}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                        
                    <div class="modal-dialog modal-lg" role="document">

                            <div class="modal-content container text-left">

                                <div class="modal-header pl-0 pr-0">
                                    <h5 class="modal-title" >Solicitud de ${doc} de  <h5 class="modal-title text-info font-weight-bold ml-2"> ${item.cod_usuario} </h5>    </h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>

                                <div class="row ">

                                      <div class="col-12 col-lg-6 pt-2">
                                            <div class="form-group">
                                                <label for="" class="text-dark " style="font-weight: 500;">
                                                    Fecha solicitud actual  <span class="text-danger"> * </span>
                                                </label>
                                                <input  value="${item.fxr_fecha_creacion}" placeholder="Sin Proyecto" type="date" class="form-control rounded-0 mt-2 form-control-sm" id="Is_FechaCreacion"  disabled> 
                                            </div>
                                        </div>

                                        <div class="col-12 col-lg-6 pt-2">
                                            <div class="form-group">
                                                <label for="" class="text-dark " style="font-weight: 500;">
                                                    Fecha Requerida actual  <span class="text-danger">
                                                        *
                                                    </span>
                                                </label>
                                                <input  value="${item.fxr_fecha_necesaria}" disabled placeholder="Sin Centro de costo" type="date" class=" form-control rounded-0 mt-2 form-control-sm" id="Is_FechaRequerida${item.cod_doc}" >
                                            </div>
                                        </div>

                                      
                                        <div class="col-12 col-lg-12 pt-3">
                                            <div class="form-group">
                                                <label for="" class="text-dark " style="font-weight: 500;">
                                                    Comentario<span class="text-danger">
                                                        *
                                                    </span>
                                                </label>
                                                <textarea class="form-control mt-2" rows="2"   maxlength="200" disabled>${item.fxr_comentario}</textarea>
                                            </div>
                                        </div>

                                    
                 
                                    <div class="table-responsive mt-4 ">

                                        <table class="table table-striped table-bordered" id="mtable${item.cod_doc}">
                        
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
                        
                                            <tbody id="tabla${item.cod_doc}">

                                            </tbody>
                        
                                        </table>

                                          <div class="mt-2 pb-3 mr-3 float-right">
                                                <span  id="total${item.cod_doc}">
                                                 TOTAL: 
                                                </span>
                                          </div>
                        
                                    </div>

                                </div>

                                <div class="modal-footer">
                                    <button type="button" onclick="AceptarBTN('${item.cod_doc}');" class="btn btn-info font-weight-bold rounded-0 btn-sm">Aprobar todos</button>
                                    <button type="button"  onclick="ValidarComentario('${item.cod_doc}');" class="btn btn-danger font-weight-bold rounded-0  btn-sm" >Rechazar seleccionados </button>
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


const ListarDetalle = (COD_FONDO) => {

    var pathname = window.location.pathname;
    var getURL = pathname.toString();

    var doc = '';

    if (getURL == '/Autorizador/AprobacionJefeRendicion' || getURL == '/usuario/AprobacionJefeRendicion' || getURL == '/Administrador/AprobacionJefeRendicion') {
       
        doc = 'rendiciondetalle';
    } else {
       
        doc = 'fondorendirdetalle';
    }


    $("#tabla"+COD_FONDO+" tr").remove();

    const url = `http://192.168.0.22:81/api/${doc}/${COD_FONDO}`;
    $.ajax({
        url:url,
        type: "GET",
        dataType: 'json',
        success: function (response) {
            var HTML = '';
            $.each(response, function (i, item) {


                if (getURL == '/Autorizador/AprobacionJefeRendicion' || getURL == '/usuario/AprobacionJefeRendicion' || getURL == '/Administrador/AprobacionJefeRendicion') {

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
                        <td style="font-size: 13px;" class="text-center" class="pt-3-half"> <input class="form-check-input text-danger" id="c${ind}"  type="checkbox"></td>
                        <td style="font-size: 13px;" class="text-center" class="pt-3-half"  contenteditable="true"></td>
                        <td style="font-size: 13px;" class="pt-3-half text-center">
                        <a href="" data-toggle="modal" data-target="#modalFoto${item.cod_rendicion_detalle}" onclick="ListarImagen('${item.cod_rendicion_detalle}','${item.cod_adjunto}')" style="text-decoration:none;" ><img height="16px" src="http://localhost:5001/img/ojo.png"/>
                

                        <div class="modal fade" id="modalFoto${item.cod_rendicion_detalle}" tabindex="-1" role="dialog" style="margin-top:100px;" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                           
                        <button type="button"  class="close" onclick="CerrarModal(event,'${item.cod_rendicion_detalle}');">
                        <span aria-hidden="true">&times;</span>
                        </button>
                        </div>

                        <div class="modal-body">
                                 
                        <img class="w-100 w-100" id="DocumentoImagen${item.cod_rendicion_detalle}" src="first.jpg"/>

                        </div>
                          
                        </div>
                        </div>
                        </div>

                </td>
                    </tr>`;
                    } else {
                        HTML +=
                            `<tr>
                        <td style="font-size: 13px;" class="text-center" class="pt-3-half">${item.cod_rendicion_detalle}</td> 
                        <td style="font-size: 13px;" class="text-center" class="pt-3-half">${ind}</td> 
                        <td style="font-size: 13px;" class="text-center" class="pt-3-half">${item.art_nombre}</td> 
                        <td style="font-size: 13px;" class="text-center" class="pt-3-half">${item.rd_comentario}</td>
                        <td style="font-size: 13px;" class="text-center" class="pt-3-half">${monto}</td> 
                        <td style="font-size: 13px;" class="text-center" class="pt-3-half">${item.proyecto}</td> 
                        <td style="font-size: 13px;" class="text-center" class="pt-3-half"> <input class="form-check-input text-danger" id="c${ind}" type="checkbox" ></td>
                        <td style="font-size: 13px;" class="text-center" class="pt-3-half"  contenteditable="true"> </td>
                        <td style="font-size: 13px;" class="pt-3-half text-center">
                        <a href="" data-toggle="modal" data-target="#modalFoto${item.cod_rendicion_detalle}" onclick="ListarImagen('${item.cod_rendicion_detalle}','${item.cod_adjunto}')" style="text-decoration:none;" ><img height="16px" src="http://localhost:5001/img/ojo.png"/>
                

                        <div class="modal fade" id="modalFoto${item.cod_rendicion_detalle}" tabindex="-1" role="dialog" style="margin-top:100px;" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                           
                        <button type="button"  class="close" onclick="CerrarModal(event,'${item.cod_rendicion_detalle}');">
                        <span aria-hidden="true">&times;</span>
                        </button>
                        </div>

                        <div class="modal-body">
                                 
                        <img class="w-100 w-100" id="DocumentoImagen${item.cod_rendicion_detalle}" src="first.jpg"/>

                        </div>
                          
                        </div>
                        </div>
                        </div>

                        </td>
                    </tr>`;
                    }


                } else {

                    var estado = item.fxrd_estado.toString();

                    var monto = addCommas(item.fxrd_monto);

                    var ind = i + 1;

                    if (estado == "0") {
                        HTML +=
                            `<tr>
                        <td style="font-size: 13px;" class="text-center" class="pt-3-half">${item.cod_fondo_por_rendir_detalle}</td> 
                        <td style="font-size: 13px;" class="text-center" class="pt-3-half">${ind}</td> 
                        <td style="font-size: 13px;" class="text-center" class="pt-3-half">${item.art_producto}</td> 
                        <td style="font-size: 13px;" class="text-center" class="pt-3-half">${item.fxrd_comentario}</td>
                        <td style="font-size: 13px;" class="text-center" class="pt-3-half">${monto}</td> 
                        <td style="font-size: 13px;" class="text-center" class="pt-3-half">${item.cod_proyecto}</td> 
                        <td style="font-size: 13px;" class="text-center" class="pt-3-half"> <input class="form-check-input text-danger" id="c${ind}"  type="checkbox"></td>
                        <td style="font-size: 13px;" class="text-center" class="pt-3-half"  contenteditable="true"></td>
 <td style="font-size: 13px;" class="pt-3-half text-center">
                <a href="" data-toggle="modal" data-target="#modalFoto${item.cod_rendicion_detalle}" onclick="ListarImagen('${item.cod_rendicion_detalle}','${item.cod_adjunto}')" style="text-decoration:none;" ><img height="16px" src="http://localhost:5001/img/ojo.png"/>
                

                    <div class="modal fade" id="modalFoto${item.cod_rendicion_detalle}" tabindex="-1" role="dialog" style="margin-top:100px;" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div class="modal-dialog" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                           
                            <button type="button"  class="close" onclick="CerrarModal(event,'${item.cod_rendicion_detalle}');">
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>

                          <div class="modal-body">
                                 
                                <img class="w-100 w-100" id="DocumentoImagen${item.cod_rendicion_detalle}" src="first.jpg"/>

                          </div>
                          
                        </div>
                      </div>
                    </div>

                </td>
                    </tr>`;
                    } else {
                        HTML +=
                            `<tr>
                        <td style="font-size: 13px;" class="text-center" class="pt-3-half">${item.cod_fondo_por_rendir_detalle}</td> 
                        <td style="font-size: 13px;" class="text-center" class="pt-3-half">${ind}</td> 
                        <td style="font-size: 13px;" class="text-center" class="pt-3-half">${item.art_producto}</td> 
                        <td style="font-size: 13px;" class="text-center" class="pt-3-half">${item.fxrd_comentario}</td>
                        <td style="font-size: 13px;" class="text-center" class="pt-3-half">${monto}</td> 
                        <td style="font-size: 13px;" class="text-center" class="pt-3-half">${item.cod_proyecto}</td> 
                        <td style="font-size: 13px;" class="text-center" class="pt-3-half"> <input class="form-check-input text-danger" id="c${ind}" type="checkbox" ></td>
                        <td style="font-size: 13px;" class="text-center" class="pt-3-half"  contenteditable="true"> </td>
 <td style="font-size: 13px;" class="pt-3-half text-center">
                <a href="" data-toggle="modal" data-target="#modalFoto${item.cod_rendicion_detalle}" onclick="ListarImagen('${item.cod_rendicion_detalle}','${item.cod_adjunto}')" style="text-decoration:none;" ><img height="16px" src="http://localhost:5001/img/ojo.png"/>
                

                    <div class="modal fade" id="modalFoto${item.cod_rendicion_detalle}" tabindex="-1" role="dialog" style="margin-top:100px;" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div class="modal-dialog" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                           
                            <button type="button"  class="close" onclick="CerrarModal(event,'${item.cod_rendicion_detalle}');">
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>

                          <div class="modal-body">
                                 
                                <img class="w-100 w-100" id="DocumentoImagen${item.cod_rendicion_detalle}" src=""/>

                          </div>
                          
                        </div>
                      </div>
                    </div>

                </td>
                    </tr>`;
                    }


                }

              

               
            });

            $("#tabla" + COD_FONDO + "").append(HTML);

            Total(COD_FONDO);
  
        },
        error:function(err){
            console.log(err);
        },
    });

}


const CerrarModal = (event, COD) => {
    event.preventDefault();

    $(`#modalFoto${COD}`).modal('hide')

}






const ListarImagen = (COD, COD_ADJ) => {

    const url = `http://192.168.0.22:81/api/adjunto/${COD_ADJ}`;

    $.ajax({
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        url: url,
        type: "GET",
        dataType: 'json',
        success: function (res) {
            var imgdoc = res.url.toString();
            imgdoc = 'http://192.168.0.22:81/adjunto/' + imgdoc
            $("#DocumentoImagen" + COD + "").attr("src", imgdoc);
        },

        error: function (response) {

        }

    });
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


const Aceptar = (COD_DETALLE,COD_FONDO) => {
   
    const url = `http://192.168.0.22:81/api/fondorendirdetalle/0/${COD_DETALLE}`;

    $.ajax({
        url:url,
        type: "PUT",
        dataType: 'json',
        success: function (response) {
         
            ListarDetalle(COD_FONDO);
           
        },
        error:function(err){
            
            ListarDetalle(COD_FONDO);
         
        },
    });

}

const ValidarCheck = (CODIGO) => {
  
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
    } else {
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
        });
       
        if (cv == 0) {

            if (localStorage['tipo_proceso'] == 2) {

                Rechazarx(COD_DETALLE);
                getData(COD_DETALLE);

            } else {
               
                Rechazar2(COD_DETALLE);
            }
           
        } 
    }
}

const Rechazar2 = (COD_DETALLE) => {

    var row = $("#mtable" + COD_DETALLE + " tbody tr").length;

    var cv = 0;

    $("#mtable" + COD_DETALLE + " tbody tr").each(function (i) {
        var x = i + 1;
        var result = $('#c' + x).is(":checked");
        if (result == true) {
           cv = cv + 1; 
        }
    });

    if (row == cv) {
     
        Rechazar3(COD_DETALLE);
        getData(COD_DETALLE);  
  
    } else {
 
        AceptarBTN2(COD_DETALLE);
        RechazarDetalle(COD_DETALLE);
        getData(COD_DETALLE);  
    }
   
}

const Rechazar3 = (COD_DETALLE) => {


    var pathname = window.location.pathname;
    var getURL = pathname.toString();

    var url = '';

    if (getURL == '/Autorizador/AprobacionJefeRendicion' || getURL == '/usuario/AprobacionJefeRendicion' || getURL == '/Administrador/AprobacionJefeRendicion') {

        url = `http://192.168.0.22:81/api/procesoaprobacion/rechazar/rendicion/${COD_DETALLE}`;

    } else {

        url = `http://192.168.0.22:81/api/procesoaprobacion/rechazar/${COD_DETALLE}`;
    }



    $.ajax({
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        url: url,
        type: "POST",
        dataType: 'json',
        success: function (res) {
            RechazarDetalle(COD_DETALLE);
        },
        error: function (err) {
            alert("Error al rachazar solicitud");

        },
    });

}


const Rechazarx = (COD_DETALLE) => {

    var pathname = window.location.pathname;
    var getURL = pathname.toString();

    var url = '';

    if (getURL == '/Autorizador/AprobacionJefeRendicion' || getURL == '/usuario/AprobacionJefeRendicion' || getURL == '/Administrador/AprobacionJefeRendicion') {

         url = `http://192.168.0.22:81/api/procesoaprobacion/rechazar/rendicion/${COD_DETALLE}`;
    } else {

        url = `http://192.168.0.22:81/api/procesoaprobacion/rechazar/${COD_DETALLE}`;
    }

    $.ajax({
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        url: url,
        type: "POST",
        dataType: 'json',
        success: function (res) {
            RechazarDetalle(COD_DETALLE);
        },
        error: function (err) {
            alert("Error al rachazar solicitud");

        },
    });

};



const RechazarDetalle = (COD_DETALLE) => {

    $("#mtable" + COD_DETALLE + " tbody tr").each(function (i) {
        var x = i + 1;
        var result = $('#c' + x).is(":checked");

        if (result == true) {

            var cod = $(this).find("td").eq(0).html();
            var comentario = $(this).find("td").eq(7).html();

            var pathname = window.location.pathname;
            var getURL = pathname.toString();

            var url = '';

            if (getURL == '/Autorizador/AprobacionJefeRendicion' || getURL == '/usuario/AprobacionJefeRendicion' || getURL == '/Administrador/AprobacionJefeRendicion') {

                url = `http://192.168.0.22:81/api/fondorendirdetalle/rendicion/99/${cod}/${comentario}`;
            } else {

                url = `http://192.168.0.22:81/api/fondorendirdetalle/99/${cod}/${comentario}`;
            }

     

            $.ajax({
                url: url,
                type: "PUT"
            });
        }
    });

};

const AceptarBTN = (COD_DETALLE) => {
    
    cod_sociedad = localStorage['cod_sociedad'];
    var pathname = window.location.pathname;
    var getURL = pathname.toString();
    var url = '';

    if (getURL == '/Autorizador/AprobacionJefeRendicion' || getURL == '/usuario/AprobacionJefeRendicion' || getURL == '/Administrador/AprobacionJefeRendicion') {

        url = `http://192.168.0.22:81/api/procesoaprobacion/aceptar/rendicion/${cod_sociedad}/${COD_DETALLE}/2/`;

    } else {

        url = `http://192.168.0.22:81/api/procesoaprobacion/aceptar/${cod_sociedad}/${COD_DETALLE}/1/`;
    }


    $.ajax({
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        url: url,
        type: "POST",
        dataType: 'json',
        success: function (res) {
             getData(COD_DETALLE);
           
           
        },
        error: function (err) {
            alert("Error al aceptar solicitud");
            console.log(err);
            location.reload();
        },
    });

}

const getData = (COD_DETALLE) => {

    var data = new Object([]);
    var hora = getHora();
    var fecha = getFecha();
    var nombre = $("#nombres").text();

    $("#mtable" + COD_DETALLE + " tbody tr").each(function (i) {

        var x = i + 1;
        var result = $('#c' + x).is(":checked");
        var codigo = $(this).find("td").eq(0).html();
        var linea = $(this).find("td").eq(1).html();
        var comentario = $(this).find("td").eq(2).html();
        var monto = $(this).find("td").eq(4).html();
        var comentario_jefe = $(this).find("td").eq(7).html();

        monto = monto.replace(/,/g, "");

        if (result == true) {
            result = 1; 
        } else { 
            result = 0;
        }



        if (comentario_jefe.toString() == "") {
            comentario_jefe = "-"
        } 

        cod_sociedad = localStorage['cod_sociedad'];
        var pathname = window.location.pathname;
        var getURL = pathname.toString();
        var url = '';

        if (getURL == '/Autorizador/AprobacionJefeRendicion' || getURL == '/usuario/AprobacionJefeRendicion' || getURL == '/Administrador/AprobacionJefeRendicion') {

            var dataSet = {
                'LRA_HORA': hora,
                'LRA_FECHA': fecha,
                'LRA_CODIGO_RENDICION_DETALLE': codigo,
                'LRA_ETAPA': 0,
                'LRA_ESTADO': result,
                'LRA_LINEA': linea,
                'LRA_COMENTARIO': comentario,
                'LRA_MONTO': monto,
                'LRA_COMENTARIO_JEFE': comentario_jefe,
                'LRA_JEFE': nombre,
                'LRA_CODIGO_RENDICION': COD_DETALLE
            }

        } else {

            var dataSet = {
                'LFXR_HORA': hora,
                'LFXR_FECHA': fecha,
                'LFXR_CODIGO_FONDO_POR_RENDIR_DETALLE': codigo,
                'LFXR_ETAPA': 0,
                'LFXR_ESTADO': result,
                'LFXR_LINEA': linea,
                'LFXR_COMENTARIO': comentario,
                'LFXR_MONTO': monto,
                'LFXR_COMENTARIO_JEFE': comentario_jefe,
                'LFXR_JEFE': nombre,
                'LFXR_CODIGO_FONDO_POR_RENDIR': COD_DETALLE
            }
        }


     

        data.push(dataSet);
       
    });

    
   GuardarLog(data);
}

const GuardarLog = (data) => {

    $(data).each(function (i,x) {

        const json = JSON.stringify(x);

        var pathname = window.location.pathname;
        var getURL = pathname.toString();
        var url = '';


        if (getURL == '/Autorizador/AprobacionJefeRendicion' || getURL == '/usuario/AprobacionJefeRendicion' || getURL == '/Administrador/AprobacionJefeRendicion') {
            url = 'http://192.168.0.22:81/api/logs_rendicion';
        } else {
            url = 'http://192.168.0.22:81/api/logaprobacion';
        }

        

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

    return hora + ":" + minutos + ":" + segundos  ;
}

const getFecha = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;

    return today;
}

const AceptarBTN2 = (COD_DETALLE) => {

    cod_sociedad = localStorage['cod_sociedad'];

    var pathname = window.location.pathname;
    var getURL = pathname.toString();
    var url = '';

    if (getURL == '/Autorizador/AprobacionJefeRendicion' || getURL == '/usuario/AprobacionJefeRendicion' || getURL == '/Administrador/AprobacionJefeRendicion') {
        url = `http://192.168.0.22:81/api/procesoaprobacion/aceptar/${cod_sociedad}/${COD_DETALLE}/2/1`;
    } else {
        url = `http://192.168.0.22:81/api/procesoaprobacion/aceptar/${cod_sociedad}/${COD_DETALLE}/1/1`;
    }


    

    $.ajax({
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        url:url,
        type: "POST",
        dataType: 'json',
        success: function (res) {

      
        },
        error:function(err){
            alert("Error al aceptar solicitud");
          
        }
    });


}

