$(document).ready(function () {

    ListarProyectos();

    $("#FiltroProyectos").keyup(function () {
        _this = this;
        $.each($("#TablaListarProyectos tbody tr"), function () {
            if ($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) === -1)
                $(this).hide();
            else
                $(this).show();
        });
    });



    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    $("#txt_fecha_inicio").val(today);

 });
 
const GuardarProyecto = (event) => {
    event.preventDefault();
  
    //const cod_sociedad = localStorage['nombre_perfil'];

     const cod_sociedad = localStorage['cod_sociedad'];

    const cod_proyecto = $('#txt_cod_proyecto').val();
    const nombre_proyecto = $('#txt_descripcion').val();
    const fecha_inicio = $('#txt_fecha_inicio').val();
    const fecha_fin= $('#txt_fecha_fin').val();

    const url = 'http://192.168.0.22:81/api/proyecto/'

     const data = {
        cod_proyecto: cod_proyecto,
        cod_sociedad: cod_sociedad,
        proy_descripcion: nombre_proyecto,
        proy_fecha_inicio: fecha_inicio,
        proy_fecha_fin: fecha_fin,
        proy_estado:1
    }
    
    const json =   JSON.stringify(data);


    $.ajax({
      headers: {  'Accept': 'application/json','Content-Type': 'application/json' },
      url: url,
      type: "POST",
      data: json,
      success: function(res) {
          Swal.fire({
              icon: 'success',
              title: 'Proyecto registrado.',
              showConfirmButton: false,
              timer: 1500
          });

          setTimeout(function () { location.reload() }, 1500);
        },
       error: function(err) {  
       alert("Error al guardar el Proyecto , codigo ya registrado o error en el codigo");
       console.log(err);
    }
    });
 
 }
 
 const ModificarProyecto = (event , COD_PROYECTO)  =>{
  
    event.preventDefault();

    const nombre_proyecto = $('#txt_descripcion'+COD_PROYECTO+'').val();
    const cod_sociedad = $('#txt_sociedad'+COD_PROYECTO+'').val();
    const fecha_inicio= $('#txt_fecha_inicio'+COD_PROYECTO+'').val();
    const fecha_fin = $('#txt_fecha_fin'+COD_PROYECTO+'').val();

    const url = 'http://192.168.0.22:81/api/proyecto/';
 
    const data = {


       cod_proyecto: COD_PROYECTO,
       cod_sociedad: cod_sociedad,
       proy_descripcion: nombre_proyecto,
       proy_fecha_inicio: fecha_inicio,
       proy_fecha_fin: fecha_fin
    }

     const json = JSON.stringify(data);


    $.ajax({
       headers: {  'Accept': 'application/json','Content-Type': 'application/json' },
       url: url,
       type: "PUT",
       data:json,
       success: function(res) {
           Swal.fire({
               icon: 'success',
               title: 'Proyecto modificado con exito.',
               showConfirmButton: false,
               timer: 1500
           });

           setTimeout(function () { location.reload() }, 1500);
         },
        error: function(err) {  
        alert("Error al modificar proyecto");
        console.log(err);
     }
    });
  
  }
 
 
 const  ListarProyectos = ()  =>{
   

     const cod_sociedad = localStorage['cod_sociedad'];
     const url = 'http://192.168.0.22:81/api/proyecto/'+cod_sociedad+'';


     $.ajax({
         headers: {  'Accept': 'application/json','Content-Type': 'application/json' },
         url: url,
         type: "GET",
         success: function (res) {
      
             var HTML = '';

             $.each(res, function (i, data) {

                 var ASIG = JSON.stringify(data.proy_estado);
                 
                 if (ASIG == '"1"') {

                     var fecha_inicio = data.proy_fecha_inicio.toString();
                     var fecha_fin = data.proy_fecha_fin.toString();

                   


                     HTML +=
                         '' +
                     '<tr>' +
                     '   <td class="text-center pt-3" style="font-size:13px" >' + data.cod_proyecto + '</td>' +
                         '<td class="text-center  pt-3" style="font-size:13px" >' + data.proy_descripcion + '</td>' +
                     '   <td class="text-center  pt-3" style="font-size:13px">' + fecha_inicio + '</td>' +
                     '   <td class="text-center  pt-3" style="font-size:13px; font-weight: normal;" >' + fecha_fin + '</th>' +
                     '   <td class="text-center  pt-2"  ><button type="button" style="text-decoration:none; font-size:12px" class="btn text-info font-weight-bold" data-toggle="modal" data-target="#ModalModificarProyecto' + data.cod_proyecto + '"><img src="http://localhost:5001/img/actualizar.png" height="13px" alt="Boton Abrir" /> </button>' +

                         '   <div class="modal fade" id="ModalModificarProyecto' + data.cod_proyecto + '" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">' +
                         '     <div class="modal-dialog" role="document">' +

                         '       <div class="modal-content left">' +

                         '         <div class="modal-header text-left">' +

                         '            <h5 class="modal-title" id="exampleModalLabel">Modificar Proyecto</h5>' +

                         '            <button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
                         '              <span aria-hidden="true">&times;</span>' +
                         '            </button>' +

                         '         </div>' +

                         '         <div class="modal-body text-left">' +
                         '            <form class="mt-1"  onsubmit="ModificarProyecto(event,\'' + data.cod_proyecto + '\')">' +
                         '    ' +
                         '    <span class="text-dark">Modificacion de proyectos. <span  class="text-danger  pl-3 " style="font-weight: 500; font-size:14px;">* Campos  Obligatorios</span></span>' +
                         '    <div class="row mt-2 text-left ">' +
                         ' ' +
                         '        <div class="col-12 col-sm-12 left col-md-12 col-lg-6 pt-2">' +
                         '            <div class="form-group">' +
                         '                <label  class="text-dark text-left " style="font-weight: 500;">Descripcion <span class="text-danger"> * </span> </label>' +
                         '                <input type="text" value="' + data.proy_descripcion + '" id="txt_descripcion' + data.cod_proyecto + '" class="form-control rounded-0 mt-2 form-control-sm"   required>' +
                         '            </div>' +
                         '        </div>' +
                         ' ' +
                         '        <div class="col-12 col-lg-6 pt-2">' +
                         ' ' +
                         '            <div class="form-group"> ' +
                         '                <label  class="text-dark " style="font-weight: 500;">Sociedad <span class="text-danger"> * </span> </label> ' +
                         '                <input disabled id="txt_sociedad' + data.cod_proyecto + '" value="' + data.cod_sociedad + '"  type="text" class="  form-control rounded-0 mt-2 form-control-sm"  required> ' +
                         '            </div> ' +
                         '        </div> ' +
                         ' ' +
                         '    </div> ' +
                         ' ' +
                         '    <div class="row mt-2 "> ' +
                         ' ' +
                         '        <div class="col-12 col-sm-12 col-md-12 col-lg-6 pt-2"> ' +
                         '            <div class="form-group"> ' +
                         '                <label  class="text-dark " style="font-weight: 500;">Fecha inicio <span class="text-danger"> * </span> </label> ' +
                     '                <input value="'+fecha_inicio+'" id="txt_fecha_inicio' + data.cod_proyecto + '" type="date" class="form-control rounded-0 mt-2 form-control-sm"   required> ' +
                         '            </div> ' +
                         '        </div> ' +
                         ' ' +
                         '        <div class="col-12 col-lg-6 pt-2"> ' +
                         ' ' +
                         '            <div class="form-group"> ' +
                         '                <label  class="text-dark " style="font-weight: 500;">Fecha termino<span class="text-danger"> * </span> </label> ' +
                     '                <input value="'+fecha_fin+'" id="txt_fecha_fin' + data.cod_proyecto + '"   type="date" class="  form-control rounded-0 mt-2 form-control-sm"  required> ' +
                         '            </div> ' +
                         '        </div> ' +
                         ' ' +
                         '    </div> ' +
                         ' ' +
                         '    <div class="row "> ' +
                         ' ' +
                         '        <div class="mt-1 pb-2"> ' +
                         '            <button type="submit" style="background:#5fb8d1; border-color:#5abeda ;" ' +
                         '                class="btn rounded-0 btn-primary btn-sm shadow font-weight-bold mt-3 float-right">Modificar Proyecto</button> ' +
                         '        </div> ' +
                         ' ' +
                         '    </div> ' +
                         ' ' +
                         '</form> ' +
                         '  </div>' +
                         '</div>' +

                         '</td>' +
                         '   <td class="text-center" ><button type="submit" onclick="DesactivarProyecto(\'' + data.cod_proyecto + '\')"; style="background-color:none;" class=" btn text-danger font-weight-bold ">X</button> </td>' +
                         '</tr>' +
                         '';
                 } else {
                     const fecha_inicio = data.proy_fecha_inicio.toString();
                     const fecha_fin = data.proy_fecha_fin.toString();
                     const Sfecha_inicio = fecha_inicio.replace('/', '-').substr(0, 10).replace('/', '-');
                     const Sfecha_fin = fecha_fin.replace('/', '-').substr(0, 10).replace('/', '-');
                     const FECHAINICIO = moment(Sfecha_inicio).format('YYYY-MM-DD');
                     const FECHAFIN = moment(Sfecha_fin).format('YYYY-MM-DD');
                     HTML +=

                         '' +
                     '<tr>' +
                     '   <td   class="text-center"  style="font-size:13px" >' + data.cod_proyecto + '</td>' +
                         '   <td  class="text-center"  style="font-size:13px";>' + data.proy_descripcion + '</td>' +
                         '   <td  class="text-center"  style="font-size:13px"; >' + FECHAINICIO + '</td>' +
                     '   <th  class="text-center"  style="font-weight: normal; font-size:13px">' + FECHAFIN + '</th>' +
                     '   <th  class="text-center text-secondary"  style="font-weight: normal; font-size:13px">Desactivado</th>' +
                     '   <td class="text-center" ><button type="submit" onclick="ActivarProyecto(\'' + data.cod_proyecto + '\')"; style="background-color:none; font-size:13px; " class=" btn text-info font-weight-bold "><img src="http://localhost:5001/img/tick.png" height="17px" alt="Boton Abrir" /></button> </td>' +
                         '</tr>' +
                         '';
                 }

             
 
             });
             $('#TablaListarProyectos').append(HTML);
           },
          error: function(err) {  
          alert("Error al traer los articulos");
          console.log(err);
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

 const DesactivarProyecto = (COD_PROYECTO) => {


     swalWithBootstrapButtons.fire({
         title: 'Esta seguro que desea desactivar este proyecto?',
         icon: 'warning',
         showCancelButton: true,
         confirmButtonText: 'Desactivar',
         cancelButtonText: 'Cancelar',
         reverseButtons: true

     }).then((result) => {

         if (result.isConfirmed) {
             const url = 'http://192.168.0.22:81/api/proyecto/proy_estado/0/' + COD_PROYECTO + '';
             $.ajax({
                 headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                 url: url,
                 type: "PUT",
                 success: function (res) {
                     location.reload();
                 },
                 error: function (err) {
                     alert("Error el desactivar proyecto");
                     console.log(err);
                 }
             });
         }
     })




 }
 
 const ActivarProyecto = (COD_PROYECTO) => {
 
     const url = 'http://192.168.0.22:81/api/proyecto/proy_estado/1/'+COD_PROYECTO+'';
     $.ajax({
         headers: {  'Accept': 'application/json','Content-Type': 'application/json' },
         url: url,
         type: "PUT",
         success: function(res) {
    
           location.reload();
           },
          error: function(err) {  
           alert("error al activar proyecto")
          console.log(err);
       }
       });
 }
 
 