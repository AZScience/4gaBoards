import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import logoDarkTheme from '../../../assets/images/4gaboardsLogo1024w-white.png';
import logoLightTheme from '../../../assets/images/4gaboardsLogo1024w.png';
import Config from '../../../constants/Config';
import { Themes } from '../../../constants/Enums';
import { Icon, IconType, IconSize, ExternalLink, Button, ButtonVariant } from '../../Utils';

import * as sShared from '../SettingsShared.module.scss';
import * as s from './AboutSettings.module.scss';

const AboutSettings = React.memo(({ demoMode, theme, onGettingStartedProjectImport }) => {
  const [t] = useTranslation();
  const { i18n } = useTranslation();
  const [latestVersion, setLatestVersion] = useState(t('common.fetching'));
  const [importGettingStartedButtonDisabled, setImportGettingStartedButtonDisabled] = useState(false);

  const fetchLatestVersion = useCallback(async () => {
    try {
      const response = await fetch('https://raw.githubusercontent.com/RARgames/4gaBoards/main/package.json');
      const data = await response.json();
      setLatestVersion(data.version);
    } catch {
      setLatestVersion(t('common.unableToFetch'));
    }
  }, [t]);

  const handleGettingStartedProjectImportClick = useCallback(() => {
    setImportGettingStartedButtonDisabled(true);
    onGettingStartedProjectImport({ language: i18n.resolvedLanguage }, true);
  }, [i18n.resolvedLanguage, onGettingStartedProjectImport]);

  useEffect(() => {
    fetchLatestVersion();
  }, [fetchLatestVersion]);

  return (
    <div className={sShared.wrapper}>
      <div>
        <img src={theme === Themes.LIGHT ? logoLightTheme : logoDarkTheme} className={s.logo} alt="4ga Boards" />
        <div className={s.version}>
          {t('common.version')} {Config.VERSION}
        </div>
        <div className={s.version}>
          {t('common.latestVersion')} {latestVersion}
        </div>
        {demoMode && <div className={s.demoMode}>{t('common.demoMode')}</div>}
        <div className={s.links}>
          <Button
            variant={ButtonVariant.DefaultBorder}
            content={t('common.importGettingStartedProject')}
            onClick={handleGettingStartedProjectImportClick}
            disabled={importGettingStartedButtonDisabled}
            className={s.button}
          />
        </div>
      </div>
    </div>
  );
});

AboutSettings.propTypes = {
  demoMode: PropTypes.bool.isRequired,
  theme: PropTypes.string.isRequired,
  onGettingStartedProjectImport: PropTypes.func.isRequired,
};

export default AboutSettings;
