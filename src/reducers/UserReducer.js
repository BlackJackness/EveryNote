
export default function update(state={},action){
    switch(action.type){
        case 'GET_USER_INFO':
            return {...state,...action.payload};
        break;
    }
    return state;
}

