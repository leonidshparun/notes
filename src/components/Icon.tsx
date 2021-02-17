import { images } from 'services/icons';

interface IconProps {
    name: string;
    width: number;
    svg?: boolean;
}

const Icon = ({ name, width, svg }: IconProps) => {
    const key: string = `${name}.${svg ? 'svg' : 'png'}`;
    const link = images[key as keyof typeof images];
    return (
        <img
            style={{ display: 'inline' }}
            width={width}
            src={link['default']}
            alt={name}
        />
    );
};

export default Icon;
