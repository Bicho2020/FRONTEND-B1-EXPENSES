const $tableID = $('#table');
const $BTN = $('#export-btn');
const $EXPORT = $('#export');


const $tr = `<tr>

                <td onclick="getFila();" class="trArticulo" style="font-size:13px;" data-toggle="modal" data-target="#ModelArticulo"></td>

                <td onclick="getFila();" class="trArticulo" style="font-size:13px;" data-toggle="modal" data-target="#ModelArticulo"></td>

                <td onclick="getFila();" class="trArticulo" style="font-size:13px;" data-toggle="modal" data-target="#ModalCentroCosto" hidden></td>

                <td onclick="getFila();" class="trArticulo" style="font-size:13px;" data-toggle="modal" data-target="#ModalCentroCosto"></td>

                <td onclick="getFila();" class="trArticulo" style="font-size:13px;" data-toggle="modal" data-target="#ModalProyecto" hidden></td>

                <td onclick="getFila();" class="trArticulo" style="font-size:13px;" data-toggle="modal" data-target="#ModalProyecto"></td>

                <td contenteditable="true" hidden></td>

                <td style="font-size:13px;" contenteditable="true"></td>

                <td style="font-size:13px;" id="myeditablediv" oncopy="return false" oncut="return false" onpaste="return false" contenteditable="true"></td>

                <td width="30px">
                    <span class="table-remove">
                        <a onclick="getFila();" class="btn font-weight-bold text-danger btn-sm my-0"> <img src="http://localhost:5001/img/eliminar.png" height="16px" alt="Alternate Text" /> </a>
                    </span>
                </td>

            </tr>`;

$(document).ready(function () {
   
    
    ListarProyectosDocumento();
    ListarCentrosCostos();
    ListarDatosU();
  
    ListarComboBoxCentroCosto();

    ListarComboBoxProyectos();

    ListarComboBox();

    verificar();

    verificarCDC();

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


    $("#Is_Proyecto").change(function () {



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

                } else if (result.isDenied) {
                    return false;
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
                if (result.isConfirmed) {

                    const v = $("#Is_CentroCosto").val();
                    const v2 = $("#Is_CentroCosto option:selected").text();

                    $('#thetable tr').each(function (i) {
                        var $tds = $(this).find('td');

                        $tds.eq(2).text(v);
                        $tds.eq(3).text(v2);

                    });

                } 
            }
        })



    });

});

const verificar = () => {

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

                if (desc.toString() == "P" && doc.toString() == "1") {
                    localStorage['vali_p'] = 1;
                    $("#Is_Proyecto").prop('required', true);
                } 

                if (desc.toString() == "CC" && doc.toString() == "1") {
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

const pasar = (cod, nombre,cod_plan) => {
    $('#thetable tr').each(function (i) {
        var $tds = $(this).find('td');

        var index = (JSON.stringify(i));

        if (index.toString() == localStorage.getItem('Fila')) {
            $tds.eq(0).text(cod);
            $tds.eq(1).text(nombre);
            $tds.eq(6).text(cod_plan);
            $('#ModelArticulo').modal('hide');
        } else { }
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
        } else { }
    });
}


const ListarComboBox = () => {

    const cod_sociedad = localStorage['cod_sociedad'];

    url = 'http://192.168.0.22:81/api/articulo/'+cod_sociedad+'';

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
    url = 'http://192.168.0.22:81/api/proyecto/'+cod_sociedad+'';

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
    url = 'http://192.168.0.22:81/api/centrocosto/'+cod_sociedad+'';

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
                $("#Is_Proyecto").append('<option value="'+item.cod_proyecto+'">'+item.proy_descripcion+'</option>');
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
            var customerId = $(this).find("td").eq(8).html();
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


$('.table-add').on('click', 'i', () => {

    var row = $('#thetable tr').length;

    const $clone = $tableID.find('tbody tr').last().clone(true).removeClass('hide table-line');

    var htmlObject = $($tr);

    $tableID.find('table').append(htmlObject);

    const v = $("#Is_CentroCosto").val();
    const v2 = $("#Is_CentroCosto option:selected").text();

   

    $('#thetable tr').each(function (i) {

        if (row == i) {
            var $tds = $(this).find('td');

            $tds.eq(2).text(v);
            $tds.eq(3).text(v2);
        }


    });

   /// verificarCDC();
  

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
            var customerId = $(this).find("td").eq(8).html();
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


const  Cargar = (event) => {
    localStorage['validacion'] = 0;
 
    event.preventDefault();

    const $rows = $tableID.find('tr:not(:hidden)');
    const headers = [];
    const data = [];

    $($rows.shift()).find('th:not(:empty)').each(function () {

        headers.push($(this).text().toLowerCase());
    });

    $rows.each(function () {
        const $td = $(this).find('td');
        const h = {};

        headers.forEach((header, i) => {

            h[header] = $td.eq(i).text();
        });

        data.push(h);
    });

    var rowCount = $('#TablaDetalle tr').length;
    const size = Object.keys(data).length;


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

        $.each(data, function (i, item) {

            var x = i + 1;

            if (item.codigo == "") {
              
                localStorage['validacion'] = 1;
            }

            if (item.nombre == "") {
             
                localStorage['validacion'] = 1;
            }

            if (item.centrocosto == "") {

                var cc = localStorage['vali_cc'];

                if (cc.toString() == "1") {
                 
                    localStorage['validacion'] = 1;
                }

            }

            if (item.proyecto == "") {

                var p = localStorage['vali_p'];

                if (p.toString() == "1") {
            
                    localStorage['validacion'] = 1;
                }
            };

            if (item.descripcion == "") {
             
                localStorage['validacion'] = 1;
            }
            if (item.monto == "") {
              
                localStorage['validacion'] = 1;
            }



            if (size.toString() == i + 1) {

                var validar = localStorage['validacion'];
                if (validar.toString() == 1) {

                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Valide los datos de las filas.'
                    })

                    localStorage['validacion'] = 0;


                } else {

                    GuardarDetalle(data);

                }
            }

        }); 

    } else {

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Articulo repetidos.'
        })

    }

    

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

const getHora = () => {
    var hora = new Date().getHours()
    var minutos = new Date().getMinutes()
    var segundos = new Date().getSeconds()

    return hora + ":" + minutos + ":" + segundos;
}


const GuardarLogsFondo = (codigo) => {

    //var today = new Date();
    //var dd = String(today.getDate()).padStart(2, '0');
    //var mm = String(today.getMonth() + 1).padStart(2, '0');
    //var yyyy = today.getFullYear();

    //today = yyyy + '-' + mm + '-' + dd;

    //const cod_usuario = localStorage['cod_usuario'];
    //var hora = getHora() + '.5255784'

    //var data = [{

    //    FECHA_OPERACION: today,
    //    HORA_OPERACION: hora,
    //    OPERACION: 'Solicitud',
    //    COD_FONDO_X_RENDIR: codigo,
    //    COD_USUARIO: cod_usuario

    //}]

    //const json = JSON.stringify(data);

    //const url = 'http://192.168.0.22:81/api/logs_rendicion/LG2/'
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

const TieneJefeTieneAprobacion = (COD_FONDO) => {

    const cod_usuario = localStorage['cod_usuario'];
    const cod_sociedad = localStorage['cod_sociedad'];

    const url = `http://192.168.0.22:81/api/fondorendir/${cod_sociedad}/${cod_usuario}/${COD_FONDO}/1`

    $.ajax({
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        type: "PUT",
        url: url,
        success: function (res) {
            GuardarLogsFondo(COD_FONDO);
            Swal.fire({
                icon: 'success',
                title: 'Fondo creado con éxito.',
                showConfirmButton: false,
                timer: 2100
            })

            setTimeout(function () { location.reload() }, 2100);

            console.log(res);
    
        },
        error: function (err) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error al guardar fondo.'
            })
        }
    });


}


const GuardarDetalle2 = (item, cod_fondoRendir ,i ) => {


    var monto_ = item.monto.replace(/,/g, "");

    monto_ = parseInt(monto_);

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
        fxrd_comentario: item.descripción.toString(),
        fxrd_tipo_doc : 1,
        fxrd_monto: monto_,
        cod_articulo: item.código,
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

                $("#Is_CentroCosto").val(res[0].cod_cc).attr('disabled',true);

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
