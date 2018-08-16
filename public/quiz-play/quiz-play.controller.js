import "bootstrap";
import '../assets/scss/index.scss';


import FirebaseDBOpeations from '../firebase/firebase-db.service.js';

let firebaseDBOperations = new FirebaseDBOpeations();



const populatesocreboardPage = (socketCustom) => {
    document.getElementById("quizHeader").innerHTML = "ScoreBoard";
    const ScoreBoardHTML = `
       <section class="leaderboard">
           <table class="table-fill">
               <thead>
                   <tr>
                       <th class="rank__title">Rank</th>
                       <th class="Name__title">Name</th>
                       <th class="score__title">Score</th>
                   </tr>
               </thead>
               <tbody id="leaderboard">
               </tbody>
           </table>
       </section>`;
    document.getElementById("gamePage").innerHTML = ScoreBoardHTML;
    socreboardRender(socketCustom);
}

function socreboardRender(socketCustom) {
    socketCustom.on('gameEnded', function (data) {
        console.log("game id is: " + data.gameId);
        firebaseDBOperations.readAllGamesById(data.gameId).then(function (data) {
            for (let key in data) {
                var a = data[key];
            }
            a.players.sort(function (ply1, ply2) {
                return ply2.score - ply1.score
            })
            var tableRef = document.querySelector('.table-fill').getElementsByTagName('tbody')[0];
            for (var i = 0; i < a.players.length; i++) {
                var tr = document.createElement('tr');
                for (var j = 0; j < 3; j++) {
                    if (j == 0) {
                        var td = document.createElement('td');
                        td.appendChild(document.createTextNode(i + 1));
                        tr.appendChild(td)
                    } else if (j == 1) {
                        var td = document.createElement('td');
                        td.appendChild(document.createTextNode(a.players[i].name));
                        tr.appendChild(td)
                    } else {
                        var td = document.createElement('td');
                        td.appendChild(document.createTextNode(a.players[i].score));
                        tr.appendChild(td)
                    }
                }
                tableRef.appendChild(tr);
            }
        });
    });

}

module.exports = {
    populatesocreboardPage: populatesocreboardPage
}