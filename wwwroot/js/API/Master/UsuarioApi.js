$(document).ready(function(){

    ListarUsuariosActivos();

    $("#FiltroUsuario").keyup(function () {
        _this = this;
        $.each($("#TablaListarUsuariosActivos tbody tr"), function () {
            if ($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) === -1)
                $(this).hide();
            else
                $(this).show();
        });
    });

});

const ListarUsuariosActivos = () => {

    const COD_EMPRESA = 1;
    const url = 'http://192.168.0.22:81/api/usuario/cod_empresa/' + COD_EMPRESA + '/' + COD_EMPRESA + '';

    $.ajax({
        url: url,
        type: "GET",
        dataType: 'json',
        success: function (res) {
            var trHTML = '';
            $.each(res, function (i, data) {
                var RUT_INSTRING = JSON.stringify(data.usu_rut);
                var rut = RUT_INSTRING.replace(/['"]+/g, '');
                const RutFormateado = FormatearRut(rut);

                const estado = data.usu_esactivo;

                if (estado.toString() == "1") {
                    trHTML +=
                        '<tr>' +
                        '<td class="text-center" style="font-size: 12px;">' + RutFormateado + '</td>' +
                        '<td class="text-center"  style="font-size: 12px;">' + data.usu_nombre + '</td>' +
                        '<td class="text-center"  style="font-size: 12px;">' + data.usu_apellido + '</td>' +
                        '<td class="text-center"  style="font-size: 12px;"><a type="button" class="text-primary" data-toggle="modal" data-target="#Modal' + data.cod_usuario + '" ><img src="http://localhost:5001/img/actualizar.png" height="15px" alt="Boton Abrir" /></a>' +
                        '<div id="Modal' + data.cod_usuario + '" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">' +
                        '<div class="modal-dialog">' +
                        '  <div class="modal-content">' +
                        '<div class="modal-header text-left">' +
                        ' <h5 class="modal-title">Formulario de modificacion de usuario</h5>' +
                        ' <button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
                        ' <span aria-hidden="true">&times;</span>' +
                        '  </button>' +
                        '    </div>' +
                        '   <div class="modal-body text-left">' +

                        '<form class=" " onsubmit="ModificarUsuario(event,\'' + data.cod_usuario + '\')">' +
                        '      <h6>Modificar al usuario <span class="text-info" >' + data.usu_nombre + ' </span> <span class="text-info" >' + data.usu_apellido + ' </span>  </h6>' +
                        '  <span class="text-dark ">Formulario para modificar de usuarios. <span class="text-danger  pl-3 "style="font-weight: 500; font-size:14px;">* Campos Obligatorios</span> </span>' +
                        '  <div class="row mt-2 ">' +
                        '     <div class="col-12 col-sm-12 col-md-12 col-lg-12 pt-2">' +
                        '        <div class="form-group">' +
                    '           <label for="" class="text-dark " style="font-weight: 500;">Rut <span class="text-danger"> * </span> </label>' +
                    '           <input type="text" value="' + data.usu_rut + '" class="form-control rounded-0 mt-2 form-control-sm" id="IsRut'+data.cod_usuario+'"  placeholder="Ingrese rut del usuario" disabled>' +
                        '        </div>' +
                        '     </div>' +

                    '  </div>' +
                    '  <div class="row  ">' +
                    '     <div class="col-12 col-sm-12 col-md-12 col-lg-12 pt-2">' +
                    '        <div class="form-group">' +
                    '           <label for="" class="text-dark " style="font-weight: 500;">Correo <span class="text-danger"> * </span> </label>' +
                    '           <input type="text" value="' + data.usu_correo + '" id="IsCorreo' + data.cod_usuario+'" class="form-control rounded-0 mt-2 form-control-sm"   placeholder="Ingrese rut del usuario" >' +
                    '        </div>' +
                    '     </div>' +

                    '  </div>' +
                        '  <div class="row  ">' +
                        '     <div class="col-12 col-lg-6 pt-2">' +
                        '        <div class="form-group">' +
                        '           <label for="" class="text-dark " style="font-weight: 500;">Nombre<span class="text-danger"> * ' +
                        '           </span> </label> ' +
                        '           <input value="' + data.usu_nombre + '" placeholder="Ingrese Nombre del usuario" type="text" ' +
                        '              class="form-control rounded-0 mt-2 form-control-sm" id="IsNombreM' + data.cod_usuario + '" required> ' +
                        '        </div> ' +
                        '     </div> ' +
                        '     <div class="col-12 col-lg-6 pt-2">' +
                        '        <div class="form-group">' +
                        '           <label for="" class="text-dark " style="font-weight: 500;">Apellido <span class="text-danger"> * ' +
                        '           </span> </label> <input value="' + data.usu_apellido + '" placeholder="Ingrese nombre del usuario" type="text" class="  form-control rounded-0 mt-2 form-control-sm" id="IsApellidoM' + data.cod_usuario + '" required>' +
                        '        </div>' +
                        '     </div>' +
                        '  </div> ' +
                        '  <div class="row "> ' +
                        '     <div class="col-12 col-lg-6 pt-2"> ' +
                        '        <div class="form-group"> ' +
                        '           <label for="" class="text-dark " style="font-weight: 500;">Direccion<span class="text-danger"> * ' +
                        '           </span> </label> ' +
                        '           <input value="' + data.usu_direccion + '" placeholder="Ingrese direccion del usuario" type="text" ' +
                        '              class="form-control rounded-0 mt-2 form-control-sm" id="IsDireccionM' + data.cod_usuario + '" required> ' +
                        '        </div>' +
                        '     </div> ' +
                        '     <div class="col-12 col-lg-6 pt-2"> ' +
                        '        <div class="form-group"> ' +
                        '           <label for="" class="text-dark " style="font-weight: 500;">Telefono<span class="text-danger"> * ' +
                        '           </span> </label> ' +
                        '           <input value="' + data.usu_telefono + '" placeholder="Ingrese telefono para el usuario" type="number" ' +
                        '              class=" form-control rounded-0 mt-2 form-control-sm border-info" id="IsTelefonoM' + data.cod_usuario + '" required> ' +
                        '        </div> ' +
                        '     </div> ' +
                        '  </div> ' +
                        '  <div class="row "> ' +
                        '     <div class="mt-1 pb-2"> ' +
                        '        <button type="submit" style="background:#5fb8d1; border-color:#5abeda ;" ' +
                        '           class="btn rounded-0 btn-primary btn-sm shadow font-weight-bold mt-3 float-right">Modificar usuario</button>' +
                        '     </div>' +
                        '  </div>' +
                        '</form>' +
                        '      </div>' +
                        '  </div>' +
                        '</div>' +
                        '</ div>' +
                        '</td>' +
                        '<td class="text-center"  style="font-size: 12px;"> <button style="border:none;background: none; " class="text-danger font-weight-bold" onclick="DesactivarUsuario(\'' + data.cod_usuario + '\')" >X</button></td>' +
                        '</tr>';
                } else {
                    trHTML +=
                        '<tr>' +
                        '<td class="text-center" style="font-size: 12px;">' + RutFormateado + '</td>' +
                        '<td class="text-center" style="font-size: 12px;">' + data.usu_nombre + '</td>' +
                    '<td class="text-center" style="font-size: 12px;">' + data.usu_apellido + '</td>' +
                    '<td class="text-center text-secondary" style="font-size: 12px;">Desactivada</td>' +
                    '<td class="text-center" style="font-size: 12px;"> <button style="border:none;background: none;"  onclick="ActivarUsuario(\'' + data.cod_usuario + '\')"  class="font-weight-bold text-primary" ><img src="http://localhost:5001/img/tick.png" height="17px" alt="Boton Abrir" /> </button></td>' +
                        '</tr>';
                }

               
           });
           $('#TablaListarUsuariosActivos').append(trHTML);
        },
        error: function (error){
            alert(error);
            console.log(res)
        }
    });
}

const ActivarUsuario = (ID) => {
    url = 'http://192.168.0.22:81/api/usuario/estado/'+ID+'/1';
  $.ajax({
    url:url,
    type: "PUT",
    dataType: 'json',
    success: function (res) {
        location.reload();
    },
    error: function(error){
        location.reload();
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

const DesactivarUsuario = (ID) => {


    var Mitexto = '¿Está seguro que desea desactivar este usuario?';

    swalWithBootstrapButtons.fire({
        title: Mitexto,
        text: "Desactivar el usuario causara la denegación al acceso al sistema.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Desactivar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true

    }).then((result) => {

        if (result.isConfirmed) {
            url = 'http://192.168.0.22:81/api/usuario/estado/' + ID + '/0';
            $.ajax({
                url: url,
                type: "PUT",
                dataType: 'json',
                success: function (res) {
                    location.reload();
                },
                error: function (error) {
                    location.reload();
                }
            }); 
        }
    })




}

const GuardarUsuario = (event) => {  
   event.preventDefault();
    url = 'http://192.168.0.22:81/api/usuario/';

   const rut = $('#IsRut').val();
   const correo = $('#IsCorreo').val();
   const nombre = $('#IsNombre').val();
   const apellido = $('#IsApellido').val();
   const telefono = $('#IsTelefono').val();
   const direccion = $('#IsDireccion').val();
   const contrasenia = $('#IsPass').val();
   const esactivo = 1 ;
   const COD_EMPRESA = 1;

   data = '{'+
   '"usu_rut": "'+rut+'", '+
   '"usu_correo": "'+correo+'",  '+
   '"usu_nombre": "'+nombre+'",  '+
   '"usu_apellido": "'+apellido+'",  '+
   '"usu_telefono": '+telefono+',  '+
   '"usu_direccion": "'+direccion+'",  '+
   '"usu_contrasenia": "'+contrasenia+'",  '+
   '"usu_esactivo": '+esactivo+', '+
   '"cod_empresa": '+COD_EMPRESA+' '+
   '}' ;


   $.ajax({
    headers: {  'Accept': 'application/json','Content-Type': 'application/json' },
    type: "POST",
    url: url,
    data: data,
    success: function(res) {
        Swal.fire({
            icon: 'success',
            title: 'Usuario registrado.',
            showConfirmButton: false,
            timer: 1500
        })

        setTimeout(function () { location.reload() }, 1500);

    },
    error: function(data) {  
        console.log(data)
        var myJSON = JSON.stringify(data.responseJSON);

        console.log(myJSON);

        if(myJSON == '"Rut ya registrado"' ){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Rut ya registrado!'
            })
        } 
        if(myJSON == '"Correo ya registrado"' ){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Correo ya registrado!'
            })
        } 
        if(data.responseJSON.errors.usu_direccion != null){
            alert('Error direccion : ' + data.responseJSON.errors.usu_direccion);
        };
        if(data.responseJSON.errors.usu_contrasenia != null){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Contraseña inválida!'
            })
        };
        if(data.responseJSON.errors.usu_rut != null){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Rut incorrecto!'
            })
        };
        if(data.responseJSON.errors.usu_nombre != null){
            alert('Error nombre : ' + data.responseJSON.errors.usu_nombre);
        };
        if(data.responseJSON.errors.usu_apellido != null){
            alert('Error apellido : ' + data.responseJSON.errors.usu_apellido);
        };
        
    }
   });
}


const ModificarUsuario = (event,COD) => {  

    event.preventDefault();

    url = 'http://192.168.0.22:81/api/usuario/actualizar/'+COD+'';


    const nombre = $('#IsNombreM'+COD+'').val();
    const apellido = $('#IsApellidoM'+COD+'').val();
    const telefono = $('#IsTelefonoM'+COD+'').val();
    const direccion = $('#IsDireccionM'+COD+'').val();
    const correo = $('#IsCorreo' + COD + '').val();
    const rut = $('#IsRut' + COD + '').val();
 
    var data = [{
        usu_nombre: nombre,
        usu_apellido: apellido,
        usu_correo: correo,
        usu_rut: rut,
        usu_telefono: telefono,
        usu_direccion: direccion
    }]


    var json = JSON.stringify(data);
 

   $.ajax({
    headers: {  'Accept': 'application/json','Content-Type': 'application/json' },
    type: "PUT",
    url: url,
    data: json,
       success: function (res) {

        Swal.fire({
            icon: 'success',
            title: 'Usuario modificado.',
            showConfirmButton: false,
            timer: 1500
        })

        setTimeout(function () { location.reload() }, 1500);
  
    },
    error: function(err) {  
      
        console.log(err);
      
        
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