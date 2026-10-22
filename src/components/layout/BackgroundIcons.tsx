import bgIcons from '../../assets/bgIcons.svg';
import clsx from 'clsx'

export type IconsPos = 'top' | 'bottom';

const variants: Record<IconsPos, string> = {
    top: "top-20",
    bottom: "top-170"
}

interface BackgroundIconsProps {
    iconsPos: IconsPos
}

export default function BackgroundIcons({
    iconsPos
}: BackgroundIconsProps) {
    return (
        <img
            src={bgIcons}
            alt=""
            aria-hidden="true"
            className={clsx("fixed pointer-events-none absolute w-full inset-0 z-0 select-none object-cover", variants[iconsPos])}
        />
    );
}