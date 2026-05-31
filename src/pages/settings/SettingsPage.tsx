/**
 * External dependencies.
 */
import { useCallback, useEffect, useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import {
	Button,
	ExternalLink,
	Notice,
	Panel,
	PanelBody,
	RangeControl,
	SelectControl,
	Spinner,
	TextControl,
} from '@wordpress/components';
import { store as noticesStore } from '@wordpress/notices';
import { useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies.
 */
import Notices from '../../components/Notices';
import type { IJobPlaceSettings } from '../../interfaces/settings';
import './settings-page.scss';

const ENDPOINT = '/job-place/v1/settings';

export default function SettingsPage() {
	const { createSuccessNotice, createErrorNotice } =
		useDispatch( noticesStore );

	const [ settings, setSettings ] = useState<IJobPlaceSettings | null>(
		null
	);
	const [ isLoading, setIsLoading ] = useState( true );
	const [ isSaving, setIsSaving ] = useState( false );

	const loadSettings = useCallback( async () => {
		setIsLoading( true );
		try {
			const response = await apiFetch<IJobPlaceSettings>( {
				path: ENDPOINT,
			} );
			setSettings( response );
		} catch {
			createErrorNotice(
				__( 'Could not load settings.', 'jobplace' ),
				{ type: 'snackbar' }
			);
		} finally {
			setIsLoading( false );
		}
	}, [ createErrorNotice ] );

	useEffect( () => {
		loadSettings();
	}, [ loadSettings ] );

	const updateField = < K extends keyof IJobPlaceSettings >(
		key: K,
		value: IJobPlaceSettings[ K ]
	) => {
		setSettings( ( current ) =>
			current ? { ...current, [ key ]: value } : current
		);
	};

	const onSave = async () => {
		if ( ! settings ) {
			return;
		}

		setIsSaving( true );

		try {
			const response = await apiFetch<IJobPlaceSettings>( {
				path: ENDPOINT,
				method: 'PUT',
				data: {
					job_detail_pattern: settings.job_detail_pattern,
					jobs_per_page: settings.jobs_per_page,
					default_apply_button_text:
						settings.default_apply_button_text,
					jobs_page_id: settings.jobs_page_id,
				},
			} );
			setSettings( response );
			createSuccessNotice( __( 'Settings saved.', 'jobplace' ), {
				type: 'snackbar',
			} );
		} catch {
			createErrorNotice( __( 'Could not save settings.', 'jobplace' ), {
				type: 'snackbar',
			} );
		} finally {
			setIsSaving( false );
		}
	};

	const patternOptions =
		settings?.choices.job_detail_patterns.map( ( pattern ) => ( {
			value: pattern.slug,
			label: pattern.title,
		} ) ) ?? [];

	const pageOptions =
		settings?.choices.pages.map( ( page ) => ( {
			value: String( page.value ),
			label: page.label,
		} ) ) ?? [];

	const selectedPattern = settings?.choices.job_detail_patterns.find(
		( pattern ) => pattern.slug === settings.job_detail_pattern
	);

	return (
		<div className="wprk-settings-page">
			<header className="wprk-settings-page__header">
				<div className="wprk-settings-page__heading">
					<h2>{ __( 'Settings', 'jobplace' ) }</h2>
					<p>
						{ __(
							'Global options for the job board and single job pages.',
							'jobplace'
						) }
					</p>
				</div>
				<div className="wprk-settings-page__actions">
					<Button
						variant="primary"
						onClick={ onSave }
						isBusy={ isSaving }
						disabled={ isSaving || isLoading || ! settings }
					>
						{ isSaving
							? __( 'Saving…', 'jobplace' )
							: __( 'Save settings', 'jobplace' ) }
					</Button>
				</div>
			</header>

			<div className="wprk-settings-page__body">
				{ isLoading && (
					<div className="wprk-settings-page__loading">
						<Spinner />
					</div>
				) }

				{ ! isLoading && settings && (
					<Panel>
						<PanelBody
							title={ __( 'Job detail page', 'jobplace' ) }
							initialOpen
						>
							<SelectControl
								label={ __(
									'Global job detail layout',
									'jobplace'
								) }
								help={ __(
									'Used for all single job URLs unless you customize the Single Job template in the Site Editor.',
									'jobplace'
								) }
								value={ settings.job_detail_pattern }
								options={ patternOptions }
								onChange={ ( job_detail_pattern ) =>
									updateField(
										'job_detail_pattern',
										job_detail_pattern
									)
								}
							/>
							{ selectedPattern?.description && (
								<p className="wprk-settings-page__hint">
									{ selectedPattern.description }
								</p>
							) }
						</PanelBody>

						<PanelBody
							title={ __( 'Jobs board page', 'jobplace' ) }
							initialOpen
						>
							<SelectControl
								label={ __( 'Jobs list page', 'jobplace' ) }
								help={ __(
									'The WordPress page that contains the Jobs List block.',
									'jobplace'
								) }
								value={ String( settings.jobs_page_id ) }
								options={ pageOptions }
								onChange={ ( value ) =>
									updateField(
										'jobs_page_id',
										parseInt( value, 10 ) || 0
									)
								}
							/>
							<div className="wprk-settings-page__links">
								{ settings.urls.jobs_page_view && (
									<ExternalLink
										href={ settings.urls.jobs_page_view }
									>
										{ __( 'View jobs board', 'jobplace' ) }
									</ExternalLink>
								) }
								{ settings.urls.jobs_page_edit && (
									<ExternalLink
										href={ settings.urls.jobs_page_edit }
									>
										{ __( 'Edit jobs page', 'jobplace' ) }
									</ExternalLink>
								) }
							</div>
						</PanelBody>

						<PanelBody
							title={ __( 'Listings & apply button', 'jobplace' ) }
							initialOpen={ false }
						>
							<RangeControl
								label={ __(
									'Default jobs per page',
									'jobplace'
								) }
								help={ __(
									'Default for new Jobs List blocks and listings without a custom per-page value.',
									'jobplace'
								) }
								value={ settings.jobs_per_page }
								onChange={ ( jobs_per_page ) =>
									updateField(
										'jobs_per_page',
										jobs_per_page ?? 10
									)
								}
								min={ 1 }
								max={ 50 }
							/>
							<TextControl
								label={ __(
									'Default apply button text',
									'jobplace'
								) }
								help={ __(
									'Used when an Apply button block has no custom label.',
									'jobplace'
								) }
								value={ settings.default_apply_button_text }
								onChange={ ( default_apply_button_text ) =>
									updateField(
										'default_apply_button_text',
										default_apply_button_text
									)
								}
							/>
						</PanelBody>

						<PanelBody
							title={ __( 'Permalinks', 'jobplace' ) }
							initialOpen={ false }
						>
							<Notice status="info" isDismissible={ false }>
								{ __(
									'Job detail URL base is configured on the WordPress Permalinks screen.',
									'jobplace'
								) }
							</Notice>
							<p className="wprk-settings-page__permalink">
								<code>
									{ window.location.origin }/
									{ settings.permalink_base }/
									{ __( 'job-slug', 'jobplace' ) }/
								</code>
							</p>
							{ settings.urls.permalinks && (
								<ExternalLink
									href={ settings.urls.permalinks }
								>
									{ __(
										'Open permalink settings',
										'jobplace'
									) }
								</ExternalLink>
							) }
						</PanelBody>
					</Panel>
				) }
			</div>

			<Notices />
		</div>
	);
}
