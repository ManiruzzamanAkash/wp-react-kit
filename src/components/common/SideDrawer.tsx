import { createPortal, useCallback, useEffect, useRef } from '@wordpress/element';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { close } from '@wordpress/icons';
import {
    useFocusOnMount,
    useFocusReturn,
    useMergeRefs,
} from '@wordpress/compose';
import type { ReactNode } from 'react';
import './side-drawer.scss';

type SideDrawerProps = {
    isOpen: boolean;
    title: string;
    onClose: () => void;
    shouldCloseOnClickOutside?: boolean;
    shouldCloseOnEsc?: boolean;
    footer: ReactNode;
    children: ReactNode;
};

export default function SideDrawer( {
    isOpen,
    title,
    onClose,
    shouldCloseOnClickOutside = true,
    shouldCloseOnEsc = true,
    footer,
    children,
}: SideDrawerProps ) {
    const drawerRef = useRef< HTMLDivElement >( null );
    const focusOnMountRef = useFocusOnMount( isOpen );
    const focusReturnRef = useFocusReturn();
    const mergedRef = useMergeRefs( [
        drawerRef,
        focusOnMountRef,
        focusReturnRef,
    ] );

    useEffect( () => {
        if ( ! isOpen ) {
            return;
        }

        document.body.classList.add( 'jobplace-side-drawer-open' );

        return () => {
            document.body.classList.remove( 'jobplace-side-drawer-open' );
        };
    }, [ isOpen ] );

    const onKeyDown = useCallback(
        ( event: React.KeyboardEvent ) => {
            if ( shouldCloseOnEsc && event.key === 'Escape' ) {
                event.preventDefault();
                onClose();
            }
        },
        [ shouldCloseOnEsc, onClose ]
    );

    const onOverlayClick = useCallback( () => {
        if ( shouldCloseOnClickOutside ) {
            onClose();
        }
    }, [ shouldCloseOnClickOutside, onClose ] );

    if ( ! isOpen ) {
        return null;
    }

    return createPortal(
        <div
            className="jobplace-side-drawer-overlay"
            onClick={ onOverlayClick }
            onKeyDown={ onKeyDown }
        >
            <div
                ref={ mergedRef }
                className="jobplace-side-drawer"
                role="dialog"
                aria-modal="true"
                aria-label={ title }
                onClick={ ( event ) => event.stopPropagation() }
            >
                <header className="jobplace-side-drawer__header">
                    <h2 className="jobplace-side-drawer__title">{ title }</h2>
                    <Button
                        icon={ close }
                        label={ __( 'Close', 'jobplace' ) }
                        onClick={ onClose }
                    />
                </header>
                <div className="jobplace-side-drawer__body">{ children }</div>
                <footer className="jobplace-side-drawer__footer">{ footer }</footer>
            </div>
        </div>,
        document.body
    );
}
