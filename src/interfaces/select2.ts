export interface Select2SingleRow {
    /**
     * Select2 option label.
     */
    label: string;

    /**
     * Select2 option value.
     */
    value: string;
}

export interface ISelect2Input {
    /**
     * Select2 options.
     */
    options: Array< Select2SingleRow >;

    /**
     * Placeholder text.
     */
    placeholder?: string;

    /**
     * Is Multi-Select or not.
     */
    isMulti?: boolean;

    /**
     * Default selected value.
     */
    defaultValue?: any;

    /**
     * On change select2 input.
     */
    onChange?: ( val: any ) => void;
}
