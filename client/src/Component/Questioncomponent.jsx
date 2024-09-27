export const QuestionComponent = ({ question,index}) => {
    const getOptionColor = (option, question) => {
        if (question.isCorrect) {
            if (question.selectedOption === option) {
                return 'green'; // Correct option
            } else {
                return ''; // Incorrect option
            }
        } else {
            if (question.correctAnswer === option) {
                return 'skyblue'; // Correct answer
            }
            else if(question.selectedOption===option){
                return 'red'; // Incorrect option
            } else {
                return ''; // Other options
            }
        }
    };

    return (
        <div className="xl:mx-48 mb-2 bg-[#D1F3DF]">
            <h3 className="pl-6">Q {index+1}) {question.question}</h3>
            <ul>
                {Object.entries(question.options).map(([key, value]) => (
                    <li key={key}>
                       
                        <div className="pl-6 border-2 border-r-4 mb-2" style={{ background: getOptionColor(key, question) }} >
                            {value}
                        </div>
                    </li>
                ))}
            </ul>
            
        </div>
    );
};
