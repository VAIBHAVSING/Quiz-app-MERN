import { atom, selector } from 'recoil';

export const testheader = atom({
    key: "testheader",
    default: [{
        _id: ''
        , Title: "",
        description: "",
        starttime: "",
        endtime: "",
        Duration: 10,
        live: 10
    }]
});
export const index=atom({
    key:'index',
    default:0
});
export const Duration=atom({
    key:'Duration',
    default:0
});
export const Questionanswer=atom({
    key:'Questionanswer',
    default:[{questionid:"",respond:""}]
});
