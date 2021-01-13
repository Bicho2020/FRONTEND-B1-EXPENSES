$(document).ready(function () {
  
    COD_USUARIO = localStorage['cod_usuario'];
 
    const URL = `http://192.168.0.22:81/api/usuario/datos/${COD_USUARIO}`;


    $.ajax({

        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        type: "GET",
        url: URL,
        success: function (res) {

            var RUT_INSTRING = JSON.stringify(res[0].usu_rut);
            var rut = RUT_INSTRING.replace(/['"]+/g, '');
            const RutFormateado = FormatearRut(rut);

            const rutF = RutFormateado;
            const nombre = res[0].usu_nombre;
            const apellido = res[0].usu_apellido;
            const telefono = res[0].usu_telefono;
            const direccion = res[0].usu_direccion;
            const correo = res[0].usu_correo;

            $('#rut').text(rutF);
            $('#nombre').text(nombre);
            $('#apellido').text(apellido);
            $('#telefono').text(telefono);
            $('#direccion').text(direccion);
            $('#correo').text(correo);

        }
    });

});

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


const ModificarContra = (event) => {

    event.preventDefault()

    var pass = $('#txt_pass').val();
    var pass2 = $('#txt_pass_2').val();

    if (pass == pass2) {

        $.ajax({

            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            type: "PUT",
            url: `http://192.168.0.22:81/api/usuario/cambiarContrasenia/${pass}/${COD_USUARIO}`,
            success: function (res) {

                Swal.fire({
                    icon: 'success',
       
                    text: 'Contraseña cambiada con exito',
                    showConfirmButton: false,
                    timer: 1500
                })
                setTimeout(function () { location.reload() }, 1500);
            },
            error: function () {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Error al cambiar contraseña',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        });

    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Las contraseña no coinciden.',
            showConfirmButton: false,
            timer: 1500
        })
    }
   
}

txt_pass