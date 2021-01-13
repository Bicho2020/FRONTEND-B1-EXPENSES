
$(document).ready(function () {

     verificar();

    $("#1P").click(function () {
        const res = $('#1P').is(':checked')

        const x = 1;
        const y = 'P'; 

        if (res == true) {
       
            Habilitar(x, y); 

        } else {
            Desactivar(x,y);
        }

    });

    $("#1CC").click(function () {
        const res = $('#1CC').is(':checked')

        var x = 1; 
        var y = 'CC'; 
        if (res == true) {

            Habilitar(x, y); 
        } else {
            Desactivar(x,y);
        }
    });

    $("#2P").click(function () {
        const res = $('#2P').is(':checked')
        var x = 2; 
        var y = 'P'; 
        if (res == true) {

            Habilitar(x, y); 
        } else {
            Desactivar(x,y);
        }
    });

    $("#2CC").click(function () {
        const res = $('#2CC').is(':checked')
        var x = 2; 
        var y = 'CC'; 
        if (res == true) {

            Habilitar(x, y); 
        } else {
            Desactivar(x,y);
        }
    });

});

const verificar = () => {

    const cod_sociedad = localStorage['cod_sociedad'];
    const url = 'http://192.168.0.22:81/api/permisodocumento/'+cod_sociedad+''

    $.ajax({
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        url: url,
        type: "GET",
        success: function (res) {

            $.each(res, function (i, item) {

                var desc = item.pD_DESCRIPCION;
                var doc = item.tipO_DOC;
                $("#" + $.escapeSelector(doc + desc)).prop('checked',true);

            });

        },
        error: function (err) {
  
            console.log(err);
        }
    });
}

const Habilitar = (x, y) => {
  
    const cod_sociedad = localStorage['cod_sociedad'];
    const url = `http://192.168.0.22:81/api/permisodocumento/`;


    const data = {

        COD_SOCIEDAD: cod_sociedad,
        TIPO_DOC: x,
        PD_DESCRIPCION: ''+y+'',
    
    }

    const json = JSON.stringify(data);

    $.ajax({
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        url: url,
        type: "POST",
        data: json,
        success: function (res) { 
            console.log(res);
        },
        error: function (err) {
            alert("error");
            console.log(err);
        }
     });

}

const Desactivar = (x, y) => {

    const cod_sociedad = localStorage['cod_sociedad'];
    const url = `http://192.168.0.22:81/api/permisodocumento/${cod_sociedad}/${x}/${y}`;

    $.ajax({
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        url: url,
        type: "DELETE", 
        error: function (err) {
            alert("Error al desactivar");
           
        }
    });
   
}