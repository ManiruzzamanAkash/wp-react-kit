/**
 * External dependencies
 */
import { Switch } from '@headlessui/react';
import { __ } from '@wordpress/i18n';

interface ISwitchCheckbox {
    /**
     * Switch checkbox enabled or disabled.
     */
    enabled: boolean;

    /**
     * Toggle switch onChange event.
     */
    setEnabled: (enabled: boolean) => void;
}

export default function SwitchCheckbox({
    enabled = false,
    setEnabled,
}: ISwitchCheckbox) {
    return (
        <div>
            <Switch
                checked={enabled}
                onChange={setEnabled}
                className={`${enabled ? '!bg-primary' : '!bg-primary-lite'}
                relative inline-flex flex-shrink-0 h-[24px] w-[60px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
                <span className="sr-only">{__('Toggle', 'cp')}</span>
                <span
                    aria-hidden="true"
                    className={`${
                        enabled ? 'translate-x-9' : 'translate-x-0'
                    } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200 mr-[2px] absolute top-0 left-0`}
                />
            </Switch>
        </div>
    );
}
