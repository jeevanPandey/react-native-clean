import {InitialGlobalState} from "./initial-global-state";

export const globalStateReducer=(state=InitialGlobalState.generate(), action)=>{

    switch(action.type){
        case 'SIGNIN':
            if(action.model.status==='submitted-success'){
                state.homeViewModel.signedIn=true;
            }else{
                state.homeViewModel.signedIn=false;
            }
            return {
                ...state,
                authModel:action.model,
                signInViewModel:action.vm(action.model)
            };
        case 'INITSIGNIN':
            return {...state,signInViewModel:action.vm()};
        default:
            return state;
    }

};