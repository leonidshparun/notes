import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

function createRootElement(id: string): HTMLElement {
    const rootContainer = document.createElement('div');
    rootContainer.setAttribute('id', id);
    return rootContainer;
}

function addRootElement(rootElem: HTMLElement) {
    if (document.body.lastElementChild) {
        document.body.insertBefore(
            rootElem,
            document.body.lastElementChild.nextElementSibling,
        );
    }
}

function usePortal(id: string): HTMLElement {
    const rootElemRef = useRef<HTMLElement | undefined>(undefined);

    useEffect(
        function setupElement() {
            const existingParent = document.getElementById(id);
            const parentElem = existingParent || createRootElement(id);

            if (!existingParent) {
                addRootElement(parentElem);
            }

            parentElem.appendChild(rootElemRef.current!);

            return function removeElement() {
                rootElemRef.current?.remove();
                if (!parentElem.childElementCount) {
                    parentElem.firstChild?.remove();
                }
            };
        },
        [id],
    );

    function getRootElem() {
        if (!rootElemRef.current) {
            rootElemRef.current = document.createElement('div');
        }
        return rootElemRef.current;
    }

    return getRootElem();
}

const Portal = ({ id, children }: { children: JSX.Element; id: string }) => {
    const target = usePortal(id);
    return createPortal(children, target);
};

export default Portal;
