
import { useColorScheme } from '@mui/material/styles';

export default function SitemarkIcon() {
  const { mode, systemMode } = useColorScheme();

  const resolvedMode = systemMode || mode;

  const logoSrc =
    resolvedMode === 'dark'
      ? '/Boxbox-light.svg'
      : '/Boxbox-dark.svg';

  return (
    <img
      src={logoSrc}
      alt="Sitemark"
      style={{ height: 40 }}
    />
  );
}