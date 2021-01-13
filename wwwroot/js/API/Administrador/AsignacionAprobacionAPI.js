$(document).ready(function () {

  ListarAsigActualFondos();
  ListarAsigActualRendicion();
  ListarUsuarios();

    const cod_sociedad = localStorage['cod_sociedad'];
    $('#Is_CodSociedad').val(cod_sociedad);

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    $("#Is_FechaCreacion").val(today);

    ListarTipoAprobacion(cod_sociedad);

});

const ListarTipoAprobacion = (CS) => {

    const url = `http://192.168.0.22:81/api/tipoaprobacion/${CS}`;

    $.ajax({
        url: url,
        type: "GET",
        dataType: 'json',
        success: function (res) {

    
            $.each(res, function (i, x) {

                const doc = x.ta_tipo_documento;
                const op = x.ta_opcion;
    
                $(`#${doc}${op}`).prop('checked', true);

            });
            console.log(res);
    
        },

        error: function (error) {

            console.log(error)
        }

    });

} 


const $tableID = $('#table');
const $BTN = $('#export-btn');
const $EXPORT = $('#export');



const getFila = () =>{

  $('#thetable').find('tr').click( function(){
    const fila = ($(this).index()+1);  
    localStorage.setItem('Fila', fila);
  });

} 

const ListarAsigActualFondos = () => {

  const cod_sociedad = localStorage['cod_sociedad'];
 
  const url = `http://192.168.0.22:81/api/procesoaprobacion/etapa/${cod_sociedad}/1`;

  $.ajax({
    url: url,
    type: "GET",
    dataType: 'json',
    success: function (res) {
  
        var html = '';
        $.each(res, function  (i, x) {

          const nombres = ''+x.usu_nombre+' '+x.usu_apellido+'';

          html += 
          `<tr>
            <td class="text-center" >${x.etapa_numero}</td>
            <td class="text-center" >${x.etapa_nombre}</td>
            <td class="text-center" >${nombres}</td>
            <td class="text-center" > <a href="" onclick="ListarUsuariosEditar('${x.cod}')" data-toggle="modal" data-target="#usu${x.cod}" ><img height="17px" src="http://localhost:5001/img/actualizar.png" alt=""></a>
                      <div class="modal fade bd-example-modal-lg" id="usu${x.cod}" tabindex="-1" role="dialog"
            aria-hidden="true">
              <div class="modal-dialog modal-lg" role="document">
                  <div class="modal-content">
                      <div class="modal-header">
                          <h5 class="modal-title">Modificar usuario</h5>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                          </button>
                      </div>
                      <div class="modal-body text-center">

                          <table class="table  table-bordered  table-hover mt-4 " id="ListarUsuariosEditar${x.cod}">
                              <thead>
                                  <tr class="text-center">

                                      <th style="font-size:13px" scope="col">codigo usuario</th>
                                      <th style="font-size:13px" scope="col">rut</th>
                                      <th style="font-size:13px" scope="col">nombre</th>
                                      <th style="font-size:13px" scope="col">apellido</th>

                                  </tr>
                              </thead>
                              <tbody>
                              </tbody>
                          </table>
                      </div>

                  </div>
              </div>
          </div>
            </td>
          </tr>`;

        });    
        console.log(res);
        $("#ActualAsig1").append(html);
    },
    error: function (error) {
     
        console.log(error)
    }

    
});

}

const Limpiar = () => {
    const cod_sociedad = localStorage['cod_sociedad'];
    const url = `http://192.168.0.22:81/api/tipoaprobacion/${cod_sociedad}`;

    $.ajax({
        url: url,
        type: "DELETE",
        
    });

   
}

const GuadarAprobacion = (doc,tipo) => {
    const cod_sociedad = localStorage['cod_sociedad'];
    const url = `http://192.168.0.22:81/api/tipoaprobacion/${cod_sociedad}/${doc}/${tipo}`;

    $.ajax({
        url:url,
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        type: "POST",
    });
}

const ListarAsigActualRendicion = () => {

    const cod_sociedad = localStorage['cod_sociedad'];

    const url = `http://192.168.0.22:81/api/procesoaprobacion/etapa/${cod_sociedad}/2`;

    $.ajax({
        url: url,
        type: "GET",
        dataType: 'json',
        success: function (res) {

            var html = '';
            $.each(res, function (i, x) {

                const nombres = '' + x.usu_nombre + ' ' + x.usu_apellido + '';

                html +=
                    `<tr>
                      <td class="text-center" >${x.etapa_numero}</td>
                      <td class="text-center" >${x.etapa_nombre}</td>
                      <td class="text-center" >${nombres}</td>
                      <td class="text-center" > <a href="" onclick="ListarUsuariosEditar('${x.cod}')" data-toggle="modal" data-target="#usu${x.cod}" ><img height="17px" src="http://localhost:5001/img/actualizar.png" alt=""></a>
                      <div class="modal fade bd-example-modal-lg" id="usu${x.cod}" tabindex="-1" role="dialog"
               aria-hidden="true">
              <div class="modal-dialog modal-lg" role="document">
                  <div class="modal-content">
                      <div class="modal-header">
                          <h5 class="modal-title" >Modificar usuario</h5>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                          </button>
                      </div>
                      <div class="modal-body">

                    

                          <table class="table  table-bordered  table-hover mt-4 " id="ListarUsuariosEditar${x.cod}">
                              <thead>
                                  <tr>

                                      <th style="font-size:13px" scope="col">codigo usuario</th>
                                      <th style="font-size:13px" scope="col">rut</th>
                                      <th style="font-size:13px" scope="col">nombre</th>
                                      <th style="font-size:13px" scope="col">apellido</th>

                                  </tr>
                              </thead>
                              <tbody>
                              </tbody>
                          </table>
                      </div>

                  </div>
              </div>
          </div>
            </td>
                    </tr>`;

            });
            console.log(res);
            $("#ActualAsigDos").append(html);
        },
        error: function (error) {

            console.log(error)
        }


    });

}


const pasar = (cod,nombre) => {
  $('#thetable tr').each(function(i) {
    var $tds = $(this).find('td');
 
    var index = (JSON.stringify(i));
 
    if(index.toString() == localStorage.getItem('Fila')){
     $tds.eq(1).text(nombre);
     $tds.eq(2).text(cod);
     $('#Modal').modal('hide');
    }else{

    }

  });

}


const ListarUsuarios = () =>{

  const cod_sociedad = localStorage['cod_sociedad'];
  const cod_empresa = 1;

    url = `http://192.168.0.22:81/api/usuario/autorizadores/${cod_empresa}/${cod_sociedad}`;

  $.ajax({
      url: url,
      type: "GET",
      dataType: 'json',
      success: function (res) {
          var html = '';
    
          $.each(res, function (i, item) {

            const nombres = ''+item.usu_nombre+' '+item.usu_apellido+'';

            html += 
            `<tr id="${i}" class="trArticulo text-center" onclick="pasar('${item.cod_usuario}','${nombres}')" >
              <td class="text-center" >${item.cod_usuario}</td>
              <td class="text-center" >${item.usu_rut}</td>
              <td class="text-center" >${item.usu_nombre}</td>
              <td class="text-center" >${item.usu_apellido}</td>
            </tr>`;

          });    

          $("#ListarUsuarios").append(html);
      },
      error: function (error) {
          alert(error);
          console.log(error)
      }
  });
}

const ListarUsuariosEditar = (COD) =>{

  const cod_sociedad = localStorage['cod_sociedad'];
  const cod_empresa = 1;

    url = `http://192.168.0.22:81/api/usuario/autorizadores/${cod_empresa}/${cod_sociedad}`;

  $.ajax({
      url: url,
      type: "GET",
      dataType: 'json',
      success: function (res) {
          var html = '';
    
          $.each(res, function (i, item) {

            const nombres = ''+item.usu_nombre+' '+item.usu_apellido+'';

            html += 
            `<tr id="${i}" class="trArticulo text-center" onclick="ModificarAsignacion('${COD}','${item.cod_usuario}')" >
              <td class="text-center" >${item.cod_usuario}</td>
              <td class="text-center" >${item.usu_rut}</td>
              <td class="text-center" >${item.usu_nombre}</td>
              <td class="text-center" >${item.usu_apellido}</td>
            </tr>`;

          });    

          $(`#ListarUsuariosEditar${COD}`).append(html);
      },
      error: function (error) {
          alert(error);
          console.log(error)
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



const ModificarAsignacion = (COD_ETAPA,COD_USUARIO) => {

  swalWithBootstrapButtons.fire({
    title: '¿Está seguro que desea modificar?',
    text: "Modificar el usuario cambiara el proceso de aprobación actual",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Modificar',
    cancelButtonText: 'Cancelar',
    reverseButtons: true

}).then((result) => {
  $.ajax({
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    url: `http://192.168.0.22:81/api/procesoaprobacion/editar/${COD_USUARIO}/${COD_ETAPA}`,
    type: "PUT",
    dataType: 'json',
    success: function (res) {
      Swal.fire({
        icon: 'success',
        title: 'Usuario modificado.',
        timer: 1500,
        showConfirmButton: false
      })
      setTimeout(function () { location.reload() }, 1500);
    },
    error: function (error) {
        alert(error);
        console.log(error)
    }
});
     
})

 

}

const newTr = 
`<tr>
<td class="pt-3-half" contenteditable="true"></td>
<td onclick="getFila();" class="pt-3-half" data-toggle="modal" data-target="#Modal"></td>
<td hidden class="pt-3-half"></td>
<td onclick="getFila();" class="text-center" width="40px">
    <div class="d-flex justify-content-center ">
        <a style="font-size:17px; text-decoration:none;" id="table-remove"
            class="table-remove text-danger font-weight-bold ">
            x
        </a>
    </div>
</td>
</tr>`;

 $('.table-add').on('click', 'i', () => {
 
  $('#TablaDetalle').append(newTr); 
  
 });

 $tableID.on('click', '.table-remove', function () {

   $(this).parents('tr').detach();
 });

 $tableID.on('click', '.table-up', function () {

  const $row = $(this).parents('tr');

  if ($row.index() === 0) {
     return;
  }

  $row.prev().before($row.get(0));
});

$tableID.on('click', '.table-down', function () {

  const $row = $(this).parents('tr');
  $row.next().after($row.get(0));
});

jQuery.fn.pop = [].pop;
jQuery.fn.shift = [].shift;

const CargarAsignacionAprobacion = (event) => {

  localStorage['validacion_aprobacion'] = 0;

  event.preventDefault();

  const $rows = $tableID.find('tr:not(:hidden)');
  const headers = [];
  const data = [];

  $($rows.shift()).find('th:not(:empty)').each(function () {
    headers.push($(this).text().toLowerCase());
  });

  $rows.each(function () {
    const $td = $(this).find('td');
    const h = {};

    headers.forEach((header, i) => {
      h[header] = $td.eq(i).text();
    });

    data.push(h);
  });
    const doc = $("#TipoDocumento").val();
  

    if (doc.toString() == "0") {
        alert("Seleccione tipo documento")
    } else {
        const size = Object.keys(data).length;

        $.each(data, function (i, item) {

            var x = i + 1;

            if (item.nombre == "") {
                alert("El campo nombre de la etapa esta vacio en la fila " + x);
                localStorage['validacion_aprobacion'] = 1;
            }
            if (item.usuario == "") {
                alert("El campo usuario esta vacio en la fila " + x);
                localStorage['validacion_aprobacion'] = 1;
            }
           

            if (size.toString() == i + 1) {
                var validar = localStorage['validacion_aprobacion'];
                if (validar.toString() == 1) {
                    localStorage['validacion_aprobacion'] = 0;
                } else {
                    GuardarAsignacionAprobacion(event, data, doc);
                }
            }

        }); 
    }


   
}



const GuardarAsignacionAprobacion = (event,Fdata,doc) => {

    event.preventDefault();

    LimpiarAprobaciones(doc);

    const size = Object.keys(Fdata).length;

    var cod_sociedad = $('#Is_CodSociedad').val();
    var fecha_creacion = $('#Is_FechaCreacion').val();
    var comentario = $('#Is_Comentario').val();
  
    var EncabezadoAsigAprob = {
  
      cod_sociedad: cod_sociedad,
      proa_fecha: fecha_creacion,
      proa_esvalido: 1,
      proa_comentario : comentario
  
    };

;
  
    const json = JSON.stringify(EncabezadoAsigAprob);
    const url = 'http://192.168.0.22:81/api/procesoaprobacion';
  
    $.ajax({
     headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
     type: "POST",
     url: url,
     data: json,
     success: function (res) {
        const cod_proceso = res.cod_proceso_aprobacion;
        console.log(cod_proceso);

        $.each(Fdata, function (i, item) {

          GuardarDetalle(item, cod_proceso, i,doc)
            if (size.toString() == i + 1) {
               
              Swal.fire({
                icon: 'success',
                title: 'Asginación lista',
                timer: 1500,
                showConfirmButton: false
              })
              setTimeout(function () { location.reload() }, 1500);
         }
            
      });
      
     },
     error: function (data) {
        console.log(data)
        alert("error al guardar encabezado")
      }
  });

    
  
}

function LimpiarAprobaciones(doc) {

   const cod_sociedad = localStorage['cod_sociedad'];

    const url = `http://192.168.0.22:81/api/procesoaprobacion/${cod_sociedad}/${doc}`;
  $.ajax({
   headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
   type: "DELETE",
   url: url
  });
}


const GuardarDetalle = (item,codigo,i,doc) => {

  var cod = parseInt(codigo, 10);

  var data = {
    cod_usuario: item.codigo,
    eta_numero: i+1,
    eta_nombre: item.nombre,
    eta_isvalido:doc,
    cod_proceso_aprobacion:cod
  }

  const json = JSON.stringify(data);

  const url = 'http://192.168.0.22:81/api/etapa/';

  $.ajax({
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    type: "POST",
    url: url,
    data: json,
    success: function (res) {
      
    },
    error: function (error) {
      console.log(error);
      LimpiarAprobaciones();
    }
});

}