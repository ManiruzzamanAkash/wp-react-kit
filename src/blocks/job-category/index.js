import { registerBlockType } from '@wordpress/blocks';
import { category as icon } from '@wordpress/icons';
import edit from './edit';
import metadata from './block.json';

registerBlockType( metadata.name, { edit, icon } );
