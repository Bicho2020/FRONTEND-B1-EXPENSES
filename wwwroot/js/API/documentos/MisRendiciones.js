$(document).ready(function () {

    cod_usuario = localStorage['cod_usuario'];
    cod_sociedad = localStorage['cod_sociedad'];

    const URL = `http://192.168.0.22:81/api/rendicion/${cod_usuario}/${cod_sociedad}/COD_RENDICION/DESC`;
    HTTP_GET_RENDICIONES(URL);

    $("#FiltroMisRendiciones").keyup(function () {
        _this = this;

        $.each($("#TablaRendiciones tbody tr"), function () {
            if ($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) === -1)
                $(this).hide();
            else
                $(this).show();
        });
    });

    $("#order").change(function () {
        
        var value = $("#order").val();

        if (value == "Aprobado") {

            const URL = `http://192.168.0.22:81/api/rendicion/FILTRO/${cod_usuario}/${cod_sociedad}/101`;
            HTTP_GET_RENDICIONES(URL);

        } else {

            if (value == "Sap") {
                const URL = `http://192.168.0.22:81/api/rendicion/FILTRO/${cod_usuario}/${cod_sociedad}/100`;
                HTTP_GET_RENDICIONES(URL);


            } else {

                if (value == "Rechazada") {
                    const URL = `http://192.168.0.22:81/api/rendicion/FILTRO/${cod_usuario}/${cod_sociedad}/99`;
                    HTTP_GET_RENDICIONES(URL);
                } else {

                    if (value == "Proceso") {
                        const URL = `http://192.168.0.22:81/api/rendicion/FILTRO/${cod_usuario}/${cod_sociedad}/x`;
                        HTTP_GET_RENDICIONES(URL);
                    } else {

                        if (value.toString() == "value") {

                        } else {
                            if (value.toString() == "APROBACION_JEFE") {
                                var value = "ASC";
                                var data = "REND_APROBACION_JEFE";
                                const URL = `http://192.168.0.22:81/api/rendicion/${cod_usuario}/${cod_sociedad}/${data}/${value}`;
                                HTTP_GET_RENDICIONES(URL);
                            } else {
                                if (value == "ASC") {
                                    var value = "ASC";
                                    var data = "COD_RENDICION";
                                    const URL = `http://192.168.0.22:81/api/rendicion/${cod_usuario}/${cod_sociedad}/${data}/${value}`;
                                    HTTP_GET_RENDICIONES(URL);
                                } else {
                                    if (value = "DESC") {
                                        var value = "DESC";
                                        var data = "COD_RENDICION";
                                        const URL = `http://192.168.0.22:81/api/rendicion/${cod_usuario}/${cod_sociedad}/${data}/${value}`;
                                        HTTP_GET_RENDICIONES(URL);
                                    }

                                }
                            }

                        }
                    }
                }
            }


        }

    });


});

const HTTP_GET_RENDICIONES = (URL) => {

    

    $.ajax({
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        url: URL,
        type: "GET",
        success: function (res) {
            ListarRendiciones(res);
        },
        error: function (err) {
            //alert("Error al listar "); 
        }
    });
}



const ListarRendiciones = (res) => {

    $('#TablaRendiciones tr td').remove();

    var FILAS = '';

    $.each(res, function (i, item) {

        var urlImagen = parseInt(item.aprobacion);
        var Estado = (item.aprobacion).toString();
        var ELIMINAR = '';
        var ACTUALIZAR = '';

        
    
        if (urlImagen != 100 && urlImagen != 99 && urlImagen != 101) {
    
            urlImagen = 'http://localhost:5001/img/state.png';

        } else {
            

            if (urlImagen == 100) {
                urlImagen = 'http://localhost:5001/img/Ssap.png';
            }

            if (urlImagen == 99) {
                urlImagen = 'http://localhost:5001/img/poder.png';
            }

            if (urlImagen == 101) {
                urlImagen = 'http://localhost:5001/img/potencia.png';
            }

            
            
        }


        if (Estado != '0') { // NO SE PUEDE ELIMINAR NI MODIFICAR
            FILAS += `<tr>
                        <td  class="p-1 text-center"> <img height="13px" src="${urlImagen}"/> </td>
                        <td style="font-size: 13px;" class="pt-3-half text-center">${item.coD_RENDICION}</td>
                        <td style="font-size: 13px;" class="pt-3-half text-center">${item.fechA_CREACION}</td>
                        <td style="font-size: 13px;" class="pt-3-half text-center ">${item.fechA_REQUERIDA}</td>
                        <td style="font-size: 13px;" class="pt-3-half text-center">${item.comentario}</td>
                        <td style="font-size: 13px;" class="pt-3-half text-center "> <a type="button" onclick="AbrirFilasAprobaciones('${item.coD_RENDICION}')"  data-toggle="modal" data-target="#proceso${item.coD_RENDICION}" ><img height="15px" src="http://localhost:5001/img/verProceso.png" alt="Alternate Text" /></a>

                        <div class="modal fade bd-example-modal-lg" id="proceso${item.coD_RENDICION}" aria-hidden="true">
                          <div class="modal-dialog modal-lg">
                            <div class="modal-content container">

                                 <div class="modal-header pl-0 pr-0">
                                            <h5 class="modal-title" >Etapas de aprobacion para el documento numero <h5 class="text-info ml-2 font-weight-bold modal-title"> ${item.coD_RENDICION}</h5> </h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                            </button>
                                 </div>

                                 <table class="table table-striped table-bordered table-hover w-100 " >

                                <thead class="thead-dark w-100 ">

                                    <tr>
                                        <th scope="col" class="text-center" style="font-size: 13px; font-weight: 500;" hidden>En Proceso</th>
                                        <th scope="col" class="text-center" style="font-size: 13px; font-weight: 500;"></th>
                                        <th scope="col" class="text-center" style="font-size: 13px; font-weight: 500;">Numero</th>
                                        <th scope="col" class="text-center" style="font-size: 13px; font-weight: 500;">Etapa</th>
                                        <th scope="col" class="text-center" style="font-size: 13px; font-weight: 500;">Autorizador</th>
                                        <th scope="col" class="text-center" style="font-size: 13px; font-weight: 500;">Articulo</th>
                                        <th scope="col" class="text-center" style="font-size: 13px; font-weight: 500;">Hora</th>
                                        <th scope="col" class="text-center" style="font-size: 13px; font-weight: 500;">Fecha</th>
                                        <th scope="col" class="text-center" style="font-size: 13px; font-weight: 500;">Comentario jefe</th>
 
                                    </tr>

                                </thead>

                                <tbody id="T${item.coD_RENDICION}">

                                </tbody>

                            </table>

                            </div>
                          </div>
                        </div>                

                        </td>

                          <td id="idActualizar${item.coD_RENDICION}"  style="font-size: 13px;" class="pt-3-half text-center"> No disponible


                        <div class="modal fade bd-example-modal-lg" id="modalM${item.coD_RENDICION}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                        
                            <div class="modal-dialog modal-lg" role="document">

                                    <div class="modal-content container">

                                        <div class="modal-header pl-0 pr-0">
                                            <h5 class="modal-title" >Modificar encabezado para fondo numero  <h5 class="text-info ml-2 font-weight-bold modal-title"> ${item.coD_RENDICION}</h5> </h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>

                                        <div class=" pb-3 text-left">

                                            <form class="row" onsubmit="Actualizar(event,'${item.coD_RENDICION}')" >

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
                                                        <input  value="${item.fechA_REQUERIDA}" " placeholder="Sin Centro de costo" type="date" class=" form-control rounded-0 mt-2 form-control-sm" id="Is_FechaRequerida${item.cod_fondo_por_rendir}" >
                                                    </div>
                                                </div>

                                      
                                                <div class="col-12 col-lg-12 pt-3">
                                                    <div class="form-group">
                                                        <label for="" class="text-dark " style="font-weight: 500;">
                                                            Comentario<span class="text-danger">
                                                                *
                                                            </span>
                                                        </label>
                                                        <textarea class="form-control mt-2" id="Is_Comentario${item.coD_RENDICION}" rows="3"   maxlength="200" required>${item.comentario}</textarea>
                                                    </div>
                                                </div>

                                                <div class="float-right">
                                                    <div class="form-group">
                                                        <button type="submit" style="background-color:#0abbec; border-color:#5abeda ;"
                                                                class="btn rounded-0 btn-primary btn-sm shadow font-weight-bold mt-3 float-right">
                                                            Actualizar
                                                        </button>
                                                    </div>
                                                </div>

                                            </form>

                                        </div>

                                    </div>

                                </div>

                            </div>
                
                        </td>

                        <td id="idEliminar${item.coD_RENDICION}" style="font-size: 13px;" class="pt-3-half text-center"> No disponible </td>


                        <td style="font-size: 13px;" class="pt-3-half text-center">  <a href="" data-toggle="modal" data-target="#modal${item.coD_RENDICION}" onclick="ListarDetalle('${item.coD_RENDICION}')" style="text-decoration:none;" ><img height="16px" src="http://localhost:5001/img/ojo.png"/></a>
                
                            <div class="modal fade bd-example-modal-lg" id="modal${item.coD_RENDICION}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                        
                            <div class="modal-dialog modal-lg" role="document">

                                    <div class="modal-content container">

                                         <div class="modal-header pl-0 pr-0">
                                            <h5 class="modal-title" >Detalle del fondo numero  <h5 class="text-info ml-2 font-weight-bold modal-title"> ${item.coD_RENDICION}</h5> </h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>

                                        <div class="pb-3 row text-left">

                                                  <div class="col-12 col-lg-6 pt-2">
                                                    <div class="form-group">
                                                        <label for="" class="text-dark " style="font-weight: 500;">
                                                            Fecha solicitud actual  <span class="text-danger"> * </span>
                                                        </label>
                                                        <input  value="${item.fechA_CREACION}" placeholder="Ingrese usuario para la sociedad" type="date" class="form-control rounded-0 mt-2 form-control-sm" id="Is_FechaCreacion" required disabled> 
                                                    </div>
                                                </div>

                                                <div class="col-12 col-lg-6 pt-2">
                                                    <div class="form-group">
                                                        <label for="" class="text-dark " style="font-weight: 500;">
                                                            Fecha Requerida actual  <span class="text-danger">
                                                                *
                                                            </span>
                                                        </label>
                                                        <input  disabled  value="${item.fechA_REQUERIDA}" " placeholder="Ingrese" type="date" class=" form-control rounded-0 mt-2 form-control-sm" id="Is_FechaRequerida${item.cod_fondo_por_rendir}" required>
                                                    </div>
                                                </div>

                                                <div class="col-12 col-lg-6 pt-2">
                                                    <div class="form-group">
                                                        <label for="" class="text-dark " style="font-weight: 500;">
                                                            Proyecto  <span class="text-danger"> * </span>
                                                        </label>
                                                        <input  value="${item.proyecto}"  placeholder="Sin Proyecto" type="text" class="form-control rounded-0 mt-2 form-control-sm" id="Is_FechaCreacion" required disabled> 
                                                    </div>
                                                </div>

                                                <div class="col-12 col-lg-6 pt-2">
                                                    <div class="form-group">
                                                        <label for="" class="text-dark " style="font-weight: 500;">
                                                            Centro de costos  <span class="text-danger">
                                                                *
                                                            </span>
                                                        </label>
                                                        <input  disabled  value="${item.centrO_DE_COSTO}"  placeholder="Sin Centro de costo"  type="text" class=" form-control rounded-0 mt-2 form-control-sm" id="Is_FechaRequerida${item.cod_fondo_por_rendir}" required>
                                                    </div>
                                                </div>

                                                <div class="col-12 col-lg-12 pt-3">
                                                    <div class="form-group">
                                                        <label for="" class="text-dark " style="font-weight: 500;">
                                                            Comentario<span class="text-danger">
                                                                *
                                                            </span>
                                                        </label>
                                                        <textarea disabled class="form-control mt-2" id="Is_Comentario${item.coD_RENDICION}" rows="2"   maxlength="200" required>${item.comentario}</textarea>
                                                    </div>
                                                </div>


                                                <div class=" pt-3" >
                                                <span id="ProcesoAprobacion${item.coD_RENDICION}">Autorizador o proceso actual: <span>
                                </div>


                                            <div class="table-responsive mt-4 ">

                                                 <table class="table table-striped table-bordered table-hover w-100 " id="mtabla${item.coD_RENDICION}" >
                        
                                                    <thead class="thead-dark ">
                        
                                                        <tr>
                                                          <th scope="col"  class="text-center" style="font-size: 13px; font-weight: 500;"></th>
                                                            <th scope="col"  class="text-center" style="font-size: 13px; font-weight: 500;">Numero</th>
                                                            <th scope="col"  class="text-center" style="font-size: 13px; font-weight: 500;">Linea</th>
                                                            <th scope="col"  class="text-center" style="font-size: 13px; font-weight: 500;">Nombre</th>
                                                            <th scope="col"  class="text-center" style="font-size: 13px; font-weight: 500;">Comentario</th>
                                                            <th scope="col"  class="text-center" style="font-size: 13px; font-weight: 500;">Monto</th>
                                                            <th scope="col"   class="text-center" style="font-size: 13px; font-weight: 500;">Estado</th>
                                                            <th scope="col"  class="text-center" style="font-size: 13px; font-weight: 500;">Comentario jefe</th>
                                                  
                                                        </tr>
                        
                                                    </thead>
                        
                                                    <tbody id="tabla${item.coD_RENDICION}">

                                                    </tbody>
                        
                                                </table>

                                                   <div class="mt-3 mr-3 float-right">
                                                        <span  id="total${item.coD_RENDICION}">
                                                         TOTAL: 
                                                        </span>
                                                  </div>
                        
                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </td>
                </tr>`
                ;    
        } else { // SE PUEDE ELIMINAR Y MODIFICAR

            FILAS += `<tr>
                        <td  class="p-1 text-center"> <img height="13px" src="${urlImagen}"/> </td>
                        <td style="font-size: 13px;" class="pt-3-half text-center">${item.coD_RENDICION}</td>
                        <td style="font-size: 13px;" class="pt-3-half text-center">${item.fechA_CREACION}</td>
                        <td style="font-size: 13px;" class="pt-3-half text-center ">${item.fechA_REQUERIDA}</td>
                        <td style="font-size: 13px;" class="pt-3-half text-center">${item.comentario}</td>
                        <td style="font-size: 13px;" class="pt-3-half text-center "> <a type="button" onclick="AbrirFilasAprobaciones('${item.coD_RENDICION}')"  data-toggle="modal" data-target="#proceso${item.coD_RENDICION}" ><img height="15px" src="http://localhost:5001/img/verProceso.png" alt="Alternate Text" /></a>

                        <div class="modal fade bd-example-modal-lg" id="proceso${item.coD_RENDICION}" aria-hidden="true">
                          <div class="modal-dialog modal-lg">
                            <div class="modal-content container">

                                 <div class="modal-header pl-0 pr-0">
                                            <h5 class="modal-title" >Etapas de aprobacion para el documento numero <h5 class="text-info ml-2 font-weight-bold modal-title"> ${item.coD_RENDICION}</h5> </h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                            </button>
                                 </div>

                                 <table class="table table-striped table-bordered table-hover w-100 " >

                                <thead class="thead-dark w-100 ">

                                    <tr>
                                        <th scope="col" class="text-center" style="font-size: 13px; font-weight: 500;" hidden>En Proceso</th>
                                        <th scope="col" class="text-center" style="font-size: 13px; font-weight: 500;"></th>
                                        <th scope="col" class="text-center" style="font-size: 13px; font-weight: 500;">Numero</th>
                                        <th scope="col" class="text-center" style="font-size: 13px; font-weight: 500;">Etapa</th>
                                        <th scope="col" class="text-center" style="font-size: 13px; font-weight: 500;">Autorizador</th>
                                        <th scope="col" class="text-center" style="font-size: 13px; font-weight: 500;">Articulo</th>
                                        <th scope="col" class="text-center" style="font-size: 13px; font-weight: 500;">Hora</th>
                                        <th scope="col" class="text-center" style="font-size: 13px; font-weight: 500;">Fecha</th>
                                        <th scope="col" class="text-center" style="font-size: 13px; font-weight: 500;">Comentario jefe</th>
 
                                    </tr>

                                </thead>

                                <tbody id="T${item.coD_RENDICION}">

                                </tbody>

                            </table>

                            </div>
                          </div>
                        </div>                

                        </td>

                          <td id="idActualizar${item.coD_RENDICION}"  style="font-size: 13px;" class="pt-3-half text-center">  <a href=""  data-toggle="modal" data-target="#modalM${item.coD_RENDICION}" style="text-decoration:none;" ><img height="16px" src="http://localhost:5001/img/actualizar.png"/></a>

                        <div class="modal fade bd-example-modal-lg" id="modalM${item.coD_RENDICION}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                        
                            <div class="modal-dialog modal-lg" role="document">

                                    <div class="modal-content container">

                                        <div class="modal-header pl-0 pr-0">
                                            <h5 class="modal-title" >Modificar encabezado para fondo numero  <h5 class="text-info ml-2 font-weight-bold modal-title"> ${item.coD_RENDICION}</h5> </h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>

                                        <div class=" pb-3 text-left">

                                            <form class="row" onsubmit="ActualizarRendicion(event,'${item.coD_RENDICION}')" >

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
                                                        <input  value="${item.fechA_REQUERIDA}" " placeholder="Sin Centro de costo" type="date" class=" form-control rounded-0 mt-2 form-control-sm" id="Is_FechaRequerida${item.coD_RENDICION}" >
                                                    </div>
                                                </div>

                                      
                                                <div class="col-12 col-lg-12 pt-3">
                                                    <div class="form-group">
                                                        <label for="" class="text-dark " style="font-weight: 500;">
                                                            Comentario<span class="text-danger">
                                                                *
                                                            </span>
                                                        </label>
                                                        <textarea class="form-control mt-2" id="Is_Comentario${item.coD_RENDICION}" rows="3"   maxlength="200" required>${item.comentario}</textarea>
                                                    </div>
                                                </div>

                                                <div class="float-right">
                                                    <div class="form-group">
                                                        <button type="submit" style="background-color:#0abbec; border-color:#5abeda ;"
                                                                class="btn rounded-0 btn-primary btn-sm shadow font-weight-bold mt-3 float-right">
                                                            Actualizar
                                                        </button>
                                                    </div>
                                                </div>

                                            </form>

                                        </div>

                                    </div>

                                </div>

                            </div>
                
                        </td>

                        <td id="idEliminar${item.coD_RENDICION}" style="font-size: 13px;" class="pt-3-half text-center"> <a href="" data-toggle="modal" onclick="EliminarRendicion('${item.coD_RENDICION}')" class="text-danger" style="text-decoration:none;" > <img height="11px" src="http://localhost:5001/img/cruzar.png"/>  </a>   </td>


                        <td style="font-size: 13px;" class="pt-3-half text-center">  <a href="" data-toggle="modal" data-target="#modal${item.coD_RENDICION}" onclick="ListarDetalle('${item.coD_RENDICION}')" style="text-decoration:none;" ><img height="16px" src="http://localhost:5001/img/ojo.png"/></a>
                
                            <div class="modal fade bd-example-modal-lg" id="modal${item.coD_RENDICION}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                        
                            <div class="modal-dialog modal-lg" role="document">

                                    <div class="modal-content container">

                                         <div class="modal-header pl-0 pr-0">
                                            <h5 class="modal-title" >Detalle del fondo numero  <h5 class="text-info ml-2 font-weight-bold modal-title"> ${item.coD_RENDICION}</h5> </h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>

                                        <div class="pb-3 row text-left">

                                                  <div class="col-12 col-lg-6 pt-2">
                                                    <div class="form-group">
                                                        <label for="" class="text-dark " style="font-weight: 500;">
                                                            Fecha solicitud actual  <span class="text-danger"> * </span>
                                                        </label>
                                                        <input  value="${item.fechA_CREACION}" placeholder="Ingrese usuario para la sociedad" type="date" class="form-control rounded-0 mt-2 form-control-sm" id="Is_FechaCreacion" required disabled> 
                                                    </div>
                                                </div>

                                                <div class="col-12 col-lg-6 pt-2">
                                                    <div class="form-group">
                                                        <label for="" class="text-dark " style="font-weight: 500;">
                                                            Fecha Requerida actual  <span class="text-danger">
                                                                *
                                                            </span>
                                                        </label>
                                                        <input  disabled  value="${item.fechA_REQUERIDA}" " placeholder="Ingrese" type="date" class=" form-control rounded-0 mt-2 form-control-sm" id="Is_FechaRequerida${item.cod_fondo_por_rendir}" required>
                                                    </div>
                                                </div>

                                                <div class="col-12 col-lg-6 pt-2">
                                                    <div class="form-group">
                                                        <label for="" class="text-dark " style="font-weight: 500;">
                                                            Proyecto  <span class="text-danger"> * </span>
                                                        </label>
                                                        <input  value="${item.proyecto}"  placeholder="Sin Proyecto" type="text" class="form-control rounded-0 mt-2 form-control-sm" id="Is_FechaCreacion" required disabled> 
                                                    </div>
                                                </div>

                                                <div class="col-12 col-lg-6 pt-2">
                                                    <div class="form-group">
                                                        <label for="" class="text-dark " style="font-weight: 500;">
                                                            Centro de costos  <span class="text-danger">
                                                                *
                                                            </span>
                                                        </label>
                                                        <input  disabled  value="${item.centrO_DE_COSTO}"  placeholder="Sin Centro de costo"  type="text" class=" form-control rounded-0 mt-2 form-control-sm" id="Is_FechaRequerida${item.cod_fondo_por_rendir}" required>
                                                    </div>
                                                </div>

                                                <div class="col-12 col-lg-12 pt-3">
                                                    <div class="form-group">
                                                        <label for="" class="text-dark " style="font-weight: 500;">
                                                            Comentario<span class="text-danger">
                                                                *
                                                            </span>
                                                        </label>
                                                        <textarea disabled class="form-control mt-2" id="Is_Comentario${item.coD_RENDICION}" rows="2"   maxlength="200" required>${item.comentario}</textarea>
                                                    </div>
                                                </div>


                                                <div class=" pt-3" >
                                                     <span id="ProcesoAprobacion${item.coD_RENDICION}">Autorizador o proceso actual: <span>
                                                </div>

                                            <div class="table-responsive mt-4 ">

                                                 <table class="table table-striped table-bordered table-hover w-100 " id="mtabla${item.coD_RENDICION}" >
                        
                                                    <thead class="thead-dark ">
                        
                                                        <tr>
                                                          <th scope="col"  class="text-center" style="font-size: 13px; font-weight: 500;"></th>
                                                            <th scope="col"  class="text-center" style="font-size: 13px; font-weight: 500;">Numero</th>
                                                            <th scope="col"  class="text-center" style="font-size: 13px; font-weight: 500;">Linea</th>
                                                            <th scope="col"  class="text-center" style="font-size: 13px; font-weight: 500;">Nombre</th>
                                                            <th scope="col"  class="text-center" style="font-size: 13px; font-weight: 500;">Comentario</th>
                                                            <th scope="col"  class="text-center" style="font-size: 13px; font-weight: 500;">Monto</th>
                                                            <th scope="col"   class="text-center" style="font-size: 13px; font-weight: 500;">Estado</th>
                                                            <th scope="col"  class="text-center" style="font-size: 13px; font-weight: 500;">Comentario jefe</th>
                                                            <th scope="col"  class="text-center" style="font-size: 13px; font-weight: 500;">Foto</th>
                                                  
                                                        </tr>
                        
                                                    </thead>
                        
                                                    <tbody id="tabla${item.coD_RENDICION}">

                                                    </tbody>
                        
                                                </table>

                                                   <div class="mt-3 mr-3 float-right">
                                                        <span  id="total${item.coD_RENDICION}">
                                                         TOTAL: 
                                                        </span>
                                                  </div>
                        
                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </td>
                </tr>`
                ;    
        }

          

    });

    $("#TablaRendiciones").append(FILAS);
}



const AbrirFilasAprobaciones = (COD) => {


    $("#T" + COD + " tr ").remove();

    const url = `http://192.168.0.22:81/api/logs_rendicion/${COD}`;

    $.ajax({
        url: url,
        type: "GET",
        dataType: 'json',
        success: function (response) {
            var HTML = '';

            $.each(response, function (i, x) {

                var estado = x.estado
                var url = "";

                if (estado == 0) {
                    url = "http://localhost:5001/img/state.png";
                } else {
                    url = "http://localhost:5001/img/poder.png";
                }

                var etapa = x.etapa

                if (etapa == 0) {
                    etapa = "Aprobacion jefe"
                } else {
                    etapa = "En etapa " + etapa
                }

                HTML +=

                    `<tr>
                    <td class="p-2 text-center"><img height="11px" src="${url}"/></td>
                    <td style="font-size: 13px;" class="pt-3-half text-center">${x.coD_DETALLE}</td> 
                    <td style="font-size: 13px;" class="pt-3-half text-center">${etapa}</td> 
                    <td style="font-size: 13px;" class="pt-3-half text-center">${x.jefe}</td> 
                    <td style="font-size: 13px;" class="pt-3-half text-center">${x.articulo}</td>
                    <td style="font-size: 13px;" class="pt-3-half text-center">${x.hora}</td> 
                    <td style="font-size: 13px;" class="pt-3-half text-center">${x.fecha}</td>
                    <td style="font-size: 13px;" class="pt-3-half text-center">${x.comentariO_JEFE}</td>
                    </tr>
                    `;


            });

            $(`#T${COD}`).append(HTML);

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

const EliminarRendicion = (COD_RENDICION) => {


    swalWithBootstrapButtons.fire({
        title: '¿Está seguro que desea eliminar?',
        text: "Eliminar el documento hará que no se pueda recuperar.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
  
    }).then((result) => {
       
        if (result.isConfirmed) {
            const URL = `http://192.168.0.22:81/api/rendicion/${COD_RENDICION}`;

            $.ajax({
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                url: URL,
                type: "DELETE",
                success: function () {
                    GuardarLogsEliminar(COD_RENDICION);
                    const URL = `http://192.168.0.22:81/api/rendicion/1058/B10/REND_APROBACION_JEFE/ASC`;
                    HTTP_GET_RENDICIONES(URL);
                },
                error: function (err) {
                    alert("Error al eliminar ");
                }
            });
        } 
    })

  
}

const getHora = () => {
    var hora = new Date().getHours()
    var minutos = new Date().getMinutes()
    var segundos = new Date().getSeconds()

    return hora + ":" + minutos + ":" + segundos;
}


const GuardarLogsActualizar = (codigo) => {

    //var today = new Date();
    //var dd = String(today.getDate()).padStart(2, '0');
    //var mm = String(today.getMonth() + 1).padStart(2, '0');
    //var yyyy = today.getFullYear();

    //today = yyyy + '-' + mm + '-' + dd;

    //const cod_usuario = localStorage['cod_usuario'];
    //var hora = getHora() + '.5255784'

    //var data = [{

    //    FECHA_OPERACION: today,
    //    HORA_OPERACION: hora,
    //    OPERACION: 'Modificado',
    //    COD_RENDICÍON: codigo,
    //    COD_USUARIO: cod_usuario

    //}]

    //const json = JSON.stringify(data);
   
    //const url = 'http://192.168.0.22:81/api/logs_rendicion/LG/'
    //$.ajax({

    //    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    //    url: url,
    //    type: "POST",
    //    data: json,
    //    error: function (err) {
    //        alert("Error al guardar");
    //        console.log(err);

    //    }

    //});
    //Swal.fire({
    //    icon: 'success',
    //    title: 'Solicitud rendición actualizada.',
    //    timer: 1500
    //})
    setTimeout(function () { location.reload() }, 1500);
}

const GuardarLogsEliminar = (codigo) => {

    //var today = new Date();
    //var dd = String(today.getDate()).padStart(2, '0');
    //var mm = String(today.getMonth() + 1).padStart(2, '0');
    //var yyyy = today.getFullYear();

    //today = yyyy + '-' + mm + '-' + dd;

    //const cod_usuario = localStorage['cod_usuario'];
    //var hora = getHora() + '.5255784'

    //var data = [{

    //    FECHA_OPERACION: today,
    //    HORA_OPERACION: hora,
    //    OPERACION: 'Eliminado',
    //    COD_RENDICÍON: codigo,
    //    COD_USUARIO: cod_usuario

    //}]

    //const json = JSON.stringify(data);
   
    //const url = 'http://192.168.0.22:81/api/logs_rendicion/LG/'
    //$.ajax({

    //    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    //    url: url,
    //    type: "POST",
    //    data: json,
    //    error: function (err) {
    //        alert("Error al guardar");
    //        console.log(err);

    //    }

    //});

}

const ActualizarRendicion = (event, COD) => {
    event.preventDefault();
    const comentario = $('#Is_Comentario' + COD + '').val();
    const fecha_requerida = $('#Is_FechaRequerida' + COD + '').val();

    const url = `http://192.168.0.22:81/api/rendicion/actualizar/${fecha_requerida}/${comentario}/${COD}`;

    $.ajax({
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        url: url,
        type: "PUT",
        dataType: 'json',
        success: function () {
           
            GuardarLogsActualizar(COD);
        },

        error: function (response) {
            alert("Error al actualizar");
        }

    });
}


const ListarDetalle = (COD_FONDO) => {

    cod_sociedad = localStorage['cod_sociedad'];
    $(`#ProcesoAprobacion${COD_FONDO}`).text('');
    $.ajax({
        url:`http://192.168.0.22:81/api/procesoaprobacion/JefesActualUsuario/${cod_sociedad}/${COD_FONDO}`,
        type: "GET",
        dataType: 'json',
        success: function (rs) {
            var proceso = rs[0].coD_FONDO_POR_RENDIR;
            $(`#ProcesoAprobacion${COD_FONDO}`).text('Proceso en: ' + proceso);
        }
    });


    $("#tabla"+COD_FONDO+" tr").remove();
    const url = `http://192.168.0.22:81/api/rendiciondetalle/${COD_FONDO}`;
    $.ajax({
        url:url,
        type: "GET",
        dataType: 'json',
        success: function (response) {
            var HTML = '';

            $.each(response, function (i, item) {

                var lin = i + 1;

                var estado = item.rd_estado.toString();

                if (estado == "101"){
                    estado = "Aceptado";
                    var img = "http://localhost:5001/img/potencia.png";
                }else{
                   if(estado == "99"){
                       estado = "Espera";
                       var img = "http://localhost:5001/img/poder.png";
                   } else{
                       estado = 'En proceso';
                       var img = "http://localhost:5001/img/state.png";
                     
                   }
                }

                var montoFinal = addCommas(item.rd_monto);

                HTML += 

                `<tr>
                <td class="p-2 text-center"><img height="11px" src="${img}"/> </td>
                <td style="font-size: 13px;" class="pt-3-half text-center">${item.cod_rendicion_detalle}</td> 
                <td style="font-size: 13px;" class="pt-3-half text-center">${lin}</td> 
                <td style="font-size: 13px;" class="pt-3-half text-center">${item.art_nombre}</td> 
                <td style="font-size: 13px;" class="pt-3-half text-center">${item.rd_comentario}</td>
                <td style="font-size: 13px;" class="pt-3-half text-center">${montoFinal}</td> 
                <td style="font-size: 13px;" class="pt-3-half text-center">${estado}</td>
                <td style="font-size: 13px;" class="pt-3-half text-center">${item.rd_comentario_jefe}</td>
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
                                 
                                <img class="w-100 " id="DocumentoImagen${item.cod_rendicion_detalle}" src="first.jpg"/>
                                <a class="mt-3 w-100 btn btn-primary btn-sm shadow border "  id="DocumentoImagen2${item.cod_rendicion_detalle}" download>descargar</a>

                          </div>
                          
                        </div>
                      </div>
                    </div>

                </td>
                </tr>
                `;

                 
         
            });
           
            $("#tabla" + COD_FONDO + "").append(HTML);
            Total(COD_FONDO);
       
        }
    });
 
}


const CerrarModal = (event,COD) => {
    event.preventDefault();

    $(`#modalFoto${COD}`).modal('hide') 

}






const ListarImagen = (COD,COD_ADJ) => {

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
            $("#DocumentoImagen2" + COD + "").attr("href", imgdoc);
        },

        error: function (response) {
           
        }

    });
}

const Total = (CODIGO) => {
    var init = 0;

    $("#mtabla" + CODIGO + " tbody tr").each(function (i) {

        var customerId = $(this).find("td").eq(5).html();
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
