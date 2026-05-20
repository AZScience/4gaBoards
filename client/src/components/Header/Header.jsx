import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import logo from '../../assets/images/4gaLogo512w.png';
import { Themes } from '../../constants/Enums';
import Paths from '../../constants/Paths';
import User from '../User';
import UserPopup from '../UserPopup';
import { Button, ButtonVariant, Icon, IconType, IconSize, ExternalLink } from '../Utils';
import NotificationsPopup from './NotificationsPopup';

import * as s from './Header.module.scss';

const Header = React.memo(
  ({
    path,
    project,
    user,
    notifications,
    filteredNotifications,
    notificationFilter,
    notificationCount,
    instanceNotificationCount,
    usersNotificationCount,
    isLogouting,
    canEditProject,
    isAdmin,
    demoMode,
    theme,
    onNotificationUpdate,
    onNotificationMarkAllAs,
    onNotificationDelete,
    onNotificationDeleteAll,
    onNotificationChangeFilterQuery,
    onLogout,
    onUserPrefsUpdate,
  }) => {
    const [t] = useTranslation();

    const handleThemeToggle = useCallback(() => {
      const nextTheme = theme === Themes.LIGHT ? Themes.DEFAULT : Themes.LIGHT;
      onUserPrefsUpdate({ theme: nextTheme });
    }, [theme, onUserPrefsUpdate]);

    const getPageHeaderTitle = useCallback(() => {
      switch (path) {
        case Paths.ROOT:
          return t('common.dashboard');
        case Paths.SETTINGS:
          return t('common.settings');
        case Paths.SETTINGS_PROFILE:
          return t('common.settingsProfile');
        case Paths.SETTINGS_PREFERENCES:
          return t('common.settingsPreferences');
        case Paths.SETTINGS_PREFERENCES_THEME:
          return t('common.settingsPreferencesTheme');
        case Paths.SETTINGS_ACCOUNT:
          return t('common.settingsAccount');
        case Paths.SETTINGS_AUTHENTICATION:
          return t('common.settingsAuthentication');
        case Paths.SETTINGS_ABOUT:
          return t('common.settingsAbout');
        case Paths.SETTINGS_INSTANCE:
          return t('common.settingsInstance');
        case Paths.SETTINGS_USERS:
          return t('common.settingsUsers');
        case Paths.SETTINGS_PROJECT:
          return t('common.settingsProject');
        case Paths.NOTIFICATIONS:
          return t('common.notifications');
        default:
          return project ? project.name : null;
      }
    }, [path, project, t]);

    return (
      <div className={s.wrapper}>
        <Link to={Paths.ROOT} className={s.logo}>
          <Button variant={ButtonVariant.HeaderLogo} title={t('common.dashboard')}>
            <img src={logo} alt="4ga Boards" className={s.logoIcon} />
          </Button>
        </Link>
        <div className={s.title} title={getPageHeaderTitle()}>
          {getPageHeaderTitle()}
        </div>
        {path === Paths.ROOT && (
          <div
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              fontWeight: 'bold',
              fontSize: '1.2em',
              color: 'var(--text0)',
              alignSelf: 'center',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              zIndex: 10,
              top: '12px',
            }}
          >
            BẢNG PHÂN VIỆC CỦA PHÒNG KIỂM TRA NỘI BỘ
          </div>
        )}
        {demoMode && (
          <div className={s.demoMode}>
            <ExternalLink href="https://github.com/RARgames/4gaBoards" className={clsx(s.demoModeNotice, s.hideOnSmallGithub)}>
              <Icon type={IconType.GitHub} size={IconSize.Size20} />
              <div className={s.demoModeNoticeTexts}>
                <span className={s.demoModeNoticeTextMain}>{t('common.demoModeGithubMain')}</span>
                <span className={s.demoModeNoticeTextExtra}>{t('common.demoModeGithubExtra')}</span>
              </div>
            </ExternalLink>
            <div className={clsx(s.demoModeNoticeSeparator, s.hideOnSmallFeedback)} />
            <ExternalLink href="https://forms.gle/FqjR7uhBp9Gn2fu26" className={clsx(s.demoModeNotice, s.hideOnSmallFeedback)}>
              <Icon type={IconType.StarHalf} size={IconSize.Size20} />
              <div className={s.demoModeNoticeTexts}>
                <span className={s.demoModeNoticeTextMain}>{t('common.feedbackMain')}</span>
                <span className={s.demoModeNoticeTextExtra}>{t('common.feedbackExtra')}</span>
              </div>
            </ExternalLink>
          </div>
        )}
        <div className={s.menuRight}>
          <Link to={Paths.SETTINGS} className={s.hideOnSmall}>
            <Button variant={ButtonVariant.Header} title={t('common.settings')}>
              <Icon type={IconType.Settings} size={IconSize.Size18} />
              {instanceNotificationCount > 0 && <span className={s.notification}>{instanceNotificationCount}</span>}
            </Button>
          </Link>
          {isAdmin && (
            <Link to={Paths.SETTINGS_USERS} className={s.hideOnSmall}>
              <Button variant={ButtonVariant.Header} title={t('common.settingsUsers')}>
                <Icon type={IconType.Users} size={IconSize.Size18} />
                {usersNotificationCount > 0 && <span className={s.notification}>{usersNotificationCount}</span>}
              </Button>
            </Link>
          )}
          <Button variant={ButtonVariant.Header} title={theme === Themes.LIGHT ? t('common.themeGithubDark') : t('common.themeLight')} onClick={handleThemeToggle}>
            <Icon type={theme === Themes.LIGHT ? IconType.Moon : IconType.Sun} size={IconSize.Size18} />
          </Button>
          <NotificationsPopup
            items={notifications}
            filteredItems={filteredNotifications}
            filter={notificationFilter}
            onUpdate={onNotificationUpdate}
            onMarkAllAs={onNotificationMarkAllAs}
            onDelete={onNotificationDelete}
            onDeleteAll={onNotificationDeleteAll}
            onChangeFilterQuery={onNotificationChangeFilterQuery}
            hideCloseButton
          >
            <Button variant={ButtonVariant.Header} title={t('common.notifications')}>
              <Icon type={IconType.Bell} size={IconSize.Size18} />
              {notificationCount > 0 && <span className={s.notification}>{notificationCount}</span>}
            </Button>
          </NotificationsPopup>
          <UserPopup canEditProject={canEditProject} projectId={project?.id} isAdmin={isAdmin} isLogouting={isLogouting} onLogout={onLogout}>
            <Button variant={ButtonVariant.Header} title={t('common.profileAndSettings')}>
              <User name={user.name} avatarUrl={user.avatarUrl} size="card" skipTitle />
            </Button>
          </UserPopup>
        </div>
      </div>
    );
  },
);

Header.propTypes = {
  path: PropTypes.string,
  project: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  user: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  notifications: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  filteredNotifications: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  notificationFilter: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  notificationCount: PropTypes.number.isRequired,
  instanceNotificationCount: PropTypes.number.isRequired,
  usersNotificationCount: PropTypes.number.isRequired,
  isLogouting: PropTypes.bool.isRequired,
  canEditProject: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  demoMode: PropTypes.bool.isRequired,
  theme: PropTypes.string,
  onNotificationUpdate: PropTypes.func.isRequired,
  onNotificationMarkAllAs: PropTypes.func.isRequired,
  onNotificationDelete: PropTypes.func.isRequired,
  onNotificationDeleteAll: PropTypes.func.isRequired,
  onNotificationChangeFilterQuery: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  onUserPrefsUpdate: PropTypes.func.isRequired,
};

Header.defaultProps = {
  path: undefined,
  project: undefined,
  theme: 'default',
};

export default Header;
