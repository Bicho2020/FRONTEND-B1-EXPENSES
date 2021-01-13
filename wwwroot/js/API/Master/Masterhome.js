$(document).ready(function () {
    
    const cod_usuario = localStorage['cod_usuario'];
    const cod_sociedad = localStorage['cod_sociedad'];
    const nombre_perfil = localStorage['nombre_perfil'];

    if (cod_usuario) {

        if (cod_sociedad) {
            if (nombre_perfil == 'MASTER') {
                const cod_empresa = 1
                const url = 'http://192.168.0.22:81/api/usuario/cod_usuario/' + cod_usuario + '/' + cod_empresa + '';
                ListarDatos(url);
                Pintar();

            } else {
                alert(nombre_perfil);
                location.href = "http://localhost:5001/login/dashboard";
            }
         
        } else {
            alert("Seleccione sociedad");
            location.href = "http://localhost:5001/login/dashboard";
        }

    } else {
       
        location.href = "http://localhost:5001/";
    }

    //char();

 
});


const char = () => {

    const COD_EMPRESA = 1;


    $.ajax({
        url: `http://192.168.0.22:81/api/usuario/EstadisticaMaster/${COD_EMPRESA}`,
        type: "GET",
        dataType: 'json',
        success: function (res) {
           $('#TotalLicencias').text(res.total_licencia);
           $('#TotalSinLicencias').text(res.sin_licencia);
           $('#TotalUsuario').text(res.usuarios);
           $('#TotalSociedades').text(res.sociedades);
          
        },
        error: function (error) {
        
            console.log(error)
        }
    });

    $.ajax({
        url: `http://192.168.0.22:81/api/usuario/MASTER_ARTICULOS_FONDOS/${COD_EMPRESA}`,
        type: "GET",
        dataType: 'json',
        success: function (res) {
            var dataM = []

            $.each(res, function (i, item) {

                var obj = {
                    name:item.producto,
                    y: parseInt(item.total),
                    sliced: true,
                    selected: true
                }
                dataM.push(obj)
            });

            Highcharts.chart('TOP10FONDOS', {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: 'Articulos mas solicitados (Fondos)'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                accessibility: {
                    point: {
                        valueSuffix: '%'
                    }
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true
                    }
                },
                series: [{
                    name: 'Brands',
                    colorByPoint: true,
                    data : dataM
                }]
            });    
        },
        error: function (error) {
            alert(error);
            console.log(error)
        }
    });

    $.ajax({
        url: `http://192.168.0.22:81/api/usuario/MASTER_ARTICULOS_RENDICION/${COD_EMPRESA}`,
        type: "GET",
        dataType: 'json',
        success: function (res) {
            var dataM = []

            $.each(res, function (i, item) {

                var obj = {
                    name:item.producto,
                    y: parseInt(item.total),
                    sliced: true,
                    selected: true
                }
                dataM.push(obj)
            });

            Highcharts.chart('TOP10RENDICION', {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: 'Articulos mas solicitados (Rendición)'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                accessibility: {
                    point: {
                        valueSuffix: '%'
                    }
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true
                    }
                },
                series: [{
                    name: 'Brands',
                    colorByPoint: true,
                    data : dataM
                }]
            });    
        },
        error: function (error) {
            alert(error);
            console.log(error)
        }
    });


    $.ajax({
        url: `http://192.168.0.22:81/api/usuario/MASTER_MES_FONDO/${COD_EMPRESA}`,
        type: "GET",
        dataType: 'json',
        success: function (res) {
           
            var chart = Highcharts.chart('TOTALSOLICITUDESMESFONDOS', {

                title: {
                    text: 'Fondos solicitados por mes'
                },
        
                subtitle: {
                    text: 'Plain'
                },
        
                xAxis: {
                    categories: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
                },
        
                series: [{
                    type: 'column',
                    colorByPoint: true,
                    data: [parseInt(res.enero), parseInt(res.febrero),parseInt(res.marzo),parseInt(res.abril),parseInt(res.mayo),parseInt(res.junio),parseInt(res.julio),parseInt(res.agosto),parseInt(res.septiembre),
                        parseInt(res.octubre), parseInt(res.noviembre),parseInt(res.diciembre)],
                    showInLegend: false
                }]
        
            });
             
        },
        error: function (error) {
            alert(error);
            console.log(error)
        }
    });

    $.ajax({
        url: `http://192.168.0.22:81/api/usuario/MASTER_MES_RENDICION/${COD_EMPRESA}`,
        type: "GET",
        dataType: 'json',
        success: function (res) {
           
            var chart = Highcharts.chart('TOTALSOLICITUDESMESRENDICION', {

                title: {
                    text: 'Fondos solicitados por mes'
                },
        
                subtitle: {
                    text: 'Plain'
                },
        
                xAxis: {
                    categories: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
                },
        
                series: [{
                    type: 'column',
                    colorByPoint: true,
                    data: [parseInt(res.enero), parseInt(res.febrero),parseInt(res.marzo),parseInt(res.abril),parseInt(res.mayo),parseInt(res.junio),parseInt(res.julio),parseInt(res.agosto),parseInt(res.septiembre),
                        parseInt(res.octubre), parseInt(res.noviembre),parseInt(res.diciembre)],
                    showInLegend: false
                }]
        
            });
             
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

const Pintar = () => {

    var pathname = window.location.pathname;
    var getURL = pathname.toString();


    $("#" + $.escapeSelector(getURL)).css({
        "border-right": "4px solid #0abbec",
        "background-color": "rgb(235, 243, 250)"
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



