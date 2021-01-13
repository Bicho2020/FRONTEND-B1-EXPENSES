
$(document).ready(function(){
    ListarCCActivados();

    $("#Filtrocc").keyup(function () {
        _this = this;
        $.each($("#TablaListarCentroCostos tbody tr"), function () {
            if ($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) === -1)
                $(this).hide();
            else
                $(this).show();
        });
    });

});


const swalWithBootstrapButtons = Swal.mixin({

    customClass: {
        confirmButton: 'btn btn-danger ml-3 border-none  font-weight-bold',
        cancelButton: 'btn btn-light-sm mr-3 border  font-weight-bold ',
        title: 'font-weight-bold',
    },
    buttonsStyling: false

})


const AgregarCC = (event) => {

    event.preventDefault();

    url = 'http://192.168.0.22:81/api/centrocosto';

    //leer datos desde el formulario

    const codigo_centro = $('#cod_centro').val();
    const nombre = $('#cdc_nombre').val();
    const cod_sociedad = localStorage['cod_sociedad'];

    var data = {
        cod_centro_de_costo : codigo_centro,
        cdc_nombre: nombre,
        cod_sociedad: cod_sociedad,
        cdc_estado: 1
    };

    const json = JSON.stringify(data);


    $.ajax({
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        type: "POST",
        url: url,
        data: json,
        success: function (res) {
            Swal.fire({
                icon: 'success',
                title: 'Centro de costo agregado con exito.',
                showConfirmButton: false,
                timer: 1500
            });

            setTimeout(function () { location.reload() }, 1500);

        },
        error: function (data) {
            console.log(data)
            alert("error al guardar centro de costo , el codigo ya existe.")
        }
    });
}

const  ListarCCActivados = ()  =>{


    const cod_sociedad = localStorage['cod_sociedad'];
    const url = 'http://192.168.0.22:81/api/centrocosto/' + cod_sociedad + '';

    $.ajax({
        headers: {  'Accept': 'application/json','Content-Type': 'application/json' },
        url: url,
        type: "GET",
        success: function(res) {
            var HTML = '';
            $.each(res, function (i, data) {

                var ASIG = JSON.stringify(data.cdc_estado);

                if (ASIG == '"1"') {


                    HTML +=

                        '' +
                        '<tr>' +
                        '   <td class="text-center pt-3 " style="font-size:13px;" >' + data.cod_centro_de_costo + '</td>' +
                        '   <td class="text-center pt-3 " style="font-size:13px;">' + data.cod_sociedad + '</td>' +
                        '   <td class="text-center pt-3 " style="font-size:13px; font-weight:400;">' + data.cdc_nombre + '</td>' +
                    '   <td class="text-center pt-2 "  ><button type="button" style="text-decoration:none; font-size:13px;" class="btn text-info " data-toggle="modal" data-target="#ModalModificarCC' + data.cod_centro_de_costo + '"><img src="http://localhost:5001/img/actualizar.png" height="13px" alt="Boton Abrir" /></button>' +
                        '   <div class="modal fade" id="ModalModificarCC' + data.cod_centro_de_costo + '" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">' +
                        '     <div class="modal-dialog" role="document">' +

                        '       <div class="modal-content">' +

                        '         <div class="modal-header">' +

                        '            <h5 class="modal-title" id="exampleModalLabel">Modificar centro de costo</h5>' +

                        '            <button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
                        '              <span aria-hidden="true">&times;</span>' +
                        '            </button>' +

                        '         </div>' +

                    '         <div class="modal-body text-left">' +

                    '    <span class="text-dark">Modificacion de centros costos.<span  class="text-danger  pl-3 " style="font-weight: 500; font-size:14px;">* Campos  Obligatorios</span></span>' +
                        '            <form class="form-signin" onsubmit="ModificarCC(event,\'' + data.cod_centro_de_costo + '\')">' +
                        '               <div class="form-group">' +

                        '                </div>' +
                        '                <div class="form-group">' +
                    '                    <label  class="text-dark text-left mt-3 " style="font-weight: 500;">Nombre centro de costo<span class="text-danger"> * </span> </label>' +
                    '                   <input value="' + data.cdc_nombre + '"  id="txt_nombre_cc' + data.cod_centro_de_costo + '" class="form-control form-control-sm rounded-0 mt-3" type="text" placeholder="">' +
                        '                </div>' +
                    '    <div class="row "> ' +
                    ' ' +
                    '        <div class="mt-1 pb-2"> ' +
                    '            <button type="submit" style="background:#5fb8d1; border-color:#5abeda ;" ' +
                    '                class="btn rounded-0 btn-primary btn-sm shadow font-weight-bold mt-3 float-right">Modificar Centro de costo</button> ' +
                    '        </div> ' +
                    ' ' +
                    '    </div> ' +
                        '           </form>' +
                        '  </div>' +
                        '</div>' +
                        '</td>' +
                        '   <td class="text-center" ><button type="submit" onclick="DesactivarCC(\'' + data.cod_centro_de_costo + '\')"; style="background-color:none;" class=" btn text-danger font-weight-bold ">X</button> </td>' +
                        '</tr>' +
                        '';
                } else {

                    HTML +=

                        '' +
                        '<tr>' +
                        '   <td class="text-center pt-3  " style="font-size:13px;">' + data.cod_centro_de_costo + '</td>' +
                        '   <td class="text-center pt-3 " style="font-size:13px;">' + data.cod_sociedad + '</td>' +
                    '   <td class="text-center pt-3 " style="font-size:13px; font-weight:400;">' + data.cdc_nombre + '</td>' +
                    '   <td class="text-center pt-3  text-secondary " style="font-size:13px; font-weight:400;">Desactivado</td>' +
  
                    '   <td class="text-center" ><button type="submit" onclick="ActivarCC(\'' + data.cod_centro_de_costo + '\')"; style="background-color:none; font-size:12px;" class=" btn text-info  "><img src="http://localhost:5001/img/tick.png" height="17px" alt="Boton Abrir"/> </button> </td>' +
                        '</tr>' +
                        '';

                }


            });
            $('#TablaListarCentroCostos').append(HTML);
          },
         error: function(err) {  
         alert("Error al traer los centros de costo");
         console.log(err);
      }
    });
 
}



const DesactivarCC = (cod_centro_de_costo) => {


    swalWithBootstrapButtons.fire({
        title: 'Esta seguro que desea desactivar este centro de costo?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Desactivar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true

    }).then((result) => {

        if (result.isConfirmed) {
            const url = 'http://192.168.0.22:81/api/centrocosto/cdc_estado/0/' + cod_centro_de_costo + '';
            $.ajax({
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                url: url,
                type: "PUT",
                success: function (res) {

                    location.reload();
                },
                error: function (err) {
                    alert("Error al eliminar Centro de costo");
                    console.log(err);
                }
            });
        }
    })

  
  }


  const ActivarCC = (cod_centro_de_costo) => {

    const url = 'http://192.168.0.22:81/api/centrocosto/cdc_estado/1/'+cod_centro_de_costo+'';
    $.ajax({
        headers: {  'Accept': 'application/json','Content-Type': 'application/json' },
        url: url,
        type: "PUT",
        success: function(res) {
       
          location.reload();
          },
         error: function(err) {  
         alert("Error al activar Centro de costo");
         console.log(err);
      }
      });
  }

  const ModificarCC = (event,cod_centro_de_costo)  =>{
    event.preventDefault();
 
    //const cod_sociedad = localStorage['nombre_perfil'];

    const cod_sociedad = localStorage['cod_sociedad'];
    const nombre_cc = $('#txt_nombre_cc'+cod_centro_de_costo+'').val();
    const url = 'http://192.168.0.22:81/api/centrocosto/'+nombre_cc +'/'+cod_centro_de_costo+'';
    $.ajax({
       headers: {  'Accept': 'application/json','Content-Type': 'application/json' },
       url: url,
       type: "PUT",
       success: function(res) {
           Swal.fire({
               icon: 'success',
               title: 'Centro de costo modificado con exito.',
               showConfirmButton: false,
               timer: 1500
           });

           setTimeout(function () { location.reload() }, 1500);

         },
        error: function(err) {  
            console.log(err)
        alert("Error al modificar Centro de costo");
        console.log(err);
     }
    });
 
 }