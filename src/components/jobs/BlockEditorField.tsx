/**
 * External dependencies.
 */
import { useEffect, useRef, useState } from '@wordpress/element';
import { useInstanceId } from '@wordpress/compose';
import {
    BlockEditorProvider,
    BlockList,
    BlockTools,
    WritingFlow,
    ObserveTyping,
} from '@wordpress/block-editor';
import { parse, serialize } from '@wordpress/blocks';
// @ts-ignore - registerCoreBlocks is provided by wp-block-library at runtime.
import { registerCoreBlocks } from '@wordpress/block-library';
import { SlotFillProvider, Popover, BaseControl } from '@wordpress/components';
import { ShortcutProvider } from '@wordpress/keyboard-shortcuts';

/**
 * Register the core blocks a single time for the whole app.
 */
let coreBlocksRegistered = false;
const ensureCoreBlocks = () => {
    if ( coreBlocksRegistered || typeof registerCoreBlocks !== 'function' ) {
        return;
    }
    registerCoreBlocks();
    coreBlocksRegistered = true;
};

const ALLOWED_BLOCKS = [
    'core/paragraph',
    'core/heading',
    'core/list',
    'core/list-item',
    'core/quote',
    'core/separator',
    'core/image',
    'core/table',
];

interface BlockEditorFieldProps {
    label?: string;
    value: string;
    onChange: ( html: string ) => void;
}

/**
 * A self-contained WordPress block editor used as a rich-text control.
 *
 * The serialized block HTML is stored as the field value, matching the
 * server which persists the description as Gutenberg block content.
 */
export default function BlockEditorField( {
    label,
    value,
    onChange,
}: BlockEditorFieldProps ) {
    ensureCoreBlocks();

    const instanceId = useInstanceId( BlockEditorField, 'jobplace-block-editor' );
    const [ blocks, setBlocks ] = useState( () => parse( value || '' ) );

    // Track the last HTML we emitted so external updates (e.g. loading an
    // existing job) re-parse without clobbering in-progress edits.
    const lastHtml = useRef< string >( value || '' );

    useEffect( () => {
        if ( ( value || '' ) !== lastHtml.current ) {
            lastHtml.current = value || '';
            setBlocks( parse( value || '' ) );
        }
    }, [ value ] );

    const handleChange = ( nextBlocks: any[] ) => {
        setBlocks( nextBlocks );
        const html = serialize( nextBlocks );
        lastHtml.current = html;
        onChange( html );
    };

    return (
        <BaseControl
            __nextHasNoMarginBottom
            id={ instanceId as string }
            label={ label }
        >
            <div className="jobplace-block-editor">
                <ShortcutProvider>
                    <SlotFillProvider>
                        <BlockEditorProvider
                            value={ blocks }
                            onInput={ handleChange }
                            onChange={ handleChange }
                            settings={ {
                                hasFixedToolbar: true,
                                allowedBlockTypes: ALLOWED_BLOCKS,
                            } }
                        >
                            <div className="editor-styles-wrapper">
                                <BlockTools>
                                    <WritingFlow>
                                        <ObserveTyping>
                                            <BlockList />
                                        </ObserveTyping>
                                    </WritingFlow>
                                </BlockTools>
                            </div>
                            <Popover.Slot />
                        </BlockEditorProvider>
                    </SlotFillProvider>
                </ShortcutProvider>
            </div>
        </BaseControl>
    );
}
