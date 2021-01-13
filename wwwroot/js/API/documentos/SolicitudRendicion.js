const $tableID = $('#table');
const $BTN = $('#export-btn');
const $EXPORT = $('#export');

    const $tr = `<tr>

                <td onclick="getFila();" class="trArticulo" style="font-size:13px;" data-toggle="modal" data-target="#ModelArticulo"></td>  <!-- CODIGO ARTICULO -->

                <td onclick="getFila();" class="trArticulo" style="font-size:13px;" data-toggle="modal" data-target="#ModelArticulo"></td> <!-- NOMBRE ARTICULO -->

                <td onclick="getFila();" class="trArticulo" style="font-size:13px;" data-toggle="modal" data-target="#ModalCentroCosto" hidden></td> <!-- CODIGO CENTRODE COSTO -->

                <td onclick="getFila();" class="trArticulo" style="font-size:13px;" data-toggle="modal" data-target="#ModalCentroCosto"></td>

                <td onclick="getFila();" class="trArticulo" style="font-size:13px;" data-toggle="modal" data-target="#ModalProyecto" hidden></td> <!-- NOMBRE CENTRO DE COSTO ARTICULO -->

                <td onclick="getFila();" class="trArticulo" style="font-size:13px;" data-toggle="modal" data-target="#ModalProyecto"></td> <!-- NOMBRE CENTRO DE COSTO ARTICULO -->

                <td contenteditable="true" hidden></td>

                <td style="font-size:13px;" contenteditable="true"></td>

                <td style="font-size:13px;" oncopy="return false" oncut="return false" onpaste="return false">0</td>

                  <td style="font-size:13px;" id="myeditablediv" oncopy="return false" oncut="return false" onpaste="return false" contenteditable="true"></td>

                <td data-toggle="modal" onclick="getFila();" class="trArticulo" data-target="#ModalBoleta" style="font-size:13px;" class="trArticulo" oncopy="return false" oncut="return false" onpaste="return false"></td>


                <td data-toggle="modal" class="trArticulo" onclick="getFila();" style="font-size:13px;" oncopy="return false" oncut="return false" onpaste="return false" hidden></td>

                <td data-toggle="modal" class="trArticulo" data-target="#ModalFoto" onclick="getFila();" style="font-size:13px;" oncopy="return false" oncut="return false" onpaste="return false"></td>


                <td width="30px">
                <span class="table-remove">
                <a onclick="getFila();" class="btn font-weight-bold text-danger btn-sm my-0"><img src="http://localhost:5001/img/eliminar.png" height="16px" alt="Alternate Text" /> </a>
                </span>
                </td>

    </tr>`;


$(document).ready(function () {



        arrayFoto = []

        ListarProyectosDocumento();
        ListarCentrosCostos();
        ListarDatosU();

        ListarComboBoxCentroCosto();

        ListarComboBoxProyectos();

        ListarComboBox();

        verificar2();

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;

        $("#Is_FechaCreacion").val(today);


        $("#search").keyup(function () {
            _this = this;

            $.each($("#ListarArticulos tbody tr"), function () {
                if ($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) === -1)
                    $(this).hide();
                else
                    $(this).show();
            });
        });


        $("#search2").keyup(function () {
            _this = this;

            $.each($("#ListarCentroCosto tbody tr"), function () {
                if ($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) === -1)
                    $(this).hide();
                else
                    $(this).show();
            });
        });

        $("#search3").keyup(function () {
            _this = this;

            $.each($("#ListarProyecto tbody tr"), function () {
                if ($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) === -1)
                    $(this).hide();
                else
                    $(this).show();
            });
        });

    const swalWithBootstrapButtons = Swal.mixin({

        customClass: {
            confirmButton: 'btn btn-primary ml-2 border-none  font-weight-bold',
            cancelButton: 'btn btn-light-sm mr-1 border  font-weight-bold ',
            title: 'font-weight-bold',
        },
        buttonsStyling: false

    })


    $("#Is_Proyecto").change(function () { //---------- cuando se cambia el proyecto cambia a las tablas.


        swalWithBootstrapButtons.fire({
            title: '¿Desea actualizar las filas con este proyecto?',
            text: "Esta acción podria cambiar los datos de sus filas actuales.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Modificar todos',
            cancelButtonText: 'No',
            reverseButtons: true

        }).then((result) => {

            if (result.isConfirmed) {
                if (result.isConfirmed) {
                    const v = $("#Is_Proyecto").val();
                    const v2 = $("#Is_Proyecto option:selected").text();

                    $('#thetable tr').each(function (i) {
                        var $tds = $(this).find('td');

                        $tds.eq(4).text(v);
                        $tds.eq(5).text(v2);

                    });

                  
                

                }
            }
        })

      
     

    });


    $("#Is_CentroCosto").change(function () {


        swalWithBootstrapButtons.fire({
            title: '¿Desea actualizar las filas con este centro de costo?',
            text: "Esta acción podria cambiar los datos de sus filas actuales.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Modificar todos',
            cancelButtonText: 'No',
            reverseButtons: true

        }).then((result) => {

           
                    if (result.isConfirmed) {
                        const v = $("#Is_CentroCosto").val();
                        const v2 = $("#Is_CentroCosto option:selected").text();
                        $('#thetable tr').each(function (i) {
                            var $tds = $(this).find('td');

                            $tds.eq(2).text(v);
                            $tds.eq(3).text(v2);

                        });
                    }

                   
                

        })


     });

    MisFondos();



  

    $("#Is_fxr").change(function () {

        swalWithBootstrapButtons.fire({

            title: 'Esta acción modificara la lista actual , desea continuar ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: `Continuar`,
      
            cancelButtonText: 'No',
            reverseButtons: true


        }).then((result) => {

            if (result.isConfirmed) {


                var init = 0;

                $('#thetable tr').each(function (i) {
                if (i > 0) {
                    var customerId = $(this).find("td").eq(9).html();
                    if (customerId.toString() == "") {

                    } else {

                        customerId = customerId.replace(/,/g, "");

                        init = init + parseInt(customerId);
                    }

                }

                });

                init = addCommas(init);
                $('#total').text(init);
   


                const v = $("#Is_fxr").val();

                const url = `http://192.168.0.22:81/api/fondorendirdetalle/${v}/activos`;

                if (v == '0') {

                    $(`#TablaDetalle tr`).remove();

                    $(`#TablaDetalle`).append($tr);

                } else {

                    $(`#TablaDetalle tr`).remove();

                    $.ajax({
                        url: url,
                        type: "GET",
                        dataType: 'json',
                        success: function (response) {

                            var HTML = '';


                            $.each(response, function (i, x) {

                                var montoX = addCommas(x.fxrd_monto);

                                var estado = x.fxrd_estado


                                if (estado == 101) {

                                    HTML +=

                                        `<tr>

                                    <td onclick="getFila();" class="trArticulo" style="font-size:13px;" data-toggle="modal" data-target="#ModelArticulo">${x.cod_producto}</td>

                                    <td onclick="getFila();" class="trArticulo" style="font-size:13px;" data-toggle="modal" data-target="#ModelArticulo">${x.art_producto}</td>

                                    <td onclick="getFila();" class="trArticulo" style="font-size:13px;" data-toggle="modal" data-target="#ModalCentroCosto" hidden >${x.cod_cc}</td>

                                    <td onclick="getFila();" class="trArticulo" style="font-size:13px;" data-toggle="modal" data-target="#ModalCentroCosto">${x.centro_costo}</td>

                                    <td onclick="getFila();" class="trArticulo" style="font-size:13px;" data-toggle="modal" data-target="#ModalProyecto" hidden >${x.cod_proyecto}</td>

                                   <td onclick="getFila();" class="trArticulo" style="font-size:13px;" data-toggle="modal" data-target="#ModalProyecto">${x.proyecto}</td>

                                    <td contenteditable="true" hidden >${x.cod_pdc}</td>

                                    <td style="font-size:13px;" contenteditable="true">${x.fxrd_comentario}</td>

                                    <td style="font-size:13px;"  oncopy="return false" oncut="return false" onpaste="return false" >${montoX}</td>

                                    <td style="font-size:13px;" id="myeditablediv" oncopy="return false" oncut="return false" onpaste="return false" contenteditable="true"></td>

                                    <td data-toggle="modal" onclick="getFila();" class="trArticulo" data-target="#ModalBoleta" style="font-size:13px;" class="trArticulo" oncopy="return false" oncut="return false" onpaste="return false"></td>


                                    <td data-toggle="modal" class="trArticulo" onclick="getFila();" style="font-size:13px;" oncopy="return false" oncut="return false" onpaste="return false" hidden></td>

                                    <td data-toggle="modal" class="trArticulo" data-target="#ModalFoto" onclick="getFila();" style="font-size:13px;" oncopy="return false" oncut="return false" onpaste="return false" ></td>


                                    <td width="30px">
                                        <span class="table-remove">
                                            <a onclick="getFila();" class="btn font-weight-bold text-danger btn-sm my-0"><img src="http://localhost:5001/img/eliminar.png" height="16px" alt="Alternate Text" /></a>
                                        </span>
                                    </td>

                                </tr>`;

                                }
                            });



                            $(`#thetable`).append(HTML);

                        }
                    });
                }
            } else if (result.isDenied) {
                return false;
            }
        })


       
       

    });

});




$(document).on('keypress', '#myeditablediv', function (e) {

        if (isNaN(String.fromCharCode(e.which))) e.preventDefault();  
});

$(document).on('blur', '#myeditablediv', function (e) {

    var data = $(this).text();
    final = addCommas(data);

    $(this).text(final);

    var init = 0;

    $('#thetable tr').each(function (i) {
    if (i > 0) {
        var customerId = $(this).find("td").eq(9).html();
        if (customerId.toString() == "") {

        } else {

            customerId = customerId.replace(/,/g, "");

            init = init + parseInt(customerId);
        }

    }

    });

    init = addCommas(init);
    $('#total').text(init);
   
});


const Boleta = (event) => {
    event.preventDefault();
    numero_boleta = $('#numero_boleta').val();
    tipo_boleta = $('#tipo_boleta').val();

  
    $('#thetable tr').each(function (i) {
        var $tds = $(this).find('td');

        var index = (JSON.stringify(i));

        if (index.toString() == localStorage.getItem('Fila')) {
            $tds.eq(10).text(numero_boleta);
            $tds.eq(11).text(tipo_boleta);
            $('#numero_boleta').val('');
            $('#tipo_boleta').val('');
            $('#ModalBoleta').modal('hide');
        }
    });
}

const MisFondos = () => {

    const cod_sociedad = localStorage['cod_sociedad'];
    const cod_usuario = localStorage['cod_usuario'];
    const url = `http://192.168.0.22:81/api/fondorendir/filtro/${cod_usuario}/${cod_sociedad}/101`;

    $.ajax({

        url: url,
        type: "GET",
        dataType: 'json',
        success: function (res) {
     
            $.each(res, function (i, x) {
            
                $("#Is_fxr").append('<option value="' + x.cod_fondo_por_rendir +'" >' + x.cod_fondo_por_rendir +'</option>');
            });

        },
        error: function (error) {
            alert(error);
            console.log(error)
        }
    });

}


const verificar2 = () => {
    localStorage['vali_p'] = 0;
    localStorage['vali_cc'] = 0;

    const cod_sociedad = localStorage['cod_sociedad'];
    const url = 'http://192.168.0.22:81/api/permisodocumento/' + cod_sociedad + '';

    $.ajax({

        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        url: url,
        type: "GET",
        success: function (res) {

            $.each(res, function (i, item) {

                var desc = item.pD_DESCRIPCION;
                var doc = item.tipO_DOC;

                $("#" + $.escapeSelector(doc + desc)).text(' *');

                if (desc.toString() == "P" && doc.toString() == "2") {
                    localStorage['vali_p'] = 1;
                    $("#Is_Proyecto").prop('required', true);
                }

                if (desc.toString() == "CC" && doc.toString() == "2") {
                    localStorage['vali_cc'] = 1;
                    $("#Is_CentroCosto").prop('required', true);
                }

            });

        },
        error: function (err) {
            console.log(err);
        }
    });
}

function addCommas(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}


const getFila = () => {

    $('#thetable').find('tr').click(function () {
        const fila = ($(this).index() + 1);

        localStorage.setItem('Fila', fila);

    });

}

const pasar = (cod, nombre, cod_plan) => {
    $('#thetable tr').each(function (i) {
        var $tds = $(this).find('td');

        var index = (JSON.stringify(i));

        if (index.toString() == localStorage.getItem('Fila')) {
            $tds.eq(0).text(cod);
            $tds.eq(1).text(nombre);
            $tds.eq(6).text(cod_plan);
            $('#ModelArticulo').modal('hide');
        } 
    });
}

const pasar2 = (cod,nombre) => {

    $('#thetable tr').each(function (i) {
        var $tds = $(this).find('td');

        var index = (JSON.stringify(i));

        if (index.toString() == localStorage.getItem('Fila')) {
            $tds.eq(2).text(cod);
            $tds.eq(3).text(nombre);
            $('#ModalCentroCosto').modal('hide');

        } else { }
    });
}


const pasar3 = (cod,nombre) => {
    $('#thetable tr').each(function (i) {
        var $tds = $(this).find('td');

        var index = (JSON.stringify(i));

        if (index.toString() == localStorage.getItem('Fila')) {
            $tds.eq(4).text(cod);
            $tds.eq(5).text(nombre);
            $('#ModalProyecto').modal('hide');
        } 
    });
}


const ListarComboBox = () => {

    const cod_sociedad = localStorage['cod_sociedad'];

    url = 'http://192.168.0.22:81/api/articulo/' + cod_sociedad + '';

    $.ajax({
        url: url,
        type: "GET",
        dataType: 'json',
        success: function (res) {
            var html = '';

            $.each(res, function (i, item) {

                html +=
                    `<tr id="${i}" class="trArticulo" onclick="pasar('${item.cod_articulo}','${item.art_nombre}','${item.cod_cuenta}')" >
                        <td>${item.cod_articulo}</td>
                        <td>${item.art_nombre}</td>
                         <td>${item.cod_cuenta}</td>
                   </tr> `;

            });

            $("#ListarArticulos").append(html);
        },
        error: function (error) {
            alert(error);
            console.log(error)
        }
    });
}

const ListarComboBoxProyectos = () => {
    const cod_sociedad = localStorage['cod_sociedad'];
    url = 'http://192.168.0.22:81/api/proyecto/' + cod_sociedad + '';

    $.ajax({
        url: url,
        type: "GET",
        dataType: 'json',
        success: function (res) {
            var html = '';

            $.each(res, function (i, item) {



                html +=
                    `<tr id="${i}" class="trArticulo" onclick="pasar3('${item.cod_proyecto}','${item.proy_descripcion}')" >
                      <td>${item.cod_proyecto}</td>
                      <td>${item.proy_descripcion}</td>
                    </tr>`;

            });

            $("#ListarProyecto").append(html);
        },
        error: function (error) {
            alert(error);
            console.log(error)
        }
    });
}


const ListarComboBoxCentroCosto = () => {

    const cod_sociedad = localStorage['cod_sociedad'];
    url = 'http://192.168.0.22:81/api/centrocosto/' + cod_sociedad + '';

    $.ajax({
        url: url,
        type: "GET",
        dataType: 'json',
        success: function (res) {
            var html = '';

            $.each(res, function (i, item) {


                $("#Is_CentroCosto").append(`<option " value="${item.cod_centro_de_costo}">${item.cdc_nombre}</option>`);


                html +=
                    `<tr id="${i}" class="trArticulo" onclick="pasar2('${item.cod_centro_de_costo}','${item.cdc_nombre}')" >
                        <td>${item.cod_centro_de_costo}</td>
                        <td>${item.cdc_nombre}</td>
                     </tr> `;

            });

            $("#ListarCentroCosto").append(html);
            verificarCDC();
        },
        error: function (error) {
            alert(error);
            console.log(error)
        }
    });
}

const ListarDatosU = () => {



    const cod_usuario = localStorage['cod_usuario'];

    const cod_empresa = 1;
    const url = 'http://192.168.0.22:81/api/usuario/cod_usuario/' + cod_usuario + '/' + cod_empresa + '';
    const cod_sociedad = localStorage['cod_sociedad'];

    $('#Is_CodSociedad').val(cod_sociedad);

    $.ajax({
        url: url,
        type: "GET",
        dataType: 'json',
        success: function (res) {

            const nombres = res[0].usu_nombre + ' ' + res[0].usu_apellido;
            $('#Is_Empleado').val(nombres);

        },
        error: function (error) {
            alert(error);
            console.log(error)
        }
    });
}

const ListarProyectosDocumento = () => {

    const cod_sociedad = localStorage['cod_sociedad'];
    const url = `http://192.168.0.22:81/api/proyecto/${cod_sociedad}`;


    $.ajax({
        url: url,
        type: "GET",
        dataType: 'json',
        success: function (res) {

            $.each(res, function (i, item) {
                $("#Is_Proyecto").append('<option value="' + item.cod_proyecto + '">' + item.proy_descripcion + '</option>');
            });

        },
        error: function (error) {
            alert(error);
            console.log(error)
        }
    });
}

const ListarCentrosCostos = () => {

    const cod_sociedad = localStorage['cod_sociedad'];
    const url = `http://192.168.0.22:81/api/centrocosto/${cod_sociedad}`;
    $.ajax({
        url: url,
        type: "GET",
        dataType: 'json',
        success: function (res) {

            $.each(res, function (i, item) {
                $("#Is_CentroCostoC").append('<option value="' + item.cod_centro_de_costo + '"> <span class="text-info">' + item.cdc_nombre + ' </span>   </option>');

            });

        },
        error: function (error) {
            alert(error);
            console.log(error)
        }
    });
}




$('.table-add').on('click', 'i', () => {

    validarfondo = $('#Is_fxr').val();


    if (validarfondo == '0') {
        const $clone = $tableID.find('tbody tr').last().clone(true).removeClass('hide table-line');

        var htmlObject = $($tr);

        $tableID.find('table').append($tr);

        var init = 0;

        $('#thetable tr').each(function (i) {
        if (i > 0) {
            var customerId = $(this).find("td").eq(9).html();
            if (customerId.toString() == "") {
    
            } else {
    
                customerId = customerId.replace(/,/g, "");
    
                init = init + parseInt(customerId);
            }
    
        }
    
        });
    
        init = addCommas(init);
        $('#total').text(init);
       
        console.log(arrayFoto);
    } else {

        if (validarfondo == '') {

            Swal.fire({
                icon: 'info',
                title: 'Seleccione un número de fondo',
                showConfirmButton: false,
                timer: 2000
            })

        } else {

            Swal.fire({
                icon: 'info',
                title: 'No puede añadir filas a este documento',
                showConfirmButton: false,
                timer: 3000
            })

    
        }
       
    }

});

$tableID.on('click', '.table-remove', function () {
    var rowCount = $('#thetable tr').length;
    if (rowCount.toString() == "2") {

    } else {
        $(this).parents('tr').detach();
    }

    var init = 0;

    $('#thetable tr').each(function (i) {
        if (i > 0) {
            var customerId = $(this).find("td").eq(6).html();

            if (customerId.toString() == "") {

            } else {
                init = init + parseInt(customerId);
            }

        }

    });

    init = addCommas(init);

    arrayFoto.forEach(get);

    $('#total').text(init);

});

const get = (x , i) => {
  
    if (x.index == localStorage.getItem('Fila')) {

        arrayFoto.splice(i,1);
        console.log(arrayFoto);
    } 

   
}


$tableID.on('click', '.table-up', function () {

    const $row = $(this).parents('tr');

    if ($row.index() === 0) {
        return;
    }

    $row.prev().before($row.get(0));
});

$tableID.on('click', '.table-down', function (event) {

    const $row = $(this).parents('tr');
    $row.next().after($row.get(0));
});

jQuery.fn.pop = [].pop;
jQuery.fn.shift = [].shift;

const getHora = () => {
    var hora = new Date().getHours()
    var minutos = new Date().getMinutes()
    var segundos = new Date().getSeconds()

    return hora + ":" + minutos + ":" + segundos;
}

const validarFormulario = () => {

    var num = 0 ;

    var ProyectoValidacion = localStorage['vali_p'];
    var CentroCostoValidacion = localStorage['vali_cc'];

    var rowCount = $('#TablaDetalle tr').length;

    var ValidarRepetidos = []

    $('#TablaDetalle tr').each(function (i) {
        var COD_ARTICULO = $(this).find("td").eq(0).html();
        ValidarRepetidos.push(COD_ARTICULO);
    });

    var num_v = 0;


    var uniqs = ValidarRepetidos.filter(function (item, index, array) {
        if (array.indexOf(item) === index) {
            num_v = num_v + 1;
        }
      
    })

    if (rowCount == num_v) {

        $('#TablaDetalle tr').each(function (i) {

            const hora = getHora();

            if (i => 0) {



                var COD_ARTICULO = $(this).find("td").eq(0).html();
                var NOMBRE_ARTICULO = $(this).find("td").eq(1).html();
                var COD_CC = $(this).find("td").eq(2).html();
                var COD_PRO = $(this).find("td").eq(4).html();

                var COMENT = $(this).find("td").eq(5).html();
                var MONTO = $(this).find("td").eq(6).html();
                var MONTO_REQU = $(this).find("td").eq(7).html();
                var NUMERO_BOLETA = $(this).find("td").eq(8).html();
                var TIPO = $(this).find("td").eq(9).html();
                var IMAGEN = $(this).find("td").eq(11).html();
                var IMAGEN2 = $(this).find("td").eq(12).html();

                if (COD_ARTICULO == "") { num = num + 1; }
                if (NOMBRE_ARTICULO == "") { num = num + 1; }

                if (COD_CC == "") {

                    if (CentroCostoValidacion == 1) {
                        num = num + 1;

                    }

                }
                if (COD_PRO == "") {

                    if (ProyectoValidacion == 1) {
                        num = num + 1;

                    }
                }

                if (COMENT == "") { num = num + 1; }
                if (MONTO == "") { num = num + 1; }
                if (MONTO_REQU == "") { num = num + 1; }
                if (TIPO == "") { num = num + 1; }

                if (NUMERO_BOLETA == "") { num = num + 1; }

                if (IMAGEN == "") { num = num + 1; }
                if (IMAGEN2 == "") { num = num + 1; }


            }


        });

        return num;


    } else {

        num = 001;
        return num;

   
    }


}

const Cargar = (event) => {

    event.preventDefault();

    var validacion = validarFormulario();

    if (validacion == 0) {

        var data = [];

        var TieneFondo = $('#Is_fxr').val();

        const cod_sociedad = localStorage['cod_sociedad'];
        const cod_usuario = localStorage['cod_usuario'];

        var fecha_c = $('#Is_FechaCreacion').val();
        var fecha_r = $('#Is_FechaRequerida').val();
        var comentario = $('#Is_Comentario').val();
        var cod_cc = $('#Is_CentroCosto').val();
        var cod_pro = $('#Is_Proyecto').val();


        if (TieneFondo == '0') {

            data_1 = {
                cod_sociedad: cod_sociedad,
                cod_usuario: parseInt(cod_usuario),
                rend_estado: 0,
                rend_fecha_creacion: fecha_c,
                REND_FECHA_REQUERIDA: fecha_r,
                rend_aprobacion_jefe: 0,
                rend_comentario: comentario,
                cod_centro_de_costo: cod_cc,
                cod_proyecto: cod_pro

            }

            data.push(data_1);

        } else {

             data_2 = {
                cod_sociedad: cod_sociedad,
                cod_usuario: parseInt(cod_usuario),
                rend_estado: 0,
                rend_fecha_creacion: fecha_c,
                REND_FECHA_REQUERIDA: fecha_r,
                rend_aprobacion_jefe: 0,
                rend_comentario: comentario,
                cod_centro_de_costo: cod_cc,
                cod_proyecto: cod_pro,
                cod_fondo_por_rendir: TieneFondo
            }

            data.push(data_2);

        }



        const json = JSON.stringify(data[0]);
     
        const url = 'http://192.168.0.22:81/api/rendicion/';

        $.ajax({

            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            url: url,
            type: "POST",
            data: json,
            success: function (res) {

                var codigo = res.cod_rendicion;

                codigo = parseInt(codigo);
                //GuardarLogs(codigo);
                GuardarRendicionDetalle(codigo);

            },
            error: function (err) {
                alert("Error al guardar xx");
                console.log(err);
            }

        });

    } else {

        if (validacion == 001) {

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Articulo repetidos'
            })

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Complete todos los campos de las filas.'
            })

        }

      
    }

}

const GuardarLogs = (codigo) => {

    //var today = new Date();
    //var dd = String(today.getDate()).padStart(2, '0');
    //var mm = String(today.getMonth() + 1).padStart(2, '0');
    //var yyyy = today.getFullYear();

    //today = yyyy + '-' + mm + '-' + dd;

    //const cod_usuario = localStorage['cod_usuario'];
    //var hora = getHora() + '.5255784'

    //var data = [{

    //    FECHA_OPERACION: today,
    //    HORA_OPERACION: hora ,
    //    OPERACION: 'Solicitud',
    //    COD_RENDICÍON: codigo,
    //    COD_USUARIO: cod_usuario
      
    //}]

    //const json = JSON.stringify(data);
    
    //const url = 'http://192.168.0.22:81/api/logs_rendicion/LG/'
    //$.ajax({

    //    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    //    url: url,
    //    type: "POST",
    //    data: json,
    //    error: function (err) {
    //        alert("Error al guardar");
    //        console.log(err);
    //    }

    //});
}



const GuardarRendicionDetalle = (COD_RENDICION_ENCABEZADO) => {

    const usss = localStorage['cod_usuario'];

    localStorage['validacion'] = 0

    const hora = getHora();

    var array = [];
  

    $('#TablaDetalle tr').each(function (i) {

        if (i => 0) {

            var COD_ARTICULO = $(this).find("td").eq(0).html();
            var COD_PDC = $(this).find("td").eq(6).html();
            var COD_PRO = $(this).find("td").eq(4).html();
            var COD_CC = $(this).find("td").eq(2).html();
            var COMENT = $(this).find("td").eq(7).html();
            var TIPO = $(this).find("td").eq(11).html();
            var NUMERO_BOLETA = $(this).find("td").eq(10).html();
            var MONTO_REQU = $(this).find("td").eq(9).html();
            var COD_ADJUNTOS = hora + COD_ARTICULO + i + usss;

            MONTO_REQU = MONTO_REQU.replace(/,/g, "");

            var obj = {

                COD_RENDICION: COD_RENDICION_ENCABEZADO,
                COD_COD_PLAN_CUENTA: COD_PDC,
                COD_ARTICULO: COD_ARTICULO,
                COD_PROYECTO: COD_PRO,
                COD_CENTRO_DE_COSTO: COD_CC,
                COD_ADJUNTO: COD_ADJUNTOS.toString(),
                REND_LINEA: 0,
                REND_COMENTARIO: COMENT,
                REND_TIPO_DOC: TIPO,
                REND_MONTO: MONTO_REQU,
                REND_NUMERO_DOC: NUMERO_BOLETA
            };

            array.push(obj);

        }

    });

 
    const json = JSON.stringify(array);


    const url = 'http://192.168.0.22:81/api/RendicionDetalle/';

    $.ajax({
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        type: "POST",
        url: url,
        data: json,
        success: function (res) {
           
            var nn = 1;

            $('#TablaDetalle tr').each(function (i) {
             
                if (i => 0) {
                    
                    var COD_ARTICULO = $(this).find("td").eq(0).html();
             
                    var COD_ADJUNTO = hora + COD_ARTICULO + i + usss;

                   

                    var dataX = arrayFoto.filter(function (el) {
                        return el.index == nn
                    });

                 
                    
                    $.ajax(
                        {
                            url: 'http://192.168.0.22:81/api/Adjunto/'+COD_ADJUNTO+'',
                            data: dataX[0],
                            processData: false,
                            contentType: false,
                            type: "POST",
                            success: function (data) {

                            },
                            error: function (err) {
                                alert('Error al subir adjunto');
                                console.log(err);
                            }
                        }
                    );

                }

                var rowCount = $('#TablaDetalle tr').length;

                if (rowCount == nn) {
                    TieneJefeTieneAprobacion2(COD_RENDICION_ENCABEZADO);
                }

                 nn = nn + 1;

            });

           
        },
        error: function (data) {
            console.log(data);
  
            alert("error al guardar encabezado")
        }
    });

}


const TieneJefeTieneAprobacion2 = (COD_FONDO) => {

    const cod_usuario = localStorage['cod_usuario'];
    const cod_sociedad = localStorage['cod_sociedad'];

    const url = `http://192.168.0.22:81/api/fondorendir/${cod_sociedad}/${cod_usuario}/${COD_FONDO}/2`

    $.ajax({
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        type: "PUT",
        url: url,
        success: function (res) {

            Swal.fire({
                icon: 'success',
                title: 'Rendición creada con éxito.',
                showConfirmButton: false,
                timer: 2100
            })

            setTimeout(function () { location.reload() }, 2200);

            console.log(res);
     
        },
        error: function (err) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error al guardar rendición validar tiene jefe'
            })
        }
    });


}


const GuardarDetalle = (Fdata) => {



    const size = Object.keys(Fdata).length;
    const cod_usuario = localStorage['cod_usuario'];
    const cod_sociedad = localStorage['cod_sociedad'];
    var cod_usuario_ = parseInt(cod_usuario, 10);

    let cod_proyec = $('#Is_Proyecto').val();
    let cod_centrocosto = $('#Is_CentroCosto').val();


    const estado = 0
    const fecha_creacion = $('#Is_FechaCreacion').val();
    const fecha_requerida = $('#Is_FechaRequerida').val();
    const aprobacion_jefe = 2;
    const comentario = $('#Is_Comentario').val();

    var p = localStorage['vali_p'];
    var cc = localStorage['vali_cc'];



    if (p == 0) {
        cod_proyec = null;
    }

    if (cc == 0) {
        cod_centrocosto = null;
    }

    var dataE = {

        cod_sociedad: cod_sociedad,
        cod_usuario: cod_usuario_,
        fxr_estado: estado,
        fxr_aprobacion: aprobacion_jefe,
        fxr_comentarios: comentario.toString(),
        FXR_FECHA_NECESARIO: fecha_requerida,
        fxr_fecha_creacion: fecha_creacion,
        cod_proyecto: cod_proyec,
        cod_centro_de_costo: cod_centrocosto

    };



    const json = JSON.stringify(dataE);
    const url = 'http://192.168.0.22:81/api/FondoRendir/';

    $.ajax({
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        type: "POST",
        url: url,
        data: json,
        success: function (res) {

            const cod_fondoRendir = res.cod_fondo_por_rendir;

            $.each(Fdata, function (i, item) {
                GuardarDetalle2(item, cod_fondoRendir, i)

                if (size.toString() == i + 1) {
                    TieneJefeTieneAprobacion(cod_fondoRendir);
                }

            });
        },
        error: function (data) {
            console.log(data);
            console.log(json);
            alert("error al guardar encabezado")
        }
    });


}

const TieneJefeTieneAprobacion = (COD_FONDO) => {

    const cod_usuario = localStorage['cod_usuario'];
    const cod_sociedad = localStorage['cod_sociedad'];

    const url = `http://192.168.0.22:81/api/fondorendir/${cod_sociedad}/${cod_usuario}/${COD_FONDO}`

    $.ajax({
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        type: "PUT",
        url: url,
        success: function (res) {
            alert("Solicitud creada.");
            console.log(res);
            location.reload();
        },
        error: function (err) {
            console.log(err);
        }
    });


}


const GuardarDetalle2 = (item, cod_fondoRendir, i) => {

    var monto_ = parseInt(item.monto, 10);


    var p = localStorage['vali_p'];
    var cc = localStorage['vali_cc'];



    if (p == 0) {
        var p = null;
    } else {
        var p = item.proyecto;
    }

    if (cc == 0) {
        var cc = null;
    } else {
        var cc = item.centrocosto;
    }

    var dataDetalle = {
        cod_fondo_por_rendir: cod_fondoRendir,
        fxrd_linea: 0,
        fxrd_comentario: item.descripcion.toString(),
        fxrd_tipo_doc: 1,
        fxrd_monto: monto_,
        cod_articulo: item.codigo,
        cod_plan_de_cuenta: item.plan,
        cod_centro_De_costo: cc,
        cod_proyecto: p
    };

    const json = JSON.stringify(dataDetalle);
    const url = 'http://192.168.0.22:81/api/FondoRendirdetalle/';


    $.ajax({
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        type: "POST",
        url: url,
        data: json,
        error: function (error) {
            console.log(error);
            alert("error al el detalle numero : " + i)
        }
    });

};



const verificarCDC = () => {

    const COD_USUARIO = localStorage['cod_usuario'];
    const COD_SOCIEDAD = localStorage['cod_sociedad'];
    const url = `http://192.168.0.22:81/api/asignacionCC/${COD_SOCIEDAD}/${COD_USUARIO}`;

    $.ajax({
        url: url,
        type: "GET",
        dataType: 'json',
        success: function (res) {

            let cant = res.length

            if (cant == 1) {

                $("#Is_CentroCosto").val(res[0].cod_cc).attr('disabled', true);

            };

            const v = $("#Is_CentroCosto").val();
            const v2 = $("#Is_CentroCosto option:selected").text();

            $('#thetable tr').each(function (i) {
                var $tds = $(this).find('td');

                $tds.eq(2).text(v);
                $tds.eq(3).text(v2);

            });

        },
        error: function (res) {
            console.log(res);
        }
    });

}


const GuardarImagen = (event) => {

    event.preventDefault();

    try {

        var input = document.getElementById('files');
        var files = input.files;
        var formData = new FormData();

        for (var i = 0; i != files.length; i++) {
            formData.append("files", files[i]);
        }

        $('#thetable tr').each(function (i) {

                var $tds = $(this).find('td');


                if (i == localStorage.getItem('Fila')) {
                    $tds.eq(12).text('Guardada');
                    $('#files').val('');
                    $('#ModalFoto').modal('hide');
                
                } 
            });
     
        formData.index = localStorage.getItem('Fila');
        arrayFoto.push(formData);
        
        console.log(arrayFoto);


    } catch (e) {
        alert('Error al cargar iumagen')
    }
 

}

function addCommas(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}
