/**
 * External dependencies.
 */
import {
    Dropdown,
    Button,
    DatePicker,
    BaseControl,
    __experimentalVStack as VStack,
} from '@wordpress/components';
import { useInstanceId } from '@wordpress/compose';
import { format } from '@wordpress/date';
import { __ } from '@wordpress/i18n';

interface DateFieldProps {
    label?: string;
    help?: string;
    value?: string | null;
    onChange: ( value: string | null ) => void;
}

/**
 * A date control that opens a WordPress <DatePicker> inside a popover and
 * stores the selected value as a `Y-m-d` string.
 */
export default function DateField( {
    label,
    help,
    value,
    onChange,
}: DateFieldProps ) {
    const instanceId = useInstanceId( DateField, 'jobplace-date-field' );

    const display = value
        ? format( 'M j, Y', value )
        : __( 'Select a date', 'jobplace' );

    return (
        <BaseControl
            __nextHasNoMarginBottom
            id={ instanceId as string }
            label={ label }
            help={ help }
        >
            <div>
                <Dropdown
                    popoverProps={ { placement: 'bottom-start' } }
                    renderToggle={ ( { isOpen, onToggle } ) => (
                        <Button
                            variant="secondary"
                            onClick={ onToggle }
                            aria-expanded={ isOpen }
                        >
                            { display }
                        </Button>
                    ) }
                    renderContent={ () => (
                        <VStack spacing={ 3 } style={ { padding: 8 } }>
                            <DatePicker
                                currentDate={ value || undefined }
                                onChange={ ( newDate: string ) =>
                                    onChange(
                                        newDate
                                            ? format( 'Y-m-d', newDate )
                                            : null
                                    )
                                }
                            />
                            { value ? (
                                <Button
                                    variant="tertiary"
                                    isDestructive
                                    onClick={ () => onChange( null ) }
                                >
                                    { __( 'Clear date', 'jobplace' ) }
                                </Button>
                            ) : null }
                        </VStack>
                    ) }
                />
            </div>
        </BaseControl>
    );
}
