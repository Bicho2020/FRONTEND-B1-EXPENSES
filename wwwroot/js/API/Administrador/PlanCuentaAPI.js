
$(document).ready(function(){
    ListarCuentasActivadas();

    $("#FiltroPDC").keyup(function () {
        _this = this;
        $.each($("#TablaListarCuentas tbody tr"), function () {
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


const AgregarPlanCuenta = (event) => {

    event.preventDefault();

    url = 'http://192.168.0.22:81/api/plancuenta';

    //leer datos desde el formulario
    const  cod_plan = $('#cod_plan').val();
    const nombre = $('#pdc_nombre').val();
    const cod_sociedad = localStorage['cod_sociedad'];
    const estado = 1;

    var data = {
        cod_plan_de_cuenta: cod_plan,
        pdc_nombre: nombre,
        cod_sociedad: cod_sociedad,
        pdc_estado: estado
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
                title: 'Plan de cuenta agregado con exito.',
                showConfirmButton: false,
                timer: 1500
            });

            setTimeout(function () { location.reload() }, 1500);

        },
        error: function (data) {
            var myJSON = JSON.stringify(data.responseJSON);
            console.log(myJSON);
            alert("Error al agregar plan de cuenta , verifique que el codigo ya no este registrado");
        }
    });
}

const  ListarCuentasActivadas = ()  =>{

    const cod_sociedad = localStorage['cod_sociedad'];

    const url = 'http://192.168.0.22:81/api/plancuenta/'+cod_sociedad+'';

    $.ajax({
        headers: {  'Accept': 'application/json','Content-Type': 'application/json' },
        url: url,
        type: "GET",
        success: function(res) {
            var HTML = '';
            $.each(res, function (i, data) {

                var ASIG = JSON.stringify(data.pdc_estado);

                if (ASIG == '"1"') {

                    HTML +=

                        '' +
                        '<tr>' +
                        '   <td class="text-center pt-3 "  style="font-size:13px;" >' + data.cod_plan_de_cuenta + '</td>' +
                        '   <td class="text-center pt-3 "  style="font-size:13px;" >' + data.cod_sociedad + '</td>' +
                        '   <td class="text-center pt-3 "  style="font-size:13px; font-weight:400;" > ' + data.pdc_nombre + '</td>' +
                    '   <td class="text-center pt-2"  ><button type="button" style="text-decoration:none; font-size:12px;" class="btn text-info " data-toggle="modal" data-target="#ModalModificarCC' + data.cod_plan_de_cuenta + '"><img src="http://localhost:5001/img/actualizar.png" height="13px" alt="Boton Abrir" /></button>' +
                        '   <div class="modal fade" id="ModalModificarCC' + data.cod_plan_de_cuenta + '" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">' +
                        '     <div class="modal-dialog" role="document">' +

                        '       <div class="modal-content">' +

                        '         <div class="modal-header">' +

                        '            <h5 class="modal-title" id="exampleModalLabel">Modificar articulo</h5>' +

                        '            <button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
                        '              <span aria-hidden="true">&times;</span>' +
                        '            </button>' +

                        '         </div>' +

                        '         <div class="modal-body text-left">' +
                    '            <form class="form-signin" onsubmit="ModificarPlandeCuenta(event,\'' + data.cod_plan_de_cuenta + '\')">' +
                    '    <span class="text-dark">Modificacion de plan de cuenta.<span  class="text-danger  pl-3 " style="font-weight: 500; font-size:14px;">* Campos Obligatorios</span></span>' +
                        '               <div class="form-group mt-3">' +

                        '                </div>' +
                        '                <div class="form-group">' +
                    '                <label  class="text-dark " style="font-weight: 500;">Nombre centro de costo<span class="text-danger mt-3"> * </span> </label> ' +
                    '                   <input value="' + data.pdc_nombre + '"  id="txt_nombre_plandecuenta' + data.cod_plan_de_cuenta + '" class="form-control form-control-sm rounded-0 mt-3" type="text" placeholder="">' +
                        '                </div>' +

                    '    <div class="row "> ' +
                    ' ' +
                    '        <div class="mt-1 pb-2"> ' +
                    '            <button type="submit" style="background:#5fb8d1; border-color:#5abeda ;" ' +
                    '                class="btn rounded-0 btn-primary btn-sm shadow font-weight-bold mt-3 float-right">Modificar Plan de cuenta</button> ' +
                    '        </div> ' +
                    ' ' +
                    '    </div> ' +
                        '           </form>' +
                        '  </div>' +
                        '</div>' +
                        '</td>' +
                        '   <td class="text-center" ><button type="submit" onclick="DesactivarPlandeCuenta(\'' + data.cod_plan_de_cuenta + '\')"; style="background-color:none;" class=" btn text-danger font-weight-bold ">X</button> </td>' +
                        '</tr>' +
                        '';
                } else {
                    HTML +=

                        '' +
                        '<tr>' +
                        '   <td class="text-center pt-3 "  style="font-size:13px;">' + data.cod_plan_de_cuenta + '</td>' +
                        '   <td class="text-center pt-3 "  style="font-size:13px;" >' + data.cod_sociedad + '</td>' +
                    '   <td class="text-center pt-3 "  style="font-size:13px; font-weight:400;">' + data.pdc_nombre + '</td>' +
                      '  <td class="text-center pt-3  text-secondary"  style="font-size:13px; font-weight:400;">Desactivado</td>' +
                    '   <td class="text-center"> <button type="submit" onclick="ActivarPlandeCuenta(\'' + data.cod_plan_de_cuenta + '\')"; style="background-color:none; font-size:13px;" class=" btn text-info text-center "><img src="http://localhost:5001/img/tick.png" height="17px" alt="Boton Abrir"/> </button> </td>' +
                        '</tr>' +
                        '';
                }

            });
            $('#TablaListarCuentas').append(HTML);
          },
         error: function(err) {  
         alert("Error al traer los centros de costo");
         console.log(err);
      }
    });
 
}



const DesactivarPlandeCuenta = (cod_plan_de_cuenta) => {


    swalWithBootstrapButtons.fire({
        title: 'Esta seguro que desea desactivar este centro de costo?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Desactivar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true

    }).then((result) => {

        if (result.isConfirmed) {
            const url = 'http://192.168.0.22:81/api/plancuenta/pdc_estado/0/' + cod_plan_de_cuenta + '';
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

  const ActivarPlandeCuenta = (cod_plan_de_cuenta) => {

    const url = 'http://192.168.0.22:81/api/plancuenta/pdc_estado/1/'+cod_plan_de_cuenta+'';
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

  const ModificarPlandeCuenta = (event,cod_plan_de_cuenta)  =>{
    event.preventDefault();
 
    //const cod_sociedad = localStorage['nombre_perfil'];

    const nombre_plandecuenta = $('#txt_nombre_plandecuenta'+cod_plan_de_cuenta+'').val();
    const url = 'http://192.168.0.22:81/api/plancuenta/'+nombre_plandecuenta +'/'+cod_plan_de_cuenta+'';
    $.ajax({
       headers: {  'Accept': 'application/json','Content-Type': 'application/json' },
       url: url,
       type: "PUT",
       success: function(res) {
           Swal.fire({
               icon: 'success',
               title: 'Plan de cuenta modificado con exito.',
               showConfirmButton: false,
               timer: 1500
           });

           setTimeout(function () { location.reload() }, 1500);
         },
        error: function(err) {  
            console.log(err)
        alert("Error al modificar Plan de cuenta");
        console.log(err);
     }
    });
 
 }