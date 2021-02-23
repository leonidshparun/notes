import Portal from 'components/portal/portal';
import React, { useRef, useState } from 'react';
import styles from './tooltip.module.scss';

interface IRect extends HTMLDivElement {
    width: number;
    left: number;
    top: number;
    bottom: number;
}

interface ISpan extends HTMLSpanElement {
    width: number;
    left: number;
    top: number;
    bottom: number;
}

interface IDimensions extends DOMRect {
    width: number;
    left: number;
    top: number;
    bottom: number;
    height: number;
}

interface IStyle {
    width: number | string;
    left: number;
    top: number;
    bottom: number;
}

const Tooltip = ({ children, tip }: { children: JSX.Element; tip: string }) => {
    const ref = useRef<IRect>(null);
    const space = 10;

    const [isVisible, toggleVisibility] = useState(false);

    const [style, setStyle] = useState<IStyle>();

    const [delayHandler, setDelayHandler] = useState<NodeJS.Timeout>();

    const showToolTip = () => {
        const tipWidth = tip.length * 6.7 + 10;
        const setPosition = (dimensions: IDimensions | undefined) => {
            if (dimensions && tipWidth) {
                const style = {
                    width: 'auto',
                    height: dimensions.height,
                    left: dimensions.left,
                    top: dimensions.top,
                    bottom: dimensions.bottom,
                };
                style.left = dimensions.left + dimensions.width / 2 - tipWidth / 2;
                style.left = Math.max(space, style.left);
                style.left = Math.min(
                    style.left,
                    document.body.clientWidth - tipWidth - space,
                );

                if (dimensions.top < window.innerHeight / 2) {
                    style.top = dimensions.top + dimensions.height + space;
                } else {
                    style.bottom = window.innerHeight - dimensions.top + space;
                }
                setStyle(style);
            }
        };

        setPosition(ref.current?.getBoundingClientRect());
        toggleVisibility(true);
    };

    const hideToolTip = () => {
        toggleVisibility(false);
    };

    const handleMouseEnter = () => {
        setDelayHandler(
            setTimeout(() => {
                showToolTip();
            }, 200),
        );
    };

    const handleMouseLeave = () => {
        hideToolTip();
        clearTimeout(delayHandler!);
    };

    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={styles.container}
            ref={ref}
        >
            {children}

            {isVisible && (
                <Portal id="tip">
                    <span style={style} className={styles.tip}>
                        {tip}
                    </span>
                </Portal>
            )}
        </div>
    );
};

export default Tooltip;
