$(document).ready(function () {
    localhost: 44359
    const cod_usuario = localStorage['cod_usuario'];

    if (cod_usuario) {
        const cod_empresa = 1
        const url_2 = 'http://192.168.0.22:81/api/usuario/cod_usuario/' + cod_usuario + '/' + cod_empresa + '';
        const url = 'http://192.168.0.22:81/api/perfil/' + cod_usuario + '';
        ListarComboBox(url);
        ListarDatos(url_2);

    } else {

        location.href = "http://localhost:5001/";
    }

});

const ListarDatos = (url) => {

    $.ajax({
        url: url,
        type: "GET",
        dataType: 'json',
        success: function (res) {
            console.log(res);
            const nombres = res[0].usu_nombre + ' ' + res[0].usu_apellido;
            $("#nombres").text(nombres);
        },
        error: function (error) {
            alert(error);
            console.log(error)
        }
    });
}

const Cerrar = () => {
    localStorage.clear();
    location.reload();

}

const ListarComboBox = (url) => {

    $.ajax({
        url: url,
        type: "GET",
        dataType: 'json',
        success: function (res) {

            $.each(res, function (i, item) {
                $("#myselect").append('<option " value=' + item.cod_sociedad + '/' + item.perf_nombre + '> <span class="text-info">' + item.soc_nombre + ' </span> <span class="text-warning"> (' + item.perf_nombre + ') </span>   </option>');
            });

        },
        error: function (error) {
            alert(error);
            console.log(error)
        }
    });
}


const SociedadSeleccionada = (event) => {

    event.preventDefault();
    const nombre = $('select[id=myselect] option').filter(':selected').val();

    if (nombre == 'Seleccione sociedad') {

        alert('Seleccione sociedad')

    } else {

        var f = nombre.split('/');
        var cod_sociedad = f[0];
        var nombre_perfil = f[1];


        if (nombre_perfil == 'ADMINISTRADOR') {
            localStorage['cod_sociedad'] = cod_sociedad;
            localStorage['nombre_perfil'] = nombre_perfil;
            location.href = "http://localhost:5001/administrador/Home";
        }

        if (nombre_perfil == 'USUARIO') {
            localStorage['cod_sociedad'] = cod_sociedad;
            localStorage['nombre_perfil'] = nombre_perfil;
            location.href = "http://localhost:5001/Usuario/Home";
        }

        if (nombre_perfil == 'AUTORIZADOR') {
            localStorage['cod_sociedad'] = cod_sociedad;
            localStorage['nombre_perfil'] = nombre_perfil;
            location.href = "http://localhost:5001/Autorizador/Home";
        }

        if (nombre_perfil == 'MASTER') {
            localStorage['cod_sociedad'] = cod_sociedad;
            localStorage['nombre_perfil'] = nombre_perfil;
            location.href = "http://localhost:5001/master/home";
        }

        if (nombre_perfil == 'NO') {

            Swal.fire({
                icon: 'info',
                title: 'Sin perfil en esta sociedad.',
                showConfirmButton: false,
                timer: 1500
            })

        }

    }

}
