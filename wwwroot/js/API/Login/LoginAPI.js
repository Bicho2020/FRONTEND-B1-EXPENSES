const POST_LOGIN = (event) => {
    event.preventDefault();
    const correo = $('#txt_correo').val();
    const pass = $('#txt_pass').val();

    const url = 'http://192.168.0.22:81/api/usuario/login';

    json = '{"usu_correo": "' + correo + '", "usu_contrasenia":"' + pass + '"}'

    $.ajax({

        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        type: "POST",
        url: url,
        data: json,
        success: function (res) {
    
            try {
                if (res[0].perf) {
                localStorage['cod_usuario'] = res[0].cod_usuario;
                localStorage['cod_sociedad'] = 0;
                localStorage['nombre_perfil'] = 'MASTER';
                location.href = "http://localhost:5001/master/Home";
            }
            } catch{
                localStorage['cod_usuario'] = res;
                location.href = "http://localhost:5001/login/dashboard";
            } 
      

        },
        error: function (error) {

            var myJSON = JSON.stringify(error.responseJSON);

            if (myJSON == '"Credenciales incorrectas"') {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Credenciales incorrectas!',
                    showConfirmButton: false,
                    timer: 1500
                })
                $("#txt_correo").css({
                    "border": "1px solid red"
                });
                $("#txt_pass").css({
                    "border": "1px solid red"
                });
            }

            if (myJSON == '"No tiene Licencia Asignada"') {
                alert('No tiene una icencia Asignada , hable con el administrador.');
            }

            if (myJSON == '"No tienes sociedad asignada"') {
                alert('No tienes una sociedad asignada , hable con el administrador.');
            }

            if (error.responseJSON.errors.usu_correo != null) {
                $("#txt_correo").css({
                    "border": "1px solid red"
                });
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Credenciales incorrectas!',
                    showConfirmButton: false,
                    timer: 1500
                })
            }

            if (error.responseJSON.errors.usu_contrasenia != null) {
                $("#txt_pass").css({
                    "border": "1px solid red"
                });
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Credenciales incorrectas!',
                    showConfirmButton: false,
                    timer: 1500
                })

            }

            console.log(error);

        }
    });

    event.preventDefault();

}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const enviar = (event) => {
    event.preventDefault();
 

     const correo = $('#txt_correo_2').val();

    Math.random()
    const COD = getRandomInt(10000000, 99999999);

    localStorage['COD'] = COD;

        $.ajax({

            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            type: "POST",
            url: `http://192.168.0.22:81/api/correo/${correo}/${COD}`,
    
            success: function (res) {
                localStorage['TEMP_CORREO'] = correo;
                Swal.fire({
                    icon: 'success',
                    text: 'Correo enviado',
                    showConfirmButton: false,
                    timer: 1500
                });

            },
            error: function (error) {

                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Correo no registrado!',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        });
   
}


const VerificarCOD = () => {

    if (localStorage['COD']) {
        const MYCODE = $('#txt_cod').val();
        if (MYCODE == localStorage['COD']) {
            var correoTemp = ['TEMP_CORREO'];
            $.ajax({

                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                type: "POST",
                url: `http://192.168.0.22:81/api/correo/actualizar/${correoTemp}`,

                success: function (res) {

                    Swal.fire({
                        icon: 'success',
                        text: 'Su contrasena temporal es : 12345678'
                    })



                },
                error: function (error) {

                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Error al validar codigo!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            });

          
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Codigo invalido!',
                showConfirmButton: false,
                timer: 1500
            })
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Aun no se ha enviado ningun codigo!',
            showConfirmButton: false,
            timer: 1500
        })
    }

}