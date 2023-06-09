/* eslint-disable*/


// Troposfera: essa camada se estende até 20 km do solo;
// Estratosfera: a estratosfera chega a 50 km do solo;
// Mesosfera: o topo da mesosfera fica a 80 km do solo;
// Termosfera: o topo da termosfera fica a  450 km acima da Terra;
// Exosfera: a camada superior da atmosfera fica a  900 km acima da Terra.

// TROPOSFERA: caso a nave esteja na troposfera;
// ESTRATOSFERA: caso a nave esteja na estratosfera;
// MESOSFERA: caso a nave esteja na mesosfera;
// TERMOSFERA: caso a nave esteja na termosfera;
// EXOSFERA: caso a nave esteja na exosfera;
function atmosfera(altitude) {
  if (altitude <= 20) {
    return 'TROPOSFERA';
  }
  if (altitude > 20 && altitude <= 50) {
    return 'ESTRATOSFERA';
  }
  if (altitude > 50 && altitude <= 80) {
    return 'Mesosfera';
  }
  if (altitude > 80 && altitude <= 450) {
    return 'TERMOSFERA';
  }
  if (altitude > 450 && altitude <= 900) {
    return 'EXOSFERA';
  }
}

function solucao(olhosNasLaterais) {
  if (olhosNasLaterais === true) {
    return 'PRESA';
  }
  if (olhosNasLaterais === false) {
    return 'PREDADOR';
  }
}

// Peso leve: lutadores com peso mais leve que 55 kg;

// Peso meio-médio:  categoria mais pesada que a anterior e com pesos mais leves que 65 kg;

// peso médio: categoria mais pesada que a anterior e com pesos mais leves que 75 kg;

// Peso meio-pesado: categoria mais pesada que a anterior e com pesos mais leves que 85 kg;

// Peso pesado: pesos maiores ou iguais a 85 kg.

// A regra do evento é: os lutadores só podem lutar com lutadores da mesma categoria.

function UFC(peso1, peso2) {
  const lutadores = [peso1, peso2];
  for (let i = 0; i <= 1; i++) {
    if (lutadores[i] < 55) {
      lutadores[i] = 'Peso leve';
    } else if (lutadores[i] >= 55 && lutadores[i] < 65) {
      lutadores[i] = 'Peso meio-médio';
    } else if (lutadores[i] >= 65 && lutadores[i] < 75) {
      lutadores[i] = 'Peso médio';
    } else if (lutadores[i] >= 75 && lutadores[i] < 85) {
      lutadores[i] = 'Peso meio-pesado';
    } else {
      lutadores[i] = 'Peso pesado';
    }
  }

  return lutadores[0] === lutadores[1] ? 'PODEM LUTAR' : 'NAO PODEM LUTAR';
}

// A única restrição para que uma luta aconteça é que os lutadores tenham
// uma diferença máxima de peso de 5 kg.

// Entrada
// A entrada do seu programa será composta por uma variável chamada pesos, do
// tipo array de number, que armazena, respectivamente, o peso do Lutador A e do Lutador B, ambos em quilogramas, sendo esses os lutadores analisados.

// Saída
// Você deverá retornar:

// PODEM LUTAR: caso a diferença entre os pesos dos lutadores seja
// no máximo de 5 kg;
// NAO PODEM LUTAR: caso a diferença entre os pesos dos lutadores
// seja maior que 5 kg.

function differP(pesos) {
  if (Math.abs(pesos[0] - pesos[1]) <= 5) {
    return 'PODEM LUTAR';
  }
  return 'NAO PODEM LUTAR';
}

function Boss(
  itensColetados,
  itemNecessario1,
  itemNecessario2,
  itemNecessario3
) {
  // seu codigo aqui
  for (const item1 of itensColetados) {
    if (item1 === itemNecessario1) {
      for (const item2 of itensColetados) {
        if (item2 === itemNecessario2) {
          for (const item3 of itensColetados) {
            if (item3 === itemNecessario3) {
              return 'PODE ENFRENTAR';
            }
          }
        }
      }
    }
  }

  return 'NAO PODE ENFRENTAR';
}

// console.log(
//   Boss(
//     [
//       'capa',
//       'arco',
//       'flecha',
//       'machado',
//       'escudo',
//       'comida',
//       'sapato',
//       'capacete',
//       'espada'
//     ],
//     'machado',
//     'espada',
//     'sapato'
//   )
// );

function hourglassSum(arr) {
  // Write your code here
  let sum;
  let result = 0;
  for (let p = 0; p < arr.length - 2; p++) {
    for (let i = 0; i < arr.length - 2; i++) {
      sum = arr[i][p] + arr[i][p + 1] + arr[i][p + 2];
      sum += arr[i + 1][p + 1];
      sum += arr[i + 2][p] + arr[i + 2][p + 1] + arr[i + 2][p + 2];
      console.log(sum);
      if (Math.abs(sum) > Math.abs(result)) {
        result = sum;
      }
    }
  }
  return result;
}

const arr = [
  [0, -4, -6, 0, -7, -6],
  [-1, -2, -6, -8, -3, -1],
  [-8, -4, -2, -8, -8, -6],
  [-3, -1, -2, -5, -7, -4],
  [-3, -5, -3, -6, -6, -6],
  [-3, -6, 0, -8, -6, -7]
];

const myarray = [1, 2, 3, 4, 5];

function rotateLeft(d, arr) {
  const rotate = [];
  let fristP;
  for (let r = 1; r <= d; r++) {
    fristP = arr[0];
    for (let i = 0; i < arr.length; i++) {
      rotate[i] = arr[i + 1];
    }
    rotate[arr.length - 1] = fristP;
    arr = rotate;
  }
  return rotate;
}

// console.log(rotateLeft(4, myarray));
// [5, 1, 2, 3, 4]
