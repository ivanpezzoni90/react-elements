import { useRef, useState } from 'react';
// import Select from 'react-select';
import { generateID } from '../helpers';
import { Option as OptionType } from '../types';
import Element from './Element';

function Select(props: {
    options: Array<OptionType>,
    value: string | Array<string>,
    onChange: Function,
    label?: string,
    labelPosition?: string
}) {
    const {
        options,
        value: valueFromProps,
        label = '',
        labelPosition,
        onChange
    } = props;

    const [value, setValue] = useState(valueFromProps);

    function onSelectChange(e: any) {
        const newValue = e.target.value;
        setValue(newValue);
        onChange(newValue);
    };

    const id = useRef(generateID());

    return (
        <Element
            id={id.current}
            label={label}
            labelPosition={labelPosition}
        >
            <select
                value={value}
                onChange={onSelectChange}
            >
                {options.map((o: OptionType) => (
                    <option value={o.value}>{o.label}</option>
                ))}
            </select> 
         </Element>
    )
}

Select.defaultProps = {
    options: [],
    value: '',
    label: 'Label',
    labelPosition: undefined,
    onChange: () => {}
}

export default Select;
