/**
 * @file 状态提升
 * https://zh-hans.reactjs.org/docs/lifting-state-up.html
 */
import React from 'react';
import { rootRender } from '../common/rootRender';

function toCelsius(fahrenheit: number) {
    return ((fahrenheit - 32) * 5) / 9;
}
function toFahrenheit(celsius: number) {
    return (celsius * 9) / 5 + 32;
}
function tryConvert(temperature: string, convert: typeof toCelsius | typeof toFahrenheit) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
        return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}
// tryConvert('abc', toCelsius); // ''
// tryConvert('10.22', toFahrenheit) // '50.396'

function BoilingVerdict({ celsius }: { celsius: number }) {
    if (celsius >= 100) {
        return <p>The water would boil.</p>;
    }
    return <p>The water would not boil.</p>;
}

type TemperatureInputProps = {
    scale: ScaleNames;
    temperature: string;
    onTemperatureChange: Function;
};

enum ScaleNames {
    c = 'Celsius',
    f = 'Fahrenheit',
}
class TemperatureInput extends React.Component<TemperatureInputProps> {
    constructor(props: TemperatureInputProps) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.props.onTemperatureChange(e.target.value);
        this.setState({ temperature: e.target.value });
    }

    render() {
        const temperature = this.props.temperature;
        const scale = this.props.scale;
        return (
            <fieldset>
                <legend>Enter temperature in {scale}:</legend>
                <input value={temperature} onChange={this.handleChange} />
            </fieldset>
        );
    }
}

type CalculatorState = {
    temperature: string;
    scale: ScaleNames;
};
class Calculator extends React.Component<{}, CalculatorState> {
    constructor(props: {}) {
        super(props);
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
        this.state = { temperature: '', scale: ScaleNames['c'] };
    }
    handleCelsiusChange(temperature: string) {
        this.setState({ scale: ScaleNames['c'], temperature });
    }

    handleFahrenheitChange(temperature: string) {
        this.setState({ scale: ScaleNames['f'], temperature });
    }
    render() {
        const scale = this.state.scale;
        const temperature = this.state.temperature;
        const celsius = scale === ScaleNames['f'] ? tryConvert(temperature, toCelsius) : temperature;
        const fahrenheit = scale === ScaleNames['c'] ? tryConvert(temperature, toFahrenheit) : temperature;
        return (
            <React.Fragment>
                <BoilingVerdict celsius={+celsius} />
                <TemperatureInput scale={ScaleNames['c']} temperature={celsius} onTemperatureChange={this.handleCelsiusChange} />
                <TemperatureInput scale={ScaleNames['f']} temperature={fahrenheit} onTemperatureChange={this.handleFahrenheitChange} />
            </React.Fragment>
        );
    }
}

rootRender(document.getElementById('root2_10') || document.body, <Calculator />);
