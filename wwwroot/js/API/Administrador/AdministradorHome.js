$(document).ready(function () {

   

    const cod_usuario = localStorage['cod_usuario'];
    const cod_sociedad = localStorage['cod_sociedad'];
    const nombre_perfil = localStorage['nombre_perfil'];
    KPIADMIN(cod_usuario,cod_sociedad);




    if (cod_usuario) {

        if (cod_sociedad) {

            if (nombre_perfil == 'ADMINISTRADOR') {
                const cod_empresa = 1
                const url = 'http://192.168.0.22:81/api/usuario/cod_usuario/' + cod_usuario + '/' + cod_empresa + '';
                ListarDatos(url);
              
                Pintar();
                PintarDatosSociedad();
                PintarLogo();
                ListarModulosSociedadesx(cod_usuario);
                EsJefe(cod_usuario);
            } else {

            
                alert("No puede acceder a este perfil");
                location.href = "http://localhost:5001/login/dashboard";

            }


            const cod_empresa = 1
            const url = 'http://192.168.0.22:81/api/usuario/cod_usuario/' + cod_usuario + '/' + cod_empresa + '';
            ListarDatos(url);
            Pintar();


        } else {
            alert("Seleccione sociedad");
            location.href = "http://localhost:5001/login/dashboard";
        }

    } else {
    
        location.href = "http://localhost:5001/";
    }

});



const EsJefe = (cod_usuario) => {

    const cod_sociedad = localStorage['cod_sociedad'];
    const url = `http://192.168.0.22:81/api/usuario/query/jefe/${cod_usuario}/${cod_sociedad}`;

    $.ajax({
        url: url,
        type: "GET",
        dataType: 'json',
        success: function (res) {
            const x = res[0].respuesta.toString();

            if (x == "0") {
                
                $("#" + $.escapeSelector('/Administrador/AprobacionJefe') + "").css({
                    "display": "none",

                });

                $("#" + $.escapeSelector('/Administrador/AprobacionJefeRendicion') + "").css({
                    "display": "none",

                });
            }

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

const ListarModulosSociedadesx = (COD_USUARIO) => {

    const cod_sociedad = localStorage['cod_sociedad'];
    const cod_empresa = '1';

    $("#contenedor" + COD_USUARIO + " div").remove();

    const url = `http://192.168.0.22:81/api/modulo/admnistradores/${COD_USUARIO}/${cod_sociedad}`;
    $.ajax({
        url: url,
        type: "GET",
        dataType: 'json',
        success: function (response) {
            var HTML = '';
            $.each(response, function (i, item) {

                var ASIG = JSON.stringify(item.mod_asignacion);
  
                if (ASIG == '"NO ASIGNADO"') {


                    const url = "/Administrador/" + item.mod_nombre.toString() + "";

                    $("#" + $.escapeSelector(url)+"").css({
                        "display": "none"
                    });
                  
                } 
            });
            $("#contenedor" + COD_USUARIO + "").append(HTML);
        }
    });

}

const Pintar = () => {

    var pathname = window.location.pathname;
    var getURL = pathname.toString();


      $("#"+$.escapeSelector(getURL)).css({
            "border-right": "4px solid #0abbec",
            "background-color": "rgb(235, 243, 250)"
        });
}

const PintarDatosSociedad = () => {
    const cod_sociedad = localStorage['cod_sociedad'];

    const url = 'http://192.168.0.22:81/api/sociedad/'+cod_sociedad+'';

    $.ajax({
        url: url,
        type: "GET",
        dataType: 'json',
        success: function (res) {
            const nombres = res.soc_nombre;
            $("#nombreSociedad").text(nombres);
            $("#Is_NombreSociedad").val(nombres);
        },
        error: function (error) {
            alert(error);
            console.log(error)
        }
    });
}

const ListarDatos = (url) => {

    $.ajax({
        url: url,
        type: "GET",
        dataType: 'json',
        success: function (res) {
      
            const nombres = res[0].usu_nombre + ' ' + res[0].usu_apellido;
            $("#nombres").text(nombres);
        },
        error: function (error) {
            alert(error);
            console.log(error)
        }
    });
}

const PintarLogo = () => {



 const cod_sociedad = localStorage['cod_sociedad'];



    const url = 'http://192.168.0.22:81/api/logosociedad/'+cod_sociedad+'';

    $.ajax({
        url: url,
        type: "GET",
        dataType: 'json',
        success: function (res) {

            try {
                const url_foto = res[0].url_foto;
                const final_foto = 'http://192.168.0.22:81/img/' + url_foto + '';
                $("#logo_sociedad").attr("src", final_foto);
            } catch (e) {
                $("#logo_sociedad").attr("src", "http://localhost:5001/img/logo.png");
                $("#logo_sociedad").attr("height", "32px");
                $("#logo_sociedad").attr("class", "ml-4");

            }

        },
        error: function (error) {
            alert(error);
            console.log(error)
        }
    });

}

const  KPIADMIN = (COD_U,COD_S) => {

    $.ajax({
        url:`http://192.168.0.22:81/api/usuario/EstadisticasUsuario_2/${COD_U}/${COD_S}`,
        type: "GET",
        dataType: 'json',
        success: function (res) {
     
            var total = parseInt(res[0].total)
            var rechazados = parseInt(res[0].rechazados)
            var contable = parseInt(res[0].contable)
            var aceptado = parseInt(res[0].aceptado)
            var proceso = parseInt(res[0].proceso)
          
            $('#FTOTAL').text(total);
            $('#FEN').text(proceso);


            Highcharts.chart('container', {
                chart: {
                    type: 'variablepie'
                },
                title: {
                    text: 'Grafico'
                },
                tooltip: {
                    headerFormat: '',
                    pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
                        '</b><br/>' +
                        'Total: <b>{point.z}</b><br/>'
                },
                series: [{
                    minPointSize: 10,
                    innerSize: '20%',
                    zMin: 0,
                    name: 'countries',
                    data: [ {
                        name: 'rechazados',
                        y: rechazados,
                        z: rechazados
                    }, {
                        name: 'En revisión contable',
                        y: contable,
                        z: contable
                    }, {
                        name: 'Aceptado',
                        y: aceptado,
                        z: aceptado
                    }, {
                        name: 'En proceso de aprobación',
                        y: proceso,
                        z: proceso
                    }]
                }]
            });
        },
        error: function (err) {
           
            console.log(error)
        }
    });


    $.ajax({
        url:`http://192.168.0.22:81/api/usuario/EstadisticasUsuario/${COD_U}/${COD_S}`,
        type: "GET",
        dataType: 'json',
        success: function (res) {
     
            var total = parseInt(res[0].total)
            var rechazados = parseInt(res[0].rechazados)
            var contable = parseInt(res[0].contable)
            var aceptado = parseInt(res[0].aceptado)
            var proceso = parseInt(res[0].proceso)
          
            $('#RTOTAL').text(total);
            $('#REN').text(proceso);


            Highcharts.chart('container2', {
                chart: {
                    type: 'variablepie'
                },
                title: {
                    text: 'Grafico'
                },
                tooltip: {
                    headerFormat: '',
                    pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
                        '</b><br/>' +
                        'Total: <b>{point.z}</b><br/>'
                },
                series: [{
                    minPointSize: 10,
                    innerSize: '20%',
                    zMin: 0,
                    name: 'countries',
                    data: [ {
                        name: 'rechazados',
                        y: rechazados,
                        z: rechazados
                    }, {
                        name: 'En revisión contable',
                        y: contable,
                        z: contable
                    }, {
                        name: 'Aceptado',
                        y: aceptado,
                        z: aceptado
                    }, {
                        name: 'En proceso de aprobación',
                        y: proceso,
                        z: proceso
                    }]
                }]
            });
        },
        error: function (err) {
           
            console.log(error)
        }
    });


    const cod_sociedad = localStorage['cod_sociedad'];

    $("#TablaRendicion tbody tr").remove();
    const url2 = `http://192.168.0.22:81/api/procesoaprobacion/etapa/${cod_sociedad}/2`;
  
    $.ajax({
      url: url2,
      type: "GET",
      dataType: 'json',
      success: function (res) {
    
          var html = '';
          $.each(res, function  (i, x) {
  
            const nombres = ''+x.usu_nombre+' '+x.usu_apellido+'';
  
            html += 
            `<tr>
            <td class="text-center" >${x.etapa_numero}</td>
            
            <td class="text-center" >${nombres}</td>
              </td>
            </tr>`;
  
          });    
          console.log(res);
          $("#TablaRendicion").append(html);
      },
      error: function (error) {
       
          console.log(error)
      }
  
      
    });


    $("#TablaFondo tbody tr").remove();
    const url1 = `http://192.168.0.22:81/api/procesoaprobacion/etapa/${cod_sociedad}/1`;
  
    $.ajax({
      url: url1,
      type: "GET",
      dataType: 'json',
      success: function (res) {
    
          var html = '';
          $.each(res, function  (i, x) {
  
            const nombres = ''+x.usu_nombre+' '+x.usu_apellido+'';
  
            html += 
            `<tr>
     
                <td class="text-center" >${x.etapa_numero}</td>
            
                <td class="text-center" >${nombres}</td>

              </td>
            </tr>`;
  
          });    
          console.log(res);
          $("#TablaFondo").append(html);
      },
      error: function (error) {
       
          console.log(error)
      }
  
      
    });
    
    
    
}