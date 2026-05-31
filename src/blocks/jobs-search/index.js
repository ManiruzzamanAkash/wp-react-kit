import { registerBlockType } from '@wordpress/blocks';
import { search as icon } from '@wordpress/icons';
import edit from './edit';
import metadata from './block.json';

registerBlockType( metadata.name, { edit, icon } );
