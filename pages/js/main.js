$(document).ready(function () {
    //Buscar estados
    $.ajax({
        url: 'https://dadosabertos.camara.leg.br/api/v2/referencias/uf',
        type: 'GET',
        success: function(data){ 
            var estados = '';
            $.each(data['dados'],function(i,estado){                    
                estados += '<option value="'+ estado.sigla +'">'+ estado.nome +'</option>';                
            });
            $('#lista-estados').append(estados);
        },
        error: function(data) {
            console.log('Não foi possível buscar os estados.')
        }
    });

    //Busca deputado por sigla
    $("#lista-estados").on('change', function () {
        var sigla = $(this).val();
        $.ajax({
            url: 'https://dadosabertos.camara.leg.br/api/v2/deputados?siglaUf='+sigla+'&ordem=ASC&ordenarPor=nome',
            type: 'GET',
            success: function(data){                 
                var lista = '';                
                $.each(data['dados'],function(i,dep){                    
                    lista += '<tr><td scope="row"><a href="info.html" title="">'+ dep.nome +'</a></td><td>'+ dep.siglaPartido +'</td><td>'+ dep.siglaUf +'</td><td></td></tr>';
                });
                $("#tabela-resultados tbody").empty();
                $("#tabela-resultados tbody").append(lista);
                $("#tabela-resultados").show();
            },
            error: function(data) {
                console.log('Não foi possível buscar os deputados.')
            }
        });
    });

    //Busca deputado por nome
    $("#buscar").on('click', function () {
        var nome = $('.search-input').val();
        $.ajax({
            url: 'https://dadosabertos.camara.leg.br/api/v2/deputados?nome='+nome+'&ordem=ASC&ordenarPor=nome',
            type: 'GET',
            success: function(data){  
                var lista = '';                
                $.each(data['dados'],function(i,dep){                    
                    lista += '<tr><td scope="row"><a href="info.html" title="">'+ dep.nome +'</a></td><td>'+ dep.siglaPartido +'</td><td>'+ dep.siglaUf +'</td><td></td></tr>';
                });
                $("#tabela-resultados tbody").empty();
                $("#tabela-resultados tbody").append(lista);
                $("#tabela-resultados").show();
            },
            error: function(data) {
                console.log('Não foi possível buscar os deputados.')
            }
        });
    });
});