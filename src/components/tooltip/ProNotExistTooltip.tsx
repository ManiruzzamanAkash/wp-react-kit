/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';

/**
 * Internal dependencies
 */
import Tooltip from './Tooltip';
import { hasPro } from '../../../utils/global-data';

export interface IProNotExistTooltip {
    /**
     * Pro not exist extra description.
     */
    desc?: string;
}

const ProNotExistTooltip = ({ desc }: IProNotExistTooltip) => {
    return (
        <span>
            {!hasPro && (
                <>
                    <Tooltip
                        innerContent={
                            <Button
                                variant="secondary"
                                text={__('PRO', 'cp')}
                                style={{
                                    padding: '5px 12px',
                                    marginLeft: 10,
                                }}
                            />
                        }
                    >
                        {desc}
                        {__(
                            'This feature is only available in Pro version.',
                            'cp'
                        )}
                    </Tooltip>
                </>
            )}
        </span>
    );
};

ProNotExistTooltip.defaultProps = {
    desc: __("Sorry, You can't view this.", 'cp'),
};

export default ProNotExistTooltip;
