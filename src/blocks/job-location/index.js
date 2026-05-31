import { registerBlockType } from '@wordpress/blocks';
import { mapMarker as icon } from '@wordpress/icons';
import edit from './edit';
import metadata from './block.json';

registerBlockType( metadata.name, { edit, icon } );
