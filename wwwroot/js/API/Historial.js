$(document).ready(function () {

    COD_USUARIO = localStorage['cod_usuario'];

    const URL = `http://192.168.0.22:81/api/logs_rendicion/LG/${COD_USUARIO}`;

    const URL2 = `http://192.168.0.22:81/api/logs_rendicion/LG2/${COD_USUARIO}`;


    $.ajax({

        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        type: "GET",
        url: URL,
        success: function (res) {

            var TR = '';

            $.each(res, function (i, item) {

                  TR += 

                    `<tr>
                        <td scope="col" class="text-center" style="font-size: 13px; font-weight: 500;">${item.coD_RENDICÍON}</td>

                        <td scope="col" class="text-center" style="font-size: 13px; font-weight: 500;">${item.fechA_OPERACION}</td>

                        <td scope="col" class="text-center" style="font-size: 13px; font-weight: 500;">${item.horA_OPERACION}</td>

                        <td scope="col" class="text-center" style="font-size: 13px; font-weight: 500;">${item.operacion}</td>
                    </tr>`;
                  
               
              });


            $("#TablaHistorial").append(TR);


        }
    });





    $.ajax({

        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        type: "GET",
        url: URL2,
        success: function (res) {

            var TR2 = '';

            $.each(res, function (i, item) {

                TR2 +=

                    `<tr>
                        <td scope="col" class="text-center" style="font-size: 13px; font-weight: 500;">${item.coD_FONDO_X_RENDIR}</td>

                        <td scope="col" class="text-center" style="font-size: 13px; font-weight: 500;">${item.fechA_OPERACION}</td>

                        <td scope="col" class="text-center" style="font-size: 13px; font-weight: 500;">${item.horA_OPERACION}</td>

                        <td scope="col" class="text-center" style="font-size: 13px; font-weight: 500;">${item.operacion}</td>
                    </tr>`;


            });


            $("#TablaFondos").append(TR2);


        }
    });

});