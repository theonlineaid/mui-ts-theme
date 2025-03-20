import React, { ReactNode } from 'react';

import SettingsDrawer from './drawer';
import ThemeContrast from './ThemeContrast';
import ThemeColorPresets from './ThemeColorPresets';
import ThemeRtlLayout from './ThemeRtlLayout';

// Define the type for props
interface ThemeSettingsProps {
  children: ReactNode;  // children is of type ReactNode, which can be any renderable content
}

const ThemeSettings: React.FC<ThemeSettingsProps> = ({ children }) => {
  return (
    <ThemeColorPresets>
      <ThemeContrast>
        <ThemeRtlLayout>
          {children}
          <SettingsDrawer />
        </ThemeRtlLayout>
      </ThemeContrast>
    </ThemeColorPresets>
  );
};

export default ThemeSettings;
