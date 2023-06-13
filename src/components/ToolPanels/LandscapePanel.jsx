import React, {useState} from 'react';
import "../../styles/LandscapePanel.css"

const LandscapePanel = ({changeInstruments}) => {
    const address = "10.244.204.9"
    const [selectedSize, setSelectedSize] = useState('small');
    const [selectedForm, setSelectedForm] = useState('square');
    const [inputs, setInputs] = useState([
        {value: '0', type: "Poor"},
        {value: '1', type: "Middle"},
        {value: '0', type: "Park"},
        {value: '0', type: "Market"},
        {value: '0', type: "Square"},
        {value: '0', type: "Industrial"},
        {value: '0', type: "Rich"}
    ]);


    const handleSelectSizeChange = (event) => {
        if (event.target.value !== null) {
            setSelectedSize(event.target.value);
        } else {
            setSelectedSize('small')
        }

    };
    const handleSelectFormChange = (event) => {
        if (event.target.value !== null) {
            setSelectedForm(event.target.value);
        } else {
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

    // const setEquals = () => {
    //     inputs.map((input, index) => (
    //         <input
    //             key={index}
    //             value={0.142}
    //             onChange={(event) => handleInputChange(index, event)}
    //         />
    //     ))
    // }
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
        let startCords = []
        switch (selectedForm) {
            case 'square':
                startCords = [400, 200]
                break
            case 'rhombus':
                startCords = [400, 400]
                break
            case 'cross':
                startCords = [500, 500]
                break
            default:
                startCords = [400, 400]
                break
        }
        console.log("Size:")
        console.log(selectedSize)
        console.log("Form:")
        console.log(selectedForm)
        // console.log(inputs)
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                shape: selectedForm,
                start: startCords,
                sideLength: size,
                coloring: {
                    park: inputs[2].value,
                    poor: inputs[0].value,
                    middle: inputs[1].value,
                    industrial: inputs[4].value,
                    market: inputs[3].value,
                    square: inputs[5].value,
                    rich: inputs[6].value
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
            {/*<button onClick={() => setEquals()}>Set equal</button>*/}
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