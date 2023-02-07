const readline = require('readline');
const { exec, spawn } = require('child_process');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.prompt()
console.log('Bienvenue sur le shell');

rl.on('line', (line) => {
    //Pour sortir du shell
    if (line === 'exit') {
        process.exit();
    
    //pour changer de répertoire
    } else if (line.startsWith('cd ')) {
        let directory = line.slice(3);
        if (!directory) {
            console.error('Veuillez indiquer un chemin');
            rl.prompt();
            return;
        }
        try {
            process.chdir(directory);
            console.log(`Répertoire de travail dorénavant: ${process.cwd()}`);
        } catch (error) {
            console.error(`Erreur: ${error}`);
        }
    
   
    //pour tuer, mettre en pause ou reprendre un processus
    } else if (line.includes('bing')) {
        split = line.split(' ');
        action = split[1];
        pid = split[2];
        switch (action) {
            case "[-k]":
                output = spawn('kill', [pid]);                                
                console.log('Le processus est tué',);
                break;
            case "[-p]":
                output = spawn('kill', ['-STOP', pid]);
                console.log('Le processus est stoppé',);
                break;
            case "[-c]":
                output = spawn('kill', ['-CONT', pid]);
                console.log('Le processus continue',);
                break;
            default:
                console.log("Action invalide");
          }
          return;
    
    //pour lister les processus en cours
    } else if (line == 'lp') {
        exec('ps -e', (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
        });

    // pour lire, écrire, concaténer du texte
    } else if (line.includes('cat')) {
        programme = line.slice(0);
        exec(programme, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
        });

    // pour détacher un processus   
    } else if (line.includes('keep')) {
        split = line.split(' ');
        programme = "start "+split[1];
        exec(programme, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
        });

    // // pour obtenir de l'aide  
    // } else if (line.includes('help')) {
    //     programme = line
    //     exec(programme, (error, stdout, stderr) => {
    //         if (error) {
    //             console.error(`exec error: ${error}`);
    //             return;
    //         }
    //         console.log(`stdout: ${stdout}`);
    //         console.log(`stderr: ${stderr}`);
    //     });
    };
    rl.prompt();
});