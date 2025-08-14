


const TabButton = ({ label, tab, activeTab, setActiveTab }) => {
  const isActive = activeTab === tab;
  return (
    <button
      onClick={() => { setActiveTab(tab); }}
      className={`tab-button py-3 px-6 font-semibold transition-colors duration-200 ${isActive ? 'text-dark-grey border-b-2 border-primary-blue' : 'text-medium-grey hover:text-primary-blue'}`}
    >
      {label}
    </button>
  );
};

// New ArticlePost Component
