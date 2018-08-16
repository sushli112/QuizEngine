import C from './constants';

export const allGames = (currentstate, action) => {
    let cstate = currentstate;
    switch (action.type) {
        case C.START_WAIT:
            cstate.players = action.payload;
            cstate.action = action.type;
            return cstate;
        case C.START_GAME:
            cstate.quesList = action.Queslist;
            cstate.action = action.type;
            cstate.socketCustom = action.socketCustom;
            return cstate;
        case C.ACTIVE_USER:
            cstate.activeUser= action.payload;
            cstate.action= action.type;
            cstate.score=0;
            cstate.answersList=[];
            return cstate;
        case C.ANSWER:
            let ansarr=cstate.answersList.concat(action.payload);
            cstate.answersList= ansarr;
            cstate.action= action.type;
            return cstate;
        case C.SCORE:        
            cstate.score= action.payload;
            cstate.action= action.type;
            return cstate;
        case C.GAME_ID:        
            cstate.gameId= action.payload;
            cstate.action= action.type;
            return cstate;
        case C.GAME_OVER:        
            cstate.action= action.type;
            return cstate;  
        case C.GET_LIVE_SCORE:
            cstate.playerScore = action.payload;
            cstate.action= action.type;
            return cstate;          
        default:
            return cstate;
    }
};

export default allGames;

