import { useMediaQuery } from 'react-responsive';

export const ExtraSm = ({ children, callback }) => {
  const isExtraSm = useMediaQuery({ maxWidth: 599 }, undefined, callback);
  return isExtraSm ? children : null;
};
export const Small = ({ children, callback }) => {
  const isSmall = useMediaQuery({ minWidth: 600, maxWidth: 959 }, undefined, callback);
  return isSmall ? children : null;
};
export const SmallAndDown = ({ children, callback }) => {
  const isSmallAndDown = useMediaQuery({ maxWidth: 959 }, undefined, callback);
  return isSmallAndDown ? children : null;
};
export const SmallAndUp = ({ children, callback }) => {
  const isSmallAndUp = useMediaQuery({ minWidth: 600 }, undefined, callback);
  return isSmallAndUp ? children : null;
};
export const Medium = ({ children, callback }) => {
  const isMedium = useMediaQuery({ minWidth: 960, maxWidth: 1263 }, undefined, callback);
  return isMedium ? children : null;
};
export const MediumAndDown = ({ children, callback }) => {
  const isMediumAndDown = useMediaQuery({ maxWidth: 1263 }, undefined, callback);
  return isMediumAndDown ? children : null;
};
export const MediumAndUp = ({ children, callback }) => {
  const isMediumAndUp = useMediaQuery({ minWidth: 960 }, undefined, callback);
  return isMediumAndUp ? children : null;
};
export const Large = ({ children, callback }) => {
  const isLarge = useMediaQuery({ minWidth: 1264, maxWidth: 1903 }, undefined, callback);
  return isLarge ? children : null;
};
export const LargeAndDown = ({ children, callback }) => {
  const isLargeAndDown = useMediaQuery({ maxWidth: 1903 }, undefined, callback);
  return isLargeAndDown ? children : null;
};
export const LargeAndUp = ({ children, callback }) => {
  const isLargeAndUp = useMediaQuery({ minWidth: 1264 }, undefined, callback);
  return isLargeAndUp ? children : null;
};
export const ExtraLg = ({ children, callback }) => {
  const isExtraLg = useMediaQuery({ minWidth: 1904 }, undefined, callback);
  return isExtraLg ? children : null;
};
