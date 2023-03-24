import React from 'react';
import styles from './FilterPanel.module.css';
import completedOnlyIcon from './square-check-solid.svg';
import uncompletedOnlyIconIcon from './pen-to-square-solid.svg';
import allIcon from './list-check-solid.svg';

interface FilterPanelProps {
    setAllFilter: () => void
    setCompletedFilter: () => void
    setUncompletedFilter: () => void
}

type Filters = 'all' | 'uncompleted' | 'completed';

const FilterPanel: React.FC<FilterPanelProps> = ({
    setAllFilter,
    setCompletedFilter,
    setUncompletedFilter
}) => {
    const [activeFilter, setActiveFilter] = React.useState<Filters>('all');

    function allFilterOnClick(event: React.MouseEvent<HTMLElement>) {
        setAllFilter();
        setActiveFilter('all');
    }

    function completedFilterOnClick(event: React.MouseEvent<HTMLElement>) {
        setCompletedFilter();
        setActiveFilter('completed');
    }

    function uncompletedFilterOnClick(event: React.MouseEvent<HTMLElement>) {
        setUncompletedFilter();
        setActiveFilter('uncompleted');
    }

    return (
        <div className={styles.filter_panel_container}>
            <div
                className={`${styles.icon_container} ${activeFilter === 'all' ? styles.active : ''}`}
                onClick={allFilterOnClick}
            >
                <img src={allIcon} alt='All' className={styles.icon} />
                All
            </div>

            <div
                className={`${styles.icon_container} ${activeFilter === 'uncompleted' ? styles.active : ''}`}
                onClick={uncompletedFilterOnClick}
            >
                <img src={uncompletedOnlyIconIcon} alt='Uncompleted only' className={styles.icon} />
                Uncompleted
            </div>

            <div
                className={`${styles.icon_container} ${activeFilter === 'completed' ? styles.active : ''}`}
                onClick={completedFilterOnClick}
            >
                <img src={completedOnlyIcon} alt='Completed only' className={styles.icon} />
                Completed
            </div>
        </div>
    );
}

export default FilterPanel;