import {useState} from 'react';

export const useEditorInit = (defaultProps: Object) => {
    const [
        props, setProps
    ]: [
        props: any, setProps: Function
    ] = useState(defaultProps);

    const onChangeProp = (prop: string, value: string | boolean | Array<string>) => {
        setProps(Object.assign({}, props, {
            [prop]: value
        }));
    };

    return {
        onChangeProp,
        props
    };
};