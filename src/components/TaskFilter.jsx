const FILTERS = ["All", "Pending", "In Progress", "Completed"];

export default function TaskFilter({ currentFilter, onFilterChange, taskCounts }) {
  return (
    <div className="task-filter">
      {FILTERS.map((filter) => (
        <button
          key={filter}
          className={`filter-btn ${currentFilter === filter ? "active" : ""}`}
          onClick={() => onFilterChange(filter)}
        >
          {filter}
          <span className="filter-count">{taskCounts[filter]}</span>
        </button>
      ))}
    </div>
  );
}
