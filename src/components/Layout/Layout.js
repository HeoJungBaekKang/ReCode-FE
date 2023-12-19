const Layout = ({ sidebar, children }) => {
    return (
        <div className="layout-container">
            <div className="sidebar">
                {sidebar}
            </div>
            <div className="content">
                {children}
            </div>
        </div>
    );
};

export default Layout;
