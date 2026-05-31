import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { useDispatch, useSelect } from '@wordpress/data';
import { TextControl, TextareaControl, Button } from '@wordpress/components';
import { store as noticesStore } from '@wordpress/notices';
import SideDrawer from '../common/SideDrawer';
import jobCategoriesStore from '../../data/job-categories';
import jobsStore from '../../data/jobs';
import {
    IJobCategory,
    IJobCategoryFormData,
} from '../../interfaces';
import { categoryDefaultFormData } from '../../data/job-categories/default-state';

type CategoryDrawerProps = {
    isOpen: boolean;
    category: IJobCategory | null;
    onClose: () => void;
    onSaved: () => void;
};

export default function CategoryDrawer( {
    isOpen,
    category,
    onClose,
    onSaved,
}: CategoryDrawerProps ) {
    const { saveCategory, invalidateResolutionForStoreSelector } =
        useDispatch( jobCategoriesStore );
    const { invalidateResolutionForStoreSelector: invalidateJobsCategories } =
        useDispatch( jobsStore );
    const { createSuccessNotice, createErrorNotice } =
        useDispatch( noticesStore );

    const saving = useSelect(
        ( select ) => select( jobCategoriesStore ).getSaving(),
        []
    );

    const [ form, setForm ] = useState< IJobCategoryFormData >( {
        ...categoryDefaultFormData,
    } );

    useEffect( () => {
        if ( ! isOpen ) {
            return;
        }

        if ( category ) {
            setForm( {
                id: category.id,
                name: category.name,
                slug: category.slug,
                description: category.description || '',
            } );
        } else {
            setForm( { ...categoryDefaultFormData } );
        }
    }, [ isOpen, category ] );

    const isEditing = form.id > 0;

    const onSubmit = async () => {
        if ( ! form.name.trim() ) {
            createErrorNotice(
                __( 'Category name is required.', 'jobplace' ),
                { type: 'snackbar' }
            );
            return;
        }

        try {
            await saveCategory( form );
            invalidateResolutionForStoreSelector( 'getCategories' );
            invalidateResolutionForStoreSelector( 'getCategoryStats' );
            invalidateJobsCategories( 'getJobCategories' );
            createSuccessNotice(
                isEditing
                    ? __( 'Category updated.', 'jobplace' )
                    : __( 'Category created.', 'jobplace' ),
                { type: 'snackbar' }
            );
            onSaved();
            onClose();
        } catch ( error ) {
            const message =
                ( error as { message?: string } )?.message ||
                __( 'Could not save category.', 'jobplace' );
            createErrorNotice( message, { type: 'snackbar' } );
        }
    };

    return (
        <SideDrawer
            isOpen={ isOpen }
            title={
                isEditing
                    ? __( 'Edit category', 'jobplace' )
                    : __( 'Add category', 'jobplace' )
            }
            onClose={ onClose }
            shouldCloseOnClickOutside={ ! saving }
            shouldCloseOnEsc={ ! saving }
            footer={
                <>
                    <Button variant="tertiary" onClick={ onClose } disabled={ saving }>
                        { __( 'Cancel', 'jobplace' ) }
                    </Button>
                    <Button
                        variant="primary"
                        onClick={ onSubmit }
                        disabled={ saving }
                        isBusy={ saving }
                    >
                        { __( 'Save', 'jobplace' ) }
                    </Button>
                </>
            }
        >
            <TextControl
                label={ __( 'Name', 'jobplace' ) }
                value={ form.name }
                onChange={ ( name ) => setForm( { ...form, name } ) }
                required
                disabled={ saving }
            />
            <TextControl
                label={ __( 'Slug', 'jobplace' ) }
                help={ __(
                    'Optional. Leave empty to generate from the name.',
                    'jobplace'
                ) }
                value={ form.slug }
                onChange={ ( slug ) => setForm( { ...form, slug } ) }
                disabled={ saving }
            />
            <TextareaControl
                label={ __( 'Description', 'jobplace' ) }
                value={ form.description }
                onChange={ ( description ) =>
                    setForm( { ...form, description } )
                }
                rows={ 4 }
                disabled={ saving }
            />
        </SideDrawer>
    );
}
