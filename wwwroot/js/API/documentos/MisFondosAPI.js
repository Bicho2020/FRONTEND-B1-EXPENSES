$(document).ready(function () {


    const cod_sociedad = localStorage['cod_sociedad'];
    const cod_usuario = localStorage['cod_usuario'];

    $("#FiltroMisFondos").keyup(function () {
        _this = this;

        $.each($("#TablaListarUsuariosAdministradores tbody tr"), function () {
            if ($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) === -1)
                $(this).hide();
            else
                $(this).show();
        });
    });

    $("#order").change(function () {
        const cod_usuario = localStorage['cod_usuario'];
        var value = $("#order").val();

        if (value == "Aprobado") {

            const url = `http://192.168.0.22:81/api/fondorendir/filtro/${cod_usuario}/${cod_sociedad}/101`;
            ListarUsuariosAdministradores(url);
           
        } else {

            if (value == "Sap") {
                const url = `http://192.168.0.22:81/api/fondorendir/filtro/${cod_usuario}/${cod_sociedad}/100`;
                ListarUsuariosAdministradores(url);


            } else {

                if (value == "Rechazada") {
                    const url = `http://192.168.0.22:81/api/fondorendir/filtro/${cod_usuario}/${cod_sociedad}/99`;
                    ListarUsuariosAdministradores(url);
                } else {
                
                    if (value == "Proceso") {
                        const url = `http://192.168.0.22:81/api/fondorendir/filtro/${cod_usuario}/${cod_sociedad}/x`;
                        ListarUsuariosAdministradores(url);
                    } else {
                       
                        if (value.toString() == "value") {

                        } else {
                            if (value.toString() == "APROBACION_JEFE") {
                                var value = "ASC";
                                var data = "FXR_APROBACION_JEFE";
                                const url = `http://192.168.0.22:81/api/fondorendir/${cod_usuario}/${cod_sociedad}/${data}/${value}`;
                                ListarUsuariosAdministradores(url);
                            } else {
                                if (value == "ASC") {
                                    var value = "ASC";
                                    var data = "COD_FONDO_POR_RENDIR";
                                    const url = `http://192.168.0.22:81/api/fondorendir/${cod_usuario}/${cod_sociedad}/${data}/${value}`;
                                    ListarUsuariosAdministradores(url);
                                } else {
                                    if (value = "DESC") {
                                        var value = "DESC";
                                        var data = "COD_FONDO_POR_RENDIR";
                                        const url = `http://192.168.0.22:81/api/fondorendir/${cod_usuario}/${cod_sociedad}/${data}/${value}`;
                                        ListarUsuariosAdministradores(url);
                                    }
                                   
                                }
                            }

                        }
                    }
                }
            }


        }

      
    });


    SegunTipoAprobacion(cod_sociedad);

});


const getHora = () => {
    var hora = new Date().getHours()
    var minutos = new Date().getMinutes()
    var segundos = new Date().getSeconds()

    return hora + ":" + minutos + ":" + segundos;
}


const SegunTipoAprobacion = (cod_sociedad) => {
    const cod_usuario = localStorage['cod_usuario'];
    const url = `http://192.168.0.22:81/api/tipoaprobacion/${cod_sociedad}/1`;
    $.ajax({
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        type: "GET",
        url: url,
        success: function (res) {
            if (res.length == 0) {

            } else {

                localStorage['tipo_proceso'] = res[0]['ta_opcion']

                if (localStorage['tipo_proceso'] = 2) {

                    var data = "COD_FONDO_POR_RENDIR";
                    var value = "DESC";
                    const url = `http://192.168.0.22:81/api/fondorendir/${cod_usuario}/${cod_sociedad}/${data}/${value}`;
                    ListarUsuariosAdministradores(url);

                } else {
                    alert("Opcion 1 no dispoble");
                }
            }
        }
    });
}


const ListarUsuariosAdministradores = (url) => {

    $("#TablaListarUsuariosAdministradores td").remove();

   const cod_sociedad = localStorage['cod_sociedad'];



    $.ajax({
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        type: "GET",
        url: url,
        success: function (res) {
        var FILAS = '';
        $.each(res, function (i, item) {

           

            var estado = item.fxr_aprobacion_jefe.toString();
            var estadoA = item.fxr_aprobacion_jefe.toString();

            if (estado == "1"){
                estado = "En proceso de aprobacion";
            }else{
               if(estado == "0"){
                estado = "En proceso de aprobacion JEFE";
               } else{
                if(estado == "100"){
                    estado = "Solicitud  enviada a Sap";
                }else{
                    if (estado == "99") {
                        estado = "Solicitud Rechazada";
                    } else {
                        if (estado == "101") {
                            estado = "Solicitud aceptada";
                        } else {
                            estado = "En proceso de aprobacion";
                        }
                    }
                      
                }
                  
               }
            }

            var fecha_creacion = item.fxr_fecha_creacion.toString();
            var fecha_requerida = item.fxR_FECHA_NECESARIO.toString();

  
            if(estadoA == "0") {
                FILAS +=
                    `<tr>
                <td  class="p-1 text-center"> <img height="13px" src="http://localhost:5001/img/state.png"/> </td>
                <td style="font-size: 13px;" class="pt-3-half text-center">${item.cod_fondo_por_rendir}</td>
                <td style="font-size: 13px;" class="pt-3-half text-center">${fecha_creacion}</td>
                <td style="font-size: 13px;" class="pt-3-half text-center ">${fecha_requerida}</td>
                <td style="font-size: 13px;" class="pt-3-half text-center">${item.fxr_comentarios}</td>
             
 
              
                <td style="font-size: 13px;" class="pt-3-half text-center "> <a type="button" onclick="AbrirFilasAprobaciones('${item.cod_fondo_por_rendir}')"  data-toggle="modal" data-target="#proceso${item.cod_fondo_por_rendir}" ><img height="15px" src="http://localhost:5001/img/verProceso.png" alt="Alternate Text" /></a>

                <div class="modal fade bd-example-modal-lg" id="proceso${item.cod_fondo_por_rendir}" aria-hidden="true">
                  <div class="modal-dialog modal-lg">
                    <div class="modal-content container">

                         <div class="modal-header pl-0 pr-0">
                                    <h5 class="modal-title" >Etapas de aprobacion para el documento numero <h5 class="text-info ml-2 font-weight-bold modal-title"> ${item.cod_fondo_por_rendir}</h5> </h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                         </div>

                        <div id="ID_PROGRESO${item.cod_fondo_por_rendir}">
                       <ol class="progress-meter">
                           
                          </ol>
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

                        <tbody id="T${item.cod_fondo_por_rendir}">

                        </tbody>

                    </table>

                    </div>
                  </div>
                </div>                

                </td>

                  <td style="font-size: 13px;" class="pt-3-half text-center">   <a href=""  data-toggle="modal" data-target="#modalM${item.cod_fondo_por_rendir}" style="text-decoration:none;" ><img height="16px" src="http://localhost:5001/img/actualizar.png"/></a>


                <div class="modal fade bd-example-modal-lg" id="modalM${item.cod_fondo_por_rendir}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                        
                    <div class="modal-dialog modal-lg" role="document">

                            <div class="modal-content container">

                                <div class="modal-header pl-0 pr-0">
                                    <h5 class="modal-title" >Modificar encabezado para fondo numero  <h5 class="text-info ml-2 font-weight-bold modal-title"> ${item.cod_fondo_por_rendir}</h5> </h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>

                                <div class=" pb-3 text-left">

                                    <form class="row" onsubmit="Actualizar(event,'${item.cod_fondo_por_rendir}')" >

                                        <div class="col-12 col-lg-6 pt-2">
                                            <div class="form-group">
                                                <label for="" class="text-dark " style="font-weight: 500;">
                                                    Fecha solicitud actual  <span class="text-danger"> * </span>
                                                </label>
                                                <input  value="${fecha_creacion}" placeholder="Sin Proyecto" type="date" class="form-control rounded-0 mt-2 form-control-sm" id="Is_FechaCreacion"  disabled> 
                                            </div>
                                        </div>

                                        <div class="col-12 col-lg-6 pt-2">
                                            <div class="form-group">
                                                <label for="" class="text-dark " style="font-weight: 500;">
                                                    Fecha Requerida actual  <span class="text-danger">
                                                        *
                                                    </span>
                                                </label>
                                                <input  value="${fecha_requerida}" " placeholder="Sin Centro de costo" type="date" class=" form-control rounded-0 mt-2 form-control-sm" id="Is_FechaRequerida${item.cod_fondo_por_rendir}" >
                                            </div>
                                        </div>

                                      
                                        <div class="col-12 col-lg-12 pt-3">
                                            <div class="form-group">
                                                <label for="" class="text-dark " style="font-weight: 500;">
                                                    Comentario<span class="text-danger">
                                                        *
                                                    </span>
                                                </label>
                                                <textarea class="form-control mt-2" id="Is_Comentario${item.cod_fondo_por_rendir}" rows="3"   maxlength="200" required>${item.fxr_comentarios}</textarea>
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

                <td style="font-size: 13px;" class="pt-3-half text-center"> <a href="" data-toggle="modal" onclick="Eliminar('${item.cod_fondo_por_rendir }')" class="text-danger" style="text-decoration:none;" > <img height="11px" src="http://localhost:5001/img/cruzar.png"/>  </a>  </td>


                <td style="font-size: 13px;" class="pt-3-half text-center">  <a href="" data-toggle="modal" data-target="#modal${item.cod_fondo_por_rendir}" onclick="ListarDetalle('${item.cod_fondo_por_rendir}')" style="text-decoration:none;" ><img height="16px" src="http://localhost:5001/img/ojo.png"/></a>
                
                    <div class="modal fade bd-example-modal-lg" id="modal${item.cod_fondo_por_rendir}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                        
                    <div class="modal-dialog modal-lg" role="document">

                            <div class="modal-content container">

                                 <div class="modal-header pl-0 pr-0">
                                    <h5 class="modal-title" >Detalle del fondo numero  <h5 class="text-info ml-2 font-weight-bold modal-title"> ${item.cod_fondo_por_rendir}</h5> </h5>
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
                                                <input  value="${fecha_creacion}" placeholder="Ingrese usuario para la sociedad" type="date" class="form-control rounded-0 mt-2 form-control-sm" id="Is_FechaCreacion" required disabled> 
                                            </div>
                                        </div>

                                        <div class="col-12 col-lg-6 pt-2">
                                            <div class="form-group">
                                                <label for="" class="text-dark " style="font-weight: 500;">
                                                    Fecha Requerida actual  <span class="text-danger">
                                                        *
                                                    </span>
                                                </label>
                                                <input  disabled  value="${fecha_requerida}" " placeholder="Ingrese" type="date" class=" form-control rounded-0 mt-2 form-control-sm" id="Is_FechaRequerida${item.cod_fondo_por_rendir}" required>
                                            </div>
                                        </div>

                                        <div class="col-12 col-lg-6 pt-2">
                                            <div class="form-group">
                                                <label for="" class="text-dark " style="font-weight: 500;">
                                                    Proyecto  <span class="text-danger"> * </span>
                                                </label>
                                                <input  value="${item.pro_nombre}"  placeholder="Sin Proyecto" type="text" class="form-control rounded-0 mt-2 form-control-sm" id="Is_FechaCreacion" required disabled> 
                                            </div>
                                        </div>

                                        <div class="col-12 col-lg-6 pt-2">
                                            <div class="form-group">
                                                <label for="" class="text-dark " style="font-weight: 500;">
                                                    Centro de costos  <span class="text-danger">
                                                        *
                                                    </span>
                                                </label>
                                                <input  disabled  value="${item.cc}"  placeholder="Sin Centro de costo"  type="text" class=" form-control rounded-0 mt-2 form-control-sm" id="Is_FechaRequerida${item.cod_fondo_por_rendir}" required>
                                            </div>
                                        </div>

                                        <div class="col-12 col-lg-12 pt-3">
                                            <div class="form-group">
                                                <label for="" class="text-dark " style="font-weight: 500;">
                                                    Comentario<span class="text-danger">
                                                        *
                                                    </span>
                                                </label>
                                                <textarea disabled class="form-control mt-2" id="Is_Comentario${item.cod_fondo_por_rendir}" rows="2"   maxlength="200" required>${item.fxr_comentarios}</textarea>
                                            </div>
                                        </div>


                                        <div class=" pt-3" >
                                           <span id="ProcesoAprobacion${item.cod_fondo_por_rendir}">Autorizador o proceso actual: <span>
                                        </div>


                                    <div class="table-responsive mt-4 ">

                                         <table class="table table-striped table-bordered table-hover w-100 " id="mtabla${item.cod_fondo_por_rendir}" >
                        
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
                        
                                            <tbody id="tabla${item.cod_fondo_por_rendir}">

                                            </tbody>
                        
                                        </table>

                                           <div class="mt-3 mr-3 float-right">
                                                <span  id="total${item.cod_fondo_por_rendir}">
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

            } else {

                if (estadoA == "99") {

                    FILAS +=
                        `<tr>
 <th scope="col" class="text-center" style="font-size: 13px; font-weight: 500;" hidden>Rechazado</th>
                       <td class="p-1 text-center"> <img height="13px" src="http://localhost:5001/img/poder.png"/> </td>
                        <td style="font-size: 13px;" class="pt-3-half text-center" >${item.cod_fondo_por_rendir}</td>
                        <td style="font-size: 13px;" class="pt-3-half text-center">${fecha_creacion.slice(0, 10)}</td>
                        <td style="font-size: 13px;" class="pt-3-half text-center">${fecha_requerida.slice(0, 10)}</td>
                       
                        <td style="font-size: 13px;" class="pt-3-half text-center">${item.fxr_comentarios}</td>
           
                    

                        <td style="font-size: 13px;" class="pt-3-half text-center "> <a type="button" onclick="AbrirFilasAprobaciones('${item.cod_fondo_por_rendir}')"  data-toggle="modal" data-target="#proceso${item.cod_fondo_por_rendir}" ><img height="15px" src="http://localhost:5001/img/verProceso.png" alt="Alternate Text" /></a>

                <div class="modal fade bd-example-modal-lg" id="proceso${item.cod_fondo_por_rendir}" aria-hidden="true">
                  <div class="modal-dialog modal-lg">
                    <div class="modal-content container">

                         <div class="modal-header pl-0 pr-0">
                                    <h5 class="modal-title" >Etapas de aprobacion para el documento numero <h5 class="text-info ml-2 font-weight-bold modal-title"> ${item.cod_fondo_por_rendir}</h5> </h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                         </div>


                        <div id="ID_PROGRESO${item.cod_fondo_por_rendir}">
                       <ol class="progress-meter">
                           
                          </ol>
                         </div>

                         <table class="table table-striped table-bordered table-hover w-100 "

                        <thead class="thead-dark w-100 ">

                            <tr>
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

                        <tbody id="T${item.cod_fondo_por_rendir}" >
  <ol class="progress-meter">
                           
                          </ol>
                        </tbody>

                    </table>

                    </div>
                  </div>
                </div>                

                </td>

                        <td style="font-size: 13px;" class="pt-3-half text-secondary text-center">  No disponible </td>
 
                        <td style="font-size: 13px;" class="pt-3-half text-secondary text-center">  No disponible </td>

                    <td style="font-size: 13px;" class="pt-3-half text-center">  <a href="" data-toggle="modal" data-target="#modal${item.cod_fondo_por_rendir}" onclick="ListarDetalle('${item.cod_fondo_por_rendir}')" style="text-decoration:none;" ><img height="16px" src="http://localhost:5001/img/ojo.png"/></a>
                
                    <div class="modal fade bd-example-modal-lg" id="modal${item.cod_fondo_por_rendir}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                        
                    <div class="modal-dialog modal-lg" role="document">

                            <div class="modal-content container">

                               <div class="modal-header pl-0 pr-0">
                                  <h5 class="modal-title" >Detalle del fondo numero  <h5 class="text-info ml-2 font-weight-bold modal-title"> ${item.cod_fondo_por_rendir}</h5> </h5>
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
                                                <input  value="${fecha_creacion}" placeholder="Ingrese usuario para la sociedad" type="date" class="form-control rounded-0 mt-2 form-control-sm" id="Is_FechaCreacion" required disabled> 
                                            </div>
                                        </div>

                                        <div class="col-12 col-lg-6 pt-2">
                                            <div class="form-group">
                                                <label for="" class="text-dark " style="font-weight: 500;">
                                                    Fecha Requerida actual  <span class="text-danger">
                                                        *
                                                    </span>
                                                </label>
                                                <input  disabled  value="${fecha_requerida}" " placeholder="Ingrese" type="date" class=" form-control rounded-0 mt-2 form-control-sm" id="Is_FechaRequerida${item.cod_fondo_por_rendir}" required>
                                            </div>
                                        </div>

                                                <div class="col-12 col-lg-6 pt-2">
                                            <div class="form-group">
                                                <label for="" class="text-dark " style="font-weight: 500;">
                                                    Proyecto  <span class="text-danger"> * </span>
                                                </label>
                                                <input  value="${item.pro_nombre}"  placeholder="Sin Proyecto" type="text" class="form-control rounded-0 mt-2 form-control-sm" id="Is_FechaCreacion" required disabled> 
                                            </div>
                                        </div>

                                        <div class="col-12 col-lg-6 pt-2">
                                            <div class="form-group">
                                                <label for="" class="text-dark " style="font-weight: 500;">
                                                    Centro de costos  <span class="text-danger">
                                                        *
                                                    </span>
                                                </label>
                                                <input  disabled  value="${item.cc}"  placeholder="Sin Centro de costo"  type="text" class=" form-control rounded-0 mt-2 form-control-sm" id="Is_FechaRequerida${item.cod_fondo_por_rendir}" required>
                                            </div>
                                        </div>

                                        <div class="col-12 col-lg-12 pt-3">
                                            <div class="form-group">
                                                <label for="" class="text-dark " style="font-weight: 500;">
                                                    Comentario<span class="text-danger">
                                                        *
                                                    </span>
                                                </label>
                                                <textarea disabled class="form-control mt-2" id="Is_Comentario${item.cod_fondo_por_rendir}" rows="2"   maxlength="200" required>${item.fxr_comentarios}</textarea>
                                            </div>
                                        </div>

                                        <div class=" pt-3" >
                                        <span id="ProcesoAprobacion${item.cod_fondo_por_rendir}">Autorizador o proceso actual: <span>
                                     </div>


                                          <div class="table-responsive mt-4 ">

                                         <table class="table table-striped table-bordered table-hover w-100 " id="mtabla${item.cod_fondo_por_rendir}" >
                        
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
                        
                                            <tbody id="tabla${item.cod_fondo_por_rendir}">

                                            </tbody>
                        
                                        </table>

                                           <div class="mt-3 mr-3 float-right">
                                                <span  id="total${item.cod_fondo_por_rendir}">
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

                } else {

                    if (estadoA == "101") {

                        FILAS +=
                            `<tr>
 <th scope="col" class="text-center" style="font-size: 13px; font-weight: 500;" hidden>Aprobado</th>
                       <td class="p-1 text-center"> <img height="13px" src="http://localhost:5001/img/potencia.png"/> </td>
                        <td style="font-size: 13px;" class="pt-3-half text-center">${item.cod_fondo_por_rendir}</td>
                        <td style="font-size: 13px;" class="pt-3-half text-center">${fecha_creacion.slice(0, 10)}</td>
                        <td style="font-size: 13px;" class="pt-3-half text-center">${fecha_requerida.slice(0, 10)}</td>
             
                        <td style="font-size: 13px;" class="pt-3-half text-center">${item.fxr_comentarios}</td>


                       <td style="font-size: 13px;" class="pt-3-half text-center "> <a type="button" onclick="AbrirFilasAprobaciones('${item.cod_fondo_por_rendir}')"  data-toggle="modal" data-target="#proceso${item.cod_fondo_por_rendir}" ><img height="15px" src="http://localhost:5001/img/verProceso.png" alt="Alternate Text" /></a>

                <div class="modal fade bd-example-modal-lg" id="proceso${item.cod_fondo_por_rendir}" aria-hidden="true">
                  <div class="modal-dialog modal-lg">
                    <div class="modal-content container">

                         <div class="modal-header pl-0 pr-0">
                                    <h5 class="modal-title" >Etapas de aprobacion para el documento numero <h5 class="text-info ml-2 font-weight-bold modal-title"> ${item.cod_fondo_por_rendir}</h5> </h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                         </div>

                       <div id="ID_PROGRESO${item.cod_fondo_por_rendir}">
                       <ol class="progress-meter">
                           
                          </ol>
                         </div>

                         <table class="table table-striped table-bordered table-hover w-100 "

                        <thead class="thead-dark w-100 ">

                            <tr>
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

                        <tbody id="T${item.cod_fondo_por_rendir}" >

                        </tbody>

                    </table>

                    </div>
                  </div>
                </div>                

                </td>
             
                        <td style="font-size: 13px;" class="pt-3-half text-dark text-center">  No disponible </td>
 
                        <td style="font-size: 13px;" class="pt-3-half text-dark text-center">  No disponible </td>

                       <td style="font-size: 13px;" class="pt-3-half text-center">  <a href="" data-toggle="modal" data-target="#modal${item.cod_fondo_por_rendir}" onclick="ListarDetalle('${item.cod_fondo_por_rendir}')" style="text-decoration:none;" ><img height="16px" src="http://localhost:5001/img/ojo.png"/></a>
                
                    <div class="modal fade bd-example-modal-lg" id="modal${item.cod_fondo_por_rendir}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                        
                    <div class="modal-dialog modal-lg" role="document">

                            <div class="modal-content container">

                                  <div class="modal-header pl-0 pr-0">
                                  <h5 class="modal-title" >Detalle del fondo numero  <h5 class="text-info ml-2 font-weight-bold modal-title"> ${item.cod_fondo_por_rendir}</h5> </h5>
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
                                                <input  value="${fecha_creacion}" placeholder="Ingrese usuario para la sociedad" type="date" class="form-control rounded-0 mt-2 form-control-sm" id="Is_FechaCreacion" required disabled> 
                                            </div>
                                        </div>

                                        <div class="col-12 col-lg-6 pt-2">
                                            <div class="form-group">
                                                <label for="" class="text-dark " style="font-weight: 500;">
                                                    Fecha Requerida actual  <span class="text-danger">
                                                        *
                                                    </span>
                                                </label>
                                                <input  disabled  value="${fecha_requerida}" " placeholder="Ingrese" type="date" class=" form-control rounded-0 mt-2 form-control-sm" id="Is_FechaRequerida${item.cod_fondo_por_rendir}" required>
                                            </div>
                                        </div>

                                               <div class="col-12 col-lg-6 pt-2">
                                            <div class="form-group">
                                                <label for="" class="text-dark " style="font-weight: 500;">
                                                    Proyecto  <span class="text-danger"> * </span>
                                                </label>
                                                <input  value="${item.pro_nombre}"  placeholder="Sin Proyecto" type="text" class="form-control rounded-0 mt-2 form-control-sm" id="Is_FechaCreacion" required disabled> 
                                            </div>
                                        </div>

                                        <div class="col-12 col-lg-6 pt-2">
                                            <div class="form-group">
                                                <label for="" class="text-dark " style="font-weight: 500;">
                                                    Centro de costos  <span class="text-danger">
                                                        *
                                                    </span>
                                                </label>
                                                <input  disabled  value="${item.cc}"  placeholder="Sin Centro de costo"  type="text" class=" form-control rounded-0 mt-2 form-control-sm" id="Is_FechaRequerida${item.cod_fondo_por_rendir}" required>
                                            </div>
                                        </div>

                                        <div class="col-12 col-lg-12 pt-3">
                                            <div class="form-group">
                                                <label for="" class="text-dark " style="font-weight: 500;">
                                                    Comentario<span class="text-danger">
                                                        *
                                                    </span>
                                                </label>
                                                <textarea disabled class="form-control mt-2" id="Is_Comentario${item.cod_fondo_por_rendir}" rows="2"   maxlength="200" required>${item.fxr_comentarios}</textarea>
                                            </div>
                                        </div>

                                        <div class=" pt-3" >
                                        <span id="ProcesoAprobacion${item.cod_fondo_por_rendir}">Autorizador o proceso actual: <span>
                                     </div>


                                          <div class="table-responsive mt-4 ">

                                         <table class="table table-striped table-bordered table-hover w-100 " id="mtabla${item.cod_fondo_por_rendir}" >
                        
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
                        
                                            <tbody id="tabla${item.cod_fondo_por_rendir}">

                                            </tbody>
                        
                                        </table>

                                           <div class="mt-3 mr-3 float-right">
                                                <span  id="total${item.cod_fondo_por_rendir}">
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
                    } else {
                        if (estadoA == "100") {

                            FILAS +=
                                `<tr>
<td class="p-1 text-center" hidden>>Sap</td>
                       <td class="p-1 text-center"> <img height="13px" src="http://localhost:5001/img/Ssap.png"/> </td>
                        <td style="font-size: 13px;" class="pt-3-half text-center">${item.cod_fondo_por_rendir}</td>
                        <td style="font-size: 13px;" class="pt-3-half text-center">${fecha_creacion.slice(0, 10)}</td>
                        <td style="font-size: 13px;" class="pt-3-half text-center">${fecha_requerida.slice(0, 10)}</td>
             
                        <td style="font-size: 13px;" class="pt-3-half text-center">${item.fxr_comentarios}</td>


                       <td style="font-size: 13px;" class="pt-3-half text-center "> <a type="button" onclick="AbrirFilasAprobaciones('${item.cod_fondo_por_rendir}')"  data-toggle="modal" data-target="#proceso${item.cod_fondo_por_rendir}" ><img height="15px" src="http://localhost:5001/img/verProceso.png" alt="Alternate Text" /></a>

                <div class="modal fade bd-example-modal-lg" id="proceso${item.cod_fondo_por_rendir}" aria-hidden="true">
                  <div class="modal-dialog modal-lg">
                    <div class="modal-content container">

                         <div class="modal-header pl-0 pr-0">
                                    <h5 class="modal-title" >Etapas de aprobacion para el documento numero <h5 class="text-info ml-2 font-weight-bold modal-title"> ${item.cod_fondo_por_rendir}</h5> </h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                         </div>


                       <div id="ID_PROGRESO${item.cod_fondo_por_rendir}">
                       <ol class="progress-meter">
                           
                          </ol>
                         </div>

                         <table class="table table-striped table-bordered table-hover w-100 "

                        <thead class="thead-dark w-100 ">

                            <tr>
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

                        <tbody id="T${item.cod_fondo_por_rendir}" >

                        </tbody>

                    </table>

                    </div>
                  </div>
                </div>                

                </td>
             
                        <td style="font-size: 13px;" class="pt-3-half text-dark text-center">  No disponible </td>
 
                        <td style="font-size: 13px;" class="pt-3-half text-dark text-center">  No disponible </td>

                       <td style="font-size: 13px;" class="pt-3-half text-center">  <a href="" data-toggle="modal" data-target="#modal${item.cod_fondo_por_rendir}" onclick="ListarDetalle('${item.cod_fondo_por_rendir}')" style="text-decoration:none;" ><img height="16px" src="http://localhost:5001/img/ojo.png"/></a>
                
                    <div class="modal fade bd-example-modal-lg" id="modal${item.cod_fondo_por_rendir}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                        
                    <div class="modal-dialog modal-lg" role="document">

                            <div class="modal-content container">

                                <div class="modal-header pl-0 pr-0">
                                  <h5 class="modal-title" >Detalle del fondo numero  <h5 class="text-info ml-2 font-weight-bold modal-title"> ${item.cod_fondo_por_rendir}</h5> </h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>

                                 <div id="ID_PROGRESO${item.cod_fondo_por_rendir}">
                                      <ol class="progress-meter">
                           
                                      </ol>
                                 </div>


                              <div class="pb-3 row text-left">

                                          <div class="col-12 col-lg-6 pt-2">
                                            <div class="form-group">
                                                <label for="" class="text-dark " style="font-weight: 500;">
                                                    Fecha solicitud actual  <span class="text-danger"> * </span>
                                                </label>
                                                <input  value="${fecha_creacion}" placeholder="Ingrese usuario para la sociedad" type="date" class="form-control rounded-0 mt-2 form-control-sm" id="Is_FechaCreacion" required disabled> 
                                            </div>
                                        </div>

                                        <div class="col-12 col-lg-6 pt-2">
                                            <div class="form-group">
                                                <label for="" class="text-dark " style="font-weight: 500;">
                                                    Fecha Requerida actual  <span class="text-danger">
                                                        *
                                                    </span>
                                                </label>
                                                <input  disabled  value="${fecha_requerida}" " placeholder="Ingrese" type="date" class=" form-control rounded-0 mt-2 form-control-sm" id="Is_FechaRequerida${item.cod_fondo_por_rendir}" required>
                                            </div>
                                        </div>

                                               <div class="col-12 col-lg-6 pt-2">
                                            <div class="form-group">
                                                <label for="" class="text-dark " style="font-weight: 500;">
                                                    Proyecto  <span class="text-danger"> * </span>
                                                </label>
                                                <input  value="${item.pro_nombre}"  placeholder="Sin Proyecto" type="text" class="form-control rounded-0 mt-2 form-control-sm" id="Is_FechaCreacion" required disabled> 
                                            </div>
                                        </div>

                                        <div class="col-12 col-lg-6 pt-2">
                                            <div class="form-group">
                                                <label for="" class="text-dark " style="font-weight: 500;">
                                                    Centro de costos  <span class="text-danger">
                                                        *
                                                    </span>
                                                </label>
                                                <input  disabled  value="${item.cc}"  placeholder="Sin Centro de costo"  type="text" class=" form-control rounded-0 mt-2 form-control-sm" id="Is_FechaRequerida${item.cod_fondo_por_rendir}" required>
                                            </div>
                                        </div>

                                        <div class="col-12 col-lg-12 pt-3">
                                            <div class="form-group">
                                                <label for="" class="text-dark " style="font-weight: 500;">
                                                    Comentario<span class="text-danger">
                                                        *
                                                    </span>
                                                </label>
                                                <textarea disabled class="form-control mt-2" id="Is_Comentario${item.cod_fondo_por_rendir}" rows="2"   maxlength="200" required>${item.fxr_comentarios}</textarea>
                                            </div>
                                        </div>


                                        <div class=" pt-3" >
                                        <span id="ProcesoAprobacion${item.cod_fondo_por_rendir}">Autorizador o proceso actual: <span>
                                     </div>


                                  <div class="table-responsive mt-4 ">

                                         <table class="table table-striped table-bordered table-hover w-100 " id="mtabla${item.cod_fondo_por_rendir}" >
                        
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
                        
                                            <tbody id="tabla${item.cod_fondo_por_rendir}">

                                            </tbody>
                        
                                        </table>

                                           <div class="mt-3 mr-3 float-right">
                                                <span  id="total${item.cod_fondo_por_rendir}">
                                                 TOTAL: 
                                                </span>
                                          </div>
                        
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </td>`

                        } else {
                            FILAS +=
                                `<tr>
                       <td class="p-1 text-center"> <img height="13px" src="http://localhost:5001/img/state.png"/> </td>
                        <td style="font-size: 13px;" class="pt-3-half text-center">${item.cod_fondo_por_rendir}</td>
                        <td style="font-size: 13px;" class="pt-3-half text-center">${fecha_creacion.slice(0, 10)}</td>
                        <td style="font-size: 13px;" class="pt-3-half text-center">${fecha_requerida.slice(0, 10)}</td>
             
                        <td style="font-size: 13px;" class="pt-3-half text-center">${item.fxr_comentarios}</td>

 <td style="font-size: 13px;" class="pt-3-half text-center "> <a type="button" onclick="AbrirFilasAprobaciones('${item.cod_fondo_por_rendir}')"  data-toggle="modal" data-target="#proceso${item.cod_fondo_por_rendir}" ><img height="15px" src="http://localhost:5001/img/verProceso.png" alt="Alternate Text" /></a>

                <div class="modal fade bd-example-modal-lg" id="proceso${item.cod_fondo_por_rendir}" aria-hidden="true">
                  <div class="modal-dialog modal-lg">
                    <div class="modal-content container">

                         <div class="modal-header pl-0 pr-0">
                                    <h5 class="modal-title" >Etapas de aprobacion para el documento numero <h5 class="text-info ml-2 font-weight-bold modal-title"> ${item.cod_fondo_por_rendir}</h5> </h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                         </div>

                             <div id="ID_PROGRESO${item.cod_fondo_por_rendir}">
                                      <ol class="progress-meter">
                           
                                      </ol>
                                 </div>

                         <table class="table table-striped table-bordered table-hover w-100 "

                        <thead class="thead-dark w-100 ">

                            <tr>
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

                        <tbody id="T${item.cod_fondo_por_rendir}" >

                        </tbody>

                    </table>

                    </div>
                  </div>
                </div>                

                </td>
             
                        <td style="font-size: 13px;" class="pt-3-half text-dark text-center">  No disponible </td>
 
                        <td style="font-size: 13px;" class="pt-3-half text-dark text-center">  No disponible </td>

                       <td style="font-size: 13px;" class="pt-3-half text-center">  <a href="" data-toggle="modal" data-target="#modal${item.cod_fondo_por_rendir}" onclick="ListarDetalle('${item.cod_fondo_por_rendir}')" style="text-decoration:none;" ><img height="16px" src="http://localhost:5001/img/ojo.png"/></a>
                
                    <div class="modal fade bd-example-modal-lg" id="modal${item.cod_fondo_por_rendir}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                        
                    <div class="modal-dialog modal-lg" role="document">

                            <div class="modal-content container">

                                <div class="modal-header pl-0 pr-0">
                                  <h5 class="modal-title" >Detalle del fondo numero  <h5 class="text-info ml-2 font-weight-bold modal-title"> ${item.cod_fondo_por_rendir}</h5> </h5>
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
                                                <input  value="${fecha_creacion}" placeholder="Ingrese usuario para la sociedad" type="date" class="form-control rounded-0 mt-2 form-control-sm" id="Is_FechaCreacion" required disabled> 
                                            </div>
                                        </div>

                                        <div class="col-12 col-lg-6 pt-2">
                                            <div class="form-group">
                                                <label for="" class="text-dark " style="font-weight: 500;">
                                                    Fecha Requerida actual  <span class="text-danger">
                                                        *
                                                    </span>
                                                </label>
                                                <input  disabled  value="${fecha_requerida}" " placeholder="Ingrese" type="date" class=" form-control rounded-0 mt-2 form-control-sm" id="Is_FechaRequerida${item.cod_fondo_por_rendir}" required>
                                            </div>
                                        </div>

                                              <div class="col-12 col-lg-6 pt-2">
                                            <div class="form-group">
                                                <label for="" class="text-dark " style="font-weight: 500;">
                                                    Proyecto  <span class="text-danger"> * </span>
                                                </label>
                                                <input  value="${item.pro_nombre}"  placeholder="Sin Proyecto" type="text" class="form-control rounded-0 mt-2 form-control-sm" id="Is_FechaCreacion" required disabled> 
                                            </div>
                                        </div>

                                        <div class="col-12 col-lg-6 pt-2">
                                            <div class="form-group">
                                                <label for="" class="text-dark " style="font-weight: 500;">
                                                    Centro de costos  <span class="text-danger">
                                                        *
                                                    </span>
                                                </label>
                                                <input  disabled  value="${item.cc}"  placeholder="Sin Centro de costo"  type="text" class=" form-control rounded-0 mt-2 form-control-sm" id="Is_FechaRequerida${item.cod_fondo_por_rendir}" required>
                                            </div>
                                        </div>

                                        <div class="col-12 col-lg-12 pt-3">
                                            <div class="form-group">
                                                <label for="" class="text-dark " style="font-weight: 500;">
                                                    Comentario<span class="text-danger">
                                                        *
                                                    </span>
                                                </label>
                                                <textarea disabled class="form-control mt-2" id="Is_Comentario${item.cod_fondo_por_rendir}" rows="2"   maxlength="200" required>${item.fxr_comentarios}</textarea>
                                            </div>
                                        </div>


                                        <div class=" pt-3" >
                                        <span id="ProcesoAprobacion${item.cod_fondo_por_rendir}">Autorizador o proceso actual: <span>
                                     </div>


                                          <div class="table-responsive mt-4 ">

                                         <table class="table table-striped table-bordered table-hover w-100 " id="mtabla${item.cod_fondo_por_rendir}" >
                        
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
                        
                                            <tbody id="tabla${item.cod_fondo_por_rendir}">

                                            </tbody>
                        
                                        </table>

                                           <div class="mt-3 mr-3 float-right">
                                                <span  id="total${item.cod_fondo_por_rendir}">
                                                 TOTAL: 
                                                </span>
                                          </div>
                        
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>`

                        }

                    }
             }
            }
        });
        
        $("#TablaListarUsuariosAdministradores").append(FILAS);

       }
        ,
        error: function (error) {
        console.log(error);
 
        }
    });

}





const AbrirFilasAprobaciones = (COD) => {



       $("#T"+COD+" tr ").remove();
    $(`#ID_PROGRESO${COD} ol li `).remove();
    $(`#ID_PROGRESO${COD} div div`).remove();;

        const url = `http://192.168.0.22:81/api/logaprobacion/${COD}`;
   
   
        $.ajax({
            url: url,
            type: "GET",
            dataType: 'json',
            success: function (response) {

                var HTML = '';

                if (response.length == 0) {

                    var MSJ = `<div class="container">
                               <div class="alert alert-primary  font-weight-bold" role="alert">
                                 <span class"font-weight-bold" >  Sin historial ! </span>
                              </div>
                             </div>`;

                    $(`#ID_PROGRESO${COD}`).append(MSJ);

                }

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

  

    const cod_sociedad = localStorage['cod_sociedad'];

    const url_2 = ` http://192.168.0.22:81/api/procesoaprobacion/etapa/${cod_sociedad}/1`;

    $.ajax({
        url: url_2,
        type: "GET",
        dataType: 'json',
        success: function (response) {

            var HTML = '';

            $.each(response, function (i, x) {

                

                HTML += `<li class="progress-point  todo mt-2">${x.usu_nombre} ${x.usu_nombre}  </li>`;



            });

            //$(`#ID_PROGRESO${COD} ol `).append(HTML);

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

const GuardarLogsEliminarFondo = (COD) => {

    //var today = new Date();
    //var dd = String(today.getDate()).padStart(2, '0');
    //var mm = String(today.getMonth() + 1).padStart(2, '0');
    //var yyyy = today.getFullYear();

    //today = yyyy + '-' + mm + '-' + dd;

    //const cod_usuario = localStorage['cod_usuario'];
    //var hora = getHora() + '.5255784';

    //var data = [{

    //    FECHA_OPERACION: today,
    //    HORA_OPERACION: hora,
    //    OPERACION: 'Eliminado',
    //    COD_FONDO_X_RENDIR: COD,
    //    COD_USUARIO: cod_usuario

    //}]

    //const json = JSON.stringify(data);

    //const url = 'http://192.168.0.22:81/api/logs_rendicion/LG2/'
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


    location.reload();
}

const Eliminar = (COD) => {

    var Mitexto = "Esta seguro que desea eliminar?";


    swalWithBootstrapButtons.fire({
        title: Mitexto,
        text: "Eliminar el documento hara que no se pueda recuperar.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true

    }).then((result) => {

        if (result.isConfirmed) {
            const url = `http://192.168.0.22:81/api/fondorendir/${COD}`;
            $.ajax({
                url: url,
                type: "DELETE",
                success: function (response) {

                    GuardarLogsEliminarFondo(COD);

                }, error: function (err) {
                    alert("Error al eliminar");
                    console.log(err);
                }
            });
        }
    })

    

}

const ListarDetalle = (COD_FONDO) => {


    const cod_sociedad = localStorage['cod_sociedad'];

    $(`#ProcesoAprobacion${COD_FONDO}`).text('');

    $.ajax({
        url:`http://192.168.0.22:81/api/procesoaprobacion/JefesActualUsuarioFondo/${cod_sociedad}/${COD_FONDO}`,
        type: "GET",
        dataType: 'json',
        success: function (rs) {
            var proceso = rs[0].coD_FONDO_POR_RENDIR;
            $(`#ProcesoAprobacion${COD_FONDO}`).text('Proceso en: ' + proceso);
        }
    });


    $("#tabla"+COD_FONDO+" tr").remove();
    const url = `http://192.168.0.22:81/api/fondorendirdetalle/${COD_FONDO}`;
    $.ajax({
        url:url,
        type: "GET",
        dataType: 'json',
        success: function (response) {
            var HTML = '';

            $.each(response, function (i, item) {

                var lin = i + 1;

                var estado = item.fxrd_estado.toString();
                if (estado == "1"){
                    estado = "Aceptado";
                    var img = "http://localhost:5001/img/potencia.png";
                }else{
                   if(estado == "0"){
                       estado = "Espera";
                       var img = "http://localhost:5001/img/state.png";
                   } else{
                       estado = "Rechazado";
                       var img = "http://localhost:5001/img/poder.png";
                   }
                }

                var monto = item.fxrd_monto;
                var montoFinal = addCommas(monto);

                HTML += 

                `<tr>
                <td class="p-2 text-center"><img height="11px" src="${img}"/> </td>
                <td style="font-size: 13px;" class="pt-3-half text-center">${item.cod_fondo_por_rendir_detalle}</td> 
                <td style="font-size: 13px;" class="pt-3-half text-center">${lin}</td> 
                <td style="font-size: 13px;" class="pt-3-half text-center">${item.art_producto}</td> 
                <td style="font-size: 13px;" class="pt-3-half text-center">${item.fxrd_comentario}</td>
                <td style="font-size: 13px;" class="pt-3-half text-center">${montoFinal}</td> 
                <td style="font-size: 13px;" class="pt-3-half text-center">${estado}</td>
                <td style="font-size: 13px;" class="pt-3-half text-center">${item.fxrd_comentario_jefe}</td>
                </tr>
                `;
                
         
            });
            $("#tabla" + COD_FONDO + "").append(HTML);
            Total(COD_FONDO);
        }
    });
}

const Total = (CODIGO) => {
    var init = 0;

    $("#mtabla" + CODIGO +" tbody tr" ).each(function (i) {
      
        var customerId = $(this).find("td").eq(5).html();
        var f = customerId.replace(',', '');
        f = f.replace(',', '');
        init = init + parseInt(f);

    });

    init = addCommas(init);


    $('#total'+CODIGO+'').text("Total: " +init);

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

const Actualizar = (event, COD) => {

    event.preventDefault();
    const comentario = $('#Is_Comentario'+COD+'').val();
    const fecha_requerida = $('#Is_FechaRequerida' + COD + '').val();

    const url = `http://192.168.0.22:81/api/fondorendir/actualizar/${fecha_requerida}/${comentario}/${COD}`;

    $.ajax({
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        url: url,
        type: "PUT",
        dataType: 'json',
        success: function (response) {

            GuardarLogsActualizarFondo(COD);
        },
        
        error: function (err) {
            console.log(err);
            alert("Error al actualizar");
        }

    });
    
}

const GuardarLogsActualizarFondo = (codigo) => {

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
    //    COD_FONDO_X_RENDIR: codigo,
    //    COD_USUARIO: cod_usuario

    //}]

    //const json = JSON.stringify(data);

    //const url = 'http://192.168.0.22:81/api/logs_rendicion/LG2/'
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
    //    title: 'Solicitud fondo actualizada',
    //    timer: 1500
    //})

    setTimeout(function () { location.reload() }, 1500);
}


