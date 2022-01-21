import React from 'react';

interface Props {
    data?: Array<any>;
    renderMethod?: (item: any, i: number) => JSX.Element;
    style?: React.CSSProperties | undefined;
    className?: string | undefined;
}

export const List: React.FC<Props> = ({ data, renderMethod, style, className }) => {
    return (
        <div style={style} className={className}>
            {
                data?.map((item, i) => renderMethod?.(item, i))
            }
        </div>
    );
};
