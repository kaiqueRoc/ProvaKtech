$(document).ready(function () {
    let carros;
    let motores;

    let urlStr = 'https://apiintranet.kryptonbpo.com.br/test-dev/exercise-1'; 

    $.ajax({
        url: urlStr,
        type: 'GET',
        dataType: "JSON",
        success: function (data) {
            carros = data.carros;
            motores = data.motores;

            for (let i = 0; i < carros.length; i++) {
                $('#selectMotor').append('<option value=' + (carros[i]['id']) + '>' + (carros[i]["modelo"]) + '</option>');
            }
        },
        error: function (error) {
            console.log(error);
        }
    });

    $('#btnCadastrarCarro').on('click', function () {
        if ($('#marca_Carro').val() === '' || $('#cor_Carro').val() === '' || $('#nome_Carro').val() === '') {
            alert('Alguns campos não foram preenchidos!');
        } else {
            let newCar = new Object()
            newCar["id"] = carros.length + 1,
            newCar["marca"] = $('#marca_Carro').val(),
            newCar["modelo"] = $('#nome_Carro').val(),
            newCar["cor"] = $('#cor_Carro').val(),
            newCar["motor_id"] = $('#motorCar').val()

            $('#selectMotor').append('<option value=' + (carros.length + 1) + '>' + (newCar["modelo"]) + '</option>'); 

            carros.push(newCar);

            $('#nome_Carro').val('');
            $('#marca_Carro').val('');
            $('#cor_Carro').val('');

            alert('Carro cadastrado com sucesso!');
        }
    });

    $("#selectMotor").on('change', function () {
       
        if ($('#selectMotor').val() === 'SelecionarCarro') {
            $("#marcaCarro").val('');
            $("#modeloCarro").val('');
            $("#corCarro").val('');
            $("#motorCarro").val('');
            $("#cilindroCarro").val('');
            $("#IdCarro").val('');
            $("#litragemCarro").val('');
            $("#posicaoCarro").val('');
            $("#obsCarro").addClass('d-none')
        }

        for (let i = 0; i < carros.length; i++) { 
            if (carros[i]["id"] === parseInt($("#selectMotor").val())) {
                $("#IdCarro").val(carros[i]["id"]);
                $("#marcaCarro").val(carros[i]["marca"]);
                $("#modeloCarro").val(carros[i]["modelo"]);
                $("#corCarro").val(carros[i]["cor"]);
                $("#motorCarro").val(carros[i]["motor_id"]);

                
                for (let y = 0; y < motores.length; y++) { 
                    if (carros[i]['motor_id'] == motores[y]['id']) {

                        $("#cilindroCarro").val(motores[y]["cilindros"]);
                        $("#id").val(motores[y]["id"]);
                        $("#litragemCarro").val(motores[y]["litragem"]);
                        $("#posicaoCarro").val(motores[y]["posicionamento_cilindros"]);

                        if (motores[y]["observacao"] != null) {
                            $("#observacaoCarro").removeClass('d-none');
                            $("#obsCarro").val(motores[y]["observacao"]);
                        } else {
                            $("#obsCarro").addClass('d-none');
                        }
                    }
                }
            }
        }

        $('#removeCarro').on('click', function () { 
            $('#RemoveCar').removeClass('d-none');
            $('#selectMotor option[value=' + ($('#selectMotor').val()) + ']' ).remove();
            $('#marcaCarro').val('');
            $('#modeloCarro').val('');
            $('#corCarro').val('');
            $('#motorCarro').val('');
            $('#cilindroCarro').val('');
            $('#IdCarro').val('');
            $('#litragemCarro').val('');
            $('#posicaoCarro').val('');
            $('#obsCarro').val('');
            $('#observacaoCarro').addClass('d-none');
        });
    });
});