import { ReactComponent as DeleteIcon } from 'assets/delete.svg';
import { ReactComponent as NoteIcon } from 'assets/note.svg';
import { ReactComponent as SettingsIcon } from 'assets/settings.svg';
import { showModal, switchScreen } from 'store/actions/view';

type Config = {
    [route: string]: {
        title: string;
        icon: React.SVGProps<SVGSVGElement>;
        action: (r: string) => void;
    };
};

export const RoutesConfig: Config = {
    all: {
        title: 'All Notes',
        icon: <NoteIcon />,
        action: switchScreen,
    },
    trash: {
        title: 'Trash',
        icon: <DeleteIcon />,
        action: switchScreen,
    },
    settings: {
        title: 'Settings',
        icon: <SettingsIcon />,
        action: () => showModal('SETTINGS'),
    },
};

export const titleByRoute = (route: string): string => RoutesConfig[route].title;

export const menuConfig = Object.keys(RoutesConfig).map((route) => ({
    title: RoutesConfig[route].title,
    icon: RoutesConfig[route].icon,
    route,
    action: RoutesConfig[route].action,
}));
