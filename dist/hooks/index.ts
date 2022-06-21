import {useState, useRef, useEffect} from 'react';
import { ChangeEditorPropType, PropsObjectInterface, SetPropsToStateType } from '../types';

export const useEditorInit = (defaultProps: PropsObjectInterface) => {
    const [
        props, setProps
    ]: [
        props: PropsObjectInterface, setProps: SetPropsToStateType
    ] = useState(defaultProps);

    const onChangeProp: ChangeEditorPropType = (prop, value) => {
        setProps(Object.assign({}, props, {
            [prop]: value
        }));
    };

    return {
        onChangeProp,
        props
    };
};

export const useComputedZIndex = (ref: React.RefObject<Element>) => {
    const [
        zIndex, setZIndex
    ]: [
        zIndex: number,
        setZIndex: (s: number) => void
    ] = useState(0);

    useEffect(() => {
        if (ref !== null) {
            const style = window.getComputedStyle(ref.current as Element);
            const computedZIndex = style.zIndex;
            if (computedZIndex !== 'auto') {
                setZIndex(parseInt(computedZIndex, 10) +1);
            }
            setZIndex(1);
        }
    }, [ref]);

    return zIndex;
};

export const useComputedWidth = (ref: React.RefObject<Element>) => {
    const [
        width, setWidth
    ]: [
        width: string,
        setWidth: (s: string) => void
    ] = useState('');

    useEffect(() => {
        if (ref !== null) {
            const style = window.getComputedStyle(ref.current as Element);
            const computedWidth = style.width;
            setWidth(computedWidth);
        }
    }, [ref]);

    return width;
};