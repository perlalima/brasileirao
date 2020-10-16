import { promises as fs } from "fs";

const times = [];

init();

async function init() {
    try {
        const rodadas = JSON.parse(await fs.readFile("2003.json"));

        //inicializar array de times
        rodadas[0].partidas.forEach(partida => {
            times.push({ time: partida.mandante, pontuacao: 0 });
            times.push({ time: partida.visitante, pontuacao: 0 });
        });

        //preencher a pontuacao dos times no array
        rodadas.forEach(rodada => {
            rodada.partidas.forEach(partida => {
                const timeMandante = times.find(item => item.time === partida.mandante);
                const timeVisitante = times.find(item => item.time === partida.visitante);

                if (partida.placar_mandante > partida.placar_visitante) {
                    //+3 pontos para o mandante
                    timeMandante.pontuacao += 3;
                } else if (partida.placar_visitante > partida.placar_mandante) {
                    //+3 pontos para o visitante
                    timeVisitante.pontuacao += 3;
                } else {
                    //+1 ponto para cada um dos times
                    timeMandante.pontuacao += 1;
                    timeVisitante.pontuacao += 1;
                }
            });
        });

        times.sort((a, b) => {
            return b.pontuacao - a.pontuacao;
        });

        await salvaTimes();
        await salvaQuatroPrimeiros();

        let timeMaiorNome = "";
        let timeMenorNome = times[0].time;
        times.forEach(item => {
            if (item.time.length > timeMaiorNome.length) {
                timeMaiorNome = item.time;
            }
            if (item.time.length < timeMenorNome.length) {
                timeMenorNome = item.time;
            }
        });
        
        console.log(timeMaiorNome);
        console.log(timeMenorNome);
        
        const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        /*array.forEach(async x => {
            console.log(await teste(x));
        });*/
        /*for (const x of array) {
            console.log(await teste(x));
        }*/
        for (let i = 0; i < array.length; i++) {
            console.log(await teste(array[i]));
        }

        /*console.log(array);
        console.log(array.splice(0, 4));
        console.log(array);*/
    } catch (err) {
        console.log(err);
    }
}

async function salvaTimes() {
    await fs.writeFile("times.json", JSON.stringify(times, null, 2));
}

async function salvaQuatroPrimeiros() {
    await fs.writeFile("quatroPrimeiros.json", JSON.stringify(times.slice(0, 4), null, 2));
}

function teste(number) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(number);
        }, Math.random() * 1000);        
    });
}

/*console.log("1");
fs.readFile("2003.json").then(data => {
    //console.log(JSON.parse(data));
    console.log("2");
}).catch(err => {
    console.log(err);
});
console.log("3");*/