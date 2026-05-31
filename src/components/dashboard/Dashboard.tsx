/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import {
    Button,
    Card,
    CardBody,
    Flex,
    FlexItem,
    Spinner,
    __experimentalHeading as Heading,
    __experimentalText as Text,
} from '@wordpress/components';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBriefcase,
    faBuilding,
    faCircleCheck,
    faPenToSquare,
    faStar,
    faHouseLaptop,
    faHandshake,
    faPlus,
    faTags,
} from '@fortawesome/free-solid-svg-icons';

/**
 * Internal dependencies
 */
import jobStore from '../../data/jobs';
import jobCategoriesStore from '../../data/job-categories';
import companiesStore from '../../data/companies';
import { IJobStats } from '../../interfaces';
import { buildJobsListPath } from '../../utils/job-list-filters';
import './dashboard.scss';

const JOB_STAT_CARDS = [
    {
        key: 'total',
        label: __( 'Total jobs', 'jobplace' ),
        icon: faBriefcase,
        color: '#2271b1',
    },
    {
        key: 'published',
        label: __( 'Published', 'jobplace' ),
        icon: faCircleCheck,
        color: '#1a7f37',
    },
    {
        key: 'draft',
        label: __( 'Drafts', 'jobplace' ),
        icon: faPenToSquare,
        color: '#787878',
    },
    {
        key: 'featured',
        label: __( 'Featured', 'jobplace' ),
        icon: faStar,
        color: '#dba617',
    },
    {
        key: 'remote',
        label: __( 'Remote', 'jobplace' ),
        icon: faHouseLaptop,
        color: '#3858e9',
    },
    {
        key: 'negotiable',
        label: __( 'Negotiable salary', 'jobplace' ),
        icon: faHandshake,
        color: '#9a5cb4',
    },
] as const;

const ORG_STAT_CARDS = [
    {
        key: 'companies',
        label: __( 'Companies', 'jobplace' ),
        icon: faBuilding,
        color: '#008a20',
        route: '/companies',
    },
    {
        key: 'categories',
        label: __( 'Job categories', 'jobplace' ),
        icon: faTags,
        color: '#bd581a',
        route: '/job-categories',
    },
] as const;

const Dashboard = () => {
    const navigate = useNavigate();

    const stats: IJobStats | null = useSelect(
        ( select ) => select( jobStore ).getJobStats(),
        []
    );
    const companyStats = useSelect(
        ( select ) => select( companiesStore ).getCompanyStats(),
        []
    );
    const categoryStats = useSelect(
        ( select ) => select( jobCategoriesStore ).getCategoryStats(),
        []
    );

    const isLoadingJobs: boolean = useSelect(
        ( select ) =>
            ! select( jobStore ).hasFinishedResolution( 'getJobStats', [] ),
        []
    );
    const isLoadingCompanies: boolean = useSelect(
        ( select ) =>
            ! select( companiesStore ).hasFinishedResolution(
                'getCompanyStats',
                []
            ),
        []
    );
    const isLoadingCategories: boolean = useSelect(
        ( select ) =>
            ! select( jobCategoriesStore ).hasFinishedResolution(
                'getCategoryStats',
                []
            ),
        []
    );

    const isLoading =
        isLoadingJobs || isLoadingCompanies || isLoadingCategories;

    const orgStats = {
        companies: companyStats?.total ?? 0,
        categories: categoryStats?.total ?? 0,
    };

    return (
        <div className="wprk-dashboard">
            <header className="wprk-dashboard__header">
                <div>
                    <Heading level={ 2 } className="wprk-dashboard__title">
                        { __( 'Dashboard', 'jobplace' ) }
                    </Heading>
                    <Text variant="muted">
                        { __(
                            'A quick snapshot of your job board.',
                            'jobplace'
                        ) }
                    </Text>
                </div>
                <Button
                    variant="primary"
                    icon={ <FontAwesomeIcon icon={ faPlus } /> }
                    onClick={ () => navigate( '/jobs/new' ) }
                >
                    { __( 'Add Job', 'jobplace' ) }
                </Button>
            </header>

            { isLoading ? (
                <div className="wprk-dashboard__loading">
                    <Spinner />
                </div>
            ) : (
                <>
                    <div className="wprk-dashboard__grid">
                        { JOB_STAT_CARDS.map( ( card ) => (
                            <Card
                                key={ card.key }
                                size="small"
                                className="wprk-dashboard__stat-card"
                                onClick={ () =>
                                    navigate( buildJobsListPath( card.key ) )
                                }
                            >
                                <CardBody>
                                    <Flex align="center" gap={ 4 }>
                                        <FlexItem>
                                            <span
                                                className="wprk-dashboard__icon"
                                                style={ {
                                                    backgroundColor: `${ card.color }1a`,
                                                    color: card.color,
                                                } }
                                            >
                                                <FontAwesomeIcon
                                                    icon={ card.icon }
                                                />
                                            </span>
                                        </FlexItem>
                                        <FlexItem isBlock>
                                            <div className="wprk-dashboard__stat">
                                                { stats
                                                    ? stats[ card.key ] ?? 0
                                                    : 0 }
                                            </div>
                                            <Text variant="muted">
                                                { card.label }
                                            </Text>
                                        </FlexItem>
                                    </Flex>
                                </CardBody>
                            </Card>
                        ) ) }
                    </div>

                    <section className="wprk-dashboard__section">
                        <Heading
                            level={ 3 }
                            className="wprk-dashboard__section-title"
                        >
                            { __( 'Organizations', 'jobplace' ) }
                        </Heading>

                        <div className="wprk-dashboard__grid wprk-dashboard__grid--compact">
                            { ORG_STAT_CARDS.map( ( card ) => (
                                <Card
                                    key={ card.key }
                                    size="small"
                                    className="wprk-dashboard__org-card"
                                    onClick={ () => navigate( card.route ) }
                                >
                                    <CardBody>
                                        <Flex align="center" gap={ 4 }>
                                            <FlexItem>
                                                <span
                                                    className="wprk-dashboard__icon"
                                                    style={ {
                                                        backgroundColor: `${ card.color }1a`,
                                                        color: card.color,
                                                    } }
                                                >
                                                    <FontAwesomeIcon
                                                        icon={ card.icon }
                                                    />
                                                </span>
                                            </FlexItem>
                                            <FlexItem isBlock>
                                                <div className="wprk-dashboard__stat">
                                                    { orgStats[ card.key ] ?? 0 }
                                                </div>
                                                <Text variant="muted">
                                                    { card.label }
                                                </Text>
                                            </FlexItem>
                                        </Flex>
                                    </CardBody>
                                </Card>
                            ) ) }
                        </div>
                    </section>
                </>
            ) }

            <Card className="wprk-dashboard__cta">
                <CardBody>
                    <Flex align="center" justify="space-between" gap={ 4 }>
                        <FlexItem isBlock>
                            <Heading level={ 3 } size={ 15 }>
                                { __( 'Manage your jobs', 'jobplace' ) }
                            </Heading>
                            <Text variant="muted">
                                { __(
                                    'Create, edit, feature and organize every posting from one place.',
                                    'jobplace'
                                ) }
                            </Text>
                        </FlexItem>
                        <FlexItem>
                            <Button
                                variant="secondary"
                                onClick={ () => navigate( '/jobs' ) }
                            >
                                { __( 'View all jobs', 'jobplace' ) }
                            </Button>
                        </FlexItem>
                    </Flex>
                </CardBody>
            </Card>
        </div>
    );
};

export default Dashboard;
