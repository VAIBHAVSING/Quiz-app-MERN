import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export function Test() {
  const [value, setvalue] = React.useState([{ name: "vaibhav", age: 18 }, { name: "abhi", age: 18 }, { name: "golu", age: 18 }]);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateTimePicker']}>
        <DateTimePicker label="Basic date time picker" />
      </DemoContainer>
    </LocalizationProvider>
  );
}

function InputQuestion({ id }) {
  const [value, setvalue] = useRecoilState(Questions);

  const handleQuestionChange = (field, fieldValue) => {
    setvalue((oldValue) => {
      const updatedValue = [...oldValue];
      updatedValue[id] = { ...updatedValue[id], [field]: fieldValue };
      return updatedValue;
    });
  };

  const newValue = value[id];

  return (
    <div key={id}>
      <div>{id}</div>
      <InputComponent label={"Question"} placeholder={"Who is the PM of India"} value={newValue.Q} onChange={(e) => handleQuestionChange('Q', e.target.value)} />
      <InputComponent label={"OPTION A"} placeholder={"Amit Shah"} value={newValue.A} onChange={(e) => handleQuestionChange('A', e.target.value)} />
      <InputComponent label={"OPTION B"} placeholder={"Narendra Modi"} value={newValue.B} onChange={(e) => handleQuestionChange('B', e.target.value)} />
      <InputComponent label={"OPTION C"} placeholder={"Arvind Kejriwal"} value={newValue.C} onChange={(e) => handleQuestionChange('C', e.target.value)} />
      <InputComponent label={"OPTION D"} placeholder={"Rahul Gandhi"} value={newValue.D} onChange={(e) => handleQuestionChange('D', e.target.value)} /> <br />
      <div className="flex justify-center"><AddButton label={"Update Question"} onClick={handleQuestionChange} /></div>
      <AddButton label={"print"} onClick={() => { console.log(value); }} />
      <br />
    </div>
  );
}