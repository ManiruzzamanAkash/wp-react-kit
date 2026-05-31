import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import {
    BaseControl,
    Button,
    SelectControl,
    __experimentalHStack as HStack,
} from '@wordpress/components';
import { useInstanceId } from '@wordpress/compose';
import jobStore from '../../data/jobs';
import CompanyDrawer from '../companies/CompanyDrawer';
import { ICompany } from '../../interfaces';

type CompanyFieldProps = {
    data: { company_id?: number };
    field: { label?: string };
    onChange: ( edits: Record< string, number > ) => void;
};

const withPlaceholder = (
    items: Array< { label: string; value: string } >
) => [ { value: '', label: __( '— Select —', 'jobplace' ) }, ...items ];

export default function CompanyField( {
    data,
    field,
    onChange,
}: CompanyFieldProps ) {
    const instanceId = useInstanceId( CompanyField, 'jobplace-company-field' );
    const [ drawerOpen, setDrawerOpen ] = useState( false );

    const companyDropdowns = useSelect(
        ( select ) => select( jobStore ).getCompaniesDropdown(),
        []
    );

    const options = withPlaceholder(
        ( companyDropdowns || [] ).map( ( option ) => ( {
            label: option.label,
            value: String( option.value ),
        } ) )
    );

    const onCompanySaved = ( company?: ICompany ) => {
        if ( company?.id ) {
            onChange( { company_id: company.id } );
        }
    };

    return (
        <>
            <BaseControl
                __nextHasNoMarginBottom
                id={ instanceId as string }
                label={ field.label }
            >
                <HStack alignment="top" spacing={ 3 }>
                    <div style={ { flex: 1 } }>
                        <SelectControl
                            __nextHasNoMarginBottom
                            value={
                                data.company_id
                                    ? String( data.company_id )
                                    : ''
                            }
                            options={ options }
                            onChange={ ( value ) =>
                                onChange( {
                                    company_id: value ? Number( value ) : 0,
                                } )
                            }
                        />
                    </div>
                    <Button
                        variant="secondary"
                        onClick={ () => setDrawerOpen( true ) }
                        style={ { marginTop: 2 } }
                    >
                        { __( 'Add company', 'jobplace' ) }
                    </Button>
                </HStack>
            </BaseControl>

            <CompanyDrawer
                isOpen={ drawerOpen }
                company={ null }
                onClose={ () => setDrawerOpen( false ) }
                onSaved={ ( company ) => {
                    onCompanySaved( company );
                    setDrawerOpen( false );
                } }
            />
        </>
    );
}
