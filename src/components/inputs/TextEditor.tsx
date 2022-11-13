/**
 * External dependencies.
 */
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Classic from '@ckeditor/ckeditor5-build-classic';

interface ITextEditor {
    id: string;
    value?: any;
    onChange?: (val: any) => void;
    placeholder?: React.CSSProperties['placeholder'];
    height?: string;
}

export default function TextEditor({
    height = '200px',
    id,
    value,
    onChange,
    placeholder,
}: ITextEditor) {
    return (
        <CKEditor
            editor={Classic}
            config={{}}
            onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
                if (typeof editor !== 'undefined' && editor !== null) {
                    editor.editing.view.change((writer) => {
                        writer.setStyle(
                            {
                                height,
                                //  border: '1px solid rgba(233, 238, 248, 0.9)',
                            },
                            editor.editing.view.document.getRoot()
                        );
                    });
                }
            }}
            placeholder={placeholder}
            data={
                typeof value === 'undefined' || value.length === 0
                    ? '<p></p>'
                    : value
            }
            onChange={(event, editor) => {
                if (typeof editor !== 'undefined' && editor !== null) {
                    const data = editor.getData();
                    onChange({ name: id, value: data });
                }
            }}
        />
    );
}
