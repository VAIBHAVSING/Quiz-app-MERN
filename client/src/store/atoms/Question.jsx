import { atom, selector } from 'recoil';

export const Questions = atom({
    key: "Questions",
    default: [{ Q: '', A: '', B: '', C: '', D: '',ANS:''}]
});


export const QuestionCountSelector = selector({
    key: 'QuestionCountSelector',
    get: ({ get }) => {
        const questions = get(Questions);
        return questions.length;
    }
});
