export const BreadcrumbBar = ({ activeFile }) => {
  const pathLabel = activeFile ? `project > ${activeFile.name}` : "project";

  return <div className="vsc-breadcrumb-bar">{pathLabel}</div>;
};
