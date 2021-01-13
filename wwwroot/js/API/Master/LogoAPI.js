$(document).ready(function () {


    ListarSociedad();

    $("#FiltroSociedad").keyup(function () {
        _this = this;
        $.each($("#tablaSoceidad tbody tr"), function () {
            if ($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) === -1)
                $(this).hide();
            else
                $(this).show();
        });
    });

}); 

const ListarSociedad = () => {

    const url = "http://192.168.0.22:81/api/sociedad/activo/1";

    $.ajax({
        url: url,
        type: "GET",
        dataType: 'json',
        success: function (res) {
            var trHTML = '';

            $.each(res, function (i, item) {
                trHTML += '<tr> ' +

                    ' <td class="text-center" class="text-center" style="font-size: 12px;">' + item.cod_sociedad + ' </td> ' +
                    ' <td class="text-center" class="text-center" style="font-size: 12px;">' + item.soc_nombre + '</td style="font-size: 14px;"> ' +
                  
                    ' <td class="text-center pt-0 " class="text-center" style="text-decoration: none;"> <a onclick="foto(\'' + item.cod_sociedad + '\')"  style="font-size: 12px;" data-toggle="modal" data-target="#exampleModal' + i +'" href=""><img src="http://localhost:5001/img/tick.png" height="17px" alt="Boton Abrir" /> </a> ' +
                    '<div class=" rounded-0 modal fade" id="exampleModal'+i+'" tabindex="-1" ' +
                    '   role="dialog" aria-labelledby="exampleModalLabel" ' +
                    '   aria-hidden="true"> ' +
                    '<div class="modal-dialog" role="document"> ' +
                    '   <div class="modal-content"> ' +
                    '      <div class="modal-header"> ' +
                    '         <h5 class="modal-title" id="exampleModalLabel">Asignar   ' +
                    '           Logo a la sociedad '+item.soc_nombre+' ' +
                    '         </h5> ' +
                    '         <button type="button" class="close" data-dismiss="modal" ' +
                    '            aria-label="Close"> ' +
                    '         <span aria-hidden="true">&times;</span> ' +
                    '         </button> ' +
                    '      </div> ' +
                    '      <div class="container mt-2 pb-3"> ' +
                    '   <form  onsubmit="uploadFiles(event,\'' + item.cod_sociedad + '\')" >' +
                    '   <div class="container-fluid text-center mt-3"> ' +
                    '<img id="foto' + item.cod_sociedad + '" src="" style="height:50px"  alt="Sin Foto" />' +
                    '      </div> ' +
                 
                    '      <div class="buttons mt-5">' +
                    '           <div class="upload-button">' +
  
                    '           <input id="files' + item.cod_sociedad + '" name="files' + item.cod_sociedad + '" type="file" size="1" multiple  />' +
                    '           <button type="submit" style="background:#00b1e4;" class="btn ml-2 btn-info float-right btn-sm mb-2 mt-3 font-weight-bold  rounded-0">Guadar foto</button> ' +
                '            </div>' +
                '        </div>' +
                '     </form>' +
                    '      </div>  ' +
                    '   </div> ' +
                    '</div>  ' +
                    '</tr>';
            });
            $('#tablaSoceidad').append(trHTML);

        },
        error: function (data) {

            console.log("Error en listar sociedades  ")
        }
    });

}

const foto = (cod) => {
   
    const url = 'http://192.168.0.22:81/api/logosociedad/' + cod + '';

    $.ajax({
        url: url,
        type: "GET",
        dataType: 'json',
        success: function (res) {

            const url_foto = res[0].url_foto;
            const final_foto = 'http://192.168.0.22:81/img/' + url_foto + '';
        
            $('#foto' + cod +'').attr("src", final_foto);
 
        },
        error: function (error) {
            alert(error);
            console.log(error)
        }
    });
}

function uploadFiles(event, codigo) {

    event.preventDefault();


    $.ajax(
        {
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            url: 'http://192.168.0.22:81/api/logosociedad/' + codigo + '',
            type: "DELETE",
            dataType: 'json',
            
            success: function (data) {

                var input = document.getElementById('files' + codigo + '');
                var files = input.files;
                var formData = new FormData();

                for (var i = 0; i != files.length; i++) {
                    formData.append("files", files[i]);
                }

                $.ajax(
                    {
                        url: 'http://192.168.0.22:81/api/logosociedad/' + codigo + '',
                        data: formData,
                        processData: false,
                        contentType: false,
                        type: "POST",
                        success: function (data) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Logo guardado',
                                showConfirmButton: false,
                                timer: 1500
                            })

                            setTimeout(function () { location.reload() }, 1500);

                        }
                    }
                );

            }, error: function (err) {

                console.log("Error al añadir logo "+err+"")
            }
            
        }
    );
   
}