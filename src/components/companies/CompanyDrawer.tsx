import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { useDispatch, useSelect } from '@wordpress/data';
import { TextControl, TextareaControl, Button } from '@wordpress/components';
import { store as noticesStore } from '@wordpress/notices';
import SideDrawer from '../common/SideDrawer';
import companiesStore from '../../data/companies';
import jobsStore from '../../data/jobs';
import { ICompany, ICompanyFormData } from '../../interfaces';
import { companyDefaultFormData } from '../../data/companies/default-state';

type CompanyDrawerProps = {
    isOpen: boolean;
    company: ICompany | null;
    onClose: () => void;
    onSaved: ( company?: ICompany ) => void;
};

export default function CompanyDrawer( {
    isOpen,
    company,
    onClose,
    onSaved,
}: CompanyDrawerProps ) {
    const { saveCompany, invalidateResolutionForStoreSelector } =
        useDispatch( companiesStore );
    const { invalidateResolutionForStoreSelector: invalidateJobsCompanies } =
        useDispatch( jobsStore );
    const { createSuccessNotice, createErrorNotice } =
        useDispatch( noticesStore );

    const saving = useSelect(
        ( select ) => select( companiesStore ).getSaving(),
        []
    );

    const [ form, setForm ] = useState< ICompanyFormData >( {
        ...companyDefaultFormData,
    } );

    useEffect( () => {
        if ( ! isOpen ) {
            return;
        }

        if ( company ) {
            setForm( {
                id: company.id,
                name: company.name,
                slug: company.slug,
                email: company.email || '',
                website: company.website || '',
                description: company.description || '',
                avatar_url: company.avatar_url || '',
            } );
        } else {
            setForm( { ...companyDefaultFormData } );
        }
    }, [ isOpen, company ] );

    const isEditing = form.id > 0;

    const onSubmit = async () => {
        if ( ! form.name.trim() ) {
            createErrorNotice(
                __( 'Company name is required.', 'jobplace' ),
                { type: 'snackbar' }
            );
            return;
        }

        try {
            const saved = ( await saveCompany( form ) ) as ICompany;
            invalidateResolutionForStoreSelector( 'getCompanies' );
            invalidateResolutionForStoreSelector( 'getCompanyStats' );
            invalidateJobsCompanies( 'getCompaniesDropdown' );
            createSuccessNotice(
                isEditing
                    ? __( 'Company updated.', 'jobplace' )
                    : __( 'Company created.', 'jobplace' ),
                { type: 'snackbar' }
            );
            onSaved( saved );
            onClose();
        } catch ( error ) {
            const message =
                ( error as { message?: string } )?.message ||
                __( 'Could not save company.', 'jobplace' );
            createErrorNotice( message, { type: 'snackbar' } );
        }
    };

    return (
        <SideDrawer
            isOpen={ isOpen }
            title={
                isEditing
                    ? __( 'Edit company', 'jobplace' )
                    : __( 'Add company', 'jobplace' )
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
            <TextControl
                label={ __( 'Email', 'jobplace' ) }
                type="email"
                value={ form.email }
                onChange={ ( email ) => setForm( { ...form, email } ) }
                disabled={ saving }
            />
            <TextControl
                label={ __( 'Website', 'jobplace' ) }
                type="url"
                value={ form.website }
                onChange={ ( website ) => setForm( { ...form, website } ) }
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
            <TextControl
                label={ __( 'Logo URL', 'jobplace' ) }
                help={ __(
                    'Optional. URL to a company logo or avatar image.',
                    'jobplace'
                ) }
                type="url"
                value={ form.avatar_url }
                onChange={ ( avatar_url ) =>
                    setForm( { ...form, avatar_url } )
                }
                disabled={ saving }
            />
        </SideDrawer>
    );
}
