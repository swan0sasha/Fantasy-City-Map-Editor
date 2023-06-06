import React, {useState} from 'react';
import "../../styles/LandscapePanel.css"

const LandscapePanel = () => {
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedForm, setSelectedForm] = useState('');
    const [inputs, setInputs] = useState([
        {value: '', type: "Poor"},
        {value: '', type: "Middle"},
        {value: '', type: "Park"},
        {value: '', type: "Market"},
        {value: '', type: "Square"},
        {value: '', type: "Industrial"}
    ]);


    const handleSelectSizeChange = (event) => {
        setSelectedSize(event.target.value);
    };
    const handleSelectFormChange = (event) => {
        setSelectedForm(event.target.value);
    };
    const handleInputChange = (index, event) => {
        const newInputs = [...inputs];
        newInputs[index].value = event.target.value;

        // Проверяем сумму значений полей
        const sum = newInputs.reduce((accumulator, input) => {
            const parsedValue = parseFloat(input.value);
            return isNaN(parsedValue) ? accumulator : accumulator + parsedValue;
        }, 0);

        // Если сумма превышает 1, обнуляем текущее поле
        if (sum > 1) {
            newInputs[index].value = '';
        }

        setInputs(newInputs);
    };
    return (
        <div className="landscapePanel">
            <div>Enter parameters for city generation</div>
            <select value={selectedSize} onChange={handleSelectSizeChange}>
                <option value="small">Small city</option>
                <option value="middle">Middle city</option>
                <option value="big">Big city</option>
            </select>
            <select value={selectedForm} onChange={handleSelectFormChange}>
                <option value="square">Square</option>
                <option value="circle">Circle</option>
                <option value="rhombus">Rhombus</option>
                <option value="cross">Cross</option>
            </select>
            <div>Priorities</div>
            {inputs.map((input, index) => (
                <input
                    key={index}
                    type="number"
                    placeholder={input.type}
                    step="0.01"
                    min="0"
                    max="1"
                    value={input.value}
                    onChange={(event) => handleInputChange(index, event)}
                />
            ))}
        </div>
    );
};

export default LandscapePanel;