$(document).ready(function(){
    ListarArticulos();
    ListarComboBox();

    $("#FiltroArticulos").keyup(function () {
        _this = this;
        $.each($("#TablaListarArticulos tbody tr"), function () {
            if ($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) === -1)
                $(this).hide();
            else
                $(this).show();
        });
    });


});

const GuardarArticulo = (event)  =>{

    event.preventDefault();

    const cod_sociedad = localStorage['cod_sociedad'];

    const cod_articulo = $('#cod_art').val();
    const nombre_articulo = $('#txt_nombre_articulo').val();
    const cod_pdc = $('#myselect').val();

    if (cod_pdc == 0) {
        alert("Seleccione un plan de cuentas")
    } else {
       


        const url = 'http://192.168.0.22:81/api/articulo/'



        const data = {


            cod_articulo: cod_articulo,
            cod_sociedad: cod_sociedad,
            cod_cuenta: cod_pdc,
            art_nombre: nombre_articulo,
            art_estado: 1
        }

        const json = JSON.stringify(data);



        $.ajax({
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            url: url,
            type: "POST",
            data: json,
            success: function (res) {

                Swal.fire({
                    icon: 'success',
                    title: 'Articulo registrado con exito.',
                    showConfirmButton: false,
                    timer: 1500
                });

                setTimeout(function () { location.reload() }, 1500);



            },
            error: function (err) {
                alert("Error al guardar el articulo , el codigo ya existe");
                console.log(err);
            }
        });
    }
 
  
}

const swalWithBootstrapButtons = Swal.mixin({

    customClass: {
        confirmButton: 'btn btn-danger ml-3 border-none  font-weight-bold',
        cancelButton: 'btn btn-light-sm mr-3 border  font-weight-bold ',
        title: 'font-weight-bold',
    },
    buttonsStyling: false

})

const ModificarArticulo = (event,COD_ARTICULO)  =>{

    event.preventDefault();
    const nombre_articulo = $('#txt_nombre_articulo'+COD_ARTICULO+'').val();

    const url = 'http://192.168.0.22:81/api/articulo/'+nombre_articulo +'/'+COD_ARTICULO+'';

    $.ajax({
       headers: {  'Accept': 'application/json','Content-Type': 'application/json' },
       url: url,
        type: "PUT",

        success: function (res) {

            Swal.fire({
                icon: 'success',
                title: 'Articulo modificado con exito.',
                showConfirmButton: false,
                timer: 1500
            });

            setTimeout(function () { location.reload() }, 1500);
          
     
         },
        error: function(err) {  
        alert("Error al modificar articulo");
        console.log(err);
     }
    });
 
 }


const  ListarArticulos = ()  =>{
  
    const cod_sociedad = localStorage['cod_sociedad'];
    const url = 'http://192.168.0.22:81/api/articulo/' + cod_sociedad + '';

    $.ajax({
        headers: {  'Accept': 'application/json','Content-Type': 'application/json' },
        url: url,
        type: "GET",
        success: function(res) {
            var HTML = '';
            $.each(res, function (i, data) {

                var ASIG = JSON.stringify(data.art_estado);

                if (ASIG == '"1"') {
                    HTML +=

                        '' +
                    '<tr>' +
                    '   <td class="text-center pt-3" style="font-size:13px" >' + data.cod_articulo + '</td>' +
                        '   <td class="text-center pt-3 " style="font-size:13px" >' + data.cod_sociedad + '</td>' +
                        '   <td class="text-center pt-3 " style="font-size:13px">' + data.cod_cuenta + '</td>' +
                        '   <th class="text-center pt-3" style="font-size:13px; font-weight: normal;" >' + data.art_nombre + '</th>' +
                    '   <td class="text-center" ><button type="button" style="text-decoration:none; font-size:12px" class="btn text-info font-weight-bold" data-toggle="modal" data-target="#ModalModificarArticulo' + data.cod_articulo + '"><img src="http://localhost:5001/img/actualizar.png" height="13px" alt="Boton Abrir" /></button>' +

                        '   <div class="modal fade" id="ModalModificarArticulo' + data.cod_articulo + '" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">' +
                        '     <div class="modal-dialog" role="document">' +

                        '       <div class="modal-content">' +

                        '         <div class="modal-header">' +

                        '            <h5 class="modal-title" id="exampleModalLabel">Modificar Articulos</h5>' +

                        '            <button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
                        '              <span aria-hidden="true">&times;</span>' +
                        '            </button>' +

                        '         </div>' +

                    '         <div class="modal-body text-left">' +
                    '    <span class="text-dark">Modificacion de articulos.<span  class="text-danger  pl-3 " style="font-weight: 500; font-size:14px;">* Campos Obligatorios</span></span>' +
                        '            <form class="form-signin mt-3" onsubmit="ModificarArticulo(event,\'' + data.cod_articulo + '\')">' +
                        '               <div class="form-group">' +

                        '                </div>' +
                        '                <div class="form-group">' +
                    '                    <label  class="text-dark text-left " style="font-weight: 500;">Codigo Articulo <span class="text-danger"> * </span> </label>' +
                    '                   <input value="' + data.cod_cuenta + '"  id="txt_codigo_cuenta" class="form-control mt-2 form-control-sm rounded-0 " type="text" placeholder="" disabled>' +
                        '                </div>' +
                        '                <div class="form-group mt-3">' +
                    '                     <label  class="text-dark text-left " style="font-weight: 500;">Nombre articulo <span class="text-danger"> * </span> </label>' +
                    '                   <input value="' + data.art_nombre + '"  id="txt_nombre_articulo' + data.cod_articulo + '" class="form-control form-control-sm rounded-0 mt-2" type="text" placeholder="">' +
                        '                </div>' +

                    '    <div class="row "> ' +
                    ' ' +
                    '        <div class="mt-1 pb-2"> ' +
                    '            <button type="submit" style="background:#5fb8d1; border-color:#5abeda ;" ' +
                    '                class="btn rounded-0 btn-primary btn-sm shadow font-weight-bold mt-3 float-right">Modificar Articulo</button> ' +
                    '        </div> ' +
                    ' ' +
                    '    </div> ' +
                        '           </form>' +
                        '  </div>' +
                        '</div>' +

                        '</td>' +
                        '   <td class="text-center" ><button type="submit" onclick="DesactivarArticulo(\'' + data.cod_articulo + '\')"; style="background-color:none;" class=" btn text-danger font-weight-bold ">X</button> </td>' +
                        '</tr>' +
                        '';

                } else {


                    HTML +=

                        '' +
                    '<tr>' +
                    '   <td  class="text-center pt-3" style="font-size:13px" >' + data.cod_articulo + '</td>' +
                        '   <td class="text-center pt-3" style="font-size:13px";>' + data.cod_sociedad + '</td>' +
                        '   <td class="text-center pt-3" style="font-size:13px"; >' + data.cod_cuenta + '</td>' +
                    '   <td class="text-center pt-3" style="font-weight: normal; font-size:13px">' + data.art_nombre + '</td>' +
                    '   <td class="text-center pt-3 text-secondary" style="font-weight: normal; font-size:13px">Desactivado</th>' +
                    '   <td class="text-center"  ><button type="submit" onclick="ActivarArticulo(\'' + data.cod_articulo + '\')"; style="background-color:none; font-size:13px; " class=" btn text-info font-weight-bold "><img src="http://localhost:5001/img/tick.png" height="17px" alt="Boton Abrir" /></button> </td>' +
                        '</tr>' +
                        '';

                }

          

            });
            $('#TablaListarArticulos').append(HTML);
          },
         error: function(err) {  
      
         console.log(err);
      }
    });
 
}






const DesactivarArticulo = (COD_ARTICULO) => {

    swalWithBootstrapButtons.fire({
        title: 'Esta seguro que desea desactivar este articulo?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Desactivar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true

    }).then((result) => {

        if (result.isConfirmed) {
            const url = 'http://192.168.0.22:81/api/articulo/art_estado/0/' + COD_ARTICULO + '';
            $.ajax({
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                url: url,
                type: "PUT",
                success: function (res) {

                    location.reload();
                },
                error: function (err) {

                    console.log(err);
                }
            });
        }
    })


}

const ActivarArticulo = (COD_ARTICULO) => {

    const url = 'http://192.168.0.22:81/api/articulo/art_estado/1/'+COD_ARTICULO+'';
    $.ajax({
        headers: {  'Accept': 'application/json','Content-Type': 'application/json' },
        url: url,
        type: "PUT",
        success: function(res) {
   
          location.reload();
          },
         error: function(err) {  
    
         console.log(err);
      }
      });
}


const ListarComboBox = () => {

    const cod_sociedad = localStorage['cod_sociedad'];

    const url = 'http://192.168.0.22:81/api/plancuenta/'+cod_sociedad+'';

    $.ajax({
        url: url,
        type: "GET",
        dataType: 'json',
        success: function (res) {

            $.each(res, function (i, item) {
                $("#myselect").append('<option " value="'+item.cod_plan_de_cuenta+'"> <span class="text-info">' + item.pdc_nombre + ' </span>   </option>');
            });

        },
        error: function (error) {
            alert(error);
            console.log(error)
        }
    });
}