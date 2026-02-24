export const LayoutDivider = ({ orientation, onMouseDown, ariaLabel }) => (
  <div
    role="separator"
    aria-orientation={orientation}
    aria-label={ariaLabel}
    className={`vsc-layout-divider vsc-layout-divider-${orientation}`}
    onMouseDown={onMouseDown}
  />
);
