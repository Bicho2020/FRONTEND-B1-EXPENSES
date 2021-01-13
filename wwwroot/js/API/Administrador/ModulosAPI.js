$( document ).ready(function() {
    ListarUsuariosAdministradoresx();
    ListarUsuariosTipoUsuarios();
    ListarUsuariosAutorizadores();

    $("#FiltroAdmin").keyup(function () {
        _this = this;
        $.each($("#TablaListarUsuariosAdministradores tbody tr"), function () {
            if ($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) === -1)
                $(this).hide();
            else
                $(this).show();
        });
    });


    $("#FiltroUser").keyup(function () {
        _this = this;
        $.each($("#TablaListarUsuarios tbody tr"), function () {
            if ($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) === -1)
                $(this).hide();
            else
                $(this).show();
        });


        $("#FiltroAutoi").keyup(function () {
            _this = this;
            $.each($("#TablaListarAutorizadores tbody tr"), function () {
                if ($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) === -1)
                    $(this).hide();
                else
                    $(this).show();
            });
        });
    });
});

const ListarUsuariosAdministradoresx = () => {

  const cod_sociedad = localStorage['cod_sociedad'];
  const cod_empresa = '1';
  const url =  `http://192.168.0.22:81/api/usuario/administradores/${cod_empresa}/${cod_sociedad}`;
    const tipo = "admnistradores";
    $.ajax({
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        type: "GET",
        url: url,
        success: function (res) {
        var FILAS = '';
            $.each(res, function (i, item) {

                const rut = FormatearRut(item.usu_rut);

            FILAS += 
            `<tr>
                <td style="font-size: 13px;"  class="pt-3-half text-center" >${item.cod_usuario}</td>
                <td style="font-size: 13px;"  class="pt-3-half text-center"  class="pt-3-half">${rut}</td>
                <td style="font-size: 13px;"  class="pt-3-half text-center"  class="pt-3-half">${item.usu_nombre}</td>
                <td style="font-size: 13px;"  class="pt-3-half text-center"  class="pt-3-half">${item.usu_apellido}</td>
                <td style="font-size: 13px;"  class="pt-3-half text-center"  class="pt-3-half">  <a href="" data-toggle="modal" data-target="#modal${item.cod_usuario}" onclick="ListarModulosSociedades('${item.cod_usuario}','${tipo}')" style="text-decoration:none;" ><img src="http://localhost:5001/img/mas.png" height="12px" alt="Boton Abrir" /></a>
                
                    <div class="modal fade " id="modal${item.cod_usuario}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                        
                    <div class="modal-dialog " role="document">

                            <div class="modal-content container">

                                <div class="modal-header">
                                    <h5 class="modal-title" >Asignar modulos al usuario ${item.usu_nombre} ${item.usu_apellido}  </h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>

                                <div id="contenedor${item.cod_usuario}"  class="modal-body ">

                                </div>

                            </div>

                        </div>

                    </div>

                </td>

            </tr>`
        });
        
        $("#TablaListarUsuariosAdministradores").append(FILAS);

       }
        ,
        error: function (error) {
        console.log(error);
        alert("Error al cargar los usuarios administradores")
        }
    });

}

const ListarUsuariosAutorizadores = () => {

    const cod_sociedad = localStorage['cod_sociedad'];
    const cod_empresa = '1';
    const url = `http://192.168.0.22:81/api/usuario/Autoriza/${cod_empresa}/${cod_sociedad}`;
    const tipo = "autorizador";
    $.ajax({
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        type: "GET",
        url: url,
        success: function (res) {
            var FILAS = '';
            $.each(res, function (i, item) {

                const rut = FormatearRut(item.usu_rut);

                FILAS +=
                    `<tr>
                <td style="font-size: 13px;"  class="pt-3-half text-center" >${item.cod_usuario}</td>
                <td style="font-size: 13px;"  class="pt-3-half text-center" >${rut}</td>
                <td style="font-size: 13px;" class="pt-3-half text-center">${item.usu_nombre}</td>
                <td style="font-size: 13px;" class="pt-3-half text-center">${item.usu_apellido}</td>
                <td style="font-size: 13px;" class="pt-3-half text-center">  <a href="" data-toggle="modal" data-target="#modal${item.cod_usuario}" onclick="ListarModulosSociedades('${item.cod_usuario}','${tipo}')" style="text-decoration:none;" ><img src="http://localhost:5001/img/mas.png" height="12px" alt="Boton Abrir" /></a>
                
                    <div class="modal fade " id="modal${item.cod_usuario}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                        
                    <div class="modal-dialog " role="document">

                            <div class="modal-content container">

                                <div class="modal-header">
                                    <h5 class="modal-title" >Asignar modulos al usuario ${item.usu_nombre} ${item.usu_apellido}  </h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>

                                <div id="contenedor${item.cod_usuario}"  class="modal-body ">

                                </div>

                            </div>

                        </div>

                    </div>

                </td>

            </tr>`
            });

            $("#TablaListarAutorizadores").append(FILAS);

        }
        ,
        error: function (error) {
            console.log(error);
            alert("Error al cargar autorizadores ")
        }
    });

}


const ListarUsuariosTipoUsuarios = () => {

    const cod_sociedad = localStorage['cod_sociedad'];
    const cod_empresa = '1';
    const url = `http://192.168.0.22:81/api/usuario/usuarios/${cod_empresa}/${cod_sociedad}`;
    const tipo = "usuarios";
    $.ajax({
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        type: "GET",
        url: url,
        success: function (res) {
            var FILAS = '';
            $.each(res, function (i, item) {
                const rut = FormatearRut(item.usu_rut);
                FILAS +=
                    `<tr>
                <td style="font-size: 13px;" class="pt-3-half text-center" >${item.cod_usuario}</td>
                <td style="font-size: 13px;" class="pt-3-half text-center">${rut}</td>
                <td style="font-size: 13px;" class="pt-3-half text-center">${item.usu_nombre}</td>
                <td style="font-size: 13px;" class="pt-3-half text-center">${item.usu_apellido}</td>
                <td style="font-size: 13px;" class="pt-3-half text-center">  <a href="" data-toggle="modal" data-target="#modal${item.cod_usuario}" onclick="ListarModulosSociedades('${item.cod_usuario}','${tipo}')" style="text-decoration:none;" ><img src="http://localhost:5001/img/mas.png" height="12px" alt="Boton Abrir" /></a>
                
                    <div class="modal fade " id="modal${item.cod_usuario}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                        
                    <div class="modal-dialog " role="document">

                            <div class="modal-content container">

                                <div class="modal-header">
                                    <h5 class="modal-title" >Asignar modulos al usuario ${item.usu_nombre} ${item.usu_apellido}  </h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>

                                <div id="contenedor${item.cod_usuario}"  class="modal-body ">

                                </div>

                            </div>

                        </div>

                    </div>

                </td>

            </tr>`
            });

            $("#TablaListarUsuarios").append(FILAS);

        }
        ,
        error: function (error) {
            console.log(error);
            alert("Error al cargar los usuarios ")
        }
    });

}


const ListarModulosSociedades = (COD_USUARIO,TIPO) => {
    
    const cod_sociedad = localStorage['cod_sociedad'];
    const cod_empresa = '1';

    $("#contenedor"+COD_USUARIO+" div").remove();

    const url = `http://192.168.0.22:81/api/modulo/${TIPO}/${COD_USUARIO}/${cod_sociedad}`;
    $.ajax({
        url:url,
        type: "GET",
        dataType: 'json',
        success: function (response) {
            var HTML = '';
            $.each(response, function (i, item) {

                var ASIG = JSON.stringify(item.mod_asignacion);

                var string = item.mod_nombre;

                var otraStr = string.replace(/([a-z])([A-Z])/g, '$1 $2');
          
                if( ASIG == '"NO ASIGNADO"'){

                    HTML += '<div class="row p-2 mt-2 border " >'+
                    '<div class="col-10 text-left p-1">'+
                        '<span  style="font-size: 13px;">Nombre modulo : <span class="text-info font-weight-bold text-left">  ' + otraStr+' </span>   </span>'+
                    '</div>'+
                        '<div class="col-2  float-right text-right">' +
                    '<div class="form-check float-right mt-2 text-right">'+
                        '<input class="form-check-input  trArticulo  float-right  "  onclick="ActivarModulo(\'' + item.cod_modulo + '\',\'' + COD_USUARIO + '\',\'' + TIPO +'\')">'+
                    
                    '</div>'+
                    '</div>'+
                    '</div>'+
                    '</div>';
                }else{
                  
                    HTML += '<div class="row p-2 mt-2 border " style="border-color:#0abbec;" >'+
                    '<div class="col-10 text-left p-1">'+
                        '<span  style="font-size: 13px;">Nombre modulo : <span class="text-info font-weight-bold text-left">  ' + otraStr+' </span>   </span>'+
                    '</div>'+
                        '<div class="col-2  float-right text-right">' +
                        '<div class="form-check float-right mt-2 text-right">' +

                        '<input class="form-check-input float-right trArticulo " type="checkbox" onclick="DesactivarModulo(\'' + item.cod_modulo + '\',\'' + COD_USUARIO + '\',\'' + TIPO +'\')" checked>'+
                    
                    '</div>'+
                    '</div>'+
                    '</div>'+
                    '</div>';
                }
            });
            $("#contenedor"+COD_USUARIO+"").append(HTML);
        }
    });

}

const ActivarModulo = (COD_MOD , COD_US,TIPO) => {

    const COD_SOC = localStorage['cod_sociedad'];
   
    const url = `http://192.168.0.22:81/api/modulo/`;

    var data = {
      cod_modulo: COD_MOD,
      cod_sociedad: COD_SOC,
      cod_usuario: COD_US
    };
    const json = JSON.stringify(data);
  
    $.ajax({
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        url:url,
        type: "POST",
        data:json,
        dataType: 'json',
        success: function(res){
    
            ListarModulosSociedades(COD_US,TIPO);
        },
        error: function(err){
            alert("Error al asignar usuario");
            console.log(err);
           
        }
    });


}

const DesactivarModulo = (COD_MODULO , COD_USUARIO,TIPO)=> {

    const COD_SOCIEDAD = localStorage['cod_sociedad'];
   
    const url = `http://192.168.0.22:81/api/modulo/${COD_MODULO}/${COD_SOCIEDAD}/${COD_USUARIO}`;
    $.ajax({
        url:url,
        type: "DELETE",
        success: function(res){
       
            ListarModulosSociedades(COD_USUARIO,TIPO);
        },
        error: function(err){
            alert("Error al desactivar Modulo");
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