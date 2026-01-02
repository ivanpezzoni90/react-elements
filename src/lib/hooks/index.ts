import React, {useState, useEffect} from 'react';
import { ChangeEditorPropType } from '../types';

export function useEditorInit (defaultProps: any) {
    const [
        props, setProps
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
}

export const useComputedZIndex = (ref: React.RefObject<Element | null>) => {
    const [
        zIndex, setZIndex
    ]: [
        zIndex: number,
        setZIndex: (s: number) => void
    ] = useState(0);

    useEffect(() => {
        if (ref.current) {
            const style = window.getComputedStyle(ref.current);
            const computedZIndex = style.zIndex;
            if (computedZIndex !== 'auto') {
                setZIndex(parseInt(computedZIndex, 10) +1);
            }
            setZIndex(1);
        }
    }, [ref]);

    return zIndex;
};

export const useComputedWidth = (ref: React.RefObject<Element | null>) => {
    const [
        width, setWidth
    ]: [
        width: string,
        setWidth: (s: string) => void
    ] = useState('');

    useEffect(() => {
        if (ref.current) {
            const style = window.getComputedStyle(ref.current);
            const computedWidth = style.width;
            setWidth(computedWidth);
        }
    }, [ref]);

    return width;
};

export const useInputValue = (ref: React.RefObject<HTMLInputElement | null>, defaultValue: string) => {
    const [value, setValue] = useState(defaultValue);
    useEffect(() => {
        if (ref.current) {
            setValue(ref.current.getAttribute('value') as string);
        }
    }, [ref]);
    return value;
};


export const useBodyFontSize = () => {
    const bodyEl = document.getElementsByTagName('body').item(0);
    if (bodyEl) {
        const fontSize = window.getComputedStyle(bodyEl, null).getPropertyValue('font-size');
        const parsedFontSize = parseFloat(fontSize);
        return parsedFontSize;
    }
    // Fallback to default font size
    return 16;
};

export function useClickOutside (
    ref: React.RefObject<HTMLDivElement | null>,
    cb: VoidFunction,
    exceptions?: React.RefObject<Element | null>[]
) {
    useEffect(() => {
        function handleClickOutside(event: CustomEvent) {
            // When event target (where the user clicked) is not the current ref
            if (ref.current && !ref.current.contains(event.target as Node)) {
                // When event target is not one of the given exception refs
                if (
                    exceptions
                    && exceptions.some(
                        e => e.current && !e.current.contains(event.target as Node)
                    )
                ) {
                    cb();
                } else if (!exceptions || exceptions.length === 0) {
                    // When no exceptions are specified, call cb
                    cb();
                }
            }
        }
        document.addEventListener('mousedown', handleClickOutside as EventListener);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside as EventListener);
        };
    }, [ref, cb, exceptions]);
}
