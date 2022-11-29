/**
 * External dependencies.
 */
import { __ } from "@wordpress/i18n";
import { InspectorControls, RichText, useBlockProps } from "@wordpress/block-editor";
import { PanelBody, ColorPicker, __experimentalBoxControl as BoxControl } from '@wordpress/components';

/**
 * Internal dependencies.
 */
import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
  const { title, description, bgColor, padding } = attributes;

  return (
    <div
        {...useBlockProps()}
        style={{
            backgroundColor: bgColor,
            padding: `${padding?.top} ${padding?.right} ${padding?.bottom} ${padding?.left}`
        }}
    >
      <RichText
        className="wp-block-wp-react-kit-header_title"
        tagName="h2"
        placeholder={__("Header title", "jobplace")}
        value={title}
        onChange={(title: string) => setAttributes({ title })}
      />

      <RichText
        className="wp-block-wp-react-kit-header_title"
        tagName="div"
        placeholder={__("Header description", "jobplace")}
        value={description}
        onChange={(description: string) => setAttributes({ description })}
      />

        <InspectorControls>
            <PanelBody
                title={__('Color Settings', 'jobplace')}
                initialOpen={true}
            >
                <ColorPicker
                    color={bgColor}
                    onChange={(bgColor: string) => setAttributes({ bgColor })}
                    enableAlpha
                    defaultValue={bgColor}
                    clearable={false}
                />
            </PanelBody>
            <PanelBody
                title={__('Padding/Margin Settings', 'cartpulse')}
                initialOpen={false}
            >
                <BoxControl
                    label={__('Inline Padding', 'cartpulse')}
                    values={padding}
                    onChange={(padding: object) => setAttributes({ padding })}
                />
            </PanelBody>
        </InspectorControls>
    </div>
  );
}
