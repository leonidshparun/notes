import Portal from 'components/portal/portal';
import React, { useRef, useState } from 'react';
import { isMobile } from 'services/utils';
import styles from './tooltip.module.scss';

interface IRect extends HTMLDivElement {
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

type ToolTipProps = {
    children: JSX.Element;
    tip: string;
};

const Tooltip = ({ children, tip }: ToolTipProps) => {
    const ref = useRef<IRect>(null);

    const [isVisible, setVisibility] = useState(false);
    const [style, setStyle] = useState<IStyle>();
    const [delayHandler, setDelayHandler] = useState<NodeJS.Timeout>();

    const showToolTip = () => {
        if (isMobile()) return;
        const calcPosition = (dimensions: IDimensions | undefined) => {
            if (dimensions) {
                const space = 10;
                const tipWidth = tip.length * 6.7 + space;
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
                    style.top = dimensions.top + dimensions.height;
                } else {
                    style.bottom = window.innerHeight - dimensions.top + space;
                }
                setStyle(style);
            }
        };

        calcPosition(ref.current?.getBoundingClientRect());
        setVisibility(true);
    };

    const hideToolTip = () => {
        setVisibility(false);
    };

    const handleMouseEnter = () => {
        setDelayHandler(setTimeout(() => showToolTip(), 200));
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

            {isVisible && !isMobile() && (
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
