import React, {useState} from 'react';
import "../../styles/LandscapePanel.css"

const LandscapePanel = ({changeInstruments}) => {
    const address = "10.244.204.9"
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedForm, setSelectedForm] = useState('');
    const [inputs, setInputs] = useState([
        {value: '', type: "Poor"},
        {value: '', type: "Middle"},
        {value: '', type: "Park"},
        {value: '', type: "Market"},
        {value: '', type: "Square"},
        {value: '', type: "Industrial"},
        {value: '', type: "Rich"}
    ]);


    const handleSelectSizeChange = (event) => {
        if (event.target.value !== null){
            setSelectedSize(event.target.value);
        }
        else {
            setSelectedSize('small')
        }

    };
    const handleSelectFormChange = (event) => {
        if (event.target.value !== null){
            setSelectedForm(event.target.value);
        }
        else {
            setSelectedForm('square');
        }
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
    const changeMode = () => {
        changeInstruments(prevState => ({
            ...prevState,
            landscape: "generating",
        }))
    }

    const generateCity = () => {
        let size
        switch (selectedSize) {
            case 'small':
                size = 200
                break
            case 'middle':
                size = 400
                break
            case 'big':
                size = 600
                break
            default:
                size = 200
                break
        }

        console.log(selectedSize)
        console.log(selectedForm)
        console.log(inputs)
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                shape: selectedForm,
                start: [400, 400],
                sideLength: size,
                coloring:{
                    park: inputs[2].value,
                    poor: inputs[0].value,
                    middle:inputs[1].value,
                    industrial:inputs[4].value,
                    market:inputs[3].value,
                    square:inputs[5].value,
                    rich:inputs[6].value
                }
            })
        };
        fetch(`http://${address}:8000/generate`, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
    }

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
            <button onClick={() => generateCity()}>Generate city</button>
            <button onClick={() => changeMode()}>Generate quarter</button>
        </div>
    );
};

export default LandscapePanel;