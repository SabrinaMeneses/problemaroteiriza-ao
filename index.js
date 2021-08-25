const readXlsxFile = require("read-excel-file/node");

var lugaresEvitar = [];

var caminho = [];

var kms = 0;

function acharMenorRota(rotas, valorinicial, vezes) {
  var proximo = "";

  var temp = 0;

  var menor = 9999999999999;

  var valorinicial = valorinicial;

  var separada;

  if (vezes == 0) {
    vezes == 1;
    for (x = 1; x <= 157; x++) {
      if (rotas[x][3] < menor) {
        menor = rotas[x][3];
        proximo = rotas[x][0];
      }
    }
    separada = proximo.split("-");
    lugaresEvitar.push(separada[0]);

    kms += menor;
  } else {
    for (x = parseInt(valorinicial); x <= parseInt(valorinicial) + 157; x++) {
      if (rotas[x][3] < menor) {
        var verifica = rotas[x][0].split("-");
        if (!lugaresEvitar.includes(verifica[1])) {
          menor = rotas[x][3];
          proximo = rotas[x][0];
        }
      }
    }

    separada = proximo.split("-");
    lugaresEvitar.push(separada[0]);

    kms += menor;
  }

  caminho.push(`${proximo} => ${menor.toFixed(2)}`);

  proximo = proximo.substring(proximo.indexOf("-") + 1);

  proximo = `${proximo.split("\\-")[0]}-1`;

  for (x = 1; x < rotas.length; x++) {
    temp++;

    if (rotas[x][0] == proximo) {
      if (vezes == 157 - 1) {
        var junto = `${separada[1]}-1`;

        for (y = 1; y < rotas.length; y++) {
          if (rotas[y][0] == junto) {
            menor = rotas[y][3];
          }
        }

        kms += menor;

        caminho.push(`${separada[1]}-1 => ${menor.toFixed(2)}`);

        console.table(caminho);

        console.log("Km : " + kms.toFixed(2));
        break;
      } else {
        vezes++;

        acharMenorRota(rotas, (valorinicial = temp), vezes);

        temp = 0;
      }
    }
  }
}

readXlsxFile("dados.xlsx").then((rotas) => {
  var valorinicial = 157;
  acharMenorRota(rotas, valorinicial, 0);
});
