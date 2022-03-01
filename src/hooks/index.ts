import {useState} from 'react';
import { ChangeEditorPropType, PropsObjectInterface, SetPropsToStateType } from '../types';

export const useEditorInit = (defaultProps: PropsObjectInterface) => {
    const [
        props, setProps
    ]: [
        props: PropsObjectInterface, setProps: SetPropsToStateType
    ] = useState(defaultProps);

    const onChangeProp: ChangeEditorPropType = (prop: string, value: string | boolean | Array<string>) => {
        setProps(Object.assign({}, props, {
            [prop]: value
        }));
    };

    return {
        onChangeProp,
        props
    };
};